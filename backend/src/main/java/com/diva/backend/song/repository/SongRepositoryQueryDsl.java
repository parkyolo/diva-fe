package com.diva.backend.song.repository;

import com.diva.backend.recommend.service.dto.RecommendedSongsResponseDto;

import java.util.List;

public interface SongRepositoryQueryDsl {
    List<RecommendedSongsResponseDto> getTop3SimilarSongs(int membersMaxMidi);
}
