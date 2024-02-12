package com.diva.backend.exception;

public class NoVocalRangeException extends RuntimeException{
    private String message;

    public NoVocalRangeException(String message) {
        super(message);
    }
}
