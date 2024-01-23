package com.diva.backend.exception;

// DB에 저장된 디바이스 토큰이 없을 때 발생하는 예외
public class NoSuchDeviceTokenException extends RuntimeException {
    public NoSuchDeviceTokenException(String message) {
        super(message);
    }
}
