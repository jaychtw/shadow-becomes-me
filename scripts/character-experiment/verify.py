"""Validate exported evidence properties, not aesthetic acceptance."""
from pathlib import Path
from PIL import Image
import json,hashlib,xml.etree.ElementTree as ET,math
R=Path(__file__).resolve().parents[2];A=R/'art/character-experiment';M=json.loads((A/'manifest.json').read_text());checks=[]
def check(name,condition):
 if not condition: raise AssertionError(name)
 checks.append(name)
def connected(im):
 a=im.getchannel('A'); pts={(x,y) for y in range(im.height) for x in range(im.width) if a.getpixel((x,y))>=128}
 if not pts:return 0
 components=0
 while pts:
  components+=1;stack=[pts.pop()]
  while stack:
   x,y=stack.pop()
   for dx,dy in ((1,0),(-1,0),(0,1),(0,-1),(1,1),(-1,-1),(1,-1),(-1,1)):
    n=(x+dx,y+dy)
    if n in pts:pts.remove(n);stack.append(n)
 return components
for f in M['frames']:
 p=A/f['png'];im=Image.open(p).convert('RGBA')
 check(f['id']+' dimensions',list(im.size)==f['canvas'])
 check(f['id']+' export checksum',hashlib.sha256(p.read_bytes()).hexdigest()==f['pngSha256'])
 check(f['id']+' source checksum',hashlib.sha256((A/f['source']).read_bytes()).hexdigest()==f['sourceSha256'])
 check(f['id']+' transparent canvas',im.getpixel((0,0))[3]==0 and im.getchannel('A').getextrema()==(0,255))
 box=im.getchannel('A').getbbox();check(f['id']+' no canvas clipping',box[0]>0 and box[1]>0 and box[2]<im.width and box[3]<im.height)
 check(f['id']+' one connected opaque silhouette',connected(im)==1)
 if f['motion']=='shadow-spike':
  check(f['id']+' pure black',all((r,g,b)==(0,0,0) for r,g,b,a in im.getdata() if a))
  root=ET.parse(A/f['source']).getroot();check(f['id']+' one closed path',len(root)==1 and root[0].tag.endswith('path') and root[0].attrib['d'].strip().endswith('Z'))
  # All extended pixels are above pelvis band, not just a declarative root label.
  check(f['id']+' extension above pelvis',all(im.getpixel((x,y))[3]==0 for y in range(166,im.height) for x in range(160,im.width)))
  check(f['id']+' opaque hand connection',im.getpixel((139,128))[3]==255)
check('attack sum 220 ms',sum(f['durationMs'] for f in M['frames'] if f['motion']=='shadow-spike')==220)
check('walk sum 1200 ms',sum(f['durationMs'] for f in M['frames'] if f['motion']=='guard-walk')==1200)
g=[f for f in M['frames'] if f['motion']=='guard-walk']
check('alternating support feet',all(f['landmarks']['near']['contact']!=f['landmarks']['far']['contact'] for f in g))
check('near then far support',all(f['landmarks']['near']['contact']==(i<6) for i,f in enumerate(g)))
for side in ('near','far'):
 stance=[f for f in g if f['landmarks'][side]['contact']]
 check(side+' stance baseline',all(f['landmarks'][side]['ankle'][1]==230 for f in stance))
 velocities=[(a['landmarks'][side]['ankle'][0]-b['landmarks'][side]['ankle'][0])*.55/.1 for a,b in zip(stance,stance[1:])]
 check(side+' sampled stance matches 58 world units/s',all(abs(v-58)<.002 for v in velocities))
 check(side+' swing lifts foot',any(f['landmarks'][side]['ankle'][1]<220 for f in g if not f['landmarks'][side]['contact']))
check('weight transfer bob',max(f['landmarks']['hipY'] for f in g)-min(f['landmarks']['hipY'] for f in g)>=4)
report={'checksPassed':len(checks),'failures':0,'checks':checks,'scope':'Pixel/source and landmark checks only; weight-transfer believability and artistic acceptance require visual review.'}
(R/'evidence/character-experiment/asset-checks.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({'pass':len(checks),'fail':0}))
