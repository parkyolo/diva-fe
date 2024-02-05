package com.diva.backend.sing.dto;

import com.diva.backend.song.entity.Song;
import lombok.Builder;
import lombok.Getter;

@Getter
public class TutorialResponseDto {
    private final String songTitle;
    private final String artist;

    @Builder
    public TutorialResponseDto(String songTitle, String artist) {
        this.songTitle = songTitle;
        this.artist = artist;
    }

    public static TutorialResponseDto from(Song song) {
        return TutorialResponseDto.builder()
            .songTitle(song.getTitle())
            .artist(song.getArtist())
            .build();
    }
}
