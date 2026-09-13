'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ExpertLoginRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/astrologer/login');
  }, [router]);
  return null;
}
