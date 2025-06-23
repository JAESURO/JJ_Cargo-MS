package com.yourcompany.cargoautomation.service;

import com.yourcompany.cargoautomation.dto.CargoDTO;
import com.yourcompany.cargoautomation.entity.Cargo;
import com.yourcompany.cargoautomation.entity.Category;
import com.yourcompany.cargoautomation.repository.CargoRepository;
import com.yourcompany.cargoautomation.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CargoService {
    private final CargoRepository cargoRepository;
    private final CategoryRepository categoryRepository;

    public CargoDTO createCargo(CargoDTO dto) {
        if (dto.getCategoryId() == null) {
            throw new IllegalArgumentException("Category ID must not be null");
        }
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));
        Cargo cargo = Cargo.builder()
                .name(dto.getName())
                .category(category)
                .weight(dto.getWeight())
                .build();
        Cargo saved = cargoRepository.save(cargo);
        return toDTO(saved);
    }

    public List<CargoDTO> getAllCargo() {
        return cargoRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public Optional<CargoDTO> getCargoById(Long id) {
        return cargoRepository.findById(id).map(this::toDTO);
    }

    public Optional<CargoDTO> updateCargo(Long id, CargoDTO dto) {
        return cargoRepository.findById(id).map(cargo -> {
            cargo.setName(dto.getName());
            if (!cargo.getCategory().getId().equals(dto.getCategoryId())) {
                Category category = categoryRepository.findById(dto.getCategoryId())
                        .orElseThrow(() -> new IllegalArgumentException("Category not found"));
                cargo.setCategory(category);
            }
            cargo.setWeight(dto.getWeight());
            return toDTO(cargoRepository.save(cargo));
        });
    }

    public void deleteCargo(Long id) {
        cargoRepository.deleteById(id);
    }

    private CargoDTO toDTO(Cargo cargo) {
        return CargoDTO.builder()
                .id(cargo.getId())
                .name(cargo.getName())
                .categoryId(cargo.getCategory().getId())
                .weight(cargo.getWeight())
                .build();
    }
} 