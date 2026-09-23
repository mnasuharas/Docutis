const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const {
  attestationText, buildAssets, buildPublicStatus, deriveAssetStatus, quizFingerprint,
  sourceMetadataWarnings, validateDecision, validateReviewer
} = require("../scripts/review-governance");
const { fingerprint, loadData } = require("../scripts/clinical-review");

const root = path.join(__dirname, "..");
const clone = value => JSON.parse(JSON.stringify(value));
const reviewer = {
  id: "reviewer-public-1", displayName: "Public reviewer", professionalRole: "Physician — Dermatology resident",
  specialtyOrField: "Dermatology and venereology", trainingStatus: "Specialty training", jurisdiction: "DE",
  publicDisclosure: "No public conflict declared for this review.", publicDisplayConsent: true
};

function decision(asset, overrides = {}) {
  return {
    id: `decision-${asset.assetType}-${asset.id}`, assetId: asset.id, assetType: asset.assetType,
    contentFingerprint: asset.currentFingerprint, schemaVersion: asset.schemaVersion, reviewerId: reviewer.id,
    reviewerRole: reviewer.professionalRole, reviewDate: "2026-09-20", reviewedSections: [...asset.sections],
    evidenceSourcesChecked: [...asset.evidenceSources], verdict: "approved", requiredCorrections: [],
    reviewerNotes: "Public educational-governance review.", attestationVersion: "docutis-human-clinical-review-v1",
    attestationText, provenance: "human-submitted", supersededBy: null, ...overrides
  };
}

function reviewData(decisions = [], reviewers = [reviewer]) {
  return { schemaVersion: 1, attestationVersion: "docutis-human-clinical-review-v1", reviewers, decisions };
}

test("public manifest covers 23 independent Goal 9 review units with no implied approval", () => {
  const status = buildPublicStatus();
  assert.equal(status.assets.length, 23);
  assert.deepEqual(Object.fromEntries(["disease", "quiz", "visual", "follow_up"].map(type => [type, status.assets.filter(item => item.assetType === type).length])), { disease: 8, quiz: 8, visual: 4, follow_up: 3 });
  const ak = status.assets.find(item => item.id === "actinic-keratosis");
  const bcc = status.assets.find(item => item.id === "basal-cell-carcinoma");
  assert.equal(ak.status, "clinician reviewed");
  assert.equal(ak.activeDecisionId, "decision-ak-2026-09-23-001");
  assert.equal(bcc.status, "clinician reviewed");
  assert.equal(bcc.activeDecisionId, "decision-bcc-2026-09-23-001");
  const reviewedIds = new Set(["actinic-keratosis", "basal-cell-carcinoma"]);
  assert.ok(status.assets.filter(item => !reviewedIds.has(item.id)).every(item => item.status === "review required"));
  assert.ok(status.assets.every(item => /^sha256-v1:[0-9a-f]{64}$/.test(item.currentFingerprint)), "machine-readable data preserves every full fingerprint");
  assert.equal(status.latestValidHumanReviewDate, "2026-09-23");
  assert.equal(status.reviewers.length, 1);
  assert.equal(status.decisions.length, 2);
  assert.equal(status.reviewers[0].professionalRole, "Physician in dermatology specialty training");
  assert.doesNotMatch(JSON.stringify(status.reviewers[0]), /Facharzt|board-certified|specialist dermatologist|consultant|attending/i);
});

test("reviewer identity requires public consent, an accurate physician role and excludes private fields", () => {
  assert.doesNotThrow(() => validateReviewer(reviewer));
  for (const mutate of [
    value => { value.publicDisplayConsent = false; },
    value => { value.professionalRole = "Dermatologist"; },
    value => { value.specialtyOrField = ""; },
    value => { value.email = "private@example.test"; }
  ]) {
    const value = clone(reviewer); mutate(value);
    assert.throws(() => validateReviewer(value));
  }
});

test("human decisions require exact fingerprints, roles, attestation and non-automated provenance", () => {
  const asset = buildAssets()[0];
  const assets = new Map([[`${asset.assetType}:${asset.id}`, asset]]);
  const reviewers = new Map([[reviewer.id, reviewer]]);
  assert.doesNotThrow(() => validateDecision(decision(asset), assets, reviewers, "docutis-human-clinical-review-v1"));
  const mutations = [
    value => { value.contentFingerprint = "not-a-fingerprint"; },
    value => { value.reviewerRole = "Dermatologist"; },
    value => { value.reviewDate = "2999-01-01"; },
    value => { value.reviewedSections = ["invented-section"]; },
    value => { value.evidenceSourcesChecked = ["https://example.test/unsupported"]; },
    value => { value.attestationText = "AI generated approval"; },
    value => { value.provenance = "automated"; }
  ];
  for (const mutate of mutations) { const value = decision(asset); mutate(value); assert.throws(() => validateDecision(value, assets, reviewers, "docutis-human-clinical-review-v1")); }
});

test("full, partial, changes-requested and deferred verdicts remain distinct", () => {
  const asset = buildAssets()[0];
  assert.equal(deriveAssetStatus(asset, [decision(asset)]).status, "clinician reviewed");
  assert.equal(deriveAssetStatus(asset, [decision(asset, { reviewedSections: asset.sections.slice(0, 2), verdict: "approved_with_minor_corrections", requiredCorrections: ["Apply the exact reviewer-supplied wording before final fingerprint confirmation."] })]).status, "partially reviewed");
  assert.equal(deriveAssetStatus(asset, [decision(asset, { verdict: "changes_requested", reviewedSections: [], requiredCorrections: ["Replace unsupported claim."] })]).status, "changes requested");
  assert.equal(deriveAssetStatus(asset, [decision(asset, { verdict: "not_reviewed", reviewedSections: [], evidenceSourcesChecked: [] })]).status, "review required");
});

test("clinically relevant changes invalidate approval while non-clinical metadata checks preserve fingerprints", () => {
  const asset = buildAssets().find(item => item.assetType === "disease");
  const approved = decision(asset);
  assert.equal(deriveAssetStatus({ ...asset, currentFingerprint: `sha256-v1:${"a".repeat(64)}` }, [approved]).status, "review invalidated");
  const record = clone(loadData().diseases.find(item => item.id === asset.id));
  const original = fingerprint(record);
  record.references[0].metadataCheckedAt = "2026-09-21";
  assert.equal(fingerprint(record), original);
  record.description += " Clinically meaningful change.";
  assert.notEqual(fingerprint(record), original);
});

test("quiz fingerprints bind the answer and explanation independently of review metadata", () => {
  const questionAsset = buildAssets().find(item => item.assetType === "quiz");
  const question = require("../scripts/quiz").load("quiz-data.js", "DOCUTIS_QUIZ").questions.find(item => item.id === questionAsset.id);
  const copy = clone(question);
  assert.equal(quizFingerprint(copy), questionAsset.currentFingerprint);
  copy.reviewStatus = "clinician reviewed";
  copy.clinicalReview = { ignored: true };
  assert.equal(quizFingerprint(copy), questionAsset.currentFingerprint);
  copy.explanation += " changed";
  assert.notEqual(quizFingerprint(copy), questionAsset.currentFingerprint);
});

test("superseded decisions remain in history and cannot supersede another asset", () => {
  const [first, second] = buildAssets();
  const old = decision(first, { id: "old", contentFingerprint: `sha256-v1:${"b".repeat(64)}`, supersededBy: "new" });
  const current = decision(first, { id: "new" });
  const status = buildPublicStatus(reviewData([old, current]));
  const item = status.assets.find(asset => asset.id === first.id && asset.assetType === first.assetType);
  assert.equal(item.status, "clinician reviewed");
  assert.equal(item.history.length, 2);
  assert.throws(() => buildPublicStatus(reviewData([old, decision(second, { id: "new" })])), /same asset/);
});

test("malformed records, broken review references and stale source metadata fail visibly", () => {
  const asset = buildAssets()[0];
  assert.throws(() => buildPublicStatus(reviewData([decision(asset, { reviewerId: "missing" })])), /resolve/);
  assert.throws(() => buildPublicStatus({ ...reviewData(), schemaVersion: 99 }), /Unsupported/);
  assert.deepEqual(sourceMetadataWarnings(buildAssets(), "2026-09-23"), []);
  const stale = clone(asset); stale.evidenceMetadata[0].metadataCheckedAt = "2020-01-01";
  assert.match(sourceMetadataWarnings([stale], "2026-09-23")[0], /stale source metadata/);
});

test("committed machine-readable outputs exactly match the validated public manifest", () => {
  const expected = buildPublicStatus();
  const json = JSON.parse(fs.readFileSync(path.join(root, "review-status.json"), "utf8"));
  assert.equal(JSON.stringify(json), JSON.stringify(expected));
  const browserSource = fs.readFileSync(path.join(root, "review-status.js"), "utf8");
  assert.match(browserSource, /DOCUTIS_REVIEW_STATUS/);
  assert.doesNotMatch(JSON.stringify(json), /email|phone|licen[cs]e|signature|address/i);
});

test("consolidated human gate contains every fingerprint and leaves all decisions incomplete", () => {
  const markdown = fs.readFileSync(path.join(root, "GOAL9_HUMAN_REVIEW_GATE.md"), "utf8");
  const template = JSON.parse(fs.readFileSync(path.join(root, "goal9-review-decisions.template.json"), "utf8"));
  for (const asset of buildAssets()) assert.match(markdown, new RegExp(asset.currentFingerprint.replace(":", "\\:")));
  assert.equal(template.decisions.length, 23);
  assert.ok(template.decisions.every(item => item.verdict === null));
  assert.equal(template.attestationAccepted, null);
});
