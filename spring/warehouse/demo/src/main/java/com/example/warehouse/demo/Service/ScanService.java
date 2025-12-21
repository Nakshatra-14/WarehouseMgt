package com.example.warehouse.demo.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.web.reactive.function.BodyInserters;

@Service
public class ScanService {

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://testing-box-api.vercel.app")
            .build();

    public String checkImageFile(String filePath) {
        MultipartBodyBuilder builder = new MultipartBodyBuilder();
        // This is exactly like your -F "image=@..." command
        builder.part("image", new FileSystemResource(filePath));

        return webClient.post()
                .uri("/api/check")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData(builder.build()))
                .retrieve()
                .bodyToMono(String.class)
                .block(); // This waits for the result and returns the JSON string
    }
}