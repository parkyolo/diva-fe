package com.diva.backend.member.dto;

import com.diva.backend.member.entity.Member;
import com.diva.backend.member.entity.VocalRange;
import com.diva.backend.song.dto.SavedSongsResponseDto;
import com.diva.backend.song.entity.Song;
import lombok.Builder;
import lombok.Getter;

@Getter

public class MemberResponseDto {
    private final Long memberId;

    private final String nickname;
    private final String email;
    private final Boolean profileImg;
    private final VocalRangeDto vocalRange;

    @Builder
    public MemberResponseDto(Long memberId, String nickname, String email, Boolean profileImg, VocalRangeDto vocalRange) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.email = email;
        this.profileImg = profileImg;
        this.vocalRange = vocalRange;
    }

    public static MemberResponseDto from (Member member, VocalRangeDto vocalRangeDto) {
        return MemberResponseDto.builder()
            .memberId(member.getId())
            .nickname(member.getNickname())
            .email(member.getEmail())
            .profileImg(member.getProfileImg())
            .vocalRange(vocalRangeDto)
            .build();
    }

}
