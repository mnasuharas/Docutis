# Clinical content schema

Goal 7 introduces an optional `clinicalProfile` schema alongside the existing disease fields. It standardizes high-value clinical information without forcing every disease into identical sections. The browser remains compatible with records that only use the legacy prose fields.

## Versioning and compatibility

- `DOCUTIS_DATA.schemaVersion` is `2`.
- Each migrated `clinicalProfile` declares `schemaVersion: 1`.
- `description`, `clinical`, `dermoscopy`, `differential`, `treatment` and `followup` remain required legacy fields during the gradual migration.
- `clinicalProfile` is optional. The renderer uses structured sections when present and the Goal 6 prose renderer otherwise.
- A structured profile may omit disease-inapplicable domains. Present arrays and objects must not be empty.

## Field model

| Domain | Requirement | Controlled values | Purpose |
|---|---|---|---|
| `aliases` | Required in a profile | No; unique, non-empty strings | Clean future alias indexing while preserving `alternative` compatibility. |
| `epidemiology` | Optional | Age group is controlled; other concise attributes are structured | Typical age group, sex distribution, risk groups, prevalence/rarity and seasonal or environmental associations when clinically useful. |
| `etiology.mechanisms` | Optional | Yes | Inflammatory, infectious, autoimmune, neoplastic, genetic, drug-induced, UV-associated or barrier dysfunction. |
| `presentation.morphology` | Required in a profile | Primary lesions and secondary changes are controlled; descriptive attributes remain concise free text | Morphology-oriented reading and future search. |
| `presentation.localization` | Optional | Sites and distribution are controlled | Anatomically useful localization without forcing a site onto every disease. |
| `presentation.symptoms` | Optional | Yes | High-yield symptom profile. |
| `presentation.course` | Optional | Yes | Acute, subacute, chronic, recurrent, progressive or self-limited. |
| `dermoscopy` | Optional | Structured buckets, concise free-text findings | Patterns, vessels, pigment, scale/keratin and high-risk clues. |
| `diagnostics` | Optional | Method and role are controlled | Separates routine, confirmatory, optional, unclear-case, severe/atypical and staging tests. |
| `histopathology` | Optional | No | Short, high-yield pathology context rather than textbook detail. |
| `differentials` | Optional | No | Diagnosis plus an optional distinguishing clue. |
| `treatment.steps` | Required in a profile | Level is controlled | First-line, alternative, refractory/severe, procedural and supportive hierarchy. Only applicable tiers are used. |
| `medications` | Optional | Field names are controlled | Name, route, formulation, dose, frequency, duration, maximum duration, taper, key contraindications, precautions, monitoring and pregnancy notes. At least one practical regimen field is required when a medication object is added. |
| `treatment.nonPharmacological` | Optional | No | Skin care, trigger control, hygiene, photoprotection and education. |
| `followUp` | Required in a profile | Strategy is controlled | As-needed, reassessment, risk-adapted, guideline-defined, recurrence or cancer surveillance. |
| `redFlags` | Optional | No | Sparse, disease-specific escalation clues. |
| `referral` | Optional | Referral type is controlled | Dermatology, surgery, oncology, ophthalmology, admission, biopsy or systemic-therapy assessment. |
| `patientCounseling` | Optional | No | Brief high-yield advice. |
| `specialPopulations` | Optional | Population is controlled | Used only when management materially differs. |
| `oncology` | Optional | Field names are controlled | Risk, subtype, margins, staging, sentinel-node, re-excision, imaging, systemic referral and recurrence/metastasis context. |
| `sourceUrls` | Required in a profile | Must exactly match attached record references | Prevents structured content from citing unattached evidence. |

Controlled vocabularies are defined once in `clinical-schema.js`. `scripts/clinical-schema.js` validates profiles, treatment objects, source links and coverage without making clinical claims about their accuracy.

## Clinical review and fingerprints

`clinicalProfile` is part of the disease record and therefore part of the deterministic clinical fingerprint. Adding or changing any structured clinical value invalidates an existing reviewed hash. All eight pilot records remain `clinician review required` with `clinicalReview: null`; automated schema validation is not physician review.

Source `metadataCheckedAt` dates remain excluded from disease fingerprints because a bibliographic link recheck does not change clinical meaning. Existing melanoma follow-up protocols and their independent fingerprints are unchanged.

## Medication safety

The schema can store dosing, duration, precautions and monitoring, but no production pilot contains a medication object in Goal 7. The available pilot sources did not consistently expose sufficiently specific regimens for safe extraction in this release. Future additions must cite an attached authoritative source and remain clinician-review required.

## Migration procedure

1. Confirm authoritative disease-specific sources and update source metadata only when actually rechecked.
2. Preserve the legacy fields so the record remains backward compatible.
3. Add only clinically applicable structured domains.
4. Keep source-linked interventions concise and do not infer doses or intervals.
5. Run `node scripts/clinical-schema.js`, the clinical-review validator and the complete test suite.
6. Obtain physician review for the changed fingerprint before using `clinician reviewed`.
