const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const { loadCaseData, validateCaseData, caseFingerprint } = require("../scripts/case");
const { loadPatternData, classifyPatternCoverage } = require("../scripts/pattern");
const { validatePairProvenance, buildPairedMetrics, auditFeatureTaxonomy } = require("../scripts/paired-modality");

const root = path.join(__dirname, "..");

test("pair provenance is required and unrelated images cannot become a silent pair", () => {
  const data = loadCaseData();
  assert.doesNotThrow(() => validatePairProvenance(data));
  assert.equal(data.pairProvenance.length, data.cases.length);
  const paired = data.pairProvenance.filter(row => row.provenance !== "not_paired");
  assert.equal(JSON.stringify(paired.map(row => row.caseId)), JSON.stringify(["case-g21-08", "case-g24-01", "case-g24-02", "case-g25-01", "case-g25-02", "case-g25-03", "case-g25-04", "case-g25-05", "case-g25-06", "case-g26-01", "case-g26-02", "case-g26-03", "case-g26-04", "case-g26-05", "case-g26-06", "case-g26-07", "case-g27-01", "case-g27-02", "case-g27-03", "case-g27-04", "case-g27-05", "case-g27-06"]));
  assert.equal(paired[0].provenance, "source_documented_pair");
  for (const id of ["case-g18-10", "case-g18-11", "case-g21-02", "case-g21-03"]) {
    assert.equal(data.pairProvenance.find(row => row.caseId === id).provenance, "not_paired", id);
  }
  const broken = structuredClone(data);
  const row = broken.pairProvenance.find(item => item.caseId === "case-g21-08");
  row.provenance = "not_paired";
  assert.throws(() => validatePairProvenance(broken), /silent pair|cannot be stored as a silent pair/);
  const serialized = JSON.parse(JSON.stringify(data.pairProvenance));
  assert.deepEqual(serialized, JSON.parse(JSON.stringify(data.pairProvenance)));
  assert.equal(serialized.find(item => item.caseId === "case-g21-08").clinicalImageIds[0], "img-g21-08a");
  assert.equal(serialized.find(item => item.caseId === "case-g21-08").dermoscopicImageIds[0], "img-g21-08b");
});

test("licenses, review, and localization stay honest", () => {
  const data = loadCaseData();
  assert.doesNotThrow(() => validateCaseData(data));
  assert.doesNotThrow(() => auditFeatureTaxonomy());
  for (const item of data.cases) {
    assert.equal(item.clinicalReview, null, item.id);
    assert.equal(item.reviewStatus, "clinician review required", item.id);
    if (Object.prototype.hasOwnProperty.call(item, "recordedScreeningDecision")) {
      assert.equal(item.recordedScreeningDecision, null, item.id);
    }
    if (Object.prototype.hasOwnProperty.call(item, "localization")) assert.equal(item.localization, null, item.id);
    for (const image of item.images) {
      assert.ok(["CC BY 4.0", "CC BY-SA 4.0", "CC0 1.0", "Public domain"].includes(image.license), image.id);
      for (const key of ["roi", "bbox", "polygon", "crop"]) {
        if (Object.prototype.hasOwnProperty.call(image, key)) assert.equal(image[key], null, image.id);
      }
    }
  }
  const illegal = structuredClone(data);
  illegal.cases[0].images[0].license = "CC BY-NC 4.0";
  assert.throws(() => validateCaseData(illegal), /license/);
});

test("clinical images cannot claim dermoscopic structures, and artifacts stay out of diagnostic coverage", () => {
  const data = loadCaseData();
  const patterns = loadPatternData();
  const byId = new Map(patterns.patterns.map(item => [item.id, item]));
  const links = new Map(patterns.links.map(item => [item.casePatternId, item.canonicalId]));
  for (const item of data.cases) {
    const hasDermoscopy = item.images.some(image => image.type === "dermoscopy");
    for (const pattern of item.patterns || []) {
      const canonical = byId.get(links.get(pattern.id));
      if (!canonical) continue;
      if (!hasDermoscopy && canonical.category === "dermoscopic-structure" && (pattern.certainty === "clearly_visible" || pattern.certainty === "probably")) {
        assert.fail(`${item.id} claims ${canonical.id} without a dermoscopic asset`);
      }
    }
  }
  const metrics = buildPairedMetrics(data);
  for (const id of metrics.artifactIdsExcluded) {
    assert.equal(metrics.diagnosticStructuresWithMoreThanOnePositiveExample.includes(id), false, id);
    assert.equal(metrics.structuresInBenignAndMalignantContexts.includes(id), false, id);
  }
  const coverage = classifyPatternCoverage();
  for (const id of ["marker-ink", "measuring-scale-in-frame", "printed-pointer", "printed-circle-and-scale"]) {
    const pattern = coverage.find(item => item.id === id);
    assert.equal(pattern.educationalRole, "image_artifact_or_annotation");
    assert.equal(pattern.countsTowardDermoscopyCoverage, false);
    assert.equal(pattern.broadCoverage, false);
  }
  assert.equal(JSON.stringify(metrics.paired), JSON.stringify(["case-g21-08", "case-g24-01", "case-g24-02", "case-g25-01", "case-g25-02", "case-g25-03", "case-g25-04", "case-g25-05", "case-g25-06", "case-g26-01", "case-g26-02", "case-g26-03", "case-g26-04", "case-g26-05", "case-g26-06", "case-g26-07", "case-g27-01", "case-g27-02", "case-g27-03", "case-g27-04", "case-g27-05", "case-g27-06"]));
  assert.equal(JSON.stringify(metrics.pairedMelanoma), JSON.stringify(["case-g24-01", "case-g24-02", "case-g25-01", "case-g25-03", "case-g25-04", "case-g25-05", "case-g26-01", "case-g26-03", "case-g26-07", "case-g27-03", "case-g27-04"]));
  assert.equal(JSON.stringify(metrics.pairedMelanomaWithHistopathology), JSON.stringify(["case-g25-01", "case-g25-03", "case-g25-04", "case-g25-05", "case-g26-01", "case-g26-03", "case-g27-03", "case-g27-04"]));
  assert.equal(JSON.stringify(metrics.melanomaWithHistopathology), JSON.stringify(["case-acral-melanoma-plantar", "case-g25-01", "case-g25-03", "case-g25-04", "case-g25-05", "case-g26-01", "case-g26-03", "case-g27-03", "case-g27-04"]));
  assert.equal(JSON.stringify(metrics.specialSiteCasesWithDermoscopy), JSON.stringify(["case-g24-01", "case-g25-04", "case-g25-05", "case-g25-06", "case-g26-01", "case-g26-02", "case-g26-03", "case-g26-04", "case-g26-05", "case-g26-06", "case-g26-07", "case-g27-01", "case-g27-02", "case-g27-03", "case-g27-04", "case-g27-05", "case-g27-06"]));
  const cheek = data.cases.find(item => item.id === "case-g21-07");
  assert.match(cheek.patientContext.anatomicalSite, /cheek/i);
  assert.equal(cheek.images.some(image => image.type === "dermoscopy"), false);
});

test("Goal 22 single-image behavior and pilot fingerprints stay", () => {
  const data = loadCaseData();
  const status = JSON.parse(fs.readFileSync(path.join(root, "review-status.json"), "utf8"));
  for (const id of ["case-acral-melanoma-plantar", "case-bcc-nodular-dermoscopy", "case-bcc-pigmented-dermoscopy", "case-ak-field-hand", "case-scc-ak-paraspinal"]) {
    const item = data.cases.find(entry => entry.id === id);
    assert.equal(caseFingerprint(item), status.assets.find(asset => asset.assetType === "case" && asset.id === id).currentFingerprint);
    assert.equal(item.pairedModality, undefined);
  }
  assert.equal(data.cases.length, 51);
});

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
    this.loading = "";
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
  setSelectionRange() {}
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
  for (const file of files) vm.runInNewContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
  return { document, root: document.root };
}

test("opening dermoscopy hides the diagnosis and keeps observations modality-specific", () => {
  const files = ["data.js", "pattern-data.js", "case-data.js", "review-status.js", "oss-feedback.js", "review-ui.js", "case-app.js"];
  const harness = caseHarness(files);
  const start = caseFind(harness.root, node => node.tagName === "BUTTON" && node.getAttribute("aria-label") === "Start case: A group of papules on the chest")[0];
  assert.ok(start);
  start.dispatch("click");
  let images = caseFind(harness.root, node => node.tagName === "IMG");
  assert.equal(images.length, 1);
  assert.match(images[0].src, /clinical/);
  assert.doesNotMatch(caseText(harness.root), /Sebaceous hyperplasia/i);
  assert.match(caseText(harness.root), /clinical photograph only/i);
  const show = caseFind(harness.root, node => node.tagName === "BUTTON" && node.textContent === "Show dermoscopy")[0];
  assert.equal(show.getAttribute("aria-expanded"), "false");
  assert.equal(show.getAttribute("aria-controls"), "caseDermoscopyPanel");
  const panel = caseFind(harness.root, node => node.id === "caseDermoscopyPanel")[0];
  assert.equal(panel.hidden, true);
  show.dispatch("click");
  assert.equal(harness.document.activeElement && harness.document.activeElement.textContent, "Hide dermoscopy");
  images = caseFind(harness.root, node => node.tagName === "IMG");
  assert.equal(images.length, 2);
  assert.ok(images.some(image => /dermoscopy/.test(image.src)));
  assert.ok(images.some(image => /clinical/.test(image.src)));
  const openText = caseText(harness.root);
  assert.doesNotMatch(openText, /Sebaceous hyperplasia/i);
  assert.match(openText, /clinical photograph and dermoscopic image/i);
  assert.match(openText, /not a validated metric/i);
  caseFind(harness.root, node => node.getAttribute && node.getAttribute("aria-label") === "Step 2 of 5: Observe")[0].dispatch("click");
  const closed = caseHarness(files);
  caseFind(closed.root, node => node.tagName === "BUTTON" && node.getAttribute("aria-label") === "Start case: A group of papules on the chest")[0].dispatch("click");
  caseFind(closed.root, node => node.getAttribute && node.getAttribute("aria-label") === "Step 2 of 5: Observe")[0].dispatch("click");
  assert.doesNotMatch(caseText(closed.root), /clustered yellow-white lobules/i);
  assert.match(caseText(closed.root), /skin-colored papules/i);
  const opened = harness;
  assert.match(caseText(opened.root), /clustered yellow-white lobules/i);
  assert.doesNotMatch(caseText(opened.root), /Sebaceous hyperplasia/i);
  caseFind(harness.root, node => node.getAttribute && node.getAttribute("aria-label") === "Step 4 of 5: Reveal")[0].dispatch("click");
  assert.doesNotMatch(caseText(harness.root), /Sebaceous hyperplasia/i);
  caseFind(harness.root, node => node.tagName === "BUTTON" && node.textContent === "Reveal diagnosis")[0].dispatch("click");
  assert.match(caseText(harness.root), /Sebaceous hyperplasia/i);
  caseFind(harness.root, node => node.getAttribute && node.getAttribute("aria-label") === "Step 5 of 5: Review")[0].dispatch("click");
  const review = caseText(harness.root);
  assert.match(review, /Pair provenance: Source-documented paired view/);
  assert.match(review, /Clinical clue/);
  assert.match(review, /Dermoscopic clue/);
  assert.match(review, /Added information/);
  assert.match(review, /Diagnostic conflict: none stored/);
  assert.match(review, /Teaching rule/);
  assert.match(review, /Modality: dermoscopic image/);
  assert.match(review, /Image marks stay in the context section/);
});
