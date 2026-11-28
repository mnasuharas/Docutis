"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const base = path.join(__dirname, "..");
function read(name) { return fs.readFileSync(path.join(base, name), "utf8"); }

class Element {
  constructor(tag) { this.tag = tag; this.children = []; this.events = {}; this.style = {}; }
  appendChild(child) { this.children.push(child); }
  replaceChildren() { this.children = []; }
  setAttribute() {}
  addEventListener(name, handler) { this.events[name] = handler; }
  focus() { this.focused = true; }
  dispatch(name) { this.events[name]?.({ preventDefault() {} }); }
  findAll(tag) { return [...(this.tag === tag ? [this] : []), ...this.children.flatMap(child => child.findAll(tag))]; }
}

function load() {
  const root = new Element("div"), language = new Element("select");
  const document = {
    readyState: "complete",
    documentElement: { lang: "en" },
    createElement: tag => new Element(tag),
    getElementById: id => ({ mimicApp: root, docutisLanguage: language })[id]
  };
  const context = vm.createContext({ window: {}, document });
  for (const name of ["case-data.js", "pink-media.js", "pink-case-data.js", "mimic-data.js", "mimic-app.js"]) {
    vm.runInContext(read(name), context, { filename: name });
  }
  return { root, language, document, lessons: context.window.DOCUTIS_MIMICS };
}

test("eight source-linked teaching pairs use licensed local clinical and dermoscopic assets", () => {
  const { lessons } = load();
  assert.equal(lessons.length, 8);
  for (const lesson of lessons) {
    assert.equal(lesson.reviewStatus, "clinician review required");
    assert.equal(lesson.sides.length, 2);
    for (const side of lesson.sides) {
      assert.match(side.source, /^https:\/\//);
      for (const image of [side.clinical, side.dermoscopy]) {
        assert.ok(fs.existsSync(path.join(base, image.src)));
        assert.ok(image.creator && image.license && image.licenseUrl);
        assert.ok(image.dimensions.width > 0 && image.dimensions.height > 0);
      }
    }
  }
  assert.match(lessons.find(lesson => lesson.id === "nail").review[0], /Histopathology is unavailable/);
});

test("every pair gates context and sources, allows uncertainty and retains choices on language change", () => {
  const { root, language, document, lessons } = load();
  for (const lesson of lessons) {
    root.findAll("button").find(node => node.textContent === lesson.topic[0]).dispatch("click");
    assert.equal(root.findAll("img").length, 2);
    const submit = () => root.findAll("form")[0].dispatch("submit");
    const choices = () => root.findAll("select");
    const choose = value => choices().forEach(select => { select.value = value; select.dispatch("change"); });
    const sources = () => root.findAll("a").filter(link => !link.href.includes("creativecommons.org"));
    submit();
    assert.equal(choices().length, 6);
    for (const [index, select] of choices().entries()) {
      select.value = ["7", "4", "2"][index % 3];
      select.dispatch("change");
    }
    submit();
    assert.equal(root.findAll("img").length, 4);
    assert.equal(sources().length, 0);
    submit();
    assert.equal(choices().length, 2);
    choose("2");
    document.documentElement.lang = "tr";
    language.dispatch("change");
    assert.ok(choices().every(select => select.value === "2"));
    submit();
    assert.equal(sources().filter(link => link.textContent === "Yayını aç").length, 2);
    assert.ok(root.findAll("h4").some(heading => heading.textContent === "Tanısal Tuzak"));
    document.documentElement.lang = "en";
    language.dispatch("change");
    root.findAll("button").find(node => node.textContent === "Choose another topic").dispatch("click");
  }
});

test("guided pattern lessons separate visual feedback from source diagnoses in both languages", () => {
  const root = new Element("div"), language = new Element("select");
  const document = {
    readyState: "complete",
    documentElement: { lang: "en" },
    createElement: tag => new Element(tag),
    getElementById: id => ({ guidedPatternApp: root, docutisLanguage: language })[id]
  };
  const context = vm.createContext({ window: {}, document });
  for (const name of ["case-data.js", "early-clue-data.js", "contrast-lab-media.js", "contrast-lab-data.js", "pattern-lessons.js"]) {
    vm.runInContext(read(name), context, { filename: name });
  }
  const button = label => root.findAll("button").find(node => node.textContent === label);
  const markers = () => root.findAll("span").filter(node => node.className === "contrast-marker");
  const sources = () => root.findAll("a").filter(node => node.textContent === "Yayını aç");
  const topics = root.findAll("button").map(node => node.textContent);
  assert.equal(topics.length, 5);
  for (const topic of topics) {
    button(topic).dispatch("click");
    assert.equal(markers().length, 0);
    const select = root.findAll("select")[0];
    const form = root.findAll("form")[0];
    form.dispatch("submit");
    assert.equal(markers().length, 0);
    select.value = "3";
    select.dispatch("change");
    document.documentElement.lang = "tr";
    language.dispatch("change");
    assert.equal(root.findAll("select")[0].value, "3");
    root.findAll("form")[0].dispatch("submit");
    assert.equal(markers().length, 2);
    assert.equal(sources().length, 0);
    button("Kaynak tanılarını aç").dispatch("click");
    assert.equal(sources().length, 2);
    document.documentElement.lang = "en";
    language.dispatch("change");
    button("Choose another pattern").dispatch("click");
  }
});
