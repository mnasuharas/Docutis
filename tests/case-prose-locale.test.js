"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("path");
const vm = require("node:vm");

function load() {
  const root = path.join(__dirname, "..");
  const context = {
    window: {},
    document: { title: "Docutis | Dermatology Reference Toolkit", documentElement: {}, body: {}, getElementById() { return null; }, readyState: "loading", addEventListener() {} },
    localStorage: { getItem() { return null; }, setItem() {} },
    MutationObserver: function () { this.observe = function () {}; }
  };
  for (const name of ["clinical-locale.js", "differential-locale.js", "profile-locale.js", "remainder-locale.js", "coding-locale.js", "training-locale.js", "case-prose-locale.js", "locale.js", "case-data.js"]) {
    vm.runInNewContext(fs.readFileSync(path.join(root, name), "utf8"), context, { filename: name });
  }
  return context.window;
}

test("case prose shown after Start case has a Turkish draft", () => {
  const window = load();
  const translate = window.DOCUTIS_LOCALE.translate;
  const seen = new Set();
  function need(value) {
    if (typeof value !== "string") return;
    const text = value.replace(/\s+/g, " ").trim();
    if (text.length < 2 || !/[A-Za-z]{3,}/.test(text) || /^(https?:|CC[ -]|Public domain)/i.test(text) || seen.has(text)) return;
    seen.add(text);
    const turkish = translate(text);
    assert.equal(typeof turkish, "string", text.slice(0, 120));
    if (turkish === text) {
      assert.ok(text.length <= 48 && !/\b(the|and|with|this|that|not|does|cannot)\b/i.test(text), text);
      return;
    }
  }
  for (const caseItem of window.DOCUTIS_CASES.cases) {
    need(caseItem.title);
    for (const field of ["synthesis", "mentorNote", "takeHomeRule", "diagnosticTrap", "managementBrief", "whyNot", "modalityIntegration"]) need(caseItem[field]);
    for (const field of ["observationPrompts", "hints"]) for (const item of caseItem[field] || []) need(typeof item === "string" ? item : item && item.text);
    for (const point of caseItem.teachingPoints || []) { need(point.title); need(point.text); }
    if (caseItem.closestMimic) { need(caseItem.closestMimic.name); need(caseItem.closestMimic.whyClosest); }
    for (const diff of caseItem.differentials || []) {
      need(diff.name || diff.diagnosis || diff.label);
      need(diff.teachingDistinction);
      for (const item of [...(diff.supportingFeatures || []), ...(diff.contradictingFeatures || [])]) need(typeof item === "string" ? item : item && (item.text || item.label));
    }
    for (const item of caseItem.observations || []) need(item && item.text);
    for (const item of caseItem.interpretations || []) need(item && item.text);
    for (const pattern of caseItem.patterns || []) { need(pattern.label); need(pattern.specificityNote); }
    for (const feature of caseItem.dermoscopicFeatures || []) need(feature && (feature.label || feature.text));
    for (const image of caseItem.images || []) need(image && image.alt);
  }
  assert.ok(seen.size > 1000);
  assert.match(translate("Image zoom 150 percent"), /yüzde 150/);
  assert.match(translate("Not quite. The best answer is: Melanoma."), /Tam değil/);
  assert.match(translate("This interactive section requires JavaScript."), /JavaScript gerektirir/);
  const sample = [...seen].find(value => /does not/i.test(value) && value.length > 40);
  assert.match(translate(sample), /değil|maz|mez|meyin|mayın|memiş|mamış|madan|meden/);
});
