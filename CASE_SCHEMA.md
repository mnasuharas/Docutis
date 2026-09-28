# Case-based learning schema (Goal 11)

Structured educational cases live in `case-data.js` as `window.DOCUTIS_CASES` (schemaVersion 1). Rendering belongs in `case-app.js`. Offline validation and fingerprinting use `node scripts/case.js`. Cases are independent Goal 9 review units (`assetType: case`).

## Principles

- Prefer observable visual facts before interpretation or diagnosis reveal.
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
| `annotations` | Optional future regions `{ id, imageId, label, x, y, w, h }` with normalized 0–1 coords; may be `[]` |
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
