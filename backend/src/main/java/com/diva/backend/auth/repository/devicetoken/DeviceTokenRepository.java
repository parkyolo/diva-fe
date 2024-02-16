//package com.diva.backend.auth.repository.devicetoken;
//
//import java.util.Optional;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//public interface DeviceTokenRepository extends JpaRepository<DeviceToken, Long>, DeviceTokenRepositoryQueryDsl {
//    Optional<DeviceToken> findByDeviceToken(String deviceToken);
//    Optional<DeviceToken> findByDeviceTokenWithRefreshToken(String deviceToken);
//    void deleteByDeviceToken(String deviceToken);
//    void deleteByMemberId(Long memberId);
//}
