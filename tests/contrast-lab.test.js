"use strict";
const test = require("node:test"), assert = require("node:assert/strict"), fs = require("node:fs"), path = require("node:path"), vm = require("node:vm"), crypto = require("node:crypto");
const root = path.join(__dirname, "..");
function load(context, app = false) {
  for (const name of ["case-data.js", "early-clue-data.js", "contrast-lab-media.js", "contrast-lab-data.js", ...(app ? ["contrast-lab-app.js"] : [])]) vm.runInNewContext(fs.readFileSync(path.join(root, name), "utf8"), context, { filename: name });
}
test("six comparisons preserve source confirmation, limits and legal editorial review regions", () => {
  const context = { window: {} }; load(context);
  const lessons = context.window.DOCUTIS_CONTRAST_LAB;
  assert.equal(lessons.length, 6);
  assert.equal(new Set(lessons.flatMap(item => item.cases).filter(id => id.startsWith("contrast-new"))).size, 2);
  for (const lesson of lessons) {
    assert.equal(lesson.reviewStatus, "clinician review required"); assert.equal(lesson.clinicalReview, null);
    for (const side of lesson.sides) {
      assert.equal(side.confirmationMethod, "histopathology"); assert.equal(side.reviewStatus, "clinician review required");
      for (const key of ["label", "evidence", "observation"]) assert.ok(side[key].en && side[key].tr);
      assert.ok(fs.existsSync(path.join(root, side.image.src))); assert.ok(side.image.license && side.image.licenseUrl && side.image.creator);
      assert.match(side.source, /^https:\/\/doi.org\//); assert.ok(side.originalConfirmation);
      const [x, y, w, h] = side.region; assert.ok(x >= 0 && y >= 0 && w > 0 && h > 0 && x + w <= 1 && y + h <= 1);
    }
  }
  assert.match(lessons[3].sides[0].evidence.en, /3 mm.*4 mm.*unresolved/);
  assert.match(lessons[4].sides[0].evidence.en, /study-level/);
  assert.match(lessons[5].sides[0].evidence.en, /probable/);
});
test("new MIS source panels have matching manifest hashes and reproducible crops", () => {
  const context = { window: {} }; load(context);
  const rows = JSON.parse(fs.readFileSync(path.join(root, "contrast-lab-media.json"), "utf8"));
  assert.equal(JSON.stringify(rows), JSON.stringify(context.window.DOCUTIS_CONTRAST_MEDIA));
  for (const row of rows) {
    assert.equal(crypto.createHash("sha256").update(fs.readFileSync(path.join(root, row.src))).digest("hex"), row.sha256);
    assert.equal(row.crop[2] - row.crop[0], row.dimensions.width); assert.equal(row.crop[3] - row.crop[1], row.dimensions.height);
    assert.ok(row.crop[2] <= row.sourceDimensions[0] && row.crop[3] <= row.sourceDimensions[1]);
    assert.match(row.sourceSha256, /^[a-f0-9]{64}$/);
  }
});
class Element {
  constructor(tag) { this.tagName = tag.toUpperCase(); this.children = []; this.listeners = {}; this.style = {}; this._text = ""; this.value = ""; this.disabled = false; }
  set textContent(value) { this._text = String(value); this.children = []; }
  get textContent() { return this._text + this.children.map(child => child.textContent).join(" "); }
  appendChild(child) { this.children.push(child); child.parent = this; return child; }
  replaceChildren() { this.children = []; this._text = ""; }
  remove() { this.parent.children = this.parent.children.filter(child => child !== this); }
  addEventListener(type, callback) { (this.listeners[type] ||= []).push(callback); }
  dispatch(type) { (this.listeners[type] || []).forEach(callback => callback({ target: this })); }
  setAttribute(key, value) { this[key] = value; }
  focus() { this.focused = true; }
  querySelectorAll(selector) { const all = []; const visit = p => p.children.forEach(child => { if (child.tagName === selector.toUpperCase() || (child.className || "").split(" ").includes(selector.slice(1))) all.push(child); visit(child); }); visit(this); return all; }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
}
function harness(stored = null, failStorage = false, reverse = false) {
  const app = new Element("div"), language = new Element("select"), store = new Map(stored ? [["docutis-contrast-lab-revisit-v1", stored]] : []);
  const localStorage = { getItem: key => store.get(key), setItem: (key, value) => { if (failStorage) throw Error("blocked"); store.set(key, value); }, removeItem: key => store.delete(key) };
  const math = Object.create(Math); math.random = () => reverse ? 0 : .999;
  const context = { Math: math, window: { localStorage }, document: { readyState: "complete", documentElement: { lang: "en" }, createElement: tag => new Element(tag), getElementById: id => id === "contrastLabApp" ? app : id === "docutisLanguage" ? language : null } };
  load(context, true);
  const button = part => app.querySelectorAll("button").find(el => el.textContent.includes(part));
  const click = part => { const el = button(part); assert.ok(el, part); assert.equal(el.disabled, false, part); el.dispatch("click"); };
  const choose = (label, value) => { const el = app.querySelectorAll("select").find(el => el["aria-label"] === label); assert.ok(el, label); assert.equal(el.disabled, false, label); el.value = value; el.dispatch("change"); };
  return { app, context, store, language, button, click, choose };
}
function observe(h, uncertain = false) {
  for (const letter of ["A", "B"]) { h.choose("Finding " + letter, "white"); h.choose("Visibility " + letter, uncertain ? "uncertain" : "possible"); if (!uncertain) h.choose("Region " + letter, "5"); }
  h.choose("Which needs closer assessment, and where did the clue change your impression?", "both");
}
test("choices gate diagnosis and zooms; uncertain observations never acquire a made-up region", () => {
  const h = harness(); h.click("Start six");
  const first = h.context.window.DOCUTIS_CONTRAST_LAB[0];
  assert.ok(!h.app.textContent.includes(first.sides[0].label.en)); assert.equal(h.app.querySelectorAll(".contrast-zoom").length, 0);
  assert.equal(h.button("Reveal and").disabled, true); observe(h, true); h.click("Reveal and");
  assert.ok(h.app.textContent.includes(first.sides[0].label.en)); assert.equal(h.app.querySelectorAll(".contrast-zoom").length, 2);
  assert.ok(h.app.textContent.includes("no region is inferred")); assert.equal(h.button("Save reflection").disabled, true);
  assert.ok(h.app.querySelectorAll("select").filter(el => el["aria-label"].startsWith("Finding")).every(el => el.disabled));
  h.choose("What will you revisit?", "quality"); h.click("Save reflection");
  assert.ok(h.app.textContent.includes("2 / 6")); assert.equal(h.store.size, 0);
});
test("language changes preserve choices and selected/source crops; reflection drives an opt-in revisit list", () => {
  const h = harness(); const checkbox = h.app.querySelector("input"); checkbox.checked = true; checkbox.dispatch("change"); h.click("Start six"); observe(h);
  h.context.document.documentElement.lang = "tr"; h.language.dispatch("change");
  assert.equal(h.app.querySelectorAll("select").find(el => el["aria-label"] === "Bölge A").value, "5");
  h.context.document.documentElement.lang = "en"; h.language.dispatch("change"); h.click("Reveal and");
  assert.equal(h.app.querySelectorAll(".contrast-zoom").length, 4);
  h.choose("What will you revisit?", "weight"); h.click("Save reflection");
  const stored = JSON.parse(h.store.get("docutis-contrast-lab-revisit-v1")); assert.deepEqual(stored.ids, ["contrast-01"]); assert.deepEqual(Object.keys(stored).sort(), ["ids", "version"]);
  const resumed = harness(JSON.stringify(stored)); resumed.click("Practise my revisit"); assert.ok(resumed.app.textContent.includes("1 / 1"));
});
test("pair order and side placement can reverse, and invalid or blocked storage does not break practice", () => {
  const h = harness('{"version":1,"ids":["unknown","contrast-01","contrast-01"]}', true, true);
  h.click("Practise my revisit");
  const asset = h.app.querySelector("img").src;
  assert.equal(asset, "assets/media/cases/case-54-dermoscopy.jpg");
  observe(h); h.click("Reveal and"); h.choose("What will you revisit?", "quality"); h.click("Save reflection");
  assert.ok(h.app.textContent.includes("Browser storage unavailable")); assert.ok(h.button("Repeat my revisit"));
  const corrupted = harness("bad-json"); assert.ok(corrupted.button("Start six"));
});
