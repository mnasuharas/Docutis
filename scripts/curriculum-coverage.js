"use strict";

const { buildAudit, formatAudit } = require("./pattern");

function main() {
  const audit = buildAudit();
  console.log(formatAudit(audit));
  console.log("Coverage status is not a numeric efficacy score and is not clinician review.");
}

if (require.main === module) {
  try { main(); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
