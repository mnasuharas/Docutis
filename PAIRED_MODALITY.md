# Paired clinical and dermoscopy

Educational only. Not a diagnostic device. Clinical review remains deferred. All new clinical content remains review required.

## Provenance

Every case has one registry row in `DOCUTIS_CASES.pairProvenance`.

| Value | Meaning |
| --- | --- |
| `same_lesion_confirmed` | The source states that the clinical and dermoscopic frames are the same lesion or the same case. |
| `source_documented_pair` | The source documents a paired view, without a sentence that says "same lesion". |
| `not_paired` | One modality, or two images that are not documented as one lesion. |

`case-g21-08` is `source_documented_pair`. Both Wikimedia files cite Sato and Tanaka, Dermatology Practical & Conceptual 2014, DOI 10.5826/dpc.0401a16. Neither file page prints the words "same lesion". The information-gain label is `dermoscopy_adds_support` because the stored dermoscopic observation adds lobules. That label is an educational description, not a validated metric.

`case-g18-10` with `case-g18-11`, and `case-g21-02` with `case-g21-03`, share a diagnosis family and stay `not_paired`.

## Learner flow for a true pair

1. Clinical photograph only.
2. Clinical observations. No diagnosis.
3. Initial differential. No scores.
4. Show dermoscopy. This does not reveal the diagnosis. The clinical photograph stays available. Large screens place the frames side by side. Narrow screens stack them.
5. Dermoscopic observations and the reasoning update, only from stored text.
6. Reveal, then the existing teaching plus a short comparison: clinical clue, dermoscopic clue, added information, diagnostic conflict if one is stored, and a conservative teaching rule.

Modality is written in text. Image marks stay in the context section. Optional localization fields stay empty. No WCAG conformance claim is made.

## Candidates not imported

Wikimedia Commons returned HTTP 429 on download, including one later retry. The files below were not copied. No pixel finding was written from a caption.

- `File:Melanoma_in_situ_Right_Forehead.jpg` and `File:Melanoma_in_situ_Right_Forehead_dermatoscope.jpg` were downloaded on 2026-10-01 after the earlier HTTP 429. CC BY-SA 4.0. The dermatoscope file description documents that view of the forehead lesion. Pixels were inspected. No histopathology sentence was on the page. Integrated as `case-g24-01` with information gain `dermoscopy_remains_equivocal`. Marker ink and tick marks were recorded. A facial network was not named.
- `File:Malignant_Melanoma_Left_Mid_Back.jpg` and `File:Malignant_Melanoma_Left_Mid_Back_Dermatoscope.jpg` were downloaded on 2026-10-01. CC BY-SA 4.0. The dermatoscope description says the view is through a dermatoscope. Pixels were inspected. No subtype, thickness, stage, or histopathology was copied. Integrated as `case-g24-02`, also equivocal.


Also rejected, without a download:

- PLoS ONE 2013 composites of superficial spreading melanoma are dermoscopy, reflectance confocal microscopy, and histopathology. They are not a clinical photograph paired with dermoscopy. Panels were not split. Breslow figures in those descriptions were not copied into a case.
- The eccrine poroma figure (CC BY 4.0) puts a clinical panel and dermoscopic panels in one composite with histopathology. It was not cropped. Eccrine poroma is not a condition record here.
- Tschandl dermatoscopy files for a nevus, an angioma, and a seborrheic keratosis have no clinical partner of the same lesion. The seborrheic keratosis file is already `case-g21-03` and is not paired with `case-g21-02`.
- The acral lentiginous melanoma case already in the library has histopathology from the same paper, not dermoscopy. Those microscopy files were not added as a clinical–dermoscopy pair.
- Raimundo Pastor's intradermal nevus file is dermoscopic only. No same-case clinical file was identified.
- CC BY-SA 3.0, CC BY-NC, unversioned CC, and DermNet were not used.

No facial, acral, or nail clinical–dermoscopy pair was imported. Parallel ridge, furrow, and fibrillar patterns, and Hutchinson sign, were not invented.

## Metrics

`node scripts/paired-modality.js` prints the counts from the registry. Artifacts (ruler, marker, printed arrow, printed circle and scale) do not count as diagnostic structures.

## Goal 24

Clinical review remains deferred. All new clinical content remains review required. `acquisition-ledger.js` records accepted and rejected candidates. It is not a case and it does not change a clinical fingerprint. Rejected candidates are not in the curriculum.

## Goal 25

Six true pairs were added from CC BY 4.0 open-access articles. Four are `same_lesion_confirmed`: the caption groups the clinical and dermoscopic panels as one case or calls the dermoscopic panel the image of the lesion. Two facial cases are `source_documented_pair`: the caption pairs clinical and dermoscopic images by corresponding letters without repeating the clinical letter for each lesion.

`node scripts/paired-modality.js` now also reports:

- Pattern-rich true pairs: a true pair, not labelled `dermoscopy_remains_equivocal`, with at least one case pattern linked to a dermoscopic diagnostic structure at `clearly_visible` or `probably`, recorded on the dermoscopic frame. Image marks, descriptive morphology, and clinical-only looks never qualify.
- Equivocal true pairs: pairs labelled `dermoscopy_remains_equivocal`. The two Goal 24 pairs stay here and are kept because they teach that dermoscopy is not always decisive.
- Pattern-rich and histopathology-confirmed paired melanoma, true paired benign cases, pattern-rich benign pairs, and special-site true pairs (face, acral, nail). Scalp is its own site value and is not counted as face.

These are qualitative curriculum counts, not a score and not mastery. Clinical review remains deferred.

## Goal 26

Seven special-site true pairs were added: four acral and three nail. Five are `same_lesion_confirmed`. The heel melanoma and heel nevus are `source_documented_pair`, because the caption names them by dermoscopic panel letters and pairs the clinical panels by letter order. The paired-metric output now lists 16 true pairs, 14 pattern-rich and 2 equivocal. Absence matters too: the heel melanoma and the heel nevus both record the parallel ridge pattern as not visible, so the curriculum shows that the pattern is a weighted clue rather than an equation.

## Goal 27

Six special-site true pairs were added: four acral and two nail. Four are `same_lesion_confirmed`. The sole nevus cluster is a `source_documented_pair` because its dermoscopic field is not mapped to individual clinical spots, and the nail haemorrhage is one because its caption pairs panels by letter order. The paired-metric output now lists 22 true pairs, 20 pattern-rich and 2 equivocal.

The metric output also prints a per-structure repetition table. A positive observation is a case pattern recorded as clearly visible or probable. An independent positive case is a distinct case id, so two panels or two patterns of one lesion count once. Certainty, benign and malignant poles, true pairs, and histopathology-confirmed cases are listed per structure. These are qualitative counts, not mastery and not a score.
