const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const hd=$('#hd'),bg=$('#bg'),lk=$('#lk');
addEventListener('scroll',()=>hd.classList.toggle('sc',scrollY>20),{passive:true});
const tg=o=>{lk.classList.toggle('o',o);bg.classList.toggle('o',o);bg.setAttribute('aria-expanded',o)};
bg.onclick=()=>tg(!lk.classList.contains('o'));
$$('.links a').forEach(a=>a.addEventListener('click',()=>tg(false)));
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('v');io.unobserve(x.target)}}),{threshold:.15});
$$('.rv').forEach(el=>io.observe(el));
// carousel
const sl=$$('.slide'),ds=$('#ds');let i=0,t;
sl.forEach((_,k)=>{const b=document.createElement('button');b.setAttribute('aria-label','Review '+(k+1));b.onclick=()=>go(k);ds.append(b)});
function go(n){i=(n+sl.length)%sl.length;sl.forEach((s,k)=>s.classList.toggle('a',k===i));$$('#ds button').forEach((b,k)=>b.classList.toggle('a',k===i));auto()}
function auto(){clearInterval(t);if(!matchMedia('(prefers-reduced-motion:reduce)').matches)t=setInterval(()=>go(i+1),6500)}
$('#pv').onclick=()=>go(i-1);$('#nx').onclick=()=>go(i+1);
$('.car').addEventListener('mouseenter',()=>clearInterval(t));$('.car').addEventListener('mouseleave',auto);
go(0);
// form
const fm=$('#fm'),ms=$('#ms');
$('#d').min=new Date().toISOString().split('T')[0];
fm.addEventListener('submit',e=>{
e.preventDefault();let ok=true;
const chk=(id,f,txt)=>{const el=$(id),bad=!f(el.value.trim());el.classList.toggle('bad',bad);el.parentElement.querySelector('.er').textContent=bad?txt:'';if(bad)ok=false};
chk('#n',v=>v.length>1,'Enter the parent\'s name.');
chk('#p',v=>/^(\+?91)?[\s-]?[6-9]\d{4}[\s-]?\d{5}$/.test(v),'Enter a valid 10-digit mobile number.');
chk('#a',v=>v.length>0,'Enter your child\'s age.');
chk('#d',v=>v&&v>=$('#d').min,'Choose today or a future date.');
if(!ok){ms.className='msg no';ms.textContent='Please fix the highlighted fields and try again.';return}
const txt=`Hello, I'd like to request an appointment.%0AParent: ${$('#n').value}%0APhone: ${$('#p').value}%0AChild's age: ${$('#a').value}%0APreferred date: ${$('#d').value}%0AMessage: ${$('#m').value||'-'}`;
ms.className='msg ok';ms.textContent='Thanks! WhatsApp is opening with your request. Please press send there — the clinic will confirm your slot.';
open('https://wa.me/918793755556?text='+txt.replace(/\n/g,'%0A'),'_blank','noopener');
});
$$('[data-book]').forEach(a=>a.addEventListener('click',()=>setTimeout(()=>$('#n').focus({preventScroll:true}),700)));