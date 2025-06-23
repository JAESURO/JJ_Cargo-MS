package com.yourcompany.cargoautomation.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cargo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    private Double weight;

    @OneToMany(mappedBy = "cargo")
    private List<Shipment> shipments;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
} 