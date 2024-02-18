package com.diva.backend.member.repository;

import com.diva.backend.member.entity.Member;

import java.util.Optional;

public interface MemberRepositoryQueryDsl {

    Optional<Member> findMemberById(Long memberId);
    Optional<Member> findByIdWithVocalRange(Long memberId);
    Optional<Member> findByProviderId(Long providerId);
    Optional<Member> findNotDeletedById(long id);
    Optional<Member> findMemberByIdWithVocalRange(Long memberId);
}
