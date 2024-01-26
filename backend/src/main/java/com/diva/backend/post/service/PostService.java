package com.diva.backend.post.service;

import com.diva.backend.post.dto.PostResponseDto;
import com.diva.backend.post.entity.Post;

import java.util.List;

public interface PostService {
    /*
        게시글 전체 조회
     */
    List<PostResponseDto> getPosts(Long pageId);
}
