import vm from 'node:vm';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const project=new URL('./',import.meta.url);
const listeners={};let toastText='';const nodes=new Map();
function node(sel){if(!nodes.has(sel))nodes.set(sel,{innerHTML:'',textContent:'',className:'',value:'',min:'',style:{},classList:{add(){},remove(){}},setAttribute(){},showModal(){},close(){},focus(){},addEventListener(){},scrollTo(){},scrollBy(){}});return nodes.get(sel)}
const local=new Map();
const ctx=vm.createContext({document:{querySelector:node,addEventListener(t,f){(listeners[t]??=[]).push(f)},title:''},window:{addEventListener(){}},location:{hash:'#home',href:'http://localhost/#home'},localStorage:{getItem:k=>local.get(k),setItem:(k,v)=>local.set(k,v),removeItem:k=>local.delete(k)},setTimeout:()=>0,clearTimeout(){},console,URL,Date,Number,String,FormData:class{constructor(f){return { [Symbol.iterator]:()=>Object.entries(f.data)[Symbol.iterator]()}}},navigator:{},scrollY:0,scrollTo(){}});
vm.runInContext(fs.readFileSync(new URL('script.js',project),'utf8'),ctx);
const run=s=>vm.runInContext(s,ctx);
const routes=['home','about','signup','login','terms','profile','photo','match','personal','chat','community','feed','booking','detail/0','mountains'];let imageChecks=0;
for(const r of routes){run(`location.hash='#${r}';render()`);const html=node('#app').innerHTML;assert.ok(html.length>200,r+' rendered');for(const m of html.matchAll(/src="([^"]+)"/g)){assert.ok(fs.existsSync(new URL(m[1],project)),r+' missing '+m[1]);imageChecks++}}
function submit(id,data){for(const h of listeners.submit||[])h({target:{id,data},preventDefault(){}})}
run("location.hash='#signup';render()");submit('authForm',{name:'Stella',password:'abcdef'});assert.equal(run('location.hash'),'terms');assert.ok(!local.get('peakpal-original-v1').includes('abcdef'),'password never stored');
submit('profileForm',{name:'测试用户',experience:'新手',goal:'结识伙伴'});assert.equal(run('location.hash'),'photo');
submit('chatForm',{message:'你好 <script>alert(1)</script>'});assert.equal(run('state.messages[person].length'),1);run("location.hash='#chat';render()");assert.ok(node('#app').innerHTML.includes('&lt;script&gt;'));
submit('boardForm',{body:'计划去长白山'});assert.equal(run('state.board.length'),1);
submit('postForm',{title:'长白山路线',body:'路线分享'});assert.equal(run('state.posts.length'),1);
run("location.hash='#booking';render()");node('#checkout').value='2026-09-20';node('#checkin').value='2026-09-19';node('#campType').value='all';node('#guests').value='2';node('#campSort').value='default';node('#campSearch').value='长白山';run('filterCamps()');assert.equal((node('#campGrid').innerHTML.match(/class="camp-card"/g)||[]).length,1);
node('#campSearch').value='不存在的营地';run('filterCamps()');assert.ok(node('#campGrid').innerHTML.includes('data-action="resetFilters"'));
node('#checkout').value='2026-09-18';run('filterCamps()');assert.ok(node('#searchStatus').textContent.includes('晚于'));
run("location.hash='#detail/0';render()");submit('reserveForm',{start:'2026-09-20',end:'2026-09-19',guests:'2 成人'});assert.equal(run('state.bookings.length'),0);
submit('reserveForm',{start:'2026-09-20',end:'2026-09-22',guests:'2 成人'});assert.equal(run('state.bookings[0].total'),218);
for(const t of ['介绍','细节','回顾','房间选择'])assert.ok(run(`detailTab=${JSON.stringify(t)};detail()`).length>500);
console.log(JSON.stringify({routes:routes.length,imageReferences:imageChecks,checks:'Registration sequence, password privacy, profile, chat escaping, board, posts, filters, empty state, date validation, reservation total, detail tabs passed.'}));

