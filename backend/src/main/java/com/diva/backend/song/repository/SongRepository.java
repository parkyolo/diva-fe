package com.diva.backend.song.repository;

import com.diva.backend.recommend.service.dto.RecommendedSongsResponseDto;
import com.diva.backend.song.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SongRepository extends JpaRepository<Song, Long> {
    Song findSongById(Long songId);
    List<RecommendedSongsResponseDto> getTopSimilarSongs(int membersMaxMidi, Long genre, int count);
}
