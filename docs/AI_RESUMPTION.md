# Shadow Becomes Me — canonical resumption guide

**The one-laboratory POC is accepted and closed.** It is deliberately a complete bounded demonstration, not a complete campaign or a v1.0 game. The current assignment authorizes publication, preservation and handoff only, at $0 additional expenditure. Do not restart visual iteration or extend gameplay. [Publication status, exact release procedure and rollback](PUBLICATION.md) is the operational record; a URL listed here is not proof it has been deployed.

## Current release and next authorized action

**Both game and Possibility publication are complete and independently verified.** [Play the frozen demo](https://jaychtw.github.io/shadow-becomes-me/) · [first Games entry](https://jaychtw.github.io/) · [fact sheet](https://jaychtw.github.io/games/shadow-becomes-me/). The one-lab POC is intentionally closed; no next implementation milestone is implicit.

Game workflow source c5faf728a54660add3af3989c22847c59fe6b50b / tag demo-laboratory-round3 / run 41282628622; accepted runtime ed2ca26 / build r3-5c7c6e926759. Portal deployed source 49d043fbc59d44d6d7675b963713dc90773239a8 / run 41284500241. [PUBLICATION.md](PUBLICATION.md) records exact immutable revisions, independent evidence, headers/identity limits and rollback. Later evidence-only main commits do not imply a different public build.

The prior network-denied pause is historical. The owner's published environment grants API/live access; Codex did not reapply/publish settings. Do not repeat those changes or blindly dispatch an already successful release. Newest-first Games and optional bilingual entry copy follow the portal's updated catalog contract; portal chrome remains English. The exact supplied cover, not a regenerated image, is in both archives.

Shared standards remain pinned. [Optional technical-reference PR 8](https://github.com/jaychtw/game-development-standards/pull/8) is open for review, not merged/adopted; it does not change UGDS/AICP or adopt the existing AICP 1.2.2 proposal. That review is nonblocking. Current authorized publication is complete; wait for new owner direction before further product work. High reasoning is the requested default; recommend Extra High for consequential architectural/cross-repository ambiguity without claiming to change the setting yourself.

## First read

1. [Project state](PROJECT_STATE.md) and [publication record](PUBLICATION.md): current authority, verified deployment status and blockers.
2. [Owner acceptance and closure](POC_ACCEPTANCE_CLOSURE.md): six human playtest checks and frozen scope.
3. [GDD](GDD.md), including later decision amendments; [standards adoption/pins](standards/README.md), AICP 1.2.1 and UGDS 1.0.0. Historical wording is not a newer authorization.
4. [Round 3](PLAYTEST_ROUND3.md), [Devour](SHADOW_DEVOUR.md), and relevant art handoffs before touching that area.

## Durable baselines and rules

- Accepted implementation/evidence: [`5e26b0c4b521186114d1041a98ccaa3b0cfe7f8d`](https://github.com/jaychtw/shadow-becomes-me/tree/5e26b0c4b521186114d1041a98ccaa3b0cfe7f8d). Owner closure recorded at `b684c8f`, authoritative state at `a79b971`.
- Frozen runtime source: [`ed2ca26a9fca3fdd45eecab15d542597c1959d23`](https://github.com/jaychtw/shadow-becomes-me/tree/ed2ca26a9fca3fdd45eecab15d542597c1959d23), build `r3-5c7c6e926759`; [ZIP and file hashes](../evidence/playtest-round3/package-manifest.json). The development branch remains `dev/recovery-art-pipeline`; release commits need not equal runtime-source commits.
- Pure opaque black featureless Shadow rests as the approved smooth amorphous contour, slides low with continuous floor contact, and uses fitting camouflage. Box fits this lab; Chair renders correctly but is unfitting. Movement exposes either disguise. Guard patrol, investigation and hostility remain distinct.
- Ordinary Spike does one damage to the three-HP guard. Fitting disguise + unaware ordinary guard + range permits immediate logical assassination, presented as the accepted solid-cocoon Devour and directional alpha-mask wipe. Range105, cooldown 1.2s, Spike220ms, Devour560ms. Moving immediately after assassination cancels its presentation; pause/help freeze it, restart clears it.
- C / mouse / touch Transform: normal → Box → Chair → normal. 1/2 and direct shape buttons select; Q/E remain disguise-only shortcuts. A/D/arrows slide; X/Space contextual attack; R restart. EN/zh-TW switch live; language is the only local preference.
- Historical `f870b40` feasibility acceptance and `13eba8b` refinement acceptance are separate decisions. Original lost assets were not recovered; later reconstructions must not be mislabeled as those originals.

## Find the implementation, not another competing specification

| Area | Authoritative paths |
|---|---|
| Rules / fixed scene and balance | `src/engine.js`, `src/scene.js` |
| Input / UI / transform cycle | `src/main.js`, `src/transformation.js`, `src/i18n.js`, `index.html`, `style.css` |
| Accepted character rendering / Devour lifecycle | `src/presentation.js`, `src/devour.js` |
| Rest / Spike / accepted guard walk | `art/character-experiment/reference/README.md`, `reference/shadow-rest-candidate.svg`, `source/`, `frames/`, `manifest.json` |
| Authored solid cocoon / mask | `art/shadow-transformation/reference/ALPHA-MASK-HANDOFF.md`, the authored study SVGs, `source/`, `manifest.json`; `docs/SHADOW_DEVOUR.md` explains runtime adaptation |
| Editable laboratory / exports | `art/laboratory-poc/reference/lab-keyframe.svg`, reference handoff, runtime layers; original concept remains reference |
| Reproducible art recipes | `scripts/character-experiment/{draw.py,export.mjs,verify.py}`, `scripts/devour/{prepare.py,export.mjs,verify.py}`, `scripts/laboratory/{prepare.py,export.mjs}` |
| Builds / frozen publication | `scripts/build.js`, `scripts/round3/package.py`, `scripts/publication/prepare.py`; `BUILD.json` identifies runtime bytes |
| Verification / accepted evidence | `tests/`, `scripts/round3/`, `scripts/devour/check.mjs`, `scripts/publication/`; `evidence/playtest-round3/`, `evidence/devour/` |

Do not regenerate accepted art merely to resume. Generators can overwrite editable outputs; an authorized future revision must preserve sources and review diffs. Old art READMEs and playtest reports describe their original review gates; the later closure record resolves POC acceptance.

## Run, verify and publish

`npm ci --no-audit --no-fund`, `npm test`; normal development uses `npm run build && npm start`. New builds intentionally get a new identity. To inspect the *exact accepted* runtime instead: `python3 scripts/publication/prepare.py`, then `python3 scripts/local-server.py --directory .publication/site`. Open localhost8080 via HTTP, not file://. Browser checks should write into an isolated working directory, preserving historical evidence.

[Publication record](PUBLICATION.md) contains manual exact-SHA Pages dispatch, live-byte/browser verification and rollback. Intended canonical demo: https://jaychtw.github.io/shadow-becomes-me/; portal: https://jaychtw.github.io/. Verify their actual live identity before describing either as released. Portal assets/catalog/deployment have their own contract in `jaychtw/jaychtw.github.io`; never infer its status from this repository's deployment.

## Resume safely

Inspect AGENTS instructions, clean/dirty state, branch ancestry, remote changes and current release evidence first. Fetch without resetting other work. Compare actual code, package hashes and live BUILD.json with the recorded baselines. Do not infer latest status from a chat recollection or one old overview. Preserve meaningful commits and safe pushes; authorization for development synchronization is separate from acceptance and deployment. Publication authority for this assignment does not authorize ongoing automatic deployment or new game work.

The exact [approved portal cover](publication/shadow-becomes-me-approved-cover.png) and SHA256 in the publication record are preserved for the later portal step; do not regenerate or substitute it.

Owner decides scope and acceptance; ChatGPT authors/reviews concrete visual concepts and handoffs; Codex implements and verifies against those artifacts. Preserve the approved original and provenance, do not substitute independently invented art. Read shared standards' adopted main and distinguish unmerged proposals; adoption is not retroactive.

Remaining possibilities—Expansion, new levels/enemies, traversal, minimap, campaign/story/dialogue, Godot—are deferred, not backlog commitments. They need a new bounded offer and owner decision. Physical phones/tablets, Safari/Firefox, screen readers and independent first-time-player testing remain unverified. Browser touch emulation and zero axe violations do not establish those results. Owner visual observation outranks synthetic metrics; a newer cache-visible revision is not a combat-rule change.
