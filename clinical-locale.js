(function () {
  "use strict";

  // Educational translation drafts. The English source records remain authoritative.
  const paragraphs = {
    "seborrheic-keratosis": {
      description: "Benign epidermal keratinositik tümördür.",
      clinical: "Keskin sınırlı, mumsu veya keratotik, deriye yapışık gibi duran papül ya da plak. İrritasyon tipik yüzey özelliklerini örtebilir.",
      dermoscopy: "Komedon benzeri açıklıklar, milia benzeri kistler, oluklar ve kabarıklıklar tanıyı destekleyebilir. Atipik pigment ağı, mavi-beyaz örtü veya düzensiz periferik uzantılar açısından tüm lezyonu incele.",
      differential: "Melanom, pigmente bazal hücreli karsinom, aktinik keratoz ve skuamöz hücreli karsinom.",
      treatment: "Tanısı güvenilir ve asemptomatik lezyon genellikle tedavi gerektirmez. Belirsizlikte ileri değerlendirme gerekir. Ayırıcı tanıda malignite kaldığında histoloji düşünülür.",
      followup: "Özellikle atipik veya uyumsuz bulgular varsa değişim ve açıklanamayan yeni belirtiler yeniden değerlendirilir."
    },
    "dermatofibroma": {
      description: "Benign dermal fibrohistiyositik lezyondur.",
      clinical: "Genellikle ekstremitede sert papül veya nodül şeklindedir. Yandan sıkıştırıldığında çökme görülebilir.",
      dermoscopy: "Ortada skar benzeri beyaz alan ve çevrede ince pigment ağı klasik bir birlikteliktir. Farklı paternler sık görülür.",
      differential: "Melanositik nevüs, melanom, skar ve özellikle büyüyen veya atipik lezyonda dermatofibrosarkoma protuberans.",
      treatment: "Stabil, tanısı güvenilir ve asemptomatik lezyon genellikle tedavi gerektirmez. Büyüyen ya da tanısı belirsiz lezyon temsil edici histolojiyle değerlendirilir.",
      followup: "İlerleyici büyüme, ülserasyon veya yeni klinik ve dermoskopik uyumsuzluk yeniden değerlendirilir."
    },
    "solar-lentigo": {
      description: "Kümülatif UV maruziyetiyle ilişkili benign edinsel pigmente maküldür.",
      clinical: "Güneş gören yüz, el sırtı ve üst gövdede açık kahverengiden kahverengiye uzanan düz maküller görülür. Değişen tek bir makülü komşu lezyonlarla karşılaştır.",
      dermoscopy: "Keskin veya girintili sınır, parmak izi benzeri çizgiler ve görece homojen kahverengi pigmentasyon tanıyı destekleyebilir. Yüzde foliküllerin çevresindeki dağılımı ve odaksal gri yapıları bağlamıyla değerlendir.",
      differential: "Lentigo maligna, pigmente aktinik keratoz, likenoid keratoz ve düz seboreik keratoz.",
      treatment: "Güneşten korunma uygundur. Kozmetik tedavi öncesinde benign tanıyı doğrula. Malignite olasılığı sürüyorsa ileri değerlendirme ve temsil edici histoloji önceliklidir.",
      followup: "Yeni asimetri, odaksal pigment değişikliği veya belgelenmiş değişim yeniden değerlendirilir."
    },

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
    },
    "actinic-cheilitis": {
      description: "Dudakta, genellikle alt dudağın vermilyonunda gelişen kronik UV hasarıdır. Skuamöz hücreli karsinoma ilerleme riski taşır.",
      clinical: "Kalıcı kuruluk, skuam, atrofi, eritem, fissürler, vermilyon sınırının silikleşmesi veya fokal ülserasyon görülebilir.",
      dermoscopy: "Bildirilen bulgular arasında skuam, beyaz yapısız alanlar, eritem ve damarsal değişiklikler yer alır. Malignite şüphesinde dermoskopi biyopsinin yerine geçmez.",
      differential: "İnflamatuvar veya kontakt keilit, skuamöz hücreli karsinom in situ, dudağın invaziv skuamöz hücreli karsinomu ve kalıcı keilitin diğer nedenleri.",
      treatment: "Yaklaşım tutulumun yaygınlığına ve tanısal şüpheye bağlıdır. Lezyona veya alana yönelik yöntemler kullanılabilir. Kalıcı ülserasyon, indürasyon veya nodülarite gecikmeden uzman değerlendirmesi gerektirir.",
      followup: "Düzenli güneşten korunma ve klinik izlem uygundur. Yeni bir odaksal değişiklik, skuamöz malignite açısından yeniden değerlendirilmelidir."
    },
    "keratoacanthoma": {
      description: "Hızlı büyüyen, krater biçimli keratinositik tümördür. İyi diferansiye kutanöz skuamöz hücreli karsinomla ilişkisi tartışmalıdır. Klinik ve histolojik özellikleri belirgin ölçüde örtüşür.",
      clinical: "Genellikle güneş gören deride hızla gelişen, merkezinde keratinle dolu krater bulunan kubbe biçimli nodüldür.",
      dermoscopy: "Merkezi keratin kitlesi, beyaz halkalar, firkete biçimli damarlar veya başka damar paternleri görülebilir. Bu bulgular skuamöz hücreli karsinomu güvenilir biçimde dışlamaz.",
      differential: "İyi diferansiye kutanöz skuamöz hücreli karsinom, verruka, nodüler bazal hücreli karsinom ve amelanotik melanom.",
      treatment: "Kutanöz skuamöz hücreli karsinomdan güvenilir biçimde ayırmak güç olabileceğinden genellikle uzman değerlendirmesi ve histopatolojik inceleme gerekir.",
      followup: "İzlem, kesin histopatolojik tanıya, uygulanan tedaviye ve hastanın genel keratinosit kanseri riskine bağlıdır."
    },
    "lentigo-maligna-melanoma": {
      description: "Lentigo maligna ile ilişkili gelişen invaziv melanomdur. Genellikle baş ve boyunda, kronik güneş hasarı olan deride görülür.",
      clinical: "Genişleyen, düzensiz pigmentli yamada kalınlaşma, nodülarite, ülserasyon veya yeni renk farklılıkları gelişmesi invazyon şüphesi doğurabilir.",
      dermoscopy: "Bulgular lentigo maligna ile örtüşür. Renk çeşitliliğinin artması, yapısız alanlar ve başka değişiklikler şüphe uyandırabilir. İnvazyon dermoskopiyle güvenilir biçimde belirlenemez.",
      differential: "Lentigo maligna, solar lentigo, pigmente aktinik keratoz, seboreik keratoz ve diğer melanom alt tipleri.",
      treatment: "Tam eksizyon ve histopatolojik evreleme gerekir. Sonraki yaklaşım, evreye uygun melanom kılavuzlarına göre belirlenir.",
      followup: "İzlem evreye, tedaviye ve nüks riskine göre bireyselleştirilir."
    },
    "nodular-melanoma": {
      description: "Klinikte belirgin kabarıklıkla kendini gösteren ve vertikal büyümesi hızlı olabilen invaziv melanom paternidir.",
      clinical: "Sıklıkla yeni gelişen, büyüyen, sert bir papül veya nodüldür. Koyu pigmentli, pembe ya da kırmızı olabilir ve ülserleşebilir veya kanayabilir.",
      dermoscopy: "Asimetrik pigmentasyon, mavi-siyah veya yapısız alanlar, atipik damarlar, ülserasyon ya da çok bileşenli patern görülebilir. Amelanotik lezyonları tanımak güç olabilir.",
      differential: "Pigmente bazal hücreli karsinom, anjiyom, piyojenik granülom, dermatofibrom, mavi nevüs ve diğer melanom alt tipleri.",
      treatment: "Gecikmeden biyopsi ve histopatolojik evreleme yapılması esastır. Tanı doğrulanırsa tedavi evreye uygun melanom kılavuzlarına göre planlanır.",
      followup: "İzlem evreye, tedaviye ve nüks riskine göre bireyselleştirilir."
    },
    "desmoplastic-melanoma": {
      description: "İğsi hücre proliferasyonu ve desmoplaziyle karakterize nadir bir invaziv melanom varyantıdır. Sıklıkla baş ve boyunda, kronik güneş hasarı olan deride gelişir. Saf ve mikst formlar arasında klinik açıdan önemli patolojik farklılıklar vardır. Nörotropizm görülebilir.",
      clinical: "Skarı andıran, sert ve yavaş büyüyen deri renginde veya pembe papül, plak ya da nodül olarak görülebilir. Pigmentasyon olmayabilir.",
      dermoscopy: "Tanı koydurucu tek bir patern tanımlanmamıştır. Melanomla ilişkili yapılar veya atipik damarlar görülebilir. Amelanotik lezyonların görünümü özgül olmayabilir.",
      differential: "Skar, dermatofibrom, iğsi hücreli skuamöz hücreli karsinom, atipik fibroksantom ve diğer amelanotik tümörler.",
      treatment: "Tanı histopatolojik inceleme gerektirir ve sıklıkla dermatopatoloji uzmanlığından yararlanılır. Tedavi ve evreleme güncel melanom kılavuzlarına göre yapılır. Saf veya mikst morfoloji, cerrahi sınırlar ve nörotropizm multidisipliner risk değerlendirmesini etkileyebilir.",
      followup: "Evreye ve riske dayalı izlemde primer tümör bölgesi dikkatle değerlendirilmeli, uygun durumlarda nörolojik belirtiler de sorgulanmalıdır."
    },
    "merkel-cell-carcinoma": {
      description: "Bölgesel ve uzak yayılım riski belirgin olan, nadir ve agresif bir nöroendokrin deri karsinomudur.",
      clinical: "Genellikle güneş gören deride hızlı büyüyen, ağrısız, sert, kırmızı, morumsu veya deri renginde papül ya da nodül olarak görülür.",
      dermoscopy: "Tanı koydurucu tek bir patern tanımlanmamıştır. Bildirilen bulgular özgül değildir ve histopatolojik inceleme gereklidir.",
      differential: "Bazal hücreli karsinom, kutanöz skuamöz hücreli karsinom, amelanotik melanom, lenfoma ve benign nodül veya kistler.",
      treatment: "Gecikmeden uzman evrelemesi ve multidisipliner planlama gerekir. Evreye ve hastaya ilişkin etkenlere göre cerrahi, radyoterapi ve sistemik immünoterapi değerlendirilebilir.",
      followup: "Nüks ve metastaz gelişebileceğinden yakın ve riske uyarlanmış izlem gereklidir."
    },
    "porokeratosis": {
      description: "Kabarık periferik sınırla karakterize heterojen bir keratinizasyon bozukluğu grubudur. Bildirilen malign dönüşüm riski tek biçimli değildir; alt tipe ve lezyona göre değişir.",
      clinical: "Morfoloji ve dağılım alt tipe göre değişir. Tipik olarak keskin sınırlı keratotik kabarıklık, bunun üzerinde oluk ve görece atrofik bir merkez görülür.",
      dermoscopy: "Kornoid lamellaya karşılık gelen periferik keratotik kabarıklık veya beyaz çizgi görülebilir. Paternler alt tipe göre değişir.",
      differential: "Aktinik keratoz, anüler inflamatuvar dermatozlar, yüzeyel mantar enfeksiyonu, seboreik keratoz ve skuamöz hücreli karsinom.",
      treatment: "Her durumda etkili tek bir tedavi yoktur. Yaklaşım alt tipe, semptomlara ve yaygınlığa göre belirlenir. Şüpheli değişiklikte biyopsi gerekir.",
      followup: "İzlem alt tipe, lezyon yüküne ve hastanın riskine göre planlanır. Büyüyen, hassas, ülsere olan veya başka biçimde değişen alanlardan biyopsi alınır. Uygun olduğunda güneşten korunma vurgulanır."
    },
    "sebaceous-carcinoma": {
      description: "Perioküler veya ekstraoküler deride gelişebilen nadir bir adneksiyal karsinomdur. Yerleşim, değerlendirme ve tedaviyi etkiler.",
      clinical: "Sert göz kapağı nodülü, kalıcı şalazyon benzeri lezyon veya göz dışındaki deride nodül ya da plak şeklinde görülebilir.",
      dermoscopy: "Dermoskopik paternler özgül değildir. Tanı doku incelemesi gerektirir.",
      differential: "Şalazyon, bazal hücreli karsinom, kutanöz skuamöz hücreli karsinom ve diğer göz kapağı veya adneksiyal tümörler.",
      treatment: "Genellikle histopatolojik sınır değerlendirmesiyle tam eksizyon ve uzman yönetimi gerekir. Evreleme tümör özelliklerine ve yerleşime bağlıdır. Muir–Torre/Lynch sendromu değerlendirmesi riske göre yapılır ve genetik uzmanlığı gerektirebilir.",
      followup: "Lokal nüks, bölgesel veya uzak yayılım olabildiğinden izlem bireyselleştirilir. Perioküler ve ekstraoküler hastalıkta izlem yaklaşımı farklı olabilir."
    },
    "dermatofibrosarcoma-protuberans": {
      description: "Lokal infiltratif büyüyen, yavaş ilerleyen dermal sarkomdur. Eksik çıkarılırsa lokal nüks eğilimi yüksektir. Metastaz riski genellikle düşüktür.",
      clinical: "Yavaş genişleyen indüre plak, belirgin nodüllerden önce görülebilir. Skar, dermatofibrom veya morfeayı taklit edebilir. İlerleyici değişim ve derin dokuya fiksasyon, temsil edici örnek almayı destekler.",
      dermoscopy: "Bulgular özgül değildir ve dermoskopiyle kesin tanı konulamaz.",
      differential: "Dermatofibrom, skar, keloid, morfea, kist ve diğer yumuşak doku tümörleri.",
      treatment: "Tanıyı doğrulamak ve fibrosarkomatöz dönüşümü değerlendirmek için yeterince derin biyopsi ve uzman patoloji incelemesi gerekir. Tedavide histolojik olarak temiz sınırlarla tam eksizyon önceliklidir. Nükseden, yaygın veya dönüşüm gösteren tümörleri konseyde değerlendir.",
      followup: "Lokal nüks gelişebileceğinden tedavi edilen bölgenin uzun dönem klinik izlemi uygundur."
    },
    "atypical-fibroxanthoma": {
      description: "Genellikle yaşlı erişkinlerde baş ve boynun kronik güneş hasarlı derisinde gelişen yüzeyel, pleomorfik, iğsi hücreli tümördür. Pleomorfik dermal sarkom lehine bulguları dışlamak için yeterli örnekleme gerekir.",
      clinical: "Genellikle hızla büyüyen, kırmızı veya deri renginde, kubbe biçimli bir papül ya da nodüldür. Ülserleşebilir veya kanayabilir.",
      dermoscopy: "Bildirilen bulgular özgül değildir. Bazal veya skuamöz hücreli karsinomla örtüşebilir.",
      differential: "Kutanöz skuamöz hücreli karsinom, amelanotik melanom, pleomorfik dermal sarkom ve piyojenik granülom.",
      treatment: "Tam eksizyon ve uzman histopatolojik değerlendirmesi gerekir. Tanı için belirli hücre kökenine ait benzer tümörler ile daha derin veya daha yüksek riskli pleomorfik dermal sarkom dışlanır.",
      followup: "İzlem patolojik özelliklere, cerrahi sınır durumuna ve klinik bağlama bağlıdır."
    },
    "pleomorphic-dermal-sarcoma": {
      description: "Atipik fibroksantomla ilişkili nadir bir malign dermal iğsi hücreli tümördür. Subkutan invazyon, tümör nekrozu veya lenfovasküler ya da perinöral invazyon gibi olumsuz özelliklerle ayrılır.",
      clinical: "Genellikle baş ve boynun kronik güneş hasarlı derisinde büyüyen pigmentsiz nodül veya plak görülür. Ülserasyon eşlik edebilir.",
      dermoscopy: "Dermoskopik bulgular özgül değildir ve benzer klinik lezyonlardan ayrım sağlamaz.",
      differential: "Atipik fibroksantom, kutanöz skuamöz hücreli karsinom, bazal hücreli karsinom, amelanotik melanom ve Merkel hücreli karsinom.",
      treatment: "Genellikle tam eksizyon, uzman dermatopatoloji incelemesi ve multidisipliner değerlendirme gerekir.",
      followup: "Lokal nüks ve metastaz görülebildiğinden klinik izlem ve endikasyon varsa görüntüleme bireyselleştirilir."
    },
    "cutaneous-angiosarcoma": {
      description: "Spontan olarak, radyoterapi sonrasında veya kronik lenfödem zemininde gelişebilen nadir ve agresif malign vasküler tümördür.",
      clinical: "Yaşlı bir hastanın saçlı derisinde veya yüzünde genişleyen mor ya da ekimoz benzeri yama ilk bulgu olabilir. İndürasyon, nodül, ödem veya kanama gelişebilir. Önceki radyoterapiyi ve kronik lenfödemi sorgula. Görünür yayılımı ve ek odakları kaydet.",
      dermoscopy: "Tanı koydurucu bir dermoskopik patern tanımlanmamıştır.",
      differential: "Ekimoz, selülit, rozasea, Kaposi sarkomu ve benign veya malign vasküler lezyonlar.",
      treatment: "Kalıcı veya genişleyen şüpheli lezyonda gecikmeden temsil edici biyopsi ve uzman patoloji değerlendirmesi gerekir. Evreleme ve lokal tedavi planı sarkom konseyinde ele alınır. Yayılım, tam cerrahinin uygulanabilirliği ve radyoterapi seçenekleri birlikte değerlendirilir.",
      followup: "Lokal nüks ve metastatik yayılım olabileceğinden yakın izlem gerekir."
    },
    "kaposi-sarcoma": {
      description: "İnsan herpes virüsü 8 ile ilişkili vasküler neoplazidir. Birden fazla epidemiyolojik formu vardır ve bağışıklık durumuyla ilişkisi değişkendir.",
      clinical: "Morumsu, kırmızı-kahverengi veya koyu renkli makül, plak ya da nodüller görülebilir. Dağılım ve sistemik tutulum alt tipe göre değişir.",
      dermoscopy: "Çok renkli veya gökkuşağı benzeri görünüm tanımlanmıştır. Bu bulgu özgül değildir ve biyopsinin yerine geçmez.",
      differential: "Purpura, anjiyom, basiller anjiyomatoz ve diğer vasküler veya iğsi hücreli tümörler.",
      treatment: "Yaklaşım alt tipe, yaygınlığa, semptomlara ve bağışıklık durumuna bağlıdır. Altta yatan durumun yönetimi, lokal tedavi veya sistemik tedavi değerlendirilebilir.",
      followup: "İzlem hastalığın yaygınlığına, tedaviye ve altta yatan klinik duruma göre bireyselleştirilir."
    },
    "extramammary-paget-disease": {
      description: "Genellikle apokrin bezlerden zengin anogenital veya aksiller deriyi tutan nadir intraepidermal adenokarsinomdur. Primer kutanöz hastalık, alttaki veya komşu bir malignitenin sekonder epidermotropik tutulumundan ayrılmalıdır.",
      clinical: "Genital veya perianal bölgede sıklıkla kalıcı, kaşıntılı, eritemli, skuamlı veya ekzematöz plak görülür.",
      dermoscopy: "Bildirilen bulgular destekleyici olabilir ancak özgül değildir. Tanı için biyopsi gerekir.",
      differential: "Ekzema, psoriazis, mantar enfeksiyonu, skuamöz hücreli karsinom in situ ve melanom.",
      treatment: "Biyopsiyle doğrulama ve uzman değerlendirmesi gerekir. Tedavi planı hastalığın yaygınlığını, sınırları ve primer ya da sekonder oluşunu dikkate alır. Eşlik eden iç organ malignitesi araştırması yerleşime, yaşa, cinsiyete, belirtilere ve patolojiye göre bireyselleştirilir.",
      followup: "Lokal nüks olabileceğinden uzun dönem izlem uygundur. İzlem ve gerekirse iç organ malignitesi değerlendirmesi yerleşime, hastalık sınıflamasına ve hastaya özgü bulgulara göre planlanır."
    },
    "microcystic-adnexal-carcinoma": {
      description: "Derine infiltre olan, genellikle lokal agresif seyreden ve sıklıkla yüzün orta bölümünde gelişen nadir adneksiyal karsinomdur.",
      clinical: "Orta yüzde yavaş büyüyen, sert ve belirsiz sınırlı plak veya nodül skarı taklit edebilir. Komşu sinirlerin dağılımında duyu değişikliği ve ağrıyı değerlendir. Görünen sınır doku tutulumunu olduğundan az gösterebilir.",
      dermoscopy: "Tanı koydurucu bir dermoskopik patern tanımlanmamıştır.",
      differential: "Morfeaform bazal hücreli karsinom, skar, desmoplastik trikoepitelyom ve diğer adneksiyal tümörler.",
      treatment: "Şüpheli lezyonda infiltratif büyümeyi değerlendirmek için subkutisi içeren derin biyopsi gerekir. Kılavuz, rezeke edilebilen ve deriyle sınırlı hastalıkta periferik ve derin sınırların değerlendirildiği cerrahiyi tercih eder. Perinöral tutulum veya temiz sınır elde edilememesi multidisipliner planlama gerektirir.",
      followup: "Geç lokal nüks gelişebileceğinden uzun dönem izlem uygundur."
    },
    "eccrine-porocarcinoma": {
      description: "Ter kanalı diferansiyasyonu gösteren nadir malign adneksiyal tümördür.",
      clinical: "Papül, plak veya nodül ülserleşebilir ya da kanayabilir. Uzun süredir var olan poroma benzeri lezyonda hızlı büyüme, ülserasyon veya kanama yeniden değerlendirmeyi gerektirir. Klinik görünüm daha sık görülen çeşitli keratinositik ve vasküler tümörlerle örtüşür.",
      dermoscopy: "Bildirilen vasküler ve yapısız paternler özgül değildir. Tanı histopatolojiyle konur.",
      differential: "Porom, seboreik keratoz, piyojenik granülom, verruka ve kutanöz skuamöz hücreli karsinom.",
      treatment: "Skuamöz hücreli karsinom veya poroma ayrımı güçse temsil edici histoloji ve uzman dermatopatoloji değerlendirmesi gerekir. Lokalize hastalık genellikle histolojik sınır değerlendirmesiyle cerrahi olarak tedavi edilir. Nodal evreleme ve adjuvan yaklaşımların kanıtı sınırlıdır. Yüksek riskli olguları bireysel olarak tartış.",
      followup: "Lokal nüks ve bölgesel veya uzak yayılım açısından izlem bireyselleştirilir."
    },
    "mycosis-fungoides": {
      description: "En sık görülen primer kutanöz T hücreli lenfomadır. Genellikle yamalardan plaklara, bazı hastalarda ise tümörlere doğru kronik bir seyir gösterir.",
      clinical: "Değişen derecede skuamlı kalıcı yamalar veya plaklar sıklıkla güneş görmeyen alanlardadır ve inflamatuvar dermatozları taklit edebilir. Morfoloji ve yaygınlık evreyle değişir.",
      dermoscopy: "İnce kısa lineer damarlar, turuncu-sarı alanlar veya skuam görülebilir. Bu bulgular tanı koydurucu değildir.",
      differential: "Ekzema, psoriazis, parapsoriazis, ilaç erüpsiyonu ve diğer kutanöz lenfomalar.",
      treatment: "Tanı klinikopatolojik korelasyon gerektirir. Tekrarlanan biyopsiler gerekebilir. Tedavi evreye göre uyarlanır ve uzman gözetiminde deriye yönelik veya sistemik yaklaşımlar uygulanabilir.",
      followup: "Uzun dönem uzman izlemi gerekir. Evreye göre deri tutulumu, lenf nodları, semptomlar ve ekstrakutanöz hastalık değerlendirilir."
    },
    "sezary-syndrome": {
      description: "Eritrodermi, kan tutulumu ve klonal malign T hücreleriyle karakterize agresif lösemik kutanöz T hücreli lenfoma formudur.",
      clinical: "Yoğun kaşıntıyla birlikte yaygın eritrodermi tipiktir. Lenfadenopati, palmoplantar keratoderma ve diğer sistemik bulgular eşlik edebilir.",
      dermoscopy: "Dermoskopi tanı koydurucu değildir. Sistemik ve hematolojik değerlendirme geciktirilmemelidir.",
      differential: "Atopik dermatit, psoriazis, ilaca bağlı eritrodermi, pitriyazis rubra pilaris ve eritrodermik mikozis fungoides.",
      treatment: "Tanı ve evreleme uzman düzeyinde klinikopatolojik değerlendirme, kan incelemeleri ve sistemik değerlendirme gerektirir. Tedavi bireyselleştirilir ve ağırlıklı olarak sistemiktir. Deriye yönelik tedavi de eklenebilir.",
      followup: "Deri, kan, lenf nodları, tedavi toksisitesi ve progresyon açısından yakın multidisipliner izlem gerekir."
    },
    "primary-cutaneous-anaplastic-large-cell-lymphoma": {
      description: "Genellikle indolen seyreden primer kutanöz CD30 pozitif T hücreli lenfoproliferatif bozukluktur. Sistemik lenfoma dışlanmalıdır.",
      clinical: "Tipik olarak hızla gelişen, kırmızı veya morumsu bir ya da birden fazla papül, nodül veya tümör görülür. Ülserasyon olabilir.",
      dermoscopy: "Bildirilen vasküler ve yapısız bulgular özgül değildir. Tanı histopatoloji ve immünfenotipleme gerektirir.",
      differential: "Lenfomatoid papüloz, deri tutulumlu sistemik anaplastik büyük hücreli lenfoma, kutanöz skuamöz hücreli karsinom ve enfeksiyonlar.",
      treatment: "Yönetim lezyon sayısına, dağılıma ve ekstrakutanöz değerlendirmeye bağlıdır. Lokalize ve multifokal hastalık farklı uzman yaklaşımları gerektirir.",
      followup: "Kutanöz nüks veya ekstrakutanöz hastalığı saptamak için uzun dönem izlem uygundur."
    },
    "atopic-dermatitis": {
      description: "Epidermal bariyer bozukluğu ve yaşa göre değişen tutulumla seyreden kronik, nüksedici, kaşıntılı inflamatuvar deri hastalığıdır.",
      clinical: "Kaşıntı ve kseroz belirgindir. Eritemli veya deri rengindeki ekzematöz lezyonlarda ekskoriasyon, likenifikasyon veya sekonder enfeksiyon görülebilir. Dağılım ve görünüm yaşa ve deri tonuna bağlıdır.",
      dermoscopy: "Dermoskopi rutin tanıda gerekli değildir. Vasküler ve skuamlı bulgular özgül değildir ve klinik paternle birlikte yorumlanır.",
      differential: "Alerjik veya irritan kontakt dermatit, seboreik dermatit, psoriazis, uyuz, deri enfeksiyonu ve erişkinde kalıcı atipik hastalıkta kutanöz T hücreli lenfoma.",
      treatment: "Düzenli nemlendirme, doğrulanmış alevlendiricilerden kaçınma ve uygun topikal antiinflamatuvar tedavi birlikte uygulanır. Kontrol altına alınamayan orta ila ağır hastalıkta yaş, komorbiditeler, kontrendikasyonlar ve izlem gereksinimleri değerlendirilerek fototerapi veya sistemik tedavi düşünülebilir.",
      followup: "Hastalık kontrolü, uyku, yaşam kalitesi, tedavi yükü, tedaviye uyum ve enfeksiyon bulguları değerlendirilir. Kalıcı, ağır veya tanısal açıdan atipik hastalıkta uzman incelemesi gerekir."
    },
    "contact-dermatitis": {
      description: "İrritanın doğrudan hasarına veya temas alerjenine karşı gecikmiş aşırı duyarlılığa bağlı inflamatuvar dermatittir. İki mekanizma birlikte görülebilir.",
      clinical: "Kaşıntı, yanma, eritem, skuam, vezikül veya fissürlerin dağılımı genellikle maruziyetle uyumludur. İrritan dermatit akut veya kümülatif hasarla gelişebilir. Alerjik dermatit duyarlanma gerektirir ve temas alanının ötesine yayılabilir. Klinik örtüşme sıktır.",
      dermoscopy: "Dermoskopi rutin tanıda belirleyici değildir. Özgül olmayan ekzematöz inflamasyon görülür. Maruziyet öyküsü, dağılım ve uygun testler tanıda daha değerlidir.",
      differential: "Atopik dermatit, dishidrotik ekzema, psoriazis, dermatofit enfeksiyonu, uyuz ve diğer mesleki veya maruziyetle ilişkili dermatozlar.",
      treatment: "İlgili maruziyeti belirleyip azaltın, deri bariyerini destekleyin ve bölgeye ve şiddete uygun antiinflamatuvar tedavi uygulayın. Alerjik kontakt dermatit şüphesinde, özellikle kalıcı, nükseden veya mesleki hastalıkta yama testi önemlidir.",
      followup: "Maruziyetten kaçınma, koruyucu önlemler ve tedavi yanıtı değerlendirilir. Süregelen veya mesleki hastalıkta dermatoloji, yama testi ve iş sağlığı desteği gerekebilir."
    },
    "seborrheic-dermatitis": {
      description: "Sebumdan zengin bölgeleri tutan yaygın, kronik veya nüksedici inflamatuvar bozukluktur. Kepek, saçlı derinin baskın tutulduğu hafif formdur.",
      clinical: "Saçlı deri, kaşlar, glabella, nazolabial kıvrımlar, kulaklar veya presternal deride sıklıkla sınırları silik eritem ve beyaz veya sarımsı skuam görülür. Kaşıntı değişkendir ve nüks sıktır.",
      dermoscopy: "Dermoskopi rutin olarak gerekli değildir. Skuam ve damar bulguları değerlendirmeyi destekleyebilir fakat tanı koydurmaz.",
      differential: "Saçlı deri veya yüz psoriazisi, atopik dermatit, kontakt dermatit, dermatofit enfeksiyonu, rozasea ve atipik yüz tutulumunda kutanöz lupus eritematozus.",
      treatment: "Topikal antifungaller ve uygun saçlı deri preparatları sık kullanılan ilk seçeneklerdir. Alevlenmede kısa süreli, dikkatle seçilmiş antiinflamatuvar tedavi uygulanabilir. Seçim bölgeye, yaşa, yaygınlığa ve nüks paternine göre yapılır.",
      followup: "Nükseden hastalıkta aralıklı idame gerekebilir. Ağır, yaygın, dirençli veya atipik olgularda tanı ve katkıda bulunan etkenler yeniden değerlendirilir."
    },
    "plaque-psoriasis": {
      description: "Kalıcı, iyi sınırlı, skuamlı inflamatuvar plaklarla seyreden yaygın kronik psoriazis formudur.",
      clinical: "Simetrik plaklar sıklıkla ekstansör yüzleri, saçlı deriyi ve lumbosakral bölgeyi tutar. Kıvrım, genital, palmoplantar ve tırnak tutulumu görünümü ve hastalık yükünü değiştirebilir. Eklem semptomları psoriatik artrit açısından değerlendirilir.",
      dermoscopy: "Açık kırmızı zeminde düzenli dağılmış noktasal damarlar ve diffüz beyaz skuam tanıyı destekleyebilir. Atipik bulgularda klinikopatolojik korelasyon gerekir.",
      differential: "Nümüler veya kronik ekzema, seboreik dermatit, dermatofit enfeksiyonu, pitriyazis rubra pilaris ve kutanöz T hücreli lenfoma.",
      treatment: "Sınırlı plak hastalığı genellikle bölge ve hasta özelliklerine göre seçilen topikal tedaviyle yönetilir. Yaygın, yaşamı belirgin etkileyen veya yetersiz kontrol edilen hastalıkta fototerapi ya da sistemik tedavi düşünülebilir. Şiddet, yaşam kalitesi, komorbiditeler ve psoriatik artrit planlamayı etkiler.",
      followup: "Deri ve tırnak aktivitesi, tedavi güvenliliği ve yaşam kalitesi izlenir. İnflamatuvar eklem semptomları ve ilgili komorbiditeler yeniden değerlendirilir."
    },
    "acne-vulgaris": {
      description: "Pilosebase ünitenin kronik inflamatuvar hastalığıdır. En sık yüz, göğüs ve sırtta komedonlar ve inflamatuvar lezyonlar gelişir.",
      clinical: "Açık ve kapalı komedonlara papül, püstül veya derin nodül eşlik edebilir. Skar, postinflamatuvar pigment değişikliği ve psikososyal yük şiddet değerlendirmesinde önemlidir.",
      dermoscopy: "Dermoskopi rutin olarak gerekli değildir. Komedon açıklıkları ve foliküler inflamasyon görülebilir. Tanı esas olarak kliniktir.",
      differential: "Rozasea, bakteriyel veya Malassezia foliküliti, periorifisyal dermatit, hidradenitis suppurativa ve ilaçla ilişkili akneiform erüpsiyonlar.",
      treatment: "Tedavi şiddet ve fenotipe göre seçilir. Sıklıkla farklı etki mekanizmalarına sahip topikal ajanlar birleştirilir. Antibiyotik kullanımı sınırlandırılır ve uygun kombinasyonla uygulanır. Sistemik, hormonal veya izotretinoin tedavisi endikasyon, kontrendikasyon ve izlem açısından değerlendirilir.",
      followup: "Yanıt, tolerans, uyum, skar riski, pigment sekeli ve psikososyal etki değerlendirilir. Ağır, skar bırakan veya yeterince kontrol edilemeyen hastalıkta tedavi bir üst basamağa çıkarılır."
    },
    "rosacea": {
      description: "Fenotipe göre değerlendirilen kronik inflamatuvar yüz dermatozudur. Kalıcı sentrofasiyal eritem, flushing, telenjiektazi, papül, püstül, fimatöz değişiklik veya oküler tutulum görülebilir.",
      clinical: "Yüzün merkezinde eritem ve ataklar halinde kızarma tek başına veya inflamatuvar papül ve püstüllerle görülebilir. Komedonlar tipik değildir. Oküler belirtiler ve fimatöz değişiklik ayrıca değerlendirilir.",
      dermoscopy: "Dermoskopi telenjiektatik damar paternlerini ve foliküler değişiklikleri gösterebilir. Bulgular tanıyı destekler.",
      differential: "Akne vulgaris, seboreik dermatit, periorifisyal dermatit, kontakt dermatit, kutanöz lupus eritematozus ve diğer yüz eritemi veya flushing nedenleri.",
      treatment: "Nazik deri bakımı, güneşten korunma ve kişide doğrulanmış tetikleyicilerin yönetimi uygundur. Baskın fenotipe göre topikal, oral veya damar hedefli cihaz tedavisi seçilebilir. Oküler hastalıkta oftalmolojik değerlendirme gerekebilir.",
      followup: "Fenotipe özgü yanıt, oküler belirtiler, tolerans ve yaşam kalitesi değerlendirilir. Atipik, tek taraflı veya tedaviye dirençli olgularda tanı gözden geçirilir."
    },
    "chronic-urticaria": {
      description: "Altı haftadan uzun süre tekrarlayan ürtikeryal plak, anjiyoödem veya her ikisidir. Belirli uyaranların belirtileri tekrarlanabilir biçimde tetikleyip tetiklemediğine göre kronik spontan veya kronik indüklenebilir ürtiker olarak sınıflanır.",
      clinical: "Tek tek ürtikeryal plaklar geçicidir ve genellikle 24 saat içinde morluk bırakmadan geriler. Anjiyoödem daha uzun sürebilir. İndüklenebilir formlar tekrarlanabilir fiziksel veya çevresel uyaranlarla ilişkilidir. Akut ürtiker süre açısından ayrı bir tablodur.",
      dermoscopy: "Dermoskopi rutin olarak yararlı değildir. Kalıcı, ağrılı veya morluk bırakan lezyonlarda ürtikeryal vaskülit ve diğer benzer tablolar değerlendirilir.",
      differential: "Ürtikeryal vaskülit, mast hücresi bozuklukları, otoinflamatuvar sendromlar, bradikinin aracılı anjiyoödem ve geçici eritem veya ödemin diğer nedenleri.",
      treatment: "Alt tip doğrulanır ve yalnızca gösterilmiş alevlendiricilerden kaçınılır. İkinci kuşak H1 antihistaminik genellikle ilk basamaktır. Kontrol yetersizse uzman gözetiminde kılavuza uygun basamaklı tedavi uygulanır. Klinik ipucu yoksa geniş tetkik rutin değildir.",
      followup: "Hastalık kontrolü, anjiyoödem, tetikleyiciler, tedavi yanıtı ve advers etkiler izlenir. Hava yolu, solunum veya dolaşım belirtileri acil değerlendirme gerektirir."
    },
    "vitiligo": {
      description: "Melanosit kaybına bağlı depigmente makül ve yamalara yol açan edinsel bozukluktur. En sık nonsegmental veya segmental olarak sınıflanır.",
      clinical: "İyi sınırlı depigmente lezyonlar genişleyebilir veya sürtünme ve travma alanlarında ortaya çıkabilir. Tutulan deride kıllar beyazlayabilir. Dağılım, aktivite, yaygınlık ve psikososyal etki kaydedilir.",
      dermoscopy: "Perifoliküler pigment, sınır değişiklikleri ve aktivite veya stabilite bulguları görülebilir. Özellikle açık tenli kişilerde, silik tutulum alanlarını belirlemede Wood lambası çoğu zaman daha yararlıdır.",
      differential: "Postinflamatuvar hipopigmentasyon, pitriyazis alba, pitriyazis versikolor, kimyasal lökoderma, nevüs depigmentozus ve hipopigmente mikozis fungoides.",
      treatment: "Aktivite, yaygınlık, bölge, yaş ve hasta hedeflerine göre ortak karar verilir. Kamuflaj, güneşten korunma, topikal antiinflamatuvar tedavi, fototerapi veya diğer hedefe yönelik tedaviler düşünülebilir. Cerrahi seçilmiş stabil olgulara ayrılır.",
      followup: "Aktivite, tutulum, repigmentasyon, tedavi güvenliliği ve psikososyal etki kaydedilir. Eşlik eden otoimmün hastalıklar öykü, muayene ve ilgili kılavuza göre araştırılır."
    },
    "impetigo": {
      description: "Büllöz ve büllöz olmayan formları bulunan bulaşıcı, yüzeyel bakteriyel deri enfeksiyonudur.",
      clinical: "Büllöz olmayan formda vezikül veya püstüller sıklıkla bal rengi krutlu erozyonlara dönüşür. Büllöz formda gevşek, sıvı dolu büller görülür. Yaygınlık, sistemik bulgular, nüks ve salgın bağlamı önemlidir.",
      dermoscopy: "Dermoskopi rutin olarak gerekli değildir. Krut, erozyon ve özgül olmayan damar bulguları klinik değerlendirme veya endikasyon varsa mikrobiyolojik incelemenin yerine geçmez.",
      differential: "Herpes simpleks, ektima, kontakt dermatit, böcek ısırığı reaksiyonu, sekonder enfeksiyonlu uyuz ve otoimmün büllöz dermatozlar.",
      treatment: "Hijyen önlemleri ve kılavuza uygun topikal veya oral antimikrobiyal tedavi uygulanır. Seçim yaygınlığa, bül varlığına, nükse, sistemik hastalığa ve komplikasyon riskine bağlıdır. Açıklanamayan yanıtsızlıkta yeniden değerlendirme gerekir.",
      followup: "Yayılım, sistemik belirtiler, tedavi başarısızlığı veya nükste yeniden değerlendirin. Kılavuza göre mikrobiyolojik örnekleme ve uzman görüşü düşünülebilir."
    },
    "bacterial-folliculitis": {
      description: "Kıl folikülü merkezli yüzeyel bakteriyel enfeksiyon veya inflamasyondur. Sıklıkla stafilokoklarla ilişkilidir.",
      clinical: "Folikül merkezli eritemli papül veya püstüller hassas veya kaşıntılı olabilir. Derin, fluktuan, yayılan, nükseden veya sistemik bulgulu tabloda fronkül, apse veya başka süreçler araştırılır.",
      dermoscopy: "Foliküler püstül veya perifoliküler eritem özgül değildir. Dermoskopi rutin tanıda kullanılmaz.",
      differential: "Malassezia foliküliti, akne vulgaris, psödofolikülit, gram-negatif folikülit, böcek ısırığı ve erken hidradenitis suppurativa.",
      treatment: "Oklüzyon, sürtünme ve diğer katkıda bulunan etkenler ele alınır. Sınırlı hastalıkta lokal önlemler yeterli olabilir. Yaygın, nükseden veya komplike olgularda kültüre dayalı veya sistemik tedavi gerekebilir. Karşılaştırmalı kanıt sınırlıdır ve yerel antimikrobiyal rehber izlenir.",
      followup: "Kalıcı, nükseden veya yayılan hastalık yeniden değerlendirilir. Endikasyon varsa yatkınlaştırıcı etkenler araştırılır. Sistemik hastalıkta veya hızla ilerleyen enfeksiyonda acil değerlendirme uygundur."
    },
    "erysipelas": {
      description: "Yüzeyel dermis ve lenfatiklerin akut bakteriyel enfeksiyonudur. İnflamatuvar plak genellikle selülite göre daha keskin sınırlıdır.",
      clinical: "Ağrılı, sıcak, eritemli ve sıklıkla kabarık plağa ateş veya halsizlik eşlik edebilir. Yüz ve alt ekstremiteler sık tutulur. Hızlı ilerleme veya ağır sistemik belirtiler acil değerlendirme gerektirir.",
      dermoscopy: "Dermoskopinin rutin tanısal rolü gösterilmemiştir. Dermoskopi, şiddet değerlendirmesini veya alternatif tanıların araştırılmasını geciktirmemelidir.",
      differential: "Selülit, kontakt dermatit, staz dermatiti, yüzeyel tromboflebit, derin ven trombozu ve diğer inflamatuvar veya vasküler tablolar.",
      treatment: "Gecikmeden kılavuza uygun sistemik antibiyotik gerekir. Uygulama yolu ve bakım ortamı şiddete, komorbiditelere, bölgeye, komplikasyon riskine ve yerel direnç rehberine göre seçilir. İnflamasyon sınırını işaretlemek ilerlemeyi izlemeye yardımcı olabilir.",
      followup: "Hızlı kötüleşme, sistemik hastalık, orantısız ağrı veya beklenen iyileşmenin başlamaması halinde yeniden değerlendirin. Akut dönemden sonra giriş kapıları ve nüks riskleri ele alınır."
    },
    "erythrasma": {
      description: "Deri kıvrımlarında görülen, Corynebacterium ile ilişkili yüzeyel enfeksiyondur.",
      clinical: "İyi sınırlı pembe, kırmızı-kahverengi veya kahverengi, ince skuamlı yamalar en sık ayak parmak aralarında, kasıkta veya aksillada görülür. Belirtisiz veya hafif kaşıntılı olabilir.",
      dermoscopy: "Wood lambasında bakteriyel porfirinlere bağlı mercan kırmızısı floresans görülebilir. Yıkama veya önceki tedavi floresansı azaltabilir. Dermoskopi tamamlayıcıdır ve bulguları özgül değildir.",
      differential: "Dermatofit enfeksiyonu, kandidal intertrigo, invers psoriazis, seboreik dermatit ve irritan intertrigo.",
      treatment: "Nem ve sürtünme azaltılır. Yaygınlık ve nükse göre uygun topikal veya sistemik antibakteriyel yaklaşım seçilir. Karşılaştırmalı kanıt sınırlıdır.",
      followup: "Kalıcı veya nükseden hastalığı yeniden değerlendirin. Belirsizlikte tanıyı doğrulayın. Uygun olduğunda oklüzyon, nem veya metabolik yatkınlaştırıcı etkenleri ele alın."
    },
    "tinea-corporis": {
      description: "Gövde veya ekstremitelerin kılsız derisindeki dermatofit enfeksiyonudur.",
      clinical: "Genişleyen anüler veya polisiklik, skuamlı plağın kenarı sıklıkla daha aktiftir ve merkez görece soluktur. Önceden kullanılan kortikosteroidler paterni maskeleyebilir.",
      dermoscopy: "Periferik skuam ve eritem destekleyici olabilir ancak özgül değildir. Atipik görünüm veya tedavi başarısızlığında mikroskopi, kültür veya doğrulanmış başka test uygundur.",
      differential: "Nümüler dermatit, psoriazis, pitriyazis rozea, granüloma anülare, subakut kutanöz lupus ve eritema migrans.",
      treatment: "Lokalize hastalık genellikle uygun topikal antifungalle yönetilir. Yaygın, dirençli veya foliküler enfeksiyonda ya da immünsüpresyonda tanı ve güvenlilik değerlendirildikten sonra sistemik tedavi gerekebilir. Kortikosteroid monoterapisinden kaçınılır.",
      followup: "Yanıtsızlıkta uyum, yeniden bulaş, alternatif tanı, dirençli dermatofitler ve tedavi edilmemiş hayvan veya ev içi kaynak değerlendirilir."
    },
    "tinea-cruris": {
      description: "Kasık ve komşu üst uyluk bölgesinin dermatofit enfeksiyonudur.",
      clinical: "Kaşıntılı, keskin sınırlı, eritemli veya hiperpigmente, periferik skuamlı plaklar sıklıkla inguinal kıvrımdan yayılır. Morfoloji ve skrotal tutulum ayırıcı tanıda yardımcı olabilir ancak kesin değildir.",
      dermoscopy: "Periferik skuam ve eritemli zemin özgül değildir. Atipik veya dirençli hastalıkta mikolojik doğrulama yararlıdır.",
      differential: "Kandidal intertrigo, eritrazma, invers psoriazis, seboreik dermatit, kontakt dermatit ve irritan intertrigo.",
      treatment: "Bölge kuru tutulur ve eşlik eden ayak veya tırnak dermatofitozu ele alınır. Yaygınlık ve hasta özelliklerine göre antifungal seçilir. Kortikosteroid monoterapisi dermatofitozu maskeleyebilir veya kötüleştirebilir.",
      followup: "Kalıcı ya da nükseden hastalıkta tanı, tedaviye uyum, yeniden bulaş ve eşlik eden tinea pedis veya onikomikoz değerlendirilir."
    },
    "tinea-pedis": {
      description: "Ayakların interdigital, yaygın plantar veya veziküler seyir gösterebilen dermatofit enfeksiyonudur.",
      clinical: "Parmak araları, taban ve ayakların yanlarında skuam, fissür, maserasyon, kaşıntı veya veziküller görülebilir. Bariyer bozukluğu sekonder bakteriyel enfeksiyon riskini artırabilir.",
      dermoscopy: "Dermoskopi rutin olarak gerekli değildir. Deri oluklarını izleyen skuam destekleyici olabilir ancak tanı koydurmaz.",
      differential: "Ayak ekzeması, kontakt dermatit, palmoplantar psoriazis, çukurcuklu keratoliz, kandidiyazis ve juvenil plantar dermatoz.",
      treatment: "Sınırlı hastalıkta kurutucu önlemler ve uygun topikal antifungal kullanılır. Yaygın, kronik, dirençli veya tırnak tutulumlu hastalıkta tanıyı doğrulamak ve kontrendikasyonlar ile etkileşimleri değerlendirerek sistemik tedavi gerekebilir.",
      followup: "Fissürlerin iyileşmesi ve nüks izlenir. Klinik gereklilik halinde ayakkabı, ortak alan maruziyeti, tinea kruris ve tırnak mantarı değerlendirilir."
    },
    "tinea-capitis": {
      description: "En sık çocuklarda görülen, ancak her yaşta gelişebilen saç şaftı ve çevre derinin dermatofit enfeksiyonudur.",
      clinical: "Sınırlı skuam, kırık saçlar, alopesi, yaygın skuam, siyah noktalar veya inflamatuvar kerion görülebilir. İnflamatuvar hastalıkta servikal lenfadenopati olabilir. Şiddetli inflamasyon skar riski taşır.",
      dermoscopy: "Trikoskopide virgül, tirbuşon, zikzak veya kırık saçlar ve siyah noktalar görülebilir. Tanı veya etken belirsizse mikolojik test gerekir.",
      differential: "Alopesi areata, seboreik dermatit, saçlı deri psoriazisi, bakteriyel folikülit, trikotillomani ve dissekan selülit.",
      treatment: "Saç şaftı tutulduğundan sistemik antifungal gerekir. Topikal tedavi tek başına yetersizdir ancak ek olarak bulaşı azaltabilir. İlaç seçiminde etken, yaş, kontrendikasyonlar, etkileşimler ve yerel kılavuz dikkate alınır.",
      followup: "Gerektiğinde klinik ve mikolojik yanıt doğrulanır, yakın temaslılar veya salgın bağlamı değerlendirilir. Kerion, tanısal belirsizlik veya skar şüphesinde gecikmeden uzman değerlendirmesi gerekir."
    },
    "onychomycosis": {
      description: "Dermatofit, maya veya dermatofit dışı küflerin bir veya daha fazla tırnak ünitesinde oluşturduğu mantar enfeksiyonudur.",
      clinical: "Tırnaklar kalınlaşabilir, renk değiştirebilir, kırılganlaşabilir, ufalanabilir veya yataktan ayrılabilir. Birçok tırnak hastalığı benzer göründüğünden klinik görünüm tek başına güvenilir değildir.",
      dermoscopy: "Tırtıklı proksimal sınır, longitudinal çizgiler ve subungual birikim distal onikomikozu destekler. Etkeni belirlemez ve mikolojik doğrulamanın yerine geçmez.",
      differential: "Tırnak psoriazisi, travmatik onikoliz, liken planus, kronik paronişi, bakteriyel tırnak enfeksiyonu ve tırnak ünitesi tümörü.",
      treatment: "Uzun süreli sistemik tedavi öncesi mantar enfeksiyonu doğrulanır. Topikal veya sistemik tedavi etken, patern, yaygınlık, tırnak büyümesi, komorbidite, etkileşimler ve izlem gereksinimine göre seçilir.",
      followup: "Sağlıklı tırnağın ilerleyici uzaması izlenir. Düzelme görülmüyorsa tanı veya etken yeniden değerlendirilir. Eşlik eden tinea pedis ve nüks riskleri ele alınır."
    },
    "cutaneous-candidiasis": {
      description: "Sıklıkla nemli veya oklüde kıvrımları tutan yüzeyel Candida deri enfeksiyonudur.",
      clinical: "Kıvrımlarda sıklıkla periferik skuam ve uydu papül veya püstüllerle nemli eritemli plaklar görülür. Candida başka bir dermatozu kolonize edebilir veya sekonder olarak tutabilir. Test sonuçları klinikle birlikte yorumlanır.",
      dermoscopy: "Vasküler ve skuamlı bulgular özgül değildir. Belirsiz veya dirençli olgularda mikroskopi veya kültür değerlendirmeyi destekler.",
      differential: "İrritan intertrigo, dermatofit enfeksiyonu, eritrazma, invers psoriazis, seboreik dermatit ve bakteriyel intertrigo.",
      treatment: "Nem, sürtünme ve oklüzyon azaltılır. Yatkınlaştırıcı etkenler ele alınır ve sınırlı hastalıkta uygun topikal antifungal kullanılır. Yaygın, nükseden veya immünsüprese olgularda sistemik değerlendirme ve tedavi gerekebilir.",
      followup: "Kalıcı veya nükseden hastalıkta tanı, karma enfeksiyon ve değiştirilebilir yatkınlıklar araştırılır. İmmün veya metabolik nedenler klinik endikasyon varsa değerlendirilir."
    },
    "pityriasis-versicolor": {
      description: "Genellikle gövde, boyun veya proksimal ekstremitelerde farklı pigment tonlarında, ince skuamlı yamalar oluşturan, Malassezia ile ilişkili yüzeyel bozukluktur.",
      clinical: "Hipo veya hiperpigmente ya da eritemli maküller ve yamalar birleşebilir ve ince skuam gösterir. Belirti olmayabilir veya hafif kaşıntı olabilir. Etken temizlendikten sonra pigment değişikliği sürebilir.",
      dermoscopy: "Özellikle deri çizgilerinde veya lezyon kenarında ince skuam ve pigment ağı değişiklikleri destekleyicidir. Belirsizlikte mikroskopiyle doğrulanabilir.",
      differential: "Vitiligo, postinflamatuvar pigment değişikliği, pitriyazis alba, seboreik dermatit, konflüan ve retiküle papillomatoz ve hipopigmente mikozis fungoides.",
      treatment: "Sınırlı hastalıkta genellikle topikal antifungal yeterlidir. Yaygın veya sık nükseden olgularda uygun sistemik yaklaşım gerekebilir. Nüks sıktır ve pigmentin düzelmesi mikolojik iyileşmeden sonra gecikebilir.",
      followup: "Yanıt skuamın kaybolması ve yeni lezyon çıkmamasıyla değerlendirilir. Atipik veya kalıcı lezyonlar yeniden değerlendirilir ve uygun olduğunda nüksü önleme konuşulur."
    },
    "scabies": {
      description: "İnsana özgü Sarcoptes scabiei var. hominis akarının yol açtığı bulaşıcı deri infestasyonudur.",
      clinical: "Sıklıkla gece artan yoğun kaşıntı ile tipik bölgelerde papül, ekskoriasyon veya tüneller görülür. Bebeklerde, yaşlılarda ve immünsüprese kişilerde dağılım atipik olabilir. Krutlu uyuzda akar yükü çok daha fazladır.",
      dermoscopy: "Kıvrımlı tünelin ucundaki üçgen akar gövdesi tanıyı destekler. Mikroskopi veya başka doğrulanmış bir yöntem gerekebilir. Negatif test uyuzu her zaman dışlamaz.",
      differential: "Atopik dermatit, kontakt dermatit, papüler ürtiker, vücut biti, dermatitis herpetiformis, folikülit ve delüzyonel infestasyon.",
      treatment: "Hasta ve yakın temaslılar yaş, gebelik, krutlu hastalık ve yerel kılavuza göre uygun skabisitle eşzamanlı tedavi edilir. Giysi ve nevresimler yönetilir. Aşırı çevresel dekontaminasyondan kaçınılır. Krutlu uyuzda uzman ve enfeksiyon kontrol önlemleri gerekir.",
      followup: "Etkili tedavi sonrasında kaşıntı birkaç hafta sürebilir. Yeni tüneller, devam eden bulaş, hatalı uygulama, tedavi edilmemiş temaslılar ve krutlu hastalık yeniden değerlendirilir."
    },
    "herpes-simplex": {
      description: "Latent kalabilen ve nüksedebilen, herpes simpleks virüsü tip 1 veya tip 2’ye bağlı mukokutanöz enfeksiyondur.",
      clinical: "Karıncalanma, yanma veya ağrıyı gruplu ağrılı veziküller veya erozyonlar izleyebilir. Aynı bölge yakınında nüks görülebilir. Görünüm yerleşime ve immün duruma göre değişir. Oküler, neonatal, dissemine veya nörolojik hastalık acil uzman bakımı gerektirir.",
      dermoscopy: "Dermoskopi rutin tanı yöntemi değildir. Doğrulama veya viral tiplendirme önemliyse vezikül sıvısından ya da lezyon tabanından nükleik asit testi daha yararlıdır.",
      differential: "Herpes zoster, impetigo, aftöz ülser, kontakt dermatit, fiks ilaç erüpsiyonu ve oral veya genital ülserasyonun diğer nedenleri.",
      treatment: "Antiviral tedavi yerleşime, şiddete, nüks paternine, immün duruma ve bulaş bağlamına göre ilk atağa yönelik, epizodik veya baskılayıcı olabilir. Danışmanlık ve testler ilgili oral, genital, oküler veya immünsüpresyon kılavuzuna göre planlanır.",
      followup: "Sık, ağır, atipik veya dirençli nükslerin yanı sıra oküler, nörolojik, gebelikle veya yenidoğanla ilgili kaygılar yeniden değerlendirilir. Genital hastalıkta cinsel sağlık danışmanlığı ve izlem gerekir."
    },
    "herpes-zoster": {
      description: "Latent varisella-zoster virüsünün reaktivasyonuna bağlı, genellikle ağrılı, tek taraflı dermatomal döküntüdür.",
      clinical: "Ağrı, karıncalanma veya kaşıntı sonrasında bir ya da komşu birkaç dermatomda eritemli zeminde gruplu veziküller gelişebilir. Genellikle orta hattı geçmez. Oftalmik, otik, nörolojik, dissemine veya immünsüprese olgular acil değerlendirilir.",
      dermoscopy: "Dermoskopi rutin olarak gerekli değildir. Atipik tabloda uygun lezyon örneğinden PCR en yararlı doğrulama testidir.",
      differential: "Herpes simpleks, kontakt dermatit, impetigo, böcek ısırığı reaksiyonu ve diğer veziküler veya nöropatik bozukluklar.",
      treatment: "Endikasyon varsa uygun antiviral tedavi hızla başlanır. Zamanlama, yerleşim, şiddet, komplikasyon ve bağışıklık durumu aciliyeti ve uygulama yolunu belirler. Ağrı yönetimi ve bulaşı önleme danışmanlığı sağlanır. Aşı koruyucudur ve aktif atağı tedavi etmez.",
      followup: "Oküler, nörolojik, işitsel veya dissemine komplikasyonlar ve kalıcı ağrı izlenir. Yüksek riskli yerleşim, sistemik hastalık veya immünsüpresyonda acil değerlendirme gerekir."
    },
    "molluscum-contagiosum": {
      description: "Karakteristik umbilikasyonlu papüller oluşturan, genellikle kendini sınırlayan yüzeyel bir poksvirüs enfeksiyonudur.",
      clinical: "Küçük, sert, inci parlaklığında veya deri renginde papüller genellikle merkezden çöküktür. İyileşirken inflame olabilir. İmmünsüpresyonda çok sayıda, büyük veya atipik dağılımlı lezyon gelişebilir.",
      dermoscopy: "Merkezi por veya umbilikasyon, polilobüle beyaz-sarı yapılar ve periferik damarlar tanıyı destekleyebilir. Tipik olgularda dermoskopi şart değildir.",
      differential: "Viral siğiller, folikülit, milia, siringom, kriptokokoz ve immünsüprese hastalarda diğer papüler erüpsiyonlar.",
      treatment: "Spontan gerileme sık olduğundan birçok immünkompetan hastada gözlem uygundur. Semptom, ekzema, bulaş kaygısı, genital yerleşim veya kalıcılık varsa tedavi düşünülebilir. Destrüktif yöntemler ağrı, irritasyon ve skara yol açabilir.",
      followup: "Atipik, yaygın, genital veya kalıcı hastalığı yeniden değerlendirin. Klinik bağlam destekliyorsa immünsüpresyonu araştırın. Okul veya kreşten gereksiz uzaklaştırmadan kaçının."
    },
    "cutaneous-warts": {
      description: "İnsan papillomavirüsüne bağlı benign epidermal proliferasyonlardır. Sıradan, plantar ve düz kutanöz siğilleri içerir.",
      clinical: "Hiperkeratotik papül veya plaklar deri çizgilerini kesintiye uğratabilir ve tromboze kapiller noktalar gösterebilir. Morfoloji yerleşim ve alt tipe göre değişir. İmmünsüpresyon lezyon yükünü ve kalıcılığı artırabilir.",
      dermoscopy: "Papillomatöz yüzey, deri çizgilerinin kesintiye uğraması ve kırmızı veya siyah noktalar tanıyı destekleyebilir. Pigmente, ülsere veya atipik lezyonlarda biyopsi gerekebilir.",
      differential: "Kallus veya nasır, seboreik keratoz, molluskum kontagiozum, liken planus, skuamöz hücreli karsinom ve diğer akral veya tırnak ünitesi tümörleri.",
      treatment: "Birçok siğil kendiliğinden geriler. Tedavi yerleşim, semptom, lezyon yükü, yaş ve immün duruma göre seçilir. Keratolitik, destrüktif veya hekim gözetiminde başka yöntemler kullanılabilir. Tekrarlanan tedavi sıklıkla gerekir.",
      followup: "Hızlı büyüme, ülserasyon, kalıcı kanama veya tedavi direncinde, özellikle immünsüpresyonda veya yüksek riskli bölgede tanı yeniden değerlendirilir. Anogenital tutulum ayrı değerlendirme gerektirir."
    },
    "bullous-pemphigoid": {
      description: "Bazal membran bölgesi antijenlerine karşı gelişen edinsel otoimmün subepidermal büllöz hastalıktır. En sık ileri yaştaki erişkinlerde görülür.",
      clinical: "Eritemli veya ürtikeryal zeminde gergin büller tipiktir. Bül olmadan kaşıntı ve ekzematöz veya ürtikeryal lezyonlar görülebilir. Lokalize form da vardır. Mukozal tutulum pemfigusa göre genellikle sınırlıdır. Nörolojik komorbidite popülasyon çalışmalarında bildirilmiştir ancak her hastada varsayılmamalıdır.",
      dermoscopy: "Dermoskopi rutin tanıda belirleyici değildir. Klinik patern, histoloji, immünfloresan veya seroloji daha fazla ağırlık taşır.",
      differential: "Pemfigus vulgaris, edinsel epidermolizis bülloza, lineer IgA büllöz dermatozu, büllöz ilaç erüpsiyonu, porfiria kutanea tarda, artropod ısırığı ve büllöz impetigo.",
      treatment: "Tedaviyi şiddet, yaş, kırılganlık, komorbiditeler ve ilaç yükü belirler. Kılavuzlar uygulanabilir olduğunda yüksek potent topikal antiinflamatuvar tedaviyi vurgular. Yaygın veya dirençli hastalıkta sistemik immünomodülasyon düşünülür. İndüksiyon, doz azaltma ve nüks yönetimi genellikle uzman tarafından koordine edilir.",
      followup: "Bül kontrolü, enfeksiyon riski, advers etkiler ve işlevsel etki izlenir. Yeni güçsüzlük, disfaji, hava yolu belirtileri veya yaygın nükste acil değerlendirme gerekir."
    },
    "pemphigus-vulgaris": {
      description: "Epitelyal akantolizle seyreden, sıklıkla mukozayı tutan edinsel intraepidermal otoimmün büllöz hastalıktır. Tedavisiz yaşamı tehdit edebilir.",
      clinical: "Gevşek büller, erozyonlar ve ağrılı mukozal lezyonlar tipiktir. Nikolsky bulgusu görülebilir fakat tanı için yeterli değildir. Kronik erozyonlar beslenmeyi, konuşmayı ve yaşam kalitesini etkiler.",
      dermoscopy: "Dermoskopide erozyon ve vasküler patern görülebilir. Histoloji ve immünopatolojinin yerine geçmez.",
      differential: "Büllöz pemfigoid, müköz membran pemfigoidi, lineer IgA hastalığı, Stevens–Johnson spektrumu, herpesvirüs enfeksiyonu, aftöz stomatit ve nekrotik oral ülserler.",
      treatment: "Genellikle uzman gözetiminde immünomodülatör tedavi gerekir. Kılavuzlar hastalık kontrolü ile kümülatif tedavi toksisitesini dengeler. Tedavi hastalık yükü, mukozal tutulum ve komorbiditeye göre bireyselleştirilir.",
      followup: "İyileşme, nüks, enfeksiyon, malnütrisyon ve tedavinin advers etkileri değerlendirilir. Mukozal tutulumda kötüleşme, hava yolu belirtileri veya tedaviyle yetersiz kontrol gecikmeden uzman değerlendirmesi gerektirir."
    },
    "discoid-lupus-erythematosus": {
      description: "Skar, pigment değişikliği ve adneksiyal yıkıma yol açabilen inflamatuvar plaklarla seyreden kronik kutanöz lupus fenotipidir.",
      clinical: "Skuam, foliküler tıkaç ve atrofik skar içeren eritemli plaklar güneş gören deri ile saçlı deriyi tercih eder. Aktivite ve kalıcı hasar birlikte bulunabilir. Oral, nazal veya oküler mukoza tutulabilir.",
      dermoscopy: "Foliküler kırmızı noktalar, beyazımsı yapısız alanlar, perifoliküler beyazımsı halo ve dallanan damarlar aktif diskoid lezyonu destekleyebilir. Patognomonik değildir.",
      differential: "Liken planus, psoriazis, sarkoidoz, granüloma anülare, keratinosit karsinomu, tinea fasiyalis ve saçlı derinin diğer inflamatuvar veya skarlı alopesileri.",
      treatment: "Güneşten korunma temeldir. Sınırlı hastalıkta genellikle topikal veya intralezyonel antiinflamatuvar tedavi kullanılır. Yaygın, skar bırakan veya dirençli hastalıkta uzman tedavisi gerekir. Aktivite, bölge ve sistemik riske göre antimalaryal veya diğer immünomodülatörler değerlendirilebilir.",
      followup: "Skar, pigment bozukluğu, alopesi ve mukozal hasar kaydedilir. Klinik bağlam gerektiriyorsa sistemik lupus bulguları araştırılır. Tedaviyle ilişkili göz ve diğer organ riskleri uzman protokolüne göre izlenir."
    },
    "dermatomyositis": {
      description: "Karakteristik deri bulguları ve değişken kas, akciğer, kalp ve sistemik tutulumla seyreden idiyopatik inflamatuvar miyopatidir.",
      clinical: "Heliotrop eritem, Gottron papülleri ve güneş gören alanlarda eritem sık ipuçlarıdır. Poikilodermik veya morumsu döküntüler görülebilir. Proksimal kas güçsüzlüğü klasiktir. Deri bulguları önce ortaya çıkabilir, eşzamanlı gelişebilir veya baskın olabilir. Erişkinlerde bildirilen malignite ilişkisi, klinik bağlama uygun değerlendirilir.",
      dermoscopy: "Dermoskopi inflamatuvar yamalarda damar ve pigment değişikliklerini gösterebilir ancak tanı koydurmaz.",
      differential: "Sistemik lupus eritematozus, polimorf ışık erüpsiyonu, kontakt dermatit, greft-versus-host hastalığı, ilaç reaksiyonu, psoriazis ve diğer interfaz dermatozları.",
      treatment: "Hastalık genellikle romatoloji ve dermatoloji tarafından birlikte yönetilir. Sınırlı deri tutulumunda fotoproteksiyon ve topikal antiinflamatuvar tedavi yardımcı olabilir. Yaygın deri tutulumu, miyozit, interstisyel akciğer hastalığı veya dirençli döküntüde fenotipe ve otoantikor profiline göre uzman gözetiminde sistemik immünomodülasyon gerekebilir.",
      followup: "Kas gücü, solunum belirtileri, disfaji, kardiyak belirtiler, deri aktivitesi ve advers etkiler izlenir. Yeni güçsüzlük, dispne, çarpıntı veya hızla ilerleyen döküntüde acil uzman değerlendirmesi gerekir."
    },
    "lichen-planus": {
      description: "Deri, mukoza, saç ve tırnakları tutabilen kronik inflamatuvar likenoid hastalıktır.",
      clinical: "El bileği, ayak bileği, gövde veya mukozada ince beyaz çizgiler içeren kaşıntılı, morumsu ve düz tepeli papüller tipiktir. Wickham çizgileri görülebilir. Oral, genital, saçlı deri veya tırnak tutulumu görünümü değiştirir ve ağrı, skarlı alopesi ya da tırnak yıkımına yol açabilir.",
      dermoscopy: "Kutanöz lezyonlarda beyazımsı retiküler yapılar, komedon benzeri açıklıklar ve merkezi gri noktalar görülebilir. Mukozal hastalık sıklıkla klinik ve histolojik olarak değerlendirilir.",
      differential: "Likenoid ilaç erüpsiyonu, liken sklerozus, psoriazis, pitriyazis rozea, lupus eritematozus, sekonder sifiliz, greft-versus-host hastalığı ve kutanöz lenfoma.",
      treatment: "Sınırlı ve belirtisiz hastalık izlenebilir. Semptomatik kutanöz hastalıkta bölgeye ve şiddete göre güçlü topikal antiinflamatuvar tedavi sık kullanılır. Mukozal, tırnak, saçlı deri veya yaygın hastalık uzman yönetimi gerektirir. Fototerapi veya sistemik immünomodülasyon değerlendirilebilir.",
      followup: "Eroziv mukozal hastalık, skarlı alopesi, tırnak distrofisi ve tedavi toleransı yeniden değerlendirilir. Kalıcı eroziv oral veya genital lezyonlarda uzman incelemesi gerekir. Kılavuzlarda malign dönüşüm riski tartışılır ancak bireysel risk belirsizdir."
    },
    "alopecia-areata": {
      description: "Keskin sınırlı saç kaybına yol açan, nüksedebilen veya genişleyebilen immün aracılı skarsız alopesidir.",
      clinical: "Saçlı deri, sakal, kaş veya vücut kıllarında düzgün yüzeyli tam kıl kaybı alanları görülebilir. Ünlem işareti kılları, tırnak çukurcukları ve gri saçların kaybı olabilir. Sınırlı yamalardan alopesi totalis veya universalise kadar uzanır. Seyir öngörülemez.",
      dermoscopy: "Sarı noktalar, siyah noktalar, ünlem işareti kılları ve kırık kıllar aktiviteyi destekleyebilir. Trikoskopi yaygınlığı değerlendirmeye yardımcıdır.",
      differential: "Tinea kapitis, trikotillomani, traksiyon alopesisi, androgenetik alopesi, telogen effluvium, sekonder sifiliz ve skarlı alopesiler.",
      treatment: "Yeni ve sınırlı yamalar izlenebilir. Yaş, yaygınlık, süre, aktivite ve hasta tercihine göre topikal veya intralezyonel antiinflamatuvar tedavi, kontakt immünoterapi ve sistemik immünomodülasyon değerlendirilebilir. Yeni sistemik seçenekler uzman seçimi ve izlem gerektirir.",
      followup: "Yaygınlık, yeniden uzama, nüks, psikososyal etki ve tedaviye bağlı advers etkiler izlenir. Hızlı ilerleme, yaygın kayıp, kirpik tutulumu veya ilk tedaviye yanıtsızlık uzman değerlendirmesi gerektirir."
    },
    "androgenetic-alopecia": {
      description: "Genetik yatkınlığı olan kişilerde androjene duyarlı foliküllerin minyatürleşmesine bağlı sık ve çoğu zaman ilerleyici saç seyrelmesidir.",
      clinical: "Erkeklerde genellikle bitemporal çekilme ve verteks seyrelmesi, kadınlarda ise frontal çizginin görece korunduğu merkezi seyrelme görülür. Paternler örtüşebilir. Belirgin açıklık gelişmeden önce saç şaftı çapı azalır. Ergenlikte veya daha sonra başlayabilir ve ilerleme hızı değişkendir.",
      dermoscopy: "Saç çapı çeşitliliği, artmış vellüs kılları, perifoliküler işaretler ve sarı noktalar tanıyı destekleyebilir ve skarlı alopesiden ayrımda yardımcı olabilir.",
      differential: "Telogen effluvium, alopesi areata, traksiyon alopesisi, frontal fibrozan alopesi, trikotillomani, tiroid hastalığına bağlı effluvium ve beslenme eksikliği.",
      treatment: "İlerleyici seyir ve gerçekçi hedefler konuşulur. Topikal minoksidil ve uygun ve ruhsatlı olduğu durumlarda antiandrojen veya 5-alfa redüktaz inhibitörü kılavuzlarda sık kullanılan seçeneklerdir. Girişimsel seçenekleri uzman değerlendirir. Seçimde cinsiyet, yaş, gebelik planı, komorbiditeler ve yerel ruhsat dikkate alınır.",
      followup: "Yanıt aylar içinde değerlendirilir. Kazanımı korumak için çoğu zaman idame gerekir. Ani dökülme, yamalı kayıp, skar bulguları veya intolerans tanının gözden geçirilmesini gerektirir."
    },
    "mucous-membrane-pemphigoid": {
      description: "Baskın olarak mukozaları tutan, skar sekeli riski taşıyan edinsel otoimmün subepitelyal büllöz hastalıktır.",
      clinical: "Oral, oküler, nazofaringeal, laringeal, özofageal veya anogenital mukozada kronik erozyon, bül veya skar olabilir. Deri tutulumu değişkendir ve çoğu zaman ikincil önemdedir. Bir veya birden fazla bölge tutulabilir. Oküler, laringeal ve özofageal hastalıkta geri dönüşsüz hasar riski nedeniyle multidisipliner değerlendirme gerekir.",
      dermoscopy: "Dermoskopi rutin tanıda kullanılmaz. Klinik patern, histoloji, immünfloresan veya antijene özgü seroloji daha değerlidir.",
      differential: "Pemfigus vulgaris, mukozal lezyonlu büllöz pemfigoid, liken planus, eritema multiforme veya Stevens–Johnson spektrumu, aftöz stomatit, mukoza travması ve diğer sikatrizan konjonktivit nedenleri.",
      treatment: "Şiddet, skar riski taşıyan bölgeler, komorbiditeler ve ilaç yükü tedaviyi belirler. Kılavuzlar multidisipliner bakım ve bölgeye uyarlanmış immünomodülasyonu vurgular. İndüksiyon, idame ve nüks yönetimi uzman tarafından bireyselleştirilir.",
      followup: "Mukozal iyileşme, skar ilerlemesi, görme, hava yolu ve yutma belirtileri, enfeksiyon riski ve advers etkiler izlenir. Skarla birlikte yeni göz kızarıklığı, dispne, disfaji veya hızlı nüks acil uzman değerlendirmesi gerektirir."
    },
    "dermatitis-herpetiformis": {
      description: "Yoğun kaşıntılı, glutenle ilişkili kronik immünobüllöz dermatozdur. Çölyak tipi enteropati ve deride granüler IgA birikimi ile ilişkilidir.",
      clinical: "Gruplu veziküller, papüller veya erozyonlar dirsek, diz, kalça, saçlı deri ve omuzlarda görülür. Kaşıma nedeniyle sağlam büller az olabilir. Enteropatiye rağmen gastrointestinal semptomlar hafif olabilir veya görülmeyebilir. Tanı klinik patern, immünopatoloji ve glutenle ilişkili serolojiye dayanır.",
      dermoscopy: "Dermoskopi rutin tanı yöntemi değildir. İmmünfloresan ve klinik-serolojik korelasyon daha değerlidir.",
      differential: "Atopik veya kontakt dermatit, uyuz, büllöz pemfigoid, lineer IgA hastalığı, ekzema herpetikum, papüler ürtiker ve nörotik ekskoriasyonlar.",
      treatment: "Tanısal değerlendirme tamamlandıktan sonra ömür boyu glutensiz diyet hastalığın seyrini değiştiren temel tedavidir. Diyet etkisini gösterene kadar semptom kontrolü için uzman tarafından sistemik ajan seçilebilir. Tedavi kaşıntı yüküne, uyuma ve komorbiditelere göre bireyselleştirilir.",
      followup: "Deri bulguları, diyete uyum, beslenme durumu, ilişkili otoimmün hastalık ve advers etkiler izlenir. Diyet ihlali sonrası nüks sıktır. Yeni dirençli kaşıntı veya açıklanamayan sistemik semptomlar uzman ve diyet değerlendirmesi gerektirir."
    },
    "nail-psoriasis": {
      description: "Tırnak matriksi veya yatağının psoriatik inflamasyonudur. Karakteristik plak ve yatak değişiklikleri deri veya eklem hastalığıyla birlikte ya da tek başına görülebilir.",
      clinical: "Matriks tutulumunda çukurcuklar, lökonişi, ufalanma veya çizgilenme, yatak tutulumunda yağ damlası ya da somon lekesi, onikoliz, subungual hiperkeratoz ve kıymık kanamaları görülebilir. Şiddet deri psoriazisiyle her zaman paralel değildir. İzole tırnak hastalığı ilerideki eklem belirtileriyle ilişkili olabilir ancak tırnak bulguları tek başına artrit tanısı koydurmaz.",
      dermoscopy: "Onikoskopi çukurcukları, onikoliz sınırını, kıymık kanamalarını ve somon lekelerini gösterebilir. Klinik ve mikolojik bağlam olmadan onikomikozdan veya diğer distrofilerden güvenilir ayrım sağlamaz.",
      differential: "Onikomikoz, tırnak liken planusu, travmatik distrofi, alopesi areataya bağlı çukurcuklar, tırnak ünitesi ekzeması, yirmi tırnak distrofisi ve Hallopeau’nun akrodermatitis kontinuası.",
      treatment: "Tedavi tutulan tırnak sayısı, matriks veya yatak tutulumu, deri ve eklem hastalığı ve yaşam kalitesine göre seçilir. Konsensüs sınırlı hastalıkta bölgeye uyarlanmış topikal veya intralezyonel antiinflamatuvar tedaviyi, tırnak yükü, deri tutulumu veya artropati gerektiriyorsa uzman gözetiminde sistemik seçenekleri destekler.",
      followup: "Aylar içinde tırnak uzaması, işlev kaybı, eşlik eden deri veya eklem aktivitesi ve tedavi toleransı değerlendirilir. İlerleyici distrofi, tek tırnakta atipik değişiklik veya yanıtsızlıkta mikolojik test ve tümör dahil alternatif tanılar düşünülür."
    },
    "chronic-paronychia": {
      description: "Proksimal veya lateral tırnak kıvrımlarının altı haftadan uzun süren inflamasyonudur. Sıklıkla irritan maruziyeti ve sekonder kolonizasyonla ilişkilidir.",
      clinical: "Tırnak kıvrımlarında şişlik ve hassasiyet, kütikül kaybı ve tırnak plağından ayrılma tipiktir. Islak iş yapanlarda veya el dermatiti olanlarda birden fazla parmak sık tutulur. Nem veya irritan sonrası alevlenme sıktır. Akut bakteriyel paronişiye göre belirgin apse nadirdir. Candida veya Pseudomonas kolonizasyonu primer enfeksiyonu kanıtlamaz.",
      dermoscopy: "Onikoskopide kıvrım eritemi, kütikül bozulması ve sekonder plak distrofisi görülebilir. Kroniklik veya neden bu bulgularla belirlenemez.",
      differential: "Akut bakteriyel paronişi, kıvrım tutulumlu Candida onikomikozu, tırnak psoriazisi veya ekzeması, herpetik dolama, retinoid ya da kemoterapiyle ilişkili paronişi ve tek parmakta dirençli seyreden skuamöz hücreli karsinom veya başka tümör.",
      treatment: "İrritan ve nemden kaçınmak temeldir. Derlemeler kronik hastalıkta topikal antiinflamatuvar tedaviyi destekler. Kolonizasyon klinik açıdan önemliyse antifungal eklenebilir. Dirençli veya tek parmaklı hastalık alternatif tanılar veya girişimsel seçenekler için uzman değerlendirmesi gerektirebilir.",
      followup: "Kıvrım bütünlüğü, kütikülün iyileşmesi, sekonder distrofi ve mesleki maruziyet izlenir. Koruyucu önlemlere rağmen tek parmakta kalıcı hastalıkta tümör ve diğer benzer tablolar değerlendirilir."
    },
    "nail-lichen-planus": {
      description: "Tırnak matriksi veya yatağının, plağı inceltebilen, yarabilen veya kalıcı olarak tahrip edebilen likenoid inflamatuvar fenotipidir.",
      clinical: "Bir veya birden fazla tırnakta longitudinal çizgilenme, incelme, distal yarılma, onikoliz, lunula eritemi ve pterjiyum görülebilir. Deri veya mukoza tutulumu olmayabilir. İlerleyici matriks skarı anonişiye yol açabilir. Yerleşik kayıp geç tedaviyle geri dönmeyebileceğinden erken tanı önemlidir.",
      dermoscopy: "Onikoskopide çizgilenme, kıymık kanamaları ve lunula eritemi belirginleşebilir. Belirsizlikte klinik ve histolojik korelasyonun yerine geçmez.",
      differential: "Tırnak psoriazisi, onikomikoz, trakionişi veya yirmi tırnak distrofisi, travmatik distrofi, alopesi areata tırnak değişiklikleri ve tırnağı tutan likenoid ilaç erüpsiyonu.",
      treatment: "Kanıt sınırlıdır ve büyük ölçüde uzman görüşüne dayanır. Aktif klasik hastalıkta topikal monoterapi sıklıkla yetersiz olduğundan konsensüs erken, uzman gözetiminde antiinflamatuvar tedaviyi destekler. Seçim tırnak sayısı, şiddet, skar riski ve komorbiditelere göre yapılır.",
      followup: "Tırnak uzarken aylar içinde pterjiyum veya anonişiye ilerleme, işlevsel etki ve advers etkiler izlenir. Tek tırnakta yeni atipik değişiklik veya dirençli distrofi tanının gözden geçirilmesini gerektirir. Tümör dışlanamıyorsa biyopsi değerlendirilir."
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
