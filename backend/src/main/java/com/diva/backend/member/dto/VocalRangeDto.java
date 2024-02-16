package com.diva.backend.member.dto;

import com.diva.backend.member.entity.Member;
import com.diva.backend.member.entity.VocalRange;
import lombok.Builder;
import lombok.Getter;

@Getter
public class VocalRangeDto {
    private final String highestNote;
    private final String lowestNote;

    @Builder
    public VocalRangeDto(String highestNote, String lowestNote) {
        this.highestNote = highestNote;
        this.lowestNote = lowestNote;
    }

    public static VocalRangeDto from (VocalRange vocalRange) {
        return VocalRangeDto.builder()
            .highestNote(vocalRange.getHighestNote())
            .lowestNote(vocalRange.getLowestNote())
            .build();
    }
}
