# Limited character motion experiment

Original replacement drawings, not recovered or accepted production assets. Owner-authorized experiment only; engine and game artwork are untouched.

- `source/`: 12 individually editable Shadow spike SVGs and 12 guard walk SVGs.
- `frames/`: matching transparent PNG exports.
- `manifest.json`: dimensions, pivots, duration, facing, stance landmarks and source/PNG SHA-256.
- Source generator: `../../scripts/character-experiment/draw.py`; editable vector path control points, costume details and gait landmarks.
- Standalone preview: `../../character-study/index.html`, served through HTTP; not included in the production build.
- Review/verification: `../../docs/CHARACTER_EXPERIMENT.md`.

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
