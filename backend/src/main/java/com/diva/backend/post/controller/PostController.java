package com.diva.backend.post.controller;

import com.diva.backend.post.dto.PostCreateResponseDto;
import com.diva.backend.post.dto.PostCreateRequestDto;
import com.diva.backend.post.service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    // 게시글 작성
    @PostMapping
    public PostCreateResponseDto createPost(@RequestBody PostCreateRequestDto postCreateRequestDto, HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");

        String content = postCreateRequestDto.getContent();
        Long practiceResultId = postCreateRequestDto.getPracticeResultId();

        return postService.createPost(memberId, content, practiceResultId);
    }
}
