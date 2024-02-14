package com.diva.backend.post.service;

import com.diva.backend.post.dto.PostSelectResponseDto;
import com.diva.backend.post.dto.PostUpdateRequestDto;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface PostService {
    // 전체 게시글 조회
    List<PostSelectResponseDto> getPosts(HttpServletRequest request, Long postId, int pageSize);

    // 게시글 작성
    void createPost(Long memberId, String content, Long practiceResultId);

    // 게시글 삭제
    void deletePost(Long postId, Long memberId);

    // 게시글 수정
    PostUpdateRequestDto updatePost(Long postId, Long memberId, PostUpdateRequestDto requestDto);
}
