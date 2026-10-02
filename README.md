# Docutis

**An open-source, structured dermatology reference and education toolkit.**

[View the live application](https://mnasuharas.github.io/Docutis/)

[![Validate](https://github.com/mnasuharas/Docutis/actions/workflows/validate.yml/badge.svg)](https://github.com/mnasuharas/Docutis/actions/workflows/validate.yml)

## About

Docutis is an open-source educational and professional reference. It presents dermatology information in a searchable, structured format for physicians, medical trainees and other healthcare professionals. It is not a substitute for individual care, diagnosis, treatment or a current guideline.

**Maturity:** active development, and a public preview / pre-release. Some assets have a published clinician review. Most content is still review required. This site is not production-ready, not clinically validated decision support, and not a statement that every record has been clinician reviewed.

Live site: [https://mnasuharas.github.io/Docutis/](https://mnasuharas.github.io/Docutis/)

Clinical review is version-bound and independently tracked for disease records, quiz items, visual assets, follow-up protocols and case-based learning units. The public dashboard and `review-status.json` distinguish human review from automated validation. AI interpretation is not clinician review. Release notes for older tags are point-in-time and may not match current `main`.

### Two states: current `main` / live site versus this development branch

- **Current `main` and the live site** (tag `v0.2.0-preview.1`, commit `c28f1de`): 50 condition records, the five pilot cases, and 28 public review units, of which 5 are clinician reviewed and 23 are review required.
- **This development branch** (stacked Goals 18 to 25, pull requests #24 to #30 and the Goal 25 pull request): 38 cases, 9 true clinical-dermoscopic pairs, and 61 review units, of which 5 are clinician reviewed and 56 are review required. This work is not merged to `main` and is not live. Clinical review is deferred: no Goal 18 to 25 case or pattern is clinician reviewed, and no physician decision was created for them.

Goal 25 (development branch only) adds six histopathology-labelled clinical and dermoscopic pairs from CC BY 4.0 open-access articles: 4 histopathology-confirmed true paired melanoma cases (melanoma in situ, amelanotic nodular melanoma, acral melanoma in situ, and lentigo maligna) and 2 benign mimics that share a feature with a melanoma case (a nevus with cytologic atypia and a facial solar lentigo). Three confirmations come from a figure-caption sentence about that lesion (melanoma in situ, nevus with cytologic atypia, nodular melanoma) and three from a study-level methods statement (acral melanoma in situ, lentigo maligna, solar lentigo); each case record names its basis in `histopathologySource`. Panels were cropped from composite figures with recorded pixel boxes and hashes. Every candidate checked, including 31 Goal 25 candidates, is in `acquisition-ledger.js`; rejected rows never become cases.

Goal 18 adds a Learn Melanoma pathway on top of that flow. It is a teaching sequence, not a certificate and not evidence that the cases improve diagnostic skill. No case is clinician reviewed. Goal 19 adds teaching types, observation prompts, qualitative feature weights, and a closest mimic on the academy cases only. It does not add cases, does not claim that learners improve, and does not review any case. The five pilot payloads were not edited. Pull request #21 was not the base, and Goal 18 pull request #24 was not merged. Goal 10 adds a public OSS surface: About/project-status copy, repository and roadmap/changelog links, and “Suggest a correction” / “Report outdated evidence” CTAs that open the clinical content issue form. Docutis remains a public preview and is not validated clinical decision support.

The current site contains 50 condition records. It retains the malignant and precancerous collection, the first common-dermatology package, and a new infectious-dermatology package spanning bacterial, dermatophyte, other fungal, parasitic and viral disease. It is intended for physicians, medical trainees and other healthcare professionals seeking a concise educational reference.

Docutis is currently in active early development. Its content, structure and technical foundations are being expanded progressively.

## Current Features

- Searchable dermatologic condition library
- Compact clinical-reference landing surface with visible coverage counts and keyboard-focused search
- Public evidence-status dashboard with live review, profile, media and follow-up counts
- Organization by clinical category
- Structured condition detail pages with persistent section navigation and progressive source disclosure
- Clinical features
- Dermoscopic findings
- Differential diagnoses
- Explicitly labelled ICD-10 WHO diagnosis classification and ICD-O oncology coding, where verified
- Treatment overviews
- Follow-up considerations
- Links to external clinical references
- Responsive browser-based interface
- Optional governed educational-media architecture with license, attribution, accessibility and independent review metadata
- Four original governed SVG learning schematics, an eight-question clinical-pattern quiz and a case-based learning foundation with open-license pilot cases
- Section-level evidence maps for the eight structured pilot records
- URL-addressable condition details such as `?condition=acne-vulgaris`, including browser Back/Forward support
- Dependency-free automated validation on pull requests and `main` pushes
- No installation or account required
- English-language dermato-oncology follow-up UI based on German guidelines for melanoma, BCC and cSCC

## Current Clinical Focus

The collection includes:

- Keratinocyte carcinomas and precursor lesions
- Melanocytic malignancies and melanoma in situ
- Rare cutaneous malignancies
- Selected adnexal and soft-tissue tumors
- Atopic, contact and seborrheic dermatitis
- Plaque psoriasis and chronic urticaria
- Acne vulgaris and rosacea
- Vitiligo
- Common bacterial infections including impetigo, folliculitis, erysipelas and erythrasma
- Dermatophyte infections of skin, scalp, feet, groin and nails
- Cutaneous candidiasis and pityriasis versicolor
- Scabies
- Herpes simplex, herpes zoster, molluscum contagiosum and cutaneous warts

The infectious package completes the initial 50-record milestone, but does not make the collection comprehensive. Autoimmune, immunobullous, connective-tissue, hair, nail and many other dermatology domains remain future work.

## Content Principles

Docutis aims to make medical information:

- Structured and easy to navigate
- Concise without losing essential clinical context
- Supported by reputable guidelines and scientific references
- Transparent about uncertainty and limitations
- Suitable for independent professional review

Medical content contributions should include appropriate references. Legacy embedded `reviewStatus` fields on the 50 disease records remain `clinician review required`. The public review layer is different and is summarized under Clinical governance below. New or substantially changed medical content stays review required until a qualified clinician documents review of that version. Do not describe the whole collection as clinician reviewed.

## Clinical governance

Clinical review governance distinguishes automated source/schema validation from a physician's personal review of a specific content version. Legacy embedded `reviewStatus` fields on disease records remain `clinician review required` for all 50 records. The authoritative public Goal 9 layer (`review-status.json`) currently marks **5** pilot assets as `clinician reviewed` (actinic keratosis and basal cell carcinoma disease records, BCC follow-up, BCC quiz item, BCC schematic) and the remaining Goal 9 units as `review required`.

`clinicalReview` is null until a physician review is documented. A reviewed record stores the date, physician role, specialty and a deterministic content fingerprint. Local validation and CI reject stale fingerprints after clinical changes; contributors must obtain re-review or reset the record to review-required. A matching hash does not establish reviewer credentials or guarantee correctness. See [CLINICAL_REVIEW.md](CLINICAL_REVIEW.md) for the human procedure and the read-only `node scripts/clinical-review.js "Acne Vulgaris"` utility.

The public Evidence Status dashboard reports these states directly from the published data. `GOAL8_CLINICAL_REVIEW_BATCH.md` prepares the eight structured pilot records for real physician review but contains no completed attestation.

## German guideline-based dermato-oncology follow-up

The follow-up module uses English clinical UI terminology while its current guideline jurisdiction remains Germany. Official German guideline titles are retained in provenance so the cited documents remain unambiguous. Clinicians can select the disease, guideline-defined stage/risk group and follow-up period or guidance state to view modality-specific intervals and conditions. Guideline identity, AWMF register number, version, official source, metadata-check date and clinical-review state are available in the provenance disclosure.

Melanoma in situ (Stage 0) is represented as structured guidance without a fabricated German S3 interval. The formal German S3 risk-adapted tables begin with Stage IA, while separately identified German expert information supports at least annual dermatologic full-skin examination, shorter intervals for additional melanoma risk factors and monthly skin self-examination. Routine lymph-node ultrasound, S100B and cross-sectional imaging are shown as not routinely scheduled for Stage 0; symptoms or another clinical indication remain outside routine surveillance. A subordinate international-context note summarizes AAD support for ongoing risk-adapted dermatologic surveillance without presenting it as German S3 guidance.

Protocols live in `followup-data.js`, separate from disease records and rendering. The schema supports multiple jurisdictions for a disease, but the current site displays Germany only; it does not expose an unsupported jurisdiction switch. In the public review layer the BCC German protocol is clinician reviewed; the melanoma and cSCC German protocols remain review required. Embedded follow-up review fields are a separate compatibility layer. See [CLINICAL_REVIEW.md](CLINICAL_REVIEW.md). See [FOLLOW_UP_PROTOCOLS.md](FOLLOW_UP_PROTOCOLS.md) for the implementation matrix, authoritative sources, schema, update policy and extension procedure; [GOAL5_CLINICAL_REVIEW.md](GOAL5_CLINICAL_REVIEW.md) is the uncompleted dermatologist review worksheet.

## Project Status

Docutis is an early-stage public prototype and should not yet be considered a comprehensive dermatology database.

The project currently has 50 records. The initial numeric milestone is complete, but broader dermatology coverage and documented clinician review of every record are not yet complete.

Current development priorities include:

- Separating medical data from application logic
- Introducing a consistent disease-data structure
- Improving reference quality and review tracking
- Extending automated validation while keeping network-dependent link checks outside routine CI
- Improving accessibility and filtering
- Establishing a transparent medical content review process
- Preparing multilingual support
- Developing educational visual content with appropriate licensing

Case-learning capabilities on the development branch: a five-step case flow (inspect, observe, differential, reveal, review) in which a true pair shows the clinical frame and an initial differential before the dermoscopic frame, pair provenance for every case, reusable pattern objects with case-level certainty and weight, explicit contrastive comparisons, and a source acquisition ledger. Development-branch metrics: 38 cases, 9 true clinical-dermoscopic pairs (7 pattern-rich, 2 equivocal), 4 histopathology-confirmed true paired melanoma cases, and 61 review units. Run `node scripts/paired-modality.js` for the current list. These are qualitative teaching counts, not a score and not evidence of educational efficacy.

See [ROADMAP.md](ROADMAP.md) for completed foundations, known gaps, the medical review workflow and release direction.

## Repository structure

The live site is static HTML, CSS and JavaScript. No build step and no package install.

- `index.html`, `style.css`, `app.js` — condition library
- `data.js` — 50 condition records
- `followup-data.js`, `followup-app.js` — German dermato-oncology follow-up UI
- `quiz-data.js`, `quiz-app.js` — eight-question educational quiz
- `case-data.js`, `case-app.js` — on this development branch, 38 cases: five pilots, 16 Goal 18 cases, 8 Goal 21 cases, 1 Goal 22 case, 2 Goal 24 cases and 6 Goal 25 cases (diagnosis stays hidden until reveal). `main` has the five pilots only. `academy-review.html` is the generated reviewer workspace, not a learner step.
- `pattern-data.js` — 40 reusable pattern objects (development branch). A pattern is not a diagnosis and stays review required.
- `acquisition-ledger.js` — source candidates checked for case acquisition, with accepted and rejected status. Operational metadata, not clinical content.
- `media-data.js` and `assets/media/` — four original SVG schematics; case images are separate
- `review-data.js`, `review-status.json` — published clinical-review decisions
- `scripts/` and `tests/` — dependency-free checks
- Human review procedure: [CLINICAL_REVIEW.md](CLINICAL_REVIEW.md) (do not treat this README as the full policy)

## Technology

The current application uses:

- HTML
- CSS
- JavaScript
- GitHub Pages

Medical records live in `data.js`; `app.js` contains filtering, rendering and interaction behavior. Records include a broad category, a structured subcategory, coding-system metadata, source metadata, and review status. This separation keeps content review focused and preserves the dependency-free static architecture.

Goal 7 adds an optional versioned `clinicalProfile` for structured morphology, localization, symptoms, diagnostic workflow, concise differential clues, treatment hierarchy, medication-regimen metadata, follow-up strategy, red flags, referral and oncology context. Eight representative records use the profile; the remaining 42 continue through the legacy-compatible renderer. See [CLINICAL_SCHEMA.md](CLINICAL_SCHEMA.md) and [CONTENT_QUALITY_AUDIT.md](CONTENT_QUALITY_AUDIT.md). Structured clinical fields are still drafts requiring physician review.

Optional educational media lives separately in `media-data.js`. Goal 8 includes four project-authored SVG schematics for melanoma, basal cell carcinoma, plaque psoriasis and acne vulgaris. They contain no patient imagery, are registered as `Project-owned`, and include accessible titles and descriptions. In the public review layer the BCC schematic is clinician reviewed; the other three schematics remain review required. Embedded media review fields are a separate compatibility layer. See [MEDIA_GOVERNANCE.md](MEDIA_GOVERNANCE.md).

Quiz content lives in `quiz-data.js`, separate from `quiz-app.js`. Eight one-best-answer questions link to the structured pilot records and their attached sources. The quiz stores no account, score or analytics data and is explicitly educational rather than clinical decision support.

Follow-up protocols live in `followup-data.js`; `followup-app.js` renders the selectors, recommendations and provenance. `scripts/follow-up.js` performs offline integrity validation, while the existing clinical-review utility fingerprints both disease records and follow-up protocols.

Each reference has its own `metadataCheckedAt` date. This date means only that the reference's bibliographic metadata and link were checked on that date; it is not a publication date, clinical review date, or endorsement of the adjacent medical content.

Coding data is educational metadata, not billing guidance. ICD-10 WHO is kept distinct from national modifications, and ICD-O topography is kept distinct from morphology and behavior. Non-neoplastic records explicitly mark ICD-O as `not applicable`; unresolved oncology mappings use `not established` rather than fabricated codes. Site-specific or jurisdiction-specific coding must be confirmed from the applicable official release.

The project intentionally begins with a lightweight architecture so that it remains easy to inspect, maintain and contribute to.

## Running Locally

No build process is currently required.

1. Download or clone the repository.
2. Open `index.html` in a modern web browser.

To run the same dependency-free syntax and test checks used by GitHub Actions with a current Node.js installation:

```shell
node --check data.js
node --check clinical-schema.js
node --check scripts/clinical-schema.js
node --check app.js
node --check media-data.js
node --check scripts/media.js
node --check quiz-data.js
node --check quiz-app.js
node --check scripts/quiz.js
node --check review-data.js
node --check review-status.js
node --check review-ui.js
node --check scripts/review-governance.js
node --check scripts/review-batch.js
node --check followup-data.js
node --check followup-app.js
node --check scripts/clinical-review.js
node --check scripts/follow-up.js
node scripts/clinical-review.js --validate
node scripts/clinical-schema.js
node scripts/follow-up.js
node scripts/media.js
node scripts/quiz.js
node scripts/case.js
node scripts/review-governance.js
node --test tests/*.test.js
git diff --check
```

`node scripts/review-governance.js` also validates case data. To confirm generated review artifacts are unchanged, run `node scripts/review-governance.js --write` and `node scripts/review-batch.js --write`, then `git diff --exit-code -- review-status.json review-status.js GOAL9_HUMAN_REVIEW_GATE.md goal9-review-decisions.template.json`. Those write commands must not be used to refresh a fingerprint after a clinical edit.

The `.github/workflows/validate.yml` workflow runs these checks for pull requests targeting `main`, pushes to `main`, and manual dispatches. It uses a read-only token and does not deploy the site or make network requests to medical sources.

Cross-browser engineering notes, including which browsers were actually executed, are in [BROWSER_COMPATIBILITY.md](BROWSER_COMPATIBILITY.md). That file is not medical validation.

## Contributing

Contributions, suggestions and bug reports are welcome.

Start with [CONTRIBUTING.md](CONTRIBUTING.md), the GitHub issue templates (bug, clinical correction, evidence update, feature, media/license), and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Report vulnerabilities as described in [SECURITY.md](SECURITY.md). Medical corrections and broken references are not security issues.

Before proposing substantial medical content changes, please include reliable and current references and clearly describe the reason for the change. Clinical review rules are in [CLINICAL_REVIEW.md](CLINICAL_REVIEW.md). Release wording, if a release is ever cut, is described in [RELEASES.md](RELEASES.md). No release is published by these documents.

On the live site, **Suggest a correction** and **Report outdated evidence** open GitHub issue forms. Visitors do not need repository file names. Case links omit diagnosis-bearing case ids until the learner reveals the diagnosis.

## Medical Disclaimer

Docutis is intended for educational and informational purposes only.

It does not replace professional medical judgment, diagnosis, treatment decisions or consultation of current clinical guidelines. Medical information must be independently verified before being used in clinical decision-making.

## License

Source code and the project documentation are under the [MIT License](LICENSE).

The MIT license does not relicense images. Each image keeps the license recorded on that asset. The four SVG schematics in `media-data.js` are `Project-owned`. The five pilot case images remain CC BY 4.0 (four) or CC BY-SA 4.0 (one). Sixteen Goal 18 case images are public domain (13) or CC BY 4.0 (3). On the development branch, Goal 21 adds nine images (five CC BY-SA 4.0, two CC BY 4.0, one CC0 1.0, one public domain), Goal 22 one CC BY-SA 4.0 image, Goal 24 four CC BY-SA 4.0 images, and Goal 25 twelve CC BY 4.0 panels cropped from open-access figures with attribution to the article authors. No image was relicensed. New media needs its own source URL, license and attribution. See [MEDIA_GOVERNANCE.md](MEDIA_GOVERNANCE.md) and [CASE_LICENSING.md](CASE_LICENSING.md).
