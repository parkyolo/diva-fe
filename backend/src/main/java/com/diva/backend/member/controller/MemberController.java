package com.diva.backend.member.controller;

import com.diva.backend.member.dto.*;
import com.diva.backend.member.service.MemberService;
import com.diva.backend.song.dto.PracticeResultResponseDto;
import com.diva.backend.song.dto.SavedSongsResponseDto;
import com.diva.backend.song.service.SongService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@RestController
@RequestMapping(value = "/api/members", consumes = APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final SongService songService;

    @GetMapping
    public MemberResponseDto getMemberInfo(HttpServletRequest request) {
        String email = (String) request.getAttribute("email");
        return memberService.getMemberInfo(email);
    }

    @PatchMapping(consumes = MULTIPART_FORM_DATA_VALUE)
    public MemberInfoUpdateResponseDto updateInfo(HttpServletRequest request, @RequestPart(value = "info") MemberInfoUpdateRequestDto requestDto, @RequestPart(value = "file", required = false) MultipartFile multipartFile) {
        String email = (String) request.getAttribute("email");
        return memberService.updateInfo(email, requestDto, multipartFile);
    }

    @GetMapping("/saved")
    public List<SavedSongsResponseDto> getSavedSongs(HttpServletRequest request) {
        String email = (String) request.getAttribute("email");
        return songService.getSavedSongs(email);
    }

    @GetMapping("/list")
    public List<PracticeResultResponseDto> getPracticeResults(HttpServletRequest request) {
        String email = (String) request.getAttribute("email");
        return songService.getPracticeResults(email);
    }

    @GetMapping("/posts")
    public List<MemberPostResponseDto> getMemberPosts(HttpServletRequest request) {
        String email = (String)request.getAttribute("email");
        return memberService.getMemberPosts(email);
    }
}
