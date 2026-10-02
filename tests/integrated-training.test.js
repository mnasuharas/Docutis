const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const engine = require("../training-engine.js");
const { loadAll, buildContext, validateCompositions, renderReport } = require("../scripts/training");
const { loadPatternData, buildAudit, specialSite } = require("../scripts/pattern");
const { buildPublicStatus } = require("../scripts/review-governance");

const root = path.join(__dirname, "..");
const clone = value => JSON.parse(JSON.stringify(value));
const BLUEPRINTS = ["mixed-screening", "melanoma-and-mimics", "special-sites"];
const REVIEWED_FINGERPRINTS = {
  "actinic-keratosis": "sha256-v1:92302d680f4c645cc1a91c9a827a3e44b0d965fa21fa019144458bd81c27a1dd",
  "basal-cell-carcinoma": "sha256-v1:fbc2b272331822060c656dd0680da07e9131ecd3f59f071a71273748f14ad65f",
  "bcc-dermoscopy": "sha256-v1:f4b9487215a415cfbbc159b5b1de4a64e77b27d816559b119a32e111276db338",
  "bcc-clues-schematic": "sha256-v1:0d45d6d602b890b47548da1e708be5d3f365540b0a2b49240763504bfd6e0471",
  "basal-cell-carcinoma-de": "sha256-v1:25cbf04b711b308ca456ab8b67a29bd056d3ccb69c0f404e285adaf8ab92c02e"
};
const SCORE_WORDS = /\b(?:accuracy|accurate|correct|incorrect|points|xp|rank(?:ed|ing)?|grade[ds]?|percent(?:age)?|sensitivity|specificity|auc|calibration|mastery|pass(?:ed)?|fail(?:ed|ure)?|certif(?:y|ied|icate))\b|\d+(?:\.\d+)?\s*%/i;

// A score word may appear only inside a sentence that negates it ("not a score").
function assertNoScoreClaims(text, label) {
  for (const sentence of String(text).split(/(?<=[.!?])\s+|\n/)) {
    if (SCORE_WORDS.test(sentence)) assert.match(sentence, /\b(?:not|no|never|nor)\b/i, `${label || "text"}: ${sentence}`);
  }
}

function escape(value) { return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

function sessionsFor(context, blueprintId, seeds = 40) {
  const result = [];
  for (const length of engine.availableLengths(context, blueprintId)) {
    for (let seed = 0; seed < seeds; seed += 1) result.push(engine.composeSession(context, { blueprintId, lengthId: length.id, seed }));
  }
  return result;
}

class Node {
  constructor(tag, doc) {
    this.tagName = String(tag).toUpperCase();
    this.ownerDocument = doc;
    this.children = [];
    this.attributes = {};
    this.listeners = {};
    this.textContent = "";
    this.className = "";
    this.hidden = false;
    this.disabled = false;
    this.checked = false;
    this.value = "";
    this.id = "";
  }
  appendChild(child) { this.children.push(child); child.parentNode = this; return child; }
  replaceChildren(...children) { this.children = []; children.forEach(child => this.appendChild(child)); }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  getAttribute(name) { return Object.prototype.hasOwnProperty.call(this.attributes, name) ? this.attributes[name] : null; }
  addEventListener(type, listener) { (this.listeners[type] ||= []).push(listener); }
  dispatch(type) { for (const listener of this.listeners[type] || []) listener({ type, target: this, preventDefault() {} }); }
  focus() { this.ownerDocument.activeElement = this; }
}

function createApp(seedValues) {
  const doc = { activeElement: null };
  doc.createElement = tag => new Node(tag, doc);
  doc.root = doc.createElement("div");
  doc.getElementById = id => (id === "trainingApp" ? doc.root : null);
  const seeds = [...seedValues];
  const window = {
    crypto: { getRandomValues(array) { array[0] = seeds.length ? seeds.shift() : 7; return array; } }
  };
  const context = { window, document: doc, Uint32Array, Date, Math, JSON };
  for (const file of ["data.js", "case-data.js", "pattern-data.js", "training-data.js", "training-engine.js", "training-app.js"]) {
    vm.runInNewContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
  }
  const walk = (node, visit) => { visit(node); node.children.forEach(child => walk(child, visit)); };
  const find = predicate => { const found = []; walk(doc.root, node => { if (predicate(node)) found.push(node); }); return found; };
  const buttonNamed = name => find(node => node.tagName === "BUTTON" && node.textContent === name)[0];
  // Visible text plus image alt text, without the fixed working-diagnosis option list.
  const visibleText = () => {
    const parts = [];
    const visit = node => {
      if (node.hidden) return;
      if (node.getAttribute("data-role") === "working-diagnosis") return;
      if (node.textContent) parts.push(node.textContent);
      if (node.tagName === "IMG") parts.push(node.alt);
      node.children.forEach(visit);
    };
    visit(doc.root);
    return parts.join(" \n");
  };
  const choose = (name, value) => {
    const input = find(node => node.tagName === "INPUT" && node.name === name && node.value === value)[0];
    assert.ok(input, `${name}=${value}`);
    input.checked = true;
    input.dispatch("change");
  };
  return { doc, window, find, buttonNamed, visibleText, choose, engine: window.DOCUTIS_TRAINING_ENGINE };
}

function preRevealChrome(text, trainingData) {
  let cleaned = text;
  // The learner chose the session focus, so its title is not a per-lesion hint.
  for (const item of [...trainingData.impressions, ...trainingData.families, ...trainingData.blueprints.map(blueprint => ({ label: blueprint.title }))]) cleaned = cleaned.split(item.label).join(" ");
  return cleaned;
}

test("engine site and pole helpers match the pattern audit", () => {
  const context = buildContext();
  const audit = buildAudit(loadPatternData());
  for (const row of audit.cases) {
    const caseItem = context.byId.get(row.id);
    assert.equal(engine.casePole(context, caseItem), row.pole, row.id);
    assert.equal(engine.specialSite(caseItem.patientContext.anatomicalSite), specialSite(caseItem.patientContext.anatomicalSite), row.id);
  }
});

test("eligibility sorts every case into core, context-only, or excluded with reasons", () => {
  const context = buildContext();
  const rows = [...context.eligibility.values()];
  assert.equal(rows.length, context.cases.length);
  for (const row of rows) {
    assert.ok(["core_training", "context_only", "excluded"].includes(row.status), row.caseId);
    if (row.status === "core_training") assert.deepEqual([...row.reasons], [], row.caseId);
    else assert.ok(row.reasons.length > 0, row.caseId);
  }
  const contextOnly = rows.filter(row => row.status === "context_only").map(row => row.caseId);
  for (const id of ["case-g18-12", "case-g22-01", "case-g26-07", "case-g27-06"]) {
    assert.ok(contextOnly.includes(id), id);
    assert.ok(context.eligibility.get(id).reasons.includes("nail-weak-verification"), id);
  }
  assert.ok(context.eligibility.get("case-g21-01").reasons.includes("multi-panel-plate"));
  for (const id of ["case-g24-01", "case-g24-02"]) assert.ok(context.eligibility.get(id).reasons.includes("equivocal-weak-pair"), id);
  // Clinical-diagnosis cases are not excluded wholesale.
  assert.ok(rows.some(row => row.status === "core_training" && row.confirmationMethod === "clinical_diagnosis"));
  // Histopathology-confirmed nail nevi pass; no nail melanoma is core.
  const coreNail = rows.filter(row => row.status === "core_training" && row.site === "nail");
  assert.ok(coreNail.length > 0);
  assert.ok(coreNail.every(row => row.histopathology && row.poleGroup === "benign"));
});

test("hard integrity failures exclude a case", () => {
  const data = loadAll();
  const forged = clone(data.caseData);
  const target = forged.cases.find(item => item.id === "case-g25-01");
  target.images[0].sourceVerificationStatus = "rejected";
  const second = forged.cases.find(item => item.id === "case-g25-03");
  second.diagnosticGroundTruth.confirmationMethod = "clinical_diagnosis";
  const third = forged.cases.find(item => item.id === "case-g26-02");
  third.clinicalReview = { reviewer: "nobody" };
  const context = engine.createContext(forged, data.diseaseData, data.patternData, data.trainingData);
  assert.equal(context.eligibility.get("case-g25-01").status, "excluded");
  assert.equal(context.eligibility.get("case-g25-03").status, "excluded");
  assert.ok(context.eligibility.get("case-g25-03").reasons.includes("histopathology-source-without-histopathology"));
  assert.equal(context.eligibility.get("case-g26-02").status, "excluded");
  for (const blueprint of BLUEPRINTS) {
    for (const session of sessionsFor(context, blueprint, 10)) {
      assert.ok(!session.items.some(item => ["case-g25-01", "case-g25-03", "case-g26-02"].includes(item.caseId)));
    }
  }
});

test("only core cases fill core slots and context cases cannot silently become core", () => {
  const context = buildContext();
  for (const blueprint of BLUEPRINTS) {
    const meta = context.trainingData.blueprints.find(item => item.id === blueprint);
    for (const session of sessionsFor(context, blueprint)) {
      for (const item of session.items) {
        const row = context.eligibility.get(item.caseId);
        if (item.role === "core") assert.equal(row.status, "core_training", item.caseId);
        else {
          assert.equal(item.role, "context");
          assert.equal(row.status, "context_only");
          assert.ok(row.reasons.every(reason => meta.contextReasons.includes(reason)), item.caseId);
        }
      }
      assert.ok(session.items.filter(item => item.role === "context").length <= meta.contextSlots);
    }
  }
  // Strengthening every other field does not lift a caption-only nail melanoma into core.
  const data = loadAll();
  const forged = clone(data.caseData);
  const nail = forged.cases.find(item => item.id === "case-g26-07");
  nail.differentials.push({ diagnosis: "Onychomycosis", supportingFeatures: [], contradictingFeatures: [], teachingDistinction: "x" });
  const strong = engine.createContext(forged, data.diseaseData, data.patternData, data.trainingData);
  assert.equal(strong.eligibility.get("case-g26-07").status, "context_only");
  assert.ok(!engine.blueprintPool(strong, "special-sites").core.some(item => item.id === "case-g26-07"));
  assert.doesNotThrow(() => validateCompositions(context));
});

test("composition is deterministic under a test seed and varies across seeds", () => {
  const context = buildContext();
  for (const blueprint of BLUEPRINTS) {
    const a = engine.composeSession(context, { blueprintId: blueprint, lengthId: "short", seed: 42 });
    const b = engine.composeSession(context, { blueprintId: blueprint, lengthId: "short", seed: 42 });
    assert.deepEqual(clone(a), clone(b));
    const distinct = new Set(Array.from({ length: 12 }, (_, seed) => engine.composeSession(context, { blueprintId: blueprint, lengthId: "short", seed }).items.map(item => item.caseId).join(",")));
    assert.ok(distinct.size > 3, blueprint);
  }
});

test("a session never repeats a case or a source group, and keeps both poles", () => {
  const context = buildContext();
  for (const blueprint of BLUEPRINTS) {
    for (const session of sessionsFor(context, blueprint)) {
      const ids = session.items.map(item => item.caseId);
      assert.equal(new Set(ids).size, ids.length);
      const groups = ids.map(id => context.groups.get(id));
      assert.equal(new Set(groups).size, groups.length);
      const core = session.items.filter(item => item.role === "core").map(item => context.eligibility.get(item.caseId).poleGroup);
      const min = Math.min(engine.minimumEach(core.length), 2);
      assert.ok(core.filter(pole => pole === "benign").length >= min, `${blueprint}: ${ids}`);
      assert.ok(core.filter(pole => pole === "malignant").length >= min, `${blueprint}: ${ids}`);
      for (let index = 1; index < ids.length; index += 1) {
        assert.notEqual(context.byId.get(ids[index]).diseaseId, context.byId.get(ids[index - 1]).diseaseId, `${blueprint}: back-to-back ${ids.join(",")}`);
      }
    }
  }
});

test("crops of one source lesion cannot appear as independent cases", () => {
  const data = loadAll();
  const forged = clone(data.caseData);
  const original = forged.cases.find(item => item.id === "case-g25-04");
  const copy = clone(original);
  copy.id = "case-g28-forged-crop";
  copy.slug = "forged-crop";
  copy.patterns = copy.patterns.map(pattern => ({ ...pattern, id: `${pattern.id}-forged` }));
  copy.images = copy.images.map(image => ({ ...image, id: `${image.id}-forged`, sourceUrl: "https://example.org/other-page" }));
  forged.cases.push(copy);
  const context = engine.createContext(forged, data.diseaseData, data.patternData, data.trainingData);
  assert.equal(context.groups.get("case-g25-04"), context.groups.get("case-g28-forged-crop"));
  for (const blueprint of BLUEPRINTS) {
    for (const session of sessionsFor(context, blueprint, 60)) {
      const ids = session.items.map(item => item.caseId);
      assert.ok(!(ids.includes("case-g25-04") && ids.includes("case-g28-forged-crop")), ids.join(","));
    }
  }
  const real = buildContext();
  assert.equal(real.groups.get("case-g25-01"), real.groups.get("case-g25-02"));
});

test("composition claims no prevalence and stays out of the learner's way", () => {
  const { trainingData } = loadAll();
  assert.match(trainingData.compositionNotice, /not for how often lesions occur/);
  assert.match(trainingData.compositionNotice, /prevalence/);
  const app = createApp([11]);
  const setup = app.visibleText();
  assert.match(setup, /Curated for education/);
  assertNoScoreClaims(setup, "setup");
  app.buttonNamed("Start session").dispatch("click");
  const first = app.visibleText();
  assert.match(first, /not for prevalence/);
  assert.doesNotMatch(first, /expected prevalence|reflects (?:real|screening)|positive predictive value of/i);
  const sources = ["training-app.js", "training-engine.js", "training-data.js"].map(file => fs.readFileSync(path.join(root, file), "utf8")).join("\n");
  assert.doesNotMatch(sources, /prevalence\s*[:=]|incidence\s*[:=]|weightByPrevalence/);
});

test("pre-reveal views hide diagnosis, pole, closest mimic, weights and comparisons for every eligible case", () => {
  const context = buildContext();
  for (const row of context.eligibility.values()) {
    if (row.status === "excluded") continue;
    const caseItem = context.byId.get(row.caseId);
    const view = engine.preRevealView(context, caseItem, 1, 5);
    const blob = JSON.stringify(view);
    assert.doesNotMatch(blob, engine.LEAK_PATTERN, row.caseId);
    assert.doesNotMatch(blob, new RegExp(escape(caseItem.diagnosisLabel), "i"), row.caseId);
    if (caseItem.closestMimic) assert.doesNotMatch(blob, new RegExp(escape(caseItem.closestMimic.name), "i"), row.caseId);
    for (const key of ["diagnosisLabel", "pole", "closestMimic", "patterns", "weight", "certainty", "comparisons", "compareWith", "diagnosticGroundTruth", "category", "presentationNotes", "sourceUrl", "caption"]) {
      assert.ok(!blob.includes(`"${key}"`), `${row.caseId}: ${key}`);
    }
    for (const image of [...view.firstImages, ...view.dermoscopyImages]) {
      assert.match(image.src, /^assets\/media\/cases\/case-\d{2}-(?:clinical|dermoscopy)\.jpg$/);
      assert.ok(fs.existsSync(path.join(root, image.src)));
    }
    if (caseItem.images.some(image => image.type === "clinical")) assert.ok(view.firstImages.every(image => image.type === "clinical"), row.caseId);
  }
});

test("the rendered flow keeps the answer hidden until reveal, then teaches verification", () => {
  const { trainingData } = loadAll();
  const context = buildContext();
  for (const [blueprint, seeds] of [["mixed-screening", [3, 4]], ["melanoma-and-mimics", [5]], ["special-sites", [6, 9]]]) {
    for (const seed of seeds) {
      const app = createApp([seed]);
      app.choose("training-blueprint", blueprint);
      app.choose("training-length", "standard");
      app.buttonNamed("Start session").dispatch("click");
      const composition = engine.composeSession(context, { blueprintId: blueprint, lengthId: "standard", seed });
      for (let index = 0; index < composition.items.length; index += 1) {
        const item = composition.items[index];
        const caseItem = context.byId.get(item.caseId);
        const heading = app.doc.activeElement;
        assert.equal(heading.tagName, "H3");
        assert.match(heading.textContent, new RegExp(`Unknown lesion ${index + 1} of ${composition.items.length}`));
        const before = preRevealChrome(app.visibleText(), trainingData);
        assert.doesNotMatch(before, engine.LEAK_PATTERN, `${item.caseId} before reveal`);
        assert.doesNotMatch(before, new RegExp(escape(caseItem.diagnosisLabel), "i"));
        assert.doesNotMatch(before, /Closest mimic|Major clue|Case weight|Recorded pole|Compared with|Verification|Context case/);
        const imgs = app.find(node => node.tagName === "IMG");
        assert.ok(imgs.length > 0);
        assert.ok(imgs.every(img => img.loading === "lazy" && img.alt.length > 10));
        app.choose("training-pre", "suspicious");
        app.choose("training-family", "melanocytic");
        const derm = app.buttonNamed("Show dermoscopy");
        const staged = caseItem.images.some(image => image.type === "clinical") && caseItem.images.some(image => image.type === "dermoscopy");
        assert.equal(Boolean(derm), staged, item.caseId);
        if (derm) {
          assert.equal(derm.getAttribute("aria-expanded"), "false");
          derm.dispatch("click");
          assert.equal(app.doc.activeElement.textContent, "Dermoscopy");
          const shown = app.find(node => node.tagName === "BUTTON" && node.getAttribute("aria-expanded") === "true");
          assert.equal(shown.length, 1);
          const after = preRevealChrome(app.visibleText(), trainingData);
          assert.match(after, /Dermoscopic image/);
          assert.doesNotMatch(after, engine.LEAK_PATTERN, `${item.caseId} after dermoscopy`);
          assert.doesNotMatch(after, new RegExp(escape(caseItem.diagnosisLabel), "i"));
          app.choose("training-post", "benign-leaning");
        }
        app.buttonNamed("Reveal source diagnosis").dispatch("click");
        assert.equal(app.doc.activeElement.textContent, "Source diagnosis");
        const revealed = app.visibleText();
        assert.match(revealed, new RegExp(escape(caseItem.diagnosisLabel)));
        assert.match(revealed, /Strength: /);
        assert.match(revealed, /Method: /);
        assert.match(revealed, /Review required/);
        assert.match(revealed, /Your impression[^:]*: Suspicious/);
        if (derm) {
          assert.match(revealed, /Your impression after dermoscopy: Benign-leaning/);
          if (caseItem.pairedModality) assert.match(revealed, /Before dermoscopy[\s\S]*Dermoscopy added[\s\S]*Reasoning impact/);
        }
        if (caseItem.diagnosticGroundTruth.confirmationMethod === "histopathology") {
          assert.match(revealed, /Histopathology is stated|Histopathology is the recorded/);
          assert.doesNotMatch(revealed, /No histopathology is recorded/);
        } else {
          assert.match(revealed, /No histopathology is recorded for this case/);
          assert.doesNotMatch(revealed, /Histopathology is stated for this lesion|Histopathology is the recorded/);
        }
        if (caseItem.closestMimic) assert.match(revealed, new RegExp(escape(caseItem.closestMimic.name)));
        if (item.role === "context") {
          assert.match(revealed, /Context case/);
          assert.match(revealed, /Nail-unit evidence note/);
        }
        assertNoScoreClaims(revealed.replace(/Source page/g, ""), item.caseId);
        const fieldsets = app.find(node => node.tagName === "INPUT" && node.name === "training-pre");
        assert.ok(fieldsets.every(input => input.disabled), "impression is locked after reveal");
        const next = app.buttonNamed("Next unknown lesion") || app.buttonNamed("Finish and open debrief");
        next.dispatch("click");
      }
      assert.equal(app.doc.activeElement.textContent, "Session debrief");
      const debrief = app.visibleText();
      assert.match(debrief, new RegExp(`Cases reviewed: ${composition.items.length}`));
      assertNoScoreClaims(debrief, "debrief");
      assert.doesNotMatch(debrief, /\d+(?:\.\d+)?\s*%|\bcorrect\b|\bincorrect\b|\bscore:/i);
      app.buttonNamed("Start a new session").dispatch("click");
      assert.equal(app.doc.activeElement.textContent, "Start a screening-style session");
    }
  }
});

test("dermoscopy is staged only after the clinical photograph and alt text names the modality", () => {
  const context = buildContext();
  const paired = context.cases.filter(item => context.eligibility.get(item.id).paired);
  assert.ok(paired.length > 10);
  for (const caseItem of paired) {
    const view = engine.preRevealView(context, caseItem, 1, 5);
    assert.equal(view.dermoscopyStaged, true);
    assert.ok(view.firstImages.every(image => image.modality === "Clinical photograph"));
    assert.ok(view.dermoscopyImages.every(image => image.modality === "Dermoscopic image"));
  }
});

test("learner choices stay in memory and are discarded on restart", () => {
  const source = fs.readFileSync(path.join(root, "training-app.js"), "utf8") + fs.readFileSync(path.join(root, "training-engine.js"), "utf8");
  assert.doesNotMatch(source, /localStorage|sessionStorage|indexedDB|document\.cookie|fetch\(|XMLHttpRequest|sendBeacon|navigator\.|WebSocket/);
  const app = createApp([21, 22]);
  app.buttonNamed("Start session").dispatch("click");
  app.choose("training-pre", "uncertain");
  app.buttonNamed("End session").dispatch("click");
  assert.match(app.visibleText(), /Cases reviewed: 0/);
  app.buttonNamed("Start a new session").dispatch("click");
  app.buttonNamed("Start session").dispatch("click");
  const inputs = app.find(node => node.tagName === "INPUT" && node.name === "training-pre");
  assert.ok(inputs.every(input => !input.checked));
});

test("the working-diagnosis list is identical for every lesion and is never scored", () => {
  const context = buildContext();
  const options = engine.workingDiagnosisOptions(context);
  assert.ok(options.length > 10);
  const app = createApp([31]);
  app.buttonNamed("Start session").dispatch("click");
  const lists = [];
  for (let index = 0; index < 5; index += 1) {
    const select = app.find(node => node.getAttribute("data-role") === "working-diagnosis")[0];
    lists.push(select.children.map(option => option.textContent).join("|"));
    app.buttonNamed("Reveal source diagnosis").dispatch("click");
    (app.buttonNamed("Next unknown lesion") || app.buttonNamed("Finish and open debrief")).dispatch("click");
  }
  assert.equal(new Set(lists).size, 1);
  assert.equal(lists[0], ["No working diagnosis", ...options].join("|"));
});

test("discordance shows only stored teaching, and the reflection never grades", () => {
  const context = buildContext();
  const malignant = context.byId.get("case-g27-03");
  const view = engine.revealView(context, malignant, { record: { pre: "suspicious", post: "benign-leaning" } });
  assert.equal(view.reflection.directionDiffers, true);
  assert.equal(view.reflection.pull.closestMimic.whyClosest, malignant.closestMimic.whyClosest);
  assert.equal(view.reflection.pull.trap, malignant.diagnosticTrap);
  const concordant = engine.revealView(context, malignant, { record: { pre: "suspicious" } });
  assert.equal(concordant.reflection.pull, null);
  const uncertain = engine.revealView(context, malignant, { record: { pre: "uncertain" } });
  assert.equal(uncertain.reflection.directionDiffers, false);
  assert.doesNotMatch(JSON.stringify(view.reflection), /"(?:correct|score|points|accuracy)"/i);
});

test("comparisons stay hidden until reveal and partners still ahead are withheld", () => {
  const context = buildContext();
  const caseItem = context.byId.get("case-g26-01");
  const partnerIds = caseItem.compareWith.map(id => context.comparisons.get(id)).map(item => (item.caseIdA === caseItem.id ? item.caseIdB : item.caseIdA));
  const withheld = engine.revealView(context, caseItem, { upcomingCaseIds: partnerIds });
  assert.ok(withheld.comparisons.every(entry => entry.withheld));
  assert.doesNotMatch(JSON.stringify(withheld.comparisons), new RegExp(escape(context.byId.get(partnerIds[0]).diagnosisLabel)));
  const open = engine.revealView(context, caseItem, { upcomingCaseIds: [] });
  assert.ok(open.comparisons.every(entry => !entry.withheld && entry.partnerVerification));
  assert.ok(!JSON.stringify(engine.preRevealView(context, caseItem, 1, 5)).includes("Compared"));
});

test("context-only nail cases keep their limitation wherever they appear", () => {
  const context = buildContext();
  for (const id of ["case-g26-07", "case-g27-06", "case-g22-01", "case-g18-12"]) {
    const view = engine.revealView(context, context.byId.get(id), { role: "context" });
    assert.ok(view.limitations.some(line => /Context case/.test(line)), id);
    assert.ok(view.limitations.some(line => /Nail-unit evidence note/.test(line)), id);
    assert.ok(view.limitations.some(line => /without histopathology/.test(line)), id);
    assert.match(view.verification.histopathologyLine, /No histopathology is recorded/);
  }
  // The nail note also follows the histopathology-confirmed nail nevi.
  const nevus = engine.revealView(context, context.byId.get("case-g27-05"), { role: "core" });
  assert.ok(nevus.limitations.some(line => /Nail-unit evidence note/.test(line)));
  // A comparison partner that is context-only carries its limitation.
  const partner = engine.revealView(context, context.byId.get("case-g26-06"), {});
  const toNail = partner.comparisons.find(entry => entry.id === "cmp-g26-nail-broad");
  assert.ok(toNail.partnerLimitation.some(line => /Nail-unit case without histopathology/.test(line)));
  const special = sessionsFor(context, "special-sites", 40).filter(session => session.items.some(item => item.role === "context"));
  assert.ok(special.length > 0);
});

test("no score, probability, or pass mark exists in the training code or data", () => {
  for (const file of ["training-app.js", "training-engine.js", "training-data.js"]) {
    const source = fs.readFileSync(path.join(root, file), "utf8");
    assert.doesNotMatch(source, /\b(?:score|accuracy|points|xp|streak|percentCorrect|passMark|isCorrect)\s*[:=+]/i, file);
    assert.doesNotMatch(source, /\bsensitivity\b|\bspecificity\b|\bprobability\s*[:=]/i, file);
  }
  const context = buildContext();
  const composition = engine.composeSession(context, { blueprintId: "mixed-screening", lengthId: "short", seed: 1 });
  const records = {};
  composition.items.forEach(item => { records[item.caseId] = { revealed: true, pre: "suspicious", post: null }; });
  const debrief = engine.buildDebrief(context, composition, records);
  assert.deepEqual(Object.keys(debrief).sort(), ["acrossPoles", "casesReviewed", "categories", "contextCases", "dermoscopyChanged", "patterns", "poleContexts", "revisit", "sessionComparisons", "traps"]);
  assert.doesNotMatch(JSON.stringify(debrief), /score|accuracy|percent|correct/i);
});

test("the debrief recaps only patterns from lesions actually presented and revealed", () => {
  const context = buildContext();
  const composition = engine.composeSession(context, { blueprintId: "mixed-screening", lengthId: "standard", seed: 8 });
  const records = {};
  const revealedIds = composition.items.slice(0, 4).map(item => item.caseId);
  composition.items.forEach((item, index) => { records[item.caseId] = { revealed: index < 4, pre: index === 0 ? "uncertain" : "suspicious", post: index === 1 ? "benign-leaning" : null }; });
  const debrief = engine.buildDebrief(context, composition, records);
  const expected = new Set(revealedIds.flatMap(id => engine.teachingPatternIds(context, context.byId.get(id))));
  assert.deepEqual(new Set(debrief.patterns.map(entry => entry.id)), expected);
  for (const entry of [...debrief.patterns, ...debrief.revisit, ...debrief.acrossPoles]) {
    assert.ok(entry.caseIds.every(id => revealedIds.includes(id)));
  }
  assert.equal(debrief.casesReviewed, 4);
  assert.ok(debrief.traps.every(entry => revealedIds.includes(entry.caseId)));
  const unrevealed = composition.items.slice(4).flatMap(item => engine.teachingPatternIds(context, context.byId.get(item.caseId))).filter(id => !expected.has(id));
  for (const id of unrevealed) assert.ok(!debrief.patterns.some(entry => entry.id === id), id);
});

test("review-required status is preserved and reviewed fingerprints are unchanged", () => {
  const { trainingData, caseData } = loadAll();
  assert.equal(trainingData.reviewStatus, "clinician review required");
  assert.equal(trainingData.clinicalReview, null);
  assert.ok(caseData.cases.every(item => item.reviewStatus === "clinician review required" && item.clinicalReview === null));
  const committed = JSON.parse(fs.readFileSync(path.join(root, "review-status.json"), "utf8"));
  assert.deepEqual(clone(buildPublicStatus()), committed);
  const reviewed = committed.assets.filter(asset => asset.status === "clinician reviewed");
  assert.deepEqual(Object.fromEntries(reviewed.map(asset => [asset.id, asset.currentFingerprint])), REVIEWED_FINGERPRINTS);
  const appSource = fs.readFileSync(path.join(root, "training-app.js"), "utf8");
  assert.doesNotMatch(appSource, /reviewStatus\s*=|"clinician reviewed"\s*[,;]/);
});

test("the eligibility report is current and makes no score claim", () => {
  const output = renderReport(buildContext());
  assert.equal(fs.readFileSync(path.join(root, "TRAINING_ELIGIBILITY.md"), "utf8"), output);
  assert.match(output, /not a quality score/);
  assert.match(output, /Clinical review remains deferred/);
  assert.doesNotMatch(output, /\d+(?:\.\d+)?\s*%/);
});

test("documentation describes the published training as review required, not clinical approval", () => {
  const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
  const training = fs.readFileSync(path.join(root, "TRAINING.md"), "utf8");
  assert.match(training, /preview curriculum/i);
  assert.match(training, /not clinical approval/i);
  assert.match(training, /clinical review remains deferred/i);
  assert.match(training, /review required/i);
  assert.match(readme, /Goal 28/);
  assert.doesNotMatch(readme, /live site (?:now )?(?:includes|contains|has) (?:the )?(?:Goal 28|mixed-case)/i);
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  assert.match(html, /<script src="training-engine\.js"><\/script>/);
  assert.match(html, /href="#trainingModule"/);
});
