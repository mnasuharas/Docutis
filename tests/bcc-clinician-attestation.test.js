const assert = require("node:assert/strict");
const test = require("node:test");
const { buildPublicStatus } = require("../scripts/review-governance");

test("BCC is clinician reviewed with matching fingerprint and training-role reviewer", () => {
  const status = buildPublicStatus();
  const bcc = status.assets.find(item => item.id === "basal-cell-carcinoma");
  assert.equal(bcc.status, "clinician reviewed");
  assert.equal(bcc.activeDecisionId, "decision-bcc-2026-09-23-001");
  assert.equal(
    bcc.currentFingerprint,
    "sha256-v1:fbc2b272331822060c656dd0680da07e9131ecd3f59f071a71273748f14ad65f"
  );
  assert.equal(status.decisions.find(item => item.id === "decision-bcc-2026-09-23-001").contentFingerprint, bcc.currentFingerprint);
  assert.deepEqual(bcc.awaitingSections, []);
  assert.equal(status.latestValidHumanReviewDate, "2026-09-23");
  assert.equal(status.reviewers[0].displayName, "Murat Nasuh Aras");
  assert.equal(status.reviewers[0].professionalRole, "Physician in dermatology specialty training");
  assert.doesNotMatch(
    `${status.reviewers[0].professionalRole} ${status.reviewers[0].specialtyOrField}`,
    /Facharzt|board-certified|specialist dermatologist|consultant|attending/i
  );
  assert.doesNotMatch(JSON.stringify(status.decisions.find(item => item.id === "decision-bcc-2026-09-23-001")), /Facharzt|board-certified|specialist dermatologist|consultant|attending/i);

  const independent = ["basal-cell-carcinoma-de", "bcc-dermoscopy", "bcc-clues-schematic"];
  for (const id of independent) {
    const asset = status.assets.find(item => item.id === id);
    assert.ok(asset, `missing independent asset ${id}`);
    assert.equal(asset.status, "review required");
  }

  const ak = status.assets.find(item => item.id === "actinic-keratosis");
  assert.equal(ak.status, "clinician reviewed");
  assert.equal(ak.activeDecisionId, "decision-ak-2026-09-23-001");

  const reviewedIds = new Set(["actinic-keratosis", "basal-cell-carcinoma"]);
  assert.ok(status.assets.filter(item => !reviewedIds.has(item.id)).every(item => item.status === "review required"));
});
