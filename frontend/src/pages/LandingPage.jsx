import React, { useState, useEffect } from 'react';
import backgroundVideo from '../assets/background-video.mp4';

/* ---------- Reusable Cards ---------- */

const FeatureCard = ({ icon, title, description, delay = 0 }) => (
  <div
    className="p-6 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 smooth-hover card-3d"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="w-12 h-12 rounded-lg bg-indigo-600/20 flex items-center justify-center mb-4 float-3d">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-white mb-2 text-3d">
      {title}
    </h3>
    <p className="text-gray-400 text-sm leading-relaxed">
      {description}
    </p>
  </div>
);

const StatCard = ({ value, label }) => (
  <div className="p-4 rounded-xl bg-gray-900/50 backdrop-blur border border-gray-800 smooth-hover card-3d text-center">
    <div className="text-3xl font-bold text-white mb-1 text-3d">
      {value}
    </div>
    <div className="text-gray-400 text-sm">
      {label}
    </div>
  </div>
);

/* ---------- Main Page ---------- */

export default function LandingPage({ onGetStarted }) {
  const warehouseImage =
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80';

  const galleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80',
      title: 'Modern Storage Facility',
      description: 'Advanced warehouse with automated storage systems',
    },
    {
      url: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1200&q=80',
      title: 'Distribution Center',
      description: 'Efficient logistics and distribution hub',
    },
    {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      title: 'Automated Warehouse',
      description: 'AI-powered inventory management system',
    },
    {
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
      title: 'Smart Logistics Hub',
      description: 'Integrated supply chain operations',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 3000);
    return () => clearInterval(id);
  }, [galleryImages.length]);

  const features = [
    {
      title: 'Real-Time Dashboard',
      description:
        'Monitor warehouse operations with live metrics and visual insights.',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-indigo-400" fill="currentColor">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
        </svg>
      ),
    },
    {
      title: 'AI Damage Detection',
      description:
        'Automatically detect and classify damaged goods using AI vision.',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-indigo-400" fill="currentColor">
          <path d="M12 2l9 4-9 4-9-4 9-4zm0 7l9 4-9 4-9-4 9-4zm0 9l9 4-9 4-9-4 9-4z" />
        </svg>
      ),
    },
    {
      title: 'Smart Invoicing',
      description:
        'Automated invoice creation and transaction tracking.',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-indigo-400" fill="currentColor">
          <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
        </svg>
      ),
    },
    {
      title: 'Predictive Analytics',
      description:
        'Forecast demand and optimize inventory using AI insights.',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-indigo-400" fill="currentColor">
          <path d="M5 3h2v18H5V3zm6 6h2v12h-2V9zm6-3h2v15h-2V6z" />
        </svg>
      ),
    },
  ];

  const stats = [
    { value: '99.9%', label: 'Uptime' },
    { value: '10K+', label: 'Items Tracked' },
    { value: '24/7', label: 'AI Monitoring' },
    { value: '50+', label: 'Integrations' },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* ---------- HERO ---------- */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-70"
          >
            <source src={backgroundVideo} type="video/mp4" />
            <img src={warehouseImage} alt="Warehouse" />
          </video>

          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-2 mb-6 rounded-full bg-indigo-600/20 border border-indigo-500/50 text-indigo-300">
            Next-Generation Warehouse Management
          </div>

          <h1
  onClick={(e) => {
    e.currentTarget.classList.remove('animate-text-click');
    void e.currentTarget.offsetWidth;
    e.currentTarget.classList.add('animate-text-click');
  }}
  className="cursor-pointer text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white text-3d select-none"
>
  Transform Your
  <br />
  <span className="text-indigo-400">
    Warehouse Operations
  </span>
</h1>


          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            AI-powered warehouse management with real-time tracking,
            damage detection, and predictive analytics.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
  onClick={(e) => {
    e.currentTarget.classList.remove('btn-click');
    void e.currentTarget.offsetWidth;
    e.currentTarget.classList.add('btn-click');
    onGetStarted();
  }}
  className="px-8 py-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-lg font-semibold btn-3d"
>
  Get Started
</button>

          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- GALLERY ---------- */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-gray-800">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {galleryImages.map((img, i) => (
              <div key={i} className="min-w-full relative h-[480px]">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold">{img.title}</h3>
                  <p className="text-gray-300">{img.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-3d">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-400 mt-4">
            Everything you need to manage your warehouse
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} delay={i * 100} />
          ))}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="py-20 px-6 bg-gradient-to-r from-indigo-900/30 via-purple-900/30 to-pink-900/30 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-3d">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-gray-300 mb-10">
          Join thousands of warehouses using our platform
        </p>
        <button
          onClick={onGetStarted}
          className="px-10 py-5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-lg font-semibold btn-3d"
        >
          Start Free Trial
        </button>
      </section>
    </div>
  );
}
