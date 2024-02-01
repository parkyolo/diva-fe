package com.diva.backend.member.dto;

import static lombok.AccessLevel.PROTECTED;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = PROTECTED, force = true)
public class MemberInfoUpdateRequestDto {
    private final String nickname;
    private final String profileImg;

    @Builder
    public MemberInfoUpdateRequestDto(String nickname, String profileImg) {
        this.nickname = nickname;
        this.profileImg = profileImg;
    }

}
