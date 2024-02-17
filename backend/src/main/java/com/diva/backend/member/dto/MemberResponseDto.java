package com.diva.backend.member.dto;

import com.diva.backend.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberResponseDto {
    private final Long memberId;

    private final String nickname;
    private final Boolean profileImg;
    private final String profileImgUrl;
    private final VocalRangeDto vocalRange;

    @Builder
    public MemberResponseDto(Long memberId, String nickname, Boolean profileImg, String profileImgUrl, VocalRangeDto vocalRange) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.profileImg = profileImg;
        this.profileImgUrl = profileImgUrl;
        this.vocalRange = vocalRange;
    }

    public static MemberResponseDto from (Member member, VocalRangeDto vocalRangeDto, String profileImgUrl) {
        return MemberResponseDto.builder()
            .memberId(member.getId())
            .nickname(member.getNickname())
            .profileImg(member.getProfileImg())
            .profileImgUrl(profileImgUrl)
            .vocalRange(vocalRangeDto)
            .build();
    }

}
