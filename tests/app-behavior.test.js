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

function createHarness(transformData) {
  const document = {
    activeElement: null,
    elements: {},
    createElement(tagName) { return new Element(tagName, document); },
    getElementById(id) { return document.elements[id]; },
    contains(element) { return Boolean(element); }
  };
  for (const id of ["cards", "details", "categoryFilters", "noResult", "resultStatus", "searchInput"]) {
    document.elements[id] = new Element(id === "searchInput" ? "input" : "div", document);
  }
  document.elements.details.hidden = true;
  const context = { window: {}, document };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "data.js"), "utf8"), context);
  if (transformData) context.window.DOCUTIS_DATA = transformData(context.window.DOCUTIS_DATA);
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8"), context);
  return { document, elements: document.elements };
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
  assert.match(details, /Not applicable — this non-neoplastic condition is outside ICD-O oncology registry coding/);
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
  assert.match(details, /Not applicable — this non-neoplastic condition is outside ICD-O oncology registry coding/);
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
  for (const link of links) {
    assert.equal(link.target, "_blank");
    assert.equal(link.rel, "noopener noreferrer");
    assert.match(link.href, /^https:\/\//);
  }
  assert.ok(elements.details.querySelectorAll("button").some(button => button.textContent === "Close"));

  elements.details.dispatch("keydown", { key: "Escape" });
  assert.equal(elements.details.hidden, true);
  assert.equal(document.activeElement, card);
});

test("Close button hides details and restores focus", () => {
  const { document, elements } = createHarness();
  const card = elements.cards.querySelectorAll(".card")[0];
  card.dispatch("click");
  const close = elements.details.querySelectorAll("button").find(button => button.textContent === "Close");
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

test("unreviewed details explain human review without fabricated dates or fingerprints", () => {
  const { elements } = createHarness();
  elements.cards.querySelectorAll(".card")[0].dispatch("click");
  assert.match(textOf(elements.details), /Clinical review: Required/);
  assert.match(textOf(elements.details), /Automated tests and source metadata checks do not constitute clinical review/);
  assert.doesNotMatch(textOf(elements.details), /Reviewed:|sha256-v1:/);
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
