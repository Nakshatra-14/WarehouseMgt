export function seedWarehouseData() {
  const seededFlag = localStorage.getItem('wm_seeded');
  if (seededFlag) return;

  const vendors = ['Vendor A', 'Vendor B', 'Vendor C', 'Vendor D'];
  const categories = ['Electronics', 'Apparel', 'Home', 'Toys', 'Grocery'];

  const records = [];
  for (let i = 0; i < 500; i++) {
    const date = new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 120); // last 120 days
    const item = {
      id: `HIST-${i}-${Math.random().toString(36).slice(2, 6)}`,
      vendor: vendors[Math.floor(Math.random() * vendors.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      weightKg: +(Math.random() * 25 + 1).toFixed(1),
      tracking: `TRK-${Math.floor(Math.random() * 9_000_000) + 1_000_000}`,
      damaged: Math.random() < 0.18,
      date: date.toISOString().slice(0, 10),
    };
    records.push(item);
  }
  localStorage.setItem('wm_history', JSON.stringify(records));
  localStorage.setItem('wm_seeded', 'true');
}

export function getHistoryRecords() {
  const data = localStorage.getItem('wm_history');
  return data ? JSON.parse(data) : [];
}