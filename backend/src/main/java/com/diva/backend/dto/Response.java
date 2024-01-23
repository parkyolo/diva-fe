package com.diva.backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED, force = true)
public class Response {
    private final String status;
    private final String data;
    private final String command;
    private final String cause;
    private final String message;

    @Builder
    protected Response(String status, String data, String command, String cause, String message) {
        this.status = status;
        this.data = data;
        this.command = command;
        this.cause = cause;
        this.message = message;
    }
}
