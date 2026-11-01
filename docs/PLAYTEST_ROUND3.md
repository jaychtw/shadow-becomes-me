# Playtest Round 3 — usability polish

Baseline `ad412b9d69f112a2e45a2e2c6ba3e02b3842fd15`, working branch `dev/recovery-art-pipeline`; AICP 1.2.1 and pinned UGDS 1.0.0 unchanged. Owner confirms Round 2 works including Devour; complete POC acceptance remains separate. This is an implementation checkpoint, not a final verification claim.

Implemented primary contextual cycle normal → Box → Chair → normal via C / mouse / touch Transform. Direct Box/Chair and 1/2 remain. Q/E keep previous/next disguise-only behavior for compatibility, explicitly documented. Current form is a live text readout and the Transform accessible name states current and next form. Moving from any disguise still exposes it; no engine or awareness edits.

Guard scene health now appears as a compact bar only when alive and wounded; exact health always remains in the bilingual text readout, while ? / ! and guard state remain. All accepted character/Devour/ground-contact/lab rendering is preserved.

Local build emits one BUILD.json identity shared by its footer and ZIP name, and places the complete module/image/style graph in a build-specific directory. The bundled Python launcher supplies no-store and ignores conditional cache headers. Check build fetches BUILD.json with no-store and reports mismatched open tabs without resetting play. Ordinary static servers retain their own entry-HTML caching policy, and already-open tabs must refresh. No service worker, telemetry or online dependency. The owner's exact stale-cache incident is not yet independently reproduced; it is not evidence of broken game rules.

Pending final checks: complete engine/browser/lifecycle/accessibility regressions, actual input recordings, desktop/mobile before-after health images, two successive packages at the same origin/browser profile, repeat packaging and preservation hashes. No merge/deploy/publish/costs. Stop after this cycle for owner review.
