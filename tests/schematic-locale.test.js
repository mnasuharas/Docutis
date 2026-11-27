"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");

function nonText(svg) {
  return svg
    .replace(/<text\b[\s\S]*?<\/text>/g, "")
    .replace(/<title\b[\s\S]*?<\/title>/g, "")
    .replace(/<desc\b[\s\S]*?<\/desc>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

test("every schematic has a Turkish variant with the same geometry", () => {
  const directory = path.join(root, "assets/media");
  const english = fs.readdirSync(directory).filter(name => /-schematic\.svg$/.test(name));
  assert.ok(english.length >= 4);
  for (const name of english) {
    const turkishName = name.replace(/\.svg$/, ".tr.svg");
    const source = fs.readFileSync(path.join(directory, name), "utf8");
    const turkish = fs.readFileSync(path.join(directory, turkishName), "utf8");
    assert.equal(nonText(turkish), nonText(source), name);
    assert.match(turkish, /[ğüşıöçĞÜŞİÖÇ]/);
    assert.doesNotMatch(turkish, /Educational schematic · clinician review required/);
  }
  const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
  const quiz = fs.readFileSync(path.join(root, "quiz-app.js"), "utf8");
  assert.match(app, /data-schematic-src/);
  assert.match(quiz, /data-schematic-src/);
});
