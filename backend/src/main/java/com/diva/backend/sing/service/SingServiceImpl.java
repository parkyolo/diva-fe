package com.diva.backend.sing.service;

import com.diva.backend.member.entity.Member;
import com.diva.backend.member.entity.VocalRange;
import com.diva.backend.member.repository.MemberRepository;
import com.diva.backend.member.repository.VocalRangeRepository;
import com.diva.backend.sing.dto.VocalTestRequestDto;
import com.diva.backend.sing.dto.VocalTestResponseDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class SingServiceImpl implements SingService{
    private final MemberRepository memberRepository;
    private final VocalRangeRepository vocalRangeRepository;

    @Transactional
    @Override
    public VocalTestResponseDto saveTestResult(Long memberId, VocalTestRequestDto requestDto) {
        Member member = memberRepository.findMemberById(memberId)
            .orElseThrow(() -> new RuntimeException("해당하는 회원 없음"));
        String highestNote = requestDto.getHighestNote();
        String lowestNote = requestDto.getLowestNote();

        VocalRange vocalRange = VocalRange.builder().highestNote(highestNote).lowestNote(lowestNote).build();
        vocalRangeRepository.save(vocalRange);
        member.updateMemberWhenVocalTest(vocalRange);
        memberRepository.save(member);
        return VocalTestResponseDto.builder()
            .highestNote(highestNote)
            .lowestNote(lowestNote)
            .build();
    }

    @Transactional
    @Override
    public VocalTestResponseDto getTestResult(Long memberId) {
        Member member = memberRepository.findMemberById(memberId)
            .orElseThrow(() -> new RuntimeException("해당하는 회원 없음"));
        String highestNote = member.getVocalRange().getHighestNote();
        String lowestNote = member.getVocalRange().getLowestNote();
        return VocalTestResponseDto.builder()
            .highestNote(highestNote)
            .lowestNote(lowestNote)
            .build();
    }
}
