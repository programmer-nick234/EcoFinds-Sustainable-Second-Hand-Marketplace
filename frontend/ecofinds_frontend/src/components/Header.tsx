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
      <header className="bg-white/98 backdrop-blur-xl shadow-sm border-b border-gray-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100/80 transition-all duration-200 focus-ring"
            >
              {showMenu ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
            </button>

            {/* Logo */}
            <Link href="/landing" className="flex items-center group">
              <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="text-white font-bold text-2xl relative z-10">E</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200 leading-tight">EcoFinds</h1>
                <span className="text-xs text-gray-500 font-medium">Sustainable Marketplace</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              <Link href="/landing" className="px-4 py-2.5 text-gray-700 hover:text-green-600 hover:bg-green-50/80 rounded-xl transition-all duration-200 font-semibold text-sm relative group">
                Home
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-6"></div>
              </Link>
              <Link href="/products" className="px-4 py-2.5 text-gray-700 hover:text-green-600 hover:bg-green-50/80 rounded-xl transition-all duration-200 font-semibold text-sm relative group">
                Products
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-6"></div>
              </Link>
              {isAuthenticated && (
                <Link href="/products/my-products" className="px-4 py-2.5 text-gray-700 hover:text-green-600 hover:bg-green-50/80 rounded-xl transition-all duration-200 font-semibold text-sm relative group">
                  My Products
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-6"></div>
                </Link>
              )}
              <Link href="/products/create" className="px-4 py-2.5 text-gray-700 hover:text-green-600 hover:bg-green-50/80 rounded-xl transition-all duration-200 font-semibold text-sm relative group">
                Sell
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-6"></div>
              </Link>
              <Link href="/about" className="px-4 py-2.5 text-gray-700 hover:text-green-600 hover:bg-green-50/80 rounded-xl transition-all duration-200 font-semibold text-sm relative group">
                About
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-6"></div>
              </Link>
              <Link href="/contact" className="px-4 py-2.5 text-gray-700 hover:text-green-600 hover:bg-green-50/80 rounded-xl transition-all duration-200 font-semibold text-sm relative group">
                Contact
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-6"></div>
              </Link>
            </nav>

            {/* Cart and Profile */}
            <div className="flex items-center space-x-4">
              {isAuthenticated && (
                <Link href="/cart" className="relative p-3 rounded-xl hover:bg-gray-100/80 transition-all duration-200 group">
                  <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-green-600 transition-colors" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="hidden sm:block text-right">
                    <span className="text-sm text-gray-700 font-semibold block">
                      {user?.first_name || user?.username}
                    </span>
                    <span className="text-xs text-gray-500">Welcome back</span>
                  </div>
                  <Link href="/profile" className="p-2 rounded-xl hover:bg-gray-100/80 transition-all duration-200 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-3 rounded-xl hover:bg-red-50 transition-all duration-200 group"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5 text-gray-600 group-hover:text-red-600 transition-colors" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="btn-ghost btn-sm"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="btn-primary btn-sm"
                  >
                    Register
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
