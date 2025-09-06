'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/auth';
import ProductForm from '@/components/ProductForm';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function CreateProductPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleSuccess = () => {
    router.push('/my-products');
  };

  const handleClose = () => {
    router.push('/my-products');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <ProductForm
          isOpen={true}
          onClose={handleClose}
          onSuccess={handleSuccess}
        />
      </div>
    </ProtectedRoute>
  );
}