package com.example.warehouse.demo.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.warehouse.demo.Repo.InvoiceRepository;
import com.example.warehouse.demo.Repo.ScanRepository;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private ScanRepository scanRepository;

    // 1. General Dashboard Data
    @GetMapping("/dashboard")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        long totalDocs = invoiceRepository.count();
        long rejectedDocs = invoiceRepository.findAll().stream()
                .filter(i -> "REJECTED".equals(i.getStatus()))
                .count();

        stats.put("total_invoices", totalDocs);
        stats.put("rejected_count", rejectedDocs);
        stats.put("approved_count", totalDocs - rejectedDocs);
        
        // Calculate a realistic efficiency rate
        double efficiency = totalDocs > 0 ? ((double)(totalDocs - rejectedDocs) / totalDocs) * 100 : 100;
        stats.put("efficiency_rate", String.format("%.1f%%", efficiency));
        
        return stats;
    }

    // 2. PREDICTIVE DATA (The "Guide" Feature)
    @GetMapping("/predict")
    public Map<String, Object> getPrediction() {
        Map<String, Object> prediction = new HashMap<>();
        Random rand = new Random();

        // Detect "Upcoming Festival"
        String upcomingEvent = "Big Billion Sale (Upcoming)";
        prediction.put("event", upcomingEvent);
        prediction.put("alert_level", "MODERATE"); // Changed from HIGH to vary it
        prediction.put("message", "Expected load increase. Check critical items.");

        // Diverse Items List (Some Good, Some Bad)
        List<Map<String, Object>> itemsList = new ArrayList<>();
        String[] inventoryItems = {
            "Smartphones", "LED TVs", "Bluetooth Speakers", "Power Banks", 
            "Smart Watches", "Laptops", "Gaming Consoles", "Tablets"
        };
        
        int criticalCount = 0;

        for (String item : inventoryItems) {
            Map<String, Object> itemData = new HashMap<>();
            itemData.put("name", item);
            
            // Random Logic for Variety
            int scenario = rand.nextInt(3); // 0 = Good, 1 = Low, 2 = Critical
            
            int required = 100 + rand.nextInt(50);
            int current;
            String status;

            if (scenario == 0) {
                // Good Stock (Green)
                current = required + rand.nextInt(50); 
                status = "IN_STOCK";
            } else if (scenario == 1) {
                // Low Stock (Yellow)
                current = required - rand.nextInt(20); 
                status = "LOW_STOCK";
            } else {
                // Critical (Red)
                current = rand.nextInt(30); 
                status = "CRITICAL_SHORTAGE";
                criticalCount++;
            }

            itemData.put("current_stock", current);
            itemData.put("required_stock", required);
            itemData.put("status", status);
            itemsList.add(itemData);
        }

        prediction.put("inventory_health", itemsList);
        prediction.put("active_critical_alerts", criticalCount);

        // Graph Data (Load Forecast)
        List<Integer> loadForecast = new ArrayList<>();
        int currentLoad = 50;
        for (int i = 0; i < 7; i++) {
            currentLoad += rand.nextInt(30) - 5; // Load fluctuates naturally
            loadForecast.add(currentLoad);
        }
        prediction.put("load_forecast_graph", loadForecast);

        return prediction;
    }
}