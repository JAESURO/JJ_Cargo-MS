package com.yourcompany.cargoautomation.repository;

import com.yourcompany.cargoautomation.entity.Cargo;
import com.yourcompany.cargoautomation.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CargoRepository extends JpaRepository<Cargo, Long> {
    List<Cargo> findByUser(User user);
} 