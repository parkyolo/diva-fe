package com.diva.backend.post.service;

import com.diva.backend.exception.NoPostException;
import com.diva.backend.post.dto.PostSelectResponseDto;
import com.diva.backend.post.dto.PostWithMemberAndPracticeResultResponseDto;
import com.diva.backend.post.dto.PostUpdateRequestDto;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Optional;

public interface PostService {
    // 전체 게시글 조회
    List<PostWithMemberAndPracticeResultResponseDto> getPosts(HttpServletRequest request, Long postId, int pageSize);
    PostSelectResponseDto getPostByPracticeResultId(Long practiceResultId) throws NoPostException;

    // 게시글 작성
    void createPost(Long memberId, String content, Long practiceResultId);

    // 게시글 삭제
    void deletePost(Long postId, Long memberId);

    // 게시글 수정
    PostUpdateRequestDto updatePost(Long postId, Long memberId, PostUpdateRequestDto requestDto);
}
