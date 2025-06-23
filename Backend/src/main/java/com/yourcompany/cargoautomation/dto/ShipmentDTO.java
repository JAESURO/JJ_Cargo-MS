package com.yourcompany.cargoautomation.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShipmentDTO {
    private Long id;
    private String name;
    private String cargoName;
    private String departureLocationName;
    private String arrivalLocationName;
    private String status;
    private String departureTime;
    private String arrivalTime;
    private Double distance;
    private Boolean success;
} 