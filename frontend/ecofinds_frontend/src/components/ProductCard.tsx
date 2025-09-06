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
      <div className="bg-white rounded-3xl transition-all duration-500 group cursor-pointer overflow-hidden border border-gray-100 hover:border-green-200">
        <div className="relative overflow-hidden">
          {product.image ? (
            <img
              src={getImageUrl(product.image)}
              alt={product.title}
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-56 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
              <div className="text-center">
                <span className="text-green-300 text-6xl mb-3 block">📷</span>
                <span className="text-green-400 text-sm font-medium">No image available</span>
              </div>
            </div>
          )}
          
          {/* Subtle overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <button
            onClick={handleFavoriteClick}
            className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-full transition-all duration-300 hover:bg-white hover:scale-110"
          >
            <Heart className={`h-5 w-5 transition-colors ${product.isFavorited ? 'text-red-500 fill-current' : 'text-gray-500 hover:text-red-500'}`} />
          </button>
          
          {/* Status badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs px-4 py-2 rounded-full font-semibold">
              Available
            </span>
          </div>
          
          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-green-600/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-bold text-sm bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30">
              Quick View
            </span>
          </div>
        </div>
        
        <div className="p-6 bg-white">
          <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-green-600 transition-colors duration-300 leading-tight">
            {product.title}
          </h3>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black text-green-600">
                ${product.price}
              </span>
              <span className="text-sm text-gray-400 line-through font-medium">$99</span>
            </div>
            <span className="text-xs text-green-700 bg-green-50 px-4 py-2 rounded-full capitalize font-bold border border-green-200">
              {product.category}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm mb-6">
            <span className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2 text-green-500" />
              <span className="font-semibold">{product.location || 'New York'}</span>
            </span>
            {product.rating && (
              <span className="flex items-center bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200">
                <Star className="h-4 w-4 mr-1 fill-current text-yellow-500" />
                <span className="font-bold text-yellow-700">{product.rating}</span>
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">
                  {(product.owner_username || 'Seller').charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-800 font-bold block">
                  {product.owner_username || 'Seller'}
                </span>
                <span className="text-xs text-green-600 font-medium">✓ Verified Seller</span>
              </div>
            </div>
            <button 
              onClick={handleContactClick}
              className="px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl transition-all duration-300 font-semibold text-sm hover:-translate-y-0.5 flex items-center gap-2"
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
