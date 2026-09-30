# What makes a Learn Melanoma case good enough

This note is for people adding or editing academy cases. It is not evidence that the pathway teaches well, and it is not a numeric score.

## Good enough for the primary path

A primary-path case has all of the following, checked by `primaryPathGate` in `scripts/case.js`:

- A real source and a local image with an allowed license.
- At least two observations and a differential.
- A skill assignment that is not a copy of another pathway case's skill list. The 19 skills are a taxonomy, not a checklist of melanoma structures. An empty `dermoscopicFeatures` array is valid.
- Honest review status. New and changed teaching stays `clinician review required` with `clinicalReview: null`.
- A teaching type: `teaching`, `reasoning`, or `expert-challenge`. The type is the shape of the lesson. It is not the diagnosis and it may be shown before reveal.

Academy cases (the Goal 18 additions) also need:

- Two observation prompts that do not name the recorded diagnosis, and at most two hints with the same limit.
- Each pattern labeled with certainty (`clearly_visible`, `probably`, `uncertain`, `not_visible`) and qualitative weight (`major`, `supportive`, `weak`, `conflicting`). Do not write a sensitivity, a specificity, a likelihood ratio, or a percent.
- One closest mimic, with why it fits and why it does not replace the source.
- A take-home rule for a teaching case, or a trap plus evidence weighting for a reasoning or expert-challenge case.
- A management brief that stays marked review required and is not a protocol.

Legacy pilots that were already on the path are not given these new fields. Adding them would change governed fingerprints. They meet the gate through the observations and teaching points they already had.

Cases that fail the gate may remain in the library. They should not be added to the primary path just to increase the count. Actinic keratosis field change and the squamous cell carcinoma case stay outside Learn Melanoma.

## What was not upgraded

Many pathway photographs are public-domain catalog images with a short caption and no history. That weakness is real. Teaching text was tightened only where the image and the caption already support it.

- Confirmation methods were not upgraded. `clinical_diagnosis` stays `clinical_diagnosis`. Histopathology was not added.
- No Breslow thickness, histologic subtype, or stage was invented.
- Dermoscopic structures were not named unless the existing observation already recorded them. A soft photograph does not gain vessels.
- No seborrheic keratosis, dermatofibroma, or lentigo maligna case was added. Those disease records were not used as an excuse to invent an image.
- Level 5 stays one case: nail-unit damage with a thin clinical label. A second advanced case was not invented.
- No educational-efficacy claim is made.

## Lesson shape

Use `teaching` when the learner should name one visible clue and then read the source. Use `reasoning` when the work is to separate what the frame shows from what it cannot show. Use `expert-challenge` when the source itself is thin or the clue is easy to over-read. Do not use the type as a difficulty badge or a point value.

Pull request #21 was not the base of this work. Goal 18 pull request #24 was not merged. This note does not approve any case.
