"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const root = path.join(__dirname, "..");
test("balanced practice has eight source-histology benign controls and eight melanoma cases with dermoscopy", () => {
  const context = { window: {}, document: { getElementById() { return null; } } };
  for (const file of ["case-data.js", "balanced-clue-app.js"]) vm.runInNewContext(fs.readFileSync(path.join(root, file), "utf8"), context);
  const ids = context.window.DOCUTIS_BALANCED_CASE_IDS;
  assert.equal(ids.length, 16);
  assert.equal(new Set(ids).size, 16);
  ids.forEach((id, index) => {
    const item = context.window.DOCUTIS_CASES.cases.find(record => record.id === id);
    assert.equal(item.diagnosticGroundTruth.confirmationMethod, "histopathology", id);
    assert.ok(item.diagnosticGroundTruth.confirmationNotes, id);
    assert.ok(item.images.some(image => image.type === "dermoscopy" && image.license && image.sourceUrl), id);
    assert.equal(/melanoma|lentigo maligna/i.test(item.diagnosticGroundTruth.confirmedDiagnosis), index >= 8, id);
  });
});
