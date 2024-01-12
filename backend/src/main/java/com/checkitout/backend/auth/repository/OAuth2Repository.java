package com.checkitout.backend.auth.repository;

import com.checkitout.backend.auth.entity.OAuth2;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OAuth2Repository extends JpaRepository<OAuth2, Long> {
    Optional<OAuth2> findByRegistrationIdAndProviderIdWithToken(String registrationId, Long providerId);
}
