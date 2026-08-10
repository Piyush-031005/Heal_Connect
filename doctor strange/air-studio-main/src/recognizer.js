// Compact $1 Unistroke Recognizer (Wobbrock et al.), with heart templates plus a
// couple of decoy shapes so only genuine heart strokes are accepted.

const NUM_POINTS = 64;
const SQUARE_SIZE = 250;
const ORIGIN = { x: 0, y: 0 };
const PHI = 0.5 * (-1 + Math.sqrt(5));

function distance(a, b) { return Math.hypot(b.x - a.x, b.y - a.y); }
function pathLength(pts) {
  let d = 0;
  for (let i = 1; i < pts.length; i++) d += distance(pts[i - 1], pts[i]);
  return d;
}
function centroid(pts) {
  let x = 0, y = 0;
  for (const p of pts) { x += p.x; y += p.y; }
  return { x: x / pts.length, y: y / pts.length };
}

function resample(points, n) {
  const pts = points.map((p) => ({ x: p.x, y: p.y }));
  const I = pathLength(pts) / (n - 1);
  let D = 0;
  const out = [{ x: pts[0].x, y: pts[0].y }];
  for (let i = 1; i < pts.length; i++) {
    const d = distance(pts[i - 1], pts[i]);
    if (D + d >= I) {
      const t = (I - D) / d;
      const np = {
        x: pts[i - 1].x + t * (pts[i].x - pts[i - 1].x),
        y: pts[i - 1].y + t * (pts[i].y - pts[i - 1].y),
      };
      out.push(np);
      pts.splice(i, 0, np);
      D = 0;
    } else {
      D += d;
    }
  }
  while (out.length < n) out.push({ x: pts[pts.length - 1].x, y: pts[pts.length - 1].y });
  return out;
}

function indicativeAngle(pts) {
  const c = centroid(pts);
  return Math.atan2(c.y - pts[0].y, c.x - pts[0].x);
}
function rotateBy(pts, rad) {
  const c = centroid(pts);
  const cos = Math.cos(rad), sin = Math.sin(rad);
  return pts.map((p) => {
    const dx = p.x - c.x, dy = p.y - c.y;
    return { x: dx * cos - dy * sin + c.x, y: dx * sin + dy * cos + c.y };
  });
}
function boundingBox(pts) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p of pts) {
    minX = Math.min(minX, p.x); minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x); maxY = Math.max(maxY, p.y);
  }
  return { w: maxX - minX, h: maxY - minY };
}
function scaleToSquare(pts, size) {
  const b = boundingBox(pts);
  return pts.map((p) => ({ x: p.x * (size / (b.w || 1)), y: p.y * (size / (b.h || 1)) }));
}
function translateTo(pts, pt) {
  const c = centroid(pts);
  return pts.map((p) => ({ x: p.x + pt.x - c.x, y: p.y + pt.y - c.y }));
}
function pathDistance(a, b) {
  let d = 0;
  for (let i = 0; i < a.length; i++) d += distance(a[i], b[i]);
  return d / a.length;
}
function distanceAtBestAngle(pts, tmpl) {
  let a = -Math.PI / 4, b = Math.PI / 4;
  const thr = (Math.PI / 180) * 2;
  const f = (x) => pathDistance(rotateBy(pts, x), tmpl);
  let x1 = PHI * a + (1 - PHI) * b, f1 = f(x1);
  let x2 = (1 - PHI) * a + PHI * b, f2 = f(x2);
  while (Math.abs(b - a) > thr) {
    if (f1 < f2) { b = x2; x2 = x1; f2 = f1; x1 = PHI * a + (1 - PHI) * b; f1 = f(x1); }
    else { a = x1; x1 = x2; f1 = f2; x2 = (1 - PHI) * a + PHI * b; f2 = f(x2); }
  }
  return Math.min(f1, f2);
}
function normalize(points) {
  let pts = resample(points, NUM_POINTS);
  pts = rotateBy(pts, -indicativeAngle(pts));
  pts = scaleToSquare(pts, SQUARE_SIZE);
  return translateTo(pts, ORIGIN);
}

// ---- Template shapes (raw point paths). ----
function heartBase() {
  const pts = [];
  const N = 64;
  for (let i = 0; i < N; i++) {
    const t = Math.PI - (i / N) * 2 * Math.PI;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    pts.push({ x, y });
  }
  return pts;
}
// Rotate the point sequence so the template can start anywhere around the heart.
function rotateSeq(arr, frac) {
  const k = Math.round(frac * arr.length) % arr.length;
  return arr.slice(k).concat(arr.slice(0, k));
}
function heartRaw(reverse, startFrac) {
  const base = rotateSeq(heartBase(), startFrac);
  return reverse ? base.slice().reverse() : base;
}
function circleRaw() {
  const pts = [];
  for (let i = 0; i <= 60; i++) {
    const t = (i / 60) * 2 * Math.PI;
    pts.push({ x: Math.cos(t), y: Math.sin(t) });
  }
  return pts;
}
function lineRaw() {
  const pts = [];
  for (let i = 0; i <= 30; i++) pts.push({ x: i, y: 0 });
  return pts;
}
function polyRaw(corners, per) {
  const pts = [];
  for (let s = 0; s < corners.length - 1; s++) {
    for (let t = 0; t < per; t++) {
      const u = t / per;
      pts.push({ x: corners[s][0] + (corners[s + 1][0] - corners[s][0]) * u, y: corners[s][1] + (corners[s + 1][1] - corners[s][1]) * u });
    }
  }
  return pts;
}
function squareRaw() { return polyRaw([[-1, -1], [1, -1], [1, 1], [-1, 1], [-1, -1]], 16); }
function triangleRaw() { return polyRaw([[0, -1], [0.87, 0.5], [-0.87, 0.5], [0, -1]], 20); }
function starRaw() {
  const outer = [];
  for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5; outer.push([Math.cos(a), Math.sin(a)]); }
  const order = [0, 2, 4, 1, 3, 0]; // pentagram, single stroke
  return polyRaw(order.map((i) => outer[i]), 14);
}

const TEMPLATES = [];
// Heart templates starting at several points, both drawing directions,
// so a heart matches wherever you begin and whichever way you loop.
for (const frac of [0, 0.25, 0.5, 0.75]) {
  TEMPLATES.push({ name: "heart", points: normalize(heartRaw(false, frac)) });
  TEMPLATES.push({ name: "heart", points: normalize(heartRaw(true, frac)) });
}
// Snappable shapes + a line decoy.
TEMPLATES.push({ name: "circle", points: normalize(circleRaw()) });
TEMPLATES.push({ name: "square", points: normalize(squareRaw()) });
TEMPLATES.push({ name: "triangle", points: normalize(triangleRaw()) });
TEMPLATES.push({ name: "star", points: normalize(starRaw()) });
TEMPLATES.push({ name: "line", points: normalize(lineRaw()) });

const HALF_DIAGONAL = 0.5 * Math.sqrt(2 * SQUARE_SIZE * SQUARE_SIZE);

// Returns { name, score } for the closest template, or null for too-short input.
export function recognize(points) {
  if (points.length < 12) return null;
  const cand = normalize(points);
  let best = Infinity;
  let name = null;
  for (const t of TEMPLATES) {
    const d = distanceAtBestAngle(cand, t.points);
    if (d < best) { best = d; name = t.name; }
  }
  return { name, score: 1 - best / HALF_DIAGONAL };
}
