package com.diva.backend.song.dto;

import com.diva.backend.song.entity.SavedSong;
import com.diva.backend.song.entity.Song;
import lombok.Builder;
import lombok.Getter;

@Getter
public class SavedSongsResponseDto {
    private final Long savedSongId;
    private final Long songId;
    private final String coverImg;
    private final String songTitle;

    @Builder
    public SavedSongsResponseDto(Long savedSongId, Long songId, String coverImg, String songTitle) {
        this.savedSongId = savedSongId;
        this.songId = songId;
        this.coverImg = coverImg;
        this.songTitle = songTitle;
    }


    public static SavedSongsResponseDto from (SavedSong savedSong, Song song) {
        return SavedSongsResponseDto.builder()
            .savedSongId(savedSong.getId())
            .songId(song.getId())
            .coverImg(song.getCoverImg())
            .songTitle(song.getTitle())
            .build();
    }

}
