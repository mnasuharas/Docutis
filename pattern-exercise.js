(function () {
  "use strict";

  const root = document.getElementById("patternExercise");
  const collection = window.DOCUTIS_CASES;
  if (!root || !collection) return;

  const lessons = [
    {
      id: "case-g25-01",
      marks: [[43, 54, "Thicker, darker central network"], [42, 80, "Fainter lines toward the edge"]],
      weight: "Compare the central network with the lighter edge. Its unevenness raises concern in this image. The second case shows why the network alone cannot settle the differential."
    },
    {
      id: "case-g25-02",
      marks: [[53, 61, "Darker network near the center"], [52, 36, "Lighter lines above the center"]],
      weight: "The network varies across this lesion too. Air bubbles and hairs cross the field. The source reports a nevus with cytologic atypia despite the atypical network."
    },
    {
      id: "case-g26-01",
      marks: [[54, 49, "Eccentric dark blotch"]],
      weight: "On this heel, the off-center blotch and uneven pigment carry the comparison. Broad parallel ridge bands are not visible in this frame. The source identifies the lesion as an acral melanoma, with histopathology documented at study level."
    }
  ].map(function (lesson) {
    const record = collection.cases.find(function (item) { return item.id === lesson.id; });
    const image = record && record.images.find(function (item) { return item.type === "dermoscopy"; });
    const pair = image && collection.pairProvenance.find(function (item) {
      return item.caseId === lesson.id &&
        ["same_lesion_confirmed", "source_documented_pair"].includes(item.provenance) &&
        item.dermoscopicImageIds.includes(image.id);
    });
    return Object.assign(lesson, {
      record: record,
      image: image,
      clinicalImage: pair && record.images.find(function (item) {
        return item.type === "clinical" && pair.clinicalImageIds.includes(item.id);
      })
    });
  });

  if (lessons.some(function (lesson) { return !lesson.image; })) return;

  const comparison = collection.comparisons.find(function (item) { return item.id === "cmp-g25-network"; });
  const pattern = window.DOCUTIS_PATTERNS && window.DOCUTIS_PATTERNS.patterns.find(function (item) {
    return item.id === "atypical-pigment-network";
  });
  const positions = [
    ["Upper left", 25, 25], ["Upper center", 50, 25], ["Upper right", 75, 25],
    ["Middle left", 25, 50], ["Center", 50, 50], ["Middle right", 75, 50],
    ["Lower left", 25, 75], ["Lower center", 50, 75], ["Lower right", 75, 75]
  ];
  const heelComparison = collection.comparisons.find(function (item) { return item.id === "cmp-g26-heel"; });
  const followUp = heelComparison && collection.cases.find(function (item) { return item.id === heelComparison.caseIdA; });
  const followUpImage = followUp && followUp.images.find(function (image) { return image.type === "dermoscopy"; });
  const responses = [];
  let learningPoint = "";
  let followUpAnswer = null;
  let clinicalFirst = false;

  function add(parent, tag, value, className) {
    const element = document.createElement(tag);
    if (value) element.textContent = value;
    if (className) element.className = className;
    parent.appendChild(element);
    return element;
  }

  function button(parent, label, onClick) {
    const control = add(parent, "button", label, "exercise-action");
    control.type = "button";
    control.addEventListener("click", onClick);
    return control;
  }

  function heading(label) {
    root.replaceChildren();
    const title = add(root, "h3", label);
    title.id = "patternExerciseTitle";
    title.tabIndex = -1;
    return title;
  }

  function photograph(container, image, description) {
    const photo = add(container, "img");
    photo.src = image.src;
    photo.width = image.dimensions.width;
    photo.height = image.dimensions.height;
    photo.alt = description;
    return photo;
  }

  function frame(parent, image) {
    const container = add(parent, "div", "", "exercise-frame is-markable");
    const photo = photograph(container, image, "Dermoscopy image. Record any visible structures and their distribution.");
    const overlay = add(container, "div", "", "exercise-overlay");
    overlay.setAttribute("aria-hidden", "true");
    return { photo: photo, overlay: overlay };
  }

  function attribution(parent, image, revealed) {
    if (revealed) {
      const source = add(parent, "a", image.attribution, "exercise-caption");
      source.href = image.sourceUrl;
      return;
    }
    const credit = add(parent, "p", image.creator + (image.modificationStatus === "cropped" ? " · cropped image · " : " · "), "exercise-caption");
    const license = add(credit, "a", image.license);
    license.href = image.licenseUrl;
  }

  function clinicalView(parent, lesson, revealed) {
    if (!lesson.clinicalImage) return;
    const detail = add(parent, "details", "", "exercise-clinical");
    add(detail, "summary", "Clinical photograph");
    const container = add(detail, "div", "", "exercise-frame");
    const photo = photograph(container, lesson.clinicalImage,
      revealed ? lesson.clinicalImage.alt : "Clinical photograph for the current case.");
    photo.loading = "lazy";
    attribution(detail, lesson.clinicalImage, revealed);
  }

  function mark(overlay, position, label, educator) {
    const dot = add(overlay, "span", label, educator ? "exercise-mark educator" : "exercise-mark");
    dot.style.left = position[0] + "%";
    dot.style.top = position[1] + "%";
  }

  function positionText(position) {
    return Math.round(position[0]) + "% from the left, " + Math.round(position[1]) + "% from the top";
  }

  function labeled(parent, caption, tag) {
    const label = add(parent, "label", caption);
    return add(label, tag);
  }

  function choice(select, label, value) {
    const option = add(select, "option", label);
    option.value = value;
  }

  function startCase(index) {
    const lesson = lessons[index];
    if (!clinicalFirst || !lesson.clinicalImage) {
      renderCase(index);
      return;
    }
    const title = heading(index === 2 ? "Independent case · clinical impression" : "Case " + (index + 1) + " · clinical impression");
    add(root, "p", "Site: " + lesson.record.patientContext.anatomicalSite);
    const workspace = add(root, "div", "", "exercise-workspace");
    const viewer = add(workspace, "div");
    const container = add(viewer, "div", "", "exercise-frame");
    photograph(container, lesson.clinicalImage, "Clinical photograph for the current case.");
    attribution(viewer, lesson.clinicalImage, false);
    const form = add(workspace, "form", "", "exercise-fields");
    const prompt = "Which visible feature guides your first impression? If uncertain, describe what you need to clarify.";
    const impression = labeled(form, prompt, "textarea");
    impression.required = true;
    impression.maxLength = 400;
    impression.rows = 3;
    const next = add(form, "button", "Save impression and open dermoscopy", "exercise-action");
    next.type = "submit";
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      impression.value = impression.value.trim();
      if (form.reportValidity()) renderCase(index, impression.value);
    });
    title.focus();
  }

  function renderCase(index, impression) {
    const lesson = lessons[index];
    const title = heading(index === 2 ? "Independent case" : "Pattern marking · Case " + (index + 1) + " of 2");
    add(root, "p", "Site: " + lesson.record.patientContext.anatomicalSite);
    add(root, "p", "Describe one or two findings in your own words. Use the image or the location menu to place each mark.");
    const form = add(root, "form", "", "exercise-workspace");
    form.noValidate = true;
    const viewer = add(form, "div");
    const picture = frame(viewer, lesson.image);

    const fields = add(form, "div", "", "exercise-fields");
    const slots = [];
    const status = add(viewer, "p", "", "exercise-caption");
    status.setAttribute("role", "status");
    attribution(viewer, lesson.image, false);
    clinicalView(viewer, lesson, false);
    let active = 0;

    function draw() {
      picture.overlay.replaceChildren();
      slots.forEach(function (slot, i) {
        if (slot.position) mark(picture.overlay, slot.position, String(i + 1), false);
      });
    }

    function setPosition(slot, position) {
      slot.position = position;
      draw();
      status.textContent = "Finding " + (slots.indexOf(slot) + 1) + (position ? " marked " + positionText(position) + "." : " has no mark.");
    }

    for (let i = 0; i < 2; i += 1) {
      const group = add(fields, "fieldset");
      add(group, "legend", "Finding " + (i + 1) + (i === 1 ? " (optional)" : ""));
      const description = labeled(group, "What do you see?", "input");
      description.type = "text";
      description.maxLength = 180;
      description.required = i === 0;
      const certainty = labeled(group, "Visibility", "select");
      choice(certainty, "Choose visibility", "");
      ["Clear", "Possible", "Cannot assess"].forEach(function (value) { choice(certainty, value, value); });
      certainty.required = i === 0;
      const location = labeled(group, "Image location", "select");
      choice(location, "Choose a region or tap the image", "");
      positions.forEach(function (position, row) { choice(location, position[0], String(row)); });
      choice(location, "Exact point on image", "point");
      const pointOption = location.lastElementChild;
      pointOption.disabled = true;
      const selectMark = button(group, "Place mark " + (i + 1) + " on image", function () {
        updateActive(i);
        status.textContent = "Tap the image to place mark " + (i + 1) + ". The location menu is available for keyboard entry.";
      });
      const slot = { description: description, certainty: certainty, location: location, selectMark: selectMark, position: null };
      slots.push(slot);
      location.addEventListener("change", function () {
        const selected = location.value;
        pointOption.disabled = true;
        setPosition(slot, selected === "" ? null : positions[Number(selected)].slice(1));
      });
      certainty.addEventListener("change", function () {
        const unavailable = certainty.value === "Cannot assess";
        location.disabled = unavailable;
        selectMark.disabled = unavailable;
        if (unavailable) {
          location.value = "";
          pointOption.disabled = true;
          setPosition(slot, null);
          if (active === i) updateActive(1 - i);
        }
      });
    }

    function updateActive(index) {
      active = index;
      slots.forEach(function (slot, i) {
        slot.selectMark.setAttribute("aria-pressed", String(i === active));
      });
    }

    updateActive(0);
    picture.photo.addEventListener("click", function (event) {
      const slot = slots[active];
      if (slot.location.disabled) return;
      const rect = picture.photo.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const position = [
        (event.clientX - rect.left) / rect.width,
        (event.clientY - rect.top) / rect.height
      ].map(function (fraction) { return Math.max(0, Math.min(1, fraction)) * 100; });
      slot.location.lastElementChild.disabled = false;
      slot.location.value = "point";
      setPosition(slot, position);
    });

    const prompts = [
      "Which finding carries the most weight here, and why?",
      "What is your leading diagnosis, and what is the closest alternative?",
      "What is still uncertain or hard to assess?"
    ];
    if (impression) {
      add(fields, "h4", "Your clinical impression");
      add(fields, "p", impression);
      prompts.push("Which dermoscopic finding changed or reinforced your initial impression, and why?");
    }
    const reasoning = prompts.map(function (prompt) {
      const answer = labeled(fields, prompt, "textarea");
      answer.required = true;
      answer.maxLength = 400;
      answer.rows = 2;
      return answer;
    });
    const submit = add(fields, "button", ["Save and open case 2", "Compare both cases", "Reveal the independent case"][index], "exercise-action");
    submit.type = "submit";

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const checked = slots.filter(function (slot, i) {
        return i === 0 || slot.description.value.trim() || slot.certainty.value || slot.position;
      });
      slots.forEach(function (slot) {
        const included = checked.includes(slot);
        slot.description.required = included;
        slot.certainty.required = included;
        slot.location.required = included && !slot.location.disabled;
        slot.description.value = slot.description.value.trim();
      });
      reasoning.forEach(function (answer) { answer.value = answer.value.trim(); });
      if (!form.reportValidity()) return;
      responses[index] = {
        impression: impression,
        findings: checked.map(function (slot) {
          return { description: slot.description.value, certainty: slot.certainty.value, position: slot.position };
        }),
        reasoning: reasoning.map(function (answer, i) { return [prompts[i], answer.value]; })
      };
      if (index === 0) startCase(1);
      else renderDebrief(index === 2);
    });
    title.focus();
  }

  function renderReview(parent, lesson, index) {
    const card = add(parent, "article", "", "exercise-review");
    add(card, "h4", "Case " + (index + 1) + " · " + lesson.record.diagnosisLabel);
    const picture = frame(card, lesson.image);
    lesson.marks.forEach(function (position, i) { mark(picture.overlay, position, "E" + (i + 1), true); });
    responses[index].findings.forEach(function (finding, i) {
      if (finding.position) mark(picture.overlay, finding.position, String(i + 1), false);
    });
    const toggle = labeled(card, "Show marks on dermoscopy", "input");
    toggle.parentElement.className = "exercise-visibility";
    toggle.type = "checkbox";
    toggle.checked = true;
    toggle.addEventListener("change", function () { picture.overlay.hidden = !toggle.checked; });
    clinicalView(card, lesson, true);
    if (lesson.clinicalImage && lesson.record.pairedModality) {
      add(card, "h5", "What dermoscopy adds");
      add(card, "p", lesson.record.pairedModality.addedValue);
      add(card, "p", lesson.record.pairedModality.limits, "exercise-caption");
    }
    add(card, "h5", "Your findings");
    const findings = add(card, "ol");
    responses[index].findings.forEach(function (finding) {
      add(findings, "li", finding.description + " · " + finding.certainty +
        (finding.position ? " · " + positionText(finding.position) : ""));
    });
    const reasoning = add(card, "details");
    add(reasoning, "summary", "Your reasoning");
    const answers = add(reasoning, "dl");
    if (responses[index].impression) {
      add(answers, "dt", "Before dermoscopy");
      add(answers, "dd", responses[index].impression);
    }
    responses[index].reasoning.forEach(function (entry) {
      add(answers, "dt", entry[0]);
      add(answers, "dd", entry[1]);
    });
    add(card, "h5", "Teaching marks · clinician review required");
    const key = add(card, "ol");
    lesson.marks.forEach(function (position, i) {
      add(key, "li", "E" + (i + 1) + " · " + position[2] + " · " + positionText(position));
    });
    add(card, "p", lesson.weight);
    add(card, "p", lesson.record.diagnosticGroundTruth.confirmationNotes);
    attribution(card, lesson.image, true);
  }

  function renderContrast(parent) {
    const section = add(parent, "section", "", "exercise-contrast");
    add(section, "h4", "How much weight does the shared pattern carry?");
    add(section, "p", "Compare your leading diagnoses. Which finding is shared, and what could you distinguish from the images alone?");
    const review = add(section, "details");
    add(review, "summary", "Show the worked comparison");
    const list = add(review, "dl");
    [
      ["Shared finding", comparison.sharedFeatures.join(" ")],
      ["Diagnostic pitfall", comparison.commonTrap],
      ["Limits of the image comparison", comparison.limits]
    ].forEach(function (row) {
      add(list, "dt", row[0]);
      add(list, "dd", row[1]);
    });
  }

  function renderFollowUp() {
    const title = heading("Another heel lesion");
    add(root, "p", "Examine this second lesion before comparing it with the previous heel case.");
    const workspace = add(root, "div", "", "exercise-workspace");
    const viewer = add(workspace, "div");
    const container = add(viewer, "div", "", "exercise-frame");
    photograph(container, followUpImage, "Dermoscopy of a second heel lesion.");
    attribution(viewer, followUpImage, false);
    const form = add(workspace, "form", "", "exercise-fields");
    const observation = labeled(form, "Describe the distribution of pigment across this lesion.", "textarea");
    const diagnosis = labeled(form, "What is your leading diagnosis and which finding supports it?", "textarea");
    [observation, diagnosis].forEach(function (field) {
      field.required = true;
      field.rows = 2;
      field.maxLength = 400;
    });
    const submit = add(form, "button", "Compare the heel cases", "exercise-action");
    submit.type = "submit";
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      observation.value = observation.value.trim();
      diagnosis.value = diagnosis.value.trim();
      if (!form.reportValidity()) return;
      followUpAnswer = [observation.value, diagnosis.value];
      renderHeelReview();
    });
    title.focus();
  }

  function renderHeelReview() {
    const title = heading("Compare the heel cases");
    const cards = add(root, "div", "", "exercise-comparison is-paired");
    [lessons[2], { record: followUp, image: followUpImage }].forEach(function (lesson) {
      const card = add(cards, "article", "", "exercise-review");
      add(card, "h4", lesson.record.diagnosisLabel);
      photograph(add(card, "div", "", "exercise-frame"), lesson.image, lesson.image.alt);
      add(card, "p", lesson.record.pairedModality.dermoscopicObservation);
      attribution(card, lesson.image, true);
    });
    add(root, "h4", "Your assessment of the second lesion");
    followUpAnswer.forEach(function (answer) { add(root, "p", answer); });
    if (learningPoint) {
      add(root, "h4", "What you wanted to check again");
      add(root, "p", learningPoint);
    }
    add(root, "h4", "What distinguishes these two images?");
    add(root, "p", heelComparison.discriminator);
    add(root, "p", heelComparison.limits);
    button(root, "Return to independent case review", function () { renderDebrief(true); });
    title.focus();
  }

  function renderDebrief(independent) {
    const title = heading(independent ? "Independent case · review" : "Compare the two cases");
    add(root, "p", "Your marks are numbered. Teaching marks begin with E and identify example regions. Compare the reasoning as well as the locations.");
    const cards = add(root, "div", "", independent ? "exercise-comparison" : "exercise-comparison is-paired");
    const indices = independent ? [2] : [0, 1];
    indices.forEach(function (index) { renderReview(cards, lessons[index], index); });
    if (!independent && comparison) renderContrast(root);
    if (!independent && pattern) {
      const detail = add(root, "details", "", "exercise-pattern");
      add(detail, "summary", pattern.displayName + " · " + pattern.displayNameDe);
      add(detail, "p", pattern.definition);
      add(detail, "p", pattern.lookFor);
    }
    const actions = add(root, "div", "", "exercise-actions");
    if (independent && followUpImage) {
      if (followUpAnswer) button(actions, "Review the heel comparison", renderHeelReview);
      else {
        const practice = add(root, "div", "", "exercise-fields");
        const note = labeled(practice, "Which feature did you miss or want to check again? (optional)", "textarea");
        note.maxLength = 400;
        note.value = learningPoint;
        note.addEventListener("input", function () { learningPoint = note.value.trim(); });
        button(practice, "Practise on another heel lesion", renderFollowUp);
      }
    }
    if (independent) button(actions, "Review the first two cases", function () { renderDebrief(false); });
    else if (responses[2]) button(actions, "Return to independent case review", function () { renderDebrief(true); });
    else button(actions, "Open independent case", function () { startCase(2); });
    if (responses[2]) button(actions, "Restart exercise", function () {
      responses.length = 0;
      learningPoint = "";
      followUpAnswer = null;
      renderIntro().focus();
    });
    title.focus();
  }

  function openVesselExercise() {
    const pair = collection.comparisons.find(function (item) { return item.id === "cmp-g25-pink-vessels"; });
    const cases = [pair.caseIdA, pair.caseIdB].map(function (id) {
      const record = collection.cases.find(function (item) { return item.id === id; });
      return { record: record, image: record.images.find(function (item) { return item.type === "dermoscopy"; }) };
    });

    function show(answers) {
      const title = heading(answers ? "Pink lesions · comparison" : "Compare vessels in two pink lesions");
      if (!answers) add(root, "p", "Inspect both images. Describe vessel shape and distribution before proposing a diagnosis. Record uncertainty where vessels are hard to resolve.");
      const form = add(root, "form");
      const cards = add(form, "div", "", "exercise-comparison is-paired");
      const fields = [];
      cases.forEach(function (item, i) {
        const card = add(cards, "article", "", "exercise-review exercise-fields");
        add(card, "h4", "Case " + (i + 1) + (answers ? " · " + item.record.diagnosisLabel : ""));
        photograph(add(card, "div", "", "exercise-frame"), item.image,
          answers ? item.image.alt : "Dermoscopy of pink lesion " + (i + 1));
        attribution(card, item.image, Boolean(answers));
        if (answers) {
          add(card, "h5", "Your observations and reasoning");
          answers[i].forEach(function (answer) { add(card, "p", answer); });
          add(card, "h5", "Teaching observations · clinician review required");
          (i === 0 ? pair.favouringA : pair.favouringB).forEach(function (note) { add(card, "p", note); });
        } else {
          fields.push(["Describe the vessels you can see.", "Which diagnosis do you favour, and why?"].map(function (prompt) {
            const input = labeled(card, prompt, "textarea");
            input.rows = 2;
            input.required = true;
            input.maxLength = 400;
            return input;
          }));
        }
      });
      if (answers) {
        add(root, "h4", "Which finding separates these cases?");
        add(root, "p", pair.discriminator);
        add(root, "p", pair.commonTrap);
        add(root, "p", pair.limits);
      } else {
        const submit = add(form, "button", "Reveal and compare", "exercise-action");
        submit.type = "submit";
        form.addEventListener("submit", function (event) {
          event.preventDefault();
          const saved = fields.map(function (row) {
            return row.map(function (field) { field.value = field.value.trim(); return field.value; });
          });
          if (form.reportValidity()) show(saved);
        });
      }
      button(root, "Back to exercises", function () { renderIntro().focus(); });
      title.focus();
    }
    show(null);
  }

  function renderIntro() {
    const title = heading("Dermoscopy pattern exercise");
    add(root, "p", "Mark what you see in two cases, compare your reasoning with the teaching examples, then try an independent case.");
    const actions = add(root, "div", "", "exercise-actions");
    button(actions, "Start with clinical impression", function () {
      clinicalFirst = true;
      startCase(0);
    });
    button(actions, "Start pattern exercise", function () {
      clinicalFirst = false;
      startCase(0);
    });
    button(actions, "Practise vessel patterns in pink lesions", openVesselExercise);
    return title;
  }

  renderIntro();
  root.hidden = false;
})();
