//package com.diva.backend.auth.repository.devicetoken;
//
//import com.querydsl.jpa.impl.JPAQueryFactory;
//import jakarta.persistence.EntityManager;
//import java.util.Optional;
//import lombok.RequiredArgsConstructor;
//
//import static com.diva.backend.entity.QDeviceToken.deviceToken1;
//import static com.diva.backend.entity.QRefreshToken.refreshToken1;
//
//@RequiredArgsConstructor
//public class DeviceTokenRepositoryImpl implements DeviceTokenRepositoryQueryDsl {
//    private final EntityManager em;
//
//    @Override
//    public Optional<DeviceToken> findByDeviceTokenWithRefreshToken(String deviceToken) {
//        JPAQueryFactory queryFactory = new JPAQueryFactory(em);
//
//        return Optional.ofNullable(
//            queryFactory
//                .selectFrom(deviceToken1)
//                .where(deviceToken1.deviceToken.eq(deviceToken))
//                .leftJoin(deviceToken1.refreshToken, refreshToken1).fetchJoin()
//            .fetchOne()
//        );
//    }
//}
