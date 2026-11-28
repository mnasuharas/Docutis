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
      }),
      Object.freeze({
        id: "mis-thigh-clinical", diseaseId: "cutaneous-melanoma", type: "clinical-photo",
        src: "assets/media/cases/case-33-clinical.jpg", dimensions: Object.freeze({ width: 361, height: 268 }),
        title: "Clinical view of a small pigmented macule", caption: "Clinical view · Figure 2A",
        alt: "Clinical close-up of a small brown macule with a darker center and a lighter rim beside a blue ruler.",
        diagnosis: "Melanoma in situ", anatomicalSite: "Thigh",
        educationalDescription: "One view from a published clinical and dermoscopic pair. The case diagnosis remains hidden until the learner reveals the answer.",
        source: "De Giorgi and coauthors, Cancers (2026), Figure 2, via PubMed Central",
        sourceUrl: "https://doi.org/10.3390/cancers18142183",
        license: "CC BY 4.0", attribution: "De Giorgi et al., Cancers 2026, Figure 2A. CC BY 4.0. Cropped from the composite figure by Docutis.",
        patientIdentifiable: false,
        consentBasis: "The source article reports written informed consent for publication and uses CC BY 4.0. The image shows thigh skin without a face.",
        metadataCheckedAt: "2026-11-28", reviewStatus: "clinician review required", clinicalReview: null
      }),
      Object.freeze({
        id: "mis-thigh-dermoscopy", diseaseId: "cutaneous-melanoma", type: "dermoscopy",
        src: "assets/media/cases/case-33-dermoscopy.jpg", dimensions: Object.freeze({ width: 360, height: 268 }),
        title: "Dermoscopy of the same pigmented macule", caption: "Dermoscopy · Figure 2B",
        alt: "Dermoscopy of the matching brown lesion showing a darker central network, several dark dots and a small peripheral lobe.",
        diagnosis: "Melanoma in situ", anatomicalSite: "Thigh",
        educationalDescription: "The source caption pairs this dermoscopic view with the clinical view as one histopathology-confirmed case. The pair supports visual comparison, not image-only diagnosis.",
        source: "De Giorgi and coauthors, Cancers (2026), Figure 2, via PubMed Central",
        sourceUrl: "https://doi.org/10.3390/cancers18142183",
        license: "CC BY 4.0", attribution: "De Giorgi et al., Cancers 2026, Figure 2B. CC BY 4.0. Cropped from the composite figure by Docutis.",
        patientIdentifiable: false,
        consentBasis: "The source article reports written informed consent for publication and uses CC BY 4.0. The image shows skin only.",
        metadataCheckedAt: "2026-11-28", reviewStatus: "clinician review required", clinicalReview: null
      }),
      Object.freeze({
        id: "bcc-nodular-real-dermoscopy", diseaseId: "basal-cell-carcinoma", type: "dermoscopy",
        src: "assets/media/cases/bcc-nodular-wikiderm-dermoscopy.jpg", dimensions: Object.freeze({ width: 1600, height: 1200 }),
        title: "Dermoscopy of a nodular lesion", caption: "Dermoscopy · WIKIDERM",
        alt: "Dermoscopic close-up of a nodular lesion with branching vessels on a translucent pink background.",
        diagnosis: "Nodular basal cell carcinoma", anatomicalSite: null,
        educationalDescription: "An original clinician-authored dermoscopic photograph with branching vessels. The source labels it as nodular basal cell carcinoma; this clue is not specific enough to diagnose a new lesion alone.",
        source: "Dr. Thomas Brinkmeier / WIKIDERM, via Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Dermatoskopie_eines_nodul%C3%A4ren_Basalzellkarzinoms,_WIKIDERM%C2%AE.jpg",
        license: "CC BY 4.0", attribution: "Dr. Thomas Brinkmeier, WIKIDERM. CC BY 4.0. Resized by Docutis; no clinical crop or annotation.",
        patientIdentifiable: false,
        consentBasis: "Clinician-authored educational dermoscopy published under CC BY 4.0. No facial identifiers are present.",
        metadataCheckedAt: "2026-11-28", reviewStatus: "clinician review required", clinicalReview: null
      }),
      Object.freeze({
        id: "psoriasis-extensor-photo", diseaseId: "plaque-psoriasis", type: "clinical-photo",
        src: "assets/media/quiz/psoriasis-extensor-plaques.jpg", dimensions: Object.freeze({ width: 609, height: 705 }),
        title: "Clinical photograph of extensor plaques", caption: "Clinical photograph · Wikimedia Commons",
        alt: "Clinical photograph showing sharply bordered, thickly scaly plaques over paired extensor skin; the source does not specify the exact site.",
        diagnosis: "Plaque psoriasis", anatomicalSite: null,
        educationalDescription: "A real clinical photograph of scaly plaques replaces the previous body-distribution drawing. It illustrates one clinical morphology, not every psoriasis presentation.",
        source: "Dr. Gandikota Raghurama Rao, via Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:2702_Psoriasis.jpg",
        license: "CC BY 4.0", attribution: "Dr. Gandikota Raghurama Rao, 2702 Psoriasis.jpg. CC BY 4.0. Orientation normalized and recompressed by Docutis.",
        patientIdentifiable: false,
        consentBasis: "Contributor states own work and published the photograph under CC BY 4.0. The image does not show a face; separate patient consent details are not provided on the file page.",
        metadataCheckedAt: "2026-11-28", reviewStatus: "clinician review required", clinicalReview: null
      }),
      Object.freeze({
        id: "acne-comedonal-photo", diseaseId: "acne-vulgaris", type: "clinical-photo",
        src: "assets/media/quiz/acne-comedonal-forehead.jpg", dimensions: Object.freeze({ width: 1600, height: 1200 }),
        title: "Clinical photograph of comedonal acne", caption: "Clinical photograph · WIKIDERM",
        alt: "Close-up clinical photograph of forehead skin with many small, skin-coloured follicular papules and a comedonal texture.",
        diagnosis: "Comedonal acne", anatomicalSite: "Forehead",
        educationalDescription: "An original clinician-authored clinical photograph emphasizing comedones as a visible acne lesion. It does not represent every acne phenotype.",
        source: "Dr. Thomas Brinkmeier / WIKIDERM, via Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Acne_comedonica,_Stirn,_%C2%A9WIKIDERM.jpg",
        license: "CC BY 4.0", attribution: "Dr. Thomas Brinkmeier, WIKIDERM. CC BY 4.0. Resized by Docutis; no clinical crop or annotation.",
        patientIdentifiable: false,
        consentBasis: "Clinician-authored educational clinical photograph published under CC BY 4.0. The frame is a close-up without facial identifiers.",
        metadataCheckedAt: "2026-11-28", reviewStatus: "clinician review required", clinicalReview: null
      })
    ])
  });
}());
