from pathlib import Path
from PIL import Image
import json,math
out=Path('evidence/playtest-round2')
for tag in ['before','after']:
 samples=json.loads((out/f'ground-{tag}.json').read_text());results=[]
 for s in samples:
  im=Image.open(out/s['file']).convert('RGB');d=s['dpr'];floor=int(s['floorTop']*d);bad=0;worst=0
  for x in range(max(0,int(s['x0']*d)),min(im.width,int(s['x1']*d))):
   black=[y for y in range(max(0,floor-int(15*d)),min(im.height,floor+1)) if max(im.getpixel((x,y)))<=10]
   if not black:bad+=1;continue
   gap=[y for y in range(max(black)+1,min(im.height,floor+1)) if max(im.getpixel((x,y)))>70]
   if gap:bad+=1;worst=max(worst,len(gap))
  results.append({'file':s['file'],'backgroundGapColumns':bad,'maxGapPixels':worst})
 (out/f'pixels-{tag}.json').write_text(json.dumps(results,indent=2)+'\n')
 print(tag,'gap-column total',sum(r['backgroundGapColumns'] for r in results),'max',max(r['maxGapPixels'] for r in results))
