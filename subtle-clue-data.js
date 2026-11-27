/* Image-linked contrast lessons. Educational drafts; clinician review required. */
(function () {
  "use strict";
  const dual = (en, tr) => Object.freeze({ en, tr });
  window.DOCUTIS_SUBTLE_CLUES = Object.freeze([
    Object.freeze({
      id: "network", cases: ["case-g25-01", "case-g25-02"],
      title: dual("An uneven network can occur on both sides", "Düzensiz ağ her iki tarafta da görülebilir"),
      question: dual("Choose the most useful visible observation for each image.", "Her görsel için en yararlı görülebilir bulguyu seçin."),
      options: Object.freeze([
        dual("Network varies across the lesion", "Ağ lezyon içinde değişken"),
        dual("Only a uniform network", "Yalnızca düzenli ağ"),
        dual("No network can be assessed", "Ağ değerlendirilemiyor")
      ]),
      expected: [0, 0],
      comparison: dual(
        "Both dermoscopic frames have uneven networks. One source figure reports melanoma in situ; the other, a nevus with cytologic atypia. The network alone does not settle this pair. Recheck asymmetry, the darker focus, other structures and the full clinical context.",
        "İki dermoskopi karesinde de düzensiz ağ var. Kaynak şekil birinde melanoma in situ, diğerinde sitolojik atipili nevüs bildiriyor. Bu ikiliyi ağ tek başına ayırmaz. Asimetriyi, koyu odağı, diğer yapıları ve klinik bağlamı yeniden değerlendirin."
      ),
      limit: dual(
        "Both labels are from figure-caption histopathology; Docutis has not reviewed slides. Bubbles and hairs cross the nevus frame.",
        "Her iki tanı şekil açıklamasındaki histopatolojiye dayanır; Docutis preparatları incelemedi. Nevüs karesinde hava kabarcıkları ve kıllar var."
      )
    }),
    Object.freeze({
      id: "acral", cases: ["case-g27-01", "case-g27-04"],
      title: dual("A reassuring pattern with an eccentric clue", "İyi huylu izlenim veren paternde eksantrik ipucu"),
      question: dual("Which observation should you carry into the comparison?", "Karşılaştırmaya hangi gözlemi taşımalısınız?"),
      options: Object.freeze([
        dual("Thin furrow lines without a visible blotch", "Görülen koyu odak olmadan ince oluk çizgileri"),
        dual("Furrow lines plus an eccentric dark blotch", "Oluk çizgileriyle birlikte eksantrik koyu odak"),
        dual("The ridge or furrow cannot be assessed", "Sırt veya oluk değerlendirilemiyor")
      ]),
      expected: [0, 1],
      comparison: dual(
        "A furrow pattern is shared and does not clear a lesion. The palm lesion adds an eccentric blotch with several browns; its case report confirms acral melanoma in situ. The sole cluster has thin furrow lines without that blotch. Ask where pigment sits relative to pores or scale; do not read printed arrows as skin.",
        "Oluk paterni iki görselde de var ve tek başına lezyonu güvenli kılmaz. Avuç içi lezyonunda birkaç kahverengi tonla birlikte eksantrik koyu odak var; vaka raporu akral melanoma in situ doğruluyor. Taban kümesinde bu odak olmadan ince oluk çizgileri var. Pigmentin gözenek veya skuama göre yerini inceleyin; basılı okları deri bulgusu sanmayın."
      ),
      limit: dual(
        "The benign biopsy sampled one spot in a cluster years after the photographs. The two cases differ in site, source and device; neither is a universal rule.",
        "Benign biyopsi fotoğraflardan yıllar sonra kümedeki tek bir noktadan alındı. Vaka bölgeleri, kaynakları ve cihazları farklı; hiçbiri evrensel kural değildir."
      )
    }),
    Object.freeze({
      id: "papules", cases: ["case-g21-08", "case-g18-15"],
      title: dual("Sebaceous hyperplasia and a BCC look-alike", "Sebase hiperplazi ve bazal hücreli karsinom benzeri"),
      question: dual("What is actually available in each stored image?", "Kayıtlı görsellerde gerçekten ne değerlendirilebilir?"),
      options: Object.freeze([
        dual("Grouped papules with yellow-white dermoscopic lobules", "Dermoskopide sarı beyaz lobüllü papül kümesi"),
        dual("One shiny red papule; vessel subtype unassessable", "Tek parlak kırmızı papül; damar alt tipi değerlendirilemiyor"),
        dual("Definite arborizing vessels in both cases", "İki vakada da kesin dallanan damarlar")
      ]),
      expected: [0, 1],
      comparison: dual(
        "The sebaceous case stores clinical and dermoscopic views with grouped papules and yellow-white lobules. The BCC case stores a clinical photograph only. Crown versus arborizing vessels is a useful differential concept, but these two stored frames cannot demonstrate that vessel contrast. Do not invent dermoscopic vessels from a caption.",
        "Sebase olguda papül kümesi ve sarı beyaz lobülleri gösteren klinik ve dermoskopik görseller kayıtlı. Bazal hücreli karsinom olgusunda yalnızca klinik fotoğraf var. Taç biçimli ve dallanan damarların ayrımı yararlı bir ayırıcı tanı kavramıdır, fakat bu iki kayıtlı kare damar karşılaştırmasını göstermez. Açıklamadan dermoskopik damar uydurmayın."
      ),
      limit: dual(
        "The sebaceous label comes from a case report and the BCC label from a source catalog; neither stored case cites lesion-specific histopathology. This is an observation exercise, not a validated diagnostic test.",
        "Sebase tanısı vaka raporuna, bazal hücreli karsinom tanısı kaynak kataloğuna dayanıyor; kayıtlı olguların hiçbirinde lezyona özgü histopatoloji belirtilmiyor. Bu bir gözlem egzersizidir, doğrulanmış tanı testi değildir."
      )
    })
  ]);
})();
