package com.diva.backend.member.dto;

import static lombok.AccessLevel.PROTECTED;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = PROTECTED, force = true)
public class MemberProfileUpdateRequestDto {

    private final String profileImg;
}
