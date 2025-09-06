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
      className="relative rounded-3xl p-12 sm:p-20 text-white overflow-hidden transition-all duration-700 group"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      {/* Enhanced gradient background with multiple layers */}
      <div className="absolute inset-0 gradient-primary"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30"></div>
      
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-24 translate-x-24 group-hover:scale-125 transition-transform duration-700 blur-sm"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/8 rounded-full translate-y-20 -translate-x-20 group-hover:scale-125 transition-transform duration-700 blur-sm"></div>
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/6 rounded-full -translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000 blur-md"></div>
      <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-500 blur-sm"></div>
      
      {/* Animated pattern overlay */}
      <div className="absolute inset-0 opacity-15" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)`,
        backgroundSize: '24px 24px'
      }}></div>
      
      <div className="relative z-10 text-center animate-fade-in">
        <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md rounded-full px-6 py-3 mb-8 text-sm font-semibold border border-white/20">
          <span className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></span>
          🌱 Sustainable Marketplace
        </div>
        
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 sm:mb-10 text-balance leading-tight">
          {title}
        </h2>
        <p className="text-green-100/95 mb-10 sm:mb-12 text-xl sm:text-2xl lg:text-3xl max-w-4xl mx-auto text-pretty leading-relaxed font-light">
          {subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            href={buttonLink}
            className="px-8 py-4 bg-white text-green-600 rounded-2xl transition-all duration-300 font-bold text-lg hover:-translate-y-1 relative overflow-hidden group/btn"
          >
            <span className="relative z-10 flex items-center gap-2">
              {buttonText}
              <svg className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-green-100 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          </Link>
          
          <Link 
            href="/about"
            className="px-8 py-4 text-white border-2 border-white/30 rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 font-semibold text-lg backdrop-blur-sm"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
