package com.example.warehouse.demo.Controller;

import com.example.warehouse.demo.Model.Invoice;
import com.example.warehouse.demo.Repo.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    @Autowired
    private InvoiceRepository invoiceRepository;

    // 1. Get a list of ALL invoices (so you can see the IDs)
    @GetMapping
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    // 2. Download a specific Invoice as a .txt file
    @GetMapping("/download/{id}")
    public ResponseEntity<ByteArrayResource> downloadInvoice(@PathVariable UUID id) {
        // Find the invoice in the DB
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));

        // Create the content of the file
        String fileContent = "====== GENERATED INVOICE ======\n\n" +
                "Invoice ID: " + invoice.getInvoiceId() + "\n" +
                "Date: " + invoice.getUploadedAt() + "\n" +
                "----------------------------------\n" +
                "Vendor: " + invoice.getVendor() + "\n" +
                "PO Number: " + invoice.getPoNumber() + "\n" +
                "Status: " + invoice.getStatus() + "\n" +
                "----------------------------------\n" +
                (invoice.getStatus().equals("REJECTED") ? "NOTE: Shipment contained damaged goods.\n" : "NOTE: Shipment accepted.\n") +
                "==================================";

        // Convert string to a downloadable file resource
        ByteArrayResource resource = new ByteArrayResource(fileContent.getBytes(StandardCharsets.UTF_8));

        // Return the file
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=invoice_" + id + ".txt")
                .contentType(MediaType.TEXT_PLAIN)
                .contentLength(resource.contentLength())
                .body(resource);
    }
}