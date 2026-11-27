(function () {
  "use strict";

  const translations = {
    "Language": "Dil", "Skip to main content": "Ana içeriğe geç",
    "Training": "Eğitim", "Cases": "Vakalar", "Conditions": "Tanılar",
    "Follow-up": "Takip", "Quiz": "Test", "Clinical review": "Klinik inceleme",
    "About": "Hakkında", "Primary navigation": "Ana gezinme",
    "Docutis home": "Docutis ana sayfa",
    "Dermatology education and reference": "Dermatoloji eğitimi ve başvuru kaynağı",
    "Learn dermatology through cases.": "Dermatolojiyi vakalarla öğrenin.",
    "Work through lesion images step by step or find a condition in the reference library.": "Lezyon görsellerini adım adım inceleyin veya başvuru kütüphanesinde bir tanı arayın.",
    "Start mixed-case training": "Karma vaka eğitimine başla",
    "Browse clinical cases": "Klinik vakaları incele", "Find a condition": "Tanı ara",
    "Reference library": "Başvuru kütüphanesi",
    "Search conditions": "Tanılarda ara", "Search by condition, alias, category or code": "Tanı, eş ad, kategori veya kod ile ara",
    "Clear": "Temizle", "Current reference coverage": "Güncel kapsam",
    "Case-based learning": "Vaka temelli öğrenme", "Clinical cases": "Klinik vakalar",
    "Clinician review required": "Hekim incelemesi gerekli",
    "Dermoscopy pattern exercise": "Dermoskopi patern egzersizi",
    "Start with clinical impression": "Klinik ilk izlenimle başla",
    "Start pattern exercise": "Patern egzersizine başla",
    "Practise vessel patterns in pink lesions": "Pembe lezyonlarda damar paternlerini çalış",
    "What do you see?": "Ne görüyorsunuz?", "Visibility": "Görülebilirlik",
    "Choose visibility": "Görülebilirliği seç", "Clear": "Net",
    "Possible": "Olası", "Cannot assess": "Değerlendirilemiyor",
    "Image location": "Görseldeki konum", "Choose a region or tap the image": "Bir bölge seç veya görsele dokun",
    "Upper left": "Sol üst", "Upper center": "Üst orta", "Upper right": "Sağ üst",
    "Middle left": "Sol orta", "Center": "Merkez", "Middle right": "Sağ orta",
    "Lower left": "Sol alt", "Lower center": "Alt orta", "Lower right": "Sağ alt",
    "Exact point on image": "Görselde seçilen nokta",
    "Most influential finding": "En etkili bulgu", "Leading diagnosis": "Ön tanı",
    "Closest alternative": "En yakın alternatif", "Main uncertainty": "Temel belirsizlik",
    "Choose an answer": "Bir yanıt seç", "No selection": "Seçim yok",
    "Uneven network": "Düzensiz pigment ağı", "Uniform network": "Düzenli pigment ağı",
    "Dots or globules": "Noktalar veya globüller", "Structureless area": "Yapısız alan",
    "Regular parallel rows": "Düzenli paralel sıralar",
    "Irregular pigment distribution": "Düzensiz pigment dağılımı",
    "Vascular structures": "Damar yapıları", "Image detail": "Görüntü ayrıntısı",
    "Overlapping patterns": "Örtüşen paternler", "Missing history": "Eksik öykü",
    "No major uncertainty": "Belirgin belirsizlik yok",
    "Clinical photograph": "Klinik fotoğraf", "Your clinical impression": "Klinik ilk izleniminiz",
    "Which clinical feature guides your first impression?": "İlk izleniminizi hangi klinik bulgu yönlendiriyor?",
    "Colour variation": "Renk çeşitliliği", "Asymmetric outline": "Asimetrik sınır",
    "Uniform appearance": "Düzenli görünüm", "Surface change": "Yüzey değişikliği",
    "Pigment distribution": "Pigment dağılımı", "Vessel pattern": "Damar paterni",
    "Long branching vessels": "Uzun dallanan damarlar",
    "Dotted and short irregular vessels": "Noktasal ve kısa düzensiz damarlar",
    "Hairpin vessels": "Firkete damarlar", "Coiled vessels": "Kıvrımlı damarlar",
    "Reveal and compare": "Tanıyı aç ve karşılaştır",
    "Back to exercises": "Egzersizlere dön",
    "Compare the two cases": "İki vakayı karşılaştır",
    "Independent case": "Bağımsız vaka",
    "Open independent case": "Bağımsız vakayı aç",
    "Reveal the independent case": "Bağımsız vakanın tanısını aç",
    "Restart exercise": "Egzersizi yeniden başlat",
    "Show marks on dermoscopy": "Dermoskopide işaretleri göster",
    "Teaching marks · clinician review required": "Eğitici işaretler · hekim incelemesi gerekli",
    "Your findings": "Sizin bulgularınız", "Your reasoning": "Sizin akıl yürütmeniz",
    "What dermoscopy adds": "Dermoskopinin katkısı",
    "Show the worked comparison": "Açıklamalı karşılaştırmayı göster",
    "Shared finding": "Ortak bulgu", "Diagnostic pitfall": "Tanısal tuzak",
    "Limits of the image comparison": "Görsel karşılaştırmanın sınırları",
    "Save impression and open dermoscopy": "İlk izlenimi kaydet ve dermoskopiyi aç",
    "Save and open case 2": "Kaydet ve ikinci vakayı aç",
    "Compare both cases": "İki vakayı karşılaştır",
    "Review the first two cases": "İlk iki vakayı yeniden incele",
    "Return to independent case review": "Bağımsız vaka incelemesine dön",
    "Practise on another heel lesion": "Başka bir topuk lezyonunda çalış",
    "Compare the heel cases": "Topuk vakalarını karşılaştır",
    "Working diagnosis (or uncertain)": "Ön tanı (veya belirsiz)",
    "Closest alternative": "En yakın alternatif",
    "Next evidence to consider": "Değerlendirilecek sonraki kanıt",
    "Next step": "Sonraki adım", "Reveal diagnosis": "Tanıyı aç",
    "Show dermoscopy": "Dermoskopiyi göster",
    "Melanoma": "Melanom", "Melanoma in situ": "Melanom in situ",
    "Melanocytic nevus": "Melanositik nevüs",
    "Basal cell carcinoma": "Bazal hücreli karsinom",
    "Squamous cell carcinoma": "Skuamöz hücreli karsinom",
    "Actinic keratosis": "Aktinik keratoz",
    "Seborrhoeic keratosis": "Seboreik keratoz",
    "Bowen disease": "Bowen hastalığı",
    "Uncertain": "Belirsiz",
    "Premalignant Lesions": "Premalign lezyonlar",
    "Keratinocytic Malignancies": "Keratinositik maligniteler",
    "Melanocytic Malignancies": "Melanositik maligniteler",
    "Other Cutaneous Malignancies": "Diğer kutanöz maligniteler",
    "Inflammatory and Eczematous Disorders": "İnflamatuvar ve ekzematöz hastalıklar",
    "Acneiform and Sebaceous Disorders": "Akneiform ve sebase hastalıklar",
    "Pigmentary Disorders": "Pigmentasyon bozuklukları",
    "Infectious and Infestation Disorders": "Enfeksiyon ve enfestasyonlar",
    "Autoimmune, Connective-Tissue and Immunobullous Disorders": "Otoimmün, bağ dokusu ve immünobüllöz hastalıklar",
    "Hair and Nail Disorders": "Saç ve tırnak hastalıkları"
  };
  const original = new WeakMap();
  let language = "en";
  try { language = localStorage.getItem("docutis-language") === "tr" ? "tr" : "en"; } catch (error) { /* Storage may be disabled. */ }

  function translate(node) {
    if (node.nodeType === 3) {
      const value = node.nodeValue;
      if (!original.has(node)) original.set(node, value);
      const english = original.get(node);
      const trimmed = english.trim();
      if (translations[trimmed]) node.nodeValue = language === "tr"
        ? english.replace(trimmed, translations[trimmed]) : english;
      return;
    }
    if (node.nodeType !== 1 || ["SCRIPT", "STYLE"].includes(node.tagName)) return;
    ["placeholder", "aria-label", "title"].forEach(function (attribute) {
      const value = node.getAttribute(attribute);
      if (!value) return;
      const key = "data-original-" + attribute;
      const english = node.getAttribute(key) || value;
      if (translations[english]) {
        node.setAttribute(key, english);
        node.setAttribute(attribute, language === "tr" ? translations[english] : english);
      }
    });
    Array.from(node.childNodes).forEach(translate);
  }

  function applyLanguage() {
    document.documentElement.lang = language;
    document.title = language === "tr" ? "Docutis | Dermatoloji Eğitim ve Başvuru Kaynağı" : "Docutis | Dermatology Reference Toolkit";
    translate(document.body);
    const control = document.getElementById("docutisLanguage");
    if (control) control.value = language;
  }

  function start() {
    const control = document.getElementById("docutisLanguage");
    if (control) control.addEventListener("change", function () {
      language = control.value === "tr" ? "tr" : "en";
      try { localStorage.setItem("docutis-language", language); } catch (error) { /* Continue without persistence. */ }
      applyLanguage();
    });
    applyLanguage();
    new MutationObserver(function (records) {
      records.forEach(function (record) {
        record.addedNodes.forEach(translate);
        if (record.type === "characterData") translate(record.target);
      });
    }).observe(document.body, { subtree: true, childList: true, characterData: true });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
