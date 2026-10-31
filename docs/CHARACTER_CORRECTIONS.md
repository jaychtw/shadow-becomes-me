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

Fresh evidence and verification results are being finalized in `evidence/character-corrections/`. The original experiment evidence remains intact at `evidence/character-experiment/`. No gameplay, collision, hitbox, attack/cooldown timing, original runtime artwork, dependency pins or build-script changes. No environment production, paid tools, merge or deployment.
