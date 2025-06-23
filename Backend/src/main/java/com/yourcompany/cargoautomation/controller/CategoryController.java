package com.yourcompany.cargoautomation.controller;

import com.yourcompany.cargoautomation.entity.User;
import com.yourcompany.cargoautomation.entity.Category;
import com.yourcompany.cargoautomation.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;

    @PostMapping
    public Category createCategory(@RequestBody Category category) {
        User user = getAuthenticatedUser();
        category.setUser(user);
        return categoryRepository.save(category);
    }

    @GetMapping
    public List<Category> getAllCategories() {
        User user = getAuthenticatedUser();
        return categoryRepository.findByUser(user);
    }

    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
} 