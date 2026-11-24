(function () {
  "use strict";

  // AJCC 8, Gershenwald et al., Tables 2, 5 and 6 (doi:10.3322/caac.21409).
  const clinicalStages = Object.freeze({
    Tis: "0", T1a: "IA", T1b: "IB", T2a: "IB", T2b: "IIA",
    T3a: "IIA", T3b: "IIB", T4a: "IIB", T4b: "IIC"
  });

  function categoryFromBreslow(value, ulceration) {
    // Keep the decimal separator unambiguous and round exactly at x.x5 mm.
    const parts = /^(\d+)(?:[.,](\d{1,2}))?$/.exec(value.trim());
    if (!parts || !/[1-9]/.test(value)) return null;
    const decimals = (parts[2] || "").padEnd(2, "0");
    const tenths = Number(parts[1]) * 10 + Number(decimals[0]) + (Number(decimals[1]) >= 5 ? 1 : 0);
    if (!Number.isSafeInteger(tenths)) return null;
    const size = tenths <= 10 ? 1 : tenths <= 20 ? 2 : tenths <= 40 ? 3 : 4;
    let category = `T${size}`;
    if (size === 1 && tenths >= 8) category = "T1b";
    else if (ulceration === "yes") category += "b";
    else if (ulceration === "no") category += "a";
    return { category, roundedThickness: (tenths / 10).toFixed(1) };
  }

  function assessMelanoma({ category, nodal, distant, resection }) {
    if (nodal === "positive" || distant === "positive") return { kind: "outside-scope" };
    if (!Object.hasOwn(clinicalStages, category)) return { kind: "t-incomplete" };
    if (!["cN0", "pN0"].includes(nodal) || distant !== "cM0") return { kind: "nm-incomplete" };

    const clinicalStage = clinicalStages[category];
    // Tis and T1 can use clinical N0 for pathologic grouping in AJCC 8.
    const pathologicStage = nodal === "pN0" || category === "Tis" || category.startsWith("T1")
      ? (category === "T1b" ? "IA" : clinicalStage)
      : null;

    let followUpGroup = null;
    if (pathologicStage === clinicalStage) {
      if (pathologicStage === "0") followUpGroup = "melanoma-in-situ";
      else if (pathologicStage === "IA") followUpGroup = "stage-ia";
      else if (pathologicStage === "IIC" && resection === "r0") followUpGroup = "stage-iic-iv-r0";
      else if (["IB", "IIA", "IIB"].includes(pathologicStage)) followUpGroup = "stage-ib-iib";
    }
    return { kind: "grouped", clinicalStage, pathologicStage, followUpGroup };
  }

  const staging = Object.freeze({ categoryFromBreslow, assessMelanoma });
  if (typeof module === "object" && module.exports) module.exports = staging;
  else window.DOCUTIS_MELANOMA_STAGING = staging;
}());
