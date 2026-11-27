(function () {
  "use strict";
  const root = document.getElementById("contrastLabApp"), lessons = window.DOCUTIS_CONTRAST_LAB;
  if (!root || !lessons || !lessons.length) return;
  const key = "docutis-contrast-lab-revisit-v1";
  let queue = [], index = 0, sides = [], answers = [{}, {}], decision = "", reflection = "", revealed = false, completed = [], saved = [], remember = false, storageFailed = false;
  try {
    const value = JSON.parse(window.localStorage.getItem(key) || "null");
    if (value && value.version === 1 && Array.isArray(value.ids)) { remember = true; saved = [...new Set(value.ids.filter(id => lessons.some(lesson => lesson.id === id)))]; }
  } catch (error) { /* Bad or blocked storage must not prevent practice. */ }
  const tr = () => document.documentElement.lang === "tr";
  const say = (en, turkish) => tr() ? turkish : en;
  const text = value => value[tr() ? "tr" : "en"];
  const findingOptions = [["white", "White lines / white areas", "Beyaz çizgiler / beyaz alanlar"], ["network", "Network architecture / darker focus", "Ağ mimarisi / koyu odak"], ["follicles", "Pigment around follicular openings", "Foliküler açıklık çevresinde pigment"], ["acral", "Pigment across acral skin markings", "Akral deri çizgilerine göre pigment"], ["vessels", "Vessels / pink areas", "Damarlar / pembe alanlar"], ["surface", "Scale / crust / artifacts", "Skuam / krut / artefaktlar"], ["uncertain", "Cannot assess", "Değerlendirilemiyor"]];
  const visibilityOptions = [["clear", "Clear", "Net"], ["possible", "Possible", "Olası"], ["uncertain", "Cannot assess", "Değerlendirilemiyor"]];
  const regions = [["1", "Top left", "Sol üst"], ["2", "Top center", "Üst orta"], ["3", "Top right", "Sağ üst"], ["4", "Middle left", "Sol orta"], ["5", "Center", "Merkez"], ["6", "Middle right", "Sağ orta"], ["7", "Bottom left", "Sol alt"], ["8", "Bottom center", "Alt orta"], ["9", "Bottom right", "Sağ alt"]];
  function node(tag, content, parent, className) {
    const el = document.createElement(tag); if (content) el.textContent = content;
    if (className) el.className = className; if (parent) parent.appendChild(el); return el;
  }
  function button(en, turkish, parent, action) {
    const el = node("button", say(en, turkish), parent, "subtle-button"); el.type = "button"; el.addEventListener("click", action); return el;
  }
  function pick(en, turkish, options, value, parent, action, lock = true) {
    const label = node("label", "", parent, "subtle-field");
    const caption = node("span", say(en, turkish), label);
    const select = node("select", "", label); select.setAttribute("aria-label", caption.textContent);
    const prompt = node("option", say("Choose", "Seçin"), select); prompt.value = "";
    options.forEach(([id, english, translated]) => { const option = node("option", say(english, translated), select); option.value = id; });
    select.value = value || ""; select.disabled = revealed && lock;
    select.addEventListener("change", () => action(select.value)); return select;
  }
  function save() {
    if (!remember) return;
    try { window.localStorage.setItem(key, JSON.stringify({ version: 1, ids: saved })); }
    catch (error) { storageFailed = true; }
  }
  function shuffle(items) {
    const copy = [...items]; for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy;
  }
  function focus() { root.querySelector("h3").focus(); }
  function prepare() { sides = shuffle(queue[index].sides); answers = [{}, {}]; decision = ""; reflection = ""; revealed = false; }
  function start(items) { queue = shuffle(items); index = 0; completed = []; prepare(); render(); focus(); }
  function next() {
    const lesson = queue[index];
    // "Both" can be reasonable: this revisit flag is reflection, never a clinical error score.
    const revisit = decision === "both" || decision === "uncertain" || sides[Number(decision)]?.id !== lesson.cases[0] || answers.some(answer => answer.visibility !== "clear" || answer.finding === "uncertain") || reflection !== "understood";
    completed.push({ lesson, revisit });
    saved = saved.filter(id => id !== lesson.id); if (revisit) saved.push(lesson.id); save();
    index++; if (index < queue.length) prepare(); render(); focus();
  }
  function regionBox(value) { const n = Number(value) - 1; return [(n % 3) / 3, Math.floor(n / 3) / 3, 1 / 3, 1 / 3]; }
  function photo(asset, parent, region, regionLabel) {
    const figure = node("figure", "", parent, "contrast-photo");
    const frame = node("div", "", figure, region ? "contrast-zoom" : "contrast-image");
    const img = node("img", "", frame); img.src = asset.src; img.width = asset.dimensions.width; img.height = asset.dimensions.height;
    img.alt = regionLabel || say("Unknown lesion for independent comparison", "Bağımsız karşılaştırma için tanısı gizli lezyon");
    if (region) {
      const [x, y, w, h] = region; frame.style.aspectRatio = String((asset.dimensions.width * w) / (asset.dimensions.height * h));
      img.style.width = (100 / w) + "%"; img.style.left = (-x / w * 100) + "%"; img.style.top = (-y / h * 100) + "%";
    }
    img.addEventListener("error", () => { img.hidden = true; node("p", say("Image unavailable; keep assessment uncertain or skip.", "Görsel yüklenemedi; belirsiz bırakın veya geçin."), figure); });
    const credit = node("figcaption", (regionLabel ? regionLabel + " · " : "") + asset.creator + " · ", figure);
    const license = node("a", asset.license, credit); license.href = asset.licenseUrl; license.target = "_blank"; license.rel = "noopener noreferrer";
    return frame;
  }
  function render() {
    root.replaceChildren();
    const shortcut = document.getElementById("contrastLabLink"); if (shortcut) shortcut.textContent = say("Compare early melanomas", "Erken melanomları karşılaştır");
    const heading = node("h3", say("Close mimics: weigh the clue", "Yakın taklitçiler: ipucunun ağırlığını değerlendir"), root); heading.tabIndex = -1;
    node("p", say("Teaching draft · clinician review required. Six curated comparisons include five in-situ and one 0.75 mm invasive melanoma, with non-melanoma controls. Two newly imported lesions belong to the same patient; some controls repeat. This is not an independent test set, screening prevalence or a diagnostic score.", "Eğitim taslağı · hekim incelemesi gerekir. Altı seçilmiş karşılaştırma, melanom dışı karşı örneklerle birlikte beş in situ ve bir 0,75 mm invaziv melanom içerir. Yeni aktarılan iki lezyon aynı hastaya aittir; bazı karşı örnekler tekrarlanır. Bu bağımsız test seti, tarama sıklığı veya tanısal puanlama değildir."), root);
    if (!queue.length) {
      node("p", say("Compare two unknown lesions, select structures and a region on each, then decide which needs closer assessment. Both and Cannot assess are valid options. Source arrows may remain. Diagnoses and suggested review regions open only after your choices.", "Tanısı gizli iki lezyonu karşılaştırın, her birinde yapı ve bölge seçin; ardından hangisinin daha yakından değerlendirilmesi gerektiğini belirtin. İkisi de ve Değerlendirilemiyor seçenekleri vardır. Kaynak okları bulunabilir. Tanılar ve önerilen inceleme bölgeleri seçimlerden sonra açılır."), root);
      const label = node("label", "", root, "contrast-storage");
      const checkbox = node("input", "", label); checkbox.type = "checkbox"; checkbox.checked = remember;
      node("span", say("Keep only my revisit list in this browser (optional)", "Yalnızca tekrar listemi bu tarayıcıda sakla (isteğe bağlı)"), label);
      checkbox.addEventListener("change", () => {
        remember = checkbox.checked;
        if (remember) save(); else { try { window.localStorage.removeItem(key); } catch (error) { storageFailed = true; } }
        render();
      });
      node("p", say("Without this option the list lasts only in this tab. No images, answers or personal data are uploaded. Clearing browser storage removes the list.", "Bu seçenek kapalıysa liste yalnızca bu sekmede kalır. Görseller, yanıtlar veya kişisel veriler yüklenmez. Tarayıcı verilerini temizlemek listeyi siler."), root);
      button("Start six comparisons", "Altı karşılaştırmaya başla", root, () => start(lessons));
      if (saved.length) button("Practise my revisit list", "Tekrar listemi çalış", root, () => start(lessons.filter(lesson => saved.includes(lesson.id))));
    } else if (index >= queue.length) {
      node("h4", say("Session reflection", "Oturum değerlendirmesi"), root);
      node("p", say("No accuracy or competence score is calculated. Choosing Both may be appropriate; it is recorded for reflection, not graded wrong.", "Doğruluk veya yetkinlik puanı hesaplanmaz. İkisi de seçimi uygun olabilir; yanlış sayılmaz, değerlendirme için kaydedilir."), root);
      completed.forEach((result, i) => node("p", say("Comparison ", "Karşılaştırma ") + (i + 1) + " · " + (result.revisit ? say("Revisit", "Yeniden çalış") : say("Reviewed", "Çalışıldı")), root));
      const revisit = lessons.filter(lesson => saved.includes(lesson.id));
      if (revisit.length) button("Repeat my revisit list", "Tekrar listemi yeniden çalış", root, () => start(revisit));
      button("Restart all six", "Altı karşılaştırmayı yeniden başlat", root, () => start(lessons));
    } else {
      const lesson = queue[index];
      node("p", say("Comparison ", "Karşılaştırma ") + (index + 1) + " / " + queue.length, root);
      const panels = node("div", "", root, "contrast-panels");
      let reveal;
      const ready = () => Boolean(decision) && answers.every(answer => answer.finding && answer.visibility && (answer.visibility === "uncertain" || answer.region));
      const update = () => { reveal.disabled = !ready(); };
      sides.forEach((side, i) => {
        const panel = node("section", "", panels, "contrast-side");
        node("h4", say("Lesion ", "Lezyon ") + (i === 0 ? "A" : "B"), panel);
        const frame = photo(side.image, panel);
        function marker() {
          const old = frame.querySelector(".contrast-marker"); if (old) old.remove();
          if (answers[i].region && answers[i].visibility !== "uncertain") {
            const [x, y, w, h] = regionBox(answers[i].region);
            const mark = node("span", "", frame, "contrast-marker"); mark.style.left = (x * 100) + "%"; mark.style.top = (y * 100) + "%"; mark.style.width = (w * 100) + "%"; mark.style.height = (h * 100) + "%"; mark.setAttribute("aria-hidden", "true");
          }
        }
        marker();
        pick("Finding " + (i === 0 ? "A" : "B"), "Bulgu " + (i === 0 ? "A" : "B"), findingOptions, answers[i].finding, panel, value => { answers[i].finding = value; update(); });
        pick("Visibility " + (i === 0 ? "A" : "B"), "Görülebilirlik " + (i === 0 ? "A" : "B"), visibilityOptions, answers[i].visibility, panel, value => { answers[i].visibility = value; marker(); update(); });
        pick("Region " + (i === 0 ? "A" : "B"), "Bölge " + (i === 0 ? "A" : "B"), regions, answers[i].region, panel, value => { answers[i].region = value; marker(); update(); });
        if (revealed) {
          node("h4", text(side.label), panel); node("p", text(side.evidence), panel);
          node("p", text(side.observation), panel);
          const chosen = findingOptions.find(option => option[0] === answers[i].finding);
          node("p", say("Your finding: ", "Seçtiğiniz bulgu: ") + say(chosen[1], chosen[2]), panel);
          if (answers[i].visibility === "uncertain") node("p", say("Your uncertainty remains recorded; no region is inferred.", "Belirsizliğiniz kayıtlı kalır; bölge varsayılmaz."), panel);
          else photo(side.image, panel, regionBox(answers[i].region), say("Your selected region", "Seçtiğiniz bölge"));
          photo(side.image, panel, side.region, say("Suggested review region · unreviewed", "Önerilen inceleme bölgesi · inceleme bekliyor"));
          const source = node("a", say("Original source and evidence", "Özgün kaynak ve kanıt"), panel); source.href = side.source; source.target = "_blank"; source.rel = "noopener noreferrer";
        }
      });
      const selected = [["0", "Lesion A", "Lezyon A"], ["1", "Lesion B", "Lezyon B"], ["both", "Both need closer assessment", "İkisi de daha yakından değerlendirilmeli"], ["uncertain", "Cannot decide from these images", "Bu görüntülerle karar veremem"]];
      pick("Which needs closer assessment, and where did the clue change your impression?", "Hangisi daha yakından değerlendirilmeli; ipucu nerede izleniminizi değiştirdi?", selected, decision, root, value => { decision = value; update(); });
      reveal = button("Reveal and compare regions", "Tanıları aç ve bölgeleri karşılaştır", root, () => { revealed = true; render(); root.querySelector(".contrast-feedback").focus(); });
      reveal.disabled = revealed || !ready();
      if (revealed) {
        const feedback = node("section", "", root, "contrast-feedback subtle-comparison"); feedback.tabIndex = -1;
        node("h4", say("Why the clue does not decide alone", "İpucu neden tek başına tanı koydurmaz?"), feedback);
        node("p", text(lesson.lesson), feedback);
        const chosen = selected.find(option => option[0] === decision);
        node("p", say("Your assessment: ", "Değerlendirmeniz: ") + say(chosen[1], chosen[2]), feedback);
        node("p", say("Full images remain above. Zoom enlarges source pixels; it adds no detail. Suggested regions are editorial teaching drafts, not validated physician annotations, lesion boundaries or a grading target. Sources and devices differ; an image cannot prove Breslow or in-situ status. Source histopathology is separate from Docutis clinical review.", "Tam görseller yukarıda kalır. Büyütme kaynak piksellerini büyütür; ayrıntı eklemez. Önerilen bölgeler eğitsel taslaktır; doğrulanmış hekim anotasyonu, lezyon sınırı veya puanlama hedefi değildir. Kaynaklar ve cihazlar farklıdır; görüntü Breslow veya in situ durumunu kanıtlayamaz. Kaynak histopatolojisi Docutis klinik incelemesinden ayrıdır."), feedback);
        let nextButton;
        // Reflection remains selectable after reveal; the observation selectors stay locked.
        pick("What will you revisit?", "Neyi yeniden çalışacaksınız?", [["finding", "Recognizing the structure", "Yapıyı tanıma"], ["weight", "How much weight I gave one clue", "Tek ipucuna verdiğim ağırlık"], ["quality", "Image quality / uncertainty", "Görüntü kalitesi / belirsizlik"], ["understood", "Comparison understood for now", "Karşılaştırmayı şimdilik anladım"]], reflection, feedback, value => { reflection = value; nextButton.disabled = !value; }, false);
        nextButton = button("Save reflection and continue", "Değerlendirmeyi kaydet ve devam et", feedback, next); nextButton.disabled = !reflection;
      }
      if (!revealed) button("Skip without revealing", "Tanıları açmadan geç", root, () => { index++; if (index < queue.length) prepare(); render(); focus(); });
    }
    if (storageFailed) node("p", say("Browser storage unavailable; the revisit list remains in this tab only.", "Tarayıcı depolaması kullanılamıyor; tekrar listesi yalnızca bu sekmede kalır."), root);
  }
  function initialize() { render(); const language = document.getElementById("docutisLanguage"); if (language) language.addEventListener("change", render); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize); else initialize();
})();
