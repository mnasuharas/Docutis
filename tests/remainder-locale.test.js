"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

function humanize(value) {
  return String(value).replaceAll("-", " ").replace(/\b\w/g, character => character.toUpperCase());
}

function load() {
  const root = path.join(__dirname, "..");
  const context = {
    window: {},
    document: {
      title: "Docutis | Dermatology Reference Toolkit",
      documentElement: {},
      body: {},
      getElementById() { return null; },
      readyState: "loading",
      addEventListener() {}
    },
    localStorage: { getItem() { return null; }, setItem() {} },
    MutationObserver: function () { this.observe = function () {}; }
  };
  for (const name of ["clinical-schema.js", "data.js", "differential-locale.js", "profile-locale.js", "remainder-locale.js", "clinical-locale.js", "locale.js"]) {
    vm.runInNewContext(fs.readFileSync(path.join(root, name), "utf8"), context);
  }
  return context.window;
}

function medicationLine(medication) {
  const details = [medication.formulation, medication.dose, medication.frequency, medication.duration].filter(Boolean).join(" · ");
  return `${medication.name}${details ? ` — ${details}` : ""}`;
}

test("remaining structured profile text has a Turkish draft", () => {
  const window = load();
  const translate = window.DOCUTIS_LOCALE.translate;
  const seen = new Set();
  function need(value) {
    if (typeof value !== "string" || !value || seen.has(value)) return;
    seen.add(value);
    const turkish = translate(value);
    assert.equal(typeof turkish, "string", value);
    assert.notEqual(turkish, value, value);
  }
  for (const disease of window.DOCUTIS_DATA.diseases) {
    const profile = disease.clinicalProfile;
    if (!profile) continue;
    const morphology = profile.presentation?.morphology || {};
    for (const key of ["primaryLesions", "secondaryChanges", "colors", "surface", "border", "configuration"]) {
      for (const value of morphology[key] || []) need(humanize(value));
    }
    const localization = profile.presentation?.localization;
    if (localization) {
      for (const value of [...(localization.sites || []), ...(localization.distribution || [])]) need(humanize(value));
      if (localization.text) need(localization.text);
    }
    if (profile.presentation?.symptoms?.text) need(profile.presentation.symptoms.text);
    if (profile.presentation?.course?.text) need(profile.presentation.course.text);
    if (profile.histopathology) need(profile.histopathology);
    for (const flag of profile.redFlags || []) need(flag);
    for (const step of profile.treatment?.steps || []) {
      for (const item of step.interventions || []) {
        for (const medication of item.medications || []) need(medicationLine(medication));
      }
    }
  }
  assert.ok(seen.size > 40);
});

test("every number and unit token in an English dose line remains in the Turkish draft", () => {
  const window = load();
  const translate = window.DOCUTIS_LOCALE.translate;
  const token = /\d+(?:[.,]\d+)?(?:\s*[–-]\s*\d+(?:[.,]\d+)?)?\s*(?:%|mg\/g|mg|g\/day|g|cm²|cm|mm|mL|ml|IV)?/g;
  let lines = 0;
  for (const disease of window.DOCUTIS_DATA.diseases) {
    for (const step of disease.clinicalProfile?.treatment?.steps || []) {
      for (const item of step.interventions || []) {
        for (const medication of item.medications || []) {
          const english = medicationLine(medication);
          const turkish = translate(english);
          lines += 1;
          assert.equal(typeof turkish, "string", english);
          for (const piece of english.match(token) || []) {
            const kept = piece.trim();
            const natural = kept.replace("g/day", "g/gün");
            assert.ok(turkish.includes(kept) || turkish.includes(natural), `${disease.id} lost ${kept} from ${english}`);
          }
        }
      }
    }
  }
  assert.equal(lines, 14);
});
