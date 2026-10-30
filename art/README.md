# Asset roles and provenance

- `approved_laboratory_concept.png`: supplied in the owner's handoff ZIP. Approved **reference** for environment, lighting, layering and colored humans. Its depicted Shadow is superseded by GDD §3. Not loaded by the game and not copied to the static build.
- `dialogue_ui_future_reference.png`: supplied future narrative-interface reference. No production license inferred. Not loaded, copied, traced, or used as UI. Excluded from the static build. Dialogue remains deferred.
- `laboratory.svg`: original hand-authored game-ready **POC sample** illustration produced for this encounter. Uses layered vector geometry, window silhouettes, ceiling pipes, warm light cones, equipment, and a continuous floor. Six painted crates, two painted chairs; none is an entity or collider. Does not embed or sample the concept PNG. Asset is intentionally one single lab illustration, with guard/Shadow/exit labels rendered separately by the application. It is not final production-approved art.
- Character silhouettes and colored guard are original vector paths in `src/main.js` / `index.html`; the spike shares one path generator for both damage contexts.
- `tests/fixtures/chair-laboratory.svg` is an alternate original illustration for the metadata-swap test: six chairs, two crates. Not shipped. The fixture changes the painting and `fittingShadow`; gameplay code does not change.

No purchased, generated-service, externally hosted, or third-party production assets. Reference ownership and redistribution rights have not been independently established; no remote push or distribution has been performed.
