/* Goal 10: public OSS feedback and documentation link helpers (Pages-safe absolute URLs). */
(function (root, factory) {
  "use strict";
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.DOCUTIS_OSS_FEEDBACK = api;
}(typeof window === "object" ? window : null, function () {
  "use strict";

  const REPO_URL = "https://github.com/mnasuharas/Docutis";
  const CLINICAL_CONTENT_TEMPLATE = "clinical_content.yml";
  const DOC_LINKS = Object.freeze({
    repository: REPO_URL,
    contributing: `${REPO_URL}/blob/main/CONTRIBUTING.md`,
    roadmap: `${REPO_URL}/blob/main/ROADMAP.md`,
    changelog: `${REPO_URL}/blob/main/CHANGELOG.md`,
    releases: `${REPO_URL}/releases`,
    issues: `${REPO_URL}/issues`,
    clinicalReviewDoc: `${REPO_URL}/blob/main/CLINICAL_REVIEW.md`
  });

  const FEEDBACK_PROMPT =
    "Include the affected record or page, the claim that needs attention, a verifiable source, and a proposed correction. Do not include patient-identifiable information.";

  function trimText(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  function encodeQuery(value) {
    return encodeURIComponent(value).replace(/%20/g, "+");
  }

  function buildIssueUrl(template, title) {
    const params = [`template=${encodeQuery(template)}`];
    const trimmedTitle = trimText(title);
    if (trimmedTitle) params.push(`title=${encodeQuery(trimmedTitle)}`);
    return `${REPO_URL}/issues/new?${params.join("&")}`;
  }

  function contextLabel(context = {}) {
    const title = trimText(context.title) || trimText(context.name);
    const id = trimText(context.id);
    if (title && id) return `${title} (${id})`;
    return title || id || "unspecified record";
  }

  function buildCorrectionIssueUrl(context = {}) {
    return buildIssueUrl(
      CLINICAL_CONTENT_TEMPLATE,
      `[Clinical content]: Suggest a correction — ${contextLabel(context)}`
    );
  }

  function buildOutdatedEvidenceIssueUrl(context = {}) {
    return buildIssueUrl(
      CLINICAL_CONTENT_TEMPLATE,
      `[Clinical content]: Report outdated evidence — ${contextLabel(context)}`
    );
  }

  function buildGenericClinicalIssueUrl(kind = "correction") {
    if (kind === "outdated") {
      return buildOutdatedEvidenceIssueUrl({ title: "Evidence status / clinical review area" });
    }
    return buildCorrectionIssueUrl({ title: "Evidence status / clinical review area" });
  }

  return Object.freeze({
    REPO_URL,
    CLINICAL_CONTENT_TEMPLATE,
    DOC_LINKS,
    FEEDBACK_PROMPT,
    buildIssueUrl,
    buildCorrectionIssueUrl,
    buildOutdatedEvidenceIssueUrl,
    buildGenericClinicalIssueUrl,
    contextLabel
  });
}));
