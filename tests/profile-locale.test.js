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
  for (const name of ["data.js", "profile-locale.js", "clinical-locale.js", "locale.js"]) {
    vm.runInNewContext(fs.readFileSync(path.join(root, name), "utf8"), context);
  }
  return context.window;
}

test("structured profile labels, morphology tags and first-line text have Turkish drafts", () => {
  const window = load();
  const dictionary = window.DOCUTIS_PROFILE_LOCALE;
  const translate = window.DOCUTIS_LOCALE.translate;
  const required = new Set();
  const morphologyKeys = ["primaryLesions", "otherPrimaryLesions", "secondaryChanges", "colors", "surface", "border", "configuration"];
  for (const disease of window.DOCUTIS_DATA.diseases) {
    const profile = disease.clinicalProfile;
    if (!profile) continue;
    const morphology = profile.presentation?.morphology || {};
    for (const key of morphologyKeys) {
      for (const value of morphology[key] || []) required.add(humanize(value));
    }
    for (const item of profile.diagnostics || []) {
      required.add(`${humanize(item.method)} · ${humanize(item.role)}`);
      required.add(item.indication);
      if (item.findings) required.add(item.findings);
    }
    for (const step of profile.treatment?.steps || []) {
      required.add(humanize(step.level));
      for (const item of step.interventions || []) {
        required.add(item.intervention);
        if (item.details) required.add(item.details);
      }
    }
  }
  assert.ok(required.size > 40);
  for (const english of required) {
    assert.equal(typeof dictionary[english], "string", english);
    assert.notEqual(dictionary[english], english, english);
    assert.equal(translate(english), dictionary[english], english);
    for (const token of ["3–5 mm", ">5 mm", "2–3 mm", "15–60", "Ingenol mebutate", "routineFirstLine=false", "Aldara", "AKSUNIM", "lückenlose Randschnittkontrolle"]) {
      if (english.includes(token)) assert.ok(dictionary[english].includes(token), `${token} missing from translation`);
    }
  }
});

test("evidence disclosures translate without treating source attachment as approval", () => {
  const translate = load().DOCUTIS_LOCALE.translate;
  assert.equal(translate("Evidence for dermoscopy (2)"), "dermoskopi için kanıt (2)");
  assert.equal(
    translate("Source supporting treatment hierarchy: German S2k (opens in a new tab)"),
    "tedavi basamakları bölümünü destekleyen kaynak: German S2k (yeni sekmede açılır)"
  );
  const note = translate("Mapped sources support this section at section level; source attachment is not physician endorsement.");
  assert.match(note, /hekim onayı değildir/);
});
