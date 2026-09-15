# Docutis

**An open-source, structured dermatology reference and education toolkit.**

[View the live application](https://mnasuharas.github.io/Docutis/)

## About

Docutis is an open-source project that presents dermatology information in a clear, searchable and structured format.

The current version focuses primarily on malignant and precancerous cutaneous conditions. It is intended for physicians, medical trainees and other healthcare professionals seeking a concise educational reference.

Docutis is currently in active early development. Its content, structure and technical foundations are being expanded progressively.

## Current Features

- Searchable dermatologic condition library
- Organization by clinical category
- Structured condition detail pages
- Clinical features
- Dermoscopic findings
- Differential diagnoses
- Explicitly labelled ICD-10 WHO diagnosis classification and ICD-O oncology coding, where verified
- Treatment overviews
- Follow-up considerations
- Links to external clinical references
- Responsive browser-based interface
- No installation or account required

## Current Clinical Focus

The initial collection focuses on skin cancer and precancerous lesions, including:

- Keratinocyte carcinomas and precursor lesions
- Melanocytic malignancies and melanoma in situ
- Rare cutaneous malignancies
- Selected adnexal and soft-tissue tumors

The project will later expand into additional areas of dermatology while preserving a consistent structure and sourcing standard.

## Content Principles

Docutis aims to make medical information:

- Structured and easy to navigate
- Concise without losing essential clinical context
- Supported by reputable guidelines and scientific references
- Transparent about uncertainty and limitations
- Suitable for independent professional review

Medical content contributions should include appropriate references. All current medical records are marked `clinician review required`. New or substantially changed medical content must remain in that state until a qualified clinician documents review.

## Project Status

Docutis is an early-stage public prototype and should not yet be considered a comprehensive dermatology database.

Current development priorities include:

- Separating medical data from application logic
- Introducing a consistent disease-data structure
- Improving reference quality and review tracking
- Adding automated data and link validation
- Improving accessibility and filtering
- Establishing a transparent medical content review process
- Preparing multilingual support
- Developing educational visual content with appropriate licensing

See [ROADMAP.md](ROADMAP.md) for completed foundations, known gaps, the medical review workflow and release direction.

## Technology

The current application uses:

- HTML
- CSS
- JavaScript
- GitHub Pages

Medical records live in `data.js`; `app.js` contains filtering, rendering and interaction behavior. Records include a broad category, a structured subcategory, coding-system metadata, source metadata, and review status. This separation keeps content review focused and preserves the dependency-free static architecture.

Each reference has its own `metadataCheckedAt` date. This date means only that the reference's bibliographic metadata and link were checked on that date; it is not a publication date, clinical review date, or endorsement of the adjacent medical content.

Coding data is educational metadata, not billing guidance. ICD-10 WHO is kept distinct from national modifications, and ICD-O topography is kept distinct from morphology and behavior. Site-specific or jurisdiction-specific coding must be confirmed from the applicable official release.

The project intentionally begins with a lightweight architecture so that it remains easy to inspect, maintain and contribute to.

## Running Locally

No build process is currently required.

1. Download or clone the repository.
2. Open `index.html` in a modern web browser.

To run the dependency-free data, interaction, and static-page checks with a current Node.js installation:

```shell
node --test tests/*.test.js
```

## Contributing

Contributions, suggestions and bug reports are welcome.

Before proposing substantial medical content changes, please include reliable and current references and clearly describe the reason for the change.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution guidelines.

## Medical Disclaimer

Docutis is intended for educational and informational purposes only.

It does not replace professional medical judgment, diagnosis, treatment decisions or consultation of current clinical guidelines. Medical information must be independently verified before being used in clinical decision-making.

## License

This project is licensed under the [MIT License](LICENSE).
