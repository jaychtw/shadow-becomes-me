import {camouflage} from './engine.js';

// Input mapping only. Movement still exposes any applied disguise in engine.tick.
export function advanceTransformation(game) {
 if(game.phase!=='playing')return;
 if(game.player.form==='chair') {
  game.player.form='idle';
  game.event='ready';
 } else camouflage(game,game.scene.availableForms.indexOf(game.player.form==='box'?'chair':'box'));
}
