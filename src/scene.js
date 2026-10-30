// Engine-neutral authored data. Art has six boxes and two chairs. No runtime counting.
export const scene = Object.freeze({
  sceneId:'lab_01', background:'art/laboratory.svg', width:1680, floor:500,
  availableForms:['box','chair'], fittingShadow:'box', spawnX:125,
  guard:{spawnX:900,patrolMin:640,patrolMax:1240,direction:1,armored:false},
  exitX:1550, occluders:[]
});
export const tuning = Object.freeze({
  playerSpeed:185,guardSpeed:58,investigateSpeed:88,hostileSpeed:112,
  sightRange:330,inspectionDistance:76,inspectionSeconds:2.5,
  spikeRange:105,spikeCooldown:0.7,spikeVisualSeconds:0.22,staggerSeconds:0.38,
  guardHP:3,playerHP:3,guardAttackRange:52,guardAttackCooldown:1.05
});
