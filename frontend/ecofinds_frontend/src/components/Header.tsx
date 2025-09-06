'use client';

import Link from 'next/link';
import { Menu, ShoppingCart, User, X, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  cartCount?: number;
  showMenu?: boolean;
  onMenuToggle?: () => void;
}

export default function Header({ cartCount = 0, showMenu = false, onMenuToggle }: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-2xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100/80 transition-all duration-200 focus-ring"
            >
              {showMenu ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
            </button>

            {/* Logo */}
            <Link href="/landing" className="flex items-center group">
              <div className="relative">
                <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/10"></div>
                  <span className="text-white font-black text-3xl relative z-10 drop-shadow-lg">E</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-3xl font-black text-gray-900 group-hover:text-green-600 transition-colors duration-200 leading-tight tracking-tight">
                  EcoFinds
                </h1>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-green-600 font-semibold">Sustainable</span>
                  <span className="text-sm text-gray-500">Marketplace</span>
                  <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link href="/landing" className="px-5 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50/90 rounded-2xl transition-all duration-300 font-semibold text-sm relative group">
                <span className="relative z-10">Home</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-300 group-hover:w-8"></div>
              </Link>
              <Link href="/products" className="px-5 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50/90 rounded-2xl transition-all duration-300 font-semibold text-sm relative group">
                <span className="relative z-10">Products</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-300 group-hover:w-8"></div>
              </Link>
              {isAuthenticated && (
                <Link href="/products/my-products" className="px-5 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50/90 rounded-2xl transition-all duration-300 font-semibold text-sm relative group">
                  <span className="relative z-10">My Products</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-300 group-hover:w-8"></div>
                </Link>
              )}
              <Link href="/products/create" className="px-5 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50/90 rounded-2xl transition-all duration-300 font-semibold text-sm relative group">
                <span className="relative z-10">Sell</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-300 group-hover:w-8"></div>
              </Link>
              <Link href="/about" className="px-5 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50/90 rounded-2xl transition-all duration-300 font-semibold text-sm relative group">
                <span className="relative z-10">About</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-300 group-hover:w-8"></div>
              </Link>
              <Link href="/contact" className="px-5 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50/90 rounded-2xl transition-all duration-300 font-semibold text-sm relative group">
                <span className="relative z-10">Contact</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-300 group-hover:w-8"></div>
              </Link>
            </nav>

            {/* Cart and Profile */}
            <div className="flex items-center space-x-4">
              {isAuthenticated && (
                <Link href="/cart" className="relative p-3 rounded-2xl hover:bg-green-50/80 transition-all duration-300 group">
                  <div className="relative">
                    <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-green-600 transition-colors" />
                    <div className="absolute -inset-1 bg-green-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-bounce">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="hidden sm:block text-right">
                    <span className="text-sm text-gray-800 font-bold block">
                      {user?.first_name || user?.username}
                    </span>
                    <span className="text-xs text-green-600 font-medium">Welcome back</span>
                  </div>
                  <Link href="/profile" className="p-2 rounded-2xl hover:bg-green-50/80 transition-all duration-300 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <User className="h-6 w-6 text-white relative z-10" />
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-3 rounded-2xl hover:bg-red-50 transition-all duration-300 group"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5 text-gray-600 group-hover:text-red-600 transition-colors" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="px-6 py-2.5 text-gray-700 hover:text-green-600 hover:bg-green-50/80 rounded-2xl transition-all duration-300 font-semibold text-sm border border-gray-200 hover:border-green-300"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl transition-all duration-300 font-semibold text-sm hover:-translate-y-0.5 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Register</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {showMenu && (
        <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in">
          <div className="bg-white w-72 h-full p-6 shadow-xl animate-slide-in">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold">E</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">EcoFinds</h2>
              </div>
              <button
                onClick={onMenuToggle}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <nav className="space-y-1">
              <Link 
                href="/landing" 
                className="flex items-center p-4 rounded-xl hover:bg-green-50 hover:text-green-600 transition-all duration-200 font-medium"
                onClick={onMenuToggle}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className="flex items-center p-4 rounded-xl hover:bg-green-50 hover:text-green-600 transition-all duration-200 font-medium"
                onClick={onMenuToggle}
              >
                Products
              </Link>
              <Link 
                href="/products/create" 
                className="flex items-center p-4 rounded-xl hover:bg-green-50 hover:text-green-600 transition-all duration-200 font-medium"
                onClick={onMenuToggle}
              >
                Sell Item
              </Link>
              <Link 
                href="/dashboard" 
                className="flex items-center p-4 rounded-xl hover:bg-green-50 hover:text-green-600 transition-all duration-200 font-medium"
                onClick={onMenuToggle}
              >
                Dashboard
              </Link>
              <Link 
                href="/about" 
                className="flex items-center p-4 rounded-xl hover:bg-green-50 hover:text-green-600 transition-all duration-200 font-medium"
                onClick={onMenuToggle}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="flex items-center p-4 rounded-xl hover:bg-green-50 hover:text-green-600 transition-all duration-200 font-medium"
                onClick={onMenuToggle}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
