import {chromium} from 'playwright';import {readFile,writeFile} from 'node:fs/promises';import {createHash} from 'node:crypto';
const root=new URL('../../art/laboratory-poc/runtime/',import.meta.url);const m=JSON.parse(await readFile(new URL('manifest.json',root)));
const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});const p=await b.newPage({viewport:{width:1680,height:640},deviceScaleFactor:1});
m.exports={};
for(const name of [...m.layers,'environment-reference']){const svg=await readFile(new URL(name+'.svg',root));await p.setContent(`<style>body{margin:0;background:transparent}img{display:block}</style><img src="data:image/svg+xml;base64,${svg.toString('base64')}">`);await p.locator('img').evaluate(e=>e.decode());const png=await p.screenshot({omitBackground:true});await writeFile(new URL(name+'.png',root),png);m.exports[name]=createHash('sha256').update(png).digest('hex');}
m.browser=await b.version();await writeFile(new URL('manifest.json',root),JSON.stringify(m,null,2)+'\n');await b.close();console.log('Exported editable groups without reference actors.');
