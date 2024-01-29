package com.diva.backend.auth.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED, force = true)
public class MemberFromJWT {
    private final Long memberId;
    private final String email;

    @Builder
    protected MemberFromJWT(Long memberId, String email) {
        this.memberId = memberId;
        this.email = email;
    }
}
