# Recovery backups and restoration

Backups are created **after the recovery checkpoint commit** outside the checkout at `/workspace/recovery-backups/`:

- `shadow-recovery.bundle`: self-contained `dev/recovery-art-pipeline` history including surviving POC ancestry.
- `shadow-recovery-source.tar.gz`: separate committed source, assets, references and evidence archive; excludes Git metadata and installed dependencies.
- `input-archives/`: exact supplied ZIPs.
- `manifest.json`: checkpoint SHA, SHA-256 hashes, sizes and per-source-file hashes.
- `verification.txt`: bundle verification and restored-checkout integrity results.

These are local artifacts. Integrity and restoration are verified, but independent persistent/off-machine storage is **not verified**. A second copy in the same ephemeral cloud filesystem does not establish durability. Download/copy the directory to owner-controlled persistent storage; retain its manifest and verify SHA-256 there. GitHub push is separately blocked on deployment-settings verification. No claim of a durable remote checkpoint is made.

## Restoration procedure

1. Verify archive and bundle SHA-256 against `manifest.json` before use.
2. Run `git bundle verify /path/shadow-recovery.bundle` from an existing Git repository, or inspect it with `git bundle list-heads` before cloning. This bundle is expected to contain complete ancestry with no missing prerequisites.
3. Run `git clone -b dev/recovery-art-pipeline /path/shadow-recovery.bundle /new/recovery-checkout`. Confirm `git rev-parse HEAD` equals the manifest checkpoint and `git fsck --full` succeeds. Do not overwrite an existing checkout.
4. Alternatively, extract `shadow-recovery-source.tar.gz` into an empty directory and compare all source-file hashes to the manifest. This source-only archive cannot restore Git history; use the bundle for history.
5. Install locked packages with `npm ci --no-audit --no-fund`, then follow [fresh QA](RECOVERY_QA.md). Processes and injected authentication are not preserved in backups.
6. A bundle-cloned origin is a local file. After inspecting the checkpoint and current remote state, explicitly configure the intended GitHub remote. Never assume cloning the bundle pushed it or grants publication authority.

Original-workspace recovery remains separate: preserve any returned bundle and sources intact, inspect differences in another location, and seek review before reconciling materially different artwork. Never reset either history to manufacture continuity.
