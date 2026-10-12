// Small interaction improvements, retaining the original routes and page structure.
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-action]');if(!b)return;
 if(b.dataset.action==='resetFilters'){
  $('#campSearch').value='';$('#campType').value='all';$('#guests').value='2';$('#campSort').value='default';state.maxPrice=null;save();filterCamps();
 }
 if(b.dataset.action==='myBookings'){
  modal(`<h2>我的预约</h2>${state.bookings.length?state.bookings.map((x,i)=>`<article class="saved-item"><h3>${x.camp===0?'长白山稻田营地':esc(camps[x.camp][0])}</h3><p>${esc(x.start)} 至 ${esc(x.end)}</p><p>${esc(x.guests)} · $${x.total}</p><div class="actions">${link('detail/'+x.camp,'查看营地','link')}<button class="link" data-action="cancelBooking" data-index="${i}">取消预约</button></div></article>`).join(''):`<div class="state-empty"><p>还没有保存的预约。<br>先为下一段旅途找一处歇脚的地方。</p>${link('booking','探索营地','primary')}</div>`}<p class="form-note">此处保存本机模拟预约，不产生真实订单。</p>`);
 }
 if(b.dataset.action==='cancelBooking'){
  const i=Number(b.dataset.index);state.bookings.splice(i,1);save();closeModal();render();toast('模拟预约已取消');
 }
 if(b.dataset.action==='myFavorites'){
  modal(`<h2>收藏的营地</h2>${state.likes.length?state.likes.map(i=>`<article class="saved-item"><h3>${i===0?'长白山稻田营地':esc(camps[i][0])}</h3><p>$${camps[i][2]} / 晚</p>${link('detail/'+i,'查看详情 ↗')}</article>`).join(''):`<div class="state-empty"><p>把心仪的营地留在这里，<br>准备出发时再来看看。</p>${link('booking','浏览营地','primary')}</div>`}`);
 }
 if(b.dataset.action==='history'){
  modal(`<h2>历史轨迹</h2>${state.plans.length?state.plans.map(x=>`<article class="saved-item"><h3>${esc(x.destination)}</h3><p>${esc(x.date)}</p><p>${esc(x.note)}</p></article>`).join(''):'<div class="state-empty"><p>你的山野故事，从下一份行程开始。</p><button class="primary" data-action="plans">创建行程</button></div>'}`);
 }
});
