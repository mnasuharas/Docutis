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
  "differential": "SCC in situ / Bowen disease, invasive cutaneous SCC, seborrhoeic keratosis, superficial BCC, inflammatory dermatoses, solar lentigo and — especially for pigmented facial lesions — lentigo maligna.",
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
        "distinguishingClue": "Induration, ulceration, spontaneous bleeding, rapid growth or treatment resistance — biopsy rather than blind destruction."
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
                  "precautions": "Generally for non-hyperkeratotic/non-hypertrophic (Olsen I–II) AK of face/ears/scalp per German/EU labeling; expect inflammatory local skin reactions; wash hands after application.",
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
                  "dose": "Thin layer covering lesions; German Fachinformation limits total treated area to a maximum of 500 cm² at one time — treat larger areas sequentially",
                  "frequency": "Twice daily",
                  "duration": "About 2–4 weeks until an inflammatory/erosive response is reached; healing may continue after stopping",
                  "contraindications": "Pregnancy and breastfeeding; DPD deficiency; brivudine/sorivudine interaction — same fluoropyrimidine warnings as other 5-FU topicals.",
                  "precautions": "Product-specific maximum area 500 cm² per current German Fachinformation; inflammatory local reactions are expected; do not extrapolate the 4% schedule to 5%.",
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
                  "dose": "Apply to affected area; total treated skin must not exceed 25 cm² (5×5 cm)",
                  "frequency": "Once daily",
                  "duration": "Until clearance or up to 12 weeks; reduce frequency if severe local reactions",
                  "contraindications": "Contraindicated during pregnancy and breastfeeding, in patients with renal insufficiency, and in patients with hypersensitivity to fluorouracil, salicylic acid or any excipient. Actikerall must not be used concomitantly with brivudine, sorivudine or their analogues; a minimum interval of four weeks must be observed between treatment with these antiviral nucleoside analogues and fluorouracil.",
                  "precautions": "Mild to moderately hyperkeratotic Olsen I–II AK in immunocompetent adults per German/EU PI; application precautions and occlusion/removal of film as labeled; max 25 cm² remains supported.",
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
                  "dose": "Thin layer to contiguous treatment field on face or balding scalp; one sachet is the usual maximum per application (~25 cm² guidance in labeling)",
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
                  "duration": "2 weeks on, 2 weeks off, then another 2-week course — keep separate from the 5% schedule",
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
                  "dose": "Thin layer to a contiguous field of up to 25 cm² on face or scalp (German/EU maximum — do not apply the larger US-labeled maximum field size)",
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
                  "dose": "About 0.5 g (pea-sized) per 5×5 cm area; German Fachinformation maximum 8 g/day (up to about 200 cm²)",
                  "frequency": "Twice daily",
                  "duration": "60–90 days per product information",
                  "contraindications": "NSAID hypersensitivity / NSAID-triggered asthma, urticaria or acute rhinitis; third trimester of pregnancy.",
                  "precautions": "Avoid NSAID-sensitive patients; use caution earlier in pregnancy; photosensitivity counseling as labeled.",
                  "monitoring": "Local tolerance and clinical response; complete healing may lag treatment end by up to ~30 days.",
                  "pregnancy": "Contraindicated in the third trimester; avoid earlier unless justified — verify current label.",
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
              "details": "Appropriate for selected Olsen I–III lesions when invasion has been excluded clinically. No universal freeze time: individualize. Guideline ranges may include 1–2 freeze–thaw cycles of about 15–60 seconds, but this is not mandatory for every lesion. Adverse effects: pain, blistering, erosion, pigment change, scarring, alopecia on hair-bearing skin, delayed healing. Suspicious thick, indurated, ulcerated or rapidly growing lesions need histology — not blind destruction.",
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
              "details": "Conventional red-light ALA/MAL PDT, daylight PDT, or simulated daylight where appropriate. Useful for single, multiple or field treatment, especially non-pigmented Olsen I–II face/scalp disease; pretreat hyperkeratotic lesions when needed. Conventional PDT is typically more painful; daylight PDT is often better tolerated. Assess response at about 3 months and repeat per protocol.",
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
      "Expected local skin reactions to topical field therapy are common and treatment-specific — they are not ignored red flags for invasion.",
      "Actinic cheilitis of the lip is related but distinct; persistent lip erosions need separate assessment.",
      "For suspected occupational natural UV causation, assess BK 5103 separately: multiple AK means more than 5 AK within 12 months or field cancerization greater than 4 cm² on occupationally exposed skin; statutory reporting applies when suspicion is justified — not automatic for every AK patient."
    ],
    "specialPopulations": [
      {
        "population": "pregnancy",
        "note": "Prefer non-systemically absorbed procedural options when treatment cannot wait; topical fluoropyrimidines and diclofenac (especially third trimester) have label restrictions — verify current Fachinformation."
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
      "title": "S3 guideline: actinic keratosis and cutaneous squamous cell carcinoma — update 2023, part 1: treatment of actinic keratosis, actinic cheilitis, Bowen disease, occupational disease and structures of care",
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
      "title": "S3-Leitlinie Prävention von Hautkrebs",
      "organization": "Leitlinienprogramm Onkologie / AWMF",
      "type": "guideline",
      "year": 2021,
      "version": "2.1; AWMF 032/052OL",
      "url": "https://register.awmf.org/assets/guidelines/032-052OLl_S3_Praevention-Hautkrebs_2021-09.pdf",
      "doi": null,
      "metadataCheckedAt": "2026-09-23"
    },
    {
      "title": "ICD-10-GM Version 2026 — L57.0 Aktinische Keratose",
      "organization": "BfArM",
      "type": "official classification",
      "year": 2026,
      "version": "2026",
      "url": "https://klassifikationen.bfarm.de/icd-10-gm/kode-suche/htmlgm2026/block-l55-l59.htm",
      "doi": null,
      "metadataCheckedAt": "2026-09-20"
    },
    {
      "title": "BK 5103 — Squamous cell carcinomas or multiple actinic keratoses of the skin caused by natural UV radiation",
      "organization": "DGUV",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://www.dguv.de/bk-info/icd-10-kapitel/kapitel_12/bk5103/index.jsp",
      "doi": null,
      "metadataCheckedAt": "2026-09-20"
    },
    {
      "title": "Tolak 40 mg/g Creme — Fachinformation",
      "organization": "Fachinfo-Service / German product information",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://www.fachinfo.de/fi/pdf/022967/tolak-r-40-mg-g-creme",
      "doi": null,
      "metadataCheckedAt": "2026-09-23"
    },
    {
      "title": "Efudix 5% cream — German Fachinformation",
      "organization": "German product information",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://www.fachinfo.de/fi/detail/003786/efudix-r-5-creme",
      "doi": null,
      "metadataCheckedAt": "2026-09-20"
    },
    {
      "title": "Actikerall 5 mg/g + 100 mg/g Lösung zur Anwendung auf der Haut — Fachinformation",
      "organization": "Fachinfo-Service / Almirall Hermal GmbH / German product information",
      "type": "clinical reference",
      "year": null,
      "version": "January 2023",
      "url": "https://www.fachinfo.de/fi/pdf/013084/actikerall-5-mg-g-100-mg-g-loesung-zur-anwendung-auf-der-haut",
      "doi": null,
      "metadataCheckedAt": "2026-09-23"
    },
    {
      "title": "Aldara 5% cream — EPAR Product Information",
      "organization": "European Medicines Agency",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/aldara",
      "doi": null,
      "metadataCheckedAt": "2026-09-20"
    },
    {
      "title": "Zyclara 3.75% cream — EPAR Product Information",
      "organization": "European Medicines Agency",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/zyclara",
      "doi": null,
      "metadataCheckedAt": "2026-09-20"
    },
    {
      "title": "Klisyri 10 mg/g ointment (tirbanibulin) — German Fachinformation / EU product information",
      "organization": "German product information / EMA",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://www.fachinfo.de/fi/detail/23428/Klisyri-10-mg-g-Salbe",
      "doi": null,
      "metadataCheckedAt": "2026-09-20"
    },
    {
      "title": "Solaraze 3% gel — German Fachinformation",
      "organization": "German product information",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://www.fachinfo.de/fi/pdf/007858/solaraze-3-gel",
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

- **Exact fingerprint:** `sha256-v1:fbc2b272331822060c656dd0680da07e9131ecd3f59f071a71273748f14ad65f`
- **Schema version:** 1
- **Reviewable sections:** `overview`, `clinical-presentation`, `diagnostics`, `dermoscopy`, `differential-diagnosis`, `treatment`, `follow-up`, `coding`, `references`, `histopathology`, `red-flags`, `referral`, `patient-safety`, `oncology`
- **Mapped evidence sources:**
  - https://dermnetnz.org/topics/basal-cell-carcinoma
  - https://icd.who.int/browse10/2019/en
  - https://klassifikationen.bfarm.de/icd-10-gm/kode-suche/htmlgm2026/block-c43-c44.htm
  - https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf
  - https://whobluebooks.iarc.who.int/structures/skintumours/
  - https://www.aad.org/member/clinical-quality/guidelines/bcc
  - https://www.dguv.de/bk-info/icd-10-kapitel/kapitel_12/bk5103/index.jsp
  - https://www.ema.europa.eu/en/medicines/human/EPAR/ameluz
  - https://www.ema.europa.eu/en/medicines/human/EPAR/erivedge
  - https://www.ema.europa.eu/en/medicines/human/EPAR/libtayo
  - https://www.ema.europa.eu/en/medicines/human/EPAR/odomzo
  - https://www.fachinfo.de/fi/detail/003786/efudix-r-5-creme
  - https://www.fachinfo.de/fi/detail/007185/metvix-r-160-mg-g-creme
  - https://www.fachinfo.de/fi/pdf/003976
  - https://www.who.int/standards/classifications/other-classifications/international-classification-of-diseases-for-oncology
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
        "note": "Assign the anatomic fourth character only when the primary skin site is adequately documented. WHO ICD-10 does not replace ICD-10-GM for German clinical documentation."
      },
      {
        "system": "ICD-10-GM",
        "version": "2026",
        "code": "C44.0",
        "label": "Lippenhaut",
        "note": "Do not auto-map every “lip” mention to C44.0; distinguish Lippenhaut from vermilion / C00.-. Prefer coding uncertainty over fabricated specificity."
      },
      {
        "system": "ICD-10-GM",
        "version": "2026",
        "code": "C44.1",
        "label": "Haut des Augenlides, einschließlich Kanthus",
        "note": null
      },
      {
        "system": "ICD-10-GM",
        "version": "2026",
        "code": "C44.2",
        "label": "Haut des Ohres und des äußeren Gehörganges",
        "note": null
      },
      {
        "system": "ICD-10-GM",
        "version": "2026",
        "code": "C44.3",
        "label": "Haut sonstiger und nicht näher bezeichneter Teile des Gesichtes",
        "note": null
      },
      {
        "system": "ICD-10-GM",
        "version": "2026",
        "code": "C44.4",
        "label": "Behaarte Kopfhaut und Haut des Halses",
        "note": null
      },
      {
        "system": "ICD-10-GM",
        "version": "2026",
        "code": "C44.50",
        "label": "Perianalhaut",
        "note": "Trunk fifth character is mandatory. Never emit incomplete C44.5."
      },
      {
        "system": "ICD-10-GM",
        "version": "2026",
        "code": "C44.59",
        "label": "Haut sonstiger und nicht näher bezeichneter Teile des Rumpfes",
        "note": "Use for other/unspecified trunk skin when documented; never emit incomplete C44.5."
      },
      {
        "system": "ICD-10-GM",
        "version": "2026",
        "code": "C44.6",
        "label": "Haut der oberen Extremität, einschließlich Schulter",
        "note": null
      },
      {
        "system": "ICD-10-GM",
        "version": "2026",
        "code": "C44.7",
        "label": "Haut der unteren Extremität, einschließlich Hüfte",
        "note": null
      },
      {
        "system": "ICD-10-GM",
        "version": "2026",
        "code": "C44.8",
        "label": "Haut, mehrere Teilbereiche überlappend",
        "note": "Only for genuine overlapping skin regions as defined by ICD-10-GM."
      },
      {
        "system": "ICD-10-GM",
        "version": "2026",
        "code": "C44.9",
        "label": "Bösartige Neubildung der Haut, nicht näher bezeichnet",
        "note": "Use only when site documentation supports an unspecified code; do not invent specificity."
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
          "note": "Use only when BCC NOS is documented on final pathology; do not auto-assign subtype morphology from clinical appearance or dermoscopy."
        }
      ]
    },
    "icdoApplicability": "applicable",
    "verificationNote": "Fail-closed anatomical mapping: prefer uncertainty over fabricated site specificity. Never emit incomplete C44.5 — use C44.50 or C44.59. Distinguish Lippenhaut (C44.0) from vermilion/lip mucosa coded under C00.- when applicable; ambiguous lip documentation should flag coding uncertainty. Genital skin may belong outside C44 when ICD-10-GM assigns genital-organ categories. Keep WHO ICD-10, ICD-10-GM and ICD-O separate. Basal cell carcinoma is not included in the current BK 5103 disease definition. BK 5103 covers cutaneous squamous cell carcinoma and multiple actinic keratoses caused by occupational exposure to natural UV radiation. Do not classify an ordinary BCC as BK 5103. Occupational UV may be clinically relevant to BCC risk but does not make ordinary BCC a BK 5103 diagnosis."
  },
  "description": "Basal cell carcinoma (BCC) is a malignant epithelial skin tumour with locally infiltrative and destructive growth; metastasis is very rare.",
  "clinical": "Clinical morphology is variable. Nodular BCC typically presents as a skin-coloured to erythematous pearly papule or nodule with telangiectasia and may ulcerate centrally. Superficial BCC usually presents as an erythematous macule or thin plaque, sometimes with erosion or bleeding. Morphoeic/sclerodermiform BCC may appear as a whitish, atrophic or scar-like, poorly defined plaque; pigmented variants also occur. Clinical appearance alone does not reliably predict histologic subtype.",
  "dermoscopy": "Dermoscopy can increase diagnostic confidence but does not replace histopathology or margin assessment. Supportive findings include arborising vessels and/or short fine telangiectasias, blue-grey ovoid nests, multiple blue-grey globules or dots, maple leaf–like areas, spoke-wheel/concentric structures, ulceration or erosions, shiny white-red structureless areas and white streaks (chrysalis). Absence of a pigment network is supportive but not absolute. Patterns differ by subtype (nodular, superficial, pigmented, morphoeic). Dermoscopic or clinical ulceration alone is not an S2k Table 2 high recurrence-risk criterion.",
  "differential": "Cutaneous squamous cell carcinoma, keratoacanthoma, squamous cell carcinoma in situ/Bowen disease, actinic keratosis, sebaceous hyperplasia, intradermal nevus, seborrhoeic keratosis, melanoma (especially pigmented BCC), dermatofibroma/scar (morphoeic BCC), and inflammatory dermatoses (superficial BCC).",
  "treatment": "German S2k recurrence-risk stratification informs modality selection and must remain separate from incomplete (R1) excision, locally advanced BCC (laBCC/lfBZK) and metastatic BCC (mBCC). Complete surgical removal with histologic margin assessment is first-line for most BCC: low recurrence-risk tumours use conventional excision with a 3–5 mm peripheral safety margin; high recurrence-risk and recurrent BCC prefer microscopically controlled surgery (MCS) when available, otherwise conventional margins >5 mm. Selected nonsurgical modalities (imiquimod, 5-fluorouracil, ALA/MAL PDT, radiotherapy, limited destructive options) apply only under product-specific labeling and guideline place-in-therapy constraints and are not interchangeable with complete surgical excision. Locally advanced or metastatic disease requires multidisciplinary assessment with product-specific systemic options.",
  "followup": "Follow-up is risk-adapted according to the German S2k guideline and includes surveillance for local recurrence and additional primary skin cancers. German interval details are provided by the dedicated jurisdiction-specific BCC follow-up protocol. Patients should be counselled on regular skin self-examination and UV protection, with particular emphasis on patients with BCC syndromes or chronic immunosuppression. New, recurrent, non-healing, enlarging, bleeding or otherwise suspicious lesions should prompt clinical reassessment.",
  "clinicalProfile": {
    "schemaVersion": 1,
    "aliases": [
      "BCC"
    ],
    "etiology": {
      "mechanisms": [
        "neoplastic",
        "uv-associated"
      ],
      "text": "Malignant epithelial skin tumour with locally infiltrative and destructive growth; metastasis is very rare. Chronic UV exposure is the dominant clinical context; syndromic and immunosuppressed settings increase additional primary tumour burden."
    },
    "presentation": {
      "morphology": {
        "primaryLesions": [
          "macule",
          "papule",
          "plaque",
          "nodule"
        ],
        "secondaryChanges": [
          "erosion",
          "ulcer",
          "crust",
          "atrophy",
          "scar"
        ],
        "colors": [
          "skin-coloured",
          "erythematous",
          "pearly",
          "whitish",
          "pigmented variant possible"
        ],
        "surface": [
          "telangiectatic",
          "atrophic",
          "scar-like"
        ],
        "border": [
          "well-defined or poorly defined depending on subtype"
        ],
        "text": "Nodular: pearly papule/nodule with telangiectasia, possible central ulceration. Superficial: erythematous macule/thin plaque with possible erosion or bleeding. Morphoeic/sclerodermiform: whitish, atrophic or scar-like poorly defined plaque. Pigmented variants occur. Clinical appearance alone does not reliably predict histologic subtype."
      },
      "localization": {
        "sites": [
          "face",
          "scalp",
          "trunk",
          "upper-extremities",
          "lower-extremities",
          "sun-exposed-skin",
          "anogenital"
        ],
        "distribution": [
          "localized"
        ],
        "text": "Most often on chronically UV-exposed skin including the face and other sun-exposed sites; can occur elsewhere. Genitalia, hands and feet are H-zone anatomic contexts in S2k Table 2."
      },
      "symptoms": {
        "values": [
          "asymptomatic",
          "bleeding",
          "tender"
        ],
        "text": "Often asymptomatic; bleeding, erosion or tenderness may occur with ulcerated or traumatised lesions."
      },
      "course": {
        "values": [
          "chronic",
          "progressive"
        ],
        "text": "Typically slowly enlarging with locally destructive potential; metastasis is very rare."
      }
    },
    "dermoscopy": {
      "patterns": [
        "nodular BCC pattern",
        "superficial BCC pattern",
        "pigmented BCC pattern",
        "morphoeic BCC pattern"
      ],
      "vascularStructures": [
        "arborising vessels",
        "short fine telangiectasias"
      ],
      "pigmentStructures": [
        "blue-grey ovoid nests",
        "multiple blue-grey globules or dots",
        "maple leaf–like areas",
        "spoke-wheel/concentric structures"
      ],
      "scaleKeratinClues": [
        "ulceration or erosions (dermoscopic finding)",
        "shiny white-red structureless areas",
        "white streaks / chrysalis"
      ],
      "highRiskClues": [
        "features suggesting melanoma in pigmented lesions require clinicopathologic correlation",
        "dermoscopic or clinical ulceration is a supportive dermoscopic finding only and is NOT an S2k Table 2 high recurrence-risk criterion by itself"
      ],
      "text": "Dermoscopy increases diagnostic confidence but does not replace histopathology or margin assessment. Absence of a pigment network is supportive but not absolute."
    },
    "diagnostics": [
      {
        "method": "clinical-examination",
        "role": "routine",
        "indication": "Establish clinical suspicion together with dermoscopy; assess site, size, borders, recurrence status and operability.",
        "sourceUrls": [
          "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf"
        ]
      },
      {
        "method": "dermoscopy",
        "role": "routine",
        "indication": "Support clinical suspicion; does not replace histopathology or margin assessment.",
        "sourceUrls": [
          "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf",
          "https://dermnetnz.org/topics/basal-cell-carcinoma"
        ]
      },
      {
        "method": "biopsy",
        "role": "unclear-cases",
        "indication": "A separate pre-treatment biopsy is not required in every clinically typical, readily excisable BCC when definitive excision will provide adequate tissue for diagnosis and margin assessment. Pre-treatment biopsy is particularly appropriate when the diagnosis is uncertain, before nonsurgical treatment when histologic subtype or other tumour characteristics may influence treatment selection, and in large, recurrent, poorly defined or otherwise high-risk tumours where treatment planning depends on histologic information.",
        "sourceUrls": [
          "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf"
        ]
      },
      {
        "method": "histopathology",
        "role": "confirmatory",
        "indication": "Histopathologic confirmation should be obtained according to tumour size, clinical context and intended treatment, using biopsy and/or the definitive excision specimen. The pathology report should document histologic subtype and other treatment- or risk-relevant findings when assessable.",
        "sourceUrls": [
          "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf"
        ]
      },
      {
        "method": "imaging",
        "role": "staging",
        "indication": "Cross-sectional imaging is not routine for uncomplicated BCC. Consider imaging when locally advanced disease, deep soft-tissue extension, clinically relevant perineural spread, orbital involvement, bone involvement or metastatic disease is suspected.",
        "sourceUrls": [
          "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf"
        ]
      }
    ],
    "histopathology": "The pathology report should document the histologic subtype and other treatment- or risk-relevant findings when assessable. Partial biopsy specimens may under-represent heterogeneous or aggressive tumour components and may fail to demonstrate the full extent of infiltration or perineural involvement. Clinicopathologic discordance should prompt reassessment and, when clinically appropriate, additional sampling or definitive excision. Do not auto-assign ICD-O subtype morphology from clinical appearance or dermoscopy.",
    "differentials": [
      {
        "diagnosis": "Cutaneous squamous cell carcinoma",
        "distinguishingClue": "Often more hyperkeratotic, tender or rapidly growing; biopsy when uncertain."
      },
      {
        "diagnosis": "Keratoacanthoma",
        "distinguishingClue": "Rapid crateriform growth; histologic distinction from cSCC/BCC as needed."
      },
      {
        "diagnosis": "Squamous cell carcinoma in situ / Bowen disease",
        "distinguishingClue": "Persistent scaly plaque; may mimic superficial BCC."
      },
      {
        "diagnosis": "Actinic keratosis",
        "distinguishingClue": "Rough gritty scale on sun-damaged skin; usually without pearly telangiectatic nodule."
      },
      {
        "diagnosis": "Sebaceous hyperplasia",
        "distinguishingClue": "Umbilicated yellowish papules with crown vessels; lacks blue-grey ovoid nests of BCC."
      },
      {
        "diagnosis": "Intradermal nevus",
        "distinguishingClue": "Soft skin-coloured papule without arborising BCC vessels; history of stability."
      },
      {
        "diagnosis": "Seborrhoeic keratosis",
        "distinguishingClue": "Stuck-on waxy plaque; comedolike openings/milia-like cysts on dermoscopy."
      },
      {
        "diagnosis": "Melanoma",
        "distinguishingClue": "Critical differential for pigmented BCC; asymmetric pigment network or melanoma-specific structures — biopsy rather than assume BCC."
      },
      {
        "diagnosis": "Dermatofibroma / scar",
        "distinguishingClue": "Especially versus morphoeic BCC; poorly defined scar-like plaque may need histology."
      },
      {
        "diagnosis": "Inflammatory dermatosis",
        "distinguishingClue": "May mimic superficial BCC; lack of dermoscopic BCC structures and treatment response help, but biopsy if persistent."
      }
    ],
    "treatment": {
      "steps": [
        {
          "level": "first-line",
          "interventions": [
            {
              "intervention": "Complete surgical excision with histologic margin assessment (German S2k)",
              "details": "First-line for most BCC. Low recurrence-risk: conventional excision with peripheral clinical safety margin 3–5 mm and conventional histologic margin assessment. High recurrence-risk and recurrent BCC: microscopically controlled surgery (mikroskopisch kontrollierte Chirurgie, MCS) with complete/lückenlose margin assessment when available; if MCS unavailable, conventional safety margin >5 mm. Do not automatically equate German MCS / lückenlose Randschnittkontrolle with a single “Mohs” technique — Mohs may be mentioned as an international procedural term but must not replace or narrow the S2k MCS concept. Histologically incomplete (R1) excision should generally be followed by re-excision; prefer MCS for high-risk, critical sites, recurrent disease or clinically relevant deep residual disease when feasible. Selected low-risk R1 cases may consider nonsurgical treatment or close surveillance per S2k context when re-excision is not preferred — these are not equivalent to complete surgical excision. Horizontal/shave excision may be considered for selected small superficial BCC on trunk or extremities when conventional surgery is unsuitable or multiple superficial lesions are present; it does not provide the same complete histologic margin control, recurrence risk is less favourable in inappropriate sites, and it should not be generalized to high-risk BCC or head-and-neck tumours. Specialist caveat only (NOT core recommendation; NOT for automated recommendation; routineFirstLine=false): very small, sharply demarcated nodular or pigmented BCC may in selected specialised circumstances be excised with narrower 2–3 mm margins — this must not override the formal 3–5 mm low-risk recommendation.",
              "sourceUrls": [
                "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf"
              ]
            }
          ]
        },
        {
          "level": "second-line-or-alternative",
          "interventions": [
            {
              "intervention": "Nonsurgical topical therapy and photodynamic therapy for selected BCC (product-specific labeling)",
              "details": "Nonsurgical modalities are not universally interchangeable with complete surgical excision. For each product distinguish S2k place-in-therapy from authorised indication and regulatory posology. Do not copy actinic-keratosis dosing into BCC. AKSUNIM and other AK-only imiquimod products are not Aldara-equivalent for BCC.",
              "medications": [
                {
                  "name": "Imiquimod 5% cream (Aldara)",
                  "route": "topical",
                  "formulation": "5% cream sachets",
                  "dose": "Apply enough cream to cover the treatment area including about 1 cm of surrounding skin",
                  "frequency": "5 nights per week (e.g. Monday–Friday) with about 8 hours on-skin time",
                  "duration": "6 weeks; assess response about 12 weeks after end of therapy",
                  "contraindications": "Hypersensitivity to imiquimod or excipients.",
                  "precautions": "Authorised for small superficial BCC in adults. S2k place-in-therapy: sBCC especially when surgery contraindicated/unsuitable. Do not use the AK 3×/week Aldara regimen for BCC. AKSUNIM and other AK-only imiquimod creams ≠ BCC indication — do not auto-substitute. Not evaluated for BCC within 1 cm of eyelids, nose, lips or hairline; large tumours >7.25 cm² have reduced response probability (sourced warning, not an unsupported automated exclusion). Recurrent/previously treated BCC and immunocompromised patients: limited/no clinical experience per labeling. Keep size/anatomy as labelled regulatory context.",
                  "monitoring": "Local inflammatory reactions; clinical clearance assessment about 12 weeks after treatment completion; incomplete clearance requires alternative therapy.",
                  "pregnancy": "No adequate clinical data; use only after product-specific risk assessment per current Fachinformation/SmPC.",
                  "sourceUrls": [
                    "https://www.fachinfo.de/fi/pdf/003976",
                    "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf"
                  ]
                },
                {
                  "name": "Fluorouracil 5% cream (Efudix)",
                  "route": "topical",
                  "formulation": "5% cream",
                  "dose": "Apply twice daily in sufficient amount to cover the lesions; total treated area must not exceed 500 cm² at one time — treat larger areas sequentially; occlusive dressing recommended for BCC per Fachinformation",
                  "frequency": "Twice daily",
                  "duration": "ACTIONABLE (German Fachinformation): for non-operable/non-irradiable superficial BCC treat at least 3–6 weeks until ulceration; may require 10–12 weeks; treat basal cell tumours until ulceration. sourceDiscrepancy=true: S2k guideline regimen-context cites about 4 weeks BID for sBCC, which is NOT an automatic stop rule and must not silently replace Fachinformation ulceration-directed posology. placeInTherapySource=S2k; regulatoryPosologySource=current DE FI.",
                  "contraindications": "Hypersensitivity to fluorouracil/excipients; pregnancy and lactation; mucous membranes and mucocutaneous junctions as labelled; concomitant or recent (within 4 weeks) brivudine, sorivudine or analogues.",
                  "precautions": "S2k place-in-therapy: sBCC preferably when surgery contraindicated/not applicable. Histologic confirmation before treatment; tumour may persist under a healed surface — follow up. DPD deficiency increases systemic toxicity risk if absorbed. No other 5-FU product/concentration substitution for this BCC indication. ACTIONABLE dose display follows Fachinformation (ulceration endpoint), not a fixed 4-week stop.",
                  "monitoring": "Local reaction through to ulceration endpoint for BCC; watch for systemic fluoropyrimidine toxicity if barrier impaired or area extensive; clinical/histologic follow-up for persistence.",
                  "pregnancy": "Contraindicated in pregnancy and lactation. Contraception: women during treatment + 6 months after; men during + 3 months after per product information.",
                  "sourceUrls": [
                    "https://www.fachinfo.de/fi/detail/003786/efudix-r-5-creme",
                    "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf"
                  ]
                },
                {
                  "name": "5-Aminolevulinic acid 78 mg/g nanoemulsion gel (Ameluz) PDT",
                  "route": "topical",
                  "formulation": "78 mg/g nanoemulsion gel",
                  "dose": "About 1 mm film on lesion plus about 5 mm surround; incubate about 3 hours under light-tight dressing, then illuminate with authorised red-light lamp per SmPC",
                  "frequency": "Two red-light PDT sessions about 1 week apart",
                  "duration": "One treatment cycle = two sessions; evaluate about 3 months after last treatment; retreat incomplete responders per SmPC",
                  "contraindications": "Hypersensitivity to ALA, porphyrins, soya or peanuts, or excipients; porphyria; known photodermatoses as labelled.",
                  "precautions": "EMA-authorised for superficial and/or nodular BCC unsuitable for surgery due to treatment-related morbidity and/or poor cosmetic outcome in adults. Daylight PDT is for AK only — do not transfer AK daylight protocols to BCC. Pivotal evidence population included thickness <2 mm — treat as study/population context, not an invented hard SmPC thickness cutoff unless the current label states one. Keep Ameluz separate from Metvix/MAL.",
                  "monitoring": "Pain during illumination; local phototoxicity; clinical (and histologic when needed) response at about 3 months; long-term clinical monitoring.",
                  "pregnancy": "Preferable to avoid during pregnancy; interrupt breastfeeding for 12 hours after treatment per SmPC.",
                  "sourceUrls": [
                    "https://www.ema.europa.eu/en/medicines/human/EPAR/ameluz",
                    "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf"
                  ]
                },
                {
                  "name": "Methyl aminolevulinate 160 mg/g cream (Metvix) PDT",
                  "route": "topical",
                  "formulation": "160 mg/g cream",
                  "dose": "About 1 mm cream to lesion plus 5–10 mm surround; occlude about 3 hours; then illuminate with CE-marked red light per Fachinformation",
                  "frequency": "Two red-light PDT sessions one week apart",
                  "duration": "One treatment cycle = two sessions; assess at about 3 months; incomplete responders may be retreated; histologic confirmation of response recommended for BCC",
                  "contraindications": "Hypersensitivity to methyl aminolevulinate, peanut or soya, or excipients; morpheaform (sklerodermiformes) BCC; porphyria.",
                  "precautions": "Separate product from Ameluz/5-ALA. Authorised for superficial and/or nodular BCC when other therapies unsuitable. Daylight protocols are for AK, not BCC. No invented millimetre upper thickness limit in the DE label. No experience with pigmented, highly infiltrating or genital lesions per warnings.",
                  "monitoring": "Illumination pain/blood pressure as labelled; local phototoxicity; response at 3 months; long-term follow-up.",
                  "pregnancy": "Not recommended in pregnancy per product information; verify current Fachinformation.",
                  "sourceUrls": [
                    "https://www.fachinfo.de/fi/detail/007185/metvix-r-160-mg-g-creme",
                    "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf"
                  ]
                }
              ],
              "sourceUrls": [
                "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf",
                "https://www.fachinfo.de/fi/pdf/003976",
                "https://www.fachinfo.de/fi/detail/003786/efudix-r-5-creme",
                "https://www.ema.europa.eu/en/medicines/human/EPAR/ameluz",
                "https://www.fachinfo.de/fi/detail/007185/metvix-r-160-mg-g-creme"
              ]
            }
          ]
        },
        {
          "level": "procedural",
          "interventions": [
            {
              "intervention": "Radiotherapy — specialist/interdisciplinary only",
              "details": "No patient self-dose or DIY fractionation in the disease record. Definitive radiotherapy when surgery is contraindicated, unsuitable or declined; multidisciplinary discussion in locally advanced BCC; selected postoperative residual disease; clinically relevant perineural invasion per S2k. High caution/contraindication contexts include BCC syndromes, xeroderma pigmentosum and radiosensitivity disorders.",
              "sourceUrls": [
                "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf"
              ]
            },
            {
              "intervention": "Cryosurgery, laser and curettage — limited options without complete histologic margin control",
              "details": "Cryosurgery: optional for small superficial BCC on trunk/extremities when excision or topical therapy unsuitable; no complete histologic margin control; not equivalent to surgery for all BCC; not for high-risk generalisation. Laser: selected low-risk BCC when standard approaches unsuitable; no complete margin control; close follow-up; not for high-risk generalisation. Curettage: do not elevate to formal S2k Empfelung level; limited option with incomplete histology; not a default automated recommendation.",
              "sourceUrls": [
                "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf"
              ]
            }
          ]
        },
        {
          "level": "refractory-or-severe",
          "interventions": [
            {
              "intervention": "Locally advanced / metastatic BCC — multidisciplinary pathway",
              "details": "Locally advanced BCC (lfBZK/laBCC) is distinct from merely having a high S2k Table 2 recurrence-risk feature: tumour extent and destructive/deep growth make reliable complete R0 resection uncertain or require complex organ-specific management. Assess in interdisciplinary tumour board. Case-by-case options may include surgery, radiotherapy, systemic therapy, selected specialist procedures such as electrochemotherapy (specialistOnly=true; coreFirstLine=false; no generic ECT regimen in this record), and clinical-trial options. Do not collapse into a single automatic treatment sequence. After clinically meaningful systemic response, reassess resectability / local definitive treatment in MDT. Neoadjuvant Hedgehog pathway inhibition may be considered in selected patients within an interdisciplinary, individualised treatment concept when tumour reduction could facilitate a less morbid or potentially curative local treatment. This is not a routine first-line recommendation for all locally advanced BCC (role=selected/individualized; routineFirstLine=false; automaticRecommendation=false).",
              "medications": [
                {
                  "name": "Vismodegib (Erivedge)",
                  "route": "oral",
                  "formulation": "hard capsules",
                  "dose": "150 mg orally once daily",
                  "frequency": "Once daily",
                  "duration": "Continue per authorised product information until disease progression or unacceptable toxicity",
                  "contraindications": "Pregnancy; women of childbearing potential and male patients who do not comply with the pregnancy-prevention programme as labelled; breastfeeding restrictions per SmPC.",
                  "precautions": "EMA-authorised for adults with symptomatic metastatic BCC, or locally advanced BCC inappropriate for surgery or radiotherapy (authorisedLaBCC=true; authorisedMetastaticBCC=true for symptomatic mBCC). Embryo-fetal toxicity; mandatory pregnancy-prevention programme; male-patient semen precautions. Do not generalise indication or safety programme from one Hedgehog inhibitor to another.",
                  "monitoring": "Specialist oncology/dermatology monitoring for class and product-specific adverse effects (including muscle spasms, alopecia, dysgeusia, fatigue, weight loss) and pregnancy-prevention compliance.",
                  "pregnancy": "Contraindicated in pregnancy; pregnancy-prevention programme mandatory per SmPC.",
                  "sourceUrls": [
                    "https://www.ema.europa.eu/en/medicines/human/EPAR/erivedge",
                    "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf"
                  ]
                },
                {
                  "name": "Sonidegib (Odomzo)",
                  "route": "oral",
                  "formulation": "200 mg hard capsules",
                  "dose": "200 mg orally once daily; swallow whole; take at least two hours after a meal and at least one hour before the following meal",
                  "frequency": "Once daily",
                  "duration": "Continue while clinical benefit persists and toxicity remains acceptable per authorised product information",
                  "contraindications": "Pregnancy; non-compliance with Odomzo Pregnancy Prevention Programme; breastfeeding restrictions per SmPC.",
                  "precautions": "EMA-authorised for adults with locally advanced BCC not amenable to curative surgery or radiation therapy. authorisedLaBCC=true; authorisedMetastaticBCC=false — sonidegib is NOT an authorised metastatic-BCC treatment in the verified EMA indication; do not infer mBCC indication from vismodegib, HHI class membership, or study discussion. Muscle toxicity and CK elevation: symptom-triggered and regulatory CK monitoring; renal/CK assessment; interruption/dose-modification per SmPC. Do not copy CK logic into vismodegib.",
                  "monitoring": "CK and muscle symptoms; pregnancy-prevention compliance; specialist monitoring for class adverse effects.",
                  "pregnancy": "Contraindicated in pregnancy; Odomzo Pregnancy Prevention Programme mandatory per SmPC.",
                  "sourceUrls": [
                    "https://www.ema.europa.eu/en/medicines/human/EPAR/odomzo",
                    "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf"
                  ]
                },
                {
                  "name": "Cemiplimab (Libtayo)",
                  "route": "intravenous",
                  "formulation": "concentrate for solution for infusion",
                  "dose": "350 mg IV",
                  "frequency": "Every 3 weeks",
                  "duration": "Continue until progression or unacceptable toxicity per regulatory source",
                  "contraindications": "Product-specific contraindications per current SmPC (including hypersensitivity as labelled).",
                  "precautions": "EMA-authorised BCC indication: adults with locally advanced or metastatic BCC who have progressed on or are intolerant to a Hedgehog pathway inhibitor. requiresPriorHHIProgressionOrIntolerance=true — do not present as unrestricted parallel first-line systemic option. Multi-indication product: use BCC-specific authorised indication only. Immune-mediated adverse reactions require specialist oncology monitoring; do not improvise detailed immune-toxicity management in generic BCC prose.",
                  "monitoring": "Specialist monitoring for immune-mediated adverse reactions and treatment response.",
                  "pregnancy": "Verify current SmPC; anti–PD-1 agents have embryo-fetal risk warnings — specialist assessment required.",
                  "sourceUrls": [
                    "https://www.ema.europa.eu/en/medicines/human/EPAR/libtayo",
                    "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf"
                  ]
                }
              ],
              "sourceUrls": [
                "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf",
                "https://www.ema.europa.eu/en/medicines/human/EPAR/erivedge",
                "https://www.ema.europa.eu/en/medicines/human/EPAR/odomzo",
                "https://www.ema.europa.eu/en/medicines/human/EPAR/libtayo"
              ]
            }
          ]
        },
        {
          "level": "supportive-care",
          "interventions": [
            {
              "intervention": "UV protection, skin self-examination and counselling",
              "details": "Counsel regular skin self-examination and UV protection, with particular emphasis on BCC syndromes or chronic immunosuppression. Immunosuppression is clinically relevant context and increases additional primary skin-cancer risk — it is NOT an S2k Table 2 high recurrence-risk criterion and must not create a third disease-level numerical follow-up schedule.",
              "sourceUrls": [
                "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf"
              ]
            }
          ]
        }
      ],
      "nonPharmacological": [
        "Broad-spectrum UV protection and sun-behaviour counselling",
        "Regular skin self-examination",
        "Prompt clinical reassessment of new, recurrent, non-healing, enlarging, bleeding or otherwise suspicious lesions"
      ]
    },
    "followUp": {
      "strategy": "cancer-surveillance",
      "text": "Follow-up is risk-adapted according to the German S2k guideline and includes surveillance for local recurrence and additional primary skin cancers. German numerical interval details are owned exclusively by the jurisdiction-specific protocol basal-cell-carcinoma-de — this disease record must not maintain a duplicate editable numerical schedule. Counsel regular skin self-examination and UV protection, with particular emphasis on BCC syndromes or chronic immunosuppression. New, recurrent, non-healing, enlarging, bleeding or otherwise suspicious lesions should prompt clinical reassessment. Do not invent a third immunosuppression-only numerical schedule."
    },
    "redFlags": [
      "Rapid growth, deep fixation or clinically suspected locally advanced disease",
      "Neurologic symptoms suggesting perineural spread",
      "Orbital, bone or soft-tissue invasion concerns",
      "Suspected metastatic disease",
      "Incomplete (R1) excision — generally requires re-excision planning",
      "Clinicopathologic discordance or unexpected aggressive histology on partial biopsy",
      "New, recurrent, non-healing, enlarging or bleeding lesions after prior BCC treatment"
    ],
    "referral": [
      {
        "type": "biopsy-assessment",
        "indication": "Uncertain diagnosis; before nonsurgical therapy when subtype/characteristics may change selection; large, recurrent, poorly defined or high-risk tumours needing histologic planning."
      },
      {
        "type": "surgery",
        "indication": "Definitive excision planning, MCS pathway, R1 re-excision, or complex anatomic sites."
      },
      {
        "type": "oncology",
        "indication": "Locally advanced or metastatic BCC requiring MDT discussion of systemic therapy, radiotherapy or specialist procedures."
      },
      {
        "type": "systemic-therapy-assessment",
        "indication": "Consideration of Hedgehog inhibitors or cemiplimab under product-specific authorised indications and prerequisites."
      },
      {
        "type": "dermatology",
        "indication": "Multiple BCC, syndromic disease, chronic immunosuppression, field of prior radiation, or complex nonsurgical planning."
      }
    ],
    "oncology": {
      "riskClassification": "German S2k AWMF 032-021 v9.0 Table 2 is authoritative for Docutis German recurrence-risk: any one high-risk criterion classifies the tumour as high recurrence risk. Location × diameter zones — H-zone (central face including eyelids, eyebrows, periorbital region, nose, upper lip, mandibular angle region, pre- and postauricular areas, ears and temples; also genitalia, hands and feet): >6 mm high; <6 mm low when no other high-risk criterion. M-zone (cheeks, forehead, chin, lower lip, scalp, neck, pretibial): >10 mm high; <10 mm low when no other high-risk criterion. L-zone (trunk and extremities): >20 mm high; <20 mm low when no other high-risk criterion. UNRESOLVED SOURCE-BOUNDARY: Table 2 uses strict > and < and does not explicitly assign tumours measuring exactly 6 mm, 10 mm or 20 mm — do not silently convert to ≥/≤ and do not invent an equality rule. Other independent Table 2 high-risk criteria: poorly defined clinical borders; local recurrence; high-risk histology (sclerodermiform, infiltrative, metatypical, micronodular); tumour arising on radioderm/previously irradiated field as defined by the guideline; perineural growth. Lower recurrence-risk histologic variants in Table 2 include superficial, nodular, adenoid, trabecular, infundibulocystic, cystic, fibroepithelial (Pinkus). Mixed histology containing a listed high-risk component should be flagged for physician/pathology-aware handling without inventing a separate formal S2k mixed-pattern rule. Factors OUTSIDE Table 2 (do not insert into the formal classifier): age alone; immunosuppression (clinically relevant second-primary context only); genetic/syndromic predisposition; dermoscopic/clinical ulceration alone. Keep separate concepts: S2k recurrence risk ≠ incomplete/R1 excision ≠ locally advanced BCC (lfBZK/laBCC) ≠ metastatic BCC (mBCC).",
      "histologicSubtype": "Document final pathology subtype. High-risk histology per Table 2: sclerodermiform, infiltrative, metatypical, micronodular. Do not auto-assign subtype from clinical appearance or dermoscopy.",
      "excisionMargins": "Low recurrence-risk: 3–5 mm conventional peripheral margin. High-risk/recurrent: MCS preferred; if MCS unavailable >5 mm. 2–3 mm only as labelled specialist caveat — not core recommendation, not for automated recommendation.",
      "staging": "No routine imaging for uncomplicated BCC. Indication-driven imaging when laBCC, deep extension, clinically relevant perineural spread, orbital/bone involvement or metastatic disease is suspected.",
      "reExcision": "Histologically incomplete (R1) excision should generally be followed by re-excision; prefer MCS in high-risk, critical-site, recurrent or deep residual settings when feasible. R1 is not the same concept as laBCC or mBCC.",
      "imaging": "Not routine for uncomplicated BCC; reserve for suspected locally advanced, perineural, orbital, bone or metastatic disease.",
      "systemicTherapyReferral": "MDT referral for laBCC/mBCC. Vismodegib: laBCC + symptomatic mBCC. Sonidegib: laBCC only (authorisedMetastaticBCC=false). Cemiplimab: laBCC/mBCC only after HHI progression or intolerance. Neoadjuvant HHI selected/non-routine only.",
      "recurrenceMetastasis": "Metastasis is very rare but locally destructive growth can be severe. Recurrence-risk surveillance is distinct from R1 management and from laBCC/mBCC pathways."
    },
    "patientCounseling": [
      "BCC is a locally invasive skin cancer; metastasis is very rare but untreated lesions can destroy local tissue.",
      "Perform regular skin self-examination and use UV protection; emphasise this especially with BCC syndromes or chronic immunosuppression.",
      "Seek prompt review for new, recurrent, non-healing, enlarging, bleeding or otherwise suspicious lesions.",
      "German follow-up visit intervals are defined in the jurisdiction-specific BCC follow-up protocol, not as a second conflicting schedule in this disease summary.",
      "Ordinary BCC is not BK 5103; occupational UV may still be clinically relevant to discuss with the treating clinician."
    ],
    "specialPopulations": [
      {
        "population": "immunocompromised",
        "note": "Clinically relevant increased risk of additional primary skin cancers and counselling emphasis; immunosuppression is NOT an S2k Table 2 high recurrence-risk criterion and must not create a third numerical follow-up schedule."
      },
      {
        "population": "pregnancy",
        "note": "Hedgehog inhibitors are contraindicated in pregnancy with mandatory pregnancy-prevention programmes; topical fluorouracil is contraindicated; verify each product label before any therapy."
      },
      {
        "population": "lactation",
        "note": "Product-specific breastfeeding restrictions apply (including Hedgehog inhibitors and fluorouracil); verify current SmPC/Fachinformation."
      }
    ],
    "evidenceMap": {
      "presentation": [
        "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf",
        "https://dermnetnz.org/topics/basal-cell-carcinoma"
      ],
      "dermoscopy": [
        "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf",
        "https://dermnetnz.org/topics/basal-cell-carcinoma"
      ],
      "diagnostics": [
        "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf",
        "https://www.aad.org/member/clinical-quality/guidelines/bcc"
      ],
      "differentials": [
        "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf",
        "https://dermnetnz.org/topics/basal-cell-carcinoma"
      ],
      "treatment": [
        "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf",
        "https://www.fachinfo.de/fi/pdf/003976",
        "https://www.fachinfo.de/fi/detail/003786/efudix-r-5-creme",
        "https://www.ema.europa.eu/en/medicines/human/EPAR/ameluz",
        "https://www.fachinfo.de/fi/detail/007185/metvix-r-160-mg-g-creme",
        "https://www.ema.europa.eu/en/medicines/human/EPAR/erivedge",
        "https://www.ema.europa.eu/en/medicines/human/EPAR/odomzo",
        "https://www.ema.europa.eu/en/medicines/human/EPAR/libtayo",
        "https://www.aad.org/member/clinical-quality/guidelines/bcc"
      ],
      "followUp": [
        "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf",
        "https://www.aad.org/member/clinical-quality/guidelines/bcc"
      ],
      "redFlags": [
        "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf"
      ],
      "oncology": [
        "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf",
        "https://www.aad.org/member/clinical-quality/guidelines/bcc"
      ]
    },
    "sourceUrls": [
      "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf",
      "https://klassifikationen.bfarm.de/icd-10-gm/kode-suche/htmlgm2026/block-c43-c44.htm",
      "https://www.fachinfo.de/fi/pdf/003976",
      "https://www.fachinfo.de/fi/detail/003786/efudix-r-5-creme",
      "https://www.ema.europa.eu/en/medicines/human/EPAR/ameluz",
      "https://www.fachinfo.de/fi/detail/007185/metvix-r-160-mg-g-creme",
      "https://www.ema.europa.eu/en/medicines/human/EPAR/erivedge",
      "https://www.ema.europa.eu/en/medicines/human/EPAR/odomzo",
      "https://www.ema.europa.eu/en/medicines/human/EPAR/libtayo",
      "https://www.dguv.de/bk-info/icd-10-kapitel/kapitel_12/bk5103/index.jsp",
      "https://www.aad.org/member/clinical-quality/guidelines/bcc",
      "https://dermnetnz.org/topics/basal-cell-carcinoma",
      "https://icd.who.int/browse10/2019/en",
      "https://www.who.int/standards/classifications/other-classifications/international-classification-of-diseases-for-oncology",
      "https://whobluebooks.iarc.who.int/structures/skintumours/"
    ]
  },
  "references": [
    {
      "title": "S2k-Leitlinie Basalzellkarzinom der Haut",
      "organization": "German Dermatological Society guideline group / AWMF 032-021",
      "type": "guideline",
      "year": 2024,
      "version": "9.0; AWMF 032-021",
      "url": "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf",
      "doi": null,
      "metadataCheckedAt": "2026-09-23"
    },
    {
      "title": "ICD-10-GM Version 2026 — C43–C44 Melanom und sonstige bösartige Neubildungen der Haut",
      "organization": "BfArM",
      "type": "official classification",
      "year": 2026,
      "version": "2026",
      "url": "https://klassifikationen.bfarm.de/icd-10-gm/kode-suche/htmlgm2026/block-c43-c44.htm",
      "doi": null,
      "metadataCheckedAt": "2026-09-23"
    },
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
      "title": "BK 5103 — Squamous cell carcinomas or multiple actinic keratoses of the skin caused by natural UV radiation",
      "organization": "DGUV",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://www.dguv.de/bk-info/icd-10-kapitel/kapitel_12/bk5103/index.jsp",
      "doi": null,
      "metadataCheckedAt": "2026-09-20"
    },
    {
      "title": "Aldara 5% Creme — German Fachinformation",
      "organization": "Fachinfo-Service / German product information",
      "type": "clinical reference",
      "year": null,
      "version": "Februar 2024",
      "url": "https://www.fachinfo.de/fi/pdf/003976",
      "doi": null,
      "metadataCheckedAt": "2026-09-23"
    },
    {
      "title": "Efudix 5% cream — German Fachinformation",
      "organization": "German product information",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://www.fachinfo.de/fi/detail/003786/efudix-r-5-creme",
      "doi": null,
      "metadataCheckedAt": "2026-09-20"
    },
    {
      "title": "Ameluz — EPAR Product Information",
      "organization": "European Medicines Agency",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/ameluz",
      "doi": null,
      "metadataCheckedAt": "2026-09-23"
    },
    {
      "title": "Metvix 160 mg/g Creme — German Fachinformation",
      "organization": "Fachinfo-Service / German product information",
      "type": "clinical reference",
      "year": null,
      "version": "12/2024",
      "url": "https://www.fachinfo.de/fi/detail/007185/metvix-r-160-mg-g-creme",
      "doi": null,
      "metadataCheckedAt": "2026-09-23"
    },
    {
      "title": "Erivedge (vismodegib) — EPAR Product Information",
      "organization": "European Medicines Agency",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/erivedge",
      "doi": null,
      "metadataCheckedAt": "2026-09-23"
    },
    {
      "title": "Odomzo (sonidegib) — EPAR Product Information",
      "organization": "European Medicines Agency",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/odomzo",
      "doi": null,
      "metadataCheckedAt": "2026-09-23"
    },
    {
      "title": "Libtayo (cemiplimab) — EPAR Product Information",
      "organization": "European Medicines Agency",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://www.ema.europa.eu/en/medicines/human/EPAR/libtayo",
      "doi": null,
      "metadataCheckedAt": "2026-09-23"
    },
    {
      "title": "Basal cell carcinoma",
      "organization": "DermNet",
      "type": "clinical reference",
      "year": null,
      "version": null,
      "url": "https://dermnetnz.org/topics/basal-cell-carcinoma",
      "doi": null,
      "metadataCheckedAt": "2026-09-23"
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

- **Exact fingerprint:** `sha256-v1:f4b9487215a415cfbbc159b5b1de4a64e77b27d816559b119a32e111276db338`
- **Schema version:** 1
- **Reviewable sections:** `prompt`, `options`, `best-answer`, `explanation`, `safety-notice`, `references`
- **Mapped evidence sources:**
  - https://dermnetnz.org/topics/basal-cell-carcinoma
  - https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf
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
  "explanation": "Arborising vessels are a classically associated high-yield schematic dermoscopic clue for basal cell carcinoma, although diagnosis and subtype assessment still require the full clinical-pathologic context.",
  "sourceUrls": [
    "https://dermnetnz.org/topics/basal-cell-carcinoma",
    "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf"
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

- **Exact fingerprint:** `sha256-v1:99ea95c1e7735771d66d053dd15a67e811b3cd1d0b74fdf5130cfaeda2d08c00`
- **Schema version:** 1
- **Reviewable sections:** `prompt`, `options`, `best-answer`, `explanation`, `safety-notice`, `references`
- **Mapped evidence sources:**
  - https://onlinelibrary.wiley.com/doi/10.1111/ddg.15231
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
    "https://onlinelibrary.wiley.com/doi/10.1111/ddg.15231"
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

- **Exact fingerprint:** `sha256-v1:0d45d6d602b890b47548da1e708be5d3f365540b0a2b49240763504bfd6e0471`
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
  "alt": "Labelled schematic lesion showing a pearly raised border, central ulceration, branching vessels and blue-grey ovoid nests.",
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

- **Exact fingerprint:** `sha256-v1:25cbf04b711b308ca456ab8b67a29bd056d3ccb69c0f404e285adaf8ab92c02e`
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
    "recommendationLocation": "Chapter 12, pages 59–61"
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
          "id": "intensive-q3m-until-event-free",
          "label": "Every 3 months until more than 2 years without new BCC or recurrence",
          "range": {
            "fromYear": 1,
            "toYear": null
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
              "note": "Continue every 3 months until more than 2 years without a new BCC or recurrence; do not transition to annual merely because two calendar years have elapsed.",
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
    "The guideline recommends regular self-examination. Patients should be counselled on UV protection, with particular emphasis on patients with BCC syndromes or chronic immunosuppression. Other modalities are not assigned fixed routine intervals in the follow-up section. Chronic immunosuppression does not create a separate numerical follow-up schedule in this protocol."
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

## case: Large plantar pigmented macule (`case-acral-melanoma-plantar`)

- **Exact fingerprint:** `sha256-v1:2e75fd0df582a96aa54c6bd247adf309edd61035acf1baac90aebca4dea3226d`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Photography_of_a_large_acral_lentiginous_melanoma.jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-acral-melanoma-plantar",
  "slug": "acral-melanoma-plantar-clinical",
  "title": "Large plantar pigmented macule",
  "diagnosisLabel": "Acral lentiginous melanoma",
  "diseaseId": "acral-melanoma",
  "category": "Melanocytic malignancies",
  "educationalLevel": "intermediate",
  "caseType": "clinical",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Plantar foot / toe",
    "presentationNotes": "Large asymmetric dark-brown macule on acral skin (open-access published case photography)."
  },
  "images": [
    {
      "id": "img-acral-melanoma-plantar",
      "type": "clinical",
      "src": "assets/media/cases/acral-melanoma-plantar-clinical.jpg",
      "dimensions": {
        "width": 894,
        "height": 1430
      },
      "alt": "Clinical photograph of a large asymmetric dark-brown plantar macule with irregular borders and color variegation on acral skin.",
      "caption": "Large asymmetric dark-brown acral macule with irregular borders and several colors (published case photography).",
      "source": "Xavier-Júnior et al., Diagnostic Pathology (2015), via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Photography_of_a_large_acral_lentiginous_melanoma.jpg",
      "creator": "Xavier-Júnior, José; Munhoz, Tania; Souza, Vinicius; Campos, Eloísa; Stolf, Hamilton; Marques, Mariângela",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Xavier-Júnior et al. 2015, Diagnostic Pathology. CC BY 4.0. https://doi.org/10.1186/s13000-015-0307-z",
      "attributionRequired": true,
      "modificationStatus": "unmodified",
      "modificationsNotes": null,
      "accessDate": "2026-09-28",
      "metadataCheckedAt": "2026-09-28",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "consentBasis": "Open-access article states Creative Commons Attribution 4.0 licensing; paper reports written informed consent for publication."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Acral lentiginous melanoma (Clark level IV, Breslow 2.6 mm in source paper)",
    "confirmationMethod": "histopathology",
    "confirmationNotes": "Source paper reports histopathology-confirmed acral lentiginous melanoma after complete histological analysis of the specimen (Clark IV, Breslow 2.6 mm). Docutis does not re-interpret slides.",
    "confidenceNote": "Diagnosis label follows the published histopathology report; educational framing only."
  },
  "observations": [
    {
      "id": "obs-am-1",
      "kind": "observation",
      "text": "Large pigmented macule on plantar/acral skin."
    },
    {
      "id": "obs-am-2",
      "kind": "observation",
      "text": "Asymmetry of overall shape."
    },
    {
      "id": "obs-am-3",
      "kind": "observation",
      "text": "Irregular borders."
    },
    {
      "id": "obs-am-4",
      "kind": "observation",
      "text": "Color variegation with dark-brown areas and additional tones."
    }
  ],
  "interpretations": [
    {
      "id": "int-am-1",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-am-1",
        "obs-am-2",
        "obs-am-3",
        "obs-am-4"
      ],
      "text": "The combination of acral site, asymmetry, border irregularity and color variegation raises concern for acral melanoma rather than a banal acquired nevus."
    }
  ],
  "dermoscopicFeatures": [],
  "differentials": [
    {
      "diagnosis": "Acral nevus",
      "supportingFeatures": [
        "Pigmented macule on acral skin"
      ],
      "contradictingFeatures": [
        "Large size",
        "Marked asymmetry",
        "Irregular borders",
        "Color variegation"
      ],
      "teachingDistinction": "Most acral nevi are smaller and more orderly; progressive large asymmetric variegated patches warrant specialist assessment."
    },
    {
      "diagnosis": "Acral lentiginous melanoma",
      "supportingFeatures": [
        "Acral site",
        "Asymmetry",
        "Irregular borders",
        "Color variegation"
      ],
      "contradictingFeatures": [],
      "teachingDistinction": "This published case was histopathologically confirmed as acral lentiginous melanoma."
    },
    {
      "diagnosis": "Subungual/trauma-related hemorrhage (if periungual)",
      "supportingFeatures": [
        "Acral location can host hemorrhage"
      ],
      "contradictingFeatures": [
        "Broad macular pigment pattern with variegation beyond a typical hematoma streak"
      ],
      "teachingDistinction": "Hemorrhage usually has a history of trauma and evolving clearance; do not dismiss concerning acral pigment without examination."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-am-1",
      "title": "Notice first",
      "text": "Describe site, size impression, asymmetry, border and colors before naming a diagnosis."
    },
    {
      "id": "tp-am-2",
      "title": "Key features",
      "text": "Acral location plus ABCDE-like irregularity is a high-yield concern pattern."
    },
    {
      "id": "tp-am-3",
      "title": "Suspicion",
      "text": "Large irregular acral pigmented patches require specialist assessment; histopathology confirmed melanoma in the source paper."
    },
    {
      "id": "tp-am-4",
      "title": "Pitfall",
      "text": "Do not reassure based on acral site alone; acral melanoma is a classic miss."
    },
    {
      "id": "tp-am-5",
      "title": "Why this fits",
      "text": "Published clinical morphology matches an advanced acral lentiginous melanoma later confirmed histologically."
    }
  ],
  "clinicalAction": "Open the Docutis acral melanoma record for structured reference context after you finish the case.",
  "annotations": [],
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

## case: Nodular lesion dermatoscopy with vessels (`case-bcc-nodular-dermoscopy`)

- **Exact fingerprint:** `sha256-v1:986c85eaca4eedd59c689380a30a711924daa290c40a7bd451bdfbf8c97c4203`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Dermatoskopie_eines_nodul%C3%A4ren_Basalzellkarzinoms,_WIKIDERM%C2%AE.jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-bcc-nodular-dermoscopy",
  "slug": "bcc-nodular-dermoscopy-wikiderm",
  "title": "Nodular lesion dermatoscopy with vessels",
  "diagnosisLabel": "Nodular basal cell carcinoma",
  "diseaseId": "basal-cell-carcinoma",
  "category": "Keratinocyte carcinomas",
  "educationalLevel": "introductory",
  "caseType": "dermoscopic",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Not specified on source (dermoscopic close-up)",
    "presentationNotes": "Dermatoscopy labeled by the clinician author as nodular basal cell carcinoma."
  },
  "images": [
    {
      "id": "img-bcc-nodular-dermoscopy",
      "type": "dermoscopy",
      "src": "assets/media/cases/bcc-nodular-wikiderm-dermoscopy.jpg",
      "dimensions": {
        "width": 1600,
        "height": 1200
      },
      "alt": "Dermoscopic photograph of a nodular basal cell carcinoma showing focused vascular structures within a translucent lesion field.",
      "caption": "Dermatoscopy of a nodular basal cell carcinoma (clinician-authored educational image).",
      "source": "Dr. Thomas Brinkmeier / WIKIDERM, via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Dermatoskopie_eines_nodul%C3%A4ren_Basalzellkarzinoms,_WIKIDERM%C2%AE.jpg",
      "creator": "Dr. Thomas Brinkmeier",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Dr. Thomas Brinkmeier, WIKIDERM. CC BY 4.0.",
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "modificationsNotes": "Resized and recompressed for web delivery (max width 1600 px); no clinical cropping or annotation added.",
      "accessDate": "2026-09-28",
      "metadataCheckedAt": "2026-09-28",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "consentBasis": "Clinician own-work educational dermatoscopy published on Wikimedia Commons under CC BY 4.0; no facial identifiers in frame."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Nodular basal cell carcinoma",
    "confirmationMethod": "expert_diagnosis",
    "confirmationNotes": "Source Commons description labels the image as dermatoscopy of a nodular basal cell carcinoma by the clinician author. Histopathology is not cited on the Commons page; do not claim histo confirmation here.",
    "confidenceNote": "Expert clinician label only until Docutis physician review."
  },
  "observations": [
    {
      "id": "obs-bccn-1",
      "kind": "observation",
      "text": "Focused dermoscopic field of a nodular lesion."
    },
    {
      "id": "obs-bccn-2",
      "kind": "observation",
      "text": "Branching / telangiectatic vascular structures are visible."
    },
    {
      "id": "obs-bccn-3",
      "kind": "observation",
      "text": "Translucent to pink structural background without a regular pigment network of a banal nevus."
    }
  ],
  "interpretations": [
    {
      "id": "int-bccn-1",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-bccn-2",
        "obs-bccn-3"
      ],
      "text": "Arborizing or telangiectatic vessels on a translucent background are classic dermoscopic clues associated with basal cell carcinoma."
    }
  ],
  "dermoscopicFeatures": [
    {
      "token": "arborizing_vessels",
      "label": "Arborizing / branching vessels"
    },
    {
      "token": "telangiectasia",
      "label": "Telangiectatic vessels"
    }
  ],
  "differentials": [
    {
      "diagnosis": "Basal cell carcinoma (nodular)",
      "supportingFeatures": [
        "Branching vessels",
        "Translucent vascularized nodule pattern"
      ],
      "contradictingFeatures": [],
      "teachingDistinction": "Author-labeled nodular BCC; vascular clues are the teaching focus."
    },
    {
      "diagnosis": "Amelanotic / hypomelanotic melanoma",
      "supportingFeatures": [
        "Can show atypical vessels"
      ],
      "contradictingFeatures": [
        "Classic arborizing BCC-type vessels and translucent BCC pattern favor BCC in this labeled example"
      ],
      "teachingDistinction": "Always keep amelanotic melanoma in mind for atypical pink lesions; confirmation pathway is clinical-pathologic, not image quiz alone."
    },
    {
      "diagnosis": "Sebaceous hyperplasia / other adnexal nodule",
      "supportingFeatures": [
        "Facial/nodular pink lesions can mimic"
      ],
      "contradictingFeatures": [
        "Crown vessels of sebaceous hyperplasia differ from arborizing BCC vessels"
      ],
      "teachingDistinction": "Vessel morphology and overall pattern help, but uncertain lesions need clinicopathologic correlation."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-bccn-1",
      "title": "Notice first",
      "text": "Look for vessel morphology before committing to a diagnosis name."
    },
    {
      "id": "tp-bccn-2",
      "title": "Key features",
      "text": "Arborizing/telangiectatic vessels are high-yield BCC dermoscopic clues."
    },
    {
      "id": "tp-bccn-3",
      "title": "Pitfall",
      "text": "Pink lesions are not automatically BCC; amelanotic melanoma remains an important differential."
    },
    {
      "id": "tp-bccn-4",
      "title": "Why this fits",
      "text": "The clinician-authored label and vascular pattern align with nodular BCC teaching."
    }
  ],
  "clinicalAction": "Compare with the Docutis basal cell carcinoma record and the BCC clues schematic after the case.",
  "annotations": [],
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

## case: Pigmented lesion dermatoscopy on the back (`case-bcc-pigmented-dermoscopy`)

- **Exact fingerprint:** `sha256-v1:55128f9c0ebc0b1d595205cd4ad0cd100c37edde116db5eb57138975f42acc58`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Dermatoskopie_eines_pigmentierten_Basalzellkarzinoms.jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-bcc-pigmented-dermoscopy",
  "slug": "bcc-pigmented-dermoscopy-wikiderm",
  "title": "Pigmented lesion dermatoscopy on the back",
  "diagnosisLabel": "Pigmented basal cell carcinoma",
  "diseaseId": "basal-cell-carcinoma",
  "category": "Keratinocyte carcinomas",
  "educationalLevel": "intermediate",
  "caseType": "dermoscopic",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Back (per source description)",
    "presentationNotes": "Dermatoscopy labeled as pigmented basal cell carcinoma on the back."
  },
  "images": [
    {
      "id": "img-bcc-pigmented-dermoscopy",
      "type": "dermoscopy",
      "src": "assets/media/cases/bcc-pigmented-wikiderm-dermoscopy.jpg",
      "dimensions": {
        "width": 1600,
        "height": 1200
      },
      "alt": "Dermoscopic photograph of a pigmented basal cell carcinoma on the back showing asymmetric pigment structures without a typical melanocytic network of a banal nevus.",
      "caption": "Dermatoscopy of a pigmented basal cell carcinoma on the back (clinician-authored educational image).",
      "source": "Dr. Thomas Brinkmeier / WIKIDERM, via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Dermatoskopie_eines_pigmentierten_Basalzellkarzinoms.jpg",
      "creator": "Dr. Thomas Brinkmeier",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Dr. Thomas Brinkmeier, WIKIDERM. CC BY 4.0.",
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "modificationsNotes": "Resized and recompressed for web delivery (max width 1600 px); no clinical cropping or annotation added.",
      "accessDate": "2026-09-28",
      "metadataCheckedAt": "2026-09-28",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "consentBasis": "Clinician own-work educational dermatoscopy published on Wikimedia Commons under CC BY 4.0; truncal close-up without facial identifiers."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Pigmented basal cell carcinoma",
    "confirmationMethod": "expert_diagnosis",
    "confirmationNotes": "Source Commons description labels the image as dermatoscopy of a pigmented basal cell carcinoma on the back. Histopathology is not cited on the Commons page.",
    "confidenceNote": "Expert clinician label only until Docutis physician review."
  },
  "observations": [
    {
      "id": "obs-bccp-1",
      "kind": "observation",
      "text": "Pigmented dermoscopic structures within a focal lesion on truncal skin context."
    },
    {
      "id": "obs-bccp-2",
      "kind": "observation",
      "text": "Asymmetric distribution of pigment."
    },
    {
      "id": "obs-bccp-3",
      "kind": "observation",
      "text": "Leaf-like or ovoid pigment aggregates rather than a regular reticular melanocytic network."
    }
  ],
  "interpretations": [
    {
      "id": "int-bccp-1",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-bccp-2",
        "obs-bccp-3"
      ],
      "text": "Pigmented BCC often shows maple-leaf / ovoid nests and lacks a typical nevus network; melanoma remains the key differential for pigmented lesions."
    }
  ],
  "dermoscopicFeatures": [
    {
      "token": "maple_leaf_areas",
      "label": "Maple leaf-like pigment areas"
    },
    {
      "token": "blue_gray_ovoid_nests",
      "label": "Blue-gray ovoid nests / pigment aggregates"
    },
    {
      "token": "structureless_areas",
      "label": "Structureless pigmented areas"
    }
  ],
  "differentials": [
    {
      "diagnosis": "Pigmented basal cell carcinoma",
      "supportingFeatures": [
        "Leaf-like / ovoid pigment aggregates",
        "Absent regular nevus network"
      ],
      "contradictingFeatures": [],
      "teachingDistinction": "Author-labeled pigmented BCC; emphasize BCC pigment structures vs melanocytic network."
    },
    {
      "diagnosis": "Melanoma",
      "supportingFeatures": [
        "Asymmetric pigment",
        "Color variegation potential"
      ],
      "contradictingFeatures": [
        "Classic BCC-specific pigment structures favor BCC when clearly present"
      ],
      "teachingDistinction": "When uncertain, treat as a pigmented lesion requiring clinicopathologic correlation — never use this module as a diagnostic oracle."
    },
    {
      "diagnosis": "Seborrheic keratosis",
      "supportingFeatures": [
        "Can be pigmented on the trunk"
      ],
      "contradictingFeatures": [
        "Milia-like cysts / comedo-like openings pattern differs from BCC leaf-like structures"
      ],
      "teachingDistinction": "Compare global pattern; SK clues differ from BCC pigment architecture."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-bccp-1",
      "title": "Notice first",
      "text": "Is there a melanocytic network, or BCC-type pigment architecture?"
    },
    {
      "id": "tp-bccp-2",
      "title": "Key features",
      "text": "Maple-leaf areas and blue-gray ovoid nests support pigmented BCC."
    },
    {
      "id": "tp-bccp-3",
      "title": "Main differential",
      "text": "Melanoma is the safety-critical differential for any atypical pigmented lesion."
    },
    {
      "id": "tp-bccp-4",
      "title": "Why this fits",
      "text": "Clinician-authored pigmented BCC label with BCC-type pigment structures."
    }
  ],
  "clinicalAction": "Review the Docutis basal cell carcinoma record after completing differentials.",
  "annotations": [],
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

## case: Field change on the dorsum of the hand (`case-ak-field-hand`)

- **Exact fingerprint:** `sha256-v1:e1aad888f61babb1a3efd9b4c3f6417050a4c4331411848b5ce3ae14194146c3`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Aktinische_Keratosen_am_Handr%C3%BCcken,_sog._Feldkanzerisierung,_%C2%A9WIKIDERM.jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-ak-field-hand",
  "slug": "ak-field-cancerization-hand",
  "title": "Field change on the dorsum of the hand",
  "diagnosisLabel": "Actinic keratoses / field cancerization",
  "diseaseId": "actinic-keratosis",
  "category": "Keratinocyte carcinomas and precursors",
  "educationalLevel": "introductory",
  "caseType": "clinical",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Dorsum of the hand",
    "presentationNotes": "Multiple actinic keratoses described as field cancerization on the hand dorsum."
  },
  "images": [
    {
      "id": "img-ak-field-hand",
      "type": "clinical",
      "src": "assets/media/cases/ak-field-hand-clinical.jpg",
      "dimensions": {
        "width": 1600,
        "height": 1200
      },
      "alt": "Clinical photograph of the dorsum of a hand showing multiple rough erythematous and keratotic spots consistent with actinic keratoses and field cancerization.",
      "caption": "Field cancerization with multiple actinic keratoses on the dorsum of the hand.",
      "source": "Dr. Thomas Brinkmeier / WIKIDERM, via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Aktinische_Keratosen_am_Handr%C3%BCcken,_sog._Feldkanzerisierung,_%C2%A9WIKIDERM.jpg",
      "creator": "Dr. Thomas Brinkmeier",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Dr. Thomas Brinkmeier, WIKIDERM. CC BY 4.0.",
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "modificationsNotes": "Resized and recompressed for web delivery (max width 1600 px); no clinical cropping or annotation added.",
      "accessDate": "2026-09-28",
      "metadataCheckedAt": "2026-09-28",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "consentBasis": "Clinician own-work educational clinical photograph published on Wikimedia Commons under CC BY 4.0; hand dorsum without facial identifiers."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Actinic keratoses with field cancerization of the hand dorsum",
    "confirmationMethod": "expert_diagnosis",
    "confirmationNotes": "Source labels the photograph as actinic keratoses / field cancerization of the hand dorsum. Histopathology is not cited on the Commons page.",
    "confidenceNote": "Expert clinician label only until Docutis physician review."
  },
  "observations": [
    {
      "id": "obs-ak-1",
      "kind": "observation",
      "text": "Sun-exposed dorsum of the hand."
    },
    {
      "id": "obs-ak-2",
      "kind": "observation",
      "text": "Multiple discrete rough / keratotic and erythematous spots rather than a single lesion."
    },
    {
      "id": "obs-ak-3",
      "kind": "observation",
      "text": "Background chronically sun-damaged skin appearance."
    }
  ],
  "interpretations": [
    {
      "id": "int-ak-1",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-ak-1",
        "obs-ak-2",
        "obs-ak-3"
      ],
      "text": "Multiple AKs on a sun-damaged field illustrate field cancerization rather than an isolated keratosis."
    }
  ],
  "dermoscopicFeatures": [],
  "differentials": [
    {
      "diagnosis": "Actinic keratoses / field cancerization",
      "supportingFeatures": [
        "Multiple grit/scale spots",
        "Hand dorsum sun exposure",
        "Field distribution"
      ],
      "contradictingFeatures": [],
      "teachingDistinction": "Field concept matters for surveillance of the whole sun-damaged area."
    },
    {
      "diagnosis": "Cutaneous squamous cell carcinoma",
      "supportingFeatures": [
        "Can arise within AK fields"
      ],
      "contradictingFeatures": [
        "This frame emphasizes multiple thin keratotic spots rather than a single indurated tumor mass"
      ],
      "teachingDistinction": "Thickened, tender or rapidly changing foci within a field need separate assessment for invasive SCC."
    },
    {
      "diagnosis": "Chronic eczema / irritant hand dermatitis",
      "supportingFeatures": [
        "Hand dorsum can be eczematous"
      ],
      "contradictingFeatures": [
        "Discrete grit-like keratotic AKs on photoaged skin differ from diffuse eczematous plaques"
      ],
      "teachingDistinction": "Distribution and keratotic grit texture help separate AK from dermatitis."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-ak-1",
      "title": "Notice first",
      "text": "Count lesions and describe the field, not only one spot."
    },
    {
      "id": "tp-ak-2",
      "title": "Key features",
      "text": "Multiple AKs on photoaged hand skin exemplify field cancerization."
    },
    {
      "id": "tp-ak-3",
      "title": "Suspicion",
      "text": "Any thickened, ulcerated or tender focus in the field may need biopsy for invasive disease."
    },
    {
      "id": "tp-ak-4",
      "title": "Why this fits",
      "text": "Clinician-authored field-cancerization label matches the multi-lesion hand-dorsum pattern."
    }
  ],
  "clinicalAction": "Open the Docutis actinic keratosis record for structured precursor/SCC continuum context.",
  "annotations": [],
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

## case: Two neighboring lesions on the upper back (`case-scc-ak-paraspinal`)

- **Exact fingerprint:** `sha256-v1:add58f1939191020d8991eeab99589a9cdb56c82e24ada85471867d9402239e6`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Squamous_Cell_Carcinoma_well_differentiated_Left_upper_paraspinal_back_with_adjacent_actinic_keratosis.jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-scc-ak-paraspinal",
  "slug": "scc-with-adjacent-ak-paraspinal",
  "title": "Two neighboring lesions on the upper back",
  "diagnosisLabel": "Well-differentiated cutaneous squamous cell carcinoma with adjacent actinic keratosis",
  "diseaseId": "cutaneous-squamous-cell-carcinoma",
  "category": "Keratinocyte carcinomas",
  "educationalLevel": "intermediate",
  "caseType": "clinical",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Left upper paraspinal back",
    "presentationNotes": "Clinical photograph marked for biopsy; caption describes well-differentiated SCC with adjacent AK."
  },
  "images": [
    {
      "id": "img-scc-ak-paraspinal",
      "type": "clinical",
      "src": "assets/media/cases/scc-ak-paraspinal-clinical.jpg",
      "dimensions": {
        "width": 582,
        "height": 238
      },
      "alt": "Clinical photograph of the left upper paraspinal back showing a marked lesion labeled as well-differentiated squamous cell carcinoma beside an adjacent actinic keratosis.",
      "caption": "Well-differentiated squamous cell carcinoma marked for biopsy with adjacent actinic keratosis on the left upper paraspinal back.",
      "source": "Dermanonymous, via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Squamous_Cell_Carcinoma_well_differentiated_Left_upper_paraspinal_back_with_adjacent_actinic_keratosis.jpg",
      "creator": "Dermanonymous",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "attribution": "Dermanonymous. CC BY-SA 4.0.",
      "attributionRequired": true,
      "modificationStatus": "unmodified",
      "modificationsNotes": null,
      "accessDate": "2026-09-28",
      "metadataCheckedAt": "2026-09-28",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "consentBasis": "Clinician/uploader own-work educational clinical photograph on Wikimedia Commons under CC BY-SA 4.0; truncal site without facial identifiers."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Well-differentiated cutaneous squamous cell carcinoma with adjacent actinic keratosis",
    "confirmationMethod": "expert_diagnosis",
    "confirmationNotes": "Source caption states well-differentiated SCC marked for biopsy with adjacent AK. A histopathology report is not linked on the Commons page; confirmationMethod remains expert_diagnosis rather than histopathology.",
    "confidenceNote": "Biopsy marking is noted by the uploader; Docutis does not claim an unseen pathology report."
  },
  "observations": [
    {
      "id": "obs-scc-1",
      "kind": "observation",
      "text": "Two neighboring lesions on sun-exposed paraspinal back skin."
    },
    {
      "id": "obs-scc-2",
      "kind": "observation",
      "text": "One focus is marked for biopsy and appears more built-up than the neighbor."
    },
    {
      "id": "obs-scc-3",
      "kind": "observation",
      "text": "An adjacent flatter keratotic change is present in the same field."
    }
  ],
  "interpretations": [
    {
      "id": "int-scc-1",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-scc-1",
        "obs-scc-2",
        "obs-scc-3"
      ],
      "text": "The pairing illustrates the AK–SCC continuum: a more concerning hypertrophic focus beside an adjacent actinic keratosis in damaged skin."
    }
  ],
  "dermoscopicFeatures": [],
  "differentials": [
    {
      "diagnosis": "Cutaneous squamous cell carcinoma",
      "supportingFeatures": [
        "Hypertrophic marked focus",
        "Actinically damaged background",
        "Uploader SCC label"
      ],
      "contradictingFeatures": [],
      "teachingDistinction": "Primary teaching diagnosis for the marked lesion per source caption."
    },
    {
      "diagnosis": "Actinic keratosis (adjacent)",
      "supportingFeatures": [
        "Flatter keratotic neighbor",
        "Same sun-damaged field"
      ],
      "contradictingFeatures": [],
      "teachingDistinction": "Adjacent AK supports continuum teaching without merging both labels into one lesion."
    },
    {
      "diagnosis": "Keratoacanthoma / hypertrophic AK",
      "supportingFeatures": [
        "Can mimic crateriform or hypertrophic keratinizing tumors"
      ],
      "contradictingFeatures": [
        "Source caption specifies well-differentiated SCC for the marked lesion"
      ],
      "teachingDistinction": "Overlap exists clinically; pathology resolves uncertain keratinizing tumors."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-scc-1",
      "title": "Notice first",
      "text": "Compare the thicker marked focus with the flatter neighbor before naming either."
    },
    {
      "id": "tp-scc-2",
      "title": "Key features",
      "text": "SCC can arise in a field of actinic damage beside residual AK."
    },
    {
      "id": "tp-scc-3",
      "title": "Pitfall",
      "text": "Do not dismiss a hypertrophic focus because nearby thinner AKs look familiar."
    },
    {
      "id": "tp-scc-4",
      "title": "Why this fits",
      "text": "Uploader caption explicitly pairs well-differentiated SCC with adjacent AK."
    }
  ],
  "clinicalAction": "Open the Docutis cutaneous squamous cell carcinoma record; also compare actinic keratosis for continuum context.",
  "annotations": [],
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

## case: Dark lesion thicker on one side (`case-g18-01`)

- **Exact fingerprint:** `sha256-v1:1fe2a3b9f4f99fd64877d40941fd8ed826e433d1a90e3a2558a5662507798ce4`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Asymmetrical_melanoma.jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "category": "Melanocytic malignancies",
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
  "managementBrief": "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
  "reviewStatus": "clinician review required",
  "clinicalReview": null,
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Skin, site not named on the source",
    "presentationNotes": null
  },
  "id": "case-g18-01",
  "slug": "g18-asymmetric-dark-lesion",
  "title": "Dark lesion thicker on one side",
  "diagnosisLabel": "Cutaneous melanoma",
  "diseaseId": "cutaneous-melanoma",
  "educationalLevel": "introductory",
  "caseType": "clinical",
  "images": [
    {
      "type": "clinical",
      "license": "Public domain",
      "licenseUrl": "https://www.usa.gov/government-works",
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
      "accessDate": "2026-09-30",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "creator": "National Cancer Institute",
      "attribution": "National Cancer Institute. Public domain.",
      "source": "National Cancer Institute, via Wikimedia Commons",
      "consentBasis": "US government public-domain clinical teaching photograph released through NCI Visuals Online and Wikimedia Commons. No name and no full-face portrait are in the frame. Commons file matches NCI Visuals Online image 2362.",
      "id": "img-g18-01",
      "src": "assets/media/cases/case-06-clinical.jpg",
      "dimensions": {
        "width": 1400,
        "height": 934
      },
      "alt": "Clinical photograph of one dark brown-black skin lesion that looks thicker on one side, with a measuring scale at the lower edge. No diagnosis is included.",
      "caption": "NCI teaching photograph of a dark lesion. The catalog diagnosis is withheld in the learner view until reveal.",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Asymmetrical_melanoma.jpg"
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Cutaneous melanoma (NCI asymmetry teaching image)",
    "confirmationMethod": "source_dataset_diagnosis",
    "confirmationNotes": "The NCI description says this is asymmetrical melanoma and that the left side is much thicker than the right. The caption does not state histopathology, Breslow thickness, or a histologic subtype. Those items are not added.",
    "confidenceNote": "Source-catalog diagnosis only. Not a Docutis clinician review."
  },
  "observations": [
    {
      "id": "obs-g18-01a",
      "kind": "observation",
      "text": "One dark brown-black lesion on skin."
    },
    {
      "id": "obs-g18-01b",
      "kind": "observation",
      "text": "One side looks thicker than the other side."
    },
    {
      "id": "obs-g18-01c",
      "kind": "observation",
      "text": "A measuring scale runs along the lower edge. No measurement is read off it here."
    }
  ],
  "interpretations": [
    {
      "id": "int-g18-01",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g18-01a",
        "obs-g18-01b"
      ],
      "text": "Uneven thickness is the recognition finding in this frame. Naming a disease is a separate step."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Cutaneous melanoma",
      "supportingFeatures": [
        "Asymmetric thickness",
        "Dark color"
      ],
      "contradictingFeatures": [
        "The photograph does not contain a pathology report"
      ],
      "teachingDistinction": "The NCI catalog names melanoma. Level 1 practice is to see the asymmetry before using that name."
    },
    {
      "diagnosis": "Pigmented keratinocyte tumor",
      "supportingFeatures": [
        "A dark raised lesion can be keratinocytic"
      ],
      "contradictingFeatures": [
        "The source label is not a keratinocyte tumor"
      ],
      "teachingDistinction": "A second possibility stays on the list until the source, and in practice a biopsy, settles it."
    },
    {
      "diagnosis": "Hemorrhage in a benign lesion",
      "supportingFeatures": [
        "Very dark color can be blood"
      ],
      "contradictingFeatures": [
        "The source presents this as a melanoma teaching image"
      ],
      "teachingDistinction": "Color depth alone does not prove blood."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g18-01a",
      "title": "Notice first",
      "text": "Say which half is thicker before you say a diagnosis."
    },
    {
      "id": "tp-g18-01b",
      "title": "Limit",
      "text": "Asymmetry is not specific. The diagnosis in this case is the NCI caption, not a new reading."
    }
  ],
  "observationPrompts": [
    "Which half of the dark lesion looks thicker?",
    "A measuring scale is in the frame. What does it not let you claim?"
  ],
  "hints": [
    "Stay with the thicker half. Do not turn the scale into a millimeter number."
  ],
  "closestMimic": {
    "name": "Pigmented keratinocyte tumor",
    "whyClosest": "A dark raised lesion can be keratinocytic. This clinical frame does not show dermoscopic structures that separate the two, so the catalog sentence is what names it."
  },
  "patterns": [
    {
      "id": "pat-g18-01",
      "label": "Asymmetric thickness",
      "specificityNote": "A thicker half is a clue. It is not specific for one diagnosis.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g18-01-scale",
      "label": "Measuring scale without a recorded reading",
      "specificityNote": "A scale in the frame is not a measurement and not a diagnosis.",
      "certainty": "clearly_visible",
      "weight": "weak"
    }
  ],
  "synthesis": "One dark lesion is thicker on one side. The NCI caption calls the lesion melanoma and does not include a histopathology report.",
  "evidenceWeighting": "Asymmetric thickness is clearly visible and is the major clue. It is not specific. The diagnosis weight is the NCI sentence. The scale is visible and weak, because no measurement is read from it. There is no histopathology sentence to weigh.",
  "diagnosticTrap": "Treating asymmetry as proof, or ignoring it because a ruler is in the frame.",
  "mentorNote": "Do not invent a thickness in millimeters. The scale is visible; a number is not recorded here.",
  "takeHomeRule": "Describe the uneven half first. Keep the source diagnosis separate from the clue.",
  "academy": {
    "level": 1,
    "spectrum": "melanoma",
    "teachingType": "teaching",
    "skillIds": [
      "asymmetry",
      "evidence-weighting"
    ]
  }
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## case: Dark lesion with an uneven edge (`case-g18-02`)

- **Exact fingerprint:** `sha256-v1:7a2ad423eabf7ce92f89db4ebca8df560e37dbe968fbc5eef9d0919284396a1b`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Melanoma_border.jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "category": "Melanocytic malignancies",
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
  "managementBrief": "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
  "reviewStatus": "clinician review required",
  "clinicalReview": null,
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Skin, site not named on the source",
    "presentationNotes": null
  },
  "id": "case-g18-02",
  "slug": "g18-uneven-dark-border",
  "title": "Dark lesion with an uneven edge",
  "diagnosisLabel": "Cutaneous melanoma",
  "diseaseId": "cutaneous-melanoma",
  "educationalLevel": "introductory",
  "caseType": "clinical",
  "images": [
    {
      "type": "clinical",
      "license": "Public domain",
      "licenseUrl": "https://www.usa.gov/government-works",
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
      "accessDate": "2026-09-30",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "creator": "National Cancer Institute",
      "attribution": "National Cancer Institute. Public domain.",
      "source": "National Cancer Institute, via Wikimedia Commons",
      "consentBasis": "US government public-domain clinical teaching photograph released through NCI Visuals Online and Wikimedia Commons. No name and no full-face portrait are in the frame. The Commons description is the NCI border example from the ABCD teaching set.",
      "id": "img-g18-02",
      "src": "assets/media/cases/case-07-clinical.jpg",
      "dimensions": {
        "width": 1400,
        "height": 934
      },
      "alt": "Clinical photograph of a small dark lesion with a notched outline and mixed dark red-brown color, above a centimeter scale. No diagnosis is included.",
      "caption": "NCI teaching photograph used to show an uneven border. The catalog diagnosis stays hidden until reveal.",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Melanoma_border.jpg"
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Cutaneous melanoma (NCI border teaching image)",
    "confirmationMethod": "source_dataset_diagnosis",
    "confirmationNotes": "The NCI description says this is melanoma with a border that is uneven, ragged, or notched, as part of an ABCD teaching set. It does not state histopathology.",
    "confidenceNote": "Source-catalog diagnosis only. Not a Docutis clinician review."
  },
  "observations": [
    {
      "id": "obs-g18-02a",
      "kind": "observation",
      "text": "A small dark lesion sits on otherwise even skin."
    },
    {
      "id": "obs-g18-02b",
      "kind": "observation",
      "text": "The outline is notched rather than a smooth oval."
    },
    {
      "id": "obs-g18-02c",
      "kind": "observation",
      "text": "Black and dark red-brown color are both visible. A centimeter scale is at the lower edge."
    }
  ],
  "interpretations": [
    {
      "id": "int-g18-02",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g18-02b",
        "obs-g18-02c"
      ],
      "text": "An uneven edge plus more than one dark color is the recognition pattern. It still needs the source diagnosis rather than a guess."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Cutaneous melanoma",
      "supportingFeatures": [
        "Notched border",
        "More than one dark color"
      ],
      "contradictingFeatures": [
        "No pathology text is in the caption"
      ],
      "teachingDistinction": "The source names melanoma for this border example."
    },
    {
      "diagnosis": "Seborrheic keratosis",
      "supportingFeatures": [
        "A dark stuck-on lesion can have an irregular outline"
      ],
      "contradictingFeatures": [
        "The surface here is not a thick waxy plaque in this frame"
      ],
      "teachingDistinction": "Border irregularity is shared. Do not stop at the first familiar benign name."
    },
    {
      "diagnosis": "Traumatized nevus",
      "supportingFeatures": [
        "Dark red color can follow trauma"
      ],
      "contradictingFeatures": [
        "No trauma history is in the source caption"
      ],
      "teachingDistinction": "A history of trauma is not visible in a photograph."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g18-02a",
      "title": "Notice first",
      "text": "Trace the edge with words: smooth, or notched."
    },
    {
      "id": "tp-g18-02b",
      "title": "Limit",
      "text": "An ABCD teaching caption is not a pathology report."
    }
  ],
  "observationPrompts": [
    "Is the outline a smooth oval or notched?",
    "Which dark colors are actually in the lesion?"
  ],
  "hints": [
    "Trace the edge before you pick a familiar benign name."
  ],
  "closestMimic": {
    "name": "Seborrheic keratosis",
    "whyClosest": "An irregular dark outline is shared with seborrheic keratosis. This frame does not show a thick waxy plate, so that mimic stays possible and is not preferred from pixels alone."
  },
  "patterns": [
    {
      "id": "pat-g18-02",
      "label": "Notched border",
      "specificityNote": "A notched edge raises concern and is not specific.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g18-02-color",
      "label": "More than one dark color",
      "specificityNote": "A second dark color supports concern. It is not specific and it is not a count of colors beyond what you can see.",
      "certainty": "clearly_visible",
      "weight": "supportive"
    }
  ],
  "synthesis": "The lesion has a notched outline and mixed dark colors. The NCI caption calls it melanoma and does not cite histopathology.",
  "evidenceWeighting": "The notched border is clearly visible and is the major clue. The second dark color is supportive. Diagnosis weight is the catalog sentence only. No pathology sentence is present.",
  "diagnosticTrap": "Using the word notched as if it were a diagnosis.",
  "mentorNote": "The scale lets you see that the lesion is small. Small does not cancel an uneven edge.",
  "takeHomeRule": "An uneven border is described before it is named.",
  "academy": {
    "level": 1,
    "spectrum": "melanoma",
    "teachingType": "teaching",
    "skillIds": [
      "border-irregularity"
    ]
  }
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## case: Lesion with several dark colors (`case-g18-03`)

- **Exact fingerprint:** `sha256-v1:a9faefe1881adcd0c57b927835f67dcc6ba9ea45a03cb51520f88a82715656f1`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Melanoma1.jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "category": "Melanocytic malignancies",
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
  "managementBrief": "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
  "reviewStatus": "clinician review required",
  "clinicalReview": null,
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Skin, site not named on the source",
    "presentationNotes": null
  },
  "id": "case-g18-03",
  "slug": "g18-several-dark-colors",
  "title": "Lesion with several dark colors",
  "diagnosisLabel": "Cutaneous melanoma",
  "diseaseId": "cutaneous-melanoma",
  "educationalLevel": "introductory",
  "caseType": "clinical",
  "images": [
    {
      "type": "clinical",
      "license": "Public domain",
      "licenseUrl": "https://www.usa.gov/government-works",
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
      "accessDate": "2026-09-30",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "creator": "National Cancer Institute",
      "attribution": "National Cancer Institute. Public domain.",
      "source": "National Cancer Institute, via Wikimedia Commons",
      "consentBasis": "US government public-domain clinical teaching photograph released through NCI Visuals Online and Wikimedia Commons. No name and no full-face portrait are in the frame. NCI records the slide as public domain, source Skin Cancer Foundation, Visuals Online image 2364.",
      "id": "img-g18-03",
      "src": "assets/media/cases/case-08-clinical.jpg",
      "dimensions": {
        "width": 1350,
        "height": 900
      },
      "alt": "Clinical photograph of an irregular dark lesion with black, gray, and brown areas and a shiny uneven surface. No diagnosis is included.",
      "caption": "NCI / Skin Cancer Foundation teaching photograph used for color differences. The catalog diagnosis stays hidden until reveal.",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Melanoma1.jpg"
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Cutaneous melanoma (NCI color-variegation teaching image)",
    "confirmationMethod": "source_dataset_diagnosis",
    "confirmationNotes": "The NCI description says melanoma with coloring of different shades of brown, black, or tan, as part of an ABCD set. It does not state histopathology. A separate Commons file of the same photograph was not added.",
    "confidenceNote": "Source-catalog diagnosis only. Not a Docutis clinician review."
  },
  "observations": [
    {
      "id": "obs-g18-03a",
      "kind": "observation",
      "text": "One irregular lesion rather than a round even macule."
    },
    {
      "id": "obs-g18-03b",
      "kind": "observation",
      "text": "Black, brown, and gray tones sit in the same lesion."
    },
    {
      "id": "obs-g18-03c",
      "kind": "observation",
      "text": "The surface looks shiny and slightly uneven."
    }
  ],
  "interpretations": [
    {
      "id": "int-g18-03",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g18-03a",
        "obs-g18-03b"
      ],
      "text": "Several dark colors inside one irregular outline are the finding to name before any diagnosis."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Cutaneous melanoma",
      "supportingFeatures": [
        "Several dark colors",
        "Irregular outline"
      ],
      "contradictingFeatures": [
        "No histopathology sentence is in the caption"
      ],
      "teachingDistinction": "The catalog uses this frame as a color example of melanoma."
    },
    {
      "diagnosis": "Seborrheic keratosis",
      "supportingFeatures": [
        "Can be dark and uneven"
      ],
      "contradictingFeatures": [
        "Classic stuck-on waxy horns are not the main finding in this frame"
      ],
      "teachingDistinction": "Color mix is shared with benign keratinocytic lesions."
    },
    {
      "diagnosis": "Pigmented basal cell carcinoma",
      "supportingFeatures": [
        "Can be irregular and dark"
      ],
      "contradictingFeatures": [
        "Leaf-like pigment is not claimed from this clinical photograph"
      ],
      "teachingDistinction": "Clinical color is not a dermoscopic structure."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g18-03a",
      "title": "Notice first",
      "text": "List the colors you can actually see."
    },
    {
      "id": "tp-g18-03b",
      "title": "Limit",
      "text": "Do not add blue or red if you do not see them."
    }
  ],
  "observationPrompts": [
    "How many dark colors can you name without adding one?",
    "Is the outline round and even, or irregular?"
  ],
  "hints": [
    "Name only colors you can point to in the frame."
  ],
  "closestMimic": {
    "name": "Seborrheic keratosis",
    "whyClosest": "A dark uneven lesion can be a seborrheic keratosis. Classic stuck-on waxy horns are not the main finding here, and color mix alone does not settle the source label."
  },
  "patterns": [
    {
      "id": "pat-g18-03",
      "label": "Several dark colors",
      "specificityNote": "Color mix increases concern. It is not specific and it is not a probability.",
      "certainty": "clearly_visible",
      "weight": "major"
    }
  ],
  "synthesis": "The lesion is irregular and contains more than one dark color. The NCI caption calls it melanoma without a histopathology statement.",
  "evidenceWeighting": "Several dark colors are clearly visible and are the major clue. They are not specific. The diagnosis is the catalog label. No numeric risk is attached, and no extra color was added to match a mnemonic.",
  "diagnosticTrap": "Inventing an extra color to match an ABCD mnemonic.",
  "mentorNote": "A duplicate Commons upload of this same photograph was rejected so the curriculum would not repeat one lesion.",
  "takeHomeRule": "Name only the colors in the frame, then read the source diagnosis.",
  "academy": {
    "level": 1,
    "spectrum": "melanoma",
    "teachingType": "teaching",
    "skillIds": [
      "color-variegation"
    ]
  }
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## case: Broad brown patch with an uneven edge (`case-g18-04`)

- **Exact fingerprint:** `sha256-v1:61c244cc5230ced6f74ce29486f95e0ebbbbe94a568710e0bf6dc31ee198eb9f`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Melanoma.jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "category": "Melanocytic malignancies",
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
  "managementBrief": "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
  "reviewStatus": "clinician review required",
  "clinicalReview": null,
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Skin, site not named on the source",
    "presentationNotes": null
  },
  "id": "case-g18-04",
  "slug": "g18-broad-brown-patch",
  "title": "Broad brown patch with an uneven edge",
  "diagnosisLabel": "Cutaneous melanoma",
  "diseaseId": "cutaneous-melanoma",
  "educationalLevel": "intermediate",
  "caseType": "clinical",
  "images": [
    {
      "type": "clinical",
      "license": "Public domain",
      "licenseUrl": "https://www.usa.gov/government-works",
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
      "accessDate": "2026-09-30",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "creator": "National Cancer Institute",
      "attribution": "National Cancer Institute. Public domain.",
      "source": "National Cancer Institute, via Wikimedia Commons",
      "consentBasis": "US government public-domain clinical teaching photograph released through NCI Visuals Online and Wikimedia Commons. No name and no full-face portrait are in the frame. Commons credit is NCI Visuals Online image 9186.",
      "id": "img-g18-04",
      "src": "assets/media/cases/case-09-clinical.jpg",
      "dimensions": {
        "width": 1400,
        "height": 974
      },
      "alt": "Clinical photograph of a broad brown skin patch with a darker area at one edge and a scalloped outline. No diagnosis is included.",
      "caption": "NCI photograph of a broad brown patch. The catalog diagnosis stays hidden until reveal.",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Melanoma.jpg"
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Cutaneous melanoma (NCI clinical photograph)",
    "confirmationMethod": "source_dataset_diagnosis",
    "confirmationNotes": "The NCI description says this slide shows a melanoma on a patient's skin. It does not state subtype, site, or histopathology.",
    "confidenceNote": "Source-catalog diagnosis only. Not a Docutis clinician review."
  },
  "observations": [
    {
      "id": "obs-g18-04a",
      "kind": "observation",
      "text": "A broad brown patch rather than a tiny round macule."
    },
    {
      "id": "obs-g18-04b",
      "kind": "observation",
      "text": "One edge is darker than the rest of the patch."
    },
    {
      "id": "obs-g18-04c",
      "kind": "observation",
      "text": "The outline is scalloped, and the surface is slightly uneven."
    }
  ],
  "interpretations": [
    {
      "id": "int-g18-04",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g18-04a",
        "obs-g18-04b",
        "obs-g18-04c"
      ],
      "text": "A broad patch with uneven color and a scalloped edge is a pattern to describe. The catalog name comes later."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Cutaneous melanoma",
      "supportingFeatures": [
        "Broad uneven brown patch",
        "Darker focus at one edge"
      ],
      "contradictingFeatures": [
        "Subtype and pathology are not in the caption"
      ],
      "teachingDistinction": "The NCI caption says melanoma and stops there."
    },
    {
      "diagnosis": "Solar lentigo",
      "supportingFeatures": [
        "A brown patch on skin can be a lentigo"
      ],
      "contradictingFeatures": [
        "A lentigo is usually more even in color than this patch"
      ],
      "teachingDistinction": "Even color would lean away from this frame. Do not force that lean into a benign label."
    },
    {
      "diagnosis": "Seborrheic keratosis",
      "supportingFeatures": [
        "Can be a broad brown plaque"
      ],
      "contradictingFeatures": [
        "A thick stuck-on warty surface is not the dominant look here"
      ],
      "teachingDistinction": "Surface texture is the comparison, not a score."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g18-04a",
      "title": "Notice first",
      "text": "Is the patch broad, and is one part darker?"
    },
    {
      "id": "tp-g18-04b",
      "title": "Limit",
      "text": "The caption does not name a subtype. Do not add one."
    }
  ],
  "observationPrompts": [
    "Is this a tiny round macule or a broad patch?",
    "Where is the darker focus relative to the rest of the patch?"
  ],
  "hints": [
    "Do not assign a subtype the caption does not use."
  ],
  "closestMimic": {
    "name": "Solar lentigo",
    "whyClosest": "A brown patch is the shared look. This patch is less even than a typical lentigo, and the caption still does not name a subtype."
  },
  "patterns": [
    {
      "id": "pat-g18-04",
      "label": "Broad uneven brown patch",
      "specificityNote": "A broad brown patch is not specific. Site and subtype are not in this caption.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g18-04-edge",
      "label": "Darker focus at one edge",
      "specificityNote": "A darker edge is supportive of uneven color. It is not a subtype and not a measurement.",
      "certainty": "clearly_visible",
      "weight": "supportive"
    }
  ],
  "synthesis": "The frame is a broad brown patch with a darker edge and a scalloped outline. The NCI text says melanoma without subtype or histopathology.",
  "evidenceWeighting": "The broad uneven patch and darker edge are visible. The patch is the major clue and the darker edge is supportive. Diagnostic weight is a short catalog sentence. Missing subtype is a real gap, not a reason to invent one.",
  "diagnosticTrap": "Upgrading a generic melanoma caption into superficial spreading or nodular disease.",
  "mentorNote": "This is a differentiation case because benign brown patches are the nearby lookalikes. The source does not show dermoscopy.",
  "takeHomeRule": "Do not invent a subtype the caption does not state.",
  "academy": {
    "level": 2,
    "spectrum": "melanoma",
    "teachingType": "teaching",
    "skillIds": [
      "variegated-plaque",
      "color-variegation"
    ]
  }
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## case: Brown lesion with a pale center (`case-g18-05`)

- **Exact fingerprint:** `sha256-v1:b40305fba9fd0934c3233e7be7c7c6a52bd83ae30a5cffe530a3316557b193d8`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Melanoma,_brown_lesion.jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "category": "Melanocytic malignancies",
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
  "managementBrief": "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
  "reviewStatus": "clinician review required",
  "clinicalReview": null,
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Skin, site not named on the source",
    "presentationNotes": null
  },
  "id": "case-g18-05",
  "slug": "g18-brown-rim-pale-center",
  "title": "Brown lesion with a pale center",
  "diagnosisLabel": "Cutaneous melanoma",
  "diseaseId": "cutaneous-melanoma",
  "educationalLevel": "intermediate",
  "caseType": "clinical",
  "images": [
    {
      "type": "clinical",
      "license": "Public domain",
      "licenseUrl": "https://www.usa.gov/government-works",
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
      "accessDate": "2026-09-30",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "creator": "Larry Meyer, National Cancer Institute",
      "attribution": "National Cancer Institute. Public domain.",
      "source": "National Cancer Institute, via Wikimedia Commons",
      "consentBasis": "US government public-domain clinical teaching photograph released through NCI Visuals Online and Wikimedia Commons. No name and no full-face portrait are in the frame. Photographer recorded as Larry Meyer. NCI image of a brown lesion.",
      "id": "img-g18-05",
      "src": "assets/media/cases/case-10-clinical.jpg",
      "dimensions": {
        "width": 562,
        "height": 712
      },
      "alt": "Clinical photograph of a brown and black lesion with an irregular edge and a paler center. No diagnosis is included.",
      "caption": "NCI photograph of a brown lesion. The catalog diagnosis stays hidden until reveal.",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Melanoma,_brown_lesion.jpg"
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Cutaneous melanoma (NCI brown-lesion photograph)",
    "confirmationMethod": "source_dataset_diagnosis",
    "confirmationNotes": "The NCI description titles the image melanoma and repeats an ABCD sentence about asymmetry, border, color, and diameter. It does not state histopathology, and it does not use the word regression. The pale center is described here only as color.",
    "confidenceNote": "Source-catalog diagnosis only. The ABCD sentence is boilerplate across several NCI files and is not treated as a measurement."
  },
  "observations": [
    {
      "id": "obs-g18-05a",
      "kind": "observation",
      "text": "A brown-black lesion with an irregular outline."
    },
    {
      "id": "obs-g18-05b",
      "kind": "observation",
      "text": "The center is paler than the rim."
    },
    {
      "id": "obs-g18-05c",
      "kind": "observation",
      "text": "Fine hairs cross the field. No scale bar is visible."
    }
  ],
  "interpretations": [
    {
      "id": "int-g18-05",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g18-05a",
        "obs-g18-05b"
      ],
      "text": "A pale center inside an irregular rim is a pattern. It is not automatically regression, because this caption does not say regression."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Cutaneous melanoma",
      "supportingFeatures": [
        "Irregular brown-black rim",
        "Source catalog label"
      ],
      "contradictingFeatures": [
        "No pathology report is cited"
      ],
      "teachingDistinction": "The NCI title is melanoma. The pale center is not given a histologic name in that title."
    },
    {
      "diagnosis": "Lichenoid keratosis or inflamed benign lesion",
      "supportingFeatures": [
        "A pale or pink center can be inflammation"
      ],
      "contradictingFeatures": [
        "The source does not describe inflammation"
      ],
      "teachingDistinction": "Pallor has more than one reading."
    },
    {
      "diagnosis": "Scar or treated site",
      "supportingFeatures": [
        "A pale center can be a scar"
      ],
      "contradictingFeatures": [
        "No treatment history is in the caption"
      ],
      "teachingDistinction": "Do not invent a procedure that is not in the source."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g18-05a",
      "title": "Notice first",
      "text": "Compare the rim with the center."
    },
    {
      "id": "tp-g18-05b",
      "title": "Limit",
      "text": "Do not relabel pallor as regression unless the source says so."
    }
  ],
  "observationPrompts": [
    "How does the center compare with the rim?",
    "What name are you tempted to give the pale center, and is that name written in the title?"
  ],
  "hints": [
    "Paler is a color word. Do not upgrade it."
  ],
  "closestMimic": {
    "name": "Lichenoid keratosis or inflamed benign lesion",
    "whyClosest": "A pale center can be inflammation or a treated site. The source does not describe either, and it also does not give the pale center a histologic name."
  },
  "patterns": [
    {
      "id": "pat-g18-05",
      "label": "Pale center inside a darker rim",
      "specificityNote": "Pallor is not specific and is not a synonym for a histologic process in this title.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g18-05-name",
      "label": "A histologic name for the pale center",
      "specificityNote": "The NCI title does not give the pale center a histologic name. Do not supply one.",
      "certainty": "not_visible",
      "weight": "conflicting"
    }
  ],
  "synthesis": "An irregular brown-black lesion has a paler center. The NCI title is melanoma. The repeated ABCD sentence is not a measurement and not histopathology.",
  "evidenceWeighting": "The pale center is clearly visible and is the major clue as a color finding. A histologic name for that center is not in the source, so it gets conflicting weight: it must not be added. The repeated ABCD sentence is not a measurement. The diagnosis weight is the catalog title.",
  "diagnosticTrap": "Calling every pale center regression, or trusting a boilerplate ABCD line as if each letter were measured.",
  "mentorNote": "This photograph is smaller and softer than the other NCI frames. Teach only what remains visible.",
  "takeHomeRule": "A pale center is a color finding until the source gives it another name.",
  "academy": {
    "level": 3,
    "spectrum": "melanoma",
    "teachingType": "reasoning",
    "skillIds": [
      "pale-area",
      "border-irregularity"
    ]
  }
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## case: Red nodule beside a dark macule (`case-g18-06`)

- **Exact fingerprint:** `sha256-v1:e5e1ba1b65fc346eb35338d712e0a13ce817ffe059cbb789414dd93738ffd66c`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Melanoma3.jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "category": "Melanocytic malignancies",
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
  "managementBrief": "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
  "reviewStatus": "clinician review required",
  "clinicalReview": null,
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Skin, site not named on the source",
    "presentationNotes": null
  },
  "id": "case-g18-06",
  "slug": "g18-red-nodule-beside-dark-macule",
  "title": "Red nodule beside a dark macule",
  "diagnosisLabel": "Superficial spreading melanoma with a contiguous nodule",
  "diseaseId": "cutaneous-melanoma",
  "educationalLevel": "intermediate",
  "caseType": "clinical",
  "images": [
    {
      "type": "clinical",
      "license": "Public domain",
      "licenseUrl": "https://www.usa.gov/government-works",
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "modificationsNotes": "Cropped to remove the ruler and handwritten specimen identifiers, then recompressed. The nodule and adjacent dark macule were kept. No annotation was added.",
      "accessDate": "2026-09-30",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "creator": "National Cancer Institute",
      "attribution": "National Cancer Institute. Public domain.",
      "source": "National Cancer Institute, via Wikimedia Commons",
      "consentBasis": "US government public-domain clinical teaching photograph released through NCI Visuals Online and Wikimedia Commons. No name and no full-face portrait are in the frame. NCI AV-8500-3606. Handwritten initials and a date on the original ruler were cropped out.",
      "id": "img-g18-06",
      "src": "assets/media/cases/case-11-clinical.jpg",
      "dimensions": {
        "width": 1400,
        "height": 580
      },
      "alt": "Clinical photograph of a shiny red nodule next to a small dark brown macule, inside a black marker line. The ruler has been removed. No diagnosis is included.",
      "caption": "NCI photograph after removal of the ruler and handwritten specimen identifiers. The catalog text stays hidden until reveal.",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Melanoma3.jpg"
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Advanced malignant melanoma described by NCI as superficial spreading melanoma plaque with a contiguous amelanotic vertical-growth nodule",
    "confirmationMethod": "source_dataset_diagnosis",
    "confirmationNotes": "The NCI description says this is advanced malignant melanoma, with a plaque of radial-growth superficial spreading melanoma beside a pink amelanotic nodule of vertical growth. It does not use the word histopathology. A general sentence in that caption about prognosis and death is a textbook statement, not an outcome recorded for this person, and it is not repeated as this patient's course. The teaching file is cropped to drop handwritten ruler identifiers.",
    "confidenceNote": "Source-catalog diagnosis only. Not a Docutis clinician review and not a pathology report."
  },
  "observations": [
    {
      "id": "obs-g18-06a",
      "kind": "observation",
      "text": "A shiny red nodule is the most raised part of the field."
    },
    {
      "id": "obs-g18-06b",
      "kind": "observation",
      "text": "A smaller dark brown macule sits against that nodule."
    },
    {
      "id": "obs-g18-06c",
      "kind": "observation",
      "text": "Black marker ink outlines the area. The original ruler is not in this file."
    }
  ],
  "interpretations": [
    {
      "id": "int-g18-06",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g18-06a",
        "obs-g18-06b"
      ],
      "text": "A raised red nodule touching a darker macule is a combined pattern. The source, not the outline, assigns the growth-phase names."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Superficial spreading melanoma with a contiguous nodule",
      "supportingFeatures": [
        "Red nodule beside darker pigment",
        "NCI description of radial and vertical growth"
      ],
      "contradictingFeatures": [
        "The caption does not say histopathology"
      ],
      "teachingDistinction": "Use the source's own names after reveal. Do not add a Breslow number."
    },
    {
      "diagnosis": "Pigmented lesion with a separate angioma",
      "supportingFeatures": [
        "A red shiny papule can be vascular"
      ],
      "contradictingFeatures": [
        "The source describes one contiguous lesion, not two unrelated lesions"
      ],
      "teachingDistinction": "Contiguity is the teaching point of the caption."
    },
    {
      "diagnosis": "Nodular basal cell carcinoma",
      "supportingFeatures": [
        "A red nodule can be a keratinocyte tumor"
      ],
      "contradictingFeatures": [
        "The source text is melanoma, not basal cell carcinoma"
      ],
      "teachingDistinction": "A pink nodule is exactly where the mimic matters."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g18-06a",
      "title": "Notice first",
      "text": "Separate the red nodule from the dark macule, then notice that they touch."
    },
    {
      "id": "tp-g18-06b",
      "title": "Limit",
      "text": "Do not turn a general prognosis sentence in an old caption into this person's outcome."
    }
  ],
  "observationPrompts": [
    "How many separate skin findings are inside the inked field?",
    "Which marks are ink rather than skin?"
  ],
  "hints": [
    "Describe the red part and the dark part as two findings."
  ],
  "closestMimic": {
    "name": "Nodular basal cell carcinoma",
    "whyClosest": "A shiny red nodule is where a keratinocyte tumor remains realistic. The source describes one contiguous lesion and does not cite histopathology."
  },
  "patterns": [
    {
      "id": "pat-g18-06",
      "label": "Red nodule touching a dark macule",
      "specificityNote": "The combination is concerning and not specific until the source is read.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g18-06-ink",
      "label": "Marker ink around the field",
      "specificityNote": "Ink is not a clinical border. Treating it as skin gives it conflicting weight.",
      "certainty": "clearly_visible",
      "weight": "conflicting"
    }
  ],
  "synthesis": "The cropped frame shows a shiny red nodule against a dark macule inside marker ink. NCI calls this advanced melanoma with a superficial spreading component and an amelanotic nodule. Histopathology is not stated.",
  "evidenceWeighting": "The red nodule and the dark macule are clearly visible and together are the major clue. Marker ink is clearly visible and conflicting if you read it as a border. Growth-phase names have weight only as NCI wording. The prognostic sentence in the same caption is not evidence about this patient. Histopathology has no weight because it is absent.",
  "diagnosticTrap": "Reading marker ink as a clinical border, or quoting the caption's general death sentence as this patient's result.",
  "mentorNote": "The crop removed initials and a date. It also removed the scale. Do not estimate millimeters from memory of the uncropped file.",
  "takeHomeRule": "A pink nodule beside pigment is described as two findings. Growth-phase labels belong to the source text.",
  "academy": {
    "level": 3,
    "spectrum": "melanoma",
    "teachingType": "reasoning",
    "skillIds": [
      "nodule-beside-macule"
    ]
  }
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## case: Flat brown area beside a blue-black papule (`case-g18-07`)

- **Exact fingerprint:** `sha256-v1:968c9e81909a0354460b487c007bbfffc03c792a0c054d6743bc1e03812ffa17`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Melanoma4.jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "category": "Melanocytic malignancies",
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
  "managementBrief": "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
  "reviewStatus": "clinician review required",
  "clinicalReview": null,
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Skin, site not named on the source",
    "presentationNotes": null
  },
  "id": "case-g18-07",
  "slug": "g18-flat-area-and-dark-papule",
  "title": "Flat brown area beside a blue-black papule",
  "diagnosisLabel": "Superficial spreading melanoma arising from a dysplastic nevus",
  "diseaseId": "cutaneous-melanoma",
  "educationalLevel": "intermediate",
  "caseType": "clinical",
  "images": [
    {
      "type": "clinical",
      "license": "Public domain",
      "licenseUrl": "https://www.usa.gov/government-works",
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
      "accessDate": "2026-09-30",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "creator": "National Cancer Institute",
      "attribution": "National Cancer Institute. Public domain.",
      "source": "National Cancer Institute, via Wikimedia Commons",
      "consentBasis": "US government public-domain clinical teaching photograph released through NCI Visuals Online and Wikimedia Commons. No name and no full-face portrait are in the frame. NCI AV-8500-3699. The arrow is part of the source photograph and was not added by Docutis.",
      "id": "img-g18-07",
      "src": "assets/media/cases/case-12-clinical.jpg",
      "dimensions": {
        "width": 1099,
        "height": 900
      },
      "alt": "Clinical photograph of a blue-black raised area next to a flatter brown area, with a printed arrow and a gray zone. No diagnosis is included.",
      "caption": "NCI photograph with a printed arrow already in the source file. The catalog diagnosis stays hidden until reveal.",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Melanoma4.jpg"
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Superficial spreading melanoma arising from a dysplastic nevus (NCI caption)",
    "confirmationMethod": "source_dataset_diagnosis",
    "confirmationNotes": "The NCI description says superficial spreading melanoma arising from a dysplastic nevus, identifies the 4-by-8-mm pink-tan area at the arrow as the nevus, calls the blue-black area invasive melanoma, and calls the gray area regression. It does not state histopathology. The 4-by-8-mm figure is the caption's measurement, not a new measurement.",
    "confidenceNote": "Source-catalog diagnosis only. Not a Docutis clinician review."
  },
  "observations": [
    {
      "id": "obs-g18-07a",
      "kind": "observation",
      "text": "A printed arrow points at a flatter brown-pink area."
    },
    {
      "id": "obs-g18-07b",
      "kind": "observation",
      "text": "A blue-black raised area with an uneven edge sits next to that flat area."
    },
    {
      "id": "obs-g18-07c",
      "kind": "observation",
      "text": "A gray zone lies along the lower left of the dark area."
    }
  ],
  "interpretations": [
    {
      "id": "int-g18-07",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g18-07a",
        "obs-g18-07b",
        "obs-g18-07c"
      ],
      "text": "A flat pigmented area, a darker raised area, and a gray zone are three separate findings. The source names them. The arrow was already printed on the photograph."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Superficial spreading melanoma arising in a dysplastic nevus",
      "supportingFeatures": [
        "Flat area at the printed arrow",
        "Blue-black raised area",
        "NCI caption"
      ],
      "contradictingFeatures": [
        "Histopathology is not stated"
      ],
      "teachingDistinction": "After reveal, keep the caption's names attached to the areas they name."
    },
    {
      "diagnosis": "Melanoma without a precursor nevus",
      "supportingFeatures": [
        "A dark raised lesion can stand alone"
      ],
      "contradictingFeatures": [
        "The caption specifically describes a nevus at the arrow"
      ],
      "teachingDistinction": "Do not drop the flat component just because the dark papule dominates."
    },
    {
      "diagnosis": "Pigmented basal cell carcinoma",
      "supportingFeatures": [
        "Irregular dark pigment"
      ],
      "contradictingFeatures": [
        "The caption is not a basal cell carcinoma label"
      ],
      "teachingDistinction": "Clinical color does not show leaf-like structures."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g18-07a",
      "title": "Notice first",
      "text": "Use the printed arrow as a pointer, not as a new mark."
    },
    {
      "id": "tp-g18-07b",
      "title": "Limit",
      "text": "Gray color is visible. Calling it regression is the caption's interpretation, and it is not specific."
    }
  ],
  "observationPrompts": [
    "What does the printed arrow point at?",
    "Which area is raised, and which area looks gray?"
  ],
  "hints": [
    "Keep each area separate until the caption names it."
  ],
  "closestMimic": {
    "name": "Pigmented basal cell carcinoma",
    "whyClosest": "Irregular dark pigment can be a pigmented keratinocyte tumor. This clinical frame does not show leaf-like structures, and the caption is not that label."
  },
  "patterns": [
    {
      "id": "pat-g18-07",
      "label": "Flat area, raised dark focus, and gray zone",
      "specificityNote": "Gray color is not specific. A histologic word for the gray area belongs to the caption, not to the gray color alone.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g18-07-arrow",
      "label": "Printed arrow",
      "specificityNote": "The arrow is already in the public-domain file. It is a pointer, not a skin finding, so its weight is weak.",
      "certainty": "clearly_visible",
      "weight": "weak"
    }
  ],
  "synthesis": "The photograph shows a flat brown-pink area at a printed arrow, a blue-black raised area, and a gray zone. NCI calls this superficial spreading melanoma arising in a dysplastic nevus and calls the gray area regression, without a histopathology sentence.",
  "evidenceWeighting": "Three colors and shapes are clearly visible and are the major clue. The printed arrow is visible and weak: it is not skin. The 4-by-8-mm measurement and the caption's word for the gray area have weight only as caption text. Histopathology has no weight because it is absent.",
  "diagnosticTrap": "Adding your own arrow, or treating regression as a diagnosis you made from gray color.",
  "mentorNote": "The arrow is a derivative already present in the public-domain file. Docutis did not draw it.",
  "takeHomeRule": "Map each caption phrase to the area it names. Do not merge them into one word.",
  "academy": {
    "level": 3,
    "spectrum": "melanoma",
    "teachingType": "reasoning",
    "skillIds": [
      "flat-and-raised",
      "pale-area"
    ]
  }
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## case: Single dark papule with a brown edge (`case-g18-08`)

- **Exact fingerprint:** `sha256-v1:468c697b17544f0144e7fced84efad033868ddd8770f41e5d685c62311184902`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Melanoma_(3).jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "category": "Melanocytic malignancies",
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
  "managementBrief": "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
  "reviewStatus": "clinician review required",
  "clinicalReview": null,
  "patientContext": {
    "ageBand": "adult",
    "sex": "female",
    "anatomicalSite": "Back, according to the source narrative",
    "presentationNotes": null
  },
  "id": "case-g18-08",
  "slug": "g18-single-dark-papule",
  "title": "Single dark papule with a brown edge",
  "diagnosisLabel": "Invasive melanoma arising in a dysplastic nevus",
  "diseaseId": "cutaneous-melanoma",
  "educationalLevel": "advanced",
  "caseType": "clinical",
  "images": [
    {
      "type": "clinical",
      "license": "Public domain",
      "licenseUrl": "https://www.usa.gov/government-works",
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
      "accessDate": "2026-09-30",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "creator": "National Cancer Institute",
      "attribution": "National Cancer Institute. Public domain.",
      "source": "National Cancer Institute, via Wikimedia Commons",
      "consentBasis": "US government public-domain clinical teaching photograph released through NCI Visuals Online and Wikimedia Commons. No name and no full-face portrait are in the frame. NCI image 9188. The published file used here is one frame, not a before-and-after pair.",
      "id": "img-g18-08",
      "src": "assets/media/cases/case-13-clinical.jpg",
      "dimensions": {
        "width": 1259,
        "height": 1500
      },
      "alt": "Clinical photograph of one dark blue-black papule with an irregular brown edge on skin. No earlier photograph and no diagnosis are included.",
      "caption": "Single NCI frame. The follow-up story in the catalog is not a second image in this file.",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Melanoma_(3).jpg"
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Invasive malignant melanoma arising in a dysplastic nevus (NCI narrative)",
    "confirmationMethod": "source_dataset_diagnosis",
    "confirmationNotes": "The NCI text says a 40-year-old woman in a melanoma-prone family had moles on the back photographed for follow-up, and that 18 months later the upper nevus had a new 3-mm black nodule which proved to be invasive malignant melanoma arising in a dysplastic nevus. The word histopathology is not used. The file in this case is a single close-up. The earlier cluster, the arrow, and the 18-month interval are narrative, not a second picture here. Age and sex are the source's demographic statement, not identifiers read from the frame.",
    "confidenceNote": "Source narrative only. 'Proved' is not rewritten as a histopathology report."
  },
  "observations": [
    {
      "id": "obs-g18-08a",
      "kind": "observation",
      "text": "One dark blue-black papule."
    },
    {
      "id": "obs-g18-08b",
      "kind": "observation",
      "text": "Brown pigment extends irregularly from that papule."
    },
    {
      "id": "obs-g18-08c",
      "kind": "observation",
      "text": "No second date, no arrow, and no cluster of other moles is visible in this file."
    }
  ],
  "interpretations": [
    {
      "id": "int-g18-08",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g18-08a",
        "obs-g18-08c"
      ],
      "text": "This file shows one papule. A story about change over months is not visible in the pixels."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Invasive melanoma arising in a dysplastic nevus",
      "supportingFeatures": [
        "Dark papule with irregular brown edge",
        "NCI statement that the nodule proved to be invasive melanoma"
      ],
      "contradictingFeatures": [
        "The follow-up pair is not in this file",
        "Histopathology is not named"
      ],
      "teachingDistinction": "Rank this first because of the source narrative, not because the single frame shows 18 months of change."
    },
    {
      "diagnosis": "Inflamed or traumatized nevus",
      "supportingFeatures": [
        "A dark papule can be a nevus that was irritated"
      ],
      "contradictingFeatures": [
        "The source says the nodule proved to be invasive melanoma"
      ],
      "teachingDistinction": "A benign irritated nevus is the mimic the source is overriding with its narrative, not with a visible timeline."
    },
    {
      "diagnosis": "Thrombosed angioma or hemorrhage",
      "supportingFeatures": [
        "Blue-black color can be blood"
      ],
      "contradictingFeatures": [
        "The source diagnosis is melanoma"
      ],
      "teachingDistinction": "Blue-black color is not specific for thrombus."
    }
  ],
  "whyNot": [
    {
      "mimic": "Inflamed nevus",
      "text": "Irritation can darken a nevus, but this caption says the new nodule proved to be invasive melanoma. The photograph alone does not show that proof."
    },
    {
      "mimic": "Hemorrhage or thrombosed angioma",
      "text": "Blue-black color fits blood as well as pigment. Nothing in the frame shows a glass-slide test or a resolving bruise. The source diagnosis is what argues against stopping at blood."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g18-08a",
      "title": "Notice first",
      "text": "Say what this one frame contains, not what the caption remembers."
    },
    {
      "id": "tp-g18-08b",
      "title": "Limit",
      "text": "Do not rewrite 'proved' as histopathology."
    }
  ],
  "observationPrompts": [
    "How many dates or earlier photographs are in this file?",
    "What can you say about change from this frame alone?"
  ],
  "hints": [
    "A follow-up story in the caption is not a second photograph."
  ],
  "closestMimic": {
    "name": "Inflamed or traumatized nevus",
    "whyClosest": "A dark papule with a brown edge can be an irritated nevus. The source narrative is what overrides that mimic, and the narrative is not a visible timeline."
  },
  "patterns": [
    {
      "id": "pat-g18-08",
      "label": "Single dark papule",
      "specificityNote": "A dark papule is not specific. Change over time is not visible here.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g18-08-prior",
      "label": "An earlier photograph of the same papule",
      "specificityNote": "The narrative describes change. This file does not contain the earlier look.",
      "certainty": "not_visible",
      "weight": "conflicting"
    }
  ],
  "synthesis": "One dark papule with a brown edge is visible. The NCI narrative adds a family follow-up story and says the nodule proved to be invasive melanoma in a dysplastic nevus. That narrative is not a second photograph and does not say histopathology.",
  "evidenceWeighting": "Pixels support a dark papule only, and that papule is the major visible clue. An earlier photograph is not in the file, so a change you cannot see gets conflicting weight. The 18-month story, the 3-mm size, and the diagnosis have weight as source text. Histopathology has none. The word proved in the narrative is not a pathology report.",
  "diagnosticTrap": "Teaching a before-and-after lesson from a file that contains only the later look, or upgrading 'proved' into a pathology report.",
  "mentorNote": "This is an evidence-weighting case. If you cannot point to the earlier photo, do not pretend it is on the page.",
  "takeHomeRule": "Separate the frame from the follow-up story, and do not invent the confirmation method.",
  "academy": {
    "level": 4,
    "spectrum": "melanoma",
    "teachingType": "expert-challenge",
    "skillIds": [
      "evidence-weighting",
      "change-not-in-one-photo"
    ]
  }
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## case: Brown patch beside a skin crease (`case-g18-09`)

- **Exact fingerprint:** `sha256-v1:0cf6bdae97039df86713c8ba1e4811b9efffcaf4bfae8a1a50561e7497c20ffc`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Melanoma_with_diameter_change.jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "category": "Melanocytic malignancies",
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
  "managementBrief": "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
  "reviewStatus": "clinician review required",
  "clinicalReview": null,
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Skin beside a crease; the source does not name the site",
    "presentationNotes": null
  },
  "id": "case-g18-09",
  "slug": "g18-brown-patch-by-a-crease",
  "title": "Brown patch beside a skin crease",
  "diagnosisLabel": "Cutaneous melanoma",
  "diseaseId": "cutaneous-melanoma",
  "educationalLevel": "advanced",
  "caseType": "clinical",
  "images": [
    {
      "type": "clinical",
      "license": "Public domain",
      "licenseUrl": "https://www.usa.gov/government-works",
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
      "accessDate": "2026-09-30",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "creator": "National Cancer Institute",
      "attribution": "National Cancer Institute. Public domain.",
      "source": "National Cancer Institute, via Wikimedia Commons",
      "consentBasis": "US government public-domain clinical teaching photograph released through NCI Visuals Online and Wikimedia Commons. No name and no full-face portrait are in the frame. NCI diameter-change teaching image. No face is shown.",
      "id": "img-g18-09",
      "src": "assets/media/cases/case-14-clinical.jpg",
      "dimensions": {
        "width": 1400,
        "height": 934
      },
      "alt": "Clinical photograph of an irregular brown patch on creased skin, with a separate small red spot nearby. No diagnosis is included.",
      "caption": "NCI photograph whose caption mentions a diameter change. The change itself is not a second frame.",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Melanoma_with_diameter_change.jpg"
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Cutaneous melanoma (NCI image described as diameter change)",
    "confirmationMethod": "source_dataset_diagnosis",
    "confirmationNotes": "The NCI description says this is melanoma whose diameter had changed, as part of an ABCD set. A changed diameter is not visible in one photograph. Histopathology is not stated.",
    "confidenceNote": "Source-catalog diagnosis only. The history of change is text, not a measured difference in this file."
  },
  "observations": [
    {
      "id": "obs-g18-09a",
      "kind": "observation",
      "text": "An irregular brown patch lies next to a skin crease."
    },
    {
      "id": "obs-g18-09b",
      "kind": "observation",
      "text": "The patch is darker in the center than at some edges."
    },
    {
      "id": "obs-g18-09c",
      "kind": "observation",
      "text": "A separate small red macule sits nearby. Only one date is in the file."
    }
  ],
  "interpretations": [
    {
      "id": "int-g18-09",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g18-09a",
        "obs-g18-09c"
      ],
      "text": "You can describe the patch. You cannot see that it grew, because growth needs two looks or a stated history."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Cutaneous melanoma",
      "supportingFeatures": [
        "Irregular brown patch",
        "NCI statement that the diameter had changed"
      ],
      "contradictingFeatures": [
        "Change is not visible in this single frame",
        "No histopathology sentence"
      ],
      "teachingDistinction": "The diagnosis and the history of change are both source text."
    },
    {
      "diagnosis": "Seborrheic keratosis",
      "supportingFeatures": [
        "A brown rough patch near a crease can be a seborrheic keratosis"
      ],
      "contradictingFeatures": [
        "The source label is melanoma"
      ],
      "teachingDistinction": "Stuck-on lesions are the mimic. This frame does not show a thick warty plate clearly enough to prefer that mimic over the source."
    },
    {
      "diagnosis": "Solar lentigo",
      "supportingFeatures": [
        "Brown patch on sun-exposed-looking skin"
      ],
      "contradictingFeatures": [
        "The center is darker and less uniform than a typical even lentigo"
      ],
      "teachingDistinction": "Evenness would support a lentigo. It is not what dominates here, and it would still not erase the source label."
    }
  ],
  "whyNot": [
    {
      "mimic": "Seborrheic keratosis",
      "text": "A brown patch can be a seborrheic keratosis. This frame does not show a thick waxy, stuck-on surface as its main feature, and the source calls the lesion melanoma. That is not a probability."
    },
    {
      "mimic": "Solar lentigo",
      "text": "A lentigo is usually a more even brown patch. The darker center argues against stopping at a lentigo, but a single photo still does not show the diameter change the caption mentions."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g18-09a",
      "title": "Notice first",
      "text": "Describe the patch that is actually in the frame."
    },
    {
      "id": "tp-g18-09b",
      "title": "Limit",
      "text": "A caption can assert change that one picture cannot display."
    }
  ],
  "observationPrompts": [
    "Can this single frame show that a diameter changed?",
    "Is the small red macule part of the brown patch, or separate?"
  ],
  "hints": [
    "Do not narrate growth you cannot see."
  ],
  "closestMimic": {
    "name": "Seborrheic keratosis",
    "whyClosest": "A brown patch near a crease can be a seborrheic keratosis. This frame does not show a thick warty plate clearly enough to prefer that mimic over the source label."
  },
  "patterns": [
    {
      "id": "pat-g18-09",
      "label": "Irregular brown patch",
      "specificityNote": "An irregular brown patch is not specific. Change in size is not visible in one frame.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g18-09-change",
      "label": "A second date showing a smaller patch",
      "specificityNote": "The caption says the diameter had changed. This file has only one date.",
      "certainty": "not_visible",
      "weight": "conflicting"
    }
  ],
  "synthesis": "An irregular brown patch is visible beside a crease, with a separate small red macule. NCI calls the lesion melanoma and says the diameter had changed. The change is not in the image.",
  "evidenceWeighting": "Border and color are clearly visible and are the major clue. A second date is not in the file, so visible growth gets conflicting weight: do not pretend to see it. History of growth has weight only as caption text. A nearby red macule is a separate finding, not proof of growth.",
  "diagnosticTrap": "Narrating growth you cannot see, or ignoring a stated history because the picture is static.",
  "mentorNote": "The small red spot is in the frame. Do not fold it into the brown patch without a reason.",
  "takeHomeRule": "One photograph cannot show that a diameter changed.",
  "academy": {
    "level": 4,
    "spectrum": "melanoma",
    "teachingType": "reasoning",
    "skillIds": [
      "change-not-in-one-photo",
      "border-irregularity"
    ]
  }
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## case: Pink nodule inside a drape (`case-g18-10`)

- **Exact fingerprint:** `sha256-v1:fa6449e9d81d83a1884fa7d142eb5f774ac9862773c27e4ef9e76fe93a4062e8`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Amelanotisches,_malignes_Melanom,_%C2%A9wikiderm.de.jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "category": "Melanocytic malignancies",
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
  "managementBrief": "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
  "reviewStatus": "clinician review required",
  "clinicalReview": null,
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Skin, site not named on the source",
    "presentationNotes": null
  },
  "id": "case-g18-10",
  "slug": "g18-pink-nodule-in-a-drape",
  "title": "Pink nodule inside a drape",
  "diagnosisLabel": "Amelanotic melanoma",
  "diseaseId": "cutaneous-melanoma",
  "educationalLevel": "advanced",
  "caseType": "clinical",
  "images": [
    {
      "type": "clinical",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "modificationsNotes": "Resized and recompressed for web delivery (max width 1600 px) and file metadata removed. No crop and no annotation.",
      "accessDate": "2026-09-30",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g18-10",
      "src": "assets/media/cases/case-15-clinical.jpg",
      "dimensions": {
        "width": 1600,
        "height": 1200
      },
      "alt": "Clinical photograph of a shiny pink nodule on skin inside a blue surgical drape, with a few small brown macules nearby. No diagnosis is included.",
      "caption": "Clinician-authored photograph of a pink nodule. The author's diagnosis stays hidden until reveal.",
      "source": "Dr. Thomas Brinkmeier / WIKIDERM, via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Amelanotisches,_malignes_Melanom,_%C2%A9wikiderm.de.jpg",
      "creator": "Dr. Thomas Brinkmeier",
      "attribution": "Dr. Thomas Brinkmeier, WIKIDERM. CC BY 4.0.",
      "consentBasis": "Clinician own-work educational photograph on Wikimedia Commons under CC BY 4.0. The frame is a draped close-up without a face or a name."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Amelanotic melanoma (clinician-authored label)",
    "confirmationMethod": "expert_diagnosis",
    "confirmationNotes": "The Commons description by Dr. Thomas Brinkmeier calls this a macroscopic image of an amelanotic malignant melanoma. Histopathology is not cited. The source does not say the word nodular as a subtype, so nodular subtype is not added even though the lesion is raised. This file is not paired with the separate dermoscopic photograph, because the source does not say they are the same lesion.",
    "confidenceNote": "Expert author label only. Not a Docutis clinician review."
  },
  "observations": [
    {
      "id": "obs-g18-10a",
      "kind": "observation",
      "text": "A shiny pink nodule without brown pigment in the nodule itself."
    },
    {
      "id": "obs-g18-10b",
      "kind": "observation",
      "text": "The surface looks moist, and a little pinkness is at the base."
    },
    {
      "id": "obs-g18-10c",
      "kind": "observation",
      "text": "A blue drape surrounds the field. A few small brown macules are on nearby skin."
    }
  ],
  "interpretations": [
    {
      "id": "int-g18-10",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g18-10a",
        "obs-g18-10b"
      ],
      "text": "Absence of brown pigment does not make a nodule harmless. The author label is a separate fact from the pink color."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Amelanotic melanoma",
      "supportingFeatures": [
        "Pink nodule",
        "Clinician-authored label of amelanotic melanoma"
      ],
      "contradictingFeatures": [
        "No histopathology is cited",
        "Subtype is not stated"
      ],
      "teachingDistinction": "Rank the author's diagnosis first after you have described the lack of pigment."
    },
    {
      "diagnosis": "Nodular basal cell carcinoma",
      "supportingFeatures": [
        "A pink nodule is a common keratinocyte-tumor look"
      ],
      "contradictingFeatures": [
        "The author label is melanoma, not basal cell carcinoma"
      ],
      "teachingDistinction": "This is the main mimic. Vessel clues are not available in this clinical file."
    },
    {
      "diagnosis": "Pyogenic granuloma",
      "supportingFeatures": [
        "A moist red nodule can be a pyogenic granuloma"
      ],
      "contradictingFeatures": [
        "The author label is melanoma"
      ],
      "teachingDistinction": "Bleeding friable nodules overlap. The photograph does not show a collar of scale clearly enough to prefer granuloma."
    }
  ],
  "whyNot": [
    {
      "mimic": "Nodular basal cell carcinoma",
      "text": "A pink nodule is a basal cell carcinoma until proven otherwise in many clinics. Here the author label is amelanotic melanoma, and this clinical frame does not show branching vessels. That does not make the mimic impossible."
    },
    {
      "mimic": "Pyogenic granuloma",
      "text": "A moist red nodule suggests a pyogenic granuloma. A collarette is not clearly recorded in this description, and the source diagnosis is melanoma. Friability alone would not decide it."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g18-10a",
      "title": "Notice first",
      "text": "Say that the nodule itself is pink, not brown."
    },
    {
      "id": "tp-g18-10b",
      "title": "Limit",
      "text": "Do not call it nodular subtype. The source says amelanotic melanoma, and the shape is a nodule."
    }
  ],
  "observationPrompts": [
    "Is there brown pigment inside the nodule itself?",
    "What else around the nodule is drape or background skin?"
  ],
  "hints": [
    "Lack of brown pigment is not a reassuring finding."
  ],
  "closestMimic": {
    "name": "Nodular basal cell carcinoma",
    "whyClosest": "A pink nodule is the common keratinocyte-tumor look. Vessel clues are not available in this clinical file, and the author label is what ranks the source diagnosis."
  },
  "patterns": [
    {
      "id": "pat-g18-10",
      "label": "Pink nodule without pigment",
      "specificityNote": "Lack of pigment is not reassuring and is not specific.",
      "certainty": "clearly_visible",
      "weight": "major"
    }
  ],
  "synthesis": "A shiny pink nodule sits in a drape. Dr. Thomas Brinkmeier labels it amelanotic melanoma. Histopathology and histologic subtype are not stated. A separate dermoscopic file was not assumed to be the same lesion.",
  "evidenceWeighting": "The pink nodule without brown pigment in the nodule is clearly visible and is the major clue. The diagnosis weight is an expert author label. Histopathology has no weight. Nearby brown macules are background, not part of the nodule. No subtype is stated.",
  "diagnosticTrap": "Reassuring yourself because the lesion is not brown, or pairing it with an unmatched dermoscopic image.",
  "mentorNote": "CC BY 4.0 allows a resized derivative. The note records the resize. No marks were drawn.",
  "takeHomeRule": "A pink nodule still needs a melanoma line in the differential. Pigment is not required.",
  "academy": {
    "level": 4,
    "spectrum": "melanoma",
    "teachingType": "reasoning",
    "skillIds": [
      "pink-nodule"
    ]
  }
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## case: Pink field with more than one vessel shape (`case-g18-11`)

- **Exact fingerprint:** `sha256-v1:dd9d39cd1e7acbe3044879a74d5a6f40c38f7243217d38f68e00001c09cc7b3e`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Dermatoskopie-Bild_eines_amelanotischen,_malignen_Melanoms,_%C2%A9wikiderm.de.jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "category": "Melanocytic malignancies",
  "annotations": [],
  "dermoscopicFeatures": [
    {
      "token": "polymorphous_vessels",
      "label": "Dotted and irregular linear red vessels"
    },
    {
      "token": "structureless_areas",
      "label": "Paler pink center inside the marked circle"
    }
  ],
  "clinicalAction": "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
  "managementBrief": "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
  "reviewStatus": "clinician review required",
  "clinicalReview": null,
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Not specified; dermoscopic close-up",
    "presentationNotes": null
  },
  "id": "case-g18-11",
  "slug": "g18-pink-field-with-vessels",
  "title": "Pink field with more than one vessel shape",
  "diagnosisLabel": "Amelanotic melanoma",
  "diseaseId": "cutaneous-melanoma",
  "educationalLevel": "advanced",
  "caseType": "dermoscopic",
  "images": [
    {
      "type": "dermoscopy",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "modificationsNotes": "Resized and recompressed for web delivery (max width 1600 px) and file metadata removed. No crop and no annotation.",
      "accessDate": "2026-09-30",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g18-11",
      "src": "assets/media/cases/case-16-dermoscopy.jpg",
      "dimensions": {
        "width": 1600,
        "height": 1200
      },
      "alt": "Dermoscopic photograph of a pink field with dotted and linear red vessels, a white circular mark, and a 0 to 10 scale. No diagnosis is included.",
      "caption": "Clinician-authored dermoscopic photograph. The author's diagnosis stays hidden until reveal.",
      "source": "Dr. Thomas Brinkmeier / WIKIDERM, via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Dermatoskopie-Bild_eines_amelanotischen,_malignen_Melanoms,_%C2%A9wikiderm.de.jpg",
      "creator": "Dr. Thomas Brinkmeier",
      "attribution": "Dr. Thomas Brinkmeier, WIKIDERM. CC BY 4.0.",
      "consentBasis": "Clinician own-work educational dermoscopy on Wikimedia Commons under CC BY 4.0. No face is in the frame."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Amelanotic melanoma (clinician-authored dermoscopic label)",
    "confirmationMethod": "expert_diagnosis",
    "confirmationNotes": "The Commons description calls this a dermoscopic image of an amelanotic malignant melanoma. Histopathology is not cited. The white circle and 0-10 scale are in the source image. This file is not paired with the clinical nodule photograph, because the source does not state they are the same lesion and the shapes do not match.",
    "confidenceNote": "Expert author label only. Not a Docutis clinician review."
  },
  "observations": [
    {
      "id": "obs-g18-11a",
      "kind": "observation",
      "text": "A round dermoscopic field of pink skin."
    },
    {
      "id": "obs-g18-11b",
      "kind": "observation",
      "text": "Red vessels include both dots and short irregular lines, mostly around a paler pink center."
    },
    {
      "id": "obs-g18-11c",
      "kind": "observation",
      "text": "A white circular mark and a 0 to 10 scale are printed in the image."
    }
  ],
  "interpretations": [
    {
      "id": "int-g18-11",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g18-11b",
        "obs-g18-11c"
      ],
      "text": "More than one vessel shape on a pink field is the dermoscopic finding. The circle is a mark already in the file, not a structure of the lesion."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Amelanotic melanoma",
      "supportingFeatures": [
        "More than one vessel shape",
        "Author label of amelanotic melanoma"
      ],
      "contradictingFeatures": [
        "Vessels are not specific",
        "No histopathology is cited"
      ],
      "teachingDistinction": "The author label is the diagnosis. The vessels are the clue, not proof."
    },
    {
      "diagnosis": "Basal cell carcinoma",
      "supportingFeatures": [
        "Pink field with vessels"
      ],
      "contradictingFeatures": [
        "Classic branching vessels are not the pattern described here"
      ],
      "teachingDistinction": "Compare vessel shape. Branching vessels would push attention toward basal cell carcinoma; mixed dots and lines do not settle it."
    },
    {
      "diagnosis": "Inflamed benign lesion",
      "supportingFeatures": [
        "Dotted vessels occur in inflamed skin"
      ],
      "contradictingFeatures": [
        "The author label is melanoma"
      ],
      "teachingDistinction": "Dotted vessels alone are a famous false friend."
    }
  ],
  "whyNot": [
    {
      "mimic": "Basal cell carcinoma",
      "text": "A pink dermoscopic field can be basal cell carcinoma. This frame's vessels are mixed dots and lines rather than a single arborizing tree, which argues against using basal cell carcinoma as the only reading. It does not exclude it."
    },
    {
      "mimic": "Inflamed benign skin",
      "text": "Dotted vessels are common in inflamed benign lesions. The author label is melanoma, and a paler center with irregular lines is why inflammation is not the whole story. Vessel pattern is not specific."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g18-11a",
      "title": "Notice first",
      "text": "Name the vessel shapes before the diagnosis."
    },
    {
      "id": "tp-g18-11b",
      "title": "Limit",
      "text": "Do not call the white circle a dermoscopic structure. It is a mark in the file."
    }
  ],
  "observationPrompts": [
    "Are the red vessels one shape or more than one?",
    "Which marks are a printed circle or a scale, rather than skin?"
  ],
  "hints": [
    "If you cannot tell dotted from linear, say so. Do not add structures you cannot see."
  ],
  "closestMimic": {
    "name": "Basal cell carcinoma",
    "whyClosest": "A pink field with vessels keeps a keratinocyte tumor in view. Branching vessels are not the pattern described here, and mixed dots and lines do not settle the author label."
  },
  "patterns": [
    {
      "id": "pat-g18-11",
      "label": "Mixed vessel shapes on pink skin",
      "specificityNote": "Mixed vessels raise concern. They are not specific for one tumor and they are not a probability.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g18-11-print",
      "label": "Printed circle and scale",
      "specificityNote": "The circle and the scale are printed in the file. They are not shiny lines and not a skin finding.",
      "certainty": "clearly_visible",
      "weight": "conflicting"
    }
  ],
  "synthesis": "Dermoscopy shows dotted and linear red vessels around a paler pink center, plus a printed circle and scale. The author calls it amelanotic melanoma. Histopathology is not cited, and this is not merged with the clinical nodule file.",
  "evidenceWeighting": "Dotted and linear red vessels are clearly visible and are the major clue. They are not specific, so they do not carry the diagnosis. The author label carries the diagnosis. The printed circle and scale are visible and conflicting if you treat them as structures. Histopathology is not cited.",
  "diagnosticTrap": "Treating any pink vessel pattern as basal cell carcinoma, or treating the printed circle as shiny white lines.",
  "mentorNote": "If you cannot tell dotted from linear in this file, say so. Do not invent milky-red globules.",
  "takeHomeRule": "More than one vessel shape is a clue and it is not specific. Read the source diagnosis separately.",
  "academy": {
    "level": 4,
    "spectrum": "melanoma",
    "teachingType": "expert-challenge",
    "skillIds": [
      "polymorphous-vessels",
      "evidence-weighting"
    ]
  }
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## case: Damaged thumbnail with dark debris (`case-g18-12`)

- **Exact fingerprint:** `sha256-v1:df5e8c0f8b00d121650b1ebeca113eb07f6f8db2562bb13c1846eab19b5135a9`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Melanoma_of_thumb.jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "category": "Melanocytic malignancies",
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
  "managementBrief": "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
  "reviewStatus": "clinician review required",
  "clinicalReview": null,
  "patientContext": {
    "ageBand": "older adult",
    "sex": "female",
    "anatomicalSite": "Thumb nail unit",
    "presentationNotes": null
  },
  "id": "case-g18-12",
  "slug": "g18-damaged-thumb-nail",
  "title": "Damaged thumbnail with dark debris",
  "diagnosisLabel": "Melanoma of the thumb",
  "diseaseId": "acral-melanoma",
  "educationalLevel": "advanced",
  "caseType": "clinical",
  "images": [
    {
      "type": "clinical",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "modificationsNotes": "Resized and recompressed for web delivery (max width 1400 px) and file metadata removed. No crop and no annotation.",
      "accessDate": "2026-09-30",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g18-12",
      "src": "assets/media/cases/case-17-clinical.jpg",
      "dimensions": {
        "width": 1400,
        "height": 1868
      },
      "alt": "Clinical photograph of a thumb with a destroyed nail plate, dark and pale debris, and a small red mark on the nearby skin. No diagnosis is included.",
      "caption": "Commons photograph of a thumb. The one-line source diagnosis stays hidden until reveal.",
      "source": "Wawjak, via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Melanoma_of_thumb.jpg",
      "creator": "Wawjak",
      "attribution": "Wawjak. CC BY 4.0. Via Wikimedia Commons.",
      "consentBasis": "Photograph published by the creator on Wikimedia Commons under CC BY 4.0. The frame shows a thumb and part of a hand, not a face or a name."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Melanoma of the thumb (Commons description)",
    "confirmationMethod": "clinical_diagnosis",
    "confirmationNotes": "The Commons description states melanoma of the thumb of an 82-year-old woman. It does not name a clinician role, histopathology, or an acral-lentiginous subtype. The Docutis disease link is the existing acral melanoma record because that is the nearest condition page, not because the caption used that subtype. The exact age is the source sentence; the case record stores only an older-adult band.",
    "confidenceNote": "Uploader clinical label only. Not histopathology and not a Docutis clinician review."
  },
  "observations": [
    {
      "id": "obs-g18-12a",
      "kind": "observation",
      "text": "The thumbnail plate is largely destroyed or lifted."
    },
    {
      "id": "obs-g18-12b",
      "kind": "observation",
      "text": "Dark brown-black material and pale debris occupy the nail bed area."
    },
    {
      "id": "obs-g18-12c",
      "kind": "observation",
      "text": "A small red mark is on the skin just beyond the nail, and cloth is at the side of the finger."
    }
  ],
  "interpretations": [
    {
      "id": "int-g18-12",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g18-12a",
        "obs-g18-12b"
      ],
      "text": "A destroyed nail with dark debris has a wide differential. A pigmented streak is not described because a clear longitudinal band is not the finding in this frame."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Melanoma of the thumb",
      "supportingFeatures": [
        "Destroyed nail with dark debris",
        "Source statement of thumb melanoma"
      ],
      "contradictingFeatures": [
        "No histopathology",
        "No stated clinician role"
      ],
      "teachingDistinction": "The source diagnosis is used as a clinical label. It is the weakest confirmation method in this academy."
    },
    {
      "diagnosis": "Nail-unit squamous cell carcinoma or other keratinocyte tumor",
      "supportingFeatures": [
        "Nail destruction can be a keratinocyte tumor"
      ],
      "contradictingFeatures": [
        "The source text says melanoma"
      ],
      "teachingDistinction": "Nail destruction is not specific for a melanocytic tumor."
    },
    {
      "diagnosis": "Trauma with hematoma and nail dystrophy",
      "supportingFeatures": [
        "Blood and a broken nail follow injury"
      ],
      "contradictingFeatures": [
        "No injury history is written on the page",
        "The source diagnosis is melanoma"
      ],
      "teachingDistinction": "Do not invent trauma to explain dark nail debris."
    }
  ],
  "whyNot": [
    {
      "mimic": "Subungual hematoma from trauma",
      "text": "Blood under a nail is common and can look black. This frame shows plate destruction and debris rather than a discrete pool of blood with an intact plate, and the source calls it melanoma. A trauma history is not in the caption."
    },
    {
      "mimic": "Nail-unit squamous cell carcinoma",
      "text": "Squamous cell carcinoma destroys nails and can bleed. The source text says melanoma and does not discuss keratinocyte carcinoma. Destruction alone cannot separate them, which is why this label is weak without pathology."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g18-12a",
      "title": "Notice first",
      "text": "Describe the nail plate and the debris. Do not force a longitudinal band you cannot see."
    },
    {
      "id": "tp-g18-12b",
      "title": "Limit",
      "text": "An uploader sentence is not histopathology and not a subtype."
    }
  ],
  "observationPrompts": [
    "What has happened to the nail plate?",
    "Can you point to a pigmented streak on the fold, or would that be a guess?"
  ],
  "hints": [
    "A dramatic nail plate is not a stronger confirmation method."
  ],
  "closestMimic": {
    "name": "Nail-unit squamous cell carcinoma or other keratinocyte tumor",
    "whyClosest": "Nail destruction is shared with keratinocyte tumors and with injury. The source line is a clinical label, which is the weakest confirmation method in this pathway."
  },
  "patterns": [
    {
      "id": "pat-g18-12",
      "label": "Destroyed nail plate with dark debris",
      "specificityNote": "Nail destruction is not specific for a melanocytic tumor.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g18-12-streak",
      "label": "A clear pigmented streak on the nail fold",
      "specificityNote": "A fold streak is not claimed from this frame. Do not supply one.",
      "certainty": "not_visible",
      "weight": "weak"
    }
  ],
  "synthesis": "The thumbnail is destroyed, with dark and pale debris. The Commons line says melanoma of the thumb in an older woman and cites neither histopathology nor a subtype. The acral melanoma record is only the nearest Docutis page.",
  "evidenceWeighting": "Nail destruction is clearly visible and is the major clue. A pigmented fold streak is not claimed, so it stays not visible and weak: do not add it. Diagnostic weight is a one-line clinical label, which is lower than an expert-attributed or pathology-cited source. Subtype has no weight because it is not in the source.",
  "diagnosticTrap": "Diagnosing a stripe that is not there, or treating this uploader line as if it were a pathology report.",
  "mentorNote": "This is the advanced evidence case because the picture is dramatic and the confirmation is thin. Drama is not certainty.",
  "takeHomeRule": "Nail destruction needs a differential. A short source line does not become histopathology.",
  "compareWith": [
    "cmp-nail-color"
  ],
  "academy": {
    "level": 5,
    "spectrum": "melanoma",
    "teachingType": "expert-challenge",
    "skillIds": [
      "nail-unit-damage",
      "evidence-weighting"
    ]
  }
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## case: Small pink scaly spot (`case-g18-13`)

- **Exact fingerprint:** `sha256-v1:0a21243a0e214db5f15f1ae45c5b9a4991cd4a02dffa28d06c91b810708e2b5e`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Basal_cell_carcinoma,_superficial.jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "category": "Keratinocyte carcinomas",
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
  "managementBrief": "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
  "reviewStatus": "clinician review required",
  "clinicalReview": null,
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Skin, site not named on the source",
    "presentationNotes": null
  },
  "id": "case-g18-13",
  "slug": "g18-small-pink-scaly-spot",
  "title": "Small pink scaly spot",
  "diagnosisLabel": "Superficial basal cell carcinoma",
  "diseaseId": "basal-cell-carcinoma",
  "educationalLevel": "intermediate",
  "caseType": "clinical",
  "images": [
    {
      "type": "clinical",
      "license": "Public domain",
      "licenseUrl": "https://www.usa.gov/government-works",
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
      "accessDate": "2026-09-30",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "creator": "Kelly Nelson, National Cancer Institute",
      "attribution": "National Cancer Institute. Public domain.",
      "source": "National Cancer Institute, via Wikimedia Commons",
      "consentBasis": "US government public-domain clinical teaching photograph released through NCI Visuals Online and Wikimedia Commons. No name and no full-face portrait are in the frame. Photographer recorded as Kelly Nelson. NCI image 9236.",
      "id": "img-g18-13",
      "src": "assets/media/cases/case-18-clinical.jpg",
      "dimensions": {
        "width": 720,
        "height": 480
      },
      "alt": "Clinical photograph of a small pink, slightly scaly spot on skin among a few brown macules. No diagnosis is included.",
      "caption": "NCI photograph of a small pink spot. The catalog diagnosis stays hidden until reveal.",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Basal_cell_carcinoma,_superficial.jpg"
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Superficial basal cell carcinoma (NCI label)",
    "confirmationMethod": "source_dataset_diagnosis",
    "confirmationNotes": "The NCI description says a pink, scaly lesion and titles it superficial basal cell carcinoma. Histopathology is not stated.",
    "confidenceNote": "Source-catalog diagnosis only. Not a Docutis clinician review."
  },
  "observations": [
    {
      "id": "obs-g18-13a",
      "kind": "observation",
      "text": "A small pink spot, slightly scaly, on otherwise quiet skin."
    },
    {
      "id": "obs-g18-13b",
      "kind": "observation",
      "text": "It is flat to barely raised rather than a large nodule."
    },
    {
      "id": "obs-g18-13c",
      "kind": "observation",
      "text": "A few unrelated-looking brown macules are in the same field."
    }
  ],
  "interpretations": [
    {
      "id": "int-g18-13",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g18-13a",
        "obs-g18-13b"
      ],
      "text": "A small pink scaly spot is easy to call harmless. The job is to keep a differential, not to be reassured by size."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Superficial basal cell carcinoma",
      "supportingFeatures": [
        "Small pink scaly spot",
        "NCI title"
      ],
      "contradictingFeatures": [
        "No histopathology is stated"
      ],
      "teachingDistinction": "The catalog name is the keratinocyte-tumor label."
    },
    {
      "diagnosis": "Amelanotic melanoma",
      "supportingFeatures": [
        "A pink lesion can be a melanoma without pigment"
      ],
      "contradictingFeatures": [
        "The source title is basal cell carcinoma"
      ],
      "teachingDistinction": "This is why the spot is in the melanoma pathway as a mimic. Size does not remove that line."
    },
    {
      "diagnosis": "Actinic keratosis or dermatitis",
      "supportingFeatures": [
        "Scale on a pink spot can be a keratosis or dermatitis"
      ],
      "contradictingFeatures": [
        "The source title is a carcinoma, not dermatitis"
      ],
      "teachingDistinction": "Scale is shared. Do not stop at dermatitis because the spot is small."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g18-13a",
      "title": "Notice first",
      "text": "Size and scale, not a disease name."
    },
    {
      "id": "tp-g18-13b",
      "title": "Limit",
      "text": "A small pink spot is not a benign conclusion."
    }
  ],
  "observationPrompts": [
    "Is the pink spot small and flat, or a large nodule?",
    "Can you see scale on it?"
  ],
  "hints": [
    "Small size does not end the differential."
  ],
  "closestMimic": {
    "name": "Amelanotic melanoma",
    "whyClosest": "A pink lesion can be a melanocytic tumor without brown pigment. The source title is a keratinocyte tumor, and that safety line is why the spot is on this pathway."
  },
  "patterns": [
    {
      "id": "pat-g18-13",
      "label": "Small pink scaly spot",
      "specificityNote": "Scale on a small pink spot is not specific.",
      "certainty": "clearly_visible",
      "weight": "major"
    }
  ],
  "synthesis": "A small pink scaly spot is visible. NCI calls it superficial basal cell carcinoma and does not cite histopathology. In this pathway it is a mimic, not a melanoma.",
  "evidenceWeighting": "Pink scale on a small spot is clearly visible and is the major clue. The diagnosis is the NCI title. The non-pigmented melanocytic line in the differential is a safety mimic, not a second source diagnosis. Histopathology is not stated.",
  "diagnosticTrap": "Dismissing a small pink spot, or calling it melanoma because you are studying melanoma.",
  "mentorNote": "The photograph is modest. That is acceptable if the finding you teach is actually there.",
  "takeHomeRule": "A small pink scaly spot still has a melanoma line and a keratinocyte-tumor line.",
  "academy": {
    "level": 2,
    "spectrum": "mimic",
    "teachingType": "teaching",
    "skillIds": [
      "pink-scaly-spot"
    ]
  }
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## case: Small eroded spot on the ear (`case-g18-14`)

- **Exact fingerprint:** `sha256-v1:544b35891d3f38761e46fe53fe02161be1e89df9afaed0b61923ce370307d438`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Basal_cell_carcinoma_(1).jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "category": "Keratinocyte carcinomas",
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
  "managementBrief": "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
  "reviewStatus": "clinician review required",
  "clinicalReview": null,
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Ear",
    "presentationNotes": null
  },
  "id": "case-g18-14",
  "slug": "g18-small-eroded-spot-on-the-ear",
  "title": "Small eroded spot on the ear",
  "diagnosisLabel": "Ulcerated basal cell carcinoma",
  "diseaseId": "basal-cell-carcinoma",
  "educationalLevel": "intermediate",
  "caseType": "clinical",
  "images": [
    {
      "type": "clinical",
      "license": "Public domain",
      "licenseUrl": "https://www.usa.gov/government-works",
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
      "accessDate": "2026-09-30",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "creator": "Kelly Nelson, National Cancer Institute",
      "attribution": "National Cancer Institute. Public domain.",
      "source": "National Cancer Institute, via Wikimedia Commons",
      "consentBasis": "US government public-domain clinical teaching photograph released through NCI Visuals Online and Wikimedia Commons. No name and no full-face portrait are in the frame. Photographer recorded as Kelly Nelson. NCI image 9235. The frame shows an ear and hair, not a full face.",
      "id": "img-g18-14",
      "src": "assets/media/cases/case-19-clinical.jpg",
      "dimensions": {
        "width": 1025,
        "height": 684
      },
      "alt": "Clinical photograph of an ear held by fingers, with a small red eroded spot on the ear. Hair is at the edge. No diagnosis is included.",
      "caption": "NCI photograph of an ear. The catalog diagnosis stays hidden until reveal.",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Basal_cell_carcinoma_(1).jpg"
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Ulcerated basal cell carcinoma (NCI label)",
    "confirmationMethod": "source_dataset_diagnosis",
    "confirmationNotes": "The NCI description says a red, ulcerated lesion on the right ear with a white border and calls it ulcerated basal cell carcinoma with a pearly rim. Histopathology is not stated. The erosion is the obvious finding; a pearly rim is the caption's phrase and is not upgraded beyond that.",
    "confidenceNote": "Source-catalog diagnosis only. Not a Docutis clinician review."
  },
  "observations": [
    {
      "id": "obs-g18-14a",
      "kind": "observation",
      "text": "The frame is an ear held by fingers, with hair at the edge."
    },
    {
      "id": "obs-g18-14b",
      "kind": "observation",
      "text": "A small red eroded spot is on the ear."
    },
    {
      "id": "obs-g18-14c",
      "kind": "observation",
      "text": "The spot is focal rather than a large ulcer."
    }
  ],
  "interpretations": [
    {
      "id": "int-g18-14",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g18-14b",
        "obs-g18-14c"
      ],
      "text": "A small erosion on the ear is the finding. Sun-exposed skin does not tell you which tumor it is."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Ulcerated basal cell carcinoma",
      "supportingFeatures": [
        "Small red erosion on the ear",
        "NCI title"
      ],
      "contradictingFeatures": [
        "Histopathology is not stated"
      ],
      "teachingDistinction": "The catalog name includes ulcerated basal cell carcinoma. Pearly rim is caption language."
    },
    {
      "diagnosis": "Amelanotic melanoma",
      "supportingFeatures": [
        "A red eroded papule can be a melanoma without pigment"
      ],
      "contradictingFeatures": [
        "The source title is basal cell carcinoma"
      ],
      "teachingDistinction": "Ear lesions are a classic place not to drop the melanoma line."
    },
    {
      "diagnosis": "Chondrodermatitis or traumatized skin",
      "supportingFeatures": [
        "The ear is easy to injure"
      ],
      "contradictingFeatures": [
        "The source title is a carcinoma"
      ],
      "teachingDistinction": "Pain and a history of pressure are not in this caption."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g18-14a",
      "title": "Notice first",
      "text": "Site is the ear. The finding is a small erosion."
    },
    {
      "id": "tp-g18-14b",
      "title": "Limit",
      "text": "Do not insist on a pearly rim if you are not sure you see it. The caption says it; your eyes still have to agree."
    }
  ],
  "observationPrompts": [
    "Is the red spot a small erosion or a large ulcer?",
    "What else is in the frame that is not the spot?"
  ],
  "hints": [
    "Describe the erosion before you choose a name."
  ],
  "closestMimic": {
    "name": "Amelanotic melanoma",
    "whyClosest": "A red eroded papule on the ear can be a non-pigmented melanocytic tumor. The source title is a keratinocyte tumor, and the melanoma line stays because the site is a classic place not to drop it."
  },
  "patterns": [
    {
      "id": "pat-g18-14",
      "label": "Small erosion on the ear",
      "specificityNote": "A small erosion is not specific.",
      "certainty": "clearly_visible",
      "weight": "major"
    }
  ],
  "synthesis": "A small red erosion is visible on an ear. NCI calls it ulcerated basal cell carcinoma and mentions a pearly rim. Histopathology is not stated. It is a mimic in this pathway.",
  "evidenceWeighting": "The small erosion and the ear site are clearly visible. The erosion is the major clue. A pearly rim has weight only as caption text, not as a structure drawn on the image. Histopathology is not stated. The non-pigmented melanocytic differential is a safety line, not a second label.",
  "diagnosticTrap": "Calling every ear papule a basal cell carcinoma and dropping melanoma, or claiming a pearly rim you cannot see.",
  "mentorNote": "The partial ear and hair are not a named portrait. No name is in the file.",
  "takeHomeRule": "On the ear, describe the erosion and keep both a keratinocyte tumor and a non-pigmented melanoma in mind.",
  "academy": {
    "level": 2,
    "spectrum": "mimic",
    "teachingType": "teaching",
    "skillIds": [
      "eroded-papule"
    ]
  }
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## case: Shiny red papule on hair-bearing skin (`case-g18-15`)

- **Exact fingerprint:** `sha256-v1:ccaec047bb43b9623742354d0a039a6e1b32ae3ab116d81eb8fea09785ca8290`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Basal_cell_carcinoma_(2).jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "category": "Keratinocyte carcinomas",
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
  "managementBrief": "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
  "reviewStatus": "clinician review required",
  "clinicalReview": null,
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Lower back, according to the source label",
    "presentationNotes": null
  },
  "id": "case-g18-15",
  "slug": "g18-shiny-red-papule",
  "title": "Shiny red papule on hair-bearing skin",
  "diagnosisLabel": "Basal cell carcinoma",
  "diseaseId": "basal-cell-carcinoma",
  "educationalLevel": "intermediate",
  "caseType": "clinical",
  "images": [
    {
      "type": "clinical",
      "license": "Public domain",
      "licenseUrl": "https://www.usa.gov/government-works",
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "modificationsNotes": "Cropped to remove the handwritten date and site label, then recompressed. The red papule was kept. No annotation was added. The source text places the lesion on the lower back.",
      "accessDate": "2026-09-30",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "creator": "National Cancer Institute",
      "attribution": "National Cancer Institute. Public domain.",
      "source": "National Cancer Institute, via Wikimedia Commons",
      "consentBasis": "US government public-domain clinical teaching photograph released through NCI Visuals Online and Wikimedia Commons. No name and no full-face portrait are in the frame. NCI image 2164. The handwritten date and site card were cropped out.",
      "id": "img-g18-15",
      "src": "assets/media/cases/case-20-clinical.jpg",
      "dimensions": {
        "width": 1400,
        "height": 674
      },
      "alt": "Clinical photograph of a shiny red round papule on hair-bearing skin. The handwritten label has been removed. No diagnosis is included.",
      "caption": "NCI photograph after the handwritten date and site label were cropped off. The catalog diagnosis stays hidden until reveal.",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Basal_cell_carcinoma_(2).jpg"
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Basal cell carcinoma (NCI clinical description)",
    "confirmationMethod": "source_dataset_diagnosis",
    "confirmationNotes": "The NCI description says a small reddish or brownish papule, often with telangiectatic vessels, which may look translucent or pearly, with a possible central depression and rolled borders. The title context is basal cell carcinoma. Histopathology is not stated in that caption. Telangiectasia and a pearly quality are caption language; this teaching note does not claim every one of those structures is obvious after the crop.",
    "confidenceNote": "Source-catalog diagnosis only. Not a Docutis clinician review."
  },
  "observations": [
    {
      "id": "obs-g18-15a",
      "kind": "observation",
      "text": "A solitary shiny red papule on hair-bearing skin."
    },
    {
      "id": "obs-g18-15b",
      "kind": "observation",
      "text": "The papule is round and raised, with a bright uneven top."
    },
    {
      "id": "obs-g18-15c",
      "kind": "observation",
      "text": "The handwritten card and ruler from the original file are not in this crop."
    }
  ],
  "interpretations": [
    {
      "id": "int-g18-15",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g18-15a",
        "obs-g18-15b"
      ],
      "text": "A solitary shiny red papule is a pattern shared by several tumors. Hair around it is background, not a diagnosis."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Basal cell carcinoma",
      "supportingFeatures": [
        "Shiny red papule",
        "NCI description of a basal cell carcinoma papule"
      ],
      "contradictingFeatures": [
        "Histopathology is not stated",
        "Not every caption feature is equally obvious"
      ],
      "teachingDistinction": "The source diagnosis is the keratinocyte tumor. Do not add vessels you are unsure about."
    },
    {
      "diagnosis": "Amelanotic melanoma",
      "supportingFeatures": [
        "A red papule can be a melanoma without pigment"
      ],
      "contradictingFeatures": [
        "The source text describes basal cell carcinoma"
      ],
      "teachingDistinction": "This mimic relationship is the reason the case is in the pathway."
    },
    {
      "diagnosis": "Pyogenic granuloma",
      "supportingFeatures": [
        "A bright red papule can be a pyogenic granuloma"
      ],
      "contradictingFeatures": [
        "The source text is basal cell carcinoma"
      ],
      "teachingDistinction": "A moist bleeding papule overlaps. A collarette is not recorded as the main finding here."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g18-15a",
      "title": "Notice first",
      "text": "Solitary, red, shiny, raised."
    },
    {
      "id": "tp-g18-15b",
      "title": "Limit",
      "text": "If you cannot see vessels, do not draw them in words."
    }
  ],
  "observationPrompts": [
    "Is the papule solitary, shiny, and red?",
    "Which parts of the original file are missing from this crop?"
  ],
  "hints": [
    "Do not add vessels to match a textbook sentence."
  ],
  "closestMimic": {
    "name": "Amelanotic melanoma",
    "whyClosest": "A solitary red papule can be a melanocytic tumor without pigment. The source text describes a keratinocyte tumor, which is why both lines stay open."
  },
  "patterns": [
    {
      "id": "pat-g18-15",
      "label": "Solitary shiny red papule",
      "specificityNote": "A shiny red papule is not specific.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g18-15-vessels",
      "label": "Vessels on the papule",
      "specificityNote": "Count a vessel only if you can see it. The caption mentions vessels as a general feature, which is not the same as a vessel you have confirmed.",
      "certainty": "uncertain",
      "weight": "weak"
    }
  ],
  "synthesis": "A shiny red papule remains after the label was cropped off. NCI describes a basal cell carcinoma papule and mentions vessels and a pearly look as general features. Histopathology is not stated.",
  "evidenceWeighting": "The shiny red papule is clearly visible and is the major clue. Vessels are uncertain in this crop, so they stay weak and are not confirmed. Caption phrases about pearliness are not given extra weight beyond what a viewer can confirm. The site is source text because the card was removed. Histopathology is not stated.",
  "diagnosticTrap": "Inventing telangiectasia to match a textbook sentence, or forgetting melanoma because the papule is red.",
  "mentorNote": "The crop is a de-identification edit of a date card, not a clinical annotation.",
  "takeHomeRule": "A shiny red papule keeps amelanotic melanoma in the differential even when the source says basal cell carcinoma.",
  "academy": {
    "level": 3,
    "spectrum": "mimic",
    "teachingType": "teaching",
    "skillIds": [
      "shiny-red-papule"
    ]
  }
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## case: Nodule with a dark plugged center (`case-g18-16`)

- **Exact fingerprint:** `sha256-v1:ecfaa33bc932608d32ee6c9e23dd9a8d4fc06d064c22d8d4d277c64a29541004`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Keratoacanthoma.jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "category": "Keratinocyte carcinomas",
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "After reveal, open the linked Docutis condition record for reference context. Do not treat from this case.",
  "managementBrief": "Management is not chosen from this photograph. Concerning pigmented, pink, or nail-unit lesions are assessed in clinic. When melanoma is suspected, histopathology is the usual confirmation. This brief is not a protocol, not a probability, and remains review required.",
  "reviewStatus": "clinician review required",
  "clinicalReview": null,
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Skin, site not named on the source",
    "presentationNotes": null
  },
  "id": "case-g18-16",
  "slug": "g18-nodule-with-a-dark-center",
  "title": "Nodule with a dark plugged center",
  "diagnosisLabel": "Keratoacanthoma",
  "diseaseId": "keratoacanthoma",
  "educationalLevel": "advanced",
  "caseType": "clinical",
  "images": [
    {
      "type": "clinical",
      "license": "Public domain",
      "licenseUrl": "https://www.usa.gov/government-works",
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation. The source scan is already low resolution.",
      "accessDate": "2026-09-30",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "creator": "Armed Forces Institute of Pathology",
      "attribution": "Armed Forces Institute of Pathology. Public domain.",
      "source": "Armed Forces Institute of Pathology Atlas of Tumor Pathology, via Wikimedia Commons",
      "consentBasis": "US federal Armed Forces Institute of Pathology teaching plate released as a public-domain Commons file. No name and no face are in the frame.",
      "id": "img-g18-16",
      "src": "assets/media/cases/case-21-clinical.jpg",
      "dimensions": {
        "width": 632,
        "height": 512
      },
      "alt": "Clinical photograph of a round red nodule with a dark, rough center. The image is soft. No diagnosis is included.",
      "caption": "AFIP atlas plate of a clinical nodule. The plate's diagnosis stays hidden until reveal.",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Keratoacanthoma.jpg"
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Keratoacanthoma (AFIP clinical plate)",
    "confirmationMethod": "source_dataset_diagnosis",
    "confirmationNotes": "The Commons description says the plate illustrates a keratoacanthoma in a section on clinical manifestations of epidermal neoplasms, from the AFIP Atlas of Tumor Pathology. It does not quote a microscopy report, so histopathology is not claimed even though the book is a tumor atlas.",
    "confidenceNote": "Atlas label only. Not a Docutis clinician review."
  },
  "observations": [
    {
      "id": "obs-g18-16a",
      "kind": "observation",
      "text": "A round red nodule fills most of the frame."
    },
    {
      "id": "obs-g18-16b",
      "kind": "observation",
      "text": "The center is darker and looks plugged or crater-like."
    },
    {
      "id": "obs-g18-16c",
      "kind": "observation",
      "text": "The photograph is soft and low in detail. Fine vessels are not resolved."
    }
  ],
  "interpretations": [
    {
      "id": "int-g18-16",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g18-16a",
        "obs-g18-16b"
      ],
      "text": "A crater or plug is a shape. It is shared by more than one keratinizing tumor and can be confused with a pigmented nodule."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Keratoacanthoma",
      "supportingFeatures": [
        "Crater-like dark center",
        "AFIP plate label"
      ],
      "contradictingFeatures": [
        "No microscopy quote",
        "Image detail is limited"
      ],
      "teachingDistinction": "The atlas label is keratoacanthoma. The shape is what you can check."
    },
    {
      "diagnosis": "Nodular melanoma",
      "supportingFeatures": [
        "A dark raised center can be a melanoma nodule"
      ],
      "contradictingFeatures": [
        "The plate label is keratoacanthoma"
      ],
      "teachingDistinction": "This is the melanoma trap. A dark center is not pigment until you can say so, and this file is too soft to map dermoscopic pigment."
    },
    {
      "diagnosis": "Cutaneous squamous cell carcinoma",
      "supportingFeatures": [
        "Keratinizing nodules overlap with keratoacanthoma"
      ],
      "contradictingFeatures": [
        "The plate says keratoacanthoma rather than squamous cell carcinoma"
      ],
      "teachingDistinction": "Many practices treat that overlap as a pathology question. This caption does not resolve it with a quote from a report."
    }
  ],
  "whyNot": [
    {
      "mimic": "Nodular melanoma",
      "text": "A dark nodule is where nodular melanoma hides. This plate is labeled keratoacanthoma, and the dark center reads as a plug in a red rim rather than as an irregular brown plaque. The file is too soft to exclude melanoma by pattern alone."
    },
    {
      "mimic": "Squamous cell carcinoma",
      "text": "Keratoacanthoma and squamous cell carcinoma overlap clinically. The atlas title chooses keratoacanthoma and does not quote a microscopy report, so the separation is the label plus the crater shape, not a Docutis pathology review."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g18-16a",
      "title": "Notice first",
      "text": "Red rim, dark center, round outline."
    },
    {
      "id": "tp-g18-16b",
      "title": "Limit",
      "text": "An atlas plate is not the same sentence as a histopathology report."
    }
  ],
  "observationPrompts": [
    "What shape is the center of the nodule?",
    "Is the photograph sharp enough to name fine vessels?"
  ],
  "hints": [
    "A plugged center is a shape. Sharpness is not a report."
  ],
  "closestMimic": {
    "name": "Nodular melanoma",
    "whyClosest": "A dark raised center can be a melanocytic nodule. This file is too soft to map dermoscopic pigment, and the plate label is not that diagnosis."
  },
  "patterns": [
    {
      "id": "pat-g18-16",
      "label": "Crater or plug in a red nodule",
      "specificityNote": "A crater is not specific for one keratinizing tumor and is not proof against a melanocytic nodule. Detail is limited.",
      "certainty": "probably",
      "weight": "major"
    },
    {
      "id": "pat-g18-16-vessels",
      "label": "Fine surface vessels",
      "specificityNote": "This file does not resolve fine vessels. Do not add them.",
      "certainty": "not_visible",
      "weight": "weak"
    }
  ],
  "synthesis": "A soft photograph shows a round red nodule with a dark center. The AFIP plate says keratoacanthoma and does not quote microscopy. It is the crateriform mimic in this pathway.",
  "evidenceWeighting": "The crater shape is the major clue and is only probably resolved, because the photograph is soft. Fine vessels are not visible, so they get weak weight and must not be named. The diagnosis is the atlas label. Histopathology is not quoted, so it is not counted.",
  "diagnosticTrap": "Calling every dark nodule melanoma, or calling every crater a keratoacanthoma without reading the label's limits.",
  "mentorNote": "Low resolution was accepted because the crater is still the teaching point and better licensed crater images were not added as filler.",
  "takeHomeRule": "A plugged center is a shape. Read the source label, and do not pretend a tumor atlas sentence is a slide review.",
  "academy": {
    "level": 4,
    "spectrum": "mimic",
    "teachingType": "reasoning",
    "skillIds": [
      "crateriform-center"
    ]
  }
}
```

</details>

- Verdict:
- Reviewed sections:
- Evidence sources actually checked:
- Approved exact replacement wording (if any):
- Required corrections / rejected claims:
- Public reviewer notes:

## case: Five looks in one teaching plate (`case-g21-01`)

- **Exact fingerprint:** `sha256-v1:bd05c875530fbd07fac02f6569c57a0fe13e9abd2e123a51370e0676dfa09e36`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Normal_mole_(1).jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g21-01",
  "slug": "g21-five-looks-in-one-plate",
  "title": "Five looks in one teaching plate",
  "diagnosisLabel": "Common acquired nevus",
  "diseaseId": "melanocytic-nevus",
  "category": "Benign melanocytic",
  "educationalLevel": "introductory",
  "caseType": "clinical",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Skin, site not named on the source",
    "presentationNotes": null
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "accessDate": "2026-10-01",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g21-01",
      "type": "clinical",
      "src": "assets/media/cases/case-22-clinical.jpg",
      "dimensions": {
        "width": 1600,
        "height": 1517
      },
      "alt": "A plate of five clinical photographs: small brown spots, a larger brown spot, two dark raised spots, and a pale pink papule. No diagnosis is included.",
      "caption": "NCI teaching plate of the range of ordinary moles. The catalog label stays hidden until reveal.",
      "source": "National Cancer Institute, via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Normal_mole_(1).jpg",
      "creator": "National Cancer Institute",
      "license": "Public domain",
      "licenseUrl": "https://www.usa.gov/government-works",
      "attribution": "National Cancer Institute. Public domain.",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation. The longest edge was limited to 1600 pixels.",
      "consentBasis": "US government public-domain teaching plate released through NCI Visuals Online and Wikimedia Commons under PD-USGov-HHS-NIH. No name and no portrait are in the frame."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Common acquired nevi (NCI normal-mole teaching plate)",
    "confirmationMethod": "source_dataset_diagnosis",
    "confirmationNotes": "The NCI caption calls this the natural history of common acquired nevi and says the panels are ordinary moles, from a small macule to a pale papule. The same caption assigns junctional, compound, and dermal names. This file has no histopathology image, so those histologic words are not re-verified and are not used as the case method.",
    "confidenceNote": "Source-catalog diagnosis only. Not a Docutis clinician review. Not histopathology."
  },
  "observations": [
    {
      "id": "obs-g21-01a",
      "kind": "observation",
      "text": "The file is a plate of five separate photographs, not one lesion."
    },
    {
      "id": "obs-g21-01b",
      "kind": "observation",
      "text": "Some panels are small brown spots. One panel is a dark raised papule. One panel is a pale pink papule."
    }
  ],
  "interpretations": [
    {
      "id": "int-g21-01",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g21-01a",
        "obs-g21-01b"
      ],
      "text": "The plate shows a range of looks. A dark papule in one panel does not borrow a benign reading from a small brown spot in another panel."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Common acquired nevus",
      "supportingFeatures": [
        "The source caption names ordinary moles and shows more than one look"
      ],
      "contradictingFeatures": [
        "No histopathology image is in the file"
      ],
      "teachingDistinction": "The plate is the source's range of ordinary moles. It is not one patient's history."
    },
    {
      "diagnosis": "Invasive melanoma arising in a dysplastic nevus",
      "supportingFeatures": [
        "One panel is a solitary dark papule"
      ],
      "contradictingFeatures": [
        "The other panels are small brown spots and a pale papule, and the caption is not that melanoma label"
      ],
      "teachingDistinction": "One dark panel can resemble a melanoma photograph. The rest of the plate is not that case."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g21-01a",
      "title": "Notice first",
      "text": "Count the panels. Say which are flat and brown, which is dark and raised, and which is pale."
    },
    {
      "id": "tp-g21-01b",
      "title": "Limit",
      "text": "A benign-looking panel is not a guarantee, and it does not clear the dark panel. The histologic names in the caption are not a slide."
    }
  ],
  "observationPrompts": [
    "How many separate photographs are in the file?",
    "Which panel is a dark raised spot, and which is pale?"
  ],
  "hints": [
    "Do not let the smallest brown spot answer for the dark papule."
  ],
  "closestMimic": {
    "name": "Invasive melanoma arising in a dysplastic nevus",
    "whyClosest": "One panel is a solitary dark papule. That is the look of the library case with that recorded diagnosis. The other panels are not that lesion."
  },
  "patterns": [
    {
      "id": "pat-g21-01-macule",
      "label": "Small brown macules",
      "specificityNote": "Small brown macules are in this plate. Size and a brown color do not prove a benign outcome.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g21-01-papule",
      "label": "Dark raised papule in one panel",
      "specificityNote": "One panel is a solitary dark papule. It does not inherit a benign reading from the other panels.",
      "certainty": "clearly_visible",
      "weight": "supportive"
    },
    {
      "id": "pat-g21-01-pale",
      "label": "Pale papule in one panel",
      "specificityNote": "The pale panel is not a pale center inside a darker rim.",
      "certainty": "clearly_visible",
      "weight": "weak"
    }
  ],
  "synthesis": "The NCI plate is a range of ordinary-mole looks, including a dark papule and a pale papule. The caption's histologic names are not a slide in this file.",
  "evidenceWeighting": "The small brown macules carry the major weight for what the caption is illustrating. The dark papule is supportive of the trap, not proof of a second diagnosis. The pale papule is a weak extra look. None of these weights is a probability.",
  "diagnosticTrap": "Treating the calmest panel as proof that the dark panel is harmless.",
  "mentorNote": "This is a composite plate. Sites are not named. Do not turn five photographs into one patient's story.",
  "takeHomeRule": "A benign source label on a plate is not a guarantee for every panel, and not a guarantee for the next lesion you see.",
  "compareWith": [
    "cmp-nevus-dark-papule"
  ],
  "academy": {
    "level": 1,
    "spectrum": "mimic",
    "teachingType": "teaching",
    "skillIds": [
      "nevus-range"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "No condition monograph is stored for this teaching diagnosis. Do not treat from this case.",
  "managementBrief": "No management category is stored. A source label, including a benign label, is not a decision to reassure, monitor, perform dermoscopy, biopsy, or refer. This brief is not a protocol and remains review required.",
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

## case: Rough brown papule (`case-g21-02`)

- **Exact fingerprint:** `sha256-v1:4a3e66f08339888dab9b6f878837e044b5a6232873e2db5288266a731fcd3126`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Seborrheic_keratosis_closup.jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g21-02",
  "slug": "g21-rough-brown-papule",
  "title": "Rough brown papule",
  "diagnosisLabel": "Seborrheic keratosis",
  "diseaseId": "seborrheic-keratosis",
  "category": "Benign keratinocytic",
  "educationalLevel": "introductory",
  "caseType": "clinical",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Skin, site not named on the source",
    "presentationNotes": null
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "accessDate": "2026-10-01",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g21-02",
      "type": "clinical",
      "src": "assets/media/cases/case-23-clinical.jpg",
      "dimensions": {
        "width": 1449,
        "height": 1265
      },
      "alt": "Close clinical photograph of a rough brown oval lesion with an uneven surface on otherwise even skin. No diagnosis is included.",
      "caption": "Close clinical photograph. The uploader's diagnosis stays hidden until reveal.",
      "source": "Assafn, via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Seborrheic_keratosis_closup.jpg",
      "creator": "Assafn",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "attribution": "Assafn, via Wikimedia Commons. CC BY-SA 4.0.",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
      "consentBasis": "Uploader published this own photograph under CC BY-SA 4.0. The frame is a skin close-up without a face. No separate patient-consent document is on the file page."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Seborrheic keratosis",
    "confirmationMethod": "clinical_diagnosis",
    "confirmationNotes": "The Commons description says seborrheic keratosis close-up. It does not state histopathology or name a body site.",
    "confidenceNote": "Uploader clinical label only. Not a Docutis clinician review and not histopathology."
  },
  "observations": [
    {
      "id": "obs-g21-02a",
      "kind": "observation",
      "text": "A single brown oval lesion sits on otherwise even skin."
    },
    {
      "id": "obs-g21-02b",
      "kind": "observation",
      "text": "The surface is rough, with lighter tan and darker brown areas, and the edge looks as if the lesion sits on the skin."
    }
  ],
  "interpretations": [
    {
      "id": "int-g21-02",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g21-02a",
        "obs-g21-02b"
      ],
      "text": "A rough surface and more than one brown color can be shared with a suspicious pigmented lesion. The surface has to be described before a name is chosen."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Seborrheic keratosis",
      "supportingFeatures": [
        "Rough surface",
        "Edge that looks stuck on the skin",
        "Uploader label"
      ],
      "contradictingFeatures": [
        "No histopathology is stated"
      ],
      "teachingDistinction": "The label matches the stuck-on rough surface. The label is still a clinical caption."
    },
    {
      "diagnosis": "Cutaneous melanoma",
      "supportingFeatures": [
        "More than one brown color",
        "An outline that is not a perfect oval"
      ],
      "contradictingFeatures": [
        "The surface is rough and stuck-on rather than a flat dark macule in this frame"
      ],
      "teachingDistinction": "Shared color is not the whole reading. The rough surface is the point of the comparison."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g21-02a",
      "title": "Notice first",
      "text": "Say whether the surface is smooth or rough, and whether the edge looks stuck on."
    },
    {
      "id": "tp-g21-02b",
      "title": "Limit",
      "text": "A stuck-on look is not proof of a benign lesion, and a benign caption is not a guarantee about a different lesion."
    }
  ],
  "observationPrompts": [
    "Is the surface smooth or rough?",
    "Does the edge look as if it sits on the skin?"
  ],
  "hints": [
    "Look at the surface before you settle on a color story."
  ],
  "closestMimic": {
    "name": "Cutaneous melanoma",
    "whyClosest": "More than one brown color and an uneven outline are the looks already used on cutaneous melanoma cases in this library. This frame adds a rough stuck-on surface those frames do not show."
  },
  "patterns": [
    {
      "id": "pat-g21-02-surface",
      "label": "Rough stuck-on surface",
      "specificityNote": "A rough surface that looks stuck on is a clue. It is not proof of a benign lesion.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g21-02-color",
      "label": "More than one brown color",
      "specificityNote": "Tan and darker brown are both visible. Shared color is not a diagnosis.",
      "certainty": "clearly_visible",
      "weight": "supportive"
    }
  ],
  "synthesis": "The caption says seborrheic keratosis. The frame shows a rough brown papule with more than one brown color. Color overlap with melanoma cases is real. The rough surface is what this frame adds.",
  "evidenceWeighting": "The rough stuck-on surface is the major clue. The second brown color is supportive and is also seen on melanoma cases, so it does not settle the reading. No histology is in the caption.",
  "diagnosticTrap": "Stopping at the first familiar benign name because the colors look like a melanoma photograph, or the reverse: ignoring a rough surface because the colors worry you.",
  "mentorNote": "The uploader did not name a site and did not cite a pathology report. Do not add either.",
  "takeHomeRule": "Describe the surface. A benign caption does not make the next rough brown lesion safe.",
  "compareWith": [
    "cmp-sk-color",
    "cmp-sk-border"
  ],
  "academy": {
    "level": 2,
    "spectrum": "mimic",
    "teachingType": "teaching",
    "skillIds": [
      "stuck-on-surface"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "No condition monograph is stored for this teaching diagnosis. Do not treat from this case.",
  "managementBrief": "No management category is stored. A source label, including a benign label, is not a decision to reassure, monitor, perform dermoscopy, biopsy, or refer. This brief is not a protocol and remains review required.",
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

## case: Ridged surface under a dermatoscope (`case-g21-03`)

- **Exact fingerprint:** `sha256-v1:891b582114730b0e673b6db39d829d793556c5fac43a53e30b99ec8faf67e84c`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Dermatoscopy_SebK.jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g21-03",
  "slug": "g21-ridged-dermoscopic-surface",
  "title": "Ridged surface under a dermatoscope",
  "diagnosisLabel": "Seborrheic keratosis",
  "diseaseId": "seborrheic-keratosis",
  "category": "Benign keratinocytic",
  "educationalLevel": "intermediate",
  "caseType": "dermoscopic",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Not specified; dermoscopic close-up",
    "presentationNotes": null
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "accessDate": "2026-10-01",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g21-03",
      "type": "dermoscopy",
      "src": "assets/media/cases/case-24-dermoscopy.jpg",
      "dimensions": {
        "width": 600,
        "height": 457
      },
      "alt": "Dermoscopic photograph of a yellow-tan oval lesion with a ridged surface, beside a millimeter scale, with a few hairs crossing it. No diagnosis is included.",
      "caption": "Polarized dermoscopic photograph with a millimeter scale. The author's diagnosis stays hidden until reveal.",
      "source": "Philipp Tschandl, via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Dermatoscopy_SebK.jpg",
      "creator": "Philipp Tschandl",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "attribution": "Philipp Tschandl, via Wikimedia Commons. CC BY-SA 4.0.",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
      "consentBasis": "The author published this own dermoscopic photograph under CC BY-SA 4.0. The frame is a skin close-up without a face. No separate patient-consent document is on the file page."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Seborrheic keratosis",
    "confirmationMethod": "clinical_diagnosis",
    "confirmationNotes": "The author states that this polarized dermoscopic image shows a seborrheic keratosis. No histopathology report is attached. The method stays clinical_diagnosis rather than histopathology.",
    "confidenceNote": "Author caption on a dermoscopic photograph. Not a Docutis clinician review."
  },
  "observations": [
    {
      "id": "obs-g21-03a",
      "kind": "observation",
      "text": "A yellow-tan oval lesion has a surface broken into ridges."
    },
    {
      "id": "obs-g21-03b",
      "kind": "observation",
      "text": "A millimeter scale lies beside the lesion. A few hairs cross the field."
    }
  ],
  "interpretations": [
    {
      "id": "int-g21-03",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g21-03a",
        "obs-g21-03b"
      ],
      "text": "The ridged surface is the dermoscopic finding. The scale is print, not skin, and it is not a measurement you should invent."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Seborrheic keratosis",
      "supportingFeatures": [
        "Ridged yellow-tan surface",
        "Author caption on a dermoscopic image"
      ],
      "contradictingFeatures": [
        "No histopathology is attached"
      ],
      "teachingDistinction": "The ridges are why this frame is in the library. The caption is still not a pathology report."
    },
    {
      "diagnosis": "Cutaneous melanoma",
      "supportingFeatures": [
        "A pigmented lesion can be the worry before the surface is described"
      ],
      "contradictingFeatures": [
        "This frame's surface is ridged and yellow-tan rather than a structureless dark blotch"
      ],
      "teachingDistinction": "Do not import a melanoma reading from another case before you describe these ridges."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g21-03a",
      "title": "Notice first",
      "text": "Say whether the surface is smooth or broken into ridges. Then notice the scale."
    },
    {
      "id": "tp-g21-03b",
      "title": "Limit",
      "text": "Ridges are not proof of a benign lesion. Small pits were not named, because they were not recorded as a separate structure."
    }
  ],
  "observationPrompts": [
    "Is the surface smooth or broken into ridges?",
    "What is printed beside the lesion, and is it skin?"
  ],
  "hints": [
    "The scale is not a skin finding and not a number you should calculate."
  ],
  "closestMimic": {
    "name": "Cutaneous melanoma",
    "whyClosest": "A pigmented dermoscopic lesion is compared with cutaneous melanoma before the surface is described. This frame's ridges are the difference you can see."
  },
  "patterns": [
    {
      "id": "pat-g21-03-ridges",
      "label": "Cerebriform ridges",
      "specificityNote": "A ridged surface is a dermoscopic clue. It is not proof of a benign lesion and it is not a count of pits.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g21-03-scale",
      "label": "Millimeter scale in the frame",
      "specificityNote": "The scale is print. It is not skin and it is not a recorded measurement.",
      "certainty": "clearly_visible",
      "weight": "weak"
    }
  ],
  "synthesis": "The author calls this a seborrheic keratosis under polarized dermoscopy. The ridges are visible. The scale is not a finding. Pits and cysts were not added.",
  "evidenceWeighting": "The ridges carry the major weight. The scale is weak because it is not skin. No vessel pattern and no milia-like cyst were encoded.",
  "diagnosticTrap": "Reading the millimeter scale as a skin structure, or naming pits you have not separated from the ridges.",
  "mentorNote": "The file is 600 pixels on the long edge. The ridges are still readable. It was not enlarged.",
  "takeHomeRule": "Describe ridges before you borrow a diagnosis from a different pigmented photograph. A benign caption is not a guarantee.",
  "compareWith": [
    "cmp-sk-dermoscopy"
  ],
  "academy": {
    "level": 2,
    "spectrum": "mimic",
    "teachingType": "teaching",
    "skillIds": [
      "fissured-surface"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "No condition monograph is stored for this teaching diagnosis. Do not treat from this case.",
  "managementBrief": "No management category is stored. A source label, including a benign label, is not a decision to reassure, monitor, perform dermoscopy, biopsy, or refer. This brief is not a protocol and remains review required.",
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

## case: Many brown spots on the back of a hand (`case-g21-04`)

- **Exact fingerprint:** `sha256-v1:45eaceabe1ef31fde0f886ad791eed7c1914435c9a6031c6d41ab474e6cef0c2`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Lentigo_s%C3%A9nile.jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g21-04",
  "slug": "g21-many-brown-macules-on-the-hand",
  "title": "Many brown spots on the back of a hand",
  "diagnosisLabel": "Solar lentigo",
  "diseaseId": "solar-lentigo",
  "category": "Benign pigmented",
  "educationalLevel": "introductory",
  "caseType": "clinical",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Dorsum of the hand",
    "presentationNotes": null
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "accessDate": "2026-10-01",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g21-04",
      "type": "clinical",
      "src": "assets/media/cases/case-25-clinical.jpg",
      "dimensions": {
        "width": 1600,
        "height": 1200
      },
      "alt": "Clinical photograph of the back of a hand and wrist with many separate brown spots. No diagnosis is included.",
      "caption": "The back of a hand with many brown macules. The uploader's diagnosis stays hidden until reveal.",
      "source": "Alain Gérard, via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Lentigo_s%C3%A9nile.jpg",
      "creator": "Alain Gérard",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "attribution": "Alain Gérard, via Wikimedia Commons. CC BY-SA 4.0.",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
      "consentBasis": "The photographer published this photograph under CC BY-SA 4.0. The frame shows a hand, not a face. No separate patient-consent document is on the file page."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Lentigo sénile (solar lentigo) on the dorsum of the hand",
    "confirmationMethod": "clinical_diagnosis",
    "confirmationNotes": "The French caption says lentigo sénile on the dorsum of the hand. Solar lentigo is the English name used for that caption. Histopathology is not stated. The photograph cannot clear every macule.",
    "confidenceNote": "Uploader clinical label for a field of macules. Not a Docutis clinician review."
  },
  "observations": [
    {
      "id": "obs-g21-04a",
      "kind": "observation",
      "text": "Many separate brown macules sit on the back of a hand and the wrist."
    },
    {
      "id": "obs-g21-04b",
      "kind": "observation",
      "text": "The macules are not one broad patch. Some are small and some are larger. The borders are not all the same."
    }
  ],
  "interpretations": [
    {
      "id": "int-g21-04",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g21-04a",
        "obs-g21-04b"
      ],
      "text": "A field of flat brown macules on the hand is the look the caption names. One irregular macule inside a field is not automatically the same as a single broad patch on another case."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Solar lentigo",
      "supportingFeatures": [
        "Many flat brown macules on the dorsum of the hand",
        "Caption says lentigo sénile"
      ],
      "contradictingFeatures": [
        "No histopathology",
        "Not every macule has the same border"
      ],
      "teachingDistinction": "The caption names the field. It does not certify each spot."
    },
    {
      "diagnosis": "Lentigo maligna melanoma",
      "supportingFeatures": [
        "Brown pigment on sun-exposed skin"
      ],
      "contradictingFeatures": [
        "This frame is many hand macules, not one cheek patch marked for biopsy"
      ],
      "teachingDistinction": "Do not use a hand field to dismiss a single facial patch, or the reverse."
    },
    {
      "diagnosis": "Cutaneous melanoma",
      "supportingFeatures": [
        "Brown pigment can be uneven"
      ],
      "contradictingFeatures": [
        "This frame is a field of macules, not one broad patch"
      ],
      "teachingDistinction": "The library's broad brown melanoma photograph is a different shape."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g21-04a",
      "title": "Notice first",
      "text": "Count whether you see one patch or many separate spots, and name the site you can see."
    },
    {
      "id": "tp-g21-04b",
      "title": "Limit",
      "text": "A field of solar lentigines does not prove that every brown macule is harmless."
    }
  ],
  "observationPrompts": [
    "Is this one brown patch or many separate spots?",
    "What body site can you actually see?"
  ],
  "hints": [
    "Name the hand before you borrow a diagnosis from a facial photograph."
  ],
  "closestMimic": {
    "name": "Lentigo maligna melanoma",
    "whyClosest": "Both are brown pigment on sun-exposed skin. This frame is many macules on a hand. The lentigo maligna melanoma case is one cheek patch."
  },
  "patterns": [
    {
      "id": "pat-g21-04-macules",
      "label": "Many flat brown macules",
      "specificityNote": "A field of flat brown macules is not one broad patch, and it is not proof that every macule is benign.",
      "certainty": "clearly_visible",
      "weight": "major"
    }
  ],
  "synthesis": "The caption says lentigo sénile on the dorsum of the hand. The frame shows many flat brown macules, not one patch. That does not clear every spot.",
  "evidenceWeighting": "The field of flat brown macules is the major clue and matches the caption's site. Uneven borders on some macules are not given a second diagnosis from this photograph.",
  "diagnosticTrap": "Calling every brown spot on the hand harmless, or calling this field the same thing as one broad patch.",
  "mentorNote": "Nail polish and a watch are in the frame. They are not skin findings. No face is shown.",
  "takeHomeRule": "Many flat brown macules on the hand are not a promise about the next single brown patch.",
  "compareWith": [
    "cmp-lentigo-broad-patch",
    "cmp-lmm-lentigo"
  ],
  "academy": {
    "level": 2,
    "spectrum": "mimic",
    "teachingType": "teaching",
    "skillIds": [
      "many-brown-macules"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "No condition monograph is stored for this teaching diagnosis. Do not treat from this case.",
  "managementBrief": "No management category is stored. A source label, including a benign label, is not a decision to reassure, monitor, perform dermoscopy, biopsy, or refer. This brief is not a protocol and remains review required.",
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

## case: Two bright red papules (`case-g21-05`)

- **Exact fingerprint:** `sha256-v1:7457b2b9f63bd49cdb5625c30a840ee01fb3fb93da5833e5a977eb553545a596`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Cherry_angioma_closeup.jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g21-05",
  "slug": "g21-two-bright-red-papules",
  "title": "Two bright red papules",
  "diagnosisLabel": "Cherry angioma",
  "diseaseId": "cherry-angioma",
  "category": "Benign vascular",
  "educationalLevel": "introductory",
  "caseType": "clinical",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Skin, site not named on the source",
    "presentationNotes": null
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "accessDate": "2026-10-01",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g21-05",
      "type": "clinical",
      "src": "assets/media/cases/case-26-clinical.jpg",
      "dimensions": {
        "width": 1505,
        "height": 1096
      },
      "alt": "Close clinical photograph of two bright red papules on otherwise even skin. No diagnosis is included.",
      "caption": "Two bright red papules. The uploader's diagnosis stays hidden until reveal.",
      "source": "Assafn, via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Cherry_angioma_closeup.jpg",
      "creator": "Assafn",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "attribution": "Assafn, via Wikimedia Commons. CC BY-SA 4.0.",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
      "consentBasis": "Uploader published this own photograph under CC BY-SA 4.0. The frame is a skin close-up without a face. No separate patient-consent document is on the file page."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Cherry angioma",
    "confirmationMethod": "clinical_diagnosis",
    "confirmationNotes": "The Commons description says cherry angioma close-up. It does not name a site and does not state histopathology. Two papules are in the frame.",
    "confidenceNote": "Uploader clinical label only. Not a Docutis clinician review."
  },
  "observations": [
    {
      "id": "obs-g21-05a",
      "kind": "observation",
      "text": "Two bright red papules sit on otherwise even skin."
    },
    {
      "id": "obs-g21-05b",
      "kind": "observation",
      "text": "They are a similar vivid red. No brown pigment is visible in them. The site is not named."
    }
  ],
  "interpretations": [
    {
      "id": "int-g21-05",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g21-05a",
        "obs-g21-05b"
      ],
      "text": "A second similar bright red papule is part of this frame. One shiny red papule on another case is a different photograph."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Cherry angioma",
      "supportingFeatures": [
        "Bright red papules",
        "A second similar papule",
        "Uploader label"
      ],
      "contradictingFeatures": [
        "No dermoscopy and no histopathology"
      ],
      "teachingDistinction": "The caption matches the color. Two papules still do not prove both are benign forever."
    },
    {
      "diagnosis": "Basal cell carcinoma",
      "supportingFeatures": [
        "A red papule is also the look of a shiny red papule case in this library"
      ],
      "contradictingFeatures": [
        "This frame has two vivid red papules, not one shiny papule with a named site"
      ],
      "teachingDistinction": "Do not call every red papule an angioma or every red papule a carcinoma."
    },
    {
      "diagnosis": "Amelanotic melanoma",
      "supportingFeatures": [
        "A red papule without brown pigment can be a melanocytic trap"
      ],
      "contradictingFeatures": [
        "A second matching bright red papule is in this same frame"
      ],
      "teachingDistinction": "Absence of brown pigment is not a reassuring test."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g21-05a",
      "title": "Notice first",
      "text": "Count the red papules and name the color you see."
    },
    {
      "id": "tp-g21-05b",
      "title": "Limit",
      "text": "Bright red is not proof of a benign lesion. No vessels were named because none were separated in this clinical frame."
    }
  ],
  "observationPrompts": [
    "How many red spots are in the frame?",
    "Are they the same color as each other?"
  ],
  "hints": [
    "Count before you pick a single-papule diagnosis from another case."
  ],
  "closestMimic": {
    "name": "Basal cell carcinoma",
    "whyClosest": "The library's solitary shiny red papule is a basal cell carcinoma. This frame is bright red and there are two papules."
  },
  "patterns": [
    {
      "id": "pat-g21-05-red",
      "label": "Bright red papules",
      "specificityNote": "Bright red papules are a color finding. A second papule does not prove either one is benign.",
      "certainty": "clearly_visible",
      "weight": "major"
    }
  ],
  "synthesis": "The caption says cherry angioma. Two bright red papules are visible. That is not the solitary shiny red papule of the basal cell carcinoma case, and it is not a proof.",
  "evidenceWeighting": "The bright red color and the second papule are the major clue. No vessel pattern was encoded. No site was stored because the caption does not name one.",
  "diagnosticTrap": "Calling every red papule an angioma, or calling every red papule a carcinoma.",
  "mentorNote": "A different cherry angioma file on Commons carried location metadata and was not used. This close-up does not.",
  "takeHomeRule": "A bright red papule can be benign in the caption and still not be a rule for the next red papule.",
  "compareWith": [
    "cmp-angioma-bcc"
  ],
  "academy": {
    "level": 2,
    "spectrum": "mimic",
    "teachingType": "teaching",
    "skillIds": [
      "bright-red-papule"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "No condition monograph is stored for this teaching diagnosis. Do not treat from this case.",
  "managementBrief": "No management category is stored. A source label, including a benign label, is not a decision to reassure, monitor, perform dermoscopy, biopsy, or refer. This brief is not a protocol and remains review required.",
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

## case: Small blue spot under hair (`case-g21-06`)

- **Exact fingerprint:** `sha256-v1:fbe26b6a1bc5f7878de1fd6eea35336a1db68b28f3bb701766ed9d0d4a191380`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Blue_nevus.png
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g21-06",
  "slug": "g21-small-blue-spot",
  "title": "Small blue spot under hair",
  "diagnosisLabel": "Blue nevus",
  "diseaseId": "blue-nevus",
  "category": "Benign melanocytic",
  "educationalLevel": "intermediate",
  "caseType": "clinical",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Shin",
    "presentationNotes": null
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "accessDate": "2026-10-01",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g21-06",
      "type": "clinical",
      "src": "assets/media/cases/case-27-clinical.jpg",
      "dimensions": {
        "width": 1223,
        "height": 1600
      },
      "alt": "Clinical photograph of a small blue spot on hair-bearing skin, with hairs crossing the spot. No diagnosis is included.",
      "caption": "A small blue spot on hair-bearing skin. The uploader's diagnosis stays hidden until reveal.",
      "source": "Nictitate, via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Blue_nevus.png",
      "creator": "Nictitate",
      "license": "CC0 1.0",
      "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
      "attribution": "Nictitate, via Wikimedia Commons. CC0 1.0.",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation. The longest edge was limited to 1600 pixels.",
      "consentBasis": "The author released this own photograph under CC0 1.0. The frame is a shin close-up without a face. No separate patient-consent document is on the file page."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Blue nevus on the shin",
    "confirmationMethod": "clinical_diagnosis",
    "confirmationNotes": "The Commons description says a blue nevus on the shin. It does not state a histologic subtype and does not cite histopathology. Hairs cross the spot, so the full border is not traced.",
    "confidenceNote": "Uploader clinical label only. Not a Docutis clinician review. Not a deep-penetrating or cellular subtype."
  },
  "observations": [
    {
      "id": "obs-g21-06a",
      "kind": "observation",
      "text": "A small blue spot sits on the skin."
    },
    {
      "id": "obs-g21-06b",
      "kind": "observation",
      "text": "Terminal hairs cross the spot, so part of the edge is hidden. No flat brown companion lesion is in the frame."
    }
  ],
  "interpretations": [
    {
      "id": "int-g21-06",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g21-06a",
        "obs-g21-06b"
      ],
      "text": "Blue color is the finding. It is not specific. Hair is an occlusion, not a structure."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Blue nevus",
      "supportingFeatures": [
        "Blue color",
        "Caption names the shin"
      ],
      "contradictingFeatures": [
        "No histopathology",
        "Border partly hidden by hair"
      ],
      "teachingDistinction": "The caption is a clinical label for a blue spot. It does not assign a histologic subtype."
    },
    {
      "diagnosis": "Superficial spreading melanoma arising from a dysplastic nevus",
      "supportingFeatures": [
        "That library case has a blue-black raised area"
      ],
      "contradictingFeatures": [
        "That case also has a flatter area and a printed arrow. This frame does not."
      ],
      "teachingDistinction": "Blue-black color is shared as a worry. The companion flat area is not in this frame."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g21-06a",
      "title": "Notice first",
      "text": "Name the color, then say whether hair hides the edge."
    },
    {
      "id": "tp-g21-06b",
      "title": "Limit",
      "text": "Blue does not mean blue nevus in the next patient, and a benign caption is not a guarantee."
    }
  ],
  "observationPrompts": [
    "What color is the small spot?",
    "Do hairs hide any of its edge?"
  ],
  "hints": [
    "Color is not a subtype."
  ],
  "closestMimic": {
    "name": "Superficial spreading melanoma arising from a dysplastic nevus",
    "whyClosest": "That case records a blue-black raised area. This frame is a small blue spot without the flat companion seen there."
  },
  "patterns": [
    {
      "id": "pat-g21-06-blue",
      "label": "Blue papule or macule",
      "specificityNote": "Blue color is visible. It does not prove the source label and it does not name a subtype.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g21-06-hair",
      "label": "Hairs crossing the spot",
      "specificityNote": "Hair hides part of the edge. It is not a skin structure.",
      "certainty": "clearly_visible",
      "weight": "weak"
    }
  ],
  "synthesis": "The caption says blue nevus on the shin. The spot is blue and partly covered by hair. No subtype was added.",
  "evidenceWeighting": "Blue color is the major clue and is not specific. Hair is weak because it is occlusion. The missing flat companion is a difference from the melanoma case, not a proof.",
  "diagnosticTrap": "Treating blue color as a benign diagnosis, or as a melanoma diagnosis, without the rest of the frame.",
  "mentorNote": "A second blue-nevus file was rejected because marker streaks hid the border. This one still has hair across the spot. That limit stays in the note.",
  "takeHomeRule": "Blue is a color. A benign caption for one blue spot is not a guarantee for the next blue-black lesion.",
  "whyNot": [
    {
      "mimic": "Superficial spreading melanoma arising from a dysplastic nevus",
      "text": "That case has a blue-black raised area beside a flatter area and a printed arrow. This frame has no flat companion and no arrow."
    },
    {
      "mimic": "Pigmented basal cell carcinoma",
      "text": "No leaf-like or ovoid structure is visible here. Blue color alone does not make that diagnosis."
    }
  ],
  "compareWith": [
    "cmp-blue-melanoma"
  ],
  "academy": {
    "level": 3,
    "spectrum": "mimic",
    "teachingType": "reasoning",
    "skillIds": [
      "blue-color"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "No condition monograph is stored for this teaching diagnosis. Do not treat from this case.",
  "managementBrief": "No management category is stored. A source label, including a benign label, is not a decision to reassure, monitor, perform dermoscopy, biopsy, or refer. This brief is not a protocol and remains review required.",
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

## case: Brown patch with ink dots (`case-g21-07`)

- **Exact fingerprint:** `sha256-v1:5bc1f06bbc0d1180e70534ca23d1cf10a289e8bb66d20a6ea6eb45014508e0cd`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Lentigo_Maligna_Melanoma_Left_Central_Malar_Cheek.jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g21-07",
  "slug": "g21-brown-cheek-patch-with-ink",
  "title": "Brown patch with ink dots",
  "diagnosisLabel": "Lentigo maligna melanoma",
  "diseaseId": "lentigo-maligna-melanoma",
  "category": "Melanocytic malignancies",
  "educationalLevel": "advanced",
  "caseType": "clinical",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Left central malar cheek",
    "presentationNotes": "The source says the patch was marked for biopsy. A biopsy result is not in the caption."
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "accessDate": "2026-10-01",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g21-07",
      "type": "clinical",
      "src": "assets/media/cases/case-28-clinical.jpg",
      "dimensions": {
        "width": 426,
        "height": 318
      },
      "alt": "Close clinical photograph of a brown patch on skin, with several small dark dots around it. No diagnosis is included.",
      "caption": "A brown cheek patch with marker dots. The source diagnosis stays hidden until reveal.",
      "source": "Dermanonymous, via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Lentigo_Maligna_Melanoma_Left_Central_Malar_Cheek.jpg",
      "creator": "Dermanonymous",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "attribution": "Dermanonymous, via Wikimedia Commons. CC BY-SA 4.0.",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
      "consentBasis": "Uploader published this own photograph under CC BY-SA 4.0. The frame is a close crop of cheek skin with marker dots, not a portrait. No separate patient-consent document is on the file page."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Lentigo maligna melanoma, left central malar cheek, marked for biopsy",
    "confirmationMethod": "expert_diagnosis",
    "confirmationNotes": "The caption says lentigo maligna melanoma of the left central malar cheek marked for biopsy. A histopathology report is not on the Commons page. The method stays expert_diagnosis, the same limit used for this uploader's other biopsy-marked caption in the library, and it is not histopathology.",
    "confidenceNote": "Biopsy marking is not a result. Not a Docutis clinician review. Not lentigo maligna in situ unless the caption had said only that."
  },
  "observations": [
    {
      "id": "obs-g21-07a",
      "kind": "observation",
      "text": "One brown patch sits in a tight crop of skin."
    },
    {
      "id": "obs-g21-07b",
      "kind": "observation",
      "text": "Several small dark dots surround the patch. They look like marker ink, not a second lesion."
    }
  ],
  "interpretations": [
    {
      "id": "int-g21-07",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g21-07a",
        "obs-g21-07b"
      ],
      "text": "The brown patch is the skin finding. The dots are ink. The caption, not the ink, supplies the name, and the caption does not include a pathology result."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Lentigo maligna melanoma",
      "supportingFeatures": [
        "Caption names that diagnosis on the cheek",
        "One brown patch"
      ],
      "contradictingFeatures": [
        "No histopathology result is linked",
        "The image is small"
      ],
      "teachingDistinction": "Use the caption's words. Do not shorten them to in situ, and do not invent a subtype beyond the caption."
    },
    {
      "diagnosis": "Solar lentigo",
      "supportingFeatures": [
        "Flat brown pigment on sun-exposed skin"
      ],
      "contradictingFeatures": [
        "This frame is one cheek patch with ink, not a field of hand macules"
      ],
      "teachingDistinction": "The hand field and this cheek patch are different photographs."
    },
    {
      "diagnosis": "Pigmented actinic keratosis",
      "supportingFeatures": [
        "A brown patch on the cheek can raise that question"
      ],
      "contradictingFeatures": [
        "Scale and a rough surface are not what this frame shows"
      ],
      "teachingDistinction": "Do not add scale that is not visible."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g21-07a",
      "title": "Notice first",
      "text": "Separate the brown patch from the ink dots."
    },
    {
      "id": "tp-g21-07b",
      "title": "Limit",
      "text": "Marked for biopsy is not a report. The file is small. Lentigo maligna in situ was not the caption."
    }
  ],
  "observationPrompts": [
    "Is the brown pigment one patch or many separate spots?",
    "What are the small dark dots around it?"
  ],
  "hints": [
    "Separate ink from skin before you name the patch."
  ],
  "closestMimic": {
    "name": "Solar lentigo",
    "whyClosest": "Both are brown pigment. The solar lentigo case is many macules on a hand. This frame is one cheek patch with marker ink."
  },
  "patterns": [
    {
      "id": "pat-g21-07-patch",
      "label": "Brown patch",
      "specificityNote": "One brown patch is visible. Flatness is probable in this crop and is not a histologic level.",
      "certainty": "probably",
      "weight": "major"
    },
    {
      "id": "pat-g21-07-ink",
      "label": "Marker dots around the patch",
      "specificityNote": "Ink is not a border and not a diagnosis.",
      "certainty": "clearly_visible",
      "weight": "conflicting"
    }
  ],
  "whyNot": [
    {
      "mimic": "Solar lentigo",
      "text": "The solar lentigo photograph is a field of macules on the dorsum of the hand. This is one cheek patch. The field does not answer for this patch."
    },
    {
      "mimic": "Pigmented actinic keratosis",
      "text": "This frame does not show a rough scaly surface. That absence is not a proof, and scale was not invented."
    }
  ],
  "synthesis": "The caption says lentigo maligna melanoma on the malar cheek, marked for biopsy. The image shows one brown patch and ink. It does not show a pathology result, and it is not a field of hand macules.",
  "evidenceWeighting": "The brown patch is the major clue and is only probably a flat macule, because the crop does not prove height. Ink conflicts with any reading that treats the dots as skin. The diagnosis is the caption, not a slide.",
  "diagnosticTrap": "Using a hand full of brown spots to dismiss a single cheek patch, or shortening this caption to in situ.",
  "mentorNote": "The file is 426 by 318 pixels. It was kept because the patch and the ink are still readable, and a larger licensed lentigo maligna melanoma photograph was not substituted.",
  "takeHomeRule": "Read the caption's full words. Ink is not skin, a biopsy mark is not a result, and a benign field elsewhere is not this lesion.",
  "clinicalAction": "After reveal, the linked condition record is reference context only. Do not treat from this case.",
  "compareWith": [
    "cmp-lmm-lentigo"
  ],
  "academy": {
    "level": 4,
    "spectrum": "melanoma",
    "teachingType": "expert-challenge",
    "skillIds": [
      "marked-cheek-patch"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "managementBrief": "No management category is stored. A source label, including a benign label, is not a decision to reassure, monitor, perform dermoscopy, biopsy, or refer. This brief is not a protocol and remains review required.",
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

## case: A group of papules on the chest (`case-g21-08`)

- **Exact fingerprint:** `sha256-v1:2f81108925ba5845d375a08a6052a5cd4f548c30c357bf8973990a503d28e8c8`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Photography_of_sebaceous_hyperplasia.jpg
  - https://commons.wikimedia.org/wiki/File:Dermoscopy_of_sebaceous_hyperplasia.jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g21-08",
  "slug": "g21-grouped-chest-papules",
  "title": "A group of papules on the chest",
  "diagnosisLabel": "Sebaceous hyperplasia",
  "diseaseId": "sebaceous-hyperplasia",
  "category": "Benign sebaceous",
  "educationalLevel": "intermediate",
  "caseType": "clinical_dermoscopic",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Chest",
    "presentationNotes": "The source describes a linear group on the chest. That distribution is what the paper shows. It is not the only way this diagnosis looks."
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "accessDate": "2026-10-01",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g21-08a",
      "type": "clinical",
      "src": "assets/media/cases/case-29-clinical.jpg",
      "dimensions": {
        "width": 600,
        "height": 450
      },
      "alt": "Clinical photograph of a group of skin-colored papules on the chest, with a nipple at the lower edge. No diagnosis is included.",
      "caption": "Clinical photograph of grouped papules on the chest. The paper's diagnosis stays hidden until reveal.",
      "source": "Sato and Tanaka, Dermatology Practical & Conceptual (2014), via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Photography_of_sebaceous_hyperplasia.jpg",
      "creator": "Toshitsugu Sato and Masaru Tanaka",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Sato T, Tanaka M. Dermatology Practical & Conceptual. 2014. Via Wikimedia Commons. CC BY 4.0.",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
      "consentBasis": "Open-access case-report photograph distributed on Wikimedia Commons under the file's CC BY 4.0 template. The frame shows chest skin, not a face. No name is printed on the image."
    },
    {
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "accessDate": "2026-10-01",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g21-08b",
      "type": "dermoscopy",
      "src": "assets/media/cases/case-29-dermoscopy.jpg",
      "dimensions": {
        "width": 600,
        "height": 450
      },
      "alt": "Dermoscopic photograph of clustered yellow-white lobules. No diagnosis is included.",
      "caption": "Dermoscopic photograph from the same case report. Lobules are described. A vessel count was not added.",
      "source": "Sato and Tanaka, Dermatology Practical & Conceptual (2014), via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Dermoscopy_of_sebaceous_hyperplasia.jpg",
      "creator": "Toshitsugu Sato and Masaru Tanaka",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Sato T, Tanaka M. Dermatology Practical & Conceptual. 2014. Via Wikimedia Commons. CC BY 4.0.",
      "modificationsNotes": "Recompressed for web delivery and file metadata removed. No crop and no annotation.",
      "consentBasis": "Open-access case-report dermoscopic photograph distributed on Wikimedia Commons under the file's CC BY 4.0 template. No face is in the frame."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Sebaceous hyperplasia (linear, chest)",
    "confirmationMethod": "expert_diagnosis",
    "confirmationNotes": "The Commons description cites a 2014 case report that labels the photographs sebaceous gland hyperplasia in a linear group on the chest. The file description does not quote a histopathology sentence, so histopathology is not claimed. The journal statement reprinted on the file page is an unversioned attribution license; the file itself is tagged CC BY 4.0.",
    "confidenceNote": "Published case-report label. Not a Docutis clinician review. Not the only clinical pattern of this diagnosis."
  },
  "observations": [
    {
      "id": "obs-g21-08a",
      "kind": "observation",
      "modality": "clinical",
      "text": "A group of skin-colored papules sits on the chest in a loose line. A nipple is at the edge of the clinical frame."
    },
    {
      "id": "obs-g21-08b",
      "kind": "observation",
      "modality": "dermoscopy",
      "text": "The dermoscopic frame shows clustered yellow-white lobules. A gel bubble is at the edge."
    }
  ],
  "interpretations": [
    {
      "id": "int-g21-08",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g21-08a",
        "obs-g21-08b"
      ],
      "text": "Grouped papules plus lobules are the two frames. Linear vessels are named in the file caption and are not encoded here as a counted structure."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Sebaceous hyperplasia",
      "supportingFeatures": [
        "Grouped skin-colored papules",
        "Yellow-white lobules",
        "Case-report label and chest site"
      ],
      "contradictingFeatures": [
        "Histopathology is not quoted from the file page"
      ],
      "teachingDistinction": "The paper label matches these frames. The linear arrangement is this case, not a rule for every papule."
    },
    {
      "diagnosis": "Basal cell carcinoma",
      "supportingFeatures": [
        "Small papules can raise that question",
        "A solitary shiny red papule is a different library case"
      ],
      "contradictingFeatures": [
        "This clinical frame is a group of skin-colored papules, not one shiny red papule"
      ],
      "teachingDistinction": "Number and color differ from the solitary shiny red papule. That is not a proof."
    },
    {
      "diagnosis": "Molluscum contagiosum",
      "supportingFeatures": [
        "Grouped papules can look similar at a glance"
      ],
      "contradictingFeatures": [
        "The dermoscopic frame shows yellow-white lobules rather than a single central plug you can point to"
      ],
      "teachingDistinction": "Do not rename lobules as a plug."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g21-08a",
      "title": "Notice first",
      "text": "Count whether the papules are one or a group. On the dermoscopic frame, say whether you see lobules."
    },
    {
      "id": "tp-g21-08b",
      "title": "Limit",
      "text": "The caption mentions linear vessels. They were not encoded, because a vessel count was not made. This linear chest pattern is not every presentation."
    }
  ],
  "observationPrompts": [
    "Are the bumps one lesion or a group?",
    "On the close view, are the bumps smooth or lobulated?"
  ],
  "hints": [
    "A group is not the same photograph as one shiny red papule."
  ],
  "closestMimic": {
    "name": "Basal cell carcinoma",
    "whyClosest": "Small papules raise that comparison. The basal cell carcinoma case in the pair is one shiny red papule. This frame is a skin-colored group."
  },
  "patterns": [
    {
      "id": "pat-g21-08-group",
      "label": "Grouped skin-colored papules",
      "modality": "clinical",
      "specificityNote": "A group of skin-colored papules is this clinical frame. It is not proof of a benign lesion.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g21-08-lobules",
      "label": "Yellow-white lobules",
      "modality": "dermoscopy",
      "specificityNote": "Lobules are visible on the dermoscopic frame. Vessels were not counted.",
      "certainty": "clearly_visible",
      "weight": "major"
    }
  ],
  "synthesis": "The case report labels these chest photographs sebaceous hyperplasia. The clinical frame is a group of papules. The dermoscopic frame shows yellow-white lobules. Vessels were left uncounted.",
  "evidenceWeighting": "Both the group and the lobules are major and clearly visible. Vessels stay out of the pattern list. The linear distribution is the paper's description of this case, not a required shape.",
  "diagnosticTrap": "Calling every grouped papule this diagnosis, or calling every papule a carcinoma because another case is a red papule.",
  "mentorNote": "The Commons tag is CC BY 4.0. The reprinted journal sentence does not name the version. That limit is recorded and the images were still used because the file page states CC BY 4.0.",
  "takeHomeRule": "Grouped lobulated papules are a look. A benign case-report label is not a guarantee for the next papule.",
  "compareWith": [
    "cmp-sebaceous-bcc"
  ],
  "pairedModality": {
    "clinicalObservation": "A group of skin-colored papules sits on the chest in a loose line. A nipple is at the edge of the clinical frame.",
    "dermoscopicObservation": "The dermoscopic frame shows clustered yellow-white lobules. A gel bubble is at the edge.",
    "addedValue": "The dermoscopic frame adds lobules that the clinical photograph does not show. An added look is not confirmation of the source label.",
    "reasoningImpact": "The clinical reading stays a group of papules. Lobules support a lobulated look and do not replace the caption. Vessels stay uncounted. The leading comparison does not change, because the extra frame does not name a new competitor.",
    "limits": "Both files come from one case report. The file pages do not print the words same lesion. Histopathology is not quoted. Linear vessels named in the file caption were not encoded.",
    "informationGain": "dermoscopy_adds_support",
    "informationGainNote": "Educational label only. The dermoscopic frame adds lobules the clinical frame does not name. Not a validated metric and not a probability.",
    "comparison": {
      "clinicalClue": "Grouped skin-colored papules.",
      "dermoscopicClue": "Clustered yellow-white lobules.",
      "addedInformation": "Lobules are on the dermoscopic frame and are not read back onto the clinical photograph.",
      "diagnosticConflict": null,
      "teachingRule": "An extra frame can add a look. It does not confirm a label, and it does not make the next papule safe."
    }
  },
  "modalityIntegration": "The first frame is the clinical photograph of grouped papules. The second frame is the dermoscopic photograph from the same source and shows yellow-white lobules. Do not read those lobules onto the clinical photograph, and do not add vessels that were not counted.",
  "academy": {
    "level": 3,
    "spectrum": "mimic",
    "teachingType": "teaching",
    "skillIds": [
      "grouped-papules"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "clinicalAction": "No condition monograph is stored for this teaching diagnosis. Do not treat from this case.",
  "managementBrief": "No management category is stored. A source label, including a benign label, is not a decision to reassure, monitor, perform dermoscopy, biopsy, or refer. This brief is not a protocol and remains review required.",
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

## case: Dark patch under a fingernail (`case-g22-01`)

- **Exact fingerprint:** `sha256-v1:db1ecca0441280b9ba9b33d319d4e1b61f3c0104729334921c07c2e5799f5351`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Subungal_hematoma_of_the_finger.jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g22-01",
  "slug": "g22-dark-patch-under-a-nail",
  "title": "Dark patch under a fingernail",
  "diagnosisLabel": "Subungual haemorrhage",
  "diseaseId": "subungual-haemorrhage",
  "category": "Nail",
  "educationalLevel": "advanced",
  "caseType": "clinical",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Finger nail unit",
    "presentationNotes": "The caption names a finger. It does not name which finger, a trauma history, or a dermoscopic view."
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "accessDate": "2026-10-01",
      "metadataCheckedAt": "2026-09-30",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g22-01",
      "type": "clinical",
      "src": "assets/media/cases/case-30-clinical.jpg",
      "dimensions": {
        "width": 1600,
        "height": 1318
      },
      "alt": "Clinical photograph of fingers. One nail has a purple patch under the plate, and the free edge of that nail is still pale. No diagnosis is included.",
      "caption": "Clinical photograph of a purple patch under a fingernail. The uploader's diagnosis stays hidden until reveal. This is not a dermoscopic image.",
      "source": "Callaleo, via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Subungal_hematoma_of_the_finger.jpg",
      "creator": "Callaleo",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "attribution": "Callaleo, via Wikimedia Commons. CC BY-SA 4.0.",
      "modificationsNotes": "The Commons file had already been cropped by a later editor. This copy was recompressed for web delivery, the longest edge was limited to 1600 pixels, and file metadata was removed. No further crop and no annotation.",
      "consentBasis": "The author released this own photograph under CC BY-SA 4.0. The frame shows fingers, not a face. No separate patient-consent document is on the file page."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Subungual hematoma of the finger",
    "confirmationMethod": "clinical_diagnosis",
    "confirmationNotes": "The Commons description says this is a subungual hematoma of the finger. It does not cite histopathology, a clinician role, dermoscopy, or a trauma history. The spelling on the file is hematoma. Docutis uses haemorrhage as the teaching label and does not upgrade the method.",
    "confidenceNote": "Uploader clinical label only. Not a Docutis clinician review. Not histopathology."
  },
  "observations": [
    {
      "id": "obs-g22-01a",
      "kind": "observation",
      "text": "One fingernail has a purple to blue-black patch under the nail plate. The free edge of that nail is still pale."
    },
    {
      "id": "obs-g22-01b",
      "kind": "observation",
      "text": "Other nails in the frame do not show the same patch. No scale, ink, or dermatoscope is in the frame."
    }
  ],
  "interpretations": [
    {
      "id": "int-g22-01",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g22-01a",
        "obs-g22-01b"
      ],
      "text": "The patch is under an intact-looking plate. It is not a longitudinal streak, and this clinical photograph is not dermoscopy."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Subungual haemorrhage",
      "supportingFeatures": [
        "Purple patch under the nail",
        "Pale free edge still present",
        "Caption names a hematoma of the finger"
      ],
      "contradictingFeatures": [
        "No trauma history is written",
        "No histopathology"
      ],
      "teachingDistinction": "The caption is a clinical label for this finger. It does not clear the next dark nail."
    },
    {
      "diagnosis": "Melanoma of the thumb",
      "supportingFeatures": [
        "Both are nail-unit photographs with dark color"
      ],
      "contradictingFeatures": [
        "That case shows a destroyed nail plate. This plate is not missing."
      ],
      "teachingDistinction": "Plate destruction is the visible difference in those two frames. It is not a proof."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g22-01a",
      "title": "What I see",
      "text": "Name the color under the nail, then say whether the plate and the pale free edge are still there."
    },
    {
      "id": "tp-g22-01b",
      "title": "What I cannot know",
      "text": "This frame does not show trauma, a streak on the fold, dermoscopy, or a pathology result."
    }
  ],
  "observationPrompts": [
    "What color is under the nail?",
    "Is the nail plate missing, or is the free edge still pale?"
  ],
  "hints": [
    "A pale free edge is still a nail plate."
  ],
  "closestMimic": {
    "name": "Melanoma of the thumb",
    "whyClosest": "That case is also a nail-unit photograph with dark material. Its plate is destroyed. This frame keeps a pale free edge."
  },
  "patterns": [
    {
      "id": "pat-g22-01-color",
      "label": "Purple patch under the nail",
      "specificityNote": "A purple patch is visible under the plate. It is not a longitudinal streak and it does not prove the caption.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g22-01-plate",
      "label": "Destroyed nail plate",
      "specificityNote": "The plate and pale free edge are still in the frame. Destruction is not visible. Absence is not a proof.",
      "certainty": "not_visible",
      "weight": "conflicting"
    }
  ],
  "synthesis": "The caption says a subungual hematoma of the finger. The photograph shows a purple patch under a nail whose free edge is still pale. It does not show a destroyed plate, a fold streak, or dermoscopy.",
  "evidenceWeighting": "The patch is clearly visible and is the major clue. It is not specific. Plate destruction conflicts with treating this as the destroyed-plate photograph, and it stays not visible. The caption is a clinical label, which is a weak confirmation.",
  "diagnosticTrap": "Reading every dark nail as blood, or as melanoma, because another nail photograph was dramatic.",
  "mentorNote": "No dermoscopic partner with a compatible license was added. A clinical photograph was not relabeled as dermoscopy. A longitudinal streak was not inferred from the diagnosis.",
  "takeHomeRule": "Color under a nail is a look. A benign caption for one finger is not a guarantee, and a destroyed plate in another case is a different frame.",
  "whyNot": [
    {
      "mimic": "Melanoma of the thumb",
      "text": "That photograph shows a destroyed nail plate with debris. This plate is still there, with a pale free edge. The difference does not prove either caption."
    },
    {
      "mimic": "Nail-unit squamous cell carcinoma or other keratinocyte tumor",
      "text": "No mass and no destroyed plate are in this frame. That absence does not exclude a keratinocyte tumor, and this caption does not diagnose one."
    }
  ],
  "compareWith": [
    "cmp-nail-color"
  ],
  "academy": {
    "level": 4,
    "spectrum": "mimic",
    "teachingType": "reasoning",
    "skillIds": [
      "subungual-color"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "localization": null,
  "clinicalAction": "No condition monograph is stored for this teaching diagnosis. Do not treat from this case.",
  "managementBrief": "No management category is stored. A source label, including a benign label, is not a decision to reassure, monitor, perform dermoscopy, biopsy, or refer. This brief is not a protocol and remains review required.",
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

## case: A light brown patch on the forehead (`case-g24-01`)

- **Exact fingerprint:** `sha256-v1:c5f9d8d522850b55da81c6af37b78fd0a63b594d6b6026032e36db1b00b01a44`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Melanoma_in_situ_Right_Forehead.jpg
  - https://commons.wikimedia.org/wiki/File:Melanoma_in_situ_Right_Forehead_dermatoscope.jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g24-01",
  "slug": "g24-forehead-light-brown-patch",
  "title": "A light brown patch on the forehead",
  "diagnosisLabel": "Melanoma in situ",
  "diseaseId": "cutaneous-melanoma",
  "category": "Melanoma",
  "educationalLevel": "advanced",
  "caseType": "clinical_dermoscopic",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Right forehead",
    "presentationNotes": "The file description says the forehead was marked for biopsy. The mark is not a result. No age or sex is printed on the files."
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "accessDate": "2026-10-01",
      "metadataCheckedAt": "2026-10-01",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g24-01a",
      "type": "clinical",
      "src": "assets/media/cases/case-31-clinical.jpg",
      "dimensions": {
        "width": 606,
        "height": 344
      },
      "alt": "Clinical close-up of a light brown patch on forehead skin, ringed by purple and black marker dots. No diagnosis is included.",
      "caption": "Clinical close-up of a light brown patch on forehead skin. Marker dots are in the frame. The source label stays hidden until reveal.",
      "source": "Dermanonymous, via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Melanoma_in_situ_Right_Forehead.jpg",
      "creator": "Dermanonymous",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "attribution": "Dermanonymous, via Wikimedia Commons. CC BY-SA 4.0.",
      "modificationsNotes": "Embedded metadata segments were removed. Pixel dimensions were not changed. No crop and no annotation.",
      "consentBasis": "Uploader published this own-work close-up under the file page CC BY-SA 4.0 template. The frame is forehead skin without a face portrait, eyes, or a name."
    },
    {
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "accessDate": "2026-10-01",
      "metadataCheckedAt": "2026-10-01",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g24-01b",
      "type": "dermoscopy",
      "src": "assets/media/cases/case-31-dermoscopy.jpg",
      "dimensions": {
        "width": 982,
        "height": 706
      },
      "alt": "Circular dermoscopic view of a faint light-brown area, with purple ink at the edge and short tick marks near the center. No diagnosis is included.",
      "caption": "Dermoscopic view from the matching file description. Ink and tick marks are in the field. No structure beyond the faint brown area was clear enough to name.",
      "source": "Dermanonymous, via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Melanoma_in_situ_Right_Forehead_dermatoscope.jpg",
      "creator": "Dermanonymous",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "attribution": "Dermanonymous, via Wikimedia Commons. CC BY-SA 4.0.",
      "modificationsNotes": "Embedded metadata segments were removed. Pixel dimensions were not changed. No crop and no annotation.",
      "consentBasis": "Uploader published this own-work dermoscopic frame under the file page CC BY-SA 4.0 template. No face portrait is in the circular field."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Melanoma in situ (Commons file description, right forehead)",
    "confirmationMethod": "clinical_diagnosis",
    "confirmationNotes": "Both Commons descriptions, checked 2026-10-01, state melanoma in situ on the right forehead marked for biopsy. The dermatoscope file calls itself a dermatoscope image of that description. Neither description reports histopathology. Marked for biopsy is not a histology result. In situ is the file's own wording, not a Docutis upgrade, and it is not lentigo maligna unless the file had said that.",
    "confidenceNote": "Uploader file description only. Not a Docutis clinician review. Not histopathology."
  },
  "observations": [
    {
      "id": "obs-g24-01a",
      "kind": "observation",
      "modality": "clinical",
      "text": "A light brown patch sits on lined forehead skin. Purple and black dots ring the patch."
    },
    {
      "id": "obs-g24-01b",
      "kind": "observation",
      "modality": "dermoscopy",
      "text": "The circular field shows a faint light-brown area. Purple ink sits at the edge, and short tick marks cross the center."
    }
  ],
  "interpretations": [
    {
      "id": "int-g24-01a",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g24-01a"
      ],
      "text": "The dots read as marker ink around the patch, not as pigment in the skin. A mark placed for a procedure is not a laboratory result."
    },
    {
      "id": "int-g24-01b",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g24-01a",
        "obs-g24-01b"
      ],
      "text": "The circular field shows the faint brown area again. No further structure was sharp enough to name. Ink and tick marks stay marks. Absence of a named structure does not clear the patch."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Melanoma in situ",
      "supportingFeatures": [
        "The file description uses those words for this forehead patch.",
        "The patch is a single light-brown area rather than a field of many macules."
      ],
      "contradictingFeatures": [
        "No histopathology sentence is on the file page.",
        "The dermoscopic frame does not show a structure clear enough to name."
      ],
      "teachingDistinction": "The source label can be revealed later. The frames do not prove it, and they do not let you invent a subtype the file did not use."
    },
    {
      "diagnosis": "Solar lentigo",
      "supportingFeatures": [
        "A flat light-brown patch on facial skin can look like this.",
        "The color is mostly one light brown."
      ],
      "contradictingFeatures": [
        "The stored solar lentigo case is many macules on the hand, not this single forehead patch.",
        "A benign name is not established by the photograph."
      ],
      "teachingDistinction": "A faint facial patch is the usual mimic. The hand field does not answer for this forehead."
    },
    {
      "diagnosis": "Pigmented actinic keratosis",
      "supportingFeatures": [
        "Facial skin with a brown patch can raise that comparison."
      ],
      "contradictingFeatures": [
        "Scale was not clearly seen and was not invented."
      ],
      "teachingDistinction": "Missing scale does not exclude a keratinocyte patch, and it does not prove the source label."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g24-01a",
      "title": "Notice first",
      "text": "Separate the light brown patch from the marker dots. On the circular frame, say only the brown area, the ink, and the tick marks if those are what you see."
    },
    {
      "id": "tp-g24-01b",
      "title": "What the source does not say",
      "text": "The file says melanoma in situ and marked for biopsy. It does not report histopathology, Breslow thickness, or a lentigo maligna label. Those were not added."
    }
  ],
  "observationPrompts": [
    "What color is the patch, and where are the dots?",
    "On the circular field, what is ink or a tick mark rather than the brown area?"
  ],
  "hints": [
    "The dots are marker ink. A mark for biopsy is not a result."
  ],
  "closestMimic": {
    "name": "Solar lentigo",
    "whyClosest": "A flat light-brown patch on facial skin is the usual benign look. The stored lentigo photograph is many macules on the hand, not this single forehead patch."
  },
  "patterns": [
    {
      "id": "pat-g24-01-patch",
      "label": "Light brown patch",
      "modality": "clinical",
      "specificityNote": "A light brown patch is on forehead skin. A trunk network word is not used. The patch is not proof of the source label.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g24-01-ink",
      "label": "Marker dots around the patch",
      "modality": "none",
      "specificityNote": "Purple and black dots ring the clinical patch, and purple ink is at the edge of the circular field. Ink is not skin pigment.",
      "certainty": "clearly_visible",
      "weight": "conflicting"
    },
    {
      "id": "pat-g24-01-scale",
      "label": "Tick marks in the circular field",
      "modality": "none",
      "specificityNote": "Short tick marks cross the dermoscopic field. They are a scale, not a skin structure.",
      "certainty": "clearly_visible",
      "weight": "conflicting"
    }
  ],
  "synthesis": "The Commons descriptions label these two frames melanoma in situ on the right forehead, marked for biopsy, and call the second a dermatoscope image. The clinical frame is a light brown patch with marker dots. The dermoscopic frame is a faint brown area with ink and tick marks. No histopathology is stated.",
  "evidenceWeighting": "The patch is clearly visible and is the major clue. Ink and the scale are clearly visible and conflict if you read them as skin. The file label is a clinical description, which is weak confirmation. Histopathology has no weight because it is absent.",
  "diagnosticTrap": "Calling every faint forehead patch this diagnosis, or calling it harmless because the circular frame did not show a textbook structure.",
  "mentorNote": "The pair is the file descriptions, not merely the same author. Pixels were inspected. A pigment network, gray dots, and facial rhomboids were not clear and were not added. The cheek case stays a different lesion.",
  "takeHomeRule": "A faint facial patch plus marker ink is a look. An equivocal dermoscopic frame does not prove or clear the source label.",
  "whyNot": [
    {
      "mimic": "Solar lentigo",
      "text": "A flat light-brown facial patch can be a solar lentigo. This frame is one patch, not the field of hand macules in the lentigo case. That difference does not prove either label."
    },
    {
      "mimic": "Pigmented actinic keratosis",
      "text": "Facial pigment can be a keratinocyte patch. Scale was not clearly seen and was not invented. Absence of scale does not exclude it."
    }
  ],
  "compareWith": [
    "cmp-g24-face-mark"
  ],
  "pairedModality": {
    "clinicalObservation": "A light brown patch sits on lined forehead skin. Purple and black dots ring the patch.",
    "dermoscopicObservation": "The circular field shows a faint light-brown area. Purple ink sits at the edge, and short tick marks cross the center.",
    "addedValue": "The circular frame shows the brown area again at contact-dermatoscope range. It does not add a structure clear enough to name. An extra look is not confirmation.",
    "reasoningImpact": "The reading stays a light brown forehead patch with marker ink. The circular frame does not move that reading to a named structure. Absence of a named structure does not clear the patch.",
    "limits": "The file pages document a dermatoscope view of the described forehead lesion. They do not print a histopathology result. Facial skin is not read with a trunk network word. Resolution is modest.",
    "informationGain": "dermoscopy_remains_equivocal",
    "informationGainNote": "Educational label only. The circular field shows the faint brown area again and does not add a structure clear enough to name. Not a validated metric and not a probability.",
    "comparison": {
      "clinicalClue": "Light brown patch with marker dots.",
      "dermoscopicClue": "Faint brown area, ink, and tick marks.",
      "addedInformation": "The circular frame does not add a named structure.",
      "diagnosticConflict": "The file description names a diagnosis the frames do not prove.",
      "teachingRule": "An equivocal second frame is still information. It is not a clearance and not a confirmation."
    }
  },
  "modalityIntegration": "The first frame is the clinical close-up of a light brown forehead patch ringed by marker dots. The second frame is the circular dermoscopic view and shows a faint brown area with ink and tick marks. The second frame does not add a structure clear enough to name.",
  "academy": {
    "level": 4,
    "spectrum": "melanoma",
    "teachingType": "expert-challenge",
    "skillIds": [
      "evidence-weighting"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "localization": null,
  "clinicalAction": "After reveal, open the linked Docutis cutaneous melanoma record for reference context. Do not treat from this case.",
  "managementBrief": "No management category is stored. A file description, including a melanoma term, is not a decision to reassure, monitor, perform dermoscopy, biopsy, or refer. This brief is not a protocol and remains review required.",
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

## case: A pink-brown patch on the back (`case-g24-02`)

- **Exact fingerprint:** `sha256-v1:d9a5a57a4db2b4e7278ea10b4010ff10bdca40f1448e0549ecc3f7c3d79db4f9`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://commons.wikimedia.org/wiki/File:Malignant_Melanoma_Left_Mid_Back.jpg
  - https://commons.wikimedia.org/wiki/File:Malignant_Melanoma_Left_Mid_Back_Dermatoscope.jpg
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g24-02",
  "slug": "g24-back-pink-brown-patch",
  "title": "A pink-brown patch on the back",
  "diagnosisLabel": "Malignant melanoma",
  "diseaseId": "cutaneous-melanoma",
  "category": "Melanoma",
  "educationalLevel": "advanced",
  "caseType": "clinical_dermoscopic",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Left mid back",
    "presentationNotes": "The file description says the back was marked for biopsy. The mark is not a result. No age or sex is printed on the files."
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "accessDate": "2026-10-01",
      "metadataCheckedAt": "2026-10-01",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g24-02a",
      "type": "clinical",
      "src": "assets/media/cases/case-32-clinical.jpg",
      "dimensions": {
        "width": 550,
        "height": 360
      },
      "alt": "Clinical close-up of a pink and brown patch on skin, ringed by black marker dots. No diagnosis is included.",
      "caption": "Clinical close-up of a pink and brown patch. Black marker dots ring it. The source label stays hidden until reveal.",
      "source": "Dermanonymous, via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Malignant_Melanoma_Left_Mid_Back.jpg",
      "creator": "Dermanonymous",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "attribution": "Dermanonymous, via Wikimedia Commons. CC BY-SA 4.0.",
      "modificationsNotes": "Embedded metadata segments were removed. Pixel dimensions were not changed. No crop and no annotation.",
      "consentBasis": "Uploader published this own-work close-up under the file page CC BY-SA 4.0 template. The frame is back skin without a face or a name."
    },
    {
      "attributionRequired": true,
      "modificationStatus": "other-described",
      "accessDate": "2026-10-01",
      "metadataCheckedAt": "2026-10-01",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g24-02b",
      "type": "dermoscopy",
      "src": "assets/media/cases/case-32-dermoscopy.jpg",
      "dimensions": {
        "width": 760,
        "height": 682
      },
      "alt": "Circular dermoscopic view of a pink field with a brown area, purple ink at the edge, and tick marks along the top. No diagnosis is included.",
      "caption": "Dermoscopic view from the matching file description. Pink, brown, ink, and tick marks are in the field. No further structure was clear enough to name.",
      "source": "Dermanonymous, via Wikimedia Commons",
      "sourceUrl": "https://commons.wikimedia.org/wiki/File:Malignant_Melanoma_Left_Mid_Back_Dermatoscope.jpg",
      "creator": "Dermanonymous",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
      "attribution": "Dermanonymous, via Wikimedia Commons. CC BY-SA 4.0.",
      "modificationsNotes": "Embedded metadata segments were removed. Pixel dimensions were not changed. No crop and no annotation.",
      "consentBasis": "Uploader published this own-work dermoscopic frame under the file page CC BY-SA 4.0 template. No face is in the circular field."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Malignant melanoma (Commons file description, left mid back)",
    "confirmationMethod": "clinical_diagnosis",
    "confirmationNotes": "Both Commons descriptions, checked 2026-10-01, state malignant melanoma, left mid back, marked for biopsy. The dermatoscope file adds that the view is through a dermatoscope. Neither description reports histopathology, a subtype, Breslow thickness, or a stage. Marked for biopsy is not histology.",
    "confidenceNote": "Uploader file description only. Not a Docutis clinician review. Not histopathology. No subtype was added."
  },
  "observations": [
    {
      "id": "obs-g24-02a",
      "kind": "observation",
      "modality": "clinical",
      "text": "A pink and brown patch sits on the skin. Black dots ring the patch."
    },
    {
      "id": "obs-g24-02b",
      "kind": "observation",
      "modality": "dermoscopy",
      "text": "The circular field is mostly pink, with a brown area toward one side. Purple ink is at the edge, and tick marks sit along the top."
    }
  ],
  "interpretations": [
    {
      "id": "int-g24-02a",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g24-02a"
      ],
      "text": "Pink and brown are both in the patch. The black dots read as marker ink, not as a border made of skin."
    },
    {
      "id": "int-g24-02b",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g24-02a",
        "obs-g24-02b"
      ],
      "text": "The circular field shows pink and brown again. No network, streak, or vessel pattern was sharp enough to name. Ink and tick marks stay marks. Absence of those structures does not clear the patch."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Malignant melanoma",
      "supportingFeatures": [
        "The file description uses those words for this back patch.",
        "More than one color, pink and brown, is in the patch."
      ],
      "contradictingFeatures": [
        "No histopathology sentence is on the file page.",
        "The dermoscopic frame does not show a structure clear enough to name."
      ],
      "teachingDistinction": "The source label is not a subtype, a thickness, or a stage. The frames do not add those."
    },
    {
      "diagnosis": "Melanocytic nevus",
      "supportingFeatures": [
        "A pink-brown patch can be a mole."
      ],
      "contradictingFeatures": [
        "No regular network was clear enough to name, and one was not inferred from the label."
      ],
      "teachingDistinction": "A mole remains possible on the look alone. The file label does not settle it."
    },
    {
      "diagnosis": "Seborrheic keratosis",
      "supportingFeatures": [
        "Brown color also appears in the stuck-on keratosis photograph."
      ],
      "contradictingFeatures": [
        "This frame does not show a rough stuck-on plate or dermoscopic ridges."
      ],
      "teachingDistinction": "Shared brown color is not the keratosis surface. Missing ridges do not prove the source label."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g24-02a",
      "title": "Notice first",
      "text": "Name the pink and the brown. Then separate the black dots and, on the circular frame, the purple ink and the tick marks."
    },
    {
      "id": "tp-g24-02b",
      "title": "What the source does not say",
      "text": "The file says malignant melanoma and marked for biopsy. It does not report histopathology, a subtype, Breslow thickness, or a stage. Those were not added."
    }
  ],
  "observationPrompts": [
    "Which colors are in the patch?",
    "Which marks are ink or ticks rather than skin?"
  ],
  "hints": [
    "Black dots and purple ink are marks. Tick marks are a scale."
  ],
  "closestMimic": {
    "name": "Melanocytic nevus",
    "whyClosest": "A pink-brown patch can be a mole. No network was clear on the circular frame, and a network was not inferred."
  },
  "patterns": [
    {
      "id": "pat-g24-02-colors",
      "label": "Pink and brown in one patch",
      "modality": "clinical",
      "specificityNote": "Pink and brown are both visible. That is not the stored pattern of more than one dark color, so this look stays case-specific.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g24-02-ink",
      "label": "Marker dots around the patch",
      "modality": "none",
      "specificityNote": "Black dots ring the clinical patch, and purple ink is at the edge of the circular field. Ink is not a skin border.",
      "certainty": "clearly_visible",
      "weight": "conflicting"
    },
    {
      "id": "pat-g24-02-scale",
      "label": "Tick marks along the circular field",
      "modality": "none",
      "specificityNote": "Tick marks sit along the top of the dermoscopic field. They are a scale, not vessels and not a network.",
      "certainty": "clearly_visible",
      "weight": "conflicting"
    }
  ],
  "synthesis": "The Commons descriptions label these two frames malignant melanoma on the left mid back, marked for biopsy, and say the second is through a dermatoscope. The clinical frame is a pink and brown patch with black dots. The dermoscopic frame is pink and brown with ink and tick marks. No subtype and no histopathology are stated.",
  "evidenceWeighting": "Pink and brown are clearly visible and are the major clue. Ink and the scale are clearly visible and conflict if you read them as skin. The file label is a clinical description, which is weak confirmation. Histopathology has no weight because it is absent.",
  "diagnosticTrap": "Inventing a network or a vessel pattern because the file uses a melanoma term, or dismissing the patch because those structures were not clear.",
  "mentorNote": "The pair is the through-dermatoscope sentence plus the matching date, author, and site wording. Pixels were inspected. Structures that were not sharp were not added. The seborrheic keratosis photograph is a different case.",
  "takeHomeRule": "Pink and brown plus marker ink are a look. An equivocal dermoscopic frame does not prove the file label and does not make the patch safe.",
  "whyNot": [
    {
      "mimic": "Melanocytic nevus",
      "text": "A pink-brown patch can be a mole. No network was clear enough to name. That absence does not prove a mole and does not prove the file label."
    },
    {
      "mimic": "Seborrheic keratosis",
      "text": "The keratosis photograph has a rough stuck-on surface. This patch does not. Missing that surface does not prove either caption."
    }
  ],
  "compareWith": [
    "cmp-g24-back-color"
  ],
  "pairedModality": {
    "clinicalObservation": "A pink and brown patch sits on the skin. Black dots ring the patch.",
    "dermoscopicObservation": "The circular field is mostly pink, with a brown area toward one side. Purple ink is at the edge, and tick marks sit along the top.",
    "addedValue": "The circular frame shows the pink and brown area at contact-dermatoscope range. It does not add a network, streak, or vessel pattern clear enough to name.",
    "reasoningImpact": "The reading stays a pink and brown patch with marker ink. The circular frame does not move that reading to a named structure. Absence of a named structure does not clear the patch.",
    "limits": "The file pages document a dermatoscope view of the described back lesion. They do not report histopathology, a subtype, or a stage. Resolution of the clinical frame is modest. Ridges were not seen and were not inferred from another keratosis file.",
    "informationGain": "dermoscopy_remains_equivocal",
    "informationGainNote": "Educational label only. The circular field shows pink and brown again and does not add a structure clear enough to name. Not a validated metric and not a probability.",
    "comparison": {
      "clinicalClue": "Pink and brown patch with marker dots.",
      "dermoscopicClue": "Pink field, brown area, ink, and tick marks.",
      "addedInformation": "The circular frame does not add a named structure.",
      "diagnosticConflict": "The file description names a diagnosis the frames do not prove.",
      "teachingRule": "Do not invent a structure to match a file label. Do not treat a missing structure as safety."
    }
  },
  "modalityIntegration": "The first frame is the clinical close-up of a pink and brown patch ringed by black dots. The second frame is the circular dermoscopic view and shows pink and brown with ink and tick marks. The second frame does not add a structure clear enough to name.",
  "academy": {
    "level": 4,
    "spectrum": "melanoma",
    "teachingType": "expert-challenge",
    "skillIds": [
      "color-variegation",
      "evidence-weighting"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "localization": null,
  "clinicalAction": "After reveal, open the linked Docutis cutaneous melanoma record for reference context. Do not treat from this case.",
  "managementBrief": "No management category is stored. A file description, including a melanoma term, is not a decision to reassure, monitor, perform dermoscopy, biopsy, or refer. This brief is not a protocol and remains review required.",
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

## case: A small brown macule on the thigh (`case-g25-01`)

- **Exact fingerprint:** `sha256-v1:81f38f0d9243a5a103955de5910e33949d31e8f3040352b7517ccace323975b9`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://doi.org/10.3390/cancers18142183
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g25-01",
  "slug": "g25-thigh-brown-macule-net",
  "title": "A small brown macule on the thigh",
  "diagnosisLabel": "Melanoma in situ",
  "diseaseId": "cutaneous-melanoma",
  "category": "Melanoma",
  "educationalLevel": "intermediate",
  "caseType": "clinical_dermoscopic",
  "patientContext": {
    "ageBand": "59 years, per the figure caption",
    "sex": "Female, per the figure caption",
    "anatomicalSite": "Right thigh",
    "presentationNotes": "The source reports a 5 mm pigmented lesion that was excised after dermoscopy. A ruler is in the clinical frame. No history of change is given."
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g25-01a",
      "type": "clinical",
      "src": "assets/media/cases/case-33-clinical.jpg",
      "dimensions": {
        "width": 361,
        "height": 268
      },
      "alt": "Clinical close-up of a small brown macule with a darker center beside a blue ruler. No diagnosis is included.",
      "caption": "Clinical close-up with a ruler. The source panel letter A is kept in the corner. The source label stays hidden until reveal.",
      "source": "De Giorgi V, Cecchi G, Marabini V, Gurioli G, Perillo G, Fazzari F, Zuccaro B, et al. Cancers 2026, via PubMed Central (PMC13406897)",
      "sourceUrl": "https://doi.org/10.3390/cancers18142183",
      "creator": "Vincenzo De Giorgi and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "De Giorgi and coauthors, Cancers 2026, Figure 2 panel A, doi:10.3390/cancers18142183. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel A of Figure 2 was cropped from the PMC figure file cancers-18-02183-g002.jpg (PMC open-access package PMC13406897.1), source sha256 7c4b404f062fccda702d716a8312c3335af1c88158c7def83ff9d0128608f942, at pixel box left 0, top 0, right 361, bottom 268 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 20bca7e242ef77be6e22a617900f047e7efae449bf75105895b14c4567e1e38c. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that the patients gave written informed consent to publication of their case details. The article is distributed under CC BY 4.0, with no third-party credit on the figure. The frame is thigh skin without a face."
    },
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g25-01b",
      "type": "dermoscopy",
      "src": "assets/media/cases/case-33-dermoscopy.jpg",
      "dimensions": {
        "width": 360,
        "height": 268
      },
      "alt": "Dermoscopic view of a brown lesion with a net of brown lines, darker central areas, a few dark dots, and tick marks at the edge. No diagnosis is included.",
      "caption": "Dermoscopic view of the same case, labeled with the clinical frame as one case by the source. The panel letter B is kept. Tick marks are a scale.",
      "source": "De Giorgi V, Cecchi G, Marabini V, Gurioli G, Perillo G, Fazzari F, Zuccaro B, et al. Cancers 2026, via PubMed Central (PMC13406897)",
      "sourceUrl": "https://doi.org/10.3390/cancers18142183",
      "creator": "Vincenzo De Giorgi and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "De Giorgi and coauthors, Cancers 2026, Figure 2 panel B, doi:10.3390/cancers18142183. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel B of Figure 2 was cropped from the PMC figure file cancers-18-02183-g002.jpg (PMC open-access package PMC13406897.1), source sha256 7c4b404f062fccda702d716a8312c3335af1c88158c7def83ff9d0128608f942, at pixel box left 363, top 0, right 723, bottom 268 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 1e2091ed0c5d825d8b3dfa675ec932fd77ed9d8c491d7b54e4aa3040ad3704a3. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that the patients gave written informed consent to publication of their case details. The article is distributed under CC BY 4.0, with no third-party credit on the figure. The circular field shows skin only."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Melanoma in situ (histopathology stated in the figure caption)",
    "confirmationMethod": "histopathology",
    "histopathologySource": "figure_caption",
    "confirmationNotes": "The Figure 2 caption of De Giorgi and coauthors (Cancers 2026, doi:10.3390/cancers18142183), checked 2026-10-02, labels panels A and B as Case 1 and states: Histopathology confirmed melanoma in situ. No subtype, Breslow thickness, or stage is given for this lesion, and none was added.",
    "confidenceNote": "Source histopathology statement. Docutis did not see a slide. Not a Docutis clinician review."
  },
  "observations": [
    {
      "id": "obs-g25-01a",
      "kind": "observation",
      "modality": "clinical",
      "text": "A small brown macule with a darker center and a lighter brown rim sits beside a ruler. A small lighter lobe touches one edge."
    },
    {
      "id": "obs-g25-01b",
      "kind": "observation",
      "modality": "dermoscopy",
      "text": "A net of brown lines covers most of the lesion. The lines are thicker and darker in the center and fainter toward the edge. A few small dark dots sit in the darker center. A separate brown lobe sits at one side, and tick marks lie along the edge of the field."
    }
  ],
  "interpretations": [
    {
      "id": "int-g25-01a",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g25-01a"
      ],
      "text": "Two shades of brown and an uneven outline are visible on a small lesion. The ruler is a scale, not a skin finding."
    },
    {
      "id": "int-g25-01b",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g25-01a",
        "obs-g25-01b"
      ],
      "text": "The net is not the same everywhere. Thicker, darker central lines and a separate lobe make the net atypical in this frame. The dark dots are few and small. These are reasons for concern, not a diagnosis."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Melanoma in situ",
      "supportingFeatures": [
        "The net is uneven across the lesion.",
        "A few dark dots sit in the darker center.",
        "The figure caption reports histopathology for this lesion."
      ],
      "contradictingFeatures": [
        "The lesion is small.",
        "No blue-white or vessel structure is visible."
      ],
      "teachingDistinction": "The caption's histopathology sentence is the confirmation. The frames justify concern; they do not confirm."
    },
    {
      "diagnosis": "Melanocytic nevus with cytologic atypia",
      "supportingFeatures": [
        "A nevus with cytologic atypia in the same source figure shows a similar uneven net."
      ],
      "contradictingFeatures": [
        "The caption gives a different histopathology result for this lesion."
      ],
      "teachingDistinction": "Dermoscopy did not separate this lesion from the nevus in the same figure. Histopathology did."
    },
    {
      "diagnosis": "Solar lentigo",
      "supportingFeatures": [
        "Flat brown pigment."
      ],
      "contradictingFeatures": [
        "The pigment forms a net of lines, not an even brown area with a moth-eaten edge."
      ],
      "teachingDistinction": "A net of uneven lines is a melanocytic look. A lentigo is not the closest mimic here."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g25-01a",
      "title": "Notice first",
      "text": "Find the brown net, then compare its lines in the center with its lines at the edge. Name the dots only where you can see them."
    },
    {
      "id": "tp-g25-01b",
      "title": "What the source says",
      "text": "The caption reports histopathology for this lesion. It does not give a thickness, a subtype beyond in situ, or a stage. Those were not added."
    }
  ],
  "observationPrompts": [
    "Is the brown net the same in every part of the lesion?",
    "Which marks are scale ticks rather than skin?"
  ],
  "hints": [
    "Compare line thickness in the center with line thickness at the edge."
  ],
  "closestMimic": {
    "name": "Melanocytic nevus with cytologic atypia",
    "whyClosest": "A histopathology-confirmed nevus with cytologic atypia in the same source figure shows a similar uneven net."
  },
  "patterns": [
    {
      "id": "pat-g25-01-network",
      "label": "Uneven brown net",
      "modality": "dermoscopy",
      "specificityNote": "Thicker, darker central lines and fainter edge lines are visible in the frame. The source caption calls the network atypical. The same look appears on a benign case in the same figure.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g25-01-dots",
      "label": "A few small dark central dots",
      "modality": "dermoscopy",
      "specificityNote": "A few small dark dots sit in the darker center. They are too few and small to anchor a reusable dots-and-globules pattern from this frame.",
      "certainty": "probably",
      "weight": "supportive"
    },
    {
      "id": "pat-g25-01-outline",
      "label": "Two browns and an uneven outline",
      "modality": "clinical",
      "specificityNote": "The clinical macule has a darker center, a lighter rim, and a small side lobe. This is a look, not a structure.",
      "certainty": "clearly_visible",
      "weight": "supportive"
    },
    {
      "id": "pat-g25-01-scale",
      "label": "Ruler and tick marks",
      "modality": "none",
      "specificityNote": "A ruler sits beside the clinical macule and tick marks lie along the dermoscopic field. They are scales, not skin.",
      "certainty": "clearly_visible",
      "weight": "conflicting"
    }
  ],
  "synthesis": "The source labels these two frames as one case and states that histopathology confirmed melanoma in situ. The clinical frame shows a small brown macule with two browns. The dermoscopic frame shows an uneven brown net with a few dark central dots.",
  "evidenceWeighting": "The uneven net is clearly visible and is the major clue. The dark dots are probably visible and supportive. The uneven clinical outline is supportive. The ruler and ticks conflict only if read as skin. The histopathology sentence is the confirmation; the dermoscopic look alone did not separate this lesion from a nevus in the same figure.",
  "diagnosticTrap": "Treating an atypical net as a diagnosis, or treating a small diameter as reassurance.",
  "mentorNote": "The source figure holds this case and a nevus with cytologic atypia side by side. Both show an uneven net. Use them together: dermoscopy justified excision of both, and histopathology separated them.",
  "takeHomeRule": "An uneven net on a small macule is a reason for concern and a reason for histopathology. It is not the diagnosis.",
  "whyNot": [
    {
      "mimic": "Melanocytic nevus with cytologic atypia",
      "text": "A nevus in the same figure shows a similar uneven net. Its caption gives a different histopathology result. The frames alone do not separate them."
    },
    {
      "mimic": "Solar lentigo",
      "text": "The pigment forms a net of lines, not an even brown area. A lentigo is not the closest look here."
    }
  ],
  "compareWith": [
    "cmp-g25-network"
  ],
  "pairedModality": {
    "clinicalObservation": "A small brown macule with a darker center and a lighter brown rim sits beside a ruler. A small lighter lobe touches one edge.",
    "dermoscopicObservation": "A net of brown lines covers most of the lesion. The lines are thicker and darker in the center and fainter toward the edge. A few small dark dots sit in the darker center. A separate brown lobe sits at one side, and tick marks lie along the edge of the field.",
    "addedValue": "The dermoscopic frame shows a net of lines with uneven thickness and a few dark dots. The clinical frame shows only two browns and an uneven outline.",
    "reasoningImpact": "The reading moves from a small brown macule to a lesion with an uneven net. That supports concern and excision. It does not confirm a diagnosis.",
    "limits": "The source labels both panels as one case. The panels are crops from one composite figure at modest resolution. The dark dots are small, so their certainty is probable. A nevus in the same figure has a similar net.",
    "informationGain": "dermoscopy_adds_support",
    "informationGainNote": "Educational label only. The dermoscopic frame adds an uneven net and a few dark central dots that the clinical frame does not show. Not a validated metric and not a probability.",
    "comparison": {
      "clinicalClue": "Small brown macule with two browns.",
      "dermoscopicClue": "Uneven brown net with a few dark central dots.",
      "addedInformation": "The net and its unevenness are only visible on the dermoscopic frame.",
      "diagnosticConflict": "A benign case in the same figure shows a similar net.",
      "teachingRule": "An uneven net raises concern. Histopathology, not the net, made the diagnosis."
    }
  },
  "modalityIntegration": "The first frame is the clinical close-up of a small brown macule with a darker center beside a ruler. The second frame is the dermoscopic view of the same source case and shows an uneven brown net with a few dark central dots and a separate lobe.",
  "academy": {
    "level": 3,
    "spectrum": "melanoma",
    "teachingType": "reasoning",
    "skillIds": [
      "pigment-network",
      "evidence-weighting"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "localization": null,
  "clinicalAction": "After reveal, open the linked Docutis cutaneous melanoma record for reference context. Do not treat from this case.",
  "managementBrief": "No management category is stored. The source reports excision and histopathology; that history is not a Docutis recommendation. This brief is not a protocol and remains review required.",
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

## case: A dark brown macule on the lower leg (`case-g25-02`)

- **Exact fingerprint:** `sha256-v1:628bf8a97c0aebfcfa8d8c72dbfdd0b0417a76bc9d1aafe7e889ca944abdb65a`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://doi.org/10.3390/cancers18142183
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g25-02",
  "slug": "g25-leg-dark-macule-net",
  "title": "A dark brown macule on the lower leg",
  "diagnosisLabel": "Lentiginous melanocytic nevus with cytologic atypia",
  "diseaseId": "melanocytic-nevus",
  "category": "Benign melanocytic",
  "educationalLevel": "advanced",
  "caseType": "clinical_dermoscopic",
  "patientContext": {
    "ageBand": "62 years, per the figure caption",
    "sex": "Male, per the figure caption",
    "anatomicalSite": "Right lower leg",
    "presentationNotes": "The source reports a 5 mm pigmented lesion that was excised after dermoscopy. A ruler is in the clinical frame. No history of change is given."
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g25-02a",
      "type": "clinical",
      "src": "assets/media/cases/case-34-clinical.jpg",
      "dimensions": {
        "width": 361,
        "height": 268
      },
      "alt": "Clinical close-up of a small dark brown macule on hair-bearing skin beside a blue ruler. No diagnosis is included.",
      "caption": "Clinical close-up with a ruler. The source panel letter C is kept in the corner. The source label stays hidden until reveal.",
      "source": "De Giorgi V, Cecchi G, Marabini V, Gurioli G, Perillo G, Fazzari F, Zuccaro B, et al. Cancers 2026, via PubMed Central (PMC13406897)",
      "sourceUrl": "https://doi.org/10.3390/cancers18142183",
      "creator": "Vincenzo De Giorgi and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "De Giorgi and coauthors, Cancers 2026, Figure 2 panel C, doi:10.3390/cancers18142183. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel C of Figure 2 was cropped from the PMC figure file cancers-18-02183-g002.jpg (PMC open-access package PMC13406897.1), source sha256 7c4b404f062fccda702d716a8312c3335af1c88158c7def83ff9d0128608f942, at pixel box left 0, top 270, right 361, bottom 538 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 3cb08364c5e0eb24b16ec701ed82676974ee93e0bb661339ef05bfa09610d34a. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that the patients gave written informed consent to publication of their case details. The article is distributed under CC BY 4.0, with no third-party credit on the figure. The frame is lower-leg skin without a face."
    },
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g25-02b",
      "type": "dermoscopy",
      "src": "assets/media/cases/case-34-dermoscopy.jpg",
      "dimensions": {
        "width": 360,
        "height": 268
      },
      "alt": "Dermoscopic view of an irregular brown area with a net of brown lines, air bubbles, hairs, and tick marks. No diagnosis is included.",
      "caption": "Dermoscopic view of the same case, labeled with the clinical frame as one case by the source. The panel letter D is kept. Bubbles and ticks are not skin.",
      "source": "De Giorgi V, Cecchi G, Marabini V, Gurioli G, Perillo G, Fazzari F, Zuccaro B, et al. Cancers 2026, via PubMed Central (PMC13406897)",
      "sourceUrl": "https://doi.org/10.3390/cancers18142183",
      "creator": "Vincenzo De Giorgi and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "De Giorgi and coauthors, Cancers 2026, Figure 2 panel D, doi:10.3390/cancers18142183. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel D of Figure 2 was cropped from the PMC figure file cancers-18-02183-g002.jpg (PMC open-access package PMC13406897.1), source sha256 7c4b404f062fccda702d716a8312c3335af1c88158c7def83ff9d0128608f942, at pixel box left 363, top 270, right 723, bottom 538 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 781637b095f84a09fef8566498537db9493d43d0193c888ee6654af3cc8f0af0. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that the patients gave written informed consent to publication of their case details. The article is distributed under CC BY 4.0, with no third-party credit on the figure. The circular field shows skin only."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Lentiginous melanocytic nevus with cytologic atypia (histopathology stated in the figure caption)",
    "confirmationMethod": "histopathology",
    "histopathologySource": "figure_caption",
    "confirmationNotes": "The Figure 2 caption of De Giorgi and coauthors (Cancers 2026, doi:10.3390/cancers18142183), checked 2026-10-02, labels panels C and D as Case 2 and states: Histopathology confirmed a lentiginous melanocytic nevus with cytologic atypia. The source term was kept. No grade beyond that wording was added.",
    "confidenceNote": "Source histopathology statement. Docutis did not see a slide. A benign histopathology result for this lesion does not clear any other lesion."
  },
  "observations": [
    {
      "id": "obs-g25-02a",
      "kind": "observation",
      "modality": "clinical",
      "text": "A small dark brown macule with an uneven outline sits on hair-bearing skin beside a ruler."
    },
    {
      "id": "obs-g25-02b",
      "kind": "observation",
      "modality": "dermoscopy",
      "text": "A net of brown lines covers an irregular brown area. The lines are darker and thicker toward the center. Round clear air bubbles, hairs, and black tick marks cross the field."
    }
  ],
  "interpretations": [
    {
      "id": "int-g25-02a",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g25-02a"
      ],
      "text": "The macule is dark and its outline is uneven. The ruler is a scale."
    },
    {
      "id": "int-g25-02b",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g25-02a",
        "obs-g25-02b"
      ],
      "text": "The net is uneven, darker and thicker toward the center. That is the same kind of atypical net seen on a melanoma in situ case from the same figure. Bubbles, hairs, and ticks are not structures."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Melanoma in situ",
      "supportingFeatures": [
        "The net is uneven, with thicker central lines.",
        "The outline is irregular."
      ],
      "contradictingFeatures": [
        "The caption reports a nevus with cytologic atypia on histopathology."
      ],
      "teachingDistinction": "Melanoma was a fair concern from the frames. Histopathology answered it for this lesion only."
    },
    {
      "diagnosis": "Lentiginous melanocytic nevus with cytologic atypia",
      "supportingFeatures": [
        "A brown net is present, which is a melanocytic look.",
        "The caption reports this histopathology result."
      ],
      "contradictingFeatures": [
        "Nothing in the frames proves a benign lesion."
      ],
      "teachingDistinction": "The benign name comes from histopathology, not from a dermoscopic feature."
    },
    {
      "diagnosis": "Common acquired nevus",
      "supportingFeatures": [
        "A small brown macule with a net."
      ],
      "contradictingFeatures": [
        "The net is uneven and the outline is irregular."
      ],
      "teachingDistinction": "An ordinary-looking mole would not usually be excised for this net. This one was."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g25-02a",
      "title": "Notice first",
      "text": "Find the net, then separate it from the air bubbles, hairs, and tick marks that cross the field."
    },
    {
      "id": "tp-g25-02b",
      "title": "What histopathology added",
      "text": "The caption reports a nevus with cytologic atypia. The dermoscopic look did not predict that result. It is not reassurance for the next uneven net."
    }
  ],
  "observationPrompts": [
    "Where is the net darkest and thickest?",
    "Which round shapes are air bubbles rather than skin structures?"
  ],
  "hints": [
    "Clear round rings are bubbles in the contact fluid."
  ],
  "closestMimic": {
    "name": "Melanoma in situ",
    "whyClosest": "A histopathology-confirmed melanoma in situ in the same source figure shows a similar uneven net."
  },
  "patterns": [
    {
      "id": "pat-g25-02-network",
      "label": "Uneven brown net",
      "modality": "dermoscopy",
      "specificityNote": "The net is darker and thicker toward the center and fainter at the edge. The source caption calls it atypical. The same look appears on a melanoma in situ in the same figure.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g25-02-bubbles",
      "label": "Air bubbles and hairs in the field",
      "modality": "none",
      "specificityNote": "Clear round rings are air bubbles in contact fluid, and hairs cross the field. They hide parts of the net and are not structures.",
      "certainty": "clearly_visible",
      "weight": "conflicting"
    },
    {
      "id": "pat-g25-02-scale",
      "label": "Ruler and tick marks",
      "modality": "none",
      "specificityNote": "A ruler sits beside the clinical macule and black tick marks cross the dermoscopic field. They are scales, not skin.",
      "certainty": "clearly_visible",
      "weight": "conflicting"
    }
  ],
  "synthesis": "The source labels these two frames as one case and reports a lentiginous melanocytic nevus with cytologic atypia on histopathology. The dermoscopic frame shows an uneven brown net like the melanoma in situ case in the same figure.",
  "evidenceWeighting": "The uneven net is clearly visible and is the major reason melanoma was plausible. Bubbles, hairs, and ticks conflict if read as skin. The histopathology sentence is the confirmation. No dermoscopic feature in these frames argues strongly toward the benign result.",
  "diagnosticTrap": "Assuming that an excised lesion with an atypical net must be melanoma, or using this benign result to dismiss the next atypical net.",
  "mentorNote": "This is the benign half of a matched teaching pair from one figure. It teaches why melanoma was plausible and that histopathology, not a dermoscopic discriminator, answered the question.",
  "takeHomeRule": "A benign histopathology result after an atypical net is an answer for that lesion. It is not a rule that atypical nets are benign.",
  "whyNot": [
    {
      "mimic": "Melanoma in situ",
      "text": "The melanoma in situ in the same figure has a similar uneven net. These frames do not hold a feature that separates them; the caption's histopathology does."
    },
    {
      "mimic": "Common acquired nevus",
      "text": "The net is uneven and the outline is irregular. That is why the lesion was excised rather than called ordinary."
    }
  ],
  "compareWith": [
    "cmp-g25-network"
  ],
  "pairedModality": {
    "clinicalObservation": "A small dark brown macule with an uneven outline sits on hair-bearing skin beside a ruler.",
    "dermoscopicObservation": "A net of brown lines covers an irregular brown area. The lines are darker and thicker toward the center. Round clear air bubbles, hairs, and black tick marks cross the field.",
    "addedValue": "The dermoscopic frame shows an uneven net that the clinical frame cannot show.",
    "reasoningImpact": "The net makes melanoma a fair concern. It does not move the reading toward the benign result.",
    "limits": "The source labels both panels as one case. The panels are crops from one composite figure at modest resolution. Bubbles and hairs hide part of the net.",
    "informationGain": "dermoscopy_adds_support",
    "informationGainNote": "Educational label only. The dermoscopic frame adds an uneven net that the clinical frame does not show. That net supported excision; it did not predict the benign histopathology. Not a validated metric and not a probability.",
    "comparison": {
      "clinicalClue": "Small dark macule with an uneven outline.",
      "dermoscopicClue": "Uneven brown net, darker in the center.",
      "addedInformation": "The net is only visible on the dermoscopic frame.",
      "diagnosticConflict": "The net looks like the net on a melanoma in situ case from the same figure.",
      "teachingRule": "A shared net means both lesions needed histopathology. It is not a discriminator."
    }
  },
  "modalityIntegration": "The first frame is the clinical close-up of a small dark brown macule beside a ruler. The second frame is the dermoscopic view of the same source case and shows an uneven brown net with air bubbles, hairs, and tick marks.",
  "academy": {
    "level": 4,
    "spectrum": "mimic",
    "teachingType": "reasoning",
    "skillIds": [
      "pigment-network"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "localization": null,
  "clinicalAction": "After reveal, compare with the melanoma in situ case from the same figure. Do not treat from this case.",
  "managementBrief": "No management category is stored. The source reports excision and histopathology; that history is not a Docutis recommendation and is not reassurance for another lesion. This brief is not a protocol and remains review required.",
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

## case: A pink papule in the scalp (`case-g25-03`)

- **Exact fingerprint:** `sha256-v1:826adbe5821179be6fa4b3e969bf5675edee1c45ca6ef21238a4b0a866173c39`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://doi.org/10.1038/s41598-022-17108-z
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g25-03",
  "slug": "g25-scalp-pink-papule-vessels",
  "title": "A pink papule in the scalp",
  "diagnosisLabel": "Nodular melanoma, amelanotic",
  "diseaseId": "nodular-melanoma",
  "category": "Melanoma",
  "educationalLevel": "advanced",
  "caseType": "clinical_dermoscopic",
  "patientContext": {
    "ageBand": "74 years, per the figure caption",
    "sex": "Male, per the figure caption",
    "anatomicalSite": "Scalp vertex",
    "presentationNotes": "The source describes an amelanotic papule in the scalp vertex. No history of change is given."
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g25-03a",
      "type": "clinical",
      "src": "assets/media/cases/case-35-clinical.jpg",
      "dimensions": {
        "width": 832,
        "height": 1003
      },
      "alt": "Clinical close-up of a pink dome-shaped papule in grey and dark hair with a small dark crust at one side. No diagnosis is included.",
      "caption": "Clinical close-up of hair-bearing scalp. The source label stays hidden until reveal.",
      "source": "Porto AC, Blumetti TP, Calsavara VF, Torrezan GT, de Paula CAA, Lellis R, Duprat Neto JP, Carraro DM, Braga JCT. Scientific Reports 2022, via PubMed Central (PMC9445057)",
      "sourceUrl": "https://doi.org/10.1038/s41598-022-17108-z",
      "creator": "Ana Carolina Porto and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Porto and coauthors, Scientific Reports 2022, Figure 5 panel A, doi:10.1038/s41598-022-17108-z. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel A of Figure 5 was cropped from the figure image embedded on page 8 of the article PDF in the PMC open-access package PMC9445057.1 (PDF image object 173, 1535 x 1003 pixels), source sha256 1ebeefcf60dd7388981435d264d7d913a2b09f4c3b69f8274b88a06273c42c7f, at pixel box left 0, top 0, right 832, bottom 1003 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 7c9e4b1d0ea2267c1081236b03baae270bb59208844324eb401cd961e1d0c9f0. No color change, no annotation, and no other edit.",
      "consentBasis": "The article is distributed under CC BY 4.0, with no third-party credit on the figure. The frame is hair-bearing scalp without a face."
    },
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g25-03b",
      "type": "dermoscopy",
      "src": "assets/media/cases/case-35-dermoscopy.jpg",
      "dimensions": {
        "width": 700,
        "height": 1003
      },
      "alt": "Dermoscopic view of a pink field with fine purple-red curved lines, small red dots, an orange-brown crust, and white hairs. No diagnosis is included.",
      "caption": "Dermoscopic image of the same lesion, per the source caption. Hairs cross the field.",
      "source": "Porto AC, Blumetti TP, Calsavara VF, Torrezan GT, de Paula CAA, Lellis R, Duprat Neto JP, Carraro DM, Braga JCT. Scientific Reports 2022, via PubMed Central (PMC9445057)",
      "sourceUrl": "https://doi.org/10.1038/s41598-022-17108-z",
      "creator": "Ana Carolina Porto and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Porto and coauthors, Scientific Reports 2022, Figure 5 panel B, doi:10.1038/s41598-022-17108-z. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel B of Figure 5 was cropped from the figure image embedded on page 8 of the article PDF in the PMC open-access package PMC9445057.1 (PDF image object 173, 1535 x 1003 pixels), source sha256 1ebeefcf60dd7388981435d264d7d913a2b09f4c3b69f8274b88a06273c42c7f, at pixel box left 835, top 0, right 1535, bottom 1003 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 2ca1bc48d2f279b7c51a26dcd5fb31a40ce3f15baa14c82af8e4a053da6e2146. No color change, no annotation, and no other edit.",
      "consentBasis": "The article is distributed under CC BY 4.0, with no third-party credit on the figure. The frame is hair-bearing scalp without a face."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Nodular melanoma, amelanotic (histopathology stated in the figure caption)",
    "confirmationMethod": "histopathology",
    "histopathologySource": "figure_caption",
    "confirmationNotes": "The Figure 5 caption of Porto and coauthors (Scientific Reports 2022, doi:10.1038/s41598-022-17108-z), checked 2026-10-02, describes an amelanotic papule in the scalp vertex, says panel B is the dermoscopic image of the lesion, and states: Histopathological examination showed a nodular melanoma with a Breslow thickness of 5.5 mm. The subtype and thickness are the source's. No stage was added.",
    "confidenceNote": "Source histopathology statement. Docutis did not see a slide. Not a Docutis clinician review."
  },
  "observations": [
    {
      "id": "obs-g25-03a",
      "kind": "observation",
      "modality": "clinical",
      "text": "A pink dome-shaped papule sits in hair-bearing scalp. A small dark crust touches one side, and grey and white hairs cross the frame."
    },
    {
      "id": "obs-g25-03b",
      "kind": "observation",
      "modality": "dermoscopy",
      "text": "The field is pink. Fine purple-red lines run in short irregular curves in the center, and small red dots are scattered around them. A small orange-brown crust sits to one side. White hairs cross the field."
    }
  ],
  "interpretations": [
    {
      "id": "int-g25-03a",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g25-03a"
      ],
      "text": "A pink papule without brown pigment is the look. Missing pigment is not reassurance."
    },
    {
      "id": "int-g25-03b",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g25-03a",
        "obs-g25-03b"
      ],
      "text": "Two vessel shapes, dotted and short irregular linear, sit in one pink field. That is a mixed vessel pattern, not the long branching vessels stored on the basal cell carcinoma dermoscopy case. The crust is described, not renamed."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Amelanotic nodular melanoma",
      "supportingFeatures": [
        "A pink papule without brown pigment.",
        "Dotted and short linear vessels together.",
        "The caption reports histopathology."
      ],
      "contradictingFeatures": [
        "Nothing in the frames proves a melanocytic tumor."
      ],
      "teachingDistinction": "The vessel mix raises concern. The histopathology sentence names the tumor."
    },
    {
      "diagnosis": "Nodular basal cell carcinoma",
      "supportingFeatures": [
        "A pink papule on sun-exposed skin of an older adult.",
        "Visible vessels on a pink field."
      ],
      "contradictingFeatures": [
        "The vessels are short and mixed, not long sharp branching vessels."
      ],
      "teachingDistinction": "Vessel shape is the comparison you can make in these frames. It is not proof."
    },
    {
      "diagnosis": "Inflamed or traumatized benign papule",
      "supportingFeatures": [
        "A crust is present."
      ],
      "contradictingFeatures": [
        "Mixed vessels across a pink papule are not explained by a crust."
      ],
      "teachingDistinction": "A crust is a reason to look again, not a reason to stop."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g25-03a",
      "title": "Notice first",
      "text": "Describe the papule as pink, without brown pigment. Then name each vessel shape you can see on the dermoscopic frame."
    },
    {
      "id": "tp-g25-03b",
      "title": "What the source says",
      "text": "The caption reports a nodular subtype and a thickness from histopathology. Those words come from the source; the frames do not show thickness."
    }
  ],
  "observationPrompts": [
    "How many different vessel shapes can you name?",
    "Which parts of the dermoscopic field are hair or crust rather than vessels?"
  ],
  "hints": [
    "Separate dots from short curved lines before naming a pattern."
  ],
  "closestMimic": {
    "name": "Nodular basal cell carcinoma",
    "whyClosest": "A pink papule with visible vessels on sun-exposed skin is a common basal cell carcinoma look. The stored basal cell carcinoma dermoscopy case shows long branching vessels instead."
  },
  "patterns": [
    {
      "id": "pat-g25-03-papule",
      "label": "Pink papule without brown pigment",
      "modality": "clinical",
      "specificityNote": "The papule is pink and dome-shaped, with no brown pigment in it. Missing pigment does not lower concern.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g25-03-vessels",
      "label": "Dotted and short linear vessels together",
      "modality": "dermoscopy",
      "specificityNote": "Fine irregular linear vessels and scattered red dots share one pink field. They are fine at this resolution, so the certainty is probable.",
      "certainty": "probably",
      "weight": "major"
    },
    {
      "id": "pat-g25-03-crust",
      "label": "Small orange-brown crust",
      "modality": "dermoscopy",
      "specificityNote": "A small orange-brown crust sits to one side. The caption calls the finding ulceration. No ulceration pattern was encoded from the caption.",
      "certainty": "clearly_visible",
      "weight": "supportive"
    }
  ],
  "synthesis": "The source reports this scalp papule as a nodular melanoma on histopathology and says the dermoscopic frame is the same lesion. The clinical frame is a pink papule without pigment. The dermoscopic frame shows dotted and short linear vessels together and a small crust.",
  "evidenceWeighting": "The pink papule is clearly visible and is the major clinical look. The vessel mix is probably visible and is the major dermoscopic clue. The crust is supportive. The histopathology sentence is the confirmation.",
  "diagnosticTrap": "Feeling reassured because there is no brown pigment, or calling every pink papule with vessels a basal cell carcinoma.",
  "mentorNote": "This is the second stored example of mixed vessels in Docutis and the first one paired with its clinical frame. Compare it with the basal cell carcinoma dermoscopy case: the vessel shapes, not the pink color, carry the comparison.",
  "takeHomeRule": "A pink papule with more than one vessel shape needs a differential that includes amelanotic melanoma.",
  "whyNot": [
    {
      "mimic": "Nodular basal cell carcinoma",
      "text": "The stored basal cell carcinoma dermoscopy case shows long sharp branching vessels. This field shows short mixed vessels and dots. That difference raises concern; it does not exclude a basal cell carcinoma by itself."
    },
    {
      "mimic": "Inflamed or traumatized benign papule",
      "text": "The crust is real, but it does not explain a mixed vessel pattern across the papule."
    }
  ],
  "compareWith": [
    "cmp-g25-pink-vessels"
  ],
  "pairedModality": {
    "clinicalObservation": "A pink dome-shaped papule sits in hair-bearing scalp. A small dark crust touches one side, and grey and white hairs cross the frame.",
    "dermoscopicObservation": "The field is pink. Fine purple-red lines run in short irregular curves in the center, and small red dots are scattered around them. A small orange-brown crust sits to one side. White hairs cross the field.",
    "addedValue": "The dermoscopic frame resolves two vessel shapes that the clinical frame shows only as pink color.",
    "reasoningImpact": "The reading moves from a pink papule to a pink papule with mixed vessels. That widens the differential beyond a basal cell carcinoma.",
    "limits": "The caption says panel B is the dermoscopic image of the lesion. The vessels are fine at this resolution, so their certainty is probable. Hair covers part of the field.",
    "informationGain": "dermoscopy_adds_support",
    "informationGainNote": "Educational label only. The dermoscopic frame adds two vessel shapes and a crust that the clinical frame does not resolve. Not a validated metric and not a probability.",
    "comparison": {
      "clinicalClue": "Pink papule without brown pigment.",
      "dermoscopicClue": "Dotted and short linear vessels on pink.",
      "addedInformation": "The vessel shapes are only visible on the dermoscopic frame.",
      "diagnosticConflict": null,
      "teachingRule": "Name each vessel shape before you name a tumor."
    }
  },
  "modalityIntegration": "The first frame is the clinical close-up of a pink dome-shaped papule in hair-bearing scalp. The second frame is the dermoscopic image of the same lesion and shows dotted and short linear vessels on a pink field with a small crust.",
  "academy": {
    "level": 4,
    "spectrum": "melanoma",
    "teachingType": "reasoning",
    "skillIds": [
      "pink-nodule",
      "polymorphous-vessels"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "localization": null,
  "clinicalAction": "After reveal, open the linked Docutis nodular melanoma record for reference context. Do not treat from this case.",
  "managementBrief": "No management category is stored. The source reports histopathology; that history is not a Docutis recommendation. This brief is not a protocol and remains review required.",
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

## case: A brown macule on the heel (`case-g25-04`)

- **Exact fingerprint:** `sha256-v1:96b097a57030901652b6e4cf415540bc1a6b04da638fa358d65225b1b5ba2a1d`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://doi.org/10.1111/ijd.70384
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g25-04",
  "slug": "g25-heel-brown-macule-bands",
  "title": "A brown macule on the heel",
  "diagnosisLabel": "Acral melanoma in situ",
  "diseaseId": "acral-melanoma",
  "category": "Melanoma",
  "educationalLevel": "intermediate",
  "caseType": "clinical_dermoscopic",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Left heel, plantar sole",
    "presentationNotes": "The source figure is titled with the diagnosis and the left heel. Age and sex are not given for this lesion. The second smudge on the sole is not described by the source."
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g25-04a",
      "type": "clinical",
      "src": "assets/media/cases/case-36-clinical.jpg",
      "dimensions": {
        "width": 590,
        "height": 1125
      },
      "alt": "Clinical photograph of the sole of a foot with a brown macule on the heel. No diagnosis is included.",
      "caption": "Clinical photograph of the sole. The source panel letter a is kept. The source label stays hidden until reveal.",
      "source": "Erol Mart HM, Aydemir AT, Pietkiewicz P, Akay BN. International Journal of Dermatology 2026, via PubMed Central (PMC13342755)",
      "sourceUrl": "https://doi.org/10.1111/ijd.70384",
      "creator": "Handan Merve Erol Mart and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Erol Mart and coauthors, International Journal of Dermatology 2026, Figure 2 panel a, doi:10.1111/ijd.70384. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel a of Figure 2 was cropped from the figure image embedded on page 4 of the article PDF in the PMC open-access package PMC13342755.1 (PDF image object 8, 2081 x 1125 pixels), source sha256 d1f0bb44313b192ef232ff3ed21920d3d04c6b51265e97541d7927ad4a3a1207, at pixel box left 0, top 0, right 590, bottom 1125 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 f4104b35a6c946f1d3bcd99b4aab84fcdcabb9ce12ce7b75bc135d4ebff2b184. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that written informed consent was obtained from all patients and that consent for publication was submitted to the journal. The article is distributed under CC BY 4.0, with no third-party credit on the figure. The frame is the sole of a foot without a face."
    },
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g25-04b",
      "type": "dermoscopy",
      "src": "assets/media/cases/case-36-dermoscopy.jpg",
      "dimensions": {
        "width": 732,
        "height": 555
      },
      "alt": "Polarized dermoscopic view of brown pigment arranged in many parallel bands with thin pale lines between them. No diagnosis is included.",
      "caption": "Polarized dermoscopic view of the same lesion, per the source figure. The panel letter b is kept.",
      "source": "Erol Mart HM, Aydemir AT, Pietkiewicz P, Akay BN. International Journal of Dermatology 2026, via PubMed Central (PMC13342755)",
      "sourceUrl": "https://doi.org/10.1111/ijd.70384",
      "creator": "Handan Merve Erol Mart and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Erol Mart and coauthors, International Journal of Dermatology 2026, Figure 2 panel b, doi:10.1111/ijd.70384. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel b of Figure 2 was cropped from the figure image embedded on page 4 of the article PDF in the PMC open-access package PMC13342755.1 (PDF image object 8, 2081 x 1125 pixels), source sha256 d1f0bb44313b192ef232ff3ed21920d3d04c6b51265e97541d7927ad4a3a1207, at pixel box left 593, top 0, right 1325, bottom 555 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 9daffc8492ea5c70b6a70c79ebac122ff5b35f07d35ef6af5a9fcf760406d7b4. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that written informed consent was obtained from all patients and that consent for publication was submitted to the journal. The article is distributed under CC BY 4.0, with no third-party credit on the figure. The circular field shows skin only."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Acral melanoma in situ (histopathology stated in the article methods)",
    "confirmationMethod": "histopathology",
    "histopathologySource": "article_methods",
    "confirmationNotes": "Figure 2 of Erol Mart and coauthors (International Journal of Dermatology 2026, doi:10.1111/ijd.70384), checked 2026-10-02, is titled melanoma in situ on the left heel. The methods state that for melanomas only pathology confirmed cases were included. The histopathology statement is study-level, not a sentence about this figure alone.",
    "confidenceNote": "Study-level histopathology statement. Docutis did not see a slide. The figure caption calls the dermoscopic pattern a parallel ridge pattern; Docutis encoded it from the band widths and kept it probable."
  },
  "observations": [
    {
      "id": "obs-g25-04a",
      "kind": "observation",
      "modality": "clinical",
      "text": "A brown macule with an uneven edge sits on the heel of the sole. A fainter grey-brown smudge is elsewhere on the sole."
    },
    {
      "id": "obs-g25-04b",
      "kind": "observation",
      "modality": "dermoscopy",
      "text": "Brown pigment runs in many parallel bands across the lesion. The brown bands are broad and the pale lines between them are thin. A darker focus sits near the center, and the outer edge is uneven."
    }
  ],
  "interpretations": [
    {
      "id": "int-g25-04a",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g25-04a"
      ],
      "text": "Pigment on the sole is acral pigment and is read on its own site. Acral location is not reassuring. The second smudge is not interpreted."
    },
    {
      "id": "int-g25-04b",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g25-04a",
        "obs-g25-04b"
      ],
      "text": "Broad pigmented bands with thin pale lines between them favor pigment on the ridges rather than in the furrows. Sweat-duct openings are not resolved, so the ridge reading stays probable."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Acral melanoma in situ",
      "supportingFeatures": [
        "Pigment is in broad parallel bands, a ridge-type look.",
        "The edge is uneven and a darker central focus is present.",
        "The source states pathology confirmation for melanomas in the study."
      ],
      "contradictingFeatures": [
        "No blue-white or vessel structure is visible."
      ],
      "teachingDistinction": "The ridge-type bands are the clue. The source's pathology statement is the confirmation."
    },
    {
      "diagnosis": "Acral melanocytic nevus",
      "supportingFeatures": [
        "A flat brown macule on the sole.",
        "Parallel lines are common in acral nevi."
      ],
      "contradictingFeatures": [
        "In a typical acral nevus pattern the pigmented lines are thin and lie in the furrows; here the pigmented bands are broad."
      ],
      "teachingDistinction": "Compare band widths before calling a parallel pattern benign."
    },
    {
      "diagnosis": "Subcorneal haemorrhage",
      "supportingFeatures": [
        "Pigment on the heel can be blood after friction."
      ],
      "contradictingFeatures": [
        "The color is brown, not red-black, and it forms regular bands across the lesion."
      ],
      "teachingDistinction": "Blood on the heel is a separate trap. No blood color is seen here."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g25-04a",
      "title": "Notice first",
      "text": "Confirm the site is the sole. Then compare the width of the brown bands with the width of the pale lines."
    },
    {
      "id": "tp-g25-04b",
      "title": "What the source says",
      "text": "The figure is titled melanoma in situ on the left heel, and the methods say melanomas were pathology confirmed. No thickness or stage was added."
    }
  ],
  "observationPrompts": [
    "Are the brown bands wider or narrower than the pale lines between them?",
    "Is the site palm or sole skin?"
  ],
  "hints": [
    "On the sole, pigment on the broad ridges looks like wide brown bands."
  ],
  "closestMimic": {
    "name": "Acral melanocytic nevus",
    "whyClosest": "A flat brown macule with parallel lines on the sole is a common nevus look. No benign acral case with dermoscopy is stored yet in Docutis."
  },
  "patterns": [
    {
      "id": "pat-g25-04-ridges",
      "label": "Broad parallel pigmented bands on the sole",
      "modality": "dermoscopy",
      "specificityNote": "The pigmented bands are broad and the pale lines between them are thin, which favors pigment on the ridges. Sweat-duct openings are not resolved, so the certainty stays probable.",
      "certainty": "probably",
      "weight": "major"
    },
    {
      "id": "pat-g25-04-focus",
      "label": "Darker central focus",
      "modality": "dermoscopy",
      "specificityNote": "A darker brown focus sits near the center of the lesion. It is a case-specific observation.",
      "certainty": "clearly_visible",
      "weight": "supportive"
    }
  ],
  "synthesis": "The source titles this heel lesion melanoma in situ and states that melanomas in the study were pathology confirmed. The clinical frame shows a brown macule on the heel. The dermoscopic frame shows broad parallel brown bands with thin pale lines between them.",
  "evidenceWeighting": "The parallel bands are clearly visible; their ridge assignment is probable and is the major clue. The darker focus is supportive. The study-level pathology statement is the confirmation and is weaker than a sentence about this lesion alone.",
  "diagnosticTrap": "Calling every parallel pattern on the sole a benign acral nevus, or deciding ridge versus furrow from the diagnosis rather than from the band widths.",
  "mentorNote": "This is the first acral dermoscopic case in Docutis. It joins the clinical-only plantar case. A benign acral comparison is still missing; do not treat this one case as the whole acral lesson.",
  "takeHomeRule": "On the sole, compare band widths. Broad pigmented bands with thin pale lines are a ridge-type pattern and need a melanoma differential.",
  "whyNot": [
    {
      "mimic": "Acral melanocytic nevus",
      "text": "A typical acral nevus pattern places thin pigmented lines in the furrows. Here the pigmented bands are broad. That raises concern; it is not proof on its own."
    },
    {
      "mimic": "Subcorneal haemorrhage",
      "text": "The color is brown and banded, not red-black. Blood is a separate heel trap."
    }
  ],
  "compareWith": [],
  "pairedModality": {
    "clinicalObservation": "A brown macule with an uneven edge sits on the heel of the sole. A fainter grey-brown smudge is elsewhere on the sole.",
    "dermoscopicObservation": "Brown pigment runs in many parallel bands across the lesion. The brown bands are broad and the pale lines between them are thin. A darker focus sits near the center, and the outer edge is uneven.",
    "addedValue": "The dermoscopic frame shows how the pigment sits on the skin markings. The clinical frame shows only a brown macule.",
    "reasoningImpact": "The reading moves from a brown heel macule to a lesion with a ridge-type parallel pattern. That keeps a malignant melanocytic lesion high in the differential.",
    "limits": "The figure is titled with one lesion and the dermoscopic panels belong to it. The histopathology statement is study-level. Sweat-duct openings are not resolved. The clinical frame also shows a second smudge that the source does not describe.",
    "informationGain": "dermoscopy_adds_support",
    "informationGainNote": "Educational label only. The dermoscopic frame adds parallel bands whose width favors pigment on the ridges. Sweat-duct openings are not resolved. Not a validated metric and not a probability.",
    "comparison": {
      "clinicalClue": "Brown macule on the heel.",
      "dermoscopicClue": "Broad brown parallel bands, thin pale lines.",
      "addedInformation": "The ridge-type arrangement is only visible on the dermoscopic frame.",
      "diagnosticConflict": null,
      "teachingRule": "Read band width on the sole before naming a parallel pattern."
    }
  },
  "modalityIntegration": "The first frame is the clinical photograph of the sole with a brown macule on the heel. The second frame is the polarized dermoscopic view of the same heel lesion and shows broad parallel brown bands with thin pale lines between them.",
  "academy": {
    "level": 3,
    "spectrum": "melanoma",
    "teachingType": "teaching",
    "skillIds": [
      "acral-pigment",
      "parallel-pigment-lines"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "localization": null,
  "clinicalAction": "After reveal, open the linked Docutis acral melanoma record for reference context. Do not treat from this case.",
  "managementBrief": "No management category is stored. A ridge-type pattern in a teaching frame is not a decision to biopsy or refer for a real patient. This brief is not a protocol and remains review required.",
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

## case: A faint brown patch near the eye (`case-g25-05`)

- **Exact fingerprint:** `sha256-v1:1566a31603b6cf3eb0bf3637f21ab6340885d6beaa536446a60d116e349070da`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://doi.org/10.3390/diagnostics14222571
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g25-05",
  "slug": "g25-face-faint-brown-patch-gray-dots",
  "title": "A faint brown patch near the eye",
  "diagnosisLabel": "Lentigo maligna (melanoma in situ)",
  "diseaseId": "lentigo-maligna",
  "category": "Melanoma",
  "educationalLevel": "advanced",
  "caseType": "clinical_dermoscopic",
  "patientContext": {
    "ageBand": "66 years, per the figure caption",
    "sex": "Male, per the figure caption",
    "anatomicalSite": "Face, periorbital region",
    "presentationNotes": "The source figure shows atypical pigmented facial lesions of the periorbital region with a similar clinical look. The caption gives a 9 mm maximum diameter. No history of change is given."
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g25-05a",
      "type": "clinical",
      "src": "assets/media/cases/case-37-clinical.jpg",
      "dimensions": {
        "width": 380,
        "height": 287
      },
      "alt": "Clinical photograph of the side of a face near the hairline with a faint brown patch near the outer corner of the eye. No diagnosis is included.",
      "caption": "Clinical photograph of the periorbital region. The source label stays hidden until reveal.",
      "source": "Rubegni G, Cartocci A, Tognetti L, Orione M, Gagliano C, Bacci T, et al. Diagnostics 2024, via PubMed Central (PMC11593280)",
      "sourceUrl": "https://doi.org/10.3390/diagnostics14222571",
      "creator": "Giovanni Rubegni and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Rubegni and coauthors, Diagnostics 2024, Figure 1 panel e, doi:10.3390/diagnostics14222571. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel e of Figure 1 was cropped from the PMC figure file diagnostics-14-02571-g001b.jpg (second part of Figure 1, PMC open-access package PMC11593280.1), source sha256 4d45ed4504f7467436a184fc4a6730c17a3a756d2ced5bb4ff9a309a137c05fb, at pixel box left 5, top 337, right 385, bottom 624 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 87b65469afd3018110af5c11bfa0e68567566deab12ac4ffd5890b880ea4489b. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that all patients signed informed written consent and approved sharing of study data. The article is distributed under CC BY 4.0, with no third-party credit on the figure. The crop shows the temple and cheek without the eye or full face."
    },
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g25-05b",
      "type": "dermoscopy",
      "src": "assets/media/cases/case-37-dermoscopy.jpg",
      "dimensions": {
        "width": 382,
        "height": 287
      },
      "alt": "Polarized dermoscopic view of brown pigment broken by pale round openings with gray dots around several openings and hairs crossing. No diagnosis is included.",
      "caption": "Polarized dermoscopic view. The source pairs it with the clinical frame as corresponding images.",
      "source": "Rubegni G, Cartocci A, Tognetti L, Orione M, Gagliano C, Bacci T, et al. Diagnostics 2024, via PubMed Central (PMC11593280)",
      "sourceUrl": "https://doi.org/10.3390/diagnostics14222571",
      "creator": "Giovanni Rubegni and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Rubegni and coauthors, Diagnostics 2024, Figure 1 panel f, doi:10.3390/diagnostics14222571. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel f of Figure 1 was cropped from the PMC figure file diagnostics-14-02571-g001b.jpg (second part of Figure 1, PMC open-access package PMC11593280.1), source sha256 4d45ed4504f7467436a184fc4a6730c17a3a756d2ced5bb4ff9a309a137c05fb, at pixel box left 392, top 337, right 774, bottom 624 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 fef0a8958681e289991c09c06590f58c493974aa1264101aa7b54441f5ded070. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that all patients signed informed written consent and approved sharing of study data. The article is distributed under CC BY 4.0, with no third-party credit on the figure. The field shows skin and hair only."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Lentigo maligna (histopathology stated in the article methods)",
    "confirmationMethod": "histopathology",
    "histopathologySource": "article_methods",
    "confirmationNotes": "The Figure 1 caption of Rubegni and coauthors (Diagnostics 2024, doi:10.3390/diagnostics14222571), checked 2026-10-02, names this lesion a lentigo maligna in a 66-year-old male. The methods say the figure lesions come from the 80 study lesions and that the histological diagnosis was blinded until after the evaluation. The histopathology statement is study-level. The article calls lentigo maligna an in situ cutaneous melanoma.",
    "confidenceNote": "Study-level histopathology statement. Docutis did not see a slide. Not a Docutis clinician review."
  },
  "observations": [
    {
      "id": "obs-g25-05a",
      "kind": "observation",
      "modality": "clinical",
      "text": "A faint brown patch sits on sun-damaged skin of the side of the face near the hairline and the outer corner of the eye. Redness and fine vessels are around it."
    },
    {
      "id": "obs-g25-05b",
      "kind": "observation",
      "modality": "dermoscopy",
      "text": "Brown pigment is broken by many pale round follicular openings. Gray and gray-brown dots cluster around several openings, and the pigment is darker and denser on one side. Hairs cross the field."
    }
  ],
  "interpretations": [
    {
      "id": "int-g25-05a",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g25-05a"
      ],
      "text": "A faint brown patch on sun-damaged facial skin has a broad differential. The clinical frame alone does not separate benign from malignant facial pigment."
    },
    {
      "id": "int-g25-05b",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g25-05a",
        "obs-g25-05b"
      ],
      "text": "The pale openings make a facial pseudo-network. Gray dots around the openings and lopsided darker pigment add concern. Rhomboidal structures are not clear and were not named."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Lentigo maligna",
      "supportingFeatures": [
        "Gray dots cluster around follicular openings.",
        "Pigment is darker and denser on one side.",
        "The source names this lesion and reports study-level histology."
      ],
      "contradictingFeatures": [
        "Rhomboidal structures are not clear."
      ],
      "teachingDistinction": "Gray around the follicles is the clue. The source's histology statement is the confirmation."
    },
    {
      "diagnosis": "Solar lentigo",
      "supportingFeatures": [
        "Brown facial pigment with a pseudo-network."
      ],
      "contradictingFeatures": [
        "Gray dots around follicles are visible here and are not seen on the stored solar lentigo frame."
      ],
      "teachingDistinction": "Both show a pseudo-network. What surrounds the openings differs in these two frames."
    },
    {
      "diagnosis": "Pigmented actinic keratosis",
      "supportingFeatures": [
        "Sun-damaged facial skin with brown pigment and redness."
      ],
      "contradictingFeatures": [
        "No scale is clear on the dermoscopic frame."
      ],
      "teachingDistinction": "Pigmented actinic keratosis is a real facial mimic. It is not stored as a Docutis case yet."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g25-05a",
      "title": "Notice first",
      "text": "Find the pale round openings. Then look at what surrounds them: brown only, or gray dots."
    },
    {
      "id": "tp-g25-05b",
      "title": "What the source says",
      "text": "The source names the lesion and reports study-level histology. It does not report invasion. None was added."
    }
  ],
  "observationPrompts": [
    "What sits around the pale round openings?",
    "Is the pigment even, or darker on one side?"
  ],
  "hints": [
    "Hair shafts are long lines. Gray dots are small and sit around openings."
  ],
  "closestMimic": {
    "name": "Solar lentigo",
    "whyClosest": "A flat brown facial patch with a pseudo-network is also the look of a solar lentigo. The stored facial solar lentigo case shows no gray dots around follicles."
  },
  "patterns": [
    {
      "id": "pat-g25-05-gray",
      "label": "Gray dots around follicular openings",
      "modality": "dermoscopy",
      "specificityNote": "Gray and gray-brown dots cluster around several pale openings. Their arrangement around the openings is clear in parts of the field and less clear elsewhere, so the certainty is probable.",
      "certainty": "probably",
      "weight": "major"
    },
    {
      "id": "pat-g25-05-pseudo",
      "label": "Brown pigment broken by pale openings",
      "modality": "dermoscopy",
      "specificityNote": "Pale round follicular openings break the brown pigment into a net-like look. The same background is on the benign facial case.",
      "certainty": "clearly_visible",
      "weight": "weak"
    },
    {
      "id": "pat-g25-05-side",
      "label": "Pigment darker on one side",
      "modality": "dermoscopy",
      "specificityNote": "The pigment is denser and darker on one side of the field. This is a case-specific asymmetry, not a named structure.",
      "certainty": "clearly_visible",
      "weight": "supportive"
    }
  ],
  "synthesis": "The source names this periorbital lesion a lentigo maligna and reports study-level histology. The clinical frame is a faint brown patch on sun-damaged skin. The dermoscopic frame shows a pseudo-network with gray dots around follicular openings and lopsided darker pigment.",
  "evidenceWeighting": "Gray dots around follicles are probably visible and are the major clue. Lopsided darker pigment is supportive. The pseudo-network is clearly visible but weak, because the benign facial case has it too. The study-level histology statement is the confirmation.",
  "diagnosticTrap": "Treating the pseudo-network as the clue, or calling every faint brown facial patch a solar lentigo.",
  "mentorNote": "Read this case beside the facial solar lentigo from the same figure. Both have a pseudo-network. Only this one has gray dots around the openings.",
  "takeHomeRule": "On facial skin, look at the follicular openings. Gray around them is a reason for concern; a pseudo-network alone is not.",
  "whyNot": [
    {
      "mimic": "Solar lentigo",
      "text": "The stored facial solar lentigo has a pseudo-network without gray dots around the openings. This frame has gray dots. That difference raises concern; it is not proof."
    },
    {
      "mimic": "Pigmented actinic keratosis",
      "text": "Pigmented actinic keratosis is a facial mimic, but scale is not clear here. It stays in the differential and is not stored as a case."
    }
  ],
  "compareWith": [
    "cmp-g25-face"
  ],
  "pairedModality": {
    "clinicalObservation": "A faint brown patch sits on sun-damaged skin of the side of the face near the hairline and the outer corner of the eye. Redness and fine vessels are around it.",
    "dermoscopicObservation": "Brown pigment is broken by many pale round follicular openings. Gray and gray-brown dots cluster around several openings, and the pigment is darker and denser on one side. Hairs cross the field.",
    "addedValue": "The dermoscopic frame shows what surrounds the follicular openings. The clinical frame shows only a faint brown patch.",
    "reasoningImpact": "The reading moves from faint facial pigment to facial pigment with gray dots around follicles. That raises concern for a melanocytic lesion of sun-damaged skin.",
    "limits": "The source pairs clinical and dermoscopic images by corresponding panel letters, without a same-lesion sentence for this panel. The histology statement is study-level. Rhomboidal structures are not clear and were not named.",
    "informationGain": "dermoscopy_adds_support",
    "informationGainNote": "Educational label only. The dermoscopic frame adds gray dots around follicular openings that the clinical frame does not show. Not a validated metric and not a probability.",
    "comparison": {
      "clinicalClue": "Faint brown patch on sun-damaged facial skin.",
      "dermoscopicClue": "Gray dots around follicular openings.",
      "addedInformation": "The perifollicular gray is only visible on the dermoscopic frame.",
      "diagnosticConflict": null,
      "teachingRule": "Look around the follicles, not only at the brown."
    }
  },
  "modalityIntegration": "The first frame is the clinical photograph of a faint brown patch on sun-damaged facial skin near the hairline. The second frame is the corresponding polarized dermoscopic view and shows brown pigment broken by pale openings with gray dots around several of them.",
  "academy": {
    "level": 4,
    "spectrum": "melanoma",
    "teachingType": "reasoning",
    "skillIds": [
      "follicular-pigment",
      "evidence-weighting"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "localization": null,
  "clinicalAction": "After reveal, open the linked Docutis lentigo maligna record for reference context. Do not treat from this case.",
  "managementBrief": "No management category is stored. Gray dots around follicles in a teaching frame are not a decision to biopsy or refer for a real patient. This brief is not a protocol and remains review required.",
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

## case: A light brown patch on the eyelid (`case-g25-06`)

- **Exact fingerprint:** `sha256-v1:2682865485b7f900120e26aace5881d09ac8d2f8f8b90ff794ea374debd02700`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://doi.org/10.3390/diagnostics14222571
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g25-06",
  "slug": "g25-eyelid-light-brown-patch",
  "title": "A light brown patch on the eyelid",
  "diagnosisLabel": "Solar lentigo",
  "diseaseId": "solar-lentigo",
  "category": "Benign pigmented",
  "educationalLevel": "intermediate",
  "caseType": "clinical_dermoscopic",
  "patientContext": {
    "ageBand": "71 years, per the figure caption",
    "sex": "Female, per the figure caption",
    "anatomicalSite": "Face, periorbital region, upper eyelid",
    "presentationNotes": "The source figure shows atypical pigmented facial lesions of the periorbital region with a similar clinical look. The caption gives a 7 mm maximum diameter. No history of change is given."
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g25-06a",
      "type": "clinical",
      "src": "assets/media/cases/case-38-clinical.jpg",
      "dimensions": {
        "width": 380,
        "height": 287
      },
      "alt": "Clinical close-up of a closed eye and eyebrow with a light brown patch with darker parts on the upper eyelid fold. No diagnosis is included.",
      "caption": "Clinical close-up of the periorbital region. The source label stays hidden until reveal.",
      "source": "Rubegni G, Cartocci A, Tognetti L, Orione M, Gagliano C, Bacci T, et al. Diagnostics 2024, via PubMed Central (PMC11593280)",
      "sourceUrl": "https://doi.org/10.3390/diagnostics14222571",
      "creator": "Giovanni Rubegni and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Rubegni and coauthors, Diagnostics 2024, Figure 1 panel c, doi:10.3390/diagnostics14222571. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel c of Figure 1 was cropped from the PMC figure file diagnostics-14-02571-g001b.jpg (second part of Figure 1, PMC open-access package PMC11593280.1), source sha256 4d45ed4504f7467436a184fc4a6730c17a3a756d2ced5bb4ff9a309a137c05fb, at pixel box left 5, top 3, right 385, bottom 290 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 236d7086e2495282b237cf06cc1c5a0def14f5b04a8b7f0487c6eb909f9cfc66. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that all patients signed informed written consent and approved sharing of study data. The article is distributed under CC BY 4.0, with no third-party credit on the figure. The crop shows one closed eye and brow without the rest of the face."
    },
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g25-06b",
      "type": "dermoscopy",
      "src": "assets/media/cases/case-38-dermoscopy.jpg",
      "dimensions": {
        "width": 382,
        "height": 287
      },
      "alt": "Polarized dermoscopic view of orange-brown pigment broken by pale openings, with thin red vessels, white scale, and tick marks. No diagnosis is included.",
      "caption": "Polarized dermoscopic view. The source pairs it with the clinical frame as corresponding images. Tick marks are a scale.",
      "source": "Rubegni G, Cartocci A, Tognetti L, Orione M, Gagliano C, Bacci T, et al. Diagnostics 2024, via PubMed Central (PMC11593280)",
      "sourceUrl": "https://doi.org/10.3390/diagnostics14222571",
      "creator": "Giovanni Rubegni and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Rubegni and coauthors, Diagnostics 2024, Figure 1 panel d, doi:10.3390/diagnostics14222571. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel d of Figure 1 was cropped from the PMC figure file diagnostics-14-02571-g001b.jpg (second part of Figure 1, PMC open-access package PMC11593280.1), source sha256 4d45ed4504f7467436a184fc4a6730c17a3a756d2ced5bb4ff9a309a137c05fb, at pixel box left 392, top 3, right 774, bottom 290 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 bddac1356b8dbf0db117bbbad53323366b139536d44d2f290c2ecf822a4012f6. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that all patients signed informed written consent and approved sharing of study data. The article is distributed under CC BY 4.0, with no third-party credit on the figure. The field shows skin only."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Solar lentigo (histopathology stated in the article methods)",
    "confirmationMethod": "histopathology",
    "histopathologySource": "article_methods",
    "confirmationNotes": "The Figure 1 caption of Rubegni and coauthors (Diagnostics 2024, doi:10.3390/diagnostics14222571), checked 2026-10-02, names this lesion a solar lentigo in a 71-year-old woman. The methods say the figure lesions come from the 80 study lesions and that the histological diagnosis was blinded until after the evaluation. The histopathology statement is study-level.",
    "confidenceNote": "Study-level histopathology statement. Docutis did not see a slide. A benign result for this lesion does not clear any other facial patch."
  },
  "observations": [
    {
      "id": "obs-g25-06a",
      "kind": "observation",
      "modality": "clinical",
      "text": "A light brown patch with darker brown parts sits on the upper eyelid fold of a closed eye. Fine wrinkles cross the skin."
    },
    {
      "id": "obs-g25-06b",
      "kind": "observation",
      "modality": "dermoscopy",
      "text": "Orange-brown pigment is broken by pale round follicular openings. Thin red vessels and white scale lie at the edges. Gray dots around the openings are not seen. Tick marks run along the lower edge."
    }
  ],
  "interpretations": [
    {
      "id": "int-g25-06a",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g25-06a"
      ],
      "text": "A brown patch on periorbital skin with darker parts is a look that lentigo maligna shares. The clinical frame alone does not separate them."
    },
    {
      "id": "int-g25-06b",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g25-06a",
        "obs-g25-06b"
      ],
      "text": "The pale openings make a pseudo-network. The pigment around them is orange-brown, and gray dots around the openings are not seen. That absence is consistent with the source diagnosis in this frame; it does not clear the lesion by itself."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Solar lentigo",
      "supportingFeatures": [
        "Orange-brown pseudo-network.",
        "No gray dots around follicles in this frame.",
        "The source names this lesion and reports study-level histology."
      ],
      "contradictingFeatures": [
        "Darker parts in the clinical patch."
      ],
      "teachingDistinction": "The benign name comes from the source's histology statement. The missing gray supports it in this frame."
    },
    {
      "diagnosis": "Lentigo maligna",
      "supportingFeatures": [
        "A brown patch on sun-damaged periorbital skin with a pseudo-network.",
        "The source figure shows lentigo maligna with a similar clinical look."
      ],
      "contradictingFeatures": [
        "Gray dots around follicles are not seen."
      ],
      "teachingDistinction": "Lentigo maligna was a fair concern. Missing gray in one frame is not a clearance."
    },
    {
      "diagnosis": "Seborrheic keratosis",
      "supportingFeatures": [
        "Brown facial pigment in an older adult."
      ],
      "contradictingFeatures": [
        "No ridges, comedo-like openings, or thick rough surface are seen."
      ],
      "teachingDistinction": "A keratosis is in the facial differential; this frame lacks its surface."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g25-06a",
      "title": "Notice first",
      "text": "Find the pale openings and check what surrounds them before naming the patch."
    },
    {
      "id": "tp-g25-06b",
      "title": "What the source says",
      "text": "The source names this lesion and reports study-level histology. A benign result here does not make the next periorbital patch benign."
    }
  ],
  "observationPrompts": [
    "What color surrounds the pale openings?",
    "Which lines along the edge are scale ticks rather than skin?"
  ],
  "hints": [
    "Compare the color around the openings with the facial case that shows gray dots."
  ],
  "closestMimic": {
    "name": "Lentigo maligna",
    "whyClosest": "A flat brown periorbital patch with a pseudo-network is also the look of lentigo maligna. The stored facial lentigo maligna case shows gray dots around follicles."
  },
  "patterns": [
    {
      "id": "pat-g25-06-pseudo",
      "label": "Orange-brown pigment broken by pale openings",
      "modality": "dermoscopy",
      "specificityNote": "Pale round openings break orange-brown pigment into a net-like look. The same background appears on the facial lentigo maligna case, so it does not separate them.",
      "certainty": "clearly_visible",
      "weight": "supportive"
    },
    {
      "id": "pat-g25-06-gray",
      "label": "Gray dots around follicles not seen",
      "modality": "dermoscopy",
      "specificityNote": "No gray dots cluster around the openings in this frame. That absence is consistent with the source diagnosis and is not a clearance.",
      "certainty": "not_visible",
      "weight": "supportive"
    },
    {
      "id": "pat-g25-06-scale",
      "label": "Tick marks along the edge",
      "modality": "none",
      "specificityNote": "Tick marks run along the lower edge of the dermoscopic field. They are a scale, not skin.",
      "certainty": "clearly_visible",
      "weight": "conflicting"
    }
  ],
  "synthesis": "The source names this periorbital lesion a solar lentigo and reports study-level histology. The clinical frame is a light brown eyelid patch with darker parts. The dermoscopic frame shows an orange-brown pseudo-network without gray dots around the openings.",
  "evidenceWeighting": "The pseudo-network is clearly visible but supportive only, because the facial lentigo maligna case has it too. The absence of gray dots around follicles is supportive for the source diagnosis in this frame. The study-level histology statement is the confirmation.",
  "diagnosticTrap": "Taking reassurance from a pseudo-network, or treating one benign periorbital result as a rule for the next patch.",
  "mentorNote": "This is the benign half of a facial pair from one figure. It teaches why lentigo maligna was plausible and what in this frame argues toward the benign result: no gray around the follicles.",
  "takeHomeRule": "On facial skin, a pseudo-network is a background. Check the follicles for gray before you accept a benign name, and keep histopathology in mind when in doubt.",
  "whyNot": [
    {
      "mimic": "Lentigo maligna",
      "text": "The facial lentigo maligna case shows gray dots around follicles. This frame does not. That difference supports the source diagnosis here and is not a rule."
    },
    {
      "mimic": "Seborrheic keratosis",
      "text": "No ridges, comedo-like openings, or rough surface are seen."
    }
  ],
  "compareWith": [
    "cmp-g25-face"
  ],
  "pairedModality": {
    "clinicalObservation": "A light brown patch with darker brown parts sits on the upper eyelid fold of a closed eye. Fine wrinkles cross the skin.",
    "dermoscopicObservation": "Orange-brown pigment is broken by pale round follicular openings. Thin red vessels and white scale lie at the edges. Gray dots around the openings are not seen. Tick marks run along the lower edge.",
    "addedValue": "The dermoscopic frame shows the pigment around the follicular openings. The clinical frame shows only a brown patch with darker parts.",
    "reasoningImpact": "The reading moves from a periorbital brown patch with a broad differential to a pseudo-network without gray around the follicles. That supports the source diagnosis in this frame and keeps the trap visible.",
    "limits": "The source pairs clinical and dermoscopic images by corresponding panel letters, without a same-lesion sentence for this panel. The histology statement is study-level. The clinical crop includes a closed eye.",
    "informationGain": "dermoscopy_adds_support",
    "informationGainNote": "Educational label only. The dermoscopic frame adds a pseudo-network without gray dots around follicles. That supports the benign source diagnosis in this frame; it is not reassurance for another lesion. Not a validated metric and not a probability.",
    "comparison": {
      "clinicalClue": "Light brown eyelid patch with darker parts.",
      "dermoscopicClue": "Orange-brown pseudo-network without gray dots.",
      "addedInformation": "What surrounds the follicles is only visible on the dermoscopic frame.",
      "diagnosticConflict": "The clinical look is shared with lentigo maligna.",
      "teachingRule": "A missing clue is weaker evidence than a present one."
    }
  },
  "modalityIntegration": "The first frame is the clinical close-up of a light brown patch on the upper eyelid fold. The second frame is the corresponding polarized dermoscopic view and shows orange-brown pigment broken by pale openings without gray dots around them.",
  "academy": {
    "level": 3,
    "spectrum": "mimic",
    "teachingType": "teaching",
    "skillIds": [
      "follicular-pigment"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "localization": null,
  "clinicalAction": "After reveal, compare with the facial lentigo maligna case from the same figure. Do not treat from this case.",
  "managementBrief": "No management category is stored. A benign source label is not reassurance for another facial patch. This brief is not a protocol and remains review required.",
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

## case: A small brown macule on the heel with a dark centre (`case-g26-01`)

- **Exact fingerprint:** `sha256-v1:93115efe26d4df6f13a9d284b290bef481d0f1eb94914c3230b6ff959805ef34`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://doi.org/10.3390/life14060659
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g26-01",
  "slug": "g26-heel-macule-dark-blotch",
  "title": "A small brown macule on the heel with a dark centre",
  "diagnosisLabel": "Acral melanoma",
  "diseaseId": "acral-melanoma",
  "category": "Melanoma",
  "educationalLevel": "advanced",
  "caseType": "clinical_dermoscopic",
  "patientContext": {
    "ageBand": "44 years, per the figure caption",
    "sex": "Female, per the figure caption",
    "anatomicalSite": "Heel, plantar sole",
    "presentationNotes": "The source describes a 10 mm brownish lesion on the heel. A second heel lesion in the same figure, in a woman of the same age, had a similar clinical look. No history of change is given."
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g26-01a",
      "type": "clinical",
      "src": "assets/media/cases/case-39-clinical.jpg",
      "dimensions": {
        "width": 336,
        "height": 233
      },
      "alt": "Clinical photograph of the heel with a small brown macule that has a darker elongated centre. No diagnosis is included.",
      "caption": "Clinical photograph of the heel. The source panel letter a is kept. The source label stays hidden until reveal.",
      "source": "Tognetti L, Cartocci A, Moscarella E, Lallas A, Dika E, Fargnoli MC, Longo C, Nazzaro G, et al. Life 2024, via PubMed Central (PMC11205239)",
      "sourceUrl": "https://doi.org/10.3390/life14060659",
      "creator": "Linda Tognetti and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Tognetti and coauthors, Life 2024, Figure 2 panel a, doi:10.3390/life14060659. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel a of Figure 2 was cropped from the PMC figure file life-14-00659-g002.jpg (PMC open-access package PMC11205239.1), source sha256 d88de7a2b4710b95ee18d53a4cd3da553e36ce7d589188352e7a4f6e78aec811, at pixel box left 3, top 5, right 339, bottom 238 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 660e673113fce96e8d57d47b4619f58a2e4cbe3ec90e79e2955a8b24dba763da. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that informed consent was obtained from all subjects. The article is distributed under CC BY 4.0, with no third-party credit on the figure. The frame shows a heel only."
    },
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g26-01b",
      "type": "dermoscopy",
      "src": "assets/media/cases/case-39-dermoscopy.jpg",
      "dimensions": {
        "width": 335,
        "height": 233
      },
      "alt": "Polarized dermoscopic view of uneven brown pigment with a darker irregular central blotch and no regular line pattern. No diagnosis is included.",
      "caption": "Polarized dermoscopic view. The source pairs it with the clinical frame by panel letters. The panel letter b is kept.",
      "source": "Tognetti L, Cartocci A, Moscarella E, Lallas A, Dika E, Fargnoli MC, Longo C, Nazzaro G, et al. Life 2024, via PubMed Central (PMC11205239)",
      "sourceUrl": "https://doi.org/10.3390/life14060659",
      "creator": "Linda Tognetti and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Tognetti and coauthors, Life 2024, Figure 2 panel b, doi:10.3390/life14060659. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel b of Figure 2 was cropped from the PMC figure file life-14-00659-g002.jpg (PMC open-access package PMC11205239.1), source sha256 d88de7a2b4710b95ee18d53a4cd3da553e36ce7d589188352e7a4f6e78aec811, at pixel box left 345, top 5, right 680, bottom 238 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 8b62dacad21b96b5b2c36538df8e9176ed29a0eb5b081814ad008f385434b698. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that informed consent was obtained from all subjects. The article is distributed under CC BY 4.0, with no third-party credit on the figure. The field shows skin only."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Acral melanoma (histopathology stated in the article methods)",
    "confirmationMethod": "histopathology",
    "histopathologySource": "article_methods",
    "confirmationNotes": "The Figure 2 caption of Tognetti and coauthors (Life 2024, doi:10.3390/life14060659), checked 2026-10-02, names this heel lesion a melanoma. The methods state that every lesion in the dataset was excised for histopathology and that a definitive histopathological diagnosis was mandatory. The subtype, thickness, and stage of this lesion are not given and were not added.",
    "confidenceNote": "Study-level histopathology statement. Docutis did not see a slide. Not a Docutis clinician review."
  },
  "observations": [
    {
      "id": "obs-g26-01a",
      "kind": "observation",
      "modality": "clinical",
      "text": "A small brown macule on the heel. Its centre is darker and elongated, and lighter brown extends to one side."
    },
    {
      "id": "obs-g26-01b",
      "kind": "observation",
      "modality": "dermoscopy",
      "text": "Brown pigment of several shades spreads unevenly. A darker brown-violet irregular blotch sits near the centre, and lighter brown areas lie at the edges. No regular rows of lines or broad parallel bands organize the pigment."
    }
  ],
  "interpretations": [
    {
      "id": "int-g26-01a",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g26-01a"
      ],
      "text": "A small acral macule with two browns and a darker centre. Acral location is not reassuring."
    },
    {
      "id": "int-g26-01b",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g26-01a",
        "obs-g26-01b"
      ],
      "text": "The pigment is irregular in colour and distribution, with an off-centre dark blotch. No parallel ridge bands are visible. Their absence does not lower concern."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Acral melanoma",
      "supportingFeatures": [
        "Irregular pigment with a dark blotch.",
        "The source reports study-level histopathology."
      ],
      "contradictingFeatures": [
        "No parallel ridge pattern is visible."
      ],
      "teachingDistinction": "Irregular pigment carries the concern here, not a ridge pattern."
    },
    {
      "diagnosis": "Acral melanocytic nevus",
      "supportingFeatures": [
        "A small brown heel macule.",
        "A heel nevus of the same size in the same figure looks similar clinically."
      ],
      "contradictingFeatures": [
        "The pigment is not arranged in regular rows."
      ],
      "teachingDistinction": "The nevus in the same figure shows regular fine rows. This frame does not."
    },
    {
      "diagnosis": "Subcorneal haematoma",
      "supportingFeatures": [
        "Dark colour on a heel."
      ],
      "contradictingFeatures": [
        "The colour is brown and violet rather than red to maroon."
      ],
      "teachingDistinction": "Blood on the heel is a separate trap; the colour here is not the blood colour."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g26-01a",
      "title": "Notice first",
      "text": "Name the colours and where the darkest part sits. Then ask whether any regular line pattern organizes the pigment."
    },
    {
      "id": "tp-g26-01b",
      "title": "What absence means",
      "text": "No parallel ridge pattern is visible. That does not argue against the source diagnosis."
    }
  ],
  "observationPrompts": [
    "Is the pigment arranged in regular rows or bands?",
    "Where is the darkest area, and is it centred?"
  ],
  "hints": [
    "Compare this frame with the heel lesion that shows fine regular rows."
  ],
  "closestMimic": {
    "name": "Acral melanocytic nevus",
    "whyClosest": "A heel nevus of similar size in a woman of the same age, in the same source figure, looks similar clinically."
  },
  "patterns": [
    {
      "id": "pat-g26-01-irregular",
      "label": "Uneven brown pigment with a dark off-centre blotch",
      "modality": "dermoscopy",
      "specificityNote": "Several browns and a darker violet-brown blotch, without regular rows. The panel is small, so the certainty is probable.",
      "certainty": "probably",
      "weight": "major"
    },
    {
      "id": "pat-g26-01-ridge",
      "label": "Broad parallel pigmented bands",
      "modality": "dermoscopy",
      "specificityNote": "Broad bands following the skin markings are not visible here. Their absence does not lower concern.",
      "certainty": "not_visible",
      "weight": "weak"
    }
  ],
  "synthesis": "The source names this heel lesion a melanoma and reports that every lesion in the study was excised for histopathology. The dermoscopic frame shows irregular brown pigment with a dark blotch and no parallel ridge pattern.",
  "evidenceWeighting": "Irregular pigment with a blotch is probably visible and is the major clue. The missing ridge pattern has weak weight and does not argue against the diagnosis. The study-level histopathology statement is the confirmation.",
  "diagnosticTrap": "Waiting for a parallel ridge pattern before taking an irregular acral lesion seriously.",
  "mentorNote": "Read this case beside the heel nevus from the same figure: same site, same age, same size, different organization of pigment. Neither frame has a parallel ridge pattern.",
  "takeHomeRule": "On acral skin, irregular pigment with a blotch is a reason for concern even when no ridge pattern is present.",
  "whyNot": [
    {
      "mimic": "Acral melanocytic nevus",
      "text": "The nevus in the same figure shows fine strokes in regular rows. This frame shows irregular pigment with a blotch. That difference raises concern; it is not proof."
    },
    {
      "mimic": "Subcorneal haematoma",
      "text": "Blood is red to maroon. This pigment is brown and violet."
    }
  ],
  "compareWith": [
    "cmp-g26-heel"
  ],
  "pairedModality": {
    "clinicalObservation": "A small brown macule on the heel. Its centre is darker and elongated, and lighter brown extends to one side.",
    "dermoscopicObservation": "Brown pigment of several shades spreads unevenly. A darker brown-violet irregular blotch sits near the centre, and lighter brown areas lie at the edges. No regular rows of lines or broad parallel bands organize the pigment.",
    "addedValue": "The dermoscopic frame shows how the pigment is organized. The clinical frame shows only a small brown macule with a darker centre.",
    "reasoningImpact": "The reading moves from a small heel macule to an acral lesion with irregular pigment and a blotch, without a ridge pattern.",
    "limits": "The source pairs clinical and dermoscopic panels by letter. The histopathology statement is study-level. The panels are small.",
    "informationGain": "dermoscopy_adds_support",
    "informationGainNote": "Educational label only. The dermoscopic frame adds irregular pigment and a blotch. Educational label only. Not a validated metric and not a probability.",
    "comparison": {
      "clinicalClue": "Small brown heel macule with a darker centre.",
      "dermoscopicClue": "Irregular pigment, dark blotch, no rows.",
      "addedInformation": "The organization of pigment is only visible on the dermoscopic frame.",
      "diagnosticConflict": "A heel nevus of the same size looks similar clinically.",
      "teachingRule": "Absence of a ridge pattern is not reassurance."
    }
  },
  "modalityIntegration": "The first frame is the clinical photograph of a small brown heel macule with a darker centre. The second frame is the corresponding polarized dermoscopic view and shows irregular brown pigment with a dark blotch and no regular line pattern.",
  "academy": {
    "level": 4,
    "spectrum": "melanoma",
    "teachingType": "reasoning",
    "skillIds": [
      "parallel-pigment-lines",
      "asymmetry"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "localization": null,
  "clinicalAction": "After reveal, open the linked Docutis acral melanoma record for reference context. Do not treat from this case.",
  "managementBrief": "No management category is stored. The source history is not a Docutis recommendation. This brief is not a protocol and remains review required.",
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

## case: A faint brown spot on the heel (`case-g26-02`)

- **Exact fingerprint:** `sha256-v1:ddf914e6c9b82539973baaf747a5de2e8dd04216d31fc1e680ee12b2ec8130be`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://doi.org/10.3390/life14060659
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g26-02",
  "slug": "g26-heel-fine-regular-rows",
  "title": "A faint brown spot on the heel",
  "diagnosisLabel": "Acral melanocytic nevus",
  "diseaseId": "melanocytic-nevus",
  "category": "Benign melanocytic",
  "educationalLevel": "intermediate",
  "caseType": "clinical_dermoscopic",
  "patientContext": {
    "ageBand": "44 years, per the figure caption",
    "sex": "Female, per the figure caption",
    "anatomicalSite": "Heel, plantar sole",
    "presentationNotes": "The source describes an 8 mm brownish lesion on the heel, excised in the study. A printed arrow in the clinical frame points to it. No history of change is given."
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g26-02a",
      "type": "clinical",
      "src": "assets/media/cases/case-40-clinical.jpg",
      "dimensions": {
        "width": 336,
        "height": 235
      },
      "alt": "Clinical photograph of a heel with scale and a faint small brown spot marked by a printed cyan arrow. No diagnosis is included.",
      "caption": "Clinical photograph of the heel. The printed arrow is from the source. The panel letter c is kept.",
      "source": "Tognetti L, Cartocci A, Moscarella E, Lallas A, Dika E, Fargnoli MC, Longo C, Nazzaro G, et al. Life 2024, via PubMed Central (PMC11205239)",
      "sourceUrl": "https://doi.org/10.3390/life14060659",
      "creator": "Linda Tognetti and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Tognetti and coauthors, Life 2024, Figure 2 panel c, doi:10.3390/life14060659. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel c of Figure 2 was cropped from the PMC figure file life-14-00659-g002.jpg (PMC open-access package PMC11205239.1), source sha256 d88de7a2b4710b95ee18d53a4cd3da553e36ce7d589188352e7a4f6e78aec811, at pixel box left 3, top 242, right 339, bottom 477 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 c41f67584104b83870cf69a30960c5a56ddeb81b64fd914e45b27af09ef1f7c0. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that informed consent was obtained from all subjects. The article is distributed under CC BY 4.0, with no third-party credit on the figure. The frame shows a heel only."
    },
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g26-02b",
      "type": "dermoscopy",
      "src": "assets/media/cases/case-40-dermoscopy.jpg",
      "dimensions": {
        "width": 335,
        "height": 235
      },
      "alt": "Polarized dermoscopic view of fine brown oblique strokes arranged in evenly spaced parallel rows. No diagnosis is included.",
      "caption": "Polarized dermoscopic view. The source pairs it with the clinical frame by panel letters. The panel letter d is kept.",
      "source": "Tognetti L, Cartocci A, Moscarella E, Lallas A, Dika E, Fargnoli MC, Longo C, Nazzaro G, et al. Life 2024, via PubMed Central (PMC11205239)",
      "sourceUrl": "https://doi.org/10.3390/life14060659",
      "creator": "Linda Tognetti and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Tognetti and coauthors, Life 2024, Figure 2 panel d, doi:10.3390/life14060659. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel d of Figure 2 was cropped from the PMC figure file life-14-00659-g002.jpg (PMC open-access package PMC11205239.1), source sha256 d88de7a2b4710b95ee18d53a4cd3da553e36ce7d589188352e7a4f6e78aec811, at pixel box left 345, top 242, right 680, bottom 477 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 d6dd02fb146cd163dec44e15e2d4953be1526fa721e67143805f08fd8c4eacdb. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that informed consent was obtained from all subjects. The article is distributed under CC BY 4.0, with no third-party credit on the figure. The field shows skin only."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Acral melanocytic nevus (histopathology stated in the article methods)",
    "confirmationMethod": "histopathology",
    "histopathologySource": "article_methods",
    "confirmationNotes": "The Figure 2 caption of Tognetti and coauthors (Life 2024, doi:10.3390/life14060659), checked 2026-10-02, names this heel lesion a nevus with a regular fibrillar pattern. The methods state that every lesion was excised for histopathology. The accepted benign histopathologic diagnoses in the study range from nevus with mild atypia to SAMPUS; the grade for this lesion is not given and was not added.",
    "confidenceNote": "Study-level histopathology statement. Docutis did not see a slide. A benign result for this lesion does not clear another acral macule."
  },
  "observations": [
    {
      "id": "obs-g26-02a",
      "kind": "observation",
      "modality": "clinical",
      "text": "A heel with scale and creases. A faint small brown spot sits where a printed cyan arrow points."
    },
    {
      "id": "obs-g26-02b",
      "kind": "observation",
      "modality": "dermoscopy",
      "text": "Fine short brown strokes lie obliquely in evenly spaced parallel rows across the whole lesion. The pale spaces between rows are as wide as or wider than the brown strokes. The colour is a single light brown, and no blotch is present."
    }
  ],
  "interpretations": [
    {
      "id": "int-g26-02a",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g26-02a"
      ],
      "text": "The lesion is faint clinically and hard to find without the printed arrow. The arrow is a mark, not skin."
    },
    {
      "id": "int-g26-02b",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g26-02a",
        "obs-g26-02b"
      ],
      "text": "Fine oblique strokes in regular rows across the whole lesion fit a regular fibrillar pattern. No broad pigmented bands and no blotch are seen. Furrow orientation and sweat-duct openings are not resolved."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Acral melanocytic nevus",
      "supportingFeatures": [
        "Fine strokes in regular, evenly spaced rows.",
        "One colour, no blotch.",
        "The source reports study-level histopathology."
      ],
      "contradictingFeatures": [
        "The lesion was excised, so it was not obviously benign to the clinicians."
      ],
      "teachingDistinction": "Regular organization supports the benign source diagnosis in this frame."
    },
    {
      "diagnosis": "Acral melanoma",
      "supportingFeatures": [
        "A brown acral macule in an adult.",
        "A heel melanoma of similar size in the same figure looked similar clinically."
      ],
      "contradictingFeatures": [
        "No irregular blotch and no broad ridge bands are seen."
      ],
      "teachingDistinction": "Melanoma was a fair concern on the clinical look."
    },
    {
      "diagnosis": "Subcorneal haematoma",
      "supportingFeatures": [
        "A spot on a pressure-bearing heel."
      ],
      "contradictingFeatures": [
        "The colour is light brown and organized in rows, not red to maroon and structureless."
      ],
      "teachingDistinction": "A heel spot is not automatically blood."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g26-02a",
      "title": "Notice first",
      "text": "Separate the printed arrow from the skin, then describe how the brown strokes are arranged."
    },
    {
      "id": "tp-g26-02b",
      "title": "What the source says",
      "text": "The figure names this lesion a nevus, and the study excised every lesion for histopathology. The atypia grade is not given."
    }
  ],
  "observationPrompts": [
    "Are the brown strokes evenly spaced in rows?",
    "Is there a darker blotch anywhere in the lesion?"
  ],
  "hints": [
    "The cyan arrow is printed on the photograph."
  ],
  "closestMimic": {
    "name": "Acral melanoma",
    "whyClosest": "A heel melanoma of similar size in a woman of the same age, in the same source figure, looks similar clinically."
  },
  "patterns": [
    {
      "id": "pat-g26-02-fibrillar",
      "label": "Fine oblique strokes in regular rows",
      "modality": "dermoscopy",
      "specificityNote": "Evenly spaced rows of fine oblique strokes across the whole lesion. Furrow orientation is not resolved, so the certainty is probable.",
      "certainty": "probably",
      "weight": "major"
    },
    {
      "id": "pat-g26-02-ridge",
      "label": "Broad parallel pigmented bands",
      "modality": "dermoscopy",
      "specificityNote": "The brown lines are thin, with pale spaces at least as wide. Broad ridge-type bands are not visible.",
      "certainty": "not_visible",
      "weight": "supportive"
    },
    {
      "id": "pat-g26-02-arrow",
      "label": "Printed arrow in the clinical frame",
      "modality": "none",
      "specificityNote": "A cyan arrow printed on the photograph points to the spot. It is a mark, not skin.",
      "certainty": "clearly_visible",
      "weight": "conflicting"
    }
  ],
  "synthesis": "The source names this heel lesion a nevus and reports that every lesion in the study was excised for histopathology. The dermoscopic frame shows fine oblique strokes in regular rows, without broad ridge bands or a blotch.",
  "evidenceWeighting": "Regular rows are probably visible and are the major clue toward the source diagnosis. The missing ridge bands support it. The arrow conflicts only if read as skin. The study-level histopathology statement is the confirmation.",
  "diagnosticTrap": "Treating any parallel acral pattern as benign, or treating one benign heel result as a rule.",
  "mentorNote": "This is the benign half of a heel pair from one figure. It teaches why melanoma was plausible and what in this frame argues toward the benign result: regular organization.",
  "takeHomeRule": "On acral skin, regular evenly spaced fine lines without a blotch support a benign reading in this frame. Irregularity anywhere changes the weighting.",
  "whyNot": [
    {
      "mimic": "Acral melanoma",
      "text": "The heel melanoma in the same figure shows irregular pigment with a blotch. This frame shows regular rows. That difference supports the source diagnosis here; it is not a rule."
    },
    {
      "mimic": "Subcorneal haematoma",
      "text": "The colour is light brown and organized in rows, not red to maroon and structureless."
    }
  ],
  "compareWith": [
    "cmp-g26-heel",
    "cmp-g26-fibrillar",
    "cmp-g26-ridge"
  ],
  "pairedModality": {
    "clinicalObservation": "A heel with scale and creases. A faint small brown spot sits where a printed cyan arrow points.",
    "dermoscopicObservation": "Fine short brown strokes lie obliquely in evenly spaced parallel rows across the whole lesion. The pale spaces between rows are as wide as or wider than the brown strokes. The colour is a single light brown, and no blotch is present.",
    "addedValue": "The dermoscopic frame shows the regular rows that the faint clinical spot cannot show.",
    "reasoningImpact": "The reading moves from a faint heel spot to an organized regular pattern. That supports the source diagnosis in this frame.",
    "limits": "The source pairs clinical and dermoscopic panels by letter. The histopathology statement is study-level. The clinical lesion is faint and found by a printed arrow.",
    "informationGain": "dermoscopy_adds_support",
    "informationGainNote": "Educational label only. The dermoscopic frame adds regular rows of fine strokes. Educational label only. Not a validated metric and not a probability.",
    "comparison": {
      "clinicalClue": "Faint brown heel spot marked by an arrow.",
      "dermoscopicClue": "Fine oblique strokes in regular rows.",
      "addedInformation": "The regular organization is only visible on the dermoscopic frame.",
      "diagnosticConflict": "A heel melanoma of similar size looks similar clinically.",
      "teachingRule": "Regularity is evidence, not a guarantee."
    }
  },
  "modalityIntegration": "The first frame is the clinical photograph of a heel with a faint brown spot marked by a printed arrow. The second frame is the corresponding polarized dermoscopic view and shows fine oblique brown strokes in evenly spaced rows.",
  "academy": {
    "level": 3,
    "spectrum": "mimic",
    "teachingType": "teaching",
    "skillIds": [
      "parallel-pigment-lines"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "localization": null,
  "clinicalAction": "After reveal, compare with the heel melanoma from the same figure. Do not treat from this case.",
  "managementBrief": "No management category is stored. The source history is not a Docutis recommendation. This brief is not a protocol and remains review required.",
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

## case: A dark brown macule on the sole (`case-g26-03`)

- **Exact fingerprint:** `sha256-v1:fcae62632830e8ae39e4d98735f8ef7ee375127c704f13a023fdbb9319105e23`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://doi.org/10.1038/s41598-020-77425-z
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g26-03",
  "slug": "g26-sole-uneven-strokes-dots",
  "title": "A dark brown macule on the sole",
  "diagnosisLabel": "Acral lentiginous melanoma in situ",
  "diseaseId": "acral-melanoma",
  "category": "Melanoma",
  "educationalLevel": "advanced",
  "caseType": "clinical_dermoscopic",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Sole of the foot, plantar",
    "presentationNotes": "The source describes a 12 mm lesion. Age and sex are not given for this lesion. No history of change is given for this figure."
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g26-03a",
      "type": "clinical",
      "src": "assets/media/cases/case-41-clinical.jpg",
      "dimensions": {
        "width": 708,
        "height": 512
      },
      "alt": "Clinical photograph of the sole of a foot with a small dark brown irregular macule. No diagnosis is included.",
      "caption": "Clinical photograph of the sole. The source panel letter A is kept. The source label stays hidden until reveal.",
      "source": "Han B, Hur K, Ohn J, Lim SS, Mun JH. Scientific Reports 2020, via PubMed Central (PMC7688656)",
      "sourceUrl": "https://doi.org/10.1038/s41598-020-77425-z",
      "creator": "Byeol Han and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Han and coauthors, Scientific Reports 2020, Figure 1 panel A, doi:10.1038/s41598-020-77425-z. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel A of Figure 1 was cropped from the figure image embedded on page 3 of the article PDF in the PMC open-access package PMC7688656 (PDF image object 49, 1417 x 1027 pixels), source sha256 69162dde8e946e84fcad28de0a0214b10f1816c9af963129b9e31c1fd73de5f6, at pixel box left 0, top 0, right 708, bottom 512 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 a8ae418a4ed636e57a6668f2581248a1ecc699eb429e57df81970167342b97ca. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that informed consent was obtained from all patients. The article is distributed under CC BY 4.0, with no third-party credit on the figure. The frame shows a sole only."
    },
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g26-03b",
      "type": "dermoscopy",
      "src": "assets/media/cases/case-41-dermoscopy.jpg",
      "dimensions": {
        "width": 708,
        "height": 512
      },
      "alt": "Dermoscopic view of short brown strokes and dots spread unevenly, with a printed scale at the edge. No diagnosis is included.",
      "caption": "Dermoscopic view of the same lesion, per the source caption. The panel letter B is kept. The printed scale is not skin.",
      "source": "Han B, Hur K, Ohn J, Lim SS, Mun JH. Scientific Reports 2020, via PubMed Central (PMC7688656)",
      "sourceUrl": "https://doi.org/10.1038/s41598-020-77425-z",
      "creator": "Byeol Han and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Han and coauthors, Scientific Reports 2020, Figure 1 panel B, doi:10.1038/s41598-020-77425-z. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel B of Figure 1 was cropped from the figure image embedded on page 3 of the article PDF in the PMC open-access package PMC7688656 (PDF image object 49, 1417 x 1027 pixels), source sha256 69162dde8e946e84fcad28de0a0214b10f1816c9af963129b9e31c1fd73de5f6, at pixel box left 709, top 0, right 1417, bottom 512 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 5f821c919e73195a82d55547398349bf0ada93267aad05eb2530fe009e137f6b. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that informed consent was obtained from all patients. The article is distributed under CC BY 4.0, with no third-party credit on the figure. The field shows skin only."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Acral lentiginous melanoma in situ (histopathology stated in the article methods)",
    "confirmationMethod": "histopathology",
    "histopathologySource": "article_methods",
    "confirmationNotes": "The Figure 1 caption of Han and coauthors (Scientific Reports 2020, doi:10.1038/s41598-020-77425-z), checked 2026-10-02, describes panels A and B as a 12 mm acral lentiginous melanoma in situ with asymmetry, irregular dots and globules, and an irregular fibrillar pattern. The methods state that all cases were diagnosed on clinical, dermoscopic, and histopathologic criteria after biopsy.",
    "confidenceNote": "Study-level histopathology statement. Docutis did not see a slide. Not a Docutis clinician review."
  },
  "observations": [
    {
      "id": "obs-g26-03a",
      "kind": "observation",
      "modality": "clinical",
      "text": "A dark brown irregular macule sits on the sole of the foot, between the heel and the forefoot."
    },
    {
      "id": "obs-g26-03b",
      "kind": "observation",
      "modality": "dermoscopy",
      "text": "Short brown strokes and small brown dots spread unevenly across the lesion. Some areas are dense and dark and others sparse and pale. Many strokes lie obliquely along the skin markings. A printed millimetre scale and the label 3cm sit at the left edge."
    }
  ],
  "interpretations": [
    {
      "id": "int-g26-03a",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g26-03a"
      ],
      "text": "A dark irregular macule on the sole is acral pigment and is read on its own site."
    },
    {
      "id": "int-g26-03b",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g26-03a",
        "obs-g26-03b"
      ],
      "text": "The strokes look like fibrillar strokes, but they are uneven in density and colour and mixed with dots. Whether the strokes sit on ridges or furrows cannot be resolved, so no ridge claim is made."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Acral lentiginous melanoma in situ",
      "supportingFeatures": [
        "Uneven strokes and dots.",
        "Asymmetric distribution of pigment.",
        "The source reports study-level histopathology."
      ],
      "contradictingFeatures": [
        "No broad ridge bands are claimed."
      ],
      "teachingDistinction": "Irregularity of a fibrillar-type pattern carries the concern here."
    },
    {
      "diagnosis": "Acral melanocytic nevus",
      "supportingFeatures": [
        "Oblique strokes on a sole can be a nevus pattern."
      ],
      "contradictingFeatures": [
        "The strokes are uneven and mixed with dots, not regular rows."
      ],
      "teachingDistinction": "The regular heel nevus is the comparison: same stroke type, different regularity."
    },
    {
      "diagnosis": "Subcorneal haematoma",
      "supportingFeatures": [
        "A dark spot on the sole."
      ],
      "contradictingFeatures": [
        "The colour is brown and structured, not red to maroon and homogeneous."
      ],
      "teachingDistinction": "Blood is a separate acral trap."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g26-03a",
      "title": "Notice first",
      "text": "Describe the strokes, then ask whether their spacing, darkness, and direction are even."
    },
    {
      "id": "tp-g26-03b",
      "title": "What the source says",
      "text": "The caption describes the pattern and the methods report histopathologic criteria. No thickness or stage was added."
    }
  ],
  "observationPrompts": [
    "Are the strokes evenly spaced, or dense in some areas and sparse in others?",
    "Which marks at the edge are printed rather than skin?"
  ],
  "hints": [
    "Compare the spacing with the regular heel rows in another case."
  ],
  "closestMimic": {
    "name": "Acral melanocytic nevus",
    "whyClosest": "Oblique strokes are a common acral nevus look; the regular heel nevus in Docutis shows them in even rows."
  },
  "patterns": [
    {
      "id": "pat-g26-03-fibrillar",
      "label": "Uneven oblique strokes mixed with dots",
      "modality": "dermoscopy",
      "specificityNote": "Short oblique strokes and dots of varying darkness are spread unevenly. Ridge or furrow position is not resolved, so the certainty is probable.",
      "certainty": "probably",
      "weight": "major"
    },
    {
      "id": "pat-g26-03-ridge",
      "label": "Broad parallel pigmented bands",
      "modality": "dermoscopy",
      "specificityNote": "Some strokes follow the skin markings, but broad ridge-type bands cannot be confirmed in this frame.",
      "certainty": "uncertain",
      "weight": "weak"
    },
    {
      "id": "pat-g26-03-scale",
      "label": "Printed scale and label",
      "modality": "none",
      "specificityNote": "A millimetre scale and the label 3cm are printed at the left edge. They are not skin.",
      "certainty": "clearly_visible",
      "weight": "conflicting"
    }
  ],
  "synthesis": "The source describes this sole lesion as an acral lentiginous melanoma in situ diagnosed on histopathologic criteria. The dermoscopic frame shows oblique strokes and dots spread unevenly, an irregular version of the stroke pattern that the heel nevus shows in regular rows.",
  "evidenceWeighting": "Uneven strokes with dots are probably visible and are the major clue. A ridge pattern is uncertain and has weak weight. The printed scale conflicts if read as skin. The study-level histopathology statement is the confirmation.",
  "diagnosticTrap": "Calling every oblique stroke pattern benign because the strokes look like a nevus pattern.",
  "mentorNote": "This case and the heel nevus share a stroke type. Regularity, not the stroke itself, separates them in these two frames.",
  "takeHomeRule": "The same acral stroke pattern can be regular or irregular. Irregular spacing, colour, and dots raise concern.",
  "whyNot": [
    {
      "mimic": "Acral melanocytic nevus",
      "text": "The heel nevus shows the same stroke type in regular rows. Here the strokes are uneven and mixed with dots."
    },
    {
      "mimic": "Subcorneal haematoma",
      "text": "The colour is brown and structured, not red to maroon and homogeneous."
    }
  ],
  "compareWith": [
    "cmp-g26-fibrillar"
  ],
  "pairedModality": {
    "clinicalObservation": "A dark brown irregular macule sits on the sole of the foot, between the heel and the forefoot.",
    "dermoscopicObservation": "Short brown strokes and small brown dots spread unevenly across the lesion. Some areas are dense and dark and others sparse and pale. Many strokes lie obliquely along the skin markings. A printed millimetre scale and the label 3cm sit at the left edge.",
    "addedValue": "The dermoscopic frame shows uneven strokes and dots; the clinical frame shows only a dark irregular macule.",
    "reasoningImpact": "The reading moves from a dark sole macule to an irregular stroke pattern with dots. That keeps a malignant melanocytic lesion high in the differential.",
    "limits": "The caption labels panels A and B as one lesion. The histopathology statement is study-level. Ridge or furrow position is not resolved.",
    "informationGain": "dermoscopy_adds_support",
    "informationGainNote": "Educational label only. The dermoscopic frame adds an irregular stroke pattern with dots. Educational label only. Not a validated metric and not a probability.",
    "comparison": {
      "clinicalClue": "Dark irregular macule on the sole.",
      "dermoscopicClue": "Uneven oblique strokes with dots.",
      "addedInformation": "The irregularity of the strokes is only visible on the dermoscopic frame.",
      "diagnosticConflict": null,
      "teachingRule": "Judge the regularity of a stroke pattern, not only its presence."
    }
  },
  "modalityIntegration": "The first frame is the clinical photograph of a dark brown irregular macule on the sole. The second frame is the dermoscopic view of the same lesion and shows short oblique strokes and dots spread unevenly.",
  "academy": {
    "level": 4,
    "spectrum": "melanoma",
    "teachingType": "reasoning",
    "skillIds": [
      "parallel-pigment-lines",
      "evidence-weighting"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "localization": null,
  "clinicalAction": "After reveal, open the linked Docutis acral melanoma record for reference context. Do not treat from this case.",
  "managementBrief": "No management category is stored. The source history is not a Docutis recommendation. This brief is not a protocol and remains review required.",
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

## case: A dark spot on a fingertip (`case-g26-04`)

- **Exact fingerprint:** `sha256-v1:02fd088cd759f176625018f7b34e5bda1e0b540ebc23445375f39154d0f17c3b`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://doi.org/10.7759/cureus.109272
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g26-04",
  "slug": "g26-fingertip-red-maroon-spot",
  "title": "A dark spot on a fingertip",
  "diagnosisLabel": "Subcorneal haematoma",
  "diseaseId": "subcorneal-haemorrhage",
  "category": "Benign vascular",
  "educationalLevel": "intermediate",
  "caseType": "clinical_dermoscopic",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Volar fingertip, acral skin",
    "presentationNotes": "The source describes a dark reddish-brown macule on the volar aspect of a finger. The source reports that it resolved completely at one month."
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g26-04a",
      "type": "clinical",
      "src": "assets/media/cases/case-42-clinical.jpg",
      "dimensions": {
        "width": 333,
        "height": 516
      },
      "alt": "Clinical photograph of a palm and fingers with a small dark spot on the tip of the index finger. No diagnosis is included.",
      "caption": "Clinical photograph of the hand. The source panel letter A is kept. The source label stays hidden until reveal.",
      "source": "Martinez-Ortega JI, Naidnur S, et al. Cureus 2026, via PubMed Central (PMC13282028)",
      "sourceUrl": "https://doi.org/10.7759/cureus.109272",
      "creator": "Jesus Ivan Martinez-Ortega and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Martinez-Ortega and coauthors, Cureus 2026, Figure 1 panel A, doi:10.7759/cureus.109272. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel A of Figure 1 was cropped from the PMC figure file cureus-0018-00000109272-i01.jpg (PMC open-access package PMC13282028), source sha256 8911a97db3ca9237d02ef502db910214f75a474d1fb273f3e5e1262546441140, at pixel box left 0, top 0, right 333, bottom 516 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 fee1fd03ba7008eab2912ee334298b501fc5a7de361143e3ccb4c32508c4d957. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that informed consent for open access publication was obtained. The article is distributed under CC BY 4.0, with no third-party credit on the figure. The frame shows a palm and fingers only."
    },
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g26-04b",
      "type": "dermoscopy",
      "src": "assets/media/cases/case-42-dermoscopy.jpg",
      "dimensions": {
        "width": 413,
        "height": 516
      },
      "alt": "Dermoscopic view of a sharply bordered homogeneous red to maroon area with white cracks and a printed scale. No diagnosis is included.",
      "caption": "Dermoscopic view of the same lesion, per the source caption. The printed scale is not skin.",
      "source": "Martinez-Ortega JI, Naidnur S, et al. Cureus 2026, via PubMed Central (PMC13282028)",
      "sourceUrl": "https://doi.org/10.7759/cureus.109272",
      "creator": "Jesus Ivan Martinez-Ortega and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Martinez-Ortega and coauthors, Cureus 2026, Figure 1 panel B, doi:10.7759/cureus.109272. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel B of Figure 1 was cropped from the PMC figure file cureus-0018-00000109272-i01.jpg (PMC open-access package PMC13282028), source sha256 8911a97db3ca9237d02ef502db910214f75a474d1fb273f3e5e1262546441140, at pixel box left 336, top 0, right 749, bottom 516 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 954b3275dc826e5e85c24350fc57391992caecaf5d7ee9fb77b9bb841250fb9c. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that informed consent for open access publication was obtained. The article is distributed under CC BY 4.0, with no third-party credit on the figure. The field shows skin only."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Subcorneal haematoma (clinical and dermoscopic diagnosis with resolution at follow-up)",
    "confirmationMethod": "clinical_diagnosis",
    "confirmationNotes": "Martinez-Ortega and coauthors (Cureus 2026, doi:10.7759/cureus.109272), checked 2026-10-02, favoured subcorneal haematoma on clinical and dermoscopic grounds and report complete spontaneous resolution at one-month follow-up. The article states that histopathologic confirmation was not obtained.",
    "confidenceNote": "Clinical diagnosis supported by follow-up. Not histopathology. Not a Docutis clinician review."
  },
  "observations": [
    {
      "id": "obs-g26-04a",
      "kind": "observation",
      "modality": "clinical",
      "text": "A palm and fingers. A small dark spot sits on the volar tip of the index finger."
    },
    {
      "id": "obs-g26-04b",
      "kind": "observation",
      "modality": "dermoscopy",
      "text": "A sharply bordered homogeneous red to maroon area with fine white cracks and white scale at one side. No lines, network, or brown dots are present. A printed millimetre scale lies below."
    }
  ],
  "interpretations": [
    {
      "id": "int-g26-04a",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g26-04a"
      ],
      "text": "A dark acral spot on a fingertip is a classic look that must be taken seriously."
    },
    {
      "id": "int-g26-04b",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g26-04a",
        "obs-g26-04b"
      ],
      "text": "The colour is red to maroon and homogeneous, without lines or a network. That fits blood under the stratum corneum in this frame. It does not exclude a tumour beside or under the blood."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Subcorneal haematoma",
      "supportingFeatures": [
        "Homogeneous red to maroon colour.",
        "No melanocytic lines or network.",
        "The source reports resolution at follow-up."
      ],
      "contradictingFeatures": [
        "The patient history of trauma is not stored."
      ],
      "teachingDistinction": "The colour and the follow-up carry this diagnosis, not histopathology."
    },
    {
      "diagnosis": "Acral melanoma",
      "supportingFeatures": [
        "A dark acral spot on a finger."
      ],
      "contradictingFeatures": [
        "No brown lines, blotch, or irregular pigmentation is visible."
      ],
      "teachingDistinction": "Blood can hide pigment. Follow-up or a scraping test is how the source settled it."
    },
    {
      "diagnosis": "Acral melanocytic nevus",
      "supportingFeatures": [
        "A small acral macule."
      ],
      "contradictingFeatures": [
        "No brown lines or rows are visible."
      ],
      "teachingDistinction": "A nevus would show brown lines on acral skin."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g26-04a",
      "title": "Notice first",
      "text": "Name the colour honestly: red to maroon, not brown. Then look for lines; none are present."
    },
    {
      "id": "tp-g26-04b",
      "title": "What confirmed it",
      "text": "Resolution at one month, not a biopsy. A blood colour without follow-up is not a clearance."
    }
  ],
  "observationPrompts": [
    "Is the colour brown, or red to maroon?",
    "Are any lines or a network visible inside the spot?"
  ],
  "hints": [
    "Look at colour before shape."
  ],
  "closestMimic": {
    "name": "Acral melanoma",
    "whyClosest": "A dark spot on acral skin is the classic acral melanoma worry, and blood can mimic or hide pigment."
  },
  "patterns": [
    {
      "id": "pat-g26-04-blood",
      "label": "Homogeneous red to maroon area",
      "modality": "dermoscopy",
      "specificityNote": "A sharply bordered red to maroon structureless area without lines. It fits blood in this frame and does not exclude a lesion under it.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g26-04-ridge",
      "label": "Broad parallel pigmented bands",
      "modality": "dermoscopy",
      "specificityNote": "No bands or lines of any kind are visible.",
      "certainty": "not_visible",
      "weight": "supportive"
    },
    {
      "id": "pat-g26-04-scale",
      "label": "Printed millimetre scale",
      "modality": "none",
      "specificityNote": "A printed scale lies below the spot. It is not skin.",
      "certainty": "clearly_visible",
      "weight": "conflicting"
    }
  ],
  "synthesis": "The source favoured subcorneal haematoma and reports complete resolution at one month without histopathology. The dermoscopic frame shows a homogeneous red to maroon area without lines.",
  "evidenceWeighting": "The blood colour is clearly visible and is the major clue. The missing line pattern supports it. Resolution at follow-up is the confirmation, which is weaker than histopathology.",
  "diagnosticTrap": "Reassuring from colour alone without follow-up or a scraping test, or calling dark blood brown melanin.",
  "mentorNote": "This is the blood pole of the acral cluster. Compare its colour and lack of structure with the heel melanoma that shows irregular brown pigment.",
  "takeHomeRule": "Red to maroon structureless acral colour suggests blood. Confirm with follow-up or scraping before you let it go.",
  "whyNot": [
    {
      "mimic": "Acral melanoma",
      "text": "No brown lines, blotch, or irregular pigmentation is visible, and the spot resolved. A spot that persists needs reassessment."
    },
    {
      "mimic": "Acral melanocytic nevus",
      "text": "No brown lines or rows are visible."
    }
  ],
  "compareWith": [
    "cmp-g26-blood"
  ],
  "pairedModality": {
    "clinicalObservation": "A palm and fingers. A small dark spot sits on the volar tip of the index finger.",
    "dermoscopicObservation": "A sharply bordered homogeneous red to maroon area with fine white cracks and white scale at one side. No lines, network, or brown dots are present. A printed millimetre scale lies below.",
    "addedValue": "The dermoscopic frame shows the red to maroon colour and the absence of lines; clinically the spot looks only dark.",
    "reasoningImpact": "The reading moves from a dark fingertip spot to a structureless blood-coloured area. That favours blood in this frame and calls for follow-up.",
    "limits": "The caption labels panels A and B as one lesion. No histopathology was obtained. The clinical spot is small in a whole-hand photograph.",
    "informationGain": "dermoscopy_changes_leading_differential",
    "informationGainNote": "Educational label only. Dermoscopy changes the colour reading from dark to red-maroon. Educational label only. Not a validated metric and not a probability.",
    "comparison": {
      "clinicalClue": "Small dark spot on a fingertip.",
      "dermoscopicClue": "Homogeneous red to maroon, no lines.",
      "addedInformation": "The true colour and the missing lines are only visible on the dermoscopic frame.",
      "diagnosticConflict": "Clinically the spot looks like dark pigment.",
      "teachingRule": "Read colour under the dermatoscope before naming a dark acral spot."
    }
  },
  "modalityIntegration": "The first frame is the clinical photograph of a hand with a small dark spot on the index fingertip. The second frame is the dermoscopic view of the same lesion and shows a homogeneous red to maroon area without lines.",
  "academy": {
    "level": 3,
    "spectrum": "mimic",
    "teachingType": "teaching",
    "skillIds": [
      "acral-pigment",
      "blood-color"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "localization": null,
  "clinicalAction": "After reveal, compare with the heel melanoma case. Do not treat from this case.",
  "managementBrief": "No management category is stored. The source history is not a Docutis recommendation. This brief is not a protocol and remains review required.",
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

## case: A brown band on a child's toenail (`case-g26-05`)

- **Exact fingerprint:** `sha256-v1:b3b3a6146a9f6b7c8276fe371d43f225849d3b0ac9e77f0c9dbc07a47f836395`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://doi.org/10.1016/j.abd.2021.02.012
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g26-05",
  "slug": "g26-toenail-side-band-child",
  "title": "A brown band on a child's toenail",
  "diagnosisLabel": "Junctional melanocytic nevus of the nail unit",
  "diseaseId": "melanocytic-nevus",
  "category": "Benign melanocytic",
  "educationalLevel": "intermediate",
  "caseType": "clinical_dermoscopic",
  "patientContext": {
    "ageBand": "13 years, per the source case text",
    "sex": "Female, per the source case text",
    "anatomicalSite": "Second left toe, nail unit",
    "presentationNotes": "The source reports a band present from birth with progressive growth. The images are from the first consultation. Growth is the source's history; one frame cannot show it."
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g26-05a",
      "type": "clinical",
      "src": "assets/media/cases/case-43-clinical.jpg",
      "dimensions": {
        "width": 760,
        "height": 615
      },
      "alt": "Clinical photograph of a child's toes with a faint brown band along one side of a toenail. No diagnosis is included.",
      "caption": "Clinical photograph at the first consultation. The source panel letter A is kept. The source label stays hidden until reveal.",
      "source": "Morato IB, Gontijo JRV, Tavares GT, Bittencourt FV. Anais Brasileiros de Dermatologia 2022, via PubMed Central (PMC9263629)",
      "sourceUrl": "https://doi.org/10.1016/j.abd.2021.02.012",
      "creator": "Isabela Boechat Morato and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Morato and coauthors, Anais Brasileiros de Dermatologia 2022, Figure 2 panel A, doi:10.1016/j.abd.2021.02.012. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel A of Figure 2 was cropped from the figure image embedded on page 2 of the article PDF in the PMC open-access package PMC9263629 (PDF image object 5, 1505 x 1312 pixels), source sha256 dcdbf421339af5fedce5254f23551450d07a3b4df57f9d1ce3d4f235680c3bec, at pixel box left 2, top 2, right 762, bottom 617 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 c277f4fe08c0a4efa3305ad39ea5d8bedbdb4735adac116924280e27b3c9206a. No color change, no annotation, and no other edit.",
      "consentBasis": "The article is distributed under CC BY 4.0, with no third-party credit on the figure. A consent sentence is not printed in this letter; the frame shows a toe and nail only."
    },
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g26-05b",
      "type": "dermoscopy",
      "src": "assets/media/cases/case-43-dermoscopy.jpg",
      "dimensions": {
        "width": 720,
        "height": 615
      },
      "alt": "Dermoscopic view of a toenail with a brown band of longitudinal lines along one side and dark pigment along the proximal edge. No diagnosis is included.",
      "caption": "Dermoscopic view at the same consultation, per the source caption. The panel letter B is kept.",
      "source": "Morato IB, Gontijo JRV, Tavares GT, Bittencourt FV. Anais Brasileiros de Dermatologia 2022, via PubMed Central (PMC9263629)",
      "sourceUrl": "https://doi.org/10.1016/j.abd.2021.02.012",
      "creator": "Isabela Boechat Morato and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Morato and coauthors, Anais Brasileiros de Dermatologia 2022, Figure 2 panel B, doi:10.1016/j.abd.2021.02.012. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel B of Figure 2 was cropped from the figure image embedded on page 2 of the article PDF in the PMC open-access package PMC9263629 (PDF image object 5, 1505 x 1312 pixels), source sha256 dcdbf421339af5fedce5254f23551450d07a3b4df57f9d1ce3d4f235680c3bec, at pixel box left 783, top 2, right 1503, bottom 617 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 c047e868ca0c602391acbfe16b9c07939d5d1927265c260f509ac743273ac89e. No color change, no annotation, and no other edit.",
      "consentBasis": "The article is distributed under CC BY 4.0, with no third-party credit on the figure. A consent sentence is not printed in this letter; the frame shows a toe and nail only."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Junctional melanocytic nevus of the nail unit (histopathology stated in the case text)",
    "confirmationMethod": "histopathology",
    "histopathologySource": "case_text",
    "confirmationNotes": "Morato and coauthors (Anais Brasileiros de Dermatologia 2022, doi:10.1016/j.abd.2021.02.012), checked 2026-10-02, report for Case 2 that the histopathology of a tangential biopsy was compatible with a junctional melanocytic nevus. The biopsy followed the first-consultation images in Figure 2 A and B. The band then stayed stable for five years.",
    "confidenceNote": "Lesion-specific histopathology sentence in the case text. Docutis did not see a slide. A benign result in a child does not clear an adult band."
  },
  "observations": [
    {
      "id": "obs-g26-05a",
      "kind": "observation",
      "modality": "clinical",
      "text": "A child's toes. A faint brown band runs along one side of the nail of the second toe."
    },
    {
      "id": "obs-g26-05b",
      "kind": "observation",
      "modality": "dermoscopy",
      "text": "A brown band occupies one side of the nail plate. Inside it, longitudinal lines of light and dark brown vary in shade and thickness, and the band edge facing the plate centre is blurred. Dark pigment runs along the proximal edge of the plate. Air bubbles and a fluid edge cross the field."
    }
  ],
  "interpretations": [
    {
      "id": "int-g26-05a",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g26-05a"
      ],
      "text": "A pigmented band in one nail of a child is described before it is named."
    },
    {
      "id": "int-g26-05b",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g26-05a",
        "obs-g26-05b"
      ],
      "text": "The lines vary in shade and thickness and one edge is blurred. The source reports Hutchinson's sign; whether the proximal dark pigment sits on fold skin or shows through the cuticle cannot be resolved here, so it is not claimed."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Junctional melanocytic nevus of the nail unit",
      "supportingFeatures": [
        "Brown band with longitudinal lines.",
        "A child.",
        "The case text reports histopathology."
      ],
      "contradictingFeatures": [
        "Line irregularity and a blurred edge."
      ],
      "teachingDistinction": "The source states that irregular features are common in benign childhood bands."
    },
    {
      "diagnosis": "Nail-unit melanoma",
      "supportingFeatures": [
        "Irregular line shade and thickness, blurred edge."
      ],
      "contradictingFeatures": [
        "Melanoma is extremely rare in children according to the source.",
        "The plate is intact."
      ],
      "teachingDistinction": "The same features would weigh more in an adult."
    },
    {
      "diagnosis": "Subungual haemorrhage",
      "supportingFeatures": [
        "Dark colour in a nail."
      ],
      "contradictingFeatures": [
        "The colour is brown in longitudinal lines, not red to black spots."
      ],
      "teachingDistinction": "Blood does not form a longitudinal brown band."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g26-05a",
      "title": "Notice first",
      "text": "Describe the band: colour, width, line regularity, and edges. Then look at the folds."
    },
    {
      "id": "tp-g26-05b",
      "title": "Age changes the weight",
      "text": "The source says irregular lines are common in benign childhood bands. The same frame in an adult would weigh differently."
    }
  ],
  "observationPrompts": [
    "Do the lines inside the band have the same shade and thickness?",
    "Is pigment visible on the skin around the nail, or only at the plate edge?"
  ],
  "hints": [
    "Bubbles and the fluid edge are from the contact fluid."
  ],
  "closestMimic": {
    "name": "Nail-unit melanoma",
    "whyClosest": "Irregular longitudinal lines and a blurred edge are warning features in adults."
  },
  "patterns": [
    {
      "id": "pat-g26-05-lines",
      "label": "Brown longitudinal lines of uneven shade",
      "modality": "dermoscopy",
      "specificityNote": "Lines of light and dark brown vary in shade and thickness inside a one-sided band. Their irregularity is clear in parts and soft in others, so the certainty is probable.",
      "certainty": "probably",
      "weight": "major"
    },
    {
      "id": "pat-g26-05-fold",
      "label": "Dark pigment at the proximal plate edge",
      "modality": "dermoscopy",
      "specificityNote": "Dark pigment lines the proximal edge. Fold skin and cuticle cannot be separated here, so no Hutchinson sign is claimed.",
      "certainty": "uncertain",
      "weight": "weak"
    }
  ],
  "synthesis": "The case text reports a junctional melanocytic nevus on biopsy after these first-consultation images. The dermoscopic frame shows a one-sided brown band with lines of uneven shade and a blurred edge.",
  "evidenceWeighting": "Uneven lines are probably visible and are the major finding; in a child the source says they are common in benign bands. The proximal pigment is uncertain and weak. The lesion-specific histopathology sentence is the confirmation.",
  "diagnosticTrap": "Applying adult melanonychia warning rules unchanged to a child, or claiming a Hutchinson sign from pigment at the plate edge.",
  "mentorNote": "This is the narrower benign childhood band. Compare it with the adult great-toenail case, where irregular lines come with a broken plate.",
  "takeHomeRule": "In a child, irregular band features are common and are weighed with age. The decision to biopsy remains individual.",
  "whyNot": [
    {
      "mimic": "Nail-unit melanoma",
      "text": "The adult nail melanoma also shows irregular lines but with a fissured plate. Here the plate is intact and the patient is a child."
    },
    {
      "mimic": "Subungual haemorrhage",
      "text": "Blood forms red to black spots, not a longitudinal brown band."
    }
  ],
  "compareWith": [
    "cmp-g26-nail-narrow"
  ],
  "pairedModality": {
    "clinicalObservation": "A child's toes. A faint brown band runs along one side of the nail of the second toe.",
    "dermoscopicObservation": "A brown band occupies one side of the nail plate. Inside it, longitudinal lines of light and dark brown vary in shade and thickness, and the band edge facing the plate centre is blurred. Dark pigment runs along the proximal edge of the plate. Air bubbles and a fluid edge cross the field.",
    "addedValue": "The dermoscopic frame resolves the lines inside the band; clinically only a faint band is seen.",
    "reasoningImpact": "The reading moves from a faint toenail band to a band with uneven lines. In a child that is a common benign look per the source.",
    "limits": "Figure 2 A and B are both from the first consultation, before the biopsy. The source's growth history is not visible in one frame.",
    "informationGain": "dermoscopy_adds_support",
    "informationGainNote": "Educational label only. The dermoscopic frame adds the internal line pattern of the band. Educational label only. Not a validated metric and not a probability.",
    "comparison": {
      "clinicalClue": "Faint brown band on one side of a toenail.",
      "dermoscopicClue": "Uneven brown lines, blurred inner edge.",
      "addedInformation": "The internal line pattern is only visible on the dermoscopic frame.",
      "diagnosticConflict": "Uneven lines are an adult warning feature.",
      "teachingRule": "Weigh nail band features with age."
    }
  },
  "modalityIntegration": "The first frame is the clinical photograph of a child's toes with a faint brown band on one toenail. The second frame is the dermoscopic view at the same consultation and shows a one-sided brown band with uneven longitudinal lines.",
  "academy": {
    "level": 3,
    "spectrum": "mimic",
    "teachingType": "teaching",
    "skillIds": [
      "nail-band"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "localization": null,
  "clinicalAction": "After reveal, compare with the adult great-toenail case. Do not treat from this case.",
  "managementBrief": "No management category is stored. The source history is not a Docutis recommendation. This brief is not a protocol and remains review required.",
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

## case: A broad dark band on a child's fingernail (`case-g26-06`)

- **Exact fingerprint:** `sha256-v1:f824314116981578c95d1560bcb5d885cac1f5cf6513c0894a4f89b269ee5589`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://doi.org/10.1016/j.abd.2021.02.012
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g26-06",
  "slug": "g26-fingernail-broad-dark-band-child",
  "title": "A broad dark band on a child's fingernail",
  "diagnosisLabel": "Recurrent junctional melanocytic nevus of the nail unit",
  "diseaseId": "melanocytic-nevus",
  "category": "Benign melanocytic",
  "educationalLevel": "advanced",
  "caseType": "clinical_dermoscopic",
  "patientContext": {
    "ageBand": "3 years, per the source case text",
    "sex": "Female, per the source case text",
    "anatomicalSite": "Fifth left finger, nail unit",
    "presentationNotes": "The source reports a band for two years that recurred and grew after an earlier biopsy. Growth and recurrence are the source's history; one frame cannot show them."
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g26-06a",
      "type": "clinical",
      "src": "assets/media/cases/case-44-clinical.jpg",
      "dimensions": {
        "width": 787,
        "height": 832
      },
      "alt": "Clinical photograph of a child's finger with a broad black-brown band along the nail. No diagnosis is included.",
      "caption": "Clinical photograph. The source panel letter A is kept. The source label stays hidden until reveal.",
      "source": "Morato IB, Gontijo JRV, Tavares GT, Bittencourt FV. Anais Brasileiros de Dermatologia 2022, via PubMed Central (PMC9263629)",
      "sourceUrl": "https://doi.org/10.1016/j.abd.2021.02.012",
      "creator": "Isabela Boechat Morato and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Morato and coauthors, Anais Brasileiros de Dermatologia 2022, Figure 3 panel A, doi:10.1016/j.abd.2021.02.012. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel A of Figure 3 was cropped from the figure image embedded on page 2 of the article PDF in the PMC open-access package PMC9263629 (PDF image object 6, 1505 x 834 pixels), source sha256 ce36b982a3dd2acaad68a6481a6453b3a1ed430c017994b63d3f23476d7391ae, at pixel box left 2, top 0, right 789, bottom 832 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 c41e90570e8a40bf952b9d1745e051ab5027a3d9103539636da72d121117a787. No color change, no annotation, and no other edit.",
      "consentBasis": "The article is distributed under CC BY 4.0, with no third-party credit on the figure. A consent sentence is not printed in this letter; the frame shows a finger and nail only."
    },
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g26-06b",
      "type": "dermoscopy",
      "src": "assets/media/cases/case-44-dermoscopy.jpg",
      "dimensions": {
        "width": 706,
        "height": 832
      },
      "alt": "Dermoscopic view of a fingernail with a broad band of dark brown to black longitudinal lines of differing thickness. No diagnosis is included.",
      "caption": "Dermoscopic view of the same lesion, per the source caption. The panel letter B is kept.",
      "source": "Morato IB, Gontijo JRV, Tavares GT, Bittencourt FV. Anais Brasileiros de Dermatologia 2022, via PubMed Central (PMC9263629)",
      "sourceUrl": "https://doi.org/10.1016/j.abd.2021.02.012",
      "creator": "Isabela Boechat Morato and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Morato and coauthors, Anais Brasileiros de Dermatologia 2022, Figure 3 panel B, doi:10.1016/j.abd.2021.02.012. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel B of Figure 3 was cropped from the figure image embedded on page 2 of the article PDF in the PMC open-access package PMC9263629 (PDF image object 6, 1505 x 834 pixels), source sha256 ce36b982a3dd2acaad68a6481a6453b3a1ed430c017994b63d3f23476d7391ae, at pixel box left 797, top 0, right 1503, bottom 832 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 edb7f2858a90556950d1415093dc862990d355223cfa00c771eec3ffc72b1c7d. No color change, no annotation, and no other edit.",
      "consentBasis": "The article is distributed under CC BY 4.0, with no third-party credit on the figure. A consent sentence is not printed in this letter; the frame shows a finger and nail only."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Recurrent junctional melanocytic nevus of the nail unit (histopathology stated in the case text)",
    "confirmationMethod": "histopathology",
    "histopathologySource": "case_text",
    "confirmationNotes": "Morato and coauthors (Anais Brasileiros de Dermatologia 2022, doi:10.1016/j.abd.2021.02.012), checked 2026-10-02, report for Case 3 a biopsy one year earlier compatible with a junctional melanocytic nevus, regrowth since then, and a second evaluation of the histopathology without signs of malignancy. The photographs show the regrown band, so the histopathology predates these frames. The band stayed stable for two years.",
    "confidenceNote": "Lesion-specific histopathology sentence, from a biopsy taken before these photographs. Docutis did not see a slide. A benign result in a child does not clear an adult band."
  },
  "observations": [
    {
      "id": "obs-g26-06a",
      "kind": "observation",
      "modality": "clinical",
      "text": "A child's finger with a broad black-brown band running the full length of the nail."
    },
    {
      "id": "obs-g26-06b",
      "kind": "observation",
      "modality": "dermoscopy",
      "text": "A broad band of dark brown to black longitudinal lines fills the central part of the plate. The lines differ in darkness and thickness, and the band edges are slightly blurred. The plate surface is intact. Grey shading lies at the proximal edge under the cuticle."
    }
  ],
  "interpretations": [
    {
      "id": "int-g26-06a",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g26-06a"
      ],
      "text": "A broad dark band in a child's nail is a dramatic look, described before it is named."
    },
    {
      "id": "int-g26-06b",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g26-06a",
        "obs-g26-06b"
      ],
      "text": "The lines differ in darkness and thickness. Those are adult warning features; the source says they are common in benign childhood bands. The plate is intact. Grey shading at the cuticle is not claimed as a Hutchinson sign."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Recurrent junctional melanocytic nevus of the nail unit",
      "supportingFeatures": [
        "Broad band of longitudinal lines in a child.",
        "The case text reports histopathology and a second review."
      ],
      "contradictingFeatures": [
        "The histopathology predates these photographs."
      ],
      "teachingDistinction": "The diagnosis rests on an earlier biopsy of the same band and its re-review."
    },
    {
      "diagnosis": "Nail-unit melanoma",
      "supportingFeatures": [
        "Broad dark band with lines of differing thickness."
      ],
      "contradictingFeatures": [
        "A small child.",
        "Intact plate.",
        "Re-reviewed histopathology without malignancy."
      ],
      "teachingDistinction": "In an adult this frame would weigh much more heavily."
    },
    {
      "diagnosis": "Subungual haemorrhage",
      "supportingFeatures": [
        "Dark colour under a nail."
      ],
      "contradictingFeatures": [
        "Regular longitudinal lines, not red to black spots."
      ],
      "teachingDistinction": "Blood does not make a broad band of lines."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g26-06a",
      "title": "Notice first",
      "text": "Name the width, the colours, and how the lines differ. Then check the plate surface and the folds."
    },
    {
      "id": "tp-g26-06b",
      "title": "Read the timing",
      "text": "The biopsy came before these photographs. That makes the confirmation weaker than a biopsy of the photographed band."
    }
  ],
  "observationPrompts": [
    "How do the lines differ in darkness and thickness?",
    "Is the nail plate surface intact or broken?"
  ],
  "hints": [
    "Grey shading under the cuticle is not the same as pigment on the fold skin."
  ],
  "closestMimic": {
    "name": "Nail-unit melanoma",
    "whyClosest": "A broad dark band with lines of differing thickness is an adult warning look."
  },
  "patterns": [
    {
      "id": "pat-g26-06-lines",
      "label": "Broad band of dark lines of differing thickness",
      "modality": "dermoscopy",
      "specificityNote": "Dark brown to black longitudinal lines differ clearly in darkness and thickness across a broad band.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g26-06-plate",
      "label": "Broken or missing nail plate",
      "modality": "dermoscopy",
      "specificityNote": "The plate surface is intact. No break or debris is visible.",
      "certainty": "not_visible",
      "weight": "supportive"
    }
  ],
  "synthesis": "The case text reports a junctional melanocytic nevus on an earlier biopsy of this band, with regrowth and a re-review without malignancy. The dermoscopic frame shows a broad band of dark lines of differing thickness on an intact plate.",
  "evidenceWeighting": "The irregular lines are clearly visible and are the major finding; the source says they are common in benign childhood bands. The intact plate supports the benign reading. The histopathology predates the photographs, which weakens the confirmation.",
  "diagnosticTrap": "Using line irregularity alone to call a childhood band malignant, or using this benign result to dismiss an adult band.",
  "mentorNote": "This dramatic childhood band shares irregular lines with the adult nail melanoma. The plate damage and the age differ.",
  "takeHomeRule": "Irregular nail lines are weighed with age and plate integrity. In children they are common in benign bands, and the decision remains individual.",
  "whyNot": [
    {
      "mimic": "Nail-unit melanoma",
      "text": "The adult nail melanoma shows irregular lines with a fissured plate and debris. Here the plate is intact and the patient is three years old."
    },
    {
      "mimic": "Subungual haemorrhage",
      "text": "Blood forms red to black spots, not a broad band of longitudinal lines."
    }
  ],
  "compareWith": [
    "cmp-g26-nail-broad"
  ],
  "pairedModality": {
    "clinicalObservation": "A child's finger with a broad black-brown band running the full length of the nail.",
    "dermoscopicObservation": "A broad band of dark brown to black longitudinal lines fills the central part of the plate. The lines differ in darkness and thickness, and the band edges are slightly blurred. The plate surface is intact. Grey shading lies at the proximal edge under the cuticle.",
    "addedValue": "The dermoscopic frame resolves the individual lines and their differences; clinically the band looks uniformly dark.",
    "reasoningImpact": "The reading moves from a broad dark band to a band of irregular lines on an intact plate. In a child the source treats that as a common benign look.",
    "limits": "The caption labels panels A and B as one lesion. The histopathology is from a biopsy before these frames. Growth and recurrence are history, not visible in one frame.",
    "informationGain": "dermoscopy_adds_support",
    "informationGainNote": "Educational label only. The dermoscopic frame resolves the line pattern of the band. Educational label only. Not a validated metric and not a probability.",
    "comparison": {
      "clinicalClue": "Broad black-brown band in a child's nail.",
      "dermoscopicClue": "Dark lines of differing thickness, intact plate.",
      "addedInformation": "Line-level irregularity is only visible on the dermoscopic frame.",
      "diagnosticConflict": "Irregular lines are an adult warning feature.",
      "teachingRule": "Weigh irregularity with age and plate integrity."
    }
  },
  "modalityIntegration": "The first frame is the clinical photograph of a child's finger with a broad black-brown nail band. The second frame is the dermoscopic view of the same band and shows dark longitudinal lines of differing thickness on an intact plate.",
  "academy": {
    "level": 4,
    "spectrum": "mimic",
    "teachingType": "reasoning",
    "skillIds": [
      "nail-band",
      "evidence-weighting"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "localization": null,
  "clinicalAction": "After reveal, compare with the adult great-toenail case. Do not treat from this case.",
  "managementBrief": "No management category is stored. The source history is not a Docutis recommendation. This brief is not a protocol and remains review required.",
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

## case: A discoloured great toenail with a split (`case-g26-07`)

- **Exact fingerprint:** `sha256-v1:b2036d50f58f11017359f6bb7ac4d2293e035cce589b5b3f17d97497f270b696`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://doi.org/10.3390/jcm10030478
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g26-07",
  "slug": "g26-great-toenail-bands-split",
  "title": "A discoloured great toenail with a split",
  "diagnosisLabel": "Nail-unit melanoma",
  "diseaseId": "acral-melanoma",
  "category": "Melanoma",
  "educationalLevel": "advanced",
  "caseType": "clinical_dermoscopic",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Great toe, nail unit",
    "presentationNotes": "The source figure is in a review of melanomas of uncommon sites. Age, sex, and history are not given."
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g26-07a",
      "type": "clinical",
      "src": "assets/media/cases/case-45-clinical.jpg",
      "dimensions": {
        "width": 827,
        "height": 735
      },
      "alt": "Clinical photograph of a great toe with a brown-grey discoloured nail split lengthwise. No diagnosis is included.",
      "caption": "Clinical photograph. The source panel letter a is kept. The source label stays hidden until reveal.",
      "source": "Dika E, Lambertini M, Pellegrini C, Veronesi G, Melotti B, Riefolo M, Sperandi F, Patrizi A, et al. Journal of Clinical Medicine 2021, via PubMed Central (PMC7866093)",
      "sourceUrl": "https://doi.org/10.3390/jcm10030478",
      "creator": "Emi Dika and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Dika and coauthors, Journal of Clinical Medicine 2021, Figure 1 panel a, doi:10.3390/jcm10030478. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel a of Figure 1 was cropped from the figure image embedded on page 2 of the article PDF in the PMC open-access package PMC7866093 (PDF image object 88, 1662 x 735 pixels), source sha256 32fb60b69752b797857247679fa56971e7142a7d64cf1d41d9a499534d2a27f0, at pixel box left 0, top 0, right 827, bottom 735 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 79a3a39aaa1ee4db981955dd01c77777dd3158270fe265e24d3122bf2d77f9a6. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that written informed consent was obtained from the patients. The article is distributed under CC BY 4.0, with no third-party credit on the figure. The frame shows a toe only."
    },
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g26-07b",
      "type": "dermoscopy",
      "src": "assets/media/cases/case-45-dermoscopy.jpg",
      "dimensions": {
        "width": 833,
        "height": 735
      },
      "alt": "Dermoscopic view of a toenail with bands of yellow, orange, and dark brown of differing width and a central fissure with dark dots. No diagnosis is included.",
      "caption": "Dermoscopic view of the same nail, per the source caption. The panel letter b is kept.",
      "source": "Dika E, Lambertini M, Pellegrini C, Veronesi G, Melotti B, Riefolo M, Sperandi F, Patrizi A, et al. Journal of Clinical Medicine 2021, via PubMed Central (PMC7866093)",
      "sourceUrl": "https://doi.org/10.3390/jcm10030478",
      "creator": "Emi Dika and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Dika and coauthors, Journal of Clinical Medicine 2021, Figure 1 panel b, doi:10.3390/jcm10030478. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel b of Figure 1 was cropped from the figure image embedded on page 2 of the article PDF in the PMC open-access package PMC7866093 (PDF image object 88, 1662 x 735 pixels), source sha256 32fb60b69752b797857247679fa56971e7142a7d64cf1d41d9a499534d2a27f0, at pixel box left 829, top 0, right 1662, bottom 735 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 92921d5333fe94744054c4328107676cf4c319d66ead5caf98505ed1a66a23cf. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that written informed consent was obtained from the patients. The article is distributed under CC BY 4.0, with no third-party credit on the figure. The field shows a nail and skin only."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Nail-unit melanoma (peer-reviewed figure caption, histopathology not stated)",
    "confirmationMethod": "clinical_diagnosis",
    "confirmationNotes": "The Figure 1 caption of Dika and coauthors (Journal of Clinical Medicine 2021, doi:10.3390/jcm10030478), checked 2026-10-02, names a nail melanoma of the great toenail with irregular longitudinal bands, plate dystrophy, and pigmentation reaching the hyponychium. The article does not state histopathology for this figure, so confirmation stays at the caption.",
    "confidenceNote": "Peer-reviewed caption by the article authors. Not a histopathology statement. Not a Docutis clinician review."
  },
  "observations": [
    {
      "id": "obs-g26-07a",
      "kind": "observation",
      "modality": "clinical",
      "text": "A great toenail with brown-grey discolouration across the plate and a longitudinal split through its middle."
    },
    {
      "id": "obs-g26-07b",
      "kind": "observation",
      "modality": "dermoscopy",
      "text": "Longitudinal bands of yellow-brown, orange-brown, and dark brown cross the whole plate and differ in width and colour. A central longitudinal fissure contains white scale and black-brown dots. Faint brownish colour lies on the skin below the free edge."
    }
  ],
  "interpretations": [
    {
      "id": "int-g26-07a",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g26-07a"
      ],
      "text": "A whole-plate discolouration with a split in an adult toenail is described before it is named."
    },
    {
      "id": "int-g26-07b",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g26-07a",
        "obs-g26-07b"
      ],
      "text": "Longitudinal bands differ in width and colour, and the plate is fissured with dark dots inside the fissure. The faint colour below the free edge is not clear enough to call a Hutchinson sign."
    }
  ],
  "differentials": [
    {
      "diagnosis": "Nail-unit melanoma",
      "supportingFeatures": [
        "Irregular longitudinal bands across the plate.",
        "Fissured plate with dark dots."
      ],
      "contradictingFeatures": [
        "No histopathology statement in the source."
      ],
      "teachingDistinction": "Irregular bands plus plate damage carry the concern; the caption is the label."
    },
    {
      "diagnosis": "Subungual haemorrhage",
      "supportingFeatures": [
        "Dark dots in the plate."
      ],
      "contradictingFeatures": [
        "Most of the colour is brown and banded lengthwise, not red to black spots."
      ],
      "teachingDistinction": "Ronger and coauthors caution that blood spots do not exclude melanoma."
    },
    {
      "diagnosis": "Onychomycosis",
      "supportingFeatures": [
        "Yellow discolouration and a split plate."
      ],
      "contradictingFeatures": [
        "Dark brown longitudinal bands are present."
      ],
      "teachingDistinction": "Fungus can coexist and can mimic; it does not explain the bands."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g26-07a",
      "title": "Notice first",
      "text": "Name every band colour and its width. Then describe the plate: intact, split, or broken."
    },
    {
      "id": "tp-g26-07b",
      "title": "What the source says",
      "text": "The caption names the diagnosis and a Hutchinson sign. No histopathology sentence is given, and the Hutchinson sign was not claimed from this frame."
    }
  ],
  "observationPrompts": [
    "Do the bands differ in width and colour?",
    "Is the nail plate intact, or split?"
  ],
  "hints": [
    "Look inside the split before you name the colours."
  ],
  "closestMimic": {
    "name": "Subungual haemorrhage",
    "whyClosest": "Dark dots in a damaged toenail can be blood."
  },
  "patterns": [
    {
      "id": "pat-g26-07-lines",
      "label": "Bands of differing width and colour across the plate",
      "modality": "dermoscopy",
      "specificityNote": "Yellow-brown, orange-brown, and dark brown bands run lengthwise and differ clearly in width and colour.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g26-07-plate",
      "label": "Fissured plate with dark dots",
      "modality": "dermoscopy",
      "specificityNote": "A central longitudinal fissure with white scale and black-brown dots breaks the plate.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g26-07-hypo",
      "label": "Colour on the skin below the free edge",
      "modality": "dermoscopy",
      "specificityNote": "Faint brownish colour lies below the free edge. It is not clear enough to call periungual pigment.",
      "certainty": "uncertain",
      "weight": "weak"
    }
  ],
  "synthesis": "The source caption names this great-toenail lesion a nail melanoma. The dermoscopic frame shows irregular longitudinal bands across the plate and a fissure with dark dots. No histopathology is stated.",
  "evidenceWeighting": "Irregular bands and the fissured plate are clearly visible and are the major clues. Colour below the free edge is uncertain and weak. The confirmation is a peer-reviewed caption, not histopathology.",
  "diagnosticTrap": "Blaming fungus or trauma for a banded damaged toenail, or claiming a Hutchinson sign from a faint shadow.",
  "mentorNote": "This adult nail shares irregular lines with the childhood bands. Plate damage, whole-plate involvement, and age differ.",
  "takeHomeRule": "In an adult, irregular longitudinal bands with plate damage need a melanoma differential and usually histopathology.",
  "whyNot": [
    {
      "mimic": "Subungual haemorrhage",
      "text": "Most of the colour is brown and banded lengthwise. Blood spots in a nail do not exclude melanoma."
    },
    {
      "mimic": "Junctional melanocytic nevus of the nail unit",
      "text": "The childhood bands share irregular lines but have an intact plate. This adult plate is fissured."
    }
  ],
  "compareWith": [
    "cmp-g26-nail-broad",
    "cmp-g26-nail-narrow"
  ],
  "pairedModality": {
    "clinicalObservation": "A great toenail with brown-grey discolouration across the plate and a longitudinal split through its middle.",
    "dermoscopicObservation": "Longitudinal bands of yellow-brown, orange-brown, and dark brown cross the whole plate and differ in width and colour. A central longitudinal fissure contains white scale and black-brown dots. Faint brownish colour lies on the skin below the free edge.",
    "addedValue": "The dermoscopic frame separates the bands and shows dots in the fissure; clinically the plate is diffusely brown-grey.",
    "reasoningImpact": "The reading moves from a discoloured split toenail to irregular longitudinal bands with plate damage. That keeps a malignant melanocytic lesion high in the differential.",
    "limits": "The caption labels panels a and b as one nail. No histopathology is stated. The colour below the free edge is uncertain.",
    "informationGain": "dermoscopy_adds_support",
    "informationGainNote": "Educational label only. The dermoscopic frame resolves irregular bands and fissure dots. Educational label only. Not a validated metric and not a probability.",
    "comparison": {
      "clinicalClue": "Brown-grey toenail with a lengthwise split.",
      "dermoscopicClue": "Irregular bands, fissure with dark dots.",
      "addedInformation": "Band irregularity and fissure dots are only visible on the dermoscopic frame.",
      "diagnosticConflict": null,
      "teachingRule": "In an adult, irregular bands with plate damage are not explained by trauma alone."
    }
  },
  "modalityIntegration": "The first frame is the clinical photograph of a great toenail with brown-grey discolouration and a lengthwise split. The second frame is the dermoscopic view of the same nail and shows bands of differing width and colour with a fissure containing dark dots.",
  "academy": {
    "level": 4,
    "spectrum": "melanoma",
    "teachingType": "reasoning",
    "skillIds": [
      "nail-band",
      "nail-unit-damage"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "dermoscopicFeatures": [],
  "localization": null,
  "clinicalAction": "After reveal, open the linked Docutis acral melanoma record for reference context. Do not treat from this case.",
  "managementBrief": "No management category is stored. The source history is not a Docutis recommendation. This brief is not a protocol and remains review required.",
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

## case: A cluster of small brown spots on the sole (`case-g27-01`)

- **Exact fingerprint:** `sha256-v1:ebca82c6130e14a69500d5af5e11d2b816498524aab1199c0e92af84dbf320e9`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://doi.org/10.1016/j.jdcr.2026.05.048
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g27-01",
  "slug": "g27-sole-cluster-thin-lines",
  "title": "A cluster of small brown spots on the sole",
  "diagnosisLabel": "Acquired agminated melanocytic nevi of the sole",
  "diseaseId": "melanocytic-nevus",
  "category": "Benign melanocytic",
  "educationalLevel": "intermediate",
  "caseType": "clinical_dermoscopic",
  "patientContext": {
    "ageBand": "39 years at these photographs, per the source case text",
    "sex": "Female, per the source case text",
    "anatomicalSite": "Right sole, plantar",
    "presentationNotes": "The source reports spots since age 12 that increased in number from age 36, followed for nine years. These frames are from the first visit at 39. Change over time is the source's history; one frame cannot show it."
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g27-01a",
      "type": "clinical",
      "src": "assets/media/cases/case-46-clinical.jpg",
      "dimensions": {
        "width": 434,
        "height": 330
      },
      "alt": "Clinical close-up of sole skin with a cluster of many small brown macules of differing darkness. No diagnosis is included.",
      "caption": "Clinical photograph at the first visit. The source panel letter B is kept. The source label stays hidden until reveal.",
      "source": "Terada A, Rokunohe D, Sawamura D, Akasaka E. JAAD Case Reports 2026, via PubMed Central (PMC13319713)",
      "sourceUrl": "https://doi.org/10.1016/j.jdcr.2026.05.048",
      "creator": "Akari Terada and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Terada and coauthors, JAAD Case Reports 2026, Figure 1 panel B, doi:10.1016/j.jdcr.2026.05.048. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel B of Figure 1 was cropped from the figure image embedded on page 2 of the article PDF in the PMC open-access package PMC13319713.1 (PDF image object 7, 1943 x 889 pixels, stored losslessly in the PDF), source sha256 4308a4d348806e77fdbba45f93fbbe4f94294cb97a41bfc001446ddd8d5eb90f computed over the decoded RGB pixel buffer because PDF image extractors re-encode the file differently (article PDF sha256 a0347363234690dd82b442740f92a7c60b35fd9297f38e4a4f9cfb424b8967dc), at pixel box left 508, top 67, right 942, bottom 397 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 8b01b7f606704b4c053e1bd86a9cd13c3ac7fcc5867fdc2febdc63aa383c8fd2. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that the authors obtained written consent from the patient for publication of photographs and medical information; the consent forms were retained by the authors. The article is distributed under CC BY 4.0, with no third-party credit on the figures. The frames show sole skin only."
    },
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g27-01b",
      "type": "dermoscopy",
      "src": "assets/media/cases/case-46-dermoscopy.jpg",
      "dimensions": {
        "width": 721,
        "height": 842
      },
      "alt": "Dermoscopic view of several tan-brown spots on the sole, each with thin dark lines along the skin markings and broader pale bands between them. No diagnosis is included.",
      "caption": "Dermoscopic view of the same cluster at the same age, per the source. The panel letter A is kept.",
      "source": "Terada A, Rokunohe D, Sawamura D, Akasaka E. JAAD Case Reports 2026, via PubMed Central (PMC13319713)",
      "sourceUrl": "https://doi.org/10.1016/j.jdcr.2026.05.048",
      "creator": "Akari Terada and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Terada and coauthors, JAAD Case Reports 2026, Figure 2 panel A, doi:10.1016/j.jdcr.2026.05.048. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel A of Figure 2 was cropped from the figure image embedded on page 2 of the article PDF in the PMC open-access package PMC13319713.1 (PDF image object 13, 1494 x 868 pixels, stored losslessly in the PDF), source sha256 aa7dc38a729d963c2629bc31c8dd60e659658eccf470b546a86998f7ca9d1174 computed over the decoded RGB pixel buffer because PDF image extractors re-encode the file differently (article PDF sha256 a0347363234690dd82b442740f92a7c60b35fd9297f38e4a4f9cfb424b8967dc), at pixel box left 2, top 23, right 723, bottom 865 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 0c4fc37824037ad0647b298c4f0c6c25ad7cb6152db62ca738e7e0f78bb55a84. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that the authors obtained written consent from the patient for publication of photographs and medical information; the consent forms were retained by the authors. The article is distributed under CC BY 4.0, with no third-party credit on the figures. The frames show sole skin only."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Acquired agminated melanocytic nevi of the sole (histopathology stated in the case text)",
    "confirmationMethod": "histopathology",
    "histopathologySource": "case_text",
    "confirmationNotes": "Terada and coauthors (JAAD Case Reports 2026, doi:10.1016/j.jdcr.2026.05.048), checked 2026-10-02, report histopathology of a biopsy of one spot of this cluster at age 46 showing junctional melanocytes without nuclear atypia and sparse PRAME staining, supporting benign nevi, and no melanoma over nine years of follow-up. The biopsy was taken seven years after these photographs and sampled one spot of the cluster, so it does not verify the photographed spots one by one. The source's printed panel letters for the later visits do not match its caption; only the first-visit panels, which agree, were used.",
    "confidenceNote": "Lesion-cluster histopathology from a biopsy taken after these frames, plus long follow-up. Docutis did not see a slide. A benign result here does not clear another acral macule."
  },
  "observations": [
    {
      "id": "obs-g27-01a",
      "kind": "observation",
      "modality": "clinical",
      "text": "A cluster of many small brown macules, one to a few millimetres each, sits in one area of the sole. Some macules are darker than others. The skin markings run across the cluster."
    },
    {
      "id": "obs-g27-01b",
      "kind": "observation",
      "modality": "dermoscopy",
      "text": "Several separate tan-brown spots. In each spot, thin dark brown lines run along the skin markings, with broader pale tan bands between them. Fine short cross-lines join some lines. No broad dark bands, no blotch, and no dots off the lines are present. Sweat-duct openings are not resolved."
    }
  ],
  "interpretations": [
    {
      "id": "int-g27-01a",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g27-01a"
      ],
      "text": "A cluster of small brown macules on the sole is described before it is named; the cluster as a whole looks less orderly than each spot."
    },
    {
      "id": "int-g27-01b",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g27-01a",
        "obs-g27-01b"
      ],
      "text": "The pigmented lines are thin and the pale bands between them are broader, a furrow-type geometry by width. Sweat-duct openings are not resolved, so the furrow assignment rests on width and stays probable."
    }
  ],
  "dermoscopicFeatures": [],
  "differentials": [
    {
      "diagnosis": "Acquired agminated melanocytic nevi of the sole",
      "supportingFeatures": [
        "Thin lines with broader pale bands in each spot.",
        "The case text reports benign histopathology and long follow-up."
      ],
      "contradictingFeatures": [
        "The cluster as a whole looked atypical to the source authors.",
        "The biopsy came after these frames."
      ],
      "teachingDistinction": "Each spot is read on its own; the source biopsied one spot because the whole cluster looked atypical."
    },
    {
      "diagnosis": "Acral melanoma",
      "supportingFeatures": [
        "Many new spots appeared in adulthood.",
        "The cluster has uneven darkness."
      ],
      "contradictingFeatures": [
        "No broad ridge-type bands, no blotch, no irregular dots in these frames."
      ],
      "teachingDistinction": "New acral pigment in an adult keeps melanoma in the differential; these frames show a furrow-type pattern in every spot."
    },
    {
      "diagnosis": "Speckled lentiginous nevus",
      "supportingFeatures": [
        "Several darker spots grouped in one area."
      ],
      "contradictingFeatures": [
        "No tan background patch is visible between the spots."
      ],
      "teachingDistinction": "The source reports no background pigmented macule."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g27-01a",
      "title": "Notice first",
      "text": "Confirm the site is the sole. Then, in each spot, compare the width of the brown lines with the pale bands between them."
    },
    {
      "id": "tp-g27-01b",
      "title": "Read the timing",
      "text": "The histopathology came from one spot seven years after these frames. That is real verification, but it is weaker than a biopsy of the photographed spot on the same day."
    }
  ],
  "observationPrompts": [
    "Are the brown lines thinner or wider than the pale bands between them?",
    "Does every spot show the same line arrangement?"
  ],
  "hints": [
    "Read one spot at a time before you judge the whole cluster."
  ],
  "closestMimic": {
    "name": "Acral melanoma",
    "whyClosest": "New pigmented spots on the sole of an adult, with uneven darkness across the cluster, keep melanoma in mind."
  },
  "patterns": [
    {
      "id": "pat-g27-01-furrow",
      "label": "Thin pigmented lines with broader pale bands",
      "modality": "dermoscopy",
      "specificityNote": "In each spot the brown lines are thin and the pale bands between them are broader, which favors pigment in the furrows. Sweat-duct openings are not resolved, so the certainty stays probable.",
      "certainty": "probably",
      "weight": "major"
    },
    {
      "id": "pat-g27-01-ridge",
      "label": "Broad parallel pigmented bands",
      "modality": "dermoscopy",
      "specificityNote": "No broad brown bands with thin pale lines are visible in any spot.",
      "certainty": "not_visible",
      "weight": "supportive"
    },
    {
      "id": "pat-g27-01-macules",
      "label": "Many small flat brown macules in one area",
      "modality": "clinical",
      "specificityNote": "Many separate small brown macules are grouped in one area of the sole.",
      "certainty": "clearly_visible",
      "weight": "supportive"
    }
  ],
  "synthesis": "The source reports benign histopathology from one spot of this sole cluster, taken seven years after these frames, and no melanoma over nine years. The dermoscopic frame shows thin lines with broader pale bands in every spot, without ridge-type bands or a blotch.",
  "evidenceWeighting": "The furrow-type width geometry is probably visible and is the major clue. The absent ridge bands support it. The confirmation is a later biopsy of one spot plus long follow-up, which is weaker than same-day histopathology of the photographed spot.",
  "diagnosticTrap": "Calling every pattern of parallel lines on the sole benign, or letting a benign cluster clear a single new acral lesion elsewhere.",
  "mentorNote": "This is the first benign acral case in Docutis whose thin lines sit in the furrows by width. Compare it with the heel lesions whose broad bands sit on the ridges.",
  "takeHomeRule": "On the sole, thin pigmented lines with broader pale bands are a furrow-type pattern that supports a benign reading in this frame. It is weighed with the rest of the lesion and is not a clearance.",
  "whyNot": [
    {
      "mimic": "Acral melanoma",
      "text": "No spot shows broad ridge-type bands, a blotch, or irregular dots. New spots in an adult still need follow-up, as the source did."
    },
    {
      "mimic": "Speckled lentiginous nevus",
      "text": "No tan background patch joins the spots in these frames."
    }
  ],
  "compareWith": [
    "cmp-g27-furrow-ridge-histology",
    "cmp-g27-furrow-both-poles"
  ],
  "pairedModality": {
    "clinicalObservation": "A cluster of many small brown macules, one to a few millimetres each, sits in one area of the sole. Some macules are darker than others. The skin markings run across the cluster.",
    "dermoscopicObservation": "Several separate tan-brown spots. In each spot, thin dark brown lines run along the skin markings, with broader pale tan bands between them. Fine short cross-lines join some lines. No broad dark bands, no blotch, and no dots off the lines are present. Sweat-duct openings are not resolved.",
    "addedValue": "The dermoscopic frame shows where the pigment sits on the skin markings in each spot; the clinical frame shows only a cluster of brown macules.",
    "reasoningImpact": "The reading moves from an uneven cluster of sole macules to spots that each show a furrow-type line pattern. That supports a benign reading in this frame.",
    "limits": "The source shows the clinical and dermoscopic frames at the same first visit but does not map the dermoscopic field to individual clinical spots. The histopathology is from one spot, seven years later. Sweat-duct openings are not resolved.",
    "informationGain": "dermoscopy_adds_support",
    "informationGainNote": "Educational label only. The dermoscopic frame adds thin lines with broader pale bands in every spot. Not a validated metric and not a probability.",
    "comparison": {
      "clinicalClue": "Cluster of small brown sole macules.",
      "dermoscopicClue": "Thin lines, broader pale bands, in each spot.",
      "addedInformation": "The line geometry is only visible on the dermoscopic frame.",
      "diagnosticConflict": "The cluster as a whole looked atypical to the source authors.",
      "teachingRule": "Read line width in each acral spot before judging the cluster."
    }
  },
  "modalityIntegration": "The first frame is the clinical photograph of a cluster of small brown macules on the sole. The second frame is the dermoscopic view of the same cluster at the same visit and shows thin brown lines with broader pale bands in each spot.",
  "academy": {
    "level": 3,
    "spectrum": "mimic",
    "teachingType": "teaching",
    "skillIds": [
      "furrow-versus-ridge",
      "many-brown-macules"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "localization": null,
  "clinicalAction": "After reveal, compare with the heel case whose broad bands sit on the ridges. Do not treat from this case.",
  "managementBrief": "No management category is stored. The source history is not a Docutis recommendation. This brief is not a protocol and remains review required.",
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

## case: A small dark spot on the sole (`case-g27-02`)

- **Exact fingerprint:** `sha256-v1:5747f0c781692afee836703424105587c752a4c39f4594032ad58e56806a59f4`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://doi.org/10.1111/ijd.70384
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g27-02",
  "slug": "g27-sole-macule-dotted-lines",
  "title": "A small dark spot on the sole",
  "diagnosisLabel": "Acral melanocytic nevus",
  "diseaseId": "melanocytic-nevus",
  "category": "Benign melanocytic",
  "educationalLevel": "intermediate",
  "caseType": "clinical_dermoscopic",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Left plantar sole",
    "presentationNotes": "The source figure is titled as an acral nevus on the left plantar surface. Age, sex, and history are not given for this lesion."
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g27-02a",
      "type": "clinical",
      "src": "assets/media/cases/case-47-clinical.jpg",
      "dimensions": {
        "width": 792,
        "height": 1220
      },
      "alt": "Clinical photograph of a bare sole held by a hand, with a small dark brown macule in the middle of the sole. No diagnosis is included.",
      "caption": "Clinical photograph of the sole. The source panel letter a is kept. The source label stays hidden until reveal.",
      "source": "Erol Mart HM, Aydemir AT, Pietkiewicz P, Akay BN. International Journal of Dermatology 2026, via PubMed Central (PMC13342755)",
      "sourceUrl": "https://doi.org/10.1111/ijd.70384",
      "creator": "Handan Merve Erol Mart and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Erol Mart and coauthors, International Journal of Dermatology 2026, Figure 1 panel a, doi:10.1111/ijd.70384. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel a of Figure 1 was cropped from the figure image embedded on page 4 of the article PDF in the PMC open-access package PMC13342755.1 (PDF image object 7, 2079 x 1220 pixels), source sha256 90f0e933dd8efb7c40f078d9085afc778358a581d55529e3cc6f9a23ef698141, at pixel box left 0, top 0, right 792, bottom 1220 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 e93fa6a9d5e940419cef57bbf07a4eae9b4e96be831a65fd94ebe7e64aa2d1df. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that written informed consent was obtained from all patients and that consent for publication was submitted to the journal. The article is distributed under CC BY 4.0, with no third-party credit on the figure. The frame shows a sole held by a hand, without a face."
    },
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g27-02b",
      "type": "dermoscopy",
      "src": "assets/media/cases/case-47-dermoscopy.jpg",
      "dimensions": {
        "width": 667,
        "height": 614
      },
      "alt": "Polarized dermoscopic view of a brown acral lesion with thin dotted parallel lines, pale bands between them, and many small dark dots and globules. No diagnosis is included.",
      "caption": "Polarized dermoscopic view of the same lesion, per the source caption. The panel letter b is kept.",
      "source": "Erol Mart HM, Aydemir AT, Pietkiewicz P, Akay BN. International Journal of Dermatology 2026, via PubMed Central (PMC13342755)",
      "sourceUrl": "https://doi.org/10.1111/ijd.70384",
      "creator": "Handan Merve Erol Mart and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Erol Mart and coauthors, International Journal of Dermatology 2026, Figure 1 panel b, doi:10.1111/ijd.70384. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel b of Figure 1 was cropped from the figure image embedded on page 4 of the article PDF in the PMC open-access package PMC13342755.1 (PDF image object 7, 2079 x 1220 pixels), source sha256 90f0e933dd8efb7c40f078d9085afc778358a581d55529e3cc6f9a23ef698141, at pixel box left 797, top 0, right 1464, bottom 614 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 ce47bbab4d3a31f1ae4913c4e5174ab0edc40786d9ee941547e284b8b1683de9. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that written informed consent was obtained from all patients and that consent for publication was submitted to the journal. The article is distributed under CC BY 4.0, with no third-party credit on the figure. The field shows skin only."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Acral melanocytic nevus (clinical follow-up for at least five years stated in the article methods; histopathology not obtained)",
    "confirmationMethod": "clinical_diagnosis",
    "confirmationNotes": "Figure 1 of Erol Mart and coauthors (International Journal of Dermatology 2026, doi:10.1111/ijd.70384), checked 2026-10-02, is titled acral nevus on the left plantar surface. The methods and limitations state that nevi were not confirmed by histopathology: they were included after a stable clinical course of at least five years and dermoscopic features consistent with benign acral patterns. A benign dermoscopic pattern was therefore part of the inclusion rule, so the diagnosis is not independent of the pattern taught here. The authors note a residual risk of misclassification.",
    "confidenceNote": "Study-level follow-up statement, not histopathology. Docutis did not see the patient record. A stable benign label for this lesion does not clear another acral macule."
  },
  "observations": [
    {
      "id": "obs-g27-02a",
      "kind": "observation",
      "modality": "clinical",
      "text": "A hand holds a bare sole. A small dark brown macule sits in the middle of the sole among the skin creases."
    },
    {
      "id": "obs-g27-02b",
      "kind": "observation",
      "modality": "dermoscopy",
      "text": "Brown pigment forms thin parallel dotted lines with pale bands between them, plus many small dark brown dots and globules along the lines and at the edge. The lines are thinner than or as wide as the pale bands. No broad dark bands and no blotch are present. Faint white dots in rows are visible only on the surrounding skin."
    }
  ],
  "interpretations": [
    {
      "id": "int-g27-02a",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g27-02a"
      ],
      "text": "A small dark macule on the sole is a common acral finding and is described before it is named."
    },
    {
      "id": "int-g27-02b",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g27-02a",
        "obs-g27-02b"
      ],
      "text": "The thin dotted lines with pale bands at least as wide favor a furrow-type geometry by width. The source's sub-ultraviolet panel shows pores more clearly, but that panel is not stored here, so the assignment stays probable."
    }
  ],
  "dermoscopicFeatures": [],
  "differentials": [
    {
      "diagnosis": "Acral melanocytic nevus",
      "supportingFeatures": [
        "Thin parallel dotted lines with pale bands at least as wide.",
        "No blotch."
      ],
      "contradictingFeatures": [
        "No histopathology; verification is follow-up stability."
      ],
      "teachingDistinction": "The source label rests on at least five years of stability plus a benign pattern."
    },
    {
      "diagnosis": "Acral melanoma",
      "supportingFeatures": [
        "Many dark dots and globules.",
        "More than one shade of brown."
      ],
      "contradictingFeatures": [
        "No broad ridge-type bands.",
        "No blotch."
      ],
      "teachingDistinction": "Dots and globules alone do not make the pattern malignant; their arrangement along thin lines matters."
    },
    {
      "diagnosis": "Subcorneal haematoma",
      "supportingFeatures": [
        "A dark spot on the sole."
      ],
      "contradictingFeatures": [
        "The colour is brown and organized in lines, not red to maroon and structureless."
      ],
      "teachingDistinction": "Blood colour is read under the dermatoscope."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g27-02a",
      "title": "Notice first",
      "text": "Compare the brown lines with the pale bands, then decide whether the dots sit along the lines or scatter at random."
    },
    {
      "id": "tp-g27-02b",
      "title": "What confirmed it",
      "text": "Stable follow-up for at least five years, not a biopsy. The benign pattern was itself an inclusion criterion, so this label is weaker than histopathology."
    }
  ],
  "observationPrompts": [
    "Are the brown lines thinner or wider than the pale bands?",
    "Do the dark dots follow the lines or scatter at random?"
  ],
  "hints": [
    "White dots on the surrounding skin mark the ridges when you can see them."
  ],
  "closestMimic": {
    "name": "Acral melanoma",
    "whyClosest": "The heel lesion from the same study, photographed with the same device, shows broad bands on the ridges."
  },
  "patterns": [
    {
      "id": "pat-g27-02-furrow",
      "label": "Thin dotted parallel lines with pale bands",
      "modality": "dermoscopy",
      "specificityNote": "Thin dotted brown lines run in parallel with pale bands at least as wide between them, which favors pigment in the furrows. Pores are not resolved inside the lesion in this panel, so the certainty stays probable.",
      "certainty": "probably",
      "weight": "major"
    },
    {
      "id": "pat-g27-02-ridge",
      "label": "Broad parallel pigmented bands",
      "modality": "dermoscopy",
      "specificityNote": "No broad brown bands with thin pale lines are visible.",
      "certainty": "not_visible",
      "weight": "supportive"
    },
    {
      "id": "pat-g27-02-globules",
      "label": "Many small dark dots and globules",
      "modality": "dermoscopy",
      "specificityNote": "Many small dark brown dots and globules sit along the lines and at the edge.",
      "certainty": "clearly_visible",
      "weight": "weak"
    }
  ],
  "synthesis": "The source titles this plantar lesion an acral nevus, verified by at least five years of stability rather than histopathology. The dermoscopic frame shows thin dotted parallel lines with pale bands at least as wide and many small dots, without ridge-type bands or a blotch.",
  "evidenceWeighting": "The furrow-type width geometry is probably visible and is the major clue. The missing ridge bands support it. The dots are clearly visible but weak on their own. The verification is follow-up stability that partly depended on this same pattern, so it is weaker than histopathology.",
  "diagnosticTrap": "Reading many dark dots as a malignant clue without asking whether they follow thin lines, or treating a follow-up label as if it were histopathology.",
  "mentorNote": "This nevus comes from the same study and device as the heel lesion with broad ridge bands. Put the two dermoscopic frames side by side and compare line width.",
  "takeHomeRule": "Thin pigmented lines with pale bands at least as wide are a furrow-type pattern. Keep the verification strength in view: stability is not histopathology.",
  "whyNot": [
    {
      "mimic": "Acral melanoma",
      "text": "The heel lesion from the same study shows broad bands with thin pale lines. Here the lines are thin. That supports the source label in this frame; it is not a rule."
    },
    {
      "mimic": "Subcorneal haematoma",
      "text": "The colour is brown and arranged in lines, not red to maroon and structureless."
    }
  ],
  "compareWith": [
    "cmp-g27-furrow-ridge-same-study"
  ],
  "pairedModality": {
    "clinicalObservation": "A hand holds a bare sole. A small dark brown macule sits in the middle of the sole among the skin creases.",
    "dermoscopicObservation": "Brown pigment forms thin parallel dotted lines with pale bands between them, plus many small dark brown dots and globules along the lines and at the edge. The lines are thinner than or as wide as the pale bands. No broad dark bands and no blotch are present. Faint white dots in rows are visible only on the surrounding skin.",
    "addedValue": "The dermoscopic frame shows the line arrangement and the dots; the clinical frame shows only a small dark macule.",
    "reasoningImpact": "The reading moves from a small dark sole macule to a furrow-type line pattern without a blotch. That supports the source label in this frame.",
    "limits": "The caption names panel a the clinical image and panel b the polarized dermoscopy of one lesion. Verification is follow-up stability, not histopathology. Pores are clearer on the source's sub-ultraviolet panel, which is not stored.",
    "informationGain": "dermoscopy_adds_support",
    "informationGainNote": "Educational label only. The dermoscopic frame adds thin dotted parallel lines with pale bands at least as wide. Not a validated metric and not a probability.",
    "comparison": {
      "clinicalClue": "Small dark macule on the sole.",
      "dermoscopicClue": "Thin dotted parallel lines, pale bands, dots.",
      "addedInformation": "The line geometry is only visible on the dermoscopic frame.",
      "diagnosticConflict": "Many dark dots can look worrying on their own.",
      "teachingRule": "Judge line width before you judge the dots."
    }
  },
  "modalityIntegration": "The first frame is the clinical photograph of a sole with a small dark brown macule. The second frame is the polarized dermoscopic view of the same lesion and shows thin dotted parallel lines with pale bands between them and many small dots.",
  "academy": {
    "level": 3,
    "spectrum": "mimic",
    "teachingType": "teaching",
    "skillIds": [
      "furrow-versus-ridge"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "localization": null,
  "clinicalAction": "After reveal, compare with the heel lesion from the same study. Do not treat from this case.",
  "managementBrief": "No management category is stored. The source history is not a Docutis recommendation. This brief is not a protocol and remains review required.",
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

## case: A large dark patch on the outer heel (`case-g27-03`)

- **Exact fingerprint:** `sha256-v1:7611d0c5555b0b0dc247b81813061d06c2f7af8e63cfd2f9daa08c9682c4deda`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://doi.org/10.3390/dermatopathology9030035
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g27-03",
  "slug": "g27-outer-heel-dark-patch",
  "title": "A large dark patch on the outer heel",
  "diagnosisLabel": "Acral melanoma in situ",
  "diseaseId": "acral-melanoma",
  "category": "Melanoma",
  "educationalLevel": "intermediate",
  "caseType": "clinical_dermoscopic",
  "patientContext": {
    "ageBand": "68 years, per the figure caption",
    "sex": "Female, per the figure caption",
    "anatomicalSite": "Outer heel, plantar sole",
    "presentationNotes": "The source figure describes a large irregular black patch on the outer area of the heel. No history of change is given."
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g27-03a",
      "type": "clinical",
      "src": "assets/media/cases/case-48-clinical.jpg",
      "dimensions": {
        "width": 457,
        "height": 323
      },
      "alt": "Clinical photograph of a heel with a large dark brown to black patch with an uneven outline. A thin straight line from the source figure crosses the frame. No diagnosis is included.",
      "caption": "Clinical photograph of the heel. The source panel letter A is kept. The thin straight line is in the source figure. The source label stays hidden until reveal.",
      "source": "Park S, Yun SJ. Dermatopathology 2022, via PubMed Central (PMC9397077)",
      "sourceUrl": "https://doi.org/10.3390/dermatopathology9030035",
      "creator": "Sanghyun Park and Sook Jung Yun",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Park and Yun, Dermatopathology 2022, Figure 5 panel A, doi:10.3390/dermatopathology9030035. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel A of Figure 5 was cropped from the figure image embedded on page 6 of the article PDF in the PMC open-access package PMC9397077.1 (PDF image object 147, 961 x 704 pixels), source sha256 072fcd94c832e00dd3d710218754b892be37c9baffed4d290f92ce77de9a7aa6, at pixel box left 12, top 11, right 469, bottom 334 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 2308ceba04a7b7b4a105142de93ee4d7b1cef5f5e91a0714a971b4f997a3bc6a. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that written informed consent was obtained from the patients to publish the paper. The article is distributed under CC BY 4.0, with no third-party credit on the figure. The frame shows a heel only."
    },
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g27-03b",
      "type": "dermoscopy",
      "src": "assets/media/cases/case-48-dermoscopy.jpg",
      "dimensions": {
        "width": 467,
        "height": 323
      },
      "alt": "Dermoscopic view of acral skin with thin white scale lines and brown pigment in the broad bands between them, a printed millimetre scale, and a thin straight line across the frame. No diagnosis is included.",
      "caption": "Dermoscopic view of the same lesion, per the source caption. The panel letter B is kept. The thin straight line is in the source figure.",
      "source": "Park S, Yun SJ. Dermatopathology 2022, via PubMed Central (PMC9397077)",
      "sourceUrl": "https://doi.org/10.3390/dermatopathology9030035",
      "creator": "Sanghyun Park and Sook Jung Yun",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Park and Yun, Dermatopathology 2022, Figure 5 panel B, doi:10.3390/dermatopathology9030035. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel B of Figure 5 was cropped from the figure image embedded on page 6 of the article PDF in the PMC open-access package PMC9397077.1 (PDF image object 147, 961 x 704 pixels), source sha256 072fcd94c832e00dd3d710218754b892be37c9baffed4d290f92ce77de9a7aa6, at pixel box left 479, top 11, right 946, bottom 334 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 163477d47bc1a2ee5da729a2bc00ebe5bd20a58f3f3407bd05c02292ff440544. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that written informed consent was obtained from the patients to publish the paper. The article is distributed under CC BY 4.0, with no third-party credit on the figure. The circular field shows skin only."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Acral melanoma in situ (histopathology stated in the figure caption)",
    "confirmationMethod": "histopathology",
    "histopathologySource": "figure_caption",
    "confirmationNotes": "The Figure 5 caption of Park and Yun (Dermatopathology 2022, doi:10.3390/dermatopathology9030035), checked 2026-10-02, describes one acral melanoma in situ in a 68-year-old woman with the clinical image (A), dermoscopy (B), a skin biopsy (C), and Melan-A immunostaining of a lentiginous proliferation of atypical melanocytes (D). The histopathology panels were not stored. The caption does not give a biopsy date relative to the photographs.",
    "confidenceNote": "Lesion-specific histopathology in the figure caption. Docutis did not see a slide. The caption calls the dermoscopic pattern a parallel ridge pattern; Docutis encoded it from the scale lines and band widths and kept it probable."
  },
  "observations": [
    {
      "id": "obs-g27-03a",
      "kind": "observation",
      "modality": "clinical",
      "text": "A large dark brown to black patch with an uneven outline sits on the outer heel. Its colour is darker in some parts than others."
    },
    {
      "id": "obs-g27-03b",
      "kind": "observation",
      "modality": "dermoscopy",
      "text": "Thin white scale lines run in parallel across the field. The brown pigment fills the broad bands between those white lines, darker in some zones and lighter in others. A printed millimetre scale is at the lower edge. A thin straight horizontal line crosses the frame."
    }
  ],
  "interpretations": [
    {
      "id": "int-g27-03a",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g27-03a"
      ],
      "text": "A large dark acral patch with an uneven outline and uneven colour is a high-concern clinical look, described before it is named."
    },
    {
      "id": "int-g27-03b",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g27-03a",
        "obs-g27-03b"
      ],
      "text": "White scale collects in the furrows, so the thin white lines mark the furrows. The brown pigment fills the broad bands between them, which favors pigment on the ridges. Pores are not resolved, so the ridge assignment stays probable."
    }
  ],
  "dermoscopicFeatures": [],
  "differentials": [
    {
      "diagnosis": "Acral melanoma in situ",
      "supportingFeatures": [
        "Brown pigment in broad bands between thin white furrow lines.",
        "Large patch with uneven colour."
      ],
      "contradictingFeatures": [],
      "teachingDistinction": "The figure caption gives a lesion-specific histopathology result."
    },
    {
      "diagnosis": "Acral melanocytic nevus",
      "supportingFeatures": [
        "Flat brown pigment in parallel lines on the sole."
      ],
      "contradictingFeatures": [
        "The pigment fills the broad bands, not thin lines.",
        "Large size and uneven colour."
      ],
      "teachingDistinction": "A typical acral nevus places thin pigmented lines in the furrows."
    },
    {
      "diagnosis": "Subcorneal haematoma",
      "supportingFeatures": [
        "A dark patch on the heel."
      ],
      "contradictingFeatures": [
        "The colour is brown and banded, not red to maroon and structureless."
      ],
      "teachingDistinction": "Blood can follow ridges too, so colour is read first."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g27-03a",
      "title": "Notice first",
      "text": "Find the thin white scale lines first. They sit in the furrows. Then ask whether the brown pigment sits in those lines or in the broad bands between them."
    },
    {
      "id": "tp-g27-03b",
      "title": "Ignore the print",
      "text": "The millimetre scale and the thin straight line come from the source figure. Neither is skin."
    }
  ],
  "observationPrompts": [
    "Where does the white scale sit, and where does the brown pigment sit?",
    "Are the brown bands broader or thinner than the pale lines?"
  ],
  "hints": [
    "Scale collects in the furrows of acral skin."
  ],
  "closestMimic": {
    "name": "Acral melanocytic nevus",
    "whyClosest": "Parallel brown lines on the sole are a common benign look. The difference is where the pigment sits."
  },
  "patterns": [
    {
      "id": "pat-g27-03-ridge",
      "label": "Brown pigment in broad bands between white furrow lines",
      "modality": "dermoscopy",
      "specificityNote": "Thin white scale lines mark the furrows and the brown pigment fills the broad bands between them, which favors pigment on the ridges. Pores are not resolved, so the certainty stays probable.",
      "certainty": "probably",
      "weight": "major"
    },
    {
      "id": "pat-g27-03-furrow",
      "label": "Thin pigmented lines with broader pale bands",
      "modality": "dermoscopy",
      "specificityNote": "The thin lines in this frame are white scale, not brown pigment. Thin brown furrow lines are not visible.",
      "certainty": "not_visible",
      "weight": "supportive"
    },
    {
      "id": "pat-g27-03-uneven",
      "label": "Uneven brown with darker zones",
      "modality": "dermoscopy",
      "specificityNote": "The brown is darker in some zones and lighter in others, without a regular arrangement of shades.",
      "certainty": "probably",
      "weight": "supportive"
    },
    {
      "id": "pat-g27-03-patch",
      "label": "Large dark patch with an uneven outline",
      "modality": "clinical",
      "specificityNote": "A large dark brown to black patch with an uneven outline and uneven colour.",
      "certainty": "clearly_visible",
      "weight": "supportive"
    },
    {
      "id": "pat-g27-03-scale",
      "label": "Printed millimetre scale",
      "modality": "none",
      "specificityNote": "A printed scale lies at the lower edge of the dermoscopic field. It is not skin.",
      "certainty": "clearly_visible",
      "weight": "conflicting"
    },
    {
      "id": "pat-g27-03-line",
      "label": "Thin straight line across the figure",
      "modality": "none",
      "specificityNote": "A thin straight horizontal line crosses both source panels at the same height. It is part of the source figure, not skin.",
      "certainty": "clearly_visible",
      "weight": "conflicting"
    }
  ],
  "synthesis": "The source figure gives a lesion-specific histopathology result of melanoma in situ for this outer-heel patch. The dermoscopic frame shows brown pigment in broad bands between thin white furrow lines, a ridge-type geometry.",
  "evidenceWeighting": "The ridge-type placement is probably visible and is the major clue. The uneven brown and the large uneven patch support concern. The scale and the straight line conflict only if read as skin. The figure-caption histopathology is the confirmation.",
  "diagnosticTrap": "Mistaking the white scale lines for the pigment pattern, or calling ridge versus furrow from the diagnosis rather than from where the pigment sits.",
  "mentorNote": "This is the second independent parallel ridge example in Docutis, in another patient and another source. Here the white scale in the furrows does the work that pores do elsewhere.",
  "takeHomeRule": "On the sole, find a furrow marker first, scale or pores. Brown pigment in the broad bands between furrows is a ridge-type pattern and needs a melanoma differential.",
  "whyNot": [
    {
      "mimic": "Acral melanocytic nevus",
      "text": "The brown fills the broad bands between the white furrow lines rather than sitting in thin lines. That raises concern; it is not proof on its own."
    },
    {
      "mimic": "Subcorneal haematoma",
      "text": "The colour is brown in bands, not red to maroon and structureless."
    }
  ],
  "compareWith": [
    "cmp-g27-furrow-ridge-histology"
  ],
  "pairedModality": {
    "clinicalObservation": "A large dark brown to black patch with an uneven outline sits on the outer heel. Its colour is darker in some parts than others.",
    "dermoscopicObservation": "Thin white scale lines run in parallel across the field. The brown pigment fills the broad bands between those white lines, darker in some zones and lighter in others. A printed millimetre scale is at the lower edge. A thin straight horizontal line crosses the frame.",
    "addedValue": "The dermoscopic frame shows where the pigment sits relative to the furrows; the clinical frame shows only a large dark patch.",
    "reasoningImpact": "The reading moves from a large irregular heel patch to a ridge-type pigment placement. That keeps a malignant melanocytic lesion high in the differential.",
    "limits": "The caption describes panels A to D as one lesion. Histopathology panels were not stored. Pores are not resolved. A thin straight line from the source figure crosses both frames.",
    "informationGain": "dermoscopy_adds_support",
    "informationGainNote": "Educational label only. The dermoscopic frame adds brown pigment in broad bands between white furrow lines. Not a validated metric and not a probability.",
    "comparison": {
      "clinicalClue": "Large dark uneven patch on the outer heel.",
      "dermoscopicClue": "Brown in broad bands between white furrow lines.",
      "addedInformation": "Pigment placement relative to the furrows is only visible on the dermoscopic frame.",
      "diagnosticConflict": null,
      "teachingRule": "Find the furrows first, then place the pigment."
    }
  },
  "modalityIntegration": "The first frame is the clinical photograph of a large dark patch on the outer heel. The second frame is the dermoscopic view of the same lesion and shows brown pigment in broad bands between thin white furrow lines.",
  "academy": {
    "level": 3,
    "spectrum": "melanoma",
    "teachingType": "teaching",
    "skillIds": [
      "furrow-versus-ridge",
      "acral-pigment"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "localization": null,
  "clinicalAction": "After reveal, open the linked Docutis acral melanoma record for reference context. Do not treat from this case.",
  "managementBrief": "No management category is stored. The source history is not a Docutis recommendation. This brief is not a protocol and remains review required.",
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

## case: A brown oval patch at the base of a finger (`case-g27-04`)

- **Exact fingerprint:** `sha256-v1:56903bf1f4707b2ab9cb339a509b5cf8d8bce5e9cdb2ed77bd896852350a2830`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://doi.org/10.1016/j.jdcr.2024.09.025
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g27-04",
  "slug": "g27-palm-crease-oval-patch",
  "title": "A brown oval patch at the base of a finger",
  "diagnosisLabel": "Acral lentiginous melanoma in situ",
  "diseaseId": "acral-melanoma",
  "category": "Melanoma",
  "educationalLevel": "advanced",
  "caseType": "clinical_dermoscopic",
  "patientContext": {
    "ageBand": "47 years, per the source case text",
    "sex": "Female, per the source case text",
    "anatomicalSite": "Palmar crease of the left fifth digit, palm side",
    "presentationNotes": "The source reports a palm discoloration present for several years with recent enlargement and darkening, in a patient with Fitzpatrick type V skin. Enlargement and darkening are the source's history; one frame cannot show them."
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g27-04a",
      "type": "clinical",
      "src": "assets/media/cases/case-49-clinical.jpg",
      "dimensions": {
        "width": 707,
        "height": 999
      },
      "alt": "Clinical close-up of the palm side of a hand with a small oval patch of several browns at the base of the little finger. No diagnosis is included.",
      "caption": "Clinical close-up. The source panel letter B is kept. The source label stays hidden until reveal.",
      "source": "Money SM, Davis LS, Rabinovitz HS, Powell MR, Buchanan KL. JAAD Case Reports 2024, via PubMed Central (PMC11626072)",
      "sourceUrl": "https://doi.org/10.1016/j.jdcr.2024.09.025",
      "creator": "Silas M Money and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Money and coauthors, JAAD Case Reports 2024, Figure 1 panel B, doi:10.1016/j.jdcr.2024.09.025. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel B of Figure 1 was cropped from the figure image embedded on page 2 of the article PDF in the PMC open-access package PMC11626072.1 (PDF image object 6, 1495 x 1006 pixels), source sha256 dc0d25f7d6d4cfbaf9c9150cfbccc5db57063a73d0f444fb7df59a1a361f2ee0, at pixel box left 783, top 3, right 1490, bottom 1002 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 f3b27e253a8661397a4bfee02d3c9871481d89aef45ed8425de248493e818c6b. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that the authors obtained written consent from the patient for publication of photographs and medical information. The article is distributed under CC BY 4.0, with no third-party credit on the figures. The frame shows a palm and fingers in front of patterned fabric, without a face."
    },
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g27-04b",
      "type": "dermoscopy",
      "src": "assets/media/cases/case-49-dermoscopy.jpg",
      "dimensions": {
        "width": 744,
        "height": 746
      },
      "alt": "Polarized dermoscopic view of palm skin with broad pale ridges carrying white pore dots, thin brown lines between them, a darker eccentric blotch, printed arrows, and a printed scale. No diagnosis is included.",
      "caption": "Polarized dermoscopic view of the same lesion, per the source. The panel letter A and the printed arrows are kept.",
      "source": "Money SM, Davis LS, Rabinovitz HS, Powell MR, Buchanan KL. JAAD Case Reports 2024, via PubMed Central (PMC11626072)",
      "sourceUrl": "https://doi.org/10.1016/j.jdcr.2024.09.025",
      "creator": "Silas M Money and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Money and coauthors, JAAD Case Reports 2024, Figure 2 panel A, doi:10.1016/j.jdcr.2024.09.025. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel A of Figure 2 was cropped from the figure image embedded on page 2 of the article PDF in the PMC open-access package PMC11626072.1 (PDF image object 7, 1495 x 746 pixels), source sha256 04613e3fe5ad0999e067db7f75a369314a1615505e4481932bb51080655986d3, at pixel box left 0, top 0, right 744, bottom 746 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 3339d6ff385ea7dd40bd12f875c178ed29ab27e341b7b244fa0cec6e71ea1770. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that the authors obtained written consent from the patient for publication of photographs and medical information. The article is distributed under CC BY 4.0, with no third-party credit on the figures. The circular field shows skin only."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Acral lentiginous melanoma in situ (histopathology stated in the case text)",
    "confirmationMethod": "histopathology",
    "histopathologySource": "case_text",
    "confirmationNotes": "Money and coauthors (JAAD Case Reports 2024, doi:10.1016/j.jdcr.2024.09.025), checked 2026-10-02, report that histopathologic examination showed increased single atypical melanocytes with prominent dendrites and increased mitoses, confirming acral lentiginous melanoma in situ, in a single-lesion case report. The histopathology figures were not stored.",
    "confidenceNote": "Lesion-specific histopathology in the case text. Docutis did not see a slide. The source names a diffuse parallel furrow pattern; Docutis confirmed it from the pores on the ridges in this frame."
  },
  "observations": [
    {
      "id": "obs-g27-04a",
      "kind": "observation",
      "modality": "clinical",
      "text": "A small oval patch of several browns, darker at one end, sits at the base of the little finger on the palm side, along a crease."
    },
    {
      "id": "obs-g27-04b",
      "kind": "observation",
      "modality": "dermoscopy",
      "text": "Broad pale ridges with rows of small white pore dots run in parallel. Thin brown lines lie between the ridges across most of the lesion. Toward the top, a darker eccentric blotch with criss-crossing lines sits on several shades of brown. Printed red and black arrows and a printed scale with text are in the field."
    }
  ],
  "interpretations": [
    {
      "id": "int-g27-04a",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g27-04a"
      ],
      "text": "A palm patch of several browns with one darker end is described before it is named."
    },
    {
      "id": "int-g27-04b",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g27-04a",
        "obs-g27-04b"
      ],
      "text": "White pore dots sit on the broad pale ridges, so the thin brown lines between them are in the furrows: a furrow pattern with resolved anatomy. The eccentric blotch and several browns do not fit an orderly furrow pattern."
    }
  ],
  "dermoscopicFeatures": [],
  "differentials": [
    {
      "diagnosis": "Acral lentiginous melanoma in situ",
      "supportingFeatures": [
        "Eccentric blotch.",
        "Several shades of brown.",
        "Recent enlargement and darkening in the source history."
      ],
      "contradictingFeatures": [
        "Most of the lesion shows a furrow pattern."
      ],
      "teachingDistinction": "The case text gives a lesion-specific histopathology result."
    },
    {
      "diagnosis": "Acral melanocytic nevus",
      "supportingFeatures": [
        "Thin brown lines in the furrows, with pores on the ridges."
      ],
      "contradictingFeatures": [
        "Eccentric dark blotch.",
        "Several shades of brown in one lesion."
      ],
      "teachingDistinction": "A furrow pattern is the most common benign acral pattern and still does not outrank a blotch and colour variation."
    },
    {
      "diagnosis": "Acral lentigo",
      "supportingFeatures": [
        "Flat brown palm pigment."
      ],
      "contradictingFeatures": [
        "Eccentric blotch with criss-crossing lines."
      ],
      "teachingDistinction": "Uniform flat pigment would weigh differently from a multicomponent pattern."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g27-04a",
      "title": "Notice first",
      "text": "Find the white pore dots. They sit on the ridges here, so the brown lines are in the furrows. Then look at the rest of the lesion: the blotch and the shades of brown."
    },
    {
      "id": "tp-g27-04b",
      "title": "What the source says",
      "text": "The case text gives histopathology of melanoma in situ. A furrow pattern did not prevent that diagnosis."
    }
  ],
  "observationPrompts": [
    "Where are the white pore dots, and where are the brown lines?",
    "Is any part of the lesion darker and less orderly than the rest?"
  ],
  "hints": [
    "The arrows and the scale are printed on the source image."
  ],
  "closestMimic": {
    "name": "Acral melanocytic nevus",
    "whyClosest": "A diffuse furrow pattern is the usual look of a benign acral nevus."
  },
  "patterns": [
    {
      "id": "pat-g27-04-furrow",
      "label": "Thin brown lines in the furrows, pores on the ridges",
      "modality": "dermoscopy",
      "specificityNote": "White pore dots sit in rows on the broad pale ridges, and thin brown lines lie between them across most of the lesion. Ridge and furrow positions are resolved by the pores.",
      "certainty": "clearly_visible",
      "weight": "conflicting"
    },
    {
      "id": "pat-g27-04-ridge",
      "label": "Broad parallel pigmented bands",
      "modality": "dermoscopy",
      "specificityNote": "No broad brown bands on the ridges are visible; the ridges are pale.",
      "certainty": "not_visible",
      "weight": "conflicting"
    },
    {
      "id": "pat-g27-04-blotch",
      "label": "Eccentric blotch on several browns",
      "modality": "dermoscopy",
      "specificityNote": "A darker eccentric blotch with criss-crossing lines sits at one end, on several shades of brown.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g27-04-arrows",
      "label": "Printed arrows in the dermoscopic field",
      "modality": "none",
      "specificityNote": "Red and black arrows are printed on the source image. They are marks, not skin.",
      "certainty": "clearly_visible",
      "weight": "conflicting"
    },
    {
      "id": "pat-g27-04-scale",
      "label": "Printed scale with text",
      "modality": "none",
      "specificityNote": "A printed millimetre scale with a device name lies across the lower field. It is not skin.",
      "certainty": "clearly_visible",
      "weight": "conflicting"
    }
  ],
  "synthesis": "The case text gives histopathology of acral lentiginous melanoma in situ for this palm patch. The dermoscopic frame shows a furrow pattern with pores on the ridges across most of the lesion, plus an eccentric blotch on several shades of brown.",
  "evidenceWeighting": "The furrow pattern is clearly visible and points the wrong way: it conflicts with the final diagnosis. The eccentric blotch and several browns are clearly visible and carry the concern. The case-text histopathology is the confirmation.",
  "diagnosticTrap": "Stopping at a furrow pattern and calling the lesion benign without weighing the blotch, the colours, and the reported enlargement.",
  "mentorNote": "This frame shows that a furrow pattern is a weighted clue, not a clearance. Compare it with the benign sole cluster: the same line placement, different company.",
  "takeHomeRule": "A parallel furrow pattern is the commonest benign acral pattern, not a guarantee. An eccentric blotch, several browns, or reported change still need a melanoma differential.",
  "whyNot": [
    {
      "mimic": "Acral melanocytic nevus",
      "text": "The furrow pattern fits a nevus, but an eccentric blotch on several browns does not belong to an orderly furrow pattern, and the source reports recent enlargement."
    },
    {
      "mimic": "Acral lentigo",
      "text": "The pigment is not uniform; a blotch with criss-crossing lines sits at one end."
    }
  ],
  "compareWith": [
    "cmp-g27-furrow-both-poles"
  ],
  "pairedModality": {
    "clinicalObservation": "A small oval patch of several browns, darker at one end, sits at the base of the little finger on the palm side, along a crease.",
    "dermoscopicObservation": "Broad pale ridges with rows of small white pore dots run in parallel. Thin brown lines lie between the ridges across most of the lesion. Toward the top, a darker eccentric blotch with criss-crossing lines sits on several shades of brown. Printed red and black arrows and a printed scale with text are in the field.",
    "addedValue": "The dermoscopic frame resolves the pores, the furrow lines, and the blotch; the clinical frame shows an oval patch of several browns.",
    "reasoningImpact": "The reading moves from a palm patch of several browns to a furrow pattern with a separate eccentric blotch. The blotch keeps a malignant melanocytic lesion high in the differential despite the furrow pattern.",
    "limits": "This single-lesion case report shows the clinical and dermoscopic frames of the one palm lesion. Printed arrows and a scale are in the field. The enlargement is history, not visible in one frame.",
    "informationGain": "dermoscopy_changes_leading_differential",
    "informationGainNote": "Educational label only. Dermoscopy shows a furrow pattern that could reassure and a blotch that keeps concern; the leading reading depends on the blotch. Not a validated metric and not a probability.",
    "comparison": {
      "clinicalClue": "Oval palm patch of several browns, darker at one end.",
      "dermoscopicClue": "Furrow lines with pores on ridges, plus an eccentric blotch.",
      "addedInformation": "The pores, the furrow lines, and the blotch structure are only visible on the dermoscopic frame.",
      "diagnosticConflict": "The furrow pattern is usually a benign clue.",
      "teachingRule": "Weigh the whole lesion, not the commonest pattern in it."
    }
  },
  "modalityIntegration": "The first frame is the clinical close-up of a small oval patch of several browns at the base of the little finger. The second frame is the polarized dermoscopic view of the same lesion and shows thin brown lines between pale ridges with pore dots, plus a darker eccentric blotch.",
  "academy": {
    "level": 5,
    "spectrum": "melanoma",
    "teachingType": "expert-challenge",
    "skillIds": [
      "furrow-versus-ridge",
      "evidence-weighting"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "localization": null,
  "clinicalAction": "After reveal, compare with the benign sole cluster and open the linked Docutis acral melanoma record for reference context. Do not treat from this case.",
  "managementBrief": "No management category is stored. The source history is not a Docutis recommendation. This brief is not a protocol and remains review required.",
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

## case: A narrow brown band in an adult's fingernail (`case-g27-05`)

- **Exact fingerprint:** `sha256-v1:f23b3362a3be18a93d1c3a1852f3e5ffbfc363794571fa16336e63eef925d229`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://doi.org/10.3390/dermatopathology9030035
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g27-05",
  "slug": "g27-adult-fingernail-narrow-band",
  "title": "A narrow brown band in an adult's fingernail",
  "diagnosisLabel": "Nail matrix nevus",
  "diseaseId": "melanocytic-nevus",
  "category": "Benign melanocytic",
  "educationalLevel": "intermediate",
  "caseType": "clinical_dermoscopic",
  "patientContext": {
    "ageBand": "28 years, per the figure caption",
    "sex": "Female, per the figure caption",
    "anatomicalSite": "Fingernail, nail unit",
    "presentationNotes": "The source figure describes a brownish linear melanonychia in a 28-year-old woman. The caption does not say which finger. Duration and change are not given."
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g27-05a",
      "type": "clinical",
      "src": "assets/media/cases/case-50-clinical.jpg",
      "dimensions": {
        "width": 342,
        "height": 529
      },
      "alt": "Clinical photograph of an adult fingertip with a narrow, even light-brown band along the whole nail. No diagnosis is included.",
      "caption": "Clinical photograph. The source panel letter A is kept. The source label stays hidden until reveal.",
      "source": "Park S, Yun SJ. Dermatopathology 2022, via PubMed Central (PMC9397077)",
      "sourceUrl": "https://doi.org/10.3390/dermatopathology9030035",
      "creator": "Sanghyun Park and Sook Jung Yun",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Park and Yun, Dermatopathology 2022, Figure 2 panel A, doi:10.3390/dermatopathology9030035. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel A of Figure 2 was cropped from the figure image embedded on page 3 of the article PDF in the PMC open-access package PMC9397077.1 (PDF image object 78, 1599 x 564 pixels), source sha256 39a56cb79357ebd92d77fa05d771ea61baa79971fb57379633d859612dff724c, at pixel box left 18, top 17, right 360, bottom 546 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 6203f5c6b0880038ec5ded15f4c7163d10d3afaf5467823a5ce8d7fd54738e97. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that written informed consent was obtained from the patients to publish the paper. The article is distributed under CC BY 4.0, with no third-party credit on the figure. The frame shows a fingertip against a blue background only."
    },
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g27-05b",
      "type": "dermoscopy",
      "src": "assets/media/cases/case-50-dermoscopy.jpg",
      "dimensions": {
        "width": 499,
        "height": 529
      },
      "alt": "Dermoscopic view of a nail plate with a narrow light-brown band of thin parallel lines of similar colour, thickness, and spacing. No diagnosis is included.",
      "caption": "Dermoscopic view of the same band, per the source caption. The panel letter B is kept.",
      "source": "Park S, Yun SJ. Dermatopathology 2022, via PubMed Central (PMC9397077)",
      "sourceUrl": "https://doi.org/10.3390/dermatopathology9030035",
      "creator": "Sanghyun Park and Sook Jung Yun",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Park and Yun, Dermatopathology 2022, Figure 2 panel B, doi:10.3390/dermatopathology9030035. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel B of Figure 2 was cropped from the figure image embedded on page 3 of the article PDF in the PMC open-access package PMC9397077.1 (PDF image object 78, 1599 x 564 pixels), source sha256 39a56cb79357ebd92d77fa05d771ea61baa79971fb57379633d859612dff724c, at pixel box left 370, top 17, right 869, bottom 546 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 24d499baa114e204b1e1f911fdb5b15daea09800acaf647d8bed692845b2e3a9. No color change, no annotation, and no other edit.",
      "consentBasis": "The article states that written informed consent was obtained from the patients to publish the paper. The article is distributed under CC BY 4.0, with no third-party credit on the figure. The field shows the nail plate only."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Nail matrix nevus (histopathology stated in the figure caption)",
    "confirmationMethod": "histopathology",
    "histopathologySource": "figure_caption",
    "confirmationNotes": "The Figure 2 caption of Park and Yun (Dermatopathology 2022, doi:10.3390/dermatopathology9030035), checked 2026-10-02, describes a nail matrix nevus in a 28-year-old woman with the clinical band (A), regular lines on dermoscopy (B), and junctional nests in the epidermis of the nail matrix on histopathology (C). The histopathology panel was not stored. The caption does not give a biopsy date relative to the photographs.",
    "confidenceNote": "Lesion-specific histopathology in the figure caption. Docutis did not see a slide. A benign result in this adult band does not clear another band, and regular lines are not a guarantee."
  },
  "observations": [
    {
      "id": "obs-g27-05a",
      "kind": "observation",
      "modality": "clinical",
      "text": "A fingernail of an adult with a narrow, even, light-brown band running the full length of the plate. The band edges are sharp. The plate surface and the skin around the nail look normal."
    },
    {
      "id": "obs-g27-05b",
      "kind": "observation",
      "modality": "dermoscopy",
      "text": "A narrow light-brown band made of thin brown parallel lines of similar colour and thickness, evenly spaced, on a light-brown background. The lines stay parallel along the band and the edges are sharp. The plate surface is intact. The periphery of the field is out of focus."
    }
  ],
  "interpretations": [
    {
      "id": "int-g27-05a",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g27-05a"
      ],
      "text": "A narrow pigmented band in an adult's nail is described before it is named; age makes a nail band a question to answer, not a finding to dismiss."
    },
    {
      "id": "int-g27-05b",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g27-05a",
        "obs-g27-05b"
      ],
      "text": "The lines match in colour and thickness, stay evenly spaced and parallel, and sit on a light background in a narrow band on an intact plate. No pigment is visible on the fold skin."
    }
  ],
  "dermoscopicFeatures": [],
  "differentials": [
    {
      "diagnosis": "Nail matrix nevus",
      "supportingFeatures": [
        "Regular thin parallel lines of one colour.",
        "Narrow band with sharp edges on an intact plate."
      ],
      "contradictingFeatures": [],
      "teachingDistinction": "The figure caption gives matrix histopathology for this band."
    },
    {
      "diagnosis": "Nail-unit melanoma",
      "supportingFeatures": [
        "A pigmented band in an adult."
      ],
      "contradictingFeatures": [
        "Regular lines.",
        "Narrow band.",
        "Intact plate.",
        "No visible fold pigment."
      ],
      "teachingDistinction": "Adult bands are weighed carefully; this frame shows regular architecture."
    },
    {
      "diagnosis": "Melanocytic activation",
      "supportingFeatures": [
        "A light-brown band."
      ],
      "contradictingFeatures": [
        "Distinct brown lines rather than a grey homogeneous background."
      ],
      "teachingDistinction": "Activation usually shows grey background with thin grey lines."
    },
    {
      "diagnosis": "Subungual haemorrhage",
      "supportingFeatures": [
        "Colour in the nail."
      ],
      "contradictingFeatures": [
        "Brown longitudinal lines, not red-black spots or a rounded blot."
      ],
      "teachingDistinction": "Blood does not form a band of regular lines."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g27-05a",
      "title": "Notice first",
      "text": "Name the age, then the band: width, colour, line thickness, spacing, parallelism, edges, plate surface, and the fold skin."
    },
    {
      "id": "tp-g27-05b",
      "title": "Read the age",
      "text": "The childhood bands in Docutis show irregular lines and were benign. This adult band is regular and benign. The same clue carries different weight at different ages."
    }
  ],
  "observationPrompts": [
    "Do the lines match in colour, thickness, and spacing?",
    "Is the plate surface intact, and is any pigment visible on the skin around the nail?"
  ],
  "hints": [
    "Name the patient's age before you weigh the lines."
  ],
  "closestMimic": {
    "name": "Nail-unit melanoma",
    "whyClosest": "Any pigmented nail band in an adult raises the question."
  },
  "patterns": [
    {
      "id": "pat-g27-05-lines",
      "label": "Regular thin lines in a narrow band",
      "modality": "dermoscopy",
      "specificityNote": "Thin brown longitudinal lines of similar colour and thickness, evenly spaced and parallel, on a light-brown background.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g27-05-plate",
      "label": "Broken or missing nail plate",
      "modality": "dermoscopy",
      "specificityNote": "The plate surface is intact. No break, split, or debris is visible.",
      "certainty": "not_visible",
      "weight": "supportive"
    },
    {
      "id": "pat-g27-05-fold",
      "label": "Pigment on the fold skin around the nail",
      "modality": "clinical",
      "specificityNote": "No pigment is visible on the proximal fold or the skin at the tip. Absence in one frame is not a clearance.",
      "certainty": "not_visible",
      "weight": "supportive"
    }
  ],
  "synthesis": "The figure caption gives nail matrix histopathology for this adult band. The dermoscopic frame shows a narrow band of regular thin parallel lines of one colour on an intact plate, with no visible fold pigment.",
  "evidenceWeighting": "Regular line architecture is clearly visible and is the major clue. The intact plate and the absent fold pigment support it, but absence in one frame is weaker than presence. The figure-caption histopathology is the confirmation.",
  "diagnosticTrap": "Treating regular lines as a guarantee, or carrying the irregular-but-benign childhood rule into an adult band.",
  "mentorNote": "This is the first adult benign nail band in Docutis. Put it beside the childhood bands with irregular lines and beside the adult toenail with irregular bands and a split plate.",
  "takeHomeRule": "In an adult, a narrow band of regular lines on an intact plate supports a benign reading in this frame. Age changes how the same line clue is weighed, and the decision stays individual.",
  "whyNot": [
    {
      "mimic": "Nail-unit melanoma",
      "text": "The adult toenail case shows bands of differing width and colour with a split plate. Here the lines are regular and the plate is intact. That supports the source diagnosis; it is not a rule."
    },
    {
      "mimic": "Subungual haemorrhage",
      "text": "Blood forms a rounded blot with red-black globules, not a band of regular lines."
    }
  ],
  "compareWith": [
    "cmp-g27-nail-adult-regular-irregular",
    "cmp-g27-nail-age-context"
  ],
  "pairedModality": {
    "clinicalObservation": "A fingernail of an adult with a narrow, even, light-brown band running the full length of the plate. The band edges are sharp. The plate surface and the skin around the nail look normal.",
    "dermoscopicObservation": "A narrow light-brown band made of thin brown parallel lines of similar colour and thickness, evenly spaced, on a light-brown background. The lines stay parallel along the band and the edges are sharp. The plate surface is intact. The periphery of the field is out of focus.",
    "addedValue": "The dermoscopic frame resolves the individual lines and their regularity; clinically the band looks only even and brown.",
    "reasoningImpact": "The reading moves from an adult nail band to a band of regular lines on an intact plate. That supports a benign reading in this frame.",
    "limits": "The caption describes panels A to C as one nail. The histopathology panel was not stored. The edges of the dermoscopic field are out of focus.",
    "informationGain": "dermoscopy_adds_support",
    "informationGainNote": "Educational label only. The dermoscopic frame resolves regular thin lines of one colour. Not a validated metric and not a probability.",
    "comparison": {
      "clinicalClue": "Narrow even brown band in an adult fingernail.",
      "dermoscopicClue": "Regular thin parallel lines, one colour, intact plate.",
      "addedInformation": "Line regularity is only visible on the dermoscopic frame.",
      "diagnosticConflict": "Any adult nail band raises the question of a malignant cause.",
      "teachingRule": "In adults, describe line regularity and plate integrity before you weigh a band."
    }
  },
  "modalityIntegration": "The first frame is the clinical photograph of an adult fingernail with a narrow light-brown band. The second frame is the dermoscopic view of the same band and shows regular thin parallel lines of one colour on an intact plate.",
  "academy": {
    "level": 3,
    "spectrum": "mimic",
    "teachingType": "teaching",
    "skillIds": [
      "nail-band",
      "nail-band-age-context"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "localization": null,
  "clinicalAction": "After reveal, compare with the adult great-toenail case and with the childhood nail bands. Do not treat from this case.",
  "managementBrief": "No management category is stored. The source history is not a Docutis recommendation. This brief is not a protocol and remains review required.",
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

## case: A dark blot under a nail (`case-g27-06`)

- **Exact fingerprint:** `sha256-v1:e556c82ed133b42fb763bb57190e661554540a5cf0b90814808340f72b68cb47`
- **Schema version:** 1
- **Reviewable sections:** `images`, `observations`, `interpretations`, `dermoscopic-features`, `differentials`, `diagnostic-ground-truth`, `teaching-points`, `safety-notice`, `provenance`
- **Mapped evidence sources:**
  - https://doi.org/10.1016/j.abd.2024.01.005
- **Automated warnings:**
  - Confirm image provenance/license, observations vs interpretations separation, differentials, diagnostic confirmation method honesty, and that AI interpretation is not treated as clinician review.
  - Automated source attachment and schema validation are not evidence of clinical approval.
- **AI-generated proposal:** No clinical wording change has been applied. Review the current text below and either approve it unchanged, approve exact replacement wording, request changes, reject an unsupported claim, or defer.

<details>
<summary>Current exact content</summary>

```json
{
  "id": "case-g27-06",
  "slug": "g27-nail-dark-blot-streak",
  "title": "A dark blot under a nail",
  "diagnosisLabel": "Subungual haemorrhage",
  "diseaseId": "subungual-haemorrhage",
  "category": "Benign vascular",
  "educationalLevel": "intermediate",
  "caseType": "clinical_dermoscopic",
  "patientContext": {
    "ageBand": null,
    "sex": null,
    "anatomicalSite": "Nail unit of one digit",
    "presentationNotes": "The source figure is a review illustration labelled hematoma. The caption does not say which digit. Age, sex, trauma history, and follow-up are not given for this nail."
  },
  "images": [
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g27-06a",
      "type": "clinical",
      "src": "assets/media/cases/case-51-clinical.jpg",
      "dimensions": {
        "width": 685,
        "height": 938
      },
      "alt": "Clinical photograph of a nail with a rounded black-maroon blot, a thin dark streak toward the free edge, and a broken free edge. No diagnosis is included.",
      "caption": "Clinical photograph. The source panel letter A is kept. The source label stays hidden until reveal.",
      "source": "Bertanha L, Noriega LF, Di Chiacchio NG, Matter A, Di Chiacchio N. Anais Brasileiros de Dermatologia 2024, via PubMed Central (PMC11551238)",
      "sourceUrl": "https://doi.org/10.1016/j.abd.2024.01.005",
      "creator": "Laura Bertanha and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Bertanha and coauthors, Anais Brasileiros de Dermatologia 2024, Figure 1 panel A, doi:10.1016/j.abd.2024.01.005. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel A of Figure 1 was cropped from the figure image embedded on page 2 of the article PDF in the PMC open-access package PMC11551238.1 (PDF image object 11, 1505 x 1824 pixels), source sha256 8d6c572eb938da676ceb5b0cb7ab80dbe5ffa88103e6cccc58f737ef7bbbb19a, at pixel box left 2, top 2, right 687, bottom 940 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 3888ed6a05475bdd9455a67e25a9f2d7a21295c31ffa19d656b70d09ea699fcb. No color change, no annotation, and no other edit.",
      "consentBasis": "The article is distributed under CC BY 4.0, with no third-party credit on Figure 1 (a courtesy credit appears only on Figure 9, which was not used). A consent sentence is not printed in this review; the frames show a nail and fingertip skin only."
    },
    {
      "attributionRequired": true,
      "modificationStatus": "cropped",
      "accessDate": "2026-10-02",
      "metadataCheckedAt": "2026-10-02",
      "sourceVerificationStatus": "verified",
      "patientIdentifiable": false,
      "id": "img-g27-06b",
      "type": "dermoscopy",
      "src": "assets/media/cases/case-51-dermoscopy.jpg",
      "dimensions": {
        "width": 685,
        "height": 856
      },
      "alt": "Dermoscopic view of a homogeneous black to dark red area under a nail plate with rounded red globules at its border and red streaks at its distal end. No diagnosis is included.",
      "caption": "Onychoscopic view; the caption pairs panels A and B by letter order. The panel letter B is kept.",
      "source": "Bertanha L, Noriega LF, Di Chiacchio NG, Matter A, Di Chiacchio N. Anais Brasileiros de Dermatologia 2024, via PubMed Central (PMC11551238)",
      "sourceUrl": "https://doi.org/10.1016/j.abd.2024.01.005",
      "creator": "Laura Bertanha and coauthors",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "attribution": "Bertanha and coauthors, Anais Brasileiros de Dermatologia 2024, Figure 1 panel B, doi:10.1016/j.abd.2024.01.005. CC BY 4.0. Cropped from the composite figure by Docutis.",
      "modificationsNotes": "Panel B of Figure 1 was cropped from the figure image embedded on page 2 of the article PDF in the PMC open-access package PMC11551238.1 (PDF image object 11, 1505 x 1824 pixels), source sha256 8d6c572eb938da676ceb5b0cb7ab80dbe5ffa88103e6cccc58f737ef7bbbb19a, at pixel box left 2, top 966, right 687, bottom 1822 with Pillow, then saved as JPEG quality 90 without metadata. Output sha256 d769fd8e8d4b465303ccc1dc1959e79896d60039980b1043aa91f8852670362d. No color change, no annotation, and no other edit.",
      "consentBasis": "The article is distributed under CC BY 4.0, with no third-party credit on Figure 1 (a courtesy credit appears only on Figure 9, which was not used). A consent sentence is not printed in this review; the frames show a nail and fingertip skin only."
    }
  ],
  "diagnosticGroundTruth": {
    "confirmedDiagnosis": "Subungual haemorrhage (peer-reviewed review caption; no follow-up, clipping, or histopathology stated)",
    "confirmationMethod": "clinical_diagnosis",
    "confirmationNotes": "The Figure 1 caption of Bertanha and coauthors (Anais Brasileiros de Dermatologia 2024, doi:10.1016/j.abd.2024.01.005), checked 2026-10-02, labels panels A and B hematoma, describing an oval blackish appearance clinically and a purplish hue with globules and distal streaks on onychoscopy. The review states that progression with nail growth is the key diagnostic evidence for haematoma, but it gives no follow-up, clipping, or histopathology for this nail. Confirmation therefore stays at the caption.",
    "confidenceNote": "Peer-reviewed caption by nail specialists. No follow-up, no clipping, no histopathology for this figure. Not a Docutis clinician review. Blood does not exclude a tumour under it."
  },
  "observations": [
    {
      "id": "obs-g27-06a",
      "kind": "observation",
      "modality": "clinical",
      "text": "A nail with a rounded black-maroon blot in the proximal half of the plate and a thin dark streak running toward the free edge. The distal plate is ridged, and the free edge is broken with yellow-brown debris."
    },
    {
      "id": "obs-g27-06b",
      "kind": "observation",
      "modality": "dermoscopy",
      "text": "A homogeneous black to dark red area under the plate with rounded red to red-black globules along its border and red streaks at its distal end. Fine yellow-white cracks cross the surface. Fine longitudinal plate striations run through the area. Air bubbles are in the field."
    }
  ],
  "interpretations": [
    {
      "id": "int-g27-06a",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g27-06a"
      ],
      "text": "A dark blot under a nail is described before it is named. It does not form a band from the proximal fold to the free edge."
    },
    {
      "id": "int-g27-06b",
      "kind": "interpretation",
      "relatedObservationIds": [
        "obs-g27-06a",
        "obs-g27-06b"
      ],
      "text": "Homogeneous black to dark red colour with rounded red globules at the border and distal red streaks fits blood in this frame. The fine longitudinal striations are plate texture, not a melanin band. One frame cannot show distal movement with nail growth."
    }
  ],
  "dermoscopicFeatures": [],
  "differentials": [
    {
      "diagnosis": "Subungual haemorrhage",
      "supportingFeatures": [
        "Homogeneous black to dark red colour.",
        "Rounded red globules at the border.",
        "No melanin band from the fold."
      ],
      "contradictingFeatures": [
        "No follow-up or clipping is stated for this nail."
      ],
      "teachingDistinction": "The caption names it; growth-out with the nail would confirm it."
    },
    {
      "diagnosis": "Nail-unit melanoma",
      "supportingFeatures": [
        "A dark nail lesion with a damaged free edge."
      ],
      "contradictingFeatures": [
        "Red to red-black colour and globules rather than brown longitudinal lines."
      ],
      "teachingDistinction": "Blood can coexist with a tumour; persistent or recurrent blood needs reassessment."
    },
    {
      "diagnosis": "Onychomycosis with dark pigment",
      "supportingFeatures": [
        "A ridged distal plate with debris."
      ],
      "contradictingFeatures": [
        "The dark area is rounded and red-black with globules, proximal to the debris."
      ],
      "teachingDistinction": "Fungal pigment is usually distal and associated with crumbling; it is read separately from the blot."
    }
  ],
  "teachingPoints": [
    {
      "id": "tp-g27-06a",
      "title": "Notice first",
      "text": "Name the colour honestly: black to dark red, not brown. Then look at the border for rounded red globules, and check whether a band runs from the fold."
    },
    {
      "id": "tp-g27-06b",
      "title": "What confirmed it",
      "text": "Only the review caption. Growth of the blot toward the free edge over weeks, a clipping test, or histopathology would be stronger, and none is stated."
    }
  ],
  "observationPrompts": [
    "Is the colour brown, or black to dark red?",
    "Does a pigmented band run from the proximal fold, or is the colour a rounded blot?"
  ],
  "hints": [
    "Look at the border of the dark area before its centre."
  ],
  "closestMimic": {
    "name": "Nail-unit melanoma",
    "whyClosest": "A dark nail lesion with a damaged free edge raises the melanoma question."
  },
  "patterns": [
    {
      "id": "pat-g27-06-blood",
      "label": "Homogeneous black to dark red area under the plate",
      "modality": "dermoscopy",
      "specificityNote": "A homogeneous black to dark red area without a band of brown lines. It fits blood in this frame and does not exclude a lesion under it.",
      "certainty": "clearly_visible",
      "weight": "major"
    },
    {
      "id": "pat-g27-06-globules",
      "label": "Rounded red globules along the border",
      "modality": "dermoscopy",
      "specificityNote": "Rounded red to red-black globules line the border of the dark area, with red streaks at its distal end.",
      "certainty": "clearly_visible",
      "weight": "supportive"
    },
    {
      "id": "pat-g27-06-lines",
      "label": "Band of longitudinal pigmented lines",
      "modality": "dermoscopy",
      "specificityNote": "No band of brown pigmented lines runs from the proximal fold. Fine longitudinal striations are plate texture seen through the blood.",
      "certainty": "not_visible",
      "weight": "supportive"
    },
    {
      "id": "pat-g27-06-edge",
      "label": "Broken free edge with debris",
      "modality": "clinical",
      "specificityNote": "The distal free edge is broken with yellow-brown debris on the clinical frame only. Its cause is not stated.",
      "certainty": "clearly_visible",
      "weight": "weak"
    },
    {
      "id": "pat-g27-06-streak",
      "label": "Thin dark streak toward the free edge",
      "modality": "clinical",
      "specificityNote": "A thin dark streak runs from the blot toward the free edge in this single frame. Movement with nail growth cannot be read from one frame.",
      "certainty": "clearly_visible",
      "weight": "weak"
    }
  ],
  "synthesis": "The review caption labels this nail a haematoma without stating follow-up, clipping, or histopathology. The onychoscopic frame shows a homogeneous black to dark red area with rounded red globules at its border and no band of brown lines.",
  "evidenceWeighting": "The blood colour is clearly visible and is the major clue. The border globules support it. The missing melanin band supports it. The broken free edge is weak and unexplained. The confirmation is a peer-reviewed caption only, which is weaker than documented growth-out or histopathology.",
  "diagnosticTrap": "Reassuring from the blood colour without follow-up, or reading one frame as proof that the blot is moving out with the nail.",
  "mentorNote": "This is the first nail haemorrhage with onychoscopy in Docutis. Compare its rounded red-black blot with the brown longitudinal bands of the melanocytic nail cases.",
  "takeHomeRule": "Under a nail, homogeneous black to dark red colour with red border globules suggests blood. Follow it out with the nail, and reassess if it persists, recurs, or sits on a band.",
  "whyNot": [
    {
      "mimic": "Nail-unit melanoma",
      "text": "The adult toenail case shows brown bands of differing width with a split plate. Here the colour is a rounded red-black blot with globules and no brown band. Blood can still coexist with a tumour."
    },
    {
      "mimic": "Nail matrix nevus",
      "text": "A nevus band is made of brown longitudinal lines from the matrix to the free edge, not a rounded blot."
    }
  ],
  "compareWith": [
    "cmp-g27-nail-blood-melanocytic"
  ],
  "pairedModality": {
    "clinicalObservation": "A nail with a rounded black-maroon blot in the proximal half of the plate and a thin dark streak running toward the free edge. The distal plate is ridged, and the free edge is broken with yellow-brown debris.",
    "dermoscopicObservation": "A homogeneous black to dark red area under the plate with rounded red to red-black globules along its border and red streaks at its distal end. Fine yellow-white cracks cross the surface. Fine longitudinal plate striations run through the area. Air bubbles are in the field.",
    "addedValue": "The dermoscopic frame shows the dark red hue, the rounded border globules, and the absence of a brown band; clinically the blot looks black.",
    "reasoningImpact": "The reading moves from a black nail blot to a blood-coloured area with border globules. That favours blood in this frame and calls for follow-up.",
    "limits": "The caption pairs the clinical and onychoscopic panels by letter order. No follow-up, clipping, or histopathology is stated. One frame cannot show movement with nail growth.",
    "informationGain": "dermoscopy_changes_leading_differential",
    "informationGainNote": "Educational label only. Dermoscopy changes the colour reading from black to dark red with border globules. Not a validated metric and not a probability.",
    "comparison": {
      "clinicalClue": "Rounded black blot under a nail, broken free edge.",
      "dermoscopicClue": "Homogeneous dark red area, red border globules, no brown band.",
      "addedInformation": "The red hue and the globules are only visible on the dermoscopic frame.",
      "diagnosticConflict": "Clinically the blot looks like dark pigment.",
      "teachingRule": "Read colour and border under the dermatoscope before naming a dark nail."
    }
  },
  "modalityIntegration": "The first frame is the clinical photograph of a nail with a rounded black-maroon blot and a broken free edge. The second frame is the onychoscopic view of the same nail and shows a homogeneous dark red area with rounded red globules at its border.",
  "academy": {
    "level": 3,
    "spectrum": "mimic",
    "teachingType": "teaching",
    "skillIds": [
      "subungual-color",
      "blood-color"
    ]
  },
  "recordedScreeningDecision": null,
  "annotations": [],
  "localization": null,
  "clinicalAction": "After reveal, compare with the adult great-toenail case. Do not treat from this case.",
  "managementBrief": "No management category is stored. The source history is not a Docutis recommendation. This brief is not a protocol and remains review required.",
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
