'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { ArrowLeft, MessageSquare, Phone, PhoneOff, PhoneCall, User } from 'lucide-react';
import ChatWindow from '@/components/chat/ChatWindow';
import { Button } from '@/components/ui/button';
import { tokenStore, agoraApi, sessionsApi, type PractitionerProfile } from '@/lib/api';
import { getSocket } from '@/lib/socket';

// Agora SDK uses `window` at import time — must never be SSR'd
const AudioCallScreen = dynamic(() => import('@/components/chat/AudioCallScreen'), { ssr: false });

type Tab = 'chat' | 'call';

export default function SessionPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [sessionType, setSessionType] = useState<string | null>(null);
  const [peer, setPeer] = useState<any>(null); // The other person in the chat
  const [isExpert, setIsExpert] = useState(false);
  const [activeSession, setActiveSession] = useState<any>(null);
  const [tab, setTab] = useState<Tab>('chat');
  const [startingCall, setStartingCall] = useState(false);
  const [incomingCall, setIncomingCall] = useState<any>(null);

  useEffect(() => {
    const token = tokenStore.getAccess();
    if (!token) { router.push('/login'); return; }

    let currentJwtUserId = '';
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      currentJwtUserId = payload.userId;
      setUserId(currentJwtUserId);
    } catch {
      router.push('/login');
      return;
    }

    agoraApi.getChannel(token, sessionId).then((res) => {
      if (res.success && res.data) {
        setSessionType(res.data.sessionType);
        if (res.data.sessionType === 'AUDIO' || res.data.sessionType === 'VIDEO') {
          setTab('call');
        }
      }
    });

    // Fetch session to get peer info
    sessionsApi.get(token, sessionId).then((res) => {
      if (res.success && res.data) {
        const session = res.data.session;
        setActiveSession(session);
        
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const tokenPayload = JSON.parse(atob(base64));
        const isPractitioner = tokenPayload.practitionerId === session.practitionerId;
        setIsExpert(isPractitioner);
        
        if (isPractitioner) {
          setPeer(session.user);
        } else {
          setPeer(session.practitioner);
        }
      }
    });

    // Listen for incoming calls if the expert is in chat
    const socket = getSocket(token);
    const handleIncomingCall = (data: any) => {
      const incomingId = data.id || data.sessionId;
      if (incomingId && incomingId !== sessionId) {
        setIncomingCall({ ...data, sessionId: incomingId });
      }
    };
    socket.on('call_incoming', handleIncomingCall);

    return () => {
      socket.off('call_incoming', handleIncomingCall);
    };
  }, [router, sessionId]);

  const handleSwitchToCall = async () => {
    if (startingCall) return;
    setStartingCall(true);
    try {
      const token = tokenStore.getAccess();
      if (!token || !activeSession?.practitionerId) return;
      // Create a new AUDIO session with the same practitioner
      const res = await sessionsApi.create(token, activeSession.practitionerId, 'AUDIO');
      if (res.success && res.data?.session?.id) {
        router.push(`/session/${res.data.session.id}`);
      }
    } catch (err) {
      console.error('Failed to start audio call:', err);
    } finally {
      setStartingCall(false);
    }
  };

  if (!userId || !peer) return null;

  // showCallTab: only true for AUDIO/VIDEO sessions — NEVER for CHAT.
  // Mounting AudioCallScreen for a CHAT session causes useAgoraCall to auto-join
  // the Agora channel and start billing, even when no call was requested.
  const showCallTab = sessionType === 'AUDIO' || sessionType === 'VIDEO';
  // Chat-only session, viewed by the consumer — offer a one-tap way to escalate to a call.
  const showSwitchToCall = sessionType === 'CHAT' && !isExpert;
  const initials = peer?.name
    ? peer.name.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase()
    : '?';

  return (
    <div className="flex flex-col h-screen bg-[#faf9f6]">

      {/* ── Incoming Call Modal (for Expert) ── */}
      {incomingCall && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#121420] border border-indigo-500/30 rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center overflow-hidden">
                {incomingCall.user?.photoUrl
                  ? <img src={incomingCall.user.photoUrl} alt="" className="w-full h-full object-cover" />
                  : <User className="w-10 h-10 text-gray-400" />}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-1">Incoming Call</p>
                <p className="text-2xl font-extrabold text-white">{incomingCall.user?.name ?? 'Client'}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {incomingCall.type === 'AUDIO' ? '🎙️ Audio Session Request' : '💬 Consultation Request'}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="destructive"
                className="rounded-full w-14 h-14 bg-red-500 hover:bg-red-600 shadow-lg"
                title="Decline"
                onClick={async () => {
                  const token = tokenStore.getAccess();
                  if (token) await sessionsApi.reject(token, incomingCall.sessionId).catch(console.error);
                  setIncomingCall(null);
                }}
              >
                <PhoneOff className="h-6 w-6 text-white" />
              </Button>
              <Button
                className="rounded-full w-16 h-16 bg-emerald-500 hover:bg-emerald-600 shadow-xl animate-pulse"
                title="Accept"
                onClick={async () => {
                  const currentCall = incomingCall;
                  setIncomingCall(null);
                  if (!currentCall) return;
                  const token = tokenStore.getAccess();
                  if (token) {
                    await sessionsApi.accept(token, currentCall.sessionId).catch(console.error);
                  }
                  router.push(`/session/${currentCall.sessionId}`);
                }}
              >
                <PhoneCall className="h-7 w-7 text-white" />
              </Button>
            </div>
            <p className="text-xs text-gray-400">Tap to answer or decline</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-yellow-100 px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full hover:bg-yellow-50 shrink-0">
          <ArrowLeft className="h-5 w-5 text-purple-700" />
        </Button>

        {/* Peer avatar */}
        <div className="relative shrink-0">
          {peer?.photoUrl ? (
            <Image
              src={peer.photoUrl}
              alt={peer.name || 'User'}
              width={38}
              height={38}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#4f46e5] to-[#ef4444] flex items-center justify-center text-white text-sm font-bold">
              {initials}
            </div>
          )}
          {peer?.isOnline !== undefined && peer.isOnline && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
          )}
        </div>

        {/* Name + status */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-[#1a1a1a] truncate">
            {peer?.name ?? 'Loading...'}
          </p>
          <p className="text-xs text-purple-400 truncate">
            {peer?.specialties?.slice(0, 2).join(' · ') ?? sessionId.slice(0, 8) + '...'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 shrink-0">
          <Button
            size="sm"
            variant={tab === 'chat' ? 'default' : 'ghost'}
            onClick={() => setTab('chat')}
            className={cn(
              'h-8 px-3 rounded-full text-xs gap-1',
              tab === 'chat' ? 'bg-[#4f46e5] hover:bg-[#4338ca] border-0 text-white' : 'hover:bg-yellow-50'
            )}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            Chat
          </Button>
          {showCallTab && (
            <Button
              size="sm"
              variant={tab === 'call' ? 'default' : 'ghost'}
              onClick={() => setTab('call')}
              className={cn(
                'h-8 px-3 rounded-full text-xs gap-1',
                tab === 'call' ? 'bg-[#4f46e5] hover:bg-[#4338ca] border-0 text-white' : 'hover:bg-yellow-50'
              )}
            >
              <Phone className="h-3.5 w-3.5" />
              Call
            </Button>
          )}
          {showSwitchToCall && (
            <Button
              size="icon"
              onClick={handleSwitchToCall}
              disabled={startingCall}
              aria-label="Start a call with this expert"
              title="Switch to a call"
              className="h-8 w-8 rounded-full bg-emerald-500 hover:bg-emerald-600 border-0 text-white disabled:opacity-50 shrink-0"
            >
              <Phone className={cn('h-3.5 w-3.5', startingCall ? 'animate-pulse' : '')} />
            </Button>
          )}
        </div>
      </header>

      {/* Persistent Call Banner — only shown when viewing chat tab during an active AUDIO/VIDEO session */}
      {showCallTab && tab === 'chat' && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 flex items-center justify-between text-xs shadow-md z-20">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="font-semibold">Audio call in progress</span>
          </div>
          <button
            onClick={() => setTab('call')}
            className="bg-white/20 hover:bg-white/30 text-white font-bold px-3 py-1 rounded-full transition-colors flex items-center gap-1"
          >
            <Phone className="w-3 h-3" />
            <span>Return to Call</span>
          </button>
        </div>
      )}

      {/* Content — Both screens remain mounted so switching tabs preserves call & socket state */}
      <div className="flex-1 overflow-hidden relative">
        <div className={cn('h-full', tab === 'chat' ? 'flex flex-col' : 'hidden')}>
          <ChatWindow
            sessionId={sessionId}
            currentUserId={userId}
            isExpert={isExpert}
            practitionerId={activeSession?.practitionerId ?? ''}
            practitionerName={isExpert ? '' : (peer?.name ?? 'the expert')}
          />
        </div>

        {showCallTab && (
          <div className={cn('h-full', tab === 'call' ? 'flex flex-col' : 'hidden')}>
            <AudioCallScreen
              sessionId={sessionId}
              isExpert={isExpert}
              peerName={peer?.name}
              peerPhoto={peer?.photoUrl}
              onReturnToChat={() => setTab('chat')}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// inline cn to avoid extra import issues
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
