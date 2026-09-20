# Human clinical-review decision schema

Goal 9 adds a public, append-only decision layer without weakening the existing record fingerprints. `review-data.js` is the human-decision source. `scripts/review-governance.js` validates it and derives `review-status.json` plus `review-status.js`. The JSON file is the stable public machine-readable view; the JavaScript mirror keeps the dependency-free GitHub Pages UI synchronous.

## Public reviewer identity

A public reviewer entry contains only an ID, consented display name, exact professional role, specialty or field, optional training status, optional jurisdiction, optional public disclosure and explicit public-display consent. The role must describe a physician accurately. A resident may be described as `Physician — Dermatology resident` or `Arzt in Weiterbildung für Dermatologie`; the dataset must not upgrade that person to dermatologist, specialist, consultant, Facharzt or board-certified status.

Do not commit private contact information, licence numbers, signatures, addresses or identity evidence. Credential verification belongs in the normal repository review process, not the public dataset.

## Decision fields

Each decision records:

- stable decision, asset and asset-type identifiers;
- the exact `sha256-v1` content fingerprint and schema version;
- a reviewer reference and the same approved public role;
- ISO review date;
- exact reviewed-section identifiers and evidence URLs actually checked;
- one verdict: `approved`, `approved_with_minor_corrections`, `changes_requested`, `not_reviewed` or `not_applicable`;
- required corrections and optional public notes;
- the exact `docutis-human-clinical-review-v1` attestation;
- provenance `human-submitted`;
- an optional `supersededBy` decision ID.

Disease records, quiz items, visual assets and follow-up protocols are independent review units. Approval of one never approves another.

## Derived public states

- `clinician reviewed`: a current approved decision covers every declared section.
- `partially reviewed`: a current approval covers only a subset; no global reviewed badge is allowed.
- `changes requested`: a current human decision requires corrections.
- `review required`: there is no current approval, including a deliberate deferral.
- `review invalidated`: an older approval exists for a different fingerprint.
- `not applicable`: a human reviewer explicitly recorded that verdict for the current version.

The public view includes the current fingerprint, scope, awaiting sections, decision history, supersession and the latest valid human-review date. It excludes private data.

## Fingerprints and invalidation

Disease fingerprints include all record content except review metadata and source metadata check dates. Media fingerprints include the teaching asset, title, caption, alternative text, educational description, provenance and licensing but exclude review metadata and its metadata-check date. Quiz fingerprints include the prompt, choices, best-answer index, explanation, linked evidence and media relationship. Follow-up fingerprints include clinically meaningful protocol structure, intervals, recommendation status, strength, evidence relationships and guideline identity while excluding presentation-only labels and metadata-check dates as documented in `CLINICAL_REVIEW.md`.

A clinically meaningful edit produces a new fingerprint. The earlier decision remains in history, becomes inactive for the new version and yields `review invalidated` until a new valid decision is supplied. Layout-only changes outside these assets do not alter fingerprints. Changes to a visual's teaching meaning, alternative text, references or accessibility interpretation do alter its fingerprint.

## Review workflow

1. Run the complete validation suite.
2. Regenerate `GOAL9_HUMAN_REVIEW_GATE.md` and `goal9-review-decisions.template.json` with `node scripts/review-batch.js --write`.
3. Give the consolidated packet to the human reviewer. The reviewer records identity consent, attestation, a separate verdict for every asset, reviewed sections, checked evidence and exact corrections.
4. Apply only exact human-approved wording. Preserve rejected suggestions and changes-requested decisions in the audit trail.
5. Regenerate the packet after corrections. The reviewer confirms the final fingerprints unless the exact replacement wording and resulting fingerprint were explicitly approved.
6. Copy only consented public identity fields and completed decisions into `review-data.js`.
7. Run `node scripts/review-governance.js --write` and `node scripts/review-batch.js --write`. Review the generated diff.
8. Run all validators, tests and `git diff --check`. Publication requires normal PR review and green CI.

A second qualified reviewer receives a new reviewer ID and new decision IDs. Do not overwrite an earlier decision. Use `supersededBy` only when a later decision deliberately replaces an earlier decision for the same asset.

AI tools may assemble the packet, calculate fingerprints, detect inconsistencies, verify links and implement exact human-approved corrections. They may not create reviewer identity, consent, attestation or approval decisions, and may not change provenance to `human-submitted` without a supplied human decision.

## Local reproduction

```shell
node --check review-data.js
node --check review-status.js
node --check review-ui.js
node --check scripts/review-governance.js
node --check scripts/review-batch.js
node scripts/review-governance.js --write
node scripts/review-batch.js --write
node --test tests/*.test.js
git diff --check
```

`Clinician reviewed` means only that a consented human physician approved the declared sections of the exact fingerprint shown. It does not mean the content is complete, universally applicable, current forever, or a substitute for individual professional judgment.
