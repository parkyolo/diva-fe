package com.diva.backend.post.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class PracticeResultUploadResponseDto {
    private final Long practiceResultId;
    private final LocalDateTime createdDate;

    @Builder
    public PracticeResultUploadResponseDto(Long practiceResultId, LocalDateTime createdDate) {
        this.practiceResultId = practiceResultId;
        this.createdDate = createdDate;
    }
}
