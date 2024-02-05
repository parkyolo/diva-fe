package com.diva.backend.sing.service;

import com.diva.backend.member.entity.Member;
import com.diva.backend.member.entity.VocalRange;
import com.diva.backend.member.repository.MemberRepository;
import com.diva.backend.member.repository.VocalRangeRepository;
import com.diva.backend.sing.dto.VocalTestRequestDto;
import com.diva.backend.sing.dto.VocalTestResponseDto;
import com.diva.backend.util.RecommendArtist;
import jakarta.transaction.Transactional;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class SingServiceImpl implements SingService{
    private final MemberRepository memberRepository;
    private final VocalRangeRepository vocalRangeRepository;
    private final RecommendArtist recommendArtist;

    @Transactional
    @Override
    public VocalTestResponseDto saveTestResult(Long memberId, VocalTestRequestDto requestDto) {
        Member member = memberRepository.findMemberById(memberId)
            .orElseThrow(() -> new RuntimeException("해당하는 회원 없음"));
        // 음역대 정보 받아와서 저장
        String highestNote = requestDto.getHighestNote();
        String lowestNote = requestDto.getLowestNote();

        VocalRange vocalRange = VocalRange.builder().highestNote(highestNote).lowestNote(lowestNote).build();
        vocalRangeRepository.save(vocalRange);
        member.updateMemberWhenVocalTest(vocalRange);
        memberRepository.save(member);

        // 음역대에 맞는 가수 추천 (highestNote를 파라미터로)
        int highestMidi = recommendArtist.noteToMidi(highestNote, true);
        String artist = vocalRangeRepository.findMatchingArtistByMaxMidi(highestMidi);
        System.out.println(artist);
        return VocalTestResponseDto.builder()
            .highestNote(highestNote)
            .lowestNote(lowestNote)
            .matchingArtist(artist)
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
