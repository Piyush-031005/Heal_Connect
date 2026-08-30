import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ZenAuraa Admin Panel',
  description: 'Admin dashboard for ZenAuraa platform management',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
