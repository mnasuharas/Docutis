# Clinical review procedure

Goal 9 uses the append-only public decision model documented in `REVIEW_SCHEMA.md`. The older inline `reviewStatus` and `clinicalReview` fields remain compatibility safeguards for fully reviewed record versions; partial review, changes requested, invalidation, asset-level independence and public history are represented by `review-data.js` and the generated `review-status.json`. Current physician decisions cover actinic keratosis, basal cell carcinoma (disease), BCC follow-up and the BCC schematic. The previous BCC quiz decision remains in history but is invalidated because the visual and prompt changed; the revised quiz and new photographs await review.

Automated schema, source metadata, DOI, coding and CI checks are distinct from human clinical review. Only a human physician can personally review a specific record version. Current state: the disease catalogue contains 65 records, and legacy embedded `reviewStatus` fields remain `clinician review required` for all 65. That catalogue count is not the public review-unit count. The authoritative manifest in `review-status.json` lists 89 independent review units: 4 `clinician reviewed`, 84 `review required`, and 1 `review invalidated`. The 84 pending units include five Goal 11 cases, 16 Goal 18 cases, 8 Goal 21 cases, 1 Goal 22 case, 2 Goal 24 cases, 6 Goal 25 cases, 7 Goal 26 cases, 6 Goal 27 cases, 2 Goal 30 keratinocytic-mimic cases, 1 Goal 31 melanoacanthoma case, 1 Goal 32 Bowen case, 1 Goal 33 invasive SCC case, five newly governed quiz photographs, and 4 Nachsorge follow-up protocols (Merkel cell carcinoma, actinic keratosis, Bowen disease / SCC in situ, and dermatofibrosarcoma protuberans). The invalidated unit is the revised BCC quiz; its earlier decision remains visible in history but is not current approval. Do not equate "65 disease records" with "89 public review units." A histopathology sentence in a source article is source verification, not Docutis clinician review. The Goal 28 mixed-case screening training adds no review unit: it assembles stored case content, its own wording in `training-data.js` stays `clinician review required`, and a case's training eligibility (`core_training` or `context_only`) is a curriculum call, not a review status. Clinical review remains deferred, and the training does not trigger the consolidated physician review.

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

Exactly two statuses are allowed: `clinician review required` and `clinician reviewed`. Missing status/metadata on existing source entries defaults to required/null in the record factory, preserving compatibility. Explicit invalid values fail validation. The data-validation assertion that all 65 catalogue disease records still carry embedded `clinician review required` is a legacy release guard for `data.js`; it is separate from Goal 9 public counts in `review-status.json`. A future PR that updates embedded disease review metadata must revise that assertion and documented counts alongside the physician's attestation. Keep generic metadata and stale-hash tests in place.

The hash binds the review to content; it is not a signature, identity check, guarantee of correctness or protection against a maintainer deliberately falsifying data. PR accountability supplies the human evidence. The static UI displays the reviewed metadata after repository validation; it does not verify credentials or recompute Node hashes in the browser. CI must pass before publication. No authentication, personal reviewer database or runtime network service is involved.

Physician review does not replace individual professional judgment or current clinical guidelines. Reassess records when supporting guidance changes even if the stored source URL and fingerprint have not changed. A reviewed release and physician review of the database remain future work.

## Follow-up protocol review

The same controlled states and physician metadata apply to the structured protocols in `followup-data.js`. Review the disease/jurisdiction scope, guideline version and source, every risk/stage definition, period boundary, modality, interval or frequency, conditional note, duration and recommendation wording. Compare the rendered result with the structured data and official source.

Generate a read-only protocol fingerprint with `node scripts/clinical-review.js --follow-up cutaneous-melanoma`. A protocol fingerprint excludes `sourceMetadataCheckedAt`, review metadata, presentation-only disease, jurisdiction, group and period labels, and non-clinical array ordering; it includes group/period identities, clinical descriptions, timing status and all other clinically meaningful protocol and guideline fields. After a genuine physician attestation, record the matching hash in that protocol only. A new guideline version or a clinical edit requires reassessment and either a new attestation/hash or a reset to review-required. `node scripts/follow-up.js` validates structure but never performs clinical review.

For Goal 5, use the empty checkboxes and row-level matrices in `GOAL5_CLINICAL_REVIEW.md`. That worksheet does not attest review by itself; repository review evidence and matching protocol metadata are still required.

## Goal 8 structured pilot review

Use `GOAL8_CLINICAL_REVIEW_BATCH.md` for the first eight structured records. Review the legacy prose, every structured domain, section-level evidence map, linked schematic and quiz question together. Confirm that evidence mapping is not broader than the attached source, that the visual is clinically conservative and accessible, and that the quiz has one defensible best answer.

The worksheet is deliberately unsigned and every checkbox starts empty. Completing automated tests, generating a fingerprint, reviewing a source URL or approving a pull request does not complete physician attestation. Visual and quiz items retain their own `clinician review required` states even if the associated disease record is later reviewed.

## Goal 9 consolidated gate

Run `node scripts/review-governance.js --write` and `node scripts/review-batch.js --write`, then use `GOAL9_HUMAN_REVIEW_GATE.md` with `goal9-review-decisions.template.json`. The packet contains the Goal 9 pilot units (eight structured disease records, eight quiz questions, four original visuals and three follow-up protocols) plus any Goal 11 case units. A reviewer must decide each unit separately. Case review never follows automatically from a reviewed disease, quiz or visual. The generated files contain fingerprints and current content but do not constitute attestation.

After a human returns the completed package, apply only supplied or explicitly approved corrections, regenerate fingerprints, and obtain confirmation of every final corrected fingerprint. Copy only consented public identity metadata and completed decisions into `review-data.js`; never copy private contact or credential evidence. Review history is append-only. See `REVIEW_SCHEMA.md` for controlled verdicts, supersession and invalidation.


## Case-based learning review

Cases in `case-data.js` are independent `case` assets. Review images/provenance, observation vs interpretation separation, differentials, diagnostic confirmation honesty and teaching points. Generate fingerprints with `node scripts/case.js` context via `scripts/review-governance.js`. Do not mark a case clinician reviewed because automated tests pass or because an AI drafted teaching text.

## Goal 19 reviewer workspace

`academy-review.html` is generated from `case-data.js` by `node scripts/academy-review.js --write`. It puts provenance, license, features, certainty, weight, differential, closest mimic, trap, mentor note, take-home rule, management brief, skills, level, and teaching type on one page so a reviewer does not hunt files. The page is labeled review required. Generating it does not set `clinicalReview`, a reviewer name, a review date, or an approval. Regenerate after teaching edits. `node scripts/academy-review.js --check` fails if the file is stale.

Goal 19 did not record a clinician review. Management briefs were not rewritten. Diagnosis labels and confirmation methods were not upgraded. Pull request #21 was not the base, and Goal 18 pull request #24 was not merged.


## Review plan for eight profiles and 57 cases

Use the exact versions in [the review packet](GOAL9_HUMAN_REVIEW_GATE.md) and [the decision template](goal9-review-decisions.template.json). Start with the eight structured profiles. Check diagnosis and referral, therapy and dosing where shown, and the evidence attached to each section. The public manifest already records current decisions for the actinic keratosis and basal cell carcinoma profiles. Verify their fingerprints before deciding whether they require another review.

Review the 57 cases in batches. Prioritise melanoma in situ, amelanotic melanoma and difficult differential diagnoses, then review special sites and the remaining cases. Use [the reviewer workspace](academy-review.html) to compare teaching with the recorded images. For each case, check that the diagnosis matches the source, that verification strength and pairing are accurately described, and that the visible structures, image attribution and feedback fit the evidence. Record approve, partial approval, corrections requested or deferral against the exact fingerprint. A physician who personally reviewed the unit supplies the dated attestation. Record a decision only for the scope actually reviewed.


## Focused review packet: five expanded records

- Atypical fibroxanthoma and pleomorphic dermal sarcoma: check biopsy depth, subcutaneous invasion, adverse histological features and lineage exclusion against the [AWMF S1 guideline, version 2.0](https://register.awmf.org/assets/guidelines/032-057l_S1_Atypisches-Fibroxanthom-AFX-Pleomorphes-Dermalles_Sarkom-PDS_2026-08.pdf), sections 3–4.
- Seborrheic keratosis, dermatofibroma and solar lentigo: check each pattern and the limits of the linked case evidence. In particular, the dermatofibroma teaching photo carries a clinical source label without histopathological verification. Review the English source text and Turkish rendering together.
- Record a decision for the exact current content only after the physician checks the relevant source and wording. These remain clinician-review-required legacy reference records.
