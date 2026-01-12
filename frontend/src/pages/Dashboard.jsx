import React from 'react';

const StatCard = ({ label, value, trend }) => (
  <div className="p-4 rounded-xl border border-gray-800 bg-gray-900 smooth-hover card-3d">
    <div className="text-sm text-gray-400">{label}</div>
    <div className="mt-1 text-2xl font-semibold text-white text-3d">{value}</div>
    {trend && <div className="mt-1 text-xs text-green-400">{trend}</div>}
  </div>
);

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 relative container-3d">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Shipments" value="142" trend="+5.3% WoW" />
        <StatCard label="Damaged Today" value="3" trend="-1 this hour" />
        <StatCard label="Invoices Generated" value="28" trend="+12%" />
        <StatCard label="Inventory Items" value="3,248" trend="Stable" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-4 rounded-xl border border-gray-800 bg-gray-900 smooth-hover card-3d">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold text-3d">Weekly Load Forecast</h2>
            <span className="text-xs text-gray-400">Simulated</span>
          </div>
          <div className="mt-4 h-48">
            {/* Simple sparkline */}
            <svg viewBox="0 0 300 100" className="w-full h-full">
              <polyline
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                points="0,80 40,65 80,70 120,50 160,60 200,40 240,55 280,35"
              />
              {Array.from({ length: 7 }).map((_, i) => (
                <circle key={i} cx={40 * (i + 1)} cy={[65,70,50,60,40,55,35][i]} r="3" fill="#a5b4fc" />
              ))}
            </svg>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-gray-800 bg-gray-900 smooth-hover card-3d">
          <h2 className="text-white font-semibold text-3d">Inventory Health</h2>
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Critical Shortage</span>
              <span className="text-xs px-2 py-1 rounded bg-red-600/20 text-red-400">12 items</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Low Stock</span>
              <span className="text-xs px-2 py-1 rounded bg-amber-500/20 text-amber-300">37 items</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">In Stock</span>
              <span className="text-xs px-2 py-1 rounded bg-emerald-500/20 text-emerald-300">324 items</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 rounded-xl border border-gray-800 bg-gray-900 smooth-hover card-3d">
          <h2 className="text-white font-semibold text-3d">Vendor Share</h2>
          <div className="mt-4 flex items-center gap-6">
            {/* Pie chart */}
            <svg viewBox="0 0 100 100" className="w-32 h-32">
              <circle cx="50" cy="50" r="45" fill="#111827" />
              <path d="M50 50 L50 5 A45 45 0 0 1 90 64 Z" fill="#6366f1" />
              <path d="M50 50 L90 64 A45 45 0 0 1 25 90 Z" fill="#22c55e" />
              <path d="M50 50 L25 90 A45 45 0 0 1 50 5 Z" fill="#f59e0b" />
            </svg>
            <div className="text-sm text-gray-300 space-y-1">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-indigo-500"></span> Vendor A: 40%</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-emerald-500"></span> Vendor B: 35%</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-amber-500"></span> Vendor C: 25%</div>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl border border-gray-800 bg-gray-900 smooth-hover card-3d">
          <h2 className="text-white font-semibold text-3d">Damaged vs Normal</h2>
          <div className="mt-4 flex items-center gap-6">
            <svg viewBox="0 0 100 100" className="w-32 h-32">
              <circle cx="50" cy="50" r="45" fill="#111827" />
              <path d="M50 50 L50 5 A45 45 0 1 1 49 5 Z" fill="#ef4444" />
              <path d="M50 50 L49 5 A45 45 0 0 0 50 5 Z" fill="#22c55e" />
            </svg>
            <div className="text-sm text-gray-300 space-y-1">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-red-500"></span> Damaged: 18%</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-emerald-500"></span> Normal: 82%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}