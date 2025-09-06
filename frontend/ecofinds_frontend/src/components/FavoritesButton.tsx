'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';

interface FavoritesButtonProps {
  productId: number;
  isFavorited?: boolean;
  onToggle?: (productId: number, isFavorited: boolean) => void;
}

export default function FavoritesButton({ productId, isFavorited: initialFavorited = false, onToggle }: FavoritesButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);

  const handleToggle = () => {
    const newFavorited = !isFavorited;
    setIsFavorited(newFavorited);
    onToggle?.(productId, newFavorited);
    
    // Show feedback
    if (newFavorited) {
      // Could show a toast notification here
      console.log('Added to favorites');
    } else {
      console.log('Removed from favorites');
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110 ${
        isFavorited
          ? 'bg-red-500 text-white hover:bg-red-600'
          : 'bg-white text-gray-600 hover:bg-gray-50'
      }`}
      title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
    </button>
  );
}
