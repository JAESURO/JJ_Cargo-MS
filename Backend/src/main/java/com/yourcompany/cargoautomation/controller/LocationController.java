package com.yourcompany.cargoautomation.controller;

import com.yourcompany.cargoautomation.entity.User;
import com.yourcompany.cargoautomation.entity.Location;
import com.yourcompany.cargoautomation.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/location")
public class LocationController {
    @Autowired
    private LocationRepository locationRepository;

    @PostMapping
    public Location createLocation(@RequestBody Location location) {
        User user = getAuthenticatedUser();
        location.setUser(user);
        return locationRepository.save(location);
    }

    @GetMapping
    public List<Location> getAllLocations() {
        User user = getAuthenticatedUser();
        return locationRepository.findByUser(user);
    }

    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
} 