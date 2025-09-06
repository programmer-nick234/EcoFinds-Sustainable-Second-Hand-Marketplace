'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Grid3x3, 
  List, 
  Search, 
  Filter,
  Star,
  TrendingUp,
  Clock,
  Users,
  Package,
  Heart,
  Share2,
  ChevronRight
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  productCount: number;
  featured: boolean;
  trending: boolean;
  color: string;
  gradient: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Electronics',
      slug: 'electronics',
      description: 'Smartphones, laptops, gadgets and tech accessories',
      icon: '📱',
      productCount: 1247,
      featured: true,
      trending: true,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: '2',
      name: 'Fashion',
      slug: 'fashion',
      description: 'Clothing, shoes, accessories and style essentials',
      icon: '👕',
      productCount: 892,
      featured: true,
      trending: false,
      color: 'pink',
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      id: '3',
      name: 'Home & Garden',
      slug: 'home-garden',
      description: 'Furniture, decor, tools and outdoor equipment',
      icon: '🏠',
      productCount: 654,
      featured: false,
      trending: true,
      color: 'green',
      gradient: 'from-green-500 to-green-600'
    },
    {
      id: '4',
      name: 'Sports & Fitness',
      slug: 'sports',
      description: 'Exercise equipment, sports gear and fitness accessories',
      icon: '⚽',
      productCount: 423,
      featured: false,
      trending: false,
      color: 'orange',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      id: '5',
      name: 'Books & Media',
      slug: 'books',
      description: 'Books, movies, music and educational materials',
      icon: '📚',
      productCount: 567,
      featured: false,
      trending: false,
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: '6',
      name: 'Toys & Games',
      slug: 'toys',
      description: 'Children\'s toys, board games and entertainment',
      icon: '🧸',
      productCount: 234,
      featured: false,
      trending: false,
      color: 'yellow',
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      id: '7',
      name: 'Beauty & Health',
      slug: 'beauty-health',
      description: 'Cosmetics, skincare, health and wellness products',
      icon: '💄',
      productCount: 345,
      featured: false,
      trending: true,
      color: 'rose',
      gradient: 'from-rose-500 to-rose-600'
    },
    {
      id: '8',
      name: 'Automotive',
      slug: 'automotive',
      description: 'Car parts, accessories and automotive tools',
      icon: '🚗',
      productCount: 189,
      featured: false,
      trending: false,
      color: 'gray',
      gradient: 'from-gray-500 to-gray-600'
    },
    {
      id: '9',
      name: 'Jewelry & Watches',
      slug: 'jewelry-watches',
      description: 'Rings, necklaces, watches and luxury accessories',
      icon: '💍',
      productCount: 156,
      featured: false,
      trending: false,
      color: 'amber',
      gradient: 'from-amber-500 to-amber-600'
    }
  ]);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'count' | 'trending'>('name');
  const [filterBy, setFilterBy] = useState<'all' | 'featured' | 'trending'>('all');

  const filteredCategories = categories
    .filter(category => {
      const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           category.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterBy === 'all' || category[filterBy];
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'count':
          return b.productCount - a.productCount;
        case 'trending':
          return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const featuredCategories = categories.filter(cat => cat.featured);
  const trendingCategories = categories.filter(cat => cat.trending);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30">
      {/* Enhanced Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link 
                href="/landing" 
                className="mr-4 p-2 rounded-xl hover:bg-gray-100/80 transition-all duration-200"
              >
                <ArrowLeft className="h-5 w-5 text-gray-700" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
                <p className="text-sm text-gray-600">Browse products by category</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Grid3x3 className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Categories */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Featured Categories</h2>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-600">Most Popular</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map((category, index) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
                     style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}>
                </div>
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                      {category.icon}
                    </div>
                    <div className="flex items-center space-x-2">
                      {category.trending && (
                        <div className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-semibold flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </div>
                      )}
                      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-1" />
                        <span>{category.productCount} items</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Search and Filters */}
        <section className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value as any)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  <option value="all">All Categories</option>
                  <option value="featured">Featured</option>
                  <option value="trending">Trending</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  <option value="name">Sort by Name</option>
                  <option value="count">Sort by Count</option>
                  <option value="trending">Sort by Trending</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Grid3x3 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Categories */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">All Categories</h2>
            <span className="text-sm text-gray-600">{filteredCategories.length} categories</span>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCategories.map((category, index) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-1" />
                        <span>{category.productCount}</span>
                      </div>
                      {category.trending && (
                        <div className="flex items-center text-orange-500">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          <span>Trending</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCategories.map((category, index) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 hover:shadow-lg transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center space-x-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                          {category.name}
                        </h3>
                        {category.featured && (
                          <div className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-semibold">
                            Featured
                          </div>
                        )}
                        {category.trending && (
                          <div className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-semibold flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        {category.description}
                      </p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Package className="h-4 w-4 mr-1" />
                          <span>{category.productCount} items</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>Active sellers</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterBy('all');
              }}
              className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
