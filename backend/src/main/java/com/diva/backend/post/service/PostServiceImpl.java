package com.diva.backend.post.service;

import com.diva.backend.member.entity.Member;
import com.diva.backend.member.repository.MemberRepository;
import com.diva.backend.post.dto.PostSelectResponseDto;
import com.diva.backend.post.dto.PostUpdateRequestDto;
import com.diva.backend.post.entity.Post;
import com.diva.backend.post.entity.PracticeResult;
import com.diva.backend.post.repository.PostRepository;
import com.diva.backend.song.repository.PracticeResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private final PracticeResultRepository practiceResultRepository;

    @Autowired
    public PostServiceImpl(PostRepository postRepository, MemberRepository memberRepository, PracticeResultRepository practiceResultRepository) {
        this.postRepository = postRepository;
        this.memberRepository = memberRepository;
        this.practiceResultRepository = practiceResultRepository;
    }

    // 게시글 전체 조회
    @Override
    @Transactional
    public List<PostSelectResponseDto> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        return posts.stream()
            .map(PostSelectResponseDto::toPostResponseDto)
            .collect(Collectors.toList());
    }

    // 게시글 작성
    @Override
    @Transactional
    public void createPost(Long memberId, String content, Long practiceResultId) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new IllegalArgumentException("해당 ID의 회원이 존재하지 않습니다."));

        PracticeResult practiceResult = practiceResultRepository.findById(practiceResultId)
            .orElseThrow(() -> new IllegalArgumentException("해당 ID의 실전모드 결과가 존재하지 않습니다."));

        Long practiceResultMemberId = practiceResult.getMember().getId();
        if(!practiceResultMemberId.equals(memberId))  {
            throw new IllegalArgumentException("작성자의 회원 ID가 일치하지 않습니다.");
        }

        Post post = Post.builder()
                .content(content)
                .member(member)
                .practiceResult(practiceResult)
            .build();

        postRepository.save(post);
    }

    // 게시글 삭제
    @Override
    @Transactional
    public void deletePost(Long postId, Long memberId) {
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new IllegalArgumentException("해당 ID의 게시글이 존재하지 않습니다."));

        Long postMemberId = post.getMember().getId();
        if (!postMemberId.equals(memberId)) {
            throw new IllegalArgumentException("게시글을 삭제할 수 있는 권한이 없습니다.");
        }

        postRepository.delete(post);
    }

    // 게시글 수정
    @Override
    @Transactional
    public PostUpdateRequestDto updatePost(Long postId, Long memberId, PostUpdateRequestDto requestDto) {
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new IllegalArgumentException("해당 ID의 게시글이 존재하지 않습니다." + postId));

        Long postMemberId = post.getMember().getId();
        if (!postMemberId.equals(memberId)) {
            throw new IllegalArgumentException("게시글을 수정할 수 있는 권한이 없습니다.");
        }

        post.update(requestDto.getContent());
        return requestDto;
    }
}
