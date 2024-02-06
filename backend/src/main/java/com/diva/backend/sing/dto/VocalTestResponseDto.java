package com.diva.backend.sing.dto;

import com.diva.backend.member.dto.VocalRangeDto;
import com.fasterxml.jackson.annotation.ObjectIdGenerators.StringIdGenerator;
import lombok.Builder;
import lombok.Getter;

@Getter
public class VocalTestResponseDto {
    private final String highestNote;
    private final String lowestNote;
    private final Integer highestMidi;
    private final Integer lowestMidi;
    private final String matchingArtist;

    @Builder
    public VocalTestResponseDto(String highestNote, String lowestNote, Integer highestMidi, Integer lowestMidi, String matchingArtist) {
        this.highestNote = highestNote;
        this.lowestNote = lowestNote;
        this.highestMidi = highestMidi;
        this.lowestMidi = lowestMidi;
        this.matchingArtist = matchingArtist;
    }

}
