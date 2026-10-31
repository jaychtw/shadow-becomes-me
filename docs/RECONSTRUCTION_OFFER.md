# Character-art reconstruction Offer — awaiting owner commitment

Date: 2026-10-31 (Asia/Taipei). AICP 1.2.0 Offer stage. **No art reconstruction executed or authorized by this document.**

## Decision and constraints

Recover a credible character-animation capability from the surviving POC and original references without pretending the accepted lost assets have returned. Keep the engine, gameplay timings and hitboxes, character identity, pure black silhouette, forward arm/hand spike origin, bilingual inputs and $0 incremental-cost ceiling. Existing historical approvals remain valid for their original assets only.

| Option | Effort (planning estimate, not commitment) | Fidelity / technical risk | Reproducibility / recovery conflict |
| --- | --- | --- | --- |
| Wait for Support | Minimal engineering; calendar duration unknown | Best chance of exact accepted assets; no guarantee of recovery | No duplicated art; current source remains usable, missing pipeline unproven |
| Reconstruct full character capability | Several focused iterations; estimate only after a micro-spike | Highest duplicated effort and uncertain illustrated fidelity; human gait, alignment and integration can fail | Editable masters + deterministic export possible; substantial reconciliation if original returns |
| Limited hybrid — recommended | One bounded micro-spike, provisional 4–8 engineering hours; stop at evidence gate | Tests hardest contour/gait risks before producing a full set; may still fall short of 80/100 reference expectation | Independent experimental folder/commit; keep engine and original-asset namespace untouched; easy comparison or retirement |

The original 55 frames are historical, not a replacement quota. We cannot promise the missing accepted artwork's quality from text or automated checks. No paid tool, image-generation service or Blender is proposed.

## Smallest informative experiment proposed

After explicit commitment only, create an isolated character preview: a short continuous forward-arm/hand spike extension/retraction plus one guard step cycle. Use original editable vector drawings and transparent PNG exports via an available local, free rasterization path; inspect tool availability and export determinism before committing to a full pipeline. Begin with a few key poses and add only enough in-betweens to evaluate continuity and weight transfer; document the chosen frame count. Do not crop the supplied sheets. Do not simplify the visual goal silently to generic procedural shapes.

If these difficult motions pass the owner gate, propose a separate bounded follow-up for full idle/slide loops and optional gameplay integration. The micro-spike alone does not claim to restore all formerly accepted capability. No laboratory/environment work is included.

## Proposed deliverables and evidence

- Separately named editable source assets and transparent frames with fixed canvas, baseline, pivot, facing, duration and export manifest; reproducible export instructions and hashes.
- Standalone, local-only preview with pause, frame-step, speed and both-facing inspection; show 1440px desktop and 390px emulated-mobile gameplay-scale playback.
- Actual playback recordings/screenshots and clear comparison against approved sheets. Inspect every spike frame for a continuous black contour, forward hand/arm origin and absence of pelvic emergence, floating shards, clipping or jitter. Inspect guard contact/passing/weight transfer, uniform consistency and foot sliding.
- Verify clean alpha, dimensions, baseline/pivot, duration and repeatable exports; keep normal 0.22-second attack visibility, 0.7-second cooldown and engine hit behavior unchanged if a later integration is approved. Source of timing is `src/scene.js` / `src/engine.js`, not asset pixel bounds.
- Run relevant unchanged unit/browser checks if integration occurs. Automated success never establishes artistic acceptance. Physical-phone and independent player review stay explicitly unverified unless performed.

## Stopping conditions and owner gate

Stop after one representative motion pair and evidence report. Stop earlier and counteroffer if free tools cannot generate reproducible exports, continuity/gait cannot approach approved references within the bound, paid access appears necessary, or gameplay timing must change. No full frame set, gameplay adapter, environment layers or production rollout may follow by inference.

Owner decides whether to wait, approve this limited hybrid experiment, or request a revised Offer. Commitment must specify scope/time bound and accept the evidence criteria above. Subsequent acceptance must separately assess silhouette/hand origin, motion/gait, game-scale readability and illustrated fidelity. Replacements need fresh approval; a score is not a waiver of mandatory defects. Merge, deployment, publication and further production require separate authority.
