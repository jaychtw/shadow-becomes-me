import {scene as defaultScene,tuning as T} from './scene.js';
export function validateScene(s) {
  if(!s.availableForms?.length || new Set(s.availableForms).size!==s.availableForms.length || !s.availableForms.includes(s.fittingShadow)) throw Error('Invalid camouflage metadata');
  if(!(s.width>0 && s.spawnX>=0 && s.spawnX<s.exitX && s.exitX<=s.width && s.guard.patrolMin<s.guard.patrolMax && s.guard.spawnX>=s.guard.patrolMin && s.guard.spawnX<=s.guard.patrolMax)) throw Error('Invalid scene geometry');
  if(s.availableForms.some(f=>!['box','chair'].includes(f))) throw Error('Unsupported form');
  return s;
}
export function createGame(s=defaultScene) {
  validateScene(s);
  return {scene:s,phase:'intro',time:0,selected:0,event:'ready',
    player:{x:s.spawnX,form:'idle',direction:1,hp:T.playerHP,cooldown:0,spike:0},
    guard:{x:s.guard.spawnX,direction:s.guard.direction,hp:T.guardHP,state:'patrol',inspection:0,attackCooldown:0,stagger:0}};
}
export const fitting = g=>g.player.form===g.scene.fittingShadow;
export function hasSight(g) {
  const d=g.player.x-g.guard.x;
  return g.guard.hp>0 && Math.abs(d)<=T.sightRange && (Math.abs(d)<18 || Math.sign(d)===g.guard.direction) && !g.scene.occluders.some(w=>w.x>Math.min(g.player.x,g.guard.x)&&w.x<Math.max(g.player.x,g.guard.x));
}
export function canAssassinate(g) {
  return fitting(g)&&g.guard.state==='patrol'&&!g.scene.guard.armored&&g.guard.hp>0&&Math.abs(g.player.x-g.guard.x)<=T.spikeRange;
}
export function camouflage(g,index=g.selected) {
  if(g.phase!=='playing')return;
  g.selected=(index+g.scene.availableForms.length)%g.scene.availableForms.length;
  g.player.form=g.scene.availableForms[g.selected];
  g.event='concealed';
}
export function attack(g) {
  if(g.phase!=='playing'||g.player.cooldown>0)return 'cooldown';
  const p=g.player,b=g.guard;
  p.cooldown=T.spikeCooldown;p.spike=T.spikeVisualSeconds;
  if(b.hp<=0||Math.abs(p.x-b.x)>T.spikeRange) {g.event='miss';return 'miss';}
  // Attack is directional; a nearby target determines spike direction.
  p.direction=Math.sign(b.x-p.x)||p.direction;
  if(canAssassinate(g)){b.hp=0;b.state='dead';g.event='assassination';return 'assassination';}
  b.hp=Math.max(0,b.hp-1);b.state=b.hp?'hostile':'dead';b.stagger=T.staggerSeconds;
  g.event=b.hp?'normalHit':'guardDown';return 'normal';
}
export function start(g){if(g.phase==='intro')g.phase='playing';}
export function tick(g,dt,move=0) {
  if(g.phase!=='playing')return;
  dt=Math.min(0.05,Math.max(0,dt));g.time+=dt;
  const p=g.player,b=g.guard;
  for(const k of ['cooldown','spike'])p[k]=Math.max(0,p[k]-dt);
  b.attackCooldown=Math.max(0,b.attackCooldown-dt);b.stagger=Math.max(0,b.stagger-dt);
  if(move){p.direction=Math.sign(move);p.x=Math.max(25,Math.min(g.scene.width-25,p.x+Math.sign(move)*T.playerSpeed*dt));p.form='blob';}
  else if(p.form==='blob')p.form='idle';
  const seen=hasSight(g);
  if(b.hp>0){
    if(seen&&!fitting(g)){
      if(p.form==='blob'||p.form==='idle'){b.state='hostile';g.event='detected';}
      else if(b.state==='patrol'){b.state='investigate';b.inspection=0;g.event='investigating';}
    }
    if(b.state==='investigate'&&seen&&fitting(g)){b.state='patrol';b.inspection=0;g.event='ignored';}
    const d=p.x-b.x,dist=Math.abs(d);
    if(!b.stagger){
      if(b.state==='patrol'){
        b.x+=b.direction*T.guardSpeed*dt;
        if(b.x>=g.scene.guard.patrolMax){b.x=g.scene.guard.patrolMax;b.direction=-1;}
        if(b.x<=g.scene.guard.patrolMin){b.x=g.scene.guard.patrolMin;b.direction=1;}
      } else if(b.state==='investigate'){
        b.direction=Math.sign(d)||b.direction;
        if(dist>T.inspectionDistance)b.x+=b.direction*T.investigateSpeed*dt;
        else {b.inspection+=dt;if(b.inspection>=T.inspectionSeconds){b.state='hostile';g.event='inspectionFailed';}}
      }else if(b.state==='hostile'){
        b.direction=Math.sign(d)||b.direction;
        if(dist>T.guardAttackRange)b.x+=b.direction*T.hostileSpeed*dt;
        else if(b.attackCooldown===0){p.hp=Math.max(0,p.hp-1);b.attackCooldown=T.guardAttackCooldown;g.event='hurt';}
      }
    }
  }
  if(p.hp<=0){g.phase='failure';g.event='failure';}
  else if(p.x>=g.scene.exitX){g.phase='success';g.event='success';}
}
