package com.diva.backend.post.repository;

import com.diva.backend.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>, PostRepositoryQueryDsl {
    List<Post> findByPracticeResultIsNotNull();

    List<Post> paginationNoOffset(Long postId, int pageSize);
}
