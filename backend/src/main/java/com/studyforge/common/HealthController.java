package com.studyforge.common;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/health")
public class HealthController {

    @Value("${spring.application.name:studyforge-backend}")
    private String applicationName;

    @Value("${studyforge.ai-service.url:http://localhost:8000}")
    private String aiServiceUrl;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getHealth() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", applicationName,
                "timestamp", Instant.now().toString(),
                "configuredAiServiceUrl", aiServiceUrl
        ));
    }
}
