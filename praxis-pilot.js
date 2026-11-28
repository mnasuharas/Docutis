(function () {
  "use strict";

  const detailed = window.DOCUTIS_PRAXIS_PILOT;
  const { chapters, handouts: addedHandouts } = window.DOCUTIS_PRAXIS_CATALOG;
  const byCondition = new Map(Object.entries(chapters).flatMap(([id, chapter]) =>
    chapter.conditions.map(condition => [condition, id])));
  const handouts = { ...addedHandouts };
  for (const [id, chapter] of Object.entries(chapters)) {
    const record = detailed[chapter.verifiedCard];
    if (record?.patient) {
      handouts[id] = { ...record.patient, page: record.handoutPage, germanName: record.germanName };
    }
  }
  const extraNotes = {
    "1.1": ["isotretinoin"],
    "1.2": ["sun-protection"],
    "1.27": ["sun-protection"],
    "2.23": ["1.27", "sun-protection"]
  };
  const notesFor = id => [...(Object.hasOwn(handouts, id) ? [id] : []), ...(extraNotes[id] || [])];
  const current = () => document.documentElement.lang === "tr" ? 1 : 0;
  const say = (en, tr) => current() ? tr : en;
  let activeView;

  function add(parent, tag, value, className) {
    const el = document.createElement(tag);
    if (value) el.textContent = value;
    if (className) el.className = className;
    parent.appendChild(el);
    return el;
  }

  function section(parent, id) {
    const element = add(parent, "section", "", "detail-section detail-section--wide praxis-pilot");
    element.id = id;
    element.setAttribute("data-no-translate", "");
    element.setAttribute("aria-labelledby", id + "-title");
    return element;
  }

  function source(parent, label, href) {
    const link = add(add(parent, "li"), "a", label);
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }

  function pair(parent, title, value, language) {
    add(parent, "dt", title);
    const text = add(parent, "dd", value);
    if (language) text.lang = language;
  }

  function verifiedContent(card, record, wasOpen) {
    const lang = current();
    const overview = add(card, "dl", "", "praxis-overview");
    pair(overview, say("Initial approach", "İlk yaklaşım"), record.approach[lang]);
    pair(overview, say("Follow-up and red flags", "Kontrol ve kırmızı bayraklar"), record.followUp[lang]);
    const prescribing = add(card, "details", "", "praxis-disclosure");
    prescribing.open = wasOpen;
    add(prescribing, "summary", say("Prescription example, authorisation and skin care", "Reçete örneği, ruhsat ve bakım"));
    add(prescribing, "h4", say("Product-specific example", "Preparata özgü örnek"));
    add(prescribing, "p", record.example[lang]);
    add(prescribing, "h4", say("Authorisation and off-label checks", "Ruhsat ve off-label kontrolü"));
    add(prescribing, "p", record.scope[lang]);
    add(prescribing, "h4", say("Supportive care", "Destekleyici bakım"));
    add(prescribing, "p", record.care[lang]);
  }

  function adaptedContent(card, record) {
    if (!current()) add(card, "p", "Source-based clinical text in Turkish.", "praxis-source-note");
    const overview = add(card, "dl", "", "praxis-overview");
    pair(overview, say("Typical appearance", "Tipik görünüm"), record.appearance, "tr");
    pair(overview, say("First assessment", "İlk değerlendirme"), record.diagnosis, "tr");
    pair(overview, say("Treatment considerations", "Tedavi değerlendirmesi"), record.approach, "tr");
    if (record.alerts) pair(overview, say("Red flags and pitfalls", "Kırmızı bayraklar ve tuzaklar"), record.alerts, "tr");
    add(card, "p", say(
      "Product-specific prescriptions, doses and authorisation statements await individual verification.",
      "Preparata özgü reçete, doz ve ruhsat bilgileri ayrı doğrulama bekliyor."
    ), "praxis-source-note");
  }

  function renderPatient(parent, noteIds, openById) {
    parent.replaceChildren();
    add(parent, "h3", say("Turkish patient information", "Türkçe hasta bilgilendirme")).id = parent.id + "-title";
    add(parent, "p", say("Clinician preview · Patient distribution awaits approval.", "Hekim önizlemesi · Hasta dağıtımı için onay bekleniyor."), "praxis-status");
    for (const id of noteIds) {
      const note = handouts[id];
      const preview = add(parent, "details", "", "praxis-disclosure");
      preview.dataset.note = id;
      preview.open = openById.has(id);
      const summary = add(preview, "summary", noteIds.length === 1 ? say("Open the Turkish draft", "Türkçe taslağı aç") : note.title);
      if (noteIds.length > 1) summary.lang = "tr";
      const sheet = add(preview, "article", "", "praxis-handout");
      sheet.lang = "tr";
      add(sheet, "h4", note.title);
      add(sheet, "p", note.germanName, "praxis-german").lang = "de";
      for (const [title, name] of [["Bu nedir?", "about"], ["Tedavi ve öneriler", "treatment"], ["Evde neler yapabilirsiniz?", "daily"], ["Ne zaman başvurmalısınız?", "contact"]]) {
        add(sheet, "h5", title);
        add(sheet, "p", note[name]);
      }
      if (id === "isotretinoin") {
        source(add(sheet, "ul"), "BfArM · Resmî retinoid eğitim materyali", "https://www.bfarm.de/SharedDocs/Downloads/DE/Arzneimittel/Pharmakovigilanz/Risikoinformationen/EducationMaterial/Anlagen/a-f/acitretin-alitretinoin-isotretinoin-aerzte-harm.pdf?__blob=publicationFile");
      }
      add(sheet, "p", "Hekim incelemesi bekleyen taslak · Kaynak bilgi notu, s. " + note.page, "praxis-source-note");
    }
  }

  function render({ card, patient, id, noteIds }) {
    const focused = document.activeElement;
    const focusedCard = card?.contains(focused);
    const focusedNote = patient?.contains(focused) ? focused.closest("details")?.dataset.note : null;
    if (card) {
      const chapter = chapters[id];
      const record = detailed[chapter.verifiedCard];
      const wasOpen = card.querySelector("details")?.open || false;
      card.replaceChildren();
      add(card, "h3", say("Praxis quick card", "Praxis kısa kartı")).id = card.id + "-title";
      add(card, "p", chapter.germanName, "praxis-german").lang = "de";
      add(card, "p", say("Germany · Educational draft awaiting clinician review", "Almanya · Hekim incelemesi bekleyen eğitim taslağı"), "praxis-status");
      if (record) verifiedContent(card, record, wasOpen);
      else adaptedContent(card, chapter);
      const sources = add(card, "ul", "", "praxis-sources");
      sources.setAttribute("aria-label", say("References", "Kaynaklar"));
      for (const [label, href] of (record || chapter).sources) source(sources, label, href);
      if (!record) source(sources, "DDG · Leitlinienübersicht", "https://derma.de/leitlinien");
      add(card, "p", say("Praxis guide v2 (18 Nov 2026), p. ", "Praxis rehberi v2 (18 Kasım 2026), s. ") + chapter.guidePage, "praxis-source-note");
      if (focusedCard) (card.querySelector("summary") || card).focus();
    }

    if (patient) {
      const open = new Set(Array.from(patient.querySelectorAll("details[open]"), detail => detail.dataset.note));
      renderPatient(patient, noteIds, open);
      if (focusedNote) patient.querySelector('[data-note="' + focusedNote + '"] summary')?.focus();
    }
  }

  function mountChapter(parent, id) {
    if (!Object.hasOwn(chapters, id)) return;
    const noteIds = notesFor(id);
    const card = section(parent, "detail-praxis");
    card.tabIndex = -1;
    const patient = noteIds.length ? section(parent, "detail-patient-info") : null;
    activeView = { card, patient, id, noteIds };
    render(activeView);
  }

  window.DOCUTIS_PRAXIS = {
    chapters,
    handouts,
    aliases(condition) {
      const chapter = chapters[byCondition.get(condition)];
      if (!chapter) return [];
      const names = [chapter.germanName, chapter.turkishName];
      const shortNames = names.flatMap(name => [...name.matchAll(/\(([^)]+)\)/g)].map(match => match[1]));
      return [...names, ...shortNames, ...(detailed[chapter.verifiedCard]?.aliases || [])];
    },
    has(condition) { return byCondition.has(condition); },
    hasHandout(condition) { return notesFor(byCondition.get(condition)).length > 0; },
    mount(parent, condition) { mountChapter(parent, byCondition.get(condition)); },
    mountChapter,
    mountOnlyHandout(parent, id) {
      if (!Object.hasOwn(handouts, id)) return;
      activeView = { patient: section(parent, "detail-patient-info"), noteIds: [id] };
      render(activeView);
      activeView.patient.querySelector("details").open = true;
    },
    refresh() {
      if (activeView?.card?.isConnected || activeView?.patient?.isConnected) render(activeView);
    }
  };

  function init() {
    document.getElementById("docutisLanguage")?.addEventListener("change", window.DOCUTIS_PRAXIS.refresh);
    window.DOCUTIS_PRAXIS.refresh();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
