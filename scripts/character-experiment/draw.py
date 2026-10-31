"""Original vector key poses, never reference-sheet crops. Python standard library only.
Edit silhouette control points, costume paths or gait landmarks here; each emitted SVG
is independently editable. Raster export is a separate Chromium operation.
"""
from pathlib import Path
import math,json,re,hashlib,xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'art/character-experiment'

def svg(w,body,label):
 return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="256" viewBox="0 0 {w} 256" role="img" aria-label="{label}">{body}</svg>\n'

def legacy_shadow(extension):
 # Smooth amorphous mound: no separate head, neck, shoulders or hanging hem.
 # Attack contour/control points and extension schedule remain unchanged.
 tip=151+188*extension; tipy=119-14*extension
 return f'''<path id="continuous-shadow" fill="#000000" d="
 M 38 240 C 47 226 55 208 61 182 C 65 155 62 122 68 96
 C 72 72 83 47 99 49 C 115 50 119 75 120 94
 C 120 102 120 106 121 111
 C 122 119 129 120 139 119
 C {146+22*extension:.2f} {117-5*extension:.2f} {tip-22:.2f} {tipy+1:.2f} {tip:.2f} {tipy:.2f}
 C {tip-25:.2f} {tipy+9:.2f} {157+25*extension:.2f} 136 141 137
 C 143 159 146 180 151 204 C 154 222 159 232 166 240
 L 38 240 Z"/>'''

# Read the concrete handoff path. Rest is never redrawn from verbal descriptions.
REFERENCE=OUT/'reference/shadow-rest-candidate.svg'
REST_D=ET.parse(REFERENCE).getroot()[0].attrib['d']

def curves(path):
 tokens=re.findall(r'[MCLZ]|-?\d+(?:\.\d+)?',path)
 i=0;start=None;segments=[]
 while i<len(tokens):
  command=tokens[i];i+=1
  if command=='Z':break
  count={'M':2,'C':6,'L':2}[command]
  points=[(float(tokens[j]),float(tokens[j+1])) for j in range(i,i+count,2)];i+=count
  if command=='M':start=points[0]
  elif command=='C':segments.append(points)
 return start,segments

def split(p0,segment):
 # De Casteljau at t=0.5: exact subdivision of the authored curve.
 p1,p2,p3=segment
 mid=lambda a,b:tuple((x+y)/2 for x,y in zip(a,b))
 a,b,c=mid(p0,p1),mid(p1,p2),mid(p2,p3)
 d,e=mid(a,b),mid(b,c);f=mid(d,e)
 return [a,d,f],[e,c,p3]

REST_START,rest_original=curves(REST_D)
REST_CURVES=[];position=REST_START
for i,segment in enumerate(rest_original):
 if i in (1,3,4,5):REST_CURVES.extend(split(position,segment))
 else:REST_CURVES.append(segment)
 position=segment[-1]
assert len(REST_CURVES)==10

def shadow(extension):
 if extension==0:
  return f'<path id="continuous-shadow" fill="#000000" d="{REST_D}"/>'
 target_start,target=curves(ET.fromstring('<svg>'+legacy_shadow(extension)+'</svg>')[0].attrib['d'])
 shift=lambda p:(p[0]+160,p[1]-8)
 target_start=shift(target_start);target=[[shift(p) for p in c] for c in target]
 assert len(target)==len(REST_CURVES)
 # Geometry morph, no opacity fade or detached overlaid blade.
 blend=math.sqrt(extension)
 lerp=lambda a,b:tuple(x+(y-x)*blend for x,y in zip(a,b))
 start=lerp(REST_START,target_start)
 segments=[[lerp(a,b) for a,b in zip(rest,attack)] for rest,attack in zip(REST_CURVES,target)]
 fmt=lambda p:f'{p[0]:.6f} {p[1]:.6f}'
 d='M '+fmt(start)+' '+' '.join('C '+' '.join(fmt(p) for p in c) for c in segments)+' L '+fmt(start)+' Z'
 return f'<path id="continuous-shadow" fill="#000000" d="{d}"/>'

def leg(hip,foot,front):
 hx,hy=hip; fx,fy=foot
 # Two-link IK from hand-authored contact/swing landmarks; knee bends forward.
 dx,dy=fx-hx,fy-hy; d=math.hypot(dx,dy); L1,L2=54,54
 a=(L1*L1-L2*L2+d*d)/(2*d); h=math.sqrt(max(0,L1*L1-a*a))
 kx=hx+a*dx/d+h*dy/d; ky=hy+a*dy/d-h*dx/d
 color='#263b4b' if front else '#1b2b39';light='#354e5e' if front else '#243b4a'
 return f'''<g id="{'near' if front else 'far'}-leg"><path d="M{hx:.2f} {hy:.2f} L{kx:.2f} {ky:.2f} L{fx:.2f} {fy:.2f}" fill="none" stroke="{color}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>
 <path d="M{hx+2:.2f} {hy+3:.2f} L{kx+3:.2f} {ky:.2f} L{fx+2:.2f} {fy-4:.2f}" fill="none" stroke="{light}" stroke-width="3"/>
 <path d="M{fx-7:.2f} {fy-5:.2f} L{fx+5:.2f} {fy-5:.2f} L{fx+7:.2f} {fy+1:.2f} Q{fx+17:.2f} {fy+2:.2f} {fx+16:.2f} {fy+9:.2f} L{fx-8:.2f} {fy+9:.2f} Z" fill="#101b23"/>
 <path d="M{fx-8:.2f} {fy+9:.2f} H{fx+16:.2f}" stroke="#46535a" stroke-width="2"/></g>'''

def foot(phase):
 phase%=1
 if phase<.5:
  return (96+31.63636*(1-4*phase),230,True)
 t=(phase-.5)*2
 # Hermite swing matches stance velocity at toe-off/heel-strike; small clearance.
 return (96+31.63636*(-1-2*t+12*t*t-8*t*t*t),230-5*math.sin(math.pi*t)**2,False)

def guard(phase):
 hy=125.5+2.5*math.cos(4*math.pi*phase);bob=hy-135
 a=foot(phase);b=foot(phase+.5)
 # Counter-swinging forearms and relaxed hands, no weapon added.
 swing=7*math.cos(2*math.pi*phase)
 fararm=f'<path d="M92 {81+bob} Q{88-swing} {107+bob} {94-swing*1.5} {133+bob}" fill="none" stroke="#1c3b53" stroke-width="13" stroke-linecap="round"/><path d="M{94-swing*1.5} {133+bob} l3 8" stroke="#b98967" stroke-width="8" stroke-linecap="round"/>'
 neararm=f'''<path d="M103 {82+bob} Q{108+swing} {106+bob} {111+swing*1.5} {130+bob}" fill="none" stroke="#2e526e" stroke-width="14" stroke-linecap="round"/>
 <path d="M105 {85+bob} Q{111+swing} {108+bob} {113+swing*1.5} {126+bob}" fill="none" stroke="#426682" stroke-width="3"/>
 <path d="M{111+swing*1.5} {130+bob} l2 9" stroke="#c59876" stroke-width="8" stroke-linecap="round"/>
 <path d="M102 {84+bob} l6 1 -1 10 -5 -2 Z" fill="#b49a58"/><path d="M104 {86+bob} l2 1 -1 5" stroke="#ead79a" fill="none"/>'''
 body=f'''<g id="far-arm">{fararm}</g>{leg((96,hy),b[:2],False)}{leg((96,hy),a[:2],True)}
 <g id="uniform" transform="translate(0 {bob})">
 <path d="M83 72 Q95 67 105 74 L115 94 111 127 115 139 Q96 145 78 138 L80 116 77 87 Z" fill="#294b66" stroke="#162c40" stroke-width="2"/>
 <path d="M87 79 L89 128 101 134 106 77" fill="#345a75"/>
 <path d="M81 99 L91 100 90 112 81 110 Z M99 99 L108 97 109 108 99 110 Z" fill="#213f57" stroke="#486b83"/>
 <path d="M96 81 L96 126" stroke="#1b354b" stroke-width="2"/><path d="M80 130 L112 130 114 137 79 137 Z" fill="#142631"/>
 <rect x="95" y="130" width="8" height="6" rx="1" fill="#aeb9b4"/><rect x="81" y="127" width="7" height="13" rx="2" fill="#182a36"/>
 <path d="M88 66 L89 77 97 82 104 73 103 62 Z" fill="#bc8c69"/>
 <path d="M87 45 Q89 33 102 36 Q112 38 111 51 L116 57 110 60 108 69 Q98 74 91 66 L87 57 Z" fill="#c89b77"/>
 <path d="M87 44 L92 45 92 60 96 65 91 64 86 56 Z" fill="#222e36"/>
 <path d="M86 39 Q95 30 106 36 L110 43 120 47 119 50 86 48 Z" fill="#24435e" stroke="#142b3e" stroke-width="2"/>
 <path d="M87 43 L110 45" stroke="#607f94" stroke-width="2"/><path d="M103 39 l4 1 -1 4 -3 -1 Z" fill="#cab16b"/>
 <path d="M109 52 l3 1" stroke="#33302b" stroke-width="1.5"/><path d="M106 64 l4 -1" stroke="#825e48"/>
 </g><g id="near-arm">{neararm}</g>'''
 def bend(f):
  d=math.hypot(f[0]-96,f[1]-hy)
  return round(math.degrees(2*math.acos(min(1,d/108))),4)
 return body,{'near':{'ankle':[round(a[0],4),round(a[1],4)],'contact':a[2],'kneeFlexDegrees':bend(a)},'far':{'ankle':[round(b[0],4),round(b[1],4)],'contact':b[2],'kneeFlexDegrees':bend(b)},'hipY':round(hy,4)}

frames=[]
# Entire extension/retraction is 220 ms, matching the existing spike visibility.
extensions=[0,.08,.24,.52,.83,1,1,.78,.46,.19,.04,0]
for i,e in enumerate(extensions):
 name=f'shadow-spike-{i:02}'
 (OUT/'source'/f'{name}.svg').write_text(svg(512,shadow(e),f'Shadow spike frame {i}'))
 frames.append({'id':name,'motion':'shadow-spike','source':f'source/{name}.svg','png':f'frames/{name}.png','canvas':[512,256],'pivot':[256,232],'baseline':232,'durationMs':20 if i<10 else 10,'extension':e,'restBlend':round(math.sqrt(e),6),'attackTransform':[160,-8]})
for i in range(24):
 name=f'guard-walk-{i:02}'; body,landmarks=guard(i/24)
 (OUT/'source'/f'{name}.svg').write_text(svg(192,body,f'Guard walking frame {i}'))
 frames.append({'id':name,'motion':'guard-walk','source':f'source/{name}.svg','png':f'frames/{name}.png','canvas':[192,256],'pivot':[96,240],'durationMs':50,'landmarks':landmarks})
manifest={'version':3,'revision':'Authored candidate rest with continuous body-to-attack morph; accepted guard unchanged','status':'experimental; awaiting fresh owner visual acceptance','worldScale':.55,'baseline':{'shadow-spike':232,'guard-walk':240},'facing':'right; mirror around pivot for left','motions':{'shadow-spike':{'durationMs':220,'loop':False,'note':'Presentation only; existing engine untouched. Preview repeats with 700 ms rest.'},'guard-walk':{'durationMs':1200,'loop':True,'nominalTravelWorldUnitsPerSecond':58,'sourceTravelPerCycle':126.54545}},'frames':frames,'restReference':{'path':'reference/shadow-rest-candidate.svg','sha256':hashlib.sha256(REFERENCE.read_bytes()).hexdigest(),'mapping':'Exact authored 512x256 path; pivot (256,232), no scaling or silhouette redesign'},'provenance':'ChatGPT-authored rest candidate used directly; prior original local attack endpoint and accepted guard preserved.'}
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('12 Shadow + 24 guard editable SVG frames and manifest written.')
