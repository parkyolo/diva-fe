package com.diva.backend.sing.service;

import com.diva.backend.member.entity.Member;
import com.diva.backend.member.entity.VocalRange;
import com.diva.backend.member.repository.MemberRepository;
import com.diva.backend.member.repository.VocalRangeRepository;
import com.diva.backend.sing.dto.LiveResponseDto;
import com.diva.backend.sing.dto.TutorialResponseDto;
import com.diva.backend.sing.dto.VocalTestRequestDto;
import com.diva.backend.sing.dto.VocalTestResponseDto;
import com.diva.backend.util.RecommendArtist;
import com.diva.backend.song.entity.Song;
import com.diva.backend.song.repository.SongRepository;
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
    private final RecommendArtist recommendArtist;
    private final SongRepository songRepository;

    @Transactional
    @Override
    public void saveTestResult(Long memberId, VocalTestRequestDto requestDto) {
        Member member = memberRepository.findMemberById(memberId)
            .orElseThrow(() -> new RuntimeException("해당하는 회원 없음"));
        String highestNote = requestDto.getHighestNote();
        String lowestNote = requestDto.getLowestNote();
        int highestMidi = recommendArtist.noteToMidi(highestNote, true);
        int lowestMidi = recommendArtist.noteToMidi(lowestNote, true);

        // 음역대 정보 저장
        VocalRange vocalRange = VocalRange.builder()
                                .highestNote(highestNote)
                                .highestMidi(highestMidi)
                                .lowestNote(lowestNote)
                                .lowestMidi(lowestMidi)
                                .build();
        vocalRangeRepository.save(vocalRange);
        member.updateMemberWhenVocalTest(vocalRange);
        memberRepository.save(member);
        // 리턴할 필요없음
        return;
    }

    @Transactional
    @Override
    public VocalTestResponseDto getTestResult(Long memberId) {
        Member member = memberRepository.findMemberById(memberId)
            .orElseThrow(() -> new RuntimeException("해당하는 회원 없음"));
        String highestNote = member.getVocalRange().getHighestNote();
        String lowestNote = member.getVocalRange().getLowestNote();

        // 음역대에 맞는 가수 추천 (highestNote를 파라미터로)
        int highestMidi = recommendArtist.noteToMidi(highestNote, true);
        int lowestMidi = recommendArtist.noteToMidi(lowestNote, true);
        String artist = vocalRangeRepository.findMatchingArtistByMaxMidi(highestMidi);
        return VocalTestResponseDto.builder()
            .highestNote(highestNote)
            .lowestNote(lowestNote)
            .highestMidi(highestMidi)
            .lowestMidi(lowestMidi)
            .matchingArtist(artist)
            .build();
    }

    @Override
    public TutorialResponseDto getTutorialMode(Long memberId, Long songId) {
        Member member = memberRepository.findMemberById(memberId)
            .orElseThrow(() -> new RuntimeException("해당하는 회원 없음"));
        Song song = songRepository.findSongById(songId);
        return TutorialResponseDto.from(song);
    }

    @Override
    public LiveResponseDto getLiveMode(Long memberId, Long songId) {
        Member member = memberRepository.findMemberById(memberId)
            .orElseThrow(() -> new RuntimeException("해당하는 회원 없음"));
        Song song = songRepository.findSongById(songId);
        return LiveResponseDto.from(song);
    }
}
