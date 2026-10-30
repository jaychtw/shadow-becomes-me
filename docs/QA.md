# POC QA and owner review report

**Scope:** one local browser encounter, owner acceptance pending. No release approval is implied. Verified repository, branch and exact standards provenance are in [PREFLIGHT](PREFLIGHT.md).

## Final artifact and reproduction

- Branch: `dev/first-playable-poc`; base commit `e1404aeb4ab60fb54f796a07c0f9276e0dac52e5`.
- Static artifact: [download ZIP](../evidence/shadow-becomes-me-poc.zip), **39,076 bytes uncompressed** across seven runtime files. No reference images or test packages in the build.
- Runtime content SHA-256: `4fd4e2020537aab36d323f9c28f9693a7aa8a24ad6a74dfc8705bb0ad221d1ed`.
- [Manifest](../evidence/build-manifest.json) records each file hash and the ZIP hash. Reproduce packaging with `python3 scripts/artifact.py` after `npm run build`.
- `npm run build`, then `npm start`; stop with Ctrl-C. Serve HTTP rather than opening `index.html` through `file:` because the game uses ES modules. See [README](../README.md).
- Final source changes: `index.html`, `style.css`, four `src/` modules, original `art/laboratory.svg`, supplied reference art with role documentation, package/lockfile, static-build and artifact scripts, engine/browser tests and alternate-art fixture, adopted handoff/standards documents, current project state, and QA/visual evidence. README updated. No existing application code was overwritten.

## Executed checks

| Check / command | Observed outcome |
| --- | --- |
| `node --test --test-reporter=spec tests/engine.test.js` (`npm test`) | **18 passed, 0 failed, 0 skipped.** Individual results: [unit-results.txt](../evidence/unit-results.txt). |
| `npm ci --ignore-scripts --no-audit --no-fund` | Frozen lockfile reinstall passed (five development packages); game has no runtime packages. |
| `npm run build` | Passed. Static build with all relative asset paths. |
| `npm start` | Documented command started successfully; all seven served runtime files matched the artifact hashes. Validation server then stopped. |
| `npm run test:browser` against the served `dist/` | **18 passed, 0 failed.** [Machine-readable results](../evidence/browser-results.json). Chromium **154.0.8037.57**, Playwright 1.56.1. Final run 2026-10-30 15:30–15:32 Asia/Taipei. |
| Axe 4.10.2, WCAG 2 A/AA + 2.1 AA | **16 audits, 0 violations:** intro + playing, both locales, four viewport widths. Incomplete contrast checks for health/arrow glyphs are explicitly retained in the result JSON; not silently counted as resolved by axe. |
| Manual contrast calculations for the CSS colors | Nine checked pairs exceed 4.5:1; arrow/button colors 13.06:1. [Ratios](../evidence/contrast-checks.json). Inspection checked visible focus and non-color status glyphs/text. Not a screen-reader or human usability certification. |
| Layout / target measurements | 320, 390, 768, 1440 CSS px, EN and zh-TW. No document horizontal overflow. Every visible button at least 44×44 CSS px. Phone full-page screenshots include intentional vertical scrolling outside the stage. |
| Reduced motion / normal motion | Computed Shadow transition `0s` under reduce, `0.16s` under no-preference; functional interactions verified under reduce. No audio is present. |
| Storage | Language survives reload. Unknown and inherited-property strings (`__proto__`, `constructor`) safely fall back; blocked localStorage does not break entry or switching. |
| Runtime network / errors | **0 browser page errors; 0 off-origin requests.** Game actions still work with network disabled after load. No offline-install/service-worker claim. |
| Performance sample | 180 requestAnimationFrame intervals on this cloud Chromium host: median **16.7 ms**, p95 **16.7 ms**, maximum **50 ms**. Not a GPU render-time profile or physical-phone benchmark. |
| Git integrity / changes | Initial Git integrity check passed. Final staged whitespace check passed with Markdown hard-break trailing spaces allowed (exact reference documents preserved); no main merge, remote push, CI, deployment or portal changes. |

The process sandbox initially collapsed Node's reporter to a single file-level result. The final unit command ran through the supported execution boundary and reported **18 actual cases**, rather than treating the initial file-level count as 18 tests.

## What the browser actually did

No gameplay state injection: tests observe a read-only snapshot and drive actual controls. Desktop paths use Playwright keyboard events; mobile paths use Chromium touch-start/end contacts to hold movement and touch taps on gameplay buttons.

1. Intro help returns to entry without starting time; entering begins the encounter.
2. Desktop upright → sliding → stationary fitting box → guard remains patrolling → close spike instantly downs guard → move to exit with full health.
3. Wrong chair → guard approaches and investigates → close spike leaves guard at 2/3 HP → hostility → player failure → replay resets positions, health, cooldown and guard.
4. Keyboard focus, pause/resume, help, live language change during held movement, and language persistence.
5. Complete Traditional Chinese phone touch stealth success and separate wrong-disguise damage/failure/retry path; live switch to English and back preserves state.
6. Exposed movement into sight → immediate hostility → failure → R restart. Q/E, C and direct-form keys exercised.
7. Unresolved wrong-form inspection becomes hostile without any player attack; guard still has full HP at that transition.
8. Both locales and all four layouts audited, form controls exercised, preference faults tested, and runtime/performance sampled.

Rule tests additionally cover back-facing/out-of-range/occluded targets, invalid scene data, metadata/art swap to chair, armor exclusion, attack range/cooldown, ordinary repeated-hit victory, fitting correction during investigation, retained hostility, patrol bounds, floor bounds, terminal-state freeze and deterministic complete stealth solvability. The alternate chair-majority fixture is authored artwork, not a pixel-counting test.

## Visual evidence and gaps

[Visual review](VISUAL_REVIEW.md) links actual desktop/phone screenshots of upright, blob, fitting and unfitting disguises, spike, hostile state, success and failure, and compares them directly against the approved concept. The original layered vector lab follows palette and silhouette contrast, but has less painterly atmosphere, architectural richness and animation than the reference. **Owner visual approval remains pending.** No production-scale art set was generated.

## UGDS status (individual IDs)

Pass means demonstrated within the stated POC/test scope. Not Verified is never Pass, and this is not a full-release readiness claim.

| ID | Status | Evidence / reason |
| --- | --- | --- |
| P01 | Pass | Intro, goal, feedback, exit, death and replay; real success/failure paths. |
| P02 | Pass | Keyboard and actual emulated touch playthroughs; pointer cancellation/blur handling. |
| P03 | Pass | Eight locale/width combinations, screenshots, overflow and target checks. Physical devices outstanding. |
| P04 | Pass | Separately tested rules, visible forms/states, clear continuous floor, metadata contract and tuning documented. |
| P05 | Pass | Result restart and R reset the encounter; no meaningful multi-session progress to destroy. |
| L01 | Pass | Central resources and matching-key test; translated UI, feedback and accessibility names. Brand title remains unchanged. |
| L02 | Pass | Live switches preserve encounter and held movement; both locales complete primary flows. |
| A01 | Pass (tested scope) | Labels, focus, 44px buttons, text/symbol reaction cues, axe and contrast checks. Screen-reader/first-player tests Not Verified. |
| A02 | Pass | Reduced-motion transition verified. Sound controls N/A: no sound. |
| V01 | Pass | Original runtime illustration; concept and proprietary dialogue image excluded from build. |
| V02 | Pass | Mechanics and visual/production acceptance explicitly separate. |
| V03 | Not Verified | Representative scene inspected for alignment and readability; owner evaluation of coherent visual finish pending. |
| V04 | Not Verified | Playable representative scene and desktop/mobile comparison delivered; owner visual-direction approval pending before expansion. |
| V05 | Pass | Visual gap, sample, alternative bounded pipelines and approval boundary documented; no final-quality claim or hidden downgrade. |
| V06 | Pass | Actual final running-build screenshots and explicit approval status. |
| S01 | Pass | Language preference validation, reload, corrupt/blocked storage tests. No campaign progress or accounts. |
| S02 | Pass | Locally bundled runtime, no runtime dependencies, services or telemetry. |
| S03 | Not Verified | Responsive cloud-browser sample recorded; ordinary physical target-device performance not measured. |
| S04 | Pass | Stylized non-graphic fictional combat, no gore or real-world capability claims. |
| Q01 | Pass | 18 independent engine/data/localization cases. |
| Q02 | Pass | 18 real-browser scenarios, desktop and touch, both languages, success/failure/retry and storage. |
| Q03 | Pass (POC) | Authored deterministic stealth route is solvable; contextual damage and integrity tests. Human fun/balance Not Verified. |
| Q04 | Pass (tested scope) | Keyboard/touch checks, 16 axe audits, contrast calculations and limitations. |
| Q05 | Pass | Local evidence distinguished from unrun CI, unauthorized source push, deployment and live verification. |
| Q06 | Pass | Commands, counts, browser, artifact, screenshots, device and review limitations recorded. |
| C01 | Pass | Frozen design followed; owner acceptance pending, no generated approval claims. |
| C02 | Pass | Bounded implementation; fidelity gap presented with original sample and next review gate. No external service, paid work or scope expansion. |
| C03 | N/A | No reusable standard change proposed; pinned standards unchanged. Local retrospective only. |

## Limitations / owner gate

- **Not Verified:** physical phones/tablets, Safari/Firefox, screen-reader play, independent first-time human players, native zh-TW editorial review and owner visual/POC acceptance.
- One guard, one continuous corridor, limited character animation, simple center-position horizontal sight/range and static art. Empty real-scene occluder list; wall occlusion verified in rule fixtures only. Hostile guards do not forget the player. These are documented POC tuning choices, not campaign promises.
- The successful route can be much shorter than 1–2 minutes once learned; difficulty and fun need a first-time player. No dynamic counting, story, dialogue, Godot, advanced powers, extra levels, accounts, paid assets or online services.
- First browser run: eight scenarios passed, seven failed (six mobile/tablet help-target measurements and one mistimed stealth test). The button was corrected; the stealth test now waits in disguise before the patrol turns. Later review corrected semantics, invalid saved-language handling and pre-entry help. Final complete run passes; [initial results](../evidence/initial-browser-results.json) are retained as historical evidence only.
- **Not published; no deployment performed.** No merge or remote push. CI and live URL verification were not run because release was not authorized. Possibility untouched. Temporary local test server is stopped after validation.

Please review this local POC and the separate visual comparison. The next proposed iteration is a bounded pass on camouflage readability, guard/Shadow animation and reference fidelity after owner feedback; full production, merging and release remain separate gates.
