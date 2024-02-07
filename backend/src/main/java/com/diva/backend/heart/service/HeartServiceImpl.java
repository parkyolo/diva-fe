package com.diva.backend.heart.service;

import com.diva.backend.heart.entity.Heart;
import com.diva.backend.heart.repository.HeartRepository;
import com.diva.backend.member.entity.Member;
import com.diva.backend.member.repository.MemberRepository;
import com.diva.backend.post.entity.Post;
import com.diva.backend.post.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class HeartServiceImpl implements HeartService {
    private final HeartRepository heartRepository;
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;

    @Autowired
    public HeartServiceImpl(HeartRepository heartRepository ,MemberRepository memberRepository, PostRepository postRepository) {
        this.heartRepository = heartRepository;
        this.memberRepository = memberRepository;
        this.postRepository = postRepository;
    }

    @Override
    @Transactional
    public void createHeart(Long postId, Long memberId) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new IllegalArgumentException("해당 ID의 회원이 존재하지 않습니다. : " + memberId));

        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new IllegalArgumentException("해당 ID의 게시글이 존재하지 않습니다. : " + postId));

        // 이미 좋아요 되어있으면 에러 반환
        if (heartRepository.findByMemberAndPost(member, post).isPresent()){
            throw new IllegalArgumentException("이미 '좋아요'가 등록되어 있습니다.");
        }

        Heart heart = Heart.builder()
                .post(post)
                .member(member)
            .build();

        post.getHearts().add(heart);
        heartRepository.save(heart);
        postRepository.save(post);
    }

    @Override
    @Transactional
    public void deleteHeart(Long postId, Long memberId) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new IllegalArgumentException("해당 ID의 회원이 존재하지 않습니다. : " + memberId));

        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new IllegalArgumentException("해당 ID의 게시글이 존재하지 않습니다. : " + postId));

        Heart heart = heartRepository.findByMemberAndPost(member, post)
            .orElseThrow(() -> new IllegalArgumentException("해당 좋아요 ID를 찾을 수 없습니다."));

        post.getHearts().remove(heart);
        heartRepository.delete(heart);
        postRepository.save(post);
    }
}
