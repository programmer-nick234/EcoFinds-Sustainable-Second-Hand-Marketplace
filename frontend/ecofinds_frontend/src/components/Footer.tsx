'use client';

import Link from 'next/link';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl">
                <span className="text-white font-black text-2xl">E</span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">EcoFinds</h3>
                <p className="text-green-400 text-sm font-semibold">Sustainable Marketplace</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Join thousands of eco-conscious buyers and sellers in our sustainable marketplace. 
              Give pre-loved items a second life while helping the environment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-green-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-green-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-green-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-green-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/landing" className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Browse Products
                </Link>
              </li>
              <li>
                <Link href="/products/create" className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Sell Items
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products?category=electronics" className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/products?category=fashion" className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/products?category=home-garden" className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Home & Garden
                </Link>
              </li>
              <li>
                <Link href="/products?category=sports" className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Sports
                </Link>
              </li>
              <li>
                <Link href="/products?category=books" className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group">
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Books
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Email</p>
                  <p className="text-white font-medium">support@ecofinds.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Phone</p>
                  <p className="text-white font-medium">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Address</p>
                  <p className="text-white font-medium">123 Green Street<br />Eco City, EC 12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h4 className="text-xl font-bold text-white mb-2">Stay Updated</h4>
              <p className="text-gray-300">Get the latest deals and eco-friendly tips delivered to your inbox.</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full sm:w-64"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold hover:-translate-y-0.5 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400">
              <span>© 2024 EcoFinds. Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for the planet.</span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
