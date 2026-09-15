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

function createHarness() {
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

test("initial rendering creates all cards and four category sections", () => {
  const { elements } = createHarness();
  assert.equal(elements.cards.querySelectorAll(".card").length, 26);
  assert.ok(elements.cards.querySelectorAll(".card").every(card => card.tagName === "BUTTON" && card.type === "button"));
  assert.equal(elements.cards.querySelectorAll(".category-section").length, 4);
  assert.equal(elements.categoryFilters.querySelectorAll("button").length, 5);
  assert.ok(elements.categoryFilters.querySelectorAll("button").every(button => button.type === "button"));
  assert.match(elements.resultStatus.textContent, /26 conditions shown/);
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
});

test("category filters preserve every broad grouping", () => {
  const { elements } = createHarness();
  const expectedCounts = { premalignant: 3, keratinocytic: 4, melanocytic: 6, other: 13 };
  for (const [category, expected] of Object.entries(expectedCounts)) {
    const button = elements.categoryFilters.querySelectorAll("button").find(item => item.dataset.category === category);
    button.dispatch("click");
    assert.equal(elements.cards.querySelectorAll(".card").length, expected);
    assert.equal(button.getAttribute("aria-pressed"), "true");
  }
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
