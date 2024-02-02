package com.diva.backend.member.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberInfoUpdateResponseDto {
    private final String nickname;
    private final Boolean profileImg;

    @Builder
    public MemberInfoUpdateResponseDto(String nickname, Boolean profileImg) {
        this.nickname = nickname;
        this.profileImg = profileImg;
    }

}
