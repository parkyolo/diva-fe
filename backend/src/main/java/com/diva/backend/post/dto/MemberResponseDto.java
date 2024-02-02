package com.diva.backend.post.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberResponseDto {

    @NotNull
    private Long memberId;

    @NotBlank
    private String nickname;

    private Boolean profileImg;

    @Builder
    protected MemberResponseDto(Long memberId, String nickname, Boolean profileImg) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.profileImg = profileImg;
    }
}
