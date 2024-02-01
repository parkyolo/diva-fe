package com.diva.backend.post.service;

import com.diva.backend.post.dto.PostCreateResponseDto;
import com.diva.backend.post.dto.PostUpdateRequestDto;

public interface PostService {
    // 게시글 작성
    PostCreateResponseDto createPost(Long memberId, String content, Long practiceResultId);

    // 게시글 삭제
    void deletePost(Long postId, Long memberId);

    // 게시글 수정
    PostUpdateRequestDto updatePost(Long postId, Long memberId, PostUpdateRequestDto requestDto);
}
