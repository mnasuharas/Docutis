const assert = require("node:assert/strict");
const test = require("node:test");
const { createHash } = require("node:crypto");
const { execFileSync } = require("node:child_process");
const path = require("node:path");
const fs = require("node:fs");
const { statuses, canonicalize, fingerprint, validateReview, loadData } = require("../scripts/clinical-review");
const data = loadData();
const root = path.join(__dirname, "..");
const clone = value => JSON.parse(JSON.stringify(value));

function reviewedFixture() {
  const record = clone(data.diseases[0]);
  record.id = "synthetic-review-fixture";
  record.name = "Synthetic review fixture";
  record.reviewStatus = "clinician reviewed";
  record.clinicalReview = {
    reviewedAt: "2026-01-15", reviewerRole: "physician", reviewerSpecialty: "dermatology",
    reviewedContentHash: fingerprint(record)
  };
  return record;
}

test("Goal 7 preserves every legacy record, alias, clinical field, code, source and taxonomy", () => {
  assert.equal(data.diseases.length, 50);
  assert.equal(data.categories.length, 8);
  assert.equal(data.subcategories.length, 26);
  const { schemaVersion, ...legacyTopLevel } = data;
  const content = { ...legacyTopLevel, diseases: data.diseases.map(({ reviewStatus, clinicalReview, clinicalProfile, ...record }) => ({
    ...record, references: record.references.map(({ metadataCheckedAt, ...reference }) => reference)
  })) };
  // Legacy clinical snapshot, excluding review state, Goal 7 profiles and bibliographic recheck dates.
  assert.equal(createHash("sha256").update(JSON.stringify(canonicalize(content))).digest("hex"),
    "4f3e41022b2c2f5c7dfd6a449b3191b7eaf2219fe361ba81da45760e75179624");
});

test("all 50 production records remain unreviewed with null metadata", () => {
  assert.deepEqual(statuses, ["clinician review required", "clinician reviewed"]);
  for (const record of data.diseases) {
    assert.equal(record.reviewStatus, statuses[0]);
    assert.equal(record.clinicalReview, null);
    assert.doesNotThrow(() => validateReview(record));
  }
});

test("unknown statuses and completed metadata on required records fail", () => {
  for (const status of ["approved", "verified", "certified", "", null, undefined]) {
    assert.throws(() => validateReview({ ...reviewedFixture(), reviewStatus: status }), /Unknown/);
  }
  for (const metadata of [{}, reviewedFixture().clinicalReview, undefined, ""]) {
    assert.throws(() => validateReview({ ...data.diseases[0], clinicalReview: metadata }), /clinicalReview: null/);
  }
});

test("synthetic reviewed records require complete physician metadata", () => {
  assert.doesNotThrow(() => validateReview(reviewedFixture()));
  for (const field of ["reviewedAt", "reviewerRole", "reviewerSpecialty", "reviewedContentHash"]) {
    const record = reviewedFixture();
    delete record.clinicalReview[field];
    assert.throws(() => validateReview(record));
  }
  for (const metadata of [null, [], "reviewed"]) {
    assert.throws(() => validateReview({ ...reviewedFixture(), clinicalReview: metadata }));
  }
  for (const date of ["2026-02-30", "2025-02-29", "2026-13-01", "2026-1-1", "", 123]) {
    const record = reviewedFixture(); record.clinicalReview.reviewedAt = date;
    assert.throws(() => validateReview(record), /date/);
  }
  for (const role of ["AI", "Codex", "", "researcher"]) {
    const record = reviewedFixture(); record.clinicalReview.reviewerRole = role;
    assert.throws(() => validateReview(record), /physician/);
  }
  for (const specialty of ["", "  ", null, 123]) {
    const record = reviewedFixture(); record.clinicalReview.reviewerSpecialty = specialty;
    assert.throws(() => validateReview(record), /specialty/);
  }
  for (const hash of ["", "abc", "sha256-v1:" + "z".repeat(64), null]) {
    const record = reviewedFixture(); record.clinicalReview.reviewedContentHash = hash;
    assert.throws(() => validateReview(record), /fingerprint/);
  }
});

test("fingerprints are deterministic across cloning and object-key order", () => {
  const record = reviewedFixture();
  assert.equal(fingerprint(record), fingerprint(clone(record)));
  const reversed = Object.fromEntries(Object.entries(record).reverse());
  reversed.coding = Object.fromEntries(Object.entries(record.coding).reverse());
  assert.equal(fingerprint(record), fingerprint(reversed));
});

test("every clinical field and meaningful source change invalidates review", () => {
  const original = reviewedFixture();
  for (const field of ["id", "name", "alternative", "category", "subcategory", "description", "clinical", "dermoscopy", "differential", "treatment", "followup"]) {
    const record = clone(original); record[field] += " changed";
    assert.notEqual(fingerprint(record), fingerprint(original), field);
    assert.throws(() => validateReview(record), /Stale clinical review/);
  }
  for (const edit of [
    record => { record.coding.diagnoses[0].code = "L00"; },
    record => { record.references[0].doi = "10.1234/changed"; },
    record => { record.references[0].version = "changed"; },
    record => { record.references[0].url = "https://example.org/changed"; },
    record => { record.references.pop(); },
    record => { record.redFlags = ["New clinical field"]; },
    record => { record.clinicalProfile.presentation.morphology.text += " changed"; }
  ]) {
    const record = clone(original); edit(record);
    assert.notEqual(fingerprint(record), fingerprint(original));
    assert.throws(() => validateReview(record), /Stale clinical review/);
  }
});

test("review metadata and source-check dates do not change fingerprints", () => {
  const record = reviewedFixture(); const before = fingerprint(record);
  record.clinicalReview.reviewedAt = "2026-01-16";
  record.clinicalReview.reviewerSpecialty = "internal medicine";
  record.references[0].metadataCheckedAt = "2026-01-16";
  assert.equal(fingerprint(record), before);
  assert.doesNotThrow(() => validateReview(record));
  record.reviewStatus = "clinician review required"; record.clinicalReview = null;
  assert.equal(fingerprint(record), before);
});

test("stale validation never refreshes hashes; resetting changed content is valid", () => {
  const record = reviewedFixture(); const stored = record.clinicalReview.reviewedContentHash;
  record.treatment += " Changed.";
  assert.throws(() => validateReview(record), /Stale clinical review/);
  assert.equal(record.clinicalReview.reviewedContentHash, stored);
  record.reviewStatus = "clinician review required"; record.clinicalReview = null;
  assert.doesNotThrow(() => validateReview(record));
});

test("maintainer utility is read-only and reports a real unreviewed record", () => {
  const filename = path.join(root, "data.js"); const before = fs.readFileSync(filename);
  const output = execFileSync(process.execPath, [path.join(root, "scripts/clinical-review.js"), "Acne Vulgaris"], { encoding: "utf8" });
  assert.match(output, /clinician review required/);
  assert.ok(output.includes(fingerprint(data.diseases.find(record => record.id === "acne-vulgaris"))));
  assert.match(output, /Only a human physician/);
  assert.deepEqual(fs.readFileSync(filename), before);
  assert.throws(() => execFileSync(process.execPath, [path.join(root, "scripts/clinical-review.js"), "Unknown"], { stdio: "pipe" }));
});

test("governance documentation explains human review and stale review handling", () => {
  for (const filename of ["README.md", "CONTRIBUTING.md", "CLINICAL_REVIEW.md", "ROADMAP.md"]) {
    const text = fs.readFileSync(path.join(root, filename), "utf8");
    assert.match(text, /clinicalReview|clinical review governance/i);
  }
  const procedure = fs.readFileSync(path.join(root, "CLINICAL_REVIEW.md"), "utf8");
  for (const phrase of ["reviewedContentHash", "physician", "metadataCheckedAt", "--validate", "re-review"]) assert.ok(procedure.includes(phrase));
});
