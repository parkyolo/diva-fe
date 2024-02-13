package com.diva.backend.sing.service;

import com.diva.backend.exception.NoSuchMemberException;
import com.diva.backend.exception.NoVocalRangeException;
import com.diva.backend.post.dto.PracticeResultUploadResponseDto;
import com.diva.backend.sing.dto.LiveResponseDto;
import com.diva.backend.sing.dto.LiveUploadResponseDto;
import com.diva.backend.sing.dto.TutorialResponseDto;
import com.diva.backend.sing.dto.VocalTestRequestDto;
import com.diva.backend.sing.dto.VocalTestResponseDto;
import org.springframework.web.multipart.MultipartFile;

public interface SingService {

    void saveTestResult(Long memberId, VocalTestRequestDto requestDto) throws NoSuchMemberException;

    VocalTestResponseDto getTestResult(Long memberId) throws NoSuchMemberException, NoVocalRangeException;

    TutorialResponseDto getTutorialMode(Long memberId, Long songId) throws NoSuchMemberException;

    LiveResponseDto getLiveMode(Long memberId, Long songId) throws NoSuchMemberException;

    PracticeResultUploadResponseDto uploadFile(Long memberId, Long songId, MultipartFile multipartFile) throws NoSuchMemberException;
}
