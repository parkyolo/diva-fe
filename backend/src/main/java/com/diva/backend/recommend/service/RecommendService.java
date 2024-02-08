package com.diva.backend.recommend.service;

public interface RecommendService {
    void saveSong(Long songId, Long memberId);

    void removeSavedSong(Long songId, Long memberId);
}
