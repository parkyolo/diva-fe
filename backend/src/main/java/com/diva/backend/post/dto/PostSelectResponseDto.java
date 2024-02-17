package com.diva.backend.post.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED, force = true)
public class PostSelectResponseDto {
    private final Long postId;
    private final String content;
    private final Long memberId;
    private final Long practiceResultId;
    private final Long songId;
    private final Boolean liked;
    private final Integer heartCount;
    private final LocalDateTime createdDate;

    @Builder
    protected PostSelectResponseDto(Long postId, String content, Long memberId, Long practiceResultId, Long songId, Boolean liked, Integer heartCount, LocalDateTime createdDate) {
        this.postId = postId;
        this.content = content;
        this.memberId = memberId;
        this.practiceResultId = practiceResultId;
        this.songId = songId;
        this.liked = liked;
        this.heartCount = heartCount;
        this.createdDate = createdDate;
    }
}
