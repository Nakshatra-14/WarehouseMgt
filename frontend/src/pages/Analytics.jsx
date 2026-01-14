import React, { useEffect, useState } from "react";
import {
  getRecentActivity
} from "../utils/api";

/* ---------------- Charts (same as yours) ---------------- */

function LineChart({ points }) {
  const width = 300;
  const height = 100;
  const xStep = width / (points.length - 1);
  const yMax = Math.max(...points);
  const yMin = Math.min(...points);

  const norm = (v) =>
    ((v - yMin) / (yMax - yMin || 1)) * (height - 10) + 5;

  const pts = points
    .map((v, i) => `${i * xStep},${height - norm(v)}`)
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-40">
      <polyline fill="none" stroke="#6366f1" strokeWidth="3" points={pts} />
      {points.map((v, i) => (
        <circle
          key={i}
          cx={i * xStep}
          cy={height - norm(v)}
          r="3"
          fill="#a5b4fc"
        />
      ))}
    </svg>
  );
}

/* ---------------- Page ---------------- */

export default function Analytics() {
  const [forecast] = useState([140, 165, 170, 200, 180, 210, 230]);
  const [inventory] = useState({ critical: 12, low: 37, inStock: 324 });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 THIS WAS MISSING
  useEffect(() => {
    getRecentActivity()
      .then((data) => {
        console.log("Recent Activity:", data); // DEBUG
        setRecentActivity(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 space-y-6">

      {/* Forecast */}
      <div className="p-4 rounded-xl border border-gray-800 bg-gray-900">
        <h2 className="text-white font-semibold text-xl">
          7‑Day Load Forecast
        </h2>
        <LineChart points={forecast} />
      </div>

      {/* Inventory */}
      <div className="p-4 rounded-xl border border-gray-800 bg-gray-900">
        <h2 className="text-white font-semibold text-xl">
          Inventory Health
        </h2>
        <div className="mt-3 space-y-1 text-sm">
          <p className="text-red-400">Critical: {inventory.critical}</p>
          <p className="text-yellow-400">Low: {inventory.low}</p>
          <p className="text-green-400">In Stock: {inventory.inStock}</p>
        </div>
      </div>

      {/* 🔥 RECENT ACTIVITY */}
      <div className="p-4 rounded-xl border border-gray-800 bg-gray-900">
        <h2 className="text-white font-semibold text-xl">
          Recent Activity
        </h2>

        {loading && (
          <p className="text-gray-400 mt-2">Loading...</p>
        )}

        {!loading && recentActivity.length === 0 && (
          <p className="text-gray-400 mt-2">No recent activity</p>
        )}

        <ul className="mt-3 space-y-3">
          {recentActivity.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center text-sm border-b border-gray-700 pb-2"
            >
              <div>
                <p className="text-gray-200">{item.message}</p>
                <p className="text-xs text-gray-500">
                  {new Date(item.time).toLocaleString()}
                </p>
              </div>

              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  item.status === "APPROVED"
                    ? "bg-green-600/20 text-green-400"
                    : "bg-red-600/20 text-red-400"
                }`}
              >
                {item.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
