(function () {
  "use strict";

  const root = document.getElementById("patternContextApp");
  if (!root) return;
  const lessons = window.DOCUTIS_PATTERN_CONTEXT;
  const isTurkish = () => document.documentElement.lang === "tr";
  const copy = ([en, tr]) => isTurkish() ? tr : en;
  const say = (en, tr) => copy([en, tr]);
  const uncertain = ["Cannot assess", "Değerlendirilemiyor"];
  const regions = [
    ["Top left", "Sol üst"], ["Top center", "Üst orta"], ["Top right", "Sağ üst"],
    ["Middle left", "Sol orta"], ["Center", "Merkez"], ["Middle right", "Sağ orta"],
    ["Bottom left", "Sol alt"], ["Bottom center", "Alt orta"], ["Bottom right", "Sağ alt"],
    ["Across the rim", "Çevre boyunca"], uncertain
  ];
  let lesson, cases, index, stage, finding, region, weight;

  function node(tag, parent, label, className) {
    const el = document.createElement(tag);
    if (label) el.textContent = label;
    if (className) el.className = className;
    parent.append(el);
    return el;
  }

  function button(parent, label, action) {
    const el = node("button", parent, label, "subtle-button");
    el.type = "button";
    el.addEventListener("click", action);
    return el;
  }

  function link(parent, label, href) {
    const el = node("a", parent, label);
    el.href = href;
    if (href.startsWith("https:")) {
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    }
    return el;
  }

  function choose(parent, label, choices, value, onChange) {
    const field = node("label", parent, "", "subtle-field");
    node("span", field, label);
    const select = node("select", field);
    node("option", select, say("Choose", "Seç")).value = "";
    choices.forEach((choice, i) => { node("option", select, copy(choice)).value = String(i); });
    select.value = value;
    select.addEventListener("change", () => onChange(select.value));
  }

  function photo(parent, asset) {
    const figure = node("figure", parent, "", "contrast-photo");
    const frame = node("div", figure, "", "contrast-image context-image");
    const img = node("img", frame);
    img.alt = say("Unlabelled dermoscopy image for morphology assessment", "Yapı değerlendirmesi için tanısı gizlenmiş dermoskopi görüntüsü");
    img.src = asset.src;
    img.width = asset.dimensions.width;
    img.height = asset.dimensions.height;
    img.addEventListener("error", () => {
      img.hidden = true;
      frame.querySelector(".contrast-marker")?.remove();
      node("p", frame, say("Image unavailable. You can select Cannot assess.", "Görüntü yüklenemedi. Değerlendirilemiyor seçeneğini kullanabilirsin."));
    });
    const caption = node("figcaption", figure, asset.creator + " · ");
    link(caption, asset.license, asset.licenseUrl);
    return frame;
  }

  function mark(frame) {
    frame.querySelector(".contrast-marker")?.remove();
    if (!region || Number(region) >= 9 || frame.querySelector("img").hidden) return;
    const cell = Number(region);
    const marker = node("span", frame, "", "contrast-marker");
    marker.setAttribute("aria-hidden", "true");
    marker.style.left = (cell % 3) * 100 / 3 + "%";
    marker.style.top = Math.floor(cell / 3) * 100 / 3 + "%";
    marker.style.width = marker.style.height = 100 / 3 + "%";
  }

  function result(parent, item) {
    node("h4", parent, copy(item.diagnosis));
    node("p", parent, copy(item.evidence));
    node("p", parent, copy(item.feedback));
    link(parent, say("Case source", "Vaka kaynağı") + " · " + item.figure, item.image.sourceUrl);
    if (item.image.modificationStatus === "cropped") {
      node("p", parent, say("Image cropped to the original dermoscopy panel.", "Görüntü kaynak dermoskopi paneline kırpıldı."));
    }
  }

  function show() {
    render();
    root.querySelector("h3").focus();
  }

  function next() {
    index += 1;
    stage = 0;
    finding = region = weight = "";
    show();
  }

  function render() {
    root.replaceChildren();
    const heading = node("h3", root, lesson ? copy(lesson.title) : say("Pattern and context", "Patern ve Bağlam"));
    heading.tabIndex = -1;
    node("p", root, say("Educational draft · clinician review required.", "Eğitim taslağı · hekim incelemesi gerekir."));
    if (!lesson) {
      node("p", root, say("Describe the structures, mark a region and open the clinical context before seeing the diagnosis.", "Tanıyı açmadan önce yapıları tarif et, bölgeyi işaretle ve klinik bağlamı değerlendir."));
      const list = node("ul", root, "", "context-lessons");
      lessons.forEach(item => {
        const entry = node("li", list);
        const label = copy(item.title) + " · " + say(item.cases.length + " cases", item.cases.length + " vaka");
        button(entry, label, () => {
          lesson = item;
          cases = [...item.cases];
          for (let i = cases.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cases[i], cases[j]] = [cases[j], cases[i]];
          }
          index = -1;
          next();
        });
      });
      return;
    }

    if (index >= cases.length) {
      node("h4", root, say("Compare the cases", "Vakaları karşılaştır"));
      node("p", root, copy(lesson.takeaway));
      const grid = node("div", root, "", "contrast-panels");
      cases.forEach(item => {
        const panel = node("section", grid, "", "contrast-side");
        photo(panel, item.image);
        result(panel, item);
      });
      if (lesson.counterexample) {
        node("p", root, copy(lesson.counterexample.note));
        link(root, copy(lesson.counterexample.label), lesson.counterexample.url);
      }
      const references = node("ul", root);
      lesson.references.forEach(([label, url]) => link(node("li", references), label, url));
      button(root, say("Choose another lesson", "Başka ders seç"), () => { lesson = null; show(); });
      return;
    }

    const item = cases[index];
    const stageNames = [
      say("Describe the structures", "Yapıları tarif et"),
      say("Add the clinical context", "Klinik bağlamı değerlendir"),
      say("Revisit the clue", "İpucunu yeniden değerlendir")
    ];
    node("p", root, say("Case ", "Vaka ") + (index + 1) + "/" + cases.length + " · " + stageNames[stage]);
    const frame = photo(root, item.image);
    mark(frame);
    if (stage === 0) {
      let advance;
      choose(root, copy(lesson.observation), [...lesson.findings, uncertain], finding, value => {
        finding = value;
        if (Number(value) === lesson.findings.length) region = String(regions.length - 1);
        advance.disabled = !finding || !region;
        if (region === String(regions.length - 1)) regionField.querySelector("select").value = region;
        mark(frame);
      });
      const regionField = node("div", root);
      choose(regionField, say("Where do you see it?", "Görüntünün neresinde?"), regions, region, value => {
        region = value;
        mark(frame);
        advance.disabled = !finding || !region;
      });
      advance = button(root, say("Reveal age, site and evolution", "Yaşı, yerleşimi ve değişim öyküsünü aç"), () => { stage = 1; show(); });
      advance.disabled = !finding || !region;
      return;
    }

    node("p", root, copy(item.context));
    const options = [...lesson.weights, uncertain];
    if (stage === 1) {
      let reveal;
      choose(root, say("Which detail most changes your first impression?", "İlk yorumunu en çok hangi ayrıntı değiştiriyor?"), options, weight, value => {
        weight = value;
        reveal.disabled = !weight;
      });
      reveal = button(root, say("Reveal the source diagnosis", "Kaynak tanısını aç"), () => { stage = 2; show(); });
      reveal.disabled = !weight;
      return;
    }

    node("p", root, say("Detail you chose · ", "Seçtiğin ayrıntı · ") + copy(options[Number(weight)]));
    result(root, item);
    button(root, index + 1 < cases.length ? say("Next case", "Sonraki vaka") : say("Compare the cases", "Vakaları karşılaştır"), next);
  }

  document.getElementById("docutisLanguage")?.addEventListener("change", render);
  render();
})();
