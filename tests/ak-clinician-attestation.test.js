const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const { buildPublicStatus } = require("../scripts/review-governance");
const { loadData } = require("../scripts/clinical-review");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");

test("ICD-O UI uses neutral not-applicable wording without non-neoplastic claim", () => {
  assert.match(app, /No ICD-O morphology code is assigned for this record/);
  assert.doesNotMatch(app, /this non-neoplastic condition/);
});

test("AK ICD-O verification note and German Fachinfo sources are published", () => {
  const ak = loadData().diseases.find(item => item.id === "actinic-keratosis");
  assert.equal(ak.coding.icdoApplicability, "not applicable");
  assert.equal(
    ak.coding.verificationNote,
    "No ICD-O morphology code is assigned to routine clinically diagnosed actinic keratosis in this record. If squamous cell carcinoma in situ or invasive cutaneous squamous cell carcinoma is histologically diagnosed, the neoplasm should be coded separately according to the pathological diagnosis and applicable registry system."
  );
  const blob = JSON.stringify(ak);
  assert.match(blob, /https:\/\/www\.fachinfo\.de\/fi\/pdf\/022967\/tolak-r-40-mg-g-creme/);
  assert.match(blob, /https:\/\/www\.fachinfo\.de\/fi\/pdf\/013084\/actikerall-5-mg-g-100-mg-g-loesung-zur-anwendung-auf-der-haut/);
  assert.doesNotMatch(blob, /medicines\.org\.uk\/emc\/product\/(15802|4621)/);
  assert.match(blob, /Fachinformation/);
  assert.doesNotMatch(blob, /3\.01|Konsultationsfassung/);
  assert.match(blob, /2\.1; AWMF 032\/052OL/);
  const act = ak.clinicalProfile.treatment.steps
    .flatMap(step => step.interventions.flatMap(item => item.medications || []))
    .find(med => /Actikerall/i.test(med.name));
  assert.equal(act.contraindications, "Contraindicated during pregnancy and breastfeeding, in patients with renal insufficiency, and in patients with hypersensitivity to fluorouracil, salicylic acid or any excipient. Actikerall must not be used concomitantly with brivudine, sorivudine or their analogues; a minimum interval of four weeks must be observed between treatment with these antiviral nucleoside analogues and fluorouracil.");
});

test("About limitation text requires traceable product-specific dosing support", () => {
  assert.match(html, /Product-specific dosing and jurisdiction-specific information are included only when supported by traceable current guidelines or regulatory product information and still require professional verification before clinical use\./);
  assert.doesNotMatch(html, /intentionally avoids unsupported dosing and jurisdiction-specific instructions/);
});

test("AK is clinician reviewed with matching fingerprint and training-role reviewer", () => {
  const status = buildPublicStatus();
  const ak = status.assets.find(item => item.id === "actinic-keratosis");
  assert.equal(ak.status, "clinician reviewed");
  assert.equal(ak.activeDecisionId, "decision-ak-2026-09-23-001");
  assert.equal(ak.currentFingerprint, status.decisions[0].contentFingerprint);
  assert.deepEqual(ak.awaitingSections, []);
  assert.equal(status.latestValidHumanReviewDate, "2026-09-23");
  assert.equal(status.reviewers[0].displayName, "Murat Nasuh Aras");
  assert.equal(status.reviewers[0].professionalRole, "Physician in dermatology specialty training");
  assert.doesNotMatch(
    `${status.reviewers[0].professionalRole} ${status.reviewers[0].specialtyOrField}`,
    /Facharzt|board-certified|specialist dermatologist|consultant|attending/i
  );
  const reviewedIds = new Set(["actinic-keratosis", "basal-cell-carcinoma"]);
  assert.ok(status.assets.filter(item => !reviewedIds.has(item.id)).every(item => item.status === "review required"));
  assert.equal(status.assets.find(item => item.id === "basal-cell-carcinoma").status, "clinician reviewed");
});
