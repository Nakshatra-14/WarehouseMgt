package com.example.warehouse.demo.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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

    // Use absolute path to avoid permission issues, or just "uploads/"
    private final String UPLOAD_DIR = "uploads/";
    private final String API_URL = "https://testing-box-api.vercel.app/api/check";

    public String processScan(MultipartFile file) throws IOException {
        // 1. Save Image Locally
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }
        
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR + fileName);
        Files.write(filePath, file.getBytes());

        // 2. Call External API
        JsonNode apiResponse = callExternalApi(filePath.toFile());

        // 3. Parse Response (Safely handle potential missing fields)
        boolean isDamaged = false;
        if (apiResponse.has("is_damaged")) {
            isDamaged = apiResponse.get("is_damaged").asBoolean();
        }
        
        String status = apiResponse.has("status") ? apiResponse.get("status").asText() : "unknown";
        String confidence = apiResponse.has("confidence") ? apiResponse.get("confidence").asText() : "0";

        // 4. Save Scan Result to DB
        Scan scan = new Scan();
        scan.setImagePath(filePath.toString());
        scan.setDamaged(isDamaged);
        scan.setStatus(status);
        scan.setConfidence(confidence);
        scanRepository.save(scan);

        // 5. Generate Simulated Invoice
        Invoice invoice = new Invoice();
        invoice.setPoNumber("PO-" + (int)(Math.random() * 10000));
        invoice.setVendor(isDamaged ? "Unknown Vendor (Rejected)" : "Samsung Electronics");
        invoice.setStatus(isDamaged ? "REJECTED" : "APPROVED");
        invoiceRepository.save(invoice);

        return "Success! Scan ID: " + scan.getScanId() + " | Invoice Status: " + invoice.getStatus();
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

            ObjectMapper mapper = new ObjectMapper();
            return mapper.readTree(response.getBody());
        } catch (Exception e) {
            throw new RuntimeException("Failed to call External API: " + e.getMessage());
        }
    }
}