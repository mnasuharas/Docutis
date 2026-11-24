const assert = require("node:assert/strict");
const test = require("node:test");
const { categoryFromBreslow, assessMelanoma } = require("../melanoma-staging");

test("AJCC 8 rounds thickness to tenths before comparing T cutoffs", () => {
  const checks = [
    ["0.74", "no", "T1a", "0.7"], ["0,75", "no", "T1b", "0.8"],
    ["0,6", "yes", "T1b", "0.6"], ["0.9", "", "T1b", "0.9"],
    ["0.6", "", "T1", "0.6"], ["1.04", "yes", "T1b", "1.0"],
    ["1.05", "no", "T2a", "1.1"], ["2.04", "yes", "T2b", "2.0"],
    ["2.05", "no", "T3a", "2.1"], ["4.04", "yes", "T3b", "4.0"],
    ["4.05", "no", "T4a", "4.1"], ["4.05", "yes", "T4b", "4.1"]
  ];
  for (const [value, ulceration, category, roundedThickness] of checks) {
    assert.deepEqual(categoryFromBreslow(value, ulceration), { category, roundedThickness });
  }
  for (const invalid of ["", "0", "0,00", "-1", ">=0.8", "1.2.3", "1 mm", "0.755", "3e1"]) {
    assert.equal(categoryFromBreslow(invalid, "no"), null, invalid);
  }
});

test("known negative regional and distant status groups AJCC 8 stages 0 through IIC", () => {
  const expected = {
    Tis: ["0", "0"], T1a: ["IA", "IA"], T1b: ["IB", "IA"], T2a: ["IB", "IB"],
    T2b: ["IIA", "IIA"], T3a: ["IIA", "IIA"], T3b: ["IIB", "IIB"], T4a: ["IIB", "IIB"], T4b: ["IIC", "IIC"]
  };
  for (const [category, [clinicalStage, pathologicStage]] of Object.entries(expected)) {
    const result = assessMelanoma({ category, nodal: "pN0", distant: "cM0" });
    assert.equal(result.clinicalStage, clinicalStage, category);
    assert.equal(result.pathologicStage, pathologicStage, category);
  }
});

test("incomplete staging, positive N or M, T1b discordance and R0 control the reference shortcut", () => {
  const stage = (category, options) => assessMelanoma({ category, nodal: "cN0", distant: "cM0", ...options });
  assert.equal(stage("T1b", { nodal: "" }).kind, "nm-incomplete");
  assert.equal(stage("T1b", { distant: "" }).kind, "nm-incomplete");
  assert.equal(stage("T1", {}).kind, "t-incomplete");
  assert.equal(stage("TX", {}).kind, "t-incomplete");
  assert.equal(stage("T0", { nodal: "positive" }).kind, "outside-scope");
  assert.equal(stage("T1a", { distant: "positive" }).kind, "outside-scope");
  assert.deepEqual(stage("T1b", {}), {
    kind: "grouped", clinicalStage: "IB", pathologicStage: "IA", followUpGroup: null
  });
  assert.equal(stage("Tis", {}).followUpGroup, "melanoma-in-situ");
  assert.equal(stage("T1a", {}).followUpGroup, "stage-ia");
  assert.equal(stage("T2b", {}).pathologicStage, null);
  assert.equal(stage("T2b", {}).followUpGroup, null);
  assert.equal(stage("T2b", { nodal: "pN0" }).followUpGroup, "stage-ib-iib");
  assert.equal(stage("T4b", { nodal: "pN0" }).followUpGroup, null);
  assert.equal(stage("T4b", { nodal: "pN0", resection: "r0" }).followUpGroup, "stage-iic-iv-r0");
});
