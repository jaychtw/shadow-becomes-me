import build from './build-info.js';
let status=null;
export function renderBuildIdentity(t) {
 const link=document.getElementById('build-id');
 const label=`${t('build')}: ${t('buildRound')} · ${build.id}`;
 if(link.textContent!==label){link.textContent=label;link.setAttribute('aria-label',label);}
 const result=document.getElementById('build-status'),message=status?t(status):'';
 // Do not repeatedly replace a live-region text node on every animation frame.
 if(result.textContent!==message)result.textContent=message;
}
export async function checkBuild() {
 try {
  const response=await fetch(new URL('../../../BUILD.json',import.meta.url),{cache:'no-store'});
  if(!response.ok)throw Error('Build unavailable');
  const served=await response.json();
  status=served.id===build.id?'buildCurrent':'buildNew';
 } catch {status='buildUnavailable';}
}
