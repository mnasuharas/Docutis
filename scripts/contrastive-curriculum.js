"use strict";

const { loadCaseData, validateContrastiveLayer } = require("./case");
const { buildAudit } = require("./pattern");

function main() {
  const caseData = loadCaseData();
  validateContrastiveLayer(caseData);
  const audit = buildAudit();
  const added = caseData.cases.filter(item => String(item.id).startsWith("case-g21-"));
  if (added.length < 1) throw new Error("Goal 21 added no cases");
  for (const item of added) {
    if (item.reviewStatus !== "clinician review required" || item.clinicalReview !== null) {
      throw new Error(`${item.id}: new clinical content must stay review required`);
    }
    if (!Array.isArray(item.compareWith) || !item.compareWith.length) {
      throw new Error(`${item.id}: a new case needs a stored compare-with link`);
    }
  }
  const benign = audit.cases.filter(item => item.pole === "benign").length;
  if (benign < 1) throw new Error("benign pole was not recorded");
  console.log(`Validated ${caseData.comparisons.length} contrastive pairs and ${added.length} Goal 21 cases. Benign pole cases: ${benign}. Review remains required. This is not clinician approval.`);
}

if (require.main === module) {
  try { main(); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}

module.exports = { main };
