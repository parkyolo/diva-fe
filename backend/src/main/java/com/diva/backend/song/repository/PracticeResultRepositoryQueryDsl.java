package com.diva.backend.song.repository;

import com.diva.backend.post.entity.PracticeResult;

import java.util.List;
import java.util.Optional;

public interface PracticeResultRepositoryQueryDsl {
    Optional<PracticeResult> findByIdWithSongWithScore(Long id);
    List<PracticeResult> findByMemberIdWithScore(Long memberId);
    Optional<PracticeResult> findByPostIdWithMemberAndPost(Long postId);
}
