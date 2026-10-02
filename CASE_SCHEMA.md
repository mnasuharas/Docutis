# Case-based learning schema (Goal 11)

Structured educational cases live in `case-data.js` as `window.DOCUTIS_CASES` (schemaVersion 1). Rendering belongs in `case-app.js`. Offline validation and fingerprinting use `node scripts/case.js`. Cases are independent Goal 9 review units (`assetType: case`).

## Principles

- Prefer observable visual facts before interpretation or diagnosis reveal.
- The learner UI walks inspect → observe → differential → reveal → review. Do not add observations, differentials, images or confirmation claims that are not already in the case record. Zoom is not a download or reshare control.
- Separate **observations** from **interpretations**.
- Do not invent licenses, histopathology confirmation, patient identifiers or clinician review.
- AI-assisted drafting is not clinician review. New cases start as `clinician review required` with `clinicalReview: null`.
- Link `diseaseId` to an existing `data.js` condition. Do not duplicate treatment guidelines in cases.

## Required case fields

| Field | Notes |
|-------|--------|
| `id`, `slug`, `title` | Stable unique identifiers |
| `diagnosisLabel` | Learner-facing diagnosis string after reveal |
| `diseaseId` | Must resolve in `data.js` |
| `category` | Free-text category label aligned with disease family |
| `educationalLevel` | `introductory` \| `intermediate` \| `advanced` |
| `caseType` | `clinical` \| `dermoscopic` \| `clinical_dermoscopic` \| `histopathological` \| `combined` |
| `patientContext` | Non-identifying only: optional `ageBand`, `sex`, required `anatomicalSite`, optional `presentationNotes` |
| `images` | ≥1 image object with full provenance (see below) |
| `diagnosticGroundTruth` | `confirmedDiagnosis`, `confirmationMethod`, `confirmationNotes`; optional `confidenceNote` |
| `observations` | `{ id, text, kind: "observation" }` — visual facts only |
| `interpretations` | `{ id, text, relatedObservationIds[], kind: "interpretation" }` |
| `dermoscopicFeatures` | Controlled tokens and/or free-text labels genuinely visible; empty array allowed for pure clinical cases |
| `differentials` | `{ diagnosis, supportingFeatures[], contradictingFeatures[], teachingDistinction }` |
| `teachingPoints` | Short structured items `{ id, title, text }` |
| `clinicalAction` | Optional short pointer to the Docutis disease record; no guideline duplication |
| `annotations` | Optional future regions `{ id, imageId, label, x, y, w, h }` with normalized 0–1 coords; may be `[]`. Do not invent a region from the diagnosis. |
| `modalityIntegration` | Required only when the case has both a clinical image and a dermoscopic image. Diagnosis-neutral. A clinical photograph is not called dermoscopy. |
| `localization` | Optional and empty. `roi`, `bbox`, `polygon`, and `crop` on an image, and `localization` on a case pattern, must stay null until image evidence supports them. |
| `reviewStatus` | Must be `clinician review required` until a genuine physician decision exists |
| `clinicalReview` | Must be `null` for new pilots |

### Confirmation methods

`histopathology` \| `expert_diagnosis` \| `source_dataset_diagnosis` \| `clinical_diagnosis` \| `other`

Use `histopathology` only when the source explicitly states histopathologic confirmation. Do not upgrade captions.

### Controlled dermoscopic vocabulary (optional tokens)

`arborizing_vessels`, `telangiectasia`, `blue_gray_ovoid_nests`, `maple_leaf_areas`, `spoke_wheel_areas`, `ulceration`, `shiny_white_structures`, `pigment_network_atypical`, `dots_globules_irregular`, `regression_structures`, `streaks`, `structureless_areas`, `polymorphous_vessels`, `scale`, `follicular_plugging`, `other`

Free-text labels are allowed alongside tokens when they describe visible findings without fabricating features.

## Image object requirements

Each image must include: `id`, `type` (`clinical` \| `dermoscopy` \| `histopathology` \| `other`), local `src` under `assets/media/cases/`, `dimensions`, `alt`, `caption`, `source`, HTTPS `sourceUrl`, `creator`, allowed `license`, HTTPS `licenseUrl` (or documented PD note URL), `attribution`, `attributionRequired`, `modificationStatus` (`unmodified` \| `cropped` \| `annotated` \| `other-described`), optional `modificationsNotes`, ISO `accessDate` and `metadataCheckedAt`, `sourceVerificationStatus` (`verified` for production), `patientIdentifiable: false`, and `consentBasis`.

The validator fails if critical provenance/license/`src` fields are missing or the local file is absent.

## Fingerprint

`caseFingerprint` covers clinically meaningful teaching content and excludes `metadataCheckedAt`, `accessDate`, `reviewStatus` and `clinicalReview`. Changing observations, interpretations, differentials, teaching points, diagnosis ground truth, images (except metadata-check dates) or annotations invalidates prior approval.

## Contributor checklist

1. Verify redistribution rights against [CASE_LICENSING.md](CASE_LICENSING.md) / [MEDIA_GOVERNANCE.md](MEDIA_GOVERNANCE.md).
2. Confirm diagnosis mapping and confirmation method match the source.
3. Write ≥2 genuine observations before interpretations.
4. Keep differentials educational and non-prescriptive.
5. Leave review status as required; never auto-approve.
6. Run `node scripts/case.js` and the full test suite.


## Goal 18 curriculum extension

`DOCUTIS_CASES.curriculum` is a machine-readable Learn Melanoma map: five levels, a skills taxonomy, and ordered entries. New cases may carry `academy`, `patterns` (with a specificity note), `synthesis`, `evidenceWeighting`, `diagnosticTrap`, `mentorNote`, `takeHomeRule`, and `managementBrief`. Level 4 and 5 cases also carry two `whyNot` mimics. These fields are teaching text, not probabilities and not clinician review.

The five Goal 11 pilot cases are referenced by the map where they belong. Their governed clinical objects are not given an `academy` block, so their fingerprints stay put. Pilot cases that are not melanoma teaching (actinic keratosis field and the squamous cell carcinoma case) stay in the registry and outside the pathway.

`managementBrief` is separate from the diagnosis. It stays review required. Histopathology is still allowed only when the source states it. None of the Goal 18 additions use that method, because the captions that were actually reused did not say histopathology.

Rendered image paths for new cases are diagnosis-neutral (`case-06` onward). Source URLs stay hidden until reveal. Annotations were not added.

## Goal 19 teaching types

Schema version stays 1. Optional fields are additive. `freezeCase` copies `observationPrompts`, `hints`, and `closestMimic` only when the case already has them, so the five pilot objects do not gain academy keys and their fingerprints stay put.

| Field | Where | Notes |
|-------|--------|--------|
| `teachingType` | `academy` and each curriculum entry | `teaching`, `reasoning`, or `expert-challenge`. Not a diagnosis. Shown before reveal. |
| `observationPrompts` | academy cases | Questions for the observe step. Must not name the recorded diagnosis. |
| `hints` | academy cases | One or two optional lines behind a button. Same secrecy rule. |
| `patterns[].certainty` | academy cases | `clearly_visible`, `probably`, `uncertain`, `not_visible` |
| `patterns[].weight` | academy cases | `major`, `supportive`, `weak`, `conflicting`. Not a sensitivity or a percent. |
| `closestMimic` | academy cases | `{ name, whyClosest }`. Shown after reveal. |
| `curriculum.qualityGate` | map | Qualitative. Not a numeric score. |

Learning objectives stay in `teachingPoints`. Skills stay in `academy.skillIds`. Level stays in `academy.level`. Management stays in `managementBrief` and remains review required. Differentials already carry why a competitor fits and why it does not.

The primary-path gate is `primaryPathGate` in `scripts/case.js`. It does not require every melanoma structure on every case. See [ACADEMY_AUTHORING.md](ACADEMY_AUTHORING.md).

Pull request #21 was not the base. Goal 18 pull request #24 was not merged into `main`. No clinician reviewed a Goal 19 text change.


## Goal 20 pattern links

Schema version stays 1. Case payloads are not given a new clinical field for Goal 20, so existing case fingerprints stay valid. The crosswalk from a case pattern id to a canonical pattern id lives in `pattern-data.js`. Dermoscopic tokens link only when `dermoscopicTokenLinks` names a token that a case actually stores. See [PATTERN_LEARNING.md](PATTERN_LEARNING.md).

`node scripts/case.js` now also validates the pattern library. That check is structural. It is not clinician review.

## Goal 21 contrastive layer

Schema version stays 1. Eight new cases use the same case object. Benign labels that are not in the locked 50-condition catalog are `teachingDiagnoses`: `pole: "benign"`, `monograph: false`, `clinician review required`, `clinicalReview: null`. They are not disease records.

`comparisons` stores explicit pairs (`caseIdA`, `caseIdB`, shared features, features favouring each side, `discriminator` or null, trap, limits). A case lists pair ids in `compareWith`. The learner UI shows that offer only after the current diagnosis is revealed. `recordedScreeningDecision` may be null. A benign label must not be stored as `routine-benign-impression`. `screening.categories` is vocabulary for a future session and is not a simulation. `proposedProgression.hardCodedPath` stays false.

No new case is clinician reviewed. See [CONTRASTIVE_CURRICULUM.md](CONTRASTIVE_CURRICULUM.md).


## Goal 23 paired clinical and dermoscopy

Schema version stays 1. `pairProvenance` is a registry entry for every case, outside the five pilot objects, so those fingerprints stay put. Values are `same_lesion_confirmed`, `source_documented_pair`, and `not_paired`. Two images of the same diagnosis are not a pair. A case with both a clinical image and a dermoscopic image must use one of the first two values and must name the image ids. A single-modality case must stay `not_paired`.

`pairedModality` is required only on a true pair. It stores the clinical observation, the dermoscopic observation, added value that is not confirmation, the reasoning impact, limits, an optional educational information-gain label, and a post-reveal comparison. Information-gain labels are `dermoscopy_adds_major_discrimination`, `dermoscopy_adds_support`, `dermoscopy_changes_leading_differential`, and `dermoscopy_remains_equivocal`. They are descriptions, not a metric. Do not force one. The learner sees the clinical photograph first. Show dermoscopy does not reveal the diagnosis. Localization stays empty.

The only true pair already in the library is `case-g21-08`, recorded as `source_documented_pair` because both files cite one 2014 case report and neither file page prints the words same lesion. No new image was added in Goal 23. Wikimedia returned HTTP 429 for the candidate downloads, including one retry, so those files were not copied and their pixels were not described. See [PAIRED_MODALITY.md](PAIRED_MODALITY.md).

Clinical review remains deferred. All new clinical content remains review required.


## Goal 24 evidence-grade acquisition

Schema version stays 1. Two source-documented pairs were added from Wikimedia Commons files whose descriptions name a dermatoscope view of the same labeled lesion. Confirmation stays `clinical_diagnosis` because the file pages do not report histopathology. `acquisition-ledger.js` is a candidate registry, not a clinical object. Rejected rows are not cases. Clinical review remains deferred. All new clinical content remains review required.

## Goal 25 histopathology source and composite panels

Schema version stays 1. `diagnosticGroundTruth.histopathologySource` is optional and allowed only with `confirmationMethod: "histopathology"`. Its values are `figure_caption` (a caption sentence about that lesion) and `article_methods` (a study-level methods statement that every lesion of that class was histologically confirmed). A study-level statement is weaker and the case says so. `marked for biopsy` is never histopathology, and a pathology panel in the same paper is not proof unless the figure ties it to the same lesion.

Panels cropped from a composite figure use `modificationStatus: "cropped"`. `modificationsNotes` records the figure, panel, source file, source sha256, pixel box, method, and output sha256. The matching `acquisition-ledger.js` row repeats them, and `node scripts/acquisition.js` recomputes the output hash. A composite is split only when the license allows adaptation, no third-party exclusion applies, and the caption ties the clinical and dermoscopic panels to one lesion or one case. Clinical review remains deferred. All new clinical content remains review required.

## Goal 26 case-text histopathology

`histopathologySource` also accepts `case_text`: a histopathology sentence about that lesion in the article's case narrative, outside the figure caption. It sits between `figure_caption` and `article_methods`. When a biopsy predates the photographs, the case says so. A peer-reviewed caption without a histopathology sentence stays `clinical_diagnosis`. Clinical review remains deferred. All new clinical content remains review required.
