package com.diva.backend.member.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberProfileUpdateResponseDto {

    private String profileImg;

    @Builder
    public MemberProfileUpdateResponseDto(String profileImg) {
        this.profileImg = profileImg;
    }

}
