const BASE_URL = "http://localhost:8080";

// -------- Invoices --------
export const getInvoices = async () => {
  const res = await fetch(`${BASE_URL}/api/invoices`);
  if (!res.ok) throw new Error("Failed to fetch invoices");
  return res.json();
};

// -------- Analytics --------
export const getRecentActivity = async () => {
  const res = await fetch(`${BASE_URL}/api/analytics/recent-activity`);
  if (!res.ok) throw new Error("Failed to fetch recent activity");
  return res.json();
};

export const getDashboardStats = async () => {
  const res = await fetch(`${BASE_URL}/api/analytics/dashboard`);
  if (!res.ok) throw new Error("Failed to fetch dashboard stats");
  return res.json();
};

export const getPrediction = async () => {
  const res = await fetch(`${BASE_URL}/api/analytics/predict`);
  if (!res.ok) throw new Error("Failed to fetch prediction");
  return res.json();
};

export const getPieChartData = async () => {
  const res = await fetch(`${BASE_URL}/api/analytics/pie-chart-data`);
  if (!res.ok) throw new Error("Failed to fetch pie chart data");
  return res.json();
};
