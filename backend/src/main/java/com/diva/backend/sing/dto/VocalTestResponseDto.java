package com.diva.backend.sing.dto;

import com.diva.backend.member.dto.VocalRangeDto;
import com.fasterxml.jackson.annotation.ObjectIdGenerators.StringIdGenerator;
import lombok.Builder;
import lombok.Getter;

@Getter
public class VocalTestResponseDto {
    private final String highestNote;
    private final String lowestNote;

    @Builder
    public VocalTestResponseDto(String highestNote, String lowestNote) {
        this.highestNote = highestNote;
        this.lowestNote = lowestNote;
    }

}
