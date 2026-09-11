import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { verifyAccessToken } from './jwt';
import { prisma } from './prisma';
import { flagContentIfNeeded } from './moderation';

let io: SocketIOServer | null = null;

export function initSocketServer(server: HttpServer): SocketIOServer {
  io = new SocketIOServer(server, {
    cors: {
      origin: [process.env.FRONTEND_URL || 'http://localhost:3000', 'http://localhost:3000'],
      credentials: true,
      methods: ['GET', 'POST'],
    },
  });

  // Auth middleware — attach userId or practitionerId from JWT
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token as string | undefined;
    if (!token) return next(new Error('No token'));
    try {
      const payload = verifyAccessToken(token);
      (socket as any).userId = payload.userId;
      (socket as any).practitionerId = payload.practitionerId ?? null;
      console.log(`🔐 Socket auth: userId=${payload.userId} practitionerId=${payload.practitionerId ?? 'none'}`);
      next();
    } catch (err) {
      console.error('Socket auth error:', err);
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket: Socket) => {
    const userId: string = (socket as any).userId;
    const practitionerId: string | null = (socket as any).practitionerId;

    console.log(`🔌 Connected: ${socket.id} user=${userId} practitioner=${practitionerId ?? 'none'}`);

    // Join practitioner room (but do NOT force them online automatically)
    if (practitionerId) {
      socket.join(`practitioner_${practitionerId}`);
    }

    // User joins their personal room
    if (userId) {
      socket.join(`user_${userId}`);
      // If userId matches a practitioner or astrologer, also join the practitioner room
      socket.join(`practitioner_${userId}`);
    }

    // Explicit room registration from frontend
    socket.on('join_practitioner', ({ practitionerId: pid }: { practitionerId?: string } = {}) => {
      const targetId = pid || practitionerId || userId;
      if (targetId) {
        socket.join(`practitioner_${targetId}`);
        console.log(`🔌 Socket ${socket.id} explicitly joined practitioner_${targetId}`);
      }
    });

    socket.on('register_expert', ({ practitionerId: pid }: { practitionerId?: string } = {}) => {
      const targetId = pid || practitionerId || userId;
      if (targetId) {
        socket.join(`practitioner_${targetId}`);
        console.log(`🔌 Socket ${socket.id} registered expert in practitioner_${targetId}`);
      }
    });

    const joinedSessions = new Set<string>(); // Track which session rooms this socket is in

    // ── Join a session room ──────────────────────────────────────────────────
    socket.on('join_room', async ({ sessionId }: { sessionId: string }) => {
      // Verify this socket belongs to this session
      const session = await prisma.session.findFirst({
        where: {
          id: sessionId,
          OR: [{ userId }, ...(practitionerId ? [{ practitionerId }] : [])],
        },
      });
      if (!session) { socket.emit('error', { message: 'Session not found' }); return; }

      socket.join(`room:${sessionId}`);
      joinedSessions.add(sessionId); // Track for disconnect cleanup

      // Send message history
      const messages = await prisma.chatMessage.findMany({
        where: { sessionId },
        orderBy: { createdAt: 'asc' },
        take: 100,
      });
      socket.emit('message_history', { messages });
      socket.emit('joined_room', { sessionId });

      // Notify the other party that someone joined
      socket.to(`room:${sessionId}`).emit('peer_joined', { sessionId });

      // ── Start CHAT sessions ONLY when both user and expert have joined ───
      if (session.type === 'CHAT') {
        const room = io!.sockets.adapter.rooms.get(`room:${sessionId}`);
        let hasUser = false;
        let hasPractitioner = false;
        if (room) {
          for (const socketId of room) {
            const s = io!.sockets.sockets.get(socketId) as any;
            if (s) {
              if (s.userId === session.userId) hasUser = true;
              if (s.practitionerId === session.practitionerId || s.userId === session.practitionerId) {
                hasPractitioner = true;
              }
            }
          }
        }

        if (hasUser && hasPractitioner) {
          if (!['ACTIVE', 'COMPLETED', 'CANCELLED', 'REJECTED', 'DISCONNECTED'].includes(session.status)) {
            try {
              const startTime = session.startTime ?? new Date();
              const activated = await prisma.session.update({
                where: { id: sessionId },
                data: { status: 'ACTIVE', startTime },
              });
              console.log(`💬 CHAT session ${sessionId} activated: both user and practitioner joined`);
              io!.to(`room:${sessionId}`).emit('session_connected', {
                sessionId,
                status: 'ACTIVE',
                startTime: activated.startTime,
              });
            } catch (err) {
              console.error(`[socket] Failed to activate CHAT session ${sessionId}:`, err);
            }
          } else if (session.status === 'ACTIVE') {
            socket.emit('session_connected', {
              sessionId,
              status: 'ACTIVE',
              startTime: session.startTime,
            });
          }
        } else if (session.status === 'ACTIVE') {
          // If session was already ACTIVE, sync this joining socket
          socket.emit('session_connected', {
            sessionId,
            status: 'ACTIVE',
            startTime: session.startTime,
          });
        }
      }

      // For Audio/Video: joining the Socket.IO room is only signaling.
      // The Agora client calls /connect after it has joined and published.
      const room = io!.sockets.adapter.rooms.get(`room:${sessionId}`);
      const roomSize = room ? room.size : 1;
      if (roomSize > 1) {
        socket.to(`room:${sessionId}`).emit('peer_joined', { sessionId });
      }
    });

    // ── Send message ─────────────────────────────────────────────────────────
    socket.on('send_message', async ({ sessionId, content }: { sessionId: string; content: string }) => {
      if (!content?.trim()) return;

      // Verify session is active and sender belongs to it
      const session = await prisma.session.findFirst({
        where: {
          id: sessionId,
          status: 'ACTIVE',
          OR: [{ userId }, ...(practitionerId ? [{ practitionerId }] : [])],
        },
      });
      if (!session) { socket.emit('error', { message: 'Session not active' }); return; }

      const senderType = practitionerId && session.practitionerId === practitionerId ? 'PRACTITIONER' : 'USER';
      const senderId = senderType === 'PRACTITIONER' ? practitionerId! : userId;

      // ── Contact-info moderation: run BEFORE saving ──────────────────────────
      // If a phone number or email is detected, block the message, flag the session,
      // and apply a temporary ban — without storing the content.
      const modResult = await flagContentIfNeeded(content.trim(), 'CHAT', {
        sessionId,
        userId: senderId,
        practitionerId: senderType === 'PRACTITIONER' ? senderId : session.practitionerId,
      });

      if (modResult.blocked) {
        socket.emit('message_blocked', {
          sessionId,
          reason: modResult.reason ?? 'Message blocked by moderation.',
        });
        return; // Do NOT save or broadcast the message
      }

      const message = await prisma.chatMessage.create({
        data: { sessionId, senderId, senderType, content: content.trim() },
      });

      // Non-blocking async scan for other keyword violations (abuse, fraud, etc.)
      flagContentIfNeeded(content.trim(), 'CHAT', {
        sessionId,
        userId: senderId,
        practitionerId: senderType === 'PRACTITIONER' ? senderId : session.practitionerId,
        chatMessageId: message.id,
      }).catch((err) => console.error('[moderation] chat scan error:', err));

      io!.to(`room:${sessionId}`).emit('new_message', { message });
    });

    // ── Typing indicators ────────────────────────────────────────────────────
    socket.on('typing_start', ({ sessionId }: { sessionId: string }) => {
      socket.to(`room:${sessionId}`).emit('typing_update', { userId, isTyping: true });
    });

    socket.on('typing_stop', ({ sessionId }: { sessionId: string }) => {
      socket.to(`room:${sessionId}`).emit('typing_update', { userId, isTyping: false });
    });

    // ── Call event synchronization ──────────────────────────────────────────
    socket.on('call_mute_toggle', ({ sessionId, isMuted }: { sessionId: string; isMuted: boolean }) => {
      // Broadcast mute state to all participants in the session room
      socket.to(`room:${sessionId}`).emit('call_mute_update', { sessionId, userId, isMuted });
    });

    socket.on('end_call', async ({ sessionId }: { sessionId: string }) => {
      io!.to(`room:${sessionId}`).emit('session_terminated', { sessionId, reason: 'ended_by_user' });
    });
    // ── Read receipts ────────────────────────────────────────────────────────
    socket.on('message_read', async ({ sessionId, messageId }: { sessionId: string; messageId: string }) => {
      const readAt = new Date();
      await prisma.chatMessage.updateMany({
        where: { id: messageId, sessionId },
        data: { isRead: true, readAt },
      });
      io!.to(`room:${sessionId}`).emit('receipt_update', { messageId, readAt: readAt.toISOString() });
    });

    // ── Disconnect: handle dropped calls + expert offline ───────────────────
    socket.on('disconnect', () => {
      console.log(`🔌 Disconnected: ${socket.id}`);

      // Task 1: Mark any ACTIVE session this socket was in as DISCONNECTED.
      // This handles failed/dropped calls so the other party is notified.
      if (joinedSessions.size > 0) {
        for (const sessionId of joinedSessions) {
          prisma.session.findFirst({
            where: { id: sessionId, status: 'ACTIVE' },
          }).then((session: Awaited<ReturnType<typeof prisma.session.findFirst>>) => {
            if (!session) return;
            // Only mark DISCONNECTED if the disconnecting party actually owns this session
            const isParticipant =
              session.userId === userId ||
              (practitionerId != null && session.practitionerId === practitionerId);
            if (!isParticipant) return;

            return prisma.session.update({
              where: { id: sessionId },
              data: { status: 'DISCONNECTED', endTime: new Date() },
            }).then(() => {
              // Notify the remaining party in the room
              io!.to(`room:${sessionId}`).emit('session_disconnected', {
                sessionId,
                reason: 'participant_disconnected',
                disconnectedUserId: userId,
              });
              console.log(`Session ${sessionId} marked DISCONNECTED (socket drop)`);
            });
          }).catch((err: unknown) => {
            console.error(`[socket] disconnect session cleanup error for ${sessionId}:`, err);
          });
        }
      }

      if (practitionerId) {
        // Add a 5 second grace period for page navigations/reloads
        setTimeout(() => {
          // Only set offline if no other sockets are connected for this practitioner
          const roomSize = io!.sockets.adapter.rooms.get(`practitioner_${practitionerId}`)?.size || 0;
          if (roomSize === 0) {
            prisma.practitioner.update({ where: { id: practitionerId }, data: { isOnline: false } })
              .then(() => {
                io!.emit('practitioner_status', { practitionerId, isOnline: false });
              })
              .catch(console.error);
          }
        }, 5000);
      }
    });
  });

  return io;
}

export function getIO(): SocketIOServer | null { return io; }

// Emit to a session room + optionally to specific user/practitioner rooms
export function emitConsultationEvent(
  event: string,
  consultationId: string,
  payload: unknown,
  targetIds?: { userId?: string; practitionerId?: string }
) {
  if (!io) return;
  io.to(`room:${consultationId}`).emit(event, payload);
  if (targetIds?.userId) io.to(`user_${targetIds.userId}`).emit(event, payload);
  if (targetIds?.practitionerId) io.to(`practitioner_${targetIds.practitionerId}`).emit(event, payload);
}
