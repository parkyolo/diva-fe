package com.diva.backend.auth.repository;

import com.diva.backend.auth.entity.OAuth2;

import java.util.Optional;

public interface OAuth2RepositoryQueryDsl {
    Optional<OAuth2> findByRegistrationIdAndProviderIdWithToken(String registrationId, Long providerId);
}
