package com.diva.backend.exception;

public class NoPracticeResultException extends RuntimeException {
    private String message;

    public NoPracticeResultException(String message) {
        super(message);
    }
}
