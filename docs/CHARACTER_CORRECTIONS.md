# Character motion corrections — owner review

Date: 2026-10-31 (Asia/Taipei). Status: localized revision, fresh visual acceptance pending.

Baseline: `cdfd8cfaa8f6e5cdbee84a2344b8a763154c86e5`, preserved in this branch. The owner assessed the experiment as technically successful and requested two localized design corrections: amorphous grounded Shadow without head/neck or drapery points, and a relatively upright guard gait with reduced knee flexion/stepping. The extension/retraction behavior is acceptable and must be preserved. This does not accept the replacement artwork, reopen the two separate historical milestones, or authorize new motions or game integration.

AICP 1.2.1 remains pinned to `b8b9de0d4faaf666fb53cec83ff8516bccf5bd5b`; UGDS 1.0.0 remains pinned to `374143e614ed9d95bf2c413fb13711e802f2133c`. Latest owner direction governs this revision where older documents describe a cloaked/humanoid resting design. Historical GDD and earlier reports are retained; no shared standard changes. The supplied reference sheet remains visual guidance, not instructions to implement its deferred traversal/other animation categories.

## Source changes

- Shadow is one opaque pure-black closed contour with a continuous rounded mound, no separate head/neck, no internal facial features, and a flat source-y=240 support boundary. Its hand/attack-region control curves, 12 extension values and 220 ms duration schedule match the baseline.
- Guard hips are raised for relatively upright support. Knee flexion is at most 25.3° on support and 38.4° in swing; foot lift drops from 18 to 5 source pixels. Arm swing is smaller. The swing path meets the stance path's horizontal velocity at both ends.
- The same 1,200 ms walk cycle is sampled at 24 × 50 ms; previously 12 × 100 ms. This modest resampling uses the same editable SVG → transparent PNG process, without another animation or rendering pipeline. Sampled stance speed stays 58 world units/s.
- Preview ground stroke now meets the silhouette's support edge. Ground motion scales with inspection zoom and facing so it remains consistent with stance displacement. Both independent frame scrubbers and frame stepping handle the new count.

[Editable sources, manifest, frame exports and recipe](../art/character-experiment/README.md). [Standalone preview source](../character-study/index.html); run through HTTP as documented. The production game build excludes it.

Fresh evidence and verification results are recorded in `evidence/character-corrections/`. The original experiment evidence remains intact at `evidence/character-experiment/`. No gameplay, collision, hitbox, attack/cooldown timing, original runtime artwork, dependency pins or build-script changes. No environment production, paid tools, merge or deployment.


## Review evidence

- Desktop: [actual playback GIF](../evidence/character-corrections/study-1440.gif), [original WebM](../evidence/character-corrections/study-1440.webm), [EN screenshot](../evidence/character-corrections/study-1440-en.png), [Traditional Chinese screenshot](../evidence/character-corrections/study-1440-zh-TW.png).
- Phone scale: [actual playback GIF](../evidence/character-corrections/study-390.gif), [original WebM](../evidence/character-corrections/study-390.webm), [EN screenshot](../evidence/character-corrections/study-390-en.png), [Traditional Chinese screenshot](../evidence/character-corrections/study-390-zh-TW.png).
- [All 12 Shadow poses](../evidence/character-corrections/shadow-spike-contact-sheet.png), [all 24 guard poses](../evidence/character-corrections/guard-walk-contact-sheet.png), [manifest/alignment/timings](../art/character-experiment/manifest.json).

Both actual Chromium screencasts show 1× playback, followed by half-speed right/left inspection and a return to 1× facing left. Spatial scale remains 1×. The phone view scrolls both motion panels into the recording viewport; full-page screenshots include all controls. GIFs are 25 fps, full-resolution derivatives of completed WebMs. The source PNG/SVG frames are authoritative: video JPEG/VP9 and GIF palette compression are lossy and may omit brief 10–20 ms attack poses. Preview frame stepping exposes every pose. No staged still-image playback substitutes for browser recordings.

## Fresh verification

| Check | Result |
| --- | --- |
| `python3 scripts/character-experiment/draw.py` | 12 corrected Shadow SVGs + 24 guard SVGs; same two existing motion categories only. |
| `node scripts/character-experiment/export.mjs` (twice) | All 36 transparent PNG SHA-256 hashes and the full manifest were identical across exports with the same installed Chromium. |
| `python3 scripts/character-experiment/verify.py` | 339 asset-property assertions passed, zero failed. Alpha/padding/connectivity, pure black, flat continuous contact/no below-ground pixels, no upper-body neck narrowing, attack control curves and opaque distal footprint preserved against `cdfd8cf`, attack timing schedule unchanged, alternating support, reduced knee flexion, foot lift and stance velocity. These are asset checks, not 339 independent gameplay tests. |
| `node scripts/character-experiment/browser.mjs` | Final run: 12 cases passed, zero failed; desktop 1440px and touch-emulated phone 390px. Every frame scrubbed, step wrapping with different motion counts, playback/facing/zoom/SVG controls, reduced-motion initial pause, keyboard focus, bilingual layout, actual screencast encoding. |
| Axe inside that browser run | Four audits, zero violations, both locales at both widths. Incomplete findings retained in JSON; not screen-reader or human usability certification. |
| `npm test` | 18 actual engine unit tests passed; zero failed/skipped. |
| `npm run build` | Passed. Existing seven-file game build still excludes the standalone study. |
| Protected-boundary comparison against `cdfd8cf` | No changes to `src/`, `tests/`, original `art/laboratory.svg`, `index.html`, `style.css`, package/lockfile, or original build/packaging scripts. Gameplay mechanics, collision geometry, hitboxes and timings stay untouched. |

Machine-readable [asset checks](../evidence/character-corrections/asset-checks.json), [repeatability](../evidence/character-corrections/repeatability.json), [browser results](../evidence/character-corrections/browser-results.json), [gait metrics](../evidence/character-corrections/correction-metrics.json), [unit log](../evidence/character-corrections/unit-results.txt), [build log](../evidence/character-corrections/build-results.txt), [recording metadata](../evidence/character-corrections/recording-390.json), [input provenance](../evidence/character-corrections/provenance.json) and [evidence hashes](../evidence/character-corrections/SHA256SUMS).

Installed toolchain: Node 24.19.0, Playwright 1.56.1, system Chromium 154.0.8037.57, Python/Pillow and system FFmpeg. No dependency declarations or lockfile changes, paid/image-generation service, Blender or verification bypass. Repeatability is verified in this toolchain, not promised across arbitrary rasterizer versions. Initial checks exposed a now-obsolete old body-envelope assumption; the wider mass is verified against its own 166px envelope while attack reach is compared separately. Whole-path rasterization changes a few edge-alpha values, but its unchanged blade curves and opaque distal footprint are verified rather than claiming byte-identical old spike PNGs.

## Visual inspection and limits

All 36 poses, desktop/phone screenshots, and extracted frames from the actual recordings were inspected. The upper mass now broadens without a separate bulb/head or narrow neck; the lower silhouette closes along a single flat support line without hem points or gaps. The attack appendage stays continuously connected at the forward upper-body hand region. This is a visual correction within the existing attack sequence, not a newly produced idle/slide animation set.

Guard support is more upright, swing clearance is low and contacts alternate consistently. Continuous source-path stance speed remains 58 world units/s; held-frame travel drops from 5.8 to 2.9 world units, halving the nominal subframe stepping bound. That is an improvement, not elimination of visible foot sliding. The walk still uses sampled sprites with limited heel/toe roll and simple torso weight transfer. It remains stylized and cleaner than the approved illustrated sheet; owner judgment of naturalness, amorphous identity and reference fidelity is pending.

Ground conformance is demonstrated only for the level surface present in this study. No slopes, steps, terrain deformation or collision/physics changes were introduced; conformance to future supporting geometry is not claimed. Physical phones, Safari/Firefox, screen-reader testing and independent aesthetic acceptance remain unverified. No new game integration means the full older gameplay browser suite was not rerun; this revision's fresh preview and engine checks are distinct from earlier recovery runs.

## Preservation and review gate

Working branch stays `dev/recovery-art-pipeline`; baseline and old evidence are preserved. A meaningful source correction checkpoint was pushed before final media/documentation. Final changes are committed, safely pushed without force and fetched back for SHA verification before reporting completion. No Actions/deployment workflows or external service integration are added; the owner's prior Pages/Actions settings review remains the settings evidence. No merge, deployment, publication, environment art or gameplay expansion occurred. Incremental paid-service expenditure: $0.

Stop here for owner visual acceptance of these localized corrections. Technical success is not visual acceptance or authorization for another animation, integration or production phase. Historical baseline acceptance and separate accepted/closed hand-origin refinement remain unchanged for their original lost assets.

Project lesson: separate outer-body design and support geometry from an acceptable attack contour so a silhouette correction can preserve accepted motion. Denser samples of the same cycle reduce foot stepping without expanding the pipeline, but numerical stance checks cannot establish natural acting. No shared-standard amendment is proposed.
