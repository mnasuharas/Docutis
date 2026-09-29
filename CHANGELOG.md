# Changelog

All notable project changes are documented here. Docutis is in active pre-1.0 development; entries describe repository milestones rather than clinically reviewed releases.

## Unreleased

### Goal 15 — Cross-browser UX hardening

- Define the missing `--color-focus`, `--color-surface-subtle`, and `--shadow-sm` tokens so focus outlines, panel backgrounds, and the small shadow are not dropped.
- Keep primary navigation reachable below 900px instead of `display: none`.
- Honor `prefers-reduced-motion` for condition scrolling, and fall back when `focus({ preventScroll })` throws.
- Add a one-sentence no-JS notice for the library, quiz, follow-up, and review counts without copying clinical text.
- Add [BROWSER_COMPATIBILITY.md](BROWSER_COMPATIBILITY.md). No browser core flow was marked verified. Clinical content, review decisions, and fingerprints are unchanged.

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
