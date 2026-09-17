"use strict";

const { createHash } = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const statuses = Object.freeze(["clinician review required", "clinician reviewed"]);

// Sort object keys recursively; preserve array order and exact text.
function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map(key => [key, canonicalize(value[key])]));
  }
  return value;
}

function clinicalContent(record) {
  const { reviewStatus, clinicalReview, ...content } = record;
  // A metadata recheck date is not a change to the referenced evidence.
  content.references = record.references.map(({ metadataCheckedAt, ...reference }) => reference);
  return content;
}

function fingerprint(record) {
  const serialized = JSON.stringify(canonicalize(clinicalContent(record)));
  return `sha256-v1:${createHash("sha256").update(serialized, "utf8").digest("hex")}`;
}

function validateReviewState(record, currentFingerprint) {
  const fail = message => { throw new Error(`${record.id}: ${message}`); };
  if (!statuses.includes(record.reviewStatus)) fail("Unknown clinical review status");
  if (record.reviewStatus === statuses[0]) {
    if (record.clinicalReview !== null) fail("Review-required records must have clinicalReview: null");
    return;
  }
  const review = record.clinicalReview;
  if (!review || typeof review !== "object" || Array.isArray(review)) fail("Clinical review metadata is required");
  const fields = ["reviewedAt", "reviewerRole", "reviewerSpecialty", "reviewedContentHash"];
  if (Object.keys(review).some(key => !fields.includes(key))) fail("Unsupported clinical review metadata field");
  const date = review.reviewedAt;
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) fail("Invalid review date");
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== date) fail("Invalid review date");
  if (review.reviewerRole !== "physician") fail("Reviewer role must be physician");
  if (typeof review.reviewerSpecialty !== "string" || !review.reviewerSpecialty.trim()) fail("Reviewer specialty is required");
  if (typeof review.reviewedContentHash !== "string" || !/^sha256-v1:[0-9a-f]{64}$/.test(review.reviewedContentHash)) fail("Invalid review fingerprint");
  if (review.reviewedContentHash !== currentFingerprint) fail("Stale clinical review: obtain physician re-review or reset to clinician review required with clinicalReview: null");
}

function validateReview(record) {
  validateReviewState(record, fingerprint(record));
}

function sortBy(items, key) {
  return [...items].sort((left, right) => String(left[key]).localeCompare(String(right[key]), "en"));
}

function followUpClinicalContent(protocol) {
  const { reviewStatus, clinicalReview, diseaseLabel, jurisdictionLabel, ...content } = protocol;
  content.guideline = Object.fromEntries(Object.entries(protocol.guideline).filter(([key]) => key !== "sourceMetadataCheckedAt"));
  if (protocol.supplementalSources) {
    content.supplementalSources = sortBy(protocol.supplementalSources, "id").map(({ sourceMetadataCheckedAt, ...source }) => source);
  }
  content.groups = sortBy(protocol.groups, "id").map(({ label: groupLabel, ...group }) => {
    const normalizedGroup = {
      ...group,
      notes: [...group.notes].sort((left, right) => left.localeCompare(right, "en")),
      periods: sortBy(group.periods, "id").map(({ label: periodLabel, ...period }) => ({
        ...period,
        recommendations: sortBy(period.recommendations, "modality").map(recommendation => ({
          ...recommendation,
          ...(recommendation.sourceIds ? { sourceIds: [...recommendation.sourceIds].sort((left, right) => left.localeCompare(right, "en")) } : {})
        })),
        notes: [...period.notes].sort((left, right) => left.localeCompare(right, "en"))
      }))
    };
    if (group.contextSections) {
      normalizedGroup.contextSections = sortBy(group.contextSections, "id").map(section => ({
        ...section,
        sourceIds: [...section.sourceIds].sort((left, right) => left.localeCompare(right, "en"))
      }));
    }
    return normalizedGroup;
  });
  content.notes = [...protocol.notes].sort((left, right) => left.localeCompare(right, "en"));
  return content;
}

function followUpFingerprint(protocol) {
  const serialized = JSON.stringify(canonicalize(followUpClinicalContent(protocol)));
  return `sha256-v1:${createHash("sha256").update(serialized, "utf8").digest("hex")}`;
}

function validateFollowUpReview(protocol) {
  validateReviewState(protocol, followUpFingerprint(protocol));
}

function loadData() {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "data.js"), "utf8"), context);
  return context.window.DOCUTIS_DATA;
}

function loadFollowUpData() {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "followup-data.js"), "utf8"), context);
  return context.window.DOCUTIS_FOLLOW_UP_DATA;
}

function main(args) {
  const data = loadData();
  if (args.length === 1 && args[0] === "--validate") {
    data.diseases.forEach(validateReview);
    const followUpData = loadFollowUpData();
    followUpData.protocols.forEach(validateFollowUpReview);
    console.log(`Clinical review metadata and fingerprints valid for ${data.diseases.length} records and ${followUpData.protocols.length} follow-up protocols. This is not physician review.`);
    return;
  }
  if (args.length === 2 && args[0] === "--follow-up") {
    const query = args[1].toLowerCase();
    const matches = loadFollowUpData().protocols.filter(protocol => protocol.id.toLowerCase() === query || protocol.diseaseId.toLowerCase() === query);
    if (matches.length !== 1) throw new Error("Expected one exact follow-up protocol ID or disease ID");
    const protocol = matches[0];
    validateFollowUpReview(protocol);
    console.log(JSON.stringify({ id: protocol.id, diseaseId: protocol.diseaseId, reviewStatus: protocol.reviewStatus, currentContentHash: followUpFingerprint(protocol) }, null, 2));
    console.log("Read-only fingerprint calculation. Only a human physician can perform clinical review; this command changes no files or review metadata. See CLINICAL_REVIEW.md.");
    return;
  }
  if (args.length !== 1) throw new Error('Usage: node scripts/clinical-review.js "Acne Vulgaris" (or a record ID), or --validate');
  const query = args[0].toLowerCase();
  const matches = data.diseases.filter(record => record.id.toLowerCase() === query || record.name.toLowerCase() === query);
  if (matches.length !== 1) throw new Error("Expected one exact canonical name or record ID");
  const record = matches[0];
  validateReview(record);
  console.log(JSON.stringify({ id: record.id, name: record.name, reviewStatus: record.reviewStatus, currentContentHash: fingerprint(record) }, null, 2));
  console.log("Read-only fingerprint calculation. Only a human physician can perform clinical review; this command changes no files or review metadata. See CLINICAL_REVIEW.md.");
}

module.exports = {
  statuses, canonicalize, clinicalContent, fingerprint, validateReview, loadData,
  followUpClinicalContent, followUpFingerprint, validateFollowUpReview, loadFollowUpData, main
};
if (require.main === module) {
  try { main(process.argv.slice(2)); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
