package com.diva.backend.member.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MemeberNicknameUpdateResponseDto {

    private final String nickname;

    @Builder
    public MemeberNicknameUpdateResponseDto(String nickname) {
        this.nickname = nickname;
    }
}
