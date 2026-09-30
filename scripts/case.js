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
  const imageTypes = new Set(caseItem.images.map(image => image.type));
  const pairedViews = imageTypes.has("clinical") && imageTypes.has("dermoscopy");
  if (pairedViews) {
    if (typeof caseItem.modalityIntegration !== "string" || caseItem.modalityIntegration.trim().length < 40) {
      throw new Error(`${id}: a paired clinical and dermoscopic case needs an integration sentence grounded in the two frames`);
    }
    if (leaksRecordedDiagnosis(caseItem.modalityIntegration, caseItem)) {
      throw new Error(`${id}: integration text names the recorded diagnosis`);
    }
  } else if (caseItem.modalityIntegration != null) {
    throw new Error(`${id}: integration text is only for a case that has both a clinical image and a dermoscopic image`);
  }
  for (const image of caseItem.images) {
    for (const key of ["roi", "bbox", "polygon", "crop"]) {
      if (Object.prototype.hasOwnProperty.call(image, key) && image[key] != null) {
        throw new Error(`${id}: ${key} stays empty unless a real annotation is stored`);
      }
    }
  }
  for (const pattern of caseItem.patterns || []) {
    if (pattern && Object.prototype.hasOwnProperty.call(pattern, "localization") && pattern.localization != null) {
      throw new Error(`${id}: pattern localization stays empty unless image evidence supports it`);
    }
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

const academySpectra = new Set(["melanoma", "mimic"]);
const teachingTypes = new Set(["teaching", "reasoning", "expert-challenge"]);
const featureCertainties = new Set(["clearly_visible", "probably", "uncertain", "not_visible"]);
const featureWeights = new Set(["major", "supportive", "weak", "conflicting"]);
const numericCertainty = /\b(?:sensitivity|specificity)\b|\blikelihood ratio\b|\bpredictive value\b|\d+(?:\.\d+)?\s*%/i;

function leaksRecordedDiagnosis(value, caseItem) {
  const hay = String(value || "").toLowerCase();
  const labels = [caseItem.diagnosisLabel, caseItem.diagnosticGroundTruth && caseItem.diagnosticGroundTruth.confirmedDiagnosis];
  for (const label of labels) {
    if (typeof label === "string" && label.trim() && hay.includes(label.toLowerCase())) return true;
  }
  const diagnosis = String(caseItem.diagnosisLabel || "").toLowerCase();
  const tokens = ["melanoma", "basal cell", "squamous cell", "keratoacanthoma", "actinic keratos"];
  return tokens.some(token => diagnosis.includes(token) && hay.includes(token));
}

function teachingFieldBlob(caseItem) {
  const parts = [];
  function walk(value) {
    if (typeof value === "string") parts.push(value);
    else if (Array.isArray(value)) value.forEach(walk);
    else if (value && typeof value === "object") Object.values(value).forEach(walk);
  }
  for (const key of ["patterns", "synthesis", "evidenceWeighting", "diagnosticTrap", "mentorNote", "takeHomeRule", "managementBrief", "whyNot", "observationPrompts", "hints", "closestMimic", "teachingPoints"]) {
    walk(caseItem[key]);
  }
  return parts.join("\n");
}

function requireAcademyText(obj, field, id) {
  if (typeof obj[field] !== "string" || !obj[field].trim()) throw new Error(`${id}: ${field} is required`);
}

function validateAcademyCase(caseItem) {
  const id = caseItem.id;
  const academy = caseItem.academy;
  if (!academy || typeof academy !== "object") throw new Error(`${id}: academy block required`);
  if (!Number.isInteger(academy.level) || academy.level < 1 || academy.level > 5) throw new Error(`${id}: academy.level must be 1-5`);
  if (!academySpectra.has(academy.spectrum)) throw new Error(`${id}: academy.spectrum must be melanoma or mimic`);
  if (!Array.isArray(academy.skillIds) || !academy.skillIds.length || academy.skillIds.some(skill => typeof skill !== "string" || !skill.trim())) {
    throw new Error(`${id}: academy.skillIds required`);
  }
  if (!teachingTypes.has(academy.teachingType)) throw new Error(`${id}: academy.teachingType must be teaching, reasoning, or expert-challenge`);
  if (!Array.isArray(caseItem.patterns) || !caseItem.patterns.length) throw new Error(`${id}: patterns required`);
  for (const pattern of caseItem.patterns) {
    if (!pattern?.id?.trim() || !pattern.label?.trim() || !pattern.specificityNote?.trim()) {
      throw new Error(`${id}: pattern id, label and specificityNote required`);
    }
    if (!featureCertainties.has(pattern.certainty)) throw new Error(`${id}: pattern certainty must be clearly_visible, probably, uncertain, or not_visible`);
    if (!featureWeights.has(pattern.weight)) throw new Error(`${id}: pattern weight must be major, supportive, weak, or conflicting`);
    if (leaksRecordedDiagnosis(`${pattern.label} ${pattern.specificityNote}`, caseItem)) {
      throw new Error(`${id}: pattern text names the recorded diagnosis`);
    }
  }
  if (!Array.isArray(caseItem.observationPrompts) || caseItem.observationPrompts.length < 2) {
    throw new Error(`${id}: at least two observationPrompts are required`);
  }
  for (const prompt of caseItem.observationPrompts) {
    if (typeof prompt !== "string" || !prompt.trim()) throw new Error(`${id}: observation prompt must be text`);
    if (leaksRecordedDiagnosis(prompt, caseItem)) throw new Error(`${id}: observation prompt names the recorded diagnosis`);
  }
  if (caseItem.hints !== undefined) {
    if (!Array.isArray(caseItem.hints) || !caseItem.hints.length || caseItem.hints.length > 2) {
      throw new Error(`${id}: hints must be one or two strings when present`);
    }
    for (const hint of caseItem.hints) {
      if (typeof hint !== "string" || !hint.trim()) throw new Error(`${id}: hint must be text`);
      if (leaksRecordedDiagnosis(hint, caseItem)) throw new Error(`${id}: hint names the recorded diagnosis`);
    }
  }
  if (!caseItem.closestMimic || typeof caseItem.closestMimic !== "object" || !caseItem.closestMimic.name?.trim() || !caseItem.closestMimic.whyClosest?.trim()) {
    throw new Error(`${id}: closestMimic name and whyClosest are required`);
  }
  for (const field of ["synthesis", "evidenceWeighting", "diagnosticTrap", "mentorNote", "takeHomeRule", "managementBrief"]) {
    requireAcademyText(caseItem, field, id);
  }
  if (academy.level >= 4) {
    if (!Array.isArray(caseItem.whyNot) || caseItem.whyNot.length < 2) throw new Error(`${id}: level 4-5 cases need two why-not mimics`);
    for (const item of caseItem.whyNot) {
      if (!item?.mimic?.trim() || !item.text?.trim()) throw new Error(`${id}: whyNot mimic and text required`);
    }
  }
  if (caseItem.differentials.length < 2) throw new Error(`${id}: ranked differential needs at least two entries`);
}

function validateCurriculum(caseData) {
  const curriculum = caseData.curriculum;
  if (!curriculum) throw new Error("curriculum map is required");
  if (curriculum.schemaVersion !== 1 || !curriculum.id?.trim() || !curriculum.title?.trim()) {
    throw new Error("curriculum schemaVersion, id and title are required");
  }
  if (!Array.isArray(curriculum.levels) || curriculum.levels.length !== 5) throw new Error("curriculum needs exactly five levels");
  const levelNums = new Set();
  for (const level of curriculum.levels) {
    if (!Number.isInteger(level.level) || level.level < 1 || level.level > 5 || levelNums.has(level.level)) {
      throw new Error("curriculum levels must be unique integers 1-5");
    }
    levelNums.add(level.level);
    if (!level.key?.trim() || !level.title?.trim() || !level.aim?.trim()) throw new Error(`level ${level.level} needs key, title and aim`);
  }
  if (!Array.isArray(curriculum.skills) || !curriculum.skills.length) throw new Error("skills taxonomy is required");
  const skillIds = new Set();
  for (const skill of curriculum.skills) {
    if (!skill?.id?.trim() || skillIds.has(skill.id) || !skill.title?.trim() || !skill.summary?.trim()) throw new Error("invalid skill");
    skillIds.add(skill.id);
  }
  if (!Array.isArray(curriculum.entries) || !curriculum.entries.length) throw new Error("curriculum entries are required");
  const caseById = new Map(caseData.cases.map(item => [item.id, item]));
  const seen = new Set();
  const orders = new Set();
  for (const entry of curriculum.entries) {
    const caseItem = caseById.get(entry.caseId);
    if (!caseItem) throw new Error(`curriculum entry does not resolve: ${entry.caseId}`);
    if (seen.has(entry.caseId) || !Number.isInteger(entry.order) || orders.has(entry.order)) {
      throw new Error(`curriculum identity or order is duplicated for ${entry.caseId}`);
    }
    seen.add(entry.caseId);
    orders.add(entry.order);
    if (!levelNums.has(entry.level) || !academySpectra.has(entry.spectrum)) throw new Error(`curriculum entry invalid: ${entry.caseId}`);
    if (!teachingTypes.has(entry.teachingType)) throw new Error(`curriculum teachingType invalid: ${entry.caseId}`);
    if (!Array.isArray(entry.skillIds) || !entry.skillIds.length || entry.skillIds.some(id => !skillIds.has(id))) {
      throw new Error(`curriculum skills invalid: ${entry.caseId}`);
    }
    if (caseItem.academy) {
      if (caseItem.academy.level !== entry.level || caseItem.academy.spectrum !== entry.spectrum || caseItem.academy.teachingType !== entry.teachingType) {
        throw new Error(`${entry.caseId}: academy block must match the curriculum entry`);
      }
      if (JSON.stringify(caseItem.academy.skillIds) !== JSON.stringify(entry.skillIds)) {
        throw new Error(`${entry.caseId}: academy.skillIds must match the curriculum entry`);
      }
    }
  }
  for (const item of caseData.cases) {
    if (!item.academy) continue;
    if (!seen.has(item.id)) throw new Error(`${item.id}: academy case is missing from the curriculum map`);
    validateAcademyCase(item);
  }
}


function primaryPathGate(caseData = loadCaseData()) {
  const curriculum = caseData.curriculum;
  if (!curriculum || curriculum.qualityGate?.kind !== "qualitative") {
    throw new Error("curriculum qualityGate must stay qualitative");
  }
  const skillIds = new Set(curriculum.skills.map(skill => skill.id));
  const seenSkills = new Set();
  const covered = new Map(curriculum.skills.map(skill => [skill.id, []]));
  const failed = [];
  for (const entry of curriculum.entries) {
    const caseItem = caseData.cases.find(item => item.id === entry.caseId);
    const issues = [];
    if (!caseItem) issues.push("missing case");
    else {
      if (!caseItem.images?.length) issues.push("image");
      if (!Array.isArray(caseItem.observations) || caseItem.observations.length < 2) issues.push("observations");
      if (!Array.isArray(caseItem.differentials) || !caseItem.differentials.length) issues.push("differential");
      if (!entry.skillIds?.length || entry.skillIds.some(id => !skillIds.has(id))) issues.push("skill");
      const signature = JSON.stringify(entry.skillIds);
      if (seenSkills.has(signature)) issues.push("skill assignment is not distinct");
      seenSkills.add(signature);
      entry.skillIds.forEach(id => covered.get(id).push(entry.caseId));
      if (!teachingTypes.has(entry.teachingType)) issues.push("teaching type");
      if (caseItem.reviewStatus !== "clinician review required" || caseItem.clinicalReview !== null) issues.push("review status is not honest");
      if (numericCertainty.test(teachingFieldBlob(caseItem))) issues.push("numeric certainty");
      if (caseItem.academy) {
        if (caseItem.differentials.length < 2) issues.push("differential depth");
        if (!caseItem.observationPrompts || caseItem.observationPrompts.length < 2) issues.push("observation prompts");
        if (!caseItem.patterns?.every(pattern => featureCertainties.has(pattern.certainty) && featureWeights.has(pattern.weight))) issues.push("feature weight");
        if (!caseItem.closestMimic?.name) issues.push("closest mimic");
        const reasoning = entry.teachingType === "reasoning" || entry.teachingType === "expert-challenge";
        if (reasoning && (!caseItem.diagnosticTrap?.trim() || !caseItem.evidenceWeighting?.trim())) issues.push("non-trivial reasoning");
        if (entry.teachingType === "teaching" && !caseItem.takeHomeRule?.trim()) issues.push("take-home rule");
        if (!/review required/i.test(caseItem.managementBrief || "")) issues.push("management review label");
      } else if (!caseItem.teachingPoints || caseItem.teachingPoints.length < 2) {
        issues.push("legacy teaching points");
      }
    }
    if (issues.length) failed.push({ caseId: entry.caseId, issues });
  }
  const gaps = [...covered.entries()].filter(([, ids]) => !ids.length).map(([id]) => id);
  return { passed: failed.length === 0 && gaps.length === 0, failed, gaps };
}

function validateTeachingDiagnoses(caseData) {
  if (!Array.isArray(caseData.teachingDiagnoses)) throw new Error("teachingDiagnoses array is required");
  const ids = new Set();
  for (const item of caseData.teachingDiagnoses) {
    if (!item?.id?.trim() || ids.has(item.id)) throw new Error(`invalid teaching diagnosis: ${item?.id}`);
    ids.add(item.id);
    if (item.pole !== "benign") throw new Error(`${item.id}: teaching diagnoses in this layer are benign linkage records`);
    if (item.monograph !== false) throw new Error(`${item.id}: teaching diagnosis must not pretend to be a condition monograph`);
    if (item.reviewStatus !== "clinician review required" || item.clinicalReview !== null) {
      throw new Error(`${item.id}: teaching diagnosis must stay review required`);
    }
    if (!item.name?.trim() || !item.limitation?.trim()) throw new Error(`${item.id}: name and limitation are required`);
  }
  return ids;
}

function validateContrastiveLayer(caseData) {
  const caseIds = new Set(caseData.cases.map(item => item.id));
  validateTeachingDiagnoses(caseData);
  const screening = caseData.screening;
  if (!screening || screening.schemaVersion !== 1 || !Array.isArray(screening.categories) || !screening.categories.length) {
    throw new Error("screening vocabulary is required and is not a session");
  }
  const screeningIds = new Set();
  for (const category of screening.categories) {
    if (!category?.id?.trim() || screeningIds.has(category.id) || !category.label?.trim()) throw new Error("invalid screening category");
    screeningIds.add(category.id);
  }
  if (!screeningIds.has("routine-benign-impression")) throw new Error("routine-benign-impression category must exist and must not be auto-filled");
  if (!Array.isArray(caseData.comparisons)) throw new Error("comparisons array is required");
  const comparisons = new Map();
  for (const item of caseData.comparisons) {
    if (!item?.id?.trim() || comparisons.has(item.id)) throw new Error(`invalid comparison: ${item?.id}`);
    comparisons.set(item.id, item);
    if (!caseIds.has(item.caseIdA) || !caseIds.has(item.caseIdB) || item.caseIdA === item.caseIdB) {
      throw new Error(`${item.id}: comparison cases must be two different real cases`);
    }
    for (const field of ["sharedFeatures", "favouringA", "favouringB"]) {
      if (!Array.isArray(item[field]) || !item[field].length || item[field].some(value => typeof value !== "string" || !value.trim())) {
        throw new Error(`${item.id}: ${field} must be non-empty`);
      }
    }
    if (item.discriminator !== null && (typeof item.discriminator !== "string" || !item.discriminator.trim())) {
      throw new Error(`${item.id}: discriminator must be a sentence or null`);
    }
    if (typeof item.commonTrap !== "string" || !item.commonTrap.trim() || typeof item.limits !== "string" || !item.limits.trim()) {
      throw new Error(`${item.id}: trap and limits are required`);
    }
    if (numericCertainty.test(JSON.stringify(item))) throw new Error(`${item.id}: numeric certainty is not allowed`);
  }
  const teachings = new Map(caseData.teachingDiagnoses.map(item => [item.id, item]));
  for (const caseItem of caseData.cases) {
    if (Array.isArray(caseItem.compareWith)) {
      for (const id of caseItem.compareWith) {
        const comparison = comparisons.get(id);
        if (!comparison || (comparison.caseIdA !== caseItem.id && comparison.caseIdB !== caseItem.id)) {
          throw new Error(`${caseItem.id}: compareWith does not resolve: ${id}`);
        }
      }
    }
    if (Object.prototype.hasOwnProperty.call(caseItem, "recordedScreeningDecision") && caseItem.recordedScreeningDecision !== null) {
      const decision = caseItem.recordedScreeningDecision;
      if (!decision || !screeningIds.has(decision.categoryId) || typeof decision.sourceSupport !== "string" || decision.sourceSupport.trim().length < 40) {
        throw new Error(`${caseItem.id}: a screening decision needs a real category and a source sentence`);
      }
      if (decision.sourceSupport.trim().toLowerCase() === String(caseItem.diagnosisLabel || "").trim().toLowerCase()) {
        throw new Error(`${caseItem.id}: the diagnosis label is not a screening decision`);
      }
      const teaching = teachings.get(caseItem.diseaseId);
      if (teaching && teaching.pole === "benign" && decision.categoryId === "routine-benign-impression") {
        throw new Error(`${caseItem.id}: a benign label must not be stored as a routine benign impression`);
      }
    }
  }
  const proposal = caseData.proposedProgression;
  if (!proposal || proposal.hardCodedPath !== false || proposal.status !== "proposal" || !Array.isArray(proposal.tracks)) {
    throw new Error("proposed progression must stay a proposal and must not be a hard-coded path");
  }
  for (const track of proposal.tracks) {
    if (!track?.id?.trim() || !track.title?.trim() || !Array.isArray(track.caseIds)) throw new Error("invalid proposed track");
    for (const id of track.caseIds) if (!caseIds.has(id)) throw new Error(`${track.id}: proposed case does not exist: ${id}`);
    if (!track.caseIds.length && track.id !== "screening-integration") throw new Error(`${track.id}: an empty track is only allowed for the unbuilt screening session`);
  }
  return true;
}

function validateCaseData(caseData = loadCaseData(), diseaseData = loadDiseaseData()) {
  if (!caseData || caseData.schemaVersion !== 1 || !Array.isArray(caseData.cases)) {
    throw new Error("Case registry must use schemaVersion 1 with a cases array");
  }
  const teachingIds = validateTeachingDiagnoses(caseData);
  const diseaseIds = new Set(diseaseData.diseases.map(item => item.id));
  for (const id of teachingIds) {
    if (diseaseIds.has(id)) throw new Error(`${id}: teaching diagnosis collides with a condition id`);
    diseaseIds.add(id);
  }
  const ids = new Set();
  const slugs = new Set();
  for (const item of caseData.cases) {
    if (ids.has(item.id)) throw new Error(`Duplicate case id: ${item.id}`);
    if (slugs.has(item.slug)) throw new Error(`Duplicate case slug: ${item.slug}`);
    ids.add(item.id);
    slugs.add(item.slug);
    validateCase(item, diseaseIds);
  }
  validateCurriculum(caseData);
  validateContrastiveLayer(caseData);
  const { validatePatternLibrary } = require("./pattern");
  validatePatternLibrary(undefined, caseData);
  const gate = primaryPathGate(caseData);
  if (!gate.passed) {
    const detail = gate.failed.map(item => `${item.caseId}: ${item.issues.join(", ")}`).join("; ");
    throw new Error(`primary-path quality gate failed (${detail || "skill gaps: " + gate.gaps.join(", ")})`);
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
  caseClinicalContent, caseFingerprint, validateCaseData, validateCurriculum, validateContrastiveLayer, primaryPathGate,
  teachingTypes, featureCertainties, featureWeights, leaksRecordedDiagnosis, loadCaseData, loadDiseaseData, main
};

if (require.main === module) {
  try { main(); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
