package com.sravani.registration.service;

import java.nio.file.Path;
import java.util.Set;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.storage")
public record StorageProperties(Path directory, Set<String> allowedContentTypes) {
}
