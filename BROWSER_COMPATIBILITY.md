# Browser compatibility

This document is engineering verification of the static Docutis UI. It is not medical validation, clinician review, or a statement that any clinical claim is correct.

Status words used below:

- **Verified in real browser** — a person or automated browser session actually ran that flow in that browser. A passing Node test is not this.
- **Code-audited but not executed** — the source was read for that risk, but that browser did not run the flow.
- **Not available** — that browser is not installed here, so it was not run.
- **Known issue** — a defect was reproduced or is still present.
- **Pending real execution** — reserved for a later run. Do not fill these cells without a real browser session.

Chromium is not Safari and not Firefox. Google Chrome is not Microsoft Edge. Headless computed-style probes are not the core-flow matrix.

## Matrix

Real Chrome session on 2026-09-30 (Europe/Berlin), branch `goal-15-cross-browser-hardening`. Desktop and 768px were run on `06a918739e66417d567e83514b47096c3bda1a17`. The 390×700 retest was run after `6579485ac929524460c55bf86ad121db5d543c84` at `http://127.0.0.1:8765/index.html`. This was desktop Chrome on Debian/Linux, not a phone.

| Browser | Version | OS | Real execution? | Desktop | 768px | Mobile | Keyboard | History/navigation | Cases | Quiz | Follow-up | Known limitations |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Google Chrome | 151.0.7922.169 | Debian GNU/Linux 13 (Linux desktop, not a phone) | Yes. Google Chrome 151.0.7922.169 drove the page. | Verified in real browser (~1265–1280, rechecked ~1280×720) | Verified in real browser (768×700, rechecked) | Verified in real Google Chrome 151.0.7922.169 on Linux at 390×700: no page-wide horizontal scrollbar, the Open source preview pill is fully inside the viewport, the primary nav is its own row and a mouse click on Search went to #searchPanel rather than GitHub, and Tab focus on Conditions and Cases stayed visible as the strip scrolled; the strip clips the top and bottom of the focus outline so only the side bars show, which is a known minor limitation and not a blocker. | Verified in real browser | Verified in real browser | Verified in real browser | Verified in real browser (UI only) | Verified in real browser (UI only) | Focus outline on the 390px nav strip is clipped to its side bars. Not restyled. |
| Mozilla Firefox | Not available | Not available | Not available | Not available | Not available | Not available | Not available | Not available | Not available | Not available | Not available | `firefox` is not installed. Unverified. |
| Microsoft Edge | Not available | Not available | Not available | Not available | Not available | Not available | Not available | Not available | Not available | Not available | Not available | `microsoft-edge` is not installed. Unverified separately from Chrome. |
| Safari / WebKit | Not available | Not available | Not available | Not available | Not available | Not available | Not available | Not available | Not available | Not available | Not available | Code-audited; real Safari execution still required. No WebKit or Safari binary is installed. An emulator was not installed and is not a substitute. |

## Real Chrome 151 session

Observed in Google Chrome 151.0.7922.169 on Debian/Linux. Not medically judged.

- Desktop about 1265–1280: navigation, search for "basal", clear, condition open and close, Escape closes the whole condition panel (not only an inner disclosure), Back, Forward, and refresh on `?condition=basal-cell-carcinoma`. A bogus condition id is ignored with no fatal error and no explicit not-found message.
- 768×700: primary nav is a sideways-scrolling strip, the page does not scroll sideways, and a condition panel is readable. Rechecked after `6579485` and still passes, with no page-wide overflow and nav clicks reaching the right targets.
- 390×700 before the header fix: FAIL. The page scrolled sideways about 33px. The "Open source preview" pill ran past the right edge. Primary links sat under the GitHub link and that pill, so a click on "Search" hit GitHub. Tab reached the links, but the focused link was not visible.
- 390×700 after `6579485ac929524460c55bf86ad121db5d543c84`: Verified in real Google Chrome 151.0.7922.169 on Linux at 390×700: no page-wide horizontal scrollbar, the Open source preview pill is fully inside the viewport, the primary nav is its own row and a mouse click on Search went to #searchPanel rather than GitHub, and Tab focus on Conditions and Cases stayed visible as the strip scrolled; the strip clips the top and bottom of the focus outline so only the side bars show, which is a known minor limitation and not a blocker.
- Keyboard in this Chrome: skip link, visible focus rings, and the search outline.
- Cases: `case-01-clinical.jpg`, diagnosis and source link hidden before reveal and present after.
- Quiz and follow-up controls worked as UI. This is not a clinical judgment.
- JavaScript disabled: fallbacks showed, then JavaScript was turned back on.
- Firefox, Edge, and Safari were not run.

Desktop about 1280×720 was rechecked after `6579485` and still passes: no page-wide overflow, and nav clicks reach the right targets.

## Limited headless Chrome probes

Earlier headless probes in Google Chrome 151.0.7922.169 are not a substitute for the real session above.

| Probe | Result |
| --- | --- |
| `file:///tmp` page calling `history.pushState` / `history.replaceState` | Did not throw in this Chrome. This was not Back/Forward through the app. |
| `element.focus({ preventScroll: true })` and `scrollBy({ left, top })` on that probe page | Did not throw in this Chrome. |
| Styled copy of the header at `window.innerWidth === 768` before the navigation fix | `.primary-links` computed `display: none` while seven links were still in the DOM. |
| `type="search"` with value `melanoma` plus the custom Clear control, unfocused | No second native cancel glyph was visible. WebKit may still paint `::-webkit-search-cancel-button`; that was not executed. |
| Quiz option and review summary using `outline: 3px solid var(--color-focus)` before the token fix | `--color-focus` computed empty. Focused `.quiz-option` computed `outline-style: none`. |
| `.quiz-option`, `.review-stat`, `.case-module` before the missing-token fix | Quiz option and review stat backgrounds computed transparent. Case module shadow computed `none` because `--shadow-sm` was empty. |

## Code audit (not execution)

Reviewed without a browser engine for Firefox, Edge, and Safari: `index.html`, `style.css`, `app.js`, `case-app.js`, `quiz-app.js`, `followup-app.js`, `review-ui.js`, and `oss-feedback.js`.

Areas read: `replaceAll` and optional chaining, `history.pushState` / `popstate`, `:focus-visible`, `focus({ preventScroll: true })`, `scrollIntoView` versus `prefers-reduced-motion`, `vh` on the case zoom pane, flex/grid overflow, `details`/`summary`, `input[type=search]`, sticky header `backdrop-filter`, and implicit globals (app scripts are strict IIFEs).

Clinical records, review decisions, attestations, and fingerprints were not edited.

## Verified core flows

Verified in real browser only for Google Chrome 151.0.7922.169 on Debian/Linux, at desktop (~1265–1280 and a recheck near 1280×720), 768×700, and 390×700, as listed above.

Not verified: Firefox, Edge, Safari/WebKit, a physical phone, and a screen reader.

## Unverified environments

- Firefox: not installed, unverified.
- Microsoft Edge: not installed, unverified separately from Chrome.
- Safari and WebKit: not installed. Code-audited; real Safari execution still required.
- Physical phones and assistive technologies.

## Known limitations

- At 390×700 the primary-nav strip clips the top and bottom of the focus outline, so only the side bars show. Observed in Chrome 151. Not a blocker, and not restyled.
- Review-count tiles share the same card chrome. That is a known non-blocker, not a Goal 15 defect. The distinction is the label text (clinician-reviewed versus requiring review). Status badges elsewhere already differ.
- Escape closes the whole condition panel, not only an inner disclosure. Observed in this Chrome session.
- A bogus condition id is ignored with no fatal error and no explicit not-found message. That is existing behavior and was not changed.
- `.source-disclosure summary` is `display: inline-flex`. Older Safari builds have mishandled `summary` as a flex container. This was not executed. Do not mark it passed.
- Case zoom pan calls `scrollBy` with an options object. It was not keyboard-tested on a zoomed case image in Safari.
- Browsers that do not understand `dvh` keep the `70vh` max-height. `dvh` was not measured on iOS.
- `-webkit-backdrop-filter` is set beside `backdrop-filter`. Not executed in Safari.
- No-JS fallbacks are one sentence. They are not a no-JS clinical app.
- This was not a screen-reader test and does not establish WCAG conformance.

## Retest policy

Repeat the core matrix after major UI changes and before releases: desktop, 768px, mobile width, keyboard, history/navigation, cases, quiz, and follow-up, in each browser you claim. Record the real version, OS, and date. Do not copy a Chrome result into Firefox, Edge, or Safari.
Do not mark a cell **Verified in real browser** from code review, Node tests, or a headless probe of one property.

## Pending real execution

| Browser | Version | OS | Date | Desktop | 768px | Mobile | Keyboard | History/navigation | Cases | Quiz | Follow-up | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Google Chrome | 151.0.7922.169 | Debian/Linux | 2026-09-30 | Recorded above | Recorded above | Verified in real browser at 390×700 after 6579485 | Recorded above | Recorded above | Recorded above | Recorded above | Recorded above | Focus-outline clipping on the nav strip is a minor limitation |
| Mozilla Firefox | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | Not available in this session |
| Microsoft Edge | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | Not available in this session |
| Safari / WebKit | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | Code-audited; real Safari execution still required. |
