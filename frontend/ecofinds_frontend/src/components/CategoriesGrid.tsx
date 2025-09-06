'use client';

import Link from 'next/link';

interface Category {
  name: string;
  icon: string;
  count: number;
  link?: string;
}

interface CategoriesGridProps {
  categories?: Category[];
  title?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
}

const defaultCategories: Category[] = [
  { name: 'Electronics', icon: '📱', count: 24, link: '/products?category=electronics' },
  { name: 'Fashion', icon: '👕', count: 18, link: '/products?category=fashion' },
  { name: 'Home & Garden', icon: '🏠', count: 15, link: '/products?category=home-garden' },
  { name: 'Sports', icon: '⚽', count: 12, link: '/products?category=sports' },
  { name: 'Books', icon: '📚', count: 8, link: '/products?category=books' },
  { name: 'Toys', icon: '🧸', count: 6, link: '/products?category=toys' }
];

export default function CategoriesGrid({
  categories = defaultCategories,
  title = "Categories",
  showViewAll = true,
  viewAllLink = "/categories"
}: CategoriesGridProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{title}</h3>
        {showViewAll && (
          <Link href={viewAllLink} className="text-green-600 text-sm font-medium hover:text-green-700">
            View All
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {categories.map((category, index) => (
          <Link
            key={index}
            href={category.link || `/products?category=${category.name.toLowerCase()}`}
            className="bg-white p-3 sm:p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-green-300 group"
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">
                {category.icon}
              </div>
              <h4 className="font-medium text-gray-900 text-sm sm:text-base mb-1">
                {category.name}
              </h4>
              <p className="text-xs sm:text-sm text-gray-500">
                {category.count} items
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
