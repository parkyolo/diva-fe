package com.diva.backend.post.controller;

import com.diva.backend.post.dto.PostResponseDto;
import com.diva.backend.post.entity.Post;
import com.diva.backend.post.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    /*
        게시글 전체 조회
     */
    @GetMapping("/list")
    public List<PostResponseDto> getPosts(@RequestParam Long pageId) {
        return postService.getPosts(pageId);
    }
}
