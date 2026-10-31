# Codex Implementation Brief — Shadow Becomes Me, POC 0

**Assignment:** Create one **local, runnable, browser-first playable POC** implementing the essential Shadow/camouflage/guard/spike mechanics.  
**Status:** Design handoff; implementation authorized by owner's request to hand off for Codex, **but no deployment/publishing/merging**.  
**Repository:** Discover and verify the correct repository under `jaychtw`; none is verified in this handoff. If absent, ask owner to confirm/create destination before writing remote changes. Do not use unrelated repositories.  
**Working branch:** dedicated development branch after verified repo discovery.  
**GDD:** `docs/GDD.md` v0.1.0 in this handoff, to be installed in project repo.  
**UGDS:** v1.0.0 from commit `374143e614ed9d95bf2c413fb13711e802f2133c` (`UGDS.md`); **AICP:** v1.1.1 from same immutable snapshot.

## Non-negotiable preflight
1. Open and read in full `https://github.com/jaychtw/game-development-standards/blob/374143e614ed9d95bf2c413fb13711e802f2133c/UGDS.md`. Verify repository and exact commit; do not silently use latest main or reconstruct from memory. Read AICP and project GDD in full, plus available project standards/templates.
2. Verify destination repo, branch, existing architecture, project decisions and assets. If standards cannot be verified or repo identity is ambiguous, stop before implementation and report the blocker.
3. Preserve these images at `art/approved_laboratory_concept.png` and `art/dialogue_ui_future_reference.png` with role descriptions. **Only the lab image is approved as current visual direction**; dialogue screenshot is deferred.
4. Report preflight evidence (pinned SHA, access, conflicts) before or alongside implementation record. No claimed compliance without evidence.

## Deliverables
- One locally runnable static browser POC using original production-appropriate **sample** assets; GitHub Pages-compatible build output, **not deployed**.
- Shadow stationary upright solid-black human silhouette, slides as black draped blob, transforms into solid black box/chair silhouettes; one spike attack animation reused in two damage contexts.
- One visually readable, bright authored laboratory scene with boxes visibly more numerous than chairs (or reverse, if scene metadata and art agree), colored guard, simple collision, exit.
- Minimal metadata example with `availableForms` and `fittingShadow` ID; visual object majority lives in background artwork, not object entities or runtime counters.
- Guard patrol with line of sight; immediately hostile for exposed blob; ignores fitting shape; approaches and investigates unfitting shape without instant attack; inspection can resolve hostile.
- Fitting concealment permits lethal one-hit assassination of unaware unarmored guard; wrong disguise cannot assassinate; normal spike is not a one-hit kill from full guard HP.
- Complete loop: intro/control hint, gameplay, success at exit, visible failure/restart and reset. Keyboard **and mobile touch** primary controls.
- English + Traditional Chinese centralized strings, live switch without reset; accessible UI and responsive 320/390/768/1440 widths.
- Test suite, actual browser E2E tests, actual gameplay screenshots (desktop/mobile) and a QA/visual-gap report.

## Explicitly excluded
- Godot project or engine port; connected darkness surfaces, wall/ceiling traverse, expansion, Human Form, multiple stages, story dialogues/portrait UI, advanced guards/robots, multi-session progression, sophisticated alert meters, dynamic light/shadow physics, procedural artwork counting, external backend, analytics, accounts, paid assets/services.
- Full production visual acceptance is **not** an expected result of mechanics POC. Do not turn a concept illustration into the gameplay background; do not present placeholders as final visual quality.

## Engineering discretion
Choose JS/TS renderer (Canvas/SVG/DOM engine as fitting), test tooling, collision details, input mapping and balanced timing/HP parameters. Keep gameplay state transition logic separately testable and scene data engine-neutral. Avoid unnecessary dependencies. Document every chosen tuning value and unresolved behavior. Do not introduce mechanical changes beyond authorized scope.

## Test matrix (minimum)
1. Blob exposed within sight → hostile; occluded/out of range → no unfair detection.
2. Fitting `box` in authored lab → guard ignores; assassination permitted only if target unaware and in range.
3. Unfitting `chair` → guard visibly investigates; cannot Assassin; a normal spike reduces HP without one-hit kill; inspection expiration → hostile.
4. Switch fitting metadata and corresponding art fixture → rule follows `fittingShadow`, never environment-name heuristic, never runtime majority count.
5. Patrol/attack/restart/exit meaningful browser interactions; test a successful stealth path and failed detection path.
6. Keyboard + mobile touch; EN/zh-TW live switching without state reset; 320/390/768/1440 viewport checks, focus, labels, contrast, reduced-motion where applicable.
7. Screenshot actual in-browser lab and Shadow states; compare with `art/approved_laboratory_concept.png`. Call out deviations honestly.

## Escalation / stop conditions
- Stop before coding if pinned UGDS cannot be verified, or target repo cannot be confidently identified.
- Seek owner approval before changing core rules, title, major visual direction, mandatory UGDS exceptions, adding paid/runtime services, publishing/deploying, merging to main, or expanding POC into full campaign.
- When the reference fidelity cannot be met using proposed art pipeline, demonstrate actual sample and explain gaps/alternatives; do not silently downgrade.

## Delivery report required
- Verified repo / branch / commit and precise files changed; preflight UGDS provenance and conflict status.
- How to run locally; chosen tech; test commands/results/counts and actual browser playback evidence.
- Screenshots from running game (desktop/mobile, gameplay and camouflage/hostile states) and visual comparison to approved lab art.
- Bilingual/touch/accessibility coverage with Pass/Fail/N/A/Not Verified for applicable UGDS requirements.
- What is functional, what is placeholder, known issues, physical-device/first-time-player test gaps.
- Clearly state **not published / no deployment performed**, unless separate owner approval is supplied subsequently.
- Recommend next bounded iteration and request owner's POC review, not release approval.
