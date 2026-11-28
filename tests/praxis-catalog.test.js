"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.join(__dirname, "..");
const read = name => fs.readFileSync(path.join(root, name), "utf8");
const context = vm.createContext({ window: {} });
for (const name of ["data.js", "praxis-pilot-data.js", "praxis-catalog-data.js"]) {
  vm.runInContext(read(name), context);
}
const { DOCUTIS_DATA: diseases, DOCUTIS_PRAXIS_CATALOG: catalog, DOCUTIS_PRAXIS_PILOT: pilot } = context.window;
const rows = JSON.parse(JSON.stringify(catalog.chapters));
const notes = JSON.parse(JSON.stringify(catalog.handouts));

test("the Praxis catalogue covers all 92 source chapters with valid related condition links", () => {
  const ids = [...Array.from({ length: 53 }, (_, i) => "1." + (i + 1)),
    ...Array.from({ length: 39 }, (_, i) => "2." + (i + 1))];
  assert.deepEqual(Object.keys(rows), ids);
  const validConditions = new Set(diseases.diseases.map(row => row.id));
  const linked = Object.values(rows).flatMap(row => row.conditions);
  assert.equal(new Set(linked).size, linked.length);
  assert.ok(linked.every(id => validConditions.has(id)));
  let previousPage = 0;
  for (const row of Object.values(rows)) {
    assert.ok(row.guidePage > previousPage);
    assert.ok(row.germanName && row.turkishName);
    previousPage = row.guidePage;
  }
});

test("every handbook page is represented, including non-disease notes and the two-page isotretinoin note", () => {
  const represented = [...Object.values(notes).flatMap(note => {
    const [first, last] = String(note.page).split("–").map(Number);
    assert.ok(note.about && note.treatment && note.daily && note.contact);
    return last ? Array.from({ length: last - first + 1 }, (_, i) => first + i) : [first];
  }), ...Object.values(pilot).filter(row => row.patient).map(row => row.handoutPage)];
  assert.deepEqual(represented.sort((a, b) => a - b), Array.from({ length: 22 }, (_, i) => i + 1));
  assert.equal(Object.keys(notes).length + Object.values(pilot).filter(row => row.patient).length, 21);
  assert.match(read("praxis-pilot.css"), /@media print\s*\{[^}]*#detail-patient-info[^}]*display:\s*none/);
});

test("source-derived chapters do not gain product-specific prescriptions by import", () => {
  for (const [id, row] of Object.entries(rows)) {
    if (row.verifiedCard) {
      assert.ok(pilot[row.verifiedCard].example.length);
      assert.ok(pilot[row.verifiedCard].sources.some(([name]) => /Fachinformation|Produktinformation/.test(name)));
      continue;
    }
    assert.ok(row.appearance && row.diagnosis && row.approach, id);
    assert.equal(Object.hasOwn(row, "example"), false, id);
    assert.doesNotMatch([row.appearance, row.diagnosis, row.approach, row.alerts].join(" "),
      /\d+\s*(?:mg|µg)\b|\[OFF-LABEL\]|\bRp\./i, id);
  }
});
