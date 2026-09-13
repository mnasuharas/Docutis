const diseases = [

  {
    id: "bcc",
    name: "Basal Cell Carcinoma",
    alternative: "BCC",
    icd: "C44.-",
    description:
      "A common keratinocyte carcinoma characterized by locally invasive growth and a very low metastatic potential.",

    clinical:
      "Typical presentations include pearly or translucent papules, telangiectasia, ulceration, crusting or slowly enlarging plaques depending on the subtype.",

    dermoscopy:
      "Possible findings include arborizing vessels, blue-gray ovoid nests, leaf-like structures, spoke-wheel areas and ulceration.",

    differential:
      "Squamous cell carcinoma, actinic keratosis, melanocytic lesions, sebaceous hyperplasia and other benign or malignant tumors.",

    treatment:
      "Treatment depends on tumor subtype, localization, size and recurrence risk. Surgical excision is frequently used. Other selected approaches include Mohs micrographic surgery and non-surgical modalities in appropriate cases.",

    followup:
      "Follow-up should be individualized according to recurrence risk, tumor characteristics and the patient's risk of developing additional keratinocyte carcinomas."
  },

  {
    id: "ak",
    name: "Actinic Keratosis",
    alternative: "AK",
    icd: "L57.0",
    description:
      "A UV-induced keratinocytic lesion occurring predominantly on chronically sun-exposed skin.",

    clinical:
      "Commonly presents as a rough, scaly or hyperkeratotic macule, papule or plaque on chronically sun-damaged skin.",

    dermoscopy:
      "Facial lesions may show a strawberry pattern, erythematous pseudonetwork, surface scale and prominent follicular openings.",

    differential:
      "Squamous cell carcinoma in situ, invasive squamous cell carcinoma, seborrheic keratosis, superficial basal cell carcinoma and inflammatory dermatoses.",

    treatment:
      "Management may include lesion-directed or field-directed therapy depending on lesion number, localization and clinical context.",

    followup:
      "Clinical reassessment is appropriate particularly in patients with extensive actinic damage, recurrent lesions or suspicion of progression."
  },

  {
    id: "melanoma",
    name: "Cutaneous Melanoma",
    alternative: "Melanoma",
    icd: "C43.-",
    description:
      "A malignant melanocytic neoplasm with metastatic potential. Early diagnosis is essential for prognosis.",

    clinical:
      "Suspicious features may include asymmetry, irregular borders, color variation, change over time and lesions that differ from the patient's other nevi.",

    dermoscopy:
      "Findings depend on melanoma subtype and may include asymmetry of structures and colors, atypical pigment network, irregular dots or globules, atypical streaks, regression structures and atypical vascular patterns.",

    differential:
      "Melanocytic nevus, dysplastic nevus, seborrheic keratosis, pigmented basal cell carcinoma and other pigmented lesions.",

    treatment:
      "Management depends on histopathologic staging and current melanoma guidelines. Surgical excision is the cornerstone of treatment for localized primary melanoma.",

    followup:
      "Follow-up intensity and investigations depend on tumor stage, recurrence risk and current national or international melanoma guidelines."
  },

    {
    id: "bowen",
    name: "Bowen Disease",
    alternative: "SCC in situ",
    icd: "D04.-",
    description: "An intraepidermal squamous cell carcinoma confined to the epidermis.",

    clinical: "Typically presents as a persistent, well-demarcated erythematous and scaly patch or plaque. Pigmented variants may occur.",

    dermoscopy: "Possible findings include grouped glomerular or coiled vessels, scale and, in pigmented lesions, brown or gray dots and globules.",

    differential: "Actinic keratosis, superficial basal cell carcinoma, psoriasis, eczema, pigmented lesions and invasive cutaneous squamous cell carcinoma.",

    treatment: "Management is individualized according to lesion site, size, patient factors and diagnostic certainty. Options may include surgical and selected nonsurgical approaches.",

    followup: "Clinical follow-up should consider recurrence, ongoing actinic damage and the risk of additional keratinocyte carcinomas."
  },

  {
    id: "cscc",
    name: "Cutaneous Squamous Cell Carcinoma",
    alternative: "cSCC",
    icd: "C44.-",
    description: "A malignant keratinocytic neoplasm with variable local recurrence and metastatic risk.",

    clinical: "May present as a persistent hyperkeratotic papule, plaque or nodule, sometimes with crusting, ulceration, tenderness or rapid growth.",

    dermoscopy: "Findings may include keratin, white structureless areas, scale, ulceration and vascular patterns. Appearance varies with differentiation and location.",

    differential: "Actinic keratosis, Bowen disease, keratoacanthoma, verruca, basal cell carcinoma and inflammatory or benign keratotic lesions.",

    treatment: "Management depends on tumor risk assessment, anatomic site, histopathology and current guidelines. Surgery is commonly used for appropriate primary tumors.",

    followup: "Follow-up should be risk-adapted and include assessment for local recurrence, regional disease when indicated and additional skin cancers."
  },

  {
    id: "lentigo-maligna",
    name: "Lentigo Maligna",
    alternative: "Melanoma in situ",
    icd: "D03.-",
    description: "A melanoma in situ that usually develops on chronically sun-damaged skin, most often on the head and neck.",

    clinical: "Typically appears as a slowly enlarging, irregularly pigmented macule or patch with variation in color and border.",

    dermoscopy: "Possible findings include asymmetric pigmented follicular openings, annular-granular pattern, gray dots or globules and rhomboidal structures.",

    differential: "Solar lentigo, seborrheic keratosis, pigmented actinic keratosis, lichen planus-like keratosis and other pigmented lesions.",

    treatment: "Management requires complete removal with histologic assessment; the approach depends on lesion size, location and current melanoma guidelines.",

    followup: "Follow-up should be individualized and include surveillance for recurrence and additional melanocytic or keratinocytic tumors."
  },

    {
    id: "actinic-cheilitis",
    name: "Actinic Cheilitis",
    alternative: "Solar cheilitis",
    icd: "L56.8",
    description: "A chronic UV-induced precancerous lesion of the lip, usually affecting the lower vermilion.",
    clinical: "Persistent dryness, scale, atrophy, erythema, fissuring or loss of the vermilion border may occur.",
    dermoscopy: "Scale, white structureless areas, erythema and vascular changes may be seen.",
    differential: "Inflammatory cheilitis, contact cheilitis, SCC in situ and invasive SCC of the lip.",
    treatment: "Management depends on extent and diagnostic concern; suspicious focal ulceration or nodularity requires specialist assessment.",
    followup: "Sun protection and clinical review are important because of SCC risk."
  },
  {
    id: "keratoacanthoma",
    name: "Keratoacanthoma",
    alternative: "KA",
    icd: "L85.8",
    description: "A rapidly growing crateriform keratinocytic tumor with overlap with well-differentiated cutaneous SCC.",
    clinical: "Usually a dome-shaped nodule with a central keratin-filled crater on sun-exposed skin.",
    dermoscopy: "A central keratin plug, white circles and variable vascular patterns may be present.",
    differential: "Well-differentiated SCC, verruca, nodular BCC and amelanotic melanoma.",
    treatment: "Specialist assessment is needed because reliable distinction from SCC can be difficult.",
    followup: "Follow-up depends on histopathology, treatment and keratinocyte-cancer risk."
  },
  {
    id: "lentigo-maligna-melanoma",
    name: "Lentigo Maligna Melanoma",
    alternative: "LMM",
    icd: "C43.-",
    description: "An invasive melanoma arising in association with lentigo maligna, usually on chronically sun-damaged head and neck skin.",
    clinical: "An enlarging irregular pigmented patch may develop thickening, nodularity or new color variation.",
    dermoscopy: "Findings can overlap with lentigo maligna and may suggest invasion.",
    differential: "Lentigo maligna, solar lentigo, pigmented actinic keratosis and seborrheic keratosis.",
    treatment: "Complete excision and histopathologic staging are required; management follows melanoma guidelines.",
    followup: "Follow-up depends on stage and recurrence risk."
  },
  {
    id: "merkel-cell-carcinoma",
    name: "Merkel Cell Carcinoma",
    alternative: "MCC",
    icd: "C4A.-",
    description: "A rare aggressive neuroendocrine skin carcinoma with substantial metastatic potential.",
    clinical: "Often presents as a rapidly growing painless red, violaceous or skin-colored nodule.",
    dermoscopy: "No single diagnostic dermoscopic pattern is established.",
    differential: "BCC, SCC, amelanotic melanoma, lymphoma and epidermal cyst.",
    treatment: "Management requires multidisciplinary specialist assessment, staging and guideline-based therapy.",
    followup: "Close surveillance is required because recurrence and metastasis can occur."
  },
  {
    id: "sebaceous-carcinoma",
    name: "Sebaceous Carcinoma",
    alternative: "SC",
    icd: "C44.-",
    description: "A rare aggressive adnexal carcinoma with frequent periocular presentation.",
    clinical: "May present as a painless firm eyelid nodule or persistent chalazion-like lesion.",
    dermoscopy: "Dermoscopy is not diagnostic and histopathology is required.",
    differential: "Chalazion, BCC, SCC and other eyelid tumors.",
    treatment: "Management requires complete excision with histopathologic assessment and specialist care.",
    followup: "Follow-up is individualized because local recurrence and spread may occur."
  },
  {
    id: "dfsp",
    name: "Dermatofibrosarcoma Protuberans",
    alternative: "DFSP",
    icd: "C44.99",
    description: "A slow-growing dermal sarcoma with a tendency for local recurrence and usually low metastatic risk.",
    clinical: "Typically a slowly enlarging firm plaque or nodule, often on the trunk.",
    dermoscopy: "Dermoscopy is nonspecific and cannot establish the diagnosis.",
    differential: "Dermatofibroma, scar, keloid, cyst and other soft-tissue tumors.",
    treatment: "Complete excision with margin control is central to management.",
    followup: "Long-term follow-up is appropriate because local recurrence can occur."
  },
  {
    id: "atypical-fibroxanthoma",
    name: "Atypical Fibroxanthoma",
    alternative: "AFX",
    icd: "C49.0",
    description: "A dermal spindle-cell tumor usually occurring on sun-damaged head and neck skin in older adults.",
    clinical: "Often a rapidly growing red or flesh-colored dome-shaped nodule that may ulcerate or bleed.",
    dermoscopy: "Findings may resemble BCC or SCC and are not diagnostic.",
    differential: "SCC, amelanotic melanoma, PDS and pyogenic granuloma.",
    treatment: "Complete surgical excision is standard; pathology confirmation is required.",
    followup: "Follow-up depends on tumor features and excision status."
  },
  {
    id: "pleomorphic-dermal-sarcoma",
    name: "Pleomorphic Dermal Sarcoma",
    alternative: "PDS",
    icd: "C49.0",
    description: "A rare malignant dermal tumor related to AFX but with more aggressive histologic features.",
    clinical: "Usually a growing non-pigmented nodule or plaque on sun-damaged head and neck skin.",
    dermoscopy: "Dermoscopy is nonspecific.",
    differential: "AFX, SCC, BCC, amelanotic melanoma and Merkel cell carcinoma.",
    treatment: "Management requires complete excision and specialist pathology review.",
    followup: "Clinical and sometimes radiologic surveillance is needed because recurrence and metastasis may occur."
  },
  {
    id: "cutaneous-angiosarcoma",
    name: "Cutaneous Angiosarcoma",
    alternative: "Angiosarcoma",
    icd: "C49.0",
    description: "A rare aggressive vascular sarcoma, often involving the scalp or face of older adults.",
    clinical: "May appear as a bruise-like, violaceous patch, plaque or nodule with progressive enlargement.",
    dermoscopy: "Dermoscopy is not diagnostic.",
    differential: "Hematoma, rosacea, Kaposi sarcoma and other vascular lesions.",
    treatment: "Management requires urgent multidisciplinary specialist assessment.",
    followup: "Close follow-up is required because recurrence and metastasis are possible."
  },
  {
    id: "kaposi-sarcoma",
    name: "Kaposi Sarcoma",
    alternative: "KS",
    icd: "C46.-",
    description: "A vascular neoplasm associated with human herpesvirus 8 and variable immune status.",
    clinical: "May present as violaceous macules, plaques or nodules, often on the lower limbs.",
    dermoscopy: "A multicolored rainbow pattern may occur but is not specific.",
    differential: "Purpura, angioma, bacillary angiomatosis and other vascular tumors.",
    treatment: "Management depends on subtype, extent, immune status and specialist evaluation.",
    followup: "Follow-up is individualized according to disease extent and underlying context."
  },
  {
    id: "extramammary-paget",
    name: "Extramammary Paget Disease",
    alternative: "EMPD",
    icd: "C44.-",
    description: "A rare intraepidermal adenocarcinoma usually affecting apocrine-rich anogenital skin.",
    clinical: "Often a persistent pruritic erythematous eczematous plaque in the genital or perianal region.",
    dermoscopy: "Dermoscopy is supportive but not diagnostic.",
    differential: "Eczema, psoriasis, fungal infection, Bowen disease and melanoma.",
    treatment: "Diagnosis and management require biopsy confirmation and specialist assessment.",
    followup: "Long-term follow-up is appropriate because recurrence can occur."
  },
  {
    id: "microcystic-adnexal-carcinoma",
    name: "Microcystic Adnexal Carcinoma",
    alternative: "MAC",
    icd: "C44.-",
    description: "A rare locally aggressive adnexal carcinoma, usually arising on the central face.",
    clinical: "Often presents as a slowly enlarging firm indurated plaque or nodule.",
    dermoscopy: "Dermoscopy is not diagnostic.",
    differential: "Morpheaform BCC, scar, desmoplastic trichoepithelioma and other adnexal tumors.",
    treatment: "Complete margin-controlled excision and specialist pathology review are generally required.",
    followup: "Long-term follow-up is important because local recurrence and perineural spread may occur."
  }

];

const diseaseReferences = {
  bcc: [
    {
      title: "American Academy of Dermatology — Basal cell carcinoma clinical guideline",
      url: "https://www.aad.org/member/clinical-quality/guidelines/bcc"
    }
  ],
  ak: [
    {
      title: "American Academy of Dermatology — Actinic keratosis guideline",
      url: "https://www.aad.org/member/clinical-quality/guidelines/actinic-keratosis"
    }
  ],
  melanoma: [
    {
      title: "EADO — European melanoma guidelines",
      url: "https://eado.org/european-guidelines/"
    }
  ],
  bowen: [
    {
      title: "DermNet — Intraepidermal squamous cell carcinoma",
      url: "https://dermnetnz.org/topics/intraepidermal-squamous-cell-carcinoma"
    }
  ],
  cscc: [
    {
      title: "American Academy of Dermatology — Non-melanoma skin cancer guidelines",
      url: "https://www.aad.org/guidelines/nmsc"
    }
  ],
  "lentigo-maligna": [
    {
      title: "EADO — Melanoma treatment guideline, 2024 update",
      url: "https://eado.org/files/2025/01/2024-EADO-CMGuideline-Treatment-EJC.pdf"
    }
  ],
    "actinic-cheilitis": [
    {
      title: "DermNet — Actinic cheilitis",
      url: "https://dermnetnz.org/topics/actinic-cheilitis"
    }
  ],
  keratoacanthoma: [
    {
      title: "DermNet — Keratoacanthoma",
      url: "https://dermnetnz.org/topics/keratoacanthoma"
    }
  ],
  "lentigo-maligna-melanoma": [
    {
      title: "DermNet — Lentigo maligna and lentigo maligna melanoma",
      url: "https://dermnetnz.org/topics/lentigo-maligna-and-lentigo-maligna-melanoma"
    }
  ],
  "merkel-cell-carcinoma": [
    {
      title: "American Academy of Dermatology — Merkel cell carcinoma",
      url: "https://www.aad.org/public/diseases/skin-cancer/types/common/merkel-cell"
    }
  ],
  "sebaceous-carcinoma": [
    {
      title: "DermNet — Sebaceous carcinoma",
      url: "https://dermnetnz.org/topics/sebaceous-carcinoma"
    }
  ],
  dfsp: [
    {
      title: "DermNet — Dermatofibrosarcoma protuberans",
      url: "https://dermnetnz.org/topics/dermatofibrosarcoma-protuberans"
    }
  ],
  "atypical-fibroxanthoma": [
    {
      title: "DermNet — Atypical fibroxanthoma",
      url: "https://dermnetnz.org/topics/atypical-fibroxanthoma"
    }
  ],
  "pleomorphic-dermal-sarcoma": [
    {
      title: "DermNet — Pleomorphic dermal sarcoma",
      url: "https://dermnetnz.org/topics/pleomorphic-dermal-sarcoma"
    }
  ],
  "cutaneous-angiosarcoma": [
    {
      title: "DermNet — Angiosarcoma",
      url: "https://dermnetnz.org/topics/angiosarcoma"
    }
  ],
  "kaposi-sarcoma": [
    {
      title: "DermNet — Kaposi sarcoma",
      url: "https://dermnetnz.org/topics/kaposi-sarcoma"
    }
  ],
  "extramammary-paget": [
    {
      title: "DermNet — Extramammary Paget disease",
      url: "https://dermnetnz.org/topics/extramammary-paget-disease"
    }
  ],
  "microcystic-adnexal-carcinoma": [
    {
      title: "DermNet — Microcystic adnexal carcinoma",
      url: "https://dermnetnz.org/topics/microcystic-adnexal-carcinoma"
    }
  ]
};


function createCards(list) {

  const cards = document.getElementById("cards");

  cards.innerHTML = "";

  list.forEach(disease => {

    const card = document.createElement("div");

    card.className = "card";

    card.onclick = () => showDisease(disease.id);

    card.innerHTML = `
      <h3>${disease.name}</h3>
      <p>${disease.description}</p>
      <span class="icd">ICD-10: ${disease.icd}</span>
    `;

    cards.appendChild(card);

  });

}


function filterDiseases() {

  const input =
    document.getElementById("searchInput")
      .value
      .toLowerCase();

  const results = diseases.filter(disease =>

    disease.name.toLowerCase().includes(input) ||

    disease.alternative.toLowerCase().includes(input) ||

    disease.icd.toLowerCase().includes(input)

  );

  createCards(results);

  document.getElementById("noResult").style.display =
    results.length === 0 ? "block" : "none";

  const details = document.getElementById("details");

  details.style.display = "none";


  
  details.innerHTML = "";

}


function showDisease(id) {

  const disease =
    diseases.find(item => item.id === id);

  const details =
    document.getElementById("details");
  
    const referenceItems = (diseaseReferences[disease.id] || [])
    .map(reference =>
      `<li><a href="${reference.url}" target="_blank" rel="noopener noreferrer">${reference.title}</a></li>`
    )
    .join("");

  details.innerHTML = `

    <h2>${disease.name}</h2>

    <span class="icd">
      ICD-10: ${disease.icd}
    </span>

    <div class="detail-section">
      <h4>Overview</h4>
      <p>${disease.description}</p>
    </div>

    <div class="detail-section">
      <h4>Clinical Features</h4>
      <p>${disease.clinical}</p>
    </div>

    <div class="detail-section">
      <h4>Dermoscopy</h4>
      <p>${disease.dermoscopy}</p>
    </div>

    <div class="detail-section">
      <h4>Differential Diagnosis</h4>
      <p>${disease.differential}</p>
    </div>

    <div class="detail-section">
      <h4>Treatment Overview</h4>
      <p>${disease.treatment}</p>
    </div>

    <div class="detail-section">
      <h4>Follow-up</h4>
      <p>${disease.followup}</p>
    </div>
    <div class="detail-section">
      <h4>References</h4>
      <ul>
        ${referenceItems}
      </ul>
    </div>
  `;

  details.style.display = "block";

  details.scrollIntoView({
    behavior: "smooth"
  });

}


createCards(diseases);
