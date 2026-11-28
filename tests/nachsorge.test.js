"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { followUpFingerprint, loadFollowUpData } = require("../scripts/clinical-review");

const root = path.join(__dirname, "..");
const originalIds = new Set(["cutaneous-melanoma-de", "basal-cell-carcinoma-de", "cutaneous-squamous-cell-carcinoma-de"]);

class Element {
  constructor(tag) {
    this.tagName = String(tag || "div").toUpperCase();
    this.children = [];
    this.parentElement = null;
    this.listeners = {};
    this.attrs = {};
    this.value = "";
    this.hidden = false;
    this.open = false;
    this.disabled = false;
    this.className = "";
    this.id = "";
    this.href = "";
    this.target = "";
    this.rel = "";
    this.placeholder = "";
    this._text = "";
  }
  set textContent(value) { this._text = String(value ?? ""); }
  get textContent() { return this._text; }
  appendChild(child) {
    if (child.parentElement) child.parentElement.children = child.parentElement.children.filter(item => item !== child);
    this.children.push(child);
    child.parentElement = this;
    return child;
  }
  insertBefore(child, ref) {
    if (child.parentElement) child.parentElement.children = child.parentElement.children.filter(item => item !== child);
    const index = this.children.indexOf(ref);
    this.children.splice(index < 0 ? this.children.length : index, 0, child);
    child.parentElement = this;
    return child;
  }
  replaceChildren() { this.children = []; this._text = ""; }
  setAttribute(name, value) { this.attrs[name] = String(value); }
  addEventListener(type, listener) { (this.listeners[type] ||= []).push(listener); }
  dispatch(type) { for (const listener of this.listeners[type] || []) listener({ type, target: this, preventDefault() {} }); }
}

function textOf(element) {
  return [element.textContent, ...element.children.map(textOf)].join(" ");
}

function load(url) {
  const elements = {};
  const ids = ["nachsorgeModule", "nachsorgeSearch", "nachsorgeDisease", "nachsorgeGroup", "nachsorgeResult", "nachsorgeStaging", "melanomaStaging", "melanomaStagingHome", "docutisLanguage", "followUpModule"];
  const body = new Element("body");
  body.dataset = {};
  for (const id of ids) {
    const el = new Element(id.includes("Search") ? "input" : id.includes("Disease") || id.includes("Group") || id.includes("Language") ? "select" : "div");
    el.id = id;
    elements[id] = el;
    body.appendChild(el);
  }
  elements.followUpModule.appendChild(elements.melanomaStaging);
  elements.followUpModule.appendChild(elements.melanomaStagingHome);
  const listeners = {};
  const win = {
    location: { href: url },
    history: { state: null, replaceState(state, title, href) { win.location.href = href; } },
    addEventListener(type, listener) { (listeners[type] ||= []).push(listener); },
    dispatch(type) { (listeners[type] || []).forEach(listener => listener()); },
    DOCUTIS_FOLLOW_UP_DATA: null,
    DOCUTIS_REVIEW_STATUS: null,
    DOCUTIS_REVIEW_UI: null
  };
  const document = {
    readyState: "complete",
    documentElement: { lang: "en" },
    body,
    getElementById: id => elements[id] || null,
    createElement: tag => new Element(tag),
    addEventListener() {}
  };
  const context = { window: win, document, URL, CustomEvent: undefined };
  vm.runInNewContext(fs.readFileSync(path.join(root, "followup-data.js"), "utf8"), context);
  vm.runInNewContext(fs.readFileSync(path.join(root, "review-status.js"), "utf8"), context);
  vm.runInNewContext(fs.readFileSync(path.join(root, "review-ui.js"), "utf8"), context);
  vm.runInNewContext(fs.readFileSync(path.join(root, "nachsorge-app.js"), "utf8"), context);
  return { elements, document, win, api: context.window.DOCUTIS_NACHSORGE };
}

function notesOf(protocol) {
  const notes = [...protocol.notes];
  for (const group of protocol.groups) {
    notes.push(group.description, ...group.notes);
    for (const section of group.contextSections || []) notes.push(section.title, section.text);
    for (const period of group.periods) {
      notes.push(...period.notes);
      for (const recommendation of period.recommendations) if (recommendation.note) notes.push(recommendation.note);
    }
  }
  return notes;
}

test("navigation exposes the bilingual Nachsorge tab and the draft disclaimer", () => {
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  assert.match(html, /id="nachsorgeModule"/);
  assert.match(html, /data-studio-nav="nachsorgeModule"/);
  assert.match(html, /data-en="Follow-up \(Nachsorge\)"/);
  assert.match(html, /data-tr="Tümör Takibi"/);
  assert.match(html, /Kılavuza göre tedavi sonrası takip</);
  assert.doesNotMatch(html, /data-tr="[^"]*Nachsorge|nachsorge-subtitle[^>]*>[^<]*Nachsorge/);
  assert.doesNotMatch(html, /Nachsorge \(Takip\)|Kontrol takibi/);
  assert.match(fs.readFileSync(path.join(root, "studio.js"), "utf8"), /Tümör Takibi/);
  assert.doesNotMatch(fs.readFileSync(path.join(root, "studio.js"), "utf8"), /Kontrol takibi/);
  assert.doesNotMatch(fs.readFileSync(path.join(root, "nachsorge-app.js"), "utf8"), /Nachsorge \(Takip\)/);
  assert.match(html, /Eğitim amaçlı taslak, hekim onayı bekliyor\. Güncel kılavuzu esas alın\./);
  assert.match(html, /src="nachsorge-app\.js/);
  assert.match(fs.readFileSync(path.join(root, "studio.js"), "utf8"), /searchParams\.has\("nachsorge"\)/);
});

test("deep link selects the diagnosis and language switch re-renders the same intervals", () => {
  const { elements, document, api } = load("https://example.org/Docutis/?nachsorge=cutaneous-melanoma");
  assert.equal(elements.nachsorgeDisease.value, "cutaneous-melanoma");
  assert.equal(elements.melanomaStaging.hidden, false);
  assert.equal(elements.melanomaStaging.open, true);
  assert.equal(elements.melanomaStaging.parentElement, elements.nachsorgeStaging);
  assert.match(textOf(elements.nachsorgeResult), /Cutaneous melanoma/);
  assert.match(textOf(elements.nachsorgeResult), /Educational draft pending physician review/);
  assert.ok(textOf(elements.nachsorgeResult).includes(api.DISCLAIMER_TR));
  document.documentElement.lang = "tr";
  elements.docutisLanguage.dispatch("change");
  const turkish = textOf(elements.nachsorgeResult);
  assert.match(turkish, /Kutanöz melanom/);
  assert.match(turkish, new RegExp(api.DISCLAIMER_TR.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.doesNotMatch(turkish, /Educational draft/);
  assert.equal(elements.nachsorgeDisease.value, "cutaneous-melanoma");
  document.documentElement.lang = "en";
  elements.docutisLanguage.dispatch("change");
  assert.match(textOf(elements.nachsorgeResult), /Educational draft pending physician review/);
  assert.match(textOf(elements.nachsorgeResult), /Cutaneous melanoma/);
});

test("browser back and forward resync the diagnosis from the nachsorge query", () => {
  const { elements, win } = load("https://example.org/Docutis/?nachsorge=cutaneous-melanoma");
  elements.nachsorgeDisease.value = "actinic-keratosis";
  elements.nachsorgeDisease.dispatch("change");
  assert.equal(elements.nachsorgeDisease.value, "actinic-keratosis");
  win.location.href = "https://example.org/Docutis/?nachsorge=merkel-cell-carcinoma#nachsorgeModule";
  win.dispatch("popstate");
  assert.equal(elements.nachsorgeDisease.value, "merkel-cell-carcinoma");
  assert.match(textOf(elements.nachsorgeResult), /Merkel cell carcinoma/);
  assert.doesNotMatch(textOf(elements.nachsorgeResult), /Actinic keratosis and field/);
});

test("entries without a guideline timetable show one notice, and reviewed BCC states both facts", () => {
  const { elements, document, api } = load("https://example.org/Docutis/?nachsorge=dermatofibrosarcoma-protuberans");
  document.documentElement.lang = "tr";
  elements.docutisLanguage.dispatch("change");
  const dfsp = textOf(elements.nachsorgeResult);
  assert.ok(dfsp.includes(api.NO_TIMETABLE_TR));
  assert.equal(dfsp.split("Belirtilmemiş").length - 1, 0);
  assert.match(dfsp, /22 Ağustos 2023/);
  assert.doesNotMatch(dfsp, /This S1 is in revision/);
  elements.nachsorgeDisease.value = "basal-cell-carcinoma";
  elements.nachsorgeDisease.dispatch("change");
  const bcc = textOf(elements.nachsorgeResult);
  assert.match(bcc, /BHK takip çizelgesi kaydı hekim tarafından incelendi/);
  assert.ok(bcc.includes(api.DISCLAIMER_TR));
});

test("search ignores Turkish diacritics and every catalog entry has a source", () => {
  const data = loadFollowUpData();
  const { elements, api } = load("https://example.org/Docutis/?nachsorge=high-risk-nevus");
  assert.match(textOf(elements.nachsorgeResult), /No year-by-year table is stated/);
  assert.match(textOf(elements.nachsorgeResult), /8\.1/);
  elements.nachsorgeSearch.value = "aktinik keratoz";
  elements.nachsorgeSearch.dispatch("input");
  assert.equal(elements.nachsorgeDisease.value, "actinic-keratosis");
  assert.match(textOf(elements.nachsorgeResult), /4\.10/);
  elements.nachsorgeSearch.value = "bazal hücre";
  elements.nachsorgeSearch.dispatch("input");
  assert.equal(elements.nachsorgeDisease.value, "basal-cell-carcinoma");
  for (const entry of api.catalog) {
    const protocol = data.protocols.find(item => item.id === entry.protocolId);
    const url = protocol?.guideline.sourceUrl || entry.sourceUrl;
    assert.match(url, /^https:\/\//, entry.id);
  }
});

test("new protocols are sourced drafts and interval tokens match in Turkish and English", () => {
  const data = loadFollowUpData();
  const { api } = load("https://example.org/Docutis/");
  assert.equal(followUpFingerprint(data.protocols.find(item => item.id === "basal-cell-carcinoma-de")), "sha256-v1:25cbf04b711b308ca456ab8b67a29bd056d3ccb69c0f404e285adaf8ab92c02e");
  const added = data.protocols.filter(item => !originalIds.has(item.id));
  assert.ok(added.length >= 4);
  for (const protocol of added) {
    assert.match(protocol.guideline.sourceUrl, /^https:\/\//, protocol.id);
    assert.ok(protocol.guideline.version.trim(), protocol.id);
    assert.ok(protocol.guideline.publishedAt.trim(), protocol.id);
    assert.equal(protocol.reviewStatus, "clinician review required");
    assert.equal(protocol.clinicalReview, null);
  }
  for (const protocol of data.protocols) {
    for (const note of [protocol.guideline.recommendationLocation, ...notesOf(protocol)]) {
      const turkish = api.noteText(note, "tr");
      assert.notEqual(turkish, note, note.slice(0, 90));
      assert.deepEqual(api.numericTokens(note), api.numericTokens(turkish), note.slice(0, 90));
    }
    for (const group of protocol.groups) {
      for (const period of group.periods) {
        for (const recommendation of period.recommendations) {
          if (!recommendation.frequency) continue;
          const english = api.frequencyText(recommendation.frequency, "en");
          const turkish = api.frequencyText(recommendation.frequency, "tr");
          assert.deepEqual(api.numericTokens(english), api.numericTokens(turkish), `${protocol.id} ${recommendation.modality}`);
          assert.ok(api.numericTokens(english).length);
        }
      }
    }
  }
  for (const item of api.pairedCopy()) assert.deepEqual(api.numericTokens(item.en), api.numericTokens(item.tr), item.en.slice(0, 90));
});

test("Turkish follow-up headings use title case and question punctuation", () => {
  const { document, elements } = load("https://docutis.test/?nachsorge=cutaneous-melanoma");
  document.documentElement.lang = "tr";
  elements.docutisLanguage.dispatch("change");
  const headings = elements.nachsorgeResult.children.filter(item => item.tagName === "H3").map(item => item.textContent);
  for (const title of ["Her Ziyarette Ne Yapılır?", "Görüntüleme ve Laboratuvar", "Kırmızı Bayraklar", "Hasta Eğitimi"]) {
    assert.ok(headings.includes(title), title);
  }
});
