import test from 'node:test';
import assert from 'node:assert/strict';
import {createGame,start,tick} from '../src/engine.js';
import {advanceTransformation} from '../src/transformation.js';

for(const [form,next] of [['idle','box'],['blob','box'],['box','chair'],['chair','idle']]) {
 test(`primary transform from ${form} advances to ${next}, independent of prior selection`,()=>{
  for(const selected of [0,1]) {
   const game=createGame();start(game);game.player.form=form;game.selected=selected;
   advanceTransformation(game);assert.equal(game.player.form,next);
   assert.equal(game.guard.hp,3);assert.equal(game.player.cooldown,0);
  }
 });
}
test('three-step cycle returns to normal; movement still exposes both disguises',()=>{
 const g=createGame();start(g);
 for(const form of ['box','chair','idle','box','chair','idle']){advanceTransformation(g);assert.equal(g.player.form,form);}
 for(const n of [1,2]){for(let i=0;i<n;i++)advanceTransformation(g);tick(g,.02,1);assert.equal(g.player.form,'blob');tick(g,.02);assert.equal(g.player.form,'idle');}
});
test('transform is inert outside an active encounter',()=>{
 for(const phase of ['intro','failure','success']){const g=createGame();g.phase=phase;const before=structuredClone(g);advanceTransformation(g);assert.deepEqual(g,before);}
});
