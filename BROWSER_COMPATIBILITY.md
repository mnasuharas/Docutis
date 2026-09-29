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

Checked 2026-09-30 (Europe/Berlin) on this workspace. No cell below is **Verified in real browser**.

| Browser | Version | OS | Real execution? | Desktop | 768px | Mobile | Keyboard | History/navigation | Cases | Quiz | Follow-up | Known limitations |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Google Chrome | 151.0.7922.169 (`google-chrome --version`) | Debian GNU/Linux 13, Linux 6.12.94+ x86_64 | Partial headless probes only. Core flows were not driven. | Code-audited but not executed | Code-audited but not executed | Code-audited but not executed | Code-audited but not executed | Code-audited but not executed | Code-audited but not executed | Code-audited but not executed | Code-audited but not executed | See probes. Do not treat probes as a pass. |
| Mozilla Firefox | Not available | Not available | Not available | Not available | Not available | Not available | Not available | Not available | Not available | Not available | Not available | `firefox` is not installed. Unverified. |
| Microsoft Edge | Not available | Not available | Not available | Not available | Not available | Not available | Not available | Not available | Not available | Not available | Not available | `microsoft-edge` is not installed. Unverified separately from Chrome. |
| Safari / WebKit | Not available | Not available | Not available | Not available | Not available | Not available | Not available | Not available | Not available | Not available | Not available | Code-audited; real Safari execution still required. No WebKit or Safari binary is installed. An emulator was not installed and is not a substitute. |

## Limited headless Chrome probes

These ran in Google Chrome 151.0.7922.169 with `--headless=new` on Linux. They are not desktop, mobile-device, keyboard, or core-flow verification.

| Probe | Result |
| --- | --- |
| `file:///tmp` page calling `history.pushState` / `history.replaceState` | Did not throw in this Chrome. This was not Back/Forward through the app. |
| `element.focus({ preventScroll: true })` and `scrollBy({ left, top })` on that probe page | Did not throw in this Chrome. |
| Styled copy of the header at `window.innerWidth === 768` before the navigation fix | `.primary-links` computed `display: none` while seven links were still in the DOM. Screenshot also showed the in-page links absent at a narrow window. |
| `type="search"` with value `melanoma` plus the custom Clear control, unfocused | No second native cancel glyph was visible in the headless screenshot. WebKit may still paint `::-webkit-search-cancel-button`; that was not executed. |
| Quiz option and review summary using `outline: 3px solid var(--color-focus)` before the token fix | `--color-focus` computed empty. Focused `.quiz-option` computed `outline-style: none`. |
| `.quiz-option`, `.review-stat`, `.case-module` before the missing-token fix | Quiz option and review stat backgrounds computed `rgba(0, 0, 0, 0)`. Case module shadow computed `none` because `--shadow-sm` was empty. |
| `--window-size=390,844` | Not a phone. The probe page reported a layout width wider than 390. Not a mobile pass. |

The navigation and token defects above were fixed in source after these probes. The fixes were not re-run in a browser in this session.

## Code audit (not execution)

Reviewed without a browser engine for Firefox, Edge, and Safari: `index.html`, `style.css`, `app.js`, `case-app.js`, `quiz-app.js`, `followup-app.js`, `review-ui.js`, and `oss-feedback.js`.

Areas read: `replaceAll` and optional chaining (widely supported in current Chrome, Firefox, and Safari; not a rewrite target), `history.pushState` / `popstate`, `:focus-visible` without a fallback, `focus({ preventScroll: true })`, `scrollIntoView({ behavior: "smooth" })` versus `prefers-reduced-motion`, `vh` on the case zoom pane, flex/grid `minmax(0, 1fr)`, `details`/`summary`, `input[type=search]`, sticky header `backdrop-filter`, and implicit globals (app scripts are strict IIFEs).

Changes made from that audit are in the Goal 15 changelog. Clinical records, review decisions, attestations, and fingerprints were not edited.

## Verified core flows

None. Node tests exercise a fake DOM. They do not verify a browser.

A core flow, when someone does run it, is: load the library, search, open a condition, use Back and Forward, complete one quiz question, change one follow-up selector, open one case through Reveal without seeing the diagnosis early, and tab through the primary links. Repeat at desktop width, about 768px, and a phone-sized width, with the keyboard.

## Unverified environments

- Firefox: not installed, unverified.
- Microsoft Edge: not installed, unverified separately from Chrome.
- Safari and WebKit: not installed. Code-audited; real Safari execution still required.
- Physical phones, tablets, and assistive technologies.
- The full Chrome desktop session the parent may run after this change.

## Known limitations

- `.source-disclosure summary` is `display: inline-flex`. Older Safari builds have mishandled `summary` as a flex container (marker and, in some versions, toggling). Safari 18.4 changed the disclosure marker. This was not executed. Do not mark it passed.
- Case zoom pan calls `scrollBy` with an options object. The probe showed that call shape does not throw in this Chrome. It was not keyboard-tested on a zoomed case image.
- Browsers that do not understand `dvh` keep the `70vh` max-height. `dvh` was not measured on iOS.
- `-webkit-backdrop-filter` is set beside `backdrop-filter`. The header is already nearly opaque, so a missing blur is cosmetic. Not executed in Safari.
- `:focus-visible` fallbacks apply only where `selector(:focus-visible)` is unsupported. Current Chrome uses the `:focus-visible` rules. Those rings were not tabbed in a browser after the token fix.
- No-JS fallbacks are one sentence and hide empty interactive shells. They are not a no-JS clinical app. The case module keeps its existing, more specific noscript sentence and still does not print diagnosis text.
- This was not a screen-reader test and does not establish WCAG conformance.

## Retest policy

Repeat the core matrix after major UI changes and before releases: desktop, 768px, mobile width, keyboard, history/navigation, cases, quiz, and follow-up, in each browser you claim. Record the real version, OS, and date. Do not copy a Chrome result into Firefox, Edge, or Safari.
Do not mark a cell **Verified in real browser** from code review, Node tests, or a headless probe of one property.

## Pending real execution

The parent may update only this section after a real browser run. Leave a cell as pending until that run happens. Do not invent versions.

| Browser | Version | OS | Date | Desktop | 768px | Mobile | Keyboard | History/navigation | Cases | Quiz | Follow-up | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Google Chrome | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | Not executed here |
| Mozilla Firefox | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | Not available in this session |
| Microsoft Edge | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | Not available in this session |
| Safari / WebKit | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | pending real execution | Code-audited; real Safari execution still required. |
