package com.diva.backend.enumstorage.messages;

import lombok.Getter;

@Getter
public enum BoardMessages {
    BOARD("게시판 ");

    private final String message;

    private BoardMessages(String message) {
        this.message = message;
    }
}
