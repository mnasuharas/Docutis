# Goal 14 pilot case review pack

Prepared 2026-09-30 (Europe/Berlin) so a clinician can review the five existing pilot cases. This file is not a clinician decision. It does not populate `clinicalReview`, does not record a completed review decision, and does not attest diagnostic or therapeutic correctness.

Every case remains `reviewStatus: "clinician review required"` with `clinicalReview: null`.

Sources were re-fetched on 2026-09-30. Stored `accessDate` / `metadataCheckedAt` remain `2026-09-28` because license, creator and diagnosis wording on the source pages had not changed. Those dates are outside the case fingerprint.

Public image paths are unchanged and byte-identical to the governed files: `case-01-clinical.jpg` through `case-05-clinical.jpg` (case 02 and case 03 use the `dermoscopy` suffix).

## case-acral-melanoma-plantar

- **ID:** `case-acral-melanoma-plantar`
- **Learner title:** Large plantar pigmented macule
- **Final diagnosis on record:** Acral lentiginous melanoma
- **Ground truth:** Acral lentiginous melanoma (Clark level IV, Breslow 2.6 mm in source paper); confirmation method `histopathology`
- **Image type:** clinical
- **Anatomical site:** Left plantar foot
- **Source:** Xavier-Júnior et al., Diagnostic Pathology (2015), via Wikimedia Commons
- **Source URL:** https://commons.wikimedia.org/wiki/File:Photography_of_a_large_acral_lentiginous_melanoma.jpg
- **Creator:** Xavier-Júnior, José; Munhoz, Tania; Souza, Vinicius; Campos, Eloísa; Stolf, Hamilton; Marques, Mariângela
- **License:** CC BY 4.0
- **Access date on record:** 2026-09-28
- **Review state:** clinician review required; `clinicalReview` null
- **Current fingerprint:** `sha256-v1:97e2684345531c2d8f7153bdf9ff857e5baa1a9fd42def1852c1466547f926d7`

**Clinical summary.** The Commons file is the clinical photograph from Xavier-Júnior et al., Diagnostic Pathology 2015 (DOI 10.1186/s13000-015-0307-z). The paper's case presentation and figure caption describe a large asymmetric dark-brown macule with irregular borders and several colors on the left plantar region. Histopathology in that paper confirmed acral lentiginous melanoma, Clark level IV, Breslow thickness 2.6 mm. The paper also states stage IIA (T3a N0 M0). Docutis does not re-read the slides. The case no longer calls this lesion "advanced."

**Visible findings.** The stored clinical image shows a broad pigmented macule on the plantar surface, with an uneven outline and more than one brown-to-dark tone. Toes are at the edge of the frame. No dermoscopic image is attached, so no dermoscopic structures are recorded.

**Differential assessment.** Acral nevus is a fair contrast for a smaller, more orderly acral macule. Acral lentiginous melanoma is the source diagnosis and is named in the differential list, with histologic confirmation withheld until Reveal. Subungual or trauma-related hemorrhage is only weakly related to this plantar macule; the text already limits it with "if periungual."

**Diagnosis evidence.** The paper states that histopathology confirmed the clinical suspicion of acral lentiginous melanoma, Clark level IV, Breslow 2.6 mm, after the specimen was fully sectioned. Commons repeats the clinical caption and the CC BY 4.0 / open-access statement. Certainty is histopathologic for the published case, not a new Docutis reading. The paper's written publication consent is what the image record cites.

**Teaching value.** Learners practice site, asymmetry, border and color before the name. The reveal can honestly say the published case was histologically confirmed, including Clark level and Breslow thickness, without equating a large macule with advanced-stage disease.

**Potential concerns.** The paper reports a 77-year-old woman; age and sex are not stored. The hemorrhage differential is peripheral for this plantar photograph. The paper's stage IIA statement is not copied into the ground-truth string.

**Recommendation:** Ready for clinician review

## case-bcc-nodular-dermoscopy

- **ID:** `case-bcc-nodular-dermoscopy`
- **Learner title:** Nodular lesion dermatoscopy with vessels
- **Final diagnosis on record:** Nodular basal cell carcinoma
- **Ground truth:** Nodular basal cell carcinoma; confirmation method `expert_diagnosis`
- **Image type:** dermoscopy
- **Anatomical site:** Not specified on source (dermoscopic close-up)
- **Source:** Dr. Thomas Brinkmeier / WIKIDERM, via Wikimedia Commons
- **Source URL:** https://commons.wikimedia.org/wiki/File:Dermatoskopie_eines_nodul%C3%A4ren_Basalzellkarzinoms,_WIKIDERM%C2%AE.jpg
- **Creator:** Dr. Thomas Brinkmeier
- **License:** CC BY 4.0
- **Access date on record:** 2026-09-28
- **Review state:** clinician review required; `clinicalReview` null
- **Current fingerprint:** `sha256-v1:62519972f5c5b687f8517591514a383b6d9f07cfd4fce69b6b4153d8b87f9b20`

**Clinical summary.** The Commons description, in German, is dermatoscopy of a nodular basal cell carcinoma by Dr Thomas Brinkmeier (Wikiderm), own work, CC BY 4.0. No body site and no histopathology report are on that page. The diagnosis stays an author label. The frame itself shows in-focus branching red vessels on pink to salmon skin, not a clinical view that demonstrates a nodule or translucency.

**Visible findings.** Branching red vessels are in focus, with thicker stems dividing into finer branches. The background is pink to salmon, without a pigment network. A few small dark red-brown foci are present; they are not labeled ulceration. A pale curved line and a millimetre scale are photograph markings, not dermoscopic structures. Arborizing / branching vessels are recorded because that pattern is visible. No other dermoscopic structure was added.

**Differential assessment.** Nodular BCC is the author label and is one of three differentials, not a pre-reveal confirmation. Amelanotic or hypomelanotic melanoma remains a necessary mimic for a pink vascularized lesion. Sebaceous hyperplasia is a vessel-pattern mimic; the text no longer assumes the face, because the source names no site.

**Diagnosis evidence.** Only the clinician-author caption. Confirmation method stays `expert_diagnosis`. Histopathology is explicitly not claimed.

**Teaching value.** Vessel morphology before the diagnosis name, with the limits stated: branching vessels support BCC and are not pathognomonic; the ink line is not a shiny white structure.

**Potential concerns.** Nodular subtype and any histologic confirmation depend entirely on the author caption. The small dark red-brown foci were not named as erosion or ulceration.

**Recommendation:** Ready for clinician review

## case-bcc-pigmented-dermoscopy

- **ID:** `case-bcc-pigmented-dermoscopy`
- **Learner title:** Pigmented lesion dermatoscopy on the back
- **Final diagnosis on record:** Pigmented basal cell carcinoma
- **Ground truth:** Pigmented basal cell carcinoma; confirmation method `expert_diagnosis`
- **Image type:** dermoscopy
- **Anatomical site:** Back (per source description)
- **Source:** Dr. Thomas Brinkmeier / WIKIDERM, via Wikimedia Commons
- **Source URL:** https://commons.wikimedia.org/wiki/File:Dermatoskopie_eines_pigmentierten_Basalzellkarzinoms.jpg
- **Creator:** Dr. Thomas Brinkmeier
- **License:** CC BY 4.0
- **Access date on record:** 2026-09-28
- **Review state:** clinician review required; `clinicalReview` null
- **Current fingerprint:** `sha256-v1:13b279feef888a0418561611db23cfc725b9d00276998cea6014b40ff0f35465`

**Clinical summary.** The Commons description is dermatoscopy of a pigmented basal cell carcinoma on the back (am Rücken), own work of Dr Thomas Brinkmeier, CC BY 4.0. No histopathology is cited. The image shows asymmetric brown leaf-like pigment aggregates and terminal hairs, without a regular pigment network. Blue-gray ovoid nests were previously recorded and were removed because they are not clearly shown.

**Visible findings.** Asymmetric brown, somewhat leaf-like pigment aggregates in a field that also contains terminal hairs. No regular reticular pigment network. A millimetre scale is visible. Spoke-wheel areas and blue-gray ovoid nests were not clearly identified and are not recorded as present. The only positive dermoscopic token kept is `maple_leaf_areas`.

**Differential assessment.** Pigmented BCC, melanoma and seborrheic keratosis are a small, site-appropriate set. Melanoma stays the safety-critical alternative. The BCC card is supported by leaf-like pigment and the absent network, not by ovoid nests.

**Diagnosis evidence.** Author caption only, including the back as the site. Confirmation method stays `expert_diagnosis`.

**Teaching value.** Distinguish leaf-like pigment from a melanocytic network, and do not teach structures that this frame does not show.

**Potential concerns.** Pigmented BCC subtype is an author label without a linked pathology report. Some brown clumps have a grey-brown tone; that was not upgraded to blue-gray ovoid nests.

**Recommendation:** Ready for clinician review

## case-ak-field-hand

- **ID:** `case-ak-field-hand`
- **Learner title:** Field change on the dorsum of the hand
- **Final diagnosis on record:** Actinic keratoses / field cancerization
- **Ground truth:** Actinic keratoses with field cancerization of the hand dorsum; confirmation method `expert_diagnosis`
- **Image type:** clinical
- **Anatomical site:** Dorsum of the hand
- **Source:** Dr. Thomas Brinkmeier / WIKIDERM, via Wikimedia Commons
- **Source URL:** https://commons.wikimedia.org/wiki/File:Aktinische_Keratosen_am_Handr%C3%BCcken,_sog._Feldkanzerisierung,_%C2%A9WIKIDERM.jpg
- **Creator:** Dr. Thomas Brinkmeier
- **License:** CC BY 4.0
- **Access date on record:** 2026-09-28
- **Review state:** clinician review required; `clinicalReview` null
- **Current fingerprint:** `sha256-v1:e1aad888f61babb1a3efd9b4c3f6417050a4c4331411848b5ce3ae14194146c3`
- **Fingerprint note:** unchanged in Goal 14. No clinical wording edit.

**Clinical summary.** The German Commons description is actinic keratoses on the dorsum of the hand, so-called field cancerization, own work of Dr Thomas Brinkmeier, CC BY 4.0. The English caption says "an actinic keratosis" and also "Field cancerization of the back of the hand." No histopathology is cited. The photograph matches a hand dorsum with many scaly erythematous spots on mottled, wrinkled skin. Wording was left as stored.

**Visible findings.** Dorsum of a hand. Numerous discrete erythematous and scaly or keratotic spots rather than one tumor. Background mottled pigmentation and wrinkling. No dermoscopy is attached.

**Differential assessment.** Field actinic keratoses, a squamous-cell carcinoma arising in the field, and hand dermatitis are plausible. The SCC contrast is that this frame shows many thin keratotic spots rather than one indurated mass. The biopsy sentence is a general safety point, not a drug or margin recommendation.

**Diagnosis evidence.** Clinician-author label for actinic keratoses and field cancerization. Plural follows the German description and the photograph. Confirmation method stays `expert_diagnosis`.

**Teaching value.** Count the field, not one spot, and separate familiar thin keratoses from a thickened focus that may need its own assessment.

**Potential concerns.** The English Commons caption is singular ("an actinic keratosis") while the German description is plural. No histopathology is linked. "Rough" in one observation is inferred from visible scale.

**Recommendation:** Ready for clinician review

## case-scc-ak-paraspinal

- **ID:** `case-scc-ak-paraspinal`
- **Learner title:** Two neighboring lesions on the upper back
- **Final diagnosis on record:** Well-differentiated cutaneous squamous cell carcinoma with adjacent actinic keratosis
- **Ground truth:** Well-differentiated cutaneous squamous cell carcinoma with adjacent actinic keratosis; confirmation method `expert_diagnosis`
- **Image type:** clinical
- **Anatomical site:** Left upper paraspinal back
- **Source:** Dermanonymous, via Wikimedia Commons
- **Source URL:** https://commons.wikimedia.org/wiki/File:Squamous_Cell_Carcinoma_well_differentiated_Left_upper_paraspinal_back_with_adjacent_actinic_keratosis.jpg
- **Creator:** Dermanonymous
- **License:** CC BY-SA 4.0
- **Access date on record:** 2026-09-28
- **Review state:** clinician review required; `clinicalReview` null
- **Current fingerprint:** `sha256-v1:3fc90dd72df405163716cc729c081454f9ff23d92b64d16c39efe8f275bdc18a`

**Clinical summary.** The Commons description says: squamous cell carcinoma, well differentiated, left upper paraspinal back, marked for biopsy, with adjacent actinic keratosis. Author Dermanonymous, own work, CC BY-SA 4.0. The file is unmodified, so share-alike adaptation does not arise. No pathology report is linked. The case keeps `expert_diagnosis` and says it does not claim an unseen report. "Well-differentiated" is the uploader's wording, not a Docutis upgrade.

**Visible findings.** Two neighboring lesions in a tight close-up. One is more raised and keratotic. The other is flatter, pink-red and scaly. Purple ink marks are in the field. The photograph does not by itself show which mark was the biopsy target, and it does not show an anatomical landmark that proves the paraspinal site. That site remains the caption's site.

**Differential assessment.** Cutaneous SCC and adjacent actinic keratosis follow the caption and are kept as separate labels. Keratoacanthoma or hypertrophic actinic keratosis is the relevant keratinizing mimic. Supporting points now say "raised keratotic focus," not that the image itself proves which focus was marked or that the crop shows actinically damaged skin.

**Diagnosis evidence.** Uploader caption only, including grade, site, biopsy marking and the adjacent actinic keratosis. The confidence note already refuses an unseen pathology report.

**Teaching value.** Compare the raised keratotic lesion with the flatter neighbor before using the caption's two labels, and do not treat a familiar thin neighbor as reassurance about the thicker focus.

**Potential concerns.** "Well-differentiated" is a histologic grade stated in the caption without a linked report. Ink is adjacent to both lesions. The post-reveal interpretation still uses the caption's AK–SCC pairing; it no longer calls the skin in the crop "damaged."

**Recommendation:** Ready for clinician review

## Corrections made before this pack

Substantive wording edits are listed in the pull request. No case was marked reviewed. Fingerprints above are the post-edit values from `scripts/case.js` / `scripts/review-governance.js`. Actinic keratosis case fingerprint did not change.

## Clinician checklist

Complete by hand. Do not treat an empty line as agreement. Do not copy this pack into `review-data.js` without a separate human decision on the exact fingerprint above.

### case-acral-melanoma-plantar

- [ ] Final diagnosis matches source
- [ ] Diagnostic certainty accurate
- [ ] Visible findings correctly described
- [ ] No non-visible structures claimed
- [ ] Differential clinically reasonable
- [ ] Pre-Reveal does not disclose answer
- [ ] Post-Reveal teaching accurate
- [ ] Source attribution correct
- [ ] License acceptable
- [ ] No misleading management recommendation
- [ ] Case appropriate for educational publication

Clinician decision: __________________

Clinician notes: __________________

### case-bcc-nodular-dermoscopy

- [ ] Final diagnosis matches source
- [ ] Diagnostic certainty accurate
- [ ] Visible findings correctly described
- [ ] No non-visible structures claimed
- [ ] Differential clinically reasonable
- [ ] Pre-Reveal does not disclose answer
- [ ] Post-Reveal teaching accurate
- [ ] Source attribution correct
- [ ] License acceptable
- [ ] No misleading management recommendation
- [ ] Case appropriate for educational publication

Clinician decision: __________________

Clinician notes: __________________

### case-bcc-pigmented-dermoscopy

- [ ] Final diagnosis matches source
- [ ] Diagnostic certainty accurate
- [ ] Visible findings correctly described
- [ ] No non-visible structures claimed
- [ ] Differential clinically reasonable
- [ ] Pre-Reveal does not disclose answer
- [ ] Post-Reveal teaching accurate
- [ ] Source attribution correct
- [ ] License acceptable
- [ ] No misleading management recommendation
- [ ] Case appropriate for educational publication

Clinician decision: __________________

Clinician notes: __________________

### case-ak-field-hand

- [ ] Final diagnosis matches source
- [ ] Diagnostic certainty accurate
- [ ] Visible findings correctly described
- [ ] No non-visible structures claimed
- [ ] Differential clinically reasonable
- [ ] Pre-Reveal does not disclose answer
- [ ] Post-Reveal teaching accurate
- [ ] Source attribution correct
- [ ] License acceptable
- [ ] No misleading management recommendation
- [ ] Case appropriate for educational publication

Clinician decision: __________________

Clinician notes: __________________

### case-scc-ak-paraspinal

- [ ] Final diagnosis matches source
- [ ] Diagnostic certainty accurate
- [ ] Visible findings correctly described
- [ ] No non-visible structures claimed
- [ ] Differential clinically reasonable
- [ ] Pre-Reveal does not disclose answer
- [ ] Post-Reveal teaching accurate
- [ ] Source attribution correct
- [ ] License acceptable
- [ ] No misleading management recommendation
- [ ] Case appropriate for educational publication

Clinician decision: __________________

Clinician notes: __________________
