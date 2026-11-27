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
  Object.assign(translations, {
    "to focus search": "aramaya odaklan",
    "Examples: melanoma, shingles, eczema, C43": "Örnekler: melanom, zona, egzama, C43",
    "Browse by category": "Kategoriye göre göz at",
    "Open any record for clinical features, dermoscopy, differential diagnosis, treatment, follow-up, coding and sources.": "Klinik bulgular, dermoskopi, ayırıcı tanı, tedavi, takip, kodlama ve kaynaklar için kaydı açın.",
    "No matching condition found.": "Eşleşen tanı bulunamadı.",
    "Try another name, alias, category or classification code.": "Başka bir ad, eş ad, kategori veya sınıflandırma kodu deneyin.",
    "This interactive section requires JavaScript.": "Bu etkileşimli bölüm için JavaScript gereklidir.",
    "Case-based screening practice": "Vaka temelli tarama pratiği",
    "Mixed-case screening training": "Karma vaka tarama eğitimi",
    "Unknown lesions from the case library, one at a time: look, commit to a working impression, open dermoscopy where it is stored, then reveal the source diagnosis and its verification. Training only. It is not a diagnostic device, an exam, or a certificate, and it gives no score. Sessions are curated for teaching coverage and do not reflect how often lesions occur.": "Vaka kütüphanesindeki lezyonları sırayla inceleyin. Ön izleniminizi seçin, mevcutsa dermoskopiyi açın ve ardından kaynaktaki tanı ile doğrulama bilgisini görün. Bu bir eğitim oturumudur. Oturumlar öğretim kapsamına göre seçilir ve lezyonların görülme sıklığını yansıtmaz.",
    "Training cannot run because JavaScript is unavailable. No diagnosis or teaching text is substituted.": "JavaScript kullanılamadığı için eğitim başlatılamıyor. Tanı ve eğitim metni gösterilemiyor.",
    "Educational steps only: inspect, observe, differential, reveal, then review. Learn Melanoma is an optional sequence, not a certificate and not a device. Cases are not clinical decision support. Image interpretation here is not physician attestation. The": "Eğitim adımları: incele, gözlemle, ayırıcı tanıyı değerlendir, tanıyı aç ve gözden geçir. Melanomu Öğren isteğe bağlı bir dizidir. Vakalar klinik karar desteği sağlamaz. Görüntü yorumları hekim onayı anlamına gelmez.",
    "reviewer workspace": "inceleme çalışma alanı",
    "contains answers and source diagnoses.": "yanıtları ve kaynakta bildirilen tanıları içerir.",
    "Cases cannot be shown because JavaScript is unavailable. No diagnosis, observation or teaching text is substituted. The published pilot cases remain clinician review required.": "JavaScript kullanılamadığı için vakalar gösterilemiyor. Yayımlanmış pilot vakalar hekim incelemesi bekliyor.",
    "Germany · guideline-based": "Almanya · kılavuz temelli",
    "Dermato-oncology follow-up": "Dermatoonkolojik takip",
    "Mixed review status": "Farklı inceleme durumları",
    "Structured German guideline-based follow-up for melanoma, basal cell carcinoma and cutaneous squamous cell carcinoma. This reference does not replace individual risk assessment, current guidelines or clinical judgment.": "Melanom, bazal hücreli karsinom ve kutanöz skuamöz hücreli karsinom için Alman kılavuzlarına dayalı yapılandırılmış takip bilgileri. Bireysel risk değerlendirmesi, güncel kılavuzlar ve klinik kararlar ayrıca dikkate alınmalıdır.",
    "Guideline wording or a cited source look wrong? Report the disease and stage shown on screen. No repository id is required.": "Kılavuz metninde veya kaynakta hata mı gördünüz? Ekrandaki hastalığı ve evreyi belirterek bildirin.",
    "Suggest a correction": "Düzeltme öner",
    "Report outdated evidence": "Güncelliğini yitirmiş kanıtı bildir",
    "Disease": "Hastalık", "Stage / risk group": "Evre / risk grubu",
    "Follow-up period or guidance": "Takip dönemi veya öneri",
    "Visual learning pilot": "Görsel eğitim pilotu",
    "Clinical Pattern Quiz": "Klinik Patern Testi",
    "Eight educational questions use only the structured pilot records and original Docutis schematics.": "Sekiz eğitim sorusu, yapılandırılmış pilot kayıtları ve Docutis çizimlerini kullanır.",
    "Educational pattern recognition only. This quiz is not clinical decision support and does not replace professional judgment. Check the review status shown with each quiz item.": "Patern tanıma eğitimidir. Soruların inceleme durumunu kontrol edin. Klinik kararlar için mesleki değerlendirmenizi ve güncel kaynakları kullanın.",
    "Question wording or a cited source look wrong? Report it without naming repository files.": "Soru veya kaynakta hata mı gördünüz? İlgili soruyu belirterek bildirin.",
    "Clinical transparency": "Klinik şeffaflık",
    "Evidence status": "Kanıt durumu",
    "Live coverage counts are calculated from the published records, follow-up protocols and governed media registry.": "Kapsam sayıları yayımlanan kayıtlardan, takip protokollerinden ve görsel kayıtlarından hesaplanır.",
    "What these states mean": "Bu durumlar ne anlama geliyor?",
    "Source metadata checked": "Kaynak üst verisi kontrol edildi",
    "Schema validated": "Veri yapısı doğrulandı",
    "Clinician reviewed": "Hekim tarafından incelendi",
    "The content remains educational draft material and has no current physician attestation.": "İçerik eğitim taslağıdır ve güncel hekim onayı bulunmuyor.",
    "The source identity and link metadata were rechecked; this does not verify every clinical statement.": "Kaynağın kimliği ve bağlantı bilgileri yeniden kontrol edildi. Klinik ifadelerin doğruluğu ayrıca değerlendirilmelidir.",
    "Automated checks found the expected data shape, controlled values and source relationships. Automated tests are not clinical review.": "Otomatik kontroller veri yapısını, izin verilen değerleri ve kaynak bağlantılarını doğruladı. Klinik inceleme ayrıca yapılır.",
    "A physician attestation is bound by a content fingerprint to one exact content version. Later clinical changes invalidate that attestation.": "Hekim onayı içeriğin belirli bir sürümüne bağlıdır. Daha sonraki klinik değişiklikler bu onayı geçersiz kılar.",
    "Docutis does not replace professional clinical judgment, diagnosis, treatment decisions or current guidelines.": "Docutis klinik değerlendirme, tanı, tedavi kararı veya güncel kılavuzların yerine geçmez.",
    "Machine-readable public review status (JSON)": "Makine tarafından okunabilir inceleme durumu (JSON)",
    "Found a problem in educational content? Open a sourced correction request. Do not include patient-identifiable information.": "Eğitim içeriğinde hata mı buldunuz? Kaynak göstererek düzeltme talebi açın. Hastayı tanımlayan bilgi eklemeyin.",
    "Include the affected record or page, the claim that needs attention, a verifiable source, and a proposed correction.": "İlgili kaydı veya sayfayı, incelenmesi gereken ifadeyi, doğrulanabilir kaynağı ve önerilen düzeltmeyi belirtin.",
    "Project status": "Proje durumu", "About Docutis": "Docutis hakkında",
    "Who this preview is for, and what it is not.": "Bu önizlemenin hedef kitlesi ve sınırları.",
    "What it is": "Nedir?", "Current status": "Güncel durum",
    "Limitations": "Sınırlamalar", "Open source": "Açık kaynak",
    "Public preview.": "Herkese açık önizleme.",
    "Not validated clinical decision support.": "Klinik karar desteği olarak doğrulanmamıştır.",
    "evidence dashboard": "kanıt panosu",
    "GitHub repository": "GitHub deposu", "Contributing guide": "Katkı rehberi",
    "Roadmap": "Yol haritası", "Changelog": "Değişiklik günlüğü",
    "Releases": "Sürümler", "Contributing": "Katkıda bulun",
    "About / status": "Hakkında / durum",
    "Medical Disclaimer:": "Tıbbi uyarı:",
    "Stadium aus Befund ermitteln": "Patoloji bulgusundan evreyi belirle",
    "Angabe im Befund": "Bulgudaki bilgi",
    "T-Kategorie (z. B. pT1b)": "T kategorisi (ör. pT1b)",
    "Breslow-Dicke und Ulzeration": "Breslow kalınlığı ve ülserasyon",
    "T-Kategorie": "T kategorisi",
    "Bitte wählen": "Lütfen seçin",
    "Breslow-Dicke (mm)": "Breslow kalınlığı (mm)",
    "Histologische Ulzeration": "Histolojik ülserasyon",
    "Unbekannt": "Bilinmiyor", "Nein": "Hayır", "Ja": "Evet",
    "Regionärer Status (N)": "Bölgesel durum (N)",
    "Fernmetastasen (M)": "Uzak metastaz (M)",
    "Unbekannt / unklar": "Bilinmiyor / belirsiz",
    "Resektionsstatus (für IIC-Nachsorge)": "Rezeksiyon durumu (IIC takibi için)",
    "Stadium anzeigen": "Evreyi göster",
    "Nachsorgegruppe ansehen": "Takip grubunu göster"
  });
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
