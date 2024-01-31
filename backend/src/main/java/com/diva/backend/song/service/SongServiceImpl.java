package com.diva.backend.song.service;

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
    public List<SavedSongsResponseDto> getSavedSongs(String email) {
        Member member = memberRepository.findMemberByEmail(email)
            .orElseThrow(() -> new RuntimeException("해당하는 회원 없음"));
        Long memberId = member.getId();

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
    public List<PracticeResultResponseDto> getPracticeResults(String email) {
        Member member = memberRepository.findMemberByEmail(email)
            .orElseThrow(() -> new RuntimeException("해당하는 회원 없음"));
        Long memberId = member.getId();

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
