# Solid cocoon — alpha-mask visual study

**Status: editable authoring candidate for owner visual review. Not approved runtime effect.**

- [Solid cocoon alpha-mask study](solid-cocoon-alpha-mask-study.svg) is a four-panel 1536×420 vector source. Each panel has a distinct SVG `<mask>` over a neutral abstract capsule to illustrate progressive visibility loss, not the depiction of an attack or a person.
- [Solid cocoon silhouette](hollow-envelope-study.svg) remains the four-pose black transformation study; its former hollow opening was removed on owner feedback. Despite the legacy filename, the active artwork is **solid**.
- The reference demonstrates **both occlusion and alpha loss**, which must be treated separately: the black cocoon covers the neutral sample; the alpha mask makes its remaining visible pixels diminish. In gameplay the engine still owns the enemy's logical defeated state.
- Actual stage shapes and timing need playtest review; panel labels are not animation timestamps. Nothing authorizes a new gameplay rule, or changes attack scheduling, guard sprites, hitboxes or game state.
- For Codex integration after owner acceptance: keep actor-independent masks, do not rely on target width to hide the center, ensure no flash-through on frame transition or after pause/restart, test at desktop/phone sizes, preserve source hashes and create deterministic exports.
- The present SVG is a **concept demonstration**, not the final compositing algorithm; CSS/SVG mask behavior and renderer-layer order must be verified in the actual game and browsers.

This is the asset-first handoff, not an instruction to implement immediately.
