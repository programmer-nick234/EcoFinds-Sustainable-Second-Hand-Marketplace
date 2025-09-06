'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard, 
  Shield, 
  Truck, 
  CheckCircle,
  Star,
  Heart,
  Share2,
  ChevronRight
} from 'lucide-react';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'iPhone 13 Pro Max 256GB',
      price: 899,
      originalPrice: 1099,
      quantity: 1,
      image: '/api/placeholder/200/200',
      condition: 'Excellent',
      seller: 'TechDeals Pro',
      rating: 4.8,
      reviews: 124,
      location: 'New York, NY',
      shipping: 'Free',
      estimatedDelivery: '2-3 days'
    },
    {
      id: 2,
      title: 'MacBook Air M2 13-inch',
      price: 1199,
      originalPrice: 1299,
      quantity: 1,
      image: '/api/placeholder/200/200',
      condition: 'Like New',
      seller: 'Apple Reseller',
      rating: 4.9,
      reviews: 89,
      location: 'San Francisco, CA',
      shipping: 'Free',
      estimatedDelivery: '1-2 days'
    }
  ]);

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalSavings = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

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
                <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                <p className="text-sm text-gray-600">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Discover amazing pre-loved items and give them a second life!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Cart Items</h2>
                <span className="text-sm text-gray-600">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</span>
              </div>

              {cartItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 hover:shadow-lg transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div className="relative">
                      <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                        <span className="text-4xl">📱</span>
                      </div>
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        {item.condition}
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            <span className="font-medium">{item.rating}</span>
                            <span className="ml-1">({item.reviews} reviews)</span>
                          </div>
                          <span>•</span>
                          <span>{item.location}</span>
                        </div>
                      </div>

                      {/* Seller Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">
                              {item.seller.charAt(0)}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-700">{item.seller}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Heart className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl font-bold text-green-600">${item.price}</span>
                        <span className="text-lg text-gray-500 line-through">${item.originalPrice}</span>
                        <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded-full font-semibold">
                          Save ${item.originalPrice - item.price}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-700">Quantity:</span>
                          <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-white rounded-lg transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-white rounded-lg transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Shipping Info */}
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Truck className="h-4 w-4" />
                        <span>{item.shipping} shipping</span>
                        <span>•</span>
                        <span>Est. delivery: {item.estimatedDelivery}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-semibold">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span className="font-medium">You Save</span>
                      <span className="font-bold">${totalSavings.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <span className="text-2xl font-bold text-green-600">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full mt-6 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Proceed to Checkout
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </button>

                  {/* Security Features */}
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>Secure checkout with SSL encryption</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Buyer protection guaranteed</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Truck className="h-4 w-4 text-green-500" />
                      <span>Free shipping on all orders</span>
                    </div>
                  </div>

                  {/* Continue Shopping */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Link
                      href="/products"
                      className="block text-center text-green-600 hover:text-green-700 font-medium transition-colors"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
