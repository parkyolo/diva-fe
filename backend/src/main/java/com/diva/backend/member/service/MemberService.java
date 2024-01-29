package com.diva.backend.member.service;

import com.diva.backend.member.dto.*;
import java.util.List;

public interface MemberService {

    MemberResponseDto getMemberInfo(String email);

    MemeberNicknameUpdateResponseDto updateNickname(String email,
        MemberNicknameUpdateRequestDto requestDto);

    MemberProfileUpdateResponseDto updateProfile(String email,
        MemberProfileUpdateRequestDto requestDto);
}
