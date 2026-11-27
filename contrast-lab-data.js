/* Teaching comparisons and suggested regions are drafts, not physician annotations. */
(function () {
  "use strict";
  const t = (en, tr) => ({ en, tr });
  const all = new Map([...window.DOCUTIS_CASES.cases, ...window.DOCUTIS_EARLY_CASES].map(item => [item.id, item]));
  const labels = {
    "contrast-new-01": t("Lentigo maligna in situ arising in a nevus, with regression", "Nevüs zemininde regresyonlu lentigo maligna in situ"),
    "contrast-new-02": t("Lentigo maligna in situ, with regression", "Regresyonlu lentigo maligna in situ"),
    "early-micro-1": t("Melanoma in situ; source diameter 4 mm", "Melanoma in situ; kaynakta çap 4 mm"),
    "early-micro-2": t("Invasive melanoma; source Breslow 0.75 mm", "İnvaziv melanom; kaynakta Breslow 0,75 mm"),
    "case-g25-02": t("Lentiginous melanocytic nevus with cytologic atypia", "Sitolojik atipili lentijinöz melanositik nevüs"),
    "case-g30-02": t("Solitary lichen planus keratosis", "Soliter likenoid keratoz"),
    "case-g25-05": t("Lentigo maligna", "Lentigo maligna"), "case-g25-06": t("Solar lentigo", "Solar lentigo"),
    "case-g27-03": t("Acral melanoma in situ", "Akral melanoma in situ"), "case-g26-02": t("Acral melanocytic nevus", "Akral melanositik nevüs")
  };
  const evidence = {
    "contrast-new-01": t("Figure 2A: histopathology. First back lesion in a patient with LEOPARD syndrome.", "Şekil 2A: histopatoloji. LEOPARD sendromlu hastanın sırttaki ilk lezyonu."),
    "contrast-new-02": t("Figure 2B and case text: histopathology and immunostaining. A second, separate back lesion in the same patient.", "Şekil 2B ve olgu metni: histopatoloji ve immün boyama. Aynı hastanın sırttaki ayrı, ikinci lezyonu."),
    "early-micro-1": t("Figure 1 and study histopathology. Diameter is from the source, not measured on screen.", "Şekil 1 ve çalışmanın histopatolojisi. Çap kaynaktan alınmıştır; ekranda ölçülmemiştir."),
    "early-micro-2": t("Figure 2 and study histopathology. Caption gives 3 mm diameter; table lists 4 mm for the 0.75 mm case. This discrepancy is unresolved; no stage is inferred.", "Şekil 2 ve çalışmanın histopatolojisi. Açıklama çapı 3 mm, tablo 0,75 mm olgusu için 4 mm veriyor. Çelişki çözülmemiştir; evre çıkarılmaz."),
    "case-g25-02": t("Figure-caption histopathology for this lesion. Atypia is not converted into a melanoma label.", "Bu lezyon için şekil açıklamasında histopatoloji. Atipi melanom tanısına dönüştürülmez."),
    "case-g30-02": t("Case-text punch-biopsy histopathology for this lesion. Source arrows remain.", "Bu lezyon için olgu metninde punch biyopsi histopatolojisi. Kaynak okları korunmuştur."),
    "case-g25-05": t("Caption names lentigo maligna; histopathology verification is study-level, not a stored slide review.", "Açıklama lentigo maligna adını verir; histopatoloji doğrulaması çalışma düzeyindedir, kayıtlı lam incelemesi değildir."),
    "case-g25-06": t("Caption names solar lentigo; histopathology verification is study-level.", "Açıklama solar lentigo adını verir; histopatoloji doğrulaması çalışma düzeyindedir."),
    "case-g27-03": t("Figure 5 caption links this lesion to biopsy and immunostaining. The ridge interpretation remains probable in Docutis.", "Şekil 5 açıklaması bu lezyonu biyopsi ve immün boyamayla eşleştirir. Docutis'te sırt paterni yorumu olası düzeyinde kalır."),
    "case-g26-02": t("Caption names a nevus; methods report excision of all study lesions. The atypia grade of this example is not given.", "Açıklama nevüs adını verir; yöntem tüm çalışma lezyonlarının eksizyonunu bildirir. Bu örnekte atipi derecesi verilmemiştir.")
  };
  const specs = [
    { id: "contrast-01", cases: ["contrast-new-01", "case-g30-02"], theme: "white", regions: [[.25,.51,.43,.26],[.18,.12,.53,.42]],
      observations: [t("White lines with thickened crossings are described in Figure 2A.", "Şekil 2A'da kesişimlerinde kalınlaşma gösteren beyaz çizgiler tanımlanıyor."), t("White scale and shiny white structures occur on a pink field in this source case.", "Bu kaynak vakada pembe zeminde beyaz skuam ve parlak beyaz yapılar var.")],
      lesson: t("Compare the white structures with the surrounding architecture. Their presence alone does not separate these diagnoses.", "Beyaz yapıları çevre mimariyle birlikte karşılaştırın. Varlıkları tek başına bu tanıları ayırmaz.") },
    { id: "contrast-02", cases: ["contrast-new-02", "case-g25-02"], theme: "network", regions: [[.39,.24,.53,.37],[.32,.24,.44,.47]],
      observations: [t("The source describes negative network and thickened white crossings in Figure 2B.", "Kaynak Şekil 2B'de negatif ağ ve kalınlaşmış beyaz kesişimler tanımlıyor."), t("Uneven brown network with bubbles and hairs. Pale gaps are not automatically negative network.", "Kabarcık ve kıllarla birlikte düzensiz kahverengi ağ. Açık boşluklar otomatik olarak negatif ağ değildir.")],
      lesson: t("Absent brown network and visible negative network are different observations. This unusual syndrome case does not establish a universal melanoma sign.", "Kahverengi ağın yokluğu ve görülen negatif ağ farklı gözlemlerdir. Bu sıra dışı sendrom vakası evrensel melanom bulgusu belirlemez.") },
    { id: "contrast-03", cases: ["early-micro-1", "case-g25-02"], theme: "network", regions: [[.17,.20,.48,.49],[.31,.25,.45,.47]],
      observations: [t("The source describes atypical network and irregular darker areas.", "Kaynak atipik ağ ve düzensiz koyu alanlar tanımlıyor."), t("Brown network is also uneven in the atypical nevus frame.", "Atipili nevüs karesinde de kahverengi ağ düzensiz.")],
      lesson: t("An uneven network and small diameter do not settle the diagnosis. Compare structure distribution, then the tissue evidence.", "Düzensiz ağ ve küçük çap tanıyı belirlemez. Yapı dağılımını, ardından doku kanıtını karşılaştırın.") },
    { id: "contrast-04", cases: ["early-micro-2", "case-g30-02"], theme: "white", regions: [[.32,.28,.40,.40],[.19,.12,.52,.43]],
      observations: [t("Source reports shiny white structures within a multicomponent lesion.", "Kaynak çok bileşenli lezyon içinde parlak beyaz yapılar bildiriyor."), t("White scale and shiny structures are present in this histology-reported mimic too.", "Histopatolojisi bildirilen bu taklitçide de beyaz skuam ve parlak yapılar var.")],
      lesson: t("The white clue occurs on both sides. Thickness comes from histopathology, never the brightness of a line.", "Beyaz ipucu iki tarafta da var. Kalınlık, çizginin parlaklığından değil histopatolojiden gelir.") },
    { id: "contrast-05", cases: ["case-g25-05", "case-g25-06"], theme: "follicles", regions: [[.39,.28,.44,.45],[.33,.26,.46,.47]],
      observations: [t("Gray-brown dots cluster around several follicular openings; pigment is unevenly distributed.", "Birkaç foliküler açıklık çevresinde gri-kahverengi noktalar kümeleniyor; pigment dağılımı eşit değil."), t("Orange-brown pigment surrounds pale openings; the stored observation does not identify gray perifollicular dots.", "Turuncu-kahverengi pigment açık renkli açıklıkları çevreliyor; kayıtlı gözlem gri perifoliküler noktalar tanımlamıyor.")],
      lesson: t("Compare pigment around openings rather than treating every facial pseudonetwork alike. Hairs and resolution limit the comparison.", "Yüzdeki her psödoağı aynı saymak yerine açıklık çevresindeki pigmenti karşılaştırın. Kıllar ve çözünürlük karşılaştırmayı sınırlar.") },
    { id: "contrast-06", cases: ["case-g27-03", "case-g26-02"], theme: "acral", regions: [[.24,.22,.48,.47],[.22,.22,.51,.46]],
      observations: [t("Broad pigmented bands between pale scale lines; the source calls this a ridge pattern.", "Açık skuam çizgileri arasında geniş pigmente bantlar; kaynak bunu sırt paterni olarak adlandırıyor."), t("Fine oblique brown strokes form evenly spaced rows in the source fibrillar-pattern example.", "Kaynağın fibriler patern örneğinde ince oblik kahverengi çizgiler eşit aralıklı sıralar oluşturuyor.")],
      lesson: t("Location and distribution of pigment matter. Do not classify ridges from printed scales, or extrapolate a benign result to another sole.", "Pigmentin konumu ve dağılımı önemlidir. Basılı ölçekten sırt sınıflaması yapmayın veya benign sonucu başka tabana taşımayın.") }
  ];
  window.DOCUTIS_CONTRAST_LAB = specs.map(spec => ({ ...spec, reviewStatus: "clinician review required", clinicalReview: null,
    sides: spec.cases.map((id, i) => {
      const existing = all.get(id), added = window.DOCUTIS_CONTRAST_MEDIA.find(item => item.id === id);
      const asset = added || existing.images.find(image => image.type === "dermoscopy");
      return { id, label: labels[id], evidence: evidence[id], observation: spec.observations[i], region: spec.regions[i], image: asset,
        confirmationMethod: "histopathology", source: asset.sourceUrl, originalConfirmation: existing ? existing.diagnosticGroundTruth.confirmationNotes : "Colmant et al., Figure 2 and lesion-specific case text.",
        reviewStatus: "clinician review required", clinicalReview: null };
    }) }));
})();
