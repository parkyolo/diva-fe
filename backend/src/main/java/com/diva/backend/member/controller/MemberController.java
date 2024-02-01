package com.diva.backend.member.controller;

import com.diva.backend.member.dto.*;
import com.diva.backend.member.service.MemberService;
import com.diva.backend.song.dto.PracticeResultResponseDto;
import com.diva.backend.song.dto.SavedSongsResponseDto;
import com.diva.backend.song.service.SongService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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

    @PatchMapping("/members")
    public MemberInfoUpdateResponseDto updateInfo(HttpServletRequest request, @RequestBody MemberInfoUpdateRequestDto requestDto) {
        String email = (String) request.getAttribute("email");
        return memberService.updateInfo(email, requestDto);
    }

    @GetMapping("/members/saved")
    public List<SavedSongsResponseDto> getSavedSongs(HttpServletRequest request) {
        String email = (String) request.getAttribute("email");
        return songService.getSavedSongs(email);
    }

    @GetMapping("/members/list")
    public List<PracticeResultResponseDto> getPracticeResults(HttpServletRequest request) {
        String email = (String) request.getAttribute("email");
        return songService.getPracticeResults(email);
    }

    @GetMapping("/members/posts")
    public List<MemberPostResponseDto> getMemberPosts(HttpServletRequest request) {
        String email = (String)request.getAttribute("email");
        return memberService.getMemberPosts(email);
    }
}
