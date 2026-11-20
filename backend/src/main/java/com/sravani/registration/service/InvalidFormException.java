package com.sravani.registration.service;

public class InvalidFormException extends RuntimeException {

    public InvalidFormException(String message) {
        super(message);
    }
}
