package com.diva.backend.auth.dto;

import static lombok.AccessLevel.PROTECTED;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = PROTECTED, force = true)
public class KakaoOAuthRequest {
    private final String grant_type = "authorization_code";
    private final String client_id;
    private final String redirect_uri;
    private final String code;
    private final String client_secret;

    @Builder
    protected KakaoOAuthRequest(String client_id, String redirect_uri, String code, String client_secret) {
        this.client_id = client_id;
        this.redirect_uri = redirect_uri;
        this.code = code;
        this.client_secret = client_secret;
    }
}
