'use client';

import Link from 'next/link';

interface BannerProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: string;
}

export default function Banner({
  title = "Welcome to EcoFinds!",
  subtitle = "Find amazing deals on pre-loved items",
  buttonText = "Browse Products",
  buttonLink = "/products",
  backgroundImage
}: BannerProps) {
  return (
    <div 
      className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 sm:p-8 text-white relative overflow-hidden"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      <div className="relative z-10 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">
          {title}
        </h2>
        <p className="text-green-100 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg">
          {subtitle}
        </p>
        <Link 
          href={buttonLink}
          className="inline-block bg-white text-green-600 px-6 py-2 sm:px-8 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
