/* Bilingual teaching interpretations are drafts pending clinician review. */
(function () {
  "use strict";

  const gunduz = "https://data.mendeley.com/datasets/hp9mfwck7k/1";
  const moraes = "https://data.mendeley.com/datasets/2cs6vcpd4c/1";
  const isic = "https://api.isic-archive.com/api/v2/images/ISIC_0009967/";
  const cristescu = "https://doi.org/10.3390/life14050574";
  const cases = window.DOCUTIS_CASES.cases;
  const dermoscopy = id => cases.find(record => record.id === id).images.find(image => image.type === "dermoscopy");

  function image(file, width, height, creator, sourceUrl, figure, consentBasis, crop, publicDomain = false) {
    return {
      src: "assets/media/cases/" + file,
      dimensions: { width, height },
      creator, sourceUrl, figure, license: publicDomain ? "CC0 1.0" : "CC BY 4.0",
      licenseUrl: publicDomain ? "https://creativecommons.org/publicdomain/zero/1.0/" : "https://creativecommons.org/licenses/by/4.0/",
      attribution: creator + ", " + figure + (publicDomain ? ", CC0 1.0" : ", CC BY 4.0"),
      attributionRequired: !publicDomain,
      modificationStatus: crop ? "cropped" : "unmodified",
      modificationsNotes: crop || "Publisher JPEG unchanged",
      patientIdentifiable: false, consentBasis,
      sourceVerificationStatus: "pending",
      metadataCheckedAt: "2026-11-28"
    };
  }

  const gunduzCredit = "Gündüz et al. · Ankara University";
  const gunduzBasis = "Original non-identifying skin-only dermoscopy shared by the study investigators in the licensed supplement. The journal lists a consent-form attachment; individual consent records were not inspected.";
  const moraesCredit = "Moraes et al. · A.C. Camargo Cancer Center";
  const moraesBasis = "Original non-identifying skin-only dermoscopy shared by the investigators in the licensed deposit. The deposit documents institutional ethics approval; individual consent records were not inspected.";
  const fig = (asset, details) => ({ image: asset, figure: asset.figure, ...details });

  window.DOCUTIS_PATTERN_CONTEXT = [
    {
      id: "globules",
      title: ["Globular pattern and peripheral globules", "Globüler Patern ve Periferik Globüller"],
      observation: ["How are the globules distributed?", "Globüller nasıl dağılıyor?"],
      findings: [
        ["Mainly across the lesion", "Ağırlıklı olarak lezyon geneline yayılmış"],
        ["An approximately even peripheral rim", "Çevrede yaklaşık dengeli bir halka"],
        ["Uneven or concentrated in a peripheral sector", "Çevrede dengesiz ya da bir sektörde yoğunlaşmış"],
        ["Globules across the lesion with a distinct edge cluster", "Lezyon genelinde ve ayrıca kenarda belirgin globül kümesi"]
      ],
      weights: [
        ["Symmetry of the rim", "Halkanın simetrisi"],
        ["Unequal globule sizes, colors or sector distribution", "Globüllerin boyut, renk ya da sektör dağılımındaki farklar"],
        ["An additional finding inside the rim", "Halkanın içindeki ek bulgu"],
        ["Age, site or documented evolution", "Yaş, yerleşim ya da belgelenmiş değişim"]
      ],
      cases: [
        fig(image("context-01.jpg", 304, 364, gunduzCredit, gunduz, "Supplementary Figure 1c", gunduzBasis, "Cropped at [616, 0, 920, 364] from the supplementary DOCX PNG and encoded as JPEG; panel letter retained, no enhancement."), {
          context: ["Age 32. Continued growth and persistent peripheral globules during follow-up. Site and follow-up interval unreported in this panel.", "32 yaş. İzlemde büyüme sürmüş ve periferik globüller kalmış. Panelde yerleşim ve izlem süresi bildirilmemiş."],
          diagnosis: ["Benign melanocytic nevus", "Benign melanositik nevüs"],
          evidence: ["Excision histopathology in the supplement caption.", "Ek şeklin açıklamasında eksizyon histopatolojisi."],
          feedback: ["Trace the rim around the lesion. The globules are relatively regular and repeat around much of the margin. Growth adds context. The source called this lesion benign after excision.", "Kenarı çepeçevre izle. Görece düzenli globüller kenarın büyük bölümünde tekrar ediyor. Büyüme öyküsü bağlamı tamamlıyor. Bu vakanın benign sonucu eksizyonla belirlenmiş."]
        }),
        fig(image("context-02.jpg", 1024, 768, "ISIC Archive · Anonymous", isic, "ISIC_0009967",
          "The archive provides this anonymized dermoscopy JPEG under CC0 1.0. The field shows only non-identifying skin; individual consent records were not inspected.", null, true), {
          context: ["Approximately 15 years old. Female. Lower extremity, 8 mm. Evolution unreported in the archive.", "Yaklaşık 15 yaşında kız. Alt ekstremite, 8 mm. Arşivde değişim öyküsü bildirilmemiş."],
          diagnosis: ["Congenital melanocytic nevus", "Konjenital melanositik nevüs"],
          evidence: ["The ISIC record classifies this lesion as a benign congenital nevus confirmed by histopathology.", "ISIC kaydı lezyonu histopatolojiyle doğrulanmış benign konjenital nevüs olarak sınıflandırıyor."],
          feedback: ["Look at the lower and right margins, then trace the rest of the rim. Rounded brown clods are more conspicuous at the periphery. In this source case the leg site and a visible rim coexist with benign histopathology.", "Alt ve sağ kenara bak, ardından çevrenin geri kalanını izle. Yuvarlak kahverengi globüller periferde daha belirgin. Bu vakada bacak yerleşimi ve görünür periferik halka, benign histopatolojiyle birlikte bulunuyor."]
        }),
        fig(image("context-03.jpg", 424, 337, moraesCredit, moraes, "Figure 3D", moraesBasis, "Cropped at [424, 273, 848, 610] from the source JPEG and re-encoded as JPEG; panel letter retained, no enhancement."), {
          context: ["Lower limb. Age and individual evolution unreported.", "Alt ekstremite. Yaş ve lezyonun değişim öyküsü bildirilmemiş."],
          diagnosis: ["Superficial spreading melanoma", "Yüzeyel yayılan melanom"],
          evidence: ["The source figure reports Breslow thickness of 0.3 mm.", "Kaynak şekil Breslow kalınlığını 0,3 mm olarak bildiriyor."],
          feedback: ["Recheck the upper-left edge. Darker globules cluster there, while globules also occupy the body of the lesion. The source calls the overall architecture disorganized and globular and the peripheral globules irregular and asymmetric.", "Sol üst kenara tekrar bak. Koyu globüller burada kümeleniyor, lezyonun içinde de globüller var. Kaynak genel mimariyi düzensiz ve globüler, periferik globülleri ise düzensiz ve asimetrik olarak tarif ediyor."]
        }),
        fig(image("context-04.jpg", 305, 366, gunduzCredit, gunduz, "Supplementary Figure 2a", gunduzBasis, "Cropped at [2, 0, 307, 366] from the supplementary DOCX PNG and encoded as JPEG; panel letter retained, no enhancement."), {
          context: ["29-year-old man with personal history of melanoma. Site and evolution unreported in this panel.", "29 yaşında erkek, kişisel melanom öyküsü var. Panelde yerleşim ve değişim öyküsü bildirilmemiş."],
          diagnosis: ["Melanoma in situ arising in a dysplastic nevus", "Displastik nevüs zemininde melanoma in situ"],
          evidence: ["Excision histopathology in the supplement caption.", "Ek şeklin açıklamasında eksizyon histopatolojisi."],
          feedback: ["Globules occupy much of the perimeter and draw the eye outward. Look inside the rim again. The authors identify central architectural disorder and regression structures. Hairs cross the image.", "Globüller kenarın büyük bölümünde ve dikkati dışa çekiyor. Halkanın içine yeniden bak. Yazarlar merkezde mimari düzensizlik ve regresyon yapıları tarif ediyor. Görüntünün üzerinden kıllar geçiyor."]
        })
      ],
      takeaway: ["First decide whether globules build the overall pattern, form a peripheral rim, or cluster sectorally. In selected lesions with peripheral globules, lower-limb location was associated with melanoma, especially with architectural disorder, blotches, atypical dots or globules, or atypical vessels. The site alone cannot classify a lesion. A young age or visible rim should not end the examination.", "Önce globüllerin genel paterni mi oluşturduğunu, çevresel halka mı yaptığını, yoksa bir sektörde mi kümelendiğini belirle. Seçilmiş periferik globüllü lezyonlarda alt ekstremite yerleşimi, özellikle düzensiz mimari, blotch, atipik nokta veya globüller ya da atipik damarlar da varsa, melanomla ilişkili bulundu. Yerleşim tek başına tanıyı belirlemez. Genç yaşta ve belirgin bir halka varlığında da lezyonun tamamını incele."],
      counterexample: {
        note: ["Published lower-limb counterexample: a 46-year-old woman with symmetric peripheral globules on the right leg and a nevus confirmed by histology. The source figure includes dermoscopy (A) and histology (D).", "Yayımlanmış alt ekstremite karşı örneği: 46 yaşında bir kadının sağ bacağında simetrik periferik globüller ve histopatolojiyle doğrulanan nevüs. Kaynak şekil dermoskopiyi (A) ve histopatolojiyi (D) gösteriyor."],
        label: ["View the right-leg nevus in Figure 3", "Sağ bacaktaki nevüsü Şekil 3’te gör"],
        url: "https://dpcj.org/index.php/dpc/article/download/2360/1950/48022"
      },
      references: [
        ["Moraes et al. · JAAD · 2022", "https://pubmed.ncbi.nlm.nih.gov/35487331/"],
        ["Reiter et al. · JEADV · 2021", "https://pubmed.ncbi.nlm.nih.gov/33205467/"],
        ["Gündüz et al. · JAAD · 2026", "https://pubmed.ncbi.nlm.nih.gov/42562098/"]
      ]
    },
    {
      id: "network",
      title: ["Abrupt ending of the peripheral pigment network", "Periferde Pigment Ağının Aniden Sonlanması"],
      observation: ["What happens to the network as you follow it toward the edge?", "Ağı kenara doğru takip ettiğinde nasıl sonlanıyor?"],
      findings: [
        ["Abrupt ending in a local sector", "Bir sektörde aniden sonlanıyor"],
        ["Gradual fading toward the edge", "Kenara doğru giderek soluyor"],
        ["A sector is obscured by an optical artifact", "Bir sektör optik artefakt nedeniyle seçilemiyor"]
      ],
      weights: [
        ["Difference between opposite border sectors", "Karşılıklı kenar sektörleri arasındaki fark"],
        ["Asymmetry or additional structures", "Asimetri veya ek yapılar"],
        ["Image artifact", "Görüntü artefaktı"]
      ],
      cases: [
        fig(image("context-05.jpg", 550, 532, "Cristescu et al.", cristescu, "Figure 2", "The case article documents informed patient consent; the image shows only non-identifying skin."), {
          context: ["52-year-old woman. Right deltoid. Longstanding plaque with change over two years and a new raised focus.", "52 yaşında kadın. Sağ deltoid bölgesi. Uzun süredir var olan plak son iki yılda değişmiş ve kabarık bir odak gelişmiş."],
          diagnosis: ["Superficial spreading melanoma with a desmoplastic component", "Desmoplastik bileşenli yüzeyel yayılan melanom"],
          evidence: ["Excision histopathology and immunohistochemistry, Breslow 0.9 mm.", "Eksizyon histopatolojisi ve immünohistokimya, Breslow 0,9 mm."],
          feedback: ["Follow the superior network until it stops at the red source arrow. Then look for angulated lines, pseudopods and unequal distribution of colors and structures. This lesion gives several concordant clues.", "Üstteki pigment ağını kaynak görseldeki kırmızı oka kadar izle. Ardından açılı çizgileri, psödopodları ve renk ile yapıların eşitsiz dağılımını ara. Bu lezyonda birden fazla ipucu bir arada."]
        }),
        {
          image: dermoscopy("case-g25-02"), figure: "Figure 2D",
          context: ["62-year-old man. A 5 mm lesion on the right lower leg. Evolution unreported.", "62 yaşında erkek. Sağ alt bacakta 5 mm lezyon. Değişim öyküsü bildirilmemiş."],
          diagnosis: ["Lentiginous melanocytic nevus with cytologic atypia", "Sitolojik atipili lentijinöz melanositik nevüs"],
          evidence: ["Lesion-specific histopathology in the source caption.", "Kaynak açıklamasında lezyona özgü histopatoloji."],
          feedback: ["The network varies in thickness, and bubbles and hairs obscure parts of the margin. Trace an unobstructed sector and distinguish a network ending from an optical interruption. The source reports an atypical network in this nevus.", "Ağ çizgilerinin kalınlığı değişiyor ve kenarın bir kısmı kabarcıklar ile kıllar altında kalıyor. Görülebilen bir sektörü takip et ve ağın gerçek sonlanmasını optik kesintiden ayır. Kaynak bu nevüste atipik ağ bildiriyor."]
        }
      ],
      takeaway: ["Trace the actual network lines in several sectors. A focal cutoff has to be interpreted with the architecture, other structures and image quality. The source comparison below includes an atypical nevus that also has an abrupt pigment cutoff.", "Birden fazla sektörde pigment ağının çizgilerini izle. Fokal sonlanmayı mimari, diğer yapılar ve görüntü kalitesiyle birlikte değerlendir. Aşağıdaki kaynakta pigmentin aniden sonlandığı atipik nevüs örneği de var."],
      references: [
        ["Argenziano et al. · Figures 9–10", "https://jamanetwork.com/journals/jamadermatology/fullarticle/189703"],
        ["DermNet · Dermoscopic features", "https://dermnetnz.org/cme/dermoscopy-course/dermoscopic-features"]
      ]
    },
    {
      id: "facial-gray",
      title: ["Gray structures around facial follicles", "Yüzde Gri Perifoliküler Yapılar"],
      observation: ["What do you see around the follicular openings?", "Folikül açıklıklarının çevresinde ne görüyorsun?"],
      findings: [
        ["Uneven gray or gray-brown dots", "Dengesiz gri veya gri-kahverengi noktalar"],
        ["Predominantly even brown pigment", "Ağırlıklı olarak dengeli kahverengi pigment"],
        ["A mixture of gray and brown", "Gri ve kahverengi karışımı"]
      ],
      weights: [
        ["Uneven pigment around individual follicles", "Tek tek foliküllerin çevresinde eşitsiz pigment"],
        ["Scale or the background pseudonetwork", "Skuam veya zemindeki psödoağ"],
        ["Visibility of the openings", "Folikül açıklıklarının görülebilirliği"]
      ],
      cases: [
        {
          image: dermoscopy("case-g25-06"), figure: "Figure 1d",
          context: ["71-year-old woman. Upper eyelid. Evolution unreported.", "71 yaşında kadın. Üst göz kapağı. Değişim öyküsü bildirilmemiş."],
          diagnosis: ["Solar lentigo", "Solar lentigo"],
          evidence: ["The caption gives the diagnosis. Histology is reported in the study methods.", "Tanı şekil açıklamasında, histopatoloji ise çalışmanın yöntem bölümünde bildiriliyor."],
          feedback: ["Pale follicular openings interrupt predominantly orange-brown pigment. Gray granules are not apparent in this frame. Inspect the rim of several separate openings before deciding whether gray is visible.", "Açık renkli folikül açıklıkları ağırlıklı olarak turuncu-kahverengi pigmenti kesiyor. Bu karede gri granüller seçilmiyor. Gri pigmenti değerlendirmek için birkaç ayrı açıklığın çevresine bak."]
        },
        {
          image: dermoscopy("case-g25-05"), figure: "Figure 1f",
          context: ["66-year-old man. Lateral face near the hairline. Evolution unreported.", "66 yaşında erkek. Saç çizgisine yakın lateral yüz. Değişim öyküsü bildirilmemiş."],
          diagnosis: ["Lentigo maligna", "Lentigo maligna"],
          evidence: ["The caption gives the diagnosis. Histology is reported in the study methods.", "Tanı şekil açıklamasında, histopatoloji ise çalışmanın yöntem bölümünde bildiriliyor."],
          feedback: ["Look for gray-brown dots around several openings and compare pigment density from side to side. The combination of gray and uneven perifollicular distribution is more informative than the background pseudonetwork.", "Birkaç açıklığın etrafındaki gri-kahverengi noktaları ara ve pigment yoğunluğunu iki tarafta karşılaştır. Gri rengin eşitsiz perifoliküler dağılımı, zemindeki psödoağa göre daha fazla bilgi verir."]
        }
      ],
      takeaway: ["On the face, a pseudonetwork can occur across diagnoses. Compare individual follicular openings and the overall symmetry. Pigmented actinic keratosis can also show gray dots and asymmetric perifollicular pigmentation.", "Yüzde psödoağ farklı tanılarda görülebilir. Tek tek folikül açıklıklarını ve genel simetriyi karşılaştır. Pigmente aktinik keratozda da gri noktalar ve asimetrik perifoliküler pigmentasyon görülebilir."],
      references: [
        ["International Dermoscopy Society · Lentigo maligna consensus", "https://doi.org/10.1111/jdv.70406"],
        ["Akay et al. · Pigmented actinic keratosis and lentigo maligna", "https://pubmed.ncbi.nlm.nih.gov/21083845/"]
      ]
    },
    {
      id: "pink-vessels",
      title: ["Vessel distribution in pink lesions", "Pembe Lezyonlarda Damar Dağılımı"],
      observation: ["What can you resolve on the pink background?", "Pembe zeminde hangi yapıları seçebiliyorsun?"],
      findings: [
        ["Uneven dots and short lines", "Dengesiz dağılmış noktalar ve kısa çizgiler"],
        ["Fine vessels around scale or shiny structures", "Skuam veya parlak yapıların çevresinde ince damarlar"],
        ["Pink and white areas; vessel types indistinct", "Pembe ve beyaz alanlar, damar tipleri belirsiz"]
      ],
      weights: [
        ["Vessel type and distribution", "Damar tipi ve dağılımı"],
        ["Scale, crust or ulceration", "Skuam, krut veya ülserasyon"],
        ["Patient history, site or limits of visibility", "Öykü, yerleşim veya görüntünün sınırları"]
      ],
      cases: [
        {
          image: dermoscopy("case-g30-02"), figure: "Dermoscopy in the case report",
          context: ["82-year-old man. Solitary pink scaly plaque on the mid-back. Evolution before presentation unreported.", "82 yaşında erkek. Sırt ortasında tek pembe skuamlı plak. Başvuru öncesi değişim bildirilmemiş."],
          diagnosis: ["Solitary lichen planus-like keratosis", "Soliter likenoid keratoz"],
          evidence: ["Punch-biopsy histopathology. The report describes later spontaneous regression.", "Punch biyopsi histopatolojisi. Kaynak daha sonra spontan gerileme bildiriyor."],
          feedback: ["Look at fine vessels alongside scale and shiny white structures. In this case, white structures and a pink background can resemble malignancy. Source arrows are retained.", "İnce damarları skuam ve parlak beyaz yapılarla birlikte incele. Bu olgudaki beyaz yapılar ve pembe zemin malign lezyonlarla benzerlik gösterebilir. Kaynak okları korunmuştur."]
        },
        {
          image: dermoscopy("case-g25-03"), figure: "Figure 5B",
          context: ["74-year-old man. Pink papule on the scalp vertex. Evolution unreported.", "74 yaşında erkek. Skalp verteksinde pembe papül. Değişim öyküsü bildirilmemiş."],
          diagnosis: ["Nodular amelanotic melanoma", "Nodüler amelanotik melanom"],
          evidence: ["Lesion-specific histopathology in the caption, Breslow 5.5 mm.", "Şekil açıklamasında lezyona özgü histopatoloji, Breslow 5,5 mm."],
          feedback: ["The source describes polymorphous vessels and ulceration. In the stored frame, hairs and crust limit what you can confidently identify. Look for unequal distribution of dots and short lines and keep individual vessel types uncertain if blurred.", "Kaynak polimorf damarlar ve ülserasyon tarif ediyor. Saklanan karede kıllar ve krut seçilebilen ayrıntıları sınırlıyor. Noktalarla kısa çizgilerin dengesiz dağılımını ara, bulanık damar tiplerini belirsiz bırak."]
        }
      ],
      takeaway: ["In a pink lesion, scan the whole image for vessel morphology, clustering and background structures. Material over the lesion and image quality can obscure the pattern.", "Pembe lezyonda görüntünün tamamını damar morfolojisi, kümelenme ve zemin yapıları açısından tara. Lezyonun yüzeyindeki materyal ve görüntü kalitesi paterni örtebilir."],
      references: [
        ["DermNet · Amelanotic melanoma dermoscopy", "https://dermnetnz.org/topics/amelanotic-melanoma-dermoscopy"]
      ]
    }
  ];
})();
