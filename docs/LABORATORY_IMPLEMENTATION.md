# Playable laboratory integration

Authorized by owner decision `2ce17dedf35f921fac0ecca81bceddede3fadd57`. Implementation in progress; complete POC awaits review.

Renderer-only reach proposal implemented for review: use the unchanged Shadow source at uniform scale 105/243 = 0.4320987654, with pivot (256,232). Peak tip is exactly 105 world units from actor origin, versus 133.65 at the preview's 0.55. Rest shape is uniformly scaled, not redrawn. The keyframe's 0.42 illustration is ~2.9% smaller than this mapping. Guard scale remains 0.55. Engine range, immediate damage, cooldown and spike time remain untouched. The visible peak still follows damage: immediate guard defeat can precede visual contact. No delayed damage or mass-conservation system is introduced. Owner acceptance of this mapping/contact treatment remains open.

Guard walk source/exports are preserved; phase follows actual distance, freezing under pause/stagger. The existing simple defeated presentation and low blob/box/chair forms are retained, not new animation sets. Attack presentation overrides the form temporarily and returns to the engine's current form. Assets preload/decode before entry, with no per-frame asset generation.
