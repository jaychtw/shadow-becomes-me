from pathlib import Path
import xml.etree.ElementTree as E,re,math,json,hashlib
r=Path(__file__).resolve().parents[2];a=r/'art/shadow-transformation';root=E.parse(a/'reference/hollow-envelope-study.svg').getroot()
poses=[p.get('d') for g in root if g.tag.endswith('g') for p in g if p.get('fill')=='#08090a'];assert len(poses)==4
rest=E.parse(r/'art/character-experiment/reference/shadow-rest-candidate.svg').getroot()[0].get('d');poses[0]=rest

def sample(d):
 tokens=re.findall(r'[MCLZ]|-?\d+(?:\.\d+)?',d);i=0;points=[];pos=None
 while i<len(tokens):
  cmd=tokens[i];i+=1
  if cmd in ('Z','L'):break
  n=2 if cmd=='M' else 6;nums=list(map(float,tokens[i:i+n]));i+=n
  if cmd=='M':pos=tuple(nums);points.append(pos)
  else:
   p0=pos;p1=nums[:2];p2=nums[2:4];p3=nums[4:6]
   for k in range(1,41):
    t=k/40;points.append(tuple((1-t)**3*p0[j]+3*(1-t)**2*t*p1[j]+3*(1-t)*t*t*p2[j]+t**3*p3[j] for j in range(2)))
   pos=tuple(p3)
 lengths=[0]
 for x,y in zip(points,points[1:]):lengths.append(lengths[-1]+math.dist(x,y))
 result=[];j=0
 for k in range(129):
  target=k/128*lengths[-1]
  while j<len(points)-2 and lengths[j+1]<target:j+=1
  t=(target-lengths[j])/(lengths[j+1]-lengths[j]);result.append(tuple(points[j][i]+t*(points[j+1][i]-points[j][i]) for i in range(2)))
 return result
samples=[sample(d) for d in poses];keys=[(0,0),(80,1),(160,2),(260,2),(420,3),(560,0)];frames=[]
for t in range(0,561,20):
 for (start,pi),(end,pj) in zip(keys,keys[1:]):
  if start<=t<=end:break
 f=(t-start)/(end-start);f=f*f*(3-2*f)
 points=[tuple(x+(y-x)*f for x,y in zip(a,b)) for a,b in zip(samples[pi],samples[pj])]
 d=rest if t in (0,560) else 'M '+' L '.join(f'{x:.3f} {y:.3f}' for x,y in points)+' Z'
 name=f'devour-{t//20:02}';svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="512" height="256" viewBox="0 0 512 256"><path fill="#000000" d="{d}"/></svg>'
 (a/'source'/f'{name}.svg').write_text(svg+'\n');frames.append({'id':name,'timeMs':t,'d':d,'source':f'source/{name}.svg','png':f'frames/{name}.png'})
(a/'manifest.json').write_text(json.dumps({'durationMs':560,'frameStepMs':20,'keys':keys,'canvas':[512,256],'pivot':[256,232],'referenceSha256':hashlib.sha256((a/'reference/hollow-envelope-study.svg').read_bytes()).hexdigest(),'frames':frames},indent=2)+'\n')
