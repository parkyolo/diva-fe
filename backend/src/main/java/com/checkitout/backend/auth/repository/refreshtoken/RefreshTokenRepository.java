package com.checkitout.backend.auth.repository.refreshtoken;

import java.util.Optional;

import com.checkitout.backend.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long>, RefreshTokenRepositoryQueryDsl {
    Optional<RefreshToken> findByRefreshToken(String refreshToken);
    Optional<RefreshToken> findByRefreshTokenWithMember(String refreshToken);
    Optional<RefreshToken> findByMemberId(long memberId);
    void deleteByRefreshToken(String refreshToken);
}
