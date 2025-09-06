'use client';

import { useState, useEffect } from 'react';
import { productsService, Product as ApiProduct } from '@/lib/products';

interface Product extends ApiProduct {
  location?: string;
  rating?: number;
  isFavorited?: boolean;
}
import Header from '@/components/Header';
import SearchAndFilters from '@/components/SearchAndFilters';
import Banner from '@/components/Banner';
import CategoriesGrid from '@/components/CategoriesGrid';
import ProductGrid from '@/components/ProductGrid';
import BottomNavigation from '@/components/BottomNavigation';
import ResponsiveContainer from '@/components/ResponsiveContainer';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsService.getProducts();
        // Add default location and rating to products
        const productsWithDefaults: Product[] = data.slice(0, 8).map(product => ({
          ...product,
          location: 'New York',
          rating: 4.5,
          isFavorited: false
        }));
        setProducts(productsWithDefaults);
      } catch (err: any) {
        setError('Failed to load products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFavoriteToggle = (productId: number, isFavorited: boolean) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, isFavorited }
        : product
    ));
  };

  const handleContactSeller = (product: Product) => {
    // TODO: Implement messaging system
    alert(`Contact seller for: ${product.title}`);
  };

  const handleFilterClick = () => {
    setShowFilters(!showFilters);
  };

  const handleSortClick = () => {
    // TODO: Implement sorting
    alert('Sorting functionality coming soon!');
  };

  const handleGroupByClick = () => {
    // TODO: Implement grouping
    alert('Grouping functionality coming soon!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        cartCount={1}
        showMenu={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
      />

      {/* Main Content */}
      <main className="pb-20">
        <ResponsiveContainer>
          <div className="space-y-6 sm:space-y-8">
            {/* Search and Filters Section */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
              <SearchAndFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onFilterClick={handleFilterClick}
                onSortClick={handleSortClick}
                onGroupByClick={handleGroupByClick}
                showFilters={showFilters}
              />
            </div>

            {/* Banner Section */}
            <Banner
              title="Welcome to EcoFinds!"
              subtitle="Find amazing deals on pre-loved items and give them a second life"
              buttonText="Browse Products"
              buttonLink="/products"
            />

            {/* Categories Section */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
              <CategoriesGrid />
            </div>

            {/* Featured Products Section */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
              <ProductGrid
                products={products}
                title="Featured Items"
                showViewAll={true}
                viewAllLink="/products"
                onFavoriteToggle={handleFavoriteToggle}
                onContactSeller={handleContactSeller}
                loading={loading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Search Results Message */}
            {searchTerm && (
              <div className="bg-blue-50 border border-blue-200 text-blue-600 px-4 py-3 rounded-xl">
                Search results for: "{searchTerm}" - {products.length} items found
              </div>
            )}
          </div>
        </ResponsiveContainer>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}