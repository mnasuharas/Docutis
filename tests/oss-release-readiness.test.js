const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.join(__dirname, "..");

const required = [
  "README.md",
  "CONTRIBUTING.md",
  "CODE_OF_CONDUCT.md",
  "SECURITY.md",
  "ROADMAP.md",
  "CHANGELOG.md",
  "CLINICAL_REVIEW.md",
  "BROWSER_COMPATIBILITY.md",
  "LICENSE",
  "RELEASES.md",
  "RELEASE_CHECKLIST.md",
  "RELEASE_NOTES_TEMPLATE.md",
  ".github/ISSUE_TEMPLATE/bug_report.yml",
  ".github/ISSUE_TEMPLATE/clinical_content.yml",
  ".github/ISSUE_TEMPLATE/evidence_update.yml",
  ".github/ISSUE_TEMPLATE/feature_request.yml",
  ".github/ISSUE_TEMPLATE/media_license.yml",
  ".github/pull_request_template.md"
];

test("required public OSS files exist", () => {
  for (const file of required) {
    assert.ok(fs.existsSync(path.join(root, file)), `missing ${file}`);
  }
});

test("README relative links point at files in the repository", () => {
  const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
  const links = [...readme.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map(match => match[1].split(/\s+/)[0]);
  const relative = links.filter(link => !/^(https?:|#|mailto:)/.test(link));
  assert.ok(relative.length > 0);
  for (const link of relative) {
    const file = link.split("#")[0];
    if (!file) continue;
    assert.ok(fs.existsSync(path.join(root, file)), `README link missing: ${link}`);
  }
});

test("release docs do not publish a version or claim full clinical validation", () => {
  const releases = fs.readFileSync(path.join(root, "RELEASES.md"), "utf8");
  const checklist = fs.readFileSync(path.join(root, "RELEASE_CHECKLIST.md"), "utf8");
  const notes = fs.readFileSync(path.join(root, "RELEASE_NOTES_TEMPLATE.md"), "utf8");
  const changelog = fs.readFileSync(path.join(root, "CHANGELOG.md"), "utf8");
  assert.match(releases, /software release is not clinical validation/i);
  assert.match(releases, /No version number is chosen/i);
  assert.match(releases, /Goal 14/);
  assert.match(releases, /pending/i);
  assert.doesNotMatch(releases, /all medical content is clinically validated/i);
  assert.match(checklist, /- \[ \]/);
  assert.doesNotMatch(checklist, /- \[x\]/i);
  assert.match(notes, /all medical content is clinically validated/i);
  assert.match(changelog, /Goal 14/);
  assert.match(changelog, /not an approval/i);
});
