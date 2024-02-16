package com.diva.backend.song.dto;

import com.diva.backend.song.entity.Song;
import lombok.Builder;
import lombok.Getter;

@Getter
public class SongWithSimilarityDto {
    private final Song song;
    private final Double similarity;

    @Builder
    protected SongWithSimilarityDto(Song song, Double similarity) {
        this.song = song;
        this.similarity = similarity;
    }
}
