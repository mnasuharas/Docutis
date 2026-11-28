"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");

const GERMAN_WORD = new RegExp(String.raw`(?<![\p{L}\p{N}])(?:sollte|soll|kann|Expertenkonsens|kann-Empfehlung|Stadium|anzeigen|Nachsorge|unbekannt|unklar|Metastasen|Metastasierung|Lippenhaut|Aktinische|Keratose|Haut|Kopfhaut|Augenlides|Gehörganges|Perianalhaut|Neubildung|einschließlich|überlappend|bezeichneter|Gesichtes|Rumpfes|Extremität|Kanthus|beurteilbar|nachweisbarer|Primärtumor|dokumentiert|Resektionsstatus|Stadiengruppe|Leitlinie|Angabe|Befund|Kategorie|Breslow-Dicke|Ulzeration|Regionärer|klinisch|pathologisch|Hinweis|nachgewiesen|Satelliten|Mikrosatelliten|Ärztliche|ausstehend|wählen|Bitte|Schema|übernommen|bedarfsorientiert|Nein|Ja|nicht|kein|Histologische|T-Kategorie|Unbekannt|Fernmetastasen|Konsens|Fachinformation\w*|Gefäße|Gefaesse)(?![\p{L}\p{N}])`, "iu");
const PAREN_FUNCTION_WORD = /\([^)]*\b(?:und|oder|der|die|das)\b[^)]*\)/iu;
const SHARP_S = /ß/u;

function germanHit(text) {
  return GERMAN_WORD.test(text) || PAREN_FUNCTION_WORD.test(text) || SHARP_S.test(text);
}

function unquote(body) {
  try { return JSON.parse(`"${body}"`); }
  catch { return body; }
}

function translationValues(source) {
  const values = [];
  const re = /:\s*"((?:\\.|[^"\\])*)"/g;
  let match;
  while ((match = re.exec(source))) values.push(unquote(match[1]));
  return values;
}

function bilingualTargets(source) {
  const values = [];
  const patterns = [
    /\b(?:say|pair|t)\(\s*"(?:\\.|[^"\\])*"\s*,\s*"((?:\\.|[^"\\])*)"/g,
    /\b(?:say|pair|t)\(\s*`(?:\\.|[^`\\])*`\s*,\s*`((?:\\.|[^`\\])*)`/g,
    /\b(?:say|pair|t)\(\s*'(?:\\.|[^'\\])*'\s*,\s*'((?:\\.|[^'\\])*)'/g
  ];
  for (const re of patterns) {
    let match;
    while ((match = re.exec(source))) {
      values.push(re.source.includes("`") ? match[1] : unquote(match[1]));
    }
  }
  return values;
}

function htmlTurkish(source) {
  const values = [];
  const re = /data-tr(?:-[a-z-]+)?="([^"]*)"/g;
  let match;
  while ((match = re.exec(source))) values.push(match[1]);
  return values;
}

test("Turkish UI strings do not keep German words beside the translation", () => {
  const offenders = [];
  const consider = (file, text) => {
    if (text && germanHit(text)) offenders.push(`${file}: ${text.slice(0, 180)}`);
  };
  for (const file of fs.readdirSync(root)) {
    if (!file.endsWith(".html")) continue;
    for (const text of htmlTurkish(fs.readFileSync(path.join(root, file), "utf8"))) consider(file, text);
  }
  for (const file of fs.readdirSync(root).filter(name => name === "locale.js" || name.endsWith("-locale.js"))) {
    for (const text of translationValues(fs.readFileSync(path.join(root, file), "utf8"))) consider(file, text);
  }
  for (const file of fs.readdirSync(root).filter(name => name.endsWith(".js") && !name.endsWith(".test.js"))) {
    if (file.endsWith("-data.js") || file.endsWith("-locale.js") || file === "locale.js" || file === "review-status.js") continue;
    for (const text of bilingualTargets(fs.readFileSync(path.join(root, file), "utf8"))) consider(file, text);
  }
  assert.deepEqual(offenders, []);
});

test("the follow-up table stacks year blocks below 600px", () => {
  const css = fs.readFileSync(path.join(root, "style.css"), "utf8");
  const block = css.slice(css.lastIndexOf("@media (max-width: 600px)"));
  assert.match(block, /\.nachsorge-table-wrap\s*\{[^}]*overflow-x:\s*visible/);
  assert.match(block, /\.nachsorge-table\s*\{[^}]*min-width:\s*0/);
  assert.match(block, /\.nachsorge-table td::before\s*\{[^}]*content:\s*attr\(data-period\)/);
  assert.match(fs.readFileSync(path.join(root, "nachsorge-app.js"), "utf8"), /data-period/);
});

test("Turkish prose outside source labels avoids German product-information wording", () => {
  const offenders = [];
  for (const file of ["praxis-pilot-data.js", "praxis-catalog-data.js"]) {
    const lines = fs.readFileSync(path.join(root, file), "utf8").split("\n");
    lines.forEach((line, index) => {
      if (/^\s*\["[^"]*",\s*"https?:/.test(line)) return; // citation label + URL pair
      if (/Fachinformation|Leitlinie\b/.test(line)) offenders.push(`${file}:${index + 1}: ${line.trim().slice(0, 120)}`);
    });
  }
  assert.deepEqual(offenders, []);
});

test("German gloss elements are hidden in Turkish mode", () => {
  const css = fs.readFileSync(path.join(root, "style.css"), "utf8");
  assert.match(css, /html\[lang="tr"\]\s*\[data-de-gloss\]\s*\{\s*display:\s*none/);
  for (const file of ["case-app.js", "pattern-exercise.js"]) {
    assert.match(fs.readFileSync(path.join(root, file), "utf8"), /data-de-gloss/, file);
  }
  const mimic = fs.readFileSync(path.join(root, "mimic-app.js"), "utf8");
  assert.match(mimic, /"Patern terminolojisi · TR \/ EN"/);
  assert.match(mimic, /lang === "tr" \? \[term\[1\], term\[0\]\]/);
});
