/* Curated contrast practice; source verification is not physician review. */
(function () {
  "use strict";
  const benign = ["case-g25-02", "case-g25-06", "case-g26-02", "case-g26-05", "case-g26-06", "case-g27-05", "case-g30-02", "case-g31-01"];
  const malignant = ["case-g25-01", "case-g25-04", "case-g25-05", "case-g26-01", "case-g26-03", "case-g27-03", "case-g27-04", "case-g25-03"];
  window.DOCUTIS_BALANCED_CASE_IDS = Object.freeze([...benign, ...malignant]);
  const root = document.getElementById("balancedClueApp");
  if (!root || !window.DOCUTIS_CASES) return;
  const cases = window.DOCUTIS_BALANCED_CASE_IDS.map(id => window.DOCUTIS_CASES.cases.find(item => item.id === id));
  if (cases.some(item => !item || item.diagnosticGroundTruth.confirmationMethod !== "histopathology")) return;
  let queue = [], index = 0, revealed = false, selected = {};
  const tr = () => document.documentElement.lang === "tr";
  const say = (en, turkish) => tr() ? turkish : en;
  function node(tag, text, parent) {
    const el = document.createElement(tag);
    if (text) el.textContent = text;
    if (parent) parent.appendChild(el);
    return el;
  }
  function button(text, parent, action) {
    const el = node("button", text, parent); el.type = "button"; el.className = "subtle-button";
    el.addEventListener("click", action); return el;
  }
  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
  function start() { queue = shuffle(cases); index = 0; selected = {}; revealed = false; render(); }
  function render() {
    root.replaceChildren();
    const title = node("h3", say("Mixed practice: describe before diagnosis", "Karma Çalışma: Tanıdan Önce Tarif Edin"), root); title.tabIndex = -1;
    node("p", say("Eight benign counterexamples and eight melanoma cases from the existing library, shuffled. Histopathology is reported by the sources with different verification scopes. This curated mix does not represent screening prevalence. Teaching remains clinician review required.", "Mevcut arşivden sekiz benign karşı örnek ve sekiz melanom olgusu, karışık sırayla. Kaynaklar histopatolojiyi farklı doğrulama düzeylerinde bildiriyor. Bu seçilmiş karışım taramadaki sıklıkları temsil etmez. Eğitim hekim incelemesi gerektirir."), root);
    if (!queue.length) { button(say("Start mixed practice", "Karma çalışmaya başla"), root, start); return; }
    if (index === queue.length) {
      node("p", say("You have reviewed this set. Revisit the clues you found uncertain; completing a set does not establish competence.", "Bu diziyi tamamladınız. Emin olmadığınız ipuçlarını yeniden çalışın; diziyi tamamlamak yetkinliği göstermez."), root);
      button(say("Shuffle and restart", "Karıştır ve yeniden başla"), root, start); return;
    }
    const item = queue[index];
    node("p", say("Lesion ", "Lezyon ") + (index + 1) + " / " + queue.length, root);
    const asset = item.images.find(image => image.type === "dermoscopy");
    const frame = node("figure", "", root); frame.className = "subtle-panel";
    const image = node("img", "", frame); image.src = asset.src; image.alt = say("Dermoscopic image for independent observation.", "Bağımsız gözlem için dermoskopik görsel.");
    image.width = asset.dimensions.width; image.height = asset.dimensions.height;
    image.addEventListener("error", () => { image.hidden = true; node("p", say("Image unavailable; choose Cannot assess or move on.", "Görsel yüklenemedi; Değerlendirilemiyor seçin veya sonraki vakaya geçin."), frame); });
    const credit = node("figcaption", asset.creator + " · ", frame);
    const license = node("a", asset.license, credit); license.href = asset.licenseUrl; license.target = "_blank"; license.rel = "noopener noreferrer";
    const diagnoses = [
      ["nevus", "Melanocytic nevus", "Melanositik nevüs"], ["lentigo", "Solar lentigo", "Solar lentigo"],
      ["lplk", "Lichen planus-like keratosis", "Likenoid keratoz"], ["sk", "Seborrhoeic keratosis family", "Seboreik keratoz ailesi"],
      ["melanoma", "Melanoma spectrum", "Melanom spektrumu"], ["bcc", "Basal cell carcinoma", "Bazal hücreli karsinom"],
      ["scc", "Squamous neoplasia", "Skuamöz neoplazi"], ["uncertain", "Uncertain", "Belirsiz"]
    ];
    function pick(key, en, turkish, options) {
      const label = node("label", say(en, turkish), root); label.className = "subtle-field";
      const select = node("select", "", label);
      const prompt = node("option", say("Choose an answer", "Bir yanıt seçin"), select); prompt.value = "";
      options.forEach(([id, english, translated]) => { const option = node("option", say(english, translated), select); option.value = id; });
      select.value = selected[key] || ""; select.disabled = revealed;
      select.addEventListener("change", () => { selected[key] = select.value; reveal.disabled = !ready(); });
    }
    const ready = () => ["finding", "visibility", "diagnosis", "alternative"].every(key => Boolean(selected[key]));
    pick("finding", "Most influential visible finding", "En etkili görülebilir bulgu", [
      ["network", "Network or reticular lines", "Ağ veya retiküler çizgiler"], ["white", "White lines or white areas", "Beyaz çizgiler veya alanlar"],
      ["dots", "Dots or globules", "Noktalar veya globüller"], ["vessels", "Vessels or pink areas", "Damarlar veya pembe alanlar"],
      ["acral", "Parallel or fibrillar lines", "Paralel veya fibriler çizgiler"], ["surface", "Scale, ridges or fissures", "Skuam, sırtlar veya yarıklar"],
      ["uncertain", "Cannot assess", "Değerlendirilemiyor"]]);
    pick("visibility", "Visibility", "Görülebilirlik", [["clear", "Clear", "Net"], ["possible", "Possible", "Olası"], ["uncertain", "Cannot assess", "Değerlendirilemiyor"]]);
    pick("diagnosis", "Working diagnosis", "Ön tanı", diagnoses);
    pick("alternative", "Closest alternative", "En yakın alternatif", diagnoses);
    const reveal = button(say("Reveal source and compare reasoning", "Kaynağı aç ve akıl yürütmeyi karşılaştır"), root, () => { revealed = true; render(); root.querySelector(".balanced-reveal").focus(); });
    reveal.disabled = revealed || !ready();
    if (revealed) {
      const panel = node("section", "", root); panel.className = "subtle-comparison balanced-reveal"; panel.tabIndex = -1;
      node("h4", item.diagnosticGroundTruth.confirmedDiagnosis, panel);
      node("p", item.diagnosticGroundTruth.confirmationNotes, panel);
      node("h4", say("Recorded visible findings", "Kayıtlı Görülebilir Bulgular"), panel);
      (item.observations || []).filter(observation => observation.modality === "dermoscopy").forEach(observation => node("p", observation.text, panel));
      node("h4", say("Why the clue does not decide alone", "İpucu Neden Tek Başına Karar Verdirmez?"), panel);
      node("p", item.diagnosticTrap, panel);
      node("p", item.takeHomeRule, panel);
      const source = node("a", say("Open original source", "Özgün kaynağı aç"), panel); source.href = asset.sourceUrl; source.target = "_blank"; source.rel = "noopener noreferrer";
      button(say("Next lesion", "Sonraki lezyon"), panel, () => { index++; selected = {}; revealed = false; render(); root.querySelector("h3").focus(); });
    }
    button(say("Skip without revealing", "Tanıyı açmadan geç"), root, () => { index++; selected = {}; revealed = false; render(); root.querySelector("h3").focus(); });
  }
  render();
  const language = document.getElementById("docutisLanguage");
  if (language) language.addEventListener("change", render);
})();
