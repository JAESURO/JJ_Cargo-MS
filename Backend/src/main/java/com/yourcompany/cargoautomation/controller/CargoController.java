package com.yourcompany.cargoautomation.controller;

import com.yourcompany.cargoautomation.entity.User;
import com.yourcompany.cargoautomation.dto.CargoDTO;
import com.yourcompany.cargoautomation.service.CargoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cargo")
@RequiredArgsConstructor
public class CargoController {
    private final CargoService cargoService;

    @PostMapping
    public ResponseEntity<CargoDTO> createCargo(@RequestBody CargoDTO dto) {
        return ResponseEntity.ok(cargoService.createCargo(dto));
    }

    @GetMapping
    public ResponseEntity<List<CargoDTO>> getAllCargo() {
        return ResponseEntity.ok(cargoService.getAllCargo());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CargoDTO> getCargoById(@PathVariable Long id) {
        return cargoService.getCargoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<CargoDTO> updateCargo(@PathVariable Long id, @RequestBody CargoDTO dto) {
        return cargoService.updateCargo(id, dto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCargo(@PathVariable Long id) {
        cargoService.deleteCargo(id);
        return ResponseEntity.noContent().build();
    }

    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
} 