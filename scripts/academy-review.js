"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { loadCaseData } = require("./case");

const root = path.join(__dirname, "..");
const outPath = path.join(root, "academy-review.html");

const CERTAINTY = {
  clearly_visible: "Clearly visible",
  probably: "Probably present",
  uncertain: "Uncertain",
  not_visible: "Not visible in this image"
};
const WEIGHT = {
  major: "Major clue",
  supportive: "Supportive",
  weak: "Weak",
  conflicting: "Conflicts with a simple reading"
};
const TYPE = {
  teaching: "Teaching case",
  reasoning: "Reasoning case",
  "expert-challenge": "Expert-challenge case"
};

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function paragraph(text) {
  if (!text) return "";
  return `<p>${escapeHtml(text)}</p>`;
}

function list(items) {
  const rows = (items || []).filter(Boolean);
  if (!rows.length) return "<p>None recorded.</p>";
  return `<ul>${rows.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderCase(caseItem, entry, skills) {
  const skillTitles = (entry.skillIds || []).map(id => {
    const skill = skills.find(item => item.id === id);
    return skill ? skill.title : id;
  });
  const images = (caseItem.images || []).map(image => `
    <li>
      <p><strong>${escapeHtml(image.type)}</strong> · ${escapeHtml(image.license)} · ${escapeHtml(image.creator)}</p>
      <p>File: ${escapeHtml(image.src)}</p>
      <p>Source: <a href="${escapeHtml(image.sourceUrl)}">${escapeHtml(image.source || image.sourceUrl)}</a></p>
      <p>${escapeHtml(image.attribution || "")}</p>
      <p>Modification: ${escapeHtml(image.modificationStatus)}${image.modificationsNotes ? ` — ${escapeHtml(image.modificationsNotes)}` : ""}</p>
    </li>`).join("");
  const patterns = (caseItem.patterns || []).map(pattern => `
    <li>
      <p><strong>${escapeHtml(pattern.label)}</strong> — ${escapeHtml(CERTAINTY[pattern.certainty] || "Certainty not recorded")}; ${escapeHtml(WEIGHT[pattern.weight] || "Weight not recorded")}</p>
      <p>${escapeHtml(pattern.specificityNote || "")}</p>
    </li>`).join("");
  const differentials = (caseItem.differentials || []).map(diff => `
    <li>
      <p><strong>${escapeHtml(diff.diagnosis)}</strong></p>
      <p>Why it fits: ${escapeHtml((diff.supportingFeatures || []).join("; ") || "Not recorded")}</p>
      <p>Why not: ${escapeHtml((diff.contradictingFeatures || []).join("; ") || "Not recorded")}</p>
      <p>${escapeHtml(diff.teachingDistinction || "")}</p>
    </li>`).join("");
  const whyNot = (caseItem.whyNot || []).map(item => `<li><strong>${escapeHtml(item.mimic)}</strong> — ${escapeHtml(item.text || "")}</li>`).join("");
  const ground = caseItem.diagnosticGroundTruth || {};
  return `
  <article id="${escapeHtml(caseItem.id)}">
    <h2>${escapeHtml(caseItem.title)} <span class="meta">(${escapeHtml(caseItem.id)})</span></h2>
    <p class="banner">Review required. Not clinician reviewed. clinicalReview is null.</p>
    <dl>
      <div><dt>Teaching type</dt><dd>${escapeHtml(TYPE[entry.teachingType] || entry.teachingType)}</dd></div>
      <div><dt>Curriculum level</dt><dd>${escapeHtml(entry.level)} · ${escapeHtml(entry.spectrum)}</dd></div>
      <div><dt>Skills</dt><dd>${escapeHtml(skillTitles.join(", "))}</dd></div>
      <div><dt>Recorded diagnosis</dt><dd>${escapeHtml(caseItem.diagnosisLabel)}</dd></div>
      <div><dt>Disease record</dt><dd>${escapeHtml(caseItem.diseaseId)}</dd></div>
      <div><dt>Confirmation</dt><dd>${escapeHtml(ground.confirmationMethod)} — ${escapeHtml(ground.confirmationNotes || "")}</dd></div>
      <div><dt>Site</dt><dd>${escapeHtml(caseItem.patientContext && caseItem.patientContext.anatomicalSite)}</dd></div>
    </dl>
    <h3>Provenance</h3>
    <ul>${images}</ul>
    <h3>Observations</h3>
    ${list((caseItem.observations || []).map(item => item.text))}
    <h3>Observation prompts</h3>
    ${caseItem.observationPrompts ? list(caseItem.observationPrompts) : "<p>Legacy pilot. No new prompt field was added, so the governed payload stays unchanged.</p>"}
    <h3>Features, certainty, and weight</h3>
    ${patterns ? `<ul>${patterns}</ul>` : "<p>Legacy pilot. Feature weights were not injected into this payload.</p>"}
    <h3>Differential</h3>
    <ul>${differentials}</ul>
    <h3>Closest mimic</h3>
    ${caseItem.closestMimic ? `${paragraph(caseItem.closestMimic.name)}${paragraph(caseItem.closestMimic.whyClosest)}` : "<p>Not stored on this legacy pilot.</p>"}
    <h3>Why not</h3>
    ${whyNot ? `<ul>${whyNot}</ul>` : "<p>None recorded on this case.</p>"}
    <h3>Reasoning</h3>
    ${paragraph(caseItem.synthesis)}
    ${paragraph(caseItem.evidenceWeighting)}
    <h3>Diagnostic trap</h3>
    ${paragraph(caseItem.diagnosticTrap)}
    <h3>Mentor note</h3>
    ${paragraph(caseItem.mentorNote)}
    <h3>Take-home rule</h3>
    ${paragraph(caseItem.takeHomeRule)}
    <h3>Management brief</h3>
    <p class="banner">Review required. Not a protocol.</p>
    ${paragraph(caseItem.managementBrief || caseItem.clinicalAction)}
  </article>`;
}

function renderDocument(caseData) {
  const curriculum = caseData.curriculum;
  const byId = new Map(caseData.cases.map(item => [item.id, item]));
  const outside = caseData.cases.filter(item => !curriculum.entries.some(entry => entry.caseId === item.id));
  const counts = { teaching: 0, reasoning: 0, "expert-challenge": 0 };
  curriculum.entries.forEach(entry => { counts[entry.teachingType] = (counts[entry.teachingType] || 0) + 1; });
  const levelCounts = curriculum.levels.map(level => {
    const n = curriculum.entries.filter(entry => entry.level === level.level).length;
    return `${level.level}. ${level.title}: ${n}`;
  }).join("; ");
  const body = curriculum.entries
    .slice()
    .sort((a, b) => a.order - b.order)
    .map(entry => renderCase(byId.get(entry.caseId), entry, curriculum.skills))
    .join("\n");
  const outsideHtml = outside.map(item => `<li>${escapeHtml(item.title)} (${escapeHtml(item.id)}) stays in the library and outside Learn Melanoma. Default reason: it is not a melanoma-pathway skill case.</li>`).join("");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Learn Melanoma reviewer workspace</title>
  <style>
    body { font-family: Georgia, "Times New Roman", serif; line-height: 1.5; margin: 1.5rem; color: #1b1b1b; background: #fff; }
    main { max-width: 46rem; }
    .banner { border: 1px solid #8a3b12; background: #fff4ec; padding: 0.6rem 0.8rem; font-weight: 700; }
    article { border-top: 2px solid #1b1b1b; margin-top: 2rem; padding-top: 1rem; }
    dt { font-weight: 700; }
    dd { margin: 0 0 0.4rem; }
    .meta { font-weight: 400; font-size: 0.9rem; }
    a { color: #0b3a75; }
  </style>
</head>
<body>
<main>
  <p class="banner">Review required. This page is for a human reviewer. It is not clinician review, not a score, and not a learner step. Diagnoses are visible here on purpose. No case was approved by generating this page.</p>
  <h1>Learn Melanoma reviewer workspace</h1>
  <p>Generated from <code>case-data.js</code> by <code>node scripts/academy-review.js --write</code>. Do not hand-edit. If the cases change, regenerate this file.</p>
  <p>${escapeHtml(curriculum.disclaimer || "")}</p>
  <p>Primary path: ${curriculum.entries.length} cases. Registry: ${caseData.cases.length}. Teaching ${counts.teaching}, reasoning ${counts.reasoning}, expert-challenge ${counts["expert-challenge"]}. ${escapeHtml(levelCounts)}.</p>
  <p>${escapeHtml(curriculum.qualityGate && curriculum.qualityGate.summary || "")}</p>
  <h2>Outside the primary path</h2>
  <ul>${outsideHtml}</ul>
  ${body}
</main>
</body>
</html>
`;
}

function main() {
  const html = renderDocument(loadCaseData());
  const check = process.argv.includes("--check");
  const write = process.argv.includes("--write");
  if (!check && !write) {
    process.stdout.write(html);
    return;
  }
  if (write) fs.writeFileSync(outPath, html);
  if (check) {
    const current = fs.existsSync(outPath) ? fs.readFileSync(outPath, "utf8") : "";
    if (current !== html) {
      console.error("academy-review.html is stale. Run node scripts/academy-review.js --write");
      process.exitCode = 1;
      return;
    }
    console.log("academy-review.html matches case-data.js");
  }
}

module.exports = { renderDocument, main };

if (require.main === module) main();
