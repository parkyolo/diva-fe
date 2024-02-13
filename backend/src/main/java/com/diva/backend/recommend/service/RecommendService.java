package com.diva.backend.recommend.service;

import com.diva.backend.recommend.dto.RecommendedSongsResponseDto;

import java.util.List;

public interface RecommendService {
    List<RecommendedSongsResponseDto> getRecommendedSongs(Long memberId);
}
