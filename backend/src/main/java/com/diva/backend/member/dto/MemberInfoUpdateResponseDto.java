package com.diva.backend.member.dto;

import com.diva.backend.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberInfoUpdateResponseDto {
    private final String nickname;
    private final Boolean profileImg;
    private final String profileImgUrl;

    @Builder
    public MemberInfoUpdateResponseDto(String nickname, Boolean profileImg, String profileImgUrl) {
        this.nickname = nickname;
        this.profileImg = profileImg;
        this.profileImgUrl = profileImgUrl;
    }

    public static MemberInfoUpdateResponseDto from (Member member, String profileImgUrl){
        return MemberInfoUpdateResponseDto.builder()
                .nickname(member.getNickname())
                .profileImg(member.getProfileImg())
                .profileImgUrl(profileImgUrl)
                .build();
    }
}
