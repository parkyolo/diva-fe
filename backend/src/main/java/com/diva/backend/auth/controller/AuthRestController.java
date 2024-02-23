package com.diva.backend.auth.controller;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.diva.backend.auth.dto.KakaoOAuthResponse;
import com.diva.backend.auth.exception.NoSuchRefreshTokenInDBException;
import com.diva.backend.auth.service.AuthService;
import com.diva.backend.auth.service.OAuthService;
import com.diva.backend.dto.MemberFindDto;
import com.diva.backend.dto.Response;
import com.diva.backend.exception.NoSuchMemberException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.ConstraintViolationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Enumeration;

import static com.diva.backend.auth.service.JwtService.*;
import static com.diva.backend.enumstorage.cause.JwtCause.JWT;
import static com.diva.backend.enumstorage.messages.Messages.INVALID;
import static com.diva.backend.enumstorage.messages.Messages.REQUEST;
import static com.diva.backend.enumstorage.response.Status.FAIL;
import static com.diva.backend.enumstorage.response.Status.SUCCESS;
import static org.apache.http.HttpStatus.SC_UNAUTHORIZED;
import static org.springframework.http.HttpStatus.GONE;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
@RestController
@RequestMapping(value = "/api/auth")
@RequiredArgsConstructor
public class AuthRestController {
    private final AuthService authService;
    private final OAuthService oauthService;

    private final ObjectMapper objectMapper;

    @Value("${KAKAO.CLIENT.ID}")
    private String kakaoClientId;

    @Value("${FRONTEND}")
    private String frontend;

    @Value("${FRONTEND.PORT}")
    private String frontendPort;

    @Value("${spring.profiles.active}")
    private String activeProfile;

    @GetMapping(value = "/login/oauth2/authorization/{provider}")
    public void oAuth2AuthorizationV1(@PathVariable(name = "provider") String provider, HttpServletRequest request, HttpServletResponse response) throws IOException {
        String requestUrl = getHttpAndDomain(request);

        response.sendRedirect("https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=" + kakaoClientId + "&redirect_uri=" + requestUrl + "/auth/login/oauth2/code/" + provider);
    }

    @GetMapping(value = "/login/oauth2/code/{provider}")
    public ResponseEntity<?> oAuth2CodeV1(@PathVariable(name = "provider") String provider, @RequestParam(name = "code") String code, HttpServletRequest request, HttpServletResponse response) throws IOException, NoSuchMemberException {
        log.info("code: " + code);

        // 요청한 url을 가져온다.
        String requestUrl = getHttpAndDomain(request);
        log.info("requestUrl: " + requestUrl);

        // Kakao에 Access Token을 요청한다.
        KakaoOAuthResponse kakaoOAuthResponse = oauthService.requestKakao(provider, code, requestUrl);

        // DB에 사용자 정보, Access Token, Refresh Token 저장
        MemberFindDto member = authService.signIn(kakaoOAuthResponse, response);

        return ResponseEntity.ok(Response.builder()
                .status(SUCCESS.getStatus())
                .data(objectMapper.writeValueAsString(member))
                .build());
    }

    @PostMapping(value = "/reissue/v1", consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<?> reissueJwtsV1(HttpServletRequest request, HttpServletResponse response) throws IllegalArgumentException, JWTVerificationException, IOException {
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
    public ResponseEntity<?> handle400Exception(Exception e) {
        log.info(e.getMessage());

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
    public ResponseEntity<?> handleUnauthorized(Exception e, HttpServletResponse response) {
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
    public ResponseEntity<?> handle410Exception(Exception e, HttpServletResponse response) {
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

    private String getHttpAndDomain(HttpServletRequest request) {
        // request의 domain을 가져온다.
        String xForwardedHost = request.getHeader("x-forwarded-host");
        log.info("x-forwarded-host: " + xForwardedHost);
        // http://localhost:3000/auth/login/oauth2/code/kakao?code=EGhvUbUYMBzvBOTjYaZlN5HDY-ST_SFqVyCH1IaxHfdfK4PNaKB066Q7kH0KPXNOAAABjbYKJreo9NUiJo7xnA
        if (xForwardedHost != null && xForwardedHost.contains("localhost")) {
            // 프론트 local
            String result = "http://" + xForwardedHost;
            log.info("result: " + result);
            return result;
        }

        String origin = request.getHeader(HttpHeaders.ORIGIN);
        log.info("origin: " + origin);

        if (origin != null) {
            // 프론트 local, 백엔드 dev
            log.info("origin: " + origin);
            return origin;
        }
        else {
            // 프론트 dev, 백엔드 dev
            log.info("frontend: " + frontend);
            return frontend;
        }
    }
}
