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
  for (const name of ["training-data.js", "training-locale.js", "clinical-locale.js", "differential-locale.js", "profile-locale.js", "locale.js"]) {
    vm.runInNewContext(fs.readFileSync(path.join(root, name), "utf8"), context);
  }
  return context.window;
}

test("training data and learning-module sentences have Turkish drafts", () => {
  const window = load();
  const translate = window.DOCUTIS_LOCALE.translate;
  const seen = new Set();
  function need(value) {
    if (typeof value !== "string" || !/[A-Za-z]/.test(value) || /^[a-z0-9-]+$/.test(value) || seen.has(value)) return;
    seen.add(value);
    const turkish = translate(value);
    assert.equal(typeof turkish, "string", value.slice(0, 140));
    assert.notEqual(turkish, value, value.slice(0, 140));
  }
  function walk(value) {
    if (typeof value === "string") need(value);
    else if (value && typeof value === "object") Object.values(value).forEach(walk);
  }
  walk(window.DOCUTIS_TRAINING_DATA);
  assert.equal(translate("Mixed screening · Lesion 2 of 8"), "Karma tarama · Lezyon 2 / 8");
  assert.equal(translate("Lesion 2 of 8"), "Lezyon 2 / 8");
  assert.match(translate("A qualitative recap of the lesions you revealed. It is not a score, a grade, or a competence statement."), /puan|not değildir|değildir/);
  assert.ok(seen.size > 20);
});
