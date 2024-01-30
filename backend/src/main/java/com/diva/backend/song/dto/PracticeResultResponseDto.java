package com.diva.backend.song.dto;

import com.diva.backend.post.entity.PracticeResult;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
public class PracticeResultResponseDto {
    private final String songTitle;
    private final String coverImg;
    private final LocalDateTime createdDate;

    @Builder
    public PracticeResultResponseDto(String songTitle, String coverImg, LocalDateTime createdDate) {
        this.songTitle = songTitle;
        this.coverImg = coverImg;
        this.createdDate = createdDate;
    }

    public static PracticeResultResponseDto from (PracticeResult practiceResult) {
        return PracticeResultResponseDto.builder()
            .songTitle(practiceResult.getSong().getTitle())
            .coverImg(practiceResult.getSong().getCoverImg())
            .createdDate(practiceResult.getCreatedDate())
            .build();
    }
}
