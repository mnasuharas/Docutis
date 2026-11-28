"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

function loadLocale() {
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
  for (const name of ["clinical-schema.js", "data.js", "differential-locale.js", "clinical-locale.js", "locale.js"]) {
    vm.runInNewContext(fs.readFileSync(path.join(root, name), "utf8"), context);
  }
  return context;
}


test("Turkish accessible names, follow-up headings and shared follow-up strings do not fall back to English", () => {
  const { window } = loadLocale();
  const translate = window.DOCUTIS_LOCALE.translate;
  assert.equal(translate("Infectious and Infestation Disorders 16 conditions"), "Enfeksiyon ve enfestasyonlar 16 tanı");
  assert.equal(translate("All conditions 65 conditions"), "Tüm tanılar 65 tanı");
  assert.equal(translate("Cutaneous melanoma: Melanoma in situ (Stage 0)"), "Kutanöz melanom: Melanom in situ (Evre 0)");
  assert.equal(translate("Level"), "Seviye");
  assert.match(translate("Start case: Dark lesion with an uneven edge"), /^Vakayı başlat: /u);
  window.DOCUTIS_LOCALE.extend({ "Chapter 12, pages 59–61": "Bölüm 12, sayfa 59–61", "official patient guideline": "resmî hasta kılavuzu" });
  assert.equal(translate("Recommendation location: Chapter 12, pages 59–61"), "Önerinin kılavuzdaki yeri: Bölüm 12, sayfa 59–61");
  assert.equal(translate("Leitlinienprogramm Onkologie · official patient guideline"), "Leitlinienprogramm Onkologie · resmî hasta kılavuzu");
});

test("praxis skip link is single-language and every page declares an icon", () => {
  const root = path.join(__dirname, "..");
  const praxis = fs.readFileSync(path.join(root, "praxis.html"), "utf8");
  const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
  assert.doesNotMatch(praxis, /İçeriğe geç \/ Skip to content/u);
  assert.match(praxis, /id="praxisSkipLink"/u);
  assert.match(fs.readFileSync(path.join(root, "praxis-catalog.js"), "utf8"), /say\("Skip to content", "İçeriğe geç"\)/u);
  assert.match(praxis, /<link rel="icon"/u);
  assert.match(index, /<link rel="icon"/u);
});
