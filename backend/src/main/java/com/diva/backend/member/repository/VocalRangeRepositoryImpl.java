package com.diva.backend.member.repository;

import static com.diva.backend.sing.entity.QArtistInfo.artistInfo;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.Optional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class VocalRangeRepositoryImpl implements VocalRangeRepositoryQueryDsl{

    private final EntityManager em;

    @Override
    public Optional<String> findMatchingArtistByMaxMidi(int highestMidi) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);
        return Optional.ofNullable(
            queryFactory.select(artistInfo.name)
                .from(artistInfo)
                .orderBy(artistInfo.maxMidi.subtract(highestMidi).abs().asc())
                .fetchFirst()
        );
    }
}
