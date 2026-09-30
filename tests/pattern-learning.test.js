const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const { loadCaseData, validateCaseData, caseFingerprint, primaryPathGate, allowedLicenses } = require("../scripts/case");
const {
  loadPatternData, validatePatternLibrary, patternFingerprint, deriveOccurrences,
  classifyOccurrences, classifyPatternCoverage
} = require("../scripts/pattern");

const root = path.join(__dirname, "..");
const PILOTS = [
  "case-acral-melanoma-plantar",
  "case-bcc-nodular-dermoscopy",
  "case-bcc-pigmented-dermoscopy",
  "case-ak-field-hand",
  "case-scc-ak-paraspinal"
];

function boot() {
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
        focus() { document.activeElement = this; }
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
  for (const file of ["data.js", "case-data.js", "pattern-data.js", "review-status.js", "oss-feedback.js", "review-ui.js", "case-app.js"]) {
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
  function open(title) {
    const start = find(node => node.tagName === "BUTTON" && node.getAttribute("aria-label") === `Start case: ${title}`)[0];
    assert.ok(start, title);
    start.dispatch("click");
  }
  function step(n, name) {
    find(node => node.getAttribute && node.getAttribute("aria-label") === `Step ${n} of 5: ${name}`)[0].dispatch("click");
  }
  return { document, text, find, open, step };
}

test("canonical pattern ids resolve and unknown references fail", () => {
  const patterns = loadPatternData();
  const cases = loadCaseData();
  assert.doesNotThrow(() => validatePatternLibrary(patterns, cases));
  const ids = new Set(patterns.patterns.map(item => item.id));
  assert.equal(ids.size, patterns.patterns.length);
  for (const link of patterns.links) assert.ok(ids.has(link.canonicalId), link.canonicalId);
  for (const canonicalId of Object.values(patterns.dermoscopicTokenLinks)) assert.ok(ids.has(canonicalId));
  const broken = structuredClone(patterns);
  broken.links[0].canonicalId = "not-a-pattern";
  assert.throws(() => validatePatternLibrary(broken, cases), /unknown pattern reference/);
});

test("pattern objects require source metadata and stay free of case certainty", () => {
  const patterns = loadPatternData();
  const cases = loadCaseData();
  const stripped = structuredClone(patterns);
  stripped.patterns[0].sourceIds = [];
  assert.throws(() => validatePatternLibrary(stripped, cases), /source metadata/);
  for (const pattern of patterns.patterns) {
    assert.ok(pattern.sourceIds.length);
    assert.equal(pattern.reviewStatus, "clinician review required");
    assert.equal(pattern.clinicalReview, null);
    assert.equal(Object.hasOwn(pattern, "certainty"), false);
    assert.equal(Object.hasOwn(pattern, "weight"), false);
    assert.equal(Object.hasOwn(pattern, "linkedCases"), false);
  }
  const copy = structuredClone(patterns.patterns[0]);
  const before = patternFingerprint(copy);
  copy.reviewStatus = "clinician review required";
  copy.clinicalReview = null;
  assert.equal(patternFingerprint(copy), before);
  copy.definition = `${copy.definition} Edited.`;
  assert.notEqual(patternFingerprint(copy), before);
});

test("case certainty and weight stay on the case when two cases share a pattern", () => {
  const cases = loadCaseData();
  const grouped = deriveOccurrences();
  const rows = grouped.get("color-variegation");
  assert.equal(rows.length, 3);
  const weights = new Set(rows.map(row => row.weight));
  assert.ok(weights.has("supportive"));
  assert.ok(weights.has("major"));
  assert.ok(rows.every(row => row.certainty === "clearly_visible"));
  const pattern = loadPatternData().patterns.find(item => item.id === "color-variegation");
  rows[0].weight = "weak";
  assert.equal(pattern.usualRole, "context-dependent");
  assert.equal(Object.hasOwn(pattern, "weight"), false);
  const vessels = grouped.get("surface-vessels");
  assert.deepEqual(vessels.map(row => row.certainty).sort(), ["not_visible", "uncertain"]);
  assert.ok(vessels.every(row => row.weight === "weak"));
  const library = loadPatternData().patterns.find(item => item.id === "surface-vessels");
  assert.equal(library.usualRole, "supportive");
  assert.notEqual(library.usualRole, vessels[0].weight);
  const first = cases.cases.find(item => item.id === "case-g18-02");
  assert.equal(first.patterns.find(item => item.id === "pat-g18-02-color").weight, "supportive");
});

test("diagnostic weighting and pattern teaching stay hidden before reveal", () => {
  const ui = boot();
  const item = loadCaseData().cases.find(entry => entry.id === "case-g18-01");
  ui.open(item.title);
  ui.step(2, "Observe");
  const observe = ui.text(ui.document.root);
  assert.match(observe, /Look for/);
  assert.doesNotMatch(observe, /Feature weights/);
  assert.doesNotMatch(observe, /Major clue/);
  assert.doesNotMatch(observe, /Open pattern teaching/);
  assert.doesNotMatch(observe, /Patterns in this case/);
  assert.doesNotMatch(observe, /One half of a lesion looks thicker/);
  assert.doesNotMatch(observe, new RegExp(item.diagnosisLabel, "i"));
  const bcc = loadCaseData().cases.find(entry => entry.id === "case-bcc-nodular-dermoscopy");
  ui.find(node => node.tagName === "BUTTON" && node.textContent === "Back to case list")[0].dispatch("click");
  ui.open(bcc.title);
  ui.step(2, "Observe");
  const before = ui.text(ui.document.root);
  assert.doesNotMatch(before, /Branching red vessels on a translucent field/);
  assert.doesNotMatch(before, new RegExp(bcc.diagnosisLabel, "i"));
  assert.doesNotMatch(before, /Open pattern teaching/);
});

test("post-reveal pattern teaching is interactive and does not overwrite the case note", () => {
  const ui = boot();
  const item = loadCaseData().cases.find(entry => entry.id === "case-g18-01");
  ui.open(item.title);
  ui.step(4, "Reveal");
  ui.find(node => node.tagName === "BUTTON" && node.textContent === "Reveal diagnosis")[0].dispatch("click");
  ui.step(5, "Review");
  const review = ui.text(ui.document.root);
  assert.match(review, /Patterns in this case/);
  assert.match(review, /Feature weights/);
  const button = ui.find(node => node.tagName === "BUTTON" && node.textContent === "Open pattern teaching" && node.getAttribute("data-pattern-key") === "case-g18-01:pat-g18-01")[0];
  assert.equal(button.getAttribute("aria-expanded"), "false");
  button.dispatch("click");
  const open = ui.find(node => node.getAttribute && node.getAttribute("data-pattern-key") === "case-g18-01:pat-g18-01")[0];
  assert.equal(open.getAttribute("aria-expanded"), "true");
  const panel = ui.find(node => node.id === "pattern-panel-case-g18-01-pat-g18-01")[0];
  assert.ok(panel);
  assert.equal(ui.document.activeElement, panel);
  const body = ui.text(panel);
  assert.match(body, /What is it\?/);
  assert.match(body, /One half of a lesion looks thicker/);
  assert.match(body, /A thicker half is a clue/);
  assert.notEqual(body.includes("One half of a lesion looks thicker"), body.trim() === "A thicker half is a clue. It is not specific for one diagnosis.");
  assert.match(body, /Clearly visible/);
  assert.match(body, /Major clue/);
  assert.match(body, /Usual teaching role, not this case's weight/);
  assert.match(body, /This is the only structured example/);
  open.dispatch("click");
  const closed = ui.find(node => node.getAttribute && node.getAttribute("data-pattern-key") === "case-g18-01:pat-g18-01")[0];
  assert.equal(closed.getAttribute("aria-expanded"), "false");
  assert.equal(ui.document.activeElement, closed);
  assert.equal(ui.find(node => node.id === "pattern-panel-case-g18-01-pat-g18-01").length, 0);
});

test("pattern links use structured evidence and do not treat uncertain examples as clear", () => {
  const grouped = deriveOccurrences();
  const color = grouped.get("color-variegation").map(row => row.caseId).sort();
  assert.deepEqual(color, ["case-g18-02", "case-g18-03", "case-g21-02"]);
  const vessels = grouped.get("polymorphous-vessels");
  assert.equal(vessels.length, 1);
  assert.equal(vessels[0].caseId, "case-g18-11");
  assert.ok(vessels[0].evidenceTokens.includes("polymorphous_vessels"));
  assert.equal(vessels[0].certainty, "clearly_visible");
  const arborizing = grouped.get("arborizing-vessels");
  assert.equal(arborizing.length, 1);
  assert.equal(arborizing[0].certainty, "unrated");
  assert.equal(arborizing[0].evidence, "dermoscopic-token");
  const coverage = classifyPatternCoverage();
  const arbor = coverage.find(item => item.id === "arborizing-vessels");
  assert.equal(arbor.status, "single_example");
  assert.equal(arbor.broadCoverage, false);
  assert.equal(arbor.clearExamples, 0);
  const streak = coverage.find(item => item.id === "pigmented-nail-streak");
  assert.equal(streak.status, "missing");
  assert.equal(streak.notVisibleExamples, 1);
  const surface = coverage.find(item => item.id === "surface-vessels");
  assert.equal(surface.status, "missing");
  assert.equal(surface.uncertainExamples, 1);
  assert.equal(loadPatternData().dermoscopicTokenLinks.structureless_areas, undefined);
  const { unmappedDermoscopicTokens } = require("../scripts/pattern");
  assert.ok(unmappedDermoscopicTokens().some(row => row.token === "structureless_areas"));
  const ui = boot();
  const item = loadCaseData().cases.find(entry => entry.id === "case-g18-15");
  ui.open(item.title);
  ui.step(4, "Reveal");
  ui.find(node => node.tagName === "BUTTON" && node.textContent === "Reveal diagnosis")[0].dispatch("click");
  ui.step(5, "Review");
  const article = ui.find(node => node.tagName === "ARTICLE" && node.getAttribute("data-pattern-id") === "surface-vessels")[0];
  assert.equal(article.getAttribute("data-certainty"), "uncertain");
  const articleText = ui.text(article);
  assert.match(articleText, /Uncertain/);
  assert.doesNotMatch(articleText, /Clearly visible/);
});

test("coverage does not call one example broad, and pilots stay untouched", () => {
  assert.equal(classifyOccurrences([{ certainty: "clearly_visible", diagnosisLabel: "A", closestMimicName: null }]).status, "single_example");
  assert.equal(classifyOccurrences([{ certainty: "clearly_visible", diagnosisLabel: "A", closestMimicName: null }]).broadCoverage, false);
  assert.equal(classifyOccurrences([
    { certainty: "clearly_visible", diagnosisLabel: "A", closestMimicName: null },
    { certainty: "not_visible", diagnosisLabel: "B", closestMimicName: null }
  ]).independentExamples, 1);
  assert.equal(classifyOccurrences([
    { certainty: "clearly_visible", diagnosisLabel: "Same", closestMimicName: null },
    { certainty: "probably", diagnosisLabel: "Same", closestMimicName: null }
  ]).status, "limited_variation");
  const contrast = classifyOccurrences([
    { certainty: "clearly_visible", diagnosisLabel: "Pigmented basal cell carcinoma", closestMimicName: "Something else" },
    { certainty: "clearly_visible", diagnosisLabel: "Cutaneous melanoma", closestMimicName: "Pigmented basal cell carcinoma" }
  ]);
  assert.equal(contrast.status, "contrastive_coverage");
  assert.equal(contrast.broadCoverage, true);
  assert.equal(contrast.mastery, false);
  assert.equal(classifyOccurrences([{ certainty: "clearly_visible", diagnosisLabel: "Only one", closestMimicName: "Cutaneous melanoma" }]).status, "single_example");
  const data = loadCaseData();
  assert.doesNotThrow(() => validateCaseData(data));
  assert.equal(primaryPathGate(data).passed, true);
  const status = JSON.parse(fs.readFileSync(path.join(root, "review-status.json"), "utf8"));
  for (const id of PILOTS) {
    const item = data.cases.find(entry => entry.id === id);
    assert.equal(caseFingerprint(item), status.assets.find(asset => asset.assetType === "case" && asset.id === id).currentFingerprint);
    assert.equal(JSON.stringify(item).includes("canonicalId"), false);
    assert.equal(item.clinicalReview, null);
    assert.equal(item.reviewStatus, "clinician review required");
  }
  for (const item of data.cases) {
    assert.equal(item.clinicalReview, null);
    assert.equal(item.reviewStatus, "clinician review required");
    for (const image of item.images) assert.ok(allowedLicenses.has(image.license));
  }
  assert.equal(loadPatternData().clinicalReview, null);
  const color = classifyPatternCoverage().find(item => item.id === "color-variegation");
  assert.equal(color.independentExamples, 3);
  assert.equal(color.status, "contrastive_coverage");
  assert.equal(color.broadCoverage, true);
  assert.equal(color.mastery, false);
});
