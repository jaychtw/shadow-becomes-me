import {chromium} from 'playwright';import {writeFile} from 'node:fs/promises';
const tag=process.env.ROUND2_TAG||'before',port=tag==='before'?8082:8080,out='evidence/playtest-round2';const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});const samples=[];
for(const width of [320,390,768,1440])for(const dpr of [1,1.25,1.5,2]){
 const c=await b.newContext({viewport:{width,height:900},deviceScaleFactor:dpr});const p=await c.newPage();await p.goto(`http://127.0.0.1:${port}`);await p.locator('#begin').click();await p.keyboard.down('d');
 for(const x of [160,260,360]){await p.waitForFunction(x=>__shadow.snapshot().player.x>=x,x);const geometry=await p.evaluate(()=>{const s=__shadow.snapshot();const m=document.getElementById('world').getScreenCTM();const a=new DOMPoint(s.player.x-60,499).matrixTransform(m),b=new DOMPoint(s.player.x+60,499).matrixTransform(m);return {playerX:s.player.x,form:s.player.form,x0:a.x,x1:b.x,floorTop:a.y,scale:m.d};});const file=`ground-${tag}-${width}-${dpr}-${x}.png`;await p.screenshot({path:`${out}/${file}`});samples.push({tag,width,dpr,x,file,...geometry});}
 await p.keyboard.up('d');await p.close();await c.close();}
await b.close();await writeFile(`${out}/ground-${tag}.json`,JSON.stringify(samples,null,2));console.log(samples.length+' actual moving samples captured '+tag);
