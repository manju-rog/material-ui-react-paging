package com.example.sso;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Service
public class SmartService {
    @Autowired
    private SmartRepository repository;
    public ResponseEntity<Map<String, Object>> getEntities(long anchorId, int limit, String name) {
        // Ensure empty names are treated as null
        if (name != null && name.trim().isEmpty()) {
            name = null;
        }
        List<SmartEntity> results = repository.findOptimizedResults(anchorId, limit + 1, name);
        boolean hasNext = results.size() > limit;
        long newAnchor = hasNext ? results.get(results.size() - 2).getId() : 0;
        Map<String, Object> response = new HashMap<>();
        response.put("data", hasNext ? results.subList(0, limit) : results);
        response.put("nextAnchor", hasNext ? newAnchor : null);
        response.put("currentLimit", limit);
        return ResponseEntity.ok(response);
    }
}