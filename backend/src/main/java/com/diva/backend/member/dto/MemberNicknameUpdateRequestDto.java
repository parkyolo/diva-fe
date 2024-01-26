package com.diva.backend.member.dto;

import static lombok.AccessLevel.PROTECTED;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = PROTECTED, force = true)
public class MemberNicknameUpdateRequestDto {

    private final String nickname;
}

