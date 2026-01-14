import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8080/api/invoices";

export default function Invoicing() {
  const [invoices, setInvoices] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    const res = await axios.get(API);
    setInvoices(res.data);
  };

  const searchInvoices = async () => {
    if (!query.trim()) {
      loadInvoices();
      return;
    }
    const res = await axios.get(`${API}/search?query=${query}`);
    setInvoices(res.data);
  };

  const downloadInvoice = (id) => {
    window.open(`${API}/download/${id}`, "_blank");
  };

  const deleteInvoice = async (id) => {
    if (!window.confirm("Delete this invoice?")) return;
    await axios.delete(`${API}/${id}`);
    loadInvoices();
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Smart Invoicing</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="px-3 py-2 text-black rounded w-80"
          placeholder="Search by PO / Sender / Receiver"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={searchInvoices}
          className="px-4 py-2 bg-indigo-600 rounded"
        >
          Search
        </button>
        <button
          onClick={loadInvoices}
          className="px-4 py-2 bg-gray-600 rounded"
        >
          Reset
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-2">Receiver</th>
              <th className="p-2">PO</th>
              <th className="p-2">Invoice ID</th>
              <th className="p-2">Weight</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.invoiceId} className="border-t border-gray-700">
                <td className="p-2">{inv.receiverName}</td>
                <td className="p-2">{inv.poNumber}</td>
                <td className="p-2 text-xs">{inv.invoiceId}</td>
                <td className="p-2">{inv.weightKg}</td>
                <td
                  className={`p-2 font-bold ${
                    inv.status === "APPROVED"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {inv.status}
                </td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => downloadInvoice(inv.invoiceId)}
                    className="px-3 py-1 bg-green-600 rounded text-sm"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => deleteInvoice(inv.invoiceId)}
                    className="px-3 py-1 bg-red-600 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {invoices.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-400">
                  No invoices found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
