package com.diva.backend.member.service;

import com.diva.backend.member.dto.MemberNicknameUpdateRequestDto;
import com.diva.backend.member.dto.MemberProfileUpdateRequestDto;
import com.diva.backend.member.dto.MemberProfileUpdateResponseDto;
import com.diva.backend.member.dto.MemberResponseDto;
import com.diva.backend.member.dto.MemeberNicknameUpdateResponseDto;
import com.diva.backend.member.entity.Member;
import com.diva.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public MemberResponseDto getMemberInfo(String email) {
        Member member = memberRepository.findMemberByEmail(email)
            // NULL일 경우 exception 처리
            .orElseThrow(() -> new RuntimeException("해당하는 회원 없음"));
        return MemberResponseDto.builder()
            .nickname(member.getNickname())
            .email(member.getEmail())
            .profileImg(member.getProfileImg())
            .build();
    }


    @Override
    public MemeberNicknameUpdateResponseDto updateNickname(String email,
        MemberNicknameUpdateRequestDto requestDto) {
        Member member = memberRepository.findMemberByEmail(email)
            .orElseThrow(() -> new RuntimeException("해당하는 회원 없음"));
        if (requestDto == null) {
            throw new IllegalArgumentException("변경할 닉네임이 입력되지 않음");
        }
        member.setNickname(requestDto.getNickname());
        return MemeberNicknameUpdateResponseDto.builder()
            .nickname(member.getNickname())
            .build();
    }

    @Override
    public MemberProfileUpdateResponseDto updateProfile(String email,
        MemberProfileUpdateRequestDto requestDto) {
        Member member = memberRepository.findMemberByEmail(email)
            .orElseThrow(() -> new RuntimeException("해당하는 회원 없음"));
        member.setProfileImg(requestDto.getProfileImg());
        return MemberProfileUpdateResponseDto.builder()
            .profileImg(member.getProfileImg())
            .build();
    }
}
