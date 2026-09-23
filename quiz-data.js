/* Goal 8 educational clinical-pattern quiz. No patient cases or diagnostic advice. */
(function () {
  "use strict";
  const freezeQuestion = question => Object.freeze({
    ...question,
    options: Object.freeze([...question.options]),
    sourceUrls: Object.freeze([...question.sourceUrls])
  });

  window.DOCUTIS_QUIZ = Object.freeze({
    schemaVersion: 1,
    title: "Clinical Pattern Quiz",
    disclaimer: "Educational pattern recognition only. This quiz is not clinical decision support and does not replace professional judgment.",
    questions: Object.freeze([
      freezeQuestion({
        id: "melanoma-evolution", diseaseId: "cutaneous-melanoma", mediaId: "melanoma-abcde-schematic",
        domain: "morphology", prompt: "Which ABCDE feature explicitly describes change over time?",
        options: ["Asymmetry", "Border irregularity", "Evolution", "Color variation"], correctIndex: 2,
        explanation: "Evolution means a lesion is changing over time. It is assessed with the overall clinical and dermoscopic pattern, not in isolation.",
        sourceUrls: ["https://pubmed.ncbi.nlm.nih.gov/39700658/"], reviewStatus: "clinician review required", clinicalReview: null
      }),
      freezeQuestion({
        id: "bcc-dermoscopy", diseaseId: "basal-cell-carcinoma", mediaId: "bcc-clues-schematic",
        domain: "dermoscopy", prompt: "Which schematic vascular clue is classically associated with basal cell carcinoma?",
        options: ["Arborising vessels", "Regular dotted vessels", "Comma vessels", "Glomerular vessels"], correctIndex: 0,
        explanation: "Arborising vessels are a classically associated high-yield schematic dermoscopic clue for basal cell carcinoma, although diagnosis and subtype assessment still require the full clinical-pathologic context.",
        sourceUrls: ["https://dermnetnz.org/topics/basal-cell-carcinoma", "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf"], reviewStatus: "clinician review required", clinicalReview: null
      }),
      freezeQuestion({
        id: "psoriasis-distribution", diseaseId: "plaque-psoriasis", mediaId: "psoriasis-distribution-schematic",
        domain: "localization", prompt: "Which distribution best fits the common plaque psoriasis pattern shown in the schematic?",
        options: ["Dermatomal trunk only", "Scalp and extensor surfaces", "Finger webs only", "Unilateral eyelid only"], correctIndex: 1,
        explanation: "Plaque psoriasis commonly involves the scalp and extensor surfaces; site-specific variants can look different.",
        sourceUrls: ["https://dermnetnz.org/topics/psoriasis"], reviewStatus: "clinician review required", clinicalReview: null
      }),
      freezeQuestion({
        id: "acne-comedones", diseaseId: "acne-vulgaris", mediaId: "acne-lesions-schematic",
        domain: "differential", prompt: "Which finding most strongly supports acne vulgaris over rosacea in this learning set?",
        options: ["Open and closed comedones", "Persistent centrofacial erythema", "Ocular irritation", "Telangiectasia"], correctIndex: 0,
        explanation: "Comedones are characteristic acne lesions and are not a typical rosacea feature.",
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
