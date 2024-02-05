package com.diva.backend.song.repository;

import com.diva.backend.song.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongRepository extends JpaRepository<Song, Long> {
    Song findSongById(Long songId);
}
