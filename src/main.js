import {renderCharacters} from './presentation.js';
import {createGame,start,tick,camouflage,attack} from './engine.js';
import {strings} from './i18n.js';
let game=createGame(),locale='en',paused=false,help=false;
try{const saved=localStorage.getItem('sbm-language');if(Object.hasOwn(strings,saved))locale=saved;}catch{}
const $=id=>document.getElementById(id),t=k=>strings[locale][k];
function text(el,value){if(el.textContent!==value)el.textContent=value;}
const keys=new Set(),touch=new Set();
const clearInput=()=>{keys.clear();touch.clear();};
const forms={
 idle:'M-27 0L-20-36-22-67Q-25-78-14-86L-10-90Q-16-108 0-110Q16-108 10-90L14-86Q26-78 23-62L20-35 29 0 12 0 3-36-5 0Z',
 blob:'M-42 0Q-37-7-30-10Q-26-29-7-30Q10-39 25-22Q34-16 43-1L27-3 13 0-2-3-17 0-26-3Z',
 box:'M-30 0V-59H30V0Z',chair:'M-27 0V-83H-15V-39H28V-29H21V0H12V-29H-17V0Z'
};
function reset(){game=createGame();start(game);paused=false;help=false;clearInput();render();$('pause').focus();}
function cycle(delta){camouflage(game,game.selected+delta);render();}
function handleAction(action){
 if(action==='start'){if(help){help=false;}else if(paused){paused=false;}else if(game.phase==='intro'){start(game);$('pause').focus();}else reset();}
 if(action==='attack'&&!paused&&!help)attack(game);
 if(action==='box'&&!paused&&!help)camouflage(game,0);
 if(action==='chair'&&!paused&&!help)camouflage(game,1);
 render();
}
$('begin').onclick=()=>handleAction('start');
$('restart').onclick=reset;
$('pause').onclick=()=>{if(game.phase==='playing'){paused=!paused;clearInput();render();if(paused)$('begin').focus();}};
$('help').onclick=()=>{help=!help;clearInput();render();if(help)$('begin').focus();};
$('language').onclick=()=>{locale=locale==='en'?'zh-TW':'en';try{localStorage.setItem('sbm-language',locale);}catch{}render();};
for(const id of ['attack','box','chair'])$(id).onclick=()=>handleAction(id);
for(const id of ['left','right']){
 const el=$(id);
 el.onpointerdown=e=>{e.preventDefault();el.setPointerCapture(e.pointerId);touch.add(id);};
 const release=()=>touch.delete(id);
 el.onpointerup=release;el.onpointercancel=release;el.onlostpointercapture=release;
}
window.addEventListener('keydown',e=>{
 if(e.target instanceof HTMLButtonElement && ['Enter',' '].includes(e.key))return;
 const key=e.key.toLowerCase();
 if(['arrowleft','arrowright','a','d','q','e','c','x',' ','1','2','r'].includes(key))e.preventDefault();
 if(e.repeat)return;
 keys.add(key);
 if(key==='r')reset();
 if(game.phase!=='playing'||paused||help)return;
 if(key==='q')cycle(-1);if(key==='e')cycle(1);
 if(key==='1')camouflage(game,0);if(key==='2')camouflage(game,1);
 if(key==='c'){if(['box','chair'].includes(game.player.form))game.player.form='idle';else camouflage(game);}
 if(key==='x'||key===' ')attack(game);
 render();
});
window.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));
window.addEventListener('blur',()=>{clearInput();if(game.phase==='playing'){paused=true;render();}});
document.addEventListener('visibilitychange',()=>{if(document.hidden){clearInput();if(game.phase==='playing')paused=true;}});
function render(){
 document.documentElement.lang=locale;
 document.querySelectorAll('[data-i18n]').forEach(el=>{text(el,t(el.dataset.i18n));});
 $('language').textContent=t('language');$('language').lang=locale==='en'?'zh-TW':'en';
 $('stage').setAttribute('aria-label',t('stage'));
 document.querySelector('nav').setAttribute('aria-label',t('help'));
 document.querySelector('.controls').setAttribute('aria-label',t('help'));
 $('scene-title').textContent=t('subtitle');$('scene-desc').textContent=t('sceneLabel');
 $('left').setAttribute('aria-label',t('left'));$('right').setAttribute('aria-label',t('right'));
 $('health').textContent='●'.repeat(game.player.hp)+'○'.repeat(3-game.player.hp);
 $('health').setAttribute('aria-label',`${t('health')} ${game.player.hp} / 3`);
 $('form').textContent=t(game.player.form);
 $('guard-state').textContent=t(game.guard.state);
 text($('feedback'),t(game.event));
 $('attack').style.boxShadow=game.player.cooldown?'inset 0 -4px #8c784e':'none';
 $('attack').setAttribute('aria-label',`${t('spike')} — ${t(game.player.cooldown?'cooldown':'available')}`);
 for(const f of ['box','chair'])$(f).setAttribute('aria-pressed',String(game.player.form===f));
 $('pause').textContent=t(paused?'resume':'pause');
 const overlay=game.phase!=='playing'||paused||help;
 $('overlay').hidden=!overlay;
 if(overlay){
  const intro=game.phase==='intro'||help;
  $('overlay-title').textContent=t(intro?'introTitle':paused?'paused':game.phase);
  $('overlay-copy').textContent=intro?t('intro'):paused?'':t(game.phase+'Detail');
  $('overlay-rule').textContent=intro?t('rule'):'';
  $('begin').textContent=t(help?'closeHelp':paused?'resume':game.phase==='intro'?'start':'again');
 }
 $('exit-text').textContent=t('exit');
 const p=game.player,b=game.guard;
 const width=Math.max(520,Math.min(1680,$('stage').clientWidth/$('world').clientHeight*640));
 const camera=Math.max(0,Math.min(game.scene.width-width,p.x-width*.35));
 $('world').setAttribute('viewBox',`${camera} 0 ${width} 640`);
 $('player').setAttribute('transform',`translate(${p.x} 500)`);
 $('shadow').setAttribute('d',forms[p.form]);
 $('spike-shape').setAttribute('d',p.spike?`M${p.direction*8} -35L${p.direction*105} -48L${p.direction*10} -56Z`:'');
 $('guard').setAttribute('transform',`translate(${b.x} 500)`);
 $('guard-body').setAttribute('transform',b.hp?`scale(${b.direction} 1)`:'translate(0 -8) rotate(90)');
 $('guard').setAttribute('opacity',b.hp?'1':'.65');
 $('guard-cue').textContent=b.state==='investigate'?'?':b.state==='hostile'?'!':'';
 $('guard-hp').innerHTML=b.hp?Array.from({length:3},(_,i)=>`<rect x="${i*14-19}" y="-126" width="10" height="4" rx="1" fill="${i<b.hp?'#223e50':'#b3c2bd'}"/>`).join(''):'';
 const range=330*b.direction;
 renderCharacters(game);
 $('guard-vision').innerHTML=b.hp?`<path d="M${b.x} 396l${range} -78v167Z" fill="url(#vision)"/><path d="M${b.x} 396l${range} -78" fill="none" stroke="#aa5649" opacity=".25"/>`:'';
}
let last=performance.now(),lastPhase='intro';
function frame(now){
 const dt=(now-last)/1000;last=now;
 const move=(keys.has('d')||keys.has('arrowright')||touch.has('right')?1:0)-(keys.has('a')||keys.has('arrowleft')||touch.has('left')?1:0);
 if(!paused&&!help)tick(game,dt,move);
 render();
 if(game.phase!==lastPhase&&['success','failure'].includes(game.phase)){clearInput();$('begin').focus();}
 lastPhase=game.phase;requestAnimationFrame(frame);
}
// Read-only observability for reproducible browser evidence; tests use real input.
window.__shadow=Object.freeze({snapshot:()=>JSON.parse(JSON.stringify({phase:game.phase,player:game.player,guard:game.guard,time:game.time,locale,paused}))});
render();requestAnimationFrame(frame);
