package com.diva.backend.recommend.service;

import com.diva.backend.member.entity.Member;
import com.diva.backend.member.repository.MemberRepository;
import com.diva.backend.recommend.repository.RecommendRepository;
import com.diva.backend.song.entity.SavedSong;
import com.diva.backend.song.entity.Song;
import com.diva.backend.song.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RecommendServiceImpl implements RecommendService {
    private final RecommendRepository recommendRepository;
    private final MemberRepository memberRepository;
    private final SongRepository songRepository;

    @Autowired
    public RecommendServiceImpl(RecommendRepository recommendRepository, MemberRepository memberRepository, SongRepository songRepository) {
        this.recommendRepository = recommendRepository;
        this.memberRepository = memberRepository;
        this.songRepository = songRepository;
    }

    @Transactional
    public void saveSong(Long songId, Long memberId) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new IllegalArgumentException("해당 ID의 회원이 존재하지 않습니다. : " + memberId));

        Song song = songRepository.findById(songId)
            .orElseThrow(() -> new IllegalArgumentException("해당 ID의 노래가 존재하지 않습니다. : " + songId));

        // 이미 찜하기 되어있으면 에러 반환
        if (recommendRepository.findByMemberAndSong(member, song).isPresent()){
            throw new IllegalArgumentException("이미 '찜하기'가 등록되어 있습니다.");
        }

        SavedSong savedSong = SavedSong.builder()
                .song(song)
                .member(member)
            .build();

        song.getSavedSongs().add(savedSong);
        recommendRepository.save(savedSong);
        songRepository.save(song);
    }

    @Transactional
    public void removeSavedSong(Long songId, Long memberId) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new IllegalArgumentException("해당 ID의 회원이 존재하지 않습니다. : " + memberId));

        Song song = songRepository.findById(songId)
            .orElseThrow(() -> new IllegalArgumentException("해당 ID의 노래가 존재하지 않습니다. : " + songId));

        SavedSong savedSong = recommendRepository.findByMemberAndSong(member, song)
            .orElseThrow(() -> new IllegalArgumentException("해당 찜하기 ID를 찾을 수 없습니다."));

        song.getSavedSongs().remove(savedSong);
        recommendRepository.delete(savedSong);
        songRepository.save(song);
    }
}
