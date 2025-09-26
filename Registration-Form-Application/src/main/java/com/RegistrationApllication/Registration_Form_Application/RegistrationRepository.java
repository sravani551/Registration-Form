package com.RegistrationApllication.Registration_Form_Application;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface RegistrationRepository extends JpaRepository<RegistrationApp, UUID>{
    Optional<RegistrationApp> findByEmail(String email);
    boolean existsByEmail(String email);

}
