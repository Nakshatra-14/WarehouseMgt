import React from 'react';

const NavItem = ({ label, icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ease-in-out btn-3d ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50 text-3d' 
        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
    }`}
  >
    <span className="w-4 h-4 transition-transform duration-300" aria-hidden>
      {icon}
    </span>
    <span className="text-sm font-medium whitespace-nowrap">{label}</span>
  </button>
);

export default function Topbar({ activePage, setActivePage }) {
  const navItems = [
    {
      key: 'landing',
      label: 'Home',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      ),
    },
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
        </svg>
      ),
    },
    {
      key: 'damage',
      label: 'AI Damage Detection',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12 2l9 4-9 4-9-4 9-4zm0 7l9 4-9 4-9-4 9-4zm0 9l9 4-9 4-9-4 9-4z" />
        </svg>
      ),
    },
    {
      key: 'invoice',
      label: 'Smart Invoicing',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 1v5h5" />
        </svg>
      ),
    },
    {
      key: 'analytics',
      label: 'Analytics',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M5 3h2v18H5V3zm6 6h2v12h-2V9zm6-3h2v15h-2V6z" />
        </svg>
      ),
    },
  ];

  return (
    <header className="sticky top-0 z-10 bg-gray-950/70 backdrop-blur border-b border-gray-800 transition-all duration-300" style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), inset 0 -1px 0 rgba(255, 255, 255, 0.1)' }}>
      <div className="px-6 py-3 container-3d">
        <div className="flex items-center justify-between gap-4">
          {/* Logo Text - No Icon */}
          <button 
            onClick={() => setActivePage('landing')}
            className="flex items-center gap-3 flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            <div>
              <div className="text-white font-semibold text-3d">Warehouse</div>
              <div className="text-gray-400 text-xs">Management System</div>
            </div>
          </button>

          {/* Navigation Items */}
          <nav className="flex items-center gap-2 overflow-x-auto flex-1 justify-center px-4">
            {navItems.map((item) => (
              <NavItem
                key={item.key}
                label={item.label}
                icon={item.icon}
                active={activePage === item.key}
                onClick={() => setActivePage(item.key)}
              />
            ))}
          </nav>

          {/* Search and Action Button */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden sm:flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg px-3 py-2">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-400"><path d="M21 21l-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/></svg>
              <input className="bg-transparent text-sm text-gray-300 outline-none placeholder:text-gray-500" placeholder="Search..."/>
            </div>
            <button className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/50 hover:scale-105 btn-3d text-3d">New Action</button>
          </div>
        </div>
      </div>
    </header>
  );
}