/* Goal 28 training engine. Assembles stored case content; never generates clinical text. */
(function (root, factory) {
  "use strict";
  const api = factory();
  if (typeof module === "object" && module && module.exports) module.exports = api;
  if (root) root.DOCUTIS_TRAINING_ENGINE = api;
})(typeof window !== "undefined" ? window : null, function () {
  "use strict";

  const POSITIVE = new Set(["clearly_visible", "probably"]);
  const ALLOWED_METHODS = new Set(["histopathology", "expert_diagnosis", "source_dataset_diagnosis", "clinical_diagnosis", "other"]);
  const ALLOWED_LICENSES = new Set(["CC BY 4.0", "CC BY-SA 4.0", "CC0 1.0", "Public domain", "Project-owned"]);
  const REVIEW_STATUSES = new Set(["clinician review required", "clinician reviewed"]);
  // Pilot image paths name a diagnosis, so the byte-identical neutral copies are shown instead (see case-app.js).
  const PUBLIC_IMAGE_SRC = Object.freeze({
    "assets/media/cases/acral-melanoma-plantar-clinical.jpg": "assets/media/cases/case-01-clinical.jpg",
    "assets/media/cases/bcc-nodular-wikiderm-dermoscopy.jpg": "assets/media/cases/case-02-dermoscopy.jpg",
    "assets/media/cases/bcc-pigmented-wikiderm-dermoscopy.jpg": "assets/media/cases/case-03-dermoscopy.jpg",
    "assets/media/cases/ak-field-hand-clinical.jpg": "assets/media/cases/case-04-clinical.jpg",
    "assets/media/cases/scc-ak-paraspinal-clinical.jpg": "assets/media/cases/case-05-clinical.jpg"
  });
  // Words that would tell the learner the answer, the lesion family, or the pole before reveal.
  const LEAK_WORDS = [
    "melanoma", "melanomas", "nevus", "nevi", "naevus", "naevi", "mole", "moles", "carcinoma", "carcinomas",
    "keratosis", "keratoses", "lentigo", "lentigines", "angioma", "haemorrhage", "hemorrhage", "hematoma",
    "haematoma", "hyperplasia", "keratoacanthoma", "bcc", "scc", "ak", "melanocytic", "keratinocytic",
    "malignant", "malignancy", "benign", "cancer", "tumor", "tumour", "dysplastic", "seborrheic", "seborrhoeic",
    "basal", "squamous", "in situ", "lentiginous", "amelanotic", "hutchinson"
  ];
  const LEAK_PATTERN = new RegExp(`\\b(?:${LEAK_WORDS.map(word => word.replace(/\s+/g, "\\s+")).join("|")})\\b`, "i");
  const METHOD_LABELS = Object.freeze({
    histopathology: "Histopathology",
    expert_diagnosis: "Expert diagnosis",
    source_dataset_diagnosis: "Source dataset label",
    clinical_diagnosis: "Clinical diagnosis or caption label",
    other: "Other recorded method"
  });
  const HISTOPATHOLOGY_SOURCE_LABELS = Object.freeze({
    figure_caption: "Histopathology is stated for this lesion in the source figure caption.",
    case_text: "Histopathology is stated for this lesion in the source case text.",
    article_methods: "Histopathology is stated at study level in the article methods, not in a sentence about this lesion."
  });
  const POLE_LABELS = Object.freeze({
    malignant: "Malignant",
    benign: "Benign",
    "benign-or-inflammatory": "Benign or inflammatory",
    premalignant: "Premalignant",
    "uncertain-classification": "Uncertain classification in the linked record",
    unknown: "Not recorded"
  });
  const CERTAINTY_LABELS = Object.freeze({
    clearly_visible: "Clearly visible",
    probably: "Probably present",
    uncertain: "Uncertain",
    not_visible: "Not visible in this image"
  });
  const WEIGHT_LABELS = Object.freeze({
    major: "Major clue",
    supportive: "Supportive",
    weak: "Weak",
    conflicting: "Conflicts with a simple reading"
  });
  const INFORMATION_GAIN_LABELS = Object.freeze({
    dermoscopy_adds_major_discrimination: "Dermoscopy adds a major discriminating look",
    dermoscopy_adds_support: "Dermoscopy adds support",
    dermoscopy_changes_leading_differential: "Dermoscopy changes the leading comparison",
    dermoscopy_remains_equivocal: "Dermoscopy stays equivocal"
  });
  const PAIR_LABELS = Object.freeze({
    same_lesion_confirmed: "Same lesion confirmed by the source",
    source_documented_pair: "Source-documented paired view",
    not_paired: "Not a paired lesion"
  });
  const SPECIAL_SITES = new Set(["acral", "nail", "face", "ear", "scalp"]);

  function asList(value) { return Array.isArray(value) ? value : []; }
  function text(value) { return typeof value === "string" ? value.trim() : ""; }

  // Kept identical to scripts/pattern.js specialSite(); a test compares them.
  function specialSite(site) {
    const value = String(site || "").toLowerCase();
    if (!value.trim()) return "unknown";
    if (/not named|not specified|does not name|site not/.test(value)) return "unknown";
    if (/nail/.test(value)) return "nail";
    if (/plantar|palm|sole|\bacral\b/.test(value)) return "acral";
    if (/\bear\b/.test(value)) return "ear";
    if (/scalp/.test(value)) return "scalp";
    if (/face|cheek|nose|lip|eyelid|forehead/.test(value)) return "face";
    return "not-special";
  }

  // Kept identical to scripts/pattern.js lesionPole() and casePole().
  function lesionPole(disease) {
    if (!disease) return "unknown";
    if (disease.subcategory === "keratinocytic-tumor-uncertain") return "uncertain-classification";
    if (disease.category === "premalignant") return "premalignant";
    if (["keratinocytic", "melanocytic", "other"].includes(disease.category)) return "malignant";
    if (["inflammatory-eczematous", "acneiform-sebaceous", "pigmentary", "infectious-infestation"].includes(disease.category)) return "benign-or-inflammatory";
    return "unknown";
  }

  function poleGroup(pole) {
    if (pole === "malignant") return "malignant";
    if (pole === "benign" || pole === "benign-or-inflammatory") return "benign";
    return "intermediate";
  }

  function mulberry32(seed) {
    let state = seed >>> 0;
    return function () {
      state = (state + 0x6D2B79F5) >>> 0;
      let t = state;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function hashSeed(value) {
    const input = String(value);
    let hash = 2166136261;
    for (let index = 0; index < input.length; index += 1) {
      hash ^= input.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function createContext(caseData, diseaseData, patternData, trainingData) {
    const diseases = new Map(asList(diseaseData && diseaseData.diseases).map(item => [item.id, item]));
    const teaching = new Map(asList(caseData.teachingDiagnoses).map(item => [item.id, item]));
    const pairs = new Map(asList(caseData.pairProvenance).map(item => [item.caseId, item]));
    const comparisons = new Map(asList(caseData.comparisons).map(item => [item.id, item]));
    const links = new Map(asList(patternData && patternData.links).map(item => [item.casePatternId, item.canonicalId]));
    const patterns = new Map(asList(patternData && patternData.patterns).map(item => [item.id, item]));
    const cases = asList(caseData.cases);
    const byId = new Map(cases.map(item => [item.id, item]));
    const context = { caseData, diseaseData, patternData, trainingData, diseases, teaching, pairs, comparisons, links, patterns, cases, byId };
    context.groups = sourceGroups(cases);
    context.eligibility = buildEligibility(context);
    return context;
  }

  function diagnosisName(context, id) {
    const disease = context.diseases.get(id);
    if (disease) return disease.name;
    const record = context.teaching.get(id);
    return record ? record.name : id;
  }

  function casePole(context, caseItem) {
    const disease = context.diseases.get(caseItem.diseaseId);
    if (disease) return lesionPole(disease);
    const record = context.teaching.get(caseItem.diseaseId);
    return record && record.pole ? record.pole : "unknown";
  }

  function familyOf(context, caseItem) {
    const map = context.trainingData.categoryFamilies || {};
    return Object.prototype.hasOwnProperty.call(map, caseItem.category) ? map[caseItem.category] : "other";
  }

  function difficultyBand(caseItem) {
    const level = caseItem.academy && caseItem.academy.level;
    if (typeof level === "number") return level <= 2 ? "foundation" : level === 3 ? "intermediate" : "advanced";
    if (caseItem.educationalLevel === "introductory") return "foundation";
    if (caseItem.educationalLevel === "advanced") return "advanced";
    return "intermediate";
  }

  function pairRecord(context, caseItem) { return context.pairs.get(caseItem.id) || null; }

  function isTruePair(context, caseItem) {
    const pair = pairRecord(context, caseItem);
    return Boolean(pair && pair.provenance && pair.provenance !== "not_paired");
  }

  function imagesOfType(caseItem, type) { return asList(caseItem.images).filter(image => image && image.type === type); }

  function publicImageSrc(image) {
    if (!image || typeof image.src !== "string") return null;
    if (PUBLIC_IMAGE_SRC[image.src]) return PUBLIC_IMAGE_SRC[image.src];
    if (/^assets\/media\/cases\/case-\d{2}-(?:clinical|dermoscopy)\.jpg$/.test(image.src)) return image.src;
    return null;
  }

  function sourceKeys(image) {
    const keys = [];
    if (text(image.sourceUrl)) keys.push(`url:${image.sourceUrl.trim()}`);
    const match = String(image.modificationsNotes || "").match(/source sha256 ([0-9a-f]{64})/i);
    if (match) keys.push(`sha:${match[1].toLowerCase()}`);
    if (text(image.src)) keys.push(`src:${image.src.trim()}`);
    return keys;
  }

  // Cases sharing a source page, a source figure, or an image file form one group.
  // A session takes at most one case per group, so crops of one figure never
  // appear as independent lesions.
  function sourceGroups(cases) {
    const parent = new Map(cases.map(item => [item.id, item.id]));
    const find = id => { while (parent.get(id) !== id) { parent.set(id, parent.get(parent.get(id))); id = parent.get(id); } return id; };
    const owner = new Map();
    for (const caseItem of cases) {
      for (const image of asList(caseItem.images)) {
        for (const key of sourceKeys(image)) {
          if (owner.has(key)) parent.set(find(caseItem.id), find(owner.get(key)));
          else owner.set(key, caseItem.id);
        }
      }
    }
    const groups = new Map();
    for (const caseItem of cases) {
      const rootId = find(caseItem.id);
      if (!groups.has(rootId)) groups.set(rootId, []);
      groups.get(rootId).push(caseItem.id);
    }
    const byCase = new Map();
    for (const members of groups.values()) {
      const key = `group:${[...members].sort()[0]}`;
      members.forEach(id => byCase.set(id, key));
    }
    return byCase;
  }

  function leaks(value) { return LEAK_PATTERN.test(String(value || "")); }

  function namedPhrases(context, caseItem) {
    const names = [caseItem.diagnosisLabel, diagnosisName(context, caseItem.diseaseId)];
    if (caseItem.diagnosticGroundTruth) names.push(caseItem.diagnosticGroundTruth.confirmedDiagnosis);
    if (caseItem.closestMimic) names.push(caseItem.closestMimic.name);
    asList(caseItem.differentials).forEach(item => names.push(item && item.diagnosis));
    return names.map(name => String(name || "").replace(/\([^)]*\)/g, " ").trim().toLowerCase()).filter(name => name.length > 3);
  }

  function leaksFor(context, caseItem, value) {
    const lower = String(value || "").toLowerCase();
    if (!lower.trim()) return false;
    if (leaks(lower)) return true;
    return namedPhrases(context, caseItem).some(phrase => lower.includes(phrase));
  }

  function positivePatternRows(context, caseItem) {
    return asList(caseItem.patterns).filter(row => row && POSITIVE.has(row.certainty)).map(row => {
      const canonicalId = context.links.get(row.id) || null;
      const canonical = canonicalId ? context.patterns.get(canonicalId) : null;
      return { row, canonicalId, canonical };
    });
  }

  function structureIds(context, caseItem) {
    return [...new Set(positivePatternRows(context, caseItem)
      .filter(item => item.canonical && item.canonical.educationalRole === "diagnostic_structure")
      .map(item => item.canonicalId))];
  }

  function teachingPatternIds(context, caseItem) {
    return [...new Set(positivePatternRows(context, caseItem)
      .filter(item => item.canonical && (item.canonical.educationalRole === "diagnostic_structure" || item.canonical.educationalRole === "descriptive_morphology"))
      .map(item => item.canonicalId))];
  }

  function minImageSide(caseItem) {
    const sides = asList(caseItem.images).map(image => Math.min(Number(image.dimensions && image.dimensions.width) || 0, Number(image.dimensions && image.dimensions.height) || 0));
    return sides.length ? Math.min(...sides) : 0;
  }

  function hardFailures(context, caseItem) {
    const failures = [];
    const images = asList(caseItem.images);
    if (!images.length) failures.push("no-image");
    for (const image of images) {
      if (!publicImageSrc(image)) failures.push(`image-path:${image.id}`);
      if (!/^https:\/\//.test(text(image.sourceUrl))) failures.push(`source-url:${image.id}`);
      if (!ALLOWED_LICENSES.has(image.license)) failures.push(`license:${image.id}`);
      if (!text(image.attribution) || !text(image.creator)) failures.push(`attribution:${image.id}`);
      if (image.sourceVerificationStatus !== "verified") failures.push(`source-unverified:${image.id}`);
      if (image.patientIdentifiable !== false) failures.push(`identifiable:${image.id}`);
    }
    const truth = caseItem.diagnosticGroundTruth || {};
    if (!text(truth.confirmedDiagnosis) || !text(caseItem.diagnosisLabel)) failures.push("ground-truth-missing");
    if (!ALLOWED_METHODS.has(truth.confirmationMethod)) failures.push("confirmation-method-invalid");
    if (truth.histopathologySource && truth.confirmationMethod !== "histopathology") failures.push("histopathology-source-without-histopathology");
    if (!REVIEW_STATUSES.has(caseItem.reviewStatus)) failures.push("review-status-invalid");
    if (caseItem.reviewStatus === "clinician review required" && caseItem.clinicalReview !== null) failures.push("review-record-without-review");
    if (caseItem.reviewStatus === "clinician reviewed" && !caseItem.clinicalReview) failures.push("reviewed-without-record");
    return failures;
  }

  function contextReasons(context, caseItem) {
    const reasons = [];
    const truth = caseItem.diagnosticGroundTruth || {};
    const pair = pairRecord(context, caseItem);
    const site = specialSite(caseItem.patientContext && caseItem.patientContext.anatomicalSite);
    if (!caseItem.closestMimic || !asList(caseItem.patterns).length) reasons.push("no-closest-mimic");
    if (site === "nail" && truth.confirmationMethod !== "histopathology") reasons.push("nail-weak-verification");
    if (truth.confirmationMethod === "clinical_diagnosis" && pair && pair.informationGain === "dermoscopy_remains_equivocal") reasons.push("equivocal-weak-pair");
    if (asList(caseItem.differentials).length < 2) reasons.push("thin-differential");
    const preRevealTexts = [...asList(caseItem.observationPrompts)];
    if (preRevealTexts.some(value => leaksFor(context, caseItem, value))) reasons.push("pre-reveal-leak");
    if (minImageSide(caseItem) < (context.trainingData.minImageSide || 0)) reasons.push("low-resolution");
    asList(context.trainingData.curation).filter(item => item.caseId === caseItem.id).forEach(item => reasons.push(item.reason));
    return [...new Set(reasons)];
  }

  function buildEligibility(context) {
    const rows = new Map();
    for (const caseItem of context.cases) {
      const hard = hardFailures(context, caseItem);
      const soft = hard.length ? [] : contextReasons(context, caseItem);
      const status = hard.length ? "excluded" : soft.length ? "context_only" : "core_training";
      rows.set(caseItem.id, Object.freeze({
        caseId: caseItem.id,
        status,
        reasons: Object.freeze(hard.length ? hard : soft),
        pole: casePole(context, caseItem),
        poleGroup: poleGroup(casePole(context, caseItem)),
        family: familyOf(context, caseItem),
        site: specialSite(caseItem.patientContext && caseItem.patientContext.anatomicalSite),
        paired: isTruePair(context, caseItem),
        confirmationMethod: (caseItem.diagnosticGroundTruth || {}).confirmationMethod || "unknown",
        histopathology: (caseItem.diagnosticGroundTruth || {}).confirmationMethod === "histopathology",
        difficulty: difficultyBand(caseItem),
        group: context.groups.get(caseItem.id),
        structures: Object.freeze(structureIds(context, caseItem)),
        reviewStatus: caseItem.reviewStatus
      }));
    }
    return rows;
  }

  function blueprintById(context, id) {
    return asList(context.trainingData.blueprints).find(item => item.id === id) || null;
  }

  function lengthById(context, id) {
    const lengths = asList(context.trainingData.lengths);
    return lengths.find(item => item.id === id) || lengths.find(item => item.isDefault) || lengths[0];
  }

  function matchesBlueprint(context, blueprint, caseItem) {
    const row = context.eligibility.get(caseItem.id);
    if (blueprint.filter === "all") return true;
    if (blueprint.filter === "special-site") return SPECIAL_SITES.has(row.site);
    if (blueprint.filter === "melanoma-or-mimic") {
      if (row.family === "melanocytic") return true;
      const mimic = caseItem.closestMimic && caseItem.closestMimic.name || "";
      return /melanoma/i.test(mimic) || asList(caseItem.differentials).some(item => /melanoma/i.test(item && item.diagnosis || ""));
    }
    return false;
  }

  function blueprintPool(context, blueprintId) {
    const blueprint = blueprintById(context, blueprintId);
    if (!blueprint) throw new Error(`unknown blueprint: ${blueprintId}`);
    const core = context.cases.filter(item => context.eligibility.get(item.id).status === "core_training" && matchesBlueprint(context, blueprint, item));
    const allowed = new Set(asList(blueprint.contextReasons));
    const contextCases = blueprint.contextSlots > 0 ? context.cases.filter(item => {
      const row = context.eligibility.get(item.id);
      return row.status === "context_only" && row.reasons.length && row.reasons.every(reason => allowed.has(reason)) && matchesBlueprint(context, blueprint, item);
    }) : [];
    return { blueprint, core, context: contextCases };
  }

  function distinctGroups(context, cases) { return new Set(cases.map(item => context.groups.get(item.id))).size; }

  function availableLengths(context, blueprintId) {
    const pool = blueprintPool(context, blueprintId);
    const capacity = distinctGroups(context, pool.core) + (pool.blueprint.contextSlots > 0 && pool.context.length ? 1 : 0);
    const allowed = asList(pool.blueprint.lengths);
    return asList(context.trainingData.lengths).filter(length => length.cases <= capacity && (!allowed.length || allowed.includes(length.id)));
  }

  function minimumEach(length) { return Math.max(1, Math.round(length * 0.35)); }
  function diseaseCap(length) { return Math.max(1, Math.ceil(length / 4)); }

  function pickCases(context, pool, length, rng) {
    const chosen = [];
    const usedGroups = new Set();
    const diseaseCounts = new Map();
    const poleCounts = { benign: 0, malignant: 0, intermediate: 0 };
    const seen = { family: new Set(), site: new Set(), paired: new Set(), difficulty: new Set(), structures: new Set(), mimic: new Set() };
    const minEach = minimumEach(length);
    const available = { benign: 0, malignant: 0 };
    pool.forEach(item => { const group = context.eligibility.get(item.id).poleGroup; if (group in available) available[group] += 1; });
    while (chosen.length < length) {
      const remaining = length - chosen.length;
      const candidates = pool.filter(item => {
        const row = context.eligibility.get(item.id);
        if (usedGroups.has(row.group)) return false;
        if ((diseaseCounts.get(item.diseaseId) || 0) >= diseaseCap(length)) return false;
        const needBenign = Math.max(0, Math.min(minEach, available.benign) - poleCounts.benign);
        const needMalignant = Math.max(0, Math.min(minEach, available.malignant) - poleCounts.malignant);
        const afterBenign = row.poleGroup === "benign" ? Math.max(0, needBenign - 1) : needBenign;
        const afterMalignant = row.poleGroup === "malignant" ? Math.max(0, needMalignant - 1) : needMalignant;
        return afterBenign + afterMalignant <= remaining - 1;
      });
      if (!candidates.length) break;
      let best = null;
      let bestGain = -Infinity;
      for (const item of candidates) {
        const row = context.eligibility.get(item.id);
        // Coverage gain for composition only. It describes the case mix, never the learner.
        let gain = rng() * 6;
        if (!seen.family.has(row.family)) gain += 3;
        if (!seen.site.has(row.site)) gain += 2;
        if (!seen.paired.has(row.paired)) gain += 1;
        if (!seen.difficulty.has(row.difficulty)) gain += 1;
        gain += Math.min(3, row.structures.filter(id => !seen.structures.has(id)).length);
        const mimic = item.closestMimic && item.closestMimic.name;
        if (mimic && !seen.mimic.has(mimic)) gain += 1;
        if (row.poleGroup !== "intermediate" && poleCounts[row.poleGroup] < minEach) gain += 2;
        if (gain > bestGain) { bestGain = gain; best = item; }
      }
      const row = context.eligibility.get(best.id);
      chosen.push(best);
      usedGroups.add(row.group);
      diseaseCounts.set(best.diseaseId, (diseaseCounts.get(best.diseaseId) || 0) + 1);
      poleCounts[row.poleGroup] += 1;
      seen.family.add(row.family);
      seen.site.add(row.site);
      seen.paired.add(row.paired);
      seen.difficulty.add(row.difficulty);
      row.structures.forEach(id => seen.structures.add(id));
      if (best.closestMimic && best.closestMimic.name) seen.mimic.add(best.closestMimic.name);
    }
    return chosen;
  }

  function orderProblems(context, order) {
    let problems = 0;
    const rows = order.map(item => context.eligibility.get(item.id));
    if (rows.length && rows[0].difficulty === "advanced") problems += 1;
    for (let index = 1; index < order.length; index += 1) {
      if (order[index].diseaseId === order[index - 1].diseaseId) problems += 3;
      if (rows[index].family === rows[index - 1].family && rows[index].site === rows[index - 1].site) problems += 1;
      if (index > 1 && rows[index].poleGroup === rows[index - 1].poleGroup && rows[index].poleGroup === rows[index - 2].poleGroup) problems += 2;
    }
    return problems;
  }

  function shuffle(list, rng) {
    const copy = [...list];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(rng() * (index + 1));
      [copy[index], copy[swap]] = [copy[swap], copy[index]];
    }
    return copy;
  }

  function orderCases(context, cases, rng) {
    let best = cases;
    let bestProblems = Infinity;
    for (let attempt = 0; attempt < 300 && bestProblems > 0; attempt += 1) {
      const order = shuffle(cases, rng);
      const problems = orderProblems(context, order);
      if (problems < bestProblems) { best = order; bestProblems = problems; }
    }
    return best;
  }

  function compositionProblems(context, cases, length, blueprint, pool) {
    const problems = [];
    const rows = cases.map(item => context.eligibility.get(item.id));
    const minEach = minimumEach(length);
    for (const pole of ["benign", "malignant"]) {
      const available = pool.filter(item => context.eligibility.get(item.id).poleGroup === pole).length;
      const count = rows.filter(row => row.poleGroup === pole).length;
      if (count < Math.min(minEach, available)) problems.push(`too few ${pole}`);
    }
    const families = new Set(rows.map(row => row.family)).size;
    const poolFamilies = new Set(pool.map(item => context.eligibility.get(item.id).family)).size;
    if (families < Math.min(blueprint.minFamilies || 1, poolFamilies)) problems.push("too few families");
    if (pool.some(item => context.eligibility.get(item.id).paired) && !rows.some(row => row.paired)) problems.push("no paired case");
    if (rows.length && rows.every(row => row.difficulty === "advanced") && pool.some(item => context.eligibility.get(item.id).difficulty !== "advanced")) problems.push("only advanced cases");
    if (cases.length < length) problems.push("short pool");
    return problems;
  }

  function composeSession(context, options) {
    const blueprintId = options && options.blueprintId || "mixed-screening";
    const lengthOption = lengthById(context, options && options.lengthId);
    const pool = blueprintPool(context, blueprintId);
    const capacity = distinctGroups(context, pool.core);
    const contextWanted = pool.blueprint.contextSlots > 0 && pool.context.length > 0 ? 1 : 0;
    const length = Math.min(lengthOption.cases - contextWanted, capacity);
    const baseSeed = hashSeed(options && options.seed !== undefined ? options.seed : Date.now());
    let best = null;
    for (let attempt = 0; attempt < 200; attempt += 1) {
      const rng = mulberry32(baseSeed + attempt * 7919);
      const picked = pickCases(context, pool.core, length, rng);
      const problems = compositionProblems(context, picked, length, pool.blueprint, pool.core);
      if (!best || problems.length < best.problems.length) best = { picked, problems, rng };
      if (!problems.length) break;
    }
    const ordered = orderCases(context, best.picked, best.rng);
    const items = ordered.map(item => ({ caseId: item.id, role: "core" }));
    if (pool.blueprint.contextSlots > 0 && items.length > 1) {
      const used = new Set(items.map(item => context.groups.get(item.caseId)));
      const options2 = pool.context.filter(item => !used.has(context.groups.get(item.id)));
      if (options2.length) {
        const extra = options2[Math.floor(best.rng() * options2.length)];
        const disease = id => context.byId.get(id).diseaseId;
        const positions = [];
        for (let position = 1; position <= items.length; position += 1) {
          const before = items[position - 1];
          const after = items[position];
          if (disease(before.caseId) === extra.diseaseId || (after && disease(after.caseId) === extra.diseaseId)) continue;
          positions.push(position);
        }
        if (positions.length) items.splice(positions[Math.floor(best.rng() * positions.length)], 0, { caseId: extra.id, role: "context" });
      }
    }
    return Object.freeze({
      blueprintId,
      lengthId: lengthOption.id,
      requestedLength: lengthOption.cases,
      items: Object.freeze(items.map(Object.freeze)),
      notes: Object.freeze([
        ...(items.length < lengthOption.cases ? [`Only ${items.length} distinct source lesions fit this blueprint, so the session is shorter than requested.`] : []),
        ...best.problems.filter(problem => problem !== "short pool").map(problem => `Composition constraint not met: ${problem}.`)
      ])
    });
  }

  function safeAlt(context, caseItem, image) {
    const kind = image.type === "dermoscopy" ? "Dermoscopic image" : image.type === "clinical" ? "Clinical photograph" : "Image";
    if (text(image.alt) && !leaksFor(context, caseItem, image.alt)) return image.alt;
    const site = caseItem.patientContext && caseItem.patientContext.anatomicalSite;
    if (site && !leaksFor(context, caseItem, site)) return `${kind}, ${site}. No diagnosis is included in this description.`;
    return `${kind}. No diagnosis is included in this description.`;
  }

  function imageView(context, caseItem, image) {
    return {
      modality: image.type === "dermoscopy" ? "Dermoscopic image" : image.type === "clinical" ? "Clinical photograph" : "Image",
      type: image.type,
      src: publicImageSrc(image),
      alt: safeAlt(context, caseItem, image),
      width: image.dimensions && image.dimensions.width || null,
      height: image.dimensions && image.dimensions.height || null
    };
  }

  function contextLine(context, caseItem, value) {
    const clean = text(value);
    if (!clean || clean.toLowerCase() === "null") return null;
    return leaksFor(context, caseItem, clean) ? null : clean;
  }

  // Everything a learner may see before reveal. Nothing else is passed to the pre-reveal renderer.
  function preRevealView(context, caseItem, position, total) {
    const clinical = imagesOfType(caseItem, "clinical");
    const dermoscopy = imagesOfType(caseItem, "dermoscopy");
    const staged = clinical.length > 0 && dermoscopy.length > 0;
    const first = clinical.length ? clinical : dermoscopy;
    const prompts = asList(caseItem.observationPrompts).filter(prompt => !leaksFor(context, caseItem, prompt));
    const hints = asList(caseItem.hints).filter(hint => !leaksFor(context, caseItem, hint));
    const title = text(caseItem.title) && !leaksFor(context, caseItem, caseItem.title) ? caseItem.title : "Unknown lesion";
    const patient = caseItem.patientContext || {};
    let modalityNote;
    if (staged) modalityNote = "A clinical photograph is shown first. A dermoscopic image is stored and can be opened when you are ready.";
    else if (clinical.length) modalityNote = "Only a clinical photograph is stored for this lesion. No dermoscopic image is available.";
    else modalityNote = "Only a dermoscopic image is stored for this lesion. No clinical photograph is available.";
    return {
      position,
      total,
      title,
      site: contextLine(context, caseItem, patient.anatomicalSite),
      age: contextLine(context, caseItem, patient.ageBand),
      sex: contextLine(context, caseItem, patient.sex),
      firstImages: first.map(image => imageView(context, caseItem, image)),
      dermoscopyStaged: staged,
      dermoscopyImages: staged ? dermoscopy.map(image => imageView(context, caseItem, image)) : [],
      modalityNote,
      prompts: prompts.length ? prompts : asList(context.trainingData.genericObservationPrompts),
      promptSource: prompts.length ? "case" : "generic",
      hints
    };
  }

  function verificationView(context, caseItem) {
    const truth = caseItem.diagnosticGroundTruth || {};
    const method = truth.confirmationMethod;
    const histopathology = method === "histopathology";
    return {
      method,
      methodLabel: METHOD_LABELS[method] || "Recorded confirmation method",
      histopathologyRecorded: histopathology,
      histopathologyLine: histopathology
        ? (HISTOPATHOLOGY_SOURCE_LABELS[truth.histopathologySource] || "Histopathology is the recorded confirmation method.")
        : "No histopathology is recorded for this case.",
      strength: histopathology
        ? (truth.histopathologySource === "article_methods" ? "Histopathology, study-level statement" : "Histopathology")
        : method === "clinical_diagnosis" ? "Clinical or caption label, the weakest stored method" : METHOD_LABELS[method] || "Recorded method",
      confirmedDiagnosis: text(truth.confirmedDiagnosis),
      notes: text(truth.confirmationNotes),
      confidenceNote: text(truth.confidenceNote)
    };
  }

  function patternView(context, caseItem) {
    return asList(caseItem.patterns).map(row => {
      const canonicalId = context.links.get(row.id) || null;
      const canonical = canonicalId ? context.patterns.get(canonicalId) : null;
      return {
        label: row.label,
        canonicalName: canonical ? canonical.displayName : null,
        modality: row.modality === "dermoscopy" ? "Dermoscopy" : row.modality === "clinical" ? "Clinical" : text(row.modality),
        certainty: CERTAINTY_LABELS[row.certainty] || row.certainty,
        weight: WEIGHT_LABELS[row.weight] || row.weight,
        note: row.specificityNote || ""
      };
    });
  }

  function verificationShort(context, caseId) {
    const caseItem = context.byId.get(caseId);
    return caseItem ? verificationView(context, caseItem).strength : "Not recorded";
  }

  function comparisonView(context, caseItem, upcoming) {
    return asList(caseItem.compareWith).map(id => context.comparisons.get(id)).filter(Boolean).map(item => {
      const thisIsA = item.caseIdA === caseItem.id;
      const partnerId = thisIsA ? item.caseIdB : item.caseIdA;
      const partner = context.byId.get(partnerId);
      if (upcoming.has(partnerId)) {
        return { id: item.id, withheld: true, note: "One linked comparison is withheld because that lesion is still ahead in this session. It opens in the debrief." };
      }
      const row = context.eligibility.get(partnerId);
      return {
        id: item.id,
        withheld: false,
        partnerTitle: partner ? partner.title : partnerId,
        partnerDiagnosis: partner ? partner.diagnosisLabel : "",
        partnerVerification: verificationShort(context, partnerId),
        partnerLimitation: row && row.status !== "core_training" ? row.reasons.map(reason => context.trainingData.limitationText[reason] || reason) : [],
        sharedFeatures: asList(item.sharedFeatures),
        favouringThis: asList(thisIsA ? item.favouringA : item.favouringB),
        favouringPartner: asList(thisIsA ? item.favouringB : item.favouringA),
        discriminator: item.discriminator || null,
        commonTrap: item.commonTrap || null,
        limits: item.limits || null
      };
    });
  }

  function impressionDirection(impression) {
    if (impression === "benign-leaning") return "benign";
    if (impression === "suspicious") return "malignant";
    return null;
  }

  // Reflection only. It never says correct or incorrect and is never counted.
  function reflectionView(context, caseItem, record) {
    const labels = new Map(asList(context.trainingData.impressions).map(item => [item.id, item.label]));
    const families = new Map(asList(context.trainingData.families).map(item => [item.id, item.label]));
    const final = record && (record.post || record.pre) || null;
    const group = poleGroup(casePole(context, caseItem));
    const direction = impressionDirection(final);
    const differs = Boolean(direction && group !== "intermediate" && direction !== group);
    return {
      pre: record && record.pre ? labels.get(record.pre) : null,
      post: record && record.post ? labels.get(record.post) : null,
      family: record && record.family ? families.get(record.family) : null,
      workingDiagnosis: record && record.workingDiagnosis ? record.workingDiagnosis : null,
      sourceDiagnosis: caseItem.diagnosisLabel,
      recordedCategory: caseItem.category,
      directionDiffers: differs,
      pull: differs ? {
        closestMimic: caseItem.closestMimic ? { name: caseItem.closestMimic.name, whyClosest: caseItem.closestMimic.whyClosest } : null,
        trap: caseItem.diagnosticTrap || null,
        whyNot: asList(caseItem.whyNot).map(item => ({ mimic: item.mimic, text: item.text }))
      } : null
    };
  }

  function revealView(context, caseItem, options) {
    const opts = options || {};
    const upcoming = new Set(asList(opts.upcomingCaseIds));
    const row = context.eligibility.get(caseItem.id);
    const pair = pairRecord(context, caseItem);
    const paired = caseItem.pairedModality && isTruePair(context, caseItem) ? caseItem.pairedModality : null;
    const limitations = [];
    if (opts.role === "context" || row.status !== "core_training") {
      limitations.push(context.trainingData.contextCaseNote);
      row.reasons.forEach(reason => limitations.push(context.trainingData.limitationText[reason] || reason));
    }
    if (row.site === "nail") limitations.push(context.trainingData.nailUnitNote);
    if (paired && text(paired.limits)) limitations.push(paired.limits);
    return {
      caseId: caseItem.id,
      title: caseItem.title,
      source: {
        diagnosisLabel: caseItem.diagnosisLabel,
        linkedRecord: diagnosisName(context, caseItem.diseaseId),
        recordedCategory: caseItem.category,
        pole: POLE_LABELS[casePole(context, caseItem)] || "Not recorded"
      },
      verification: verificationView(context, caseItem),
      reflection: reflectionView(context, caseItem, opts.record),
      observations: asList(caseItem.observations).map(item => ({ text: item.text, modality: item.modality || null })),
      interpretations: asList(caseItem.interpretations).map(item => item.text),
      synthesis: caseItem.synthesis || null,
      evidenceWeighting: caseItem.evidenceWeighting || null,
      teachingPoints: asList(caseItem.teachingPoints).map(item => ({ title: item.title, text: item.text })),
      patterns: patternView(context, caseItem),
      whatChanged: paired ? {
        pairLabel: PAIR_LABELS[pair.provenance] || pair.provenance,
        before: paired.clinicalObservation,
        added: paired.dermoscopicObservation,
        addedValue: paired.addedValue,
        impact: paired.reasoningImpact,
        impactLabel: paired.informationGain ? `${INFORMATION_GAIN_LABELS[paired.informationGain] || paired.informationGain}. Educational label, not a metric.` : null
      } : null,
      closestMimic: caseItem.closestMimic ? { name: caseItem.closestMimic.name, whyClosest: caseItem.closestMimic.whyClosest } : null,
      whyNot: asList(caseItem.whyNot).map(item => ({ mimic: item.mimic, text: item.text })),
      differentials: asList(caseItem.differentials).map(item => ({ diagnosis: item.diagnosis, distinction: item.teachingDistinction })),
      comparisons: comparisonView(context, caseItem, upcoming),
      trap: caseItem.diagnosticTrap || null,
      takeHomeRule: caseItem.takeHomeRule || null,
      mentorNote: caseItem.mentorNote || null,
      limitations,
      role: opts.role || "core",
      eligibility: row.status,
      reviewLine: caseItem.reviewStatus === "clinician reviewed"
        ? "Clinician reviewed for this exact case version. Educational material, not clinical decision support."
        : "Review required. This case is not clinician reviewed.",
      attributions: asList(caseItem.images).map(image => ({
        modality: image.type === "dermoscopy" ? "Dermoscopic image" : image.type === "clinical" ? "Clinical photograph" : "Image",
        attribution: image.attribution,
        license: image.license,
        licenseUrl: image.licenseUrl,
        sourceUrl: image.sourceUrl,
        modification: image.modificationStatus
      }))
    };
  }

  function workingDiagnosisOptions(context) {
    return [...new Set(context.cases.map(item => diagnosisName(context, item.diseaseId)))].sort((a, b) => a.localeCompare(b));
  }

  // Stored comparisons whose two lesions were both revealed in this session.
  function sessionComparisons(context, revealedIds) {
    const shown = new Set(revealedIds);
    return asList(context.caseData.comparisons).filter(item => shown.has(item.caseIdA) && shown.has(item.caseIdB)).map(item => ({
      id: item.id,
      titleA: context.byId.get(item.caseIdA).title,
      diagnosisA: context.byId.get(item.caseIdA).diagnosisLabel,
      titleB: context.byId.get(item.caseIdB).title,
      diagnosisB: context.byId.get(item.caseIdB).diagnosisLabel,
      discriminator: item.discriminator || null,
      commonTrap: item.commonTrap || null,
      limits: item.limits || null
    }));
  }

  // Qualitative recap of what was actually presented and revealed.
  function buildDebrief(context, composition, records) {
    const revealed = asList(composition.items).filter(item => records[item.caseId] && records[item.caseId].revealed);
    const categories = new Map();
    const poles = { benign: 0, malignant: 0, intermediate: 0 };
    const patternMap = new Map();
    const dermoscopyChanged = [];
    const traps = [];
    const revisitFromChoices = new Set();
    const contextCases = [];
    const labels = new Map(asList(context.trainingData.impressions).map(item => [item.id, item.label]));
    revealed.forEach(item => {
      const caseItem = context.byId.get(item.caseId);
      const row = context.eligibility.get(item.caseId);
      const record = records[item.caseId];
      categories.set(caseItem.category, (categories.get(caseItem.category) || 0) + 1);
      poles[row.poleGroup] += 1;
      for (const id of teachingPatternIds(context, caseItem)) {
        const entry = patternMap.get(id) || { id, name: context.patterns.get(id).displayName, role: context.patterns.get(id).educationalRole, cases: [], poles: new Set() };
        entry.cases.push(item.caseId);
        entry.poles.add(row.poleGroup);
        patternMap.set(id, entry);
      }
      if (record.pre && record.post && record.pre !== record.post) {
        dermoscopyChanged.push({ caseId: item.caseId, title: caseItem.title, pre: labels.get(record.pre), post: labels.get(record.post), source: caseItem.diagnosisLabel });
      }
      if (caseItem.diagnosticTrap) traps.push({ caseId: item.caseId, title: caseItem.title, trap: caseItem.diagnosticTrap });
      const final = record.post || record.pre;
      const direction = impressionDirection(final);
      if (final === "uncertain" || (direction && row.poleGroup !== "intermediate" && direction !== row.poleGroup)) {
        teachingPatternIds(context, caseItem).forEach(id => revisitFromChoices.add(id));
      }
      if (item.role === "context" || row.status !== "core_training") contextCases.push({ caseId: item.caseId, title: caseItem.title, reasons: row.reasons.map(reason => context.trainingData.limitationText[reason] || reason) });
    });
    const patterns = [...patternMap.values()].map(entry => ({ id: entry.id, name: entry.name, role: entry.role, caseIds: entry.cases, poles: [...entry.poles].sort() }));
    const acrossPoles = patterns.filter(entry => entry.poles.includes("benign") && entry.poles.includes("malignant"));
    const revisitIds = new Set([...acrossPoles.map(entry => entry.id), ...revisitFromChoices]);
    return {
      casesReviewed: revealed.length,
      categories: [...categories.entries()].map(([name, count]) => ({ name, count })),
      poleContexts: poles,
      patterns,
      acrossPoles,
      dermoscopyChanged,
      traps,
      revisit: patterns.filter(entry => revisitIds.has(entry.id)),
      contextCases,
      sessionComparisons: sessionComparisons(context, revealed.map(item => item.caseId))
    };
  }

  function eligibilityReport(context) {
    const rows = [...context.eligibility.values()];
    const core = rows.filter(row => row.status === "core_training");
    const coreCases = core.map(row => context.byId.get(row.caseId));
    const structurePoles = new Map();
    core.forEach(row => row.structures.forEach(id => {
      if (!structurePoles.has(id)) structurePoles.set(id, new Set());
      structurePoles.get(id).add(row.poleGroup);
    }));
    const melanomaMimics = coreCases.filter(item => {
      const row = context.eligibility.get(item.id);
      return row.poleGroup === "benign" && matchesBlueprint(context, { filter: "melanoma-or-mimic" }, item);
    });
    const blueprints = asList(context.trainingData.blueprints).map(blueprint => {
      const pool = blueprintPool(context, blueprint.id);
      return {
        id: blueprint.id,
        title: blueprint.title,
        coreCases: pool.core.map(item => item.id),
        contextCases: pool.context.map(item => item.id),
        distinctSourceLesions: distinctGroups(context, pool.core),
        lengths: availableLengths(context, blueprint.id).map(item => `${item.id} (${item.cases})`)
      };
    });
    const tally = (list, key) => list.reduce((acc, row) => { acc[row[key]] = (acc[row[key]] || 0) + 1; return acc; }, {});
    return {
      totalCases: rows.length,
      core: core.map(row => row.caseId),
      contextOnly: rows.filter(row => row.status === "context_only").map(row => ({ caseId: row.caseId, reasons: [...row.reasons] })),
      excluded: rows.filter(row => row.status === "excluded").map(row => ({ caseId: row.caseId, reasons: [...row.reasons] })),
      corePoles: tally(core, "poleGroup"),
      coreFamilies: tally(core, "family"),
      coreSites: tally(core, "site"),
      coreMethods: tally(core, "confirmationMethod"),
      coreHistopathology: core.filter(row => row.histopathology).map(row => row.caseId),
      corePaired: core.filter(row => row.paired).map(row => row.caseId),
      coreMelanoma: coreCases.filter(item => /melanoma|lentigo maligna/i.test(item.diagnosisLabel) && context.eligibility.get(item.id).poleGroup === "malignant").map(item => item.id),
      coreMelanomaMimics: melanomaMimics.map(item => item.id),
      coreFace: core.filter(row => row.site === "face").map(row => row.caseId),
      coreAcral: core.filter(row => row.site === "acral").map(row => row.caseId),
      coreNail: core.filter(row => row.site === "nail").map(row => row.caseId),
      structures: [...structurePoles.keys()].sort(),
      structuresBothPoles: [...structurePoles.entries()].filter(([, poles]) => poles.has("benign") && poles.has("malignant")).map(([id]) => id).sort(),
      blueprints
    };
  }

  return Object.freeze({
    LEAK_PATTERN,
    specialSite,
    lesionPole,
    poleGroup,
    mulberry32,
    hashSeed,
    createContext,
    casePole,
    familyOf,
    publicImageSrc,
    sourceGroups,
    leaksFor,
    blueprintPool,
    availableLengths,
    composeSession,
    preRevealView,
    revealView,
    verificationView,
    workingDiagnosisOptions,
    buildDebrief,
    eligibilityReport,
    teachingPatternIds,
    minimumEach
  });
});
