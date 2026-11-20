package com.sravani.registration.web;

import java.util.Map;
import java.util.TreeMap;

import com.sravani.registration.service.DuplicateEmailException;
import com.sravani.registration.service.InvalidFormException;
import com.sravani.registration.service.NotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

/** RFC 9457 problem details; validation errors carry a per-field "errors" map for the form. */
@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(BindException.class)
    ProblemDetail validation(BindException e) {
        Map<String, String> errors = new TreeMap<>();
        e.getFieldErrors().forEach(err -> errors.putIfAbsent(err.getField(), err.getDefaultMessage()));
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, "Validation failed");
        problem.setProperty("errors", errors);
        return problem;
    }

    @ExceptionHandler(InvalidFormException.class)
    ProblemDetail invalid(InvalidFormException e) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getMessage());
    }

    @ExceptionHandler(NotFoundException.class)
    ProblemDetail notFound(NotFoundException e) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
    }

    @ExceptionHandler({DuplicateEmailException.class, DataIntegrityViolationException.class})
    ProblemDetail duplicate(RuntimeException e) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, "Email is already registered");
        problem.setProperty("errors", Map.of("email", "is already registered"));
        return problem;
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    ProblemDetail tooLarge(MaxUploadSizeExceededException e) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.PAYLOAD_TOO_LARGE, "File is too large (max 5 MB)");
    }
}
