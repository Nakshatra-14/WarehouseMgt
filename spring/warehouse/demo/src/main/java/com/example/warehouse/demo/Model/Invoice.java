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
@Table(name = "invoices")
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID invoiceId;

    // --- Data "Read" from the Box Label ---
    private String trackingNumber;
    private String senderName;
    private String senderAddress;
    private String receiverName;
    private String receiverAddress;
    private double weightKg;
    // -------------------------------------

    private String poNumber;
    private String status;   // "APPROVED" or "REJECTED"
    private LocalDateTime uploadedAt;

    @PrePersist
    protected void onCreate() {
        uploadedAt = LocalDateTime.now();
    }
}