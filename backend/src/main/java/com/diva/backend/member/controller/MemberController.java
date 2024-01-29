package com.diva.backend.member.controller;

import com.diva.backend.member.dto.*;
import com.diva.backend.member.service.MemberService;
import com.diva.backend.song.service.SongService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final SongService songService;

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

    @GetMapping("/members/saved")
    public List<SavedSongsResponseDto> getSavedSongs(HttpServletRequest request) {
        String email = (String) request.getAttribute("email");
        return songService.getSavedSongs(email);
    }
}