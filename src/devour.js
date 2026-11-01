// Renderer-only lifetime. Logical defeat stays immediate in the unchanged engine.
import manifest from '../art/devour/manifest.js';
export const DEVOUR_DURATION=manifest.durationMs;
let effect=null,consumed=false,owner=null,suppressed=false;
const ns='http://www.w3.org/2000/svg';
function node(tag,id,parent){let e=document.getElementById(id);if(!e){e=document.createElementNS(ns,tag);e.id=id;parent.append(e);}return e;}
export function notifyAttack(g,result,guardFrame){
 if(result==='cooldown')return;
 if(result==='assassination'){owner=g;effect={start:g.time,x:g.player.x,delta:g.guard.x-g.player.x,frame:guardFrame};consumed=false;suppressed=true;}
 else suppressed=false;
}
export function updateDevour(g,guardFrame){
 if(owner!==g){owner=g;effect=null;consumed=false;suppressed=false;}
 if(effect&&(Math.abs(g.player.x-effect.x)>.1||g.phase!=='playing')){effect=null;consumed=true;}
 let ms=effect?Math.max(0,(g.time-effect.start)*1000):0;
 if(effect&&ms>=DEVOUR_DURATION){effect=null;consumed=true;}
 const path=node('path','shadow-devour',document.getElementById('player'));path.setAttribute('fill','#000');path.style.display=effect?'':'none';
 const wrapper=node('g','devour-target',document.getElementById('guard'));const sprite=document.getElementById('guard-sprite');if(sprite.parentNode!==wrapper)wrapper.append(sprite);
 wrapper.style.display=consumed?'none':'';wrapper.removeAttribute('mask');
 if(!effect)return {active:false,suppressSpike:suppressed,consumed};
 const frame=manifest.frames[Math.min(28,Math.floor(ms/20))];path.setAttribute('d',frame.d);
 // Affine directional lean maps the authored cocoon toward the target while
 // keeping every point on source y=232 exactly on the actor's ground pivot.
 const expansion=ms<160?ms/160:ms<260?1:Math.max(0,(560-ms)/300);
 const scale=105/243+(.65-105/243)*expansion,dir=Math.sign(effect.delta)||g.player.direction;
 const lean=(Math.abs(effect.delta)+18)/185*expansion;
 path.setAttribute('transform',`matrix(${scale*dir} 0 ${-dir*lean} ${scale} 0 0) translate(-256 -232)`);
 if(ms<20&&['box','chair'].includes(g.player.form)){path.setAttribute('d',document.getElementById('shadow').getAttribute('d'));path.removeAttribute('transform');}
 if(ms<20&&['box','chair'].includes(g.player.form)){path.setAttribute('d',document.getElementById('shadow').getAttribute('d'));path.removeAttribute('transform');}
 const defs=document.querySelector('#world defs');const mask=node('mask','devour-mask',defs);
 for(const [k,v] of Object.entries({maskUnits:'userSpaceOnUse',maskContentUnits:'userSpaceOnUse',x:-160,y:-200,width:320,height:240}))mask.setAttribute(k,v);
 mask.style.maskType='luminance';const base=node('rect','devour-mask-base',mask);for(const [k,v] of Object.entries({x:-160,y:-200,width:320,height:240,fill:'white'}))base.setAttribute(k,v);
 const wipe=node('path','devour-wipe',mask),progress=Math.max(0,Math.min(1,(ms-60)/200));const x=-180+360*progress;
 wipe.setAttribute('fill','black');wipe.setAttribute('d',`M-180 -210H${x-12}L${x+7} -110L${x-8} -40L${x+15} 40H-180Z`);wipe.setAttribute('transform',`scale(${dir} 1)`);
 wrapper.setAttribute('mask','url(#devour-mask)');if(progress>=1)wrapper.style.display='none';
 document.getElementById('guard').setAttribute('opacity','1');sprite.setAttribute('href',guardFrame(effect.frame));sprite.setAttribute('transform',`scale(${.55*g.guard.direction} .55) translate(-96 -240)`);
 path.dataset.timeMs=String(ms);wrapper.dataset.progress=String(progress);
 return {active:true,suppressSpike:true,consumed:false};
}
