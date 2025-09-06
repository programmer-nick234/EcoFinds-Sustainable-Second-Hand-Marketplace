'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/auth';
import MyProductsDashboard from '@/components/MyProductsDashboard';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function MyProductsPage() {
  const router = useRouter();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  return (
    <ProtectedRoute>
      <MyProductsDashboard />
    </ProtectedRoute>
  );
}
