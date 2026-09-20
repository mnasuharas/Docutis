# Goal 9 consolidated human clinical-review gate

Generated from the repository on 2026-09-20. This packet contains no approval and must not be interpreted as physician review.

## Reviewer identity and consent

Complete these fields once for the whole batch. Use the exact professional role; do not upgrade training status or credentials.

- Public display name:
- Professional role (example: `Physician — Dermatology resident`):
- Specialty or field:
- Training status (optional):
- Jurisdiction/country (optional):
- Public disclosure or conflict-of-interest statement (optional):
- Consent to public display of the fields above: `yes` / `no`
- Review date (`YYYY-MM-DD`):

Do not enter contact details, licence numbers, signatures, addresses, or private identity evidence in repository files.

## Required attestation

> I confirm that I am a human reviewer and that I assessed only the content versions and sections identified by the recorded fingerprints. My decisions apply only to the recorded scope. Clinically meaningful future changes may invalidate the decisions. This educational governance review does not make Docutis an individual diagnostic or treatment service and does not guarantee completeness or universal applicability.

Attestation version: `docutis-human-clinical-review-v1`

For every review unit, select exactly one verdict: `approved`, `approved_with_minor_corrections`, `changes_requested`, `not_reviewed`, or `not_applicable`. Record reviewed sections, evidence sources actually checked, required corrections, replacement wording where applicable, and concise public notes. Related assets require independent decisions.

## disease: Actinic Keratosis (`actinic-keratosis`)

- **Exact fingerprint:** `sha256-v1:7d1cfae0f3511337e27e43e9872efc75d515a88f83ce1a17edcee839b63c93d5`
- **Schema version:** 1
- **Reviewable sections:** `overview`, `clinical-presentation`, `diagnostics`, `dermoscopy`, `differential-diagnosis`, `treatment`, `follow-up`, `coding`, `references`, `red-flags`, `referral`, `patient-safety`
- **Mapped evidence sources:**
  - https://dermnetnz.org/topics/actinic-keratosis
  - https://www.aad.org/member/clinical-quality/guidelines/actinic-keratosis
- **Automated warnings:**
  - No structured medication regimen or dose is encoded; confirm that the scope is sufficiently explicit.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "reviewStatus": "clinician review required",
  "clinicalReview": null,
  "id": "actinic-keratosis",
  "name": "Actinic Keratosis",
  "alternative": "AK; solar keratosis",
  "category": "premalignant",
  "subcategory": "premalignant-keratinocytic",
  "coding": {
    "diagnoses": [
      {
        "system": "ICD-10 WHO",
        "version": "2019",
        "code": "L57.0",
        "label": "Actinic keratosis",
        "note": null
      }
    ],
    "icdo": null,
    "icdoApplicability": "not established",
    "verificationNote": "Confirm national modification and site-specific documentation requirements before clinical or billing use."
  },
  "description": "A UV-induced keratinocytic lesion on chronically sun-exposed skin with potential to progress to cutaneous squamous cell carcinoma.",
  "clinical": "Usually a rough, scaly or hyperkeratotic macule, papule or plaque on chronically sun-damaged skin; lesions may be easier to feel than see.",
  "dermoscopy": "Facial lesions may show an erythematous pseudonetwork or strawberry pattern, prominent follicular openings and surface scale.",
  "differential": "Squamous cell carcinoma in situ, invasive cutaneous squamous cell carcinoma, seborrhoeic keratosis, superficial basal cell carcinoma and inflammatory dermatoses.",
  "treatment": "Management may be lesion-directed or field-directed. Selection depends on lesion burden, site, patient factors and current guidance; diagnostic uncertainty or concern for invasion warrants biopsy or specialist assessment.",
  "followup": "Reassess persistent, recurrent, thickened, tender or rapidly changing lesions and account for the patient's overall actinic damage and skin-cancer risk.",
  "clinicalProfile": {
    "schemaVersion": 1,
    "aliases": [
      "AK",
      "solar keratosis"
    ],
    "etiology": {
      "mechanisms": [
        "uv-associated"
      ],
      "text": "UV-associated keratinocytic lesion on chronically sun-damaged skin."
    },
    "presentation": {
      "morphology": {
        "primaryLesions": [
          "macule",
          "papule",
          "plaque"
        ],
        "secondaryChanges": [
          "scale",
          "hyperkeratosis"
        ],
        "surface": [
          "rough"
        ],
        "text": "Lesions may be easier to feel than see."
      },
      "localization": {
        "sites": [
          "sun-exposed-skin"
        ],
        "distribution": [
          "photo-distributed"
        ],
        "text": "Chronically sun-exposed skin."
      },
      "course": {
        "values": [
          "chronic"
        ],
        "text": "May persist, recur or change over time."
      }
    },
    "dermoscopy": {
      "patterns": [
        "facial erythematous pseudonetwork",
        "strawberry pattern"
      ],
      "scaleKeratinClues": [
        "prominent follicular openings",
        "surface scale"
      ]
    },
    "diagnostics": [
      {
        "method": "clinical-examination",
        "role": "routine",
        "indication": "Assess morphology, lesion burden and surrounding actinic damage."
      },
      {
        "method": "biopsy",
        "role": "unclear-cases",
        "indication": "Diagnostic uncertainty or concern for invasive cutaneous squamous cell carcinoma.",
        "sourceUrls": [
          "https://www.aad.org/member/clinical-quality/guidelines/actinic-keratosis"
        ]
      }
    ],
    "differentials": [
      {
        "diagnosis": "Squamous cell carcinoma in situ"
      },
      {
        "diagnosis": "Invasive cutaneous squamous cell carcinoma",
        "distinguishingClue": "Consider biopsy for a persistent, thickened, tender or rapidly changing lesion."
      },
      {
        "diagnosis": "Seborrhoeic keratosis"
      },
      {
        "diagnosis": "Superficial basal cell carcinoma"
      },
      {
        "diagnosis": "Inflammatory dermatosis"
      }
    ],
    "treatment": {
      "steps": [
        {
          "level": "first-line",
          "interventions": [
            {
              "intervention": "Select lesion-directed or field-directed therapy according to lesion burden, site, patient factors and current guidance.",
              "sourceUrls": [
                "https://www.aad.org/member/clinical-quality/guidelines/actinic-keratosis"
              ]
            }
          ]
        },
        {
          "level": "procedural",
          "interventions": [
            {
              "intervention": "Biopsy or specialist assessment when diagnosis is uncertain or invasion is a concern."
            }
          ]
        },
        {
          "level": "supportive-care",
          "interventions": [
            {
              "intervention": "UV protection and management of field cancerization risk.",
              "sourceUrls": [
                "https://www.aad.org/member/clinical-quality/guidelines/actinic-keratosis"
              ]
            }
          ]
        }
      ],
      "nonPharmacological": [
        "UV protection"
      ]
    },
    "followUp": {
      "strategy": "risk-adapted",
      "text": "Reassess persistent, recurrent, thickened, tender or rapidly changing lesions and consider overall actinic damage and skin-cancer risk."
    },
    "redFlags": [
      "Persistent thickening",
      "Tenderness",
      "Rapid change",
      "Concern for invasion"
    ],
    "referral": [
      {
        "type": "biopsy-assessment",
        "indication": "Uncertain diagnosis or suspected invasive disease."
      }
    ],
    "patientCounseling": [
      "Use consistent sun protection and report persistent or changing lesions."
    ],
    "evidenceMap": {
      "presentation": [
        "https://dermnetnz.org/topics/actinic-keratosis"
      ],
      "dermoscopy": [
        "https://dermnetnz.org/topics/actinic-keratosis"
      ],
      "diagnostics": [
        "https://www.aad.org/member/clinical-quality/guidelines/actinic-keratosis"
      ],
      "differentials": [
        "https://dermnetnz.org/topics/actinic-keratosis"
      ],
      "treatment": [
        "https://www.aad.org/member/clinical-quality/guidelines/actinic-keratosis"
      ],
      "followUp": [
        "https://www.aad.org/member/clinical-quality/guidelines/actinic-keratosis"
      ],
      "redFlags": [
        "https://www.aad.org/member/clinical-quality/guidelines/actinic-keratosis"
      ]
    },
    "sourceUrls": [
      "https://www.aad.org/member/clinical-quality/guidelines/actinic-keratosis",
      "https://dermnetnz.org/topics/actinic-keratosis"
    ]
  },
  "references": [
    {
      "title": "Actinic keratosis clinical guideline",
      "organization": "American Academy of Dermatology",
      "type": "guideline",
      "year": null,
      "version": null,
      "url": "https://www.aad.org/member/clinical-quality/guidelines/actinic-keratosis",
      "doi": null,
      "metadataCheckedAt": "2026-09-20"
    },
    {
      "title": "ICD-10 Version: 2019",
      "organization": "World Health Organization",
      "type": "official classification",
      "year": null,
      "version": "2019",
      "url": "https://icd.who.int/browse10/2019/en",
      "doi": null,
      "metadataCheckedAt": "2026-09-15"
    },
    {
      "title": "WHO Classification of Skin Tumours, fifth edition",
      "organization": "WHO Classification of Tumours Editorial Board / IARC",
      "type": "official classification",
      "year": 2025,
      "version": "5th edition",
      "url": "https://whobluebooks.iarc.who.int/structures/skintumours/",
      "doi": null,
      "metadataCheckedAt": "2026-09-15"
    },
    {
      "title": "Actinic keratosis",
      "organization": "DermNet",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://dermnetnz.org/topics/actinic-keratosis",
      "doi": null,
      "metadataCheckedAt": "2026-09-20"
    }
  ]
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## disease: Basal Cell Carcinoma (`basal-cell-carcinoma`)

- **Exact fingerprint:** `sha256-v1:976b1e3e91f8eeb8c76032b3986edebcf4d2d1fac7c30ff6d1b722d2b5221ca9`
- **Schema version:** 1
- **Reviewable sections:** `overview`, `clinical-presentation`, `diagnostics`, `dermoscopy`, `differential-diagnosis`, `treatment`, `follow-up`, `coding`, `references`, `histopathology`, `referral`, `oncology`
- **Mapped evidence sources:**
  - https://dermnetnz.org/topics/basal-cell-carcinoma
  - https://www.aad.org/member/clinical-quality/guidelines/bcc
- **Automated warnings:**
  - No structured medication regimen or dose is encoded; confirm that the scope is sufficiently explicit.
  - No structured localization object is present; assess whether the prose is sufficient.
  - No separate structured red-flag list is present.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "reviewStatus": "clinician review required",
  "clinicalReview": null,
  "id": "basal-cell-carcinoma",
  "name": "Basal Cell Carcinoma",
  "alternative": "BCC",
  "category": "keratinocytic",
  "subcategory": "keratinocytic-carcinoma",
  "coding": {
    "diagnoses": [
      {
        "system": "ICD-10 WHO",
        "version": "2019",
        "code": "C44",
        "label": "Other malignant neoplasms of skin",
        "note": "Assign the fourth character from the documented anatomic site."
      }
    ],
    "icdo": {
      "system": "ICD-O",
      "version": "3.2",
      "topography": {
        "code": "C44._",
        "label": "Skin",
        "note": "Assign the fourth character from the documented primary anatomic site."
      },
      "morphologies": [
        {
          "code": "8090/3",
          "label": "Basal cell carcinoma, NOS",
          "note": "Use the morphology that matches the final pathology."
        }
      ]
    },
    "icdoApplicability": "applicable",
    "verificationNote": null
  },
  "description": "A common keratinocyte carcinoma characterized by locally invasive growth and very low metastatic potential.",
  "clinical": "Presentation varies by subtype and may include a pearly or translucent papule, telangiectasia, ulceration, crusting, or a slowly enlarging plaque.",
  "dermoscopy": "Possible findings include arborising vessels, blue-grey ovoid nests, leaf-like structures, spoke-wheel areas and ulceration.",
  "differential": "Cutaneous squamous cell carcinoma, actinic keratosis, melanocytic lesions, sebaceous hyperplasia and other benign or malignant tumors.",
  "treatment": "Risk stratification incorporates site, size, borders, histologic subtype and recurrence status. Surgery is the mainstay; selected low-risk tumors or patients unable to undergo surgery may be considered for other modalities under current guidance.",
  "followup": "Follow-up is risk-adapted and includes surveillance for recurrence and additional primary skin cancers.",
  "clinicalProfile": {
    "schemaVersion": 1,
    "aliases": [
      "BCC"
    ],
    "etiology": {
      "mechanisms": [
        "neoplastic"
      ],
      "text": "Locally invasive keratinocyte carcinoma with very low metastatic potential."
    },
    "presentation": {
      "morphology": {
        "primaryLesions": [
          "papule",
          "plaque"
        ],
        "secondaryChanges": [
          "ulcer",
          "crust"
        ],
        "colors": [
          "pearly",
          "translucent"
        ],
        "surface": [
          "telangiectatic"
        ],
        "text": "Morphology varies by subtype."
      },
      "course": {
        "values": [
          "chronic",
          "progressive"
        ],
        "text": "Typically slowly enlarging."
      }
    },
    "dermoscopy": {
      "vascularStructures": [
        "arborising vessels"
      ],
      "pigmentStructures": [
        "blue-grey ovoid nests",
        "leaf-like structures",
        "spoke-wheel areas"
      ],
      "highRiskClues": [
        "ulceration"
      ]
    },
    "diagnostics": [
      {
        "method": "clinical-examination",
        "role": "routine",
        "indication": "Assess anatomic site, size, borders, recurrence status and clinical subtype."
      },
      {
        "method": "biopsy",
        "role": "confirmatory",
        "indication": "Obtain tissue adequate for diagnosis and management planning.",
        "sourceUrls": [
          "https://www.aad.org/member/clinical-quality/guidelines/bcc"
        ]
      },
      {
        "method": "histopathology",
        "role": "confirmatory",
        "indication": "Establish histologic subtype and other risk-relevant pathologic features."
      }
    ],
    "histopathology": "Histologic subtype is a component of risk stratification and should be documented from the pathology report.",
    "differentials": [
      {
        "diagnosis": "Cutaneous squamous cell carcinoma"
      },
      {
        "diagnosis": "Actinic keratosis"
      },
      {
        "diagnosis": "Melanocytic lesion"
      },
      {
        "diagnosis": "Sebaceous hyperplasia"
      },
      {
        "diagnosis": "Other benign or malignant tumor"
      }
    ],
    "treatment": {
      "steps": [
        {
          "level": "first-line",
          "interventions": [
            {
              "intervention": "Surgical treatment selected according to tumor and patient risk.",
              "sourceUrls": [
                "https://www.aad.org/member/clinical-quality/guidelines/bcc"
              ]
            }
          ]
        },
        {
          "level": "second-line-or-alternative",
          "interventions": [
            {
              "intervention": "Consider nonsurgical modalities only for selected low-risk tumors or when surgery is contraindicated; cure rates are lower than with surgery.",
              "sourceUrls": [
                "https://www.aad.org/member/clinical-quality/guidelines/bcc"
              ]
            }
          ]
        }
      ]
    },
    "followUp": {
      "strategy": "cancer-surveillance",
      "text": "Risk-adapted surveillance for recurrence and additional primary skin cancers."
    },
    "referral": [
      {
        "type": "biopsy-assessment",
        "indication": "Suspected BCC requiring tissue diagnosis and risk characterization."
      },
      {
        "type": "surgery",
        "indication": "Definitive treatment planning, particularly for higher-risk tumors."
      }
    ],
    "oncology": {
      "riskClassification": "Incorporate site, size, borders, histologic subtype and recurrence status.",
      "histologicSubtype": "Document the final pathology subtype.",
      "recurrenceMetastasis": "Follow-up includes recurrence surveillance; metastatic potential is very low but locally invasive growth can be destructive."
    },
    "evidenceMap": {
      "presentation": [
        "https://dermnetnz.org/topics/basal-cell-carcinoma"
      ],
      "dermoscopy": [
        "https://dermnetnz.org/topics/basal-cell-carcinoma"
      ],
      "diagnostics": [
        "https://www.aad.org/member/clinical-quality/guidelines/bcc"
      ],
      "differentials": [
        "https://dermnetnz.org/topics/basal-cell-carcinoma"
      ],
      "treatment": [
        "https://www.aad.org/member/clinical-quality/guidelines/bcc"
      ],
      "followUp": [
        "https://www.aad.org/member/clinical-quality/guidelines/bcc"
      ],
      "oncology": [
        "https://www.aad.org/member/clinical-quality/guidelines/bcc"
      ]
    },
    "sourceUrls": [
      "https://www.aad.org/member/clinical-quality/guidelines/bcc",
      "https://dermnetnz.org/topics/basal-cell-carcinoma"
    ]
  },
  "references": [
    {
      "title": "Basal cell carcinoma clinical guideline",
      "organization": "American Academy of Dermatology",
      "type": "guideline",
      "year": null,
      "version": null,
      "url": "https://www.aad.org/member/clinical-quality/guidelines/bcc",
      "doi": null,
      "metadataCheckedAt": "2026-09-20"
    },
    {
      "title": "ICD-10 Version: 2019",
      "organization": "World Health Organization",
      "type": "official classification",
      "year": null,
      "version": "2019",
      "url": "https://icd.who.int/browse10/2019/en",
      "doi": null,
      "metadataCheckedAt": "2026-09-15"
    },
    {
      "title": "International Classification of Diseases for Oncology, Third Edition, Second Revision",
      "organization": "World Health Organization / International Agency for Research on Cancer",
      "type": "official classification",
      "year": 2019,
      "version": "ICD-O-3.2",
      "url": "https://www.who.int/standards/classifications/other-classifications/international-classification-of-diseases-for-oncology",
      "doi": null,
      "metadataCheckedAt": "2026-09-15"
    },
    {
      "title": "WHO Classification of Skin Tumours, fifth edition",
      "organization": "WHO Classification of Tumours Editorial Board / IARC",
      "type": "official classification",
      "year": 2025,
      "version": "5th edition",
      "url": "https://whobluebooks.iarc.who.int/structures/skintumours/",
      "doi": null,
      "metadataCheckedAt": "2026-09-15"
    },
    {
      "title": "Basal cell carcinoma",
      "organization": "DermNet",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://dermnetnz.org/topics/basal-cell-carcinoma",
      "doi": null,
      "metadataCheckedAt": "2026-09-20"
    }
  ]
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## disease: Cutaneous Melanoma (`cutaneous-melanoma`)

- **Exact fingerprint:** `sha256-v1:80d9ddc08809c1c99513adc9972d5bf625331f7b97ff53339303e50c614facbe`
- **Schema version:** 1
- **Reviewable sections:** `overview`, `clinical-presentation`, `diagnostics`, `dermoscopy`, `differential-diagnosis`, `treatment`, `follow-up`, `coding`, `references`, `histopathology`, `red-flags`, `referral`, `oncology`
- **Mapped evidence sources:**
  - https://pubmed.ncbi.nlm.nih.gov/39700658/
  - https://pubmed.ncbi.nlm.nih.gov/39709737/
  - https://www.cancer.gov/types/skin/hp/melanoma-treatment-pdq
- **Automated warnings:**
  - No structured medication regimen or dose is encoded; confirm that the scope is sufficiently explicit.
  - No structured localization object is present; assess whether the prose is sufficient.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "reviewStatus": "clinician review required",
  "clinicalReview": null,
  "id": "cutaneous-melanoma",
  "name": "Cutaneous Melanoma",
  "alternative": "Malignant melanoma of skin",
  "category": "melanocytic",
  "subcategory": "melanoma",
  "coding": {
    "diagnoses": [
      {
        "system": "ICD-10 WHO",
        "version": "2019",
        "code": "C43",
        "label": "Malignant melanoma of skin",
        "note": "Assign the fourth character from the documented anatomic site."
      }
    ],
    "icdo": {
      "system": "ICD-O",
      "version": "3.2",
      "topography": {
        "code": "C44._",
        "label": "Skin",
        "note": "ICD-O records melanoma histology separately; assign topography from the documented primary skin site."
      },
      "morphologies": [
        {
          "code": "8720/3",
          "label": "Malignant melanoma, NOS",
          "note": "Use only when a more specific pathologic subtype is not assigned."
        }
      ]
    },
    "icdoApplicability": "applicable",
    "verificationNote": null
  },
  "description": "A malignant melanocytic neoplasm with metastatic potential; prognosis is strongly related to stage at diagnosis.",
  "clinical": "Suspicious features may include asymmetry, border irregularity, color variation, evolution over time or a lesion unlike the patient's other nevi; some melanomas are amelanotic.",
  "dermoscopy": "Patterns vary by subtype and may include asymmetry of structures and colors, atypical network, irregular dots or globules, atypical streaks, regression structures and atypical vessels.",
  "differential": "Melanocytic nevus, seborrhoeic keratosis, pigmented basal cell carcinoma and other pigmented or amelanotic lesions.",
  "treatment": "Excision and histopathologic staging underpin management of localized primary melanoma. Further surgery, nodal assessment and systemic therapy decisions depend on stage and current specialist guidance.",
  "followup": "Surveillance intensity is stage- and risk-dependent and should follow current national or international melanoma guidance.",
  "clinicalProfile": {
    "schemaVersion": 1,
    "aliases": [
      "malignant melanoma of skin"
    ],
    "etiology": {
      "mechanisms": [
        "neoplastic"
      ],
      "text": "Malignant melanocytic neoplasm with metastatic potential."
    },
    "presentation": {
      "morphology": {
        "colors": [
          "variable pigmentation",
          "amelanotic presentation possible"
        ],
        "border": [
          "irregular"
        ],
        "configuration": [
          "asymmetric"
        ],
        "text": "Evolution or a lesion unlike the patient's other nevi is concerning."
      },
      "course": {
        "values": [
          "progressive"
        ],
        "text": "Evolution over time is a suspicious clinical feature."
      }
    },
    "dermoscopy": {
      "patterns": [
        "asymmetry of structures and colors",
        "multicomponent pattern"
      ],
      "vascularStructures": [
        "atypical vessels"
      ],
      "pigmentStructures": [
        "atypical network",
        "irregular dots or globules",
        "atypical streaks",
        "regression structures"
      ],
      "highRiskClues": [
        "asymmetry",
        "atypical vessels"
      ]
    },
    "diagnostics": [
      {
        "method": "clinical-examination",
        "role": "routine",
        "indication": "Assess asymmetry, border, color, evolution and outlier appearance."
      },
      {
        "method": "dermoscopy",
        "role": "routine",
        "indication": "Evaluate a clinically suspicious melanocytic or amelanotic lesion.",
        "sourceUrls": [
          "https://pubmed.ncbi.nlm.nih.gov/39700658/"
        ]
      },
      {
        "method": "biopsy",
        "role": "confirmatory",
        "indication": "Suspected melanoma requires tissue sampling planned for accurate histopathologic diagnosis and staging.",
        "sourceUrls": [
          "https://pubmed.ncbi.nlm.nih.gov/39700658/"
        ]
      },
      {
        "method": "histopathology",
        "role": "staging",
        "indication": "Confirm melanoma and establish pathologic features needed for stage-based management."
      }
    ],
    "histopathology": "Histopathologic confirmation and staging are required before stage-directed management.",
    "differentials": [
      {
        "diagnosis": "Melanocytic nevus"
      },
      {
        "diagnosis": "Seborrhoeic keratosis"
      },
      {
        "diagnosis": "Pigmented basal cell carcinoma"
      },
      {
        "diagnosis": "Other pigmented or amelanotic lesion"
      }
    ],
    "treatment": {
      "steps": [
        {
          "level": "procedural",
          "interventions": [
            {
              "intervention": "Complete excision and histopathologic staging for localized primary melanoma.",
              "sourceUrls": [
                "https://pubmed.ncbi.nlm.nih.gov/39709737/"
              ]
            }
          ]
        },
        {
          "level": "refractory-or-severe",
          "interventions": [
            {
              "intervention": "Further surgery, nodal assessment and systemic therapy decisions are stage-dependent and require specialist guidance.",
              "sourceUrls": [
                "https://pubmed.ncbi.nlm.nih.gov/39709737/"
              ]
            }
          ]
        }
      ]
    },
    "followUp": {
      "strategy": "guideline-defined",
      "text": "Use the existing dedicated stage- and risk-based melanoma follow-up protocol; this profile does not duplicate or replace its intervals."
    },
    "redFlags": [
      "Evolution",
      "Marked asymmetry",
      "Irregular border",
      "Color variation",
      "A lesion unlike the patient's other nevi",
      "Amelanotic suspicious lesion"
    ],
    "referral": [
      {
        "type": "biopsy-assessment",
        "indication": "Clinically or dermoscopically suspicious lesion."
      },
      {
        "type": "oncology",
        "indication": "Stage-directed nodal, adjuvant or systemic treatment assessment when indicated."
      }
    ],
    "oncology": {
      "staging": "Histopathologic stage directs subsequent management.",
      "sentinelNode": "Nodal assessment depends on tumor stage and current specialist guidance.",
      "systemicTherapyReferral": "Systemic treatment decisions are stage-dependent and multidisciplinary.",
      "recurrenceMetastasis": "Surveillance intensity is stage- and risk-dependent."
    },
    "evidenceMap": {
      "presentation": [
        "https://pubmed.ncbi.nlm.nih.gov/39700658/"
      ],
      "dermoscopy": [
        "https://pubmed.ncbi.nlm.nih.gov/39700658/"
      ],
      "diagnostics": [
        "https://pubmed.ncbi.nlm.nih.gov/39700658/"
      ],
      "differentials": [
        "https://pubmed.ncbi.nlm.nih.gov/39700658/"
      ],
      "treatment": [
        "https://pubmed.ncbi.nlm.nih.gov/39709737/"
      ],
      "followUp": [
        "https://pubmed.ncbi.nlm.nih.gov/39709737/",
        "https://www.cancer.gov/types/skin/hp/melanoma-treatment-pdq"
      ],
      "redFlags": [
        "https://pubmed.ncbi.nlm.nih.gov/39700658/"
      ],
      "oncology": [
        "https://pubmed.ncbi.nlm.nih.gov/39709737/",
        "https://www.cancer.gov/types/skin/hp/melanoma-treatment-pdq"
      ]
    },
    "sourceUrls": [
      "https://pubmed.ncbi.nlm.nih.gov/39700658/",
      "https://pubmed.ncbi.nlm.nih.gov/39709737/",
      "https://www.cancer.gov/types/skin/hp/melanoma-treatment-pdq"
    ]
  },
  "references": [
    {
      "title": "European consensus-based interdisciplinary guideline for melanoma. Part 1: Diagnostics — Update 2024",
      "organization": "EADO / EDF / EORTC",
      "type": "guideline",
      "year": 2025,
      "version": "2024 update; part 1",
      "url": "https://pubmed.ncbi.nlm.nih.gov/39700658/",
      "doi": "10.1016/j.ejca.2024.115152",
      "metadataCheckedAt": "2026-09-20"
    },
    {
      "title": "European consensus-based interdisciplinary guideline for melanoma. Part 2: Treatment — Update 2024",
      "organization": "EADO / EDF / EORTC",
      "type": "guideline",
      "year": 2025,
      "version": "2024 update; part 2",
      "url": "https://pubmed.ncbi.nlm.nih.gov/39709737/",
      "doi": "10.1016/j.ejca.2024.115153",
      "metadataCheckedAt": "2026-09-20"
    },
    {
      "title": "Melanoma Treatment (PDQ®) — Health Professional Version",
      "organization": "National Cancer Institute",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://www.cancer.gov/types/skin/hp/melanoma-treatment-pdq",
      "doi": null,
      "metadataCheckedAt": "2026-09-20"
    },
    {
      "title": "ICD-10 Version: 2019",
      "organization": "World Health Organization",
      "type": "official classification",
      "year": null,
      "version": "2019",
      "url": "https://icd.who.int/browse10/2019/en",
      "doi": null,
      "metadataCheckedAt": "2026-09-15"
    },
    {
      "title": "International Classification of Diseases for Oncology, Third Edition, Second Revision",
      "organization": "World Health Organization / International Agency for Research on Cancer",
      "type": "official classification",
      "year": 2019,
      "version": "ICD-O-3.2",
      "url": "https://www.who.int/standards/classifications/other-classifications/international-classification-of-diseases-for-oncology",
      "doi": null,
      "metadataCheckedAt": "2026-09-15"
    },
    {
      "title": "WHO Classification of Skin Tumours, fifth edition",
      "organization": "WHO Classification of Tumours Editorial Board / IARC",
      "type": "official classification",
      "year": 2025,
      "version": "5th edition",
      "url": "https://whobluebooks.iarc.who.int/structures/skintumours/",
      "doi": null,
      "metadataCheckedAt": "2026-09-15"
    }
  ]
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## disease: Atopic Dermatitis (`atopic-dermatitis`)

- **Exact fingerprint:** `sha256-v1:f4c9fe56147923b8e0fd25d36dd06851b672707e72721bad398b31c7e48d5f35`
- **Schema version:** 1
- **Reviewable sections:** `overview`, `clinical-presentation`, `diagnostics`, `dermoscopy`, `differential-diagnosis`, `treatment`, `follow-up`, `coding`, `references`, `red-flags`, `referral`, `patient-safety`
- **Mapped evidence sources:**
  - https://dermnetnz.org/topics/atopic-dermatitis
  - https://pubmed.ncbi.nlm.nih.gov/36641009/
  - https://pubmed.ncbi.nlm.nih.gov/37943240/
- **Automated warnings:**
  - No structured medication regimen or dose is encoded; confirm that the scope is sufficiently explicit.
  - No structured localization object is present; assess whether the prose is sufficient.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "reviewStatus": "clinician review required",
  "clinicalReview": null,
  "id": "atopic-dermatitis",
  "name": "Atopic Dermatitis",
  "alternative": "Atopic eczema; eczema",
  "category": "inflammatory-eczematous",
  "subcategory": "eczematous-dermatitis",
  "coding": {
    "diagnoses": [
      {
        "system": "ICD-10 WHO",
        "version": "2019",
        "code": "L20",
        "label": "Atopic dermatitis",
        "note": null
      }
    ],
    "icdo": null,
    "icdoApplicability": "not applicable",
    "verificationNote": "ICD-10 WHO provides more specific fourth-character categories; select one only when the documented phenotype supports it and keep national modifications separate."
  },
  "description": "A chronic, relapsing, pruritic inflammatory skin disease with epidermal barrier dysfunction and age-dependent patterns of involvement.",
  "clinical": "Pruritus and xerosis are prominent. Erythematous or skin-colored eczematous lesions may become excoriated, lichenified or secondarily infected; distribution and appearance vary with age and skin tone.",
  "dermoscopy": "Dermoscopy is not routinely required for diagnosis; any vascular or scaling findings are nonspecific and must be interpreted with the clinical pattern.",
  "differential": "Allergic or irritant contact dermatitis, seborrheic dermatitis, psoriasis, scabies, cutaneous infection and, in persistent atypical adult disease, cutaneous T-cell lymphoma.",
  "treatment": "Management combines regular moisturization, avoidance of confirmed aggravating exposures and appropriately selected topical anti-inflammatory therapy. Phototherapy or systemic treatment may be considered for inadequately controlled moderate-to-severe disease after age, comorbidities, contraindications and monitoring needs are assessed.",
  "followup": "Reassess disease control, sleep and quality-of-life impact, treatment burden, adherence and signs of infection. Persistent, severe or diagnostically atypical disease warrants specialist review.",
  "clinicalProfile": {
    "schemaVersion": 1,
    "aliases": [
      "atopic eczema",
      "eczema"
    ],
    "etiology": {
      "mechanisms": [
        "inflammatory",
        "barrier-dysfunction"
      ],
      "text": "Chronic inflammatory disease with epidermal barrier dysfunction."
    },
    "presentation": {
      "morphology": {
        "secondaryChanges": [
          "excoriation",
          "lichenification"
        ],
        "colors": [
          "erythematous or skin-colored"
        ],
        "text": "Eczematous lesions may become excoriated, lichenified or secondarily infected; appearance varies with skin tone."
      },
      "symptoms": {
        "values": [
          "pruritic"
        ],
        "text": "Pruritus and xerosis are prominent."
      },
      "course": {
        "values": [
          "chronic",
          "recurrent"
        ],
        "text": "Chronic relapsing course."
      }
    },
    "dermoscopy": {
      "text": "Dermoscopy is not routinely required; vascular or scaling findings are nonspecific and must be interpreted with the clinical pattern."
    },
    "diagnostics": [
      {
        "method": "clinical-examination",
        "role": "routine",
        "indication": "Assess morphology, age-dependent distribution, pruritus, xerosis, infection and disease burden."
      },
      {
        "method": "other",
        "role": "severe-or-atypical",
        "indication": "Persistent, severe or diagnostically atypical disease requires specialist diagnostic review."
      }
    ],
    "differentials": [
      {
        "diagnosis": "Allergic or irritant contact dermatitis"
      },
      {
        "diagnosis": "Seborrheic dermatitis"
      },
      {
        "diagnosis": "Psoriasis"
      },
      {
        "diagnosis": "Scabies"
      },
      {
        "diagnosis": "Cutaneous infection"
      },
      {
        "diagnosis": "Cutaneous T-cell lymphoma",
        "distinguishingClue": "Consider in persistent atypical adult disease."
      }
    ],
    "treatment": {
      "steps": [
        {
          "level": "first-line",
          "interventions": [
            {
              "intervention": "Regular moisturization and appropriately selected topical anti-inflammatory therapy.",
              "sourceUrls": [
                "https://pubmed.ncbi.nlm.nih.gov/36641009/"
              ]
            }
          ]
        },
        {
          "level": "refractory-or-severe",
          "interventions": [
            {
              "intervention": "Consider phototherapy or systemic treatment for inadequately controlled moderate-to-severe disease after age, comorbidities, contraindications and monitoring needs are assessed.",
              "sourceUrls": [
                "https://pubmed.ncbi.nlm.nih.gov/37943240/"
              ]
            }
          ]
        },
        {
          "level": "supportive-care",
          "interventions": [
            {
              "intervention": "Avoid confirmed aggravating exposures and support epidermal barrier care."
            }
          ]
        }
      ],
      "nonPharmacological": [
        "Regular moisturization",
        "Avoidance of confirmed aggravating exposures"
      ]
    },
    "followUp": {
      "strategy": "reassessment-after-treatment",
      "text": "Reassess control, sleep and quality-of-life impact, treatment burden, adherence and signs of infection."
    },
    "redFlags": [
      "Secondary infection",
      "Persistent atypical adult disease",
      "Severe or inadequately controlled disease"
    ],
    "referral": [
      {
        "type": "dermatology",
        "indication": "Persistent, severe or diagnostically atypical disease."
      },
      {
        "type": "systemic-therapy-assessment",
        "indication": "Inadequately controlled moderate-to-severe disease."
      }
    ],
    "patientCounseling": [
      "Use moisturizers regularly and avoid confirmed aggravating exposures."
    ],
    "evidenceMap": {
      "presentation": [
        "https://dermnetnz.org/topics/atopic-dermatitis"
      ],
      "dermoscopy": [
        "https://dermnetnz.org/topics/atopic-dermatitis"
      ],
      "diagnostics": [
        "https://dermnetnz.org/topics/atopic-dermatitis"
      ],
      "differentials": [
        "https://dermnetnz.org/topics/atopic-dermatitis"
      ],
      "treatment": [
        "https://pubmed.ncbi.nlm.nih.gov/36641009/",
        "https://pubmed.ncbi.nlm.nih.gov/37943240/"
      ],
      "followUp": [
        "https://pubmed.ncbi.nlm.nih.gov/36641009/",
        "https://pubmed.ncbi.nlm.nih.gov/37943240/"
      ],
      "redFlags": [
        "https://dermnetnz.org/topics/atopic-dermatitis"
      ]
    },
    "sourceUrls": [
      "https://pubmed.ncbi.nlm.nih.gov/36641009/",
      "https://pubmed.ncbi.nlm.nih.gov/37943240/",
      "https://dermnetnz.org/topics/atopic-dermatitis"
    ]
  },
  "references": [
    {
      "title": "Guidelines of care for the management of atopic dermatitis in adults with topical therapies",
      "organization": "American Academy of Dermatology",
      "type": "guideline",
      "year": 2023,
      "version": null,
      "url": "https://pubmed.ncbi.nlm.nih.gov/36641009/",
      "doi": "10.1016/j.jaad.2022.12.029",
      "metadataCheckedAt": "2026-09-20"
    },
    {
      "title": "Guidelines of care for the management of atopic dermatitis in adults with phototherapy and systemic therapies",
      "organization": "American Academy of Dermatology",
      "type": "guideline",
      "year": 2024,
      "version": null,
      "url": "https://pubmed.ncbi.nlm.nih.gov/37943240/",
      "doi": "10.1016/j.jaad.2023.08.102",
      "metadataCheckedAt": "2026-09-20"
    },
    {
      "title": "ICD-10 Version: 2019",
      "organization": "World Health Organization",
      "type": "official classification",
      "year": null,
      "version": "2019",
      "url": "https://icd.who.int/browse10/2019/en",
      "doi": null,
      "metadataCheckedAt": "2026-09-15"
    },
    {
      "title": "Atopic dermatitis",
      "organization": "DermNet",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://dermnetnz.org/topics/atopic-dermatitis",
      "doi": null,
      "metadataCheckedAt": "2026-09-20"
    }
  ]
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## disease: Plaque Psoriasis (`plaque-psoriasis`)

- **Exact fingerprint:** `sha256-v1:02f24e6fbe331ca09cc4fde5c1357c5163690195636a33d157f03927fcf31339`
- **Schema version:** 1
- **Reviewable sections:** `overview`, `clinical-presentation`, `diagnostics`, `dermoscopy`, `differential-diagnosis`, `treatment`, `follow-up`, `coding`, `references`, `red-flags`, `referral`
- **Mapped evidence sources:**
  - https://dermnetnz.org/topics/psoriasis
  - https://www.aad.org/member/clinical-quality/guidelines/psoriasis
  - https://www.guidelines.edf.one/guidelines/psoriasis-guideline
- **Automated warnings:**
  - No structured medication regimen or dose is encoded; confirm that the scope is sufficiently explicit.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "reviewStatus": "clinician review required",
  "clinicalReview": null,
  "id": "plaque-psoriasis",
  "name": "Plaque Psoriasis",
  "alternative": "Psoriasis vulgaris; chronic plaque psoriasis",
  "category": "inflammatory-eczematous",
  "subcategory": "papulosquamous-disorder",
  "coding": {
    "diagnoses": [
      {
        "system": "ICD-10 WHO",
        "version": "2019",
        "code": "L40.0",
        "label": "Psoriasis vulgaris",
        "note": null
      }
    ],
    "icdo": null,
    "icdoApplicability": "not applicable",
    "verificationNote": "This record is limited to plaque psoriasis; other psoriasis phenotypes have distinct clinical and sometimes coding considerations."
  },
  "description": "The common chronic plaque form of psoriasis, characterized by persistent, well-demarcated inflammatory plaques with scale.",
  "clinical": "Symmetric plaques commonly involve extensor surfaces, scalp and lumbosacral skin, but flexural, genital, palmoplantar and nail involvement may alter appearance and impact. Joint symptoms require assessment for psoriatic arthritis.",
  "dermoscopy": "Regularly distributed dotted vessels on a light red background with diffuse white scale can support the diagnosis, but clinicopathologic correlation is needed when features are atypical.",
  "differential": "Nummular or chronic eczema, seborrheic dermatitis, dermatophyte infection, pityriasis rubra pilaris and cutaneous T-cell lymphoma.",
  "treatment": "Limited plaque disease is often managed with topical therapy selected for site and patient factors. Phototherapy or systemic treatment may be appropriate for extensive, high-impact or inadequately controlled disease; severity, quality of life, comorbidities and psoriatic arthritis influence planning.",
  "followup": "Monitor skin and nail activity, treatment safety and quality-of-life impact, and reassess for inflammatory joint symptoms and relevant comorbidities.",
  "clinicalProfile": {
    "schemaVersion": 1,
    "aliases": [
      "psoriasis vulgaris",
      "chronic plaque psoriasis"
    ],
    "etiology": {
      "mechanisms": [
        "inflammatory"
      ],
      "text": "Chronic inflammatory papulosquamous disease."
    },
    "presentation": {
      "morphology": {
        "primaryLesions": [
          "plaque"
        ],
        "secondaryChanges": [
          "scale"
        ],
        "border": [
          "well-demarcated"
        ],
        "text": "Persistent inflammatory plaques with scale."
      },
      "localization": {
        "sites": [
          "scalp",
          "extensor-surfaces",
          "flexures",
          "anogenital",
          "palms",
          "soles",
          "nails"
        ],
        "distribution": [
          "symmetric",
          "extensor"
        ],
        "text": "Commonly affects extensor surfaces, scalp and lumbosacral skin; flexural, genital, palmoplantar and nail involvement may alter appearance."
      },
      "course": {
        "values": [
          "chronic"
        ],
        "text": "Persistent chronic plaque disease."
      }
    },
    "dermoscopy": {
      "vascularStructures": [
        "regularly distributed dotted vessels"
      ],
      "scaleKeratinClues": [
        "diffuse white scale"
      ],
      "patterns": [
        "light red background"
      ]
    },
    "diagnostics": [
      {
        "method": "clinical-examination",
        "role": "routine",
        "indication": "Assess plaque morphology, distribution, nail disease, severity, quality-of-life impact and inflammatory joint symptoms."
      },
      {
        "method": "dermoscopy",
        "role": "optional",
        "indication": "Support the diagnosis when regular dotted vessels and diffuse white scale are present."
      },
      {
        "method": "histopathology",
        "role": "unclear-cases",
        "indication": "Use clinicopathologic correlation when features are atypical."
      }
    ],
    "differentials": [
      {
        "diagnosis": "Nummular or chronic eczema"
      },
      {
        "diagnosis": "Seborrheic dermatitis"
      },
      {
        "diagnosis": "Dermatophyte infection"
      },
      {
        "diagnosis": "Pityriasis rubra pilaris"
      },
      {
        "diagnosis": "Cutaneous T-cell lymphoma"
      }
    ],
    "treatment": {
      "steps": [
        {
          "level": "first-line",
          "interventions": [
            {
              "intervention": "Topical therapy for limited plaque disease, selected for anatomic site and patient factors."
            }
          ]
        },
        {
          "level": "refractory-or-severe",
          "interventions": [
            {
              "intervention": "Consider phototherapy or systemic treatment for extensive, high-impact or inadequately controlled disease; integrate severity, quality of life, comorbidities and psoriatic arthritis.",
              "sourceUrls": [
                "https://www.guidelines.edf.one/guidelines/psoriasis-guideline"
              ]
            }
          ]
        }
      ]
    },
    "followUp": {
      "strategy": "risk-adapted",
      "text": "Monitor skin and nail activity, treatment safety, quality-of-life impact, inflammatory joint symptoms and relevant comorbidities."
    },
    "redFlags": [
      "Inflammatory joint symptoms",
      "High-impact or extensive disease",
      "Atypical or treatment-resistant plaques"
    ],
    "referral": [
      {
        "type": "systemic-therapy-assessment",
        "indication": "Extensive, high-impact or inadequately controlled disease."
      }
    ],
    "evidenceMap": {
      "presentation": [
        "https://dermnetnz.org/topics/psoriasis"
      ],
      "dermoscopy": [
        "https://dermnetnz.org/topics/psoriasis"
      ],
      "diagnostics": [
        "https://www.aad.org/member/clinical-quality/guidelines/psoriasis"
      ],
      "differentials": [
        "https://dermnetnz.org/topics/psoriasis"
      ],
      "treatment": [
        "https://www.guidelines.edf.one/guidelines/psoriasis-guideline",
        "https://www.aad.org/member/clinical-quality/guidelines/psoriasis"
      ],
      "followUp": [
        "https://www.guidelines.edf.one/guidelines/psoriasis-guideline"
      ],
      "redFlags": [
        "https://www.guidelines.edf.one/guidelines/psoriasis-guideline"
      ]
    },
    "sourceUrls": [
      "https://www.guidelines.edf.one/guidelines/psoriasis-guideline",
      "https://www.aad.org/member/clinical-quality/guidelines/psoriasis",
      "https://dermnetnz.org/topics/psoriasis"
    ]
  },
  "references": [
    {
      "title": "Living EuroGuiDerm Guideline for the systemic treatment of psoriasis vulgaris",
      "organization": "European Dermatology Forum / EuroGuiDerm",
      "type": "guideline",
      "year": null,
      "version": "September 2023; partial update February 2025",
      "url": "https://www.guidelines.edf.one/guidelines/psoriasis-guideline",
      "doi": null,
      "metadataCheckedAt": "2026-09-20"
    },
    {
      "title": "Psoriasis clinical guideline",
      "organization": "American Academy of Dermatology",
      "type": "guideline",
      "year": null,
      "version": null,
      "url": "https://www.aad.org/member/clinical-quality/guidelines/psoriasis",
      "doi": null,
      "metadataCheckedAt": "2026-09-17"
    },
    {
      "title": "ICD-10 Version: 2019",
      "organization": "World Health Organization",
      "type": "official classification",
      "year": null,
      "version": "2019",
      "url": "https://icd.who.int/browse10/2019/en",
      "doi": null,
      "metadataCheckedAt": "2026-09-15"
    },
    {
      "title": "Psoriasis",
      "organization": "DermNet",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://dermnetnz.org/topics/psoriasis",
      "doi": null,
      "metadataCheckedAt": "2026-09-20"
    }
  ]
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## disease: Acne Vulgaris (`acne-vulgaris`)

- **Exact fingerprint:** `sha256-v1:bfd1ea796e0fb171d632d7f88d916691703ef8883595cf7350dd8a0984c39a30`
- **Schema version:** 1
- **Reviewable sections:** `overview`, `clinical-presentation`, `diagnostics`, `dermoscopy`, `differential-diagnosis`, `treatment`, `follow-up`, `coding`, `references`, `red-flags`, `referral`
- **Mapped evidence sources:**
  - https://dermnetnz.org/topics/acne-vulgaris
  - https://pubmed.ncbi.nlm.nih.gov/38300170/
- **Automated warnings:**
  - No structured medication regimen or dose is encoded; confirm that the scope is sufficiently explicit.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "reviewStatus": "clinician review required",
  "clinicalReview": null,
  "id": "acne-vulgaris",
  "name": "Acne Vulgaris",
  "alternative": "Common acne; acne",
  "category": "acneiform-sebaceous",
  "subcategory": "acneiform-disorder",
  "coding": {
    "diagnoses": [
      {
        "system": "ICD-10 WHO",
        "version": "2019",
        "code": "L70.0",
        "label": "Acne vulgaris",
        "note": null
      }
    ],
    "icdo": null,
    "icdoApplicability": "not applicable",
    "verificationNote": "Do not generalize this code to medication-induced, occupational or other acneiform eruptions."
  },
  "description": "A chronic inflammatory disorder of the pilosebaceous unit producing comedones and inflammatory lesions, most often on the face, chest and back.",
  "clinical": "Open and closed comedones may occur with papules, pustules or deeper nodules. Scarring, post-inflammatory pigment alteration and psychosocial burden are important severity considerations.",
  "dermoscopy": "Dermoscopy is not routinely required; comedonal openings and follicular inflammatory changes may be visible but diagnosis is primarily clinical.",
  "differential": "Rosacea, bacterial or Malassezia folliculitis, periorificial dermatitis, hidradenitis suppurativa and medication-related acneiform eruptions.",
  "treatment": "Treatment is severity- and phenotype-based and commonly combines topical agents with different mechanisms. Antibiotic exposure should be limited and combined appropriately; systemic, hormonal or isotretinoin therapy requires indication-specific assessment, contraindication review and monitoring.",
  "followup": "Reassess response, tolerability, adherence, scarring risk, pigmentary sequelae and psychosocial impact. Escalate when disease is severe, scarring or insufficiently controlled.",
  "clinicalProfile": {
    "schemaVersion": 1,
    "aliases": [
      "common acne",
      "acne"
    ],
    "etiology": {
      "mechanisms": [
        "inflammatory"
      ],
      "text": "Chronic inflammatory disorder of the pilosebaceous unit."
    },
    "presentation": {
      "morphology": {
        "primaryLesions": [
          "papule",
          "pustule",
          "nodule"
        ],
        "otherPrimaryLesions": [
          "open comedone",
          "closed comedone"
        ],
        "secondaryChanges": [
          "scar"
        ],
        "text": "Comedonal and inflammatory lesions may coexist; deeper nodules increase severity and scarring concern."
      },
      "localization": {
        "sites": [
          "face",
          "trunk"
        ],
        "distribution": [
          "seborrheic"
        ],
        "text": "Most often affects the face, chest and back."
      },
      "course": {
        "values": [
          "chronic"
        ],
        "text": "Chronic disease with variable inflammatory activity."
      }
    },
    "dermoscopy": {
      "text": "Not routinely required; diagnosis is primarily clinical."
    },
    "diagnostics": [
      {
        "method": "clinical-examination",
        "role": "routine",
        "indication": "Assess comedones, inflammatory lesions, nodules, scarring, pigmentary sequelae and psychosocial burden."
      },
      {
        "method": "laboratory-testing",
        "role": "optional",
        "indication": "Use only when the clinical context suggests a specific endocrine or medication-related contributor."
      }
    ],
    "differentials": [
      {
        "diagnosis": "Rosacea",
        "distinguishingClue": "Comedones support acne and are not a typical rosacea feature."
      },
      {
        "diagnosis": "Bacterial folliculitis"
      },
      {
        "diagnosis": "Malassezia folliculitis"
      },
      {
        "diagnosis": "Periorificial dermatitis"
      },
      {
        "diagnosis": "Hidradenitis suppurativa"
      },
      {
        "diagnosis": "Medication-related acneiform eruption"
      }
    ],
    "treatment": {
      "steps": [
        {
          "level": "first-line",
          "interventions": [
            {
              "intervention": "Combine topical agents with complementary mechanisms according to acne phenotype and severity.",
              "sourceUrls": [
                "https://pubmed.ncbi.nlm.nih.gov/38300170/"
              ]
            }
          ]
        },
        {
          "level": "second-line-or-alternative",
          "interventions": [
            {
              "intervention": "Limit antibiotic exposure and combine antibiotic therapy appropriately with topical treatment.",
              "sourceUrls": [
                "https://pubmed.ncbi.nlm.nih.gov/38300170/"
              ]
            }
          ]
        },
        {
          "level": "refractory-or-severe",
          "interventions": [
            {
              "intervention": "Systemic, hormonal or isotretinoin therapy requires indication-specific assessment, contraindication review and monitoring.",
              "sourceUrls": [
                "https://pubmed.ncbi.nlm.nih.gov/38300170/"
              ]
            }
          ]
        }
      ]
    },
    "followUp": {
      "strategy": "reassessment-after-treatment",
      "text": "Reassess response, tolerability, adherence, scarring risk, pigmentary sequelae and psychosocial impact."
    },
    "redFlags": [
      "Scarring",
      "Severe nodular disease",
      "Substantial psychosocial burden",
      "Failure of standard topical or oral therapy"
    ],
    "referral": [
      {
        "type": "systemic-therapy-assessment",
        "indication": "Severe, scarring or insufficiently controlled acne."
      }
    ],
    "evidenceMap": {
      "presentation": [
        "https://dermnetnz.org/topics/acne-vulgaris"
      ],
      "dermoscopy": [
        "https://dermnetnz.org/topics/acne-vulgaris"
      ],
      "diagnostics": [
        "https://pubmed.ncbi.nlm.nih.gov/38300170/"
      ],
      "differentials": [
        "https://dermnetnz.org/topics/acne-vulgaris"
      ],
      "treatment": [
        "https://pubmed.ncbi.nlm.nih.gov/38300170/"
      ],
      "followUp": [
        "https://pubmed.ncbi.nlm.nih.gov/38300170/"
      ],
      "redFlags": [
        "https://pubmed.ncbi.nlm.nih.gov/38300170/"
      ]
    },
    "sourceUrls": [
      "https://pubmed.ncbi.nlm.nih.gov/38300170/",
      "https://dermnetnz.org/topics/acne-vulgaris"
    ]
  },
  "references": [
    {
      "title": "Guidelines of care for the management of acne vulgaris",
      "organization": "American Academy of Dermatology",
      "type": "guideline",
      "year": 2024,
      "version": null,
      "url": "https://pubmed.ncbi.nlm.nih.gov/38300170/",
      "doi": "10.1016/j.jaad.2023.12.017",
      "metadataCheckedAt": "2026-09-20"
    },
    {
      "title": "ICD-10 Version: 2019",
      "organization": "World Health Organization",
      "type": "official classification",
      "year": null,
      "version": "2019",
      "url": "https://icd.who.int/browse10/2019/en",
      "doi": null,
      "metadataCheckedAt": "2026-09-15"
    },
    {
      "title": "Acne vulgaris",
      "organization": "DermNet",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://dermnetnz.org/topics/acne-vulgaris",
      "doi": null,
      "metadataCheckedAt": "2026-09-20"
    }
  ]
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## disease: Rosacea (`rosacea`)

- **Exact fingerprint:** `sha256-v1:f3dc5cd051aa95294ebe867e10182d2fad6e3ab438f78a61279a597187ba5612`
- **Schema version:** 1
- **Reviewable sections:** `overview`, `clinical-presentation`, `diagnostics`, `dermoscopy`, `differential-diagnosis`, `treatment`, `follow-up`, `coding`, `references`, `red-flags`, `referral`, `patient-safety`
- **Mapped evidence sources:**
  - https://dermnetnz.org/topics/rosacea
  - https://pubmed.ncbi.nlm.nih.gov/35929658/
- **Automated warnings:**
  - No structured medication regimen or dose is encoded; confirm that the scope is sufficiently explicit.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "reviewStatus": "clinician review required",
  "clinicalReview": null,
  "id": "rosacea",
  "name": "Rosacea",
  "alternative": "Facial rosacea; acne rosacea (historical term)",
  "category": "acneiform-sebaceous",
  "subcategory": "rosacea",
  "coding": {
    "diagnoses": [
      {
        "system": "ICD-10 WHO",
        "version": "2019",
        "code": "L71",
        "label": "Rosacea",
        "note": null
      }
    ],
    "icdo": null,
    "icdoApplicability": "not applicable",
    "verificationNote": "Document the dominant cutaneous and ocular phenotypes; do not code rosacea as acne vulgaris."
  },
  "description": "A chronic inflammatory facial disorder assessed by phenotype, which may include persistent centrofacial erythema, flushing, telangiectasia, papules, pustules, phymatous change or ocular involvement.",
  "clinical": "Central facial erythema and episodic flushing may occur alone or with inflammatory papules and pustules; comedones are not a typical feature. Ocular symptoms and phymatous change require separate assessment.",
  "dermoscopy": "Dermoscopy may help demonstrate telangiectatic vascular patterns and follicular changes, but it is supportive rather than diagnostic.",
  "differential": "Acne vulgaris, seborrheic dermatitis, periorificial dermatitis, contact dermatitis, cutaneous lupus erythematosus and other causes of facial erythema or flushing.",
  "treatment": "Use gentle skin care, photoprotection and management of individually confirmed triggers. Treatment should target the dominant phenotype and may include topical, oral or vascular-device approaches; ocular disease may require ophthalmic assessment.",
  "followup": "Reassess phenotype-specific response, ocular symptoms, treatment tolerance and quality-of-life impact. Atypical, unilateral or treatment-resistant disease should prompt diagnostic review.",
  "clinicalProfile": {
    "schemaVersion": 1,
    "aliases": [
      "facial rosacea",
      "acne rosacea (historical term)"
    ],
    "etiology": {
      "mechanisms": [
        "inflammatory"
      ],
      "text": "Chronic inflammatory facial disorder assessed by phenotype."
    },
    "presentation": {
      "morphology": {
        "primaryLesions": [
          "papule",
          "pustule"
        ],
        "colors": [
          "persistent centrofacial erythema"
        ],
        "surface": [
          "telangiectasia",
          "phymatous change"
        ],
        "text": "Comedones are not a typical feature."
      },
      "localization": {
        "sites": [
          "face"
        ],
        "distribution": [
          "localized"
        ],
        "text": "Usually centrofacial; atypical unilateral disease requires diagnostic review."
      },
      "course": {
        "values": [
          "chronic",
          "recurrent"
        ],
        "text": "Chronic disease with episodic flushing and variable inflammatory activity."
      }
    },
    "dermoscopy": {
      "vascularStructures": [
        "telangiectatic vascular patterns"
      ],
      "patterns": [
        "follicular changes"
      ],
      "text": "Supportive rather than diagnostic."
    },
    "diagnostics": [
      {
        "method": "clinical-examination",
        "role": "routine",
        "indication": "Document dominant cutaneous and ocular phenotypes and exclude typical acne comedones."
      },
      {
        "method": "dermoscopy",
        "role": "optional",
        "indication": "Support assessment of telangiectatic vascular and follicular patterns."
      },
      {
        "method": "other",
        "role": "severe-or-atypical",
        "indication": "Diagnostic review for atypical, unilateral or treatment-resistant disease."
      }
    ],
    "differentials": [
      {
        "diagnosis": "Acne vulgaris",
        "distinguishingClue": "Comedones support acne vulgaris and are not typical of rosacea."
      },
      {
        "diagnosis": "Seborrheic dermatitis"
      },
      {
        "diagnosis": "Periorificial dermatitis"
      },
      {
        "diagnosis": "Contact dermatitis"
      },
      {
        "diagnosis": "Cutaneous lupus erythematosus"
      },
      {
        "diagnosis": "Other cause of facial erythema or flushing"
      }
    ],
    "treatment": {
      "steps": [
        {
          "level": "first-line",
          "interventions": [
            {
              "intervention": "Select topical, oral or vascular-device treatment according to the dominant phenotype.",
              "sourceUrls": [
                "https://pubmed.ncbi.nlm.nih.gov/35929658/"
              ]
            }
          ]
        },
        {
          "level": "supportive-care",
          "interventions": [
            {
              "intervention": "Gentle skin care, photoprotection and management of individually confirmed triggers."
            }
          ]
        }
      ],
      "nonPharmacological": [
        "Gentle skin care",
        "Photoprotection",
        "Management of individually confirmed triggers"
      ]
    },
    "followUp": {
      "strategy": "reassessment-after-treatment",
      "text": "Reassess phenotype-specific response, ocular symptoms, treatment tolerance and quality-of-life impact."
    },
    "redFlags": [
      "Ocular symptoms",
      "Atypical unilateral disease",
      "Treatment resistance"
    ],
    "referral": [
      {
        "type": "ophthalmology",
        "indication": "Ocular disease requiring ophthalmic assessment."
      },
      {
        "type": "dermatology",
        "indication": "Atypical, unilateral or treatment-resistant disease."
      }
    ],
    "patientCounseling": [
      "Use gentle skin care and photoprotection; manage only individually confirmed triggers."
    ],
    "evidenceMap": {
      "presentation": [
        "https://pubmed.ncbi.nlm.nih.gov/35929658/",
        "https://dermnetnz.org/topics/rosacea"
      ],
      "dermoscopy": [
        "https://dermnetnz.org/topics/rosacea"
      ],
      "diagnostics": [
        "https://pubmed.ncbi.nlm.nih.gov/35929658/"
      ],
      "differentials": [
        "https://dermnetnz.org/topics/rosacea"
      ],
      "treatment": [
        "https://pubmed.ncbi.nlm.nih.gov/35929658/"
      ],
      "followUp": [
        "https://pubmed.ncbi.nlm.nih.gov/35929658/"
      ],
      "redFlags": [
        "https://pubmed.ncbi.nlm.nih.gov/35929658/"
      ]
    },
    "sourceUrls": [
      "https://pubmed.ncbi.nlm.nih.gov/35929658/",
      "https://dermnetnz.org/topics/rosacea"
    ]
  },
  "references": [
    {
      "title": "S2k guideline: Rosacea",
      "organization": "German Dermatological Society guideline group",
      "type": "guideline",
      "year": 2022,
      "version": null,
      "url": "https://pubmed.ncbi.nlm.nih.gov/35929658/",
      "doi": "10.1111/ddg.14849",
      "metadataCheckedAt": "2026-09-20"
    },
    {
      "title": "ICD-10 Version: 2019",
      "organization": "World Health Organization",
      "type": "official classification",
      "year": null,
      "version": "2019",
      "url": "https://icd.who.int/browse10/2019/en",
      "doi": null,
      "metadataCheckedAt": "2026-09-15"
    },
    {
      "title": "Rosacea",
      "organization": "DermNet",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://dermnetnz.org/topics/rosacea",
      "doi": null,
      "metadataCheckedAt": "2026-09-20"
    }
  ]
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## disease: Tinea Corporis (`tinea-corporis`)

- **Exact fingerprint:** `sha256-v1:f20cdb28e4bf87cef7eb15e51afdbf6a4767cd283c6764db75ff7d0618fe72e2`
- **Schema version:** 1
- **Reviewable sections:** `overview`, `clinical-presentation`, `diagnostics`, `dermoscopy`, `differential-diagnosis`, `treatment`, `follow-up`, `coding`, `references`, `red-flags`, `referral`, `patient-safety`
- **Mapped evidence sources:**
  - https://dermnetnz.org/topics/tinea-corporis
  - https://www.cdc.gov/ringworm/hcp/clinical-overview/
- **Automated warnings:**
  - No structured medication regimen or dose is encoded; confirm that the scope is sufficiently explicit.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "reviewStatus": "clinician review required",
  "clinicalReview": null,
  "id": "tinea-corporis",
  "name": "Tinea Corporis",
  "alternative": "Ringworm; body ringworm; dermatophytosis of the body",
  "category": "infectious-infestation",
  "subcategory": "dermatophyte-infection",
  "coding": {
    "diagnoses": [
      {
        "system": "ICD-10 WHO",
        "version": "2019",
        "code": "B35.4",
        "label": "Tinea corporis",
        "note": null
      }
    ],
    "icdo": null,
    "icdoApplicability": "not applicable",
    "verificationNote": "This record covers glabrous-skin dermatophytosis; document special sites or extensive disease separately."
  },
  "description": "A dermatophyte infection of glabrous skin of the trunk or limbs.",
  "clinical": "An enlarging annular or polycyclic scaly plaque often has a more active border and relative central clearing, but prior corticosteroid use can obscure the pattern.",
  "dermoscopy": "Peripheral scale and erythema may support the diagnosis but are not specific; microscopy, culture or another validated test is appropriate when the appearance is atypical or treatment fails.",
  "differential": "Nummular dermatitis, psoriasis, pityriasis rosea, granuloma annulare, subacute cutaneous lupus and erythema migrans.",
  "treatment": "Localized disease is generally managed with an appropriate topical antifungal; extensive, refractory, follicular or immunocompromised presentations may need systemic treatment after diagnostic confirmation and safety review. Avoid corticosteroid monotherapy.",
  "followup": "Reassess non-response for adherence, reinfection, an alternative diagnosis, resistant dermatophytes or an untreated animal or household source.",
  "clinicalProfile": {
    "schemaVersion": 1,
    "aliases": [
      "ringworm",
      "body ringworm",
      "dermatophytosis of the body"
    ],
    "etiology": {
      "mechanisms": [
        "infectious"
      ],
      "text": "Dermatophyte infection of glabrous skin."
    },
    "presentation": {
      "morphology": {
        "primaryLesions": [
          "plaque"
        ],
        "secondaryChanges": [
          "scale"
        ],
        "border": [
          "active"
        ],
        "configuration": [
          "annular",
          "polycyclic",
          "relative central clearing"
        ],
        "text": "Prior corticosteroid use can obscure the typical pattern."
      },
      "localization": {
        "sites": [
          "trunk",
          "upper-extremities",
          "lower-extremities"
        ],
        "distribution": [
          "localized"
        ],
        "text": "Glabrous skin of the trunk or limbs."
      },
      "course": {
        "values": [
          "progressive"
        ],
        "text": "Plaques can enlarge peripherally."
      }
    },
    "dermoscopy": {
      "scaleKeratinClues": [
        "peripheral scale"
      ],
      "patterns": [
        "peripheral erythema"
      ],
      "text": "Supportive but not specific."
    },
    "diagnostics": [
      {
        "method": "clinical-examination",
        "role": "routine",
        "indication": "Assess annular or polycyclic morphology, active border, scale and central clearing."
      },
      {
        "method": "microscopy",
        "role": "confirmatory",
        "indication": "Confirm suspected dermatophyte infection, particularly when morphology is atypical or treatment fails.",
        "sourceUrls": [
          "https://www.cdc.gov/ringworm/hcp/clinical-overview/"
        ]
      },
      {
        "method": "culture",
        "role": "unclear-cases",
        "indication": "Use when the presentation is atypical, treatment fails or organism identification may change management.",
        "sourceUrls": [
          "https://www.cdc.gov/ringworm/hcp/clinical-overview/"
        ]
      }
    ],
    "differentials": [
      {
        "diagnosis": "Nummular dermatitis",
        "distinguishingClue": "Use fungal testing when morphology is unclear."
      },
      {
        "diagnosis": "Psoriasis",
        "distinguishingClue": "Use fungal testing when morphology is unclear."
      },
      {
        "diagnosis": "Pityriasis rosea"
      },
      {
        "diagnosis": "Granuloma annulare"
      },
      {
        "diagnosis": "Subacute cutaneous lupus"
      },
      {
        "diagnosis": "Erythema migrans"
      }
    ],
    "treatment": {
      "steps": [
        {
          "level": "first-line",
          "interventions": [
            {
              "intervention": "Appropriate topical antifungal for localized disease after diagnostic assessment."
            }
          ]
        },
        {
          "level": "refractory-or-severe",
          "interventions": [
            {
              "intervention": "Consider systemic treatment for extensive, refractory, follicular or immunocompromised presentations after diagnostic confirmation and safety review."
            }
          ]
        },
        {
          "level": "supportive-care",
          "interventions": [
            {
              "intervention": "Avoid corticosteroid monotherapy and address potential untreated animal or household sources.",
              "sourceUrls": [
                "https://www.cdc.gov/ringworm/hcp/clinical-overview/"
              ]
            }
          ]
        }
      ],
      "nonPharmacological": [
        "Avoid sharing personal items",
        "Address potential animal or household sources",
        "Keep affected skin clean and dry"
      ]
    },
    "followUp": {
      "strategy": "reassessment-after-treatment",
      "text": "For non-response, reassess adherence, reinfection, diagnosis, antifungal resistance and untreated animal or household sources."
    },
    "redFlags": [
      "Extensive disease",
      "Immunosuppression",
      "Follicular involvement",
      "Treatment failure",
      "Possible antifungal resistance"
    ],
    "referral": [
      {
        "type": "dermatology",
        "indication": "Extensive, refractory, diagnostically uncertain or suspected resistant infection."
      }
    ],
    "patientCounseling": [
      "Avoid corticosteroid monotherapy.",
      "Reduce transmission through hygiene and management of potential contacts or sources."
    ],
    "evidenceMap": {
      "presentation": [
        "https://dermnetnz.org/topics/tinea-corporis"
      ],
      "dermoscopy": [
        "https://dermnetnz.org/topics/tinea-corporis"
      ],
      "diagnostics": [
        "https://www.cdc.gov/ringworm/hcp/clinical-overview/"
      ],
      "differentials": [
        "https://dermnetnz.org/topics/tinea-corporis"
      ],
      "treatment": [
        "https://www.cdc.gov/ringworm/hcp/clinical-overview/"
      ],
      "followUp": [
        "https://www.cdc.gov/ringworm/hcp/clinical-overview/"
      ],
      "redFlags": [
        "https://www.cdc.gov/ringworm/hcp/clinical-overview/"
      ]
    },
    "sourceUrls": [
      "https://www.cdc.gov/ringworm/hcp/clinical-overview/",
      "https://dermnetnz.org/topics/tinea-corporis"
    ]
  },
  "references": [
    {
      "title": "Clinical Overview of Ringworm",
      "organization": "Centers for Disease Control and Prevention",
      "type": "clinical reference",
      "year": 2024,
      "version": null,
      "url": "https://www.cdc.gov/ringworm/hcp/clinical-overview/",
      "doi": null,
      "metadataCheckedAt": "2026-09-20"
    },
    {
      "title": "ICD-10 Version: 2019",
      "organization": "World Health Organization",
      "type": "official classification",
      "year": null,
      "version": "2019",
      "url": "https://icd.who.int/browse10/2019/en",
      "doi": null,
      "metadataCheckedAt": "2026-09-15"
    },
    {
      "title": "Tinea corporis",
      "organization": "DermNet",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://dermnetnz.org/topics/tinea-corporis",
      "doi": null,
      "metadataCheckedAt": "2026-09-20"
    }
  ]
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## quiz: Which ABCDE feature explicitly describes change over time? (`melanoma-evolution`)

- **Exact fingerprint:** `sha256-v1:90116bee492bf05294115bb3d557bbf6546b27193f7a27c71d96784fe02c4212`
- **Schema version:** 1
- **Reviewable sections:** `prompt`, `options`, `best-answer`, `explanation`, `safety-notice`, `references`
- **Mapped evidence sources:**
  - https://pubmed.ncbi.nlm.nih.gov/39700658/
- **Automated warnings:**
  - Confirm one defensible best answer, distractor safety, explanation accuracy, and independence from the linked record review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "melanoma-evolution",
  "diseaseId": "cutaneous-melanoma",
  "mediaId": "melanoma-abcde-schematic",
  "domain": "morphology",
  "prompt": "Which ABCDE feature explicitly describes change over time?",
  "options": [
    "Asymmetry",
    "Border irregularity",
    "Evolution",
    "Color variation"
  ],
  "correctIndex": 2,
  "explanation": "Evolution means a lesion is changing over time. It is assessed with the overall clinical and dermoscopic pattern, not in isolation.",
  "sourceUrls": [
    "https://pubmed.ncbi.nlm.nih.gov/39700658/"
  ],
  "reviewStatus": "clinician review required",
  "clinicalReview": null
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## quiz: Which schematic vascular clue is classically associated with basal cell carcinoma? (`bcc-dermoscopy`)

- **Exact fingerprint:** `sha256-v1:088c6b43b3713d63d8d92ab1b5c9cc1fedd438057e0f5648013e8b098254f3f0`
- **Schema version:** 1
- **Reviewable sections:** `prompt`, `options`, `best-answer`, `explanation`, `safety-notice`, `references`
- **Mapped evidence sources:**
  - https://dermnetnz.org/topics/basal-cell-carcinoma
- **Automated warnings:**
  - Confirm one defensible best answer, distractor safety, explanation accuracy, and independence from the linked record review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "bcc-dermoscopy",
  "diseaseId": "basal-cell-carcinoma",
  "mediaId": "bcc-clues-schematic",
  "domain": "dermoscopy",
  "prompt": "Which schematic vascular clue is classically associated with basal cell carcinoma?",
  "options": [
    "Arborising vessels",
    "Regular dotted vessels",
    "Comma vessels",
    "Glomerular vessels"
  ],
  "correctIndex": 0,
  "explanation": "Arborising vessels are a high-yield dermoscopic clue for basal cell carcinoma, although diagnosis and subtype assessment still require the full clinical-pathologic context.",
  "sourceUrls": [
    "https://dermnetnz.org/topics/basal-cell-carcinoma"
  ],
  "reviewStatus": "clinician review required",
  "clinicalReview": null
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## quiz: Which distribution best fits the common plaque psoriasis pattern shown in the schematic? (`psoriasis-distribution`)

- **Exact fingerprint:** `sha256-v1:c14b5fd12435cf55496cf03dac6dd9fa86ef8096f2293545abdf228f211d607e`
- **Schema version:** 1
- **Reviewable sections:** `prompt`, `options`, `best-answer`, `explanation`, `safety-notice`, `references`
- **Mapped evidence sources:**
  - https://dermnetnz.org/topics/psoriasis
- **Automated warnings:**
  - Confirm one defensible best answer, distractor safety, explanation accuracy, and independence from the linked record review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "psoriasis-distribution",
  "diseaseId": "plaque-psoriasis",
  "mediaId": "psoriasis-distribution-schematic",
  "domain": "localization",
  "prompt": "Which distribution best fits the common plaque psoriasis pattern shown in the schematic?",
  "options": [
    "Dermatomal trunk only",
    "Scalp and extensor surfaces",
    "Finger webs only",
    "Unilateral eyelid only"
  ],
  "correctIndex": 1,
  "explanation": "Plaque psoriasis commonly involves the scalp and extensor surfaces; site-specific variants can look different.",
  "sourceUrls": [
    "https://dermnetnz.org/topics/psoriasis"
  ],
  "reviewStatus": "clinician review required",
  "clinicalReview": null
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## quiz: Which finding most strongly supports acne vulgaris over rosacea in this learning set? (`acne-comedones`)

- **Exact fingerprint:** `sha256-v1:2c319607ba93366f090b14f983f558eeb1e8fb4256cf31290b55e6ff9eea8761`
- **Schema version:** 1
- **Reviewable sections:** `prompt`, `options`, `best-answer`, `explanation`, `safety-notice`, `references`
- **Mapped evidence sources:**
  - https://pubmed.ncbi.nlm.nih.gov/38300170/
  - https://dermnetnz.org/topics/acne-vulgaris
- **Automated warnings:**
  - Confirm one defensible best answer, distractor safety, explanation accuracy, and independence from the linked record review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "acne-comedones",
  "diseaseId": "acne-vulgaris",
  "mediaId": "acne-lesions-schematic",
  "domain": "differential",
  "prompt": "Which finding most strongly supports acne vulgaris over rosacea in this learning set?",
  "options": [
    "Open and closed comedones",
    "Persistent centrofacial erythema",
    "Ocular irritation",
    "Telangiectasia"
  ],
  "correctIndex": 0,
  "explanation": "Comedones are characteristic acne lesions and are not a typical rosacea feature.",
  "sourceUrls": [
    "https://pubmed.ncbi.nlm.nih.gov/38300170/",
    "https://dermnetnz.org/topics/acne-vulgaris"
  ],
  "reviewStatus": "clinician review required",
  "clinicalReview": null
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## quiz: What is the appropriate next diagnostic step when an actinic keratosis is persistently thickened, tender or concerning for invasion? (`ak-biopsy`)

- **Exact fingerprint:** `sha256-v1:d65667de0184ce6d83281df08132a5c7692d9ec33131011de0488f2c16be1fbf`
- **Schema version:** 1
- **Reviewable sections:** `prompt`, `options`, `best-answer`, `explanation`, `safety-notice`, `references`
- **Mapped evidence sources:**
  - https://www.aad.org/member/clinical-quality/guidelines/actinic-keratosis
- **Automated warnings:**
  - Confirm one defensible best answer, distractor safety, explanation accuracy, and independence from the linked record review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "ak-biopsy",
  "diseaseId": "actinic-keratosis",
  "mediaId": null,
  "domain": "diagnostics",
  "prompt": "What is the appropriate next diagnostic step when an actinic keratosis is persistently thickened, tender or concerning for invasion?",
  "options": [
    "Ignore the change",
    "Biopsy or specialist assessment",
    "Assign melanoma staging",
    "Use dermoscopy as definitive proof"
  ],
  "correctIndex": 1,
  "explanation": "Diagnostic uncertainty or concern for invasive squamous cell carcinoma warrants biopsy or specialist assessment.",
  "sourceUrls": [
    "https://www.aad.org/member/clinical-quality/guidelines/actinic-keratosis"
  ],
  "reviewStatus": "clinician review required",
  "clinicalReview": null
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## quiz: Which option belongs in the first-line treatment hierarchy for atopic dermatitis? (`atopic-first-line`)

- **Exact fingerprint:** `sha256-v1:cccedc4756dcca10d65c396241c9e0aacf6a7b068545a80e7a9379b588b87c4c`
- **Schema version:** 1
- **Reviewable sections:** `prompt`, `options`, `best-answer`, `explanation`, `safety-notice`, `references`
- **Mapped evidence sources:**
  - https://pubmed.ncbi.nlm.nih.gov/36641009/
- **Automated warnings:**
  - Confirm one defensible best answer, distractor safety, explanation accuracy, and independence from the linked record review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "atopic-first-line",
  "diseaseId": "atopic-dermatitis",
  "mediaId": null,
  "domain": "treatment",
  "prompt": "Which option belongs in the first-line treatment hierarchy for atopic dermatitis?",
  "options": [
    "Regular moisturization with appropriate topical anti-inflammatory therapy",
    "Routine systemic therapy for every presentation",
    "Surgery",
    "No barrier care"
  ],
  "correctIndex": 0,
  "explanation": "Regular moisturization and appropriately selected topical anti-inflammatory therapy form the first-line structured approach; escalation depends on severity and response.",
  "sourceUrls": [
    "https://pubmed.ncbi.nlm.nih.gov/36641009/"
  ],
  "reviewStatus": "clinician review required",
  "clinicalReview": null
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## quiz: Which finding should prompt consideration of ophthalmic assessment in rosacea? (`rosacea-ocular`)

- **Exact fingerprint:** `sha256-v1:bf0caec2aad56ec341a0e5b257ca45c49630f89b69c176df8227604abc1ccba5`
- **Schema version:** 1
- **Reviewable sections:** `prompt`, `options`, `best-answer`, `explanation`, `safety-notice`, `references`
- **Mapped evidence sources:**
  - https://pubmed.ncbi.nlm.nih.gov/35929658/
- **Automated warnings:**
  - Confirm one defensible best answer, distractor safety, explanation accuracy, and independence from the linked record review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "rosacea-ocular",
  "diseaseId": "rosacea",
  "mediaId": null,
  "domain": "red-flags",
  "prompt": "Which finding should prompt consideration of ophthalmic assessment in rosacea?",
  "options": [
    "An isolated comedone",
    "Ocular symptoms",
    "A single freckle",
    "Stable scalp scale"
  ],
  "correctIndex": 1,
  "explanation": "Ocular symptoms are an escalation clue and may require ophthalmic assessment.",
  "sourceUrls": [
    "https://pubmed.ncbi.nlm.nih.gov/35929658/"
  ],
  "reviewStatus": "clinician review required",
  "clinicalReview": null
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## quiz: When tinea corporis morphology is atypical or treatment fails, which step supports confirmation? (`tinea-confirmation`)

- **Exact fingerprint:** `sha256-v1:d6de482b2d5a79a9ef2a87663522c94468c44ac7ba0805beab4d8455b3fb1b9c`
- **Schema version:** 1
- **Reviewable sections:** `prompt`, `options`, `best-answer`, `explanation`, `safety-notice`, `references`
- **Mapped evidence sources:**
  - https://www.cdc.gov/ringworm/hcp/clinical-overview/
- **Automated warnings:**
  - Confirm one defensible best answer, distractor safety, explanation accuracy, and independence from the linked record review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "tinea-confirmation",
  "diseaseId": "tinea-corporis",
  "mediaId": null,
  "domain": "diagnostics",
  "prompt": "When tinea corporis morphology is atypical or treatment fails, which step supports confirmation?",
  "options": [
    "Microscopy or culture",
    "Corticosteroid monotherapy",
    "Oncology staging",
    "No reassessment"
  ],
  "correctIndex": 0,
  "explanation": "Microscopy or culture can support confirmation when morphology is atypical or treatment fails; corticosteroid monotherapy can obscure infection.",
  "sourceUrls": [
    "https://www.cdc.gov/ringworm/hcp/clinical-overview/"
  ],
  "reviewStatus": "clinician review required",
  "clinicalReview": null
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## visual: Melanoma ABCDE warning-feature concept (`melanoma-abcde-schematic`)

- **Exact fingerprint:** `sha256-v1:d998a1ed1f2f9c5e7379887a8d2e29abd5066f8c3b1f7c28a5b1d8d2967b7845`
- **Schema version:** 1
- **Reviewable sections:** `image`, `title`, `caption`, `alternative-text`, `educational-description`, `legend`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://github.com/mnasuharas/Docutis/blob/main/assets/media/melanoma-abcde-schematic.svg
- **Automated warnings:**
  - Confirm every label, spatial relationship, caption, alternative text, legend, and non-diagnostic framing independently.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "melanoma-abcde-schematic",
  "diseaseId": "cutaneous-melanoma",
  "type": "illustration",
  "src": "assets/media/melanoma-abcde-schematic.svg",
  "dimensions": {
    "width": 800,
    "height": 500
  },
  "title": "Melanoma ABCDE warning-feature concept",
  "caption": "ABCDE warning features — schematic",
  "alt": "Five labelled schematic panels illustrating melanoma asymmetry, irregular border, color variation, diameter context and evolution.",
  "diagnosis": "Cutaneous Melanoma",
  "anatomicalSite": null,
  "educationalDescription": "A pattern-recognition aid showing that change and the combination of warning features matter more than any single feature. Diameter is presented as context rather than a diagnostic rule.",
  "source": "Docutis original schematic",
  "sourceUrl": "https://github.com/mnasuharas/Docutis/blob/main/assets/media/melanoma-abcde-schematic.svg",
  "license": "Project-owned",
  "attribution": "Docutis project",
  "patientIdentifiable": false,
  "consentBasis": "Not applicable — original schematic with no patient content",
  "metadataCheckedAt": "2026-09-20",
  "reviewStatus": "clinician review required",
  "clinicalReview": null
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## visual: Basal cell carcinoma morphology and dermoscopic clues (`bcc-clues-schematic`)

- **Exact fingerprint:** `sha256-v1:f8732526c38d0364684d2eabf10e8e3fffd762f0725b9c806bf8976423afb3ea`
- **Schema version:** 1
- **Reviewable sections:** `image`, `title`, `caption`, `alternative-text`, `educational-description`, `legend`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://github.com/mnasuharas/Docutis/blob/main/assets/media/bcc-clues-schematic.svg
- **Automated warnings:**
  - Confirm every label, spatial relationship, caption, alternative text, legend, and non-diagnostic framing independently.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "bcc-clues-schematic",
  "diseaseId": "basal-cell-carcinoma",
  "type": "illustration",
  "src": "assets/media/bcc-clues-schematic.svg",
  "dimensions": {
    "width": 800,
    "height": 500
  },
  "title": "Basal cell carcinoma morphology and dermoscopic clues",
  "caption": "Basal cell carcinoma clues — schematic",
  "alt": "Labelled schematic lesion showing a pearly raised border, central ulceration, branching vessels and blue-grey ovoid clues.",
  "diagnosis": "Basal Cell Carcinoma",
  "anatomicalSite": null,
  "educationalDescription": "A conservative visual summary of commonly described surface and dermoscopic clues; appearances vary by subtype and require clinical-pathologic assessment.",
  "source": "Docutis original schematic",
  "sourceUrl": "https://github.com/mnasuharas/Docutis/blob/main/assets/media/bcc-clues-schematic.svg",
  "license": "Project-owned",
  "attribution": "Docutis project",
  "patientIdentifiable": false,
  "consentBasis": "Not applicable — original schematic with no patient content",
  "metadataCheckedAt": "2026-09-20",
  "reviewStatus": "clinician review required",
  "clinicalReview": null
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## visual: Plaque psoriasis morphology and typical distribution (`psoriasis-distribution-schematic`)

- **Exact fingerprint:** `sha256-v1:bf730b84197200be4fab44f420cf3f93a6f003b88f2fea372e13f77e361b0768`
- **Schema version:** 1
- **Reviewable sections:** `image`, `title`, `caption`, `alternative-text`, `educational-description`, `legend`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://github.com/mnasuharas/Docutis/blob/main/assets/media/psoriasis-distribution-schematic.svg
- **Automated warnings:**
  - Confirm every label, spatial relationship, caption, alternative text, legend, and non-diagnostic framing independently.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "psoriasis-distribution-schematic",
  "diseaseId": "plaque-psoriasis",
  "type": "illustration",
  "src": "assets/media/psoriasis-distribution-schematic.svg",
  "dimensions": {
    "width": 800,
    "height": 500
  },
  "title": "Plaque psoriasis morphology and typical distribution",
  "caption": "Plaque psoriasis morphology and distribution — schematic",
  "alt": "Body outline marking scalp, elbows, knees and lumbosacral skin beside a labelled well-demarcated scaly plaque.",
  "diagnosis": "Plaque Psoriasis",
  "anatomicalSite": "Typical distribution overview",
  "educationalDescription": "A schematic reminder of common plaque morphology and distribution, with explicit notice that nails, flexures, palms, soles and genital skin may appear differently.",
  "source": "Docutis original schematic",
  "sourceUrl": "https://github.com/mnasuharas/Docutis/blob/main/assets/media/psoriasis-distribution-schematic.svg",
  "license": "Project-owned",
  "attribution": "Docutis project",
  "patientIdentifiable": false,
  "consentBasis": "Not applicable — original schematic with no patient content",
  "metadataCheckedAt": "2026-09-20",
  "reviewStatus": "clinician review required",
  "clinicalReview": null
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## visual: Acne lesion types and inflammatory depth (`acne-lesions-schematic`)

- **Exact fingerprint:** `sha256-v1:ecb148b53599f518b7f8a993955af85e6e863ae7a841e7fa1423ea1842a6d69a`
- **Schema version:** 1
- **Reviewable sections:** `image`, `title`, `caption`, `alternative-text`, `educational-description`, `legend`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://github.com/mnasuharas/Docutis/blob/main/assets/media/acne-lesions-schematic.svg
- **Automated warnings:**
  - Confirm every label, spatial relationship, caption, alternative text, legend, and non-diagnostic framing independently.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "acne-lesions-schematic",
  "diseaseId": "acne-vulgaris",
  "type": "illustration",
  "src": "assets/media/acne-lesions-schematic.svg",
  "dimensions": {
    "width": 800,
    "height": 500
  },
  "title": "Acne lesion types and inflammatory depth",
  "caption": "Acne lesion types — schematic",
  "alt": "Four labelled skin cross-sections showing a closed comedone, open comedone, papule or pustule and deeper nodule.",
  "diagnosis": "Acne Vulgaris",
  "anatomicalSite": null,
  "educationalDescription": "A non-photographic comparison of common lesion types and increasing inflammatory depth, without assigning a patient-specific severity grade.",
  "source": "Docutis original schematic",
  "sourceUrl": "https://github.com/mnasuharas/Docutis/blob/main/assets/media/acne-lesions-schematic.svg",
  "license": "Project-owned",
  "attribution": "Docutis project",
  "patientIdentifiable": false,
  "consentBasis": "Not applicable — original schematic with no patient content",
  "metadataCheckedAt": "2026-09-20",
  "reviewStatus": "clinician review required",
  "clinicalReview": null
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## follow_up: Cutaneous melanoma — Germany (`cutaneous-melanoma-de`)

- **Exact fingerprint:** `sha256-v1:7abe145b718e6c0d3c61eaf3277646370a1a58813f1b7e239092f652ad1d9387`
- **Schema version:** 1
- **Reviewable sections:** `scope`, `risk-groups`, `periods`, `clinical-examination`, `lymph-node-ultrasound`, `s100b`, `cross-sectional-imaging`, `context`, `safety-notice`, `references`
- **Mapped evidence sources:**
  - https://www.leitlinienprogramm-onkologie.de/fileadmin/user_upload/Downloads/Leitlinien/Melanom/Melanom_Version_3/LL_Melanom_Langversion_3.3.pdf
  - https://register.awmf.org/assets/guidelines/032-024OLp_S3_Melanom-Diagnostik-Therapie-Nachsorge_2020-08_1.pdf
  - https://infoportal-hautkrebs.de/hautkrebsarten/malignes-melanom/diagnostik/stadieneinteilung-des-melanoms/in-situ-melanom
  - https://www.aad.org/public/diseases/skin-cancer/types/common/melanoma/after-diagnosed
- **Automated warnings:**
  - Confirm German jurisdiction, guideline version, every interval/status, modality, recommendation strength, and contextual source independently.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "cutaneous-melanoma-de",
  "diseaseId": "cutaneous-melanoma",
  "diseaseLabel": "Cutaneous melanoma",
  "jurisdiction": "DE",
  "jurisdictionLabel": "Germany",
  "guideline": {
    "title": "S3-Leitlinie zur Diagnostik, Therapie und Nachsorge des Melanoms",
    "organization": "Leitlinienprogramm Onkologie (AWMF, Deutsche Krebsgesellschaft, Deutsche Krebshilfe)",
    "guidelineSystem": "DE_S3",
    "version": "3.3",
    "publishedAt": "2020-07",
    "registerNumber": "032/024OL",
    "sourceUrl": "https://www.leitlinienprogramm-onkologie.de/fileadmin/user_upload/Downloads/Leitlinien/Melanom/Melanom_Version_3/LL_Melanom_Langversion_3.3.pdf",
    "sourceMetadataCheckedAt": "2026-09-17",
    "recommendationLocation": "Chapters 8.3 and 8.4.8, pages 171–182"
  },
  "supplementalSources": [
    {
      "id": "german-melanoma-patient-guideline",
      "title": "Patient guideline: Melanoma follow-up and early detection",
      "organization": "Leitlinienprogramm Onkologie",
      "sourceType": "official patient guideline",
      "publishedAt": "2020-08",
      "sourceUrl": "https://register.awmf.org/assets/guidelines/032-024OLp_S3_Melanom-Diagnostik-Therapie-Nachsorge_2020-08_1.pdf",
      "sourceMetadataCheckedAt": "2026-09-17"
    },
    {
      "id": "infoportal-melanoma-in-situ",
      "title": "In-situ Melanom",
      "organization": "Infoportal Hautkrebs",
      "sourceType": "German expert information",
      "publishedAt": "2025-06-23",
      "sourceUrl": "https://infoportal-hautkrebs.de/hautkrebsarten/malignes-melanom/diagnostik/stadieneinteilung-des-melanoms/in-situ-melanom",
      "sourceMetadataCheckedAt": "2026-09-17"
    },
    {
      "id": "aad-melanoma-follow-up",
      "title": "I've been diagnosed with melanoma. Now what?",
      "organization": "American Academy of Dermatology",
      "sourceType": "professional society patient guidance",
      "publishedAt": "2021-10-27",
      "sourceUrl": "https://www.aad.org/public/diseases/skin-cancer/types/common/melanoma/after-diagnosed",
      "sourceMetadataCheckedAt": "2026-09-17"
    }
  ],
  "groups": [
    {
      "id": "melanoma-in-situ",
      "label": "Melanoma in situ (Stage 0)",
      "description": "German S3 follow-up schedule: No Stage 0-specific structured follow-up interval is defined. The formal risk-adapted follow-up tables begin with Stage IA.",
      "periods": [
        {
          "id": "stage-0-guidance",
          "label": "Guidance without a Stage 0-specific S3 interval",
          "range": null,
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "scheduled",
              "frequency": {
                "kind": "minimum_occurrences_per_year",
                "min": 1
              },
              "note": "Regular dermatologic surveillance is appropriate. German expert information supports at least annual full-skin examination, with shorter intervals when additional melanoma risk factors are present.",
              "recommendationBasis": null,
              "evidenceScope": "german_expert_context",
              "sourceIds": [
                "infoportal-melanoma-in-situ"
              ]
            },
            {
              "modality": "lymph_node_ultrasound",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": "Not routinely recommended for Stage 0. The German S3 risk-adapted algorithm assigns ultrasound only in selected invasive-stage groups.",
              "recommendationBasis": null,
              "evidenceScope": "german_clinical_context",
              "sourceIds": [
                "primary-guideline",
                "infoportal-melanoma-in-situ"
              ]
            },
            {
              "modality": "s100b",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": "Not routinely recommended for Stage 0. The German S3 risk-adapted algorithm assigns S100B only in selected invasive-stage groups.",
              "recommendationBasis": null,
              "evidenceScope": "german_clinical_context",
              "sourceIds": [
                "primary-guideline",
                "infoportal-melanoma-in-situ"
              ]
            },
            {
              "modality": "cross_sectional_imaging",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": "Not routinely recommended in asymptomatic Stage 0 patients. Symptoms or another clinical indication require diagnostic assessment outside routine surveillance.",
              "recommendationBasis": null,
              "evidenceScope": "german_clinical_context",
              "sourceIds": [
                "primary-guideline",
                "infoportal-melanoma-in-situ"
              ]
            }
          ],
          "notes": [
            "The absence of a Stage 0-specific S3 schedule does not mean that dermatologic surveillance is unnecessary, and the Stage IA schedule must not be extrapolated to Stage 0."
          ],
          "timingStatus": "guidance_only"
        }
      ],
      "notes": [],
      "contextSections": [
        {
          "id": "german-clinical-practice",
          "title": "German clinical-practice context",
          "text": "Formal German S3 surveillance tables begin at Stage IA. German expert information for melanoma in situ separately supports dermatology follow-up at least annually, with shorter intervals for multiple or atypical nevi, a previous melanoma, relevant family history or other clinically significant melanoma-risk features.",
          "evidenceScope": "german_expert_context",
          "sourceIds": [
            "german-melanoma-patient-guideline",
            "infoportal-melanoma-in-situ"
          ]
        },
        {
          "id": "self-examination",
          "title": "Self-examination",
          "text": "Monthly skin self-examination should be encouraged, with help for difficult-to-see areas when needed.",
          "evidenceScope": "german_expert_context",
          "sourceIds": [
            "infoportal-melanoma-in-situ"
          ]
        },
        {
          "id": "international-context",
          "title": "International context",
          "text": "American Academy of Dermatology guidance supports ongoing dermatologist-led complete skin examinations after melanoma, with frequency individualized by stage and risk and at least annual examinations after more frequent follow-up ends. This context does not replace or extend the German S3 Stage 0 schedule.",
          "evidenceScope": "international_context",
          "sourceIds": [
            "aad-melanoma-follow-up"
          ]
        }
      ]
    },
    {
      "id": "stage-ia",
      "label": "Stage IA",
      "description": "Cutaneous melanoma, stage IA.",
      "periods": [
        {
          "id": "years-1-3",
          "label": "Years 1–3",
          "range": {
            "fromYear": 1,
            "toYear": 3
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 6,
                "max": 6
              },
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            },
            {
              "modality": "lymph_node_ultrasound",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            },
            {
              "modality": "s100b",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            },
            {
              "modality": "cross_sectional_imaging",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            }
          ],
          "notes": []
        },
        {
          "id": "years-4-5",
          "label": "Years 4–5",
          "range": {
            "fromYear": 4,
            "toYear": 5
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 12,
                "max": 12
              },
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            },
            {
              "modality": "lymph_node_ultrasound",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            },
            {
              "modality": "s100b",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            },
            {
              "modality": "cross_sectional_imaging",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            }
          ],
          "notes": []
        },
        {
          "id": "years-6-10",
          "label": "Years 6–10",
          "range": {
            "fromYear": 6,
            "toYear": 10
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 12,
                "max": 12
              },
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            },
            {
              "modality": "lymph_node_ultrasound",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            },
            {
              "modality": "s100b",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            },
            {
              "modality": "cross_sectional_imaging",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            }
          ],
          "notes": []
        }
      ],
      "notes": [
        "The German guideline recommends 10 years of follow-up for invasive melanoma and lifelong self-examination."
      ]
    },
    {
      "id": "stage-ib-iib",
      "label": "Stages IB–IIB",
      "description": "Stages IB through IIB; the ultrasound recommendation assumes correct pathological staging with sentinel lymph node biopsy.",
      "periods": [
        {
          "id": "years-1-3",
          "label": "Years 1–3",
          "range": {
            "fromYear": 1,
            "toYear": 3
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 3,
                "max": 3
              },
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            },
            {
              "modality": "lymph_node_ultrasound",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 6,
                "max": 6
              },
              "note": "Only after correct pathological staging with sentinel lymph node biopsy; otherwise use the stage IIC schedule.",
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            },
            {
              "modality": "s100b",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 3,
                "max": 3
              },
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            },
            {
              "modality": "cross_sectional_imaging",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            }
          ],
          "notes": []
        },
        {
          "id": "years-4-5",
          "label": "Years 4–5",
          "range": {
            "fromYear": 4,
            "toYear": 5
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 6,
                "max": 6
              },
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            },
            {
              "modality": "lymph_node_ultrasound",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            },
            {
              "modality": "s100b",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            },
            {
              "modality": "cross_sectional_imaging",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            }
          ],
          "notes": []
        },
        {
          "id": "years-6-10",
          "label": "Years 6–10",
          "range": {
            "fromYear": 6,
            "toYear": 10
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 6,
                "max": 12
              },
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            },
            {
              "modality": "lymph_node_ultrasound",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            },
            {
              "modality": "s100b",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            },
            {
              "modality": "cross_sectional_imaging",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            }
          ],
          "notes": []
        }
      ],
      "notes": [
        "The German guideline recommends 10 years of follow-up for invasive melanoma and lifelong self-examination."
      ]
    },
    {
      "id": "stage-iic-iv-r0",
      "label": "Stages IIC–IV (R0 resected)",
      "description": "Completely resected disease (R0) only; active metastatic disease requires an individualized treatment and monitoring plan.",
      "periods": [
        {
          "id": "years-1-3",
          "label": "Years 1–3",
          "range": {
            "fromYear": 1,
            "toYear": 3
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 3,
                "max": 3
              },
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            },
            {
              "modality": "lymph_node_ultrasound",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 3,
                "max": 3
              },
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            },
            {
              "modality": "s100b",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 3,
                "max": 3
              },
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            },
            {
              "modality": "cross_sectional_imaging",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 6,
                "max": 6
              },
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            }
          ],
          "notes": []
        },
        {
          "id": "years-4-5",
          "label": "Years 4–5",
          "range": {
            "fromYear": 4,
            "toYear": 5
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 3,
                "max": 3
              },
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            },
            {
              "modality": "lymph_node_ultrasound",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 6,
                "max": 6
              },
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            },
            {
              "modality": "s100b",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 6,
                "max": 6
              },
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            },
            {
              "modality": "cross_sectional_imaging",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            }
          ],
          "notes": []
        },
        {
          "id": "years-6-10",
          "label": "Years 6–10",
          "range": {
            "fromYear": 6,
            "toYear": 10
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 6,
                "max": 6
              },
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            },
            {
              "modality": "lymph_node_ultrasound",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            },
            {
              "modality": "s100b",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            },
            {
              "modality": "cross_sectional_imaging",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": null,
              "recommendationBasis": {
                "character": "sollte (EK)",
                "consensus": "Konsensstärke 100 %"
              }
            }
          ],
          "notes": []
        }
      ],
      "notes": [
        "The German guideline recommends 10 years of follow-up for invasive melanoma and lifelong self-examination."
      ]
    }
  ],
  "notes": [],
  "reviewStatus": "clinician review required",
  "clinicalReview": null
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## follow_up: Basal cell carcinoma — Germany (`basal-cell-carcinoma-de`)

- **Exact fingerprint:** `sha256-v1:7100e89eed023219b5610e3973cf5f8d441daf8bad70a63deb329c83d275a7c1`
- **Schema version:** 1
- **Reviewable sections:** `scope`, `risk-groups`, `periods`, `clinical-examination`, `lymph-node-ultrasound`, `s100b`, `cross-sectional-imaging`, `context`, `safety-notice`, `references`
- **Mapped evidence sources:**
  - https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf
- **Automated warnings:**
  - Confirm German jurisdiction, guideline version, every interval/status, modality, recommendation strength, and contextual source independently.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "basal-cell-carcinoma-de",
  "diseaseId": "basal-cell-carcinoma",
  "diseaseLabel": "Basal cell carcinoma",
  "jurisdiction": "DE",
  "jurisdictionLabel": "Germany",
  "guideline": {
    "title": "S2k-Leitlinie Basalzellkarzinom der Haut (Aktualisierung 2023)",
    "organization": "AWMF / Deutsche Krebsgesellschaft / Deutsche Dermatologische Gesellschaft / ADO",
    "guidelineSystem": "DE_S2K",
    "version": "9.0",
    "publishedAt": "2024-01",
    "registerNumber": "032-021",
    "sourceUrl": "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf",
    "sourceMetadataCheckedAt": "2026-09-16",
    "recommendationLocation": "Chapter 12, pages 59–60"
  },
  "groups": [
    {
      "id": "isolated-low-risk",
      "label": "Isolated, surgically treated, low-recurrence-risk BCC",
      "description": "Isolated, surgically treated BCC with a low risk of recurrence.",
      "periods": [
        {
          "id": "month-6",
          "label": "6 months after treatment",
          "range": {
            "fromMonth": 6,
            "toMonth": 6
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "scheduled",
              "frequency": {
                "kind": "single_timepoint_month",
                "month": 6
              },
              "note": "One examination to exclude local recurrence.",
              "recommendationBasis": {
                "character": "soll",
                "consensus": "Konsens"
              }
            }
          ],
          "notes": []
        },
        {
          "id": "thereafter",
          "label": "Thereafter",
          "range": {
            "fromMonth": 12,
            "toMonth": null
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 12,
                "max": 12
              },
              "note": null,
              "recommendationBasis": {
                "character": "soll",
                "consensus": "Konsens"
              }
            }
          ],
          "notes": []
        }
      ],
      "notes": []
    },
    {
      "id": "intensive-risk-group",
      "label": "Multiple BCCs / high recurrence risk / locally advanced / metastatic / syndromic",
      "description": "The guideline combines multiple BCCs, high recurrence risk, locally advanced BCC, metastatic BCC and syndromes in one follow-up recommendation.",
      "periods": [
        {
          "id": "years-1-2",
          "label": "Years 1–2",
          "range": {
            "fromYear": 1,
            "toYear": 2
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 3,
                "max": 3
              },
              "note": null,
              "recommendationBasis": {
                "character": "soll",
                "consensus": "Konsens"
              }
            }
          ],
          "notes": [
            "Closer follow-up may be required on an individual basis."
          ]
        },
        {
          "id": "after-year-2-event-free",
          "label": "After more than 2 event-free years",
          "range": {
            "fromYear": 3,
            "toYear": null
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "conditional",
              "frequency": {
                "kind": "interval_months",
                "min": 12,
                "max": 12
              },
              "note": "Only if no new BCC or recurrence has occurred for more than 2 years.",
              "recommendationBasis": {
                "character": "soll",
                "consensus": "Konsens"
              }
            }
          ],
          "notes": [
            "A new BCC or recurrence does not automatically qualify for this reduced frequency."
          ]
        }
      ],
      "notes": []
    }
  ],
  "notes": [
    "The guideline recommends regular self-examination. Other modalities are not assigned fixed routine intervals in the follow-up section."
  ],
  "reviewStatus": "clinician review required",
  "clinicalReview": null
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## follow_up: Cutaneous squamous cell carcinoma — Germany (`cutaneous-squamous-cell-carcinoma-de`)

- **Exact fingerprint:** `sha256-v1:d53155d28c31fea31c5b0b4e6b9ec57514002a2fa158a00fd8ecbdbdd5a984c7`
- **Schema version:** 1
- **Reviewable sections:** `scope`, `risk-groups`, `periods`, `clinical-examination`, `lymph-node-ultrasound`, `s100b`, `cross-sectional-imaging`, `context`, `safety-notice`, `references`
- **Mapped evidence sources:**
  - https://www.leitlinienprogramm-onkologie.de/fileadmin/user_upload/Downloads/Leitlinien/Aktinische_Keratosen_und_PEK/Version_2/LL_Aktinische_Keratose_und_PEK_Langversion_2.0.pdf
- **Automated warnings:**
  - Confirm German jurisdiction, guideline version, every interval/status, modality, recommendation strength, and contextual source independently.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "cutaneous-squamous-cell-carcinoma-de",
  "diseaseId": "cutaneous-squamous-cell-carcinoma",
  "diseaseLabel": "Cutaneous squamous cell carcinoma",
  "jurisdiction": "DE",
  "jurisdictionLabel": "Germany",
  "guideline": {
    "title": "S3-Leitlinie Aktinische Keratose und Plattenepithelkarzinom der Haut",
    "organization": "Leitlinienprogramm Onkologie (AWMF, Deutsche Krebsgesellschaft, Deutsche Krebshilfe)",
    "guidelineSystem": "DE_S3",
    "version": "2.0",
    "publishedAt": "2022-12",
    "registerNumber": "032/022OL",
    "sourceUrl": "https://www.leitlinienprogramm-onkologie.de/fileadmin/user_upload/Downloads/Leitlinien/Aktinische_Keratosen_und_PEK/Version_2/LL_Aktinische_Keratose_und_PEK_Langversion_2.0.pdf",
    "sourceMetadataCheckedAt": "2026-09-16",
    "recommendationLocation": "Chapter 9.1.5, statement/recommendations 9.2–9.6, pages 240–243"
  },
  "groups": [
    {
      "id": "low-risk",
      "label": "Low risk",
      "description": "R0-resected primary tumor: tumor thickness ≤ 6 mm, or ≤ 4 mm with desmoplasia, and differentiation grade G1–2.",
      "periods": [
        {
          "id": "years-1-2",
          "label": "Years 1–2",
          "range": {
            "fromYear": 1,
            "toYear": 2
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 6,
                "max": 6
              },
              "note": null,
              "recommendationBasis": {
                "character": "soll",
                "consensus": "Starker Konsens"
              }
            },
            {
              "modality": "lymph_node_ultrasound",
              "status": "conditional",
              "frequency": {
                "kind": "occurrences_per_year",
                "min": 0,
                "max": 2
              },
              "note": "Not a fixed routine for every low-risk situation; use for an unclear palpation finding.",
              "recommendationBasis": {
                "character": "sollte",
                "consensus": "Starker Konsens"
              }
            },
            {
              "modality": "cross_sectional_imaging",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": "The schedule does not specify routine imaging.",
              "recommendationBasis": {
                "character": "Schema 9.2",
                "consensus": "Konsens"
              }
            }
          ],
          "notes": []
        },
        {
          "id": "years-3-5",
          "label": "Years 3–5",
          "range": {
            "fromYear": 3,
            "toYear": 5
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 12,
                "max": 12
              },
              "note": null,
              "recommendationBasis": {
                "character": "soll",
                "consensus": "Starker Konsens"
              }
            },
            {
              "modality": "lymph_node_ultrasound",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": "The schedule does not specify a routine interval.",
              "recommendationBasis": {
                "character": "Schema 9.2",
                "consensus": "Konsens"
              }
            },
            {
              "modality": "cross_sectional_imaging",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": "The schedule does not specify routine imaging.",
              "recommendationBasis": {
                "character": "Schema 9.2",
                "consensus": "Konsens"
              }
            }
          ],
          "notes": []
        },
        {
          "id": "years-6-10",
          "label": "Years 6–10",
          "range": {
            "fromYear": 6,
            "toYear": 10
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": "The schedule does not specify a fixed tumor-specific interval for this group.",
              "recommendationBasis": {
                "character": "Schema 9.2",
                "consensus": "Konsens"
              }
            },
            {
              "modality": "lymph_node_ultrasound",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": "The schedule does not specify a routine interval.",
              "recommendationBasis": {
                "character": "Schema 9.2",
                "consensus": "Konsens"
              }
            },
            {
              "modality": "cross_sectional_imaging",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": "The schedule does not specify routine imaging.",
              "recommendationBasis": {
                "character": "Schema 9.2",
                "consensus": "Konsens"
              }
            }
          ],
          "notes": []
        }
      ],
      "notes": []
    },
    {
      "id": "high-risk",
      "label": "High risk",
      "description": "R0-resected primary tumor with tumor thickness > 6 mm, > 4 mm with desmoplasia, differentiation grade G3–4 or perineural tumor growth; the guideline also lists immunosuppression and secondary tumors as high-risk factors.",
      "periods": [
        {
          "id": "years-1-2",
          "label": "Years 1–2",
          "range": {
            "fromYear": 1,
            "toYear": 2
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 3,
                "max": 3
              },
              "note": null,
              "recommendationBasis": {
                "character": "soll",
                "consensus": "Starker Konsens"
              }
            },
            {
              "modality": "lymph_node_ultrasound",
              "status": "conditional",
              "frequency": {
                "kind": "occurrences_per_year",
                "min": 1,
                "max": 4
              },
              "note": "Frequency depends on risk factors.",
              "recommendationBasis": {
                "character": "sollte",
                "consensus": "Starker Konsens"
              }
            },
            {
              "modality": "cross_sectional_imaging",
              "status": "conditional",
              "frequency": {
                "kind": "occurrences_per_year",
                "min": 0,
                "max": 2
              },
              "note": "The schedule interval applies to perineural tumor growth. For findings suspicious for metastasis, imaging is diagnostic work-up rather than a fixed routine interval.",
              "recommendationBasis": {
                "character": "sollte",
                "consensus": "Starker Konsens"
              }
            }
          ],
          "notes": []
        },
        {
          "id": "year-3",
          "label": "Year 3",
          "range": {
            "fromYear": 3,
            "toYear": 3
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 6,
                "max": 6
              },
              "note": null,
              "recommendationBasis": {
                "character": "soll",
                "consensus": "Starker Konsens"
              }
            },
            {
              "modality": "lymph_node_ultrasound",
              "status": "conditional",
              "frequency": {
                "kind": "occurrences_per_year",
                "min": 0,
                "max": 2
              },
              "note": "Depends on risk factors.",
              "recommendationBasis": {
                "character": "sollte",
                "consensus": "Starker Konsens"
              }
            },
            {
              "modality": "cross_sectional_imaging",
              "status": "conditional",
              "frequency": {
                "kind": "occurrences_per_year",
                "min": 0,
                "max": 2
              },
              "note": "The schedule interval applies to perineural tumor growth. For findings suspicious for metastasis, imaging is diagnostic work-up rather than a fixed routine interval.",
              "recommendationBasis": {
                "character": "sollte",
                "consensus": "Starker Konsens"
              }
            }
          ],
          "notes": []
        },
        {
          "id": "years-4-5",
          "label": "Years 4–5",
          "range": {
            "fromYear": 4,
            "toYear": 5
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 6,
                "max": 6
              },
              "note": null,
              "recommendationBasis": {
                "character": "soll",
                "consensus": "Starker Konsens"
              }
            },
            {
              "modality": "lymph_node_ultrasound",
              "status": "conditional",
              "frequency": {
                "kind": "occurrences_per_year",
                "min": 0,
                "max": 2
              },
              "note": "Depends on risk factors.",
              "recommendationBasis": {
                "character": "sollte",
                "consensus": "Starker Konsens"
              }
            },
            {
              "modality": "cross_sectional_imaging",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": "The schedule does not specify routine imaging from year 4 onward.",
              "recommendationBasis": {
                "character": "Schema 9.2",
                "consensus": "Konsens"
              }
            }
          ],
          "notes": []
        },
        {
          "id": "years-6-10",
          "label": "Years 6–10",
          "range": {
            "fromYear": 6,
            "toYear": 10
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 12,
                "max": 12
              },
              "note": null,
              "recommendationBasis": {
                "character": "soll",
                "consensus": "Starker Konsens"
              }
            },
            {
              "modality": "lymph_node_ultrasound",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": "The schedule does not specify a routine interval.",
              "recommendationBasis": {
                "character": "Schema 9.2",
                "consensus": "Konsens"
              }
            },
            {
              "modality": "cross_sectional_imaging",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": "The schedule does not specify routine imaging.",
              "recommendationBasis": {
                "character": "Schema 9.2",
                "consensus": "Konsens"
              }
            }
          ],
          "notes": []
        }
      ],
      "notes": []
    },
    {
      "id": "immunosuppressed",
      "label": "Immunosuppression",
      "description": "Patients receiving immunosuppression; the individual risk profile determines the frequency range.",
      "periods": [
        {
          "id": "years-1-2",
          "label": "Years 1–2",
          "range": {
            "fromYear": 1,
            "toYear": 2
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 3,
                "max": 3
              },
              "note": null,
              "recommendationBasis": {
                "character": "soll",
                "consensus": "Starker Konsens"
              }
            },
            {
              "modality": "lymph_node_ultrasound",
              "status": "conditional",
              "frequency": {
                "kind": "occurrences_per_year",
                "min": 1,
                "max": 4
              },
              "note": "Frequency depends on risk factors.",
              "recommendationBasis": {
                "character": "sollte",
                "consensus": "Starker Konsens"
              }
            },
            {
              "modality": "cross_sectional_imaging",
              "status": "conditional",
              "frequency": {
                "kind": "occurrences_per_year",
                "min": 0,
                "max": 2
              },
              "note": "The schedule interval applies to perineural tumor growth. For findings suspicious for metastasis, imaging is diagnostic work-up rather than a fixed routine interval.",
              "recommendationBasis": {
                "character": "sollte",
                "consensus": "Starker Konsens"
              }
            }
          ],
          "notes": []
        },
        {
          "id": "year-3",
          "label": "Year 3",
          "range": {
            "fromYear": 3,
            "toYear": 3
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 3,
                "max": 6
              },
              "note": null,
              "recommendationBasis": {
                "character": "soll",
                "consensus": "Starker Konsens"
              }
            },
            {
              "modality": "lymph_node_ultrasound",
              "status": "conditional",
              "frequency": {
                "kind": "occurrences_per_year",
                "min": 0,
                "max": 2
              },
              "note": "Depends on risk factors.",
              "recommendationBasis": {
                "character": "sollte",
                "consensus": "Starker Konsens"
              }
            },
            {
              "modality": "cross_sectional_imaging",
              "status": "conditional",
              "frequency": {
                "kind": "occurrences_per_year",
                "min": 0,
                "max": 2
              },
              "note": "The schedule interval applies to perineural tumor growth. For findings suspicious for metastasis, imaging is diagnostic work-up rather than a fixed routine interval.",
              "recommendationBasis": {
                "character": "sollte",
                "consensus": "Starker Konsens"
              }
            }
          ],
          "notes": []
        },
        {
          "id": "years-4-5",
          "label": "Years 4–5",
          "range": {
            "fromYear": 4,
            "toYear": 5
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 3,
                "max": 6
              },
              "note": null,
              "recommendationBasis": {
                "character": "soll",
                "consensus": "Starker Konsens"
              }
            },
            {
              "modality": "lymph_node_ultrasound",
              "status": "conditional",
              "frequency": {
                "kind": "occurrences_per_year",
                "min": 0,
                "max": 2
              },
              "note": "Depends on risk factors.",
              "recommendationBasis": {
                "character": "sollte",
                "consensus": "Starker Konsens"
              }
            },
            {
              "modality": "cross_sectional_imaging",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": "The schedule does not specify routine imaging from year 4 onward.",
              "recommendationBasis": {
                "character": "Schema 9.2",
                "consensus": "Konsens"
              }
            }
          ],
          "notes": []
        },
        {
          "id": "years-6-10",
          "label": "Years 6–10",
          "range": {
            "fromYear": 6,
            "toYear": 10
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 3,
                "max": 6
              },
              "note": "According to the individual risk profile.",
              "recommendationBasis": {
                "character": "soll",
                "consensus": "Starker Konsens"
              }
            },
            {
              "modality": "lymph_node_ultrasound",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": "The schedule does not specify a routine interval.",
              "recommendationBasis": {
                "character": "Schema 9.2",
                "consensus": "Konsens"
              }
            },
            {
              "modality": "cross_sectional_imaging",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": "The schedule does not specify routine imaging.",
              "recommendationBasis": {
                "character": "Schema 9.2",
                "consensus": "Konsens"
              }
            }
          ],
          "notes": []
        }
      ],
      "notes": []
    },
    {
      "id": "locally-advanced-metastatic",
      "label": "Locally advanced / metastatic",
      "description": "Locally advanced or metastatic disease; interdisciplinary individualization remains necessary.",
      "periods": [
        {
          "id": "years-1-2",
          "label": "Years 1–2",
          "range": {
            "fromYear": 1,
            "toYear": 2
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 3,
                "max": 3
              },
              "note": null,
              "recommendationBasis": {
                "character": "soll",
                "consensus": "Starker Konsens"
              }
            },
            {
              "modality": "lymph_node_ultrasound",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 3,
                "max": 3
              },
              "note": null,
              "recommendationBasis": {
                "character": "sollte",
                "consensus": "Starker Konsens"
              }
            },
            {
              "modality": "cross_sectional_imaging",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 6,
                "max": 6
              },
              "note": "After locally advanced or metastatic cSCC; also for diagnostic work-up of findings suspicious for metastasis.",
              "recommendationBasis": {
                "character": "sollte",
                "consensus": "Starker Konsens"
              }
            }
          ],
          "notes": []
        },
        {
          "id": "year-3",
          "label": "Year 3",
          "range": {
            "fromYear": 3,
            "toYear": 3
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 3,
                "max": 3
              },
              "note": null,
              "recommendationBasis": {
                "character": "soll",
                "consensus": "Starker Konsens"
              }
            },
            {
              "modality": "lymph_node_ultrasound",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 6,
                "max": 6
              },
              "note": null,
              "recommendationBasis": {
                "character": "sollte",
                "consensus": "Starker Konsens"
              }
            },
            {
              "modality": "cross_sectional_imaging",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 6,
                "max": 6
              },
              "note": "After locally advanced or metastatic cSCC; also for diagnostic work-up of findings suspicious for metastasis.",
              "recommendationBasis": {
                "character": "sollte",
                "consensus": "Starker Konsens"
              }
            }
          ],
          "notes": []
        },
        {
          "id": "years-4-5",
          "label": "Years 4–5",
          "range": {
            "fromYear": 4,
            "toYear": 5
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 3,
                "max": 3
              },
              "note": null,
              "recommendationBasis": {
                "character": "soll",
                "consensus": "Starker Konsens"
              }
            },
            {
              "modality": "lymph_node_ultrasound",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 6,
                "max": 6
              },
              "note": null,
              "recommendationBasis": {
                "character": "sollte",
                "consensus": "Starker Konsens"
              }
            },
            {
              "modality": "cross_sectional_imaging",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": "The schedule does not specify routine imaging from year 4 onward.",
              "recommendationBasis": {
                "character": "Schema 9.2",
                "consensus": "Konsens"
              }
            }
          ],
          "notes": []
        },
        {
          "id": "years-6-10",
          "label": "Years 6–10",
          "range": {
            "fromYear": 6,
            "toYear": 10
          },
          "recommendations": [
            {
              "modality": "clinical_examination",
              "status": "scheduled",
              "frequency": {
                "kind": "interval_months",
                "min": 3,
                "max": 6
              },
              "note": null,
              "recommendationBasis": {
                "character": "soll",
                "consensus": "Starker Konsens"
              }
            },
            {
              "modality": "lymph_node_ultrasound",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": "The schedule does not specify a routine interval.",
              "recommendationBasis": {
                "character": "Schema 9.2",
                "consensus": "Konsens"
              }
            },
            {
              "modality": "cross_sectional_imaging",
              "status": "not_routinely_scheduled",
              "frequency": null,
              "note": "The schedule does not specify routine imaging.",
              "recommendationBasis": {
                "character": "Schema 9.2",
                "consensus": "Konsens"
              }
            }
          ],
          "notes": []
        }
      ],
      "notes": []
    }
  ],
  "notes": [
    "Clinical examination includes full-skin inspection and inspection and palpation of the primary scar, in-transit pathway and regional lymph nodes.",
    "Chest radiography and abdominal ultrasound are not intended as routine follow-up."
  ],
  "reviewStatus": "clinician review required",
  "clinicalReview": null
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## Maintainer final-fingerprint confirmation

After approved corrections are applied, regenerate this packet and return the final fingerprint list to the reviewer. A decision over a pre-correction fingerprint cannot be reused for modified content unless the reviewer explicitly approved that exact replacement wording and confirms the resulting final fingerprint.
