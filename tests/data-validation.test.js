const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "..", "data.js"), "utf8");
const context = { window: {} };
vm.runInNewContext(source, context);
const { categories, subcategories, diseases } = context.window.DOCUTIS_DATA;
const requiredFields = [
  "id", "name", "alternative", "category", "subcategory", "coding", "description", "clinical",
  "dermoscopy", "differential", "treatment", "followup", "references", "reviewStatus"
];
const sourceFields = ["title", "organization", "type", "year", "version", "url", "doi", "metadataCheckedAt"];
const allowedSourceTypes = new Set([
  "official classification", "guideline", "consensus", "systematic review",
  "peer-reviewed review", "clinical reference"
]);
const oncologyIds = [
  "actinic-keratosis", "actinic-cheilitis", "porokeratosis", "basal-cell-carcinoma",
  "cutaneous-squamous-cell-carcinoma", "squamous-cell-carcinoma-in-situ", "keratoacanthoma",
  "cutaneous-melanoma", "lentigo-maligna", "lentigo-maligna-melanoma", "acral-melanoma",
  "nodular-melanoma", "desmoplastic-melanoma", "merkel-cell-carcinoma", "sebaceous-carcinoma",
  "dermatofibrosarcoma-protuberans", "atypical-fibroxanthoma", "pleomorphic-dermal-sarcoma",
  "cutaneous-angiosarcoma", "kaposi-sarcoma", "extramammary-paget-disease",
  "microcystic-adnexal-carcinoma", "eccrine-porocarcinoma", "mycosis-fungoides",
  "sezary-syndrome", "primary-cutaneous-anaplastic-large-cell-lymphoma"
];
const goalTwoIds = [
  "atopic-dermatitis", "contact-dermatitis", "seborrheic-dermatitis", "plaque-psoriasis",
  "acne-vulgaris", "rosacea", "chronic-urticaria", "vitiligo"
];
const infectiousIds = [
  "impetigo", "bacterial-folliculitis", "erysipelas", "erythrasma", "tinea-corporis",
  "tinea-cruris", "tinea-pedis", "tinea-capitis", "onychomycosis", "cutaneous-candidiasis",
  "pityriasis-versicolor", "scabies", "herpes-simplex", "herpes-zoster",
  "molluscum-contagiosum", "cutaneous-warts"
];
const protectedIds = [...oncologyIds, ...goalTwoIds];

function condition(id) {
  const disease = diseases.find(item => item.id === id);
  assert.ok(disease, `missing fixture ${id}`);
  return disease;
}

function codingText(disease) {
  return JSON.stringify(disease.coding);
}

function diagnosisCodes(disease) {
  return disease.coding.diagnoses.map(item => item.code).join(" ");
}

test("dataset has the intended categories and structured subcategories", () => {
  assert.deepEqual(Array.from(categories, category => category.id), [
    "premalignant", "keratinocytic", "melanocytic", "other",
    "inflammatory-eczematous", "acneiform-sebaceous", "pigmentary", "infectious-infestation"
  ]);
  assert.ok(subcategories.length >= 26);
  assert.equal(new Set(subcategories.map(item => item.id)).size, subcategories.length);
  for (const id of ["bacterial-infection", "dermatophyte-infection", "other-fungal-infection", "parasitic-infestation", "viral-infection"]) {
    assert.ok(subcategories.some(item => item.id === id), `missing infectious subcategory ${id}`);
  }
});

test("all 50 conditions have complete, consistent review records", () => {
  assert.equal(diseases.length, 50);
  const categoryIds = new Set(categories.map(category => category.id));
  const subcategoryIds = new Set(subcategories.map(subcategory => subcategory.id));
  for (const disease of diseases) {
    for (const field of requiredFields) {
      assert.ok(field in disease, `${disease.id || "unknown"} is missing ${field}`);
      assert.ok(typeof disease[field] === "object" || String(disease[field]).trim(), `${disease.id} has an empty ${field}`);
    }
    assert.ok(categoryIds.has(disease.category), `${disease.id} has an unknown category`);
    assert.ok(subcategoryIds.has(disease.subcategory), `${disease.id} has an unknown subcategory`);
    assert.equal(disease.reviewStatus, "clinician review required");
    assert.ok(disease.references.length > 0, `${disease.id} has no references`);
    assert.equal("icd10" in disease, false, `${disease.id} retains the ambiguous legacy icd10 field`);
  }
});

test("the existing 34 records remain and all 16 infectious records are present", () => {
  const ids = new Set(diseases.map(disease => disease.id));
  for (const id of protectedIds) assert.ok(ids.has(id), `existing record ${id} was removed`);
  for (const id of infectiousIds) assert.ok(ids.has(id), `planned infectious record ${id} is missing`);
  assert.equal(protectedIds.length + infectiousIds.length, diseases.length);
});

test("condition identifiers are unique", () => {
  const ids = diseases.map(disease => disease.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("canonical condition names are unique regardless of case", () => {
  const names = diseases.map(disease => disease.name.trim().toLocaleLowerCase("en"));
  assert.equal(new Set(names).size, names.length);
});

test("coding systems are explicit and ICD-O topography is separate from morphology", () => {
  const applicabilityValues = new Set(["applicable", "not applicable", "not established"]);
  for (const disease of diseases) {
    assert.ok(applicabilityValues.has(disease.coding.icdoApplicability), `${disease.id} has invalid ICD-O applicability`);
    assert.ok(Array.isArray(disease.coding.diagnoses), `${disease.id} diagnoses must be an array`);
    for (const diagnosis of disease.coding.diagnoses) {
      assert.equal(diagnosis.system, "ICD-10 WHO", `${disease.id} has an unlabelled or unsupported diagnosis system`);
      assert.equal(diagnosis.version, "2019");
      assert.match(diagnosis.code, /^[A-Z][0-9]{2}(?:\.[0-9])?$/);
      assert.ok(diagnosis.label.trim());
    }
    if (disease.coding.icdo) {
      const oncology = disease.coding.icdo;
      assert.equal(disease.coding.icdoApplicability, "applicable");
      assert.equal(oncology.system, "ICD-O");
      assert.equal(oncology.version, "3.2");
      assert.ok(oncology.topography && typeof oncology.topography === "object");
      if (oncology.topography.code) assert.match(oncology.topography.code, /^C[0-9]{2}\.(?:_|[0-9])$/);
      assert.ok(oncology.topography.label.trim());
      assert.ok(oncology.morphologies.length > 0);
      for (const morphology of oncology.morphologies) {
        assert.match(morphology.code, /^[0-9]{4}\/[0123]$/);
        assert.ok(morphology.label.trim());
      }
    }
    assert.ok(disease.coding.diagnoses.length || disease.coding.icdo || disease.coding.verificationNote,
      `${disease.id} needs a code or an explicit verification note`);
  }
});

test("non-neoplastic additions explicitly exclude ICD-O without synthetic codes", () => {
  for (const id of [...goalTwoIds, ...infectiousIds]) {
    const disease = condition(id);
    assert.equal(disease.coding.icdo, null, `${id} must not contain ICD-O topography or morphology`);
    assert.equal(disease.coding.icdoApplicability, "not applicable");
    assert.ok(disease.coding.diagnoses.length > 0, `${id} needs an ICD-10 WHO classification`);
  }
  assert.equal(diseases.filter(disease => disease.coding.icdo).length, 22, "existing oncology mappings changed unexpectedly");
});

test("high-risk mappings do not regress to ambiguous legacy codes", () => {
  assert.doesNotMatch(diagnosisCodes(condition("merkel-cell-carcinoma")), /C4A/);
  assert.doesNotMatch(diagnosisCodes(condition("eccrine-porocarcinoma")), /D44\.90/);
  assert.doesNotMatch(diagnosisCodes(condition("dermatofibrosarcoma-protuberans")), /C44\.99/);
  assert.doesNotMatch(diagnosisCodes(condition("actinic-cheilitis")), /L56\.8/);
  assert.doesNotMatch(diagnosisCodes(condition("keratoacanthoma")), /L85\.8/);
  assert.match(codingText(condition("merkel-cell-carcinoma")), /8247\/3/);
  assert.match(codingText(condition("eccrine-porocarcinoma")), /8409\/3/);
  assert.match(codingText(condition("dermatofibrosarcoma-protuberans")), /8832\/1/);
  assert.match(codingText(condition("dermatofibrosarcoma-protuberans")), /8832\/3/);
  assert.match(codingText(condition("lentigo-maligna")), /8742\/2/);
  assert.match(codingText(condition("lentigo-maligna-melanoma")), /8742\/3/);
});

test("references use controlled types, independent metadata dates and valid identifiers", () => {
  const metadataByUrl = new Map();
  const metadataByDoi = new Map();
  for (const disease of diseases) {
    const urlsWithinRecord = new Set();
    for (const reference of disease.references) {
      for (const field of sourceFields) assert.ok(field in reference, `${disease.id} source is missing ${field}`);
      assert.equal("checkedAt" in reference, false, `${disease.id} retains ambiguous checkedAt metadata`);
      assert.ok(reference.title.trim());
      assert.ok(reference.organization.trim());
      assert.ok(allowedSourceTypes.has(reference.type), `${disease.id} has unsupported source type ${reference.type}`);
      assert.ok(reference.year === null || (Number.isInteger(reference.year) && reference.year >= 1900 && reference.year <= 2100));
      assert.ok(reference.version === null || (typeof reference.version === "string" && reference.version.trim()));
      assert.match(reference.url, /^https:\/\//);
      assert.doesNotThrow(() => new URL(reference.url));
      assert.doesNotMatch(reference.url, /(?:google\.[^/]+\/search|bing\.com\/search|pubmed\.ncbi\.nlm\.nih\.gov\/?\?term=)/i);
      assert.equal(urlsWithinRecord.has(reference.url), false, `${disease.id} repeats ${reference.url}`);
      urlsWithinRecord.add(reference.url);
      assert.match(reference.metadataCheckedAt, /^\d{4}-\d{2}-\d{2}$/);
      assert.equal(new Date(`${reference.metadataCheckedAt}T00:00:00Z`).toISOString().slice(0, 10), reference.metadataCheckedAt);
      if (reference.doi) assert.match(reference.doi, /^10\.\d{4,9}\/.+/);

      const normalized = JSON.stringify(reference);
      if (metadataByUrl.has(reference.url)) assert.equal(metadataByUrl.get(reference.url), normalized, `conflicting metadata for ${reference.url}`);
      else metadataByUrl.set(reference.url, normalized);
      if (reference.doi) {
        const doi = reference.doi.toLocaleLowerCase("en");
        if (metadataByDoi.has(doi)) assert.equal(metadataByDoi.get(doi), normalized, `conflicting metadata for DOI ${doi}`);
        else metadataByDoi.set(doi, normalized);
      }
    }
    assert.ok(disease.references.some(reference => reference.organization !== "DermNet"), `${disease.id} relies only on DermNet`);
  }
});

test("priority source corrections retain verified bibliographic identities", () => {
  const melanomaRefs = condition("cutaneous-melanoma").references;
  assert.ok(melanomaRefs.some(reference => reference.doi === "10.1016/j.ejca.2024.115152" && reference.version.includes("part 1")));
  assert.ok(melanomaRefs.some(reference => reference.doi === "10.1016/j.ejca.2024.115153" && reference.version.includes("part 2")));
  assert.ok(melanomaRefs.every(reference => reference.url !== "https://eado.org/european-guidelines/"));

  const keratoacanthoma = condition("keratoacanthoma").references.find(reference => reference.doi === "10.1097/DAD.0000000000001872");
  assert.equal(keratoacanthoma.type, "peer-reviewed review");

  const porokeratosis = condition("porokeratosis").references;
  assert.ok(porokeratosis.some(reference => reference.doi === "10.1111/ijd.17411" && reference.type === "peer-reviewed review"));

  const pcAlcl = condition("primary-cutaneous-anaplastic-large-cell-lymphoma").references;
  assert.ok(pcAlcl.some(reference => reference.doi === "10.1182/blood-2011-05-351346" && reference.type === "consensus"));
  assert.ok(pcAlcl.some(reference => reference.doi === "10.3390/cancers15164098" && reference.type === "peer-reviewed review"));
});

test("new records retain their disease-specific guideline or consensus sources", () => {
  const expectedDois = {
    "atopic-dermatitis": ["10.1016/j.jaad.2022.12.029", "10.1016/j.jaad.2023.08.102"],
    "contact-dermatitis": ["10.1111/bjd.15239"],
    "seborrheic-dermatitis": ["10.1684/ejd.2024.4703"],
    "acne-vulgaris": ["10.1016/j.jaad.2023.12.017"],
    rosacea: ["10.1111/ddg.14849"],
    "chronic-urticaria": ["10.1111/all.70210"],
    vitiligo: ["10.1111/jdv.19451", "10.1111/jdv.19450"]
  };
  for (const [id, dois] of Object.entries(expectedDois)) {
    const references = condition(id).references;
    for (const doi of dois) assert.ok(references.some(reference => reference.doi === doi), `${id} is missing ${doi}`);
  }
  const psoriasis = condition("plaque-psoriasis").references;
  assert.ok(psoriasis.some(reference => reference.url === "https://www.guidelines.edf.one/guidelines/psoriasis-guideline" && reference.type === "guideline"));
  for (const id of goalTwoIds) assert.equal(condition(id).reviewStatus, "clinician review required");
});

test("infectious records retain primary sources, coding and the review gate", () => {
  const expectedDois = {
    "bacterial-folliculitis": "10.1002/14651858.CD013099.pub2",
    erythrasma: "10.1093/ced/llaf307",
    "tinea-capitis": "10.1111/ddg.70395x",
    onychomycosis: "10.1111/ddg.14988",
    "cutaneous-candidiasis": "10.1111/jdv.15782",
    scabies: "10.1111/ijd.17327",
    "cutaneous-warts": "10.1111/jebm.12494"
  };
  for (const id of infectiousIds) {
    const disease = condition(id);
    assert.equal(disease.category, "infectious-infestation");
    assert.equal(disease.reviewStatus, "clinician review required");
    assert.equal(disease.coding.icdo, null);
    assert.equal(disease.coding.icdoApplicability, "not applicable");
    assert.ok(disease.coding.diagnoses.length > 0);
    assert.ok(disease.references.some(reference => reference.organization !== "DermNet"));
  }
  for (const [id, doi] of Object.entries(expectedDois)) {
    assert.ok(condition(id).references.some(reference => reference.doi === doi), `${id} is missing ${doi}`);
  }
  assert.ok(condition("impetigo").references.some(reference => reference.version === "NG153"));
  assert.ok(condition("erysipelas").references.some(reference => reference.version === "NG141"));
  for (const id of ["tinea-corporis", "tinea-cruris", "tinea-pedis", "onychomycosis"]) {
    assert.ok(condition(id).references.some(reference => reference.url === "https://www.cdc.gov/ringworm/hcp/clinical-overview/"));
  }
  assert.ok(condition("herpes-zoster").references.some(reference => reference.url.includes("/shingles/hcp/clinical-overview/")));
  assert.ok(condition("molluscum-contagiosum").references.some(reference => reference.url.includes("/molluscum-contagiosum/hcp/clinical-overview/")));
});
