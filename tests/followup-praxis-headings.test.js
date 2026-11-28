"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const read = name => fs.readFileSync(path.join(root, name), "utf8");

function load(name) {
  const context = { window: {} };
  vm.runInNewContext(read(name), context);
  return context.window;
}

test("record headings use natural title case in English and Turkish", () => {
  const { DOCUTIS_HEADING_CASE: heading } = load("heading-case.js");
  assert.equal(heading.en("Clinical presentation"), "Clinical Presentation");
  assert.equal(heading.en("Second Line Or Alternative"), "Second-Line or Alternative");
  assert.equal(heading.en("Refractory Or Severe"), "Refractory or Severe");
  assert.equal(heading.en("Re Excision"), "Re-Excision");
  assert.equal(heading.en("Recurrence Metastasis"), "Recurrence/Metastasis");
  assert.equal(heading.en("Follow-up and escalation"), "Follow-Up and Escalation");
  assert.equal(heading.en("Red Flags"), "Red Flags");
  assert.equal(heading.tr("klinik görünüm"), "Klinik Görünüm");
  assert.equal(heading.tr("tanı ve dermoskopi"), "Tanı ve Dermoskopi");
  assert.equal(heading.tr("ilk basamak"), "İlk Basamak");
  assert.equal(heading.tr("İkinci basamak veya alternatif"), "İkinci Basamak veya Alternatif");
});

test("Turkish Praxis chapter titles keep Latin terms and contain no German words", () => {
  const titles = load("praxis-title-tr.js").DOCUTIS_PRAXIS_TITLES_TR;
  const chapters = Object.entries(titles.chapters);
  assert.ok(chapters.length >= 90);
  const german = /(?<!\p{L})(und|inkl\.?|der|die|das|dem|den|des|mit|bei|oder|von|vom|zur|zum|für|nicht|auch|Haut\w*|Hautkrebs|Erkrankung\w*|Entzündung\w*|Infektion\w*|Behandlung|Störung\w*|Krebs|Kinder|Nagel|Haare?|Schleimhaut\w*)(?!\p{L})/iu;
  const offenders = chapters.filter(([, title]) => german.test(title));
  assert.deepEqual(offenders, []);
  assert.equal(titles.chapters["1.48"], "Tinea corporis, Tinea cruris ve Tinea pedis");
  assert.equal(titles.chapters["1.2"], "Aktinik keratoz (alan kanserizasyonu dahil)");
  assert.equal(titles.chapters["2.21"], "Lichen planus");
});

test("Praxis Turkish mode hides the German title but search still matches it", () => {
  const catalog = read("praxis-catalog.js");
  const pilot = read("praxis-pilot.js");
  assert.match(catalog, /Tanı veya konu ara/);
  assert.doesNotMatch(catalog, /Almanca veya Türkçe ara/);
  assert.match(catalog, /titlesTr/);
  assert.match(catalog, /chapter\.germanName/); // still part of the search text
  assert.match(pilot, /current\(\) \? titlesTr\[id\] \|\| chapter\.turkishName : chapter\.germanName/);
  assert.match(pilot, /if \(!current\(\)\) add\(sheet, ?"p", ?note\.germanName/);
});

test("Tümör Takibi has one disclaimer, an English-only EN banner and a diagnosis placeholder", () => {
  const html = read("index.html");
  const app = read("nachsorge-app.js");
  assert.doesNotMatch(html, /Tümör Takibi:/);
  assert.match(html, /data-tr-placeholder="Tanı ara: melanom, Merkel, Bowen…"/);
  assert.match(app, /lang\(\) === "tr" \? DISCLAIMER_TR : DISCLAIMER_EN/);
});

test("brand and category controls keep their visible text inside the accessible name", () => {
  const html = read("index.html");
  assert.doesNotMatch(html, /<span class="brand-mark"[^>]*>\s*D\s*<\/span>/);
  assert.match(read("app.js"), /aria-label", `\$\{category\.title\} \$\{count\} condition/);
});
