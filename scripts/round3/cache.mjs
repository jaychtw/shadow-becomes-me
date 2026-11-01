import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,readFile,writeFile,rm} from 'node:fs/promises';
import {spawn,execFileSync} from 'node:child_process';
import {resolve} from 'node:path';
const first=process.env.CACHE_FIRST_ZIP,second=process.env.CACHE_SECOND_ZIP;
assert.ok(first&&second,'Specify two successive real packaged checkpoint ZIPs');
const out=resolve('evidence/playtest-round3'),dir='/workspace/round3-cache/live',profile='/workspace/round3-cache/profile';
await mkdir(out,{recursive:true});await mkdir(dir,{recursive:true});
async function extract(zip){await rm(dir,{recursive:true,force:true});await mkdir(dir,{recursive:true});execFileSync('python3',['-m','zipfile','-e',zip,dir]);return JSON.parse(await readFile(dir+'/BUILD.json','utf8'));}
const a=await extract(first);const server=spawn('python3',[dir+'/serve.py','--directory',dir,'--port','8084'],{stdio:'ignore'});
let context;
try{
 for(let i=0;i<30;i++){try{await fetch('http://127.0.0.1:8084/BUILD.json');break;}catch{await new Promise(r=>setTimeout(r,100));}}
 context=await chromium.launchPersistentContext(profile,{executablePath:'/usr/bin/chromium',args:['--no-sandbox'],viewport:{width:1440,height:1050}});
 const p=await context.newPage(),responses=[];p.on('response',r=>responses.push({url:r.url(),status:r.status(),cacheControl:r.headers()['cache-control']||null}));
 await p.goto('http://127.0.0.1:8084');await p.locator('#begin').click();await p.keyboard.press('c');await p.locator('#language').click();assert.ok((await p.locator('#build-id').textContent()).includes(a.id));await p.screenshot({path:out+'/cache-first.png',fullPage:true});
 const b=await extract(second);assert.notEqual(a.id,b.id);assert.notEqual(a.sourceCommit,b.sourceCommit);await p.locator('#check-build').click();await p.waitForFunction(()=>document.getElementById('build-status').textContent.includes('已不同'));assert.equal(await p.evaluate(()=>__shadow.snapshot().player.form),'box');await p.screenshot({path:out+'/cache-open-tab-mismatch.png',fullPage:true});
 responses.length=0;await p.reload();await p.waitForFunction(()=>window.__shadow);assert.ok((await p.locator('#build-id').textContent()).includes(b.id));assert.equal(await p.evaluate(()=>__shadow.snapshot().locale),'zh-TW');await p.locator('#begin').click();await p.keyboard.press('c');assert.equal(await p.evaluate(()=>__shadow.snapshot().player.form),'box');await p.screenshot({path:out+'/cache-second.png',fullPage:true});
 assert.ok(responses.some(r=>r.url().includes(b.runtimeDirectory+'/src/main.js')));assert.ok(responses.every(r=>!r.url().includes(a.runtimeDirectory)));assert.ok(responses.filter(r=>r.url().startsWith('http:')).every(r=>r.cacheControl==='no-store'&&r.status===200));
 const conditional=await fetch('http://127.0.0.1:8084/BUILD.json',{headers:{'If-Modified-Since':'Fri, 01 Jan 2100 00:00:00 GMT','If-None-Match':'old-build'}});assert.equal(conditional.status,200);assert.equal((await conditional.json()).id,b.id);
 await writeFile(out+'/cache-results.json',JSON.stringify({pass:5,fail:0,firstBuild:a,secondBuild:b,samePersistentProfile:profile,sameOrigin:'http://127.0.0.1:8084',checks:['Two real successive checkpoint ZIPs, same browser profile and URL','Open old tab reports version mismatch without resetting encounter','Ordinary reload gets new identity, controls and versioned assets; locale persists','All HTTP responses no-store/200, no prior namespace requested','Conditional old/future cache validators cannot produce a stale 304'],responses,limitations:'This validates the new packaging workflow. It does not independently reproduce or identify the owner\'s earlier cache incident.'},null,2)+'\n');
 console.log('Five two-package cache/identity checks passed');
}finally{await context?.close();server.kill('SIGTERM');}
