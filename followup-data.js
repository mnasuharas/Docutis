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

  function recommendation(modality, status, frequency = null, note = null, recommendationBasis = null) {
    return Object.freeze({ modality, status, frequency, note, recommendationBasis });
  }

  function period(id, label, range, recommendations, notes = [], timingStatus = null) {
    const value = { id, label, range: range === null ? null : Object.freeze(range), recommendations: Object.freeze(recommendations), notes: Object.freeze(notes) };
    if (timingStatus) value.timingStatus = timingStatus;
    return Object.freeze(value);
  }

  function group(id, label, description, periods, notes = []) {
    return Object.freeze({ id, label, description, periods: Object.freeze(periods), notes: Object.freeze(notes) });
  }

  const exactMonths = months => Object.freeze({ kind: "interval_months", min: months, max: months });
  const rangeMonths = (min, max) => Object.freeze({ kind: "interval_months", min, max });
  const perYear = (min, max = min) => Object.freeze({ kind: "occurrences_per_year", min, max });
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

  const bccGuideline = Object.freeze({
    title: "S2k-Leitlinie Basalzellkarzinom der Haut (Aktualisierung 2023)",
    organization: "AWMF / Deutsche Krebsgesellschaft / Deutsche Dermatologische Gesellschaft / ADO",
    guidelineSystem: "DE_S2K",
    version: "9.0",
    publishedAt: "2024-01",
    registerNumber: "032-021",
    sourceUrl: "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf",
    sourceMetadataCheckedAt: "2026-09-16",
    recommendationLocation: "Chapter 12, pages 59–60"
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
    return group("melanoma-in-situ", "Melanoma in situ (Stage 0)", "The current German S3 melanoma guideline does not define a specific structured follow-up schedule for melanoma in situ.", [
      period("not-specified", "No structured interval specified", null, [
        recommendation("clinical_examination", "not_specified"),
        recommendation("lymph_node_ultrasound", "not_specified"),
        recommendation("s100b", "not_specified"),
        recommendation("cross_sectional_imaging", "not_specified")
      ], ["No interval should be inferred from the schedules for invasive melanoma."], "not_specified")
    ]);
  }

  function bccIntensiveGroup() {
    return group("intensive-risk-group", "Multiple BCCs / high recurrence risk / locally advanced / metastatic / syndromic", "The guideline combines multiple BCCs, high recurrence risk, locally advanced BCC, metastatic BCC and syndromes in one follow-up recommendation.", [
      period("years-1-2", "Years 1–2", { fromYear: 1, toYear: 2 }, [
        recommendation("clinical_examination", "scheduled", exactMonths(3), null, basis("soll", "Konsens"))
      ], ["Closer follow-up may be required on an individual basis."]),
      period("after-year-2-event-free", "After more than 2 event-free years", { fromYear: 3, toYear: null }, [
        recommendation("clinical_examination", "conditional", exactMonths(12), "Only if no new BCC or recurrence has occurred for more than 2 years.", basis("soll", "Konsens"))
      ], ["A new BCC or recurrence does not automatically qualify for this reduced frequency."])
    ]);
  }

  const protocols = Object.freeze([
    Object.freeze({
      id: "cutaneous-melanoma-de",
      diseaseId: "cutaneous-melanoma",
      diseaseLabel: "Cutaneous melanoma",
      jurisdiction: "DE",
      jurisdictionLabel: "Germany",
      guideline: melanomaGuideline,
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
      notes: Object.freeze(["The guideline recommends regular self-examination. Other modalities are not assigned fixed routine intervals in the follow-up section."]),
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
    })
  ]);

  window.DOCUTIS_FOLLOW_UP_DATA = Object.freeze({
    schemaVersion: 1,
    modalities,
    protocols
  });
}());
