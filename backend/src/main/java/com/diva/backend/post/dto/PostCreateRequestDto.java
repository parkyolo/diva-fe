package com.diva.backend.post.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
