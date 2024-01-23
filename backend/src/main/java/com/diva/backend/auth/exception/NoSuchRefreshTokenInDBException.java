package com.diva.backend.auth.exception;

// DB에 Refresh Token이 없을 때 발생하는 예외
public class NoSuchRefreshTokenInDBException extends RuntimeException {
    private final String message;

    public NoSuchRefreshTokenInDBException(String message) {
        this.message = message;
    }
}
