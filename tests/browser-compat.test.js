const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "style.css"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const doc = fs.readFileSync(path.join(root, "BROWSER_COMPATIBILITY.md"), "utf8");

function ruleBody(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
  assert.ok(match, `missing rule ${selector}`);
  return match[1];
}

test("focus, surface and shadow tokens used by the UI are defined", () => {
  const rootRule = ruleBody(":root");
  assert.match(rootRule, /--color-focus:\s*#0d5149/);
  assert.match(rootRule, /--color-surface-subtle:\s*#f7faf9/);
  assert.match(rootRule, /--shadow-sm:\s*0 1px 2px/);
  assert.match(ruleBody(".quiz-option:focus-within"), /outline:\s*3px solid var\(--color-focus\)/);
  assert.match(ruleBody(".public-review-summary:focus-visible"), /outline:\s*3px solid var\(--color-focus\)/);
  assert.match(ruleBody(".quiz-option"), /background:\s*var\(--color-surface-subtle\)/);
});

test("narrow viewports keep primary links scrollable instead of removing them", () => {
  assert.doesNotMatch(css, /\.primary-links\s*\{[^}]*display\s*:\s*none/);
  const narrow = css.match(/@media\s*\(max-width:\s*900px\)\s*\{[\s\S]*?\.primary-links\s*\{([^}]*)\}/);
  assert.ok(narrow, "missing narrow primary-links rule");
  assert.match(narrow[1], /display:\s*flex/);
  assert.match(narrow[1], /overflow-x:\s*auto/);
  assert.match(narrow[1], /min-width:\s*0/);
});

test("search cancel chrome and sticky-header blur have defensive CSS", () => {
  assert.match(css, /#searchInput::-webkit-search-cancel-button/);
  assert.match(css, /-webkit-backdrop-filter:\s*blur\(10px\)/);
  assert.match(css, /backdrop-filter:\s*blur\(10px\)/);
  const zoom = ruleBody(".case-zoom-viewport");
  assert.match(zoom, /max-height:\s*min\(70vh,\s*640px\)/);
  assert.match(zoom, /max-height:\s*min\(70dvh,\s*640px\)/);
});

test("browsers without :focus-visible still get a visible focus outline", () => {
  const fallback = css.match(/@supports\s+not\s+selector\(:focus-visible\)\s*\{([\s\S]*?)\n\}/);
  assert.ok(fallback, "missing :focus-visible fallback");
  assert.match(fallback[1], /\.card:focus/);
  assert.match(fallback[1], /\.quiz-option:focus-within/);
  assert.match(fallback[1], /\.case-step-tab:focus/);
  assert.match(fallback[1], /outline:\s*3px solid var\(--color-focus\)/);
});

test("interactive modules explain a disabled JavaScript environment without medical text", () => {
  assert.match(html, /<html lang="en" class="no-js">/);
  assert.match(html, /document\.documentElement\.classList\.remove\("no-js"\)/);
  assert.match(css, /html\.no-js \.js-only\s*\{[^}]*display:\s*none/);
  for (const idClass of [
    'id="libraryStats" class="library-stats js-only"',
    'id="reviewDashboardCounts" class="review-dashboard-counts js-only"',
    'id="categoryFilters" class="category-filters js-only"',
    'id="quizApp" class="quiz-app js-only"',
    'id="caseApp" class="case-app js-only"',
    'id="trainingApp" class="training-app js-only"',
    'class="follow-up-controls js-only"',
    'id="cards" class="cards js-only"'
  ]) {
    assert.ok(html.includes(idClass), `missing ${idClass}`);
  }
  const blocks = [...html.matchAll(/<noscript>([\s\S]*?)<\/noscript>/g)].map(match => match[1].trim());
  assert.equal(blocks.length, 7);
  const generic = blocks.filter(block => block.includes("This interactive section requires JavaScript."));
  assert.equal(generic.length, 5);
  for (const block of generic) {
    assert.equal(block, '<p class="js-fallback">This interactive section requires JavaScript.</p>');
    assert.doesNotMatch(block, /melanoma|basal cell|actinic|diagnosis|ICD/i);
  }
  assert.ok(blocks.some(block => /Cases cannot be shown because JavaScript is unavailable/.test(block)));
  assert.ok(blocks.some(block => /Training cannot run because JavaScript is unavailable/.test(block)));
});

test("condition scrolling can choose auto motion and legacy focus does not abort", () => {
  assert.match(app, /function prefersReducedMotion\(\)/);
  assert.match(app, /prefers-reduced-motion:\s*reduce/);
  assert.match(app, /function focusWithoutScrolling\(element\)/);
  assert.match(app, /function scrollElementIntoView\(element\)/);
  assert.match(app, /focusWithoutScrolling\(detailsElement\)/);
  assert.match(app, /scrollElementIntoView\(detailsElement\)/);
  assert.doesNotMatch(app, /scrollIntoView\(\{\s*behavior:\s*"smooth"/);
});

test("very narrow header puts primary links on their own visible row", () => {
  const block = css.slice(css.indexOf("@media (max-width: 600px)"));
  const nav = block.match(/\.nav\s*\{([^}]*)\}/);
  assert.ok(nav, "missing narrow nav rule");
  assert.match(nav[1], /flex-wrap:\s*wrap/);
  const links = block.match(/\.primary-links\s*\{([^}]*)\}/);
  assert.ok(links, "missing narrow primary-links rule");
  assert.match(links[1], /flex:\s*1 0 100%/);
  assert.match(links[1], /max-width:\s*100%/);
  assert.match(block, /\.primary-links a:focus-visible\s*\{[^}]*scroll-margin-inline:\s*12px/);
  const wide = css.match(/@media\s*\(max-width:\s*900px\)\s*\{[\s\S]*?\.primary-links\s*\{([^}]*)\}/);
  assert.match(wide[1], /overflow-x:\s*auto/);
  assert.doesNotMatch(wide[1], /flex:\s*1 0 100%/);
});

test("browser support doc stays an engineering matrix and does not claim unrun browsers", () => {
  for (const column of ["Browser", "Version", "OS", "Real execution?", "Desktop", "768px", "Mobile", "Keyboard", "History/navigation", "Cases", "Quiz", "Follow-up", "Known limitations"]) {
    assert.ok(doc.includes(column), `matrix missing ${column}`);
  }
  assert.match(doc, /not medical validation/i);
  assert.match(doc, /Code-audited; real Safari execution still required\./);
  assert.match(doc, /not installed\. Unverified\./);
  assert.match(doc, /Unverified separately from Chrome/);
  assert.match(doc, /pending real execution/i);
  assert.match(doc, /Verified in real Google Chrome 151\.0\.7922\.169 on Linux at 390×700/);
  assert.doesNotMatch(doc, /fix applied, real retest pending/i);
  assert.match(doc, /Repeat the core matrix/);
  assert.match(doc, /This was not a screen-reader test and does not establish WCAG conformance\./);
  assert.match(doc, /Escape closes the whole condition panel/);
  assert.match(doc, /bogus condition id/i);
  assert.match(doc, /distinction is the label text/i);
  assert.doesNotMatch(doc, /Safari[^\n|]*Verified in real browser/);
  assert.doesNotMatch(doc, /Firefox[^\n|]*Verified in real browser/);
  assert.doesNotMatch(doc, /390[^\n]*\bPASS\b/);
  assert.equal(doc.includes("Verified in real browser** —"), true);
});
