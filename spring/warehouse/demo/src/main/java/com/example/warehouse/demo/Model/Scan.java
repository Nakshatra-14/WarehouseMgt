package com.example.warehouse.demo.Model;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "inventory_scans")
public class Scan {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID scanId;

    private String imagePath; // Path to the uploaded image

    // --- Fields from your Box Check API ---
    private String status;       // e.g. "normal"
    private String confidence;   // e.g. "99.99"
    private boolean isDamaged;   // e.g. false
    // -------------------------------------

    private LocalDateTime scannedAt;

    @PrePersist
    protected void onCreate() {
        scannedAt = LocalDateTime.now();
    }
}