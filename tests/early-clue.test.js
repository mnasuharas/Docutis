"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const crypto = require("node:crypto");
const root = path.join(__dirname, "..");

test("ten new comparison assets have traceable source panels, licenses and matching image hashes", () => {
  const records = JSON.parse(fs.readFileSync(path.join(root, "early-clue-records.json"), "utf8"));
  assert.equal(records.length, 10);
  assert.equal(new Set(records.map(item => item.id)).size, 10);
  assert.equal(new Set(records.map(item => item.doi)).size, 4);
  assert.equal(records.filter(item => /Invasive melanoma/.test(item.diagnosis)).length, 1);
  for (const record of records) {
    const bytes = fs.readFileSync(path.join(root, record.src));
    assert.equal(crypto.createHash("sha256").update(bytes).digest("hex"), record.sha256, record.id);
    assert.equal(bytes[0], 0xff);
    assert.equal(bytes[1], 0xd8);
    assert.ok(record.dimensions.width >= 200 && record.dimensions.height >= 200);
    assert.ok(record.sourceImageUrl.startsWith("https://"));
    assert.ok(record.licenseUrl.startsWith("https://creativecommons.org/"));
    assert.ok(record.panel && record.author);
    assert.equal(record.reviewStatus, "clinician review required");
    assert.equal(record.clinicalReview, null);
  }
  assert.equal(records.find(item => item.id === "early-huang").license, "CC BY-NC-SA 4.0");
});

test("ten distinct publications and ten additional pairs load without changing the source case collection", () => {
  const context = { window: {} };
  const run = name => vm.runInNewContext(fs.readFileSync(path.join(root, name), "utf8"), context, { filename: name });
  run("case-data.js");
  const original = JSON.stringify(context.window.DOCUTIS_CASES);
  run("subtle-clue-data.js");
  run("early-clue-data.js");
  assert.equal(JSON.stringify(context.window.DOCUTIS_CASES), original);
  const sources = context.window.DOCUTIS_EARLY_SOURCES;
  assert.equal(sources.length, 10);
  assert.equal(new Set(sources.map(item => item.doi)).size, 10);
  assert.equal(sources.filter(item => item.role === "image").length, 4);
  const cases = [...context.window.DOCUTIS_CASES.cases, ...context.window.DOCUTIS_EARLY_CASES];
  assert.equal(context.window.DOCUTIS_SUBTLE_CLUES.length, 15);
  for (const lesson of context.window.DOCUTIS_SUBTLE_CLUES) {
    for (const id of lesson.cases) assert.ok(cases.some(item => item.id === id), id);
  }
  for (const item of context.window.DOCUTIS_EARLY_CASES) {
    assert.ok(sources.some(source => source.doi === item.provenance.doi));
    assert.ok(!/melanoma|carcinoma|nevus/i.test(item.images[0].alt));
    assert.equal(item.clinicalReview, null);
  }
});
