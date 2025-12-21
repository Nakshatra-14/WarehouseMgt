package com.example.warehouse.demo.Controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.warehouse.demo.Service.ScanService;

@RestController
@RequestMapping("/api")
public class ScanController {

    @Autowired
    private ScanService scanService;

    @PostMapping("/scan")
    public ResponseEntity<String> uploadScan(@RequestParam("image") MultipartFile file) {
        try {
            // Call the service we just fixed
            String result = scanService.processScan(file);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("API Error: " + e.getMessage());
        }
    }
}