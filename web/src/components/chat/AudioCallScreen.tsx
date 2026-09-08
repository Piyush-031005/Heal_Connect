'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAgoraCall } from '@/hooks/useAgoraCall';

import CallFeedbackModal from './CallFeedbackModal';
import { Button } from '@/components/ui/button';
import {
  Mic,
  MicOff,
  PhoneOff,
  Phone,
  Radio,
  Loader2,
  PhoneCall,
  VolumeX,
  RotateCcw,
  MessageSquare,
} from 'lucide-react';

interface Props {
  sessionId: string;
  isExpert?: boolean;
  peerName?: string;
  peerPhoto?: string;
  onReturnToChat?: () => void;
}

export default function AudioCallScreen({
  sessionId,
  isExpert = false,
  peerName,
  peerPhoto,
  onReturnToChat,
}: Props) {
  const {
    callState,
    isMuted,
    isRemoteMuted,
    remoteUsers,
    localTrack,
    startCall,
    acceptCall,
    rejectCall,
    endCall,
    toggleMute,
    error,
    elapsed,
  } = useAgoraCall(sessionId, isExpert);


  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (callState === 'ended') {
      setShowFeedback(true);
    }
  }, [callState]);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const displayName = peerName || (isExpert ? 'Client' : 'Expert');

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 p-6 bg-gradient-to-b from-[#faf9f6] to-[#f4f2eb] select-none">
      {/* Visual Avatar & Animation State */}
      <div className="text-center space-y-4 max-w-sm mx-auto flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          {/* Animated pulse rings during ringing or active connection */}
          {(callState === 'waiting_for_accept' || callState === 'initiating') && (
            <>
              <div className="absolute w-36 h-36 rounded-full bg-indigo-500/10 animate-ping" />
              <div className="absolute w-28 h-28 rounded-full bg-indigo-500/20 animate-pulse" />
            </>
          )}

          {callState === 'connected' && (
            <div className="absolute w-28 h-28 rounded-full bg-emerald-500/20 animate-pulse" />
          )}

          {/* Avatar Container */}
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto overflow-hidden shadow-lg border-2 transition-all relative z-10 ${
              callState === 'connected'
                ? 'border-emerald-500 ring-4 ring-emerald-500/20'
                : callState === 'waiting_for_accept' || callState === 'connecting'
                ? 'border-indigo-500 ring-4 ring-indigo-500/20'
                : 'border-gray-200 bg-white'
            }`}
          >
            {peerPhoto ? (
              <Image
                src={peerPhoto}
                alt={displayName}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#4f46e5] to-[#ef4444] flex items-center justify-center text-white text-2xl font-bold">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>

        {/* Name */}
        <div>
          <h2 className="text-xl font-bold text-gray-900">{displayName}</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {isExpert ? 'Audio Consultation' : 'Wellness Consultation'}
          </p>
        </div>

        {/* ── Status Text & State Badges ── */}
        <div className="space-y-2">
          {callState === 'idle' && (
            <p className="text-gray-500 text-sm font-medium">Ready to start audio call</p>
          )}

          {callState === 'initiating' && (
            <div className="flex items-center justify-center gap-2 text-indigo-600 font-semibold text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Connecting call...</span>
            </div>
          )}

          {/* Caller waiting for callee to accept */}
          {callState === 'waiting_for_accept' && !isExpert && (
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2 text-indigo-600 font-semibold text-sm">
                <PhoneCall className="w-4 h-4 animate-bounce text-indigo-600" />
                <span>Calling {displayName}...</span>
              </div>
              <p className="text-xs text-gray-400">Waiting for expert to accept...</p>
            </div>
          )}

          {/* Callee / Expert receiving the incoming call */}
          {callState === 'waiting_for_accept' && isExpert && (
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold text-base animate-pulse">
                <PhoneCall className="w-5 h-5 text-emerald-600 animate-bounce" />
                <span>Incoming Audio Call</span>
              </div>
              <p className="text-xs text-gray-500">{displayName} is requesting an audio session</p>
            </div>
          )}

          {/* Accepted / Connecting state */}
          {(callState === 'accepted' || callState === 'connecting') && (
            <div className="flex items-center justify-center gap-2 text-indigo-600 font-semibold text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Establishing secure audio connection...</span>
            </div>
          )}

          {/* Connected state with timer and mute status */}
          {callState === 'connected' && (
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-emerald-700 text-xs">Connected</span>
                <span className="text-emerald-300">·</span>
                <span className="text-emerald-800 text-xs font-mono font-bold tracking-wider">
                  {formatTime(elapsed)}
                </span>
              </div>

              {/* Remote Muted Notice */}
              {isRemoteMuted && (
                <div className="flex items-center justify-center gap-1 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-3 py-0.5 max-w-xs mx-auto">
                  <VolumeX className="w-3 h-3 text-amber-500" />
                  <span>{displayName} is muted</span>
                </div>
              )}

              {/* Live STT Status Badge */}
              <div className="pt-1">
                {isTranscribing ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm animate-pulse">
                    <Radio className="h-3 w-3 text-emerald-600 animate-spin" />
                    <span>Live Audio Transcription Active</span>
                  </div>
                ) : transcriptStatus === 'unavailable' ? (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs text-gray-400 bg-gray-100 border border-gray-200/60">
                    <span>📝 Audio transcription unavailable</span>
                  </div>
                ) : null}
              </div>

              {/* Live speech snippet preview */}
              {isTranscribing && liveSnippet && (
                <div className="pt-2 px-3 py-1.5 bg-white/90 backdrop-blur border rounded-lg text-xs text-gray-600 italic truncate max-w-xs mx-auto shadow-sm">
                  &ldquo;{liveSnippet}&rdquo;
                </div>
              )}
            </div>
          )}

          {/* Ended state */}
          {callState === 'ended' && (
            <div className="space-y-1">
              <p className="text-gray-700 font-bold text-sm">Call ended</p>
              {elapsed > 0 && (
                <p className="text-xs text-gray-400">Total duration: {formatTime(elapsed)}</p>
              )}
            </div>
          )}

          {/* Rejected / Declined state */}
          {callState === 'rejected' && (
            <div className="space-y-1">
              <p className="text-amber-700 font-semibold text-sm">Call declined</p>
              <p className="text-xs text-gray-400">The expert is currently unavailable to take this call.</p>
            </div>
          )}

          {/* Error / Failed state */}
          {callState === 'failed' && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3 max-w-xs mx-auto">
              <p className="font-semibold">Unable to connect</p>
              <p className="mt-0.5">{error || 'Failed to establish call connection.'}</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Call Action Controls ── */}
      <div className="flex items-center justify-center gap-5">
        {/* State: IDLE -> Start Call */}
        {callState === 'idle' && (
          <Button
            size="lg"
            className="rounded-full w-16 h-16 bg-emerald-500 hover:bg-emerald-600 shadow-xl hover:scale-105 active:scale-95 transition-all"
            onClick={startCall}
            aria-label="Start Audio Call"
          >
            <Phone className="h-7 w-7 text-white" />
          </Button>
        )}

        {/* State: WAITING_FOR_ACCEPT -> For Caller: Cancel Button */}
        {callState === 'waiting_for_accept' && !isExpert && (
          <Button
            size="lg"
            variant="destructive"
            className="rounded-full px-6 py-3 font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all gap-2"
            onClick={endCall}
          >
            <PhoneOff className="h-5 w-5" />
            <span>Cancel Call</span>
          </Button>
        )}

        {/* State: WAITING_FOR_ACCEPT -> For Expert: Accept & Decline Buttons */}
        {callState === 'waiting_for_accept' && isExpert && (
          <div className="flex items-center gap-6">
            <Button
              size="lg"
              variant="destructive"
              className="rounded-full w-14 h-14 bg-red-500 hover:bg-red-600 shadow-lg hover:scale-105 active:scale-95 transition-all"
              onClick={rejectCall}
              title="Decline"
            >
              <PhoneOff className="h-6 w-6 text-white" />
            </Button>
            <Button
              size="lg"
              className="rounded-full w-16 h-16 bg-emerald-500 hover:bg-emerald-600 shadow-xl hover:scale-110 active:scale-95 transition-all animate-pulse"
              onClick={acceptCall}
              title="Accept"
            >
              <Phone className="h-7 w-7 text-white" />
            </Button>
          </div>
        )}

        {/* State: CONNECTING -> Cancel Button */}
        {(callState === 'connecting' || callState === 'accepted') && (
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-5 py-2.5 text-xs text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
            onClick={endCall}
          >
            <PhoneOff className="h-4 w-4 mr-1.5" />
            <span>Cancel</span>
          </Button>
        )}

        {/* State: CONNECTED -> Mute / Unmute & End Call */}
        {callState === 'connected' && (
          <>
            <Button
              size="lg"
              variant="outline"
              className={`rounded-full w-14 h-14 transition-all ${
                isMuted
                  ? 'bg-red-50 border-red-300 text-red-600 hover:bg-red-100'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
              onClick={toggleMute}
              title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
            >
              {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </Button>

            <Button
              size="lg"
              className="rounded-full w-16 h-16 bg-red-500 hover:bg-red-600 shadow-xl hover:scale-105 active:scale-95 transition-all"
              onClick={endCall}
              title="End call"
            >
              <PhoneOff className="h-7 w-7 text-white" />
            </Button>
          </>
        )}

        {/* State: ENDED or REJECTED or FAILED -> Return to Chat / Retry */}
        {(callState === 'ended' || callState === 'rejected' || callState === 'failed') && (
          <div className="flex items-center gap-3">
            {onReturnToChat && (
              <Button
                variant="outline"
                className="rounded-full px-5 py-2.5 text-xs font-semibold gap-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                onClick={onReturnToChat}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Return to Chat</span>
              </Button>
            )}
            <Button
              className="rounded-full px-5 py-2.5 text-xs font-semibold gap-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white"
              onClick={startCall}
            >
              <RotateCcw className="w-4 h-4" />
              <span>{callState === 'ended' ? 'Call Again' : 'Try Again'}</span>
            </Button>
          </div>
        )}
      </div>

      {/* Post-call feedback modal */}
      <CallFeedbackModal
        sessionId={sessionId}
        open={showFeedback}
        onClose={() => setShowFeedback(false)}
        transcriptStatus={transcriptStatus}
      />
    </div>
  );
}

