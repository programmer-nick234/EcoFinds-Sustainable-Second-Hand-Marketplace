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
        // Ensure data is an array and add default location and rating to products
        const productsArray = Array.isArray(data) ? data : ((data as { results?: any[] }).results || []);
        const productsWithDefaults: Product[] = productsArray.slice(0, 8).map((product: any) => ({
          ...product,
          location: 'New York',
          rating: 4.5,
          isFavorited: false
        }));
        setProducts(productsWithDefaults);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load products';
        setError(errorMessage);
        console.error('Error fetching products:', err);
        setProducts([]); // Set empty array on error
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header 
        cartCount={1}
        showMenu={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
      />

      {/* Main Content */}
      <main className="pb-28">
        <ResponsiveContainer>
          <div className="space-y-12 sm:space-y-16">
            {/* Hero Section with Search */}
            <section className="pt-8 sm:pt-12">
              <div className="text-center mb-8 sm:mb-12 animate-fade-in">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  Discover Amazing
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500"> Pre-Loved Items</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of eco-conscious buyers and sellers in our sustainable marketplace
                </p>
              </div>
              
              {/* Search and Filters Section */}
              <div className="card-elevated p-8 sm:p-10 animate-slide-in-up">
                <SearchAndFilters
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  onFilterClick={handleFilterClick}
                  onSortClick={handleSortClick}
                  onGroupByClick={handleGroupByClick}
                  showFilters={showFilters}
                />
              </div>
            </section>

            {/* Banner Section */}
            <section className="animate-fade-in">
              <Banner
                title="Welcome to EcoFinds!"
                subtitle="Find amazing deals on pre-loved items and give them a second life"
                buttonText="Browse Products"
                buttonLink="/products"
              />
            </section>

            {/* Categories Section */}
            <section className="animate-slide-in-up">
              <div className="card-elevated p-8 sm:p-10">
                <CategoriesGrid />
              </div>
            </section>

            {/* Featured Products Section */}
            <section className="animate-fade-in">
              <div className="card-elevated p-8 sm:p-10">
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
            </section>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl shadow-sm animate-fade-in">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {/* Search Results Message */}
            {searchTerm && (
              <div className="bg-blue-50 border border-blue-200 text-blue-600 px-6 py-4 rounded-xl shadow-sm animate-fade-in">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                  Search results for: "{searchTerm}" - {products.length} items found
                </div>
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