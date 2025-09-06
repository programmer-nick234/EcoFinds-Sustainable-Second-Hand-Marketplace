'use client';

import Link from 'next/link';
import { Heart, MessageCircle, MapPin, Star } from 'lucide-react';
import { Product as ApiProduct, getImageUrl } from '@/lib/products';

interface Product extends ApiProduct {
  location?: string;
  rating?: number;
  isFavorited?: boolean;
}

interface ProductCardProps {
  product: Product;
  onFavoriteToggle?: (productId: number, isFavorited: boolean) => void;
  onContactSeller?: (product: Product) => void;
  variant?: 'grid' | 'list';
}

export default function ProductCard({ 
  product, 
  onFavoriteToggle, 
  onContactSeller,
  variant = 'grid'
}: ProductCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavoriteToggle?.(product.id, !product.isFavorited);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onContactSeller?.(product);
  };

  if (variant === 'list') {
    return (
      <Link href={`/products/${product.id}`}>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer">
          <div className="flex">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 flex items-center justify-center flex-shrink-0">
              {product.image ? (
                <img
                  src={getImageUrl(product.image)}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <span className="text-gray-400 text-2xl">📷</span>
              )}
            </div>
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900 text-sm sm:text-base line-clamp-2">
                  {product.title}
                </h4>
                <button
                  onClick={handleFavoriteClick}
                  className={`p-1 rounded-full transition-colors ${
                    product.isFavorited 
                      ? 'text-red-500' 
                      : 'text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${product.isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-green-600">${product.price}</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full capitalize">
                  {product.category}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-3">
                <span className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {product.location || 'New York'}
                </span>
                {product.rating && (
                  <span className="flex items-center">
                    <Star className="h-3 w-3 mr-1 fill-current text-yellow-400" />
                    {product.rating}
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-gray-600">
                  by {product.owner_username || 'Seller'}
                </span>
                <button 
                  onClick={handleContactClick}
                  className="flex items-center px-2 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="h-3 w-3 mr-1" />
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1">
        <div className="aspect-w-16 aspect-h-12 bg-gray-200 relative">
          {product.image ? (
            <img
              src={getImageUrl(product.image)}
              alt={product.title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-4xl">📷</span>
            </div>
          )}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md transition-colors hover:bg-gray-50"
          >
            <Heart className={`h-4 w-4 ${product.isFavorited ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-green-600 transition-colors">
            {product.title}
          </h3>
          
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg sm:text-xl font-bold text-green-600">
              ${product.price}
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full capitalize">
              {product.category}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-3">
            <span className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {product.location || 'New York'}
            </span>
            {product.rating && (
              <span className="flex items-center">
                <Star className="h-3 w-3 mr-1 fill-current text-yellow-400" />
                {product.rating}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm text-gray-600">
              by {product.owner_username || 'Seller'}
            </span>
            <button 
              onClick={handleContactClick}
              className="flex items-center px-2 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="h-3 w-3 mr-1" />
              Contact
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
