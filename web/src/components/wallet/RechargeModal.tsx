'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Wallet, Loader2 } from 'lucide-react';
import { walletApi, tokenStore } from '@/lib/api';

interface RechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PRESET_AMOUNTS = [10, 20, 50, 100];

export function RechargeModal({ isOpen, onClose, onSuccess }: RechargeModalProps) {
  const [amount, setAmount] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRecharge = async (rechargeAmount: number) => {
    if (rechargeAmount < 10) {
      setError('Minimum recharge amount is $10');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const token = tokenStore.getAccess();
      if (!token) throw new Error('Not authenticated');

      const res = await walletApi.rechargeStripe(token, rechargeAmount);
      if (!res.success || !res.data?.url) {
        throw new Error(res.message || 'Failed to initialize Stripe checkout');
      }
      // Redirect to Stripe Hosted Checkout
      window.location.href = res.data.url;
      return; // Execution stops here due to redirect
    } catch (err: unknown) {
      setError((err as Error).message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white border border-yellow-100 font-sans">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-extrabold text-[#1a1a1a]">
            <Wallet className="w-5 h-5 text-[#4f46e5]" /> Recharge Wallet
          </DialogTitle>
          <DialogDescription className="text-purple-500">
            Add funds to your wallet to seamlessly connect with experts.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3 py-4">
          {PRESET_AMOUNTS.map((preset) => (
            <Button
              key={preset}
              variant="outline"
              className={`border-yellow-200 text-[#d97706] bg-yellow-50 hover:bg-yellow-100 hover:text-[#b45309] font-bold ${amount === preset ? 'ring-2 ring-[#4f46e5] border-transparent' : ''}`}
              onClick={() => setAmount(preset)}
            >
              ${preset}
            </Button>
          ))}
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-[#1a1a1a]">Or enter custom amount ($)</label>
          <Input
            type="number"
            min="10"
            placeholder="e.g. 500"
            value={amount}
            onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
            className="border-violet-200 focus:ring-[#4f46e5]/40 focus:border-[#4f46e5]"
          />
          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
        </div>

        <div className="pt-2">
          <Button
            className="w-full bg-[#4f46e5] hover:bg-[#d97706] text-white font-bold h-12 rounded-xl"
            disabled={loading || !amount || amount < 10}
            onClick={() => handleRecharge(amount as number)}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : `Proceed to Pay $${amount || 0}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
