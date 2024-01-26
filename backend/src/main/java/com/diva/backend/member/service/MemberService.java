package com.diva.backend.member.service;

import com.diva.backend.member.dto.MemberNicknameUpdateRequestDto;
import com.diva.backend.member.dto.MemberProfileUpdateRequestDto;
import com.diva.backend.member.dto.MemberProfileUpdateResponseDto;
import com.diva.backend.member.dto.MemberResponseDto;
import com.diva.backend.member.dto.MemeberNicknameUpdateResponseDto;

public interface MemberService {

    MemberResponseDto getMemberInfo(String email);

    MemeberNicknameUpdateResponseDto updateNickname(String email,
        MemberNicknameUpdateRequestDto requestDto);

    MemberProfileUpdateResponseDto updateProfile(String email,
        MemberProfileUpdateRequestDto requestDto);
}
