package com.example.warehouse.demo.Component;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.warehouse.demo.Model.Invoice;
import com.example.warehouse.demo.Model.Scan;
import com.example.warehouse.demo.Repo.InvoiceRepository;
import com.example.warehouse.demo.Repo.ScanRepository;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private ScanRepository scanRepository;

    @Override
    public void run(String... args) throws Exception {
        // Only seed if the DB is empty
        if (invoiceRepository.count() == 0) {
            System.out.println("--- 🚀 SEEDING DATABASE WITH 500 RECORDS (HUGE DATA) ---");
            Random rand = new Random();
            
            String[] vendors = {"Samsung Electronics", "LG Corp", "Sony India", "Dell Manufacturing", "Apple Logistics", "HP Enterprise", "Xiaomi Warehouse", "Bosch Tools"};
            String[] items = {"Galaxy S24 Ultra", "OLED 55 TV", "Noise Cancel Headphones", "Gaming Laptop", "4K Monitor", "Smart Watch Gen 5", "Bluetooth Speaker"};
            String[] locations = {"Noida Sector 62", "Bangalore Tech Park", "Mumbai Port", "Chennai Industrial Area", "Gurugram Cyber City"};

            for (int i = 0; i < 500; i++) { // INCREASED TO 500
                boolean isDamaged = rand.nextInt(100) < 15; // 15% chance of damage
                String vendor = vendors[rand.nextInt(vendors.length)];
                
                // Create Fake Scan
                Scan scan = new Scan();
                // We use a placeholder image path for history
                scan.setImagePath("uploads/archived_image_" + i + ".jpg");
                scan.setDamaged(isDamaged);
                scan.setStatus(isDamaged ? "damaged" : "normal");
                
                // Random confidence between 85.0% and 99.9%
                double confidence = 85.0 + (14.9 * rand.nextDouble());
                scan.setConfidence(String.format("%.2f", confidence) + "%");
                
                // Spread dates over the last 90 days (3 Months)
                scan.setScannedAt(LocalDateTime.now().minusDays(rand.nextInt(90)).minusHours(rand.nextInt(24))); 
                scanRepository.save(scan);

                // Create Fake Invoice linked to it
                Invoice invoice = new Invoice();
                invoice.setPoNumber("PO-" + (10000 + i));
                invoice.setSenderName(vendor);
                invoice.setSenderAddress(locations[rand.nextInt(locations.length)]);
                invoice.setReceiverName("College Warehouse System");
                invoice.setReceiverAddress("Department of Computer Science");
                invoice.setTrackingNumber("TRK-" + System.currentTimeMillis() + "-" + i);
                invoice.setWeightKg(1.0 + rand.nextDouble() * 49.0); // 1kg to 50kg
                invoice.setStatus(isDamaged ? "REJECTED" : "APPROVED");
                invoice.setUploadedAt(scan.getScannedAt()); // Sync dates with scan
                
                invoiceRepository.save(invoice);
            }
            System.out.println("--- ✅ HUGE DATA SEEDING COMPLETE ---");
        }
    }
}