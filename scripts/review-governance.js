"use strict";

const { createHash } = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { canonicalize, fingerprint, followUpFingerprint, loadData, loadFollowUpData } = require("./clinical-review");
const { mediaFingerprint, loadMediaData } = require("./media");

const root = path.join(__dirname, "..");
const assetTypes = new Set(["disease", "quiz", "visual", "follow_up"]);
const verdicts = new Set(["approved", "approved_with_minor_corrections", "changes_requested", "not_reviewed", "not_applicable"]);
const publicStatuses = new Set(["clinician reviewed", "partially reviewed", "changes requested", "review required", "review invalidated", "not applicable"]);
const completeVerdicts = new Set(["approved", "approved_with_minor_corrections"]);
const attestationText = "I confirm that I am a human reviewer and that I assessed only the content versions and sections identified by the recorded fingerprints. My decisions apply only to the recorded scope. Clinically meaningful future changes may invalidate the decisions. This educational governance review does not make Docutis an individual diagnostic or treatment service and does not guarantee completeness or universal applicability.";

function loadBrowserData(fileName, globalName) {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, fileName), "utf8"), context);
  return context.window[globalName];
}

function loadQuizData() { return loadBrowserData("quiz-data.js", "DOCUTIS_QUIZ"); }
function loadReviewData() { return require(path.join(root, "review-data.js")); }

function quizClinicalContent(question) {
  const { reviewStatus, clinicalReview, ...content } = question;
  return content;
}

function quizFingerprint(question) {
  return `sha256-v1:${createHash("sha256").update(JSON.stringify(canonicalize(quizClinicalContent(question))), "utf8").digest("hex")}`;
}

function validIsoDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}

function diseaseSections(record) {
  const profile = record.clinicalProfile;
  const sections = ["overview", "clinical-presentation", "diagnostics", "dermoscopy", "differential-diagnosis", "treatment", "follow-up", "coding", "references"];
  if (profile?.histopathology) sections.push("histopathology");
  if (profile?.redFlags) sections.push("red-flags");
  if (profile?.referral) sections.push("referral");
  if (profile?.patientCounseling) sections.push("patient-safety");
  if (profile?.oncology) sections.push("oncology");
  return sections;
}

function evidenceUrlsForDisease(record) {
  return [...new Set([...(record.clinicalProfile?.sourceUrls || []), ...Object.values(record.clinicalProfile?.evidenceMap || {}).flat()])].sort();
}

function evidenceMetadataForDisease(record, urls = evidenceUrlsForDisease(record)) {
  return urls.map(url => {
    const reference = record.references.find(item => item.url === url);
    return { title: reference.title, organization: reference.organization, type: reference.type, year: reference.year || null, version: reference.version || null, doi: reference.doi || null, url, metadataCheckedAt: reference.metadataCheckedAt };
  });
}

function sourceAgeDays(checkedAt, asOf = new Date().toISOString().slice(0, 10)) {
  if (!validIsoDate(checkedAt) || !validIsoDate(asOf)) return Number.POSITIVE_INFINITY;
  return Math.floor((Date.parse(`${asOf}T00:00:00Z`) - Date.parse(`${checkedAt}T00:00:00Z`)) / 86400000);
}

function sourceMetadataWarnings(assets, asOf = new Date().toISOString().slice(0, 10), maximumAgeDays = 366) {
  return assets.flatMap(asset => (asset.evidenceMetadata || []).flatMap(source => {
    const age = sourceAgeDays(source.metadataCheckedAt, asOf);
    if (!Number.isFinite(age)) return [`${asset.assetType}:${asset.id}: missing or malformed metadata check date for ${source.url}`];
    if (age < 0) return [`${asset.assetType}:${asset.id}: future metadata check date for ${source.url}`];
    if (age > maximumAgeDays) return [`${asset.assetType}:${asset.id}: stale source metadata (${age} days) for ${source.url}`];
    return [];
  }));
}

function buildAssets() {
  const diseases = loadData().diseases.filter(record => record.clinicalProfile);
  const quiz = loadQuizData().questions;
  const visuals = loadMediaData().items;
  const followUps = loadFollowUpData().protocols;
  const diseaseMap = new Map(loadData().diseases.map(record => [record.id, record]));
  return [
    ...diseases.map(record => { const evidenceSources = evidenceUrlsForDisease(record); return {
      id: record.id, assetType: "disease", title: record.name, schemaVersion: record.clinicalProfile.schemaVersion,
      currentFingerprint: fingerprint(record), sections: diseaseSections(record), evidenceSources, evidenceMetadata: evidenceMetadataForDisease(record, evidenceSources)
    }; }),
    ...quiz.map(question => { const record = diseaseMap.get(question.diseaseId); return {
      id: question.id, assetType: "quiz", title: question.prompt, schemaVersion: 1,
      currentFingerprint: quizFingerprint(question), sections: ["prompt", "options", "best-answer", "explanation", "safety-notice", "references"], evidenceSources: [...question.sourceUrls],
      evidenceMetadata: question.sourceUrls.map(url => evidenceMetadataForDisease(record, [url])[0])
    }; }),
    ...visuals.map(item => ({
      id: item.id, assetType: "visual", title: item.title, schemaVersion: 1,
      currentFingerprint: mediaFingerprint(item), sections: ["image", "title", "caption", "alternative-text", "educational-description", "legend", "safety-notice", "provenance"], evidenceSources: [item.sourceUrl],
      evidenceMetadata: [{ title: item.source, organization: item.attribution, type: item.type, year: null, version: null, doi: null, url: item.sourceUrl, metadataCheckedAt: item.metadataCheckedAt }]
    })),
    ...followUps.map(protocol => ({
      id: protocol.id, assetType: "follow_up", title: `${protocol.diseaseLabel} — ${protocol.jurisdictionLabel}`,
      schemaVersion: 1, currentFingerprint: followUpFingerprint(protocol),
      sections: ["scope", "risk-groups", "periods", "clinical-examination", "lymph-node-ultrasound", "s100b", "cross-sectional-imaging", "context", "safety-notice", "references"],
      evidenceSources: [protocol.guideline.sourceUrl, ...(protocol.supplementalSources || []).map(source => source.sourceUrl)],
      evidenceMetadata: [
        { title: protocol.guideline.title, organization: protocol.guideline.organization, type: protocol.guideline.guidelineSystem, year: protocol.guideline.publishedAt, version: protocol.guideline.version, doi: null, url: protocol.guideline.sourceUrl, metadataCheckedAt: protocol.guideline.sourceMetadataCheckedAt },
        ...(protocol.supplementalSources || []).map(source => ({ title: source.title, organization: source.organization, type: source.sourceType, year: source.publishedAt || null, version: source.version || null, doi: source.doi || null, url: source.sourceUrl, metadataCheckedAt: source.sourceMetadataCheckedAt }))
      ]
    }))
  ];
}

function validateReviewer(reviewer) {
  const allowed = new Set(["id", "displayName", "professionalRole", "specialtyOrField", "trainingStatus", "jurisdiction", "publicDisclosure", "publicDisplayConsent"]);
  if (!reviewer || typeof reviewer !== "object" || Array.isArray(reviewer)) throw new Error("Reviewer must be an object");
  if (Object.keys(reviewer).some(key => !allowed.has(key))) throw new Error(`${reviewer.id || "reviewer"}: private or unsupported reviewer field`);
  for (const field of ["id", "displayName", "professionalRole", "specialtyOrField"]) if (!reviewer[field]?.trim()) throw new Error(`${reviewer.id || "reviewer"}: ${field} is required`);
  if (!/^(?:Physician\b|Arzt in Weiterbildung\b)/i.test(reviewer.professionalRole)) throw new Error(`${reviewer.id}: clinical approval requires an accurately described physician role`);
  if (reviewer.publicDisplayConsent !== true) throw new Error(`${reviewer.id}: public display consent must be explicit`);
  for (const field of ["trainingStatus", "jurisdiction", "publicDisclosure"]) if (reviewer[field] !== undefined && (typeof reviewer[field] !== "string" || !reviewer[field].trim())) throw new Error(`${reviewer.id}: ${field} must be a non-empty string`);
  const forbidden = /(?:email|phone|licen[cs]e|signature|address|orcid)/i;
  if (Object.keys(reviewer).some(key => forbidden.test(key))) throw new Error(`${reviewer.id}: private reviewer data is not permitted`);
}

function validateDecision(decision, assets, reviewers, attestationVersion) {
  const allowed = new Set(["id", "assetId", "assetType", "contentFingerprint", "schemaVersion", "reviewerId", "reviewerRole", "reviewDate", "reviewedSections", "evidenceSourcesChecked", "verdict", "requiredCorrections", "reviewerNotes", "attestationVersion", "attestationText", "provenance", "supersededBy"]);
  if (!decision || typeof decision !== "object" || Array.isArray(decision)) throw new Error("Decision must be an object");
  if (Object.keys(decision).some(key => !allowed.has(key))) throw new Error(`${decision.id || "decision"}: unsupported decision field`);
  const asset = assets.get(`${decision.assetType}:${decision.assetId}`);
  if (!decision.id?.trim() || !assetTypes.has(decision.assetType) || !asset) throw new Error(`${decision.id || "decision"}: asset identity must resolve`);
  if (!/^sha256-v1:[0-9a-f]{64}$/.test(decision.contentFingerprint || "")) throw new Error(`${decision.id}: invalid content fingerprint`);
  if (decision.schemaVersion !== asset.schemaVersion) throw new Error(`${decision.id}: schema version mismatch`);
  const reviewer = reviewers.get(decision.reviewerId);
  if (!reviewer) throw new Error(`${decision.id}: public reviewer identity must resolve`);
  if (decision.reviewerRole !== reviewer.professionalRole) throw new Error(`${decision.id}: reviewer role must match the approved public identity`);
  if (!validIsoDate(decision.reviewDate)) throw new Error(`${decision.id}: invalid review date`);
  if (decision.reviewDate > new Date().toISOString().slice(0, 10)) throw new Error(`${decision.id}: review date cannot be in the future`);
  if (!verdicts.has(decision.verdict)) throw new Error(`${decision.id}: unsupported verdict`);
  if (!Array.isArray(decision.reviewedSections) || decision.reviewedSections.some(section => !asset.sections.includes(section)) || new Set(decision.reviewedSections).size !== decision.reviewedSections.length) throw new Error(`${decision.id}: reviewed sections must be unique and valid for the asset`);
  if (!Array.isArray(decision.evidenceSourcesChecked) || decision.evidenceSourcesChecked.some(url => !asset.evidenceSources.includes(url))) throw new Error(`${decision.id}: checked evidence must resolve to the asset`);
  if (!Array.isArray(decision.requiredCorrections) || decision.requiredCorrections.some(value => typeof value !== "string" || !value.trim())) throw new Error(`${decision.id}: required corrections must be an array of non-empty strings`);
  if (completeVerdicts.has(decision.verdict) && !decision.reviewedSections.length) throw new Error(`${decision.id}: an approval must identify reviewed sections`);
  if (decision.verdict === "changes_requested" && !decision.requiredCorrections.length) throw new Error(`${decision.id}: changes requested requires explicit corrections`);
  if (decision.verdict === "approved" && decision.requiredCorrections.length) throw new Error(`${decision.id}: approved decisions cannot retain required corrections`);
  if (decision.attestationVersion !== attestationVersion || decision.attestationText !== attestationText) throw new Error(`${decision.id}: exact attestation version and text are required`);
  if (decision.provenance !== "human-submitted") throw new Error(`${decision.id}: automated approval provenance is forbidden`);
  if (decision.supersededBy !== null && (typeof decision.supersededBy !== "string" || !decision.supersededBy.trim())) throw new Error(`${decision.id}: supersededBy must be null or a decision ID`);
  if (decision.reviewerNotes !== undefined && (typeof decision.reviewerNotes !== "string" || !decision.reviewerNotes.trim())) throw new Error(`${decision.id}: public reviewer notes must be non-empty`);
}

function deriveAssetStatus(asset, decisions) {
  const history = decisions.filter(decision => decision.assetType === asset.assetType && decision.assetId === asset.id);
  const current = history.filter(decision => decision.contentFingerprint === asset.currentFingerprint && !decision.supersededBy);
  const stale = history.some(decision => decision.contentFingerprint !== asset.currentFingerprint && !decision.supersededBy && completeVerdicts.has(decision.verdict));
  const latest = [...current].sort((a, b) => b.reviewDate.localeCompare(a.reviewDate) || b.id.localeCompare(a.id))[0];
  if (!latest) return { status: stale ? "review invalidated" : "review required", activeDecisionId: null, history, awaitingSections: asset.sections };
  if (latest.verdict === "changes_requested") return { status: "changes requested", activeDecisionId: latest.id, history, awaitingSections: asset.sections };
  if (latest.verdict === "not_applicable") return { status: "not applicable", activeDecisionId: latest.id, history, awaitingSections: [] };
  if (latest.verdict === "not_reviewed") return { status: stale ? "review invalidated" : "review required", activeDecisionId: latest.id, history, awaitingSections: asset.sections };
  const awaitingSections = asset.sections.filter(section => !latest.reviewedSections.includes(section));
  return { status: awaitingSections.length ? "partially reviewed" : "clinician reviewed", activeDecisionId: latest.id, history, awaitingSections };
}

function buildPublicStatus(reviewData = loadReviewData()) {
  if (!reviewData || reviewData.schemaVersion !== 1 || reviewData.attestationVersion !== "docutis-human-clinical-review-v1") throw new Error("Unsupported review-data schema or attestation version");
  const assets = buildAssets();
  const assetMap = new Map(assets.map(asset => [`${asset.assetType}:${asset.id}`, asset]));
  const reviewerIds = new Set();
  for (const reviewer of reviewData.reviewers) { validateReviewer(reviewer); if (reviewerIds.has(reviewer.id)) throw new Error(`Duplicate reviewer ID: ${reviewer.id}`); reviewerIds.add(reviewer.id); }
  const reviewers = new Map(reviewData.reviewers.map(reviewer => [reviewer.id, reviewer]));
  const decisionIds = new Set();
  for (const decision of reviewData.decisions) { validateDecision(decision, assetMap, reviewers, reviewData.attestationVersion); if (decisionIds.has(decision.id)) throw new Error(`Duplicate decision ID: ${decision.id}`); decisionIds.add(decision.id); }
  for (const decision of reviewData.decisions) if (decision.supersededBy !== null && !decisionIds.has(decision.supersededBy)) throw new Error(`${decision.id}: superseding decision does not exist`);
  for (const decision of reviewData.decisions) {
    if (decision.supersededBy === decision.id) throw new Error(`${decision.id}: a decision cannot supersede itself`);
    if (decision.supersededBy) {
      const successor = reviewData.decisions.find(item => item.id === decision.supersededBy);
      if (successor.assetType !== decision.assetType || successor.assetId !== decision.assetId) throw new Error(`${decision.id}: a superseding decision must concern the same asset`);
    }
  }
  const publicAssets = assets.map(asset => ({ ...asset, ...deriveAssetStatus(asset, reviewData.decisions) }));
  const latestReviewDate = reviewData.decisions.filter(decision => completeVerdicts.has(decision.verdict) && decision.contentFingerprint === assetMap.get(`${decision.assetType}:${decision.assetId}`)?.currentFingerprint).map(decision => decision.reviewDate).sort().at(-1) || null;
  return { schemaVersion: 1, generatedFrom: "review-data.js", attestationVersion: reviewData.attestationVersion, latestValidHumanReviewDate: latestReviewDate, reviewers: reviewData.reviewers, decisions: reviewData.decisions, assets: publicAssets };
}

function validatePublicStatus(status) {
  if (!status || status.schemaVersion !== 1 || !Array.isArray(status.assets)) throw new Error("Public review status must use schemaVersion 1");
  if (status.assets.some(asset => !publicStatuses.has(asset.status))) throw new Error("Public review status contains an unsupported state");
  return true;
}

function renderBrowserScript(status) {
  return `/* Generated by scripts/review-governance.js. Do not edit by hand. */\nwindow.DOCUTIS_REVIEW_STATUS = Object.freeze(${JSON.stringify(status, null, 2)});\n`;
}

function writePublicStatus(status) {
  fs.writeFileSync(path.join(root, "review-status.json"), `${JSON.stringify(status, null, 2)}\n`);
  fs.writeFileSync(path.join(root, "review-status.js"), renderBrowserScript(status));
}

function main(args = process.argv.slice(2)) {
  const status = buildPublicStatus();
  validatePublicStatus(status);
  if (args.includes("--write")) writePublicStatus(status);
  const counts = Object.fromEntries([...publicStatuses].map(value => [value, status.assets.filter(asset => asset.status === value).length]));
  console.log(JSON.stringify({ assets: status.assets.length, reviewers: status.reviewers.length, decisions: status.decisions.length, latestValidHumanReviewDate: status.latestValidHumanReviewDate, counts }, null, 2));
  console.log("Automated validation cannot create or imply human clinical review.");
}

module.exports = { assetTypes, verdicts, publicStatuses, completeVerdicts, attestationText, quizClinicalContent, quizFingerprint, buildAssets, validateReviewer, validateDecision, deriveAssetStatus, buildPublicStatus, validatePublicStatus, sourceAgeDays, sourceMetadataWarnings, renderBrowserScript, writePublicStatus, main };
if (require.main === module) {
  try { main(); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
