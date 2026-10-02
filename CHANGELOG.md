# Changelog

All notable project changes are documented here. Docutis is in active pre-1.0 development; entries describe repository milestones rather than clinically reviewed releases.

## [Unreleased]

These entries are on the stacked development branch and are not merged to `main`.

### Goal 28 — Integrated Hautkrebsscreening training

- Add mixed-case screening training (`training-data.js`, `training-engine.js`, `training-app.js`, `#trainingModule`): unknown lesions one at a time, observation prompts, a working impression (benign-leaning, suspicious, uncertain), optional lesion family and working diagnosis from one fixed list, staged dermoscopy with an optional updated impression, a deliberate reveal of the source diagnosis, verification method and histopathology status, stored patterns, mimic and comparison teaching, limitations, and a qualitative debrief.
- Add a machine-readable eligibility audit: 39 core training, 12 context-only, 0 excluded of 51 cases. The caption-only nail melanoma, the thumb melanoma, both nail haemorrhages, the two equivocal clinical-diagnosis pairs, the five legacy pilots, and the five-photograph plate are context only, with reasons.
- Add three blueprints and a constrained composer that takes at most one case per source group and is not prevalence-based. Comparisons with a lesion still ahead in the session are withheld until the debrief.
- Add `node scripts/training.js` (validator, `--write`, `--check`, `--json`), the generated `TRAINING_ELIGIBILITY.md`, `TRAINING.md`, and focused tests.
- No score, probability, disposition, or pass mark. Choices stay in memory for the open tab. No case, image, or clinical claim was added. Clinical review remains deferred. No release was published.

### Goal 27 — Acral and nail pattern repetition

- Add six clinical and dermoscopic pairs from CC BY 4.0 open-access articles: a cluster of sole nevi with a furrow pattern (histopathology from a later biopsy, timing recorded), a sole nevus with a furrow pattern verified by five years of stability, a palm melanoma in situ with a furrow pattern and an eccentric blotch, a heel melanoma in situ with a ridge pattern (histopathology in the figure caption), an adult nail matrix nevus with regular lines (histopathology in the figure caption), and a subungual haemorrhage with onychoscopy labelled by a review caption. Panels were cropped from composite figures with recorded boxes and hashes; for lossless PDF images the source hash is taken over the decoded pixel buffer.
- Add the parallel furrow pattern as a dermoscopic structure, linked in benign and malignant cases. The parallel ridge pattern gains an independent second positive case. Ridge and furrow stay probable unless pores or scale resolve the anatomy; only the palm frame resolves pores.
- Report positive observations and independent positive cases separately per structure in `node scripts/paired-modality.js`.
- Record 40 Goal 27 ledger candidates, including two revisits of earlier rows. No histopathology-confirmed nail melanoma with onychoscopy was found under an allowed license.
- All new content stays review required. No clinician review was recorded. No release was published.

### Goal 26 — Acral and nail contrastive dermoscopy

- Add seven clinical and dermoscopic pairs from CC BY 4.0 open-access articles: a heel melanoma and a heel nevus from one figure (study-level histopathology), an acral lentiginous melanoma in situ with an irregular stroke pattern, an acral subcorneal haematoma confirmed by resolution at follow-up, two childhood nail-band nevi with histopathology in the case text, and an adult great-toenail melanoma labelled by a peer-reviewed caption. Panels were cropped from composite figures with recorded boxes and hashes.
- Add `histopathologySource: "case_text"` for a lesion-specific histopathology sentence in the article body, and a `revisitsCandidateId` link so ledger rows show why a deferred candidate became accepted or stayed deferred.
- Add four dermoscopic structures (fibrillar pattern, irregular acral pigmentation, longitudinal pigmented lines in the nail plate, red to black structureless blood area). Nail-plate destruction gains a second example. The parallel ridge pattern is recorded as not visible or uncertain where it cannot be seen, and no Hutchinson sign, migration, or change is claimed from a single frame.
- All new content stays review required. No clinician review was recorded. No release was published.

### Goal 25 — Gold-standard dermoscopy curriculum

- Add six clinical and dermoscopic pairs from CC BY 4.0 open-access articles, each with a histopathology statement: melanoma in situ and a nevus with cytologic atypia from one figure, an amelanotic nodular melanoma of the scalp, an acral melanoma in situ of the heel, and a periorbital lentigo maligna and solar lentigo from one figure. Panels were cropped from composite figures; the pixel box and hashes are recorded and rechecked.
- Add `histopathologySource` (`figure_caption` or `article_methods`) so a study-level statement is not presented as a per-lesion report.
- Add four dermoscopic structures (atypical pigment network, parallel ridge pattern, gray dots around follicular openings, facial pseudo-network) after checking the existing library and aliases. Mixed vessels gain a second example. Rhomboidal structures, ulceration, and dots-and-globules were not created from captions or single weak examples.
- Extend the acquisition ledger with 31 Goal 25 candidates, two new statuses, and pattern-rich and equivocal pair metrics. Scalp is no longer counted as face.
- All new content stays review required. No clinician review was recorded. No release was published.

### Goal 24 — Evidence-grade case acquisition

- Add two source-documented clinical and dermoscopic melanoma pairs whose confirmation stays at the Commons file label, and the first acquisition ledger. No histopathology was claimed. No release was published.

### Goal 23 — Paired clinical and dermoscopy

- Add an explicit pair-provenance registry: `same_lesion_confirmed`, `source_documented_pair`, or `not_paired`. Same diagnosis is not a pair. The chest case report stays the only true pair, as a source-documented pair, and gains a staged clinical-then-dermoscopy flow. Show dermoscopy does not reveal the diagnosis.
- No new image was imported. Candidate paired files could not be downloaded after a Wikimedia 429 and one retry, so no findings were invented. Localization stays empty. No clinician review was recorded. No release was published.

### Goal 22 — Diagnostic signal and dermoscopy depth

- Every reusable feature now has an educational role: diagnostic structure, descriptive morphology, contextual feature, or image mark. Marker ink and a measuring scale stay in the library and no longer increase diagnostic breadth, contrastive coverage, or dermoscopy coverage.
- Learner and reviewer views separate clinical morphology, dermoscopic structure, and context or image information. Paired cases name a clinical view, a dermoscopic view, and an integration sentence. Localization fields stay empty.
- One new case: subungual haemorrhage, clinical photograph, CC BY-SA 4.0, uploader clinical label, review required. Histopathology-confirmed melanoma remains the plantar case only. No clinician review was recorded. No release was published.

### Goal 19 — Professional case teaching system

- Label each Learn Melanoma case as a teaching case, a reasoning case, or an expert-challenge case. The label is not a diagnosis and is not a score.
- Add observation prompts, optional hints, feature certainty and qualitative weight, and a closest mimic to the 16 academy cases. The five pilot clinical payloads were not edited.
- Add a qualitative primary-path gate and `ACADEMY_AUTHORING.md`. The gate is not a numeric score and does not claim educational efficacy.
- Add `academy-review.html`, generated from case data, labeled review required. No clinician review was recorded. Management briefs were not rewritten. Confirmation methods were not upgraded.
- Reorder level 4 so the pink nodule is practiced before its dermoscopic counterpart. Case count, spectrum mix, and level sizes are unchanged. Level 5 remains one case.
- No release tag was created. Pull request #21 was not the base. Goal 18 pull request #24 was not merged.

## [0.2.0-preview.1] — 2026-09-30

Entries under this heading are repository changes after the historical tag `v0.1.0-preview.1` (2026-09-23), unless a bullet says the work is still pending. This heading is pre-release `v0.2.0-preview.1`. It is not a GitHub Release by itself and it is not clinical validation.

### Added

- Case trainer: five open-license pilot cases with inspect, observe, differential, reveal, and review steps. No case is clinician reviewed.
- Release-readiness documents: `RELEASES.md`, `RELEASE_CHECKLIST.md`, and `RELEASE_NOTES_TEMPLATE.md`.

### Changed

- Diagnosis concealment: before reveal, case images use diagnosis-neutral public filenames, image descriptions omit diagnosis variants, and diagnosis-bearing source links stay off the controls. Revealing a diagnosis is not clinician review.

### Fixed

- Cross-browser UX on the recorded Chrome session: missing focus, surface, and shadow tokens; primary links stay available below 900px; at 600px and below those links sit on their own row; reduced-motion scrolling; a focus fallback when `preventScroll` throws; one-sentence no-JavaScript notices that do not copy clinical text.

### Documentation

- [BROWSER_COMPATIBILITY.md](BROWSER_COMPATIBILITY.md) records what was actually run. Google Chrome 151 on Linux was verified at desktop, 768px, and 390×700, including a 390×700 retest after the header fix. Firefox, Edge, and Safari were not run in those browsers.
- Contributor and release documents now separate software preview status from clinical-review status, and separate the MIT code license from per-image licenses.

### Clinical governance

- Public review state remains 28 units: 5 `clinician reviewed` (actinic keratosis disease, basal cell carcinoma disease, BCC German follow-up, BCC dermoscopy quiz item, BCC clues schematic) and 23 `review required`, with latest valid human review date 2026-09-23. This changelog does not add a decision.
- Goal 14 pilot-case clinician review is pending and deferred. It is not merged, not imported into this branch, and not an approval. Do not read any bullet here as Goal 14 sign-off.

### Goal 18 — Melanoma clinical case academy

- Add a Learn Melanoma pathway with five levels, a skills taxonomy, and curriculum order. It is not a certificate, not a score, and not a diagnostic device.
- Add 16 source-labeled cases (public domain or CC BY 4.0) on diagnosis-neutral filenames. Thirteen pathway entries are melanoma-spectrum and six are mimics, including three existing pilots. Two existing pilots stay outside the pathway.
- No new case is clinician reviewed. The five pilot clinical payloads and fingerprints were not edited. Histopathology was not claimed for the new cases because the reused captions did not state it. No educational-efficacy claim is made.
- No GitHub release or tag was created. Pull request #21 was not merged and was not the base of this work.

### Earlier unreleased milestone notes

### Goal 15 — Cross-browser UX hardening

- Define the missing `--color-focus`, `--color-surface-subtle`, and `--shadow-sm` tokens so focus outlines, panel backgrounds, and the small shadow are not dropped.
- Keep primary navigation reachable below 900px instead of `display: none`.
- At 600px and below, put those links on their own row so the GitHub link and preview pill cannot cover them or widen the page.
- Honor `prefers-reduced-motion` for condition scrolling, and fall back when `focus({ preventScroll })` throws.
- Add a one-sentence no-JS notice for the library, quiz, follow-up, and review counts without copying clinical text.
- Add [BROWSER_COMPATIBILITY.md](BROWSER_COMPATIBILITY.md). Chrome 151 desktop, 768px, and 390×700 flows that were actually run are marked verified. Firefox, Edge, and Safari are not marked verified. Clinical content, review decisions, and fingerprints are unchanged.
- Chrome 151 retest at 390×700 after `6579485` passed; the nav strip clips the top and bottom of the focus outline and that was left unchanged.

### Goal 13 — Diagnosis concealment

- Keep diagnosis-bearing filenames, image text, confirmation lines, and source links hidden until the learner reveals the diagnosis. Public case image paths are diagnosis-neutral. Clinical wording, review decisions, and fingerprints were not edited for that concealment work.

### Goal 12 — Case learning UX

- Step the five existing pilot cases through inspect, observe, differential, reveal and review, with view-only image zoom, separated observations and interpretations, an unscored differential disclosure and an explicit diagnosis reveal.
- Keep every pilot case `clinician review required`. No new cases, images, licenses or clinical claims were added.

### Goal 11 — Case-based learning foundation

- Add structured case registry (`case-data.js`), progressive-disclosure case UI, offline validator/fingerprint helper and contributor schema/licensing docs.
- Extend Goal 9 governance with independent `case` review units; all new pilots start as review required (AI interpretation is not clinician review).
- Add open-license pilot cases covering acral melanoma, BCC (nodular and pigmented dermoscopy), actinic keratosis field cancerization and cSCC with adjacent AK.

### Post–Goal 10 clinical attestation merges (factual)

- Publish genuine physician decisions for actinic keratosis and basal cell carcinoma disease records.
- Publish independent clinician-reviewed decisions for BCC German follow-up, BCC dermoscopy quiz item and BCC clues schematic (fingerprints unchanged from attestation PRs).

### Goal 10 — Public OSS surface

- Add discoverable GitHub, Contributing, Roadmap, Changelog and Releases links in navigation/footer.
- Add an About / project-status section stating public preview, pending clinical review, and non-CDS limitations.
- Add “Suggest a correction” and “Report outdated evidence” CTAs on condition details and the clinical review area, deep-linking to the clinical content issue form.
- Keep review-status panels collapsed by default; do not fabricate clinician review.

### Goal 9 — Human Clinical Review Pilot infrastructure

- Add a public human-review decision schema and generated machine-readable status.
- Add section-level review scope, independent asset states, invalidation and superseded history.
- Add a consolidated 23-unit human-review gate and evidence-source audit.
- Add public review panels and expanded dashboard counts without claiming any completed clinician review.

### Goal 8 — Clinical Review Readiness & Visual Learning Pilot

- Add a public evidence-status dashboard with data-derived review counts.
- Add section-level evidence maps for the eight structured pilot records.
- Add four original, governed SVG learning schematics.
- Add an eight-question, dependency-free clinical-pattern quiz.
- Add URL-addressable condition details and browser history behavior.
- Add a physician review worksheet and community health files.

Clinical content remains educational draft material unless a matching public Goal 9 physician decision or genuine embedded physician metadata states otherwise. Historical Goal 8–10 changelog bullets above describe their original landings; later AK/BCC attestations and Goal 11 are recorded in the sections above.

## 2026-09-17

- Goal 7 introduced the optional structured clinical profile, eight pilot migrations and content-quality audit.
- Goal 6 introduced the clinical UX refresh and governed media architecture.
- The initial 50-condition milestone and GitHub Actions validation were completed in earlier goals.
