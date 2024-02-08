package com.diva.backend.post.repository;

import com.diva.backend.post.entity.Post;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.diva.backend.post.entity.QPost.post;
import static com.diva.backend.post.entity.QPracticeResult.practiceResult;
import static com.diva.backend.song.entity.QSong.song;

@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryQueryDsl {

    private final EntityManager em;

    @Override
    public List<Post> findByPracticeResultIsNotNull() {
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);
        return queryFactory
            .selectFrom(post)
            .where(post.practiceResult.isNotNull())
            .fetch();
    }

    @Override
    public List<Post> findAllByMemberIdWithSongWithPost(Long memberId) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);
        return queryFactory
            .selectFrom(post)
            //.leftJoin(song).on(song.id.eq(post.song.id)).fetchJoin()
            .leftJoin(post.song).fetchJoin()
            //.leftJoin(practiceResult).on(practiceResult.post.id.eq(post.id)).fetchJoin()
            .leftJoin(post.practiceResult).fetchJoin()
            .where(post.member.id.eq(memberId))
            .fetch();
    }
}
