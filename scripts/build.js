import {mkdir,copyFile,cp,rm} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});
await mkdir('dist');
for(const file of ['index.html','style.css']) await copyFile(file,`dist/${file}`);
await cp('src','dist/src',{recursive:true});
await mkdir('dist/art');
await copyFile('art/laboratory.svg','dist/art/laboratory.svg');
console.log('Static build: dist/ (no runtime network dependencies)');
