package com.diva.backend.common.exception;

public interface ErrorCode {
    String getMessage();
    String getErrorCode();
    int getStatusCode();
}
