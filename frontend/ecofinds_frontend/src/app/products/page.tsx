'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { productsService, Product, Category } from '@/lib/products';
import Link from 'next/link';
import { ShoppingBag, User, LogOut, Plus, Search, Filter, X, Settings, MapPin, Heart, MessageCircle, Car, Smartphone, Home, Briefcase, Shirt, Book, Gamepad2, Wrench } from 'lucide-react';
import ProductSkeleton from '@/components/ProductSkeleton';
import MessagingModal from '@/components/MessagingModal';
import FavoritesButton from '@/components/FavoritesButton';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [messagingModal, setMessagingModal] = useState<{
    isOpen: boolean;
    sellerName: string;
    productTitle: string;
    productPrice: string;
  }>({
    isOpen: false,
    sellerName: '',
    productTitle: '',
    productPrice: '',
  });
  const { user, logout, isAuthenticated } = useAuth();

  // OLX-style categories with icons
  const olxCategories = [
    { value: 'cars', label: 'Cars', icon: Car, color: 'text-blue-600' },
    { value: 'electronics', label: 'Electronics', icon: Smartphone, color: 'text-purple-600' },
    { value: 'real-estate', label: 'Real Estate', icon: Home, color: 'text-green-600' },
    { value: 'jobs', label: 'Jobs', icon: Briefcase, color: 'text-orange-600' },
    { value: 'clothing', label: 'Fashion', icon: Shirt, color: 'text-pink-600' },
    { value: 'books', label: 'Books', icon: Book, color: 'text-indigo-600' },
    { value: 'toys', label: 'Toys & Games', icon: Gamepad2, color: 'text-yellow-600' },
    { value: 'automotive', label: 'Auto Parts', icon: Wrench, color: 'text-gray-600' },
  ];

  const locations = [
    'All Locations',
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
    'Dallas',
    'San Jose'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching products and categories...');
        const [productsData, categoriesData] = await Promise.all([
          productsService.getProducts(),
          productsService.getCategories()
        ]);
        console.log('Products data:', productsData);
        console.log('Categories data:', categoriesData);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
      } catch (err: any) {
        setError('Failed to load products');
        console.error('Error fetching data:', err);
        console.error('Error details:', err.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and search products
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'price-high':
          return parseFloat(b.price) - parseFloat(a.price);
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortBy]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleContactSeller = (product: Product) => {
    if (!isAuthenticated) {
      // Redirect to login
      return;
    }
    setMessagingModal({
      isOpen: true,
      sellerName: product.owner_username,
      productTitle: product.title,
      productPrice: product.price,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <ShoppingBag className="h-8 w-8 text-green-600 mr-2" />
                <h1 className="text-2xl font-bold text-gray-900">EcoFinds</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-6">
              <div className="h-8 w-64 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Search and Filter Bar Skeleton */}
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Products Grid Skeleton */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
        </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* OLX-style Header */}
      <header className="bg-white shadow-sm border-b animate-slide-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">EcoFinds</h1>
                  <p className="text-xs text-gray-500">Classifieds Marketplace</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center text-sm text-gray-700">
                    <User className="h-4 w-4 mr-1" />
                    Welcome, {user?.first_name || user?.username}
                  </div>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    Dashboard
                  </Link>
                  <Link
                    href="/products/create"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Post Ad
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex space-x-2">
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900">EcoFinds - Classifieds Marketplace</h2>
            <p className="mt-2 text-gray-600">Buy and sell anything, anywhere • {filteredProducts.length} ads available</p>
          </div>

          {/* OLX-style Category Navigation */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Browse Categories</h3>
              <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                View All Categories
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {olxCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                      selectedCategory === category.value
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className={`h-8 w-8 mb-2 ${category.color}`} />
                    <span className="text-sm font-medium text-gray-700 text-center">
                      {category.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* OLX-style Search and Filter Bar */}
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-6 animate-fade-in">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Location Selector */}
              <div className="lg:w-48">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none bg-white"
                  >
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium">
                Search
              </button>

              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </button>
            </div>

            {/* OLX-style Advanced Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Min"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="number"
                        placeholder="Max"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>

                  {/* Condition Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Condition
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                      <option value="">All Conditions</option>
                      <option value="new">New</option>
                      <option value="used">Used</option>
                      <option value="refurbished">Refurbished</option>
                    </select>
                  </div>

                  {/* Sort Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="most-viewed">Most Viewed</option>
                    </select>
                  </div>
                </div>

                {/* Clear Filters */}
                {(searchTerm || selectedCategory || selectedLocation || sortBy !== 'newest') && (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('');
                        setSelectedLocation('');
                        setSortBy('newest');
                      }}
                      className="text-sm text-gray-600 hover:text-gray-800 underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
              {error}
            </div>
          )}

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              {(searchTerm || selectedCategory) && ` (filtered from ${products.length} total)`}
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {products.length === 0 ? 'No products available' : 'No products match your search'}
              </h3>
              <p className="text-gray-600">
                {products.length === 0 ? 'Be the first to list an item!' : 'Try adjusting your search or filters'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover-lift animate-fade-in">
                  <Link href={`/products/${product.id}`}>
                    <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                          <ShoppingBag className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                      {/* OLX-style favorite button */}
                      <div className="absolute top-2 right-2">
                        <FavoritesButton 
                          productId={product.id}
                          onToggle={(productId, isFavorited) => {
                            // Handle favorites toggle
                            console.log(`Product ${productId} ${isFavorited ? 'favorited' : 'unfavorited'}`);
                          }}
                        />
                      </div>
                    </div>
                  </Link>
                  
                  <div className="p-4">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-green-600 transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-green-600">
                        ${product.price}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full capitalize">
                        {product.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {selectedLocation || 'New York'}
                      </span>
                      <span>{new Date(product.created_at).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        by {product.owner_username}
                      </span>
                      <button 
                        onClick={() => handleContactSeller(product)}
                        className="flex items-center px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                      >
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Messaging Modal */}
      <MessagingModal
        isOpen={messagingModal.isOpen}
        onClose={() => setMessagingModal({ ...messagingModal, isOpen: false })}
        sellerName={messagingModal.sellerName}
        productTitle={messagingModal.productTitle}
        productPrice={messagingModal.productPrice}
      />
    </div>
  );
}
