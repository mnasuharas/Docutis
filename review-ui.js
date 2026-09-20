(function () {
  "use strict";

  const registry = window.DOCUTIS_REVIEW_STATUS || { assets: [], decisions: [], reviewers: [], latestValidHumanReviewDate: null };
  const labels = Object.freeze({
    "clinician reviewed": "Clinician reviewed",
    "partially reviewed": "Partially reviewed",
    "changes requested": "Changes requested",
    "review required": "Clinician review required",
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

  function statusLabel(value) { return labels[value] || "Clinician review required"; }
  function shortFingerprint(value) { return value ? `${value.slice(0, 17)}…${value.slice(-8)}` : "Unavailable"; }

  function appendReviewPanel(parent, assetType, id, title = "Human clinical review") {
    const item = asset(assetType, id);
    if (!item) return null;
    const panel = append(parent, "section", undefined, `public-review-panel review-state-${item.status.replaceAll(" ", "-")}`);
    panel.setAttribute("aria-label", `${title}: ${statusLabel(item.status)}`);
    append(panel, "h3", title);
    append(panel, "strong", statusLabel(item.status), "public-review-status");
    const explanation = item.status === "clinician reviewed"
      ? "A human clinician reviewed every section listed for this exact content fingerprint. This does not guarantee completeness or universal applicability."
      : item.status === "partially reviewed"
        ? "Only the recorded sections have a current human decision. The remaining sections are not clinician reviewed."
        : item.status === "changes requested"
          ? "A human reviewer requested corrections. This content is not clinician reviewed."
          : item.status === "review invalidated"
            ? "A previous human decision exists, but clinically relevant content changed afterwards. The old decision remains in history and no active reviewed badge is shown."
            : "No valid human approval is bound to this exact content version. Automated tests and source checks are not clinical review.";
    append(panel, "p", explanation);
    const details = append(panel, "dl", undefined, "public-review-facts");
    const fact = (term, value) => { const row = append(details, "div"); append(row, "dt", term); append(row, "dd", value); };
    fact("Content version", shortFingerprint(item.currentFingerprint));
    fact("Review scope", item.sections.join(", "));
    fact("Awaiting review", item.awaitingSections.length ? item.awaitingSections.join(", ") : "None within the declared scope");
    const active = item.activeDecisionId ? decision(item.activeDecisionId) : null;
    if (active) {
      const person = reviewer(active.reviewerId);
      fact("Review date", active.reviewDate);
      fact("Public reviewer role", person ? person.professionalRole : active.reviewerRole);
      fact("Reviewed sections", active.reviewedSections.join(", ") || "None");
      fact("Evidence checked", active.evidenceSourcesChecked.length ? `${active.evidenceSourcesChecked.length} linked source(s)` : "None recorded");
    }
    const history = append(panel, "details", undefined, "public-review-history");
    append(history, "summary", `Public review history (${item.history.length})`);
    if (!item.history.length) append(history, "p", "No human clinical-review decision has been published for this asset.");
    item.history.forEach(entry => {
      const row = append(history, "article", undefined, "public-review-history-item");
      append(row, "h4", `${entry.reviewDate} · ${entry.verdict.replaceAll("_", " ")}`);
      append(row, "p", `Scope: ${entry.reviewedSections.join(", ") || "No sections approved"}. Fingerprint: ${shortFingerprint(entry.contentFingerprint)}.`);
      if (entry.supersededBy) append(row, "p", `Superseded by ${entry.supersededBy}.`);
    });
    const machine = append(panel, "a", "Open machine-readable public review status (JSON)");
    machine.href = "review-status.json";
    return panel;
  }

  window.DOCUTIS_REVIEW_UI = Object.freeze({ registry, asset, statusLabel, shortFingerprint, appendReviewPanel });
}());
