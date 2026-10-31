# Authored Shadow resting geometry — bounded attack integration

Continuation baseline: `89cf4a4a03f3e42b518ce9184c8ed4a27ad287ed`. AICP 1.2.1 and the existing UGDS 1.0.0 pin remain applicable. Owner approved the new resting concept and explicitly directed use of ChatGPT-authored `art/character-experiment/reference/shadow-rest-candidate.svg`. The reference README distinguishes the approved concept image from its editable SVG interpretation. Only the SVG is present here; no pixel-exact comparison to the separate concept image is claimed.

## Concrete source adoption

The first and final resting keyframes use the candidate's exact `d` path in its original 512×256 canvas. The reference file remains unchanged. No independent replacement resting silhouette, nonuniform scaling, origin bulge, arm, dent or spike is added to rest. The ground baseline is y=232 and pivot (256,232); world scale remains 0.55. The wider body is the candidate's actual geometry, not an animation-created rest envelope.

The established full-extension attack path is translated (+160, −8) into the wider canvas; the pivot moves by the same amount, preserving the original pose and maximum reach relative to the actor origin. The attack still uses 12 samples, the original extension schedule, and 220 ms total. Intermediate body contours connect the candidate to that established attack through matching cubic Bézier segments. Candidate segments are subdivided exactly with De Casteljau; only the in-between contours are blended. There is no crossfade, overlaid weapon or detached appendage.

The guard is now explicitly owner-accepted; all 24 SVGs, PNGs, manifest entries, timing, alignment and world scale remain unchanged against the continuation baseline. Gameplay, collision geometry, attack reach/cooldown rules and original runtime assets are not edited or integrated.

## Current evidence status

Initial reference/preservation checks pass, and full before/after resting comparisons and every attack pose are available in `evidence/shadow-rest-integration/`. Final playback and repeatability evidence are being completed. This is an implementation checkpoint, not visual acceptance.

The existing standalone preview is retained, with centered art to fit the authored resting width at both facings and inspection zoom. No new animation category, environment, game mechanic, engine adapter, release or paid service is introduced. Stop after evidence delivery for owner review.
