/* Structured dermato-oncology follow-up protocols based on German guidelines. */
(function () {
  "use strict";

  const reviewRequired = "clinician review required";
  const modalities = Object.freeze([
    { id: "clinical_examination", label: "Clinical examination" },
    { id: "lymph_node_ultrasound", label: "Lymph node ultrasound" },
    { id: "s100b", label: "S100B" },
    { id: "cross_sectional_imaging", label: "Cross-sectional imaging" }
  ]);

  function basis(character, consensus) {
    return Object.freeze({ character, consensus });
  }

  function recommendation(modality, status, frequency = null, note = null, recommendationBasis = null, evidenceScope = "primary_guideline", sourceIds = []) {
    const value = { modality, status, frequency, note, recommendationBasis };
    if (evidenceScope !== "primary_guideline") value.evidenceScope = evidenceScope;
    if (sourceIds.length) value.sourceIds = Object.freeze(sourceIds);
    return Object.freeze(value);
  }

  function period(id, label, range, recommendations, notes = [], timingStatus = null) {
    const value = { id, label, range: range === null ? null : Object.freeze(range), recommendations: Object.freeze(recommendations), notes: Object.freeze(notes) };
    if (timingStatus) value.timingStatus = timingStatus;
    return Object.freeze(value);
  }

  function group(id, label, description, periods, notes = [], contextSections = []) {
    const value = { id, label, description, periods: Object.freeze(periods), notes: Object.freeze(notes) };
    if (contextSections.length) value.contextSections = Object.freeze(contextSections);
    return Object.freeze(value);
  }

  function contextSection(id, title, text, evidenceScope, sourceIds) {
    return Object.freeze({ id, title, text, evidenceScope, sourceIds: Object.freeze(sourceIds) });
  }

  const exactMonths = months => Object.freeze({ kind: "interval_months", min: months, max: months });
  const rangeMonths = (min, max) => Object.freeze({ kind: "interval_months", min, max });
  const perYear = (min, max = min) => Object.freeze({ kind: "occurrences_per_year", min, max });
  const atLeastPerYear = min => Object.freeze({ kind: "minimum_occurrences_per_year", min });
  const singleMonth = month => Object.freeze({ kind: "single_timepoint_month", month });

  const melanomaGuideline = Object.freeze({
    title: "S3-Leitlinie zur Diagnostik, Therapie und Nachsorge des Melanoms",
    organization: "Leitlinienprogramm Onkologie (AWMF, Deutsche Krebsgesellschaft, Deutsche Krebshilfe)",
    guidelineSystem: "DE_S3",
    version: "3.3",
    publishedAt: "2020-07",
    registerNumber: "032/024OL",
    sourceUrl: "https://www.leitlinienprogramm-onkologie.de/fileadmin/user_upload/Downloads/Leitlinien/Melanom/Melanom_Version_3/LL_Melanom_Langversion_3.3.pdf",
    sourceMetadataCheckedAt: "2026-09-17",
    recommendationLocation: "Chapters 8.3 and 8.4.8, pages 171–182"
  });

  const melanomaSupplementalSources = Object.freeze([
    Object.freeze({
      id: "german-melanoma-patient-guideline",
      title: "Patient guideline: Melanoma follow-up and early detection",
      organization: "Leitlinienprogramm Onkologie",
      sourceType: "official patient guideline",
      publishedAt: "2020-08",
      sourceUrl: "https://register.awmf.org/assets/guidelines/032-024OLp_S3_Melanom-Diagnostik-Therapie-Nachsorge_2020-08_1.pdf",
      sourceMetadataCheckedAt: "2026-09-17"
    }),
    Object.freeze({
      id: "infoportal-melanoma-in-situ",
      title: "In-situ Melanom",
      organization: "Infoportal Hautkrebs",
      sourceType: "German expert information",
      publishedAt: "2025-06-23",
      sourceUrl: "https://infoportal-hautkrebs.de/hautkrebsarten/malignes-melanom/diagnostik/stadieneinteilung-des-melanoms/in-situ-melanom",
      sourceMetadataCheckedAt: "2026-09-17"
    }),
    Object.freeze({
      id: "aad-melanoma-follow-up",
      title: "I've been diagnosed with melanoma. Now what?",
      organization: "American Academy of Dermatology",
      sourceType: "professional society patient guidance",
      publishedAt: "2021-10-27",
      sourceUrl: "https://www.aad.org/public/diseases/skin-cancer/types/common/melanoma/after-diagnosed",
      sourceMetadataCheckedAt: "2026-09-17"
    })
  ]);

  const bccGuideline = Object.freeze({
    title: "S2k-Leitlinie Basalzellkarzinom der Haut (Aktualisierung 2023)",
    organization: "AWMF / Deutsche Krebsgesellschaft / Deutsche Dermatologische Gesellschaft / ADO",
    guidelineSystem: "DE_S2K",
    version: "9.0",
    publishedAt: "2024-01",
    registerNumber: "032-021",
    sourceUrl: "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf",
    sourceMetadataCheckedAt: "2026-09-16",
    recommendationLocation: "Chapter 12, pages 59–61"
  });

  const csccGuideline = Object.freeze({
    title: "S3-Leitlinie Aktinische Keratose und Plattenepithelkarzinom der Haut",
    organization: "Leitlinienprogramm Onkologie (AWMF, Deutsche Krebsgesellschaft, Deutsche Krebshilfe)",
    guidelineSystem: "DE_S3",
    version: "2.0",
    publishedAt: "2022-12",
    registerNumber: "032/022OL",
    sourceUrl: "https://www.leitlinienprogramm-onkologie.de/fileadmin/user_upload/Downloads/Leitlinien/Aktinische_Keratosen_und_PEK/Version_2/LL_Aktinische_Keratose_und_PEK_Langversion_2.0.pdf",
    sourceMetadataCheckedAt: "2026-09-16",
    recommendationLocation: "Chapter 9.1.5, statement/recommendations 9.2–9.6, pages 240–243"
  });

  const melanomaPeriods = (clinical, ultrasound, laboratory, imaging) => [
    period("years-1-3", "Years 1–3", { fromYear: 1, toYear: 3 }, [
      recommendation("clinical_examination", "scheduled", clinical[0], null, basis("sollte (EK)", "Konsensstärke 100 %")),
      recommendation("lymph_node_ultrasound", ultrasound[0] ? "scheduled" : "not_routinely_scheduled", ultrasound[0], ultrasound[3] || null, basis("sollte (EK)", "Konsensstärke 100 %")),
      recommendation("s100b", laboratory[0] ? "scheduled" : "not_routinely_scheduled", laboratory[0], null, basis("sollte (EK)", "Konsensstärke 100 %")),
      recommendation("cross_sectional_imaging", imaging[0] ? "scheduled" : "not_routinely_scheduled", imaging[0], null, basis("sollte (EK)", "Konsensstärke 100 %"))
    ]),
    period("years-4-5", "Years 4–5", { fromYear: 4, toYear: 5 }, [
      recommendation("clinical_examination", "scheduled", clinical[1], null, basis("sollte (EK)", "Konsensstärke 100 %")),
      recommendation("lymph_node_ultrasound", ultrasound[1] ? "scheduled" : "not_routinely_scheduled", ultrasound[1], null, basis("sollte (EK)", "Konsensstärke 100 %")),
      recommendation("s100b", laboratory[1] ? "scheduled" : "not_routinely_scheduled", laboratory[1], null, basis("sollte (EK)", "Konsensstärke 100 %")),
      recommendation("cross_sectional_imaging", imaging[1] ? "scheduled" : "not_routinely_scheduled", imaging[1], null, basis("sollte (EK)", "Konsensstärke 100 %"))
    ]),
    period("years-6-10", "Years 6–10", { fromYear: 6, toYear: 10 }, [
      recommendation("clinical_examination", "scheduled", clinical[2], null, basis("sollte (EK)", "Konsensstärke 100 %")),
      recommendation("lymph_node_ultrasound", ultrasound[2] ? "scheduled" : "not_routinely_scheduled", ultrasound[2], null, basis("sollte (EK)", "Konsensstärke 100 %")),
      recommendation("s100b", laboratory[2] ? "scheduled" : "not_routinely_scheduled", laboratory[2], null, basis("sollte (EK)", "Konsensstärke 100 %")),
      recommendation("cross_sectional_imaging", imaging[2] ? "scheduled" : "not_routinely_scheduled", imaging[2], null, basis("sollte (EK)", "Konsensstärke 100 %"))
    ])
  ];

  const invasiveMelanomaNote = "The German guideline recommends 10 years of follow-up for invasive melanoma and lifelong self-examination.";

  function melanomaInSituGroup() {
    return group("melanoma-in-situ", "Melanoma in situ (Stage 0)", "German S3 follow-up schedule: No Stage 0-specific structured follow-up interval is defined. The formal risk-adapted follow-up tables begin with Stage IA.", [
      period("stage-0-guidance", "Guidance without a Stage 0-specific S3 interval", null, [
        recommendation("clinical_examination", "scheduled", atLeastPerYear(1), "Regular dermatologic surveillance is appropriate. German expert information supports at least annual full-skin examination, with shorter intervals when additional melanoma risk factors are present.", null, "german_expert_context", ["infoportal-melanoma-in-situ"]),
        recommendation("lymph_node_ultrasound", "not_routinely_scheduled", null, "Not routinely recommended for Stage 0. The German S3 risk-adapted algorithm assigns ultrasound only in selected invasive-stage groups.", null, "german_clinical_context", ["primary-guideline", "infoportal-melanoma-in-situ"]),
        recommendation("s100b", "not_routinely_scheduled", null, "Not routinely recommended for Stage 0. The German S3 risk-adapted algorithm assigns S100B only in selected invasive-stage groups.", null, "german_clinical_context", ["primary-guideline", "infoportal-melanoma-in-situ"]),
        recommendation("cross_sectional_imaging", "not_routinely_scheduled", null, "Not routinely recommended in asymptomatic Stage 0 patients. Symptoms or another clinical indication require diagnostic assessment outside routine surveillance.", null, "german_clinical_context", ["primary-guideline", "infoportal-melanoma-in-situ"])
      ], ["The absence of a Stage 0-specific S3 schedule does not mean that dermatologic surveillance is unnecessary, and the Stage IA schedule must not be extrapolated to Stage 0."], "guidance_only")
    ], [], [
      contextSection("german-clinical-practice", "German clinical-practice context", "Formal German S3 surveillance tables begin at Stage IA. German expert information for melanoma in situ separately supports dermatology follow-up at least annually, with shorter intervals for multiple or atypical nevi, a previous melanoma, relevant family history or other clinically significant melanoma-risk features.", "german_expert_context", ["german-melanoma-patient-guideline", "infoportal-melanoma-in-situ"]),
      contextSection("self-examination", "Self-examination", "Monthly skin self-examination should be encouraged, with help for difficult-to-see areas when needed.", "german_expert_context", ["infoportal-melanoma-in-situ"]),
      contextSection("international-context", "International context", "American Academy of Dermatology guidance supports ongoing dermatologist-led complete skin examinations after melanoma, with frequency individualized by stage and risk and at least annual examinations after more frequent follow-up ends. This context does not replace or extend the German S3 Stage 0 schedule.", "international_context", ["aad-melanoma-follow-up"])
    ]);
  }

  function bccIntensiveGroup() {
    return group("intensive-risk-group", "Multiple BCCs / high recurrence risk / locally advanced / metastatic / syndromic", "The guideline combines multiple BCCs, high recurrence risk, locally advanced BCC, metastatic BCC and syndromes in one follow-up recommendation.", [
      period("intensive-q3m-until-event-free", "Every 3 months until more than 2 years without new BCC or recurrence", { fromYear: 1, toYear: null }, [
        recommendation("clinical_examination", "scheduled", exactMonths(3), "Continue every 3 months until more than 2 years without a new BCC or recurrence; do not transition to annual merely because two calendar years have elapsed.", basis("soll", "Konsens"))
      ], ["Closer follow-up may be required on an individual basis."]),
      period("after-year-2-event-free", "After more than 2 event-free years", { fromYear: 3, toYear: null }, [
        recommendation("clinical_examination", "conditional", exactMonths(12), "Only if no new BCC or recurrence has occurred for more than 2 years.", basis("soll", "Konsens"))
      ], ["A new BCC or recurrence does not automatically qualify for this reduced frequency."])
    ]);
  }

  function unspecifiedGroup(id, label, description, note) {
    return group(id, label, description, [
      period("no-fixed-interval", "No fixed interval", null, [
        recommendation("clinical_examination", "not_specified", null, note),
        recommendation("lymph_node_ultrasound", "not_specified", null, note),
        recommendation("s100b", "not_specified", null, note),
        recommendation("cross_sectional_imaging", "not_specified", null, note)
      ], [note], "not_specified")
    ], [note]);
  }

  const akGuideline = Object.freeze({
    ...csccGuideline,
    sourceMetadataCheckedAt: "2026-11-28",
    recommendationLocation: "Chapter 4.5 field cancerization; chapter 9 numeric Nachsorge schema applies to invasive cutaneous SCC, not to uncomplicated actinic keratosis"
  });

  const bowenGuideline = Object.freeze({
    ...csccGuideline,
    sourceMetadataCheckedAt: "2026-11-28",
    recommendationLocation: "Chapter 9. No separate year-by-year table for Bowen disease or SCC in situ was identified in version 2.0"
  });

  const mccGuideline = Object.freeze({
    title: "S2k-Leitlinie Merkelzellkarzinom (Update 2022)",
    organization: "AWMF / Deutsche Krebsgesellschaft / Deutsche Dermatologische Gesellschaft",
    guidelineSystem: "DE_S2K",
    version: "Update 2022",
    publishedAt: "2022-06",
    registerNumber: "032-023",
    sourceUrl: "https://www.degum.de/fileadmin/dokumente/Aktivitaeten/Leitlinien/PDF-Verlinkungen/032-023l_S2k_Merkelzellkarziom-der-Haut_2023-04_Langversion.pdf",
    sourceMetadataCheckedAt: "2026-11-28",
    recommendationLocation: "Chapter 8, Nachsorge"
  });

  const mccRegister = Object.freeze([{
    id: "awmf-032-023",
    title: "AWMF register 032-023, Merkelzellkarzinom",
    organization: "AWMF",
    sourceType: "guideline register",
    publishedAt: "2022-06",
    sourceUrl: "https://register.awmf.org/leitlinien/detail/032-023",
    sourceMetadataCheckedAt: "2026-11-28"
  }]);

  const dfspGuideline = Object.freeze({
    title: "S1-Leitlinie Dermatofibrosarcoma protuberans",
    organization: "AWMF / Deutsche Dermatologische Gesellschaft",
    guidelineSystem: "DE_S1",
    version: "Update 2018; validity ended 2023-08-22",
    publishedAt: "2018-08",
    registerNumber: "032-026",
    sourceUrl: "https://register.awmf.org/leitlinien/detail/032-026",
    sourceMetadataCheckedAt: "2026-11-28",
    recommendationLocation: "No current S3 or S2k Nachsorge table. This S1 is in revision and its validity ended on 22 August 2023. Intervals from that S1 are not copied."
  });

  const mccSoll = basis("soll", "Starker Konsens");
  const mccSollte = basis("sollte", "Starker Konsens");
  const mccKann = basis("kann", "Starker Konsens");
  const mccS100 = "S100B is not assigned in the 2022 Nachsorge section.";
  const mccUltrasoundIII = "The visit sentence that pairs palpation with regional ultrasound is written for stage I–II. No separate month interval is stated for stage III ultrasound.";
  const mccImagingNegative = "Negative sentinel node: cross-sectional imaging may be used once a year (kann).";
  const mccImagingIII = "Optional close cross-sectional imaging in the first 2 years (kann): 18-FDG-PET/CT, or ultrasound plus CT and MRI. No month interval is stated.";
  const mccImagingLater = "No cross-sectional interval is stated for this later period.";
  const mccFromYear6 = "After year 5 the 2022 text says controls may be needs-based (kann, bedarfsorientiert). No fixed interval is stated.";

  const protocols = Object.freeze([
    Object.freeze({
      id: "cutaneous-melanoma-de",
      diseaseId: "cutaneous-melanoma",
      diseaseLabel: "Cutaneous melanoma",
      jurisdiction: "DE",
      jurisdictionLabel: "Germany",
      guideline: melanomaGuideline,
      supplementalSources: melanomaSupplementalSources,
      groups: Object.freeze([
        melanomaInSituGroup(),
        group("stage-ia", "Stage IA", "Cutaneous melanoma, stage IA.", melanomaPeriods(
          [exactMonths(6), exactMonths(12), exactMonths(12)], [null, null, null], [null, null, null], [null, null, null]
        ), [invasiveMelanomaNote]),
        group("stage-ib-iib", "Stages IB–IIB", "Stages IB through IIB; the ultrasound recommendation assumes correct pathological staging with sentinel lymph node biopsy.", melanomaPeriods(
          [exactMonths(3), exactMonths(6), rangeMonths(6, 12)], [exactMonths(6), null, null, "Only after correct pathological staging with sentinel lymph node biopsy; otherwise use the stage IIC schedule."], [exactMonths(3), null, null], [null, null, null]
        ), [invasiveMelanomaNote]),
        group("stage-iic-iv-r0", "Stages IIC–IV (R0 resected)", "Completely resected disease (R0) only; active metastatic disease requires an individualized treatment and monitoring plan.", melanomaPeriods(
          [exactMonths(3), exactMonths(3), exactMonths(6)], [exactMonths(3), exactMonths(6), null], [exactMonths(3), exactMonths(6), null], [exactMonths(6), null, null]
        ), [invasiveMelanomaNote])
      ]),
      notes: Object.freeze([]),
      reviewStatus: reviewRequired,
      clinicalReview: null
    }),
    Object.freeze({
      id: "basal-cell-carcinoma-de",
      diseaseId: "basal-cell-carcinoma",
      diseaseLabel: "Basal cell carcinoma",
      jurisdiction: "DE",
      jurisdictionLabel: "Germany",
      guideline: bccGuideline,
      groups: Object.freeze([
        group("isolated-low-risk", "Isolated, surgically treated, low-recurrence-risk BCC", "Isolated, surgically treated BCC with a low risk of recurrence.", [
          period("month-6", "6 months after treatment", { fromMonth: 6, toMonth: 6 }, [
            recommendation("clinical_examination", "scheduled", singleMonth(6), "One examination to exclude local recurrence.", basis("soll", "Konsens"))
          ]),
          period("thereafter", "Thereafter", { fromMonth: 12, toMonth: null }, [
            recommendation("clinical_examination", "scheduled", exactMonths(12), null, basis("soll", "Konsens"))
          ])
        ]),
        bccIntensiveGroup()
      ]),
      notes: Object.freeze(["The guideline recommends regular self-examination. Patients should be counselled on UV protection, with particular emphasis on patients with BCC syndromes or chronic immunosuppression. Other modalities are not assigned fixed routine intervals in the follow-up section. Chronic immunosuppression does not create a separate numerical follow-up schedule in this protocol."]),
      reviewStatus: reviewRequired,
      clinicalReview: null
    }),
    Object.freeze({
      id: "cutaneous-squamous-cell-carcinoma-de",
      diseaseId: "cutaneous-squamous-cell-carcinoma",
      diseaseLabel: "Cutaneous squamous cell carcinoma",
      jurisdiction: "DE",
      jurisdictionLabel: "Germany",
      guideline: csccGuideline,
      groups: Object.freeze([
        group("low-risk", "Low risk", "R0-resected primary tumor: tumor thickness ≤ 6 mm, or ≤ 4 mm with desmoplasia, and differentiation grade G1–2.", [
          period("years-1-2", "Years 1–2", { fromYear: 1, toYear: 2 }, [
            recommendation("clinical_examination", "scheduled", exactMonths(6), null, basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "conditional", perYear(0, 2), "Not a fixed routine for every low-risk situation; use for an unclear palpation finding.", basis("sollte", "Starker Konsens")),
            recommendation("cross_sectional_imaging", "not_routinely_scheduled", null, "The schedule does not specify routine imaging.", basis("Schema 9.2", "Konsens"))
          ]),
          period("years-3-5", "Years 3–5", { fromYear: 3, toYear: 5 }, [
            recommendation("clinical_examination", "scheduled", exactMonths(12), null, basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "not_routinely_scheduled", null, "The schedule does not specify a routine interval.", basis("Schema 9.2", "Konsens")),
            recommendation("cross_sectional_imaging", "not_routinely_scheduled", null, "The schedule does not specify routine imaging.", basis("Schema 9.2", "Konsens"))
          ]),
          period("years-6-10", "Years 6–10", { fromYear: 6, toYear: 10 }, [
            recommendation("clinical_examination", "not_routinely_scheduled", null, "The schedule does not specify a fixed tumor-specific interval for this group.", basis("Schema 9.2", "Konsens")),
            recommendation("lymph_node_ultrasound", "not_routinely_scheduled", null, "The schedule does not specify a routine interval.", basis("Schema 9.2", "Konsens")),
            recommendation("cross_sectional_imaging", "not_routinely_scheduled", null, "The schedule does not specify routine imaging.", basis("Schema 9.2", "Konsens"))
          ])
        ]),
        group("high-risk", "High risk", "R0-resected primary tumor with tumor thickness > 6 mm, > 4 mm with desmoplasia, differentiation grade G3–4 or perineural tumor growth; the guideline also lists immunosuppression and secondary tumors as high-risk factors.", [
          period("years-1-2", "Years 1–2", { fromYear: 1, toYear: 2 }, [
            recommendation("clinical_examination", "scheduled", exactMonths(3), null, basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "conditional", perYear(1, 4), "Frequency depends on risk factors.", basis("sollte", "Starker Konsens")),
            recommendation("cross_sectional_imaging", "conditional", perYear(0, 2), "The schedule interval applies to perineural tumor growth. For findings suspicious for metastasis, imaging is diagnostic work-up rather than a fixed routine interval.", basis("sollte", "Starker Konsens"))
          ]),
          period("year-3", "Year 3", { fromYear: 3, toYear: 3 }, [
            recommendation("clinical_examination", "scheduled", exactMonths(6), null, basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "conditional", perYear(0, 2), "Depends on risk factors.", basis("sollte", "Starker Konsens")),
            recommendation("cross_sectional_imaging", "conditional", perYear(0, 2), "The schedule interval applies to perineural tumor growth. For findings suspicious for metastasis, imaging is diagnostic work-up rather than a fixed routine interval.", basis("sollte", "Starker Konsens"))
          ]),
          period("years-4-5", "Years 4–5", { fromYear: 4, toYear: 5 }, [
            recommendation("clinical_examination", "scheduled", exactMonths(6), null, basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "conditional", perYear(0, 2), "Depends on risk factors.", basis("sollte", "Starker Konsens")),
            recommendation("cross_sectional_imaging", "not_routinely_scheduled", null, "The schedule does not specify routine imaging from year 4 onward.", basis("Schema 9.2", "Konsens"))
          ]),
          period("years-6-10", "Years 6–10", { fromYear: 6, toYear: 10 }, [
            recommendation("clinical_examination", "scheduled", exactMonths(12), null, basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "not_routinely_scheduled", null, "The schedule does not specify a routine interval.", basis("Schema 9.2", "Konsens")),
            recommendation("cross_sectional_imaging", "not_routinely_scheduled", null, "The schedule does not specify routine imaging.", basis("Schema 9.2", "Konsens"))
          ])
        ]),
        group("immunosuppressed", "Immunosuppression", "Patients receiving immunosuppression; the individual risk profile determines the frequency range.", [
          period("years-1-2", "Years 1–2", { fromYear: 1, toYear: 2 }, [
            recommendation("clinical_examination", "scheduled", exactMonths(3), null, basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "conditional", perYear(1, 4), "Frequency depends on risk factors.", basis("sollte", "Starker Konsens")),
            recommendation("cross_sectional_imaging", "conditional", perYear(0, 2), "The schedule interval applies to perineural tumor growth. For findings suspicious for metastasis, imaging is diagnostic work-up rather than a fixed routine interval.", basis("sollte", "Starker Konsens"))
          ]),
          period("year-3", "Year 3", { fromYear: 3, toYear: 3 }, [
            recommendation("clinical_examination", "scheduled", rangeMonths(3, 6), null, basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "conditional", perYear(0, 2), "Depends on risk factors.", basis("sollte", "Starker Konsens")),
            recommendation("cross_sectional_imaging", "conditional", perYear(0, 2), "The schedule interval applies to perineural tumor growth. For findings suspicious for metastasis, imaging is diagnostic work-up rather than a fixed routine interval.", basis("sollte", "Starker Konsens"))
          ]),
          period("years-4-5", "Years 4–5", { fromYear: 4, toYear: 5 }, [
            recommendation("clinical_examination", "scheduled", rangeMonths(3, 6), null, basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "conditional", perYear(0, 2), "Depends on risk factors.", basis("sollte", "Starker Konsens")),
            recommendation("cross_sectional_imaging", "not_routinely_scheduled", null, "The schedule does not specify routine imaging from year 4 onward.", basis("Schema 9.2", "Konsens"))
          ]),
          period("years-6-10", "Years 6–10", { fromYear: 6, toYear: 10 }, [
            recommendation("clinical_examination", "scheduled", rangeMonths(3, 6), "According to the individual risk profile.", basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "not_routinely_scheduled", null, "The schedule does not specify a routine interval.", basis("Schema 9.2", "Konsens")),
            recommendation("cross_sectional_imaging", "not_routinely_scheduled", null, "The schedule does not specify routine imaging.", basis("Schema 9.2", "Konsens"))
          ])
        ]),
        group("locally-advanced-metastatic", "Locally advanced / metastatic", "Locally advanced or metastatic disease; interdisciplinary individualization remains necessary.", [
          period("years-1-2", "Years 1–2", { fromYear: 1, toYear: 2 }, [
            recommendation("clinical_examination", "scheduled", exactMonths(3), null, basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "scheduled", exactMonths(3), null, basis("sollte", "Starker Konsens")),
            recommendation("cross_sectional_imaging", "scheduled", exactMonths(6), "After locally advanced or metastatic cSCC; also for diagnostic work-up of findings suspicious for metastasis.", basis("sollte", "Starker Konsens"))
          ]),
          period("year-3", "Year 3", { fromYear: 3, toYear: 3 }, [
            recommendation("clinical_examination", "scheduled", exactMonths(3), null, basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "scheduled", exactMonths(6), null, basis("sollte", "Starker Konsens")),
            recommendation("cross_sectional_imaging", "scheduled", exactMonths(6), "After locally advanced or metastatic cSCC; also for diagnostic work-up of findings suspicious for metastasis.", basis("sollte", "Starker Konsens"))
          ]),
          period("years-4-5", "Years 4–5", { fromYear: 4, toYear: 5 }, [
            recommendation("clinical_examination", "scheduled", exactMonths(3), null, basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "scheduled", exactMonths(6), null, basis("sollte", "Starker Konsens")),
            recommendation("cross_sectional_imaging", "not_routinely_scheduled", null, "The schedule does not specify routine imaging from year 4 onward.", basis("Schema 9.2", "Konsens"))
          ]),
          period("years-6-10", "Years 6–10", { fromYear: 6, toYear: 10 }, [
            recommendation("clinical_examination", "scheduled", rangeMonths(3, 6), null, basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "not_routinely_scheduled", null, "The schedule does not specify a routine interval.", basis("Schema 9.2", "Konsens")),
            recommendation("cross_sectional_imaging", "not_routinely_scheduled", null, "The schedule does not specify routine imaging.", basis("Schema 9.2", "Konsens"))
          ])
        ])
      ]),
      notes: Object.freeze(["Clinical examination includes full-skin inspection and inspection and palpation of the primary scar, in-transit pathway and regional lymph nodes.", "Chest radiography and abdominal ultrasound are not intended as routine follow-up."]),
      reviewStatus: reviewRequired,
      clinicalReview: null
    }),
    {
      id: "merkel-cell-carcinoma-de",
      diseaseId: "merkel-cell-carcinoma",
      diseaseLabel: "Merkel cell carcinoma",
      jurisdiction: "DE",
      jurisdictionLabel: "Germany",
      guideline: mccGuideline,
      supplementalSources: mccRegister,
      groups: Object.freeze([
        group("stage-i-ii", "Stage I–II", "Locoregional follow-up for stage I–II. The 3-month interval is soll for the first 2 years.", [
          period("years-1-2", "Years 1–2", { fromYear: 1, toYear: 2 }, [
            recommendation("clinical_examination", "scheduled", exactMonths(3), "Every 3 months for the first 2 years (soll).", mccSoll),
            recommendation("lymph_node_ultrasound", "scheduled", exactMonths(3), "Included in the stage I–II visit description (sollte).", mccSollte),
            recommendation("s100b", "not_specified", null, mccS100),
            recommendation("cross_sectional_imaging", "conditional", perYear(1), mccImagingNegative, mccKann)
          ], ["Every 3 months for the first 2 years (soll)."]),
          period("years-3-5", "Years 3–5", { fromYear: 3, toYear: 5 }, [
            recommendation("clinical_examination", "scheduled", exactMonths(6), "From year 3, every 6 months for a further 3 years is kann, and only if no recurrence has occurred.", mccKann),
            recommendation("lymph_node_ultrasound", "scheduled", exactMonths(6), "Included in the stage I–II visit description (sollte).", mccSollte),
            recommendation("s100b", "not_specified", null, mccS100),
            recommendation("cross_sectional_imaging", "conditional", perYear(1), mccImagingNegative, mccKann)
          ], ["From year 3, every 6 months for a further 3 years is kann, and only if no recurrence has occurred."]),
          period("from-year-6", "From year 6", { fromYear: 6, toYear: null }, [
            recommendation("clinical_examination", "not_routinely_scheduled", null, mccFromYear6, mccKann),
            recommendation("lymph_node_ultrasound", "not_routinely_scheduled", null, mccFromYear6, mccKann),
            recommendation("s100b", "not_specified", null, mccS100),
            recommendation("cross_sectional_imaging", "not_routinely_scheduled", null, mccFromYear6, mccKann)
          ], [mccFromYear6])
        ], ["Stage I–II visits include clinical examination with lymph-node palpation and regional lymph-node ultrasound."]),
        group("stage-iii-unclear-slnb", "Stage III or unclear sentinel-node status", "The general 3-month then 6-month clinical interval still applies. Imaging in the first 2 years is optional and has no month number.", [
          period("years-1-2", "Years 1–2", { fromYear: 1, toYear: 2 }, [
            recommendation("clinical_examination", "scheduled", exactMonths(3), "Every 3 months for the first 2 years (soll).", mccSoll),
            recommendation("lymph_node_ultrasound", "not_specified", null, mccUltrasoundIII),
            recommendation("s100b", "not_specified", null, mccS100),
            recommendation("cross_sectional_imaging", "not_routinely_scheduled", null, mccImagingIII, mccKann)
          ], ["Every 3 months for the first 2 years (soll)."]),
          period("years-3-5", "Years 3–5", { fromYear: 3, toYear: 5 }, [
            recommendation("clinical_examination", "scheduled", exactMonths(6), "From year 3, every 6 months for a further 3 years is kann, and only if no recurrence has occurred.", mccKann),
            recommendation("lymph_node_ultrasound", "not_specified", null, mccUltrasoundIII),
            recommendation("s100b", "not_specified", null, mccS100),
            recommendation("cross_sectional_imaging", "not_specified", null, mccImagingLater)
          ], ["From year 3, every 6 months for a further 3 years is kann, and only if no recurrence has occurred."]),
          period("from-year-6", "From year 6", { fromYear: 6, toYear: null }, [
            recommendation("clinical_examination", "not_routinely_scheduled", null, mccFromYear6, mccKann),
            recommendation("lymph_node_ultrasound", "not_specified", null, mccUltrasoundIII),
            recommendation("s100b", "not_specified", null, mccS100),
            recommendation("cross_sectional_imaging", "not_specified", null, mccImagingLater)
          ], [mccFromYear6])
        ], ["Stage III, or sentinel-node status unclear. Optional cross-sectional imaging in the first 2 years has no month number in the 2022 recommendation sentence."])
      ]),
      notes: Object.freeze([
        "Patients shall be taught self-examination of the locoregional skin and lymph drainage pathways (soll).",
        "The 2022 Nachsorge chapter does not publish a separate red-flag catalogue. If a recurrence has occurred, the text does not authorize stepping down to the longer interval.",
        "Immunosuppression may require the interval to be adjusted. No alternate number is stated.",
        "No published scientifically secured studies on Merkel-cell follow-up are cited. Intervals follow the 2022 recommendation sentences and are not taken from the expired 2018 text."
      ]),
      reviewStatus: reviewRequired,
      clinicalReview: null
    },
    {
      id: "actinic-keratosis-de",
      diseaseId: "actinic-keratosis",
      diseaseLabel: "Actinic keratosis and field cancerization",
      jurisdiction: "DE",
      jurisdictionLabel: "Germany",
      guideline: akGuideline,
      groups: Object.freeze([
        unspecifiedGroup(
          "no-numeric-schedule",
          "No numeric schedule",
          "Uncomplicated actinic keratosis and field cancerization have no year-by-year Nachsorge table in this S3.",
          "The S3 numeric Nachsorge schema is defined for invasive cutaneous squamous cell carcinoma. It is not a schedule for uncomplicated actinic keratosis or for field cancerization. Statement 4.10: there is no generally accepted definition of field cancerization. If a clinical field is present without actinic keratoses, the text recommends education, preventive measures and patient self-monitoring of the field. No year-by-year interval is stated."
        )
      ]),
      notes: Object.freeze(["The invasive cutaneous SCC rows are not copied onto actinic keratosis."]),
      reviewStatus: reviewRequired,
      clinicalReview: null
    },
    {
      id: "squamous-cell-carcinoma-in-situ-de",
      diseaseId: "squamous-cell-carcinoma-in-situ",
      diseaseLabel: "Bowen disease / squamous-cell carcinoma in situ",
      jurisdiction: "DE",
      jurisdictionLabel: "Germany",
      guideline: bowenGuideline,
      groups: Object.freeze([
        unspecifiedGroup(
          "no-separate-table",
          "No separate table",
          "Bowen disease and squamous-cell carcinoma in situ have no separate year-by-year table in S3 version 2.0.",
          "No separate year-by-year table for Bowen disease or squamous-cell carcinoma in situ was identified in S3 version 2.0. The numeric schema uses invasive features such as thickness, grade, desmoplasia and perineural growth. Those invasive rows are not copied here."
        )
      ]),
      notes: Object.freeze(["Invasive cSCC intervals are not extrapolated to SCC in situ."]),
      reviewStatus: reviewRequired,
      clinicalReview: null
    },
    {
      id: "dermatofibrosarcoma-protuberans-de",
      diseaseId: "dermatofibrosarcoma-protuberans",
      diseaseLabel: "Dermatofibrosarcoma protuberans",
      jurisdiction: "DE",
      jurisdictionLabel: "Germany",
      guideline: dfspGuideline,
      groups: Object.freeze([
        unspecifiedGroup(
          "no-current-s3-s2k",
          "No current S3/S2k schedule",
          "No current AWMF S3 or S2k states a DFSP follow-up interval.",
          "No current AWMF S3 or S2k states a follow-up interval. Register 032-026 is an S1 whose validity ended on 22 August 2023 and which is in revision. Intervals from that expired S1 are not copied into this table."
        )
      ]),
      notes: Object.freeze(["Expired S1 intervals are intentionally absent."]),
      reviewStatus: reviewRequired,
      clinicalReview: null
    }
  ]);

  window.DOCUTIS_FOLLOW_UP_DATA = Object.freeze({
    schemaVersion: 1,
    modalities,
    protocols
  });
}());
