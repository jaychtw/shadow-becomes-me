# Limited character reconstruction experiment

**Historical baseline report.** Owner subsequently judged technical feasibility successful and requested localized design corrections. See [current correction report](CHARACTER_CORRECTIONS.md); this document and its evidence describe `cdfd8cf`, not the revised artwork.

Status: bounded experiment technically verified; awaiting owner visual review. No production-art acceptance is claimed.

Authorized by the owner on 2026-10-31 (Asia/Taipei), limited to the accepted Offer's hand-origin spike and guard-walk micro-spike. This is new replacement work; historical acceptance of `f870b40` (80/100) and separate closure of `13eba8b` remain unchanged and do not approve these drawings.

Current AICP 1.2.1 is pinned at `b8b9de0d4faaf666fb53cec83ff8516bccf5bd5b`; UGDS 1.0.0 remains pinned at `374143e614ed9d95bf2c413fb13711e802f2133c`. No source from the missing commits was recovered.

## Implementation boundary

24 original editable SVGs and transparent PNGs: 12 continuous-contour Shadow attack frames and 12 uniformed guard walk frames. [Sources, manifest and recipe](../art/character-experiment/README.md). [Standalone preview](../character-study/index.html) runs locally through HTTP; GitHub source links do not execute it. It is deliberately excluded from the normal production build. No gameplay adapter or engine integration is provided.

The spike is part of one closed black outer contour rooted at the forward arm/hand; no separate blade object or pelvic-origin extension. Guard motion uses alternating support/swing feet, articulated knee poses, a small hip-height variation and opposing arm swing. All source drawings are editable independently; a Python generator records original control points and costume details. Approved sheets guide style, not crops or production-source recovery.

Exact gameplay source, original runtime art, hitboxes, metadata, tuning and rules remain unchanged. The attack presentation is 220 ms, preserving the existing visual interval; the existing 700 ms cooldown is not changed. The standalone preview inserts a 700 ms rest for review, making its loop 920 ms; this is not a game attack scheduler.

No merge, deployment, publication, environment production or paid tools were used. Execution stops at this experiment and awaits owner visual review.


## Review media

These captures show the actual isolated browser preview, not missing-workspace media or synthesized playback:

- Desktop: [GIF](../evidence/character-experiment/study-1440.gif), [original WebM](../evidence/character-experiment/study-1440.webm), [EN screenshot](../evidence/character-experiment/study-1440-en.png), [zh-TW screenshot](../evidence/character-experiment/study-1440-zh-TW.png).
- Phone-scale: [GIF](../evidence/character-experiment/study-390.gif), [original WebM](../evidence/character-experiment/study-390.webm), [EN screenshot](../evidence/character-experiment/study-390-en.png), [zh-TW screenshot](../evidence/character-experiment/study-390-zh-TW.png).
- Every exported pose: [Shadow contact sheet](../evidence/character-experiment/shadow-spike-contact-sheet.png), [guard contact sheet](../evidence/character-experiment/guard-walk-contact-sheet.png).

Recordings begin at 1×, then inspect 0.5× facing right, 0.5× facing left, and end at 1× facing left. Both remain at 1× spatial scale. The phone recording scrolls the two motion panels into view so both actors are visible. GIFs are 15 fps derivatives of the original full-resolution WebMs; use WebMs, source frames and the preview for attack-frame inspection. JPEG screencast and GIF palette encoding are lossy; transparent PNGs/SVGs are the authoritative frame assets.

## Fresh verification

| Command / check | Actual result |
| --- | --- |
| `python3 scripts/character-experiment/draw.py` | Generated 24 original editable SVG frames and a timing/alignment manifest. No reference cropping. |
| `node scripts/character-experiment/export.mjs` | 24 transparent PNGs via local Chromium; SHA-256 for each source/export. A second full export matched all 24 hashes and the complete manifest. |
| `python3 scripts/character-experiment/verify.py` | 203 passed checks; zero failures. Dimensions, checksums, alpha/padding, one connected opaque silhouette per frame, pure-black Shadow, one closed Shadow path, opaque hand root, no extension in the pelvis band, timing sums, alternating supports, swing lift and sampled stance velocity. These are asset properties, not 203 independent gameplay tests. |
| `node scripts/character-experiment/browser.mjs` | 12 passed cases, zero failures; 1440px desktop / 390px touch-emulated mobile. All 24 frames inspectable, frame wrapping, playback, facing, SVG/PNG and zoom controls, localization, reduced-motion initial pause, overflow, keyboard focus, actual recording. |
| Embedded axe 4.10.2 integration | Four audits, zero violations; EN and zh-TW at both widths. Incomplete checks remain recorded separately. No screen-reader certification implied. |
| `npm test` | 18 actual engine unit tests passed; zero failed/skipped. |
| `npm run build` | Passed. Original game build remains seven files, excludes the character experiment. |
| `git diff 89b358c -- src tests scripts/build.js scripts/artifact.py package.json package-lock.json index.html style.css art/laboratory.svg` | Empty: engine, rules, timing, hitboxes, original art, game tests, dependency pins and production build scripts unchanged. |

Evidence: [asset checks](../evidence/character-experiment/asset-checks.json), [repeat export](../evidence/character-experiment/repeatability.json), [browser report](../evidence/character-experiment/browser-results.json), [unit results](../evidence/character-experiment/unit-results.txt), [build results](../evidence/character-experiment/build-results.txt), [recording metadata](../evidence/character-experiment/recording-390.json). Node 24.19.0, Python 3 with installed Pillow, Playwright 1.56.1 using its nested core 1.56.1, system Chromium 154.0.8037.57, installed FFmpeg. Locked axe peer core is separately 1.64.1; no package/lockfile changes were made.

The first recording attempt stopped because Playwright's bundled FFmpeg was absent. The final recorder uses actual Chromium CDP screencast frames with original timestamps, encoded by installed system FFmpeg; there was no download, binary substitution, TLS bypass or paid service. Failed-attempt empty outputs were excluded. Export repeatability is verified for this installed browser/toolchain, not across arbitrary rasterizers.

The complete older gameplay browser suite was not rerun in this experiment: it was run during recovery and its source/renderer/runtime inputs are unchanged; this run adds no game integration. Fresh preview tests and engine tests above are distinct from that previous run and from missing historical art-pipeline reports.

## Visual assessment and remaining limitations

Every Shadow pose has been inspected in the contact sheet and full extension at desktop/phone scale. The contour visibly connects chest-level forearm and hand to the blade; no separate weapon or pelvic-origin spike was observed. Its projection changes continuously across authored poses, but 220 ms is fast; use half speed or stepping for judgment. No full idle/slide reconstruction is provided. The standing drape and head are simpler and more regular than the approved expressive silhouette references. No new numeric visual score is assigned.

Every guard pose has been inspected in the contact sheet and samples extracted from actual recorded playback. Foot supports alternate, the swing foot lifts, knees articulate, arms counter-swing and hips bob by five source pixels. Sampled stance displacement matches 58 world units/s at 0.55 world scale. This demonstrates a controllable gait mechanism, not proof of natural weight transfer: foot shapes have limited heel/toe roll, lateral/torso weight shift is minimal, and held 100 ms frames cause subframe foot stepping against continuously scrolling ground. Uniform detailing is original but cleaner/flatter than the approved illustrated sheets; proportions and motion need owner judgment. These are consequential limits, not silently accepted style changes.

The neutral preview uses the POC actor-height scale: exports at 0.55 world units/pixel, then a world-to-screen ratio per panel (640-world-unit desktop inspection span, 840 at phone width). Actors are approximately 100–110px high on desktop and 48px high on phone at 1×; 2× is explicitly labeled inspection enlargement. This is representative game-scale evidence, not integration into the original scene. Physical phones, Safari/Firefox, independent observers, production-scale performance, full frame set and gameplay integration remain unverified. Reduced-motion preference starts playback paused; explicit user playback remains available.

## Delivery, owner gate and retrospective

Commitment/adoption and source/preview checkpoints were pushed separately under AICP 1.2.1; final evidence is committed and remote SHA verified before completion reporting. No Actions workflows or deployment integrations are added. Owner-confirmed Pages/Actions safety from the preceding checkpoint remains the settings evidence; settings were not changed. Existing original acceptances remain separate and untouched.

Owner review should accept, reject or request a localized revision to **this** two-motion experiment, specifically judging arm/hand origin and continuity, gait/weight transfer, game-scale readability and closeness to reference style. Do not infer authorization for idle/slide sets, game integration or environment production from technical success. No further execution is started after this report. Incremental paid-service spend: $0.

Observed project lesson: editable master paths plus a per-frame timing/landmark manifest make continuity and stance-speed errors inspectable before engine integration. Pixel/landmark checks cannot evaluate acting or artistic fidelity; retain human review as a separate gate. No shared-standard change is proposed.
