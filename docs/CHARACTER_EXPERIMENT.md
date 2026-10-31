# Limited character reconstruction experiment

Status: implementation and evidence verification in progress; not accepted artwork.

Authorized by the owner on 2026-10-31 (Asia/Taipei), limited to the accepted Offer's hand-origin spike and guard-walk micro-spike. This is new replacement work; historical acceptance of `f870b40` (80/100) and separate closure of `13eba8b` remain unchanged and do not approve these drawings.

Current AICP 1.2.1 is pinned at `b8b9de0d4faaf666fb53cec83ff8516bccf5bd5b`; UGDS 1.0.0 remains pinned at `374143e614ed9d95bf2c413fb13711e802f2133c`. No source from the missing commits was recovered.

## Implementation boundary

24 original editable SVGs and transparent PNGs: 12 continuous-contour Shadow attack frames and 12 uniformed guard walk frames. [Sources, manifest and recipe](../art/character-experiment/README.md). [Standalone preview](../character-study/index.html) runs locally through HTTP; GitHub source links do not execute it. It is deliberately excluded from the normal production build. No gameplay adapter or engine integration is provided.

The spike is part of one closed black outer contour rooted at the forward arm/hand; no separate blade object or pelvic-origin extension. Guard motion uses alternating support/swing feet, articulated knee poses, a small hip-height variation and opposing arm swing. All source drawings are editable independently; a Python generator records original control points and costume details. Approved sheets guide style, not crops or production-source recovery.

Exact gameplay source, original runtime art, hitboxes, metadata, tuning and rules remain unchanged. The attack presentation is 220 ms, preserving the existing visual interval; the existing 700 ms cooldown is not changed. The standalone preview inserts a 700 ms rest for review, making its loop 920 ms; this is not a game attack scheduler.

Technical evidence and the final review assessment will be appended after fresh validation. No merge, deployment, publication, environment production or paid tools are authorized. Stop at this experiment and await owner visual review.
