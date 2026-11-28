(function () {
  "use strict";

  const records = window.DOCUTIS_PRAXIS_PILOT;
  const current = () => document.documentElement.lang === "tr" ? 1 : 0;
  let activeCard;

  function add(parent, tag, value, className) {
    const el = document.createElement(tag);
    if (value) el.textContent = value;
    if (className) el.className = className;
    parent.appendChild(el);
    return el;
  }

  function heading(parent, id) {
    const section = add(parent, "section", "", "detail-section detail-section--wide praxis-pilot");
    section.id = id;
    section.setAttribute("data-no-translate", "");
    section.setAttribute("aria-labelledby", id + "-title");
    return section;
  }

  function render({ card, patient, record }) {
    const lang = current();
    const say = (en, tr) => lang ? tr : en;
    const wasOpen = panel => panel.querySelector("details")?.open || false;
    const cardOpen = wasOpen(card);
    const patientOpen = wasOpen(patient);
    const focused = document.activeElement;
    const retainedFocus = card.contains(focused) ? card : patient.contains(focused) ? patient : null;
    card.replaceChildren();
    patient.replaceChildren();

    add(card, "h3", say("Praxis quick card", "Praxis kısa kartı")).id = card.id + "-title";
    const name = add(card, "p", record.germanName, "praxis-german");
    name.lang = "de";
    add(card, "p", say("Germany · Educational draft awaiting clinician review", "Almanya · Hekim incelemesi bekleyen eğitim taslağı"), "praxis-status");
    const overview = add(card, "dl", "", "praxis-overview");
    add(overview, "dt", say("Initial approach", "İlk yaklaşım"));
    add(overview, "dd", record.approach[lang]);
    add(overview, "dt", say("Follow-up and red flags", "Kontrol ve kırmızı bayraklar"));
    add(overview, "dd", record.followUp[lang]);

    const prescribing = add(card, "details", "", "praxis-disclosure");
    prescribing.open = cardOpen;
    add(prescribing, "summary", say("Prescription example, authorisation and skin care", "Reçete örneği, ruhsat ve bakım"));
    add(prescribing, "h4", say("Product-specific example", "Preparata özgü örnek"));
    add(prescribing, "p", record.example[lang]);
    add(prescribing, "h4", say("Authorisation and off-label checks", "Ruhsat ve off-label kontrolü"));
    add(prescribing, "p", record.scope[lang]);
    add(prescribing, "h4", say("Supportive care", "Destekleyici bakım"));
    add(prescribing, "p", record.care[lang]);

    const sources = add(card, "ul", "", "praxis-sources");
    sources.setAttribute("aria-label", say("Guideline and product information", "Leitlinie ve Fachinformation"));
    for (const [label, url] of record.sources) {
      const link = add(add(sources, "li"), "a", label);
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.lang = "de";
    }
    add(card, "p", say("Sources checked 28 Nov 2026 · Praxis guide v2, p. ", "Kaynak kontrolü 28 Kasım 2026 · Praxis rehberi v2, s. ") + record.guidePage, "praxis-source-note");

    add(patient, "h3", say("Turkish patient information", "Türkçe hasta bilgilendirme")).id = patient.id + "-title";
    add(patient, "p", say("Clinician preview · Patient distribution awaits approval.", "Hekim önizlemesi · Hasta dağıtımı için onay bekleniyor."), "praxis-status");
    const preview = add(patient, "details", "", "praxis-disclosure");
    preview.open = patientOpen;
    add(preview, "summary", say("Open the Turkish draft", "Türkçe taslağı aç"));
    const sheet = add(preview, "article", "", "praxis-handout");
    sheet.lang = "tr";
    const top = add(sheet, "div", "", "praxis-handout-header");
    add(top, "h4", record.patient.title);
    add(top, "div", "Muayenehane kaşesi / adı", "praxis-stamp");
    const german = add(sheet, "p", record.germanName, "praxis-german");
    german.lang = "de";
    const headings = [["Bu nedir?", "about"], ["Tedavi", "treatment"], ["Evde neler yapabilirsiniz?", "daily"], ["Ne zaman başvurmalısınız?", "contact"]];
    for (const [title, field] of headings) {
      add(sheet, "h5", title);
      add(sheet, "p", record.patient[field]);
    }
    add(sheet, "p", "Hekim incelemesi bekleyen taslak · Kaynak bilgi notu, s. " + record.handoutPage, "praxis-source-note");
    if (retainedFocus) retainedFocus.querySelector("summary")?.focus();
  }

  window.DOCUTIS_PRAXIS = {
    aliases(id) {
      return records[id]?.aliases || [];
    },
    has(id) {
      return Object.hasOwn(records, id);
    },
    mount(parent, id) {
      if (!this.has(id)) return;
      const card = heading(parent, "detail-praxis");
      const patient = heading(parent, "detail-patient-info");
      activeCard = { card, patient, record: records[id] };
      render(activeCard);
    }
  };

  function onLanguageChange() {
    if (activeCard?.card.isConnected) render(activeCard);
  }

  function init() {
    document.getElementById("docutisLanguage")?.addEventListener("change", onLanguageChange);
    onLanguageChange();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
