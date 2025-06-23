package com.yourcompany.cargoautomation.repository;

import com.yourcompany.cargoautomation.entity.Shipment;
import com.yourcompany.cargoautomation.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ShipmentRepository extends JpaRepository<Shipment, Long> {
    List<Shipment> findByUser(User user);
} 