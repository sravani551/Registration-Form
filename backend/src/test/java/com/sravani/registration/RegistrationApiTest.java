package com.sravani.registration;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.not;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.nio.file.Files;
import java.nio.file.Path;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMultipartHttpServletRequestBuilder;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class RegistrationApiTest {

    @TempDir
    static Path uploads;

    @DynamicPropertySource
    static void storage(DynamicPropertyRegistry registry) {
        registry.add("app.storage.directory", () -> uploads.toString());
    }

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper json;

    private static MockMultipartHttpServletRequestBuilder form(MockMultipartHttpServletRequestBuilder b, String email) {
        b.param("firstName", "Ada").param("lastName", "Lovelace").param("email", email)
                .param("password", "s3cret-pass").param("gender", "female").param("dob", "1990-12-10");
        return b;
    }

    @Test
    void createsRegistrationWithoutExposingPassword() throws Exception {
        mvc.perform(form(multipart("/api/registrations"), "ada@example.com"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.gender").value("FEMALE"))
                .andExpect(content().string(not(containsString("password"))));
    }

    @Test
    void storesUploadUnderRandomKeyNotUserFileName() throws Exception {
        MockMultipartFile file = new MockMultipartFile("file", "../../evil.pdf", "application/pdf", "%PDF".getBytes());
        mvc.perform(form(multipart("/api/registrations").file(file), "ada@example.com"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.attachmentName").value("evil.pdf"));
        try (var files = Files.list(uploads)) {
            org.assertj.core.api.Assertions.assertThat(files.map(p -> p.getFileName().toString()))
                    .singleElement().asString().doesNotContain("evil");
        }
    }

    @Test
    void rejectsUnsupportedFileType() throws Exception {
        MockMultipartFile file = new MockMultipartFile("file", "x.exe", "application/octet-stream", new byte[] {1});
        mvc.perform(form(multipart("/api/registrations").file(file), "ada@example.com"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void duplicateEmailIsConflictCaseInsensitive() throws Exception {
        mvc.perform(form(multipart("/api/registrations"), "ada@example.com")).andExpect(status().isCreated());
        mvc.perform(form(multipart("/api/registrations"), "ADA@example.com"))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.errors.email").exists());
    }

    @Test
    void validationErrorsArePerField() throws Exception {
        mvc.perform(multipart("/api/registrations")
                        .param("firstName", "Ada1").param("lastName", "").param("email", "nope")
                        .param("password", "short").param("gender", "robot").param("dob", "2999-01-01"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.firstName").exists())
                .andExpect(jsonPath("$.errors.lastName").exists())
                .andExpect(jsonPath("$.errors.email").exists())
                .andExpect(jsonPath("$.errors.password").exists())
                .andExpect(jsonPath("$.errors.gender").exists())
                .andExpect(jsonPath("$.errors.dob").exists());
    }

    @Test
    void updateListAndDelete() throws Exception {
        String body = mvc.perform(form(multipart("/api/registrations"), "ada@example.com"))
                .andReturn().getResponse().getContentAsString();
        String id = json.readTree(body).get("id").asText();

        MockMultipartHttpServletRequestBuilder put = multipart(HttpMethod.PUT, "/api/registrations/{id}", id);
        put.param("firstName", "Augusta").param("lastName", "King").param("email", "ada@example.com")
                .param("gender", "female").param("dob", "1990-12-10");   // no password: keep existing
        mvc.perform(put).andExpect(status().isOk()).andExpect(jsonPath("$.firstName").value("Augusta"));

        mvc.perform(get("/api/registrations")).andExpect(jsonPath("$.length()").value(1));
        mvc.perform(delete("/api/registrations/{id}", id)).andExpect(status().isNoContent());
        mvc.perform(get("/api/registrations/{id}", id)).andExpect(status().isNotFound());
    }
}
