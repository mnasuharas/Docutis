(function () {
  "use strict";

  const data = window.DOCUTIS_FOLLOW_UP_DATA;
  const diseaseSelect = document.getElementById("followUpDisease");
  const groupSelect = document.getElementById("followUpGroup");
  const periodSelect = document.getElementById("followUpPeriod");
  const result = document.getElementById("followUpResult");
  const status = document.getElementById("followUpStatus");
  const reviewUi = window.DOCUTIS_REVIEW_UI || null;
  const recommendationCharacters = Object.freeze({
    soll: "strong recommendation",
    sollte: "recommendation",
    "sollte (EK)": "expert consensus recommendation",
    "Schema 9.2": "schedule 9.2"
  });
  const consensusStrengths = Object.freeze({
    Konsens: "consensus",
    "Starker Konsens": "strong consensus",
    "Konsensstärke 100 %": "100% consensus"
  });
  const evidenceScopes = Object.freeze({
    german_expert_context: "German expert-practice context",
    german_clinical_context: "German stage-based clinical context",
    international_context: "International context"
  });

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
    if (frequency.kind === "single_timepoint_month") return `Once at ${frequency.month} months`;
    if (frequency.kind === "interval_months") {
      if (frequency.min === frequency.max) return frequency.min === 12 ? "Annually" : `Every ${frequency.min} months`;
      return `Every ${frequency.min}–${frequency.max} months`;
    }
    if (frequency.kind === "occurrences_per_year") {
      if (frequency.min === frequency.max) return `${frequency.min}× per year`;
      return `${frequency.min}–${frequency.max}× per year`;
    }
    if (frequency.kind === "minimum_occurrences_per_year") {
      return frequency.min === 1 ? "At least annually" : `At least ${frequency.min}× per year`;
    }
    return "Not specified";
  }

  function recommendationText(recommendation) {
    if (!recommendation || recommendation.status === "not_specified") return "Not specified in the guideline";
    if (recommendation.status === "not_routinely_scheduled") return "Not routinely scheduled";
    return frequencyText(recommendation.frequency) || "Risk-adapted";
  }

  function recommendationBasisText(recommendationBasis) {
    const character = recommendationCharacters[recommendationBasis.character] || recommendationBasis.character;
    const consensus = consensusStrengths[recommendationBasis.consensus] || recommendationBasis.consensus;
    return `${character} · ${consensus}`;
  }

  function renderReview(protocol, parent) {
    const publicReview = reviewUi?.asset("follow_up", protocol.id);
    if (publicReview) {
      reviewUi.appendReviewPanel(parent, "follow_up", protocol.id, "Follow-up protocol review status");
      return;
    }
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
      ? "The physician review applies to this protocol version and does not replace individual clinical judgment."
      : "This follow-up protocol has not yet completed physician review. Source and schema checks are not clinical review.", "review-explanation");
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
      if (recommendation?.evidenceScope) append(card, "p", evidenceScopes[recommendation.evidenceScope] || recommendation.evidenceScope, "recommendation-scope");
      if (recommendation?.note) append(card, "p", recommendation.note, "follow-up-note");
      if (recommendation?.recommendationBasis) {
        append(card, "p", recommendationBasisText(recommendation.recommendationBasis), "recommendation-strength");
      }
    });

    [...period.notes, ...(group.notes || []), ...protocol.notes].forEach(note => append(result, "p", note, "follow-up-note"));

    if (group.contextSections?.length) {
      const context = append(result, "aside", null, "follow-up-context");
      group.contextSections.forEach(section => {
        const item = append(context, "section", null, "follow-up-context-section");
        append(item, "h4", section.title);
        append(item, "p", section.text);
      });
    }

    const provenance = append(result, "details", null, "follow-up-provenance");
    append(provenance, "summary", "Guideline basis and clinical governance");
    append(provenance, "p", `Official guideline title: ${protocol.guideline.title}`);
    append(provenance, "p", `Guideline jurisdiction: ${protocol.jurisdictionLabel} · ${protocol.guideline.guidelineSystem}`);
    append(provenance, "p", `Version: ${protocol.guideline.version} · ${protocol.guideline.publishedAt}`);
    append(provenance, "p", `AWMF register: ${protocol.guideline.registerNumber}`);
    append(provenance, "p", `Recommendation location: ${protocol.guideline.recommendationLocation}`);
    const sourceLink = append(provenance, "a", "Open the official guideline (new tab)");
    sourceLink.href = protocol.guideline.sourceUrl;
    sourceLink.target = "_blank";
    sourceLink.rel = "noopener noreferrer";
    append(provenance, "p", `Source metadata checked: ${protocol.guideline.sourceMetadataCheckedAt}`, "reference-metadata");
    const sourceIds = new Set([
      ...period.recommendations.flatMap(item => item.sourceIds || []),
      ...(group.contextSections || []).flatMap(section => section.sourceIds || [])
    ]);
    const supportingSources = (protocol.supplementalSources || []).filter(source => sourceIds.has(source.id));
    if (supportingSources.length) {
      append(provenance, "h4", "Supporting context sources");
      const sourceList = append(provenance, "ul", null, "follow-up-source-list");
      supportingSources.forEach(source => {
        const item = append(sourceList, "li");
        const link = append(item, "a", `${source.title} (new tab)`);
        link.href = source.sourceUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        append(item, "span", `${source.organization} · ${source.sourceType}`, "reference-metadata");
        append(item, "span", `Source metadata checked: ${source.sourceMetadataCheckedAt}`, "reference-metadata");
      });
    }
    renderReview(protocol, provenance);

    if (announce) status.textContent = `Showing ${protocol.diseaseLabel}, ${group.label}, ${period.label}.`;
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
