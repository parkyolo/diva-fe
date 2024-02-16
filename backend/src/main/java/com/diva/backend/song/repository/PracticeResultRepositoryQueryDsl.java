package com.diva.backend.song.repository;

import com.diva.backend.post.entity.PracticeResult;

import java.util.Optional;

public interface PracticeResultRepositoryQueryDsl {
    Optional<PracticeResult> findByIdWithSong(Long id);
    Optional<PracticeResult> findByPostIdWithMemberAndPost(Long postId);
}
