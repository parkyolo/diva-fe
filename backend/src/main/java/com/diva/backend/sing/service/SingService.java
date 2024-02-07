package com.diva.backend.sing.service;

import com.diva.backend.sing.dto.LiveResponseDto;
import com.diva.backend.sing.dto.LiveUploadResponseDto;
import com.diva.backend.sing.dto.TutorialResponseDto;
import com.diva.backend.sing.dto.VocalTestRequestDto;
import com.diva.backend.sing.dto.VocalTestResponseDto;
import org.springframework.web.multipart.MultipartFile;

public interface SingService {

    void saveTestResult(Long memberId, VocalTestRequestDto requestDto);

    VocalTestResponseDto getTestResult(Long memberId);

    TutorialResponseDto getTutorialMode(Long memberId, Long songId);

    LiveResponseDto getLiveMode(Long memberId, Long songId);

    LiveUploadResponseDto uploadFile(Long memberId, Long songId, MultipartFile multipartFile);
}
