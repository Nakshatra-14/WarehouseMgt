import React, { useState, useEffect } from 'react';
import backgroundVideo from '../assets/background-video.mp4';

const FeatureCard = ({ icon, title, description, delay = 0 }) => (
  <div 
    className="p-6 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 smooth-hover group card-3d"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="w-12 h-12 rounded-lg bg-indigo-600/20 flex items-center justify-center mb-4 group-hover:bg-indigo-600/30 transition-colors float-3d">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-white mb-2 text-3d">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const StatCard = ({ value, label, icon }) => (
  <div className="text-center p-6 rounded-xl border border-gray-800 bg-gray-900/50 smooth-hover">
    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-600/20 flex items-center justify-center">
      {icon}
    </div>
    <div className="text-4xl font-bold text-white mb-2">{value}</div>
    <div className="text-gray-400 text-sm">{label}</div>
  </div>
);

export default function LandingPage({ onGetStarted }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const warehouseImage = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80';
  const galleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80',
      title: 'Modern Storage Facility',
      description: 'Advanced warehouse with automated storage systems'
    },
    {
      url: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1200&q=80',
      title: 'Distribution Center',
      description: 'Efficient logistics and distribution hub'
    },
    {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      title: 'Automated Warehouse',
      description: 'AI-powered inventory management system'
    },
    {
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
      title: 'Smart Logistics Hub',
      description: 'Integrated supply chain operations'
    }
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance gallery every 3 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 3000);
    return () => clearInterval(id);
  }, [galleryImages.length]);

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-indigo-400">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
        </svg>
      ),
      title: 'Real-Time Dashboard',
      description: 'Monitor your warehouse operations with live data and intuitive visualizations.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-indigo-400">
          <path d="M12 2l9 4-9 4-9-4 9-4zm0 7l9 4-9 4-9-4 9-4zm0 9l9 4-9 4-9-4 9-4z" />
        </svg>
      ),
      title: 'AI Damage Detection',
      description: 'Advanced computer vision technology to automatically detect and classify product damage.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-indigo-400">
          <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 1v5h5" />
        </svg>
      ),
      title: 'Smart Invoicing',
      description: 'Automated invoice generation and management system for seamless operations.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-indigo-400">
          <path d="M5 3h2v18H5V3zm6 6h2v12h-2V9zm6-3h2v15h-2V6z" />
        </svg>
      ),
      title: 'Predictive Analytics',
      description: 'AI-powered insights to forecast demand and optimize inventory management.',
    },
  ];

  const stats = [
    {
      value: '99.9%',
      label: 'Uptime',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-indigo-400">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      ),
    },
    {
      value: '10K+',
      label: 'Items Tracked',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-indigo-400">
          <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
        </svg>
      ),
    },
    {
      value: '24/7',
      label: 'AI Monitoring',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-indigo-400">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
        </svg>
      ),
    },
    {
      value: '50+',
      label: 'Integrations',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-indigo-400">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
  <video
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-full object-cover opacity-70"
  >
    
    <source src={backgroundVideo} type="video/mp4" />
    
    {/* Fallback Image */}
    <img 
      src={warehouseImage} 
      className="w-full h-full object-cover" 
      alt="Warehouse Fallback" 
    />
  </video>

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50">
  </div>
</div>

        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-pink-900/20 animate-pulse"></div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="mb-6 animate-fade-in-up">
            <div className="inline-block px-4 py-2 rounded-full bg-indigo-600/20 border border-indigo-500/50 text-indigo-300 text-sm font-medium mb-6">
              Next-Generation Warehouse Management
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent animate-fade-in-up text-3d" style={{ animationDelay: '100ms' }}>
            Transform Your
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Warehouse Operations
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            AI-powered warehouse management system with real-time monitoring, 
            intelligent damage detection, and predictive analytics.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <button
              onClick={onGetStarted}
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/50 btn-3d text-3d"
            >
              Get Started
            </button>
            <button className="px-8 py-4 rounded-lg border-2 border-gray-700 text-white font-semibold text-lg hover:border-indigo-500 hover:bg-indigo-500/10 transition-all duration-300 btn-3d">
              Watch Demo
            </button>
          </div>

          {/* Floating Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="p-4 rounded-xl bg-gray-900/50 backdrop-blur border border-gray-800 smooth-hover card-3d"
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <div className="text-3xl font-bold text-white mb-1 text-3d">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Warehouse Images Section - Vertical */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-3d">
              Our Warehouse Facilities
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              State-of-the-art infrastructure for efficient operations
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/40 shadow-xl card-3d">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {galleryImages.map((image, index) => (
                <div key={index} className="min-w-full">
                  <div className="relative h-[480px]">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover image-fade-in"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                      <h3 className="text-2xl font-bold text-white mb-2 text-3d">{image.title}</h3>
                      <p className="text-gray-300">{image.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
              <button
                className="pointer-events-auto px-3 py-2 rounded-full bg-black/60 text-white hover:bg-black/80 btn-3d"
                onClick={() => setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
              >
                ‹
              </button>
              <button
                className="pointer-events-auto px-3 py-2 rounded-full bg-black/60 text-white hover:bg-black/80 btn-3d"
                onClick={() => setCurrentSlide((prev) => (prev + 1) % galleryImages.length)}
              >
                ›
              </button>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${currentSlide === i ? 'bg-indigo-500 w-6' : 'bg-gray-500'}`}
                  onClick={() => setCurrentSlide(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-3d">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to manage your warehouse efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-indigo-900/30 via-purple-900/30 to-pink-900/30 container-3d">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-3d">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of warehouses already using our platform
          </p>
          <button
            onClick={onGetStarted}
            className="px-10 py-5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/50 btn-3d text-3d"
          >
            Start Free Trial
          </button>
        </div>
      </section>
    </div>
  );
}
