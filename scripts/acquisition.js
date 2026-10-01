"use strict";

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { loadCaseData, caseFingerprint } = require("./case");

const root = path.join(__dirname, "..");
const statuses = new Set([
  "accepted",
  "candidate",
  "temporarily_unavailable",
  "rejected_license",
  "rejected_provenance",
  "rejected_image_quality",
  "rejected_not_true_pair",
  "rejected_teaching_value"
]);
const allowedAcceptedLicenses = new Set(["CC BY 4.0", "CC BY-SA 4.0", "CC0 1.0", "Public domain"]);
const pairValues = new Set(["source_documented_pair", "same_lesion_confirmed", "not_a_pair", "unknown"]);

function loadLedger() {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, "acquisition-ledger.js"), "utf8"), context, { filename: "acquisition-ledger.js" });
  return context.window.DOCUTIS_ACQUISITION_LEDGER;
}

function requireText(row, field, min) {
  if (typeof row[field] !== "string" || row[field].trim().length < min) {
    throw new Error(`${row.id || "candidate"}: ${field} is required`);
  }
}

function validateLedger(ledger = loadLedger(), caseData = loadCaseData()) {
  if (!ledger || ledger.schemaVersion !== 1 || !Array.isArray(ledger.candidates) || !ledger.candidates.length) {
    throw new Error("acquisition ledger schemaVersion 1 and candidates are required");
  }
  const cases = new Map(caseData.cases.map(item => [item.id, item]));
  const provenance = new Map((caseData.pairProvenance || []).map(row => [row.caseId, row]));
  const seen = new Set();
  const counts = {};
  for (const row of ledger.candidates) {
    if (!row || !row.id || seen.has(row.id)) throw new Error(`invalid acquisition candidate: ${row && row.id}`);
    seen.add(row.id);
    if (!statuses.has(row.status)) throw new Error(`${row.id}: unsupported acquisition status`);
    counts[row.status] = (counts[row.status] || 0) + 1;
    requireText(row, "sourceLabel", 8);
    requireText(row, "sourceUrl", 12);
    requireText(row, "author", 3);
    requireText(row, "license", 4);
    requireText(row, "modality", 4);
    requireText(row, "site", 3);
    requireText(row, "verificationStrength", 4);
    requireText(row, "reason", 20);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(row.dateChecked || "")) throw new Error(`${row.id}: dateChecked must be an ISO date`);
    if (!/^https:\/\//.test(row.sourceUrl)) throw new Error(`${row.id}: sourceUrl must use HTTPS`);
    if (row.partnerUrl != null && !/^https:\/\//.test(row.partnerUrl)) throw new Error(`${row.id}: partnerUrl must use HTTPS`);
    if (!pairValues.has(row.pairedStatus)) throw new Error(`${row.id}: unsupported pairedStatus`);
    if (typeof row.integrated !== "boolean") throw new Error(`${row.id}: integrated must be boolean`);
    if (row.status === "accepted") {
      if (row.integrated !== true || !cases.has(row.caseId)) throw new Error(`${row.id}: an accepted candidate must point at a real case`);
      if (!allowedAcceptedLicenses.has(row.license)) throw new Error(`${row.id}: accepted license must name an allowed version`);
      if (!/4\.0|1\.0|publicdomain|public-domain/i.test(`${row.license}`)) {
        throw new Error(`${row.id}: accepted license must be an explicit version`);
      }
      const caseItem = cases.get(row.caseId);
      const urls = new Set(caseItem.images.map(image => image.sourceUrl));
      if (!urls.has(row.sourceUrl)) throw new Error(`${row.id}: accepted source URL is not on the case`);
      if (row.partnerUrl && !urls.has(row.partnerUrl)) throw new Error(`${row.id}: accepted partner URL is not on the case`);
      for (const image of caseItem.images) {
        if (image.license !== row.license) throw new Error(`${row.id}: case image license does not match the ledger`);
        if (!/^https:\/\/creativecommons.org\/licenses\/(?:by|by-sa)\/4\.0\/$/.test(image.licenseUrl) && image.license !== "CC0 1.0" && image.license !== "Public domain") {
          throw new Error(`${row.id}: license URL must name the explicit deed`);
        }
      }
      const pair = provenance.get(row.caseId);
      if (!pair) throw new Error(`${row.id}: case has no pair provenance`);
      if (row.pairedStatus === "source_documented_pair" || row.pairedStatus === "same_lesion_confirmed") {
        if (pair.provenance !== row.pairedStatus) throw new Error(`${row.id}: pair provenance does not match the ledger`);
        const clinical = caseItem.images.filter(image => image.type === "clinical");
        const dermoscopy = caseItem.images.filter(image => image.type === "dermoscopy");
        if (clinical.length !== 1 || dermoscopy.length !== 1) throw new Error(`${row.id}: a true pair needs one clinical and one dermoscopic asset`);
        if (clinical[0].src === dermoscopy[0].src) throw new Error(`${row.id}: paired assets must be distinct files`);
      }
      if (caseItem.reviewStatus !== "clinician review required" || caseItem.clinicalReview !== null) {
        throw new Error(`${row.id}: accepted teaching stays review required`);
      }
    } else {
      if (row.integrated !== false || row.caseId !== null) throw new Error(`${row.id}: a rejected or pending candidate must not be integrated`);
      if (cases.has(row.id)) throw new Error(`${row.id}: a rejected candidate id collided with a case`);
      const curriculumIds = new Set((caseData.curriculum.entries || []).map(entry => entry.caseId));
      if (curriculumIds.has(row.id)) throw new Error(`${row.id}: a rejected candidate is in the curriculum`);
    }
  }
  const caseBlob = JSON.stringify(caseData.cases);
  for (const row of ledger.candidates) {
    if (row.status === "accepted") continue;
    if (row.status === "rejected_license" && caseBlob.includes(row.sourceUrl)) {
      throw new Error(`${row.id}: a license rejection is still used as a case source`);
    }
  }
  return { counts, candidates: ledger.candidates.length };
}

function main() {
  const report = validateLedger();
  const lines = ["Acquisition ledger. Not clinical content. Not clinician review."];
  for (const [status, count] of Object.entries(report.counts).sort()) lines.push(`- ${status}: ${count}`);
  lines.push(`- candidates: ${report.candidates}`);
  console.log(lines.join("\n"));
}

if (require.main === module) {
  try { main(); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}

module.exports = { statuses, loadLedger, validateLedger, caseFingerprint, main };
