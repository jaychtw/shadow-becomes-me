# Shadow Becomes Me — Game Design Document

**Version:** 0.1.0 | **Status:** Owner-approved gameplay direction; first POC bounded below; future campaign provisional  
**Date:** 2026-10-30 | **Creative authority:** Project owner  
**Primary release platform:** Browser / GitHub Pages | **Future portability:** Godot-friendly design specification  
**Adopted standard:** [UGDS v1.0.0](https://github.com/jaychtw/game-development-standards/blob/374143e614ed9d95bf2c413fb13711e802f2133c/UGDS.md) pinned to standards repository commit `374143e614ed9d95bf2c413fb13711e802f2133c`  
**Collaboration:** [AICP v1.1.1](https://github.com/jaychtw/game-development-standards/blob/374143e614ed9d95bf2c413fb13711e802f2133c/AI-COLLABORATION-PROTOCOL.md), same snapshot pin.

## 1. Pitch and identity
A living, featureless black shadow escapes a military experiment and survives by reading the visual patterns of its surroundings, imitating familiar silhouettes, slipping past guards, and striking with its own sharpened body. **The core fantasy: you are not hiding in darkness; you are darkness.**

A 2D side-scrolling stealth action game with potential later Metroidvania structure. The first POC validates the distinctive mechanics, not the complete world or story.

## 2. Experience, tone and audience
- Suspense and situational observation, deliberate movement and recoverable mistakes; bright environments heighten contrast with a wholly black protagonist.
- Accessible to keyboard and touch players. Violence is stylized, not graphic; avoid gore in the first POC.
- First POC: one short laboratory encounter (roughly 1–2 minutes when successful), replayable.
- The player must infer the fitting camouflage from **visibly dominant eligible object silhouettes in the illustrated background**. No explicit answer indicator in normal play; teach the rule accessibly.
- Do not confuse the approved direction with a claim that actual production assets or animations already exist.

## 3. Art direction — required reference
**Approved environment image:** `../art/approved_laboratory_concept.png` (packaged here). Treat as **visual reference**, not an in-game background asset. Its bright, clean, muted, layered 2D laboratory environment; colored guards/scientists; illuminated architecture; dramatic yet readable contrast establish the target. Match the spirit and composition with original game-ready artwork and authentic 2D geometry. The title/caption text within reference art is not in-game UI.

**Authoritative Shadow override:** The Shadow shown within the concept image must **not** determine the playable character's final shape. Shadow is pure opaque black, no eyes/face/clothing/visible internal anatomy. **Idle/stationary:** an upright, human-sized draped silhouette reminiscent of the concept's guard posture, but solid black. **Moving:** collapses into a low, draped blob, sliding, never stepping. **Spiking:** a sharp geometric extension briefly protrudes and retracts; reuse the same core attack motion in stealth and combat. **Camouflage:** clean, all-black box/chair/etc. silhouettes; no borrowed colors or photorealistic detail. Smooth form deformation without smoke/particles necessary. Other humans are distinctly colored.

Composition: side-view side-scroller with readable floor/platform boundaries, guards, sight lines, and foreground collisions; avoid making art geometry contradict gameplay geometry. Do not use the approved concept as the entire playable background (UGDS-V01). Create a representative in-engine scene for separate visual review (UGDS-V04), comparing desktop and mobile screenshots against reference (UGDS-V06); never claim functional success equals final art approval.

## 4. Core gameplay rules — approved

### 4.1 Shadow forms and movement
- **Blob:** default mobile, sliding form; a visible blob is recognized as hostile immediately when within an ordinary guard's valid sight line.
- **Fitting camouflage:** a stationary black silhouette matching the scene's predefined `fittingShadow` ID; a normal guard **fully ignores** it even when visible. It can support an assassination ambush.
- **Unfitting camouflage:** stationary black silhouette with a different ID; a normal guard **investigates rather than attacks immediately**. This does **not** permit assassination, even during approach.
- Changing to movement breaks camouflage; form-changing while observed, and whether investigation cancels after an observed correction, are low-level POC tuning points, not grounds to add advanced guard-memory systems.
- The baseline upright idle silhouette is a character presentation state, **not** a fourth camouflage form. Its exposure/detection must be consistent and tested; conservatively treat it as an exposed Shadow, not a valid disguise.

### 4.2 Artwork-driven, metadata-defined camouflage
- Each authored scene has one predetermined fitting silhouette ID, e.g. `box`.
- The scene's **background drawing itself** visibly contains more instances of that eligible object than any *other eligible camouflage category*. The objects are **painted/drawn into background layers**, not spawned as interactive entity instances or placed as collision objects to satisfy the count.
- The visual majority is a **level authoring contract**, not a runtime calculation. Codex may decide the scene art's composition first and then set `fittingShadow`, or choose `fittingShadow` first and draw a corresponding dominant set of objects; both produce the same authored result.
- Runtime camouflage checks simply compare `shadow.form === scene.fittingShadow`.
- Only **eligible shapes in the scene's `availableForms`** count for player inference. Decorative lamps, screens, windows, equipment and guards do not automatically enter the comparison. Avoid ambiguous, obscured or near-tie compositions in the POC. Do not infer camouflage compatibility from location labels such as laboratory/office.
- The source of truth must be inspectable metadata with a documented visual review, not a claim that software counts painted pixels.

Example:
```json
{"sceneId":"lab_01","background":"lab_01","availableForms":["box","chair"],"fittingShadow":"box"}
```
Background illustration shows, e.g., four recognizable boxes and three recognizable chairs. The engine does not count them. A different lab scene can be chair-dominant and set `fittingShadow: "chair"`.

### 4.3 Guards: three reaction levels
| Seen Shadow state | Ordinary guard response | Player opportunity |
|---|---|---|
| Blob / exposed idle | Hostile immediately (in valid sight) | Dodge, retreat, normal spike |
| Fitting silhouette | Ignore completely | Wait for favorable position; ambush |
| Unfitting silhouette | Approach and inspect, then become hostile if unresolved | Change strategy, escape, normal spike; **no Assassin** |

Guards use a small, testable patrol → investigate → hostile state machine, with attack on hostile targets, readable notice/approach cues, a short configurable inspection window and deterministic line-of-sight logic. Investigation timing/range must be adjustable. Guards are not obliged to instantly teleport or detect through walls. No complex memory/hearing/suspicion meters in POC.

### 4.4 One contextual spike attack
Shadow generates the **same spike morphology** in both contexts, from its own body; one action input may resolve context automatically:
- **Assassin:** from a fitting camouflage while target is unaware and in range; instant takedown of ordinary unarmored guard. Later armored enemies excluded from instant kill.
- **Normal spike:** any other valid attack situation, including while unfitting/investigated or hostile; damages but **does not kill a full-health ordinary guard in one hit**. Can eventually defeat it through repeated attacks. Brief stagger permitted for readable combat without guaranteed stun-lock.
- Ambush eligibility is a **separate rule** from guard hostility. An investigating guard can be unaware of true identity yet remain ineligible for assassination if the disguise is unfitting.
- Precise HP values, range, cooldown, windup, stagger and whether a particular input first breaks camouflage are POC tuning parameters. Document chosen values; do not hard-code them into the GDD as permanent balance decisions.

## 5. POC playable slice — mandatory scope
A brightly lit laboratory room/corridor with readable platforms/floors and side-on movement, **one ordinary patrolling guard**, clearly illustrated background objects with one fitting silhouette (box vs chair), and one reachable exit. Aim for a compact demonstrable loop:
1. Start with control hints (EN/zh-TW), recognizable human-shaped idle Shadow; move to become sliding blob.
2. See the guard patrol/sight direction; exposed blob is detected when in sight.
3. Select/cycle silhouettes; when stationary, a **correct** form remains ignored and permits a lethal stealth spike in range.
4. Select an **incorrect** form; guard visibly approaches/inspects; allow an attempted escape or a normal non-one-hit-kill spike.
5. Reach the exit for success, or fail and restart, all without page reload.

**Shadow Traverse** (connected wall/ceiling ambient darkness) is a full-game vision item; it **is not required in this first POC**. Earlier POC discussion tentatively included a predefined traverse route, but owner subsequently made camouflage/guard/attack the defining mechanics; do not expand scope or assert a traversal unlock without a specific follow-up approval. If a minimal traverse sample fits without delaying the core mechanic, propose it separately rather than assume authorization.

### Suggested inputs, delegated for implementation
Keyboard: left/right or A/D to slide; cycle forms (e.g. Q/E or number keys); apply selected camouflage while stationary; one attack key (e.g. Space/X); restart (R); language toggle. Touch: prominent movement, form-cycle/select, transform, and attack controls, suitable for portrait/narrow widths or an explicitly supported landscape presentation. Avoid accidental mobile page scroll and keep targets sufficiently large. Controls are proposal, not an approved fixed keymap.

### Example deterministic acceptance scenarios
- `fittingShadow=box`: box ignored, chair investigated, blob hostile in identical guard sight conditions.
- Swap metadata to `chair` and match authored artwork: chair ignored, box investigated; no engine logic change.
- Guard completes inspection on wrong form: hostile, not instantly killed by one normal spike.
- Correctly disguised stationary Shadow strikes unaware unarmored guard: instant takedown.
- Wrong form attack during investigation: normal damage, no assassination.
- Player escapes line of sight / dies or is caught: clear retry path.
- Changing language does not reset encounter or inputs; keyboard and mobile touch both play through success and failure paths.

## 6. Story and future full-game vision — **deferred beyond POC**
Five tentative narrative acts: (1) escape the laboratory, (2) discover the experiment's origin, (3) survive pursuit and unlock Shadow Expansion, (4) return to hidden lab for revenge/erasure, (5) blend into the city and disappear. Potential locations: lab, office, street, forest/mountain, subway/bridge, roof, hidden laboratory. Future interconnected revisitable regions and progression gates are a Metroidvania aspiration, not current functionality.

Potential later mechanics: surface/ceiling connected-shadow traversal, Human Form disguise, Shadow Expansion flooding an enclosed room (unarmored instantly killed; armored/robotic lose a substantial portion of HP and stagger; exact damage math deferred), detection goggles and robotic/armored enemy classes. Goggles and armor are distinct enemy properties. No advanced systems are part of this POC.

**Dialogue UI:** The owner's illustrative reference `../art/dialogue_ui_future_reference.png` demonstrates a portrait + named-speaker + text panel. Preserve as a future storytelling/UI reference **only**. Do not use the screenshot as a production asset or copy its proprietary characters/interface. No character dialogue UI, portraits, localization corpus, cinematics, or story scripting in first POC. Narrative presentation gets a separate approved phase.

## 7. Technical boundaries and portability
- **Now:** static-site browser game for eventual GitHub Pages publication, no server runtime needed, no paid dependencies, no external accounts, no telemetry. Target HTML/CSS/TypeScript or JavaScript; Codex selects maintainable rendering approach with isolated, testable domain logic.
- **Later:** Godot version possible. Write game rules, scene metadata, tuning configuration and localization in engine-independent terms; do not add a heavyweight cross-engine abstraction or create a Godot project now.
- Scene data should describe form IDs, room identity, and gameplay metadata separately from rendering. Path naming and syntax can be platform-specific; design concepts must transfer.
- Browser first; no deployment, merges to main, service activation or paid work without separate owner approval. Work on a dedicated branch after repository verification.
- Persistence only if meaningful for the short POC; a locally persisted language preference is useful but must handle unavailable storage gracefully. No accounts.

## 8. Localization and accessibility
- **EN + zh-TW from first POC**, centralized resources and live switch without resetting state, including instructions, detection feedback, failure/success, labels, accessibility names.
- Keyboard-operable menus, visible focus, readable contrast, minimum practical touch targets (~44 CSS px), meaningful indicators in addition to color, reduced-motion support where nonessential transitions exist, mute if sound added.
- Layout verification at 320, ~390, ~768 and ~1440 CSS pixels. If landscape is preferred for play, provide a useful orientation notice without making touch gameplay impossible on supported phones.

## 9. QA and independent review
Unit-test scene-form comparisons, state transitions, investigation-to-hostile, assassination gate, nonlethal normal hit, cooldown/range, and restart. Browser-test real keyboard/touch interactions: intro → disguise → investigation → normal hit → restart; intro → correct disguise → assassination → exit; both locales and viewport classes. Capture in-engine desktop/mobile screenshots of active combat/disguise states. Perform automated accessibility checks and basic performance checks; mark physical-device and first-time-player tests unverified unless actually performed. Record commands, counts, build, limitations, and visual gap vs approved concept.

**Visual POC gate:** functional tests never imply approved art. Display the running scene, compare lighting, composition, colored guards, Shadow black silhouette/deformation, legibility, and consistency. Seek owner review before scaling asset production. Never use concept image as finished background.

## 10. Decision register
| ID | Decision | Status | Notes |
|---|---|---|---|
| SBM-001 | Title *Shadow Becomes Me* | Approved | Replaces *The Shadow* working title |
| SBM-002 | Browser/GitHub Pages target; Godot-rewritable GDD | Approved | Future engine not current development target |
| SBM-003 | Bright clean 2D style; colored humans; pure black featureless Shadow | Approved | Approved lab reference included; Shadow override authoritative |
| SBM-004 | Blob visible = hostile; fitting = ignored/ambush; unfitting = investigate/no ambush | Approved | Valid sight and awareness apply |
| SBM-005 | Artwork-defined majority; metadata-defined fittingShadow; no runtime counting | Approved | Background objects drawn into art |
| SBM-006 | Same spike: lethal Assassin in valid stealth; otherwise non-one-hit-kill normal damage | Approved | Exact combat timing/HP deferred |
| SBM-007 | First POC validates defining mechanics; dialogue UI later | Approved | Dialogue screenshot is future reference only |
| SBM-008 | Connected shadow traversal, Human Form, Expansion, progression, advanced enemies | Deferred | Preserve vision, exclude from POC |
| SBM-009 | Tie behavior, guard remembering morphs, exact positioning rules | Deferred | Avoid ties in POC; no advanced cognition |

## 11. UGDS applicability
UGDS v1.0.0 **P01–P05, L01–L02, A01, V01–V06, S02–S04, Q01–Q06, C01–C03** apply where triggered. **A02** applies if nonessential motion or sound; **S01** applies if meaningful persistence is introduced; **Q03** applies to deterministic scenario integrity. No exceptions approved. Report each applicable ID as Pass, Fail, N/A with reason, or Not Verified, rather than silently treating omission as a waiver.

## 12. Definition of done
**POC done:** bounded mechanically complete and tested scene with observed three-tier camouflage, original upright/blob motion, contextual spike behavior, guard investigation, exit/retry, responsive touch, bilingual live switch, and truthfully reported visual alignment/gaps. Owner acceptance of POC is separate from final production approval.

**v1.0 full release:** not yet scoped or authorized. Requires a later approved production brief and separate release approval under UGDS/AICP.

## 13. SBM-010 — Shadow Devour presentation commitment (2026-11-01)

Owner explicitly authorized a distinct authored solid-cocoon **Shadow Devour** presentation for the existing eligible stealth-assassination outcome. Ordinary attacks retain Shadow Spike. This supersedes §4.4's original shared-spike **visual** direction for assassination only; eligibility, immediate defeat, range, cooldown, health/awareness, movement and camouflage rules do not change. The four authored poses and alpha-mask handoff at `1c55239` establish the concrete visual starting point. No Shadow Expansion, extra attack input, enemy or release is authorized. [Implementation and evidence](SHADOW_DEVOUR.md). Status: bounded implementation authorized; final motion/mask/art acceptance pending owner review. Historical accepted baselines and separate closed refinement remain preserved.


## SBM-011 — Round 3 usability commitment (2026-11-01)

Owner confirms the Round 2 playable revision works, including Devour. Authorizes primary C / mouse / touch Transform sequence **normal Shadow → Box → Chair → normal Shadow**, with current/next form feedback. Existing 1/2 and direct Box/Chair selection remain; Q/E retain previous/next disguise-only compatibility. Wounded-only scene health bar plus exact textual guard health replaces the permanent pips. Build identity and cache-safe local packaging are authorized. No changes to fitting/exposure, awareness, damage, timing, range, accepted art/animation or POC extent. Implementation delivery still stops for owner playtest / POC acceptance; no release authority.
