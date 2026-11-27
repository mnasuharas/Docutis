"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

class Element {
  constructor(tagName) {
    this.tagName = tagName;
    this.children = [];
    this.listeners = {};
    this.style = {};
    this.attributes = {};
    this.value = "";
    this.textContent = "";
  }

  get lastElementChild() {
    return this.children.at(-1);
  }

  appendChild(child) {
    child.parentElement = this;
    this.children.push(child);
  }

  replaceChildren() {
    this.children = [];
  }

  setAttribute(name, value) {
    this.attributes[name] = value;
  }

  addEventListener(name, callback) {
    this.listeners[name] = callback;
  }

  emit(name, event = {}) {
    this.listeners[name]({ preventDefault() {}, ...event });
  }

  focus() {
    this.focused = true;
  }

  getBoundingClientRect() {
    return { left: 20, top: 30, width: 200, height: 150 };
  }

  all(predicate) {
    return [this, ...this.children.flatMap(child => child.all(() => true))].filter(predicate);
  }

  reportValidity() {
    return !this.all(element => element.required && !element.disabled && !element.value).length;
  }
}

function harness() {
  const root = new Element("section");
  const context = vm.createContext({
    window: {},
    document: {
      getElementById: id => id === "patternExercise" ? root : null,
      createElement: name => new Element(name)
    }
  });
  for (const file of ["case-data.js", "pattern-data.js", "pattern-exercise.js"]) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, "..", file), "utf8"), context, { filename: file });
  }
  const tag = name => root.all(node => node.tagName === name);
  const contents = () => root.all(() => true).map(node => node.textContent).join(" ");
  const click = title => tag("button").find(button => button.textContent === title).emit("click");
  const submit = () => tag("form")[0].emit("submit");
  const answer = (certainty, region) => {
    tag("input")[0].value = "Uneven brown structure";
    tag("select")[0].value = certainty;
    tag("select")[0].emit("change");
    if (region !== undefined) {
      tag("select")[1].value = region;
      tag("select")[1].emit("change");
    }
    tag("textarea").forEach(area => { area.value = "Learner reasoning"; });
  };
  return { root, tag, contents, click, submit, answer };
}

test("the exercise hides both diagnoses and teaching marks until the paired answers are saved", () => {
  const { root, tag, contents, click, submit, answer } = harness();
  assert.equal(root.hidden, false);
  click("Start pattern exercise");
  assert.equal(tag("h3")[0].focused, true);
  assert.equal(tag("img")[0].src, "assets/media/cases/case-33-dermoscopy.jpg");
  assert.equal(tag("img")[1].src, "assets/media/cases/case-33-clinical.jpg");
  assert.equal(tag("img")[1].alt, "Clinical photograph for the current case.");
  assert.ok(tag("a").every(link => !link.href.includes("doi.org")));
  assert.doesNotMatch(contents(), /melanoma|nevus|teaching marks|atypical pigment network/i);
  answer("Clear");
  submit();
  assert.match(contents(), /Case 1 of 2/);
  tag("img")[0].emit("click", { clientX: 120, clientY: 90 });
  const firstMark = tag("span")[0];
  assert.equal(firstMark.style.left, "50%");
  assert.equal(firstMark.style.top, "40%");
  click("Place mark 2 on image");
  tag("img")[0].emit("click", { clientX: 80, clientY: 120 });
  submit();
  assert.match(contents(), /Case 1 of 2/);
  tag("input")[1].value = "Additional structure";
  tag("select")[2].value = "Possible";
  submit();
  assert.match(contents(), /Case 2 of 2/);
  assert.equal(tag("img")[0].src, "assets/media/cases/case-34-dermoscopy.jpg");
  assert.doesNotMatch(contents(), /melanoma|nevus|teaching marks|learner reasoning/i);
  answer("Possible", "4");
  submit();
  assert.equal(tag("article").length, 2);
  assert.match(contents(), /Melanoma in situ/);
  assert.match(contents(), /Lentiginous melanocytic nevus with cytologic atypia/);
  assert.match(contents(), /Atypisches Pigmentnetz/);
  assert.match(contents(), /Additional structure/);
  assert.match(contents(), /50% from the left, 40% from the top/);
  assert.equal(tag("span").filter(node => node.className.includes("educator")).length, 4);
  assert.match(contents(), /What dermoscopy adds/);
  assert.match(contents(), /Show the worked comparison/);
  assert.match(contents(), /Limits of the image comparison/);
  const overlay = tag("div").find(node => node.className === "exercise-overlay");
  const toggle = tag("input")[0];
  assert.equal(toggle.checked, true);
  toggle.checked = false;
  toggle.emit("change");
  assert.equal(overlay.hidden, true);
  assert.equal(tag("span").filter(node => node.className.includes("educator")).length, 4);
  toggle.checked = true;
  toggle.emit("change");
  assert.equal(overlay.hidden, false);
});

test("the independent case resets input, permits uncertainty without a mark and reveals its source afterwards", () => {
  const { tag, contents, click, submit, answer } = harness();
  click("Start pattern exercise");
  answer("Clear", "4");
  submit();
  answer("Possible", "5");
  submit();
  click("Open independent case");
  assert.equal(tag("img")[0].src, "assets/media/cases/case-39-dermoscopy.jpg");
  assert.equal(tag("img")[1].src, "assets/media/cases/case-39-clinical.jpg");
  assert.equal(tag("span").length, 0);
  assert.equal(tag("input")[0].value, "");
  assert.doesNotMatch(contents(), /melanoma|blotch|learner reasoning|pigment network/i);
  answer("Possible", "4");
  answer("Cannot assess");
  assert.equal(tag("span").length, 0);
  submit();
  assert.equal(tag("article").length, 1);
  assert.match(contents(), /Acral melanoma/);
  assert.match(contents(), /Eccentric dark blotch/);
  assert.match(contents(), /Cannot assess/);
  assert.ok(tag("a").some(link => link.href === "https://doi.org/10.3390/life14060659"));
  click("Review the first two cases");
  assert.equal(tag("article").length, 2);
  click("Return to independent case review");
  assert.match(contents(), /Cannot assess/);
  click("Restart exercise");
  assert.equal(tag("img").length, 0);
  assert.equal(tag("h3")[0].focused, true);
});

test("the public page loads the pattern exercise after the case and pattern data", () => {
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  assert.match(html, /id="patternExercise"[^>]*hidden>/);
  assert.match(html, /href="pattern-exercise\.css\?v=paired-views"/);
  assert.match(html, /src="case-data\.js"[\s\S]*src="pattern-data\.js"[\s\S]*src="pattern-exercise\.js\?v=vessel-practice"/);
});

test("clinical-first practice records independent impressions before each dermoscopic view", () => {
  const { tag, contents, click, submit, answer } = harness();
  click("Start with clinical impression");
  for (const number of [1, 2, 3]) {
    assert.equal(tag("img").length, 1);
    assert.match(tag("img")[0].src, /clinical\.jpg$/);
    assert.equal(tag("textarea")[0].value, "");
    tag("textarea")[0].value = "   ";
    submit();
    assert.equal(tag("img").length, 1);
    const note = "First impression for case " + number;
    tag("textarea")[0].value = note;
    submit();
    assert.match(tag("img")[0].src, /dermoscopy\.jpg$/);
    assert.ok(contents().includes(note));
    assert.match(contents(), /changed or reinforced/);
    answer("Possible", "4");
    submit();
    if (number === 2) {
      assert.ok(contents().includes("First impression for case 1"));
      assert.ok(contents().includes(note));
      click("Open independent case");
    }
  }
  assert.ok(contents().includes("First impression for case 3"));
  click("Restart exercise");
  click("Start pattern exercise");
  assert.match(tag("img")[0].src, /dermoscopy\.jpg$/);
});

test("optional heel practice withholds the comparison until the learner submits both answers", () => {
  const { tag, contents, click, submit, answer } = harness();
  click("Start pattern exercise");
  answer("Possible", "4");
  submit();
  answer("Possible", "4");
  submit();
  click("Open independent case");
  answer("Possible", "4");
  submit();
  tag("textarea")[0].value = "Check pigment distribution";
  tag("textarea")[0].emit("input");
  click("Practise on another heel lesion");
  assert.equal(tag("img")[0].src, "assets/media/cases/case-40-dermoscopy.jpg");
  assert.doesNotMatch(contents(), /nevus|melanoma|regular rows/i);
  tag("textarea")[0].value = "Evenly spaced strokes";
  submit();
  assert.equal(tag("form").length, 1);
  tag("textarea")[1].value = "Organized pattern supports a nevus";
  submit();
  assert.equal(tag("article").length, 2);
  assert.match(contents(), /Check pigment distribution/);
  assert.match(contents(), /Organized pattern supports a nevus/);
  click("Return to independent case review");
  click("Review the heel comparison");
  assert.equal(tag("article").length, 2);
});

test("pink-lesion practice requires observations and reasoning for both cases before revealing the source comparison", () => {
  const { tag, contents, click, submit } = harness();
  click("Practise vessel patterns in pink lesions");
  assert.equal(tag("img").length, 2);
  assert.doesNotMatch(contents(), /melanoma|carcinoma|branching|irregular linear/i);
  tag("textarea").forEach(field => { field.value = "My assessment"; });
  tag("textarea")[3].value = " ";
  submit();
  assert.equal(tag("textarea").length, 4);
  tag("textarea")[3].value = "My second differential";
  submit();
  assert.match(contents(), /Nodular basal cell carcinoma/);
  assert.match(contents(), /Nodular melanoma, amelanotic/);
  assert.match(contents(), /My second differential/);
  assert.match(contents(), /Only the melanoma caption reports histopathology/);
  click("Back to exercises");
  assert.equal(tag("img").length, 0);
});
