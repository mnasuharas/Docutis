"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { buildAssets, loadQuizData, attestationText } = (() => {
  const governance = require("./review-governance");
  return { buildAssets: governance.buildAssets, attestationText: governance.attestationText, loadQuizData: () => require("./quiz").load("quiz-data.js", "DOCUTIS_QUIZ") };
})();
const { loadData, loadFollowUpData } = require("./clinical-review");
const { loadMediaData } = require("./media");

const root = path.join(__dirname, "..");
const generatedAt = "2026-09-20";

function assetContent(asset) {
  if (asset.assetType === "disease") return loadData().diseases.find(item => item.id === asset.id);
  if (asset.assetType === "quiz") return loadQuizData().questions.find(item => item.id === asset.id);
  if (asset.assetType === "visual") return loadMediaData().items.find(item => item.id === asset.id);
  return loadFollowUpData().protocols.find(item => item.id === asset.id);
}

function warnings(asset, content) {
  const values = [];
  if (asset.assetType === "disease") {
    if (!content.clinicalProfile?.treatment?.medications?.length) values.push("No structured medication regimen or dose is encoded; confirm that the scope is sufficiently explicit.");
    if (!content.clinicalProfile?.presentation?.localization) values.push("No structured localization object is present; assess whether the prose is sufficient.");
    if (!content.clinicalProfile?.redFlags?.length) values.push("No separate structured red-flag list is present.");
  }
  if (asset.assetType === "quiz") values.push("Confirm one defensible best answer, distractor safety, explanation accuracy, and independence from the linked record review.");
  if (asset.assetType === "visual") values.push("Confirm every label, spatial relationship, caption, alternative text, legend, and non-diagnostic framing independently.");
  if (asset.assetType === "follow_up") values.push("Confirm German jurisdiction, guideline version, every interval/status, modality, recommendation strength, and contextual source independently.");
  values.push("Automated source attachment and schema validation are not evidence of clinical approval.");
  return values;
}

function markdown(assets) {
  const out = [
    "# Goal 9 consolidated human clinical-review gate",
    "",
    `Generated from the repository on ${generatedAt}. This packet contains no approval and must not be interpreted as physician review.`,
    "",
    "## Reviewer identity and consent",
    "",
    "Complete these fields once for the whole batch. Use the exact professional role; do not upgrade training status or credentials.",
    "",
    "- Public display name:",
    "- Professional role (example: `Physician — Dermatology resident`):",
    "- Specialty or field:",
    "- Training status (optional):",
    "- Jurisdiction/country (optional):",
    "- Public disclosure or conflict-of-interest statement (optional):",
    "- Consent to public display of the fields above: `yes` / `no`",
    "- Review date (`YYYY-MM-DD`):",
    "",
    "Do not enter contact details, licence numbers, signatures, addresses, or private identity evidence in repository files.",
    "",
    "## Required attestation",
    "",
    `> ${attestationText}`,
    "",
    "Attestation version: `docutis-human-clinical-review-v1`",
    "",
    "For every review unit, select exactly one verdict: `approved`, `approved_with_minor_corrections`, `changes_requested`, `not_reviewed`, or `not_applicable`. Record reviewed sections, evidence sources actually checked, required corrections, replacement wording where applicable, and concise public notes. Related assets require independent decisions.",
    ""
  ];
  for (const asset of assets) {
    const content = assetContent(asset);
    out.push(`## ${asset.assetType}: ${asset.title} (\`${asset.id}\`)`, "", `- **Exact fingerprint:** \`${asset.currentFingerprint}\``, `- **Schema version:** ${asset.schemaVersion}`, `- **Reviewable sections:** ${asset.sections.map(value => `\`${value}\``).join(", ")}`, "- **Mapped evidence sources:**");
    asset.evidenceSources.forEach(url => out.push(`  - ${url}`));
    out.push("- **Automated warnings:**");
    warnings(asset, content).forEach(value => out.push(`  - ${value}`));
    out.push("- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.", "", "<details>", "<summary>Current exact content</summary>", "", "```json", JSON.stringify(content, null, 2), "```", "", "</details>", "", "- Verdict:", "- Reviewed sections:", "- Evidence sources actually checked:", "- Approved exact replacement wording (if any):", "- Required corrections / rejected claims:", "- Public reviewer notes:", "");
  }
  out.push("## Maintainer final-fingerprint confirmation", "", "After approved corrections are applied, regenerate this packet and return the final fingerprint list to the reviewer. A decision over a pre-correction fingerprint cannot be reused for modified content unless the reviewer explicitly approved that exact replacement wording and confirms the resulting final fingerprint.", "");
  return `${out.join("\n").replace(/\n+$/, "")}\n`;
}

function template(assets) {
  return {
    schemaVersion: 1,
    instructions: "Complete once, then copy only approved public fields and human decisions into review-data.js. Null fields are incomplete and cannot pass validation.",
    reviewer: {
      id: null, displayName: null, professionalRole: null, specialtyOrField: null,
      trainingStatus: null, jurisdiction: null, publicDisclosure: null, publicDisplayConsent: null
    },
    reviewDate: null,
    attestationVersion: "docutis-human-clinical-review-v1",
    attestationAccepted: null,
    decisions: assets.map(asset => ({
      id: null, assetId: asset.id, assetType: asset.assetType, contentFingerprint: asset.currentFingerprint,
      schemaVersion: asset.schemaVersion, reviewedSections: [], evidenceSourcesChecked: [], verdict: null,
      requiredCorrections: [], approvedReplacementWording: null, reviewerNotes: null
    }))
  };
}

function main(args = process.argv.slice(2)) {
  const assets = buildAssets();
  if (args.includes("--write")) {
    fs.writeFileSync(path.join(root, "GOAL9_HUMAN_REVIEW_GATE.md"), markdown(assets));
    fs.writeFileSync(path.join(root, "goal9-review-decisions.template.json"), `${JSON.stringify(template(assets), null, 2)}\n`);
  }
  console.log(`Prepared ${assets.length} independent review units: 8 diseases, 8 quiz questions, 4 visuals and 3 follow-up protocols.`);
  console.log("No human decisions or attestations were created.");
}

module.exports = { assetContent, warnings, markdown, template, main };
if (require.main === module) {
  try { main(); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
