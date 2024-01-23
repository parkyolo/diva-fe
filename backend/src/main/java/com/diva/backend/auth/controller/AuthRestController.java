package com.diva.backend.auth.controller;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.diva.backend.auth.exception.NoSuchRefreshTokenInDBException;
import com.diva.backend.auth.service.AuthService;
import com.diva.backend.dto.Response;
import com.diva.backend.exception.NoSuchMemberException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.ConstraintViolationException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

import static com.diva.backend.auth.service.JwtService.*;
import static com.diva.backend.enumstorage.cause.JwtCause.JWT;
import static com.diva.backend.enumstorage.messages.Messages.INVALID;
import static com.diva.backend.enumstorage.messages.Messages.REQUEST;
import static com.diva.backend.enumstorage.response.Status.FAIL;
import static org.apache.http.HttpStatus.SC_UNAUTHORIZED;
import static org.springframework.http.HttpStatus.GONE;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "/api/auth", consumes = APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class AuthRestController {
    private final AuthService authService;

    @PostMapping(value = "/reissue/v1")
    public ResponseEntity reissueJwtsV1(HttpServletRequest request, HttpServletResponse response) throws IllegalArgumentException, JWTVerificationException, IOException {
//        , NoSuchDeviceTokenException
        String[] jwts = authService.reissueJwts(request);

        // access token, refresh token을 헤더에 실어서 보낸다.
        response.setHeader(ACCESS_TOKEN_HEADER, BEARER + jwts[0]);
        response.setHeader(REFRESH_TOKEN_HEADER, BEARER + jwts[1]);

        return ResponseEntity.ok()
            .build();
    }

    // 필요한 인자가 없으면
    @ExceptionHandler({IllegalArgumentException.class, ConstraintViolationException.class})
    public ResponseEntity handle400Exception(Exception e) {
        // 400 Bad Request
        return ResponseEntity.badRequest()
            .body(Response.builder()
                .status(FAIL.getStatus())
                .message(REQUEST.getMessage() + INVALID.getMessage())
                .build());
    }

    // Refresh Token이 유효하지 않으면 || Refresh Token이 DB에 없으면 || Device Token이 DB에 없으면
    @ExceptionHandler({JWTVerificationException.class, NoSuchRefreshTokenInDBException.class})
//    , NoSuchDeviceTokenException.class
    public ResponseEntity handleUnauthorized(Exception e, HttpServletResponse response) {
        // ToDo: null 해도 되는지 테스트
        response.setContentType(APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        response.setHeader(ACCESS_TOKEN_HEADER, null);

        return ResponseEntity.status(SC_UNAUTHORIZED)
            .body(Response.builder()
                .status(FAIL.getStatus())
                .cause(JWT.getCause())
                .message(e.getMessage())
                .build());
    }

    @ExceptionHandler({NoSuchMemberException.class})
    public ResponseEntity handle410Exception(Exception e, HttpServletResponse response) {
        response.setContentType(APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        response.setHeader(ACCESS_TOKEN_HEADER, null);
        response.setHeader(REFRESH_TOKEN_HEADER, null);

        // 410 Gone
        return ResponseEntity.status(GONE)
            .body(Response.builder()
                .status(FAIL.getStatus())
                .message(e.getMessage())
                .build());
    }
}
