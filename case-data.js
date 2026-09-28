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
      })
    ])
  });
}());
