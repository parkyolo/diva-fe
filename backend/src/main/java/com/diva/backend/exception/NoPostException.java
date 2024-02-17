package com.diva.backend.exception;

public class NoPostException extends RuntimeException {
    private String message;

    public NoPostException(String message) {
        super(message);
    }
}
