package com.diva.backend.score.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
public class ScorePythonRequestDto {
    @NotNull
    private final Long id;
    @NotBlank
    private final String artist;
    @NotBlank
    private final String title;

    @Builder
    protected ScorePythonRequestDto(Long id, String artist, String title) {
        this.id = id;
        this.artist = artist;
        this.title = title;
    }
}
