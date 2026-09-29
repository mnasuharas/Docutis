const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const {
  caseFingerprint, loadCaseData, validateCaseData, allowedLicenses
} = require("../scripts/case");
const { buildPublicStatus, buildAssets } = require("../scripts/review-governance");

const root = path.join(__dirname, "..");

test("case registry validates unique IDs, disease links, provenance and local assets", () => {
  const cases = loadCaseData();
  assert.equal(cases.schemaVersion, 1);
  assert.ok(cases.cases.length >= 3);
  assert.doesNotThrow(() => validateCaseData(cases));
  const ids = new Set();
  for (const item of cases.cases) {
    assert.ok(!ids.has(item.id));
    ids.add(item.id);
    assert.equal(item.reviewStatus, "clinician review required");
    assert.equal(item.clinicalReview, null);
    assert.ok(item.observations.length >= 2);
    assert.ok(item.differentials.length >= 1);
    assert.ok(item.diseaseId);
    for (const image of item.images) {
      assert.ok(allowedLicenses.has(image.license));
      assert.equal(image.sourceVerificationStatus, "verified");
      assert.equal(image.patientIdentifiable, false);
      assert.ok(fs.existsSync(path.join(root, image.src)));
      assert.notEqual(image.license, "Project-owned");
    }
    assert.ok(/^sha256-v1:[0-9a-f]{64}$/.test(caseFingerprint(item)));
  }
});

test("case fingerprints ignore metadata check dates and review fields", () => {
  const item = structuredClone(loadCaseData().cases[0]);
  const base = caseFingerprint(item);
  item.images[0].metadataCheckedAt = "2099-01-01";
  item.images[0].accessDate = "2099-01-01";
  item.reviewStatus = "clinician review required";
  item.clinicalReview = null;
  assert.equal(caseFingerprint(item), base);
  item.observations[0].text = "Changed observation";
  assert.notEqual(caseFingerprint(item), base);
});

test("cases join Goal 9 public assets as review-required case units", () => {
  const status = buildPublicStatus();
  const caseAssets = status.assets.filter(item => item.assetType === "case");
  assert.equal(caseAssets.length, loadCaseData().cases.length);
  assert.ok(caseAssets.every(item => item.status === "review required"));
  assert.ok(buildAssets().some(item => item.assetType === "case"));
});

test("case UI shell and progressive disclosure controls exist", () => {
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const app = fs.readFileSync(path.join(root, "case-app.js"), "utf8");
  assert.match(html, /id="caseModule"/);
  assert.match(html, /href="#caseModule"/);
  assert.match(html, /src="case-data\.js"/);
  assert.match(html, /src="case-app\.js"/);
  assert.match(app, /Reveal diagnosis/);
  assert.match(app, /aria-expanded/);
  assert.match(app, /aria-live/);
  assert.match(app, /progressive|observations|differentials|teachingPoints/i);
});

test("case modules pass node syntax checks", () => {
  const { execFileSync } = require("node:child_process");
  for (const file of ["case-data.js", "case-app.js", "scripts/case.js"]) {
    execFileSync(process.execPath, ["--check", file], { cwd: root });
  }
});

const vm = require("node:vm");

class CaseElement {
  constructor(tag, document) {
    this.tagName = String(tag).toUpperCase();
    this.ownerDocument = document;
    this.children = [];
    this.attributes = {};
    this.className = "";
    this.textContent = "";
    this.style = {};
    this.hidden = false;
    this.disabled = false;
    this.open = false;
    this.value = "";
    this.tabIndex = 0;
    this.listeners = {};
  }
  appendChild(child) {
    this.children.push(child);
    if (child && typeof child === "object") child.parentElement = this;
    return child;
  }
  replaceChildren(...children) {
    this.children = [];
    children.forEach(child => this.appendChild(child));
  }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  getAttribute(name) { return this.attributes[name]; }
  addEventListener(type, listener) { (this.listeners[type] ||= []).push(listener); }
  dispatch(type, extra = {}) {
    const event = { type, key: extra.key, target: this, preventDefault() {} };
    for (const listener of this.listeners[type] || []) listener(event);
    return event;
  }
  focus() { this.ownerDocument.activeElement = this; }
  scrollBy() {}
}

function caseText(node) {
  if (!node) return "";
  const own = node.nodeType === 3 || !node.children || node.children.length === 0 ? (node.textContent || "") : "";
  return [own, ...(node.children || []).map(caseText)].join(" ");
}

function caseWalk(node, visit) {
  visit(node);
  for (const child of node.children || []) caseWalk(child, visit);
}

function caseFind(node, predicate) {
  const found = [];
  caseWalk(node, item => { if (predicate(item)) found.push(item); });
  return found;
}

function caseHarness(files) {
  const document = {
    activeElement: null,
    createElement(tag) { return new CaseElement(tag, document); },
    createTextNode(text) { return { nodeType: 3, textContent: String(text), children: [] }; },
    getElementById(id) { return id === "caseApp" ? document.root : null; }
  };
  document.root = new CaseElement("div", document);
  function Option(text, value) {
    const option = new CaseElement("option", document);
    option.textContent = String(text);
    option.value = value == null ? "" : String(value);
    return option;
  }
  const context = { window: {}, document, Option };
  for (const file of files) {
    vm.runInNewContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
  }
  return { document, root: document.root, window: context.window };
}

const caseUiFiles = ["data.js", "case-data.js", "review-status.js", "oss-feedback.js", "review-ui.js", "case-app.js"];

test("case learning flow hides diagnosis until reveal and keeps five cases review required", () => {
  const harness = caseHarness(caseUiFiles);
  const cases = harness.window.DOCUTIS_CASES.cases;
  assert.equal(cases.length, 5);
  assert.ok(cases.every(item => item.reviewStatus === "clinician review required" && item.clinicalReview === null));
  const listText = caseText(harness.root);
  for (const item of cases) assert.equal(listText.includes(item.diagnosisLabel), false);
  assert.match(listText, /Review required/);
  assert.match(listText, /5 cases shown/);

  const start = caseFind(harness.root, node => node.tagName === "BUTTON" && node.getAttribute("aria-label") === "Start case: Large plantar pigmented macule")[0];
  start.dispatch("click");
  let view = caseText(harness.root);
  assert.match(view, /Step 1 of 5: Inspect the image/);
  assert.match(view, /Zoom in/);
  assert.match(view, /Zoom out/);
  assert.match(view, /CC BY 4.0/);
  assert.doesNotMatch(view, /download|share image|reshare/i);
  assert.equal(view.includes("Acral lentiginous melanoma"), false);
  const zoomOut = caseFind(harness.root, node => node.tagName === "BUTTON" && node.textContent === "Zoom out")[0];
  const zoomIn = caseFind(harness.root, node => node.tagName === "BUTTON" && node.textContent === "Zoom in")[0];
  assert.equal(zoomOut.disabled, true);
  zoomIn.dispatch("click");
  assert.match(caseText(harness.root), /Image zoom 125 percent/);
  const viewport = caseFind(harness.root, node => node.className === "case-zoom-viewport")[0];
  viewport.dispatch("keydown", { key: "ArrowDown" });

  caseFind(harness.root, node => node.getAttribute && node.getAttribute("aria-label") === "Step 2 of 5: Observe")[0].dispatch("click");
  view = caseText(harness.root);
  assert.match(view, /Observation/);
  assert.match(view, /Interpretation/);
  assert.match(view, /No dermoscopic features are recorded for this case/);
  assert.equal(view.includes("Acral lentiginous melanoma"), false);

  caseFind(harness.root, node => node.getAttribute && node.getAttribute("aria-label") === "Step 3 of 5: Differential")[0].dispatch("click");
  const details = caseFind(harness.root, node => node.tagName === "DETAILS" && node.className === "case-disclosure")[0];
  assert.equal(details.open, false);
  assert.match(caseText(details), /Show recorded differentials/);
  assert.match(caseText(harness.root), /not a scored quiz/);

  caseFind(harness.root, node => node.getAttribute && node.getAttribute("aria-label") === "Step 5 of 5: Review")[0].dispatch("click");
  view = caseText(harness.root);
  assert.match(view, /still hidden/);
  assert.equal(view.includes("Acral lentiginous melanoma"), false);

  caseFind(harness.root, node => node.getAttribute && node.getAttribute("aria-label") === "Step 4 of 5: Reveal")[0].dispatch("click");
  const reveal = caseFind(harness.root, node => node.tagName === "BUTTON" && node.textContent === "Reveal diagnosis")[0];
  assert.equal(reveal.getAttribute("aria-expanded"), "false");
  assert.equal(reveal.tagName, "BUTTON");
  assert.equal(caseText(harness.root).includes("Acral lentiginous melanoma"), false);
  reveal.dispatch("click");
  view = caseText(harness.root);
  assert.match(view, /Acral lentiginous melanoma/);
  assert.match(view, /Histopathology is the confirmation method recorded for this case/);
  const revealed = caseFind(harness.root, node => node.tagName === "BUTTON" && node.textContent === "Hide diagnosis")[0];
  assert.equal(revealed.getAttribute("aria-expanded"), "true");

  caseFind(harness.root, node => node.getAttribute && node.getAttribute("aria-label") === "Step 5 of 5: Review")[0].dispatch("click");
  view = caseText(harness.root);
  assert.match(view, /Teaching points/);
  assert.match(view, /Notice first/);
  assert.match(view, /Evidence type on record: Histopathology/);
  assert.match(view, /Review required/);
  assert.match(view, /Observation/);
  assert.match(view, /Interpretation/);

  caseFind(harness.root, node => node.tagName === "BUTTON" && node.textContent === "Back to case list")[0].dispatch("click");
  const bcc = caseFind(harness.root, node => node.tagName === "BUTTON" && node.getAttribute("aria-label") === "Start case: Nodular lesion dermatoscopy with vessels")[0];
  bcc.dispatch("click");
  caseFind(harness.root, node => node.getAttribute && node.getAttribute("aria-label") === "Step 2 of 5: Observe")[0].dispatch("click");
  view = caseText(harness.root);
  assert.match(view, /Arborizing \/ branching vessels/);
  assert.doesNotMatch(view, /No dermoscopic features are recorded/);
  caseFind(harness.root, node => node.getAttribute && node.getAttribute("aria-label") === "Step 4 of 5: Reveal")[0].dispatch("click");
  caseFind(harness.root, node => node.tagName === "BUTTON" && node.textContent === "Reveal diagnosis")[0].dispatch("click");
  caseFind(harness.root, node => node.getAttribute && node.getAttribute("aria-label") === "Step 5 of 5: Review")[0].dispatch("click");
  view = caseText(harness.root);
  assert.match(view, /Evidence type on record: Expert diagnosis/);
  assert.doesNotMatch(view, /Histopathology is the confirmation method recorded/);
  assert.match(view, /Review required/);
});

test("missing case data shows an empty state instead of invented content", () => {
  const document = {
    activeElement: null,
    createElement(tag) { return new CaseElement(tag, document); },
    createTextNode(text) { return { nodeType: 3, textContent: String(text), children: [] }; },
    getElementById(id) { return id === "caseApp" ? document.root : null; }
  };
  document.root = new CaseElement("div", document);
  const context = { window: { DOCUTIS_DATA: { diseases: [] } }, document, Option: function Option() { return new CaseElement("option", document); } };
  vm.runInNewContext(fs.readFileSync(path.join(root, "case-app.js"), "utf8"), context, { filename: "case-app.js" });
  const view = caseText(document.root);
  assert.match(view, /Case data did not load/);
  assert.doesNotMatch(view, /melanoma|basal cell|actinic/i);
});

test("case UI keeps zoom, reveal and noscript guards without a scored quiz", () => {
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const app = fs.readFileSync(path.join(root, "case-app.js"), "utf8");
  const css = fs.readFileSync(path.join(root, "style.css"), "utf8");
  assert.match(html, /<noscript>[\s\S]*Cases cannot be shown because JavaScript is unavailable/);
  assert.match(app, /=== "histopathology"/);
  assert.match(app, /aria-expanded/);
  assert.match(app, /Zoom in/);
  assert.match(app, /No dermoscopic features are recorded/);
  assert.doesNotMatch(app, /\.download|navigator\.share|your score|correct answer/i);
  assert.match(css, /\.case-step-tab:focus-visible/);
  assert.match(css, /\.case-zoom-viewport/);
  const statusFile = JSON.parse(fs.readFileSync(path.join(root, "review-status.json"), "utf8"));
  const built = buildPublicStatus();
  for (const id of ["actinic-keratosis", "basal-cell-carcinoma"]) {
    const published = statusFile.assets.find(item => item.id === id);
    const current = built.assets.find(item => item.id === id);
    assert.equal(current.status, "clinician reviewed");
    assert.equal(current.currentFingerprint, published.currentFingerprint);
    assert.equal(current.activeDecisionId, published.activeDecisionId);
  }
  const caseAssets = built.assets.filter(item => item.assetType === "case");
  assert.equal(caseAssets.length, 5);
  assert.ok(caseAssets.every(item => item.status === "review required"));
  assert.ok(caseAssets.every(item => {
    const published = statusFile.assets.find(asset => asset.assetType === "case" && asset.id === item.id);
    return published && published.currentFingerprint === item.currentFingerprint && published.status === "review required";
  }));
});
