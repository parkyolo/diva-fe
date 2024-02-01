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
    private final String gender;

    @Builder
    public VocalTestRequestDto(String highestNote, String lowestNote, String gender) {
        this.highestNote = highestNote;
        this.lowestNote = lowestNote;
        this.gender = gender;
    }

}
