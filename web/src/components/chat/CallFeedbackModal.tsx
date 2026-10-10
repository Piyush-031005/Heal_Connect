'use client';

import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { agoraApi, tokenStore } from '@/lib/api';


interface Props {
  sessionId: string;
  open: boolean;
  onClose: () => void;
}

export default function CallFeedbackModal({ sessionId, open, onClose }: Props) {
  const [audioQuality, setAudioQuality] = useState(0);
  const [overallRating, setOverallRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);


  const submit = async () => {
    if (!audioQuality || !overallRating) return;
    setSubmitting(true);
    const token = tokenStore.getAccess();
    if (token) {
      await agoraApi.submitFeedback(token, {
        sessionId,
        audioQuality,
        overallRating,
        issues: [],
        comment: comment.trim() || undefined,
      });
    }
    setDone(true);
    setSubmitting(false);
    setTimeout(onClose, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm bg-[#fffbf0] border-[#f3e8ff] text-[#1e1b4b]">
        {done ? (
          <div className="text-center py-6">
            <p className="text-2xl mb-2">🙏</p>
            <p className="font-semibold">Thanks for your feedback!</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <p className="font-bold text-[15px] mb-2 text-[#4c1d95]">How was the session?</p>
              <StarRow value={overallRating} onChange={setOverallRating} />
            </div>

            <div>
              <p className="font-bold text-[15px] mb-2 text-[#4c1d95]">Audio quality?</p>
              <StarRow value={audioQuality} onChange={setAudioQuality} />
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Any other comments? (optional)"
              rows={3}
              className="w-full text-[15px] rounded-xl border border-[#d8b4fe] bg-white px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent text-[#1e1b4b] placeholder:text-[#9ca3af]"
            />

            <div className="flex gap-3 justify-end mt-2">
              <Button variant="ghost" className="text-[#6D28D9] hover:bg-[#f3e8ff] hover:text-[#5b21b6] font-semibold rounded-xl px-5" onClick={onClose}>Skip</Button>
              <Button
                className="bg-[#6D28D9] hover:bg-[#5b21b6] text-white font-bold rounded-xl px-6 shadow-md shadow-purple-500/20"
                onClick={submit}
                disabled={!audioQuality || !overallRating || submitting}
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function StarRow({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange(star)}
          className={`text-3xl transition-transform hover:scale-110 ${star <= value ? 'text-[#f59e0b]' : 'text-[#e2e8f0] hover:text-[#fcd34d]'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
