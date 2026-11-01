# Accepted laboratory demo — verified publication and closure

**Completed 2026-11-01 (Asia/Taipei).** Owner accepted/closed the bounded POC, then separately authorized game and Possibility publication and required merges at strictly $0. [Detailed owner brief](publication/OWNER_HANDOFF.md). No gameplay/art expansion was authorized or performed.

| Independent outcome | Verified release |
|---|---|
| Game Pages | [Playable Demo](https://jaychtw.github.io/shadow-becomes-me/), successful [run 41282628622](https://github.com/jaychtw/shadow-becomes-me/actions/runs/41282628622), workflow source `c5faf728a54660add3af3989c22847c59fe6b50b`, stable tag `demo-laboratory-round3` |
| Frozen game artifact | Accepted checkpoint `5e26b0c4b521186114d1041a98ccaa3b0cfe7f8d`; runtime source `ed2ca26a9fca3fdd45eecab15d542597c1959d23`; build **r3-5c7c6e926759** |
| Possibility | [First Games card](https://jaychtw.github.io/), [fact sheet](https://jaychtw.github.io/games/shadow-becomes-me/), deployed source `49d043fbc59d44d6d7675b963713dc90773239a8`, successful [manual run 41284500241](https://github.com/jaychtw/jaychtw.github.io/actions/runs/41284500241) |
| Portal delivery evidence | Immutable docs commit `91d9badc2e55f48dc28596e80a1179d5abc787f0`; [delivery/rollback](https://github.com/jaychtw/jaychtw.github.io/blob/91d9badc2e55f48dc28596e80a1179d5abc787f0/docs/shadow-becomes-me/DELIVERY.md). Later evidence-only commits are not a different deployed artifact. |
| Shared standards | Adopted UGDS 1.0.0 / AICP 1.2.1 remain unchanged. [Optional technical-reference PR 8](https://github.com/jaychtw/game-development-standards/pull/8), source `d1a66fe3a16413c855959d4501472a0305484157`, is open for review, not merged/adopted. Existing AICP 1.2.2 proposal untouched. |

## What was published

The exact accepted Round 3 runtime, not a rebuild of newer docs/main. `scripts/publication/prepare.py` verifies the committed ZIP/manifest, copies 63 unchanged website files, omits local-only launcher/README and adds .nojekyll. All accepted character/guard/Devour/ground-contact renderer, engine, timing, collision and laboratory sources remain byte-unchanged. The owner started the existing successful game workflow; Codex did not dispatch a duplicate.

Possibility uses the exact supplied [approved cover](publication/shadow-becomes-me-approved-cover.png), SHA2563764649da4cfb79a32849c10b569da34a0c104af649d942a776efa89812c0d34. Original archived in both handoff and portal artwork archive. Lossless WebP source decodes to identical pixels; standard fingerprinted 480/960/1600 variants preserve title/Shadow (0.5 source-pixel aspect rounding). No regenerated art or overlay typography.

English and Traditional Chinese entry descriptions appear together with language markup. Portal chrome remains English; no nonexistent second portal mode is claimed. Real card clicks verified both actual game language modes. Games sort newest known publication first, unknown dates follow in prior editorial order; ties use order/ID and explicit orderOverride pins are supported. No project-ID exception. Other collections and filter-label order remain;26 existing routes are byte-identical to the pre-change release.

## Verification and history

- Fresh 25 game unit cases; independent live 18 browser cases,16 zero-violation axe audits,6 ordinary keyboard/touch publication groups and **63 canonical runtime hashes** matched. [Public integrity](../evidence/publication/live/public-integrity.json), [actual input](../evidence/publication/live/public-gameplay.json), [independent full browser](../evidence/publication/live/independent-browser.json), [successful workflow](../evidence/publication/live/workflow-run.json).
- Portal 14 unit/publishing cases; local 10 layouts,76 filter cases,13 gallery/fixture audits,13 behavior groups,5 fixtures,10 Apps audits and10 entry views passed. Independent public **139-file** match,10 responsive/theme entry views and10 Apps zero-violation audits; actual portal→game EN/zh-TW clicks passed. [Portal results](https://github.com/jaychtw/jaychtw.github.io/blob/91d9badc2e55f48dc28596e80a1179d5abc787f0/docs/shadow-becomes-me/DELIVERY.md#verification). Exact-source ZIP reproduced byte-identically.
- Review CI passed. First portal main validation failed in public-link checking; unchanged-source retry passed. Exact external cause is unconfirmed. Final manual publication prepare/publish and fresh links/public verifications passed; no checks bypassed.
- Earlier API/Pages CONNECT403 was resolved by the owner's newly published environment. Codex did not reapply or publish environment settings. [Earlier failed dispatch receipt](../evidence/publication/main-push-and-dispatch.json) is historical; it was not a game-logic or Pages-build failure. Current live proof supersedes its blocked status.

[Consolidated closure receipt](../evidence/publication/live/closure.json) · [checksums](../evidence/publication/SHA256SUMS). Runtime sources, workflow source, deployment and evidence-only commits are deliberately distinct. GitHub Pages controls CDN headers (observed public max-age policy); the local Python launcher's no-store policy does not configure Pages. Fingerprinted runtime/cover references and actual canonical hashes were verified.

## Publication procedure and rollback

Both repositories retain manual exact-SHA workflow_dispatch gates; pushes alone do not deploy. Standard public-repository GitHub runners and Pages only; **additional expenditure: $0**. No billing enrollment, paid tool, telemetry, backend, engine replacement or ongoing automatic publication was enabled.

Game known-good re-publication: from main run `publish-demo.yml` with release_commit=c5faf728a54660add3af3989c22847c59fe6b50b and authorization=PUBLISH SHADOW DEMO. Confirm main ancestry, actual current settings/run and artifact identity first; verify canonical hashes/play after any action. The annotated tag points to that source; do not force-move it or erase the development branch. Current docs/main may be a later descendant of this frozen public source.

Portal known-good current source is 49d043fbc59d44d6d7675b963713dc90773239a8. To undo this catalog update, dispatch its existing deploy.yml on main with release_commit=f8ca326efa4eee919c336cdceac18334a480746a and authorization=PUBLISH POSSIBILITY. That is the measured pre-change public baseline, not documentation-only23c9103. Verify build-info/routes/assets/card destinations afterward. Portal rollback does not roll back the game. No rollback was performed; these are operator instructions, not authorization for an unrelated future release.

## Closure / limits

The accepted one-laboratory POC and this publication/handoff assignment are complete. Shared optional reference PR 8 is the only review item, not a production blocker or standards adoption. Physical phones/tablets, Safari/Firefox, screen readers, independent first-time-player study and future uptime remain unverified. Owner human acceptance and automated evidence are separate. No complete-game/v1.0 claim.

[Canonical next-Codex guide](AI_RESUMPTION.md) is linked from README and PROJECT_STATE. New levels, Expansion, traversal, minimap, story/dialogue, enemies, balance/art changes or Godot require a separate owner-approved offer. Do not silently start a new development milestone.
