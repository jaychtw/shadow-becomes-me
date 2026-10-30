import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import {writeFile,mkdir} from 'node:fs/promises';
await mkdir('evidence',{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
const report={started:new Date().toISOString(),browser:await browser.version(),tests:[],errors:[],networkRequests:[],audits:[],performance:[]};
const origin=process.env.TEST_URL||'http://127.0.0.1:8080';
let p;
const snap=()=>p.evaluate(()=>window.__shadow.snapshot());
async function waitFor(fn,timeout=15000){await p.waitForFunction(fn,null,{timeout,polling:'raf'});}
async function shot(name){await p.screenshot({path:`evidence/${name}.png`,fullPage:true});}
async function test(name,fn){try{await fn();report.tests.push({name,status:'pass'});console.log('PASS',name);}catch(e){report.tests.push({name,status:'fail',error:e.message});console.error('FAIL',name,e.message);await shot('failure-'+report.tests.length);}}
async function open(width=1440,locale='en',mobile=false){
 if(p)await p.context().close();
 const context=await browser.newContext({viewport:{width,height:width<500?900:1050},isMobile:mobile,hasTouch:mobile,deviceScaleFactor:1,reducedMotion:'reduce'});
 p=await context.newPage();
 p.on('pageerror',e=>report.errors.push(e.message));
 p.on('request',r=>{if(!r.url().startsWith(origin)&&!r.url().startsWith('data:'))report.networkRequests.push(r.url());});
 await p.goto(origin);if(locale==='zh-TW')await p.locator('#language').click();
}
async function begin(){await p.locator('#begin').click();assert.equal((await snap()).phase,'playing');}
async function restart(){await p.locator('#restart').click();assert.equal((await snap()).player.hp,3);}
async function moveBehind(touch=false){
 if(touch){const r=await p.locator('#right').boundingBox();await p.touchscreen.tap(r.x+r.width/2,r.y+r.height/2);await p.dispatchEvent('#right','pointerdown',{pointerId:7,pointerType:'touch',isPrimary:true,buttons:1});}
 else await p.keyboard.down('d');
 await waitFor(()=>{const s=window.__shadow.snapshot();return s.guard.x-s.player.x<350;});
 if(touch)await p.dispatchEvent('#right','pointerup',{pointerId:7,pointerType:'touch',isPrimary:true});else await p.keyboard.up('d');
 await waitFor(()=>window.__shadow.snapshot().player.form==='idle');
}
async function moveToExit(touch=false){
 if(touch)await p.dispatchEvent('#right','pointerdown',{pointerId:7,pointerType:'touch',isPrimary:true,buttons:1});else await p.keyboard.down('ArrowRight');
 await waitFor(()=>window.__shadow.snapshot().phase==='success');
 if(touch)await p.dispatchEvent('#right','pointerup',{pointerId:7,pointerType:'touch',isPrimary:true});else await p.keyboard.up('ArrowRight');
}
await test('help before entry returns to intro without starting simulation',async()=>{
 await open();await p.locator('#help').click();assert.equal((await snap()).phase,'intro');
 await p.locator('#begin').click();assert.equal((await snap()).phase,'intro');assert.ok(await p.locator('#overlay').isVisible());
 await p.locator('#begin').click();assert.equal((await snap()).phase,'playing');
});
await test('desktop keyboard: upright → blob → fitting disguise → assassination → exit',async()=>{
 await open();await shot('desktop-intro');await begin();await shot('desktop-upright');
 await p.keyboard.down('d');await p.waitForTimeout(300);assert.equal((await snap()).player.form,'blob');await shot('desktop-sliding');await p.keyboard.up('d');
 await moveBehind();await p.keyboard.press('1');assert.equal((await snap()).player.form,'box');assert.equal((await snap()).guard.state,'patrol');await shot('desktop-fitting');
 await waitFor(()=>Math.abs(window.__shadow.snapshot().guard.x-window.__shadow.snapshot().player.x)<95,20000);
 await p.keyboard.press('x');assert.equal((await snap()).guard.hp,0);await shot('desktop-spike');
 await moveToExit();assert.equal((await snap()).player.hp,3);await shot('desktop-success');
});
await test('desktop: wrong disguise investigated, ordinary spike, hostile attack, failure and retry',async()=>{
 await restart();await moveBehind();await p.keyboard.press('2');
 await waitFor(()=>window.__shadow.snapshot().guard.state==='investigate',13000);
 assert.equal((await snap()).guard.hp,3);await shot('desktop-investigation');
 await waitFor(()=>Math.abs(window.__shadow.snapshot().guard.x-window.__shadow.snapshot().player.x)<100);
 await p.keyboard.press('x');assert.equal((await snap()).guard.hp,2);assert.equal((await snap()).guard.state,'hostile');await shot('desktop-hostile');
 await waitFor(()=>window.__shadow.snapshot().phase==='failure',12000);await shot('desktop-failure');
 await p.locator('#begin').click();assert.equal((await snap()).phase,'playing');assert.equal((await snap()).guard.hp,3);assert.equal((await snap()).player.x,125);
});
await test('keyboard focus, pause, help, live locale switch preserves encounter and held movement',async()=>{
 await p.keyboard.press('Tab');const focused=await p.evaluate(()=>document.activeElement?.tagName);assert.equal(focused,'BUTTON');
 await p.locator('#pause').click();const paused=await snap();await p.waitForTimeout(200);assert.equal((await snap()).time,paused.time);await p.locator('#begin').click();
 await p.keyboard.down('d');const before=await snap();await p.locator('#language').click();await p.waitForTimeout(120);const after=await snap();assert.equal(after.locale,'zh-TW');assert.ok(after.player.x>before.player.x);assert.equal(after.phase,before.phase);await p.keyboard.up('d');
 await p.locator('#help').click();assert.ok(await p.locator('#overlay').isVisible());await p.locator('#begin').click();assert.ok(await p.locator('#overlay').isHidden());
 await p.reload();assert.equal((await snap()).locale,'zh-TW');assert.equal((await snap()).phase,'intro');
});
await test('mobile zh-TW touch: movement, fitting disguise, spike, exit, live language change',async()=>{
 await open(390,'zh-TW',true);await shot('mobile-intro-zh');await begin();await shot('mobile-upright-zh');
 // Chromium CDP generates real touch sequences with a held movement contact.
 const cdp=await p.context().newCDPSession(p);
 async function holdRightUntil(fn){
  const r=await p.locator('#right').boundingBox();await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:r.x+r.width/2,y:r.y+r.height/2}]});
  await waitFor(fn);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 }
 await holdRightUntil(()=>{const s=window.__shadow.snapshot();return s.guard.x-s.player.x<350;});
 await waitFor(()=>window.__shadow.snapshot().player.form==='idle');
 await p.locator('#box').tap();assert.equal((await snap()).player.form,'box');await shot('mobile-fitting-zh');
 const state=await snap();await p.locator('#language').tap();assert.equal((await snap()).player.x,state.player.x);assert.equal((await snap()).locale,'en');await p.locator('#language').tap();
 await waitFor(()=>Math.abs(window.__shadow.snapshot().guard.x-window.__shadow.snapshot().player.x)<95,20000);
 await p.locator('#attack').tap();assert.equal((await snap()).guard.hp,0);await shot('mobile-spike-zh');
 await holdRightUntil(()=>window.__shadow.snapshot().phase==='success');await shot('mobile-success-zh');assert.equal((await snap()).player.hp,3);
});
await test('mobile touch: wrong disguise investigation, ordinary damage, failure/retry',async()=>{
 await p.locator('#begin').tap();
 const cdp=await p.context().newCDPSession(p),r=await p.locator('#right').boundingBox();
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:r.x+r.width/2,y:r.y+r.height/2}]});
 await waitFor(()=>{const s=window.__shadow.snapshot();return s.guard.x-s.player.x<350;});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 await p.locator('#chair').tap();await waitFor(()=>window.__shadow.snapshot().guard.state==='investigate',13000);await shot('mobile-investigation-zh');
 await waitFor(()=>Math.abs(window.__shadow.snapshot().guard.x-window.__shadow.snapshot().player.x)<100);
 await p.locator('#attack').tap();assert.equal((await snap()).guard.hp,2);await shot('mobile-hostile-zh');
 await waitFor(()=>window.__shadow.snapshot().phase==='failure',12000);await shot('mobile-failure-zh');await p.locator('#begin').tap();assert.equal((await snap()).player.hp,3);
});
await test('exposed movement is immediately detected in sight, then failure and keyboard retry',async()=>{
 await open();await begin();await p.keyboard.down('d');
 await waitFor(()=>window.__shadow.snapshot().guard.state==='hostile');await p.keyboard.up('d');
 assert.ok(['blob','idle'].includes((await snap()).player.form));await shot('desktop-exposed-detection');
 await waitFor(()=>window.__shadow.snapshot().phase==='failure',12000);
 await p.keyboard.press('r');assert.equal((await snap()).phase,'playing');assert.equal((await snap()).player.hp,3);
 await p.keyboard.press('e');assert.equal((await snap()).player.form,'chair');
 await p.keyboard.press('q');assert.equal((await snap()).player.form,'box');
 await p.keyboard.press('c');assert.equal((await snap()).player.form,'idle');
 await p.keyboard.press('c');assert.equal((await snap()).player.form,'box');
});
await test('unresolved wrong-disguise inspection expires before hostility without a spike',async()=>{
 await restart();await moveBehind();await p.keyboard.press('2');
 await waitFor(()=>window.__shadow.snapshot().guard.state==='investigate',13000);
 assert.equal((await snap()).player.hp,3);
 await waitFor(()=>window.__shadow.snapshot().guard.state==='hostile',10000);
 assert.equal((await snap()).guard.hp,3);assert.equal((await snap()).player.hp,3);
 await shot('desktop-inspection-expired');
});
for(const width of [320,390,768,1440])for(const locale of ['en','zh-TW'])await test(`layout, labels, targets, axe: ${width}px ${locale}`,async()=>{
 await open(width,locale,width<500);
 // Intro and playing audited independently, with no excluded rules.
 for(const phase of ['intro','playing']){
  if(phase==='playing')await begin();
  const result=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  report.audits.push({width,locale,phase,violations:result.violations,incomplete:result.incomplete.map(x=>({id:x.id,nodes:x.nodes.map(n=>n.target)})),passes:result.passes.length});
  assert.deepEqual(result.violations.map(x=>({id:x.id,targets:x.nodes.map(n=>n.target)})),[]);
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 }
 const boxes=await p.locator('button:visible').evaluateAll(es=>es.map(e=>({id:e.id,w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height})));
 for(const b of boxes){assert.ok(b.w>=44&&b.h>=44,JSON.stringify(b));}
 await p.locator('#chair')[width<500?'tap':'click']();assert.equal((await snap()).player.form,'chair');
 await shot(`layout-${width}-${locale}`);
});
await test('blocked/corrupt preference storage is tolerated',async()=>{
 await open();for(const value of ['broken','__proto__','constructor']){await p.evaluate(v=>localStorage.setItem('sbm-language',v),value);await p.reload();assert.equal((await snap()).locale,'en');}
 await p.context().addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Blocked','SecurityError');}});});await p.reload();await p.locator('#language').click();assert.equal((await snap()).locale,'zh-TW');await begin();assert.equal((await snap()).phase,'playing');
});
await test('performance sample and offline runtime',async()=>{
 await open();await begin();
 assert.equal(await p.locator('#shadow').evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
 await p.emulateMedia({reducedMotion:'no-preference'});
 assert.equal(await p.locator('#shadow').evaluate(e=>getComputedStyle(e).transitionDuration),'0.16s');
 const perf=await p.evaluate(()=>new Promise(resolve=>{const times=[];let last=performance.now(),n=0;function frame(now){times.push(now-last);last=now;if(++n<180)requestAnimationFrame(frame);else{times.sort((a,b)=>a-b);resolve({frames:n,medianMs:times[90],p95Ms:times[171],maxMs:times.at(-1),svgNodes:document.querySelectorAll('svg *').length});}}requestAnimationFrame(frame);}));
 report.performance.push(perf);assert.ok(perf.p95Ms<100,JSON.stringify(perf));
 await p.context().setOffline(true);await p.keyboard.press('1');assert.equal((await snap()).player.form,'box');await p.keyboard.press('x');assert.equal((await snap()).guard.hp,3);assert.equal((await snap()).player.spike>0,true);
});
assert.deepEqual(report.errors,[]);assert.deepEqual(report.networkRequests,[]);
report.finished=new Date().toISOString();report.summary={pass:report.tests.filter(x=>x.status==='pass').length,fail:report.tests.filter(x=>x.status==='fail').length};
await writeFile('evidence/browser-results.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({summary:report.summary,performance:report.performance,errors:report.errors},null,2));
await browser.close();if(report.summary.fail)process.exitCode=1;
