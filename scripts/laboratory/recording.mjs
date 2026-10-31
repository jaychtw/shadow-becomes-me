import {mkdir,writeFile,rm} from 'node:fs/promises';import {spawnSync} from 'node:child_process';import {resolve} from 'node:path';
let active=null;
export async function startRecording(page,name){
 const label=name.startsWith('desktop keyboard:')?'desktop':name.startsWith('mobile zh-TW touch:')?'phone':null;if(!label)return;
 const dir=resolve('evidence/raw-'+label);await mkdir(dir,{recursive:true});const cdp=await page.context().newCDPSession(page);const frames=[],writes=[];
 cdp.on('Page.screencastFrame',e=>{const path=resolve(dir,frames.length+'.jpg');frames.push({path,t:e.metadata.timestamp});writes.push(writeFile(path,Buffer.from(e.data,'base64')));cdp.send('Page.screencastFrameAck',{sessionId:e.sessionId}).catch(()=>{});});
 await cdp.send('Page.startScreencast',{format:'jpeg',quality:90,everyNthFrame:3});active={label,dir,cdp,frames,writes};
}
export async function stopRecording(){if(!active)return;const a=active;active=null;await a.cdp.send('Page.stopScreencast');await Promise.all(a.writes);let text='';for(let i=0;i<a.frames.length;i++){text+=`file '${a.frames[i].path}'\n`;if(i<a.frames.length-1)text+=`duration ${Math.max(.001,a.frames[i+1].t-a.frames[i].t)}\n`;}
 await writeFile(a.dir+'/frames.txt',text);const p=spawnSync('ffmpeg',['-v','error','-y','-f','concat','-safe','0','-i',a.dir+'/frames.txt','-fps_mode','vfr','-c:v','libvpx-vp9','-deadline','realtime','-cpu-used','6','-threads','2','-crf','32','-b:v','0',`evidence/gameplay-${a.label}.webm`],{encoding:'utf8'});if(p.status)throw Error(p.stderr);await writeFile(`evidence/recording-${a.label}.json`,JSON.stringify({frames:a.frames.length,durationSeconds:a.frames.at(-1).t-a.frames[0].t,method:'Actual Chromium CDP frames; real keyboard/touch playthrough; timestamp durations; system FFmpeg'},null,2));await rm(a.dir,{recursive:true});}
