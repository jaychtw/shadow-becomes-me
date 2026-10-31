# Limited character motion experiment

Original replacement drawings, not recovered or accepted production assets. Owner-authorized experiment only; engine and game artwork are untouched.

- `source/`: 12 individually editable Shadow spike SVGs and 24 guard walk SVGs.
- `frames/`: matching transparent PNG exports.
- `manifest.json`: dimensions, pivots, duration, facing, stance landmarks and source/PNG SHA-256.
- Source generator: `../../scripts/character-experiment/draw.py`; editable vector path control points, costume details and gait landmarks.
- Standalone preview: `../../character-study/index.html`, served through HTTP; not included in the production build.
- Current review/verification: `../../docs/SHADOW_REST_INTEGRATION.md`. Previous correction report: `../../docs/CHARACTER_CORRECTIONS.md`. Original experiment report: `../../docs/CHARACTER_EXPERIMENT.md`.

Free local recipe from repository root (existing locked npm packages, Python Pillow, system Chromium and FFmpeg):

```
python3 scripts/character-experiment/draw.py
node scripts/character-experiment/export.mjs
python3 scripts/character-experiment/verify.py
python3 -m http.server 8081 --bind 127.0.0.1
# In another terminal:
node scripts/character-experiment/browser.mjs
```

Use existing checkouts in isolated tasks; do not create Git worktrees unless the owner requests one. Export uses Playwright with `/usr/bin/chromium` (override `CHROMIUM_PATH` if needed). No external image generation, paid service or Blender is involved. Direct edits to SVGs survive export, but running `draw.py` again replaces those SVGs; move changes into generator control points or preserve edited masters before regeneration.

Canvas: Shadow 384×256; guard 192×256. Both pivot at (96, 240), face right and mirror around that pivot. Transparent padding includes attack reach. Scale exports by 0.55 to world units. The Shadow sequence totals 220 ms; the preview inserts 700 ms rest for inspection. Guard loop totals 1,200 ms. A 126.54545-source-pixel travel cycle corresponds to 58 world units/s at 0.55 scale, matching the existing patrol speed without editing it. The preview uses moving ground reference ticks and a stationary root. Frame-held stance still has subframe stepping; it is not continuous skeletal playback.

Source files contain original drawings, not cropped reference sheets. No claims of matching the missing 80/100 accepted baseline or its closed refinement. New owner visual acceptance is required.

## Localized owner corrections

Baseline `cdfd8cfaa8f6e5cdbee84a2344b8a763154c86e5` was technically successful; the owner requested an amorphous Shadow without head/neck or a pointed drapery base, and a more upright, less choppy guard gait. Current sources implement only that revision. Shadow remains one opaque black contour with its original spike control curves, extension schedule and 220 ms timing. Its support edge is a straight segment at source y=240; the preview's ground stroke meets that edge. Level ground is the only supporting surface in this study; no new terrain deformation or physics is implemented.

The existing 1,200 ms guard loop now has 24 × 50 ms samples instead of 12 × 100 ms. Hip height is raised, arm swing reduced, support knees are relatively straight, and swing-foot clearance is 5 source pixels. Stance speed remains 58 world units/s at 0.55 scale; frame-hold travel drops from 5.8 to 2.9 world units per sample. This reduces rather than eliminates stepping/sliding. No new motion category, engine adapter or interpolation pipeline was added.

Fresh validation writes `evidence/character-corrections/` so the previous experiment evidence stays intact. `verify.py` also compares the preserved spike against the baseline Git object, which must be available locally.

## Authored resting geometry continuation

Current rest is read directly from `reference/shadow-rest-candidate.svg`, with that exact path at both first and final attack frames. Shadow canvas/pivot/baseline are now 512×256 / (256,232) / 232; guard stays 192×256 / (96,240) / 240. The manifest records per-motion baselines. The accepted attack endpoint is translated by (+160,−8), equal to the pivot change, retaining its relative reach and timing. Intermediate contours morph from the authored candidate, not the old exposed-arm rest silhouette. Frame count and guard animation are preserved.

Fresh evidence and verifier output now go to `evidence/shadow-rest-integration/`; earlier reports and media remain historical. Create that directory before `export.mjs` if restoring only a source subset; a candidate reference raster is emitted there for exact rest comparison. Baseline Git object `89cf4a4` must be available to the preservation verifier.
