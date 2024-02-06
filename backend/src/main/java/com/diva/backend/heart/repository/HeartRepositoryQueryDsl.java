package com.diva.backend.heart.repository;

import com.diva.backend.heart.entity.Heart;
import com.diva.backend.member.entity.Member;
import com.diva.backend.post.entity.Post;

import java.util.Optional;

public interface HeartRepositoryQueryDsl {
    Optional<Heart> findByMemberAndPost(Member member, Post post);
}
