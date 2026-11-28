/* Presentation navigation only: clinical data, module state and review decisions stay in their own apps. */
(function () {
  "use strict";
  const home = document.getElementById("studioHome");
  if (!home) return;
  const tr = () => document.documentElement.lang === "tr";
  const say = (en, turkish) => tr() ? turkish : en;
  const catalog = [
    { id: "trainingModule", group: "learn", alsoIn: ["patterns"], art: "mixed", title: ["One lesion at a time", "Her Seferinde Bir Lezyon"], description: ["Build an impression, open the available views, then compare with the source.", "İlk izlenimini seç, mevcut görüntüleri aç ve kaynakla karşılaştır."], tag: ["Mixed case practice", "Karma vaka çalışması"] },
    { id: "caseModule", group: "learn", alsoIn: ["patterns"], art: "library", title: ["The case collection", "Vaka Koleksiyonu"], description: ["Browse clinical cases or choose a guided skin cancer pathway.", "Klinik vakalara göz at veya yönlendirmeli deri kanseri serisini seç."], tag: ["Guided & independent", "Yönlendirmeli ve bağımsız"] },
    { id: "patternContextModule", group: "patterns", art: "pattern", title: ["Pattern and context", "Patern ve Bağlam"], description: ["Mark a dermoscopic finding and see how its significance changes with age, site and evolution.", "Dermoskopik bulguyu işaretle, anlamının yaşa, yerleşime ve değişim öyküsüne göre nasıl değiştiğini incele."], tag: ["Context in dermoscopy", "Dermoskopide bağlam"] },
    { id: "guidedPatternModule", group: "patterns", art: "pattern", title: ["Key patterns in real images", "Gerçek Görüntülerde Önemli Paternler"], description: ["Compare two dermoscopy images and locate the structure before revealing the diagnosis.", "İki dermoskopi görüntüsünü karşılaştır, yapıyı bul ve ardından kaynak tanısını aç."], tag: ["Guided pattern lessons", "Rehberli patern dersleri"] },
    { id: "mimicModule", group: "patterns", art: "compare", title: ["Mimics and diagnostic traps", "Taklitçiler ve Tanısal Tuzaklar"], description: ["Describe real dermoscopy images before comparing clinical views and checking the source diagnosis.", "Gerçek dermoskopi görüntülerini tarif et, klinik görüntüleri karşılaştır ve kaynak tanısını incele."], tag: ["Eight case comparisons", "Sekiz vaka karşılaştırması"] },
    { id: "contrastLabModule", group: "patterns", art: "compare", title: ["Early melanoma, close mimics", "Erken Melanom ve Yakın Taklitçileri"], description: ["Compare two lesions and look closer at the region that changed your impression.", "İki lezyonu karşılaştır; izlenimini değiştiren bölgeyi yakından incele."], tag: ["Side-by-side comparisons", "Yan yana karşılaştırma"] },
    { id: "pinkCaseModule", group: "patterns", art: "vessels", title: ["Beyond pigment", "Pigmentin Ötesinde"], description: ["Explore vessels and white structures in pink lesions, then add the clinical story.", "Pembe lezyonlarda damarları ve beyaz yapıları incele; ardından klinik öyküyü ekle."], tag: ["Pink lesions", "Pembe lezyonlar"] },
    { id: "subtleClueModule", group: "patterns", art: "clues", title: ["The subtle clue", "Silik İpucunu Fark Et"], description: ["Find a structure, mark its location and compare with a close mimic.", "Yapıyı bul, yerini işaretle ve yakın taklitçisiyle karşılaştır."], tag: ["Clues & counterexamples", "İpuçları ve karşı örnekler"] },
    { id: "patternModule", target: "patternExercise", group: "patterns", art: "pattern", title: ["Start with what you see", "Önce Gördüğünü Tarif Et"], description: ["Work through structures and vessel patterns before opening the diagnosis.", "Tanıyı açmadan önce yapıları ve damar paternlerini çalış."], tag: ["Pattern foundations", "Patern temelleri"] },
    { id: "inflammatoryCaseModule", group: "learn", art: "clues", title: ["Inflammatory and paediatric cases", "İnflamatuvar ve Pediatrik Vakalar"], description: ["Compare morphology and distribution in three short practice cases.", "Üç kısa vakada morfoloji ve dağılımı karşılaştır."], tag: ["Clinical reasoning", "Klinik akıl yürütme"] },
    { id: "quizModule", group: "learn", alsoIn: ["patterns"], art: "quiz", title: ["A short knowledge check", "Kısa Bir Bilgi Çalışması"], description: ["Review morphology and clinical reasoning across inflammatory, acneiform, infectious and skin-cancer examples.", "İnflamatuvar, akneiform, enfeksiyöz ve deri kanseri örneklerinde morfoloji ve klinik akıl yürütmeyi tekrar et."], tag: ["Cross-condition quiz", "Farklı tanılardan kısa test"] }
  ];
  const reference = document.querySelector(".reference-library");
  const screens = { home: [home], learn: [document.getElementById("learn")], patterns: [document.getElementById("patterns")], reference: [document.getElementById("searchPanel"), reference] };
  [...catalog.map(item => item.id), "followUpModule", "evidenceStatus", "about", "nachsorgeModule"].forEach(id => { screens[id] = [document.getElementById(id)]; });
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
      const title = node("h2", group === "learn" ? say("Clinical cases", "Klinik Vakalar") : say("Dermoscopy patterns", "Dermoskopi Paternleri"), hub); title.tabIndex = -1;
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
      [["followUpModule", "Oncology follow-up", "Onkolojik Takip"], ["evidenceStatus", "Review status & sources", "İnceleme Durumu ve Kaynaklar"]].forEach(([id, en, turkish]) => { const a = node("a", say(en, turkish) + " →", utility); a.href = "#" + id; });
    });
  }
  function route(hash) {
    const id = String(hash || "").replace(/^#/, "");
    if ((id === "" || id === "nachsorgeModule") && new URL(window.location.href).searchParams.has("nachsorge")) return "nachsorgeModule";
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
    back.textContent = group === "home" ? say("← Home", "← Ana Sayfa") : group === "learn" ? say("← Case studio", "← Vaka Eğitimleri") : say("← Pattern studio", "← Patern Eğitimleri");
    label.textContent = item ? say(...item.tag) : current === "reference" ? say("Reference library", "Tanı Rehberi") : current === "nachsorgeModule" ? say("Follow-up (Nachsorge)", "Tümör Takibi") : current === "followUpModule" ? say("Oncology follow-up", "Onkolojik Takip") : say("About & evidence", "Proje ve Kanıtlar");
    if (current === "nachsorgeModule") document.title = say("Follow-up (Nachsorge) | Docutis", "Tümör Takibi | Docutis");
    else if (/^(?:Follow-up \(Nachsorge\)|Tümör Takibi) \| Docutis$/.test(document.title)) document.title = say("Docutis | Dermatology Reference Toolkit", "Docutis | Dermatoloji Eğitim ve Başvuru Kaynağı");
  }
  const caseViews = new Set(["patternContextModule", "caseModule", "trainingModule", "guidedPatternModule", "mimicModule", "contrastLabModule", "pinkCaseModule", "subtleClueModule", "patternModule"]);
  let loadedCaseViews = false;
  function prepareCaseScreen(screen) {
    if (!screen || loadedCaseViews || !window.DOCUTIS_LOAD_CASES || screen.querySelector(".studio-case-loading")) return;
    const status = node("div", "", screen, "studio-case-loading");
    status.setAttribute("role", "status");
    const load = () => {
      status.textContent = say("Loading case exercises…", "Vaka eğitimleri yükleniyor…");
      window.DOCUTIS_LOAD_CASES().then(() => {
        loadedCaseViews = true;
        status.remove();
      }, () => {
        status.textContent = say("The case exercises could not load.", "Vaka eğitimleri yüklenemedi.");
        const retry = node("button", say("Retry", "Tekrar dene"), status, "filter-button");
        retry.type = "button";
        retry.addEventListener("click", load);
      });
    };
    load();
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
    if (caseViews.has(name)) prepareCaseScreen(screens[name]?.[0]);
    if (focus) {
      const target = document.getElementById(targetId) || screens[name]?.find(Boolean);
      if (target) { target.tabIndex = -1; try { target.focus({ preventScroll: true }); } catch (error) { target.focus(); } target.scrollIntoView({ block: "start", behavior: "auto" }); }
    }
  }
  function navigate(hash, focus = true) {
    const name = route(hash), id = hash.replace(/^#/, ""), url = new URL(window.location.href);
    url.hash = hash;
    if (name !== "reference") url.searchParams.delete("condition");
    if (name !== "nachsorgeModule") url.searchParams.delete("nachsorge");
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
