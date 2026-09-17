# Goal 7 content-quality audit

Audit date: 2026-09-17. This report evaluates structure and coverage; it is not a physician review of clinical correctness.

## Initial state

All 50 records used the same legacy fields: identity and taxonomy, structured coding, `description`, `clinical`, `dermoscopy`, `differential`, `treatment`, `followup`, references and clinical-review metadata. Every record had non-empty values and at least three traceable sources, but the clinical domains were prose blocks.

Initial structured coverage was therefore 0/50 for morphology, localization, symptoms, diagnostic workflow, differential objects, treatment hierarchy, medication regimens and red flags. Clinically useful information existed inside prose but could not be validated or indexed by domain.

Major inconsistencies found:

- morphology, localization, symptoms and course were mixed in `clinical`;
- confirmatory testing, biopsy indications and escalation were distributed across dermoscopy, treatment and follow-up prose;
- differentials were comma-separated lists without distinguishers;
- treatment hierarchy, procedural care, supportive care and referral were not machine-readable;
- oncology records had no dedicated structure for risk, subtype, staging, margins, nodal assessment or systemic referral;
- none of the 50 records had structured medication formulation, dose, frequency or duration;
- contraindications, pregnancy and monitoring were only mentioned generically where present;
- the more recently added inflammatory and infectious records were generally longer and more operational than several older rare-malignancy records, but length did not guarantee structured usability.

## Pilot migration and quantitative coverage

Eight representative records were migrated: Actinic Keratosis, Basal Cell Carcinoma, Cutaneous Melanoma, Atopic Dermatitis, Plaque Psoriasis, Acne Vulgaris, Rosacea and Tinea Corporis. They cover premalignant, keratinocytic, melanocytic, inflammatory, acneiform and infectious use cases. The other 42 records intentionally remain legacy-compatible until their disease-specific evidence can be reviewed safely.

Current structured coverage:

- clinical profiles: 8/50;
- morphology: 8/50;
- localization: 5/50;
- symptoms: 1/50;
- diagnostic workflow: 8/50;
- differential objects: 8/50;
- treatment hierarchy: 8/50;
- structured medication details: 0/50;
- follow-up strategy: 8/50;
- red flags: 7/50;
- legacy-compatible records: 42/50.

“Legacy” in the table means the domain remains available as prose but has not yet been migrated to the new structured representation.

| Record | Definition | Morphology | Localization | Diagnostics | Differentials | Treatment | Follow-up | Sources |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Actinic Keratosis | Yes | Yes | Yes | Yes | Yes | Yes | Yes | 4 |
| Actinic Cheilitis | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 3 |
| Porokeratosis | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 4 |
| Basal Cell Carcinoma | Yes | Yes | Legacy | Yes | Yes | Yes | Yes | 4 |
| Cutaneous Squamous Cell Carcinoma | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 4 |
| Squamous Cell Carcinoma in Situ | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 5 |
| Keratoacanthoma | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 3 |
| Cutaneous Melanoma | Yes | Yes | Legacy | Yes | Yes | Yes | Yes | 6 |
| Lentigo Maligna | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 6 |
| Lentigo Maligna Melanoma | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 6 |
| Acral Melanoma | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 6 |
| Nodular Melanoma | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 6 |
| Desmoplastic Melanoma | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 6 |
| Merkel Cell Carcinoma | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 5 |
| Sebaceous Carcinoma | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 4 |
| Dermatofibrosarcoma Protuberans | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 4 |
| Atypical Fibroxanthoma | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 4 |
| Pleomorphic Dermal Sarcoma | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 4 |
| Cutaneous Angiosarcoma | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 4 |
| Kaposi Sarcoma | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 5 |
| Extramammary Paget Disease | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 4 |
| Microcystic Adnexal Carcinoma | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 4 |
| Eccrine Porocarcinoma | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 4 |
| Mycosis Fungoides | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 6 |
| Sézary Syndrome | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 6 |
| Primary Cutaneous Anaplastic Large-Cell Lymphoma | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 5 |
| Atopic Dermatitis | Yes | Yes | Legacy | Yes | Yes | Yes | Yes | 4 |
| Contact Dermatitis | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 3 |
| Seborrheic Dermatitis | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 3 |
| Plaque Psoriasis | Yes | Yes | Yes | Yes | Yes | Yes | Yes | 4 |
| Acne Vulgaris | Yes | Yes | Yes | Yes | Yes | Yes | Yes | 3 |
| Rosacea | Yes | Yes | Yes | Yes | Yes | Yes | Yes | 3 |
| Chronic Urticaria | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 3 |
| Vitiligo | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 4 |
| Impetigo | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 3 |
| Bacterial Folliculitis | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 3 |
| Erysipelas | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 3 |
| Erythrasma | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 3 |
| Tinea Corporis | Yes | Yes | Yes | Yes | Yes | Yes | Yes | 3 |
| Tinea Cruris | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 3 |
| Tinea Pedis | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 3 |
| Tinea Capitis | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 3 |
| Onychomycosis | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 4 |
| Cutaneous Candidiasis | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 4 |
| Pityriasis Versicolor | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 3 |
| Scabies | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 4 |
| Herpes Simplex | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 3 |
| Herpes Zoster | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 3 |
| Molluscum Contagiosum | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 3 |
| Cutaneous Warts | Yes | Legacy | Legacy | Legacy | Legacy | Legacy | Legacy | 3 |

## Source verification

Pilot migration relied on already attached authoritative references whose identity and availability were rechecked on 2026-09-17: EADO/EDF/EORTC melanoma diagnostics and treatment updates, AAD actinic keratosis and basal cell carcinoma guidance, EuroGuiDerm psoriasis guidance, AAD acne and atopic dermatitis guidelines, the German S2k rosacea guideline and the CDC clinical ringworm reference. No new medication dose or surveillance interval was inferred.

## Priority gaps for the next content pass

1. Migrate cSCC, SCC in situ and keratoacanthoma together so biopsy, risk and surgical concepts stay consistent.
2. Structure the remaining melanoma subtypes without duplicating the dedicated follow-up protocol.
3. Add verified medication regimens only from sources that explicitly support formulation, frequency and duration; production coverage is intentionally 0/50 today.
4. Add high-yield localization and symptom data to the 42 legacy records only when their disease-specific sources support it.
5. Prioritize diagnostics and escalation for immunosuppressed, ocular, mucosal and rapidly progressive presentations.
