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
    return Object.freeze({
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
    });
  }

  window.DOCUTIS_CASES = Object.freeze({
    schemaVersion: 1,
    title: "Clinical Cases",
    disclaimer: "Educational progressive disclosure only. Cases are not clinical decision support and do not replace professional judgment. Image interpretation is not physician attestation.",
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
          anatomicalSite: "Left plantar foot",
          presentationNotes: "Large asymmetric dark-brown macule on the left plantar foot in the source photograph. The paper also describes spread toward the toes; that extension is a separate figure, not this image."
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
          { id: "tp-am-5", title: "Why this fits", text: "Published clinical morphology matches a large acral lentiginous melanoma later confirmed histologically (Clark level IV, Breslow 2.6 mm in the source paper). Large size is not the same as advanced-stage disease." }
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
          alt: "Dermoscopic close-up of pink to salmon skin with in-focus branching red vessels and a few small dark red-brown foci. A pale curved line and a millimetre scale are also visible.",
          caption: "Dermatoscopy labeled by the clinician author as nodular basal cell carcinoma. The frame shows branching vessels on a pink background; translucency is not separately described by the source.",
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
          { id: "obs-bccn-1", kind: "observation", text: "Circular dermoscopic close-up of pink to salmon skin." },
          { id: "obs-bccn-2", kind: "observation", text: "Branching red vessels are in focus, with thicker stems dividing into finer branches." },
          { id: "obs-bccn-3", kind: "observation", text: "No regular pigment network is visible." },
          { id: "obs-bccn-4", kind: "observation", text: "A few small dark red-brown foci are visible. A pale curved line and a millimetre scale are also in the frame and are photograph markings, not dermoscopic structures." }
        ],
        interpretations: [
          { id: "int-bccn-1", kind: "interpretation", relatedObservationIds: ["obs-bccn-2", "obs-bccn-3"], text: "In-focus branching vessels on a pink background are dermoscopic findings associated with basal cell carcinoma. They support that pattern but are not specific enough to exclude mimics." }
        ],
        dermoscopicFeatures: [
          { token: "arborizing_vessels", label: "Arborizing / branching vessels" },
          { token: "telangiectasia", label: "Telangiectatic vessels" }
        ],
        differentials: [
          {
            diagnosis: "Basal cell carcinoma (nodular)",
            supportingFeatures: ["In-focus branching vessels", "Pink background without a pigment network"],
            contradictingFeatures: [],
            teachingDistinction: "Author-labeled nodular BCC; vascular clues are the teaching focus."
          },
          {
            diagnosis: "Amelanotic / hypomelanotic melanoma",
            supportingFeatures: ["Can show atypical vessels"],
            contradictingFeatures: ["In-focus branching vessels on a pink background favor BCC over a banal vascular pattern in this labeled example"],
            teachingDistinction: "Always keep amelanotic melanoma in mind for atypical pink lesions; confirmation pathway is clinical-pathologic, not image quiz alone."
          },
          {
            diagnosis: "Sebaceous hyperplasia / other adnexal nodule",
            supportingFeatures: ["Pink lesions with vessels can mimic BCC; the source does not name a body site"],
            contradictingFeatures: ["Crown vessels of sebaceous hyperplasia differ from arborizing BCC vessels"],
            teachingDistinction: "Vessel morphology and overall pattern help, but uncertain lesions need clinicopathologic correlation."
          }
        ],
        teachingPoints: [
          { id: "tp-bccn-1", title: "Notice first", text: "Look for vessel morphology before committing to a diagnosis name." },
          { id: "tp-bccn-2", title: "Key features", text: "In-focus branching vessels are a supportive BCC dermoscopic clue on this frame. They are not pathognomonic." },
          { id: "tp-bccn-3", title: "Pitfall", text: "Pink lesions are not automatically BCC; amelanotic melanoma remains an important differential. Do not read the pale curved line as a shiny white structure." },
          { id: "tp-bccn-4", title: "Why this fits", text: "The clinician-authored label is nodular basal cell carcinoma. The visible teaching clue is the branching vessels. Nodularity and translucency are not demonstrated by this dermoscopic frame, and histopathology is not cited on the source page." }
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
          alt: "Dermoscopic close-up with asymmetric brown leaf-like pigment aggregates and terminal hairs, without a regular pigment network. A millimetre scale is visible.",
          caption: "Dermatoscopy labeled by the clinician author as pigmented basal cell carcinoma on the back. Leaf-like brown pigment is the visible clue; blue-gray ovoid nests are not clearly shown.",
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
          { id: "obs-bccp-1", kind: "observation", text: "Brown pigmented structures in a dermoscopic field that also contains terminal hairs." },
          { id: "obs-bccp-2", kind: "observation", text: "Asymmetric distribution of pigment." },
          { id: "obs-bccp-3", kind: "observation", text: "Leaf-like brown pigment aggregates rather than a regular reticular melanocytic network." }
        ],
        interpretations: [
          { id: "int-bccp-1", kind: "interpretation", relatedObservationIds: ["obs-bccp-2", "obs-bccp-3"], text: "Leaf-like brown pigment without a typical nevus network can be associated with pigmented basal cell carcinoma. Blue-gray ovoid nests are a recognized BCC clue but are not clearly shown on this frame. Melanoma remains an important differential." }
        ],
        dermoscopicFeatures: [
          { token: "maple_leaf_areas", label: "Maple leaf-like brown pigment areas" },
          { token: "other", label: "Brown to grey-brown pigment clumps without a regular pigment network. Blue-gray ovoid nests are not clearly shown." }
        ],
        differentials: [
          {
            diagnosis: "Pigmented basal cell carcinoma",
            supportingFeatures: ["Leaf-like brown pigment aggregates", "Absent regular nevus network"],
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
          { id: "tp-bccp-2", title: "Key features", text: "Maple-leaf-like brown pigment supports the author-labeled pigmented BCC on this frame. Do not teach blue-gray ovoid nests as present here; they are not clearly shown." },
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
          { id: "obs-scc-1", kind: "observation", text: "Two neighboring lesions in the same close-up field." },
          { id: "obs-scc-2", kind: "observation", text: "One lesion is more raised, with a rough keratotic surface." },
          { id: "obs-scc-3", kind: "observation", text: "The neighboring lesion is flatter, pink-red and scaly." },
          { id: "obs-scc-4", kind: "observation", text: "Purple ink marks sit in the field. The photograph alone does not show which mark was the biopsy target." }
        ],
        interpretations: [
          { id: "int-scc-1", kind: "interpretation", relatedObservationIds: ["obs-scc-1", "obs-scc-2", "obs-scc-3"], text: "The pairing illustrates the AK–SCC continuum: a more raised keratotic focus beside an adjacent actinic keratosis." }
        ],
        dermoscopicFeatures: [],
        differentials: [
          {
            diagnosis: "Cutaneous squamous cell carcinoma",
            supportingFeatures: ["Raised keratotic focus", "Uploader SCC label"],
            contradictingFeatures: [],
            teachingDistinction: "Primary teaching diagnosis for the marked lesion per source caption."
          },
          {
            diagnosis: "Actinic keratosis (adjacent)",
            supportingFeatures: ["Flatter pink-red scaly neighbor", "Same close-up field"],
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
          { id: "tp-scc-1", title: "Notice first", text: "Compare the more raised keratotic focus with the flatter neighbor before naming either." },
          { id: "tp-scc-2", title: "Key features", text: "SCC can arise in a field of actinic damage beside residual AK." },
          { id: "tp-scc-3", title: "Pitfall", text: "Do not dismiss a hypertrophic focus because nearby thinner AKs look familiar." },
          { id: "tp-scc-4", title: "Why this fits", text: "Uploader caption explicitly pairs well-differentiated SCC with adjacent AK." }
        ],
        clinicalAction: "Open the Docutis cutaneous squamous cell carcinoma record; also compare actinic keratosis for continuum context.",
        annotations: [],
        reviewStatus: "clinician review required",
        clinicalReview: null
      })
    ])
  });
}());
