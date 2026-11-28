/* Presentation navigation only: clinical data, module state and review decisions stay in their own apps. */
(function () {
  "use strict";
  const home = document.getElementById("studioHome");
  if (!home) return;
  const tr = () => document.documentElement.lang === "tr";
  const say = (en, turkish) => tr() ? turkish : en;
  const catalog = [
    { id: "trainingModule", group: "learn", alsoIn: ["patterns"], art: "mixed", title: ["One lesion at a time", "Her seferinde bir lezyon"], description: ["Build an impression, open the available views, then compare with the source.", "İlk izlenimini seç, mevcut görüntüleri aç ve kaynakla karşılaştır."], tag: ["Mixed case practice", "Karma vaka çalışması"] },
    { id: "caseModule", group: "learn", alsoIn: ["patterns"], art: "library", title: ["The case collection", "Vaka koleksiyonu"], description: ["Browse clinical cases or choose a guided skin cancer pathway.", "Klinik vakalara göz at veya yönlendirmeli deri kanseri serisini seç."], tag: ["Guided & independent", "Yönlendirmeli ve bağımsız"] },
    { id: "guidedPatternModule", group: "patterns", art: "pattern", title: ["Key patterns in real images", "Gerçek görüntülerde önemli paternler"], description: ["Compare two dermoscopy images and locate the structure before revealing the diagnosis.", "İki dermoskopi görüntüsünü karşılaştır, yapıyı bul ve ardından kaynak tanısını aç."], tag: ["Guided pattern lessons", "Rehberli patern dersleri"] },
    { id: "mimicModule", group: "patterns", art: "compare", title: ["Mimics and diagnostic traps", "Taklitçiler ve tanısal tuzaklar"], description: ["Describe real dermoscopy images before comparing clinical views and checking the source diagnosis.", "Gerçek dermoskopi görüntülerini tarif et, klinik görüntüleri karşılaştır ve kaynak tanısını incele."], tag: ["Eight case comparisons", "Sekiz vaka karşılaştırması"] },
    { id: "contrastLabModule", group: "patterns", art: "compare", title: ["Early melanoma, close mimics", "Erken melanom ve yakın taklitçileri"], description: ["Compare two lesions and look closer at the region that changed your impression.", "İki lezyonu karşılaştır; izlenimini değiştiren bölgeyi yakından incele."], tag: ["Side-by-side comparisons", "Yan yana karşılaştırma"] },
    { id: "pinkCaseModule", group: "patterns", art: "vessels", title: ["Beyond pigment", "Pigmentin ötesinde"], description: ["Explore vessels and white structures in pink lesions, then add the clinical story.", "Pembe lezyonlarda damarları ve beyaz yapıları incele; ardından klinik öyküyü ekle."], tag: ["Pink lesions", "Pembe lezyonlar"] },
    { id: "subtleClueModule", group: "patterns", art: "clues", title: ["The subtle clue", "Silik ipucunu fark et"], description: ["Find a structure, mark its location and compare with a close mimic.", "Yapıyı bul, yerini işaretle ve yakın taklitçisiyle karşılaştır."], tag: ["Clues & counterexamples", "İpuçları ve karşı örnekler"] },
    { id: "patternModule", target: "patternExercise", group: "patterns", art: "pattern", title: ["Start with what you see", "Önce gördüğünü tarif et"], description: ["Work through structures and vessel patterns before opening the diagnosis.", "Tanıyı açmadan önce yapıları ve damar paternlerini çalış."], tag: ["Pattern foundations", "Patern temelleri"] },
    { id: "quizModule", group: "learn", alsoIn: ["patterns"], art: "quiz", title: ["A short knowledge check", "Kısa bir bilgi çalışması"], description: ["Review morphology and clinical reasoning across inflammatory, acneiform, infectious and skin-cancer examples.", "İnflamatuvar, akneiform, enfeksiyöz ve deri kanseri örneklerinde morfoloji ve klinik akıl yürütmeyi tekrar et."], tag: ["Cross-condition quiz", "Farklı tanılardan kısa test"] }
  ];
  const reference = document.querySelector(".reference-library");
  const screens = { home: [home], learn: [document.getElementById("learn")], patterns: [document.getElementById("patterns")], reference: [document.getElementById("searchPanel"), reference] };
  [...catalog.map(item => item.id), "followUpModule", "evidenceStatus", "about"].forEach(id => { screens[id] = [document.getElementById(id)]; });
  let current = "home";
  function node(tag, content, parent, className) {
    const el = document.createElement(tag); if (content) el.textContent = content; if (className) el.className = className;
    if (parent) parent.appendChild(el); return el;
  }
  function translate() {
    document.querySelectorAll("[data-en][data-tr]").forEach(el => { el.textContent = el.getAttribute(tr() ? "data-tr" : "data-en"); });
    document.querySelectorAll("[data-en-alt][data-tr-alt]").forEach(el => {
      el.setAttribute("alt", el.getAttribute(tr() ? "data-tr-alt" : "data-en-alt"));
    });
    const statLabels = [[" condition records", " tanı kaydı"], [" clinical categories", " klinik kategori"], [" oncology follow-up protocols", " onkolojik takip protokolü"]];
    document.querySelectorAll("#libraryStats .stat-item > span").forEach((el, i) => { if (statLabels[i]) el.textContent = say(...statLabels[i]); });
    const stats = document.getElementById("libraryStats"); if (stats) stats.setAttribute("aria-label", say("Current reference coverage", "Güncel kapsam"));
    renderHubs(); toolbar();
  }
  function renderHubs() {
    ["learn", "patterns"].forEach(group => {
      const hub = document.getElementById(group); hub.replaceChildren();
      node("p", "DOCUTIS / " + (group === "learn" ? say("PRACTICE", "PRATİK") : say("DERMOSCOPY", "DERMOSKOPİ")), hub, "eyebrow");
      const title = node("h2", group === "learn" ? say("Clinical cases", "Klinik vakalar") : say("Dermoscopy patterns", "Dermoskopi paternleri"), hub); title.tabIndex = -1;
      node("p", group === "learn" ? say("Choose an exercise to practise clinical reasoning.", "Klinik akıl yürütmeyi çalışmak için bir egzersiz seç.") : say("Identify structures in real images and compare lesions that look alike.", "Gerçek görüntülerde yapıları tanı ve birbirine benzeyen lezyonları karşılaştır."), hub, "studio-hub-intro");
      const grid = node("div", "", hub, "studio-course-grid");
      catalog.filter(item => item.group === group).concat(catalog.filter(item => item.alsoIn?.includes(group))).forEach(item => {
        const card = node("a", "", grid, "studio-course"); card.href = "#" + (item.target || item.id);
        card.className += " art-" + item.art;
        const copy = node("div", "", card, "studio-course-copy");
        node("p", say(...item.tag), copy, "studio-course-tag"); node("h3", say(...item.title), copy); node("p", say(...item.description), copy);
        node("span", say("Open practice →", "Eğitimi aç →"), copy, "studio-course-action");
      });
      const utility = node("div", "", hub, "studio-utility-links");
      [["followUpModule", "Oncology follow-up", "Onkolojik takip"], ["evidenceStatus", "Review status & sources", "İnceleme durumu ve kaynaklar"]].forEach(([id, en, turkish]) => { const a = node("a", say(en, turkish) + " →", utility); a.href = "#" + id; });
    });
  }
  function route(hash) {
    const id = String(hash || "").replace(/^#/, "");
    if (["mainContent", "studioHome", "pageTitle"].includes(id)) return "home";
    if (id === "patternExercise") return "patternModule";
    if (id === "searchPanel" || id === "conditionsTitle" || id === "cards" || id === "details" || id.startsWith("detail-") || id.startsWith("category-")) return "reference";
    if (screens[id]) return id;
    const target = id && document.getElementById(id);
    if (target) { for (const [name, elements] of Object.entries(screens)) if (elements.some(el => el && el.contains(target))) return name; }
    return new URL(window.location.href).searchParams.has("condition") ? "reference" : "home";
  }
  function toolbar() {
    const bar = document.getElementById("studioToolbar"), back = document.getElementById("studioBack"), label = document.getElementById("studioScreenLabel");
    bar.hidden = ["home", "learn", "patterns"].includes(current);
    const item = catalog.find(item => item.id === current), group = item ? item.group : "home";
    back.href = group === "home" ? "#mainContent" : "#" + group;
    back.textContent = group === "home" ? say("← Home", "← Ana sayfa") : group === "learn" ? say("← Case studio", "← Vaka eğitimleri") : say("← Pattern studio", "← Patern eğitimleri");
    label.textContent = item ? say(...item.tag) : current === "reference" ? say("Reference library", "Başvuru kütüphanesi") : current === "followUpModule" ? say("Oncology follow-up", "Onkolojik takip") : say("About & evidence", "Proje ve kanıtlar");
  }
  function show(name, focus = false, targetId) {
    current = name;
    Object.entries(screens).forEach(([key, elements]) => elements.forEach(el => { if (el) el.hidden = key !== name; }));
    document.body.dataset.studioView = name;
    document.querySelectorAll(".primary-links a").forEach(a => {
      const belongs = a.getAttribute("data-studio-nav") || (a.getAttribute("href") === "#about" ? "about" : "");
      const section = catalog.find(item => item.id === name)?.group || name;
      if (belongs === section) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    toolbar();
    if (focus) {
      const target = document.getElementById(targetId) || screens[name]?.find(Boolean);
      if (target) { target.tabIndex = -1; try { target.focus({ preventScroll: true }); } catch (error) { target.focus(); } target.scrollIntoView({ block: "start", behavior: "auto" }); }
    }
  }
  function navigate(hash, focus = true) {
    const name = route(hash), id = hash.replace(/^#/, ""), url = new URL(window.location.href);
    url.hash = hash;
    if (name !== "reference") url.searchParams.delete("condition");
    if (url.href !== window.location.href) window.history.pushState(window.history.state, "", url.href);
    show(name, focus, id === "mainContent" ? "studioHome" : id);
  }
  function initialize() {
    translate(); show(route(window.location.hash));
    // Capture reveals the destination before existing learning-path handlers open
    // a case, protocol or quiz and move focus into it.
    document.addEventListener("click", event => {
      if (event.button > 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest?.("a[href]"); if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      if (link.matches(".skip-link")) { event.preventDefault(); show(current, true, screens[current]?.find(Boolean)?.id); return; }
      const href = link.getAttribute("href"); if (!href || !href.startsWith("#")) return;
      const id = href.slice(1);
      if (!(screens[id] || ["mainContent", "studioHome", "pageTitle", "searchPanel", "patternExercise", "conditionsTitle", "cards", "details"].includes(id))) return;
      event.preventDefault(); navigate(href, !link.matches(".learning-path-link, .learning-path-launch"));
    }, true);
    document.addEventListener("keydown", event => {
      if (event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey && !["INPUT", "TEXTAREA", "SELECT"].includes(event.target?.tagName) && !event.target?.isContentEditable) navigate("#searchPanel", false);
    }, true);
    window.addEventListener("hashchange", () => show(route(window.location.hash), true, window.location.hash.slice(1)));
    window.addEventListener("popstate", () => show(route(window.location.hash), true, window.location.hash.slice(1)));
    const language = document.getElementById("docutisLanguage"); if (language) language.addEventListener("change", translate);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize); else initialize();
})();
