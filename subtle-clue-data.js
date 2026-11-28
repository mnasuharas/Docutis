/* Image-linked contrast lessons. Educational drafts; clinician review required. */
(function () {
  "use strict";
  const dual = (en, tr) => Object.freeze({ en, tr });
  window.DOCUTIS_SUBTLE_CLUES = Object.freeze([
    Object.freeze({
      id: "network", cases: ["case-g25-01", "case-g25-02"],
      title: dual("An uneven network can occur on both sides", "Düzensiz Ağ Her İki Tarafta da Görülebilir"),
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
      title: dual("A reassuring pattern with an eccentric clue", "İyi Huylu İzlenim Veren Paternde Eksantrik İpucu"),
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
      id: "acral-ridges", cases: ["case-g27-01", "case-g27-03"],
      title: dual("Where is the pigment on the sole?", "Ayak Tabanında Pigment Nerede?"),
      question: dual("Choose the relationship between brown lines and pale bands.", "Kahverengi çizgilerle açık renkli bantların ilişkisini seçin."),
      options: Object.freeze([
        dual("Thin brown lines with broader pale bands", "Geniş açık bantlarla birlikte ince kahverengi çizgiler"),
        dual("Broad brown bands between thin pale scale lines", "İnce açık renkli skuam çizgileri arasında geniş kahverengi bantlar"),
        dual("The lines cannot be located reliably", "Çizgilerin konumu güvenle değerlendirilemiyor")
      ]),
      expected: [0, 1],
      comparison: dual(
        "The brown in the melanoma in situ frame occupies broad bands between pale furrow scale markers. The benign cluster shows thin brown furrow lines. This is a comparison of two source images, not a calculation for another sole.",
        "Melanoma in situ karesinde pigment, açık renkli oluk skuamı işaretleri arasındaki geniş bantları doldurur. Benign kümede ince kahverengi oluk çizgileri görülür. Bu iki kaynak görselinin karşılaştırmasıdır; başka bir taban lezyonu için hesaplama değildir."
      ),
      limit: dual(
        "The melanoma in situ figure has lesion-specific histopathology. The benign biopsy sampled only one spot years after the photographs. Pores are unresolved in both frames, so the ridge/furrow assignment should remain cautious. Printed scales and lines are not skin.",
        "Melanoma in situ şekli lezyona özgü histopatoloji içerir. Benign biyopsi yıllar sonra kümedeki yalnızca bir noktadan alınmıştır. Her iki karede de gözenekler çözümlenemediğinden sırt/oluk yorumu temkinli kalmalıdır. Basılı ölçek ve çizgiler deri değildir."
      )
    }),
    Object.freeze({
      id: "face", cases: ["case-g25-06", "case-g25-05"],
      title: dual("Look around the facial follicles", "Yüzde Folikül Çevresini İnceleyin"),
      question: dual("What appears around the follicular openings?", "Folikül açıklıklarının çevresinde ne görülüyor?"),
      options: Object.freeze([
        dual("Orange-brown pigment without visible gray dots", "Gri noktalar görülmeden turuncu kahverengi pigment"),
        dual("Gray dots around several openings", "Birkaç açıklığın çevresinde gri noktalar"),
        dual("The follicles cannot be assessed", "Foliküller değerlendirilemiyor")
      ]),
      expected: [0, 1],
      comparison: dual(
        "Both facial frames show a pseudo-network interrupted by pale follicular openings. Gray perifollicular dots and darker pigment on one side occur in the source lentigo maligna frame. The solar lentigo frame lacks visible gray dots. Absence in one photograph is weaker than a present clue.",
        "İki yüz karesinde de açık renkli folikül açıklıklarıyla kesilen psödoağ var. Kaynağın lentigo maligna karesinde folikül çevresinde gri noktalar ve bir yanda daha koyu pigment görülür. Solar lentigo karesinde gri noktalar seçilmiyor. Bir fotoğrafta bulgunun görülmemesi, mevcut bir ipucundan daha zayıf kanıttır."
      ),
      limit: dual(
        "Both names come from a teaching figure with study-level histology, not a lesion-specific pathology sentence. Different faces and sites; the missing gray clue does not clear a new lesion.",
        "İki ad da lezyona özgü patoloji cümlesi yerine çalışma düzeyinde histoloji bildiren bir eğitim şekline dayanır. Yüzler ve bölgeler farklıdır; gri ipucunun görülmemesi yeni bir lezyonu güvenli kılmaz."
      )
    }),
    Object.freeze({
      id: "papules", cases: ["case-g21-08", "case-g18-15"],
      title: dual("Sebaceous hyperplasia and a BCC look-alike", "Sebase Hiperplazi ve Bazal Hücreli Karsinom Benzeri"),
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
