import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const out=process.env.EVIDENCE_DIR||'evidence/playtest-round3';await mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const checks=[],errors=[];
const origin=process.env.TEST_URL||'http://127.0.0.1:8080';
async function approach(p){await p.keyboard.down('d');await p.waitForFunction(()=>{const s=__shadow.snapshot();return s.guard.x-s.player.x<350;});await p.keyboard.up('d');await p.waitForFunction(()=>__shadow.snapshot().player.form==='idle');}
for(const width of [1440,390])for(const locale of ['en','zh-TW']){
 const p=await browser.newPage({viewport:{width,height:1050},hasTouch:width===390,isMobile:width===390});p.on('pageerror',e=>errors.push(e.message));
 await p.goto(origin);if(locale==='zh-TW')await p.locator('#language').click();await p.locator('#begin').click();
 const form=()=>p.evaluate(()=>__shadow.snapshot().player.form);
 for(const expected of ['box','chair','idle','box','chair','idle']){await p.keyboard.press('c');assert.equal(await form(),expected);}
 await p.keyboard.down('c');await p.keyboard.down('c');await p.keyboard.up('c');assert.equal(await form(),'box');
 await p.keyboard.press('2');assert.equal(await form(),'chair');await p.keyboard.press('1');assert.equal(await form(),'box');
 await p.keyboard.press('e');assert.equal(await form(),'chair');await p.keyboard.press('q');assert.equal(await form(),'box');
 checks.push(`${width}/${locale}: deterministic C, held-key repeat, 1/2 and Q/E compatibility`);
 for(const method of width===390?['tap','click']:['click'])for(const expected of ['chair','idle','box']){
  await p.locator('#transform')[method]();assert.equal(await form(),expected);
  const name=await p.locator('#transform').getAttribute('aria-label');assert.ok(name.includes(locale==='en'?'Current form':'目前形態'));assert.ok((await p.locator('#transform-current').textContent()).includes('→'));
 }
 checks.push(`${width}/${locale}: mouse/touch same cycle and current/next accessible name`);
 await p.keyboard.down('d');await p.waitForTimeout(80);assert.equal(await form(),'blob');await p.keyboard.press('c');await p.waitForTimeout(80);assert.equal(await form(),'blob');await p.keyboard.up('d');await p.waitForFunction(()=>__shadow.snapshot().player.form==='idle');
 await p.keyboard.press('c');assert.equal(await form(),'box');await p.locator('#pause').click();assert.equal(await p.locator('#transform').isDisabled(),true);await p.keyboard.press('c');assert.equal(await form(),'box');await p.locator('#begin').click();
 checks.push(`${width}/${locale}: movement exposes forms, stop/transform and pause gating`);
 const build=await p.evaluate(async()=>await(await fetch('BUILD.json',{cache:'no-store'})).json());assert.ok((await p.locator('#build-id').textContent()).includes(build.id));await p.locator('#check-build').click();await p.waitForFunction(()=>document.getElementById('build-status').textContent.length>0);assert.ok((await p.locator('#build-status').textContent()).includes(locale==='en'?'served build':'伺服器提供'));
 const mutations=await p.evaluate(()=>new Promise(resolve=>{let count=0;const o=new MutationObserver(list=>count+=list.length);o.observe(document.getElementById('build-status'),{childList:true,subtree:true,characterData:true});setTimeout(()=>{o.disconnect();resolve(count);},250);}));assert.equal(mutations,0,'Build live region must stay quiet between changes');assert.equal(await p.evaluate(()=>navigator.serviceWorker?.controller??null),null);checks.push(`${width}/${locale}: footer and no-store identity check match BUILD.json`);
 await p.locator('#restart').click();await approach(p);await p.locator('#transform')[width===390?'tap':'click']();assert.equal(await form(),'box');
 await p.waitForFunction(()=>{const s=__shadow.snapshot();return Math.abs(s.guard.x-s.player.x)<170;},null,{timeout:20000});
 assert.equal(await p.locator('#guard-hp rect').count(),0);assert.equal(await p.locator('#guard-hp').getAttribute('aria-hidden'),'true');assert.ok((await p.locator('#guard-health').textContent()).includes('3 / 3'));await p.screenshot({path:`${out}/after-${width}-${locale}-healthy.png`,fullPage:true});
 await p.locator('#chair').click();await p.waitForFunction(()=>__shadow.snapshot().guard.state==='investigate',null,{timeout:15000});assert.equal(await p.locator('#guard-cue').textContent(),'?');await p.screenshot({path:`${out}/after-${width}-${locale}-investigating.png`,fullPage:true});
 await p.waitForFunction(()=>{const s=__shadow.snapshot();return Math.abs(s.guard.x-s.player.x)<100;});await p.locator('#attack').click();assert.equal(await p.evaluate(()=>__shadow.snapshot().guard.hp),2);assert.equal(await p.locator('#guard-cue').textContent(),'!');assert.equal(await p.locator('#guard-hp rect').count(),2);assert.ok((await p.locator('#guard-health').textContent()).includes('2 / 3'));await p.screenshot({path:`${out}/after-${width}-${locale}-wounded.png`,fullPage:true});
 await p.locator('#restart').click();assert.equal(await p.locator('#guard-hp rect').count(),0);assert.ok((await p.locator('#guard-health').textContent()).includes('3 / 3'));checks.push(`${width}/${locale}: wounded-only bar, exact textual HP, ?/!, restart`);
 await p.close();
}
assert.deepEqual(errors,[]);await browser.close();await writeFile(`${out}/usability-results.json`,JSON.stringify({pass:checks.length,fail:0,checks,errors},null,2)+'\n');console.log(checks.length+' Round 3 usability checks passed');
