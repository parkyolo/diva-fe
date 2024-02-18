package com.diva.backend.song.repository;

import com.diva.backend.post.entity.PracticeResult;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.List;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

import static com.diva.backend.post.entity.QPracticeResult.practiceResult;

@RequiredArgsConstructor
public class PracticeResultRepositoryImpl implements PracticeResultRepositoryQueryDsl {
    private final EntityManager em;

    @Override
    public Optional<PracticeResult> findByIdWithSongWithScore(Long id) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);

        return Optional.ofNullable(
            queryFactory
                    .selectFrom(practiceResult)
                    .leftJoin(practiceResult.song).fetchJoin()
                    .where(practiceResult.id.eq(id).and(practiceResult.score.isNotNull()))
                    .fetchOne()
        );
    }

    @Override
    public List<PracticeResult> findByMemberIdWithScore(Long memberId) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);

        return queryFactory
                .selectFrom(practiceResult)
                .leftJoin(practiceResult.song).fetchJoin()
                .where(practiceResult.member.id.eq(memberId).and(practiceResult.score.isNotNull()))
                .fetch();
    }

    @Override
    public Optional<PracticeResult> findByPostIdWithMemberAndPost(Long postId) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);

        return Optional.ofNullable(
            queryFactory
                    .selectFrom(practiceResult)
                    .leftJoin(practiceResult.post).fetchJoin()
                    .leftJoin(practiceResult.member).fetchJoin()
                    .where(practiceResult.post.id.eq(postId))
                    .fetchOne()
        );
    }
}
