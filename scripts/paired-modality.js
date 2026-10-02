"use strict";

const { leaksRecordedDiagnosis, loadCaseData } = require("./case");
const { loadPatternData, buildAudit } = require("./pattern");

const pairProvenanceValues = new Set(["same_lesion_confirmed", "source_documented_pair", "not_paired"]);
const informationGainValues = new Set([
  "dermoscopy_adds_major_discrimination",
  "dermoscopy_adds_support",
  "dermoscopy_changes_leading_differential",
  "dermoscopy_remains_equivocal"
]);
const artifactIds = new Set(["marker-ink", "measuring-scale-in-frame", "printed-pointer", "printed-circle-and-scale"]);

function requireText(value, id, field, min) {
  if (typeof value !== "string" || value.trim().length < min) {
    throw new Error(`${id}: ${field} is required`);
  }
}

function sameIds(left, right) {
  return JSON.stringify(left || []) === JSON.stringify(right || []);
}

function imageIds(caseItem, type) {
  return (caseItem.images || []).filter(image => image && image.type === type).map(image => image.id);
}

function validatePairProvenance(caseData = loadCaseData()) {
  if (!Array.isArray(caseData.pairProvenance) || !caseData.pairProvenance.length) {
    throw new Error("pairProvenance registry is required");
  }
  const byId = new Map();
  for (const row of caseData.pairProvenance) {
    if (!row || !row.caseId || byId.has(row.caseId)) throw new Error(`invalid pair provenance row: ${row && row.caseId}`);
    if (!pairProvenanceValues.has(row.provenance)) throw new Error(`${row.caseId}: unsupported pair provenance`);
    requireText(row.basis, row.caseId, "pair basis", 40);
    if (!Array.isArray(row.clinicalImageIds) || !Array.isArray(row.dermoscopicImageIds)) {
      throw new Error(`${row.caseId}: pair image ids are required`);
    }
    if (row.informationGain != null && !informationGainValues.has(row.informationGain)) {
      throw new Error(`${row.caseId}: unsupported information-gain label`);
    }
    if (row.informationGain && (typeof row.informationGainNote !== "string" || row.informationGainNote.trim().length < 20)) {
      throw new Error(`${row.caseId}: an information-gain label needs an educational note`);
    }
    if (!row.informationGain && row.informationGainNote) {
      throw new Error(`${row.caseId}: an information-gain note requires a label`);
    }
    for (const key of ["roi", "bbox", "polygon", "crop", "localization"]) {
      if (row[key] != null) throw new Error(`${row.caseId}: pair provenance must not store coordinates`);
    }
    byId.set(row.caseId, row);
  }
  const again = JSON.parse(JSON.stringify(caseData.pairProvenance));
  if (JSON.stringify(again) !== JSON.stringify(caseData.pairProvenance)) {
    throw new Error("pair provenance did not survive serialization");
  }
  for (const caseItem of caseData.cases) {
    const row = byId.get(caseItem.id);
    if (!row) throw new Error(`${caseItem.id}: pair provenance is required`);
    const clinical = imageIds(caseItem, "clinical");
    const dermoscopy = imageIds(caseItem, "dermoscopy");
    const pairedImages = clinical.length > 0 && dermoscopy.length > 0;
    if (!sameIds(row.clinicalImageIds, clinical) || !sameIds(row.dermoscopicImageIds, dermoscopy)) {
      throw new Error(`${caseItem.id}: pair provenance image ids do not match the stored assets`);
    }
    if (pairedImages) {
      if (row.provenance === "not_paired") {
        throw new Error(`${caseItem.id}: unrelated images cannot be stored as a silent pair`);
      }
      validatePairedModality(caseItem, row);
    } else {
      if (row.provenance !== "not_paired") {
        throw new Error(`${caseItem.id}: a single-modality case cannot claim a pair`);
      }
      if (caseItem.pairedModality != null) {
        throw new Error(`${caseItem.id}: paired modality text is only for a true pair`);
      }
      if (row.informationGain != null) {
        throw new Error(`${caseItem.id}: an information-gain label requires a true pair`);
      }
    }
    if (Object.prototype.hasOwnProperty.call(caseItem, "pairProvenance") && caseItem.pairProvenance !== row.provenance) {
      throw new Error(`${caseItem.id}: embedded pair provenance does not match the registry`);
    }
    if (Object.prototype.hasOwnProperty.call(caseItem, "localization") && caseItem.localization != null) {
      throw new Error(`${caseItem.id}: localization stays empty`);
    }
    if (caseItem.recordedScreeningDecision != null && caseItem.id.startsWith("case-g23-")) {
      throw new Error(`${caseItem.id}: recordedScreeningDecision stays null`);
    }
    if (caseItem.clinicalReview !== null || caseItem.reviewStatus !== "clinician review required") {
      throw new Error(`${caseItem.id}: clinical review must stay required`);
    }
  }
  if (byId.size !== caseData.cases.length) throw new Error("pair provenance has a row for a case that does not exist");
  return true;
}

function validatePairedModality(caseItem, row) {
  const id = caseItem.id;
  const block = caseItem.pairedModality;
  if (!block || typeof block !== "object") throw new Error(`${id}: a true pair needs a paired modality record`);
  for (const field of ["clinicalObservation", "dermoscopicObservation", "addedValue", "reasoningImpact", "limits"]) {
    requireText(block[field], id, field, 20);
    if (leaksRecordedDiagnosis(block[field], caseItem)) throw new Error(`${id}: ${field} names the recorded diagnosis`);
  }
  if (block.informationGain !== row.informationGain) throw new Error(`${id}: information-gain label does not match the registry`);
  requireText(block.informationGainNote, id, "informationGainNote", 20);
  if (block.informationGainNote !== row.informationGainNote) throw new Error(`${id}: information-gain note does not match the registry`);
  const comparison = block.comparison;
  if (!comparison || typeof comparison !== "object") throw new Error(`${id}: post-reveal comparison is required`);
  for (const field of ["clinicalClue", "dermoscopicClue", "addedInformation", "teachingRule"]) {
    requireText(comparison[field], id, field, 8);
    if (leaksRecordedDiagnosis(comparison[field], caseItem)) throw new Error(`${id}: ${field} names the recorded diagnosis`);
  }
  if (comparison.diagnosticConflict != null) {
    requireText(comparison.diagnosticConflict, id, "diagnosticConflict", 8);
    if (leaksRecordedDiagnosis(comparison.diagnosticConflict, caseItem)) {
      throw new Error(`${id}: diagnosticConflict names the recorded diagnosis`);
    }
  }
  const modalities = new Set(["clinical", "dermoscopy"]);
  for (const observation of caseItem.observations || []) {
    if (!modalities.has(observation.modality)) {
      throw new Error(`${id}: each observation on a true pair must name clinical or dermoscopy`);
    }
  }
  const hasClinicalObservation = (caseItem.observations || []).some(item => item.modality === "clinical");
  const hasDermoscopicObservation = (caseItem.observations || []).some(item => item.modality === "dermoscopy");
  if (!hasClinicalObservation || !hasDermoscopicObservation) {
    throw new Error(`${id}: a true pair needs a clinical observation and a dermoscopic observation`);
  }
}

function isMelanomaLabel(label) {
  return /melanoma/i.test(label || "");
}

function truePairIds(caseData) {
  const ids = new Set();
  for (const row of caseData.pairProvenance || []) {
    if (row && row.provenance && row.provenance !== "not_paired") ids.add(row.caseId);
  }
  return ids;
}

function positiveExamples(pattern) {
  return (pattern.occurrences || []).filter(item => item.certainty === "clearly_visible" || item.certainty === "probably");
}

function patternRichPairIds(caseData = loadCaseData(), patternData = loadPatternData()) {
  const paired = truePairIds(caseData);
  const canonical = new Map(patternData.patterns.map(item => [item.id, item]));
  const links = new Map(patternData.links.map(item => [item.casePatternId, item.canonicalId]));
  const rows = new Map((caseData.pairProvenance || []).map(row => [row.caseId, row]));
  const ids = [];
  for (const caseItem of caseData.cases) {
    if (!paired.has(caseItem.id)) continue;
    if (rows.get(caseItem.id).informationGain === "dermoscopy_remains_equivocal") continue;
    const hasDermoscopy = caseItem.images.some(image => image.type === "dermoscopy");
    const structure = (caseItem.patterns || []).some(pattern => {
      const target = canonical.get(links.get(pattern.id));
      return hasDermoscopy && target && target.educationalRole === "diagnostic_structure" && target.category === "dermoscopic-structure" &&
        !artifactIds.has(target.id) && pattern.modality === "dermoscopy" && (pattern.certainty === "clearly_visible" || pattern.certainty === "probably");
    });
    if (structure) ids.push(caseItem.id);
  }
  return ids;
}

function equivocalPairIds(caseData = loadCaseData()) {
  const paired = truePairIds(caseData);
  return (caseData.pairProvenance || []).filter(row => paired.has(row.caseId) && row.informationGain === "dermoscopy_remains_equivocal").map(row => row.caseId);
}

/* Per-structure repetition. Observations are positive case patterns; independent cases are distinct case ids, so two panels or two patterns from one lesion count once. */
function buildStructureRepetition(caseData = loadCaseData(), audit = null) {
  const report = audit || buildAudit(loadPatternData(), caseData);
  const paired = truePairIds(caseData);
  const isBenign = pole => pole === "benign" || pole === "benign-or-inflammatory";
  const rows = [];
  for (const pattern of report.patterns) {
    if (pattern.educationalRole !== "diagnostic_structure" || artifactIds.has(pattern.id)) continue;
    const occurrences = (pattern.occurrences || []).filter(row => row.evidence === "case-pattern");
    const positives = positiveExamples({ occurrences });
    const cases = new Map();
    for (const row of positives) if (!cases.has(row.caseId)) cases.set(row.caseId, row);
    const independent = [...cases.values()];
    const count = certainty => occurrences.filter(row => row.certainty === certainty).length;
    rows.push({
      id: pattern.id,
      positiveObservations: positives.length,
      independentPositiveCases: independent.map(row => row.caseId),
      clearlyVisible: count("clearly_visible"),
      probablyVisible: count("probably"),
      uncertain: count("uncertain"),
      notVisible: count("not_visible"),
      benignCases: independent.filter(row => isBenign(row.pole)).map(row => row.caseId),
      malignantCases: independent.filter(row => row.pole === "malignant").map(row => row.caseId),
      truePairCases: independent.filter(row => paired.has(row.caseId)).map(row => row.caseId),
      histopathologyCases: independent.filter(row => row.confirmationMethod === "histopathology").map(row => row.caseId)
    });
  }
  return rows;
}

function buildPairedMetrics(caseData = loadCaseData(), audit = null) {
  validatePairProvenance(caseData);
  const report = audit || buildAudit(loadPatternData(), caseData);
  const paired = truePairIds(caseData);
  const cases = report.cases;
  const withDermoscopy = cases.filter(item => (item.imageTypes || []).includes("dermoscopy"));
  const pairedCases = cases.filter(item => paired.has(item.id));
  const melanoma = cases.filter(item => isMelanomaLabel(item.diagnosisLabel));
  const melanomaHisto = melanoma.filter(item => item.confirmationMethod === "histopathology");
  const pairedMelanoma = melanoma.filter(item => paired.has(item.id));
  const pairedHistoMelanoma = pairedMelanoma.filter(item => item.confirmationMethod === "histopathology");
  const benignMimicsWithDermoscopy = withDermoscopy.filter(item => item.pole === "benign" || item.pole === "benign-or-inflammatory");
  const repeatedStructures = report.patterns.filter(item => {
    return item.educationalRole === "diagnostic_structure" && !artifactIds.has(item.id) && positiveExamples(item).length > 1;
  });
  const bothContexts = report.patterns.filter(item => {
    if (item.educationalRole !== "diagnostic_structure" || artifactIds.has(item.id)) return false;
    const poles = new Set(positiveExamples(item).map(row => row.pole));
    const benign = [...poles].some(pole => pole === "benign" || pole === "benign-or-inflammatory");
    const malignant = poles.has("malignant");
    return benign && malignant;
  });
  const specialSiteWithDermoscopy = withDermoscopy.filter(item => ["face", "acral", "nail", "ear"].includes(item.specialSite));
  const pairedContrastive = (caseData.comparisons || []).filter(item => paired.has(item.caseIdA) && paired.has(item.caseIdB));
  const patternRich = new Set(patternRichPairIds(caseData));
  const isBenign = item => item.pole === "benign" || item.pole === "benign-or-inflammatory";
  const repetition = buildStructureRepetition(caseData, report);
  return {
    structureRepetition: repetition,
    diagnosticStructuresWithMoreThanOneIndependentPositiveCase: repetition.filter(row => row.independentPositiveCases.length > 1).map(row => row.id),
    patternRichPairs: pairedCases.filter(item => patternRich.has(item.id)).map(item => item.id),
    equivocalPairs: equivocalPairIds(caseData),
    patternRichPairedMelanoma: pairedMelanoma.filter(item => patternRich.has(item.id)).map(item => item.id),
    patternRichPairedMelanomaWithHistopathology: pairedHistoMelanoma.filter(item => patternRich.has(item.id)).map(item => item.id),
    pairedBenign: pairedCases.filter(isBenign).map(item => item.id),
    patternRichBenignPairs: pairedCases.filter(item => isBenign(item) && patternRich.has(item.id)).map(item => item.id),
    specialSiteTruePairs: pairedCases.filter(item => ["face", "acral", "nail"].includes(item.specialSite)).map(item => item.id),
    casesWithDermoscopy: withDermoscopy.map(item => item.id),
    paired: pairedCases.map(item => item.id),
    melanomasWithDermoscopy: melanoma.filter(item => (item.imageTypes || []).includes("dermoscopy")).map(item => item.id),
    benignMimicsWithDermoscopy: benignMimicsWithDermoscopy.map(item => item.id),
    diagnosticStructuresWithMoreThanOnePositiveExample: repeatedStructures.map(item => item.id),
    structuresInBenignAndMalignantContexts: bothContexts.map(item => item.id),
    specialSiteCasesWithDermoscopy: specialSiteWithDermoscopy.map(item => item.id),
    truePairedContrastiveRelationships: pairedContrastive.map(item => item.id),
    melanomaTotal: melanoma.map(item => item.id),
    melanomaWithHistopathology: melanomaHisto.map(item => item.id),
    pairedMelanoma: pairedMelanoma.map(item => item.id),
    pairedMelanomaWithHistopathology: pairedHistoMelanoma.map(item => item.id),
    artifactIdsExcluded: [...artifactIds]
  };
}

function auditFeatureTaxonomy(patternData = loadPatternData()) {
  const ids = new Set();
  const labels = new Map();
  const issues = [];
  for (const pattern of patternData.patterns) {
    if (ids.has(pattern.id)) issues.push(`duplicate id ${pattern.id}`);
    ids.add(pattern.id);
    const label = String(pattern.displayName || "").trim().toLowerCase();
    if (labels.has(label)) issues.push(`duplicate label ${pattern.displayName} on ${labels.get(label)} and ${pattern.id}`);
    else labels.set(label, pattern.id);
    if (pattern.category === "dermoscopic-structure" && pattern.educationalRole !== "diagnostic_structure") {
      issues.push(`${pattern.id}: dermoscopic structure is not a diagnostic structure`);
    }
    if (pattern.educationalRole === "descriptive_morphology" && pattern.category !== "clinical-morphology") {
      issues.push(`${pattern.id}: descriptive morphology is not clinical`);
    }
    if (pattern.educationalRole === "image_artifact_or_annotation" && pattern.category !== "frame-artifact") {
      issues.push(`${pattern.id}: artifact is not in the frame-artifact category`);
    }
    if (pattern.category === "frame-artifact" && (pattern.educationalRole !== "image_artifact_or_annotation" || pattern.modality !== "none")) {
      issues.push(`${pattern.id}: frame artifact left the image-mark role`);
    }
  }
  if (issues.length) throw new Error(issues.join("; "));
  return { issues, patternCount: patternData.patterns.length };
}

function formatMetrics(metrics) {
  const line = (label, ids) => `- ${label}: ${ids.length}${ids.length ? ` (${ids.join(", ")})` : ""}`;
  return [
    "Paired clinical–dermoscopy metrics. Qualitative. Not a score. Artifacts are excluded from diagnostic structure counts.",
    line("Cases with a dermoscopic asset", metrics.casesWithDermoscopy),
    line("True pairs", metrics.paired),
    line("Pattern-rich true pairs", metrics.patternRichPairs),
    line("Equivocal true pairs", metrics.equivocalPairs),
    line("Melanoma total", metrics.melanomaTotal),
    line("Melanoma with histopathology", metrics.melanomaWithHistopathology),
    line("Melanoma with dermoscopy", metrics.melanomasWithDermoscopy),
    line("Paired melanoma", metrics.pairedMelanoma),
    line("Paired melanoma with histopathology", metrics.pairedMelanomaWithHistopathology),
    line("Pattern-rich paired melanoma", metrics.patternRichPairedMelanoma),
    line("Pattern-rich paired melanoma with histopathology", metrics.patternRichPairedMelanomaWithHistopathology),
    line("True paired benign cases", metrics.pairedBenign),
    line("Pattern-rich benign pairs", metrics.patternRichBenignPairs),
    line("Special-site true pairs (face, acral, nail)", metrics.specialSiteTruePairs),
    line("Benign mimics with dermoscopy", metrics.benignMimicsWithDermoscopy),
    line("Diagnostic structures with more than one positive example", metrics.diagnosticStructuresWithMoreThanOnePositiveExample),
    line("Diagnostic structures with more than one independent positive case", metrics.diagnosticStructuresWithMoreThanOneIndependentPositiveCase),
    line("Diagnostic structures in both benign and malignant contexts", metrics.structuresInBenignAndMalignantContexts),
    "Structure repetition (observations / independent cases; clear, probable, uncertain, not visible; benign, malignant, true-pair, histopathology cases):",
    ...metrics.structureRepetition.filter(row => row.positiveObservations || row.uncertain || row.notVisible).map(row => `  - ${row.id}: ${row.positiveObservations} / ${row.independentPositiveCases.length}; ${row.clearlyVisible}, ${row.probablyVisible}, ${row.uncertain}, ${row.notVisible}; ${row.benignCases.length}, ${row.malignantCases.length}, ${row.truePairCases.length}, ${row.histopathologyCases.length}`),
    line("Special-site cases with dermoscopy", metrics.specialSiteCasesWithDermoscopy),
    line("True paired contrastive relationships", metrics.truePairedContrastiveRelationships),
    "Clinical review remains deferred. All new clinical content remains review required."
  ].join("\n");
}

function main() {
  const caseData = loadCaseData();
  const patternData = loadPatternData();
  validatePairProvenance(caseData);
  auditFeatureTaxonomy(patternData);
  const metrics = buildPairedMetrics(caseData);
  console.log(formatMetrics(metrics));
}

if (require.main === module) {
  try { main(); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}

module.exports = {
  pairProvenanceValues, informationGainValues, artifactIds,
  validatePairProvenance, validatePairedModality, buildPairedMetrics, buildStructureRepetition, patternRichPairIds, equivocalPairIds, auditFeatureTaxonomy, formatMetrics, truePairIds, main
};
