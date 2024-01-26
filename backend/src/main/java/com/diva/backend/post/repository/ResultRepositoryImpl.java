package com.diva.backend.post.repository;

import com.diva.backend.post.entity.PracticeResult;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.diva.backend.post.entity.QPracticeResult.practiceResult;

@RequiredArgsConstructor
public class ResultRepositoryImpl implements ResultRepositoryQueryDsl{

    private final EntityManager em;

    @Override
    public List<PracticeResult> SaveResult() {
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);

        return queryFactory
            .selectFrom(practiceResult)
            .leftJoin(practiceResult.member).fetchJoin()
            .leftJoin(practiceResult.song).fetchJoin()
            .leftJoin(practiceResult.post).fetchJoin()
            .fetch();
    }
}
