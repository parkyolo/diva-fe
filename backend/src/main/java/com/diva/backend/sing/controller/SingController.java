package com.diva.backend.sing.controller;

import com.diva.backend.sing.dto.VocalTestRequestDto;
import com.diva.backend.sing.dto.VocalTestResponseDto;
import com.diva.backend.sing.service.SingService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SingController {
    private final SingService singService;

    @PostMapping("/vocal-test")
    public VocalTestResponseDto saveTestResult(HttpServletRequest request, @RequestBody VocalTestRequestDto requestDto) {
        Long memberId = (Long) request.getAttribute("memberId");
        return singService.saveTestResult(memberId, requestDto);
    }

    @GetMapping("/vocal-test")
    public VocalTestResponseDto getTestResult(HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");
        return singService.getTestResult(memberId);
    }
}
