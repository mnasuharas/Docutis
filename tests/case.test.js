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
  setSelectionRange(start, end) {
    this.selectionStart = start;
    this.selectionEnd = end;
  }
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
  const diseaseNames = harness.window.DOCUTIS_DATA.diseases.map(item => item.name).filter(Boolean);
  for (const name of diseaseNames) assert.equal(listText.includes(name), false, `case list leaked disease name: ${name}`);
  assert.doesNotMatch(listText, /Linked condition/);
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

function accessibleCaseNames(node) {
  const names = [];
  caseWalk(node, item => {
    if (!item || item.nodeType === 3) return;
    if (item.tagName === "IMG" && item.alt) names.push(item.alt);
    if (item.tagName === "FIGCAPTION") names.push(item.textContent || "");
    const aria = item.getAttribute && item.getAttribute("aria-label");
    if (aria) names.push(aria);
    if (item.tagName === "BUTTON" || item.tagName === "SUMMARY") names.push(item.textContent || "");
  });
  return names.join("\n");
}

function assertTextAbsent(blob, phrase, context) {
  const needle = String(phrase || "").trim();
  if (needle.length < 4) return;
  assert.equal(
    blob.toLocaleLowerCase("en").includes(needle.toLocaleLowerCase("en")),
    false,
    `${context} exposed "${needle}"`
  );
}

test("inspect image alts and control names hide diagnosis variants until reveal", () => {
  const harness = caseHarness(caseUiFiles);
  const cases = harness.window.DOCUTIS_CASES.cases;
  const diseases = harness.window.DOCUTIS_DATA.diseases;
  const sharedVariants = [
    "actinic keratosis",
    "actinic keratoses",
    "field cancerization",
    "squamous cell carcinoma",
    "basal cell carcinoma",
    "acral lentiginous melanoma"
  ];
  const publishedDiagnosisAlts = {
    "case-ak-field-hand": "Clinical photograph of the dorsum of a hand showing multiple rough erythematous and keratotic spots consistent with actinic keratoses and field cancerization.",
    "case-scc-ak-paraspinal": "Clinical photograph of the left upper paraspinal back showing a marked lesion labeled as well-differentiated squamous cell carcinoma beside an adjacent actinic keratosis."
  };

  function openCase(item) {
    const back = caseFind(harness.root, node => node.tagName === "BUTTON" && node.textContent === "Back to case list")[0];
    if (back) back.dispatch("click");
    const start = caseFind(harness.root, node => node.getAttribute && node.getAttribute("aria-label") === `Start case: ${item.title}`)[0];
    assert.ok(start, item.id);
    start.dispatch("click");
  }

  for (const item of cases) {
    const disease = diseases.find(entry => entry.id === item.diseaseId);
    openCase(item);
    const names = accessibleCaseNames(harness.root);
    const img = caseFind(harness.root, node => node.tagName === "IMG")[0];
    assert.ok(img && img.alt, `${item.id} image alt`);
    assert.notEqual(img.alt, "");
    assert.notEqual(img.getAttribute("role"), "presentation");
    const forbidden = [
      item.diagnosisLabel,
      item.diagnosticGroundTruth && item.diagnosticGroundTruth.confirmedDiagnosis,
      disease && disease.name,
      ...sharedVariants
    ];
    const recordedName = [item.diagnosisLabel, item.diagnosticGroundTruth && item.diagnosticGroundTruth.confirmedDiagnosis, disease && disease.name].join(" ");
    if (/\bmelanoma\b/i.test(recordedName)) forbidden.push("melanoma");
    for (const phrase of forbidden) assertTextAbsent(names, phrase, item.id);

    if (item.id === "case-acral-melanoma-plantar") {
      assert.equal(img.alt, item.images[0].alt);
    }
    if (publishedDiagnosisAlts[item.id]) {
      assert.notEqual(img.alt, item.images[0].alt);
      assert.notEqual(img.alt, publishedDiagnosisAlts[item.id]);
      const kind = item.images[0].type === "clinical" ? "Clinical photograph" : "Image";
      const site = item.patientContext.anatomicalSite;
      assert.ok(img.alt.startsWith(`${kind}, ${site}. Recorded observations: `), img.alt);
      for (const observation of item.observations) assert.ok(img.alt.includes(observation.text), observation.text);
      for (const interpretation of item.interpretations || []) {
        assert.equal(img.alt.includes(interpretation.text), false, interpretation.text);
      }
      assert.match(img.alt, /keratotic/);
      assert.doesNotMatch(img.alt, /\bkeratosis(?:es)?\b/i);
    }

    caseFind(harness.root, node => node.getAttribute && node.getAttribute("aria-label") === "Step 4 of 5: Reveal")[0].dispatch("click");
    assert.equal(caseText(harness.root).includes(item.diagnosisLabel), false, `${item.id} label visible before reveal`);
    caseFind(harness.root, node => node.tagName === "BUTTON" && node.textContent === "Reveal diagnosis")[0].dispatch("click");
    const revealed = caseText(harness.root);
    assert.match(revealed, /Diagnosis revealed/);
    assert.ok(revealed.includes(item.diagnosisLabel), item.id);
  }
});

test("site filter keeps focus and typed characters across list refresh", () => {
  const harness = caseHarness(caseUiFiles);
  const siteFilter = () => caseFind(harness.root, node => node.getAttribute && node.getAttribute("data-filter-key") === "anatomicalSite")[0];
  let filter = siteFilter();
  assert.equal(filter.getAttribute("aria-label"), "Site contains");
  filter.focus();
  filter.value = "h";
  filter.selectionStart = 1;
  filter.selectionEnd = 1;
  filter.dispatch("input");
  filter = siteFilter();
  assert.equal(harness.document.activeElement, filter);
  assert.equal(filter.getAttribute("data-filter-key"), "anatomicalSite");
  assert.equal(filter.value, "h");
  assert.equal(filter.selectionStart, 1);
  filter.value = "ha";
  filter.selectionStart = 2;
  filter.selectionEnd = 2;
  filter.dispatch("input");
  filter = siteFilter();
  assert.equal(harness.document.activeElement, filter);
  assert.equal(filter.value, "ha");
  assert.equal(filter.selectionStart, 2);
  filter.value = "hand";
  filter.selectionStart = 4;
  filter.selectionEnd = 4;
  filter.dispatch("input");
  filter = siteFilter();
  assert.equal(filter.value, "hand");
  assert.match(caseText(harness.root), /1 case shown/);
  assert.match(caseText(harness.root), /Field change on the dorsum of the hand/);
  const diseaseNames = harness.window.DOCUTIS_DATA.diseases.map(item => item.name).filter(Boolean);
  const listText = caseText(harness.root);
  for (const name of diseaseNames) assert.equal(listText.includes(name), false, name);

  filter.value = "";
  filter.selectionStart = 0;
  filter.selectionEnd = 0;
  filter.dispatch("input");
  const typeFilter = () => caseFind(harness.root, node => node.getAttribute && node.getAttribute("data-filter-key") === "caseType")[0];
  let select = typeFilter();
  select.focus();
  select.value = "dermoscopic";
  select.dispatch("change");
  select = typeFilter();
  assert.equal(harness.document.activeElement, select);
  assert.equal(select.getAttribute("data-filter-key"), "caseType");
  assert.equal(select.value, "dermoscopic");
  assert.match(caseText(harness.root), /2 cases shown/);
  assert.doesNotMatch(caseText(harness.root), /Linked condition|Actinic Keratosis|Basal Cell Carcinoma|Squamous Cell Carcinoma|Acral Melanoma/);
});

test("explicit diagnosis confirmations stay hidden until reveal and remain available afterward", () => {
  const harness = caseHarness(caseUiFiles);
  const cases = harness.window.DOCUTIS_CASES.cases;
  const expectations = [
    {
      id: "case-acral-melanoma-plantar",
      hidden: [
        "This published case was histopathologically confirmed as acral lentiginous melanoma."
      ],
      kept: ["Acral lentiginous melanoma", "raises concern for acral melanoma"]
    },
    {
      id: "case-bcc-nodular-dermoscopy",
      hidden: [
        "Author-labeled nodular BCC; vascular clues are the teaching focus.",
        "Classic arborizing BCC-type vessels and translucent BCC pattern favor BCC in this labeled example"
      ],
      kept: [
        "Basal cell carcinoma (nodular)",
        "associated with basal cell carcinoma",
        "Vascular clues are the teaching focus.",
        "Classic arborizing BCC-type vessels and translucent BCC pattern favor BCC"
      ]
    },
    {
      id: "case-bcc-pigmented-dermoscopy",
      hidden: [
        "Author-labeled pigmented BCC; emphasize BCC pigment structures vs melanocytic network."
      ],
      kept: [
        "Pigmented basal cell carcinoma",
        "Pigmented BCC often shows",
        "Emphasize BCC pigment structures vs melanocytic network."
      ]
    },
    {
      id: "case-ak-field-hand",
      hidden: [
        "Multiple AKs on a sun-damaged field illustrate field cancerization rather than an isolated keratosis.",
        "Discrete grit-like keratotic AKs on photoaged skin differ from diffuse eczematous plaques"
      ],
      kept: [
        "Actinic keratoses / field cancerization",
        "Multiple rough spots on a sun-damaged field illustrate field change rather than an isolated lesion.",
        "Discrete grit-like keratotic spots on photoaged skin differ from diffuse eczematous plaques"
      ]
    },
    {
      id: "case-scc-ak-paraspinal",
      hidden: [
        "The pairing illustrates the AK\u2013SCC continuum: a more concerning hypertrophic focus beside an adjacent actinic keratosis in damaged skin.",
        "Uploader SCC label",
        "Primary teaching diagnosis for the marked lesion per source caption.",
        "Source caption specifies well-differentiated SCC for the marked lesion",
        "Adjacent AK supports continuum teaching without merging both labels into one lesion."
      ],
      kept: [
        "Cutaneous squamous cell carcinoma",
        "Actinic keratosis (adjacent)",
        "A more concerning hypertrophic focus sits beside an adjacent flatter keratotic change in damaged skin.",
        "Hypertrophic marked focus",
        "A neighboring flatter keratotic change supports continuum teaching without merging both findings into one lesion."
      ]
    }
  ];

  function openCase(item) {
    const back = caseFind(harness.root, node => node.tagName === "BUTTON" && node.textContent === "Back to case list")[0];
    if (back) back.dispatch("click");
    const start = caseFind(harness.root, node => node.getAttribute && node.getAttribute("aria-label") === `Start case: ${item.title}`)[0];
    assert.ok(start, item.id);
    start.dispatch("click");
  }

  function showStep(label) {
    const tab = caseFind(harness.root, node => node.getAttribute && node.getAttribute("aria-label") === label)[0];
    assert.ok(tab, label);
    tab.dispatch("click");
    return caseText(harness.root);
  }

  assert.equal(expectations.length, 5);
  for (const expected of expectations) {
    const item = cases.find(entry => entry.id === expected.id);
    assert.ok(item, expected.id);
    openCase(item);
    const before = [
      showStep("Step 1 of 5: Inspect"),
      showStep("Step 2 of 5: Observe"),
      showStep("Step 3 of 5: Differential")
    ].join("\n");
    for (const phrase of expected.hidden) {
      assert.equal(before.includes(phrase), false, `${expected.id} showed "${phrase}" before reveal`);
    }
    for (const phrase of expected.kept) {
      assert.equal(before.includes(phrase), true, `${expected.id} lost "${phrase}" before reveal`);
    }
    showStep("Step 4 of 5: Reveal");
    assert.equal(caseText(harness.root).includes(item.diagnosisLabel), false, `${expected.id} label visible before reveal`);
    for (const phrase of expected.hidden) {
      assert.equal(caseText(harness.root).includes(phrase), false, `${expected.id} showed "${phrase}" on the closed reveal step`);
    }
    const reveal = caseFind(harness.root, node => node.tagName === "BUTTON" && node.textContent === "Reveal diagnosis")[0];
    assert.ok(reveal, expected.id);
    reveal.dispatch("click");
    const revealed = caseText(harness.root);
    assert.equal(revealed.includes(item.diagnosisLabel), true, `${expected.id} diagnosis label`);
    for (const phrase of expected.hidden) {
      assert.equal(revealed.includes(phrase), true, `${expected.id} dropped "${phrase}" after reveal`);
    }
    const review = showStep("Step 5 of 5: Review");
    assert.equal(review.includes(item.diagnosisLabel), true, `${expected.id} review label`);
    for (const phrase of expected.hidden) {
      assert.equal(review.includes(phrase), true, `${expected.id} review dropped "${phrase}"`);
    }
  }
});
