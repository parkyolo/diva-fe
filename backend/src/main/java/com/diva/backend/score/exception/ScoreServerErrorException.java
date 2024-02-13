package com.diva.backend.score.exception;

import lombok.Getter;

@Getter
public class ScoreServerErrorException extends RuntimeException {
    private final String message;

    public ScoreServerErrorException(String message) {
        this.message = message;
    }
}
