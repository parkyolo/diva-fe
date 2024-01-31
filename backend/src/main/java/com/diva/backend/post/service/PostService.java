package com.diva.backend.post.service;

import com.diva.backend.post.dto.PostCreateResponseDto;

public interface PostService {
    // 게시글 작성
    PostCreateResponseDto createPost(Long memberId, String content, Long practiceResultId);

    // 게시글 삭제
    void deletePost(Long postId, Long memberId);
}
