from pathlib import Path
import hashlib,json,zipfile,subprocess,os
r=Path(__file__).resolve().parents[2];out=r/os.environ.get('EVIDENCE_DIR','evidence/playable-laboratory');files=[]
with zipfile.ZipFile(out/'playable-laboratory.zip','w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted((r/'dist').rglob('*')):
  if not p.is_file():continue
  name=p.relative_to(r/'dist').as_posix();data=p.read_bytes();info=zipfile.ZipInfo(name,(1980,1,1,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,data)
  files.append({'path':name,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()})
(out/'build-manifest.json').write_text(json.dumps({'sourceCheckpoint':subprocess.check_output(['git','rev-parse','HEAD'],cwd=r,text=True).strip(),'files':files,'runtimeBytes':sum(f['bytes'] for f in files),'zipSha256':hashlib.sha256((out/'playable-laboratory.zip').read_bytes()).hexdigest()},indent=2)+'\n')
