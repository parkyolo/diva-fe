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

import java.util.Optional;

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
    public void updateHeart(Long postId, Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 회원이 존재하지 않습니다. : " + memberId));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 게시글이 존재하지 않습니다. : " + postId));

        Optional<Heart> heart = heartRepository.findByMemberAndPost(member, post);
        if (heart.isPresent()) { // 이미 좋아요가 눌려있는 경우, 좋아요를 취소
            post.getHearts().remove(heart.get());
            heartRepository.delete(heart.get());
        } else { // 아직 좋아요가 눌려있지 않은 경우, 좋아요를 추가
            Heart newHeart = Heart.builder()
                    .post(post)
                    .member(member)
                .build();
            post.getHearts().add(newHeart);
            heartRepository.save(newHeart);
        }

        post.setHeartCount(post.getHearts().size());
        postRepository.save(post);
    }
}
