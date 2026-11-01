# Accepted laboratory demo — publication record

**Owner authorization (2026-11-01):** publish the accepted POC on GitHub Pages and add it to Possibility Games, including necessary merges/deployments after successful verification, at strictly $0 additional expenditure. [Supplied detailed brief](publication/OWNER_HANDOFF.md). This supersedes the earlier closure record's no-publication restriction for this assignment only. Gameplay/art scope remains frozen.

## Current verified release — 2026-11-01 (Asia/Taipei)

**Game: deployed and independently verified** at https://jaychtw.github.io/shadow-becomes-me/. [Successful run41282628622](https://github.com/jaychtw/shadow-becomes-me/actions/runs/41282628622), workflow source `c5faf728a54660add3af3989c22847c59fe6b50b`, Pages deployment7469781666, success2026-11-01T07:00:30Z (15:00 Asia/Taipei). Owner started the existing run; Codex did not dispatch a duplicate. [Release receipt](../evidence/publication/live/release.json).

The newly published environment grants current API/live-host access. No environment settings were reapplied or published by Codex. All63 canonical website file hashes match the exact accepted ZIP, build `r3-5c7c6e926759` / runtime source `ed2ca26`. Six independent actual keyboard/touch checks passed: Transform, fitting-box full Devour, ordinary Spike, exit, restart and both languages. [Integrity](../evidence/publication/live/public-integrity.json) · [Gameplay](../evidence/publication/live/public-gameplay.json). Workflow prepare/publish and its complete public browser suite passed; a second full independent browser suite is running. Local preflight results remain separately recorded below.

**Possibility: integration in progress, not yet published.** Verified pre-change live portal source is `f8ca326efa4eee919c336cdceac18334a480746a`; source main `23c91035642e343a845fbc4a95db6c6edb6f16e9` differs only in release documentation. Keep this source as the portal rollback baseline. Shared standards remain unchanged/pinned. Accepted POC scope stays closed.

### Historical preparation / blocked attempts

The following records describe the earlier state; they do not override the verified release above.

## Previous gate (superseded)

| Workstream | Observed status |
|---|---|
| Game Pages | **Publication source pushed to main at `adac5ff0c9e5f21fd49444cfc949a8cf9c8d8de9`.** Dispatch failed before a run was created; no deployment or public verification completed in this assignment. Frozen artifact/local checks pass; API and canonical live access remain blocked. |
| Possibility entry | **Not started / gated on verified game publication.** Current portal inspected; no content, cover, ordering or deployment changed. |
| Canonical resumption | [Guide prepared](AI_RESUMPTION.md); release status remains explicitly blocked/pending. |
| Shared standards | Adopted main remains UGDS1.0.0 / AICP1.2.1. Unmerged AICP1.2.2 proposal already covers artifact handoff/reasoning escalation; no adoption or amendment performed. |

`api.github.com` returns Forbidden through gh; canonical `https://jaychtw.github.io/shadow-becomes-me/` and portal root fail with proxy CONNECT403. GitHub repository HTML/Git work. A draft environment network update adds only `api.github.com` and `jaychtw.github.io`, preserving package-manager presets. Tool reported saved / requires_publish:true: it is not active until the owner saves/publishes the environment update. This is not a GitHub Pages failure or evidence that the URL is absent. After the owner reconfirmed “Push to main, deploy to publish,” main safely fast-forwarded from `e1404ae` to `adac5ff0c9e5f21fd49444cfc949a8cf9c8d8de9`. The actual `gh workflow run` attempt failed at workflow lookup GET with Forbidden, before dispatch POST; it created no run ID. No GitHub API write, Pages settings change or deployment occurred. [Push/dispatch receipt](../evidence/publication/main-push-and-dispatch.json). Later documentation-only handoff commits may advance main; the release input remains this immutable publication-source SHA.

## Frozen publication artifact and zero-cost scope

Accepted checkpoint `5e26b0c4b521186114d1041a98ccaa3b0cfe7f8d`; runtime source `ed2ca26a9fca3fdd45eecab15d542597c1959d23`; build **r3-5c7c6e926759**. `scripts/publication/prepare.py` verifies the original Round3 ZIP and every file against its committed manifest, then copies 63 accepted website files without rebuilding or altering runtime bytes. Only local Python/README helpers are omitted, and `.nojekyll` is added. All accepted runtime/animation/art source stays unchanged. Intended URL: https://jaychtw.github.io/shadow-becomes-me/ (not yet independently verified).

Anonymous GitHub repository HTML identifies this repository as Public (`isPrivate:false`). Publication uses standard public-repository ubuntu-latest runners and GitHub Pages, no paid runners/services, custom domain, backend or billing enrollment. The workflow additionally skips private repositories. No new expenditure is authorized or incurred.

## Prepared manual release procedure

1. Restore API and live-host access; check actual repository Pages source, permissions, environment/main policy and branch protection. Preserve current Pages settings unless a necessary free configuration change is within the owner's authorization. Record existing public identity if any.
2. Run `npm test`; `python3 scripts/publication/prepare.py`; serve `.publication/site` locally. Run `tests/browser.mjs` with TEST_URL pointing at that site from an isolated output directory, plus `scripts/publication/gameplay.mjs`. Inspect runtime/accepted-source preservation and staged changes.
3. **Completed:** main safely fast-forwarded from initial `e1404ae` to verified publication source `adac5ff0c9e5f21fd49444cfc949a8cf9c8d8de9`. Development branch is retained. Do not repeat or force this integration. Fetch and compare newer remote commits before any further push. The immutable source SHA is the release reference; create a publication tag only after recording the actual deployment result and checking for name collisions.
4. Dispatch `.github/workflows/publish-demo.yml` on main with the full `release_commit` and `authorization=PUBLISH SHADOW DEMO`. Pushes alone do not deploy; no ongoing automatic publication is enabled. Workflow validates full SHA/main ancestry, tests the frozen ZIP, uploads the static Pages artifact, then deploys with least-privilege Pages/OIDC permissions.
5. Check the actual run/jobs, then independently run `python3 scripts/publication/verify-files.py` and `TEST_URL=https://jaychtw.github.io/shadow-becomes-me/ node scripts/publication/gameplay.mjs`. Also run the full browser suite against that URL from isolated outputs. Verify root, every canonical runtime asset hash, build ID/cache headers, both locales, keyboard/touch, Transform, ordinary Spike, full Devour, exit and restart. Preserve run ID, exact SHA/tag and public evidence. Green CI alone is insufficient.
6. Only then add/publish Possibility using its existing exact-SHA manual workflow and current catalog/maintenance rules. Recheck actual live portal identity; the inspected records report last release `f8ca326efa4eee919c336cdceac18334a480746a`, not independently reverified here. Portal publication and game publication are independent outcomes.

Pages controls its CDN cache headers; the game keeps the accepted fingerprinted namespace and no-store metadata fetch. Its bundled local server's no-store header does not configure GitHub Pages headers. An already-open tab must refresh to run another version.

## Approved cover and portal decisions still pending execution

Owner supplied `shadow-becomes-me-approved-cover.png`, SHA256 **3764649da4cfb79a32849c10b569da34a0c104af649d942a776efa89812c0d34**, verified against the attachment and visually inspected. Preserve that original in the portal artwork archive; derive its required WebP without redesign/cropping/title overlays. The exact [approved original](publication/shadow-becomes-me-approved-cover.png) is durably preserved with this handoff; no replacement image has been authored. Copy those same bytes into the portal archive when its publication gate is open.

Portal main `23c9103` currently uses English-only summaries/navigation and no locale switch, explicit numeric order, per-gallery derived filters, fingerprinted responsive 16:9 covers and manual deployment. The brief requests bilingual copy and a durable newest-first Games convention preserving manual overrides/filter behavior. Recommended bounded resolution: optional per-entry zh-TW summary with language markup, retaining English portal chrome; date-based Games default with an explicit compatible editorial override. Full portal localization is a separate scope. Recommend Extra High reasoning before this consequential cross-repository choice; do not claim an absent portal language mode was verified. No portal implementation before game gate.

## Rollback

Before first successful game publication there is no game deployment from this assignment to roll back. After success, keep its immutable publication SHA/tag and accepted ZIP. Re-dispatch the manual game workflow using that known-good SHA on main ancestry, then repeat public hash/gameplay verification. A future altered runtime must not silently replace this frozen baseline. No force push or deletion of the accepted branch is needed. Unpublishing Pages is a separate deliberate settings action, not executed here.

Portal rollback is independent: use its existing Publish approved Possibility release workflow with the previously live full source SHA and PUBLISH POSSIBILITY, then verify build-info/routes/cards/links. Do not assume a documentation-only main SHA is the deployed artifact. Preserve the measured pre-change portal SHA before publishing; the historical f8ca326 record must first be reverified. Rolling back a portal card does not roll back the game.

## Local verification checkpoint

Fresh [unit log](../evidence/publication/unit-results.txt): 25 passed. [Full browser report](../evidence/publication/local-browser-results.json): 18 passed, 16 axe audits with zero violations, no page errors/off-origin requests, median16.7ms/p95-max16.8ms cloud frame sample. Six actual-input publication checks passed at both localhost root and [/shadow-becomes-me/](../evidence/publication/local-subpath-gameplay.json); every one of the 63 accepted runtime files matched its ZIP hash at both paths. These are local results, not public deployment evidence. [Network blocker observations](../evidence/publication/network-access.json). [Standards review](publication/STANDARDS_REVIEW.md).

## Paused handoff — exact next operation

The owner will resume later and expressly requested knowledge transfer. Start with [the canonical resumption guide](AI_RESUMPTION.md), particularly its Next Codex section. Publication authorization persists; do not ask the owner to approve the same release again. Restore supported network access to api.github.com and jaychtw.github.io; the earlier saved environment draft still requires application/publication. Re-read current environment status/draft rather than assuming it applied. Your initial action after access works is to inspect Pages settings and existing workflow runs, because the owner may have manually dispatched since this receipt. If no successful matching run exists, use the exact dispatch command in the guide. Verify real public bytes/play before touching Possibility.

## Remaining verification

Actual deployment, canonical live bytes/browser behavior, Pages CDN headers, portal cover/sorting/bilingual entry, portal release and any standards amendment are not complete. Physical devices, Safari/Firefox and screen readers retain the accepted POC's explicit limitations. The task stops at the network gate rather than substituting local tests for public evidence.
