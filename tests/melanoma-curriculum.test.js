const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const { loadCaseData, validateCaseData, caseFingerprint } = require("../scripts/case");

const root = path.join(__dirname, "..");
const PILOTS = [
  "case-acral-melanoma-plantar",
  "case-bcc-nodular-dermoscopy",
  "case-bcc-pigmented-dermoscopy",
  "case-ak-field-hand",
  "case-scc-ak-paraspinal"
];

test("melanoma curriculum map is complete and stays inside 60-70 percent melanoma-spectrum", () => {
  const data = loadCaseData();
  assert.doesNotThrow(() => validateCaseData(data));
  const curriculum = data.curriculum;
  assert.equal(curriculum.id, "melanoma-clinical-case-academy");
  assert.equal(curriculum.levels.length, 5);
  assert.equal(curriculum.levels.map(level => level.level).join(","), "1,2,3,4,5");
  const skillIds = new Set(curriculum.skills.map(skill => skill.id));
  assert.equal(curriculum.entries.length, 19);
  const melanoma = curriculum.entries.filter(entry => entry.spectrum === "melanoma");
  const mimics = curriculum.entries.filter(entry => entry.spectrum === "mimic");
  assert.equal(melanoma.length, 13);
  assert.equal(mimics.length, 6);
  const share = melanoma.length / curriculum.entries.length;
  assert.ok(share >= 0.6 && share <= 0.7, share);
  for (const entry of curriculum.entries) {
    entry.skillIds.forEach(id => assert.ok(skillIds.has(id), id));
    assert.ok(data.cases.some(item => item.id === entry.caseId));
  }
  const academyCases = data.cases.filter(item => item.academy);
  assert.equal(academyCases.length, 16);
  assert.equal(data.cases.length, 21);
  for (const item of academyCases) {
    assert.equal(item.reviewStatus, "clinician review required");
    assert.equal(item.clinicalReview, null);
    assert.notEqual(item.diagnosticGroundTruth.confirmationMethod, "histopathology");
    assert.match(item.managementBrief, /review required/i);
    assert.ok(item.patterns.every(pattern => pattern.specificityNote));
    if (item.academy.level >= 4) assert.ok(item.whyNot.length >= 2);
    assert.doesNotMatch(item.id, /melanoma|carcinoma|keratoacanthoma|nevus/i);
    assert.doesNotMatch(item.slug, /melanoma|carcinoma|keratoacanthoma|nevus/i);
    assert.equal(item.images[0].patientIdentifiable, false);
    assert.ok(["CC BY 4.0", "CC BY-SA 4.0", "CC0 1.0", "Public domain"].includes(item.images[0].license));
  }
  const outside = data.cases.filter(item => !curriculum.entries.some(entry => entry.caseId === item.id)).map(item => item.id);
  assert.equal(outside.slice().sort().join("|"), "case-ak-field-hand|case-scc-ak-paraspinal");
});

test("pilot case payloads keep their pre-Goal-18 fingerprints", () => {
  const data = loadCaseData();
  const status = JSON.parse(fs.readFileSync(path.join(root, "review-status.json"), "utf8"));
  for (const id of PILOTS) {
    const item = data.cases.find(entry => entry.id === id);
    assert.equal(item.academy, undefined);
    const published = status.assets.find(asset => asset.assetType === "case" && asset.id === id);
    assert.equal(caseFingerprint(item), published.currentFingerprint);
    assert.equal(published.status, "review required");
  }
});

test("Learn Melanoma pathway orders the next case and keeps teacher filters closed", () => {
  const document = {
    activeElement: null,
    createElement(tag) {
      return {
        tagName: String(tag).toUpperCase(),
        children: [],
        attributes: {},
        className: "",
        textContent: "",
        style: {},
        hidden: false,
        disabled: false,
        open: false,
        value: "",
        tabIndex: 0,
        listeners: {},
        appendChild(child) { this.children.push(child); return child; },
        replaceChildren(...children) { this.children = []; children.forEach(child => this.appendChild(child)); },
        setAttribute(name, value) { this.attributes[name] = String(value); },
        getAttribute(name) { return this.attributes[name]; },
        addEventListener(type, listener) { (this.listeners[type] ||= []).push(listener); },
        dispatch(type) {
          const event = { type, target: this, preventDefault() {} };
          for (const listener of this.listeners[type] || []) listener(event);
        },
        focus() {}
      };
    },
    createTextNode(text) { return { nodeType: 3, textContent: String(text), children: [] }; },
    getElementById(id) { return id === "caseApp" ? document.root : null; }
  };
  document.root = document.createElement("div");
  function Option(text, value) {
    const option = document.createElement("option");
    option.textContent = String(text);
    option.value = value == null ? "" : String(value);
    return option;
  }
  const context = { window: {}, document, Option };
  for (const file of ["data.js", "case-data.js", "review-status.js", "oss-feedback.js", "review-ui.js", "case-app.js"]) {
    vm.runInNewContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
  }
  function walk(node, visit) {
    visit(node);
    for (const child of node.children || []) walk(child, visit);
  }
  function text(node) {
    const own = !node.children || node.children.length === 0 ? (node.textContent || "") : "";
    return [own, ...(node.children || []).map(text)].join(" ");
  }
  function find(predicate) {
    const found = [];
    walk(document.root, node => { if (predicate(node)) found.push(node); });
    return found;
  }
  const teacher = find(node => node.tagName === "DETAILS")[0];
  assert.equal(teacher.open, false);
  assert.match(text(document.root), /21 cases shown/);
  const pathway = find(node => node.tagName === "BUTTON" && node.getAttribute("aria-label") === "Learn Melanoma pathway")[0];
  pathway.dispatch("click");
  assert.match(text(document.root), /19 cases shown/);
  assert.doesNotMatch(text(document.root), /Field change on the dorsum of the hand/);
  const first = find(node => node.tagName === "BUTTON" && node.getAttribute("aria-label") === "Start case: Dark lesion thicker on one side")[0];
  first.dispatch("click");
  assert.match(text(document.root), /First impression/);
  assert.match(text(document.root), /Not a device output/);
  const suspicious = find(node => node.tagName === "BUTTON" && node.textContent === "Suspicious")[0];
  suspicious.dispatch("click");
  assert.equal(find(node => node.tagName === "BUTTON" && node.textContent === "Suspicious")[0].getAttribute("aria-pressed"), "true");
  for (let step = 2; step <= 4; step += 1) {
    find(node => node.getAttribute && node.getAttribute("aria-label") === `Step ${step} of 5: ${["", "", "Observe", "Differential", "Reveal", "Review"][step]}`)[0].dispatch("click");
  }
  find(node => node.tagName === "BUTTON" && node.textContent === "Reveal diagnosis")[0].dispatch("click");
  find(node => node.getAttribute && node.getAttribute("aria-label") === "Step 5 of 5: Review")[0].dispatch("click");
  const view = text(document.root);
  assert.match(view, /Cutaneous melanoma/);
  assert.match(view, /Management brief/);
  assert.match(view, /Review required/);
  assert.match(view, /Your first impression was Suspicious/);
  assert.match(view, /not scored/);
  const next = find(node => node.tagName === "BUTTON" && node.textContent === "Next curriculum case: Dark lesion with an uneven edge")[0];
  assert.ok(next);
  next.dispatch("click");
  assert.match(text(document.root), /Dark lesion with an uneven edge/);
  assert.doesNotMatch(text(document.root), /Diagnosis revealed/);
});
