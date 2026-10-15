const cv=document.getElementById('c'),ctx=cv.getContext('2d'),card=document.getElementById('card'),inp=document.getElementById('wish'),st=document.getElementById('st'),panel=document.getElementById('panel');
const S=[["May this year be gentle with you","me"],["Slow mornings and loud laughter","a friend"],["That you never doubt how loved you are","someone who adores you"],["Every dream you whisper comes a little closer","me"],["More days that feel like soft light","your person"],["May the people you love stay close","a friend"],["For everything beautiful to find you first","me"],["A year of small, ordinary miracles","someone far away"],["Rest, when you need it. Always.","me"],["May you feel as special as you are","your person"],["That your laugh is the loudest thing in every room","a friend"],["Sunsets, and someone to watch them with","me"],["To be as happy as you make everyone else","your person"],["Courage on the hard days","a friend"],["Home, wherever you are","me"],["Your next chapter, the best one yet","someone who loves you"],["Everything you give, returned tenfold","a friend"],["Quiet joy, every single day","me"],["For you to always feel chosen","your person"],["Happy birthday, beautiful","everyone"]];
const R=60,RP=24,YMAX=75,EYE=1.6;
let W,H,DPR,f,zoom=1,yaw=0,pit=.2,cx=0,cz=0,t=0,last=0,GS,BS,follow=null,pin=null,pinT=0,hov=null,shown=null,walking=0;
const L=[],vis=[],keys={},ST=[],NB=[],G=[],FL=[],FF=[],RG=15,GC=['#12170f','#1b2315','#242d1c','#0b0f09'],FC=['#f2e9dc','#cbb5a2','#e8c9c0','#d9c8b1','#f6dede'];let GN,GF;
const rnd=(a,b)=>a+Math.random()*(b-a),pick=a=>a[Math.random()*a.length|0],wrap=(v,c,r)=>((v-c+r)%(2*r)+2*r)%(2*r)-r;
let c1,s1,c2,s2;
const pr=(dx,dy,dz)=>{const x=dx*c1-dz*s1,z0=dx*s1+dz*c1;return[x,dy*c2-z0*s2,dy*s2+z0*c2]};

function sprites(){let s=document.createElement('canvas');s.width=s.height=128;let x=s.getContext('2d'),g=x.createRadialGradient(64,64,0,64,64,64);
 g.addColorStop(0,'rgba(240,205,165,.85)');g.addColorStop(.3,'rgba(232,170,130,.3)');g.addColorStop(1,'rgba(220,140,110,0)');x.fillStyle=g;x.fillRect(0,0,128,128);GS=s;
 s=document.createElement('canvas');s.width=100;s.height=140;x=s.getContext('2d');
 const b=()=>{x.beginPath();x.moveTo(24,22);x.quadraticCurveTo(50,-4,76,22);x.lineTo(87,124);x.lineTo(13,124);x.closePath()};
 b();g=x.createLinearGradient(13,0,87,0);[[0,'#a58877'],[.25,'#e6d0be'],[.5,'#f8eee2'],[.75,'#e6d0be'],[1,'#a58877']].forEach(a=>g.addColorStop(a[0],a[1]));x.fillStyle=g;x.fill();
 x.save();b();x.clip();g=x.createRadialGradient(50,122,2,50,118,85);g.addColorStop(0,'rgba(244,208,160,.95)');g.addColorStop(.5,'rgba(232,170,130,.45)');g.addColorStop(1,'rgba(220,140,110,0)');x.fillStyle=g;x.fillRect(0,0,100,140);
 x.strokeStyle='rgba(120,80,40,.2)';for(let i=0;i<16;i++){x.beginPath();x.moveTo(rnd(15,85),rnd(8,60));x.lineTo(rnd(15,85),rnd(60,120));x.stroke()}x.restore();
 x.fillStyle='#f0cfa6';x.beginPath();x.ellipse(50,124,37,7,0,0,7);x.fill();x.fillStyle='#fbf0e0';x.beginPath();x.ellipse(50,123,20,4,0,0,7);x.fill();
 x.beginPath();x.moveTo(50,98);x.quadraticCurveTo(59,115,50,124);x.quadraticCurveTo(41,115,50,98);x.fillStyle='#fff8ee';x.fill();BS=s;
 const rg=(c)=>{const q=document.createElement('canvas');q.width=q.height=128;const y=q.getContext('2d'),h=y.createRadialGradient(64,64,0,64,64,64);h.addColorStop(0,`rgba(${c},.9)`);h.addColorStop(.3,`rgba(${c},.3)`);h.addColorStop(1,`rgba(${c},0)`);y.fillStyle=h;y.fillRect(0,0,128,128);return q};
 GF=rg('242,222,190');GN=rg('110,130,255')}
function world(){const n=[.35,.8,-.45],m=Math.hypot(...n);n[0]/=m;n[1]/=m;n[2]/=m;
 let u=[n[1]*1-n[2]*0,n[2]*0-n[0]*1,0];const um=Math.hypot(...u);u=u.map(v=>v/um);const v=[n[1]*u[2]-n[2]*u[1],n[2]*u[0]-n[0]*u[2],n[0]*u[1]-n[1]*u[0]];
 for(let i=0;i<1700;i++){let x=rnd(-1,1),y=rnd(-1,1),z=rnd(-1,1);const r=Math.hypot(x,y,z);if(r>1||r<.1){i--;continue}
  if(i>1000){const d=x*n[0]+y*n[1]+z*n[2];x-=d*n[0]*.8;y-=d*n[1]*.8;z-=d*n[2]*.8}
  const q=Math.hypot(x,y,z);x/=q;y/=q;z/=q;if(y<-.02){i--;continue}
  const b=Math.random();ST.push({x,y,z,m:.25+b*b*.75,r:b>.93?2.4:b>.6?1.6:1,sp:rnd(.8,3),p:rnd(0,7),c:pick(['#f2e9dc','#fff4de','#e6dccd'])})}
 for(let i=0;i<22;i++){const a=i/22*6.283,c=Math.cos(a),d=Math.sin(a);NB.push({x:c*u[0]+d*v[0],y:c*u[1]+d*v[1],z:c*u[2]+d*v[2],a:rnd(.06,.14)})}
 for(let i=0;i<1100;i++)G.push({x:rnd(-RG,RG),z:rnd(-RG,RG),h:rnd(.25,.6),ph:rnd(0,7),c:i%4});
 for(let i=0;i<170;i++)FL.push({x:rnd(-RG,RG),z:rnd(-RG,RG),h:rnd(.4,.75),ph:rnd(0,7),c:i%5});
 for(let i=0;i<45;i++)FF.push({x:rnd(-RG,RG),z:rnd(-RG,RG),y:rnd(.4,3),ph:rnd(0,7),sp:rnd(.6,1.4)})}

function reset(l,init){const w=pick(S);l.wish=w[0];l.place=w[1];l.vy=rnd(.5,1.1);l.ph=rnd(0,7);l.f=rnd(0,7);l.w=rnd(.45,.65);l.a=0;l.hold=0;
 if(init){if(Math.random()<.3){const a=rnd(0,6.28),r=rnd(4,22);l.x=cx+Math.cos(a)*r;l.z=cz+Math.sin(a)*r}else{l.x=cx+rnd(-R,R);l.z=cz+rnd(-R,R)}l.y=rnd(2,YMAX);l.a=1}
 else{const a=rnd(0,6.28),r=rnd(8,50);l.x=cx+Math.cos(a)*r;l.z=cz+Math.sin(a)*r;l.y=rnd(.8,2)}}
function build(){DPR=Math.min(2,devicePixelRatio||1);W=innerWidth;H=innerHeight;cv.width=W*DPR;cv.height=H*DPR;
 if(!L.length){world();const n=W<700?800:1500;for(let i=0;i<n;i++){const l={};reset(l,true);L.push(l)}}}

function release(){const w=inp.value.trim();
 if(!w){inp.classList.remove('err');void inp.offsetWidth;inp.classList.add('err');inp.focus();st.textContent='Your lantern needs a wish first.';return}
 const l={x:cx+Math.sin(yaw)*1.8,z:cz+Math.cos(yaw)*1.8,y:1.3,vy:.8,w:.85,ph:rnd(0,7),f:rnd(0,7),a:0,hold:0,mine:true,ty:rnd(26,42),wish:w,place:'you'};
 L.push(l);inp.value='';inp.blur();pin=l;pinT=t+9;follow=l;st.textContent='Rising. Drag anywhere to look elsewhere.'}

function frame(now){const dt=Math.min(.1,(now-last)/1000||.016);last=now;t=now/1000;
 if(keys.ArrowLeft)yaw+=dt*1.2;if(keys.ArrowRight)yaw-=dt*1.2;if(keys.ArrowUp)pit+=dt;if(keys.ArrowDown)pit-=dt;
 let mv=(keys.w||walking?1:0)-(keys.s?1:0),sd=(keys.d?1:0)-(keys.a?1:0);
 if(mv||sd){cx+=(Math.sin(yaw)*mv+Math.cos(yaw)*sd)*3*dt;cz+=(Math.cos(yaw)*mv-Math.sin(yaw)*sd)*3*dt}
 if(follow){const dx=follow.x-cx,dz=follow.z-cz,dy=follow.y-EYE,hy=Math.hypot(dx,dz)||1,ty=Math.atan2(dx,dz),tp=Math.atan2(dy,hy)*.75;
  yaw+=(((ty-yaw+Math.PI)%(6.2832)+6.2832)%6.2832-Math.PI)*dt*1.6;pit+=(tp-pit)*dt*1.6;if(follow.y>follow.ty-3||t>pinT+3)follow=null}
 pit=Math.max(-.3,Math.min(1.5,pit));f=Math.max(W*.8,H*.9)*zoom;
 c1=Math.cos(yaw);s1=Math.sin(yaw);c2=Math.cos(pit);s2=Math.sin(pit);
 ctx.setTransform(DPR,0,0,DPR,0,0);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.lineCap='round';
 const hy=H/2+f*Math.tan(pit);
 let g=ctx.createLinearGradient(0,hy-f*1.1,0,hy);g.addColorStop(0,'#000');g.addColorStop(1,'#000');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 ctx.globalCompositeOperation='lighter';
 for(const n of []){const q=pr(n.x,n.y,n.z);if(q[2]<.1)continue;const k=f/q[2],r=f*.42;ctx.globalAlpha=n.a*(.8+.2*Math.sin(t*.3+n.x*9));ctx.drawImage(GN,W/2+q[0]*k-r,H/2-q[1]*k-r,2*r,2*r)}
 for(const o of ST){const q=pr(o.x,o.y,o.z);if(q[2]<.05)continue;const k=f/q[2],x=W/2+q[0]*k,y=H/2-q[1]*k;if(x<0||x>W||y<0||y>H)continue;ctx.globalAlpha=o.m*(.7+.3*Math.sin(t*o.sp+o.p));ctx.fillStyle=o.c;ctx.fillRect(x,y,o.r,o.r)}
 ctx.globalCompositeOperation='source-over';
 if(hy>0){g=ctx.createLinearGradient(0,hy-H*.35,0,hy);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.globalAlpha=1;ctx.fillStyle=g;const y0=Math.max(0,hy-H*.35);ctx.fillRect(0,y0,W,Math.min(H,hy)-y0);
  if(hy<H){g=ctx.createLinearGradient(0,hy,0,hy+H*.5);g.addColorStop(0,'#060605');g.addColorStop(.25,'#0a0a07');g.addColorStop(1,'#030302');ctx.fillStyle=g;ctx.fillRect(0,hy,W,H-hy)}}
 // meadow
 const sway=(b)=>Math.sin(t*1.1+b.ph+b.x*.4)*.07;
 for(const b of G){const dx=wrap(b.x,cx,RG),dz=wrap(b.z,cz,RG),d=Math.hypot(dx,dz)/RG,q=pr(dx,-EYE,dz);if(q[2]<.4)continue;
  const k=f/q[2],x=W/2+q[0]*k,y=H/2-q[1]*k;if(y<0||y>H+60||x<-60||x>W+60)continue;
  const w=sway(b),u=pr(dx+w,-EYE+b.h,dz);if(u[2]<.2)continue;const k2=f/u[2],tx=W/2+u[0]*k2,ty=H/2-u[1]*k2;
  ctx.globalAlpha=Math.max(0,1-d**4);ctx.strokeStyle=GC[b.c];ctx.lineWidth=Math.max(.8,.02*k);ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x+(tx-x)*.15,y+(ty-y)*.65,tx,ty);ctx.stroke()}
 for(const b of FL){const dx=wrap(b.x,cx,RG),dz=wrap(b.z,cz,RG),d=Math.hypot(dx,dz)/RG,q=pr(dx,-EYE,dz);if(q[2]<.5)continue;
  const k=f/q[2],x=W/2+q[0]*k,y=H/2-q[1]*k;if(y<-20||y>H+80||x<-60||x>W+60)continue;
  const u=pr(dx+sway(b),-EYE+b.h,dz),k2=f/u[2],tx=W/2+u[0]*k2,ty=H/2-u[1]*k2,al=Math.max(0,1-d**4);
  ctx.globalAlpha=al;ctx.strokeStyle='#2a3321';ctx.lineWidth=Math.max(.8,.015*k);ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(tx,ty);ctx.stroke();
  const r=Math.max(1.4,.05*k2);ctx.fillStyle=FC[b.c];ctx.globalAlpha=al*.25;ctx.beginPath();ctx.arc(tx,ty,r*2.4,0,7);ctx.fill();ctx.globalAlpha=al*.9;ctx.beginPath();ctx.arc(tx,ty,r,0,7);ctx.fill()}
 // lanterns
 vis.length=0;
 for(const l of L){
  if(l.mine){l.vy+=(Math.min(.9,Math.max(0,(l.ty-l.y)*.12))-l.vy)*dt;l.y+=l.vy*dt+Math.sin(t+l.ph)*.004;l.a=Math.min(1,l.a+dt*.6)}
  else{if(l.hold>0)l.hold-=dt;else l.y+=l.vy*dt;l.x+=(.25+Math.sin(t*.4+l.ph)*.15)*dt;l.z+=Math.cos(t*.3+l.ph)*.1*dt;l.a=Math.min(1,l.a+dt*.5);if(l.y>YMAX){reset(l,false);continue}}
  const dx=wrap(l.x,cx,R),dz=wrap(l.z,cz,R),q=pr(dx,l.y-EYE,dz);if(q[2]<.5)continue;
  const k=f/q[2],sx=W/2+q[0]*k,sy=H/2-q[1]*k,s=l.w*k;if(sx<-s||sx>W+s||sy<-s||sy>H+s)continue;
  const d=Math.hypot(dx,dz)/R;l.sx=sx;l.sy=sy;l.s=s;l.z2=q[2];
  l.al=l.a*(l.mine?1:Math.max(0,1-d**4))*Math.min(1,(YMAX-l.y)/12)*Math.min(1,(q[2]-.5)/1.2);if(l.al>.01)vis.push(l)}
 vis.sort((a,b)=>b.z2-a.z2);
 for(const l of vis){const s=l.s,a=l.al*(.88+.12*Math.sin(t*7+l.f)+Math.sin(t*19+l.f*3)*.03);
  if(s<2.4){ctx.globalCompositeOperation='source-over';ctx.globalAlpha=Math.min(1,a*(.55+s*.25));ctx.fillStyle='#f2d9bf';ctx.fillRect(l.sx-.8,l.sy-1,1.7+s*.2,2.2+s*.3);continue}
  ctx.globalCompositeOperation='lighter';ctx.globalAlpha=a*(s<8?.55:.5);const g=s*(s<8?4:3.4);ctx.drawImage(GS,l.sx-g/2,l.sy-g/2,g,g);
  ctx.globalCompositeOperation='source-over';
  if(s<8){ctx.globalAlpha=Math.min(1,a);ctx.fillStyle='#f2d9bf';ctx.fillRect(l.sx-s*.4,l.sy-s*.5,s*.8,s*1.1)}
  else{ctx.globalAlpha=Math.min(1,a);ctx.drawImage(BS,l.sx-s/2,l.sy-s*.7,s,s*1.4)}}
 ctx.globalCompositeOperation='source-over';
 ctx.globalCompositeOperation='lighter';
 for(const o of FF){o.x+=Math.cos(t*.5*o.sp+o.ph)*.5*dt;o.z+=Math.sin(t*.4*o.sp+o.ph*2)*.5*dt;const y=o.y+Math.sin(t*.3*o.sp+o.ph)*.6,dx=wrap(o.x,cx,RG),dz=wrap(o.z,cz,RG),q=pr(dx,y-EYE,dz);if(q[2]<.4)continue;
  const k=f/q[2],x=W/2+q[0]*k,yy=H/2-q[1]*k,bl=Math.max(0,Math.sin(t*1.6*o.sp+o.ph*3))**2*(1-(Math.hypot(dx,dz)/RG)**4);if(bl<.03)continue;
  const r=Math.max(8,.45*k);ctx.globalAlpha=bl*.8;ctx.drawImage(GF,x-r/2,yy-r/2,r,r);ctx.globalAlpha=bl;ctx.fillStyle='#fff2d8';ctx.fillRect(x-1,yy-1,2,2)}
 ctx.globalCompositeOperation='source-over';
 for(const l of vis)if(l.mine){const r=Math.max(16,l.s*.85)+Math.sin(t*4)*2;ctx.globalAlpha=.7;ctx.strokeStyle='#d9c8b1';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(l.sx,l.sy-l.s*.1,r,0,7);ctx.stroke()}
 const o=(pin&&t<pinT)?pin:hov;
 if(o&&vis.includes(o)){if(shown!==o){shown=o;card.innerHTML='';const a=document.createElement('div');a.textContent='\u201C'+o.wish+'\u201D';const b=document.createElement('small');b.textContent=o.mine?'your wish':'from '+o.place;card.append(a,b)}
  card.className='on'+(o.mine?' mine':'');const cxp=Math.max(8,Math.min(W-228,o.sx-110));card.style.transform=`translate(${cxp}px,${Math.max(8,Math.min(H-120,o.sy-Math.max(o.s*.8,14)-card.offsetHeight-6))}px)`}
 else{card.className='';shown=null}
 requestAnimationFrame(frame)}

function hit(x,y){for(let i=vis.length-1;i>=0;i--){const l=vis[i],r=Math.max(14,l.s*.6);if(Math.abs(x-l.sx)<r&&Math.abs(y-l.sy)<r*1.2&&l.al>.3)return l}return null}
let drag=null;
cv.addEventListener('pointerdown',e=>{cv.setPointerCapture(e.pointerId);drag={x:e.clientX,y:e.clientY,m:0};follow=null;pin=null});
cv.addEventListener('pointermove',e=>{if(drag){const dx=e.clientX-drag.x,dy=e.clientY-drag.y;drag.m+=Math.abs(dx)+Math.abs(dy);drag.x=e.clientX;drag.y=e.clientY;yaw-=dx/f*1.1;pit+=dy/f*1.1;hov=null}else if(e.pointerType==='mouse')hov=hit(e.clientX,e.clientY)});
cv.addEventListener('pointerup',e=>{if(drag&&drag.m<6){const h=hit(e.clientX,e.clientY);pin=h;pinT=t+6}drag=null});
cv.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.max(.6,Math.min(2.6,zoom*Math.exp(-e.deltaY*.001)))},{passive:false});
addEventListener('keydown',e=>{if(e.target===inp){if(e.key==='Enter')release();return}keys[e.key.length>1?e.key:e.key.toLowerCase()]=1;if(e.key.startsWith('Arrow'))e.preventDefault()});
addEventListener('keyup',e=>{delete keys[e.key.length>1?e.key:e.key.toLowerCase()]});
const wk=document.getElementById('walk');wk.addEventListener('pointerdown',e=>{wk.setPointerCapture(e.pointerId);walking=1;follow=null});wk.addEventListener('pointerup',()=>walking=0);wk.addEventListener('pointercancel',()=>walking=0);
document.getElementById('go').onclick=release;
addEventListener('resize',build);
sprites();build();requestAnimationFrame(frame);

(function(){const au=document.getElementById('audio'),mt=document.getElementById('mt');if(!au||!mt)return;
const songs={"1":"assets/song1.mp3","2":"assets/song2.mp3"},ls={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}}};
let sel=ls.get('for-her-selected-song');if(!songs[sel])sel='1';au.src=songs[sel];
const pos=Number(ls.get('for-her-position'));if(pos>0)au.addEventListener('loadedmetadata',()=>{au.currentTime=Math.min(pos,Math.max(0,au.duration-.1))},{once:true});
const ui=()=>mt.setAttribute('aria-pressed',String(!au.paused));
au.addEventListener('play',()=>{ls.set('for-her-playing','true');ui()});
au.addEventListener('pause',()=>{ls.set('for-her-playing','false');ui()});
au.addEventListener('timeupdate',()=>ls.set('for-her-position',String(au.currentTime)));
mt.addEventListener('click',()=>{au.paused?au.play().catch(()=>{}):au.pause()});
if(ls.get('for-her-playing')==='true')au.play().catch(()=>{});ui()})();

(function(){const door=document.getElementById('door'),orb=document.getElementById('orb'),cue=document.getElementById('cue');if(!door||!orb)return;
pit=-.28;zoom=1.45;
let p=0,hold=false,done=false,last=0,aim=false,pulses=0,raf=0;const kick=()=>{if(!raf){last=performance.now();raf=requestAnimationFrame(tick)}};
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const openLanterns=new URLSearchParams(window.location.search).has('lanterns');
function rip(x,y){const r=document.createElement('span');r.className='rip';r.style.left=x+'px';r.style.top=y+'px';document.body.appendChild(r);r.addEventListener('animationend',()=>r.remove())}
function tick(now){raf=0;if(done)return;const dt=Math.min(.1,(now-last)/1000||.016);last=now;
 p=hold?Math.min(1,p+dt/1.15):Math.max(0,p-dt*1.4);
 orb.style.setProperty('--p',p);orb.querySelector('.core').style.setProperty('--s',1+p*1.4);
 if(p>=1)return enter();if(hold||p>0)raf=requestAnimationFrame(tick)}
function enter(){if(done)return;
 if(window.top!==window.self){window.top.location.href='wishes_meadow.html?lanterns=1';return}
 done=true;door.classList.add('go');document.body.classList.remove('pre');
 try{const a=document.getElementById('audio');if(a&&a.paused)a.play().catch(()=>{})}catch(e){}
 aim=true;const t0=performance.now(),p0=pit,z0=zoom,P1=.22,Z1=1;
 setTimeout(()=>{(function step(n){if(!aim)return;const k=Math.min(1,(n-t0-900)/4200);if(k>=0){const e=1-Math.pow(1-k,3);pit=p0+(P1-p0)*e;zoom=z0+(Z1-z0)*e}if(k<1)requestAnimationFrame(step);else aim=false})(performance.now())},0);
 cv.addEventListener('pointerdown',()=>{aim=false},{once:true});
 setTimeout(()=>door.remove(),3200)}
orb.addEventListener('pointerdown',e=>{e.preventDefault();orb.setPointerCapture(e.pointerId);rip(e.clientX,e.clientY);if(rm){enter();return}hold=true;kick()});
['pointerup','pointercancel'].forEach(t=>orb.addEventListener(t,()=>{if(hold&&!done&&p<.35&&++pulses>=1)cue.textContent='Keep holding\u2026 a little longer.';hold=false;if(!done)kick()}));
orb.addEventListener('click',e=>{if(e.detail===0)enter()});
door.addEventListener('contextmenu',e=>e.preventDefault());
if(openLanterns){done=true;pit=.1;zoom=.82;document.body.classList.remove('pre');door.remove()}
orb.focus({preventScroll:true});
})();


