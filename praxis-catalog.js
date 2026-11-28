(function () {
  "use strict";

  const root = document.getElementById("praxisCatalogApp");
  const language = document.getElementById("praxisLanguage");
  const { chapters, handouts, mountChapter, mountOnlyHandout } = window.DOCUTIS_PRAXIS;
  const titlesTr = window.DOCUTIS_PRAXIS_TITLES_TR || { chapters: {}, conditions: {} };
  const diseases = new Map(window.DOCUTIS_DATA.diseases.map(disease => [disease.id, disease]));
  const params = new URLSearchParams(window.location.search);
  const chapterId = params.get("chapter");
  const handoutId = params.get("handout");
  const handoutList = params.get("view") === "handouts";
  let query = "";
  try { language.value = localStorage.getItem("docutis-language") === "en" ? "en" : "tr"; }
  catch (error) { language.value = "tr"; }

  const say = (en, tr) => language.value === "tr" ? tr : en;
  function localize() {
    document.documentElement.lang = language.value;
    document.getElementById("praxisLanguageLabel").textContent = say("Language", "Dil");
    document.getElementById("praxisSkipLink").textContent = say("Skip to content", "İçeriğe geç");
  }

  function add(parent, tag, value, className) {
    const node = document.createElement(tag);
    if (value) node.textContent = value;
    if (className) node.className = className;
    parent.appendChild(node);
    return node;
  }

  function link(parent, title, href, lang) {
    const a = add(parent, "a", title);
    a.href = href;
    if (lang) a.lang = lang;
    return a;
  }

  function normalize(text) {
    return text.toLowerCase().replace(/ß/g, "ss").replace(/ı/g, "i")
      .normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  }

  function showDirectory() {
    const entries = handoutList ? Object.entries(handouts).sort((a, b) =>
      parseInt(a[1].page, 10) - parseInt(b[1].page, 10)) : Object.entries(chapters);
    add(root, "h1", handoutList ? say("Turkish Patient Information", "Türkçe Hasta Bilgilendirme")
      : say("Praxis Catalogue", "Praxis Rehberi"));
    add(root, "p", handoutList
      ? say("Clinician previews. Distribution awaits physician review.", "Hekim önizlemeleri. Hasta dağıtımı için hekim onayı bekleniyor.")
      : say("Treatment considerations, red flags and sources for German dermatology practice.", "Almanya dermatoloji pratiği için tedavi değerlendirmeleri, kırmızı bayraklar ve kaynaklar."));
    const tabs = add(root, "nav", "", "praxis-catalog-tabs");
    tabs.setAttribute("aria-label", "Praxis");
    const chapterTab = link(tabs, say("Chapters", "Hastalıklar") + " · " + Object.keys(chapters).length, "praxis.html");
    const handoutTab = link(tabs, say("Patient Information", "Hasta Bilgilendirme") + " · " + Object.keys(handouts).length, "praxis.html?view=handouts");
    (handoutList ? handoutTab : chapterTab).setAttribute("aria-current", "page");

    const label = add(root, "label", say("Search in German or Turkish", "Tanı veya konu ara"), "praxis-search");
    const input = add(label, "input");
    input.type = "search";
    input.value = query;
    const status = add(root, "p", "", "praxis-source-note");
    status.setAttribute("role", "status");
    const list = add(root, "ul", "", "praxis-catalog-list");

    function update() {
      query = input.value;
      const terms = normalize(query).trim().split(/\s+/);
      const matches = entries.filter(([id, entry]) => {
        const text = normalize([id, entry.germanName, titlesTr.chapters[id] || "", entry.turkishName || entry.title, entry.group || ""].join(" "));
        return terms.every(term => text.includes(term));
      });
      status.textContent = matches.length + say(" results", " sonuç");
      list.replaceChildren();
      for (const [id, entry] of matches) {
        const item = add(list, "li");
        if (handoutList) {
          link(item, entry.title, "?handout=" + encodeURIComponent(id), "tr");
          if (language.value !== "tr") add(item, "span", entry.germanName).lang = "de";
        } else if (language.value === "tr") {
          link(item, titlesTr.chapters[id] || entry.turkishName, "?chapter=" + encodeURIComponent(id), "tr");
        } else {
          const a = link(item, entry.germanName, "?chapter=" + encodeURIComponent(id), "de");
          add(a, "span", entry.turkishName).lang = "tr";
        }
      }
    }

    input.addEventListener("input", update);
    update();
    if ((chapterId && !Object.hasOwn(chapters, chapterId)) || (handoutId && !Object.hasOwn(handouts, handoutId))) {
      add(root, "p", say("The requested entry was not found.", "İstenen kayıt bulunamadı."));
    }
  }

  function render() {
    localize();
    root.replaceChildren();
    if (chapterId && Object.hasOwn(chapters, chapterId)) {
      const chapter = chapters[chapterId];
      link(root, say("← All Praxis Chapters", "← Tüm Praxis Başlıkları"), "praxis.html");
      add(root, "h1", say(chapter.germanName, titlesTr.chapters[chapterId] || chapter.turkishName)).lang = say("de", "tr");
      if (chapter.conditions.length) {
        const links = add(root, "ul", "", "praxis-sources");
        links.setAttribute("aria-label", say("Related Docutis Reference Pages", "İlgili Docutis Tanı Sayfaları"));
        for (const id of chapter.conditions) {
          link(add(links, "li"), say(diseases.get(id).name, titlesTr.conditions[id] || diseases.get(id).name), "index.html?condition=" + encodeURIComponent(id) + "#detail-praxis", say("en", "tr"));
        }
      }
      mountChapter(root, chapterId);
    } else if (handoutId && Object.hasOwn(handouts, handoutId)) {
      link(root, say("← All Patient Notes", "← Tüm Hasta Notları"), "praxis.html?view=handouts");
      add(root, "h1", handouts[handoutId].title).lang = "tr";
      mountOnlyHandout(root, handoutId);
    } else {
      showDirectory();
    }
  }

  language.addEventListener("change", () => {
    try { localStorage.setItem("docutis-language", language.value); }
    catch (error) { /* Keep the selection for this page. */ }
    // Moving between languages preserves expanded sections.
    const open = [...root.querySelectorAll("details[open]")].map(item => item.dataset.note || "prescribing");
    render();
    for (const item of root.querySelectorAll("details")) {
      if (open.includes(item.dataset.note || "prescribing")) item.open = true;
    }
  });
  render();
})();
