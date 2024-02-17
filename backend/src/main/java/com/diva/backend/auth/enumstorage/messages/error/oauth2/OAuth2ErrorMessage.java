package com.diva.backend.auth.enumstorage.messages.error.oauth2;

import lombok.Getter;

@Getter
public enum OAuth2ErrorMessage  {
    NO_SUCH_OAUTH_2("해당 OAuth2가 존재하지 않습니다."),

    NO_ATTRIBUTE("attribute가 존재하지 않습니다."),

    NO_KAKAO_ACCOUNT("kakao_account가 존재하지 않습니다."),

    // Provider
    NO_SUCH_PROVIDER("해당 provider가 존재하지 않습니다."),
    NO_PROVIDER_ID("providerId가 존재하지 않습니다."),

    // Email
    NO_EMAIL("email이 존재하지 않습니다."),
    INVALID_EMAIL("email이 유효하지 않습니다."),
    NOT_VERIFIED_EMAIL("email이 인증되지 않았습니다."),
    ;

    private final String message;

    OAuth2ErrorMessage(String message) {
        this.message = message;
    }
}
