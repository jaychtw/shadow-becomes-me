# Shadow Becomes Me — Art Pipeline Feasibility Gate

Status: Owner-approved **visual direction and asset-layout references**. Production sprite assets and motion remain **unverified**. This is a bounded implementation investigation, NOT an instruction to publish.

## Repository and governance
- Game: https://github.com/jaychtw/shadow-becomes-me
- Existing POC branch: `dev/first-playable-poc`; preserve `main` unchanged.
- Read current repository GDD, QA, visual review, decision records and PROJECT_STATE before editing.
- Consult https://github.com/jaychtw/game-development-standards for the latest applicable UGDS/AICP and templates. Respect newer owner decisions.
- Budget cap: $0. Do not buy services, enable billable APIs, deploy, publish, merge, or activate services without separate owner approval.
- Preserve existing stealth mechanics, scene rules, bilingual EN/zh-TW, keyboard/touch controls and restart/failure behavior.

## Approved reference materials
The three images in `approved-references/` are approved **art-direction and layout studies**, NOT ready-to-import sprite atlases. Labels, checkerboard backgrounds, inconsistent frame spacing, composite layers, and tiny poses are baked into the images. Do not simply crop and pretend these are transparent, aligned game sprites. Do not claim production readiness based on appearance alone.
- `01-art-direction.png`: core Shadow/guard/laboratory style, motion language and finish.
- `02-asset-layout-a.png` and `03-asset-layout-b.png`: approved target frame categories, props, parallax layering, lighting.
- The repository's earlier `art/approved_laboratory_concept.png` remains relevant.
- Older concept mechanics (e.g. shadow traversal) are NOT authorization to expand POC mechanics.

## Bounded objective
Prove that **two moving characters** can approach the approved visual quality at actual gameplay scale using an asset-first workflow:
1. Shadow: one clean, grounded, uninterrupted black draped idle silhouette; a coherent multi-frame slide/deformation sequence; a spike extension that visibly grows from the body and retracts.
2. Guard: one coherent side-view walk cycle with real alternating leg movement and weight transfer, not positional sliding. Preserve original character identity, proportions and outfit across frames.
3. Transparent per-frame sprites or documented equivalent animation source; consistent canvas sizes, pivots, baselines, facing, clean alpha and reproducible export.
4. A minimal in-browser animation preview or existing-POC test scene with controls for playback speed and frame stepping. Show actual sprite playback, not a still image.

## First do a feasibility preflight
- Determine which local/free tools and asset-generation or animation interfaces are actually available in Codex's environment. Do not assume GUI apps, paid image models, or external services are available.
- Explain how the approved reference sheets will guide art production and how independently editable sprite frames will be obtained. If clean, consistent assets cannot be generated under $0 with available tooling, STOP and report the blocker plus concrete alternatives; do not replace the approved style with generic procedural shapes.
- Prefer a small, verifiable character-only prototype over a broad art rewrite.

## Evidence and acceptance
- Deliver source and exported assets, export recipe, per-frame manifest (dimensions, pivot/baseline, duration), and a playable preview.
- Capture actual browser playback at representative desktop/mobile game scales and record any silhouette, frame-alignment, gait or visual-quality defects.
- Run relevant tests and ensure gameplay does not regress if integrating into POC.
- Report what is proven versus what remains aspirational. **Owner acceptance is required** before any further environment overhaul or production rollout.
- No merge, deployment or publication.

## Expected report
Summarize available tools, chosen workflow, exact outputs, visual deviations, tests, costs ($0), risks, links to preview and evidence, and the specific owner decision needed next.
