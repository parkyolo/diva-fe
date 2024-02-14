package com.diva.backend.recommend.service.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED, force = true)
public class RecommendedSongsResponseDto {

    private final Long songId;
    private final String title;
    private final String artist;
    private final String coverImg;
    private final Integer similarity;

    @Builder
    public RecommendedSongsResponseDto(Long songId, String title, String artist, String coverImg, Integer similarity) {
        this.songId = songId;
        this.title = title;
        this.artist = artist;
        this.coverImg = coverImg;
        this.similarity = similarity;
    }

}
