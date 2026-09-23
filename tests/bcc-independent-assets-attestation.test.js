const assert = require("node:assert/strict");
const test = require("node:test");
const { buildPublicStatus } = require("../scripts/review-governance");

const EXPECTED = {
  "basal-cell-carcinoma-de": {
    assetType: "follow_up",
    fingerprint: "sha256-v1:25cbf04b711b308ca456ab8b67a29bd056d3ccb69c0f404e285adaf8ab92c02e",
    decisionId: "decision-bcc-de-2026-09-23-001"
  },
  "bcc-dermoscopy": {
    assetType: "quiz",
    fingerprint: "sha256-v1:f4b9487215a415cfbbc159b5b1de4a64e77b27d816559b119a32e111276db338",
    decisionId: "decision-bcc-quiz-2026-09-23-001"
  },
  "bcc-clues-schematic": {
    assetType: "visual",
    fingerprint: "sha256-v1:0d45d6d602b890b47548da1e708be5d3f365540b0a2b49240763504bfd6e0471",
    decisionId: "decision-bcc-visual-2026-09-23-001"
  }
};

const ROLE_BAN = /Facharzt|board-certified|specialist dermatologist|consultant|attending/i;

test("BCC independent assets are clinician reviewed at exact fingerprints with training-role reviewer", () => {
  const status = buildPublicStatus();

  for (const [id, expected] of Object.entries(EXPECTED)) {
    const asset = status.assets.find(item => item.id === id);
    assert.ok(asset, `missing asset ${id}`);
    assert.equal(asset.assetType, expected.assetType);
    assert.equal(asset.status, "clinician reviewed");
    assert.equal(asset.activeDecisionId, expected.decisionId);
    assert.equal(asset.currentFingerprint, expected.fingerprint);
    assert.deepEqual(asset.awaitingSections, []);

    const decision = status.decisions.find(item => item.id === expected.decisionId);
    assert.ok(decision, `missing decision ${expected.decisionId}`);
    assert.equal(decision.assetId, id);
    assert.equal(decision.contentFingerprint, expected.fingerprint);
    assert.equal(decision.verdict, "approved");
    assert.equal(decision.provenance, "human-submitted");
    assert.equal(decision.reviewerId, "reviewer-mna-001");
    assert.equal(decision.reviewerRole, "Physician in dermatology specialty training");
    assert.equal(decision.reviewDate, "2026-09-23");
    assert.doesNotMatch(JSON.stringify(decision), ROLE_BAN);
  }

  assert.equal(status.reviewers[0].displayName, "Murat Nasuh Aras");
  assert.equal(status.reviewers[0].professionalRole, "Physician in dermatology specialty training");
  assert.doesNotMatch(
    `${status.reviewers[0].professionalRole} ${status.reviewers[0].specialtyOrField}`,
    ROLE_BAN
  );

  const disease = status.assets.find(item => item.id === "basal-cell-carcinoma");
  assert.equal(disease.status, "clinician reviewed");
  assert.equal(
    disease.currentFingerprint,
    "sha256-v1:fbc2b272331822060c656dd0680da07e9131ecd3f59f071a71273748f14ad65f"
  );
  assert.equal(disease.activeDecisionId, "decision-bcc-2026-09-23-001");

  const ak = status.assets.find(item => item.id === "actinic-keratosis");
  assert.equal(ak.status, "clinician reviewed");
  assert.equal(
    ak.currentFingerprint,
    "sha256-v1:92302d680f4c645cc1a91c9a827a3e44b0d965fa21fa019144458bd81c27a1dd"
  );
  assert.equal(ak.activeDecisionId, "decision-ak-2026-09-23-001");

  assert.equal(status.decisions.length, 5);
  assert.equal(status.assets.filter(item => item.status === "clinician reviewed").length, 5);
  assert.equal(status.assets.filter(item => item.status === "review required").length, 18);
});
