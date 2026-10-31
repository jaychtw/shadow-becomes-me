# Assassination — Envelopment concept / owner review gate

**Status:** new visual proposal only, not accepted and not authorized for runtime implementation. Created by ChatGPT after Playtest Round 1 report at `b009368ac4b7bbaa51f80e1fa5efa09e494665c6`.

## Artifact

- [envelopment-sequence-candidate.svg](envelopment-sequence-candidate.svg): original editable four-panel shape-language/keyframe study at 1536×560. The four sequential panels are **concept poses**, not timed animation frames, export manifests, or gameplay screenshots. The guard is illustrative and **not** a replacement for the owner-accepted walking cycle.
- Concept: fitting camouflage unfolds into a **continuous, floor-connected** mass, rises from behind the unaware guard, briefly engulfs him in a non-graphic black silhouette and withdraws to a grounded amorphous form. The normal spike remains a distinct combat attack.
- Explicitly **preserve**: existing assassin eligibility (fitting camouflage, patrolling unaware, in range, unarmored), guard reaction state, input mapping, 105-unit combat range, and accepted normal-spike art. This document does not authorize rewriting engine rules, altering kill timing, or implementing this concept without owner acceptance.
- Keep the silhouette black and featureless. No eyes, face, humanoid arms, separated tendrils, gore or victim particles. The whole envelope must remain visibly connected to Shadow's anchored body. Frame 03 is a graphic simplification and needs depth/contact review in real gameplay.
- The current cooldown was tuned from 0.7 s to 1.2 s in Round 1, but that cadence and slide form have **not** yet received explicit owner playtest acceptance.
- Practical concern: the existing engine kills immediately at attack input. If the enveloping animation takes appreciable time, a guard may enter the dead presentation prematurely. Before implementation, Codex should propose purely presentational synchronization and show the tradeoff; no rule/timing change without owner approval.

## Proposed review path

1. Owner reviews shape language, readability, and assassination identity versus the normal spike.
2. If approved, ChatGPT or Codex produces game-scale isolated source keyframes anchored to the existing character pivot; no entire new animation set without a bounded brief.
3. Codex integrates after separate authorization, with paused/stepped and real-play desktop/phone evidence, repeatable exports, existing gameplay regression tests and a distinct stealth/non-stealth visual check.

No implementation, asset replacement, merge, deployment, publication or expenditure is approved by this file.
