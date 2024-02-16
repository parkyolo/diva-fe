package com.diva.backend.exception;

// DB에 해당 회원이 없을 때 발생하는 예외
public class NoSuchMemberException extends RuntimeException {
    private String email;

    public NoSuchMemberException(String message) {
        super(message);
    }

    public NoSuchMemberException(String message, String email) {
        super(message);
        this.email = email;
    }
}
