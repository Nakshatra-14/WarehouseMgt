import React, { useState } from "react";

export default function DamageDetection() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [logs, setLogs] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setLogs([]);
    setResult(null);
    setError(null);
  };

  const runDetection = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setLogs(["Uploading image to backend..."]);

    try {
      const formData = new FormData();
      formData.append("image", file); // MUST be "image"

      const res = await fetch("http://localhost:8080/api/scan", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        throw new Error("Backend error");
      }

      const data = await res.json();

      setLogs(data.process_logs || []);
      setResult(data.scan_data);
    } catch (err) {
      console.error(err);
      setError("❌ Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* LEFT */}
      <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-4">
        <h2 className="text-white font-semibold mb-3">Upload & Preview</h2>

        <div className="flex gap-3 mb-4">
          <label className="px-4 py-2 bg-indigo-600 text-white rounded cursor-pointer">
            Choose Image
            <input type="file" accept="image/*" hidden onChange={onFileChange} />
          </label>

          <button
            onClick={runDetection}
            disabled={loading || !file}
            className={`px-4 py-2 rounded text-white ${
              loading ? "bg-gray-600" : "bg-green-600 hover:bg-green-500"
            }`}
          >
            {loading ? "Processing..." : "Run AI Detection"}
          </button>
        </div>

        {/* Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/40 border border-gray-800 rounded-xl h-64 flex items-center justify-center">
            {preview ? (
              <img src={preview} alt="preview" className="max-h-60 object-contain" />
            ) : (
              <span className="text-gray-500 text-sm">No image selected</span>
            )}
          </div>

          {/* Logs */}
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-3">
            <h3 className="text-white font-semibold mb-2">Processing Logs</h3>
            <div className="text-xs text-gray-300 space-y-1 h-52 overflow-auto">
              {logs.map((log, i) => (
                <div key={i}>• {log}</div>
              ))}
            </div>
          </div>
        </div>

        {error && <div className="text-red-400 mt-3">{error}</div>}
      </div>

      {/* RIGHT */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
        <h2 className="text-white font-semibold mb-3">Result</h2>

        {result ? (
          <div className="space-y-3">
            <div
              className={`text-2xl font-bold ${
                result.status === "damaged"
                  ? "text-red-400"
                  : "text-emerald-400"
              }`}
            >
              {result.status.toUpperCase()}
            </div>

            <div className="text-gray-300 text-sm">
              Confidence: {result.confidence}%
            </div>

            <div className="text-gray-400 text-xs">
              Scan ID: {result.scanId}
            </div>
          </div>
        ) : (
          <div className="text-gray-500 text-sm">Awaiting analysis...</div>
        )}
      </div>
    </div>
  );
}
