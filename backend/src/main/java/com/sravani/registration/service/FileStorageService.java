package com.sravani.registration.service;

import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

/**
 * Stores uploads on disk under a random key. The user's file name is kept only for display:
 * it is never used to build a path, which rules out path traversal ("../../etc/passwd").
 */
@Service
public class FileStorageService {

    private final StorageProperties properties;

    public FileStorageService(StorageProperties properties) {
        this.properties = properties;
    }

    public StoredFile store(MultipartFile file) {
        if (!properties.allowedContentTypes().contains(file.getContentType())) {
            throw new InvalidFormException("Unsupported file type: " + file.getContentType());
        }
        String key = UUID.randomUUID().toString();
        try (InputStream in = file.getInputStream()) {
            Path dir = Files.createDirectories(properties.directory());
            Files.copy(in, dir.resolve(key), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new UncheckedIOException("Could not store upload", e);
        }
        String displayName = StringUtils.getFilename(StringUtils.cleanPath(
                file.getOriginalFilename() == null ? "upload" : file.getOriginalFilename()));
        return new StoredFile(displayName, key);
    }

    public void delete(String key) {
        if (key == null) {
            return;
        }
        try {
            Files.deleteIfExists(properties.directory().resolve(key));
        } catch (IOException e) {
            throw new UncheckedIOException("Could not delete upload", e);
        }
    }

    public record StoredFile(String originalName, String key) {
    }
}
