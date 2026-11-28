"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const read = name => fs.readFileSync(path.join(__dirname, "..", name), "utf8");
test("case scripts are inert on the initial page and load once in dependency order", async () => {
  const page = read("index.html");
  const bundle = page.match(/<template id="caseScripts">([\s\S]+?)<\/template>/);
  assert.ok(bundle);
  assert.doesNotMatch(page.replace(bundle[0], ""), /<script src="case-data\.js/);
  const paths = [...bundle[1].matchAll(/src="([^"]+)"/g)].map(match => match[1]);
  const requested = [];
  const window = {};
  const document = {
    getElementById: () => ({ content: { querySelectorAll: () => paths.map(src => ({ getAttribute: () => src })) } }),
    createElement: () => ({ remove() {} }),
    head: { appendChild: script => requested.push(script) }
  };
  vm.runInNewContext(read("case-loader.js"), { window, document });
  assert.equal(requested.length, 0);
  const first = window.DOCUTIS_LOAD_CASES();
  assert.equal(window.DOCUTIS_LOAD_CASES(), first);
  assert.deepEqual(requested.map(script => script.src), [paths[0]]);
  requested[0].onload();
  await Promise.resolve();
  requested[1].onerror();
  await assert.rejects(first, /Could not load/);
  const second = window.DOCUTIS_LOAD_CASES();
  for (const [index, expected] of paths.entries()) {
    if (index === 0) continue;
    assert.equal(requested[index + 1].src, expected);
    requested[index + 1].onload();
    await Promise.resolve();
  }
  await second;
  assert.equal(window.DOCUTIS_LOAD_CASES(), second);
  assert.deepEqual(requested.map(script => script.src), [paths[0], paths[1], ...paths.slice(1)]);
});
