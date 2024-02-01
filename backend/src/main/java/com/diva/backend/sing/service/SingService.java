package com.diva.backend.sing.service;

import com.diva.backend.sing.dto.VocalTestRequestDto;
import com.diva.backend.sing.dto.VocalTestResponseDto;

public interface SingService {

    VocalTestResponseDto saveTestResult(Long memberId, VocalTestRequestDto requestDto);

    VocalTestResponseDto getTestResult(Long memberId);
}
