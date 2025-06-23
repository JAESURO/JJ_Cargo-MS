package com.yourcompany.cargoautomation.repository;

import com.yourcompany.cargoautomation.entity.Location;
import com.yourcompany.cargoautomation.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LocationRepository extends JpaRepository<Location, Long> {
    List<Location> findByUser(User user);
} 