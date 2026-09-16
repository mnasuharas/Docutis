/* Medical records are separate from UI behavior for independent review. */
(function () {
  "use strict";

  const reviewRequired = "clinician review required";
  const categories = [
    { id: "premalignant", title: "Premalignant Lesions" },
    { id: "keratinocytic", title: "Keratinocytic Malignancies" },
    { id: "melanocytic", title: "Melanocytic Malignancies" },
    { id: "other", title: "Other Cutaneous Malignancies" },
    { id: "inflammatory-eczematous", title: "Inflammatory and Eczematous Disorders" },
    { id: "acneiform-sebaceous", title: "Acneiform and Sebaceous Disorders" },
    { id: "pigmentary", title: "Pigmentary Disorders" },
    { id: "infectious-infestation", title: "Infectious and Infestation Disorders" }
  ];
  const subcategories = [
    { id: "premalignant-keratinocytic", title: "Premalignant keratinocytic lesion" },
    { id: "keratinization-disorder", title: "Keratinization disorder with variable malignant potential" },
    { id: "keratinocytic-carcinoma", title: "Keratinocytic carcinoma" },
    { id: "keratinocytic-tumor-uncertain", title: "Keratinocytic tumor with classification uncertainty" },
    { id: "melanoma", title: "Cutaneous melanoma" },
    { id: "melanoma-in-situ", title: "Melanoma in situ" },
    { id: "melanoma-subtype", title: "Melanoma subtype" },
    { id: "neuroendocrine-carcinoma", title: "Neuroendocrine carcinoma" },
    { id: "adnexal-carcinoma", title: "Adnexal carcinoma" },
    { id: "cutaneous-sarcoma", title: "Cutaneous sarcoma" },
    { id: "fibrohistiocytic-tumor", title: "Fibrohistiocytic tumor" },
    { id: "vascular-neoplasm", title: "Vascular neoplasm" },
    { id: "paget-disease", title: "Extramammary Paget disease" },
    { id: "cutaneous-lymphoma", title: "Cutaneous lymphoma" },
    { id: "eczematous-dermatitis", title: "Eczematous dermatitis" },
    { id: "seborrheic-disorder", title: "Seborrheic disorder" },
    { id: "papulosquamous-disorder", title: "Papulosquamous disorder" },
    { id: "urticarial-disorder", title: "Urticarial disorder" },
    { id: "acneiform-disorder", title: "Acneiform disorder" },
    { id: "rosacea", title: "Rosacea" },
    { id: "depigmenting-disorder", title: "Depigmenting disorder" },
    { id: "bacterial-infection", title: "Bacterial infection" },
    { id: "dermatophyte-infection", title: "Dermatophyte infection" },
    { id: "other-fungal-infection", title: "Other fungal infection" },
    { id: "parasitic-infestation", title: "Parasitic infestation" },
    { id: "viral-infection", title: "Viral infection" }
  ];
  const sourceTypes = new Set([
    "official classification", "guideline", "consensus", "systematic review",
    "peer-reviewed review", "clinical reference"
  ]);
  function isIsoDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const parsed = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
  }
  function source({ title, organization, type, year = null, version = null, url, doi = null, metadataCheckedAt }) {
    if (!title?.trim() || !organization?.trim()) throw new TypeError("Source title and organization are required");
    if (!sourceTypes.has(type)) throw new TypeError(`Unsupported source type: ${type}`);
    if (!isIsoDate(metadataCheckedAt)) {
      throw new TypeError(`Invalid source metadata check date for ${title}`);
    }
    if (!/^https:\/\//.test(url)) throw new TypeError(`Source URL must use HTTPS for ${title}`);
    if (doi && !/^10\.\d{4,9}\/.+/.test(doi)) throw new TypeError(`Invalid DOI for ${title}`);
    return Object.freeze({ title, organization, type, year, version, url, doi, metadataCheckedAt });
  }
  const refs = {
    whoIcd10: source({ title: "ICD-10 Version: 2019", organization: "World Health Organization", type: "official classification", version: "2019", url: "https://icd.who.int/browse10/2019/en", metadataCheckedAt: "2026-09-15" }),
    icdo32: source({ title: "International Classification of Diseases for Oncology, Third Edition, Second Revision", organization: "World Health Organization / International Agency for Research on Cancer", type: "official classification", year: 2019, version: "ICD-O-3.2", url: "https://www.who.int/standards/classifications/other-classifications/international-classification-of-diseases-for-oncology", metadataCheckedAt: "2026-09-15" }),
    whoSkin: source({ title: "WHO Classification of Skin Tumours, fifth edition", organization: "WHO Classification of Tumours Editorial Board / IARC", type: "official classification", year: 2025, version: "5th edition", url: "https://whobluebooks.iarc.who.int/structures/skintumours/", metadataCheckedAt: "2026-09-15" }),
    aadAk: source({ title: "Actinic keratosis clinical guideline", organization: "American Academy of Dermatology", type: "guideline", url: "https://www.aad.org/member/clinical-quality/guidelines/actinic-keratosis", metadataCheckedAt: "2026-09-15" }),
    aadBcc: source({ title: "Basal cell carcinoma clinical guideline", organization: "American Academy of Dermatology", type: "guideline", url: "https://www.aad.org/member/clinical-quality/guidelines/bcc", metadataCheckedAt: "2026-09-15" }),
    aadScc: source({ title: "Cutaneous squamous cell carcinoma clinical guideline", organization: "American Academy of Dermatology", type: "guideline", url: "https://www.aad.org/member/clinical-quality/guidelines/scc", metadataCheckedAt: "2026-09-15" }),
    eadoMelanomaDiagnostics: source({ title: "European consensus-based interdisciplinary guideline for melanoma. Part 1: Diagnostics — Update 2024", organization: "EADO / EDF / EORTC", type: "guideline", year: 2025, version: "2024 update; part 1", url: "https://pubmed.ncbi.nlm.nih.gov/39700658/", doi: "10.1016/j.ejca.2024.115152", metadataCheckedAt: "2026-09-15" }),
    eadoMelanomaTreatment: source({ title: "European consensus-based interdisciplinary guideline for melanoma. Part 2: Treatment — Update 2024", organization: "EADO / EDF / EORTC", type: "guideline", year: 2025, version: "2024 update; part 2", url: "https://pubmed.ncbi.nlm.nih.gov/39709737/", doi: "10.1016/j.ejca.2024.115153", metadataCheckedAt: "2026-09-15" }),
    nciMelanoma: source({ title: "Melanoma Treatment (PDQ®) — Health Professional Version", organization: "National Cancer Institute", type: "clinical reference", url: "https://www.cancer.gov/types/skin/hp/melanoma-treatment-pdq", metadataCheckedAt: "2026-09-15" }),
    nciMcc: source({ title: "Merkel Cell Carcinoma Treatment (PDQ®) — Health Professional Version", organization: "National Cancer Institute", type: "clinical reference", url: "https://www.cancer.gov/types/skin/hp/merkel-cell-treatment-pdq", metadataCheckedAt: "2026-09-15" }),
    nciCtcl: source({ title: "Mycosis Fungoides and Other Cutaneous T-Cell Lymphomas Treatment (PDQ®)", organization: "National Cancer Institute", type: "clinical reference", url: "https://www.cancer.gov/types/lymphoma/hp/mycosis-fungoides-treatment-pdq", metadataCheckedAt: "2026-09-15" }),
    nciKaposi: source({ title: "Kaposi Sarcoma Treatment (PDQ®) — Health Professional Version", organization: "National Cancer Institute", type: "clinical reference", url: "https://www.cancer.gov/types/soft-tissue-sarcoma/hp/kaposi-treatment-pdq", metadataCheckedAt: "2026-09-15" }),
    esmoMcc: source({ title: "Merkel-cell carcinoma: ESMO–EURACAN Clinical Practice Guideline for diagnosis, treatment and follow-up", organization: "ESMO / EURACAN", type: "guideline", year: 2024, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11145756/", doi: "10.1016/j.esmoop.2024.102977", metadataCheckedAt: "2026-09-15" }),
    afxPds: source({ title: "S1-guideline atypical fibroxanthoma (AFX) and pleomorphic dermal sarcoma (PDS)", organization: "German Dermatological Society guideline group", type: "guideline", year: 2022, url: "https://pubmed.ncbi.nlm.nih.gov/35099104/", doi: "10.1111/ddg.14700", metadataCheckedAt: "2026-09-15" }),
    empd: source({ title: "Evidence-Based Clinical Practice Guidelines for Extramammary Paget Disease", organization: "International multidisciplinary expert panel", type: "guideline", year: 2022, url: "https://pubmed.ncbi.nlm.nih.gov/35050310/", doi: "10.1001/jamaoncol.2021.7148", metadataCheckedAt: "2026-09-15" }),
    sebaceous: source({ title: "S1-Guideline Sebaceous Carcinoma", organization: "German Dermatological Society / ADO", type: "guideline", year: 2024, url: "https://onlinelibrary.wiley.com/doi/full/10.1111/ddg.15405", doi: "10.1111/ddg.15405", metadataCheckedAt: "2026-09-15" }),
    dfsp: source({ title: "Diagnosis and treatment of dermatofibrosarcoma protuberans: European interdisciplinary guideline — update 2024", organization: "EADO / EDF / EADV / UEMS", type: "guideline", year: 2025, version: "2024 update", url: "https://pubmed.ncbi.nlm.nih.gov/39904126/", doi: "10.1016/j.ejca.2025.115265", metadataCheckedAt: "2026-09-15" }),
    mac: source({ title: "Evidence-Based Clinical Practice Guidelines for Microcystic Adnexal Carcinoma: Informed by a Systematic Review", organization: "International multidisciplinary expert committee", type: "guideline", year: 2019, url: "https://pubmed.ncbi.nlm.nih.gov/31268498/", doi: "10.1001/jamadermatol.2019.1251", metadataCheckedAt: "2026-09-15" }),
    porocarcinoma: source({ title: "Porocarcinoma: Clinical and Histological Features, Immunohistochemistry and Outcomes: A Systematic Review", organization: "Bienstman, Güvenç and Garmyn", type: "systematic review", year: 2024, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11172007/", doi: "10.3390/ijms25115760", metadataCheckedAt: "2026-09-15" }),
    angiosarcoma: source({ title: "Clinical recommendations for treatment of localized angiosarcoma: A consensus paper by the Italian Sarcoma Group", organization: "Italian Sarcoma Group", type: "consensus", year: 2024, url: "https://pubmed.ncbi.nlm.nih.gov/38604052/", doi: "10.1016/j.ctrv.2024.102722", metadataCheckedAt: "2026-09-15" }),
    actinicCheilitis: source({ title: "S3 guideline: actinic keratosis and cutaneous squamous cell carcinoma — update 2023, part 1: treatment of actinic keratosis, actinic cheilitis, Bowen disease, occupational disease and structures of care", organization: "German guideline group", type: "guideline", year: 2023, url: "https://onlinelibrary.wiley.com/doi/10.1111/ddg.15231", doi: "10.1111/ddg.15231", metadataCheckedAt: "2026-09-15" }),
    keratoacanthoma: source({ title: "Keratoacanthoma: Update on the Debate", organization: "American Journal of Dermatopathology", type: "peer-reviewed review", year: 2021, url: "https://pubmed.ncbi.nlm.nih.gov/33395044/", doi: "10.1097/DAD.0000000000001872", metadataCheckedAt: "2026-09-15" }),
    porokeratosisReview: source({ title: "Porokeratoses: an update on pathogenesis and treatment", organization: "International Journal of Dermatology", type: "peer-reviewed review", year: 2024, url: "https://pubmed.ncbi.nlm.nih.gov/39129190/", doi: "10.1111/ijd.17411", metadataCheckedAt: "2026-09-15" }),
    eortcMfSs: source({ title: "EORTC consensus recommendations for the treatment of mycosis fungoides/Sézary syndrome — Update 2023", organization: "EORTC Cutaneous Lymphoma Tumour Group", type: "consensus", year: 2023, url: "https://doi.org/10.1016/j.ejca.2023.113343", doi: "10.1016/j.ejca.2023.113343", metadataCheckedAt: "2026-09-15" }),
    whoHaem5: source({ title: "The 5th edition of the World Health Organization Classification of Haematolymphoid Tumours: Lymphoid Neoplasms", organization: "Leukemia / WHO Classification of Tumours Editorial Board", type: "peer-reviewed review", year: 2022, version: "WHO-HAEM5 overview", url: "https://www.nature.com/articles/s41375-022-01620-2", doi: "10.1038/s41375-022-01620-2", metadataCheckedAt: "2026-09-15" }),
    cd30Consensus: source({ title: "EORTC, ISCL, and USCLC consensus recommendations for the treatment of primary cutaneous CD30-positive lymphoproliferative disorders: lymphomatoid papulosis and primary cutaneous anaplastic large-cell lymphoma", organization: "EORTC / ISCL / USCLC", type: "consensus", year: 2011, url: "https://pubmed.ncbi.nlm.nih.gov/21841159/", doi: "10.1182/blood-2011-05-351346", metadataCheckedAt: "2026-09-15" }),
    pcAlclReview: source({ title: "Primary Cutaneous Anaplastic Large Cell Lymphoma—A Review of Clinical, Morphological, Immunohistochemical, and Molecular Features", organization: "Cancers", type: "peer-reviewed review", year: 2023, url: "https://pubmed.ncbi.nlm.nih.gov/37627126/", doi: "10.3390/cancers15164098", metadataCheckedAt: "2026-09-15" }),
    aadAtopicTopical: source({ title: "Guidelines of care for the management of atopic dermatitis in adults with topical therapies", organization: "American Academy of Dermatology", type: "guideline", year: 2023, url: "https://pubmed.ncbi.nlm.nih.gov/36641009/", doi: "10.1016/j.jaad.2022.12.029", metadataCheckedAt: "2026-09-16" }),
    aadAtopicSystemic: source({ title: "Guidelines of care for the management of atopic dermatitis in adults with phototherapy and systemic therapies", organization: "American Academy of Dermatology", type: "guideline", year: 2024, url: "https://pubmed.ncbi.nlm.nih.gov/37943240/", doi: "10.1016/j.jaad.2023.08.102", metadataCheckedAt: "2026-09-16" }),
    badContactDermatitis: source({ title: "British Association of Dermatologists' guidelines for the management of contact dermatitis 2017", organization: "British Association of Dermatologists", type: "guideline", year: 2017, url: "https://pubmed.ncbi.nlm.nih.gov/28244094/", doi: "10.1111/bjd.15239", metadataCheckedAt: "2026-09-16" }),
    sebDermConsensus: source({ title: "A comprehensive literature review and an international expert consensus on the management of scalp seborrheic dermatitis in adults", organization: "European Journal of Dermatology / international expert panel", type: "consensus", year: 2024, url: "https://pubmed.ncbi.nlm.nih.gov/38919137/", doi: "10.1684/ejd.2024.4703", metadataCheckedAt: "2026-09-16" }),
    euroGuidermPsoriasis: source({ title: "Living EuroGuiDerm Guideline for the systemic treatment of psoriasis vulgaris", organization: "European Dermatology Forum / EuroGuiDerm", type: "guideline", version: "September 2023; partial update February 2025", url: "https://www.guidelines.edf.one/guidelines/psoriasis-guideline", metadataCheckedAt: "2026-09-16" }),
    aadPsoriasis: source({ title: "Psoriasis clinical guideline", organization: "American Academy of Dermatology", type: "guideline", url: "https://www.aad.org/member/clinical-quality/guidelines/psoriasis", metadataCheckedAt: "2026-09-16" }),
    aadAcne: source({ title: "Guidelines of care for the management of acne vulgaris", organization: "American Academy of Dermatology", type: "guideline", year: 2024, url: "https://pubmed.ncbi.nlm.nih.gov/38300170/", doi: "10.1016/j.jaad.2023.12.017", metadataCheckedAt: "2026-09-16" }),
    rosaceaGuideline: source({ title: "S2k guideline: Rosacea", organization: "German Dermatological Society guideline group", type: "guideline", year: 2022, url: "https://pubmed.ncbi.nlm.nih.gov/35929658/", doi: "10.1111/ddg.14849", metadataCheckedAt: "2026-09-16" }),
    urticariaGuideline: source({ title: "The International Guideline for the Definition, Classification, Diagnosis and Management of Urticaria", organization: "GA²LEN / UCARE / ACARE international guideline group", type: "guideline", year: 2026, url: "https://pubmed.ncbi.nlm.nih.gov/41649409/", doi: "10.1111/all.70210", metadataCheckedAt: "2026-09-16" }),
    vitiligoConsensusPart1: source({ title: "Worldwide expert recommendations for the diagnosis and management of vitiligo: Position statement from the International Vitiligo Task Force Part 1: towards a new management algorithm", organization: "International Vitiligo Task Force", type: "consensus", year: 2023, version: "Part 1", url: "https://pubmed.ncbi.nlm.nih.gov/37746876/", doi: "10.1111/jdv.19451", metadataCheckedAt: "2026-09-16" }),
    vitiligoConsensusPart2: source({ title: "Worldwide expert recommendations for the diagnosis and management of vitiligo: Position statement from the International Vitiligo Task Force—Part 2: Specific treatment recommendations", organization: "International Vitiligo Task Force", type: "consensus", year: 2023, version: "Part 2", url: "https://pubmed.ncbi.nlm.nih.gov/37715487/", doi: "10.1111/jdv.19450", metadataCheckedAt: "2026-09-16" }),
    niceImpetigo: source({ title: "Impetigo: antimicrobial prescribing", organization: "National Institute for Health and Care Excellence", type: "guideline", year: 2020, version: "NG153", url: "https://www.nice.org.uk/guidance/ng153/chapter/Recommendations", metadataCheckedAt: "2026-09-16" }),
    folliculitisCochrane: source({ title: "Interventions for bacterial folliculitis and boils (furuncles and carbuncles)", organization: "Cochrane Database of Systematic Reviews", type: "systematic review", year: 2021, url: "https://pubmed.ncbi.nlm.nih.gov/33634465/", doi: "10.1002/14651858.CD013099.pub2", metadataCheckedAt: "2026-09-16" }),
    niceCellulitisErysipelas: source({ title: "Cellulitis and erysipelas: antimicrobial prescribing", organization: "National Institute for Health and Care Excellence", type: "guideline", year: 2019, version: "NG141", url: "https://www.nice.org.uk/guidance/ng141/chapter/Recommendations", metadataCheckedAt: "2026-09-16" }),
    erythrasmaReview: source({ title: "Erythrasma: a systematic review of interventions", organization: "Clinical and Experimental Dermatology", type: "systematic review", year: 2025, url: "https://pubmed.ncbi.nlm.nih.gov/40635638/", doi: "10.1093/ced/llaf307", metadataCheckedAt: "2026-09-16" }),
    cdcRingworm: source({ title: "Clinical Overview of Ringworm", organization: "Centers for Disease Control and Prevention", type: "clinical reference", year: 2024, url: "https://www.cdc.gov/ringworm/hcp/clinical-overview/", metadataCheckedAt: "2026-09-16" }),
    tineaCapitisGuideline: source({ title: "Consensus-based Guideline on tinea capitis", organization: "German Dermatological Society guideline group", type: "guideline", year: 2026, version: "S1 guideline; version 4.0", url: "https://onlinelibrary.wiley.com/doi/full/10.1111/ddg.70395x", doi: "10.1111/ddg.70395x", metadataCheckedAt: "2026-09-16" }),
    onychomycosisGuideline: source({ title: "S1 Guideline onychomycosis", organization: "German Dermatological Society guideline group", type: "guideline", year: 2023, url: "https://pubmed.ncbi.nlm.nih.gov/37212291/", doi: "10.1111/ddg.14988", metadataCheckedAt: "2026-09-16" }),
    dermatomycosisGuideline: source({ title: "Guidelines for the management of dermatomycosis (2019)", organization: "Japanese Dermatological Association", type: "guideline", year: 2020, version: "2019 guideline", url: "https://pubmed.ncbi.nlm.nih.gov/32978814/", doi: "10.1111/1346-8138.15618", metadataCheckedAt: "2026-09-16" }),
    candidiasisReview: source({ title: "Cutaneous candidiasis - an evidence-based review of topical and systemic treatments to inform clinical practice", organization: "Journal of the European Academy of Dermatology and Venereology", type: "peer-reviewed review", year: 2019, url: "https://pubmed.ncbi.nlm.nih.gov/31287594/", doi: "10.1111/jdv.15782", metadataCheckedAt: "2026-09-16" }),
    scabiesGuideline: source({ title: "Clinical practice guidelines for the diagnosis and treatment of scabies", organization: "International Journal of Dermatology", type: "guideline", year: 2024, url: "https://pubmed.ncbi.nlm.nih.gov/38922701/", doi: "10.1111/ijd.17327", metadataCheckedAt: "2026-09-16" }),
    cdcScabiesTreatment: source({ title: "Treatment of Scabies", organization: "Centers for Disease Control and Prevention", type: "clinical reference", year: 2024, url: "https://www.cdc.gov/scabies/treatment/index.html", metadataCheckedAt: "2026-09-16" }),
    cdcHerpes: source({ title: "Herpes - STI Treatment Guidelines", organization: "Centers for Disease Control and Prevention", type: "guideline", year: 2021, version: "2021 STI Treatment Guidelines", url: "https://www.cdc.gov/std/treatment-guidelines/herpes.htm", metadataCheckedAt: "2026-09-16" }),
    cdcZoster: source({ title: "Clinical Overview of Shingles (Herpes Zoster)", organization: "Centers for Disease Control and Prevention", type: "clinical reference", year: 2024, url: "https://www.cdc.gov/shingles/hcp/clinical-overview/index.html", metadataCheckedAt: "2026-09-16" }),
    cdcMolluscum: source({ title: "Clinical Overview of Molluscum Contagiosum", organization: "Centers for Disease Control and Prevention", type: "clinical reference", year: 2025, url: "https://www.cdc.gov/molluscum-contagiosum/hcp/clinical-overview/index.html", metadataCheckedAt: "2026-09-16" }),
    cutaneousWartsGuideline: source({ title: "Clinical guideline for the diagnosis and treatment of cutaneous warts (2022)", organization: "Journal of Evidence-Based Medicine guideline group", type: "guideline", year: 2022, url: "https://pubmed.ncbi.nlm.nih.gov/36117295/", doi: "10.1111/jebm.12494", metadataCheckedAt: "2026-09-16" })
  };
  function dermNet(title, slug, metadataCheckedAt) {
    return source({ title, organization: "DermNet", type: "clinical reference", url: `https://dermnetnz.org/topics/${slug}`, metadataCheckedAt });
  }
  function icd10Who(code, label, note = null) {
    return Object.freeze({ system: "ICD-10 WHO", version: "2019", code, label, note });
  }
  function icdo(topography, morphologies) {
    return Object.freeze({
      system: "ICD-O", version: "3.2", topography: Object.freeze(topography), morphologies: Object.freeze(morphologies)
    });
  }
  function coding({ diagnoses = [], oncology = null, icdoApplicability = oncology ? "applicable" : "not established", verificationNote = null }) {
    const allowedApplicability = new Set(["applicable", "not applicable", "not established"]);
    if (!allowedApplicability.has(icdoApplicability)) throw new TypeError(`Unsupported ICD-O applicability: ${icdoApplicability}`);
    if (oncology && icdoApplicability !== "applicable") throw new TypeError("ICD-O data requires applicable status");
    return Object.freeze({ diagnoses: Object.freeze(diagnoses), icdo: oncology, icdoApplicability, verificationNote });
  }
  function skinTopography(note = "Assign the fourth character from the documented primary anatomic site.") {
    return { code: "C44._", label: "Skin", note };
  }
  function melanomaTopography() {
    return { code: "C44._", label: "Skin", note: "ICD-O records melanoma histology separately; assign topography from the documented primary skin site." };
  }
  function record(value) {
    return Object.freeze({ reviewStatus: reviewRequired, clinicalReview: null, ...value });
  }

  const diseases = [
    record({
      id: "actinic-keratosis", name: "Actinic Keratosis", alternative: "AK; solar keratosis", category: "premalignant", subcategory: "premalignant-keratinocytic",
      coding: coding({ diagnoses: [icd10Who("L57.0", "Actinic keratosis")], verificationNote: "Confirm national modification and site-specific documentation requirements before clinical or billing use." }),
      description: "A UV-induced keratinocytic lesion on chronically sun-exposed skin with potential to progress to cutaneous squamous cell carcinoma.",
      clinical: "Usually a rough, scaly or hyperkeratotic macule, papule or plaque on chronically sun-damaged skin; lesions may be easier to feel than see.",
      dermoscopy: "Facial lesions may show an erythematous pseudonetwork or strawberry pattern, prominent follicular openings and surface scale.",
      differential: "Squamous cell carcinoma in situ, invasive cutaneous squamous cell carcinoma, seborrhoeic keratosis, superficial basal cell carcinoma and inflammatory dermatoses.",
      treatment: "Management may be lesion-directed or field-directed. Selection depends on lesion burden, site, patient factors and current guidance; diagnostic uncertainty or concern for invasion warrants biopsy or specialist assessment.",
      followup: "Reassess persistent, recurrent, thickened, tender or rapidly changing lesions and account for the patient's overall actinic damage and skin-cancer risk.",
      references: [refs.aadAk, refs.whoIcd10, refs.whoSkin, dermNet("Actinic keratosis", "actinic-keratosis", "2026-09-15")]
    }),
    record({
      id: "actinic-cheilitis", name: "Actinic Cheilitis", alternative: "Solar cheilitis", category: "premalignant", subcategory: "premalignant-keratinocytic",
      coding: coding({ verificationNote: "No disease-specific ICD-10 WHO code was verified for this release; do not infer L56.8. Record site and diagnosis, then verify the applicable national coding system." }),
      description: "Chronic UV-related damage of the lip, usually the lower vermilion, with risk of progression to squamous cell carcinoma.",
      clinical: "Persistent dryness, scale, atrophy, erythema, fissuring, indistinct vermilion border or focal ulceration may occur.",
      dermoscopy: "Reported findings include scale, white structureless areas, erythema and vascular changes; dermoscopy does not replace biopsy when malignancy is suspected.",
      differential: "Inflammatory or contact cheilitis, squamous cell carcinoma in situ, invasive squamous cell carcinoma of the lip and other causes of persistent cheilitis.",
      treatment: "Management depends on extent and diagnostic concern and can include lesion- or field-directed approaches. Persistent ulceration, induration or nodularity requires prompt specialist assessment.",
      followup: "Ongoing sun protection and clinical review are appropriate; new focal change should trigger reassessment for squamous malignancy.",
      references: [refs.actinicCheilitis, refs.whoIcd10, dermNet("Actinic cheilitis", "actinic-cheilitis", "2026-09-15")]
    }),
    record({
      id: "porokeratosis", name: "Porokeratosis", alternative: "Disorder of keratinisation with a cornoid lamella", category: "premalignant", subcategory: "keratinization-disorder",
      coding: coding({ diagnoses: [icd10Who("Q82.8", "Other specified congenital malformations of skin", "A broad parent category rather than a porokeratosis-specific code; national classification may differ.")], verificationNote: "Subtype-specific coding and whether an acquired presentation belongs under this congenital-malformation category require local coding review." }),
      description: "A heterogeneous group of keratinisation disorders characterized by lesions with a ridge-like peripheral border. Reported malignant transformation risk is not uniform and varies across subtypes and individual lesions.",
      clinical: "Morphology and distribution vary by subtype, but lesions typically have a sharply defined keratotic ridge with a central furrow and relatively atrophic center.",
      dermoscopy: "A peripheral keratotic ridge or white track corresponding to the cornoid lamella may be visible; patterns vary by subtype.",
      differential: "Actinic keratosis, annular inflammatory dermatoses, superficial fungal infection, seborrhoeic keratosis and squamous cell carcinoma.",
      treatment: "No universally effective treatment exists. Management is individualized by subtype, symptoms and extent; suspicious change requires biopsy rather than empiric treatment.",
      followup: "Follow-up should be individualized by subtype, lesion burden and patient risk. Biopsy enlarging, tender, ulcerated or otherwise changing areas and reinforce sun protection where relevant.",
      references: [refs.porokeratosisReview, refs.whoIcd10, refs.whoSkin, dermNet("Porokeratosis", "porokeratosis", "2026-09-15")]
    }),
    record({
      id: "basal-cell-carcinoma", name: "Basal Cell Carcinoma", alternative: "BCC", category: "keratinocytic", subcategory: "keratinocytic-carcinoma",
      coding: coding({ diagnoses: [icd10Who("C44", "Other malignant neoplasms of skin", "Assign the fourth character from the documented anatomic site.")], oncology: icdo(skinTopography(), [{ code: "8090/3", label: "Basal cell carcinoma, NOS", note: "Use the morphology that matches the final pathology." }]) }),
      description: "A common keratinocyte carcinoma characterized by locally invasive growth and very low metastatic potential.",
      clinical: "Presentation varies by subtype and may include a pearly or translucent papule, telangiectasia, ulceration, crusting, or a slowly enlarging plaque.",
      dermoscopy: "Possible findings include arborising vessels, blue-grey ovoid nests, leaf-like structures, spoke-wheel areas and ulceration.",
      differential: "Cutaneous squamous cell carcinoma, actinic keratosis, melanocytic lesions, sebaceous hyperplasia and other benign or malignant tumors.",
      treatment: "Risk stratification incorporates site, size, borders, histologic subtype and recurrence status. Surgery is the mainstay; selected low-risk tumors or patients unable to undergo surgery may be considered for other modalities under current guidance.",
      followup: "Follow-up is risk-adapted and includes surveillance for recurrence and additional primary skin cancers.",
      references: [refs.aadBcc, refs.whoIcd10, refs.icdo32, refs.whoSkin]
    }),
    record({
      id: "cutaneous-squamous-cell-carcinoma", name: "Cutaneous Squamous Cell Carcinoma", alternative: "cSCC", category: "keratinocytic", subcategory: "keratinocytic-carcinoma",
      coding: coding({ diagnoses: [icd10Who("C44", "Other malignant neoplasms of skin", "Assign the fourth character from the documented anatomic site.")], oncology: icdo(skinTopography(), [{ code: "8070/3", label: "Squamous cell carcinoma, NOS", note: "Use the morphology that matches the final pathology." }]) }),
      description: "A malignant keratinocytic neoplasm with variable risks of local recurrence, nodal involvement and metastasis.",
      clinical: "May present as a persistent hyperkeratotic papule, plaque or nodule, sometimes with crusting, ulceration, tenderness or rapid growth.",
      dermoscopy: "Findings may include keratin, white circles or structureless areas, scale, ulceration and variable vascular patterns.",
      differential: "Actinic keratosis, squamous cell carcinoma in situ, keratoacanthoma, verruca, basal cell carcinoma and benign keratotic lesions.",
      treatment: "Management is based on clinical and histopathologic risk assessment. Surgery is commonly used for localized disease; high-risk, regional or advanced disease requires guideline-based multidisciplinary care.",
      followup: "Surveillance should be risk-adapted and assess the primary site, regional nodes when indicated and the development of additional skin cancers.",
      references: [refs.aadScc, refs.whoIcd10, refs.icdo32, refs.whoSkin]
    }),
    record({
      id: "squamous-cell-carcinoma-in-situ", name: "Squamous Cell Carcinoma in Situ", alternative: "Bowen disease", category: "keratinocytic", subcategory: "keratinocytic-carcinoma",
      coding: coding({ diagnoses: [icd10Who("D04", "Carcinoma in situ of skin", "Assign the fourth character from the documented anatomic site.")], oncology: icdo(skinTopography(), [{ code: "8081/2", label: "Bowen disease", note: "In situ behavior is encoded separately from invasive squamous cell carcinoma." }]) }),
      description: "An intraepidermal squamous cell carcinoma confined to the epidermis.",
      clinical: "Typically a persistent, well-demarcated erythematous scaly patch or plaque; pigmented variants can occur.",
      dermoscopy: "Possible findings include grouped glomerular or coiled vessels and scale; pigmented lesions may show brown or grey dots and globules.",
      differential: "Actinic keratosis, superficial basal cell carcinoma, psoriasis, eczema, melanoma and invasive cutaneous squamous cell carcinoma.",
      treatment: "Choice among surgical and selected nonsurgical approaches depends on lesion site, size, patient factors and diagnostic certainty. Suspected invasion requires histologic assessment.",
      followup: "Review for persistence or recurrence and account for ongoing actinic damage and risk of additional keratinocyte cancers.",
      references: [refs.aadScc, refs.whoIcd10, refs.icdo32, refs.whoSkin, dermNet("Intraepidermal squamous cell carcinoma", "intraepidermal-squamous-cell-carcinoma", "2026-09-15")]
    }),
    record({
      id: "keratoacanthoma", name: "Keratoacanthoma", alternative: "KA; keratoacanthoma-type squamous proliferation", category: "keratinocytic", subcategory: "keratinocytic-tumor-uncertain",
      coding: coding({ verificationNote: "Keratoacanthoma classification remains debated and no single disease-specific ICD-10 WHO or ICD-O code was verified for this release; do not infer L85.8." }),
      description: "A rapidly growing crateriform keratinocytic tumor whose relationship to well-differentiated cutaneous squamous cell carcinoma remains debated; clinical and histologic overlap is substantial.",
      clinical: "Usually a rapidly developing dome-shaped nodule with a central keratin-filled crater, often on sun-exposed skin.",
      dermoscopy: "A central keratin mass, white circles and variable hairpin or other vascular patterns may be seen, but findings do not reliably exclude squamous cell carcinoma.",
      differential: "Well-differentiated cutaneous squamous cell carcinoma, verruca, nodular basal cell carcinoma and amelanotic melanoma.",
      treatment: "Specialist assessment and histopathologic evaluation are generally required because reliable distinction from cutaneous squamous cell carcinoma can be difficult.",
      followup: "Follow-up depends on the final pathology, treatment and the patient's wider keratinocyte-cancer risk.",
      references: [refs.keratoacanthoma, refs.whoSkin, dermNet("Keratoacanthoma", "keratoacanthoma", "2026-09-15")]
    }),
    record({
      id: "cutaneous-melanoma", name: "Cutaneous Melanoma", alternative: "Malignant melanoma of skin", category: "melanocytic", subcategory: "melanoma",
      coding: coding({ diagnoses: [icd10Who("C43", "Malignant melanoma of skin", "Assign the fourth character from the documented anatomic site.")], oncology: icdo(melanomaTopography(), [{ code: "8720/3", label: "Malignant melanoma, NOS", note: "Use only when a more specific pathologic subtype is not assigned." }]) }),
      description: "A malignant melanocytic neoplasm with metastatic potential; prognosis is strongly related to stage at diagnosis.",
      clinical: "Suspicious features may include asymmetry, border irregularity, color variation, evolution over time or a lesion unlike the patient's other nevi; some melanomas are amelanotic.",
      dermoscopy: "Patterns vary by subtype and may include asymmetry of structures and colors, atypical network, irregular dots or globules, atypical streaks, regression structures and atypical vessels.",
      differential: "Melanocytic nevus, seborrhoeic keratosis, pigmented basal cell carcinoma and other pigmented or amelanotic lesions.",
      treatment: "Excision and histopathologic staging underpin management of localized primary melanoma. Further surgery, nodal assessment and systemic therapy decisions depend on stage and current specialist guidance.",
      followup: "Surveillance intensity is stage- and risk-dependent and should follow current national or international melanoma guidance.",
      references: [refs.eadoMelanomaDiagnostics, refs.eadoMelanomaTreatment, refs.nciMelanoma, refs.whoIcd10, refs.icdo32, refs.whoSkin]
    }),
    record({
      id: "lentigo-maligna", name: "Lentigo Maligna", alternative: "Melanoma in situ on chronically sun-damaged skin; LM", category: "melanocytic", subcategory: "melanoma-in-situ",
      coding: coding({ diagnoses: [icd10Who("D03", "Melanoma in situ", "Assign the fourth character from the documented anatomic site.")], oncology: icdo(melanomaTopography(), [{ code: "8742/2", label: "Lentigo maligna", note: "In situ behavior; do not use for invasive lentigo maligna melanoma." }]) }),
      description: "A melanoma in situ arising on chronically sun-damaged skin, most often on the head and neck.",
      clinical: "Typically a slowly enlarging, irregularly pigmented macule or patch with variation in color and border.",
      dermoscopy: "Possible findings include asymmetric pigmented follicular openings, an annular-granular pattern, grey dots or globules and rhomboidal structures.",
      differential: "Solar lentigo, seborrhoeic keratosis, pigmented actinic keratosis, lichenoid keratosis and other melanocytic lesions.",
      treatment: "Complete treatment with histologic assessment is preferred when feasible; the approach depends on lesion size, location, patient factors and current melanoma guidance.",
      followup: "Surveillance should address local recurrence and additional melanocytic and keratinocytic tumors.",
      references: [refs.eadoMelanomaDiagnostics, refs.eadoMelanomaTreatment, refs.whoIcd10, refs.icdo32, refs.whoSkin, dermNet("Lentigo maligna and lentigo maligna melanoma", "lentigo-maligna-and-lentigo-maligna-melanoma", "2026-09-15")]
    }),
    record({
      id: "lentigo-maligna-melanoma", name: "Lentigo Maligna Melanoma", alternative: "Invasive melanoma arising in lentigo maligna; LMM", category: "melanocytic", subcategory: "melanoma-subtype",
      coding: coding({ diagnoses: [icd10Who("C43", "Malignant melanoma of skin", "Assign the fourth character from the documented anatomic site.")], oncology: icdo(melanomaTopography(), [{ code: "8742/3", label: "Lentigo maligna melanoma", note: "Invasive behavior; distinct from lentigo maligna (8742/2)." }]) }),
      description: "An invasive melanoma arising in association with lentigo maligna, usually on chronically sun-damaged head and neck skin.",
      clinical: "An enlarging irregularly pigmented patch may develop thickening, nodularity, ulceration or new color variation suggesting invasion.",
      dermoscopy: "Findings overlap with lentigo maligna; increased colors, structureless areas and other changes may raise concern but cannot determine invasion reliably.",
      differential: "Lentigo maligna, solar lentigo, pigmented actinic keratosis, seborrhoeic keratosis and other melanoma subtypes.",
      treatment: "Complete excision and histopathologic staging are required; subsequent management follows stage-appropriate melanoma guidance.",
      followup: "Follow-up is individualized by stage, treatment and recurrence risk.",
      references: [refs.eadoMelanomaDiagnostics, refs.eadoMelanomaTreatment, refs.whoIcd10, refs.icdo32, refs.whoSkin, dermNet("Lentigo maligna and lentigo maligna melanoma", "lentigo-maligna-and-lentigo-maligna-melanoma", "2026-09-15")]
    }),
    record({
      id: "acral-melanoma", name: "Acral Melanoma", alternative: "Acral lentiginous melanoma; ALM", category: "melanocytic", subcategory: "melanoma-subtype",
      coding: coding({ diagnoses: [icd10Who("C43", "Malignant melanoma of skin", "Assign the fourth character from the documented anatomic site.")], oncology: icdo(melanomaTopography(), [{ code: "8744/3", label: "Acral lentiginous melanoma", note: "Pathologic subtype; topography must still reflect the documented primary site." }]) }),
      description: "A melanoma arising on acral skin, including palms, soles or the nail unit, and not defined by cumulative sun damage.",
      clinical: "May present as a new or changing irregularly pigmented macule or patch on a palm or sole, or as longitudinal nail pigmentation with concerning change; some lesions are hypomelanotic.",
      dermoscopy: "On volar skin, a parallel-ridge pattern, irregular diffuse pigmentation or multicomponent pattern can be concerning. Nail findings require site-specific assessment.",
      differential: "Acral nevus, subcorneal hemorrhage, wart, callus, tinea nigra and benign or traumatic nail pigmentation.",
      treatment: "Suspicious lesions require biopsy planned to permit accurate diagnosis and staging. Confirmed disease is managed according to melanoma stage and site-specific surgical considerations.",
      followup: "Stage-based melanoma surveillance and examination of the remaining skin and relevant nodal basins are considered according to current guidance.",
      references: [refs.eadoMelanomaDiagnostics, refs.eadoMelanomaTreatment, refs.whoIcd10, refs.icdo32, refs.whoSkin, dermNet("Acral lentiginous melanoma", "acral-lentiginous-melanoma", "2026-09-15")]
    }),
    record({
      id: "nodular-melanoma", name: "Nodular Melanoma", alternative: "NM", category: "melanocytic", subcategory: "melanoma-subtype",
      coding: coding({ diagnoses: [icd10Who("C43", "Malignant melanoma of skin", "Assign the fourth character from the documented anatomic site.")], oncology: icdo(melanomaTopography(), [{ code: "8721/3", label: "Nodular melanoma", note: "Pathologic subtype; topography must be assigned independently." }]) }),
      description: "An invasive melanoma growth pattern characterized clinically by a predominantly raised lesion and potentially rapid vertical growth.",
      clinical: "Often a new, enlarging firm papule or nodule that may be darkly pigmented, pink or red and can ulcerate or bleed.",
      dermoscopy: "May show asymmetric pigmentation, blue-black or structureless areas, atypical vessels, ulceration or a multicomponent pattern; amelanotic lesions can be difficult to recognize.",
      differential: "Pigmented basal cell carcinoma, angioma, pyogenic granuloma, dermatofibroma, blue nevus and other melanoma subtypes.",
      treatment: "Prompt biopsy and histopathologic staging are essential. Confirmed disease is treated using stage-appropriate melanoma guidance.",
      followup: "Surveillance is individualized by stage, treatment and recurrence risk.",
      references: [refs.eadoMelanomaDiagnostics, refs.eadoMelanomaTreatment, refs.whoIcd10, refs.icdo32, refs.whoSkin, dermNet("Nodular melanoma", "nodular-melanoma", "2026-09-15")]
    }),
    record({
      id: "desmoplastic-melanoma", name: "Desmoplastic Melanoma", alternative: "Pure or mixed desmoplastic melanoma; neurotropism may occur", category: "melanocytic", subcategory: "melanoma-subtype",
      coding: coding({ diagnoses: [icd10Who("C43", "Malignant melanoma of skin", "Assign the fourth character from the documented anatomic site.")], oncology: icdo(melanomaTopography(), [{ code: "8745/3", label: "Desmoplastic melanoma", note: "Pathology should document pure versus mixed morphology and neurotropism when assessed." }]) }),
      description: "A rare invasive melanoma variant with spindle-cell proliferation and desmoplasia, often arising on chronically sun-damaged head and neck skin. Pure and mixed forms have clinically relevant pathologic distinctions, and neurotropism may be present.",
      clinical: "May be a firm, slowly enlarging skin-colored or pink papule, plaque or nodule with a scar-like appearance; pigmentation can be absent.",
      dermoscopy: "No single diagnostic pattern is established; melanoma-associated structures or atypical vessels may be present, while amelanotic lesions can appear nonspecific.",
      differential: "Scar, dermatofibroma, spindle-cell squamous cell carcinoma, atypical fibroxanthoma and other amelanotic tumors.",
      treatment: "Diagnosis requires histopathology, often with specialist dermatopathology input. Treatment and staging follow current melanoma guidance; pure versus mixed morphology, margins and neurotropism can affect multidisciplinary risk assessment.",
      followup: "Stage- and risk-based surveillance should include careful assessment of the primary site and neurologic symptoms where relevant.",
      references: [refs.eadoMelanomaDiagnostics, refs.eadoMelanomaTreatment, refs.whoIcd10, refs.icdo32, refs.whoSkin, dermNet("Desmoplastic melanoma", "desmoplastic-melanoma", "2026-09-15")]
    }),
    record({
      id: "merkel-cell-carcinoma", name: "Merkel Cell Carcinoma", alternative: "MCC; primary cutaneous neuroendocrine carcinoma", category: "other", subcategory: "neuroendocrine-carcinoma",
      coding: coding({ diagnoses: [icd10Who("C44", "Other malignant neoplasms of skin", "ICD-10 WHO 2019 uses site-based skin coding; assign the fourth character from the documented site.")], oncology: icdo(skinTopography(), [{ code: "8247/3", label: "Merkel cell carcinoma", note: "Morphology is recorded separately from skin topography." }]), verificationNote: "C4A is an ICD-10-CM category and is intentionally not presented as ICD-10 WHO." }),
      description: "A rare aggressive neuroendocrine skin carcinoma with substantial risks of regional and distant spread.",
      clinical: "Often a rapidly growing, painless red, violaceous or skin-colored firm papule or nodule, commonly on sun-exposed skin.",
      dermoscopy: "No single diagnostic pattern is established; reported findings are nonspecific and histopathology is required.",
      differential: "Basal cell carcinoma, cutaneous squamous cell carcinoma, amelanotic melanoma, lymphoma and benign nodules or cysts.",
      treatment: "Management requires prompt specialist staging and multidisciplinary planning; surgery, radiation and systemic immunotherapy may have roles depending on stage and patient factors.",
      followup: "Close, risk-adapted surveillance is required because recurrence and metastasis can occur.",
      references: [refs.esmoMcc, refs.nciMcc, refs.whoIcd10, refs.icdo32, refs.whoSkin]
    }),
    record({
      id: "sebaceous-carcinoma", name: "Sebaceous Carcinoma", alternative: "Sebaceous gland carcinoma", category: "other", subcategory: "adnexal-carcinoma",
      coding: coding({ oncology: icdo(skinTopography("Use the documented primary site; periocular and extraocular primaries require precise site documentation."), [{ code: "8410/3", label: "Sebaceous carcinoma", note: "Verify morphology against the final pathology." }]), verificationNote: "No single disease-specific ICD-10 WHO diagnosis code is asserted; apply the relevant site-based code only after coding review." }),
      description: "A rare adnexal carcinoma that may arise in periocular or extraocular skin. The site distinction matters for assessment and management.",
      clinical: "May present as a firm eyelid nodule, persistent chalazion-like lesion or an extraocular cutaneous nodule or plaque.",
      dermoscopy: "Dermoscopy is not diagnostic; reported patterns are nonspecific and tissue diagnosis is required.",
      differential: "Chalazion, basal cell carcinoma, cutaneous squamous cell carcinoma and other eyelid or adnexal tumors.",
      treatment: "Complete excision with histopathologic margin assessment and specialist management is generally required; staging considerations depend on tumor features and site. Assessment for Muir–Torre/Lynch syndrome should be risk-based rather than automatic and may require genetics input.",
      followup: "Surveillance is individualized because local recurrence and regional or distant spread can occur; periocular and extraocular disease may follow different clinical pathways.",
      references: [refs.sebaceous, refs.icdo32, refs.whoSkin, dermNet("Sebaceous carcinoma", "sebaceous-carcinoma", "2026-09-15")]
    }),
    record({
      id: "dermatofibrosarcoma-protuberans", name: "Dermatofibrosarcoma Protuberans", alternative: "DFSP", category: "other", subcategory: "cutaneous-sarcoma",
      coding: coding({ oncology: icdo(skinTopography(), [{ code: "8832/1", label: "Dermatofibrosarcoma protuberans, NOS", note: "ICD-O-3.2 assigns borderline behavior to DFSP, NOS." }, { code: "8832/3", label: "Fibrosarcomatous dermatofibrosarcoma protuberans", note: "Malignant behavior applies to the fibrosarcomatous variant." }]), verificationNote: "Do not collapse DFSP, NOS and fibrosarcomatous DFSP into one behavior code; confirm against final pathology and registry rules." }),
      description: "A slow-growing dermal sarcoma with infiltrative local behavior, a high propensity for local recurrence if incompletely removed and usually low metastatic risk.",
      clinical: "Typically a slowly enlarging firm plaque that may develop protuberant nodules, commonly on the trunk or proximal limbs.",
      dermoscopy: "Findings are nonspecific and cannot establish the diagnosis.",
      differential: "Dermatofibroma, scar, keloid, morphea, cyst and other soft-tissue tumors.",
      treatment: "Complete excision with margin control is central; complex, recurrent or advanced disease requires specialist multidisciplinary input.",
      followup: "Long-term clinical follow-up of the treated site is appropriate because local recurrence can occur.",
      references: [refs.dfsp, refs.icdo32, refs.whoSkin, dermNet("Dermatofibrosarcoma protuberans", "dermatofibrosarcoma-protuberans", "2026-09-15")]
    }),
    record({
      id: "atypical-fibroxanthoma", name: "Atypical Fibroxanthoma", alternative: "AFX", category: "other", subcategory: "fibrohistiocytic-tumor",
      coding: coding({ oncology: icdo(skinTopography(), [{ code: "8830/1", label: "Atypical fibroxanthoma", note: "Borderline behavior in ICD-O; distinction from PDS requires adequate sampling." }]), verificationNote: "No single disease-specific ICD-10 WHO diagnosis code is asserted." }),
      description: "A superficial pleomorphic spindle-cell tumor usually arising on chronically sun-damaged head and neck skin of older adults. Adequate sampling is needed to exclude features that support pleomorphic dermal sarcoma.",
      clinical: "Often a rapidly growing red or flesh-colored dome-shaped papule or nodule that may ulcerate or bleed.",
      dermoscopy: "Reported findings are nonspecific and may overlap with basal cell or squamous cell carcinoma.",
      differential: "Cutaneous squamous cell carcinoma, amelanotic melanoma, pleomorphic dermal sarcoma and pyogenic granuloma.",
      treatment: "Complete excision and expert histopathologic evaluation are required; diagnosis is one of exclusion from lineage-specific mimics and from deeper or higher-risk pleomorphic dermal sarcoma.",
      followup: "Surveillance depends on pathologic features, margin status and clinical context.",
      references: [refs.afxPds, refs.icdo32, refs.whoSkin, dermNet("Atypical fibroxanthoma", "atypical-fibroxanthoma", "2026-09-15")]
    }),
    record({
      id: "pleomorphic-dermal-sarcoma", name: "Pleomorphic Dermal Sarcoma", alternative: "PDS", category: "other", subcategory: "cutaneous-sarcoma",
      coding: coding({ oncology: icdo(skinTopography(), [{ code: "8802/3", label: "Pleomorphic dermal sarcoma", note: "Guideline-reported morphology; confirm registry implementation and final pathology." }]), verificationNote: "No single disease-specific ICD-10 WHO diagnosis code is asserted." }),
      description: "A rare malignant dermal spindle-cell tumor related to atypical fibroxanthoma but distinguished by adverse features such as subcutaneous invasion, tumor necrosis or lymphovascular/perineural invasion.",
      clinical: "Usually a growing nonpigmented nodule or plaque on chronically sun-damaged head and neck skin, sometimes with ulceration.",
      dermoscopy: "Dermoscopy is nonspecific and cannot distinguish this tumor from its clinical mimics.",
      differential: "Atypical fibroxanthoma, cutaneous squamous cell carcinoma, basal cell carcinoma, amelanotic melanoma and Merkel cell carcinoma.",
      treatment: "Complete excision, specialist dermatopathology review and multidisciplinary assessment are generally required.",
      followup: "Clinical and, when indicated, imaging surveillance is individualized because local recurrence and metastasis can occur.",
      references: [refs.afxPds, refs.icdo32, refs.whoSkin, dermNet("Pleomorphic dermal sarcoma", "pleomorphic-dermal-sarcoma", "2026-09-15")]
    }),
    record({
      id: "cutaneous-angiosarcoma", name: "Cutaneous Angiosarcoma", alternative: "Angiosarcoma of skin", category: "other", subcategory: "vascular-neoplasm",
      coding: coding({ oncology: icdo(skinTopography("Use C44._ only for a documented primary cutaneous tumor; record radiation-associated or lymphoedema-associated context separately."), [{ code: "9120/3", label: "Hemangiosarcoma", note: "ICD-O morphology terminology; confirm the final pathologic classification." }]), verificationNote: "Do not infer the ICD-10 WHO soft-tissue category C49 from the tumor name alone; diagnosis coding is site- and system-dependent." }),
      description: "A rare aggressive malignant vascular tumor that may arise spontaneously, after radiation or with chronic lymphoedema.",
      clinical: "May appear as an enlarging bruise-like or violaceous patch, plaque or nodule; spontaneous tumors often involve the scalp or face of older adults.",
      dermoscopy: "No diagnostic dermoscopic pattern is established.",
      differential: "Bruising, cellulitis, rosacea, Kaposi sarcoma and benign or malignant vascular lesions.",
      treatment: "Urgent biopsy, staging and multidisciplinary sarcoma or oncology management are required.",
      followup: "Close surveillance is needed because local recurrence and metastatic spread are possible.",
      references: [refs.angiosarcoma, refs.icdo32, refs.whoSkin, dermNet("Angiosarcoma", "angiosarcoma", "2026-09-15")]
    }),
    record({
      id: "kaposi-sarcoma", name: "Kaposi Sarcoma", alternative: "KS", category: "other", subcategory: "vascular-neoplasm",
      coding: coding({ diagnoses: [icd10Who("C46", "Kaposi sarcoma", "Assign the fourth character from the documented site or distribution.")], oncology: icdo({ code: null, label: "Documented primary anatomic site", note: "Kaposi sarcoma may involve skin and extracutaneous sites; do not assume C44._ without documentation." }, [{ code: "9140/3", label: "Kaposi sarcoma", note: "Morphology is independent of anatomic site." }]) }),
      description: "A human herpesvirus 8–associated vascular neoplasm with several epidemiologic forms and variable relationship to immune status.",
      clinical: "May present as violaceous, red-brown or dark macules, plaques or nodules; distribution and systemic involvement vary by subtype.",
      dermoscopy: "A multicolored or rainbow appearance has been described but is not specific and does not replace biopsy.",
      differential: "Purpura, angioma, bacillary angiomatosis and other vascular or spindle-cell tumors.",
      treatment: "Management depends on subtype, extent, symptoms and immune status and may include optimization of the underlying condition, local therapy or systemic treatment.",
      followup: "Follow-up is individualized according to disease extent, treatment and underlying clinical context.",
      references: [refs.nciKaposi, refs.whoIcd10, refs.icdo32, refs.whoSkin, dermNet("Kaposi sarcoma", "kaposi-sarcoma", "2026-09-15")]
    }),
    record({
      id: "extramammary-paget-disease", name: "Extramammary Paget Disease", alternative: "EMPD; primary or secondary EMPD", category: "other", subcategory: "paget-disease",
      coding: coding({ oncology: icdo({ code: null, label: "Documented primary anatomic site", note: "Primary cutaneous and secondary epidermotropic disease must be distinguished before assigning topography." }, [{ code: "8542/3", label: "Paget disease, extramammary", note: "Confirm primary versus secondary disease and final pathology." }]), verificationNote: "No single disease-specific ICD-10 WHO diagnosis code is asserted; site and primary-versus-secondary status affect coding." }),
      description: "A rare intraepidermal adenocarcinoma usually affecting apocrine-rich anogenital or axillary skin. Primary cutaneous EMPD must be distinguished from secondary epidermotropic involvement by an underlying or adjacent malignancy.",
      clinical: "Often a persistent pruritic, erythematous, scaly or eczematous plaque in the genital or perianal region.",
      dermoscopy: "Reported features are supportive but nonspecific; biopsy is required for diagnosis.",
      differential: "Eczema, psoriasis, fungal infection, squamous cell carcinoma in situ and melanoma.",
      treatment: "Biopsy confirmation and specialist assessment are required. Treatment planning must consider disease extent, margins and primary versus secondary disease. Evaluation for associated internal malignancy should be individualized to anatomic site, age, sex, symptoms and pathology rather than applied as one universal panel.",
      followup: "Long-term surveillance is appropriate because local recurrence can occur; follow-up and any internal-malignancy assessment should reflect site, disease classification and patient-specific findings.",
      references: [refs.empd, refs.icdo32, refs.whoSkin, dermNet("Extramammary Paget disease", "extramammary-paget-disease", "2026-09-15")]
    }),
    record({
      id: "microcystic-adnexal-carcinoma", name: "Microcystic Adnexal Carcinoma", alternative: "MAC; sclerosing sweat duct carcinoma", category: "other", subcategory: "adnexal-carcinoma",
      coding: coding({ oncology: icdo(skinTopography(), [{ code: "8407/3", label: "Sclerosing sweat duct carcinoma", note: "ICD-O synonym used for microcystic adnexal carcinoma; confirm final pathology." }]), verificationNote: "No single disease-specific ICD-10 WHO diagnosis code is asserted." }),
      description: "A rare, deeply infiltrative adnexal carcinoma that is usually locally aggressive and commonly arises on the central face.",
      clinical: "Often a slowly enlarging firm, indurated skin-colored plaque or nodule; symptoms can occur with perineural involvement.",
      dermoscopy: "No diagnostic dermoscopic pattern is established.",
      differential: "Morpheaform basal cell carcinoma, scar, desmoplastic trichoepithelioma and other adnexal tumors.",
      treatment: "Complete margin-controlled excision and specialist pathology review are generally required; extent and perineural disease influence planning.",
      followup: "Long-term surveillance is appropriate because delayed local recurrence can occur.",
      references: [refs.mac, refs.icdo32, refs.whoSkin, dermNet("Microcystic adnexal carcinoma", "microcystic-adnexal-carcinoma", "2026-09-15")]
    }),
    record({
      id: "eccrine-porocarcinoma", name: "Eccrine Porocarcinoma", alternative: "Porocarcinoma; malignant eccrine poroma", category: "other", subcategory: "adnexal-carcinoma",
      coding: coding({ oncology: icdo(skinTopography(), [{ code: "8409/3", label: "Eccrine porocarcinoma", note: "Malignant morphology; verify final pathology." }]), verificationNote: "No disease-specific ICD-10 WHO code was verified; D44.90 is intentionally not used because it is not a supported international mapping here." }),
      description: "A rare malignant adnexal tumor showing sweat-duct differentiation.",
      clinical: "Typically a slowly growing papule, plaque or nodule that may ulcerate or bleed; it can arise within a longstanding poroma or de novo.",
      dermoscopy: "Reported vascular and structureless patterns are nonspecific; histopathology establishes the diagnosis.",
      differential: "Poroma, seborrhoeic keratosis, pyogenic granuloma, verruca and cutaneous squamous cell carcinoma.",
      treatment: "Complete surgical removal and histopathologic assessment are central; high-risk or advanced disease requires multidisciplinary evaluation.",
      followup: "Surveillance should be individualized for local recurrence and regional or distant spread.",
      references: [refs.porocarcinoma, refs.icdo32, refs.whoSkin, dermNet("Eccrine porocarcinoma", "eccrine-porocarcinoma", "2026-09-15")]
    }),
    record({
      id: "mycosis-fungoides", name: "Mycosis Fungoides", alternative: "MF; cutaneous T-cell lymphoma", category: "other", subcategory: "cutaneous-lymphoma",
      coding: coding({ diagnoses: [icd10Who("C84.0", "Mycosis fungoides", "National modifications may add site or stage detail.")], oncology: icdo({ code: "C44._", label: "Skin", note: "For a primary cutaneous presentation, assign the documented skin site according to registry rules." }, [{ code: "9700/3", label: "Mycosis fungoides", note: "Morphology is separate from clinical stage." }]) }),
      description: "The most common primary cutaneous T-cell lymphoma, usually characterized by a chronic evolution from patches to plaques and, in some patients, tumors.",
      clinical: "Persistent variably scaly patches or plaques often occur on sun-protected sites and may mimic inflammatory dermatoses; morphology and extent change with stage.",
      dermoscopy: "Dermoscopy may show fine short linear vessels, orange-yellow areas or scale, but findings are not diagnostic.",
      differential: "Eczema, psoriasis, parapsoriasis, drug eruption and other cutaneous lymphomas.",
      treatment: "Diagnosis requires clinicopathologic correlation and may require repeated biopsies. Therapy is stage-adapted and can include skin-directed or systemic approaches under specialist guidance.",
      followup: "Long-term specialist follow-up is required, with assessment of skin burden, nodes, symptoms and extracutaneous disease as indicated by stage.",
      references: [refs.eortcMfSs, refs.whoHaem5, refs.nciCtcl, refs.whoIcd10, refs.icdo32, dermNet("Mycosis fungoides", "mycosis-fungoides", "2026-09-15")]
    }),
    record({
      id: "sezary-syndrome", name: "Sézary Syndrome", alternative: "SS; leukemic cutaneous T-cell lymphoma", category: "other", subcategory: "cutaneous-lymphoma",
      coding: coding({ diagnoses: [icd10Who("C84.1", "Sézary disease")], oncology: icdo({ code: null, label: "Documented site(s)", note: "This leukemic cutaneous lymphoma is not represented by skin topography alone; follow registry rules." }, [{ code: "9701/3", label: "Sézary disease", note: "Record morphology separately from sites of involvement." }]) }),
      description: "An aggressive leukemic form of cutaneous T-cell lymphoma characterized by erythroderma, blood involvement and clonal malignant T cells.",
      clinical: "Generalized erythroderma with intense pruritus is typical; lymphadenopathy, palmoplantar keratoderma and other systemic features may occur.",
      dermoscopy: "Dermoscopy is not diagnostic and should not delay systemic and hematologic evaluation.",
      differential: "Atopic dermatitis, psoriasis, drug-related erythroderma, pityriasis rubra pilaris and erythrodermic mycosis fungoides.",
      treatment: "Diagnosis and staging require specialist clinicopathologic, blood and systemic assessment. Treatment is individualized and primarily systemic, sometimes combined with skin-directed therapy.",
      followup: "Close multidisciplinary follow-up is required to assess skin, blood, nodes, treatment toxicity and disease progression.",
      references: [refs.eortcMfSs, refs.whoHaem5, refs.nciCtcl, refs.whoIcd10, refs.icdo32, dermNet("Sézary syndrome", "sezary-syndrome", "2026-09-15")]
    }),
    record({
      id: "primary-cutaneous-anaplastic-large-cell-lymphoma", name: "Primary Cutaneous Anaplastic Large-Cell Lymphoma", alternative: "pcALCL; primary cutaneous CD30-positive lymphoproliferative disorder", category: "other", subcategory: "cutaneous-lymphoma",
      coding: coding({ oncology: icdo({ code: "C44._", label: "Skin", note: "Use the documented primary skin site; systemic ALCL with secondary skin involvement is a different entity." }, [{ code: "9718/3", label: "Primary cutaneous CD30-positive T-cell lymphoproliferative disorder", note: "Confirm entity-level registry terminology and exclude systemic disease." }]), verificationNote: "No disease-specific ICD-10 WHO diagnosis code is asserted; C86.6 belongs to some national modifications and must not be presented as universal." }),
      description: "A primary cutaneous CD30-positive T-cell lymphoproliferative disorder that usually has an indolent clinical course but requires exclusion of systemic lymphoma.",
      clinical: "Typically one or several rapidly developing red to violaceous papules, nodules or tumors that may ulcerate.",
      dermoscopy: "Reported vascular and structureless findings are nonspecific; diagnosis requires histopathology and immunophenotyping.",
      differential: "Lymphomatoid papulosis, systemic anaplastic large-cell lymphoma with skin involvement, cutaneous squamous cell carcinoma and infections.",
      treatment: "Management depends on number, distribution and extracutaneous assessment; localized and multifocal disease require different specialist approaches.",
      followup: "Long-term follow-up is appropriate to identify cutaneous recurrence or extracutaneous disease.",
      references: [refs.cd30Consensus, refs.pcAlclReview, refs.whoHaem5, refs.icdo32, dermNet("Primary cutaneous anaplastic large-cell lymphoma", "primary-cutaneous-anaplastic-large-cell-lymphoma", "2026-09-15")]
    }),
    record({
      id: "atopic-dermatitis", name: "Atopic Dermatitis", alternative: "Atopic eczema; eczema", category: "inflammatory-eczematous", subcategory: "eczematous-dermatitis",
      coding: coding({ diagnoses: [icd10Who("L20", "Atopic dermatitis")], icdoApplicability: "not applicable", verificationNote: "ICD-10 WHO provides more specific fourth-character categories; select one only when the documented phenotype supports it and keep national modifications separate." }),
      description: "A chronic, relapsing, pruritic inflammatory skin disease with epidermal barrier dysfunction and age-dependent patterns of involvement.",
      clinical: "Pruritus and xerosis are prominent. Erythematous or skin-colored eczematous lesions may become excoriated, lichenified or secondarily infected; distribution and appearance vary with age and skin tone.",
      dermoscopy: "Dermoscopy is not routinely required for diagnosis; any vascular or scaling findings are nonspecific and must be interpreted with the clinical pattern.",
      differential: "Allergic or irritant contact dermatitis, seborrheic dermatitis, psoriasis, scabies, cutaneous infection and, in persistent atypical adult disease, cutaneous T-cell lymphoma.",
      treatment: "Management combines regular moisturization, avoidance of confirmed aggravating exposures and appropriately selected topical anti-inflammatory therapy. Phototherapy or systemic treatment may be considered for inadequately controlled moderate-to-severe disease after age, comorbidities, contraindications and monitoring needs are assessed.",
      followup: "Reassess disease control, sleep and quality-of-life impact, treatment burden, adherence and signs of infection. Persistent, severe or diagnostically atypical disease warrants specialist review.",
      references: [refs.aadAtopicTopical, refs.aadAtopicSystemic, refs.whoIcd10, dermNet("Atopic dermatitis", "atopic-dermatitis", "2026-09-16")]
    }),
    record({
      id: "contact-dermatitis", name: "Contact Dermatitis", alternative: "Contact eczema; allergic contact dermatitis; irritant contact dermatitis", category: "inflammatory-eczematous", subcategory: "eczematous-dermatitis",
      coding: coding({ diagnoses: [icd10Who("L23", "Allergic contact dermatitis"), icd10Who("L24", "Irritant contact dermatitis")], icdoApplicability: "not applicable", verificationNote: "Allergic and irritant contact dermatitis have separate ICD-10 WHO categories; the appropriate fourth character depends on the documented allergen or irritant. Do not infer mechanism from morphology alone." }),
      description: "An inflammatory dermatitis caused either by direct irritant injury or by delayed hypersensitivity to a contact allergen; the two mechanisms can coexist.",
      clinical: "Pruritus, burning, erythema, scale, vesiculation or fissuring usually relate to exposure distribution. Irritant dermatitis can follow acute or cumulative injury, whereas allergic dermatitis requires sensitization and may extend beyond the primary contact area; clinical overlap is common.",
      dermoscopy: "Dermoscopy is not routinely diagnostic and shows nonspecific eczematous inflammation; exposure history, distribution and appropriate testing are more important.",
      differential: "Atopic dermatitis, dyshidrotic eczema, psoriasis, dermatophyte infection, scabies and other occupational or exposure-related dermatoses.",
      treatment: "Identify and reduce the relevant exposure, support the skin barrier and use site- and severity-appropriate anti-inflammatory treatment. Patch testing is central when allergic contact dermatitis is suspected, especially in persistent, recurrent or occupational disease.",
      followup: "Review exposure avoidance, protective measures and response to treatment. Ongoing or occupational disease may require dermatology, patch-testing and workplace-health input.",
      references: [refs.badContactDermatitis, refs.whoIcd10, dermNet("Contact dermatitis", "contact-dermatitis", "2026-09-16")]
    }),
    record({
      id: "seborrheic-dermatitis", name: "Seborrheic Dermatitis", alternative: "Seborrhoeic dermatitis; seborrheic eczema; dandruff", category: "inflammatory-eczematous", subcategory: "seborrheic-disorder",
      coding: coding({ diagnoses: [icd10Who("L21", "Seborrheic dermatitis")], icdoApplicability: "not applicable", verificationNote: "ICD-10 WHO subdivides seborrheic dermatitis by presentation; use a more specific fourth character only when documented." }),
      description: "A common, chronic or relapsing inflammatory disorder affecting sebum-rich areas, with dandruff representing a mild scalp-predominant presentation.",
      clinical: "Poorly demarcated erythema with white or yellowish scale commonly involves the scalp, eyebrows, glabella, nasolabial folds, ears or presternal skin. Pruritus varies and recurrence is common.",
      dermoscopy: "Dermoscopy is not routinely required; scale and vascular findings may support assessment but are not specific enough to establish the diagnosis.",
      differential: "Scalp or facial psoriasis, atopic dermatitis, contact dermatitis, dermatophyte infection, rosacea and, for atypical facial disease, cutaneous lupus erythematosus.",
      treatment: "Topical antifungal therapy and appropriate scalp preparations are common first approaches. Short, carefully selected anti-inflammatory treatment may be used for flares; site, age, extent and relapse pattern should guide selection.",
      followup: "Intermittent maintenance may be needed for recurrent disease. Severe, extensive, treatment-resistant or atypical presentations should prompt reassessment of the diagnosis and contributing factors.",
      references: [refs.sebDermConsensus, refs.whoIcd10, dermNet("Seborrheic dermatitis", "seborrhoeic-dermatitis", "2026-09-16")]
    }),
    record({
      id: "plaque-psoriasis", name: "Plaque Psoriasis", alternative: "Psoriasis vulgaris; chronic plaque psoriasis", category: "inflammatory-eczematous", subcategory: "papulosquamous-disorder",
      coding: coding({ diagnoses: [icd10Who("L40.0", "Psoriasis vulgaris")], icdoApplicability: "not applicable", verificationNote: "This record is limited to plaque psoriasis; other psoriasis phenotypes have distinct clinical and sometimes coding considerations." }),
      description: "The common chronic plaque form of psoriasis, characterized by persistent, well-demarcated inflammatory plaques with scale.",
      clinical: "Symmetric plaques commonly involve extensor surfaces, scalp and lumbosacral skin, but flexural, genital, palmoplantar and nail involvement may alter appearance and impact. Joint symptoms require assessment for psoriatic arthritis.",
      dermoscopy: "Regularly distributed dotted vessels on a light red background with diffuse white scale can support the diagnosis, but clinicopathologic correlation is needed when features are atypical.",
      differential: "Nummular or chronic eczema, seborrheic dermatitis, dermatophyte infection, pityriasis rubra pilaris and cutaneous T-cell lymphoma.",
      treatment: "Limited plaque disease is often managed with topical therapy selected for site and patient factors. Phototherapy or systemic treatment may be appropriate for extensive, high-impact or inadequately controlled disease; severity, quality of life, comorbidities and psoriatic arthritis influence planning.",
      followup: "Monitor skin and nail activity, treatment safety and quality-of-life impact, and reassess for inflammatory joint symptoms and relevant comorbidities.",
      references: [refs.euroGuidermPsoriasis, refs.aadPsoriasis, refs.whoIcd10, dermNet("Psoriasis", "psoriasis", "2026-09-16")]
    }),
    record({
      id: "acne-vulgaris", name: "Acne Vulgaris", alternative: "Common acne; acne", category: "acneiform-sebaceous", subcategory: "acneiform-disorder",
      coding: coding({ diagnoses: [icd10Who("L70.0", "Acne vulgaris")], icdoApplicability: "not applicable", verificationNote: "Do not generalize this code to medication-induced, occupational or other acneiform eruptions." }),
      description: "A chronic inflammatory disorder of the pilosebaceous unit producing comedones and inflammatory lesions, most often on the face, chest and back.",
      clinical: "Open and closed comedones may occur with papules, pustules or deeper nodules. Scarring, post-inflammatory pigment alteration and psychosocial burden are important severity considerations.",
      dermoscopy: "Dermoscopy is not routinely required; comedonal openings and follicular inflammatory changes may be visible but diagnosis is primarily clinical.",
      differential: "Rosacea, bacterial or Malassezia folliculitis, periorificial dermatitis, hidradenitis suppurativa and medication-related acneiform eruptions.",
      treatment: "Treatment is severity- and phenotype-based and commonly combines topical agents with different mechanisms. Antibiotic exposure should be limited and combined appropriately; systemic, hormonal or isotretinoin therapy requires indication-specific assessment, contraindication review and monitoring.",
      followup: "Reassess response, tolerability, adherence, scarring risk, pigmentary sequelae and psychosocial impact. Escalate when disease is severe, scarring or insufficiently controlled.",
      references: [refs.aadAcne, refs.whoIcd10, dermNet("Acne vulgaris", "acne-vulgaris", "2026-09-16")]
    }),
    record({
      id: "rosacea", name: "Rosacea", alternative: "Facial rosacea; acne rosacea (historical term)", category: "acneiform-sebaceous", subcategory: "rosacea",
      coding: coding({ diagnoses: [icd10Who("L71", "Rosacea")], icdoApplicability: "not applicable", verificationNote: "Document the dominant cutaneous and ocular phenotypes; do not code rosacea as acne vulgaris." }),
      description: "A chronic inflammatory facial disorder assessed by phenotype, which may include persistent centrofacial erythema, flushing, telangiectasia, papules, pustules, phymatous change or ocular involvement.",
      clinical: "Central facial erythema and episodic flushing may occur alone or with inflammatory papules and pustules; comedones are not a typical feature. Ocular symptoms and phymatous change require separate assessment.",
      dermoscopy: "Dermoscopy may help demonstrate telangiectatic vascular patterns and follicular changes, but it is supportive rather than diagnostic.",
      differential: "Acne vulgaris, seborrheic dermatitis, periorificial dermatitis, contact dermatitis, cutaneous lupus erythematosus and other causes of facial erythema or flushing.",
      treatment: "Use gentle skin care, photoprotection and management of individually confirmed triggers. Treatment should target the dominant phenotype and may include topical, oral or vascular-device approaches; ocular disease may require ophthalmic assessment.",
      followup: "Reassess phenotype-specific response, ocular symptoms, treatment tolerance and quality-of-life impact. Atypical, unilateral or treatment-resistant disease should prompt diagnostic review.",
      references: [refs.rosaceaGuideline, refs.whoIcd10, dermNet("Rosacea", "rosacea", "2026-09-16")]
    }),
    record({
      id: "chronic-urticaria", name: "Chronic Urticaria", alternative: "Chronic spontaneous urticaria; CSU; chronic inducible urticaria", category: "inflammatory-eczematous", subcategory: "urticarial-disorder",
      coding: coding({ diagnoses: [icd10Who("L50", "Urticaria")], icdoApplicability: "not applicable", verificationNote: "ICD-10 WHO does not fully represent the modern chronic spontaneous versus chronic inducible classification in one disease-specific code; document subtype and verify any national extension separately." }),
      description: "Recurrent wheals, angioedema or both for more than six weeks, classified as chronic spontaneous urticaria or chronic inducible urticaria according to whether specific triggers reproducibly provoke symptoms.",
      clinical: "Individual wheals are transient and usually resolve within 24 hours without residual bruising, while angioedema can last longer. Chronic inducible forms are linked to reproducible physical or environmental stimuli; acute urticaria is a separate time-limited presentation.",
      dermoscopy: "Dermoscopy is not routinely useful. Persistent, painful or bruising lesions require reassessment for urticarial vasculitis or another mimic rather than dermoscopic confirmation.",
      differential: "Urticarial vasculitis, mast-cell disorders, autoinflammatory syndromes, bradykinin-mediated angioedema and other causes of transient erythema or swelling.",
      treatment: "Confirm the chronic urticaria subtype and avoid only demonstrated aggravating factors. A second-generation H1 antihistamine is the usual first-line treatment, with guideline-directed stepwise specialist escalation when control is inadequate; broad testing is not routine without clinical clues.",
      followup: "Track disease control, angioedema, inducible triggers, treatment response and adverse effects. Airway, breathing or circulatory symptoms require urgent assessment outside the routine chronic-urticaria pathway.",
      references: [refs.urticariaGuideline, refs.whoIcd10, dermNet("Chronic urticaria", "chronic-urticaria", "2026-09-16")]
    }),
    record({
      id: "vitiligo", name: "Vitiligo", alternative: "Acquired depigmentation; leukoderma", category: "pigmentary", subcategory: "depigmenting-disorder",
      coding: coding({ diagnoses: [icd10Who("L80", "Vitiligo")], icdoApplicability: "not applicable", verificationNote: "Vitiligo subtype and activity are clinically important but are not represented by separate ICD-10 WHO codes in this record." }),
      description: "An acquired disorder of melanocyte loss causing depigmented macules and patches, most often classified as nonsegmental or segmental vitiligo.",
      clinical: "Well-demarcated depigmented macules or patches may enlarge or appear at sites of friction or injury; hair within affected skin can depigment. Distribution, activity, extent and psychosocial impact should be documented.",
      dermoscopy: "Dermoscopy may show perifollicular pigment, marginal changes and features of activity or stability. Wood-lamp examination is often more useful for defining subtle extent, especially in lighter skin.",
      differential: "Post-inflammatory hypopigmentation, pityriasis alba, tinea versicolor, chemical leukoderma, nevus depigmentosus and hypopigmented mycosis fungoides.",
      treatment: "Management is individualized through shared decision-making and may include camouflage, photoprotection, topical anti-inflammatory treatment, phototherapy or other targeted therapy according to activity, extent, site, age and patient goals. Surgical approaches are reserved for selected stable disease.",
      followup: "Document activity, extent, repigmentation, treatment safety and psychosocial impact. Investigate associated autoimmune disease according to history, examination and guideline context rather than using an indiscriminate panel.",
      references: [refs.vitiligoConsensusPart1, refs.vitiligoConsensusPart2, refs.whoIcd10, dermNet("Vitiligo", "vitiligo", "2026-09-16")]
    }),
    record({
      id: "impetigo", name: "Impetigo", alternative: "Non-bullous impetigo; bullous impetigo", category: "infectious-infestation", subcategory: "bacterial-infection",
      coding: coding({ diagnoses: [icd10Who("L01.0", "Impetigo [any organism] [any site]")], icdoApplicability: "not applicable", verificationNote: "Document bullous versus non-bullous presentation and verify any national coding extension separately." }),
      description: "A contagious superficial bacterial skin infection with non-bullous and bullous presentations.",
      clinical: "Non-bullous disease commonly evolves from vesicles or pustules into honey-colored crusted erosions; bullous disease produces flaccid fluid-filled blisters. Extent, systemic features, recurrence and outbreak context affect assessment.",
      dermoscopy: "Dermoscopy is not routinely needed; crust, erosion and nonspecific vascular findings do not replace clinical assessment or microbiologic testing when indicated.",
      differential: "Herpes simplex, ecthyma, contact dermatitis, insect-bite reaction, scabies with secondary infection and autoimmune blistering disease.",
      treatment: "Use hygiene measures and guideline-directed topical or oral antimicrobial treatment according to whether disease is localized or widespread, bullous, recurrent, or associated with systemic illness or higher complication risk. Reassess rather than repeatedly treating unexplained non-response.",
      followup: "Review if lesions spread, systemic illness develops, treatment fails, or episodes recur. Consider microbiologic sampling and specialist advice when recommended by the applicable guideline.",
      references: [refs.niceImpetigo, refs.whoIcd10, dermNet("Impetigo", "impetigo", "2026-09-16")]
    }),
    record({
      id: "bacterial-folliculitis", name: "Bacterial Folliculitis", alternative: "Staphylococcal folliculitis; superficial bacterial folliculitis", category: "infectious-infestation", subcategory: "bacterial-infection",
      coding: coding({ diagnoses: [icd10Who("L73.9", "Follicular disorder, unspecified")], icdoApplicability: "not applicable", verificationNote: "ICD-10 WHO does not provide a single organism-specific bacterial-folliculitis code in this compact record; verify the documented depth, organism and any national modification." }),
      description: "A superficial bacterial infection or inflammation centered on hair follicles, commonly but not exclusively associated with staphylococci.",
      clinical: "Follicle-centered erythematous papules or pustules may be tender or itchy. Deep, fluctuant, spreading, recurrent or systemic presentations require assessment for a furuncle, abscess or another process.",
      dermoscopy: "Dermoscopy is not routinely diagnostic; a folliculocentric pustule or perifollicular erythema is nonspecific.",
      differential: "Malassezia folliculitis, acne vulgaris, pseudofolliculitis, gram-negative folliculitis, insect bites and early hidradenitis suppurativa.",
      treatment: "Address occlusion, friction and other contributing factors. Limited disease may need local measures; extensive, recurrent or complicated disease may require culture-guided or systemic management. Evidence comparing interventions is limited, so treatment should follow local antimicrobial guidance.",
      followup: "Reassess persistent, recurrent or spreading disease and investigate predisposing factors when clinically indicated. Urgent assessment is appropriate for systemic illness or rapidly progressive infection.",
      references: [refs.folliculitisCochrane, refs.whoIcd10, dermNet("Bacterial folliculitis", "bacterial-folliculitis", "2026-09-16")]
    }),
    record({
      id: "erysipelas", name: "Erysipelas", alternative: "Superficial bacterial cellulitis; streptococcal erysipelas", category: "infectious-infestation", subcategory: "bacterial-infection",
      coding: coding({ diagnoses: [icd10Who("A46", "Erysipelas")], icdoApplicability: "not applicable", verificationNote: "Clinical terminology overlaps with cellulitis in some settings; retain the documented diagnosis and verify national coding rules." }),
      description: "An acute bacterial infection of the superficial dermis and lymphatics, usually producing a more sharply demarcated inflammatory plaque than cellulitis.",
      clinical: "A painful, warm, erythematous and often raised plaque may be accompanied by fever or malaise. The face and lower limbs are common sites; rapidly progressive disease or severe systemic features require urgent evaluation.",
      dermoscopy: "Dermoscopy has no established routine diagnostic role and must not delay assessment of severity or alternative diagnoses.",
      differential: "Cellulitis, contact dermatitis, stasis dermatitis, superficial thrombophlebitis, deep-vein thrombosis and inflammatory or vascular mimics.",
      treatment: "Prompt guideline-directed systemic antibiotic treatment is required, with route and care setting determined by severity, comorbidity, infection site, complication risk and local resistance guidance. Marking the inflammatory margin can help monitor progression.",
      followup: "Reassess if symptoms worsen rapidly, systemic illness develops, pain is disproportionate, or improvement does not begin as expected. Address portals of entry and recurrence risks after the acute episode.",
      references: [refs.niceCellulitisErysipelas, refs.whoIcd10, dermNet("Erysipelas", "erysipelas", "2026-09-16")]
    }),
    record({
      id: "erythrasma", name: "Erythrasma", alternative: "Corynebacterial intertrigo", category: "infectious-infestation", subcategory: "bacterial-infection",
      coding: coding({ diagnoses: [icd10Who("L08.1", "Erythrasma")], icdoApplicability: "not applicable", verificationNote: "Confirm the diagnosis clinically and distinguish colonization or mixed intertrigo when interpreting tests." }),
      description: "A superficial Corynebacterium-associated infection of intertriginous skin.",
      clinical: "Well-demarcated pink, red-brown or brown patches with fine scale occur most often in toe webs, groin or axillae and may be asymptomatic or mildly pruritic.",
      dermoscopy: "Wood-lamp examination may show coral-red fluorescence from bacterial porphyrins, although washing or prior treatment can reduce fluorescence. Dermoscopy is supplementary and nonspecific.",
      differential: "Dermatophyte infection, candidal intertrigo, inverse psoriasis, seborrheic dermatitis and irritant intertrigo.",
      treatment: "Reduce moisture and friction and use an appropriate topical or systemic antibacterial approach according to extent and recurrence. Published comparative evidence is limited and no single regimen is universally established.",
      followup: "Reassess persistent or recurrent disease, confirm the diagnosis when uncertain and address predisposing occlusion, moisture or metabolic factors where relevant.",
      references: [refs.erythrasmaReview, refs.whoIcd10, dermNet("Erythrasma", "erythrasma", "2026-09-16")]
    }),
    record({
      id: "tinea-corporis", name: "Tinea Corporis", alternative: "Ringworm; body ringworm; dermatophytosis of the body", category: "infectious-infestation", subcategory: "dermatophyte-infection",
      coding: coding({ diagnoses: [icd10Who("B35.4", "Tinea corporis")], icdoApplicability: "not applicable", verificationNote: "This record covers glabrous-skin dermatophytosis; document special sites or extensive disease separately." }),
      description: "A dermatophyte infection of glabrous skin of the trunk or limbs.",
      clinical: "An enlarging annular or polycyclic scaly plaque often has a more active border and relative central clearing, but prior corticosteroid use can obscure the pattern.",
      dermoscopy: "Peripheral scale and erythema may support the diagnosis but are not specific; microscopy, culture or another validated test is appropriate when the appearance is atypical or treatment fails.",
      differential: "Nummular dermatitis, psoriasis, pityriasis rosea, granuloma annulare, subacute cutaneous lupus and erythema migrans.",
      treatment: "Localized disease is generally managed with an appropriate topical antifungal; extensive, refractory, follicular or immunocompromised presentations may need systemic treatment after diagnostic confirmation and safety review. Avoid corticosteroid monotherapy.",
      followup: "Reassess non-response for adherence, reinfection, an alternative diagnosis, resistant dermatophytes or an untreated animal or household source.",
      references: [refs.cdcRingworm, refs.whoIcd10, dermNet("Tinea corporis", "tinea-corporis", "2026-09-16")]
    }),
    record({
      id: "tinea-cruris", name: "Tinea Cruris", alternative: "Jock itch; groin ringworm", category: "infectious-infestation", subcategory: "dermatophyte-infection",
      coding: coding({ diagnoses: [icd10Who("B35.6", "Tinea cruris")], icdoApplicability: "not applicable", verificationNote: "Confirm the affected site and distinguish dermatophyte infection from candidal or bacterial intertrigo." }),
      description: "A dermatophyte infection of the groin and adjacent upper thigh.",
      clinical: "Pruritic, sharply bordered erythematous or hyperpigmented plaques with peripheral scale commonly extend from the inguinal fold; morphology and scrotal involvement can help distinguish mimics but are not definitive.",
      dermoscopy: "Peripheral scale and background erythema may be visible but are nonspecific; mycologic confirmation is useful for atypical or refractory disease.",
      differential: "Candidal intertrigo, erythrasma, inverse psoriasis, seborrheic dermatitis, contact dermatitis and irritant intertrigo.",
      treatment: "Keep the area dry, address concurrent foot or nail dermatophytosis and use an appropriate antifungal according to extent and patient factors. Avoid corticosteroid monotherapy because it can mask or worsen dermatophyte infection.",
      followup: "Reassess persistent or recurrent disease for diagnostic confirmation, adherence, reinfection and coexisting tinea pedis or onychomycosis.",
      references: [refs.cdcRingworm, refs.whoIcd10, dermNet("Tinea cruris", "tinea-cruris", "2026-09-16")]
    }),
    record({
      id: "tinea-pedis", name: "Tinea Pedis", alternative: "Athlete's foot; foot ringworm", category: "infectious-infestation", subcategory: "dermatophyte-infection",
      coding: coding({ diagnoses: [icd10Who("B35.3", "Tinea pedis")], icdoApplicability: "not applicable", verificationNote: "Document the interdigital, moccasin, vesiculobullous or other clinical pattern and verify national extensions separately." }),
      description: "A dermatophyte infection of the feet with interdigital, diffuse plantar or vesicular presentations.",
      clinical: "Scaling, fissuring, maceration, pruritus or vesicles may involve toe webs, soles or lateral feet. Barrier breakdown can increase the risk of secondary bacterial infection.",
      dermoscopy: "Dermoscopy is not routinely required; scale that follows skin furrows may support tinea but is not diagnostic.",
      differential: "Foot eczema, contact dermatitis, palmoplantar psoriasis, pitted keratolysis, candidiasis and juvenile plantar dermatosis.",
      treatment: "Drying measures and an appropriate topical antifungal are usual for limited disease. Extensive, chronic, refractory or nail-associated disease may require confirmation and systemic treatment after contraindications and interactions are assessed.",
      followup: "Check for resolution of fissuring and recurrence, and evaluate footwear, communal exposure, tinea cruris and fungal nail disease when clinically relevant.",
      references: [refs.cdcRingworm, refs.whoIcd10, dermNet("Tinea pedis", "tinea-pedis", "2026-09-16")]
    }),
    record({
      id: "tinea-capitis", name: "Tinea Capitis", alternative: "Scalp ringworm; scalp dermatophytosis", category: "infectious-infestation", subcategory: "dermatophyte-infection",
      coding: coding({ diagnoses: [icd10Who("B35.0", "Tinea barbae and tinea capitis")], icdoApplicability: "not applicable", verificationNote: "ICD-10 WHO B35.0 combines scalp and beard dermatophytosis; this record is limited to tinea capitis." }),
      description: "A dermatophyte infection of scalp hair and surrounding skin, seen most often in children but possible at any age.",
      clinical: "Patchy scale with broken hairs or alopecia, diffuse scale, black dots or an inflammatory kerion may occur. Cervical lymphadenopathy can accompany inflammatory disease; scarring is a risk in severe inflammation.",
      dermoscopy: "Trichoscopy may show comma, corkscrew, zigzag or broken hairs and black dots, but fungal testing is needed when the diagnosis or organism is uncertain.",
      differential: "Alopecia areata, seborrheic dermatitis, scalp psoriasis, bacterial folliculitis, trichotillomania and dissecting cellulitis.",
      treatment: "Because infection involves the hair shaft, systemic antifungal treatment is required; topical therapy alone is inadequate but may reduce transmission as an adjunct. Organism, age, contraindications, interactions and local guidance inform drug selection.",
      followup: "Confirm clinical and mycologic response as appropriate, assess close contacts or outbreak settings, and arrange prompt specialist assessment for kerion, diagnostic uncertainty or possible scarring.",
      references: [refs.tineaCapitisGuideline, refs.whoIcd10, dermNet("Tinea capitis", "tinea-capitis", "2026-09-16")]
    }),
    record({
      id: "onychomycosis", name: "Onychomycosis", alternative: "Fungal nail infection; tinea unguium", category: "infectious-infestation", subcategory: "dermatophyte-infection",
      coding: coding({ diagnoses: [icd10Who("B35.1", "Tinea unguium")], icdoApplicability: "not applicable", verificationNote: "B35.1 specifically represents dermatophyte nail infection; onychomycosis may also be caused by yeasts or non-dermatophyte moulds, so organism and applicable classification require confirmation." }),
      description: "A fungal infection of one or more nail units caused by dermatophytes, yeasts or non-dermatophyte moulds.",
      clinical: "Nails may become thickened, discolored, brittle, crumbly or separated from the nail bed. Clinical appearance alone is unreliable because many nail disorders mimic fungal infection.",
      dermoscopy: "Jagged proximal borders, longitudinal striae or subungual debris can support distal disease but do not identify the organism or replace mycologic confirmation.",
      differential: "Nail psoriasis, traumatic onycholysis, lichen planus, chronic paronychia, bacterial nail infection and nail-unit tumor.",
      treatment: "Confirm fungal infection before prolonged systemic therapy. Choice of topical or systemic treatment depends on organism, pattern, extent, nail growth, comorbidity, interactions and monitoring needs.",
      followup: "Assess healthy nail outgrowth rather than expecting immediate normalization. Reconsider the diagnosis or organism when there is no progressive clearing and address concurrent tinea pedis and recurrence risks.",
      references: [refs.onychomycosisGuideline, refs.cdcRingworm, refs.whoIcd10, dermNet("Fungal nail infections", "fungal-nail-infections", "2026-09-16")]
    }),
    record({
      id: "cutaneous-candidiasis", name: "Cutaneous Candidiasis", alternative: "Candidal intertrigo; skin candidiasis; cutaneous candidosis", category: "infectious-infestation", subcategory: "other-fungal-infection",
      coding: coding({ diagnoses: [icd10Who("B37.2", "Candidiasis of skin and nail")], icdoApplicability: "not applicable", verificationNote: "This record emphasizes skin-fold candidiasis; mucosal, nail, chronic mucocutaneous and invasive candidiasis require separate assessment." }),
      description: "A superficial Candida infection of skin, commonly affecting moist or occluded folds.",
      clinical: "Moist erythematous plaques with peripheral scale and satellite papules or pustules often occur in intertriginous sites. Candida can also colonize or secondarily affect another dermatosis, so test results require clinical correlation.",
      dermoscopy: "Dermoscopy is not routinely diagnostic; vascular and scaling findings are nonspecific. Microscopy or culture can support uncertain or refractory cases.",
      differential: "Irritant intertrigo, dermatophyte infection, erythrasma, inverse psoriasis, seborrheic dermatitis and bacterial intertrigo.",
      treatment: "Reduce moisture, friction and occlusion, address relevant predisposing factors and use an appropriate topical antifungal for limited disease. Extensive, recurrent or immunocompromised presentations may require systemic assessment and treatment.",
      followup: "Reassess persistent or recurrent disease for diagnostic confirmation, mixed infection and modifiable predisposing factors; investigate immune or metabolic contributors only when clinically indicated.",
      references: [refs.candidiasisReview, refs.dermatomycosisGuideline, refs.whoIcd10, dermNet("Candida", "candida", "2026-09-16")]
    }),
    record({
      id: "pityriasis-versicolor", name: "Pityriasis Versicolor", alternative: "Tinea versicolor; versicolor", category: "infectious-infestation", subcategory: "other-fungal-infection",
      coding: coding({ diagnoses: [icd10Who("B36.0", "Pityriasis versicolor")], icdoApplicability: "not applicable", verificationNote: "The term tinea versicolor is conventional, but the condition is caused by Malassezia yeast rather than a dermatophyte." }),
      description: "A superficial Malassezia-associated disorder producing variably pigmented, finely scaling patches, usually on the trunk, neck or proximal limbs.",
      clinical: "Hypopigmented, hyperpigmented or erythematous macules and patches coalesce with fine scale; symptoms are absent or mildly itchy. Pigment change may persist after organism clearance.",
      dermoscopy: "Fine scale, especially in skin lines or at lesion margins, and altered pigment networks may support the diagnosis; microscopy can confirm uncertain cases.",
      differential: "Vitiligo, post-inflammatory pigment change, pityriasis alba, seborrheic dermatitis, confluent and reticulated papillomatosis and hypopigmented mycosis fungoides.",
      treatment: "Topical antifungal therapy is usual for limited disease; extensive or frequently recurrent disease may require an appropriately selected systemic approach. Recurrence is common, and pigment recovery can lag behind mycologic cure.",
      followup: "Judge response by disappearance of scale and lack of new lesions rather than immediate pigment normalization. Reassess atypical or persistent lesions and discuss recurrence prevention when appropriate.",
      references: [refs.dermatomycosisGuideline, refs.whoIcd10, dermNet("Pityriasis versicolor", "pityriasis-versicolor", "2026-09-16")]
    }),
    record({
      id: "scabies", name: "Scabies", alternative: "Sarcoptes scabiei infestation; itch mite infestation", category: "infectious-infestation", subcategory: "parasitic-infestation",
      coding: coding({ diagnoses: [icd10Who("B86", "Scabies")], icdoApplicability: "not applicable", verificationNote: "Document classic versus crusted scabies and any secondary infection because management and transmission risk differ." }),
      description: "A contagious skin infestation caused by the human itch mite Sarcoptes scabiei var. hominis.",
      clinical: "Intense itch, often worse at night, accompanies papules, excoriations or burrows at characteristic sites. Infants, older adults and immunocompromised people may have atypical distribution; crusted scabies has a far greater mite burden.",
      dermoscopy: "A triangular mite body at the end of a serpiginous burrow can support diagnosis, but microscopy or another validated method may be needed and a negative test does not always exclude infestation.",
      differential: "Atopic dermatitis, contact dermatitis, papular urticaria, body lice, dermatitis herpetiformis, folliculitis and delusional infestation.",
      treatment: "Treat the affected person and close contacts at the same time with an appropriate scabicide, following age, pregnancy, crusted-disease and local guidance. Manage clothing and bedding without excessive environmental decontamination; crusted scabies requires specialist and infection-control measures.",
      followup: "Itch can persist for several weeks after effective therapy. Reassess new burrows, ongoing transmission, incorrect application, untreated contacts or crusted disease rather than assuming immediate treatment failure.",
      references: [refs.scabiesGuideline, refs.cdcScabiesTreatment, refs.whoIcd10, dermNet("Scabies", "scabies", "2026-09-16")]
    }),
    record({
      id: "herpes-simplex", name: "Herpes Simplex", alternative: "HSV infection; herpes simplex infection; cold sores", category: "infectious-infestation", subcategory: "viral-infection",
      coding: coding({ diagnoses: [icd10Who("B00.1", "Herpesviral vesicular dermatitis")], icdoApplicability: "not applicable", verificationNote: "B00.1 covers herpesviral vesicular dermatitis; genital, ocular, neonatal, disseminated and organ-specific HSV presentations have distinct clinical and coding pathways." }),
      description: "A mucocutaneous infection caused by herpes simplex virus type 1 or type 2 that can establish latency and recur.",
      clinical: "Grouped painful vesicles or erosions may follow tingling, burning or pain and can recur near the same site. Appearance varies by anatomic site and immune status; ocular, neonatal, disseminated or neurologic disease requires urgent specialist care.",
      dermoscopy: "Dermoscopy is not routinely diagnostic. Vesicle fluid or lesion-base nucleic-acid testing is more useful when confirmation or viral typing is clinically important.",
      differential: "Herpes zoster, impetigo, aphthous ulceration, contact dermatitis, fixed drug eruption and other causes of genital or oral ulceration.",
      treatment: "Antiviral treatment may be episodic, initial-episode or suppressive depending on site, severity, recurrence pattern, immune status and transmission context. Counseling and testing should follow the relevant oral, genital, ocular or immunocompromised-care pathway.",
      followup: "Reassess frequent, severe, atypical or treatment-resistant recurrences and any eye, neurologic, pregnancy or neonatal concern. Genital disease requires site-specific sexual-health counseling and follow-up.",
      references: [refs.cdcHerpes, refs.whoIcd10, dermNet("Herpes simplex", "herpes-simplex", "2026-09-16")]
    }),
    record({
      id: "herpes-zoster", name: "Herpes Zoster", alternative: "Shingles; zoster", category: "infectious-infestation", subcategory: "viral-infection",
      coding: coding({ diagnoses: [icd10Who("B02", "Zoster [herpes zoster]")], icdoApplicability: "not applicable", verificationNote: "Complicated zoster has more specific ICD-10 WHO subcategories; document ophthalmic, neurologic, disseminated or other complications rather than using an unspecified code automatically." }),
      description: "Reactivation of latent varicella-zoster virus causing a usually painful, unilateral dermatomal eruption.",
      clinical: "Pain, tingling or itch can precede grouped vesicles on an erythematous base in one or adjacent dermatomes, usually without crossing the midline. Ophthalmic, otic, neurologic, disseminated or immunocompromised presentations need urgent assessment.",
      dermoscopy: "Dermoscopy is not routinely required. PCR from an appropriate lesion sample is the most useful confirmatory test when the presentation is atypical.",
      differential: "Herpes simplex, contact dermatitis, impetigo, insect-bite reaction and other vesicular or neuropathic disorders.",
      treatment: "Start appropriate antiviral treatment promptly when indicated, with urgency and route guided by timing, site, severity, complications and immune status. Provide pain management and infection-prevention counseling; vaccination is preventive and not treatment of an active episode.",
      followup: "Monitor for ocular, neurologic, auditory or disseminated complications and for persistent pain. Escalate urgently for high-risk sites, systemic illness or immunocompromise.",
      references: [refs.cdcZoster, refs.whoIcd10, dermNet("Herpes zoster", "herpes-zoster", "2026-09-16")]
    }),
    record({
      id: "molluscum-contagiosum", name: "Molluscum Contagiosum", alternative: "Molluscum; water warts", category: "infectious-infestation", subcategory: "viral-infection",
      coding: coding({ diagnoses: [icd10Who("B08.1", "Molluscum contagiosum")], icdoApplicability: "not applicable", verificationNote: "Genital lesions in adults and extensive or atypical disease require context-specific assessment rather than assuming routine childhood molluscum." }),
      description: "A usually self-limited superficial poxvirus infection producing characteristic umbilicated papules.",
      clinical: "Small, firm, pearly or skin-colored papules usually have a central depression. Lesions can inflame during resolution; numerous, large or atypically distributed lesions may occur with immunosuppression.",
      dermoscopy: "A central pore or umbilication with polylobular white-to-yellow structures and peripheral vessels may support the diagnosis but is not required in typical cases.",
      differential: "Viral warts, folliculitis, milia, syringoma, cryptococcosis and other papular eruptions in immunocompromised patients.",
      treatment: "Observation is appropriate for many immunocompetent patients because spontaneous resolution is common. Treatment may be considered for symptoms, eczema, transmission concerns, genital location or persistent disease; destructive methods can cause pain, irritation or scarring.",
      followup: "Reassess atypical, extensive, genital or persistent disease and consider underlying immunosuppression only when the clinical context supports it. Avoid unnecessary exclusion from school or daycare.",
      references: [refs.cdcMolluscum, refs.whoIcd10, dermNet("Molluscum contagiosum", "molluscum-contagiosum", "2026-09-16")]
    }),
    record({
      id: "cutaneous-warts", name: "Cutaneous Warts", alternative: "Viral warts; common warts; verruca vulgaris", category: "infectious-infestation", subcategory: "viral-infection",
      coding: coding({ diagnoses: [icd10Who("B07", "Viral warts")], icdoApplicability: "not applicable", verificationNote: "This record covers non-genital cutaneous warts; anogenital lesions, epidermodysplasia verruciformis and dysplastic or malignant mimics require separate pathways." }),
      description: "Benign epidermal proliferations caused by human papillomavirus, including common, plantar and flat cutaneous warts.",
      clinical: "Hyperkeratotic papules or plaques may interrupt skin lines and show thrombosed capillary dots; morphology varies by site and wart subtype. Immunosuppression can increase burden and persistence.",
      dermoscopy: "Papillomatous surface, interrupted dermatoglyphics and red or black dots can support a wart diagnosis, but pigmented, ulcerated or atypical lesions may require biopsy.",
      differential: "Callus or corn, seborrheic keratosis, molluscum contagiosum, lichen planus, squamous cell carcinoma and other nail-unit or acral tumors.",
      treatment: "Many warts regress spontaneously. Treatment selection depends on site, symptoms, burden, age and immune status and may use keratolytic, destructive or other clinician-directed approaches; repeated treatment is often needed.",
      followup: "Reconsider the diagnosis for rapid growth, ulceration, persistent bleeding or treatment resistance, especially in immunocompromised people or at high-risk sites. Anogenital disease requires separate assessment.",
      references: [refs.cutaneousWartsGuideline, refs.whoIcd10, dermNet("Viral wart", "viral-wart", "2026-09-16")]
    })
  ];

  window.DOCUTIS_DATA = Object.freeze({
    categories: Object.freeze(categories),
    subcategories: Object.freeze(subcategories),
    diseases: Object.freeze(diseases)
  });
}());
