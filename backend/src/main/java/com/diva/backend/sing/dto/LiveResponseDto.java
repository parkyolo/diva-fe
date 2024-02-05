package com.diva.backend.sing.dto;

import com.diva.backend.song.entity.Song;
import lombok.Builder;
import lombok.Getter;

@Getter
public class LiveResponseDto {
    private final String songTitle;
    private final String artist;

    @Builder
    public LiveResponseDto(String songTitle, String artist) {
        this.songTitle = songTitle;
        this.artist = artist;
    }

    public static LiveResponseDto from(Song song) {
        return LiveResponseDto.builder()
            .songTitle(song.getTitle())
            .artist(song.getArtist())
            .build();
    }

}
