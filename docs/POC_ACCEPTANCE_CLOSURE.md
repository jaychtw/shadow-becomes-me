# Laboratory POC — owner acceptance and closure review

**Date:** 2026-11-01 (Asia/Taipei)  
**Scope:** bounded, local-first, single-laboratory playable proof of concept  
**Accepted implementation/evidence checkpoint:** `5e26b0c4b521186114d1041a98ccaa3b0cfe7f8d` (`dev/recovery-art-pipeline`)  
**Packaged runtime source:** `ed2ca26a9fca3fdd45eecab15d542597c1959d23`  
**Artifact:** [Round 3 owner-review ZIP](../evidence/playtest-round3/shadow-becomes-me-r3-5c7c6e926759.zip)

> Publication follow-up: the owner subsequently authorized Pages and Possibility publication at $0. [Current publication record](PUBLICATION.md). Historical no-release statements below describe this closure decision; they do not cancel the later authorization. POC scope and acceptance stay frozen.

## Owner decision

After personally playing the delivered Round 3 local build, the owner reported: **“I completed the Shadow Becomes Me Round 3 owner playtest. All six checks passed. Let's proceed with the POC acceptance and closure review.”**

**Decision: Accept and close the bounded laboratory POC.** This decision covers the delivered gameplay and look-and-feel within this POC scope; it is **not** acceptance of a complete multi-stage game, v1.0 production release, public deployment, physical-device compatibility, or future mechanics.

The six owner-confirmed checks were:

1. C cycles Shadow → Box → Chair → Shadow.
2. On-screen Transform works intuitively.
3. Guard health bar appears appropriately after taking damage.
4. Ordinary Shadow Spike and Shadow Devour remain satisfactory.
5. Moving Shadow appears grounded.
6. Displayed build ID matches downloaded build.

Round 2's owner-confirmed Devour and contact corrections, and earlier owner-accepted guard/Devour visual direction, are incorporated, not reopened.

## Delivered and retained

- One playable illustrated lab encounter, exit and replay loop, stealth/camouflage, guard patrol/awareness/investigation/hostility and normal Spike.
- Fitting/unfitting disguise distinction; contextual Shadow Devour with solid cocoon and directional alpha masking, separate from Spike.
- Shadow sliding and floor contact; mouse, keyboard and touch UI; EN/zh-TW localization.
- Clear transform cycling and direct shortcuts, wounded-only guard HP, persistent language, build identity and a packaged no-cache Python local server.
- Source-controlled original/editable art, reproducible exports, regression tests and browser evidence. See [Round 3 report](PLAYTEST_ROUND3.md), [Round 2 report](PLAYTEST_ROUND2.md) and [Devour](SHADOW_DEVOUR.md).

## Evidence and independent limits

Codex reports Round 3: 25 unit tests, 18 gameplay browser cases, 20 usability checks, 13 Devour lifecycle cases, five cache checks, two extracted-package playthroughs, and 16 automated accessibility audits with zero violations. The owner independently accepted the six *human playtest* observations above. These are separate types of evidence.

**Not verified:** physical phone/tablet playtesting, Safari/Firefox, screen readers/assistive-technology interaction, independent first-time-player usability testing, broad-device performance. Earlier owner cache incident's exact cause remains unconfirmed; versioned URLs and no-cache local launch mitigate recurrence. Future changes require fresh verification.

## Freeze and exclusions

Closed POC baseline only; no additional art/gameplay iteration is authorized implicitly. Shadow Expansion, traversal/shadow surfaces, additional stages, story/campaign, larger enemy roster and production polish belong to separately scoped future milestones. No purchase, backend, external services or expenditure is authorized.

**No merge to main; no GitHub Pages deployment; no Possibility portal entry or publication.** These remain gated on explicit owner instruction. Preserve branch, artifacts and reports as the durable POC baseline. This documentation-only closure does not itself alter the accepted runtime.

## Cycle retrospective and AICP carry-forward candidates

- **Artifact first:** ChatGPT-authored editable Shadow/lab/keyframe references produced more controllable integration than interpreting repeated prose prompts.
- **Owner observation outranks synthetic success:** numerical ground-contact checks did not settle perceived gaps; final evaluation combined perceptual review with renderer/pixel evidence.
- **Separate visual acceptance from operational correctness:** accepted Devour visual direction preceded discovery of actual interaction/visibility and cache uncertainty.
- **Make local builds identifiable:** ZIP filename alone cannot disambiguate stable browser URLs; build IDs, fingerprinted asset paths, cache-aware launcher, and same-profile upgrade tests are reusable standards examples.
- **Keep one conceptual action across input modes:** C / touch / mouse Transform cycle is primary; direct keys are secondary. Document interactions as state transitions, not just key descriptions.
- **Communicate honest test limits:** browser touch emulation is not a physical phone; axe audits are not screen-reader validation.
- **Keep release permissions separate:** owner acceptance, branch checkpoint, merge, deployment and portal entry are distinct gates.

These are **project-level proposed learnings**, not assertions that the shared AICP has been amended. Review whether they are already covered in AICP before submitting a targeted shared-standards change. Avoid duplicating established rules.

## Next authorized state

**POC accepted and closed; frozen locally on development branch.** Await new owner direction for either (a) a separate publication/release readiness decision, or (b) the next game-development milestone. Do not silently start either.
