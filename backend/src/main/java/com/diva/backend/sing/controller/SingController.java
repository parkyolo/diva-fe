package com.diva.backend.sing.controller;

import com.diva.backend.sing.dto.LiveResponseDto;
import com.diva.backend.sing.dto.LiveUploadResponseDto;
import com.diva.backend.sing.dto.TutorialResponseDto;
import com.diva.backend.sing.dto.VocalTestRequestDto;
import com.diva.backend.sing.dto.VocalTestResponseDto;
import com.diva.backend.sing.service.SingService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
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

    // , consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE}
    @PostMapping("/sing/{songId}/live")
    public LiveUploadResponseDto uploadFileToS3(HttpServletRequest request, @PathVariable("songId") Long songId, @RequestPart(value = "file", required = false) MultipartFile multipartFile) {
        Long memberId = (Long) request.getAttribute("memberId");
        return singService.uploadFile(memberId, songId, multipartFile);
    }
}
