"use strict";

const { createHash } = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const allowedLevels = new Set(["introductory", "intermediate", "advanced"]);
const allowedCaseTypes = new Set(["clinical", "dermoscopic", "clinical_dermoscopic", "histopathological", "combined"]);
const allowedImageTypes = new Set(["clinical", "dermoscopy", "histopathology", "other"]);
const allowedLicenses = new Set(["CC BY 4.0", "CC BY-SA 4.0", "CC0 1.0", "Public domain", "Project-owned"]);
const allowedModification = new Set(["unmodified", "cropped", "annotated", "other-described"]);
const allowedConfirm = new Set(["histopathology", "expert_diagnosis", "source_dataset_diagnosis", "clinical_diagnosis", "other"]);
const allowedVerification = new Set(["verified", "rejected"]);
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

function loadBrowserData(fileName, globalName) {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, fileName), "utf8"), context);
  return context.window[globalName];
}

function loadCaseData() { return loadBrowserData("case-data.js", "DOCUTIS_CASES"); }
function loadDiseaseData() { return loadBrowserData("data.js", "DOCUTIS_DATA"); }

function stripImageDates(image) {
  const { accessDate, metadataCheckedAt, ...rest } = image;
  return rest;
}

function caseClinicalContent(caseItem) {
  const { reviewStatus, clinicalReview, images, ...rest } = caseItem;
  return {
    ...rest,
    images: (images || []).map(stripImageDates)
  };
}

function caseFingerprint(caseItem) {
  return `sha256-v1:${createHash("sha256").update(JSON.stringify(canonicalize(caseClinicalContent(caseItem))), "utf8").digest("hex")}`;
}

function requireString(obj, field, id) {
  if (typeof obj[field] !== "string" || !obj[field].trim()) throw new Error(`${id}: ${field} is required`);
}

function validateImage(image, caseId) {
  const id = `${caseId}/${image?.id || "image"}`;
  if (!image?.id?.trim()) throw new Error(`${caseId}: image id is required`);
  if (!allowedImageTypes.has(image.type)) throw new Error(`${id}: unsupported image type`);
  requireString(image, "src", id);
  requireString(image, "alt", id);
  requireString(image, "caption", id);
  requireString(image, "source", id);
  requireString(image, "sourceUrl", id);
  requireString(image, "creator", id);
  requireString(image, "license", id);
  requireString(image, "licenseUrl", id);
  requireString(image, "attribution", id);
  requireString(image, "consentBasis", id);
  requireString(image, "modificationStatus", id);
  if (image.alt.trim().length < 20) throw new Error(`${id}: alt must meaningfully describe the image`);
  if (!allowedLicenses.has(image.license)) throw new Error(`${id}: license must use an allowed reusable-rights value`);
  if (!allowedModification.has(image.modificationStatus)) throw new Error(`${id}: unsupported modificationStatus`);
  if (!allowedVerification.has(image.sourceVerificationStatus)) throw new Error(`${id}: sourceVerificationStatus must be verified or rejected`);
  if (image.sourceVerificationStatus !== "verified") throw new Error(`${id}: production cases require verified sourceVerificationStatus`);
  if (image.patientIdentifiable !== false) throw new Error(`${id}: patientIdentifiable must be explicitly false`);
  if (typeof image.attributionRequired !== "boolean") throw new Error(`${id}: attributionRequired must be boolean`);
  if (!/^https:\/\//.test(image.sourceUrl)) throw new Error(`${id}: sourceUrl must use HTTPS`);
  if (!/^https:\/\//.test(image.licenseUrl) && image.license !== "Public domain" && image.license !== "Project-owned") {
    throw new Error(`${id}: licenseUrl must use HTTPS for Creative Commons licenses`);
  }
  if (image.license === "Public domain" && typeof image.licenseUrl !== "string") throw new Error(`${id}: licenseUrl string required even for Public domain notes`);
  if (!/^(?:assets\/media\/cases\/)[a-z0-9/_-]+\.(?:avif|webp|png|jpe?g|svg)$/i.test(image.src)) {
    throw new Error(`${id}: src must be a safe assets/media/cases path`);
  }
  const absolute = path.join(root, image.src);
  if (!fs.existsSync(absolute)) throw new Error(`${id}: local image file missing at ${image.src}`);
  if (!image.dimensions || !Number.isInteger(image.dimensions.width) || !Number.isInteger(image.dimensions.height) || image.dimensions.width <= 0 || image.dimensions.height <= 0) {
    throw new Error(`${id}: positive intrinsic image dimensions are required`);
  }
  if (!validIsoDate(image.accessDate) || !validIsoDate(image.metadataCheckedAt)) throw new Error(`${id}: accessDate and metadataCheckedAt must be ISO dates`);
  if (image.modificationStatus === "other-described" && (typeof image.modificationsNotes !== "string" || !image.modificationsNotes.trim())) {
    throw new Error(`${id}: modificationsNotes required when modificationStatus is other-described`);
  }
  if (image.license === "Project-owned") throw new Error(`${id}: external case photographs cannot use Project-owned`);
}

function validateCase(caseItem, diseaseIds) {
  if (!caseItem?.id?.trim()) throw new Error("Case id is required");
  const id = caseItem.id;
  requireString(caseItem, "slug", id);
  requireString(caseItem, "title", id);
  requireString(caseItem, "diagnosisLabel", id);
  requireString(caseItem, "diseaseId", id);
  requireString(caseItem, "category", id);
  if (!diseaseIds.has(caseItem.diseaseId)) throw new Error(`${id}: diseaseId must resolve to an existing condition`);
  if (!allowedLevels.has(caseItem.educationalLevel)) throw new Error(`${id}: unsupported educationalLevel`);
  if (!allowedCaseTypes.has(caseItem.caseType)) throw new Error(`${id}: unsupported caseType`);
  const ctx = caseItem.patientContext;
  if (!ctx || typeof ctx !== "object") throw new Error(`${id}: patientContext is required`);
  requireString(ctx, "anatomicalSite", id);
  for (const field of ["ageBand", "sex", "presentationNotes"]) {
    if (ctx[field] !== undefined && ctx[field] !== null && (typeof ctx[field] !== "string" || !ctx[field].trim())) {
      throw new Error(`${id}: patientContext.${field} must be a non-empty string when provided`);
    }
  }
  if (!Array.isArray(caseItem.images) || !caseItem.images.length) throw new Error(`${id}: at least one image is required`);
  const imageIds = new Set();
  for (const image of caseItem.images) {
    if (imageIds.has(image.id)) throw new Error(`${id}: duplicate image id ${image.id}`);
    imageIds.add(image.id);
    validateImage(image, id);
  }
  const gt = caseItem.diagnosticGroundTruth;
  if (!gt || typeof gt !== "object") throw new Error(`${id}: diagnosticGroundTruth is required`);
  requireString(gt, "confirmedDiagnosis", id);
  requireString(gt, "confirmationNotes", id);
  if (!allowedConfirm.has(gt.confirmationMethod)) throw new Error(`${id}: unsupported confirmationMethod`);
  if (gt.confirmationMethod === "histopathology" && !/histopath|histolog|biopsy-confirm|patholog/i.test(`${gt.confirmationNotes} ${gt.confirmedDiagnosis}`)) {
    // Soft educational guard: notes should mention histo when method claims it — still allow if notes explicitly reference histopathology confirmation wording
    if (!/histo/i.test(gt.confirmationNotes)) throw new Error(`${id}: histopathology confirmationMethod requires confirmationNotes that state histopathology`);
  }
  if (!Array.isArray(caseItem.observations) || caseItem.observations.length < 2) throw new Error(`${id}: at least two observations are required`);
  const obsIds = new Set();
  for (const item of caseItem.observations) {
    if (!item?.id || obsIds.has(item.id) || item.kind !== "observation" || !item.text?.trim()) throw new Error(`${id}: invalid observation`);
    obsIds.add(item.id);
  }
  if (!Array.isArray(caseItem.interpretations)) throw new Error(`${id}: interpretations array required`);
  const interpIds = new Set();
  for (const item of caseItem.interpretations) {
    if (!item?.id || interpIds.has(item.id) || item.kind !== "interpretation" || !item.text?.trim()) throw new Error(`${id}: invalid interpretation`);
    if (!Array.isArray(item.relatedObservationIds) || item.relatedObservationIds.some(ref => !obsIds.has(ref))) throw new Error(`${id}: interpretation ${item.id} has invalid relatedObservationIds`);
    interpIds.add(item.id);
  }
  if (!Array.isArray(caseItem.dermoscopicFeatures)) throw new Error(`${id}: dermoscopicFeatures array required`);
  if (!Array.isArray(caseItem.differentials) || !caseItem.differentials.length) throw new Error(`${id}: at least one differential is required`);
  for (const diff of caseItem.differentials) {
    if (!diff?.diagnosis?.trim() || !diff.teachingDistinction?.trim()) throw new Error(`${id}: differential diagnosis and teachingDistinction required`);
    if (!Array.isArray(diff.supportingFeatures) || !Array.isArray(diff.contradictingFeatures)) throw new Error(`${id}: differential feature arrays required`);
  }
  if (!Array.isArray(caseItem.teachingPoints) || caseItem.teachingPoints.length < 2) throw new Error(`${id}: at least two teaching points are required`);
  for (const point of caseItem.teachingPoints) {
    if (!point?.id?.trim() || !point.title?.trim() || !point.text?.trim()) throw new Error(`${id}: teaching point id/title/text required`);
  }
  if (caseItem.clinicalAction !== undefined && caseItem.clinicalAction !== null) {
    if (typeof caseItem.clinicalAction !== "string" || !caseItem.clinicalAction.trim()) throw new Error(`${id}: clinicalAction must be a non-empty string when provided`);
  }
  if (!Array.isArray(caseItem.annotations)) throw new Error(`${id}: annotations array required (may be empty)`);
  for (const ann of caseItem.annotations) {
    for (const key of ["x", "y", "w", "h"]) {
      if (typeof ann[key] !== "number" || ann[key] < 0 || ann[key] > 1) throw new Error(`${id}: annotation coords must be 0–1`);
    }
    if (!imageIds.has(ann.imageId)) throw new Error(`${id}: annotation imageId must resolve`);
  }
  if (!reviewStatuses.has(caseItem.reviewStatus)) throw new Error(`${id}: unsupported reviewStatus`);
  if (caseItem.reviewStatus === "clinician review required" && caseItem.clinicalReview !== null) {
    throw new Error(`${id}: review-required cases must have clinicalReview: null`);
  }
  if (caseItem.reviewStatus === "clinician reviewed") {
    throw new Error(`${id}: cases must not default to clinician reviewed; use Goal 9 human decisions`);
  }
  return true;
}

function validateCaseData(caseData = loadCaseData(), diseaseData = loadDiseaseData()) {
  if (!caseData || caseData.schemaVersion !== 1 || !Array.isArray(caseData.cases)) {
    throw new Error("Case registry must use schemaVersion 1 with a cases array");
  }
  const diseaseIds = new Set(diseaseData.diseases.map(item => item.id));
  const ids = new Set();
  const slugs = new Set();
  for (const item of caseData.cases) {
    if (ids.has(item.id)) throw new Error(`Duplicate case id: ${item.id}`);
    if (slugs.has(item.slug)) throw new Error(`Duplicate case slug: ${item.slug}`);
    ids.add(item.id);
    slugs.add(item.slug);
    validateCase(item, diseaseIds);
  }
  return true;
}

function main() {
  const caseData = loadCaseData();
  validateCaseData(caseData);
  console.log(`Validated ${caseData.cases.length} educational cases. This check validates structure and provenance, not clinical interpretation or physician review.`);
}

module.exports = {
  allowedLevels, allowedCaseTypes, allowedLicenses, allowedConfirm,
  caseClinicalContent, caseFingerprint, validateCaseData, loadCaseData, loadDiseaseData, main
};

if (require.main === module) {
  try { main(); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
