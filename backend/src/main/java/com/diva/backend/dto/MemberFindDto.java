package com.diva.backend.dto;

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

    @NotNull
    private Long providerId;

    @NotBlank
    private String nickname;

    @Builder
    protected MemberFindDto(Long id, Long providerId, String nickname) {
        this.id = id;
        this.providerId = providerId;
        this.nickname = nickname;
    }
}
