"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

function localRefs(html, fromFile) {
  const refs = [];
  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) {
    const url = match[1];
    if (!url || url.startsWith("#") || /^(?:https?:|mailto:|data:|javascript:)/i.test(url)) continue;
    const clean = url.split("#")[0].split("?")[0];
    if (!clean) continue;
    refs.push(path.normalize(path.join(path.dirname(fromFile), clean)));
  }
  return refs;
}

test("local page links and assets exist", () => {
  const pages = ["index.html", "academy-review.html"];
  const missing = [];
  for (const page of pages) {
    const html = fs.readFileSync(path.join(root, page), "utf8");
    for (const ref of localRefs(html, page)) {
      if (!fs.existsSync(path.join(root, ref))) missing.push(`${page} -> ${ref}`);
    }
    for (const id of html.matchAll(/\shref=["']#([^"']+)["']/g)) {
      if (!html.includes(`id="${id[1]}"`)) missing.push(`${page} missing anchor #${id[1]}`);
    }
  }
  assert.deepEqual(missing, []);
});

test("case and media image files exist", () => {
  const missing = [];
  function walk(value) {
    if (typeof value === "string" && value.startsWith("assets/") && !fs.existsSync(path.join(root, value.split("?")[0]))) missing.push(value);
    else if (Array.isArray(value)) value.forEach(walk);
    else if (value && typeof value === "object") Object.values(value).forEach(walk);
  }
  for (const file of ["media-data.js", "case-data.js", "quiz-data.js", "subtle-clue-data.js"]) {
    const text = fs.readFileSync(path.join(root, file), "utf8");
    for (const match of text.matchAll(/["'](assets\/[^"']+)["']/g)) {
      if (!fs.existsSync(path.join(root, match[1].split("?")[0]))) missing.push(`${file} -> ${match[1]}`);
    }
  }
  walk(null);
  assert.deepEqual([...new Set(missing)], []);
});
