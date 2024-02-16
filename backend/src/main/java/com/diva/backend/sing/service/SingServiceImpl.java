package com.diva.backend.sing.service;

import com.diva.backend.exception.NoSuchMemberException;
import com.diva.backend.exception.NoVocalRangeException;
import com.diva.backend.member.entity.Member;
import com.diva.backend.member.entity.VocalRange;
import com.diva.backend.member.repository.MemberRepository;
import com.diva.backend.member.repository.VocalRangeRepository;
import com.diva.backend.post.dto.PracticeResultUploadResponseDto;
import com.diva.backend.post.entity.PracticeResult;
import com.diva.backend.sing.dto.LiveResponseDto;
import com.diva.backend.sing.dto.LiveUploadResponseDto;
import com.diva.backend.sing.dto.TutorialResponseDto;
import com.diva.backend.sing.dto.VocalTestRequestDto;
import com.diva.backend.sing.dto.VocalTestResponseDto;
import com.diva.backend.song.repository.PracticeResultRepository;
import com.diva.backend.util.RecommendArtist;
import com.diva.backend.song.entity.Song;
import com.diva.backend.song.repository.SongRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.diva.backend.util.S3Uploader;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class SingServiceImpl implements SingService{
    private final MemberRepository memberRepository;
    private final VocalRangeRepository vocalRangeRepository;
    private final SongRepository songRepository;
    private final PracticeResultRepository practiceResultRepository;

    private final RecommendArtist recommendArtist;
    private final S3Uploader s3Uploader;

    @Transactional
    @Override
    public void saveTestResult(Long memberId, VocalTestRequestDto requestDto) throws NoSuchMemberException {
        Member member = memberRepository.findMemberById(memberId)
                .orElseThrow(() -> new NoSuchMemberException("해당하는 회원이 없습니다."));
        String highestNote = requestDto.getHighestNote();
        String lowestNote = requestDto.getLowestNote();
        Integer highestMidi = recommendArtist.noteToMidi(highestNote, true);
        Integer lowestMidi = recommendArtist.noteToMidi(lowestNote, true);

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
        System.out.println("HighestNote: " + member.getVocalRange().getHighestNote() + "  LowestNote: " + member.getVocalRange().getLowestNote());
        // 리턴할 필요없음
        return;
    }

    @Transactional
    @Override
    public VocalTestResponseDto getTestResult(Long memberId) throws NoSuchMemberException, NoVocalRangeException{
        Member member = memberRepository.findMemberById(memberId)
                .orElseThrow(() -> new NoSuchMemberException("해당하는 회원이 없습니다."));
        if(member.getVocalRange() == null) {
            throw new NoVocalRangeException("음역대 정보가 없습니다.");
        }

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
    public TutorialResponseDto getTutorialMode(Long memberId, Long songId) throws NoSuchMemberException{
        Member member = memberRepository.findMemberById(memberId)
                .orElseThrow(() -> new NoSuchMemberException("해당하는 회원이 없습니다."));
        Song song = songRepository.findSongById(songId);
        return TutorialResponseDto.from(song);
    }

    @Override
    public LiveResponseDto getLiveMode(Long memberId, Long songId) throws NoSuchMemberException{
        Member member = memberRepository.findMemberById(memberId)
                .orElseThrow(() -> new NoSuchMemberException("해당하는 회원이 없습니다."));
        Song song = songRepository.findSongById(songId);
        return LiveResponseDto.from(song);
    }

    @Transactional
    @Override
    public PracticeResultUploadResponseDto uploadFile(Long memberId, Long songId, MultipartFile multipartFile) throws NoSuchMemberException{
        Member member = memberRepository.findMemberById(memberId)
                .orElseThrow(() -> new NoSuchMemberException("해당하는 회원이 없습니다."));
        Song song = songRepository.findSongById(songId);
        PracticeResult practiceResult = PracticeResult.builder()
                                        .member(member)
                                        .song(song)
                                        .build();

        // S3에 파일 업로드
        PracticeResult newPracticeResult = practiceResultRepository.save(practiceResult);
        Long practiceResultId = newPracticeResult.getId();
        String artist = song.getArtist();
        String title = song.getTitle();
        String url = "PracticeResult/" + practiceResultId + "/" + artist + "-" + title + ".mp3";
        s3Uploader.uploadFile(url, multipartFile);
        return PracticeResultUploadResponseDto.builder()
            .practiceResultId(practiceResultId)
            .createdDate(newPracticeResult.getCreatedDate())
            .build();
    }


}
