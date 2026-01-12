import React, { useEffect, useState } from 'react';

function LineChart({ points }) {
  const width = 300;
  const height = 100;
  const xStep = width / (points.length - 1);
  const yMax = Math.max(...points);
  const yMin = Math.min(...points);
  const norm = (v) => ((v - yMin) / (yMax - yMin || 1)) * (height - 10) + 5;
  const pts = points.map((v, i) => `${i * xStep},${height - norm(v)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-40">
      <polyline fill="none" stroke="#6366f1" strokeWidth="3" points={pts} />
      {points.map((v, i) => (
        <circle key={i} cx={i * xStep} cy={height - norm(v)} r="3" fill="#a5b4fc" />
      ))}
    </svg>
  );
}

function PieChart({ values, colors }) {
  const total = values.reduce((a, b) => a + b, 0) || 1;
  let acc = 0;
  const arcs = values.map((v, i) => {
    const start = (acc / total) * 2 * Math.PI;
    acc += v;
    const end = (acc / total) * 2 * Math.PI;
    const r = 45;
    const cx = 50;
    const cy = 50;
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    const largeArc = end - start > Math.PI ? 1 : 0;
    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    return <path key={i} d={d} fill={colors[i]} />;
  });
  return (
    <svg viewBox="0 0 100 100" className="w-32 h-32">
      <circle cx="50" cy="50" r="45" fill="#111827" />
      {arcs}
    </svg>
  );
}

export default function Analytics() {
  const [forecast, setForecast] = useState([140, 165, 170, 200, 180, 210, 230]);
  const [vendorShare, setVendorShare] = useState([40, 35, 25]);
  const [damageShare, setDamageShare] = useState([18, 82]);
  const [inventory, setInventory] = useState({ critical: 12, low: 37, inStock: 324 });

  useEffect(() => {
    // Simulate festival boost like "Big Billion Sale"
    const t = setInterval(() => {
      setForecast((prev) => prev.map((v, i) => v + (i % 2 === 0 ? 5 : -3)));
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 container-3d">
        <div className="lg:col-span-2 p-4 rounded-xl border border-gray-800 bg-gray-900 smooth-hover card-3d">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold text-3d">7-Day Load Forecast</h2>
            <span className="text-xs text-gray-400">Predictive Simulation</span>
          </div>
          <div className="mt-4">
            <LineChart points={forecast} />
          </div>
        </div>
        <div className="p-4 rounded-xl border border-gray-800 bg-gray-900 smooth-hover card-3d">
          <h2 className="text-white font-semibold text-3d">Inventory Health</h2>
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Critical Shortage</span>
              <span className="text-xs px-2 py-1 rounded bg-red-600/20 text-red-400">{inventory.critical} items</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Low Stock</span>
              <span className="text-xs px-2 py-1 rounded bg-amber-500/20 text-amber-300">{inventory.low} items</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">In Stock</span>
              <span className="text-xs px-2 py-1 rounded bg-emerald-500/20 text-emerald-300">{inventory.inStock} items</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 rounded-xl border border-gray-800 bg-gray-900 smooth-hover card-3d">
          <h2 className="text-white font-semibold text-3d">Vendor Share</h2>
          <div className="mt-4 flex items-center gap-6">
            <PieChart values={vendorShare} colors={["#6366f1", "#22c55e", "#f59e0b"]} />
            <div className="text-sm text-gray-300 space-y-1">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-indigo-500"></span> Vendor A: {vendorShare[0]}%</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-emerald-500"></span> Vendor B: {vendorShare[1]}%</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-amber-500"></span> Vendor C: {vendorShare[2]}%</div>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl border border-gray-800 bg-gray-900 smooth-hover card-3d">
          <h2 className="text-white font-semibold text-3d">Damaged vs Normal</h2>
          <div className="mt-4 flex items-center gap-6">
            <PieChart values={damageShare} colors={["#ef4444", "#22c55e"]} />
            <div className="text-sm text-gray-300 space-y-1">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-red-500"></span> Damaged: {damageShare[0]}%</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-emerald-500"></span> Normal: {damageShare[1]}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}