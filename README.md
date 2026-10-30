# Shadow Becomes Me

A local browser mechanics POC: become a featureless black silhouette, imitate the laboratory's familiar shapes, and escape a patrolling guard. **Owner review pending. Not deployed or published.**

## Play locally

Requires Node.js (tested with v24.19.0) and Python 3 (tested with 3.12.14). The game has no runtime packages, network services, accounts, or downloaded fonts.

```sh
npm run build
npm start
```

Open the address printed by Python in your local browser. Stop with Ctrl-C. `dist/` is a static, relative-path site suitable for a future GitHub Pages release; no publishing workflow is installed.

- A/D or left/right arrows: slide; stopping restores the upright silhouette.
- Q/E: cycle and apply disguise; 1/2: directly choose box/chair.
- C: apply the selected disguise or return upright.
- X/Space: one contextual spike. Get close in a fitting disguise while the guard is unaware for a takedown. Other hits deal ordinary damage.
- R: restart. Menus and buttons support keyboard focus.
- Touch: hold arrows, tap box/chair to transform, tap Spike. Portrait and landscape supported. Moving breaks camouflage.
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

The prototype is one encounter with original sample illustration. It does not implement dialogue, story sequences, traversal powers, Godot, or campaign progression. Tests establish observed behavior; they do not establish owner acceptance, production art approval, device coverage, CI, or a public release.
