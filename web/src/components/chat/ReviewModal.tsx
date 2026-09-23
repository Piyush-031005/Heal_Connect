'use client';

import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Star } from 'lucide-react';
import { sessionsApi, tokenStore } from '@/lib/api';
import { toast } from 'sonner';

interface ReviewModalProps {
  open: boolean;
  practitionerId?: string;
  practitionerName?: string;
  sessionId?: string;
  onClose: () => void;
  onSubmitted?: () => void;
}

export default function ReviewModal({ open, practitionerId, practitionerName, sessionId, onClose, onSubmitted }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    if (!sessionId) {
      toast.error('Session ID not found');
      return;
    }

    const token = tokenStore.getAccess();
    if (!token) return;

    setIsSubmitting(true);
    try {
      const res = await sessionsApi.submitReview(token, sessionId, rating, comment);
      if (res.success) {
        toast.success('Review submitted successfully!');
        if (onSubmitted) onSubmitted();
        onClose();
      } else {
        toast.error(res.message || 'Failed to submit review');
      }
    } catch (err) {
      toast.error('An error occurred while submitting review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="p-4 text-center">
          <h2 className="text-2xl font-bold mb-2">Leave a Review</h2>
          {practitionerName && (
            <p className="text-muted-foreground mb-6">
              How was your session with {practitionerName}?
            </p>
          )}

          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={`w-10 h-10 ${
                    star <= (hoverRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="mb-6">
            <textarea
              className="w-full min-h-[100px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none bg-background text-foreground"
              placeholder="Share your experience (optional)..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 border rounded-lg hover:bg-accent disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || rating === 0}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
