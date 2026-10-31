const $=s=>document.querySelector(s);
const esc=t=>String(t||'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
// photo + CV
$('#photo').src=SITE.photo;
if(SITE.cv){const a=$('#cv-link');a.href=SITE.cv;a.textContent='Download CV';a.setAttribute('download','')}
// timeline
const tl=$('#tl');
SITE.timeline.forEach(t=>{const a=document.createElement('article');a.className='ti rv';
a.innerHTML=`<div class="tc"><time>${esc(t.date)}</time><h3>${esc(t.title)}</h3><div class="where">${esc(t.where)}</div><ul>${t.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ul></div>`;tl.appendChild(a)});
// cards (projects, certificates, patents)
function cards(list,id){const g=$(id);list.forEach(c=>{const a=document.createElement(c.file||c.link?'a':'div');a.className='card rv'+(c.file||c.link?'':' ph');
const href=c.file||c.link;if(href){a.href=href;a.target='_blank';a.rel='noopener'}
a.innerHTML=(c.image?`<img class="thumb" src="${esc(c.image)}" alt="" onerror="this.remove()">`:'')+`<h3>${esc(c.title)}</h3><p>${esc(c.text||((c.issuer||'')+(c.year?' · '+c.year:'')))}</p>`+(href?'<span class="lnk">View →</span>':'');g.appendChild(a)})}
cards(SITE.projects,'#project-grid');cards(SITE.certificates,'#cert-grid');cards(SITE.patents,'#patent-grid');
// reveal + counters
function count(n){const T=+n.dataset.n,s=n.dataset.s||'',t0=performance.now();(function f(t){const p=Math.min((t-t0)/1400,1);n.textContent=Math.round(T*(1-Math.pow(1-p,3)))+s;if(p<1)requestAnimationFrame(f)})(t0)}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);const n=e.target.querySelector('[data-n]');if(n)count(n)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach((el,i)=>{el.style.transitionDelay=(i%4)*70+'ms';io.observe(el)});
// scroll progress + timeline fill
const bar=$('#bar'),fill=$('#fill');let tk=false;
function upd(){const h=document.documentElement.scrollHeight-innerHeight;bar.style.width=(scrollY/h*100)+'%';const r=tl.getBoundingClientRect();fill.style.height=Math.max(0,Math.min(r.height,innerHeight*.6-r.top))+'px';tk=false}
addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(upd)}},{passive:true});addEventListener('resize',upd);upd();
