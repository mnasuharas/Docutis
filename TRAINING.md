# Mixed-case screening training (Goal 28)

Status: **preview curriculum, review required**. This mode was developed in the stacked Goal 18 to 28 pull requests and is published on `main` and the live site for education only. Publication is not clinical approval or validation. Clinical review remains deferred, and all of its teaching text remains review required.

## What it does

The training shows unknown lesions from the existing case library one at a time. The learner does not know whether the next lesion is benign or malignant, melanocytic or not, at a special site, or a mimic.

For each lesion:

1. **Unknown lesion.** The clinical photograph comes first, with a diagnosis-neutral title and only non-diagnostic context (site, and age band or sex when the source gives them). When only a dermoscopic image is stored, that image is shown and the page says so.
2. **Observe.** The case's own observation prompts, or a short generic set (morphology, symmetry, border, colour, surface, site, visible structures) when the case has none. An optional free-text description stays in the tab.
3. **Working impression.** `Benign-leaning`, `Suspicious`, or `Uncertain`. Optionally a broad lesion family and a working diagnosis from one fixed list that is identical for every lesion, so it cannot point to the answer.
4. **Show dermoscopy.** For cases with both a clinical and a dermoscopic image. It does not reveal the diagnosis. The learner may update the impression.
5. **Reveal.** Only on a deliberate button press. The reveal shows the source diagnosis, the linked record, the recorded case category and pole, the confirmation method, whether histopathology is recorded and how (lesion sentence or study-level methods), the stored notes, and the review status.
6. **Teaching.** The learner's own choices beside the source diagnosis; when the impression and the recorded pole point opposite ways, the stored closest mimic, trap, and why-not lines; synthesis and recorded observations; patterns with certainty and qualitative case weight; for true pairs, *Before dermoscopy*, *Dermoscopy added*, and *Reasoning impact*; closest mimic and stored comparisons; limitations.
7. **Next unknown lesion.** The next lesion is not announced.
8. **Debrief.** Cases reviewed, recorded case categories, benign and malignant contexts, patterns encountered, patterns seen in both poles, where dermoscopy changed the learner's impression, traps, comparisons between lesions of the session, context cases, and patterns worth revisiting.

## What it does not do

- It is not a diagnostic device, a validated screening simulator, an exam, or a certificate.
- It calculates no score, accuracy, sensitivity, specificity, calibration, points, streaks, ranks, or pass mark. The reflection never says correct or incorrect.
- It produces no probability and no disposition. The case records do not store a grounded next-step decision for every eligible case, so disposition choices are deferred. `screening.categories` stays vocabulary only.
- It does not generate clinical text. The engine assembles stored case fields. When a field is missing, that teaching element is omitted.
- It does not store or send anything. Choices live in memory for the open tab only. No account, backend, telemetry, or browser storage.

## Session composition is not prevalence

Sessions are curated for teaching coverage. The composer does not use disease frequency. A session that holds two melanomas in five lesions says nothing about prevalence, screening yield, or predictive value. The page says this on the setup screen, in the session bar, and in the debrief.

The composer (`training-engine.js`, `composeSession`) works like this:

- It draws only from the blueprint's eligible pool.
- At most one case per **source group**: cases that share a source page, a source composite figure (`source sha256` in the crop notes), or an image file. Crops of one figure therefore never appear as independent lesions. Lesion identity across crops comes from source captions, so the engine does not try to prove that two crops are different lesions.
- Benign and malignant lesions each fill about a third of the session or more when the pool allows. Keratoacanthoma, recorded with an uncertain classification, counts toward neither.
- At most a quarter of the session shares one linked diagnosis record.
- Among valid candidates it prefers a new lesion family, site class, modality, difficulty band, diagnostic structure, or closest mimic, with a seeded random tie-break. No learner data enters this choice.
- The order avoids two lesions with the same linked record back to back, three in a row from one pole, and an advanced case first when an easier one is present.
- A seed is used for reproducible tests. It is never shown.

Lengths are 5 (default), 8, and 12 lesions. They are practical options, not a validated dose. The special-sites blueprint offers 5 and 8 because it has 12 distinct source groups.

## Eligibility

`training-engine.js` (`buildEligibility`) sorts each case from stored metadata. `node scripts/training.js --write` writes the read-only [TRAINING_ELIGIBILITY.md](TRAINING_ELIGIBILITY.md). It is a curriculum eligibility call, not a quality score and not a clinical approval status.

**Excluded** (hard integrity failure): no image; an image without a diagnosis-neutral public path; a missing HTTPS source, allowed licence, attribution, or creator; a source that is not `verified`; an identifiable patient flag; missing ground truth or an unknown confirmation method; `histopathologySource` without `histopathology`; or a review status that does not match its review record.

**Context only** (useful, but not a decision anchor):

| Reason | Rule |
|--------|------|
| `no-closest-mimic` | No stored closest mimic or pattern links (the five legacy pilots). The reveal cannot teach mimic and contrast. |
| `nail-weak-verification` | Nail-unit site without histopathology. |
| `equivocal-weak-pair` | Clinical-diagnosis label and a paired view the case itself records as `dermoscopy_remains_equivocal`. |
| `thin-differential` | Fewer than two stored differentials. |
| `pre-reveal-leak` | A stored observation prompt names a diagnosis. |
| `low-resolution` | Smallest image side under 200 px. |
| Curated | `case-g21-01` is a plate of five photographs, not one lesion. |

**Core training**: everything else. Clinical-diagnosis cases are not excluded wholesale. Verification decides eligibility and is taught after reveal. It is not used to rank cases for the learner.

## Nail limitation

The accepted dataset has no histopathology-confirmed nail melanoma with onychoscopy, and the nail haemorrhage labels are weakly verified. The caption-only nail melanoma (`case-g26-07`), the uploader-labelled thumb melanoma (`case-g18-12`), and both nail haemorrhages (`case-g22-01`, `case-g27-06`) are context only. The histopathology-confirmed nail nevi are core. Every nail case carries a nail-unit evidence note after reveal, so nail teaching is never shown as equal in evidence to the acral melanoma cases. The special-sites blueprint may hold one context case, labelled only after reveal so the label cannot give away the answer.

## Blueprints

| Blueprint | Pool |
|-----------|------|
| Mixed screening | All core cases. |
| Melanoma and mimics | Core cases in a melanocytic category, or whose closest mimic or a differential is melanoma. |
| Special sites | Core acral, nail, face, ear, and scalp cases, plus at most one nail context case. |

## Leakage protection

Before reveal the renderer receives only `preRevealView`: position, a title that passes a diagnosis-word check (else "Unknown lesion"), site, age band and sex when they pass the same check, diagnosis-neutral image paths with alt text that passes the check (else a neutral fallback), prompts, and hints. It does not receive the diagnosis, pole, category, closest mimic, patterns, certainty, weight, comparisons, captions, source URLs, presentation notes, or image ids. Comparisons whose other lesion is still ahead in the session are withheld at reveal and appear in the debrief.

## Files

- `training-data.js` — wording, impressions, families, lengths, blueprints, one curation entry, and limitation text. Review required.
- `training-engine.js` — eligibility, composition, pre-reveal and reveal views, debrief. Pure functions; loads in the browser and in Node.
- `training-app.js` — the learner UI (`#trainingModule`).
- `scripts/training.js` — validator and eligibility report (`--write`, `--check`, `--json`).
- `tests/integrated-training.test.js` — focused tests.

## Accessibility and layout

Native buttons, radio groups with legends, labelled text area and select. Show dermoscopy and the hint use `aria-expanded`. Focus moves to the lesion heading, the dermoscopy heading, the source-diagnosis heading, and the debrief heading. Modalities are named in text. No animation. At narrow widths buttons go full width and images stack. Tested in Chromium at about 1280 px and 390 px; other browsers were not tested for this mode.

## Clinical review

Clinical review remains deferred. All new clinical teaching content remains review required. No physician decision was fabricated. The training is an assembly layer and is not registered as its own review unit; each case it shows keeps its own review status, and the five previously clinician-reviewed units are unchanged.
