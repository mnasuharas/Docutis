"use strict";

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const engine = require("../training-engine.js");

const root = path.join(__dirname, "..");
const reportPath = path.join(root, "TRAINING_ELIGIBILITY.md");
const IMPRESSION_IDS = ["benign-leaning", "suspicious", "uncertain"];
const FILTERS = new Set(["all", "melanoma-or-mimic", "special-site"]);
const VALIDATION_SEEDS = 60;

function loadBrowserData(fileName, globalName) {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, fileName), "utf8"), context, { filename: fileName });
  return context.window[globalName];
}

function loadAll() {
  return {
    caseData: loadBrowserData("case-data.js", "DOCUTIS_CASES"),
    diseaseData: loadBrowserData("data.js", "DOCUTIS_DATA"),
    patternData: loadBrowserData("pattern-data.js", "DOCUTIS_PATTERNS"),
    trainingData: loadBrowserData("training-data.js", "DOCUTIS_TRAINING_DATA")
  };
}

function buildContext(data = loadAll()) {
  return engine.createContext(data.caseData, data.diseaseData, data.patternData, data.trainingData);
}

function validateTrainingData(trainingData, caseData) {
  if (!trainingData || trainingData.schemaVersion !== 1) throw new Error("training data schemaVersion must be 1");
  if (trainingData.reviewStatus !== "clinician review required" || trainingData.clinicalReview !== null) {
    throw new Error("training data must stay clinician review required with clinicalReview null");
  }
  if (trainingData.status !== "development curriculum") throw new Error("training data must be labelled development curriculum");
  const impressionIds = trainingData.impressions.map(item => item.id);
  if (JSON.stringify(impressionIds) !== JSON.stringify(IMPRESSION_IDS)) throw new Error("impressions must be benign-leaning, suspicious, uncertain");
  if (!trainingData.lengths.some(item => item.isDefault)) throw new Error("one session length must be the default");
  const defaultLength = trainingData.lengths.find(item => item.isDefault);
  if (defaultLength.cases > Math.min(...trainingData.lengths.map(item => item.cases))) throw new Error("default length must be the shortest option");
  for (const blueprint of trainingData.blueprints) {
    if (!FILTERS.has(blueprint.filter)) throw new Error(`${blueprint.id}: unknown filter`);
    for (const reason of blueprint.contextReasons || []) {
      if (!trainingData.limitationText[reason]) throw new Error(`${blueprint.id}: context reason ${reason} has no limitation text`);
    }
  }
  const caseIds = new Set(caseData.cases.map(item => item.id));
  for (const entry of trainingData.curation) {
    if (!caseIds.has(entry.caseId)) throw new Error(`curation names unknown case ${entry.caseId}`);
    if (!trainingData.limitationText[entry.reason]) throw new Error(`curation reason ${entry.reason} has no limitation text`);
    if (!entry.note || entry.note.length < 20) throw new Error(`curation for ${entry.caseId} needs a reason note`);
  }
  const blob = JSON.stringify(trainingData);
  if (/\d+(?:\.\d+)?\s*%|\bsensitivity\b|\bspecificity\b|\bprobability of\b/i.test(blob)) throw new Error("training data must not state percentages or test metrics");
}

function validateFiles(context) {
  for (const row of context.eligibility.values()) {
    if (row.status === "excluded") continue;
    const caseItem = context.byId.get(row.caseId);
    for (const image of caseItem.images) {
      const shown = engine.publicImageSrc(image);
      if (!shown || !fs.existsSync(path.join(root, shown))) throw new Error(`${row.caseId}: training image ${shown || image.src} is missing`);
    }
  }
}

function validateCompositions(context) {
  let sessions = 0;
  for (const blueprint of context.trainingData.blueprints) {
    const pool = engine.blueprintPool(context, blueprint.id);
    const allowed = new Set(blueprint.contextReasons || []);
    const lengths = engine.availableLengths(context, blueprint.id);
    if (!lengths.length) throw new Error(`${blueprint.id}: no session length fits the eligible pool`);
    for (const length of lengths) {
      for (let seed = 0; seed < VALIDATION_SEEDS; seed += 1) {
        const session = engine.composeSession(context, { blueprintId: blueprint.id, lengthId: length.id, seed });
        sessions += 1;
        const ids = session.items.map(item => item.caseId);
        if (new Set(ids).size !== ids.length) throw new Error(`${blueprint.id}/${length.id}/${seed}: repeated case`);
        const groups = ids.map(id => context.groups.get(id));
        if (new Set(groups).size !== groups.length) throw new Error(`${blueprint.id}/${length.id}/${seed}: two lesions from one source group`);
        if (session.items.length > length.cases) throw new Error(`${blueprint.id}/${length.id}/${seed}: session longer than requested`);
        if (session.notes.some(note => /constraint not met/.test(note))) throw new Error(`${blueprint.id}/${length.id}/${seed}: ${session.notes.join(" ")}`);
        let contextCount = 0;
        for (const item of session.items) {
          const row = context.eligibility.get(item.caseId);
          if (item.role === "core" && row.status !== "core_training") throw new Error(`${item.caseId} entered a core slot without core eligibility`);
          if (item.role === "context") {
            contextCount += 1;
            if (row.status !== "context_only" || !row.reasons.every(reason => allowed.has(reason))) throw new Error(`${item.caseId} is not an allowed context case for ${blueprint.id}`);
          }
          if (row.status === "excluded") throw new Error(`${item.caseId} is excluded`);
        }
        if (contextCount > (blueprint.contextSlots || 0)) throw new Error(`${blueprint.id}: too many context cases`);
        if (!pool.core.length) throw new Error(`${blueprint.id}: empty pool`);
      }
    }
  }
  return sessions;
}

function list(ids) { return ids.length ? ids.join(", ") : "none"; }

function renderReport(context) {
  const report = engine.eligibilityReport(context);
  const td = context.trainingData;
  const lines = [];
  lines.push("# Training eligibility report (Goal 28)");
  lines.push("");
  lines.push("Generated by `node scripts/training.js --write`. Read-only curriculum audit for the mixed-case screening training. It is not a quality score, not a clinical approval status, and not clinician review. Clinical review remains deferred.");
  lines.push("");
  lines.push("Eligibility uses stored case metadata: local image and diagnosis-neutral public path, provenance and licence, ground truth and honest confirmation method, review status, differentials, closest mimic and pattern links, pre-reveal text, image size, and one curated data note. Verification decides eligibility and is taught after reveal. It is not used to rank cases for the learner.");
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- Total cases in development dataset: ${report.totalCases}`);
  lines.push(`- Core-training eligible: ${report.core.length}`);
  lines.push(`- Context-only: ${report.contextOnly.length}`);
  lines.push(`- Excluded: ${report.excluded.length}`);
  lines.push(`- Core benign: ${report.corePoles.benign || 0}`);
  lines.push(`- Core malignant: ${report.corePoles.malignant || 0}`);
  lines.push(`- Core with another recorded pole (premalignant or uncertain classification): ${report.corePoles.intermediate || 0}`);
  lines.push(`- Core histopathology-confirmed: ${report.coreHistopathology.length}`);
  lines.push(`- Core paired clinical and dermoscopy: ${report.corePaired.length}`);
  lines.push(`- Core melanoma (including melanoma in situ and lentigo maligna): ${report.coreMelanoma.length}`);
  lines.push(`- Core benign melanoma mimics: ${report.coreMelanomaMimics.length}`);
  lines.push(`- Core face: ${report.coreFace.length}`);
  lines.push(`- Core acral: ${report.coreAcral.length}`);
  lines.push(`- Core nail: ${report.coreNail.length}`);
  lines.push(`- Distinct diagnostic structures in core cases: ${report.structures.length}`);
  lines.push(`- Structures seen in both benign and malignant core cases: ${report.structuresBothPoles.length}`);
  lines.push("");
  lines.push("Counts describe coverage. They are not prevalence and they are not a score.");
  lines.push("");
  lines.push("## Core-training cases");
  lines.push("");
  for (const id of report.core) {
    const row = context.eligibility.get(id);
    lines.push(`- ${id}: pole ${row.pole}; family ${row.family}; site ${row.site}; ${row.paired ? "paired" : "single modality"}; confirmation ${row.confirmationMethod}; difficulty ${row.difficulty}`);
  }
  lines.push("");
  lines.push("## Context-only cases");
  lines.push("");
  for (const entry of report.contextOnly) {
    lines.push(`- ${entry.caseId}: ${entry.reasons.map(reason => td.limitationText[reason] || reason).join(" ")}`);
  }
  lines.push("");
  lines.push("## Excluded cases");
  lines.push("");
  if (!report.excluded.length) lines.push("- none");
  for (const entry of report.excluded) lines.push(`- ${entry.caseId}: ${entry.reasons.join(", ")}`);
  lines.push("");
  lines.push("## Coverage of core cases");
  lines.push("");
  lines.push(`- Lesion families (composition mapping from stored case category): ${Object.entries(report.coreFamilies).map(([key, value]) => `${key} ${value}`).join(", ")}`);
  lines.push(`- Sites: ${Object.entries(report.coreSites).map(([key, value]) => `${key} ${value}`).join(", ")}`);
  lines.push(`- Confirmation methods: ${Object.entries(report.coreMethods).map(([key, value]) => `${key} ${value}`).join(", ")}`);
  lines.push(`- Histopathology: ${list(report.coreHistopathology)}`);
  lines.push(`- Paired: ${list(report.corePaired)}`);
  lines.push(`- Melanoma: ${list(report.coreMelanoma)}`);
  lines.push(`- Benign melanoma mimics: ${list(report.coreMelanomaMimics)}`);
  lines.push(`- Face: ${list(report.coreFace)}`);
  lines.push(`- Acral: ${list(report.coreAcral)}`);
  lines.push(`- Nail: ${list(report.coreNail)}`);
  lines.push(`- Diagnostic structures: ${list(report.structures)}`);
  lines.push(`- Structures in benign and malignant core cases: ${list(report.structuresBothPoles)}`);
  lines.push("");
  lines.push("## Blueprints");
  lines.push("");
  for (const blueprint of report.blueprints) {
    lines.push(`### ${blueprint.title}`);
    lines.push("");
    lines.push(`- Core cases available: ${blueprint.coreCases.length} (${blueprint.distinctSourceLesions} distinct source groups)`);
    lines.push(`- Context cases that may fill one labelled slot: ${list(blueprint.contextCases)}`);
    lines.push(`- Session lengths offered: ${blueprint.lengths.join(", ")}`);
    lines.push("");
  }
  lines.push("## Limits");
  lines.push("");
  lines.push(`- ${td.nailUnitNote}`);
  lines.push(`- ${td.dispositionNote}`);
  lines.push("- A session takes at most one case per source group (same source page, same source figure, or same image file). Lesion identity across crops is taken from source captions, so the engine does not try to prove two crops are different lesions.");
  lines.push("- Pigmented versus non-pigmented is not a stored field, so it is not used for composition.");
  lines.push("- All newly authored clinical teaching content remains review required. No physician decision was fabricated.");
  lines.push("");
  return lines.join("\n");
}

function main(argv = process.argv.slice(2)) {
  const data = loadAll();
  validateTrainingData(data.trainingData, data.caseData);
  const context = buildContext(data);
  validateFiles(context);
  const sessions = validateCompositions(context);
  const output = renderReport(context);
  if (argv.includes("--json")) {
    console.log(JSON.stringify(engine.eligibilityReport(context), null, 2));
    return;
  }
  if (argv.includes("--write")) {
    fs.writeFileSync(reportPath, output);
    console.log(`Wrote ${path.relative(root, reportPath)}.`);
  } else if (argv.includes("--check")) {
    const current = fs.existsSync(reportPath) ? fs.readFileSync(reportPath, "utf8") : "";
    if (current !== output) {
      console.error("TRAINING_ELIGIBILITY.md is out of date. Run node scripts/training.js --write.");
      process.exitCode = 1;
      return;
    }
    console.log("TRAINING_ELIGIBILITY.md matches the eligibility audit.");
  }
  const report = engine.eligibilityReport(context);
  console.log(`Validated mixed-case training: ${report.totalCases} cases, ${report.core.length} core, ${report.contextOnly.length} context-only, ${report.excluded.length} excluded; ${sessions} composed sessions met the constraints. No score is calculated. Training content remains review required. This is not clinician review.`);
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { loadAll, buildContext, validateTrainingData, validateFiles, validateCompositions, renderReport, main };
