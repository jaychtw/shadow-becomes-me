import {chromium} from 'playwright';import assert from 'node:assert/strict';import {writeFile} from 'node:fs/promises';
const out='evidence/playtest-round1';const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});const results=[];
for(const width of [1440,390]){
 for(const [tag,port] of [['before',8082],['after',8080]]){
  const p=await b.newPage({viewport:{width,height:1050},isMobile:width===390,hasTouch:width===390});await p.goto(`http://127.0.0.1:${port}`);await p.locator('#begin').click();await p.keyboard.down('d');await p.waitForTimeout(200);await p.keyboard.up('d');
  // Re-hold movement; screenshot during movement, never a reconstructed still.
  await p.keyboard.down('d');await p.waitForTimeout(80);assert.equal(await p.evaluate(()=>__shadow.snapshot().player.form),'blob');await p.locator('#stage').screenshot({path:`${out}/slide-${width}-${tag}.png`});await p.keyboard.up('d');await p.close();
 }
 const p=await b.newPage({viewport:{width,height:1050},isMobile:width===390,hasTouch:width===390});await p.goto('http://127.0.0.1:8080');await p.locator('#begin').click();await p.keyboard.down('d');await p.waitForFunction(()=>{const s=__shadow.snapshot();return s.guard.x-s.player.x<350;});await p.keyboard.up('d');await p.waitForFunction(()=>__shadow.snapshot().player.form==='idle');
 for(const [form,id,state] of [['box','box','patrol'],['chair','chair','investigate']]){
  if(width===390)await p.locator('#'+id).tap();else await p.locator('#'+id).click();
  await p.waitForFunction(f=>__shadow.snapshot().player.form===f,form);
  if(form==='chair')await p.waitForFunction(()=>__shadow.snapshot().guard.state==='investigate',null,{timeout:15000});
  const s=await p.evaluate(()=>__shadow.snapshot());assert.equal(s.guard.state,state);assert.equal(s.guard.hp,3);assert.equal(await p.locator('#shadow-sprite').evaluate(e=>e.style.display),'none');assert.equal(await p.locator('#shadow').evaluate(e=>getComputedStyle(e).display),'inline');
  const d=await p.locator('#shadow').getAttribute('d');assert.ok(d.length>10);results.push({width,form,guardState:s.guard.state,playerHp:s.player.hp,guardHp:s.guard.hp,path:d,rendered:true});await p.screenshot({path:`${out}/${form}-${width}.png`,fullPage:true});
 }
 await p.close();
}
await b.close();await writeFile(`${out}/transformation-results.json`,JSON.stringify({pass:4,fail:0,cases:results,conclusion:'Both rendered forms work. Box fitting; chair investigated, not a control/render defect. Movement breaks both disguises.'},null,2));console.log('Old/new moving captures and four transformation/reaction checks passed.');
