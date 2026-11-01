# Shadow Becomes Me

An owner-accepted, closed laboratory **Playable Demo / Proof of Concept**: become a featureless black silhouette, imitate familiar shapes, and escape a patrolling guard. The single encounter is intentionally complete within its bounded scope; it is not a full campaign.

**Start here:** [Canonical AI resumption guide](docs/AI_RESUMPTION.md) · [Owner acceptance](docs/POC_ACCEPTANCE_CLOSURE.md) · [Publication status and rollback](docs/PUBLICATION.md). Publication is authorized at $0. Verified publication source `adac5ff` is on main; deployment dispatch/live verification remain blocked by environment network access. [Next Codex: resume here](docs/AI_RESUMPTION.md#next-codex--owner-paused-after-main-push). The accepted runtime is frozen, not reopened for development.

## Play locally

Requires Node.js (tested with v24.19.0) and Python 3 (tested with 3.12.14). The game has no runtime packages, network services, accounts, or downloaded fonts.

```sh
npm run build
npm start
```

Open the address printed by Python in your local browser. Stop with Ctrl-C. `dist/` is a static relative-path site. The manual exact-SHA Pages workflow is prepared; pushes do not deploy. To run the exact accepted publication artifact, use `python3 scripts/publication/prepare.py` then `python3 scripts/local-server.py --directory .publication/site`.

- A/D or left/right arrows: slide; stopping restores the approved resting silhouette.
- C / Transform: Shadow → Box → Chair → Shadow, with visible current/next form.
- Q/E: previous/next disguise only; 1/2: directly choose box/chair.
- X/Space: contextual attack. Eligible fitting-disguise stealth assassination uses Shadow Devour; other valid hits use ordinary Shadow Spike. Stay still for the full Devour presentation.
- R: restart. Menus and buttons support keyboard focus.
- Touch/mouse: use Transform to cycle or select Box/Chair directly; hold arrows to slide, tap Spike to attack. Portrait and landscape supported. Moving breaks camouflage.
- Language button switches English/Traditional Chinese live. Help and pause stop simulation. The goal is the marked exit to the right; you may evade or defeat the guard.

Observe the **illustrated scenery** to infer the fitting shape. The game never computes an object count or reveals an answer badge.

## Verify

Development-only test tools are pinned in `package-lock.json`:

```sh
npm ci --ignore-scripts
npm test
npm run build
# Keep npm start running in another terminal, then:
npm run test:browser
```

Browser tests use installed Chromium at `/usr/bin/chromium`; set `CHROMIUM_PATH` for another installation. `TEST_URL` can point to another locally served build. Tests generate screenshots and `evidence/browser-results.json`. Linux container runs use `--no-sandbox`; use a trusted local build only. The runtime itself needs none of these test packages.

## Review records

- [Approved GDD](docs/GDD.md) and [implementation brief](docs/CODEX_POC_BRIEF.md)
- [Current project state](docs/PROJECT_STATE.md)
- [Architecture, mechanics and tuning](docs/IMPLEMENTATION.md)
- [QA and individual UGDS status](docs/QA.md)
- [Visual comparison and owner review gate](docs/VISUAL_REVIEW.md)
- [Standards preflight](docs/PREFLIGHT.md)
- [Art provenance](art/README.md)

The prototype is one encounter with original sample illustration. It does not implement dialogue, story sequences, traversal powers, Godot, or campaign progression. Owner acceptance is recorded separately from automated tests and public release. Physical-device, Safari/Firefox and screen-reader coverage remain unverified. See the publication record for actual deployment status rather than inferring it from this overview.
