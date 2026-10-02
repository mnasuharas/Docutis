const assert = require("node:assert/strict");
const test = require("node:test");
const { loadCaseData, validateCaseData } = require("../scripts/case");
const { loadPatternData, classifyPatternCoverage, buildAudit, educationalRoles } = require("../scripts/pattern");

test("every reusable feature has an educational role and artifacts do not count as diagnosis", () => {
  const patterns = loadPatternData();
  assert.equal(patterns.clinicalReview, null);
  assert.equal(patterns.reviewStatus, "clinician review required");
  const roles = new Set();
  for (const pattern of patterns.patterns) {
    assert.ok(educationalRoles.has(pattern.educationalRole), pattern.id);
    assert.equal(pattern.clinicalReview, null);
    roles.add(pattern.educationalRole);
    if (pattern.category === "frame-artifact") assert.equal(pattern.educationalRole, "image_artifact_or_annotation");
    if (pattern.category === "dermoscopic-structure") assert.equal(pattern.educationalRole, "diagnostic_structure");
    if (pattern.educationalRole === "descriptive_morphology") assert.equal(pattern.category, "clinical-morphology");
  }
  assert.equal(roles.size, 4);
  const coverage = classifyPatternCoverage();
  const ink = coverage.find(item => item.id === "marker-ink");
  const scale = coverage.find(item => item.id === "measuring-scale-in-frame");
  for (const artifact of [ink, scale]) {
    assert.equal(artifact.educationalRole, "image_artifact_or_annotation");
    assert.ok(artifact.independentExamples >= 1);
    assert.equal(artifact.broadCoverage, false);
    assert.equal(artifact.contrastiveCoverage, false);
    assert.equal(artifact.countsTowardDiagnosticCoverage, false);
    assert.equal(artifact.countsTowardDermoscopyCoverage, false);
    assert.equal(artifact.mastery, false);
  }
  const macule = coverage.find(item => item.id === "small-brown-macule");
  const vessels = coverage.find(item => item.id === "arborizing-vessels");
  assert.equal(macule.educationalRole, "descriptive_morphology");
  assert.notEqual(macule.category, vessels.category);
  assert.equal(vessels.educationalRole, "diagnostic_structure");
  const audit = buildAudit();
  assert.ok(audit.signal.diagnosticContrastive.includes("color-variegation"));
  assert.equal(audit.signal.diagnosticContrastive.includes("marker-ink"), false);
  assert.equal(audit.signal.diagnosticContrastive.includes("measuring-scale-in-frame"), false);
  assert.equal(audit.signal.diagnosticBroad.includes("marker-ink"), false);
  assert.equal(audit.signal.dermoscopyCoverage.includes("measuring-scale-in-frame"), false);
  assert.equal(audit.adequateRepetitionClaim, false);
  assert.ok(audit.patterns.every(item => item.mastery === false));
});

test("clinical-only cases do not claim dermoscopic structures, and paired cases name both assets", () => {
  const data = loadCaseData();
  assert.doesNotThrow(() => validateCaseData(data));
  const patterns = loadPatternData();
  const byId = new Map(patterns.patterns.map(item => [item.id, item]));
  const links = new Map(patterns.links.map(item => [item.casePatternId, item.canonicalId]));
  for (const item of data.cases) {
    const types = new Set(item.images.map(image => image.type));
    const clinicalOnly = types.has("clinical") && !types.has("dermoscopy");
    if (clinicalOnly) {
      for (const pattern of item.patterns || []) {
        const canonical = byId.get(links.get(pattern.id));
        if (!canonical) continue;
        if (canonical.category === "dermoscopic-structure" && (pattern.certainty === "clearly_visible" || pattern.certainty === "probably")) {
          assert.fail(`${item.id} claims ${canonical.id} without a dermoscopic image`);
        }
      }
      assert.equal(item.images.some(image => image.type === "dermoscopy"), false);
    }
    if (types.has("clinical") && types.has("dermoscopy")) {
      assert.ok(item.modalityIntegration && item.modalityIntegration.trim().length >= 40, item.id);
      assert.equal(item.images.filter(image => image.type === "clinical").length >= 1, true);
      assert.equal(item.images.filter(image => image.type === "dermoscopy").length >= 1, true);
    }
    assert.equal(item.clinicalReview, null);
    assert.equal(item.reviewStatus, "clinician review required");
    for (const pattern of item.patterns || []) {
      if (pattern.localization != null) assert.fail(`${item.id} populated localization`);
    }
    assert.equal(item.annotations.length, 0, item.id);
  }
  const added = data.cases.filter(item => item.id.startsWith("case-g22-"));
  assert.ok(added.length >= 1);
  for (const item of added) {
    assert.equal(item.recordedScreeningDecision, null);
    assert.equal(item.clinicalReview, null);
  }
  const audit = buildAudit();
  assert.deepEqual(audit.signal.histopathologyConfirmedMelanoma, ["case-acral-melanoma-plantar", "case-g25-01", "case-g25-03", "case-g25-04", "case-g25-05", "case-g26-01", "case-g26-03", "case-g27-03", "case-g27-04"]);
  const nail = audit.signal.specialSites.find(item => item.site === "nail");
  assert.equal(nail.completesSiteCurriculum, false);
  assert.equal(nail.meaningfulContrast, true);
  assert.ok(nail.caseIds.includes("case-g22-01"));
  assert.ok(nail.caseIds.includes("case-g18-12"));
});
