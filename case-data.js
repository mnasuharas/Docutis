/* Goal 11 structured case-based learning registry. Educational only; not CDS. */
(function () {
  "use strict";

  const checked = "2026-09-28";

  function freezeImage(image) {
    return Object.freeze({
      ...image,
      dimensions: Object.freeze({ ...image.dimensions })
    });
  }

  function freezeCase(item) {
    const frozen = {
      ...item,
      patientContext: Object.freeze({ ...item.patientContext }),
      images: Object.freeze(item.images.map(freezeImage)),
      diagnosticGroundTruth: Object.freeze({ ...item.diagnosticGroundTruth }),
      observations: Object.freeze(item.observations.map(value => Object.freeze({ ...value }))),
      interpretations: Object.freeze(item.interpretations.map(value => Object.freeze({
        ...value,
        relatedObservationIds: Object.freeze([...value.relatedObservationIds])
      }))),
      dermoscopicFeatures: Object.freeze(item.dermoscopicFeatures.map(value => Object.freeze({ ...value }))),
      differentials: Object.freeze(item.differentials.map(value => Object.freeze({
        ...value,
        supportingFeatures: Object.freeze([...value.supportingFeatures]),
        contradictingFeatures: Object.freeze([...value.contradictingFeatures])
      }))),
      teachingPoints: Object.freeze(item.teachingPoints.map(value => Object.freeze({ ...value }))),
      annotations: Object.freeze((item.annotations || []).map(value => Object.freeze({ ...value })))
    };
    if (Array.isArray(item.patterns)) frozen.patterns = Object.freeze(item.patterns.map(value => Object.freeze({ ...value })));
    if (Array.isArray(item.whyNot)) frozen.whyNot = Object.freeze(item.whyNot.map(value => Object.freeze({ ...value })));
    if (item.academy) {
      frozen.academy = Object.freeze({
        ...item.academy,
        skillIds: Object.freeze([...(item.academy.skillIds || [])])
      });
    }
    return Object.freeze(frozen);
  }

  window.DOCUTIS_CASES = Object.freeze({
    schemaVersion: 1,
    title: "Clinical Cases",
    disclaimer: "Educational progressive disclosure only. Cases are not clinical decision support and do not replace professional judgment. Image interpretation is not physician attestation.",
    curriculum: Object.freeze({
      schemaVersion: 1,
      id: "melanoma-clinical-case-academy",
      title: "Learn Melanoma",
      disclaimer: "Learn Melanoma is a teaching sequence. It does not certify competence, estimate a probability, or act as a diagnostic device. New cases stay review required.",
      levels: Object.freeze([
        Object.freeze({ level: 1, key: "recognition", title: "Recognition", aim: "Describe shape, border and color before naming a diagnosis." }),
        Object.freeze({ level: 2, key: "differentiation", title: "Differentiation", aim: "Separate a pigmented or pink lesion from a nearby mimic using what is actually visible." }),
        Object.freeze({ level: 3, key: "pattern-integration", title: "Pattern integration", aim: "Hold two findings together, including a flat area beside a raised area, without upgrading a caption." }),
        Object.freeze({ level: 4, key: "diagnostic-traps", title: "Diagnostic traps", aim: "Notice what a single photograph cannot prove, and say why two mimics remain possible." }),
        Object.freeze({ level: 5, key: "advanced-reasoning", title: "Advanced reasoning", aim: "Weight a source statement against the frame in front of you, including nail-unit damage." })
      ]),
      skills: Object.freeze([
        Object.freeze({ id: "asymmetry", title: "Asymmetry", summary: "Compare halves of one lesion. Asymmetry is a clue, not a diagnosis." }),
        Object.freeze({ id: "border-irregularity", title: "Border irregularity", summary: "Trace whether the edge is smooth or notched. An uneven edge is not specific." }),
        Object.freeze({ id: "color-variegation", title: "Color variegation", summary: "Name the colors you can see. Several colors raise concern and still need a diagnosis from the source, not from the palette alone." }),
        Object.freeze({ id: "variegated-plaque", title: "Variegated plaque", summary: "A broad flat or slightly raised patch with uneven color is a pattern, not a stage." }),
        Object.freeze({ id: "pale-area", title: "Pale area inside pigment", summary: "A pale center or gray-white area is visible or it is not. Do not rename it as regression unless the source does, and even then it is not specific." }),
        Object.freeze({ id: "nodule-beside-macule", title: "Nodule beside a macule", summary: "A raised lesion touching a flatter pigmented area is a combined pattern. The source, not the silhouette, assigns the names." }),
        Object.freeze({ id: "flat-and-raised", title: "Flat area with a raised focus", summary: "Look for a printed marker or arrow only when it is in the photograph. Do not add one." }),
        Object.freeze({ id: "change-not-in-one-photo", title: "Change is not in one frame", summary: "A single photograph cannot show that a diameter changed. A source history of change is weighed separately." }),
        Object.freeze({ id: "pink-nodule", title: "Pink nodule", summary: "A pink or red nodule without brown pigment is a classic trap. Pigment is not required for concern." }),
        Object.freeze({ id: "polymorphous-vessels", title: "More than one vessel shape", summary: "Dotted and linear red vessels together are a dermoscopic pattern. They are not specific for one tumor." }),
        Object.freeze({ id: "nail-unit-damage", title: "Nail-unit damage", summary: "A destroyed or discolored nail plate has a wide differential. Do not call a streak that you cannot see." }),
        Object.freeze({ id: "pink-scaly-spot", title: "Small pink scaly spot", summary: "A small pink scaly papule can be a keratinocyte tumor, a dermatitis, or a melanocytic trap." }),
        Object.freeze({ id: "eroded-papule", title: "Eroded papule", summary: "A small erosion on sun-exposed skin is described before it is named." }),
        Object.freeze({ id: "shiny-red-papule", title: "Shiny red papule", summary: "A solitary shiny red papule needs a differential that includes non-pigmented tumors." }),
        Object.freeze({ id: "crateriform-center", title: "Crateriform center", summary: "A central plug or crater is a shape. It does not by itself separate keratinizing tumors from a pigmented nodule." }),
        Object.freeze({ id: "acral-pigment", title: "Acral pigment", summary: "Pigment on the palm, sole or nail apparatus is described on its own site. Acral location is not reassuring." }),
        Object.freeze({ id: "vessel-pattern", title: "Branching vessels", summary: "Branching vessels on a translucent field are a dermoscopic clue recorded only when the image shows them." }),
        Object.freeze({ id: "pigment-architecture", title: "Pigment architecture", summary: "Leaf-like or ovoid pigment is compared with a network. The comparison is teaching, not a device read." }),
        Object.freeze({ id: "evidence-weighting", title: "Evidence weighting", summary: "Separate the visible frame, the source sentence, and what the source does not say." })
      ]),
      entries: Object.freeze([
        Object.freeze({ caseId: "case-g18-01", order: 1, level: 1, spectrum: "melanoma", skillIds: Object.freeze(["asymmetry", "evidence-weighting"]) }),
        Object.freeze({ caseId: "case-g18-02", order: 2, level: 1, spectrum: "melanoma", skillIds: Object.freeze(["border-irregularity"]) }),
        Object.freeze({ caseId: "case-g18-03", order: 3, level: 1, spectrum: "melanoma", skillIds: Object.freeze(["color-variegation"]) }),
        Object.freeze({ caseId: "case-g18-04", order: 4, level: 2, spectrum: "melanoma", skillIds: Object.freeze(["variegated-plaque", "color-variegation"]) }),
        Object.freeze({ caseId: "case-g18-13", order: 5, level: 2, spectrum: "mimic", skillIds: Object.freeze(["pink-scaly-spot"]) }),
        Object.freeze({ caseId: "case-acral-melanoma-plantar", order: 6, level: 2, spectrum: "melanoma", skillIds: Object.freeze(["acral-pigment", "asymmetry"]) }),
        Object.freeze({ caseId: "case-g18-14", order: 7, level: 2, spectrum: "mimic", skillIds: Object.freeze(["eroded-papule"]) }),
        Object.freeze({ caseId: "case-bcc-nodular-dermoscopy", order: 8, level: 2, spectrum: "mimic", skillIds: Object.freeze(["vessel-pattern", "pink-nodule"]) }),
        Object.freeze({ caseId: "case-g18-05", order: 9, level: 3, spectrum: "melanoma", skillIds: Object.freeze(["pale-area", "border-irregularity"]) }),
        Object.freeze({ caseId: "case-g18-06", order: 10, level: 3, spectrum: "melanoma", skillIds: Object.freeze(["nodule-beside-macule"]) }),
        Object.freeze({ caseId: "case-g18-15", order: 11, level: 3, spectrum: "mimic", skillIds: Object.freeze(["shiny-red-papule"]) }),
        Object.freeze({ caseId: "case-bcc-pigmented-dermoscopy", order: 12, level: 3, spectrum: "mimic", skillIds: Object.freeze(["pigment-architecture"]) }),
        Object.freeze({ caseId: "case-g18-07", order: 13, level: 3, spectrum: "melanoma", skillIds: Object.freeze(["flat-and-raised", "pale-area"]) }),
        Object.freeze({ caseId: "case-g18-11", order: 14, level: 4, spectrum: "melanoma", skillIds: Object.freeze(["polymorphous-vessels", "evidence-weighting"]) }),
        Object.freeze({ caseId: "case-g18-08", order: 15, level: 4, spectrum: "melanoma", skillIds: Object.freeze(["evidence-weighting", "change-not-in-one-photo"]) }),
        Object.freeze({ caseId: "case-g18-09", order: 16, level: 4, spectrum: "melanoma", skillIds: Object.freeze(["change-not-in-one-photo", "border-irregularity"]) }),
        Object.freeze({ caseId: "case-g18-16", order: 17, level: 4, spectrum: "mimic", skillIds: Object.freeze(["crateriform-center"]) }),
        Object.freeze({ caseId: "case-g18-10", order: 18, level: 4, spectrum: "melanoma", skillIds: Object.freeze(["pink-nodule"]) }),
        Object.freeze({ caseId: "case-g18-12", order: 19, level: 5, spectrum: "melanoma", skillIds: Object.freeze(["nail-unit-damage", "evidence-weighting"]) })
      ])
    }),
    cases: Object.freeze([
      freezeCase({
        id: "case-acral-melanoma-plantar",
        slug: "acral-melanoma-plantar-clinical",
        title: "Large plantar pigmented macule",
        diagnosisLabel: "Acral lentiginous melanoma",
        diseaseId: "acral-melanoma",
        category: "Melanocytic malignancies",
        educationalLevel: "intermediate",
        caseType: "clinical",
        patientContext: {
          ageBand: null,
          sex: null,
          anatomicalSite: "Plantar foot / toe",
          presentationNotes: "Large asymmetric dark-brown macule on acral skin (open-access published case photography)."
        },
        images: [{
          id: "img-acral-melanoma-plantar",
          type: "clinical",
          src: "assets/media/cases/acral-melanoma-plantar-clinical.jpg",
          dimensions: { width: 894, height: 1430 },
          alt: "Clinical photograph of a large asymmetric dark-brown plantar macule with irregular borders and color variegation on acral skin.",
          caption: "Large asymmetric dark-brown acral macule with irregular borders and several colors (published case photography).",
          source: "Xavier-Júnior et al., Diagnostic Pathology (2015), via Wikimedia Commons",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Photography_of_a_large_acral_lentiginous_melanoma.jpg",
          creator: "Xavier-Júnior, José; Munhoz, Tania; Souza, Vinicius; Campos, Eloísa; Stolf, Hamilton; Marques, Mariângela",
          license: "CC BY 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
          attribution: "Xavier-Júnior et al. 2015, Diagnostic Pathology. CC BY 4.0. https://doi.org/10.1186/s13000-015-0307-z",
          attributionRequired: true,
          modificationStatus: "unmodified",
          modificationsNotes: null,
          accessDate: checked,
          metadataCheckedAt: checked,
          sourceVerificationStatus: "verified",
          patientIdentifiable: false,
          consentBasis: "Open-access article states Creative Commons Attribution 4.0 licensing; paper reports written informed consent for publication."
        }],
        diagnosticGroundTruth: {
          confirmedDiagnosis: "Acral lentiginous melanoma (Clark level IV, Breslow 2.6 mm in source paper)",
          confirmationMethod: "histopathology",
          confirmationNotes: "Source paper reports histopathology-confirmed acral lentiginous melanoma after complete histological analysis of the specimen (Clark IV, Breslow 2.6 mm). Docutis does not re-interpret slides.",
          confidenceNote: "Diagnosis label follows the published histopathology report; educational framing only."
        },
        observations: [
          { id: "obs-am-1", kind: "observation", text: "Large pigmented macule on plantar/acral skin." },
          { id: "obs-am-2", kind: "observation", text: "Asymmetry of overall shape." },
          { id: "obs-am-3", kind: "observation", text: "Irregular borders." },
          { id: "obs-am-4", kind: "observation", text: "Color variegation with dark-brown areas and additional tones." }
        ],
        interpretations: [
          { id: "int-am-1", kind: "interpretation", relatedObservationIds: ["obs-am-1", "obs-am-2", "obs-am-3", "obs-am-4"], text: "The combination of acral site, asymmetry, border irregularity and color variegation raises concern for acral melanoma rather than a banal acquired nevus." }
        ],
        dermoscopicFeatures: [],
        differentials: [
          {
            diagnosis: "Acral nevus",
            supportingFeatures: ["Pigmented macule on acral skin"],
            contradictingFeatures: ["Large size", "Marked asymmetry", "Irregular borders", "Color variegation"],
            teachingDistinction: "Most acral nevi are smaller and more orderly; progressive large asymmetric variegated patches warrant specialist assessment."
          },
          {
            diagnosis: "Acral lentiginous melanoma",
            supportingFeatures: ["Acral site", "Asymmetry", "Irregular borders", "Color variegation"],
            contradictingFeatures: [],
            teachingDistinction: "This published case was histopathologically confirmed as acral lentiginous melanoma."
          },
          {
            diagnosis: "Subungual/trauma-related hemorrhage (if periungual)",
            supportingFeatures: ["Acral location can host hemorrhage"],
            contradictingFeatures: ["Broad macular pigment pattern with variegation beyond a typical hematoma streak"],
            teachingDistinction: "Hemorrhage usually has a history of trauma and evolving clearance; do not dismiss concerning acral pigment without examination."
          }
        ],
        teachingPoints: [
          { id: "tp-am-1", title: "Notice first", text: "Describe site, size impression, asymmetry, border and colors before naming a diagnosis." },
          { id: "tp-am-2", title: "Key features", text: "Acral location plus ABCDE-like irregularity is a high-yield concern pattern." },
          { id: "tp-am-3", title: "Suspicion", text: "Large irregular acral pigmented patches require specialist assessment; histopathology confirmed melanoma in the source paper." },
          { id: "tp-am-4", title: "Pitfall", text: "Do not reassure based on acral site alone; acral melanoma is a classic miss." },
          { id: "tp-am-5", title: "Why this fits", text: "Published clinical morphology matches an advanced acral lentiginous melanoma later confirmed histologically." }
        ],
        clinicalAction: "Open the Docutis acral melanoma record for structured reference context after you finish the case.",
        annotations: [],
        reviewStatus: "clinician review required",
        clinicalReview: null
      }),

      freezeCase({
        id: "case-bcc-nodular-dermoscopy",
        slug: "bcc-nodular-dermoscopy-wikiderm",
        title: "Nodular lesion dermatoscopy with vessels",
        diagnosisLabel: "Nodular basal cell carcinoma",
        diseaseId: "basal-cell-carcinoma",
        category: "Keratinocyte carcinomas",
        educationalLevel: "introductory",
        caseType: "dermoscopic",
        patientContext: {
          ageBand: null,
          sex: null,
          anatomicalSite: "Not specified on source (dermoscopic close-up)",
          presentationNotes: "Dermatoscopy labeled by the clinician author as nodular basal cell carcinoma."
        },
        images: [{
          id: "img-bcc-nodular-dermoscopy",
          type: "dermoscopy",
          src: "assets/media/cases/bcc-nodular-wikiderm-dermoscopy.jpg",
          dimensions: { width: 1600, height: 1200 },
          alt: "Dermoscopic photograph of a nodular basal cell carcinoma showing focused vascular structures within a translucent lesion field.",
          caption: "Dermatoscopy of a nodular basal cell carcinoma (clinician-authored educational image).",
          source: "Dr. Thomas Brinkmeier / WIKIDERM, via Wikimedia Commons",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Dermatoskopie_eines_nodul%C3%A4ren_Basalzellkarzinoms,_WIKIDERM%C2%AE.jpg",
          creator: "Dr. Thomas Brinkmeier",
          license: "CC BY 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
          attribution: "Dr. Thomas Brinkmeier, WIKIDERM. CC BY 4.0.",
          attributionRequired: true,
          modificationStatus: "other-described",
          modificationsNotes: "Resized and recompressed for web delivery (max width 1600 px); no clinical cropping or annotation added.",
          accessDate: checked,
          metadataCheckedAt: checked,
          sourceVerificationStatus: "verified",
          patientIdentifiable: false,
          consentBasis: "Clinician own-work educational dermatoscopy published on Wikimedia Commons under CC BY 4.0; no facial identifiers in frame."
        }],
        diagnosticGroundTruth: {
          confirmedDiagnosis: "Nodular basal cell carcinoma",
          confirmationMethod: "expert_diagnosis",
          confirmationNotes: "Source Commons description labels the image as dermatoscopy of a nodular basal cell carcinoma by the clinician author. Histopathology is not cited on the Commons page; do not claim histo confirmation here.",
          confidenceNote: "Expert clinician label only until Docutis physician review."
        },
        observations: [
          { id: "obs-bccn-1", kind: "observation", text: "Focused dermoscopic field of a nodular lesion." },
          { id: "obs-bccn-2", kind: "observation", text: "Branching / telangiectatic vascular structures are visible." },
          { id: "obs-bccn-3", kind: "observation", text: "Translucent to pink structural background without a regular pigment network of a banal nevus." }
        ],
        interpretations: [
          { id: "int-bccn-1", kind: "interpretation", relatedObservationIds: ["obs-bccn-2", "obs-bccn-3"], text: "Arborizing or telangiectatic vessels on a translucent background are classic dermoscopic clues associated with basal cell carcinoma." }
        ],
        dermoscopicFeatures: [
          { token: "arborizing_vessels", label: "Arborizing / branching vessels" },
          { token: "telangiectasia", label: "Telangiectatic vessels" }
        ],
        differentials: [
          {
            diagnosis: "Basal cell carcinoma (nodular)",
            supportingFeatures: ["Branching vessels", "Translucent vascularized nodule pattern"],
            contradictingFeatures: [],
            teachingDistinction: "Author-labeled nodular BCC; vascular clues are the teaching focus."
          },
          {
            diagnosis: "Amelanotic / hypomelanotic melanoma",
            supportingFeatures: ["Can show atypical vessels"],
            contradictingFeatures: ["Classic arborizing BCC-type vessels and translucent BCC pattern favor BCC in this labeled example"],
            teachingDistinction: "Always keep amelanotic melanoma in mind for atypical pink lesions; confirmation pathway is clinical-pathologic, not image quiz alone."
          },
          {
            diagnosis: "Sebaceous hyperplasia / other adnexal nodule",
            supportingFeatures: ["Facial/nodular pink lesions can mimic"],
            contradictingFeatures: ["Crown vessels of sebaceous hyperplasia differ from arborizing BCC vessels"],
            teachingDistinction: "Vessel morphology and overall pattern help, but uncertain lesions need clinicopathologic correlation."
          }
        ],
        teachingPoints: [
          { id: "tp-bccn-1", title: "Notice first", text: "Look for vessel morphology before committing to a diagnosis name." },
          { id: "tp-bccn-2", title: "Key features", text: "Arborizing/telangiectatic vessels are high-yield BCC dermoscopic clues." },
          { id: "tp-bccn-3", title: "Pitfall", text: "Pink lesions are not automatically BCC; amelanotic melanoma remains an important differential." },
          { id: "tp-bccn-4", title: "Why this fits", text: "The clinician-authored label and vascular pattern align with nodular BCC teaching." }
        ],
        clinicalAction: "Compare with the Docutis basal cell carcinoma record and the BCC clues schematic after the case.",
        annotations: [],
        reviewStatus: "clinician review required",
        clinicalReview: null
      }),

      freezeCase({
        id: "case-bcc-pigmented-dermoscopy",
        slug: "bcc-pigmented-dermoscopy-wikiderm",
        title: "Pigmented lesion dermatoscopy on the back",
        diagnosisLabel: "Pigmented basal cell carcinoma",
        diseaseId: "basal-cell-carcinoma",
        category: "Keratinocyte carcinomas",
        educationalLevel: "intermediate",
        caseType: "dermoscopic",
        patientContext: {
          ageBand: null,
          sex: null,
          anatomicalSite: "Back (per source description)",
          presentationNotes: "Dermatoscopy labeled as pigmented basal cell carcinoma on the back."
        },
        images: [{
          id: "img-bcc-pigmented-dermoscopy",
          type: "dermoscopy",
          src: "assets/media/cases/bcc-pigmented-wikiderm-dermoscopy.jpg",
          dimensions: { width: 1600, height: 1200 },
          alt: "Dermoscopic photograph of a pigmented basal cell carcinoma on the back showing asymmetric pigment structures without a typical melanocytic network of a banal nevus.",
          caption: "Dermatoscopy of a pigmented basal cell carcinoma on the back (clinician-authored educational image).",
          source: "Dr. Thomas Brinkmeier / WIKIDERM, via Wikimedia Commons",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Dermatoskopie_eines_pigmentierten_Basalzellkarzinoms.jpg",
          creator: "Dr. Thomas Brinkmeier",
          license: "CC BY 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
          attribution: "Dr. Thomas Brinkmeier, WIKIDERM. CC BY 4.0.",
          attributionRequired: true,
          modificationStatus: "other-described",
          modificationsNotes: "Resized and recompressed for web delivery (max width 1600 px); no clinical cropping or annotation added.",
          accessDate: checked,
          metadataCheckedAt: checked,
          sourceVerificationStatus: "verified",
          patientIdentifiable: false,
          consentBasis: "Clinician own-work educational dermatoscopy published on Wikimedia Commons under CC BY 4.0; truncal close-up without facial identifiers."
        }],
        diagnosticGroundTruth: {
          confirmedDiagnosis: "Pigmented basal cell carcinoma",
          confirmationMethod: "expert_diagnosis",
          confirmationNotes: "Source Commons description labels the image as dermatoscopy of a pigmented basal cell carcinoma on the back. Histopathology is not cited on the Commons page.",
          confidenceNote: "Expert clinician label only until Docutis physician review."
        },
        observations: [
          { id: "obs-bccp-1", kind: "observation", text: "Pigmented dermoscopic structures within a focal lesion on truncal skin context." },
          { id: "obs-bccp-2", kind: "observation", text: "Asymmetric distribution of pigment." },
          { id: "obs-bccp-3", kind: "observation", text: "Leaf-like or ovoid pigment aggregates rather than a regular reticular melanocytic network." }
        ],
        interpretations: [
          { id: "int-bccp-1", kind: "interpretation", relatedObservationIds: ["obs-bccp-2", "obs-bccp-3"], text: "Pigmented BCC often shows maple-leaf / ovoid nests and lacks a typical nevus network; melanoma remains the key differential for pigmented lesions." }
        ],
        dermoscopicFeatures: [
          { token: "maple_leaf_areas", label: "Maple leaf-like pigment areas" },
          { token: "blue_gray_ovoid_nests", label: "Blue-gray ovoid nests / pigment aggregates" },
          { token: "structureless_areas", label: "Structureless pigmented areas" }
        ],
        differentials: [
          {
            diagnosis: "Pigmented basal cell carcinoma",
            supportingFeatures: ["Leaf-like / ovoid pigment aggregates", "Absent regular nevus network"],
            contradictingFeatures: [],
            teachingDistinction: "Author-labeled pigmented BCC; emphasize BCC pigment structures vs melanocytic network."
          },
          {
            diagnosis: "Melanoma",
            supportingFeatures: ["Asymmetric pigment", "Color variegation potential"],
            contradictingFeatures: ["Classic BCC-specific pigment structures favor BCC when clearly present"],
            teachingDistinction: "When uncertain, treat as a pigmented lesion requiring clinicopathologic correlation — never use this module as a diagnostic oracle."
          },
          {
            diagnosis: "Seborrheic keratosis",
            supportingFeatures: ["Can be pigmented on the trunk"],
            contradictingFeatures: ["Milia-like cysts / comedo-like openings pattern differs from BCC leaf-like structures"],
            teachingDistinction: "Compare global pattern; SK clues differ from BCC pigment architecture."
          }
        ],
        teachingPoints: [
          { id: "tp-bccp-1", title: "Notice first", text: "Is there a melanocytic network, or BCC-type pigment architecture?" },
          { id: "tp-bccp-2", title: "Key features", text: "Maple-leaf areas and blue-gray ovoid nests support pigmented BCC." },
          { id: "tp-bccp-3", title: "Main differential", text: "Melanoma is the safety-critical differential for any atypical pigmented lesion." },
          { id: "tp-bccp-4", title: "Why this fits", text: "Clinician-authored pigmented BCC label with BCC-type pigment structures." }
        ],
        clinicalAction: "Review the Docutis basal cell carcinoma record after completing differentials.",
        annotations: [],
        reviewStatus: "clinician review required",
        clinicalReview: null
      }),

      freezeCase({
        id: "case-ak-field-hand",
        slug: "ak-field-cancerization-hand",
        title: "Field change on the dorsum of the hand",
        diagnosisLabel: "Actinic keratoses / field cancerization",
        diseaseId: "actinic-keratosis",
        category: "Keratinocyte carcinomas and precursors",
        educationalLevel: "introductory",
        caseType: "clinical",
        patientContext: {
          ageBand: null,
          sex: null,
          anatomicalSite: "Dorsum of the hand",
          presentationNotes: "Multiple actinic keratoses described as field cancerization on the hand dorsum."
        },
        images: [{
          id: "img-ak-field-hand",
          type: "clinical",
          src: "assets/media/cases/ak-field-hand-clinical.jpg",
          dimensions: { width: 1600, height: 1200 },
          alt: "Clinical photograph of the dorsum of a hand showing multiple rough erythematous and keratotic spots consistent with actinic keratoses and field cancerization.",
          caption: "Field cancerization with multiple actinic keratoses on the dorsum of the hand.",
          source: "Dr. Thomas Brinkmeier / WIKIDERM, via Wikimedia Commons",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Aktinische_Keratosen_am_Handr%C3%BCcken,_sog._Feldkanzerisierung,_%C2%A9WIKIDERM.jpg",
          creator: "Dr. Thomas Brinkmeier",
          license: "CC BY 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
          attribution: "Dr. Thomas Brinkmeier, WIKIDERM. CC BY 4.0.",
          attributionRequired: true,
          modificationStatus: "other-described",
          modificationsNotes: "Resized and recompressed for web delivery (max width 1600 px); no clinical cropping or annotation added.",
          accessDate: checked,
          metadataCheckedAt: checked,
          sourceVerificationStatus: "verified",
          patientIdentifiable: false,
          consentBasis: "Clinician own-work educational clinical photograph published on Wikimedia Commons under CC BY 4.0; hand dorsum without facial identifiers."
        }],
        diagnosticGroundTruth: {
          confirmedDiagnosis: "Actinic keratoses with field cancerization of the hand dorsum",
          confirmationMethod: "expert_diagnosis",
          confirmationNotes: "Source labels the photograph as actinic keratoses / field cancerization of the hand dorsum. Histopathology is not cited on the Commons page.",
          confidenceNote: "Expert clinician label only until Docutis physician review."
        },
        observations: [
          { id: "obs-ak-1", kind: "observation", text: "Sun-exposed dorsum of the hand." },
          { id: "obs-ak-2", kind: "observation", text: "Multiple discrete rough / keratotic and erythematous spots rather than a single lesion." },
          { id: "obs-ak-3", kind: "observation", text: "Background chronically sun-damaged skin appearance." }
        ],
        interpretations: [
          { id: "int-ak-1", kind: "interpretation", relatedObservationIds: ["obs-ak-1", "obs-ak-2", "obs-ak-3"], text: "Multiple AKs on a sun-damaged field illustrate field cancerization rather than an isolated keratosis." }
        ],
        dermoscopicFeatures: [],
        differentials: [
          {
            diagnosis: "Actinic keratoses / field cancerization",
            supportingFeatures: ["Multiple grit/scale spots", "Hand dorsum sun exposure", "Field distribution"],
            contradictingFeatures: [],
            teachingDistinction: "Field concept matters for surveillance of the whole sun-damaged area."
          },
          {
            diagnosis: "Cutaneous squamous cell carcinoma",
            supportingFeatures: ["Can arise within AK fields"],
            contradictingFeatures: ["This frame emphasizes multiple thin keratotic spots rather than a single indurated tumor mass"],
            teachingDistinction: "Thickened, tender or rapidly changing foci within a field need separate assessment for invasive SCC."
          },
          {
            diagnosis: "Chronic eczema / irritant hand dermatitis",
            supportingFeatures: ["Hand dorsum can be eczematous"],
            contradictingFeatures: ["Discrete grit-like keratotic AKs on photoaged skin differ from diffuse eczematous plaques"],
            teachingDistinction: "Distribution and keratotic grit texture help separate AK from dermatitis."
          }
        ],
        teachingPoints: [
          { id: "tp-ak-1", title: "Notice first", text: "Count lesions and describe the field, not only one spot." },
          { id: "tp-ak-2", title: "Key features", text: "Multiple AKs on photoaged hand skin exemplify field cancerization." },
          { id: "tp-ak-3", title: "Suspicion", text: "Any thickened, ulcerated or tender focus in the field may need biopsy for invasive disease." },
          { id: "tp-ak-4", title: "Why this fits", text: "Clinician-authored field-cancerization label matches the multi-lesion hand-dorsum pattern." }
        ],
        clinicalAction: "Open the Docutis actinic keratosis record for structured precursor/SCC continuum context.",
        annotations: [],
        reviewStatus: "clinician review required",
        clinicalReview: null
      }),

      freezeCase({
        id: "case-scc-ak-paraspinal",
        slug: "scc-with-adjacent-ak-paraspinal",
        title: "Two neighboring lesions on the upper back",
        diagnosisLabel: "Well-differentiated cutaneous squamous cell carcinoma with adjacent actinic keratosis",
        diseaseId: "cutaneous-squamous-cell-carcinoma",
        category: "Keratinocyte carcinomas",
        educationalLevel: "intermediate",
        caseType: "clinical",
        patientContext: {
          ageBand: null,
          sex: null,
          anatomicalSite: "Left upper paraspinal back",
          presentationNotes: "Clinical photograph marked for biopsy; caption describes well-differentiated SCC with adjacent AK."
        },
        images: [{
          id: "img-scc-ak-paraspinal",
          type: "clinical",
          src: "assets/media/cases/scc-ak-paraspinal-clinical.jpg",
          dimensions: { width: 582, height: 238 },
          alt: "Clinical photograph of the left upper paraspinal back showing a marked lesion labeled as well-differentiated squamous cell carcinoma beside an adjacent actinic keratosis.",
          caption: "Well-differentiated squamous cell carcinoma marked for biopsy with adjacent actinic keratosis on the left upper paraspinal back.",
          source: "Dermanonymous, via Wikimedia Commons",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Squamous_Cell_Carcinoma_well_differentiated_Left_upper_paraspinal_back_with_adjacent_actinic_keratosis.jpg",
          creator: "Dermanonymous",
          license: "CC BY-SA 4.0",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
          attribution: "Dermanonymous. CC BY-SA 4.0.",
          attributionRequired: true,
          modificationStatus: "unmodified",
          modificationsNotes: null,
          accessDate: checked,
          metadataCheckedAt: checked,
          sourceVerificationStatus: "verified",
          patientIdentifiable: false,
          consentBasis: "Clinician/uploader own-work educational clinical photograph on Wikimedia Commons under CC BY-SA 4.0; truncal site without facial identifiers."
        }],
        diagnosticGroundTruth: {
          confirmedDiagnosis: "Well-differentiated cutaneous squamous cell carcinoma with adjacent actinic keratosis",
          confirmationMethod: "expert_diagnosis",
          confirmationNotes: "Source caption states well-differentiated SCC marked for biopsy with adjacent AK. A histopathology report is not linked on the Commons page; confirmationMethod remains expert_diagnosis rather than histopathology.",
          confidenceNote: "Biopsy marking is noted by the uploader; Docutis does not claim an unseen pathology report."
        },
        observations: [
          { id: "obs-scc-1", kind: "observation", text: "Two neighboring lesions on sun-exposed paraspinal back skin." },
          { id: "obs-scc-2", kind: "observation", text: "One focus is marked for biopsy and appears more built-up than the neighbor." },
          { id: "obs-scc-3", kind: "observation", text: "An adjacent flatter keratotic change is present in the same field." }
        ],
        interpretations: [
          { id: "int-scc-1", kind: "interpretation", relatedObservationIds: ["obs-scc-1", "obs-scc-2", "obs-scc-3"], text: "The pairing illustrates the AK–SCC continuum: a more concerning hypertrophic focus beside an adjacent actinic keratosis in damaged skin." }
        ],
        dermoscopicFeatures: [],
        differentials: [
          {
            diagnosis: "Cutaneous squamous cell carcinoma",
            supportingFeatures: ["Hypertrophic marked focus", "Actinically damaged background", "Uploader SCC label"],
            contradictingFeatures: [],
            teachingDistinction: "Primary teaching diagnosis for the marked lesion per source caption."
          },
          {
            diagnosis: "Actinic keratosis (adjacent)",
            supportingFeatures: ["Flatter keratotic neighbor", "Same sun-damaged field"],
            contradictingFeatures: [],
            teachingDistinction: "Adjacent AK supports continuum teaching without merging both labels into one lesion."
          },
          {
            diagnosis: "Keratoacanthoma / hypertrophic AK",
            supportingFeatures: ["Can mimic crateriform or hypertrophic keratinizing tumors"],
            contradictingFeatures: ["Source caption specifies well-differentiated SCC for the marked lesion"],
            teachingDistinction: "Overlap exists clinically; pathology resolves uncertain keratinizing tumors."
          }
        ],
        teachingPoints: [
          { id: "tp-scc-1", title: "Notice first", text: "Compare the thicker marked focus with the flatter neighbor before naming either." },
          { id: "tp-scc-2", title: "Key features", text: "SCC can arise in a field of actinic damage beside residual AK." },
          { id: "tp-scc-3", title: "Pitfall", text: "Do not dismiss a hypertrophic focus because nearby thinner AKs look familiar." },
          { id: "tp-scc-4", title: "Why this fits", text: "Uploader caption explicitly pairs well-differentiated SCC with adjacent AK." }
        ],
        clinicalAction: "Open the Docutis cutaneous squamous cell carcinoma record; also compare actinic keratosis for continuum context.",
        annotations: [],
        reviewStatus: "clinician review required",
        clinicalReview: null
      }),

      freezeCase({
        category: "Melanocytic malignancies",
        annotations: [],
        dermoscopicFeatures: [],
        clinicalAction: "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
        managementBrief: "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
        reviewStatus: "clinician review required",
        clinicalReview: null,
        patientContext: {
                  ageBand: null,
                  sex: null,
                  anatomicalSite: "Skin, site not named on the source",
                  presentationNotes: null
                },
        id: "case-g18-01",
        slug: "g18-asymmetric-dark-lesion",
        title: "Dark lesion thicker on one side",
        diagnosisLabel: "Cutaneous melanoma",
        diseaseId: "cutaneous-melanoma",
        educationalLevel: "introductory",
        caseType: "clinical",
        images: [
                  {
                              type: "clinical",
                              license: "Public domain",
                              licenseUrl: "https://www.usa.gov/government-works",
                              attributionRequired: true,
                              modificationStatus: "other-described",
                              modificationsNotes: "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
                              accessDate: "2026-09-30",
                              metadataCheckedAt: "2026-09-30",
                              sourceVerificationStatus: "verified",
                              patientIdentifiable: false,
                              creator: "National Cancer Institute",
                              attribution: "National Cancer Institute. Public domain.",
                              source: "National Cancer Institute, via Wikimedia Commons",
                              consentBasis: "US government public-domain clinical teaching photograph released through NCI Visuals Online and Wikimedia Commons. No name and no full-face portrait are in the frame. Commons file matches NCI Visuals Online image 2362.",
                              id: "img-g18-01",
                              src: "assets/media/cases/case-06-clinical.jpg",
                              dimensions: {
                                            width: 1400,
                                            height: 934
                                          },
                              alt: "Clinical photograph of one dark brown-black skin lesion that looks thicker on one side, with a measuring scale at the lower edge. No diagnosis is included.",
                              caption: "NCI teaching photograph of a dark lesion. The catalog diagnosis is withheld in the learner view until reveal.",
                              sourceUrl: "https://commons.wikimedia.org/wiki/File:Asymmetrical_melanoma.jpg"
                            }
                ],
        diagnosticGroundTruth: {
                  confirmedDiagnosis: "Cutaneous melanoma (NCI asymmetry teaching image)",
                  confirmationMethod: "source_dataset_diagnosis",
                  confirmationNotes: "The NCI description says this is asymmetrical melanoma and that the left side is much thicker than the right. The caption does not state histopathology, Breslow thickness, or a histologic subtype. Those items are not added.",
                  confidenceNote: "Source-catalog diagnosis only. Not a Docutis clinician review."
                },
        observations: [
                  {
                              id: "obs-g18-01a",
                              kind: "observation",
                              text: "One dark brown-black lesion on skin."
                            },
                  {
                              id: "obs-g18-01b",
                              kind: "observation",
                              text: "One side looks thicker than the other side."
                            },
                  {
                              id: "obs-g18-01c",
                              kind: "observation",
                              text: "A measuring scale runs along the lower edge. No measurement is read off it here."
                            }
                ],
        interpretations: [
                  {
                              id: "int-g18-01",
                              kind: "interpretation",
                              relatedObservationIds: [
                                            "obs-g18-01a",
                                            "obs-g18-01b"
                                          ],
                              text: "Uneven thickness is the recognition finding in this frame. Naming a disease is a separate step."
                            }
                ],
        differentials: [
                  {
                              diagnosis: "Cutaneous melanoma",
                              supportingFeatures: [
                                            "Asymmetric thickness",
                                            "Dark color"
                                          ],
                              contradictingFeatures: [
                                            "The photograph does not contain a pathology report"
                                          ],
                              teachingDistinction: "The NCI catalog names melanoma. Level 1 practice is to see the asymmetry before using that name."
                            },
                  {
                              diagnosis: "Pigmented keratinocyte tumor",
                              supportingFeatures: [
                                            "A dark raised lesion can be keratinocytic"
                                          ],
                              contradictingFeatures: [
                                            "The source label is not a keratinocyte tumor"
                                          ],
                              teachingDistinction: "A second possibility stays on the list until the source, and in practice a biopsy, settles it."
                            },
                  {
                              diagnosis: "Hemorrhage in a benign lesion",
                              supportingFeatures: [
                                            "Very dark color can be blood"
                                          ],
                              contradictingFeatures: [
                                            "The source presents this as a melanoma teaching image"
                                          ],
                              teachingDistinction: "Color depth alone does not prove blood."
                            }
                ],
        teachingPoints: [
                  {
                              id: "tp-g18-01a",
                              title: "Notice first",
                              text: "Say which half is thicker before you say a diagnosis."
                            },
                  {
                              id: "tp-g18-01b",
                              title: "Limit",
                              text: "Asymmetry is not specific. The diagnosis in this case is the NCI caption, not a new reading."
                            }
                ],
        patterns: [
                  {
                              id: "pat-g18-01",
                              label: "Asymmetric thickness",
                              specificityNote: "A thicker half is a clue. It is not specific for one diagnosis."
                            }
                ],
        synthesis: "One dark lesion is thicker on one side. The NCI caption calls the lesion melanoma and does not include a histopathology report.",
        evidenceWeighting: "The asymmetry is visible. The diagnosis weight is the NCI sentence. There is no histopathology sentence to weigh.",
        diagnosticTrap: "Treating asymmetry as proof, or ignoring it because a ruler is in the frame.",
        mentorNote: "Do not invent a thickness in millimeters. The scale is visible; a number is not recorded here.",
        takeHomeRule: "Describe the uneven half first. Keep the source diagnosis separate from the clue.",
        academy: {
                  level: 1,
                  spectrum: "melanoma",
                  skillIds: [
                              "asymmetry",
                              "evidence-weighting"
                            ]
                }
      }),

      freezeCase({
        category: "Melanocytic malignancies",
        annotations: [],
        dermoscopicFeatures: [],
        clinicalAction: "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
        managementBrief: "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
        reviewStatus: "clinician review required",
        clinicalReview: null,
        patientContext: {
                  ageBand: null,
                  sex: null,
                  anatomicalSite: "Skin, site not named on the source",
                  presentationNotes: null
                },
        id: "case-g18-02",
        slug: "g18-uneven-dark-border",
        title: "Dark lesion with an uneven edge",
        diagnosisLabel: "Cutaneous melanoma",
        diseaseId: "cutaneous-melanoma",
        educationalLevel: "introductory",
        caseType: "clinical",
        images: [
                  {
                              type: "clinical",
                              license: "Public domain",
                              licenseUrl: "https://www.usa.gov/government-works",
                              attributionRequired: true,
                              modificationStatus: "other-described",
                              modificationsNotes: "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
                              accessDate: "2026-09-30",
                              metadataCheckedAt: "2026-09-30",
                              sourceVerificationStatus: "verified",
                              patientIdentifiable: false,
                              creator: "National Cancer Institute",
                              attribution: "National Cancer Institute. Public domain.",
                              source: "National Cancer Institute, via Wikimedia Commons",
                              consentBasis: "US government public-domain clinical teaching photograph released through NCI Visuals Online and Wikimedia Commons. No name and no full-face portrait are in the frame. The Commons description is the NCI border example from the ABCD teaching set.",
                              id: "img-g18-02",
                              src: "assets/media/cases/case-07-clinical.jpg",
                              dimensions: {
                                            width: 1400,
                                            height: 934
                                          },
                              alt: "Clinical photograph of a small dark lesion with a notched outline and mixed dark red-brown color, above a centimeter scale. No diagnosis is included.",
                              caption: "NCI teaching photograph used to show an uneven border. The catalog diagnosis stays hidden until reveal.",
                              sourceUrl: "https://commons.wikimedia.org/wiki/File:Melanoma_border.jpg"
                            }
                ],
        diagnosticGroundTruth: {
                  confirmedDiagnosis: "Cutaneous melanoma (NCI border teaching image)",
                  confirmationMethod: "source_dataset_diagnosis",
                  confirmationNotes: "The NCI description says this is melanoma with a border that is uneven, ragged, or notched, as part of an ABCD teaching set. It does not state histopathology.",
                  confidenceNote: "Source-catalog diagnosis only. Not a Docutis clinician review."
                },
        observations: [
                  {
                              id: "obs-g18-02a",
                              kind: "observation",
                              text: "A small dark lesion sits on otherwise even skin."
                            },
                  {
                              id: "obs-g18-02b",
                              kind: "observation",
                              text: "The outline is notched rather than a smooth oval."
                            },
                  {
                              id: "obs-g18-02c",
                              kind: "observation",
                              text: "Black and dark red-brown color are both visible. A centimeter scale is at the lower edge."
                            }
                ],
        interpretations: [
                  {
                              id: "int-g18-02",
                              kind: "interpretation",
                              relatedObservationIds: [
                                            "obs-g18-02b",
                                            "obs-g18-02c"
                                          ],
                              text: "An uneven edge plus more than one dark color is the recognition pattern. It still needs the source diagnosis rather than a guess."
                            }
                ],
        differentials: [
                  {
                              diagnosis: "Cutaneous melanoma",
                              supportingFeatures: [
                                            "Notched border",
                                            "More than one dark color"
                                          ],
                              contradictingFeatures: [
                                            "No pathology text is in the caption"
                                          ],
                              teachingDistinction: "The source names melanoma for this border example."
                            },
                  {
                              diagnosis: "Seborrheic keratosis",
                              supportingFeatures: [
                                            "A dark stuck-on lesion can have an irregular outline"
                                          ],
                              contradictingFeatures: [
                                            "The surface here is not a thick waxy plaque in this frame"
                                          ],
                              teachingDistinction: "Border irregularity is shared. Do not stop at the first familiar benign name."
                            },
                  {
                              diagnosis: "Traumatized nevus",
                              supportingFeatures: [
                                            "Dark red color can follow trauma"
                                          ],
                              contradictingFeatures: [
                                            "No trauma history is in the source caption"
                                          ],
                              teachingDistinction: "A history of trauma is not visible in a photograph."
                            }
                ],
        teachingPoints: [
                  {
                              id: "tp-g18-02a",
                              title: "Notice first",
                              text: "Trace the edge with words: smooth, or notched."
                            },
                  {
                              id: "tp-g18-02b",
                              title: "Limit",
                              text: "An ABCD teaching caption is not a pathology report."
                            }
                ],
        patterns: [
                  {
                              id: "pat-g18-02",
                              label: "Notched border",
                              specificityNote: "A notched edge raises concern and is not specific."
                            }
                ],
        synthesis: "The lesion has a notched outline and mixed dark colors. The NCI caption calls it melanoma and does not cite histopathology.",
        evidenceWeighting: "Border and color are visible. Diagnosis weight is the catalog sentence only.",
        diagnosticTrap: "Using the word notched as if it were a diagnosis.",
        mentorNote: "The scale lets you see that the lesion is small. Small does not cancel an uneven edge.",
        takeHomeRule: "An uneven border is described before it is named.",
        academy: {
                  level: 1,
                  spectrum: "melanoma",
                  skillIds: [
                              "border-irregularity"
                            ]
                }
      }),

      freezeCase({
        category: "Melanocytic malignancies",
        annotations: [],
        dermoscopicFeatures: [],
        clinicalAction: "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
        managementBrief: "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
        reviewStatus: "clinician review required",
        clinicalReview: null,
        patientContext: {
                  ageBand: null,
                  sex: null,
                  anatomicalSite: "Skin, site not named on the source",
                  presentationNotes: null
                },
        id: "case-g18-03",
        slug: "g18-several-dark-colors",
        title: "Lesion with several dark colors",
        diagnosisLabel: "Cutaneous melanoma",
        diseaseId: "cutaneous-melanoma",
        educationalLevel: "introductory",
        caseType: "clinical",
        images: [
                  {
                              type: "clinical",
                              license: "Public domain",
                              licenseUrl: "https://www.usa.gov/government-works",
                              attributionRequired: true,
                              modificationStatus: "other-described",
                              modificationsNotes: "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
                              accessDate: "2026-09-30",
                              metadataCheckedAt: "2026-09-30",
                              sourceVerificationStatus: "verified",
                              patientIdentifiable: false,
                              creator: "National Cancer Institute",
                              attribution: "National Cancer Institute. Public domain.",
                              source: "National Cancer Institute, via Wikimedia Commons",
                              consentBasis: "US government public-domain clinical teaching photograph released through NCI Visuals Online and Wikimedia Commons. No name and no full-face portrait are in the frame. NCI records the slide as public domain, source Skin Cancer Foundation, Visuals Online image 2364.",
                              id: "img-g18-03",
                              src: "assets/media/cases/case-08-clinical.jpg",
                              dimensions: {
                                            width: 1350,
                                            height: 900
                                          },
                              alt: "Clinical photograph of an irregular dark lesion with black, gray, and brown areas and a shiny uneven surface. No diagnosis is included.",
                              caption: "NCI / Skin Cancer Foundation teaching photograph used for color differences. The catalog diagnosis stays hidden until reveal.",
                              sourceUrl: "https://commons.wikimedia.org/wiki/File:Melanoma1.jpg"
                            }
                ],
        diagnosticGroundTruth: {
                  confirmedDiagnosis: "Cutaneous melanoma (NCI color-variegation teaching image)",
                  confirmationMethod: "source_dataset_diagnosis",
                  confirmationNotes: "The NCI description says melanoma with coloring of different shades of brown, black, or tan, as part of an ABCD set. It does not state histopathology. A separate Commons file of the same photograph was not added.",
                  confidenceNote: "Source-catalog diagnosis only. Not a Docutis clinician review."
                },
        observations: [
                  {
                              id: "obs-g18-03a",
                              kind: "observation",
                              text: "One irregular lesion rather than a round even macule."
                            },
                  {
                              id: "obs-g18-03b",
                              kind: "observation",
                              text: "Black, brown, and gray tones sit in the same lesion."
                            },
                  {
                              id: "obs-g18-03c",
                              kind: "observation",
                              text: "The surface looks shiny and slightly uneven."
                            }
                ],
        interpretations: [
                  {
                              id: "int-g18-03",
                              kind: "interpretation",
                              relatedObservationIds: [
                                            "obs-g18-03a",
                                            "obs-g18-03b"
                                          ],
                              text: "Several dark colors inside one irregular outline are the finding to name before any diagnosis."
                            }
                ],
        differentials: [
                  {
                              diagnosis: "Cutaneous melanoma",
                              supportingFeatures: [
                                            "Several dark colors",
                                            "Irregular outline"
                                          ],
                              contradictingFeatures: [
                                            "No histopathology sentence is in the caption"
                                          ],
                              teachingDistinction: "The catalog uses this frame as a color example of melanoma."
                            },
                  {
                              diagnosis: "Seborrheic keratosis",
                              supportingFeatures: [
                                            "Can be dark and uneven"
                                          ],
                              contradictingFeatures: [
                                            "Classic stuck-on waxy horns are not the main finding in this frame"
                                          ],
                              teachingDistinction: "Color mix is shared with benign keratinocytic lesions."
                            },
                  {
                              diagnosis: "Pigmented basal cell carcinoma",
                              supportingFeatures: [
                                            "Can be irregular and dark"
                                          ],
                              contradictingFeatures: [
                                            "Leaf-like pigment is not claimed from this clinical photograph"
                                          ],
                              teachingDistinction: "Clinical color is not a dermoscopic structure."
                            }
                ],
        teachingPoints: [
                  {
                              id: "tp-g18-03a",
                              title: "Notice first",
                              text: "List the colors you can actually see."
                            },
                  {
                              id: "tp-g18-03b",
                              title: "Limit",
                              text: "Do not add blue or red if you do not see them."
                            }
                ],
        patterns: [
                  {
                              id: "pat-g18-03",
                              label: "Several dark colors",
                              specificityNote: "Color mix increases concern. It is not specific and it is not a probability."
                            }
                ],
        synthesis: "The lesion is irregular and contains more than one dark color. The NCI caption calls it melanoma without a histopathology statement.",
        evidenceWeighting: "Colors are visible evidence. The diagnosis is the catalog label. No numeric risk is attached.",
        diagnosticTrap: "Inventing an extra color to match an ABCD mnemonic.",
        mentorNote: "A duplicate Commons upload of this same photograph was rejected so the curriculum would not repeat one lesion.",
        takeHomeRule: "Name only the colors in the frame, then read the source diagnosis.",
        academy: {
                  level: 1,
                  spectrum: "melanoma",
                  skillIds: [
                              "color-variegation"
                            ]
                }
      }),

      freezeCase({
        category: "Melanocytic malignancies",
        annotations: [],
        dermoscopicFeatures: [],
        clinicalAction: "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
        managementBrief: "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
        reviewStatus: "clinician review required",
        clinicalReview: null,
        patientContext: {
                  ageBand: null,
                  sex: null,
                  anatomicalSite: "Skin, site not named on the source",
                  presentationNotes: null
                },
        id: "case-g18-04",
        slug: "g18-broad-brown-patch",
        title: "Broad brown patch with an uneven edge",
        diagnosisLabel: "Cutaneous melanoma",
        diseaseId: "cutaneous-melanoma",
        educationalLevel: "intermediate",
        caseType: "clinical",
        images: [
                  {
                              type: "clinical",
                              license: "Public domain",
                              licenseUrl: "https://www.usa.gov/government-works",
                              attributionRequired: true,
                              modificationStatus: "other-described",
                              modificationsNotes: "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
                              accessDate: "2026-09-30",
                              metadataCheckedAt: "2026-09-30",
                              sourceVerificationStatus: "verified",
                              patientIdentifiable: false,
                              creator: "National Cancer Institute",
                              attribution: "National Cancer Institute. Public domain.",
                              source: "National Cancer Institute, via Wikimedia Commons",
                              consentBasis: "US government public-domain clinical teaching photograph released through NCI Visuals Online and Wikimedia Commons. No name and no full-face portrait are in the frame. Commons credit is NCI Visuals Online image 9186.",
                              id: "img-g18-04",
                              src: "assets/media/cases/case-09-clinical.jpg",
                              dimensions: {
                                            width: 1400,
                                            height: 974
                                          },
                              alt: "Clinical photograph of a broad brown skin patch with a darker area at one edge and a scalloped outline. No diagnosis is included.",
                              caption: "NCI photograph of a broad brown patch. The catalog diagnosis stays hidden until reveal.",
                              sourceUrl: "https://commons.wikimedia.org/wiki/File:Melanoma.jpg"
                            }
                ],
        diagnosticGroundTruth: {
                  confirmedDiagnosis: "Cutaneous melanoma (NCI clinical photograph)",
                  confirmationMethod: "source_dataset_diagnosis",
                  confirmationNotes: "The NCI description says this slide shows a melanoma on a patient's skin. It does not state subtype, site, or histopathology.",
                  confidenceNote: "Source-catalog diagnosis only. Not a Docutis clinician review."
                },
        observations: [
                  {
                              id: "obs-g18-04a",
                              kind: "observation",
                              text: "A broad brown patch rather than a tiny round macule."
                            },
                  {
                              id: "obs-g18-04b",
                              kind: "observation",
                              text: "One edge is darker than the rest of the patch."
                            },
                  {
                              id: "obs-g18-04c",
                              kind: "observation",
                              text: "The outline is scalloped, and the surface is slightly uneven."
                            }
                ],
        interpretations: [
                  {
                              id: "int-g18-04",
                              kind: "interpretation",
                              relatedObservationIds: [
                                            "obs-g18-04a",
                                            "obs-g18-04b",
                                            "obs-g18-04c"
                                          ],
                              text: "A broad patch with uneven color and a scalloped edge is a pattern to describe. The catalog name comes later."
                            }
                ],
        differentials: [
                  {
                              diagnosis: "Cutaneous melanoma",
                              supportingFeatures: [
                                            "Broad uneven brown patch",
                                            "Darker focus at one edge"
                                          ],
                              contradictingFeatures: [
                                            "Subtype and pathology are not in the caption"
                                          ],
                              teachingDistinction: "The NCI caption says melanoma and stops there."
                            },
                  {
                              diagnosis: "Solar lentigo",
                              supportingFeatures: [
                                            "A brown patch on skin can be a lentigo"
                                          ],
                              contradictingFeatures: [
                                            "A lentigo is usually more even in color than this patch"
                                          ],
                              teachingDistinction: "Even color would lean away from this frame. Do not force that lean into a benign label."
                            },
                  {
                              diagnosis: "Seborrheic keratosis",
                              supportingFeatures: [
                                            "Can be a broad brown plaque"
                                          ],
                              contradictingFeatures: [
                                            "A thick stuck-on warty surface is not the dominant look here"
                                          ],
                              teachingDistinction: "Surface texture is the comparison, not a score."
                            }
                ],
        teachingPoints: [
                  {
                              id: "tp-g18-04a",
                              title: "Notice first",
                              text: "Is the patch broad, and is one part darker?"
                            },
                  {
                              id: "tp-g18-04b",
                              title: "Limit",
                              text: "The caption does not name a subtype. Do not add one."
                            }
                ],
        patterns: [
                  {
                              id: "pat-g18-04",
                              label: "Broad uneven brown patch",
                              specificityNote: "A broad brown patch is not specific. Site and subtype are not in this caption."
                            }
                ],
        synthesis: "The frame is a broad brown patch with a darker edge and a scalloped outline. The NCI text says melanoma without subtype or histopathology.",
        evidenceWeighting: "Morphology is visible. Diagnostic weight is a short catalog sentence. Missing subtype is a real gap, not a reason to invent one.",
        diagnosticTrap: "Upgrading a generic melanoma caption into superficial spreading or nodular disease.",
        mentorNote: "This is a differentiation case because benign brown patches are the nearby lookalikes. The source does not show dermoscopy.",
        takeHomeRule: "Do not invent a subtype the caption does not state.",
        academy: {
                  level: 2,
                  spectrum: "melanoma",
                  skillIds: [
                              "variegated-plaque",
                              "color-variegation"
                            ]
                }
      }),

      freezeCase({
        category: "Melanocytic malignancies",
        annotations: [],
        dermoscopicFeatures: [],
        clinicalAction: "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
        managementBrief: "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
        reviewStatus: "clinician review required",
        clinicalReview: null,
        patientContext: {
                  ageBand: null,
                  sex: null,
                  anatomicalSite: "Skin, site not named on the source",
                  presentationNotes: null
                },
        id: "case-g18-05",
        slug: "g18-brown-rim-pale-center",
        title: "Brown lesion with a pale center",
        diagnosisLabel: "Cutaneous melanoma",
        diseaseId: "cutaneous-melanoma",
        educationalLevel: "intermediate",
        caseType: "clinical",
        images: [
                  {
                              type: "clinical",
                              license: "Public domain",
                              licenseUrl: "https://www.usa.gov/government-works",
                              attributionRequired: true,
                              modificationStatus: "other-described",
                              modificationsNotes: "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
                              accessDate: "2026-09-30",
                              metadataCheckedAt: "2026-09-30",
                              sourceVerificationStatus: "verified",
                              patientIdentifiable: false,
                              creator: "Larry Meyer, National Cancer Institute",
                              attribution: "National Cancer Institute. Public domain.",
                              source: "National Cancer Institute, via Wikimedia Commons",
                              consentBasis: "US government public-domain clinical teaching photograph released through NCI Visuals Online and Wikimedia Commons. No name and no full-face portrait are in the frame. Photographer recorded as Larry Meyer. NCI image of a brown lesion.",
                              id: "img-g18-05",
                              src: "assets/media/cases/case-10-clinical.jpg",
                              dimensions: {
                                            width: 562,
                                            height: 712
                                          },
                              alt: "Clinical photograph of a brown and black lesion with an irregular edge and a paler center. No diagnosis is included.",
                              caption: "NCI photograph of a brown lesion. The catalog diagnosis stays hidden until reveal.",
                              sourceUrl: "https://commons.wikimedia.org/wiki/File:Melanoma,_brown_lesion.jpg"
                            }
                ],
        diagnosticGroundTruth: {
                  confirmedDiagnosis: "Cutaneous melanoma (NCI brown-lesion photograph)",
                  confirmationMethod: "source_dataset_diagnosis",
                  confirmationNotes: "The NCI description titles the image melanoma and repeats an ABCD sentence about asymmetry, border, color, and diameter. It does not state histopathology, and it does not use the word regression. The pale center is described here only as color.",
                  confidenceNote: "Source-catalog diagnosis only. The ABCD sentence is boilerplate across several NCI files and is not treated as a measurement."
                },
        observations: [
                  {
                              id: "obs-g18-05a",
                              kind: "observation",
                              text: "A brown-black lesion with an irregular outline."
                            },
                  {
                              id: "obs-g18-05b",
                              kind: "observation",
                              text: "The center is paler than the rim."
                            },
                  {
                              id: "obs-g18-05c",
                              kind: "observation",
                              text: "Fine hairs cross the field. No scale bar is visible."
                            }
                ],
        interpretations: [
                  {
                              id: "int-g18-05",
                              kind: "interpretation",
                              relatedObservationIds: [
                                            "obs-g18-05a",
                                            "obs-g18-05b"
                                          ],
                              text: "A pale center inside an irregular rim is a pattern. It is not automatically regression, because this caption does not say regression."
                            }
                ],
        differentials: [
                  {
                              diagnosis: "Cutaneous melanoma",
                              supportingFeatures: [
                                            "Irregular brown-black rim",
                                            "Source catalog label"
                                          ],
                              contradictingFeatures: [
                                            "No pathology report is cited"
                                          ],
                              teachingDistinction: "The NCI title is melanoma. The pale center is not given a histologic name in that title."
                            },
                  {
                              diagnosis: "Lichenoid keratosis or inflamed benign lesion",
                              supportingFeatures: [
                                            "A pale or pink center can be inflammation"
                                          ],
                              contradictingFeatures: [
                                            "The source does not describe inflammation"
                                          ],
                              teachingDistinction: "Pallor has more than one reading."
                            },
                  {
                              diagnosis: "Scar or treated site",
                              supportingFeatures: [
                                            "A pale center can be a scar"
                                          ],
                              contradictingFeatures: [
                                            "No treatment history is in the caption"
                                          ],
                              teachingDistinction: "Do not invent a procedure that is not in the source."
                            }
                ],
        teachingPoints: [
                  {
                              id: "tp-g18-05a",
                              title: "Notice first",
                              text: "Compare the rim with the center."
                            },
                  {
                              id: "tp-g18-05b",
                              title: "Limit",
                              text: "Do not relabel pallor as regression unless the source says so."
                            }
                ],
        patterns: [
                  {
                              id: "pat-g18-05",
                              label: "Pale center inside a darker rim",
                              specificityNote: "Pallor is not specific and is not a synonym for regression in this caption."
                            }
                ],
        synthesis: "An irregular brown-black lesion has a paler center. The NCI title is melanoma. The repeated ABCD sentence is not a measurement and not histopathology.",
        evidenceWeighting: "The pale center is visible. Regression is not in the source text, so it gets no weight. The diagnosis weight is the catalog title.",
        diagnosticTrap: "Calling every pale center regression, or trusting a boilerplate ABCD line as if each letter were measured.",
        mentorNote: "This photograph is smaller and softer than the other NCI frames. Teach only what remains visible.",
        takeHomeRule: "A pale center is a color finding until the source gives it another name.",
        academy: {
                  level: 3,
                  spectrum: "melanoma",
                  skillIds: [
                              "pale-area",
                              "border-irregularity"
                            ]
                }
      }),

      freezeCase({
        category: "Melanocytic malignancies",
        annotations: [],
        dermoscopicFeatures: [],
        clinicalAction: "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
        managementBrief: "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
        reviewStatus: "clinician review required",
        clinicalReview: null,
        patientContext: {
                  ageBand: null,
                  sex: null,
                  anatomicalSite: "Skin, site not named on the source",
                  presentationNotes: null
                },
        id: "case-g18-06",
        slug: "g18-red-nodule-beside-dark-macule",
        title: "Red nodule beside a dark macule",
        diagnosisLabel: "Superficial spreading melanoma with a contiguous nodule",
        diseaseId: "cutaneous-melanoma",
        educationalLevel: "intermediate",
        caseType: "clinical",
        images: [
                  {
                              type: "clinical",
                              license: "Public domain",
                              licenseUrl: "https://www.usa.gov/government-works",
                              attributionRequired: true,
                              modificationStatus: "cropped",
                              modificationsNotes: "Cropped to remove the ruler and handwritten specimen identifiers, then recompressed. The nodule and adjacent dark macule were kept. No annotation was added.",
                              accessDate: "2026-09-30",
                              metadataCheckedAt: "2026-09-30",
                              sourceVerificationStatus: "verified",
                              patientIdentifiable: false,
                              creator: "National Cancer Institute",
                              attribution: "National Cancer Institute. Public domain.",
                              source: "National Cancer Institute, via Wikimedia Commons",
                              consentBasis: "US government public-domain clinical teaching photograph released through NCI Visuals Online and Wikimedia Commons. No name and no full-face portrait are in the frame. NCI AV-8500-3606. Handwritten initials and a date on the original ruler were cropped out.",
                              id: "img-g18-06",
                              src: "assets/media/cases/case-11-clinical.jpg",
                              dimensions: {
                                            width: 1400,
                                            height: 580
                                          },
                              alt: "Clinical photograph of a shiny red nodule next to a small dark brown macule, inside a black marker line. The ruler has been removed. No diagnosis is included.",
                              caption: "NCI photograph after removal of the ruler and handwritten specimen identifiers. The catalog text stays hidden until reveal.",
                              sourceUrl: "https://commons.wikimedia.org/wiki/File:Melanoma3.jpg"
                            }
                ],
        diagnosticGroundTruth: {
                  confirmedDiagnosis: "Advanced malignant melanoma described by NCI as superficial spreading melanoma plaque with a contiguous amelanotic vertical-growth nodule",
                  confirmationMethod: "source_dataset_diagnosis",
                  confirmationNotes: "The NCI description says this is advanced malignant melanoma, with a plaque of radial-growth superficial spreading melanoma beside a pink amelanotic nodule of vertical growth. It does not use the word histopathology. A general sentence in that caption about prognosis and death is a textbook statement, not an outcome recorded for this person, and it is not repeated as this patient's course. The teaching file is cropped to drop handwritten ruler identifiers.",
                  confidenceNote: "Source-catalog diagnosis only. Not a Docutis clinician review and not a pathology report."
                },
        observations: [
                  {
                              id: "obs-g18-06a",
                              kind: "observation",
                              text: "A shiny red nodule is the most raised part of the field."
                            },
                  {
                              id: "obs-g18-06b",
                              kind: "observation",
                              text: "A smaller dark brown macule sits against that nodule."
                            },
                  {
                              id: "obs-g18-06c",
                              kind: "observation",
                              text: "Black marker ink outlines the area. The original ruler is not in this file."
                            }
                ],
        interpretations: [
                  {
                              id: "int-g18-06",
                              kind: "interpretation",
                              relatedObservationIds: [
                                            "obs-g18-06a",
                                            "obs-g18-06b"
                                          ],
                              text: "A raised red nodule touching a darker macule is a combined pattern. The source, not the outline, assigns the growth-phase names."
                            }
                ],
        differentials: [
                  {
                              diagnosis: "Superficial spreading melanoma with a contiguous nodule",
                              supportingFeatures: [
                                            "Red nodule beside darker pigment",
                                            "NCI description of radial and vertical growth"
                                          ],
                              contradictingFeatures: [
                                            "The caption does not say histopathology"
                                          ],
                              teachingDistinction: "Use the source's own names after reveal. Do not add a Breslow number."
                            },
                  {
                              diagnosis: "Pigmented lesion with a separate angioma",
                              supportingFeatures: [
                                            "A red shiny papule can be vascular"
                                          ],
                              contradictingFeatures: [
                                            "The source describes one contiguous lesion, not two unrelated lesions"
                                          ],
                              teachingDistinction: "Contiguity is the teaching point of the caption."
                            },
                  {
                              diagnosis: "Nodular basal cell carcinoma",
                              supportingFeatures: [
                                            "A red nodule can be a keratinocyte tumor"
                                          ],
                              contradictingFeatures: [
                                            "The source text is melanoma, not basal cell carcinoma"
                                          ],
                              teachingDistinction: "A pink nodule is exactly where the mimic matters."
                            }
                ],
        teachingPoints: [
                  {
                              id: "tp-g18-06a",
                              title: "Notice first",
                              text: "Separate the red nodule from the dark macule, then notice that they touch."
                            },
                  {
                              id: "tp-g18-06b",
                              title: "Limit",
                              text: "Do not turn a general prognosis sentence in an old caption into this person's outcome."
                            }
                ],
        patterns: [
                  {
                              id: "pat-g18-06",
                              label: "Red nodule touching a dark macule",
                              specificityNote: "The combination is concerning and not specific until the source is read. Marker ink is not a dermoscopic structure."
                            }
                ],
        synthesis: "The cropped frame shows a shiny red nodule against a dark macule inside marker ink. NCI calls this advanced melanoma with a superficial spreading component and an amelanotic nodule. Histopathology is not stated.",
        evidenceWeighting: "The two components are visible. Growth-phase names have weight only as NCI wording. The prognostic sentence in the same caption is not evidence about this patient.",
        diagnosticTrap: "Reading marker ink as a clinical border, or quoting the caption's general death sentence as this patient's result.",
        mentorNote: "The crop removed initials and a date. It also removed the scale. Do not estimate millimeters from memory of the uncropped file.",
        takeHomeRule: "A pink nodule beside pigment is described as two findings. Growth-phase labels belong to the source text.",
        academy: {
                  level: 3,
                  spectrum: "melanoma",
                  skillIds: [
                              "nodule-beside-macule"
                            ]
                }
      }),

      freezeCase({
        category: "Melanocytic malignancies",
        annotations: [],
        dermoscopicFeatures: [],
        clinicalAction: "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
        managementBrief: "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
        reviewStatus: "clinician review required",
        clinicalReview: null,
        patientContext: {
                  ageBand: null,
                  sex: null,
                  anatomicalSite: "Skin, site not named on the source",
                  presentationNotes: null
                },
        id: "case-g18-07",
        slug: "g18-flat-area-and-dark-papule",
        title: "Flat brown area beside a blue-black papule",
        diagnosisLabel: "Superficial spreading melanoma arising from a dysplastic nevus",
        diseaseId: "cutaneous-melanoma",
        educationalLevel: "intermediate",
        caseType: "clinical",
        images: [
                  {
                              type: "clinical",
                              license: "Public domain",
                              licenseUrl: "https://www.usa.gov/government-works",
                              attributionRequired: true,
                              modificationStatus: "other-described",
                              modificationsNotes: "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
                              accessDate: "2026-09-30",
                              metadataCheckedAt: "2026-09-30",
                              sourceVerificationStatus: "verified",
                              patientIdentifiable: false,
                              creator: "National Cancer Institute",
                              attribution: "National Cancer Institute. Public domain.",
                              source: "National Cancer Institute, via Wikimedia Commons",
                              consentBasis: "US government public-domain clinical teaching photograph released through NCI Visuals Online and Wikimedia Commons. No name and no full-face portrait are in the frame. NCI AV-8500-3699. The arrow is part of the source photograph and was not added by Docutis.",
                              id: "img-g18-07",
                              src: "assets/media/cases/case-12-clinical.jpg",
                              dimensions: {
                                            width: 1099,
                                            height: 900
                                          },
                              alt: "Clinical photograph of a blue-black raised area next to a flatter brown area, with a printed arrow and a gray zone. No diagnosis is included.",
                              caption: "NCI photograph with a printed arrow already in the source file. The catalog diagnosis stays hidden until reveal.",
                              sourceUrl: "https://commons.wikimedia.org/wiki/File:Melanoma4.jpg"
                            }
                ],
        diagnosticGroundTruth: {
                  confirmedDiagnosis: "Superficial spreading melanoma arising from a dysplastic nevus (NCI caption)",
                  confirmationMethod: "source_dataset_diagnosis",
                  confirmationNotes: "The NCI description says superficial spreading melanoma arising from a dysplastic nevus, identifies the 4-by-8-mm pink-tan area at the arrow as the nevus, calls the blue-black area invasive melanoma, and calls the gray area regression. It does not state histopathology. The 4-by-8-mm figure is the caption's measurement, not a new measurement.",
                  confidenceNote: "Source-catalog diagnosis only. Not a Docutis clinician review."
                },
        observations: [
                  {
                              id: "obs-g18-07a",
                              kind: "observation",
                              text: "A printed arrow points at a flatter brown-pink area."
                            },
                  {
                              id: "obs-g18-07b",
                              kind: "observation",
                              text: "A blue-black raised area with an uneven edge sits next to that flat area."
                            },
                  {
                              id: "obs-g18-07c",
                              kind: "observation",
                              text: "A gray zone lies along the lower left of the dark area."
                            }
                ],
        interpretations: [
                  {
                              id: "int-g18-07",
                              kind: "interpretation",
                              relatedObservationIds: [
                                            "obs-g18-07a",
                                            "obs-g18-07b",
                                            "obs-g18-07c"
                                          ],
                              text: "A flat pigmented area, a darker raised area, and a gray zone are three separate findings. The source names them. The arrow was already printed on the photograph."
                            }
                ],
        differentials: [
                  {
                              diagnosis: "Superficial spreading melanoma arising in a dysplastic nevus",
                              supportingFeatures: [
                                            "Flat area at the printed arrow",
                                            "Blue-black raised area",
                                            "NCI caption"
                                          ],
                              contradictingFeatures: [
                                            "Histopathology is not stated"
                                          ],
                              teachingDistinction: "After reveal, keep the caption's names attached to the areas they name."
                            },
                  {
                              diagnosis: "Melanoma without a precursor nevus",
                              supportingFeatures: [
                                            "A dark raised lesion can stand alone"
                                          ],
                              contradictingFeatures: [
                                            "The caption specifically describes a nevus at the arrow"
                                          ],
                              teachingDistinction: "Do not drop the flat component just because the dark papule dominates."
                            },
                  {
                              diagnosis: "Pigmented basal cell carcinoma",
                              supportingFeatures: [
                                            "Irregular dark pigment"
                                          ],
                              contradictingFeatures: [
                                            "The caption is not a basal cell carcinoma label"
                                          ],
                              teachingDistinction: "Clinical color does not show leaf-like structures."
                            }
                ],
        teachingPoints: [
                  {
                              id: "tp-g18-07a",
                              title: "Notice first",
                              text: "Use the printed arrow as a pointer, not as a new mark."
                            },
                  {
                              id: "tp-g18-07b",
                              title: "Limit",
                              text: "Gray color is visible. Calling it regression is the caption's interpretation, and it is not specific."
                            }
                ],
        patterns: [
                  {
                              id: "pat-g18-07",
                              label: "Flat area, raised dark focus, and gray zone",
                              specificityNote: "Gray-white color is not specific. The regression wording belongs to the NCI caption."
                            }
                ],
        synthesis: "The photograph shows a flat brown-pink area at a printed arrow, a blue-black raised area, and a gray zone. NCI calls this superficial spreading melanoma arising in a dysplastic nevus and calls the gray area regression, without a histopathology sentence.",
        evidenceWeighting: "Three colors and shapes are visible. The 4-by-8-mm measurement and the word regression have weight only as caption text. Histopathology has no weight because it is absent.",
        diagnosticTrap: "Adding your own arrow, or treating regression as a diagnosis you made from gray color.",
        mentorNote: "The arrow is a derivative already present in the public-domain file. Docutis did not draw it.",
        takeHomeRule: "Map each caption phrase to the area it names. Do not merge them into one word.",
        academy: {
                  level: 3,
                  spectrum: "melanoma",
                  skillIds: [
                              "flat-and-raised",
                              "pale-area"
                            ]
                }
      }),

      freezeCase({
        category: "Melanocytic malignancies",
        annotations: [],
        dermoscopicFeatures: [],
        clinicalAction: "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
        managementBrief: "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
        reviewStatus: "clinician review required",
        clinicalReview: null,
        patientContext: {
                  ageBand: "adult",
                  sex: "female",
                  anatomicalSite: "Back, according to the source narrative",
                  presentationNotes: null
                },
        id: "case-g18-08",
        slug: "g18-single-dark-papule",
        title: "Single dark papule with a brown edge",
        diagnosisLabel: "Invasive melanoma arising in a dysplastic nevus",
        diseaseId: "cutaneous-melanoma",
        educationalLevel: "advanced",
        caseType: "clinical",
        images: [
                  {
                              type: "clinical",
                              license: "Public domain",
                              licenseUrl: "https://www.usa.gov/government-works",
                              attributionRequired: true,
                              modificationStatus: "other-described",
                              modificationsNotes: "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
                              accessDate: "2026-09-30",
                              metadataCheckedAt: "2026-09-30",
                              sourceVerificationStatus: "verified",
                              patientIdentifiable: false,
                              creator: "National Cancer Institute",
                              attribution: "National Cancer Institute. Public domain.",
                              source: "National Cancer Institute, via Wikimedia Commons",
                              consentBasis: "US government public-domain clinical teaching photograph released through NCI Visuals Online and Wikimedia Commons. No name and no full-face portrait are in the frame. NCI image 9188. The published file used here is one frame, not a before-and-after pair.",
                              id: "img-g18-08",
                              src: "assets/media/cases/case-13-clinical.jpg",
                              dimensions: {
                                            width: 1259,
                                            height: 1500
                                          },
                              alt: "Clinical photograph of one dark blue-black papule with an irregular brown edge on skin. No earlier photograph and no diagnosis are included.",
                              caption: "Single NCI frame. The follow-up story in the catalog is not a second image in this file.",
                              sourceUrl: "https://commons.wikimedia.org/wiki/File:Melanoma_(3).jpg"
                            }
                ],
        diagnosticGroundTruth: {
                  confirmedDiagnosis: "Invasive malignant melanoma arising in a dysplastic nevus (NCI narrative)",
                  confirmationMethod: "source_dataset_diagnosis",
                  confirmationNotes: "The NCI text says a 40-year-old woman in a melanoma-prone family had moles on the back photographed for follow-up, and that 18 months later the upper nevus had a new 3-mm black nodule which proved to be invasive malignant melanoma arising in a dysplastic nevus. The word histopathology is not used. The file in this case is a single close-up. The earlier cluster, the arrow, and the 18-month interval are narrative, not a second picture here. Age and sex are the source's demographic statement, not identifiers read from the frame.",
                  confidenceNote: "Source narrative only. 'Proved' is not rewritten as a histopathology report."
                },
        observations: [
                  {
                              id: "obs-g18-08a",
                              kind: "observation",
                              text: "One dark blue-black papule."
                            },
                  {
                              id: "obs-g18-08b",
                              kind: "observation",
                              text: "Brown pigment extends irregularly from that papule."
                            },
                  {
                              id: "obs-g18-08c",
                              kind: "observation",
                              text: "No second date, no arrow, and no cluster of other moles is visible in this file."
                            }
                ],
        interpretations: [
                  {
                              id: "int-g18-08",
                              kind: "interpretation",
                              relatedObservationIds: [
                                            "obs-g18-08a",
                                            "obs-g18-08c"
                                          ],
                              text: "This file shows one papule. A story about change over months is not visible in the pixels."
                            }
                ],
        differentials: [
                  {
                              diagnosis: "Invasive melanoma arising in a dysplastic nevus",
                              supportingFeatures: [
                                            "Dark papule with irregular brown edge",
                                            "NCI statement that the nodule proved to be invasive melanoma"
                                          ],
                              contradictingFeatures: [
                                            "The follow-up pair is not in this file",
                                            "Histopathology is not named"
                                          ],
                              teachingDistinction: "Rank this first because of the source narrative, not because the single frame shows 18 months of change."
                            },
                  {
                              diagnosis: "Inflamed or traumatized nevus",
                              supportingFeatures: [
                                            "A dark papule can be a nevus that was irritated"
                                          ],
                              contradictingFeatures: [
                                            "The source says the nodule proved to be invasive melanoma"
                                          ],
                              teachingDistinction: "A benign irritated nevus is the mimic the source is overriding with its narrative, not with a visible timeline."
                            },
                  {
                              diagnosis: "Thrombosed angioma or hemorrhage",
                              supportingFeatures: [
                                            "Blue-black color can be blood"
                                          ],
                              contradictingFeatures: [
                                            "The source diagnosis is melanoma"
                                          ],
                              teachingDistinction: "Blue-black color is not specific for thrombus."
                            }
                ],
        whyNot: [
                  {
                              mimic: "Inflamed nevus",
                              text: "Irritation can darken a nevus, but this caption says the new nodule proved to be invasive melanoma. The photograph alone does not show that proof."
                            },
                  {
                              mimic: "Hemorrhage or thrombosed angioma",
                              text: "Blue-black color fits blood as well as pigment. Nothing in the frame shows a glass-slide test or a resolving bruise. The source diagnosis is what argues against stopping at blood."
                            }
                ],
        teachingPoints: [
                  {
                              id: "tp-g18-08a",
                              title: "Notice first",
                              text: "Say what this one frame contains, not what the caption remembers."
                            },
                  {
                              id: "tp-g18-08b",
                              title: "Limit",
                              text: "Do not rewrite 'proved' as histopathology."
                            }
                ],
        patterns: [
                  {
                              id: "pat-g18-08",
                              label: "Single dark papule",
                              specificityNote: "A dark papule is not specific. Change over time is not visible here."
                            }
                ],
        synthesis: "One dark papule with a brown edge is visible. The NCI narrative adds a family follow-up story and says the nodule proved to be invasive melanoma in a dysplastic nevus. That narrative is not a second photograph and does not say histopathology.",
        evidenceWeighting: "Pixels support a dark papule only. The 18-month change, the 3-mm size, and the diagnosis have weight as source text. Histopathology has none. The demographic sentence is context, not something seen on the skin.",
        diagnosticTrap: "Teaching a before-and-after lesson from a file that contains only the later look, or upgrading 'proved' into a pathology report.",
        mentorNote: "This is an evidence-weighting case. If you cannot point to the earlier photo, do not pretend it is on the page.",
        takeHomeRule: "Separate the frame from the follow-up story, and do not invent the confirmation method.",
        academy: {
                  level: 4,
                  spectrum: "melanoma",
                  skillIds: [
                              "evidence-weighting",
                              "change-not-in-one-photo"
                            ]
                }
      }),

      freezeCase({
        category: "Melanocytic malignancies",
        annotations: [],
        dermoscopicFeatures: [],
        clinicalAction: "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
        managementBrief: "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
        reviewStatus: "clinician review required",
        clinicalReview: null,
        patientContext: {
                  ageBand: null,
                  sex: null,
                  anatomicalSite: "Skin beside a crease; the source does not name the site",
                  presentationNotes: null
                },
        id: "case-g18-09",
        slug: "g18-brown-patch-by-a-crease",
        title: "Brown patch beside a skin crease",
        diagnosisLabel: "Cutaneous melanoma",
        diseaseId: "cutaneous-melanoma",
        educationalLevel: "advanced",
        caseType: "clinical",
        images: [
                  {
                              type: "clinical",
                              license: "Public domain",
                              licenseUrl: "https://www.usa.gov/government-works",
                              attributionRequired: true,
                              modificationStatus: "other-described",
                              modificationsNotes: "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
                              accessDate: "2026-09-30",
                              metadataCheckedAt: "2026-09-30",
                              sourceVerificationStatus: "verified",
                              patientIdentifiable: false,
                              creator: "National Cancer Institute",
                              attribution: "National Cancer Institute. Public domain.",
                              source: "National Cancer Institute, via Wikimedia Commons",
                              consentBasis: "US government public-domain clinical teaching photograph released through NCI Visuals Online and Wikimedia Commons. No name and no full-face portrait are in the frame. NCI diameter-change teaching image. No face is shown.",
                              id: "img-g18-09",
                              src: "assets/media/cases/case-14-clinical.jpg",
                              dimensions: {
                                            width: 1400,
                                            height: 934
                                          },
                              alt: "Clinical photograph of an irregular brown patch on creased skin, with a separate small red spot nearby. No diagnosis is included.",
                              caption: "NCI photograph whose caption mentions a diameter change. The change itself is not a second frame.",
                              sourceUrl: "https://commons.wikimedia.org/wiki/File:Melanoma_with_diameter_change.jpg"
                            }
                ],
        diagnosticGroundTruth: {
                  confirmedDiagnosis: "Cutaneous melanoma (NCI image described as diameter change)",
                  confirmationMethod: "source_dataset_diagnosis",
                  confirmationNotes: "The NCI description says this is melanoma whose diameter had changed, as part of an ABCD set. A changed diameter is not visible in one photograph. Histopathology is not stated.",
                  confidenceNote: "Source-catalog diagnosis only. The history of change is text, not a measured difference in this file."
                },
        observations: [
                  {
                              id: "obs-g18-09a",
                              kind: "observation",
                              text: "An irregular brown patch lies next to a skin crease."
                            },
                  {
                              id: "obs-g18-09b",
                              kind: "observation",
                              text: "The patch is darker in the center than at some edges."
                            },
                  {
                              id: "obs-g18-09c",
                              kind: "observation",
                              text: "A separate small red macule sits nearby. Only one date is in the file."
                            }
                ],
        interpretations: [
                  {
                              id: "int-g18-09",
                              kind: "interpretation",
                              relatedObservationIds: [
                                            "obs-g18-09a",
                                            "obs-g18-09c"
                                          ],
                              text: "You can describe the patch. You cannot see that it grew, because growth needs two looks or a stated history."
                            }
                ],
        differentials: [
                  {
                              diagnosis: "Cutaneous melanoma",
                              supportingFeatures: [
                                            "Irregular brown patch",
                                            "NCI statement that the diameter had changed"
                                          ],
                              contradictingFeatures: [
                                            "Change is not visible in this single frame",
                                            "No histopathology sentence"
                                          ],
                              teachingDistinction: "The diagnosis and the history of change are both source text."
                            },
                  {
                              diagnosis: "Seborrheic keratosis",
                              supportingFeatures: [
                                            "A brown rough patch near a crease can be a seborrheic keratosis"
                                          ],
                              contradictingFeatures: [
                                            "The source label is melanoma"
                                          ],
                              teachingDistinction: "Stuck-on lesions are the mimic. This frame does not show a thick warty plate clearly enough to prefer that mimic over the source."
                            },
                  {
                              diagnosis: "Solar lentigo",
                              supportingFeatures: [
                                            "Brown patch on sun-exposed-looking skin"
                                          ],
                              contradictingFeatures: [
                                            "The center is darker and less uniform than a typical even lentigo"
                                          ],
                              teachingDistinction: "Evenness would support a lentigo. It is not what dominates here, and it would still not erase the source label."
                            }
                ],
        whyNot: [
                  {
                              mimic: "Seborrheic keratosis",
                              text: "A brown patch can be a seborrheic keratosis. This frame does not show a thick waxy, stuck-on surface as its main feature, and the source calls the lesion melanoma. That is not a probability."
                            },
                  {
                              mimic: "Solar lentigo",
                              text: "A lentigo is usually a more even brown patch. The darker center argues against stopping at a lentigo, but a single photo still does not show the diameter change the caption mentions."
                            }
                ],
        teachingPoints: [
                  {
                              id: "tp-g18-09a",
                              title: "Notice first",
                              text: "Describe the patch that is actually in the frame."
                            },
                  {
                              id: "tp-g18-09b",
                              title: "Limit",
                              text: "A caption can assert change that one picture cannot display."
                            }
                ],
        patterns: [
                  {
                              id: "pat-g18-09",
                              label: "Irregular brown patch",
                              specificityNote: "An irregular brown patch is not specific. Change in size is not visible in one frame."
                            }
                ],
        synthesis: "An irregular brown patch is visible beside a crease, with a separate small red macule. NCI calls the lesion melanoma and says the diameter had changed. The change is not in the image.",
        evidenceWeighting: "Border and color are visible. History of growth has weight only as caption text. A nearby red macule is a separate finding, not proof of growth.",
        diagnosticTrap: "Narrating growth you cannot see, or ignoring a stated history because the picture is static.",
        mentorNote: "The small red spot is in the frame. Do not fold it into the brown patch without a reason.",
        takeHomeRule: "One photograph cannot show that a diameter changed.",
        academy: {
                  level: 4,
                  spectrum: "melanoma",
                  skillIds: [
                              "change-not-in-one-photo",
                              "border-irregularity"
                            ]
                }
      }),

      freezeCase({
        category: "Melanocytic malignancies",
        annotations: [],
        dermoscopicFeatures: [],
        clinicalAction: "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
        managementBrief: "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
        reviewStatus: "clinician review required",
        clinicalReview: null,
        patientContext: {
                  ageBand: null,
                  sex: null,
                  anatomicalSite: "Skin, site not named on the source",
                  presentationNotes: null
                },
        id: "case-g18-10",
        slug: "g18-pink-nodule-in-a-drape",
        title: "Pink nodule inside a drape",
        diagnosisLabel: "Amelanotic melanoma",
        diseaseId: "cutaneous-melanoma",
        educationalLevel: "advanced",
        caseType: "clinical",
        images: [
                  {
                              type: "clinical",
                              license: "CC BY 4.0",
                              licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
                              attributionRequired: true,
                              modificationStatus: "other-described",
                              modificationsNotes: "Resized and recompressed for web delivery (max width 1600 px) and file metadata removed. No crop and no annotation.",
                              accessDate: "2026-09-30",
                              metadataCheckedAt: "2026-09-30",
                              sourceVerificationStatus: "verified",
                              patientIdentifiable: false,
                              id: "img-g18-10",
                              src: "assets/media/cases/case-15-clinical.jpg",
                              dimensions: {
                                            width: 1600,
                                            height: 1200
                                          },
                              alt: "Clinical photograph of a shiny pink nodule on skin inside a blue surgical drape, with a few small brown macules nearby. No diagnosis is included.",
                              caption: "Clinician-authored photograph of a pink nodule. The author's diagnosis stays hidden until reveal.",
                              source: "Dr. Thomas Brinkmeier / WIKIDERM, via Wikimedia Commons",
                              sourceUrl: "https://commons.wikimedia.org/wiki/File:Amelanotisches,_malignes_Melanom,_%C2%A9wikiderm.de.jpg",
                              creator: "Dr. Thomas Brinkmeier",
                              attribution: "Dr. Thomas Brinkmeier, WIKIDERM. CC BY 4.0.",
                              consentBasis: "Clinician own-work educational photograph on Wikimedia Commons under CC BY 4.0. The frame is a draped close-up without a face or a name."
                            }
                ],
        diagnosticGroundTruth: {
                  confirmedDiagnosis: "Amelanotic melanoma (clinician-authored label)",
                  confirmationMethod: "expert_diagnosis",
                  confirmationNotes: "The Commons description by Dr. Thomas Brinkmeier calls this a macroscopic image of an amelanotic malignant melanoma. Histopathology is not cited. The source does not say the word nodular as a subtype, so nodular subtype is not added even though the lesion is raised. This file is not paired with the separate dermoscopic photograph, because the source does not say they are the same lesion.",
                  confidenceNote: "Expert author label only. Not a Docutis clinician review."
                },
        observations: [
                  {
                              id: "obs-g18-10a",
                              kind: "observation",
                              text: "A shiny pink nodule without brown pigment in the nodule itself."
                            },
                  {
                              id: "obs-g18-10b",
                              kind: "observation",
                              text: "The surface looks moist, and a little pinkness is at the base."
                            },
                  {
                              id: "obs-g18-10c",
                              kind: "observation",
                              text: "A blue drape surrounds the field. A few small brown macules are on nearby skin."
                            }
                ],
        interpretations: [
                  {
                              id: "int-g18-10",
                              kind: "interpretation",
                              relatedObservationIds: [
                                            "obs-g18-10a",
                                            "obs-g18-10b"
                                          ],
                              text: "Absence of brown pigment does not make a nodule harmless. The author label is a separate fact from the pink color."
                            }
                ],
        differentials: [
                  {
                              diagnosis: "Amelanotic melanoma",
                              supportingFeatures: [
                                            "Pink nodule",
                                            "Clinician-authored label of amelanotic melanoma"
                                          ],
                              contradictingFeatures: [
                                            "No histopathology is cited",
                                            "Subtype is not stated"
                                          ],
                              teachingDistinction: "Rank the author's diagnosis first after you have described the lack of pigment."
                            },
                  {
                              diagnosis: "Nodular basal cell carcinoma",
                              supportingFeatures: [
                                            "A pink nodule is a common keratinocyte-tumor look"
                                          ],
                              contradictingFeatures: [
                                            "The author label is melanoma, not basal cell carcinoma"
                                          ],
                              teachingDistinction: "This is the main mimic. Vessel clues are not available in this clinical file."
                            },
                  {
                              diagnosis: "Pyogenic granuloma",
                              supportingFeatures: [
                                            "A moist red nodule can be a pyogenic granuloma"
                                          ],
                              contradictingFeatures: [
                                            "The author label is melanoma"
                                          ],
                              teachingDistinction: "Bleeding friable nodules overlap. The photograph does not show a collar of scale clearly enough to prefer granuloma."
                            }
                ],
        whyNot: [
                  {
                              mimic: "Nodular basal cell carcinoma",
                              text: "A pink nodule is a basal cell carcinoma until proven otherwise in many clinics. Here the author label is amelanotic melanoma, and this clinical frame does not show branching vessels. That does not make the mimic impossible."
                            },
                  {
                              mimic: "Pyogenic granuloma",
                              text: "A moist red nodule suggests a pyogenic granuloma. A collarette is not clearly recorded in this description, and the source diagnosis is melanoma. Friability alone would not decide it."
                            }
                ],
        teachingPoints: [
                  {
                              id: "tp-g18-10a",
                              title: "Notice first",
                              text: "Say that the nodule itself is pink, not brown."
                            },
                  {
                              id: "tp-g18-10b",
                              title: "Limit",
                              text: "Do not call it nodular subtype. The source says amelanotic melanoma, and the shape is a nodule."
                            }
                ],
        patterns: [
                  {
                              id: "pat-g18-10",
                              label: "Pink nodule without pigment",
                              specificityNote: "Lack of pigment is not reassuring and is not specific."
                            }
                ],
        synthesis: "A shiny pink nodule sits in a drape. Dr. Thomas Brinkmeier labels it amelanotic melanoma. Histopathology and histologic subtype are not stated. A separate dermoscopic file was not assumed to be the same lesion.",
        evidenceWeighting: "The pink nodule is visible. The diagnosis weight is an expert author label. Histopathology has no weight. Nearby brown macules are background, not part of the nodule.",
        diagnosticTrap: "Reassuring yourself because the lesion is not brown, or pairing it with an unmatched dermoscopic image.",
        mentorNote: "CC BY 4.0 allows a resized derivative. The note records the resize. No marks were drawn.",
        takeHomeRule: "A pink nodule still needs a melanoma line in the differential. Pigment is not required.",
        academy: {
                  level: 4,
                  spectrum: "melanoma",
                  skillIds: [
                              "pink-nodule"
                            ]
                }
      }),

      freezeCase({
        category: "Melanocytic malignancies",
        annotations: [],
        dermoscopicFeatures: [
                  {
                              token: "polymorphous_vessels",
                              label: "Dotted and irregular linear red vessels"
                            },
                  {
                              token: "structureless_areas",
                              label: "Paler pink center inside the marked circle"
                            }
                ],
        clinicalAction: "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
        managementBrief: "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
        reviewStatus: "clinician review required",
        clinicalReview: null,
        patientContext: {
                  ageBand: null,
                  sex: null,
                  anatomicalSite: "Not specified; dermoscopic close-up",
                  presentationNotes: null
                },
        id: "case-g18-11",
        slug: "g18-pink-field-with-vessels",
        title: "Pink field with more than one vessel shape",
        diagnosisLabel: "Amelanotic melanoma",
        diseaseId: "cutaneous-melanoma",
        educationalLevel: "advanced",
        caseType: "dermoscopic",
        images: [
                  {
                              type: "dermoscopy",
                              license: "CC BY 4.0",
                              licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
                              attributionRequired: true,
                              modificationStatus: "other-described",
                              modificationsNotes: "Resized and recompressed for web delivery (max width 1600 px) and file metadata removed. No crop and no annotation.",
                              accessDate: "2026-09-30",
                              metadataCheckedAt: "2026-09-30",
                              sourceVerificationStatus: "verified",
                              patientIdentifiable: false,
                              id: "img-g18-11",
                              src: "assets/media/cases/case-16-dermoscopy.jpg",
                              dimensions: {
                                            width: 1600,
                                            height: 1200
                                          },
                              alt: "Dermoscopic photograph of a pink field with dotted and linear red vessels, a white circular mark, and a 0 to 10 scale. No diagnosis is included.",
                              caption: "Clinician-authored dermoscopic photograph. The author's diagnosis stays hidden until reveal.",
                              source: "Dr. Thomas Brinkmeier / WIKIDERM, via Wikimedia Commons",
                              sourceUrl: "https://commons.wikimedia.org/wiki/File:Dermatoskopie-Bild_eines_amelanotischen,_malignen_Melanoms,_%C2%A9wikiderm.de.jpg",
                              creator: "Dr. Thomas Brinkmeier",
                              attribution: "Dr. Thomas Brinkmeier, WIKIDERM. CC BY 4.0.",
                              consentBasis: "Clinician own-work educational dermoscopy on Wikimedia Commons under CC BY 4.0. No face is in the frame."
                            }
                ],
        diagnosticGroundTruth: {
                  confirmedDiagnosis: "Amelanotic melanoma (clinician-authored dermoscopic label)",
                  confirmationMethod: "expert_diagnosis",
                  confirmationNotes: "The Commons description calls this a dermoscopic image of an amelanotic malignant melanoma. Histopathology is not cited. The white circle and 0-10 scale are in the source image. This file is not paired with the clinical nodule photograph, because the source does not state they are the same lesion and the shapes do not match.",
                  confidenceNote: "Expert author label only. Not a Docutis clinician review."
                },
        observations: [
                  {
                              id: "obs-g18-11a",
                              kind: "observation",
                              text: "A round dermoscopic field of pink skin."
                            },
                  {
                              id: "obs-g18-11b",
                              kind: "observation",
                              text: "Red vessels include both dots and short irregular lines, mostly around a paler pink center."
                            },
                  {
                              id: "obs-g18-11c",
                              kind: "observation",
                              text: "A white circular mark and a 0 to 10 scale are printed in the image."
                            }
                ],
        interpretations: [
                  {
                              id: "int-g18-11",
                              kind: "interpretation",
                              relatedObservationIds: [
                                            "obs-g18-11b",
                                            "obs-g18-11c"
                                          ],
                              text: "More than one vessel shape on a pink field is the dermoscopic finding. The circle is a mark already in the file, not a structure of the lesion."
                            }
                ],
        differentials: [
                  {
                              diagnosis: "Amelanotic melanoma",
                              supportingFeatures: [
                                            "More than one vessel shape",
                                            "Author label of amelanotic melanoma"
                                          ],
                              contradictingFeatures: [
                                            "Vessels are not specific",
                                            "No histopathology is cited"
                                          ],
                              teachingDistinction: "The author label is the diagnosis. The vessels are the clue, not proof."
                            },
                  {
                              diagnosis: "Basal cell carcinoma",
                              supportingFeatures: [
                                            "Pink field with vessels"
                                          ],
                              contradictingFeatures: [
                                            "Classic branching vessels are not the pattern described here"
                                          ],
                              teachingDistinction: "Compare vessel shape. Branching vessels would push attention toward basal cell carcinoma; mixed dots and lines do not settle it."
                            },
                  {
                              diagnosis: "Inflamed benign lesion",
                              supportingFeatures: [
                                            "Dotted vessels occur in inflamed skin"
                                          ],
                              contradictingFeatures: [
                                            "The author label is melanoma"
                                          ],
                              teachingDistinction: "Dotted vessels alone are a famous false friend."
                            }
                ],
        whyNot: [
                  {
                              mimic: "Basal cell carcinoma",
                              text: "A pink dermoscopic field can be basal cell carcinoma. This frame's vessels are mixed dots and lines rather than a single arborizing tree, which argues against using basal cell carcinoma as the only reading. It does not exclude it."
                            },
                  {
                              mimic: "Inflamed benign skin",
                              text: "Dotted vessels are common in inflamed benign lesions. The author label is melanoma, and a paler center with irregular lines is why inflammation is not the whole story. Vessel pattern is not specific."
                            }
                ],
        teachingPoints: [
                  {
                              id: "tp-g18-11a",
                              title: "Notice first",
                              text: "Name the vessel shapes before the diagnosis."
                            },
                  {
                              id: "tp-g18-11b",
                              title: "Limit",
                              text: "Do not call the white circle a dermoscopic structure. It is a mark in the file."
                            }
                ],
        patterns: [
                  {
                              id: "pat-g18-11",
                              label: "Mixed vessel shapes on pink skin",
                              specificityNote: "Mixed vessels raise concern. They are not specific for one tumor and they are not a probability."
                            }
                ],
        synthesis: "Dermoscopy shows dotted and linear red vessels around a paler pink center, plus a printed circle and scale. The author calls it amelanotic melanoma. Histopathology is not cited, and this is not merged with the clinical nodule file.",
        evidenceWeighting: "Vessel shapes are visible. The diagnosis is an expert label. Specificity of polymorphous vessels is low, so the label carries the diagnosis and the vessels carry the teaching clue.",
        diagnosticTrap: "Treating any pink vessel pattern as basal cell carcinoma, or treating the printed circle as shiny white lines.",
        mentorNote: "If you cannot tell dotted from linear in this file, say so. Do not invent milky-red globules.",
        takeHomeRule: "More than one vessel shape is a clue with low specificity. Read the source diagnosis separately.",
        academy: {
                  level: 4,
                  spectrum: "melanoma",
                  skillIds: [
                              "polymorphous-vessels",
                              "evidence-weighting"
                            ]
                }
      }),

      freezeCase({
        category: "Melanocytic malignancies",
        annotations: [],
        dermoscopicFeatures: [],
        clinicalAction: "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
        managementBrief: "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
        reviewStatus: "clinician review required",
        clinicalReview: null,
        patientContext: {
                  ageBand: "older adult",
                  sex: "female",
                  anatomicalSite: "Thumb nail unit",
                  presentationNotes: null
                },
        id: "case-g18-12",
        slug: "g18-damaged-thumb-nail",
        title: "Damaged thumbnail with dark debris",
        diagnosisLabel: "Melanoma of the thumb",
        diseaseId: "acral-melanoma",
        educationalLevel: "advanced",
        caseType: "clinical",
        images: [
                  {
                              type: "clinical",
                              license: "CC BY 4.0",
                              licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
                              attributionRequired: true,
                              modificationStatus: "other-described",
                              modificationsNotes: "Resized and recompressed for web delivery (max width 1400 px) and file metadata removed. No crop and no annotation.",
                              accessDate: "2026-09-30",
                              metadataCheckedAt: "2026-09-30",
                              sourceVerificationStatus: "verified",
                              patientIdentifiable: false,
                              id: "img-g18-12",
                              src: "assets/media/cases/case-17-clinical.jpg",
                              dimensions: {
                                            width: 1400,
                                            height: 1868
                                          },
                              alt: "Clinical photograph of a thumb with a destroyed nail plate, dark and pale debris, and a small red mark on the nearby skin. No diagnosis is included.",
                              caption: "Commons photograph of a thumb. The one-line source diagnosis stays hidden until reveal.",
                              source: "Wawjak, via Wikimedia Commons",
                              sourceUrl: "https://commons.wikimedia.org/wiki/File:Melanoma_of_thumb.jpg",
                              creator: "Wawjak",
                              attribution: "Wawjak. CC BY 4.0. Via Wikimedia Commons.",
                              consentBasis: "Photograph published by the creator on Wikimedia Commons under CC BY 4.0. The frame shows a thumb and part of a hand, not a face or a name."
                            }
                ],
        diagnosticGroundTruth: {
                  confirmedDiagnosis: "Melanoma of the thumb (Commons description)",
                  confirmationMethod: "clinical_diagnosis",
                  confirmationNotes: "The Commons description states melanoma of the thumb of an 82-year-old woman. It does not name a clinician role, histopathology, or an acral-lentiginous subtype. The Docutis disease link is the existing acral melanoma record because that is the nearest condition page, not because the caption used that subtype. The exact age is the source sentence; the case record stores only an older-adult band.",
                  confidenceNote: "Uploader clinical label only. Not histopathology and not a Docutis clinician review."
                },
        observations: [
                  {
                              id: "obs-g18-12a",
                              kind: "observation",
                              text: "The thumbnail plate is largely destroyed or lifted."
                            },
                  {
                              id: "obs-g18-12b",
                              kind: "observation",
                              text: "Dark brown-black material and pale debris occupy the nail bed area."
                            },
                  {
                              id: "obs-g18-12c",
                              kind: "observation",
                              text: "A small red mark is on the skin just beyond the nail, and cloth is at the side of the finger."
                            }
                ],
        interpretations: [
                  {
                              id: "int-g18-12",
                              kind: "interpretation",
                              relatedObservationIds: [
                                            "obs-g18-12a",
                                            "obs-g18-12b"
                                          ],
                              text: "A destroyed nail with dark debris has a wide differential. A pigmented streak is not described because a clear longitudinal band is not the finding in this frame."
                            }
                ],
        differentials: [
                  {
                              diagnosis: "Melanoma of the thumb",
                              supportingFeatures: [
                                            "Destroyed nail with dark debris",
                                            "Source statement of thumb melanoma"
                                          ],
                              contradictingFeatures: [
                                            "No histopathology",
                                            "No stated clinician role"
                                          ],
                              teachingDistinction: "The source diagnosis is used as a clinical label. It is the weakest confirmation method in this academy."
                            },
                  {
                              diagnosis: "Nail-unit squamous cell carcinoma or other keratinocyte tumor",
                              supportingFeatures: [
                                            "Nail destruction can be a keratinocyte tumor"
                                          ],
                              contradictingFeatures: [
                                            "The source text says melanoma"
                                          ],
                              teachingDistinction: "Nail destruction is not specific for a melanocytic tumor."
                            },
                  {
                              diagnosis: "Trauma with hematoma and nail dystrophy",
                              supportingFeatures: [
                                            "Blood and a broken nail follow injury"
                                          ],
                              contradictingFeatures: [
                                            "No injury history is written on the page",
                                            "The source diagnosis is melanoma"
                                          ],
                              teachingDistinction: "Do not invent trauma to explain dark nail debris."
                            }
                ],
        whyNot: [
                  {
                              mimic: "Subungual hematoma from trauma",
                              text: "Blood under a nail is common and can look black. This frame shows plate destruction and debris rather than a discrete pool of blood with an intact plate, and the source calls it melanoma. A trauma history is not in the caption."
                            },
                  {
                              mimic: "Nail-unit squamous cell carcinoma",
                              text: "Squamous cell carcinoma destroys nails and can bleed. The source text says melanoma and does not discuss keratinocyte carcinoma. Destruction alone cannot separate them, which is why this label is weak without pathology."
                            }
                ],
        teachingPoints: [
                  {
                              id: "tp-g18-12a",
                              title: "Notice first",
                              text: "Describe the nail plate and the debris. Do not force a longitudinal band you cannot see."
                            },
                  {
                              id: "tp-g18-12b",
                              title: "Limit",
                              text: "An uploader sentence is not histopathology and not a subtype."
                            }
                ],
        patterns: [
                  {
                              id: "pat-g18-12",
                              label: "Destroyed nail plate with dark debris",
                              specificityNote: "Nail destruction is not specific for a melanocytic tumor."
                            }
                ],
        synthesis: "The thumbnail is destroyed, with dark and pale debris. The Commons line says melanoma of the thumb in an older woman and cites neither histopathology nor a subtype. The acral melanoma record is only the nearest Docutis page.",
        evidenceWeighting: "Nail destruction is visible. Diagnostic weight is a one-line clinical label, which is lower than an expert-attributed or pathology-cited source. Subtype and Hutchinson wording get no weight because they are not in the source and a clear pigmented fold streak is not claimed.",
        diagnosticTrap: "Diagnosing a stripe that is not there, or treating this uploader line as if it were a pathology report.",
        mentorNote: "This is the advanced evidence case because the picture is dramatic and the confirmation is thin. Drama is not certainty.",
        takeHomeRule: "Nail destruction needs a differential. A short source line does not become histopathology.",
        academy: {
                  level: 5,
                  spectrum: "melanoma",
                  skillIds: [
                              "nail-unit-damage",
                              "evidence-weighting"
                            ]
                }
      }),

      freezeCase({
        category: "Keratinocyte carcinomas",
        annotations: [],
        dermoscopicFeatures: [],
        clinicalAction: "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
        managementBrief: "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
        reviewStatus: "clinician review required",
        clinicalReview: null,
        patientContext: {
                  ageBand: null,
                  sex: null,
                  anatomicalSite: "Skin, site not named on the source",
                  presentationNotes: null
                },
        id: "case-g18-13",
        slug: "g18-small-pink-scaly-spot",
        title: "Small pink scaly spot",
        diagnosisLabel: "Superficial basal cell carcinoma",
        diseaseId: "basal-cell-carcinoma",
        educationalLevel: "intermediate",
        caseType: "clinical",
        images: [
                  {
                              type: "clinical",
                              license: "Public domain",
                              licenseUrl: "https://www.usa.gov/government-works",
                              attributionRequired: true,
                              modificationStatus: "other-described",
                              modificationsNotes: "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
                              accessDate: "2026-09-30",
                              metadataCheckedAt: "2026-09-30",
                              sourceVerificationStatus: "verified",
                              patientIdentifiable: false,
                              creator: "Kelly Nelson, National Cancer Institute",
                              attribution: "National Cancer Institute. Public domain.",
                              source: "National Cancer Institute, via Wikimedia Commons",
                              consentBasis: "US government public-domain clinical teaching photograph released through NCI Visuals Online and Wikimedia Commons. No name and no full-face portrait are in the frame. Photographer recorded as Kelly Nelson. NCI image 9236.",
                              id: "img-g18-13",
                              src: "assets/media/cases/case-18-clinical.jpg",
                              dimensions: {
                                            width: 720,
                                            height: 480
                                          },
                              alt: "Clinical photograph of a small pink, slightly scaly spot on skin among a few brown macules. No diagnosis is included.",
                              caption: "NCI photograph of a small pink spot. The catalog diagnosis stays hidden until reveal.",
                              sourceUrl: "https://commons.wikimedia.org/wiki/File:Basal_cell_carcinoma,_superficial.jpg"
                            }
                ],
        diagnosticGroundTruth: {
                  confirmedDiagnosis: "Superficial basal cell carcinoma (NCI label)",
                  confirmationMethod: "source_dataset_diagnosis",
                  confirmationNotes: "The NCI description says a pink, scaly lesion and titles it superficial basal cell carcinoma. Histopathology is not stated.",
                  confidenceNote: "Source-catalog diagnosis only. Not a Docutis clinician review."
                },
        observations: [
                  {
                              id: "obs-g18-13a",
                              kind: "observation",
                              text: "A small pink spot, slightly scaly, on otherwise quiet skin."
                            },
                  {
                              id: "obs-g18-13b",
                              kind: "observation",
                              text: "It is flat to barely raised rather than a large nodule."
                            },
                  {
                              id: "obs-g18-13c",
                              kind: "observation",
                              text: "A few unrelated-looking brown macules are in the same field."
                            }
                ],
        interpretations: [
                  {
                              id: "int-g18-13",
                              kind: "interpretation",
                              relatedObservationIds: [
                                            "obs-g18-13a",
                                            "obs-g18-13b"
                                          ],
                              text: "A small pink scaly spot is easy to call harmless. The job is to keep a differential, not to be reassured by size."
                            }
                ],
        differentials: [
                  {
                              diagnosis: "Superficial basal cell carcinoma",
                              supportingFeatures: [
                                            "Small pink scaly spot",
                                            "NCI title"
                                          ],
                              contradictingFeatures: [
                                            "No histopathology is stated"
                                          ],
                              teachingDistinction: "The catalog name is the keratinocyte-tumor label."
                            },
                  {
                              diagnosis: "Amelanotic melanoma",
                              supportingFeatures: [
                                            "A pink lesion can be a melanoma without pigment"
                                          ],
                              contradictingFeatures: [
                                            "The source title is basal cell carcinoma"
                                          ],
                              teachingDistinction: "This is why the spot is in the melanoma pathway as a mimic. Size does not remove that line."
                            },
                  {
                              diagnosis: "Actinic keratosis or dermatitis",
                              supportingFeatures: [
                                            "Scale on a pink spot can be a keratosis or dermatitis"
                                          ],
                              contradictingFeatures: [
                                            "The source title is a carcinoma, not dermatitis"
                                          ],
                              teachingDistinction: "Scale is shared. Do not stop at dermatitis because the spot is small."
                            }
                ],
        teachingPoints: [
                  {
                              id: "tp-g18-13a",
                              title: "Notice first",
                              text: "Size and scale, not a disease name."
                            },
                  {
                              id: "tp-g18-13b",
                              title: "Limit",
                              text: "A small pink spot is not a benign conclusion."
                            }
                ],
        patterns: [
                  {
                              id: "pat-g18-13",
                              label: "Small pink scaly spot",
                              specificityNote: "Scale on a small pink spot is not specific."
                            }
                ],
        synthesis: "A small pink scaly spot is visible. NCI calls it superficial basal cell carcinoma and does not cite histopathology. In this pathway it is a mimic, not a melanoma.",
        evidenceWeighting: "Pink scale is visible. The diagnosis is the NCI title. The melanoma line in the differential is a safety mimic, not a second source diagnosis.",
        diagnosticTrap: "Dismissing a small pink spot, or calling it melanoma because you are studying melanoma.",
        mentorNote: "The photograph is modest. That is acceptable if the finding you teach is actually there.",
        takeHomeRule: "A small pink scaly spot still has a melanoma line and a keratinocyte-tumor line.",
        academy: {
                  level: 2,
                  spectrum: "mimic",
                  skillIds: [
                              "pink-scaly-spot"
                            ]
                }
      }),

      freezeCase({
        category: "Keratinocyte carcinomas",
        annotations: [],
        dermoscopicFeatures: [],
        clinicalAction: "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
        managementBrief: "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
        reviewStatus: "clinician review required",
        clinicalReview: null,
        patientContext: {
                  ageBand: null,
                  sex: null,
                  anatomicalSite: "Ear",
                  presentationNotes: null
                },
        id: "case-g18-14",
        slug: "g18-small-eroded-spot-on-the-ear",
        title: "Small eroded spot on the ear",
        diagnosisLabel: "Ulcerated basal cell carcinoma",
        diseaseId: "basal-cell-carcinoma",
        educationalLevel: "intermediate",
        caseType: "clinical",
        images: [
                  {
                              type: "clinical",
                              license: "Public domain",
                              licenseUrl: "https://www.usa.gov/government-works",
                              attributionRequired: true,
                              modificationStatus: "other-described",
                              modificationsNotes: "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
                              accessDate: "2026-09-30",
                              metadataCheckedAt: "2026-09-30",
                              sourceVerificationStatus: "verified",
                              patientIdentifiable: false,
                              creator: "Kelly Nelson, National Cancer Institute",
                              attribution: "National Cancer Institute. Public domain.",
                              source: "National Cancer Institute, via Wikimedia Commons",
                              consentBasis: "US government public-domain clinical teaching photograph released through NCI Visuals Online and Wikimedia Commons. No name and no full-face portrait are in the frame. Photographer recorded as Kelly Nelson. NCI image 9235. The frame shows an ear and hair, not a full face.",
                              id: "img-g18-14",
                              src: "assets/media/cases/case-19-clinical.jpg",
                              dimensions: {
                                            width: 1025,
                                            height: 684
                                          },
                              alt: "Clinical photograph of an ear held by fingers, with a small red eroded spot on the ear. Hair is at the edge. No diagnosis is included.",
                              caption: "NCI photograph of an ear. The catalog diagnosis stays hidden until reveal.",
                              sourceUrl: "https://commons.wikimedia.org/wiki/File:Basal_cell_carcinoma_(1).jpg"
                            }
                ],
        diagnosticGroundTruth: {
                  confirmedDiagnosis: "Ulcerated basal cell carcinoma (NCI label)",
                  confirmationMethod: "source_dataset_diagnosis",
                  confirmationNotes: "The NCI description says a red, ulcerated lesion on the right ear with a white border and calls it ulcerated basal cell carcinoma with a pearly rim. Histopathology is not stated. The erosion is the obvious finding; a pearly rim is the caption's phrase and is not upgraded beyond that.",
                  confidenceNote: "Source-catalog diagnosis only. Not a Docutis clinician review."
                },
        observations: [
                  {
                              id: "obs-g18-14a",
                              kind: "observation",
                              text: "The frame is an ear held by fingers, with hair at the edge."
                            },
                  {
                              id: "obs-g18-14b",
                              kind: "observation",
                              text: "A small red eroded spot is on the ear."
                            },
                  {
                              id: "obs-g18-14c",
                              kind: "observation",
                              text: "The spot is focal rather than a large ulcer."
                            }
                ],
        interpretations: [
                  {
                              id: "int-g18-14",
                              kind: "interpretation",
                              relatedObservationIds: [
                                            "obs-g18-14b",
                                            "obs-g18-14c"
                                          ],
                              text: "A small erosion on the ear is the finding. Sun-exposed skin does not tell you which tumor it is."
                            }
                ],
        differentials: [
                  {
                              diagnosis: "Ulcerated basal cell carcinoma",
                              supportingFeatures: [
                                            "Small red erosion on the ear",
                                            "NCI title"
                                          ],
                              contradictingFeatures: [
                                            "Histopathology is not stated"
                                          ],
                              teachingDistinction: "The catalog name includes ulcerated basal cell carcinoma. Pearly rim is caption language."
                            },
                  {
                              diagnosis: "Amelanotic melanoma",
                              supportingFeatures: [
                                            "A red eroded papule can be a melanoma without pigment"
                                          ],
                              contradictingFeatures: [
                                            "The source title is basal cell carcinoma"
                                          ],
                              teachingDistinction: "Ear lesions are a classic place not to drop the melanoma line."
                            },
                  {
                              diagnosis: "Chondrodermatitis or traumatized skin",
                              supportingFeatures: [
                                            "The ear is easy to injure"
                                          ],
                              contradictingFeatures: [
                                            "The source title is a carcinoma"
                                          ],
                              teachingDistinction: "Pain and a history of pressure are not in this caption."
                            }
                ],
        teachingPoints: [
                  {
                              id: "tp-g18-14a",
                              title: "Notice first",
                              text: "Site is the ear. The finding is a small erosion."
                            },
                  {
                              id: "tp-g18-14b",
                              title: "Limit",
                              text: "Do not insist on a pearly rim if you are not sure you see it. The caption says it; your eyes still have to agree."
                            }
                ],
        patterns: [
                  {
                              id: "pat-g18-14",
                              label: "Small erosion on the ear",
                              specificityNote: "A small erosion is not specific."
                            }
                ],
        synthesis: "A small red erosion is visible on an ear. NCI calls it ulcerated basal cell carcinoma and mentions a pearly rim. Histopathology is not stated. It is a mimic in this pathway.",
        evidenceWeighting: "Erosion and site are visible. The pearly-rim phrase has weight as caption text, not as a structure Docutis drew. The melanoma differential is a safety line, not a second label.",
        diagnosticTrap: "Calling every ear papule a basal cell carcinoma and dropping melanoma, or claiming a pearly rim you cannot see.",
        mentorNote: "The partial ear and hair are not a named portrait. No name is in the file.",
        takeHomeRule: "On the ear, describe the erosion and keep both a keratinocyte tumor and a non-pigmented melanoma in mind.",
        academy: {
                  level: 2,
                  spectrum: "mimic",
                  skillIds: [
                              "eroded-papule"
                            ]
                }
      }),

      freezeCase({
        category: "Keratinocyte carcinomas",
        annotations: [],
        dermoscopicFeatures: [],
        clinicalAction: "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
        managementBrief: "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
        reviewStatus: "clinician review required",
        clinicalReview: null,
        patientContext: {
                  ageBand: null,
                  sex: null,
                  anatomicalSite: "Lower back, according to the source label",
                  presentationNotes: null
                },
        id: "case-g18-15",
        slug: "g18-shiny-red-papule",
        title: "Shiny red papule on hair-bearing skin",
        diagnosisLabel: "Basal cell carcinoma",
        diseaseId: "basal-cell-carcinoma",
        educationalLevel: "intermediate",
        caseType: "clinical",
        images: [
                  {
                              type: "clinical",
                              license: "Public domain",
                              licenseUrl: "https://www.usa.gov/government-works",
                              attributionRequired: true,
                              modificationStatus: "cropped",
                              modificationsNotes: "Cropped to remove the handwritten date and site label, then recompressed. The red papule was kept. No annotation was added. The source text places the lesion on the lower back.",
                              accessDate: "2026-09-30",
                              metadataCheckedAt: "2026-09-30",
                              sourceVerificationStatus: "verified",
                              patientIdentifiable: false,
                              creator: "National Cancer Institute",
                              attribution: "National Cancer Institute. Public domain.",
                              source: "National Cancer Institute, via Wikimedia Commons",
                              consentBasis: "US government public-domain clinical teaching photograph released through NCI Visuals Online and Wikimedia Commons. No name and no full-face portrait are in the frame. NCI image 2164. The handwritten date and site card were cropped out.",
                              id: "img-g18-15",
                              src: "assets/media/cases/case-20-clinical.jpg",
                              dimensions: {
                                            width: 1400,
                                            height: 674
                                          },
                              alt: "Clinical photograph of a shiny red round papule on hair-bearing skin. The handwritten label has been removed. No diagnosis is included.",
                              caption: "NCI photograph after the handwritten date and site label were cropped off. The catalog diagnosis stays hidden until reveal.",
                              sourceUrl: "https://commons.wikimedia.org/wiki/File:Basal_cell_carcinoma_(2).jpg"
                            }
                ],
        diagnosticGroundTruth: {
                  confirmedDiagnosis: "Basal cell carcinoma (NCI clinical description)",
                  confirmationMethod: "source_dataset_diagnosis",
                  confirmationNotes: "The NCI description says a small reddish or brownish papule, often with telangiectatic vessels, which may look translucent or pearly, with a possible central depression and rolled borders. The title context is basal cell carcinoma. Histopathology is not stated in that caption. Telangiectasia and a pearly quality are caption language; this teaching note does not claim every one of those structures is obvious after the crop.",
                  confidenceNote: "Source-catalog diagnosis only. Not a Docutis clinician review."
                },
        observations: [
                  {
                              id: "obs-g18-15a",
                              kind: "observation",
                              text: "A solitary shiny red papule on hair-bearing skin."
                            },
                  {
                              id: "obs-g18-15b",
                              kind: "observation",
                              text: "The papule is round and raised, with a bright uneven top."
                            },
                  {
                              id: "obs-g18-15c",
                              kind: "observation",
                              text: "The handwritten card and ruler from the original file are not in this crop."
                            }
                ],
        interpretations: [
                  {
                              id: "int-g18-15",
                              kind: "interpretation",
                              relatedObservationIds: [
                                            "obs-g18-15a",
                                            "obs-g18-15b"
                                          ],
                              text: "A solitary shiny red papule is a pattern shared by several tumors. Hair around it is background, not a diagnosis."
                            }
                ],
        differentials: [
                  {
                              diagnosis: "Basal cell carcinoma",
                              supportingFeatures: [
                                            "Shiny red papule",
                                            "NCI description of a basal cell carcinoma papule"
                                          ],
                              contradictingFeatures: [
                                            "Histopathology is not stated",
                                            "Not every caption feature is equally obvious"
                                          ],
                              teachingDistinction: "The source diagnosis is the keratinocyte tumor. Do not add vessels you are unsure about."
                            },
                  {
                              diagnosis: "Amelanotic melanoma",
                              supportingFeatures: [
                                            "A red papule can be a melanoma without pigment"
                                          ],
                              contradictingFeatures: [
                                            "The source text describes basal cell carcinoma"
                                          ],
                              teachingDistinction: "This mimic relationship is the reason the case is in the pathway."
                            },
                  {
                              diagnosis: "Pyogenic granuloma",
                              supportingFeatures: [
                                            "A bright red papule can be a pyogenic granuloma"
                                          ],
                              contradictingFeatures: [
                                            "The source text is basal cell carcinoma"
                                          ],
                              teachingDistinction: "A moist bleeding papule overlaps. A collarette is not recorded as the main finding here."
                            }
                ],
        teachingPoints: [
                  {
                              id: "tp-g18-15a",
                              title: "Notice first",
                              text: "Solitary, red, shiny, raised."
                            },
                  {
                              id: "tp-g18-15b",
                              title: "Limit",
                              text: "If you cannot see vessels, do not draw them in words."
                            }
                ],
        patterns: [
                  {
                              id: "pat-g18-15",
                              label: "Solitary shiny red papule",
                              specificityNote: "A shiny red papule is not specific."
                            }
                ],
        synthesis: "A shiny red papule remains after the label was cropped off. NCI describes a basal cell carcinoma papule and mentions vessels and a pearly look as general features. Histopathology is not stated.",
        evidenceWeighting: "The red papule is visible. Caption phrases about vessels and pearliness are not given extra weight beyond what a viewer can confirm. The site 'lower back' is source text because the card was removed.",
        diagnosticTrap: "Inventing telangiectasia to match a textbook sentence, or forgetting melanoma because the papule is red.",
        mentorNote: "The crop is a de-identification edit of a date card, not a clinical annotation.",
        takeHomeRule: "A shiny red papule keeps amelanotic melanoma in the differential even when the source says basal cell carcinoma.",
        academy: {
                  level: 3,
                  spectrum: "mimic",
                  skillIds: [
                              "shiny-red-papule"
                            ]
                }
      }),

      freezeCase({
        category: "Keratinocyte carcinomas",
        annotations: [],
        dermoscopicFeatures: [],
        clinicalAction: "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
        managementBrief: "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
        reviewStatus: "clinician review required",
        clinicalReview: null,
        patientContext: {
                  ageBand: null,
                  sex: null,
                  anatomicalSite: "Skin, site not named on the source",
                  presentationNotes: null
                },
        id: "case-g18-16",
        slug: "g18-nodule-with-a-dark-center",
        title: "Nodule with a dark plugged center",
        diagnosisLabel: "Keratoacanthoma",
        diseaseId: "keratoacanthoma",
        educationalLevel: "advanced",
        caseType: "clinical",
        images: [
                  {
                              type: "clinical",
                              license: "Public domain",
                              licenseUrl: "https://www.usa.gov/government-works",
                              attributionRequired: true,
                              modificationStatus: "other-described",
                              modificationsNotes: "Recompressed for web delivery and file metadata removed. No crop and no annotation. The source scan is already low resolution.",
                              accessDate: "2026-09-30",
                              metadataCheckedAt: "2026-09-30",
                              sourceVerificationStatus: "verified",
                              patientIdentifiable: false,
                              creator: "Armed Forces Institute of Pathology",
                              attribution: "Armed Forces Institute of Pathology. Public domain.",
                              source: "Armed Forces Institute of Pathology Atlas of Tumor Pathology, via Wikimedia Commons",
                              consentBasis: "US federal Armed Forces Institute of Pathology teaching plate released as a public-domain Commons file. No name and no face are in the frame.",
                              id: "img-g18-16",
                              src: "assets/media/cases/case-21-clinical.jpg",
                              dimensions: {
                                            width: 632,
                                            height: 512
                                          },
                              alt: "Clinical photograph of a round red nodule with a dark, rough center. The image is soft. No diagnosis is included.",
                              caption: "AFIP atlas plate of a clinical nodule. The plate's diagnosis stays hidden until reveal.",
                              sourceUrl: "https://commons.wikimedia.org/wiki/File:Keratoacanthoma.jpg"
                            }
                ],
        diagnosticGroundTruth: {
                  confirmedDiagnosis: "Keratoacanthoma (AFIP clinical plate)",
                  confirmationMethod: "source_dataset_diagnosis",
                  confirmationNotes: "The Commons description says the plate illustrates a keratoacanthoma in a section on clinical manifestations of epidermal neoplasms, from the AFIP Atlas of Tumor Pathology. It does not quote a microscopy report, so histopathology is not claimed even though the book is a tumor atlas.",
                  confidenceNote: "Atlas label only. Not a Docutis clinician review."
                },
        observations: [
                  {
                              id: "obs-g18-16a",
                              kind: "observation",
                              text: "A round red nodule fills most of the frame."
                            },
                  {
                              id: "obs-g18-16b",
                              kind: "observation",
                              text: "The center is darker and looks plugged or crater-like."
                            },
                  {
                              id: "obs-g18-16c",
                              kind: "observation",
                              text: "The photograph is soft and low in detail. Fine vessels are not resolved."
                            }
                ],
        interpretations: [
                  {
                              id: "int-g18-16",
                              kind: "interpretation",
                              relatedObservationIds: [
                                            "obs-g18-16a",
                                            "obs-g18-16b"
                                          ],
                              text: "A crater or plug is a shape. It is shared by more than one keratinizing tumor and can be confused with a pigmented nodule."
                            }
                ],
        differentials: [
                  {
                              diagnosis: "Keratoacanthoma",
                              supportingFeatures: [
                                            "Crater-like dark center",
                                            "AFIP plate label"
                                          ],
                              contradictingFeatures: [
                                            "No microscopy quote",
                                            "Image detail is limited"
                                          ],
                              teachingDistinction: "The atlas label is keratoacanthoma. The shape is what you can check."
                            },
                  {
                              diagnosis: "Nodular melanoma",
                              supportingFeatures: [
                                            "A dark raised center can be a melanoma nodule"
                                          ],
                              contradictingFeatures: [
                                            "The plate label is keratoacanthoma"
                                          ],
                              teachingDistinction: "This is the melanoma trap. A dark center is not pigment until you can say so, and this file is too soft to map dermoscopic pigment."
                            },
                  {
                              diagnosis: "Cutaneous squamous cell carcinoma",
                              supportingFeatures: [
                                            "Keratinizing nodules overlap with keratoacanthoma"
                                          ],
                              contradictingFeatures: [
                                            "The plate says keratoacanthoma rather than squamous cell carcinoma"
                                          ],
                              teachingDistinction: "Many practices treat that overlap as a pathology question. This caption does not resolve it with a quote from a report."
                            }
                ],
        whyNot: [
                  {
                              mimic: "Nodular melanoma",
                              text: "A dark nodule is where nodular melanoma hides. This plate is labeled keratoacanthoma, and the dark center reads as a plug in a red rim rather than as an irregular brown plaque. The file is too soft to exclude melanoma by pattern alone."
                            },
                  {
                              mimic: "Squamous cell carcinoma",
                              text: "Keratoacanthoma and squamous cell carcinoma overlap clinically. The atlas title chooses keratoacanthoma and does not quote a microscopy report, so the separation is the label plus the crater shape, not a Docutis pathology review."
                            }
                ],
        teachingPoints: [
                  {
                              id: "tp-g18-16a",
                              title: "Notice first",
                              text: "Red rim, dark center, round outline."
                            },
                  {
                              id: "tp-g18-16b",
                              title: "Limit",
                              text: "An atlas plate is not the same sentence as a histopathology report."
                            }
                ],
        patterns: [
                  {
                              id: "pat-g18-16",
                              label: "Crater or plug in a red nodule",
                              specificityNote: "A crater is not specific for one keratinizing tumor and is not proof against a melanocytic nodule."
                            }
                ],
        synthesis: "A soft photograph shows a round red nodule with a dark center. The AFIP plate says keratoacanthoma and does not quote microscopy. It is the crateriform mimic in this pathway.",
        evidenceWeighting: "The crater shape is visible at low detail. The diagnosis is the atlas label. Histopathology is not quoted, so it is not counted. Image quality limits how many structures you may name.",
        diagnosticTrap: "Calling every dark nodule melanoma, or calling every crater a keratoacanthoma without reading the label's limits.",
        mentorNote: "Low resolution was accepted because the crater is still the teaching point and better licensed crater images were not added as filler.",
        takeHomeRule: "A plugged center is a shape. Read the source label, and do not pretend a tumor atlas sentence is a slide review.",
        academy: {
                  level: 4,
                  spectrum: "mimic",
                  skillIds: [
                              "crateriform-center"
                            ]
                }
      })
    ])
  });
}());
