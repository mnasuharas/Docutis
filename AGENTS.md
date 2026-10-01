# Repository Guidelines

Docutis is an open-source dermatology reference and education project. Preserve its educational purpose and medical disclaimer in all changes.

## Medical content

- Do not add unsupported clinical claims.
- Add reliable, current references for new or substantially changed medical content.
- Treat AI-generated medical content as a draft that requires clinician review before it is considered reliable.
- Clearly preserve uncertainty and avoid presenting educational material as a substitute for professional judgment or current clinical guidelines.

## Technical scope

- Keep the stack lightweight: HTML, CSS, and vanilla JavaScript compatible with GitHub Pages.
- Do not introduce frameworks, build tools, or external dependencies without explicit user approval.
- Keep disease records structurally consistent, including their core fields, category mapping, and reference entries.
- Consider responsive layout, keyboard accessibility, and readable presentation.

## Validation

After relevant changes, test page loading, search, category grouping, condition cards, detail sections, and reference links. Check affected behavior at desktop and mobile widths and with keyboard navigation where applicable.

## Change discipline

- Keep changes focused and avoid modifying unrelated files.
- Use concise commit messages that match the change.
- Never commit, push, publish, or merge without explicit user approval.

## Cursor Cloud specific instructions

Docutis is a static site. There is no package install and no build step. The default image’s Node.js and Python 3 are sufficient.

- Serve the site from the repository root with `python3 -m http.server 8765 --bind 0.0.0.0`, then open `http://127.0.0.1:8765/index.html`.
- Run the dependency-free checks listed under “Running Locally” in `README.md`. The same sequence is in `.github/workflows/validate.yml`. GitHub Actions uses Node.js 24; the checks also pass on the image’s current Node.js.
- `node scripts/review-governance.js --write` and `node scripts/review-batch.js --write` only confirm that generated review artifacts are unchanged. Do not use them to refresh a fingerprint after a clinical edit.
