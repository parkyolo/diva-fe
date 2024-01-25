package com.diva.backend.post.service;

import com.diva.backend.post.dto.PostResponseDto;
import com.diva.backend.post.entity.Post;
import com.diva.backend.post.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;

    @Autowired
    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    /*
        게시글 전체 조회
     */
    @Override
    public List<PostResponseDto> getPosts(Long pageId) {
        return postRepository.findAllByPageId(pageId).stream()
                .map((Post::toPostDto))
                .toList();
    }
}
