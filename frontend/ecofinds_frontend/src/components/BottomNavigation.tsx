'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Plus, Heart, MessageCircle } from 'lucide-react';

interface BottomNavigationProps {
  className?: string;
}

export default function BottomNavigation({ className = '' }: BottomNavigationProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/landing', icon: Home, label: 'Home' },
    { href: '/products', icon: ShoppingBag, label: 'Products' },
    { href: '/products/my-products', icon: Heart, label: 'My Items' },
    { href: '/products/create', icon: Plus, label: 'Sell' },
    { href: '/messages', icon: MessageCircle, label: 'Messages' }
  ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/50 px-4 py-3 z-40 shadow-lg ${className}`}>
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className={`h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
              <span className="text-xs mt-1 hidden sm:block font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
