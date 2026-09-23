(function () {
  "use strict";

  const registry = window.DOCUTIS_REVIEW_STATUS || { assets: [], decisions: [], reviewers: [], latestValidHumanReviewDate: null };
  const oss = window.DOCUTIS_OSS_FEEDBACK || null;
  const labels = Object.freeze({
    "clinician reviewed": "Clinician reviewed",
    "partially reviewed": "Partially reviewed",
    "changes requested": "Changes requested",
    "review required": "Clinical review pending",
    "review invalidated": "Review invalidated after content change",
    "not applicable": "Clinical review not applicable"
  });

  function append(parent, tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    parent.appendChild(node);
    return node;
  }

  function asset(assetType, id) {
    return registry.assets.find(item => item.assetType === assetType && item.id === id) || null;
  }

  function reviewer(id) {
    return registry.reviewers.find(item => item.id === id) || null;
  }

  function decision(id) {
    return registry.decisions.find(item => item.id === id) || null;
  }

  function statusLabel(value) { return labels[value] || "Clinical review pending"; }
  function shortFingerprint(value) { return value ? `${value.slice(0, 17)}…${value.slice(-8)}` : "Unavailable"; }

  function appendExternalLink(parent, label, href, className) {
    const link = append(parent, "a", label, className);
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return link;
  }

  function appendFeedbackActions(parent, context = {}) {
    if (!oss || !parent) return null;
    const box = append(parent, "div", undefined, "clinical-feedback");
    box.setAttribute("aria-label", "Clinical content feedback");
    append(box, "p", "Suggest improvements to this educational material. Feedback opens a GitHub issue form and is not clinical advice.", "clinical-feedback-lede");
    const actions = append(box, "div", undefined, "clinical-feedback-actions");
    appendExternalLink(actions, "Suggest a correction", oss.buildCorrectionIssueUrl(context), "clinical-feedback-link");
    appendExternalLink(actions, "Report outdated evidence", oss.buildOutdatedEvidenceIssueUrl(context), "clinical-feedback-link");
    append(box, "p", oss.FEEDBACK_PROMPT, "clinical-feedback-help");
    return box;
  }

  function appendReviewPanel(parent, assetType, id, title = "Human clinical review") {
    const item = asset(assetType, id);
    if (!item) return null;
    const panel = append(parent, "details", undefined, `public-review-panel public-review-disclosure review-state-${item.status.replaceAll(" ", "-")}`);
    append(panel, "summary", "Review details", "public-review-summary");
    const content = append(panel, "div", undefined, "public-review-content");
    append(content, "h3", title);
    const explanation = item.status === "clinician reviewed"
      ? "A human clinician reviewed every section listed for this exact content fingerprint. This does not guarantee completeness or universal applicability."
      : item.status === "partially reviewed"
        ? "Only the recorded sections have a current human decision. The remaining sections are not clinician reviewed."
        : item.status === "changes requested"
          ? "A human reviewer requested corrections. This content is not clinician reviewed."
          : item.status === "review invalidated"
            ? "A previous human decision exists, but clinically relevant content changed afterwards. The old decision remains in history and no active reviewed badge is shown."
            : "No valid human approval is bound to this exact content version. Automated tests and source checks are not clinical review.";
    append(content, "p", explanation, "public-review-explanation");
    const details = append(content, "dl", undefined, "public-review-facts");
    const fact = (term, value) => { const row = append(details, "div"); append(row, "dt", term); append(row, "dd", value); };
    fact("Review status", statusLabel(item.status));
    fact("Review scope", item.sections.join(", "));
    const integrity = append(details, "div", undefined, "public-review-integrity");
    append(integrity, "dt", "Content integrity ID");
    const integrityValue = append(integrity, "dd");
    append(integrityValue, "code", shortFingerprint(item.currentFingerprint));
    append(integrityValue, "span", "Used to ensure that physician approval applies to this exact content version.", "public-review-integrity-help");
    const active = item.activeDecisionId ? decision(item.activeDecisionId) : null;
    if (active) {
      const person = reviewer(active.reviewerId);
      fact("Review date", active.reviewDate);
      fact("Public reviewer role", person ? person.professionalRole : active.reviewerRole);
      fact("Reviewed sections", active.reviewedSections.join(", ") || "None");
      fact("Evidence checked", active.evidenceSourcesChecked.length ? `${active.evidenceSourcesChecked.length} linked source(s)` : "None recorded");
    }
    if (!item.history.length) {
      append(content, "p", "No physician review has been recorded yet.", "public-review-empty-history");
    } else {
      const history = append(content, "section", undefined, "public-review-history");
      append(history, "h4", "Review history");
      item.history.forEach(entry => {
        const row = append(history, "article", undefined, "public-review-history-item");
        append(row, "h5", `${entry.reviewDate} · ${entry.verdict.replaceAll("_", " ")}`);
        append(row, "p", `Scope: ${entry.reviewedSections.join(", ") || "No sections approved"}. Content integrity ID: ${shortFingerprint(entry.contentFingerprint)}.`);
        if (entry.supersededBy) append(row, "p", `Superseded by ${entry.supersededBy}.`);
      });
    }
    const technical = append(content, "p", undefined, "public-review-technical");
    const machine = append(technical, "a", "View technical review data (JSON)");
    machine.href = "review-status.json";
    return panel;
  }

  window.DOCUTIS_REVIEW_UI = Object.freeze({ registry, asset, statusLabel, shortFingerprint, appendReviewPanel, appendFeedbackActions });
}());
