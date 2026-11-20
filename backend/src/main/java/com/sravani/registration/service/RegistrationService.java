package com.sravani.registration.service;

import java.util.List;
import java.util.Locale;
import java.util.UUID;

import com.sravani.registration.domain.Gender;
import com.sravani.registration.domain.Registration;
import com.sravani.registration.domain.RegistrationRepository;
import com.sravani.registration.web.RegistrationForm;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class RegistrationService {

    private final RegistrationRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final FileStorageService storage;

    public RegistrationService(RegistrationRepository repository, PasswordEncoder passwordEncoder,
                               FileStorageService storage) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.storage = storage;
    }

    @Transactional(readOnly = true)
    public List<Registration> findAll() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    @Transactional(readOnly = true)
    public Registration get(UUID id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("Registration " + id + " not found"));
    }

    @Transactional
    public Registration create(RegistrationForm form, MultipartFile file) {
        if (form.password() == null || form.password().isBlank()) {
            throw new InvalidFormException("password is required");
        }
        if (repository.existsByEmail(form.email().toLowerCase(Locale.ROOT))) {
            throw new DuplicateEmailException();
        }
        Registration registration = new Registration(form.firstName().strip(), form.lastName().strip(),
                form.email(), passwordEncoder.encode(form.password()), gender(form), form.dob());
        attach(registration, file);
        return repository.save(registration);
    }

    @Transactional
    public Registration update(UUID id, RegistrationForm form, MultipartFile file) {
        Registration registration = get(id);
        if (repository.existsByEmailAndIdNot(form.email().toLowerCase(Locale.ROOT), id)) {
            throw new DuplicateEmailException();
        }
        registration.update(form.firstName().strip(), form.lastName().strip(), form.email(), gender(form), form.dob());
        if (form.password() != null && !form.password().isBlank()) {
            registration.changePasswordHash(passwordEncoder.encode(form.password()));
        }
        if (file != null && !file.isEmpty()) {
            storage.delete(registration.getAttachmentKey());
            attach(registration, file);
        }
        return registration;
    }

    @Transactional
    public void delete(UUID id) {
        Registration registration = get(id);
        repository.delete(registration);
        storage.delete(registration.getAttachmentKey());
    }

    private void attach(Registration registration, MultipartFile file) {
        if (file != null && !file.isEmpty()) {
            FileStorageService.StoredFile stored = storage.store(file);
            registration.attach(stored.originalName(), stored.key());
        }
    }

    private static Gender gender(RegistrationForm form) {
        return Gender.valueOf(form.gender().toUpperCase(Locale.ROOT));
    }
}
