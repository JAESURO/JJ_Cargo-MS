package com.yourcompany.cargoautomation.controller;

import com.yourcompany.cargoautomation.entity.User;
import com.yourcompany.cargoautomation.entity.Shipment;
import com.yourcompany.cargoautomation.repository.ShipmentRepository;
import com.yourcompany.cargoautomation.dto.ShipmentDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/shipment")
public class ShipmentController {
    @Autowired
    private ShipmentRepository shipmentRepository;

    @PostMapping
    public Shipment createShipment(@RequestBody Shipment shipment) {
        User user = getAuthenticatedUser();
        shipment.setUser(user);
        return shipmentRepository.save(shipment);
    }

    @GetMapping
    public List<ShipmentDTO> getAllShipments() {
        User user = getAuthenticatedUser();
        return shipmentRepository.findByUser(user).stream().map(this::toDTO).toList();
    }

    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }

    private ShipmentDTO toDTO(Shipment shipment) {
        return ShipmentDTO.builder()
                .id(shipment.getId())
                .name(shipment.getName())
                .cargoName(shipment.getCargo() != null ? shipment.getCargo().getName() : null)
                .departureLocationName(shipment.getDepartureLocation() != null ? shipment.getDepartureLocation().getName() : null)
                .arrivalLocationName(shipment.getArrivalLocation() != null ? shipment.getArrivalLocation().getName() : null)
                .status(shipment.getStatus())
                .departureTime(shipment.getDepartureTime() != null ? shipment.getDepartureTime().toString() : null)
                .arrivalTime(shipment.getArrivalTime() != null ? shipment.getArrivalTime().toString() : null)
                .distance(shipment.getDistance())
                .success(shipment.getSuccess())
                .build();
    }
} 