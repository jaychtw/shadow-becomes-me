# Playtest Round 3 — usability polish

Owner confirms Round 2 `ad412b9d69f112a2e45a2e2c6ba3e02b3842fd15` works, including Devour. This bounded cycle implements controls, guard-health and local-build polish on `dev/recovery-art-pipeline`. AICP 1.2.1 / pinned UGDS 1.0.0 unchanged. Delivery is ready for owner playtest, not whole-POC acceptance or release.

## Changes

**Transformation:** C and the mouse/touch **Transform / 變形** button now use normal Shadow → Box → Chair → normal Shadow. Both idle and moving Shadow map to Box on the next input; if movement remains held, the unchanged engine immediately exposes the disguise again. Current form is live text below the scene, the button visibly shows current → next, and its bilingual accessible name states both. Held-key repeat does not skip forms. Direct Box/Chair and 1/2 remain. Q/E keep their original previous/next **disguise-only** (Box/Chair) behavior, expressly documented for compatibility. Pause/help and terminal states do not advance the cycle. The original inconsistency came from C toggling the last selected disguise, while Q/E and direct buttons selected only disguises.

**Guard health:** the original renderer drew three pips whenever the guard was alive. A compact scene bar now appears only while alive and wounded (1–2/3), until defeat/restart. Full-health patrol is uncluttered. Exact health remains continuously available in the bilingual text readout, including 0/3 when down; ? / !, text awareness state and combat feedback are preserved. Scene bar is decorative to assistive technology; the text health announces actual changes. Build-status live text also updates only on change, avoiding per-frame announcements.

**Build/cache:** footer ID, BUILD.json, generated identity module, launch README and ZIP name share **`r3-5c7c6e926759`**. Entire module/image/style graph is under `assets/r3-5c7c6e926759/`, including dynamic sprite URLs and the isolated study. The bundled free Python launcher sends no-store and avoids conditional 304 responses. Check build fetches metadata with no-store and warns when an open tab differs, without resetting play. No service worker, remote dependency, telemetry or new deployment system.

## Cache findings and verification

The prior package used stable unversioned module/image/style URLs, and its recommended generic Python server had Last-Modified handling without an explicit Cache-Control policy. A ZIP filename alone does not version browser requests when reused at the same HTTP address. These were reliability weaknesses. **The owner's exact earlier cache incident has not been independently reproduced; no broken game-logic cache defect is confirmed.** Ordinary caching or an old running server/tab can explain an older revision, but is not proof of a combat defect.

[Five cache checks](../evidence/playtest-round3/cache-results.json) use two actual successive committed packages: `r3-23b5b65e66ea` at `0b6602b3114c113690039bbf4390ce8e88d00d53` → `r3-5c7c6e926759` at `ed2ca26a9fca3fdd45eecab15d542597c1959d23`, one persistent Chromium profile and the same localhost URL/port. The old tab detects the new package and retains its box state; ordinary reload obtains the new ID and only the new document's asset namespace, preserves the saved language and accepts Transform input. New document responses are 200/no-store. Forced old/future conditional validators also return current metadata with 200. [Network trace](../evidence/playtest-round3/cache-network-trace.json) retains responses crossing navigation; resource timing checks scope freshness to the new document. Test-harness response-field/navigation-boundary assertions were corrected during verification; these were not game defects.

An already-open tab does not hot-replace its runtime. A different generic static server still controls its own entry-HTML caching policy. Use the bundled launcher and refresh when changing packages; no promise that old cached HTML can repair itself before reaching the new server.

## Download and owner walkthrough

[Download shadow-becomes-me-r3-5c7c6e926759.zip](../evidence/playtest-round3/shadow-becomes-me-r3-5c7c6e926759.zip) · [Launch README](../evidence/playtest-round3/README-launch.txt) · [BUILD/package manifest](../evidence/playtest-round3/package-manifest.json).

Runtime source **`ed2ca26a9fca3fdd45eecab15d542597c1959d23`**; final evidence-delivery commit is its descendant. Extract to a fresh folder, stop older servers, run `python3 serve.py` (Windows `py serve.py`), open `http://127.0.0.1:8080/`. Another port: `python3 serve.py --port 8081`, with matching URL. Do not double-click index.html. Confirm footer/BUILD.json/ZIP ID. After replacement click Check build, then Ctrl+Shift+R / Cmd+Shift+R. If still old, close the tab and verify server folder/port before reopening; incognito is a fallback diagnostic.

For Devour, enter, move right behind the guard toward the boxes, release movement, C/Transform to Box, wait until the unaware guard is close, use X or Spike/尖刺 once, stay still at least 0.56 seconds, then exit. Chair remains unfitting; moving exposes both disguises and can interrupt Devour. Combat is unchanged: range105, cooldown1.2s, Spike0.22s, Devour0.56s, immediate logical assassination.

## Actual gameplay evidence

- Health before/after: [desktop healthy](../evidence/playtest-round3/health-healthy-desktop-comparison.png), [desktop wounded](../evidence/playtest-round3/health-wounded-desktop-comparison.png), [phone healthy](../evidence/playtest-round3/health-healthy-phone-comparison.png), [phone wounded](../evidence/playtest-round3/health-wounded-phone-comparison.png). Full actual gameplay screenshots, not synthesized poses; guard position/animation phase may differ. Baseline is the exact extracted Round 2 ZIP. [Before capture record](../evidence/playtest-round3/before-results.json).
- Final extracted-ZIP walkthroughs: [desktop GIF](../evidence/playtest-round3/gameplay-desktop.gif) / [original WebM](../evidence/playtest-round3/gameplay-desktop.webm), [phone-touch GIF](../evidence/playtest-round3/gameplay-phone.gif) / [original WebM](../evidence/playtest-round3/gameplay-phone.webm). Actual keyboard/mouse and CDP touch, no injected game state; Transform cycle, movement cancellation, valid Box Devour with full hold, exit. GIFs are 15fps/96-color review derivatives (desktop800px); originals retain full resolution. Fast frames may be omitted in GIF sampling.
- [320px Traditional Chinese](../evidence/playtest-round3/layout-320-zh-TW.png), [phone investigation/?](../evidence/playtest-round3/after-390-zh-TW-investigating.png), [wounded/!](../evidence/playtest-round3/after-390-zh-TW-wounded.png), [open-tab version warning](../evidence/playtest-round3/cache-open-tab-mismatch.png), [updated build](../evidence/playtest-round3/cache-second.png).

## Fresh verification and preserved scope

| Verification | Result |
|---|---|
| [Engine + transformation unit log](../evidence/playtest-round3/unit-results.txt) | 25 passed; cycle from idle/blob/box/chair and prior selections, movement exposure and inactive phases |
| [Full gameplay browser report](../evidence/playtest-round3/browser-results.json) | 18 passed; English/zh-TW, 320/390/768/1440, success/failure/retry, direct controls, guard reactions, ordinary Spike, stealth, storage, reduced motion and offline-after-load |
| Accessibility | 16 axe audits, zero violations; incomplete findings retained; keyboard/focus and ≥44px targets checked |
| [Usability checks](../evidence/playtest-round3/usability-results.json) | 20 passed; C/repeat/mouse/touch, direct/Q/E, exposure/pause, localized current/next, HP/?/!, build match and quiet live region |
| [Devour lifecycle](../evidence/playtest-round3/devour-check/presentation-results.json) | 13 passed; full effect, ordinary Spike, pause, movement interruption, restart, residual removal, isolated preview |
| [Actual extracted-ZIP playthroughs](../evidence/playtest-round3/package-input-results.json) | 2 passed; desktop and real emulated touch |
| [Two-package cache/identity](../evidence/playtest-round3/cache-results.json) | 5 checks passed in one persistent profile / origin |
| [Production package integrity](../evidence/playtest-round3/package-verification.json) | Build passed, all packaged runtime bytes equal tested dist, all hashes match, repeat ZIP byte-identical |
| Performance | Chromium154 / cloud180-frame sample: median16.7ms, p95/max16.8ms; no page errors/off-origin requests |

[Preservation/provenance](../evidence/playtest-round3/provenance.json) and [SHA256SUMS](../evidence/playtest-round3/SHA256SUMS) record sources and artifacts. Engine, scene/tuning, accepted character/guard/Devour/ground-contact renderer, laboratory art and all editable assets are byte-unchanged from Round 2. Only input mapping, UI and build/packaging changed. Physical phones, Safari/Firefox, screen readers, independent first-time-player review and final owner UI/POC acceptance remain **Not Verified**. No new art, Expansion, content, retuning, merge/deployment/publication or expenditure.

## UGDS scope check

| IDs | Current-cycle status |
|---|---|
| P01–P05 | Pass for reproduced playable loop, inputs, four rendered widths, unchanged rules and restart |
| L01–L02 | Pass, both languages and live switching |
| A01–A02 | Pass for scoped keyboard/labels/targets/axe and reduced motion; physical assistive-tech review Not Verified |
| V01, V05–V06 | Pass, accepted sources preserved and actual gameplay comparisons supplied |
| V02–V04 | Prior art acceptance preserved; new UI and whole-POC owner acceptance Not Verified / pending review |
| S01–S02, S04 | Pass for language persistence, local independence and unchanged fictional scope |
| S03 | Cloud sample Pass; physical-device performance Not Verified |
| Q01–Q04, Q06 | Pass for scoped unit/browser/deterministic/accessibility verification and truthful evidence/limits |
| Q05 | Local build/package and source push verified separately; deployment N/A (not authorized) |
| C01–C02 | Pass, bounded owner commitment preserved; acceptance remains owner's decision |
| C03 | N/A, no shared-standard amendment or new adopted version |

## Reproduction and stopping point

`npm ci --no-audit --no-fund`, `npm test`, `npm run build`, `npm start`. Runtime identity uses source revision plus built content, without timestamps; uncommitted runtime builds are marked and cannot be packaged. For this exact artifact from the final evidence commit: `BUILD_SOURCE_COMMIT=ed2ca26a9fca3fdd45eecab15d542597c1959d23 npm run build`, then `python3 scripts/round3/package.py` (runtime paths must still match that source).

Use separate outputs: `LAB_VALIDATION_DIR=/workspace/round3-validation node scripts/laboratory/run-validation.mjs`, `node scripts/round3/check.mjs`, `EVIDENCE_DIR=evidence/playtest-round3/devour-check node scripts/devour/check.mjs`. `before.mjs` needs accepted ZIP on8082. `demo.mjs` needs new ZIP on8083 and runs from a separate folder with evidence/. `cache.mjs` takes CACHE_FIRST_ZIP/CACHE_SECOND_ZIP; both first/final manifests retained. No historical evidence files were relabeled or overwritten.

Project lesson: make the primary contextual input explicit while preserving expert shortcuts, and identify browser runtime bytes as well as downloadable archives. These project records suffice; no shared-standard change proposed. Meaningful implementation checkpoints and the final evidence checkpoint are safely pushed; remote SHA and clean tree are checked before reporting completion. Stop for owner playtest and POC acceptance review.
