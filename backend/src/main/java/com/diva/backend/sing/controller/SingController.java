package com.diva.backend.sing.controller;

import com.diva.backend.exception.NoSuchMemberException;
import com.diva.backend.exception.NoVocalRangeException;
import com.diva.backend.post.dto.PracticeResultUploadResponseDto;
import com.diva.backend.sing.dto.*;
import com.diva.backend.sing.service.SingService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api", consumes = APPLICATION_JSON_VALUE)
public class SingController {
    private final SingService singService;

    // 음역대 테스트 결과 저장
    @PostMapping("/vocal-test")
    public ResponseEntity<?> saveTestResult(HttpServletRequest request,
                                            @RequestBody VocalTestRequestDto requestDto) throws NoSuchMemberException {
        Long memberId = (Long) request.getAttribute("memberId");
        singService.saveTestResult(memberId, requestDto);
        return ResponseEntity.ok().build();
    }

    // 음역대 테스트 결과 조회
    @GetMapping("/vocal-test")
    public ResponseEntity<?> getTestResult(HttpServletRequest request) throws NoSuchMemberException, NoVocalRangeException {
        Long memberId = (Long) request.getAttribute("memberId");
        VocalTestResponseDto result = singService.getTestResult(memberId);
        return ResponseEntity.ok(result);
    }

    // 튜토리얼 모드
    @GetMapping("/sing/{songId}/tutorial")
    public ResponseEntity<?> getTutorialMode(HttpServletRequest request,
                                               @PathVariable("songId") Long songId) throws NoSuchMemberException{
        Long memberId = (Long) request.getAttribute("memberId");
        TutorialResponseDto result = singService.getTutorialMode(memberId, songId);
        return ResponseEntity.ok(result);
    }

    // 실전 모드
    @GetMapping("/sing/{songId}/live")
    public ResponseEntity<?> getLiveMode(HttpServletRequest request,
                                       @PathVariable("songId") Long songId) throws NoSuchMemberException{
        Long memberId = (Long) request.getAttribute("memberId");
        LiveResponseDto result = singService.getLiveMode(memberId, songId);
        return ResponseEntity.ok(result);
    }

    // 실전 모드 결과 업로드
    @PostMapping(value = "/sing/{songId}/upload", consumes = MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadFileToS3(HttpServletRequest request,
                                                @PathVariable("songId") Long songId,
                                                @RequestPart(value = "file", required = false) MultipartFile multipartFile) throws NoSuchMemberException {
        Long memberId = (Long) request.getAttribute("memberId");
        PracticeResultUploadResponseDto result = singService.uploadFile(memberId, songId, multipartFile);
        return ResponseEntity.ok(result);
    }

    @ExceptionHandler(NoVocalRangeException.class)
    public ResponseEntity<?> handleNoVocalRangeException(Exception e) {
        return ResponseEntity.status(404).body(e.getMessage());
    }
}
