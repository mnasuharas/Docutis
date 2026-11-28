/* Educational drafts adapted from the supplied Praxis guide and Turkish handouts.
 * Human review of these additions is independent from the existing disease records.
 */
(function () {
  "use strict";

  window.DOCUTIS_PRAXIS_PILOT = {
    "acne-vulgaris": {
      germanName: "Akne (Acne vulgaris)",
      aliases: ["Akne", "Akne vulgaris", "sivilce"],
      guidePage: 20,
      handoutPage: 1,
      approach: [
        "Choose initial treatment by morphology, severity, irritation risk and scarring. A topical retinoid, benzoyl peroxide (BPO) or azelaic acid may fit mild disease. Fixed adapalene/BPO is an option for inflammatory papulopustular acne.",
        "Başlangıç tedavisini morfoloji, şiddet, tahriş ve skar riskine göre seç. Hafif aknede topikal retinoid, benzoil peroksit (BPO) veya azelaik asit düşünülebilir. İnflamatuvar papülopüstüler aknede adapalen/BPO sabit kombinasyonu bir seçenektir."
      ],
      followUp: [
        "Reassess response, tolerance and adherence at around 12 weeks. Deep painful nodules, ongoing scarring or major psychosocial burden warrant earlier reassessment.",
        "Yaklaşık 12. haftada yanıtı, toleransı ve uygulama düzenini değerlendir. Derin ağrılı nodüller, devam eden skar oluşumu veya belirgin psikososyal yük varsa daha erken değerlendir."
      ],
      example: [
        "Epiduo 0.1%/2.5% gel. For acne with comedones, papules and pustules from age 9. As a thin film once daily in the evening on affected areas. Contraindicated during pregnancy and when planning pregnancy. The prescriber determines duration.",
        "Epiduo %0,1/%2,5 jel. Komedon, papül ve püstüllerin birlikte bulunduğu aknede 9 yaş ve üzeri için. Etkilenen alanlara akşamları günde bir kez ince tabaka halinde. Gebelikte ve gebelik planında kontrendikedir. Süreyi reçeteleyen hekim belirler."
      ],
      scope: [
        "The product information applies to this strength. Check the chosen product separately when changing strength, formulation or age group.",
        "Bu Fachinformation belirtilen konsantrasyona aittir. Konsantrasyon, formülasyon veya yaş grubu değiştiğinde seçilen preparatı ayrıca kontrol et."
      ],
      care: [
        "Gentle cleansing, non-comedogenic moisturiser and sun protection as needed.",
        "Nazik temizleme, komedojenik olmayan nemlendirici ve gereksinime göre güneşten korunma."
      ],
      sources: [
        ["AWMF 013-017 · S2k Akne v3.0 (08/2026)", "https://register.awmf.org/assets/guidelines/013-017l_S2k_Therapie-Akne_2026-08.pdf"],
        ["Fachinformation · Epiduo 0,1 %/2,5 %", "https://www.fachinfo.de/fi/pdf/010719"]
      ],
      patient: {
        title: "Akne (sivilce)",
        about: "Akne, gözenekler tıkandığında ve iltihaplandığında oluşabilir. Siyah noktalar, kırmızı sivilceler veya derin, ağrılı şişlikler görülebilir. Akne bulaşıcı değildir.",
        treatment: "Tedavi sivilcelerin tipine ve şiddetine göre seçilir. Doktorunuzun verdiği tedaviye etki göstermesi için zaman tanıyın. Cildiniz çok tahriş olursa uygulamayı nasıl sürdüreceğinizi muayenehanenize sorun.",
        daily: "Sivilceleri sıkmaktan kaçının. Cildinizi nazikçe temizleyin ve gözenekleri tıkamayan nemlendirici kullanın. İlacınızı size anlatılan şekilde uygulayın.",
        contact: "Kontrol randevunuza gelin. Derin, ağrılı şişlikler, iz oluşumu veya belirgin tahriş varsa daha erken başvurun. Hamileyseniz veya hamilelik planlıyorsanız kullandığınız ilaçları doktorunuza bildirin."
      }
    },
    onychomycosis: {
      germanName: "Onychomykose (Nagelpilz)",
      aliases: ["Onychomykose", "Nagelpilz", "tırnak mantarı", "onikomikoz"],
      guidePage: 129,
      handoutPage: 5,
      approach: [
        "Obtain mycological confirmation before choosing therapy. Consider topical lacquer for limited disease without matrix involvement. For more extensive or matrix-involving disease, assess systemic treatment and combination with topical therapy.",
        "Tedavi seçmeden önce mikolojik doğrulama yap. Matriksi tutmayan sınırlı hastalıkta topikal tırnak cilası düşünülebilir. Yaygın veya matriksi tutan hastalıkta sistemik tedaviyi ve topikal tedaviyle kombinasyonu değerlendir."
      ],
      followUp: [
        "Review clinical and mycological response. Before oral terbinafine check interactions and hepatic risk, and follow the product's monitoring instructions. Reassess a new or widening pigmented nail band separately.",
        "Klinik ve mikolojik yanıtı değerlendir. Oral terbinafin öncesi etkileşimleri ve karaciğer riskini kontrol et, preparatın izlem talimatlarını uygula. Yeni veya genişleyen pigmente tırnak bandını ayrıca değerlendir."
      ],
      example: [
        "Terbinafin AbZ 250 mg tablets for susceptible dermatophyte nail infection. Adult example: 250 mg orally once daily. The product information gives 6 weeks to 3 months for most patients and typically 3 months for toenails. Some patients require 6 months or longer. It recommends liver function tests before treatment and again after 4–6 treatment weeks.",
        "Terbinafin AbZ 250 mg tablet, terbinafine duyarlı dermatofitlerin yol açtığı tırnak enfeksiyonunda. Erişkin örneği günde bir kez 250 mg oral. Fachinformation çoğu hasta için 6 hafta–3 ay, ayak tırnağında genellikle 3 ay belirtir. Bazı hastalarda 6 ay veya daha uzun süre gerekebilir. Karaciğer fonksiyon testleri tedavi öncesinde ve 4–6. tedavi haftasında önerilir."
      ],
      scope: [
        "The 3-month figure is a typical duration for this product. When considering longer treatment or an intermittent regimen, check the exact product instructions, diagnosis and response.",
        "Üç ay bu preparatın tipik süresidir. Daha uzun tedavi veya aralıklı şema düşünülüyorsa seçilen preparatın Fachinformation’ını, tanıyı ve yanıtı birlikte değerlendir."
      ],
      care: [
        "Keep feet dry and assess coexisting athlete's foot. Avoid sharing nail-care tools.",
        "Ayakları kuru tut, eşlik eden ayak mantarını değerlendir. Tırnak bakım aletlerini ortak kullanma."
      ],
      sources: [
        ["AWMF 013-003 · S1 Onychomykose v5.1", "https://www.awmf.org/aktuelles/awmf-aktuell/onychomykose"],
        ["Fachinformation · Terbinafin AbZ 250 mg (09/2026)", "https://www.fachinfo.de/fi/pdf/009155/terbinafin-abz-250-mg-tabletten"]
      ],
      patient: {
        title: "Tırnak mantarı",
        about: "Mantar, tırnağı kalınlaştırabilir, rengini değiştirebilir veya kolay kırılmasına yol açabilir. Benzer değişikliklerin başka nedenleri de vardır. Doktorunuz bir tırnak örneğinin incelenmesini isteyebilir.",
        treatment: "Tutulumun yaygınlığına göre ilaçlı tırnak cilası, tablet veya ikisi birlikte kullanılabilir. Sağlıklı tırnağın dipten uzaması zaman alır. İlacı size verilen plana göre kullanın.",
        daily: "Ayaklarınızı ve parmak aralarını iyi kurulayın. Tırnak makası ve törpünüzü paylaşmayın. Parmak aralarında kaşıntı veya soyulma varsa doktorunuza söyleyin.",
        contact: "Tırnak çevresinde artan kızarıklık, ağrı veya şişlik varsa başvurun. Tablet kullanırken gözlerde veya ciltte sararma ya da koyu idrar olursa hemen tıbbi yardım alın."
      }
    },
    rosacea: {
      germanName: "Rosazea",
      aliases: ["Rosazea", "Rozasea", "Rosacea"],
      guidePage: 153,
      approach: [
        "Select treatment by phenotype. Papulopustular inflammation, persistent erythema and ocular disease require different assessments.",
        "Tedaviyi fenotipe göre seç. Papülopüstüler inflamasyon, persistan eritem ve göz tutulumu ayrı değerlendirilir."
      ],
      followUp: [
        "Check response and tolerance and ask about eye symptoms. Eye pain, photophobia or a change in vision needs prompt assessment.",
        "Yanıtı ve toleransı kontrol et, göz yakınmalarını sor. Göz ağrısı, fotofobi veya görme değişikliği gecikmeden değerlendirilir."
      ],
      example: [
        "Soolantra 10 mg/g cream for inflammatory papulopustular rosacea lesions in adults. Apply once daily for up to 4 months. The product information advises stopping if there is no improvement after 3 months.",
        "Soolantra 10 mg/g krem, erişkinde papülopüstüler rozaseanın inflamatuvar lezyonları için. En fazla 4 ay, günde bir kez. Fachinformation, 3 ayda düzelme olmazsa tedavinin sonlandırılmasını önerir."
      ],
      scope: [
        "This product indication covers inflammatory lesions in adults. Consult the product information for pregnancy and severe liver impairment. Ocular symptoms require their own assessment.",
        "Bu preparat erişkindeki inflamatuvar lezyonlar için ruhsatlıdır. Gebelik ve ağır karaciğer fonksiyon bozukluğunda Fachinformation’ı kontrol et. Oküler semptomları ayrıca değerlendir."
      ],
      care: [
        "Gentle skin care and tolerated sun protection. Ask about individual triggers and topical steroid exposure.",
        "Nazik cilt bakımı ve tolere edilebilen güneş koruması. Kişisel tetikleyicileri ve topikal steroid kullanımını sorgula."
      ],
      sources: [
        ["AWMF 013-065 · S2k Rosazea v3.0", "https://www.awmf.org/aktuelles/awmf-aktuell/rosazea"],
        ["Fachinformation · Soolantra 10 mg/g", "https://www.fachinfo.de/fi/pdf/020649"]
      ]
    },
    "actinic-keratosis": {
      germanName: "Aktinische Keratose",
      aliases: ["Aktinische Keratose", "Aktinische Keratosen", "aktinik keratoz"],
      guidePage: 25,
      handoutPage: 4,
      approach: [
        "Choose lesion-directed care, such as cryosurgery for selected single lesions, or field-directed therapy for multiple lesions in a sun-damaged area. Assess an atypical, indurated, rapidly growing or persistently ulcerated lesion for invasive SCC.",
        "Seçilmiş tek lezyonlarda kriyocerrahi gibi lezyona yönelik tedaviyi, güneş hasarlı bir alanda birden çok lezyon varsa alan tedavisini değerlendir. Atipik, endüre, hızla büyüyen veya kalıcı ülserli lezyonda invaziv SCC olasılığını araştır."
      ],
      followUp: [
        "Check response after the local reaction settles. Reassess persistent or changing lesions. For the tirbanibulin example, product information gives about 8 weeks from treatment start for response assessment.",
        "Lokal reaksiyon yatışınca yanıtı değerlendir. Kalıcı veya değişen lezyonu yeniden incele. Tirbanibulin örneğinde Fachinformation, tedavi başlangıcından yaklaşık 8 hafta sonra yanıt değerlendirmesini belirtir."
      ],
      example: [
        "Klisyri 10 mg/g ointment. Field therapy for Olsen grade 1 lesions of the face or scalp in adults, non-hyperkeratotic and non-hypertrophic. Apply once daily for 5 consecutive days to a field of up to 25 cm² under this EU product information.",
        "Klisyri 10 mg/g merhem. Erişkinde yüz veya saçlı deride hiperkeratotik ve hipertrofik olmayan Olsen derece 1 lezyonlar için alan tedavisi. Bu AB Fachinformation’ına göre en fazla 25 cm² alana, art arda 5 gün boyunca günde bir kez."
      ],
      scope: [
        "Verify the licensed site, lesion grade and treatment area before using a field product. Reassess suspicion of malignancy before field therapy.",
        "Alan tedavisinde preparatın ruhsatlı bölgesini, lezyon derecesini ve uygulama alanını kontrol et. Malignite şüphesini alan tedavisi öncesi değerlendir."
      ],
      care: [
        "UV protection with shade, clothing and sunscreen. Confirm the application area and expected local reaction when prescribing.",
        "Gölge, giysi ve güneş koruyucuyla UV’den korunma. Reçete verirken uygulama alanını ve beklenen lokal reaksiyonu açıkla."
      ],
      sources: [
        ["AWMF 032-022OL · S3 Aktinische Keratose / PEK v2.0", "https://www.leitlinienprogramm-onkologie.de/leitlinien/aktinische-keratose-und-plattenepithelkarzinom-der-haut"],
        ["EMA · Klisyri 10 mg/g · Produktinformation (DE)", "https://www.ema.europa.eu/de/documents/product-information/klisyri-epar-product-information_de.pdf"]
      ],
      patient: {
        title: "Aktinik keratoz",
        about: "Aktinik keratoz, güneşten hasar görmüş ciltte oluşan, çoğu zaman pürüzlü ve pullu bir lekedir. Bazıları zamanla deri kanserine ilerleyebilir. Bu nedenle doktorunuz kontrol veya tedavi önerebilir.",
        treatment: "Tek bir leke dondurularak tedavi edilebilir. Birden fazla leke varsa doktorunuz daha geniş bir cilt alanını tedavi etmeyi önerebilir. İlaç verildiyse yalnızca size gösterilen alana, tarif edildiği şekilde uygulayın.",
        daily: "Açık havada gölgeyi tercih edin. Şapka, giysi ve güneş koruyucu kullanın. Cildinizdeki değişiklikleri takip edin.",
        contact: "Bir leke büyür, kalınlaşır, kanar, ağrır veya iyileşmezse daha erken başvurun. Tedavi sırasında şiddetli reaksiyon, irin ya da ateş olursa muayenehanenizle görüşün."
      }
    }
  };
})();
