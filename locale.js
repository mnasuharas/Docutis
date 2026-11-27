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
  Object.assign(translations, {
    "Quiz complete": "Test tamamlandı", "Restart quiz": "Testi yeniden başlat",
    "Check answer": "Yanıtı kontrol et", "Select an answer before checking.": "Kontrol etmeden önce bir yanıt seçin.",
    "Supporting sources": "Destekleyici kaynaklar", "Clinical review pending": "Klinik inceleme bekleniyor",
    "View score": "Sonucu gör", "Next question": "Sonraki soru",
    "Use the explanations and linked condition records to review each pattern. A score is not a measure of clinical competence.": "Her paterni açıklama ve ilgili tanı kaydıyla yeniden inceleyin. Test sonucu klinik yeterliliği ölçmez.",
    "Source notes": "Kaynak notları", "Teacher filters": "Eğitici filtreleri",
    "Reset case filters": "Vaka filtrelerini sıfırla",
    "Source page opens after the diagnosis is revealed.": "Kaynak sayfası tanı açıldıktan sonra görüntülenir.",
    "This image has no diagnosis-neutral public file. The stored filename was not used.": "Bu görselin tanıyı gizleyen herkese açık dosyası bulunmuyor.",
    "Zoom out": "Uzaklaştır", "Zoom in": "Yakınlaştır", "Reset zoom": "Yakınlaştırmayı sıfırla",
    "First impression, before you read a diagnosis": "Tanıyı görmeden önce ilk izlenim",
    "Self-assessment only. Not a device output, not a score, and not a diagnosis.": "Kendi değerlendirmeniz içindir. Tanı veya puan değildir.",
    "Hide dermoscopy": "Dermoskopiyi gizle", "Show dermoscopy": "Dermoskopiyi göster",
    "Clinical view": "Klinik görünüm", "Dermoscopic view": "Dermoskopik görünüm",
    "This frame is a clinical photograph. It is not a dermoscopic structure.": "Bu görsel klinik fotoğraftır.",
    "What the dermoscopic frame adds": "Dermoskopik görüntünün katkısı",
    "Clinical and dermoscopy, after the diagnosis": "Tanı sonrasında klinik ve dermoskopik görünüm",
    "Look for": "Dikkat edilecekler", "Hide hint": "İpucunu gizle",
    "Show a hint": "İpucu göster", "Patterns": "Paternler",
    "Patterns in this case": "Bu vakadaki paternler",
    "Observations": "Gözlemler", "Dermoscopic features": "Dermoskopik bulgular",
    "Interpretations": "Yorumlar",
    "Record your reasoning before the reveal": "Tanı açılmadan önce değerlendirmenizi seçin",
    "Compare your reasoning with the source": "Değerlendirmenizi kaynakla karşılaştırın",
    "Source evidence on record": "Kayıtlı kaynak kanıtı",
    "Educational next step for this case": "Bu vakanın eğitim açısından sonraki adımı",
    "Show recorded differentials": "Kayıtlı ayırıcı tanıları göster",
    "Unlabeled differential": "Adlandırılmamış ayırıcı tanı",
    "Clearly visible": "Net görülüyor", "Probably visible": "Olası",
    "Not assessable": "Değerlendirilemiyor",
    "Clinical photograph available": "Klinik fotoğraf mevcut",
    "Dermoscopy available": "Dermoskopi mevcut",
    "Paired clinical and dermoscopic": "Eşleşmiş klinik ve dermoskopik görseller",
    "Any view": "Tüm görünümler",
    "Teaching case": "Eğitici vaka", "Reasoning case": "Akıl yürütme vakası",
    "Expert-challenge case": "İleri düzey vaka",
    "Your impression": "Sizin izleniminiz",
    "Broad lesion family (optional)": "Geniş lezyon grubu (isteğe bağlı)",
    "Working diagnosis (optional). The same list is offered for every lesion.": "Ön tanı (isteğe bağlı). Her lezyonda aynı liste sunulur.",
    "No working diagnosis": "Ön tanı seçilmedi",
    "Most noticeable finding (optional)": "En belirgin bulgu (isteğe bağlı)",
    "Choose a finding": "Bir bulgu seçin",
    "Colour distribution": "Renk dağılımı", "Border": "Sınır",
    "Surface": "Yüzey", "Pigment pattern": "Pigment paterni",
    "Your description before the diagnosis": "Tanı açılmadan önce seçilen bulgu",
    "Most noticeable finding": "En belirgin bulgu",
    "The same list is offered for every lesion.": "Her lezyon için aynı seçenekler sunulur.",
    "Inspect both images. Select the vessel pattern and your leading diagnosis for each image.": "İki görüntüyü inceleyin. Her biri için damar paternini ve ön tanınızı seçin.",
    "Compare vessels in two pink lesions": "İki pembe lezyonda damarları karşılaştır",
    "Pink lesions · comparison": "Pembe lezyonlar · karşılaştırma",
    "Describe the vessels you can see.": "Gördüğünüz damarları seçin.",
    "Which diagnosis do you favour, and why?": "Ön tanınız hangisi?",
    "Your observations and reasoning": "Gözlemleriniz ve değerlendirmeniz",
    "Teaching observations · clinician review required": "Eğitici gözlemler · hekim incelemesi gerekli",
    "Which finding separates these cases?": "Bu vakaları hangi bulgu ayırıyor?",
    "Another heel lesion": "Başka bir topuk lezyonu",
    "Examine this second lesion before comparing it with the previous heel case.": "Önce ikinci lezyonu değerlendirin, sonra ilk topuk vakasıyla karşılaştırın.",
    "Compare the heel cases": "Topuk vakalarını karşılaştır",
    "Your assessment of the second lesion": "İkinci lezyon değerlendirmeniz",
    "What you wanted to check again": "Yeniden kontrol etmek istediğiniz bulgu",
    "What distinguishes these two images?": "İki görseli ne ayırıyor?",
    "Feature to check again (optional)": "Yeniden kontrol edilecek bulgu (isteğe bağlı)",
    "Pigment distribution": "Pigment dağılımı",
    "How much weight does the shared pattern carry?": "Ortak paternin tanısal ağırlığı nedir?",
    "Save impression and open dermoscopy": "İzlenimi kaydet ve dermoskopiyi aç",
    "Reinforced it": "İzlenimimi güçlendirdi",
    "Changed it": "İzlenimimi değiştirdi",
    "Still uncertain": "Hâlâ belirsiz",
    "How has dermoscopy changed or reinforced your impression?": "Dermoskopi ilk izleniminizi nasıl etkiledi?",
    "No major uncertainty": "Belirgin belirsizlik yok",
    "Site": "Yerleşim",
    "Source attachment and automated validation do not constitute physician endorsement.": "Kaynak bağlantısı ve otomatik doğrulama hekim onayı anlamına gelmez."
  });
  const variableTranslations = [
    [/^Question (\d+) of (\d+)$/, "Soru $1 / $2"],
    [/^(\d+) of (\d+) correct$/, "$2 sorudan $1 doğru"],
    [/^Finding (\d+)( \(optional\))?$/, "Bulgu $1$2"],
    [/^Place mark (\d+) on image$/, "Görsele $1. işareti yerleştir"],
    [/^Case (\d+) of (\d+)$/, "Vaka $1 / $2"],
    [/^Site: (.*)$/, "Yerleşim: $1"],
    [/^Pattern marking · Case (\d+) of (\d+)$/, "Patern işaretleme · Vaka $1 / $2"]
  ];
  function translated(value) {
    if (translations[value]) return translations[value];
    for (const [pattern, replacement] of variableTranslations) {
      if (pattern.test(value)) return value.replace(pattern, replacement);
    }
    return null;
  }
  const conditionNames = {
    "Actinic Keratosis": "Aktinik keratoz", "Actinic Cheilitis": "Aktinik keilit",
    "Porokeratosis": "Porokeratoz", "Basal Cell Carcinoma": "Bazal hücreli karsinom",
    "Cutaneous Squamous Cell Carcinoma": "Kutanöz skuamöz hücreli karsinom",
    "Squamous Cell Carcinoma in Situ": "Skuamöz hücreli karsinom in situ",
    "Keratoacanthoma": "Keratoakantom", "Cutaneous Melanoma": "Kutanöz melanom",
    "Lentigo Maligna": "Lentigo maligna", "Lentigo Maligna Melanoma": "Lentigo maligna melanomu",
    "Acral Melanoma": "Akral melanom", "Nodular Melanoma": "Nodüler melanom",
    "Desmoplastic Melanoma": "Desmoplastik melanom",
    "Merkel Cell Carcinoma": "Merkel hücreli karsinom",
    "Sebaceous Carcinoma": "Sebase karsinom",
    "Dermatofibrosarcoma Protuberans": "Dermatofibrosarkoma protuberans",
    "Atypical Fibroxanthoma": "Atipik fibrosantom",
    "Pleomorphic Dermal Sarcoma": "Pleomorfik dermal sarkom",
    "Cutaneous Angiosarcoma": "Kutanöz anjiyosarkom",
    "Kaposi Sarcoma": "Kaposi sarkomu",
    "Extramammary Paget Disease": "Ekstramammaryan Paget hastalığı",
    "Microcystic Adnexal Carcinoma": "Mikrokistik adneksiyal karsinom",
    "Eccrine Porocarcinoma": "Ekrin porokarsinom",
    "Mycosis Fungoides": "Mikozis fungoides", "Sézary Syndrome": "Sézary sendromu",
    "Primary Cutaneous Anaplastic Large-Cell Lymphoma": "Primer kutanöz anaplastik büyük hücreli lenfoma",
    "Atopic Dermatitis": "Atopik dermatit", "Contact Dermatitis": "Kontakt dermatit",
    "Seborrheic Dermatitis": "Seboreik dermatit", "Plaque Psoriasis": "Plak psoriazis",
    "Acne Vulgaris": "Akne vulgaris", "Rosacea": "Rozasea",
    "Chronic Urticaria": "Kronik ürtiker", "Vitiligo": "Vitiligo",
    "Impetigo": "İmpetigo", "Bacterial Folliculitis": "Bakteriyel folikülit",
    "Erysipelas": "Erizipel", "Erythrasma": "Eritrazma",
    "Tinea Corporis": "Tinea korporis", "Tinea Cruris": "Tinea kruris",
    "Tinea Pedis": "Tinea pedis", "Tinea Capitis": "Tinea kapitis",
    "Onychomycosis": "Onikomikoz", "Cutaneous Candidiasis": "Kutanöz kandidiyazis",
    "Pityriasis Versicolor": "Pitriyazis versikolor", "Scabies": "Uyuz",
    "Herpes Simplex": "Herpes simpleks", "Herpes Zoster": "Herpes zoster",
    "Molluscum Contagiosum": "Molluskum kontagiozum",
    "Cutaneous Warts": "Kutanöz siğiller", "Bullous Pemphigoid": "Büllöz pemfigoid",
    "Pemphigus Vulgaris": "Pemfigus vulgaris",
    "Discoid Lupus Erythematosus": "Diskoid lupus eritematozus",
    "Dermatomyositis": "Dermatomiyozit", "Lichen Planus": "Liken planus",
    "Alopecia Areata": "Alopesi areata",
    "Androgenetic Alopecia": "Androgenetik alopesi",
    "Mucous Membrane Pemphigoid": "Mukoz membran pemfigoidi",
    "Dermatitis Herpetiformis": "Dermatitis herpetiformis",
    "Nail Psoriasis": "Tırnak psoriazisi",
    "Chronic Paronychia": "Kronik paronişi",
    "Nail Lichen Planus": "Tırnak liken planusu"
  };
  Object.assign(translations, conditionNames, {
    "All conditions": "Tüm tanılar",
    "Overview": "Genel bakış", "Clinical features": "Klinik bulgular",
    "Dermoscopy": "Dermoskopi", "Differential": "Ayırıcı tanı",
    "Differential diagnosis": "Ayırıcı tanı", "Treatment": "Tedavi",
    "Treatment overview": "Tedaviye genel bakış",
    "Follow-up and escalation": "Takip ve ileri değerlendirme",
    "Classification and coding": "Sınıflandırma ve kodlama",
    "Diagnosis classification": "Tanı sınıflandırması",
    "Oncology context": "Onkolojik bağlam", "Sources": "Kaynaklar",
    "Educational media": "Eğitici görseller", "Learning path": "Öğrenme yolu",
    "Red flags": "Uyarıcı bulgular", "Referral / escalation": "Sevk / ileri değerlendirme",
    "Patient counseling": "Hasta bilgilendirmesi",
    "Non-pharmacological care": "İlaç dışı yaklaşım",
    "Close details": "Ayrıntıları kapat", "Alternative name": "Diğer ad",
    "Uncategorized": "Kategorisiz",
    "condition records": "tanı kaydı", "clinical categories": "klinik kategori",
    "oncology follow-up protocols": "onkolojik takip protokolü",
    "Media supports visual learning and does not replace clinical examination or histopathologic assessment.": "Görseller eğitimi destekler. Klinik muayene ve histopatolojik değerlendirme ayrıca gereklidir.",
    "Educational image unavailable. Source details remain below.": "Eğitici görsel kullanılamıyor. Kaynak bilgileri aşağıda yer alıyor."
  });
  window.DOCUTIS_LOCALE = Object.freeze({
    conditionName: function (name) { return conditionNames[name] || ""; }
  });
  Object.assign(translations, {
    "Asymmetric thickness": "Asimetrik kalınlık",
    "Notched border": "Çentikli sınır",
    "More than one dark color": "Birden fazla koyu renk",
    "Broad uneven brown patch": "Geniş, düzensiz kahverengi alan",
    "Darker focus at one edge": "Bir kenarda koyu odak",
    "Pale center inside a darker rim": "Koyu kenar içinde açık merkez",
    "Nodule touching a pigmented macule": "Pigmente maküle bitişik nodül",
    "Flat area with a raised dark focus": "Kabartılı koyu odak içeren düz alan",
    "Solitary dark papule": "Tek koyu papül",
    "Irregular brown patch": "Düzensiz kahverengi alan",
    "Pink nodule without brown pigment": "Kahverengi pigment içermeyen pembe nodül",
    "More than one vessel shape": "Birden fazla damar biçimi",
    "Destroyed nail plate": "Harap olmuş tırnak plağı",
    "Pigmented streak on the nail fold": "Tırnak kıvrımında pigmentli çizgi",
    "Small pink scaly spot": "Küçük pembe, skuamlı odak",
    "Small erosion": "Küçük erozyon",
    "Solitary shiny red papule": "Tek parlak kırmızı papül",
    "Surface vessels": "Yüzey damarları",
    "Crater or central plug": "Krater veya merkezî keratin tıkacı",
    "Arborizing vessels": "Dallanan damarlar",
    "Telangiectasia": "Telenjiektazi",
    "Maple-leaf-like areas": "Akçaağaç yaprağı benzeri alanlar",
    "Blue-gray ovoid nests": "Mavi gri oval yuvalar",
    "Change outside this frame": "Bu görüntü dışındaki değişim",
    "Measuring scale in the frame": "Görüntüde ölçüm cetveli",
    "Marker ink": "İşaret kalemi izi",
    "Printed pointer": "Basılı işaret oku",
    "Small brown macule": "Küçük kahverengi makül",
    "Rough stuck-on surface": "Pürtüklü, yapışık görünümlü yüzey",
    "Cerebriform ridges": "Serebriform sırtlar",
    "Flat brown macule": "Düz kahverengi makül",
    "Bright red papule": "Parlak kırmızı papül",
    "Blue papule or macule": "Mavi papül veya makül",
    "Grouped skin-colored papules": "Kümelenmiş deri renginde papüller",
    "Yellow-white lobules": "Sarı beyaz lobüller",
    "Atypical pigment network": "Atipik pigment ağı",
    "Parallel ridge pattern": "Paralel sırt paterni",
    "Parallel furrow pattern": "Paralel oluk paterni",
    "Gray dots around follicular openings": "Folikül açıklıkları çevresinde gri noktalar",
    "Facial pseudo-network": "Yüzde psödoağ",
    "Fibrillar pattern": "Fibriler patern",
    "Irregular acral pigmentation": "Düzensiz akral pigmentasyon",
    "Longitudinal pigmented lines in the nail plate": "Tırnak plağında boyuna pigmentli çizgiler",
    "Red to black structureless blood area": "Kırmızı siyah yapısız kanama alanı",
    "Printed circle and scale": "Basılı daire ve ölçek",
    "Thicker, darker central network": "Merkezde daha kalın ve koyu pigment ağı",
    "Fainter lines toward the edge": "Kenara doğru soluklaşan çizgiler",
    "Darker network near the center": "Merkeze yakın daha koyu pigment ağı",
    "Lighter lines above the center": "Merkezin üzerinde daha açık çizgiler",
    "Eccentric dark blotch": "Merkez dışı koyu leke",
    "Compare the central network with the lighter edge. Its unevenness raises concern in this image. The second case shows why the network alone cannot settle the differential.": "Merkezdeki pigment ağını açık renkli kenarla karşılaştırın. Bu görüntüde ağın düzensizliği şüphe uyandırır. İkinci vaka, ağın tek başına ayırıcı tanıyı sonuçlandırmadığını gösterir.",
    "The network varies across this lesion too. Air bubbles and hairs cross the field. The source reports a nevus with cytologic atypia despite the atypical network.": "Bu lezyonda da pigment ağı alanlar arasında değişir. Hava kabarcıkları ve kıllar görüntüyü örter. Kaynak, atipik ağa rağmen sitolojik atipili nevüs bildirmektedir.",
    "On this heel, the off-center blotch and uneven pigment carry the comparison. Broad parallel ridge bands are not visible in this frame. The source identifies the lesion as an acral melanoma, with histopathology documented at study level.": "Bu topuk lezyonunda merkez dışı koyu leke ve düzensiz pigment dağılımı karşılaştırmanın temel bulgularıdır. Geniş paralel sırt bantları bu görüntüde görülmez. Kaynak lezyonu akral melanom olarak tanımlar. Histopatoloji çalışmanın yöntemlerinde bildirilmiştir.",
    "Brown lines form a net, and the net is uneven: lines change in thickness or darkness from one part of the lesion to another, or the net ends abruptly. The ISD terminology consensus names the network as a basic structure. Atypia is a judgement about this net, not a diagnosis.": "Kahverengi çizgiler bir ağ oluşturur. Çizgilerin kalınlığı veya koyuluğu lezyonun farklı alanlarında değişir ya da ağ aniden sonlanır. Atipi, bu yapının görünümüne ilişkin bir yorumdur ve tek başına tanı değildir.",
    "Find the brown net first. Then compare its lines across the lesion. Say where they are thicker, darker, or missing.": "Önce kahverengi ağı bulun. Ardından çizgileri lezyon boyunca karşılaştırın. Kalın, koyu veya eksik oldukları alanları belirleyin.",
    "Your marks are numbered. Teaching marks begin with E and identify example regions. Compare the reasoning as well as the locations.": "İşaretleriniz numaralıdır. E ile başlayan eğitici işaretler örnek bölgeleri gösterir. Konumların yanı sıra değerlendirmeleri de karşılaştırın.",
    "Compare your leading diagnoses. Which finding is shared, and what could you distinguish from the images alone?": "Ön tanılarınızı karşılaştırın. Ortak bulgu hangisi? Yalnızca görsellerden neyi ayırt edebilirsiniz?",
    "Examine this second lesion before comparing it with the previous heel case.": "İlk topuk vakasıyla karşılaştırmadan önce ikinci lezyonu değerlendirin.",
    "The dermoscopic frame shows how the pigment is organized. The clinical frame shows only a small brown macule with a darker centre.": "Dermoskopik görüntü pigmentin düzenini gösterir. Klinik fotoğrafta yalnızca merkezi daha koyu küçük kahverengi bir makül izlenir."
  });
  const original = new WeakMap();
  let language = "en";
  try { language = localStorage.getItem("docutis-language") === "tr" ? "tr" : "en"; } catch (error) { /* Storage may be disabled. */ }

  function translate(node) {
    if (node.nodeType === 3) {
      const value = node.nodeValue;
      if (!original.has(node) ||
          (value !== original.get(node) && value !== translated(original.get(node)))) {
        original.set(node, value);
      }
      const english = original.get(node);
      const trimmed = english.trim();
      const result = translated(trimmed);
      if (result) node.nodeValue = language === "tr"
        ? english.replace(trimmed, result) : english;
      return;
    }
    if (node.nodeType !== 1 || ["SCRIPT", "STYLE"].includes(node.tagName)) return;
    ["placeholder", "aria-label", "title"].forEach(function (attribute) {
      const value = node.getAttribute(attribute);
      if (!value) return;
      const key = "data-original-" + attribute;
      const english = node.getAttribute(key) || value;
      if (translated(english)) {
        node.setAttribute(key, english);
        node.setAttribute(attribute, language === "tr" ? translated(english) : english);
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
