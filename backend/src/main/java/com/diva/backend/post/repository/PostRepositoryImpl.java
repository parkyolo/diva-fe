package com.diva.backend.post.repository;

import com.diva.backend.post.entity.Post;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import static com.diva.backend.heart.entity.QHeart.heart;
import static com.diva.backend.post.entity.QPost.post;

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
    public Optional<Post> findByPracticeResultId(Long practiceResultId) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);

        return Optional.ofNullable(
            queryFactory
                .selectFrom(post)
                .where(post.practiceResult.id.eq(practiceResultId))
                .fetchOne()
        );
    }


    @Override
    public List<Post> paginationNoOffset(Long postId, int pageSize) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);

        JPAQuery<Post> query = queryFactory
                .selectFrom(post)
                .where(post.practiceResult.isNotNull());

        if (postId != null) {
            query.where(post.id.lt(postId));
        }

        return query
                .orderBy(post.id.desc())
                .limit(pageSize)
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
