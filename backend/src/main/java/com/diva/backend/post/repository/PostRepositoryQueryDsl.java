package com.diva.backend.post.repository;

import com.diva.backend.member.dto.MemberPostResponseDto;
import com.diva.backend.post.entity.Post;

import com.querydsl.core.Tuple;
import java.util.List;

public interface PostRepositoryQueryDsl {
    List<Post> findByPracticeResultIsNotNull();
    List<Post> findAllByMemberIdWithSongWithPost(Long memberId);
}
