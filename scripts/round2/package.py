from pathlib import Path
import subprocess,hashlib,json,zipfile,os
r=Path(__file__).resolve().parents[2];out=r/'evidence/playtest-round2';sha=subprocess.check_output(['git','rev-parse',os.environ.get('ROUND2_SOURCE_COMMIT','HEAD')],cwd=r,text=True).strip();assert not subprocess.check_output(['git','diff',sha,'--','src','index.html','style.css','art','scripts/build.js','package.json','package-lock.json'],cwd=r);name=f'shadow-becomes-me-playtest-r2-{sha[:7]}'
readme=f'''SHADOW BECOMES ME — PLAYTEST ROUND 2
Runtime source commit: {sha}
Branch: dev/recovery-art-pipeline
Archive: {name}.zip

1. Extract ALL files to a fresh folder; do not overlay an older build.
2. Open a terminal in that folder (it contains index.html).
3. Run: python3 -m http.server 8080 --bind 127.0.0.1
   Windows alternative: py -m http.server 8080 --bind 127.0.0.1
4. Open http://127.0.0.1:8080/ in a current browser. Do NOT double-click
   index.html/file://; ES modules require HTTP. Stop server with Ctrl+C.
5. If port 8080 is occupied by an older build, stop that server first or
   use a different port and matching URL. Hard refresh / use a fresh tab.
   Check http://127.0.0.1:8080/BUILD.json to confirm the source commit above.

DEVOUR WALKTHROUGH — same eligibility and accepted animation
- Enter the encounter. Move right toward the first pair of boxes,
  remaining behind the guard. Release movement before transforming.
- Choose Box / 箱子 (key 1 or the touch button). Stay still and wait for
  the patrolling guard to turn and approach within attack reach.
- Click/tap Spike / 尖刺 once (X/Space on keyboard). This contextual
  attack becomes Devour when eligible. Remain stationary for
  at least 0.56 seconds to see the full cocoon and disappearance.
- Move to the right exit afterward. Keyboard A/D or arrows move;
  touch arrows may be held. Language toggle is live EN/Traditional Chinese.

Chair is a valid transformation but UNFITTING in this laboratory.
Moving breaks both disguises. An attack without fitting/awareness/range
eligibility is Spike or a miss, not Devour. Moving immediately after a
successful assassination cancels the accepted Devour presentation.
Logical defeat is immediate regardless of the remaining visual animation.
Do not weaken eligibility to test the effect. Pause/help freeze it;
restart clears it. No new combat rules or animation redesign in Round 2.

This build hardens moving-form floor contact; rest, Spike, Devour,
guard sources and laboratory artwork remain unchanged. Physical phones
and the owner's precise browser/display setup are not independently tested.
This is a local review build, not a release or deployed website.
'''
files={p.relative_to(r/'dist').as_posix():p.read_bytes() for p in sorted((r/'dist').rglob('*')) if p.is_file()}
files['README-launch.txt']=readme.encode();files['BUILD.json']=json.dumps({'version':'Playtest Round 2','sourceCommit':sha,'branch':'dev/recovery-art-pipeline'},indent=2).encode()
with zipfile.ZipFile(out/(name+'.zip'),'w',zipfile.ZIP_DEFLATED) as z:
 for path,data in sorted(files.items()):
  info=zipfile.ZipInfo(path,(1980,1,1,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,data)
manifest={'archive':name+'.zip','sourceCommit':sha,'files':[{'path':p,'bytes':len(d),'sha256':hashlib.sha256(d).hexdigest()} for p,d in sorted(files.items())],'zipSha256':hashlib.sha256((out/(name+'.zip')).read_bytes()).hexdigest()}
(out/'package-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n');(out/'README-launch.txt').write_text(readme)
print(name+'.zip')
