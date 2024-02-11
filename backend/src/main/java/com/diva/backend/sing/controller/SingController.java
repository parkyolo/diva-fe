package com.diva.backend.sing.controller;

import com.diva.backend.common.response.ResponseFactory;
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

    @PostMapping("/vocal-test")
    public ResponseEntity<?> saveTestResult(HttpServletRequest request, @RequestBody VocalTestRequestDto requestDto) {
        Long memberId = (Long) request.getAttribute("memberId");
        singService.saveTestResult(memberId, requestDto);
        return ResponseFactory.success("음역대 테스트 저장 성공");
    }

    @GetMapping("/vocal-test")
    public ResponseEntity<?> getTestResult(HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");
        VocalTestResponseDto result = singService.getTestResult(memberId);
        return ResponseFactory.success("음역대 조회 및 가수 추천 성공", result);
    }

    @GetMapping("/sing/{songId}/tutorial")
    public ResponseEntity<?> getTutorialMode(HttpServletRequest request, @PathVariable("songId") Long songId) {
        Long memberId = (Long) request.getAttribute("memberId");
        TutorialResponseDto result = singService.getTutorialMode(memberId, songId);
        return ResponseFactory.success("튜토리얼 모드 성공", result);
    }

    @GetMapping("/sing/{songId}/live")
    public ResponseEntity<?> getLiveMode(HttpServletRequest request, @PathVariable("songId") Long songId) {
        Long memberId = (Long) request.getAttribute("memberId");
        LiveResponseDto result = singService.getLiveMode(memberId, songId);
        return ResponseFactory.success("실전 모드 성공", result);
    }

    @PostMapping(value = "/sing/{songId}/live", consumes = MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadFileToS3(HttpServletRequest request, @PathVariable("songId") Long songId, @RequestPart(value = "file", required = false) MultipartFile multipartFile) {
        Long memberId = (Long) request.getAttribute("memberId");
        LiveUploadResponseDto result = singService.uploadFile(memberId, songId, multipartFile);
        return ResponseFactory.success("실전 모드 결과 저장 성공", result);
    }
}
