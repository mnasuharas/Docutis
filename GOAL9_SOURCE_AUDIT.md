# Goal 9 evidence-source audit

Audit date: 2026-09-20. Scope: the evidence URLs used by the eight structured disease records, eight quiz questions, four original visual assets and three German follow-up protocols. This is an automated and maintainer evidence-preparation audit, not clinical endorsement.

## Resolution and provenance checks

- All 29 unique evidence URLs resolved without a broken link during the audit.
- Official and primary sources include AAD guideline pages, CDC public-health guidance, NCI PDQ, EADO/EDF/EORTC publications indexed by PubMed, the living EuroGuiDerm psoriasis guideline, AWMF documents and Leitlinienprogramm Onkologie guideline documents.
- Seven DermNet pages are used as secondary specialist references for morphology, distribution, dermoscopy or differential-diagnosis context. They are not labelled as primary guidelines.
- Four GitHub URLs identify the repository-native SVG source files; they provide provenance for the original visual assets rather than independent clinical evidence.
- PubMed returned HTTP 203 through the automated client while the PMID landing pages remained resolvable. All other checked URLs returned HTTP 200.
- No unexpected cross-domain redirect was detected.
- The committed source metadata dates are valid and none exceeds the 366-day stale-metadata warning threshold at the audit date.

## Currency observations

- The official German melanoma page still presents S3 guideline version 3.3 as the current guideline in this audit. Its age remains a reason for a human reviewer to confirm that the encoded follow-up schedule is still appropriate.
- The German basal-cell carcinoma source is S2k version 9.0, updated in 2023 and published in the current AWMF document set.
- The German actinic-keratosis/cutaneous-squamous-cell-carcinoma page exposes version 2.0 while retaining older versions in its archive.
- The living EuroGuiDerm psoriasis page reports a September 2023 main version with partial February 2025 updates. A human reviewer must assess whether the specific Docutis claims fall within the currently updated sections.
- The EADO melanoma diagnostic and treatment records are the 2024 updates published in 2025 (PMIDs 39700658 and 39709737).

## Human-review flags

- Section-level mapping proves only that a source is attached to a section; it does not prove that every displayed sentence is supported.
- Dermoscopy and morphology statements that rely on DermNet need explicit clinician adjudication for scope and wording.
- The atopic-dermatitis treatment evidence is adult-focused; pediatric, pregnancy and local formulary scope must not be inferred.
- No structured medication dose or regimen is present in the eight pilot disease profiles. Reviewers must confirm that this omission is clear and safe rather than silently assuming a regimen.
- German follow-up recommendations must remain visibly jurisdiction-specific and must not be blended with international context.
- The four visual assets require separate review of labels, spatial teaching meaning, captions and alternative text. The eight quiz items require separate one-best-answer review.
- No clinical wording was changed automatically as a result of this audit. Potential mismatches or omissions are presented to the human review gate for decision.

## Reproduction

Run `node scripts/review-governance.js` to validate source metadata relationships and freshness, and regenerate the consolidated packet with `node scripts/review-batch.js --write`. Network resolution is intentionally not a CI gate because transient external outages must not create false clinical conclusions.
