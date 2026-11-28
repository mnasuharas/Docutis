/* Goal 8 educational clinical-pattern quiz. No patient cases or diagnostic advice. */
(function () {
  "use strict";
  const freezeQuestion = question => Object.freeze({
    ...question,
    options: Object.freeze([...question.options]),
    sourceUrls: Object.freeze([...question.sourceUrls]),
    ...(question.mediaIds ? { mediaIds: Object.freeze([...question.mediaIds]) } : {})
  });

  window.DOCUTIS_QUIZ = Object.freeze({
    schemaVersion: 1,
    title: "Clinical Pattern Quiz",
    disclaimer: "Educational pattern recognition only. This quiz is not clinical decision support and does not replace professional judgment.",
    questions: Object.freeze([
      freezeQuestion({
        id: "melanoma-evolution", diseaseId: "cutaneous-melanoma", mediaIds: ["mis-thigh-clinical", "mis-thigh-dermoscopy"],
        domain: "morphology", prompt: "Comparing the clinical and dermoscopic views, which description best matches the dermoscopic pattern?",
        options: ["A uniform network with identical lines throughout", "A darker, thicker central network with a few dark dots", "Only regular dotted vessels on a red background", "Only branching vessels on a translucent background"], correctIndex: 1,
        explanation: "Describe the central network and compare it with the periphery before naming a diagnosis. The source identifies this lesion as histopathology-confirmed melanoma in situ; no single visual clue establishes a diagnosis on its own.",
        sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/39700658/"], reviewStatus: "clinician review required", clinicalReview: null
      }),
      freezeQuestion({
        id: "bcc-dermoscopy", diseaseId: "basal-cell-carcinoma", mediaId: "bcc-nodular-real-dermoscopy",
        domain: "dermoscopy", prompt: "On this dermoscopic photograph, which vessel pattern is most clearly represented?",
        options: ["Arborising vessels", "Regular dotted vessels", "Comma vessels", "Glomerular vessels"], correctIndex: 0,
        explanation: "The source describes a clinician-authored dermoscopic image of nodular basal cell carcinoma with branching vessels. Pink lesions can have other causes, including amelanotic melanoma; the image alone is not a diagnosis.",
        sourceUrls: ["https://dermnetnz.org/topics/basal-cell-carcinoma", "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf"], reviewStatus: "review invalidated", clinicalReview: null
      }),
      freezeQuestion({
        id: "psoriasis-distribution", diseaseId: "plaque-psoriasis", mediaId: "psoriasis-extensor-photo",
        domain: "morphology", prompt: "Which lesion morphology is most evident in this clinical photograph?",
        options: ["Well-demarcated plaques with adherent white scale", "An annular plaque with central clearing", "Grouped vesicles on an erythematous base", "A flaccid superficial blister"], correctIndex: 0,
        explanation: "The photograph shows sharply demarcated plaques with prominent white scale. Clinical morphology, site and history should be assessed together; this image is an educational example, not a stand-alone diagnosis.",
        sourceUrls: ["https://dermnetnz.org/topics/psoriasis"], reviewStatus: "clinician review required", clinicalReview: null
      }),
      freezeQuestion({
        id: "acne-comedones", diseaseId: "acne-vulgaris", mediaId: "acne-comedonal-photo",
        domain: "differential", prompt: "Which visible lesion supports acne vulgaris over rosacea in this clinical photograph?",
        options: ["Comedones", "Persistent centrofacial erythema", "Ocular irritation", "Telangiectasia"], correctIndex: 0,
        explanation: "The clinical photograph shows comedonal acne. Comedones are characteristic of acne and are not a typical rosacea feature; the whole clinical context still matters.",
        sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/38300170/", "https://dermnetnz.org/topics/acne-vulgaris"], reviewStatus: "clinician review required", clinicalReview: null
      }),
      freezeQuestion({
        id: "ak-biopsy", diseaseId: "actinic-keratosis", mediaId: null,
        domain: "diagnostics", prompt: "What is the appropriate next diagnostic step when an actinic keratosis is persistently thickened, tender or concerning for invasion?",
        options: ["Ignore the change", "Biopsy or specialist assessment", "Assign melanoma staging", "Use dermoscopy as definitive proof"], correctIndex: 1,
        explanation: "Diagnostic uncertainty or concern for invasive squamous cell carcinoma warrants biopsy or specialist assessment.",
        sourceUrls: ["https://onlinelibrary.wiley.com/doi/10.1111/ddg.15231"], reviewStatus: "clinician review required", clinicalReview: null
      }),
      freezeQuestion({
        id: "atopic-first-line", diseaseId: "atopic-dermatitis", mediaId: null,
        domain: "treatment", prompt: "Which option belongs in the first-line treatment hierarchy for atopic dermatitis?",
        options: ["Regular moisturization with appropriate topical anti-inflammatory therapy", "Routine systemic therapy for every presentation", "Surgery", "No barrier care"], correctIndex: 0,
        explanation: "Regular moisturization and appropriately selected topical anti-inflammatory therapy form the first-line structured approach; escalation depends on severity and response.",
        sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/36641009/"], reviewStatus: "clinician review required", clinicalReview: null
      }),
      freezeQuestion({
        id: "rosacea-ocular", diseaseId: "rosacea", mediaId: null,
        domain: "red-flags", prompt: "Which finding should prompt consideration of ophthalmic assessment in rosacea?",
        options: ["An isolated comedone", "Ocular symptoms", "A single freckle", "Stable scalp scale"], correctIndex: 1,
        explanation: "Ocular symptoms are an escalation clue and may require ophthalmic assessment.",
        sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/35929658/"], reviewStatus: "clinician review required", clinicalReview: null
      }),
      freezeQuestion({
        id: "tinea-confirmation", diseaseId: "tinea-corporis", mediaId: null,
        domain: "diagnostics", prompt: "When tinea corporis morphology is atypical or treatment fails, which step supports confirmation?",
        options: ["Microscopy or culture", "Corticosteroid monotherapy", "Oncology staging", "No reassessment"], correctIndex: 0,
        explanation: "Microscopy or culture can support confirmation when morphology is atypical or treatment fails; corticosteroid monotherapy can obscure infection.",
        sourceUrls: ["https://www.cdc.gov/ringworm/hcp/clinical-overview/"], reviewStatus: "clinician review required", clinicalReview: null
      })
    ])
  });
}());
