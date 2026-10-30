"""Package only the tested static site; no reference art, node_modules or server."""
import hashlib,json,pathlib,zipfile
root=pathlib.Path(__file__).resolve().parent.parent
files=sorted(p for p in (root/'dist').rglob('*') if p.is_file())
manifest={'baseCommit':'e1404aeb4ab60fb54f796a07c0f9276e0dac52e5','branch':'dev/first-playable-poc','files':[]}
for p in files:
 manifest['files'].append({'path':str(p.relative_to(root/'dist')),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
manifest['totalBytes']=sum(x['bytes'] for x in manifest['files'])
manifest['contentSha256']=hashlib.sha256(json.dumps(manifest['files'],sort_keys=True,separators=(',',':')).encode()).hexdigest()
(root/'evidence').mkdir(exist_ok=True)
zpath=root/'evidence/shadow-becomes-me-poc.zip'
with zipfile.ZipFile(zpath,'w',zipfile.ZIP_DEFLATED) as z:
 for p in files:z.write(p,p.relative_to(root/'dist'))
manifest['zipSha256']=hashlib.sha256(zpath.read_bytes()).hexdigest()
(root/'evidence/build-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(json.dumps(manifest,indent=2))
