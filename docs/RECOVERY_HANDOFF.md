# Recovery handoff — 2026-10-31 (Asia/Taipei)

## Incident and scope

The owner reports that a previous cloud workspace became inaccessible before its art-feasibility branch was pushed. Support recovery is separate. This assignment verifies the surviving POC, preserves references and decisions, and offers a bounded replacement experiment; it does not reconstruct accepted art or produce a laboratory level.

## Evidence classes

| Class | Findings |
| --- | --- |
| Verified from repository | GitHub `main` = `e1404aeb4ab60fb54f796a07c0f9276e0dac52e5`; `dev/first-playable-poc` = `871dabff06c703b4ea39eb4a3c0022a99a6e7340`, verified by `git ls-remote origin` on 2026-10-31. Dedicated `dev/recovery-art-pipeline` starts from that POC. Initial worktree clean; no applicable AGENTS.md found under /workspace or /tmp. |
| Verified from attachments | Original GDD, brief, dated state, lab concept and deferred dialogue reference; art-pipeline brief and three composite approved reference sheets. [Manifest](../evidence/recovery-2026-10-31/attachment-manifest.json) records archive/member SHA-256 hashes. Original handoff preserved in [recovery sources](recovery-sources/original-handoff/README.md); art references in [art/references](../art/references/art-pipeline/CODEX_BRIEF.md). |
| Owner-confirmed historical decision | `f870b40` character feasibility accepted at 80/100; separately, corrected forward-arm/hand-origin spike `13eba8b` explicitly Accepted and Closed. Neither acceptance is reopened; neither approves a new replacement. |
| Agent-reported but not reproduced | Original 55 transparent frames, editable masters/manifest, animation viewer; missing laboratory Offer, 1280×640 bay, six layers, `/lab-study/`, bilingual controls, reduced motion, PNG/SVG comparison and recordings; later 30 unit / 14 browser / 8 accessibility-audit report. No matching source or test evidence recovered. |
| Unknown | Exact lost implementation, full missing commit SHAs, original visual quality beyond supplied references, physical-phone performance, production-scale art reuse, original workspace recoverability, current repository Pages settings and external integrations. |

## Missing history and assets

`f870b40`, `13eba8b`, `055d350`, and `da9e949` are historical short identifiers only. They were absent from local objects and inspected surviving history; fsck found no unreachable recovery commits. No Git bundles or lost art snapshots were found in accessible workspace/tmp storage. Neither supplied ZIP contains Git history or the missing deliverables.

Missing: animation source/exports and 55-frame manifest; acceptance closure files from `055d350`; `docs/laboratory-offer/OFFER.md`, `art/laboratory-study/`, `lab-study/`, `evidence/laboratory-offer/`, desktop/mobile GIFs, PNGs and WebMs. No missing hash, test outcome, artwork or acceptance trail has been recreated.

## Surviving implementation and discrepancies

The POC has a deterministic JS engine, SVG/DOM renderer, one illustrated corridor, one guard, metadata-defined box/chair camouflage, English/Traditional Chinese, keyboard/touch, exit/failure/retry, unit and browser tests. Engine, renderer, timing, hitboxes and gameplay assets are unchanged by recovery.

Unlike the missing accepted milestone, the surviving renderer uses static vector forms, CSS path transitions and a separate triangular spike path; the guard is positioned/flipped rather than driven by an alternating walk cycle. It has no accepted frame set, animation manifest, standalone character viewer, six-layer lab study or Offer. Do not describe the old POC's spike as the accepted corrected hand-origin animation. Keeping it as a mechanics baseline is not approval of its visuals.

The attached composite sheets contain labels, checkerboards and mixed poses; some headings claim “game ready” and show obsolete “THE SHADOW” naming or traversal. Those are reference-image contents, not production evidence or current scope. The GDD's pure-black, featureless Shadow override and title prevail; traversal/dialogue remain deferred. Older documents' AICP 1.1.1 references are historical; current owner adoption is [AICP 1.2.0](standards/README.md). UGDS 1.0.0 stays pinned.

## Frozen design and decisions

Preserve upright Shadow at rest, low sliding blob in motion, opaque black silhouette, authored dominant eligible camouflage with runtime metadata comparison, exposed-hostile / fitting-ignored / unfitting-investigated guard behavior, contextual assassination versus ordinary nonlethal first hit, existing combat timing, exit/restart, EN/zh-TW and keyboard/touch. No engine replacement, Godot, Blender, paid generation, new gameplay, environment production, deployment or Possibility work.

Historical baseline acceptance (80/100) and spike acceptance/closure remain separate decisions. Any reconstructed character art requires fresh owner visual review. Laboratory work remains Explore/Offer only. Full production remains uncommitted.

## Fresh verification and reproducibility

See [fresh QA](RECOVERY_QA.md), its commands and new evidence. Previous reports remain in their original locations and are not relabeled as this run. Validation runs from an external copy to avoid overwriting tracked historical screenshots/results. Fresh build/runtime bytes match the surviving POC's seven-file, 39,076-byte artifact; build-script metadata still names the original branch/base and is not new branch provenance.

## Checkpoint safety and status (original recovery observation)

No `.github` workflows exist in either surviving branch or the proposed recovery changes. No publish/deploy scripts or runtime external services are introduced. Read-only Git access works. GitHub CLI requests for `/repos/jaychtw/shadow-becomes-me/pages`, `/actions/workflows` and repository metadata returned `Forbidden`; native Git access does not establish API permission. Repository visibility and Pages configuration could not be independently read through that API.

**Push blocked pending verification of Pages/deployment settings.** The owner explicitly conditions checkpoint authorization on verified absence of deployment, publication, activation and additional expenditure. We cannot claim that condition from source inspection alone. No push, settings change, force-push, merge, deployment, paid service or website publication was attempted. This is an access/verification blocker, not a known application failure. Supply read-only access to repository Pages/workflow settings or owner-provided current configuration evidence, then recheck branch tips before a normal push. Do not disable settings as a workaround.

## Backups and reconciliation

See [backup instructions](RECOVERY_BACKUP.md). Local verified archives provide recovery artifacts, not an independently durable off-machine copy. GitHub checkpoint remains blocked; download the backups outside this cloud session to establish an additional copy.

If Support returns the original workspace, first export its branch as a Git bundle and assets separately, hash and verify both, and inspect in a separate recovery location. Compare original refs, manifests, acceptance records and runtime timing against this surviving baseline. Preserve both histories; do not reset, overwrite, fabricate original SHAs, or automatically replace accepted artwork. Propose a reviewed integration branch and obtain approval for any materially different replacement; do not merge automatically.

## Next commitment and retrospective

[Reconstruction Offer](RECONSTRUCTION_OFFER.md) compares wait/reconstruct/hybrid. No substantial art work is started. Owner must select an approach, explicitly authorize its bounded execution, then separately judge technical evidence and visual acceptance. Release remains outside that decision.

Lesson observed: local-only completion leaves an evidence and delivery gap when a workspace disappears. Keep small verified source checkpoints and downloadable verified backups; neither a local commit nor a passing test implies remote availability or acceptance. This is recorded as a project-specific recovery procedure; no universal standards change is proposed.

## Subsequent preservation update

Owner reviewed Pages/Actions settings: Pages uses Actions, no deployment workflow configured, no existing Actions workflows; read-only default workflow token. Owner then explicitly authorized the checkpoint push. Recovery checkpoint `89b358c681c133d9045e3556cfad59001caaa75c` was pushed and independently fetched/verified on GitHub. The prior blocker above is historical and resolved. New limited character experiment and current gate are indexed in [PROJECT_STATE](PROJECT_STATE.md); original missing assets and historical acceptances remain unchanged.
