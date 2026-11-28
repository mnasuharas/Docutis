const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

class Element {
  constructor(tagName, ownerDocument) {
    this.tagName = tagName.toUpperCase();
    this.ownerDocument = ownerDocument;
    this.children = [];
    this.attributes = {};
    this.dataset = {};
    this.listeners = {};
    this.style = {};
    this.hidden = false;
    this.value = "";
    this.textContent = "";
    this.className = "";
  }
  appendChild(child) { this.children.push(child); child.parentElement = this; return child; }
  replaceChildren(...children) { this.children = []; children.forEach(child => this.appendChild(child)); }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  getAttribute(name) { return this.attributes[name]; }
  addEventListener(type, listener) { (this.listeners[type] ||= []).push(listener); }
  dispatch(type, extra = {}) {
    const event = { type, target: this, preventDefault() { this.defaultPrevented = true; }, ...extra };
    for (const listener of this.listeners[type] || []) listener(event);
    return event;
  }
  focus(...args) {
    this.focusCalls = this.focusCalls || [];
    this.focusCalls.push(args);
    if (this.ownerDocument.focusThrowsOnOptions && args.length > 0) {
      throw new TypeError("focus options are not supported");
    }
    this.ownerDocument.activeElement = this;
  }
  scrollIntoView(options) {
    this.scrollIntoViewOptions = options === undefined ? null : options;
    this.scrollIntoViewCalls = (this.scrollIntoViewCalls || 0) + 1;
  }
  querySelectorAll(selector) {
    const matches = [];
    const visit = node => {
      if (/^[a-z]+$/.test(selector) && node.tagName === selector.toUpperCase()) matches.push(node);
      if (selector.startsWith(".") && node.className.split(" ").includes(selector.slice(1))) matches.push(node);
      node.children.forEach(visit);
    };
    this.children.forEach(visit);
    return matches;
  }
}

function createHarness(transformData, transformMedia, initialHref = "https://example.test/Docutis/", extras = {}) {
  const document = {
    activeElement: null,
    elements: {},
    listeners: {},
    createElement(tagName) { return new Element(tagName, document); },
    getElementById(id) {
      return document.elements[id] || document.elements.details?.querySelectorAll("section").find(section => section.id === id);
    },
    contains(element) { return Boolean(element); },
    addEventListener(type, listener) { (document.listeners[type] ||= []).push(listener); },
    dispatch(type, extra = {}) { for (const listener of document.listeners[type] || []) listener({ type, target: extra.target, key: extra.key, ctrlKey: false, metaKey: false, altKey: false, preventDefault() {} }); }
  };
  for (const id of ["cards", "details", "categoryFilters", "libraryStats", "reviewDashboardCounts", "noResult", "resultStatus", "searchClear", "searchInput"]) {
    const tagName = id === "searchInput" ? "input" : id === "searchClear" ? "button" : "div";
    document.elements[id] = new Element(tagName, document);
  }
  document.elements.details.hidden = true;
  const entries = [{ href: initialHref, state: null }];
  let historyIndex = 0;
  const window = {
    location: { href: initialHref }, listeners: {},
    addEventListener(type, listener) { (this.listeners[type] ||= []).push(listener); },
    dispatch(type) { for (const listener of this.listeners[type] || []) listener({ type }); }
  };
  window.history = {
    state: null,
    get length() { return entries.length; },
    pushState(state, _title, url) {
      entries.splice(historyIndex + 1);
      const href = new URL(url, window.location.href).href;
      entries.push({ href, state }); historyIndex += 1; this.state = state; window.location.href = href;
    },
    replaceState(state, _title, url) {
      const href = new URL(url, window.location.href).href;
      entries[historyIndex] = { href, state }; this.state = state; window.location.href = href;
    },
    back() {
      if (historyIndex === 0) return;
      historyIndex -= 1; const entry = entries[historyIndex]; this.state = entry.state; window.location.href = entry.href; window.dispatch("popstate");
    },
    forward() {
      if (historyIndex >= entries.length - 1) return;
      historyIndex += 1; const entry = entries[historyIndex]; this.state = entry.state; window.location.href = entry.href; window.dispatch("popstate");
    }
  };
  if (typeof extras.matchMedia === "function") window.matchMedia = extras.matchMedia;
  const context = { window, document, URL };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "clinical-schema.js"), "utf8"), context);
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "data.js"), "utf8"), context);
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "media-data.js"), "utf8"), context);
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "followup-data.js"), "utf8"), context);
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "quiz-data.js"), "utf8"), context);
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "case-data.js"), "utf8"), context);
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "review-status.js"), "utf8"), context);
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "oss-feedback.js"), "utf8"), context);
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "review-ui.js"), "utf8"), context);
  if (transformData) context.window.DOCUTIS_DATA = transformData(context.window.DOCUTIS_DATA);
  if (transformMedia) context.window.DOCUTIS_MEDIA = transformMedia(context.window.DOCUTIS_MEDIA);
  if (extras.loadLocale) {
    document.readyState = "loading";
    document.documentElement = {};
    document.body = {};
    document.title = "Docutis | Dermatology Reference Toolkit";
    for (const name of ["clinical-locale.js", "differential-locale.js", "profile-locale.js", "remainder-locale.js", "coding-locale.js", "training-locale.js", "case-prose-locale.js", "locale.js"]) {
      vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", name), "utf8"), context, { filename: name });
    }
  }
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8"), context);
  return { document, elements: document.elements, window, history: window.history };
}

function textOf(element) {
  return [element.textContent, ...element.children.map(textOf)].join(" ");
}

function searchFor(elements, query) {
  elements.searchInput.value = query;
  elements.searchInput.dispatch("input");
  return elements.cards.querySelectorAll(".card");
}

test("Turkish search ignores diacritics and matches translated condition names", () => {
  const { elements, window } = createHarness(null, null, "https://example.test/Docutis/", { loadLocale: true });
  assert.equal(window.DOCUTIS_SEARCH.normalize("sağlık"), "saglik");
  assert.equal(window.DOCUTIS_SEARCH.normalize("İstanbul"), "istanbul");
  assert.equal(window.DOCUTIS_SEARCH.normalize("Bazal hücreli karsinom"), "bazal hucreli karsinom");
  const cards = searchFor(elements, "bazal hucreli");
  assert.ok(cards.some(card => /basal cell carcinoma/i.test(textOf(card))), "folded Turkish name should find BCC");
  assert.equal(searchFor(elements, "aktinik keratoz").some(card => /actinic keratosis/i.test(textOf(card))), true);
});

test("initial rendering creates all cards and ten category sections", () => {
  const { elements } = createHarness();
  assert.equal(elements.cards.querySelectorAll(".card").length, 62);
  assert.ok(elements.cards.querySelectorAll(".card").every(card => card.tagName === "BUTTON" && card.type === "button"));
  assert.equal(elements.cards.querySelectorAll(".category-section").length, 10);
  assert.equal(elements.categoryFilters.querySelectorAll("button").length, 11);
  assert.ok(elements.categoryFilters.querySelectorAll("button").every(button => button.type === "button"));
  assert.match(elements.resultStatus.textContent, /62 conditions shown/);
  assert.match(textOf(elements.libraryStats), /3\s+oncology follow-up protocols/);
  assert.match(textOf(elements.reviewDashboardCounts), /2\s+Clinician-reviewed records/);
  assert.match(textOf(elements.reviewDashboardCounts), /0\s+Partially reviewed records/);
  assert.match(textOf(elements.reviewDashboardCounts), /60\s+Records requiring clinician review/);
  assert.match(textOf(elements.reviewDashboardCounts), /0\/8\s+Reviewed quiz items/);
  assert.match(textOf(elements.reviewDashboardCounts), /1\/9\s+Reviewed visual items/);
  assert.match(textOf(elements.reviewDashboardCounts), /1\/3\s+Reviewed follow-up protocols/);
  assert.match(textOf(elements.reviewDashboardCounts), /2026-09-23\s+Most recent valid human review/);
});

test("search covers names, aliases, categories, subcategories and both coding systems", () => {
  const { elements } = createHarness();
  assert.equal(searchFor(elements, "Merkel Cell Carcinoma").length, 1);
  assert.equal(searchFor(elements, "Merkel").length, 1);
  assert.equal(searchFor(elements, "BCC").length, 1);
  assert.equal(searchFor(elements, "Melanocytic Malignancies").length, 6);
  assert.equal(searchFor(elements, "cutaneous lymphoma").length, 3);
  assert.equal(searchFor(elements, "C84.1").length, 1);
  assert.equal(searchFor(elements, "8247/3").length, 1);
  assert.equal(searchFor(elements, "Atopic eczema").length, 1);
  assert.equal(searchFor(elements, "allergic contact dermatitis").length, 1);
  assert.equal(searchFor(elements, "dandruff").length, 1);
  assert.equal(searchFor(elements, "psoriasis vulgaris").length, 1);
  assert.equal(searchFor(elements, "common acne").length, 1);
  assert.equal(searchFor(elements, "chronic spontaneous urticaria").length, 1);
  assert.equal(searchFor(elements, "leukoderma").length, 1);
  assert.equal(searchFor(elements, "annular").length, 1);
  assert.equal(searchFor(elements, "photo distributed").length, 1);
  assert.equal(searchFor(elements, "Inflammatory and Eczematous Disorders").length, 5);
  assert.equal(searchFor(elements, "Acneiform and Sebaceous Disorders").length, 2);
  assert.equal(searchFor(elements, "Depigmenting disorder").length, 1);
  assert.equal(searchFor(elements, "L70.0").length, 1);
  assert.equal(searchFor(elements, "Tinea Capitis").length, 1);
  assert.equal(searchFor(elements, "athlete's foot").length, 1);
  assert.equal(searchFor(elements, "shingles").length, 1);
  assert.equal(searchFor(elements, "verruca vulgaris").length, 1);
  assert.equal(searchFor(elements, "Infectious and Infestation Disorders").length, 16);
  assert.equal(searchFor(elements, "Dermatophyte infection").length, 5);
  assert.equal(searchFor(elements, "B35.0").length, 1);
});

test("search accepts spacing, diacritics, typographic punctuation and reordered terms", () => {
  const { elements } = createHarness();
  for (const query of ["  MÉRKEL   cell carcinoma ", "carcinoma merkel", "8247/3 merkel"]) {
    const cards = searchFor(elements, query);
    assert.equal(cards.length, 1, query);
    assert.match(textOf(cards[0]), /Merkel Cell Carcinoma/);
  }
  assert.equal(searchFor(elements, "athlete’s foot").length, 1);
});

test("category filters preserve every broad grouping", () => {
  const { elements } = createHarness();
  const expectedCounts = {
    premalignant: 3,
    keratinocytic: 4,
    melanocytic: 6,
    other: 13,
    "inflammatory-eczematous": 5,
    "acneiform-sebaceous": 2,
    pigmentary: 1,
    "infectious-infestation": 16,
    "autoimmune-connective-immunobullous": 7,
    "hair-nail-disorders": 5
  };
  for (const [category, expected] of Object.entries(expectedCounts)) {
    const button = elements.categoryFilters.querySelectorAll("button").find(item => item.dataset.category === category);
    button.dispatch("click");
    assert.equal(elements.cards.querySelectorAll(".card").length, expected);
    assert.equal(button.getAttribute("aria-pressed"), "true");
  }
});

test("new non-neoplastic details explain ICD-O applicability and expose guideline metadata", () => {
  const { elements } = createHarness();
  const card = elements.cards.querySelectorAll(".card").find(item => textOf(item).includes("Vitiligo"));
  card.dispatch("click");
  const details = textOf(elements.details);
  assert.match(details, /ICD-10 WHO 2019: L80/);
  assert.match(details, /ICD-O 3.2 \(oncology registry coding\)/);
  assert.match(details, /No ICD-O morphology code is assigned for this record/);
  assert.match(details, /International Vitiligo Task Force/);
  assert.match(details, /DOI: 10.1111\/jdv.19451/);
  assert.match(details, /Source metadata checked: 2026-09-16/);
});

test("infectious details render ICD-O non-applicability and source DOI metadata", () => {
  const { elements } = createHarness();
  const card = elements.cards.querySelectorAll(".card").find(item => textOf(item).includes("Scabies"));
  card.dispatch("click");
  const details = textOf(elements.details);
  assert.match(details, /ICD-10 WHO 2019: B86/);
  assert.match(details, /No ICD-O morphology code is assigned for this record/);
  assert.match(details, /DOI: 10.1111\/ijd.17327/);
  assert.match(details, /Source metadata checked: 2026-09-16/);
});

test("card details distinguish coding fields, expose sources and restore focus", () => {
  const { document, elements } = createHarness();
  const card = elements.cards.querySelectorAll(".card").find(item => textOf(item).includes("Merkel Cell Carcinoma"));
  card.dispatch("click");
  assert.equal(elements.details.hidden, false);
  assert.match(textOf(elements.details), /ICD-10 WHO 2019: C44/);
  assert.match(textOf(elements.details), /Topography C44\._/);
  assert.match(textOf(elements.details), /Morphology 8247\/3/);
  assert.match(textOf(elements.details), /Source metadata checked: 2026-09-15/);
  const links = elements.details.querySelectorAll("a");
  assert.ok(links.length > 0);
  const externalLinks = links.filter(link => /^https:\/\//.test(link.href));
  const internalLinks = links.filter(link => /^#detail-/.test(link.href));
  assert.ok(externalLinks.length > 0);
  assert.ok(internalLinks.length >= 8);
  for (const link of externalLinks) {
    assert.equal(link.target, "_blank");
    assert.equal(link.rel, "noopener noreferrer");
    assert.match(link.href, /^https:\/\//);
  }
  assert.ok(elements.details.querySelectorAll("button").some(button => button.textContent === "Close details"));

  elements.details.dispatch("keydown", { key: "Escape" });
  assert.equal(elements.details.hidden, true);
  assert.equal(document.activeElement, card);
});

test("Close button hides details and restores focus", () => {
  const { document, elements } = createHarness();
  const card = elements.cards.querySelectorAll(".card")[0];
  card.dispatch("click");
  const close = elements.details.querySelectorAll("button").find(button => button.textContent === "Close details");
  close.dispatch("click");
  assert.equal(elements.details.hidden, true);
  assert.equal(document.activeElement, card);
});

test("no-result state is announced", () => {
  const { elements } = createHarness();
  elements.searchInput.value = "not-a-real-condition";
  elements.searchInput.dispatch("input");
  assert.equal(elements.cards.querySelectorAll(".card").length, 0);
  assert.equal(elements.noResult.style.display, "block");
  assert.match(elements.resultStatus.textContent, /0 conditions shown/);
});

test("search clear control and slash shortcut preserve keyboard usability", () => {
  const { document, elements } = createHarness();
  elements.searchInput.value = "melanoma";
  elements.searchInput.dispatch("input");
  assert.equal(elements.searchClear.hidden, false);
  elements.searchClear.dispatch("click");
  assert.equal(elements.searchInput.value, "");
  assert.equal(elements.searchClear.hidden, true);
  assert.equal(document.activeElement, elements.searchInput);
  document.activeElement = null;
  document.dispatch("keydown", { key: "/", target: elements.cards });
  assert.equal(document.activeElement, elements.searchInput);
});

test("condition details expose scannable section navigation and omit empty media", () => {
  const { elements } = createHarness();
  elements.cards.querySelectorAll(".card")[0].dispatch("click");
  assert.equal(elements.details.querySelectorAll(".detail-jump-nav").length, 1);
  assert.equal(elements.details.querySelectorAll(".detail-section").length, 8);
  assert.equal(elements.details.querySelectorAll(".media-section").length, 0);
  assert.match(textOf(elements.details), /Overview Clinical features Dermoscopy Differential Treatment Follow-up Coding Sources/);
  assert.match(textOf(elements.details), /View \d+ traceable sources/);
});

test("structured pilot details render clinical presentation, diagnostics, hierarchy and red flags", () => {
  const { elements } = createHarness();
  const card = elements.cards.querySelectorAll(".card").find(item => textOf(item).includes("Actinic Keratosis"));
  card.dispatch("click");
  const details = textOf(elements.details);
  assert.match(details, /Clinical presentation/);
  assert.match(details, /Morphology/);
  assert.match(details, /Typical localization/);
  assert.match(details, /Diagnostic approach/);
  assert.match(details, /Clinical Examination · Routine/);
  assert.match(details, /Differential diagnosis/);
  assert.match(details, /First Line/);
  assert.match(details, /Procedural/);
  assert.match(details, /Red flags/);
  assert.match(details, /Biopsy Assessment/);
});

test("legacy-compatible details retain the Goal 6 rendering path", () => {
  const { elements } = createHarness();
  const card = elements.cards.querySelectorAll(".card").find(item => textOf(item).includes("Contact Dermatitis"));
  card.dispatch("click");
  const details = textOf(elements.details);
  assert.match(details, /Clinical features/);
  assert.match(details, /Dermoscopy/);
  assert.match(details, /Treatment overview/);
  assert.doesNotMatch(details, /Diagnostic approach/);
});

test("pilot details render section-level evidence maps with secure descriptive links", () => {
  const { elements } = createHarness();
  const card = elements.cards.querySelectorAll(".card").find(item => textOf(item).includes("Cutaneous Melanoma"));
  card.dispatch("click");
  const evidence = elements.details.querySelectorAll(".evidence-disclosure");
  assert.ok(evidence.length >= 8);
  assert.match(textOf(elements.details), /Evidence for clinical presentation/);
  assert.match(textOf(elements.details), /Source supporting treatment hierarchy/);
  for (const link of evidence.flatMap(item => item.querySelectorAll("a"))) {
    assert.equal(link.target, "_blank");
    assert.equal(link.rel, "noopener noreferrer");
    assert.match(link.textContent, /Source supporting/);
  }
});

test("valid condition deep links open safely and invalid IDs preserve the library", () => {
  const valid = createHarness(null, null, "https://example.test/Docutis/?condition=acne-vulgaris");
  assert.equal(valid.elements.details.hidden, false);
  assert.match(textOf(valid.elements.details), /Acne Vulgaris/);
  const invalid = createHarness(null, null, "https://example.test/Docutis/?condition=not-a-condition");
  assert.equal(invalid.elements.details.hidden, true);
  assert.equal(invalid.elements.cards.querySelectorAll(".card").length, 62);
});

test("card URLs support Back and Forward while Escape restores card focus", () => {
  const { document, elements, window, history } = createHarness();
  const card = elements.cards.querySelectorAll(".card").find(item => textOf(item).includes("Acne Vulgaris"));
  card.dispatch("click");
  assert.match(window.location.href, /condition=acne-vulgaris/);
  assert.equal(elements.details.hidden, false);
  history.back();
  assert.equal(elements.details.hidden, true);
  assert.equal(document.activeElement, card);
  history.forward();
  assert.equal(elements.details.hidden, false);
  elements.details.dispatch("keydown", { key: "Escape" });
  assert.equal(elements.details.hidden, true);
  assert.equal(document.activeElement, card);
});

test("condition section links preserve deep links and close in one Back step", () => {
  const { document, elements, window, history } = createHarness(null, null, "https://example.test/Docutis/#searchPanel");
  const card = elements.cards.querySelectorAll(".card").find(item => textOf(item).includes("Acne Vulgaris"));
  card.dispatch("click");
  const sources = elements.details.querySelectorAll("a").find(link => link.href === "#detail-sources");
  assert.ok(sources.dispatch("click").defaultPrevented);
  assert.equal(history.length, 2);
  assert.equal(new URL(window.location.href).hash, "#detail-sources");
  assert.equal(document.activeElement.id, "detail-sources");
  elements.details.dispatch("keydown", { key: "Escape" });
  assert.equal(window.location.href, "https://example.test/Docutis/#searchPanel");
  assert.equal(elements.details.hidden, true);
  assert.equal(document.activeElement, card);

  const direct = createHarness(null, null, "https://example.test/Docutis/?condition=acne-vulgaris#detail-sources");
  assert.equal(direct.document.activeElement.id, "detail-sources");
  direct.elements.details.dispatch("keydown", { key: "Escape" });
  assert.equal(direct.window.location.href, "https://example.test/Docutis/");
  assert.equal(direct.document.activeElement, direct.elements.searchInput);
});

test("optional educational media renders provenance and recovers from image failure", () => {
  const { elements } = createHarness(null, media => ({
    ...media,
    items: [{
      id: "synthetic-media", diseaseId: "actinic-keratosis", type: "diagram",
      src: "assets/media/synthetic.svg", dimensions: { width: 1200, height: 900 },
      caption: "Synthetic media fixture", alt: "Synthetic educational diagram",
      anatomicalSite: null, diagnosis: "Actinic Keratosis",
      educationalDescription: "Used to validate optional media rendering.",
      patientIdentifiable: false,
      consentBasis: "Not applicable — project-owned non-patient educational diagram",
      source: "Docutis test fixture", license: "Project-owned", attribution: "Docutis contributors",
      sourceUrl: "https://example.org/media", metadataCheckedAt: "2026-09-17",
      reviewStatus: "clinician review required", clinicalReview: null
    }]
  }));
  elements.cards.querySelectorAll(".card")[0].dispatch("click");
  assert.equal(elements.details.querySelectorAll(".media-section").length, 1);
  const image = elements.details.querySelectorAll("img")[0];
  assert.equal(image.alt, "Synthetic educational diagram");
  assert.equal(image.loading, "lazy");
  assert.equal(image.width, 1200);
  const fallback = elements.details.querySelectorAll(".media-unavailable")[0];
  assert.equal(fallback.hidden, true);
  image.dispatch("error");
  assert.equal(image.hidden, true);
  assert.equal(fallback.hidden, false);
  const source = elements.details.querySelectorAll("a").find(link => link.href === "https://example.org/media");
  assert.equal(source.target, "_blank");
  assert.equal(source.rel, "noopener noreferrer");
  assert.match(textOf(elements.details), /License: Project-owned/);
  assert.match(textOf(elements.details), /Patient-identifiable content: No/);
  assert.match(textOf(elements.details), /Media review: Clinical review pending/);
});

test("unreviewed details use a compact pending badge and collapsed review disclosure", () => {
  const { elements } = createHarness();
  const pendingCard = [...elements.cards.querySelectorAll(".card")].find(card => /Cutaneous Melanoma/.test(textOf(card)));
  pendingCard.dispatch("click");
  assert.match(textOf(elements.details), /Clinical review pending/);
  assert.match(textOf(elements.details), /This article has not yet completed human physician review/);
  assert.doesNotMatch(textOf(elements.details), /Reviewed:/);
  const disclosures = elements.details.querySelectorAll(".public-review-panel");
  assert.equal(disclosures.length, 1);
  assert.equal(disclosures[0].getAttribute("open"), undefined);
  assert.match(textOf(disclosures[0]), /Review details/);
  assert.match(textOf(elements.details), /Article review status/);
  assert.match(textOf(elements.details), /No valid human approval is bound to this exact content version/);
  assert.match(textOf(elements.details), /No physician review has been recorded yet/);
  assert.doesNotMatch(textOf(elements.details), /Public review history \(0\)/);
  assert.match(textOf(elements.details), /Content integrity ID\s+sha256-v1:[0-9a-f]+…[0-9a-f]{8}/);
  assert.match(textOf(elements.details), /Used to ensure that physician approval applies to this exact content version/);
  assert.match(textOf(elements.details), /View technical review data \(JSON\)/);
  assert.doesNotMatch(textOf(elements.details), /Awaiting review/);
});

test("synthetic reviewed details show physician specialty and date and preserve focus", () => {
  const { fingerprint } = require("../scripts/clinical-review");
  const { document, elements } = createHarness(data => {
    const record = JSON.parse(JSON.stringify(data.diseases[0]));
    record.id = "synthetic"; record.name = "Synthetic reviewed record";
    record.reviewStatus = "clinician reviewed";
    record.clinicalReview = { reviewedAt: "2026-01-15", reviewerRole: "physician", reviewerSpecialty: "dermatology", reviewedContentHash: fingerprint(record) };
    return { ...data, diseases: [record] };
  });
  const card = elements.cards.querySelectorAll(".card")[0]; card.dispatch("click");
  assert.match(textOf(elements.details), /Reviewed by a physician in dermatology/);
  assert.match(textOf(elements.details), /Reviewed: 2026-01-15/);
  assert.doesNotMatch(textOf(elements.details), /sha256-v1:/);
  elements.details.dispatch("keydown", { key: "Escape" });
  assert.equal(document.activeElement, card);
});

test("opening a condition respects reduced motion and legacy focus options", () => {
  const reduced = createHarness(undefined, undefined, "https://example.test/Docutis/", {
    matchMedia(query) { return { matches: query === "(prefers-reduced-motion: reduce)", media: query }; }
  });
  reduced.elements.cards.querySelectorAll(".card")[0].dispatch("click");
  assert.equal(reduced.elements.details.hidden, false);
  assert.equal(reduced.elements.details.scrollIntoViewOptions.behavior, "auto");
  assert.equal(reduced.elements.details.scrollIntoViewOptions.block, "start");

  const smooth = createHarness();
  smooth.elements.cards.querySelectorAll(".card")[0].dispatch("click");
  assert.equal(smooth.elements.details.scrollIntoViewOptions.behavior, "smooth");
  assert.equal(smooth.elements.details.scrollIntoViewOptions.block, "start");

  const legacy = createHarness();
  legacy.document.focusThrowsOnOptions = true;
  legacy.elements.cards.querySelectorAll(".card")[0].dispatch("click");
  assert.equal(legacy.elements.details.hidden, false);
  assert.equal(legacy.document.activeElement, legacy.elements.details);
  assert.equal(legacy.elements.details.scrollIntoViewCalls, 1);
  assert.ok(legacy.elements.details.focusCalls.some(args => args.length === 0));
});

test("actinic keratosis and basal cell carcinoma expose per-asset learning paths", () => {
  const { elements, window } = createHarness();
  const card = name => elements.cards.querySelectorAll(".card").find(item => textOf(item).includes(name));

  card("Actinic Keratosis").dispatch("click");
  const akPath = elements.details.querySelectorAll(".learning-path")[0];
  const ak = textOf(akPath);
  assert.match(ak, /Learning path/);
  assert.match(ak, /does not review the schematic, quiz, follow-up protocol or case/);
  assert.match(ak, /No original schematic is published for this record/);
  assert.match(ak, /persistently thickened, tender or concerning for invasion/);
  assert.match(ak, /No German follow-up protocol is published for this record/);
  assert.match(ak, /Field change on the dorsum of the hand/);
  assert.match(ak, /Clinician reviewed/);
  assert.match(ak, /Clinical review pending/);
  assert.doesNotMatch(ak, /Actinic keratoses \/ field cancerization/);
  assert.doesNotMatch(ak, /Pigmented actinic keratosis/);
  assert.doesNotMatch(ak, /Biopsy or specialist assessment/);
  let openedQuiz = null;
  window.DOCUTIS_QUIZ_APP = { openQuestion(id) { openedQuiz = id; return true; } };
  akPath.querySelectorAll(".learning-path-link").find(link => link.getAttribute("data-learning-kind") === "quiz").dispatch("click");
  assert.equal(openedQuiz, "ak-biopsy");

  card("Basal Cell Carcinoma").dispatch("click");
  const bccPath = elements.details.querySelectorAll(".learning-path")[0];
  const bcc = textOf(bccPath);
  assert.match(bcc, /Basal cell carcinoma morphology and dermoscopic clues/);
  assert.match(bcc, /On this dermoscopic photograph, which vessel pattern is most clearly represented/);
  assert.match(bcc, /Germany follow-up/);
  const links = bccPath.querySelectorAll(".learning-path-link");
  const caseLinks = links.filter(link => link.getAttribute("data-learning-kind") === "case");
  const bccCases = window.DOCUTIS_CASES.cases.filter(item => item.diseaseId === "basal-cell-carcinoma");
  assert.equal(caseLinks.length, bccCases.length);
  for (const item of bccCases) {
    const link = caseLinks.find(entry => entry.getAttribute("data-asset-id") === item.id);
    assert.equal(link.textContent, item.title);
    assert.notEqual(link.textContent, item.diagnosisLabel);
  }
  assert.ok(bccPath.querySelectorAll(".is-reviewed").length >= 3);
  assert.ok(bccPath.querySelectorAll(".is-pending").length >= 2);
  let openedCase = null;
  let openedProtocol = null;
  window.DOCUTIS_CASE_APP = { openCase(id) { openedCase = id; return true; } };
  window.DOCUTIS_FOLLOW_UP_APP = { openProtocol(id) { openedProtocol = id; return true; } };
  links.find(link => link.getAttribute("data-learning-kind") === "case").dispatch("click");
  links.find(link => link.getAttribute("data-learning-kind") === "follow-up").dispatch("click");
  assert.equal(openedCase, "case-bcc-nodular-dermoscopy");
  assert.equal(openedProtocol, "basal-cell-carcinoma-de");

  card("Plaque Psoriasis").dispatch("click");
  assert.equal(elements.details.querySelectorAll(".learning-path").length, 0);

  card("Cutaneous Squamous Cell Carcinoma").dispatch("click");
  const sccText = textOf(elements.details.querySelectorAll(".learning-path")[0]);
  assert.match(sccText, /Start guided cases/);
  assert.doesNotMatch(sccText, /Start guided cases \(/);
  assert.doesNotMatch(sccText, /No pilot case is published/);
  assert.doesNotMatch(sccText, /Two neighboring lesions on the upper back/);

  let openedPathway = null;
  window.DOCUTIS_CASE_APP = {
    pathwayFor(id) { return id === "cutaneous-melanoma" ? { id, title: "Melanoma and its mimics", count: 5 } : { id, title: "Guided series", count: 3 }; },
    openPathway(id) { openedPathway = id; return true; }
  };
  card("Cutaneous Melanoma").dispatch("click");
  const melanomaPath = elements.details.querySelectorAll(".learning-path")[0];
  const melanomaText = textOf(melanomaPath);
  assert.match(melanomaText, /Start guided cases \(5\)/);
  assert.match(melanomaText, /full case library stays under Clinical cases/);
  assert.match(melanomaText, /Every guided case remains clinician review required/);
  assert.doesNotMatch(melanomaText, /Large plantar pigmented macule/);
  assert.equal(melanomaPath.querySelectorAll(".learning-path-link").filter(link => link.getAttribute("data-learning-kind") === "case").length, 0);
  melanomaPath.querySelectorAll(".learning-path-launch")[0].dispatch("click");
  assert.equal(openedPathway, "cutaneous-melanoma");

  card("Squamous Cell Carcinoma in Situ").dispatch("click");
  const bowenText = textOf(elements.details.querySelectorAll(".learning-path")[0]);
  assert.match(bowenText, /Start guided cases \(3\)/);
  assert.doesNotMatch(bowenText, /An oval pink plaque with central crust/);
});
