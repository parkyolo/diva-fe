package com.checkitout.backend.auth.repository.refreshtoken;

import com.checkitout.backend.entity.RefreshToken;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.Optional;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

import static com.checkitout.backend.entity.QMember.member;
import static com.checkitout.backend.entity.QRefreshToken.refreshToken1;

@RequiredArgsConstructor
public class RefreshTokenRepositoryImpl implements RefreshTokenRepositoryQueryDsl {
    private final EntityManager em;

    @Override
    public Optional<RefreshToken> findByRefreshTokenWithMember(String refreshToken) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);

        return Optional.ofNullable(queryFactory
            .selectFrom(refreshToken1)
            .join(refreshToken1.member, member).fetchJoin()
            .where(refreshToken1.refreshToken.eq(refreshToken))
            .fetchOne());
    }
}
