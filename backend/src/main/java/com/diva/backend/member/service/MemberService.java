package com.diva.backend.member.service;

import com.diva.backend.exception.NoPostException;
import com.diva.backend.exception.NoSuchMemberException;
import com.diva.backend.member.dto.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MemberService {

    MemberResponseDto getMemberInfo(Long memberId) throws NoSuchMemberException ;

    MemberInfoUpdateResponseDto updateInfo(Long memberId, MemberInfoUpdateRequestDto requestDto, MultipartFile file) throws NoSuchMemberException;

    List<MemberPostResponseDto> getMemberPosts(Long memberId) throws NoSuchMemberException, NoPostException;
}
