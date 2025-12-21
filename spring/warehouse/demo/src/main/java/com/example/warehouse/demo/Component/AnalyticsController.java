package com.example.warehouse.demo.Component;

import com.example.warehouse.demo.Model.Invoice;
import com.example.warehouse.demo.Repo.InvoiceRepository;
import com.example.warehouse.demo.Repo.ScanRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/analytics")
@Tag(name = "3. Analytics & Dashboard", description = "Data for Graphs, Pie Charts, and Predictions")
public class AnalyticsController {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private ScanRepository scanRepository;

    // --- 1. DASHBOARD STATS ---
    @GetMapping("/dashboard")
    @Operation(summary = "Main Dashboard Stats", description = "Returns counts for Total, Rejected, Approved.")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        long totalDocs = invoiceRepository.count();
        long rejectedDocs = invoiceRepository.findAll().stream()
                .filter(i -> "REJECTED".equals(i.getStatus()))
                .count();

        stats.put("total_invoices", totalDocs);
        stats.put("rejected_count", rejectedDocs);
        stats.put("approved_count", totalDocs - rejectedDocs);
        return stats;
    }

    // --- 2. PIE CHART DATA (New!) ---
    @GetMapping("/pie-chart-data")
    @Operation(summary = "Pie Chart Data", description = "Returns data for 'Damaged vs Normal' and 'Vendor Distribution' charts.")
    public Map<String, Object> getPieChartData() {
        Map<String, Object> charts = new HashMap<>();
        List<Invoice> allInvoices = invoiceRepository.findAll();

        // Chart 1: Status Distribution
        Map<String, Long> statusCount = allInvoices.stream()
                .collect(Collectors.groupingBy(Invoice::getStatus, Collectors.counting()));
        charts.put("status_distribution", statusCount);

        // Chart 2: Top 5 Vendors
        Map<String, Long> vendorCount = allInvoices.stream()
                .collect(Collectors.groupingBy(Invoice::getSenderName, Collectors.counting()));
        charts.put("vendor_distribution", vendorCount);

        return charts;
    }

    // --- 3. RECENT ACTIVITY (New!) ---
    @GetMapping("/recent-activity")
    @Operation(summary = "Recent Activity Feed", description = "Returns the last 5 invoices for a 'Live Feed' widget.")
    public List<Map<String, String>> getRecentActivity() {
        return invoiceRepository.findAll(Sort.by(Sort.Direction.DESC, "uploadedAt")).stream()
                .limit(5)
                .map(inv -> {
                    Map<String, String> activity = new HashMap<>();
                    activity.put("time", inv.getUploadedAt().toString());
                    activity.put("message", "New Invoice generated for " + inv.getSenderName());
                    activity.put("status", inv.getStatus());
                    activity.put("id", inv.getInvoiceId().toString());
                    return activity;
                })
                .collect(Collectors.toList());
    }

    // --- 4. PREDICTIVE DATA ---
    @GetMapping("/predict")
    @Operation(summary = "Prediction Graph", description = "Simulates AI forecasting for future demand.")
    public Map<String, Object> getPrediction() {
        Map<String, Object> prediction = new HashMap<>();
        Random rand = new Random();

        prediction.put("event", "Big Billion Sale (Upcoming)");
        prediction.put("alert_level", "MODERATE");
        prediction.put("message", "Expected load increase. Check critical items.");

        List<Map<String, Object>> itemsList = new ArrayList<>();
        String[] inventoryItems = {"Smartphones", "LED TVs", "Bluetooth Speakers", "Power Banks", "Laptops"};
        
        int criticalCount = 0;
        for (String item : inventoryItems) {
            Map<String, Object> itemData = new HashMap<>();
            itemData.put("name", item);
            int scenario = rand.nextInt(3);
            int required = 100 + rand.nextInt(50);
            int current = (scenario == 2) ? rand.nextInt(30) : required + rand.nextInt(50);
            String status = (scenario == 2) ? "CRITICAL_SHORTAGE" : "IN_STOCK";
            
            if (scenario == 2) criticalCount++;

            itemData.put("current_stock", current);
            itemData.put("required_stock", required);
            itemData.put("status", status);
            itemsList.add(itemData);
        }

        prediction.put("inventory_health", itemsList);
        prediction.put("active_critical_alerts", criticalCount);

        List<Integer> loadForecast = new ArrayList<>();
        int currentLoad = 50;
        for (int i = 0; i < 7; i++) {
            currentLoad += rand.nextInt(30) - 5;
            loadForecast.add(currentLoad);
        }
        prediction.put("load_forecast_graph", loadForecast);

        return prediction;
    }
}