package com.diva.backend.auth.dto;

import static lombok.AccessLevel.PROTECTED;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = PROTECTED, force = true)
public class KakaoAccount {
    private final Boolean has_email;
    private final Boolean email_needs_agreement;
    private final Boolean is_email_valid;
    private final Boolean is_email_verified;
    private final String email;
}
