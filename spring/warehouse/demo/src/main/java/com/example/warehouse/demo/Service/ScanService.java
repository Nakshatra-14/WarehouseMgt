package com.example.warehouse.demo.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Random;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.example.warehouse.demo.Model.Invoice;
import com.example.warehouse.demo.Model.Scan;
import com.example.warehouse.demo.Repo.InvoiceRepository;
import com.example.warehouse.demo.Repo.ScanRepository;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Service
public class ScanService {

    @Autowired
    private ScanRepository scanRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    private final String UPLOAD_DIR = "uploads/";
    private final String API_URL = "https://testing-box-api.vercel.app/api/check";

    public String processScan(MultipartFile file) throws IOException {
        // 1. Save Image Locally
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) uploadDir.mkdirs();
        
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR + fileName);
        Files.write(filePath, file.getBytes());

        // 2. Call External API (Damage Check)
        JsonNode apiResponse = callExternalApi(filePath.toFile());

        boolean isDamaged = false;
        if (apiResponse.has("is_damaged")) {
            isDamaged = apiResponse.get("is_damaged").asBoolean();
        }
        String status = apiResponse.has("status") ? apiResponse.get("status").asText() : "unknown";
        String confidence = apiResponse.has("confidence") ? apiResponse.get("confidence").asText() : "0";

        // 3. Save Scan Result
        Scan scan = new Scan();
        scan.setImagePath(filePath.toString());
        scan.setDamaged(isDamaged);
        scan.setStatus(status);
        scan.setConfidence(confidence);
        scanRepository.save(scan);

        // 4. Generate Professional Invoice (Simulate Label Reading)
        createSimulatedInvoice(isDamaged);

        return "Success! Scan ID: " + scan.getScanId() + " | Status: " + status;
    }

    private void createSimulatedInvoice(boolean isDamaged) {
        Invoice invoice = new Invoice();
        Random rand = new Random();

        // Simulate reading the label
        invoice.setTrackingNumber("TRK-" + (100000 + rand.nextInt(900000)));
        invoice.setPoNumber("PO-" + (5000 + rand.nextInt(5000)));
        invoice.setWeightKg(1.5 + (10.0 * rand.nextDouble())); // Random weight 1.5kg - 11.5kg
        
        // Randomly pick a "Sender" to make it look real
        String[] senders = {"Samsung Electronics", "LG Logistics", "Sony Warehouse", "Dell Manufacturing"};
        String[] addresses = {"123 Tech Park, Seoul", "45 Industrial Blvd, Noida", "88 Silicon Valley, CA", "Sector 62, Gurugram"};
        
        int idx = rand.nextInt(senders.length);
        invoice.setSenderName(senders[idx]);
        invoice.setSenderAddress(addresses[idx]);

        invoice.setReceiverName("My College Warehouse");
        invoice.setReceiverAddress("Department of CS, Main Campus");

        invoice.setStatus(isDamaged ? "REJECTED" : "APPROVED");

        invoiceRepository.save(invoice);
    }

    private JsonNode callExternalApi(File file) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);
            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("image", new FileSystemResource(file));
            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(API_URL, requestEntity, String.class);
            return new ObjectMapper().readTree(response.getBody());
        } catch (Exception e) {
            throw new RuntimeException("Failed to call External API: " + e.getMessage());
        }
    }
}