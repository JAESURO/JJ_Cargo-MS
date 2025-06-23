package com.yourcompany.cargoautomation.controller;

import com.yourcompany.cargoautomation.entity.User;
import com.yourcompany.cargoautomation.repository.UserRepository;
import com.yourcompany.cargoautomation.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return "Username already exists!";
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "Registration successful!";
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) {
        User dbUser = userRepository.findByUsername(user.getUsername());
        Map<String, String> response = new HashMap<>();
        if (dbUser != null && passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
            String token = jwtUtil.generateToken(dbUser.getUsername());
            response.put("token", token);
            return response;
        }
        response.put("error", "Invalid username or password!");
        return response;
    }
} 