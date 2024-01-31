package com.diva.backend.post.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

// 게시글 작성 요청 DTO
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostCreateRequestDto {

    private String content;

    @NotNull
    private Long practiceResultId;

    @Builder
    protected PostCreateRequestDto(String content, Long practiceResultId) {
        this.content = content;
        this.practiceResultId = practiceResultId;
    }
}
