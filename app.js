(function () {
  "use strict";

  const data = window.DOCUTIS_DATA;
  const mediaData = window.DOCUTIS_MEDIA || { items: [] };
  const cardsElement = document.getElementById("cards");
  const detailsElement = document.getElementById("details");
  const filtersElement = document.getElementById("categoryFilters");
  const libraryStatsElement = document.getElementById("libraryStats");
  const noResultElement = document.getElementById("noResult");
  const resultStatusElement = document.getElementById("resultStatus");
  const searchClear = document.getElementById("searchClear");
  const searchInput = document.getElementById("searchInput");
  const reviewDashboardCounts = document.getElementById("reviewDashboardCounts");
  let activeCategory = "all";
  let lastOpenedCard = null;

  function appendTextElement(parent, tagName, value, className) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    element.textContent = value;
    parent.appendChild(element);
    return element;
  }

  function categoryTitle(categoryId) {
    const category = data.categories.find(item => item.id === categoryId);
    return category ? category.title : "Uncategorized";
  }

  function subcategoryTitle(subcategoryId) {
    const subcategory = data.subcategories.find(item => item.id === subcategoryId);
    return subcategory ? subcategory.title : "Uncategorized";
  }

  function codingSearchText(coding) {
    const diagnoses = coding.diagnoses.flatMap(item => [item.system, item.version, item.code, item.label, item.note]);
    const oncology = coding.icdo
      ? [coding.icdo.system, coding.icdo.version, coding.icdo.topography.code, coding.icdo.topography.label,
        coding.icdo.topography.note, ...coding.icdo.morphologies.flatMap(item => [item.code, item.label, item.note])]
      : [];
    return [...diagnoses, ...oncology, coding.icdoApplicability, coding.verificationNote].filter(Boolean);
  }

  function compactCodingLabel(disease) {
    const diagnosis = disease.coding.diagnoses[0];
    if (diagnosis) return `${diagnosis.system}: ${diagnosis.code}`;
    const morphology = disease.coding.icdo && disease.coding.icdo.morphologies[0];
    if (morphology) return `ICD-O ${disease.coding.icdo.version} morphology: ${morphology.code}`;
    return "Coding: verification required";
  }

  function clinicalProfileSearchText(profile) {
    if (!profile) return [];
    const values = [];
    function visit(value) {
      if (value === null || value === undefined) return;
      if (typeof value === "string") values.push(value, value.replaceAll("-", " "));
      else if (Array.isArray(value)) value.forEach(visit);
      else if (typeof value === "object") Object.values(value).forEach(visit);
    }
    visit(profile.aliases);
    visit(profile.epidemiology);
    visit(profile.etiology);
    visit(profile.presentation);
    return values;
  }

  function filteredDiseases() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    return data.diseases.filter(disease => {
      const categoryMatches = activeCategory === "all" || disease.category === activeCategory;
      const searchable = [disease.name, disease.alternative, disease.description, categoryTitle(disease.category),
        subcategoryTitle(disease.subcategory), ...codingSearchText(disease.coding), ...clinicalProfileSearchText(disease.clinicalProfile)];
      return categoryMatches && (!query || searchable.some(value => value.toLocaleLowerCase().includes(query)));
    });
  }

  function conditionUrl(id) {
    if (!window.location) return "";
    const url = new URL(window.location.href);
    if (id) url.searchParams.set("condition", id);
    else url.searchParams.delete("condition");
    return `${url.pathname}${url.search}${url.hash}`;
  }

  function updateConditionUrl(id, mode = "push", state = {}) {
    if (!window.history?.[`${mode}State`] || !window.location) return;
    window.history[`${mode}State`]({ ...state, docutisCondition: id || null }, "", conditionUrl(id));
  }

  function hideDetails(options = {}) {
    detailsElement.hidden = true;
    detailsElement.replaceChildren();
    if (options.clearUrl) updateConditionUrl(null, "replace");
    if (options.restoreFocus && lastOpenedCard && document.contains(lastOpenedCard)) lastOpenedCard.focus();
  }

  function closeDiseaseDetails() {
    if (window.location && new URL(window.location.href).searchParams.has("condition")) {
      if (window.history?.state?.docutisCondition && !window.history.state.directEntry && window.history.length > 1) {
        window.history.back();
        return;
      }
      updateConditionUrl(null, "replace");
    }
    hideDetails({ restoreFocus: true });
  }

  function createCard(disease) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card";
    card.setAttribute("aria-label", `Open details for ${disease.name}`);
    appendTextElement(card, "span", disease.name, "card-title");
    appendTextElement(card, "span", subcategoryTitle(disease.subcategory), "subcategory-label");
    appendTextElement(card, "span", disease.description, "card-description");
    appendTextElement(card, "span", compactCodingLabel(disease), "icd");
    card.addEventListener("click", () => {
      lastOpenedCard = card;
      showDisease(disease.id, { updateUrl: true });
    });
    return card;
  }

  function renderCards(options = {}) {
    const matches = filteredDiseases();
    cardsElement.replaceChildren();
    data.categories.forEach(category => {
      const categoryDiseases = matches.filter(disease => disease.category === category.id);
      if (!categoryDiseases.length) return;
      const section = document.createElement("section");
      section.className = "category-section";
      section.setAttribute("aria-labelledby", `category-${category.id}`);
      const heading = appendTextElement(section, "h3", category.title, "category-title");
      heading.id = `category-${category.id}`;
      const grid = document.createElement("div");
      grid.className = "category-grid";
      categoryDiseases.forEach(disease => grid.appendChild(createCard(disease)));
      section.appendChild(grid);
      cardsElement.appendChild(section);
    });
    noResultElement.style.display = matches.length ? "none" : "block";
    resultStatusElement.textContent = `${matches.length} condition${matches.length === 1 ? "" : "s"} shown.`;
    if (searchClear) searchClear.hidden = !searchInput.value;
    hideDetails({ clearUrl: !options.preserveUrl && !detailsElement.hidden });
  }

  function addDetailSection(parent, title, content, id, modifier = "") {
    const section = document.createElement("section");
    section.className = `detail-section${modifier ? ` ${modifier}` : ""}`;
    section.id = id;
    appendTextElement(section, "h3", title);
    appendTextElement(section, "p", content);
    parent.appendChild(section);
    return section;
  }

  function humanize(value) {
    return value.replaceAll("-", " ").replace(/\b\w/g, character => character.toUpperCase());
  }

  function addStructuredList(parent, values, className = "structured-list") {
    const list = document.createElement("ul");
    list.className = className;
    values.forEach(value => appendTextElement(list, "li", value));
    parent.appendChild(list);
    return list;
  }

  function addStructuredField(parent, label, values) {
    if (!values || (Array.isArray(values) && !values.length)) return;
    const row = document.createElement("div");
    row.className = "structured-field";
    appendTextElement(row, "h4", label);
    if (Array.isArray(values)) {
      const tags = document.createElement("div");
      tags.className = "clinical-tags";
      values.forEach(value => appendTextElement(tags, "span", humanize(value), "clinical-tag"));
      row.appendChild(tags);
    } else appendTextElement(row, "p", values);
    parent.appendChild(row);
  }

  function addEvidenceDisclosure(parent, disease, domain, label) {
    const urls = disease.clinicalProfile?.evidenceMap?.[domain];
    if (!urls?.length) return;
    const disclosure = document.createElement("details");
    disclosure.className = "evidence-disclosure";
    appendTextElement(disclosure, "summary", `Evidence for ${label || humanize(domain)} (${urls.length})`);
    appendTextElement(disclosure, "p", "Mapped sources support this section at section level; source attachment is not physician endorsement.", "evidence-note");
    const list = document.createElement("ul");
    urls.forEach(url => {
      const reference = disease.references.find(item => item.url === url);
      const item = document.createElement("li");
      const link = appendTextElement(item, "a", `Source supporting ${label || humanize(domain)}: ${reference.title} (opens in a new tab)`);
      link.href = reference.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      list.appendChild(item);
    });
    disclosure.appendChild(list);
    parent.appendChild(disclosure);
  }

  function addClinicalPresentationSection(parent, disease) {
    const profile = disease.clinicalProfile;
    if (!profile) return addDetailSection(parent, "Clinical features", disease.clinical, "detail-clinical");
    const section = document.createElement("section");
    section.className = "detail-section structured-section";
    section.id = "detail-clinical";
    appendTextElement(section, "h3", "Clinical presentation");
    appendTextElement(section, "p", disease.clinical, "structured-summary");
    const morphology = profile.presentation.morphology;
    const morphologyTerms = [
      ...(morphology.primaryLesions || []), ...(morphology.otherPrimaryLesions || []),
      ...(morphology.secondaryChanges || []), ...(morphology.colors || []),
      ...(morphology.surface || []), ...(morphology.border || []), ...(morphology.configuration || [])
    ];
    addStructuredField(section, "Morphology", morphologyTerms);
    if (morphology.typicalSize) addStructuredField(section, "Typical size", morphology.typicalSize);
    if (morphology.text) appendTextElement(section, "p", morphology.text, "structured-note");
    const localization = profile.presentation.localization;
    if (localization) {
      addStructuredField(section, "Typical localization", [...(localization.sites || []), ...(localization.distribution || [])]);
      if (localization.text) appendTextElement(section, "p", localization.text, "structured-note");
    }
    if (profile.presentation.symptoms) {
      addStructuredField(section, "Symptoms", profile.presentation.symptoms.values);
      if (profile.presentation.symptoms.text) appendTextElement(section, "p", profile.presentation.symptoms.text, "structured-note");
    }
    if (profile.presentation.course) addStructuredField(section, "Course", profile.presentation.course.values);
    if (profile.etiology) addStructuredField(section, "Etiology / pathogenesis", profile.etiology.text || profile.etiology.mechanisms);
    if (profile.epidemiology) {
      addStructuredField(section, "Typical age groups", profile.epidemiology.ageGroups);
      if (profile.epidemiology.sexDistribution) addStructuredField(section, "Sex distribution", profile.epidemiology.sexDistribution);
      addStructuredField(section, "Risk groups", profile.epidemiology.riskGroups);
      if (profile.epidemiology.prevalence) addStructuredField(section, "Prevalence / rarity", profile.epidemiology.prevalence);
      addStructuredField(section, "Seasonal / environmental associations", profile.epidemiology.associations);
    }
    addEvidenceDisclosure(section, disease, "presentation", "clinical presentation");
    parent.appendChild(section);
    return section;
  }

  function addDiagnosisSection(parent, disease) {
    const profile = disease.clinicalProfile;
    if (!profile) return addDetailSection(parent, "Dermoscopy", disease.dermoscopy, "detail-dermoscopy");
    const section = document.createElement("section");
    section.className = "detail-section structured-section";
    section.id = "detail-dermoscopy";
    appendTextElement(section, "h3", "Diagnosis and dermoscopy");
    if (profile.diagnostics) {
      appendTextElement(section, "h4", "Diagnostic approach");
      const list = document.createElement("ul");
      list.className = "structured-list diagnostic-list";
      profile.diagnostics.forEach(item => {
        const row = document.createElement("li");
        appendTextElement(row, "strong", `${humanize(item.method)} · ${humanize(item.role)}`);
        appendTextElement(row, "span", item.indication);
        if (item.findings) appendTextElement(row, "span", item.findings, "structured-note");
        list.appendChild(row);
      });
      section.appendChild(list);
    }
    appendTextElement(section, "h4", "Dermoscopy");
    appendTextElement(section, "p", disease.dermoscopy);
    if (profile.dermoscopy) {
      const dermoscopyTerms = [
        ...(profile.dermoscopy.patterns || []), ...(profile.dermoscopy.vascularStructures || []),
        ...(profile.dermoscopy.pigmentStructures || []), ...(profile.dermoscopy.scaleKeratinClues || []),
        ...(profile.dermoscopy.highRiskClues || [])
      ];
      addStructuredField(section, "Structured findings", dermoscopyTerms);
      if (profile.dermoscopy.text) appendTextElement(section, "p", profile.dermoscopy.text, "structured-note");
    }
    if (profile.histopathology) {
      appendTextElement(section, "h4", "High-yield histopathology");
      appendTextElement(section, "p", profile.histopathology);
    }
    addEvidenceDisclosure(section, disease, "diagnostics", "diagnostic workflow");
    addEvidenceDisclosure(section, disease, "dermoscopy", "dermoscopy");
    parent.appendChild(section);
    return section;
  }

  function addDifferentialSection(parent, disease) {
    const profile = disease.clinicalProfile;
    if (!profile?.differentials) return addDetailSection(parent, "Differential diagnosis", disease.differential, "detail-differential");
    const section = document.createElement("section");
    section.className = "detail-section structured-section";
    section.id = "detail-differential";
    appendTextElement(section, "h3", "Differential diagnosis");
    const list = document.createElement("ul");
    list.className = "structured-list differential-list";
    profile.differentials.forEach(item => {
      const row = document.createElement("li");
      appendTextElement(row, "strong", item.diagnosis);
      if (item.distinguishingClue) appendTextElement(row, "span", item.distinguishingClue);
      list.appendChild(row);
    });
    section.appendChild(list);
    addEvidenceDisclosure(section, disease, "differentials", "differential diagnosis");
    parent.appendChild(section);
    return section;
  }

  function addTreatmentSection(parent, disease) {
    const profile = disease.clinicalProfile;
    if (!profile?.treatment) return addDetailSection(parent, "Treatment overview", disease.treatment, "detail-treatment", "detail-section--treatment");
    const section = document.createElement("section");
    section.className = "detail-section detail-section--treatment structured-section";
    section.id = "detail-treatment";
    appendTextElement(section, "h3", "Treatment overview");
    appendTextElement(section, "p", disease.treatment, "structured-summary");
    profile.treatment.steps.forEach(step => {
      const tier = document.createElement("div");
      tier.className = "treatment-tier";
      appendTextElement(tier, "h4", humanize(step.level));
      const list = document.createElement("ul");
      list.className = "structured-list";
      step.interventions.forEach(item => {
        const row = document.createElement("li");
        appendTextElement(row, "strong", item.intervention);
        if (item.details) appendTextElement(row, "span", item.details);
        (item.medications || []).forEach(medication => {
          const details = [medication.formulation, medication.dose, medication.frequency, medication.duration].filter(Boolean).join(" · ");
          appendTextElement(row, "span", `${medication.name}${details ? ` — ${details}` : ""}`, "medication-detail");
          const safeguards = [medication.contraindications, medication.precautions, medication.monitoring, medication.pregnancy].filter(Boolean);
          if (safeguards.length) appendTextElement(row, "span", safeguards.join(" · "), "structured-note");
        });
        list.appendChild(row);
      });
      tier.appendChild(list);
      section.appendChild(tier);
    });
    if (profile.treatment.nonPharmacological) {
      appendTextElement(section, "h4", "Non-pharmacological care");
      addStructuredList(section, profile.treatment.nonPharmacological);
    }
    addEvidenceDisclosure(section, disease, "treatment", "treatment hierarchy");
    parent.appendChild(section);
    return section;
  }

  function addFollowUpSection(parent, disease) {
    const profile = disease.clinicalProfile;
    if (!profile?.followUp) return addDetailSection(parent, "Follow-up", disease.followup, "detail-follow-up", "detail-section--follow-up");
    const section = document.createElement("section");
    section.className = "detail-section detail-section--follow-up structured-section";
    section.id = "detail-follow-up";
    appendTextElement(section, "h3", "Follow-up and escalation");
    appendTextElement(section, "span", humanize(profile.followUp.strategy), "strategy-label");
    appendTextElement(section, "p", profile.followUp.text);
    if (profile.redFlags) {
      appendTextElement(section, "h4", "Red flags");
      addStructuredList(section, profile.redFlags, "structured-list red-flag-list");
    }
    if (profile.referral) {
      appendTextElement(section, "h4", "Referral / escalation");
      addStructuredList(section, profile.referral.map(item => `${humanize(item.type)} — ${item.indication}`));
    }
    if (profile.patientCounseling) {
      appendTextElement(section, "h4", "Patient counseling");
      addStructuredList(section, profile.patientCounseling);
    }
    addEvidenceDisclosure(section, disease, "followUp", "follow-up");
    addEvidenceDisclosure(section, disease, "redFlags", "red flags");
    parent.appendChild(section);
    return section;
  }

  function addOncologySection(parent, disease) {
    const oncology = disease.clinicalProfile?.oncology;
    if (!oncology) return false;
    const section = document.createElement("section");
    section.className = "detail-section structured-section oncology-section";
    section.id = "detail-oncology";
    appendTextElement(section, "h3", "Oncology context");
    Object.entries(oncology).forEach(([key, value]) => addStructuredField(section, humanize(key), value));
    addEvidenceDisclosure(section, disease, "oncology", "oncology context");
    parent.appendChild(section);
    return true;
  }

  function addCodingSection(parent, disease) {
    const section = document.createElement("section");
    section.className = "detail-section coding-section";
    section.id = "detail-coding";
    appendTextElement(section, "h3", "Classification and coding");

    if (disease.coding.diagnoses.length) {
      appendTextElement(section, "h4", "Diagnosis classification");
      const diagnosisList = document.createElement("ul");
      disease.coding.diagnoses.forEach(entry => {
        const item = document.createElement("li");
        appendTextElement(item, "strong", `${entry.system} ${entry.version}: ${entry.code} — ${entry.label}`);
        if (entry.note) appendTextElement(item, "p", entry.note, "coding-note");
        diagnosisList.appendChild(item);
      });
      section.appendChild(diagnosisList);
    }

    if (disease.coding.icdo) {
      const oncology = disease.coding.icdo;
      appendTextElement(section, "h4", `${oncology.system} ${oncology.version} (oncology registry coding)`);
      const oncologyList = document.createElement("ul");
      const topographyItem = document.createElement("li");
      const topographyCode = oncology.topography.code ? ` ${oncology.topography.code}` : "";
      appendTextElement(topographyItem, "strong", `Topography${topographyCode} — ${oncology.topography.label}`);
      if (oncology.topography.note) appendTextElement(topographyItem, "p", oncology.topography.note, "coding-note");
      oncologyList.appendChild(topographyItem);
      oncology.morphologies.forEach(entry => {
        const item = document.createElement("li");
        appendTextElement(item, "strong", `Morphology ${entry.code} — ${entry.label}`);
        if (entry.note) appendTextElement(item, "p", entry.note, "coding-note");
        oncologyList.appendChild(item);
      });
      section.appendChild(oncologyList);
    } else {
      appendTextElement(section, "h4", "ICD-O 3.2 (oncology registry coding)");
      const applicabilityText = disease.coding.icdoApplicability === "not applicable"
        ? "Not applicable — this non-neoplastic condition is outside ICD-O oncology registry coding."
        : "Not established for this record — no ICD-O mapping is asserted.";
      appendTextElement(section, "p", applicabilityText, "coding-note");
    }

    if (disease.coding.verificationNote) {
      appendTextElement(section, "p", `Verification note: ${disease.coding.verificationNote}`, "coding-warning");
    }
    parent.appendChild(section);
  }

  function mediaReviewText(item) {
    const review = item.clinicalReview;
    const reviewed = item.reviewStatus === "clinician reviewed" && review &&
      review.reviewerRole === "physician" && review.reviewerSpecialty && review.reviewedAt;
    return reviewed
      ? `Media review: Reviewed by a physician in ${review.reviewerSpecialty} on ${review.reviewedAt}`
      : "Media review: Clinician review required";
  }

  function addMediaSection(parent, disease) {
    const items = (mediaData.items || []).filter(item => item.diseaseId === disease.id);
    if (!items.length) return false;
    const section = document.createElement("section");
    section.className = "detail-section media-section";
    section.id = "detail-media";
    appendTextElement(section, "h3", "Educational media");
    appendTextElement(section, "p", "Media supports visual learning and does not replace clinical examination or histopathologic assessment.", "media-intro");
    const gallery = document.createElement("div");
    gallery.className = "media-gallery";
    items.forEach(item => {
      const figure = document.createElement("figure");
      figure.className = "media-item";
      const image = document.createElement("img");
      image.src = item.src;
      image.alt = item.alt;
      image.loading = "lazy";
      image.decoding = "async";
      image.width = item.dimensions.width;
      image.height = item.dimensions.height;
      const fallback = appendTextElement(figure, "p", "Educational image unavailable. Source details remain below.", "media-unavailable");
      fallback.hidden = true;
      image.addEventListener("error", () => {
        image.hidden = true;
        fallback.hidden = false;
      });
      figure.appendChild(image);
      const caption = document.createElement("figcaption");
      caption.className = "media-caption";
      appendTextElement(caption, "strong", item.title || item.caption);
      if (item.title) appendTextElement(caption, "span", item.caption);
      appendTextElement(caption, "span", item.educationalDescription);
      const metadata = document.createElement("div");
      metadata.className = "media-metadata";
      appendTextElement(metadata, "div", `${item.type} · Diagnosis: ${item.diagnosis}`);
      if (item.anatomicalSite) appendTextElement(metadata, "div", `Anatomical site: ${item.anatomicalSite}`);
      appendTextElement(metadata, "div", `License: ${item.license} · Attribution: ${item.attribution}`);
      appendTextElement(metadata, "div", `Patient-identifiable content: No · Consent basis: ${item.consentBasis}`);
      const sourceLink = appendTextElement(metadata, "a", `${item.source} (opens in a new tab)`);
      sourceLink.href = item.sourceUrl;
      sourceLink.target = "_blank";
      sourceLink.rel = "noopener noreferrer";
      appendTextElement(metadata, "div", `Source metadata checked: ${item.metadataCheckedAt}`);
      appendTextElement(metadata, "div", mediaReviewText(item));
      caption.appendChild(metadata);
      figure.appendChild(caption);
      gallery.appendChild(figure);
    });
    section.appendChild(gallery);
    parent.appendChild(section);
    return true;
  }

  function addReferencesSection(parent, disease) {
    const section = document.createElement("section");
    section.className = "detail-section references-section";
    section.id = "detail-sources";
    appendTextElement(section, "h3", "Sources");
    const disclosure = document.createElement("details");
    disclosure.className = "source-disclosure";
    appendTextElement(disclosure, "summary", `View ${disease.references.length} traceable source${disease.references.length === 1 ? "" : "s"}`);
    const list = document.createElement("ol");
    list.className = "source-list";
    disease.references.forEach(reference => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = reference.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = `${reference.title} (opens in a new tab)`;
      item.appendChild(link);
      const metadata = document.createElement("div");
      metadata.className = "reference-metadata";
      const bibliographicParts = [
        `Organization or journal: ${reference.organization}`,
        `Source type: ${reference.type}`,
        reference.year ? `Publication year: ${reference.year}` : null,
        reference.version ? `Version: ${reference.version}` : null
      ].filter(Boolean);
      appendTextElement(metadata, "div", bibliographicParts.join(" · "));
      if (reference.doi) {
        const doiLink = document.createElement("a");
        doiLink.href = `https://doi.org/${reference.doi}`;
        doiLink.target = "_blank";
        doiLink.rel = "noopener noreferrer";
        doiLink.textContent = `DOI: ${reference.doi} (opens in a new tab)`;
        metadata.appendChild(doiLink);
      }
      appendTextElement(metadata, "div", `Source metadata checked: ${reference.metadataCheckedAt}`);
      item.appendChild(metadata);
      list.appendChild(item);
    });
    disclosure.appendChild(list);
    section.appendChild(disclosure);
    parent.appendChild(section);
  }

  function addDetailNavigation(hasMedia, hasOncology) {
    const navigation = document.createElement("nav");
    navigation.className = "detail-jump-nav";
    navigation.setAttribute("aria-label", "Condition detail sections");
    const links = [
      ["detail-overview", "Overview"],
      ["detail-clinical", "Clinical features"],
      ["detail-dermoscopy", "Dermoscopy"],
      ["detail-differential", "Differential"],
      ["detail-treatment", "Treatment"],
      ["detail-follow-up", "Follow-up"],
      ["detail-coding", "Coding"]
    ];
    if (hasMedia) links.push(["detail-media", "Media"]);
    if (hasOncology) links.push(["detail-oncology", "Oncology"]);
    links.push(["detail-sources", "Sources"]);
    links.forEach(([id, label]) => {
      const link = appendTextElement(navigation, "a", label);
      link.href = `#${id}`;
    });
    detailsElement.appendChild(navigation);
  }

  function showDisease(id, options = {}) {
    const disease = data.diseases.find(item => item.id === id);
    if (!disease) return false;
    if (options.updateUrl) updateConditionUrl(id, "push");
    detailsElement.replaceChildren();
    const header = document.createElement("div");
    header.className = "detail-header";
    const headingGroup = document.createElement("div");
    const detailsHeading = appendTextElement(headingGroup, "h2", disease.name);
    detailsHeading.id = "diseaseDetailsTitle";
    appendTextElement(headingGroup, "p", `Alternative name: ${disease.alternative}`, "detail-alternative");
    const meta = document.createElement("div");
    meta.className = "detail-meta";
    appendTextElement(meta, "span", categoryTitle(disease.category), "icd");
    appendTextElement(meta, "span", subcategoryTitle(disease.subcategory), "subcategory-label");
    const review = disease.clinicalReview;
    const reviewed = disease.reviewStatus === "clinician reviewed" && review &&
      review.reviewerRole === "physician" && typeof review.reviewerSpecialty === "string" &&
      review.reviewerSpecialty.trim() && /^\d{4}-\d{2}-\d{2}$/.test(review.reviewedAt) &&
      /^sha256-v1:[0-9a-f]{64}$/.test(review.reviewedContentHash);
    appendTextElement(meta, "span", reviewed
      ? `Clinical review: Reviewed by a physician in ${review.reviewerSpecialty}`
      : "Clinical review: Required", "review-status");
    if (reviewed) appendTextElement(meta, "span", `Reviewed: ${review.reviewedAt}`);
    headingGroup.appendChild(meta);
    header.appendChild(headingGroup);
    const closeButton = appendTextElement(header, "button", "Close", "close-button");
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", `Close details for ${disease.name}`);
    closeButton.addEventListener("click", closeDiseaseDetails);
    detailsElement.appendChild(header);
    appendTextElement(detailsElement, "p", reviewed
      ? "Physician review applies to this content version. It does not guarantee correctness or replace professional medical judgment."
      : "This record has not completed human physician review. Automated tests and source metadata checks do not constitute clinical review.", "review-explanation");

    if (disease.clinicalProfile) {
      const workflow = document.createElement("div");
      workflow.className = "review-workflow";
      workflow.setAttribute("aria-label", "Clinical content workflow status");
      ["Structured content available", `${disease.references.length} sources attached`, "Automated schema validation included", reviewed ? "Clinician reviewed" : "Clinician review required"]
        .forEach(value => appendTextElement(workflow, "span", value));
      detailsElement.appendChild(workflow);
    }

    const hasMedia = (mediaData.items || []).some(item => item.diseaseId === disease.id);
    const hasOncology = Boolean(disease.clinicalProfile?.oncology);
    addDetailNavigation(hasMedia, hasOncology);
    const content = document.createElement("div");
    content.className = "detail-content";
    addDetailSection(content, "Overview", disease.description, "detail-overview", "detail-section--wide");
    addClinicalPresentationSection(content, disease);
    addDiagnosisSection(content, disease);
    addDifferentialSection(content, disease);
    addTreatmentSection(content, disease);
    addFollowUpSection(content, disease);
    addCodingSection(content, disease);
    addMediaSection(content, disease);
    addOncologySection(content, disease);
    addReferencesSection(content, disease);
    detailsElement.appendChild(content);
    detailsElement.hidden = false;
    detailsElement.focus({ preventScroll: true });
    detailsElement.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }

  function syncConditionFromUrl(options = {}) {
    if (!window.location) return;
    const id = new URL(window.location.href).searchParams.get("condition");
    if (!id) { hideDetails({ restoreFocus: !options.initial }); return; }
    const opened = showDisease(id);
    if (opened && options.initial) updateConditionUrl(id, "replace", { directEntry: true });
    if (!opened) hideDetails();
  }

  function setActiveCategory(categoryId) {
    activeCategory = categoryId;
    filtersElement.querySelectorAll("button").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.category === categoryId));
    });
    renderCards();
  }

  function renderFilters() {
    [{ id: "all", title: "All conditions" }, ...data.categories].forEach(category => {
      const button = document.createElement("button");
      button.className = "filter-button";
      button.type = "button";
      button.dataset.category = category.id;
      button.setAttribute("aria-pressed", String(category.id === activeCategory));
      const count = category.id === "all"
        ? data.diseases.length
        : data.diseases.filter(disease => disease.category === category.id).length;
      appendTextElement(button, "span", category.title, "filter-label");
      appendTextElement(button, "span", String(count), "filter-count");
      button.setAttribute("aria-label", `${category.title}, ${count} condition${count === 1 ? "" : "s"}`);
      button.addEventListener("click", () => setActiveCategory(category.id));
      filtersElement.appendChild(button);
    });
  }

  function renderLibraryStats() {
    if (!libraryStatsElement) return;
    const followUpCount = window.DOCUTIS_FOLLOW_UP_DATA?.protocols?.length || 0;
    const stats = [
      [`${data.diseases.length}`, "condition records"],
      [`${data.categories.length}`, "clinical categories"],
      [`${followUpCount}`, "oncology follow-up protocols"]
    ];
    stats.forEach(([value, label]) => {
      const item = document.createElement("span");
      item.className = "stat-item";
      appendTextElement(item, "strong", value);
      appendTextElement(item, "span", ` ${label}`);
      libraryStatsElement.appendChild(item);
    });
  }

  function renderReviewDashboard() {
    if (!reviewDashboardCounts) return;
    const followUps = window.DOCUTIS_FOLLOW_UP_DATA?.protocols || [];
    const mediaItems = mediaData.items || [];
    const reviewedRecords = data.diseases.filter(item => item.reviewStatus === "clinician reviewed").length;
    const stats = [
      [data.diseases.length, "Total conditions"],
      [data.diseases.filter(item => item.clinicalProfile).length, "Structured clinical profiles"],
      [data.diseases.filter(item => !item.clinicalProfile).length, "Legacy-compatible records"],
      [`${reviewedRecords}/${data.diseases.length}`, "Clinician-reviewed records"],
      [data.diseases.length - reviewedRecords, "Records requiring clinician review"],
      [mediaItems.length, "Governed visual-learning items"],
      [`${mediaItems.filter(item => item.reviewStatus === "clinician reviewed").length}/${mediaItems.length}`, "Reviewed visual items"],
      [`${followUps.length} · ${followUps.filter(item => item.reviewStatus === "clinician reviewed").length} reviewed`, "Follow-up protocols"]
    ];
    stats.forEach(([value, label]) => {
      const item = document.createElement("div");
      item.className = "review-stat";
      appendTextElement(item, "strong", String(value));
      appendTextElement(item, "span", label);
      reviewDashboardCounts.appendChild(item);
    });
  }

  function clearSearch() {
    searchInput.value = "";
    renderCards();
    searchInput.focus();
  }

  searchInput.addEventListener("input", renderCards);
  searchInput.addEventListener("keydown", event => {
    if (event.key === "Escape" && searchInput.value) {
      if (event.preventDefault) event.preventDefault();
      clearSearch();
    }
  });
  if (searchClear) searchClear.addEventListener("click", clearSearch);
  if (document.addEventListener) {
    document.addEventListener("keydown", event => {
      const target = event.target;
      const typing = target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
      if (event.key === "/" && !typing && !event.ctrlKey && !event.metaKey && !event.altKey) {
        if (event.preventDefault) event.preventDefault();
        searchInput.focus();
      }
    });
  }
  detailsElement.addEventListener("keydown", event => {
    if (event.key === "Escape") closeDiseaseDetails();
  });
  if (window.addEventListener) window.addEventListener("popstate", () => syncConditionFromUrl());
  renderLibraryStats();
  renderReviewDashboard();
  renderFilters();
  renderCards({ preserveUrl: true });
  syncConditionFromUrl({ initial: true });
}());
