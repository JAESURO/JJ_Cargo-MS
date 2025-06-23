package com.yourcompany.cargoautomation.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Shipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "cargo_id")
    private Cargo cargo;

    @ManyToOne
    @JoinColumn(name = "departure_location_id")
    private Location departureLocation;

    @ManyToOne
    @JoinColumn(name = "arrival_location_id")
    private Location arrivalLocation;

    private String status;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private String weather;
    private Double distance;
    private Boolean success;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
} 