'use client';

import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Props {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function EndSessionConfirmDialog({ open, onConfirm, onCancel }: Props) {
  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onCancel(); }}>
      <DialogContent showCloseButton={false} className="max-w-md bg-[#faf9f6] text-[#1a1a1a] border-border shadow-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold text-[#1a1a1a]">End this session?</DialogTitle>
          <DialogDescription className="text-muted-foreground font-medium text-base mt-2">
            The session will be marked as completed and billing will stop. This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-transparent border-0 p-0 mt-6 flex sm:flex-row gap-3 w-full">
          <Button className="flex-1 py-6 bg-accent hover:bg-accent/90 text-primary-foreground font-bold text-lg rounded-xl shadow-md transition-all hover:-translate-y-0.5" onClick={onCancel}>
            Keep going
          </Button>
          <Button variant="destructive" className="flex-1 py-6 font-bold text-lg rounded-xl shadow-sm transition-colors" onClick={onConfirm}>
            Yes, end session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
