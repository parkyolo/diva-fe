package com.checkitout.backend.repository;

import com.checkitout.backend.entity.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long>, MemberRepositoryQueryDsl {
    Optional<Member> findNotDeletedById(long id);
    Optional<Member> findNotDeletedByEmail(String email);
//    Optional<Member> findNotDeletedByEmailWithRefreshToken(String email);
//    Optional<Member> findNotDeletedByEmailWithSubscription(String email);
//    Optional<Member> findNotDeletedByEmailWithDeviceToken(String email);
//    Optional<Member> findNotDeletedByEmailWithSubscriptionAndDeviceToken(String email);
//    Optional<Member> findNotDeletedByEmailWithRefreshTokenAndSubscriptionAndDeviceToken(String email);
//    Optional<Member> findNotDeletedByPasswordVerificationCode(String passwordVerificationCode);
//    Optional<Member> findNotDeletedByPasswordVerificationCodeWithDeviceTokenAndSubscription(String passwordVerificationCode);
    Optional<Long> findIdByEmail(String email);
    Optional<Long> findNotDeletedIdByEmail(String email);
//    Optional<Member> findNotDeletedByEmailAndDeviceToken(String email);
}
