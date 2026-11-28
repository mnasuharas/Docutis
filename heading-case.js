(function () {
  "use strict";

  // Title case for disease-record headings. It runs in the rendering layer, so the
  // English source strings and their Turkish dictionary keys stay exactly as written.
  const englishSmall = new Set(["a", "an", "the", "and", "or", "nor", "of", "in", "to", "for", "vs", "vs.", "at", "by", "as", "but", "with", "from", "on", "per", "via"]);
  const turkishSmall = new Set(["ve", "ile", "veya", "da", "de", "mı", "mi", "mu", "mü", "ki", "için"]);
  // Headings derived from source keys read badly after a mechanical split.
  const englishFixes = Object.freeze({
    "Second Line Or Alternative": "Second-Line or Alternative",
    "Re Excision": "Re-Excision",
    "Recurrence Metastasis": "Recurrence/Metastasis"
  });
  const turkishFirst = { i: "İ", ı: "I" };

  function capitalize(part, turkish) {
    if (!part || /^\d/.test(part) || /[A-Z].*[A-Z]|\d/.test(part.slice(1)) || /^[A-Z]{2,}/.test(part)) return part;
    const first = part.charAt(0);
    const upper = turkish ? (turkishFirst[first] || first.toLocaleUpperCase("tr-TR")) : first.toUpperCase();
    return upper + part.slice(1);
  }

  function convert(text, turkish) {
    const small = turkish ? turkishSmall : englishSmall;
    const tokens = text.split(" ");
    let seenWord = false;
    const lastWord = tokens.reduce((last, token, index) => /[\p{L}]/u.test(token) ? index : last, -1);
    return tokens.map((token, index) => {
      const match = token.match(/^([^\p{L}\p{N}]*)(.*?)([^\p{L}\p{N}]*)$/u);
      if (!match || !match[2]) return token;
      const [, prefix, core, suffix] = match;
      const opensGroup = prefix.includes("(");
      const first = !seenWord || opensGroup;
      seenWord = true;
      const lower = turkish ? core.toLocaleLowerCase("tr-TR") : core.toLowerCase();
      if (!first && index !== lastWord && small.has(lower)) return prefix + lower + suffix;
      const parts = core.split(/([-/])/).map(part => part === "-" || part === "/" ? part : capitalize(part, turkish));
      return prefix + parts.join("") + suffix;
    }).join(" ");
  }

  window.DOCUTIS_HEADING_CASE = Object.freeze({
    en: function (text) {
      const trimmed = String(text).trim();
      return Object.hasOwn(englishFixes, trimmed) ? englishFixes[trimmed] : convert(trimmed, false);
    },
    tr: function (text) { return convert(String(text).trim(), true); }
  });
})();
