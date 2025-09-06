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
      <div className="card card-interactive group cursor-pointer">
        <div className="relative overflow-hidden rounded-t-2xl">
          {product.image ? (
            <img
              src={getImageUrl(product.image)}
              alt={product.title}
              className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-52 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
              <div className="text-center">
                <span className="text-gray-300 text-5xl mb-2 block">📷</span>
                <span className="text-gray-400 text-sm">No image</span>
              </div>
            </div>
          )}
          
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <button
            onClick={handleFavoriteClick}
            className="absolute top-4 right-4 p-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg transition-all duration-200 hover:bg-white hover:scale-110 hover:shadow-xl"
          >
            <Heart className={`h-4 w-4 transition-colors ${product.isFavorited ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-500'}`} />
          </button>
          
          {/* Status badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg backdrop-blur-sm">
              Available
            </span>
          </div>
          
          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-semibold text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              Quick View
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-green-600 transition-colors duration-200 leading-tight">
            {product.title}
          </h3>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-green-600">
                ${product.price}
              </span>
              <span className="text-xs text-gray-500 line-through">$99</span>
            </div>
            <span className="text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full capitalize font-semibold">
              {product.category}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500 mb-5">
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              <span className="font-medium">{product.location || 'New York'}</span>
            </span>
            {product.rating && (
              <span className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                <Star className="h-4 w-4 mr-1 fill-current text-yellow-400" />
                <span className="font-semibold text-yellow-700">{product.rating}</span>
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mr-3 shadow-sm">
                <span className="text-white text-sm font-bold">
                  {(product.owner_username || 'Seller').charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-600 font-semibold block">
                  {product.owner_username || 'Seller'}
                </span>
                <span className="text-xs text-gray-400">Verified Seller</span>
              </div>
            </div>
            <button 
              onClick={handleContactClick}
              className="btn-primary btn-sm"
            >
              <MessageCircle className="h-4 w-4" />
              Contact
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
