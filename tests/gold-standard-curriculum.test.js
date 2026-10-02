const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const { loadCaseData, validateCaseData, caseFingerprint } = require("../scripts/case");
const { loadLedger, validateLedger, validateGoal25Row, sha256File } = require("../scripts/acquisition");
const { buildPairedMetrics, patternRichPairIds, equivocalPairIds } = require("../scripts/paired-modality");
const { loadPatternData, validatePatternLibrary, buildAudit, specialSite } = require("../scripts/pattern");
const { buildPublicStatus } = require("../scripts/review-governance");

const root = path.join(__dirname, "..");
const goal25 = ["case-g25-01", "case-g25-02", "case-g25-03", "case-g25-04", "case-g25-05", "case-g25-06"];
const clone = value => JSON.parse(JSON.stringify(value));

function goal25Rows(ledger = loadLedger()) {
  return ledger.candidates.filter(row => row.goal === 25);
}

function casesMap(data) {
  return new Map(data.cases.map(item => [item.id, item]));
}

test("Goal 25 pairs keep the source pair wording and never pair by diagnosis alone", () => {
  const data = loadCaseData();
  const rows = new Map(data.pairProvenance.map(row => [row.caseId, row]));
  const ledger = goal25Rows();
  for (const row of ledger.filter(item => item.status === "accepted")) {
    const pair = rows.get(row.caseId);
    assert.equal(pair.provenance, row.pairedStatus, row.id);
    assert.notEqual(pair.provenance, "not_paired");
    assert.match(pair.basis, /caption|titled/i);
  }
  assert.equal(rows.get("case-g25-05").provenance, "source_documented_pair");
  assert.equal(rows.get("case-g25-06").provenance, "source_documented_pair");
  const wrong = clone(data);
  wrong.pairProvenance.find(row => row.caseId === "case-g25-01").provenance = "not_paired";
  assert.throws(() => validateCaseData(wrong), /silent pair/);
});

test("histopathology on the ledger and on the case agree and cannot be upgraded", () => {
  const data = loadCaseData();
  const cases = casesMap(data);
  for (const row of goal25Rows().filter(item => item.status === "accepted")) {
    const truth = cases.get(row.caseId).diagnosticGroundTruth;
    assert.equal(truth.confirmationMethod, "histopathology", row.id);
    assert.equal(truth.histopathologySource, row.histopathology === "present_figure_caption" ? "figure_caption" : "article_methods");
    assert.match(truth.confirmationNotes, /histopatholog|histolog/i);
  }
  const accepted = goal25Rows().find(row => row.caseId === "case-g25-01");
  const downgraded = new Map(cases);
  const item = clone(cases.get("case-g25-01"));
  item.diagnosticGroundTruth.confirmationMethod = "clinical_diagnosis";
  downgraded.set("case-g25-01", item);
  assert.throws(() => validateGoal25Row(accepted, downgraded), /does not match the case confirmation/);
  const upgraded = { ...clone(accepted), histopathology: "absent" };
  assert.throws(() => validateGoal25Row(upgraded, cases), /cannot be upgraded/);
  const bad = clone(data);
  bad.cases.find(entry => entry.id === "case-g24-01").diagnosticGroundTruth.histopathologySource = "figure_caption";
  assert.throws(() => validateCaseData(bad), /only for a histopathology confirmation/);
  for (const id of ["case-g24-01", "case-g24-02"]) {
    assert.equal(cases.get(id).diagnosticGroundTruth.confirmationMethod, "clinical_diagnosis");
  }
});

test("composite extraction needs an adaptable license and no third-party exclusion", () => {
  const cases = casesMap(loadCaseData());
  const row = goal25Rows().find(item => item.caseId === "case-g25-03");
  assert.doesNotThrow(() => validateGoal25Row(row, cases));
  assert.throws(() => validateGoal25Row({ ...clone(row), license: "CC BY-NC 4.0" }, cases), /adaptation/);
  assert.throws(() => validateGoal25Row({ ...clone(row), license: "CC BY-ND 4.0" }, cases), /adaptation/);
  assert.throws(() => validateGoal25Row({ ...clone(row), thirdPartyExclusion: true }, cases), /third-party/);
  const license = goal25Rows().filter(item => item.status === "rejected_license");
  assert.ok(license.length >= 3);
  assert.ok(license.every(item => /BY-NC|noncommercial/i.test(item.license)));
});

test("every crop is reproducible from the recorded box and hashes", () => {
  const data = loadCaseData();
  const cases = casesMap(data);
  for (const row of goal25Rows().filter(item => item.status === "accepted")) {
    const item = cases.get(row.caseId);
    assert.equal(row.extraction.length, item.images.length, row.id);
    for (const step of row.extraction) {
      assert.equal(sha256File(step.asset), step.assetSha256, step.asset);
      const image = item.images.find(entry => entry.src === step.asset);
      assert.equal(image.modificationStatus, "cropped");
      assert.equal(image.dimensions.width, step.box[2] - step.box[0]);
      assert.equal(image.dimensions.height, step.box[3] - step.box[1]);
      assert.ok(image.modificationsNotes.includes(step.sourceSha256));
      assert.match(image.attribution, /CC BY 4\.0/);
      assert.match(image.sourceUrl, /^https:\/\/doi\.org\/10\./);
    }
  }
  const row = goal25Rows().find(item => item.caseId === "case-g25-01");
  const moved = clone(row); moved.extraction[0].box[2] += 1;
  assert.throws(() => validateGoal25Row(moved, cases), /reproduce|dimensions/);
  const swapped = clone(row); swapped.extraction[0].assetSha256 = "0".repeat(64);
  assert.throws(() => validateGoal25Row(swapped, cases), /sha256/);
  const missing = clone(row); missing.extraction.pop();
  assert.throws(() => validateGoal25Row(missing, cases), /no extraction record/);
});

test("pattern-rich needs a visible dermoscopic diagnostic structure and equivocal pairs never count", () => {
  const data = loadCaseData();
  const patterns = loadPatternData();
  const rich = patternRichPairIds(data, patterns);
  assert.equal(JSON.stringify(rich.filter(id => !/^case-g2[67]-/.test(id))), JSON.stringify(["case-g21-08", ...goal25]));
  assert.equal(JSON.stringify(equivocalPairIds(data)), JSON.stringify(["case-g24-01", "case-g24-02"]));
  for (const id of equivocalPairIds(data)) assert.equal(rich.includes(id), false);
  const weakened = clone(data);
  for (const pattern of weakened.cases.find(item => item.id === "case-g25-04").patterns) pattern.certainty = "uncertain";
  assert.equal(patternRichPairIds(weakened, patterns).includes("case-g25-04"), false);
  const equivocal = clone(data);
  equivocal.pairProvenance.find(row => row.caseId === "case-g25-01").informationGain = "dermoscopy_remains_equivocal";
  assert.equal(patternRichPairIds(equivocal, patterns).includes("case-g25-01"), false);
  const artifactOnly = clone(data);
  const target = artifactOnly.cases.find(item => item.id === "case-g25-02");
  target.patterns = target.patterns.filter(pattern => pattern.id !== "pat-g25-02-network");
  assert.equal(patternRichPairIds(artifactOnly, patterns).includes("case-g25-02"), false);
});

test("captions do not create observations or structures, and dermoscopic structures need dermoscopic evidence", () => {
  const data = loadCaseData();
  const patterns = loadPatternData();
  const canonical = new Map(patterns.patterns.map(item => [item.id, item]));
  const links = new Map(patterns.links.map(item => [item.casePatternId, item.canonicalId]));
  for (const item of data.cases.filter(entry => goal25.includes(entry.id))) {
    const captions = item.images.map(image => image.caption);
    for (const observation of item.observations) {
      assert.equal(captions.some(caption => observation.text.includes(caption) || caption.includes(observation.text)), false, item.id);
    }
    for (const pattern of item.patterns) {
      const target = canonical.get(links.get(pattern.id));
      if (target && target.category === "dermoscopic-structure" && ["clearly_visible", "probably"].includes(pattern.certainty)) {
        assert.equal(pattern.modality, "dermoscopy", pattern.id);
        assert.ok(item.images.some(image => image.type === "dermoscopy"), item.id);
      }
    }
  }
  const unlinked = new Set(patterns.unlinkedObservations.map(item => item.casePatternId));
  assert.ok(unlinked.has("pat-g25-03-crust"));
  assert.equal(patterns.patterns.some(item => /ulcerat|rhomboid/i.test(item.id)), false);
  const forged = clone(data);
  const item = forged.cases.find(entry => entry.id === "case-g25-04");
  item.images = item.images.filter(image => image.type === "clinical");
  assert.throws(() => validatePatternLibrary(patterns, forged), /clinical-only case cannot claim/);
});

test("canonical patterns are reused before new ones are added, and artifacts stay out of coverage", () => {
  const patterns = loadPatternData();
  const ids = patterns.patterns.map(item => item.id);
  assert.ok(ids.length >= 40);
  assert.equal(new Set(patterns.patterns.map(item => item.displayName.toLowerCase())).size, ids.length);
  const linkFor = id => patterns.links.find(item => item.casePatternId === id).canonicalId;
  assert.equal(linkFor("pat-g25-03-vessels"), "polymorphous-vessels");
  assert.equal(linkFor("pat-g25-03-papule"), "pink-nodule-without-pigment");
  assert.equal(linkFor("pat-g25-01-network"), linkFor("pat-g25-02-network"));
  assert.equal(linkFor("pat-g25-05-pseudo"), linkFor("pat-g25-06-pseudo"));
  const metrics = buildPairedMetrics();
  for (const id of ["color-variegation", "polymorphous-vessels", "atypical-pigment-network", "facial-pseudonetwork"]) assert.ok(metrics.diagnosticStructuresWithMoreThanOnePositiveExample.includes(id), id);
  for (const id of metrics.artifactIdsExcluded) {
    assert.equal(metrics.diagnosticStructuresWithMoreThanOnePositiveExample.includes(id), false);
    assert.equal(metrics.structuresInBenignAndMalignantContexts.includes(id), false);
  }
  const audit = buildAudit();
  const scale = audit.patterns.find(item => item.id === "measuring-scale-in-frame");
  assert.ok(scale.occurrences.some(row => row.caseId === "case-g25-01"));
  assert.equal(scale.countsTowardDermoscopyCoverage, false);
  const gray = audit.patterns.find(item => item.id === "perifollicular-gray-dots");
  assert.equal(JSON.stringify(gray.occurrences.map(row => [row.caseId, row.certainty])), JSON.stringify([["case-g25-05", "probably"], ["case-g25-06", "not_visible"]]));
});

test("scalp is not counted as face, and special-site pairs are named honestly", () => {
  assert.equal(specialSite("Scalp vertex"), "scalp");
  assert.equal(specialSite("Face, periorbital region"), "face");
  assert.equal(specialSite("Left heel, plantar sole"), "acral");
  const metrics = buildPairedMetrics();
  assert.equal(JSON.stringify(metrics.specialSiteTruePairs.filter(id => !/^case-g2[67]-/.test(id))), JSON.stringify(["case-g24-01", "case-g25-04", "case-g25-05", "case-g25-06"]));
  assert.equal(metrics.specialSiteTruePairs.includes("case-g25-03"), false);
});

test("rejected candidates stay out of the curriculum and accepted assets carry full metadata", () => {
  const data = loadCaseData();
  assert.doesNotThrow(() => validateLedger(loadLedger(), data));
  const curriculum = new Set(data.curriculum.entries.map(entry => entry.caseId));
  for (const row of goal25Rows()) {
    if (row.status === "accepted") continue;
    assert.equal(row.integrated, false);
    assert.equal(row.caseId, null);
    assert.equal(row.extraction.length, 0);
    assert.equal(row.localizationReadiness, null);
    assert.equal(curriculum.has(row.id), false);
  }
  const cases = casesMap(data);
  for (const row of goal25Rows().filter(item => item.status === "accepted")) {
    assert.ok(["localization_ready", "localization_uncertain", "localization_not_ready"].includes(row.localizationReadiness));
    for (const image of cases.get(row.caseId).images) {
      for (const field of ["source", "sourceUrl", "creator", "license", "licenseUrl", "attribution", "consentBasis", "modificationsNotes"]) {
        assert.ok(typeof image[field] === "string" && image[field].trim().length > 8, `${row.caseId} ${field}`);
      }
      assert.equal(image.licenseUrl, "https://creativecommons.org/licenses/by/4.0/");
      assert.equal(image.patientIdentifiable, false);
      assert.doesNotMatch(image.src, /melanoma|nevus|lentigo|maligna/i);
      assert.doesNotMatch(image.alt, /melanoma|nevus|lentigo|maligna/i);
    }
    for (const point of cases.get(row.caseId).annotations) assert.fail(`${row.caseId} has annotation ${point}`);
    assert.equal(cases.get(row.caseId).localization, null);
  }
});

test("new content stays review required and earlier reviewed units are unchanged", () => {
  const data = loadCaseData();
  const status = buildPublicStatus();
  const published = JSON.parse(fs.readFileSync(path.join(root, "review-status.json"), "utf8"));
  assert.equal(status.assets.filter(item => item.status === "clinician reviewed").length, 5);
  assert.equal(status.assets.filter(item => item.status === "review required").length, status.assets.length - 5);
  for (const id of goal25) {
    const item = data.cases.find(entry => entry.id === id);
    assert.equal(item.reviewStatus, "clinician review required");
    assert.equal(item.clinicalReview, null);
    assert.equal(item.recordedScreeningDecision, null);
    assert.equal(status.assets.find(asset => asset.assetType === "case" && asset.id === id).status, "review required");
  }
  for (const item of data.cases.filter(entry => !goal25.includes(entry.id) && !/^case-g2[67]-/.test(entry.id))) {
    const asset = published.assets.find(row => row.assetType === "case" && row.id === item.id);
    assert.equal(caseFingerprint(item), asset.currentFingerprint, item.id);
  }
  const patterns = loadPatternData();
  assert.equal(patterns.reviewStatus, "clinician review required");
  assert.ok(patterns.patterns.every(item => item.clinicalReview === null));
});

test("README and ROADMAP report the released counts and keep review deferred", () => {
  const data = loadCaseData();
  const metrics = buildPairedMetrics(data);
  const status = buildPublicStatus();
  const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
  const roadmap = fs.readFileSync(path.join(root, "ROADMAP.md"), "utf8");
  for (const text of [readme, roadmap]) {
    assert.match(text, new RegExp(`${data.cases.length} cases`));
    assert.match(text, new RegExp(`${metrics.paired.length} true clinical.dermoscopic pairs`));
    assert.match(text, new RegExp(`${status.assets.length} review units`));
    assert.match(text, /publication is not clinical approval/i);
    assert.match(text, /clinical review (?:remains |is )?deferred/i);
  }
  assert.match(readme, new RegExp(`${metrics.pairedMelanomaWithHistopathology.length} histopathology-confirmed true paired melanoma`));
});
