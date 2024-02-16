package com.diva.backend.recommend.service.service;

import com.diva.backend.recommend.service.dto.RecommendedSongsResponseDto;

import java.util.List;

public interface RecommendService {
    List<RecommendedSongsResponseDto> getRecommendedSongs(Long memberId);
}
