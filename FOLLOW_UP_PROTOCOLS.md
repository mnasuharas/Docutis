# German guideline-based dermato-oncology follow-up protocols

The follow-up module is a structured clinical reference for physicians. Its interface language is English and its first guideline jurisdiction is Germany (`DE`); those are independent concerns. Official German guideline titles remain in their original language for accurate provenance. The module does not calculate stage, replace the source guideline or provide patient-specific advice. Every protocol is currently `clinician review required`.

## Implementation matrix

The following matrix was transcribed conservatively from the cited official German guideline sections. A dash in a source table is represented as `not_routinely_scheduled`; an omitted modality is shown as not specified rather than inferred to be unnecessary.

| Disease / group | Period | Clinical examination | Lymph-node ultrasound | Laboratory | Imaging | Guideline |
| --- | --- | --- | --- | --- | --- | --- |
| Melanoma in situ / Stage 0 | No structured interval specified | Not specified | Not specified | S100B: not specified | Not specified | German S3 v3.3; the schedule for invasive melanoma begins at IA |
| Melanoma IA | Years 1–3 / 4–5 / 6–10 | 6 / 12 / 12 months | — | — | — | German S3 v3.3, sections 8.3 and 8.4.8 |
| Melanoma IB–IIB | Years 1–3 / 4–5 / 6–10 | 3 / 6 / 6–12 months | 6 months in years 1–3 only, after correct sentinel-node staging; otherwise follow IIC | S100B 3 months in years 1–3 | — | German S3 v3.3 |
| Melanoma IIC–IV, R0 resected | Years 1–3 / 4–5 / 6–10 | 3 / 3 / 6 months | 3 / 6 months / — | S100B 3 / 6 months / — | 6 months in years 1–3 | German S3 v3.3 |
| BCC, isolated surgically treated and low recurrence risk | 6 months / thereafter | One control at 6 months, then annually | Not specified | Not specified | Not specified | German S2k v9.0, chapter 12 |
| BCC, multiple / high recurrence risk / locally advanced / metastatic / syndromic | Years 1–2 / after >2 event-free years | 3 months / annually only if no new BCC or recurrence for >2 years | Not specified | Not specified | Not specified | German S2k v9.0 |
| cSCC, low risk | Years 1–2 / 3–5 / 6–10 | 6 / 12 months / no fixed tumor-specific interval | 0–2 times/year in years 1–2 only for an unclear palpation finding | Not specified | Not specified | German S3 v2.0, statement/recommendations 9.2–9.6 |
| cSCC, high risk | Years 1–2 / year 3 / years 4–5 / years 6–10 | 3 / 6 / 6 / 12 months | 1–4 / 0–2 / 0–2 times/year / —, risk-adapted | Not specified | 0–2 times/year through year 3 only for perineural growth | German S3 v2.0 |
| cSCC, immunosuppression | Years 1–2 / year 3 / years 4–5 / years 6–10 | 3 / 3–6 / 3–6 / 3–6 months | 1–4 / 0–2 / 0–2 times/year / —, risk-adapted | Not specified | 0–2 times/year through year 3 only for perineural growth | German S3 v2.0 |
| cSCC, locally advanced or metastatic | Years 1–2 / year 3 / years 4–5 / years 6–10 | 3 / 3 / 3 / 3–6 months | 3 / 6 / 6 months / — | Not specified | 6 months through year 3, then no fixed routine interval | German S3 v2.0 |

Authoritative sources:

- [S3-Leitlinie Melanom, version 3.3, July 2020](https://www.leitlinienprogramm-onkologie.de/fileadmin/user_upload/Downloads/Leitlinien/Melanom/Melanom_Version_3/LL_Melanom_Langversion_3.3.pdf), AWMF register 032/024OL.
- [German melanoma patient guideline: follow-up and early detection](https://register.awmf.org/assets/guidelines/032-024OLp_S3_Melanom-Diagnostik-Therapie-Nachsorge_2020-08_1.pdf), which explicitly states that the physician guideline does not address follow-up for melanoma in situ.
- [S2k-Leitlinie Basalzellkarzinom, version 9.0, 2023 update; AWMF metadata records revision January 2024](https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf), AWMF register 032-021.
- [S3-Leitlinie Aktinische Keratose und Plattenepithelkarzinom der Haut, version 2.0, December 2022](https://www.leitlinienprogramm-onkologie.de/fileadmin/user_upload/Downloads/Leitlinien/Aktinische_Keratosen_und_PEK/Version_2/LL_Aktinische_Keratose_und_PEK_Langversion_2.0.pdf), AWMF register 032/022OL.

The melanoma sources and scope were rechecked on 2026-09-17; BCC and cSCC source metadata was checked on 2026-09-16. These checks confirm recorded identity, scope and links only; they are not clinical review and do not establish that a recommendation remains current.

The pre-release source audit corrected the cSCC identity from an evidence-document-style `2.01 / May 2022` reference to the official main long guideline `2.0 / December 2022`, including its canonical URL and pages. It also aligned the locally advanced/metastatic cSCC clinical schedule with statement 9.2, retained the perineural-growth condition on table-based imaging intervals, and encoded explicit dashes as no routine interval rather than as an unspecified modality. The BCC revision date follows AWMF metadata (`01/2024`); the source's combined intensive-risk recommendation remains one selectable group.

## Data architecture

`followup-data.js` publishes `DOCUTIS_FOLLOW_UP_DATA` independently from disease records and UI code. Each protocol has a stable disease ID, jurisdiction, official guideline metadata, stage/risk groups, time periods or an explicit non-interval guidance state, and modality recommendations. Frequencies use controlled structured forms: exact/ranged month intervals, occurrences per year or a single time point. Conditional language and recommendation strength remain attached to the relevant recommendation. Guideline publication, source metadata check date and physician review remain separate facts.

The modality registry currently contains clinical examination, lymph-node ultrasound, S100B and cross-sectional imaging. Missing modalities are not converted into a negative recommendation. The UI explicitly distinguishes `not specified` from `not routinely scheduled`: the former means the selected guideline does not supply a recommendation, while the latter represents an explicit source-schedule state. Neither should be inferred from the other.

The current German S3 melanoma guideline does not define a specific structured follow-up schedule for melanoma in situ. It therefore uses one `timingStatus: "not_specified"` guidance period with `range: null`; all four modalities are explicitly `not_specified`, have no frequency and claim no recommendation character or consensus. Validation rejects fabricated ranges, frequencies, recommendation strength or incomplete modality coverage for this state. The stage IA schedule is not reused. EADO context is intentionally omitted from Goal 5.1 to keep the German recommendation and any future European context clearly separate.

To add a disease, add one protocol with a stable ID and an existing disease ID, cite an authoritative guideline, add all source-defined groups and periods, then extend the integrity and UI tests. To add a jurisdiction, add another protocol with the same disease ID and a different jurisdiction code; do not add a selector until validated data exists for more than one jurisdiction.

Run:

```shell
node scripts/follow-up.js
node scripts/clinical-review.js --follow-up cutaneous-melanoma
node scripts/clinical-review.js --validate
node --test tests/*.test.js
```

The first command validates schema, sources, ranges, frequencies, duplicate/conflicting recommendations and clinical-review state. The fingerprint command is read-only and does not perform clinical review.

## Governance and update policy

The Goal 4 review states and metadata apply unchanged. A protocol fingerprint includes disease and jurisdiction identity, guideline title/version/date/source and recommendation location, every group and period identity, descriptions, timing status, ranges, modalities, frequencies, recommendation status, clinical conditions, recommendation character, consensus and notes. It excludes review metadata, the source metadata check date, presentation-only disease/jurisdiction/group/period labels and array ordering used purely for display.

Changing a clinical recommendation or replacing a guideline makes an existing physician review stale. A new guideline publication must trigger manual clinical reassessment; a working URL or automated metadata check cannot preserve review automatically.

## European comparison and limits

The 2024 EADO melanoma guideline uses different stage groupings and, for example, separates IB–IIA from IIB–IIIC and proposes stage-specific imaging schedules. The current module does not combine that guidance with the German S3 schedule. EADO/European data can later coexist as a separate jurisdiction/guideline protocol after independent research and clinical review.

The three current German protocols remain unreviewed drafts. In particular, a dermatologist must confirm the cSCC risk definitions, conditional ultrasound/imaging bands, the interpretation of statement 9.2 alongside recommendations 9.3–9.6, and the distinction between table dashes and modalities absent from the section. Use [GOAL5_CLINICAL_REVIEW.md](GOAL5_CLINICAL_REVIEW.md) for row-by-row sign-off.
