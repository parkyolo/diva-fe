package com.diva.backend.post.repository;

import com.diva.backend.post.entity.Post;

import java.util.List;
import java.util.Optional;

public interface PostRepositoryQueryDsl {
    List<Post> findByPracticeResultIsNotNull();
    Optional<Post> findByPracticeResultId(Long practiceResultId);

    List<Post> paginationNoOffset(Long postId, int pageSize);

    List<Post> findAllByMemberIdWithSongWithPost(Long memberId);
}
