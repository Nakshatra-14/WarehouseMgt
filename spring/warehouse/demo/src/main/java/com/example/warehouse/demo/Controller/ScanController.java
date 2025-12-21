package com.example.warehouse.demo.Controller;

import com.example.warehouse.demo.Service.ScanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ScanController {

    @Autowired
    private ScanService scanService;

    @GetMapping("/scan-good")
    public String scanGood() {
        // Using the exact path that worked for your curl command
        return scanService.checkImageFile("C:/temp/good.jpeg");
    }
}