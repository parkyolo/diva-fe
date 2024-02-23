package com.diva.backend.song.repository;

import com.diva.backend.recommend.service.dto.RecommendedSongsResponseDto;

import java.util.List;

public interface SongRepositoryQueryDsl {
    List<RecommendedSongsResponseDto> getTopSimilarSongs(int membersMaxMidi, Long genre, int count);
}
