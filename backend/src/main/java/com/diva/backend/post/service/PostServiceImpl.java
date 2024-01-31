package com.diva.backend.post.service;

import com.diva.backend.member.entity.Member;
import com.diva.backend.member.repository.MemberRepository;
import com.diva.backend.post.dto.PostCreateResponseDto;
import com.diva.backend.post.entity.Post;
import com.diva.backend.post.entity.PracticeResult;
import com.diva.backend.post.repository.PostRepository;
import com.diva.backend.song.repository.PracticeResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    /*
    게시글 작성
    */
    @Override
    @Transactional
    public PostCreateResponseDto createPost(Long memberId, String content, Long practiceResultId) {
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

        Post savedPost = postRepository.save(post);
        return savedPost.toPostResponseDto();
    }
}
