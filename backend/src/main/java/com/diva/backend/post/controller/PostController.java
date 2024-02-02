package com.diva.backend.post.controller;

import com.diva.backend.post.dto.PostCreateRequestDto;
import com.diva.backend.post.dto.PostCreateResponseDto;
import com.diva.backend.post.dto.PostSelectResponseDto;
import com.diva.backend.post.dto.PostUpdateRequestDto;
import com.diva.backend.post.service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    // 게시글 전체 조회
    @GetMapping("/list")
    public ResponseEntity<List<PostSelectResponseDto>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    // 게시글 작성
    @PostMapping
    public PostCreateResponseDto createPost(@RequestBody PostCreateRequestDto postCreateRequestDto, HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");

        String content = postCreateRequestDto.getContent();
        Long practiceResultId = postCreateRequestDto.getPracticeResultId();

        return postService.createPost(memberId, content, practiceResultId);
    }

    // 게시글 삭제
    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable("postId") Long postId, HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");

        postService.deletePost(postId, memberId);
        return ResponseEntity.noContent().build();
    }

    // 게시글 수정
    @PatchMapping("/{postId}")
    public ResponseEntity<Object> updatePost(@RequestBody PostUpdateRequestDto requestDto, @PathVariable("postId") Long postId, HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");

        postService.updatePost(postId, memberId, requestDto);
        return ResponseEntity.noContent().build();
    }
}
