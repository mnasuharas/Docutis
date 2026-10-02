const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const { loadCaseData, validateCaseData, caseFingerprint } = require("../scripts/case");
const { loadPatternData, deriveOccurrences, classifyPatternCoverage, buildAudit } = require("../scripts/pattern");

const root = path.join(__dirname, "..");
const allowedLicenses = new Set(["CC BY 4.0", "CC BY-SA 4.0", "CC0 1.0", "Public domain"]);
const PILOTS = [
  "case-acral-melanoma-plantar",
  "case-bcc-nodular-dermoscopy",
  "case-bcc-pigmented-dermoscopy",
  "case-ak-field-hand",
  "case-scc-ak-paraspinal"
];

test("Goal 21 cases resolve, stay review required, and do not auto-approve", () => {
  const data = loadCaseData();
  assert.doesNotThrow(() => validateCaseData(data));
  const added = data.cases.filter(item => item.id.startsWith("case-g21-"));
  assert.equal(added.length, 8);
  assert.equal(data.cases.length, 38);
  const patterns = loadPatternData();
  const canonical = new Set(patterns.patterns.map(item => item.id));
  const links = new Map(patterns.links.map(item => [item.casePatternId, item.canonicalId]));
  const comparisons = new Map(data.comparisons.map(item => [item.id, item]));
  for (const item of added) {
    assert.equal(item.reviewStatus, "clinician review required");
    assert.equal(item.clinicalReview, null);
    assert.equal(item.recordedScreeningDecision, null);
    assert.ok(item.compareWith.length >= 1);
    for (const image of item.images) {
      assert.ok(allowedLicenses.has(image.license), image.license);
      assert.equal(image.patientIdentifiable, false);
      assert.equal(image.sourceVerificationStatus, "verified");
      assert.ok(image.sourceUrl.startsWith("https://"));
      assert.ok(image.attribution.trim());
      assert.ok(fs.existsSync(path.join(root, image.src)));
      assert.doesNotMatch(image.src, /nevus|lentigo|melanoma|keratosis|angioma|sebaceous/i);
    }
    for (const pattern of item.patterns) {
      assert.notEqual(pattern.certainty, pattern.weight);
      assert.ok(pattern.certainty);
      assert.ok(pattern.weight);
      if (links.has(pattern.id)) assert.ok(canonical.has(links.get(pattern.id)), pattern.id);
    }
    for (const id of item.compareWith) {
      const row = comparisons.get(id);
      assert.ok(row, id);
      assert.ok(row.caseIdA === item.id || row.caseIdB === item.id);
      assert.ok(data.cases.some(other => other.id === row.caseIdA));
      assert.ok(data.cases.some(other => other.id === row.caseIdB));
    }
  }
  assert.equal(data.proposedProgression.hardCodedPath, false);
  assert.ok(data.screening.categories.some(item => item.id === "routine-benign-impression"));
  assert.ok(added.filter(item => {
    const teaching = data.teachingDiagnoses.find(record => record.id === item.diseaseId);
    return teaching && teaching.pole === "benign";
  }).every(item => item.recordedScreeningDecision !== "routine-benign-impression"));
});

test("one pattern does not infer malignancy, and benign cases are not automatically safe", () => {
  const grouped = deriveOccurrences();
  const color = grouped.get("color-variegation");
  const poles = new Set(color.map(item => item.pole));
  assert.ok(poles.has("benign"));
  assert.ok(poles.has("malignant"));
  const data = loadCaseData();
  for (const item of data.cases.filter(entry => data.teachingDiagnoses.some(record => record.id === entry.diseaseId))) {
    assert.equal(item.recordedScreeningDecision, null);
    assert.equal(item.clinicalReview, null);
  }
  const coverage = classifyPatternCoverage();
  const flat = coverage.find(item => item.id === "flat-brown-macule");
  assert.equal(flat.educationalRole, "descriptive_morphology");
  assert.equal(flat.occurrenceStatus, "contrastive_coverage");
  assert.equal(flat.contrastiveCoverage, false);
  const scale = coverage.find(item => item.id === "measuring-scale-in-frame");
  assert.equal(scale.educationalRole, "image_artifact_or_annotation");
  assert.equal(scale.occurrenceStatus, "contrastive_coverage");
  assert.equal(scale.contrastiveCoverage, false);
  assert.equal(scale.broadCoverage, false);
  assert.equal(scale.countsTowardDermoscopyCoverage, false);
  const audit = buildAudit();
  assert.equal(audit.cases.filter(item => item.pole === "benign").length, 10);
  assert.ok(audit.comparisons.length >= 9);
  assert.equal(audit.spectrum.find(item => item.id === "dermatofibroma").count, 0);
  assert.equal(audit.spectrum.find(item => item.id === "lichenoid-keratosis").count, 0);
  assert.equal(audit.adequateRepetitionClaim, false);
});

test("Goal 20 pilot fingerprints stay the published review-required values", () => {
  const data = loadCaseData();
  const status = JSON.parse(fs.readFileSync(path.join(root, "review-status.json"), "utf8"));
  for (const id of PILOTS) {
    const item = data.cases.find(entry => entry.id === id);
    const published = status.assets.find(asset => asset.assetType === "case" && asset.id === id);
    assert.equal(caseFingerprint(item), published.currentFingerprint);
    assert.equal(published.status, "review required");
    assert.equal(item.clinicalReview, null);
  }
  for (const id of ["actinic-keratosis", "basal-cell-carcinoma"]) {
    const asset = status.assets.find(item => item.id === id);
    assert.equal(asset.status, "clinician reviewed");
  }
});

test("compare-with text stays hidden until the current diagnosis is revealed", () => {
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
  const start = find(node => node.tagName === "BUTTON" && node.getAttribute("aria-label") === "Start case: Rough brown papule")[0];
  start.dispatch("click");
  assert.doesNotMatch(text(document.root), /Compare with/);
  assert.doesNotMatch(text(document.root), /Shared features/);
  find(node => node.getAttribute && node.getAttribute("aria-label") === "Step 4 of 5: Reveal")[0].dispatch("click");
  assert.doesNotMatch(text(document.root), /Compare with/);
  find(node => node.tagName === "BUTTON" && node.textContent === "Reveal diagnosis")[0].dispatch("click");
  const offer = find(node => node.tagName === "BUTTON" && node.textContent === "Compare with: Lesion with several dark colors")[0];
  assert.ok(offer);
  assert.doesNotMatch(offer.textContent, /melanoma|keratosis/i);
  assert.doesNotMatch(text(document.root), /Shared features/);
  offer.dispatch("click");
  assert.match(text(document.root), /Shared features/);
  assert.match(text(document.root), /Features favouring this case/);
  assert.match(text(document.root), /No single discriminator is stored|Most useful discriminator/);
  const open = find(node => node.tagName === "BUTTON" && node.textContent === "Open case: Lesion with several dark colors")[0];
  open.dispatch("click");
  assert.match(text(document.root), /Lesion with several dark colors/);
  assert.doesNotMatch(text(document.root), /Diagnosis revealed/);
  assert.doesNotMatch(text(document.root), /Compare with/);
});
