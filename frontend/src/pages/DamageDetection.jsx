import React, { useRef, useState } from 'react';

export default function DamageDetection() {
  const [imageSrc, setImageSrc] = useState(null);
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState(null);
  const [processing, setProcessing] = useState(false);
  const intervalRef = useRef(null);

  const steps = [
    'Initializing pipeline...',
    'Uploading image to AI service...',
    'Running defect detection...',
    'Analyzing surface anomalies...',
    'Validating confidence thresholds...',
    'Aggregating results...',
    'Finalizing decision...'
  ];

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result);
    reader.readAsDataURL(file);
    setLogs([]);
    setStatus(null);
  };

  const startProcess = () => {
    if (!imageSrc) return;
    setProcessing(true);
    setLogs([]);
    setStatus(null);
    let i = 0;
    intervalRef.current = setInterval(() => {
      setLogs((prev) => [...prev, steps[i]]);
      i++;
      if (i >= steps.length) {
        clearInterval(intervalRef.current);
        // Simple simulation: if filename includes Damaged, reject, else approve
        const isDamaged = (logs.join('') + imageSrc).toLowerCase().includes('damaged');
        const decision = isDamaged ? 'REJECTED' : Math.random() < 0.2 ? 'REJECTED' : 'APPROVED';
        setStatus(decision);
        setProcessing(false);
      }
    }, 700);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-4 rounded-xl border border-gray-800 bg-gray-900">
          <h2 className="text-white font-semibold">Upload & Preview</h2>
          <div className="mt-3 flex items-center gap-3">
            <label className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm cursor-pointer hover:bg-indigo-500">
              <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
              Choose Image
            </label>
            <button
              onClick={startProcess}
              disabled={!imageSrc || processing}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${processing ? 'bg-gray-700 text-gray-400' : 'bg-green-600 text-white hover:bg-green-500'}`}
            >
              {processing ? 'Processing...' : 'Run AI Detection'}
            </button>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden border border-gray-800 bg-black/40 h-64 grid place-items-center relative">
              {imageSrc ? (
                <img src={imageSrc} alt="preview" className="max-h-64 object-contain image-fade-in" />
              ) : (
                <div className="text-gray-500 text-sm">No image selected</div>
              )}
            </div>
            <div className="rounded-xl border border-gray-800 bg-gray-950 p-3">
              <div className="text-white font-semibold">Processing Logs</div>
              <div className="mt-2 h-48 overflow-auto text-xs text-gray-300 space-y-1">
                {logs.map((l, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    <span>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-gray-800 bg-gray-900">
          <h2 className="text-white font-semibold">Result</h2>
          <div className="mt-3 h-48 grid place-items-center">
            {status ? (
              <div className={`text-2xl font-bold ${status === 'APPROVED' ? 'text-emerald-400' : 'text-red-400'}`}>{status}</div>
            ) : (
              <div className="text-gray-500 text-sm">Awaiting analysis...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}