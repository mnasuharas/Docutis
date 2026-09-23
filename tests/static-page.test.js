const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "style.css"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
const contributing = fs.readFileSync(path.join(root, "CONTRIBUTING.md"), "utf8");
const roadmap = fs.readFileSync(path.join(root, "ROADMAP.md"), "utf8");
const followUpDocs = fs.readFileSync(path.join(root, "FOLLOW_UP_PROTOCOLS.md"), "utf8");
const goal5Review = fs.readFileSync(path.join(root, "GOAL5_CLINICAL_REVIEW.md"), "utf8");
const mediaGovernance = fs.readFileSync(path.join(root, "MEDIA_GOVERNANCE.md"), "utf8");
const mediaData = fs.readFileSync(path.join(root, "media-data.js"), "utf8");
const quizData = fs.readFileSync(path.join(root, "quiz-data.js"), "utf8");
const quizApp = fs.readFileSync(path.join(root, "quiz-app.js"), "utf8");
const clinicalSchema = fs.readFileSync(path.join(root, "clinical-schema.js"), "utf8");
const clinicalSchemaDocs = fs.readFileSync(path.join(root, "CLINICAL_SCHEMA.md"), "utf8");
const qualityAudit = fs.readFileSync(path.join(root, "CONTENT_QUALITY_AUDIT.md"), "utf8");
const followUpApp = fs.readFileSync(path.join(root, "followup-app.js"), "utf8");
const workflow = fs.readFileSync(path.join(root, ".github", "workflows", "validate.yml"), "utf8");
const goal8Review = fs.readFileSync(path.join(root, "GOAL8_CLINICAL_REVIEW_BATCH.md"), "utf8");
const goal9Review = fs.readFileSync(path.join(root, "GOAL9_HUMAN_REVIEW_GATE.md"), "utf8");
const reviewUi = fs.readFileSync(path.join(root, "review-ui.js"), "utf8");
const reviewStatus = JSON.parse(fs.readFileSync(path.join(root, "review-status.json"), "utf8"));

function cssProperty(selector, property) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const rule = css.match(new RegExp(`${escapedSelector}\\s*\\{([^}]*)\\}`));
  assert.ok(rule, `missing CSS rule for ${selector}`);
  const declaration = rule[1].match(new RegExp(`${property}\\s*:\\s*(#[0-9a-f]{6})`, "i"));
  assert.ok(declaration, `missing ${property} in ${selector}`);
  return declaration[1];
}

function relativeLuminance(hex) {
  const channels = hex.slice(1).match(/../g).map(value => parseInt(value, 16) / 255);
  const linear = channels.map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrastRatio(foreground, background) {
  const values = [relativeLuminance(foreground), relativeLuminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

test("static page keeps load order, disclaimer and accessible controls", () => {
  assert.ok(html.indexOf('src="clinical-schema.js"') < html.indexOf('src="data.js"'));
  assert.ok(html.indexOf('src="data.js"') < html.indexOf('src="app.js"'));
  assert.ok(html.indexOf('src="media-data.js"') < html.indexOf('src="app.js"'));
  assert.ok(html.indexOf('src="followup-data.js"') < html.indexOf('src="followup-app.js"'));
  assert.ok(html.indexOf('src="quiz-data.js"') < html.indexOf('src="quiz-app.js"'));
  assert.ok(html.indexOf('src="review-status.js"') < html.indexOf('src="oss-feedback.js"'));
  assert.ok(html.indexOf('src="oss-feedback.js"') < html.indexOf('src="review-ui.js"'));
  assert.ok(html.indexOf('src="review-ui.js"') < html.indexOf('src="app.js"'));
  assert.match(html, /href="review-status\.json"/);
  assert.match(html, /id="followUpDisease"/);
  assert.match(html, /id="followUpGroup"/);
  assert.match(html, /id="followUpPeriod"/);
  assert.match(html, /<h2 id="followUpTitle">Dermato-oncology follow-up<\/h2>/);
  assert.match(html, /<label for="followUpDisease">Disease/);
  assert.match(html, /<label for="followUpGroup">Stage \/ risk group/);
  assert.match(html, /<label for="followUpPeriod">Follow-up period or guidance/);
  assert.doesNotMatch(html, /Dermato-onkologische Nachsorge|Erkrankung|Stadium \/ Risikogruppe|Zeitraum|Deutschland · leitlinienbasiert/);
  assert.doesNotMatch(followUpApp, /Einmalig|Alle |pro Jahr|Nicht spezifiziert|Leitlinienbasis|Leitlinienkontext|Fundstelle|angezeigt/);
  assert.match(html, /id="followUpStatus"[^>]+aria-live="polite"/);
  assert.match(html, /<label[^>]+for="searchInput"/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /class="skip-link"[^>]+href="#mainContent"/);
  assert.match(html, /<nav class="nav" aria-label="Primary navigation">/);
  assert.match(html, /id="searchClear"[^>]+type="button"[^>]+hidden/);
  assert.match(html, /id="libraryStats"[^>]+aria-label="Current reference coverage"/);
  assert.match(html, /<main id="mainContent" tabindex="-1">/);
  assert.match(html, /id="details"[^>]+tabindex="-1"[^>]+role="region"[^>]+aria-labelledby="diseaseDetailsTitle"/);
  assert.doesNotMatch(html, /id="details"[^>]+aria-live/);
  assert.match(html, /does not replace professional medical judgment/i);
});

test("documentation distinguishes source metadata checks from clinical review", () => {
  assert.match(readme, /metadataCheckedAt/);
  assert.match(readme, /not a publication date, clinical review date/i);
  assert.match(contributing, /Allowed source types/);
  assert.match(contributing, /never change a shared default/i);
  assert.match(roadmap, /Data-schema evolution/);
  assert.match(roadmap, /Category architecture/);
  assert.match(followUpDocs, /Implementation matrix/);
  assert.match(followUpDocs, /source metadata check date[^.]*physician review[^.]*separate facts/i);
  assert.match(followUpDocs, /add a jurisdiction/i);
  assert.match(goal5Review, /\| Disease \| Risk\/stage \| Period \| Clinical exam \| LN ultrasound \| Laboratory \| Imaging \| Source \|/);
  assert.match(goal5Review, /- \[ \] Physician sign-off/);
  assert.match(goal5Review, /all three protocols remain `clinician review required`/i);
  assert.match(followUpDocs, /Melanoma in situ \/ Stage 0/);
  assert.match(followUpDocs, /does not define a dedicated structured follow-up schedule/i);
  assert.match(followUpDocs, /at least annual clinical examination/i);
  assert.match(followUpDocs, /International AAD context is rendered separately/i);
  assert.match(goal5Review, /Physician sign-off: melanoma in situ \/ Stage 0/);
  assert.match(goal5Review, /Melanoma \| Melanoma in situ \/ Stage 0 \| No Stage 0-specific S3 interval/);
  assert.match(clinicalSchemaDocs, /clinicalProfile/);
  assert.match(clinicalSchemaDocs, /formulation, dose, frequency, duration/i);
  assert.match(clinicalSchemaDocs, /part of the deterministic clinical fingerprint/i);
  assert.match(qualityAudit, /structured medication details: [01]\/50/i);
  assert.match(qualityAudit, /legacy-compatible records: 42\/50/i);
  assert.match(qualityAudit, /EADO\/EDF\/EORTC/);
});

test("CI validates pull requests, main pushes and manual runs with read-only permissions", () => {
  assert.match(workflow, /pull_request:\s*\n\s+branches:\s*\[main\]/);
  assert.match(workflow, /push:\s*\n\s+branches:\s*\[main\]/);
  assert.match(workflow, /workflow_dispatch:/);
  assert.match(workflow, /permissions:\s*\n\s+contents:\s*read/);
  assert.doesNotMatch(workflow, /(?:contents|pull-requests|issues|actions):\s*write/);
  assert.doesNotMatch(workflow, /secrets\./);
  assert.match(workflow, /timeout-minutes:\s*10/);
  assert.match(workflow, /actions\/checkout@v7/);
  assert.match(workflow, /persist-credentials:\s*false/);
  assert.match(workflow, /actions\/setup-node@v7/);
  assert.match(workflow, /node-version:\s*"24"/);
  assert.match(workflow, /package-manager-cache:\s*false/);
  for (const command of ["node --check data.js", "node --check clinical-schema.js", "node --check scripts/clinical-schema.js", "node scripts/clinical-schema.js", "node --check app.js", "node --check media-data.js", "node --check scripts/media.js", "node scripts/media.js", "node --check quiz-data.js", "node --check quiz-app.js", "node --check scripts/quiz.js", "node scripts/quiz.js", "node --check review-data.js", "node --check review-status.js", "node --check review-ui.js", "node --check scripts/review-governance.js", "node scripts/review-governance.js", "node --test tests/*.test.js", "git diff --check"]) {
    assert.ok(workflow.includes(command), `workflow is missing ${command}`);
  }
  for (const command of ["node --check followup-data.js", "node --check followup-app.js", "node scripts/clinical-review.js --validate", "node scripts/follow-up.js"]) {
    assert.ok(workflow.includes(command), `workflow is missing ${command}`);
  }
});

test("documentation reports CI, 50 records and the unfinished broader-coverage target", () => {
  assert.match(readme, /50 condition records/i);
  assert.match(readme, /GitHub Actions/i);
  assert.match(readme, /broader dermatology coverage[^.]*not yet complete/i);
  assert.match(contributing, /icdoApplicability` to `not applicable`/i);
  assert.match(contributing, /CI workflow[^.]*pull request/i);
  assert.match(roadmap, /infectious dermatology package/i);
  assert.match(roadmap, /16 infectious and infestation records/i);
});

test("responsive and keyboard focus rules remain present", () => {
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media\s*\(max-width:\s*600px\)/);
  assert.match(css, /@media[\s\S]*?\.category-grid\s*{[\s\S]*?grid-template-columns:\s*1fr/);
  assert.match(css, /@media[\s\S]*?\.detail-header\s*{[\s\S]*?flex-direction:\s*column-reverse/);
  assert.match(css, /\.follow-up-controls select:focus-visible/);
  assert.match(css, /\.follow-up-context\s*{/);
  assert.match(css, /@media[\s\S]*?\.follow-up-controls,[\s\S]*?\.follow-up-results-grid\s*{[\s\S]*?grid-template-columns:\s*1fr/);
  assert.match(css, /@media\s*\(max-width:\s*900px\)/);
  assert.match(css, /@media\s*\(min-width:\s*1400px\)/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /\.detail-jump-nav\s*{/);
  assert.match(css, /\.media-gallery\s*{/);
});

test("design tokens and governed optional media framework are present", () => {
  for (const token of ["--color-canvas", "--color-surface", "--color-text", "--color-border", "--color-accent", "--color-success", "--color-warning", "--color-danger", "--space-4", "--space-8"]) {
    assert.ok(css.includes(token), `missing design token ${token}`);
  }
  assert.match(mediaData, /schemaVersion:\s*1/);
  assert.match(mediaData, /melanoma-abcde-schematic/);
  assert.match(mediaData, /license:\s*"Project-owned"/);
  assert.match(mediaGovernance, /clinical-photo.*dermoscopy.*histopathology.*diagram.*illustration.*procedure/s);
  assert.match(mediaGovernance, /CC BY 4\.0/);
  assert.match(mediaGovernance, /patient-identifiable information/i);
  assert.match(mediaGovernance, /does not silently invalidate the clinical-text fingerprint/i);
  assert.match(mediaGovernance, /failed image load/i);
});

test("Goal 7 structured clinical architecture remains dependency-free and visibly supported", () => {
  for (const vocabulary of ["primaryLesions", "secondaryChanges", "symptoms", "distribution", "course", "ageGroups", "diagnosticMethods", "treatmentLevels", "followUpStrategies"]) {
    assert.ok(clinicalSchema.includes(vocabulary), `missing ${vocabulary}`);
  }
  assert.match(css, /\.clinical-tags\s*{/);
  assert.match(css, /\.treatment-tier\s*\+/);
  assert.match(css, /\.red-flag-list\s*{/);
  assert.match(readme, /Eight representative records use the profile/);
});

test("Goal 8 exposes review transparency, quiz and deep-link architecture", () => {
  assert.match(html, /id="evidenceStatus"/);
  assert.match(html, /id="quizModule"/);
  assert.match(html, /Source metadata checked/);
  assert.match(html, /content fingerprint/);
  assert.match(quizData, /questions:\s*Object\.freeze/);
  assert.match(quizApp, /role", "progressbar"/);
  assert.match(app, /searchParams\.set\("condition"/);
  assert.match(css, /\.review-dashboard-counts\s*{/);
  assert.match(css, /\.quiz-option:focus-within\s*{/);
  for (const id of ["actinic-keratosis", "basal-cell-carcinoma", "cutaneous-melanoma", "atopic-dermatitis", "plaque-psoriasis", "acne-vulgaris", "rosacea", "tinea-corporis"]) {
    assert.ok(goal8Review.includes(`node scripts/clinical-review.js ${id}`), `missing review command for ${id}`);
  }
  assert.equal((goal8Review.match(/- \[ \] Physician reviewed/g) || []).length, 8);
});

test("Goal 9 exposes independent public review status without fabricated approval", () => {
  assert.equal(reviewStatus.assets.length, 23);
  assert.equal(reviewStatus.assets.filter(item => item.status === "clinician reviewed").length, 1);
  assert.equal(reviewStatus.assets.filter(item => item.status === "review required").length, 22);
  assert.equal(reviewStatus.latestValidHumanReviewDate, "2026-09-23");
  assert.match(reviewUi, /No valid human approval is bound to this exact content version/);
  assert.match(reviewUi, /Review details/);
  assert.match(reviewUi, /append\(parent, "details"/);
  assert.match(reviewUi, /append\(panel, "summary", "Review details"/);
  assert.match(reviewUi, /Content integrity ID/);
  assert.match(reviewUi, /View technical review data \(JSON\)/);
  assert.match(reviewUi, /No physician review has been recorded yet/);
  assert.doesNotMatch(reviewUi, /Awaiting review/);
  assert.match(app, /Partially reviewed records/);
  assert.match(app, /Invalidated or outdated reviews/);
  assert.match(goal9Review, /Required attestation/);
  assert.match(goal9Review, /No clinical wording change has been applied/);
  assert.match(css, /\.public-review-panel\s*{/);
  assert.match(css, /\.public-review-summary:focus-visible\s*{/);
});

test("repository health files and contribution templates are present without invented identities", () => {
  for (const file of ["CHANGELOG.md", "SECURITY.md", "CODE_OF_CONDUCT.md", "CITATION.cff", ".github/ISSUE_TEMPLATE/bug_report.yml", ".github/ISSUE_TEMPLATE/clinical_content.yml", ".github/ISSUE_TEMPLATE/feature_request.yml", ".github/pull_request_template.md"]) {
    assert.ok(fs.existsSync(path.join(root, file)), `missing ${file}`);
  }
  const citation = fs.readFileSync(path.join(root, "CITATION.cff"), "utf8");
  assert.match(citation, /Docutis contributors/);
  assert.doesNotMatch(citation, /orcid|affiliation|doi:/i);
});

test("result status and footer meet WCAG AA normal-text contrast", () => {
  const background = cssProperty("body", "background");
  for (const selector of [".result-status", "footer"]) {
    const ratio = contrastRatio(cssProperty(selector, "color"), background);
    assert.ok(ratio >= 4.5, `${selector} contrast ${ratio.toFixed(2)} is below 4.5:1`);
  }
});
