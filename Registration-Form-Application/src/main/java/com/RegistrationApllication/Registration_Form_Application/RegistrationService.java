package com.RegistrationApllication.Registration_Form_Application;


import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final RegistrationRepository repo;
    private final PasswordEncoder encoder;

    public List<RegistrationApp> getAll() {
        return repo.findAll();
    }

    public RegistrationApp getById(UUID id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
    }

    public UUID create(RegistrationApp input, MultipartFile file) {
        if (repo.existsByEmail(input.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        input.setPasswordHash(encoder.encode(input.getPasswordHash()));
        if (file != null && !file.isEmpty()) {
            input.setFilePath(file.getOriginalFilename()); // later: use FileStorageService
        }
        return repo.save(input).getId();
    }

    public UUID update(UUID id, RegistrationApp input, MultipartFile file) {
        RegistrationApp existing = getById(id);
        existing.setFirstName(input.getFirstName());
        existing.setLastName(input.getLastName());
        existing.setGender(input.getGender());
        existing.setEmail(input.getEmail());
        existing.setDob(input.getDob());
        if (input.getPasswordHash() != null && !input.getPasswordHash().isBlank()) {
            existing.setPasswordHash(encoder.encode(input.getPasswordHash()));
        }
        if (file != null && !file.isEmpty()) {
            existing.setFilePath(file.getOriginalFilename());
        }
        return repo.save(existing).getId();
    }

    public void delete(UUID id) {
        repo.deleteById(id);
    }
}
