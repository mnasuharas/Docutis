YªçŠx-®éÜj×¢ëiºÚ+Š§j[h‘éÜ¢éíß^µÓMµçÍ¸o+^²‰¢¶×# Goal 9 consolidated human clinical-review gate

Generated from the repository on 2026-09-20. This packet contains no approval and must not be interpreted as physician review.

## Reviewer identity and consent

Complete these fields once for the whole batch. Use the exact professional role; do not upgrade training status or credentials.

- Public display name:
- Professional role (example: `Physician â€” Dermatology resident`):
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

- **Exact fingerprint:** `sha256-v1:92302d680f4c645cc1a91c9a827a3e44b0d965fa21fa019144458bd81c27a1dd`
- **Schema version:** 1
- **Reviewable sections:** `overview`, `clinical-presentation`, `diagnostics`, `dermoscopy`, `differential-diagnosis`, `treatment`, `follow-up`, `coding`, `references`, `histopathology`, `red-flags`, `referral`, `patient-safety`
- **Mapped evidence sources:**
  - https://dermnetnz.org/topics/actinic-keratosis
  - https://icd.who.int/browse10/2019/en
  - https://klassifikationen.bfarm.de/icd-10-gm/kode-suche/htmlgm2026/block-l55-l59.htm
  - https://onlinelibrary.wiley.com/doi/10.1111/ddg.15231
  - https://register.awmf.org/assets/guidelines/032-022OLl_S3_Aktinische_Keratosen-Plattenepithelkarzinom-PEK_2023-01.pdf
  - https://register.awmf.org/assets/guidelines/032-052OLl_S3_Praevention-Hautkrebs_2021-09.pdf
  - https://www.dguv.de/bk-info/icd-10-kapitel/kapitel_12/bk5103/index.jsp
  - https://www.ema.europa.eu/en/medicines/human/EPAR/aldara
  - https://www.ema.europa.eu/en/medicines/human/EPAR/zyclara
  - https://www.fachinfo.de/fi/detail/003786/efudix-r-5-creme
  - https://www.fachinfo.de/fi/detail/23428/Klisyri-10-mg-g-Salbe
  - https://www.fachinfo.de/fi/pdf/007858/solaraze-3-gel
  - https://www.fachinfo.de/fi/pdf/013084/actikerall-5-mg-g-100-mg-g-loesung-zur-anwendung-auf-der-haut
  - https://www.fachinfo.de/fi/pdf/022967/tolak-r-40-mg-g-creme
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
      },
      {
        "system": "ICD-10-GM",
        "version": "2026",
        "code": "L57.0",
        "label": "Aktinische Keratose",
        "note": "German Modification code for German clinical documentation and billing; keep separate from ICD-10 WHO."
      }
    ],
    "icdo": null,
    "icdoApplicability": "not applicable",
    "verificationNote": "No ICD-O morphology code is assigned to routine clinically diagnosed actinic keratosis in this record. If squamous cell carcinoma in situ or invasive cutaneous squamous cell carcinoma is histologically diagnosed, the neoplasm should be coded separately according to the pathological diagnosis and applicable registry system."
  },
  "description": "A UV-associated keratinocytic intraepidermal neoplastic lesion on chronically sun-exposed skin. It may progress to cutaneous squamous cell carcinoma in some lesions, but no precise universal lesion-to-cSCC progression percentage is asserted here.",
  "clinical": "Typically a rough or gritty erythematous macule, papule or plaque with variable adherent scale or hyperkeratosis on chronically sun-exposed skin (face, ears, bald scalp, dorsal hands, forearms). Lesions may be tender and are often multiple within field cancerization. Pigmented AK is a recognized clinical variant. Actinic cheilitis is a related but distinct UV-associated disease of the lip and is not merged into ordinary cutaneous AK.",
  "dermoscopy": "Non-pigmented facial AK may show an erythematous pseudonetwork or strawberry pattern, surface scale, follicular openings and keratotic plugs; the strawberry pattern is particularly described for non-pigmented facial AK and is not universal for every AK. Pigmented AK may show brown or gray pseudonetwork, annular-granular pigmentation, asymmetric pigmented follicular openings, gray dots or granularity and rhomboidal structures. Dermoscopy supports assessment but does not exclude malignancy when suspicious changes are present.",
  "differential": "SCC in situ / Bowen disease, invasive cutaneous SCC, seborrhoeic keratosis, superficial BCC, inflammatory dermatoses, solar lentigo and â€” especially for pigmented facial lesions â€” lentigo maligna.",
  "treatment": "First exclude invasive cSCC or other malignancy. Use lesion-directed therapy for isolated or limited disease and field-directed therapy for multiple AK or field cancerization. Individualize by number and thickness, site, field cancerization, immunosuppression, comorbidities, prior treatment, adherence, preference and tolerability or cosmetic outcome. Consistent UV protection is foundational. No single modality is universally superior. Topical regimens below reflect German/EU labeling and must not be extrapolated across concentrations. Distinguish approved labeling from guideline recommendations.",
  "followup": "Assess response with a treatment-specific interval rather than one unsupported fixed universal schedule for uncomplicated AK. Reassess persistent, recurrent or changing lesions; obtain histology if SCC is suspected. Long-term surveillance is individualized by lesion burden, field cancerization, immunosuppression, prior keratinocyte cancer, treatment resistance and occupational UV exposure.",
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
      "text": "UV-associated keratinocytic intraepidermal neoplasia on chronically sun-damaged skin; field cancerization is common."
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
        "colors": [
          "erythematous",
          "pigmented variant possible"
        ],
        "text": "Rough or gritty erythematous macule, papule or plaque with variable adherent scale; may be easier to feel than see; pigmented AK is a recognized variant."
      },
      "localization": {
        "sites": [
          "face",
          "scalp",
          "upper-extremities",
          "sun-exposed-skin"
        ],
        "distribution": [
          "photo-distributed"
        ],
        "text": "Face, ears, bald scalp, dorsal hands and forearms; often multiple lesions within field cancerization."
      },
      "symptoms": {
        "values": [
          "tender",
          "asymptomatic"
        ],
        "text": "Often asymptomatic; tenderness may occur and is a clinical red-flag clue when new or progressive."
      },
      "course": {
        "values": [
          "chronic"
        ],
        "text": "May persist, recur or change; selected lesions can progress to cSCC, without a universal progression percentage."
      }
    },
    "dermoscopy": {
      "patterns": [
        "non-pigmented facial erythematous pseudonetwork / strawberry pattern (not universal for every AK)",
        "pigmented brown/gray pseudonetwork",
        "annular-granular pigmentation",
        "rhomboidal structures"
      ],
      "pigmentStructures": [
        "asymmetric pigmented follicular openings",
        "gray dots / granularity"
      ],
      "scaleKeratinClues": [
        "surface scale",
        "follicular openings",
        "keratotic plugs"
      ],
      "highRiskClues": [
        "features suggesting SCC in situ, invasive SCC or lentigo maligna require clinicopathologic correlation"
      ],
      "text": "Distinguish non-pigmented facial AK from pigmented AK. Dermoscopy supports assessment but does not exclude malignancy when suspicious changes are present."
    },
    "diagnostics": [
      {
        "method": "clinical-examination",
        "role": "routine",
        "indication": "Usual diagnosis is clinical, supported by dermoscopy when available; assess lesion number, thickness, field cancerization and red flags."
      },
      {
        "method": "dermoscopy",
        "role": "routine",
        "indication": "Support characterization of non-pigmented versus pigmented AK and help triage mimics; does not replace biopsy when malignancy is suspected."
      },
      {
        "method": "biopsy",
        "role": "unclear-cases",
        "indication": "Histopathology when diagnosis is uncertain; lentigo maligna, SCC in situ or invasive cSCC is in the differential; the lesion persists or recurs after appropriate therapy; or clinical progression is suspicious. Do not imply that every typical AK needs routine biopsy.",
        "sourceUrls": [
          "https://onlinelibrary.wiley.com/doi/10.1111/ddg.15231",
          "https://register.awmf.org/assets/guidelines/032-022OLl_S3_Aktinische_Keratosen-Plattenepithelkarzinom-PEK_2023-01.pdf"
        ]
      },
      {
        "method": "histopathology",
        "role": "confirmatory",
        "indication": "Confirm diagnosis and exclude invasion when biopsy is performed; adequate sampling is required if invasion is suspected."
      }
    ],
    "histopathology": "Keratinocytic atypia within the epidermis with orthokeratosis/parakeratosis and solar elastosis is typical; the pathologist distinguishes AK from SCC in situ and invasive cSCC. No ICD-O code is assigned from clinical AK alone.",
    "differentials": [
      {
        "diagnosis": "Squamous cell carcinoma in situ / Bowen disease",
        "distinguishingClue": "Often broader, more plaque-like or atypical; biopsy when uncertain."
      },
      {
        "diagnosis": "Invasive cutaneous squamous cell carcinoma",
        "distinguishingClue": "Induration, ulceration, spontaneous bleeding, rapid growth or treatment resistance â€” biopsy rather than blind destruction."
      },
      {
        "diagnosis": "Seborrhoeic keratosis"
      },
      {
        "diagnosis": "Superficial basal cell carcinoma"
      },
      {
        "diagnosis": "Inflammatory dermatosis"
      },
      {
        "diagnosis": "Solar lentigo",
        "distinguishingClue": "Especially versus early pigmented AK."
      },
      {
        "diagnosis": "Lentigo maligna",
        "distinguishingClue": "Critical differential for pigmented facial lesions; biopsy or specialist assessment when suspected."
      },
      {
        "diagnosis": "Actinic cheilitis",
        "distinguishingClue": "Related UV-associated lip disease managed as a distinct entity; not ordinary cutaneous AK."
      }
    ],
    "treatment": {
      "steps": [
        {
          "level": "first-line",
          "interventions": [
            {
              "intervention": "Treatment-selection framework before choosing a modality",
              "details": "1) Exclude invasive cSCC/malignancy first. 2) Lesion-directed therapy for isolated/limited disease. 3) Field-directed therapy for multiple AK or field cancerization. 4) Individualize by lesion number/thickness, site, field cancerization, immunosuppression, comorbidities, previous treatment, adherence, preference and tolerability/cosmetic outcome. 5) Consistent UV protection is foundational. No single modality is universally superior. Separate approved labeling from guideline recommendations.",
              "sourceUrls": [
                "https://onlinelibrary.wiley.com/doi/10.1111/ddg.15231",
                "https://register.awmf.org/assets/guidelines/032-022OLl_S3_Aktinische_Keratosen-Plattenepithelkarzinom-PEK_2023-01.pdf"
              ]
            },
            {
              "intervention": "Topical field- and lesion-directed drug therapy (formulation/concentration-specific; German/EU labeling)",
              "details": "Do not extrapolate regimens across concentrations. Ingenol mebutate is not included (withdrawn / not for use). No unsupported efficacy percentages are stated.",
              "medications": [
                {
                  "name": "5-Fluorouracil 4% cream (e.g. Tolak)",
                  "route": "topical",
                  "formulation": "40 mg/g (4%) cream",
                  "dose": "Thin layer to affected face and/or ears and/or scalp field",
                  "frequency": "Once daily",
                  "duration": "4 weeks as tolerated",
                  "contraindications": "Pregnancy and breastfeeding; known dihydropyrimidine dehydrogenase (DPD) deficiency; concomitant brivudine/sorivudine or related analogues.",
                  "precautions": "Generally for non-hyperkeratotic/non-hypertrophic (Olsen Iâ€“II) AK of face/ears/scalp per German/EU labeling; expect inflammatory local skin reactions; wash hands after application.",
                  "monitoring": "Local skin reaction intensity; interrupt or treat supportively if severe; assess response after the post-treatment recovery period.",
                  "pregnancy": "Contraindicated in pregnancy and breastfeeding per fluoropyrimidine labeling.",
                  "sourceUrls": [
                    "https://www.fachinfo.de/fi/pdf/022967/tolak-r-40-mg-g-creme"
                  ]
                },
                {
                  "name": "5-Fluorouracil 5% cream (e.g. Efudix)",
                  "route": "topical",
                  "formulation": "5% cream",
                  "dose": "Thin layer covering lesions; German Fachinformation limits total treated area to a maximum of 500 cmÂ² at one time â€” treat larger areas sequentially",
                  "frequency": "Twice daily",
                  "duration": "About 2â€“4 weeks until an inflammatory/erosive response is reached; healing may continue after stopping",
                  "contraindications": "Pregnancy and breastfeeding; DPD deficiency; brivudine/sorivudine interaction â€” same fluoropyrimidine warnings as other 5-FU topicals.",
                  "precautions": "Product-specific maximum area 500 cmÂ² per current German Fachinformation; inflammatory local reactions are expected; do not extrapolate the 4% schedule to 5%.",
                  "monitoring": "Local reaction and systemic fluoropyrimidine toxicity symptoms if extensive use or DPD risk.",
                  "pregnancy": "Contraindicated in pregnancy and breastfeeding.",
                  "sourceUrls": [
                    "https://www.fachinfo.de/fi/detail/003786/efudix-r-5-creme"
                  ]
                },
                {
                  "name": "5-Fluorouracil 0.5% + salicylic acid 10% solution (Actikerall)",
                  "route": "topical",
                  "formulation": "5 mg/g fluorouracil + 100 mg/g salicylic acid cutaneous solution",
                  "dose": "Apply to affected area; total treated skin must not exceed 25 cmÂ² (5Ã—5 cm)",
                  "frequency": "Once daily",
                  "duration": "Until clearance or up to 12 weeks; reduce frequency if severe local reactions",
                  "contraindications": "Contraindicated during pregnancy and breastfeeding, in patients with renal insufficiency, and in patients with hypersensitivity to fluorouracil, salicylic acid or any excipient. Actikerall must not be used concomitantly with brivudine, sorivudine or their analogues; a minimum interval of four weeks must be observed between treatment with these antiviral nucleoside analogues and fluorouracil.",
                  "precautions": "Mild to moderately hyperkeratotic Olsen Iâ€“II AK in immunocompetent adults per German/EU PI; application precautions and occlusion/removal of film as labeled; max 25 cmÂ² remains supported.",
                  "monitoring": "Local reaction; response may continue for weeks after the end of treatment.",
                  "pregnancy": "Contraindicated in pregnancy and breastfeeding.",
                  "sourceUrls": [
                    "https://www.fachinfo.de/fi/pdf/013084/actikerall-5-mg-g-100-mg-g-loesung-zur-anwendung-auf-der-haut"
                  ]
                },
                {
                  "name": "Imiquimod 5% cream (e.g. Aldara)",
                  "route": "topical",
                  "formulation": "5% cream sachets",
                  "dose": "Thin layer to contiguous treatment field on face or balding scalp; one sachet is the usual maximum per application (~25 cmÂ² guidance in labeling)",
                  "frequency": "3 nights per week (e.g. Mon/Wed/Fri) with ~8 hours on-skin time",
                  "duration": "4 weeks, then 4-week treatment-free interval and clinical assessment; an optional second 4-week course if residual AK and labeling allows",
                  "contraindications": "Hypersensitivity to imiquimod; avoid on open wounds as labeled.",
                  "precautions": "Local inflammatory reactions expected; caution in autoimmune disease, transplant recipients and other immunosuppression; keep separate from 3.75% regimen.",
                  "monitoring": "Local skin reaction and flu-like symptoms; rest periods if intense inflammation.",
                  "pregnancy": "Use only if clearly needed after product-specific risk assessment; verify current label.",
                  "sourceUrls": [
                    "https://www.ema.europa.eu/en/medicines/human/EPAR/aldara"
                  ]
                },
                {
                  "name": "Imiquimod 3.75% cream (e.g. Zyclara)",
                  "route": "topical",
                  "formulation": "3.75% cream",
                  "dose": "Up to 2 sachets per application to face or balding scalp field as labeled",
                  "frequency": "Once daily",
                  "duration": "2 weeks on, 2 weeks off, then another 2-week course â€” keep separate from the 5% schedule",
                  "contraindications": "Hypersensitivity to imiquimod.",
                  "precautions": "Local inflammation expected; caution autoimmune disease, transplant/immunosuppression; do not interchange with 5% dosing.",
                  "monitoring": "Local and systemic inflammatory symptoms; rest days per label if needed.",
                  "pregnancy": "Use only if clearly needed after product-specific risk assessment; verify current label.",
                  "sourceUrls": [
                    "https://www.ema.europa.eu/en/medicines/human/EPAR/zyclara"
                  ]
                },
                {
                  "name": "Tirbanibulin 1% ointment (Klisyri)",
                  "route": "topical",
                  "formulation": "10 mg/g (1%) ointment in single-use sachets",
                  "dose": "Thin layer to a contiguous field of up to 25 cmÂ² on face or scalp (German/EU maximum â€” do not apply the larger US-labeled maximum field size)",
                  "frequency": "Once daily",
                  "duration": "5 consecutive days; assess response at about 8 weeks; do not apply to open wounds",
                  "contraindications": "Hypersensitivity to tirbanibulin; application on open wounds or injured skin until healed.",
                  "precautions": "Field treatment of non-hyperkeratotic, non-hypertrophic Olsen I AK of face/scalp in adults per GER/EU labeling; wash hands after use; keep treated area undisturbed for ~8 hours.",
                  "monitoring": "Local reactions; therapeutic effect evaluable around 8 weeks after starting the cycle.",
                  "pregnancy": "Avoid unless potential benefit justifies potential risk per current GER/EU label.",
                  "sourceUrls": [
                    "https://www.fachinfo.de/fi/detail/23428/Klisyri-10-mg-g-Salbe"
                  ]
                },
                {
                  "name": "Diclofenac 3% in hyaluronic acid gel (e.g. Solaraze / Solacutan)",
                  "route": "topical",
                  "formulation": "3% diclofenac sodium gel with sodium hyaluronate",
                  "dose": "About 0.5 g (pea-sized) per 5Ã—5 cm area; German Fachinformation maximum 8 g/day (up to about 200 cmÂ²)",
                  "frequency": "Twice daily",
                  "duration": "60â€“90 days per product information",
                  "contraindications": "NSAID hypersensitivity / NSAID-triggered asthma, urticaria or acute rhinitis; third trimester of pregnancy.",
                  "precautions": "Avoid NSAID-sensitive patients; use caution earlier in pregnancy; photosensitivity counseling as labeled.",
                  "monitoring": "Local tolerance and clinical response; complete healing may lag treatment end by up to ~30 days.",
                  "pregnancy": "Contraindicated in the third trimester; avoid earlier unless justified â€” verify current label.",
                  "sourceUrls": [
                    "https://www.fachinfo.de/fi/pdf/007858/solaraze-3-gel"
                  ]
                }
              ],
              "sourceUrls": [
                "https://onlinelibrary.wiley.com/doi/10.1111/ddg.15231",
                "https://www.fachinfo.de/fi/pdf/022967/tolak-r-40-mg-g-creme",
                "https://www.fachinfo.de/fi/detail/003786/efudix-r-5-creme",
                "https://www.fachinfo.de/fi/pdf/013084/actikerall-5-mg-g-100-mg-g-loesung-zur-anwendung-auf-der-haut",
                "https://www.ema.europa.eu/en/medicines/human/EPAR/aldara",
                "https://www.ema.europa.eu/en/medicines/human/EPAR/zyclara",
                "https://www.fachinfo.de/fi/detail/23428/Klisyri-10-mg-g-Salbe",
                "https://www.fachinfo.de/fi/pdf/007858/solaraze-3-gel"
              ]
            }
          ]
        },
        {
          "level": "procedural",
          "interventions": [
            {
              "intervention": "Cryotherapy (liquid nitrogen), lesion-directed",
              "details": "Appropriate for selected Olsen Iâ€“III lesions when invasion has been excluded clinically. No universal freeze time: individualize. Guideline ranges may include 1â€“2 freezeâ€“thaw cycles of about 15â€“60 seconds, but this is not mandatory for every lesion. Adverse effects: pain, blistering, erosion, pigment change, scarring, alopecia on hair-bearing skin, delayed healing. Suspicious thick, indurated, ulcerated or rapidly growing lesions need histology â€” not blind destruction.",
              "sourceUrls": [
                "https://onlinelibrary.wiley.com/doi/10.1111/ddg.15231",
                "https://register.awmf.org/assets/guidelines/032-022OLl_S3_Aktinische_Keratosen-Plattenepithelkarzinom-PEK_2023-01.pdf"
              ]
            },
            {
              "intervention": "Curettage, shave or excision for selected isolated lesions",
              "details": "Curettage may fragment tissue; superficial shave may miss depth. When invasion is suspected, obtain adequate biopsy or excision rather than destructive therapy alone.",
              "sourceUrls": [
                "https://onlinelibrary.wiley.com/doi/10.1111/ddg.15231"
              ]
            },
            {
              "intervention": "Photodynamic therapy (ALA/MAL)",
              "details": "Conventional red-light ALA/MAL PDT, daylight PDT, or simulated daylight where appropriate. Useful for single, multiple or field treatment, especially non-pigmented Olsen Iâ€“II face/scalp disease; pretreat hyperkeratotic lesions when needed. Conventional PDT is typically more painful; daylight PDT is often better tolerated. Assess response at about 3 months and repeat per protocol.",
              "sourceUrls": [
                "https://onlinelibrary.wiley.com/doi/10.1111/ddg.15231"
              ]
            },
            {
              "intervention": "Biopsy or specialist assessment",
              "details": "Required when diagnosis is uncertain, red flags are present, or invasion cannot be excluded before destructive therapy."
            }
          ]
        },
        {
          "level": "supportive-care",
          "interventions": [
            {
              "intervention": "Foundational UV protection and field-cancerization counseling",
              "details": "Broad-spectrum UVA/UVB protection with adequate quantity and reapplication, clothing and headwear, avoidance of tanning devices, self-examination, and prompt assessment for red flags or persistence after therapy.",
              "sourceUrls": [
                "https://register.awmf.org/assets/guidelines/032-052OLl_S3_Praevention-Hautkrebs_2021-09.pdf",
                "https://onlinelibrary.wiley.com/doi/10.1111/ddg.15231"
              ]
            }
          ]
        }
      ],
      "nonPharmacological": [
        "Broad-spectrum UVA/UVB photoprotection with adequate quantity and reapplication",
        "Protective clothing and headwear",
        "No tanning devices",
        "Skin self-examination and prompt review of red-flag changes"
      ]
    },
    "followUp": {
      "strategy": "risk-adapted",
      "text": "Use treatment-specific response assessment rather than one fixed universal interval for uncomplicated AK. Reassess persistent, recurrent or changing lesions; pursue histology if SCC is suspected. Individualize long-term surveillance by burden, field cancerization, immunosuppression, prior keratinocyte cancer, treatment resistance and occupational UV exposure."
    },
    "redFlags": [
      "Increasing thickness or hyperkeratosis",
      "Induration",
      "Tenderness or spontaneous pain",
      "Ulceration",
      "Spontaneous bleeding",
      "Enlargement or rapid growth",
      "Treatment resistance or recurrence after appropriate therapy",
      "Pigmented facial lesion concerning for lentigo maligna"
    ],
    "referral": [
      {
        "type": "biopsy-assessment",
        "indication": "Uncertain diagnosis, red-flag progression, or suspected invasive disease before destructive therapy."
      },
      {
        "type": "dermatology",
        "indication": "Field cancerization, complex topical/procedural planning, pigmented facial lesions needing LM exclusion, or immunosuppression."
      }
    ],
    "patientCounseling": [
      "AK is UV-associated; consistent photoprotection reduces further field damage.",
      "Use broad-spectrum UVA/UVB protection with sufficient quantity and reapplication; add clothing and headwear; avoid tanning devices.",
      "Self-examine treated and surrounding skin; seek prompt review for thickening, pain, ulceration, bleeding, rapid growth or non-response.",
      "Expected local skin reactions to topical field therapy are common and treatment-specific â€” they are not ignored red flags for invasion.",
      "Actinic cheilitis of the lip is related but distinct; persistent lip erosions need separate assessment.",
      "For suspected occupational natural UV causation, assess BK 5103 separately: multiple AK means more than 5 AK within 12 months or field cancerization greater than 4 cmÂ² on occupationally exposed skin; statutory reporting applies when suspicion is justified â€” not automatic for every AK patient."
    ],
    "specialPopulations": [
      {
        "population": "pregnancy",
        "note": "Prefer non-systemically absorbed procedural options when treatment cannot wait; topical fluoropyrimidines and diclofenac (especially third trimester) have label restrictions â€” verify current Fachinformation."
      },
      {
        "population": "lactation",
        "note": "Fluoropyrimidine topicals are generally contraindicated while breastfeeding per labeling; verify each product."
      },
      {
        "population": "immunocompromised",
        "note": "Higher keratinocyte-cancer risk and atypical behavior; lower threshold for histology and specialist-led field management; imiquimod caution in transplant/autoimmune settings."
      },
      {
        "population": "renal-impairment",
        "note": "Relevant for fluorouracil/salicylic acid solution per Fachinformation application precautions."
      }
    ],
    "evidenceMap": {
      "presentation": [
        "https://onlinelibrary.wiley.com/doi/10.1111/ddg.15231",
        "https://dermnetnz.org/topics/actinic-keratosis"
      ],
      "dermoscopy": [
        "https://dermnetnz.org/topics/actinic-keratosis",
        "https://onlinelibrary.wiley.com/doi/10.1111/ddg.15231"
      ],
      "diagnostics": [
        "https://onlinelibrary.wiley.com/doi/10.1111/ddg.15231",
        "https://register.awmf.org/assets/guidelines/032-022OLl_S3_Aktinische_Keratosen-Plattenepithelkarzinom-PEK_2023-01.pdf"
      ],
      "differentials": [
        "https://dermnetnz.org/topics/actinic-keratosis",
        "https://onlinelibrary.wiley.com/doi/10.1111/ddg.15231"
      ],
      "treatment": [
        "https://onlinelibrary.wiley.com/doi/10.1111/ddg.15231",
        "https://register.awmf.org/assets/guidelines/032-022OLl_S3_Aktinische_Keratosen-Plattenepithelkarzinom-PEK_2023-01.pdf",
        "https://www.fachinfo.de/fi/pdf/022967/tolak-r-40-mg-g-creme",
        "https://www.fachinfo.de/fi/detail/003786/efudix-r-5-creme",
        "https://www.fachinfo.de/fi/pdf/013084/actikerall-5-mg-g-100-mg-g-loesung-zur-anwendung-auf-der-haut",
        "https://www.ema.europa.eu/en/medicines/human/EPAR/aldara",
        "https://www.ema.europa.eu/en/medicines/human/EPAR/zyclara",
        "https://www.fachinfo.de/fi/detail/23428/Klisyri-10-mg-g-Salbe",
        "https://www.fachinfo.de/fi/pdf/007858/solaraze-3-gel"
      ],
      "followUp": [
        "https://onlinelibrary.wiley.com/doi/10.1111/ddg.15231",
        "https://register.awmf.org/assets/guidelines/032-052OLl_S3_Praevention-Hautkrebs_2021-09.pdf"
      ],
      "redFlags": [
        "https://onlinelibrary.wiley.com/doi/10.1111/ddg.15231",
        "https://register.awmf.org/assets/guidelines/032-022OLl_S3_Aktinische_Keratosen-Plattenepithelkarzinom-PEK_2023-01.pdf"
      ]
    },
    "sourceUrls": [
      "https://onlinelibrary.wiley.com/doi/10.1111/ddg.15231",
      "https://register.awmf.org/assets/guidelines/032-022OLl_S3_Aktinische_Keratosen-Plattenepithelkarzinom-PEK_2023-01.pdf",
      "https://register.awmf.org/assets/guidelines/032-052OLl_S3_Praevention-Hautkrebs_2021-09.pdf",
      "https://klassifikationen.bfarm.de/icd-10-gm/kode-suche/htmlgm2026/block-l55-l59.htm",
      "https://www.dguv.de/bk-info/icd-10-kapitel/kapitel_12/bk5103/index.jsp",
      "https://www.fachinfo.de/fi/pdf/022967/tolak-r-40-mg-g-creme",
      "https://www.fachinfo.de/fi/detail/003786/efudix-r-5-creme",
      "https://www.fachinfo.de/fi/pdf/013084/actikerall-5-mg-g-100-mg-g-loesung-zur-anwendung-auf-der-haut",
      "https://www.ema.europa.eu/en/medicines/human/EPAR/aldara",
      "https://www.ema.europa.eu/en/medicines/human/EPAR/zyclara",
      "https://www.fachinfo.de/fi/detail/23428/Klisyri-10-mg-g-Salbe",
      "https://www.fachinfo.de/fi/pdf/007858/solaraze-3-gel",
      "https://icd.who.int/browse10/2019/en",
      "https://dermnetnz.org/topics/actinic-keratosis"
    ]
  },
  "references": [
    {
      "title": "S3 guideline: actinic keratosis and cutaneous squamous cell carcinoma â€” update 2023, part 1: treatment of actinic keratosis, actinic cheilitis, Bowen disease, occupational disease and structures of care",
      "organization": "German Dermatological Society guideline group / AWMF 032/022OL",
      "type": "guideline",
      "year": 2023,
      "version": "2.0",
      "url": "https://onlinelibrary.wiley.com/doi/10.1111/ddg.15231",
      "doi": "10.1111/ddg.15231",
      "metadataCheckedAt": "2026-09-20"
    },
    {
      "title": "S3-Leitlinie Aktinische Keratose und Plattenepithelkarzinom der Haut (Langfassung)",
      "organization": "Leitlinienprogramm Onkologie / AWMF",
      "type": "guideline",
      "year": 2023,
      "version": "2.0; AWMF 032/022OL",
      "url": "https://register.awmf.org/assets/guidelines/032-022OLl_S3_Aktinische_Keratosen-Plattenepithelkarzinom-PEK_2023-01.pdf",
      "doi": null,
      "metadataCheckedAt": "2026-09-20"
    },
    {
      "title": "S3-Leitlinie PrÃ¤vention von Hautkrebs",
      "organization": "Leitlinienprogramm Onkologie / AWMF",
      "type": "guideline",
      "year": 2021,
      "version": "2.1; AWMF 032/052OL",
      "url": "https://register.awmf.org/assets/guidelines/032-052OLl_S3_Praevention-Hautkrebs_2021-09.pdf",
      "doi": null,
      "metadataCheckedAt": "2026-09-23"
    },
    {
      "title": "ICD-10-GM Version 2026 â€” L57.0 Aktinische Keratose",
      "organization": "BfArM",
      "type": "official classification",
      "year": 2026,
      "version": "2026",
      "url": "https://klassifikationen.bfarm.de/icd-10-gm/kode-suche/htmlgm2026/block-l55-l59.htm",
      "doi": null,
      "metadataCheckedAt": "2026-09-20"
    },
    {
      "title": "BK 5103 â€” Squamous cell carcinomas or multiple actinic keratoses of the skin caused by natural UV radiation",
      "organization": "DGUV",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://www.dguv.de/bk-info/icd-10-kapitel/kapitel_12/bk5103/index.jsp",
      "doi": null,
      "metadataCheckedAt": "2026-09-20"
    },
    {
      "title": "Tolak 40 mg/g Creme â€” Fachinformation",
      "organization": "Fachinfo-Service / German product information",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://www.fachinfo.de/fi/pdf/022967/tolak-r-40-mg-g-creme",
      "doi": null,
      "metadataCheckedAt": "2026-09-23"
    },
    {
      "title": "Efudix 5% cream â€” German Fachinformation",
      "organization": "German product information",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://www.fachinfo.de/fi/detail/003786/efudix-r-5-creme",
      "doi": null,
      "metadataCheckedAt": "2026-09-20"
    },
    {
      "title": "Actikerall 5 mg/g + 100 mg/g LÃ¶sung zur Anwendung auf der Haut â€” Fachinformation",
      "organization": "Fachinfo-Service / Almirall Hermal GmbH / German product information",
      "type": "clinical reference",
      "year": null,
      "version": "January 2023",
      "url": "https://www.fachinfo.de/fi/pdf/013084/actikerall-5-mg-g-100-mg-g-loesung-zur-anwendung-auf-der-haut",
      "doi": null,
      "metadataCheckedAt": "2026-09-23"
    },
    {
      "title": "Aldara 5% cream â€” EPAR Product Information",
      "organization": "European Medicines Agency",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/aldara",
      "doi": null,
      "metadataCheckedAt": "2026-09-20"
    },
    {
      "title": "Zyclara 3.75% cream â€” EPAR Product Information",
      "organization": "European Medicines Agency",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/zyclara",
      "doi": null,
      "metadataCheckedAt": "2026-09-20"
    },
    {
      "title": "Klisyri 10 mg/g ointment (tirbanibulin) â€” German Fachinformation / EU product information",
      "organization": "German product information / EMA",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://www.fachinfo.de/fi/detail/23428/Klisyri-10-mg-g-Salbe",
      "doi": null,
      "metadataCheckedAt": "2026-09-20"
    },
    {
      "title": "Solaraze 3% gel â€” German Fachinformation",
      "organization": "German product information",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://www.fachinfo.de/fi/pdf/007858/solaraze-3-gel",
     Û~õçkh‘éì¶»§q«^u¡”Í…±Àˆ°(€€‰‘¥…¹½Í¥Í1…‰•°ˆè€‰5•±…¹½……¹Ñ¡½µ„ˆ°(€€‰‘¥Í•…Í•%ˆè€‰µ•±…¹½……¹Ñ¡½µ„ˆ°(€€‰…Ñ•½Éäˆè€‰	•¹¥¸­•É…Ñ¥¹½åÑ¥Œˆ°(€€‰•‘Õ…Ñ¥½¹…±1•Ù•°ˆè€‰¥¹Ñ•Éµ•‘¥…Ñ”ˆ°(€€‰…Í•QåÁ”ˆè€‰±¥¹¥…±}‘•Éµ½Í½Á¥Œˆ°(€€‰Á…Ñ¥•¹Ñ½¹Ñ•áĞˆèì(€€€€‰…•	…¹ˆè€ˆÜØå•…ÉÌ°Á•ÈÑ¡”…Í”Ñ•áĞˆ°(€€€€‰Í•àˆè€‰5…±”°Á•ÈÑ¡”…Í”Ñ•áĞˆ°(€€€€‰…¹…Ñ½µ¥…±M¥Ñ”ˆè€‰I¥¡ĞÁ…É¥•Ñ…°Í…±Àˆ°(€€€€‰ÁÉ•Í•¹Ñ…Ñ¥½¹9½Ñ•Ìˆè€‰Q¡”…Í”É•Á½ÉĞ‘•ÍÉ¥‰•Ì„É…Á¥‘±äÉ½İ¥¹œ€äµµ´…Íåµµ•ÑÉ¥Œ‘…É¬µ‰É½İ¸Á±…ÅÕ”½¸Ñ¡”É¥¡ĞÁ…É¥•Ñ…°Í…±À¸Q¡”…ÕÑ¡½ÉÌ™¥ÉÍĞ½¹Í¥‘•É•Í•‰½ÉÉ¡•¥Œ­•É…Ñ½Í¥Ì°Ñ¡•¸ÕÍ•É•™±•Ñ…¹”½¹™½…°µ¥É½Í½Áä‰•…ÕÍ”½˜¥ÉÉ•Õ±…È‘•Éµ½Í½Á¥Œ‘½ÑÌ°…¹•á¥Í•Ñ¡”±•Í¥½¸¸ˆ(€ô°(€€‰¥µ…•Ìˆèl(€€€ì(€€€€€€‰…ÑÑÉ¥‰ÕÑ¥½¹I•ÅÕ¥É•ˆèÑÉÕ”°(€€€€€€‰µ½‘¥™¥…Ñ¥½¹MÑ…ÑÕÌˆè€‰É½ÁÁ•ˆ°(€€€€€€‰…•ÍÍ…Ñ”ˆè€ˆÈÀÈØ´ÄÄ´Ääˆ°(€€€€€€‰µ•Ñ…‘…Ñ…¡•­•‘Ğˆè€ˆÈÀÈØ´ÄÄ´Ääˆ°(€€€€€€‰Í½ÕÉ•Y•É¥™¥…Ñ¥½¹MÑ…ÑÕÌˆè€‰Ù•É¥™¥•ˆ°(€€€€€€‰Á…Ñ¥•¹Ñ%‘•¹Ñ¥™¥…‰±”ˆè™…±Í”°(€€€€€€‰¥ˆè€‰¥µœµœÌÄ´ÀÅ„ˆ°(€€€€€€‰ÑåÁ”ˆè€‰±¥¹¥…°ˆ°(€€€€€€‰ÍÉŒˆè€‰…ÍÍ•ÑÌ½µ•‘¥„½…Í•Ì½…Í”´ÔÔµ±¥¹¥…°¹©Áœˆ°(€€€€€€‰‘¥µ•¹Í¥½¹Ìˆèì(€€€€€€€€‰İ¥‘Ñ ˆè€ÌÌÈ°(€€€€€€€€‰¡•¥¡Ğˆè€ĞÈÄ(€€€€€ô°(€€€€€€‰…±Ğˆè€‰±¥¹¥…°±½Í”µÕÀ½˜„‘…É¬µ‰É½İ¸Á±…ÅÕ”½¸Í¡½ÉĞİ¡¥Ñ”Í…±À¡…¥È‰•Í¥‘”„Á…Á•Èµ•…ÍÕÉ¥¹œÉÕ±•È¸9¼‘¥…¹½Í¥Ì¥Ì¥¹±Õ‘•¸ˆ°(€€€€€€‰…ÁÑ¥½¸ˆè€‰±¥¹¥…°±½Í”µÕÀ½˜„‘…É¬Í…±ÀÁ±…ÅÕ”¸Q¡”Í½ÕÉ”±…‰•°ÍÑ…åÌ¡¥‘‘•¸Õ¹Ñ¥°É•Ù•…°¸Á…Á•ÈÉÕ±•ÈÍ¥ÑÌ‰•Í¥‘”Ñ¡”±•Í¥½¸¸ˆ°(€€€€€€‰Í½ÕÉ”ˆè€‰A½ÉÑ¼L°	±Õµ•ÑÑ¤Q@°‘”5…•‘¼5@°	É…„)P¸¹…¥Ì	É…Í¥±•¥É½Ì‘”•Éµ…Ñ½±½¥„€ÈÀÄä°Ù¥„AÕ‰5••¹ÑÉ…°€¡A5ØäÌäÀÜÜ¤ˆ°(€€€€€€‰Í½ÕÉ•UÉ°ˆè€‰¡ÑÑÁÌè¼½‘½¤¹½Éœ¼ÄÀ¸ÄÀÄØ½¨¹…‰¸ÈÀÄä¸ÀÄ¸ÀÀÈˆ°(€€€€€€‰É•…Ñ½Èˆè€‰¹„…É½±¥¹„M½Õé„A½ÉÑ¼…¹½…ÕÑ¡½ÉÌˆ°(€€€€€€‰±¥•¹Í”ˆè€‰	d€Ğ¸Àˆ°(€€€€€€‰±¥•¹Í•UÉ°ˆè€‰¡ÑÑÁÌè¼½É•…Ñ¥Ù•½µµ½¹Ì¹½Éœ½±¥•¹Í•Ì½‰ä¼Ğ¸À¼ˆ°(€€€€€€‰…ÑÑÉ¥‰ÕÑ¥½¸ˆè€‰A½ÉÑ¼…¹½…ÕÑ¡½ÉÌ°¹…¥Ì	É…Í¥±•¥É½Ì‘”•Éµ…Ñ½±½¥„€ÈÀÄä°¥ÕÉ”€ÄÁ…¹•°°‘½¤èÄÀ¸ÄÀÄØ½¨¹…‰¸ÈÀÄä¸ÀÄ¸ÀÀÈ¸	d€Ğ¸À¸É½ÁÁ•™É½´Ñ¡”A5™¥ÕÉ”‰ä½ÕÑ¥Ì¸ˆ°(€€€€€€‰µ½‘¥™¥…Ñ¥½¹Í9½Ñ•Ìˆè€‰A…¹•°½˜¥ÕÉ”€Äİ…ÌÉ½ÁÁ•™É½´Ñ¡”A5™¥ÕÉ”™¥±”ÈÄ¹©Áœ€¡A5ØäÌäÀÜÜ¤°Í½ÕÉ”Í¡„ÈÔØ€äÀÉ˜àÁ˜ÔÄäÉ…ŒÀÙ”Õ…˜İ•…„ÀÔàÀİ‰…˜àåŒåˆÙ‘ŒäÁŒÑ…ˆàÙˆÅ„Ñ•„ÔØÄÙ…ˆ°…ĞÁ¥á•°‰½à±•™Ğ€È°Ñ½À€È°É¥¡Ğ€ÌÌĞ°‰½ÑÑ½´€ĞÈÌİ¥Ñ A¥±±½Ü°Ñ¡•¸Í…Ù•…Ì)AÅÕ…±¥Ñä€äÀİ¥Ñ¡½ÕĞµ•Ñ…‘…Ñ„¸=ÕÑÁÕĞÍ¡„ÈÔØˆÉŒÜĞÜÅŒÜÑ™‘‘ˆÀÈå˜äÜÜÄÕ•˜ÄàÈÈÌäØÅŒÙ˜ÌĞÄÑÌĞÁˆÜÑ‘ÄÔÜÔààÍ˜É„ÔÕˆ¸9¼½±½È¡…¹”°¹¼…¹¹½Ñ…Ñ¥½¸°…¹¹¼½Ñ¡•È•‘¥Ğ¸ˆ°(€€€€€€‰½¹Í•¹Ñ	…Í¥Ìˆè€‰Q¡”…ÉÑ¥±”¥Ì‘¥ÍÑÉ¥‰ÕÑ•Õ¹‘•È	d€Ğ¸À¸Q¡”É½À¥Ì„Í…±À±½Í”µÕÀİ¥Ñ …¸•…È•‘”…¹¹¼™Õ±°™…”¸ˆ(€€€ô°(€€€ì(€€€€€€‰…ÑÑÉ¥‰ÕÑ¥½¹I•ÅÕ¥É•ˆèÑÉÕ”°(€€€€€€‰µ½‘¥™¥…Ñ¥½¹MÑ…ÑÕÌˆè€‰É½ÁÁ•ˆ°(€€€€€€‰…•ÍÍ…Ñ”ˆè€ˆÈÀÈØ´ÄÄ´Ääˆ°(€€€€€€‰µ•Ñ…‘…Ñ…¡•­•‘Ğˆè€ˆÈÀÈØ´ÄÄ´Ääˆ°(€€€€€€‰Í½ÕÉ•Y•É¥™¥…Ñ¥½¹MÑ…ÑÕÌˆè€‰Ù•É¥™¥•ˆ°(€€€€€€‰Á…Ñ¥•¹Ñ%‘•¹Ñ¥™¥…‰±”ˆè™…±Í”°(€€€€€€‰¥ˆè€‰¥µœµœÌÄ´ÀÅˆˆ°(€€€€€€‰ÑåÁ”ˆè€‰‘•Éµ½Í½Áäˆ°(€€€€€€‰ÍÉŒˆè€‰…ÍÍ•ÑÌ½µ•‘¥„½…Í•Ì½…Í”´ÔÔµ‘•Éµ½Í½Áä¹©Áœˆ°(€€€€€€‰‘¥µ•¹Í¥½¹Ìˆèì(€€€€€€€€‰İ¥‘Ñ ˆè€ÈÔÌ°(€€€€€€€€‰¡•¥¡Ğˆè€ĞÈÄ(€€€€€ô°(€€€€€€‰…±Ğˆè€‰A½±…É¥é•‘•Éµ½Í½Á¥ŒÙ¥•Ü½˜„‘…É¬Á±…ÅÕ”İ¥Ñ É¥‘”µ…¹µ™¥ÍÍÕÉ”ÍÕÉ™…”°¥ÉÉ•Õ±…È‘…É¬‘½ÑÌ°±¥¡Ğ¡…¥ÉÌ°…¹½±½É•Í½ÕÉ”…ÉÉ½İÌ¸9¼‘¥…¹½Í¥Ì¥Ì¥¹±Õ‘•¸ˆ°(€€€€€€‰…ÁÑ¥½¸ˆè€‰A½±…É¥é•‘•Éµ½Í½Á¥ŒÙ¥•Ü½˜Ñ¡”Í…µ”±•Í¥½¸¸½±½É•…ÉÉ½İÌ…É”ÁÉ•Í•¹Ğ¥¸Ñ¡”Í½ÕÉ”™¥ÕÉ”¸µ¥±±¥µ•ÑÉ”Í…±”ÉÕ¹Ì…±½¹œÑ¡”‰½ÑÑ½´•‘”¸ˆ°(€€€€€€‰Í½ÕÉ”ˆè€‰A½ÉÑ¼L°	±Õµ•ÑÑ¤Q@°‘”5…•‘¼5@°	É…„)P¸¹…¥Ì	É…Í¥±•¥É½Ì‘”•Éµ…Ñ½±½¥„€ÈÀÄä°Ù¥„AÕ‰5••¹ÑÉ…°€¡A5ØäÌäÀÜÜ¤ˆ°(€€€€€€‰Í½ÕÉ•UÉ°ˆè€‰¡ÑÑÁÌè¼½‘½¤¹½Éœ¼ÄÀ¸ÄÀÄØ½¨¹…‰¸ÈÀÄä¸ÀÄ¸ÀÀÈˆ°(€€€€€€‰É•…Ñ½Èˆè€‰¹„…É½±¥¹„M½Õé„A½ÉÑ¼…¹½…ÕÑ¡½ÉÌˆ°(€€€€€€‰±¥•¹Í”ˆè€‰	d€Ğ¸Àˆ°(€€€€€€‰±¥•¹Í•UÉ°ˆè€‰¡ÑÑÁÌè¼½É•…Ñ¥Ù•½µµ½¹Ì¹½Éœ½±¥•¹Í•Ì½‰ä¼Ğ¸À¼ˆ°(€€€€€€‰…ÑÑÉ¥‰ÕÑ¥½¸ˆè€‰A½ÉÑ¼…¹½…ÕÑ¡½ÉÌ°¹…¥Ì	É…Í¥±•¥É½Ì‘”•Éµ…Ñ½±½¥„€ÈÀÄä°¥ÕÉ”€ÄÁ…¹•°°‘½¤èÄÀ¸ÄÀÄØ½¨¹…‰¸ÈÀÄä¸ÀÄ¸ÀÀÈ¸	d€Ğ¸À¸É½ÁÁ•™É½´Ñ¡”A5™¥ÕÉ”‰ä½ÕÑ¥Ì¸ˆ°(€€€€€€‰µ½‘¥™¥…Ñ¥½¹Í9½Ñ•Ìˆè€‰A…¹•°½˜¥ÕÉ”€Äİ…ÌÉ½ÁÁ•™É½´Ñ¡”A5™¥ÕÉ”™¥±”ÈÄ¹©Áœ€¡A5ØäÌäÀÜÜ¤°Í½ÕÉ”Í¡„ÈÔØ€äÀÉ˜àÁ˜ÔÄäÉ…ŒÀÙ”Õ…˜İ•…„ÀÔàÀİ‰…˜àåŒåˆÙ‘ŒäÁŒÑ…ˆàÙˆÅ„Ñ•„ÔØÄÙ…ˆ°…ĞÁ¥á•°‰½à±•™Ğ€ÌĞà°Ñ½À€È°É¥¡Ğ€ØÀÄ°‰½ÑÑ½´€ĞÈÌİ¥Ñ A¥±±½Ü°Ñ¡•¸Í…Ù•…Ì)AÅÕ…±¥Ñä€äÀİ¥Ñ¡½ÕĞµ•Ñ…‘…Ñ„¸=ÕÑÁÕĞÍ¡„ÈÔØ€Õ‘˜ÀÙ„ØääÑ‰…”å‰Œİ”İˆääÈÄå˜å„ÌÁ™”Ğá‘ŒÈáŒØÕˆÌÌİ•ŒàÀÄÀÕˆĞÁ„å”Å™„ÄÜ¸M½ÕÉ”µ…ÕÑ¡½É•½±½É•…ÉÉ½İÌÉ•µ…¥¸¸9¼½ÕÑ¥Ì…¹¹½Ñ…Ñ¥½¸İ…Ì…‘‘•¸ˆ°(€€€€€€‰½¹Í•¹Ñ	…Í¥Ìˆè€‰Q¡”…ÉÑ¥±”¥Ì‘¥ÍÑÉ¥‰ÕÑ•Õ¹‘•È	d€Ğ¸À¸Q¡”™¥•±Í¡½İÌÍ­¥¸…¹¡…¥ÉÌ½¹±ä¸ˆ(€€€ô(€t°(€€‰‘¥…¹½ÍÑ¥É½Õ¹‘QÉÕÑ ˆèì(€€€€‰½¹™¥Éµ•‘¥…¹½Í¥Ìˆè€‰5•±…¹½……¹Ñ¡½µ„€¡ÕÑ…¹•½ÕÌµ•±…¹½……¹Ñ¡½µ„ìÉ…É”Í•‰½ÉÉ¡•¥Œ­•É…Ñ½Í¥ÌÙ…É¥…¹Ğ¤ˆ°(€€€€‰½¹™¥Éµ…Ñ¥½¹5•Ñ¡½ˆè€‰¡¥ÍÑ½Á…Ñ¡½±½äˆ°(€€€€‰¡¥ÍÑ½Á…Ñ¡½±½åM½ÕÉ”ˆè€‰…Í•}Ñ•áĞˆ°(€€€€‰½¹™¥Éµ…Ñ¥½¹9½Ñ•Ìˆè€‰Q¡”…Í”Ñ•áĞ½˜A½ÉÑ¼…¹½…ÕÑ¡½ÉÌ€¡¹…¥Ì	É…Í¥±•¥É½Ì‘”•Éµ…Ñ½±½¥„€ÈÀÄä°‘½¤èÄÀ¸ÄÀÄØ½¨¹…‰¸ÈÀÄä¸ÀÄ¸ÀÀÈ¤°¡•­•€ÈÀÈØ´ÄÄ´ÄäÙ¥„A5ØäÌäÀÜÜ°ÍÑ…Ñ•ÌÑ¡…Ğ½¸¡¥ÍÑ½Á…Ñ¡½±½¥…°•Ù…±Õ…Ñ¥½¸¡åÁ•ÉÁ±…ÍÑ¥Œ•Á¥‘•Éµ¥Ì°¡åÁ•É­•É…Ñ½Í¥Ì°……¹Ñ¡½Í¥Ì°…¹‘•¹‘É¥Ñ¥Œµ•±…¹½åÑ•Ìİ•É”Í••¸Ñ¡É½Õ¡½ÕĞÑ¡”±•Í¥½¸°Ñ¡…Ğ5•±…¸µ…¹Å„¥µµÕ¹½ÍÑ…¥¸İ•É”Á½Í¥Ñ¥Ù”°…¹Ñ¡…ĞÑ¡•Í”™¥¹‘¥¹Ìİ•É”½¹Í¥ÍÑ•¹Ğİ¥Ñ ÕÑ…¹•½ÕÌµ•±…¹½……¹Ñ¡½µ„¸ˆ°(€€€€‰½¹™¥‘•¹•9½Ñ”ˆè€‰…Í”µÑ•áĞ¡¥ÍÑ½Á…Ñ¡½±½äÍÑ…Ñ•µ•¹Ğ¸½ÕÑ¥Ì‘¥¹½ĞÍ•”„Í±¥‘”¸9½Ğ„½ÕÑ¥Ì±¥¹¥¥…¸É•Ù¥•Ü¸ˆ(€ô°(€€‰½‰Í•ÉÙ…Ñ¥½¹Ìˆèl(€€€ì(€€€€€€‰¥ˆè€‰½‰ÌµœÌÄ´ÀÅ„ˆ°(€€€€€€‰­¥¹ˆè€‰½‰Í•ÉÙ…Ñ¥½¸ˆ°(€€€€€€‰µ½‘…±¥Ñäˆè€‰±¥¹¥…°ˆ°(€€€€€€‰Ñ•áĞˆè€‰‘…É¬µ‰É½İ¸°Í¡…ÉÁ±ä‰½É‘•É•Á±…ÅÕ”Í¥ÑÌ½¸Í¡½ÉĞİ¡¥Ñ”Í…±À¡…¥È‰•Í¥‘”„Á…Á•Èµ•…ÍÕÉ¥¹œÉÕ±•È¸5¥±É•‘¹•ÍÌÍÕÉÉ½Õ¹‘ÌÑ¡”•‘”¸ˆ(€€€ô°(€€€ì(€€€€€€‰¥ˆè€‰½‰ÌµœÌÄ´ÀÅˆˆ°(€€€€€€‰­¥¹ˆè€‰½‰Í•ÉÙ…Ñ¥½¸ˆ°(€€€€€€‰µ½‘…±¥Ñäˆè€‰‘•Éµ½Í½Áäˆ°(€€€€€€‰Ñ•áĞˆè€‰‘…É¬™¥•±Í¡½İÌÉ¥‘”µ…¹µ™¥ÍÍÕÉ”™…Ğµ™¥¹•ÈÍÑÉÕÑÕÉ•Ì°¥ÉÉ•Õ±…É±äÁ±…•‘…É¬‘½ÑÌ°…¹µ…¹ä±¥¡Ğ¡…¥ÉÌ¸½±½É•…ÉÉ½İÌ™É½´Ñ¡”Í½ÕÉ”™¥ÕÉ”µ…É¬Í•Ù•É…°½˜Ñ¡½Í”™¥¹‘¥¹Ì¸µ¥±±¥µ•ÑÉ”Í…±”Í¥ÑÌ…ĞÑ¡”‰½ÑÑ½´•‘”¸ˆ(€€€ô(€t°(€€‰¥¹Ñ•ÉÁÉ•Ñ…Ñ¥½¹Ìˆèl(€€€ì(€€€€€€‰¥ˆè€‰¥¹ĞµœÌÄ´ÀÅ„ˆ°(€€€€€€‰­¥¹ˆè€‰¥¹Ñ•ÉÁÉ•Ñ…Ñ¥½¸ˆ°(€€€€€€‰É•±…Ñ•‘=‰Í•ÉÙ…Ñ¥½¹%‘Ìˆèl(€€€€€€€€‰½‰ÌµœÌÄ´ÀÅ„ˆ(€€€€€t°(€€€€€€‰Ñ•áĞˆè€‰É…Á¥‘±äÉ½İ¥¹œ‘…É¬Í…±ÀÁ±…ÅÕ”…¸‰”„Í•‰½ÉÉ¡•¥Œ­•É…Ñ½Í¥ÌÙ…É¥…¹Ğ½Èµ•±…¹½µ„¸Q¡”±¥¹¥…°™É…µ”…±½¹”‘½•Ì¹½ĞÍ•ÑÑ±”Ñ¡”±…‰•°¸ˆ(€€€ô°(€€€ì(€€€€€€‰¥ˆè€‰¥¹ĞµœÌÄ´ÀÅˆˆ°(€€€€€€‰­¥¹ˆè€‰¥¹Ñ•ÉÁÉ•Ñ…Ñ¥½¸ˆ°(€€€€€€‰É•±…Ñ•‘=‰Í•ÉÙ…Ñ¥½¹%‘Ìˆèl(€€€€€€€€‰½‰ÌµœÌÄ´ÀÅ„ˆ°(€€€€€€€€‰½‰ÌµœÌÄ´ÀÅˆˆ(€€€€€t°(€€€€€€‰Ñ•áĞˆè€‰…Ğµ™¥¹•ÈÉ¥‘•ÌÍÕÁÁ½ÉĞ„­•É…Ñ¥¹½åÑ¥ŒÉ•…‘¥¹œ°İ¡¥±”¥ÉÉ•Õ±…È‘…É¬‘½ÑÌ­••Àµ•±…¹½µ„¥¸Ñ¡”‘¥™™•É•¹Ñ¥…°¸!¥ÍÑ½Á…Ñ¡½±½ä°¹½Ğ„Á…Ñ¡½¹½µ½¹¥Œ‘•Éµ½Í½Á¥ŒÍ¥¸°½¹™¥Éµ•Ñ¡”Í½ÕÉ”±…‰•°¸ˆ(€€€ô(€t°(€€‰‘¥™™•É•¹Ñ¥…±Ìˆèl(€€€ì(€€€€€€‰‘¥…¹½Í¥Ìˆè€‰5•±…¹½……¹Ñ¡½µ„ˆ°(€€€€€€‰ÍÕÁÁ½ÉÑ¥¹•…ÑÕÉ•Ìˆèl(€€€€€€€€‰…É¬Í¡…ÉÁ±ä‰½É‘•É•Í…±ÀÁ±…ÅÕ”ˆ°(€€€€€€€€‰…Ğµ™¥¹•ÈÉ¥‘•Ì½¸Á½±…É¥é•‘•Éµ½Í½Áäˆ°(€€€€€€€€‰…Í”µÑ•áĞ¡¥ÍÑ½Á…Ñ¡½±½ä…¹¥µµÕ¹½ÍÑ…¥¸½¹Í¥ÍÑ•¹Ğİ¥Ñ ÕÑ…¹•½ÕÌµ•±…¹½……¹Ñ¡½µ„ˆ(€€€€€t°(€€€€€€‰½¹ÑÉ…‘¥Ñ¥¹•…ÑÕÉ•Ìˆèl(€€€€€€€€‰%ÉÉ•Õ±…È‘…É¬‘½ÑÌ…±Í¼É…¥Í”µ•±…¹½µ„½¹•É¸ˆ(€€€€€t°(€€€€€€‰Ñ•…¡¥¹¥ÍÑ¥¹Ñ¥½¸ˆè€‰Q¡”‰•¹¥¸Í•‰½ÉÉ¡•¥Œµ­•É…Ñ½Í¥Ìµ™…µ¥±ä¹…µ”½µ•Ì™É½´¡¥ÍÑ½Á…Ñ¡½±½ä¸•Éµ½Í½Áä…±½¹”‘¥¹½ĞÁÉ½Ù”¥Ğ¸ˆ(€€€ô°(€€€ì(€€€€€€‰‘¥…¹½Í¥Ìˆè€‰5•±…¹½µ„ˆ°(€€€€€€‰ÍÕÁÁ½ÉÑ¥¹•…ÑÕÉ•Ìˆèl(€€€€€€€€‰I…Á¥É½İÑ ¡¥ÍÑ½Éä¥¸Ñ¡”…Í”Ñ•áĞˆ°(€€€€€€€€‰Íåµµ•ÑÉ¥Œ‘…É¬Á±…ÅÕ”ˆ°(€€€€€€€€‰%ÉÉ•Õ±…É±ä‘¥ÍÑÉ¥‰ÕÑ•‘…É¬‘½ÑÌ½¸‘•Éµ½Í½Áäˆ(€€€€€t°(€€€€€€‰½¹ÑÉ…‘¥Ñ¥¹•…ÑÕÉ•Ìˆèl(€€€€€€€€‰…Ğµ™¥¹•ÈÉ¥‘•Ì…É”­•É…Ñ¥¹½åÑ¥Œ±Õ•Ìì¡¥ÍÑ½Á…Ñ¡½±½ä‘¥¹½Ğ½¹™¥É´µ•±…¹½µ„ˆ(€€€€€t°(€€€€€€‰Ñ•…¡¥¹¥ÍÑ¥¹Ñ¥½¸ˆè€‰5•±…¹½µ„İ…Ì„™…¥È½¹•É¸Õ¹Ñ¥°Ñ¥ÍÍÕ”Í•ÑÑ±•Ñ¡”±…‰•°¸ˆ(€€€ô°(€€€ì(€€€€€€‰‘¥…¹½Í¥Ìˆè€‰M•‰½ÉÉ¡•¥Œ­•É…Ñ½Í¥Ìˆ°(€€€€€€‰ÍÕÁÁ½ÉÑ¥¹•…ÑÕÉ•Ìˆèl(€€€€€€€€‰…Ğ™¥¹•ÉÌ…¹½µ•‘¼µ±¥­”½Á•¹¥¹Ì‰•±½¹œÑ¼Ñ¡”Í…µ”­•É…Ñ¥¹½åÑ¥Œ™…µ¥±äˆ°(€€€€€€€€‰Q¡”Í½ÕÉ”…±±Ìµ•±…¹½……¹Ñ¡½µ„„É…É”Í•‰½ÉÉ¡•¥Œ­•É…Ñ½Í¥ÌÙ…É¥…¹Ğˆ(€€€€€t°(€€€€€€‰½¹ÑÉ…‘¥Ñ¥¹•…ÑÕÉ•Ìˆèl(€€€€€€€€‰Q¡”…Í”µÑ•áĞ¡¥ÍÑ½Á…Ñ¡½±½ä¹…µ•Ìµ•±…¹½……¹Ñ¡½µ„ÍÁ•¥™¥…±±äˆ(€€€€€t°(€€€€€€‰Ñ•…¡¥¹¥ÍÑ¥¹Ñ¥½¸ˆè€‰=É‘¥¹…ÉäÍ•‰½ÉÉ¡•¥Œ­•É…Ñ½Í¥ÌÉ•µ…¥¹ÌÑ¡”™…µ¥±ä½¹Ñ•áĞìÑ¡¥ÌÑ•…¡¥¹œÉ•½É­••ÁÌÑ¡”¹…µ•Ù…É¥…¹Ğ¸ˆ(€€€ô(€t°(€€‰Ñ•…¡¥¹A½¥¹ÑÌˆèl(€€€ì(€€€€€€‰¥ˆè€‰ÑÀµœÌÄ´ÀÅ„ˆ°(€€€€€€‰Ñ¥Ñ±”ˆè€‰9½Ñ¥”™¥ÉÍĞˆ°(€€€€€€‰Ñ•áĞˆè€‰9…µ”Ñ¡”‘…É¬Í…±ÀÁ±…ÅÕ”°Ñ¡•¸…Í¬İ¡•Ñ¡•È™…Ğ™¥¹•ÉÌ…¹¥ÉÉ•Õ±…È‘½ÑÌÁ½¥¹ĞÑ¡”Í…µ”İ…ä¸ˆ(€€€ô°(€€€ì(€€€€€€‰¥ˆè€‰ÑÀµœÌÄ´ÀÅˆˆ°(€€€€€€‰Ñ¥Ñ±”ˆè€‰1¥µ¥Ğˆ°(€€€€€€‰Ñ•áĞˆè€‰I¥‘•ÌÍÕÁÁ½ÉĞ„­•É…Ñ¥¹½åÑ¥Œ±½½¬¸%ÉÉ•Õ±…È‘½ÑÌ­•ÁĞµ•±…¹½µ„Á±…ÕÍ¥‰±”Õ¹Ñ¥°¡¥ÍÑ½Á…Ñ¡½±½ä¸ˆ(€€€ô(€t°(€€‰½‰Í•ÉÙ…Ñ¥½¹AÉ½µÁÑÌˆèl(€€€€‰%ÌÑ¡”Á±…ÅÕ”™±…Ğµ‘…É¬½È‘½•Ì‘•Éµ½Í½ÁäÍ¡½ÜÉ¥‘•Ìüˆ°(€€€€‰É”Ñ¡”‘…É¬‘½ÑÌ•Ù•¹±äÍÁ…•½È¥ÉÉ•Õ±…É±äÁ±…•üˆ(€t°(€€‰¡¥¹ÑÌˆèl(€€€€‰Q¡”Í½ÕÉ”™¥ÉÍĞ½¹Í¥‘•É•Í•‰½ÉÉ¡•¥Œ­•É…Ñ½Í¥Ì°Ñ¡•¸İ½ÉÉ¥•…‰½ÕĞ¥ÉÉ•Õ±…È‘½ÑÌ¸ˆ(€t°(€€‰±½Í•ÍÑ5¥µ¥Œˆèì(€€€€‰¹…µ”ˆè€‰5•±…¹½µ„ˆ°(€€€€‰İ¡å±½Í•ÍĞˆè€‰É…Á¥‘±äÉ½İ¥¹œ…Íåµµ•ÑÉ¥Œ‘…É¬Í…±ÀÁ±…ÅÕ”İ¥Ñ ¥ÉÉ•Õ±…È‘•Éµ½Í½Á¥Œ‘½ÑÌ¥Ì„±…ÍÍ¥Œµ•±…¹½µ„½¹•É¸¸Q¡”Í½ÕÉ”¹••‘•Ñ¥ÍÍÕ”…™Ñ•È½¹™½…°¥µ…¥¹œ…±Í¼±½½­•ÍÕÍÁ¥¥½ÕÌ¸ˆ(€ô°(€€‰Á…ÑÑ•É¹Ìˆèl(€€€ì(€€€€€€‰¥ˆè€‰Á…ĞµœÌÄ´ÀÄµÉ¥‘•Ìˆ°(€€€€€€‰±…‰•°ˆè€‰…Ğµ™¥¹•ÈÉ¥‘•Ì…¹™¥ÍÍÕÉ•Ìˆ°(€€€€€€‰µ½‘…±¥Ñäˆè€‰‘•Éµ½Í½Áäˆ°(€€€€€€‰ÍÁ•¥™¥¥Ñå9½Ñ”ˆè€‰Q¡¥¬É¥‘”µ…¹µ™¥ÍÍÕÉ”™…Ğ™¥¹•ÉÌ…É”±•…É±äÙ¥Í¥‰±”¸Q¡•äÍÕÁÁ½ÉĞ„­•É…Ñ¥¹½åÑ¥ŒÉ•…‘¥¹œ…¹‘¼¹½Ğ±•…È¥ÉÉ•Õ±…È‘…É¬‘½ÑÌ¸ˆ°(€€€€€€‰•ÉÑ…¥¹Ñäˆè€‰±•…É±å}Ù¥Í¥‰±”ˆ°(€€€€€€‰İ•¥¡Ğˆè€‰ÍÕÁÁ½ÉÑ¥Ù”ˆ(€€€ô°(€€€ì(€€€€€€‰¥ˆè€‰Á…ĞµœÌÄ´ÀÄµ‘½ÑÌˆ°(€€€€€€‰±…‰•°ˆè€‰%ÉÉ•Õ±…É±äÁ±…•‘…É¬‘½ÑÌˆ°(€€€€€€‰µ½‘…±¥Ñäˆè€‰‘•Éµ½Í½Áäˆ°(€€€€€€‰ÍÁ•¥™¥¥Ñå9½Ñ”ˆè€‰…É¬‘½ÑÌ…É”Í…ÑÑ•É•É…Ñ¡•ÈÑ¡…¸•Ù•¹±äÍÁ…•¸Q¡•ä­•ÁĞµ•±…¹½µ„¥¸Ñ¡”‘¥™™•É•¹Ñ¥…°¥¸Ñ¡”Í½ÕÉ”¸ˆ°(€€€€€€‰•ÉÑ…¥¹Ñäˆè€‰±•…É±å}Ù¥Í¥‰±”ˆ°(€€€€€€‰İ•¥¡Ğˆè€‰ÍÕÁÁ½ÉÑ¥Ù”ˆ(€€€ô°(€€€ì(€€€€€€‰¥ˆè€‰Á…ĞµœÌÄ´ÀÄµ…ÉÉ½İÌˆ°(€€€€€€‰±…‰•°ˆè€‰½±½É•…ÉÉ½İÌ™É½´Ñ¡”Í½ÕÉ”™¥ÕÉ”ˆ°(€€€€€€‰µ½‘…±¥Ñäˆè€‰¹½¹”ˆ°(€€€€€€‰ÍÁ•¥™¥¥Ñå9½Ñ”ˆè€‰½±½É•…ÉÉ½İÌ…É”Ñ•…¡¥¹œµ…É­Ì™É½´Ñ¡”Í½ÕÉ”™¥ÕÉ”°¹½ĞÍ­¥¸ÍÑÉÕÑÕÉ•Ì¸ˆ°(€€€€€€‰•ÉÑ…¥¹Ñäˆè€‰±•…É±å}Ù¥Í¥‰±”ˆ°(€€€€€€‰İ•¥¡Ğˆè€‰½¹™±¥Ñ¥¹œˆ(€€€ô°(€€€ì(€€€€€€‰¥ˆè€‰Á…ĞµœÌÄ´ÀÄµÍ…±”ˆ°(€€€€€€‰±…‰•°ˆè€‰5•…ÍÕÉ¥¹œÍ…±”¥¸Ñ¡”™É…µ”ˆ°(€€€€€€‰µ½‘…±¥Ñäˆè€‰¹½¹”ˆ°(€€€€€€‰ÍÁ•¥™¥¥Ñå9½Ñ”ˆè€‰Á…Á•ÈÉÕ±•È¥Ì¥¸Ñ¡”±¥¹¥…°™É…µ”…¹„µ¥±±¥µ•ÑÉ”Í…±”¥Ì¥¸Ñ¡”‘•Éµ½Í½Á¥Œ™É…µ”¸M…±•Ì…É”…ÉÑ¥™…ÑÌ°¹½Ğ‘¥…¹½Í¥Ì¸ˆ°(€€€€€€‰•ÉÑ…¥¹Ñäˆè€‰±•…É±å}Ù¥Í¥‰±”ˆ°(€€€€€€‰İ•¥¡Ğˆè€‰½¹™±¥Ñ¥¹œˆ(€€€ô(€t°(€€‰Íå¹Ñ¡•Í¥Ìˆè€‰Q¡”Í½ÕÉ”±…‰•±ÌÑ¡¥ÌÉ¥¡ĞÁ…É¥•Ñ…°‘…É¬Á±…ÅÕ”„¡¥ÍÑ½Á…Ñ¡½±½äµ½¹™¥Éµ•µ•±…¹½……¹Ñ¡½µ„°„É…É”Í•‰½ÉÉ¡•¥Œ­•É…Ñ½Í¥ÌÙ…É¥…¹Ğ¸±¥¹¥…±±ä…¹‘•Éµ½Í½Á¥…±±ä¥Ğ­•ÁĞµ•±…¹½µ„Á±…ÕÍ¥‰±”Õ¹Ñ¥°•á¥Í¥½¸¸ˆ°(€€‰•Ù¥‘•¹•]•¥¡Ñ¥¹œˆè€‰…Ğµ™¥¹•ÈÉ¥‘•Ì…É”±•…É±äÙ¥Í¥‰±”…¹ÍÕÁÁ½ÉÑ¥Ù”™½È„­•É…Ñ¥¹½åÑ¥ŒÉ•…‘¥¹œ¸%ÉÉ•Õ±…È‘…É¬‘½ÑÌ…É”±•…É±äÙ¥Í¥‰±”…¹­••Àµ•±…¹½µ„½Á•¸¸Q¡”…Í”µÑ•áĞ¡¥ÍÑ½Á…Ñ¡½±½äÍÑ…Ñ•µ•¹Ğ¥ÌÑ¡”½¹™¥Éµ…Ñ¥½¸¸M½ÕÉ”…ÉÉ½İÌ…¹µ•…ÍÕÉ¥¹œÍ…±•Ì…É”…ÉÑ¥™…ÑÌ¸ˆ°(€€‰‘¥…¹½ÍÑ¥QÉ…Àˆè€‰QÉ•…Ñ¥¹œ™…Ğ™¥¹•ÉÌ…ÌÁÉ½½˜Ñ¡…Ğ„‘…É¬Í…±ÀÁ±…ÅÕ”¥ÌÍ…™”°½ÈÑÉ•…Ñ¥¹œ¥ÉÉ•Õ±…È‘½ÑÌ…ÌÁÉ½½˜½˜µ•±…¹½µ„İ¥Ñ¡½ÕĞÑ¥ÍÍÕ”İ¡•¸Ñ¡”™É…µ•Ì½¹™±¥Ğ¸ˆ°(€€‰µ•¹Ñ½É9½Ñ”ˆè€‰Q¡¥Ì¥ÌÑ¡”™¥ÉÍĞµ•±…¹½……¹Ñ¡½µ„…Í”¥¸½ÕÑ¥Ì¸%ĞÍ¥ÑÌ¥¸Ñ¡”Í•‰½ÉÉ¡•¥Œ­•É…Ñ½Í¥Ì™…µ¥±ä…¹Ñ•…¡•Ì„µ•±…¹½µ„µ¥µ¥ŒÑ¡…Ğ¹••‘•¡¥ÍÑ½Á…Ñ¡½±½ä¸ˆ°(€€‰Ñ…­•!½µ•IÕ±”ˆè€‰=¸„‘…É¬Í…±ÀÁ±…ÅÕ”°™…Ğ™¥¹•ÉÌ…¹¥ÉÉ•Õ±…È‘½ÑÌ…¸Á½¥¹Ğ¥¸½ÁÁ½Í¥Ñ”‘¥É•Ñ¥½¹Ì¸]¡•¸‘•Éµ½Í½ÁäÍÑ…åÌµ¥á•°¡¥ÍÑ½Á…Ñ¡½±½äÍ•ÑÑ±•ÌÑ¡”±…‰•°¸ˆ°(€€‰İ¡å9½Ğˆèl(€€€ì(€€€€€€‰µ¥µ¥Œˆè€‰5•±…¹½µ„ˆ°(€€€€€€‰Ñ•áĞˆè€‰%ÉÉ•Õ±…È‘½ÑÌ…¹É…Á¥É½İÑ µ…‘”µ•±…¹½µ„™…¥È¸!¥ÍÑ½Á…Ñ¡½±½ä‘¥¹½Ğ½¹™¥É´µ•±…¹½µ„¥¸Ñ¡¥Ì±•Í¥½¸¸ˆ(€€€ô°(€€€ì(€€€€€€‰µ¥µ¥Œˆè€‰=É‘¥¹…ÉäÍ•‰½ÉÉ¡•¥Œ­•É…Ñ½Í¥Ìˆ°(€€€€€€‰Ñ•áĞˆè€‰…Ğ™¥¹•ÉÌ‰•±½¹œÑ¼Ñ¡”Í…µ”™…µ¥±ä¸Q¡”…Í”µÑ•áĞ¡¥ÍÑ½Á…Ñ¡½±½ä¹…µ•ÌÑ¡”µ•±…¹½……¹Ñ¡½µ„Ù…É¥…¹ĞÍÁ•¥™¥…±±ä¸ˆ(€€€ô(€t°(€€‰½µÁ…É•]¥Ñ ˆèmt°(€€‰Á…¥É•‘5½‘…±¥Ñäˆèì(€€€€‰±¥¹¥…±=‰Í•ÉÙ…Ñ¥½¸ˆè€‰‘…É¬µ‰É½İ¸°Í¡…ÉÁ±ä‰½É‘•É•Á±…ÅÕ”Í¥ÑÌ½¸Í¡½ÉĞİ¡¥Ñ”Í…±À¡…¥È‰•Í¥‘”„Á…Á•Èµ•…ÍÕÉ¥¹œÉÕ±•È¸5¥±É•‘¹•ÍÌÍÕÉÉ½Õ¹‘ÌÑ¡”•‘”¸ˆ°(€€€€‰‘•Éµ½Í½Á¥=‰Í•ÉÙ…Ñ¥½¸ˆè€‰‘…É¬™¥•±Í¡½İÌÉ¥‘”µ…¹µ™¥ÍÍÕÉ”™…Ğµ™¥¹•ÈÍÑÉÕÑÕÉ•Ì°¥ÉÉ•Õ±…É±äÁ±…•‘…É¬‘½ÑÌ°…¹µ…¹ä±¥¡Ğ¡…¥ÉÌ¸½±½É•…ÉÉ½İÌ™É½´Ñ¡”Í½ÕÉ”™¥ÕÉ”µ…É¬Í•Ù•É…°½˜Ñ¡½Í”™¥¹‘¥¹Ì¸ˆ°(€€€€‰…‘‘•‘Y…±Õ”ˆè€‰Q¡”‘•Éµ½Í½Á¥Œ™É…µ”Í¡½İÌ™…Ğ™¥¹•ÉÌ‰•Í¥‘”¥ÉÉ•Õ±…È‘…É¬‘½ÑÌ¸Q¡”±¥¹¥…°™É…µ”Í¡½İÌ½¹±ä„‘…É¬Á±…ÅÕ”¸ˆ°(€€€€‰É•…Í½¹¥¹%µÁ…Ğˆè€‰Q¡”É•…‘¥¹œµ½Ù•Ì™É½´„¹½¹ÍÁ•¥™¥Œ‘…É¬Í…±ÀÁ±…ÅÕ”Ñ¼„µ¥á•­•É…Ñ¥¹½åÑ¥ŒµÁ±ÕÌµ‘½ĞÁ…ÑÑ•É¸Ñ¡…ĞÍÑ¥±°¹••‘•¡¥ÍÑ½Á…Ñ¡½±½ä¸ˆ°(€€€€‰±¥µ¥ÑÌˆè€‰M½ÕÉ”µ…ÕÑ¡½É•½±½É•…ÉÉ½İÌÉ•µ…¥¸½¸Ñ¡”‘•Éµ½Í½Á¥ŒÉ½À¸5•…ÍÕÉ¥¹œÍ…±•Ì…É”¥¸‰½Ñ ™É…µ•Ì¸Q¡”Í¥Ñ”¥ÌÍ…±À°¹½Ğ™…”¸ˆ°(€€€€‰¥¹™½Éµ…Ñ¥½¹…¥¸ˆè€‰‘•Éµ½Í½Áå}¡…¹•Í}±•…‘¥¹}‘¥™™•É•¹Ñ¥…°ˆ°(€€€€‰¥¹™½Éµ…Ñ¥½¹…¥¹9½Ñ”ˆè€‰‘Õ…Ñ¥½¹…°±…‰•°½¹±ä¸•Éµ½Í½ÁäÍ¡½İÌ™…Ğµ™¥¹•ÈÉ¥‘•Ì‰•Í¥‘”¥ÉÉ•Õ±…È‘…É¬‘½ÑÌ°Í¼„­•É…Ñ¥¹½åÑ¥Œ±½½¬…¹„µ•±…¹½µ„½¹•É¸ÍÑ…äÑ½•Ñ¡•ÈÕ¹Ñ¥°Ñ¥ÍÍÕ”¸9½Ğ„Ù…±¥‘…Ñ•µ•ÑÉ¥Œ…¹¹½Ğ„ÁÉ½‰…‰¥±¥Ñä¸ˆ°(€€€€‰½µÁ…É¥Í½¸ˆèì(€€€€€€‰±¥¹¥…±±Õ”ˆè€‰…É¬Í¡…ÉÁ±ä‰½É‘•É•Í…±ÀÁ±…ÅÕ”‰•Í¥‘”„ÉÕ±•È¸ˆ°(€€€€€€‰‘•Éµ½Í½Á¥±Õ”ˆè€‰…Ğµ™¥¹•ÈÉ¥‘•Ìİ¥Ñ ¥ÉÉ•Õ±…È‘…É¬‘½ÑÌ¸ˆ°(€€€€€€‰…‘‘•‘%¹™½Éµ…Ñ¥½¸ˆè€‰I¥‘”Ù•ÉÍÕÌ‘½Ğ‘•Ñ…¥°¥Ì½¹±ä±•…È½¸Ñ¡”‘•Éµ½Í½Á¥Œ™É…µ”¸ˆ°(€€€€€€‰‘¥…¹½ÍÑ¥½¹™±¥Ğˆè€‰Q¡”Í…µ”±½½¬…¸‰”µ•±…¹½µ„Õ¹Ñ¥°¡¥ÍÑ½Á…Ñ¡½±½ä¸ˆ°(€€€€€€‰Ñ•…¡¥¹IÕ±”ˆè€‰5¥á•‘•Éµ½Í½Á¥Œ±Õ•Ì¹••Ñ¥ÍÍÕ”İ¡•¸µ•±…¹½µ„ÍÑ…åÌÁ±…ÕÍ¥‰±”¸ˆ(€€€ô(€ô°(€€‰µ½‘…±¥Ñå%¹Ñ•É…Ñ¥½¸ˆè€‰Q¡”™¥ÉÍĞ™É…µ”¥ÌÑ¡”±¥¹¥…°‘…É¬Í…±ÀÁ±…ÅÕ”¸Q¡”Í•½¹™É…µ”¥ÌÑ¡”½ÉÉ•ÍÁ½¹‘¥¹œÁ½±…É¥é•‘•Éµ½Í½Á¥ŒÙ¥•Üİ¥Ñ ™…Ğ™¥¹•ÉÌ°¥ÉÉ•Õ±…È‘…É¬‘½ÑÌ°…¹Í½ÕÉ”…ÉÉ½İÌ¸ˆ°(€€‰‘¥ÍÁ½Í¥Ñ¥½¹Q•…¡¥¹œˆèì(€€€€‰ÍÕµµ…Éäˆè€‰‘Õ…Ñ¥½¹…°¹•áĞµÍÑ•À±…¹Õ…”™½È„‘…É¬Í…±ÀÁ±…ÅÕ”İ¡½Í”‘•Éµ½Í½Áäµ¥á•­•É…Ñ¥¹½åÑ¥ŒÉ¥‘•Ìİ¥Ñ ¥ÉÉ•Õ±…È‘½ÑÌ¸ˆ°(€€€€‰½ÁÑ¥½¹Ìˆèl(€€€€€ì(€€€€€€€€‰¥ˆè€‰‰¥½ÁÍäµ•á¥Í¥½¸µ½¹Í¥‘•É…Ñ¥½¸ˆ°(€€€€€€€€‰±…‰•°ˆè€‰	¥½ÁÍä½È•á¥Í¥½¸½¹Í¥‘•É…Ñ¥½¸ˆ°(€€€€€€€€‰É…Ñ¥½¹…±”ˆè€‰Q¡”Í½ÕÉ”•á¥Í•Ñ¡”±•Í¥½¸…™Ñ•È‘•Éµ½Í½Áä…¹½¹™½…°¥µ…¥¹œ½Õ±¹½Ğ±…ÍÍ¥™ä¥Ğ…Ì±•…É±ä‰•¹¥¸°…¹¡¥ÍÑ½Á…Ñ¡½±½ä½¹™¥Éµ•Ñ¡”±…‰•°¸ˆ(€€€€€ô°(€€€€€ì(€€€€€€€€‰¥ˆè€‰™ÕÉÑ¡•Èµ‘•Éµ½Í½Áäˆ°(€€€€€€€€‰±…‰•°ˆè€‰ÕÉÑ¡•È‘•Éµ½Í½Áäˆ°(€€€€€€€€‰É…Ñ¥½¹…±”ˆè€‰•Éµ½Í½Áä¥Ì…±É•…‘äÍÑ½É•¸%Ğµ¥á•™…Ğ™¥¹•ÉÌİ¥Ñ ¥ÉÉ•Õ±…È‘½ÑÌÉ…Ñ¡•ÈÑ¡…¸Í•ÑÑ±¥¹œÑ¡”±…‰•°¸ˆ(€€€€€ô°(€€€€€ì(€€€€€€€€‰¥ˆè€‰µ½¹¥Ñ½Èˆ°(€€€€€€€€‰±…‰•°ˆè€‰5½¹¥Ñ½Èˆ°(€€€€€€€€‰É…Ñ¥½¹…±”ˆè€‰5½¹¥Ñ½É¥¹œİ…Ì¹½Ğ„ÍÕ‰ÍÑ¥ÑÕÑ”™½ÈÑ¡”•á¥Í¥½¸Ñ¡…Ğµ…‘”Ñ¡”‘¥…¹½Í¥Ì¥¸Ñ¡”Í½ÕÉ”¸ˆ(€€€€€ô(€€€t°(€€€€‰ÁÉ•™•ÉÉ•‘‘Õ…Ñ¥½¹…±%ˆè€‰‰¥½ÁÍäµ•á¥Í¥½¸µ½¹Í¥‘•É…Ñ¥½¸ˆ°(€€€€‰Í½ÕÉ•9½Ñ”ˆè€‰Q•…¡¥¹œ‘•É¥Ù•™É½´Ñ¡”…Í”µÑ•áĞ•á¥Í¥½¸…¹¡¥ÍÑ½Á…Ñ¡½±½ä½¹™¥Éµ…Ñ¥½¸…™Ñ•Èµ¥á•‘•Éµ½Í½Á¥Œ…¹½¹™½…°™¥¹‘¥¹Ì°¹½Ğ™É½´„Õ¥‘•±¥¹”¥¹Ñ•ÉÙ…°¸ˆ°(€€€€‰±¥µ¥Ñ…Ñ¥½¸ˆè€‰‘Õ…Ñ¥½¹…°¹•áĞµÍÑ•ÀÑ•…¡¥¹œ½¹±ä¸9½Ğ„ÁÉ½Ñ½½°°ÑÉ¥…”ÉÕ±”°½È±¥¹¥…°‘•¥Í¥½¸ÍÕÁÁ½ÉĞ¸ˆ(€ô°(€€‰É•½É‘•‘MÉ••¹¥¹•¥Í¥½¸ˆè¹Õ±°°(€€‰…¹¹½Ñ…Ñ¥½¹Ìˆèmt°(€€‰‘•Éµ½Í½Á¥•…ÑÕÉ•Ìˆèmt°(€€‰±½…±¥é…Ñ¥½¸ˆè¹Õ±°°(€€‰±¥¹¥…±Ñ¥½¸ˆè€‰™Ñ•ÈÉ•Ù•…°°½µÁ…É”İ¥Ñ Í•‰½ÉÉ¡•¥Œ­•É…Ñ½Í¥Ì…Í•ÌÑ¡…ĞÍ¡½ÜÍÑÕ¬µ½¸½ÈÉ¥‘•ÍÕÉ™…•Ì°…¹İ¥Ñ ‘…É¬µ•±…¹½µ„µ¥µ¥Ì¥¸Ñ¡”±¥‰É…Éä¸¼¹½ĞÑÉ•…Ğ™É½´Ñ¡¥Ì…Í”¸ˆ°(€€‰µ…¹…•µ•¹Ñ	É¥•˜ˆè€‰9¼µ…¹…•µ•¹Ğ…Ñ•½Éä¥ÌÍÑ½É•¸Q¡”Í½ÕÉ”‰¥½ÁÍäÉ•ÍÕ±Ğ¥Ì¹½Ğ„½ÕÑ¥ÌÉ•½µµ•¹‘…Ñ¥½¸¸Q¡¥Ì‰É¥•˜¥Ì¹½Ğ„ÁÉ½Ñ½½°…¹É•µ…¥¹ÌÉ•Ù¥•ÜÉ•ÅÕ¥É•¸ˆ°(€€‰É•Ù¥•İMÑ…ÑÕÌˆè€‰±¥¹¥¥…¸É•Ù¥•ÜÉ•ÅÕ¥É•ˆ°(€€‰±¥¹¥…±I•Ù¥•Üˆè¹Õ±°)ô)€((ğ½‘•Ñ…¥±Ìø((´Y•É‘¥Ğè(´I•Ù¥•İ•Í•Ñ¥½¹Ìè(´Ù¥‘•¹”Í½ÕÉ•Ì…ÑÕ…±±ä¡•­•è(´ÁÁÉ½Ù••á…ĞÉ•Á±…•µ•¹Ğİ½É‘¥¹œ€¡¥˜…¹ä¤è(´I•ÅÕ¥É•½ÉÉ•Ñ¥½¹Ì€¼É•©•Ñ•±…¥µÌè(´AÕ‰±¥ŒÉ•Ù¥•İ•È¹½Ñ•Ìè((ŒŒ…Í”è¸½Ù…°Á¥¹¬Á±…ÅÕ”İ¥Ñ •¹ÑÉ…°ÉÕÍĞ€¡…Í”µœÌÈ´ÀÅ€¤((´€¨©á…Ğ™¥¹•ÉÁÉ¥¹Ğè¨¨Í¡„ÈÔØµØÄèÜåØÁ˜å˜ĞÈØÔĞÁ•”É•…‰™‘•ˆàÕ…˜Éˆİ™ˆÕ„ÌĞÄäØäÍ‰˜Õ„Å‰ŒÄÉ”ÄĞÜá”Ñ˜á€(´€¨©M¡•µ„Ù•ÉÍ¥½¸è¨¨€Ä(´€¨©I•Ù¥•İ…‰±”Í•Ñ¥½¹Ìè¨¨¥µ…•Í€°½‰Í•ÉÙ…Ñ¥½¹Í€°¥¹Ñ•ÉÁÉ•Ñ…Ñ¥½¹Í€°‘•Éµ½Í½Á¥Œµ™•…ÑÕÉ•Í€°‘¥™™•É•¹Ñ¥…±Í€°‘¥…¹½ÍÑ¥ŒµÉ½Õ¹µÑÉÕÑ¡€°Ñ•…¡¥¹œµÁ½¥¹ÑÍ€°Í…™•Ñäµ¹½Ñ¥•€°ÁÉ½Ù•¹…¹•€(´€¨©5…ÁÁ••Ù¥‘•¹”Í½ÕÉ•Ìè¨¨(€€´¡ÑÑÁÌè¼½‘½¤¹½Éœ¼ÄÀ¸ÌÌäÀ½‘¥…¹½ÍÑ¥ÌÄĞÄØÄÜää(´€¨©ÕÑ½µ…Ñ•İ…É¹¥¹Ìè¨¨(€€´½¹™¥É´¥µ…”ÁÉ½Ù•¹…¹”½±¥•¹Í”°½‰Í•ÉÙ…Ñ¥½¹ÌÙÌ¥¹Ñ•ÉÁÉ•Ñ…Ñ¥½¹ÌÍ•Á…É…Ñ¥½¸°‘¥™™•É•¹Ñ¥…±Ì°‘¥…¹½ÍÑ¥Œ½¹™¥Éµ…Ñ¥½¸µ•Ñ¡½¡½¹•ÍÑä°…¹Ñ¡…Ğ$¥¹Ñ•ÉÁÉ•Ñ…Ñ¥½¸¥Ì¹½ĞÑÉ•…Ñ•…Ì±¥¹¥¥…¸É•Ù¥•Ü¸(€€´ÕÑ½µ…Ñ•Í½ÕÉ”…ÑÑ…¡µ•¹Ğ…¹Í¡•µ„Ù…±¥‘…Ñ¥½¸…É”¹½Ğ•Ù¥‘•¹”½˜±¥¹¥…°…ÁÁÉ½Ù…°¸(´€¨©$µ•¹•É…Ñ•ÁÉ½Á½Í…°è¨¨9¼±¥¹¥…°İ½É‘¥¹œ¡…¹”¡…Ì‰••¸…ÁÁ±¥•¸I•Ù¥•ÜÑ¡”ÕÉÉ•¹ĞÑ•áĞ‰•±½Ü…¹•¥Ñ¡•È…ÁÁÉ½Ù”¥ĞÕ¹¡…¹•°…ÁÁÉ½Ù”•á…ĞÉ•Á±…•µ•¹Ğİ½É‘¥¹œ°É•ÅÕ•ÍĞ¡…¹•Ì°É•©•Ğ…¸Õ¹ÍÕÁÁ½ÉÑ•±…¥´°½È‘•™•È¸((ñ‘•Ñ…¥±Ìø(ñÍÕµµ…ÉäùÕÉÉ•¹Ğ•á…Ğ½¹Ñ•¹Ğğ½ÍÕµµ…Éäø()©Í½¸)ì(€€‰¥ˆè€‰…Í”µœÌÈ´ÀÄˆ°(€€‰Í±Õœˆè€‰œÌÈµ½Ù…°µÁ±…ÅÕ”µİ¥Ñ µÉÕÍĞˆ°(€€‰Ñ¥Ñ±”ˆè€‰¸½Ù…°Á¥¹¬Á±…ÅÕ”İ¥Ñ •¹ÑÉ…°ÉÕÍĞˆ°(€€‰‘¥…¹½Í¥Í1…‰•°ˆè€‰MÅÕ…µ½ÕÌ•±°…É¥¹½µ„¥¸Í¥ÑÔ€¡	½İ•¸‘¥Í•…Í”¤ˆ°(€€‰‘¥Í•…Í•%ˆè€‰ÍÅÕ…µ½ÕÌµ•±°µ…É¥¹½µ„µ¥¸µÍ¥ÑÔˆ°(€€‰…Ñ•½Éäˆè€‰-•É…Ñ¥¹½åÑ¥Œµ…±¥¹…¹¥•Ìˆ°(€€‰•‘Õ…Ñ¥½¹…±1•Ù•°ˆè€‰¥¹Ñ•Éµ•‘¥…Ñ”ˆ°(€€‰…Í•QåÁ”ˆè€‰±¥¹¥…±}‘•Éµ½Í½Á¥Œˆ°(€€‰Á…Ñ¥•¹Ñ½¹Ñ•áĞˆèì(€€€€‰…•	…¹ˆè€‰9½ĞÉ•Á½ÉÑ•ˆ°(€€€€‰Í•àˆè€‰9½ĞÉ•Á½ÉÑ•ˆ°(€€€€‰…¹…Ñ½µ¥…±M¥Ñ”ˆè€‰M­¥¸°Í¥Ñ”¹½ĞÉ•Á½ÉÑ•¥¸Ñ¡”™¥ÕÉ”…ÁÑ¥½¸ˆ°(€€€€‰ÁÉ•Í•¹Ñ…Ñ¥½¹9½Ñ•Ìˆè€‰¥ÕÉ”€ÄÁ…¹•±Ì„…¹ˆÍ¡½ÜÑ¡”Í…µ”ÉÕÍÑ•Á±…ÅÕ”¸%ÑÌ…¹…Ñ½µ¥…°Í¥Ñ”…¹±¥¹¥…°½ÕÉÍ”…É”¹½ĞÉ•Á½ÉÑ•¥¸Ñ¡”…ÁÑ¥½¸¸ˆ(€ô°(€€‰¥µ…•Ìˆèl(€€€ì(€€€€€€‰¥ˆè€‰¥µœµœÌÈ´ÀÅ„ˆ°(€€€€€€‰ÑåÁ”ˆè€‰±¥¹¥…°ˆ°(€€€€€€‰ÍÉŒˆè€‰…ÍÍ•ÑÌ½µ•‘¥„½…Í•Ì½…Í”´ÔØµ±¥¹¥…°¹©Áœˆ°(€€€€€€‰‘¥µ•¹Í¥½¹Ìˆèì(€€€€€€€€‰İ¥‘Ñ ˆè€ÄÀàÌ°(€€€€€€€€‰¡•¥¡Ğˆè€äÔÔ(€€€€€ô°(€€€€€€‰…±Ğˆè€‰¸½Ù…°Á¥¹¬Á±…ÅÕ”¡…Ì‘…É¬•¹ÑÉ…°ÉÕÍĞ…¹Á…±”Í…±”¸ˆ°(€€€€€€‰…ÁÑ¥½¸ˆè€‰¸½Ù…°Á¥¹¬Á±…ÅÕ”¡…Ì‘…É¬•¹ÑÉ…°ÉÕÍĞ…¹Á…±”Í…±”¸ˆ°(€€€€€€‰Í½ÕÉ”ˆè€‰MÕÉÑÔ°Õµ¥ÑÉ•ÍÔ…¹M¥µ¥½¹•ÍÔ°¥…¹½ÍÑ¥Ì€ÈÀÈĞ°¥ÕÉ”€Ä€¡A5ÄÄÌÔÌĞäÜ¤ˆ°(€€€€€€‰Í½ÕÉ•UÉ°ˆè€‰¡ÑÑÁÌè¼½‘½¤¹½Éœ¼ÄÀ¸ÌÌäÀ½‘¥…¹½ÍÑ¥ÌÄĞÄØÄÜääˆ°(€€€€€€‰É•…Ñ½Èˆè€‰MÕÉÑÔ°Õµ¥ÑÉ•ÍÔ…¹M¥µ¥½¹•ÍÔˆ°(€€€€€€‰±¥•¹Í”ˆè€‰	d€Ğ¸Àˆ°(€€€€€€‰±¥•¹Í•UÉ°ˆè€‰¡ÑÑÁÌè¼½É•…Ñ¥Ù•½µµ½¹Ì¹½Éœ½±¥•¹Í•Ì½‰ä¼Ğ¸À¼ˆ°(€€€€€€‰…ÑÑÉ¥‰ÕÑ¥½¸ˆè€‰MÕÉÑÔ°Õµ¥ÑÉ•ÍÔ…¹M¥µ¥½¹•ÍÔ°¥…¹½ÍÑ¥Ì€ÈÀÈĞ°¥ÕÉ”€ÄÁ…¹•°„°¡ÑÑÁÌè¼½‘½¤¹½Éœ¼ÄÀ¸ÌÌäÀ½‘¥…¹½ÍÑ¥ÌÄĞÄØÄÜää°	d€Ğ¸À¸É½ÁÁ•‰ä½ÕÑ¥Ì¸ˆ°(€€€€€€‰…ÑÑÉ¥‰ÕÑ¥½¹I•ÅÕ¥É•ˆèÑÉÕ”°(€€€€€€‰µ½‘¥™¥…Ñ¥½¹MÑ…ÑÕÌˆè€‰É½ÁÁ•ˆ°(€€€€€€‰…•ÍÍ…Ñ”ˆè€ˆÈÀÈØ´ÄÄ´ÈĞˆ°(€€€€€€‰µ•Ñ…‘…Ñ…¡•­•‘Ğˆè€ˆÈÀÈØ´ÄÄ´ÈĞˆ°(€€€€€€‰Í½ÕÉ•Y•É¥™¥…Ñ¥½¹MÑ…ÑÕÌˆè€‰Ù•É¥™¥•ˆ°(€€€€€€‰Á…Ñ¥•¹Ñ%‘•¹Ñ¥™¥…‰±”ˆè™…±Í”°(€€€€€€‰½¹Í•¹Ñ	…Í¥Ìˆè€‰AÕ‰±¥Í¡•½Á•¸µ…•ÍÌ™¥ÕÉ”±¥•¹Í•	d€Ğ¸À¸Q¡”É½ÀÍ¡½İÌ½¹±ä¹½¸µ¥‘•¹Ñ¥™¥…‰±”±½Í”µÕÀÍ­¥¸¸ˆ°(€€€€€€‰µ½‘¥™¥…Ñ¥½¹Í9½Ñ•Ìˆè€‰‘¥…¹½ÍÑ¥Ì´ÄĞ´ÀÄÜääµœÀÀÄ¹Á¹œ°ÁÕ‰±¥Í¡•È¥ÕÉ”€ÄìÍ½ÕÉ”Í¡„ÈÔØ€ÌÅ‰˜Í„ÔÜÁÔäàĞÀÌá™ˆá”ÜÉŒÅ˜Å™˜Å„İ”ÈäÔÀØÈåŒÜİ”ÌÍ™ˆàÄÈá˜ÄäÕ™‘‘…™™ŒìA¥±±½ÜÉ½À±•™Ğ€ÌĞ°Ñ½À€ÈÔ°É¥¡Ğ€ÄÄÄÜ°‰½ÑÑ½´€äàÀ°Í…Ù•)AÅÕ…±¥Ñä€àà°µ•Ñ…‘…Ñ„½µ¥ÑÑ•ì½ÕÑÁÕĞÍ¡„ÈÔØ‘‘„ØÈÈÌÅ‰˜Å…‰‰•ˆÁ™„ÉàĞÍ……˜ĞÙŒåáˆÙäÀÌÈÑ™ˆå…˜ØÄÜÑ‰˜ÉˆÄÌÍ˜Ñ„ØÌ¸A…¹•°±•ÑÑ•ÈÉ•µ½Ù•¸ˆ(€€€ô°(€€€ì(€€€€€€‰¥ˆè€‰¥µœµœÌÈ´ÀÅˆˆ°(€€€€€€‰ÑåÁ”ˆè€‰‘•Éµ½Í½Áäˆ°(€€€€€€‰ÍÉŒˆè€‰…ÍÍ•ÑÌ½µ•‘¥„½…Í•Ì½…Í”´ÔØµ‘•Éµ½Í½Áä¹©Áœˆ°(€€€€€€‰‘¥µ•¹Í¥½¹Ìˆèì(€€€€€€€€‰İ¥‘Ñ ˆè€ÄÔØØ°(€€€€€€€€‰¡•¥¡Ğˆè€äÔÔ(€€€€€ô°(€€€€€€‰…±Ğˆè€‰É•µÁ¥¹¬™¥•±Í¡½İÌ…‘¡•É•¹ĞÉ•µ‰É½İ¸ÉÕÍĞ…¹„™•Ü™¥¹”Ù•ÍÍ•±ÌÑ½İ…ÉÑ¡”•‘”¸!…¥ÉÌ…¹ÍÕÉ™…”É•™±•Ñ¥½¹Ì…É”Ù¥Í¥‰±”¸ˆ°(€€€€€€‰…ÁÑ¥½¸ˆè€‰É•µÁ¥¹¬™¥•±Í¡½İÌ…‘¡•É•¹ĞÉ•µ‰É½İ¸ÉÕÍĞ…¹„™•Ü™¥¹”Ù•ÍÍ•±ÌÑ½İ…ÉÑ¡”•‘”¸!…¥ÉÌ…¹ÍÕÉ™…”É•™±•Ñ¥½¹Ì…É”Ù¥Í¥‰±”¸ˆ°(€€€€€€‰Í½ÕÉ”ˆè€‰MÕÉÑÔ°Õµ¥ÑÉ•ÍÔ…¹M¥µ¥½¹•ÍÔ°¥…¹½ÍÑ¥Ì€ÈÀÈĞ°¥ÕÉ”€Ä€¡A5ÄÄÌÔÌĞäÜ¤ˆ°(€€€€€€‰Í½ÕÉ•UÉ°ˆè€‰¡ÑÑÁÌè¼½‘½¤¹½Éœ¼ÄÀ¸ÌÌäÀ½‘¥…¹½ÍÑ¥ÌÄĞÄØÄÜääˆ°(€€€€€€‰É•…Ñ½Èˆè€‰MÕÉÑÔ°Õµ¥ÑÉ•ÍÔ…¹M¥µ¥½¹•ÍÔˆ°(€€€€€€‰±¥•¹Í”ˆè€‰	d€Ğ¸Àˆ°(€€€€€€‰±¥•¹Í•UÉ°ˆè€‰¡ÑÑÁÌè¼½É•…Ñ¥Ù•½µµ½¹Ì¹½Éœ½±¥•¹Í•Ì½‰ä¼Ğ¸À¼ˆ°(€€€€€€‰…ÑÑÉ¥‰ÕÑ¥½¸ˆè€‰MÕÉÑÔ°Õµ¥ÑÉ•ÍÔ…¹M¥µ¥½¹•ÍÔ°¥…¹½ÍÑ¥Ì€ÈÀÈĞ°¥ÕÉ”€ÄÁ…¹•°ˆ°¡ÑÑÁÌè¼½‘½¤¹½Éœ¼ÄÀ¸ÌÌäÀ½‘¥…¹½ÍÑ¥ÌÄĞÄØÄÜää°	d€Ğ¸À¸É½ÁÁ•‰ä½ÕÑ¥Ì¸ˆ°(€€€€€€‰…ÑÑÉ¥‰ÕÑ¥½¹I•ÅÕ¥É•ˆèÑÉÕ”°(€€€€€€‰µ½‘¥™¥…Ñ¥½¹MÑ…ÑÕÌˆè€‰É½ÁÁ•ˆ°(€€€€€€‰…•ÍÍ…Ñ”ˆè€ˆÈÀÈØ´ÄÄ´ÈĞˆ°(€€€€€€‰µ•Ñ…‘…Ñ…¡•­•‘Ğˆè€ˆÈÀÈØ´ÄÄ´ÈĞˆ°(€€€€€€‰Í½ÕÉ•Y•É¥™¥…Ñ¥½¹MÑ…ÑÕÌˆè€‰Ù•É¥™¥•ˆ°(€€€€€€‰Á…Ñ¥•¹Ñ%‘•¹Ñ¥™¥…‰±”ˆè™…±Í”°(€€€€€€‰½¹Í•¹Ñ	…Í¥Ìˆè€‰AÕ‰±¥Í¡•½Á•¸µ…•ÍÌ™¥ÕÉ”±¥•¹Í•	d€Ğ¸À¸Q¡”É½ÀÍ¡½İÌ½¹±ä¹½¸µ¥‘•¹Ñ¥™¥…‰±”±½Í”µÕÀÍ­¥¸¸ˆ°(€€€€€€‰µ½‘¥™¥…Ñ¥½¹Í9½Ñ•Ìˆè€‰‘¥…¹½ÍÑ¥Ì´ÄĞ´ÀÄÜääµœÀÀÄ¹Á¹œ°ÁÕ‰±¥Í¡•È¥ÕÉ”€ÄìÍ½ÕÉ”Í¡„ÈÔØ€ÌÅ‰˜Í„ÔÜÁÔäàĞÀÌá™ˆá”ÜÉŒÅ˜Å™˜Å„İ”ÈäÔÀØÈåŒÜİ”ÌÍ™ˆàÄÈá˜ÄäÕ™‘‘…™™ŒìA¥±±½ÜÉ½À±•™Ğ€ÄÄÈÌ°Ñ½À€ÈÔ°É¥¡Ğ€ÈØàä°‰½ÑÑ½´€äàÀ°Í…Ù•)AÅÕ…±¥Ñä€àà°µ•Ñ…‘…Ñ„½µ¥ÑÑ•ì½ÕÑÁÕĞÍ¡„ÈÔØÌÀÈäĞáˆá•…ŒÉ„ÄÈäÀÔÔØå”á”äÕŒåŒİ•ˆÙÙ”á•ŒÈİ˜å…‰˜àá••˜Àá˜Á„ÄĞØÜÕ”¸A…¹•°±•ÑÑ•ÈÉ•µ½Ù•¸ˆ(€€€ô(€t°(€€‰‘¥…¹½ÍÑ¥É½Õ¹‘QÉÕÑ ˆèì(€€€€‰½¹™¥Éµ•‘¥…¹½Í¥Ìˆè€‰MÅÕ…µ½ÕÌ•±°…É¥¹½µ„¥¸Í¥ÑÔ€¡	½İ•¸‘¥Í•…Í”¤ˆ°(€€€€‰½¹™¥Éµ…Ñ¥½¹5•Ñ¡½ˆè€‰¡¥ÍÑ½Á…Ñ¡½±½äˆ°(€€€€‰¡¥ÍÑ½Á…Ñ¡½±½åM½ÕÉ”ˆè€‰™¥ÕÉ•}…ÁÑ¥½¸ˆ°(€€€€‰½¹™¥Éµ…Ñ¥½¹9½Ñ•Ìˆè€‰MÕÉÑÔ…¹½…ÕÑ¡½ÉÌ°¥ÕÉ”€ÄÁ…¹•±Ì‡ŠMˆ°É•Á½ÉĞÑ¡…Ğ¡¥ÍÑ½Á…Ñ¡½±½äÍ¡½İ•Õ±•É…Ñ•°¹½¸µÁ¥µ•¹Ñ•	½İ•¸‘¥Í•…Í”™½ÈÑ¡¥Ì±•Í¥½¸°İ¥Ñ ¹¼¥¹Ù…Í¥Ù”MÉ•Á½ÉÑ•¸ˆ°(€€€€‰½¹™¥‘•¹•9½Ñ”ˆè€‰1•Í¥½¸µÍÁ•¥™¥ŒÍÑ…Ñ•µ•¹Ğ¥¸Ñ¡”™¥ÕÉ”…ÁÑ¥½¸¸Q¡”Í±¥‘”¥Ì¹½Ğ¥¹±Õ‘•¥¸Ñ¡¥ÌÑ•…¡¥¹œ…Í”¸ˆ(€ô°(€€‰½‰Í•ÉÙ…Ñ¥½¹Ìˆèl(€€€ì(€€€€€€‰¥ˆè€‰½‰ÌµœÌÈ´ÀÅ„ˆ°(€€€€€€‰­¥¹ˆè€‰½‰Í•ÉÙ…Ñ¥½¸ˆ°(€€€€€€‰µ½‘…±¥Ñäˆè€‰±¥¹¥…°ˆ°(€€€€€€‰Ñ•áĞˆè€‰¸½Ù…°Á¥¹¬Á±…ÅÕ”¡…Ì‘…É¬•¹ÑÉ…°ÉÕÍĞ…¹Á…±”Í…±”¸ˆ(€€€ô°(€€€ì(€€€€€€‰¥ˆè€‰½‰ÌµœÌÈ´ÀÅˆˆ°(€€€€€€‰­¥¹ˆè€‰½‰Í•ÉÙ…Ñ¥½¸ˆ°(€€€€€€‰µ½‘…±¥Ñäˆè€‰‘•Éµ½Í½Áäˆ°(€€€€€€‰Ñ•áĞˆè€‰É•µÁ¥¹¬™¥•±Í¡½İÌ…‘¡•É•¹ĞÉ•µ‰É½İ¸ÉÕÍĞ…¹„™•Ü™¥¹”Ù•ÍÍ•±ÌÑ½İ…ÉÑ¡”•‘”¸!…¥ÉÌ…¹ÍÕÉ™…”É•™±•Ñ¥½¹Ì…É”Ù¥Í¥‰±”¸ˆ(€€€ô(€t°(€€‰¥¹Ñ•ÉÁÉ•Ñ…Ñ¥½¹Ìˆèl(€€€ì(€€€€€€‰¥ˆè€‰¥¹ĞµœÌÈ´ÀÄˆ°(€€€€€€‰­¥¹ˆè€‰¥¹Ñ•ÉÁÉ•Ñ…Ñ¥½¸ˆ°(€€€€€€‰É•±…Ñ•‘=‰Í•ÉÙ…Ñ¥½¹%‘Ìˆèl(€€€€€€€€‰½‰ÌµœÌÈ´ÀÅ„ˆ°(€€€€€€€€‰½‰ÌµœÌÈ´ÀÅˆˆ(€€€€€t°(€€€€€€‰Ñ•áĞˆè€‰Q¡”‘…É¬•¹Ñ•È¥Ì½µÁ…Ñ¥‰±”İ¥Ñ ‘É¥•‰±½½½ÈÉÕÍĞìÑ¡”Ñİ¼Ù¥•İÌ‘¼¹½Ğ•ÍÑ…‰±¥Í ¥¹Ù…Í¥½¸¸ˆ(€€€ô(€t°(€€‰‘¥™™•É•¹Ñ¥…±Ìˆèl(€€€ì(€€€€€€‰‘¥…¹½Í¥Ìˆè€‰%¹Ù…Í¥Ù”ÕÑ…¹•½ÕÌÍÅÕ…µ½ÕÌ•±°…É¥¹½µ„ˆ°(€€€€€€‰ÍÕÁÁ½ÉÑ¥¹•…ÑÕÉ•Ìˆèl(€€€€€€€€‰ÉÕÍÑ•É•Á±…ÅÕ”İ¥Ñ …¸•É½‘••¹Ñ•Èˆ(€€€€€t°(€€€€€€‰½¹ÑÉ…‘¥Ñ¥¹•…ÑÕÉ•Ìˆèl(€€€€€€€€‰•ÁÑ ¥Ì¹½Ğ…ÍÍ•ÍÍ…‰±”½¸Ñ¡•Í”Á¡½Ñ½É…Á¡Ìˆ(€€€€€t°(€€€€€€‰Ñ•…¡¥¹¥ÍÑ¥¹Ñ¥½¸ˆè€‰Q¡”Í½ÕÉ”½¹Í¥‘•É•…¸¥¹Ù…Í¥Ù”±•Í¥½¸±¥¹¥…±±äìÑ¡”Á…Ñ¡½±½ä‘¥ÍÑ¥¹Õ¥Í¡•Ñ¡”Ñİ¼¸ˆ(€€€ô°(€€€ì(€€€€€€‰‘¥…¹½Í¥Ìˆè€‰MÅÕ…µ½ÕÌ•±°…É¥¹½µ„¥¸Í¥ÑÔ€¡	½İ•¸‘¥Í•…Í”¤ˆ°(€€€€€€‰ÍÕÁÁ½ÉÑ¥¹•…ÑÕÉ•Ìˆèl(€€€€€€€€‰A¥¹¬Á±…ÅÕ”İ¥Ñ Í…±”…¹ÉÕÍĞˆ(€€€€€t°(€€€€€€‰½¹ÑÉ…‘¥Ñ¥¹•…ÑÕÉ•Ìˆèl(€€€€€€€€‰Q¡”™•ÜÙ¥Í¥‰±”Á•É¥Á¡•É…°Ù•ÍÍ•±Ì‘¼¹½ĞÍ•ÑÑ±”Ñ¡”±…‰•°ˆ(€€€€€t°(€€€€€€‰Ñ•…¡¥¹¥ÍÑ¥¹Ñ¥½¸ˆè€‰Q¡”Á±…ÅÕ”…¹ÉÕÍĞ½Ù•É±…Àİ¥Ñ …¸¥¹Ù…Í¥Ù”…ÁÁ•…É…¹”¸ˆ(€€€ô°(€€€ì(€€€€€€‰‘¥…¹½Í¥Ìˆè€‰1¥¡•¸Á±…¹ÕÌµ±¥­”­•É…Ñ½Í¥Ìˆ°(€€€€€€‰ÍÕÁÁ½ÉÑ¥¹•…ÑÕÉ•Ìˆèl(€€€€€€€€‰A¥¹¬Í…±äÁ±…ÅÕ”ˆ(€€€€€t°(€€€€€€‰½¹ÑÉ…‘¥Ñ¥¹•…ÑÕÉ•Ìˆèl(€€€€€€€€‰Q¡”ÉÕÍÑ••¹Ñ•È±•…Ù•ÌÑ¡”½µÁ•Ñ¥¹œ‘¥…¹½Í•ÌÕ¹É•Í½±Ù•ˆ(€€€€€t°(€€€€€€‰Ñ•…¡¥¹¥ÍÑ¥¹Ñ¥½¸ˆè€‰Á¥¹¬Í…±äÁ±…ÅÕ”…¸¡…Ù”„‰•¹¥¸Í½ÕÉ”‘¥…¹½Í¥ÌÑ½¼¸½µÁ…É”Ñ¡”½¹ÑÉ…ÍÑ¥¹œ…Í”¸ˆ(€€€ô(€t°(€€‰Ñ•…¡¥¹A½¥¹ÑÌˆèl(€€€ì(€€€€€€‰¥ˆè€‰ÑÀµœÌÈ´ÀÅ„ˆ°(€€€€€€‰Ñ¥Ñ±”ˆè€‰•ÍÉ¥‰”Ñ¡”•¹Ñ•È…¹•‘”Í•Á…É…Ñ•±äˆ°(€€€€€€‰Ñ•áĞˆè€‰•ÍÉ¥‰”•¹ÑÉ…°ÉÕÍĞ…¹Ñ¡”™•ÜÁ•É¥Á¡•É…°Ù•ÍÍ•±Ì‰•™½É”‘•¥‘¥¹œİ¡…Ğ•¥Ñ¡•Èµ•…¹Ì¸ˆ(€€€ô°(€€€ì(€€€€€€‰¥ˆè€‰ÑÀµœÌÈ´ÀÅˆˆ°(€€€€€€‰Ñ¥Ñ±”ˆè€‰]¡…ĞÍ•ÑÑ±•Ñ¡¥Ì…Í”ˆ°(€€€€€€‰Ñ•áĞˆè€‰Q¡”±•Í¥½¸±½½­•½¹•É¹¥¹œ™½È¥¹Ù…Í¥½¸°‰ÕĞÑ¡”™¥ÕÉ”…ÁÑ¥½¸É•Á½ÉÑÌ¥¸µÍ¥ÑÔ‘¥Í•…Í”½¸Á…Ñ¡½±½ä¸ˆ(€€€ô(€t°(€€‰±½Í•ÍÑ5¥µ¥Œˆèì(€€€€‰¹…µ”ˆè€‰%¹Ù…Í¥Ù”ÕÑ…¹•½ÕÌÍÅÕ…µ½ÕÌ•±°…É¥¹½µ„ˆ°(€€€€‰İ¡å±½Í•ÍĞˆè€‰Q¡”Í½ÕÉ”‘•ÍÉ¥‰•ÌÑ¡¥Ì±•Í¥½¸…Ì„±¥¹¥…°µ¥µ¥Œ½˜¥¹Ù…Í¥Ù”M¸ˆ(€ô°(€€‰Á…¥É•‘5½‘…±¥Ñäˆèì(€€€€‰±¥¹¥…±=‰Í•ÉÙ…Ñ¥½¸ˆè€‰¸½Ù…°Á¥¹¬Á±…ÅÕ”¡…Ì‘…É¬•¹ÑÉ…°ÉÕÍĞ…¹Á…±”Í…±”¸ˆ°(€€€€‰‘•Éµ½Í½Á¥=‰Í•ÉÙ…Ñ¥½¸ˆè€‰É•µÁ¥¹¬™¥•±Í¡½İÌ…‘¡•É•¹ĞÉ•µ‰É½İ¸ÉÕÍĞ…¹„™•Ü™¥¹”Ù•ÍÍ•±ÌÑ½İ…ÉÑ¡”•‘”¸!…¥ÉÌ…¹ÍÕÉ™…”É•™±•Ñ¥½¹Ì…É”Ù¥Í¥‰±”¸ˆ°(€€€€‰…‘‘•‘Y…±Õ”ˆè€‰Q¡”Í•½¹Ù¥•ÜÍ•Á…É…Ñ•ÌÍÕÉ™…”É•™±•Ñ¥½¹Ì…¹¡…¥ÉÌ™É½´Ù•ÍÍ•±Ì…¹ÉÕÍĞ¸ˆ°(€€€€‰É•…Í½¹¥¹%µÁ…Ğˆè€‰Q¡”Í•½¹Ù¥•ÜÉ•™¥¹•ÌÑ¡”ÍÕÉ™…”…¹Ù•ÍÍ•°‘•ÍÉ¥ÁÑ¥½¸İ¥Ñ¡½ÕĞÉ•Í½±Ù¥¹œ¥¹Ù…Í¥½¸¸ˆ°(€€€€‰±¥µ¥ÑÌˆè€‰Q¡”Í…±”°‰½‘äÍ¥Ñ”°Á…±Á…Ñ¥½¸…¹¡¥ÍÑ½±½äÍ±¥‘”…¹¹½Ğ‰”…ÍÍ•ÍÍ•™É½´Ñ¡•Í”™É…µ•Ì¸ˆ°(€€€€‰¥¹™½Éµ…Ñ¥½¹…¥¸ˆè€‰‘•Éµ½Í½Áå}…‘‘Í}ÍÕÁÁ½ÉĞˆ°(€€€€‰¥¹™½Éµ…Ñ¥½¹…¥¹9½Ñ”ˆè€‰•Éµ½Í½ÁäÍ¡½İÌÑ¡”‰±½½ÉÕÍĞ…¹„™•Ü™¥¹”Á•É¥Á¡•É…°Ù•ÍÍ•±Ìµ½É”±½Í•±ä¸Q¡”¥µ…•Ì‘¼¹½Ğ•ÍÑ…‰±¥Í İ¡•Ñ¡•ÈÑ¡”±•Í¥½¸¥Ì¥¹Ù…Í¥Ù”¸ˆ°(€€€€‰½µÁ…É¥Í½¸ˆèì(€€€€€€‰±¥¹¥…±±Õ”ˆè€‰¸½Ù…°Á¥¹¬Á±…ÅÕ”İ¥Ñ ÉÕÍĞ¸ˆ°(€€€€€€‰‘•Éµ½Í½Á¥±Õ”ˆè€‰…É¬ÉÕÍĞ…¹™¥¹”Á•É¥Á¡•É…°Ù•ÍÍ•±Ì¸ˆ°(€€€€€€‰…‘‘•‘%¹™½Éµ…Ñ¥½¸ˆè€‰¥¹”Á•É¥Á¡•É…°‘•Ñ…¥°¥ÌÙ¥Í¥‰±”¥¸Ñ¡”±½Í”Ù¥•Ü¸ˆ°(€€€€€€‰‘¥…¹½ÍÑ¥½¹™±¥Ğˆè€‰	½Ñ Ù¥•İÌ±•…Ù”Ñ¡”‘•ÁÑ ÅÕ•ÍÑ¥½¸½Á•¸¸ˆ°(€€€€€€‰Ñ•…¡¥¹IÕ±”ˆè€‰½µÁ…É”Ñ¡”¥µ…”µ‰…Í•‘¥™™•É•¹Ñ¥…°İ¥Ñ Ñ¡”±•Í¥½¸µÍÁ•¥™¥ŒÁ…Ñ¡½±½ä¥¸Ñ¡”Í½ÕÉ”¸ˆ(€€€ô(€ô°(€€‰‘¥ÍÁ½Í¥Ñ¥½¹Q•…¡¥¹œˆèì(€€€€‰ÍÕµµ…Éäˆè€‰%¸Ñ¡”Í½ÕÉ”°Á…Ñ¡½±½ä‘¥ÍÑ¥¹Õ¥Í¡•¥¸µÍ¥ÑÔ‘¥Í•…Í”™É½´„±•Í¥½¸Ñ¡…Ğ±½½­•¥¹Ù…Í¥Ù”¸ˆ°(€€€€‰½ÁÑ¥½¹Ìˆèl(€€€€€ì(€€€€€€€€‰¥ˆè€‰‰¥½ÁÍäµ•á¥Í¥½¸µ½¹Í¥‘•É…Ñ¥½¸ˆ°(€€€€€€€€‰±…‰•°ˆè€‰	¥½ÁÍä½È•á¥Í¥½¸½¹Í¥‘•É…Ñ¥½¸ˆ°(€€€€€€€€‰É…Ñ¥½¹…±”ˆè€‰Q¥ÍÍÕ”•á…µ¥¹…Ñ¥½¸É•Í½±Ù•Ñ¡”Õ¹•ÉÑ…¥¸‘¥ÍÑ¥¹Ñ¥½¸¥¸Ñ¡”™¥ÕÉ”…ÁÑ¥½¸¸ˆ(€€€€€ô(€€€t°(€€€€‰ÁÉ•™•ÉÉ•‘‘Õ…Ñ¥½¹…±%ˆè€‰‰¥½ÁÍäµ•á¥Í¥½¸µ½¹Í¥‘•É…Ñ¥½¸ˆ°(€€€€‰Í½ÕÉ•9½Ñ”ˆè€‰¥…¹½ÍÑ¥Ì€ÈÀÈĞ°¥ÕÉ”€Ä‡ŠMˆì•Éµ…¸LÌ,½MÕ¥‘•±¥¹”°‘¥…¹½ÍÑ¥Œİ½É¬µÕÀ¸ˆ°(€€€€‰±¥µ¥Ñ…Ñ¥½¸ˆè€‰‘Õ…Ñ¥½¹…°É•Ù¥•Ü½˜Ñ¡”ÁÕ‰±¥Í¡••á…µÁ±”¸9¼¥¹‘¥Ù¥‘Õ…°µ…¹…•µ•¹ĞÉ•½µµ•¹‘…Ñ¥½¸¸ˆ(€ô°(€€‰µ½‘…±¥Ñå%¹Ñ•É…Ñ¥½¸ˆè€‰Q¡”±¥¹¥…°Á¡½Ñ½É…Á Í¡½İÌÑ¡”İ¡½±”ÉÕÍÑ•Á¥¹¬Á±…ÅÕ”¸Q¡”‘•Éµ½Í½Á¥ŒÙ¥•Ü‘•Á¥ÑÌ•¹ÑÉ…°ÉÕÍĞ…¹„™•ÜÁ•É¥Á¡•É…°Ù•ÍÍ•±Ì…Ğ±½Í•ÈÉ…¹”¸ˆ°(€€‰½µÁ…É•]¥Ñ ˆèl(€€€€‰µÀµ‰½İ•¸µ±Á±¬µÉÕÍĞˆ(€t°(€€‰É•½É‘•‘MÉ••¹¥¹•¥Í¥½¸ˆè¹Õ±°°(€€‰Á…ÑÑ•É¹Ìˆèmt°(€€‰…¹¹½Ñ…Ñ¥½¹Ìˆèmt°(€€‰‘•Éµ½Í½Á¥•…ÑÕÉ•Ìˆèmt°(€€‰±½…±¥é…Ñ¥½¸ˆè¹Õ±°°(€€‰É•Ù¥•İMÑ…ÑÕÌˆè€‰±¥¹¥¥…¸É•Ù¥•ÜÉ•ÅÕ¥É•ˆ°(€€‰±¥¹¥…±I•Ù¥•Üˆè¹Õ±°)ô)€((ğ½‘•Ñ…¥±Ìø((´Y•É‘¥Ğè(´I•Ù¥•İ•Í•Ñ¥½¹Ìè(´Ù¥‘•¹”Í½ÕÉ•Ì…ÑÕ…±±ä¡•­•è(´ÁÁÉ½Ù••á…ĞÉ•Á±…•µ•¹Ğİ½É‘¥¹œ€¡¥˜…¹ä¤è(´I•ÅÕ¥É•½ÉÉ•Ñ¥½¹Ì€¼É•©•Ñ•±…¥µÌè(´AÕ‰±¥ŒÉ•Ù¥•İ•È¹½Ñ•Ìè((ŒŒ…Í”èÉ…¥Í•Á¥¹¬±•Í¥½¸½¸Ñ¡”ÕÁÁ•È•å•±¥€¡…Í”µœÌÌ´ÀÅ€¤((´€¨©á…Ğ™¥¹•ÉÁÉ¥¹Ğè¨¨Í¡„ÈÔØµØÄèÅ‘„ÄÄØÅ„Õ”ÄÄÅŒÅ˜äå˜ÑŒààäÈÔäÌØÌÀäÁ…„ÄÑˆÈİ™ŒØÅˆÑˆÜÑ„ØĞÁÅ‰•”ØÄààÕ‘€(´€¨©M¡•µ„Ù•ÉÍ¥½¸è¨¨€Ä(´€¨©I•Ù¥•İ…‰±”Í•Ñ¥½¹Ìè¨¨¥µ…•Í€°½‰Í•ÉÙ…Ñ¥½¹Í€°¥¹Ñ•ÉÁÉ•Ñ…Ñ¥½¹Í€°‘•Éµ½Í½Á¥Œµ™•…ÑÕÉ•Í€°‘¥™™•É•¹Ñ¥…±Í€°‘¥…¹½ÍÑ¥ŒµÉ½Õ¹µÑÉÕÑ¡€°Ñ•…¡¥¹œµÁ½¥¹ÑÍ€°Í…™•Ñäµ¹½Ñ¥•€°ÁÉ½Ù•¹…¹•€(´€¨©5…ÁÁ••Ù¥‘•¹”Í½ÕÉ•Ìè¨¨(€€´¡ÑÑÁÌè¼½‘½¤¹½Éœ¼ÄÀ¸ÌÌäÀ½‘¥…¹½ÍÑ¥ÌÄÌÈÌÌÔäÀ(´€¨©ÕÑ½µ…Ñ•İ…É¹¥¹Ìè¨¨(€€´½¹™¥É´¥µ…”ÁÉ½Ù•¹…¹”½±¥•¹Í”°½‰Í•ÉÙ…Ñ¥½¹ÌÙÌ¥¹Ñ•ÉÁÉ•Ñ…Ñ¥½¹ÌÍ•Á…É…Ñ¥½¸°‘¥™™•É•¹Ñ¥…±Ì°‘¥…¹½ÍÑ¥Œ½¹™¥Éµ…Ñ¥½¸µ•Ñ¡½¡½¹•ÍÑä°…¹Ñ¡…Ğ$¥¹Ñ•ÉÁÉ•Ñ…Ñ¥½¸¥Ì¹½ĞÑÉ•…Ñ•…Ì±¥¹¥¥…¸É•Ù¥•Ü¸(€€´ÕÑ½µ…Ñ•Í½ÕÉ”…ÑÑ…¡µ•¹Ğ…¹Í¡•µ„Ù…±¥‘…Ñ¥½¸…É”¹½Ğ•Ù¥‘•¹”½˜±¥¹¥…°…ÁÁÉ½Ù…°¸(´€¨©$µ•¹•É…Ñ•ÁÉ½Á½Í…°è¨¨9¼±¥¹¥…°İ½É‘¥¹œ¡…¹”¡…Ì‰••¸…ÁÁ±¥•¸I•Ù¥•ÜÑ¡”ÕÉÉ•¹ĞÑ•áĞ‰•±½Ü…¹•¥Ñ¡•È…ÁÁÉ½Ù”¥ĞÕ¹¡…¹•°…ÁÁÉ½Ù”•á…ĞÉ•Á±…•µ•¹Ğİ½É‘¥¹œ°É•ÅÕ•ÍĞ¡…¹•Ì°É•©•Ğ…¸Õ¹ÍÕÁÁ½ÉÑ•±…¥´°½È‘•™•È¸((ñ‘•Ñ…¥±Ìø(ñÍÕµµ…ÉäùÕÉÉ•¹Ğ•á…Ğ½¹Ñ•¹Ğğ½ÍÕµµ…Éäø()©Í½¸)ì(€€‰¥ˆè€‰…Í”µœÌÌ´ÀÄˆ°(€€‰Í±Õœˆè€‰œÌÌµÉ…¥Í•µÁ¥¹¬µ•å•±¥µ±•Í¥½¸ˆ°(€€‰Ñ¥Ñ±”ˆè€‰É…¥Í•Á¥¹¬±•Í¥½¸½¸Ñ¡”ÕÁÁ•È•å•±¥ˆ°(€€‰‘¥…¹½Í¥Í1…‰•°ˆè€‰%¹Ù…Í¥Ù”ÕÑ…¹•½ÕÌÍÅÕ…µ½ÕÌ•±°…É¥¹½µ„ˆ°(€€‰‘¥Í•…Í•%ˆè€‰ÕÑ…¹•½ÕÌµÍÅÕ…µ½ÕÌµ•±°µ…É¥¹½µ„ˆ°(€€‰…Ñ•½Éäˆè€‰-•É…Ñ¥¹½åÑ¥Œµ…±¥¹…¹¥•Ìˆ°(€€‰•‘Õ…Ñ¥½¹…±1•Ù•°ˆè€‰¥¹Ñ•Éµ•‘¥…Ñ”ˆ°(€€‰…Í•QåÁ”ˆè€‰±¥¹¥…±}‘•Éµ½Í½Á¥Œˆ°(€€‰Á…Ñ¥•¹Ñ½¹Ñ•áĞˆèì(€€€€‰…•	…¹ˆè€‰9½ĞÉ•Á½ÉÑ•™½ÈÑ¡¥Ì™¥ÕÉ”ˆ°(€€€€‰Í•àˆè€‰9½ĞÉ•Á½ÉÑ•™½ÈÑ¡¥Ì™¥ÕÉ”ˆ°(€€€€‰…¹…Ñ½µ¥…±M¥Ñ”ˆè€‰1•™ĞÕÁÁ•È•å•±¥ˆ°(€€€€‰ÁÉ•Í•¹Ñ…Ñ¥½¹9½Ñ•Ìˆè€‰Q¡”™¥ÕÉ”Í¡½İÌ„±•Í¥½¸…ĞÑ¡”±•™ĞÕÁÁ•È•å•±¥µ…É¥¸¸É½İÑ ¡¥ÍÑ½Éä…¹Á…±Á…Ñ¥½¸…É”Õ¹…Ù…¥±…‰±”¸ˆ(€ô°(€€‰¥µ…•Ìˆèl(€€€ì(€€€€€€‰¥ˆè€‰¥µœµœÌÌ´ÀÅ„ˆ°(€€€€€€‰ÑåÁ”ˆè€‰±¥¹¥…°ˆ°(€€€€€€‰ÍÉŒˆè€‰…ÍÍ•ÑÌ½µ•‘¥„½…Í•Ì½…Í”´ÔÜµ±¥¹¥…°¹©Áœˆ°(€€€€€€‰‘¥µ•¹Í¥½¹Ìˆèì(€€€€€€€€‰İ¥‘Ñ ˆè€ĞäÀ°(€€€€€€€€‰¡•¥¡Ğˆè€ÄàÀ(€€€€€ô°(€€€€€€‰…±Ğˆè€‰É…¥Í•Á¥¹¬±•Í¥½¸Í¥ÑÌ…ĞÑ¡”ÕÁÁ•È•å•±¥µ…É¥¸¸Q¡•É”…É”Íµ…±°É•ÍÕÉ™…”‰É•…­Ì…¹Á…±”å•±±½Üµİ¡¥Ñ”…‘¡•É•¹Ğµ…Ñ•É¥…°¸ˆ°(€€€€€€‰…ÁÑ¥½¸ˆè€‰É…¥Í•Á¥¹¬±•Í¥½¸Í¥ÑÌ…ĞÑ¡”ÕÁÁ•È•å•±¥µ…É¥¸¸Q¡•É”…É”Íµ…±°É•ÍÕÉ™…”‰É•…­Ì…¹Á…±”å•±±½Üµİ¡¥Ñ”…‘¡•É•¹Ğµ…Ñ•É¥…°¸ˆ°(€€€€€€‰Í½ÕÉ”ˆè€‰¤MÑ•™…¹¤•Ğ…°¸°¥…¹½ÍÑ¥Ì€ÈÀÈÌ°¥ÕÉ”€Ìˆ°(€€€€€€‰Í½ÕÉ•UÉ°ˆè€‰¡ÑÑÁÌè¼½‘½¤¹½Éœ¼ÄÀ¸ÌÌäÀ½‘¥…¹½ÍÑ¥ÌÄÌÈÌÌÔäÀˆ°(€€€€€€‰É•…Ñ½Èˆè€‰±•ÍÍ…¹‘É¼¤MÑ•™…¹¤…¹½…ÕÑ¡½ÉÌˆ°(€€€€€€‰±¥•¹Í”ˆè€‰	d€Ğ¸Àˆ°(€€€€€€‰±¥•¹Í•UÉ°ˆè€‰¡ÑÑÁÌè¼½É•…Ñ¥Ù•½µµ½¹Ì¹½Éœ½±¥•¹Í•Ì½‰ä¼Ğ¸À¼ˆ°(€€€€€€‰…ÑÑÉ¥‰ÕÑ¥½¸ˆè€‰¤MÑ•™…¹¤•Ğ…°¸°¥…¹½ÍÑ¥Ì€ÈÀÈÌ°¥ÕÉ”€Ì°Á…¹•°„¸¡ÑÑÁÌè¼½‘½¤¹½Éœ¼ÄÀ¸ÌÌäÀ½‘¥…¹½ÍÑ¥ÌÄÌÈÌÌÔäÀ¸	d€Ğ¸À¸É½ÁÁ•‰ä½ÕÑ¥Ì¸ˆ°(€€€€€€‰…ÑÑÉ¥‰ÕÑ¥½¹I•ÅÕ¥É•ˆèÑÉÕ”°(€€€€€€‰µ½‘¥™¥…Ñ¥½¹MÑ…ÑÕÌˆè€‰É½ÁÁ•ˆ°(€€€€€€‰…•ÍÍ…Ñ”ˆè€ˆÈÀÈØ´ÄÄ´ÈÔˆ°(€€€€€€‰µ•Ñ…‘…Ñ…¡•­•‘Ğˆè€ˆÈÀÈØ´ÄÄ´ÈÔˆ°(€€€€€€‰Í½ÕÉ•Y•É¥™¥…Ñ¥½¹MÑ…ÑÕÌˆè€‰Ù•É¥™¥•ˆ°(€€€€€€‰Á…Ñ¥•¹Ñ%‘•¹Ñ¥™¥…‰±”ˆè™…±Í”°(€€€€€€‰½¹Í•¹Ñ	…Í¥Ìˆè€‰AÕ‰±¥Í¡•	d€Ğ¸À™¥ÕÉ”¸Q¡”Í•±•Ñ•É½À¥Ì±•Í¥½¸µ™½ÕÍ•…¹•á±Õ‘•ÌÑ¡”¥É¥Ì…¹İ¥‘•È™…”¸ˆ°(€€€€€€‰µ½‘¥™¥…Ñ¥½¹Í9½Ñ•Ìˆè€‰‘¥…¹½ÍÑ¥Ì´ÄÌ´ÀÌÔäÀµœÀÀÌ¹Á¹œ°ÁÕ‰±¥Í¡•È¥ÕÉ”€ÌìÍ½ÕÉ”Í¡„ÈÔØ€Ñ”Ù…‘ŒÍ”ÈÁ˜ÀÀäàĞÌÔÙ„İ™ˆÌÌá„ÑŒØÍ…”Ôİ‘”àÌÔÜÔàäÕ„á‘„àĞÈĞĞÅ•……ŒÕìA¥±±½ÜÉ½À±•™Ğ€ÈÌÔ°Ñ½À€ÄàÔ°É¥¡Ğ€ÜÈÔ°‰½ÑÑ½´€ÌØÔ°Í…Ù•)AÅÕ…±¥Ñä€äÈİ¥Ñ¡½ÕĞµ•Ñ…‘…Ñ„ì½ÕÑÁÕĞÍ¡„ÈÔØ€İŒÑˆÑ”ÌØàÌÅÉå•”İ”Ñ™„å•…ÌàÈĞÙ•˜ÕŒàÌÀĞÀàĞÔäÈÕàÈØÕˆÌÌÜÁˆÑŒÀØ¸ˆ(€€€ô°(€€€ì(€€€€€€‰¥ˆè€‰¥µœµœÌÌ´ÀÅˆˆ°(€€€€€€‰ÑåÁ”ˆè€‰‘•Éµ½Í½Áäˆ°(€€€€€€‰ÍÉŒˆè€‰…ÍÍ•ÑÌ½µ•‘¥„½…Í•Ì½…Í”´ÔÜµ‘•Éµ½Í½Áä¹©Áœˆ°(€€€€€€‰‘¥µ•¹Í¥½¹Ìˆèì(€€€€€€€€‰İ¥‘Ñ ˆè€àÌØ°(€€€€€€€€‰¡•¥¡Ğˆè€ØäÌ(€€€€€ô°(€€€€€€‰…±Ğˆè€‰Q¡”±½Í”µÕÀÍ¡½İÌ„Á…±”ÍÑÉÕÑÕÉ•±•ÍÌ…É•„‰•±½ÜÑ¡”É••¹Ñ•È…¹¥¹‘¥ÍÑ¥¹ĞÕÉÙ•Ù•ÍÍ•±ÌÑ¼Ñ¡”É¥¡Ğ¸1…Í¡•Ì…¹Í…±”µ…É­¥¹ÌÉ½ÍÌÑ¡”™¥•±¸ˆ°(€€€€€€‰…ÁÑ¥½¸ˆè€‰Q¡”±½Í”µÕÀÍ¡½İÌ„Á…±”ÍÑÉÕÑÕÉ•±•ÍÌ…É•„‰•±½ÜÑ¡”É••¹Ñ•È…¹¥¹‘¥ÍÑ¥¹ĞÕÉÙ•Ù•ÍÍ•±ÌÑ¼Ñ¡”É¥¡Ğ¸1…Í¡•Ì…¹Í…±”µ…É­¥¹ÌÉ½ÍÌÑ¡”™¥•±¸ˆ°(€€€€€€‰Í½ÕÉ”ˆè€‰¤MÑ•™…¹¤•Ğ…°¸°¥…¹½ÍÑ¥Ì€ÈÀÈÌ°¥ÕÉ”€Ìˆ°(€€€€€€‰Í½ÕÉ•UÉ°ˆè€‰¡ÑÑÁÌè¼½‘½¤¹½Éœ¼ÄÀ¸ÌÌäÀ½‘¥…¹½ÍÑ¥ÌÄÌÈÌÌÔäÀˆ°(€€€€€€‰É•…Ñ½Èˆè€‰±•ÍÍ…¹‘É¼¤MÑ•™…¹¤…¹½…ÕÑ¡½ÉÌˆ°(€€€€€€‰±¥•¹Í”ˆè€‰	d€Ğ¸Àˆ°(€€€€€€‰±¥•¹Í•UÉ°ˆè€‰¡ÑÑÁÌè¼½É•…Ñ¥Ù•½µµ½¹Ì¹½Éœ½±¥•¹Í•Ì½‰ä¼Ğ¸À¼ˆ°(€€€€€€‰…ÑÑÉ¥‰ÕÑ¥½¸ˆè€‰¤MÑ•™…¹¤•Ğ…°¸°¥…¹½ÍÑ¥Ì€ÈÀÈÌ°¥ÕÉ”€Ì°Á…¹•°ˆ¸¡ÑÑÁÌè¼½‘½¤¹½Éœ¼ÄÀ¸ÌÌäÀ½‘¥…¹½ÍÑ¥ÌÄÌÈÌÌÔäÀ¸	d€Ğ¸À¸É½ÁÁ•‰ä½ÕÑ¥Ì¸ˆ°(€€€€€€‰…ÑÑÉ¥‰ÕÑ¥½¹I•ÅÕ¥É•ˆèÑÉÕ”°(€€€€€€‰µ½‘¥™¥…Ñ¥½¹MÑ…ÑÕÌˆè€‰É½ÁÁ•ˆ°(€€€€€€‰…•ÍÍ…Ñ”ˆè€ˆÈÀÈØ´ÄÄ´ÈÔˆ°(€€€€€€‰µ•Ñ…‘…Ñ…¡•­•‘Ğˆè€ˆÈÀÈØ´ÄÄ´ÈÔˆ°(€€€€€€‰Í½ÕÉ•Y•É¥™¥…Ñ¥½¹MÑ…ÑÕÌˆè€‰Ù•É¥™¥•ˆ°(€€€€€€‰Á…Ñ¥•¹Ñ%‘•¹Ñ¥™¥…‰±”ˆè™…±Í”°(€€€€€€‰½¹Í•¹Ñ	…Í¥Ìˆè€‰AÕ‰±¥Í¡•	d€Ğ¸À™¥ÕÉ”¸Q¡”Í•±•Ñ•É½À¥Ì±•Í¥½¸µ™½ÕÍ•…¹•á±Õ‘•ÌÑ¡”¥É¥Ì…¹İ¥‘•È™…”¸ˆ°(€€€€€€‰µ½‘¥™¥…Ñ¥½¹Í9½Ñ•Ìˆè€‰‘¥…¹½ÍÑ¥Ì´ÄÌ´ÀÌÔäÀµœÀÀÌ¹Á¹œ°ÁÕ‰±¥Í¡•È¥ÕÉ”€ÌìÍ½ÕÉ”Í¡„ÈÔØ€Ñ”Ù…‘ŒÍ”ÈÁ˜ÀÀäàĞÌÔÙ„İ™ˆÌÌá„ÑŒØÍ…”Ôİ‘”àÌÔÜÔàäÕ„á‘„àĞÈĞĞÅ•……ŒÕìA¥±±½ÜÉ½À±•™Ğ€ÌÀ°Ñ½À€äàÔ°É¥¡Ğ€àØØ°‰½ÑÑ½´€ÄØÜà°Í…Ù•)AÅÕ…±¥Ñä€äÈİ¥Ñ¡½ÕĞµ•Ñ…‘…Ñ„ì½ÕÑÁÕĞÍ¡„ÈÔØ€àÄÜÀÅ„Í˜Á‰ŒÌØäá‘ÜàÌÕ…˜Í‘•˜ĞÔÈÔÕ”Í••‰‰”Ñ”äÔäÌÈàİ„ÔİÉ…˜Í”ÔÌÜØÀÈÀ¸ˆ(€€€ô(€t°(€€‰‘¥…¹½ÍÑ¥É½Õ¹‘QÉÕÑ ˆèì(€€€€‰½¹™¥Éµ•‘¥…¹½Í¥Ìˆè€‰%¹Ù…Í¥Ù”ÕÑ…¹•½ÕÌÍÅÕ…µ½ÕÌ•±°…É¥¹½µ„ˆ°(€€€€‰½¹™¥Éµ…Ñ¥½¹5•Ñ¡½ˆè€‰¡¥ÍÑ½Á…Ñ¡½±½äˆ°(€€€€‰¡¥ÍÑ½Á…Ñ¡½±½åM½ÕÉ”ˆè€‰™¥ÕÉ•}…ÁÑ¥½¸ˆ°(€€€€‰½¹™¥Éµ…Ñ¥½¹9½Ñ•Ìˆè€‰¤MÑ•™…¹¤•Ğ…°¸±…‰•°Ñ¡”ÕÁÁ•Èµ•å•±¥±•Í¥½¸M¥¸¥ÕÉ”€Ì°ÁÉ½Ù¥‘”¥ÑÌ¡¥ÍÑ½Á…Ñ¡½±½ä¥¸Á…¹•°…¹‘¥ÍÕÍÌ¥¹Ù…Í¥Ù”Mİ¥Ñ ‘¥É•ĞÉ•™•É•¹”Ñ¼Ñ¡¥Ì™¥ÕÉ”¥¸Ñ¡”I•ÍÕ±ÑÌ¸ˆ°(€€€€‰½¹™¥‘•¹•9½Ñ”ˆè€‰1•Í¥½¸µÍÁ•¥™¥Œ±¥¹¥…°°‘•Éµ½Í½Á¥Œ…¹¡¥ÍÑ½Á…Ñ¡½±½¥…°½ÉÉ•±…Ñ¥½¸¥¸Ñ¡”…ÉÑ¥±”¸Q¡”‘•ÁÑ …¹É…‘”…É”¹½ĞÍÑ…Ñ•™½ÈÑ¡¥Ì•á…µÁ±”¸ˆ(€ô°(€€‰½‰Í•ÉÙ…Ñ¥½¹Ìˆèl(€€€ì(€€€€€€‰¥ˆè€‰½‰ÌµœÌÌ´ÀÅ„ˆ°(€€€€€€‰­¥¹ˆè€‰½‰Í•ÉÙ…Ñ¥½¸ˆ°(€€€€€€‰µ½‘…±¥Ñäˆè€‰±¥¹¥…°ˆ°(€€€€€€‰Ñ•áĞˆè€‰É…¥Í•Á¥¹¬±•Í¥½¸Í¥ÑÌ…ĞÑ¡”ÕÁÁ•È•å•±¥µ…É¥¸¸Q¡•É”…É”Íµ…±°É•ÍÕÉ™…”‰É•…­Ì…¹Á…±”å•±±½Üµİ¡¥Ñ”…‘¡•É•¹Ğµ…Ñ•É¥…°¸ˆ(€€€ô°(€€€ì(€€€€€€‰¥ˆè€‰½‰ÌµœÌÌ´ÀÅˆˆ°(€€€€€€‰­¥¹ˆè€‰½‰Í•ÉÙ…Ñ¥½¸ˆ°(€€€€€€‰µ½‘…±¥Ñäˆè€‰‘•Éµ½Í½Áäˆ°(€€€€€€‰Ñ•áĞˆè€‰Q¡”±½Í”µÕÀÍ¡½İÌ„Á…±”ÍÑÉÕÑÕÉ•±•ÍÌ…É•„‰•±½ÜÑ¡”É••¹Ñ•È…¹¥¹‘¥ÍÑ¥¹ĞÕÉÙ•Ù•ÍÍ•±ÌÑ¼Ñ¡”É¥¡Ğ¸1…Í¡•Ì…¹Í…±”µ…É­¥¹ÌÉ½ÍÌÑ¡”™¥•±¸ˆ(€€€ô(€t°(€€‰¥¹Ñ•ÉÁÉ•Ñ…Ñ¥½¹Ìˆèl(€€€ì(€€€€€€‰¥ˆè€‰¥¹ĞµœÌÌ´ÀÄˆ°(€€€€€€‰­¥¹ˆè€‰¥¹Ñ•ÉÁÉ•Ñ…Ñ¥½¸ˆ°(€€€€€€‰É•±…Ñ•‘=‰Í•ÉÙ…Ñ¥½¹%‘Ìˆèl(€€€€€€€€‰½‰ÌµœÌÌ´ÀÅ„ˆ°(€€€€€€€€‰½‰ÌµœÌÌ´ÀÅˆˆ(€€€€€t°(€€€€€€‰Ñ•áĞˆè€‰Q¡”Á…¥É•Ù¥•İÌ…‘‘•Ñ…¥±Ì…‰½ÕĞÑ¡”‘…µ…•ÍÕÉ™…”…¹Ù•ÍÍ•±Ì¸Q¡”‘•ÁÑ ½˜Ñ¡”±•Í¥½¸É•µ…¥¹Ì¥¹‘•Ñ•Éµ¥¹…Ñ”½¸Ñ¡•Í”Ù¥•İÌ¸ˆ(€€€ô(€t°(€€‰‘¥™™•É•¹Ñ¥…±Ìˆèl(€€€ì(€€€€€€‰‘¥…¹½Í¥Ìˆè€‰%¹Ù…Í¥Ù”ÕÑ…¹•½ÕÌÍÅÕ…µ½ÕÌ•±°…É¥¹½µ„ˆ°(€€€€€€‰ÍÕÁÁ½ÉÑ¥¹•…ÑÕÉ•Ìˆèl(€€€€€€€€‰I…¥Í•Á¥¹¬±•Í¥½¸İ¥Ñ ™½…°ÍÕÉ™…”‰É•…­‘½İ¸…¹­•É…Ñ½Ñ¥Œµ…Ñ•É¥…°ˆ(€€€€€t°(€€€€€€‰½¹ÑÉ…‘¥Ñ¥¹•…ÑÕÉ•Ìˆèl(€€€€€€€€‰Q¡”Á¡½Ñ½É…Á¡Ì‘¼¹½ĞÍ¡½Ü‘•ÁÑ ˆ(€€€€€t°(€€€€€€‰Ñ•…¡¥¹¥ÍÑ¥¹Ñ¥½¸ˆè€‰Q¡”Í½ÕÉ”¡¥ÍÑ½Á…Ñ¡½±½äÉ•Í½±Ù•Ñ¡”‘¥ÍÑ¥¹Ñ¥½¸¸ˆ(€€€ô°(€€€ì(€€€€€€‰‘¥…¹½Í¥Ìˆè€‰MÅÕ…µ½ÕÌ•±°…É¥¹½µ„¥¸Í¥ÑÔ€¡	½İ•¸‘¥Í•…Í”¤ˆ°(€€€€€€‰ÍÕÁÁ½ÉÑ¥¹•…ÑÕÉ•Ìˆèl(€€€€€€€€‰A¥¹¬ÍÕÉ™…”İ¥Ñ •É½Í¥½¸…¹ÉÕÍĞ…¸‰”Í••¸¥¸Ñ¡”½µÁ…É¥Í½¸…Í”ˆ(€€€€€t°(€€€€€€‰½¹ÑÉ…‘¥Ñ¥¹•…ÑÕÉ•Ìˆèl(€€€€€€€€‰Q¡”…ÁÁ•…É…¹”…¹¹½ĞÍ•ÑÑ±”İ¡•Ñ¡•ÈÑ¡•É”¥Ì‘•Éµ…°¥¹Ù…Í¥½¸ˆ(€€€€€t°(€€€€€€‰Ñ•…¡¥¹¥ÍÑ¥¹Ñ¥½¸ˆè€‰½µÁ…É”Ñ¡”ÍÕÉ™…”‰•™½É”É•±å¥¹œ½¸Ñ¡”¡¥ÍÑ½Á…Ñ¡½±½äÉ•ÍÕ±Ğ¸ˆ(€€€ô°(€€€ì(€€€€€€‰‘¥…¹½Í¥Ìˆè€‰Ñ¥¹¥Œ­•É…Ñ½Í¥Ìˆ°(€€€€€€‰ÍÕÁÁ½ÉÑ¥¹•…ÑÕÉ•Ìˆèl(€€€€€€€€‰‘¡•É•¹ĞÁ…±”ÍÕÉ™…”µ…Ñ•É¥…°ÍÕ•ÍÑÌ­•É…Ñ¥¹¥é…Ñ¥½¸ˆ(€€€€€t°(€€€€€€‰½¹ÑÉ…‘¥Ñ¥¹•…ÑÕÉ•Ìˆèl(€€€€€€€€‰Q¡”É…¥Í•°•É½‘•µ½ÉÁ¡½±½ä‘¥™™•ÉÌ™É½´Ñ¡”Á…¥É•¡••¬½µÁ…É¥Í½¸ˆ(€€€€€t°(€€€€€€‰Ñ•…¡¥¹¥ÍÑ¥¹Ñ¥½¸ˆè€‰Q¡”½µÁ…É¥Í½¸¥±±ÕÍÑÉ…Ñ•ÌÑİ¼…ÁÁ•…É…¹•Ì¸%Ğ‘½•Ì¹½ĞÑÕÉ¸Ñ¡”Ù¥Í¥‰±”‘¥™™•É•¹•Ì¥¹Ñ¼…¸•á±ÕÍ¥½¸ÉÕ±”¸ˆ(€€€ô(€t°(€€‰Ñ•…¡¥¹A½¥¹ÑÌˆèl(€€€ì(€€€€€€‰¥ˆè€‰ÑÀµœÌÌ´ÀÅ„ˆ°(€€€€€€‰Ñ¥Ñ±”ˆè€‰•ÍÉ¥‰”İ¡…Ğ¡…¹•Ì¥¸Ñ¡”±½Í•ÈÙ¥•Üˆ°(€€€€€€‰Ñ•áĞˆè€‰1½…Ñ”Ñ¡”Á…±”…É•„…¹ÍÕÉ™…”‰É•…¬¸-••ÀÑ¡”±…Í¡•Ì…¹ÉÕ±•Èµ…É­Ì½ÕĞ½˜Ñ¡”±•Í¥½¸‘•ÍÉ¥ÁÑ¥½¸¸ˆ(€€€ô°(€€€ì(€€€€€€‰¥ˆè€‰ÑÀµœÌÌ´ÀÅˆˆ°(€€€€€€‰Ñ¥Ñ±”ˆè€‰I•Í½±Ù”Õ¹•ÉÑ…¥¹Ñäİ¥Ñ Ñ¡”Í½ÕÉ”•Ù¥‘•¹”ˆ°(€€€€€€‰Ñ•áĞˆè€‰Q¡”…ÉÑ¥±”Í¡½İÌ¡¥ÍÑ½Á…Ñ¡½±½ä™½ÈÑ¡¥Ì•á…Ğ±•Í¥½¸¸9•¥Ñ¡•È±¥¹¥…°¥µ…”Í¡½İÌÑ¡”¥¹Ù…Í¥½¸‘•ÁÑ ¸ˆ(€€€ô(€t°(€€‰±½Í•ÍÑ5¥µ¥Œˆèì(€€€€‰¹…µ”ˆè€‰MÅÕ…µ½ÕÌ•±°…É¥¹½µ„¥¸Í¥ÑÔ€¡	½İ•¸‘¥Í•…Í”¤ˆ°(€€€€‰İ¡å±½Í•ÍĞˆè€‰Q¡”Ñİ¼…Í”¥µ…•ÌÍ¡…É”ÍÕÉ™…”‘…µ…”½¸„Á¥¹¬‰…­É½Õ¹¸Q¡•¥ÈÍ½ÕÉ•ÌÉ•Á½ÉĞ‘¥™™•É•¹ĞÁ…Ñ¡½±½ä¸ˆ(€ô°(€€‰Á…¥É•‘5½‘…±¥Ñäˆèì(€€€€‰±¥¹¥…±=‰Í•ÉÙ…Ñ¥½¸ˆè€‰É…¥Í•Á¥¹¬±•Í¥½¸Í¥ÑÌ…ĞÑ¡”ÕÁÁ•È•å•±¥µ…É¥¸¸Q¡•É”…É”Íµ…±°É•ÍÕÉ™…”‰É•…­Ì…¹Á…±”å•±±½Üµİ¡¥Ñ”…‘¡•É•¹Ğµ…Ñ•É¥…°¸ˆ°(€€€€‰‘•Éµ½Í½Á¥=‰Í•ÉÙ…Ñ¥½¸ˆè€‰Q¡”±½Í”µÕÀÍ¡½İÌ„Á…±”ÍÑÉÕÑÕÉ•±•ÍÌ…É•„‰•±½ÜÑ¡”É••¹Ñ•È…¹¥¹‘¥ÍÑ¥¹ĞÕÉÙ•Ù•ÍÍ•±ÌÑ¼Ñ¡”É¥¡Ğ¸1…Í¡•Ì…¹Í…±”µ…É­¥¹ÌÉ½ÍÌÑ¡”™¥•±¸ˆ°(€€€€‰…‘‘•‘Y…±Õ”ˆè€‰Q¡”Í•½¹Ù¥•ÜÍ¡½İÌÑ¡”Á…±”…É•„°ÍÕÉ™…”‰É•…¬…¹Ù•ÍÍ•°½¹Ñ½ÕÉÌ…Ğ¡¥¡•Èµ…¹¥™¥…Ñ¥½¸¸ˆ°(€€€€‰É•…Í½¹¥¹%µÁ…Ğˆè€‰Q¡”±½Í”Ù¥•ÜÉ•™¥¹•ÌÑ¡”ÍÕÉ™…”‘•ÍÉ¥ÁÑ¥½¸ì‘•ÁÑ É•µ…¥¹ÌÕ¹•ÉÑ…¥¸¸ˆ°(€€€€‰±¥µ¥ÑÌˆè€‰Q¡”±¥¹¥…°É½ÀÍ¡½İÌÑ¡”±•Í¥½¸µ…É¥¸…¹ÍÕÉÉ½Õ¹‘¥¹œ±¥½¹±ä¸A…±Á…Ñ¥½¸°•Ù½±ÕÑ¥½¸…¹¡¥ÍÑ½±½¥…°‘•ÁÑ …É”Õ¹…Ù…¥±…‰±”¥¸Ñ¡”±•…É¹¥¹œÙ¥•Ü¸ˆ°(€€€€‰¥¹™½Éµ…Ñ¥½¹…¥¸ˆè€‰‘•Éµ½Í½Áå}…‘‘Í}ÍÕÁÁ½ÉĞˆ°(€€€€‰¥¹™½Éµ…Ñ¥½¹…¥¹9½Ñ”ˆè€‰Q¡”±½Í•ÈÙ¥•Ü…‘‘Ì‘•Ñ…¥°…‰½ÕĞÑ¡”ÍÕÉ™…”‰É•…¬°Á…±”ÍÑÉÕÑÕÉ•±•ÍÌ…É•„…¹ÕÉÙ•Ù•ÍÍ•±Ì¸%Ğ‘½•Ì¹½ĞÍ¡½ÜÑ¡”¥¹Ù…Í¥½¸‘•ÁÑ ¸ˆ°(€€€€‰½µÁ…É¥Í½¸ˆèì(€€€€€€‰±¥¹¥…±±Õ”ˆè€‰I…¥Í•Á¥¹¬•å•±¥±•Í¥½¸İ¥Ñ …‘¡•É•¹ĞÁ…±”µ…Ñ•É¥…°¸ˆ°(€€€€€€‰‘•Éµ½Í½Á¥±Õ”ˆè€‰A…±”ÍÑÉÕÑÕÉ•±•ÍÌ…É•„…¹¥¹‘¥ÍÑ¥¹ĞÕÉÙ•Ù•ÍÍ•±Ì¸ˆ°(€€€€€€‰…‘‘•‘%¹™½Éµ…Ñ¥½¸ˆè€‰Q¡”±½Í”Ù¥•ÜÉ•Í½±Ù•Ì™¥¹•ÈÍÕÉ™…”…¹Ù•ÍÍ•°‘•Ñ…¥°¸ˆ°(€€€€€€‰‘¥…¹½ÍÑ¥½¹™±¥Ğˆè€‰M¥µ¥±…ÈÍÕÉ™…”‘…µ…”…¸½ÕÈ¥¸Ñ¡”¥¸µÍ¥ÑÔ½µÁ…É¥Í½¸¸ˆ°(€€€€€€‰Ñ•…¡¥¹IÕ±”ˆè€‰¥ÍÑ¥¹Õ¥Í Ñ¡”Ù¥Í¥‰±”±Õ•Ì™É½´İ¡…ĞÑ¡”Í½ÕÉ”¡¥ÍÑ½Á…Ñ¡½±½ä•ÍÑ…‰±¥Í¡•¸ˆ(€€€ô(€ô°(€€‰µ½‘…±¥Ñå%¹Ñ•É…Ñ¥½¸ˆè€‰Q¡”±¥¹¥…°É½ÀÍ¡½İÌÑ¡”É…¥Í••å•±¥±•Í¥½¸…¹‘…µ…•ÍÕÉ™…”¸Q¡”½ÉÉ•ÍÁ½¹‘¥¹œ‘•Éµ½Í½Á¥ŒÙ¥•ÜÉ•Í½±Ù•ÌÑ¡”Á…±”…É•„…¹ÕÉÙ•Ù•ÍÍ•±Ì¸ˆ°(€€‰‘¥ÍÁ½Í¥Ñ¥½¹Q•…¡¥¹œˆèì(€€€€‰ÍÕµµ…Éäˆè€‰Q¡”ÍÑÕ‘äÕÍ•¡¥ÍÑ½Á…Ñ¡½±½äÑ¼•ÍÑ…‰±¥Í Ñ¡”±•Í¥½¸‘¥…¹½Í¥Ì¸Q¡”±¥¹¥…°…¹‘•Éµ½Í½Á¥Œ¥µ…•ÌÍÕÁÁ½ÉÑ•…ÍÍ•ÍÍµ•¹Ğ½˜Ñ¡”Ù¥Í¥‰±”µ½ÉÁ¡½±½ä¸ˆ°(€€€€‰½ÁÑ¥½¹Ìˆèl(€€€€€ì(€€€€€€€€‰¥ˆè€‰‰¥½ÁÍäµ•á¥Í¥½¸µ½¹Í¥‘•É…Ñ¥½¸ˆ°(€€€€€€€€‰±…‰•°ˆè€‰	¥½ÁÍä½È•á¥Í¥½¸½¹Í¥‘•É…Ñ¥½¸ˆ°(€€€€€€€€‰É…Ñ¥½¹…±”ˆè€‰Q¡”Ñ¥ÍÍÕ”É•ÍÕ±Ğ¥¸¥ÕÉ”€ÌÉ•Í½±Ù•Ñ¡”±•Í¥½¸‘¥…¹½Í¥Ì…¹¥Ì…Ù…¥±…‰±”¥¸Ñ¡”Í½ÕÉ”¸ˆ(€€€€€ô(€€€t°(€€€€‰ÁÉ•™•ÉÉ•‘‘Õ…Ñ¥½¹…±%ˆè€‰‰¥½ÁÍäµ•á¥Í¥½¸µ½¹Í¥‘•É…Ñ¥½¸ˆ°(€€€€‰Í½ÕÉ•9½Ñ”ˆè€‰¤MÑ•™…¹¤•Ğ…°¸°¥ÕÉ”€Ì…¹I•ÍÕ±ÑÌ¸ˆ°(€€€€‰±¥µ¥Ñ…Ñ¥½¸ˆè€‰‘Õ…Ñ¥½¹…°…½Õ¹Ğ½˜½¹”ÁÕ‰±¥Í¡•…Í”¸9¼¥¹‘¥Ù¥‘Õ…°µ…¹…•µ•¹ĞÉ•½µµ•¹‘…Ñ¥½¸¸ˆ(€ô°(€€‰½µÁ…É•]¥Ñ ˆèl(€€€€‰µÀµ¥¹Ù…Í¥Ù”µÍŒµ‰½İ•¸µ•É½Í¥½¸ˆ°(€€€€‰µÀµ¥¹Ù…Í¥Ù”µÍŒµÁ…¬µÍÕÉ™…”ˆ(€t°(€€‰É•½É‘•‘MÉ••¹¥¹•¥Í¥½¸ˆè¹Õ±°°(€€‰Á…ÑÑ•É¹Ìˆèmt°(€€‰…¹¹½Ñ…Ñ¥½¹Ìˆèmt°(€€‰‘•Éµ½Í½Á¥•…ÑÕÉ•Ìˆèmt°(€€‰±½…±¥é…Ñ¥½¸ˆè¹Õ±°°(€€‰É•Ù¥•İMÑ…ÑÕÌˆè€‰±¥¹¥¥…¸É•Ù¥•ÜÉ•ÅÕ¥É•ˆ°(€€‰±¥¹¥…±I•Ù¥•Üˆè¹Õ±°)ô)€((ğ½‘•Ñ…¥±Ìø((´Y•É‘¥Ğè(´I•Ù¥•İ•Í•Ñ¥½¹Ìè(´Ù¥‘•¹”Í½ÕÉ•Ì…ÑÕ…±±ä¡•­•è(´ÁÁÉ½Ù••á…ĞÉ•Á±…•µ•¹Ğİ½É‘¥¹œ€¡¥˜…¹ä¤è(´I•ÅÕ¥É•½ÉÉ•Ñ¥½¹Ì€¼É•©•Ñ•±…¥µÌè(´AÕ‰±¥ŒÉ•Ù¥•İ•È¹½Ñ•Ìè((ŒŒ5…¥¹Ñ…¥¹•È™¥¹…°µ™¥¹•ÉÁÉ¥¹Ğ½¹™¥Éµ…Ñ¥½¸()™Ñ•È…ÁÁÉ½Ù•½ÉÉ•Ñ¥½¹Ì…É”…ÁÁ±¥•°É••¹•É…Ñ”Ñ¡¥ÌÁ…­•Ğ…¹É•ÑÕÉ¸Ñ¡”™¥¹…°™¥¹•ÉÁÉ¥¹Ğ±¥ÍĞÑ¼Ñ¡”É•Ù¥•İ•È¸‘•¥Í¥½¸½Ù•È„ÁÉ”µ½ÉÉ•Ñ¥½¸™¥¹•ÉÁÉ¥¹Ğ…¹¹½Ğ‰”É•ÕÍ•™½Èµ½‘¥™¥•½¹Ñ•¹ĞÕ¹±•ÍÌÑ¡”É•Ù¥•İ•È•áÁ±¥¥Ñ±ä…ÁÁÉ½Ù•Ñ¡…Ğ•á…ĞÉ•Á±…•µ•¹Ğİ½É‘¥¹œ…¹½¹™¥ÉµÌÑ¡”É•ÍÕ±Ñ¥¹œ™¥¹…°™¥¹•ÉÁÉ¥¹Ğ¸(