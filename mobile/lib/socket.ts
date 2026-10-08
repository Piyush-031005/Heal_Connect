import { io, Socket } from 'socket.io-client';

const BACKEND_URL = process.env.EXPO_PUBLIC_API_URL || 'https://healconnect-backend-dqcsaqf4a6baffaz.centralindia-01.azurewebsites.net';

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
