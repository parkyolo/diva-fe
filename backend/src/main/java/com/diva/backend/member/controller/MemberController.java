package com.diva.backend.member.controller;

import com.diva.backend.member.dto.MemberNicknameUpdateRequestDto;
import com.diva.backend.member.dto.MemberProfileUpdateRequestDto;
import com.diva.backend.member.dto.MemberProfileUpdateResponseDto;
import com.diva.backend.member.dto.MemberResponseDto;
import com.diva.backend.member.dto.MemeberNicknameUpdateResponseDto;
import com.diva.backend.member.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/members")
    public MemberResponseDto getMemberInfo(HttpServletRequest request) {
        String email = (String) request.getAttribute("email");
        return memberService.getMemberInfo(email);
    }

    @PatchMapping("/members/nickname")
    public MemeberNicknameUpdateResponseDto updateNickname(
        @RequestBody MemberNicknameUpdateRequestDto requestDto, HttpServletRequest request) {
        String email = (String) request.getAttribute("email");
        return memberService.updateNickname(email, requestDto);
    }

    @PatchMapping("/members/profile")
    public MemberProfileUpdateResponseDto updateProfile(
        @RequestBody MemberProfileUpdateRequestDto requestDto, HttpServletRequest request) {
        String email = (String) request.getAttribute("email");
        return memberService.updateProfile(email, requestDto);
    }
}
