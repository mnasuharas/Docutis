/* Public human-review decisions only. Never place private reviewer data in this file. */
(function (root, factory) {
  "use strict";
  const value = factory();
  if (typeof module === "object" && module.exports) module.exports = value;
  if (root) root.DOCUTIS_REVIEW_DATA = value;
}(typeof window === "object" ? window : null, function () {
  "use strict";

  function freezeDeep(value) {
    if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
    if (Array.isArray(value)) {
      value.forEach(freezeDeep);
      return Object.freeze(value);
    }
    Object.keys(value).forEach(key => { value[key] = freezeDeep(value[key]); });
    return Object.freeze(value);
  }

  return freezeDeep({
  "schemaVersion": 1,
  "attestationVersion": "docutis-human-clinical-review-v1",
  "reviewers": [
    {
      "id": "reviewer-mna-001",
      "displayName": "Murat Nasuh Aras",
      "professionalRole": "Physician in dermatology specialty training",
      "specialtyOrField": "Dermatology and Venereology — physician in specialty training",
      "trainingStatus": "physician in specialty training",
      "publicDisplayConsent": true
    }
  ],
  "decisions": [
    {
      "id": "decision-ak-2026-09-23-001",
      "assetId": "actinic-keratosis",
      "assetType": "disease",
      "contentFingerprint": "sha256-v1:92302d680f4c645cc1a91c9a827a3e44b0d965fa21fa019144458bd81c27a1dd",
      "schemaVersion": 1,
      "reviewerId": "reviewer-mna-001",
      "reviewerRole": "Physician in dermatology specialty training",
      "reviewDate": "2026-09-23",
      "reviewedSections": [
        "overview",
        "clinical-presentation",
        "diagnostics",
        "dermoscopy",
        "differential-diagnosis",
        "treatment",
        "follow-up",
        "coding",
        "references",
        "histopathology",
        "red-flags",
        "referral",
        "patient-safety"
      ],
      "evidenceSourcesChecked": [
        "https://dermnetnz.org/topics/actinic-keratosis",
        "https://icd.who.int/browse10/2019/en",
        "https://klassifikationen.bfarm.de/icd-10-gm/kode-suche/htmlgm2026/block-l55-l59.htm",
        "https://onlinelibrary.wiley.com/doi/10.1111/ddg.15231",
        "https://register.awmf.org/assets/guidelines/032-022OLl_S3_Aktinische_Keratosen-Plattenepithelkarzinom-PEK_2023-01.pdf",
        "https://register.awmf.org/assets/guidelines/032-052OLl_S3_Praevention-Hautkrebs_2021-09.pdf",
        "https://www.dguv.de/bk-info/icd-10-kapitel/kapitel_12/bk5103/index.jsp",
        "https://www.ema.europa.eu/en/medicines/human/EPAR/aldara",
        "https://www.ema.europa.eu/en/medicines/human/EPAR/zyclara",
        "https://www.fachinfo.de/fi/detail/003786/efudix-r-5-creme",
        "https://www.fachinfo.de/fi/detail/23428/Klisyri-10-mg-g-Salbe",
        "https://www.fachinfo.de/fi/pdf/007858/solaraze-3-gel",
        "https://www.fachinfo.de/fi/pdf/013084/actikerall-5-mg-g-100-mg-g-loesung-zur-anwendung-auf-der-haut",
        "https://www.fachinfo.de/fi/pdf/022967/tolak-r-40-mg-g-creme"
      ],
      "verdict": "approved",
      "requiredCorrections": [],
      "reviewerNotes": "Section-by-section physician review completed. Requested clinical, terminology and source-provenance corrections were applied and verified before final approval.",
      "attestationVersion": "docutis-human-clinical-review-v1",
      "attestationText": "I confirm that I am a human reviewer and that I assessed only the content versions and sections identified by the recorded fingerprints. My decisions apply only to the recorded scope. Clinically meaningful future changes may invalidate the decisions. This educational governance review does not make Docutis an individual diagnostic or treatment service and does not guarantee completeness or universal applicability.",
      "provenance": "human-submitted",
      "supersededBy": null
    },
    {
      "id": "decision-bcc-2026-09-23-001",
      "assetId": "basal-cell-carcinoma",
      "assetType": "disease",
      "contentFingerprint": "sha256-v1:fbc2b272331822060c656dd0680da07e9131ecd3f59f071a71273748f14ad65f",
      "schemaVersion": 1,
      "reviewerId": "reviewer-mna-001",
      "reviewerRole": "Physician in dermatology specialty training",
      "reviewDate": "2026-09-23",
      "reviewedSections": [
        "overview",
        "clinical-presentation",
        "diagnostics",
        "dermoscopy",
        "differential-diagnosis",
        "treatment",
        "follow-up",
        "coding",
        "references",
        "histopathology",
        "red-flags",
        "referral",
        "patient-safety",
        "oncology"
      ],
      "evidenceSourcesChecked": [
        "https://dermnetnz.org/topics/basal-cell-carcinoma",
        "https://icd.who.int/browse10/2019/en",
        "https://klassifikationen.bfarm.de/icd-10-gm/kode-suche/htmlgm2026/block-c43-c44.htm",
        "https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf",
        "https://whobluebooks.iarc.who.int/structures/skintumours/",
        "https://www.aad.org/member/clinical-quality/guidelines/bcc",
        "https://www.dguv.de/bk-info/icd-10-kapitel/kapitel_12/bk5103/index.jsp",
        "https://www.ema.europa.eu/en/medicines/human/EPAR/ameluz",
        "https://www.ema.europa.eu/en/medicines/human/EPAR/erivedge",
        "https://www.ema.europa.eu/en/medicines/human/EPAR/libtayo",
        "https://www.ema.europa.eu/en/medicines/human/EPAR/odomzo",
        "https://www.fachinfo.de/fi/detail/003786/efudix-r-5-creme",
        "https://www.fachinfo.de/fi/detail/007185/metvix-r-160-mg-g-creme",
        "https://www.fachinfo.de/fi/pdf/003976",
        "https://www.who.int/standards/classifications/other-classifications/international-classification-of-diseases-for-oncology"
      ],
      "verdict": "approved",
      "requiredCorrections": [],
      "reviewerNotes": "Physician attestation for basal-cell-carcinoma disease asset at the recorded fingerprint only. S2k Table 2 exact 6/10/20 mm equality remains unresolved; do not invent ≥/≤ wording. Ameluz/Metvix/AAD metadata-quality items do not alter approved clinical recommendations. Related BCC assets (basal-cell-carcinoma-de, quiz, visual) remain independent unreviewed units. This decision does not apply to actinic-keratosis or any other disease.",
      "attestationVersion": "docutis-human-clinical-review-v1",
      "attestationText": "I confirm that I am a human reviewer and that I assessed only the content versions and sections identified by the recorded fingerprints. My decisions apply only to the recorded scope. Clinically meaningful future changes may invalidate the decisions. This educational governance review does not make Docutis an individual diagnostic or treatment service and does not guarantee completeness or universal applicability.",
      "provenance": "human-submitted",
      "supersededBy": null
    }
  ]
});
}));
