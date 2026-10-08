import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import {
  createAgoraRtcEngine,
  IRtcEngine,
  ChannelProfileType,
  ClientRoleType,
} from 'react-native-agora';
import { authApi, tokenStore } from '../lib/api';

const API_URL = process.env.EXPO_PUBLIC_API_URL || '';

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
  | 'joining'
  | 'waiting'
  | 'error';

interface UseAgoraCallReturn {
  callState: CallState;
  isMuted: boolean;
  isRemoteMuted: boolean;
  remoteUsers: number[];
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

const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ]);
  }
};

export function useAgoraCall(initialSessionId?: string, isExpert = false): UseAgoraCallReturn {
  const [activeSessionId, setActiveSessionId] = useState<string | undefined>(initialSessionId);
  const engineRef = useRef<IRtcEngine | null>(null);
  const isConnectingRef = useRef(false);

  const [callState, setCallState] = useState<CallState>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [isRemoteMuted, setIsRemoteMuted] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (initialSessionId && initialSessionId !== activeSessionId) {
      setActiveSessionId(initialSessionId);
    }
  }, [initialSessionId, activeSessionId]);

  const cleanup = useCallback(async () => {
    isConnectingRef.current = false;
    if (engineRef.current) {
      try {
        engineRef.current.leaveChannel();
        engineRef.current.release();
      } catch (e) {
        console.warn(e);
      }
      engineRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  useEffect(() => {
    if (callState !== 'connected') return;

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

  const connectAgora = useCallback(async (targetSessionId: string) => {
    if (isConnectingRef.current) return;
    isConnectingRef.current = true;
    setError(null);
    setCallState('connecting');

    try {
      await requestPermissions();
      
      const accessToken = await tokenStore.getAccess();
      if (!accessToken) throw new Error('Not authenticated');

      const res = await fetch(`${API_URL}/api/agora/token?sessionId=${targetSessionId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const resData = await res.json();
      if (!resData.success) throw new Error(resData.message || 'Failed to obtain credentials');

      const { token, channelName, uid, appId } = resData.data;

      const engine = createAgoraRtcEngine();
      engineRef.current = engine;
      engine.initialize({ appId });
      engine.registerEventHandler({
        onJoinChannelSuccess: (_connection, _elapsed) => {
          setCallState('connected');
        },
        onUserJoined: (_connection, remoteUid, _elapsed) => {
          setRemoteUsers((prev) => [...prev, remoteUid]);
        },
        onUserOffline: (_connection, remoteUid, _reason) => {
          setRemoteUsers((prev) => prev.filter((id) => id !== remoteUid));
        },
        onUserMuteAudio: (_connection, remoteUid, muted) => {
          setIsRemoteMuted(muted);
        },
      });

      engine.enableAudio();
      engine.setChannelProfile(ChannelProfileType.ChannelProfileCommunication);
      engine.setClientRole(ClientRoleType.ClientRoleBroadcaster);
      engine.joinChannel(token, channelName, uid, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Connection failed');
      setCallState('error');
      isConnectingRef.current = false;
    }
  }, []);

  const join = useCallback(async (sid?: string) => {
    const id = sid || activeSessionId;
    if (!id) {
      setError('No session ID provided');
      return;
    }
    await connectAgora(id);
  }, [activeSessionId, connectAgora]);

  const leave = useCallback(async () => {
    await cleanup();
    setCallState('ended');
  }, [cleanup]);

  const startCall = useCallback(async () => {
    if (!activeSessionId) return;
    try {
      setCallState('initiating');
      const token = await tokenStore.getAccess();
      await fetch(`${API_URL}/api/sessions/${activeSessionId}/call`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      setCallState('waiting_for_accept');
    } catch (err: any) {
      setError(err.message);
      setCallState('failed');
    }
  }, [activeSessionId]);

  const acceptCall = useCallback(async () => {
    if (!activeSessionId) return;
    try {
      setCallState('accepted');
      const token = await tokenStore.getAccess();
      await fetch(`${API_URL}/api/sessions/${activeSessionId}/accept`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      await connectAgora(activeSessionId);
    } catch (err: any) {
      setError(err.message);
    }
  }, [activeSessionId, connectAgora]);

  const rejectCall = useCallback(async () => {
    if (!activeSessionId) return;
    try {
      setCallState('rejected');
      const token = await tokenStore.getAccess();
      await fetch(`${API_URL}/api/sessions/${activeSessionId}/reject`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err: any) {
      setError(err.message);
    }
  }, [activeSessionId]);

  const endCall = useCallback(async () => {
    if (!activeSessionId) return;
    try {
      const token = await tokenStore.getAccess();
      await fetch(`${API_URL}/api/sessions/${activeSessionId}/end`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      await leave();
    } catch (err: any) {
      setError(err.message);
    }
  }, [activeSessionId, leave]);

  const toggleMute = useCallback(() => {
    if (!engineRef.current) return;
    const newMuted = !isMuted;
    engineRef.current.enableLocalAudio(!newMuted);
    setIsMuted(newMuted);
  }, [isMuted]);

  return {
    callState,
    isMuted,
    isRemoteMuted,
    remoteUsers,
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
