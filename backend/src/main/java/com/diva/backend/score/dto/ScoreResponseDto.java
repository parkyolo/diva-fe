package com.diva.backend.score.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED, force = true)
public class ScoreResponseDto {
    private final int score;

    @Builder
    protected ScoreResponseDto(int score) {
        this.score = score;
    }
}
