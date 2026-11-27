(function () {
  "use strict";
  const root = document.getElementById("subtleClueApp");
  const lessons = window.DOCUTIS_SUBTLE_CLUES;
  const collection = window.DOCUTIS_CASES;
  if (!root || !lessons || !collection) return;
  const byId = new Map(collection.cases.map(item => [item.id, item]));
  let active = 0;
  let answers = ["", ""];
  let revealed = false;
  const pairImages = lesson => lesson.cases.map(id => {
    const record = byId.get(id);
    if (!record) return null;
    return {
      record,
      dermoscopy: record.images.find(image => image.type === "dermoscopy"),
      clinical: record.images.find(image => image.type === "clinical")
    };
  });
  const available = lessons.filter(lesson => pairImages(lesson).every(item => item && (item.dermoscopy || item.clinical) && item.record.diagnosticGroundTruth));
  if (!available.length) return;
  const language = () => document.documentElement.lang === "tr" ? "tr" : "en";
  const say = (en, tr) => language() === "tr" ? tr : en;
  const label = value => value[language()];
  function node(tag, content, className) {
    const el = document.createElement(tag);
    if (content !== undefined) el.textContent = content;
    if (className) el.className = className;
    return el;
  }
  function image(parent, item, kind) {
    const asset = item[kind];
    if (!asset) return;
    const figure = node("figure");
    const photo = node("img");
    photo.src = asset.src;
    photo.alt = asset.alt;
    photo.width = asset.dimensions.width;
    photo.height = asset.dimensions.height;
    photo.loading = "lazy";
    figure.appendChild(photo);
    const caption = node("figcaption", kind === "dermoscopy" ? say("Dermoscopy", "Dermoskopi") : say("Clinical view", "Klinik görünüm"));
    caption.appendChild(document.createTextNode(" · " + asset.creator + " · "));
    const license = node("a", asset.license);
    license.href = asset.licenseUrl;
    license.target = "_blank";
    license.rel = "noopener noreferrer";
    caption.appendChild(license);
    figure.appendChild(caption);
    parent.appendChild(figure);
  }
  function render() {
    root.replaceChildren();
    const module = document.getElementById("subtleClueModule");
    module.querySelector(".eyebrow").textContent = say("Contrastive image practice", "Karşılaştırmalı görsel çalışması");
    module.querySelector("#subtleClueTitle").textContent = say("Subtle clues and close mimics", "Silik ipuçları ve yakın taklitçiler");
    module.querySelector(".module-badge").textContent = say("Clinician review required", "Hekim incelemesi gerekli");
    module.querySelector(":scope > p").textContent = say(
      "Choose what is visible in two source-linked cases, then reveal the recorded diagnoses and the limits of that comparison. Educational preview only; no individual lesion decision or score.",
      "Kaynağı belirtilen iki vakada neyin görüldüğünü seçin, ardından kayıtlı tanıları ve karşılaştırmanın sınırlarını açın. Yalnızca eğitim önizlemesidir; tekil lezyon kararı veya puanlama içermez."
    );
    const heroLink = document.querySelector('a[href="#subtleClueModule"]');
    if (heroLink) heroLink.textContent = say("Practise subtle clues", "Silik ipuçlarını çalış");
    const concept = node("aside", undefined, "subtle-concept");
    concept.appendChild(node("h3", say("One clue: name it before weighing it", "Tek ipucu: ağırlığını tartmadan önce adlandırın")));
    concept.appendChild(node("p", say(
      "A missing pigment network is not a negative network. A negative network is a visible pattern of widened pale interconnecting lines around pigmented structures. Shiny white lines are a separate polarized-light finding; they can occur in benign and malignant lesions. Neither sign alone establishes melanoma in situ.",
      "Pigment ağının görülmemesi, negatif ağ demek değildir. Negatif ağ, pigmentli yapıları çevreleyen genişlemiş açık renkli bağlantılı çizgilerin görüldüğü paterndir. Parlak beyaz çizgiler ise polarize ışıkta görülen ayrı bir bulgudur; benign ve malign lezyonlarda bulunabilir. İkisi de tek başına melanoma in situ tanısı koydurmaz."
    )));
    const references = node("p");
    [
      ["IDS terminology", "https://pmc.ncbi.nlm.nih.gov/articles/PMC5551974/"],
      ["Melanoma in situ study", "https://jamanetwork.com/journals/jamadermatology/fullarticle/2672396"],
      ["White structures study", "https://pubmed.ncbi.nlm.nih.gov/22035217/"]
    ].forEach((entry, index) => {
      if (index) references.appendChild(document.createTextNode(" · "));
      const link = node("a", entry[0]);
      link.href = entry[1];
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      references.appendChild(link);
    });
    concept.appendChild(references);
    root.appendChild(concept);
    const lesson = available[active];
    const entries = pairImages(lesson);
    const nav = node("div", undefined, "subtle-nav");
    available.forEach((item, index) => {
      const button = node("button", label(item.title), "subtle-button");
      button.type = "button";
      button.setAttribute("aria-current", index === active ? "step" : "false");
      button.addEventListener("click", () => {
        active = index;
        answers = ["", ""];
        revealed = false;
        render();
        root.querySelector("h3").focus();
      });
      nav.appendChild(button);
    });
    root.appendChild(nav);
    const heading = node("h3", label(lesson.title));
    heading.tabIndex = -1;
    root.appendChild(heading);
    root.appendChild(node("p", label(lesson.question)));
    const grid = node("div", undefined, "subtle-grid");
    entries.forEach((entry, index) => {
      const panel = node("section", undefined, "subtle-panel");
      panel.appendChild(node("h4", say("Image ", "Görsel ") + (index + 1)));
      // The image order is fixed within a pair, but the diagnosis remains hidden until reveal.
      if (entry.clinical) image(panel, entry, "clinical");
      if (entry.dermoscopy) image(panel, entry, "dermoscopy");
      const fieldset = node("fieldset");
      fieldset.appendChild(node("legend", say("Most useful observation", "En yararlı gözlem")));
      lesson.options.forEach((option, choice) => {
        const wrapper = node("label", undefined, "subtle-option");
        const radio = node("input");
        radio.type = "radio";
        radio.name = lesson.id + "-" + index;
        radio.value = String(choice);
        radio.checked = answers[index] === String(choice);
        radio.disabled = revealed;
        radio.addEventListener("change", () => {
          answers[index] = radio.value;
          // Keep both selections in place; a reveal button is always explicit.
          const revealButton = root.querySelector(".subtle-reveal-button");
          if (revealButton) revealButton.disabled = answers.some(value => value === "");
        });
        wrapper.appendChild(radio);
        wrapper.appendChild(node("span", label(option)));
        fieldset.appendChild(wrapper);
      });
      panel.appendChild(fieldset);
      if (revealed) {
        const answer = node("div", undefined, "subtle-answer");
        answer.appendChild(node("p", say("Source diagnosis: ", "Kaynak tanısı: ") + entry.record.diagnosticGroundTruth.confirmedDiagnosis));
        answer.appendChild(node("p", say("Useful observation: ", "Yararlı gözlem: ") + label(lesson.options[lesson.expected[index]])));
        answer.appendChild(node("p", answers[index] === String(lesson.expected[index])
          ? say("Your selection matches this observation.", "Seçiminiz bu gözlemle örtüşüyor.")
          : say("Compare your selection with the recorded observation. An image may still need closer assessment.", "Seçiminizi kayıtlı gözlemle karşılaştırın. Görsel yine de daha yakından değerlendirme gerektirebilir.")));
        const link = node("a", say("Original case source", "Özgün vaka kaynağı"));
        link.href = (entry.dermoscopy || entry.clinical).sourceUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        answer.appendChild(link);
        panel.appendChild(answer);
      }
      grid.appendChild(panel);
    });
    root.appendChild(grid);
    if (!revealed) {
      const reveal = node("button", say("Reveal and compare", "Tanıları aç ve karşılaştır"), "subtle-button subtle-reveal-button");
      reveal.type = "button";
      reveal.disabled = answers.some(value => value === "");
      reveal.addEventListener("click", () => { revealed = true; render(); root.querySelector(".subtle-comparison").focus(); });
      root.appendChild(reveal);
    } else {
      const result = node("section", undefined, "subtle-comparison");
      result.tabIndex = -1;
      result.appendChild(node("h4", say("What the pair teaches", "Bu ikilinin öğrettiği")));
      result.appendChild(node("p", label(lesson.comparison)));
      result.appendChild(node("p", label(lesson.limit), "subtle-limit"));
      root.appendChild(result);
    }
  }
  render();
  const languageControl = document.getElementById("docutisLanguage");
  if (languageControl) languageControl.addEventListener("change", render);
})();
