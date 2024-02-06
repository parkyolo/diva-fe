package com.diva.backend.heart.service;

public interface HeartService {
    void createHeart(Long postId, Long memberId);

    void deleteHeart(Long postId, Long memberId);
}
