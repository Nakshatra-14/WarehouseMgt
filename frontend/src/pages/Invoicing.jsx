import React, { useEffect, useMemo, useState } from 'react';

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const vendors = ['Vendor A', 'Vendor B', 'Vendor C', 'Vendor D'];

function generateInvoice() {
  const vendor = vendors[random(0, vendors.length - 1)];
  const po = `PO-${random(10000, 99999)}`;
  const weight = `${random(1, 25)} kg`;
  const tracking = `TRK-${random(1000000, 9999999)}`;
  return { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, vendor, po, weight, tracking, date: new Date().toISOString().slice(0, 10) };
}

function invoiceHTML(inv) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Invoice ${inv.po}</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100 p-8">
  <div class="max-w-xl mx-auto bg-white shadow rounded p-6">
    <h1 class="text-2xl font-bold">Commercial Invoice</h1>
    <div class="mt-4 space-y-2 text-sm">
      <div><span class="font-semibold">Vendor:</span> ${inv.vendor}</div>
      <div><span class="font-semibold">PO Number:</span> ${inv.po}</div>
      <div><span class="font-semibold">Weight:</span> ${inv.weight}</div>
      <div><span class="font-semibold">Tracking ID:</span> ${inv.tracking}</div>
      <div><span class="font-semibold">Date:</span> ${inv.date}</div>
    </div>
  </div>
</body>
</html>`;
}

export default function Invoicing() {
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('wm_invoices');
    return saved ? JSON.parse(saved) : [];
  });
  const [query, setQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('wm_invoices', JSON.stringify(invoices));
  }, [invoices]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return invoices.filter((i) =>
      i.vendor.toLowerCase().includes(q) ||
      i.po.toLowerCase().includes(q) ||
      i.tracking.toLowerCase().includes(q)
    );
  }, [invoices, query]);

  const addAuto = () => setInvoices((prev) => [generateInvoice(), ...prev]);
  const deleteInv = (id) => setInvoices((prev) => prev.filter((i) => i.id !== id));
  const downloadHTML = (inv) => {
    const blob = new Blob([invoiceHTML(inv)], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${inv.po}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="p-4 rounded-xl border border-gray-800 bg-gray-900 smooth-hover card-3d container-3d">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-semibold text-3d">Smart Invoicing</h2>
          <button onClick={addAuto} className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-500">Auto-Generate Invoice</button>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by Vendor, PO, or Tracking"
            className="flex-1 px-3 py-2 rounded-lg bg-gray-950 border border-gray-800 text-gray-300 placeholder:text-gray-500 outline-none"
          />
        </div>
      </div>

      <div className="p-4 rounded-xl border border-gray-800 bg-gray-900 smooth-hover card-3d">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400">
              <th className="text-left py-2">Vendor</th>
              <th className="text-left py-2">PO</th>
              <th className="text-left py-2">Weight</th>
              <th className="text-left py-2">Tracking</th>
              <th className="text-left py-2">Date</th>
              <th className="text-right py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-8">No invoices yet. Click Auto-Generate to create one.</td>
              </tr>
            )}
            {filtered.map((inv) => (
              <tr key={inv.id} className="border-t border-gray-800">
                <td className="py-2 text-gray-200">{inv.vendor}</td>
                <td className="py-2 text-gray-200">{inv.po}</td>
                <td className="py-2 text-gray-200">{inv.weight}</td>
                <td className="py-2 text-gray-200">{inv.tracking}</td>
                <td className="py-2 text-gray-200">{inv.date}</td>
                <td className="py-2 text-right">
                  <button onClick={() => downloadHTML(inv)} className="px-2 py-1 mr-2 rounded bg-green-600 text-white hover:bg-green-500">Download</button>
                  <button onClick={() => deleteInv(inv.id)} className="px-2 py-1 rounded bg-red-600 text-white hover:bg-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}