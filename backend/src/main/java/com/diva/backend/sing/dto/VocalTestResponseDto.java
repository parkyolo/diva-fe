package com.diva.backend.sing.dto;

import com.diva.backend.member.dto.VocalRangeDto;
import com.fasterxml.jackson.annotation.ObjectIdGenerators.StringIdGenerator;
import lombok.Builder;
import lombok.Getter;

@Getter
public class VocalTestResponseDto {
    private final String highestNote;
    private final String lowestNote;
    private final String matchingArtist;

    @Builder
    public VocalTestResponseDto(String highestNote, String lowestNote, String matchingArtist) {
        this.highestNote = highestNote;
        this.lowestNote = lowestNote;
        this.matchingArtist = matchingArtist;
    }

}
