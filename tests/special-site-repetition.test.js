const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const { createHash } = require("node:crypto");
const { loadCaseData, caseFingerprint } = require("../scripts/case");
const { loadLedger, validateLedger, validateGoal25Row } = require("../scripts/acquisition");
const { buildPairedMetrics, buildStructureRepetition } = require("../scripts/paired-modality");
const { loadPatternData, validatePatternLibrary, buildAudit, specialSite } = require("../scripts/pattern");
const { buildPublicStatus } = require("../scripts/review-governance");

const root = path.join(__dirname, "..");
const goal27 = ["case-g27-01", "case-g27-02", "case-g27-03", "case-g27-04", "case-g27-05", "case-g27-06"];
const clone = value => JSON.parse(JSON.stringify(value));
const positive = certainty => certainty === "clearly_visible" || certainty === "probably";
const caseById = (data, id) => data.cases.find(item => item.id === id);
const linkMap = (patterns = loadPatternData()) => new Map(patterns.links.map(item => [item.casePatternId, item.canonicalId]));
const rows27 = () => loadLedger().candidates.filter(row => row.goal === 27);
const repetition = (id, data, patterns) => buildStructureRepetition(data, buildAudit(patterns, data)).find(row => row.id === id);

test("parallel furrow needs image-supported dermoscopic evidence and stays probable without resolved pores", () => {
  const data = loadCaseData();
  const map = linkMap();
  const furrow = loadPatternData().patterns.find(item => item.id === "parallel-furrow-pattern");
  assert.equal(furrow.educationalRole, "diagnostic_structure");
  assert.equal(furrow.category, "dermoscopic-structure");
  let positives = 0;
  for (const item of data.cases) {
    for (const pattern of item.patterns || []) {
      if (map.get(pattern.id) !== "parallel-furrow-pattern" || !positive(pattern.certainty)) continue;
      positives += 1;
      assert.equal(pattern.modality, "dermoscopy", pattern.id);
      assert.equal(specialSite(item.patientContext.anatomicalSite), "acral", item.id);
      assert.ok(item.images.some(image => image.type === "dermoscopy"), item.id);
      if (pattern.certainty === "clearly_visible") {
        assert.match(pattern.specificityNote, /pore/i, pattern.id);
        assert.doesNotMatch(pattern.specificityNote, /not resolved/i, pattern.id);
      } else {
        assert.match(pattern.specificityNote, /not resolved/i, pattern.id);
      }
      assert.doesNotMatch(pattern.specificityNote, new RegExp(item.diagnosisLabel, "i"));
    }
  }
  assert.equal(positives, 3);
  const forged = clone(data);
  const cluster = caseById(forged, "case-g27-01");
  cluster.images = cluster.images.filter(image => image.type === "clinical");
  assert.throws(() => validatePatternLibrary(loadPatternData(), forged), /clinical-only case cannot claim/);
});

test("parallel ridge repetition counts independent cases from different sources", () => {
  const data = loadCaseData();
  const ridge = repetition("parallel-ridge-pattern", data, loadPatternData());
  assert.deepEqual(ridge.independentPositiveCases, ["case-g25-04", "case-g27-03"]);
  assert.equal(ridge.positiveObservations, 2);
  assert.deepEqual(ridge.malignantCases, ridge.independentPositiveCases);
  assert.deepEqual(ridge.histopathologyCases, ridge.independentPositiveCases);
  const sources = ridge.independentPositiveCases.map(id => caseById(data, id).images[0].sourceUrl);
  assert.notEqual(sources[0], sources[1]);
  const metrics = buildPairedMetrics(data);
  assert.ok(metrics.diagnosticStructuresWithMoreThanOneIndependentPositiveCase.includes("parallel-ridge-pattern"));
  assert.ok(metrics.diagnosticStructuresWithMoreThanOneIndependentPositiveCase.includes("parallel-furrow-pattern"));
});

test("a second panel or pattern from one lesion is an observation, not an independent case", () => {
  const data = clone(loadCaseData());
  const patterns = clone(loadPatternData());
  const before = repetition("parallel-ridge-pattern", data, patterns);
  const heel = caseById(data, "case-g27-03");
  heel.patterns.push({ ...heel.patterns.find(item => item.id === "pat-g27-03-ridge"), id: "pat-g27-03-ridge-second-panel" });
  patterns.links = [...patterns.links, { casePatternId: "pat-g27-03-ridge-second-panel", canonicalId: "parallel-ridge-pattern" }];
  const after = repetition("parallel-ridge-pattern", data, patterns);
  assert.equal(after.positiveObservations, before.positiveObservations + 1);
  assert.deepEqual(after.independentPositiveCases, before.independentPositiveCases);
});

test("nail lines stay modality-specific and the haemorrhage does not claim a melanin band", () => {
  const data = loadCaseData();
  const map = linkMap();
  for (const item of data.cases) {
    for (const pattern of item.patterns || []) {
      if (map.get(pattern.id) !== "longitudinal-nail-plate-lines" || !positive(pattern.certainty)) continue;
      assert.equal(pattern.modality, "dermoscopy", pattern.id);
      assert.equal(specialSite(item.patientContext.anatomicalSite), "nail", item.id);
    }
  }
  assert.equal(caseById(data, "case-g27-05").patterns.find(item => item.id === "pat-g27-05-lines").certainty, "clearly_visible");
  assert.equal(caseById(data, "case-g27-06").patterns.find(item => item.id === "pat-g27-06-lines").certainty, "not_visible");
  const lines = repetition("longitudinal-nail-plate-lines", data, loadPatternData());
  assert.equal(lines.independentPositiveCases.length, 4);
  assert.ok(lines.benignCases.includes("case-g27-05") && lines.malignantCases.includes("case-g26-07"));
});

test("paediatric and adult nail context stays explicit and is not merged", () => {
  const data = loadCaseData();
  const adult = caseById(data, "case-g27-05");
  assert.match(adult.patientContext.ageBand, /^28 years/);
  for (const id of ["case-g26-05", "case-g26-06"]) assert.match(caseById(data, id).patientContext.ageBand, /^(3|13) years/, id);
  assert.match(adult.takeHomeRule + adult.teachingPoints.map(item => item.text).join(" "), /age/i);
  assert.ok(data.curriculum.skills.some(skill => skill.id === "nail-band-age-context"));
  const context = data.comparisons.find(item => item.id === "cmp-g27-nail-age-context");
  assert.deepEqual([context.caseIdA, context.caseIdB], ["case-g27-05", "case-g26-06"]);
  assert.equal(context.discriminator, null);
  assert.match(context.limits, /Age is a context weight/);
  assert.doesNotMatch(JSON.stringify(adult), /\d+(?:\.\d+)?\s*%|probability of/i);
});

test("biopsy timing is recorded and never upgraded to same-day verification", () => {
  const data = loadCaseData();
  const cluster = caseById(data, "case-g27-01").diagnosticGroundTruth;
  assert.equal(cluster.histopathologySource, "case_text");
  assert.match(cluster.confirmationNotes, /seven years after these photographs/);
  assert.match(cluster.confirmationNotes, /one spot/);
  assert.match(cluster.confidenceNote, /after these frames/);
  assert.match(caseById(data, "case-g26-06").diagnosticGroundTruth.confirmationNotes, /predates these frames/);
  const row = rows27().find(item => item.caseId === "case-g27-01");
  assert.equal(row.verificationStrength, "histopathology_in_case_text_after_photograph");
  for (const id of ["case-g27-03", "case-g27-05"]) assert.match(caseById(data, id).diagnosticGroundTruth.confirmationNotes, /does not give a biopsy date/, id);
});

test("a single haemorrhage frame cannot claim migration or growth-out", () => {
  const data = loadCaseData();
  const blood = caseById(data, "case-g27-06");
  const unlinked = new Set(loadPatternData().unlinkedObservations.map(item => item.casePatternId));
  for (const pattern of blood.patterns.filter(item => positive(item.certainty))) {
    assert.doesNotMatch(`${pattern.label} ${pattern.specificityNote}`, /migrat|moved|grew out|has grown/i, pattern.id);
  }
  assert.ok(unlinked.has("pat-g27-06-streak"));
  assert.match(blood.patterns.find(item => item.id === "pat-g27-06-streak").specificityNote, /cannot be read from one frame/);
  assert.match(blood.pairedModality.limits, /One frame cannot show movement/);
  assert.equal(blood.diagnosticGroundTruth.confirmationMethod, "clinical_diagnosis");
  assert.match(blood.diagnosticGroundTruth.confirmationNotes, /no follow-up, clipping, or histopathology/);
  const metrics = buildPairedMetrics(data);
  assert.ok(metrics.diagnosticStructuresWithMoreThanOneIndependentPositiveCase.includes("hemorrhagic-structureless-area"));
});

test("Hutchinson or periungual pigment is never created from a caption", () => {
  const data = loadCaseData();
  const patterns = loadPatternData();
  const map = linkMap(patterns);
  assert.equal(patterns.patterns.some(item => /hutchinson|periungual/i.test(item.id)), false);
  for (const id of goal27) {
    for (const pattern of caseById(data, id).patterns) {
      if (/hutchinson|periungual|fold skin/i.test(`${pattern.label} ${pattern.specificityNote}`)) {
        assert.equal(positive(pattern.certainty), false, pattern.id);
        assert.equal(map.has(pattern.id), false, pattern.id);
      }
    }
  }
  assert.equal(caseById(data, "case-g27-05").patterns.find(item => item.id === "pat-g27-05-fold").certainty, "not_visible");
});

test("Goal 27 true pairs are explicit, one clinical and one dermoscopic asset, and match the ledger", () => {
  const data = loadCaseData();
  const pairs = new Map(data.pairProvenance.map(row => [row.caseId, row]));
  for (const id of goal27) {
    const item = caseById(data, id);
    assert.ok(["same_lesion_confirmed", "source_documented_pair"].includes(pairs.get(id).provenance), id);
    assert.equal(item.images.filter(image => image.type === "clinical").length, 1, id);
    assert.equal(item.images.filter(image => image.type === "dermoscopy").length, 1, id);
    assert.ok(buildPairedMetrics(data).specialSiteTruePairs.includes(id), id);
  }
  for (const row of rows27().filter(item => item.status === "accepted")) assert.equal(pairs.get(row.caseId).provenance, row.pairedStatus, row.id);
  assert.equal(pairs.get("case-g27-01").provenance, "source_documented_pair");
  assert.equal(pairs.get("case-g27-06").provenance, "source_documented_pair");
});

test("histopathology source stays faithful and weak verification is not upgraded", () => {
  const data = loadCaseData();
  const expected = { "case-g27-01": "case_text", "case-g27-03": "figure_caption", "case-g27-04": "case_text", "case-g27-05": "figure_caption" };
  for (const [id, source] of Object.entries(expected)) {
    const truth = caseById(data, id).diagnosticGroundTruth;
    assert.equal(truth.confirmationMethod, "histopathology", id);
    assert.equal(truth.histopathologySource, source, id);
  }
  for (const id of ["case-g27-02", "case-g27-06"]) {
    const truth = caseById(data, id).diagnosticGroundTruth;
    assert.equal(truth.confirmationMethod, "clinical_diagnosis", id);
    assert.equal(truth.histopathologySource, undefined, id);
  }
  assert.match(caseById(data, "case-g27-02").diagnosticGroundTruth.confirmationNotes, /not independent of the pattern/);
  const cases = new Map(data.cases.map(item => [item.id, item]));
  for (const caseId of ["case-g27-02", "case-g27-06"]) {
    const row = rows27().find(item => item.caseId === caseId);
    assert.throws(() => validateGoal25Row({ ...clone(row), histopathology: "present_figure_caption", verificationMethod: "histopathology" }, cases), /does not match/, caseId);
  }
});

test("license and crop transformation provenance are reproducible", () => {
  const data = loadCaseData();
  assert.doesNotThrow(() => validateLedger(loadLedger(), data));
  const cases = new Map(data.cases.map(item => [item.id, item]));
  const accepted = rows27().filter(item => item.status === "accepted");
  assert.equal(accepted.length, 6);
  for (const row of accepted) {
    assert.equal(row.license, "CC BY 4.0");
    assert.equal(row.thirdPartyExclusion, false);
    assert.equal(row.extraction.length, 2);
    for (const item of row.extraction) {
      const digest = createHash("sha256").update(fs.readFileSync(path.join(root, item.asset))).digest("hex");
      assert.equal(digest, item.assetSha256, item.asset);
    }
  }
  const cluster = accepted.find(item => item.caseId === "case-g27-01");
  assert.ok(cluster.extraction.every(item => /decoded RGB pixel buffer/.test(item.method)));
  assert.match(caseById(data, "case-g27-01").images[0].modificationsNotes, /decoded RGB pixel buffer/);
  assert.throws(() => validateGoal25Row({ ...clone(cluster), license: "CC BY-NC 4.0" }, cases), /adaptation/);
  assert.throws(() => validateGoal25Row({ ...clone(cluster), thirdPartyExclusion: true }, cases), /third-party/);
  const blocked = rows27().filter(item => item.status === "rejected_license");
  assert.ok(blocked.some(item => /3\.0|2\.0|NC|version not stated/.test(item.license)));
  const caseBlob = JSON.stringify(data.cases);
  for (const item of blocked) assert.equal(caseBlob.includes(item.sourceUrl), false, item.id);
});

test("printed marks and figure lines stay out of diagnostic metrics", () => {
  const data = loadCaseData();
  const metrics = buildPairedMetrics(data);
  const audit = buildAudit();
  for (const id of ["printed-pointer", "measuring-scale-in-frame"]) {
    assert.ok(audit.patterns.find(item => item.id === id).occurrences.some(row => row.caseId.startsWith("case-g27-")), id);
    assert.equal(metrics.diagnosticStructuresWithMoreThanOneIndependentPositiveCase.includes(id), false, id);
    assert.equal(metrics.structureRepetition.some(row => row.id === id), false, id);
  }
  const unlinked = new Set(loadPatternData().unlinkedObservations.map(item => item.casePatternId));
  assert.ok(unlinked.has("pat-g27-03-line"));
  assert.equal(caseById(data, "case-g27-03").patterns.find(item => item.id === "pat-g27-03-line").modality, "none");
});

test("Goal 27 content stays review required and earlier reviewed units are unchanged", () => {
  const data = loadCaseData();
  const status = buildPublicStatus();
  const published = JSON.parse(fs.readFileSync(path.join(root, "review-status.json"), "utf8"));
  assert.equal(JSON.stringify(published), JSON.stringify(status));
  assert.equal(status.decisions.length, 5);
  assert.equal(status.assets.filter(item => item.status === "clinician reviewed").length, 5);
  for (const id of goal27) {
    const item = caseById(data, id);
    assert.equal(item.reviewStatus, "clinician review required");
    assert.equal(item.clinicalReview, null);
    assert.equal(item.recordedScreeningDecision, null);
    assert.equal(item.localization, null);
    assert.equal(status.assets.find(asset => asset.assetType === "case" && asset.id === id).status, "review required");
  }
  const reviewed = {
    "disease:actinic-keratosis": "sha256-v1:92302d680f4c645cc1a91c9a827a3e44b0d965fa21fa019144458bd81c27a1dd",
    "disease:basal-cell-carcinoma": "sha256-v1:fbc2b272331822060c656dd0680da07e9131ecd3f59f071a71273748f14ad65f",
    "quiz:bcc-dermoscopy": "sha256-v1:f4b9487215a415cfbbc159b5b1de4a64e77b27d816559b119a32e111276db338",
    "visual:bcc-clues-schematic": "sha256-v1:0d45d6d602b890b47548da1e708be5d3f365540b0a2b49240763504bfd6e0471",
    "follow_up:basal-cell-carcinoma-de": "sha256-v1:25cbf04b711b308ca456ab8b67a29bd056d3ccb69c0f404e285adaf8ab92c02e"
  };
  for (const [key, fingerprint] of Object.entries(reviewed)) {
    const [assetType, id] = key.split(":");
    const asset = status.assets.find(item => item.assetType === assetType && item.id === id);
    assert.equal(asset.currentFingerprint, fingerprint, key);
    assert.equal(asset.status, "clinician reviewed", key);
  }
  for (const item of data.cases.filter(entry => !goal27.includes(entry.id))) {
    assert.equal(caseFingerprint(item), published.assets.find(row => row.assetType === "case" && row.id === item.id).currentFingerprint, item.id);
  }
  const furrow = loadPatternData().patterns.find(item => item.id === "parallel-furrow-pattern");
  assert.equal(furrow.reviewStatus, "clinician review required");
  assert.equal(furrow.clinicalReview, null);
});

test("documentation counts match the development branch", () => {
  const data = loadCaseData();
  const metrics = buildPairedMetrics(data);
  const status = buildPublicStatus();
  const read = name => fs.readFileSync(path.join(root, name), "utf8");
  const readme = read("README.md");
  const roadmap = read("ROADMAP.md");
  const review = read("CLINICAL_REVIEW.md");
  const required = status.assets.filter(item => item.status === "review required").length;
  for (const text of [readme, roadmap]) {
    assert.match(text, new RegExp(`${data.cases.length} cases`));
    assert.match(text, new RegExp(`${metrics.paired.length} true clinical-dermoscopic pairs`));
    assert.match(text, new RegExp(`${status.assets.length} review units`));
    assert.match(text, new RegExp(`${required} (?:are )?review required`));
    assert.match(text, /Goal 18 to 27/);
    assert.match(text, /not (?:yet )?merged to `?main`?/i);
  }
  assert.match(readme, new RegExp(`${metrics.patternRichPairs.length} pattern-rich`));
  assert.match(readme, new RegExp(`${loadPatternData().patterns.length} reusable pattern objects`));
  assert.match(readme, new RegExp(`${rows27().length} Goal 27 candidates`));
  assert.match(readme, /6 Goal 27 cases/);
  assert.match(review, new RegExp(`${status.assets.length} independent review units`));
  assert.match(review, /6 Goal 27 cases/);
  assert.match(read("CHANGELOG.md"), /### Goal 27/);
  for (const text of [readme, roadmap, read("CHANGELOG.md"), read("PAIRED_MODALITY.md")]) assert.doesNotMatch(text, /\bmastery achieved|\bcertified\b/i);
});
