import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile,rm} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';
const out='evidence/shadow-rest-integration';await mkdir(out,{recursive:true});
const report={started:new Date().toISOString(),cases:[],audits:[],errors:[],externalRequests:[]};
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});report.browser=await browser.version();
const origin='http://127.0.0.1:8081';
async function track(p){p.on('pageerror',e=>report.errors.push(e.message));p.on('request',r=>{if(!r.url().startsWith(origin)&&!r.url().startsWith('data:'))report.externalRequests.push(r.url());});await p.goto(origin+'/character-study/');await p.waitForFunction(()=>window.__characterStudy?.snapshot().ready);}
for(const width of [1440,390]){
 const ctx=await browser.newContext({viewport:{width,height:width===390?1000:1000},deviceScaleFactor:1,isMobile:width===390,hasTouch:width===390,reducedMotion:'reduce'});const p=await ctx.newPage();await track(p);
 assert.equal((await p.evaluate(()=>__characterStudy.snapshot())).playing,false);
 report.cases.push({name:`${width}: reduced motion starts paused`,status:'pass'});
 for(const [kind,count] of [['shadow',12],['guard',24]]){
  for(let i=0;i<count;i++){await p.locator(`#${kind}-scrub`).fill(String(i));assert.equal((await p.evaluate(()=>__characterStudy.snapshot()))[kind],i);}
 }
 await p.locator('#shadow-scrub').fill('11');await p.locator('#guard-scrub').fill('23');
 await p.locator('#step').click();let s=await p.evaluate(()=>__characterStudy.snapshot());assert.equal(s.shadow,0);assert.equal(s.guard,0);
 report.cases.push({name:`${width}: all 36 frames independently inspectable and step wraps`,status:'pass'});
 const first=await p.locator('#shadow').evaluate(e=>e.toDataURL());
 await p.locator('#shadow-scrub').fill('11');const last=await p.locator('#shadow').evaluate(e=>e.toDataURL());assert.equal(last,first);
 report.cases.push({name:`${width}: first and returned resting canvas pixels identical`,status:'pass'});
 await p.selectOption('#facing','left');assert.equal((await p.evaluate(()=>__characterStudy.snapshot())).facing,'left');await p.locator('#svg').check();assert.equal((await p.evaluate(()=>__characterStudy.snapshot())).source,true);await p.locator('#zoom').check();assert.equal((await p.evaluate(()=>__characterStudy.snapshot())).zoom,true);await p.locator('#zoom').uncheck();await p.locator('#svg').uncheck();await p.selectOption('#facing','right');
 report.cases.push({name:`${width}: facing, editable SVG comparison and zoom controls`,status:'pass'});
 for(const locale of ['en','zh-TW']){
  if(locale==='zh-TW')await p.locator('#language').click();assert.equal(await p.locator('html').getAttribute('lang'),locale);
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  const result=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();report.audits.push({width,locale,violations:result.violations,incomplete:result.incomplete.map(x=>({id:x.id,targets:x.nodes.map(n=>n.target)}))});assert.equal(result.violations.length,0);
  await p.locator('#shadow-scrub').fill('0');await p.locator('#guard-scrub').fill('0');
  await p.screenshot({path:`${out}/study-${width}-${locale}-rest.png`,fullPage:true});
  await p.locator('#shadow-scrub').fill('5');
  await p.screenshot({path:`${out}/study-${width}-${locale}.png`,fullPage:true});
 }
 report.cases.push({name:`${width}: two locales, no overflow, two zero-violation axe audits`,status:'pass'});
 await p.locator('#language').click();await p.keyboard.press('Tab');assert.ok(await p.evaluate(()=>['BUTTON','INPUT','SELECT','A'].includes(document.activeElement.tagName)));
 // Normal playback at 1x is recorded from the actual preview, not synthesized frames.
 await ctx.close();
 const rec=await browser.newContext({viewport:{width,height:1000},isMobile:width===390,hasTouch:width===390,reducedMotion:'no-preference'});const page=await rec.newPage();await track(page);await page.locator('.studies').scrollIntoViewIfNeeded();
 const raw=`${out}/raw-${width}`;await mkdir(raw,{recursive:true});const cdp=await rec.newCDPSession(page);const captured=[];const writes=[];
 cdp.on('Page.screencastFrame',event=>{const name=`frame-${String(captured.length).padStart(5,'0')}.jpg`;captured.push({name,timestamp:event.metadata.timestamp});writes.push(writeFile(`${raw}/${name}`,Buffer.from(event.data,'base64')));cdp.send('Page.screencastFrameAck',{sessionId:event.sessionId}).catch(()=>{});});
 await cdp.send('Page.startScreencast',{format:'jpeg',quality:95,maxWidth:width,maxHeight:1000,everyNthFrame:1});
 const a=await page.evaluate(()=>__characterStudy.snapshot());await page.waitForTimeout(700);const b=await page.evaluate(()=>__characterStudy.snapshot());assert.ok(b.time>a.time+500);
 await page.selectOption('#speed','0.5');await page.waitForTimeout(4600);await page.selectOption('#facing','left');await page.waitForTimeout(2400);await page.selectOption('#speed','1');await page.waitForTimeout(1200);
 report.cases.push({name:`${width}: actual autoplay, half-speed review and left-facing playback recorded`,status:'pass'});
 await cdp.send('Page.stopScreencast');await Promise.all(writes);assert.ok(captured.length>40);
 let concat='';for(let i=0;i<captured.length;i++){concat+=`file '${resolve(raw,captured[i].name)}'\n`;if(i<captured.length-1)concat+=`duration ${Math.max(.001,captured[i+1].timestamp-captured[i].timestamp)}\n`;}
 await writeFile(`${raw}/frames.txt`,concat);const encoded=spawnSync('ffmpeg',['-v','error','-y','-f','concat','-safe','0','-i',`${raw}/frames.txt`,'-fps_mode','vfr','-c:v','libvpx-vp9','-crf','30','-b:v','0',`${out}/study-${width}.webm`],{encoding:'utf8'});assert.equal(encoded.status,0,encoded.stderr);
 report.cases.push({name:`${width}: ${captured.length} actual CDP frames encoded with timestamp durations`,status:'pass'});await writeFile(`${out}/recording-${width}.json`,JSON.stringify({viewport:{width,height:1000},method:'Chromium CDP screencast JPEG quality 95 -> system FFmpeg VP9; original timestamp intervals',frames:captured.length,durationSeconds:captured.at(-1).timestamp-captured[0].timestamp,segments:'Initial 1x, then 0.5x right, 0.5x left, final 1x left; no generated frame substitution'},null,2)+'\n');await rm(raw,{recursive:true});await rec.close();
}
assert.deepEqual(report.errors,[]);assert.deepEqual(report.externalRequests,[]);report.finished=new Date().toISOString();report.summary={pass:report.cases.length,fail:0,audits:report.audits.length,violations:report.audits.reduce((n,a)=>n+a.violations.length,0)};await writeFile(`${out}/browser-results.json`,JSON.stringify(report,null,2)+'\n');await browser.close();console.log(JSON.stringify(report.summary));
