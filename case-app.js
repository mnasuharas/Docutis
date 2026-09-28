(function () {
  "use strict";

  const registry = window.DOCUTIS_CASES;
  const data = window.DOCUTIS_DATA;
  const root = document.getElementById("caseApp");
  const reviewUi = window.DOCUTIS_REVIEW_UI || null;
  if (!registry || !data || !root) return;

  let activeId = null;
  let diagnosisRevealed = false;
  const filters = { diseaseId: "", caseType: "", educationalLevel: "", anatomicalSite: "" };

  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  function cases() {
    return registry.cases.filter(item => {
      if (filters.diseaseId && item.diseaseId !== filters.diseaseId) return false;
      if (filters.caseType && item.caseType !== filters.caseType) return false;
      if (filters.educationalLevel && item.educationalLevel !== filters.educationalLevel) return false;
      if (filters.anatomicalSite && !(item.patientContext.anatomicalSite || "").toLocaleLowerCase("en").includes(filters.anatomicalSite.toLocaleLowerCase("en"))) return false;
      return true;
    });
  }

  function diseaseName(id) {
    return data.diseases.find(item => item.id === id)?.name || id;
  }

  function reviewLabel(caseItem) {
    const publicReview = reviewUi?.asset("case", caseItem.id);
    if (publicReview) return reviewUi.statusLabel(publicReview.status);
    return caseItem.reviewStatus === "clinician reviewed" ? "Clinician reviewed" : "Clinician review required";
  }

  function uniqueValues(getter) {
    return [...new Set(registry.cases.map(getter).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  }

  function renderFilters(parent) {
    const bar = element("div", undefined, "case-filters");
    const specs = [
      ["diseaseId", "Diagnosis / disease", uniqueValues(item => item.diseaseId).map(id => [id, diseaseName(id)])],
      ["caseType", "Case type", uniqueValues(item => item.caseType).map(value => [value, value.replaceAll("_", " ")])],
      ["educationalLevel", "Level", uniqueValues(item => item.educationalLevel).map(value => [value, value])],
      ["anatomicalSite", "Site contains", null]
    ];
    specs.forEach(([key, label, options]) => {
      const wrap = element("label", undefined, "case-filter");
      wrap.appendChild(document.createTextNode(label));
      if (options) {
        const select = document.createElement("select");
        select.setAttribute("aria-label", label);
        select.appendChild(new Option("All", ""));
        options.forEach(([value, text]) => select.appendChild(new Option(text, value)));
        select.value = filters[key];
        select.addEventListener("change", () => { filters[key] = select.value; renderList(); });
        wrap.appendChild(select);
      } else {
        const input = document.createElement("input");
        input.type = "search";
        input.setAttribute("aria-label", label);
        input.placeholder = "e.g. hand, back";
        input.value = filters[key];
        input.addEventListener("input", () => { filters[key] = input.value.trim(); renderList(); });
        wrap.appendChild(input);
      }
      bar.appendChild(wrap);
    });
    parent.appendChild(bar);
  }

  function renderProvenance(parent, image) {
    const box = element("div", undefined, "case-provenance");
    box.appendChild(element("p", `${image.creator} · ${image.license}`, "case-provenance-line"));
    const link = element("a", "Source page (opens in a new tab)");
    link.href = image.sourceUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    box.appendChild(link);
    box.appendChild(element("p", image.attribution, "case-attribution"));
    if (image.modificationStatus !== "unmodified" && image.modificationsNotes) {
      box.appendChild(element("p", `Modification: ${image.modificationsNotes}`, "case-mod-note"));
    }
    parent.appendChild(box);
  }

  function renderImage(parent, image) {
    const figure = element("figure", undefined, "case-figure");
    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt;
    img.width = image.dimensions.width;
    img.height = image.dimensions.height;
    img.loading = "lazy";
    figure.appendChild(img);
    figure.appendChild(element("figcaption", `${image.caption} · ${image.type}`));
    parent.appendChild(figure);
    renderProvenance(parent, image);
  }

  function disclosure(parent, title, open = false) {
    const details = document.createElement("details");
    details.className = "case-disclosure";
    if (open) details.open = true;
    const summary = element("summary", title);
    details.appendChild(summary);
    const body = element("div", undefined, "case-disclosure-body");
    details.appendChild(body);
    parent.appendChild(details);
    return body;
  }

  function renderDetail(caseItem) {
    root.replaceChildren();
    diagnosisRevealed = false;
    const back = element("button", "Back to case list", "case-button case-button-secondary");
    back.type = "button";
    back.addEventListener("click", () => { activeId = null; renderList(); });
    root.appendChild(back);

    root.appendChild(element("p", `${caseItem.caseType.replaceAll("_", " ")} · ${caseItem.educationalLevel} · ${caseItem.patientContext.anatomicalSite}`, "case-meta"));
    root.appendChild(element("h3", caseItem.title));
    root.appendChild(element("p", reviewLabel(caseItem), "case-review-badge"));
    if (reviewUi) {
      reviewUi.appendReviewPanel(root, "case", caseItem.id, "Case review status");
      if (reviewUi.appendFeedbackActions) reviewUi.appendFeedbackActions(root, { id: caseItem.id, title: caseItem.title, assetType: "case" });
    }

    caseItem.images.forEach(image => renderImage(root, image));

    const obsBody = disclosure(root, "What do you see? (observations)", true);
    const obsList = element("ul");
    caseItem.observations.forEach(item => obsList.appendChild(element("li", item.text)));
    obsBody.appendChild(obsList);

    if (caseItem.dermoscopicFeatures.length) {
      const featBody = disclosure(root, "Dermoscopic features");
      const featList = element("ul");
      caseItem.dermoscopicFeatures.forEach(item => featList.appendChild(element("li", item.label || item.token)));
      featBody.appendChild(featList);
    }

    const interpBody = disclosure(root, "Interpretations");
    const interpList = element("ul");
    caseItem.interpretations.forEach(item => interpList.appendChild(element("li", item.text)));
    interpBody.appendChild(interpList);

    const diffBody = disclosure(root, "Differentials");
    caseItem.differentials.forEach(diff => {
      const card = element("article", undefined, "case-diff");
      card.appendChild(element("h4", diff.diagnosis));
      card.appendChild(element("p", diff.teachingDistinction));
      if (diff.supportingFeatures.length) card.appendChild(element("p", `Supports: ${diff.supportingFeatures.join("; ")}`));
      if (diff.contradictingFeatures.length) card.appendChild(element("p", `Against: ${diff.contradictingFeatures.join("; ")}`));
      diffBody.appendChild(card);
    });

    const revealWrap = element("div", undefined, "case-reveal");
    const revealBtn = element("button", "Reveal diagnosis", "case-button");
    revealBtn.type = "button";
    revealBtn.setAttribute("aria-expanded", "false");
    revealBtn.setAttribute("aria-controls", "caseDiagnosisPanel");
    const status = element("p", "Diagnosis hidden. Review observations and differentials first.", "case-reveal-status");
    status.id = "caseRevealStatus";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    const panel = element("div", undefined, "case-diagnosis-panel");
    panel.id = "caseDiagnosisPanel";
    panel.hidden = true;
    revealBtn.addEventListener("click", () => {
      diagnosisRevealed = !diagnosisRevealed;
      panel.hidden = !diagnosisRevealed;
      revealBtn.setAttribute("aria-expanded", diagnosisRevealed ? "true" : "false");
      revealBtn.textContent = diagnosisRevealed ? "Hide diagnosis" : "Reveal diagnosis";
      status.textContent = diagnosisRevealed
        ? `Diagnosis revealed: ${caseItem.diagnosisLabel}`
        : "Diagnosis hidden. Review observations and differentials first.";
    });
    panel.appendChild(element("h4", caseItem.diagnosisLabel));
    panel.appendChild(element("p", `Confirmation: ${caseItem.diagnosticGroundTruth.confirmationMethod.replaceAll("_", " ")}`));
    panel.appendChild(element("p", caseItem.diagnosticGroundTruth.confirmationNotes));
    if (caseItem.diagnosticGroundTruth.confidenceNote) panel.appendChild(element("p", caseItem.diagnosticGroundTruth.confidenceNote, "case-confidence"));
    revealWrap.appendChild(revealBtn);
    revealWrap.appendChild(status);
    revealWrap.appendChild(panel);
    root.appendChild(revealWrap);

    const teachBody = disclosure(root, "Teaching points");
    caseItem.teachingPoints.forEach(point => {
      teachBody.appendChild(element("h4", point.title));
      teachBody.appendChild(element("p", point.text));
    });

    if (caseItem.clinicalAction) root.appendChild(element("p", caseItem.clinicalAction, "case-action"));
    const link = element("a", `Open ${diseaseName(caseItem.diseaseId)} condition record`);
    link.href = `?condition=${encodeURIComponent(caseItem.diseaseId)}`;
    root.appendChild(link);
    root.focus({ preventScroll: true });
  }

  function renderList() {
    root.replaceChildren();
    root.appendChild(element("p", registry.disclaimer, "case-inline-disclaimer"));
    renderFilters(root);
    const list = cases();
    const status = element("p", `${list.length} case${list.length === 1 ? "" : "s"} shown`, "case-result-status");
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    root.appendChild(status);
    if (!list.length) {
      root.appendChild(element("p", "No cases match the current filters."));
      return;
    }
    const grid = element("div", undefined, "case-grid");
    list.forEach(item => {
      const card = element("article", undefined, "case-card");
      card.appendChild(element("p", reviewLabel(item), "case-review-badge"));
      card.appendChild(element("h3", item.title));
      card.appendChild(element("p", `${diseaseName(item.diseaseId)} · ${item.caseType.replaceAll("_", " ")} · ${item.educationalLevel}`));
      card.appendChild(element("p", item.patientContext.anatomicalSite, "case-site"));
      const open = element("button", "Open case", "case-button");
      open.type = "button";
      open.addEventListener("click", () => { activeId = item.id; renderDetail(item); });
      card.appendChild(open);
      grid.appendChild(card);
    });
    root.appendChild(grid);
  }

  window.DOCUTIS_CASE_APP = Object.freeze({ renderList, renderDetail });
  if (activeId) {
    const item = registry.cases.find(caseItem => caseItem.id === activeId);
    if (item) renderDetail(item);
    else renderList();
  } else renderList();
}());
