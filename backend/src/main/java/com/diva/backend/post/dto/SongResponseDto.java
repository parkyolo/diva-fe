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

    private String title;

    private String artist;

    @Builder
    public SongResponseDto(Long songId, String title, String artist) {
        this.songId = songId;
        this.title = title;
        this.artist = artist;
    }
}
