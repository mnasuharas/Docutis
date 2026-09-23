/* Governed educational media registry. Goal 8 uses project-authored schematics only. */
(function () {
  "use strict";

  window.DOCUTIS_MEDIA = Object.freeze({
    schemaVersion: 1,
    items: Object.freeze([
      Object.freeze({
        id: "melanoma-abcde-schematic", diseaseId: "cutaneous-melanoma", type: "illustration",
        src: "assets/media/melanoma-abcde-schematic.svg", dimensions: Object.freeze({ width: 800, height: 500 }),
        title: "Melanoma ABCDE warning-feature concept", caption: "ABCDE warning features — schematic",
        alt: "Five labelled schematic panels illustrating melanoma asymmetry, irregular border, color variation, diameter context and evolution.",
        diagnosis: "Cutaneous Melanoma", anatomicalSite: null,
        educationalDescription: "A pattern-recognition aid showing that change and the combination of warning features matter more than any single feature. Diameter is presented as context rather than a diagnostic rule.",
        source: "Docutis original schematic", sourceUrl: "https://github.com/mnasuharas/Docutis/blob/main/assets/media/melanoma-abcde-schematic.svg",
        license: "Project-owned", attribution: "Docutis project", patientIdentifiable: false,
        consentBasis: "Not applicable — original schematic with no patient content", metadataCheckedAt: "2026-09-20",
        reviewStatus: "clinician review required", clinicalReview: null
      }),
      Object.freeze({
        id: "bcc-clues-schematic", diseaseId: "basal-cell-carcinoma", type: "illustration",
        src: "assets/media/bcc-clues-schematic.svg", dimensions: Object.freeze({ width: 800, height: 500 }),
        title: "Basal cell carcinoma morphology and dermoscopic clues", caption: "Basal cell carcinoma clues — schematic",
        alt: "Labelled schematic lesion showing a pearly raised border, central ulceration, branching vessels and blue-grey ovoid nests.",
        diagnosis: "Basal Cell Carcinoma", anatomicalSite: null,
        educationalDescription: "A conservative visual summary of commonly described surface and dermoscopic clues; appearances vary by subtype and require clinical-pathologic assessment.",
        source: "Docutis original schematic", sourceUrl: "https://github.com/mnasuharas/Docutis/blob/main/assets/media/bcc-clues-schematic.svg",
        license: "Project-owned", attribution: "Docutis project", patientIdentifiable: false,
        consentBasis: "Not applicable — original schematic with no patient content", metadataCheckedAt: "2026-09-20",
        reviewStatus: "clinician review required", clinicalReview: null
      }),
      Object.freeze({
        id: "psoriasis-distribution-schematic", diseaseId: "plaque-psoriasis", type: "illustration",
        src: "assets/media/psoriasis-distribution-schematic.svg", dimensions: Object.freeze({ width: 800, height: 500 }),
        title: "Plaque psoriasis morphology and typical distribution", caption: "Plaque psoriasis morphology and distribution — schematic",
        alt: "Body outline marking scalp, elbows, knees and lumbosacral skin beside a labelled well-demarcated scaly plaque.",
        diagnosis: "Plaque Psoriasis", anatomicalSite: "Typical distribution overview",
        educationalDescription: "A schematic reminder of common plaque morphology and distribution, with explicit notice that nails, flexures, palms, soles and genital skin may appear differently.",
        source: "Docutis original schematic", sourceUrl: "https://github.com/mnasuharas/Docutis/blob/main/assets/media/psoriasis-distribution-schematic.svg",
        license: "Project-owned", attribution: "Docutis project", patientIdentifiable: false,
        consentBasis: "Not applicable — original schematic with no patient content", metadataCheckedAt: "2026-09-20",
        reviewStatus: "clinician review required", clinicalReview: null
      }),
      Object.freeze({
        id: "acne-lesions-schematic", diseaseId: "acne-vulgaris", type: "illustration",
        src: "assets/media/acne-lesions-schematic.svg", dimensions: Object.freeze({ width: 800, height: 500 }),
        title: "Acne lesion types and inflammatory depth", caption: "Acne lesion types — schematic",
        alt: "Four labelled skin cross-sections showing a closed comedone, open comedone, papule or pustule and deeper nodule.",
        diagnosis: "Acne Vulgaris", anatomicalSite: null,
        educationalDescription: "A non-photographic comparison of common lesion types and increasing inflammatory depth, without assigning a patient-specific severity grade.",
        source: "Docutis original schematic", sourceUrl: "https://github.com/mnasuharas/Docutis/blob/main/assets/media/acne-lesions-schematic.svg",
        license: "Project-owned", attribution: "Docutis project", patientIdentifiable: false,
        consentBasis: "Not applicable — original schematic with no patient content", metadataCheckedAt: "2026-09-20",
        reviewStatus: "clinician review required", clinicalReview: null
      })
    ])
  });
}());
