const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const { loadCaseData, validateCaseData, caseFingerprint } = require("../scripts/case");
const { loadLedger, validateLedger } = require("../scripts/acquisition");
const { validatePairProvenance, buildPairedMetrics } = require("../scripts/paired-modality");
const { loadPatternData } = require("../scripts/pattern");
const { buildPublicStatus } = require("../scripts/review-governance");

const root = path.join(__dirname, "..");
const reviewedFingerprints = {
  "disease:actinic-keratosis": "sha256-v1:92302d680f4c645cc1a91c9a827a3e44b0d965fa21fa019144458bd81c27a1dd",
  "disease:basal-cell-carcinoma": "sha256-v1:fbc2b272331822060c656dd0680da07e9131ecd3f59f071a71273748f14ad65f",
  "quiz:bcc-dermoscopy": "sha256-v1:f4b9487215a415cfbbc159b5b1de4a64e77b27d816559b119a32e111276db338",
  "visual:bcc-clues-schematic": "sha256-v1:0d45d6d602b890b47548da1e708be5d3f365540b0a2b49240763504bfd6e0471",
  "follow_up:basal-cell-carcinoma-de": "sha256-v1:25cbf04b711b308ca456ab8b67a29bd056d3ccb69c0f404e285adaf8ab92c02e"
};

test("the acquisition ledger is valid and separate from clinical cases", () => {
  const ledger = loadLedger();
  const data = loadCaseData();
  const report = validateLedger(ledger, data);
  assert.equal(report.counts.accepted, 21);
  assert.equal(ledger.candidates.filter(row => row.goal == null && row.status === "accepted").length, 2);
  assert.ok(report.counts.rejected_license >= 1);
  assert.ok(report.counts.rejected_not_true_pair >= 1);
  assert.equal(ledger.candidates.some(row => row.status === "accepted" && row.integrated !== true), false);
  const caseIds = new Set(data.cases.map(item => item.id));
  const curriculumIds = new Set(data.curriculum.entries.map(entry => entry.caseId));
  for (const row of ledger.candidates) {
    if (row.status.startsWith("rejected") || row.status === "temporarily_unavailable" || row.status === "candidate") {
      assert.equal(row.integrated, false, row.id);
      assert.equal(caseIds.has(row.id), false, row.id);
      assert.equal(curriculumIds.has(row.id), false, row.id);
      assert.equal(row.caseId, null, row.id);
    }
  }
  assert.equal(fs.readFileSync(path.join(root, "case-data.js"), "utf8").includes("DOCUTIS_ACQUISITION_LEDGER"), false);
});

test("accepted cases keep explicit licenses, distinct paired assets, and review required", () => {
  const data = loadCaseData();
  const ledger = loadLedger();
  assert.doesNotThrow(() => validateCaseData(data));
  assert.doesNotThrow(() => validatePairProvenance(data));
  const patterns = loadPatternData();
  const links = new Map(patterns.links.map(item => [item.casePatternId, item.canonicalId]));
  const canonical = new Set(patterns.patterns.map(item => item.id));
  const comparisons = new Map(data.comparisons.map(item => [item.id, item]));
  for (const row of ledger.candidates.filter(item => item.status === "accepted")) {
    const caseItem = data.cases.find(item => item.id === row.caseId);
    assert.equal(caseItem.reviewStatus, "clinician review required");
    assert.equal(caseItem.clinicalReview, null);
    assert.equal(caseItem.recordedScreeningDecision, null);
    const clinical = caseItem.images.filter(image => image.type === "clinical");
    const dermoscopy = caseItem.images.filter(image => image.type === "dermoscopy");
    assert.equal(clinical.length, 1);
    assert.equal(dermoscopy.length, 1);
    assert.notEqual(clinical[0].src, dermoscopy[0].src);
    assert.equal(clinical[0].license, row.license);
    assert.equal(dermoscopy[0].license, row.license);
    assert.match(clinical[0].licenseUrl, row.license === "CC BY-SA 4.0" ? /by-sa\/4\.0/ : /\/by\/4\.0\/$/);
    assert.equal(clinical[0].sourceVerificationStatus, "verified");
    assert.ok(caseItem.observations.some(item => item.modality === "dermoscopy"));
    assert.ok(caseItem.observations.some(item => item.modality === "clinical"));
    assert.equal(caseItem.observations.filter(item => item.modality === "dermoscopy").every(() => dermoscopy.length === 1), true);
    for (const pattern of caseItem.patterns) {
      const unlinked = (patterns.unlinkedObservations || []).some(item => item.casePatternId === pattern.id);
      if (links.has(pattern.id)) assert.ok(canonical.has(links.get(pattern.id)), pattern.id);
      else assert.equal(unlinked, true, pattern.id);
    }
    for (const id of caseItem.compareWith) {
      const comparison = comparisons.get(id);
      assert.ok(comparison, id);
      assert.ok(comparison.caseIdA === caseItem.id || comparison.caseIdB === caseItem.id);
    }
    if (row.goal >= 25) {
      assert.equal(caseItem.diagnosticGroundTruth.confirmationMethod === "histopathology", row.verificationMethod === "histopathology", row.id);
      assert.match(caseItem.diagnosticGroundTruth.confirmationNotes, /histopatholog|histolog/i);
    } else {
      assert.equal(caseItem.diagnosticGroundTruth.confirmationMethod === "histopathology", false);
      assert.match(caseItem.diagnosticGroundTruth.confirmationNotes, /not|does not report histopathology|Neither description reports histopathology/i);
    }
  }
  const prior = data.cases.find(item => item.id === "case-g21-08");
  assert.equal(prior.pairedModality.informationGain, "dermoscopy_adds_support");
  assert.equal(data.pairProvenance.find(row => row.caseId === "case-g21-08").provenance, "source_documented_pair");
});

test("the ledger does not change reviewed fingerprints or pilot case fingerprints", () => {
  const data = loadCaseData();
  const status = JSON.parse(fs.readFileSync(path.join(root, "review-status.json"), "utf8"));
  const built = buildPublicStatus();
  for (const [key, fingerprint] of Object.entries(reviewedFingerprints)) {
    const [assetType, id] = key.split(":");
    const asset = built.assets.find(item => item.assetType === assetType && item.id === id);
    const published = status.assets.find(item => item.assetType === assetType && item.id === id);
    assert.equal(asset.currentFingerprint, fingerprint, key);
    assert.equal(published.currentFingerprint, fingerprint, key);
    assert.equal(asset.status, "clinician reviewed", key);
    assert.equal(published.status, "clinician reviewed", key);
    assert.equal(asset.activeDecisionId, published.activeDecisionId, key);
  }
  for (const id of ["case-acral-melanoma-plantar", "case-bcc-nodular-dermoscopy", "case-bcc-pigmented-dermoscopy", "case-ak-field-hand", "case-scc-ak-paraspinal", "case-g21-08", "case-g22-01"]) {
    const item = data.cases.find(entry => entry.id === id);
    const published = status.assets.find(asset => asset.assetType === "case" && asset.id === id);
    assert.equal(caseFingerprint(item), published.currentFingerprint, id);
  }
  for (const id of ["case-g24-01", "case-g24-02"]) {
    const asset = built.assets.find(item => item.assetType === "case" && item.id === id);
    assert.equal(asset.status, "review required", id);
    assert.equal(data.cases.find(item => item.id === id).clinicalReview, null);
  }
  const metrics = buildPairedMetrics(data);
  assert.equal(metrics.pairedMelanomaWithHistopathology.some(id => id.startsWith("case-g24-")), false);
  assert.equal(metrics.pairedMelanomaWithHistopathology.length, 8);
  assert.ok(metrics.paired.includes("case-g21-08"));
});
