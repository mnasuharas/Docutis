const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const {
  caseFingerprint, loadCaseData, validateCaseData, allowedLicenses
} = require("../scripts/case");
const { buildPublicStatus, buildAssets } = require("../scripts/review-governance");

const root = path.join(__dirname, "..");

test("case registry validates unique IDs, disease links, provenance and local assets", () => {
  const cases = loadCaseData();
  assert.equal(cases.schemaVersion, 1);
  assert.ok(cases.cases.length >= 3);
  assert.doesNotThrow(() => validateCaseData(cases));
  const ids = new Set();
  for (const item of cases.cases) {
    assert.ok(!ids.has(item.id));
    ids.add(item.id);
    assert.equal(item.reviewStatus, "clinician review required");
    assert.equal(item.clinicalReview, null);
    assert.ok(item.observations.length >= 2);
    assert.ok(item.differentials.length >= 1);
    assert.ok(item.diseaseId);
    for (const image of item.images) {
      assert.ok(allowedLicenses.has(image.license));
      assert.equal(image.sourceVerificationStatus, "verified");
      assert.equal(image.patientIdentifiable, false);
      assert.ok(fs.existsSync(path.join(root, image.src)));
      assert.notEqual(image.license, "Project-owned");
    }
    assert.ok(/^sha256-v1:[0-9a-f]{64}$/.test(caseFingerprint(item)));
  }
});

test("case fingerprints ignore metadata check dates and review fields", () => {
  const item = structuredClone(loadCaseData().cases[0]);
  const base = caseFingerprint(item);
  item.images[0].metadataCheckedAt = "2099-01-01";
  item.images[0].accessDate = "2099-01-01";
  item.reviewStatus = "clinician review required";
  item.clinicalReview = null;
  assert.equal(caseFingerprint(item), base);
  item.observations[0].text = "Changed observation";
  assert.notEqual(caseFingerprint(item), base);
});

test("cases join Goal 9 public assets as review-required case units", () => {
  const status = buildPublicStatus();
  const caseAssets = status.assets.filter(item => item.assetType === "case");
  assert.equal(caseAssets.length, loadCaseData().cases.length);
  assert.ok(caseAssets.every(item => item.status === "review required"));
  assert.ok(buildAssets().some(item => item.assetType === "case"));
});

test("case UI shell and progressive disclosure controls exist", () => {
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const app = fs.readFileSync(path.join(root, "case-app.js"), "utf8");
  assert.match(html, /id="caseModule"/);
  assert.match(html, /href="#caseModule"/);
  assert.match(html, /src="case-data\.js"/);
  assert.match(html, /src="case-app\.js"/);
  assert.match(app, /Reveal diagnosis/);
  assert.match(app, /aria-expanded/);
  assert.match(app, /aria-live/);
  assert.match(app, /progressive|observations|differentials|teachingPoints/i);
});

test("case modules pass node syntax checks", () => {
  const { execFileSync } = require("node:child_process");
  for (const file of ["case-data.js", "case-app.js", "scripts/case.js"]) {
    execFileSync(process.execPath, ["--check", file], { cwd: root });
  }
});
