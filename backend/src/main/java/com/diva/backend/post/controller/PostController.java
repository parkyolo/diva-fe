package com.diva.backend.post.controller;

import com.diva.backend.post.dto.PostResponseDto;
import com.diva.backend.post.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    /*
        게시글 작성
     */
//    @PostMapping("/")
//    public ResponseEntity<Post> createPost(@RequestBody PostResponseDto postResponseDto) {
//        Post savedPost = postService.savePost(postResponseDto);
//        return new ResponseEntity<>(savedPost, HttpStatus.CREATED);
//    }
}
