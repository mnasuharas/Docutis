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

test("templated interface strings translate and leave the stored value intact", () => {
  const { window } = loadLocale();
  const translate = window.DOCUTIS_LOCALE.translate;
  assert.equal(translate("1 condition shown."), "1 tanı gösteriliyor.");
  assert.equal(translate("62 conditions shown."), "62 tanı gösteriliyor.");
  assert.equal(translate("Alternative name: AK; solar keratosis"), "Diğer ad: AK; solar keratosis");
  assert.equal(translate("Close details for Actinic Keratosis"), "Aktinik keratoz ayrıntılarını kapat");
  assert.equal(translate("Open details for Basal Cell Carcinoma"), "Bazal hücreli karsinom ayrıntılarını aç");
  assert.equal(translate("Clinical review status: Clinical review pending"), "Klinik inceleme durumu: Hekim incelemesi bekleniyor");
  assert.equal(translate("3 linked source(s)"), "3 bağlantılı kaynak");
  assert.equal(translate("This article has not yet completed human physician review."), "Bu kayıt henüz hekim incelemesini tamamlamamıştır.");
  assert.equal(translate("Review details"), "İnceleme ayrıntıları");
  assert.equal(translate("Coding"), "Kodlama");
  assert.equal(translate("First Line"), "İlk basamak");
  assert.equal(translate("15 sources attached"), "15 kaynak eklendi");
  assert.equal(translate("Physician review applies to this content version. It does not guarantee correctness or replace professional medical judgment."), "Hekim incelemesi bu içerik sürümü için geçerlidir. Doğruluğu garanti etmez ve mesleki tıbbi değerlendirmenin yerine geçmez.");
  assert.equal(translate("No valid human approval is bound to this exact content version. Automated tests and source checks are not clinical review."), "Bu içerik sürümüne bağlı geçerli bir hekim onayı yoktur. Otomatik testler ve kaynak kontrolleri klinik inceleme değildir.");
});

test("every structured differential name and gloss has a separate Turkish draft", () => {
  const { window } = loadLocale();
  const dictionary = window.DOCUTIS_DIFFERENTIAL_LOCALE;
  const translate = window.DOCUTIS_LOCALE.translate;
  const seen = new Set();
  for (const disease of window.DOCUTIS_DATA.diseases) {
    for (const item of disease.clinicalProfile?.differentials || []) {
      for (const field of ["diagnosis", "distinguishingClue"]) {
        const english = item[field];
        if (!english || seen.has(english)) continue;
        seen.add(english);
        assert.equal(typeof dictionary[english], "string", english);
        if (english !== "Lentigo maligna") assert.notEqual(dictionary[english], english);
        assert.equal(translate(english), dictionary[english]);
      }
    }
  }
  assert.ok(seen.size >= 19);
});
