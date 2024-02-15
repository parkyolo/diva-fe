package com.diva.backend.post.controller;

import com.diva.backend.exception.NoPostException;
import com.diva.backend.post.dto.PostCreateRequestDto;
import com.diva.backend.post.dto.PostWithMemberAndPracticeResultResponseDto;
import com.diva.backend.post.dto.PostUpdateRequestDto;
import com.diva.backend.post.service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "/api/posts", consumes = APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    // 전체 게시글 조회
    @GetMapping
    public ResponseEntity<List<PostWithMemberAndPracticeResultResponseDto>> getPosts(
            HttpServletRequest request,
            @RequestParam(name="postId", required = false) Long postId,
            @RequestParam(name="pageSize", defaultValue = "10") int pageSize) {
        return ResponseEntity.ok(postService.getPosts(request, postId, pageSize));
    }

    // 실전모드 결과로 게시글 조회
    @GetMapping("{practiceResultId}")
    public ResponseEntity<?> getPostByPracticeResultId(@PathVariable("practiceResultId") Long practiceResultId) throws NoPostException {
        return ResponseEntity.ok(postService.getPostByPracticeResultId(practiceResultId));
    }

    // 게시글 작성
    @PostMapping
    public ResponseEntity<Void> createPost(@RequestBody PostCreateRequestDto postCreateRequestDto, HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");

        String content = postCreateRequestDto.getContent();
        Long practiceResultId = postCreateRequestDto.getPracticeResultId();

        postService.createPost(memberId, content, practiceResultId);
        return ResponseEntity.noContent().build();
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
    public ResponseEntity<Object> updatePost(
            @RequestBody PostUpdateRequestDto requestDto,
            @PathVariable("postId") Long postId, HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");

        postService.updatePost(postId, memberId, requestDto);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(NoPostException.class)
    public ResponseEntity<?> handleNoPostException(NoPostException e) {
        return ResponseEntity.noContent().build();
    }
}
