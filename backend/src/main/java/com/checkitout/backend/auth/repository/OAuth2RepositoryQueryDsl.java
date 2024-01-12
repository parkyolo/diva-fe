package com.checkitout.backend.auth.repository;

import com.checkitout.backend.auth.entity.OAuth2;

import java.util.Optional;

public interface OAuth2RepositoryQueryDsl {
    Optional<OAuth2> findByRegistrationIdAndProviderIdWithToken(String registrationId, Long providerId);
}
