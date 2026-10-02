/* Goal 28 mixed-case screening training UI. Session state is in memory only. */
(function () {
  "use strict";

  const root = document.getElementById("trainingApp");
  const engine = window.DOCUTIS_TRAINING_ENGINE;
  const training = window.DOCUTIS_TRAINING_DATA;
  if (!root) return;
  if (!engine || !training || !window.DOCUTIS_CASES || !window.DOCUTIS_DATA) {
    root.replaceChildren();
    const message = document.createElement("p");
    message.className = "training-error";
    message.textContent = "Training could not load. The case library is unavailable.";
    root.appendChild(message);
    return;
  }

  const context = engine.createContext(window.DOCUTIS_CASES, window.DOCUTIS_DATA, window.DOCUTIS_PATTERNS || null, training);
  const diagnosisOptions = engine.workingDiagnosisOptions(context);
  let uid = 0;

  const state = {
    phase: "setup",
    blueprintId: training.blueprints[0].id,
    lengthId: (training.lengths.find(item => item.isDefault) || training.lengths[0]).id,
    composition: null,
    index: 0,
    records: Object.create(null),
    focus: null
  };

  function newSeed() {
    try {
      if (window.crypto && typeof window.crypto.getRandomValues === "function") {
        const values = new Uint32Array(1);
        window.crypto.getRandomValues(values);
        return values[0];
      }
    } catch (error) {
      // Fall through to a time-based seed.
    }
    return Date.now();
  }

  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined && text !== null) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  function nextId(prefix) { uid += 1; return `${prefix}-${uid}`; }

  function button(label, onClick, className) {
    const node = element("button", label, className || "training-button");
    node.type = "button";
    node.addEventListener("click", onClick);
    return node;
  }

  function trackFocus(node, key) {
    node.setAttribute("data-focus-key", key);
    if (state.focus === key) state.focusNode = node;
    return node;
  }

  function focusable(node, key) {
    node.setAttribute("tabindex", "-1");
    return trackFocus(node, key);
  }

  function addParagraphs(parent, values, className) {
    values.filter(Boolean).forEach(value => parent.appendChild(element("p", value, className)));
  }

  function addList(parent, values, className) {
    const items = values.filter(Boolean);
    if (!items.length) return null;
    const list = element("ul", undefined, className || "training-list");
    items.forEach(value => list.appendChild(element("li", value)));
    parent.appendChild(list);
    return list;
  }

  function section(parent, title, className, focusKey) {
    const node = element("section", undefined, className || "training-section");
    const heading = element("h4", title);
    if (focusKey) focusable(heading, focusKey);
    node.appendChild(heading);
    parent.appendChild(node);
    return node;
  }

  function radioGroup(parent, legendText, name, options, selected, onChange, disabled, hintText) {
    const fieldset = element("fieldset", undefined, "training-choice");
    fieldset.appendChild(element("legend", legendText));
    if (hintText) fieldset.appendChild(element("p", hintText, "training-hint"));
    const list = element("div", undefined, "training-choice-options");
    options.forEach(option => {
      const id = nextId(name);
      const wrapper = element("div", undefined, "training-option");
      const input = element("input");
      input.type = "radio";
      input.name = name;
      input.id = id;
      input.value = option.id;
      input.checked = selected === option.id;
      input.disabled = Boolean(disabled);
      input.addEventListener("change", () => { if (input.checked) onChange(option.id); });
      const label = element("label", option.label);
      label.htmlFor = id;
      label.setAttribute("for", id);
      wrapper.appendChild(input);
      wrapper.appendChild(label);
      if (option.summary) wrapper.appendChild(element("p", option.summary, "training-option-summary"));
      list.appendChild(wrapper);
    });
    fieldset.appendChild(list);
    parent.appendChild(fieldset);
    return fieldset;
  }

  function record(caseId) {
    if (!state.records[caseId]) {
      state.records[caseId] = { notes: "", pre: null, post: null, family: null, workingDiagnosis: "", dermoscopyShown: false, hintOpen: false, revealed: false };
    }
    return state.records[caseId];
  }

  function rerender(focusKey) {
    state.focus = focusKey || null;
    render();
  }

  function startSession() {
    state.composition = engine.composeSession(context, { blueprintId: state.blueprintId, lengthId: state.lengthId, seed: newSeed() });
    state.index = 0;
    state.records = Object.create(null);
    state.phase = "case";
    rerender("case-heading");
  }

  function resetToSetup() {
    state.composition = null;
    state.records = Object.create(null);
    state.index = 0;
    state.phase = "setup";
    rerender("setup-heading");
  }

  function currentItem() { return state.composition.items[state.index]; }

  function blueprintMeta(id) { return training.blueprints.find(item => item.id === id); }

  function renderNotices(parent) {
    const notices = element("div", undefined, "training-notices");
    notices.appendChild(element("p", training.developmentNotice, "training-status-line"));
    notices.appendChild(element("p", training.compositionNotice));
    notices.appendChild(element("p", training.stateNotice));
    parent.appendChild(notices);
  }

  function renderSetup() {
    const wrapper = element("div", undefined, "training-setup");
    wrapper.appendChild(focusable(element("h3", "Start a screening-style session"), "setup-heading"));
    wrapper.appendChild(element("p", training.disclaimer, "training-lede"));
    renderNotices(wrapper);
    const blueprints = training.blueprints.map(item => ({
      id: item.id,
      label: item.title,
      summary: item.summary
    }));
    const lengthHost = element("div", undefined, "training-length-host");
    function fillLengths() {
      lengthHost.replaceChildren();
      const allowed = engine.availableLengths(context, state.blueprintId);
      if (!allowed.some(item => item.id === state.lengthId)) state.lengthId = allowed[0].id;
      const lengths = allowed.map(item => ({ id: item.id, label: `${item.label}, ${item.cases} lesions` }));
      radioGroup(lengthHost, "Session length", "training-length", lengths, state.lengthId, value => { state.lengthId = value; }, false, training.lengthNote);
    }
    // Changing focus only rebuilds the length choices, so keyboard focus stays on the radio.
    radioGroup(wrapper, "Session focus", "training-blueprint", blueprints, state.blueprintId, value => {
      state.blueprintId = value;
      fillLengths();
    });
    fillLengths();
    wrapper.appendChild(lengthHost);
    wrapper.appendChild(element("p", training.dispositionNote, "training-hint"));
    const start = button("Start session", startSession, "training-button training-primary");
    wrapper.appendChild(start);
    root.appendChild(wrapper);
  }

  function renderImage(parent, view) {
    const figure = element("figure", undefined, "training-figure");
    const img = element("img");
    img.src = view.src;
    img.alt = view.alt;
    img.loading = "lazy";
    img.decoding = "async";
    if (view.width) img.setAttribute("width", String(view.width));
    if (view.height) img.setAttribute("height", String(view.height));
    figure.appendChild(img);
    figure.appendChild(element("figcaption", view.modality));
    parent.appendChild(figure);
  }

  function renderCase() {
    const item = currentItem();
    const caseItem = context.byId.get(item.caseId);
    const rec = record(item.caseId);
    const total = state.composition.items.length;
    const view = engine.preRevealView(context, caseItem, state.index + 1, total);
    const blueprint = blueprintMeta(state.composition.blueprintId);

    const header = element("div", undefined, "training-session-bar");
    header.appendChild(element("p", `${blueprint.title} · Lesion ${view.position} of ${view.total}`, "training-progress"));
    header.appendChild(button("End session", () => { state.phase = "debrief"; rerender("debrief-heading"); }, "training-button training-quiet"));
    root.appendChild(header);
    root.appendChild(element("p", "Curated for teaching coverage, not for prevalence.", "training-hint"));
    state.composition.notes.forEach(note => root.appendChild(element("p", note, "training-hint")));

    const article = element("article", undefined, "training-case");
    article.setAttribute("aria-label", `Lesion ${view.position} of ${view.total}`);
    article.appendChild(focusable(element("h3", `Unknown lesion ${view.position} of ${view.total}: ${view.title}`), "case-heading"));

    const images = element("div", undefined, "training-images");
    view.firstImages.forEach(image => renderImage(images, image));
    article.appendChild(images);
    article.appendChild(element("p", view.modalityNote, "training-hint"));

    const facts = [];
    if (view.site) facts.push(`Site: ${view.site}`);
    if (view.age) facts.push(`Age: ${view.age}`);
    if (view.sex) facts.push(`Sex: ${view.sex}`);
    if (facts.length) addList(article, facts, "training-facts");

    const observe = section(article, "Observe", "training-section");
    observe.appendChild(element("p", view.promptSource === "case" ? "Look before you interpret:" : "Look before you interpret. Not every question fits every lesion:", "training-hint"));
    addList(observe, view.prompts, "training-list");
    const notesId = nextId("training-notes");
    const notesLabel = element("label", "Your description (optional, stays in this tab)");
    notesLabel.htmlFor = notesId;
    notesLabel.setAttribute("for", notesId);
    const notes = element("textarea");
    notes.id = notesId;
    notes.rows = 3;
    notes.value = rec.notes;
    notes.disabled = rec.revealed;
    notes.addEventListener("input", () => { rec.notes = notes.value; });
    observe.appendChild(notesLabel);
    observe.appendChild(notes);
    if (view.hints.length && !rec.revealed) {
      const hintPanelId = nextId("training-hint-panel");
      const hint = button(rec.hintOpen ? "Hide looking hint" : "Show a looking hint", () => { rec.hintOpen = !rec.hintOpen; rerender("hint-toggle"); }, "training-button training-quiet");
      hint.setAttribute("aria-expanded", rec.hintOpen ? "true" : "false");
      hint.setAttribute("aria-controls", hintPanelId);
      trackFocus(hint, "hint-toggle");
      observe.appendChild(hint);
      const panel = element("div", undefined, "training-hint-panel");
      panel.id = hintPanelId;
      panel.hidden = !rec.hintOpen;
      if (rec.hintOpen) addList(panel, view.hints, "training-list");
      observe.appendChild(panel);
    }

    const impression = section(article, "Working impression", "training-section");
    impression.appendChild(element("p", training.impressionNote, "training-hint"));
    radioGroup(impression, view.dermoscopyStaged ? "Your impression from the clinical photograph" : "Your impression", "training-pre", training.impressions, rec.pre, value => { rec.pre = value; }, rec.revealed);
    radioGroup(impression, "Broad lesion family (optional)", "training-family", training.families, rec.family, value => { rec.family = value; }, rec.revealed);
    const selectId = nextId("training-dx");
    const selectLabel = element("label", "Working diagnosis (optional). The same list is offered for every lesion.");
    selectLabel.htmlFor = selectId;
    selectLabel.setAttribute("for", selectId);
    const select = element("select", undefined, "training-dx-select");
    select.id = selectId;
    select.setAttribute("data-role", "working-diagnosis");
    const empty = element("option", "No working diagnosis");
    empty.value = "";
    select.appendChild(empty);
    diagnosisOptions.forEach(name => {
      const option = element("option", name);
      option.value = name;
      select.appendChild(option);
    });
    select.value = rec.workingDiagnosis;
    select.disabled = rec.revealed;
    select.addEventListener("change", () => { rec.workingDiagnosis = select.value; });
    impression.appendChild(selectLabel);
    impression.appendChild(select);

    if (view.dermoscopyStaged) {
      const derm = element("section", undefined, "training-section");
      const panelId = nextId("training-derm");
      const toggle = button(rec.dermoscopyShown ? "Dermoscopy shown" : "Show dermoscopy", () => {
        if (rec.dermoscopyShown) return;
        rec.dermoscopyShown = true;
        rerender("derm-heading");
      }, "training-button");
      toggle.setAttribute("aria-expanded", rec.dermoscopyShown ? "true" : "false");
      toggle.setAttribute("aria-controls", panelId);
      toggle.disabled = rec.dermoscopyShown;
      derm.appendChild(toggle);
      const panel = element("div", undefined, "training-derm-panel");
      panel.id = panelId;
      panel.hidden = !rec.dermoscopyShown;
      if (rec.dermoscopyShown) {
        panel.appendChild(focusable(element("h4", "Dermoscopy"), "derm-heading"));
        panel.appendChild(element("p", "Showing dermoscopy does not reveal the diagnosis.", "training-hint"));
        const dermImages = element("div", undefined, "training-images");
        view.dermoscopyImages.forEach(image => renderImage(dermImages, image));
        panel.appendChild(dermImages);
        radioGroup(panel, "Update your impression after dermoscopy (optional)", "training-post", training.impressions, rec.post, value => { rec.post = value; }, rec.revealed);
      }
      derm.appendChild(panel);
      article.appendChild(derm);
    }

    if (!rec.revealed) {
      const revealBar = element("div", undefined, "training-actions");
      revealBar.appendChild(button("Reveal source diagnosis", () => { rec.revealed = true; rerender("reveal-heading"); }, "training-button training-primary"));
      if (!rec.pre) revealBar.appendChild(element("p", "You can reveal without recording an impression, but committing first is the point of the exercise.", "training-hint"));
      article.appendChild(revealBar);
    } else {
      renderReveal(article, caseItem, item, rec);
    }
    root.appendChild(article);
  }

  function upcomingIds() {
    return state.composition.items.slice(state.index + 1).map(item => item.caseId);
  }

  function renderReveal(parent, caseItem, item, rec) {
    const view = engine.revealView(context, caseItem, { upcomingCaseIds: upcomingIds(), role: item.role, record: rec });
    const reveal = element("div", undefined, "training-reveal");

    const source = section(reveal, "Source diagnosis", "training-section training-source", "reveal-heading");
    source.appendChild(element("p", view.source.diagnosisLabel, "training-diagnosis"));
    addList(source, [
      `Linked record: ${view.source.linkedRecord}`,
      `Recorded case category: ${view.source.recordedCategory}`,
      `Recorded pole: ${view.source.pole}`
    ], "training-facts");

    const verification = section(reveal, "Verification", "training-section");
    addList(verification, [
      `Method: ${view.verification.methodLabel}`,
      `Strength: ${view.verification.strength}`,
      view.verification.histopathologyLine
    ], "training-facts");
    addParagraphs(verification, [view.verification.notes, view.verification.confidenceNote], "training-small");
    verification.appendChild(element("p", view.reviewLine, "training-status-line"));

    const reflection = section(reveal, "Your reflection", "training-section");
    reflection.appendChild(element("p", "Side by side, not graded.", "training-hint"));
    addList(reflection, [
      `Your impression${caseHasDermoscopyStage(caseItem) ? " before dermoscopy" : ""}: ${view.reflection.pre || "not recorded"}`,
      caseHasDermoscopyStage(caseItem) ? `Your impression after dermoscopy: ${view.reflection.post || (rec.dermoscopyShown ? "not updated" : "dermoscopy not opened")}` : null,
      `Your lesion family: ${view.reflection.family || "not recorded"}`,
      `Your working diagnosis: ${view.reflection.workingDiagnosis || "not recorded"}`,
      `Source diagnosis: ${view.reflection.sourceDiagnosis}`,
      `Recorded case category: ${view.reflection.recordedCategory}`
    ], "training-facts");
    if (view.reflection.pull) {
      const pull = element("div", undefined, "training-pull");
      pull.appendChild(element("h5", "What may have pulled you toward the alternative?"));
      pull.appendChild(element("p", "Your impression and the recorded pole lead in different directions. This is a prompt to reflect, not a mark. The lines below are stored case teaching.", "training-hint"));
      if (view.reflection.pull.closestMimic) pull.appendChild(element("p", `Closest mimic, ${view.reflection.pull.closestMimic.name}: ${view.reflection.pull.closestMimic.whyClosest}`));
      if (view.reflection.pull.trap) pull.appendChild(element("p", `Trap: ${view.reflection.pull.trap}`));
      addList(pull, view.reflection.pull.whyNot.map(entry => `${entry.mimic}: ${entry.text}`), "training-list");
      reflection.appendChild(pull);
    }

    const why = section(reveal, "Why", "training-section");
    addParagraphs(why, [view.synthesis, view.evidenceWeighting]);
    if (view.observations.length) {
      why.appendChild(element("h5", "Recorded observations"));
      addList(why, view.observations.map(entry => entry.modality ? `${entry.modality === "dermoscopy" ? "Dermoscopy" : "Clinical"}: ${entry.text}` : entry.text), "training-list");
    }
    if (view.interpretations.length) {
      why.appendChild(element("h5", "Recorded interpretations"));
      addList(why, view.interpretations, "training-list");
    }

    if (view.patterns.length) {
      const patterns = section(reveal, "Patterns, certainty and case weight", "training-section");
      patterns.appendChild(element("p", "Certainty and weight are qualitative labels for this case. They are not sensitivities or probabilities.", "training-hint"));
      const list = element("ul", undefined, "training-pattern-list");
      view.patterns.forEach(row => {
        const entry = element("li");
        entry.appendChild(element("strong", row.label));
        entry.appendChild(element("span", ` (${row.modality}${row.canonicalName ? `; pattern: ${row.canonicalName}` : ""})`));
        entry.appendChild(element("p", `Certainty: ${row.certainty}. Case weight: ${row.weight}.`, "training-small"));
        if (row.note) entry.appendChild(element("p", row.note, "training-small"));
        list.appendChild(entry);
      });
      patterns.appendChild(list);
    }

    if (view.whatChanged) {
      const changed = section(reveal, "What changed with dermoscopy?", "training-section");
      changed.appendChild(element("p", view.whatChanged.pairLabel, "training-hint"));
      changed.appendChild(element("h5", "Before dermoscopy"));
      changed.appendChild(element("p", view.whatChanged.before));
      changed.appendChild(element("h5", "Dermoscopy added"));
      addParagraphs(changed, [view.whatChanged.added, view.whatChanged.addedValue]);
      changed.appendChild(element("h5", "Reasoning impact"));
      addParagraphs(changed, [view.whatChanged.impact, view.whatChanged.impactLabel]);
    }

    const mimic = section(reveal, "Closest mimic and contrast", "training-section");
    if (view.closestMimic) mimic.appendChild(element("p", `${view.closestMimic.name}: ${view.closestMimic.whyClosest}`));
    addList(mimic, view.whyNot.map(entry => `Why not ${entry.mimic}: ${entry.text}`), "training-list");
    if (view.trap) mimic.appendChild(element("p", `Trap: ${view.trap}`));
    view.comparisons.forEach(entry => {
      const box = element("div", undefined, "training-comparison");
      if (entry.withheld) {
        box.appendChild(element("p", entry.note, "training-hint"));
      } else {
        box.appendChild(element("h5", `Compared with: ${entry.partnerTitle} (${entry.partnerDiagnosis})`));
        box.appendChild(element("p", `Verification of that case: ${entry.partnerVerification}`, "training-small"));
        addParagraphs(box, entry.partnerLimitation, "training-small");
        if (entry.sharedFeatures.length) { box.appendChild(element("p", "Shared:", "training-small")); addList(box, entry.sharedFeatures); }
        if (entry.favouringThis.length) { box.appendChild(element("p", "Favours this lesion:", "training-small")); addList(box, entry.favouringThis); }
        if (entry.favouringPartner.length) { box.appendChild(element("p", "Favours the other lesion:", "training-small")); addList(box, entry.favouringPartner); }
        addParagraphs(box, [
          entry.discriminator ? `Discriminator: ${entry.discriminator}` : "No single discriminator is recorded for this pair.",
          entry.commonTrap ? `Common trap: ${entry.commonTrap}` : null,
          entry.limits ? `Limits: ${entry.limits}` : null
        ], "training-small");
      }
      mimic.appendChild(box);
    });
    if (view.differentials.length) {
      const details = element("details", undefined, "training-details");
      details.appendChild(element("summary", "Recorded differentials"));
      addList(details, view.differentials.map(entry => `${entry.diagnosis}: ${entry.distinction}`), "training-list");
      mimic.appendChild(details);
    }

    const limits = section(reveal, "Limitations", "training-section");
    addList(limits, view.limitations, "training-list");
    addParagraphs(limits, [view.takeHomeRule ? `Take-home rule (review required): ${view.takeHomeRule}` : null, view.mentorNote], "training-small");
    if (!view.limitations.length && !view.takeHomeRule) limits.appendChild(element("p", "No extra limitation is stored beyond the verification above.", "training-small"));

    const sources = element("details", undefined, "training-details");
    sources.appendChild(element("summary", "Image sources and licences"));
    view.attributions.forEach(entry => {
      const line = element("p", `${entry.modality}: ${entry.attribution} (${entry.license}; ${entry.modification}). `, "training-small");
      const link = element("a", "Source page");
      link.href = entry.sourceUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      line.appendChild(link);
      sources.appendChild(line);
    });
    reveal.appendChild(sources);

    const actions = element("div", undefined, "training-actions");
    const last = state.index >= state.composition.items.length - 1;
    actions.appendChild(button(last ? "Finish and open debrief" : "Next unknown lesion", () => {
      if (last) { state.phase = "debrief"; rerender("debrief-heading"); return; }
      state.index += 1;
      rerender("case-heading");
    }, "training-button training-primary"));
    reveal.appendChild(actions);
    parent.appendChild(reveal);
  }

  function caseHasDermoscopyStage(caseItem) {
    return caseItem.images.some(image => image.type === "clinical") && caseItem.images.some(image => image.type === "dermoscopy");
  }

  function renderDebrief() {
    const debrief = engine.buildDebrief(context, state.composition, state.records);
    const wrapper = element("div", undefined, "training-debrief");
    wrapper.appendChild(focusable(element("h3", "Session debrief"), "debrief-heading"));
    wrapper.appendChild(element("p", "A qualitative recap of the lesions you revealed. It is not a score, a grade, or a competence statement.", "training-lede"));
    addList(wrapper, [`Cases reviewed: ${debrief.casesReviewed}`], "training-facts");

    const families = section(wrapper, "Recorded case categories encountered");
    addList(families, debrief.categories.map(entry => `${entry.name} (${entry.count})`)) || families.appendChild(element("p", "No lesion was revealed.", "training-small"));

    const poles = section(wrapper, "Benign and malignant contexts encountered");
    addList(poles, [
      `Benign: ${debrief.poleContexts.benign}`,
      `Malignant: ${debrief.poleContexts.malignant}`,
      debrief.poleContexts.intermediate ? `Other recorded poles: ${debrief.poleContexts.intermediate}` : null
    ]);
    poles.appendChild(element("p", training.compositionNotice, "training-hint"));

    const patterns = section(wrapper, "Patterns encountered");
    addList(patterns, debrief.patterns.map(entry => entry.name)) || patterns.appendChild(element("p", "No linked pattern appeared in the revealed lesions.", "training-small"));
    if (debrief.acrossPoles.length) {
      patterns.appendChild(element("h5", "Seen in both benign and malignant lesions this session"));
      addList(patterns, debrief.acrossPoles.map(entry => entry.name));
    }

    const changed = section(wrapper, "Where dermoscopy changed your impression");
    addList(changed, debrief.dermoscopyChanged.map(entry => `${entry.title}: ${entry.pre} to ${entry.post}. Source diagnosis: ${entry.source}.`)) || changed.appendChild(element("p", "No recorded impression changed after dermoscopy.", "training-small"));

    const traps = section(wrapper, "Traps encountered");
    addList(traps, debrief.traps.map(entry => `${entry.title}: ${entry.trap}`)) || traps.appendChild(element("p", "No stored trap in the revealed lesions.", "training-small"));

    if (debrief.sessionComparisons.length) {
      const comparisons = section(wrapper, "Comparisons between lesions in this session");
      addList(comparisons, debrief.sessionComparisons.map(entry => `${entry.titleA} (${entry.diagnosisA}) and ${entry.titleB} (${entry.diagnosisB}). ${entry.discriminator ? `Discriminator: ${entry.discriminator}` : "No single discriminator is recorded."} ${entry.commonTrap ? `Trap: ${entry.commonTrap}` : ""}`.trim()));
    }

    if (debrief.contextCases.length) {
      const contextSection = section(wrapper, "Context cases in this session");
      debrief.contextCases.forEach(entry => {
        contextSection.appendChild(element("p", entry.title, "training-small"));
        addList(contextSection, entry.reasons);
      });
    }

    const revisit = section(wrapper, "Patterns worth revisiting");
    revisit.appendChild(element("p", "Drawn from what appeared in this session and from lesions you marked uncertain or where your impression and the recorded pole differed. Not a performance measure.", "training-hint"));
    addList(revisit, debrief.revisit.map(entry => entry.name)) || revisit.appendChild(element("p", "Nothing specific to revisit from this session.", "training-small"));

    const actions = element("div", undefined, "training-actions");
    actions.appendChild(button("Start a new session", resetToSetup, "training-button training-primary"));
    wrapper.appendChild(actions);
    wrapper.appendChild(element("p", "Your choices from this session are discarded when you start again.", "training-hint"));
    root.appendChild(wrapper);
  }

  function render() {
    uid = 0;
    state.focusNode = null;
    root.replaceChildren();
    if (state.phase === "setup") renderSetup();
    else if (state.phase === "case") renderCase();
    else renderDebrief();
    if (state.focusNode && typeof state.focusNode.focus === "function") {
      try {
        state.focusNode.focus({ preventScroll: false });
      } catch (error) {
        state.focusNode.focus();
      }
    }
    state.focus = null;
  }

  render();
})();
