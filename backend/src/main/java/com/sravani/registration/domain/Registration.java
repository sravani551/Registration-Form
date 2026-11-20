package com.sravani.registration.domain;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "registrations", uniqueConstraints = @UniqueConstraint(name = "uk_registration_email", columnNames = "email"))
public class Registration {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, length = 50)
    private String firstName;

    @Column(nullable = false, length = 50)
    private String lastName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Gender gender;

    @Column(nullable = false)
    private LocalDate dob;

    /** Name the user uploaded, for display. */
    private String attachmentName;

    /** Server-side storage key (random, never derived from user input). */
    private String attachmentKey;

    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    protected Registration() {
        // for JPA
    }

    public Registration(String firstName, String lastName, String email, String passwordHash, Gender gender,
                        LocalDate dob) {
        update(firstName, lastName, email, gender, dob);
        this.passwordHash = passwordHash;
    }

    public final void update(String firstName, String lastName, String email, Gender gender, LocalDate dob) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email.toLowerCase();
        this.gender = gender;
        this.dob = dob;
    }

    public void changePasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public void attach(String originalName, String storageKey) {
        this.attachmentName = originalName;
        this.attachmentKey = storageKey;
    }

    public UUID getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public Gender getGender() {
        return gender;
    }

    public LocalDate getDob() {
        return dob;
    }

    public String getAttachmentName() {
        return attachmentName;
    }

    public String getAttachmentKey() {
        return attachmentKey;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}
