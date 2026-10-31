from pathlib import Path
import xml.etree.ElementTree as ET,copy,json,hashlib
r=Path(__file__).resolve().parents[2];src=r/'art/laboratory-poc/reference/lab-keyframe.svg';out=r/'art/laboratory-poc/runtime'
out.mkdir(exist_ok=True)
root=ET.parse(src).getroot();layers=[]
for g in root:
 name=g.get('id')
 if not name or g.tag.endswith('defs') or name=='reference-characters':continue
 tree=copy.deepcopy(root)
 for child in list(tree):
  if not child.tag.endswith('defs') and child.get('id')!=name:tree.remove(child)
 ET.ElementTree(tree).write(out/(name+'.svg'),encoding='unicode')
 layers.append(name)
# Environment reference intentionally excludes all embedded actors.
ref=copy.deepcopy(root)
for child in list(ref):
 if child.get('id')=='reference-characters':ref.remove(child)
ET.ElementTree(ref).write(out/'environment-reference.svg',encoding='unicode')
(out/'manifest.json').write_text(json.dumps({'sourceSha256':hashlib.sha256(src.read_bytes()).hexdigest(),'canvas':[1680,640],'floorY':500,'layers':layers,'excluded':'reference-characters','runtimeOrder':'All scenery before actors; foreground does not occlude actors'},indent=2)+'\n')
