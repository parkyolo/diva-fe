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

        JPAQuery<Long> noOffset = queryFactory
            .select(post.id)
            .from(post)
            .where(post.practiceResult.isNotNull())
            .orderBy(post.id.desc())
            .limit(pageSize);

        if (postId != null) {
            noOffset.where(post.id.lt(postId));
        }

        List<Long> ids = noOffset.fetch();

        JPAQuery<Post> query = queryFactory
                .selectFrom(post)
                .leftJoin(post.member).fetchJoin()
                .leftJoin(post.practiceResult, practiceResult).fetchJoin()
                .leftJoin(post.hearts, heart).fetchJoin()
                .leftJoin(post.song, song).fetchJoin()
                .where(post.id.in(ids))
                .orderBy(post.id.desc());

        return query.fetch();
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
