package com.diva.backend.member.controller;

import com.diva.backend.common.response.ResponseFactory;
import com.diva.backend.member.dto.*;
import com.diva.backend.member.service.MemberService;
import com.diva.backend.song.dto.PracticeResultResponseDto;
import com.diva.backend.song.dto.SavedSongsResponseDto;
import com.diva.backend.song.service.SongService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> getMemberInfo(HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");
        MemberResponseDto result =  memberService.getMemberInfo(memberId);
        return ResponseFactory.success("회원 정보 조회 성공", result);
    }

    @PatchMapping(consumes = MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateInfo(HttpServletRequest request, @RequestPart(value = "info") MemberInfoUpdateRequestDto requestDto, @RequestPart(value = "file", required = false) MultipartFile multipartFile) {
        Long memberId = (Long) request.getAttribute("memberId");
        MemberInfoUpdateResponseDto result = memberService.updateInfo(memberId, requestDto, multipartFile);
        return ResponseFactory.success("회원 정보 수정 성공", result);
    }

    @GetMapping("/saved")
    public ResponseEntity<?> getSavedSongs(HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");
        List<SavedSongsResponseDto> result = songService.getSavedSongs(memberId);
        return ResponseFactory.success("찜한 노래 목록 조회 성공", result);
    }

    @GetMapping("/list")
    public ResponseEntity<?> getPracticeResults(HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");
        List<PracticeResultResponseDto> result = songService.getPracticeResults(memberId);
        return ResponseFactory.success("부른 노래 목록 조회 성공", result);
    }

    @GetMapping("/posts")
    public ResponseEntity<?> getMemberPosts(HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");
        List<MemberPostResponseDto> result = memberService.getMemberPosts(memberId);
        return ResponseFactory.success("공유한 노래 목록 조회 성공", result);
    }
}
