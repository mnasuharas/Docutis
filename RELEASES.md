# Releases

Docutis has no supported release line beyond the historical tag below. These notes explain how a future preview tag would be cut. They do not create a tag, a GitHub Release, or a version number.

A software release is not clinical validation. Publishing code does not mean the medical content has been clinician reviewed.

## Existing tag

`v0.1.0-preview.1` (2026-09-23) is a historical pre-release on the then-current `main`. Its GitHub Release notes match that commit, including a review count that is no longer true of current `main`. Do not treat those notes as the review state of this branch.

Current public review state, from `review-status.json` on this branch: 28 units, 5 `clinician reviewed`, 23 `review required`, 1 consented public reviewer, 5 decisions, latest valid human review date 2026-09-23. The five reviewed units are the actinic keratosis disease record, the basal cell carcinoma disease record, BCC German follow-up, the BCC dermoscopy quiz item, and the BCC clues schematic.

## Version meaning

Docutis is 0.x while it is a preview. No current version number is chosen for the next tag.

- **Patch** (`0.y.Z`): fixes that do not change the educational scope, such as a broken link in the interface, a layout bug, or a documentation correction that does not change clinical claims.
- **Minor** (`0.Y.z`): backward-compatible preview additions, such as a new educational module that stays review required.
- **Major** (`X.y.z`, including the move from 0.y to 1.0): a maintained compatibility promise, or a change that removes or rewrites behavior users already rely on. 1.0 is not available until maintainers explicitly choose it. It still would not mean that every medical statement has been clinically validated.

Pre-release tags stay marked as pre-releases. Do not label a tag stable, production-ready, complete, or authoritative.

## Before a real preview tag

All of the following are required. None of them is satisfied merely because this file exists.

- Clean validation, including the commands in the README and a clean `git diff --check`.
- No accidental governance invalidation. Generated review artifacts match the validators. No fingerprint was refreshed to hide an edit.
- Changelog describes what the tag actually contains.
- Known limitations are written in the release notes.
- Browser status matches [BROWSER_COMPATIBILITY.md](BROWSER_COMPATIBILITY.md). Do not mark Firefox, Edge, or Safari verified from a Chrome session.
- Clinical-review state matches `review-status.json`. Do not say that all content is clinician reviewed.
- Code license and third-party media attribution are accurate. MIT does not relicense images.
- Release notes are drafted from [RELEASE_NOTES_TEMPLATE.md](RELEASE_NOTES_TEMPLATE.md).
- A human maintainer chooses the version, pushes the tag, and publishes the GitHub Release. That step is separate from merging documentation.

Use [RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md). Leave boxes unchecked until that specific tag is being cut.

## Preview candidate dry run

This is not a release. No version number is chosen.

**Would be included** if a preview tag were cut from current `main` after the OSS documentation in this change:

- The historical `v0.1.0-preview.1` site, plus later `main` work: published AK and BCC clinician-reviewed assets listed above, the five-case trainer, diagnosis concealment until reveal, and the Chrome UX fixes recorded in the changelog.
- These release-readiness documents.

**Still pending, not included:**

- Goal 14 pilot-case wording corrections and the unsigned case review pack. That pull request stays open for later clinician review. It is not merged and not approved.
- Real-browser verification of Firefox, Edge, and Safari.
- Clinician review of the 23 review-required units, including all five cases.
- A chosen version number, tag, and GitHub Release.

**Clinical-review state:** 5 clinician reviewed, 23 review required, of 28 units. Latest valid human review date 2026-09-23. Legacy embedded disease fields remain `clinician review required` for all 50 catalogue records. Automated tests are not clinician review.

**Browser state:** Google Chrome 151 on Linux verified for the core flows at desktop, 768px, and 390×700, with a known minor focus-outline clip on the 390px nav strip. Firefox, Edge, and Safari not verified in those browsers. Not a phone test and not a screen-reader test.

**Limitations:** educational preview, incomplete coverage, not a substitute for care, not validated clinical decision support. Software maturity and clinical-review maturity are different. A future tag must not claim that every medical statement has been clinically validated.

**What remains before a real preview release:** choose a version, finish the checklist against that exact commit, confirm review artifacts and licenses, write notes that match the counts above, and only then tag and publish. Goal 14 is not a blocker for documenting this dry run, and it is not done.
