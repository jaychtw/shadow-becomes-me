"""Publish the frozen accepted package; never rebuild or mutate its runtime."""
from pathlib import Path
import hashlib
import json
import shutil
import zipfile

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / '.publication/site'
ACCEPTED = '5e26b0c4b521186114d1041a98ccaa3b0cfe7f8d'
SOURCE = 'ed2ca26a9fca3fdd45eecab15d542597c1959d23'
BUILD_ID = 'r3-5c7c6e926759'
evidence = ROOT / 'evidence/playtest-round3'
manifest = json.loads((evidence / 'package-manifest.json').read_text())
archive = evidence / manifest['archive']
digest = lambda data: hashlib.sha256(data).hexdigest()
assert manifest['id'] == BUILD_ID and manifest['sourceCommit'] == SOURCE
assert digest(archive.read_bytes()) == manifest['zipSha256']
if OUT.exists():
    shutil.rmtree(OUT)
OUT.mkdir(parents=True)
published = []
with zipfile.ZipFile(archive) as package:
    assert set(package.namelist()) == {item['path'] for item in manifest['files']}
    for item in manifest['files']:
        name = item['path']
        assert not Path(name).is_absolute() and '..' not in Path(name).parts
        data = package.read(name)
        assert digest(data) == item['sha256'], name
        # Local-only launch helpers are not website runtime.
        if name in ('serve.py', 'README-launch.txt'):
            continue
        path = OUT / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(data)
        published.append(item)
(OUT / '.nojekyll').write_text('')
identity = json.loads((OUT / 'BUILD.json').read_text())
assert identity['id'] == BUILD_ID and identity['sourceCommit'] == SOURCE
assert identity['workingTreeModified'] is False
proof = {'acceptedCheckpoint': ACCEPTED, 'runtimeSource': SOURCE, 'buildId': BUILD_ID,
         'archive': manifest['archive'], 'zipSha256': manifest['zipSha256'],
         'siteFiles': published, 'additionalHostingFiles': ['.nojekyll'],
         'excludedLocalHelpers': ['serve.py', 'README-launch.txt'],
         'allPublishedRuntimeBytesEqualAcceptedPackage': True}
(ROOT / '.publication/preparation.json').write_text(json.dumps(proof, indent=2) + '\n')
print(f'Prepared {len(published)} unchanged accepted files: {BUILD_ID}')
