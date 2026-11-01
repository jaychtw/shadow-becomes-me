import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {mkdir,copyFile,cp,rm,readFile,writeFile,readdir,rename} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});
await mkdir('dist');
for(const file of ['index.html','style.css']) await copyFile(file,`dist/${file}`);
await cp('src','dist/src',{recursive:true});
await mkdir('dist/art');
await copyFile('art/laboratory.svg','dist/art/laboratory.svg');
console.log('Static build: dist/ (no runtime network dependencies)');

await mkdir('dist/art/characters',{recursive:true});
await copyFile('art/character-experiment/manifest.json','dist/art/characters/manifest.json');
await cp('art/character-experiment/frames','dist/art/characters/frames',{recursive:true});

await mkdir('dist/art/laboratory',{recursive:true});
await copyFile('art/laboratory-poc/runtime/distant-background.png','dist/art/laboratory/distant-background.png');
await copyFile('art/laboratory-poc/runtime/architecture.png','dist/art/laboratory/architecture.png');
await copyFile('art/laboratory-poc/runtime/illumination.png','dist/art/laboratory/illumination.png');
await copyFile('art/laboratory-poc/runtime/architectural-details.png','dist/art/laboratory/architectural-details.png');
await copyFile('art/laboratory-poc/runtime/floor.png','dist/art/laboratory/floor.png');
await copyFile('art/laboratory-poc/runtime/background-props.png','dist/art/laboratory/background-props.png');
await copyFile('art/laboratory-poc/runtime/foreground.png','dist/art/laboratory/foreground.png');

await writeFile('dist/art/characters/manifest.js','export default '+await readFile('art/character-experiment/manifest.json','utf8')+';');

await mkdir('dist/art/devour',{recursive:true});
await writeFile('dist/art/devour/manifest.js','export default '+await readFile('art/shadow-transformation/manifest.json','utf8')+';');

await cp('devour-study','dist/devour-study',{recursive:true});

const restSvg=await readFile('art/character-experiment/reference/shadow-rest-candidate.svg','utf8');
await writeFile('dist/art/characters/rest-path.js','export default '+JSON.stringify(restSvg.match(/<path[^>]*\sd="([^"]+)"/)[1])+';');

// One immutable namespace keeps imports, dynamic image URLs and styles in sync.
async function filesIn(dir){const files=[];for(const item of await readdir(dir,{withFileTypes:true})){const p=`${dir}/${item.name}`;files.push(...(item.isDirectory()?await filesIn(p):[p]));}return files.sort();}
const sourceCommit=execFileSync('git',['rev-parse',process.env.BUILD_SOURCE_COMMIT||'HEAD'],{encoding:'utf8'}).trim();
const runtimePaths=['src','art','devour-study','index.html','style.css','scripts/build.js','scripts/local-server.py','package.json','package-lock.json'];
const dirty=execFileSync('git',['diff',sourceCommit,'--name-only','--',...runtimePaths],{encoding:'utf8'}).trim()||execFileSync('git',['ls-files','--others','--exclude-standard','--',...runtimePaths],{encoding:'utf8'}).trim();
const hash=createHash('sha256').update(sourceCommit);
for(const file of await filesIn('dist'))hash.update(file.slice(5)).update(await readFile(file));
hash.update(await readFile('scripts/local-server.py')).update(await readFile('scripts/build.js'));
const id='r3-'+hash.digest('hex').slice(0,12),runtimeDirectory=`assets/${id}`;
const build={version:'Playtest Round 3',id,sourceCommit,workingTreeModified:Boolean(dirty),runtimeDirectory,archive:`shadow-becomes-me-${id}.zip`};
await writeFile('dist/src/build-info.js','export default '+JSON.stringify(build)+';');
await mkdir(`dist/${runtimeDirectory}`,{recursive:true});
for(const name of ['src','art','style.css','devour-study'])await rename(`dist/${name}`,`dist/${runtimeDirectory}/${name}`);
let entry=await readFile('index.html','utf8');
entry=entry.replace('href="style.css"',`href="${runtimeDirectory}/style.css"`).replace('src="src/main.js"',`src="${runtimeDirectory}/src/main.js"`).replaceAll('href="art/',`href="${runtimeDirectory}/art/`).replace('@BUILD_ID@',id);
await writeFile('dist/index.html',entry);
await writeFile('dist/BUILD.json',JSON.stringify(build,null,2)+'\n');
await copyFile('scripts/local-server.py','dist/serve.py');
// Stable study entry, with all actual renderer dependencies in the same namespace.
await mkdir('dist/devour-study');
const study=(await readFile('devour-study/index.html','utf8')).replaceAll('src="actor.html?',`src="../${runtimeDirectory}/devour-study/actor.html?`);
await writeFile('dist/devour-study/index.html',study);
console.log(`Build ${id} (${sourceCommit.slice(0,7)}${dirty?' + local changes':''})`);
