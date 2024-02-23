package com.diva.backend.member.repository;

import static com.diva.backend.member.entity.QMember.member;

import com.diva.backend.enumstorage.status.MemberStatus;
import com.diva.backend.member.entity.Member;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.Optional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepositoryQueryDsl {

    private final EntityManager em;

    @Override
    public Optional<Member> findMemberById(Long memberId) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);
        return Optional.ofNullable(
            queryFactory.selectFrom(member)
                .where(member.id.eq(memberId))
                .fetchOne());
    }

    @Override
    public Optional<Member> findByIdWithVocalRange(Long memberId) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);

        return Optional.ofNullable(
            queryFactory.selectFrom(member)
                .leftJoin(member.vocalRange).fetchJoin()
                .where(member.id.eq(memberId))
                .fetchOne());
    }

    @Override
    public Optional<Member> findByProviderId(Long providerId) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);

        return Optional.ofNullable(
            queryFactory.selectFrom(member)
                .where(member.providerId.eq(providerId))
                .fetchOne()
        );
    }

    @Override
    public Optional<Member> findNotDeletedById(long id) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);

        return Optional.ofNullable(
            queryFactory
                .selectFrom(member)
                .where(member.id.eq(id)
                    .and(member.status.ne(MemberStatus.DELETED)))
                .fetchOne()
        );
    }

    @Override
    public Optional<Member> findMemberByIdWithVocalRange(Long memberId) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);

        return Optional.ofNullable(
            queryFactory.selectFrom(member)
                .leftJoin(member.vocalRange).fetchJoin()
                .where(member.id.eq(memberId))
                .fetchOne());
    }
}
