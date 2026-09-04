'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, CheckCircle, MessageCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { tokenStore } from '@/lib/api';

export default function ExpertVerificationPendingPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('hc_access');
    if (!token) {
      router.replace('/expert/signup');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('hc_access');
    localStorage.removeItem('hc_refresh');
    localStorage.removeItem('hc_role');
    localStorage.removeItem('hc_practitioner_id');
    localStorage.removeItem('hc_pid');
    localStorage.removeItem('hc_practitioner_name');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center gap-2 mb-2">
            <Image src="/logo.png" alt="ZenAuraa" width={40} height={40} className="rounded-full" />
            <span className="text-xl font-extrabold text-indigo-600">ZenAuraa</span>
          </Link>

          {/* Clock Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
              <Clock className="w-8 h-8 text-amber-600 animate-pulse" />
            </div>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Verification Pending</h1>
            <p className="text-gray-600">Your expert account is awaiting admin verification.</p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-left">
                <p className="font-semibold text-blue-900">Account Created</p>
                <p className="text-blue-700">Your expert profile has been set up successfully.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-left">
                <p className="font-semibold text-amber-900">Waiting for Verification</p>
                <p className="text-amber-700">Our admin team will review and verify your account within 24-48 hours.</p>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="text-center text-sm text-gray-600 bg-gray-50 rounded-lg p-4">
            <p>You&apos;ll receive an email notification once your account is verified. You can then access the full expert dashboard.</p>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full h-11 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>

            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="w-full h-11 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Back to Login
            </Button>
          </div>

          {/* Support */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-3">Need help?</p>
            <Link href="/contact">
              <Button variant="ghost" className="w-full text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
