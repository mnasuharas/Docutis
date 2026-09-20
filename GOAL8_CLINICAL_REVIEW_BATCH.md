# Goal 8 clinical review batch

This worksheet prepares the eight structured pilot records for physician review. It does not record or imply attestation. Automated validation, source metadata checks, evidence mapping and generated fingerprints are not substitutes for review by a qualified physician.

Reviewers should compare every statement with the cited current source, record jurisdiction-specific limitations, and leave the record as `clinician review required` until all required metadata and the exact current fingerprint are deliberately attested.

## Actinic Keratosis (`actinic-keratosis`)

- **Current status:** `clinician review required`; no physician metadata.
- **Attached guidance:** AAD Actinic keratosis clinical guideline; DermNet Actinic keratosis; WHO ICD-10 2019; WHO Classification of Skin Tumours, fifth edition.
- **Definition:** UV-associated premalignant keratinocytic lesion with potential progression to cSCC.
- **Morphology:** Rough macule, papule or plaque; scale and hyperkeratosis; may be easier to feel than see.
- **Localization:** Chronically sun-exposed, photo-distributed skin.
- **Symptoms/course:** Chronic; persistence, tenderness, thickening or rapid change are escalation clues.
- **Dermoscopy:** Facial erythematous pseudonetwork/strawberry pattern, follicular openings and surface scale.
- **Diagnostics:** Clinical assessment; biopsy when diagnosis or invasion is uncertain.
- **Differentials:** SCC in situ, invasive cSCC, seborrhoeic keratosis, superficial BCC and inflammatory dermatosis.
- **Treatment hierarchy:** Lesion- or field-directed management; biopsy/specialist assessment where invasion is a concern; UV protection.
- **Medication information:** No structured regimen or dose in this release.
- **Follow-up:** Risk-adapted reassessment of persistent, recurrent or changing lesions.
- **Red flags / referral:** Thickening, tenderness, rapid change or suspected invasion; biopsy assessment.
- **Evidence map:** Presentation/dermoscopy → DermNet; diagnostics/treatment/follow-up/red flags → AAD. Verify that section-level mapping is sufficient and not overbroad.
- **Visual item:** None in Goal 8.
- **Quiz item:** `ak-biopsy`; verify wording, best answer and explanation.
- **Unresolved questions:** Confirm whether red-flag wording and field-cancerization context need jurisdiction-specific qualification.
- **Jurisdiction limits:** Treatment availability and referral pathways vary; coding is WHO-level rather than a national modification.
- [ ] Physician reviewed the complete current record, evidence map and quiz item.
- **Review date:** ____________________  **Specialty:** ____________________
- **Fingerprint command:** `node scripts/clinical-review.js actinic-keratosis`

## Basal Cell Carcinoma (`basal-cell-carcinoma`)

- **Current status:** `clinician review required`; no physician metadata.
- **Attached guidance:** AAD Basal cell carcinoma clinical guideline; DermNet Basal cell carcinoma; WHO ICD-10 2019; ICD-O-3.2; WHO Classification of Skin Tumours, fifth edition.
- **Definition:** Common locally invasive keratinocyte carcinoma with very low metastatic potential.
- **Morphology:** Pearly/translucent papule or plaque; telangiectasia, crust or ulceration; subtype variability.
- **Localization:** No structured localization asserted in Goal 7.
- **Symptoms/course:** Usually chronic and slowly progressive.
- **Dermoscopy:** Arborising vessels, blue-grey ovoid nests, leaf-like or spoke-wheel structures and ulceration.
- **Diagnostics:** Clinical risk assessment followed by biopsy and histopathologic subtype characterization.
- **Differentials:** cSCC, actinic keratosis, melanocytic lesion, sebaceous hyperplasia and other tumors.
- **Treatment hierarchy:** Risk-adapted surgery; nonsurgical alternatives only for selected cases where appropriate.
- **Medication information:** No structured regimen or dose in this release.
- **Follow-up:** Cancer surveillance for recurrence and additional primary skin cancers.
- **Red flags / referral:** No separate structured red-flag list; biopsy and surgical assessment are mapped.
- **Evidence map:** Diagnostics/treatment/follow-up/oncology → AAD; presentation/dermoscopy/differentials → DermNet. Reviewer must confirm whether section-level support is sufficiently direct.
- **Visual item:** `bcc-clues-schematic`; verify clue selection, labelling and conservative framing.
- **Quiz item:** `bcc-dermoscopy`; verify one-best-answer construction.
- **Unresolved questions:** Confirm whether broader dermoscopy-specific evidence should be attached before approval.
- **Jurisdiction limits:** Surgical pathways, risk definitions and reimbursement rules vary by jurisdiction.
- [ ] Physician reviewed the complete current record, evidence map, visual and quiz item.
- **Review date:** ____________________  **Specialty:** ____________________
- **Fingerprint command:** `node scripts/clinical-review.js basal-cell-carcinoma`

## Cutaneous Melanoma (`cutaneous-melanoma`)

- **Current status:** `clinician review required`; no physician metadata.
- **Attached guidance:** EADO/EDF/EORTC melanoma diagnostics and treatment updates; NCI PDQ; WHO ICD-10 2019; ICD-O-3.2; WHO Skin Tumours.
- **Definition:** Malignant melanocytic neoplasm with metastatic potential and stage-related prognosis.
- **Morphology:** Asymmetry, irregular border, variable pigmentation or amelanotic presentation; evolution/outlier appearance.
- **Localization:** No single structured localization asserted.
- **Symptoms/course:** Progressive evolution is a warning feature.
- **Dermoscopy:** Multicomponent asymmetry, atypical network/vessels, irregular dots or globules, streaks and regression.
- **Diagnostics:** Clinical and dermoscopic assessment; biopsy for histopathologic confirmation and staging.
- **Differentials:** Melanocytic nevus, seborrhoeic keratosis, pigmented BCC and other pigmented or amelanotic lesions.
- **Treatment hierarchy:** Complete excision and histopathologic staging; further nodal/systemic decisions are stage-dependent and specialist-led.
- **Medication information:** No structured regimen or dose in this release.
- **Follow-up:** References the separate stage- and risk-based module; no duplicate intervals added.
- **Red flags / referral:** Evolution, marked asymmetry, irregular border, color variation, outlier or amelanotic suspicious lesion; biopsy/oncology pathways.
- **Evidence map:** Diagnostics/presentation/dermoscopy/red flags/differentials → EADO Part 1; treatment/follow-up/oncology → EADO Part 2 and NCI where mapped.
- **Visual item:** `melanoma-abcde-schematic`; verify diameter caveat, ABCDE labels and non-diagnostic framing.
- **Quiz item:** `melanoma-evolution`; verify answer and explanation.
- **Unresolved questions:** Confirm boundaries between this general record and the independent German follow-up protocol.
- **Jurisdiction limits:** Staging, sentinel-node and systemic therapy pathways must follow current local multidisciplinary guidance.
- [ ] Physician reviewed the complete current record, evidence map, visual and quiz item.
- **Review date:** ____________________  **Specialty:** ____________________
- **Fingerprint command:** `node scripts/clinical-review.js cutaneous-melanoma`

## Atopic Dermatitis (`atopic-dermatitis`)

- **Current status:** `clinician review required`; no physician metadata.
- **Attached guidance:** AAD adult topical-therapy and phototherapy/systemic-therapy guidelines; DermNet Atopic dermatitis; WHO ICD-10 2019.
- **Definition:** Chronic relapsing pruritic inflammatory disease with epidermal barrier dysfunction.
- **Morphology:** Eczematous change, excoriation and lichenification; appearance varies with skin tone.
- **Localization:** Age-dependent distribution is described in prose but intentionally not structured.
- **Symptoms/course:** Pruritus and xerosis; chronic recurrent course.
- **Dermoscopy:** Nonspecific and not routinely required.
- **Diagnostics:** Clinical assessment; specialist review for persistent, severe or atypical disease.
- **Differentials:** Contact/seborrheic dermatitis, psoriasis, scabies, infection and CTCL in selected atypical adult disease.
- **Treatment hierarchy:** Moisturization and topical anti-inflammatory therapy; specialist-guided phototherapy/systemic escalation when indicated.
- **Medication information:** No structured regimen or dose in this release.
- **Follow-up:** Control, sleep, quality of life, treatment burden, adherence and infection.
- **Red flags / referral:** Infection, atypical adult disease or inadequate control; dermatology/systemic-therapy assessment.
- **Evidence map:** Treatment/follow-up → AAD; presentation/dermoscopy/diagnostics/differentials/red flags → DermNet where mapped.
- **Visual item:** None in Goal 8.
- **Quiz item:** `atopic-first-line`; verify hierarchy and adult-guideline scope.
- **Unresolved questions:** Confirm pediatric and pregnancy exclusions and whether a separate diagnostic guideline is needed.
- **Jurisdiction limits:** Adult AAD guidance does not define all pediatric or local formulary decisions.
- [ ] Physician reviewed the complete current record, evidence map and quiz item.
- **Review date:** ____________________  **Specialty:** ____________________
- **Fingerprint command:** `node scripts/clinical-review.js atopic-dermatitis`

## Plaque Psoriasis (`plaque-psoriasis`)

- **Current status:** `clinician review required`; no physician metadata.
- **Attached guidance:** Living EuroGuiDerm systemic-treatment guideline; AAD psoriasis guideline; DermNet Psoriasis; WHO ICD-10 2019.
- **Definition:** Chronic plaque form of psoriasis with persistent well-demarcated inflammatory plaques and scale.
- **Morphology:** Well-demarcated plaque with scale.
- **Localization:** Scalp, extensor surfaces and lumbosacral skin; site-specific variants acknowledged.
- **Symptoms/course:** Chronic; structured symptom field is not asserted.
- **Dermoscopy:** Regular dotted vessels, diffuse white scale and light-red background.
- **Diagnostics:** Clinical evaluation including nails, severity, quality of life and joint symptoms; histopathology for unclear cases.
- **Differentials:** Eczema, seborrheic dermatitis, dermatophyte infection, pityriasis rubra pilaris and CTCL.
- **Treatment hierarchy:** Site-appropriate topical care for limited disease; phototherapy/systemic assessment for extensive or high-impact disease.
- **Medication information:** No structured regimen or dose in this release.
- **Follow-up:** Activity, treatment safety, quality of life, joint symptoms and comorbidities.
- **Red flags / referral:** Inflammatory joint symptoms, extensive/high-impact or atypical resistant disease; systemic-therapy assessment.
- **Evidence map:** Presentation/dermoscopy/differentials → DermNet; diagnostics/treatment → AAD/EuroGuiDerm; follow-up/red flags → EuroGuiDerm.
- **Visual item:** `psoriasis-distribution-schematic`; verify sites, plaque depiction and site-variant note.
- **Quiz item:** `psoriasis-distribution`; verify one-best-answer wording.
- **Unresolved questions:** Confirm whether joint referral and comorbidity language needs a dedicated source mapping.
- **Jurisdiction limits:** Systemic access, screening and monitoring follow national guidance and formulary rules.
- [ ] Physician reviewed the complete current record, evidence map, visual and quiz item.
- **Review date:** ____________________  **Specialty:** ____________________
- **Fingerprint command:** `node scripts/clinical-review.js plaque-psoriasis`

## Acne Vulgaris (`acne-vulgaris`)

- **Current status:** `clinician review required`; no physician metadata.
- **Attached guidance:** AAD acne vulgaris guideline; DermNet Acne vulgaris; WHO ICD-10 2019.
- **Definition:** Chronic inflammatory pilosebaceous disorder producing comedonal and inflammatory lesions.
- **Morphology:** Open/closed comedones, papules, pustules, nodules and scarring.
- **Localization:** Face and trunk in a seborrheic distribution.
- **Symptoms/course:** Chronic; psychosocial burden and pigmentary sequelae contribute to impact.
- **Dermoscopy:** Not routinely required.
- **Diagnostics:** Clinical lesion/severity assessment; targeted testing only for a specific suspected contributor.
- **Differentials:** Rosacea, bacterial/Malassezia folliculitis, periorificial dermatitis, hidradenitis and medication-related eruptions.
- **Treatment hierarchy:** Complementary topical mechanisms; antibiotic stewardship; indication-specific systemic/hormonal/isotretinoin assessment.
- **Medication information:** No structured regimen or dose in this release.
- **Follow-up:** Response, tolerance, adherence, scarring, pigmentary sequelae and psychosocial impact.
- **Red flags / referral:** Scarring, severe nodules, substantial psychosocial burden or standard-treatment failure.
- **Evidence map:** Treatment/diagnostics/follow-up/red flags → AAD; presentation/dermoscopy/differentials → DermNet.
- **Visual item:** `acne-lesions-schematic`; verify lesion cross-sections and non-patient severity framing.
- **Quiz item:** `acne-comedones`; verify comparison with rosacea.
- **Unresolved questions:** Confirm wording for endocrine testing and systemic-therapy monitoring without adding unsupported regimens.
- **Jurisdiction limits:** Regulatory requirements, pregnancy prevention and medication access vary and are intentionally not encoded here.
- [ ] Physician reviewed the complete current record, evidence map, visual and quiz item.
- **Review date:** ____________________  **Specialty:** ____________________
- **Fingerprint command:** `node scripts/clinical-review.js acne-vulgaris`

## Rosacea (`rosacea`)

- **Current status:** `clinician review required`; no physician metadata.
- **Attached guidance:** German S2k Rosacea guideline; DermNet Rosacea; WHO ICD-10 2019.
- **Definition:** Chronic inflammatory facial disorder assessed by phenotype.
- **Morphology:** Persistent centrofacial erythema, telangiectasia, papules/pustules and possible phymatous change; comedones are not typical.
- **Localization:** Usually localized to the face.
- **Symptoms/course:** Chronic recurrent flushing and inflammatory activity; ocular symptoms are assessed separately.
- **Dermoscopy:** Supportive telangiectatic vascular and follicular patterns.
- **Diagnostics:** Clinical phenotype assessment; diagnostic review for atypical, unilateral or resistant disease.
- **Differentials:** Acne, seborrheic/contact/periorificial dermatitis, cutaneous lupus and other flushing causes.
- **Treatment hierarchy:** Phenotype-directed topical, oral or vascular-device treatment plus gentle skin care and photoprotection.
- **Medication information:** No structured regimen or dose in this release.
- **Follow-up:** Phenotype response, ocular symptoms, tolerance and quality of life.
- **Red flags / referral:** Ocular symptoms, unilateral atypical disease or resistance; ophthalmology/dermatology assessment.
- **Evidence map:** Most operational domains → S2k guideline; morphology/dermoscopy/differentials also map to DermNet.
- **Visual item:** None in Goal 8.
- **Quiz item:** `rosacea-ocular`; verify escalation wording.
- **Unresolved questions:** Confirm whether ocular urgency distinctions require more explicit source-supported language.
- **Jurisdiction limits:** Guideline is German; therapy availability and referral pathways vary.
- [ ] Physician reviewed the complete current record, evidence map and quiz item.
- **Review date:** ____________________  **Specialty:** ____________________
- **Fingerprint command:** `node scripts/clinical-review.js rosacea`

## Tinea Corporis (`tinea-corporis`)

- **Current status:** `clinician review required`; no physician metadata.
- **Attached guidance:** CDC Clinical Overview of Ringworm; DermNet Tinea corporis; WHO ICD-10 2019.
- **Definition:** Dermatophyte infection of glabrous trunk or limb skin.
- **Morphology:** Annular/polycyclic scaly plaque with active border and relative central clearing; steroid use may obscure it.
- **Localization:** Trunk and limbs, generally localized in the structured pilot.
- **Symptoms/course:** Progressive peripheral enlargement; no structured symptom field asserted.
- **Dermoscopy:** Peripheral scale and erythema are supportive but nonspecific.
- **Diagnostics:** Clinical assessment; microscopy or culture when atypical, refractory or when identification changes management.
- **Differentials:** Nummular dermatitis, psoriasis, pityriasis rosea, granuloma annulare, subacute cutaneous lupus and erythema migrans.
- **Treatment hierarchy:** Topical antifungal for localized disease; confirmed extensive/refractory/follicular or immunocompromised disease may require systemic assessment; avoid corticosteroid monotherapy.
- **Medication information:** No structured regimen or dose in this release.
- **Follow-up:** Reassess diagnosis, adherence, reinfection, resistance and untreated sources after non-response.
- **Red flags / referral:** Extensive disease, immunosuppression, follicular involvement, failure or suspected resistance; dermatology assessment.
- **Evidence map:** Diagnostics/treatment/follow-up/red flags → CDC; presentation/dermoscopy/differentials → DermNet.
- **Visual item:** None in Goal 8.
- **Quiz item:** `tinea-confirmation`; verify diagnostic testing and steroid warning.
- **Unresolved questions:** Confirm thresholds for culture/systemic assessment and how emerging resistance should be framed.
- **Jurisdiction limits:** Test availability, species epidemiology and antifungal susceptibility differ geographically.
- [ ] Physician reviewed the complete current record, evidence map and quiz item.
- **Review date:** ____________________  **Specialty:** ____________________
- **Fingerprint command:** `node scripts/clinical-review.js tinea-corporis`

## Attestation boundary

The maintainer may calculate a fingerprint after the physician has completed review, but must not change a record to `clinician reviewed` without the physician’s review date, role, specialty and explicit attestation to that exact fingerprint. Every checkbox above is intentionally unchecked.
