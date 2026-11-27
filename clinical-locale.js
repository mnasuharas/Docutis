(function () {
  "use strict";

  // Educational translation drafts. The English source records remain authoritative.
  const paragraphs = {
    "actinic-keratosis": {
      description: "Kronik güneş gören deride UV ile ilişkili intraepidermal keratinositik neoplastik lezyondur. Bazı lezyonlar kutanöz skuamöz hücreli karsinoma ilerleyebilir. Tek bir lezyon için evrensel ve kesin bir ilerleme yüzdesi burada verilmez.",
      clinical: "Kronik güneş gören yüz, kulak, saçsız skalp, el sırtı veya ön kolda genellikle pürtüklü eritemli makül, papül ya da plak olarak görülür. Skuam veya hiperkeratoz değişken olabilir. Lezyonlar hassas ve alan kanserleşmesi içinde çok sayıda olabilir. Pigmente aktinik keratoz ayrı bir klinik varyanttır. Dudaktaki aktinik keilit ilişkili ancak ayrı bir hastalıktır.",
      dermoscopy: "Pigmentsiz yüz lezyonlarında eritemli psödoağ veya çilek paterni, yüzey skuamı, folikül açıklıkları ve keratin tıkaçları görülebilir. Çilek paterni her aktinik keratoz için geçerli değildir. Pigmente lezyonlarda kahverengi veya gri psödoağ, halkasal granüler pigmentasyon, asimetrik pigmentli folikül açıklıkları, gri noktalar ve romboidal yapılar görülebilir. Dermoskopi değerlendirmeyi destekler. Şüpheli değişiklikler varsa maligniteyi dışlamaz.",
      differential: "Skuamöz hücreli karsinom in situ / Bowen hastalığı, invaziv kutanöz skuamöz hücreli karsinom, seboreik keratoz, yüzeyel bazal hücreli karsinom, inflamatuvar dermatozlar, solar lentigo ve özellikle yüzdeki pigmente lezyonlarda lentigo maligna.",
      treatment: "Önce invaziv kutanöz skuamöz hücreli karsinomu veya başka bir maligniteyi dışlayın. Tek veya sınırlı sayıdaki lezyonlarda lezyona yönelik; çok sayıda aktinik keratozda veya alan kanserleşmesinde alana yönelik tedavi kullanın. Lezyonların sayısı ve kalınlığı, yerleşim yeri, alan kanserleşmesi, immünsüpresyon, eşlik eden hastalıklar, önceki tedaviler, tedaviye uyum, tercih, tolere edilebilirlik ve kozmetik sonucu dikkate alarak bireyselleştirin. Düzenli UV korunması temeldir. Her durumda üstün tek bir yöntem yoktur. Aşağıdaki topikal tedavi şemaları Almanya/AB ürün bilgilerine dayanır; farklı konsantrasyonlara genellenmemelidir. Ruhsatlı kullanım ile kılavuz önerisini ayırt edin.",
      followup: "Komplike olmayan aktinik keratoz için dayanağı olmayan tek bir sabit kontrol aralığı yerine, tedaviye özgü bir aralıkta yanıtı değerlendirin. Kalıcı, nükseden veya değişen lezyonları yeniden değerlendirin; skuamöz hücreli karsinom şüphesinde histoloji elde edin. Uzun dönem izlemi lezyon yükü, alan kanserleşmesi, immünsüpresyon, önceki keratinosit kanseri, tedavi direnci ve mesleki UV maruziyetine göre bireyselleştirin."
    },
    "basal-cell-carcinoma": {
      description: "Bazal hücreli karsinom, lokal infiltratif ve yıkıcı büyüyebilen malign epitelyal deri tümörüdür. Metastaz çok nadirdir.",
      clinical: "Klinik görünüm değişkendir. Nodüler tip genellikle telenjiektaziler içeren deri renginde veya eritemli, inci parlaklığında papül ya da nodüldür. Merkezinde ülserasyon olabilir. Yüzeyel tip çoğu zaman eritemli makül veya ince plak şeklindedir. Erozyon veya kanama görülebilir. Morfea benzeri tip beyazımsı, atrofik, skar benzeri ve sınırları belirsiz plak şeklinde olabilir. Pigmente varyantlar da görülür. Klinik görünüm tek başına histolojik alt tipi güvenilir biçimde belirlemez.",
      dermoscopy: "Dermoskopi tanısal güveni artırabilir. Histopatoloji veya cerrahi sınır değerlendirmesinin yerine geçmez. Dallanan damarlar, kısa ince telenjiektaziler, mavi gri oval yuvalar, çoklu mavi gri globüller veya noktalar, akçaağaç yaprağı benzeri alanlar, tekerlek teli veya konsantrik yapılar, ülserasyon ve erozyonlar, parlak beyaz kırmızı yapısız alanlar ve beyaz çizgiler destekleyici bulgulardır. Pigment ağının yokluğu destekleyicidir ancak kesin değildir. Paternler alt tipe göre değişir. Klinik veya dermoskopik ülserasyon tek başına S2k Tablo 2'de yüksek nüks riski ölçütü değildir.",
      differential: "Kutanöz skuamöz hücreli karsinom, keratoakantom, skuamöz hücreli karsinom in situ / Bowen hastalığı, aktinik keratoz, sebase hiperplazi, intradermal nevüs, seboreik keratoz, melanom (özellikle pigmente bazal hücreli karsinomda), dermatofibrom / skar (morfea benzeri tipte) ve inflamatuvar dermatozlar (yüzeyel tipte).",
      treatment: "Alman S2k nüks riski sınıflaması tedavi seçimini yönlendirir; inkomplet (R1) eksizyon, lokal ileri bazal hücreli karsinom (laBCC/lfBZK) ve metastatik bazal hücreli karsinom (mBCC) ayrı değerlendirilmelidir. Çoğu bazal hücreli karsinomda histolojik sınır değerlendirmesiyle tam cerrahi çıkarım ilk seçenektir: düşük nüks riskinde 3–5 mm periferik güvenlik sınırıyla konvansiyonel eksizyon; yüksek nüks riski veya nükste, olanak varsa mikroskopik kontrollü cerrahi (MCS), yoksa >5 mm konvansiyonel sınır tercih edilir. Seçilmiş cerrahi dışı yöntemler (imikimod, 5-fluorourasil, ALA/MAL fotodinamik tedavi, radyoterapi ve sınırlı destrüktif seçenekler) ancak ürüne özgü ruhsat koşulları ve kılavuzdaki kullanım yeri çerçevesinde uygulanır; histolojik sınır değerlendirmesiyle tam cerrahi çıkarımla eşdeğer kabul edilmez. Lokal ileri veya metastatik hastalık, ürüne özgü sistemik seçeneklerle multidisipliner değerlendirme gerektirir.",
      followup: "İzlem Alman S2k kılavuzuna göre riske uyarlanır; lokal nüks ve ek primer deri kanserleri açısından takip içerir. Almanya'ya özgü kontrol aralıkları ayrı bazal hücreli karsinom izlem protokolünde verilir. Hastalara düzenli öz deri muayenesi ve UV korunması anlatılmalıdır; bazal hücreli karsinom sendromu veya kronik immünsüpresyonu olanlara özellikle dikkat edilmelidir. Yeni, nükseden, iyileşmeyen, büyüyen, kanayan veya başka açıdan şüpheli lezyonlar klinik yeniden değerlendirme gerektirir."
    },
    "cutaneous-squamous-cell-carcinoma": {
      description: "Lokal nüks, bölgesel lenf nodu tutulumu ve metastaz riskleri değişken olan malign keratinositik neoplazidir.",
      clinical: "Kalıcı hiperkeratotik papül, plak veya nodül olarak görülebilir. Krut, ülserasyon, hassasiyet veya hızlı büyüme eşlik edebilir.",
      dermoscopy: "Keratin, beyaz halkalar veya yapısız alanlar, skuam, ülserasyon ve değişken damar paternleri görülebilir.",
      differential: "Aktinik keratoz, skuamöz hücreli karsinom in situ, keratoakantom, verruka, bazal hücreli karsinom ve benign keratotik lezyonlar.",
      treatment: "Tedavi klinik ve histopatolojik risk değerlendirmesine dayanır. Lokalize hastalıkta sıklıkla cerrahi uygulanır; yüksek riskli, bölgesel veya ileri hastalık kılavuza dayalı multidisipliner bakım gerektirir.",
      followup: "İzlem riske göre uyarlanmalı; primer bölge, endikasyon varsa bölgesel lenf nodları ve ek deri kanserlerinin gelişimi değerlendirilmelidir."
    },
    "squamous-cell-carcinoma-in-situ": {
      description: "Epidermisle sınırlı intraepidermal skuamöz hücreli karsinomdur.",
      clinical: "Genellikle kalıcı, sınırları belirgin eritemli ve skuamlı yama veya plaktır. Pigmente varyantlar görülebilir.",
      dermoscopy: "Gruplanmış glomerüler veya kıvrımlı damarlar ve skuam görülebilir. Pigmente lezyonlarda kahverengi veya gri noktalar ile globüller bulunabilir.",
      differential: "Aktinik keratoz, yüzeyel bazal hücreli karsinom, psoriazis, egzama, melanom ve invaziv kutanöz skuamöz hücreli karsinom.",
      treatment: "Cerrahi ve seçilmiş cerrahi dışı yaklaşımlar arasındaki seçim lezyonun yerine, boyutuna, hastayla ilgili etkenlere ve tanısal kesinliğe bağlıdır. İnvazyon şüphesi histolojik değerlendirme gerektirir.",
      followup: "Kalıcılık veya nüks açısından kontrol edin; süregelen aktinik hasarı ve ek keratinosit kanseri riskini dikkate alın."
    },
    "cutaneous-melanoma": {
      description: "Metastaz potansiyeli taşıyan malign melanositik neoplazidir. Prognoz tanı anındaki evreyle güçlü biçimde ilişkilidir.",
      clinical: "Asimetri, sınır düzensizliği, renk çeşitliliği, zamanla değişim veya hastanın diğer nevüslerinden farklı görünüm şüphe uyandırabilir. Bazı melanomlar amelanotiktir.",
      dermoscopy: "Paternler alt tipe göre değişir. Yapı ve renk asimetrisi, atipik pigment ağı, düzensiz noktalar veya globüller, atipik uzantılar, regresyon yapıları ve atipik damarlar görülebilir.",
      differential: "Melanositik nevüs, seboreik keratoz, pigmente bazal hücreli karsinom ve diğer pigmente veya amelanotik lezyonlar.",
      treatment: "Lokalize primer melanomun tedavisi eksizyon ve histopatolojik evrelemeye dayanır. Ek cerrahi, lenf nodu değerlendirmesi ve sistemik tedavi kararları evreye ve güncel uzman kılavuzlarına bağlıdır.",
      followup: "İzlemin sıklığı evreye ve riske bağlıdır; güncel ulusal veya uluslararası melanom kılavuzları izlenmelidir."
    },
    "lentigo-maligna": {
      description: "Kronik güneş hasarlı deride, en sık baş ve boyunda gelişen melanom in situ tipidir.",
      clinical: "Genellikle yavaş genişleyen, renk ve sınır değişkenliği gösteren düzensiz pigmente makül veya yamadır.",
      dermoscopy: "Asimetrik pigmentli folikül açıklıkları, halkasal granüler patern, gri noktalar veya globüller ve romboidal yapılar görülebilir.",
      differential: "Solar lentigo, seboreik keratoz, pigmente aktinik keratoz, likenoid keratoz ve diğer melanositik lezyonlar.",
      treatment: "Uygulanabilir olduğunda histolojik değerlendirmeyle tam tedavi tercih edilir; yaklaşım lezyon boyutuna, yerleşimine, hastayla ilgili etkenlere ve güncel melanom kılavuzlarına bağlıdır.",
      followup: "İzlemde lokal nüks ve ek melanositik ve keratinositik tümörler değerlendirilmelidir."
    },
    "acral-melanoma": {
      description: "Avuç içi, ayak tabanı veya tırnak ünitesi dahil akral bölgede gelişen melanomdur. Kümülatif güneş hasarıyla tanımlanmaz.",
      clinical: "Avuç içinde veya ayak tabanında yeni gelişen ya da değişen, düzensiz pigmente makül veya yama şeklinde görülebilir. Tırnakta endişe verici değişiklikler gösteren boyuna pigmentasyon olabilir. Bazı lezyonlar hipomelanotiktir.",
      dermoscopy: "Palmoplantar deride paralel sırt paterni, düzensiz yaygın pigmentasyon veya çok bileşenli patern şüphe uyandırabilir. Tırnak bulguları anatomik bölgeye özgü olarak değerlendirilmelidir.",
      differential: "Akral nevüs, subkorneal hemoraji, verruka, kallus, tinea nigra ve benign veya travmatik tırnak pigmentasyonu.",
      treatment: "Şüpheli lezyonlarda doğru tanı ve evrelemeye olanak verecek biçimde planlanmış biyopsi gerekir. Doğrulanmış hastalık melanom evresine ve bölgeye özgü cerrahi özelliklere göre yönetilir.",
      followup: "Güncel kılavuza göre evreye dayalı melanom izlemi ile kalan derinin ve ilgili lenf nodu bölgelerinin muayenesi değerlendirilir."
    }
  };

  const dictionary = {};
  const diseases = window.DOCUTIS_DATA && window.DOCUTIS_DATA.diseases || [];
  diseases.forEach(function (disease) {
    const translation = paragraphs[disease.id];
    if (!translation) return;
    ["description", "clinical", "dermoscopy", "differential", "treatment", "followup"].forEach(function (field) {
      if (typeof disease[field] === "string" && translation[field]) {
        dictionary[disease[field]] = translation[field];
      }
    });
  });
  window.DOCUTIS_CLINICAL_LOCALE = Object.freeze(dictionary);
})();
