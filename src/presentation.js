import restPath from '../art/characters/rest-path.js';
import {notifyAttack,updateDevour} from './devour.js';
// Presentation only. Engine timing, hit testing and accepted source artwork are untouched.
import manifest from '../art/characters/manifest.js';
const root=new URL('../art/characters/',import.meta.url);
const frames=manifest.frames;
const decodedImages=frames.map(f=>{const im=new Image();im.src=new URL(f.png,root);return im;});
export const artReady=Promise.all(decodedImages.map(im=>im.decode()));
const shadow=frames.filter(f=>f.motion==='shadow-spike'),walk=frames.filter(f=>f.motion==='guard-walk');
export const SHADOW_SCALE=105/243;
function at(list,t){let end=0;for(const f of list){end+=f.durationMs;if(t<end)return f;}return list.at(-1);}
function image(parent,id){let e=document.getElementById(id);if(!e){e=document.createElementNS('http://www.w3.org/2000/svg','image');e.id=id;parent.append(e);}return e;}
function apply(el,f,scale,dir){const href=new URL(f.png,root).href;if(el.getAttribute('href')!==href)el.setAttribute('href',href);el.setAttribute('width',f.canvas[0]);el.setAttribute('height',f.canvas[1]);el.setAttribute('transform',`scale(${scale*dir} ${scale}) translate(${-f.pivot[0]} ${-f.pivot[1]})`);el.dataset.frame=f.id;}
let previous=null,lastX=0,distance=0,lastGuardFrame=walk[0];
export function presentAttack(g,result){notifyAttack(g,result,lastGuardFrame.png);}
export function renderCharacters(g){
 if(previous!==g){previous=g;distance=0;lastX=g.guard.x;}
 distance+=Math.abs(g.guard.x-lastX);lastX=g.guard.x;
 const p=g.player,b=g.guard;
 const s=image(document.getElementById('player'),'shadow-sprite');
 let slide=document.getElementById('shadow-slide');
 if(!slide){slide=document.createElementNS('http://www.w3.org/2000/svg','path');slide.id='shadow-slide';slide.setAttribute('fill','#000');document.getElementById('player').append(slide);}
 slide.style.display='none';
 function groundedSlide(){
  // Same authored upper contour, vector-rasterized at final resolution. The
  // bottom extends 1.92 world units under the existing opaque floor stroke.
  slide.setAttribute('d',restPath.replace(/L\s*40\s+232\s*Z\s*$/, 'L472 240 L40 240 Z'));
  slide.setAttribute('transform',`scale(${.46*p.direction} .24) translate(-256 -232)`);
  slide.style.display='';s.style.display='none';document.getElementById('shadow').style.display='none';
 }
 const active=p.spike>0,visible=active||p.form==='idle'||p.form==='blob';
 s.style.display=visible?'':'none';document.getElementById('shadow').style.display=visible?'none':'';
 document.getElementById('spike-shape').setAttribute('d','');
 if(visible){
  apply(s,active?at(shadow,Math.max(0,220-p.spike*1000)):shadow[0],SHADOW_SCALE,p.direction);
  // Reuse the authored amorphous rest envelope with a wider, lower moving profile.
  // The flat source baseline stays exactly at the actor's ground pivot.
  if(!active&&p.form==='blob')groundedSlide();
 }
 const guard=image(document.getElementById('guard'),'guard-sprite');
 document.getElementById('guard-body').style.display='none';
 const f=b.hp?at(walk,(distance/58*1000)%1200):walk[0];apply(guard,f,.55,b.direction);
 if(!b.hp)guard.setAttribute('transform',`rotate(90) scale(${.55*b.direction} .55) translate(-96 -240)`);
 if(b.hp)lastGuardFrame=f;
 const devour=updateDevour(g,path=>new URL(path,root).href);
 if(devour.active){slide.style.display='none';s.style.display='none';document.getElementById('shadow').style.display='none';}
 else if(devour.suppressSpike&&active){
  if(p.form==='idle'||p.form==='blob'){apply(s,shadow[0],SHADOW_SCALE,p.direction);if(p.form==='blob')groundedSlide();}else{s.style.display='none';document.getElementById('shadow').style.display='';}
 }
 // Keep readable state cues above the sprite.
 for(const id of ['guard-cue','guard-hp'])document.getElementById('guard').append(document.getElementById(id));
}
