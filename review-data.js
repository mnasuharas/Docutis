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
    }
  ]
});
}));
