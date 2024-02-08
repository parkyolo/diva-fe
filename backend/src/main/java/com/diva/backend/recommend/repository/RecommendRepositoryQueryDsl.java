package com.diva.backend.recommend.repository;

import com.diva.backend.member.entity.Member;
import com.diva.backend.song.entity.SavedSong;
import com.diva.backend.song.entity.Song;

import java.util.Optional;

public interface RecommendRepositoryQueryDsl {
    Optional<SavedSong> findByMemberAndSong(Member member, Song song);
}
