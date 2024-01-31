package com.diva.backend.post.repository;

import com.diva.backend.post.entity.Post;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>, PostRepositoryQueryDsl {
  List<Post> findAllByPageId(Long pageId);
  List<Post> findAllByMemberId(Long memberId);
}
