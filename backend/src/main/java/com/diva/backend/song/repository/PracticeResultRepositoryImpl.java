package com.diva.backend.song.repository;

import com.diva.backend.post.entity.PracticeResult;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

import static com.diva.backend.post.entity.QPracticeResult.practiceResult;

@RequiredArgsConstructor
public class PracticeResultRepositoryImpl implements PracticeResultRepositoryQueryDsl {
    private final EntityManager em;

    @Override
    public Optional<PracticeResult> findByIdWithSong(Long id) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);

        return Optional.ofNullable(
            queryFactory
                    .selectFrom(practiceResult)
                    .leftJoin(practiceResult.song).fetchJoin()
                    .where(practiceResult.id.eq(id))
                    .fetchOne()
        );
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
