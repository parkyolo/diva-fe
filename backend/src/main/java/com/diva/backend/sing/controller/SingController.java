package com.diva.backend.sing.controller;

import com.diva.backend.sing.dto.*;
import com.diva.backend.sing.service.SingService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
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
    public String saveTestResult(HttpServletRequest request, @RequestBody VocalTestRequestDto requestDto) {
        Long memberId = (Long) request.getAttribute("memberId");
        singService.saveTestResult(memberId, requestDto);
        return "저장 완료!";
    }

    @GetMapping("/vocal-test")
    public VocalTestResponseDto getTestResult(HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");
        return singService.getTestResult(memberId);
    }

    @GetMapping("/sing/{songId}/tutorial")
    public TutorialResponseDto getTutorialMode(HttpServletRequest request, @PathVariable("songId") Long songId) {
        Long memberId = (Long) request.getAttribute("memberId");
        return singService.getTutorialMode(memberId, songId);
    }

    @GetMapping("/sing/{songId}/live")
    public LiveResponseDto getLiveMode(HttpServletRequest request, @PathVariable("songId") Long songId) {
        Long memberId = (Long) request.getAttribute("memberId");
        return singService.getLiveMode(memberId, songId);
    }

    @PostMapping(value = "/sing/{songId}/live", consumes = MULTIPART_FORM_DATA_VALUE)
    public LiveUploadResponseDto uploadFileToS3(HttpServletRequest request, @PathVariable("songId") Long songId, @RequestPart(value = "file", required = false) MultipartFile multipartFile) {
        Long memberId = (Long) request.getAttribute("memberId");
        return singService.uploadFile(memberId, songId, multipartFile);
    }
}
