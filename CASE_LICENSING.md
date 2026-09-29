# Case image licensing

Case images must use one of the Docutis-allowed redistribution licenses:

- `CC BY 4.0` — https://creativecommons.org/licenses/by/4.0/
- `CC BY-SA 4.0` — https://creativecommons.org/licenses/by-sa/4.0/
- `CC0 1.0` — https://creativecommons.org/publicdomain/zero/1.0/
- `Public domain`
- `Project-owned` (original Docutis assets only; never for external URLs)

**Do not** import `CC BY-NC`, `CC BY-NC-ND`, DermNet watermarked educational terms, or unversioned “CC-BY” claims without an explicit 4.0 deed. Prefer fewer pilots over expanding governance for NC content.

## Provenance requirements

For every image record:

1. Capture the Commons/publisher page URL as `sourceUrl`.
2. Record creator, license, license URL, attribution text and whether attribution is required.
3. Set `sourceVerificationStatus: "verified"` only after a human re-check of the license page.
4. Set `patientIdentifiable: false` only when the educational use is non-identifying; document `consentBasis` (publication consent, open-access paper statement, clinician own-work non-patient schematic, etc.).
5. Prefer unmodified bytes. If resized/recompressed for web delivery, set `modificationStatus: "other-described"` and explain in `modificationsNotes`. Share-alike obligations apply to adaptations of CC BY-SA works.
6. Store files under `assets/media/cases/` with stable filenames.

Code remains MIT; **each image retains its own license**. Display attribution and license in the case UI.
