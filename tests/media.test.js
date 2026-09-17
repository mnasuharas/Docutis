const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const { allowedLicenses, allowedTypes, loadDiseaseData, loadMediaData, mediaFingerprint, validateMediaData } = require("../scripts/media");

function clone(value) { return JSON.parse(JSON.stringify(value)); }

function validItem() {
  return {
    id: "synthetic-actinic-keratosis-diagram",
    diseaseId: "actinic-keratosis",
    type: "diagram",
    src: "assets/media/synthetic-example.svg",
    dimensions: { width: 1200, height: 900 },
    caption: "Synthetic educational diagram",
    alt: "Diagram showing a synthetic example for media-rendering tests",
    anatomicalSite: null,
    diagnosis: "Actinic Keratosis",
    educationalDescription: "Synthetic fixture used only to validate the media architecture.",
    patientIdentifiable: false,
    consentBasis: "Not applicable — project-owned non-patient educational diagram",
    source: "Docutis test fixture",
    license: "Project-owned",
    attribution: "Docutis contributors",
    sourceUrl: "https://example.org/media-source",
    metadataCheckedAt: "2026-09-17",
    reviewStatus: "clinician review required",
    clinicalReview: null
  };
}

test("production media registry is valid and intentionally empty", () => {
  const media = loadMediaData();
  assert.equal(media.schemaVersion, 1);
  assert.deepEqual(Array.from(media.items), []);
  assert.doesNotThrow(() => validateMediaData(media, loadDiseaseData()));
  assert.deepEqual([...allowedTypes].sort(), ["clinical-photo", "dermoscopy", "diagram", "histopathology", "illustration", "procedure"].sort());
  assert.deepEqual([...allowedLicenses].sort(), ["CC BY 4.0", "CC BY-SA 4.0", "CC0 1.0", "Project-owned", "Public domain"].sort());
});

test("valid governed media passes with mandatory provenance and accessibility metadata", () => {
  const fixture = { schemaVersion: 1, items: [validItem()] };
  assert.doesNotThrow(() => validateMediaData(fixture, loadDiseaseData()));
});

test("media validation rejects unsafe or incomplete records", () => {
  const mutations = [
    item => { item.id = ""; },
    item => { item.diseaseId = "missing-condition"; },
    item => { item.type = "random-photo"; },
    item => { item.src = "javascript:alert(1)"; },
    item => { item.alt = ""; },
    item => { item.alt = "Too short"; },
    item => { delete item.patientIdentifiable; },
    item => { item.patientIdentifiable = true; },
    item => { item.consentBasis = ""; },
    item => { item.license = "unknown"; },
    item => { item.sourceUrl = "http://example.org"; },
    item => { item.dimensions.width = 0; },
    item => { item.metadataCheckedAt = "2026-99-99"; },
    item => { item.clinicalReview = {}; }
  ];
  for (const mutate of mutations) {
    const item = validItem(); mutate(item);
    assert.throws(() => validateMediaData({ schemaVersion: 1, items: [item] }, loadDiseaseData()));
  }
  const externalOwned = validItem(); externalOwned.src = "https://example.org/image.webp";
  assert.throws(() => validateMediaData({ schemaVersion: 1, items: [externalOwned] }, loadDiseaseData()), /external image/i);
});

test("media fingerprints include meaningful content and ignore review metadata dates", () => {
  const item = validItem();
  const original = mediaFingerprint(item);
  const dateOnly = clone(item); dateOnly.metadataCheckedAt = "2030-01-01";
  assert.equal(mediaFingerprint(dateOnly), original);
  const changedCaption = clone(item); changedCaption.caption = "Different clinical caption";
  assert.notEqual(mediaFingerprint(changedCaption), original);
  const changedLicense = clone(item); changedLicense.license = "CC BY 4.0";
  assert.notEqual(mediaFingerprint(changedLicense), original);
});

test("reviewed media requires physician metadata and a current fingerprint", () => {
  const item = validItem();
  item.reviewStatus = "clinician reviewed";
  item.clinicalReview = { reviewedAt: "2026-09-17", reviewerRole: "physician", reviewerSpecialty: "dermatology", reviewedContentHash: mediaFingerprint(item) };
  assert.doesNotThrow(() => validateMediaData({ schemaVersion: 1, items: [item] }, loadDiseaseData()));
  item.caption = "Changed after review";
  assert.throws(() => validateMediaData({ schemaVersion: 1, items: [item] }, loadDiseaseData()), /stale media review/i);
});

test("UI media contract includes lazy loading, failure fallback and secure source links", () => {
  const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
  assert.match(app, /image\.loading = "lazy"/);
  assert.match(app, /image\.decoding = "async"/);
  assert.match(app, /image\.addEventListener\("error"/);
  assert.match(app, /Educational image unavailable/);
  assert.match(app, /sourceLink\.target = "_blank"/);
  assert.match(app, /sourceLink\.rel = "noopener noreferrer"/);
});
