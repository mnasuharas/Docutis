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