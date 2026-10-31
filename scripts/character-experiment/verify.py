"""Reference-led asset invariants; human visual acceptance remains separate."""
from pathlib import Path
from PIL import Image
import json,hashlib,xml.etree.ElementTree as ET,subprocess,io,re,math
R=Path(__file__).resolve().parents[2];A=R/'art/character-experiment';M=json.loads((A/'manifest.json').read_text());checks=[]
BASE='89cf4a4a03f3e42b518ce9184c8ed4a27ad287ed'
def baseline(path):return subprocess.check_output(['git','show',BASE+':'+path],cwd=R)
old=json.loads(baseline('art/character-experiment/manifest.json'))
def check(name,condition):
 if not condition:raise AssertionError(name)
 checks.append(name)
def connected(im):
 a=im.getchannel('A');pts={(x,y) for y in range(im.height) for x in range(im.width) if a.getpixel((x,y))>=128};components=0
 while pts:
  components+=1;stack=[pts.pop()]
  while stack:
   x,y=stack.pop()
   for dx,dy in ((1,0),(-1,0),(0,1),(0,-1),(1,1),(-1,-1),(1,-1),(-1,1)):
    n=(x+dx,y+dy)
    if n in pts:pts.remove(n);stack.append(n)
 return components
def path_points(d):return [float(n) for n in re.findall(r'-?\d+(?:\.\d+)?',d)]
ref=A/'reference/shadow-rest-candidate.svg';refpath=ET.parse(ref).getroot()[0].attrib['d']
check('reference SVG unchanged from owner handoff',ref.read_bytes()==baseline('art/character-experiment/reference/shadow-rest-candidate.svg'))
refpng=Image.open(R/'evidence/shadow-rest-integration/candidate-reference.png').convert('RGBA')
for f in M['frames']:
 p=A/f['png'];im=Image.open(p).convert('RGBA');root=ET.parse(A/f['source']).getroot()
 check(f['id']+' dimensions',list(im.size)==f['canvas'])
 check(f['id']+' export checksum',hashlib.sha256(p.read_bytes()).hexdigest()==f['pngSha256'])
 check(f['id']+' source checksum',hashlib.sha256((A/f['source']).read_bytes()).hexdigest()==f['sourceSha256'])
 check(f['id']+' transparent canvas',im.getpixel((0,0))[3]==0 and im.getchannel('A').getextrema()==(0,255))
 box=im.getchannel('A').getbbox();check(f['id']+' no clipping',box[0]>0 and box[1]>0 and box[2]<im.width and box[3]<im.height)
 check(f['id']+' connected opaque silhouette',connected(im)==1)
 if f['motion']=='shadow-spike':
  check(f['id']+' pure black',all((r,g,b)==(0,0,0) for r,g,b,a in im.get_flattened_data() if a))
  check(f['id']+' one closed path',len(root)==1 and root[0].tag.endswith('path') and root[0].attrib['d'].strip().endswith('Z'))
  points=path_points(root[0].attrib['d']);left,right=points[0],points[-4]
  check(f['id']+' baseline preserved',points[1]==232 and points[-3]==232 and points[-1]==232)
  check(f['id']+' flat continuous contact',all(im.getpixel((x,231))[3]==255 for x in range(math.ceil(left)+3,math.floor(right)-3)))
  check(f['id']+' no pixels below ground',im.getchannel('A').crop((0,232,512,256)).getbbox() is None)
  if f['extension']==0:
   check(f['id']+' exact authored resting path, no origin hint',root[0].attrib['d']==refpath)
   check(f['id']+' rest pixels equal candidate',im.tobytes()==refpng.tobytes())
  if f['extension']==1:
   before=ET.fromstring(baseline('art/character-experiment/'+f['source']))[0].attrib['d'];expected=path_points(before)
   actual=points
   expected=[n+(160 if i%2==0 else -8) for i,n in enumerate(expected)]
   check(f['id']+' peak attack is translation only',len(actual)==len(expected) and all(abs(a-b)<1e-5 for a,b in zip(actual,expected)))
 else:
  check(f['id']+' accepted guard source byte-identical',(A/f['source']).read_bytes()==baseline('art/character-experiment/'+f['source']))
  check(f['id']+' accepted guard PNG byte-identical',p.read_bytes()==baseline('art/character-experiment/'+f['png']))
  check(f['id']+' accepted guard manifest unchanged',f==next(o for o in old['frames'] if o['id']==f['id']))
check('first and final resting frames identical',(A/'frames/shadow-spike-00.png').read_bytes()==(A/'frames/shadow-spike-11.png').read_bytes())
check('attack schedule unchanged',[(f['extension'],f['durationMs']) for f in M['frames'] if f['motion']=='shadow-spike']==[(f['extension'],f['durationMs']) for f in old['frames'] if f['motion']=='shadow-spike'])
check('attack duration 220 ms',sum(f['durationMs'] for f in M['frames'] if f['motion']=='shadow-spike')==220)
check('walk metadata unchanged',M['motions']['guard-walk']==old['motions']['guard-walk'])
check('world scale unchanged',M['worldScale']==old['worldScale'])
check('same two motions / frame counts',len(M['frames'])==36 and len([f for f in M['frames'] if f['motion']=='shadow-spike'])==12)
report={'checksPassed':len(checks),'failures':0,'checks':checks,'scope':'Exact source, pixel, timing and preservation properties; not human aesthetic acceptance.'}
(R/'evidence/shadow-rest-integration/asset-checks.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({'pass':len(checks),'fail':0}))
