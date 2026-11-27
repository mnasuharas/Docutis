"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

function load() {
  const root = path.join(__dirname, "..");
  const context = {
    window: {},
    document: { title: "Docutis | Dermatology Reference Toolkit", documentElement: {}, body: {}, getElementById() { return null; }, readyState: "loading", addEventListener() {} },
    localStorage: { getItem() { return null; }, setItem() {} },
    MutationObserver: function () { this.observe = function () {}; }
  };
  for (const name of ["data.js", "coding-locale.js", "clinical-locale.js", "differential-locale.js", "profile-locale.js", "locale.js"]) {
    vm.runInNewContext(fs.readFileSync(path.join(root, name), "utf8"), context);
  }
  return context.window;
}

test("coding titles, verification notes and learning-path labels have Turkish drafts", () => {
  const window = load();
  const translate = window.DOCUTIS_LOCALE.translate;
  const seen = new Set();
  function need(value) {
    if (!value || seen.has(value)) return;
    seen.add(value);
    const turkish = translate(value);
    assert.equal(typeof turkish, "string", value.slice(0, 120));
    if (turkish === value) assert.match(value, / — Vitiligo$/);
    else assert.notEqual(turkish, value);
    for (const code of value.match(/[A-Z]\d{2}(?:\.\d+)?|\d{4}\/\d|C44\._/g) || []) {
      assert.ok(turkish.includes(code), `${code} missing from ${value}`);
    }
  }
  for (const disease of window.DOCUTIS_DATA.diseases) {
    for (const entry of disease.coding?.diagnoses || []) {
      need(`${entry.system} ${entry.version}: ${entry.code} — ${entry.label}`);
      if (entry.note) need(entry.note);
    }
    if (disease.coding?.verificationNote) need(`Verification note: ${disease.coding.verificationNote}`);
    const oncology = disease.coding?.icdo;
    if (oncology) {
      const topographyCode = oncology.topography.code ? ` ${oncology.topography.code}` : "";
      need(`Topography${topographyCode} — ${oncology.topography.label}`);
      for (const entry of oncology.morphologies || []) need(`Morphology ${entry.code} — ${entry.label}`);
    }
  }
  for (const label of ["Media", "Oncology", "Condition record", "Germany follow-up", "2026-09-23 · approved"]) need(label);
  assert.equal(translate("2026-09-23 · approved"), "2026-09-23 · onaylandı");
  assert.ok(seen.size > 50);
});
