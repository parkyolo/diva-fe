package com.diva.backend.song.service;

import com.diva.backend.exception.NoPracticeResultException;
import com.diva.backend.exception.NoSuchMemberException;
import com.diva.backend.post.entity.PracticeResult;
import com.diva.backend.song.dto.PracticeResultResponseDto;
import com.diva.backend.song.dto.SavedSongsResponseDto;
import com.diva.backend.member.entity.Member;
import com.diva.backend.song.entity.SavedSong;
import com.diva.backend.song.repository.PracticeResultRepository;
import com.diva.backend.song.repository.SavedSongRepository;
import com.diva.backend.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class SongServiceImpl implements SongService{
    private final MemberRepository memberRepository;
    private final SavedSongRepository savedSongRepository;
    private final PracticeResultRepository practiceResultRepository;

    @Transactional
    @Override
    public List<SavedSongsResponseDto> getSavedSongs(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NoSuchMemberException("해당하는 회원이 없습니다."));

        List<SavedSong> list = savedSongRepository.findByMemberId(memberId);

//        // log
//        for (SavedSong s : list) {
//            log.info("song title : {} , artist {}", s.getSong().getTitle(), s.getSong().getAtrist());
//        }

        List<SavedSongsResponseDto> savedSongList = new ArrayList<>();
        for (SavedSong savedSong : list) {
            savedSongList.add(SavedSongsResponseDto.from(savedSong, savedSong.getSong()));
        }
        return savedSongList;
    }

    @Transactional
    @Override
    public List<PracticeResultResponseDto> getPracticeResults(Long memberId) throws NoSuchMemberException, NoPracticeResultException {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NoSuchMemberException("해당하는 회원이 없습니다."));

        List<PracticeResult> list = practiceResultRepository.findByMemberId(memberId);
        // log
//        for (PracticeResult p : list) {
//            log.info("result score : {} , song {}", p.getScore(), p.getSong().getTitle());
//        }
        List<PracticeResultResponseDto> practiceResultList = new ArrayList<>();
        for (PracticeResult practiceResult : list) {
            practiceResultList.add(PracticeResultResponseDto.from(practiceResult));
        }
        return practiceResultList;
    }
}
