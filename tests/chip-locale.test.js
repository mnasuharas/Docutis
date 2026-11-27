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
  for (const name of ["clinical-schema.js", "data.js", "media-data.js", "review-status.js", "case-data.js", "differential-locale.js", "profile-locale.js", "remainder-locale.js", "coding-locale.js", "training-locale.js", "clinical-locale.js", "locale.js"]) {
    vm.runInNewContext(fs.readFileSync(path.join(root, name), "utf8"), context);
  }
  return context.window;
}

function chipValues(profile) {
  const values = [];
  const morphology = profile.presentation?.morphology || {};
  for (const key of ["primaryLesions", "otherPrimaryLesions", "secondaryChanges", "colors", "surface", "border", "configuration"]) {
    values.push(...(morphology[key] || []));
  }
  const localization = profile.presentation?.localization;
  if (localization) values.push(...(localization.sites || []), ...(localization.distribution || []));
  values.push(...(profile.presentation?.symptoms?.values || []));
  values.push(...(profile.presentation?.course?.values || []));
  values.push(...(profile.etiology?.mechanisms || []));
  const dermoscopy = profile.dermoscopy || {};
  for (const key of ["patterns", "vascularStructures", "pigmentStructures", "scaleKeratinClues", "highRiskClues"]) {
    values.push(...(dermoscopy[key] || []));
  }
  return values;
}

test("structured chips are translated from the stored id, not the title-cased label", () => {
  const app = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  assert.match(app, /chipSource\(value\)/);
  assert.doesNotMatch(app, /appendTextElement\(tags, "span", humanize\(value\)/);

  const window = load();
  const locale = window.DOCUTIS_LOCALE;
  const seen = new Set();
  for (const disease of window.DOCUTIS_DATA.diseases) {
    if (!disease.clinicalProfile) continue;
    for (const raw of chipValues(disease.clinicalProfile)) {
      if (seen.has(raw)) continue;
      seen.add(raw);
      const shown = locale.chipSource(raw);
      if (locale.translate(raw)) assert.equal(shown, raw, `title-cased label would miss the stored id: ${raw}`);
      const turkish = locale.translate(shown);
      assert.equal(typeof turkish, "string", raw);
      assert.notEqual(turkish, shown, raw);
      assert.doesNotMatch(turkish, /\b(Pattern|Vessels|Structures)\b/);
    }
  }
  assert.ok(seen.size > 40);
  const bcc = locale.translate("arborising vessels");
  assert.match(bcc, /Arborize damarlar \(arborizing vessels\)/);
  assert.match(locale.translate("nodular BCC pattern"), /Nodüler BHK paterni/);
  assert.match(locale.translate("blue-grey ovoid nests"), /Mavi-gri ovoid yuvalar/);
  assert.match(locale.translate("maple leaf–like areas"), /Yaprak benzeri alanlar \(maple leaf-like\)/);
  assert.match(locale.translate("spoke-wheel/concentric structures"), /Tekerlek şuağı/);
  assert.match(locale.translate("shiny white-red structureless areas"), /Parlak beyaz-kırmızı yapısız alanlar/);
  assert.match(locale.translate("white streaks / chrysalis"), /Beyaz çizgiler \/ krizalit yapılar/);
  const ulceration = locale.translate("dermoscopic or clinical ulceration is a supportive dermoscopic finding only and is NOT an S2k Table 2 high recurrence-risk criterion by itself");
  assert.match(ulceration, /yalnızca destekleyici/);
  assert.match(ulceration, /S2k Tablo 2/);
  assert.match(ulceration, /değildir/);
});

test("oncology paragraphs, media captions and joined labels translate from the stored text", () => {
  const app = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
  const reviewUi = fs.readFileSync(path.join(__dirname, "..", "review-ui.js"), "utf8");
  assert.match(app, /replace\(\/\(\[a-z0-9\]\)\(\[A-Z\]\)\/g/);
  assert.match(reviewUi, /appendSectionList/);
  assert.doesNotMatch(reviewUi, /item\.sections\.join/);

  const window = load();
  const locale = window.DOCUTIS_LOCALE;
  function titled(id) {
    return String(id).replaceAll("-", " ").replace(/\b\w/g, character => character.toUpperCase());
  }
  function need(value) {
    const turkish = locale.translate(value);
    assert.equal(typeof turkish, "string", value);
    assert.notEqual(turkish, value, value);
    return turkish;
  }

  for (const disease of window.DOCUTIS_DATA.diseases) {
    const oncology = disease.clinicalProfile?.oncology;
    if (!oncology) continue;
    for (const [key, value] of Object.entries(oncology)) {
      if (typeof value === "string") need(value);
      need(titled(key.replace(/([a-z0-9])([A-Z])/g, "$1 $2")));
    }
  }
  for (const item of window.DOCUTIS_MEDIA.items) {
    for (const field of ["title", "caption", "alt", "educationalDescription"]) need(item[field]);
  }
  const sections = new Set();
  for (const asset of window.DOCUTIS_REVIEW_STATUS.assets) {
    for (const id of asset.sections || []) sections.add(id);
    for (const entry of asset.history || []) for (const id of entry.reviewedSections || []) sections.add(id);
  }
  for (const id of sections) need(titled(id));

  assert.match(need("Follow-up protocol. No German follow-up protocol is published for this record."), /Takip protokolü/);
  assert.match(need("Quiz. No quiz item is published for this record."), /test öğesi/);
  assert.match(need("Schematic. No original schematic is published for this record."), /şema/i);
  const bibliography = need("Organization or journal: DermNet · Source type: clinical reference · Publication year: 2024");
  assert.match(bibliography, /Kurum veya dergi: DermNet/);
  assert.match(bibliography, /Kaynak türü: klinik başvuru kaynağı/);
  assert.match(bibliography, /Yayın yılı: 2024/);
  assert.match(need("illustration · Diagnosis: Basal Cell Carcinoma"), /İllüstrasyon/);
  assert.match(need("illustration · Diagnosis: Basal Cell Carcinoma"), /Bazal hücreli karsinom/);
  assert.match(need("Patient-identifiable content: No · Consent basis: Not applicable — original schematic with no patient content"), /Hastayı tanımlayan içerik: Hayır/);
  const risk = locale.translate(window.DOCUTIS_DATA.diseases.find(item => item.id === "basal-cell-carcinoma").clinicalProfile.oncology.riskClassification);
  assert.match(risk, /UNRESOLVED SOURCE-BOUNDARY/);
  assert.match(risk, />6 mm/);
  assert.match(risk, /authorisedMetastaticBCC=false|lfBZK\/laBCC/);
  assert.match(risk, /eklenmez|ayrı tutun/);
  assert.match(locale.translate(window.DOCUTIS_DATA.diseases.find(item => item.id === "basal-cell-carcinoma").clinicalProfile.oncology.systemicTherapyReferral), /authorisedMetastaticBCC=false/);

  for (const caseItem of window.DOCUTIS_CASES.cases) {
    const site = caseItem.patientContext && caseItem.patientContext.anatomicalSite;
    if (site) need(site);
    for (const pattern of caseItem.patterns || []) if (pattern.label) need(pattern.label);
  }
  for (const skill of window.DOCUTIS_CASES.curriculum.skills) need(skill.title);
  for (const level of window.DOCUTIS_CASES.curriculum.levels) need(level.title);
  for (const label of ["Structured clinical profiles", "Records requiring clinician review", "Reviewed follow-up protocols", "Most recent valid human review"]) need(label);
  assert.match(locale.translate("57 cases shown. Diagnosis stays hidden until you reveal it inside a case."), /vaka gösteriliyor/);
  assert.match(locale.translate("Curriculum level 3: Pattern integration"), /Patern bütünleştirme/);
  assert.match(locale.translate("clinical · advanced"), /klinik · ileri/);
});
