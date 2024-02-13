package com.diva.backend.post.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class PracticeResultUploadResponseDto {
    private final Long practiceResultId;

    @Builder
    public PracticeResultUploadResponseDto(Long practiceResultId) {
        this.practiceResultId = practiceResultId;
    }
}
