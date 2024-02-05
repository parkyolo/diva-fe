package com.diva.backend.sing.service;

import com.diva.backend.sing.dto.LiveResponseDto;
import com.diva.backend.sing.dto.TutorialResponseDto;
import com.diva.backend.sing.dto.VocalTestRequestDto;
import com.diva.backend.sing.dto.VocalTestResponseDto;

public interface SingService {

    VocalTestResponseDto saveTestResult(Long memberId, VocalTestRequestDto requestDto);

    VocalTestResponseDto getTestResult(Long memberId);

    TutorialResponseDto getTutorialMode(Long memberId, Long songId);

    LiveResponseDto getLiveMode(Long memberId, Long songId);
}
