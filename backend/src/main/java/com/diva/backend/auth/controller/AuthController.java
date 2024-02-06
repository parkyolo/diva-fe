package com.diva.backend.auth.controller;

import static com.diva.backend.enumstorage.response.Status.SUCCESS;

import com.diva.backend.auth.dto.KakaoOAuthResponse;
import com.diva.backend.auth.service.AuthService;
import com.diva.backend.auth.service.OAuthService;
import com.diva.backend.dto.MemberFindDto;
import com.diva.backend.dto.Response;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping(value = "/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final OAuthService oauthService;

    private final ObjectMapper objectMapper;

    @Value("${KAKAO.CLIENT.ID}")
    private String kakaoClientId;

    @Value("${FRONTEND}")
    private String frontend;

    @Value("${FRONTEND.PORT}")
    private String frontendPort;

    @GetMapping(value = "/login/oauth2/authorization/{provider}")
    public String oAuth2AuthorizationV1(@PathVariable(name = "provider") String provider) {
        return "redirect:" + "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=" + kakaoClientId + "&redirect_uri=" + frontend + ":" + frontendPort + "/auth/login/oauth2/code/" + provider;
    }

    @GetMapping(value = "/login/oauth2/code/{provider}")
    public ResponseEntity oAuth2CodeV1(@PathVariable(name = "provider") String provider, @RequestParam(name = "code") String code, HttpServletResponse response) throws IOException {
        // Kakao에 Access Token을 요청한다.
        KakaoOAuthResponse kakaoOAuthResponse = oauthService.requestKakao(provider, code);

        // DB에 사용자 정보, Access Token, Refresh Token 저장
        MemberFindDto member = authService.signIn(kakaoOAuthResponse, response);

        return ResponseEntity.ok(Response.builder()
            .status(SUCCESS.getStatus())
            .data(objectMapper.writeValueAsString(member))
            .build());
    }
}
