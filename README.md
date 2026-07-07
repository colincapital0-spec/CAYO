# Cayo

The payment infrastructure layer for the Caribbean — starting with the compliance wedge.

This repo currently contains the **KYB / AML compliance intelligence** prototype: an interactive shell demonstrating the multi-jurisdiction business verification workflow, AI-powered document analysis, sanctions screening, 4-eyes authorization, and an immutable audit trail. It's the Trojan-horse product that gets Cayo inside Caribbean banks before the payment rails launch.

## What's here

A working front-end prototype with a live Claude API integration in the "Ask AI" panel. This is a design/UX shell, not yet wired to a backend.

## Project structure

```
cayo-app/
├── index.html                  # Entry point — links all styles + scripts
├── src/
│   ├── styles/
│   │   ├── tokens.css          # Fonts, color palette, radii — theme here
│   │   ├── base.css            # Reset, app shell, sidebar, topbar
│   │   └── components.css      # Workflow, steps, docs, AI, panels, toast
│   ├── scripts/
│   │   ├── ui.js               # Panel tabs, step accordion, toasts, sign-off, decisions
│   │   └── ai-chat.js          # Live Claude API integration for Ask AI
│   └── data/
│       └── app-context.js      # AI system prompt / mock application record
└── public/                     # Static assets (logos, favicons) go here
```

## Design system

- **Palette:** light monochrome — paper white, ink black, graphite. Status carried by desaturated sage / ochre / brick tints. All tokens live in `src/styles/tokens.css`.
- **Type:** Newsreader (editorial serif, display) · Space Grotesk (UI) · Spline Sans Mono (data).

## Running locally

Any static server works. With Node installed:

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## The AI integration

The "Ask AI" panel calls the Anthropic Messages API. The system prompt lives in `src/data/app-context.js` as `APP_CONTEXT`. In production this should be built dynamically from the loaded application record rather than hard-coded, and the API call should be proxied through a backend so no key is exposed client-side.

## Roadmap (next in Claude Code)

- [ ] Backend: proxy the Claude API, add auth, persist applications
- [ ] Real document upload + OCR/extraction pipeline
- [ ] Registry adapters (CROS Trinidad, CAIPO Barbados, SVG FSA)
- [ ] Sanctions list integration (OFAC, UN, EU, INTERPOL, PEP)
- [ ] Append-only audit log with cryptographic integrity
- [ ] Multi-tenant bank configuration + per-bank risk weights
- [ ] ISO 20022 message formatting for downstream settlement

## Notes

- KYB = Know Your Business · AML = Anti-Money Laundering
- Target design partners: Bank of SVG, Republic Bank, CIBC FirstCaribbean
