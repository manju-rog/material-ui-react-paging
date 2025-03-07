package com.example.sso;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/entities")
public class SmartController {

    @Autowired
    private SmartService service;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getEntities(
        @RequestParam(defaultValue = "0") long anchorId,
        @RequestParam(defaultValue = "20") int limit,
        @RequestParam(required = false) String name) {

        return service.getEntities(anchorId, limit, name);
    }
}
