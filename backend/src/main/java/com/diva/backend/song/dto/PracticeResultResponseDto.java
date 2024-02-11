package com.diva.backend.song.dto;

import com.diva.backend.post.entity.PracticeResult;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
public class PracticeResultResponseDto {
    private final Long practiceResultId;
    private final String songTitle;
    private final String coverImg;
    private final LocalDateTime createdDate;
    private final String artist;
    private final Integer score;

    @Builder
    public PracticeResultResponseDto(Long practiceResultId, String songTitle, String coverImg, LocalDateTime createdDate, String artist, Integer score) {
        this.practiceResultId = practiceResultId;
        this.songTitle = songTitle;
        this.coverImg = coverImg;
        this.createdDate = createdDate;
        this.artist = artist;
        this.score = score;
    }

    public static PracticeResultResponseDto from (PracticeResult practiceResult) {
        return PracticeResultResponseDto.builder()
            .practiceResultId(practiceResult.getId())
            .songTitle(practiceResult.getSong().getTitle())
            .coverImg(practiceResult.getSong().getCoverImg())
            .createdDate(practiceResult.getCreatedDate())
            .artist(practiceResult.getSong().getArtist())
            .score(practiceResult.getScore())
            .build();
    }
}
