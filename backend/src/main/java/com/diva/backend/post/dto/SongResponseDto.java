package com.diva.backend.post.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SongResponseDto {
    @NotNull
    private Long songId;

    @NotNull
    private String title;

    @NotNull
    private String artist;

    @NotNull
    private String coverImg;

    @Builder
    protected SongResponseDto(Long songId, String title, String artist, String coverImg) {
        this.songId = songId;
        this.title = title;
        this.artist = artist;
        this.coverImg = coverImg;
    }
}
