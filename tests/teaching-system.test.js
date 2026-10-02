const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const { loadCaseData, validateCaseData, caseFingerprint, primaryPathGate } = require("../scripts/case");
const { renderDocument } = require("../scripts/academy-review");

const root = path.join(__dirname, "..");
const PILOTS = [
  "case-acral-melanoma-plantar",
  "case-bcc-nodular-dermoscopy",
  "case-bcc-pigmented-dermoscopy",
  "case-ak-field-hand",
  "case-scc-ak-paraspinal"
];
const CONFIRMATION = {
  "case-g18-01": "source_dataset_diagnosis",
  "case-g18-02": "source_dataset_diagnosis",
  "case-g18-03": "source_dataset_diagnosis",
  "case-g18-04": "source_dataset_diagnosis",
  "case-g18-05": "source_dataset_diagnosis",
  "case-g18-06": "source_dataset_diagnosis",
  "case-g18-07": "source_dataset_diagnosis",
  "case-g18-08": "source_dataset_diagnosis",
  "case-g18-09": "source_dataset_diagnosis",
  "case-g18-10": "expert_diagnosis",
  "case-g18-11": "expert_diagnosis",
  "case-g18-12": "clinical_diagnosis",
  "case-g18-13": "source_dataset_diagnosis",
  "case-g18-14": "source_dataset_diagnosis",
  "case-g18-15": "source_dataset_diagnosis",
  "case-g18-16": "source_dataset_diagnosis",
  "case-acral-melanoma-plantar": "histopathology"
};

test("teaching types, quality gate, skills, and pilot payloads stay compatible", () => {
  const data = loadCaseData();
  assert.equal(data.schemaVersion, 1);
  assert.doesNotThrow(() => validateCaseData(data));
  const gate = primaryPathGate(data);
  assert.equal(gate.passed, true);
  assert.deepEqual(gate.gaps, []);
  assert.equal(data.curriculum.qualityGate.kind, "qualitative");
  assert.equal(data.curriculum.skills.length, 31);
  assert.equal(data.cases.length, 38);
  assert.equal(data.curriculum.entries.length, 36);
  const types = data.curriculum.entries.map(entry => entry.teachingType);
  assert.ok(types.every(type => ["teaching", "reasoning", "expert-challenge"].includes(type)));
  assert.ok(types.includes("teaching") && types.includes("reasoning") && types.includes("expert-challenge"));
  const byOrder = data.curriculum.entries.slice().sort((a, b) => a.order - b.order).map(entry => entry.caseId);
  const byId = byOrder.slice().sort();
  assert.notDeepEqual(byOrder, byId);
  assert.equal(data.curriculum.entries.filter(entry => entry.level === 5).length, 1);
  const signatures = new Set(data.curriculum.entries.map(entry => JSON.stringify(entry.skillIds)));
  assert.equal(signatures.size, data.curriculum.entries.length);
  const covered = new Set(data.curriculum.entries.flatMap(entry => entry.skillIds));
  assert.equal(covered.size, data.curriculum.skills.length);
  const status = JSON.parse(fs.readFileSync(path.join(root, "review-status.json"), "utf8"));
  for (const id of PILOTS) {
    const item = data.cases.find(entry => entry.id === id);
    assert.equal(item.academy, undefined);
    assert.equal(item.observationPrompts, undefined);
    assert.equal(item.hints, undefined);
    assert.equal(item.closestMimic, undefined);
    assert.equal(item.clinicalReview, null);
    const published = status.assets.find(asset => asset.assetType === "case" && asset.id === id);
    assert.equal(caseFingerprint(item), published.currentFingerprint);
  }
  for (const [id, method] of Object.entries(CONFIRMATION)) {
    const item = data.cases.find(entry => entry.id === id);
    assert.equal(item.diagnosticGroundTruth.confirmationMethod, method);
    assert.equal(item.clinicalReview, null);
    assert.equal(item.reviewStatus, "clinician review required");
    assert.ok(data.diseases === undefined);
  }
  const diseaseIds = new Set(JSON.parse(JSON.stringify(require("../scripts/case").loadDiseaseData().diseases)).map(item => item.id));
  const teachingIds = new Set((data.teachingDiagnoses || []).filter(item => item.monograph === false).map(item => item.id));
  for (const item of data.cases) {
    assert.ok(diseaseIds.has(item.diseaseId) || teachingIds.has(item.diseaseId), item.diseaseId);
    assert.equal(item.clinicalReview, null);
    for (const image of item.images) {
      assert.ok(fs.existsSync(path.join(root, image.src)), image.src);
      assert.ok(["CC BY 4.0", "CC BY-SA 4.0", "CC0 1.0", "Public domain", "Project-owned"].includes(image.license));
    }
  }
  const numeric = /\b(?:sensitivity|specificity)\b|\blikelihood ratio\b|\d+(?:\.\d+)?\s*%/i;
  for (const item of data.cases.filter(entry => entry.academy)) {
    const blob = JSON.stringify({
      patterns: item.patterns,
      prompts: item.observationPrompts,
      hints: item.hints,
      closest: item.closestMimic,
      synthesis: item.synthesis,
      evidence: item.evidenceWeighting,
      trap: item.diagnosticTrap,
      mentor: item.mentorNote,
      rule: item.takeHomeRule,
      management: item.managementBrief
    });
    assert.doesNotMatch(blob, numeric);
    assert.ok(item.patterns.some(pattern => pattern.certainty === "clearly_visible" || pattern.certainty === "probably"));
    assert.equal(item.dermoscopicFeatures.some(feature => feature.token === "pigment_network_atypical" && item.id === "case-g18-01"), false);
  }
  const emptyDermoscopy = data.cases.find(item => item.id === "case-g18-01");
  assert.equal(emptyDermoscopy.dermoscopicFeatures.length, 0);
  assert.match(fs.readFileSync(path.join(root, "scripts/case.js"), "utf8"), /does not require|featureCertainties/);
  assert.doesNotMatch(fs.readFileSync(path.join(root, "scripts/case.js"), "utf8"), /every case must record streaks|requiredMelanomaStructures/);
});

test("pre-reveal teaching text does not name the diagnosis, and weights appear only after reveal", () => {
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
  const data = loadCaseData();
  const academy = data.cases.filter(item => item.academy);
  for (const item of academy) {
    const start = find(node => node.tagName === "BUTTON" && node.getAttribute("aria-label") === `Start case: ${item.title}`)[0];
    assert.ok(start, item.id);
    start.dispatch("click");
    const before = text(document.root);
    assert.match(before, /Teaching case|Reasoning case|Expert-challenge case/);
    const diagnosis = new RegExp(item.diagnosisLabel.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&"), "i");
    assert.doesNotMatch(before, diagnosis);
    const images = find(node => node.tagName === "IMG");
    assert.ok(images.length, item.id);
    assert.ok(images.every(image => image.loading === "lazy"));
    assert.ok(images.every(image => !/melanoma|carcinoma|keratoacanthoma/i.test(image.src)));
    find(node => node.getAttribute && node.getAttribute("aria-label") === "Step 2 of 5: Observe")[0].dispatch("click");
    const observe = text(document.root);
    assert.match(observe, /Look for/);
    assert.doesNotMatch(observe, /Feature weights/);
    assert.doesNotMatch(observe, /Closest mimic/);
    assert.doesNotMatch(observe, diagnosis);
    for (const prompt of item.observationPrompts) assert.match(observe, new RegExp(prompt.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")));
    const hint = find(node => node.tagName === "BUTTON" && node.textContent === "Show a hint")[0];
    assert.equal(hint.getAttribute("aria-pressed"), "false");
    hint.dispatch("click");
    const hinted = find(node => node.tagName === "BUTTON" && node.textContent === "Hide hint")[0];
    assert.equal(hinted.getAttribute("aria-pressed"), "true");
    assert.doesNotMatch(text(document.root), new RegExp(item.diagnosisLabel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
    find(node => node.getAttribute && node.getAttribute("aria-label") === "Step 4 of 5: Reveal")[0].dispatch("click");
    find(node => node.tagName === "BUTTON" && node.textContent === "Reveal diagnosis")[0].dispatch("click");
    find(node => node.getAttribute && node.getAttribute("aria-label") === "Step 5 of 5: Review")[0].dispatch("click");
    const review = text(document.root);
    assert.match(review, /Feature weights/);
    assert.match(review, /Closest mimic/);
    assert.match(review, /Differential discrimination/);
    assert.match(review, /Management brief/);
    assert.match(review, /Review required/);
    assert.match(review, new RegExp(item.diagnosisLabel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
    find(node => node.tagName === "BUTTON" && node.textContent === "Back to case list")[0].dispatch("click");
  }
  const ordered = data.curriculum.entries.slice().sort((a, b) => a.order - b.order);
  assert.notEqual(ordered[13].caseId, "case-g18-11");
  assert.equal(ordered[13].caseId, "case-g18-10");
  assert.equal(ordered[14].caseId, "case-g18-11");
});

test("reviewer workspace is generated from case data and stays review required", () => {
  const data = loadCaseData();
  const html = renderDocument(data);
  const file = fs.readFileSync(path.join(root, "academy-review.html"), "utf8");
  assert.equal(file, html);
  assert.match(file, /Review required/);
  assert.match(file, /Not clinician reviewed/);
  assert.doesNotMatch(file, /clinician reviewed on/);
  assert.match(file, /case-g18-12/);
  assert.match(file, /case-ak-field-hand/);
  assert.match(fs.readFileSync(path.join(root, "index.html"), "utf8"), /academy-review\.html/);
  assert.match(fs.readFileSync(path.join(root, "ACADEMY_AUTHORING.md"), "utf8"), /not a numeric score/i);
});
