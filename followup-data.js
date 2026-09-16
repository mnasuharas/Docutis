/* Structured German dermato-oncology follow-up protocols. */
(function () {
  "use strict";

  const reviewRequired = "clinician review required";
  const modalities = Object.freeze([
    { id: "clinical_examination", label: "Klinische Untersuchung" },
    { id: "lymph_node_ultrasound", label: "Lymphknoten-Sonographie" },
    { id: "s100b", label: "S100B" },
    { id: "cross_sectional_imaging", label: "Schnittbildgebung" }
  ]);

  function basis(character, consensus) {
    return Object.freeze({ character, consensus });
  }

  function recommendation(modality, status, frequency = null, note = null, recommendationBasis = null) {
    return Object.freeze({ modality, status, frequency, note, recommendationBasis });
  }

  function period(id, label, range, recommendations, notes = []) {
    return Object.freeze({ id, label, range: Object.freeze(range), recommendations: Object.freeze(recommendations), notes: Object.freeze(notes) });
  }

  function group(id, label, description, periods) {
    return Object.freeze({ id, label, description, periods: Object.freeze(periods) });
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
    sourceMetadataCheckedAt: "2026-09-16",
    recommendationLocation: "Kapitel 8.3 und 8.4.8, Seiten 171–182"
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
    recommendationLocation: "Kapitel 12, Seiten 59–60"
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
    recommendationLocation: "Kapitel 9.1.5, Statement/Empfehlungen 9.2–9.6, Seiten 240–243"
  });

  const melanomaPeriods = (clinical, ultrasound, laboratory, imaging) => [
    period("years-1-3", "Jahr 1–3", { fromYear: 1, toYear: 3 }, [
      recommendation("clinical_examination", "scheduled", clinical[0], null, basis("sollte (EK)", "Konsensstärke 100 %")),
      recommendation("lymph_node_ultrasound", ultrasound[0] ? "scheduled" : "not_routinely_scheduled", ultrasound[0], ultrasound[3] || null, basis("sollte (EK)", "Konsensstärke 100 %")),
      recommendation("s100b", laboratory[0] ? "scheduled" : "not_routinely_scheduled", laboratory[0], null, basis("sollte (EK)", "Konsensstärke 100 %")),
      recommendation("cross_sectional_imaging", imaging[0] ? "scheduled" : "not_routinely_scheduled", imaging[0], null, basis("sollte (EK)", "Konsensstärke 100 %"))
    ]),
    period("years-4-5", "Jahr 4–5", { fromYear: 4, toYear: 5 }, [
      recommendation("clinical_examination", "scheduled", clinical[1], null, basis("sollte (EK)", "Konsensstärke 100 %")),
      recommendation("lymph_node_ultrasound", ultrasound[1] ? "scheduled" : "not_routinely_scheduled", ultrasound[1], null, basis("sollte (EK)", "Konsensstärke 100 %")),
      recommendation("s100b", laboratory[1] ? "scheduled" : "not_routinely_scheduled", laboratory[1], null, basis("sollte (EK)", "Konsensstärke 100 %")),
      recommendation("cross_sectional_imaging", imaging[1] ? "scheduled" : "not_routinely_scheduled", imaging[1], null, basis("sollte (EK)", "Konsensstärke 100 %"))
    ]),
    period("years-6-10", "Jahr 6–10", { fromYear: 6, toYear: 10 }, [
      recommendation("clinical_examination", "scheduled", clinical[2], null, basis("sollte (EK)", "Konsensstärke 100 %")),
      recommendation("lymph_node_ultrasound", ultrasound[2] ? "scheduled" : "not_routinely_scheduled", ultrasound[2], null, basis("sollte (EK)", "Konsensstärke 100 %")),
      recommendation("s100b", laboratory[2] ? "scheduled" : "not_routinely_scheduled", laboratory[2], null, basis("sollte (EK)", "Konsensstärke 100 %")),
      recommendation("cross_sectional_imaging", imaging[2] ? "scheduled" : "not_routinely_scheduled", imaging[2], null, basis("sollte (EK)", "Konsensstärke 100 %"))
    ])
  ];

  function bccIntensiveGroup() {
    return group("intensive-risk-group", "Multiple BZK / hohes Rezidivrisiko / lfBZK / mBZK / Syndrome", "Die Leitlinie führt multiple BZK, hohes Rezidivrisiko, lokal fortgeschrittenes BZK, metastasiertes BZK und Syndrome in einer gemeinsamen Nachsorgeempfehlung.", [
      period("years-1-2", "Jahr 1–2", { fromYear: 1, toYear: 2 }, [
        recommendation("clinical_examination", "scheduled", exactMonths(3), null, basis("soll", "Konsens"))
      ], ["Individuell kann eine engmaschigere Nachsorge erforderlich sein."]),
      period("after-year-2-event-free", "Nach mehr als 2 ereignisfreien Jahren", { fromYear: 3, toYear: null }, [
        recommendation("clinical_examination", "conditional", exactMonths(12), "Nur wenn mehr als 2 Jahre kein neues BZK und kein Rezidiv aufgetreten ist.", basis("soll", "Konsens"))
      ], ["Bei einem neuen BZK oder Rezidiv gilt diese Reduktion nicht automatisch."])
    ]);
  }

  const protocols = Object.freeze([
    Object.freeze({
      id: "cutaneous-melanoma-de",
      diseaseId: "cutaneous-melanoma",
      diseaseLabel: "Malignes Melanom",
      jurisdiction: "DE",
      jurisdictionLabel: "Deutschland",
      guideline: melanomaGuideline,
      groups: Object.freeze([
        group("stage-ia", "Stadium IA", "Kutanes Melanom im Stadium IA.", melanomaPeriods(
          [exactMonths(6), exactMonths(12), exactMonths(12)], [null, null, null], [null, null, null], [null, null, null]
        )),
        group("stage-ib-iib", "Stadium IB–IIB", "Stadien IB bis IIB; die Sonographieangabe setzt korrektes pathologisches Staging mittels Wächterlymphknotenbiopsie voraus.", melanomaPeriods(
          [exactMonths(3), exactMonths(6), rangeMonths(6, 12)], [exactMonths(6), null, null, "Nur bei korrektem pathologischem Staging mittels Wächterlymphknotenbiopsie; sonst Nachsorge wie Stadium IIC."], [exactMonths(3), null, null], [null, null, null]
        )),
        group("stage-iic-iv-r0", "Stadium IIC–IV (R0-reseziert)", "Nur vollständig resezierte Stadien (R0); aktive metastasierte Erkrankung erfordert einen individuellen Therapie- und Verlaufskontrollplan.", melanomaPeriods(
          [exactMonths(3), exactMonths(3), exactMonths(6)], [exactMonths(3), exactMonths(6), null], [exactMonths(3), exactMonths(6), null], [exactMonths(6), null, null]
        ))
      ]),
      notes: Object.freeze(["Die deutsche Leitlinie empfiehlt eine Nachsorgedauer von 10 Jahren; lebenslange Selbstuntersuchung wird empfohlen."]),
      reviewStatus: reviewRequired,
      clinicalReview: null
    }),
    Object.freeze({
      id: "basal-cell-carcinoma-de",
      diseaseId: "basal-cell-carcinoma",
      diseaseLabel: "Basalzellkarzinom",
      jurisdiction: "DE",
      jurisdictionLabel: "Deutschland",
      guideline: bccGuideline,
      groups: Object.freeze([
        group("isolated-low-risk", "Isoliertes, chirurgisch behandeltes Niedrigrisiko-BZK", "Isoliertes chirurgisch behandeltes BZK mit niedrigem Rezidivrisiko.", [
          period("month-6", "6 Monate nach Behandlung", { fromMonth: 6, toMonth: 6 }, [
            recommendation("clinical_examination", "scheduled", singleMonth(6), "Einmalige Kontrolle zum Ausschluss eines Lokalrezidivs.", basis("soll", "Konsens"))
          ]),
          period("thereafter", "Danach", { fromMonth: 12, toMonth: null }, [
            recommendation("clinical_examination", "scheduled", exactMonths(12), null, basis("soll", "Konsens"))
          ])
        ]),
        bccIntensiveGroup()
      ]),
      notes: Object.freeze(["Die Leitlinie empfiehlt regelmäßige Selbstinspektion. Andere Untersuchungsmodalitäten werden im Nachsorgeabschnitt nicht als starres Routineintervall vorgegeben."]),
      reviewStatus: reviewRequired,
      clinicalReview: null
    }),
    Object.freeze({
      id: "cutaneous-squamous-cell-carcinoma-de",
      diseaseId: "cutaneous-squamous-cell-carcinoma",
      diseaseLabel: "Kutanes Plattenepithelkarzinom",
      jurisdiction: "DE",
      jurisdictionLabel: "Deutschland",
      guideline: csccGuideline,
      groups: Object.freeze([
        group("low-risk", "Niedrigrisiko", "R0-resezierter Primärtumor: Tumordicke ≤ 6 mm, bei Desmoplasie ≤ 4 mm, und Differenzierung G1–2.", [
          period("years-1-2", "Jahr 1–2", { fromYear: 1, toYear: 2 }, [
            recommendation("clinical_examination", "scheduled", exactMonths(6), null, basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "conditional", perYear(0, 2), "Nicht als feste Routine für jede Niedrigrisikosituation; bei unklarem Palpationsbefund.", basis("sollte", "Starker Konsens")),
            recommendation("cross_sectional_imaging", "not_routinely_scheduled", null, "Das Schema weist keine Routinebildgebung aus.", basis("Schema 9.2", "Konsens"))
          ]),
          period("years-3-5", "Jahr 3–5", { fromYear: 3, toYear: 5 }, [
            recommendation("clinical_examination", "scheduled", exactMonths(12), null, basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "not_routinely_scheduled", null, "Das Schema weist kein Routineintervall aus.", basis("Schema 9.2", "Konsens")),
            recommendation("cross_sectional_imaging", "not_routinely_scheduled", null, "Das Schema weist keine Routinebildgebung aus.", basis("Schema 9.2", "Konsens"))
          ]),
          period("years-6-10", "Jahr 6–10", { fromYear: 6, toYear: 10 }, [
            recommendation("clinical_examination", "not_routinely_scheduled", null, "Das Schema weist für diese Gruppe kein festes tumorspezifisches Intervall aus.", basis("Schema 9.2", "Konsens")),
            recommendation("lymph_node_ultrasound", "not_routinely_scheduled", null, "Das Schema weist kein Routineintervall aus.", basis("Schema 9.2", "Konsens")),
            recommendation("cross_sectional_imaging", "not_routinely_scheduled", null, "Das Schema weist keine Routinebildgebung aus.", basis("Schema 9.2", "Konsens"))
          ])
        ]),
        group("high-risk", "Hochrisiko", "R0-resezierter Primärtumor mit Tumordicke > 6 mm, bei Desmoplasie > 4 mm, Differenzierung G3–4 oder perineuralem Tumorwachstum; die Leitlinie zählt außerdem Immunsuppression und Sekundärtumoren zu den Hochrisikofaktoren.", [
          period("years-1-2", "Jahr 1–2", { fromYear: 1, toYear: 2 }, [
            recommendation("clinical_examination", "scheduled", exactMonths(3), null, basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "conditional", perYear(1, 4), "Frequenz in Abhängigkeit von Risikofaktoren.", basis("sollte", "Starker Konsens")),
            recommendation("cross_sectional_imaging", "conditional", perYear(0, 2), "Das Intervall im Schema gilt bei perineuralem Tumorwachstum. Bei metastasensuspekten Befunden dient Schnittbildgebung der Abklärung, nicht einem festen Routineintervall.", basis("sollte", "Starker Konsens"))
          ]),
          period("year-3", "Jahr 3", { fromYear: 3, toYear: 3 }, [
            recommendation("clinical_examination", "scheduled", exactMonths(6), null, basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "conditional", perYear(0, 2), "In Abhängigkeit von Risikofaktoren.", basis("sollte", "Starker Konsens")),
            recommendation("cross_sectional_imaging", "conditional", perYear(0, 2), "Das Intervall im Schema gilt bei perineuralem Tumorwachstum. Bei metastasensuspekten Befunden dient Schnittbildgebung der Abklärung, nicht einem festen Routineintervall.", basis("sollte", "Starker Konsens"))
          ]),
          period("years-4-5", "Jahr 4–5", { fromYear: 4, toYear: 5 }, [
            recommendation("clinical_examination", "scheduled", exactMonths(6), null, basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "conditional", perYear(0, 2), "In Abhängigkeit von Risikofaktoren.", basis("sollte", "Starker Konsens")),
            recommendation("cross_sectional_imaging", "not_routinely_scheduled", null, "Das Schema weist ab Jahr 4 keine Routinebildgebung aus.", basis("Schema 9.2", "Konsens"))
          ]),
          period("years-6-10", "Jahr 6–10", { fromYear: 6, toYear: 10 }, [
            recommendation("clinical_examination", "scheduled", exactMonths(12), null, basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "not_routinely_scheduled", null, "Das Schema weist kein Routineintervall aus.", basis("Schema 9.2", "Konsens")),
            recommendation("cross_sectional_imaging", "not_routinely_scheduled", null, "Das Schema weist keine Routinebildgebung aus.", basis("Schema 9.2", "Konsens"))
          ])
        ]),
        group("immunosuppressed", "Immunsuppression", "Patientinnen und Patienten unter Immunsuppression; das individuelle Risikoprofil bestimmt die Bandbreite.", [
          period("years-1-2", "Jahr 1–2", { fromYear: 1, toYear: 2 }, [
            recommendation("clinical_examination", "scheduled", exactMonths(3), null, basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "conditional", perYear(1, 4), "Frequenz in Abhängigkeit von Risikofaktoren.", basis("sollte", "Starker Konsens")),
            recommendation("cross_sectional_imaging", "conditional", perYear(0, 2), "Das Intervall im Schema gilt bei perineuralem Tumorwachstum. Bei metastasensuspekten Befunden dient Schnittbildgebung der Abklärung, nicht einem festen Routineintervall.", basis("sollte", "Starker Konsens"))
          ]),
          period("year-3", "Jahr 3", { fromYear: 3, toYear: 3 }, [
            recommendation("clinical_examination", "scheduled", rangeMonths(3, 6), null, basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "conditional", perYear(0, 2), "In Abhängigkeit von Risikofaktoren.", basis("sollte", "Starker Konsens")),
            recommendation("cross_sectional_imaging", "conditional", perYear(0, 2), "Das Intervall im Schema gilt bei perineuralem Tumorwachstum. Bei metastasensuspekten Befunden dient Schnittbildgebung der Abklärung, nicht einem festen Routineintervall.", basis("sollte", "Starker Konsens"))
          ]),
          period("years-4-5", "Jahr 4–5", { fromYear: 4, toYear: 5 }, [
            recommendation("clinical_examination", "scheduled", rangeMonths(3, 6), null, basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "conditional", perYear(0, 2), "In Abhängigkeit von Risikofaktoren.", basis("sollte", "Starker Konsens")),
            recommendation("cross_sectional_imaging", "not_routinely_scheduled", null, "Das Schema weist ab Jahr 4 keine Routinebildgebung aus.", basis("Schema 9.2", "Konsens"))
          ]),
          period("years-6-10", "Jahr 6–10", { fromYear: 6, toYear: 10 }, [
            recommendation("clinical_examination", "scheduled", rangeMonths(3, 6), "Nach individuellem Risikoprofil.", basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "not_routinely_scheduled", null, "Das Schema weist kein Routineintervall aus.", basis("Schema 9.2", "Konsens")),
            recommendation("cross_sectional_imaging", "not_routinely_scheduled", null, "Das Schema weist keine Routinebildgebung aus.", basis("Schema 9.2", "Konsens"))
          ])
        ]),
        group("locally-advanced-metastatic", "Lokal fortgeschritten / metastasiert", "Lokal fortgeschrittene oder metastasierte Erkrankung; interdisziplinäre Anpassung bleibt erforderlich.", [
          period("years-1-2", "Jahr 1–2", { fromYear: 1, toYear: 2 }, [
            recommendation("clinical_examination", "scheduled", exactMonths(3), null, basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "scheduled", exactMonths(3), null, basis("sollte", "Starker Konsens")),
            recommendation("cross_sectional_imaging", "scheduled", exactMonths(6), "Nach lokal fortgeschrittenem oder metastasiertem PEK; zusätzlich zur Abklärung metastasensuspekter Befunde.", basis("sollte", "Starker Konsens"))
          ]),
          period("year-3", "Jahr 3", { fromYear: 3, toYear: 3 }, [
            recommendation("clinical_examination", "scheduled", exactMonths(3), null, basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "scheduled", exactMonths(6), null, basis("sollte", "Starker Konsens")),
            recommendation("cross_sectional_imaging", "scheduled", exactMonths(6), "Nach lokal fortgeschrittenem oder metastasiertem PEK; zusätzlich zur Abklärung metastasensuspekter Befunde.", basis("sollte", "Starker Konsens"))
          ]),
          period("years-4-5", "Jahr 4–5", { fromYear: 4, toYear: 5 }, [
            recommendation("clinical_examination", "scheduled", exactMonths(3), null, basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "scheduled", exactMonths(6), null, basis("sollte", "Starker Konsens")),
            recommendation("cross_sectional_imaging", "not_routinely_scheduled", null, "Das Schema weist ab Jahr 4 keine Routinebildgebung aus.", basis("Schema 9.2", "Konsens"))
          ]),
          period("years-6-10", "Jahr 6–10", { fromYear: 6, toYear: 10 }, [
            recommendation("clinical_examination", "scheduled", rangeMonths(3, 6), null, basis("soll", "Starker Konsens")),
            recommendation("lymph_node_ultrasound", "not_routinely_scheduled", null, "Das Schema weist kein Routineintervall aus.", basis("Schema 9.2", "Konsens")),
            recommendation("cross_sectional_imaging", "not_routinely_scheduled", null, "Das Schema weist keine Routinebildgebung aus.", basis("Schema 9.2", "Konsens"))
          ])
        ])
      ]),
      notes: Object.freeze(["Die klinische Untersuchung umfasst Ganzkörperinspektion sowie Inspektion und Palpation von Primärnarbe, In-transit-Strecke und regionären Lymphknoten.", "Röntgen-Thorax und Abdomensonographie sind nicht als routinemäßige Nachsorge vorgesehen."]),
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
