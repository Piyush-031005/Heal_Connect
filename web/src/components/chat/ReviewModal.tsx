'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ReviewModalProps {
  open: boolean;
  practitionerId?: string;
  onClose: () => void;
}

export default function ReviewModal({ open, practitionerId, onClose }: ReviewModalProps) {
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
