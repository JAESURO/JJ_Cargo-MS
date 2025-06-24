package com.yourcompany.cargoautomation.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.json.JSONObject;

@Service
public class MapsService {
    @Value("${google.maps.api.key}")
    private String apiKey;

    private final String DISTANCE_MATRIX_URL = "https://maps.googleapis.com/maps/api/distancematrix/json";

    public double getDistance(double lat1, double lon1, double lat2, double lon2) {
        String origins = lat1 + "," + lon1;
        String destinations = lat2 + "," + lon2;
        String url = DISTANCE_MATRIX_URL + "?origins=" + origins + "&destinations=" + destinations + "&key=" + apiKey;
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);
        JSONObject json = new JSONObject(response);
        double distance = json.getJSONArray("rows")
            .getJSONObject(0)
            .getJSONArray("elements")
            .getJSONObject(0)
            .getJSONObject("distance")
            .getDouble("value");
        return distance / 1000.0;
    }
}
