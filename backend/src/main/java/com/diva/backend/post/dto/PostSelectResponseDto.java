package com.diva.backend.post.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostSelectResponseDto {

    @NotNull
    private Long postId;

    private String content;

    @NotNull
    private MemberResponseDto member;

    @NotNull
    private PracticeResultResponseDto practiceResult;

    @NotNull
    private Integer likesCount;

    @Builder
    protected PostSelectResponseDto(Long postId, String content, MemberResponseDto member, PracticeResultResponseDto practiceResult, Integer likesCount) {
        this.postId = postId;
        this.content = content;
        this.member = member;
        this.practiceResult = practiceResult;
        this.likesCount = likesCount;
    }
}
