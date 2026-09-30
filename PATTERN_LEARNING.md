# Case-first pattern learning

Cases stay the learning unit. A learner meets a lesion first, then a pattern that is actually encoded on that case. The pattern library explains the look. It does not replace the case, and it is not a catalog the learner is meant to study before any case.

This note is for contributors. It is not evidence that the pathway teaches well, and it is not clinician review.

## What belongs where

- The case owns visibility, certainty, weight, and the wording tied to that image.
- The pattern owns the reusable meaning: what the look usually is, what to look for, where it can occur, what can mimic it, and what it does not prove.
- A pattern object must not say that a pattern is definitely present in a particular image. `clearly_visible`, `probably`, `uncertain`, and `not_visible` stay on the case pattern. `major`, `supportive`, `weak`, and `conflicting` stay on the case pattern. Those are the Goal 19 words. Do not invent a second scoring system.
- `usualRole` on a pattern is only the usual teaching role (`characteristic`, `supportive`, `weak`, `conflicting`, `nonspecific`, or `context-dependent`). The screen labels it as not this case's weight.

## How to reference a canonical pattern

Do not copy the teaching paragraph into the case. Add a row to `links` in `pattern-data.js`:

```js
{ casePatternId: "pat-example", canonicalId: "notched-border" }
```

`casePatternId` must already exist on a case. `canonicalId` must exist in `patterns`. Unknown ids fail `node scripts/pattern.js`.

If an observation is not a reusable visual pattern, add it to `unlinkedObservations` with a reason. Silence is not allowed: every case pattern id is either linked or explicitly unlinked.

The link is not stored inside `case-data.js`. That keeps Goal 11 pilot fingerprints and the published case fingerprints stable. The pattern library has its own fingerprint. Changing a link changes that fingerprint.

## How linked cases are derived

Nothing in the pattern object lists case ids by hand. `deriveOccurrences` in `scripts/pattern.js` joins:

1. `links` to the case pattern with that id, and copies that case's certainty and weight.
2. `dermoscopicTokenLinks` to `dermoscopicFeatures[].token`, only when the token is really on the case.

If the same case already has a case-pattern link, the token is recorded on that occurrence and is not counted twice. `structureless_areas` is not linked, because the current cases use that token for more than one look.

A diagnosis alone never creates a link. Unrated pilot tokens are not called clearly visible.

## How sources are recorded

Each pattern has `sourceIds` that resolve in the `sources` catalog, plus `supports` and `limitsOfClaim`. Cite a source only for a claim that source, or the Docutis disease record which already cites it, actually supports. Say so in `limitsOfClaim`.

Frame artifacts may use the project teaching note, because they are marks in the file rather than skin findings. Skin patterns need a guideline, review, or other non-project source already used in the repo. New outside sources are not required for this layer.

Pattern text is review required. `clinicalReview` stays `null`. Do not mark a pattern clinician reviewed in data.

## How coverage is calculated

`node scripts/curriculum-coverage.js` prints a qualitative audit.

An independent example is a case where the pattern is encoded with certainty `clearly_visible` or `probably`, or as an unrated structured token. `uncertain` and `not_visible` are reported and are not examples.

- `missing`: no independent example
- `single_example`: one example
- `limited_variation`: two or more examples with the same diagnosis label and no contrastive pair
- `multi_context`: two or more examples with different diagnosis labels
- `contrastive_coverage`: two or more examples and one case's stored closest mimic names the other case's diagnosis

`broadCoverage` is true only for `multi_context` and `contrastive_coverage`. One example is never broad coverage. The classifier always sets `mastery` to false. Coverage is not a numeric score and is not adequate repetition.

If a field cannot be derived, the audit says unknown or not stored. Do not guess a site, a subtype, or a verification method.

## Why one exposure is not mastery

A single clear photograph does not teach a pattern across mimics, sites, or levels of certainty. The learner screen says this when a pattern has no second case. Do not add filler links to cases that do not encode the pattern.

## How to add a future benign mimic case

Add the case the same way as any other case: real source, local image, allowed license, observations before interpretations, honest confirmation method, `clinician review required`, `clinicalReview: null`. Do not invent Breslow thickness, stage, subtype, or histology.

Then add case pattern rows with certainty and weight, and link those ids to existing canonical patterns when the image really shows them. If the benign case is the mimic a melanoma case already names, the coverage classifier can reach `contrastive_coverage` only after both sides are encoded. Do not rewrite the melanoma diagnosis label to force that match.

Benign lesions are part of screening teaching. Goal 21 added sourced seborrheic keratosis, solar lentigo, common acquired nevus, blue nevus, cherry angioma, and sebaceous hyperplasia cases. Dermatofibroma, lichenoid keratosis, a benign acral melanocytic lesion, and subungual haemorrhage are still absent. Filling a remaining gap takes a sourced case, not a sentence in this file.

## Governance

Goal 9 public assets are disease, quiz, visual, follow-up, and case. Adding a pattern asset type would republish that catalog and the asset-count checks. The smallest safe place for pattern text is this library: same review words, its own fingerprint, and a validator that refuses clinician-reviewed status. Patterns are not in `review-status.json`.

## Checks

```sh
node scripts/pattern.js
node scripts/curriculum-coverage.js
node scripts/case.js
node scripts/academy-review.js --check
node --test tests/pattern-learning.test.js
```

`node scripts/case.js` also runs the pattern validator. None of these checks approve clinical content.
