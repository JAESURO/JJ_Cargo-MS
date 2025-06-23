package com.yourcompany.cargoautomation.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double latitude;
    private Double longitude;

    @OneToMany(mappedBy = "departureLocation")
    private List<Shipment> departures;

    @OneToMany(mappedBy = "arrivalLocation")
    private List<Shipment> arrivals;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
} 