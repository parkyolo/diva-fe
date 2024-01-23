package com.diva.backend.auth.repository;

import com.diva.backend.auth.entity.OAuth2;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

import static com.diva.backend.auth.entity.QOAuth2.oAuth2;

@RequiredArgsConstructor
public class OAuth2RepositoryImpl implements OAuth2RepositoryQueryDsl {
    private final EntityManager em;

    @Override
    public Optional<OAuth2> findByRegistrationIdAndProviderIdWithToken(String registrationId, Long providerId) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);

        return Optional.ofNullable(queryFactory
            .selectFrom(oAuth2)
            .where(oAuth2.registrationId.eq(registrationId)
                .and(oAuth2.providerId.eq(providerId)))
            .leftJoin(oAuth2.token).fetchJoin()
            .fetchOne());
    }
}
