"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const crypto = require("node:crypto");
const root = path.join(__dirname, "..");
function load(context, app = false) {
  for (const file of ["case-data.js", "pink-media.js", "pink-case-data.js", ...(app ? ["pink-case-app.js"] : [])]) vm.runInNewContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
}
test("twelve unique matched cases retain histology evidence, review limits and per-image attribution", () => {
  const context = { window: {} }; load(context);
  const cases = context.window.DOCUTIS_PINK_CASES;
  assert.equal(cases.length, 12); assert.equal(new Set(cases.map(item => item.id)).size, 12);
  assert.equal(cases.filter(item => item.diagnosis === "melanoma").length, 6);
  assert.equal(cases.filter(item => item.existing).length, 4);
  for (const item of cases) {
    assert.equal(item.confirmationMethod, "histopathology");
    assert.equal(item.reviewStatus, "clinician review required"); assert.equal(item.clinicalReview, null);
    assert.ok(item.pairingEvidence && item.source.startsWith("https://doi.org/"));
    for (const key of ["label", "history", "evidence", "findings", "limit"]) assert.ok(item[key].en && item[key].tr, item.id + key);
    assert.equal(item.images.length, 2);
    assert.deepEqual(Array.from(item.images, image => image.type).sort(), ["clinical", "dermoscopy"]);
    for (const image of item.images) {
      assert.ok(fs.existsSync(path.join(root, image.src))); assert.ok(image.width && image.height && image.credit && image.license && image.licenseUrl);
    }
  }
  assert.match(cases.find(item => item.id === "pink-01").evidence.en, /metastasis.*advanced/s);
  assert.match(cases.find(item => item.id === "pink-05").evidence.en, /0.42 mm/);
  assert.match(cases.find(item => item.id === "pink-05").limit.en, /context only/);
});
test("new asset manifest matches runtime data and exact file hashes with reproducible crops", () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, "pink-media.json"), "utf8"));
  const context = { window: {} }; load(context);
  assert.equal(JSON.stringify(manifest.assets), JSON.stringify(context.window.DOCUTIS_PINK_MEDIA));
  assert.equal(manifest.assets.length, 16);
  for (const asset of manifest.assets) {
    assert.equal(crypto.createHash("sha256").update(fs.readFileSync(path.join(root, asset.src))).digest("hex"), asset.sha256, asset.src);
    assert.match(asset.sourceSha256, /^[a-f0-9]{64}$/); assert.ok(asset.sourceUrl.startsWith("https://"));
    if (asset.crop) { const [l, t, r, b] = asset.crop; assert.equal(r - l, asset.width); assert.equal(b - t, asset.height); assert.ok(r <= asset.sourceDimensions[0] && b <= asset.sourceDimensions[1]); }
  }
});
class Element {
  constructor(tag) { this.tagName = tag.toUpperCase(); this.children = []; this.listeners = {}; this.dataset = {}; this.style = {}; this._text = ""; this.disabled = false; this.hidden = false; this.value = ""; }
  set textContent(value) { this._text = String(value); this.children = []; }
  get textContent() { return this._text + this.children.map(child => child.textContent).join(" "); }
  appendChild(child) { this.children.push(child); return child; }
  replaceChildren() { this.children = []; this._text = ""; }
  setAttribute(key, value) { this[key] = value; }
  addEventListener(type, callback) { (this.listeners[type] ||= []).push(callback); }
  dispatch(type) { (this.listeners[type] || []).forEach(callback => callback({ target: this })); }
  focus() { this.focused = true; }
  querySelectorAll(selector) { const all = []; const visit = parent => parent.children.forEach(child => { if (child.tagName === selector.toUpperCase() || child.className === selector.slice(1)) all.push(child); visit(child); }); visit(this); return all; }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
}
function harness(loading = false) {
  const app = new Element("div"), language = new Element("select");
  const context = { window: {}, document: { readyState: loading ? "loading" : "complete", readyCallbacks: [], addEventListener(type, callback) { if (type === "DOMContentLoaded") this.readyCallbacks.push(callback); }, documentElement: { lang: "en" }, createElement: tag => new Element(tag), getElementById: id => id === "pinkCaseApp" ? app : id === "docutisLanguage" ? language : null } };
  load(context, true);
  const button = part => app.querySelectorAll("button").find(item => item.textContent.includes(part));
  const choose = (key, value) => { const select = app.querySelectorAll("select").find(item => item.dataset.answer === key); assert.ok(select, key); select.value = value; select.dispatch("change"); };
  const click = part => { const target = button(part); assert.ok(target, part); assert.equal(target.disabled, false, part); target.dispatch("click"); };
  return { app, context, language, button, choose, click };
}
test("all case phases gate evidence, preserve uncertainty and support repeat without text input", () => {
  const h = harness(); h.click("Start shuffled");
  for (let i = 0; i < 12; i++) {
    assert.equal(h.button("Save observations").disabled, true);
    assert.equal(h.app.querySelectorAll("input").length, 0);
    const cases = h.context.window.DOCUTIS_PINK_CASES;
    for (const item of cases) { assert.ok(!h.app.textContent.includes(item.history.en)); assert.ok(!h.app.textContent.includes(item.evidence.en)); }
    for (const key of ["vessels", "white", "pink", "pigment", "visibility"]) h.choose(key, "unassessable");
    assert.equal(h.app.querySelector(".pink-marker").hidden, true);
    h.click("Save observations");
    assert.equal(h.button("open history").disabled, true);
    h.choose("before", "other"); h.choose("confidenceBefore", "low"); h.click("open history");
    assert.ok(cases.some(item => h.app.textContent.includes(item.history.en)));
    for (const item of cases) assert.ok(!h.app.textContent.includes(item.evidence.en));
    assert.equal(h.button("Reveal source").disabled, true);
    h.choose("after", "other"); h.choose("confidenceAfter", "low"); h.choose("effect", "missing"); h.choose("nextStep", "uncertain"); h.click("Reveal source");
    assert.ok(cases.some(item => h.app.textContent.includes(item.evidence.en)));
    assert.ok(h.app.textContent.includes("You recorded uncertainty"));
    assert.equal(h.button("Save reflection").disabled, true);
    h.choose("reflection", "quality"); h.click("Save reflection");
  }
  assert.ok(h.app.textContent.includes("Session reflection")); assert.ok(h.button("Repeat uncertain"));
  h.click("Repeat uncertain"); assert.ok(h.app.textContent.includes("1 / 12"));
});
test("location selection marks the dermoscopic image and language changes keep answers and phase", () => {
  const h = harness(); h.click("Start shuffled");
  for (const key of ["vessels", "white", "pink", "pigment"]) h.choose(key, "unassessable");
  h.choose("visibility", "possible"); assert.equal(h.button("Save observations").disabled, true);
  h.choose("location", "9"); assert.equal(h.app.querySelector(".pink-marker").hidden, false); assert.ok(parseFloat(h.app.querySelector(".pink-marker").style.left) > 80);
  h.context.document.documentElement.lang = "tr"; h.language.dispatch("change");
  assert.ok(h.app.textContent.includes("Nesnel yapılar"));
  assert.equal(h.app.querySelectorAll("select").find(item => item.dataset.answer === "location").value, "9");
  h.click("Gözlemleri kaydet"); assert.ok(h.app.textContent.includes("Öykü öncesi"));
});

test("initialization waits for locale startup and registers its change listener afterwards", () => {
  const h = harness(true);
  assert.equal(h.app.textContent, "");
  assert.equal(h.language.listeners.change, undefined);
  h.context.document.documentElement.lang = "tr";
  h.context.document.readyCallbacks.forEach(callback => callback());
  assert.ok(h.app.textContent.includes("Pembe lezyonlar"));
  h.language.listeners.change.unshift(() => { h.context.document.documentElement.lang = "en"; });
  h.language.dispatch("change");
  assert.ok(h.app.textContent.includes("Pink lesions"));
});
