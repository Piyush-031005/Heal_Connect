# Air Studio 🪄✍️

Camera-based, hands-in-the-air creative toys built with **MediaPipe HandLandmarker** (Google's hand tracking) and 2D Canvas. Everything runs locally in the browser — the webcam feed never leaves your device.

## Modes

- **✍️ Board** (`/board.html`) — write/draw glowing neon strokes in the air. Pinch to draw, release to lift; hover a tool and hold to select it (dwell). Draw a ❤️ and it pops into a real heart (shape recognition).
- **🌀 Mandala** (`/mandala.html`) — your fingertips weave a kaleidoscopic string-art mandala with light trails, sparks, and a harp.
- **🪄 Doctor Strange** (`/studio.html`) — conjure glowing rune **magic circles** from your five fingers (one hand or two). Open your hand to bloom a circle, fist to collapse, snap ✊→🖐 to fire a directional blast, twist your wrist to spin it, ✌️ raises a hexagonal shield; two hands link with a beam and fuse into a portal when brought together. Hand distance charges the spin/glow.

A landing page at `/` links to all three.

## Tech notes

- **Tracking:** MediaPipe `HandLandmarker` (`@mediapipe/tasks-vision`), chosen over the heavier `GestureRecognizer` for smooth, high-FPS tracking. Discrete gestures are classified from the landmarks directly.
- **Smoothing:** One-Euro filter on the pen and circle nodes — steady when still, snappy when moving.
- Pure 2D Canvas rendering with additive-glow neon, light-trail layers, and procedural runes.

## Run locally

```bash
npm install
npm run dev
```

Open the printed URL (e.g. http://localhost:5173/studio.html) in Chrome/Edge and allow camera access. The hand-tracking model loads from a CDN, so you need to be online the first time.

Built with [Vite](https://vitejs.dev/).
