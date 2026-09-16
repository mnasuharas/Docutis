(function () {
  "use strict";

  const data = window.DOCUTIS_FOLLOW_UP_DATA;
  const diseaseSelect = document.getElementById("followUpDisease");
  const groupSelect = document.getElementById("followUpGroup");
  const periodSelect = document.getElementById("followUpPeriod");
  const result = document.getElementById("followUpResult");
  const status = document.getElementById("followUpStatus");

  function append(parent, tag, text, className) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined && text !== null) element.textContent = text;
    parent.appendChild(element);
    return element;
  }

  function selectedProtocol() {
    return data.protocols.find(protocol => protocol.id === diseaseSelect.value) || data.protocols[0];
  }

  function selectedGroup(protocol) {
    return protocol.groups.find(group => group.id === groupSelect.value) || protocol.groups[0];
  }

  function selectedPeriod(group) {
    return group.periods.find(period => period.id === periodSelect.value) || group.periods[0];
  }

  function populate(select, items) {
    select.replaceChildren();
    items.forEach(item => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.label || item.diseaseLabel;
      select.appendChild(option);
    });
  }

  function frequencyText(frequency) {
    if (!frequency) return null;
    if (frequency.kind === "single_timepoint_month") return `Einmalig nach ${frequency.month} Monaten`;
    if (frequency.kind === "interval_months") {
      if (frequency.min === frequency.max) return frequency.min === 12 ? "Einmal jährlich" : `Alle ${frequency.min} Monate`;
      return `Alle ${frequency.min}–${frequency.max} Monate`;
    }
    if (frequency.kind === "occurrences_per_year") {
      if (frequency.min === frequency.max) return `${frequency.min}× pro Jahr`;
      return `${frequency.min}–${frequency.max}× pro Jahr`;
    }
    return "Nicht spezifiziert";
  }

  function recommendationText(recommendation) {
    if (!recommendation) return "Im ausgewählten Leitlinienabschnitt nicht spezifiziert";
    if (recommendation.status === "not_routinely_scheduled") return "Kein routinemäßiges Intervall im Schema";
    return frequencyText(recommendation.frequency) || "Risikoadaptiert";
  }

  function renderReview(protocol, parent) {
    const review = protocol.clinicalReview;
    const reviewed = protocol.reviewStatus === "clinician reviewed" && review &&
      review.reviewerRole === "physician" && typeof review.reviewerSpecialty === "string" &&
      review.reviewerSpecialty.trim() && /^\d{4}-\d{2}-\d{2}$/.test(review.reviewedAt) &&
      /^sha256-v1:[0-9a-f]{64}$/.test(review.reviewedContentHash);
    append(parent, "span", reviewed
      ? `Clinical review: Reviewed by a physician in ${review.reviewerSpecialty}`
      : "Clinical review: Required", "review-status");
    if (reviewed) append(parent, "span", `Reviewed: ${review.reviewedAt}`, "follow-up-reviewed-date");
    append(parent, "p", reviewed
      ? "Die ärztliche Prüfung gilt für diese Protokollversion und ersetzt keine individuelle klinische Beurteilung."
      : "Dieses Nachsorgeprotokoll wurde noch nicht durch eine Ärztin oder einen Arzt geprüft. Quellen- und Schema-Prüfungen sind keine klinische Prüfung.", "review-explanation");
  }

  function renderResult(announce = true) {
    const protocol = selectedProtocol();
    const group = selectedGroup(protocol);
    const period = selectedPeriod(group);
    result.replaceChildren();

    const heading = append(result, "h3", `${protocol.diseaseLabel}: ${group.label}`);
    heading.id = "followUpResultHeading";
    append(result, "p", group.description, "follow-up-group-description");
    append(result, "p", period.label, "follow-up-period-label");

    const grid = append(result, "div", null, "follow-up-results-grid");
    data.modalities.forEach(modality => {
      const recommendation = period.recommendations.find(item => item.modality === modality.id);
      const card = append(grid, "section", null, "follow-up-result-card");
      append(card, "h4", modality.label);
      append(card, "p", recommendationText(recommendation), recommendation ? `recommendation-${recommendation.status}` : "recommendation-unspecified");
      if (recommendation?.note) append(card, "p", recommendation.note, "follow-up-note");
      if (recommendation?.recommendationBasis) {
        append(card, "p", `${recommendation.recommendationBasis.character} · ${recommendation.recommendationBasis.consensus}`, "recommendation-strength");
      }
    });

    [...period.notes, ...protocol.notes].forEach(note => append(result, "p", note, "follow-up-note"));

    const provenance = append(result, "details", null, "follow-up-provenance");
    append(provenance, "summary", "Leitlinienbasis und klinische Governance");
    append(provenance, "p", protocol.guideline.title);
    append(provenance, "p", `Leitlinienkontext: ${protocol.jurisdictionLabel} · ${protocol.guideline.guidelineSystem} · Version ${protocol.guideline.version} · ${protocol.guideline.publishedAt}`);
    append(provenance, "p", `Fundstelle: ${protocol.guideline.recommendationLocation}`);
    const sourceLink = append(provenance, "a", "Offizielle Leitlinie öffnen (neuer Tab)");
    sourceLink.href = protocol.guideline.sourceUrl;
    sourceLink.target = "_blank";
    sourceLink.rel = "noopener noreferrer";
    append(provenance, "p", `Source metadata checked: ${protocol.guideline.sourceMetadataCheckedAt}`, "reference-metadata");
    renderReview(protocol, provenance);

    if (announce) status.textContent = `${protocol.diseaseLabel}, ${group.label}, ${period.label} angezeigt.`;
  }

  function renderPeriods(announce = true) {
    const protocol = selectedProtocol();
    const group = selectedGroup(protocol);
    populate(periodSelect, group.periods);
    renderResult(announce);
  }

  function renderGroups(announce = true) {
    const protocol = selectedProtocol();
    populate(groupSelect, protocol.groups);
    renderPeriods(announce);
  }

  populate(diseaseSelect, data.protocols);
  diseaseSelect.addEventListener("change", () => renderGroups());
  groupSelect.addEventListener("change", () => renderPeriods());
  periodSelect.addEventListener("change", () => renderResult());
  renderGroups(false);
}());
