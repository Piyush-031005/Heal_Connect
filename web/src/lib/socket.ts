import { io, Socket } from 'socket.io-client';

// WebSocket connects directly to backend — Next.js rewrites only handle HTTP.
// Env var priority:
//   1. NEXT_PUBLIC_BACKEND_URL  — injected by Docker build / Azure App Settings
//   2. NEXT_PUBLIC_BACKEND_WS_URL — legacy override if needed
//   3. Hardcoded fallback for local dev
const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_WS_URL ||
  'https://healconnect-backend-dqcsaqf4a6baffaz.centralindia-01.azurewebsites.net';


let socket: Socket | null = null;

export function getSocket(token: string): Socket {
  if (socket) {
    const currentToken = (socket.auth as any)?.token;
    if (currentToken === token && socket.connected) {
      return socket;
    }
    // Token changed or socket not connected — disconnect previous instance
    if (currentToken !== token) {
      socket.disconnect();
      socket = null;
    } else if (socket.connected) {
      return socket;
    }
  }

  socket = io(BACKEND_URL, {
    auth: { token },
    transports: ['websocket', 'polling'],
    autoConnect: true,
  });

  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}
