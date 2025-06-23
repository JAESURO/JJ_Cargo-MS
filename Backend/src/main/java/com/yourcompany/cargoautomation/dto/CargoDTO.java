package com.yourcompany.cargoautomation.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CargoDTO {
    private Long id;
    private String name;
    private Long categoryId;
    private Double weight;
} 