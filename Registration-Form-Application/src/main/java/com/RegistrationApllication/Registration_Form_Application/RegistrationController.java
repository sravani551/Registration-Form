package com.RegistrationApllication.Registration_Form_Application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    @Autowired
    private RegistrationRepository registrationRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ✅ Create with Lombok builder
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<RegistrationApp> create(
            @RequestPart("firstName") String firstName,
            @RequestPart("lastName") String lastName,
            @RequestPart("password") String password,
            @RequestPart("gender") String gender,
            @RequestPart("email") String email,
            @RequestPart("dob") String dob,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) throws IOException {

        RegistrationApp entity = RegistrationApp.builder()
                .firstName(firstName)
                .lastName(lastName)
                .passwordHash(passwordEncoder.encode(password))
                .gender(Gender.valueOf(gender.toUpperCase()))
                .email(email)
                .dob(LocalDate.parse(dob))
                .filePath(file != null && !file.isEmpty() ? file.getOriginalFilename() : null)
                .build();

        RegistrationApp saved = registrationRepository.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // ✅ Get all
    @GetMapping
    public List<RegistrationApp> getAll() {
        return registrationRepository.findAll();
    }

    // ✅ Get by ID
    @GetMapping("/{id}")
    public ResponseEntity<RegistrationApp> getOne(@PathVariable UUID id) {
        return registrationRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Update with builder-like pattern (load existing, then overwrite fields)
    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<RegistrationApp> update(
            @PathVariable UUID id,
            @RequestPart("firstName") String firstName,
            @RequestPart("lastName") String lastName,
            @RequestPart(value = "password", required = false) String password,
            @RequestPart("gender") String gender,
            @RequestPart("email") String email,
            @RequestPart("dob") String dob,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) throws IOException {

        Optional<RegistrationApp> existingOpt = registrationRepository.findById(id);
        if (existingOpt.isEmpty()) return ResponseEntity.notFound().build();

        RegistrationApp existing = existingOpt.get();
        existing.setFirstName(firstName);
        existing.setLastName(lastName);
        if (password != null && !password.isBlank()) {
            existing.setPasswordHash(passwordEncoder.encode(password));
        }
        existing.setGender(Gender.valueOf(gender.toUpperCase()));
        existing.setEmail(email);
        existing.setDob(LocalDate.parse(dob));
        if (file != null && !file.isEmpty()) {
            existing.setFilePath(file.getOriginalFilename());
        }

        RegistrationApp updated = registrationRepository.save(existing);
        return ResponseEntity.ok(updated);
    }

    // ✅ Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        if (!registrationRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        registrationRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
