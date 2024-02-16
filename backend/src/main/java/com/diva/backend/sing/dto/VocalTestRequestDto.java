package com.diva.backend.sing.dto;

import static lombok.AccessLevel.PROTECTED;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = PROTECTED, force = true)
public class VocalTestRequestDto {
    private final String highestNote;
    private final String lowestNote;

    @Builder
    public VocalTestRequestDto(String highestNote, String lowestNote) {
        this.highestNote = highestNote;
        this.lowestNote = lowestNote;
    }

}
