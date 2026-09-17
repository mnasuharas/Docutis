const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const { loadData, loadFollowUpData, followUpFingerprint, validateFollowUpReview } = require("../scripts/clinical-review");
const { validateFollowUpData } = require("../scripts/follow-up");

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function protocol(id) { return loadFollowUpData().protocols.find(item => item.id === id); }

test("German follow-up data covers exactly melanoma, BCC and cSCC", () => {
  const data = validateFollowUpData();
  assert.equal(data.protocols.length, 3);
  assert.deepEqual(Array.from(data.protocols, item => item.diseaseId).sort(), [
    "basal-cell-carcinoma", "cutaneous-melanoma", "cutaneous-squamous-cell-carcinoma"
  ]);
  assert.ok(data.protocols.every(item => item.jurisdiction === "DE" && item.guideline.sourceUrl.startsWith("https://")));
});

test("all follow-up intervals, ranges, modalities and sources validate", () => {
  assert.doesNotThrow(() => validateFollowUpData(loadFollowUpData(), loadData()));
  const data = loadFollowUpData();
  assert.deepEqual(Array.from(data.modalities, item => item.id), [
    "clinical_examination", "lymph_node_ultrasound", "s100b", "cross_sectional_imaging"
  ]);
  assert.ok(data.protocols.every(item => item.guideline.version && item.guideline.publishedAt && item.guideline.sourceMetadataCheckedAt));
});

test("authoritative German schedule matrix retains its key intervals", () => {
  const find = (protocolId, groupId, periodId, modality) => protocol(protocolId).groups
    .find(group => group.id === groupId).periods.find(period => period.id === periodId)
    .recommendations.find(item => item.modality === modality);
  assert.deepEqual(clone(find("cutaneous-melanoma-de", "stage-ia", "years-1-3", "clinical_examination").frequency), { kind: "interval_months", min: 6, max: 6 });
  assert.deepEqual(clone(find("cutaneous-melanoma-de", "stage-ib-iib", "years-6-10", "clinical_examination").frequency), { kind: "interval_months", min: 6, max: 12 });
  assert.deepEqual(clone(find("cutaneous-melanoma-de", "stage-iic-iv-r0", "years-1-3", "cross_sectional_imaging").frequency), { kind: "interval_months", min: 6, max: 6 });
  assert.deepEqual(clone(find("basal-cell-carcinoma-de", "isolated-low-risk", "month-6", "clinical_examination").frequency), { kind: "single_timepoint_month", month: 6 });
  assert.deepEqual(clone(find("basal-cell-carcinoma-de", "intensive-risk-group", "years-1-2", "clinical_examination").frequency), { kind: "interval_months", min: 3, max: 3 });
  assert.deepEqual(clone(find("cutaneous-squamous-cell-carcinoma-de", "low-risk", "years-1-2", "clinical_examination").frequency), { kind: "interval_months", min: 6, max: 6 });
  assert.deepEqual(clone(find("cutaneous-squamous-cell-carcinoma-de", "high-risk", "year-3", "cross_sectional_imaging").frequency), { kind: "occurrences_per_year", min: 0, max: 2 });
  assert.deepEqual(clone(find("cutaneous-squamous-cell-carcinoma-de", "immunosuppressed", "years-6-10", "clinical_examination").frequency), { kind: "interval_months", min: 3, max: 6 });
  assert.deepEqual(clone(find("cutaneous-squamous-cell-carcinoma-de", "locally-advanced-metastatic", "years-4-5", "clinical_examination").frequency), { kind: "interval_months", min: 3, max: 3 });
  assert.deepEqual(clone(find("cutaneous-squamous-cell-carcinoma-de", "locally-advanced-metastatic", "years-6-10", "clinical_examination").frequency), { kind: "interval_months", min: 3, max: 6 });
  assert.equal(find("cutaneous-squamous-cell-carcinoma-de", "high-risk", "years-4-5", "cross_sectional_imaging").status, "not_routinely_scheduled");
  assert.equal(find("cutaneous-squamous-cell-carcinoma-de", "low-risk", "years-3-5", "s100b"), undefined);

  const bcc = protocol("basal-cell-carcinoma-de");
  assert.equal(bcc.groups.length, 2, "combined BCC recommendation must not be split into artificial groups");
  assert.equal(bcc.guideline.publishedAt, "2024-01");
  const cscc = protocol("cutaneous-squamous-cell-carcinoma-de");
  assert.equal(cscc.guideline.version, "2.0");
  assert.equal(cscc.guideline.publishedAt, "2022-12");
  assert.match(cscc.guideline.sourceUrl, /Langversion_2\.0\.pdf$/);
});

test("melanoma in situ is explicit non-interval guidance without an invented schedule", () => {
  const melanoma = protocol("cutaneous-melanoma-de");
  const stageZero = melanoma.groups.find(group => group.id === "melanoma-in-situ");
  assert.equal(stageZero.label, "Melanoma in situ (Stage 0)");
  assert.match(stageZero.description, /No Stage 0-specific structured follow-up interval is defined/i);
  assert.equal(stageZero.periods.length, 1);
  const guidance = stageZero.periods[0];
  assert.equal(guidance.id, "stage-0-guidance");
  assert.equal(guidance.timingStatus, "guidance_only");
  assert.equal(guidance.range, null);
  assert.equal(guidance.recommendations.length, 4);
  const recommendations = Object.fromEntries(guidance.recommendations.map(item => [item.modality, item]));
  assert.equal(recommendations.clinical_examination.status, "scheduled");
  assert.deepEqual(clone(recommendations.clinical_examination.frequency), { kind: "minimum_occurrences_per_year", min: 1 });
  assert.equal(recommendations.clinical_examination.evidenceScope, "german_expert_context");
  for (const modality of ["lymph_node_ultrasound", "s100b", "cross_sectional_imaging"]) {
    assert.equal(recommendations[modality].status, "not_routinely_scheduled");
    assert.equal(recommendations[modality].frequency, null);
    assert.equal(recommendations[modality].recommendationBasis, null);
    assert.equal(recommendations[modality].evidenceScope, "german_clinical_context");
  }
  assert.match(recommendations.cross_sectional_imaging.note, /asymptomatic Stage 0/i);
  assert.deepEqual(Array.from(stageZero.contextSections, item => item.id), ["german-clinical-practice", "self-examination", "international-context"]);
  assert.match(stageZero.contextSections.find(item => item.id === "self-examination").text, /Monthly skin self-examination/i);
  assert.deepEqual(Array.from(melanoma.supplementalSources, item => item.id), ["german-melanoma-patient-guideline", "infoportal-melanoma-in-situ", "aad-melanoma-follow-up"]);
  assert.equal(melanoma.reviewStatus, "clinician review required");
  assert.equal(melanoma.clinicalReview, null);
});

test("invalid ranges, intervals, modalities and conflicting recommendations fail", () => {
  const cases = [];
  const badRange = clone(loadFollowUpData()); badRange.protocols[0].groups[1].periods[0].range = { fromYear: 3, toYear: 1 }; cases.push(badRange);
  const badInterval = clone(loadFollowUpData()); badInterval.protocols[0].groups[1].periods[0].recommendations[0].frequency.min = 0; cases.push(badInterval);
  const badModality = clone(loadFollowUpData()); badModality.protocols[0].groups[1].periods[0].recommendations[0].modality = "unsupported"; cases.push(badModality);
  const duplicate = clone(loadFollowUpData()); duplicate.protocols[0].groups[1].periods[0].recommendations.push(clone(duplicate.protocols[0].groups[1].periods[0].recommendations[0])); cases.push(duplicate);
  const missingSource = clone(loadFollowUpData()); missingSource.protocols[0].guideline.sourceUrl = ""; cases.push(missingSource);
  const missingBasis = clone(loadFollowUpData()); missingBasis.protocols[0].groups[1].periods[0].recommendations[0].recommendationBasis = null; cases.push(missingBasis);
  const badCharacter = clone(loadFollowUpData()); badCharacter.protocols[0].groups[1].periods[0].recommendations[0].recommendationBasis.character = "recommended"; cases.push(badCharacter);
  const fakeMisRange = clone(loadFollowUpData()); fakeMisRange.protocols[0].groups[0].periods[0].range = { fromYear: 1, toYear: 3 }; cases.push(fakeMisRange);
  const badMisFrequency = clone(loadFollowUpData()); badMisFrequency.protocols[0].groups[0].periods[0].recommendations[0].frequency.min = 0; cases.push(badMisFrequency);
  const fakeMisBasis = clone(loadFollowUpData()); fakeMisBasis.protocols[0].groups[0].periods[0].recommendations[0].recommendationBasis = { character: "sollte", consensus: "Konsens" }; cases.push(fakeMisBasis);
  const incompleteMis = clone(loadFollowUpData()); incompleteMis.protocols[0].groups[0].periods[0].recommendations.pop(); cases.push(incompleteMis);
  const primaryMis = clone(loadFollowUpData()); delete primaryMis.protocols[0].groups[0].periods[0].recommendations[0].evidenceScope; cases.push(primaryMis);
  const unresolvedMisSource = clone(loadFollowUpData()); unresolvedMisSource.protocols[0].groups[0].periods[0].recommendations[0].sourceIds = ["missing-source"]; cases.push(unresolvedMisSource);
  const missingContextSource = clone(loadFollowUpData()); missingContextSource.protocols[0].groups[0].contextSections[0].sourceIds = []; cases.push(missingContextSource);
  for (const fixture of cases) assert.throws(() => validateFollowUpData(fixture, loadData()));
});

test("all production follow-up protocols remain unreviewed with null metadata", () => {
  for (const item of loadFollowUpData().protocols) {
    assert.equal(item.reviewStatus, "clinician review required");
    assert.equal(item.clinicalReview, null);
    assert.doesNotThrow(() => validateFollowUpReview(item));
  }
});

test("reviewed follow-up protocol requires complete matching physician metadata", () => {
  const fixture = clone(protocol("cutaneous-melanoma-de"));
  fixture.reviewStatus = "clinician reviewed";
  fixture.clinicalReview = { reviewedAt: "2026-09-16", reviewerRole: "physician", reviewerSpecialty: "dermatology", reviewedContentHash: followUpFingerprint(fixture) };
  assert.doesNotThrow(() => validateFollowUpReview(fixture));
  for (const field of ["reviewedAt", "reviewerRole", "reviewerSpecialty", "reviewedContentHash"]) {
    const invalid = clone(fixture); delete invalid.clinicalReview[field];
    assert.throws(() => validateFollowUpReview(invalid));
  }
});

test("follow-up fingerprints are deterministic and ignore ordering and metadata check dates", () => {
  const original = clone(protocol("cutaneous-squamous-cell-carcinoma-de"));
  const reordered = clone(original);
  reordered.groups.reverse();
  reordered.groups.forEach(group => { group.periods.reverse(); group.periods.forEach(period => period.recommendations.reverse()); });
  reordered.notes.reverse();
  reordered.guideline.sourceMetadataCheckedAt = "2030-01-01";
  reordered.diseaseLabel = "Presentation-only disease label";
  reordered.jurisdictionLabel = "Presentation-only jurisdiction label";
  reordered.groups.forEach(group => {
    group.label = `Presentation-only ${group.id}`;
    group.periods.forEach(period => { period.label = `Presentation-only ${period.id}`; });
  });
  assert.equal(followUpFingerprint(original), followUpFingerprint(reordered));
});

test("every clinically meaningful follow-up change invalidates an old review", () => {
  const base = clone(protocol("cutaneous-melanoma-de"));
  base.reviewStatus = "clinician reviewed";
  base.clinicalReview = { reviewedAt: "2026-09-16", reviewerRole: "physician", reviewerSpecialty: "dermatology", reviewedContentHash: followUpFingerprint(base) };
  const changes = [
    item => { item.diseaseId = "different-disease"; },
    item => { item.jurisdiction = "AT"; },
    item => { item.groups[0].id = "different-stage"; },
    item => { item.groups[0].description += " Clinically meaningful change."; },
    item => { item.groups[0].periods[0].id = "different-guidance-period"; },
    item => { item.groups[1].periods[0].range.toYear = 2; },
    item => { item.groups[0].periods[0].recommendations[0].modality = "s100b"; },
    item => { item.groups[1].periods[0].recommendations[0].status = "conditional"; },
    item => { item.groups[1].periods[0].recommendations[0].frequency.min = 4; },
    item => { item.groups[0].periods[0].recommendations[0].note = "Neue klinische Bedingung"; },
    item => { item.groups[1].periods[0].recommendations[0].recommendationBasis.character = "soll"; },
    item => { item.groups[1].periods[0].recommendations[0].recommendationBasis.consensus = "Konsens"; },
    item => { item.guideline.version = "4.0"; },
    item => { item.guideline.sourceUrl = "https://example.org/replacement-guideline"; },
    item => { item.notes.push("Neue klinisch relevante Anmerkung"); }
  ];
  for (const change of changes) {
    const stale = clone(base); change(stale);
    assert.notEqual(followUpFingerprint(stale), base.clinicalReview.reviewedContentHash);
    assert.throws(() => validateFollowUpReview(stale), /Stale clinical review/);
  }
});

test("melanoma in situ clinical guidance participates in the deterministic fingerprint", () => {
  const original = clone(protocol("cutaneous-melanoma-de"));
  const originalHash = followUpFingerprint(original);
  const changedStatus = clone(original);
  changedStatus.groups[0].periods[0].recommendations[0].status = "not_specified";
  assert.notEqual(followUpFingerprint(changedStatus), originalHash);
  const changedStatement = clone(original);
  changedStatement.groups[0].description = "Different clinical statement.";
  assert.notEqual(followUpFingerprint(changedStatement), originalHash);
  const changedContext = clone(original);
  changedContext.groups[0].contextSections[0].text = "Different contextual statement.";
  assert.notEqual(followUpFingerprint(changedContext), originalHash);
  const changedSource = clone(original);
  changedSource.supplementalSources[0].sourceUrl = "https://example.org/different-source";
  assert.notEqual(followUpFingerprint(changedSource), originalHash);
  const metadataOnly = clone(original);
  metadataOnly.supplementalSources[0].sourceMetadataCheckedAt = "2030-01-01";
  assert.equal(followUpFingerprint(metadataOnly), originalHash);
  assert.equal(followUpFingerprint(original), originalHash);
});

test("resetting a changed protocol to review-required is valid without refreshing its hash", () => {
  const fixture = clone(protocol("basal-cell-carcinoma-de"));
  const oldHash = followUpFingerprint(fixture);
  fixture.groups[0].periods[0].recommendations[0].frequency.min = 5;
  assert.notEqual(followUpFingerprint(fixture), oldHash);
  fixture.reviewStatus = "clinician review required";
  fixture.clinicalReview = null;
  assert.doesNotThrow(() => validateFollowUpReview(fixture));
});

test("maintainer CLI validates data and reports a read-only protocol fingerprint", () => {
  const { spawnSync } = require("node:child_process");
  const validation = spawnSync(process.execPath, [path.join(root, "scripts", "follow-up.js")], { encoding: "utf8" });
  assert.equal(validation.status, 0, validation.stderr);
  assert.match(validation.stdout, /Validated 3 German follow-up protocols/);
  const result = spawnSync(process.execPath, [path.join(root, "scripts", "clinical-review.js"), "--follow-up", "cutaneous-melanoma"], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /sha256-v1:[0-9a-f]{64}/);
  assert.match(result.stdout, /Only a human physician can perform clinical review/);
});

class Element {
  constructor(tagName, ownerDocument) { this.tagName = tagName.toUpperCase(); this.ownerDocument = ownerDocument; this.children = []; this.listeners = {}; this.attributes = {}; this.value = ""; this.textContent = ""; this.className = ""; }
  appendChild(child) { this.children.push(child); child.parentElement = this; if (this.tagName === "SELECT" && this.children.length === 1) this.value = child.value; return child; }
  replaceChildren(...children) { this.children = []; children.forEach(child => this.appendChild(child)); if (!children.length) this.value = ""; }
  addEventListener(type, listener) { (this.listeners[type] ||= []).push(listener); }
  dispatch(type) { for (const listener of this.listeners[type] || []) listener({ type, target: this }); }
  querySelectorAll(selector) { const found = []; const visit = node => { if (selector.startsWith(".") && node.className.split(" ").includes(selector.slice(1))) found.push(node); if (/^[a-z]+$/.test(selector) && node.tagName === selector.toUpperCase()) found.push(node); node.children.forEach(visit); }; this.children.forEach(visit); return found; }
}

function uiHarness(transform) {
  const document = { elements: {}, createElement(tag) { return new Element(tag, document); }, getElementById(id) { return document.elements[id]; } };
  for (const id of ["followUpDisease", "followUpGroup", "followUpPeriod", "followUpResult", "followUpStatus"]) document.elements[id] = new Element(id.includes("followUp") && !id.match(/Result|Status/) ? "select" : "div", document);
  const context = { window: {}, document };
  vm.runInNewContext(fs.readFileSync(path.join(root, "followup-data.js"), "utf8"), context);
  if (transform) context.window.DOCUTIS_FOLLOW_UP_DATA = transform(clone(context.window.DOCUTIS_FOLLOW_UP_DATA));
  vm.runInNewContext(fs.readFileSync(path.join(root, "followup-app.js"), "utf8"), context);
  return document.elements;
}

function textOf(element) { return [element.textContent, ...element.children.map(textOf)].join(" "); }

test("follow-up UI updates disease, group and period with safe provenance links", () => {
  const elements = uiHarness();
  assert.match(textOf(elements.followUpResult), /Cutaneous melanoma: Melanoma in situ \(Stage 0\)/);
  assert.match(textOf(elements.followUpResult), /Guidance without a Stage 0-specific S3 interval/);
  assert.match(textOf(elements.followUpResult), /At least annually/);
  assert.match(textOf(elements.followUpResult), /Not routinely recommended for Stage 0/);
  assert.match(textOf(elements.followUpResult), /Monthly skin self-examination/);
  assert.match(textOf(elements.followUpResult), /International context/);
  assert.doesNotMatch(textOf(elements.followUpResult), /Every \d+ months|10 years of follow-up for melanoma in situ/);
  elements.followUpGroup.value = "stage-ia"; elements.followUpGroup.dispatch("change");
  assert.match(textOf(elements.followUpResult), /Cutaneous melanoma: Stage IA/);
  assert.match(textOf(elements.followUpResult), /Every 6 months/);
  elements.followUpDisease.value = "basal-cell-carcinoma-de"; elements.followUpDisease.dispatch("change");
  assert.match(textOf(elements.followUpResult), /Basal cell carcinoma/);
  assert.equal(elements.followUpGroup.children.length, 2);
  elements.followUpGroup.value = "intensive-risk-group"; elements.followUpGroup.dispatch("change");
  elements.followUpPeriod.value = "after-year-2-event-free"; elements.followUpPeriod.dispatch("change");
  assert.match(textOf(elements.followUpResult), /Annually/);
  assert.match(textOf(elements.followUpResult), /Only if no new BCC or recurrence has occurred for more than 2 years/);
  for (const link of elements.followUpResult.querySelectorAll("a")) { assert.equal(link.target, "_blank"); assert.equal(link.rel, "noopener noreferrer"); }
});

test("follow-up UI safely distinguishes absent recommendations and review-required state", () => {
  const elements = uiHarness();
  elements.followUpDisease.value = "basal-cell-carcinoma-de"; elements.followUpDisease.dispatch("change");
  assert.match(textOf(elements.followUpResult), /Not specified in the guideline/);
  assert.match(textOf(elements.followUpResult), /Clinical review: Required/);
  assert.match(textOf(elements.followUpResult), /Source and schema checks are not clinical review/);
  assert.doesNotMatch(textOf(elements.followUpResult), /sha256-v1:|Reviewed:/);
});

test("follow-up UI terminology is English while official German guideline titles remain intact", () => {
  const elements = uiHarness();
  const rendered = [];
  for (const disease of elements.followUpDisease.children) {
    elements.followUpDisease.value = disease.value; elements.followUpDisease.dispatch("change");
    for (const group of elements.followUpGroup.children) {
      elements.followUpGroup.value = group.value; elements.followUpGroup.dispatch("change");
      for (const period of elements.followUpPeriod.children) {
        elements.followUpPeriod.value = period.value; elements.followUpPeriod.dispatch("change");
        rendered.push(textOf(elements.followUpResult));
      }
    }
  }
  const text = rendered.join(" ");
  assert.match(text, /Clinical examination/);
  assert.match(text, /Lymph node ultrasound/);
  assert.match(text, /Cross-sectional imaging/);
  assert.match(text, /Not routinely scheduled/);
  assert.match(text, /Not specified in the guideline/);
  assert.match(text, /German expert-practice context/);
  assert.match(text, /International context/);
  assert.match(text, /Official guideline title: S3-Leitlinie/);
  assert.doesNotMatch(text, /Klinische Untersuchung|Lymphknoten-Sonographie|Schnittbildgebung|Alle \d|Jahr \d|Im ausgewählten|Kein routinemäßiges|angezeigt/);
});

test("follow-up UI supports a synthetic reviewed state without exposing its hash", () => {
  const elements = uiHarness(data => {
    const item = data.protocols[0]; item.reviewStatus = "clinician reviewed";
    item.clinicalReview = { reviewedAt: "2026-09-16", reviewerRole: "physician", reviewerSpecialty: "dermatology", reviewedContentHash: followUpFingerprint(item) };
    return data;
  });
  assert.match(textOf(elements.followUpResult), /Reviewed by a physician in dermatology/);
  assert.match(textOf(elements.followUpResult), /Reviewed: 2026-09-16/);
  assert.doesNotMatch(textOf(elements.followUpResult), /sha256-v1:/);
});
