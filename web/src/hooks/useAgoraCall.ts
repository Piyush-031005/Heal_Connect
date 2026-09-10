'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import AgoraRTC, {
  type IAgoraRTCClient,
  type IMicrophoneAudioTrack,
  type IAgoraRTCRemoteUser,
} from 'agora-rtc-sdk-ng';
import { agoraApi, tokenStore, sessionsApi } from '@/lib/api';
import { getSocket } from '@/lib/socket';

export type CallState =
  | 'idle'
  | 'initiating'
  | 'waiting_for_accept'
  | 'accepted'
  | 'connecting'
  | 'connected'
  | 'ended'
  | 'rejected'
  | 'failed'
  // Backward compatibility aliases
  | 'joining'
  | 'waiting'
  | 'error';

interface UseAgoraCallReturn {
  callState: CallState;
  isMuted: boolean;
  isRemoteMuted: boolean;
  remoteUsers: IAgoraRTCRemoteUser[];
  localTrack: IMicrophoneAudioTrack | null;
  join: (sessionId?: string) => Promise<void>;
  leave: () => Promise<void>;
  startCall: () => Promise<void>;
  acceptCall: () => Promise<void>;
  rejectCall: () => Promise<void>;
  endCall: () => Promise<void>;
  toggleMute: () => void;
  error: string | null;
  startTime: string | null;
  elapsed: number;
}

export function useAgoraCall(initialSessionId?: string, isExpert = false): UseAgoraCallReturn {
  const [activeSessionId, setActiveSessionId] = useState<string | undefined>(initialSessionId);
  const clientRef = useRef<IAgoraRTCClient | null>(null);
  const localTrackRef = useRef<IMicrophoneAudioTrack | null>(null);
  const isConnectingRef = useRef(false);

  const [callState, setCallState] = useState<CallState>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [isRemoteMuted, setIsRemoteMuted] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [localTrack, setLocalTrack] = useState<IMicrophoneAudioTrack | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);

  // Sync activeSessionId if prop changes
  useEffect(() => {
    if (initialSessionId && initialSessionId !== activeSessionId) {
      setActiveSessionId(initialSessionId);
    }
  }, [initialSessionId, activeSessionId]);

  // Cleanup Agora resources
  const cleanup = useCallback(async () => {
    isConnectingRef.current = false;
    if (localTrackRef.current) {
      try {
        localTrackRef.current.stop();
        localTrackRef.current.close();
      } catch {}
      localTrackRef.current = null;
    }
    setLocalTrack(null);

    if (clientRef.current) {
      try {
        await clientRef.current.leave().catch(() => {});
      } catch {}
      clientRef.current = null;
    }
  }, []);

  // Full call teardown on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  // Synchronized elapsed timer when connected
  useEffect(() => {
    if (callState !== 'connected') {
      return;
    }

    const calcElapsed = () => {
      if (startTime) {
        const startTs = new Date(startTime).getTime();
        return Math.max(0, Math.floor((Date.now() - startTs) / 1000));
      }
      return 0;
    };

    setElapsed(calcElapsed());
    const interval = setInterval(() => {
      setElapsed((prev) => (startTime ? calcElapsed() : prev + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [callState, startTime]);

  // Connect to Agora channel & publish microphone
  const connectAgora = useCallback(
    async (targetSessionId: string) => {
      if (isConnectingRef.current) return;
      isConnectingRef.current = true;
      setError(null);
      setCallState('connecting');

      try {
        const accessToken = tokenStore.getAccess();
        if (!accessToken) throw new Error('Not authenticated');

        // Fetch Agora token
        const res = await agoraApi.getToken(accessToken, targetSessionId);
        if (!res.success || !res.data) throw new Error(res.message || 'Failed to obtain call credentials');

        const { token, channelName, uid, appId } = res.data;

        // Create Agora client
        const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
        clientRef.current = client;

        // Remote user event handlers
        client.on('user-published', async (user, mediaType) => {
          try {
            await client.subscribe(user, mediaType);
            if (mediaType === 'audio') {
              user.audioTrack?.play();
            }
          } catch (subErr) {
            console.warn('Error subscribing to remote user:', subErr);
          }
        });

        client.on('user-joined', (user) => {
          setRemoteUsers((prev) => {
            const exists = prev.find((u) => u.uid === user.uid);
            return exists ? prev : [...prev, user];
          });

          // Once the other participant joins, ensure session status is marked ACTIVE on backend
          sessionsApi
            .connect(accessToken, targetSessionId)
            .then((connectRes) => {
              if (connectRes.success && connectRes.data?.session?.startTime) {
                setStartTime(connectRes.data.session.startTime);
              }
              setCallState('connected');
            })
            .catch(console.error);
        });

        client.on('user-unpublished', (user) => {
          setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
        });

        // In 1-on-1 audio calling: if remote user leaves the channel, end call on this side
        client.on('user-left', async () => {
          setRemoteUsers([]);
          await cleanup();
          setCallState('ended');
        });

        // Join Agora channel
        await client.join(appId, channelName, token, uid);

        // Acquire microphone
        let micTrack: IMicrophoneAudioTrack;
        try {
          micTrack = await AgoraRTC.createMicrophoneAudioTrack();
        } catch (micErr: any) {
          const isDenied =
            micErr?.name === 'NotAllowedError' ||
            micErr?.name === 'PermissionDeniedError' ||
            micErr?.message?.toLowerCase().includes('permission');
          const errorMsg = isDenied
            ? 'Microphone permission denied. Please allow microphone access in your browser settings.'
            : 'Could not access microphone: ' + (micErr?.message || 'Unknown error');
          setError(errorMsg);
          setCallState('failed');
          await cleanup();
          return;
        }

        localTrackRef.current = micTrack;
        setLocalTrack(micTrack);
        await client.publish(micTrack);

        // Check if remote user is already in channel
        if (client.remoteUsers.length > 0) {
          setRemoteUsers(client.remoteUsers);
          const connectRes = await sessionsApi.connect(accessToken, targetSessionId);
          if (connectRes.success && connectRes.data?.session?.startTime) {
            setStartTime(connectRes.data.session.startTime);
          }
          setCallState('connected');
        } else {
          // Waiting for remote participant to join the Agora channel
          setCallState('connecting');
        }
      } catch (err: unknown) {
        console.error('Agora connection error:', err);
        const message = err instanceof Error ? err.message : 'Failed to establish call connection';
        setError(message);
        setCallState('failed');
        await cleanup();
      } finally {
        isConnectingRef.current = false;
      }
    },
    [cleanup]
  );

  // Initialize call / inspect existing session status
  const initializeSession = useCallback(
    async (sessId: string) => {
      const accessToken = tokenStore.getAccess();
      if (!accessToken) return;

      try {
        const res = await sessionsApi.get(accessToken, sessId);
        if (res.success && res.data?.session) {
          const { status, type } = res.data.session;

          // CRITICAL: Never auto-join Agora for CHAT sessions.
          // useAgoraCall is only safe to activate for AUDIO/VIDEO session types.
          // If this hook is ever mounted for a CHAT session, bail immediately —
          // otherwise connectAgora() runs, mic is acquired, and billing starts.
          if (type === 'CHAT') {
            setCallState('idle');
            return;
          }

          if (status === 'ACTIVE') {
            if (res.data.session.startTime) setStartTime(res.data.session.startTime);
            await connectAgora(sessId);
          } else if (status === 'INITIATED') {
            setCallState('waiting_for_accept');
          } else if (status === 'ACCEPTED') {
            setCallState('connecting');
            await connectAgora(sessId);
          } else if (status === 'COMPLETED' || status === 'CANCELLED') {
            setCallState('ended');
          } else if (status === 'REJECTED') {
            setCallState('rejected');
          }
        }
      } catch (err) {
        console.warn('Failed to fetch initial session status:', err);
      }
    },
    [connectAgora]
  );


  // Socket room joining and event listeners
  useEffect(() => {
    if (!activeSessionId) return;

    const token = tokenStore.getAccess();
    if (!token) return;

    const socket = getSocket(token);

    // Join session room so call signals are delivered to this socket
    socket.emit('join_room', { sessionId: activeSessionId });

    const handleSessionAccepted = () => {
      setCallState('accepted');
      connectAgora(activeSessionId);
    };

    const handleSessionRejected = () => {
      cleanup();
      setCallState('rejected');
      setError('Call was declined');
    };

    const handleSessionConnected = (data: { startTime?: string }) => {
      if (data?.startTime) setStartTime(data.startTime);
      setCallState('connected');
    };

    const handleSessionTerminated = () => {
      cleanup();
      setCallState('ended');
    };

    const handleSessionDisconnected = () => {
      cleanup();
      setCallState('ended');
    };

    const handleMuteUpdate = (data: { isMuted: boolean }) => {
      setIsRemoteMuted(data.isMuted);
    };

    socket.on('session_accepted', handleSessionAccepted);
    socket.on('session_rejected', handleSessionRejected);
    socket.on('session_connected', handleSessionConnected);
    socket.on('session_terminated', handleSessionTerminated);
    socket.on('session_disconnected', handleSessionDisconnected);
    socket.on('call_mute_update', handleMuteUpdate);

    // Check session on load
    initializeSession(activeSessionId);

    return () => {
      socket.off('session_accepted', handleSessionAccepted);
      socket.off('session_rejected', handleSessionRejected);
      socket.off('session_connected', handleSessionConnected);
      socket.off('session_terminated', handleSessionTerminated);
      socket.off('session_disconnected', handleSessionDisconnected);
      socket.off('call_mute_update', handleMuteUpdate);
    };
  }, [activeSessionId, cleanup, connectAgora, initializeSession]);

  // Caller starts / initiates call
  const startCall = useCallback(async () => {
    if (!activeSessionId) return;
    setError(null);
    setCallState('waiting_for_accept');
    const token = tokenStore.getAccess();
    if (token) {
      const socket = getSocket(token);
      socket.emit('join_room', { sessionId: activeSessionId });
    }
  }, [activeSessionId]);

  // Callee accepts incoming call
  const acceptCall = useCallback(async () => {
    if (!activeSessionId) return;
    setError(null);
    const token = tokenStore.getAccess();
    if (!token) return;

    try {
      await sessionsApi.accept(token, activeSessionId);
      setCallState('connecting');
      await connectAgora(activeSessionId);
    } catch (err: any) {
      setError(err?.message || 'Failed to accept call');
      setCallState('failed');
    }
  }, [activeSessionId, connectAgora]);

  // Callee rejects incoming call
  const rejectCall = useCallback(async () => {
    if (!activeSessionId) return;
    const token = tokenStore.getAccess();
    if (!token) return;

    try {
      await sessionsApi.reject(token, activeSessionId);
      await cleanup();
      setCallState('rejected');
    } catch (err: any) {
      console.warn('Reject call error:', err);
      await cleanup();
      setCallState('rejected');
    }
  }, [activeSessionId, cleanup]);

  // Either party ends call
  const endCall = useCallback(async () => {
    const sessId = activeSessionId;
    await cleanup();
    setCallState('ended');
    setRemoteUsers([]);
    setIsMuted(false);

    if (!sessId) return;

    const token = tokenStore.getAccess();
    if (token) {
      const socket = getSocket(token);
      socket.emit('end_call', { sessionId: sessId });
      sessionsApi.end(token, sessId).catch(console.error);
    }
  }, [activeSessionId, cleanup]);

  // Backward compatible join / leave
  const join = useCallback(
    async (sessId?: string) => {
      const target = sessId || activeSessionId;
      if (!target) return;
      if (sessId && sessId !== activeSessionId) {
        setActiveSessionId(sessId);
      }
      await connectAgora(target);
    },
    [activeSessionId, connectAgora]
  );

  const leave = useCallback(async () => {
    await endCall();
  }, [endCall]);

  // Toggle local microphone mute
  const toggleMute = useCallback(() => {
    if (!localTrackRef.current) return;
    const next = !isMuted;
    localTrackRef.current.setEnabled(!next);
    setIsMuted(next);

    // Notify remote party via socket
    if (activeSessionId) {
      const token = tokenStore.getAccess();
      if (token) {
        getSocket(token).emit('call_mute_toggle', { sessionId: activeSessionId, isMuted: next });
      }
    }
  }, [activeSessionId, isMuted]);

  return {
    callState,
    isMuted,
    isRemoteMuted,
    remoteUsers,
    localTrack,
    join,
    leave,
    startCall,
    acceptCall,
    rejectCall,
    endCall,
    toggleMute,
    error,
    startTime,
    elapsed,
  };
}

