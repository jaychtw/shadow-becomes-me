from pathlib import Path
from PIL import Image
import json,subprocess,hashlib
r=Path(__file__).resolve().parents[2];a=r/'art/shadow-transformation';m=json.loads((a/'manifest.json').read_text());count=0
for f in m['frames']:
 im=Image.open(a/f['png']).convert('RGBA');alpha=im.getchannel('A')
 assert im.size==(512,256);count+=1
 assert alpha.getextrema()==(0,255);count+=1
 assert all((x,y,z)==(0,0,0) for x,y,z,v in im.get_flattened_data() if v);count+=1
 assert alpha.crop((0,232,512,256)).getbbox() is None;count+=1
 pts={(x,y) for y in range(232) for x in range(512) if alpha.getpixel((x,y))>=128};todo=set(pts);stack=[todo.pop()]
 while stack:
  x,y=stack.pop()
  for dx,dy in [(1,0),(-1,0),(0,1),(0,-1),(1,1),(-1,-1),(1,-1),(-1,1)]:
   p=x+dx,y+dy
   if p in todo:todo.remove(p);stack.append(p)
 assert not todo;count+=1
 for x in range(42,470):
  ys=[y for y in range(232) if (x,y) in pts]
  if ys:assert all((x,y) in pts for y in range(min(ys),232))
 count+=1
 assert hashlib.sha256((a/f['source']).read_bytes()).hexdigest()==f['sourceSha256']
 assert hashlib.sha256((a/f['png']).read_bytes()).hexdigest()==f['pngSha256']
for path in ['art/character-experiment','art/laboratory-poc','src/engine.js','src/scene.js','art/shadow-transformation/reference']:
 assert not subprocess.check_output(['git','diff','1c55239','--',path],cwd=r),path
(r/'evidence/devour/asset-results.json').write_text(json.dumps({'pass':count,'fail':0,'sourceAndPngHashesMatch':True,'acceptedCharacterLabReferencesEngineAndTuningUnchanged':True,'repeatExportResult':'See repeatability.json'},indent=2)+'\n');print(count,'asset assertions passed')
