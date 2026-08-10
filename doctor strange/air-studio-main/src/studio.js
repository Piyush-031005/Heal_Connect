import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

// ============================================================================
// Doctor Strange — pure magic-circle spellcasting.
//   Any hand conjures a rune circle from its five fingers (open = bloom,
//   fist = collapse, snap ✊→🖐 = cast, twist wrist = spin, ✌️ = shield).
//   Two hands link with a beam and fuse into a portal when brought together.
// ============================================================================

const stage = document.getElementById("stage");
const ctx = stage.getContext("2d");
const video = document.getElementById("webcam");
const gate = document.getElementById("gate");
const gateTitle = document.getElementById("gateTitle");
const gateMsg = document.getElementById("gateMsg");
const startBtn = document.getElementById("startBtn");
const soundBtn = document.getElementById("soundBtn");
const modeLabel = document.getElementById("modeLabel");
const foldLabel = document.getElementById("foldLabel");
const dmFill = document.getElementById("dmFill");
const debugEl = document.getElementById("debug");

// Fading trail layer (light trails), composited over the camera.
const trail = document.createElement("canvas");
const tctx = trail.getContext("2d");

let recognizer = null;
let lastVideoTime = -1;
let lastFrame = performance.now();
let showDebug = false; // dev readout, toggle with D
let lastErr = "";
let soundOn = true;
let merged = false;

// ---- One-Euro smoothing (steady when still, snappy when moving) ----
class LowPass { constructor(){ this.s=null; } filter(x,a){ this.s=this.s==null?x:a*x+(1-a)*this.s; return this.s; } }
class OneEuro {
  constructor(mc=1.7,b=0.015,dc=1){ this.mc=mc; this.b=b; this.dc=dc; this.xf=new LowPass(); this.dxf=new LowPass(); this.lx=null; }
  _a(c,dt){ const t=1/(2*Math.PI*c); return 1/(1+t/dt); }
  filter(x,dt){ if(dt<=0)dt=1/30; const dx=this.lx==null?0:(x-this.lx)/dt; this.lx=x; const e=this.dxf.filter(dx,this._a(this.dc,dt)); const c=this.mc+this.b*Math.abs(e); return this.xf.filter(x,this._a(c,dt)); }
  reset(){ this.xf=new LowPass(); this.dxf=new LowPass(); this.lx=null; }
}

function resize(){
  const dpr=Math.min(window.devicePixelRatio||1,2);
  for(const c of [stage,trail]){ c.width=window.innerWidth*dpr; c.height=window.innerHeight*dpr; }
  ctx.setTransform(dpr,0,0,dpr,0,0);
  tctx.setTransform(dpr,0,0,dpr,0,0);
}
window.addEventListener("resize", resize);
resize();

function toScreen(x,y){
  const W=window.innerWidth,H=window.innerHeight;
  const vw=video.videoWidth||1280, vh=video.videoHeight||720;
  const scale=Math.max(W/vw,H/vh); const dw=vw*scale, dh=vh*scale;
  return { x: W-((W-dw)/2 + x*dw), y: (H-dh)/2 + y*dh };
}
function d3(a,b){ return Math.hypot(a.x-b.x, a.y-b.y, (a.z||0)-(b.z||0)); }
function d2(a,b){ return Math.hypot(a.x-b.x, a.y-b.y); }
function span(lm){ return d2(lm[0], lm[9]); }
function wrap(a){ while(a>Math.PI)a-=2*Math.PI; while(a<-Math.PI)a+=2*Math.PI; return a; }

// Lightweight gesture classifier (for the ✌️ shield).
function fUp(lm, tip, pip){ return d3(lm[tip],lm[0]) > d3(lm[pip],lm[0])*1.05; }
function classifyGesture(lm){
  const idx=fUp(lm,8,6), mid=fUp(lm,12,10), rng=fUp(lm,16,14), pky=fUp(lm,20,18);
  if(idx && mid && !rng && !pky) return "Victory";
  return "None";
}

// ---- Depth ("how far") calibration: apparent hand span -> 0 far .. 1 near ----
let spanMin=0.16, spanMax=0.42;
function depthOf(s){
  spanMin=Math.min(spanMin,s)+0.00004; spanMax=Math.max(spanMax,s)-0.00004;
  if(spanMax-spanMin<0.08){ const m=(spanMin+spanMax)/2; spanMin=m-0.04; spanMax=m+0.04; }
  return Math.max(0,Math.min(1,(s-spanMin)/(spanMax-spanMin)));
}

// ---- Audio: pentatonic harp + whoosh SFX ----
let audio=null, noiseBuf=null;
const PENT=[261.63,293.66,329.63,392.0,440.0,523.25,587.33,659.25];
function pluck(freq, amt=0.13){
  if(!audio||!soundOn) return; const t=audio.currentTime;
  const o=audio.createOscillator(); o.type="triangle"; o.frequency.value=freq;
  const o2=audio.createOscillator(); o2.type="sine"; o2.frequency.value=freq*2;
  const g=audio.createGain(); g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(amt,t+0.008); g.gain.exponentialRampToValueAtTime(0.0001,t+0.9);
  const lp=audio.createBiquadFilter(); lp.type="lowpass"; lp.frequency.value=2400;
  o.connect(g); o2.connect(g); g.connect(lp); lp.connect(audio.destination);
  o.start(t); o2.start(t); o.stop(t+0.95); o2.stop(t+0.95);
}
function getNoise(){ if(!noiseBuf){ const len=Math.floor(audio.sampleRate*0.5); noiseBuf=audio.createBuffer(1,len,audio.sampleRate); const d=noiseBuf.getChannelData(0); for(let i=0;i<len;i++) d[i]=Math.random()*2-1; } return noiseBuf; }
function whoosh(hue=40, from=1700, to=280){ if(!audio||!soundOn) return; const t=audio.currentTime; const src=audio.createBufferSource(); src.buffer=getNoise(); const bp=audio.createBiquadFilter(); bp.type="bandpass"; bp.Q.value=0.9; bp.frequency.setValueAtTime(from,t); bp.frequency.exponentialRampToValueAtTime(to,t+0.42); const g=audio.createGain(); g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(0.22,t+0.03); g.gain.exponentialRampToValueAtTime(0.001,t+0.46); src.connect(bp); bp.connect(g); g.connect(audio.destination); src.start(t); src.stop(t+0.5); }

// ---- Runes + ornate/shield circle drawing (hue-parameterized) ----
function makeRunes(count){
  const grid=[]; for(let gy=-1;gy<=1;gy++) for(let gx=-1;gx<=1;gx++) grid.push([gx*0.5,gy*0.5]);
  let seed=7; const rnd=()=>((seed=(seed*1103515245+12345)&0x7fffffff)/0x7fffffff);
  const out=[]; for(let i=0;i<count;i++){ const segs=[]; const n=2+Math.floor(rnd()*3); for(let k=0;k<n;k++){ const a=grid[Math.floor(rnd()*9)], b=grid[Math.floor(rnd()*9)]; segs.push([a[0],a[1],b[0],b[1]]); } out.push(segs); }
  return out;
}
const RUNES = makeRunes(18);
function mArc(c,cx,cy,r,a,hue=40){ if(r<=0)return; c.strokeStyle=`hsla(${hue},95%,55%,${a*0.35})`; c.lineWidth=3.5; c.beginPath(); c.arc(cx,cy,r,0,Math.PI*2); c.stroke(); c.strokeStyle=`hsla(${hue},100%,90%,${a})`; c.lineWidth=1; c.stroke(); }
function mLine(c,x1,y1,x2,y2,a,hue=40,w=1){ c.strokeStyle=`hsla(${hue},95%,55%,${a*0.35})`; c.lineWidth=w*3; c.beginPath(); c.moveTo(x1,y1); c.lineTo(x2,y2); c.stroke(); c.strokeStyle=`hsla(${hue},100%,92%,${a})`; c.lineWidth=w; c.stroke(); }
function drawOrnate(c,cx,cy,R,a,spin,hue){
  mArc(c,cx,cy,R,a,hue); mArc(c,cx,cy,R*0.93,a*0.8,hue); mArc(c,cx,cy,R*0.6,a*0.9,hue); mArc(c,cx,cy,R*0.5,a*0.7,hue); mArc(c,cx,cy,R*0.14,a,hue);
  const ticks=64;
  for(let i=0;i<ticks;i++){ const ang=(i/ticks)*Math.PI*2+spin; const long=i%4===0; const ri=R*0.93, ro=R*(long?1.06:1.0); mLine(c,cx+Math.cos(ang)*ri,cy+Math.sin(ang)*ri,cx+Math.cos(ang)*ro,cy+Math.sin(ang)*ro,a*(long?0.9:0.4),hue,long?1.3:0.7); }
  const rr=R*0.55, rsz=R*0.05;
  for(let i=0;i<RUNES.length;i++){ const ang=(i/RUNES.length)*Math.PI*2-spin*1.3; const gx=cx+Math.cos(ang)*rr, gy=cy+Math.sin(ang)*rr; c.save(); c.translate(gx,gy); c.rotate(ang+Math.PI/2); for(const s of RUNES[i]) mLine(c,s[0]*rsz,s[1]*rsz,s[2]*rsz,s[3]*rsz,a*0.8,hue,0.8); c.restore(); }
  for(let i=0;i<12;i++){ const ang=(i/12)*Math.PI*2+spin*0.5; mLine(c,cx+Math.cos(ang)*R*0.5,cy+Math.sin(ang)*R*0.5,cx+Math.cos(ang)*R*0.6,cy+Math.sin(ang)*R*0.6,a*0.5,hue,0.8); }
  const cg=c.createRadialGradient(cx,cy,0,cx,cy,R*0.18); cg.addColorStop(0,`hsla(${hue},100%,85%,${a})`); cg.addColorStop(1,`hsla(${hue},100%,60%,0)`); c.fillStyle=cg; c.beginPath(); c.arc(cx,cy,R*0.18,0,Math.PI*2); c.fill();
}
function poly(c,cx,cy,r,sides,rot,a,hue,w){ const p=[]; for(let i=0;i<sides;i++){ const A=rot+i/sides*Math.PI*2; p.push([cx+Math.cos(A)*r, cy+Math.sin(A)*r]); } for(let i=0;i<sides;i++){ const n=p[(i+1)%sides]; mLine(c,p[i][0],p[i][1],n[0],n[1],a,hue,w); } }
function drawShield(c,cx,cy,R,a,spin,hue){
  poly(c,cx,cy,R,6,spin,a,hue,1.2); poly(c,cx,cy,R*0.8,6,spin+0.26,a*0.7,hue,0.9);
  poly(c,cx,cy,R*0.5,3,-spin,a*0.8,hue,1); poly(c,cx,cy,R*0.5,3,-spin+Math.PI,a*0.6,hue,0.9);
  for(let i=0;i<6;i++){ const A=spin+i/6*Math.PI*2; mLine(c,cx+Math.cos(A)*R*0.5,cy+Math.sin(A)*R*0.5,cx+Math.cos(A)*R,cy+Math.sin(A)*R,a*0.4,hue,0.7); }
  const cg=c.createRadialGradient(cx,cy,0,cx,cy,R*0.9); cg.addColorStop(0,`hsla(${hue},100%,70%,${a*0.12})`); cg.addColorStop(1,`hsla(${hue},100%,70%,0)`); c.fillStyle=cg; c.beginPath(); c.arc(cx,cy,R*0.9,0,Math.PI*2); c.fill();
}

// ---- Per-hand magic circles (all 5 fingers) ----
const circles = new Map();
const shockwaves = [];
const sparks = [];
const embers = [];
const FINGERTIPS=[4,8,12,16,20];
const PALM=[0,5,9,13,17];
const HAND_HUE=[40, 280]; // gold, violet
const SPRING=0.28, DAMP=0.62;
function getCircle(label){
  let c=circles.get(label);
  if(!c){ const idx=circles.size; c={ label, active:false, alpha:0, cx:0,cy:0,R:80, rawcx:0,rawcy:0,tR:80, vx:0,vy:0, born:false, spin:Math.random()*Math.PI*2, open:0, topen:0, depth:0, note:idx, hue:HAND_HUE[idx%HAND_HUE.length], style:"portal", wasFist:false, castCd:0, lastPalm:0,
    fcx:new OneEuro(1.5,0.09), fcy:new OneEuro(1.5,0.09),
    fnodes:Array.from({length:5},()=>({x:0,y:0,rx:0,ry:0,lp:0,fx:new OneEuro(1.7,0.09),fy:new OneEuro(1.7,0.09)})) }; circles.set(label,c); }
  return c;
}
function palmCenterN(lm){ let x=0,y=0; for(const i of PALM){ x+=lm[i].x; y+=lm[i].y; } return {x:x/PALM.length, y:y/PALM.length}; }
function opennessOf(lm){ const pc=palmCenterN(lm); const hs=d2(lm[0],lm[9])||0.1; const F=[8,12,16,20]; let s=0; for(const t of F) s+=Math.hypot(lm[t].x-pc.x, lm[t].y-pc.y); s/=F.length; return Math.max(0, Math.min(1, (s/hs - 0.5)/0.85)); }

function processCircles(hands, labels, gests, now){
  const seen=new Set();
  for(let i=0;i<hands.length;i++){
    const lm=hands[i]; const label=labels[i]||("H"+i); const c=getCircle(label);
    const pcN=palmCenterN(lm); const pc=toScreen(pcN.x, pcN.y);
    const wS=toScreen(lm[0].x,lm[0].y), mS=toScreen(lm[9].x,lm[9].y);
    const handPx=Math.hypot(wS.x-mS.x, wS.y-mS.y)||40;
    c.rawcx=pc.x; c.rawcy=pc.y; c.topen=opennessOf(lm); c.tR=handPx*(0.9+c.topen*2.6); c.depth=depthOf(span(lm));
    c.style = gests[i]==="Victory" ? "shield" : "portal";
    const pang=Math.atan2(lm[17].y-lm[5].y, lm[17].x-lm[5].x);
    if(c.born) c.spin += wrap(pang - c.lastPalm); c.lastPalm=pang;
    for(let k=0;k<5;k++){ const p=toScreen(lm[FINGERTIPS[k]].x, lm[FINGERTIPS[k]].y); const n=c.fnodes[k]; n.rx=p.x; n.ry=p.y; if(!c.born){ n.x=p.x; n.y=p.y; } }
    if(!c.active){ if(!c.born){ c.cx=pc.x; c.cy=pc.y; c.R=c.tR; c.lastPalm=pang; c.born=true; } c.fcx.reset(); c.fcy.reset(); for(const n of c.fnodes){ n.fx.reset(); n.fy.reset(); } pluck(PENT[c.note%PENT.length]); }
    c.active=true; seen.add(label);
  }
  for(const c of circles.values()) if(!seen.has(c.label)) c.active=false;
}
function castBurst(c){
  let dx=c.vx||0, dy=c.vy||0; const sp=Math.hypot(dx,dy);
  if(sp<120){ dx=0; dy=-1; } else { dx/=sp; dy/=sp; }
  const baseA=Math.atan2(dy,dx);
  shockwaves.push({ x:c.cx, y:c.cy, r:c.R*0.3, maxR:c.R*2.7, life:0.55, max:0.55, hue:c.hue, dx, dy });
  whoosh(c.hue); pluck(174.61, 0.14);
  for(let i=0;i<30;i++){ const a=baseA+(Math.random()-0.5)*Math.PI*0.7; const speed=200+Math.random()*300; sparks.push({x:c.cx,y:c.cy,vx:Math.cos(a)*speed,vy:Math.sin(a)*speed,life:0.4+Math.random()*0.5,max:0.9,hue:c.hue,size:2+Math.random()*3}); }
}
function stepShock(dt){ for(let i=shockwaves.length-1;i>=0;i--){ const s=shockwaves[i]; s.life-=dt; if(s.life<=0){ shockwaves.splice(i,1); continue; } s.r += (s.maxR-s.r)*Math.min(1,dt*6); if(s.dx){ s.x += s.dx*260*dt; s.y += s.dy*260*dt; } } }
function drawShock(c){ c.save(); c.globalCompositeOperation="lighter"; for(const s of shockwaves){ const a=s.life/s.max; mArc(c,s.x,s.y,s.r,a*0.85,s.hue); mArc(c,s.x,s.y,s.r*0.82,a*0.4,s.hue); } c.restore(); }
function stepCircles(now, dt){
  const list=[];
  for(const c of circles.values()){
    c.castCd=Math.max(0,c.castCd-dt);
    c.alpha += ((c.active?1:0)-c.alpha)*0.14;
    if(c.alpha<0.01 && !c.active){ c.born=false; continue; }
    const ox=c.cx, oy=c.cy;
    c.cx=c.fcx.filter(c.rawcx,dt); c.cy=c.fcy.filter(c.rawcy,dt);
    c.vx=(c.cx-ox)/(dt||0.016); c.vy=(c.cy-oy)/(dt||0.016);
    c.R += (c.tR-c.R)*0.25; c.open += (c.topen-c.open)*0.25;
    c.spin += dt*(0.3+c.depth*0.9);
    if(c.topen<0.25) c.wasFist=true;
    if(c.wasFist && c.topen>0.8 && c.castCd<=0){ castBurst(c); c.wasFist=false; c.castCd=0.8; }
    for(const n of c.fnodes){ const px=n.x, py=n.y; n.x=n.fx.filter(n.rx,dt); n.y=n.fy.filter(n.ry,dt);
      const vx=(n.x-px)/(dt||0.016), vy=(n.y-py)/(dt||0.016); const sp=Math.hypot(vx,vy);
      if(sp>800 && now-n.lp>200){ n.lp=now; pluck(PENT[Math.min(PENT.length-1,Math.floor((1-n.y/window.innerHeight)*PENT.length))],0.07); if(Math.random()<0.5) sparks.push({x:n.x,y:n.y,vx:vx*0.35+(Math.random()-0.5)*30,vy:vy*0.35+(Math.random()-0.5)*30,life:0.4+Math.random()*0.4,max:0.8,hue:c.hue,size:2+Math.random()*2}); }
    }
    if(c.alpha>0.03) list.push(c);
  }
  return list;
}
function drawHandCircle(c, C){
  const cx=C.cx, cy=C.cy; const R=Math.max(28, C.R*(0.28+0.72*C.open)); const a=(0.5+C.depth*0.4)*C.alpha;
  const hue = C.style==="shield" ? 190 : C.hue;
  c.save(); c.lineCap="round";
  if(C.style==="shield") drawShield(c,cx,cy,R,a,C.spin,hue); else drawOrnate(c,cx,cy,R,a,C.spin,hue);
  const angs=C.fnodes.map(n=>Math.atan2(n.y-cy,n.x-cx)).sort((p,q)=>p-q);
  const V=angs.map(A=>({x:cx+Math.cos(A)*R*0.5, y:cy+Math.sin(A)*R*0.5})); const N=V.length;
  for(let i=0;i<N;i++){ mLine(c,V[i].x,V[i].y,V[(i+1)%N].x,V[(i+1)%N].y,a*0.6,hue,0.9); if(N>=5) mLine(c,V[i].x,V[i].y,V[(i+2)%N].x,V[(i+2)%N].y,a*0.9,hue,1); }
  for(const n of C.fnodes){ mLine(c,cx,cy,n.x,n.y,C.alpha*0.2,hue,0.7); const g=c.createRadialGradient(n.x,n.y,0,n.x,n.y,13); g.addColorStop(0,`hsla(${hue},100%,80%,${C.alpha})`); g.addColorStop(1,`hsla(${hue},100%,60%,0)`); c.fillStyle=g; c.beginPath(); c.arc(n.x,n.y,13,0,Math.PI*2); c.fill(); }
  if(Math.random()<0.5){ const sa=Math.random()*Math.PI*2; sparks.push({x:cx+Math.cos(sa)*R,y:cy+Math.sin(sa)*R,vx:-Math.sin(sa)*70+(Math.random()-0.5)*30,vy:Math.cos(sa)*70+(Math.random()-0.5)*30,life:0.4+Math.random()*0.5,max:0.9,hue,size:2+Math.random()*2}); }
  c.restore();
}
function drawBeam(c, A, B){
  const a=Math.min(A.alpha,B.alpha); if(a<0.02) return;
  const hueA=A.style==="shield"?190:A.hue;
  mLine(c, A.cx,A.cy, B.cx,B.cy, a*0.5, hueA, 1.3);
  if(Math.random()<0.5){ const t=Math.random(); sparks.push({x:A.cx+(B.cx-A.cx)*t, y:A.cy+(B.cy-A.cy)*t, vx:(Math.random()-0.5)*40, vy:(Math.random()-0.5)*40, life:0.3+Math.random()*0.4, max:0.7, hue:hueA, size:2+Math.random()*2}); }
  const mx=(A.cx+B.cx)/2, my=(A.cy+B.cy)/2; const d=Math.hypot(A.cx-B.cx, A.cy-B.cy);
  if(A.open>0.5 && B.open>0.5){
    const R=Math.max(70, d*0.42); const spin=(A.spin+B.spin)*0.5; const hue=305;
    drawOrnate(c, mx, my, R, a*0.5, spin, hue);
    const M=8; for(let i=0;i<M;i++){ const a1=(i/M)*Math.PI*2+spin*0.7, a2=((i+3)/M)*Math.PI*2+spin*0.7; mLine(c, mx+Math.cos(a1)*R*0.5, my+Math.sin(a1)*R*0.5, mx+Math.cos(a2)*R*0.5, my+Math.sin(a2)*R*0.5, a*0.5, hue, 0.9); }
  }
}
function drawCombinedCircle(c, A, B){
  const cx=(A.cx+B.cx)/2, cy=(A.cy+B.cy)/2;
  const nodes=[...A.fnodes, ...B.fnodes];
  let R=60; for(const n of nodes) R=Math.max(R, Math.hypot(n.x-cx, n.y-cy)); R*=1.08;
  const a=(0.5+((A.depth+B.depth)/2)*0.4)*Math.min(A.alpha,B.alpha);
  const spin=(A.spin+B.spin)*0.5; const hue=305;
  c.save(); c.lineCap="round";
  drawOrnate(c, cx, cy, R, a, spin, hue);
  const angs=nodes.map(n=>Math.atan2(n.y-cy, n.x-cx)).sort((p,q)=>p-q);
  const V=angs.map(A2=>({x:cx+Math.cos(A2)*R*0.55, y:cy+Math.sin(A2)*R*0.55})); const N=V.length;
  for(let i=0;i<N;i++){ mLine(c,V[i].x,V[i].y,V[(i+1)%N].x,V[(i+1)%N].y,a*0.45,hue,0.8); mLine(c,V[i].x,V[i].y,V[(i+3)%N].x,V[(i+3)%N].y,a*0.8,hue,0.9); }
  for(const n of nodes){ mLine(c,cx,cy,n.x,n.y,Math.min(A.alpha,B.alpha)*0.14,hue,0.6); const g=c.createRadialGradient(n.x,n.y,0,n.x,n.y,12); g.addColorStop(0,`hsla(${hue},100%,80%,${Math.min(A.alpha,B.alpha)})`); g.addColorStop(1,`hsla(${hue},100%,60%,0)`); c.fillStyle=g; c.beginPath(); c.arc(n.x,n.y,12,0,Math.PI*2); c.fill(); }
  if(Math.random()<0.6){ const sa=Math.random()*Math.PI*2; sparks.push({x:cx+Math.cos(sa)*R,y:cy+Math.sin(sa)*R,vx:-Math.sin(sa)*80+(Math.random()-0.5)*30,vy:Math.cos(sa)*80+(Math.random()-0.5)*30,life:0.4+Math.random()*0.5,max:0.9,hue,size:2+Math.random()*2}); }
  c.restore();
}

// ---- Sparks + idle embers ----
function stepSparks(dt){ for(let i=sparks.length-1;i>=0;i--){ const s=sparks[i]; s.life-=dt; if(s.life<=0){sparks.splice(i,1);continue;} s.vx*=0.96; s.vy=s.vy*0.96+40*dt; s.x+=s.vx*dt; s.y+=s.vy*dt; } }
function drawSparks(c){ c.save(); c.globalCompositeOperation="lighter"; for(const s of sparks){ const a=Math.min(1,s.life/(s.max*0.5)); const g=c.createRadialGradient(s.x,s.y,0,s.x,s.y,s.size*2.5); g.addColorStop(0,`hsla(${s.hue},100%,80%,${a})`); g.addColorStop(1,`hsla(${s.hue},100%,80%,0)`); c.fillStyle=g; c.beginPath(); c.arc(s.x,s.y,s.size*2.5,0,Math.PI*2); c.fill(); } c.restore(); }
function stepEmbers(dt, idle){
  if(idle && embers.length<44 && Math.random()<0.35) embers.push({x:Math.random()*window.innerWidth, y:window.innerHeight+8, vx:(Math.random()-0.5)*18, vy:-18-Math.random()*26, life:3+Math.random()*3, size:1.4+Math.random()*2.4, hue:26+Math.random()*22});
  for(let i=embers.length-1;i>=0;i--){ const e=embers[i]; e.life-=dt; if(e.life<=0){ embers.splice(i,1); continue; } e.x += e.vx*dt + Math.sin(e.life*3)*6*dt; e.y += e.vy*dt; e.vy*=0.99; }
}
function drawEmbers(c){ c.save(); c.globalCompositeOperation="lighter"; for(const e of embers){ const a=Math.min(1,e.life/1.2)*0.7; const g=c.createRadialGradient(e.x,e.y,0,e.x,e.y,e.size*3); g.addColorStop(0,`hsla(${e.hue},100%,68%,${a})`); g.addColorStop(1,`hsla(${e.hue},100%,55%,0)`); c.fillStyle=g; c.beginPath(); c.arc(e.x,e.y,e.size*3,0,Math.PI*2); c.fill(); } c.restore(); }

// ---- Main loop ----
function tick(){
  const now=performance.now();
  const dt=Math.min((now-lastFrame)/1000,0.05); lastFrame=now;
  const W=window.innerWidth, H=window.innerHeight;

  let hands=[], labels=[], gests=[], avgDepth=0;
  if(recognizer && video.readyState>=2 && video.currentTime!==lastVideoTime){
    lastVideoTime=video.currentTime;
    const res=recognizer.detectForVideo(video, now);
    const all=res.landmarks||[]; const hn=res.handednesses||res.handedness||[];
    for(let i=0;i<all.length;i++){ hands.push(all[i]); labels.push(hn[i]?.[0]?.categoryName||("H"+i)); gests.push(classifyGesture(all[i])); }
    if(hands.length){ processCircles(hands, labels, gests, now); for(const lm of hands) avgDepth+=depthOf(span(lm)); avgDepth/=hands.length; }
    else { for(const c of circles.values()) c.active=false; }
  }

  const activeCircles = stepCircles(now, dt);
  stepSparks(dt); stepShock(dt); stepEmbers(dt, activeCircles.length===0);

  // Trail layer: fade, then circles + beam/portal + shock + embers + sparks.
  tctx.globalCompositeOperation="destination-out"; tctx.fillStyle="rgba(0,0,0,0.12)"; tctx.fillRect(0,0,W,H);
  tctx.globalCompositeOperation="lighter";
  if(activeCircles.length>=2){
    const A=activeCircles[0], B=activeCircles[1];
    const d=Math.hypot(A.cx-B.cx, A.cy-B.cy); const thr=(A.R+B.R)*0.5;
    if(!merged && d<thr*0.85){ merged=true; whoosh(305,900,200); pluck(196,0.12); } else if(merged && d>thr*1.25) merged=false;
    if(merged) drawCombinedCircle(tctx, A, B);
    else { drawHandCircle(tctx, A); drawHandCircle(tctx, B); drawBeam(tctx, A, B); }
  } else { merged=false; for(const cc of activeCircles) drawHandCircle(tctx, cc); }
  drawShock(tctx); drawEmbers(tctx); drawSparks(tctx);

  // Composite over the camera.
  ctx.clearRect(0,0,W,H);
  ctx.drawImage(trail,0,0,W,H);

  // UI.
  const casting = activeCircles.length>0;
  modeLabel.textContent = casting ? "🪄 Conjuring" : "— raise a hand —";
  foldLabel.textContent = casting ? (avgDepth>0.55 ? "◎ charged" : "◎") : "";
  dmFill.style.height = `${Math.round(avgDepth*100)}%`;
  if(showDebug){ debugEl.classList.remove("off"); debugEl.textContent = (lastErr?`⚠ ${lastErr} · `:"") + `hands ${hands.length} · circles ${activeCircles.length} · depth ${avgDepth.toFixed(2)}   [D hides]`; }
  else debugEl.classList.add("off");
}
function loop(){ try{ tick(); }catch(e){ lastErr=e&&e.message?e.message:String(e); console.error("studio error:",e); } requestAnimationFrame(loop); }

// ---- Controls ----
soundBtn.addEventListener("click", () => { soundOn=!soundOn; soundBtn.textContent=soundOn?"🔊":"🔇"; if(soundOn&&audio) audio.resume(); });
window.addEventListener("keydown", (e)=>{ if(e.key==="d"||e.key==="D") showDebug=!showDebug; });

async function start(){
  startBtn.disabled=true; gateMsg.textContent="Loading hand-tracking model…";
  try{ audio=new (window.AudioContext||window.webkitAudioContext)(); await audio.resume(); }catch(_){}
  try{
    const vision=await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm");
    recognizer=await HandLandmarker.createFromOptions(vision,{ baseOptions:{ modelAssetPath:"https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task", delegate:"GPU" }, runningMode:"VIDEO", numHands:2 });
    gateMsg.textContent="Starting camera…";
    const stream=await navigator.mediaDevices.getUserMedia({ video:{ facingMode:"user", width:1280, height:720 } });
    video.srcObject=stream; await video.play();
    gate.classList.add("hidden");
  }catch(err){ console.error(err); startBtn.disabled=false; gateTitle.textContent="Couldn't start"; gateMsg.textContent="Camera or model failed to load. Allow camera access and make sure you're online (the model loads from a CDN). Then try again."; }
}
startBtn.addEventListener("click", start);

loop();
