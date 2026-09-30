"use strict";

const { loadCaseData } = require("./case");
const { loadPatternData, validatePatternLibrary, buildAudit } = require("./pattern");

function main() {
  const patternData = loadPatternData();
  const caseData = loadCaseData();
  validatePatternLibrary(patternData, caseData);
  const missingRole = patternData.patterns.filter(item => !item.educationalRole);
  if (missingRole.length) throw new Error("every reusable feature needs an educational role");
  const audit = buildAudit(patternData, caseData);
  const byId = new Map(audit.patterns.map(item => [item.id, item]));
  for (const id of ["marker-ink", "measuring-scale-in-frame", "printed-pointer", "printed-circle-and-scale"]) {
    const pattern = byId.get(id);
    if (!pattern) throw new Error(`missing artifact ${id}`);
    if (pattern.educationalRole !== "image_artifact_or_annotation") throw new Error(`${id} must stay an image mark`);
    if (pattern.broadCoverage || pattern.contrastiveCoverage || pattern.countsTowardDermoscopyCoverage || pattern.mastery) {
      throw new Error(`${id} increased diagnostic, contrastive, dermoscopy, or mastery coverage`);
    }
  }
  for (const pattern of audit.patterns) {
    if (pattern.educationalRole !== "diagnostic_structure" && (pattern.broadCoverage || pattern.contrastiveCoverage || pattern.countsTowardDermoscopyCoverage)) {
      throw new Error(`${pattern.id} is not a diagnostic structure but still counts as diagnostic coverage`);
    }
    if (pattern.mastery) throw new Error(`${pattern.id}: mastery must stay false`);
  }
  const descriptive = byId.get("flat-brown-macule");
  const dermoscopic = byId.get("arborizing-vessels");
  if (descriptive.educationalRole !== "descriptive_morphology" || descriptive.category === "dermoscopic-structure") {
    throw new Error("descriptive morphology was not kept distinct from a dermoscopic structure");
  }
  if (dermoscopic.category !== "dermoscopic-structure" || dermoscopic.educationalRole !== "diagnostic_structure") {
    throw new Error("a dermoscopic structure must stay a diagnostic structure");
  }
  for (const item of caseData.cases) {
    const hasDermoscopy = item.images.some(image => image.type === "dermoscopy");
    const hasClinical = item.images.some(image => image.type === "clinical");
    if (hasClinical && hasDermoscopy && (!item.modalityIntegration || !item.modalityIntegration.trim())) {
      throw new Error(`${item.id}: paired case does not identify the integration of both assets`);
    }
    if (item.id.startsWith("case-g22-")) {
      if (item.reviewStatus !== "clinician review required" || item.clinicalReview !== null) {
        throw new Error(`${item.id}: new clinical content must stay review required`);
      }
    }
  }
  if (!audit.signal.diagnosticContrastive.every(id => byId.get(id).educationalRole === "diagnostic_structure")) {
    throw new Error("contrastive coverage included a feature that is not clinically meaningful as a diagnostic structure");
  }
  console.log(`Diagnostic structures with broad coverage: ${audit.signal.diagnosticBroad.join(", ") || "none"}.`);
  console.log(`Diagnostic contrastive coverage: ${audit.signal.diagnosticContrastive.join(", ") || "none"}.`);
  console.log(`Dermoscopy coverage: ${audit.signal.dermoscopyCoverage.join(", ") || "none"}.`);
  console.log(`Histopathology-confirmed melanoma: ${audit.signal.histopathologyConfirmedMelanoma.join(", ") || "none"}.`);
  console.log("Image marks do not count. Clinical review remains deferred. This is not clinician approval and not a score.");
}

if (require.main === module) {
  try { main(); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}

module.exports = { main };
