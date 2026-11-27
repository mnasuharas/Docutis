/* No patient uploads, remote grading, persistence or diagnostic probabilities. */
(function () {
  "use strict";
  const root = document.getElementById("pinkCaseApp");
  if (!root || !window.DOCUTIS_PINK_CASES) return;
  const cases = window.DOCUTIS_PINK_CASES;
  const tr = () => document.documentElement.lang === "tr";
  const say = (en, turkish) => tr() ? turkish : en;
  const text = value => value[tr() ? "tr" : "en"];
  let queue = [], index = 0, phase = "intro", answers = {}, results = [];
  const dx = [["melanoma", "Melanoma spectrum", "Melanom spektrumu"], ["bcc", "Basal cell carcinoma", "Bazal hücreli karsinom"], ["bowen", "Bowen disease / SCC in situ", "Bowen hastalığı / SCC in situ"], ["scc", "Invasive SCC", "İnvaziv SCC"], ["pg", "Pyogenic granuloma", "Piyojenik granülom"], ["nevus", "Nevus / inflammatory nevus", "Nevüs / inflamasyonlu nevüs"], ["lplk", "Lichenoid keratosis", "Likenoid keratoz"], ["other", "Other / uncertain", "Diğer / belirsiz"]];
  const confidence = [["low", "Low", "Düşük"], ["moderate", "Moderate", "Orta"], ["high", "High", "Yüksek"]];
  const traps = [
    ["no-pigment", "Little pigment felt reassuring", "Az pigment güven verdi"],
    ["bcc-anchor", "I anchored on BCC or branching vessels", "BCC veya dallanan damarlara odaklandım"],
    ["single-clue", "I treated one clue as a diagnosis", "Tek ipucunu tanı saydım"],
    ["partial-biopsy", "I trusted prior partial sampling too much", "Önceki kısmi örneklemeye fazla güvendim"],
    ["vascular-benign", "A vascular appearance seemed automatically benign", "Damarsal görünümü otomatik benign saydım"],
    ["crust", "Crust distracted me from the rest of the lesion", "Krut lezyonun kalanından dikkatimi uzaklaştırdı"],
    ["quality", "Image quality or artifacts limited me", "Görüntü kalitesi veya artefaktlar sınırladı"],
    ["none", "None of these / I kept uncertainty", "Hiçbiri / belirsizliği korudum"]
  ];
  const observationOptions = {
    vessels: [["dots", "Dotted", "Noktasal"], ["irregular", "Irregular linear", "Düzensiz çizgisel"], ["arborizing", "Arborizing / branching", "Ağaçsı / dallanan"], ["mixed", "Mixed morphologies", "Birden fazla biçim"], ["other", "Other visible morphology", "Görülen başka biçim"], ["unassessable", "Cannot assess", "Değerlendirilemiyor"]],
    white: [["lines", "Lines / strands", "Çizgiler"], ["area", "Structureless white area", "Beyaz yapısız alan"], ["scale", "Scale / collarette", "Skuam / kolaret"], ["none", "Not seen", "Görülmedi"], ["unassessable", "Cannot assess", "Değerlendirilemiyor"]],
    pink: [["milky", "Milky-red areas", "Sütlü kırmızı alanlar"], ["homogeneous", "Homogeneous red area", "Homojen kırmızı alan"], ["other", "Other pink/red background", "Başka pembe/kırmızı zemin"], ["none", "Not seen", "Görülmedi"], ["unassessable", "Cannot assess", "Değerlendirilemiyor"]],
    pigment: [["yes", "Brown / blue / gray visible", "Kahverengi / mavi / gri görülüyor"], ["no", "Not seen", "Görülmedi"], ["unassessable", "Cannot assess", "Değerlendirilemiyor"]],
    visibility: [["clear", "Clear", "Net"], ["possible", "Possible", "Olası"], ["unassessable", "Cannot assess", "Değerlendirilemiyor"]],
    location: [["1", "Top left", "Sol üst"], ["2", "Top center", "Üst orta"], ["3", "Top right", "Sağ üst"], ["4", "Middle left", "Sol orta"], ["5", "Center", "Merkez"], ["6", "Middle right", "Sağ orta"], ["7", "Bottom left", "Sol alt"], ["8", "Bottom center", "Alt orta"], ["9", "Bottom right", "Sağ alt"]]
  };
  function node(tag, content, parent) {
    const element = document.createElement(tag);
    if (content) element.textContent = content;
    if (parent) parent.appendChild(element);
    return element;
  }
  function button(en, turkish, parent, action) {
    const element = node("button", say(en, turkish), parent); element.type = "button"; element.className = "subtle-button";
    element.addEventListener("click", action); return element;
  }
  function link(label, url, parent) {
    const element = node("a", label, parent); element.href = url; element.target = "_blank"; element.rel = "noopener noreferrer";
    return element;
  }
  function pick(key, en, turkish, options, parent, onChange) {
    const label = node("label", say(en, turkish), parent); label.className = "subtle-field";
    const select = node("select", "", label); select.dataset.answer = key;
    const empty = node("option", say("Choose", "Seçin"), select); empty.value = "";
    options.forEach(([id, english, translated]) => { const option = node("option", say(english, translated), select); option.value = id; });
    select.value = answers[key] || "";
    select.addEventListener("change", () => { answers[key] = select.value; if (onChange) onChange(); });
    return select;
  }
  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; }
    return copy;
  }
  function focus() { root.querySelector("h3").focus(); }
  function start(items = cases) { queue = shuffle(items); index = 0; results = []; answers = {}; phase = "observe"; render(); focus(); }
  function advance(next) { phase = next; render(); focus(); }
  function ready(keys) { return keys.every(key => Boolean(answers[key])); }
  function image(asset, parent) {
    const figure = node("figure", "", parent); figure.className = "pink-figure";
    const frame = node("div", "", figure); frame.className = "pink-image-frame";
    const img = node("img", "", frame); img.src = asset.src; img.width = asset.width; img.height = asset.height;
    img.alt = asset.type === "clinical" ? say("Clinical view of the current unknown lesion", "Mevcut tanısı gizli lezyonun klinik görünümü") : say("Dermoscopic view of the same lesion", "Aynı lezyonun dermoskopik görünümü");
    img.addEventListener("error", () => { img.hidden = true; node("p", say("Image unavailable. Keep assessment uncertain or skip.", "Görsel yüklenemedi. Değerlendirmeyi belirsiz bırakın veya geçin."), frame); });
    const caption = node("figcaption", (asset.type === "clinical" ? say("Clinical", "Klinik") : say("Dermoscopy", "Dermoskopi")) + " · " + asset.credit + " · ", figure);
    link(asset.license, asset.licenseUrl, caption);
    if (asset.type === "dermoscopy") {
      const marker = node("span", "", frame); marker.className = "pink-marker"; marker.hidden = true; marker.setAttribute("aria-hidden", "true");
      function place() {
        const position = Number(answers.location);
        marker.hidden = !position || answers.visibility === "unassessable";
        if (!marker.hidden) { marker.style.left = ((position - 1) % 3 * 33.333 + 16.667) + "%"; marker.style.top = (Math.floor((position - 1) / 3) * 33.333 + 16.667) + "%"; }
      }
      root._pinkPlace = place; place();
    }
  }
  function summary(parent, fields) {
    const list = node("dl", "", parent); list.className = "pink-record";
    fields.forEach(([label, key, options]) => {
      node("dt", label, list);
      const selected = options.find(option => option[0] === answers[key]);
      node("dd", selected ? say(selected[1], selected[2]) : "—", list);
    });
  }
  function render() {
    root.replaceChildren(); root._pinkPlace = null;
    const shortcut = document.getElementById("pinkCaseLink");
    if (shortcut) shortcut.textContent = say("Practise pink lesions", "Pembe lezyonları çalış");
    const title = node("h3", say("Pink lesions: vessels before labels", "Pembe lezyonlar: tanıdan önce damarlar"), root); title.tabIndex = -1;
    node("p", say("Educational draft · clinician review required. Twelve selected cases: six melanomas and six mimics, including other cancers. Not screening prevalence, a diagnostic device or a competence test. Source image annotations may remain. Answers stay in this tab and reset on reload.", "Eğitim taslağı · hekim incelemesi gerekir. Seçilmiş 12 vaka: altı melanom ve diğer kanserleri de içeren altı taklitçi. Tarama sıklığını temsil etmez; tanı cihazı veya yetkinlik sınavı değildir. Kaynak görsel işaretleri bulunabilir. Yanıtlar bu sekmede kalır ve yenilemede sıfırlanır."), root);
    if (phase === "intro") {
      node("p", say("Observe the matched clinical and dermoscopic views, choose visible structures, commit to an impression, then open history. Compare with the source only afterwards. Some melanomas here are thick; this set is not a collection of early or in-situ melanoma.", "Eşleşmiş klinik ve dermoskopik görüntüleri inceleyin, görülen yapıları seçin, ilk izlenimi kaydedin; ardından öyküyü açın. Kaynakla sonra karşılaştırın. Buradaki bazı melanomlar kalındır; bu set erken veya in situ melanom dizisi değildir."), root);
      button("Start shuffled cases", "Karışık vakalara başla", root, () => start()); return;
    }
    if (index >= queue.length) {
      node("h4", say("Session reflection", "Oturum değerlendirmesi"), root);
      node("p", say("No score or sensitivity estimate is calculated. This small selected set cannot show whether you will miss melanoma in practice.", "Puan veya duyarlılık hesabı yapılmaz. Bu küçük seçilmiş set, pratikte melanom kaçırıp kaçırmayacağınızı göstermez."), root);
      results.forEach((result, i) => node("p", say("Case ", "Vaka ") + (i + 1) + " · " + text(result.item.label) + " · " + (result.revisit ? say("Revisit uncertainty or disagreement", "Belirsizlik veya uyuşmazlığı yeniden çalışın") : say("Reviewed", "Çalışıldı")), root));
      const revisit = results.filter(result => result.revisit).map(result => result.item);
      if (revisit.length) button("Repeat uncertain or discordant cases", "Belirsiz veya uyuşmayan vakaları tekrarla", root, () => start(revisit));
      button("Restart all twelve", "On iki vakayı yeniden başlat", root, () => start()); return;
    }
    const item = queue[index];
    node("p", say("Unknown lesion ", "Tanısı gizli lezyon ") + (index + 1) + " / " + queue.length, root);
    const panels = node("div", "", root); panels.className = "pink-panels";
    item.images.forEach(asset => image(asset, panels));
    node("p", say("Images are cropped source panels. Original arrows/boxes may point to findings; they are not your marks. Choose Cannot assess when detail is not resolved. Clinical inset size and other source limits appear at reveal.", "Görseller kaynak panellerinden kırpılmıştır. Özgün oklar/kutular bulguları gösterebilir; sizin işaretleriniz değildir. Ayrıntı seçilemiyorsa Değerlendirilemiyor seçin. Klinik ek görsel boyutu ve diğer kaynak sınırları sonuçta gösterilir."), root);
    if (phase === "observe") {
      node("h4", say("1 · Objective structures", "1 · Nesnel yapılar"), root);
      const grid = node("div", "", root); grid.className = "pink-fields";
      let next;
      const update = () => { if (root._pinkPlace) root._pinkPlace(); next.disabled = !ready(["vessels", "white", "pink", "pigment", "visibility"]) || (answers.visibility !== "unassessable" && !answers.location); };
      pick("vessels", "Most evident vessel morphology", "En belirgin damar biçimi", observationOptions.vessels, grid, update);
      pick("white", "White structures", "Beyaz yapılar", observationOptions.white, grid, update);
      pick("pink", "Pink/red areas", "Pembe/kırmızı alanlar", observationOptions.pink, grid, update);
      pick("pigment", "Residual pigment", "Kalan pigment", observationOptions.pigment, grid, update);
      pick("visibility", "Certainty of the selected findings", "Seçilen bulguların kesinliği", observationOptions.visibility, grid, update);
      pick("location", "Locate the main clue in the dermoscopic image (3 × 3 grid)", "Ana ipucunu dermoskopik görüntüde konumlandırın (3 × 3 ızgara)", observationOptions.location, grid, update);
      node("p", say("The ring marks your selected grid region only; it is not a validated annotation or grading target.", "Halka yalnızca seçtiğiniz ızgara bölgesini gösterir; doğrulanmış anotasyon veya puanlama hedefi değildir."), root);
      next = button("Save observations", "Gözlemleri kaydet", root, () => advance("impression")); update();
    } else if (phase === "impression") {
      node("h4", say("2 · First impression, before history", "2 · Öykü öncesi ilk izlenim"), root);
      let next;
      const update = () => { next.disabled = !ready(["before", "confidenceBefore"]); };
      pick("before", "Working impression", "İlk ön tanı", dx, root, update);
      pick("confidenceBefore", "Confidence", "Güven düzeyi", confidence, root, update);
      next = button("Save impression and open history", "İzlenimi kaydet ve öyküyü aç", root, () => advance("history")); update();
    } else if (phase === "history") {
      node("h4", say("3 · Add the published clinical context", "3 · Yayımlanmış klinik bağlamı ekleyin"), root);
      node("p", text(item.history), root);
      summary(root, [[say("Before history", "Öykü öncesi"), "before", dx], [say("Initial confidence", "İlk güven düzeyi"), "confidenceBefore", confidence]]);
      let reveal;
      const update = () => { reveal.disabled = !ready(["after", "confidenceAfter", "effect", "nextStep"]); };
      pick("after", "Working impression after history", "Öykü sonrası ön tanı", dx, root, update);
      pick("confidenceAfter", "Confidence after history", "Öykü sonrası güven düzeyi", confidence, root, update);
      pick("effect", "How did history affect your reasoning?", "Öykü akıl yürütmenizi nasıl etkiledi?", [["changed", "Changed my leading impression", "Öncelikli ön tanımı değiştirdi"], ["concern", "Same impression, concern increased", "Ön tanı aynı, şüphe arttı"], ["less", "Same impression, concern decreased", "Ön tanı aynı, şüphe azaldı"], ["same", "No change", "Değişmedi"], ["missing", "Not enough context", "Bağlam yetersiz"]], root, update);
      pick("nextStep", "Educational next-step reasoning", "Eğitsel sonraki adım değerlendirmesi", [["tissue", "Further clinical assessment for tissue diagnosis", "Doku tanısı için ileri klinik değerlendirme"], ["uncertain", "Need more information; cannot decide from these images", "Daha fazla bilgi gerekli; bu görüntülerle karar veremem"], ["reassure", "Reassurance from images alone", "Yalnızca görüntülere dayanarak güven verme"]], root, update);
      reveal = button("Reveal source diagnosis and compare", "Kaynak tanısını aç ve karşılaştır", root, () => advance("reveal")); update();
    } else {
      const panel = node("section", "", root); panel.className = "subtle-comparison";
      node("h4", text(item.label), panel);
      node("p", text(item.evidence), panel);
      node("h4", say("Recorded findings and limits", "Kayıtlı bulgular ve sınırlar"), panel);
      node("p", text(item.findings), panel); node("p", text(item.limit), panel);
      node("h4", say("Your recorded observations", "Kaydettiğiniz gözlemler"), panel);
      summary(panel, [
        [say("Vessels", "Damarlar"), "vessels", observationOptions.vessels],
        [say("White structures", "Beyaz yapılar"), "white", observationOptions.white],
        [say("Pink/red areas", "Pembe/kırmızı alanlar"), "pink", observationOptions.pink],
        [say("Pigment", "Pigment"), "pigment", observationOptions.pigment],
        [say("Visibility", "Görülebilirlik"), "visibility", observationOptions.visibility],
        [say("Selected region (ignored if unassessable)", "Seçilen bölge (değerlendirilemiyorsa kullanılmaz)"), "location", observationOptions.location]
      ]);
      summary(panel, [[say("Your first impression", "İlk izleniminiz"), "before", dx], [say("After history", "Öykü sonrası"), "after", dx], [say("Confidence before", "Önceki güven düzeyi"), "confidenceBefore", confidence], [say("Confidence after", "Sonraki güven düzeyi"), "confidenceAfter", confidence]]);
      node("p", answers.after === item.diagnosis ? say("Your selected category matches the source. This is not independent diagnostic validation.", "Seçtiğiniz kategori kaynakla eşleşiyor. Bu bağımsız tanısal doğrulama değildir.") : say("Your selected category differs from the source. Compare the findings and source evidence; do not memorize a single clue as a diagnosis.", "Seçtiğiniz kategori kaynaktan farklı. Bulguları ve kaynak kanıtını karşılaştırın; tek bulguyu tanı olarak ezberlemeyin."), panel);
      if (answers.visibility === "unassessable" || answers.confidenceAfter === "low") node("p", say("You recorded uncertainty. Keep it visible rather than replacing it with hindsight certainty.", "Belirsizlik kaydettiniz. Sonucu gördükten sonra bunu kesinlikle değiştirmeyin."), panel);
      if (answers.nextStep === "reassure") node("p", say("Reassurance from these images alone is not supported by this exercise. Published tissue evidence established the source diagnosis, including the benign examples.", "Bu egzersiz yalnızca bu görüntülerle güven vermeyi desteklemez. Benign örnekler dahil kaynak tanısını yayımlanmış doku kanıtı belirlemiştir."), panel);
      node("p", say("Teaching trap to examine: ", "İncelenecek düşünme tuzağı: ") + say(...traps.find(option => option[0] === item.trap).slice(1)), panel);
      node("p", say("Histopathology is reported by the source; this is not Docutis physician review. A photograph does not establish Breslow, TNM stage or an individual management plan.", "Histopatoloji kaynak tarafından bildirilmiştir; Docutis hekim incelemesi değildir. Fotoğraf Breslow, TNM evresi veya kişiye özel yönetim planını belirlemez."), panel);
      node("p", item.reference + " · " + item.pairingEvidence, panel);
      link(say("Open original article and evidence", "Özgün makaleyi ve kanıtı aç"), item.source, panel);
      let next;
      pick("reflection", "What could mislead you in this case?", "Bu vakada sizi ne yanıltabilir?", traps, panel, () => { next.disabled = !answers.reflection; });
      next = button("Save reflection and next case", "Değerlendirmeyi kaydet ve sonraki vaka", panel, () => {
        results.push({ item, answers: { ...answers }, revisit: answers.after !== item.diagnosis || answers.visibility !== "clear" || answers.confidenceAfter === "low" });
        index++; answers = {}; phase = "observe"; render(); focus();
      }); next.disabled = !answers.reflection;
    }
    button("Skip without saving or revealing", "Kaydetmeden ve tanıyı açmadan geç", root, () => { index++; answers = {}; phase = "observe"; render(); focus(); });
  }
  render();
  const language = document.getElementById("docutisLanguage");
  if (language) language.addEventListener("change", render);
})();
