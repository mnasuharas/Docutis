/* Clinic follow-up view. Protocols stay in followup-data.js; this file only presents them. */
(function () {
  "use strict";

  const DISCLAIMER_TR = "Eğitim amaçlı taslak, hekim onayı bekliyor. Güncel kılavuzu esas alın.";
  const DISCLAIMER_EN = "Educational draft pending physician review. Use the current guideline.";

  function pair(en, tr) { return { en, tr }; }
  function line(item, lang) { return lang === "tr" ? item.tr : item.en; }

  const catalog = Object.freeze([
    { id: "cutaneous-melanoma", protocolId: "cutaneous-melanoma-de", en: "Cutaneous melanoma", tr: "Kutanöz melanom", aliases: "melanom melanoma" },
    { id: "lentigo-maligna", protocolId: "cutaneous-melanoma-de", groupId: "melanoma-in-situ", en: "Lentigo maligna (melanoma in situ)", tr: "Lentigo maligna (melanom in situ)", aliases: "lentigo maligna in situ", banner: pair("Lentigo maligna is melanoma in situ. German S3 version 3.3 does not define a Stage 0 interval table. The cells below are the existing in-situ record. Stage IA intervals are not copied onto lentigo maligna.", "Lentigo maligna melanom in situ'dur. Alman S3 sürüm 3.3 evre 0 için bir aralık tablosu tanımlamaz. Aşağıdaki hücreler mevcut in situ kaydıdır. Evre IA aralıkları lentigo maligna üzerine kopyalanmaz.") },
    { id: "basal-cell-carcinoma", protocolId: "basal-cell-carcinoma-de", en: "Basal cell carcinoma", tr: "Bazal hücreli karsinom", aliases: "bhk bcc basalzell bazal hucre bazal hücre" },
    { id: "cutaneous-squamous-cell-carcinoma", protocolId: "cutaneous-squamous-cell-carcinoma-de", en: "Cutaneous squamous cell carcinoma", tr: "Kutanöz skuamöz hücreli karsinom", aliases: "pec plattenepithel cscc yassi skuamoz" },
    { id: "actinic-keratosis", protocolId: "actinic-keratosis-de", en: "Actinic keratosis and field cancerization", tr: "Aktinik keratoz ve alan kanserizasyonu", aliases: "aktinik keratoz field cancerization feldkanzerisierung" },
    { id: "squamous-cell-carcinoma-in-situ", protocolId: "squamous-cell-carcinoma-in-situ-de", en: "Bowen disease / SCC in situ", tr: "Bowen hastalığı / in situ SHK", aliases: "bowen in situ morbus" },
    { id: "merkel-cell-carcinoma", protocolId: "merkel-cell-carcinoma-de", en: "Merkel cell carcinoma", tr: "Merkel hücreli karsinom", aliases: "merkelzell merkel" },
    { id: "dermatofibrosarcoma-protuberans", protocolId: "dermatofibrosarcoma-protuberans-de", en: "Dermatofibrosarcoma protuberans", tr: "Dermatofibrosarkoma protuberans", aliases: "dfsp dermatofibrosarkom" },
    {
      id: "high-risk-nevus",
      protocolId: null,
      en: "Dysplastic nevus syndrome and high-risk patients",
      tr: "Displastik nevüs sendromu ve yüksek riskli hastalar",
      aliases: "atipik nevus dysplastic family aile cok sayida nevus",
      sourceUrl: "https://www.leitlinienprogramm-onkologie.de/fileadmin/user_upload/Downloads/Leitlinien/Melanom/Melanom_Version_3/LL_Melanom_Langversion_3.3.pdf",
      sourceTitle: "S3-Leitlinie zur Diagnostik, Therapie und Nachsorge des Melanoms",
      sourceVersion: "3.3",
      sourcePublished: "2020-07",
      sourceRegister: "032/024OL",
      sourceLocation: "Recommendation 8.1 and the explanatory text on dysplastic nevus syndrome and familial melanoma",
      body: pair("No year-by-year table is stated for people who have not had a melanoma. Recommendation 8.1 is for someone who has had a melanoma: risk-adapted follow-up should last 10 years, then regular self-examination and an annual whole-body examination for a second melanoma. Explanatory text, not table 23: permanent half-yearly examinations (every 6 months) sollte übernommen werden at least for dysplastic nevus syndrome and familial melanoma. No imaging interval is stated.", "Melanom geçirmemiş kişiler için yıl yıl bir tablo belirtilmemiştir. Öneri 8.1 melanom geçirmiş kişi içindir: riske uyarlanmış takip 10 yıl sürmelidir; ardından ikinci bir melanom için düzenli kendi kendine muayene ve yılda bir tüm vücut muayenesi. Açıklayıcı metin, tablo 23 değil: displastik nevüs sendromu ve ailesel melanom için kalıcı olarak 6 ayda bir muayene (half-yearly) sollte übernommen werden. Görüntüleme aralığı belirtilmemiştir.")
    }
  ]);

  const GROUP_LABELS = Object.freeze({
    "melanoma-in-situ": pair("Melanoma in situ (Stage 0)", "Melanom in situ (evre 0)"),
    "stage-ia": pair("Stage IA", "Evre IA"),
    "stage-ib-iib": pair("Stages IB–IIB", "Evre IB–IIB"),
    "stage-iic-iv-r0": pair("Stages IIC–IV (R0 resected)", "Evre IIC–IV (R0 rezeke)"),
    "isolated-low-risk": pair("Isolated, low recurrence risk", "Tek lezyon, düşük nüks riski"),
    "intensive-risk-group": pair("Multiple / high risk / advanced / syndromic", "Çok sayıda / yüksek risk / ileri / sendromik"),
    "low-risk": pair("Low risk", "Düşük risk"),
    "high-risk": pair("High risk", "Yüksek risk"),
    "immunosuppressed": pair("Immunosuppression", "İmmünsüpresyon"),
    "locally-advanced-metastatic": pair("Locally advanced / metastatic", "Lokal ileri / metastatik"),
    "stage-i-ii": pair("Stage I–II", "Evre I–II"),
    "stage-iii-unclear-slnb": pair("Stage III or unclear sentinel-node status", "Evre III veya sentinel durumu belirsiz"),
    "no-numeric-schedule": pair("No numeric schedule", "Sayısal çizelge yok"),
    "no-separate-table": pair("No separate table", "Ayrı tablo yok"),
    "no-current-s3-s2k": pair("No current S3/S2k schedule", "Güncel S3/S2k çizelgesi yok")
  });

  const PERIOD_LABELS = Object.freeze({
    "years-1-3": pair("Years 1–3", "1–3. yıllar"),
    "years-4-5": pair("Years 4–5", "4–5. yıllar"),
    "years-6-10": pair("Years 6–10", "6–10. yıllar"),
    "years-1-2": pair("Years 1–2", "1–2. yıllar"),
    "years-3-5": pair("Years 3–5", "3–5. yıllar"),
    "year-3": pair("Year 3", "3. yıl"),
    "month-6": pair("6 months after treatment", "Tedaviden 6 ay sonra"),
    "thereafter": pair("Thereafter", "Sonrası"),
    "intensive-q3m-until-event-free": pair("Every 3 months until more than 2 event-free years", "3 ayda bir, 2 yıldan uzun süre olaysız kalana kadar"),
    "after-year-2-event-free": pair("After more than 2 event-free years", "2 yıldan uzun süredir olaysızsa"),
    "stage-0-guidance": pair("No Stage 0-specific S3 interval", "Evre 0 için ayrı bir S3 aralığı yok"),
    "no-fixed-interval": pair("No fixed interval", "Sabit aralık yok"),
    "from-year-6": pair("From year 6", "6. yıldan itibaren")
  });

  const MODALITIES = Object.freeze({
    clinical_examination: pair("Clinical examination", "Klinik muayene"),
    lymph_node_ultrasound: pair("Lymph-node ultrasound", "Lenf düğümü ultrasonu"),
    s100b: pair("S100B", "S100B"),
    cross_sectional_imaging: pair("Cross-sectional imaging", "Kesitsel görüntüleme")
  });

  const inSituVisits = [
    pair("Full-skin examination: German expert context, at least 1× per year. This is not an S3 stage-table row.", "Tam deri muayenesi: Alman uzman bağlamı, yılda en az 1 kez. Bu bir S3 evre tablosu satırı değildir."),
    pair("Scar and locoregional inspection: not specified as a separate Stage 0 table row.", "Skar ve lokorejyonel inspeksiyon: evre 0 tablosunda ayrı bir satır olarak belirtilmemiştir."),
    pair("Lymph-node palpation: not specified as a Stage 0 table row.", "Lenf düğümü palpasyonu: evre 0 tablosunda belirtilmemiştir."),
    pair("Dermoscopy of nevi: not specified in the S3 Nachsorge table.", "Nevüslerin dermatoskopisi: S3 Nachsorge tablosunda belirtilmemiştir."),
    pair("Self-examination: monthly skin self-examination is German expert context, not an S3 table row.", "Kendi kendine muayene: aylık deri muayenesi Alman uzman bağlamıdır, S3 tablo satırı değildir.")
  ];
  const melanomaVisits = [
    pair("Full-skin examination: inspection of the entire skin is part of the physical examination described for Nachsorge.", "Tam deri muayenesi: tüm derinin inspeksiyonu Nachsorge için tarif edilen fizik muayenenin parçasıdır."),
    pair("Scar and locoregional inspection: palpation of the primary scar, the in-transit path and the lymph-drainage region.", "Skar ve lokorejyonel inspeksiyon: primer skar, in-transit yol ve lenf drenaj bölgesinin palpasyonu."),
    pair("Lymph-node palpation: regional nodal basins are part of that examination.", "Lenf düğümü palpasyonu: bölgesel lenf istasyonları bu muayenenin parçasıdır."),
    pair("Dermoscopy of nevi: not specified in the S3 Nachsorge chapter.", "Nevüslerin dermatoskopisi: S3 Nachsorge bölümünde belirtilmemiştir."),
    pair("Self-examination: lifelong self-examination is stated, together with 10 years of follow-up for invasive melanoma.", "Kendi kendine muayene: yaşam boyu kendi kendine muayene belirtilmiştir; invaziv melanom için takip 10 yıldır.")
  ];
  const bccVisits = [
    pair("Full-skin examination: the visit is a clinical examination; a separate full-body script is not itemised beyond that.", "Tam deri muayenesi: ziyaret bir klinik muayenedir; bunun ötesinde ayrı bir tüm vücut metni maddelenmemiştir."),
    pair("Scar inspection: the 6-month visit is one examination to exclude local recurrence.", "Skar inspeksiyonu: 6. aydaki ziyaret lokal nüksü dışlamak için bir muayenedir."),
    pair("Lymph-node palpation: not specified as a fixed routine.", "Lenf düğümü palpasyonu: sabit bir rutin olarak belirtilmemiştir."),
    pair("Dermoscopy of nevi: not specified.", "Nevüslerin dermatoskopisi: belirtilmemiştir."),
    pair("Self-examination: regular self-examination is stated.", "Kendi kendine muayene: düzenli kendi kendine muayene belirtilmiştir.")
  ];
  const csccVisits = [
    pair("Full-skin examination: clinical examination includes full-skin inspection.", "Tam deri muayenesi: klinik muayene tüm derinin inspeksiyonunu içerir."),
    pair("Scar and locoregional inspection: inspection and palpation of the primary scar and the in-transit pathway.", "Skar ve lokorejyonel inspeksiyon: primer skar ve in-transit yolun inspeksiyon ve palpasyonu."),
    pair("Lymph-node palpation: regional lymph nodes are included in that examination.", "Lenf düğümü palpasyonu: bölgesel lenf düğümleri bu muayeneye dahildir."),
    pair("Dermoscopy of nevi: not specified in the numeric Nachsorge schema.", "Nevüslerin dermatoskopisi: sayısal Nachsorge şemasında belirtilmemiştir."),
    pair("Self-examination: not specified as a separate sentence in the numeric schema.", "Kendi kendine muayene: sayısal şemada ayrı bir cümle olarak belirtilmemiştir.")
  ];
  const mccVisits = [
    pair("Full-body skin examination: not specified as a separate sentence. The stated examination is locoregional.", "Tüm vücut deri muayenesi: ayrı bir cümle olarak belirtilmemiştir. Belirtilen muayene lokorejyoneldir."),
    pair("Scar and locoregional inspection: clinical examination of the locoregional skin is stated.", "Skar ve lokorejyonel inspeksiyon: lokorejyonel derinin klinik muayenesi belirtilmiştir."),
    pair("Lymph-node palpation: included in the clinical examination.", "Lenf düğümü palpasyonu: klinik muayeneye dahildir."),
    pair("Regional lymph-node ultrasound: included for stage I–II visits. Stage III ultrasound has no separate month number.", "Bölgesel lenf düğümü ultrasonu: evre I–II ziyaretlerine dahildir. Evre III ultrasonu için ayrı bir ay sayısı yoktur."),
    pair("Dermoscopy of nevi: not specified.", "Nevüslerin dermatoskopisi: belirtilmemiştir."),
    pair("Self-examination: patients shall be taught self-examination of the locoregional skin and lymph drainage pathways (soll).", "Kendi kendine muayene: hastalara lokorejyonel deri ve lenf drenaj yollarının kendi kendine muayenesi öğretilmelidir (soll).")
  ];
  const akVisits = [
    pair("Full-body, scar, lymph-node and dermoscopy steps: not specified, because no year-by-year visit table is stated.", "Tüm vücut, skar, lenf düğümü ve dermatoskopi adımları: belirtilmemiştir, çünkü yıl yıl bir ziyaret tablosu yoktur."),
    pair("Self-monitoring of a clinical field without actinic keratoses is stated, together with education and preventive measures. Statement 4.10 gives no generally accepted definition of field cancerization.", "Aktinik keratoz olmadan klinik bir alanın kendi kendine izlemi, eğitim ve önleyici önlemlerle birlikte belirtilmiştir. İfade 4.10 alan kanserizasyonu için genel kabul gören bir tanım vermez.")
  ];
  const bowenVisits = [
    pair("Visit steps and intervals: not specified in a separate table. Invasive cSCC rows, including any 6-month or 12-month figure, are not copied.", "Ziyaret adımları ve aralıklar: ayrı bir tabloda belirtilmemiştir. İnvaziv kSHK satırları, 6 aylık veya 12 aylık bir sayı dahil, kopyalanmaz.")
  ];
  const dfspVisits = [
    pair("Visit steps and intervals: not specified. No current S3 or S2k gives a number, and expired S1 numbers are not copied.", "Ziyaret adımları ve aralıklar: belirtilmemiştir. Güncel bir S3 veya S2k sayı vermez; süresi dolmuş S1 sayıları kopyalanmaz.")
  ];

  const redFlags = Object.freeze({
    "cutaneous-melanoma": pair("No separate red-flag catalogue is stated in the cited Nachsorge section. This page does not add one.", "Anılan Nachsorge bölümünde ayrı bir kırmızı bayrak listesi belirtilmemiştir. Bu sayfa liste eklemez."),
    "lentigo-maligna": pair("No separate red-flag catalogue is stated for melanoma in situ. This page does not add one.", "Melanom in situ için ayrı bir kırmızı bayrak listesi belirtilmemiştir. Bu sayfa liste eklemez."),
    "basal-cell-carcinoma": pair("A new BCC or recurrence does not automatically qualify for the reduced annual frequency. Continue every 3 months until more than 2 years without a new BCC or recurrence.", "Yeni bir BHK veya nüks, kendiliğinden azaltılmış yıllık sıklığa hak kazandırmaz. Her 3 ayda bir sürdürün, yeni BHK veya nüks olmadan 2 yıldan uzun süreye kadar."),
    "cutaneous-squamous-cell-carcinoma": pair("No separate red-flag catalogue is stated. Findings suspicious for metastasis are diagnostic work-up, not a fixed surveillance interval.", "Ayrı bir kırmızı bayrak listesi belirtilmemiştir. Metastaz kuşkusu veren bulgular tanısal incelemedir, sabit bir izlem aralığı değildir."),
    "actinic-keratosis": pair("No red-flag interval is stated. Do not borrow the invasive SCC timetable.", "Bir kırmızı bayrak aralığı belirtilmemiştir. İnvaziv SHK çizelgesi ödünç alınmaz."),
    "squamous-cell-carcinoma-in-situ": pair("No separate red-flag list is stated for Bowen disease or SCC in situ.", "Bowen hastalığı veya in situ SHK için ayrı bir kırmızı bayrak listesi belirtilmemiştir."),
    "merkel-cell-carcinoma": pair("The 2022 Nachsorge chapter does not publish a separate red-flag catalogue. If a recurrence has occurred, the text does not authorize stepping down to the longer interval.", "2022 Nachsorge bölümü ayrı bir kırmızı bayrak listesi yayımlamaz. Nüks olduysa metin, daha uzun aralığa geçmeye izin vermez."),
    "dermatofibrosarcoma-protuberans": pair("No current S3 or S2k red-flag interval is stated.", "Güncel bir S3 veya S2k kırmızı bayrak aralığı belirtilmemiştir."),
    "high-risk-nevus": pair("No red-flag catalogue is stated for this explanatory note.", "Bu açıklayıcı not için bir kırmızı bayrak listesi belirtilmemiştir.")
  });

  const education = Object.freeze({
    "cutaneous-melanoma": pair("Lifelong self-examination is stated for invasive melanoma. A separate sun-protection script is not in the structured Nachsorge table.", "İnvaziv melanom için yaşam boyu kendi kendine muayene belirtilmiştir. Yapılandırılmış Nachsorge tablosunda ayrı bir güneşten korunma metni yoktur."),
    "lentigo-maligna": pair("Monthly skin self-examination is German expert context for melanoma in situ. A separate sun-protection script is not an S3 stage-table row.", "Aylık deri kendi kendine muayenesi melanom in situ için Alman uzman bağlamıdır. Ayrı bir güneşten korunma metni bir S3 evre tablosu satırı değildir."),
    "basal-cell-carcinoma": pair("Regular self-examination is stated. UV protection should be discussed, with particular emphasis on BCC syndromes or chronic immunosuppression.", "Düzenli kendi kendine muayene belirtilmiştir. UV korunması konuşulmalıdır; BHK sendromları veya kronik immünsüpresyon özellikle vurgulanır."),
    "cutaneous-squamous-cell-carcinoma": pair("A separate sun-protection or self-examination script is not in the numeric schema. Chest radiography and abdominal ultrasound are not routine follow-up.", "Sayısal şemada ayrı bir güneşten korunma veya kendi kendine muayene metni yoktur. Akciğer grafisi ve batın ultrasonu rutin takip değildir."),
    "actinic-keratosis": pair("If a clinical field is present without actinic keratoses: education, preventive measures and patient self-monitoring of the field. No interval number is attached.", "Aktinik keratoz olmadan klinik bir alan varsa: eğitim, önleyici önlemler ve alanın hasta tarafından izlenmesi. Bir aralık sayısı bağlanmamıştır."),
    "squamous-cell-carcinoma-in-situ": pair("A separate patient-education script with an interval is not stated.", "Aralık içeren ayrı bir hasta eğitimi metni belirtilmemiştir."),
    "merkel-cell-carcinoma": pair("Teach self-examination of the locoregional skin and lymph drainage pathways (soll). A separate sun-protection interval is not stated.", "Lokorejyonel deri ve lenf drenaj yollarının kendi kendine muayenesi öğretilir (soll). Ayrı bir güneşten korunma aralığı belirtilmemiştir."),
    "dermatofibrosarcoma-protuberans": pair("No current S3 or S2k patient-education interval is stated.", "Güncel bir S3 veya S2k hasta eğitimi aralığı belirtilmemiştir."),
    "high-risk-nevus": pair("Self-examination is part of recommendation 8.1 after a melanoma, and of the explanatory half-yearly sentence for dysplastic nevus syndrome and familial melanoma. No separate sun-protection interval is stated.", "Kendi kendine muayene, melanom sonrası öneri 8.1'in ve displastik nevüs sendromu ile ailesel melanom için açıklayıcı half-yearly cümlenin parçasıdır. Ayrı bir güneşten korunma aralığı belirtilmemiştir.")
  });

  const NOTE_TR = Object.freeze({
    "Formal German S3 surveillance tables begin at Stage IA. German expert information for melanoma in situ separately supports dermatology follow-up at least annually, with shorter intervals for multiple or atypical nevi, a previous melanoma, relevant family history or other clinically significant melanoma-risk features.": "Resmi Alman S3 izlem tabloları evre IA ile başlar. Melanom in situ için Alman uzman bilgisi, çok sayıda veya atipik nevüs, geçirilmiş melanom, ilgili aile öyküsü ya da klinik olarak anlamlı başka melanom risk özellikleri varsa daha kısa aralıklarla, en az yılda bir dermatoloji takibini ayrıca destekler.",
    "Monthly skin self-examination should be encouraged, with help for difficult-to-see areas when needed.": "Aylık deri kendi kendine muayenesi teşvik edilmelidir; zor görülen bölgeler için gerektiğinde yardım alınmalıdır.",
    "American Academy of Dermatology guidance supports ongoing dermatologist-led complete skin examinations after melanoma, with frequency individualized by stage and risk and at least annual examinations after more frequent follow-up ends. This context does not replace or extend the German S3 Stage 0 schedule.": "American Academy of Dermatology rehberi, melanom sonrası dermatolog tarafından tam deri muayenesinin sürmesini destekler; sıklık evre ve riske göre bireyselleştirilir ve daha sık takip bittikten sonra en az yılda birdir. Bu bağlam Alman S3 evre 0 çizelgesinin yerine geçmez ve onu genişletmez.",
    "The absence of a Stage 0-specific S3 schedule does not mean that dermatologic surveillance is unnecessary, and the Stage IA schedule must not be extrapolated to Stage 0.": "Evre 0 için ayrı bir S3 çizelgesinin olmaması dermatolojik izlemin gereksiz olduğu anlamına gelmez ve evre IA çizelgesi evre 0 için kullanılmamalıdır.",
    "Regular dermatologic surveillance is appropriate. German expert information supports at least annual full-skin examination, with shorter intervals when additional melanoma risk factors are present.": "Düzenli dermatolojik izlem uygundur. Alman uzman bilgisi, ek melanom risk faktörleri varsa daha kısa aralıklarla, en az yılda bir tam deri muayenesini destekler.",
    "Not routinely recommended for Stage 0. The German S3 risk-adapted algorithm assigns ultrasound only in selected invasive-stage groups.": "Evre 0 için rutin önerilmez. Alman S3 riske uyarlanmış algoritma ultrasonu yalnızca seçilmiş invaziv evre gruplarına yazar.",
    "Not routinely recommended for Stage 0. The German S3 risk-adapted algorithm assigns S100B only in selected invasive-stage groups.": "Evre 0 için rutin önerilmez. Alman S3 riske uyarlanmış algoritma S100B'yi yalnızca seçilmiş invaziv evre gruplarına yazar.",
    "Not routinely recommended in asymptomatic Stage 0 patients. Symptoms or another clinical indication require diagnostic assessment outside routine surveillance.": "Asemptomatik evre 0 hastalarda rutin önerilmez. Belirtiler veya başka bir klinik endikasyon, rutin izlem dışında tanısal değerlendirme gerektirir.",
    "The German guideline recommends 10 years of follow-up for invasive melanoma and lifelong self-examination.": "Alman kılavuzu invaziv melanom için 10 yıllık takip ve yaşam boyu kendi kendine muayene önerir.",
    "Only after correct pathological staging with sentinel lymph node biopsy; otherwise use the stage IIC schedule.": "Yalnızca sentinel lenf düğümü biyopsisi ile doğru patolojik evrelemeden sonra; aksi halde evre IIC çizelgesini kullanın.",
    "The guideline recommends regular self-examination. Patients should be counselled on UV protection, with particular emphasis on patients with BCC syndromes or chronic immunosuppression. Other modalities are not assigned fixed routine intervals in the follow-up section. Chronic immunosuppression does not create a separate numerical follow-up schedule in this protocol.": "Kılavuz düzenli kendi kendine muayene önerir. Hastalara UV korunması anlatılmalıdır; BHK sendromu veya kronik immünsüpresyonu olanlar özellikle vurgulanır. Diğer yöntemlere takip bölümünde sabit rutin aralıklar yazılmamıştır. Kronik immünsüpresyon bu protokolde ayrı bir sayısal takip çizelgesi oluşturmaz.",
    "One examination to exclude local recurrence.": "Lokal nüksü dışlamak için bir muayene.",
    "Closer follow-up may be required on an individual basis.": "Bireysel olarak daha sık takip gerekebilir.",
    "Continue every 3 months until more than 2 years without a new BCC or recurrence; do not transition to annual merely because two calendar years have elapsed.": "Her 3 ayda bir sürdürün, yeni BHK veya nüks olmadan 2 yıldan uzun süreye kadar; yalnızca iki takvim yılı geçti diye yıllık takibe geçmeyin.",
    "A new BCC or recurrence does not automatically qualify for this reduced frequency.": "Yeni bir BHK veya nüks, kendiliğinden bu azaltılmış sıklığa hak kazandırmaz.",
    "Only if no new BCC or recurrence has occurred for more than 2 years.": "Yalnızca 2 yıldan uzun süredir yeni BHK veya nüks olmadıysa.",
    "Clinical examination includes full-skin inspection and inspection and palpation of the primary scar, in-transit pathway and regional lymph nodes.": "Klinik muayene tüm derinin inspeksiyonunu ve primer skar, in-transit yol ile bölgesel lenf düğümlerinin inspeksiyon ve palpasyonunu içerir.",
    "Chest radiography and abdominal ultrasound are not intended as routine follow-up.": "Akciğer grafisi ve batın ultrasonu rutin takip olarak amaçlanmamıştır.",
    "Not a fixed routine for every low-risk situation; use for an unclear palpation finding.": "Her düşük riskli durum için sabit bir rutin değildir; palpasyon bulgusu belirsizse kullanın.",
    "The schedule does not specify routine imaging.": "Çizelge rutin görüntüleme belirtmez.",
    "The schedule does not specify a routine interval.": "Çizelge rutin bir aralık belirtmez.",
    "The schedule does not specify a fixed tumor-specific interval for this group.": "Çizelge bu grup için sabit, tümöre özgü bir aralık belirtmez.",
    "Frequency depends on risk factors.": "Sıklık risk faktörlerine bağlıdır.",
    "The schedule interval applies to perineural tumor growth. For findings suspicious for metastasis, imaging is diagnostic work-up rather than a fixed routine interval.": "Çizelge aralığı perinöral tümör büyümesi için geçerlidir. Metastaz kuşkusu veren bulgularda görüntüleme, sabit bir rutin aralık değil tanısal incelemedir.",
    "Depends on risk factors.": "Risk faktörlerine bağlıdır.",
    "The schedule does not specify routine imaging from year 4 onward.": "Çizelge 4. yıldan itibaren rutin görüntüleme belirtmez.",
    "According to the individual risk profile.": "Bireysel risk profiline göre.",
    "After locally advanced or metastatic cSCC; also for diagnostic work-up of findings suspicious for metastasis.": "Lokal ileri veya metastatik kSHK sonrası; ayrıca metastaz kuşkusu veren bulguların tanısal incelemesi için.",
    "Patients shall be taught self-examination of the locoregional skin and lymph drainage pathways (soll).": "Hastalara lokorejyonel deri ve lenf drenaj yollarının kendi kendine muayenesi öğretilmelidir (soll).",
    "The 2022 Nachsorge chapter does not publish a separate red-flag catalogue. If a recurrence has occurred, the text does not authorize stepping down to the longer interval.": "2022 Nachsorge bölümü ayrı bir kırmızı bayrak listesi yayımlamaz. Nüks olduysa metin, daha uzun aralığa geçmeye izin vermez.",
    "Immunosuppression may require the interval to be adjusted. No alternate number is stated.": "İmmünsüpresyon aralığın ayarlanmasını gerektirebilir. Alternatif bir sayı belirtilmemiştir.",
    "No published scientifically secured studies on Merkel-cell follow-up are cited. Intervals follow the 2022 recommendation sentences and are not taken from the expired 2018 text.": "Merkel hücresi takibi için yayımlanmış, bilimsel olarak güvenceye alınmış bir çalışma anılmaz. Aralıklar 2022 öneri cümlelerini izler ve süresi dolmuş 2018 metninden alınmaz.",
    "Stage I–II visits include clinical examination with lymph-node palpation and regional lymph-node ultrasound.": "Evre I–II ziyaretleri, lenf düğümü palpasyonu ve bölgesel lenf düğümü ultrasonu ile klinik muayeneyi içerir.",
    "Every 3 months for the first 2 years (soll).": "Her 3 ayda bir, ilk 2 yıl (soll).",
    "Included in the stage I–II visit description (sollte).": "Evre I–II ziyaret tarifine dahildir (sollte).",
    "S100B is not assigned in the 2022 Nachsorge section.": "S100B, 2022 Nachsorge bölümünde atanmamıştır.",
    "Negative sentinel node: cross-sectional imaging may be used once a year (kann).": "Negatif sentinel düğüm: kesitsel görüntüleme yılda bir kez kullanılabilir (kann).",
    "From year 3, every 6 months for a further 3 years is kann, and only if no recurrence has occurred.": "3. yıldan itibaren her 6 ayda bir, ek 3 yıl, yalnızca nüks yoksa kann'dır.",
    "After year 5 the 2022 text says controls may be needs-based (kann, bedarfsorientiert). No fixed interval is stated.": "5. yıldan sonra 2022 metni kontrollerin gereksinime göre olabileceğini söyler (kann, bedarfsorientiert). Sabit bir aralık belirtilmemiştir.",
    "Stage III, or sentinel-node status unclear. Optional cross-sectional imaging in the first 2 years has no month number in the 2022 recommendation sentence.": "Evre III veya sentinel düğüm durumu belirsiz. İlk 2 yıldaki isteğe bağlı kesitsel görüntülemenin 2022 öneri cümlesinde ay sayısı yoktur.",
    "The visit sentence that pairs palpation with regional ultrasound is written for stage I–II. No separate month interval is stated for stage III ultrasound.": "Palpasyonu bölgesel ultrasonla eşleyen ziyaret cümlesi evre I–II için yazılmıştır. Evre III ultrasonu için ayrı bir ay aralığı belirtilmemiştir.",
    "Optional close cross-sectional imaging in the first 2 years (kann): 18-FDG-PET/CT, or ultrasound plus CT and MRI. No month interval is stated.": "İlk 2 yılda isteğe bağlı yakın kesitsel görüntüleme (kann): 18-FDG-PET/CT veya ultrason artı BT ve MR. Ay aralığı belirtilmemiştir.",
    "No cross-sectional interval is stated for this later period.": "Bu sonraki dönem için kesitsel bir aralık belirtilmemiştir.",
    "The invasive cutaneous SCC rows are not copied onto actinic keratosis.": "İnvaziv kutanöz SHK satırları aktinik keratoza kopyalanmaz.",
    "The S3 numeric Nachsorge schema is defined for invasive cutaneous squamous cell carcinoma. It is not a schedule for uncomplicated actinic keratosis or for field cancerization. Statement 4.10: there is no generally accepted definition of field cancerization. If a clinical field is present without actinic keratoses, the text recommends education, preventive measures and patient self-monitoring of the field. No year-by-year interval is stated.": "S3 sayısal Nachsorge şeması invaziv kutanöz skuamöz hücreli karsinom için tanımlanmıştır. Komplike olmayan aktinik keratoz veya alan kanserizasyonu için bir çizelge değildir. İfade 4.10: alan kanserizasyonunun genel kabul gören bir tanımı yoktur. Aktinik keratoz olmadan klinik bir alan varsa metin eğitim, önleyici önlemler ve alanın hasta tarafından izlenmesini önerir. Yıl yıl bir aralık belirtilmemiştir.",
    "Invasive cSCC intervals are not extrapolated to SCC in situ.": "İnvaziv kSHK aralıkları in situ SHK için genişletilmez.",
    "No separate year-by-year table for Bowen disease or squamous-cell carcinoma in situ was identified in S3 version 2.0. The numeric schema uses invasive features such as thickness, grade, desmoplasia and perineural growth. Those invasive rows are not copied here.": "S3 sürüm 2.0 içinde Bowen hastalığı veya in situ skuamöz hücreli karsinom için ayrı bir yıl yıl tablo bulunmadı. Sayısal şema kalınlık, derece, desmoplazi ve perinöral büyüme gibi invaziv özellikleri kullanır. Bu invaziv satırlar buraya kopyalanmaz.",
    "Expired S1 intervals are intentionally absent.": "Süresi dolmuş S1 aralıkları bilerek yoktur.",
    "No current AWMF S3 or S2k states a follow-up interval. Register 032-026 is an S1 whose validity ended on 22 August 2023 and which is in revision. Intervals from that expired S1 are not copied into this table.": "Güncel bir AWMF S3 veya S2k takip aralığı belirtmez. Kayıt 032-026 bir S1'dir; geçerliliği 22 Ağustos 2023'te bitmiştir ve revizyondadır. Süresi dolmuş bu S1'in aralıkları bu tabloya kopyalanmaz.",
    "German S3 follow-up schedule: No Stage 0-specific structured follow-up interval is defined. The formal risk-adapted follow-up tables begin with Stage IA.": "Alman S3 takip çizelgesi: Evre 0 için yapılandırılmış bir takip aralığı tanımlanmamıştır. Resmi riske uyarlanmış takip tabloları evre IA ile başlar.",
    "Cutaneous melanoma, stage IA.": "Kutanöz melanom, evre IA.",
    "Stages IB through IIB; the ultrasound recommendation assumes correct pathological staging with sentinel lymph node biopsy.": "Evre IB ile IIB; ultrason önerisi sentinel lenf düğümü biyopsisi ile doğru patolojik evrelemeyi varsayar.",
    "Completely resected disease (R0) only; active metastatic disease requires an individualized treatment and monitoring plan.": "Yalnızca tam rezeke (R0) hastalık; aktif metastatik hastalık bireysel bir tedavi ve izlem planı gerektirir.",
    "Isolated, surgically treated BCC with a low risk of recurrence.": "Cerrahi tedavi edilmiş, nüks riski düşük, tek bir BHK.",
    "The guideline combines multiple BCCs, high recurrence risk, locally advanced BCC, metastatic BCC and syndromes in one follow-up recommendation.": "Kılavuz çok sayıda BHK, yüksek nüks riski, lokal ileri BHK, metastatik BHK ve sendromları tek bir takip önerisinde birleştirir.",
    "R0-resected primary tumor: tumor thickness ≤ 6 mm, or ≤ 4 mm with desmoplasia, and differentiation grade G1–2.": "R0 rezeke primer tümör: tümör kalınlığı ≤ 6 mm veya desmoplazi ile ≤ 4 mm ve diferansiyasyon derecesi G1–2.",
    "R0-resected primary tumor with tumor thickness > 6 mm, > 4 mm with desmoplasia, differentiation grade G3–4 or perineural tumor growth; the guideline also lists immunosuppression and secondary tumors as high-risk factors.": "R0 rezeke primer tümör, tümör kalınlığı > 6 mm, desmoplazi ile > 4 mm, diferansiyasyon derecesi G3–4 veya perinöral tümör büyümesi; kılavuz immünsüpresyonu ve ikincil tümörleri de yüksek risk faktörü sayar.",
    "Patients receiving immunosuppression; the individual risk profile determines the frequency range.": "İmmünsüpresyon alan hastalar; sıklık aralığını bireysel risk profili belirler.",
    "Locally advanced or metastatic disease; interdisciplinary individualization remains necessary.": "Lokal ileri veya metastatik hastalık; disiplinler arası bireyselleştirme gerekli kalır.",
    "Locoregional follow-up for stage I–II. The 3-month interval is soll for the first 2 years.": "Evre I–II için lokorejyonel takip. 3 aylık aralık ilk 2 yıl için soll'dur.",
    "The general 3-month then 6-month clinical interval still applies. Imaging in the first 2 years is optional and has no month number.": "Genel 3 aylık, sonra 6 aylık klinik aralık geçerlidir. İlk 2 yıldaki görüntüleme isteğe bağlıdır ve ay sayısı yoktur.",
    "Uncomplicated actinic keratosis and field cancerization have no year-by-year Nachsorge table in this S3.": "Komplike olmayan aktinik keratoz ve alan kanserizasyonunun bu S3 içinde yıl yıl bir Nachsorge tablosu yoktur.",
    "Bowen disease and squamous-cell carcinoma in situ have no separate year-by-year table in S3 version 2.0.": "Bowen hastalığı ve in situ skuamöz hücreli karsinomun S3 sürüm 2.0 içinde ayrı bir yıl yıl tablosu yoktur.",
    "No current AWMF S3 or S2k states a DFSP follow-up interval.": "Güncel bir AWMF S3 veya S2k, DFSP için bir takip aralığı belirtmez.",
    "German clinical-practice context": "Alman klinik uygulama bağlamı",
    "Self-examination": "Kendi kendine muayene",
    "International context": "Uluslararası bağlam"
  });

  function lang() { return document.documentElement && document.documentElement.lang === "tr" ? "tr" : "en"; }
  function say(en, tr) { return lang() === "tr" ? tr : en; }
  function labelOf(map, id, fallback) {
    const item = map[id];
    return item ? line(item, lang()) : fallback;
  }
  function numericTokens(value) {
    return [...String(value).matchAll(/\d+(?:[.,]\d+)?/g)].map(match => match[0].replace(",", "."));
  }
  function noteText(note, language) {
    if (!note) return "";
    if (language === "tr" && NOTE_TR[note]) return NOTE_TR[note];
    return note;
  }
  function frequencyText(frequency, language) {
    const tr = language === "tr";
    if (!frequency) return tr ? "Belirtilmemiş" : "Not specified";
    if (frequency.kind === "single_timepoint_month") return tr ? `${frequency.month}. ayda bir kez` : `Once at ${frequency.month} months`;
    if (frequency.kind === "interval_months") {
      if (frequency.min === frequency.max) return tr ? `${frequency.min} ayda bir` : `Every ${frequency.min} months`;
      return tr ? `${frequency.min}–${frequency.max} ayda bir` : `Every ${frequency.min}–${frequency.max} months`;
    }
    if (frequency.kind === "occurrences_per_year") {
      if (frequency.min === frequency.max) return tr ? `Yılda ${frequency.min} kez` : `${frequency.min}× per year`;
      return tr ? `Yılda ${frequency.min}–${frequency.max} kez` : `${frequency.min}–${frequency.max}× per year`;
    }
    if (frequency.kind === "minimum_occurrences_per_year") return tr ? `Yılda en az ${frequency.min} kez` : `At least ${frequency.min}× per year`;
    return tr ? "Belirtilmemiş" : "Not specified";
  }
  function normalize(value) {
    const fold = window.DOCUTIS_SEARCH && window.DOCUTIS_SEARCH.normalize;
    if (fold) return fold(value);
    return String(value)
      .replace(/İ/g, "i").replace(/ı/g, "i")
      .replace(/[Şş]/g, "s").replace(/[Ğğ]/g, "g").replace(/[Çç]/g, "c")
      .replace(/[Öö]/g, "o").replace(/[Üü]/g, "u")
      .normalize("NFKD").replace(/\p{M}/gu, "").toLocaleLowerCase("en")
      .replace(/[‐‑‒–—-]/g, " ").replace(/[’‘]/g, "'").replace(/\s+/g, " ").trim();
  }
  function protocols() { return window.DOCUTIS_FOLLOW_UP_DATA?.protocols || []; }
  function protocolFor(entry) { return entry && entry.protocolId ? protocols().find(item => item.id === entry.protocolId) || null : null; }
  function entryById(id) { return catalog.find(item => item.id === id) || null; }
  function matches(entry, query) {
    if (!query) return true;
    const haystack = normalize([entry.en, entry.tr, entry.aliases, entry.id].filter(Boolean).join(" "));
    return query.split(" ").every(part => haystack.includes(part));
  }
  function pairedCopy() {
    const items = [...inSituVisits, ...melanomaVisits, ...bccVisits, ...csccVisits, ...mccVisits, ...akVisits, ...bowenVisits, ...dfspVisits];
    catalog.forEach(entry => { if (entry.banner) items.push(entry.banner); if (entry.body) items.push(entry.body); });
    Object.values(redFlags).forEach(item => items.push(item));
    Object.values(education).forEach(item => items.push(item));
    Object.values(GROUP_LABELS).forEach(item => items.push(item));
    Object.values(PERIOD_LABELS).forEach(item => items.push(item));
    return items;
  }
  function visitsFor(entry, groupId) {
    if (!entry) return [];
    if (entry.id === "lentigo-maligna" || groupId === "melanoma-in-situ") return inSituVisits;
    if (entry.id === "cutaneous-melanoma") return melanomaVisits;
    if (entry.id === "basal-cell-carcinoma") return bccVisits;
    if (entry.id === "cutaneous-squamous-cell-carcinoma") return csccVisits;
    if (entry.id === "merkel-cell-carcinoma") return mccVisits;
    if (entry.id === "actinic-keratosis") return akVisits;
    if (entry.id === "squamous-cell-carcinoma-in-situ") return bowenVisits;
    if (entry.id === "dermatofibrosarcoma-protuberans") return dfspVisits;
    return [];
  }

  function el(tag, text, className) {
    const node = document.createElement(tag);
    if (text != null) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  function add(parent, tag, text, className) {
    const node = el(tag, text, className);
    parent.appendChild(node);
    return node;
  }

  function cellCopy(recommendation, language) {
    const note = recommendation.note ? noteText(recommendation.note, language) : "";
    if (recommendation.status === "not_specified") return { lead: language === "tr" ? "Belirtilmemiş" : "Not specified", note };
    if (recommendation.status === "not_routinely_scheduled" && note) {
      return { lead: note, note: language === "tr" ? "Öneri cümlesinde sayısal aralık yok." : "No numeric interval in the recommendation sentence." };
    }
    if (recommendation.status === "not_routinely_scheduled") return { lead: language === "tr" ? "Rutin aralık yok" : "Not routinely scheduled", note };
    const frequency = frequencyText(recommendation.frequency, language);
    if (recommendation.status === "conditional") return { lead: `${frequency}${language === "tr" ? " · koşullu" : " · conditional"}`, note };
    return { lead: frequency, note };
  }

  function placeStaging(entry) {
    const staging = document.getElementById("melanomaStaging");
    const slot = document.getElementById("nachsorgeStaging");
    const home = document.getElementById("melanomaStagingHome");
    if (!staging || !slot || !home || !home.parentElement) return;
    const show = entry && (entry.id === "cutaneous-melanoma" || entry.id === "lentigo-maligna");
    if (show) {
      if (staging.parentElement !== slot) slot.appendChild(staging);
      staging.hidden = false;
      staging.open = true;
    } else if (staging.parentElement === slot) home.parentElement.insertBefore(staging, home);
  }

  function writeUrl(entry) {
    if (!entry || !window.history || typeof window.history.replaceState !== "function" || typeof URL !== "function") return;
    let current;
    try { current = new URL(window.location.href); } catch (error) { return; }
    const opened = current.searchParams.has("nachsorge") || document.body?.dataset?.studioView === "nachsorgeModule";
    if (!opened) return;
    current.searchParams.set("nachsorge", entry.id);
    current.hash = "nachsorgeModule";
    if (current.href !== window.location.href) window.history.replaceState(window.history.state, "", current.href);
  }

  function selectedFromUrl() {
    try { return entryById(new URL(window.location.href).searchParams.get("nachsorge")); } catch (error) { return null; }
  }

  function render() {
    const disease = document.getElementById("nachsorgeDisease");
    const groupSelect = document.getElementById("nachsorgeGroup");
    const result = document.getElementById("nachsorgeResult");
    const search = document.getElementById("nachsorgeSearch");
    if (!disease || !groupSelect || !result) return;
    if (search) search.placeholder = say("Melanoma, Merkel, Bowen…", "Melanom, Merkel, Bowen…");
    const query = normalize(search ? search.value : "");
    const previous = entryById(disease.value) || selectedFromUrl();
    const visible = catalog.filter(entry => matches(entry, query));
    disease.replaceChildren();
    visible.forEach(entry => {
      const option = el("option", line(entry, lang()));
      option.value = entry.id;
      disease.appendChild(option);
    });
    if (!visible.length) {
      const option = el("option", say("No matching diagnosis", "Eşleşen tanı yok"));
      option.value = "";
      disease.appendChild(option);
    }
    const entry = visible.find(item => item.id === previous?.id) || visible[0] || null;
    if (entry) disease.value = entry.id;
    const protocol = protocolFor(entry);
    const groups = protocol?.groups || [];
    const locked = entry?.groupId || "";
    const previousGroup = groupSelect.value;
    groupSelect.replaceChildren();
    groupSelect.disabled = !groups.length;
    (locked ? groups.filter(item => item.id === locked) : groups).forEach(item => {
      const option = el("option", labelOf(GROUP_LABELS, item.id, item.label));
      option.value = item.id;
      groupSelect.appendChild(option);
    });
    if (!groups.length) {
      const option = el("option", say("No stage table", "Evre tablosu yok"));
      option.value = "";
      groupSelect.appendChild(option);
    }
    const wanted = locked || (groups.some(item => item.id === previousGroup) ? previousGroup : groups[0]?.id || "");
    if (wanted) groupSelect.value = wanted;
    const group = groups.find(item => item.id === groupSelect.value) || null;
    placeStaging(entry);
    result.replaceChildren();
    const banner = add(result, "p", lang() === "tr" ? DISCLAIMER_TR : `${DISCLAIMER_EN} ${DISCLAIMER_TR}`, "nachsorge-disclaimer");
    banner.setAttribute?.("role", "note");
    if (!entry) {
      add(result, "p", say("Search for a diagnosis.", "Bir tanı arayın."), "follow-up-note");
      return;
    }
    const review = window.DOCUTIS_REVIEW_UI?.asset?.("follow_up", protocol?.id || "");
    add(result, "p", review ? badgeText(review.status) : badgeText("review required"), "module-badge");
    add(result, "h3", line(entry, lang()));
    if (entry.banner) add(result, "p", line(entry.banner, lang()), "follow-up-note");
    if (entry.body) {
      add(result, "h3", say("What the guideline states", "Kılavuzun söylediği"));
      add(result, "p", line(entry.body, lang()));
      add(result, "h3", say("Schedule", "Çizelge"));
      add(result, "p", say("No year-by-year table is stated. None is shown.", "Yıl yıl bir tablo belirtilmemiştir. Gösterilmez."));
    } else if (protocol && group) {
      add(result, "p", noteText(group.description, lang()));
      add(result, "h3", say("Schedule", "Çizelge"));
      add(result, "p", say("Columns follow the cited guideline's own periods.", "Sütunlar anılan kılavuzun kendi dönemleridir."), "follow-up-note");
      const wrap = add(result, "div", null, "nachsorge-table-wrap");
      const table = add(wrap, "table", null, "nachsorge-table");
      const head = add(table, "tr");
      add(head, "th", say("At each visit", "Her ziyarette"));
      group.periods.forEach(period => add(head, "th", labelOf(PERIOD_LABELS, period.id, period.label)));
      const modalityIds = ["clinical_examination", "lymph_node_ultrasound", "s100b", "cross_sectional_imaging"];
      modalityIds.forEach(modality => {
        const row = add(table, "tr");
        add(row, "th", labelOf(MODALITIES, modality, modality));
        group.periods.forEach(period => {
          const recommendation = period.recommendations.find(item => item.modality === modality);
          const cell = add(row, "td");
          if (!recommendation) {
            cell.textContent = say("Not specified", "Belirtilmemiş");
            return;
          }
          const copy = cellCopy(recommendation, lang());
          add(cell, "strong", copy.lead);
          if (recommendation.evidenceScope && recommendation.evidenceScope !== "primary_guideline") {
            add(cell, "span", scopeText(recommendation.evidenceScope), "follow-up-note");
          }
          if (recommendation.recommendationBasis) add(cell, "span", basisText(recommendation.recommendationBasis), "follow-up-note");
          if (copy.note && recommendation.status !== "not_routinely_scheduled") add(cell, "span", copy.note, "follow-up-note");
          if (copy.note && recommendation.status === "not_routinely_scheduled") add(cell, "span", copy.note, "follow-up-note");
        });
      });
      (group.notes || []).forEach(note => add(result, "p", noteText(note, lang()), "follow-up-note"));
      (protocol.notes || []).forEach(note => add(result, "p", noteText(note, lang()), "follow-up-note"));
      (group.contextSections || []).forEach(section => {
        const aside = add(result, "aside", null, "follow-up-context");
        add(aside, "h3", noteText(section.title, lang()));
        add(aside, "p", noteText(section.text, lang()));
      });
    }
    add(result, "h3", say("What to do at each visit", "Her ziyarette ne yapılır"));
    const visitList = add(result, "ul", null, "nachsorge-list");
    visitsFor(entry, group?.id).forEach(item => add(visitList, "li", line(item, lang())));
    if (!visitList.children.length) add(result, "p", say("No visit checklist is stated beyond the paragraph above.", "Yukarıdaki paragrafın ötesinde bir ziyaret listesi belirtilmemiştir."));
    add(result, "h3", say("Imaging and laboratory", "Görüntüleme ve laboratuvar"));
    if (!protocol || !group) add(result, "p", say("No imaging or laboratory interval is stated.", "Görüntüleme veya laboratuvar aralığı belirtilmemiştir."));
    else {
      const imaging = add(result, "ul", null, "nachsorge-list");
      ["lymph_node_ultrasound", "s100b", "cross_sectional_imaging"].forEach(modality => {
        group.periods.forEach(period => {
          const recommendation = period.recommendations.find(item => item.modality === modality);
          if (!recommendation) return;
          const copy = cellCopy(recommendation, lang());
          add(imaging, "li", `${labelOf(MODALITIES, modality, modality)} · ${labelOf(PERIOD_LABELS, period.id, period.label)}: ${copy.lead}`);
        });
      });
    }
    add(result, "h3", say("Red flags", "Kırmızı bayraklar"));
    add(result, "p", line(redFlags[entry.id], lang()));
    add(result, "h3", say("Patient education", "Hasta eğitimi"));
    add(result, "p", line(education[entry.id], lang()));
    add(result, "h3", say("Source", "Kaynak"));
    const source = protocol ? protocol.guideline : null;
    const sourceName = source?.title || entry.sourceTitle;
    const sourceUrl = source?.sourceUrl || entry.sourceUrl;
    const meta = add(result, "p");
    meta.textContent = `${sourceName} · ${source?.version || entry.sourceVersion} · ${source?.publishedAt || entry.sourcePublished} · ${source?.registerNumber || entry.sourceRegister}`;
    if (sourceUrl) {
      const link = add(result, "a", sourceUrl, "follow-up-note");
      link.href = sourceUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    add(result, "p", source?.recommendationLocation || entry.sourceLocation || "", "follow-up-note");
    (protocol?.supplementalSources || []).forEach(item => {
      const link = add(result, "a", item.title, "follow-up-note");
      link.href = item.sourceUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
    writeUrl(entry);
  }

  function badgeText(status) {
    const labels = {
      "clinician reviewed": pair("Clinician reviewed", "Hekim tarafından incelendi"),
      "review required": pair("Clinical review pending", "Klinik inceleme bekliyor"),
      "review invalidated": pair("Review invalidated after content change", "İçerik değişince inceleme geçersiz kaldı"),
      "partially reviewed": pair("Partially reviewed", "Kısmen incelendi"),
      "changes requested": pair("Changes requested", "Değişiklik istendi")
    };
    return line(labels[status] || labels["review required"], lang());
  }
  function scopeText(scope) {
    const labels = {
      german_expert_context: pair("German expert context, not the S3 table", "Alman uzman bağlamı, S3 tablosu değil"),
      german_clinical_context: pair("German clinical context", "Alman klinik bağlam"),
      international_context: pair("International context", "Uluslararası bağlam")
    };
    return line(labels[scope] || pair(scope, scope), lang());
  }
  function basisText(basis) {
    const characters = {
      soll: pair("strong recommendation (soll)", "güçlü öneri (soll)"),
      sollte: pair("recommendation (sollte)", "öneri (sollte)"),
      "sollte (EK)": pair("expert consensus (sollte (EK))", "uzman uzlaşısı (sollte (EK))"),
      kann: pair("may (kann)", "yapılabilir (kann)"),
      "Schema 9.2": pair("schedule 9.2 (Schema 9.2)", "çizelge 9.2 (Schema 9.2)")
    };
    return line(characters[basis.character] || pair(basis.character, basis.character), lang());
  }

  function boot() {
    if (!document.getElementById("nachsorgeModule")) return;
    const search = document.getElementById("nachsorgeSearch");
    const disease = document.getElementById("nachsorgeDisease");
    const groupSelect = document.getElementById("nachsorgeGroup");
    if (search) search.addEventListener("input", render);
    if (disease) disease.addEventListener("change", () => { if (groupSelect) groupSelect.value = ""; render(); });
    if (groupSelect) groupSelect.addEventListener("change", render);
    const language = document.getElementById("docutisLanguage");
    if (language) language.addEventListener("change", render);
    document.addEventListener("docutis-nachsorge-group", event => {
      const current = entryById(disease?.value);
      if (!current || current.id !== "cutaneous-melanoma" || !event.detail?.groupId || !groupSelect) return;
      groupSelect.value = event.detail.groupId;
      render();
    });
    const initial = selectedFromUrl();
    if (initial && disease) disease.value = initial.id;
    render();
  }

  window.DOCUTIS_NACHSORGE = Object.freeze({ catalog, frequencyText, noteText, numericTokens, normalize, pairedCopy, visitsFor, render, DISCLAIMER_TR });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
}());
