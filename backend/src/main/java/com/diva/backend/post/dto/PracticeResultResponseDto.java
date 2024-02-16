package com.diva.backend.post.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PracticeResultResponseDto {

    @NotNull
    private Long practiceResultId;

    @NotNull
    private Integer score;

    @NotNull
    private SongResponseDto song;

    @Builder
    protected PracticeResultResponseDto(Long practiceResultId, Integer score, SongResponseDto song) {
        this.practiceResultId = practiceResultId;
        this.score = score;
        this.song = song;
    }
}
