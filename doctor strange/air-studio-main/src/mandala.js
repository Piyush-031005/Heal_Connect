import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

const stage = document.getElementById("stage");
const ctx = stage.getContext("2d");
const video = document.getElementById("webcam");
const gate = document.getElementById("gate");
const gateTitle = document.getElementById("gateTitle");
const gateMsg = document.getElementById("gateMsg");
const startBtn = document.getElementById("startBtn");
const audioBtn = document.getElementById("audioBtn");

// Offscreen trail layer (fades slowly -> light trails), composited over camera.
const trail = document.createElement("canvas");
const tctx = trail.getContext("2d");

let handLandmarker = null;
let lastVideoTime = -1;
let lastFrame = performance.now();
let symmetry = 6;
let soundOn = true;
let lastErr = "";

// ---- Nodes (one per fingertip slot), spring-smoothed for elastic feel ----
const SPRING = 0.28;
const DAMP = 0.62;
const slots = new Map(); // id -> node
const SLOT_HUE = { "Left-index": 190, "Left-thumb": 315, "Right-index": 140, "Right-thumb": 50 };

function getSlot(id) {
  let s = slots.get(id);
  if (!s) {
    s = {
      id, x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0,
      alpha: 0, active: false, born: false, lastPluck: 0,
      hue: SLOT_HUE[id] ?? (slots.size * 67) % 360,
      note: slots.size,
    };
    slots.set(id, s);
  }
  return s;
}

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  for (const c of [stage, trail]) {
    c.width = window.innerWidth * dpr;
    c.height = window.innerHeight * dpr;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  tctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resize);
resize();

function toScreen(x, y) {
  const W = window.innerWidth, H = window.innerHeight;
  const vw = video.videoWidth || 1280, vh = video.videoHeight || 720;
  const scale = Math.max(W / vw, H / vh);
  const dw = vw * scale, dh = vh * scale;
  return { x: W - ((W - dw) / 2 + x * dw), y: (H - dh) / 2 + y * dh };
}
function d3(a, b) { return Math.hypot(a.x - b.x, a.y - b.y, (a.z || 0) - (b.z || 0)); }

// Finger-extension tests (lenient, so removing a finger reliably drops its node).
function indexUp(lm) { return d3(lm[8], lm[0]) > d3(lm[6], lm[0]) * 1.05; }
function thumbUp(lm) { return d3(lm[4], lm[0]) > d3(lm[2], lm[0]) * 1.35; }

// ---- Audio: a small pentatonic harp ----
let audio = null;
const PENT = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];
function pluck(freq, gainAmt = 0.14) {
  if (!audio || !soundOn) return;
  const t = audio.currentTime;
  const o = audio.createOscillator(); o.type = "triangle"; o.frequency.value = freq;
  const o2 = audio.createOscillator(); o2.type = "sine"; o2.frequency.value = freq * 2;
  const g = audio.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gainAmt, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
  const lp = audio.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 2400;
  o.connect(g); o2.connect(g); g.connect(lp); lp.connect(audio.destination);
  o.start(t); o2.start(t); o.stop(t + 0.95); o2.stop(t + 0.95);
}

// ---- Per detection frame: update slots from hands ----
function processHands(res) {
  const seen = new Set();
  const hands = res.landmarks || [];
  for (let i = 0; i < hands.length; i++) {
    const lm = hands[i];
    const label = res.handednesses?.[i]?.[0]?.categoryName || "H" + i;
    const checks = [
      { id: label + "-index", up: indexUp(lm), tip: lm[8] },
      { id: label + "-thumb", up: thumbUp(lm), tip: lm[4] },
    ];
    for (const c of checks) {
      if (!c.up) continue;
      const p = toScreen(c.tip.x, c.tip.y);
      const s = getSlot(c.id);
      s.tx = p.x; s.ty = p.y;
      if (!s.active) {
        if (!s.born) { s.x = p.x; s.y = p.y; s.born = true; }
        pluck(PENT[s.note % PENT.length]); // note on "finger added"
      }
      s.active = true;
      seen.add(c.id);
    }
  }
  for (const s of slots.values()) if (!seen.has(s.id)) s.active = false;
}

// ---- Physics + active-node list ----
function stepNodes(now) {
  const active = [];
  for (const s of slots.values()) {
    s.alpha += ((s.active ? 1 : 0) - s.alpha) * 0.18;
    if (s.alpha < 0.01 && !s.active) { s.born = false; continue; }
    s.vx = (s.vx + (s.tx - s.x) * SPRING) * DAMP;
    s.vy = (s.vy + (s.ty - s.y) * SPRING) * DAMP;
    s.x += s.vx; s.y += s.vy;

    const speed = Math.hypot(s.vx, s.vy);
    if (speed > 26 && now - s.lastPluck > 200) {
      s.lastPluck = now;
      const pitch = PENT[Math.min(PENT.length - 1, Math.floor((1 - s.y / window.innerHeight) * PENT.length))];
      pluck(pitch, 0.08);
    }
    if (s.alpha > 0.05) active.push(s);
  }
  // Order around the centroid so the woven polygon is consistent.
  if (active.length >= 3) {
    let cx = 0, cy = 0;
    for (const p of active) { cx += p.x; cy += p.y; }
    cx /= active.length; cy /= active.length;
    active.sort((a, b) => Math.atan2(a.y - cy, a.x - cx) - Math.atan2(b.y - cy, b.x - cx));
  }
  return active;
}

// ---- Sparks (emitted from fast-moving nodes) ----
const sparks = [];
function emitSparks(nodes) {
  for (const n of nodes) {
    const sp = Math.hypot(n.vx, n.vy);
    if (sp > 22 && Math.random() < 0.6) {
      sparks.push({
        x: n.x, y: n.y,
        vx: n.vx * 0.5 + (Math.random() - 0.5) * 40,
        vy: n.vy * 0.5 + (Math.random() - 0.5) * 40,
        life: 0.5 + Math.random() * 0.5, max: 1, hue: n.hue, size: 2 + Math.random() * 2,
      });
    }
  }
}
function stepSparks(dt) {
  for (let i = sparks.length - 1; i >= 0; i--) {
    const s = sparks[i];
    s.life -= dt;
    if (s.life <= 0) { sparks.splice(i, 1); continue; }
    s.vx *= 0.96; s.vy = s.vy * 0.96 + 30 * dt;
    s.x += s.vx * dt; s.y += s.vy * dt;
  }
}

function lerp(a, b, t) { return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }; }

// ---- Draw one instance of the woven shape (in absolute coords) ----
function drawWeave(c, nodes, time) {
  const N = nodes.length;

  // Glowing nodes.
  for (const n of nodes) {
    const r = 10 + 6 * Math.sin(time * 0.004 + n.note);
    const g = c.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 2.4);
    g.addColorStop(0, `hsla(${n.hue},100%,72%,${n.alpha})`);
    g.addColorStop(1, `hsla(${n.hue},100%,72%,0)`);
    c.fillStyle = g;
    c.beginPath(); c.arc(n.x, n.y, r * 2.4, 0, Math.PI * 2); c.fill();
  }

  if (N === 1) return;
  c.lineCap = "round";

  if (N === 2) {
    strokeLine(c, nodes[0], nodes[1], nodes[0].hue, Math.min(nodes[0].alpha, nodes[1].alpha), time);
    return;
  }

  // String-art: at each vertex, weave threads between its two edges.
  const STR = 9;
  for (let i = 0; i < N; i++) {
    const v = nodes[i];
    const a = nodes[(i - 1 + N) % N];
    const b = nodes[(i + 1) % N];
    const al = Math.min(v.alpha, a.alpha, b.alpha);
    const hue = (v.hue + time * 0.03) % 360;
    for (let k = 1; k < STR; k++) {
      const p1 = lerp(v, a, k / STR);
      const p2 = lerp(v, b, (STR - k) / STR);
      strokeLine(c, p1, p2, (hue + k * 6) % 360, al * 0.55, time);
    }
  }
  // Faint outline to anchor the shape.
  for (let i = 0; i < N; i++) {
    strokeLine(c, nodes[i], nodes[(i + 1) % N], nodes[i].hue, Math.min(nodes[i].alpha, nodes[(i + 1) % N].alpha) * 0.7, time);
  }
}

function strokeLine(c, p1, p2, hue, alpha, time) {
  if (alpha <= 0.01) return;
  c.strokeStyle = `hsla(${hue},100%,65%,${alpha * 0.5})`;
  c.lineWidth = 2.4;
  c.beginPath(); c.moveTo(p1.x, p1.y); c.lineTo(p2.x, p2.y); c.stroke();
  c.strokeStyle = `hsla(${hue},100%,88%,${alpha})`;
  c.lineWidth = 1;
  c.stroke();
}

// ---- Compose the kaleidoscope onto the trail layer, then to screen ----
function render(nodes, time) {
  const W = window.innerWidth, H = window.innerHeight;
  const cx = W / 2, cy = H / 2;

  // Fade the trail toward transparent (keeps camera visible underneath).
  tctx.globalCompositeOperation = "destination-out";
  tctx.fillStyle = "rgba(0,0,0,0.10)";
  tctx.fillRect(0, 0, W, H);

  tctx.globalCompositeOperation = "lighter";
  if (nodes.length > 0) {
    for (let k = 0; k < symmetry; k++) {
      for (const flip of [1, -1]) {
        tctx.save();
        tctx.translate(cx, cy);
        tctx.rotate((k / symmetry) * Math.PI * 2);
        tctx.scale(1, flip);
        tctx.translate(-cx, -cy);
        drawWeave(tctx, nodes, time);
        tctx.restore();
      }
    }
  }
  // Sparks (also mirrored a little for cohesion).
  for (const s of sparks) {
    const a = Math.min(1, s.life / (s.max * 0.5));
    const g = tctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 2.5);
    g.addColorStop(0, `hsla(${s.hue},100%,80%,${a})`);
    g.addColorStop(1, `hsla(${s.hue},100%,80%,0)`);
    tctx.fillStyle = g;
    tctx.beginPath(); tctx.arc(s.x, s.y, s.size * 2.5, 0, Math.PI * 2); tctx.fill();
  }

  ctx.clearRect(0, 0, W, H);
  ctx.drawImage(trail, 0, 0, W, H);
}

function tick() {
  const now = performance.now();
  const dt = Math.min((now - lastFrame) / 1000, 0.05);
  lastFrame = now;

  if (handLandmarker && video.readyState >= 2 && video.currentTime !== lastVideoTime) {
    lastVideoTime = video.currentTime;
    const res = handLandmarker.detectForVideo(video, now);
    processHands(res);
  }

  const nodes = stepNodes(now);
  emitSparks(nodes);
  stepSparks(dt);
  render(nodes, now);
}

function loop() {
  try { tick(); }
  catch (e) { lastErr = e && e.message ? e.message : String(e); console.error("mandala error:", e); }
  requestAnimationFrame(loop);
}

// ---- Controls ----
document.querySelectorAll(".seg[data-sym]").forEach((b) => {
  b.addEventListener("click", () => {
    document.querySelectorAll(".seg[data-sym]").forEach((x) => x.classList.remove("active"));
    b.classList.add("active");
    symmetry = Number(b.dataset.sym);
  });
});
audioBtn.addEventListener("click", () => {
  soundOn = !soundOn;
  audioBtn.classList.toggle("off", !soundOn);
  audioBtn.textContent = soundOn ? "🔊 Sound" : "🔇 Muted";
  if (soundOn && audio) audio.resume();
});
window.addEventListener("keydown", (e) => {
  if (["2", "6", "8"].includes(e.key)) {
    const b = document.querySelector(`.seg[data-sym="${e.key}"]`);
    if (b) b.click();
  }
});

async function start() {
  startBtn.disabled = true;
  gateMsg.textContent = "Loading hand-tracking model…";
  try {
    audio = new (window.AudioContext || window.webkitAudioContext)();
    await audio.resume();
  } catch (_) { /* audio optional */ }
  try {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
    );
    handLandmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
        delegate: "GPU",
      },
      runningMode: "VIDEO",
      numHands: 2,
    });
    gateMsg.textContent = "Starting camera…";
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: 1280, height: 720 },
    });
    video.srcObject = stream;
    await video.play();
    gate.classList.add("hidden");
  } catch (err) {
    console.error(err);
    startBtn.disabled = false;
    gateTitle.textContent = "Couldn't start";
    gateMsg.textContent =
      "Camera or model failed to load. Allow camera access and make sure you're online (the model loads from a CDN). Then try again.";
  }
}
startBtn.addEventListener("click", start);

loop();
