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
      className="relative rounded-3xl p-10 sm:p-16 text-white overflow-hidden shadow-2xl hover:shadow-2xl transition-all duration-700 group"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      {/* Enhanced gradient background with multiple layers */}
      <div className="absolute inset-0 gradient-primary"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20"></div>
      
      {/* Sophisticated decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/8 rounded-full -translate-y-20 translate-x-20 group-hover:scale-125 transition-transform duration-700 blur-sm"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/6 rounded-full translate-y-16 -translate-x-16 group-hover:scale-125 transition-transform duration-700 blur-sm"></div>
      <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/4 rounded-full -translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000 blur-md"></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
        backgroundSize: '20px 20px'
      }}></div>
      
      <div className="relative z-10 text-center animate-fade-in">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-sm font-medium">
          <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
          Sustainable Marketplace
        </div>
        
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-balance leading-tight">
          {title}
        </h2>
        <p className="text-green-100/90 mb-8 sm:mb-10 text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto text-pretty leading-relaxed font-light">
          {subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href={buttonLink}
            className="btn-primary btn-lg group/btn relative overflow-hidden"
          >
            <span className="relative z-10">{buttonText}</span>
            <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          
          <Link 
            href="/about"
            className="btn-ghost btn-lg text-white border-white/20 hover:bg-white/10"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
