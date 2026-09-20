const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const { load, validateQuiz } = require("../scripts/quiz");

const root = path.join(__dirname, "..");
const quiz = load("quiz-data.js", "DOCUTIS_QUIZ");
const diseases = load("data.js", "DOCUTIS_DATA");
const media = load("media-data.js", "DOCUTIS_MEDIA");
const clone = value => JSON.parse(JSON.stringify(value));

test("quiz contains eight valid one-best-answer questions across the structured pilots", () => {
  assert.equal(quiz.questions.length, 8);
  assert.doesNotThrow(() => validateQuiz(quiz, diseases, media));
  assert.equal(new Set(quiz.questions.map(item => item.diseaseId)).size, 8);
  assert.ok(new Set(quiz.questions.map(item => item.domain)).size >= 6);
  assert.ok(quiz.questions.every(item => item.options.filter((_option, index) => index === item.correctIndex).length === 1));
  assert.ok(quiz.questions.every(item => item.explanation && item.sourceUrls.length));
});

test("quiz validation rejects unknown evidence, ambiguous answers, mismatched media and fabricated review", () => {
  const mutations = [
    item => { item.questions[0].sourceUrls = ["https://example.org/unknown"]; },
    item => { item.questions[0].correctIndex = -1; },
    item => { item.questions[0].options[1] = item.questions[0].options[0]; },
    item => { item.questions[0].mediaId = "bcc-clues-schematic"; },
    item => { item.questions[0].reviewStatus = "clinician reviewed"; }
  ];
  for (const mutate of mutations) {
    const fixture = clone(quiz); mutate(fixture);
    assert.throws(() => validateQuiz(fixture, diseases, media));
  }
});

class Element {
  constructor(tag, document) {
    this.tagName = tag.toUpperCase(); this.ownerDocument = document; this.children = []; this.listeners = {};
    this.attributes = {}; this.className = ""; this.textContent = ""; this.style = {}; this.checked = false; this.disabled = false;
    this.classList = { add: (...names) => { this.className = [...new Set([...this.className.split(" ").filter(Boolean), ...names])].join(" "); } };
  }
  appendChild(child) { this.children.push(child); child.parentElement = this; return child; }
  replaceChildren(...children) { this.children = []; children.forEach(child => this.appendChild(child)); }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  addEventListener(type, listener) { (this.listeners[type] ||= []).push(listener); }
  dispatch(type) { for (const listener of this.listeners[type] || []) listener({ type, preventDefault() {}, target: this }); }
  focus() { this.ownerDocument.activeElement = this; }
  remove() { if (this.parentElement) this.parentElement.children = this.parentElement.children.filter(child => child !== this); }
  querySelectorAll(selector) {
    const result = [];
    const visit = node => {
      if (/^[a-z]+$/.test(selector) && node.tagName === selector.toUpperCase()) result.push(node);
      node.children.forEach(visit);
    };
    this.children.forEach(visit); return result;
  }
  querySelector(selector) {
    if (selector === 'input[name="quiz-answer"]:checked') return this.querySelectorAll("input").find(input => input.name === "quiz-answer" && input.checked) || null;
    return this.querySelectorAll(selector)[0] || null;
  }
}

function textOf(node) { return [node.textContent, ...node.children.map(textOf)].join(" "); }

function quizHarness() {
  const document = { activeElement: null, createElement(tag) { return new Element(tag, document); }, getElementById(id) { return id === "quizApp" ? this.root : null; } };
  document.root = new Element("div", document);
  const context = { window: {}, document };
  for (const file of ["data.js", "media-data.js", "quiz-data.js", "review-status.js", "review-ui.js", "quiz-app.js"]) vm.runInNewContext(fs.readFileSync(path.join(root, file), "utf8"), context);
  return { document, root: document.root, quiz: context.window.DOCUTIS_QUIZ };
}

test("quiz UI announces feedback, exposes secure evidence links, scores and restarts", () => {
  const harness = quizHarness();
  for (let index = 0; index < harness.quiz.questions.length; index += 1) {
    assert.match(textOf(harness.root), new RegExp(`Question ${index + 1} of 8`));
    assert.match(textOf(harness.root), /Quiz-item review status[\s\S]*Clinical review pending/);
    const form = harness.root.querySelector("form");
    const inputs = form.querySelectorAll("input");
    inputs[harness.quiz.questions[index].correctIndex].checked = true;
    form.dispatch("submit");
    assert.match(textOf(harness.root), /Correct\./);
    assert.match(textOf(harness.root), /Clinical review pending/);
    const links = harness.root.querySelectorAll("a");
    assert.ok(links.some(link => /^\?condition=/.test(link.href)));
    for (const link of links.filter(link => /^https:/.test(link.href))) {
      assert.equal(link.target, "_blank"); assert.equal(link.rel, "noopener noreferrer");
    }
    const next = harness.root.querySelectorAll("button").at(-1);
    next.dispatch("click");
  }
  assert.match(textOf(harness.root), /8 of 8 correct/);
  harness.root.querySelector("button").dispatch("click");
  assert.match(textOf(harness.root), /Question 1 of 8/);
});

test("quiz implementation stays local, keyboard-native and reduced-motion ready", () => {
  const app = fs.readFileSync(path.join(root, "quiz-app.js"), "utf8");
  const css = fs.readFileSync(path.join(root, "style.css"), "utf8");
  assert.match(app, /createElement\("form"\)/);
  assert.match(app, /input\.type = "radio"/);
  assert.match(app, /aria-live/);
  assert.doesNotMatch(app, /localStorage|sessionStorage|fetch\(|analytics/i);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /\.quiz-option:focus-within/);
});
