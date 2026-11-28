(function () {
  "use strict";
  const root = document.getElementById("subtleClueApp");
  const lessons = window.DOCUTIS_SUBTLE_CLUES;
  const collection = window.DOCUTIS_CASES;
  if (!root || !lessons || !collection) return;
  const byId = new Map([...collection.cases, ...(window.DOCUTIS_EARLY_CASES || [])].map(item => [item.id, item]));
  let active = 0;
  let reversed = Math.random() < 0.5;
  let reflection = "";
  const blankAnswers = () => [{ choice: "", visibility: "", position: null }, { choice: "", visibility: "", position: null }];
  let answers = blankAnswers();
  let revealed = false;
  let comparisonOpen = false;
  const revisitKey = "docutis-subtle-revisit-v1";
  let revisit = [];
  try {
    const saved = JSON.parse(window.localStorage.getItem(revisitKey) || "[]");
    if (Array.isArray(saved)) revisit = saved.filter(id => lessons.some(lesson => lesson.id === id));
  } catch (error) { /* Continue with a tab-only list if storage is unavailable. */ }
  let storageAvailable = true;
  function saveRevisit() {
    try { window.localStorage.setItem(revisitKey, JSON.stringify(revisit)); }
    catch (error) { storageAvailable = false; }
  }
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
    photo.addEventListener("error", () => {
      photo.hidden = true;
      figure.appendChild(node("p", say("Image unavailable. Select Cannot assess or choose another comparison.", "Görsel yüklenemedi. Değerlendirilemiyor seçin veya başka karşılaştırma açın.")));
    });
    const frame = node("div", undefined, "subtle-image-frame");
    frame.appendChild(photo);
    const mark = node("span", String(parent.dataset.imageNumber || ""), "subtle-image-mark");
    mark.setAttribute("aria-hidden", "true");
    mark.hidden = true;
    frame.appendChild(mark);
    figure.appendChild(frame);
    const caption = node("figcaption", kind === "dermoscopy" ? say("Dermoscopy", "Dermoskopi") : say("Clinical view", "Klinik görünüm"));
    caption.appendChild(document.createTextNode(" · " + asset.creator + " · "));
    const license = node("a", asset.license);
    license.href = asset.licenseUrl;
    license.target = "_blank";
    license.rel = "noopener noreferrer";
    caption.appendChild(license);
    if (asset.modificationStatus === "cropped" || asset.modificationStatus === "reencoded") {
      caption.appendChild(document.createTextNode(say(" · cropped/re-encoded", " · kırpıldı/yeniden kodlandı")));
    }
    figure.appendChild(caption);
    parent.appendChild(figure);
    return { photo, mark };
  }
  const regions = [
    ["Upper left", "Sol üst", 17, 17], ["Upper centre", "Üst orta", 50, 17], ["Upper right", "Sağ üst", 83, 17],
    ["Middle left", "Sol orta", 17, 50], ["Centre", "Merkez", 50, 50], ["Middle right", "Sağ orta", 83, 50],
    ["Lower left", "Sol alt", 17, 83], ["Lower centre", "Alt orta", 50, 83], ["Lower right", "Sağ alt", 83, 83]
  ];
  function ready() {
    return answers.slice(0, comparisonOpen ? 2 : 1).every(answer => answer.choice !== "" && answer.visibility !== "" &&
      (answer.visibility === "unassessable" || answer.position !== null));
  }
  function updateReveal() {
    const button = root.querySelector(".subtle-reveal-button");
    if (button) button.disabled = !ready();
  }
  function render() {
    root.replaceChildren();
    const module = document.getElementById("subtleClueModule");
    module.querySelector(".eyebrow").textContent = say("Contrastive image practice", "Karşılaştırmalı görsel çalışması");
    module.querySelector("#subtleClueTitle").textContent = say("Subtle Clues and Close Mimics", "Silik İpuçları ve Yakın Taklitçiler");
    module.querySelector(".module-badge").textContent = say("Clinician review required", "Hekim incelemesi gerekli");
    module.querySelector(":scope > p").textContent = say(
      "Choose what is visible in two source-linked cases, then reveal the recorded diagnoses and the limits of that comparison. Educational preview only; no individual lesion decision or score.",
      "Kaynağı belirtilen iki vakada neyin görüldüğünü seçin, ardından kayıtlı tanıları ve karşılaştırmanın sınırlarını açın. Yalnızca eğitim önizlemesidir; tekil lezyon kararı veya puanlama içermez."
    );
    const heroLink = document.querySelector('a[href="#subtleClueModule"]');
    if (heroLink) heroLink.textContent = say("Practise subtle clues", "Silik ipuçlarını çalış");
    const concept = node("aside", undefined, "subtle-concept");
    concept.appendChild(node("h3", say("One clue: name it before weighing it", "Tek İpucu: Ağırlığını Tartmadan Önce Adlandırın")));
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
    if (window.DOCUTIS_EARLY_SOURCES) {
      const sources = node("details", undefined, "subtle-concept");
      sources.appendChild(node("summary", say("Ten checked publications · four supply new images", "Kontrol edilen on yayın · dördünden yeni görseller")));
      const list = node("ul");
      window.DOCUTIS_EARLY_SOURCES.forEach(source => {
        const item = node("li");
        const link = node("a", source.authors + " — " + source.title);
        link.href = source.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        item.appendChild(link);
        item.appendChild(document.createTextNode(source.role === "image"
          ? say(" · image source", " · görsel kaynağı")
          : say(" · further reading; no images imported", " · ek okuma; görselleri aktarılmadı")));
        list.appendChild(item);
      });
      sources.appendChild(list);
      root.appendChild(sources);
    }
    const lesson = available[active];
    const entries = pairImages(lesson);
    const expected = [...lesson.expected];
    if (reversed) { entries.reverse(); expected.reverse(); }
    const nav = node("div", undefined, "subtle-nav");
    available.forEach((item, index) => {
      const button = node("button", say("Comparison ", "Karşılaştırma ") + (index + 1), "subtle-button");
      button.type = "button";
      button.setAttribute("aria-current", index === active ? "step" : "false");
      button.addEventListener("click", () => {
        active = index;
        answers = blankAnswers();
        reversed = Math.random() < 0.5;
        reflection = "";
        revealed = false;
        comparisonOpen = false;
        render();
        root.querySelectorAll("h3")[1].focus();
      });
      nav.appendChild(button);
    });
    root.appendChild(nav);
    const repeat = node("section", undefined, "subtle-concept");
    repeat.appendChild(node("h4", say("Your revisit list", "Tekrar Listeniz")));
    repeat.appendChild(node("p", say(
      "Choose the comparisons you want to practise again. This list stays in this browser; it is not a competence score.",
      "Yeniden çalışmak istediğiniz karşılaştırmaları seçin. Liste bu tarayıcıda tutulur; yetkinlik puanı değildir."
    )));
    const pending = available.filter(item => revisit.includes(item.id));
    repeat.appendChild(node("p", pending.length
      ? pending.map(item => label(item.title)).join(" · ")
      : say("No comparisons saved yet.", "Henüz karşılaştırma eklenmedi.")));
    if (!storageAvailable) repeat.appendChild(node("p", say("Storage unavailable: the list lasts for this tab only.", "Depolama kullanılamıyor: liste yalnızca bu sekmede kalır.")));
    if (pending.length) {
      const start = node("button", say("Practise a saved comparison", "Listedeki karşılaştırmayı çalış"), "subtle-button");
      start.type = "button";
      start.addEventListener("click", () => {
        const next = pending.find(item => item.id !== available[active].id) || pending[0];
        active = available.indexOf(next);
        answers = blankAnswers();
        reversed = Math.random() < 0.5;
        reflection = "";
        revealed = false;
        comparisonOpen = false;
        render();
        root.querySelectorAll("h3")[1].focus();
      });
      repeat.appendChild(start);
      const clear = node("button", say("Clear revisit list", "Tekrar listesini temizle"), "subtle-button");
      clear.type = "button";
      clear.addEventListener("click", () => { revisit = []; saveRevisit(); render(); });
      repeat.appendChild(clear);
    }
    root.appendChild(repeat);
    const heading = node("h3", comparisonOpen ? label(lesson.title) : say("Independent observation", "Bağımsız Gözlem"));
    heading.tabIndex = -1;
    root.appendChild(heading);
    if (entries.some(entry => entry.record.provenance)) {
      root.appendChild(node("p", say(
        "Source-image practice: published arrows and labels may give hints. These examples are curated and do not represent screening prevalence.",
        "Kaynak görsel çalışması: yayımlanmış ok ve etiketler ipucu verebilir. Bu seçilmiş örnekler tarama sıklıklarını temsil etmez."
      ), "subtle-limit"));
    }
    root.appendChild(node("p", comparisonOpen ? label(lesson.question) : say("Assess this lesion before opening its comparison. Choose a finding, visibility and location.", "Karşılaştırmayı açmadan bu lezyonu değerlendirin. Bulgu, görülebilirlik ve konum seçin.")));
    const grid = node("div", undefined, "subtle-grid");
    entries.slice(0, comparisonOpen ? 2 : 1).forEach((entry, index) => {
      const panel = node("section", undefined, "subtle-panel");
      panel.dataset.imageNumber = String(index + 1);
      panel.appendChild(node("h4", say("Image ", "Görsel ") + (index + 1)));
      // The image order is fixed within a pair, but the diagnosis remains hidden until reveal.
      if (entry.clinical) image(panel, entry, "clinical");
      const target = entry.dermoscopy ? image(panel, entry, "dermoscopy") : panel.querySelector(".subtle-image-frame") && {
        photo: panel.querySelector(".subtle-image-frame img"),
        mark: panel.querySelector(".subtle-image-mark")
      };
      const answerState = answers[index];
      function showMark() {
        if (!target) return;
        target.mark.hidden = answerState.position === null;
        if (answerState.position) {
          target.mark.style.left = answerState.position[0] + "%";
          target.mark.style.top = answerState.position[1] + "%";
        }
      }
      showMark();
      const fieldset = node("fieldset");
      fieldset.appendChild(node("legend", say("Most useful observation", "En yararlı gözlem")));
      lesson.options.forEach((option, choice) => {
        const wrapper = node("label", undefined, "subtle-option");
        const radio = node("input");
        radio.type = "radio";
        radio.name = lesson.id + "-" + index;
        radio.value = String(choice);
        radio.checked = answerState.choice === String(choice);
        radio.disabled = revealed;
        radio.addEventListener("change", () => {
          answerState.choice = radio.value;
          updateReveal();
        });
        wrapper.appendChild(radio);
        wrapper.appendChild(node("span", label(option)));
        fieldset.appendChild(wrapper);
      });
      panel.appendChild(fieldset);
      const certaintyLabel = node("label", say("Visibility of your chosen finding", "Seçtiğiniz bulgunun görülebilirliği"), "subtle-field");
      const certainty = node("select");
      const certaintyOptions = [
        ["", say("Choose visibility", "Görülebilirliği seç")],
        ["clear", say("Clear", "Net")],
        ["possible", say("Possible", "Olası")],
        ["unassessable", say("Cannot assess", "Değerlendirilemiyor")]
      ];
      certaintyOptions.forEach(([value, text]) => {
        const option = node("option", text);
        option.value = value;
        certainty.appendChild(option);
      });
      certainty.value = answerState.visibility;
      certainty.disabled = revealed;
      certainty.addEventListener("change", () => {
        answerState.visibility = certainty.value;
        if (certainty.value === "unassessable") answerState.position = null;
        showMark();
        region.disabled = certainty.value === "unassessable";
        if (certainty.value === "unassessable") region.value = "";
        updateReveal();
      });
      certaintyLabel.appendChild(certainty);
      panel.appendChild(certaintyLabel);
      const regionLabel = node("label", say("Mark a region (or tap the image)", "Bir bölge işaretleyin (veya görsele dokunun)"), "subtle-field");
      const region = node("select");
      const prompt = node("option", say("Choose a region", "Bir bölge seçin"));
      prompt.value = "";
      region.appendChild(prompt);
      regions.forEach((item, n) => {
        const option = node("option", language() === "tr" ? item[1] : item[0]);
        option.value = String(n);
        region.appendChild(option);
      });
      const tapped = node("option", say("Point selected on image", "Görselde seçilen nokta"));
      tapped.value = "point";
      tapped.disabled = true;
      region.appendChild(tapped);
      if (answerState.position) {
        const exact = regions.findIndex(item => item[2] === answerState.position[0] && item[3] === answerState.position[1]);
        if (exact >= 0) region.value = String(exact);
        else { tapped.disabled = false; region.value = "point"; }
      }
      region.disabled = revealed || answerState.visibility === "unassessable";
      region.addEventListener("change", () => {
        if (region.value === "") answerState.position = null;
        else {
          const item = regions[Number(region.value)];
          answerState.position = [item[2], item[3]];
        }
        showMark();
        updateReveal();
      });
      regionLabel.appendChild(region);
      panel.appendChild(regionLabel);
      if (target && !revealed) {
        target.photo.classList.add("subtle-markable");
        target.photo.addEventListener("click", event => {
          if (answerState.visibility === "unassessable") return;
          const bounds = target.photo.getBoundingClientRect();
          if (!bounds.width || !bounds.height) return;
          answerState.position = [
            Math.max(0, Math.min(100, Math.round((event.clientX - bounds.left) * 100 / bounds.width))),
            Math.max(0, Math.min(100, Math.round((event.clientY - bounds.top) * 100 / bounds.height)))
          ];
          tapped.disabled = false;
          region.value = "point";
          showMark();
          updateReveal();
        });
      }
      panel.appendChild(node("p", say(
        "Mark where you see it. Use the region menu with a keyboard. The mark records your observation; it is not automatically graded.",
        "Gördüğünüz yeri işaretleyin. Klavye ile bölge menüsünü kullanın. İşaret gözleminizi kaydeder; otomatik puanlanmaz."
      ), "subtle-limit"));
      if (revealed) {
        const answer = node("div", undefined, "subtle-answer");
        answer.appendChild(node("p", say("Source diagnosis: ", "Kaynak tanısı: ") + entry.record.diagnosticGroundTruth.confirmedDiagnosis));
        if (entry.record.provenance) {
          answer.appendChild(node("p", say(
            "Verification: source-reported histopathology; Docutis has not reviewed slides. Clinician review required. ",
            "Doğrulama: kaynağın bildirdiği histopatoloji; Docutis preparatları incelemedi. Hekim incelemesi gerekli. "
          ) + entry.record.provenance.author + " · " + entry.record.provenance.panel));
        }
        answer.appendChild(node("p", say("Useful observation: ", "Yararlı gözlem: ") + label(lesson.options[expected[index]])));
        answer.appendChild(node("p", answerState.choice === String(expected[index])
          ? say("Your selection matches this observation.", "Seçiminiz bu gözlemle örtüşüyor.")
          : say("Compare your selection with the recorded observation. An image may still need closer assessment.", "Seçiminizi kayıtlı gözlemle karşılaştırın. Görsel yine de daha yakından değerlendirme gerektirebilir.")));
        answer.appendChild(node("p", say("Your visibility: ", "Görülebilirlik seçiminiz: ") +
          (answerState.visibility === "clear" ? say("Clear", "Net") :
            answerState.visibility === "possible" ? say("Possible", "Olası") : say("Cannot assess", "Değerlendirilemiyor"))));
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
      const reveal = node("button", comparisonOpen ? say("Reveal and compare", "Tanıları aç ve karşılaştır") : say("Save observation and open comparison", "Gözlemi kaydet ve karşılaştırmayı aç"), "subtle-button subtle-reveal-button");
      reveal.type = "button";
      reveal.disabled = !ready();
      reveal.addEventListener("click", () => {
        if (!comparisonOpen) { comparisonOpen = true; render(); root.querySelectorAll("h3")[1].focus(); return; }
        revealed = true; render(); root.querySelector(".subtle-comparison").focus();
      });
      root.appendChild(reveal);
    } else {
      const result = node("section", undefined, "subtle-comparison");
      result.tabIndex = -1;
      result.appendChild(node("h4", say("What the pair teaches", "Bu İkilinin Öğrettiği")));
      result.appendChild(node("p", label(lesson.comparison)));
      result.appendChild(node("p", label(lesson.limit), "subtle-limit"));
      const reflectionLabel = node("label", say("What needs more practice?", "Hangi konuda daha çok çalışmalısınız?"), "subtle-field");
      const reflectionSelect = node("select");
      [
        ["", say("Choose a reflection (optional)", "Değerlendirme seçin (isteğe bağlı)")],
        ["notice", say("Noticing the finding", "Bulguyu fark etmek")],
        ["name", say("Naming the structure", "Yapıyı adlandırmak")],
        ["weight", say("Weighing the clue against a mimic", "İpucunu taklitçiyle birlikte tartmak")],
        ["quality", say("Recognising image limitations", "Görüntünün sınırlarını fark etmek")],
        ["comfortable", say("Comfortable with this comparison", "Bu karşılaştırmada rahatım")]
      ].forEach(([value, text]) => {
        const option = node("option", text);
        option.value = value;
        reflectionSelect.appendChild(option);
      });
      reflectionSelect.value = reflection;
      reflectionSelect.addEventListener("change", () => { reflection = reflectionSelect.value; });
      reflectionLabel.appendChild(reflectionSelect);
      result.appendChild(reflectionLabel);
      const retry = node("button", say("Try this pair again with images swapped", "Görsellerin yerini değiştirerek yeniden çalış"), "subtle-button");
      retry.type = "button";
      retry.addEventListener("click", () => {
        reversed = !reversed;
        answers = blankAnswers();
        revealed = false;
        comparisonOpen = false;
        reflection = "";
        render();
        root.querySelectorAll("h3")[1].focus();
      });
      result.appendChild(retry);
      const saved = revisit.includes(lesson.id);
      const toggle = node("button", saved
        ? say("Remove from revisit list", "Tekrar listesinden çıkar")
        : say("Add this clue to revisit list", "Bu ipucunu tekrar listesine ekle"), "subtle-button");
      toggle.type = "button";
      toggle.setAttribute("aria-pressed", String(saved));
      toggle.addEventListener("click", () => {
        revisit = saved ? revisit.filter(id => id !== lesson.id) : [...revisit, lesson.id];
        saveRevisit();
        render();
        root.querySelector(".subtle-comparison").focus();
      });
      result.appendChild(toggle);
      root.appendChild(result);
    }
  }
  render();
  const languageControl = document.getElementById("docutisLanguage");
  if (languageControl) languageControl.addEventListener("change", render);
})();
