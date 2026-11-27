(function () {
  "use strict";

  // Educational translation drafts. The English source records remain authoritative.
  const paragraphs = {
    "actinic-keratosis": {
      description: "Kronik güneş gören deride UV ile ilişkili intraepidermal keratinositik neoplastik lezyondur. Bazı lezyonlar kutanöz skuamöz hücreli karsinoma ilerleyebilir. Tek bir lezyon için evrensel ve kesin bir ilerleme yüzdesi burada verilmez.",
      clinical: "Kronik güneş gören yüz, kulak, saçsız skalp, el sırtı veya ön kolda genellikle pürtüklü eritemli makül, papül ya da plak olarak görülür. Skuam veya hiperkeratoz değişken olabilir. Lezyonlar hassas ve alan kanserleşmesi içinde çok sayıda olabilir. Pigmente aktinik keratoz ayrı bir klinik varyanttır. Dudaktaki aktinik keilit ilişkili ancak ayrı bir hastalıktır.",
      dermoscopy: "Pigmentsiz yüz lezyonlarında eritemli psödoağ veya çilek paterni, yüzey skuamı, folikül açıklıkları ve keratin tıkaçları görülebilir. Çilek paterni her aktinik keratoz için geçerli değildir. Pigmente lezyonlarda kahverengi veya gri psödoağ, halkasal granüler pigmentasyon, asimetrik pigmentli folikül açıklıkları, gri noktalar ve romboidal yapılar görülebilir. Dermoskopi değerlendirmeyi destekler. Şüpheli değişiklikler varsa maligniteyi dışlamaz."
    },
    "basal-cell-carcinoma": {
      description: "Bazal hücreli karsinom, lokal infiltratif ve yıkıcı büyüyebilen malign epitelyal deri tümörüdür. Metastaz çok nadirdir.",
      clinical: "Klinik görünüm değişkendir. Nodüler tip genellikle telenjiektaziler içeren deri renginde veya eritemli, inci parlaklığında papül ya da nodüldür. Merkezinde ülserasyon olabilir. Yüzeyel tip çoğu zaman eritemli makül veya ince plak şeklindedir. Erozyon veya kanama görülebilir. Morfea benzeri tip beyazımsı, atrofik, skar benzeri ve sınırları belirsiz plak şeklinde olabilir. Pigmente varyantlar da görülür. Klinik görünüm tek başına histolojik alt tipi güvenilir biçimde belirlemez.",
      dermoscopy: "Dermoskopi tanısal güveni artırabilir. Histopatoloji veya cerrahi sınır değerlendirmesinin yerine geçmez. Dallanan damarlar, kısa ince telenjiektaziler, mavi gri oval yuvalar, çoklu mavi gri globüller veya noktalar, akçaağaç yaprağı benzeri alanlar, tekerlek teli veya konsantrik yapılar, ülserasyon ve erozyonlar, parlak beyaz kırmızı yapısız alanlar ve beyaz çizgiler destekleyici bulgulardır. Pigment ağının yokluğu destekleyicidir ancak kesin değildir. Paternler alt tipe göre değişir. Klinik veya dermoskopik ülserasyon tek başına S2k Tablo 2'de yüksek nüks riski ölçütü değildir."
    },
    "cutaneous-squamous-cell-carcinoma": {
      description: "Lokal nüks, bölgesel lenf nodu tutulumu ve metastaz riskleri değişken olan malign keratinositik neoplazidir.",
      clinical: "Kalıcı hiperkeratotik papül, plak veya nodül olarak görülebilir. Krut, ülserasyon, hassasiyet veya hızlı büyüme eşlik edebilir.",
      dermoscopy: "Keratin, beyaz halkalar veya yapısız alanlar, skuam, ülserasyon ve değişken damar paternleri görülebilir."
    },
    "squamous-cell-carcinoma-in-situ": {
      description: "Epidermisle sınırlı intraepidermal skuamöz hücreli karsinomdur.",
      clinical: "Genellikle kalıcı, sınırları belirgin eritemli ve skuamlı yama veya plaktır. Pigmente varyantlar görülebilir.",
      dermoscopy: "Gruplanmış glomerüler veya kıvrımlı damarlar ve skuam görülebilir. Pigmente lezyonlarda kahverengi veya gri noktalar ile globüller bulunabilir."
    },
    "cutaneous-melanoma": {
      description: "Metastaz potansiyeli taşıyan malign melanositik neoplazidir. Prognoz tanı anındaki evreyle güçlü biçimde ilişkilidir.",
      clinical: "Asimetri, sınır düzensizliği, renk çeşitliliği, zamanla değişim veya hastanın diğer nevüslerinden farklı görünüm şüphe uyandırabilir. Bazı melanomlar amelanotiktir.",
      dermoscopy: "Paternler alt tipe göre değişir. Yapı ve renk asimetrisi, atipik pigment ağı, düzensiz noktalar veya globüller, atipik uzantılar, regresyon yapıları ve atipik damarlar görülebilir."
    },
    "lentigo-maligna": {
      description: "Kronik güneş hasarlı deride, en sık baş ve boyunda gelişen melanom in situ tipidir.",
      clinical: "Genellikle yavaş genişleyen, renk ve sınır değişkenliği gösteren düzensiz pigmente makül veya yamadır.",
      dermoscopy: "Asimetrik pigmentli folikül açıklıkları, halkasal granüler patern, gri noktalar veya globüller ve romboidal yapılar görülebilir."
    },
    "acral-melanoma": {
      description: "Avuç içi, ayak tabanı veya tırnak ünitesi dahil akral bölgede gelişen melanomdur. Kümülatif güneş hasarıyla tanımlanmaz.",
      clinical: "Avuç içinde veya ayak tabanında yeni gelişen ya da değişen, düzensiz pigmente makül veya yama şeklinde görülebilir. Tırnakta endişe verici değişiklikler gösteren boyuna pigmentasyon olabilir. Bazı lezyonlar hipomelanotiktir.",
      dermoscopy: "Palmoplantar deride paralel sırt paterni, düzensiz yaygın pigmentasyon veya çok bileşenli patern şüphe uyandırabilir. Tırnak bulguları anatomik bölgeye özgü olarak değerlendirilmelidir."
    }
  };

  const dictionary = {};
  const diseases = window.DOCUTIS_DATA && window.DOCUTIS_DATA.diseases || [];
  diseases.forEach(function (disease) {
    const translation = paragraphs[disease.id];
    if (!translation) return;
    ["description", "clinical", "dermoscopy"].forEach(function (field) {
      if (typeof disease[field] === "string" && translation[field]) {
        dictionary[disease[field]] = translation[field];
      }
    });
  });
  window.DOCUTIS_CLINICAL_LOCALE = Object.freeze(dictionary);
})();
