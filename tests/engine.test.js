import test from 'node:test';
import assert from 'node:assert/strict';
import {createGame,start,tick,camouflage,attack,hasSight,canAssassinate,validateScene} from '../src/engine.js';
import {scene,tuning as T} from '../src/scene.js';
import {strings} from '../src/i18n.js';
const encounter=()=>{const g=createGame();start(g);g.player.x=1000;g.guard.x=900;return g;};
function advance(g,seconds,move=0){for(let t=0;t<seconds;t+=.02)tick(g,.02,move);}
test('scene metadata validates and rejects invalid forms and geometry',()=>{
 assert.equal(validateScene(scene),scene);
 for(const s of [{...scene,fittingShadow:'lamp'},{...scene,availableForms:['box','box']},{...scene,exitX:0},{...scene,availableForms:['lamp'],fittingShadow:'lamp'}])assert.throws(()=>validateScene(s));
});
test('upright starts exposed; movement slides; stopping restores upright',()=>{
 const g=createGame();assert.equal(g.player.form,'idle');tick(g,.02,1);assert.equal(g.player.x,scene.spawnX);start(g);tick(g,.02,1);assert.equal(g.player.form,'blob');tick(g,.02);assert.equal(g.player.form,'idle');
});
test('exposed idle and sliding blob immediately trigger hostility',()=>{for(const moving of [0,1]){const g=encounter();tick(g,.01,moving);assert.equal(g.guard.state,'hostile');}});
test('sight respects direction, distance and opaque wall fixtures',()=>{
 const g=encounter();assert.ok(hasSight(g));g.guard.direction=-1;assert.ok(!hasSight(g));g.guard.direction=1;g.player.x=1400;assert.ok(!hasSight(g));g.player.x=1000;g.scene={...scene,occluders:[{x:950}]};assert.ok(!hasSight(g));tick(g,.01);assert.equal(g.guard.state,'patrol');
});
test('fitting box ignored under identical sight conditions',()=>{const g=encounter();camouflage(g,0);advance(g,1);assert.equal(g.guard.state,'patrol');assert.equal(g.player.hp,3);});
test('wrong chair investigated before hostility; approach and timed inspection',()=>{
 const g=encounter();camouflage(g,1);tick(g,.02);assert.equal(g.guard.state,'investigate');assert.ok(g.guard.x>900);advance(g,1);assert.equal(g.guard.state,'investigate');assert.equal(g.player.hp,3);advance(g,3);assert.equal(g.guard.state,'hostile');
});
test('metadata swap to chair reverses both forms without engine changes',()=>{
 for(const form of [0,1]){const g=createGame({...scene,fittingShadow:'chair',background:'tests/fixtures/chair-laboratory.svg'});start(g);g.player.x=1000;camouflage(g,form);tick(g,.02);assert.equal(g.guard.state,form?'patrol':'investigate');}
});
test('fitting disguise assassinates unaware unarmored guard in one hit',()=>{
 const g=encounter();camouflage(g,0);assert.ok(canAssassinate(g));assert.equal(attack(g),'assassination');assert.equal(g.guard.hp,0);assert.equal(g.guard.state,'dead');assert.ok(g.player.spike>0);
});
test('unfitting investigation cannot assassinate; same spike does one damage',()=>{
 const g=encounter();camouflage(g,1);tick(g,.01);assert.equal(g.guard.state,'investigate');assert.ok(!canAssassinate(g));assert.equal(attack(g),'normal');assert.equal(g.guard.hp,2);assert.ok(g.player.spike>0);
});
test('hostility and armor independently prohibit instant takedown',()=>{
 for(const armored of [false,true]){const g=encounter();g.scene={...scene,guard:{...scene.guard,armored}};camouflage(g,0);if(!armored)g.guard.state='hostile';assert.ok(!canAssassinate(g));attack(g);assert.equal(g.guard.hp,2);}
});
test('attack range and cooldown enforce meaningful limits',()=>{
 const g=encounter();g.player.x=1100;assert.equal(attack(g),'miss');assert.equal(g.guard.hp,3);assert.equal(attack(g),'cooldown');advance(g,T.spikeCooldown+.1);g.player.x=g.guard.x+60;assert.equal(attack(g),'normal');assert.equal(g.guard.hp,2);
});
test('repeated ordinary spikes can defeat guard without one hit kill',()=>{
 const g=encounter();g.player.x=g.guard.x+50;
 for(let i=0;i<3;i++){attack(g);if(i<2){assert.equal(g.guard.hp,2-i);advance(g,.72);}}
 assert.equal(g.guard.hp,0);
});
test('observed fitting correction cancels investigation but never hostile state',()=>{
 const g=encounter();camouflage(g,1);tick(g,.01);camouflage(g,0);tick(g,.01);assert.equal(g.guard.state,'patrol');g.guard.state='hostile';tick(g,.01);assert.equal(g.guard.state,'hostile');
});
test('patrol bounds turn and player collision clamps to floor extent',()=>{
 const g=createGame();start(g);camouflage(g,0);advance(g,14);assert.ok(g.guard.x>=640&&g.guard.x<=1240);advance(g,3,-1);assert.equal(g.player.x,25);
});
test('hostile attack causes failure; restart returns clean state',()=>{
 const g=encounter();g.player.x=g.guard.x+20;advance(g,4);assert.equal(g.phase,'failure');assert.equal(g.player.hp,0);const r=createGame();assert.equal(r.phase,'intro');assert.equal(r.guard.hp,3);assert.equal(r.player.cooldown,0);assert.equal(r.player.x,125);
});
test('exit completes encounter and freezes further simulation',()=>{
 const g=createGame();start(g);g.player.x=1549;tick(g,.02,1);assert.equal(g.phase,'success');const x=g.player.x;tick(g,.02,-1);assert.equal(g.player.x,x);
});
test('complete deterministic stealth route is solvable without taking damage',()=>{
 const g=createGame();start(g);
 while(g.guard.x-g.player.x>90)tick(g,.02,1);
 tick(g,.02);camouflage(g,0);assert.equal(attack(g),'assassination');
 while(g.phase==='playing')tick(g,.02,1);
 assert.equal(g.phase,'success');assert.equal(g.player.hp,3);
});
test('locale resources have matching complete keys',()=>{
 assert.deepEqual(Object.keys(strings.en).sort(),Object.keys(strings['zh-TW']).sort());
 for(const locale of Object.values(strings))for(const val of Object.values(locale))assert.ok(typeof val==='string'&&val.length);
});
