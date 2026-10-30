# Implementation and tuning

## Structure

- `src/engine.js`: deterministic encounter rules, scene validation, guard state transitions, spike classification, health, exit and failure. No DOM or browser dependencies. Time step is capped to 50 ms to avoid unfair large jumps after tab suspension.
- `src/scene.js`: engine-independent scene and tuning records, in world units/seconds. Positions lie along one continuous side-view floor at y=500. Bounds clamp sliding; background furniture is noncolliding distant scenery. `occluders` supports authored line-of-sight barriers; this corridor has none. Unit fixtures verify occlusion separately.
- `src/i18n.js`: English and Traditional Chinese resources including dynamic text and accessibility labels.
- `src/main.js`: inputs, animation loop, camera, original character paths, rendering and safe local language preference. The read-only `window.__shadow.snapshot()` provides test observability; it cannot mutate live state.
- `art/laboratory.svg`: original authored lab background; no reference PNG in the runtime or build.
- `scripts/build.js`: clean static build with only game files and the original lab SVG, using relative paths. No server runtime, bundler, CDN, paid tools, telemetry, or network request by game logic.

## Rule decisions within delegated tuning scope

`availableForms = [box, chair]`; authored `fittingShadow = box`. Runtime compares the current form directly to the metadata, never counts objects or infers compatibility from “lab”. Six crates vs two chairs are painted in the background. The alternative illustration fixture reverses that majority; tests swap metadata to chair with unchanged engine logic.

Idle is an exposed upright human-like draped black silhouette. Sliding always becomes an exposed low blob; releasing movement restores upright. Box/chair buttons or keys apply stationary camouflage. Changing form during held movement does not stop movement or preserve disguise. Cycling is Q/E; touch provides direct form selection. No eyes, clothing detail, body color, smoke, walking or particles on Shadow.

Guards see only in their facing direction and sight range (with a small 18-unit overlap region). Visible exposed Shadow triggers hostility that update. Fitting camouflage is fully ignored by a patrolling guard; an unfitting shape triggers approach and then inspection. Inspection time begins when within inspection distance. Correcting to a fitting form while visibly investigated cancels investigation back to patrol. Once hostile, the guard remains hostile until defeated or restart; there is no new memory, hearing, or suspicion system. Behind-guard assassination is possible if still fitting and unaware. The guard's `?` / `!`, text, HP pips, and sight cone make reactions observable.

The same spike visual and input serve both contexts. An unaware **patrolling**, unarmored guard within range can be killed instantly from fitting camouflage. Investigation by itself never grants eligibility. Any other in-range attack does one ordinary damage, including against a hostile guard from a fitting shape. The spike faces a valid nearby target; a miss faces the player's last movement direction. No hitbox is inferred from artwork pixels.

Movement and cooldowns stop in intro, help, pause, terminal result states, or blurred/hidden tabs. Input clears on lost focus and pointer cancellation; no stuck sliding. Language switching preserves game state and held input. Only valid own locale keys are restored from local storage; missing, corrupt, inherited-property names and blocked storage fall back safely. No encounter progress is stored for this short replayable POC.

## POC tuning (not permanent GDD rules)

| Parameter | Value |
| --- | --- |
| World / floor | 1680 wide / y=500 |
| Spawn / exit threshold | x=125 / x=1550 |
| Guard spawn / patrol | x=900 / x=640–1240; initially right-facing |
| Sliding / patrol speed | 185 / 58 units/sec |
| Investigating / hostile speed | 88 / 112 units/sec |
| Guard sight range | 330 units |
| Inspection distance / duration | 76 units / 2.5 sec after arrival |
| Player / guard health | 3 / 3 |
| Normal spike damage | 1 |
| Spike range / cooldown | 105 units / 0.7 sec |
| Spike visible duration / guard stagger | 0.22 / 0.38 sec |
| Guard attack range / interval | 52 units / 1.05 sec; 1 damage |

A quick stealth solution is roughly 10–20 seconds; trying forms and learning the guard can take the proposed 1–2 minutes. This is an intentionally small encounter; not validated as engaging or well-balanced by a first-time human player. Do not expand it merely to increase duration.

## Portability

Rules and tuneable data are plain JavaScript records with string form/state IDs. They can transfer to a future engine as data and state transitions. The SVG camera, DOM controls, and browser animation adapter are platform-specific. No Godot project or speculative cross-engine framework is included.
