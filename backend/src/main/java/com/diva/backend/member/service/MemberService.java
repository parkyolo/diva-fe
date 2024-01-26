package com.diva.backend.member.service;

import com.diva.backend.member.dto.MemberResponseDto;

public interface MemberService {
    MemberResponseDto getMemberInfo(String email);

}
