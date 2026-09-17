const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "style.css"), "utf8");
const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
const contributing = fs.readFileSync(path.join(root, "CONTRIBUTING.md"), "utf8");
const roadmap = fs.readFileSync(path.join(root, "ROADMAP.md"), "utf8");
const followUpDocs = fs.readFileSync(path.join(root, "FOLLOW_UP_PROTOCOLS.md"), "utf8");
const goal5Review = fs.readFileSync(path.join(root, "GOAL5_CLINICAL_REVIEW.md"), "utf8");
const followUpApp = fs.readFileSync(path.join(root, "followup-app.js"), "utf8");
const workflow = fs.readFileSync(path.join(root, ".github", "workflows", "validate.yml"), "utf8");

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
  assert.ok(html.indexOf('src="data.js"') < html.indexOf('src="app.js"'));
  assert.ok(html.indexOf('src="followup-data.js"') < html.indexOf('src="followup-app.js"'));
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
});

test("CI validates pull requests, main pushes and manual runs with read-only permissions", () => {
  assert.match(workflow, /pull_request:\s*\n\s+branches:\s*\[main\]/);
  assert.match(workflow, /push:\s*\n\s+branches:\s*\[main\]/);
  assert.match(workflow, /workflow_dispatch:/);
  assert.match(workflow, /permissions:\s*\n\s+contents:\s*read/);
  assert.doesNotMatch(workflow, /\bwrite\b/);
  assert.doesNotMatch(workflow, /secrets\./);
  assert.match(workflow, /timeout-minutes:\s*10/);
  assert.match(workflow, /actions\/checkout@v7/);
  assert.match(workflow, /persist-credentials:\s*false/);
  assert.match(workflow, /actions\/setup-node@v7/);
  assert.match(workflow, /node-version:\s*"24"/);
  assert.match(workflow, /package-manager-cache:\s*false/);
  for (const command of ["node --check data.js", "node --check app.js", "node --test tests/*.test.js", "git diff --check"]) {
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
});

test("result status and footer meet WCAG AA normal-text contrast", () => {
  const background = cssProperty("body", "background");
  for (const selector of [".result-status", "footer"]) {
    const ratio = contrastRatio(cssProperty(selector, "color"), background);
    assert.ok(ratio >= 4.5, `${selector} contrast ${ratio.toFixed(2)} is below 4.5:1`);
  }
});
