package com.diva.backend.auth.dto;

import static lombok.AccessLevel.PROTECTED;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = PROTECTED, force = true)
public class KakaoTokenResponse {
    private final String access_token;
    private final String token_type;
    private final String refresh_token;
    private final int expires_in;
    private final String scope;
    private final int refresh_token_expires_in;
}
