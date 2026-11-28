"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

test("seven skin-cancer overviews have separate Turkish drafts for all six visible fields", () => {
  const root = path.join(__dirname, "..");
  const context = { window: {} };
  for (const name of ["data.js", "clinical-locale.js"]) {
    vm.runInNewContext(fs.readFileSync(path.join(root, name), "utf8"), context);
  }
  const ids = [
    "actinic-keratosis", "basal-cell-carcinoma", "cutaneous-squamous-cell-carcinoma",
    "squamous-cell-carcinoma-in-situ", "cutaneous-melanoma", "lentigo-maligna", "acral-melanoma"
  ];
  const dictionary = context.window.DOCUTIS_CLINICAL_LOCALE;
  for (const id of ids) {
    const disease = context.window.DOCUTIS_DATA.diseases.find(item => item.id === id);
    for (const field of ["description", "clinical", "dermoscopy", "differential", "treatment", "followup"]) {
      assert.ok(dictionary[disease[field]], `${id} ${field}`);
      assert.notEqual(dictionary[disease[field]], disease[field]);
    }
  }
});

test("every other condition overview has a separate Turkish draft for all six visible fields", () => {
  const root = path.join(__dirname, "..");
  const context = { window: {} };
  for (const name of ["data.js", "clinical-locale.js"]) {
    vm.runInNewContext(fs.readFileSync(path.join(root, name), "utf8"), context);
  }
  const oncologyIds = new Set([
    "actinic-keratosis", "basal-cell-carcinoma", "cutaneous-squamous-cell-carcinoma",
    "squamous-cell-carcinoma-in-situ", "cutaneous-melanoma", "lentigo-maligna", "acral-melanoma"
  ]);
  const dictionary = context.window.DOCUTIS_CLINICAL_LOCALE;
  const diseases = context.window.DOCUTIS_DATA.diseases.filter(item => !oncologyIds.has(item.id));
  assert.equal(diseases.length, 58);
  for (const disease of diseases) {
    for (const field of ["description", "clinical", "dermoscopy", "differential", "treatment", "followup"]) {
      assert.equal(typeof disease[field], "string", `${disease.id} ${field} source`);
      assert.ok(dictionary[disease[field]], `${disease.id} ${field}`);
      assert.notEqual(dictionary[disease[field]], disease[field]);
    }
  }
});
