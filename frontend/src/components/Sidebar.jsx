import React from 'react';

const NavItem = ({ label, icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full px-4 py-2 rounded-xl transition-all duration-300 ease-in-out ${
      active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50' : 'text-gray-300 hover:bg-gray-800 hover:translate-x-1'
    }`}
  >
    <span className="w-5 h-5 transition-transform duration-300" aria-hidden>
      {icon}
    </span>
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export default function Sidebar({ activePage, setActivePage }) {
  const items = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
        </svg>
      ),
    },
    {
      key: 'damage',
      label: 'AI Damage Detection',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2l9 4-9 4-9-4 9-4zm0 7l9 4-9 4-9-4 9-4zm0 9l9 4-9 4-9-4 9-4z" />
        </svg>
      ),
    },
    {
      key: 'invoice',
      label: 'Smart Invoicing',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 1v5h5" />
        </svg>
      ),
    },
    {
      key: 'analytics',
      label: 'Analytics',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M5 3h2v18H5V3zm6 6h2v12h-2V9zm6-3h2v15h-2V6z" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="h-screen w-64 bg-gray-900 border-r border-gray-800 p-4 flex flex-col gap-3 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(20px)'
        }}></div>
      </div>
      
      <div className="flex items-center gap-3 px-2 py-2 relative z-10">
        <div className="w-8 h-8 grid place-items-center rounded-lg bg-indigo-600 text-white font-bold shadow-lg transition-transform duration-300 hover:scale-110">W</div>
        <div>
          <div className="text-white font-semibold">Warehouse</div>
          <div className="text-gray-400 text-xs">Management System</div>
        </div>
      </div>
      <nav className="mt-2 flex-1 flex flex-col gap-2 relative z-10">
        {items.map((item) => (
          <NavItem
            key={item.key}
            label={item.label}
            icon={item.icon}
            active={activePage === item.key}
            onClick={() => setActivePage(item.key)}
          />
        ))}
      </nav>
      <div className="text-xs text-gray-500 px-2 relative z-10">v1.0 UI</div>
    </aside>
  );
}