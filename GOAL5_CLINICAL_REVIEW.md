# Goal 5 physician review worksheet

This worksheet presents the values encoded in `followup-data.js` without requiring a reviewer to read JavaScript. It is a source-verification aid, not proof of physician review. Every checkbox is intentionally empty; all three protocols remain `clinician review required` with `clinicalReview: null`.

## Source identity

| Disease | Guideline | Version/date | AWMF | Authoritative source |
| --- | --- | --- | --- | --- |
| Melanoma | S3-Leitlinie zur Diagnostik, Therapie und Nachsorge des Melanoms | 3.3, July 2020 | 032/024OL | [Official long guideline](https://www.leitlinienprogramm-onkologie.de/fileadmin/user_upload/Downloads/Leitlinien/Melanom/Melanom_Version_3/LL_Melanom_Langversion_3.3.pdf) |
| BCC | S2k-Leitlinie Basalzellkarzinom der Haut (Aktualisierung 2023) | 9.0, AWMF revision January 2024 | 032-021 | [Official long guideline](https://register.awmf.org/assets/guidelines/032-021l_S2k_Basalzellkarzinom-der-Haut_2024-07.pdf) |
| cSCC | S3-Leitlinie Aktinische Keratose und Plattenepithelkarzinom der Haut | 2.0, December 2022 | 032/022OL | [Official long guideline](https://www.leitlinienprogramm-onkologie.de/fileadmin/user_upload/Downloads/Leitlinien/Aktinische_Keratosen_und_PEK/Version_2/LL_Aktinische_Keratose_und_PEK_Langversion_2.0.pdf) |

Legend: **NR** = the source schedule explicitly has no routine interval; **NS** = the selected guideline section does not specify that modality; **conditional** = apply only under the stated source condition. `×/year` preserves the source table's frequency rather than converting it to false precision.

## Melanoma

- [ ] Physician sign-off: melanoma in situ / Stage 0 non-interval guidance and `not specified` semantics
- [ ] Physician sign-off: stage IA rows and source conditions
- [ ] Physician sign-off: stage IB–IIB rows, including the sentinel-node-staging condition
- [ ] Physician sign-off: stage IIC–IV R0 rows

| Disease | Risk/stage | Period | Clinical exam | LN ultrasound | Laboratory | Imaging | Source |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Melanoma | Melanoma in situ / Stage 0 | No structured interval specified | NS | NS | S100B: NS | NS | German S3 v3.3; invasive follow-up schedule begins at IA |
| Melanoma | IA | Years 1–3 | Every 6 months | NR | S100B: NR | NR | Recommendation 8.11, p. 182 |
| Melanoma | IA | Years 4–5 | Every 12 months | NR | S100B: NR | NR | Recommendation 8.11, p. 182 |
| Melanoma | IA | Years 6–10 | Every 12 months | NR | S100B: NR | NR | Recommendation 8.11, p. 182 |
| Melanoma | IB–IIB | Years 1–3 | Every 3 months | Every 6 months, only after correct pathological sentinel-node staging; otherwise follow IIC | S100B every 3 months | NR | Recommendation 8.11, p. 182 |
| Melanoma | IB–IIB | Years 4–5 | Every 6 months | NR | S100B: NR | NR | Recommendation 8.11, p. 182 |
| Melanoma | IB–IIB | Years 6–10 | Every 6–12 months | NR | S100B: NR | NR | Recommendation 8.11, p. 182 |
| Melanoma | IIC–IV, R0 resected | Years 1–3 | Every 3 months | Every 3 months | S100B every 3 months | Every 6 months | Recommendation 8.11, p. 182 |
| Melanoma | IIC–IV, R0 resected | Years 4–5 | Every 3 months | Every 6 months | S100B every 6 months | NR | Recommendation 8.11, p. 182 |
| Melanoma | IIC–IV, R0 resected | Years 6–10 | Every 6 months | NR | S100B: NR | NR | Recommendation 8.11, p. 182 |

Recommendation character in the implementation: `sollte (EK)`; consensus strength 100%.

For melanoma in situ, the German S3 guideline does not define a specific structured follow-up schedule comparable to the schedules for invasive melanoma. The Stage 0 row therefore has no interval, recommendation character or consensus value. `NS` must not be interpreted as a recommendation against clinical assessment or as permission to reuse the stage IA schedule.

## Basal cell carcinoma

- [ ] Physician sign-off: isolated surgically treated / low-recurrence-risk BCC
- [ ] Physician sign-off: the combined multiple/high-risk/locally advanced/metastatic/syndromic group and its event-free condition

| Disease | Risk/stage | Period | Clinical exam | LN ultrasound | Laboratory | Imaging | Source |
| --- | --- | --- | --- | --- | --- | --- | --- |
| BCC | Isolated surgically treated and low recurrence risk | 6 months after treatment | One examination at 6 months to exclude local recurrence | NS | NS | NS | Chapter 12, pp. 60–61 |
| BCC | Isolated surgically treated and low recurrence risk | Thereafter | Annually | NS | NS | NS | Chapter 12, pp. 60–61 |
| BCC | Multiple / high recurrence risk / locally advanced / metastatic / syndromic | Years 1–2 | Every 3 months; individually closer follow-up is possible | NS | NS | NS | Chapter 12, pp. 60–61 |
| BCC | Same combined group | After more than 2 event-free years | Annually only if no new BCC and no recurrence occurred for more than 2 years | NS | NS | NS | Chapter 12, pp. 60–61 |

The source gives the intensive indications as one combined recommendation; the implementation therefore does not create separate clinical schedules for each indication. Recommendation character: `soll`; consensus: `Konsens`.

## Cutaneous squamous cell carcinoma

- [ ] Physician sign-off: low-risk definition, clinical examination and conditional ultrasound
- [ ] Physician sign-off: high-risk definition and risk-adapted ultrasound
- [ ] Physician sign-off: perineural-growth condition on high-risk/immunosuppressed imaging
- [ ] Physician sign-off: immunosuppressed schedule
- [ ] Physician sign-off: locally advanced/metastatic clinical, ultrasound and imaging schedule
- [ ] Physician sign-off: distinction between NR and NS in every row

| Disease | Risk/stage | Period | Clinical exam | LN ultrasound | Laboratory | Imaging | Source |
| --- | --- | --- | --- | --- | --- | --- | --- |
| cSCC | Low risk | Years 1–2 | Every 6 months | Conditional 0–2×/year for unclear palpation findings | NS | NR | Statement 9.2; recommendations 9.3–9.6, pp. 240–243 |
| cSCC | Low risk | Years 3–5 | Every 12 months | NR | NS | NR | Same |
| cSCC | Low risk | Years 6–10 | NR | NR | NS | NR | Same |
| cSCC | High risk | Years 1–2 | Every 3 months | Conditional 1–4×/year, risk-adapted | NS | Conditional 0–2×/year for perineural growth | Same |
| cSCC | High risk | Year 3 | Every 6 months | Conditional 0–2×/year, risk-adapted | NS | Conditional 0–2×/year for perineural growth | Same |
| cSCC | High risk | Years 4–5 | Every 6 months | Conditional 0–2×/year, risk-adapted | NS | NR | Same |
| cSCC | High risk | Years 6–10 | Every 12 months | NR | NS | NR | Same |
| cSCC | Immunosuppressed | Years 1–2 | Every 3 months | Conditional 1–4×/year, risk-adapted | NS | Conditional 0–2×/year for perineural growth | Same |
| cSCC | Immunosuppressed | Year 3 | Every 3–6 months | Conditional 0–2×/year, risk-adapted | NS | Conditional 0–2×/year for perineural growth | Same |
| cSCC | Immunosuppressed | Years 4–5 | Every 3–6 months | Conditional 0–2×/year, risk-adapted | NS | NR | Same |
| cSCC | Immunosuppressed | Years 6–10 | Every 3–6 months, individualized | NR | NS | NR | Same |
| cSCC | Locally advanced / metastatic | Years 1–2 | Every 3 months | Every 3 months | NS | Every 6 months | Same |
| cSCC | Locally advanced / metastatic | Year 3 | Every 3 months | Every 6 months | NS | Every 6 months | Same |
| cSCC | Locally advanced / metastatic | Years 4–5 | Every 3 months | Every 6 months | NS | NR | Same |
| cSCC | Locally advanced / metastatic | Years 6–10 | Every 3–6 months | NR | NS | NR | Same |

The clinical examination includes whole-skin inspection and inspection/palpation of the primary excision site, in-transit pathway and regional lymph-node stations. The implementation records `soll` for clinical examination and `sollte` for lymph-node ultrasound and cross-sectional imaging, with `Starker Konsens`. Table-only NR states retain the statement's `Konsens`.

## Attestation procedure

1. Compare every row and condition with the cited official guideline.
2. Record disagreements in the pull request; correct the data and rerun all validation before attestation.
3. Follow `CLINICAL_REVIEW.md` to record physician role, specialty, review date and the matching deterministic fingerprint.
4. Do not mark a protocol reviewed merely because its schema, links or tests pass.
