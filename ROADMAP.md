# Docutis Roadmap

Docutis is an early-stage educational dermatology reference. This roadmap separates implemented work from work that still requires engineering, editorial, or clinical review. Dates are intentionally not promised until maintainers and reviewers are available.

## Current baseline

### Development branch versus `main`

The Goal 18 to 25 items below are on a stacked development branch (pull requests #24 to #30 and the Goal 25 pull request). They are not yet merged to `main` and are not on the live site. Current `main` and the live site match tag `v0.2.0-preview.1` (commit `c28f1de`): 50 condition records, five pilot cases, and 28 review units (5 clinician reviewed, 23 review required). The development branch has 38 cases, 9 true clinical-dermoscopic pairs, and 61 review units (5 clinician reviewed, 56 review required). Clinical review is deferred for all Goal 18 to 25 content: no case or pattern from those Goals is clinician reviewed, and a consolidated physician review is planned after the curriculum matures.

### Implemented

- Goal 25 gold-standard dermoscopy curriculum (development branch): six clinical and dermoscopic pairs from CC BY 4.0 open-access articles with a histopathology statement, cropped from composite figures with recorded pixel boxes and hashes. They add the first histopathology-confirmed true paired melanoma cases (4), the first acral dermoscopic case, a facial lentigo maligna and solar lentigo contrast, and a nevus with cytologic atypia that shares an atypical network with a melanoma in situ from the same figure. Four reusable dermoscopic structures were added and an existing one (mixed vessels) gained its second example. The acquisition ledger records 31 Goal 25 candidates. No nail dermoscopy case was accepted. All new content is review required. No release tag was created.
- Goal 24 evidence-grade case acquisition (development branch): two source-documented clinical and dermoscopic melanoma pairs whose confirmation stays at the file label, and the first source-candidate ledger with accepted and rejected rows. No histopathology was claimed. Review required.
- Goal 22 diagnostic signal and dermoscopy depth (development branch): educational roles that keep marker ink and measuring scales out of diagnostic coverage, and one subungual haemorrhage case. Review required.
- Goal 21 contrastive curriculum expansion (development branch): sourced benign mimics, one lentigo maligna melanoma case, and stored compare-with pairs. Review required.
- Goal 23 paired clinical and dermoscopy: every case has pair provenance, the one source-documented chest pair uses a staged clinical-then-dermoscopy flow, and coverage metrics separate true pairs from same-diagnosis images. No new image was added. Clinical review remains deferred. No release tag was created.
- Goal 20 case-first pattern learning: reusable pattern objects, post-reveal in-case teaching, links derived from structured case patterns and dermoscopic tokens, and a qualitative coverage audit. No new cases or images. Pattern text stays review required and is not clinician reviewed. Case fingerprints were not rewritten. No efficacy claim. No release tag was created.
- Goal 19 professional case teaching system: teaching, reasoning, and expert-challenge labels on the existing Learn Melanoma path; observation prompts and qualitative feature weights on the 16 academy cases; a qualitative primary-path gate that is not a score; and a generated reviewer workspace. No new cases. No efficacy claim. Level 5 stays one nail-unit case because no honest second case was available. Pilot fingerprints were not edited. Pull request #21 was not the base. Goal 18 pull request #24 was not merged. No release tag was created.
- Goal 18 melanoma clinical case academy: a five-level Learn Melanoma map, skills taxonomy, and 16 additional source-labeled cases (13 melanoma-spectrum and 6 mimics in the 19-case pathway, counting three existing pilots). New cases stay review required. The pathway does not certify competence and does not claim educational efficacy. No release tag was created. Pull request #21 was not merged and was not used as the base.
- Goal 12 case learning UX: the five existing pilot cases step through inspect, observe, differential, reveal and review. Image zoom is view-only. Observations stay separate from interpretations. Differentials are an unscored disclosure. Diagnosis stays hidden until an explicit reveal. No new cases, images, clinical claims or clinician-reviewed status.
- Goal 11 case-based learning foundation: structured case registry, progressive-disclosure learner UI, offline validator/fingerprint helper, Goal 9 `case` asset type, contributor schema/licensing docs and open-license pilot cases that remain `clinician review required` until genuine physician decisions exist.
- Goal 10 public OSS surface: discoverable repository and docs links, About/project-status copy for the public preview, and sourced correction/outdated-evidence feedback CTAs that open GitHub issue forms. No clinician-reviewed claims were added.
- Goal 9 review infrastructure: public decision schema, exact fingerprints for independent pilot assets, invalidation and supersession logic, public audit UI, machine-readable status, source audit and a consolidated human-review packet. Human decisions for actinic keratosis and basal cell carcinoma (disease) plus BCC follow-up, BCC quiz and BCC schematic are published as clinician reviewed; other Goal 9 units remain review required.
- Goal 8 clinical review readiness and visual learning pilot: public evidence-status counts, eight section-level evidence maps, four original governed SVG schematics, an eight-question accessible quiz, URL-addressable condition details, a physician review batch and repository community-health files. Goal 8 did not itself record a completed clinician review. Later public decisions reviewed specific assets named in the Goal 9 bullet; the other schematics and quiz items stay review required.
- Goal 7 clinical content architecture: optional versioned profiles, bounded controlled vocabularies, structured presentation/diagnostics/differentials/treatment/follow-up, medication-regimen support, source-reference validation, legacy-compatible rendering and an eight-record pilot spanning oncology, inflammatory, acneiform and infectious disease. Production dosing remains intentionally empty until explicit regimen evidence is reviewed.
- Goal 7 data-quality audit and validator: quantitative coverage for all 50 records, malformed-value tests, source attachment checks and fingerprint coverage for structured clinical changes.
- Goal 6 clinical UX and visual foundation: normalized semantic color and spacing tokens, compact professional navigation, visible library coverage, improved search and filter affordances, denser cards, scannable two-column condition details, sticky section navigation, progressive source disclosure, four responsive breakpoints and reduced-motion support.
- Optional educational-media framework separated into `media-data.js`, with controlled media types and licenses, mandatory source/attribution/alt-text/dimensions metadata, independent clinician-review fingerprints, lazy rendering and image-failure fallback. That Goal 6 change did not itself publish images. Four original schematics and separately licensed case images were added later; each image keeps its own license.
- English-language dermato-oncology follow-up UI with German guideline jurisdiction for melanoma, BCC and cSCC: structured disease/jurisdiction protocols, stage/risk and time-period or non-interval guidance selectors, modality-specific states, provenance, offline validation and stale-review fingerprints. Melanoma in situ separates the absence of a German S3 Stage 0 interval from sourced German expert-practice and international surveillance context. The BCC German protocol is clinician reviewed in the public Goal 9 layer; melanoma and cSCC protocols remain review required.
- Clinical review governance infrastructure: controlled statuses, structured `clinicalReview` metadata, deterministic content fingerprints, stale-review validation, maintainer utility and documented human review procedure. Legacy disease embedded fields remain review-required for all 50 records; the public Goal 9 layer publishes five clinician-reviewed pilot assets (see Goal 9 bullet).
- Static GitHub Pages-compatible application using HTML, CSS, and vanilla JavaScript
- Search across condition name, alternative name, summary, category, subcategory, and explicitly labelled classification/coding metadata
- Eight populated clinical groups: four cutaneous-oncology groups plus inflammatory and eczematous disorders, acneiform and sebaceous disorders, pigmentary disorders, and infectious and infestation disorders
- Keyboard-operable category filters and condition cards
- Structured condition details, external references with provenance metadata, visible medical-review status, and a persistent medical disclaimer
- Medical records separated from rendering logic in `data.js`
- Responsive single-column presentation at narrow viewport widths
- Dependency-free data-schema validation using the Node.js test runner
- An extensible coding model that separates ICD-10 WHO diagnosis classification from ICD-O topography and morphology
- Structured subcategories for precursor lesions, melanoma states/subtypes, adnexal tumors, sarcomas, vascular tumors, Paget disease, and cutaneous lymphomas
- Per-source metadata check dates that are independent from publication dates and clinician review
- WCAG 2.2 AA contrast corrections for result-status and footer text, plus a keyboard-visible skip link
- A read-only GitHub Actions workflow that runs dependency-free syntax, test, and whitespace checks for pull requests to `main`, pushes to `main`, and manual dispatches
- The first universal dermatology content package: atopic dermatitis, contact dermatitis, seborrheic dermatitis, plaque psoriasis, acne vulgaris, rosacea, chronic urticaria, and vitiligo
- A 16-record infectious dermatology package spanning bacterial, dermatophyte, other fungal, parasitic and viral presentations
- Machine-readable ICD-O applicability that distinguishes existing oncology coding from non-neoplastic records where ICD-O is not applicable

### Known engineering and usability gaps

- Curriculum gaps after Goal 25 (development branch): no nail-unit dermoscopy case, no benign acral case with dermoscopy, one example each of the parallel ridge pattern and of gray dots around facial follicles, and no dermatofibroma, LPLK, or pigmented actinic keratosis case. Licensed candidates for several of these are recorded in `acquisition-ledger.js` as `candidate`.

- Obtain physician review of the remaining German follow-up protocols (melanoma-de and cSCC-de; BCC-de is already clinician reviewed) and reconcile any interpretive questions in the cSCC modality table before a broader reviewed Nachsorge release.
- Obtain dermatologist sign-off on the melanoma in situ statement, the absence of a German S3 structured interval, at least annual full-skin examination, risk-factor qualifier, monthly self-examination, non-routine ultrasound/S100B/imaging wording and separation of AAD international context.
- Add a second jurisdiction only after its source matrix is independently researched and reviewed; do not expose an empty jurisdiction selector.
- Add automated browser tests for search, category filters, card/detail behavior, Escape/Close focus restoration, and external links.
- Pilot-case clinician review is pending and is not in this tree. The unmerged Goal 14 pull request is deferred for later clinician review. It was not merged here, and it is not an approval of any case. Do not describe that work as delivered.
- Test with representative screen readers and document results.
- Evaluate a persistent visual link from details back to results beyond the current Close/Escape and browser-history behavior.
- Add a lightweight broken-link check with respectful rate limiting and clear handling of redirects or bot-blocked sites.
- Chrome 151 on Linux desktop, 768px, and 390×700 was verified for the flows in [BROWSER_COMPATIBILITY.md](BROWSER_COMPATIBILITY.md). Firefox, Edge, and Safari have not been verified in those browsers. A Chrome result is not Firefox, Edge, or Safari coverage. Automated cross-browser tests are still absent.
- Obtain physician review of the four-item original schematic pilot and eight quiz questions; do not infer visual review from a reviewed disease record.
- Continue evidence-led `clinicalProfile` migration, prioritizing cSCC/SCC in situ/keratoacanthoma, remaining melanoma subtypes and conditions where diagnostics or escalation materially affect safety. Do not bulk-fill optional fields.
- Add the first production medication regimen only after formulation, frequency, duration, major precautions and source scope can be verified together.

## Content expansion plan

### Current focus

The collection now contains 50 records: the original 26 cutaneous malignancy and premalignant records, eight common inflammatory and pigmentary records, and 16 infectious and infestation records. Legacy embedded disease review fields remain `clinician review required` for all 50. In the public Goal 9 layer, actinic keratosis and basal cell carcinoma disease records are clinician reviewed; case-based learning pilots from Goal 11 remain review required pending physician attestation. Goal 12 does not change that state.

### Next content packages

1. Autoimmune, connective-tissue and immunobullous disease: begin only after optional diagnosis, investigation, pathology and red-flag fields are agreed.
2. Hair and nail disease: define whether these remain one navigation group or separate populated categories.
3. Review gaps within infectious dermatology without multiplying near-duplicate records or treating the 50-record milestone as evidence of clinical completeness.

Additional oncology records should still fill meaningful gaps rather than multiply near-duplicate entries.

Potential next records, only after adequate sourcing and clinician prioritization:

- Superficial spreading melanoma and amelanotic melanoma
- Nail-unit squamous cell carcinoma
- Verrucous carcinoma and selected high-risk cSCC presentations, if separate records add educational value
- Primary cutaneous B-cell lymphoma entities
- Additional primary cutaneous adnexal carcinomas
- Genetic or acquired cancer-predisposition conditions, kept distinct from premalignant lesions

### Missing or unresolved content

- Disease-specific ICD-10 WHO mappings were not asserted for actinic cheilitis, keratoacanthoma, uncommon adnexal tumors, AFX/PDS, DFSP, cutaneous angiosarcoma, EMPD, or pcALCL. These need coding-specialist verification; national codes must remain separately labelled.
- Porokeratosis is currently associated with broad ICD-10 WHO parent category Q82.8, but acquired presentations and subtype-specific national classification require review.
- ICD-O entries remain provisional educational metadata until a tumor registrar or coding specialist validates them against the final pathology and applicable registry rules.
- Rare-tumor dermoscopy sections still rely partly on established dermatology references and intentionally avoid claiming a diagnostic pattern.
- Dermoscopic descriptions for rare nonmelanocytic tumors are intentionally limited because no sufficiently specific diagnostic pattern was established in the reviewed sources.
- Treatment and follow-up sections intentionally avoid drug doses, excision margins, or fixed surveillance intervals until a clinician selects the applicable guideline and jurisdiction.
- Subcategory placement of keratoacanthoma and porokeratosis should receive editorial/clinical review because terminology and malignant-risk framing vary.
- No current general porokeratosis guideline or expert consensus was identified in the 2026-09-15 source audit. A 2024 peer-reviewed review now supports the cautious overview, but subtype-specific malignant-risk and follow-up recommendations still require stronger evidence and clinician review.
- The 2011 EORTC/ISCL/USCLC pcALCL consensus remains the EORTC-listed treatment consensus as of the 2026-09-15 audit. A 2023 disease-specific review supplements diagnosis and classification, but a newer equivalent multidisciplinary treatment consensus was not identified.
- Pediatric disease, pregnancy, immunosuppression-specific management, skin-of-color presentation, pathology, staging, prognosis, and patient-facing red-flag guidance require separate scoped review.
- The eight common-disease records in the first universal dermatology content package require clinician review of every statement and coding-specialist confirmation of ICD-10 WHO granularity.
- The 16 infectious and infestation records require clinician review of every clinical statement and coding-specialist confirmation of ICD-10 WHO granularity. In particular, bacterial folliculitis uses the nonspecific L73.9 category, B35.0 combines tinea capitis and barbae, B35.1 represents tinea unguium rather than every cause of onychomycosis, and complicated HSV or zoster presentations need more specific pathways.
- Antimicrobial and antifungal selection, duration, resistance patterns, pregnancy, pediatric care and immunocompromised-host management remain intentionally nonspecific pending jurisdictional clinician review.
- Dermoscopy is described conservatively for infectious disorders; organism testing and clinicopathologic correlation take priority when the clinical pattern is atypical or treatment fails.
- The 2017 contact-dermatitis guideline remains the strongest disease-specific guideline identified for the compact record, but its age should be reconsidered during clinician review.
- The 2024 seborrheic-dermatitis consensus is scalp- and adult-focused; facial, truncal, pediatric and immunocompromised presentations need separately scoped review before expansion.

## Medical review process

1. A contributor drafts or changes one focused record and cites current guidelines, professional societies, government health sources, or established dermatology references.
2. Automated validation confirms the complete schema, unique identifiers, valid category/subcategory mapping, separated ICD-O fields, structured HTTPS references, and the required review state.
3. A qualified clinician checks every clinical claim against the cited source and records the guideline version/date, jurisdiction, and review date in the pull request.
4. A second reviewer checks language, uncertainty, duplication, category placement, link behavior, and preservation of the medical disclaimer.
5. Follow [CLINICAL_REVIEW.md](CLINICAL_REVIEW.md): a maintainer may record `clinician reviewed` only after a physician attests to the specific version, with date, role, specialty and matching fingerprint. Infrastructure is implemented. Five public assets are clinician reviewed, as listed in the Goal 9 baseline bullet. Every other review unit, including all 38 development-branch cases, remains review required. A software release would not clinically validate the remaining content.
6. Records are re-reviewed when a source is replaced, a recommendation changes, or the agreed review interval expires.

## Data-schema evolution

The compact schema now supports oncology and non-neoplastic records through stable identifiers, controlled category/subcategory values, separated coding systems, a machine-readable `icdoApplicability` field, consistent educational sections, shared source objects, and an explicit review gate. It may still become too coarse as infectious, autoimmune, immunobullous, hair, and nail disorders are added because diagnosis, investigations, pathology, complications, and editorial uncertainty cannot always be represented cleanly inside the current prose fields.

For a later maintainer-approved migration, the smallest useful extension is:

- `diagnosis`: concise diagnostic approach and criteria, distinct from clinical appearance
- `investigations`: laboratory, imaging, microbiology, or bedside testing when relevant
- `histopathology`: optional pathology summary, not required for every condition
- `redFlags`: short array of findings needing urgent assessment
- `unresolvedQuestions`: structured medical and coding questions kept separate from published content
- Review priority and richer source-version context, if needed later; `clinicalReview` already stores date, role, specialty and content fingerprint alongside `reviewStatus`

Epidemiology, etiology/pathogenesis, distribution, complications, and prognosis should become separate optional fields only when a content pilot shows that placing them in the overview or clinical section causes ambiguity. No unused fields should be added to all 50 records before that pilot. Maintainers must decide whether optional fields are omitted or explicitly `null`, whether review priority is a controlled scale, and whether unresolved medical and coding questions use separate arrays.

## Category architecture

The interface now exposes eight populated first-level filters: the original four cutaneous-oncology groups plus inflammatory and eczematous disorders, acneiform and sebaceous disorders, pigmentary disorders, and infectious and infestation disorders. Main categories and subcategories remain controlled values. Future expansion should add a first-level group only when records exist for it, avoiding empty navigation. Likely later groups include:

- autoimmune, connective-tissue, and immunobullous diseases
- hair and nail disorders
- benign tumors, cysts, and vascular disorders
- genodermatoses and keratinization disorders
- drug reactions and photodermatoses
- further premalignant lesions and cutaneous malignancies, using the present four oncology groups rather than creating an overlapping tumor category

The exact boundary between inflammatory, eczematous, and papulosquamous disease—and whether hair and nail disorders remain combined—requires maintainer and clinician agreement. Empty future categories must not appear in the UI.

## Testing plan

### Every content change

- Run `node --test tests/*.test.js`.
- Confirm that IDs are unique and every required field is non-empty.
- Open every newly added or changed reference and confirm it supports the adjacent content.
- Have a clinician review new or substantially changed medical text.

### Every interface change

- Load the page without console errors.
- Test full and partial searches by name, alternative name, main category, subcategory, ICD-10, and ICD-O morphology.
- Test every category filter and the no-results state.
- Open a card, verify every detail section and reference, then close it with both Close and Escape.
- Navigate search, filters, cards, details, and links using only the keyboard.
- Check at approximately 1280 px, 768 px, and 375 px widths.
- Repeat core behavior in supported browsers before a release.

## Visual-content policy and future needs

The optional media data model, independent review fingerprint, renderer, load-failure fallback and automated validator are implemented. Goal 8 adds four original SVG learning schematics; no patient photographs or third-party clinical images are included. See [MEDIA_GOVERNANCE.md](MEDIA_GOVERNANCE.md). Future work may evaluate:

- Clinician-reviewed revisions or additional original schematic lesion morphology and anatomy illustrations
- Consent- and license-tracked clinical photography
- Accessible alt-text standards and nonvisual equivalents
- Whether any future clinical-photography pilot is justified after source, license, attribution, consent, accessibility and clinical review are documented

## Release direction

The version headings below are direction, not shipped releases. The existing tags are the pre-releases `v0.1.0-preview.1` and `v0.2.0-preview.1`; neither includes the Goal 18 to 25 development-branch work. Adding this roadmap does not publish a release. See [RELEASES.md](RELEASES.md).

Completed work is the Implemented list above. Pending work is the gaps, content packages and version headings in the rest of this file. Do not read a future heading as delivered.

### Version 0.1 — reviewed foundation

- Clinician review of the initial malignancy collection
- Clinician and coding-specialist review of ICD-10 WHO and ICD-O mappings, with jurisdictional limits clearly documented
- Maintain the read-only GitHub Actions workflow for syntax, schema, synthetic-DOM behavior, documentation, and whitespace checks
- Real-browser coverage beyond the recorded Chrome 151 session remains required. Firefox, Edge, and Safari are not verified.
- Accessibility audit and contribution templates

### Version 0.2 — deeper oncology coverage

- Clinician-prioritized missing malignancies
- Versioned source/review metadata and stale-content flags
- Improved navigation and addressable records if validated as useful

### Version 0.3 — carefully broadened dermatology scope

- Maintain the completed infectious package and add autoimmune/immunobullous and hair/nail packages one clinical domain at a time using the same schema and review gate
- Build beyond the initial 50-record milestone without treating record count as clinical completeness
- Evaluate multilingual support only after a source-language and translation-review policy exists
- Evaluate licensed educational visuals under the provenance policy above

## Out of scope for the current phase

- Diagnosis or treatment decision support
- Patient-specific recommendations
- Accounts, analytics, frameworks, build systems, or external runtime dependencies
- Unlicensed images or content copied from reference sites
