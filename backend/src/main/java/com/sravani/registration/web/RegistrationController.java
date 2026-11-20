package com.sravani.registration.web;

import java.util.List;
import java.util.UUID;

import com.sravani.registration.service.RegistrationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    private final RegistrationService service;

    public RegistrationController(RegistrationService service) {
        this.service = service;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public RegistrationResponse create(@Valid @ModelAttribute RegistrationForm form,
                                       @RequestPart(value = "file", required = false) MultipartFile file) {
        return RegistrationResponse.from(service.create(form, file));
    }

    @GetMapping
    public List<RegistrationResponse> list() {
        return service.findAll().stream().map(RegistrationResponse::from).toList();
    }

    @GetMapping("/{id}")
    public RegistrationResponse get(@PathVariable UUID id) {
        return RegistrationResponse.from(service.get(id));
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public RegistrationResponse update(@PathVariable UUID id, @Valid @ModelAttribute RegistrationForm form,
                                       @RequestPart(value = "file", required = false) MultipartFile file) {
        return RegistrationResponse.from(service.update(id, form, file));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        service.delete(id);
    }
}
