package com.diva.backend.sing.dto;

import com.diva.backend.post.entity.PracticeResult;
import lombok.Builder;
import lombok.Getter;

@Getter
public class LiveUploadResponseDto {
    private final Long practiceResultId;
    private final int score;

    @Builder
    public LiveUploadResponseDto(Long practiceResultId, int score) {
        this.practiceResultId = practiceResultId;
        this.score = score;
    }

    public static LiveUploadResponseDto from (PracticeResult practiceResult) {
        return LiveUploadResponseDto.builder()
            .practiceResultId(practiceResult.getId())
            .score(practiceResult.getScore())
            .build();
    }
}
