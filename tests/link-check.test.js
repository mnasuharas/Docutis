const assert = require("node:assert/strict");
const test = require("node:test");
const { scanRepository, main } = require("../scripts/link-check");

test("offline link check finds many URLs with zero structural failures", async () => {
  const report = scanRepository();
  assert.ok(report.unique.length >= 100, `expected many URLs, got ${report.unique.length}`);
  assert.equal(report.failures.length, 0, report.failures.map(f => `${f.url}: ${f.reason}`).join("; "));
  const exit = await main([]);
  assert.equal(exit.failures.length, 0);
  assert.ok(exit.unique.length >= 100);
});