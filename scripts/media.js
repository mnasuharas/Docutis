"use strict";

const { createHash } = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const allowedTypes = new Set(["clinical-photo", "dermoscopy", "histopathology", "diagram", "illustration", "procedure"]);
const allowedLicenses = new Set(["CC BY 4.0", "CC BY-SA 4.0", "CC0 1.0", "Public domain", "Project-owned"]);
const reviewStatuses = new Set(["clinician review required", "clinician reviewed"]);

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map(key => [key, canonicalize(value[key])]));
  }
  return value;
}

function validIsoDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}

function mediaClinicalContent(item) {
  const { reviewStatus, clinicalReview, metadataCheckedAt, ...content } = item;
  return content;
}

function mediaFingerprint(item) {
  const serialized = JSON.stringify(canonicalize(mediaClinicalContent(item)));
  return `sha256-v1:${createHash("sha256").update(serialized, "utf8").digest("hex")}`;
}

function loadScript(fileName) {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", fileName), "utf8"), context);
  return context.window;
}

function loadMediaData() {
  return loadScript("media-data.js").DOCUTIS_MEDIA;
}

function loadDiseaseData() {
  return loadScript("data.js").DOCUTIS_DATA;
}

function validateReview(item) {
  if (!reviewStatuses.has(item.reviewStatus)) throw new Error(`${item.id}: unsupported media review status`);
  if (item.reviewStatus === "clinician review required") {
    if (item.clinicalReview !== null) throw new Error(`${item.id}: review-required media must have clinicalReview: null`);
    return;
  }
  const review = item.clinicalReview;
  if (!review || typeof review !== "object" || Array.isArray(review)) throw new Error(`${item.id}: reviewed media needs clinical review metadata`);
  if (!validIsoDate(review.reviewedAt)) throw new Error(`${item.id}: invalid media review date`);
  if (review.reviewerRole !== "physician") throw new Error(`${item.id}: media reviewer role must be physician`);
  if (typeof review.reviewerSpecialty !== "string" || !review.reviewerSpecialty.trim()) throw new Error(`${item.id}: media reviewer specialty is required`);
  if (review.reviewedContentHash !== mediaFingerprint(item)) throw new Error(`${item.id}: stale media review fingerprint`);
}

function validateMediaData(mediaData = loadMediaData(), diseaseData = loadDiseaseData()) {
  if (!mediaData || mediaData.schemaVersion !== 1 || !Array.isArray(mediaData.items)) throw new Error("Educational media must use schemaVersion 1 with an items array");
  const diseaseIds = new Set(diseaseData.diseases.map(item => item.id));
  const ids = new Set();
  for (const item of mediaData.items) {
    if (!item.id?.trim() || ids.has(item.id)) throw new Error("Media IDs must be present and unique");
    ids.add(item.id);
    if (!diseaseIds.has(item.diseaseId)) throw new Error(`${item.id}: diseaseId must resolve to an existing condition`);
    if (!allowedTypes.has(item.type)) throw new Error(`${item.id}: unsupported media type`);
    if (item.patientIdentifiable !== false) throw new Error(`${item.id}: patientIdentifiable must be explicitly false`);
    for (const field of ["src", "title", "caption", "alt", "diagnosis", "educationalDescription", "source", "license", "attribution", "sourceUrl", "metadataCheckedAt"]) {
      if (typeof item[field] !== "string" || !item[field].trim()) throw new Error(`${item.id}: ${field} is required`);
    }
    if (typeof item.consentBasis !== "string" || !item.consentBasis.trim()) throw new Error(`${item.id}: consentBasis is required`);
    if (item.alt.trim().length < 20) throw new Error(`${item.id}: alt must meaningfully describe the educational image`);
    if (item.anatomicalSite !== null && item.anatomicalSite !== undefined && (typeof item.anatomicalSite !== "string" || !item.anatomicalSite.trim())) {
      throw new Error(`${item.id}: anatomicalSite must be a non-empty string or null`);
    }
    if (!allowedLicenses.has(item.license)) throw new Error(`${item.id}: license must use a controlled, reusable-rights value`);
    if (!/^https:\/\//.test(item.sourceUrl)) throw new Error(`${item.id}: sourceUrl must use HTTPS`);
    const externalSource = /^https:\/\//.test(item.src);
    const safeLocalSource = /^(?:assets\/media\/)[a-z0-9/_-]+\.(?:avif|webp|png|jpe?g|svg)$/i.test(item.src);
    if (!externalSource && !safeLocalSource) throw new Error(`${item.id}: src must be HTTPS or a safe assets/media path`);
    if (externalSource && item.license === "Project-owned") throw new Error(`${item.id}: an external image cannot use the Project-owned license`);
    if (!item.dimensions || !Number.isInteger(item.dimensions.width) || !Number.isInteger(item.dimensions.height) || item.dimensions.width <= 0 || item.dimensions.height <= 0) {
      throw new Error(`${item.id}: positive intrinsic image dimensions are required`);
    }
    if (!validIsoDate(item.metadataCheckedAt)) throw new Error(`${item.id}: invalid source metadata check date`);
    validateReview(item);
  }
  return true;
}

function main() {
  const mediaData = loadMediaData();
  validateMediaData(mediaData);
  console.log(`Validated educational media framework with ${mediaData.items.length} media items. This check validates structure and governance, not clinical interpretation.`);
}

module.exports = { allowedTypes, allowedLicenses, mediaClinicalContent, mediaFingerprint, validateMediaData, loadMediaData, loadDiseaseData, main };

if (require.main === module) {
  try { main(); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
