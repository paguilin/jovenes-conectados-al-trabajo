'use client';

import SessionWrapper from '../components/SessionWrapper';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <SessionWrapper>{children}</SessionWrapper>;
}