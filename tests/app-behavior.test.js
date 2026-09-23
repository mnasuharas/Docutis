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
  dispatch(type, extra = {}) { for (const listener of this.listeners[type] || []) listener({ type, key: extra.key, target: this }); }
  focus() { this.ownerDocument.activeElement = this; }
  scrollIntoView() {}
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

function createHarness(transformData, transformMedia, initialHref = "https://example.test/Docutis/") {
  const document = {
    activeElement: null,
    elements: {},
    listeners: {},
    createElement(tagName) { return new Element(tagName, document); },
    getElementById(id) { return document.elements[id]; },
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
  const context = { window, document, URL };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "clinical-schema.js"), "utf8"), context);
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "data.js"), "utf8"), context);
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "media-data.js"), "utf8"), context);
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "followup-data.js"), "utf8"), context);
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "review-status.js"), "utf8"), context);
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "oss-feedback.js"), "utf8"), context);
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "review-ui.js"), "utf8"), context);
  if (transformData) context.window.DOCUTIS_DATA = transformData(context.window.DOCUTIS_DATA);
  if (transformMedia) context.window.DOCUTIS_MEDIA = transformMedia(context.window.DOCUTIS_MEDIA);
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

test("initial rendering creates all cards and eight category sections", () => {
  const { elements } = createHarness();
  assert.equal(elements.cards.querySelectorAll(".card").length, 50);
  assert.ok(elements.cards.querySelectorAll(".card").every(card => card.tagName === "BUTTON" && card.type === "button"));
  assert.equal(elements.cards.querySelectorAll(".category-section").length, 8);
  assert.equal(elements.categoryFilters.querySelectorAll("button").length, 9);
  assert.ok(elements.categoryFilters.querySelectorAll("button").every(button => button.type === "button"));
  assert.match(elements.resultStatus.textContent, /50 conditions shown/);
  assert.match(textOf(elements.libraryStats), /3\s+oncology follow-up protocols/);
  assert.match(textOf(elements.reviewDashboardCounts), /2\s+Clinician-reviewed records/);
  assert.match(textOf(elements.reviewDashboardCounts), /0\s+Partially reviewed records/);
  assert.match(textOf(elements.reviewDashboardCounts), /48\s+Records requiring clinician review/);
  assert.match(textOf(elements.reviewDashboardCounts), /0\/4\s+Reviewed visual items/);
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
    "infectious-infestation": 16
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
  assert.equal(invalid.elements.cards.querySelectorAll(".card").length, 50);
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
