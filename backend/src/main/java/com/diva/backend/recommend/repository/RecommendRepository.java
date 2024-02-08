package com.diva.backend.recommend.repository;

import com.diva.backend.member.entity.Member;
import com.diva.backend.song.entity.SavedSong;
import com.diva.backend.song.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecommendRepository extends JpaRepository<SavedSong, Long>, RecommendRepositoryQueryDsl {
    Optional<SavedSong> findByMemberAndSong(Member member, Song song);
}
