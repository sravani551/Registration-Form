package com.sravani.registration.web;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.format.annotation.DateTimeFormat;

/**
 * Text fields of the multipart registration form. The password is optional here because
 * updates may leave it unchanged; creation enforces it in the service.
 */
public record RegistrationForm(
        @NotBlank @Size(max = 50) @Pattern(regexp = "^[\\p{L}][\\p{L} '-]*$", message = "must contain only letters") String firstName,
        @NotBlank @Size(max = 50) @Pattern(regexp = "^[\\p{L}][\\p{L} '-]*$", message = "must contain only letters") String lastName,
        @NotBlank @Email @Size(max = 254) String email,
        @Size(min = 8, max = 72) String password,
        @NotNull @Pattern(regexp = "(?i)male|female|other", message = "must be male, female or other") String gender,
        @NotNull @Past @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dob) {
}
