package com.diva.backend.post.repository;

import com.diva.backend.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>, PostRepositoryQueryDsl {
  List<Post> findAllByPageId(Long pageId);
  
  List<Post> findAllByMemberId(Long memberId);
}
