# Release checklist

Copy this list into the pull request or the release notes when a human is actually cutting a tag. Do not check items because this file was added. Every box below is open.

Version being cut: _not chosen_

- [ ] Version number follows [RELEASES.md](RELEASES.md). 0.x stays a preview. No number has been chosen for the next tag.
- [ ] `node` syntax checks from `.github/workflows/validate.yml` pass.
- [ ] `node scripts/clinical-review.js --validate` passes.
- [ ] `node scripts/clinical-schema.js`, `node scripts/follow-up.js`, `node scripts/media.js`, `node scripts/quiz.js`, and `node scripts/case.js` pass.
- [ ] `node scripts/review-governance.js` passes, and `--write` plus `node scripts/review-batch.js --write` produce no unexpected diff.
- [ ] `node --test tests/*.test.js` passes.
- [ ] `git diff --check` passes.
- [ ] No clinical fingerprint or review decision changed unless a physician attestation for that exact version is in the same change.
- [ ] [CHANGELOG.md](CHANGELOG.md) describes this tag and does not claim pending work.
- [ ] Limitations, including incomplete coverage and non-decision-support status, are in the release notes.
- [ ] Browser section matches [BROWSER_COMPATIBILITY.md](BROWSER_COMPATIBILITY.md). Chrome-only verification is not copied onto Firefox, Edge, or Safari.
- [ ] Clinical-review counts match `review-status.json` on the tagged commit.
- [ ] MIT is named for code only. Image licenses and attribution match the asset records.
- [ ] Notes use [RELEASE_NOTES_TEMPLATE.md](RELEASE_NOTES_TEMPLATE.md) and do not say that all medical content is clinically validated.
- [ ] Tag and GitHub Release are created only after the items above, by a maintainer, and are marked as a pre-release while the project is 0.x.

The documents in this repository do not complete any item on this list.
