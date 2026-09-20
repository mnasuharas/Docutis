# Clinical review procedure

Automated schema, source metadata, DOI, coding and CI checks are distinct from human clinical review. Only a human physician can personally review a specific record version. Current state: 50 records require clinician review; 0 records are clinician reviewed.

## Review a record

1. Open a focused PR identifying the record and the content revision being reviewed. A maintainer checks the physician's role and specialty through the normal contributor review process; a self-entered field is not evidence of credentials. Do not add personal names, contact information or invented credentials to the dataset.
2. The physician personally checks the definition, morphology, distribution, diagnostic approach, differential diagnoses, treatment, doses and durations where present, contraindications, warnings, escalation criteria, red flags, coding and supporting references. Document source versions, jurisdictional limits and unresolved questions in the PR. Obtain coding-specialist input where needed.
3. Resolve clinical edits first. The physician must explicitly attest in the PR that they reviewed the resulting content version. Leave unresolved records at `clinician review required` with `clinicalReview: null`.
4. After the physician is satisfied, calculate the content fingerprint:

   ```shell
   node scripts/clinical-review.js "Acne Vulgaris"
   ```

   An exact record ID also works. This read-only command reports the current hash and status; it never changes a record or performs clinical review.
5. A maintainer records the physician's actual review date and specialty and copies the fingerprint for that reviewed version into the specific `record({ ... })` entry in `data.js`. The completed fields are `reviewStatus: "clinician reviewed"` and `clinicalReview: { reviewedAt, reviewerRole: "physician", reviewerSpecialty, reviewedContentHash }`. Use a real `YYYY-MM-DD` date and the exact generated `sha256-v1:` value. Never manufacture an attestation or regenerate a hash solely to make CI pass.
6. Run the syntax checks, `node scripts/clinical-review.js --validate`, `node --test tests/*.test.js`, and `git diff --check`. Review the final PR diff against the physician's attested version before merge. Changes after attestation require renewed review of the affected content.

## Content fingerprint and stale review

`scripts/clinical-review.js` is the single implementation used by the utility and tests. It sorts object keys recursively, preserves array order and exact text, serializes UTF-8 JSON and calculates SHA-256 with Node's built-in crypto module. The `sha256-v1:` prefix identifies the serialization policy.

The fingerprint includes every record field except `reviewStatus` and `clinicalReview`. This protects identity, aliases, category/subcategory IDs, coding, all clinical sections and source titles, organization, type, year, version, URL and DOI. Only each reference's `metadataCheckedAt` is omitted: rechecking source metadata alone is not a clinical revision. UI/CSS changes outside the data do not affect the hash. New record fields are included by default; any future purely presentational field exclusion needs an explicit policy and test change. Changes to taxonomy labels or external source content at an unchanged URL require human assessment because they are outside the record fingerprint.

A `clinician reviewed` record must have a valid date, role `physician`, non-empty specialty and a matching fingerprint. A stale fingerprint fails local tests and CI. Validation never updates it automatically. A clinical change requires either physician re-review and new metadata for that version, or resetting both fields to `reviewStatus: "clinician review required"` and `clinicalReview: null`.

The optional Goal 7 `clinicalProfile` is clinical content and participates fully in the disease fingerprint. Structural values such as morphology, localization, diagnostics, differential clues, treatment hierarchy, medication metadata, follow-up, red flags and referral all invalidate an earlier reviewed hash when changed. `node scripts/clinical-schema.js` validates the shape and controlled values but cannot perform or replace physician review.

## Scope and accountability

Exactly two statuses are allowed: `clinician review required` and `clinician reviewed`. Missing status/metadata on existing source entries defaults to required/null in the record factory, preserving compatibility. Explicit invalid values fail validation. The current 50-record review-required assertion is a release guard; a future genuine review PR must update that assertion and documented counts alongside the physician's attestation. Keep generic metadata and stale-hash tests in place.

The hash binds the review to content; it is not a signature, identity check, guarantee of correctness or protection against a maintainer deliberately falsifying data. PR accountability supplies the human evidence. The static UI displays the reviewed metadata after repository validation; it does not verify credentials or recompute Node hashes in the browser. CI must pass before publication. No authentication, personal reviewer database or runtime network service is involved.

Physician review does not replace individual professional judgment or current clinical guidelines. Reassess records when supporting guidance changes even if the stored source URL and fingerprint have not changed. A reviewed release and physician review of the database remain future work.

## Follow-up protocol review

The same controlled states and physician metadata apply to the structured protocols in `followup-data.js`. Review the disease/jurisdiction scope, guideline version and source, every risk/stage definition, period boundary, modality, interval or frequency, conditional note, duration and recommendation wording. Compare the rendered result with the structured data and official source.

Generate a read-only protocol fingerprint with `node scripts/clinical-review.js --follow-up cutaneous-melanoma`. A protocol fingerprint excludes `sourceMetadataCheckedAt`, review metadata, presentation-only disease, jurisdiction, group and period labels, and non-clinical array ordering; it includes group/period identities, clinical descriptions, timing status and all other clinically meaningful protocol and guideline fields. After a genuine physician attestation, record the matching hash in that protocol only. A new guideline version or a clinical edit requires reassessment and either a new attestation/hash or a reset to review-required. `node scripts/follow-up.js` validates structure but never performs clinical review.

For Goal 5, use the empty checkboxes and row-level matrices in `GOAL5_CLINICAL_REVIEW.md`. That worksheet does not attest review by itself; repository review evidence and matching protocol metadata are still required.

## Goal 8 structured pilot review

Use `GOAL8_CLINICAL_REVIEW_BATCH.md` for the first eight structured records. Review the legacy prose, every structured domain, section-level evidence map, linked schematic and quiz question together. Confirm that evidence mapping is not broader than the attached source, that the visual is clinically conservative and accessible, and that the quiz has one defensible best answer.

The worksheet is deliberately unsigned and every checkbox starts empty. Completing automated tests, generating a fingerprint, reviewing a source URL or approving a pull request does not complete physician attestation. Visual and quiz items retain their own `clinician review required` states even if the associated disease record is later reviewed.
