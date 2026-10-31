import {mkdir,copyFile,cp,rm,readFile,writeFile} from 'node:fs/promises';
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
