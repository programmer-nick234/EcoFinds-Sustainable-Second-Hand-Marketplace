'use client';

import ProductCard from './ProductCard';
import { Product as ApiProduct } from '@/lib/products';

interface Product extends ApiProduct {
  location?: string;
  rating?: number;
  isFavorited?: boolean;
}

interface ProductGridProps {
  products: Product[];
  title?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
  onFavoriteToggle?: (productId: number, isFavorited: boolean) => void;
  onContactSeller?: (product: Product) => void;
  variant?: 'grid' | 'list';
  loading?: boolean;
}

export default function ProductGrid({
  products,
  title = "Featured Items",
  showViewAll = true,
  viewAllLink = "/products",
  onFavoriteToggle,
  onContactSeller,
  variant = 'grid',
  loading = false
}: ProductGridProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{title}</h3>
          {showViewAll && (
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          )}
        </div>
        
        <div className={`grid gap-4 ${
          variant === 'list' 
            ? 'grid-cols-1' 
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }`}>
          {Array.from({ length: variant === 'list' ? 3 : 8 }).map((_, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{title}</h3>
          {showViewAll && (
            <a href={viewAllLink} className="text-green-600 text-sm font-medium hover:text-green-700">
              View All
            </a>
          )}
        </div>
        
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">No products found</h4>
          <p className="text-gray-600">Be the first to list an item!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{title}</h3>
        {showViewAll && (
          <a href={viewAllLink} className="text-green-600 text-sm font-medium hover:text-green-700">
            View All
          </a>
        )}
      </div>
      
      <div className={`grid gap-4 ${
        variant === 'list' 
          ? 'grid-cols-1' 
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onFavoriteToggle={onFavoriteToggle}
            onContactSeller={onContactSeller}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
}
