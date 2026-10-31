# Fresh surviving-POC verification

Date: 2026-10-31, Asia/Taipei. Source under test: `871dabff06c703b4ea39eb4a3c0022a99a6e7340`. These are fresh runs, not the inaccessible art-pipeline results. Gameplay source/tests/assets remain unchanged.

## Commands and results

| Command | Result |
| --- | --- |
| `npm ci --cache /workspace/.npm-cache --no-audit --no-fund` | Passed; five development packages from unchanged lockfile. No paid services enabled. |
| `npm test` | 18 individual tests passed, zero failed/skipped. Initial sandbox run summarized one file only; rerun through supported escalation produced the 18 actual case results saved below. |
| `npm run build` | Passed; seven static runtime files, 39,076 bytes. |
| `npm start` | Existing script served dist on 127.0.0.1:8080; browser suite made functional requests and completed gameplay. Validation server stopped after use. |
| `npm run test:browser` | 18 passed, zero failed; run 17:58:37–18:00:20 Asia/Taipei. |
| Embedded axe checks | 16 audits, zero violations: intro/playing × EN/zh-TW × 320/390/768/1440 px. 16 incomplete audit-rule records retained in JSON, not asserted resolved. |
| `python3 scripts/artifact.py` | Passed; content digest `4fd4e2020537aab36d323f9c28f9693a7aa8a24ad6a74dfc8705bb0ad221d1ed` matches surviving POC. Packaging script hardcodes original base/branch; do not treat that metadata as recovery-branch provenance. |

Toolchain: Node 24.19.0, npm 11.9.0, system Chromium 154.0.8037.57, Playwright 1.56.1, axe 4.10.2. Commands needing networking, actual unit-case reporting, local listening or Chromium ran through supported command escalation; TLS/integrity verification remained enabled. No missing GitHub token was inferred from environment-variable absence.

## Evidence and behavior

[Unit log](../evidence/recovery-2026-10-31/unit-results.txt), [browser log](../evidence/recovery-2026-10-31/browser-run.txt), [browser JSON](../evidence/recovery-2026-10-31/browser-results.json), [validation context](../evidence/recovery-2026-10-31/validation-context.json), [runtime hashes](../evidence/recovery-2026-10-31/build-manifest.json).

Desktop and Chromium touch-emulated mobile tests drove actual input through stealth success, wrong-form investigation, ordinary spike damage, hostility, failure/retry and exit; they also exercised focus, help, pause, live bilingual switching, storage errors, reduced motion and offline-after-load interaction. Engine tests cover fitting metadata swaps, sight/occlusion, assassination exclusions, cooldown/range, patrol/bounds and deterministic solvability. Zero browser page errors and zero off-origin runtime requests were reported. A cloud-host 180-frame sample had median/p95 ~16.7 ms; this is not physical-device performance evidence.

Representative fresh captures: [desktop upright](../evidence/recovery-2026-10-31/desktop-upright.png), [desktop spike](../evidence/recovery-2026-10-31/desktop-spike.png), [390px Traditional Chinese fitting form](../evidence/recovery-2026-10-31/mobile-fitting-zh.png), [1440px EN layout](../evidence/recovery-2026-10-31/layout-1440-en.png), [390px zh-TW layout](../evidence/recovery-2026-10-31/layout-390-zh-TW.png). These are surviving-POC screenshots, not the missing laboratory study. No missing GIFs/WebMs were regenerated.

Visual inspection of fresh desktop/mobile screenshots and supplied reference sheets confirms a substantial fidelity gap: regular flat vector architecture and static/minimally transitioning actors versus the illustrated references' detailed guard gait, draped deformation and atmospheric depth. The surviving idle has separated leg-like geometry; this is not proof of the missing accepted draped animation. No artistic acceptance is inferred or reopened. Physical phones, Safari/Firefox, screen readers, first-time-player review and production-scale art reuse remain Not Verified. Historical 30/14/8 reports were not rerun because their sources are missing.

## Reproduce without replacing historical evidence

Each cloud task is isolated; use its existing checkout and do not create a Git worktree unless the owner requests one. From `/workspace/shadow-becomes-me`, run `npm ci --no-audit --no-fund`, `npm test`, and `npm run build`. `npm start` serves locally; stop with Ctrl-C. In another terminal use `npm run test:browser` (system `/usr/bin/chromium`; override `CHROMIUM_PATH` if necessary). No website publication is involved.

The browser runner writes tracked historical evidence paths. For evidence preservation, copy the tracked source (excluding `.git`, `node_modules`, and historical `evidence`) to a separate ordinary directory, link or install the locked node_modules there, and run the same scripts from that directory. This session used `/workspace/recovery-validation`. Copy fresh outputs into a newly dated evidence directory; do not relabel historical results. Keep the server associated with that directory and stop only the server you started. The full existing gameplay suite, not an isolated art-study substitute, was executed.
