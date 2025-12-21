package com.example.warehouse.demo.Controller;

import com.example.warehouse.demo.Model.Scan;
import com.example.warehouse.demo.Repo.ScanRepository;
import com.example.warehouse.demo.Service.ScanService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@Tag(name = "1. Scan & Images", description = "Handle Image Uploads and Image Serving")
public class ScanController {

    @Autowired
    private ScanService scanService;

    @Autowired
    private ScanRepository scanRepository;

    // --- 1. UPLOAD ENDPOINT (Updated Return Type) ---
    @PostMapping(value = "/scan", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload Box Image", description = "Uploads an image and returns a detailed processing log for frontend animation.")
    public ResponseEntity<Map<String, Object>> uploadScan(@RequestParam("image") MultipartFile file) {
        try {
            Map<String, Object> result = scanService.processScan(file);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // --- 2. GET ALL SCANS ---
    @GetMapping("/scans")
    @Operation(summary = "Get All Scans", description = "Returns a list of all past scans with image paths.")
    public List<Scan> getAllScans() {
        return scanRepository.findAll();
    }

    // --- 3. SERVE IMAGE ---
    @GetMapping("/images/{filename:.+}")
    @Operation(summary = "View Image", description = "Load the actual image file in the browser.")
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        try {
            Path file = Paths.get("uploads").resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }
}