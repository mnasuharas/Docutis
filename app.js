(function () {
  "use strict";

  const data = window.DOCUTIS_DATA;
  const cardsElement = document.getElementById("cards");
  const detailsElement = document.getElementById("details");
  const filtersElement = document.getElementById("categoryFilters");
  const noResultElement = document.getElementById("noResult");
  const resultStatusElement = document.getElementById("resultStatus");
  const searchInput = document.getElementById("searchInput");
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

  function filteredDiseases() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    return data.diseases.filter(disease => {
      const categoryMatches = activeCategory === "all" || disease.category === activeCategory;
      const searchable = [disease.name, disease.alternative, disease.description, categoryTitle(disease.category),
        subcategoryTitle(disease.subcategory), ...codingSearchText(disease.coding)];
      return categoryMatches && (!query || searchable.some(value => value.toLocaleLowerCase().includes(query)));
    });
  }

  function hideDetails(options = {}) {
    detailsElement.hidden = true;
    detailsElement.replaceChildren();
    if (options.restoreFocus && lastOpenedCard && document.contains(lastOpenedCard)) lastOpenedCard.focus();
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
      showDisease(disease.id);
    });
    return card;
  }

  function renderCards() {
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
    hideDetails();
  }

  function addDetailSection(title, content) {
    const section = document.createElement("div");
    section.className = "detail-section";
    appendTextElement(section, "h3", title);
    appendTextElement(section, "p", content);
    detailsElement.appendChild(section);
  }

  function addCodingSection(disease) {
    const section = document.createElement("div");
    section.className = "detail-section coding-section";
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
    detailsElement.appendChild(section);
  }

  function showDisease(id) {
    const disease = data.diseases.find(item => item.id === id);
    if (!disease) return;
    detailsElement.replaceChildren();
    const header = document.createElement("div");
    header.className = "detail-header";
    const headingGroup = document.createElement("div");
    const detailsHeading = appendTextElement(headingGroup, "h2", disease.name);
    detailsHeading.id = "diseaseDetailsTitle";
    appendTextElement(headingGroup, "p", `Alternative name: ${disease.alternative}`);
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
    closeButton.addEventListener("click", () => hideDetails({ restoreFocus: true }));
    detailsElement.appendChild(header);
    appendTextElement(detailsElement, "p", reviewed
      ? "Physician review applies to this content version. It does not guarantee correctness or replace professional medical judgment."
      : "This record has not completed human physician review. Automated tests and source metadata checks do not constitute clinical review.", "review-explanation");
    addDetailSection("Overview", disease.description);
    addDetailSection("Clinical Features", disease.clinical);
    addDetailSection("Dermoscopy", disease.dermoscopy);
    addDetailSection("Differential Diagnosis", disease.differential);
    addDetailSection("Treatment Overview", disease.treatment);
    addDetailSection("Follow-up", disease.followup);
    addCodingSection(disease);
    const referencesSection = document.createElement("div");
    referencesSection.className = "detail-section";
    appendTextElement(referencesSection, "h3", "References");
    const list = document.createElement("ul");
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
    referencesSection.appendChild(list);
    detailsElement.appendChild(referencesSection);
    detailsElement.hidden = false;
    detailsElement.focus({ preventScroll: true });
    detailsElement.scrollIntoView({ behavior: "smooth", block: "start" });
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
      const button = appendTextElement(filtersElement, "button", category.title, "filter-button");
      button.type = "button";
      button.dataset.category = category.id;
      button.setAttribute("aria-pressed", String(category.id === activeCategory));
      button.addEventListener("click", () => setActiveCategory(category.id));
    });
  }

  searchInput.addEventListener("input", renderCards);
  detailsElement.addEventListener("keydown", event => {
    if (event.key === "Escape") hideDetails({ restoreFocus: true });
  });
  renderFilters();
  renderCards();
}());
