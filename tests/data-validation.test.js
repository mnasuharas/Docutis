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
  assert.deepEqual(Array.from(categories, category => category.id), ["premalignant", "keratinocytic", "melanocytic", "other"]);
  assert.ok(subcategories.length >= 4);
  assert.equal(new Set(subcategories.map(item => item.id)).size, subcategories.length);
});

test("all 26 conditions have complete, consistent review records", () => {
  assert.equal(diseases.length, 26);
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

test("condition identifiers are unique", () => {
  const ids = diseases.map(disease => disease.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("canonical condition names are unique regardless of case", () => {
  const names = diseases.map(disease => disease.name.trim().toLocaleLowerCase("en"));
  assert.equal(new Set(names).size, names.length);
});

test("coding systems are explicit and ICD-O topography is separate from morphology", () => {
  for (const disease of diseases) {
    assert.ok(Array.isArray(disease.coding.diagnoses), `${disease.id} diagnoses must be an array`);
    for (const diagnosis of disease.coding.diagnoses) {
      assert.equal(diagnosis.system, "ICD-10 WHO", `${disease.id} has an unlabelled or unsupported diagnosis system`);
      assert.equal(diagnosis.version, "2019");
      assert.match(diagnosis.code, /^[A-Z][0-9]{2}(?:\.[0-9])?$/);
      assert.ok(diagnosis.label.trim());
    }
    if (disease.coding.icdo) {
      const oncology = disease.coding.icdo;
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
