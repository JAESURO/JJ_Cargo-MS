package com.yourcompany.cargoautomation.controller;

import com.yourcompany.cargoautomation.service.MapsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/maps")
public class MapsController {

    @Autowired
    private MapsService mapsService;

    @GetMapping("/distance")
    public Map<String, Object> getDistance(
            @RequestParam double lat1,
            @RequestParam double lon1,
            @RequestParam double lat2,
            @RequestParam double lon2) {
        
        Map<String, Object> response = new HashMap<>();
        try {
            double distance = mapsService.getDistance(lat1, lon1, lat2, lon2);
            response.put("distance", distance);
            response.put("success", true);
        } catch (Exception e) {
            response.put("error", "Failed to calculate distance");
            response.put("success", false);
        }
        return response;
    }
} 