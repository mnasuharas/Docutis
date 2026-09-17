/* Goal 7 optional clinical-content schema and controlled vocabularies. */
(function (root, factory) {
  "use strict";
  const schema = factory();
  if (typeof module === "object" && module.exports) module.exports = schema;
  if (root) root.DOCUTIS_CLINICAL_SCHEMA = schema;
}(typeof window === "object" ? window : null, function () {
  "use strict";

  function vocabulary(values) {
    return Object.freeze([...values]);
  }

  return Object.freeze({
    schemaVersion: 1,
    vocabularies: Object.freeze({
      primaryLesions: vocabulary(["macule", "patch", "papule", "plaque", "nodule", "tumor", "vesicle", "bulla", "pustule", "wheal"]),
      secondaryChanges: vocabulary(["scale", "crust", "erosion", "ulcer", "atrophy", "hyperkeratosis", "excoriation", "lichenification", "scar"]),
      symptoms: vocabulary(["pruritic", "painful", "burning", "tender", "asymptomatic", "bleeding"]),
      distribution: vocabulary(["localized", "generalized", "symmetric", "asymmetric", "flexural", "extensor", "acral", "intertriginous", "dermatomal", "photo-distributed", "seborrheic"]),
      course: vocabulary(["acute", "subacute", "chronic", "recurrent", "progressive", "self-limited"]),
      localizationSites: vocabulary(["face", "scalp", "trunk", "upper-extremities", "lower-extremities", "palms", "soles", "nails", "anogenital", "mucosal", "flexures", "extensor-surfaces", "intertriginous-areas", "seborrheic-areas", "sun-exposed-skin", "generalized"]),
      etiologies: vocabulary(["inflammatory", "infectious", "autoimmune", "neoplastic", "genetic", "drug-induced", "uv-associated", "barrier-dysfunction"]),
      diagnosticMethods: vocabulary(["clinical-examination", "dermoscopy", "microscopy", "culture", "pcr", "biopsy", "histopathology", "laboratory-testing", "imaging", "patch-testing", "allergy-testing", "other"]),
      diagnosticRoles: vocabulary(["routine", "confirmatory", "optional", "unclear-cases", "severe-or-atypical", "staging"]),
      treatmentLevels: vocabulary(["first-line", "second-line-or-alternative", "refractory-or-severe", "procedural", "supportive-care"]),
      followUpStrategies: vocabulary(["no-routine-follow-up", "as-needed", "reassessment-after-treatment", "risk-adapted", "guideline-defined", "recurrence-monitoring", "cancer-surveillance"]),
      referralTypes: vocabulary(["dermatology", "surgery", "oncology", "ophthalmology", "hospital-admission", "biopsy-assessment", "systemic-therapy-assessment"]),
      specialPopulations: vocabulary(["pediatric", "pregnancy", "lactation", "immunocompromised", "older-adult", "renal-impairment", "hepatic-impairment"]),
      ageGroups: vocabulary(["neonatal", "infant", "child", "adolescent", "adult", "older-adult", "any-age"])
    })
  });
}));
