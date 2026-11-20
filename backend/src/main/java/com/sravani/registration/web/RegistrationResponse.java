package com.sravani.registration.web;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

import com.sravani.registration.domain.Gender;
import com.sravani.registration.domain.Registration;

/** API view of a registration. The password hash and storage key never leave the service. */
public record RegistrationResponse(UUID id, String firstName, String lastName, String email, Gender gender,
                                   LocalDate dob, String attachmentName, Instant createdAt) {

    public static RegistrationResponse from(Registration r) {
        return new RegistrationResponse(r.getId(), r.getFirstName(), r.getLastName(), r.getEmail(), r.getGender(),
                r.getDob(), r.getAttachmentName(), r.getCreatedAt());
    }
}
