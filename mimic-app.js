(function () {
  "use strict";
  const root = document.getElementById("mimicApp");
  const lessons = window.DOCUTIS_MIMICS;
  if (!root || !lessons?.length) return;

  const terms = [
    ["Lines / network", "Çizgiler / ağ", "Linien / Netz"],
    ["Dots / globules", "Noktalar / globüller", "Punkte / Globuli"],
    ["Circles", "Halkalar", "Kreise"],
    ["Pseudopods", "Psödopodlar", "Pseudopodien"],
    ["Structureless areas", "Yapısız alanlar", "Strukturlose Areale"],
    ["Vessels", "Damarlar", "Gefäße"],
    ["Scale / crust", "Skuam / krut", "Schuppen / Krusten"],
    ["Cannot assess", "Değerlendiremiyorum", "Nicht beurteilbar"]
  ];
  const distribution = [
    ["Predominantly central", "Ağırlıklı olarak merkezde"], ["Predominantly peripheral", "Ağırlıklı olarak periferde"],
    ["Focal or segmental", "Odaksal veya segmental"], ["Throughout the lesion", "Lezyon genelinde"], terms[7]
  ];
  const symmetry = [
    ["Similar on both sides", "İki tarafta benzer"],
    ["Asymmetric in colour or structure", "Renk veya yapı dağılımı asimetrik"],
    terms[7]
  ];
  const uncertainty = ["Uncertain", "Kararsızım"];
  let lesson, sides, responses, stage, focusTarget;
  const local = pair => pair[document.documentElement.lang === "tr" ? 1 : 0];
  const t = (en, tr) => local([en, tr]);

  function add(parent, tag, content, className) {
    const node = document.createElement(tag);
    if (content) node.textContent = content;
    if (className) node.className = className;
    parent.appendChild(node);
    return node;
  }

  function button(parent, text, action) {
    const node = add(parent, "button", text, "subtle-button");
    node.type = "button";
    node.addEventListener("click", action);
    return node;
  }

  function pick(parent, title, options, value, save) {
    const label = add(parent, "label", title, "subtle-field");
    const select = add(label, "select");
    add(select, "option", t("Choose", "Seçin")).value = "";
    options.forEach((pair, index) => { add(select, "option", local(pair)).value = String(index); });
    select.required = true;
    select.value = value ?? "";
    select.addEventListener("change", () => save(select.value));
  }

  function photo(parent, image, title) {
    const figure = add(parent, "figure", null, "mimic-photo");
    const img = add(figure, "img");
    img.alt = title;
    img.src = image.src;
    img.width = image.dimensions.width;
    img.height = image.dimensions.height;
    img.addEventListener("error", () => {
      img.hidden = true;
      add(figure, "p", t("Image unavailable", "Görsel yüklenemedi"), "mimic-note");
    }, { once: true });
    const credit = add(figure, "figcaption", image.creator + " · ");
    link(credit, image.license, image.licenseUrl);
  }

  function link(parent, label, url) {
    const anchor = add(parent, "a", label);
    anchor.href = url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
  }

  function changeStage(value) {
    stage = value;
    render();
    focusTarget.focus();
  }

  function start(item) {
    lesson = item;
    sides = Math.random() < .5 ? [...item.sides].reverse() : [...item.sides];
    responses = [{}, {}];
    changeStage(1);
  }

  function glossary() {
    const details = add(root, "details", null, "mimic-glossary");
    add(details, "summary", t("Pattern terminology · TR / EN / DE", "Patern terminolojisi · TR / EN"));
    const search = add(details, "input");
    search.type = "search";
    search.setAttribute("aria-label", t("Filter terms", "Terimleri filtrele"));
    search.placeholder = t("Filter terms", "Terimleri filtrele");
    const list = add(details, "ul");
    const rows = terms.slice(0, -1).map(term => add(list, "li", (document.documentElement.lang === "tr" ? [term[1], term[0]] : [term[1], term[0], term[2]]).join(" · ")));
    search.addEventListener("input", () => {
      const needle = search.value.trim().toLocaleLowerCase();
      rows.forEach(row => { row.hidden = !row.textContent.toLocaleLowerCase().includes(needle); });
    });
  }

  function render() {
    root.replaceChildren();
    const title = add(root, "h3", lesson ? local(lesson.topic) : t("Mimics and Diagnostic Traps", "Taklitçiler ve Tanısal Tuzaklar"));
    title.tabIndex = -1;
    focusTarget = title;
    add(root, "p", t("Educational draft · clinician review required", "Eğitim taslağı · hekim incelemesi gerekli"), "mimic-note");
    if (!lesson) {
      add(root, "p", t("Choose two lesions to compare. Describe the dermoscopy, then open the clinical views and build a differential.", "Karşılaştırmak istediğin konuyu seç. Dermoskopiyi tarif et, ardından klinik görüntüleri aç ve ayırıcı tanını oluştur."));
      const themes = add(root, "div", null, "mimic-topics");
      lessons.forEach(item => button(themes, local(item.topic), () => start(item)));
      glossary();
      return;
    }

    const form = add(root, "form");
    const stages = [
      t("1 / 3 · Describe the structures and their distribution", "1 / 3 · Yapıları ve dağılımlarını tarif et"),
      t("2 / 3 · Compare with the clinical view and choose a leading diagnosis", "2 / 3 · Klinik görüntüyle karşılaştır ve ön tanını seç"),
      t("3 / 3 · Review the source diagnoses", "3 / 3 · Kaynak tanılarını incele")
    ];
    add(form, "h4", stages[stage - 1]);
    const panels = add(form, "div", null, "mimic-panels");
    const diagnoses = lesson.sides.map(side => side.label).concat([uncertainty]);
    sides.forEach((side, index) => {
      const panel = add(panels, "section", null, "mimic-panel");
      const label = t("Lesion ", "Lezyon ") + (index === 0 ? "A" : "B");
      const answer = responses[index];
      add(panel, "h5", label);
      photo(panel, side.dermoscopy, label + " · " + t("Dermoscopy", "Dermoskopi"));
      if (stage === 1) {
        pick(panel, t("Most visible structure", "En belirgin yapı"), terms, answer.structure, value => { answer.structure = value; });
        pick(panel, t("Distribution", "Dağılım"), distribution, answer.distribution, value => { answer.distribution = value; });
        pick(panel, t("Colour and structure symmetry", "Renk ve yapı simetrisi"), symmetry, answer.symmetry, value => { answer.symmetry = value; });
      } else {
        photo(panel, side.clinical, label + " · " + t("Clinical photograph", "Klinik fotoğraf"));
        add(panel, "p", t("Your observation", "Gözlemin") + " · " + [local(terms[answer.structure]), local(distribution[answer.distribution]), local(symmetry[answer.symmetry])].join(" / "), "mimic-note");
        if (stage === 2) {
          pick(panel, t("Leading diagnosis", "Ön tanı"), diagnoses, answer.diagnosis, value => { answer.diagnosis = value; });
        } else {
          add(panel, "p", t("Your choice", "Seçimin") + " · " + local(diagnoses[answer.diagnosis]));
          add(panel, "p", t("Diagnosis reported by the source", "Kaynağın bildirdiği tanı") + " · " + local(side.label), "mimic-result");
          link(panel, t("Open publication", "Yayını aç"), side.source);
          for (const asset of [side.dermoscopy, side.clinical]) {
            if (asset.attribution) add(panel, "p", asset.attribution, "mimic-note");
          }
        }
      }
    });

    if (stage < 3) {
      const next = add(form, "button", stage === 1 ? t("Open clinical views", "Klinik görüntüleri aç") : t("Reveal source diagnoses", "Kaynak tanılarını aç"), "subtle-button mimic-next");
      next.type = "submit";
      form.addEventListener("submit", event => {
        event.preventDefault();
        const required = stage === 1 ? ["structure", "distribution", "symmetry"] : ["diagnosis"];
        if (responses.every(answer => required.every(key => answer[key] != null && answer[key] !== ""))) changeStage(stage + 1);
      });
    } else {
      const review = add(root, "div", null, "mimic-review");
      add(review, "h4", t("Diagnostic trap", "Tanısal Tuzak"));
      add(review, "p", local(lesson.trap));
      add(review, "h4", t("What to compare and how the source verified it", "Neyi Karşılaştırmalı? Kaynak Sonucu Nasıl Doğruladı?"));
      add(review, "p", local(lesson.review));
      if (["network", "face", "acral", "blood"].includes(lesson.id)) {
        add(review, "h4", t("Pattern Analysis and Chaos and Clues", "Patern Analizi ve Chaos and Clues"));
        add(review, "p", t("Review your structure and distribution choices first. Then compare your symmetry choice with the clue described above. Which did more to shape your differential in this pair?", "Önce yapı ve dağılım seçimlerini gözden geçir. Ardından simetri seçimini yukarıdaki ipucuyla karşılaştır. Bu çiftte hangisi ayırıcı tanını daha çok etkiledi?"));
        link(review, "Rosendahl et al. · Diagnostic accuracy of dermatoscopy", "https://pubmed.ncbi.nlm.nih.gov/21440329/");
      }
      button(root, t("Repeat this pair", "Bu çifti yeniden çalış"), () => start(lesson));
    }
    button(root, t("Choose another topic", "Başka bir konu seç"), () => { lesson = null; changeStage(0); });
  }

  function initialize() {
    render();
    document.getElementById("docutisLanguage")?.addEventListener("change", render);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize);
  else initialize();
}());
