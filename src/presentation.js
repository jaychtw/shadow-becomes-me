// Presentation only. Engine timing, hit testing and accepted source artwork are untouched.
const manifest=await (await fetch(new URL('../art/characters/manifest.json',import.meta.url))).json();
const root=new URL('../art/characters/',import.meta.url);
const frames=manifest.frames;
await Promise.all(frames.map(async f=>{const im=new Image();im.src=new URL(f.png,root);await im.decode();}));
const shadow=frames.filter(f=>f.motion==='shadow-spike'),walk=frames.filter(f=>f.motion==='guard-walk');
export const SHADOW_SCALE=105/243;
function at(list,t){let end=0;for(const f of list){end+=f.durationMs;if(t<end)return f;}return list.at(-1);}
function image(parent,id){let e=document.getElementById(id);if(!e){e=document.createElementNS('http://www.w3.org/2000/svg','image');e.id=id;parent.append(e);}return e;}
function apply(el,f,scale,dir){const href=new URL(f.png,root).href;if(el.getAttribute('href')!==href)el.setAttribute('href',href);el.setAttribute('width',f.canvas[0]);el.setAttribute('height',f.canvas[1]);el.setAttribute('transform',`scale(${scale*dir} ${scale}) translate(${-f.pivot[0]} ${-f.pivot[1]})`);el.dataset.frame=f.id;}
let previous=null,lastX=0,distance=0;
export function renderCharacters(g){
 if(previous!==g){previous=g;distance=0;lastX=g.guard.x;}
 distance+=Math.abs(g.guard.x-lastX);lastX=g.guard.x;
 const p=g.player,b=g.guard;
 const s=image(document.getElementById('player'),'shadow-sprite');
 const active=p.spike>0,visible=active||p.form==='idle';
 s.style.display=visible?'':'none';document.getElementById('shadow').style.display=visible?'none':'';
 document.getElementById('spike-shape').setAttribute('d','');
 if(visible)apply(s,active?at(shadow,Math.max(0,220-p.spike*1000)):shadow[0],SHADOW_SCALE,p.direction);
 const guard=image(document.getElementById('guard'),'guard-sprite');
 document.getElementById('guard-body').style.display='none';
 const f=b.hp?at(walk,(distance/58*1000)%1200):walk[0];apply(guard,f,.55,b.direction);
 if(!b.hp)guard.setAttribute('transform',`rotate(90) scale(${.55*b.direction} .55) translate(-96 -240)`);
 // Keep readable state cues above the sprite.
 for(const id of ['guard-cue','guard-hp'])document.getElementById('guard').append(document.getElementById(id));
}
