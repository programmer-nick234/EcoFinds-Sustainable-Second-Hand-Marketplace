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
    { href: '/products/create', icon: Plus, label: 'Sell' },
    { href: '/favorites', icon: Heart, label: 'Favorites' },
    { href: '/messages', icon: MessageCircle, label: 'Messages' }
  ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40 ${className}`}>
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center p-2 transition-colors ${
                isActive 
                  ? 'text-green-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-xs mt-1 hidden sm:block">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
