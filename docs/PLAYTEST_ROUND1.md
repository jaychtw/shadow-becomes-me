# Playtest corrections round 1 — 2026-11-01 (Asia/Taipei)

Owner-authorized localized corrections against `01c09df916f084af171cf1ac112b02333e3e8ec4`. AICP 1.2.1 / pinned UGDS 1.0.0 unchanged. Work in progress for owner review.

Sliding uses the exact approved resting-frame PNG and its (256,232) ground pivot, with renderer scale (0.46,0.24). Opaque width becomes 432×0.46 = 198.72 world units, height about 45; previously the irregular low blob was approximately 86×37. The flat contact edge replaces the old scalloped boundary, avoiding lower-edge voids. Rest/attack scale and source assets are unchanged. No new animation set or environment art.

Cadence proposal implemented: cooldown **0.7 → 1.2 seconds**, a 71% longer interval; maximum initiation rate **1.43 → 0.83 attacks/s**. Spike visual **0.22 s unchanged**, recovery between visible spikes **0.48 → 0.98 s**. Range **105**, immediate damage, normal damage **1**, assassination eligibility and guard timing unchanged. Purpose: keep a sharp attack but make repeated inputs less spammy. New unit coverage tests denial at 1.19 s and availability after 1.2 s. The repeated-normal-hit scenario now retreats during cooldown, exercising ordinary combat without relying on the prior spam cadence. No unrelated balance retuning.

Chair and box states remain separate rendered paths. Laboratory metadata still has availableForms=[box,chair], fittingShadow=box. Chair should trigger investigation (then hostility if unresolved), not invisibility/assassination. Moving breaks both disguises by design; select them while stationary. Fresh render/control/guard evidence is being collected before concluding whether a defect exists. Assassination's distinct future visual treatment is deferred; no new assassination animation is created.
