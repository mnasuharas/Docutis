"use strict";

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const schema = require("../clinical-schema");

const root = path.join(__dirname, "..");
const profileKeys = new Set(["schemaVersion", "aliases", "epidemiology", "etiology", "presentation", "dermoscopy", "diagnostics", "histopathology", "differentials", "treatment", "followUp", "redFlags", "referral", "patientCounseling", "specialPopulations", "oncology", "sourceUrls"]);
const medicationKeys = new Set(["name", "route", "formulation", "dose", "frequency", "duration", "maximumDuration", "taper", "contraindications", "precautions", "monitoring", "pregnancy", "sourceUrls"]);

function loadData() {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, "data.js"), "utf8"), context);
  return context.window.DOCUTIS_DATA;
}

function fail(record, message) {
  throw new Error(`${record.id}: ${message}`);
}

function nonEmptyString(value) {
  return typeof value === "string" && Boolean(value.trim());
}

function validateStringArray(record, values, label, allowed = null) {
  if (!Array.isArray(values) || !values.length) fail(record, `${label} must be a non-empty array when present`);
  const normalized = new Set();
  for (const value of values) {
    if (!nonEmptyString(value)) fail(record, `${label} contains an empty value`);
    if (allowed && !allowed.includes(value)) fail(record, `${label} contains unsupported value ${value}`);
    const key = value.trim().toLocaleLowerCase("en");
    if (normalized.has(key)) fail(record, `${label} contains duplicate value ${value}`);
    normalized.add(key);
  }
}

function validateSourceUrls(record, urls, label) {
  validateStringArray(record, urls, label);
  const sources = new Set(record.references.map(reference => reference.url));
  for (const url of urls) if (!sources.has(url)) fail(record, `${label} references a source not attached to the record: ${url}`);
}

function validateMorphology(record, morphology) {
  if (!morphology || typeof morphology !== "object" || Array.isArray(morphology)) fail(record, "presentation.morphology must be an object");
  const keys = ["primaryLesions", "otherPrimaryLesions", "secondaryChanges", "colors", "surface", "border", "configuration", "typicalSize", "text"];
  if (Object.keys(morphology).some(key => !keys.includes(key))) fail(record, "presentation.morphology has an unsupported field");
  if (morphology.primaryLesions) validateStringArray(record, morphology.primaryLesions, "primaryLesions", schema.vocabularies.primaryLesions);
  if (morphology.otherPrimaryLesions) validateStringArray(record, morphology.otherPrimaryLesions, "otherPrimaryLesions");
  if (morphology.secondaryChanges) validateStringArray(record, morphology.secondaryChanges, "secondaryChanges", schema.vocabularies.secondaryChanges);
  for (const key of ["colors", "surface", "border", "configuration"]) if (morphology[key]) validateStringArray(record, morphology[key], key);
  for (const key of ["typicalSize", "text"]) if (key in morphology && !nonEmptyString(morphology[key])) fail(record, `morphology.${key} must be non-empty`);
  if (!Object.keys(morphology).length) fail(record, "presentation.morphology cannot be empty");
}

function validatePresentation(record, presentation) {
  if (!presentation || typeof presentation !== "object" || Array.isArray(presentation)) fail(record, "presentation must be an object");
  const keys = ["morphology", "localization", "symptoms", "course"];
  if (Object.keys(presentation).some(key => !keys.includes(key))) fail(record, "presentation has an unsupported field");
  validateMorphology(record, presentation.morphology);
  if (presentation.localization) {
    const value = presentation.localization;
    if (!value || typeof value !== "object" || Array.isArray(value)) fail(record, "localization must be an object");
    if (value.sites) validateStringArray(record, value.sites, "localization.sites", schema.vocabularies.localizationSites);
    if (value.distribution) validateStringArray(record, value.distribution, "localization.distribution", schema.vocabularies.distribution);
    if ("text" in value && !nonEmptyString(value.text)) fail(record, "localization.text must be non-empty");
    if (!Object.keys(value).length) fail(record, "localization cannot be empty");
  }
  if (presentation.symptoms) {
    validateStringArray(record, presentation.symptoms.values, "symptoms", schema.vocabularies.symptoms);
    if ("text" in presentation.symptoms && !nonEmptyString(presentation.symptoms.text)) fail(record, "symptoms.text must be non-empty");
  }
  if (presentation.course) {
    validateStringArray(record, presentation.course.values, "course", schema.vocabularies.course);
    if ("text" in presentation.course && !nonEmptyString(presentation.course.text)) fail(record, "course.text must be non-empty");
  }
}

function validateDermoscopy(record, dermoscopy) {
  if (!dermoscopy || typeof dermoscopy !== "object" || Array.isArray(dermoscopy)) fail(record, "dermoscopy must be an object");
  const keys = ["patterns", "vascularStructures", "pigmentStructures", "scaleKeratinClues", "highRiskClues", "text"];
  if (Object.keys(dermoscopy).some(key => !keys.includes(key))) fail(record, "dermoscopy has an unsupported field");
  for (const key of keys.filter(key => key !== "text")) if (dermoscopy[key]) validateStringArray(record, dermoscopy[key], `dermoscopy.${key}`);
  if ("text" in dermoscopy && !nonEmptyString(dermoscopy.text)) fail(record, "dermoscopy.text must be non-empty");
  if (!Object.keys(dermoscopy).length) fail(record, "dermoscopy cannot be empty");
}

function validateMedication(record, medication) {
  if (!medication || typeof medication !== "object" || Array.isArray(medication)) fail(record, "medication must be an object");
  if (Object.keys(medication).some(key => !medicationKeys.has(key))) fail(record, "medication has an unsupported field");
  if (!nonEmptyString(medication.name)) fail(record, "medication name is required");
  for (const [key, value] of Object.entries(medication)) {
    if (key === "name" || key === "sourceUrls") continue;
    if (!nonEmptyString(value)) fail(record, `medication.${key} must be non-empty`);
  }
  if (medication.sourceUrls) validateSourceUrls(record, medication.sourceUrls, "medication.sourceUrls");
  if (!["formulation", "dose", "frequency", "duration"].some(key => nonEmptyString(medication[key]))) {
    fail(record, "structured medication needs at least one practical formulation, dose, frequency or duration field");
  }
}

function validateTreatment(record, treatment) {
  if (!treatment || typeof treatment !== "object" || Array.isArray(treatment)) fail(record, "treatment must be an object");
  if (!Array.isArray(treatment.steps) || !treatment.steps.length) fail(record, "treatment.steps must be non-empty");
  if (Object.keys(treatment).some(key => !["steps", "nonPharmacological"].includes(key))) fail(record, "treatment has an unsupported field");
  const levels = new Set();
  for (const step of treatment.steps) {
    if (!schema.vocabularies.treatmentLevels.includes(step.level)) fail(record, `unsupported treatment level ${step.level}`);
    if (levels.has(step.level)) fail(record, `duplicate treatment level ${step.level}`);
    levels.add(step.level);
    if (!Array.isArray(step.interventions) || !step.interventions.length) fail(record, `${step.level} needs interventions`);
    for (const intervention of step.interventions) {
      if (!intervention || typeof intervention !== "object" || Array.isArray(intervention) || !nonEmptyString(intervention.intervention)) fail(record, `${step.level} has a malformed intervention`);
      if (Object.keys(intervention).some(key => !["intervention", "details", "medications", "sourceUrls"].includes(key))) fail(record, `${step.level} intervention has an unsupported field`);
      if ("details" in intervention && !nonEmptyString(intervention.details)) fail(record, `${step.level} intervention details must be non-empty`);
      if (intervention.sourceUrls) validateSourceUrls(record, intervention.sourceUrls, `${step.level}.sourceUrls`);
      if (intervention.medications) {
        if (!Array.isArray(intervention.medications) || !intervention.medications.length) fail(record, `${step.level} medications must be non-empty`);
        intervention.medications.forEach(medication => validateMedication(record, medication));
      }
    }
  }
  if (treatment.nonPharmacological) validateStringArray(record, treatment.nonPharmacological, "treatment.nonPharmacological");
}

function validateProfile(record) {
  const profile = record.clinicalProfile;
  if (!profile || typeof profile !== "object" || Array.isArray(profile)) fail(record, "clinicalProfile must be an object");
  if (Object.keys(profile).some(key => !profileKeys.has(key))) fail(record, "clinicalProfile has an unsupported field");
  if (profile.schemaVersion !== schema.schemaVersion) fail(record, "clinicalProfile schemaVersion is unsupported");
  validateStringArray(record, profile.aliases, "aliases");
  validatePresentation(record, profile.presentation);
  if (profile.epidemiology) {
    if (typeof profile.epidemiology !== "object" || Array.isArray(profile.epidemiology)) fail(record, "epidemiology must be an object");
    const epidemiologyKeys = ["ageGroups", "sexDistribution", "riskGroups", "prevalence", "associations"];
    if (Object.keys(profile.epidemiology).some(key => !epidemiologyKeys.includes(key)) || !Object.keys(profile.epidemiology).length) fail(record, "epidemiology has an unsupported field or is empty");
    if (profile.epidemiology.ageGroups) validateStringArray(record, profile.epidemiology.ageGroups, "epidemiology.ageGroups", schema.vocabularies.ageGroups);
    for (const key of ["riskGroups", "associations"]) if (profile.epidemiology[key]) validateStringArray(record, profile.epidemiology[key], `epidemiology.${key}`);
    for (const key of ["sexDistribution", "prevalence"]) if (key in profile.epidemiology && !nonEmptyString(profile.epidemiology[key])) fail(record, `epidemiology.${key} must be non-empty`);
  }
  if (profile.etiology) {
    validateStringArray(record, profile.etiology.mechanisms, "etiology.mechanisms", schema.vocabularies.etiologies);
    if ("text" in profile.etiology && !nonEmptyString(profile.etiology.text)) fail(record, "etiology.text must be non-empty");
  }
  if (profile.dermoscopy) validateDermoscopy(record, profile.dermoscopy);
  if (profile.diagnostics) {
    if (!Array.isArray(profile.diagnostics) || !profile.diagnostics.length) fail(record, "diagnostics must be non-empty");
    for (const item of profile.diagnostics) {
      if (!schema.vocabularies.diagnosticMethods.includes(item.method)) fail(record, `unsupported diagnostic method ${item.method}`);
      if (!schema.vocabularies.diagnosticRoles.includes(item.role)) fail(record, `unsupported diagnostic role ${item.role}`);
      if (!nonEmptyString(item.indication)) fail(record, "diagnostic indication is required");
      if ("findings" in item && !nonEmptyString(item.findings)) fail(record, "diagnostic findings must be non-empty");
      if (Object.keys(item).some(key => !["method", "role", "indication", "findings", "sourceUrls"].includes(key))) fail(record, "diagnostic item has an unsupported field");
      if (item.sourceUrls) validateSourceUrls(record, item.sourceUrls, "diagnostic.sourceUrls");
    }
  }
  if (profile.histopathology !== undefined && !nonEmptyString(profile.histopathology)) fail(record, "histopathology must be non-empty");
  if (profile.differentials) {
    if (!Array.isArray(profile.differentials) || !profile.differentials.length) fail(record, "differentials must be non-empty");
    const diagnoses = new Set();
    for (const item of profile.differentials) {
      if (!item || typeof item !== "object" || Array.isArray(item) || !nonEmptyString(item.diagnosis)) fail(record, "differential diagnosis is required");
      if ("distinguishingClue" in item && !nonEmptyString(item.distinguishingClue)) fail(record, "differential clue must be non-empty");
      if (Object.keys(item).some(key => !["diagnosis", "distinguishingClue"].includes(key))) fail(record, "differential has an unsupported field");
      const key = item.diagnosis.toLocaleLowerCase("en");
      if (diagnoses.has(key)) fail(record, `duplicate differential ${item.diagnosis}`);
      diagnoses.add(key);
    }
  }
  validateTreatment(record, profile.treatment);
  if (!profile.followUp || !schema.vocabularies.followUpStrategies.includes(profile.followUp.strategy) || !nonEmptyString(profile.followUp.text)) fail(record, "followUp needs a controlled strategy and text");
  for (const key of ["redFlags", "patientCounseling"]) if (profile[key]) validateStringArray(record, profile[key], key);
  if (profile.referral) {
    if (!Array.isArray(profile.referral) || !profile.referral.length) fail(record, "referral must be non-empty");
    for (const item of profile.referral) {
      if (!schema.vocabularies.referralTypes.includes(item.type) || !nonEmptyString(item.indication)) fail(record, "referral needs a controlled type and indication");
    }
  }
  if (profile.specialPopulations) {
    if (!Array.isArray(profile.specialPopulations) || !profile.specialPopulations.length) fail(record, "specialPopulations must be non-empty");
    for (const item of profile.specialPopulations) {
      if (!schema.vocabularies.specialPopulations.includes(item.population) || !nonEmptyString(item.note)) fail(record, "special population needs a controlled population and note");
    }
  }
  if (profile.oncology) {
    if (!profile.oncology || typeof profile.oncology !== "object" || Array.isArray(profile.oncology) || !Object.keys(profile.oncology).length) fail(record, "oncology must be a non-empty object");
    const keys = ["riskClassification", "histologicSubtype", "excisionMargins", "staging", "sentinelNode", "reExcision", "imaging", "systemicTherapyReferral", "recurrenceMetastasis"];
    if (Object.keys(profile.oncology).some(key => !keys.includes(key))) fail(record, "oncology has an unsupported field");
    for (const value of Object.values(profile.oncology)) if (!nonEmptyString(value)) fail(record, "oncology fields must be non-empty");
  }
  validateSourceUrls(record, profile.sourceUrls, "clinicalProfile.sourceUrls");
}

function validateData(data = loadData()) {
  if (data.schemaVersion !== 2) throw new Error("DOCUTIS_DATA schemaVersion must be 2");
  if (!Array.isArray(data.diseases) || data.diseases.length !== 50) throw new Error("Expected 50 disease records");
  const ids = new Set();
  const aliasOwners = new Map();
  for (const record of data.diseases) {
    if (ids.has(record.id)) fail(record, "duplicate record ID");
    ids.add(record.id);
    if (record.clinicalProfile) {
      validateProfile(record);
      for (const alias of record.clinicalProfile.aliases) {
        const key = alias.trim().toLocaleLowerCase("en");
        if (key === record.name.trim().toLocaleLowerCase("en")) fail(record, "alias duplicates the canonical name");
        if (aliasOwners.has(key) && aliasOwners.get(key) !== record.id) fail(record, `alias duplicates ${aliasOwners.get(key)}`);
        aliasOwners.set(key, record.id);
      }
    }
  }
  return true;
}

function coverage(data = loadData()) {
  const profiles = data.diseases.filter(record => record.clinicalProfile);
  const count = predicate => profiles.filter(predicate).length;
  return {
    totalRecords: data.diseases.length,
    structuredProfiles: profiles.length,
    structuredMorphology: count(record => record.clinicalProfile.presentation?.morphology),
    structuredLocalization: count(record => record.clinicalProfile.presentation?.localization),
    structuredSymptoms: count(record => record.clinicalProfile.presentation?.symptoms),
    structuredDiagnostics: count(record => record.clinicalProfile.diagnostics),
    structuredDifferentials: count(record => record.clinicalProfile.differentials),
    structuredTreatment: count(record => record.clinicalProfile.treatment),
    structuredMedicationDetails: count(record => record.clinicalProfile.treatment.steps.some(step => step.interventions.some(item => item.medications?.length))),
    structuredFollowUp: count(record => record.clinicalProfile.followUp),
    structuredRedFlags: count(record => record.clinicalProfile.redFlags),
    legacyCompatible: data.diseases.length - profiles.length
  };
}

function main() {
  const data = loadData();
  validateData(data);
  const metrics = coverage(data);
  console.log(`Validated clinical schema v${schema.schemaVersion}: ${metrics.structuredProfiles}/${metrics.totalRecords} structured profiles; ${metrics.legacyCompatible} legacy-compatible records.`);
  console.log(JSON.stringify(metrics, null, 2));
  console.log("This validates structure and controlled values, not clinical accuracy or physician review.");
}

module.exports = { schema, loadData, validateData, validateProfile, coverage, main };

if (require.main === module) {
  try { main(); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
