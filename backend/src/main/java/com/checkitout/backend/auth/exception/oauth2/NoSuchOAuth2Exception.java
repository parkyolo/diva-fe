package com.checkitout.backend.auth.exception.oauth2;

public class NoSuchOAuth2Exception extends RuntimeException {
    public NoSuchOAuth2Exception(String message) {
        super(message);
    }
}
