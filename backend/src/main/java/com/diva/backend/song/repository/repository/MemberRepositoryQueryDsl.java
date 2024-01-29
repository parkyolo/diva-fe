package com.diva.backend.song.repository.repository;

import com.diva.backend.member.entity.Member;

import java.util.Optional;

public interface MemberRepositoryQueryDsl {

    Optional<Member> findMemberByEmail(String email);
    Optional<Member> findNotDeletedById(long id);
    Optional<Member> findNotDeletedByEmail(String email);
    Optional<Long> findIdByEmail(String email);
    Optional<Long> findNotDeletedIdByEmail(String email);

}
