(function () {
  "use strict";

  const registry = window.DOCUTIS_CASES;
  const data = window.DOCUTIS_DATA;
  const root = document.getElementById("caseApp");
  const reviewUi = window.DOCUTIS_REVIEW_UI || null;
  const STEPS = Object.freeze([
    { id: "inspect", name: "Inspect", title: "Inspect the image" },
    { id: "observe", name: "Observe", title: "Recorded observations" },
    { id: "differential", name: "Differential", title: "Differentials" },
    { id: "reveal", name: "Reveal", title: "Reveal the diagnosis" },
    { id: "review", name: "Review", title: "Review the case" }
  ]);
  const ZOOM_MIN = 1;
  const ZOOM_MAX = 2.5;
  const ZOOM_STEP = 0.25;
  const EVIDENCE_LABELS = Object.freeze({
    histopathology: "Histopathology",
    expert_diagnosis: "Expert diagnosis",
    source_dataset_diagnosis: "Source dataset diagnosis",
    clinical_diagnosis: "Clinical diagnosis",
    other: "Other"
  });

  let activeId = null;
  let activeStep = 0;
  let diagnosisRevealed = false;
  let zoomScales = Object.create(null);
  const filters = { diseaseId: "", caseType: "", educationalLevel: "", anatomicalSite: "" };

  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  function showLoadError(message) {
    if (!root) return;
    root.replaceChildren();
    const note = element("p", message, "case-empty");
    note.setAttribute("role", "alert");
    root.appendChild(note);
  }

  if (!root) return;
  if (!registry || !Array.isArray(registry.cases) || !data || !Array.isArray(data.diseases)) {
    showLoadError("Case data did not load. No observations, differentials or diagnoses are shown in their place.");
    return;
  }

  function asList(value) {
    return Array.isArray(value) ? value : [];
  }

  function cases() {
    return registry.cases.filter(item => {
      if (filters.caseType && item.caseType !== filters.caseType) return false;
      if (filters.educationalLevel && item.educationalLevel !== filters.educationalLevel) return false;
      if (filters.anatomicalSite && !(item.patientContext && item.patientContext.anatomicalSite || "").toLocaleLowerCase("en").includes(filters.anatomicalSite.toLocaleLowerCase("en"))) return false;
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

  function isReviewed(caseItem) {
    const publicReview = reviewUi?.asset("case", caseItem.id);
    return caseItem.reviewStatus === "clinician reviewed" || publicReview?.status === "clinician reviewed";
  }

  function reviewExplanation(caseItem) {
    if (isReviewed(caseItem)) {
      return "A clinician-reviewed decision is recorded for this exact case version. It is educational material, not clinical decision support.";
    }
    return "Review required. This case is not clinician reviewed. That means it is educational draft material with no physician attestation in Docutis.";
  }

  function evidenceLabel(method) {
    if (Object.prototype.hasOwnProperty.call(EVIDENCE_LABELS, method)) return EVIDENCE_LABELS[method];
    return "Recorded confirmation method";
  }

  function mentionsRecordedDiagnosis(text, caseItem) {
    const names = [
      caseItem.diagnosisLabel,
      caseItem.diagnosticGroundTruth && caseItem.diagnosticGroundTruth.confirmedDiagnosis,
      diseaseName(caseItem.diseaseId)
    ].filter(name => typeof name === "string" && name.trim().length > 3);
    const haystack = String(text || "").toLocaleLowerCase("en");
    return names.some(name => haystack.includes(name.toLocaleLowerCase("en")));
  }

  function imageKindLabel(image) {
    if (image.type === "dermoscopy") return "Dermoscopic image";
    if (image.type === "clinical") return "Clinical photograph";
    if (image.type === "histopathology") return "Microscopy image";
    return "Image";
  }

  function inspectAlt(caseItem, image) {
    if (image.alt && !mentionsRecordedDiagnosis(image.alt, caseItem)) return image.alt;
    const observations = asList(caseItem.observations).map(item => item && item.text).filter(Boolean);
    const site = caseItem.patientContext && caseItem.patientContext.anatomicalSite || "site not recorded";
    if (!observations.length) {
      return `${imageKindLabel(image)}, ${site}. No observation text is recorded for this case.`;
    }
    return `${imageKindLabel(image)}, ${site}. Recorded observations: ${observations.join(" ")}`;
  }

  function flowMessage(caseItem) {
    const step = STEPS[activeStep];
    const nameVisible = diagnosisRevealed && activeStep >= 3 && caseItem.diagnosisLabel;
    const diagnosis = nameVisible
      ? `Diagnosis revealed: ${caseItem.diagnosisLabel}.`
      : "Diagnosis hidden.";
    return `Step ${activeStep + 1} of ${STEPS.length}: ${step.title}. ${diagnosis}`;
  }

  function uniqueValues(getter) {
    return [...new Set(registry.cases.map(getter).filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b)));
  }

  function renderFilters(parent) {
    const bar = element("div", undefined, "case-filters");
    const specs = [
      ["caseType", "Case type", uniqueValues(item => item.caseType).map(value => [value, String(value).replaceAll("_", " ")])],
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

  function renderZoomableImage(parent, caseItem, image) {
    const figure = element("figure", undefined, "case-figure");
    const controls = element("div", undefined, "case-zoom-controls");
    controls.setAttribute("role", "group");
    controls.setAttribute("aria-label", `Zoom ${imageKindLabel(image)}`);
    const zoomOut = element("button", "Zoom out", "case-button case-button-secondary case-zoom-button");
    const zoomIn = element("button", "Zoom in", "case-button case-button-secondary case-zoom-button");
    const zoomReset = element("button", "Reset zoom", "case-button case-button-secondary case-zoom-button");
    [zoomOut, zoomIn, zoomReset].forEach(button => { button.type = "button"; });
    const zoomStatus = element("p", "", "case-zoom-status");
    zoomStatus.setAttribute("role", "status");
    zoomStatus.setAttribute("aria-live", "polite");
    const viewport = element("div", undefined, "case-zoom-viewport");
    viewport.tabIndex = 0;
    viewport.setAttribute("tabindex", "0");
    viewport.setAttribute("role", "region");
    viewport.setAttribute("aria-label", "Image inspection. Scroll or use arrow keys to pan when zoomed in.");
    const img = document.createElement("img");
    img.src = image.src;
    img.alt = inspectAlt(caseItem, image);
    if (image.dimensions) {
      img.width = image.dimensions.width;
      img.height = image.dimensions.height;
    }
    img.loading = "lazy";
    function applyZoom() {
      const scale = zoomScales[image.id] || 1;
      img.style.width = `${Math.round(scale * 100)}%`;
      img.style.maxWidth = "none";
      img.style.height = "auto";
      zoomStatus.textContent = `Image zoom ${Math.round(scale * 100)} percent`;
      zoomOut.disabled = scale <= ZOOM_MIN;
      zoomIn.disabled = scale >= ZOOM_MAX;
      zoomReset.disabled = scale === ZOOM_MIN;
    }
    function setZoom(next) {
      const clamped = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round(next * 100) / 100));
      zoomScales[image.id] = clamped;
      applyZoom();
    }
    zoomOut.addEventListener("click", () => setZoom((zoomScales[image.id] || 1) - ZOOM_STEP));
    zoomIn.addEventListener("click", () => setZoom((zoomScales[image.id] || 1) + ZOOM_STEP));
    zoomReset.addEventListener("click", () => setZoom(ZOOM_MIN));
    viewport.addEventListener("keydown", event => {
      const deltas = { ArrowUp: [0, -48], ArrowDown: [0, 48], ArrowLeft: [-48, 0], ArrowRight: [48, 0] };
      const delta = deltas[event.key];
      if (!delta || typeof viewport.scrollBy !== "function") return;
      viewport.scrollBy({ left: delta[0], top: delta[1] });
      if (typeof event.preventDefault === "function") event.preventDefault();
    });
    applyZoom();
    controls.appendChild(zoomOut);
    controls.appendChild(zoomIn);
    controls.appendChild(zoomReset);
    controls.appendChild(zoomStatus);
    viewport.appendChild(img);
    figure.appendChild(controls);
    figure.appendChild(viewport);
    const site = caseItem.patientContext && caseItem.patientContext.anatomicalSite || "Site not recorded";
    const caption = element("figcaption", `${imageKindLabel(image)} · ${site}. Diagnostic caption stays hidden until you reveal the diagnosis.`);
    figure.appendChild(caption);
    parent.appendChild(figure);
    renderProvenance(parent, image);
  }

  function renderInspect(parent, caseItem) {
    parent.appendChild(element("p", "Look at the image, creator, license and attribution. Zoom only changes the view on this page. The diagnosis stays hidden on this step.", "case-step-intro"));
    const images = asList(caseItem.images);
    if (!images.length) {
      parent.appendChild(element("p", "No image is recorded for this case. None was added.", "case-empty"));
      return;
    }
    images.forEach(image => renderZoomableImage(parent, caseItem, image));
  }

  function renderLabeledList(parent, items, kindLabel, className, textOfItem) {
    if (!items.length) return false;
    const list = element("ul", undefined, "case-kind-list");
    items.forEach(item => {
      const text = textOfItem(item);
      if (!text) return;
      const li = element("li");
      li.appendChild(element("span", kindLabel, `case-kind ${className}`));
      li.appendChild(document.createTextNode(` ${text}`));
      list.appendChild(li);
    });
    if (!list.children.length) return false;
    parent.appendChild(list);
    return true;
  }

  function renderObserve(parent, caseItem) {
    parent.appendChild(element("p", "Observations and dermoscopic features are separate from interpretations. Only items already stored on this case are shown.", "case-step-intro"));
    const observations = asList(caseItem.observations);
    const features = asList(caseItem.dermoscopicFeatures);
    const interpretations = asList(caseItem.interpretations);

    const observationSection = element("section", undefined, "case-kind-section case-kind-section-observation");
    observationSection.appendChild(element("h5", "Observations"));
    observationSection.appendChild(element("p", "Observation means a visible finding written on the case, not a diagnosis.", "case-kind-note"));
    if (!renderLabeledList(observationSection, observations, "Observation", "case-kind-observation", item => item && item.text)) {
      observationSection.appendChild(element("p", "No observations are recorded for this case. None were added.", "case-empty"));
    }
    parent.appendChild(observationSection);

    const featureSection = element("section", undefined, "case-kind-section");
    featureSection.appendChild(element("h5", "Dermoscopic features"));
    featureSection.appendChild(element("p", "Dermoscopic feature means a recorded structure or vessel finding, not a diagnosis.", "case-kind-note"));
    if (!renderLabeledList(featureSection, features, "Dermoscopic feature", "case-kind-feature", item => item && (item.label || item.token))) {
      featureSection.appendChild(element("p", "No dermoscopic features are recorded for this case. None were added.", "case-empty"));
    }
    parent.appendChild(featureSection);

    const interpretationSection = element("section", undefined, "case-kind-section case-kind-section-interpretation");
    interpretationSection.appendChild(element("h5", "Interpretations"));
    interpretationSection.appendChild(element("p", "Interpretation means a reading of the observations. It is not a confirmed diagnosis and not clinician review.", "case-kind-note"));
    if (!renderLabeledList(interpretationSection, interpretations, "Interpretation", "case-kind-interpretation", item => item && item.text)) {
      interpretationSection.appendChild(element("p", "No interpretations are recorded for this case. None were added.", "case-empty"));
    }
    parent.appendChild(interpretationSection);
  }

  function renderDifferential(parent, caseItem) {
    parent.appendChild(element("p", "These are differentials already stored for this case. Opening the list is optional. It is not a scored quiz and it does not confirm a diagnosis.", "case-step-intro"));
    const differentials = asList(caseItem.differentials);
    if (!differentials.length) {
      parent.appendChild(element("p", "No differentials are recorded for this case. None were added.", "case-empty"));
      return;
    }
    const details = document.createElement("details");
    details.className = "case-disclosure";
    details.open = false;
    details.appendChild(element("summary", "Show recorded differentials"));
    const body = element("div", undefined, "case-disclosure-body");
    differentials.forEach(diff => {
      if (!diff) return;
      const card = element("article", undefined, "case-diff");
      card.appendChild(element("h5", diff.diagnosis || "Unlabeled differential"));
      if (diff.teachingDistinction) card.appendChild(element("p", diff.teachingDistinction));
      if (asList(diff.supportingFeatures).length) card.appendChild(element("p", `Supports: ${diff.supportingFeatures.join("; ")}`));
      if (asList(diff.contradictingFeatures).length) card.appendChild(element("p", `Against: ${diff.contradictingFeatures.join("; ")}`));
      body.appendChild(card);
    });
    details.appendChild(body);
    parent.appendChild(details);
  }

  function appendEvidence(parent, caseItem) {
    const groundTruth = caseItem.diagnosticGroundTruth;
    if (!groundTruth || typeof groundTruth !== "object") {
      parent.appendChild(element("p", "No confirmation record is stored for this case. None was added.", "case-empty"));
      return;
    }
    const method = groundTruth.confirmationMethod;
    parent.appendChild(element("p", `Evidence type on record: ${evidenceLabel(method)}.`));
    if (method === "histopathology") {
      parent.appendChild(element("p", "Histopathology is the confirmation method recorded for this case."));
    }
    if (groundTruth.confirmationNotes) parent.appendChild(element("p", groundTruth.confirmationNotes));
    if (groundTruth.confidenceNote) parent.appendChild(element("p", groundTruth.confidenceNote, "case-confidence"));
  }

  function renderReveal(parent, caseItem) {
    parent.appendChild(element("p", "The recorded diagnosis stays hidden until you activate the button. Revealing it is not a score and not a clinical certainty.", "case-step-intro"));
    const revealWrap = element("div", undefined, "case-reveal");
    const revealBtn = element("button", diagnosisRevealed ? "Hide diagnosis" : "Reveal diagnosis", "case-button");
    revealBtn.type = "button";
    revealBtn.id = "caseRevealButton";
    revealBtn.setAttribute("aria-expanded", diagnosisRevealed ? "true" : "false");
    revealBtn.setAttribute("aria-controls", "caseDiagnosisPanel");
    revealBtn.setAttribute("aria-describedby", "caseRevealStatus");
    const status = element("p", diagnosisRevealed && caseItem.diagnosisLabel
      ? `Diagnosis revealed: ${caseItem.diagnosisLabel}`
      : "Diagnosis hidden. You can inspect, observe and open differentials first.", "case-reveal-status");
    status.id = "caseRevealStatus";
    const panel = element("div", undefined, "case-diagnosis-panel");
    panel.id = "caseDiagnosisPanel";
    panel.hidden = !diagnosisRevealed;
    panel.setAttribute("role", "region");
    panel.setAttribute("aria-label", "Recorded diagnosis");
    revealBtn.addEventListener("click", () => {
      diagnosisRevealed = !diagnosisRevealed;
      renderDetail(caseItem, "reveal");
    });
    if (diagnosisRevealed) {
      panel.appendChild(element("h5", caseItem.diagnosisLabel || "No diagnosis label is recorded for this case."));
      appendEvidence(panel, caseItem);
    }
    revealWrap.appendChild(revealBtn);
    revealWrap.appendChild(status);
    revealWrap.appendChild(panel);
    parent.appendChild(revealWrap);
    return revealBtn;
  }

  function renderReview(parent, caseItem) {
    parent.appendChild(element("p", "This step uses only teaching points and confirmation text already stored on the case. It does not add a new reason for the diagnosis.", "case-step-intro"));
    if (!diagnosisRevealed) {
      parent.appendChild(element("p", "The diagnosis is still hidden. Reveal it before the summary. No diagnosis has been filled in.", "case-empty"));
      const jump = element("button", "Go to reveal step", "case-button");
      jump.type = "button";
      jump.addEventListener("click", () => {
        activeStep = 3;
        renderDetail(caseItem, "reveal");
      });
      parent.appendChild(jump);
      return;
    }
    renderObserve(parent, caseItem);
    const teachingPoints = asList(caseItem.teachingPoints);
    const teaching = element("section", undefined, "case-teaching");
    teaching.appendChild(element("h5", "Teaching points"));
    if (!teachingPoints.length) {
      teaching.appendChild(element("p", "No teaching points are recorded for this case. None were added.", "case-empty"));
    } else {
      teachingPoints.forEach(point => {
        if (!point) return;
        teaching.appendChild(element("h6", point.title || "Teaching point"));
        if (point.text) teaching.appendChild(element("p", point.text));
      });
    }
    parent.appendChild(teaching);
    const summary = element("section", undefined, "case-summary");
    summary.appendChild(element("h5", "Summary"));
    const label = caseItem.diagnosisLabel || "No diagnosis label is recorded";
    summary.appendChild(element("p", `${caseItem.title || "This case"}. Recorded diagnosis: ${label}.`));
    appendEvidence(summary, caseItem);
    asList(caseItem.images).forEach(image => {
      if (image && image.caption) summary.appendChild(element("p", `Image caption on record: ${image.caption}`, "case-attribution"));
    });
    summary.appendChild(element("p", reviewExplanation(caseItem), "case-review-note"));
    parent.appendChild(summary);
    if (caseItem.clinicalAction) parent.appendChild(element("p", caseItem.clinicalAction, "case-action"));
    if (caseItem.diseaseId) {
      const link = element("a", `Open ${diseaseName(caseItem.diseaseId)} condition record`);
      link.href = `?condition=${encodeURIComponent(caseItem.diseaseId)}`;
      parent.appendChild(link);
    }
  }

  function renderStepNav(parent, caseItem) {
    const nav = element("nav", undefined, "case-step-nav");
    nav.setAttribute("aria-label", "Case learning steps");
    const list = element("ol", undefined, "case-steps");
    STEPS.forEach((step, index) => {
      const item = element("li");
      const button = element("button", `${index + 1}. ${step.name}`, "case-step-tab");
      button.type = "button";
      button.setAttribute("aria-label", `Step ${index + 1} of ${STEPS.length}: ${step.name}`);
      if (index === activeStep) button.setAttribute("aria-current", "step");
      button.addEventListener("click", () => {
        activeStep = index;
        renderDetail(caseItem, "step");
      });
      item.appendChild(button);
      list.appendChild(item);
    });
    nav.appendChild(list);
    parent.appendChild(nav);
  }

  function renderPager(parent, caseItem) {
    const bar = element("div", undefined, "case-pager");
    const previous = element("button", "Previous step", "case-button case-button-secondary");
    previous.type = "button";
    previous.disabled = activeStep === 0;
    previous.addEventListener("click", () => {
      activeStep = Math.max(0, activeStep - 1);
      renderDetail(caseItem, "step");
    });
    const next = element("button", activeStep === STEPS.length - 1 ? "Back to case list" : "Next step", "case-button");
    next.type = "button";
    next.addEventListener("click", () => {
      if (activeStep === STEPS.length - 1) {
        activeId = null;
        renderList();
        if (typeof root.focus === "function") root.focus();
        return;
      }
      activeStep += 1;
      renderDetail(caseItem, "step");
    });
    bar.appendChild(previous);
    bar.appendChild(next);
    parent.appendChild(bar);
  }

  function renderDetail(caseItem, focusTarget) {
    try {
      if (!caseItem || !caseItem.id) {
        showLoadError("This case is missing from the published registry. No substitute case was added.");
        return;
      }
      if (activeStep < 0 || activeStep >= STEPS.length) activeStep = 0;
      root.replaceChildren();
      const back = element("button", "Back to case list", "case-button case-button-secondary");
      back.type = "button";
      back.addEventListener("click", () => { activeId = null; renderList(); if (typeof root.focus === "function") root.focus(); });
      root.appendChild(back);
      const site = caseItem.patientContext && caseItem.patientContext.anatomicalSite || "Site not recorded";
      const caseType = caseItem.caseType ? String(caseItem.caseType).replaceAll("_", " ") : "case";
      root.appendChild(element("p", `${caseType} · ${caseItem.educationalLevel || "level not recorded"} · ${site}`, "case-meta"));
      root.appendChild(element("h3", caseItem.title || "Untitled case"));
      root.appendChild(element("p", reviewLabel(caseItem), "case-review-badge"));
      root.appendChild(element("p", reviewExplanation(caseItem), "case-review-note"));
      if (reviewUi) {
        reviewUi.appendReviewPanel(root, "case", caseItem.id, "Case review status");
        if (reviewUi.appendFeedbackActions) reviewUi.appendFeedbackActions(root, { id: caseItem.id, title: caseItem.title, assetType: "case" });
      }
      const live = element("p", flowMessage(caseItem), "visually-hidden");
      live.id = "caseFlowStatus";
      live.setAttribute("role", "status");
      live.setAttribute("aria-live", "polite");
      root.appendChild(live);
      renderStepNav(root, caseItem);
      const region = element("div", undefined, "case-step");
      region.setAttribute("role", "region");
      region.setAttribute("aria-labelledby", "caseStepHeading");
      const heading = element("h4", `Step ${activeStep + 1} of ${STEPS.length}: ${STEPS[activeStep].title}`);
      heading.id = "caseStepHeading";
      heading.tabIndex = -1;
      heading.setAttribute("tabindex", "-1");
      region.appendChild(heading);
      let revealButton = null;
      const stepId = STEPS[activeStep].id;
      if (stepId === "inspect") renderInspect(region, caseItem);
      else if (stepId === "observe") renderObserve(region, caseItem);
      else if (stepId === "differential") renderDifferential(region, caseItem);
      else if (stepId === "reveal") revealButton = renderReveal(region, caseItem);
      else renderReview(region, caseItem);
      root.appendChild(region);
      renderPager(root, caseItem);
      if (focusTarget === "reveal" && revealButton && typeof revealButton.focus === "function") revealButton.focus();
      else if (focusTarget !== "none" && typeof heading.focus === "function") heading.focus();
    } catch (error) {
      showLoadError("The case view could not be shown. No substitute clinical content was added.");
    }
  }

  function renderList() {
    try {
      root.replaceChildren();
      root.appendChild(element("p", registry.disclaimer || "Educational cases only. Not clinical decision support.", "case-inline-disclaimer"));
      renderFilters(root);
      const list = cases();
      const status = element("p", `${list.length} case${list.length === 1 ? "" : "s"} shown. Diagnosis stays hidden until you reveal it inside a case.`, "case-result-status");
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      root.appendChild(status);
      if (!list.length) {
        root.appendChild(element("p", "No cases match the current filters.", "case-empty"));
        return;
      }
      const grid = element("div", undefined, "case-grid");
      list.forEach(item => {
        const card = element("article", undefined, "case-card");
        card.appendChild(element("p", reviewLabel(item), "case-review-badge"));
        if (!isReviewed(item)) card.appendChild(element("p", "Review required. Not clinician reviewed.", "case-review-note"));
        card.appendChild(element("h3", item.title || "Untitled case"));
        const caseType = item.caseType ? String(item.caseType).replaceAll("_", " ") : "case";
        card.appendChild(element("p", `${caseType} · ${item.educationalLevel || "level not recorded"}`));
        card.appendChild(element("p", item.patientContext && item.patientContext.anatomicalSite || "Site not recorded", "case-site"));
        const open = element("button", "Start case", "case-button");
        open.type = "button";
        open.setAttribute("aria-label", `Start case: ${item.title || item.id}`);
        open.addEventListener("click", () => {
          activeId = item.id;
          activeStep = 0;
          diagnosisRevealed = false;
          zoomScales = Object.create(null);
          renderDetail(item, "step");
        });
        card.appendChild(open);
        grid.appendChild(card);
      });
      root.appendChild(grid);
    } catch (error) {
      showLoadError("The case list could not be shown. No substitute clinical content was added.");
    }
  }

  window.DOCUTIS_CASE_APP = Object.freeze({ renderList, renderDetail });
  if (activeId) {
    const item = registry.cases.find(caseItem => caseItem.id === activeId);
    if (item) renderDetail(item, "step");
    else renderList();
  } else renderList();
}());
