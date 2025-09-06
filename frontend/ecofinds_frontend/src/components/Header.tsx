'use client';

import { useState } from 'react';
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
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {showMenu ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
            </button>

            {/* Logo */}
            <Link href="/landing" className="flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">EcoFinds</h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/landing" className="text-gray-700 hover:text-green-600 transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-green-600 transition-colors">
                Products
              </Link>
              <Link href="/products/create" className="text-gray-700 hover:text-green-600 transition-colors">
                Sell
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-green-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-green-600 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Cart and Profile */}
            <div className="flex items-center space-x-2">
              {isAuthenticated && (
                <Link href="/cart" className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <ShoppingCart className="h-6 w-6 text-gray-700" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <span className="hidden sm:block text-sm text-gray-700">
                    Welcome, {user?.first_name || user?.username}
                  </span>
                  <Link href="/profile" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/login"
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
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
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white w-64 h-full p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button
                onClick={onMenuToggle}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="space-y-2">
              <Link 
                href="/landing" 
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={onMenuToggle}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={onMenuToggle}
              >
                Products
              </Link>
              <Link 
                href="/products/create" 
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={onMenuToggle}
              >
                Sell Item
              </Link>
              <Link 
                href="/dashboard" 
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={onMenuToggle}
              >
                Dashboard
              </Link>
              <Link 
                href="/about" 
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={onMenuToggle}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
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
