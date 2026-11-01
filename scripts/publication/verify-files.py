"""Verify canonical public bytes, identity and observed cache headers after deploy."""
from pathlib import Path
from datetime import datetime, timezone
import hashlib
import json
import os
import urllib.request

root = Path(__file__).resolve().parents[2]
proof = json.loads((root / '.publication/preparation.json').read_text())
base = os.environ.get('PUBLIC_URL', 'https://jaychtw.github.io/shadow-becomes-me/').rstrip('/') + '/'
results = []
for item in proof['siteFiles']:
    path = item['path']
    # Test the canonical, unbusted URL. No route substitution or synthetic responses.
    with urllib.request.urlopen(base + path, timeout=40) as response:
        data = response.read()
        actual = hashlib.sha256(data).hexdigest()
        assert response.status == 200 and actual == item['sha256'], path
        results.append({'path': path, 'status': response.status, 'sha256': actual,
                        'cacheControl': response.headers.get('Cache-Control'),
                        'contentType': response.headers.get('Content-Type')})
out = Path(os.environ.get('PUBLIC_EVIDENCE_DIR', root / '.publication/public-evidence'))
out.mkdir(parents=True, exist_ok=True)
(out / 'public-integrity.json').write_text(json.dumps({
    'checkedAt': datetime.now(timezone.utc).isoformat(), 'url': base,
    'buildId': proof['buildId'], 'runtimeSource': proof['runtimeSource'],
    'allCanonicalPublicRuntimeHashesMatch': True, 'files': results}, indent=2) + '\n')
print(f'Verified {len(results)} canonical public runtime files at {base}')
