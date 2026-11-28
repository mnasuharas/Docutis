/* Guided observation uses existing, attributed contrast-pair images and regions. */
(function () {
  "use strict";
  const root = document.getElementById("guidedPatternApp");
  const pairs = window.DOCUTIS_CONTRAST_LAB;
  if (!root || !pairs) return;

  const lessons = [
    {
      id: "contrast-03",
      title: ["Uneven pigment network", "Düzensiz Pigment Ağı"],
      look: ["Follow the brown lines across the lesion. Compare their thickness and colour, the spaces they enclose, and the distribution of darker areas.", "Kahverengi çizgileri lezyon boyunca takip et. Çizgilerin kalınlığını, rengini, çevreledikleri boşlukları ve koyu alanların dağılımını karşılaştır."],
      choices: [["Both images show an uneven brown network", "İki görüntüde de düzensiz kahverengi ağ var"], ["Both images show only a uniform network", "İki görüntüde de yalnız düzenli ağ var"], ["The brown network is absent from both images", "İki görüntüde de kahverengi ağ yok"]]
    },
    {
      id: "contrast-02",
      title: ["Negative network", "Negatif Ağ"],
      look: ["Look for pale connecting lines that enclose darker areas. Compare them with the spaces between brown lines in a conventional pigment network.", "Koyu alanları çevreleyen ve birbirine bağlanan açık renkli çizgileri ara. Bunları klasik pigment ağındaki kahverengi çizgilerin arasındaki boşluklarla karşılaştır."],
      choices: [["A: pale connected lines · B: uneven brown network", "A: birbirine bağlanan açık çizgiler · B: düzensiz kahverengi ağ"], ["A: uneven brown network · B: pale connected lines", "A: düzensiz kahverengi ağ · B: birbirine bağlanan açık çizgiler"], ["Both images show a uniform brown network", "İki görüntüde de düzenli kahverengi ağ var"]]
    },
    {
      id: "contrast-04",
      title: ["Shiny white structures and scale", "Parlak Beyaz Yapılar ve Skuam"],
      look: ["Trace the shape of the white structures. Compare narrow or shiny elements with the broader white scale and the surrounding surface.", "Beyaz yapıların şeklini takip et. İnce veya parlak öğeleri daha geniş beyaz skuamla ve çevresindeki yüzeyle karşılaştır."],
      choices: [["White structures are visible in both images", "İki görüntüde de beyaz yapılar seçiliyor"], ["White structures are visible only in A", "Beyaz yapılar yalnız A’da seçiliyor"], ["White structures are visible only in B", "Beyaz yapılar yalnız B’de seçiliyor"]]
    },
    {
      id: "contrast-05",
      title: ["Pigment around facial follicles", "Yüzde Folikül Çevresinde Pigment"],
      look: ["Find several follicular openings and compare the colour and arrangement of pigment immediately around them.", "Birkaç foliküler açıklık bul. Hemen çevrelerindeki pigmentin rengini ve dizilimini karşılaştır."],
      choices: [["A: irregular grey-brown dots · B: orange-brown pigment", "A: düzensiz gri-kahverengi noktalar · B: turuncu-kahverengi pigment"], ["A: orange-brown pigment · B: irregular grey-brown dots", "A: turuncu-kahverengi pigment · B: düzensiz gri-kahverengi noktalar"], ["Both images show identical grey dots", "İki görüntüde de aynı gri noktalar var"]]
    },
    {
      id: "contrast-06",
      title: ["Acral bands and fibrillar lines", "Akral Bantlar ve Fibriler Çizgiler"],
      look: ["Follow the direction of the skin markings. Compare wide pigmented bands with fine oblique strokes. Use the full frame to check for scale and printed marks.", "Deri çizgilerinin yönünü takip et. Geniş pigmente bantlarla ince oblik çizgileri karşılaştır. Skuamı ve basılı işaretleri ayırt etmek için görüntünün tamamına bak."],
      choices: [["A: broad pigmented bands · B: fine oblique strokes", "A: geniş pigmente bantlar · B: ince oblik çizgiler"], ["A: fine oblique strokes · B: broad pigmented bands", "A: ince oblik çizgiler · B: geniş pigmente bantlar"], ["Both images show the same band width and direction", "İki görüntüde de bant genişliği ve yönü aynı"]]
    }
  ].flatMap(spec => {
    const pair = pairs.find(item => item.id === spec.id);
    return pair ? [{ ...spec, pair }] : [];
  });

  const isTurkish = () => document.documentElement.lang === "tr";
  const t = (en, tr) => isTurkish() ? tr : en;
  const text = item => item[isTurkish() ? "tr" : "en"];
  const localized = pair => t(...pair);
  let active, answer, step, heading, choiceOrder;
  function add(parent, tag, content, className) {
    const el = document.createElement(tag);
    if (content) el.textContent = content;
    if (className) el.className = className;
    parent.appendChild(el);
    return el;
  }
  function link(parent, label, url) {
    const anchor = add(parent, "a", label);
    anchor.href = url;
    anchor.rel = "noopener noreferrer";
    anchor.target = "_blank";
  }
  function button(parent, label, action) {
    const el = add(parent, "button", label, "subtle-button");
    el.type = "button";
    el.addEventListener("click", action);
  }
  function show(lesson, nextStep, nextAnswer) {
    active = lesson;
    step = nextStep;
    answer = nextAnswer;
    if (nextStep === 1) {
      const start = Math.floor(Math.random() * 3);
      choiceOrder = [start, (start + 1) % 3, (start + 2) % 3, 3];
    }
    render();
    heading.focus();
  }
  function photograph(parent, side, letter) {
    const asset = side.image;
    const figure = add(parent, "figure", null, "contrast-photo");
    const frame = add(figure, "div", null, "contrast-image");
    const img = add(frame, "img");
    img.src = asset.src;
    img.alt = t("Dermoscopy ", "Dermoskopi ") + letter;
    img.width = asset.dimensions.width;
    img.height = asset.dimensions.height;
    const marker = step > 1 ? add(frame, "span", null, "contrast-marker") : null;
    if (marker) {
      marker.setAttribute("aria-hidden", "true");
      const [x, y, width, height] = side.region;
      for (const [property, value] of Object.entries({ left: x, top: y, width, height })) marker.style[property] = value * 100 + "%";
    }
    img.addEventListener("error", () => {
      frame.hidden = true;
      add(figure, "p", t("Image unavailable", "Görsel yüklenemedi"));
    }, { once: true });
    const credit = add(figure, "figcaption", asset.creator + " · ");
    link(credit, asset.license, asset.licenseUrl);
  }
  function render() {
    root.replaceChildren();
    heading = add(root, "h3", active ? localized(active.title) : t("Key patterns in real images", "Gerçek Görüntülerde Önemli Paternler"));
    heading.tabIndex = -1;
    add(root, "p", t("Teaching draft · clinician review required", "Eğitim taslağı · hekim incelemesi gerekli"), "mimic-note");
    if (!active) {
      const list = add(root, "div", null, "mimic-topics");
      lessons.forEach(lesson => button(list, localized(lesson.title), () => show(lesson, 1)));
      return;
    }
    add(root, "p", localized(active.look));
    const panels = add(root, "div", null, "contrast-panels");
    active.pair.sides.forEach((side, index) => {
      const panel = add(panels, "div", null, "contrast-side");
      const letter = index === 0 ? "A" : "B";
      add(panel, "h4", letter);
      photograph(panel, side, letter);
      if (step > 1) add(panel, "p", text(side.observation));
      if (step === 3) {
        add(panel, "p", text(side.label), "mimic-result");
        add(panel, "p", text(side.evidence));
        link(panel, t("Open publication", "Yayını aç"), side.source);
      }
    });
    if (step === 1) {
      const form = add(root, "form");
      const label = add(form, "label", t("Which description fits these images?", "Bu görüntülere hangi tarif uyuyor?"), "subtle-field");
      const select = add(label, "select");
      add(select, "option", t("Choose", "Seçin")).value = "";
      const choices = [...active.choices, ["Cannot assess", "Değerlendiremiyorum"]];
      choiceOrder.forEach(index => { add(select, "option", localized(choices[index])).value = String(index); });
      select.required = true;
      select.value = answer ?? "";
      select.addEventListener("change", () => { answer = select.value; });
      const submit = add(form, "button", t("Show regions and explanation", "Bölgeleri ve açıklamayı göster"), "subtle-button");
      submit.type = "submit";
      form.addEventListener("submit", event => {
        event.preventDefault();
        if (select.value !== "") show(active, 2, select.value);
      });
    } else {
      const review = add(root, "div", null, "mimic-review");
      add(review, "p", t("The frames show suggested review regions.", "Kutular, inceleme için önerilen bölgeleri gösteriyor."));
      add(review, "p", t("Your observation", "Gözlemin") + " · " + (answer === "3" ? t("Cannot assess", "Değerlendiremiyorum") : localized(active.choices[Number(answer)])));
      add(review, "p", t("Reference observation", "Referans gözlem") + " · " + localized(active.choices[0]), "mimic-result");
      add(review, "p", text(active.pair.lesson));
      if (step === 2) button(review, t("Reveal source diagnoses", "Kaynak tanılarını aç"), () => show(active, 3, answer));
      else button(review, t("Repeat this pattern", "Bu paterni yeniden çalış"), () => show(active, 1));
    }
    button(root, t("Choose another pattern", "Başka bir patern seç"), () => show(null, 0));
  }
  function initialize() {
    render();
    document.getElementById("docutisLanguage")?.addEventListener("change", render);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize);
  else initialize();
}());
