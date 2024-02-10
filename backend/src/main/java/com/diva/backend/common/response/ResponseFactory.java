package com.diva.backend.common.response;

import com.google.firebase.ErrorCode;
import org.springframework.http.ResponseEntity;

public class ResponseFactory {
    public static ResponseEntity<?> success(String message, Object data) {
        SuccessResponseDto successResponse = new SuccessResponseDto(message, data);
        return ResponseEntity.status(200).body(successResponse);
    }

    public static ResponseEntity<?> success(String message) {
        // 값이 없을 때는 빈 문자열을 담음
        SuccessResponseDto successResponse = new SuccessResponseDto(message, "");
        return ResponseEntity.status(200).body(successResponse);
    }

    public static ResponseEntity<?> fail(String message, String errorCode, int statusCode) {
        FailResponseDto failResponse = new FailResponseDto(message, errorCode);
        return ResponseEntity.status(statusCode)
                .body(failResponse);
    }
}
