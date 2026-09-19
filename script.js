const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
$('#year').textContent=new Date().getFullYear();
$('#menuBtn').addEventListener('click',()=>$('.nav').classList.toggle('open'));
$$('#navLinks a').forEach(a=>a.addEventListener('click',()=>$('.nav').classList.remove('open')));

function whatsappUrl(message){
  return 'https://wa.me/2349013321221?text='+encodeURIComponent(message);
}
function openWhatsApp(message){
  window.open(whatsappUrl(message),'_blank','noopener,noreferrer');
}

$$('.link-btn').forEach(b=>b.addEventListener('click',()=>{
  location.hash='enquiry';
  $('#machineSelect').value=b.dataset.product;
  setTimeout(()=>$('#enquiryForm').scrollIntoView({behavior:'smooth'}),30);
}));
$$('[data-product]').forEach(a=>{
  if(a.tagName==='A')a.addEventListener('click',()=>{
    const p=a.dataset.product;
    if(p&&$('#machineSelect'))$('#machineSelect').value=p;
    const message='Hello MAYFREDGLOBAL MACHINES, I am interested in your '+p+'. Please send me the current price and available specifications.';
    a.href=whatsappUrl(message);
  });
});

$('#enquiryForm').addEventListener('submit',e=>{
  e.preventDefault();
  const f=new FormData(e.target);
  const subject=encodeURIComponent('Machine Enquiry - '+f.get('machine'));
  const body=encodeURIComponent('Name: '+f.get('name')+'\nPhone: '+f.get('phone')+'\nMachine: '+f.get('machine')+'\nMessage: '+(f.get('message')||'No additional message'));
  location.href='mailto:fredafam@gmail.com?subject='+subject+'&body='+body;
});

$('#whatsappEnquiry').addEventListener('click',()=>{
  const f=new FormData($('#enquiryForm'));
  const name=(f.get('name')||'').trim();
  const phone=(f.get('phone')||'').trim();
  const machine=f.get('machine');
  const message=(f.get('message')||'').trim();
  if(!name||!phone){
    $('#enquiryForm').reportValidity();
    return;
  }
  openWhatsApp('Hello MAYFREDGLOBAL MACHINES, I would like to make an enquiry.\n\nName: '+name+'\nPhone: '+phone+'\nMachine: '+machine+'\nMessage: '+(message||'No additional message'));
});

const assistant=$('#assistant');
$('#assistantToggle').onclick=()=>assistant.classList.toggle('open');
$('#assistantClose').onclick=()=>assistant.classList.remove('open');

function answer(q){
  const x=q.toLowerCase();
  if(x.includes('whatsapp'))return 'You can chat with MAYFREDGLOBAL MACHINES directly on WhatsApp using the WhatsApp buttons on this website.';
  if(x.includes('machine'))return 'We currently showcase Pure Water Machines, Coding Machines, Sealing & Packaging equipment and other Production Equipment. Use the Machines section to browse.';
  if(x.includes('price')||x.includes('cost'))return 'For current prices, use “Request on WhatsApp” or choose a machine and send an enquiry. Prices can vary by model, capacity and specification.';
  if(x.includes('contact')||x.includes('phone')||x.includes('call'))return 'You can call 09013321221, chat on WhatsApp, or email fredafam@gmail.com. Facebook: mayfredglobalmachines. Instagram: @mayfredmachines.';
  if(x.includes('water'))return 'For pure water production equipment, choose Pure Water Machine in the enquiry form and tell us your desired capacity or requirements.';
  if(x.includes('coding'))return 'Coding machines are used for dates, batch information and production codes. Select Coding Machine in the enquiry form for a current price.';
  return 'I can help you navigate the machine categories, request a price, or contact MAYFREDGLOBAL MACHINES. Try asking “What machines do you sell?” or “How can I contact you?”';
}
function send(q){
  const c=$('#chat');
  c.insertAdjacentHTML('beforeend','<div class="user">'+q.replace(/[<>&]/g,'')+'</div><div class="bot">'+answer(q)+'</div>');
  c.scrollTop=c.scrollHeight;
}
$('#chatForm').addEventListener('submit',e=>{
  e.preventDefault();
  const i=$('#chatInput');
  if(i.value.trim()){send(i.value.trim());i.value=''}
});
$$('.suggestions button').forEach(b=>b.onclick=()=>send(b.dataset.q));