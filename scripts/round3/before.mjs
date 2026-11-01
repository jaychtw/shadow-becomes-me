import {chromium} from 'playwright';
import {mkdir,writeFile} from 'node:fs/promises';
const out='evidence/playtest-round3';await mkdir(out,{recursive:true});
const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const samples=[];
for(const width of [1440,390]){
 const p=await b.newPage({viewport:{width,height:1050},hasTouch:width===390,isMobile:width===390});
 await p.goto('http://127.0.0.1:8082');if(width===390)await p.locator('#language').click();await p.locator('#begin').click();
 await p.keyboard.down('d');await p.waitForFunction(()=>{const s=__shadow.snapshot();return s.guard.x-s.player.x<350;});await p.keyboard.up('d');await p.waitForFunction(()=>__shadow.snapshot().player.form==='idle');await p.locator('#box').click();
 await p.waitForFunction(()=>{const s=__shadow.snapshot();return Math.abs(s.guard.x-s.player.x)<170;},null,{timeout:20000});await p.screenshot({path:`${out}/before-${width}-healthy.png`,fullPage:true});
 await p.locator('#chair').click();await p.waitForFunction(()=>__shadow.snapshot().guard.state==='investigate',null,{timeout:15000});
 await p.waitForFunction(()=>{const s=__shadow.snapshot();return Math.abs(s.guard.x-s.player.x)<100;});await p.locator('#attack').click();await p.screenshot({path:`${out}/before-${width}-wounded.png`,fullPage:true});
 samples.push({width,baselineZip:'shadow-becomes-me-playtest-r2-6d5c7d3.zip',state:await p.evaluate(()=>__shadow.snapshot()),method:'Actual player input against extracted Round 2 ZIP; full viewport screenshots'});await p.close();
}
await b.close();await writeFile(`${out}/before-results.json`,JSON.stringify(samples,null,2)+'\n');
