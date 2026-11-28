/* Paired exercises reuse published images and the existing evidence records. */
(function () {
  "use strict";
  const collection = window.DOCUTIS_CASES;
  if (!collection) return;
  const specs = [
    ["network", ["Pigment network", "Pigment ağı"], "cmp-g25-network",
      ["Atypical melanocytic nevus", "Atipili melanositik nevüs"], ["Melanoma in situ", "Melanoma in situ"],
      ["Compare network thickness and distribution from center to edge in both images. The source figure reports histopathology for both lesions. An atypical network occurs on both sides.", "İki görüntüde de ağın kalınlığını ve merkezden kenara dağılımını karşılaştır. Kaynak şekil iki lezyonun da histopatolojisini bildiriyor. Her iki tarafta da atipik ağ görülüyor."]],
    ["pink", ["Pink scalp lesions", "Saçlı deride pembe lezyonlar"], null, null, null,
      ["Compare vessel morphology and the red and white areas. Hair and crust can obscure details. The melanoma in this pair is thick. Both sources report lesion-specific histopathology.", "Damar morfolojisini ve kırmızı ile beyaz alanları karşılaştır. Kıl ve krut ayrıntıları örtebilir. Bu çiftteki melanom kalındır. Her iki kaynak da lezyona özgü histopatoloji bildiriyor."]],
    ["face", ["Facial pigmentation", "Yüzde pigmentasyon"], "cmp-g30-pak-lm",
      ["Pigmented actinic keratosis", "Pigmente aktinik keratoz"], ["Lentigo maligna (melanoma in situ)", "Lentigo maligna (melanoma in situ)"],
      ["Compare pigment around follicular openings and its distribution. Both examples show facial pigmentation. Histopathology verification is reported at study level.", "Foliküler açıklıkların çevresindeki pigmenti ve dağılımını karşılaştır. İki örnek de yüzde pigmentasyon gösteriyor. Histopatolojik doğrulama çalışma düzeyinde bildirilmiş."]],
    ["acral", ["Palms and soles", "Avuç içi ve ayak tabanı"], "cmp-g27-furrow-both-poles",
      ["Acquired clustered nevi of the sole", "Ayak tabanında edinsel kümelenmiş nevüsler"], ["Acral lentiginous melanoma in situ", "Akral lentijinöz melanoma in situ"],
      ["Look for the furrows in both images, then compare the wider distribution of pigment. This pair was selected because a furrow pattern is documented in both diagnoses. The clustered nevi were sampled later.", "İki görüntüde de olukları bul, ardından pigmentin genel dağılımını karşılaştır. Bu çift her iki tanıda da oluk paterni belgelendiği için seçildi. Kümelenmiş nevüslerin örneklemesi daha sonra yapıldı."]],
    ["blood", ["Acral bleeding and pigment", "Akral kanama ve pigment"], "cmp-g26-blood",
      ["Subcorneal hematoma", "Subkorneal hematom"], ["Acral melanoma", "Akral melanom"],
      ["Compare the distribution of the dark areas. The fingertip lesion resolved in the source follow-up. The heel lesion's histopathology is reported at study level.", "Koyu alanların dağılımını karşılaştır. Kaynak takibinde parmak ucundaki lezyon gerilemiş. Topuk lezyonunun histopatolojisi çalışma düzeyinde bildirilmiş."]],
    ["nail", ["Nail pigmentation", "Tırnakta pigmentasyon"], "cmp-g27-nail-blood-melanocytic",
      ["Subungual hemorrhage", "Subungual kanama"], ["Nail-unit melanoma", "Tırnak ünitesi melanomu"],
      ["Compare the dark areas with any longitudinal lines you can resolve. Both labels come from review figures. Histopathology is unavailable for these examples, and the hemorrhage figure has no follow-up.", "Koyu alanları seçebildiğin uzunlamasına çizgilerle karşılaştır. İki tanı etiketi de derleme şekillerinden geliyor. Bu örneklerde histopatoloji bilgisi yok ve kanama görselinin takip bilgisi bulunmuyor."]],
    ["scale", ["Scale and crust", "Skuam ve krut"], "cmp-bowen-lplk-crust",
      ["Bowen disease", "Bowen hastalığı"], ["Lichen planus-like keratosis", "Likenoid keratoz"],
      ["Compare the surface and the field beneath the crust or scale. Both diagnoses were reported on lesion-specific histopathology. Crust and scale overlap across the examples.", "Yüzeyi ve krut ya da skuamın altındaki zemini karşılaştır. Her iki tanı lezyona özgü histopatolojiyle bildirilmiş. Krut ve skuamın görünümü örnekler arasında örtüşüyor."]],
    ["erosion", ["Eroded lesions", "Erozyonlu lezyonlar"], "cmp-invasive-scc-bowen-erosion",
      ["Invasive cutaneous SCC", "İnvaziv kutanöz SCC"], ["Bowen disease", "Bowen hastalığı"],
      ["Compare contour and surface detail. The authors report invasion for the eyelid lesion on histopathology. Surface erosion alone cannot establish invasion.", "Konturu ve yüzey ayrıntısını karşılaştır. Yazarlar göz kapağı lezyonunda histopatolojik invazyon bildiriyor. Yüzey erozyonu tek başına invazyonu gösteremez."]]
  ];

  function standardSide(id, label) {
    const record = collection.cases.find(item => item.id === id);
    const pair = collection.pairProvenance.find(item => item.caseId === id);
    if (!record || !pair || !["same_lesion_confirmed", "source_documented_pair"].includes(pair.provenance)) return null;
    const clinical = record.images.find(image => pair.clinicalImageIds.includes(image.id));
    const dermoscopy = record.images.find(image => pair.dermoscopicImageIds.includes(image.id));
    return { label, clinical, dermoscopy, source: dermoscopy?.sourceUrl };
  }

  function pinkSide(id) {
    const record = window.DOCUTIS_PINK_CASES?.find(item => item.id === id);
    if (!record) return null;
    const image = type => {
      const asset = record.images.find(item => item.type === type);
      return asset && { ...asset, creator: asset.credit, dimensions: { width: asset.width, height: asset.height } };
    };
    return { label: [record.label.en, record.label.tr], clinical: image("clinical"), dermoscopy: image("dermoscopy"), source: record.source };
  }

  const traps = {
    network: ["Treating an atypical network as a diagnosis by itself.", "Atipik ağı tek başına tanı yerine koymak."],
    pink: ["Treating a red scalp nodule as benign because brown pigment is absent.", "Kahverengi pigment görmeyince kırmızı saçlı deri nodülünü benign saymak."],
    face: ["Assigning the diagnosis from facial pseudonetwork alone.", "Yüzde yalnızca psödoağa bakarak tanı koymak."],
    acral: ["Using a furrow pattern as a rule to exclude melanoma.", "Oluk paternini melanomu dışlama kuralı olarak kullanmak."],
    blood: ["Assuming a blood-like color explains the entire acral lesion.", "Kana benzeyen rengin bütün akral lezyonu açıkladığını varsaymak."],
    nail: ["Inferring growth or migration from a single nail image.", "Tek tırnak görüntüsünden büyüme ya da ilerleme çıkarmak."],
    scale: ["Using crust or scale as proof of one diagnosis.", "Krut veya skuamı tek bir tanının kanıtı saymak."],
    erosion: ["Inferring invasion depth from surface damage.", "Yüzey hasarından invazyon derinliği çıkarmak."]
  };

  window.DOCUTIS_MIMICS = specs.flatMap(([id, topic, comparisonId, a, b, review]) => {
    const comparison = collection.comparisons.find(item => item.id === comparisonId);
    const sides = comparison
      ? [standardSide(comparison.caseIdA, a), standardSide(comparison.caseIdB, b)]
      : id === "pink" ? [pinkSide("pink-06"), pinkSide("pink-07")] : [];
    return sides.length === 2 && sides.every(side => side?.clinical && side.dermoscopy)
      ? [{ id, topic, sides, trap: traps[id], review, reviewStatus: "clinician review required" }] : [];
  });
}());
