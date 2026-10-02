const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const { loadCaseData, caseFingerprint } = require("../scripts/case");
const { loadLedger, validateLedger, validateGoal25Row } = require("../scripts/acquisition");
const { buildPairedMetrics } = require("../scripts/paired-modality");
const { loadPatternData, validatePatternLibrary, buildAudit, specialSite } = require("../scripts/pattern");
const { buildPublicStatus } = require("../scripts/review-governance");

const root = path.join(__dirname, "..");
const goal26 = ["case-g26-01", "case-g26-02", "case-g26-03", "case-g26-04", "case-g26-05", "case-g26-06", "case-g26-07"];
const acralStructures = ["parallel-ridge-pattern", "fibrillar-pattern", "irregular-acral-pigmentation"];
const nailStructures = ["longitudinal-nail-plate-lines", "nail-plate-destruction"];
const clone = value => JSON.parse(JSON.stringify(value));
const positive = certainty => certainty === "clearly_visible" || certainty === "probably";

function links() {
  return new Map(loadPatternData().links.map(item => [item.casePatternId, item.canonicalId]));
}

function rows26() {
  return loadLedger().candidates.filter(row => row.goal === 26);
}

test("acral and nail structures need a dermoscopic frame and a dermoscopic case pattern", () => {
  const data = loadCaseData();
  const map = links();
  for (const item of data.cases) {
    for (const pattern of item.patterns || []) {
      const canonical = map.get(pattern.id);
      if (![...acralStructures, ...nailStructures].includes(canonical) || !positive(pattern.certainty)) continue;
      if (canonical === "nail-plate-destruction" && item.id === "case-g18-12") continue;
      assert.equal(pattern.modality, "dermoscopy", pattern.id);
      assert.ok(item.images.some(image => image.type === "dermoscopy"), item.id);
    }
  }
  const forged = clone(data);
  const nevus = forged.cases.find(item => item.id === "case-g26-02");
  nevus.images = nevus.images.filter(image => image.type === "clinical");
  assert.throws(() => validatePatternLibrary(loadPatternData(), forged), /clinical-only case cannot claim/);
});

test("ridge, furrow, and fibrillar claims are not inferred from the diagnosis", () => {
  const data = loadCaseData();
  const map = links();
  const audit = buildAudit();
  const ridge = audit.patterns.find(item => item.id === "parallel-ridge-pattern");
  const positives = ridge.occurrences.filter(row => positive(row.certainty)).map(row => row.caseId);
  assert.equal(positives.some(id => id.startsWith("case-g26-")), false);
  assert.equal(JSON.stringify(positives), JSON.stringify(["case-g25-04", "case-g27-03"]));
  const melanoma = data.cases.find(item => item.id === "case-g26-01");
  const ridgeOnMelanoma = melanoma.patterns.find(pattern => map.get(pattern.id) === "parallel-ridge-pattern");
  assert.equal(ridgeOnMelanoma.certainty, "not_visible");
  assert.equal(data.cases.find(item => item.id === "case-g26-03").patterns.find(pattern => map.get(pattern.id) === "parallel-ridge-pattern").certainty, "uncertain");
  const furrow = audit.patterns.find(item => item.id === "parallel-furrow-pattern");
  assert.equal(furrow.occurrences.some(row => row.caseId.startsWith("case-g26-")), false);
  for (const id of goal26) {
    const item = data.cases.find(entry => entry.id === id);
    for (const pattern of item.patterns) {
      if (!acralStructures.includes(map.get(pattern.id)) || !positive(pattern.certainty)) continue;
      assert.equal(pattern.certainty === "clearly_visible", false, `${pattern.id}: acral line geometry stays probable without resolved pores`);
      assert.doesNotMatch(pattern.specificityNote, new RegExp(item.diagnosisLabel, "i"));
    }
  }
  const fibrillar = audit.patterns.find(item => item.id === "fibrillar-pattern");
  const poles = new Set(fibrillar.occurrences.filter(row => positive(row.certainty)).map(row => row.pole));
  assert.ok(poles.has("benign") && poles.has("malignant"));
});

test("nail findings stay image-specific and do not claim Hutchinson signs, migration, or change", () => {
  const data = loadCaseData();
  const map = links();
  const patterns = loadPatternData();
  const unlinked = new Set(patterns.unlinkedObservations.map(item => item.casePatternId));
  for (const id of ["case-g26-05", "case-g26-06", "case-g26-07"]) {
    const item = data.cases.find(entry => entry.id === id);
    assert.equal(specialSite(item.patientContext.anatomicalSite), "nail");
    for (const pattern of item.patterns) {
      const text = `${pattern.label} ${pattern.specificityNote}`;
      if (/hutchinson|periungual|below the free edge|proximal plate edge/i.test(text)) {
        assert.equal(positive(pattern.certainty), false, pattern.id);
        assert.ok(unlinked.has(pattern.id), pattern.id);
      }
      if (positive(pattern.certainty)) assert.doesNotMatch(text, /migrat|evolv|grew|growth|changed over time/i, pattern.id);
    }
    assert.match(item.patientContext.presentationNotes + item.diagnosticGroundTruth.confirmationNotes + item.pairedModality.limits, /history|one frame|before these/i);
  }
  const lines = patterns.patterns.find(item => item.id === "longitudinal-nail-plate-lines");
  assert.ok(lines.doesNotProve.some(text => /change over time/.test(text)));
  assert.equal(patterns.patterns.some(item => /hutchinson/i.test(item.id)), false);
  assert.equal(map.get("pat-g26-06-plate"), "nail-plate-destruction");
  assert.equal(data.cases.find(item => item.id === "case-g26-06").patterns.find(p => p.id === "pat-g26-06-plate").certainty, "not_visible");
});

test("Goal 26 pairs are explicit and match the ledger", () => {
  const data = loadCaseData();
  const pairs = new Map(data.pairProvenance.map(row => [row.caseId, row]));
  for (const id of goal26) assert.ok(["same_lesion_confirmed", "source_documented_pair"].includes(pairs.get(id).provenance), id);
  assert.equal(pairs.get("case-g26-01").provenance, "source_documented_pair");
  assert.equal(pairs.get("case-g26-02").provenance, "source_documented_pair");
  for (const row of rows26().filter(item => item.status === "accepted")) assert.equal(pairs.get(row.caseId).provenance, row.pairedStatus, row.id);
});

test("histopathology source is preserved and weak evidence is not upgraded", () => {
  const data = loadCaseData();
  const expected = { "case-g26-01": "article_methods", "case-g26-02": "article_methods", "case-g26-03": "article_methods", "case-g26-05": "case_text", "case-g26-06": "case_text" };
  for (const [id, source] of Object.entries(expected)) {
    const truth = data.cases.find(item => item.id === id).diagnosticGroundTruth;
    assert.equal(truth.confirmationMethod, "histopathology", id);
    assert.equal(truth.histopathologySource, source, id);
  }
  for (const id of ["case-g26-04", "case-g26-07"]) {
    const truth = data.cases.find(item => item.id === id).diagnosticGroundTruth;
    assert.equal(truth.confirmationMethod, "clinical_diagnosis", id);
    assert.equal(truth.histopathologySource, undefined, id);
  }
  assert.match(data.cases.find(item => item.id === "case-g26-06").diagnosticGroundTruth.confirmationNotes, /predates these frames/);
  const cases = new Map(data.cases.map(item => [item.id, item]));
  const nail = rows26().find(row => row.caseId === "case-g26-07");
  assert.throws(() => validateGoal25Row({ ...clone(nail), histopathology: "present_figure_caption", verificationMethod: "histopathology" }, cases), /does not match/);
});

test("composite extraction stays license-safe and third-party figures are rejected", () => {
  const data = loadCaseData();
  assert.doesNotThrow(() => validateLedger(loadLedger(), data));
  const cases = new Map(data.cases.map(item => [item.id, item]));
  const row = rows26().find(item => item.caseId === "case-g26-05");
  assert.throws(() => validateGoal25Row({ ...clone(row), thirdPartyExclusion: true }, cases), /third-party/);
  assert.throws(() => validateGoal25Row({ ...clone(row), license: "CC BY-NC 4.0" }, cases), /adaptation/);
  const thirdParty = rows26().filter(item => item.status === "rejected_license" && /permission|courtesy/i.test(item.reason + item.license));
  assert.ok(thirdParty.length >= 3);
  for (const item of rows26().filter(entry => entry.status === "accepted")) {
    assert.equal(item.thirdPartyExclusion, false);
    assert.equal(item.extraction.length, 2);
  }
  const revisits = rows26().filter(item => item.revisitsCandidateId);
  assert.ok(revisits.some(item => item.revisitsCandidateId === "cand-g25-melanonychia-child" && item.status === "accepted"));
  assert.ok(revisits.some(item => item.revisitsCandidateId === "cand-g25-ijd-palm-invasive" && item.status === "rejected_low_dermoscopic_signal"));
});

test("image marks stay out of diagnostic metrics", () => {
  const metrics = buildPairedMetrics();
  const audit = buildAudit();
  for (const id of ["printed-pointer", "measuring-scale-in-frame"]) {
    const pattern = audit.patterns.find(item => item.id === id);
    assert.ok(pattern.occurrences.some(row => row.caseId.startsWith("case-g26-")), id);
    assert.equal(metrics.diagnosticStructuresWithMoreThanOnePositiveExample.includes(id), false);
    assert.equal(metrics.structuresInBenignAndMalignantContexts.includes(id), false);
  }
});

test("special-site metrics keep face, scalp, acral, and nail apart", () => {
  const data = loadCaseData();
  const site = id => specialSite(data.cases.find(item => item.id === id).patientContext.anatomicalSite);
  for (const id of ["case-g26-01", "case-g26-02", "case-g26-03", "case-g26-04"]) assert.equal(site(id), "acral", id);
  for (const id of ["case-g26-05", "case-g26-06", "case-g26-07"]) assert.equal(site(id), "nail", id);
  assert.equal(site("case-g25-03"), "scalp");
  const metrics = buildPairedMetrics(data);
  assert.equal(metrics.specialSiteTruePairs.includes("case-g25-03"), false);
  for (const id of goal26) assert.ok(metrics.specialSiteTruePairs.includes(id), id);
});

test("benign and malignant contrast links resolve in both directions", () => {
  const data = loadCaseData();
  const audit = buildAudit();
  const pole = id => audit.cases.find(item => item.id === id).pole;
  const comparisons = new Map(data.comparisons.map(item => [item.id, item]));
  for (const [id, benign, malignant] of [["cmp-g26-heel", "case-g26-02", "case-g26-01"], ["cmp-g26-fibrillar", "case-g26-02", "case-g26-03"], ["cmp-g26-ridge", "case-g26-02", "case-g25-04"], ["cmp-g26-blood", "case-g26-04", "case-g26-01"], ["cmp-g26-nail-broad", "case-g26-06", "case-g26-07"], ["cmp-g26-nail-narrow", "case-g26-05", "case-g26-07"]]) {
    const item = comparisons.get(id);
    assert.ok(item, id);
    assert.equal(item.caseIdA, benign);
    assert.equal(item.caseIdB, malignant);
    assert.equal(pole(benign), "benign", id);
    assert.equal(pole(malignant), "malignant", id);
    assert.doesNotMatch(item.discriminator || "", /always|never|proves/i);
    assert.match(item.limits, /\S/);
  }
  for (const id of goal26) {
    for (const ref of data.cases.find(item => item.id === id).compareWith) {
      const item = comparisons.get(ref);
      assert.ok(item.caseIdA === id || item.caseIdB === id, `${id} ${ref}`);
    }
  }
  assert.ok(buildPairedMetrics(data).structuresInBenignAndMalignantContexts.includes("fibrillar-pattern"));
});

test("Goal 26 content stays review required and earlier fingerprints are unchanged", () => {
  const data = loadCaseData();
  const status = buildPublicStatus();
  const published = JSON.parse(fs.readFileSync(path.join(root, "review-status.json"), "utf8"));
  assert.equal(JSON.stringify(published), JSON.stringify(status));
  assert.equal(status.assets.filter(item => item.status === "clinician reviewed").length, 5);
  for (const id of goal26) {
    const item = data.cases.find(entry => entry.id === id);
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
  for (const item of data.cases.filter(entry => !goal26.includes(entry.id))) {
    assert.equal(caseFingerprint(item), published.assets.find(row => row.assetType === "case" && row.id === item.id).currentFingerprint, item.id);
  }
  const patterns = loadPatternData();
  for (const id of ["fibrillar-pattern", "irregular-acral-pigmentation", "longitudinal-nail-plate-lines", "hemorrhagic-structureless-area"]) {
    const pattern = patterns.patterns.find(item => item.id === id);
    assert.equal(pattern.reviewStatus, "clinician review required");
    assert.equal(pattern.clinicalReview, null);
  }
});
