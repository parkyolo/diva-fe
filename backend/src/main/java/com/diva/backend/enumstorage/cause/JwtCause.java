package com.diva.backend.enumstorage.cause;

import lombok.Getter;

@Getter
public enum JwtCause {
    JWT("jwt");
    
    private final String cause;

    private JwtCause(String cause) {
        this.cause = cause;
    }
}
