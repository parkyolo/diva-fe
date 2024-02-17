package com.diva.backend.score.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
public class ScoreRequestDto {
    @NotBlank
    private final String artist;
    @NotBlank
    private final String title;

    @Builder
    protected ScoreRequestDto(String artist, String title) {
        this.artist = artist;
        this.title = title;
    }
}
