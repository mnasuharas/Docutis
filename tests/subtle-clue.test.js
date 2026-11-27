"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.join(__dirname, "..");

test("contrast lessons use the existing case images and preserve source verification limits", () => {
  const context = { window: {} };
  for (const name of ["case-data.js", "subtle-clue-data.js"]) {
    vm.runInNewContext(fs.readFileSync(path.join(root, name), "utf8"), context, { filename: name });
  }
  const cases = new Map(context.window.DOCUTIS_CASES.cases.map(item => [item.id, item]));
  const lessons = context.window.DOCUTIS_SUBTLE_CLUES;
  assert.equal(lessons.length, 5);
  for (const lesson of lessons) {
    assert.equal(lesson.cases.length, 2);
    assert.equal(lesson.expected.length, 2);
    assert.ok(lesson.title.en && lesson.title.tr && lesson.comparison.en && lesson.comparison.tr);
    for (const [index, id] of lesson.cases.entries()) {
      const item = cases.get(id);
      assert.ok(item, id);
      assert.ok(item.images.some(image => image.type === "clinical"), id);
      assert.ok(item.images.every(image => image.src && image.sourceUrl && image.license), id);
      assert.ok(item.diagnosticGroundTruth.confirmationMethod, id);
      assert.ok(lesson.options[lesson.expected[index]], id);
    }
  }
  assert.equal(cases.get("case-g25-01").diagnosticGroundTruth.confirmationMethod, "histopathology");
  assert.equal(cases.get("case-g25-02").diagnosticGroundTruth.confirmationMethod, "histopathology");
  assert.equal(cases.get("case-g27-04").diagnosticGroundTruth.confirmationMethod, "histopathology");
  assert.equal(cases.get("case-g27-03").diagnosticGroundTruth.confirmationMethod, "histopathology");
  assert.equal(cases.get("case-g25-05").diagnosticGroundTruth.histopathologySource, "article_methods");
  assert.notEqual(cases.get("case-g21-08").diagnosticGroundTruth.confirmationMethod, "histopathology");
  assert.ok(!cases.get("case-g18-15").images.some(image => image.type === "dermoscopy"));
});

test("subtle-clue lesson is wired after the case library and offers a keyboard-accessible reveal", () => {
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const app = fs.readFileSync(path.join(root, "subtle-clue-app.js"), "utf8");
  assert.ok(html.indexOf("case-data.js") < html.indexOf("subtle-clue-data.js"));
  assert.ok(html.indexOf("subtle-clue-data.js") < html.indexOf("subtle-clue-app.js"));
  assert.match(html, /id="subtleClueApp"/);
  assert.match(app, /radio\.type = "radio"/);
  assert.match(app, /reveal\.disabled = !ready\(\)/);
  assert.match(app, /answer\.visibility === "unassessable" \|\| answer\.position/);
  assert.match(app, /root\.querySelector\("\.subtle-comparison"\)\.focus\(\)/);
});

test("observation, visibility and location must be selected before source diagnosis appears", () => {
  class Element {
    constructor(tag) {
      this.tagName = tag.toUpperCase();
      this.children = [];
      this.listeners = {};
      this.dataset = {};
      this.style = {};
      this.className = "";
      this._text = "";
      this.value = "";
      this.disabled = false;
      this.classList = { add: name => { this.className += " " + name; } };
    }
    set textContent(value) { this.children = []; this._text = String(value); }
    get textContent() { return this._text + this.children.map(item => item.textContent).join(""); }
    appendChild(child) { this.children.push(child); child.parentNode = this; return child; }
    replaceChildren(...children) { this.children = []; children.forEach(child => this.appendChild(child)); }
    addEventListener(type, handler) { (this.listeners[type] ||= []).push(handler); }
    dispatch(type, extra = {}) { (this.listeners[type] || []).forEach(handler => handler({ target: this, ...extra })); }
    setAttribute(name, value) { this[name] = String(value); }
    getBoundingClientRect() { return { left: 0, top: 0, width: 100, height: 100 }; }
    focus() {}
    matches(selector) {
      if (selector === ".subtle-image-frame img") return this.tagName === "IMG" && this.parentNode?.matches(".subtle-image-frame");
      if (selector.startsWith(".")) return this.className.split(" ").includes(selector.slice(1));
      if (selector.startsWith("#")) return this.id === selector.slice(1);
      if (selector === 'a[href="#subtleClueModule"]') return this.tagName === "A" && this.href === "#subtleClueModule";
      if (selector === "input[type=radio]") return this.tagName === "INPUT" && this.type === "radio";
      return this.tagName === selector.toUpperCase();
    }
    querySelectorAll(selector) {
      const found = [];
      function walk(node) {
        node.children.forEach(child => {
          if (child.matches(selector)) found.push(child);
          walk(child);
        });
      }
      walk(this);
      return found;
    }
    querySelector(selector) {
      if (selector === ":scope > p") return this.children.find(child => child.tagName === "P");
      return this.querySelectorAll(selector)[0] || null;
    }
  }
  const make = (tag, parent, className, id) => {
    const item = new Element(tag);
    item.className = className || "";
    item.id = id || "";
    parent.appendChild(item);
    return item;
  };
  const body = new Element("body");
  const module = make("section", body, "", "subtleClueModule");
  make("p", module, "eyebrow");
  make("h2", module, "", "subtleClueTitle");
  make("span", module, "module-badge");
  make("p", module);
  const rootNode = make("div", module, "", "subtleClueApp");
  const control = make("select", body, "", "docutisLanguage");
  const hero = make("a", body);
  hero.href = "#subtleClueModule";
  const document = {
    body,
    documentElement: { lang: "en" },
    createElement: tag => new Element(tag),
    createTextNode: value => { const item = new Element("#text"); item.textContent = value; return item; },
    getElementById: id => body.querySelector("#" + id),
    querySelector: selector => body.querySelector(selector)
  };
  const context = { window: {}, document, Map };
  for (const name of ["case-data.js", "subtle-clue-data.js", "subtle-clue-app.js"]) {
    vm.runInNewContext(fs.readFileSync(path.join(root, name), "utf8"), context, { filename: name });
  }
  const panels = () => rootNode.querySelectorAll(".subtle-panel");
  const reveal = () => rootNode.querySelector(".subtle-reveal-button");
  assert.equal(panels().length, 1);
  assert.equal(rootNode.querySelectorAll(".subtle-answer").length, 0);
  assert.equal(reveal().disabled, true);
  for (const panel of panels()) {
    const radio = panel.querySelector("input[type=radio]");
    radio.dispatch("change");
    const select = panel.querySelectorAll("select");
    select[0].value = "clear";
    select[0].dispatch("change");
  }
  assert.equal(reveal().disabled, true);
  panels()[0].querySelectorAll("select")[1].value = "4";
  panels()[0].querySelectorAll("select")[1].dispatch("change");
  assert.equal(reveal().disabled, false);
  reveal().dispatch("click");
  assert.equal(panels().length, 2);
  assert.equal(rootNode.querySelectorAll(".subtle-answer").length, 0);
  panels()[1].querySelector("input[type=radio]").dispatch("change");
  const visibility = panels()[1].querySelectorAll("select")[0];
  visibility.value = "clear"; visibility.dispatch("change");
  const photo = panels()[1].querySelector(".subtle-markable");
  photo.dispatch("click", { clientX: 40, clientY: 60 });
  assert.equal(reveal().disabled, false);
  reveal().dispatch("click");
  assert.equal(rootNode.querySelectorAll(".subtle-answer").length, 2);
  document.documentElement.lang = "tr";
  control.dispatch("change");
  assert.match(rootNode.textContent, /Görülebilirlik seçiminiz/);
});
