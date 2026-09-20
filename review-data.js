/* Public human-review decisions only. Never place private reviewer data in this file. */
(function (root, factory) {
  "use strict";
  const value = factory();
  if (typeof module === "object" && module.exports) module.exports = value;
  if (root) root.DOCUTIS_REVIEW_DATA = value;
}(typeof window === "object" ? window : null, function () {
  "use strict";

  return Object.freeze({
    schemaVersion: 1,
    attestationVersion: "docutis-human-clinical-review-v1",
    reviewers: Object.freeze([]),
    decisions: Object.freeze([])
  });
}));
