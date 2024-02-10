package com.diva.backend.member.service;

import com.diva.backend.member.dto.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MemberService {

    MemberResponseDto getMemberInfo(Long memberId);

    MemberInfoUpdateResponseDto updateInfo(Long memberId, MemberInfoUpdateRequestDto requestDto, MultipartFile file);

    List<MemberPostResponseDto> getMemberPosts(Long memberId);
}
