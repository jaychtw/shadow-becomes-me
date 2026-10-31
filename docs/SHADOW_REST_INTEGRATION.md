# Authored Shadow resting geometry — bounded attack integration

Continuation baseline: `89cf4a4a03f3e42b518ce9184c8ed4a27ad287ed`. AICP 1.2.1 and the existing UGDS 1.0.0 pin remain applicable. Owner approved the new resting concept and explicitly directed use of ChatGPT-authored `art/character-experiment/reference/shadow-rest-candidate.svg`. The reference README distinguishes the approved concept image from its editable SVG interpretation. Only the SVG is present here; no pixel-exact comparison to the separate concept image is claimed.

## Concrete source adoption

The first and final resting keyframes use the candidate's exact `d` path in its original 512×256 canvas. The reference file remains unchanged. No independent replacement resting silhouette, nonuniform scaling, origin bulge, arm, dent or spike is added to rest. The ground baseline is y=232 and pivot (256,232); world scale remains 0.55. The wider body is the candidate's actual geometry, not an animation-created rest envelope.

The established full-extension attack path is translated (+160, −8) into the wider canvas; the pivot moves by the same amount, preserving the original pose and maximum reach relative to the actor origin. The attack still uses 12 samples, the original extension schedule, and 220 ms total. Intermediate body contours connect the candidate to that established attack through matching cubic Bézier segments. Candidate segments are subdivided exactly with De Casteljau; only the in-between contours are blended. There is no crossfade, overlaid weapon or detached appendage.

The guard is now explicitly owner-accepted; all 24 SVGs, PNGs, manifest entries, timing, alignment and world scale remain unchanged against the continuation baseline. Gameplay, collision geometry, attack reach/cooldown rules and original runtime assets are not edited or integrated.

## Current evidence status

Reference/preservation, repeatability and playback checks pass. Full before/after comparisons and final playback are in `evidence/shadow-rest-integration/`. The integrated motion is ready for owner visual review, not accepted production artwork.

The existing standalone preview is retained, with centered art to fit the authored resting width at both facings and inspection zoom. No new animation category, environment, game mechanic, engine adapter, release or paid service is introduced. Stop after evidence delivery for owner review.


## Before/after comparisons and playback

- [Rest comparison](../evidence/shadow-rest-integration/rest-before-after.png): previous resting frame, original candidate raster, adopted first/return pose. All share the same source/world scale and aligned level ground; the older image is translated into the new canvas, not stretched.
- [Attack before/after](../evidence/shadow-rest-integration/attack-before-after.png): matching old/new samples at frames 0, 3, 5, 9 and 11; both rows use the same 0.5× spatial reduction. [Every current attack pose](../evidence/shadow-rest-integration/shadow-attack-contact-sheet.png).
- Desktop: [GIF](../evidence/shadow-rest-integration/study-1440.gif), [original WebM](../evidence/shadow-rest-integration/study-1440.webm), [rest screenshot](../evidence/shadow-rest-integration/study-1440-en-rest.png), [attack screenshot](../evidence/shadow-rest-integration/study-1440-en.png).
- Phone scale: [GIF](../evidence/shadow-rest-integration/study-390.gif), [original WebM](../evidence/shadow-rest-integration/study-390.webm), [rest screenshot, zh-TW](../evidence/shadow-rest-integration/study-390-zh-TW-rest.png), [attack screenshot, zh-TW](../evidence/shadow-rest-integration/study-390-zh-TW.png).

Recordings are actual Chromium CDP screencasts with original timestamp intervals, encoded locally by FFmpeg. They show normal speed, half-speed right/left review and normal-speed left playback; both stay at 1× spatial scale. Phone recording scrolls both motion panels into view. GIFs are full-resolution 25 fps derivatives; brief 10–20 ms attack poses may be omitted by video/GIF sampling, so inspect original transparent frames or use preview stepping. No generated animation substitutes for the recordings. Comparison/contact sheets are explicitly labeled static pose evidence.

## Fresh checks

| Command / verification | Outcome |
| --- | --- |
| `python3 scripts/character-experiment/draw.py` | Uses the concrete reference SVG; first/final path is exact, intermediate curves use exact subdivisions of it. 12 Shadow + 24 unchanged guard frames. |
| `node scripts/character-experiment/export.mjs` (repeat) | All 36 PNG hashes and the complete manifest identical across two local exports; candidate raster emitted for direct comparison. |
| `python3 scripts/character-experiment/verify.py` | 361 asset assertions passed, zero failed: alpha, pure black, one connected closed contour, no canvas clipping/below-ground pixels, flat support; exact candidate first/last source and PNG pixels; exact translated full-extension attack geometry; original extension/timing schedule; every guard SVG, PNG and manifest entry byte-identical to `89cf4a4`. |
| `node scripts/character-experiment/browser.mjs` | 14 browser cases passed, zero failed at 1440px desktop / 390px touch-emulated phone. Both locales, every frame, differing scrub counts, playback/step/facing/zoom/SVG controls, reduced-motion pause, keyboard focus, overflow, actual recording; first/returned rest canvas pixels are identical at both widths. |
| Axe in browser run | Four audits, zero violations. Incomplete findings preserved separately; no screen-reader or human usability certification implied. |
| `npm test` | 18 actual engine unit tests passed; zero failed/skipped. |
| `npm run build` | Passed; existing seven-file production artifact still excludes the study. |
| Diff against `89cf4a4` | Empty for engine, collision/rule/scene data, game tests, original runtime art, root HTML/CSS, package/lockfile and production build/packaging scripts. Reference directory and every accepted guard source/export also unchanged. |

[Asset results](../evidence/shadow-rest-integration/asset-checks.json), [browser report](../evidence/shadow-rest-integration/browser-results.json), [repeat exports](../evidence/shadow-rest-integration/repeatability.json), [unit results](../evidence/shadow-rest-integration/unit-results.txt), [build results](../evidence/shadow-rest-integration/build-results.txt), [provenance](../evidence/shadow-rest-integration/provenance.json), [checksums](../evidence/shadow-rest-integration/SHA256SUMS). Toolchain unchanged: Node 24.19.0, Playwright 1.56.1, system Chromium 154.0.8037.57, Python/Pillow, installed FFmpeg. Repeat raster identity is demonstrated with this installed toolchain, not across arbitrary renderer versions.

## What is preserved and what changed

Preserved: guard animation in full; attack action/duration/extension schedule, forward origin and full-extension pose relative to pivot; world scale, gameplay attack reach/cooldown, collisions and all game rules. The candidate path itself is unchanged. Historical accepted milestones remain separate.

Changed: the previously visible stub at rest is gone because resting frames now contain only the authored candidate path. The attack's **intermediate body and blade contours** are necessarily adapted to emerge from that much wider shape. They are not claimed pixel-identical to the old frames. At maximum extension, geometry is the previous accepted endpoint under the pivot-equivalent translation; gameplay reach is unchanged. There is no anticipatory bulge in the rest keyframe or review-rest interval, and the return pose is exactly the starting candidate.

## Visual review and limits

The before/after sheets, all 12 current Shadow poses, desktop/phone screenshots and samples extracted from the actual recordings were inspected. The current resting silhouette matches the supplied SVG and has no visible origin cue. The connected appendage develops only during attack, then retracts into the identical rest. The flat edge stays on level ground throughout. The prior accepted guard is deliberately unchanged.

The wide candidate compresses substantially into the narrow established attack pose and expands on return within 220 ms. That motion/volume change is visible and needs owner judgment; pixel equality does not establish its naturalness. Small transient angular contours can be seen while stepping intermediate attack frames. No production-fidelity claim is made against the separately approved concept image, which is not included in the checkpoint; the source README's distinction between concept approval and SVG interpretation is preserved.

Physical phones, Safari/Firefox, screen readers, independent visual acceptance and in-game integration remain unverified. This is an isolated art preview; the full older gameplay browser suite was not rerun because gameplay/runtime files were not changed. Rest geometry is demonstrated on level ground only; no terrain adaptation was introduced. No extra motion set, environment, gameplay feature or full production phase is authorized or begun.

## Preservation and acceptance gate

The source integration checkpoint was committed and pushed before final recording/report delivery. Final evidence is committed and safely pushed to `dev/recovery-art-pipeline`, then fetched back for remote SHA verification before completion reporting. No force-push, settings change, Actions workflow, merge, deployment, publication or paid service. Prior owner-verified Pages/Actions settings still provide the configuration evidence; no deployment integration is added. Incremental paid-service expenditure: $0.

Stop here for visual acceptance of this integrated motion. Approval of the resting concept, preserved guard acceptance, technical verification and acceptance of the complete rest-to-attack transition remain distinct. No further animation or integration follows automatically.

Project lesson: a concrete editable rest keyframe eliminates ambiguity about the silhouette. Comparing source paths and rendered endpoints separately from transition poses preserves that decision while exposing motion-quality risks. No shared-standard amendment is proposed.
