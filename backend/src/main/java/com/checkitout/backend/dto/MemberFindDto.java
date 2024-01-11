package com.checkitout.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class MemberFindDto {
    @NotNull
    private Long id;

    @NotBlank
    private String email;

    @NotBlank
    private String nickname;

    @Builder
    protected MemberFindDto(Long id, String email, String nickname) {
        this.id = id;
        this.nickname = nickname;
        this.email = email;
    }
}
