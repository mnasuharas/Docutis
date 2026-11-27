"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.join(__dirname, "..");

test("contrast lessons use the existing case images and preserve source verification limits", () => {
  const context = { window: {} };
  for (const name of ["case-data.js", "subtle-clue-data.js"]) {
    vm.runInNewContext(fs.readFileSync(path.join(root, name), "utf8"), context, { filename: name });
  }
  const cases = new Map(context.window.DOCUTIS_CASES.cases.map(item => [item.id, item]));
  const lessons = context.window.DOCUTIS_SUBTLE_CLUES;
  assert.equal(lessons.length, 3);
  for (const lesson of lessons) {
    assert.equal(lesson.cases.length, 2);
    assert.equal(lesson.expected.length, 2);
    assert.ok(lesson.title.en && lesson.title.tr && lesson.comparison.en && lesson.comparison.tr);
    for (const [index, id] of lesson.cases.entries()) {
      const item = cases.get(id);
      assert.ok(item, id);
      assert.ok(item.images.some(image => image.type === "clinical"), id);
      assert.ok(item.images.every(image => image.src && image.sourceUrl && image.license), id);
      assert.ok(item.diagnosticGroundTruth.confirmationMethod, id);
      assert.ok(lesson.options[lesson.expected[index]], id);
    }
  }
  assert.equal(cases.get("case-g25-01").diagnosticGroundTruth.confirmationMethod, "histopathology");
  assert.equal(cases.get("case-g25-02").diagnosticGroundTruth.confirmationMethod, "histopathology");
  assert.equal(cases.get("case-g27-04").diagnosticGroundTruth.confirmationMethod, "histopathology");
  assert.notEqual(cases.get("case-g21-08").diagnosticGroundTruth.confirmationMethod, "histopathology");
  assert.ok(!cases.get("case-g18-15").images.some(image => image.type === "dermoscopy"));
});

test("subtle-clue lesson is wired after the case library and offers a keyboard-accessible reveal", () => {
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const app = fs.readFileSync(path.join(root, "subtle-clue-app.js"), "utf8");
  assert.ok(html.indexOf("case-data.js") < html.indexOf("subtle-clue-data.js"));
  assert.ok(html.indexOf("subtle-clue-data.js") < html.indexOf("subtle-clue-app.js"));
  assert.match(html, /id="subtleClueApp"/);
  assert.match(app, /radio\.type = "radio"/);
  assert.match(app, /reveal\.disabled = answers\.some/);
  assert.match(app, /root\.querySelector\("\.subtle-comparison"\)\.focus\(\)/);
});
