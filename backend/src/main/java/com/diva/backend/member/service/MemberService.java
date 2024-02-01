package com.diva.backend.member.service;

import com.diva.backend.member.dto.*;
import java.util.List;

public interface MemberService {

    MemberResponseDto getMemberInfo(String email);

    MemberInfoUpdateResponseDto updateInfo(String email, MemberInfoUpdateRequestDto requestDto);

    List<MemberPostResponseDto> getMemberPosts(String email);
}
