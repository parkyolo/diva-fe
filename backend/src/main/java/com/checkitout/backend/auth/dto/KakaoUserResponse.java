package com.checkitout.backend.auth.dto;

import static lombok.AccessLevel.PROTECTED;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = PROTECTED, force = true)
public class KakaoUserResponse {
    private final Long id;
    private final String connected_at;
    private final KakaoAccount kakao_account;
}
