package com.diva.backend.member.controller;

import com.diva.backend.exception.NoPostException;
import com.diva.backend.exception.NoPracticeResultException;
import com.diva.backend.exception.NoSuchMemberException;
import com.diva.backend.member.dto.*;
import com.diva.backend.member.service.MemberService;
import com.diva.backend.song.dto.PracticeResultResponseDto;
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

    // 회원 정보 조회
    @GetMapping
    public ResponseEntity<?> getMemberInfo(HttpServletRequest request) throws NoSuchMemberException{
        Long memberId = (Long) request.getAttribute("memberId");
        MemberResponseDto result = memberService.getMemberInfo(memberId);
        return ResponseEntity.ok(result);
    }

    // 회원 정보 수정
    @PatchMapping(consumes = MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateInfo(HttpServletRequest request,
                                  @RequestPart(value = "info") MemberInfoUpdateRequestDto requestDto,
                                  @RequestPart(value = "file", required = false) MultipartFile multipartFile) throws NoSuchMemberException {
        Long memberId = (Long) request.getAttribute("memberId");
        MemberInfoUpdateResponseDto result = memberService.updateInfo(memberId, requestDto, multipartFile);
        return ResponseEntity.ok(result);
    }

    // 찜한 노래 목록 조회
//    @GetMapping("/saved")
//    public ResponseEntity<?> getSavedSongs(HttpServletRequest request) throws NoSuchMemberException{
//        Long memberId = (Long) request.getAttribute("memberId");
//        List<SavedSongsResponseDto> result = songService.getSavedSongs(memberId);
//        return ResponseEntity.ok(result);
//    }

    // 실전 모드 결과 목록 조회 (부른 노래)
    @GetMapping("/list")
    public ResponseEntity<?> getPracticeResults(HttpServletRequest request) throws NoSuchMemberException{
        Long memberId = (Long) request.getAttribute("memberId");
        List<PracticeResultResponseDto> result = songService.getPracticeResults(memberId);
        return ResponseEntity.ok(result);
    }

    // 작성한 포스트 목록 조회 (공유한 노래)
    @GetMapping("/posts")
    public ResponseEntity<?> getMemberPosts(HttpServletRequest request) throws NoSuchMemberException{
        Long memberId = (Long) request.getAttribute("memberId");
        List<MemberPostResponseDto> result = memberService.getMemberPosts(memberId);
        return ResponseEntity.ok(result);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

//    // 404 NotFound
//    @ExceptionHandler(NoPostException.class)
//    public ResponseEntity<?> handleNoPostException(Exception e) {
//        return ResponseEntity.status(404).body(e.getMessage());
//    }
//
//    // 404 NotFound
//    @ExceptionHandler(NoPracticeResultException.class)
//    public ResponseEntity<?> handleNoPracticeResultException(Exception e) {
//        return ResponseEntity.status(404).body(e.getMessage());
//    }

    // 410 Gone
    @ExceptionHandler(NoSuchMemberException.class)
    public ResponseEntity<?> handleNoSuchMemberException(Exception e) {
        return ResponseEntity.status(410).body(e.getMessage());
    }
}
