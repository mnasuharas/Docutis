const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "style.css"), "utf8");

test("index exposes skip link, document language, main landmark, and training shell when present", () => {
  assert.match(html, /<html[^>]*\blang="en"/);
  assert.match(html, /class="skip-link"[^>]+href="#mainContent"/);
  assert.match(html, /<main[^>]+id="mainContent"/);
  if (html.includes("trainingApp")) {
    assert.match(html, /id="trainingApp"/);
  }
});

test("interactive controls have visible focus styling", () => {
  assert.match(css, /button:focus-visible/);
  assert.match(css, /:focus-visible|:focus/);
  const focusRules = [
    ".primary-links a:focus-visible",
    ".quiz-option:focus-within",
    ".public-review-summary:focus-visible",
    ".follow-up-controls select:focus-visible"
  ];
  for (const selector of focusRules) {
    assert.ok(css.includes(selector), `missing focus rule for ${selector}`);
  }
});

test("text, chips and buttons meet WCAG AA contrast and mobile controls are 44px", () => {
  function lum(hex) {
    const channels = [0, 2, 4].map(index => parseInt(hex.slice(index + 1, index + 3), 16) / 255)
      .map(value => (value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4));
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  }
  function contrast(foreground, background) {
    const lighter = Math.max(lum(foreground), lum(background));
    const darker = Math.min(lum(foreground), lum(background));
    return (lighter + 0.05) / (darker + 0.05);
  }
  assert.ok(contrast("#182422", "#ffffff") >= 4.5);
  assert.ok(contrast("#44524f", "#ffffff") >= 4.5);
  assert.ok(contrast("#5f6f6c", "#ffffff") >= 4.5);
  assert.ok(contrast("#ffffff", "#0d5149") >= 4.5);
  assert.match(css, /\.close-button \{[\s\S]*min-height: 44px/);
  assert.match(css, /\.case-button,\s*\.case-button-secondary \{[\s\S]*min-height: 44px/);
  assert.match(css, /@media \(max-width: 600px\)[\s\S]*\.primary-links a,[\s\S]*min-height: 44px/);
});

test("static headings do not skip a level and language is applied to the document element", () => {
  const levels = [...html.matchAll(/<h([1-6])\b/g)].map(match => Number(match[1]));
  let previous = 0;
  for (const level of levels) {
    assert.ok(level <= previous + 1, `heading h${level} follows h${previous}`);
    previous = level;
  }
  const locale = fs.readFileSync(path.join(root, "locale.js"), "utf8");
  assert.match(locale, /document\.documentElement\.lang = language/);
  assert.match(locale, /img\[data-schematic-src\]/);
});