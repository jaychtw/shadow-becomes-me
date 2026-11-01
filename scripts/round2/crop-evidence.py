from pathlib import Path
from PIL import Image,ImageDraw
import json,shutil,math
out=Path('evidence/playtest-round2');crops=out/'contact-crops';crops.mkdir(exist_ok=True)
for tag in ['before','after']:
 samples=json.loads((out/f'ground-{tag}.json').read_text())
 for s in samples:
  p=out/s['file']
  if p.parent==crops:continue
  im=Image.open(p);d=s['dpr'];center=(s['x0']+s['x1'])/2;scale=s['scale'];box=(max(0,int((center-130*scale)*d)),max(0,int((s['floorTop']-65*scale)*d)),min(im.width,math.ceil((center+130*scale)*d)),min(im.height,math.ceil((s['floorTop']+15*scale)*d)))
  if s['dpr']==1 and s['x']==260 and s['width'] in [1440,390]:shutil.copy2(p,out/f'{tag}-{s["width"]}-full.png')
  im.crop(box).save(crops/p.name);s['sourceViewportGeometry']={k:s[k] for k in ['x0','x1','floorTop']};s['clipDevicePixels']=box;s['x0']-=box[0]/d;s['x1']-=box[0]/d;s['floorTop']-=box[1]/d;s['file']='contact-crops/'+p.name;p.unlink()
 (out/f'ground-{tag}.json').write_text(json.dumps(samples,indent=2)+'\n')
for width in [1440,390]:
 panels=[Image.open(crops/f'ground-{tag}-{width}-1-260.png').convert('RGB') for tag in ['before','after']];w=max(p.width for p in panels)*3;h=sum(p.height for p in panels)*3+60;sheet=Image.new('RGB',(w,h),'#dde5df');draw=ImageDraw.Draw(sheet);y=0
 for tag,im in zip(['BEFORE / accepted ZIP','AFTER / vector with hidden floor overlap'],panels):
  draw.text((8,y+5),tag+' (3x contact crop)',fill='#142d38');y+=30;sheet.paste(im.resize((im.width*3,im.height*3),Image.Resampling.NEAREST),(0,y));y+=im.height*3
 sheet.save(out/f'ground-comparison-{width}.png')
