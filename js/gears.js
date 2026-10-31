/* Gears: meshing gear sets that turn with time and with scroll.
   To change them, edit the chain(...) lines below: n = number of teeth,
   x / y = position of the first gear in % of its section, th = angle (deg) from the previous gear. */
(function(){
const NS='http://www.w3.org/2000/svg',PI=Math.PI;
function circ(cx,cy,r){return 'M'+(cx+r)+' '+cy+'A'+r+' '+r+' 0 1 0 '+(cx-r)+' '+cy+'A'+r+' '+r+' 0 1 0 '+(cx+r)+' '+cy+'Z'}
function gpath(n){const Ro=95,Rr=80,a=2*PI/n;let d='';for(let i=0;i<n;i++){const b=i*a;[[b,Rr],[b+a*.2,Ro],[b+a*.5,Ro],[b+a*.7,Rr]].forEach((p,j)=>{d+=(i||j?'L':'M')+(Math.cos(p[0])*p[1]).toFixed(1)+' '+(Math.sin(p[0])*p[1]).toFixed(1)})}d+='Z'+circ(0,0,14);for(let i=0;i<5;i++){const t=i*2*PI/5;d+=circ((Math.cos(t)*46).toFixed(1),(Math.sin(t)*46).toFixed(1),11)}return d}
function svg(n,size){const s=document.createElementNS(NS,'svg');s.setAttribute('viewBox','-100 -100 200 200');s.setAttribute('width',size);s.setAttribute('height',size);const p=document.createElementNS(NS,'path');p.setAttribute('d',gpath(n));p.setAttribute('fill','currentColor');p.setAttribute('fill-rule','evenodd');s.appendChild(p);return s}
const all=[],K=14;
function chain(id,list){const box=document.getElementById(id);if(!box)return;let prev=null;list.forEach(g=>{const size=g.n*K,el=document.createElement('div');el.className='gear'+(g.alt?' alt':'');el.appendChild(svg(g.n,size));g.size=size;g.el=el;if(!prev){g.dx=0;g.dy=0;el.style.left=g.x+'%';el.style.top=g.y+'%';g.base=g}else{const th=g.th*PI/180,dist=.4375*(prev.size+size);g.th=th;g.dx=prev.dx+dist*Math.cos(th);g.dy=prev.dy+dist*Math.sin(th);g.base=prev.base;el.style.left='calc('+prev.base.x+'% + '+g.dx.toFixed(1)+'px)';el.style.top='calc('+prev.base.y+'% + '+g.dy.toFixed(1)+'px)';g.parent=prev}el.style.width=el.style.height=size+'px';el.style.marginLeft=el.style.marginTop=(-size/2)+'px';box.appendChild(el);all.push(g);prev=g})}
chain('g-hero',[{n:26,x:90,y:26},{n:14,th:150},{n:20,th:95},{n:12,th:160}]);
chain('g-hero',[{n:22,x:4,y:92,alt:1},{n:12,th:-40,alt:1},{n:16,th:-95,alt:1}]);
chain('g-about',[{n:30,x:96,y:50,alt:1},{n:16,th:200,alt:1}]);
chain('g-contact',[{n:24,x:6,y:18},{n:14,th:40},{n:10,th:100}]);
chain('g-contact',[{n:18,x:96,y:88,alt:1},{n:12,th:215,alt:1}]);
const tlEl=document.getElementById('tl'),fl=document.getElementById('fill');
const tg=document.createElement('div');tg.className='gear tg';tg.style.width=tg.style.height='46px';tg.style.marginLeft='-23px';tg.appendChild(svg(12,46));tlEl.appendChild(tg);
const nb=document.querySelector('nav b'),ng=document.createElement('span');ng.className='ngear';ng.appendChild(svg(10,22));nb.insertBefore(ng,nb.firstChild);
const still=matchMedia('(prefers-reduced-motion:reduce)').matches;
function frame(t){const sy=scrollY,T=still?0:t;
all.forEach(g=>{let p;if(!g.parent){p=T*.00018+sy*.0035}else{const A=g.parent,th=g.th;p=th+PI-(2.4*PI-A.n*(th-A.phi))/g.n}g.phi=p;g.el.style.transform='rotate('+p+'rad)'});
tg.style.top=((parseFloat(fl.style.height)||0)-23)+'px';tg.style.transform='rotate('+(sy*.012+T*.0004)+'rad)';
ng.style.transform='rotate('+(sy*.008+T*.0006)+'rad)';
if(!still)requestAnimationFrame(frame)}
requestAnimationFrame(frame);if(still)addEventListener('scroll',()=>frame(0),{passive:true});
})();
