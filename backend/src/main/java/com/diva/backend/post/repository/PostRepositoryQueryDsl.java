package com.diva.backend.post.repository;

import com.diva.backend.post.entity.Post;

import java.util.List;

public interface PostRepositoryQueryDsl {
  List<Post> findAllByPageId(Long pageId);
}
