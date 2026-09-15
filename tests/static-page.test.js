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
  assert.match(roadmap, /Future data-schema proposal \(not implemented\)/);
  assert.match(roadmap, /Future category architecture \(not implemented\)/);
});

test("responsive and keyboard focus rules remain present", () => {
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media\s*\(max-width:\s*600px\)/);
  assert.match(css, /@media[\s\S]*?\.category-grid\s*{[\s\S]*?grid-template-columns:\s*1fr/);
  assert.match(css, /@media[\s\S]*?\.detail-header\s*{[\s\S]*?flex-direction:\s*column-reverse/);
});

test("result status and footer meet WCAG AA normal-text contrast", () => {
  const background = cssProperty("body", "background");
  for (const selector of [".result-status", "footer"]) {
    const ratio = contrastRatio(cssProperty(selector, "color"), background);
    assert.ok(ratio >= 4.5, `${selector} contrast ${ratio.toFixed(2)} is below 4.5:1`);
  }
});
