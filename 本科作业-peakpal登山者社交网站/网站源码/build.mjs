import {mkdir,copyFile,cp,readFile} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const f of ['index.html','styles.css','script.js','refinements.css','enhancements.js'])await copyFile(f,`dist/${f}`);
await cp('assets','dist/assets',{recursive:true});
const js=await readFile('script.js','utf8');
new Function(js);
new Function(await readFile('enhancements.js','utf8'));
console.log('PEAKPAL built: 13 original artboards with registration states.');
