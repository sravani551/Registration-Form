package com.RegistrationApllication.Registration_Form_Application;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;


@Table(name = "registrations", uniqueConstraints = @UniqueConstraint(name = "uk_reg_email", columnNames = "email"))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Builder
@Entity
public class RegistrationApp {

    @Id
    @GeneratedValue
    private UUID id;

    @NotBlank(message = "First name is required")
    @Pattern(regexp = "^[A-Za-z]+$", message = "Only alphabets allowed")
    @Column(nullable = false)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Pattern(regexp = "^[A-Za-z]+$", message = "Only alphabets allowed")
    @Column(nullable = false)
    private String lastName;

    /** Store hash, not raw password */
    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    @Column(nullable = false)
    private String passwordHash;

    @NotNull(message = "Gender is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Column(nullable = false, unique = true)
    private String email;

    @NotNull(message = "Date of birth is required")
    @Column(nullable = false)
    private LocalDate dob;

    /** Name/path of uploaded file (resume, image, etc.) */
    private String filePath;
}

