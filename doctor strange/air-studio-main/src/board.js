import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { recognize } from "./recognizer.js";

const stage = document.getElementById("stage");
const ctx = stage.getContext("2d");
const video = document.getElementById("webcam");
const gate = document.getElementById("gate");
const gateTitle = document.getElementById("gateTitle");
const gateMsg = document.getElementById("gateMsg");
const startBtn = document.getElementById("startBtn");
const toolbar = document.getElementById("toolbar");
const buttons = Array.from(toolbar.querySelectorAll("button"));
const debugEl = document.getElementById("debug");

// Persistent "ink" layer (composited over the camera each frame).
const ink = document.createElement("canvas");
const ictx = ink.getContext("2d");

let handLandmarker = null;
let lastVideoTime = -1;
let lastDetect = performance.now();
let lastFrame = performance.now();

// Tools.
let currentColor = "#ff2d95";
let brushSize = 9;
let eraser = false;
let cleanBoard = false; // hide camera, write on solid black
const strokes = []; // committed: { color, size, points:[{x,y}], born }
const hearts = []; // recognized: { x, y, size, color, born }
const sparks = []; // transient sparkle particles

// Pen state.
let drawing = false;
let currentStroke = null;
let penDown = false; // hysteresis latch
let penX = 0;
let penY = 0;
let hasPen = false;
let hadHand = false; // was a hand present on the previous detection frame
let liftGraceUntil = 0; // bridge brief pinch/tracking dropouts so a stroke stays whole
let lastRatio = 0; // latest pinch ratio (for the debug readout)
let lastRec = "-"; // last recognition result
let showDebug = false; // dev readout, toggle with the D key
let lastErr = "";

// Dwell-to-select.
let dwellBtn = null;
let dwellStart = 0;
let dwellCooldown = 0;
const DWELL = 0.7; // seconds to activate

// ---- Smoothing: One-Euro filter ----
class LowPass {
  constructor() { this.s = null; }
  filter(x, a) { this.s = this.s == null ? x : a * x + (1 - a) * this.s; return this.s; }
}
class OneEuro {
  constructor(minCutoff = 1.6, beta = 0.02, dCutoff = 1.0) {
    this.minCutoff = minCutoff; this.beta = beta; this.dCutoff = dCutoff;
    this.xf = new LowPass(); this.dxf = new LowPass(); this.lastX = null;
  }
  _alpha(cutoff, dt) { const tau = 1 / (2 * Math.PI * cutoff); return 1 / (1 + tau / dt); }
  filter(x, dt) {
    if (dt <= 0) dt = 1 / 30;
    const dx = this.lastX == null ? 0 : (x - this.lastX) / dt;
    this.lastX = x;
    const edx = this.dxf.filter(dx, this._alpha(this.dCutoff, dt));
    const cutoff = this.minCutoff + this.beta * Math.abs(edx);
    return this.xf.filter(x, this._alpha(cutoff, dt));
  }
  reset() { this.xf = new LowPass(); this.dxf = new LowPass(); this.lastX = null; }
}
const fx = new OneEuro();
const fy = new OneEuro();

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  for (const c of [stage, ink]) {
    c.width = window.innerWidth * dpr;
    c.height = window.innerHeight * dpr;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ictx.setTransform(dpr, 0, 0, dpr, 0, 0);
  renderInk();
}
window.addEventListener("resize", resize);
resize();

function toScreen(x, y) {
  const W = window.innerWidth, H = window.innerHeight;
  const vw = video.videoWidth || 1280, vh = video.videoHeight || 720;
  const scale = Math.max(W / vw, H / vh);
  const dw = vw * scale, dh = vh * scale;
  const ox = (W - dw) / 2, oy = (H - dh) / 2;
  return { x: W - (ox + x * dw), y: oy + y * dh };
}
function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }

// ---- Neon stroke rendering ----
function strokePath(c, pts) {
  if (pts.length === 1) {
    c.beginPath();
    c.arc(pts[0].x, pts[0].y, 0.1, 0, Math.PI * 2);
    return;
  }
  c.beginPath();
  c.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].x + pts[i + 1].x) / 2;
    const my = (pts[i].y + pts[i + 1].y) / 2;
    c.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
  }
  const n = pts.length;
  c.lineTo(pts[n - 1].x, pts[n - 1].y);
}

function renderStroke(c, stroke) {
  const pts = stroke.points;
  c.save();
  c.globalCompositeOperation = "lighter";
  c.lineJoin = "round";
  c.lineCap = "round";
  // Outer glow.
  c.shadowColor = stroke.color;
  c.shadowBlur = stroke.size * 3;
  c.strokeStyle = stroke.color;
  c.lineWidth = stroke.size * 1.5;
  strokePath(c, pts);
  c.stroke();
  // Mid.
  c.shadowBlur = stroke.size * 1.5;
  c.lineWidth = stroke.size * 0.8;
  c.stroke();
  // Hot white core.
  c.shadowBlur = stroke.size * 0.6;
  c.strokeStyle = "rgba(255,255,255,0.92)";
  c.lineWidth = Math.max(1, stroke.size * 0.32);
  c.stroke();
  c.restore();
}

function renderInk() {
  ictx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (const s of strokes) renderStroke(ictx, s);
}

// ---- Heart recognition popups ----
function bbox(points) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p of points) {
    minX = Math.min(minX, p.x); minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x); maxY = Math.max(maxY, p.y);
  }
  const w = maxX - minX, h = maxY - minY;
  return { cx: (minX + maxX) / 2, cy: (minY + maxY) / 2, w, h, diag: Math.hypot(w, h) };
}

function heartPath(c, s) {
  c.beginPath();
  c.moveTo(0, -s * 0.28); // top-centre dip
  c.bezierCurveTo(-s * 0.55, -s * 0.95, -s * 1.25, -s * 0.1, 0, s * 0.78); // left lobe -> bottom point
  c.bezierCurveTo(s * 1.25, -s * 0.1, s * 0.55, -s * 0.95, 0, -s * 0.28); // right lobe
  c.closePath();
}

function drawHeart(c, x, y, s, color) {
  // Guard: a zero/NaN radius makes createRadialGradient throw and would kill the loop.
  if (!(s > 0.01) || !isFinite(x) || !isFinite(y)) return;
  c.save();
  c.translate(x, y);
  c.globalCompositeOperation = "lighter";
  // Outer glow.
  c.shadowColor = color;
  c.shadowBlur = s * 0.9;
  c.fillStyle = hexA(color, 0.45);
  heartPath(c, s);
  c.fill();
  // Bright body.
  const g = c.createRadialGradient(0, -s * 0.1, 0, 0, -s * 0.1, s * 1.2);
  g.addColorStop(0, hexA(color, 0.95));
  g.addColorStop(1, hexA(color, 0.25));
  c.shadowBlur = s * 0.5;
  c.fillStyle = g;
  heartPath(c, s);
  c.fill();
  // White core edge.
  c.shadowBlur = s * 0.3;
  c.strokeStyle = "rgba(255,255,255,0.9)";
  c.lineWidth = Math.max(1, s * 0.05);
  heartPath(c, s);
  c.stroke();
  c.restore();
}

// Bouncy pop-in (easeOutBack), then a gentle pulse.
function heartScale(ageSec) {
  const t = Math.min(1, ageSec / 0.45);
  const c1 = 1.70158, c3 = c1 + 1;
  const eob = 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  if (t < 1) return eob;
  return 1 + 0.045 * Math.sin(ageSec * 3);
}

function addHeart(x, y, size, color) {
  hearts.push({ x, y, size, color, born: performance.now() });
  for (let i = 0; i < 20; i++) {
    const a = Math.random() * Math.PI * 2;
    const sp = 90 + Math.random() * 180;
    sparks.push({
      x, y,
      vx: Math.cos(a) * sp,
      vy: Math.sin(a) * sp,
      life: 0.6 + Math.random() * 0.6,
      max: 1.2,
      color,
      heart: Math.random() < 0.45,
      size: 3 + Math.random() * 4,
    });
  }
}

const SNAP_SHAPES = ["circle", "square", "triangle", "star"];
// Build a clean outline stroke for a recognized shape, sized to the drawn bbox.
function cleanShape(name, box, color, size) {
  const cx = box.cx, cy = box.cy, rx = box.w / 2, ry = box.h / 2, r = (rx + ry) / 2;
  const pts = [];
  const push = (x, y) => pts.push({ x, y, w: size * 1.2 });
  const edge = (a, b, n) => { for (let t = 0; t <= n; t++) { const u = t / n; push(a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u); } };
  if (name === "circle") {
    for (let i = 0; i <= 48; i++) { const a = (i / 48) * Math.PI * 2; push(cx + Math.cos(a) * r, cy + Math.sin(a) * r); }
  } else if (name === "square") {
    const c = [[cx - rx, cy - ry], [cx + rx, cy - ry], [cx + rx, cy + ry], [cx - rx, cy + ry], [cx - rx, cy - ry]];
    for (let s = 0; s < 4; s++) edge(c[s], c[s + 1], 12);
  } else if (name === "triangle") {
    const c = [[cx, cy - ry], [cx + rx, cy + ry], [cx - rx, cy + ry], [cx, cy - ry]];
    for (let s = 0; s < 3; s++) edge(c[s], c[s + 1], 16);
  } else if (name === "star") {
    const outer = [];
    for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5; outer.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]); }
    const order = [0, 2, 4, 1, 3, 0];
    for (let s = 0; s < 5; s++) edge(outer[order[s]], outer[order[s + 1]], 12);
  }
  return { color, points: pts, born: performance.now() };
}
function snapSparkle(box, color) {
  const n = 16;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const sp = 120 + Math.random() * 120;
    sparks.push({ x: box.cx, y: box.cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0.5 + Math.random() * 0.4, max: 0.9, color, heart: false, size: 2.5 + Math.random() * 2.5 });
  }
}

function drawHearts(c, now) {
  for (const h of hearts) {
    drawHeart(c, h.x, h.y, h.size * heartScale((now - h.born) / 1000), h.color);
  }
}

function updateSparks(dt) {
  for (let i = sparks.length - 1; i >= 0; i--) {
    const s = sparks[i];
    s.life -= dt;
    if (s.life <= 0) { sparks.splice(i, 1); continue; }
    s.vy += 140 * dt;
    s.vx *= 0.97;
    s.vy *= 0.97;
    s.x += s.vx * dt;
    s.y += s.vy * dt;
  }
}
function drawSparks(c) {
  c.save();
  c.globalCompositeOperation = "lighter";
  for (const s of sparks) {
    const a = Math.min(1, s.life / (s.max * 0.5));
    if (s.heart) {
      drawHeart(c, s.x, s.y, s.size * 1.4 * a, s.color);
    } else {
      const g = c.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 2);
      g.addColorStop(0, hexA(s.color, a));
      g.addColorStop(1, hexA(s.color, 0));
      c.fillStyle = g;
      c.beginPath();
      c.arc(s.x, s.y, s.size * 2, 0, Math.PI * 2);
      c.fill();
    }
  }
  c.restore();
}

// ---- Tool actions ----
function setActive(btn) {
  const group = btn.parentElement;
  group.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
}
function activate(btn) {
  if (btn.dataset.color) {
    currentColor = btn.dataset.color;
    eraser = false;
    setActive(btn);
    toolbar.querySelector('[data-action="eraser"]').classList.remove("active");
  } else if (btn.dataset.size) {
    brushSize = Number(btn.dataset.size);
    setActive(btn);
  } else {
    switch (btn.dataset.action) {
      case "eraser":
        eraser = !eraser;
        btn.classList.toggle("active", eraser);
        break;
      case "undo": {
        // Remove whichever was drawn most recently: a stroke or a heart.
        const ls = strokes.length ? strokes[strokes.length - 1].born : -1;
        const lh = hearts.length ? hearts[hearts.length - 1].born : -1;
        if (lh < 0 && ls < 0) break;
        if (lh > ls) hearts.pop();
        else { strokes.pop(); renderInk(); }
        break;
      }
      case "clear":
        strokes.length = 0;
        hearts.length = 0;
        sparks.length = 0;
        renderInk();
        break;
      case "camera":
        cleanBoard = !cleanBoard;
        document.body.classList.toggle("cleanboard", cleanBoard);
        btn.querySelector(".ico").textContent = cleanBoard ? "🌑" : "🎥";
        break;
      case "download":
        download();
        break;
    }
  }
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 180);
}
buttons.forEach((b) => b.addEventListener("click", () => activate(b)));

function buttonAt(x, y) {
  for (const b of buttons) {
    const r = b.getBoundingClientRect();
    if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return b;
  }
  return null;
}
function overToolbar(x, y) {
  const r = toolbar.getBoundingClientRect();
  return x >= r.left - 8 && x <= r.right + 8 && y >= r.top - 8 && y <= r.bottom + 8;
}

function download() {
  const out = document.createElement("canvas");
  out.width = ink.width;
  out.height = ink.height;
  const o = out.getContext("2d");
  // Mirrored, cover-fit camera frame.
  const W = out.width, H = out.height;
  const vw = video.videoWidth || 1280, vh = video.videoHeight || 720;
  const scale = Math.max(W / vw, H / vh);
  const dw = vw * scale, dh = vh * scale;
  o.save();
  o.translate(W, 0);
  o.scale(-1, 1);
  o.drawImage(video, (W - dw) / 2, (H - dh) / 2, dw, dh);
  o.restore();
  o.drawImage(ink, 0, 0);
  // Recognized hearts (settled) — drawn in CSS px, so match the ink's dpr scale.
  const dpr = ink.width / window.innerWidth;
  o.save();
  o.setTransform(dpr, 0, 0, dpr, 0, 0);
  for (const h of hearts) drawHeart(o, h.x, h.y, h.size, h.color);
  o.restore();
  const a = document.createElement("a");
  a.download = "air-writing.png";
  a.href = out.toDataURL("image/png");
  a.click();
}

// ---- Main loop ----
function commitStroke() {
  if (currentStroke && currentStroke.points.length > 0) {
    const box = bbox(currentStroke.points);
    const shape = recognize(currentStroke.points);
    lastRec = shape ? `${shape.name} ${shape.score.toFixed(2)} (pts ${currentStroke.points.length}, ${Math.round(box.diag)}px)` : `too short (${currentStroke.points.length} pts)`;
    // Forgiving: any heart-ish loop pops. Circles/lines never match "heart" as
    // their best template, so they stay safe regardless of the low threshold.
    if (shape && shape.name === "heart" && shape.score > 0.7 && box.diag > 55) {
      addHeart(box.cx, box.cy, Math.max(box.w, box.h) * 0.62, currentStroke.color);
    } else if (shape && SNAP_SHAPES.includes(shape.name) && shape.score > 0.82 && box.diag > 60) {
      // Snap a rough circle/square/triangle/star to a clean glowing shape.
      const clean = cleanShape(shape.name, box, currentStroke.color, brushSize);
      strokes.push(clean);
      renderStroke(ictx, clean);
      snapSparkle(box, currentStroke.color);
    } else {
      currentStroke.born = performance.now();
      strokes.push(currentStroke);
      renderStroke(ictx, currentStroke);
    }
  }
  currentStroke = null;
  drawing = false;
  liftGraceUntil = 0;
}

function eraseAt(x, y) {
  const R = brushSize * 3 + 14;
  let removed = false;
  for (let i = strokes.length - 1; i >= 0; i--) {
    if (strokes[i].points.some((p) => Math.hypot(p.x - x, p.y - y) < R)) {
      strokes.splice(i, 1);
      removed = true;
    }
  }
  if (removed) renderInk();
}

function loop() {
  try {
    tick();
  } catch (e) {
    lastErr = e && e.message ? e.message : String(e);
    console.error("board loop error:", e);
  }
  requestAnimationFrame(loop); // always reschedule so nothing can freeze the app
}

function tick() {
  const now = performance.now();
  const W = window.innerWidth, H = window.innerHeight;
  const frameDt = Math.min((now - lastFrame) / 1000, 0.06);
  lastFrame = now;
  dwellCooldown = Math.max(0, dwellCooldown - frameDt);

  // Debug readout first, so it still updates even if a later draw call throws.
  if (showDebug) {
    debugEl.classList.remove("off");
    debugEl.textContent =
      (lastErr ? `⚠ ${lastErr} · ` : "") +
      `pinch ${lastRatio.toFixed(2)} · pen ${penDown ? "DOWN ✍️" : "up"} · ` +
      `pts ${drawing ? currentStroke.points.length : 0} · last: ${lastRec}   [press D to hide]`;
  } else {
    debugEl.classList.add("off");
  }

  if (handLandmarker && video.readyState >= 2 && video.currentTime !== lastVideoTime) {
    lastVideoTime = video.currentTime;
    const dt = Math.min((now - lastDetect) / 1000, 0.06);
    lastDetect = now;
    const res = handLandmarker.detectForVideo(video, now);

    if (res.landmarks && res.landmarks.length > 0) {
      const lm = res.landmarks[0];
      // Pen tip = index fingertip (where you actually point).
      const s = toScreen(lm[8].x, lm[8].y);
      if (!hadHand) { fx.reset(); fy.reset(); } // no swoop from the old spot
      penX = fx.filter(s.x, dt);
      penY = fy.filter(s.y, dt);
      hasPen = true;
      hadHand = true;

      // Pinch (thumb tip <-> index tip), normalized by palm size (z included so
      // it's robust to hand rotation). Pen starts only when the tips nearly TOUCH,
      // then holds until you clearly separate them (hysteresis + grace bridge).
      const ratio = dist(lm[4], lm[8]) / (dist(lm[0], lm[9]) || 1);
      lastRatio = ratio;
      if (!penDown && ratio < 0.25) penDown = true;
      else if (penDown && ratio > 0.45) penDown = false;

      handleDwell(now);
      handleDrawing(now);
    } else {
      hasPen = false;
      hadHand = false;
      penDown = false;
      dwellBtn = null;
      // Grace-bridge a brief tracking dropout instead of chopping the stroke.
      if (drawing) {
        if (liftGraceUntil === 0) liftGraceUntil = now + 300;
        else if (now >= liftGraceUntil) commitStroke();
      }
    }
  }

  // ---- Composite ----
  updateSparks(frameDt);
  ctx.clearRect(0, 0, W, H);
  ctx.drawImage(ink, 0, 0, W, H);
  if (drawing && currentStroke) renderStroke(ctx, currentStroke);
  drawHearts(ctx, now);
  drawSparks(ctx);
  if (hasPen) drawCursor(now);
}

function handleDwell(now) {
  const b = buttonAt(penX, penY);
  // Moving onto a different target (or off all targets) restarts the timer.
  if (b !== dwellBtn) {
    dwellBtn = b;
    dwellStart = now;
    return;
  }
  if (!b) return;
  if (dwellCooldown > 0) {
    dwellStart = now; // wait out the cooldown, keep the timer fresh
    return;
  }
  if ((now - dwellStart) / 1000 >= DWELL) {
    activate(b);
    dwellCooldown = 0.8; // must re-dwell to fire again
    dwellStart = now;
  }
}

function startStroke() {
  drawing = true;
  currentStroke = { color: currentColor, size: brushSize, points: [{ x: penX, y: penY }] };
}

function handleDrawing(now) {
  const onUI = overToolbar(penX, penY);
  if (penDown && hasPen && !onUI) {
    const resumed = liftGraceUntil !== 0; // we were mid-dropout
    liftGraceUntil = 0;
    if (eraser) {
      eraseAt(penX, penY);
      if (drawing) commitStroke();
      return;
    }
    if (!drawing) {
      startStroke();
    } else {
      const last = currentStroke.points[currentStroke.points.length - 1];
      const d = Math.hypot(penX - last.x, penY - last.y);
      // Resuming far from the last point = a deliberate new stroke, not a flicker.
      if (resumed && d > 90) {
        commitStroke();
        startStroke();
      } else if (d > 1.5) {
        currentStroke.points.push({ x: penX, y: penY });
      }
    }
  } else if (drawing) {
    // Pen lifted (or wandered over the toolbar): wait out a short grace before
    // committing, so a one-frame pinch flicker doesn't split the stroke.
    if (liftGraceUntil === 0) liftGraceUntil = now + 300;
    else if (now >= liftGraceUntil) commitStroke();
  }
}

function drawCursor(now) {
  const active = penDown && !overToolbar(penX, penY);
  const col = eraser ? "#ffffff" : currentColor;
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  const r = eraser ? brushSize * 3 + 14 : brushSize * 0.9 + 6;
  const g = ctx.createRadialGradient(penX, penY, 0, penX, penY, r * 1.8);
  g.addColorStop(0, hexA(col, active ? 0.9 : 0.5));
  g.addColorStop(1, hexA(col, 0));
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(penX, penY, r * 1.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Ring.
  ctx.save();
  ctx.strokeStyle = eraser ? "rgba(255,255,255,0.9)" : col;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(penX, penY, r, 0, Math.PI * 2);
  ctx.stroke();
  if (active) {
    ctx.fillStyle = hexA(col, 0.85);
    ctx.beginPath();
    ctx.arc(penX, penY, r * 0.45, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Dwell progress arc.
  if (dwellBtn && dwellCooldown <= 0) {
    const p = Math.min(1, (now - dwellStart) / 1000 / DWELL);
    ctx.save();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(penX, penY, r + 8, -Math.PI / 2, -Math.PI / 2 + p * Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}

function hexA(hex, a) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

async function start() {
  startBtn.disabled = true;
  gateMsg.textContent = "Loading hand-tracking model…";
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
      numHands: 1,
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
window.addEventListener("keydown", (e) => {
  if (e.key === "d" || e.key === "D") showDebug = !showDebug;
});

loop();
