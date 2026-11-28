"use strict";
const test = require("node:test"), assert = require("node:assert/strict"), fs = require("node:fs"), path = require("node:path"), vm = require("node:vm");
const root = path.join(__dirname, "..");
class Element {
  constructor(tag, id = "") { this.tagName = tag.toUpperCase(); this.id = id; this.children = []; this.attrs = {}; this.listeners = {}; this.dataset = {}; this.hidden = false; this.className = ""; this._text = ""; }
  set textContent(v) { this._text = String(v); this.children = []; }
  get textContent() { return this._text + this.children.map(x => x.textContent).join(" "); }
  appendChild(c) { this.children.push(c); c.parent = this; return c; }
  replaceChildren() { this.children = []; this._text = ""; }
  setAttribute(k,v) { this.attrs[k] = v; }
  getAttribute(k) { return k === "href" ? this.href : this.attrs[k] ?? null; }
  hasAttribute(k) { return k in this.attrs; }
  removeAttribute(k) { delete this.attrs[k]; }
  addEventListener(type, cb) { (this.listeners[type] ||= []).push(cb); }
  dispatch(type) { (this.listeners[type] || []).forEach(cb => cb({ target: this })); }
  contains(el) { return this === el || this.children.some(c => c.contains(el)); }
  matches(s) { if (s === "a[href]") return this.tagName === "A" && Boolean(this.href); return s.split(", ").some(q => q.startsWith(".") && this.className.split(" ").includes(q.slice(1))); }
  closest(s) { return this.matches(s) ? this : this.parent?.closest(s); }
  focus() { this.focused = true; }
  scrollIntoView() { this.scrolled = true; }
}
function harness(url = "https://example.org/Docutis/", loading = false) {
  const elements = {}, body = new Element("body"), library = new Element("section"), events = {}, windowEvents = {}, nav = [];
  const statSpans = [new Element("span"),new Element("span"),new Element("span")];
  library.className = "reference-library"; body.appendChild(library);
  for (const id of ["studioHome","learn","patterns","searchPanel","mainContent","trainingModule","caseModule","contrastLabModule","pinkCaseModule","subtleClueModule","patternModule","patternExercise","quizModule","followUpModule","nachsorgeModule","evidenceStatus","about","studioToolbar","studioBack","studioScreenLabel","docutisLanguage","cards"]) { const el = new Element(id === "studioBack" ? "a" : "section",id); elements[id] = el; (id === "patternExercise" ? elements.patternModule : id === "cards" ? library : body).appendChild(el); }
  ["home","learn","patterns","reference"].forEach(name => { const el = new Element("a"); el.href = name === "home" ? "#mainContent" : name === "reference" ? "#searchPanel" : "#"+name; el.setAttribute("data-studio-nav",name); nav.push(el); body.appendChild(el); });
  const win = { location: { href:url, hash:new URL(url).hash }, history: { state:{ keep:true }, pushState(state,title,value) { win.location.href=value;win.location.hash=new URL(value).hash; } }, addEventListener(type,cb) { (windowEvents[type] ||= []).push(cb); } };
  const doc = { body, readyState: loading ? "loading" : "complete", documentElement: {lang:"en"}, getElementById:id=>elements[id] || null, createElement:tag=>new Element(tag), querySelector:selector=>selector === ".reference-library" ? library : null, querySelectorAll:selector=>selector === ".primary-links a" ? nav : selector === "#libraryStats .stat-item > span" ? statSpans : [], addEventListener(type,cb) { (events[type] ||= []).push(cb); } };
  const context = { window:win, document:doc, URL }; vm.runInNewContext(fs.readFileSync(path.join(root,"studio.js"),"utf8"),context);
  function click(hash, options = {}) { const el = new Element("a");el.href=hash; if(options.learning)el.className="learning-path-link";if(options.skip)el.className="skip-link";const e={target:el,button:0,preventDefault(){this.prevented=true;},...options}; (events.click||[]).forEach(cb=>cb(e));return e; }
  function history(value) {win.location.href=value;win.location.hash=new URL(value).hash;(windowEvents.popstate||[]).forEach(cb=>cb());}
  return {elements,library,events,windowEvents,win,doc,click,history,body,nav,statSpans};
}
test("home shows only the landing screen; module routing preserves existing DOM state",()=>{
 const h=harness();assert.equal(h.elements.studioHome.hidden,false);assert.equal(h.elements.caseModule.hidden,true);assert.equal(h.library.hidden,true);
 h.click("#learn");assert.equal(h.elements.learn.hidden,false);assert.ok(h.elements.learn.textContent.includes("One Lesion"));
 h.elements.trainingModule.session="retained";h.click("#trainingModule");assert.equal(h.elements.trainingModule.hidden,false);assert.equal(h.elements.learn.hidden,true);
 h.click("#patterns");h.click("#trainingModule");assert.equal(h.elements.trainingModule.session,"retained");h.click("#mainContent",{skip:true});assert.equal(h.elements.trainingModule.hidden,false);
 h.click("#patternExercise");assert.equal(h.elements.patternModule.hidden,false);assert.equal(h.elements.caseModule.hidden,true);
});
test("reference entry, browser history, legacy anchors and search shortcut reveal the correct screen",()=>{
 const h=harness("https://example.org/Docutis/?condition=cutaneous-melanoma#detail-sources");assert.equal(h.library.hidden,false);assert.equal(h.elements.searchPanel.hidden,false);
 h.click("#patterns");assert.ok(!new URL(h.win.location.href).searchParams.has("condition"));
 h.history("https://example.org/Docutis/?condition=cutaneous-melanoma#detail-sources");assert.equal(h.library.hidden,false);
 h.click("#mainContent");assert.equal(h.elements.studioHome.hidden,false);
 (h.events.keydown||[]).forEach(cb=>cb({key:"/",target:{tagName:"BODY"}}));assert.equal(h.elements.searchPanel.hidden,false);
 assert.equal(h.nav.find(el=>el.attrs["data-studio-nav"]==="reference").attrs["aria-current"],"page");
 h.click("#mainContent");(h.events.keydown||[]).forEach(cb=>cb({key:"/",target:{tagName:"INPUT"}}));assert.equal(h.elements.studioHome.hidden,false);
});
test("learning links reveal a module before its own handler; modified clicks keep browser semantics",()=>{
 const h=harness();h.click("#caseModule",{learning:true});assert.equal(h.elements.caseModule.hidden,false);assert.ok(!h.elements.caseModule.focused);
 const old=h.win.location.href;const e=h.click("#quizModule",{ctrlKey:true});assert.equal(h.win.location.href,old);assert.ok(!e.prevented);
});
test("Turkish hubs change immediately without resetting an active module",()=>{
 const h=harness();h.click("#contrastLabModule");h.elements.contrastLabModule.session="ongoing";h.doc.documentElement.lang="tr";h.elements.docutisLanguage.dispatch("change");
 assert.equal(h.elements.contrastLabModule.hidden,false);assert.equal(h.elements.contrastLabModule.session,"ongoing");assert.match(h.elements.patterns.textContent,/Erken Melanom/);assert.match(h.elements.studioBack.textContent,/Patern Eğitimleri/);assert.equal(h.statSpans[0].textContent," tanı kaydı");
});
test("deferred initialization and unknown fragments keep a usable home",()=>{
 const h=harness("https://example.org/Docutis/#unknown",true);assert.equal(h.events.click,undefined);h.events.DOMContentLoaded.forEach(cb=>cb());assert.equal(h.elements.studioHome.hidden,false);
});
test("presentation has three landing paths, responsive grids and preserved medical disclosure",()=>{
 const html=fs.readFileSync(path.join(root,"index.html"),"utf8"), css=fs.readFileSync(path.join(root,"studio.css"),"utf8");
 assert.equal((html.match(/class="studio-path"/g)||[]).length,3);assert.match(html,/id="patternModule"/);assert.match(html,/studio-context[\s\S]*case-disclaimer/);
 assert.match(css,/@media \(max-width: 700px\)/);assert.match(css,/\.studio-paths, \.studio-course-grid \{ grid-template-columns: minmax\(0, 1fr\)/);assert.match(css,/\[hidden\] \{ display: none !important/);
});

test("nachsorge query and hash open the follow-up screen and other tabs clear the query", () => {
  const h = harness("https://example.org/Docutis/?nachsorge=cutaneous-melanoma");
  assert.equal(h.elements.nachsorgeModule.hidden, false);
  assert.equal(h.elements.studioHome.hidden, true);
  h.click("#patterns");
  assert.equal(h.elements.patterns.hidden, false);
  assert.ok(!new URL(h.win.location.href).searchParams.has("nachsorge"));
  h.history("https://example.org/Docutis/?nachsorge=merkel-cell-carcinoma#nachsorgeModule");
  assert.equal(h.elements.nachsorgeModule.hidden, false);
});
test("the retired Dermato-Oncology Follow-Up address opens Follow-Up (Tümör Takibi)",()=>{
 const h=harness("https://example.org/Docutis/#followUpModule");
 assert.equal(h.elements.nachsorgeModule.hidden,false);
 const studio=fs.readFileSync(path.join(root,"studio.js"),"utf8");
 assert.doesNotMatch(studio,/Oncology Follow-Up|Onkolojik Takip/);
});
