# Contributing to Docutis

Thank you for your interest in contributing to Docutis.

Docutis is an open-source dermatology reference and education toolkit. Contributions that improve the project are welcome.

## Ways to Contribute

You can contribute by:

- Reporting bugs
- Suggesting new features
- Improving documentation
- Improving the user interface
- Suggesting dermatologic conditions to add
- Correcting or improving medical content
- Adding reliable guidelines and references
- Improving accessibility and usability

## Medical Content

Because Docutis contains medical information, accuracy and appropriate sourcing are especially important.

Medical contributions should:

- Be evidence-based whenever possible
- Prefer current clinical guidelines and reliable scientific sources
- Clearly distinguish established recommendations from uncertain or evolving evidence
- Avoid unsupported or overly definitive clinical recommendations
- Preserve the educational purpose and medical disclaimer of the project

Please include references when proposing substantial medical content changes.

### Medical record structure

Condition records are stored in `data.js`, separately from UI behavior. Keep every record complete and use the existing fields: stable `id`, `name`, `alternative`, `category`, `subcategory`, `coding`, `description`, `clinical`, `dermoscopy`, `differential`, `treatment`, `followup`, `references`, and `reviewStatus`.

- Use only a category and subcategory defined in the file; do not create a parallel taxonomy map.
- Before adding a record, confirm that its canonical name and aliases do not duplicate an existing clinical entity. Keep the record concise and complete across description, clinical features, dermoscopy, differential diagnosis, treatment overview, follow-up, coding and references.
- Prefer current clinical guidelines, professional organizations, government health sources, and established dermatology references.
- Use an HTTPS link directly to the supporting source. Do not cite search-result pages.
- Store source title, organization, type, publication year, version, URL, DOI when available, and an independent `metadataCheckedAt` date for the source.
- Preserve uncertainty. If a classification mapping, recommendation, interval, or diagnostic feature cannot be verified, add an explicit verification note and document the gap in `ROADMAP.md` instead of guessing.
- Set every new or substantially changed record to `clinician review required`.
- Do not turn treatment overviews into patient-specific prescriptions. Avoid doses, fixed durations or jurisdiction-specific approval claims unless the scoped contribution and cited guideline require them.

### Source hierarchy

Use sources in this order when they are applicable and current:

1. Official international classifications and evidence-based clinical guidelines
2. Specialty societies, government or national cancer resources, and formal multidisciplinary consensus statements
3. Systematic reviews and peer-reviewed reference articles
4. Established dermatology reference sites for concise background or when stronger sources are unavailable

A reference link does not by itself validate every statement in a record. Keep claims within the scope of the cited source, avoid copying source text, and flag conflicts or unresolved questions for clinical review.

### Structured clinical profiles

Read [CLINICAL_SCHEMA.md](CLINICAL_SCHEMA.md) before adding or changing `clinicalProfile`. The profile is optional during migration; do not add empty domains or copy a generic template into every disease.

- Use values from `clinical-schema.js` for morphology, symptoms, distribution, course, diagnostic roles, treatment levels and follow-up strategies.
- Keep the legacy clinical fields populated until migration is complete so older records and consumers remain compatible.
- Every profile must list attached record references in `sourceUrls`; intervention- or diagnostic-level source links must also resolve to that record's references.
- Add medication formulation, dose, frequency or duration only when the attached authoritative source explicitly supports it. Do not infer a regimen.
- Any `clinicalProfile` edit changes the disease clinical fingerprint and requires physician re-review or continued `clinician review required` state.
- Run `node scripts/clinical-schema.js` and update `CONTENT_QUALITY_AUDIT.md` when coverage changes.

Allowed source types are `official classification`, `guideline`, `consensus`, `systematic review`, `peer-reviewed review`, and `clinical reference`. Choose the type from the publication itself; do not describe an ordinary review as a consensus or an institutional landing page as a peer-reviewed guideline.

`metadataCheckedAt` must be an ISO `YYYY-MM-DD` date and belongs to one source object. It records only when that source's title, organization or journal, type, year/version, DOI, and link were checked. It is not the source publication year, guideline version, access date for every record, or a clinician review date. Update it only after rechecking that individual source; never change a shared default to make unrelated sources appear newly checked.

### Classification and coding policy

- Never use an unlabelled `icd10` string. Each diagnosis code must identify its system and version, such as `ICD-10 WHO` 2019.
- Do not present ICD-10-CM, ICD-10-GM, or another national modification as international ICD-10. Add national codes only from the relevant official release and label the jurisdiction explicitly.
- ICD-O is oncology registry coding, not a substitute for a diagnosis code. Store its topography independently from morphology and behavior.
- For a non-neoplastic condition, set `coding.icdo` to `null` and `coding.icdoApplicability` to `not applicable`. The UI will explain that the condition is outside ICD-O oncology registry coding. Never add a synthetic topography, morphology, empty string or placeholder code.
- Use `not established` when an ICD-O mapping is unresolved for the record rather than clinically inapplicable. Existing oncology data must use `applicable` and retain separate topography and morphology.
- Use site placeholders only when the classification genuinely requires the documented primary site; do not fabricate a fourth character.
- When no reliable mapping is verified, leave the code collection empty and explain what must be verified. Do not infer a code from a similar disease name.
- Coding content remains subject to clinician and coding-specialist review and must not be used as billing advice.

Clinical review should be documented in the pull request with reviewer role, review date, source version or access date, and any jurisdictional limits. The medical-review label must not be changed merely because automated tests pass.

### Clinical review governance

Follow [CLINICAL_REVIEW.md](CLINICAL_REVIEW.md). Keep `reviewStatus` at `clinician review required` and `clinicalReview: null` until a human physician attests to reviewing the specific content version. Completed metadata requires `reviewedAt`, `reviewerRole: "physician"`, `reviewerSpecialty` and `reviewedContentHash` alongside `reviewStatus: "clinician reviewed"`.

If a clinically reviewed record is medically modified, obtain physician re-review and record the new metadata/fingerprint, or reset it to `clinician review required` with `clinicalReview: null`. Never refresh a stored hash merely to pass CI. Use `node scripts/clinical-review.js "Acne Vulgaris"` to calculate a fingerprint and `node scripts/clinical-review.js --validate` to validate all review states. These commands do not perform human review.

The Goal 3 content snapshot in the tests protects the existing 50 records during the governance migration. Future intentional clinical-content PRs must explicitly review changes to that snapshot; never update it to conceal unintended edits. Keep stale-review and generic review-state validation tests intact when the first genuine physician review changes the current 50/0 release guard.

### Follow-up protocols

Follow [FOLLOW_UP_PROTOCOLS.md](FOLLOW_UP_PROTOCOLS.md) when changing `followup-data.js`. Use the official guideline-publishing body as the primary source; do not infer intervals, combine jurisdictions or convert ambiguous wording into false precision. Keep guideline version/publication, source metadata check and physician review as separate facts.

The follow-up interface language is English even when the guideline jurisdiction is Germany. Preserve official German guideline titles in provenance. Treat group and period labels as presentation-only, but keep clinical descriptions, conditions, notes and recommendation semantics inside the reviewed clinical content.

Every group needs a stable ID, explicit risk/stage description, structured time ranges and structured modality frequencies. Use a conditional recommendation with its source condition when a modality depends on risk factors. If the guideline does not address a modality, omit it so the UI displays “not specified”; do not encode omission as “not recommended.”

A source-supported non-interval state may use `timingStatus: "not_specified"` with `range: null`, but it must explicitly mark every registered modality `not_specified`, provide no fabricated frequency or recommendation strength, and pass the stricter validator. `not specified` means the guideline does not supply a recommendation; it is distinct from `not routinely scheduled` and must not be interpreted as a recommendation against an intervention.

Any clinically meaningful protocol change requires re-review or reset to `clinician review required` with `clinicalReview: null`. Run `node scripts/follow-up.js` and `node scripts/clinical-review.js --follow-up <disease-id>` in addition to the standard checks. Adding a jurisdiction requires a separate sourced protocol and tests; do not create an empty or simulated selector.

### Educational media

Follow [MEDIA_GOVERNANCE.md](MEDIA_GOVERNANCE.md) before adding any clinical photograph, dermoscopy image, histopathology image, diagram, illustration or procedural image. Media is optional and lives in `media-data.js`, separately from disease text.

- Do not scrape image-search results or infer reuse permission from public visibility.
- Record an allowed reusable-rights license, source, attribution, HTTPS source URL and metadata-check date for every item.
- Provide meaningful alt text, a concise caption, an educational description, an existing disease ID and intrinsic image dimensions.
- Confirm consent and de-identification requirements for any patient-derived image outside the automated validator.
- Keep new media at `clinician review required` with `clinicalReview: null` until a physician reviews that exact media metadata version.
- Run `node scripts/media.js`; a passing result validates structure, not license ownership, consent or clinical interpretation.

## Development

Docutis currently uses simple:

- HTML
- CSS
- JavaScript

Please keep contributions clear, readable and maintainable.

Before submitting a change:

1. Test that the website still loads correctly.
2. Test the disease search.
3. Check that condition details display correctly.
4. Make sure existing functionality has not been unintentionally broken.
5. Run `node --check data.js`, `node --check clinical-schema.js`, `node --check app.js`, `node --check media-data.js`, `node --check scripts/media.js`, `node --check scripts/clinical-schema.js`, `node scripts/media.js`, `node scripts/clinical-schema.js`, `node --test tests/*.test.js`, and `git diff --check` for any content, data-structure, media, or interface change.
   For follow-up changes also run `node --check followup-data.js`, `node --check followup-app.js`, `node scripts/follow-up.js`, and `node scripts/clinical-review.js --validate`.
6. Test category filters and keyboard-only card/detail interaction at desktop and mobile widths.

The read-only GitHub Actions CI workflow repeats these checks on every pull request targeting `main` and on every push to `main`. CI does not use repository secrets, does not deploy, and does not replace medical or coding review.

## Issues

For bugs, feature ideas or substantial changes, opening a GitHub Issue first is encouraged.

Please describe:

- What you found or want to change
- Why the change would be useful
- Any relevant examples or references

## Pull Requests

Pull requests should focus on one clear change whenever possible.

Use a short and descriptive title and explain what was changed.

## Commit Messages

Use clear commit messages that describe the change.

Examples:

- `Fix disease search behavior`
- `Add contributing guidelines`
- `Improve mobile layout`
- `Add references for basal cell carcinoma`

## Community

Please communicate respectfully and constructively.

Docutis is intended to grow through transparent, evidence-based and collaborative open-source development.
