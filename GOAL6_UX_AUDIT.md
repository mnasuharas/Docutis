# Goal 6 clinical UX audit

This audit records the pre-change observations and the bounded decisions used for the Goal 6 release. It is not a clinical-content review.

## Initial findings

- The application was functional and accessible, but its centered landing presentation used substantial vertical space before exposing the clinical library.
- The visual system relied on repeated literal colors, radii and margins rather than a small semantic token set.
- Condition cards were readable but visually uniform; category, summary and coding information competed for attention.
- Disease details were one long undifferentiated column. There was no internal navigation, and primary clinical sections, coding metadata and references had similar visual weight.
- Source metadata was traceable but expanded by default, creating a long reading surface for records with several references.
- Search had strong matching coverage but no visible clear action or keyboard shortcut. Filter labels did not expose category counts, and mobile wrapping consumed substantial vertical space.
- The follow-up module was clinically structured, but its controls and recommendation cards were not fully aligned with the rest of the page's spacing and surface system.
- Responsive rules covered a single narrow breakpoint. Tablet and wide-desktop behavior depended mostly on fluid defaults.
- There was no media schema, license gate, independent media review state, renderer or failure fallback.

## Implemented decisions

- Keep the existing Arial/Helvetica system stack to avoid a network dependency and preserve fast GitHub Pages rendering.
- Introduce semantic color, surface, border, status, radius and spacing tokens while retaining accessible contrast and the calm green Docutis accent.
- Make the header and page introduction more compact and clinical; expose current record, category and follow-up coverage without marketing claims.
- Add a search clear action, `/` focus shortcut, category counts, a stronger no-result state and horizontally scrollable mobile filters without changing the search algorithm.
- Preserve all condition text and restructure only its presentation: overview, clinical features, dermoscopy, differential diagnosis, treatment, follow-up, coding and sources receive stable anchors and clearer visual grouping.
- Keep clinical sections open for rapid vertical scanning. Only the secondary full source list uses progressive disclosure.
- Preserve the existing follow-up data and renderer semantics while aligning controls, modality cards, context and provenance with the design system.
- Add independent optional media data and governance. Do not add a pilot image merely to populate the framework.
- Use lazy loading, intrinsic dimensions, descriptive alt text, visible provenance and a readable image-load failure state when media is eventually present.

## Boundaries

Goal 6 does not change disease text, coding, references, follow-up schedules, review statuses or clinical fingerprints. It adds no framework, build tool, analytics, external font, icon dependency or runtime package. Dark-mode-ready semantic tokens are present, but a dark-mode interface is intentionally deferred until it can receive a full contrast and visual audit.
