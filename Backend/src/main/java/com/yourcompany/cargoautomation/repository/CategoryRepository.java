package com.yourcompany.cargoautomation.repository;

import com.yourcompany.cargoautomation.entity.Category;
import com.yourcompany.cargoautomation.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByUser(User user);
} 