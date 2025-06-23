package com.yourcompany.cargoautomation.repository;

import com.yourcompany.cargoautomation.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
} 