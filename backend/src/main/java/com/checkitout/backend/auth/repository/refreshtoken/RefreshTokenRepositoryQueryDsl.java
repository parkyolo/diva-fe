package com.checkitout.backend.auth.repository.refreshtoken;

import com.checkitout.backend.entity.RefreshToken;

import java.util.Optional;

public interface RefreshTokenRepositoryQueryDsl {
    Optional<RefreshToken> findByRefreshTokenWithMember(String refreshToken);
}
