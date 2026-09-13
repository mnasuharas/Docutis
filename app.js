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
