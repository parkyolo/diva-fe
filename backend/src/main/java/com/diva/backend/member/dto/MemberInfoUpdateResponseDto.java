package com.diva.backend.member.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberInfoUpdateResponseDto {
    private final String nickname;
    private final String profileImg;

    @Builder
    public MemberInfoUpdateResponseDto(String nickname, String profileImg) {
        this.nickname = nickname;
        this.profileImg = profileImg;
    }

}
