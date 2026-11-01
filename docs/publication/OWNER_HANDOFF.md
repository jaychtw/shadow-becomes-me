# Shadow Becomes Me — Final Demo Publication and Knowledge Transfer

## Approved handoff artifact
- `shadow-becomes-me-approved-cover.png` (original approved art; preserve it)
- SHA-256: `3764649da4cfb79a32849c10b569da34a0c104af649d942a776efa89812c0d34`
- Intended placement: Possibility > Games catalog.
- Do not use a screenshot or regenerate/reinterpret this cover.
- Generate WebP variants as the portal convention requires, archive this original.
- The artwork contains its own title and 'Playable Demo' text; avoid overlaying duplicate typography.
- On responsive crop, preserve both title and Shadow silhouette. If necessary use contained composition or a carefully reviewed derivative rather than cutting off these elements.

## Source repositories
- Game: https://github.com/jaychtw/shadow-becomes-me
- Portal: https://github.com/jaychtw/jaychtw.github.io
- Standards: https://github.com/jaychtw/game-development-standards
- Accepted playable demo checkpoint: `5e26b0c4b521186114d1041a98ccaa3b0cfe7f8d`
- Closure record: `docs/POC_ACCEPTANCE_CLOSURE.md`
- Working development branch: `dev/recovery-art-pipeline`

## Authorizations and scope
The owner explicitly authorizes publishing the accepted demo via the game's GitHub Pages, and making the Games catalog entry live on Possibility, including required integration/merges/deployments after all checks pass. This is NOT authorization for new levels, Shadow Expansion, combat tuning, paid services, or a full 1.0 game.

## Task A — Publish accepted playable demo
1. Read repo GDD, PROJECT_STATE, closure record, Round 3 report, and current UGDS/AICP. Inspect actual repository and Pages conventions before planning; do not rely on assumptions about current branches.
2. Publish the exact accepted Round 3 runtime (or a byte-equivalent rebuild), with no behavior/art changes, at https://jaychtw.github.io/shadow-becomes-me/ using appropriate GitHub Pages configuration.
3. Verify asset paths and direct URL, restart, keyboard, touch emulation, both locales, Spike, Devour and transform cycle on the deployed site. Check static-asset caching/build identity on Pages. Use only free GitHub/Pages facilities and check budget constraints; no unapproved spend. Never assume Pages deployment success solely because an Action is green.
4. Keep a stable publication branch/tag or immutable commit, documented rollback path, build identity and published URL. Do not abandon or erase the accepted development branch.
5. Keep wording 'Playable Demo' / 'Proof of Concept', not 'Complete Game'.

## Task B — Possibility Games entry
1. Inspect existing gallery routes, metadata, sorting logic, cover formats, language handling and current deployment conventions in jaychtw.github.io.
2. Add *Shadow Becomes Me* with approved cover, description in EN and zh-TW (artwork/title remain untranslated), tags following existing taxonomy, canonical live Play link and source link where consistent.
3. Put newest published game first in Games catalog. Implement a durable newest-first convention based on explicit publication/addition date or appropriate existing metadata, with stable tie-breaker; do not hard-code one project as perpetually first. Preserve filter semantics/order and manual overrides, and avoid unexpected reordering of non-Games sections.
4. Verify phone/tablet/desktop cover crop and alt text, click behavior, theme contrast, both languages, accessibility and cache correctness.
5. Publish using site's established no-cost workflow, and verify the live page and link. Do not embed local-only `localhost` links.

## Task C — Durable project resumption
Create a short canonical AI handoff in the game repository (and link it near PROJECT_STATE / README). It should explain:
- What is accepted and why the single-level POC is intentionally considered complete.
- Gameplay rules: Shadow resting/sliding/camouflage, fitting box vs unfitting chair, guard states, ordinary Spike vs contextual Devour, current control cycle, English/zh-TW, grounded movement.
- Authoritative repo paths and immutable commits for GDD, source art, animation generators, runtime/package, tests, evidence, published URL.
- Important decisions, lessons, known limitations, deferred expansion/levels/traversal/minimap/story questions.
- How an incoming AI discovers repository state, consults UGDS/AICP, verifies deployed and development baselines, and resumes without assuming stale documentation is current.
- AIP collaboration roles and workflow: owner approves decisions; ChatGPT authors visual concepts/handoffs; Codex implements/validates; artifact-first; $0, no silent scope growth.
- How to run/tests/publish/rollback, plus a concise human-readable first-read order.
Avoid duplicating whole GDD or creating competing sources of truth. Update stale overview language to clearly distinguish accepted demo from future full-game scope.

## Task D — Shared-standards refinement
Inspect latest *adopted* UGDS/AICP in game-development-standards before changing them. Compare existing requirements against actual lessons from this cycle: artifact-first artwork; approval vs implementation vs release gates; subjective visual acceptance; cache/identity reproducibility; interaction parity across keyboard/touch; owner-approved POC closure; newest-first portal ordering; canonical resumption notes; differentiated emulator/device test evidence.
Only make targeted, evidence-backed nonduplicative amendments, with change log and compatibility notes. If a change would need broader owner ratification, create a proposal/PR rather than silently making it adopted. No speculative bureaucracy.

## Release gates and final report
- Test accepted game locally, and verify GitHub Pages live, before linking portal.
- Preserve original cover file and any WebP source mapping.
- Verify live Possibility first Games card + playable route, both language modes and responsive assets.
- Re-run relevant automated tests and record truthful results and residual limitations.
- Commit/push with meaningful checkpoints, review changes, and confirm remote SHAs and clean worktree.
- Report exact deployed URLs, branch/commit/tag for each repo, details of Pages workflow, rollback, tests, standards changes or proposals, and remaining caveats.
- If deployment is blocked by permissions/budget/Pages settings, stop at the blocker with precise instructions; do not fabricate live status or spend money.

## Owner acceptance intent
The cover is explicitly approved. The existing POC is accepted and closed; publication should display that frozen demo and preserve a clean option to return to future development, without having to build the other levels now.
