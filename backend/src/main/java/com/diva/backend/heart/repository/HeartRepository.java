package com.diva.backend.heart.repository;

import com.diva.backend.heart.entity.Heart;
import com.diva.backend.member.entity.Member;
import com.diva.backend.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HeartRepository extends JpaRepository<Heart, Long>, HeartRepositoryQueryDsl{
    Optional<Heart> findByMemberAndPost(Member member, Post post);
}
