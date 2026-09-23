const assert = require("node:assert/strict");
const test = require("node:test");

const { fingerprint } = require("../scripts/clinical-review");
const { coverage, loadData, schema, validateData, validateProfile } = require("../scripts/clinical-schema");

const data = loadData();
const clone = value => JSON.parse(JSON.stringify(value));
const pilots = ["actinic-keratosis", "basal-cell-carcinoma", "cutaneous-melanoma", "atopic-dermatitis", "plaque-psoriasis", "acne-vulgaris", "rosacea", "tinea-corporis"];

function pilot(id = pilots[0]) {
  return clone(data.diseases.find(record => record.id === id));
}

test("Goal 7 exposes bounded controlled vocabularies and validates all production data", () => {
  assert.equal(schema.schemaVersion, 1);
  for (const name of ["primaryLesions", "secondaryChanges", "symptoms", "distribution", "course", "localizationSites", "etiologies", "diagnosticMethods", "diagnosticRoles", "treatmentLevels", "followUpStrategies", "referralTypes", "specialPopulations", "ageGroups"]) {
    assert.ok(Array.isArray(schema.vocabularies[name]) && schema.vocabularies[name].length > 0, `missing ${name}`);
    assert.equal(new Set(schema.vocabularies[name]).size, schema.vocabularies[name].length, `${name} has duplicates`);
  }
  assert.doesNotThrow(() => validateData(data));
});

test("exactly eight representative records use the structured pilot schema", () => {
  assert.deepEqual(Array.from(data.diseases.filter(record => record.clinicalProfile), record => record.id).sort(), [...pilots].sort());
  assert.deepEqual(coverage(data), {
    totalRecords: 50,
    structuredProfiles: 8,
    structuredMorphology: 8,
    structuredLocalization: 6,
    structuredSymptoms: 3,
    structuredDiagnostics: 8,
    structuredDifferentials: 8,
    structuredTreatment: 8,
    structuredMedicationDetails: 2,
    structuredFollowUp: 8,
    structuredRedFlags: 8,
    legacyCompatible: 42
  });
});

test("legacy-only records remain valid and the profile is optional", () => {
  const legacy = clone(data);
  legacy.diseases.forEach(record => delete record.clinicalProfile);
  assert.doesNotThrow(() => validateData(legacy));
  assert.equal(coverage(legacy).structuredProfiles, 0);
  assert.equal(coverage(legacy).legacyCompatible, 50);
});

test("structured aliases cannot duplicate a canonical name or another profile", () => {
  const canonical = clone(data); canonical.diseases[0].clinicalProfile.aliases[0] = canonical.diseases[0].name;
  assert.throws(() => validateData(canonical), /canonical name/);
  const duplicate = clone(data);
  duplicate.diseases.find(record => record.id === "basal-cell-carcinoma").clinicalProfile.aliases[0] = "solar keratosis";
  assert.throws(() => validateData(duplicate), /duplicates actinic-keratosis/);
});

test("controlled morphology, symptoms, diagnostics and follow-up reject malformed values", () => {
  const mutations = [
    record => { record.clinicalProfile.presentation.morphology.primaryLesions = ["blob"]; },
    record => { record.clinicalProfile.presentation.symptoms = { values: ["itchy-ish"] }; },
    record => { record.clinicalProfile.diagnostics[0].method = "guess"; },
    record => { record.clinicalProfile.diagnostics[0].role = "always"; },
    record => { record.clinicalProfile.followUp.strategy = "every-six-months"; },
    record => { record.clinicalProfile.aliases.push(record.clinicalProfile.aliases[0].toUpperCase()); },
    record => { record.clinicalProfile.epidemiology = { ageGroups: ["middle-aged-ish"] }; },
    record => { record.clinicalProfile.specialPopulations = [{ population: "everyone", note: "Synthetic" }]; },
    record => { record.clinicalProfile.referral = [{ type: "unknown-service", indication: "Synthetic" }]; }
  ];
  for (const mutate of mutations) {
    const record = pilot(); mutate(record);
    assert.throws(() => validateProfile(record));
  }
});

test("treatment hierarchy, differentials and source references are structurally guarded", () => {
  const mutations = [
    record => { record.clinicalProfile.treatment.steps[0].level = "third-line"; },
    record => { record.clinicalProfile.treatment.steps[0].interventions = []; },
    record => { record.clinicalProfile.differentials[0] = { diagnosis: "" }; },
    record => { record.clinicalProfile.differentials.push({ diagnosis: record.clinicalProfile.differentials[0].diagnosis.toUpperCase() }); },
    record => { record.clinicalProfile.sourceUrls = ["https://example.org/not-attached"]; },
    record => { record.clinicalProfile.diagnostics[0].sourceUrls = ["https://example.org/not-attached"]; },
    record => { record.clinicalProfile.evidenceMap.treatment = ["https://example.org/not-attached"]; },
    record => { record.clinicalProfile.evidenceMap.unknown = [record.references[0].url]; },
    record => { record.clinicalProfile.evidenceMap = {}; }
  ];
  for (const mutate of mutations) {
    const record = pilot(); mutate(record);
    assert.throws(() => validateProfile(record));
  }
});

test("all eight pilot records map section evidence only to attached sources", () => {
  for (const id of pilots) {
    const record = data.diseases.find(item => item.id === id);
    assert.ok(Object.keys(record.clinicalProfile.evidenceMap).length >= 6, `${id} lacks useful section mapping`);
    const attached = new Set(record.references.map(reference => reference.url));
    for (const urls of Object.values(record.clinicalProfile.evidenceMap)) {
      assert.ok(urls.length > 0);
      urls.forEach(url => assert.ok(attached.has(url), `${id} maps unknown source ${url}`));
    }
  }
});

test("medication schema supports practical dosing metadata without making it mandatory", () => {
  const record = pilot();
  const sourceUrl = record.references[0].url;
  record.clinicalProfile.treatment.steps[0].interventions[0].medications = [{
    name: "Synthetic test medication", route: "topical", formulation: "test formulation",
    frequency: "test frequency", duration: "test duration", precautions: "test precaution", sourceUrls: [sourceUrl]
  }];
  assert.doesNotThrow(() => validateProfile(record));
  delete record.clinicalProfile.treatment.steps[0].interventions[0].medications[0].frequency;
  delete record.clinicalProfile.treatment.steps[0].interventions[0].medications[0].duration;
  delete record.clinicalProfile.treatment.steps[0].interventions[0].medications[0].formulation;
  assert.throws(() => validateProfile(record), /practical/);
});

test("structured clinical content participates in deterministic clinical fingerprints", () => {
  const record = pilot();
  const before = fingerprint(record);
  record.clinicalProfile.presentation.morphology.text += " Changed.";
  assert.notEqual(fingerprint(record), before);
  record.reviewStatus = "clinician reviewed";
  record.clinicalReview = { reviewedAt: "2026-09-17", reviewerRole: "physician", reviewerSpecialty: "dermatology", reviewedContentHash: before };
  assert.throws(() => require("../scripts/clinical-review").validateReview(record), /Stale clinical review/);
});
