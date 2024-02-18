package com.diva.backend.member.repository;

import com.diva.backend.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long>, MemberRepositoryQueryDsl {
    Optional<Member> findMemberById(Long memberId);
    Optional<Member> findByIdWithVocalRange(Long memberId);
    Optional<Member> findByProviderId(Long providerId);
    Optional<Member> findNotDeletedById(long id);
    Optional<Member> findMemberByIdWithVocalRange(Long memberId);
}
