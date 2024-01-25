package com.diva.backend.post.service;

import com.diva.backend.post.dto.PostResponseDto;

import java.util.List;

public interface PostService {

    /*
        게시글 전체 조회
     */
    List<PostResponseDto> getPosts(Long pageId);

    /*
        게시글 작성
     */
//    Post savePost(PostResponseDto postResponseDto);
}
