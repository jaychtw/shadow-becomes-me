import build from './build-info.js';
let status=null;
export function renderBuildIdentity(t) {
 const link=document.getElementById('build-id');
 const label=`${t('build')}: ${t('buildRound')} · ${build.id}`;
 if(link.textContent!==label)link.textContent=label;
 link.setAttribute('aria-label',label);
 document.getElementById('build-status').textContent=status?t(status):'';
}
export async function checkBuild() {
 try {
  const response=await fetch(new URL('../../../BUILD.json',import.meta.url),{cache:'no-store'});
  if(!response.ok)throw Error('Build unavailable');
  const served=await response.json();
  status=served.id===build.id?'buildCurrent':'buildNew';
 } catch {status='buildUnavailable';}
}
