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
    if (Array.isArray(item.observationPrompts)) frozen.observationPrompts = Object.freeze([...item.observationPrompts]);
    if (Array.isArray(item.hints)) frozen.hints = Object.freeze([...item.hints]);
    if (item.closestMimic) frozen.closestMimic = Object.freeze({ ...item.closestMimic });
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
      disclaimer: "Learn Melanoma is a teaching sequence. It does not certify competence, estimate a probability, or act as a diagnostic device. New cases stay review required. Teaching type is a lesson shape, not a diagnosis and not a score.",
      levels: Object.freeze([
        Object.freeze({ level: 1, key: "recognition", title: "Recognition", aim: "Describe shape, border and color before naming a diagnosis." }),
        Object.freeze({ level: 2, key: "differentiation", title: "Differentiation", aim: "Separate a pigmented or pink lesion from a nearby mimic using what is actually visible." }),
        Object.freeze({ level: 3, key: "pattern-integration", title: "Pattern integration", aim: "Hold two findings together, including a flat area beside a raised area, without upgrading a caption." }),
        Object.freeze({ level: 4, key: "diagnostic-traps", title: "Diagnostic traps", aim: "Notice what a single photograph cannot prove, and say why two mimics remain possible." }),
        Object.freeze({ level: 5, key: "advanced-reasoning", title: "Advanced reasoning", aim: "Weight a source statement against the frame in front of you, including nail-unit damage." })
      ]),
      qualityGate: Object.freeze({
        id: "academy-primary-path",
        kind: "qualitative",
        summary: "A primary-path case needs a source, a local image, a differential, a distinct skill assignment, and honest review status. Academy cases also need observation prompts, feature certainty and weight, a closest mimic, and a non-trivial trap or take-home rule. Legacy pilots stay on the path without new clinical fields. This is not a numeric score and not a pass mark."
      }),
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
        Object.freeze({ id: "evidence-weighting", title: "Evidence weighting", summary: "Separate the visible frame, the source sentence, and what the source does not say." }),
        Object.freeze({ id: "nevus-range", title: "Range of ordinary moles", summary: "A plate can hold a small brown spot and a dark papule. One panel does not answer for the others, and a benign label is not a guarantee." }),
        Object.freeze({ id: "stuck-on-surface", title: "Stuck-on rough surface", summary: "A rough surface that looks stuck on the skin is a clue. It is not proof of a benign lesion." }),
        Object.freeze({ id: "fissured-surface", title: "Ridged surface", summary: "Ridges under a dermatoscope are described before a diagnosis is borrowed from another photograph." }),
        Object.freeze({ id: "many-brown-macules", title: "Many flat brown macules", summary: "A field of flat brown macules is not one broad patch, and it does not clear every spot." }),
        Object.freeze({ id: "bright-red-papule", title: "Bright red papule", summary: "A bright red papule is a color finding. A second similar papule is part of the frame, not a proof." }),
        Object.freeze({ id: "blue-color", title: "Blue color", summary: "Blue is a color. It does not assign a subtype and it does not make the next blue-black lesion safe." }),
        Object.freeze({ id: "marked-cheek-patch", title: "Marked cheek patch", summary: "Separate ink from the brown patch. A biopsy mark is not a result." }),
        Object.freeze({ id: "grouped-papules", title: "Grouped papules", summary: "A group of papules is not the same frame as one shiny red papule." })
      ]),
      entries: Object.freeze([
        Object.freeze({ caseId: "case-g18-01", order: 1, level: 1, spectrum: "melanoma", teachingType: "teaching", skillIds: Object.freeze(["asymmetry", "evidence-weighting"]) }),
        Object.freeze({ caseId: "case-g18-02", order: 2, level: 1, spectrum: "melanoma", teachingType: "teaching", skillIds: Object.freeze(["border-irregularity"]) }),
        Object.freeze({ caseId: "case-g18-03", order: 3, level: 1, spectrum: "melanoma", teachingType: "teaching", skillIds: Object.freeze(["color-variegation"]) }),
        Object.freeze({ caseId: "case-g18-04", order: 4, level: 2, spectrum: "melanoma", teachingType: "teaching", skillIds: Object.freeze(["variegated-plaque", "color-variegation"]) }),
        Object.freeze({ caseId: "case-g18-13", order: 5, level: 2, spectrum: "mimic", teachingType: "teaching", skillIds: Object.freeze(["pink-scaly-spot"]) }),
        Object.freeze({ caseId: "case-acral-melanoma-plantar", order: 6, level: 2, spectrum: "melanoma", teachingType: "teaching", skillIds: Object.freeze(["acral-pigment", "asymmetry"]) }),
        Object.freeze({ caseId: "case-g18-14", order: 7, level: 2, spectrum: "mimic", teachingType: "teaching", skillIds: Object.freeze(["eroded-papule"]) }),
        Object.freeze({ caseId: "case-bcc-nodular-dermoscopy", order: 8, level: 2, spectrum: "mimic", teachingType: "teaching", skillIds: Object.freeze(["vessel-pattern", "pink-nodule"]) }),
        Object.freeze({ caseId: "case-g18-05", order: 9, level: 3, spectrum: "melanoma", teachingType: "reasoning", skillIds: Object.freeze(["pale-area", "border-irregularity"]) }),
        Object.freeze({ caseId: "case-g18-06", order: 10, level: 3, spectrum: "melanoma", teachingType: "reasoning", skillIds: Object.freeze(["nodule-beside-macule"]) }),
        Object.freeze({ caseId: "case-g18-15", order: 11, level: 3, spectrum: "mimic", teachingType: "teaching", skillIds: Object.freeze(["shiny-red-papule"]) }),
        Object.freeze({ caseId: "case-bcc-pigmented-dermoscopy", order: 12, level: 3, spectrum: "mimic", teachingType: "teaching", skillIds: Object.freeze(["pigment-architecture"]) }),
        Object.freeze({ caseId: "case-g18-07", order: 13, level: 3, spectrum: "melanoma", teachingType: "reasoning", skillIds: Object.freeze(["flat-and-raised", "pale-area"]) }),
        Object.freeze({ caseId: "case-g18-10", order: 14, level: 4, spectrum: "melanoma", teachingType: "reasoning", skillIds: Object.freeze(["pink-nodule"]) }),
        Object.freeze({ caseId: "case-g18-11", order: 15, level: 4, spectrum: "melanoma", teachingType: "expert-challenge", skillIds: Object.freeze(["polymorphous-vessels", "evidence-weighting"]) }),
        Object.freeze({ caseId: "case-g18-09", order: 16, level: 4, spectrum: "melanoma", teachingType: "reasoning", skillIds: Object.freeze(["change-not-in-one-photo", "border-irregularity"]) }),
        Object.freeze({ caseId: "case-g18-08", order: 17, level: 4, spectrum: "melanoma", teachingType: "expert-challenge", skillIds: Object.freeze(["evidence-weighting", "change-not-in-one-photo"]) }),
        Object.freeze({ caseId: "case-g18-16", order: 18, level: 4, spectrum: "mimic", teachingType: "reasoning", skillIds: Object.freeze(["crateriform-center"]) }),
        Object.freeze({ caseId: "case-g18-12", order: 19, level: 5, spectrum: "melanoma", teachingType: "expert-challenge", skillIds: Object.freeze(["nail-unit-damage", "evidence-weighting"]) }),
        Object.freeze({ caseId: "case-g21-01", order: 20, level: 1, spectrum: "mimic", teachingType: "teaching", skillIds: Object.freeze(["nevus-range"]) }),
        Object.freeze({ caseId: "case-g21-02", order: 21, level: 2, spectrum: "mimic", teachingType: "teaching", skillIds: Object.freeze(["stuck-on-surface"]) }),
        Object.freeze({ caseId: "case-g21-03", order: 22, level: 2, spectrum: "mimic", teachingType: "teaching", skillIds: Object.freeze(["fissured-surface"]) }),
        Object.freeze({ caseId: "case-g21-04", order: 23, level: 2, spectrum: "mimic", teachingType: "teaching", skillIds: Object.freeze(["many-brown-macules"]) }),
        Object.freeze({ caseId: "case-g21-05", order: 24, level: 2, spectrum: "mimic", teachingType: "teaching", skillIds: Object.freeze(["bright-red-papule"]) }),
        Object.freeze({ caseId: "case-g21-06", order: 25, level: 3, spectrum: "mimic", teachingType: "reasoning", skillIds: Object.freeze(["blue-color"]) }),
        Object.freeze({ caseId: "case-g21-08", order: 26, level: 3, spectrum: "mimic", teachingType: "teaching", skillIds: Object.freeze(["grouped-papules"]) }),
        Object.freeze({ caseId: "case-g21-07", order: 27, level: 4, spectrum: "melanoma", teachingType: "expert-challenge", skillIds: Object.freeze(["marked-cheek-patch"]) })
      ])
    }),

    teachingDiagnoses: Object.freeze([
      Object.freeze({ id: "melanocytic-nevus", name: "Melanocytic nevus", pole: "benign", monograph: false, reviewStatus: "clinician review required", clinicalReview: null, limitation: "Teaching diagnosis for case linkage. Not a condition monograph and not a treatment record." }),
      Object.freeze({ id: "seborrheic-keratosis", name: "Seborrheic keratosis", pole: "benign", monograph: false, reviewStatus: "clinician review required", clinicalReview: null, limitation: "Teaching diagnosis for case linkage. Not a condition monograph and not a treatment record." }),
      Object.freeze({ id: "solar-lentigo", name: "Solar lentigo", pole: "benign", monograph: false, reviewStatus: "clinician review required", clinicalReview: null, limitation: "Teaching diagnosis for case linkage. Not a condition monograph and not a treatment record." }),
      Object.freeze({ id: "cherry-angioma", name: "Cherry angioma", pole: "benign", monograph: false, reviewStatus: "clinician review required", clinicalReview: null, limitation: "Teaching diagnosis for case linkage. Not a condition monograph and not a treatment record." }),
      Object.freeze({ id: "blue-nevus", name: "Blue nevus", pole: "benign", monograph: false, reviewStatus: "clinician review required", clinicalReview: null, limitation: "Teaching diagnosis for case linkage. Not a condition monograph and not a treatment record." }),
      Object.freeze({ id: "sebaceous-hyperplasia", name: "Sebaceous hyperplasia", pole: "benign", monograph: false, reviewStatus: "clinician review required", clinicalReview: null, limitation: "Teaching diagnosis for case linkage. Not a condition monograph and not a treatment record." })
    ]),
    screening: Object.freeze({
      schemaVersion: 1,
      purpose: "Vocabulary for a future session. Not a simulation, not a score, and not a stored decision.",
      categories: Object.freeze([
        Object.freeze({ id: "routine-benign-impression", label: "Routine or benign impression" }),
        Object.freeze({ id: "monitor", label: "Monitor" }),
        Object.freeze({ id: "further-dermoscopy", label: "Further dermoscopy" }),
        Object.freeze({ id: "biopsy-excision-consideration", label: "Biopsy or excision consideration" }),
        Object.freeze({ id: "specialist-evaluation", label: "Specialist evaluation" })
      ])
    }),
    comparisons: Object.freeze([
      Object.freeze({
        id: "cmp-nevus-dark-papule",
        caseIdA: "case-g21-01",
        caseIdB: "case-g18-08",
        sharedFeatures: Object.freeze(["A solitary dark papule is in one panel of the plate and is the lesion in the other photograph."]),
        favouringA: Object.freeze(["The source caption calls the plate ordinary moles and also shows small brown macules and a pale papule."]),
        favouringB: Object.freeze(["That case is one lesion. Its caption says invasive melanoma arising in a dysplastic nevus. It is not a five-panel plate."]),
        discriminator: null,
        commonTrap: "Letting the calmest panel answer for the dark papule.",
        limits: "No single discriminator in these frames separates the dark panel from that melanoma photograph. The NCI plate assigns histologic names without a slide in the file. Those names are not re-verified."
      }),
      Object.freeze({
        id: "cmp-sk-color",
        caseIdA: "case-g21-02",
        caseIdB: "case-g18-03",
        sharedFeatures: Object.freeze(["More than one brown or dark color is visible in the lesion."]),
        favouringA: Object.freeze(["The surface is rough and looks stuck on the skin. The caption says seborrheic keratosis and does not cite histopathology."]),
        favouringB: Object.freeze(["The NCI caption names cutaneous melanoma for the color example. That frame is not a thick rough plate."]),
        discriminator: "In these two frames, a rough stuck-on surface versus a color mix without that rough plate is the difference you can point to. It is not a rule for the next lesion.",
        commonTrap: "Stopping at the first familiar benign name because the colors overlap.",
        limits: "Neither caption used here is a histopathology report. Neither source names a body site."
      }),
      Object.freeze({
        id: "cmp-sk-border",
        caseIdA: "case-g21-02",
        caseIdB: "case-g18-02",
        sharedFeatures: Object.freeze(["The outline is not a smooth oval."]),
        favouringA: Object.freeze(["The surface is rough and stuck-on."]),
        favouringB: Object.freeze(["The melanoma teaching frame shows a notch. Its caption is the NCI border example."]),
        discriminator: "A notch and a rough stuck-on surface are different if you can see both. If you cannot, do not force a winner.",
        commonTrap: "Calling every uneven edge one diagnosis.",
        limits: "No histopathology is in either caption. The scale in the melanoma frame is not a measurement."
      }),
      Object.freeze({
        id: "cmp-sk-dermoscopy",
        caseIdA: "case-g21-03",
        caseIdB: "case-g18-03",
        sharedFeatures: Object.freeze(["Both are pigmented lesions. Color alone does not separate them."]),
        favouringA: Object.freeze(["The dermoscopic surface is broken into yellow-tan ridges. The author caption says seborrheic keratosis."]),
        favouringB: Object.freeze(["The comparison melanoma frame is a clinical photograph whose caption names melanoma for several dark colors. It does not show these ridges."]),
        discriminator: "Ridges on the dermoscopic frame are the difference you can see. The millimeter scale is not the discriminator.",
        commonTrap: "Reading the scale as skin, or ignoring ridges because the lesion is pigmented.",
        limits: "One frame is dermoscopy and the other is clinical. That is not a matched pair of the same modality. No histopathology is attached to the dermoscopic caption."
      }),
      Object.freeze({
        id: "cmp-lentigo-broad-patch",
        caseIdA: "case-g21-04",
        caseIdB: "case-g18-04",
        sharedFeatures: Object.freeze(["Brown pigment is on the skin."]),
        favouringA: Object.freeze(["Many separate flat macules are on the dorsum of the hand. The caption says lentigo sénile."]),
        favouringB: Object.freeze(["One broad uneven brown patch. The NCI caption names cutaneous melanoma. The site is not named."]),
        discriminator: "Many separate macules versus one broad patch, in these two frames only.",
        commonTrap: "Calling every brown macule on the hand harmless, or calling every broad patch a lentigo.",
        limits: "The hand photograph cannot clear every macule. The melanoma photograph does not say lentigo maligna. No histopathology is in either caption."
      }),
      Object.freeze({
        id: "cmp-lmm-lentigo",
        caseIdA: "case-g21-07",
        caseIdB: "case-g21-04",
        sharedFeatures: Object.freeze(["Brown pigment on sun-exposed skin."]),
        favouringA: Object.freeze(["One cheek patch with marker ink. The caption says lentigo maligna melanoma marked for biopsy."]),
        favouringB: Object.freeze(["Many macules on the dorsum of the hand. The caption says lentigo sénile. No biopsy mark."]),
        discriminator: "One marked cheek patch versus a field of hand macules. The ink is not the discriminator and not a diagnosis.",
        commonTrap: "Using the benign field to dismiss a single cheek patch, or using the melanoma caption to rename every hand macule.",
        limits: "No histopathology result is in the cheek caption. That image is small. Marker dots are not skin. The hand field does not certify every macule."
      }),
      Object.freeze({
        id: "cmp-angioma-bcc",
        caseIdA: "case-g21-05",
        caseIdB: "case-g18-15",
        sharedFeatures: Object.freeze(["A red papule is in the frame."]),
        favouringA: Object.freeze(["The papules are bright red, and a second similar papule is in the same frame. The caption says cherry angioma."]),
        favouringB: Object.freeze(["One shiny red papule. The source label is basal cell carcinoma on the lower back."]),
        discriminator: "A second similar bright red papule is more in keeping with the angioma caption than with the single shiny red papule. It does not prove either papule.",
        commonTrap: "Calling every red papule an angioma, or every red papule a carcinoma.",
        limits: "No dermoscopy on the angioma file. Its site is not named. No histopathology is in either caption."
      }),
      Object.freeze({
        id: "cmp-blue-melanoma",
        caseIdA: "case-g21-06",
        caseIdB: "case-g18-07",
        sharedFeatures: Object.freeze(["Blue or blue-black color is in the lesion."]),
        favouringA: Object.freeze(["A small blue spot on the shin. The caption says blue nevus. No flat brown companion is in the frame. Hairs cross the spot."]),
        favouringB: Object.freeze(["A blue-black raised area beside a flatter area, with a printed arrow. The caption says superficial spreading melanoma arising from a dysplastic nevus."]),
        discriminator: "A companion flat area is in the melanoma frame and not in the blue-spot frame. That difference does not prove the blue spot is benign.",
        commonTrap: "Treating blue color as a benign diagnosis or as a melanoma diagnosis by itself.",
        limits: "No histopathology is attached to the blue-spot caption. Hair hides part of its border. No subtype was assigned."
      }),
      Object.freeze({
        id: "cmp-sebaceous-bcc",
        caseIdA: "case-g21-08",
        caseIdB: "case-g18-15",
        sharedFeatures: Object.freeze(["Small papules can raise the same first worry."]),
        favouringA: Object.freeze(["A group of skin-colored papules on the chest, with yellow-white lobules on the dermoscopic frame. The case report says sebaceous hyperplasia."]),
        favouringB: Object.freeze(["One shiny red papule labeled basal cell carcinoma on the lower back."]),
        discriminator: "A skin-colored group with lobules versus one shiny red papule, in these frames. The difference is not a proof.",
        commonTrap: "Calling every grouped papule sebaceous hyperplasia, or every papule a carcinoma.",
        limits: "Linear vessels mentioned in the sebaceous hyperplasia caption were not counted. Histopathology was not quoted. The linear chest pattern is this case, not every presentation."
      })
    ]),
    proposedProgression: Object.freeze({
      status: "proposal",
      hardCodedPath: false,
      note: "Not the learner path and not a score. A track is named only where a case already exists. Screening integration has the vocabulary and no session.",
      tracks: Object.freeze([
        Object.freeze({ id: "foundation", title: "Foundation", caseIds: Object.freeze(["case-g21-01", "case-g21-02", "case-g21-05"]) }),
        Object.freeze({ id: "pattern-recognition", title: "Pattern recognition", caseIds: Object.freeze(["case-g21-03", "case-g21-08", "case-g18-03"]) }),
        Object.freeze({ id: "differential", title: "Differential", caseIds: Object.freeze(["case-g21-02", "case-g18-03", "case-g21-04", "case-g18-04"]) }),
        Object.freeze({ id: "melanoma-spectrum", title: "Melanoma spectrum", caseIds: Object.freeze(["case-g18-06", "case-g18-10", "case-g21-07", "case-acral-melanoma-plantar", "case-g18-12"]) }),
        Object.freeze({ id: "difficult-mimics", title: "Difficult mimics", caseIds: Object.freeze(["case-g21-06", "case-g21-08", "case-g21-07", "case-g21-04"]) }),
        Object.freeze({ id: "special-sites", title: "Special sites", caseIds: Object.freeze(["case-g21-07", "case-g21-04", "case-acral-melanoma-plantar", "case-g18-12", "case-g18-14"]) }),
        Object.freeze({ id: "screening-integration", title: "Screening integration", caseIds: Object.freeze([]), note: "Decision categories exist. No session is built, and no case is assigned a decision." })
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
        observationPrompts: [
                  "Which half of the dark lesion looks thicker?",
                  "A measuring scale is in the frame. What does it not let you claim?"
                ],
        hints: [
                  "Stay with the thicker half. Do not turn the scale into a millimeter number."
                ],
        closestMimic: {
                  name: "Pigmented keratinocyte tumor",
                  whyClosest: "A dark raised lesion can be keratinocytic. This clinical frame does not show dermoscopic structures that separate the two, so the catalog sentence is what names it."
                },
        patterns: [
                  {
                              id: "pat-g18-01",
                              label: "Asymmetric thickness",
                              specificityNote: "A thicker half is a clue. It is not specific for one diagnosis.",
                              certainty: "clearly_visible",
                              weight: "major"
                            },
                  {
                              id: "pat-g18-01-scale",
                              label: "Measuring scale without a recorded reading",
                              specificityNote: "A scale in the frame is not a measurement and not a diagnosis.",
                              certainty: "clearly_visible",
                              weight: "weak"
                            }
                ],
        synthesis: "One dark lesion is thicker on one side. The NCI caption calls the lesion melanoma and does not include a histopathology report.",
        evidenceWeighting: "Asymmetric thickness is clearly visible and is the major clue. It is not specific. The diagnosis weight is the NCI sentence. The scale is visible and weak, because no measurement is read from it. There is no histopathology sentence to weigh.",
        diagnosticTrap: "Treating asymmetry as proof, or ignoring it because a ruler is in the frame.",
        mentorNote: "Do not invent a thickness in millimeters. The scale is visible; a number is not recorded here.",
        takeHomeRule: "Describe the uneven half first. Keep the source diagnosis separate from the clue.",
        academy: {
                  level: 1,
                  spectrum: "melanoma",
                  teachingType: "teaching",
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
        observationPrompts: [
                  "Is the outline a smooth oval or notched?",
                  "Which dark colors are actually in the lesion?"
                ],
        hints: [
                  "Trace the edge before you pick a familiar benign name."
                ],
        closestMimic: {
                  name: "Seborrheic keratosis",
                  whyClosest: "An irregular dark outline is shared with seborrheic keratosis. This frame does not show a thick waxy plate, so that mimic stays possible and is not preferred from pixels alone."
                },
        patterns: [
                  {
                              id: "pat-g18-02",
                              label: "Notched border",
                              specificityNote: "A notched edge raises concern and is not specific.",
                              certainty: "clearly_visible",
                              weight: "major"
                            },
                  {
                              id: "pat-g18-02-color",
                              label: "More than one dark color",
                              specificityNote: "A second dark color supports concern. It is not specific and it is not a count of colors beyond what you can see.",
                              certainty: "clearly_visible",
                              weight: "supportive"
                            }
                ],
        synthesis: "The lesion has a notched outline and mixed dark colors. The NCI caption calls it melanoma and does not cite histopathology.",
        evidenceWeighting: "The notched border is clearly visible and is the major clue. The second dark color is supportive. Diagnosis weight is the catalog sentence only. No pathology sentence is present.",
        diagnosticTrap: "Using the word notched as if it were a diagnosis.",
        mentorNote: "The scale lets you see that the lesion is small. Small does not cancel an uneven edge.",
        takeHomeRule: "An uneven border is described before it is named.",
        academy: {
                  level: 1,
                  spectrum: "melanoma",
                  teachingType: "teaching",
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
        observationPrompts: [
                  "How many dark colors can you name without adding one?",
                  "Is the outline round and even, or irregular?"
                ],
        hints: [
                  "Name only colors you can point to in the frame."
                ],
        closestMimic: {
                  name: "Seborrheic keratosis",
                  whyClosest: "A dark uneven lesion can be a seborrheic keratosis. Classic stuck-on waxy horns are not the main finding here, and color mix alone does not settle the source label."
                },
        patterns: [
                  {
                              id: "pat-g18-03",
                              label: "Several dark colors",
                              specificityNote: "Color mix increases concern. It is not specific and it is not a probability.",
                              certainty: "clearly_visible",
                              weight: "major"
                            }
                ],
        synthesis: "The lesion is irregular and contains more than one dark color. The NCI caption calls it melanoma without a histopathology statement.",
        evidenceWeighting: "Several dark colors are clearly visible and are the major clue. They are not specific. The diagnosis is the catalog label. No numeric risk is attached, and no extra color was added to match a mnemonic.",
        diagnosticTrap: "Inventing an extra color to match an ABCD mnemonic.",
        mentorNote: "A duplicate Commons upload of this same photograph was rejected so the curriculum would not repeat one lesion.",
        takeHomeRule: "Name only the colors in the frame, then read the source diagnosis.",
        academy: {
                  level: 1,
                  spectrum: "melanoma",
                  teachingType: "teaching",
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
        observationPrompts: [
                  "Is this a tiny round macule or a broad patch?",
                  "Where is the darker focus relative to the rest of the patch?"
                ],
        hints: [
                  "Do not assign a subtype the caption does not use."
                ],
        closestMimic: {
                  name: "Solar lentigo",
                  whyClosest: "A brown patch is the shared look. This patch is less even than a typical lentigo, and the caption still does not name a subtype."
                },
        patterns: [
                  {
                              id: "pat-g18-04",
                              label: "Broad uneven brown patch",
                              specificityNote: "A broad brown patch is not specific. Site and subtype are not in this caption.",
                              certainty: "clearly_visible",
                              weight: "major"
                            },
                  {
                              id: "pat-g18-04-edge",
                              label: "Darker focus at one edge",
                              specificityNote: "A darker edge is supportive of uneven color. It is not a subtype and not a measurement.",
                              certainty: "clearly_visible",
                              weight: "supportive"
                            }
                ],
        synthesis: "The frame is a broad brown patch with a darker edge and a scalloped outline. The NCI text says melanoma without subtype or histopathology.",
        evidenceWeighting: "The broad uneven patch and darker edge are visible. The patch is the major clue and the darker edge is supportive. Diagnostic weight is a short catalog sentence. Missing subtype is a real gap, not a reason to invent one.",
        diagnosticTrap: "Upgrading a generic melanoma caption into superficial spreading or nodular disease.",
        mentorNote: "This is a differentiation case because benign brown patches are the nearby lookalikes. The source does not show dermoscopy.",
        takeHomeRule: "Do not invent a subtype the caption does not state.",
        academy: {
                  level: 2,
                  spectrum: "melanoma",
                  teachingType: "teaching",
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
        observationPrompts: [
                  "How does the center compare with the rim?",
                  "What name are you tempted to give the pale center, and is that name written in the title?"
                ],
        hints: [
                  "Paler is a color word. Do not upgrade it."
                ],
        closestMimic: {
                  name: "Lichenoid keratosis or inflamed benign lesion",
                  whyClosest: "A pale center can be inflammation or a treated site. The source does not describe either, and it also does not give the pale center a histologic name."
                },
        patterns: [
                  {
                              id: "pat-g18-05",
                              label: "Pale center inside a darker rim",
                              specificityNote: "Pallor is not specific and is not a synonym for a histologic process in this title.",
                              certainty: "clearly_visible",
                              weight: "major"
                            },
                  {
                              id: "pat-g18-05-name",
                              label: "A histologic name for the pale center",
                              specificityNote: "The NCI title does not give the pale center a histologic name. Do not supply one.",
                              certainty: "not_visible",
                              weight: "conflicting"
                            }
                ],
        synthesis: "An irregular brown-black lesion has a paler center. The NCI title is melanoma. The repeated ABCD sentence is not a measurement and not histopathology.",
        evidenceWeighting: "The pale center is clearly visible and is the major clue as a color finding. A histologic name for that center is not in the source, so it gets conflicting weight: it must not be added. The repeated ABCD sentence is not a measurement. The diagnosis weight is the catalog title.",
        diagnosticTrap: "Calling every pale center regression, or trusting a boilerplate ABCD line as if each letter were measured.",
        mentorNote: "This photograph is smaller and softer than the other NCI frames. Teach only what remains visible.",
        takeHomeRule: "A pale center is a color finding until the source gives it another name.",
        academy: {
                  level: 3,
                  spectrum: "melanoma",
                  teachingType: "reasoning",
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
        observationPrompts: [
                  "How many separate skin findings are inside the inked field?",
                  "Which marks are ink rather than skin?"
                ],
        hints: [
                  "Describe the red part and the dark part as two findings."
                ],
        closestMimic: {
                  name: "Nodular basal cell carcinoma",
                  whyClosest: "A shiny red nodule is where a keratinocyte tumor remains realistic. The source describes one contiguous lesion and does not cite histopathology."
                },
        patterns: [
                  {
                              id: "pat-g18-06",
                              label: "Red nodule touching a dark macule",
                              specificityNote: "The combination is concerning and not specific until the source is read.",
                              certainty: "clearly_visible",
                              weight: "major"
                            },
                  {
                              id: "pat-g18-06-ink",
                              label: "Marker ink around the field",
                              specificityNote: "Ink is not a clinical border. Treating it as skin gives it conflicting weight.",
                              certainty: "clearly_visible",
                              weight: "conflicting"
                            }
                ],
        synthesis: "The cropped frame shows a shiny red nodule against a dark macule inside marker ink. NCI calls this advanced melanoma with a superficial spreading component and an amelanotic nodule. Histopathology is not stated.",
        evidenceWeighting: "The red nodule and the dark macule are clearly visible and together are the major clue. Marker ink is clearly visible and conflicting if you read it as a border. Growth-phase names have weight only as NCI wording. The prognostic sentence in the same caption is not evidence about this patient. Histopathology has no weight because it is absent.",
        diagnosticTrap: "Reading marker ink as a clinical border, or quoting the caption's general death sentence as this patient's result.",
        mentorNote: "The crop removed initials and a date. It also removed the scale. Do not estimate millimeters from memory of the uncropped file.",
        takeHomeRule: "A pink nodule beside pigment is described as two findings. Growth-phase labels belong to the source text.",
        academy: {
                  level: 3,
                  spectrum: "melanoma",
                  teachingType: "reasoning",
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
        observationPrompts: [
                  "What does the printed arrow point at?",
                  "Which area is raised, and which area looks gray?"
                ],
        hints: [
                  "Keep each area separate until the caption names it."
                ],
        closestMimic: {
                  name: "Pigmented basal cell carcinoma",
                  whyClosest: "Irregular dark pigment can be a pigmented keratinocyte tumor. This clinical frame does not show leaf-like structures, and the caption is not that label."
                },
        patterns: [
                  {
                              id: "pat-g18-07",
                              label: "Flat area, raised dark focus, and gray zone",
                              specificityNote: "Gray color is not specific. A histologic word for the gray area belongs to the caption, not to the gray color alone.",
                              certainty: "clearly_visible",
                              weight: "major"
                            },
                  {
                              id: "pat-g18-07-arrow",
                              label: "Printed arrow",
                              specificityNote: "The arrow is already in the public-domain file. It is a pointer, not a skin finding, so its weight is weak.",
                              certainty: "clearly_visible",
                              weight: "weak"
                            }
                ],
        synthesis: "The photograph shows a flat brown-pink area at a printed arrow, a blue-black raised area, and a gray zone. NCI calls this superficial spreading melanoma arising in a dysplastic nevus and calls the gray area regression, without a histopathology sentence.",
        evidenceWeighting: "Three colors and shapes are clearly visible and are the major clue. The printed arrow is visible and weak: it is not skin. The 4-by-8-mm measurement and the caption's word for the gray area have weight only as caption text. Histopathology has no weight because it is absent.",
        diagnosticTrap: "Adding your own arrow, or treating regression as a diagnosis you made from gray color.",
        mentorNote: "The arrow is a derivative already present in the public-domain file. Docutis did not draw it.",
        takeHomeRule: "Map each caption phrase to the area it names. Do not merge them into one word.",
        academy: {
                  level: 3,
                  spectrum: "melanoma",
                  teachingType: "reasoning",
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
        observationPrompts: [
                  "How many dates or earlier photographs are in this file?",
                  "What can you say about change from this frame alone?"
                ],
        hints: [
                  "A follow-up story in the caption is not a second photograph."
                ],
        closestMimic: {
                  name: "Inflamed or traumatized nevus",
                  whyClosest: "A dark papule with a brown edge can be an irritated nevus. The source narrative is what overrides that mimic, and the narrative is not a visible timeline."
                },
        patterns: [
                  {
                              id: "pat-g18-08",
                              label: "Single dark papule",
                              specificityNote: "A dark papule is not specific. Change over time is not visible here.",
                              certainty: "clearly_visible",
                              weight: "major"
                            },
                  {
                              id: "pat-g18-08-prior",
                              label: "An earlier photograph of the same papule",
                              specificityNote: "The narrative describes change. This file does not contain the earlier look.",
                              certainty: "not_visible",
                              weight: "conflicting"
                            }
                ],
        synthesis: "One dark papule with a brown edge is visible. The NCI narrative adds a family follow-up story and says the nodule proved to be invasive melanoma in a dysplastic nevus. That narrative is not a second photograph and does not say histopathology.",
        evidenceWeighting: "Pixels support a dark papule only, and that papule is the major visible clue. An earlier photograph is not in the file, so a change you cannot see gets conflicting weight. The 18-month story, the 3-mm size, and the diagnosis have weight as source text. Histopathology has none. The word proved in the narrative is not a pathology report.",
        diagnosticTrap: "Teaching a before-and-after lesson from a file that contains only the later look, or upgrading 'proved' into a pathology report.",
        mentorNote: "This is an evidence-weighting case. If you cannot point to the earlier photo, do not pretend it is on the page.",
        takeHomeRule: "Separate the frame from the follow-up story, and do not invent the confirmation method.",
        academy: {
                  level: 4,
                  spectrum: "melanoma",
                  teachingType: "expert-challenge",
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
        observationPrompts: [
                  "Can this single frame show that a diameter changed?",
                  "Is the small red macule part of the brown patch, or separate?"
                ],
        hints: [
                  "Do not narrate growth you cannot see."
                ],
        closestMimic: {
                  name: "Seborrheic keratosis",
                  whyClosest: "A brown patch near a crease can be a seborrheic keratosis. This frame does not show a thick warty plate clearly enough to prefer that mimic over the source label."
                },
        patterns: [
                  {
                              id: "pat-g18-09",
                              label: "Irregular brown patch",
                              specificityNote: "An irregular brown patch is not specific. Change in size is not visible in one frame.",
                              certainty: "clearly_visible",
                              weight: "major"
                            },
                  {
                              id: "pat-g18-09-change",
                              label: "A second date showing a smaller patch",
                              specificityNote: "The caption says the diameter had changed. This file has only one date.",
                              certainty: "not_visible",
                              weight: "conflicting"
                            }
                ],
        synthesis: "An irregular brown patch is visible beside a crease, with a separate small red macule. NCI calls the lesion melanoma and says the diameter had changed. The change is not in the image.",
        evidenceWeighting: "Border and color are clearly visible and are the major clue. A second date is not in the file, so visible growth gets conflicting weight: do not pretend to see it. History of growth has weight only as caption text. A nearby red macule is a separate finding, not proof of growth.",
        diagnosticTrap: "Narrating growth you cannot see, or ignoring a stated history because the picture is static.",
        mentorNote: "The small red spot is in the frame. Do not fold it into the brown patch without a reason.",
        takeHomeRule: "One photograph cannot show that a diameter changed.",
        academy: {
                  level: 4,
                  spectrum: "melanoma",
                  teachingType: "reasoning",
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
        observationPrompts: [
                  "Is there brown pigment inside the nodule itself?",
                  "What else around the nodule is drape or background skin?"
                ],
        hints: [
                  "Lack of brown pigment is not a reassuring finding."
                ],
        closestMimic: {
                  name: "Nodular basal cell carcinoma",
                  whyClosest: "A pink nodule is the common keratinocyte-tumor look. Vessel clues are not available in this clinical file, and the author label is what ranks the source diagnosis."
                },
        patterns: [
                  {
                              id: "pat-g18-10",
                              label: "Pink nodule without pigment",
                              specificityNote: "Lack of pigment is not reassuring and is not specific.",
                              certainty: "clearly_visible",
                              weight: "major"
                            }
                ],
        synthesis: "A shiny pink nodule sits in a drape. Dr. Thomas Brinkmeier labels it amelanotic melanoma. Histopathology and histologic subtype are not stated. A separate dermoscopic file was not assumed to be the same lesion.",
        evidenceWeighting: "The pink nodule without brown pigment in the nodule is clearly visible and is the major clue. The diagnosis weight is an expert author label. Histopathology has no weight. Nearby brown macules are background, not part of the nodule. No subtype is stated.",
        diagnosticTrap: "Reassuring yourself because the lesion is not brown, or pairing it with an unmatched dermoscopic image.",
        mentorNote: "CC BY 4.0 allows a resized derivative. The note records the resize. No marks were drawn.",
        takeHomeRule: "A pink nodule still needs a melanoma line in the differential. Pigment is not required.",
        academy: {
                  level: 4,
                  spectrum: "melanoma",
                  teachingType: "reasoning",
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
        observationPrompts: [
                  "Are the red vessels one shape or more than one?",
                  "Which marks are a printed circle or a scale, rather than skin?"
                ],
        hints: [
                  "If you cannot tell dotted from linear, say so. Do not add structures you cannot see."
                ],
        closestMimic: {
                  name: "Basal cell carcinoma",
                  whyClosest: "A pink field with vessels keeps a keratinocyte tumor in view. Branching vessels are not the pattern described here, and mixed dots and lines do not settle the author label."
                },
        patterns: [
                  {
                              id: "pat-g18-11",
                              label: "Mixed vessel shapes on pink skin",
                              specificityNote: "Mixed vessels raise concern. They are not specific for one tumor and they are not a probability.",
                              certainty: "clearly_visible",
                              weight: "major"
                            },
                  {
                              id: "pat-g18-11-print",
                              label: "Printed circle and scale",
                              specificityNote: "The circle and the scale are printed in the file. They are not shiny lines and not a skin finding.",
                              certainty: "clearly_visible",
                              weight: "conflicting"
                            }
                ],
        synthesis: "Dermoscopy shows dotted and linear red vessels around a paler pink center, plus a printed circle and scale. The author calls it amelanotic melanoma. Histopathology is not cited, and this is not merged with the clinical nodule file.",
        evidenceWeighting: "Dotted and linear red vessels are clearly visible and are the major clue. They are not specific, so they do not carry the diagnosis. The author label carries the diagnosis. The printed circle and scale are visible and conflicting if you treat them as structures. Histopathology is not cited.",
        diagnosticTrap: "Treating any pink vessel pattern as basal cell carcinoma, or treating the printed circle as shiny white lines.",
        mentorNote: "If you cannot tell dotted from linear in this file, say so. Do not invent milky-red globules.",
        takeHomeRule: "More than one vessel shape is a clue and it is not specific. Read the source diagnosis separately.",
        academy: {
                  level: 4,
                  spectrum: "melanoma",
                  teachingType: "expert-challenge",
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
        observationPrompts: [
                  "What has happened to the nail plate?",
                  "Can you point to a pigmented streak on the fold, or would that be a guess?"
                ],
        hints: [
                  "A dramatic nail plate is not a stronger confirmation method."
                ],
        closestMimic: {
                  name: "Nail-unit squamous cell carcinoma or other keratinocyte tumor",
                  whyClosest: "Nail destruction is shared with keratinocyte tumors and with injury. The source line is a clinical label, which is the weakest confirmation method in this pathway."
                },
        patterns: [
                  {
                              id: "pat-g18-12",
                              label: "Destroyed nail plate with dark debris",
                              specificityNote: "Nail destruction is not specific for a melanocytic tumor.",
                              certainty: "clearly_visible",
                              weight: "major"
                            },
                  {
                              id: "pat-g18-12-streak",
                              label: "A clear pigmented streak on the nail fold",
                              specificityNote: "A fold streak is not claimed from this frame. Do not supply one.",
                              certainty: "not_visible",
                              weight: "weak"
                            }
                ],
        synthesis: "The thumbnail is destroyed, with dark and pale debris. The Commons line says melanoma of the thumb in an older woman and cites neither histopathology nor a subtype. The acral melanoma record is only the nearest Docutis page.",
        evidenceWeighting: "Nail destruction is clearly visible and is the major clue. A pigmented fold streak is not claimed, so it stays not visible and weak: do not add it. Diagnostic weight is a one-line clinical label, which is lower than an expert-attributed or pathology-cited source. Subtype has no weight because it is not in the source.",
        diagnosticTrap: "Diagnosing a stripe that is not there, or treating this uploader line as if it were a pathology report.",
        mentorNote: "This is the advanced evidence case because the picture is dramatic and the confirmation is thin. Drama is not certainty.",
        takeHomeRule: "Nail destruction needs a differential. A short source line does not become histopathology.",
        academy: {
                  level: 5,
                  spectrum: "melanoma",
                  teachingType: "expert-challenge",
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
        observationPrompts: [
                  "Is the pink spot small and flat, or a large nodule?",
                  "Can you see scale on it?"
                ],
        hints: [
                  "Small size does not end the differential."
                ],
        closestMimic: {
                  name: "Amelanotic melanoma",
                  whyClosest: "A pink lesion can be a melanocytic tumor without brown pigment. The source title is a keratinocyte tumor, and that safety line is why the spot is on this pathway."
                },
        patterns: [
                  {
                              id: "pat-g18-13",
                              label: "Small pink scaly spot",
                              specificityNote: "Scale on a small pink spot is not specific.",
                              certainty: "clearly_visible",
                              weight: "major"
                            }
                ],
        synthesis: "A small pink scaly spot is visible. NCI calls it superficial basal cell carcinoma and does not cite histopathology. In this pathway it is a mimic, not a melanoma.",
        evidenceWeighting: "Pink scale on a small spot is clearly visible and is the major clue. The diagnosis is the NCI title. The non-pigmented melanocytic line in the differential is a safety mimic, not a second source diagnosis. Histopathology is not stated.",
        diagnosticTrap: "Dismissing a small pink spot, or calling it melanoma because you are studying melanoma.",
        mentorNote: "The photograph is modest. That is acceptable if the finding you teach is actually there.",
        takeHomeRule: "A small pink scaly spot still has a melanoma line and a keratinocyte-tumor line.",
        academy: {
                  level: 2,
                  spectrum: "mimic",
                  teachingType: "teaching",
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
        observationPrompts: [
                  "Is the red spot a small erosion or a large ulcer?",
                  "What else is in the frame that is not the spot?"
                ],
        hints: [
                  "Describe the erosion before you choose a name."
                ],
        closestMimic: {
                  name: "Amelanotic melanoma",
                  whyClosest: "A red eroded papule on the ear can be a non-pigmented melanocytic tumor. The source title is a keratinocyte tumor, and the melanoma line stays because the site is a classic place not to drop it."
                },
        patterns: [
                  {
                              id: "pat-g18-14",
                              label: "Small erosion on the ear",
                              specificityNote: "A small erosion is not specific.",
                              certainty: "clearly_visible",
                              weight: "major"
                            }
                ],
        synthesis: "A small red erosion is visible on an ear. NCI calls it ulcerated basal cell carcinoma and mentions a pearly rim. Histopathology is not stated. It is a mimic in this pathway.",
        evidenceWeighting: "The small erosion and the ear site are clearly visible. The erosion is the major clue. A pearly rim has weight only as caption text, not as a structure drawn on the image. Histopathology is not stated. The non-pigmented melanocytic differential is a safety line, not a second label.",
        diagnosticTrap: "Calling every ear papule a basal cell carcinoma and dropping melanoma, or claiming a pearly rim you cannot see.",
        mentorNote: "The partial ear and hair are not a named portrait. No name is in the file.",
        takeHomeRule: "On the ear, describe the erosion and keep both a keratinocyte tumor and a non-pigmented melanoma in mind.",
        academy: {
                  level: 2,
                  spectrum: "mimic",
                  teachingType: "teaching",
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
        observationPrompts: [
                  "Is the papule solitary, shiny, and red?",
                  "Which parts of the original file are missing from this crop?"
                ],
        hints: [
                  "Do not add vessels to match a textbook sentence."
                ],
        closestMimic: {
                  name: "Amelanotic melanoma",
                  whyClosest: "A solitary red papule can be a melanocytic tumor without pigment. The source text describes a keratinocyte tumor, which is why both lines stay open."
                },
        patterns: [
                  {
                              id: "pat-g18-15",
                              label: "Solitary shiny red papule",
                              specificityNote: "A shiny red papule is not specific.",
                              certainty: "clearly_visible",
                              weight: "major"
                            },
                  {
                              id: "pat-g18-15-vessels",
                              label: "Vessels on the papule",
                              specificityNote: "Count a vessel only if you can see it. The caption mentions vessels as a general feature, which is not the same as a vessel you have confirmed.",
                              certainty: "uncertain",
                              weight: "weak"
                            }
                ],
        synthesis: "A shiny red papule remains after the label was cropped off. NCI describes a basal cell carcinoma papule and mentions vessels and a pearly look as general features. Histopathology is not stated.",
        evidenceWeighting: "The shiny red papule is clearly visible and is the major clue. Vessels are uncertain in this crop, so they stay weak and are not confirmed. Caption phrases about pearliness are not given extra weight beyond what a viewer can confirm. The site is source text because the card was removed. Histopathology is not stated.",
        diagnosticTrap: "Inventing telangiectasia to match a textbook sentence, or forgetting melanoma because the papule is red.",
        mentorNote: "The crop is a de-identification edit of a date card, not a clinical annotation.",
        takeHomeRule: "A shiny red papule keeps amelanotic melanoma in the differential even when the source says basal cell carcinoma.",
        academy: {
                  level: 3,
                  spectrum: "mimic",
                  teachingType: "teaching",
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
        observationPrompts: [
                  "What shape is the center of the nodule?",
                  "Is the photograph sharp enough to name fine vessels?"
                ],
        hints: [
                  "A plugged center is a shape. Sharpness is not a report."
                ],
        closestMimic: {
                  name: "Nodular melanoma",
                  whyClosest: "A dark raised center can be a melanocytic nodule. This file is too soft to map dermoscopic pigment, and the plate label is not that diagnosis."
                },
        patterns: [
                  {
                              id: "pat-g18-16",
                              label: "Crater or plug in a red nodule",
                              specificityNote: "A crater is not specific for one keratinizing tumor and is not proof against a melanocytic nodule. Detail is limited.",
                              certainty: "probably",
                              weight: "major"
                            },
                  {
                              id: "pat-g18-16-vessels",
                              label: "Fine surface vessels",
                              specificityNote: "This file does not resolve fine vessels. Do not add them.",
                              certainty: "not_visible",
                              weight: "weak"
                            }
                ],
        synthesis: "A soft photograph shows a round red nodule with a dark center. The AFIP plate says keratoacanthoma and does not quote microscopy. It is the crateriform mimic in this pathway.",
        evidenceWeighting: "The crater shape is the major clue and is only probably resolved, because the photograph is soft. Fine vessels are not visible, so they get weak weight and must not be named. The diagnosis is the atlas label. Histopathology is not quoted, so it is not counted.",
        diagnosticTrap: "Calling every dark nodule melanoma, or calling every crater a keratoacanthoma without reading the label's limits.",
        mentorNote: "Low resolution was accepted because the crater is still the teaching point and better licensed crater images were not added as filler.",
        takeHomeRule: "A plugged center is a shape. Read the source label, and do not pretend a tumor atlas sentence is a slide review.",
        academy: {
                  level: 4,
                  spectrum: "mimic",
                  teachingType: "reasoning",
                  skillIds: [
                              "crateriform-center"
                            ]
                }
      }),
      freezeCase({
  "id": "case-g21-01",
  "slug": "g21-five-looks-in-one-plate",
  "title": "Five looks in one teaching plate",
  "diagnosisLabel": "Common acquired nevus",
  "diseaseId": "melanocytic-nevus",
  "category": "Benign melanocytic",
  "educationalLevel": "introductory",
  "caseType": "clinical",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Skin, site not named on the source",
    "presentationNotes": null
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "accessDate": "2026-10-01",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g21-01",
      "type": "clinical",
      "src": "assets/media/cases/case-22-clinical.jpg",
      "dimensions": {
        "width": 1600,
        "height": 1517
      },
      "alt": "A plate of five clinical photographs: small brown spots, a larger brown spot, two dark raised spots, and a pale pink papule. No diagnosis is included.",
      "caption": "NCI teaching plate of the range of ordinary moles. The catalog label stays hidden until reveal.",
      "source": "National Cancer Institute, via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Normal_mole_(1).jpg",
      "creator": "National Cancer Institute",
      "license": "Public domain",
      "licenseUrl": "https://www.usa.gov/government-works",
      "attribution": "National Cancer Institute. Public domain.",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation. The longest edge was limited to 1600 pixels.",
      "consentBasis": "US government public-domain teaching plate released through NCI Visuals Online and Wikimedia Commons under PD-USGov-HHS-NIH. No name and no portrait are in the frame."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Common acquired nevi (NCI normal-mole teaching plate)",
    "confirmationMethod": "source_dataset_diagnosis",
    "confirmationNotes": "The NCI caption calls this the natural history of common acquired nevi and says the panels are ordinary moles, from a small macule to a pale papule. The same caption assigns junctional, compound, and dermal names. This file has no histopathology image, so those histologic words are not re-verified and are not used as the case method.",
    "confidenceNote": "Source-catalog diagnosis only. Not a Docutis clinician review. Not histopathology."
  },
  "observations": [
    {
      "id": "obs-g21-01a",
      "kind": "observation",
      "text": "The file is a plate of five separate photographs, not one lesion."
    },
    {
      "id": "obs-g21-01b",
      "kind": "observation",
      "text": "Some panels are small brown spots. One panel is a dark raised papule. One panel is a pale pink papule."
    }
  ],
  "interpretations": [
    {
      "id": "int-g21-01",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g21-01a",
        "obs-g21-01b"
      ],
      "text": "The plate shows a range of looks. A dark papule in one panel does not borrow a benign reading from a small brown spot in another panel."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Common acquired nevus",
      "supportingFeatures": [
        "The source caption names ordinary moles and shows more than one look"
      ],
      "contradictingFeatures": [
        "No histopathology image is in the file"
      ],
      "teachingDistinction": "The plate is the source's range of ordinary moles. It is not one patient's history."
    },
    {
      "diagnosis": "Invasive melanoma arising in a dysplastic nevus",
      "supportingFeatures": [
        "One panel is a solitary dark papule"
      ],
      "contradictingFeatures": [
        "The other panels are small brown spots and a pale papule, and the caption is not that melanoma label"
      ],
      "teachingDistinction": "One dark panel can resemble a melanoma photograph. The rest of the plate is not that case."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g21-01a",
      "title": "Notice first",
      "text": "Count the panels. Say which are flat and brown, which is dark and raised, and which is pale."
    },
    {
      "id": "tp-g21-01b",
      "title": "Limit",
      "text": "A benign-looking panel is not a guarantee, and it does not clear the dark panel. The histologic names in the caption are not a slide."
    }
  ],
  "observationPrompts": [
    "How many separate photographs are in the file?",
    "Which panel is a dark raised spot, and which is pale?"
  ],
  "hints": [
    "Do not let the smallest brown spot answer for the dark papule."
  ],
  "closestMimic": {
    "name": "Invasive melanoma arising in a dysplastic nevus",
    "whyClosest": "One panel is a solitary dark papule. That is the look of the library case with that recorded diagnosis. The other panels are not that lesion."
  },
  "patterns": [
    {
      "id": "pat-g21-01-macule",
      "label": "Small brown macules",
      "specificityNote": "Small brown macules are in this plate. Size and a brown color do not prove a benign outcome.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g21-01-papule",
      "label": "Dark raised papule in one panel",
      "specificityNote": "One panel is a solitary dark papule. It does not inherit a benign reading from the other panels.",
      "certainty": "clearly_visible",
      "weight": "supportive"
    },
    {
      "id": "pat-g21-01-pale",
      "label": "Pale papule in one panel",
      "specificityNote": "The pale panel is not a pale center inside a darker rim.",
      "certainty": "clearly_visible",
      "weight": "weak"
    }
  ],
  "synthesis": "The NCI plate is a range of ordinary-mole looks, including a dark papule and a pale papule. The caption's histologic names are not a slide in this file.",
  "evidenceWeighting": "The small brown macules carry the major weight for what the caption is illustrating. The dark papule is supportive of the trap, not proof of a second diagnosis. The pale papule is a weak extra look. None of these weights is a probability.",
  "diagnosticTrap": "Treating the calmest panel as proof that the dark panel is harmless.",
  "mentorNote": "This is a composite plate. Sites are not named. Do not turn five photographs into one patient's story.",
  "takeHomeRule": "A benign source label on a plate is not a guarantee for every panel, and not a guarantee for the next lesion you see.",
  "compareWith": [
    "cmp-nevus-dark-papule"
  ],
  "academy": {
    "level": 1,
    "spectrum": "mimic",
    "teachingType": "teaching",
    "skillIds": [
      "nevus-range"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "No condition monograph is stored for this teaching diagnosis. Do not treat from this case.",
  "managementBrief": "No management category is stored. A source label, including a benign label, is not a decision to reassure, monitor, perform dermoscopy, biopsy, or refer. This brief is not a protocol and remains review required.",
  "reviewStatus": "clinician review required",
  "clinicalReview": null
}),
      freezeCase({
  "id": "case-g21-02",
  "slug": "g21-rough-brown-papule",
  "title": "Rough brown papule",
  "diagnosisLabel": "Seborrheic keratosis",
  "diseaseId": "seborrheic-keratosis",
  "category": "Benign keratinocytic",
  "educationalLevel": "introductory",
  "caseType": "clinical",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Skin, site not named on the source",
    "presentationNotes": null
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "accessDate": "2026-10-01",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g21-02",
      "type": "clinical",
      "src": "assets/media/cases/case-23-clinical.jpg",
      "dimensions": {
        "width": 1449,
        "height": 1265
      },
      "alt": "Close clinical photograph of a rough brown oval lesion with an uneven surface on otherwise even skin. No diagnosis is included.",
      "caption": "Close clinical photograph. The uploader's diagnosis stays hidden until reveal.",
      "source": "Assafn, via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Seborrheic_keratosis_closup.jpg",
      "creator": "Assafn",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "attribution": "Assafn, via Wikimedia Commons. CC BY-SA 4.0.",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
      "consentBasis": "Uploader published this own photograph under CC BY-SA 4.0. The frame is a skin close-up without a face. No separate patient-consent document is on the file page."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Seborrheic keratosis",
    "confirmationMethod": "clinical_diagnosis",
    "confirmationNotes": "The Commons description says seborrheic keratosis close-up. It does not state histopathology or name a body site.",
    "confidenceNote": "Uploader clinical label only. Not a Docutis clinician review and not histopathology."
  },
  "observations": [
    {
      "id": "obs-g21-02a",
      "kind": "observation",
      "text": "A single brown oval lesion sits on otherwise even skin."
    },
    {
      "id": "obs-g21-02b",
      "kind": "observation",
      "text": "The surface is rough, with lighter tan and darker brown areas, and the edge looks as if the lesion sits on the skin."
    }
  ],
  "interpretations": [
    {
      "id": "int-g21-02",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g21-02a",
        "obs-g21-02b"
      ],
      "text": "A rough surface and more than one brown color can be shared with a suspicious pigmented lesion. The surface has to be described before a name is chosen."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Seborrheic keratosis",
      "supportingFeatures": [
        "Rough surface",
        "Edge that looks stuck on the skin",
        "Uploader label"
      ],
      "contradictingFeatures": [
        "No histopathology is stated"
      ],
      "teachingDistinction": "The label matches the stuck-on rough surface. The label is still a clinical caption."
    },
    {
      "diagnosis": "Cutaneous melanoma",
      "supportingFeatures": [
        "More than one brown color",
        "An outline that is not a perfect oval"
      ],
      "contradictingFeatures": [
        "The surface is rough and stuck-on rather than a flat dark macule in this frame"
      ],
      "teachingDistinction": "Shared color is not the whole reading. The rough surface is the point of the comparison."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g21-02a",
      "title": "Notice first",
      "text": "Say whether the surface is smooth or rough, and whether the edge looks stuck on."
    },
    {
      "id": "tp-g21-02b",
      "title": "Limit",
      "text": "A stuck-on look is not proof of a benign lesion, and a benign caption is not a guarantee about a different lesion."
    }
  ],
  "observationPrompts": [
    "Is the surface smooth or rough?",
    "Does the edge look as if it sits on the skin?"
  ],
  "hints": [
    "Look at the surface before you settle on a color story."
  ],
  "closestMimic": {
    "name": "Cutaneous melanoma",
    "whyClosest": "More than one brown color and an uneven outline are the looks already used on cutaneous melanoma cases in this library. This frame adds a rough stuck-on surface those frames do not show."
  },
  "patterns": [
    {
      "id": "pat-g21-02-surface",
      "label": "Rough stuck-on surface",
      "specificityNote": "A rough surface that looks stuck on is a clue. It is not proof of a benign lesion.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g21-02-color",
      "label": "More than one brown color",
      "specificityNote": "Tan and darker brown are both visible. Shared color is not a diagnosis.",
      "certainty": "clearly_visible",
      "weight": "supportive"
    }
  ],
  "synthesis": "The caption says seborrheic keratosis. The frame shows a rough brown papule with more than one brown color. Color overlap with melanoma cases is real. The rough surface is what this frame adds.",
  "evidenceWeighting": "The rough stuck-on surface is the major clue. The second brown color is supportive and is also seen on melanoma cases, so it does not settle the reading. No histology is in the caption.",
  "diagnosticTrap": "Stopping at the first familiar benign name because the colors look like a melanoma photograph, or the reverse: ignoring a rough surface because the colors worry you.",
  "mentorNote": "The uploader did not name a site and did not cite a pathology report. Do not add either.",
  "takeHomeRule": "Describe the surface. A benign caption does not make the next rough brown lesion safe.",
  "compareWith": [
    "cmp-sk-color",
    "cmp-sk-border"
  ],
  "academy": {
    "level": 2,
    "spectrum": "mimic",
    "teachingType": "teaching",
    "skillIds": [
      "stuck-on-surface"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "No condition monograph is stored for this teaching diagnosis. Do not treat from this case.",
  "managementBrief": "No management category is stored. A source label, including a benign label, is not a decision to reassure, monitor, perform dermoscopy, biopsy, or refer. This brief is not a protocol and remains review required.",
  "reviewStatus": "clinician review required",
  "clinicalReview": null
}),
      freezeCase({
  "id": "case-g21-03",
  "slug": "g21-ridged-dermoscopic-surface",
  "title": "Ridged surface under a dermatoscope",
  "diagnosisLabel": "Seborrheic keratosis",
  "diseaseId": "seborrheic-keratosis",
  "category": "Benign keratinocytic",
  "educationalLevel": "intermediate",
  "caseType": "dermoscopic",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Not specified; dermoscopic close-up",
    "presentationNotes": null
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "accessDate": "2026-10-01",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g21-03",
      "type": "dermoscopy",
      "src": "assets/media/cases/case-24-dermoscopy.jpg",
      "dimensions": {
        "width": 600,
        "height": 457
      },
      "alt": "Dermoscopic photograph of a yellow-tan oval lesion with a ridged surface, beside a millimeter scale, with a few hairs crossing it. No diagnosis is included.",
      "caption": "Polarized dermoscopic photograph with a millimeter scale. The author's diagnosis stays hidden until reveal.",
      "source": "Philipp Tschandl, via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Dermatoscopy_SebK.jpg",
      "creator": "Philipp Tschandl",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "attribution": "Philipp Tschandl, via Wikimedia Commons. CC BY-SA 4.0.",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
      "consentBasis": "The author published this own dermoscopic photograph under CC BY-SA 4.0. The frame is a skin close-up without a face. No separate patient-consent document is on the file page."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Seborrheic keratosis",
    "confirmationMethod": "clinical_diagnosis",
    "confirmationNotes": "The author states that this polarized dermoscopic image shows a seborrheic keratosis. No histopathology report is attached. The method stays clinical_diagnosis rather than histopathology.",
    "confidenceNote": "Author caption on a dermoscopic photograph. Not a Docutis clinician review."
  },
  "observations": [
    {
      "id": "obs-g21-03a",
      "kind": "observation",
      "text": "A yellow-tan oval lesion has a surface broken into ridges."
    },
    {
      "id": "obs-g21-03b",
      "kind": "observation",
      "text": "A millimeter scale lies beside the lesion. A few hairs cross the field."
    }
  ],
  "interpretations": [
    {
      "id": "int-g21-03",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g21-03a",
        "obs-g21-03b"
      ],
      "text": "The ridged surface is the dermoscopic finding. The scale is print, not skin, and it is not a measurement you should invent."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Seborrheic keratosis",
      "supportingFeatures": [
        "Ridged yellow-tan surface",
        "Author caption on a dermoscopic image"
      ],
      "contradictingFeatures": [
        "No histopathology is attached"
      ],
      "teachingDistinction": "The ridges are why this frame is in the library. The caption is still not a pathology report."
    },
    {
      "diagnosis": "Cutaneous melanoma",
      "supportingFeatures": [
        "A pigmented lesion can be the worry before the surface is described"
      ],
      "contradictingFeatures": [
        "This frame's surface is ridged and yellow-tan rather than a structureless dark blotch"
      ],
      "teachingDistinction": "Do not import a melanoma reading from another case before you describe these ridges."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g21-03a",
      "title": "Notice first",
      "text": "Say whether the surface is smooth or broken into ridges. Then notice the scale."
    },
    {
      "id": "tp-g21-03b",
      "title": "Limit",
      "text": "Ridges are not proof of a benign lesion. Small pits were not named, because they were not recorded as a separate structure."
    }
  ],
  "observationPrompts": [
    "Is the surface smooth or broken into ridges?",
    "What is printed beside the lesion, and is it skin?"
  ],
  "hints": [
    "The scale is not a skin finding and not a number you should calculate."
  ],
  "closestMimic": {
    "name": "Cutaneous melanoma",
    "whyClosest": "A pigmented dermoscopic lesion is compared with cutaneous melanoma before the surface is described. This frame's ridges are the difference you can see."
  },
  "patterns": [
    {
      "id": "pat-g21-03-ridges",
      "label": "Cerebriform ridges",
      "specificityNote": "A ridged surface is a dermoscopic clue. It is not proof of a benign lesion and it is not a count of pits.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g21-03-scale",
      "label": "Millimeter scale in the frame",
      "specificityNote": "The scale is print. It is not skin and it is not a recorded measurement.",
      "certainty": "clearly_visible",
      "weight": "weak"
    }
  ],
  "synthesis": "The author calls this a seborrheic keratosis under polarized dermoscopy. The ridges are visible. The scale is not a finding. Pits and cysts were not added.",
  "evidenceWeighting": "The ridges carry the major weight. The scale is weak because it is not skin. No vessel pattern and no milia-like cyst were encoded.",
  "diagnosticTrap": "Reading the millimeter scale as a skin structure, or naming pits you have not separated from the ridges.",
  "mentorNote": "The file is 600 pixels on the long edge. The ridges are still readable. It was not enlarged.",
  "takeHomeRule": "Describe ridges before you borrow a diagnosis from a different pigmented photograph. A benign caption is not a guarantee.",
  "compareWith": [
    "cmp-sk-dermoscopy"
  ],
  "academy": {
    "level": 2,
    "spectrum": "mimic",
    "teachingType": "teaching",
    "skillIds": [
      "fissured-surface"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "No condition monograph is stored for this teaching diagnosis. Do not treat from this case.",
  "managementBrief": "No management category is stored. A source label, including a benign label, is not a decision to reassure, monitor, perform dermoscopy, biopsy, or refer. This brief is not a protocol and remains review required.",
  "reviewStatus": "clinician review required",
  "clinicalReview": null
}),
      freezeCase({
  "id": "case-g21-04",
  "slug": "g21-many-brown-macules-on-the-hand",
  "title": "Many brown spots on the back of a hand",
  "diagnosisLabel": "Solar lentigo",
  "diseaseId": "solar-lentigo",
  "category": "Benign pigmented",
  "educationalLevel": "introductory",
  "caseType": "clinical",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Dorsum of the hand",
    "presentationNotes": null
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "accessDate": "2026-10-01",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g21-04",
      "type": "clinical",
      "src": "assets/media/cases/case-25-clinical.jpg",
      "dimensions": {
        "width": 1600,
        "height": 1200
      },
      "alt": "Clinical photograph of the back of a hand and wrist with many separate brown spots. No diagnosis is included.",
      "caption": "The back of a hand with many brown macules. The uploader's diagnosis stays hidden until reveal.",
      "source": "Alain G\u00e9rard, via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Lentigo_s%C3%A9nile.jpg",
      "creator": "Alain G\u00e9rard",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "attribution": "Alain G\u00e9rard, via Wikimedia Commons. CC BY-SA 4.0.",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
      "consentBasis": "The photographer published this photograph under CC BY-SA 4.0. The frame shows a hand, not a face. No separate patient-consent document is on the file page."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Lentigo s\u00e9nile (solar lentigo) on the dorsum of the hand",
    "confirmationMethod": "clinical_diagnosis",
    "confirmationNotes": "The French caption says lentigo s\u00e9nile on the dorsum of the hand. Solar lentigo is the English name used for that caption. Histopathology is not stated. The photograph cannot clear every macule.",
    "confidenceNote": "Uploader clinical label for a field of macules. Not a Docutis clinician review."
  },
  "observations": [
    {
      "id": "obs-g21-04a",
      "kind": "observation",
      "text": "Many separate brown macules sit on the back of a hand and the wrist."
    },
    {
      "id": "obs-g21-04b",
      "kind": "observation",
      "text": "The macules are not one broad patch. Some are small and some are larger. The borders are not all the same."
    }
  ],
  "interpretations": [
    {
      "id": "int-g21-04",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g21-04a",
        "obs-g21-04b"
      ],
      "text": "A field of flat brown macules on the hand is the look the caption names. One irregular macule inside a field is not automatically the same as a single broad patch on another case."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Solar lentigo",
      "supportingFeatures": [
        "Many flat brown macules on the dorsum of the hand",
        "Caption says lentigo s\u00e9nile"
      ],
      "contradictingFeatures": [
        "No histopathology",
        "Not every macule has the same border"
      ],
      "teachingDistinction": "The caption names the field. It does not certify each spot."
    },
    {
      "diagnosis": "Lentigo maligna melanoma",
      "supportingFeatures": [
        "Brown pigment on sun-exposed skin"
      ],
      "contradictingFeatures": [
        "This frame is many hand macules, not one cheek patch marked for biopsy"
      ],
      "teachingDistinction": "Do not use a hand field to dismiss a single facial patch, or the reverse."
    },
    {
      "diagnosis": "Cutaneous melanoma",
      "supportingFeatures": [
        "Brown pigment can be uneven"
      ],
      "contradictingFeatures": [
        "This frame is a field of macules, not one broad patch"
      ],
      "teachingDistinction": "The library's broad brown melanoma photograph is a different shape."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g21-04a",
      "title": "Notice first",
      "text": "Count whether you see one patch or many separate spots, and name the site you can see."
    },
    {
      "id": "tp-g21-04b",
      "title": "Limit",
      "text": "A field of solar lentigines does not prove that every brown macule is harmless."
    }
  ],
  "observationPrompts": [
    "Is this one brown patch or many separate spots?",
    "What body site can you actually see?"
  ],
  "hints": [
    "Name the hand before you borrow a diagnosis from a facial photograph."
  ],
  "closestMimic": {
    "name": "Lentigo maligna melanoma",
    "whyClosest": "Both are brown pigment on sun-exposed skin. This frame is many macules on a hand. The lentigo maligna melanoma case is one cheek patch."
  },
  "patterns": [
    {
      "id": "pat-g21-04-macules",
      "label": "Many flat brown macules",
      "specificityNote": "A field of flat brown macules is not one broad patch, and it is not proof that every macule is benign.",
      "certainty": "clearly_visible",
      "weight": "major"
    }
  ],
  "synthesis": "The caption says lentigo s\u00e9nile on the dorsum of the hand. The frame shows many flat brown macules, not one patch. That does not clear every spot.",
  "evidenceWeighting": "The field of flat brown macules is the major clue and matches the caption's site. Uneven borders on some macules are not given a second diagnosis from this photograph.",
  "diagnosticTrap": "Calling every brown spot on the hand harmless, or calling this field the same thing as one broad patch.",
  "mentorNote": "Nail polish and a watch are in the frame. They are not skin findings. No face is shown.",
  "takeHomeRule": "Many flat brown macules on the hand are not a promise about the next single brown patch.",
  "compareWith": [
    "cmp-lentigo-broad-patch",
    "cmp-lmm-lentigo"
  ],
  "academy": {
    "level": 2,
    "spectrum": "mimic",
    "teachingType": "teaching",
    "skillIds": [
      "many-brown-macules"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "No condition monograph is stored for this teaching diagnosis. Do not treat from this case.",
  "managementBrief": "No management category is stored. A source label, including a benign label, is not a decision to reassure, monitor, perform dermoscopy, biopsy, or refer. This brief is not a protocol and remains review required.",
  "reviewStatus": "clinician review required",
  "clinicalReview": null
}),
      freezeCase({
  "id": "case-g21-05",
  "slug": "g21-two-bright-red-papules",
  "title": "Two bright red papules",
  "diagnosisLabel": "Cherry angioma",
  "diseaseId": "cherry-angioma",
  "category": "Benign vascular",
  "educationalLevel": "introductory",
  "caseType": "clinical",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Skin, site not named on the source",
    "presentationNotes": null
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "accessDate": "2026-10-01",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g21-05",
      "type": "clinical",
      "src": "assets/media/cases/case-26-clinical.jpg",
      "dimensions": {
        "width": 1505,
        "height": 1096
      },
      "alt": "Close clinical photograph of two bright red papules on otherwise even skin. No diagnosis is included.",
      "caption": "Two bright red papules. The uploader's diagnosis stays hidden until reveal.",
      "source": "Assafn, via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Cherry_angioma_closeup.jpg",
      "creator": "Assafn",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "attribution": "Assafn, via Wikimedia Commons. CC BY-SA 4.0.",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
      "consentBasis": "Uploader published this own photograph under CC BY-SA 4.0. The frame is a skin close-up without a face. No separate patient-consent document is on the file page."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Cherry angioma",
    "confirmationMethod": "clinical_diagnosis",
    "confirmationNotes": "The Commons description says cherry angioma close-up. It does not name a site and does not state histopathology. Two papules are in the frame.",
    "confidenceNote": "Uploader clinical label only. Not a Docutis clinician review."
  },
  "observations": [
    {
      "id": "obs-g21-05a",
      "kind": "observation",
      "text": "Two bright red papules sit on otherwise even skin."
    },
    {
      "id": "obs-g21-05b",
      "kind": "observation",
      "text": "They are a similar vivid red. No brown pigment is visible in them. The site is not named."
    }
  ],
  "interpretations": [
    {
      "id": "int-g21-05",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g21-05a",
        "obs-g21-05b"
      ],
      "text": "A second similar bright red papule is part of this frame. One shiny red papule on another case is a different photograph."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Cherry angioma",
      "supportingFeatures": [
        "Bright red papules",
        "A second similar papule",
        "Uploader label"
      ],
      "contradictingFeatures": [
        "No dermoscopy and no histopathology"
      ],
      "teachingDistinction": "The caption matches the color. Two papules still do not prove both are benign forever."
    },
    {
      "diagnosis": "Basal cell carcinoma",
      "supportingFeatures": [
        "A red papule is also the look of a shiny red papule case in this library"
      ],
      "contradictingFeatures": [
        "This frame has two vivid red papules, not one shiny papule with a named site"
      ],
      "teachingDistinction": "Do not call every red papule an angioma or every red papule a carcinoma."
    },
    {
      "diagnosis": "Amelanotic melanoma",
      "supportingFeatures": [
        "A red papule without brown pigment can be a melanocytic trap"
      ],
      "contradictingFeatures": [
        "A second matching bright red papule is in this same frame"
      ],
      "teachingDistinction": "Absence of brown pigment is not a reassuring test."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g21-05a",
      "title": "Notice first",
      "text": "Count the red papules and name the color you see."
    },
    {
      "id": "tp-g21-05b",
      "title": "Limit",
      "text": "Bright red is not proof of a benign lesion. No vessels were named because none were separated in this clinical frame."
    }
  ],
  "observationPrompts": [
    "How many red spots are in the frame?",
    "Are they the same color as each other?"
  ],
  "hints": [
    "Count before you pick a single-papule diagnosis from another case."
  ],
  "closestMimic": {
    "name": "Basal cell carcinoma",
    "whyClosest": "The library's solitary shiny red papule is a basal cell carcinoma. This frame is bright red and there are two papules."
  },
  "patterns": [
    {
      "id": "pat-g21-05-red",
      "label": "Bright red papules",
      "specificityNote": "Bright red papules are a color finding. A second papule does not prove either one is benign.",
      "certainty": "clearly_visible",
      "weight": "major"
    }
  ],
  "synthesis": "The caption says cherry angioma. Two bright red papules are visible. That is not the solitary shiny red papule of the basal cell carcinoma case, and it is not a proof.",
  "evidenceWeighting": "The bright red color and the second papule are the major clue. No vessel pattern was encoded. No site was stored because the caption does not name one.",
  "diagnosticTrap": "Calling every red papule an angioma, or calling every red papule a carcinoma.",
  "mentorNote": "A different cherry angioma file on Commons carried location metadata and was not used. This close-up does not.",
  "takeHomeRule": "A bright red papule can be benign in the caption and still not be a rule for the next red papule.",
  "compareWith": [
    "cmp-angioma-bcc"
  ],
  "academy": {
    "level": 2,
    "spectrum": "mimic",
    "teachingType": "teaching",
    "skillIds": [
      "bright-red-papule"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "No condition monograph is stored for this teaching diagnosis. Do not treat from this case.",
  "managementBrief": "No management category is stored. A source label, including a benign label, is not a decision to reassure, monitor, perform dermoscopy, biopsy, or refer. This brief is not a protocol and remains review required.",
  "reviewStatus": "clinician review required",
  "clinicalReview": null
}),
      freezeCase({
  "id": "case-g21-06",
  "slug": "g21-small-blue-spot",
  "title": "Small blue spot under hair",
  "diagnosisLabel": "Blue nevus",
  "diseaseId": "blue-nevus",
  "category": "Benign melanocytic",
  "educationalLevel": "intermediate",
  "caseType": "clinical",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Shin",
    "presentationNotes": null
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "accessDate": "2026-10-01",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g21-06",
      "type": "clinical",
      "src": "assets/media/cases/case-27-clinical.jpg",
      "dimensions": {
        "width": 1223,
        "height": 1600
      },
      "alt": "Clinical photograph of a small blue spot on hair-bearing skin, with hairs crossing the spot. No diagnosis is included.",
      "caption": "A small blue spot on hair-bearing skin. The uploader's diagnosis stays hidden until reveal.",
      "source": "Nictitate, via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Blue_nevus.png",
      "creator": "Nictitate",
      "license": "CC0 1.0",
      "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
      "attribution": "Nictitate, via Wikimedia Commons. CC0 1.0.",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation. The longest edge was limited to 1600 pixels.",
      "consentBasis": "The author released this own photograph under CC0 1.0. The frame is a shin close-up without a face. No separate patient-consent document is on the file page."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Blue nevus on the shin",
    "confirmationMethod": "clinical_diagnosis",
    "confirmationNotes": "The Commons description says a blue nevus on the shin. It does not state a histologic subtype and does not cite histopathology. Hairs cross the spot, so the full border is not traced.",
    "confidenceNote": "Uploader clinical label only. Not a Docutis clinician review. Not a deep-penetrating or cellular subtype."
  },
  "observations": [
    {
      "id": "obs-g21-06a",
      "kind": "observation",
      "text": "A small blue spot sits on the skin."
    },
    {
      "id": "obs-g21-06b",
      "kind": "observation",
      "text": "Terminal hairs cross the spot, so part of the edge is hidden. No flat brown companion lesion is in the frame."
    }
  ],
  "interpretations": [
    {
      "id": "int-g21-06",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g21-06a",
        "obs-g21-06b"
      ],
      "text": "Blue color is the finding. It is not specific. Hair is an occlusion, not a structure."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Blue nevus",
      "supportingFeatures": [
        "Blue color",
        "Caption names the shin"
      ],
      "contradictingFeatures": [
        "No histopathology",
        "Border partly hidden by hair"
      ],
      "teachingDistinction": "The caption is a clinical label for a blue spot. It does not assign a histologic subtype."
    },
    {
      "diagnosis": "Superficial spreading melanoma arising from a dysplastic nevus",
      "supportingFeatures": [
        "That library case has a blue-black raised area"
      ],
      "contradictingFeatures": [
        "That case also has a flatter area and a printed arrow. This frame does not."
      ],
      "teachingDistinction": "Blue-black color is shared as a worry. The companion flat area is not in this frame."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g21-06a",
      "title": "Notice first",
      "text": "Name the color, then say whether hair hides the edge."
    },
    {
      "id": "tp-g21-06b",
      "title": "Limit",
      "text": "Blue does not mean blue nevus in the next patient, and a benign caption is not a guarantee."
    }
  ],
  "observationPrompts": [
    "What color is the small spot?",
    "Do hairs hide any of its edge?"
  ],
  "hints": [
    "Color is not a subtype."
  ],
  "closestMimic": {
    "name": "Superficial spreading melanoma arising from a dysplastic nevus",
    "whyClosest": "That case records a blue-black raised area. This frame is a small blue spot without the flat companion seen there."
  },
  "patterns": [
    {
      "id": "pat-g21-06-blue",
      "label": "Blue papule or macule",
      "specificityNote": "Blue color is visible. It does not prove the source label and it does not name a subtype.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g21-06-hair",
      "label": "Hairs crossing the spot",
      "specificityNote": "Hair hides part of the edge. It is not a skin structure.",
      "certainty": "clearly_visible",
      "weight": "weak"
    }
  ],
  "synthesis": "The caption says blue nevus on the shin. The spot is blue and partly covered by hair. No subtype was added.",
  "evidenceWeighting": "Blue color is the major clue and is not specific. Hair is weak because it is occlusion. The missing flat companion is a difference from the melanoma case, not a proof.",
  "diagnosticTrap": "Treating blue color as a benign diagnosis, or as a melanoma diagnosis, without the rest of the frame.",
  "mentorNote": "A second blue-nevus file was rejected because marker streaks hid the border. This one still has hair across the spot. That limit stays in the note.",
  "takeHomeRule": "Blue is a color. A benign caption for one blue spot is not a guarantee for the next blue-black lesion.",
  "whyNot": [
    {
      "mimic": "Superficial spreading melanoma arising from a dysplastic nevus",
      "text": "That case has a blue-black raised area beside a flatter area and a printed arrow. This frame has no flat companion and no arrow."
    },
    {
      "mimic": "Pigmented basal cell carcinoma",
      "text": "No leaf-like or ovoid structure is visible here. Blue color alone does not make that diagnosis."
    }
  ],
  "compareWith": [
    "cmp-blue-melanoma"
  ],
  "academy": {
    "level": 3,
    "spectrum": "mimic",
    "teachingType": "reasoning",
    "skillIds": [
      "blue-color"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "No condition monograph is stored for this teaching diagnosis. Do not treat from this case.",
  "managementBrief": "No management category is stored. A source label, including a benign label, is not a decision to reassure, monitor, perform dermoscopy, biopsy, or refer. This brief is not a protocol and remains review required.",
  "reviewStatus": "clinician review required",
  "clinicalReview": null
}),
      freezeCase({
  "id": "case-g21-07",
  "slug": "g21-brown-cheek-patch-with-ink",
  "title": "Brown patch with ink dots",
  "diagnosisLabel": "Lentigo maligna melanoma",
  "diseaseId": "lentigo-maligna-melanoma",
  "category": "Melanocytic malignancies",
  "educationalLevel": "advanced",
  "caseType": "clinical",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Left central malar cheek",
    "presentationNotes": "The source says the patch was marked for biopsy. A biopsy result is not in the caption."
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "accessDate": "2026-10-01",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g21-07",
      "type": "clinical",
      "src": "assets/media/cases/case-28-clinical.jpg",
      "dimensions": {
        "width": 426,
        "height": 318
      },
      "alt": "Close clinical photograph of a brown patch on skin, with several small dark dots around it. No diagnosis is included.",
      "caption": "A brown cheek patch with marker dots. The source diagnosis stays hidden until reveal.",
      "source": "Dermanonymous, via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Lentigo_Maligna_Melanoma_Left_Central_Malar_Cheek.jpg",
      "creator": "Dermanonymous",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "attribution": "Dermanonymous, via Wikimedia Commons. CC BY-SA 4.0.",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
      "consentBasis": "Uploader published this own photograph under CC BY-SA 4.0. The frame is a close crop of cheek skin with marker dots, not a portrait. No separate patient-consent document is on the file page."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Lentigo maligna melanoma, left central malar cheek, marked for biopsy",
    "confirmationMethod": "expert_diagnosis",
    "confirmationNotes": "The caption says lentigo maligna melanoma of the left central malar cheek marked for biopsy. A histopathology report is not on the Commons page. The method stays expert_diagnosis, the same limit used for this uploader's other biopsy-marked caption in the library, and it is not histopathology.",
    "confidenceNote": "Biopsy marking is not a result. Not a Docutis clinician review. Not lentigo maligna in situ unless the caption had said only that."
  },
  "observations": [
    {
      "id": "obs-g21-07a",
      "kind": "observation",
      "text": "One brown patch sits in a tight crop of skin."
    },
    {
      "id": "obs-g21-07b",
      "kind": "observation",
      "text": "Several small dark dots surround the patch. They look like marker ink, not a second lesion."
    }
  ],
  "interpretations": [
    {
      "id": "int-g21-07",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g21-07a",
        "obs-g21-07b"
      ],
      "text": "The brown patch is the skin finding. The dots are ink. The caption, not the ink, supplies the name, and the caption does not include a pathology result."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Lentigo maligna melanoma",
      "supportingFeatures": [
        "Caption names that diagnosis on the cheek",
        "One brown patch"
      ],
      "contradictingFeatures": [
        "No histopathology result is linked",
        "The image is small"
      ],
      "teachingDistinction": "Use the caption's words. Do not shorten them to in situ, and do not invent a subtype beyond the caption."
    },
    {
      "diagnosis": "Solar lentigo",
      "supportingFeatures": [
        "Flat brown pigment on sun-exposed skin"
      ],
      "contradictingFeatures": [
        "This frame is one cheek patch with ink, not a field of hand macules"
      ],
      "teachingDistinction": "The hand field and this cheek patch are different photographs."
    },
    {
      "diagnosis": "Pigmented actinic keratosis",
      "supportingFeatures": [
        "A brown patch on the cheek can raise that question"
      ],
      "contradictingFeatures": [
        "Scale and a rough surface are not what this frame shows"
      ],
      "teachingDistinction": "Do not add scale that is not visible."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g21-07a",
      "title": "Notice first",
      "text": "Separate the brown patch from the ink dots."
    },
    {
      "id": "tp-g21-07b",
      "title": "Limit",
      "text": "Marked for biopsy is not a report. The file is small. Lentigo maligna in situ was not the caption."
    }
  ],
  "observationPrompts": [
    "Is the brown pigment one patch or many separate spots?",
    "What are the small dark dots around it?"
  ],
  "hints": [
    "Separate ink from skin before you name the patch."
  ],
  "closestMimic": {
    "name": "Solar lentigo",
    "whyClosest": "Both are brown pigment. The solar lentigo case is many macules on a hand. This frame is one cheek patch with marker ink."
  },
  "patterns": [
    {
      "id": "pat-g21-07-patch",
      "label": "Brown patch",
      "specificityNote": "One brown patch is visible. Flatness is probable in this crop and is not a histologic level.",
      "certainty": "probably",
      "weight": "major"
    },
    {
      "id": "pat-g21-07-ink",
      "label": "Marker dots around the patch",
      "specificityNote": "Ink is not a border and not a diagnosis.",
      "certainty": "clearly_visible",
      "weight": "conflicting"
    }
  ],
  "whyNot": [
    {
      "mimic": "Solar lentigo",
      "text": "The solar lentigo photograph is a field of macules on the dorsum of the hand. This is one cheek patch. The field does not answer for this patch."
    },
    {
      "mimic": "Pigmented actinic keratosis",
      "text": "This frame does not show a rough scaly surface. That absence is not a proof, and scale was not invented."
    }
  ],
  "synthesis": "The caption says lentigo maligna melanoma on the malar cheek, marked for biopsy. The image shows one brown patch and ink. It does not show a pathology result, and it is not a field of hand macules.",
  "evidenceWeighting": "The brown patch is the major clue and is only probably a flat macule, because the crop does not prove height. Ink conflicts with any reading that treats the dots as skin. The diagnosis is the caption, not a slide.",
  "diagnosticTrap": "Using a hand full of brown spots to dismiss a single cheek patch, or shortening this caption to in situ.",
  "mentorNote": "The file is 426 by 318 pixels. It was kept because the patch and the ink are still readable, and a larger licensed lentigo maligna melanoma photograph was not substituted.",
  "takeHomeRule": "Read the caption's full words. Ink is not skin, a biopsy mark is not a result, and a benign field elsewhere is not this lesion.",
  "clinicalAction": "After reveal, the linked condition record is reference context only. Do not treat from this case.",
  "compareWith": [
    "cmp-lmm-lentigo"
  ],
  "academy": {
    "level": 4,
    "spectrum": "melanoma",
    "teachingType": "expert-challenge",
    "skillIds": [
      "marked-cheek-patch"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "managementBrief": "No management category is stored. A source label, including a benign label, is not a decision to reassure, monitor, perform dermoscopy, biopsy, or refer. This brief is not a protocol and remains review required.",
  "reviewStatus": "clinician review required",
  "clinicalReview": null
}),
      freezeCase({
  "id": "case-g21-08",
  "slug": "g21-grouped-chest-papules",
  "title": "A group of papules on the chest",
  "diagnosisLabel": "Sebaceous hyperplasia",
  "diseaseId": "sebaceous-hyperplasia",
  "category": "Benign sebaceous",
  "educationalLevel": "intermediate",
  "caseType": "clinical_dermoscopic",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Chest",
    "presentationNotes": "The source describes a linear group on the chest. That distribution is what the paper shows. It is not the only way this diagnosis looks."
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "accessDate": "2026-10-01",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g21-08a",
      "type": "clinical",
      "src": "assets/media/cases/case-29-clinical.jpg",
      "dimensions": {
        "width": 600,
        "height": 450
      },
      "alt": "Clinical photograph of a group of skin-colored papules on the chest, with a nipple at the lower edge. No diagnosis is included.",
      "caption": "Clinical photograph of grouped papules on the chest. The paper's diagnosis stays hidden until reveal.",
      "source": "Sato and Tanaka, Dermatology Practical & Conceptual (2014), via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Photography_of_sebaceous_hyperplasia.jpg",
      "creator": "Toshitsugu Sato and Masaru Tanaka",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Sato T, Tanaka M. Dermatology Practical & Conceptual. 2014. Via Wikimedia Commons. CC BY 4.0.",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
      "consentBasis": "Open-access case-report photograph distributed on Wikimedia Commons under the file's CC BY 4.0 template. The frame shows chest skin, not a face. No name is printed on the image."
    },
    {
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "accessDate": "2026-10-01",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g21-08b",
      "type": "dermoscopy",
      "src": "assets/media/cases/case-29-dermoscopy.jpg",
      "dimensions": {
        "width": 600,
        "height": 450
      },
      "alt": "Dermoscopic photograph of clustered yellow-white lobules. No diagnosis is included.",
      "caption": "Dermoscopic photograph from the same case report. Lobules are described. A vessel count was not added.",
      "source": "Sato and Tanaka, Dermatology Practical & Conceptual (2014), via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Dermoscopy_of_sebaceous_hyperplasia.jpg",
      "creator": "Toshitsugu Sato and Masaru Tanaka",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Sato T, Tanaka M. Dermatology Practical & Conceptual. 2014. Via Wikimedia Commons. CC BY 4.0.",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
      "consentBasis": "Open-access case-report dermoscopic photograph distributed on Wikimedia Commons under the file's CC BY 4.0 template. No face is in the frame."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Sebaceous hyperplasia (linear, chest)",
    "confirmationMethod": "expert_diagnosis",
    "confirmationNotes": "The Commons description cites a 2014 case report that labels the photographs sebaceous gland hyperplasia in a linear group on the chest. The file description does not quote a histopathology sentence, so histopathology is not claimed. The journal statement reprinted on the file page is an unversioned attribution license; the file itself is tagged CC BY 4.0.",
    "confidenceNote": "Published case-report label. Not a Docutis clinician review. Not the only clinical pattern of this diagnosis."
  },
  "observations": [
    {
      "id": "obs-g21-08a",
      "kind": "observation",
      "text": "A group of skin-colored papules sits on the chest in a loose line. A nipple is at the edge of the clinical frame."
    },
    {
      "id": "obs-g21-08b",
      "kind": "observation",
      "text": "The dermoscopic frame shows clustered yellow-white lobules. A gel bubble is at the edge."
    }
  ],
  "interpretations": [
    {
      "id": "int-g21-08",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g21-08a",
        "obs-g21-08b"
      ],
      "text": "Grouped papules plus lobules are the two frames. Linear vessels are named in the file caption and are not encoded here as a counted structure."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Sebaceous hyperplasia",
      "supportingFeatures": [
        "Grouped skin-colored papules",
        "Yellow-white lobules",
        "Case-report label and chest site"
      ],
      "contradictingFeatures": [
        "Histopathology is not quoted from the file page"
      ],
      "teachingDistinction": "The paper label matches these frames. The linear arrangement is this case, not a rule for every papule."
    },
    {
      "diagnosis": "Basal cell carcinoma",
      "supportingFeatures": [
        "Small papules can raise that question",
        "A solitary shiny red papule is a different library case"
      ],
      "contradictingFeatures": [
        "This clinical frame is a group of skin-colored papules, not one shiny red papule"
      ],
      "teachingDistinction": "Number and color differ from the solitary shiny red papule. That is not a proof."
    },
    {
      "diagnosis": "Molluscum contagiosum",
      "supportingFeatures": [
        "Grouped papules can look similar at a glance"
      ],
      "contradictingFeatures": [
        "The dermoscopic frame shows yellow-white lobules rather than a single central plug you can point to"
      ],
      "teachingDistinction": "Do not rename lobules as a plug."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g21-08a",
      "title": "Notice first",
      "text": "Count whether the papules are one or a group. On the dermoscopic frame, say whether you see lobules."
    },
    {
      "id": "tp-g21-08b",
      "title": "Limit",
      "text": "The caption mentions linear vessels. They were not encoded, because a vessel count was not made. This linear chest pattern is not every presentation."
    }
  ],
  "observationPrompts": [
    "Are the bumps one lesion or a group?",
    "On the close view, are the bumps smooth or lobulated?"
  ],
  "hints": [
    "A group is not the same photograph as one shiny red papule."
  ],
  "closestMimic": {
    "name": "Basal cell carcinoma",
    "whyClosest": "Small papules raise that comparison. The basal cell carcinoma case in the pair is one shiny red papule. This frame is a skin-colored group."
  },
  "patterns": [
    {
      "id": "pat-g21-08-group",
      "label": "Grouped skin-colored papules",
      "specificityNote": "A group of skin-colored papules is this clinical frame. It is not proof of a benign lesion.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g21-08-lobules",
      "label": "Yellow-white lobules",
      "specificityNote": "Lobules are visible on the dermoscopic frame. Vessels were not counted.",
      "certainty": "clearly_visible",
      "weight": "major"
    }
  ],
  "synthesis": "The case report labels these chest photographs sebaceous hyperplasia. The clinical frame is a group of papules. The dermoscopic frame shows yellow-white lobules. Vessels were left uncounted.",
  "evidenceWeighting": "Both the group and the lobules are major and clearly visible. Vessels stay out of the pattern list. The linear distribution is the paper's description of this case, not a required shape.",
  "diagnosticTrap": "Calling every grouped papule this diagnosis, or calling every papule a carcinoma because another case is a red papule.",
  "mentorNote": "The Commons tag is CC BY 4.0. The reprinted journal sentence does not name the version. That limit is recorded and the images were still used because the file page states CC BY 4.0.",
  "takeHomeRule": "Grouped lobulated papules are a look. A benign case-report label is not a guarantee for the next papule.",
  "compareWith": [
    "cmp-sebaceous-bcc"
  ],
  "academy": {
    "level": 3,
    "spectrum": "mimic",
    "teachingType": "teaching",
    "skillIds": [
      "grouped-papules"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "No condition monograph is stored for this teaching diagnosis. Do not treat from this case.",
  "managementBrief": "No management category is stored. A source label, including a benign label, is not a decision to reassure, monitor, perform dermoscopy, biopsy, or refer. This brief is not a protocol and remains review required.",
  "reviewStatus": "clinician review required",
  "clinicalReview": null
})
    ])
  });
}());
