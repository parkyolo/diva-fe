package com.diva.backend.member.dto;

import lombok.Builder;
import lombok.Getter;

@Getter

public class MemberResponseDto {

    private final String nickname;
    private final String email;
    private final String profileImg;

    @Builder
    public MemberResponseDto(String nickname, String email, String profileImg) {
        this.nickname = nickname;
        this.email = email;
        this.profileImg = profileImg;
    }

}
