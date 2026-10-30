# Representative visual POC — owner review pending

This is a **mechanics POC with original sample art**, not a production art approval or a claim of reference-level finish. The lab concept and future dialogue screenshot were inspected before implementation. Only the lab image guides this scene. No reference image is used as the gameplay background.

## Actual running-build evidence

| State | Desktop | Touch-emulated phone |
| --- | --- | --- |
| Entry / instructions | [English](../evidence/desktop-intro.png) | [Traditional Chinese](../evidence/mobile-intro-zh.png) |
| Upright black silhouette | [Desktop](../evidence/desktop-upright.png) | [Phone](../evidence/mobile-upright-zh.png) |
| Sliding blob | [Desktop moving](../evidence/desktop-sliding.png) | Covered by held-touch playthrough |
| Fitting box / guard patrol | [Desktop](../evidence/desktop-fitting.png) | [Phone](../evidence/mobile-fitting-zh.png) |
| Unfitting chair / investigation | [Desktop](../evidence/desktop-investigation.png) | [Phone](../evidence/mobile-investigation-zh.png) |
| Same spike / stealth takedown | [Desktop](../evidence/desktop-spike.png) | [Phone](../evidence/mobile-spike-zh.png) |
| Hostility after ordinary damage | [Desktop](../evidence/desktop-hostile.png) | [Phone](../evidence/mobile-hostile-zh.png) |
| Failure / retry | [Desktop](../evidence/desktop-failure.png) | [Phone](../evidence/mobile-failure-zh.png) |
| Exit / completion | [Desktop](../evidence/desktop-success.png) | [Phone](../evidence/mobile-success-zh.png) |

These are Chromium screenshots captured through real keyboard or touch interactions, not mockups. Full-page screenshots may exceed the viewport height; scrolling is deliberate outside the playfield, while held touch does not scroll the page. Desktop width 1440; phone width 390. Additional final rendered-layout screenshots cover 320/390/768/1440 in both locales.

## Comparison against the approved concept

Reference: [approved laboratory concept](../art/approved_laboratory_concept.png).

| Aspect | Observed sample | Difference / review question |
| --- | --- | --- |
| Light and palette | Pale teal architecture, yellow-white hanging lights, dark ceiling/floor, cyan window depth | Vector light cones have sharper edges and less atmospheric blending than the reference. Palette direction is followed; finish is less painterly. |
| Composition and layers | Pipes and structural beams; distant silhouettes behind windows; work surfaces, servers and painted props; live actors on one floor | The concept has dramatic two-storey architecture, stairs, containment tank, foreground railings and more silhouettes. This POC uses the authorized single corridor and no traversal powers; it has less spatial richness. |
| Humans | Original blue-uniform guard, warm skin, dark trousers; patrol orientation and reaction glyphs | One guard, minimal pose animation. No scientists, dialogue or portraits. More detailed guard motion requires a later bounded polish task. |
| Shadow | Featureless opaque black head/shoulders/draped upright shape, low sliding blob, box/chair silhouettes, geometric spike | Deliberately differs from concept's crawling/tendril character per authoritative GDD override. Morphing uses short vector-path transitions, disabled for reduced motion; not a hand-animated deformation sequence. |
| Camouflage inference | Six illustrated crates and two chairs; eligible forms box/chair; camera reveals scenery during movement | Majority is authored in art, never computed. Single-screen phone crops show only part of the corridor; players can observe while sliding. No normal-play fitting-answer marker. |
| Readability and geometry | Continuous visible floor, painted noncolliding distant props, live guard and pure black Shadow, directional sight cue | No stairs, jumps, ladders or raised platforms. Guard cone is a readable direction/range cue, not a pixel-perfect collision boundary. Detection itself is horizontal position, facing and occluder data. |
| Mobile | Camera follows player; controls stay below scene, 44px+ targets; portrait fully playable | Phone shows a narrower portion of the world and smaller actors. Physical-device readability is unverified. |
| Originality | All runtime illustration and actor paths are newly authored vector geometry | No concept pixels, proprietary dialogue art, screenshot UI or external assets in build. |

## Fidelity escalation and next gate

The sample demonstrates the intended contrast and mechanics, but **does not claim the approved reference's painterly richness or final animation quality**. This gap is visible in the linked running screenshots. No wholesale simpler visual direction has been approved.

Before expanding art production, owner review should choose the next bounded refinement: (1) refine the original vector scene with more depth, softer lighting and character poses, or (2) request an original raster-layer sample within the same $0/no-service constraints for closer painterly treatment. Either requires reviewing the resulting sample; neither is silently adopted here. The current SVG assets remain usable mechanics-test assets and do not commit the final art pipeline.

**Owner visual-direction approval: Not Verified / pending.** No physical-device review or independent first-time player has approved this sample. No campaign, additional scenes, paid art or service activation was undertaken.
