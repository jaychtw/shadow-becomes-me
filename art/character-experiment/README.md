# Reference-led character motion experiment

Current Shadow rest is the exact path from [the authored candidate](reference/shadow-rest-candidate.svg). Its handoff [README](reference/README.md) distinguishes the approved concept image from the editable SVG interpretation. New motion integration awaits owner visual acceptance. Guard walk is owner-accepted and preserved byte-for-byte.

- `source/`: 12 editable Shadow rest/attack/return SVGs and 24 unchanged guard walk SVGs.
- `frames/`: corresponding transparent PNG exports.
- `manifest.json`: per-frame canvas/pivot, timing, source/PNG SHA-256; separate motion baselines and exact rest-reference provenance.
- [Source generator](../../scripts/character-experiment/draw.py): reads the candidate geometry directly, morphs matching Bézier segments to the existing attack, retains the guard generator.
- [Standalone preview](../../character-study/index.html): serve via HTTP; excluded from the production build.
- [Current report and evidence](../../docs/SHADOW_REST_INTEGRATION.md). [Prior correction report](../../docs/CHARACTER_CORRECTIONS.md) and [original experiment](../../docs/CHARACTER_EXPERIMENT.md) remain historical.

## Alignment and timing

| Motion | Canvas | Pivot / ground | Timing |
| --- | --- | --- | --- |
| Shadow | 512×256 | (256,232), baseline 232 | 12 samples, 220 ms total; preview repeats with 700 ms review rest |
| Guard | 192×256 | (96,240), baseline 240 | 24 × 50 ms = 1,200 ms loop, unchanged |

World scale remains 0.55. Mirror each image around its own pivot. The candidate is used at its exact original dimensions, without silhouette redesign or nonuniform scaling. Initial and final resting paths and exported pixels are identical to the reference candidate. The previous attack canvas/pivot was 384×256 / (96,240); translating its full-extension path by (+160,−8), equal to the pivot change, preserves reach relative to the actor origin. Intermediate contours are adapted to connect the new rest; they are not claimed pixel-identical to the old attack frames. There is no opacity fade or separate weapon layer.

The existing guard's source, PNGs, manifest entries, 58-world-unit/s nominal stance speed and gait timing are unchanged. Its remaining sampled-motion/heel-roll limitations are not reopened or revised here. No gameplay adapter, collision change, extra animation or environmental art is included.

## Free local recipe

From the repository root, with locked npm packages, Python/Pillow, system Chromium and FFmpeg:

```
mkdir -p evidence/shadow-rest-integration
python3 scripts/character-experiment/draw.py
node scripts/character-experiment/export.mjs
python3 scripts/character-experiment/verify.py
python3 -m http.server 8081 --bind 127.0.0.1
# In another terminal:
node scripts/character-experiment/browser.mjs
```

Use existing checkouts in isolated cloud tasks; do not create a Git worktree unless requested. Chromium defaults to `/usr/bin/chromium` (override `CHROMIUM_PATH` if needed). The exporter writes the candidate-reference raster for exact rest/end tests. The verifier needs baseline commit `89cf4a4` in local Git history and separately checks every accepted guard asset against it. Browser results, captures and metadata go to `evidence/shadow-rest-integration/`, preserving prior evidence folders.

Running `draw.py` replaces generated SVGs. Preserve any manual edits before regeneration or record them in the generator's control-point mapping. The reference SVG itself is read, never overwritten. No paid generation, remote service, Blender or reference-sheet cropping is used. Production acceptance and comparison to the separately approved concept image are not claimed.
