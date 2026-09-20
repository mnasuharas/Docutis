"use strict";

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.join(__dirname, "..");
const allowedDomains = new Set(["morphology", "localization", "dermoscopy", "differential", "diagnostics", "treatment", "follow-up", "red-flags"]);

function load(file, globalName) {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, file), "utf8"), context);
  return context.window[globalName];
}

function validateQuiz(quiz = load("quiz-data.js", "DOCUTIS_QUIZ"), diseases = load("data.js", "DOCUTIS_DATA"), media = load("media-data.js", "DOCUTIS_MEDIA")) {
  if (!quiz || quiz.schemaVersion !== 1 || !Array.isArray(quiz.questions) || quiz.questions.length < 8) throw new Error("Quiz schemaVersion 1 requires at least eight questions");
  const records = new Map(diseases.diseases.map(record => [record.id, record]));
  const mediaItems = new Map(media.items.map(item => [item.id, item]));
  const ids = new Set();
  for (const question of quiz.questions) {
    if (!question.id?.trim() || ids.has(question.id)) throw new Error("Quiz question IDs must be unique");
    ids.add(question.id);
    const record = records.get(question.diseaseId);
    if (!record?.clinicalProfile) throw new Error(`${question.id}: diseaseId must resolve to a structured pilot record`);
    if (!allowedDomains.has(question.domain)) throw new Error(`${question.id}: unsupported quiz domain`);
    if (!question.prompt?.trim() || !question.explanation?.trim()) throw new Error(`${question.id}: prompt and explanation are required`);
    if (!Array.isArray(question.options) || question.options.length < 3 || question.options.length > 4) throw new Error(`${question.id}: provide three or four options`);
    if (new Set(question.options.map(option => option.trim().toLocaleLowerCase("en"))).size !== question.options.length) throw new Error(`${question.id}: options must be unique`);
    if (!Number.isInteger(question.correctIndex) || question.correctIndex < 0 || question.correctIndex >= question.options.length) throw new Error(`${question.id}: exactly one valid correctIndex is required`);
    if (!Array.isArray(question.sourceUrls) || !question.sourceUrls.length) throw new Error(`${question.id}: at least one source is required`);
    const attached = new Set(record.references.map(reference => reference.url));
    for (const url of question.sourceUrls) if (!attached.has(url)) throw new Error(`${question.id}: source must be attached to the linked condition`);
    if (question.mediaId !== null) {
      const item = mediaItems.get(question.mediaId);
      if (!item || item.diseaseId !== question.diseaseId) throw new Error(`${question.id}: media must resolve to the same condition`);
    }
    if (question.reviewStatus !== "clinician review required" || question.clinicalReview !== null) throw new Error(`${question.id}: quiz content must remain clinician review required`);
  }
  return true;
}

function main() {
  const quiz = load("quiz-data.js", "DOCUTIS_QUIZ");
  validateQuiz(quiz);
  console.log(`Validated ${quiz.questions.length} educational quiz questions. This is not physician review.`);
}

module.exports = { allowedDomains, load, validateQuiz, main };
if (require.main === module) {
  try { main(); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
