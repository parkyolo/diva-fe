package com.diva.backend.song.service;

import com.diva.backend.member.dto.SavedSongsResponseDto;
import com.diva.backend.member.entity.Member;
import com.diva.backend.song.entity.SavedSong;
import com.diva.backend.song.repository.SavedSongRepository;
import com.diva.backend.song.repository.repository.MemberRepository;
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
            savedSongList.add(SavedSongsResponseDto.from(savedSong.getSong()));
        }
        return savedSongList;
    }
}
