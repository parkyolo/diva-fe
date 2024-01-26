package com.diva.backend.post.dto;

import com.diva.backend.entity.BaseEntity;
import com.diva.backend.member.entity.Member;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberPostDto extends BaseEntity {

    @NotNull
    private Long id;

    @NotBlank
    private String nickname;

    @NotBlank
    private String profileImg;

    @Builder
    protected MemberPostDto(Long id, String nickname, String profileImg) {
        this.id = id;
        this.nickname = nickname;
        this.profileImg = profileImg;
    }
}
