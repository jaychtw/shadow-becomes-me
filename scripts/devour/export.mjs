// Free local rasterization: existing Playwright + system Chromium. No network.
import {chromium} from 'playwright';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root=new URL('../../art/shadow-transformation/',import.meta.url);
const manifest=JSON.parse(await readFile(new URL('manifest.json',root),'utf8'));
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox'],headless:true});
for(const f of manifest.frames){
 const svg=await readFile(new URL(f.source,root));
 const p=await browser.newPage({viewport:{width:manifest.canvas[0],height:manifest.canvas[1]},deviceScaleFactor:1});
 await p.setContent(`<style>html,body{margin:0;background:transparent}img{display:block}</style><img src="data:image/svg+xml;base64,${svg.toString('base64')}">`);
 await p.locator('img').evaluate(e=>e.decode());
 const png=await p.screenshot({omitBackground:true});
 await writeFile(new URL(f.png,root),png);
 f.sourceSha256=createHash('sha256').update(svg).digest('hex');
 f.pngSha256=createHash('sha256').update(png).digest('hex');
 await p.close();
}
manifest.exporter={tool:'Playwright 1.56.1 / Chromium',browser:await browser.version(),deviceScaleFactor:1,alpha:true};
await writeFile(new URL('manifest.json',root),JSON.stringify(manifest,null,2)+'\n');
await browser.close();
