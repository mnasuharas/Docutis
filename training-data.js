/* Goal 28 mixed-case screening training. Educational assembly layer only; not CDS. */
(function () {
  "use strict";

  function deepFreeze(value) {
    if (value && typeof value === "object" && !Object.isFrozen(value)) {
      Object.values(value).forEach(deepFreeze);
      Object.freeze(value);
    }
    return value;
  }

  window.DOCUTIS_TRAINING_DATA = deepFreeze({
    schemaVersion: 1,
    id: "mixed-hautkrebsscreening-training",
    title: "Mixed-case screening training",
    subtitle: "Case-based screening practice (Hautkrebsscreening)",
    status: "development curriculum",
    reviewStatus: "clinician review required",
    clinicalReview: null,
    disclaimer: "Training, not a diagnostic device, an exam, or a certificate. Every lesion comes from the existing Docutis case library. The app does not diagnose your choices or grade them. Clinical review of this teaching material is still required.",
    compositionNotice: "Curated for education. Cases are chosen for teaching coverage, not for how often lesions occur. The mix of benign and malignant lesions in a session says nothing about prevalence, screening yield, or predictive value.",
    stateNotice: "Your notes and choices stay in this browser tab. They are not scored, saved, or sent anywhere, and they are cleared when you restart or leave the page.",
    developmentNotice: "Preview curriculum, published for education only. It is not clinically validated, and its teaching text remains clinician review required.",
    impressionNote: "This is your working impression, not the app's diagnosis. It is not scored.",
    impressions: [
      { id: "benign-leaning", label: "Benign-leaning" },
      { id: "suspicious", label: "Suspicious" },
      { id: "uncertain", label: "Uncertain" }
    ],
    families: [
      { id: "melanocytic", label: "Melanocytic" },
      { id: "keratinocytic", label: "Keratinocytic" },
      { id: "vascular-adnexal", label: "Vascular or adnexal" },
      { id: "other", label: "Other or not sure" }
    ],
    // Composition only. The reveal shows the stored case category, not this mapping.
    categoryFamilies: {
      "Melanocytic malignancies": "melanocytic",
      "Melanoma": "melanocytic",
      "Benign melanocytic": "melanocytic",
      "Keratinocyte carcinomas": "keratinocytic",
      "Keratinocyte carcinomas and precursors": "keratinocytic",
      "Benign keratinocytic": "keratinocytic",
      "Benign vascular": "vascular-adnexal",
      "Benign sebaceous": "vascular-adnexal"
    },
    genericObservationPrompts: [
      "Describe the morphology before naming anything: flat, raised, nodular, or a field of lesions?",
      "Compare the halves. Is the lesion symmetric?",
      "Trace the border. Is it smooth, notched, or hard to see?",
      "Name only the colours you can actually see.",
      "Describe the surface: smooth, scaly, eroded, crusted, or shiny?",
      "Note the site and what it changes about what you look for.",
      "Which structures are visible, and which cannot be judged in this frame?"
    ],
    lengths: [
      { id: "short", label: "Short", cases: 5, isDefault: true },
      { id: "standard", label: "Standard", cases: 8, isDefault: false },
      { id: "extended", label: "Extended", cases: 12, isDefault: false }
    ],
    lengthNote: "Lengths are practical options, not a validated dose.",
    blueprints: [
      {
        id: "mixed-screening",
        title: "Mixed screening",
        summary: "Benign and malignant lesions across lesion families. The next lesion could be anything in the core set.",
        filter: "all",
        minFamilies: 3,
        contextSlots: 0,
        contextReasons: []
      },
      {
        id: "melanoma-and-mimics",
        title: "Melanoma and mimics",
        summary: "Pigmented and melanocytic reasoning, with benign look-alikes mixed in.",
        filter: "melanoma-or-mimic",
        minFamilies: 1,
        contextSlots: 0,
        contextReasons: []
      },
      {
        id: "special-sites",
        title: "Special sites",
        summary: "Acral, nail, and facial lesions that meet the core eligibility rules. Nail evidence is weaker, and one context case may appear; it is labelled after reveal.",
        filter: "special-site",
        minFamilies: 1,
        lengths: ["short", "standard"],
        contextSlots: 1,
        contextReasons: ["nail-weak-verification"]
      }
    ],
    // Curation is a curriculum eligibility call, not a clinical approval status.
    curation: [
      {
        caseId: "case-g21-01",
        reason: "multi-panel-plate",
        note: "The file is a plate of five separate photographs, not one lesion, so it cannot anchor a single-lesion screening inference."
      }
    ],
    limitationText: {
      "no-closest-mimic": "Legacy pilot case without a stored closest mimic or pattern links. The reveal cannot carry mimic and contrast teaching, so it is not a core anchor.",
      "nail-weak-verification": "Nail-unit case without histopathology. Its label comes from a caption or a clinical description, so it cannot anchor a nail screening rule.",
      "equivocal-weak-pair": "Clinical-diagnosis label with a paired view that the case itself records as equivocal. Useful to look at, too weak to anchor a screening inference.",
      "thin-differential": "Fewer than two stored differentials, so there is no usable comparison to reason through.",
      "pre-reveal-leak": "Stored pre-reveal text names a diagnosis, so the lesion cannot be shown blind.",
      "low-resolution": "The smallest stored image side is under the training minimum, so structures may not be judgeable.",
      "multi-panel-plate": "The file is a plate of several photographs, not one lesion."
    },
    nailUnitNote: "Nail-unit evidence note: the accepted dataset holds no histopathology-confirmed nail melanoma with onychoscopy, and the nail haemorrhage labels are weakly verified. Nail cases here teach description and comparison. They are not equal in evidence to the acral melanoma cases.",
    contextCaseNote: "Context case. Shown for comparison and description, not as a core screening anchor.",
    dispositionNote: "No next-step or management choice is offered. The case records do not store a grounded disposition for every eligible case, so this training does not invent one.",
    minImageSide: 200
  });
})();
