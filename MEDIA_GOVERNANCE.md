# Educational media governance

Docutis supports optional educational media without making imagery a prerequisite for a complete condition record. The Goal 6 production registry is intentionally empty: no external clinical photograph, dermoscopy image or histopathology image was added because a small, high-value set with independently verified reuse rights was not established within this release.

## Data model

Media lives in `media-data.js`, independently from clinical content in `data.js`. Each item must provide:

- a stable `id` and an existing `diseaseId`;
- a controlled `type`: `clinical-photo`, `dermoscopy`, `histopathology`, `diagram`, `illustration` or `procedure`;
- an HTTPS URL or safe local `assets/media/` path in `src`;
- intrinsic pixel `dimensions` to reduce layout shift;
- `caption`, `alt`, `diagnosis`, `educationalDescription` and optional `anatomicalSite`;
- explicit `patientIdentifiable: false` and a documented `consentBasis`, including a clear not-applicable basis for non-patient diagrams;
- `source`, controlled `license`, `attribution`, HTTPS `sourceUrl` and independent `metadataCheckedAt` date;
- `reviewStatus` and `clinicalReview` metadata governed independently from the condition record.

Allowed license values are `CC BY 4.0`, `CC BY-SA 4.0`, `CC0 1.0`, `Public domain` and `Project-owned`. An external URL cannot claim the `Project-owned` license. A page being publicly visible is not evidence that an image can be reused.

## Review and fingerprints

Every new media item starts as `clinician review required` with `clinicalReview: null`. A physician-reviewed media item requires a review date, physician role, specialty and a matching deterministic media fingerprint. The fingerprint includes clinically meaningful presentation, diagnostic, source, license and attribution metadata but excludes the source metadata-check date and review metadata.

Media is deliberately separate from `data.js`, so adding or changing an image does not silently invalidate the clinical-text fingerprint for a disease. It instead invalidates the media item's own review fingerprint. This keeps the existing clinical governance intact while preventing reviewed media metadata from becoming stale.

Run `node scripts/media.js` before proposing a media change. Automated validation cannot establish consent, de-identification, clinical representativeness, authorship or license validity; those remain human review responsibilities.

## Display behavior

Condition details render an Educational media section only when validated media exists for that disease. Images load lazily, declare intrinsic dimensions, include descriptive alt text and show caption, educational purpose, source, license, attribution, metadata-check date and review status. A failed image load is hidden and replaced by a readable unavailable-state message while provenance remains visible. Conditions without media do not render an empty gallery.

## Contribution checklist

Before adding media, confirm all of the following:

1. The image materially improves dermatology education.
2. The source is authoritative and the reuse license explicitly permits repository and public-site use.
3. Required attribution is accurate and complete.
4. The image contains no patient-identifiable information: `patientIdentifiable` is explicitly `false`, and the consent, institutional permission or non-patient origin is recorded in `consentBasis`.
5. The caption and alt text are descriptive without asserting an unsupported diagnosis.
6. The diagnosis mapping and educational description receive clinical review.
7. The source URL, license evidence and metadata date are recorded in the pull request.

Never scrape images, copy from search results, infer a license, or mark media clinician reviewed because automated tests pass.
