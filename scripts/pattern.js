"use strict";

const { createHash } = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { loadCaseData, loadDiseaseData } = require("./case");

const root = path.join(__dirname, "..");
const modalities = new Set(["clinical", "dermoscopic", "both", "none"]);
const categories = new Set(["clinical-morphology", "dermoscopic-structure", "frame-artifact", "observation-limit"]);
const usualRoles = new Set(["characteristic", "supportive", "weak", "conflicting", "nonspecific", "context-dependent"]);
const clearCertainties = new Set(["clearly_visible", "probably"]);
const numericClaim = /\b(?:sensitivity|specificity)\b|\blikelihood ratio\b|\bpredictive value\b|\d+(?:\.\d+)?\s*%/i;
const sourceTypes = new Set(["guideline", "consensus", "systematic review", "peer-reviewed review", "clinical reference", "official classification", "project-teaching-note"]);
const coverageStatuses = new Set(["missing", "single_example", "limited_variation", "multi_context", "contrastive_coverage"]);

const REASONING_STEPS = Object.freeze([
  Object.freeze({ id: "context", label: "Clinical context" }),
  Object.freeze({ id: "clinical-morphology", label: "Clinical morphology" }),
  Object.freeze({ id: "dermoscopic-structures", label: "Dermoscopic structures" }),
  Object.freeze({ id: "pattern", label: "Named pattern in this case" }),
  Object.freeze({ id: "differential", label: "Differential" }),
  Object.freeze({ id: "closest-mimic", label: "Closest mimic" }),
  Object.freeze({ id: "why-fit-why-not", label: "Why it fits and why not" }),
  Object.freeze({ id: "evidence-weight", label: "Evidence weight" }),
  Object.freeze({ id: "trap", label: "Trap" }),
  Object.freeze({ id: "next-action", label: "Next clinical action" })
]);

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map(key => [key, canonicalize(value[key])]));
  }
  return value;
}

function loadPatternData() {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, "pattern-data.js"), "utf8"), context, { filename: "pattern-data.js" });
  return context.window.DOCUTIS_PATTERNS;
}

function patternClinicalContent(pattern) {
  const { reviewStatus, clinicalReview, ...rest } = pattern;
  return rest;
}

function patternFingerprint(pattern) {
  return `sha256-v1:${createHash("sha256").update(JSON.stringify(canonicalize(patternClinicalContent(pattern))), "utf8").digest("hex")}`;
}

function libraryFingerprint(patternData) {
  const { reviewStatus, clinicalReview, ...rest } = patternData;
  const body = {
    ...rest,
    patterns: (patternData.patterns || []).map(patternClinicalContent)
  };
  return `sha256-v1:${createHash("sha256").update(JSON.stringify(canonicalize(body)), "utf8").digest("hex")}`;
}

function lesionPole(disease) {
  if (!disease) return "unknown";
  if (disease.subcategory === "keratinocytic-tumor-uncertain") return "uncertain-classification";
  if (disease.category === "premalignant") return "premalignant";
  if (["keratinocytic", "melanocytic", "other"].includes(disease.category)) return "malignant";
  if (["inflammatory-eczematous", "acneiform-sebaceous", "pigmentary", "infectious-infestation"].includes(disease.category)) return "benign-or-inflammatory";
  return "unknown";
}

function specialSite(site) {
  const value = String(site || "").toLowerCase();
  if (!value.trim()) return "unknown";
  if (/not named|not specified|does not name|site not/.test(value)) return "unknown";
  if (/nail/.test(value)) return "nail";
  if (/plantar|palm|sole|\bacral\b/.test(value)) return "acral";
  if (/\bear\b/.test(value)) return "ear";
  if (/face|cheek|nose|lip|eyelid|forehead|scalp/.test(value)) return "face";
  return "not-special";
}

function casePatternIndex(caseData) {
  const index = new Map();
  for (const caseItem of caseData.cases || []) {
    for (const pattern of caseItem.patterns || []) {
      if (!pattern || !pattern.id) continue;
      if (index.has(pattern.id)) {
        throw new Error(`duplicate case pattern id: ${pattern.id}`);
      }
      index.set(pattern.id, { caseItem, pattern });
    }
  }
  return index;
}

function validatePatternLibrary(patternData = loadPatternData(), caseData = loadCaseData()) {
  if (!patternData || patternData.schemaVersion !== 1) throw new Error("pattern library schemaVersion must be 1");
  if (patternData.reviewStatus !== "clinician review required" || patternData.clinicalReview !== null) {
    throw new Error("pattern library must stay clinician review required with clinicalReview null");
  }
  if (!patternData.sources || typeof patternData.sources !== "object") throw new Error("pattern source catalog is required");
  const sourceIds = new Set(Object.keys(patternData.sources));
  for (const source of Object.values(patternData.sources)) {
    if (!source.id || !sourceIds.has(source.id)) throw new Error("source id mismatch");
    if (!source.title || !source.organization || !source.url || !source.metadataCheckedAt) {
      throw new Error(`${source.id || "source"}: title, organization, url and metadataCheckedAt are required`);
    }
    if (!sourceTypes.has(source.type)) throw new Error(`${source.id}: unsupported source type`);
    if (!/^https:\/\//.test(source.url)) throw new Error(`${source.id}: source url must use HTTPS`);
    if (source.type === "project-teaching-note" && source.organization !== "Docutis") {
      throw new Error(`${source.id}: project teaching notes stay labeled as Docutis`);
    }
  }
  if (!Array.isArray(patternData.patterns) || !patternData.patterns.length) throw new Error("patterns are required");
  const byId = new Map();
  for (const pattern of patternData.patterns) {
    if (!pattern.id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(pattern.id)) throw new Error(`invalid pattern id: ${pattern.id}`);
    if (byId.has(pattern.id)) throw new Error(`duplicate pattern id: ${pattern.id}`);
    byId.set(pattern.id, pattern);
    if (pattern.reviewStatus !== "clinician review required" || pattern.clinicalReview !== null) {
      throw new Error(`${pattern.id}: clinical review must not be elevated`);
    }
    if (!pattern.displayName || !pattern.displayName.trim()) throw new Error(`${pattern.id}: displayName is required`);
    if (!modalities.has(pattern.modality)) throw new Error(`${pattern.id}: unsupported modality`);
    if (!categories.has(pattern.category)) throw new Error(`${pattern.id}: unsupported category`);
    if ((pattern.category === "frame-artifact" || pattern.category === "observation-limit") && pattern.modality !== "none") {
      throw new Error(`${pattern.id}: frame artifacts and observation limits use modality none`);
    }
    if (pattern.category !== "frame-artifact" && pattern.category !== "observation-limit" && pattern.modality === "none") {
      throw new Error(`${pattern.id}: a skin pattern needs a real modality`);
    }
    for (const field of ["definition", "lookFor", "supports", "limitsOfClaim"]) {
      if (typeof pattern[field] !== "string" || !pattern[field].trim()) throw new Error(`${pattern.id}: ${field} is required`);
    }
    for (const field of ["aliases", "morphologyClues", "commonContexts", "malignantAssociations", "benignAssociations", "mimics", "traps", "doesNotProve", "sourceIds", "relatedPatternIds"]) {
      if (!Array.isArray(pattern[field])) throw new Error(`${pattern.id}: ${field} must be an array`);
    }
    if (!pattern.doesNotProve.length) throw new Error(`${pattern.id}: say what the feature does not prove`);
    if (!usualRoles.has(pattern.usualRole)) throw new Error(`${pattern.id}: unsupported usualRole`);
    if ("certainty" in pattern || "weight" in pattern || "cases" in pattern || "linkedCases" in pattern) {
      throw new Error(`${pattern.id}: case certainty, weight and linked cases do not live on the pattern`);
    }
    if (!pattern.sourceIds.length) throw new Error(`${pattern.id}: source metadata is required`);
    for (const sourceId of pattern.sourceIds) {
      if (!sourceIds.has(sourceId)) throw new Error(`${pattern.id}: unknown source ${sourceId}`);
    }
    const authoritative = pattern.sourceIds.some(id => patternData.sources[id].type !== "project-teaching-note");
    if (pattern.category !== "frame-artifact" && !authoritative) {
      throw new Error(`${pattern.id}: a skin or limit pattern needs a source other than a project note, unless it is only a frame artifact`);
    }
    const blob = JSON.stringify(patternClinicalContent(pattern));
    if (numericClaim.test(blob)) throw new Error(`${pattern.id}: numeric certainty is not allowed`);
  }
  for (const pattern of patternData.patterns) {
    for (const related of pattern.relatedPatternIds) {
      if (!byId.has(related)) throw new Error(`${pattern.id}: unknown related pattern ${related}`);
      if (related === pattern.id) throw new Error(`${pattern.id}: a pattern cannot relate to itself`);
    }
  }
  const index = casePatternIndex(caseData);
  const seenLinks = new Set();
  if (!Array.isArray(patternData.links)) throw new Error("pattern links are required");
  for (const link of patternData.links) {
    if (!link.casePatternId || !link.canonicalId) throw new Error("pattern link needs casePatternId and canonicalId");
    if (seenLinks.has(link.casePatternId)) throw new Error(`duplicate pattern link: ${link.casePatternId}`);
    seenLinks.add(link.casePatternId);
    if (!index.has(link.casePatternId)) throw new Error(`unknown case pattern reference: ${link.casePatternId}`);
    if (!byId.has(link.canonicalId)) throw new Error(`unknown pattern reference: ${link.canonicalId}`);
  }
  const exempt = new Map();
  for (const item of patternData.unlinkedObservations || []) {
    if (!item.casePatternId || !item.reason || !item.reason.trim()) throw new Error("unlinked observation needs a reason");
    if (exempt.has(item.casePatternId) || seenLinks.has(item.casePatternId)) throw new Error(`unlinked observation conflicts: ${item.casePatternId}`);
    if (!index.has(item.casePatternId)) throw new Error(`unknown case pattern reference: ${item.casePatternId}`);
    exempt.set(item.casePatternId, item.reason);
  }
  for (const id of index.keys()) {
    if (!seenLinks.has(id) && !exempt.has(id)) throw new Error(`case pattern is neither linked nor explicitly unlinked: ${id}`);
  }
  const tokenLinks = patternData.dermoscopicTokenLinks || {};
  const usedTokens = new Set();
  for (const caseItem of caseData.cases || []) {
    for (const feature of caseItem.dermoscopicFeatures || []) {
      if (feature && feature.token) usedTokens.add(feature.token);
    }
  }
  for (const [token, canonicalId] of Object.entries(tokenLinks)) {
    if (!byId.has(canonicalId)) throw new Error(`unknown pattern reference: ${canonicalId}`);
    if (!usedTokens.has(token)) throw new Error(`dermoscopic token link has no structured case evidence: ${token}`);
  }
  if (Object.prototype.hasOwnProperty.call(tokenLinks, "structureless_areas")) {
    throw new Error("structureless_areas is used for more than one look and must not be auto-linked");
  }
  return true;
}

function diseaseById(diseaseData = loadDiseaseData()) {
  return new Map((diseaseData.diseases || []).map(item => [item.id, item]));
}

function teachingById(caseData = loadCaseData()) {
  return new Map((caseData.teachingDiagnoses || []).map(item => [item.id, item]));
}

function casePole(caseItem, diseases, teaching) {
  const disease = diseases.get(caseItem.diseaseId) || null;
  if (disease) return lesionPole(disease);
  const record = teaching.get(caseItem.diseaseId);
  return record && record.pole ? record.pole : "unknown";
}

function occurrenceShell(caseItem, diseases, extra) {
  const disease = diseases.get(caseItem.diseaseId) || null;
  const entry = (caseItem && extra.curriculumEntry) || null;
  return {
    caseId: caseItem.id,
    caseTitle: caseItem.title,
    diagnosisLabel: caseItem.diagnosisLabel,
    diseaseId: caseItem.diseaseId,
    pole: casePole(caseItem, diseases, extra.teaching || new Map()),
    caseType: caseItem.caseType,
    anatomicalSite: caseItem.patientContext && caseItem.patientContext.anatomicalSite || "",
    specialSite: specialSite(caseItem.patientContext && caseItem.patientContext.anatomicalSite),
    confirmationMethod: caseItem.diagnosticGroundTruth && caseItem.diagnosticGroundTruth.confirmationMethod || "unknown",
    educationalLevel: caseItem.educationalLevel || "unknown",
    academyLevel: caseItem.academy ? caseItem.academy.level : (entry ? entry.level : "unknown"),
    teachingType: (caseItem.academy && caseItem.academy.teachingType) || (entry && entry.teachingType) || "unknown",
    closestMimicName: caseItem.closestMimic && caseItem.closestMimic.name || null,
    ...extra
  };
}

function deriveOccurrences(patternData = loadPatternData(), caseData = loadCaseData(), diseaseData = loadDiseaseData()) {
  const diseases = diseaseById(diseaseData);
  const teaching = teachingById(caseData);
  const index = casePatternIndex(caseData);
  const curriculum = new Map(((caseData.curriculum && caseData.curriculum.entries) || []).map(entry => [entry.caseId, entry]));
  const grouped = new Map();
  function add(canonicalId, occurrence) {
    if (!grouped.has(canonicalId)) grouped.set(canonicalId, []);
    grouped.get(canonicalId).push(occurrence);
  }
  for (const link of patternData.links) {
    const found = index.get(link.casePatternId);
    if (!found) continue;
    const { caseItem, pattern } = found;
    add(link.canonicalId, occurrenceShell(caseItem, diseases, {
      teaching,
      curriculumEntry: curriculum.get(caseItem.id) || null,
      casePatternId: pattern.id,
      label: pattern.label,
      specificityNote: pattern.specificityNote,
      certainty: pattern.certainty,
      weight: pattern.weight,
      evidence: "case-pattern",
      evidenceTokens: []
    }));
  }
  for (const [token, canonicalId] of Object.entries(patternData.dermoscopicTokenLinks || {})) {
    for (const caseItem of caseData.cases) {
      const features = (caseItem.dermoscopicFeatures || []).filter(feature => feature && feature.token === token);
      if (!features.length) continue;
      const existing = (grouped.get(canonicalId) || []).find(item => item.caseId === caseItem.id);
      if (existing) {
        existing.evidenceTokens.push(token);
        continue;
      }
      add(canonicalId, occurrenceShell(caseItem, diseases, {
        teaching,
        curriculumEntry: curriculum.get(caseItem.id) || null,
        casePatternId: null,
        label: features[0].label || token,
        specificityNote: null,
        certainty: "unrated",
        weight: null,
        evidence: "dermoscopic-token",
        evidenceTokens: [token]
      }));
    }
  }
  return grouped;
}

function isContrastive(examples) {
  if (examples.length < 2) return false;
  for (const left of examples) {
    for (const right of examples) {
      if (left === right) continue;
      const mimic = String(left.closestMimicName || "").trim().toLowerCase();
      const diagnosis = String(right.diagnosisLabel || "").trim().toLowerCase();
      if (mimic && diagnosis && (diagnosis.includes(mimic) || mimic.includes(diagnosis))) return true;
    }
  }
  return false;
}

function classifyOccurrences(occurrences) {
  const list = Array.isArray(occurrences) ? occurrences : [];
  const notVisible = list.filter(item => item.certainty === "not_visible");
  const uncertain = list.filter(item => item.certainty === "uncertain");
  const clear = list.filter(item => clearCertainties.has(item.certainty));
  const unrated = list.filter(item => item.certainty === "unrated");
  const usable = clear.concat(unrated);
  const independentExamples = usable.length;
  let status = "missing";
  if (independentExamples === 1) status = "single_example";
  else if (independentExamples >= 2) {
    const diagnoses = new Set(usable.map(item => item.diagnosisLabel));
    if (isContrastive(usable)) status = "contrastive_coverage";
    else if (diagnoses.size >= 2) status = "multi_context";
    else status = "limited_variation";
  }
  if (!coverageStatuses.has(status)) throw new Error(`bad coverage status ${status}`);
  return {
    status,
    broadCoverage: status === "multi_context" || status === "contrastive_coverage",
    mastery: false,
    independentExamples,
    clearExamples: clear.length,
    unratedExamples: unrated.length,
    uncertainExamples: uncertain.length,
    notVisibleExamples: notVisible.length
  };
}

function classifyPatternCoverage(patternData = loadPatternData(), caseData = loadCaseData(), diseaseData = loadDiseaseData()) {
  const occurrences = deriveOccurrences(patternData, caseData, diseaseData);
  return patternData.patterns.map(pattern => {
    const rows = occurrences.get(pattern.id) || [];
    return {
      id: pattern.id,
      displayName: pattern.displayName,
      modality: pattern.modality,
      category: pattern.category,
      usualRole: pattern.usualRole,
      occurrences: rows,
      ...classifyOccurrences(rows)
    };
  });
}

function unmappedDermoscopicTokens(patternData = loadPatternData(), caseData = loadCaseData()) {
  const mapped = new Set(Object.keys(patternData.dermoscopicTokenLinks || {}));
  const rows = [];
  for (const caseItem of caseData.cases) {
    for (const feature of caseItem.dermoscopicFeatures || []) {
      if (!feature || !feature.token || mapped.has(feature.token)) continue;
      rows.push({ caseId: caseItem.id, token: feature.token, label: feature.label || "" });
    }
  }
  return rows;
}

function reasoningCoverage(caseItem, patternHits) {
  const site = caseItem.patientContext && caseItem.patientContext.anatomicalSite;
  const age = caseItem.patientContext ? caseItem.patientContext.ageBand : null;
  const hasClinicalImage = (caseItem.images || []).some(image => image.type === "clinical");
  const hasDermImage = (caseItem.images || []).some(image => image.type === "dermoscopy");
  const features = caseItem.dermoscopicFeatures || [];
  const differentials = caseItem.differentials || [];
  const why = differentials.some(item => (item.supportingFeatures || []).length || (item.contradictingFeatures || []).length || item.teachingDistinction);
  return [
    { id: "context", state: site ? "present" : "unknown", detail: age ? "age band stored" : "age band unknown" },
    { id: "clinical-morphology", state: hasClinicalImage || caseItem.caseType === "clinical" || caseItem.caseType === "clinical_dermoscopic" ? "present" : "absent", detail: `${(caseItem.observations || []).length} observations` },
    { id: "dermoscopic-structures", state: features.length ? "present" : (hasDermImage ? "unknown" : "absent"), detail: features.length ? features.map(item => item.token || item.label).join(", ") : "no structured dermoscopic feature" },
    { id: "pattern", state: patternHits.length ? "present" : "absent", detail: patternHits.length ? patternHits.map(item => item.canonicalId).join(", ") : "no canonical pattern encoded" },
    { id: "differential", state: differentials.length ? "present" : "absent", detail: String(differentials.length) },
    { id: "closest-mimic", state: caseItem.closestMimic && caseItem.closestMimic.name ? "present" : "absent", detail: caseItem.closestMimic ? caseItem.closestMimic.name : "not stored" },
    { id: "why-fit-why-not", state: why ? "present" : "absent", detail: (caseItem.whyNot || []).length ? "whyNot stored" : "differential text only" },
    { id: "evidence-weight", state: (caseItem.patterns || []).some(item => item.weight) || caseItem.evidenceWeighting ? "present" : "absent", detail: (caseItem.patterns || []).some(item => item.weight) ? "case pattern weight" : "no case weight" },
    { id: "trap", state: caseItem.diagnosticTrap ? "present" : "absent", detail: caseItem.diagnosticTrap ? "stored" : "not stored" },
    { id: "next-action", state: caseItem.managementBrief || caseItem.clinicalAction ? "not-a-specific-action" : "absent", detail: "No case-specific treatment category was derived." }
  ];
}

function spectrumSlot(id, label, cases) {
  return { id, label, cases: cases.map(item => item.id), count: cases.length, status: cases.length ? "represented" : "missing" };
}

function buildAudit(patternData = loadPatternData(), caseData = loadCaseData(), diseaseData = loadDiseaseData()) {
  validatePatternLibrary(patternData, caseData);
  const diseases = diseaseById(diseaseData);
  const teaching = teachingById(caseData);
  const coverage = classifyPatternCoverage(patternData, caseData, diseaseData);
  const occurrences = deriveOccurrences(patternData, caseData, diseaseData);
  const hitsByCase = new Map();
  for (const [canonicalId, rows] of occurrences.entries()) {
    for (const row of rows) {
      if (!hitsByCase.has(row.caseId)) hitsByCase.set(row.caseId, []);
      hitsByCase.get(row.caseId).push({ canonicalId, certainty: row.certainty, weight: row.weight, evidence: row.evidence });
    }
  }
  const cases = caseData.cases.map(caseItem => {
    const disease = diseases.get(caseItem.diseaseId) || null;
    const entry = (caseData.curriculum.entries || []).find(item => item.caseId === caseItem.id) || null;
    return {
      id: caseItem.id,
      title: caseItem.title,
      diagnosisLabel: caseItem.diagnosisLabel,
      diseaseId: caseItem.diseaseId,
      pole: casePole(caseItem, diseases, teaching),
      caseType: caseItem.caseType,
      anatomicalSite: caseItem.patientContext.anatomicalSite,
      specialSite: specialSite(caseItem.patientContext.anatomicalSite),
      confirmationMethod: caseItem.diagnosticGroundTruth.confirmationMethod,
      educationalLevel: caseItem.educationalLevel,
      academyLevel: entry ? entry.level : "unknown",
      teachingType: entry ? entry.teachingType : "unknown",
      closestMimic: caseItem.closestMimic ? caseItem.closestMimic.name : null,
      differentialCount: caseItem.differentials.length,
      patternHits: hitsByCase.get(caseItem.id) || [],
      reasoning: reasoningCoverage(caseItem, hitsByCase.get(caseItem.id) || [])
    };
  });
  const slots = [
    spectrumSlot("early-melanoma", "Early melanoma", []),
    spectrumSlot("melanoma-in-situ", "Melanoma in situ", cases.filter(item => /in situ/i.test(item.diagnosisLabel) || item.diseaseId === "lentigo-maligna")),
    spectrumSlot("superficial-spreading-phenotype", "Superficial spreading phenotype, only when the diagnosis label says so", caseData.cases.filter(item => /superficial spreading/i.test(item.diagnosisLabel))),
    spectrumSlot("nodular-melanoma", "Nodular melanoma as its own diagnosis", caseData.cases.filter(item => item.diseaseId === "nodular-melanoma" || /^nodular melanoma$/i.test(item.diagnosisLabel))),
    spectrumSlot("amelanotic", "Amelanotic melanoma", caseData.cases.filter(item => /amelanotic/i.test(item.diagnosisLabel))),
    spectrumSlot("hypomelanotic", "Hypomelanotic melanoma", caseData.cases.filter(item => /hypomelanotic|hypopigmented/i.test(item.diagnosisLabel))),
    spectrumSlot("lentigo-maligna", "Lentigo maligna", caseData.cases.filter(item => item.diseaseId === "lentigo-maligna" || item.diseaseId === "lentigo-maligna-melanoma" || /lentigo maligna/i.test(item.diagnosisLabel))),
    spectrumSlot("acral", "Acral melanoma", caseData.cases.filter(item => item.diseaseId === "acral-melanoma" || /acral|plantar/i.test(item.diagnosisLabel))),
    spectrumSlot("nail", "Nail-unit melanoma", caseData.cases.filter(item => /nail/i.test(`${item.diagnosisLabel} ${item.patientContext.anatomicalSite}`))),
    spectrumSlot("bcc", "Basal cell carcinoma", caseData.cases.filter(item => item.diseaseId === "basal-cell-carcinoma")),
    spectrumSlot("scc", "Cutaneous squamous cell carcinoma", caseData.cases.filter(item => item.diseaseId === "cutaneous-squamous-cell-carcinoma")),
    spectrumSlot("scc-in-situ", "Squamous cell carcinoma in situ", caseData.cases.filter(item => item.diseaseId === "squamous-cell-carcinoma-in-situ")),
    spectrumSlot("actinic-keratosis", "Actinic keratosis", caseData.cases.filter(item => item.diseaseId === "actinic-keratosis")),
    spectrumSlot("keratoacanthoma", "Keratoacanthoma", caseData.cases.filter(item => item.diseaseId === "keratoacanthoma")),
    spectrumSlot("seborrheic-keratosis", "Seborrheic keratosis", caseData.cases.filter(item => /seborrheic keratosis/i.test(item.diagnosisLabel))),
    spectrumSlot("dermatofibroma", "Dermatofibroma", caseData.cases.filter(item => /dermatofibroma/i.test(item.diagnosisLabel))),
    spectrumSlot("benign-nevus", "Benign nevus as the case diagnosis", caseData.cases.filter(item => /\bnevu?s\b/i.test(item.diagnosisLabel) && !/melanoma/i.test(item.diagnosisLabel))),
    spectrumSlot("solar-lentigo", "Solar lentigo", caseData.cases.filter(item => /solar lentigo|lentigo solaris/i.test(item.diagnosisLabel))),
    spectrumSlot("blue-nevus", "Blue nevus", caseData.cases.filter(item => /blue nevus|blue naevus/i.test(item.diagnosisLabel))),
    spectrumSlot("cherry-angioma", "Cherry angioma", caseData.cases.filter(item => /angioma|haemangioma|hemangioma/i.test(item.diagnosisLabel))),
    spectrumSlot("sebaceous-hyperplasia", "Sebaceous hyperplasia", caseData.cases.filter(item => /sebaceous hyperplasia/i.test(item.diagnosisLabel))),
    spectrumSlot("lichenoid-keratosis", "Lichenoid keratosis", caseData.cases.filter(item => /lichenoid keratosis|lichen planus-like/i.test(item.diagnosisLabel))),
    spectrumSlot("benign-acral", "Benign acral melanocytic lesion", caseData.cases.filter(item => /acral/i.test(item.diagnosisLabel) && /nevus|naevus/i.test(item.diagnosisLabel))),
    spectrumSlot("subungual-haemorrhage", "Subungual haemorrhage", caseData.cases.filter(item => /subungual h[ae]emorrhage/i.test(item.diagnosisLabel)))
  ];
  const mimicCounts = new Map();
  for (const caseItem of caseData.cases) {
    if (!caseItem.closestMimic || !caseItem.closestMimic.name) continue;
    mimicCounts.set(caseItem.closestMimic.name, (mimicCounts.get(caseItem.closestMimic.name) || 0) + 1);
  }
  const benignGaps = [...mimicCounts.entries()]
    .map(([name, count]) => {
      const matched = caseData.cases.filter(item => item.diagnosisLabel.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(item.diagnosisLabel.toLowerCase()));
      return { name, closestMimicUses: count, casesWithThatDiagnosis: matched.length };
    })
    .filter(item => item.casesWithThatDiagnosis === 0)
    .sort((a, b) => b.closestMimicUses - a.closestMimicUses || a.name.localeCompare(b.name));
  const imageNames = fs.readdirSync(path.join(root, "assets/media/cases"));
  const known = {
    seborrheicKeratosisImages: imageNames.filter(name => /seborrheic|keratosis/i.test(name) && !/ak-|actinic/i.test(name)),
    dermatofibromaImages: imageNames.filter(name => /dermatofibroma|df-/i.test(name)),
    lentigoMalignaImages: imageNames.filter(name => /lentigo/i.test(name)),
    histopathologyCases: caseData.cases.filter(item => item.diagnosticGroundTruth.confirmationMethod === "histopathology").map(item => item.id),
    level5Cases: (caseData.curriculum.entries || []).filter(entry => entry.level === 5).map(entry => entry.caseId)
  };
  return {
    generatedFrom: "structured case and pattern records",
    caseCount: caseData.cases.length,
    patternCount: patternData.patterns.length,
    libraryFingerprint: libraryFingerprint(patternData),
    reviewStatus: patternData.reviewStatus,
    clinicalReview: patternData.clinicalReview,
    cases,
    patterns: coverage,
    unmappedDermoscopicTokens: unmappedDermoscopicTokens(patternData, caseData),
    spectrum: slots,
    benignGaps,
    knownConcerns: known,
    adequateRepetitionClaim: false,
    comparisons: (caseData.comparisons || []).map(item => ({ id: item.id, caseIdA: item.caseIdA, caseIdB: item.caseIdB })),
    screeningCategories: ((caseData.screening || {}).categories || []).slice(),
    teachingDiagnoses: (caseData.teachingDiagnoses || []).map(item => ({ id: item.id, name: item.name, pole: item.pole, monograph: item.monograph }))
  };
}

function tally(items, keyFn) {
  const map = new Map();
  for (const item of items) {
    const key = keyFn(item);
    map.set(key, (map.get(key) || 0) + 1);
  }
  return [...map.entries()].sort((a, b) => String(a[0]).localeCompare(String(b[0])));
}

function formatAudit(audit) {
  const lines = [];
  lines.push("Docutis curriculum coverage audit");
  lines.push("Qualitative only. Not a score. Not proof of teaching efficacy. One example is not mastery.");
  lines.push(`Cases: ${audit.caseCount}. Canonical patterns: ${audit.patternCount}. Pattern library review: ${audit.reviewStatus}. clinicalReview: ${audit.clinicalReview}.`);
  lines.push("");
  lines.push("1. Case inventory");
  for (const item of audit.cases) {
    lines.push(`- ${item.id}: ${item.diagnosisLabel}; pole ${item.pole}; ${item.caseType}; confirmation ${item.confirmationMethod}; level ${item.educationalLevel}; curriculum ${item.academyLevel}; teaching ${item.teachingType}; patterns ${item.patternHits.length}`);
  }
  lines.push("");
  lines.push("2. Diagnosis and lesion family");
  for (const slot of audit.spectrum) lines.push(`- ${slot.id}: ${slot.status} (${slot.count})`);
  lines.push("");
  lines.push("3. Benign, premalignant, malignant, uncertain");
  for (const [pole, count] of tally(audit.cases, item => item.pole)) lines.push(`- ${pole}: ${count}`);
  lines.push("");
  lines.push("4. Pattern coverage");
  for (const pattern of audit.patterns) {
    lines.push(`- ${pattern.id}: ${pattern.status}; examples ${pattern.independentExamples}; clear ${pattern.clearExamples}; unrated ${pattern.unratedExamples}; uncertain ${pattern.uncertainExamples}; not visible ${pattern.notVisibleExamples}; broad ${pattern.broadCoverage}; mastery ${pattern.mastery}`);
  }
  lines.push("Unmapped dermoscopic tokens (not inferred):");
  if (!audit.unmappedDermoscopicTokens.length) lines.push("- none");
  for (const row of audit.unmappedDermoscopicTokens) lines.push(`- ${row.caseId}: ${row.token} (${row.label})`);
  lines.push("");
  lines.push("5. Certainty");
  const certainties = [];
  for (const pattern of audit.patterns) for (const row of pattern.occurrences) certainties.push(row.certainty);
  for (const [key, count] of tally(certainties, item => item)) lines.push(`- ${key}: ${count}`);
  lines.push("");
  lines.push("6. Teaching weight");
  const weights = [];
  for (const pattern of audit.patterns) for (const row of pattern.occurrences) weights.push(row.weight || "unrated");
  for (const [key, count] of tally(weights, item => item)) lines.push(`- ${key}: ${count}`);
  lines.push("");
  lines.push("7. Closest mimic");
  const withMimic = audit.cases.filter(item => item.closestMimic).length;
  lines.push(`Stored on ${withMimic} of ${audit.caseCount} cases. Missing means the field is absent, not that a mimic was guessed.`);
  for (const item of audit.cases) lines.push(`- ${item.id}: ${item.closestMimic || "not stored"}`);
  lines.push("");
  lines.push("8. Differential pairs");
  for (const item of audit.cases) lines.push(`- ${item.id}: ${item.differentialCount} stored differentials`);
  lines.push("");
  lines.push("9. Site and special site");
  for (const item of audit.cases) lines.push(`- ${item.id}: ${item.anatomicalSite} -> ${item.specialSite}`);
  lines.push("");
  lines.push("10. Clinical versus dermoscopic");
  for (const [key, count] of tally(audit.cases, item => item.caseType)) lines.push(`- ${key}: ${count}`);
  lines.push("");
  lines.push("11. Verification method");
  for (const [key, count] of tally(audit.cases, item => item.confirmationMethod)) lines.push(`- ${key}: ${count}`);
  lines.push("");
  lines.push("12. Level, teaching type, and repetition");
  for (const [key, count] of tally(audit.cases, item => `educational ${item.educationalLevel}`)) lines.push(`- ${key}: ${count}`);
  for (const [key, count] of tally(audit.cases, item => `curriculum ${item.academyLevel}`)) lines.push(`- ${key}: ${count}`);
  for (const [key, count] of tally(audit.cases, item => `teaching ${item.teachingType}`)) lines.push(`- ${key}: ${count}`);
  const broad = audit.patterns.filter(item => item.broadCoverage).length;
  const single = audit.patterns.filter(item => item.status === "single_example").length;
  lines.push(`Patterns with broad coverage: ${broad}. Patterns with a single example: ${single}.`);
  lines.push("Adequate repetition is not claimed. mastery is false for every pattern.");
  lines.push("");
  lines.push("Known concerns checked against the files, not copied forward:");
  lines.push(`- Seborrheic keratosis cases: ${audit.spectrum.find(item => item.id === "seborrheic-keratosis").count}. Matching images: ${audit.knownConcerns.seborrheicKeratosisImages.length}.`);
  lines.push(`- Dermatofibroma cases: ${audit.spectrum.find(item => item.id === "dermatofibroma").count}. Matching images: ${audit.knownConcerns.dermatofibromaImages.length}.`);
  lines.push(`- Lentigo maligna cases: ${audit.spectrum.find(item => item.id === "lentigo-maligna").count}. Matching images: ${audit.knownConcerns.lentigoMalignaImages.length}.`);
  lines.push(`- Histopathology-confirmed cases: ${audit.knownConcerns.histopathologyCases.join(", ") || "none"}.`);
  lines.push(`- Level 5 curriculum cases: ${audit.knownConcerns.level5Cases.join(", ") || "none"}.`);
  lines.push("");
  lines.push("Benign mimic names stored as closest mimic with no case of that diagnosis:");
  for (const gap of audit.benignGaps) lines.push(`- ${gap.name}: named on ${gap.closestMimicUses} case(s)`);
  lines.push("");
  lines.push("Explicit contrastive pairs (structured relationships, not inferred):");
  if (!audit.comparisons.length) lines.push("- none");
  for (const item of audit.comparisons) lines.push(`- ${item.id}: ${item.caseIdA} <-> ${item.caseIdB}`);
  lines.push(`Screening vocabulary only: ${(audit.screeningCategories || []).map(item => item && (item.label || item.id) || item).join(", ") || "none"}. No session is implemented.`);
  lines.push("Teaching diagnoses are not condition monographs and are not clinician reviewed:");
  for (const item of audit.teachingDiagnoses || []) lines.push(`- ${item.id}: ${item.name}; pole ${item.pole}; monograph ${item.monograph}`);
  return lines.join("\n");
}

function main() {
  const patternData = loadPatternData();
  const caseData = loadCaseData();
  validatePatternLibrary(patternData, caseData);
  const audit = buildAudit(patternData, caseData);
  console.log(`Validated ${patternData.patterns.length} canonical patterns and ${patternData.links.length} case links. Pattern text is review required, not clinician reviewed.`);
  console.log(`Library fingerprint ${audit.libraryFingerprint}.`);
  if (process.argv.includes("--audit")) console.log(formatAudit(audit));
}

module.exports = {
  modalities, categories, usualRoles, coverageStatuses, REASONING_STEPS,
  loadPatternData, patternFingerprint, libraryFingerprint, validatePatternLibrary,
  deriveOccurrences, classifyOccurrences, classifyPatternCoverage, buildAudit, formatAudit,
  lesionPole, specialSite, unmappedDermoscopicTokens, main
};

if (require.main === module) {
  try { main(); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
