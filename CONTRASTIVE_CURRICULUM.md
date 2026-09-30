# Contrastive curriculum (Goal 21)

This note records what was added, what was refused, and what the coverage words mean. It is not a claim that Docutis is sufficient for independent diagnosis. It is not clinician review. Clinical review stays deferred.

## What was added

Eight cases, only where an image met the license list in [CASE_LICENSING.md](CASE_LICENSING.md):

| Case | Diagnosis label as supported | Pole | Verification | License |
| --- | --- | --- | --- | --- |
| Five looks in one teaching plate | Common acquired nevus | benign | source dataset diagnosis | Public domain, NCI via Commons `File:Normal_mole_(1).jpg` |
| Rough brown papule | Seborrheic keratosis | benign | clinical diagnosis | CC BY-SA 4.0, Assafn, `File:Seborrheic_keratosis_closup.jpg` |
| Ridged surface under a dermatoscope | Seborrheic keratosis | benign | clinical diagnosis | CC BY-SA 4.0, Philipp Tschandl, `File:Dermatoscopy_SebK.jpg` |
| Many brown spots on the back of a hand | Solar lentigo | benign | clinical diagnosis | CC BY-SA 4.0, Alain Gérard, `File:Lentigo_sénile.jpg` |
| Two bright red papules | Cherry angioma | benign | clinical diagnosis | CC BY-SA 4.0, Assafn, `File:Cherry_angioma_closeup.jpg` |
| Small blue spot under hair | Blue nevus | benign | clinical diagnosis | CC0 1.0, Nictitate, `File:Blue_nevus.png` |
| Brown patch with ink dots | Lentigo maligna melanoma | malignant | expert diagnosis | CC BY-SA 4.0, Dermanonymous, cheek file |
| A group of papules on the chest | Sebaceous hyperplasia | benign | expert diagnosis | CC BY 4.0, Sato and Tanaka, DPC 2014, two Commons files |

Benign labels that are not in the locked 50-condition catalog are teaching diagnoses, not monographs. Lentigo maligna melanoma uses the existing condition id and is not a new monograph.

## What was not added

No usable file was found under the license policy for lichenoid keratosis / LPLK, dermatofibroma, a benign acral melanocytic lesion, or subungual haemorrhage. Those diagnoses stay absent.

Rejected rather than weakened:

- A full-face seborrheic keratosis photograph was not used because the face is identifiable.
- An empty-description public-domain seborrheic keratosis file was not used.
- A hair-occluded dermatofibroma file was not used because the teaching structure could not be seen.
- Dermatofibroma, nail, and acral-nevus files that were only CC BY-SA 3.0 were not used. CC BY-SA 3.0 is not on the allowed list.
- A blue nevus photograph with marker ink and heavy compression was not used.
- A cherry angioma file that carried location metadata was not used.
- Lichen planus was not relabeled as lichenoid keratosis.
- DermNet was not used. Publicly viewable is not the same as reusable.
- No generic melanoma image was relabeled to fill early, in situ, nodular, hypomelanotic, amelanotic, or nail slots.

## Limits that stay in the cases

- The NCI mole plate is five panels, not one lesion. Junctional, compound, and dermal words in the source caption are not re-verified here. There is no slide in the file.
- The dermoscopic seborrheic keratosis was not upgraded from clinical diagnosis to expert diagnosis. Comedo-like openings and milia-like cysts were not encoded.
- The solar lentigo photograph does not clear every macule on the hand.
- The blue spot has hair across the border. No subtype was assigned.
- The cheek patch is small. The source says lentigo maligna melanoma marked for biopsy. That is not histopathology and not in situ.
- The sebaceous hyperplasia pair includes a nipple in the clinical frame, not a face. The journal sentence on the file is unversioned; the Commons tag used here is CC BY 4.0. Vessels in the caption were not counted.

## Compare with

Pairs are stored in `comparisons` and referenced by `compareWith`. The learner sees the offer only after reveal. Buttons use the other case's diagnosis-neutral title. A null discriminator stays null. No probability is stored.

`proposedProgression` names tracks only where cases exist. Screening integration has categories and no cases. It is not the learner path.

## Coverage words

`node scripts/curriculum-coverage.js` prints qualitative statuses. `contrastive_coverage` means the classifier found a closest-mimic string that matches another case's diagnosis label. That can mark a measuring scale as contrastive because the seborrheic keratosis case names cutaneous melanoma as its closest mimic and another case has that label. The scale is not the clinical discriminator. `mastery` stays false. One example is not mastery. A benign label is not a guarantee.
