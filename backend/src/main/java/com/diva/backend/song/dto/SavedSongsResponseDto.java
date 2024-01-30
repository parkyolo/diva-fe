package com.diva.backend.song.dto;

import com.diva.backend.song.entity.Song;
import lombok.Builder;
import lombok.Getter;

@Getter
public class SavedSongsResponseDto {
    private final String coverImg;
    private final String songTitle;

    @Builder
    public SavedSongsResponseDto(String coverImg, String songTitle) {
        this.coverImg = coverImg;
        this.songTitle = songTitle;
    }

    // from to of
    public static SavedSongsResponseDto from (Song song) {
        return SavedSongsResponseDto.builder()
                .coverImg(song.getCoverImg())
                .songTitle(song.getTitle())
                .build();
    }

}
