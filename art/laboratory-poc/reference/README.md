# Laboratory POC — authored scene review candidate

**Status: candidate for owner visual review, NOT approved production art or integration authorization.**

Created as the advisory AI's concrete artifact-first response to [the Codex laboratory POC Offer](../../../docs/LABORATORY_POC_OFFER.md). This is a new, original, editable SVG illustration. It incorporates the repository's muted teal architecture, warmer laboratory lights, the actual accepted guard-walk frame 00 SVG geometry, and the current ChatGPT-authored resting Shadow contour. It is **not** the lost historical laboratory scene, nor a pixel-exact derivation of the owner's original approved laboratory concept. The original binary concept could not be directly rendered for side-by-side inspection in this handoff environment; fidelity to that artwork remains explicitly **unverified**.

## Files and review gates

- [lab-keyframe.svg](lab-keyframe.svg): editable 1680×640 world-space composition; baseline y=500. This is the **source** master, not a flattened mockup. Its named groups separate environment from illustrative character references.
- [layout.json](layout.json): world coordinates, source actor references, eligible boxes/chairs, camera review windows, exclusions and palette.
- [layout-board.svg](layout-board.svg): annotated world-coordinate review diagram showing both crop windows, patrol limits, spawn and exit.
- No PNG raster export or standalone phone/desktop crop screenshot is claimed yet. The SVG is the reviewable master; deterministic PNG export and actual camera crops should be produced after visual direction is accepted, without losing the editable layers.

## Scene contract

- Dimensions **1680×640**; flat playable floor at **y=500**. Character image reference group contains Shadow at world x=125, guard at x=900; exit threshold x=1550. Guard patrol 640–1240.
- Six painted eligible **boxes**, two painted eligible **chairs**. The fitting form remains **box**. Scene props are illustration, not interactive objects or runtime pixel recognition. Validate readability at actual play scale before declaring the clue satisfactory.
- Existing game collision, camouflage, detection and camera remain authoritative. The keyframe is not a replacement ruleset; graphics must adapt to mechanics unless the owner explicitly revises the game.
- Editable layer groups (SVG IDs): `distant-background`, `architecture`, `illumination`, `architectural-details`, `floor`, `background-props`, `reference-characters`, `foreground`.
- **Do not export** `reference-characters` into environment runtime layers: game renderer must draw actors using their separate accepted sprite sources. Illumination is decorative; foreground must not hide the actor, spike contact, or exit.
- The perspective is side-on/orthographic; distant windows and props provide apparent depth without changing collision or navigation. There are no decorative stairs suggesting playable vertical traversal.
- The keyframe embeds approved guard frame 00 sourced from `art/character-experiment/source/guard-walk-00.svg`. It uses the authored smooth resting SVG contour but an illustrative keyframe-specific scale of 0.42, **not an approved attack/contact transform**.
- Palette: muted teal/slate `#293f50`, `#84b8b8`, `#dae4d9` with warm prop/light tones `#f5deb4`, `#172937`. Native SVG gradients and vector paths are editable; no externally loaded fonts, copyrighted art or raster sources.

## Critical unresolved questions — before implementation

1. **Visual acceptance:** Owner judges whether the scene reaches the approved laboratory concept's illustrated finish and atmospheric depth. It may need artistic revision; passing SVG validity or having named layers is not evidence of aesthetic equivalence.
2. **Gameplay-scale crops:** The desktop/phone windows in `layout.json` are explicit *inspection candidates*; they are not screenshots or a substitute for the game's camera. Confirm the six-box/two-chair inference during play.
3. **Contact mapping:** Existing attack sprite peaks ~134 world units from its preview pivot while engine reach is 105; damage currently resolves on input. No hitboxes, damage timing or attack scale have been altered. The owner must approve a renderer-only contact/scale solution or return to Offer.
4. **Asset incompleteness:** The existing sprite pack contains guard walk and Shadow rest/attack, not full slide/hurt/death sequences. The existing POC's remaining presentation states require separate explicit visual review, not silently newly commissioned animations.

No engine code, animations or scene integration are modified by these reference assets. No merge, deployment, paid service or publication is authorized.
