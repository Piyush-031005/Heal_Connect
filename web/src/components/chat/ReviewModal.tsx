'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ReviewModalProps {
  open: boolean;
  practitionerId?: string;
  practitionerName?: string;
  sessionId?: string;
  onClose: () => void;
  onSubmitted?: () => void;
}

export default function ReviewModal({ open, practitionerId, practitionerName, sessionId, onClose, onSubmitted }: ReviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
          <p className="mb-4">Review functionality is coming soon!</p>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
