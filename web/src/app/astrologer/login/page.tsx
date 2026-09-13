'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AstrologerLoginRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/login?role=expert');
  }, [router]);
  return null;
}
