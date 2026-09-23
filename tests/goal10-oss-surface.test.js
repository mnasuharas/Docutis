const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "style.css"), "utf8");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const reviewUi = fs.readFileSync(path.join(root, "review-ui.js"), "utf8");
const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
const contributing = fs.readFileSync(path.join(root, "CONTRIBUTING.md"), "utf8");
const roadmap = fs.readFileSync(path.join(root, "ROADMAP.md"), "utf8");
const changelog = fs.readFileSync(path.join(root, "CHANGELOG.md"), "utf8");
const reviewStatus = JSON.parse(fs.readFileSync(path.join(root, "review-status.json"), "utf8"));
const oss = require("../oss-feedback.js");

const REPO = "https://github.com/mnasuharas/Docutis";

test("Goal 10 feedback helpers build Pages-safe clinical issue URLs", () => {
  assert.equal(oss.REPO_URL, REPO);
  assert.equal(oss.CLINICAL_CONTENT_TEMPLATE, "clinical_content.yml");

  const correction = oss.buildCorrectionIssueUrl({ id: "acne-vulgaris", title: "Acne Vulgaris" });
  const outdated = oss.buildOutdatedEvidenceIssueUrl({ id: "acne-vulgaris", title: "Acne Vulgaris" });
  const generic = oss.buildGenericClinicalIssueUrl("outdated");

  for (const url of [correction, outdated, generic]) {
    assert.match(url, new RegExp(`^${REPO}/issues/new\\?`));
    assert.match(url, /template=clinical_content\.yml/);
    assert.match(decodeURIComponent(url.replace(/\+/g, " ")), /\[Clinical content\]:/);
  }

  const decodedCorrection = decodeURIComponent(correction.replace(/\+/g, " "));
  const decodedOutdated = decodeURIComponent(outdated.replace(/\+/g, " "));
  assert.match(decodedCorrection, /Suggest a correction/);
  assert.match(decodedOutdated, /Report outdated evidence/);
  assert.match(decodedCorrection, /Acne Vulgaris \(acne-vulgaris\)/);
  assert.match(oss.FEEDBACK_PROMPT, /patient-identifiable information/i);
  assert.equal(oss.DOC_LINKS.contributing, `${REPO}/blob/main/CONTRIBUTING.md`);
  assert.equal(oss.DOC_LINKS.roadmap, `${REPO}/blob/main/ROADMAP.md`);
  assert.equal(oss.DOC_LINKS.changelog, `${REPO}/blob/main/CHANGELOG.md`);
  assert.equal(oss.DOC_LINKS.releases, `${REPO}/releases`);
});

test("Goal 10 exposes About, OSS links and feedback CTAs without relative doc paths", () => {
  assert.match(html, /id="about"/);
  assert.match(html, /href="#about"/);
  assert.match(html, /Public preview/i);
  assert.match(html, /Not validated clinical decision support/i);
  assert.match(html, /Clinical review pending/i);
  assert.match(html, /is <strong>not<\/strong> clinician-approved recommendations/i);

  for (const href of [
    REPO,
    `${REPO}/blob/main/CONTRIBUTING.md`,
    `${REPO}/blob/main/ROADMAP.md`,
    `${REPO}/blob/main/CHANGELOG.md`,
    `${REPO}/releases`
  ]) {
    assert.ok(html.includes(href), `missing absolute OSS link ${href}`);
  }

  assert.match(html, /Suggest a correction/);
  assert.match(html, /Report outdated evidence/);
  assert.match(html, /template=clinical_content\.yml/);
  assert.doesNotMatch(html, /href="\.\.\/CONTRIBUTING\.md"/);
  assert.doesNotMatch(html, /href="\/CONTRIBUTING\.md"/);

  assert.match(css, /\.nav-oss\s*\{/);
  assert.match(css, /\.clinical-feedback\s*\{/);
  assert.match(css, /\.about-section\s*\{/);
  assert.match(css, /\.site-footer\s*\{/);
  assert.match(css, /\.clinical-feedback-link:focus-visible/);
});

test("Goal 10 wires feedback actions into review UI and condition details", () => {
  assert.match(reviewUi, /appendFeedbackActions/);
  assert.match(reviewUi, /DOCUTIS_OSS_FEEDBACK/);
  assert.match(reviewUi, /Suggest a correction/);
  assert.match(reviewUi, /Report outdated evidence/);
  assert.match(app, /appendFeedbackActions\(/);
  assert.match(app, /assetType:\s*"disease"/);
});

test("Goal 10 docs agree on public preview status and keep remaining review units pending", () => {
  assert.match(readme, /Goal 10/);
  assert.match(contributing, /Suggest a correction/);
  assert.match(roadmap, /Goal 10/);
  assert.match(changelog, /Goal 10/);
  assert.equal(reviewStatus.assets.length, 23);
  assert.equal(reviewStatus.assets.filter(item => item.status === "clinician reviewed").length, 2);
  assert.equal(reviewStatus.assets.filter(item => item.status === "review required").length, 21);
  assert.equal(reviewStatus.latestValidHumanReviewDate, "2026-09-23");
  assert.equal((reviewStatus.reviewers || []).length, 1);
  assert.equal((reviewStatus.decisions || []).length, 2);
});

test("Goal 10 nav remains keyboard-discoverable in markup", () => {
  assert.match(html, /<nav class="nav" aria-label="Primary navigation">/);
  assert.match(html, /class="nav-oss"[^>]*aria-label="/);
  assert.match(html, /class="footer-oss"[^>]*aria-label="/);
  assert.match(html, /class="skip-link"[^>]+href="#mainContent"/);
});
