# Docutis Roadmap

Docutis is an early-stage educational dermatology reference. This roadmap separates implemented work from work that still requires engineering, editorial, or clinical review. Dates are intentionally not promised until maintainers and reviewers are available.

## Current baseline

### Implemented

- Static GitHub Pages-compatible application using HTML, CSS, and vanilla JavaScript
- Search across condition name, alternative name, summary, category, subcategory, and explicitly labelled classification/coding metadata
- Four explicit clinical groups: premalignant lesions, keratinocytic malignancies, melanocytic malignancies, and other cutaneous malignancies
- Keyboard-operable category filters and condition cards
- Structured condition details, external references with provenance metadata, visible medical-review status, and a persistent medical disclaimer
- Medical records separated from rendering logic in `data.js`
- Responsive single-column presentation at narrow viewport widths
- Dependency-free data-schema validation using the Node.js test runner
- An extensible coding model that separates ICD-10 WHO diagnosis classification from ICD-O topography and morphology
- Structured subcategories for precursor lesions, melanoma states/subtypes, adnexal tumors, sarcomas, vascular tumors, Paget disease, and cutaneous lymphomas
- Per-source metadata check dates that are independent from publication dates and clinician review
- WCAG 2.2 AA contrast corrections for result-status and footer text, plus a keyboard-visible skip link

### Known engineering and usability gaps

- Add automated browser tests for search, category filters, card/detail behavior, Escape/Close focus restoration, and external links.
- Test with representative screen readers and document results.
- Consider a persistent link from details back to results.
- Decide whether URL-addressable condition details are desirable without compromising the no-build static architecture.
- Add a lightweight broken-link check with respectful rate limiting and clear handling of redirects or bot-blocked sites.
- Add cross-browser checks for current Chrome, Firefox, Safari, and Edge.

## Content expansion plan

### Current focus

The first collection covers cutaneous malignancies and premalignant lesions. Near-term additions should fill meaningful gaps rather than multiply near-duplicate entries.

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

## Medical review process

1. A contributor drafts or changes one focused record and cites current guidelines, professional societies, government health sources, or established dermatology references.
2. Automated validation confirms the complete schema, unique identifiers, valid category/subcategory mapping, separated ICD-O fields, structured HTTPS references, and the required review state.
3. A qualified clinician checks every clinical claim against the cited source and records the guideline version/date, jurisdiction, and review date in the pull request.
4. A second reviewer checks language, uncertainty, duplication, category placement, link behavior, and preservation of the medical disclaimer.
5. Only a maintainer may change a record from `clinician review required` after documented review. The current dataset must remain in that state until such a workflow is implemented and completed.
6. Records are re-reviewed when a source is replaced, a recommendation changes, or the agreed review interval expires.

## Future data-schema proposal (not implemented)

The current compact record works well for a concise oncology collection: stable identifiers, controlled category/subcategory values, separated coding systems, consistent educational sections, shared source objects, and an explicit review gate. It will become too coarse when inflammatory, infectious, autoimmune, hair, nail, and pigment disorders are added because diagnosis, investigations, pathology, complications, and editorial uncertainty cannot always be represented cleanly inside the current prose fields.

For a later maintainer-approved migration, the smallest useful extension is:

- `diagnosis`: concise diagnostic approach and criteria, distinct from clinical appearance
- `investigations`: laboratory, imaging, microbiology, or bedside testing when relevant
- `histopathology`: optional pathology summary, not required for every condition
- `redFlags`: short array of findings needing urgent assessment
- `unresolvedQuestions`: structured medical and coding questions kept separate from published content
- `review`: an object containing status, priority, reviewer role, review date, and source-version context

Epidemiology, etiology/pathogenesis, distribution, complications, and prognosis should become separate optional fields only when a content pilot shows that placing them in the overview or clinical section causes ambiguity. No unused fields should be added to all 26 records before that pilot. Maintainers must decide whether optional fields are omitted or explicitly `null`, whether review priority is a controlled scale, and whether unresolved medical and coding questions use separate arrays.

## Future category architecture (not implemented)

Keep the current four filters until records exist outside cutaneous oncology. Before expansion, replace them through a reviewed taxonomy migration rather than adding empty filters. A manageable first-level proposal is:

- inflammatory and eczematous disorders, with papulosquamous and acneiform subcategories
- infectious diseases
- autoimmune, connective-tissue, and immunobullous diseases
- pigmentary disorders
- hair and nail disorders
- benign tumors, cysts, and vascular disorders
- genodermatoses and keratinization disorders
- drug reactions and photodermatoses
- premalignant lesions and cutaneous malignancies

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

No patient photographs or third-party clinical images should be added without documented permission, provenance, consent where applicable, and a license compatible with the repository. Future work may evaluate:

- Original schematic lesion morphology and anatomy illustrations
- Consent- and license-tracked clinical photography
- Accessible alt-text standards and nonvisual equivalents
- A per-asset provenance file recording creator, license, consent basis, modifications, and review status

## Release direction

### Version 0.1 — reviewed foundation

- Clinician review of the initial malignancy collection
- Clinician and coding-specialist review of ICD-10 WHO and ICD-O mappings, with jurisdictional limits clearly documented
- Automated schema and synthetic-DOM behavior tests; real-browser smoke tests remain required
- Accessibility audit and contribution templates

### Version 0.2 — deeper oncology coverage

- Clinician-prioritized missing malignancies
- Versioned source/review metadata and stale-content flags
- Improved navigation and addressable records if validated as useful

### Version 0.3 — carefully broadened dermatology scope

- Add one new clinical domain at a time using the same schema and review gate
- Evaluate multilingual support only after a source-language and translation-review policy exists
- Evaluate licensed educational visuals under the provenance policy above

## Out of scope for the current phase

- Diagnosis or treatment decision support
- Patient-specific recommendations
- Accounts, analytics, frameworks, build systems, or external runtime dependencies
- Unlicensed images or content copied from reference sites
