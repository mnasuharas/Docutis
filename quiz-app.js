(function () {
  "use strict";

  const quiz = window.DOCUTIS_QUIZ;
  const data = window.DOCUTIS_DATA;
  const media = window.DOCUTIS_MEDIA || { items: [] };
  const root = document.getElementById("quizApp");
  const reviewUi = window.DOCUTIS_REVIEW_UI || null;
  if (!quiz || !data || !root) return;

  let index = 0;
  let score = 0;
  let answered = false;
  let imageDialog;
  let dialogImage;
  let dialogCaption;

  function ensureImageDialog() {
    if (imageDialog) return;
    imageDialog = element("dialog", undefined, "quiz-image-dialog");
    imageDialog.setAttribute("aria-labelledby", "quizImageDialogTitle");
    const header = element("div", undefined, "quiz-image-dialog-header");
    header.appendChild(element("h2", "Image preview", undefined));
    header.lastChild.id = "quizImageDialogTitle";
    const close = element("button", "Close image", "quiz-image-dialog-close");
    close.type = "button";
    close.addEventListener("click", () => imageDialog.close());
    header.appendChild(close);
    imageDialog.appendChild(header);
    dialogImage = document.createElement("img");
    imageDialog.appendChild(dialogImage);
    dialogCaption = element("p", undefined, "quiz-image-dialog-caption");
    imageDialog.appendChild(dialogCaption);
    imageDialog.addEventListener("click", event => {
      if (event.target === imageDialog) imageDialog.close();
    });
    document.body.appendChild(imageDialog);
  }

  function openImage(item, trigger) {
    ensureImageDialog();
    dialogImage.src = item.src;
    dialogImage.alt = item.alt;
    dialogCaption.textContent = item.caption;
    imageDialog.showModal();
    imageDialog.addEventListener("close", () => focusWithoutScrolling(trigger), { once: true });
  }

  function focusWithoutScrolling(element) {
    if (!element || typeof element.focus !== "function") return;
    try {
      element.focus({ preventScroll: true });
    } catch (error) {
      element.focus();
    }
  }

  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  function condition(question) {
    return data.diseases.find(item => item.id === question.diseaseId);
  }

  function sourceLinks(parent, question) {
    const record = condition(question);
    const list = element("ul", undefined, "quiz-source-list");
    question.sourceUrls.forEach(url => {
      const reference = record.references.find(item => item.url === url);
      const item = element("li");
      const link = element("a", `${reference.title} (opens in a new tab)`);
      link.href = reference.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      item.appendChild(link);
      list.appendChild(item);
    });
    parent.appendChild(list);
  }

  function renderResult() {
    root.replaceChildren();
    const region = element("div", undefined, "quiz-result");
    region.setAttribute("role", "status");
    region.tabIndex = -1;
    region.appendChild(element("p", "Quiz complete", "eyebrow"));
    region.appendChild(element("h3", `${score} of ${quiz.questions.length} correct`));
    region.appendChild(element("p", "Use the explanations and linked condition records to review each pattern. A score is not a measure of clinical competence."));
    const restart = element("button", "Restart quiz", "quiz-button");
    restart.type = "button";
    restart.addEventListener("click", () => { index = 0; score = 0; answered = false; renderQuestion(); });
    region.appendChild(restart);
    root.appendChild(region);
    region.focus();
  }

  function renderQuestion() {
    const question = quiz.questions[index];
    const record = condition(question);
    root.replaceChildren();
    answered = false;
    const progress = element("p", `Question ${index + 1} of ${quiz.questions.length}`, "quiz-progress");
    root.appendChild(progress);
    if (reviewUi) reviewUi.appendReviewPanel(root, "quiz", question.id, "Quiz-item review status");
    if (reviewUi && reviewUi.appendFeedbackActions) reviewUi.appendFeedbackActions(root, { id: question.id, title: question.prompt, assetType: "quiz" });
    const bar = element("div", undefined, "quiz-progress-track");
    bar.setAttribute("role", "progressbar");
    bar.setAttribute("aria-valuemin", "1");
    bar.setAttribute("aria-valuemax", String(quiz.questions.length));
    bar.setAttribute("aria-valuenow", String(index + 1));
    bar.setAttribute("aria-label", `Question ${index + 1} of ${quiz.questions.length}`);
    const fill = element("span");
    fill.style.width = `${((index + 1) / quiz.questions.length) * 100}%`;
    bar.appendChild(fill);
    root.appendChild(bar);

    const attachedMedia = (question.mediaIds || (question.mediaId ? [question.mediaId] : []))
      .map(id => media.items.find(item => item.id === id)).filter(Boolean);
    if (attachedMedia.length) {
      const gallery = element("div", undefined, "quiz-media-grid");
      attachedMedia.forEach(item => {
        const figure = element("figure", undefined, "quiz-media");
        const image = document.createElement("img");
        image.src = item.src;
        image.alt = item.alt;
        image.width = item.dimensions.width;
        image.height = item.dimensions.height;
        image.loading = "lazy";
        const imageButton = element("button", undefined, "quiz-image-open");
        imageButton.type = "button";
        imageButton.setAttribute("aria-label", `Enlarge image: ${item.alt}`);
        imageButton.appendChild(image);
        imageButton.addEventListener("click", () => openImage(item, imageButton));
        figure.appendChild(imageButton);
        const caption = element("figcaption");
        caption.appendChild(element("span", item.caption, "quiz-media-caption"));
        const visualReview = reviewUi?.asset("visual", item.id);
        const credit = element("a", item.attribution, "quiz-media-credit");
        credit.href = item.sourceUrl;
        credit.target = "_blank";
        credit.rel = "noopener noreferrer";
        caption.appendChild(credit);
        const license = element("a", item.license, "quiz-media-license");
        license.href = item.license === "CC BY 4.0" ? "https://creativecommons.org/licenses/by/4.0/" : "https://creativecommons.org/licenses/by-sa/4.0/";
        license.target = "_blank";
        license.rel = "noopener noreferrer";
        caption.appendChild(license);
        caption.appendChild(element("span", visualReview ? reviewUi.statusLabel(visualReview.status) : "Review required", "quiz-media-review"));
        figure.appendChild(caption);
        gallery.appendChild(figure);
      });
      root.appendChild(gallery);
    }

    const form = document.createElement("form");
    form.className = "quiz-form";
    const fieldset = document.createElement("fieldset");
    const legend = element("legend", question.prompt);
    fieldset.appendChild(legend);
    question.options.forEach((option, optionIndex) => {
      const label = element("label", undefined, "quiz-option");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "quiz-answer";
      input.value = String(optionIndex);
      label.appendChild(input);
      label.appendChild(element("span", option));
      fieldset.appendChild(label);
    });
    form.appendChild(fieldset);
    const feedback = element("div", "Choose one answer, then check it.", "quiz-feedback");
    feedback.id = "quizFeedback";
    feedback.setAttribute("role", "status");
    feedback.setAttribute("aria-live", "polite");
    form.appendChild(feedback);
    const actions = element("div", undefined, "quiz-actions");
    const check = element("button", "Check answer", "quiz-button");
    check.type = "submit";
    actions.appendChild(check);
    form.appendChild(actions);
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (answered) return;
      const selected = form.querySelector('input[name="quiz-answer"]:checked');
      if (!selected) { feedback.textContent = "Select an answer before checking."; return; }
      answered = true;
      const selectedIndex = Number(selected.value);
      const correct = selectedIndex === question.correctIndex;
      if (correct) score += 1;
      fieldset.querySelectorAll("input").forEach(input => { input.disabled = true; });
      feedback.replaceChildren();
      feedback.classList.add(correct ? "is-correct" : "is-incorrect");
      feedback.appendChild(element("strong", correct ? "Correct." : `Not quite. The best answer is: ${question.options[question.correctIndex]}.`));
      feedback.appendChild(element("p", question.explanation));
      const conditionLink = element("a", `Open ${record.name} reference`);
      conditionLink.href = `?condition=${encodeURIComponent(record.id)}`;
      feedback.appendChild(conditionLink);
      feedback.appendChild(element("h4", "Supporting sources"));
      sourceLinks(feedback, question);
      const quizReview = reviewUi?.asset("quiz", question.id);
      feedback.appendChild(element("p", `${quizReview ? reviewUi.statusLabel(quizReview.status) : "Clinical review pending"} · Source attachment and automated validation do not constitute physician endorsement.`, "quiz-review-state"));
      check.remove();
      const next = element("button", index === quiz.questions.length - 1 ? "View score" : "Next question", "quiz-button");
      next.type = "button";
      next.addEventListener("click", () => {
        if (index === quiz.questions.length - 1) renderResult();
        else { index += 1; renderQuestion(); focusWithoutScrolling(root); }
      });
      actions.appendChild(next);
      feedback.focus?.();
    });
    root.appendChild(form);
  }

  function openQuestion(id) {
    const next = quiz.questions.findIndex(item => item.id === id);
    if (next < 0) return false;
    index = next;
    answered = false;
    renderQuestion();
    return true;
  }

  window.DOCUTIS_QUIZ_APP = Object.freeze({ renderQuestion, renderResult, openQuestion });
  renderQuestion();
}());
