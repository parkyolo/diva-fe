package com.diva.backend.song.repository;

import com.diva.backend.post.entity.PracticeResult;
import com.diva.backend.song.entity.SavedSong;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import org.springframework.stereotype.Repository;


public interface SavedSongRepository extends JpaRepository<SavedSong, Long> {
    List<SavedSong> findByMemberId(Long memberId);
}
